"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin, estMembre, nouveauCode } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { dateEstimee, jourMaroc } from "@/lib/parcours";

export async function rejoindre(_prev: string, form: FormData): Promise<string> {
  const code = String(form.get("code") || "").trim().toUpperCase();
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return "Connecte-toi d'abord.";
  if (!code) return "Entre ton code.";
  if (await estMembre(user)) redirect("/app"); // déjà membre : on ne consomme pas de place
  const db = admin();
  const { data: inv } = await db.from("invites").select("code, uses, max_uses").eq("code", code).maybeSingle();
  if (!inv) return "Code inconnu. Vérifie l'orthographe (ex. MZ-AB12CD).";
  if (inv.uses >= inv.max_uses) return "Ce code a déjà été utilisé le nombre de fois prévu.";
  // Mise à jour conditionnelle : évite qu'un code soit consommé deux fois en même temps.
  const { data: ok } = await db.from("invites").update({ uses: inv.uses + 1 })
    .eq("code", code).eq("uses", inv.uses).select("code");
  if (!ok?.length) return "Réessaie dans un instant.";
  const { error } = await db.from("members").insert({ user_id: user.id, email: user.email, invite_code: code });
  if (error && error.code !== "23505") return "Erreur (" + error.code + ").";
  redirect("/app");
}

export async function creerInvitation(): Promise<void> {
  const { data: { user } } = await createClient().auth.getUser();
  if (!(await estMembre(user))) return;
  const db = admin();
  const { count } = await db.from("invites").select("code", { count: "exact", head: true }).eq("owner", user!.id);
  const chef = estAdmin(user); // l'admin crée autant de codes qu'il veut, de 10 places
  if (!chef && (count ?? 0) >= Number(process.env.INVITES_PER_MEMBER || 1)) return;
  await db.from("invites").insert({ code: nouveauCode(), owner: user!.id, max_uses: chef ? 10 : Number(process.env.INVITE_USES || 3) });
  revalidatePath("/app/moi");
}

// ---------- Parcours ----------
async function moi() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user || !(await estMembre(user))) throw new Error("Accès refusé");
  return user;
}

export async function enregistrerProfil(form: FormData): Promise<void> {
  const u = await moi();
  const db = admin();
  const minutes = Math.min(240, Math.max(15, Number(form.get("minutes") || 60)));
  await db.from("profiles").upsert({
    user_id: u.id,
    prenom: String(form.get("prenom") || "").trim().slice(0, 40) || null,
    filiere: String(form.get("filiere") || "").trim().slice(0, 60) || null,
    minutes_jour: minutes,
  });
  const { data: communes } = await db.from("module_dates").select("module_slug, exam_date");
  const commune = new Map((communes ?? []).map((c) => [c.module_slug as string, c.exam_date as string]));
  const auj = jourMaroc();
  const choisis = form.getAll("module").map(String).filter((s) => MODULES.some((m) => m.slug === s));
  const lignes = choisis.map((slug) => {
    const inconnue = form.get("inconnue_" + slug) === "1";
    const m = MODULES.find((x) => x.slug === slug);
    const date = inconnue ? dateEstimee(m?.semestre ?? "S1", commune.get(slug)) : String(form.get("date_" + slug) || "");
    return { user_id: u.id, module_slug: slug, exam_date: date, estimee: inconnue };
  }).filter((x) => /^\d{4}-\d{2}-\d{2}$/.test(x.exam_date) && x.exam_date >= auj);
  if (lignes.length) await db.from("exams").upsert(lignes);
  // Modules décochés : on retire leur date
  const { data: avant } = await db.from("exams").select("module_slug").eq("user_id", u.id);
  const aRetirer = (avant ?? []).map((x) => x.module_slug as string).filter((s) => !choisis.includes(s));
  if (aRetirer.length && form.get("complet") === "1") await db.from("exams").delete().eq("user_id", u.id).in("module_slug", aRetirer);
  revalidatePath("/app");
  // Première inscription : test de niveau sur le module dont l'examen est le plus proche.
  const { data: dejaTeste } = await db.from("niveau").select("notion").eq("user_id", u.id).limit(1);
  const premier = [...lignes].sort((a, b) => a.exam_date.localeCompare(b.exam_date))[0];
  redirect(!dejaTeste?.length && premier ? `/app/niveau/${premier.module_slug}?premier=1` : "/app");
}

export async function reserverLive(form: FormData): Promise<void> {
  const u = await moi();
  const id = String(form.get("session") || "");
  const db = admin();
  const { data: s } = await db.from("live_sessions").select("id, places, starts_at").eq("id", id).maybeSingle();
  if (!s || Date.parse(s.starts_at) < Date.now()) return;
  const { count } = await db.from("live_bookings").select("user_id", { count: "exact", head: true })
    .eq("session_id", id).neq("statut", "annulee");
  if ((count ?? 0) >= s.places) return;
  await db.from("live_bookings").upsert({
    session_id: id, user_id: u.id, email: u.email, statut: "en_attente",
    ref_paiement: String(form.get("ref") || "").trim().slice(0, 80) || null,
  });
  revalidatePath("/app/live");
}

export async function annulerReservation(form: FormData): Promise<void> {
  const u = await moi();
  await admin().from("live_bookings").update({ statut: "annulee" })
    .eq("session_id", String(form.get("session"))).eq("user_id", u.id).eq("statut", "en_attente");
  revalidatePath("/app/live");
}

// ---------- Admin : séances live ----------
async function chef() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!estAdmin(user)) throw new Error("Réservé à l'admin");
}

export async function creerSession(form: FormData): Promise<void> {
  await chef();
  const quand = String(form.get("quand") || ""); // AAAA-MM-JJTHH:MM saisi en heure du Maroc
  const titre = String(form.get("titre") || "").trim();
  if (!titre || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(quand)) return;
  const n = (k: string, def: number) => { const v = Math.round(Number(form.get(k))); return Number.isFinite(v) && v > 0 ? v : def; };
  await admin().from("live_sessions").insert({
    titre,
    module_slug: String(form.get("module") || "") || null,
    starts_at: heureMarocVersUTC(quand),
    duree_min: n("duree", 90),
    prix_dh: n("prix", 25),
    places: n("places", 15),
    animateurs: String(form.get("animateurs") || "").trim() || null,
    lien: String(form.get("lien") || "").trim() || null,
  });
  revalidatePath("/app/admin"); revalidatePath("/app/live");
}

export async function statutReservation(form: FormData): Promise<void> {
  await chef();
  const statut = String(form.get("statut"));
  if (!["payee", "annulee", "en_attente"].includes(statut)) return;
  await admin().from("live_bookings").update({ statut })
    .eq("session_id", String(form.get("session"))).eq("user_id", String(form.get("user")));
  revalidatePath("/app/admin"); revalidatePath("/app/live");
}

export async function majLien(form: FormData): Promise<void> {
  await chef();
  await admin().from("live_sessions").update({ lien: String(form.get("lien") || "").trim() || null }).eq("id", String(form.get("session")));
  revalidatePath("/app/admin"); revalidatePath("/app/live");
}

// Convertit une heure locale marocaine en instant UTC (le décalage du Maroc change pendant le ramadan).
function heureMarocVersUTC(local: string) {
  const naif = Date.parse(local + ":00Z");
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(new Date(naif)).map((x) => [x.type, x.value]));
  const vu = Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`);
  return new Date(naif - (vu - naif)).toISOString();
}

export async function declarerPaiement(form: FormData): Promise<void> {
  const u = await moi();
  await admin().from("live_bookings").update({ ref_paiement: String(form.get("ref") || "").trim().slice(0, 120) || null })
    .eq("session_id", String(form.get("session"))).eq("user_id", u.id).eq("statut", "en_attente");
  revalidatePath("/app/live"); revalidatePath("/app/admin");
}

export async function majDateModule(form: FormData): Promise<void> {
  await chef();
  const slug = String(form.get("module"));
  const date = String(form.get("date") || "");
  const db = admin();
  if (!date) { await db.from("module_dates").delete().eq("module_slug", slug); }
  else await db.from("module_dates").upsert({ module_slug: slug, exam_date: date, officielle: form.get("officielle") === "on",
    source: String(form.get("source") || "").trim() || null, updated_at: new Date().toISOString() });
  revalidatePath("/app"); revalidatePath("/app/admin");
}

// ---------- Test de niveau ----------
export async function enregistrerNiveau(slug: string, reponses: { n: string; ok: boolean }[]): Promise<void> {
  const u = await moi();
  if (!MODULES.some((m) => m.slug === slug)) return;
  const lignes = reponses.filter((r) => typeof r.n === "string" && r.n.length < 40).slice(0, 20)
    .map((r) => ({ user_id: u.id, module_slug: slug, notion: r.n, ok: !!r.ok }));
  if (lignes.length) await admin().from("niveau").upsert(lignes);
  revalidatePath("/app"); revalidatePath("/app/progres");
}

// ---------- Documents envoyés par les élèves ----------
export async function declarerDocument(meta: { chemin: string; nom: string; type: string; module: string; moduleLibre: string; etablissement: string }): Promise<string> {
  const u = await moi();
  if (!meta.chemin.startsWith(u.id + "/")) return "Fichier invalide.";
  if (!["cours", "td", "annale", "autre"].includes(meta.type)) return "Type invalide.";
  const slug = MODULES.some((m) => m.slug === meta.module) ? meta.module : null;
  const { error } = await admin().from("documents").insert({
    user_id: u.id, email: u.email, chemin: meta.chemin, nom_fichier: meta.nom.slice(0, 120), type: meta.type,
    module_slug: slug, module_libre: slug ? null : meta.moduleLibre.trim().slice(0, 80) || null,
    etablissement: meta.etablissement.trim().slice(0, 80) || null,
  });
  if (error) return "Enregistrement impossible (" + error.code + ").";
  revalidatePath("/app/contribuer"); revalidatePath("/app/admin");
  return "";
}

export async function statutDocument(form: FormData): Promise<void> {
  await chef();
  const statut = String(form.get("statut"));
  if (!["accepte", "refuse", "recu"].includes(statut)) return;
  await admin().from("documents").update({ statut, note: String(form.get("note") || "").trim().slice(0, 200) || null }).eq("id", String(form.get("id")));
  revalidatePath("/app/admin"); revalidatePath("/app/contribuer");
}

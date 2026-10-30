"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin, estMembre, nouveauCode } from "@/lib/acces";

export async function rejoindre(_prev: string, form: FormData): Promise<string> {
  const code = String(form.get("code") || "").trim().toUpperCase();
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return "Connecte-toi d'abord.";
  if (!code) return "Entre ton code.";
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
  revalidatePath("/app");
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
  const lignes = form.getAll("module").map(String).map((slug) => ({ slug, date: String(form.get("date_" + slug) || "") }))
    .filter((x) => /^\d{4}-\d{2}-\d{2}$/.test(x.date));
  if (lignes.length) {
    await db.from("exams").upsert(lignes.map((x) => ({ user_id: u.id, module_slug: x.slug, exam_date: x.date })));
  }
  const retirer = form.getAll("retirer").map(String);
  if (retirer.length) await db.from("exams").delete().eq("user_id", u.id).in("module_slug", retirer);
  revalidatePath("/app");
  redirect(String(form.get("retour") || "/app"));
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
  await admin().from("live_sessions").insert({
    titre: String(form.get("titre") || "").trim(),
    module_slug: String(form.get("module") || "") || null,
    starts_at: heureMarocVersUTC(quand),
    duree_min: Number(form.get("duree") || 90),
    prix_dh: Number(form.get("prix") || 25),
    places: Number(form.get("places") || 15),
    animateurs: String(form.get("animateurs") || "").trim() || null,
    lien: String(form.get("lien") || "").trim() || null,
  });
  revalidatePath("/app/admin"); revalidatePath("/app/live");
}

export async function statutReservation(form: FormData): Promise<void> {
  await chef();
  await admin().from("live_bookings").update({ statut: String(form.get("statut")) })
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

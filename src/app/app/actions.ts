"use server";
import { estMascotte } from "@/components/Mascotte";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin, estMembre, nouveauCode } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { dateEstimee, jourMaroc } from "@/lib/parcours";
import { secretWebhook } from "@/lib/telegram";
import { randomBytes } from "node:crypto";
import NIVEAU from "@/lib/niveau.json";
import BANQUE from "@/lib/banque.json";
import { notePrevue } from "@/lib/maitrise";
import { chargerMaitrise } from "@/lib/parcours";
import { nouveauCodeOffre, offresActives, offreDe, rangEffectif, type Plan } from "@/lib/offres";

type QCM = { n: string; a: number };
const estSlug = (s: unknown): s is string => typeof s === "string" && MODULES.some((m) => m.slug === s);
const estDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + "T00:00:00Z"));
// Lien saisi par l'admin (visio, etc.) : uniquement http(s), pour qu'aucun « javascript: » n'arrive chez les élèves.
const lienSur = (v: FormDataEntryValue | null) => { const t = String(v || "").trim(); return /^https?:\/\/\S+$/i.test(t) ? t.slice(0, 500) : null; };

export async function rejoindre(_prev: string, form: FormData): Promise<string> {
  const code = String(form.get("code") || "").trim().toUpperCase();
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return "Connecte-toi d'abord.";
  if (!code) return "Entre ton code.";
  if (await estMembre(user)) redirect("/app"); // déjà membre : on ne consomme pas de place
  const db = admin();
  const { data: inv } = await db.from("invites").select("code, owner, uses, max_uses").eq("code", code).maybeSingle();
  if (!inv) return "Code inconnu. Vérifie l'orthographe (ex. MZ-AB12CD).";
  if (inv.uses >= inv.max_uses) return "Ce code a déjà été utilisé le nombre de fois prévu.";
  // Mise à jour conditionnelle : évite qu'un code soit consommé deux fois en même temps.
  const { data: ok } = await db.from("invites").update({ uses: inv.uses + 1 })
    .eq("code", code).eq("uses", inv.uses).select("code");
  if (!ok?.length) return "Réessaie dans un instant.";
  const { error } = await db.from("members").insert({ user_id: user.id, email: user.email, invite_code: code });
  if (error && error.code !== "23505") return "Erreur (" + error.code + ").";
  // Essai de 7 jours au niveau de l'invitant (s'il a une offre payée) et lien de parrainage.
  if (!error && inv.owner) await db.rpc("essai_invitation", { p_user: user.id, p_parrain: inv.owner });
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
  const brut = Number(form.get("minutes"));
  const minutes = Math.min(240, Math.max(15, Number.isFinite(brut) ? Math.round(brut) : 60));
  const ligne = {
    user_id: u.id,
    prenom: String(form.get("prenom") || "").trim().slice(0, 40) || null,
    filiere: String(form.get("filiere") || "").trim().slice(0, 60) || null,
    minutes_jour: minutes,
  };
  const masc = form.get("mascotte");
  const lieu = {
    etablissement: String(form.get("etablissement") || "").trim().slice(0, 80) || null,
    ville: String(form.get("ville") || "").trim().slice(0, 60) || null,
  };
  // Colonnes ajoutées par migration (mascotte, établissement, ville) : si l'une manque encore, on enregistre sans.
  const complet: Record<string, unknown> = { ...ligne, ...lieu, ...(estMascotte(masc) ? { mascotte: masc } : {}) };
  const { error } = await db.from("profiles").upsert(complet);
  if (error) {
    const { error: e2 } = await db.from("profiles").upsert((estMascotte(masc) ? { ...ligne, mascotte: masc } : ligne) as Record<string, unknown>);
    if (e2) await db.from("profiles").upsert(ligne);
  }
  const { data: communes } = await db.from("module_dates").select("module_slug, exam_date");
  const commune = new Map((communes ?? []).map((c) => [c.module_slug as string, c.exam_date as string]));
  const auj = jourMaroc();
  const choisis = form.getAll("module").map(String).filter((s) => MODULES.some((m) => m.slug === s));
  const lignes = choisis.map((slug) => {
    const inconnue = form.get("inconnue_" + slug) === "1";
    const m = MODULES.find((x) => x.slug === slug);
    const date = inconnue ? dateEstimee(m?.semestre ?? "S1", commune.get(slug)) : String(form.get("date_" + slug) || "");
    return { user_id: u.id, module_slug: slug, exam_date: date, estimee: inconnue };
  }).filter((x) => estDate(x.exam_date) && x.exam_date >= auj);
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
  // Une réservation déjà en cours ou payée n'est jamais écrasée (sinon un double clic repasserait « payée » en « en attente »).
  const { data: deja } = await db.from("live_bookings").select("statut").eq("session_id", id).eq("user_id", u.id).maybeSingle();
  if (deja && deja.statut !== "annulee") return;
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
    module_slug: estSlug(form.get("module")) ? String(form.get("module")) : null,
    starts_at: heureMarocVersUTC(quand),
    duree_min: n("duree", 90),
    prix_dh: n("prix", 25),
    places: n("places", 15),
    animateurs: String(form.get("animateurs") || "").trim().slice(0, 120) || null,
    lien: lienSur(form.get("lien")),
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
  await admin().from("live_sessions").update({ lien: lienSur(form.get("lien")) }).eq("id", String(form.get("session")));
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
  if (!estSlug(slug) || (date && !estDate(date))) return;
  const db = admin();
  if (!date) { await db.from("module_dates").delete().eq("module_slug", slug); }
  else await db.from("module_dates").upsert({ module_slug: slug, exam_date: date, officielle: form.get("officielle") === "on",
    source: String(form.get("source") || "").trim().slice(0, 120) || null, updated_at: new Date().toISOString() });
  revalidatePath("/app"); revalidatePath("/app/admin");
}

// ---------- Test de niveau ----------
// L'élève envoie ses choix ; la correction se fait ici, à partir de la banque (le navigateur ne décide pas du résultat).
export async function enregistrerNiveau(slug: string, choix: (number | null)[]): Promise<void> {
  const u = await moi();
  const qs = (NIVEAU as Record<string, QCM[]>)[slug];
  if (!estSlug(slug) || !qs || !Array.isArray(choix)) return;
  const parNotion = new Map<string, boolean>();
  qs.forEach((q, k) => { if (k < choix.length) parNotion.set(q.n, (parNotion.get(q.n) ?? true) && choix[k] === q.a); });
  const lignes = Array.from(parNotion.entries()).map(([notion, ok]) => ({ user_id: u.id, module_slug: slug, notion, ok, created_at: new Date().toISOString() }));
  if (lignes.length) await admin().from("niveau").upsert(lignes);
  revalidatePath("/app"); revalidatePath("/app/progres");
}

// ---------- Documents envoyés par les élèves ----------
const MAX_DOCS_JOUR = 20;
// Étape 1 : le serveur vérifie que l'élève est membre puis lui donne une autorisation d'envoi
// valable pour un seul fichier, dans son propre dossier. Personne ne peut déposer de fichier sans passer par ici.
export async function preparerEnvoi(nom: string): Promise<{ chemin: string; jeton: string } | { erreur: string }> {
  const u = await moi();
  const db = admin();
  const { count } = await db.from("documents").select("id", { count: "exact", head: true })
    .eq("user_id", u.id).gte("created_at", new Date(Date.now() - 864e5).toISOString());
  if ((count ?? 0) >= MAX_DOCS_JOUR) return { erreur: `Limite de ${MAX_DOCS_JOUR} documents par jour atteinte. Merci, reviens demain !` };
  const propre = String(nom || "fichier").normalize("NFD").replace(/[^\w.-]+/g, "_").replace(/^\.+/, "").slice(-80) || "fichier";
  const chemin = `${u.id}/${Date.now()}-${randomBytes(4).toString("hex")}-${propre}`;
  const { data, error } = await db.storage.from("documents").createSignedUploadUrl(chemin);
  if (error || !data) return { erreur: "Envoi impossible pour l'instant." };
  return { chemin, jeton: data.token };
}

// Étape 2 : une fois le fichier déposé, on l'enregistre (après avoir vérifié qu'il existe bien).
export async function declarerDocument(meta: { chemin: string; nom: string; type: string; module: string; moduleLibre: string; etablissement: string }): Promise<string> {
  const u = await moi();
  const chemin = String(meta.chemin || "");
  if (!chemin.startsWith(u.id + "/") || chemin.includes("..") || chemin.split("/").length !== 2) return "Fichier invalide.";
  if (!["cours", "td", "annale", "autre"].includes(meta.type)) return "Type invalide.";
  const db = admin();
  const nomObjet = chemin.split("/")[1];
  const { data: present } = await db.storage.from("documents").list(u.id, { search: nomObjet, limit: 1 });
  if (!present?.some((f) => f.name === nomObjet)) return "Fichier introuvable : renvoie-le.";
  const slug = estSlug(meta.module) ? meta.module : null;
  const { error } = await db.from("documents").insert({
    user_id: u.id, email: u.email, chemin, nom_fichier: String(meta.nom || "").slice(0, 120), type: meta.type,
    module_slug: slug, module_libre: slug ? null : String(meta.moduleLibre || "").trim().slice(0, 80) || null,
    etablissement: String(meta.etablissement || "").trim().slice(0, 80) || null,
  });
  if (error) return error.code === "23505" ? "Document déjà enregistré." : "Enregistrement impossible (" + error.code + ").";
  revalidatePath("/app/contribuer"); revalidatePath("/app/admin");
  return "";
}

export async function statutDocument(form: FormData): Promise<void> {
  await chef();
  const statut = String(form.get("statut"));
  if (!["accepte", "refuse", "recu"].includes(statut)) return;
  const db = admin();
  const id = String(form.get("id"));
  const { data: avant } = await db.from("documents").select("user_id, type, statut, analyse").eq("id", id).maybeSingle();
  // Accepter un cours importé et analysé = le partager avec toute sa fac.
  await db.from("documents").update({ statut, ...(avant?.analyse === "pret" ? { partage: statut === "accepte" } : {}), note: String(form.get("note") || "").trim().slice(0, 200) || null }).eq("id", id);
  // Offres actives : une annale acceptée = 7 jours offerts (prolonge l'offre payée en cours, sinon Premium).
  if (offresActives() && avant && avant.type === "annale" && avant.statut !== "accepte" && statut === "accepte") {
    const o = await offreDe(avant.user_id);
    await db.rpc("accorder_offre", { p_user: avant.user_id, p_plan: o.base !== "free" ? o.base : "premium", p_jours: 7, p_source: "recompense" });
  }
  revalidatePath("/app/admin"); revalidatePath("/app/contribuer");
}

// ---------- Telegram ----------
export async function lienTelegram(): Promise<string> {
  const u = await moi();
  const jeton = randomBytes(12).toString("base64url"); // 16 caractères imprévisibles, acceptés par Telegram
  await admin().from("telegram_links").upsert({ user_id: u.id, jeton, jeton_le: new Date().toISOString() });
  return `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${jeton}`;
}

export async function activerWebhook(): Promise<string> {
  await chef();
  const site = process.env.SITE_URL || "https://toumailearn.app";
  const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: `${site}/api/telegram/webhook`, secret_token: secretWebhook(), allowed_updates: ["message"] }),
  });
  const j = await r.json().catch(() => ({}));
  if (j.ok) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setMyCommands`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands: [{ command: "mission", description: "Ma mission du jour" }, { command: "stop", description: "Arrêter les rappels" }, { command: "reprendre", description: "Réactiver les rappels" }] }),
    });
  }
  return j.ok ? "Bot activé ✓" : "Échec : " + (j.description || "réponse inconnue");
}

// ---------- Examen blanc et note réelle ----------
// Même principe que le test de niveau : le navigateur envoie les choix, le serveur corrige.
export async function enregistrerBlanc(slug: string, copie: { id: number; c: number | null }[], dureeS: number): Promise<void> {
  const u = await moi();
  const banque = (BANQUE as Record<string, QCM[]>)[slug];
  if (!estSlug(slug) || !banque || !Array.isArray(copie) || !copie.length || copie.length > 40) return;
  if ((await rangEffectif(u.id, estAdmin(u))) < 3) return; // examen blanc : offre Premium
  const vues = new Set<number>();
  const notees = copie.filter((x) => Number.isInteger(x?.id) && x.id >= 0 && x.id < banque.length && !vues.has(x.id) && vues.add(x.id))
    .map((x) => ({ n: banque[x.id].n, ok: x.c === banque[x.id].a }));
  if (notees.length < 5) return;
  const db = admin();
  // Une copie rendue deux fois (chrono + bouton au même moment) n'est comptée qu'une fois.
  const { count } = await db.from("blancs").select("id", { count: "exact", head: true })
    .eq("user_id", u.id).eq("module_slug", slug).gte("created_at", new Date(Date.now() - 30e3).toISOString());
  if (count) return;
  const bons = notees.filter((r) => r.ok).length;
  const duree = Number.isFinite(dureeS) ? Math.min(7200, Math.max(0, Math.round(dureeS))) : 0;
  await db.from("blancs").insert({ user_id: u.id, module_slug: slug, note: Math.round((bons / notees.length) * 200) / 10, nb_questions: notees.length, duree_s: duree });
  // Dernier résultat par notion (une notion ratée remonte dans « À retravailler »)
  const parNotion = new Map<string, boolean>();
  notees.forEach((r) => parNotion.set(r.n, (parNotion.get(r.n) ?? true) && r.ok));
  await db.from("niveau").upsert(Array.from(parNotion.entries()).map(([n, ok]) => ({ user_id: u.id, module_slug: slug, notion: n, ok, created_at: new Date().toISOString() })));
  revalidatePath("/app/progres"); revalidatePath("/app");
}

export async function enregistrerNoteReelle(form: FormData): Promise<void> {
  const u = await moi();
  const slug = String(form.get("module"));
  const note = Number(String(form.get("note") || "").replace(",", "."));
  if (!estSlug(slug) || !Number.isFinite(note) || note < 0 || note > 20) return;
  const db = admin();
  // Note prévue recalculée ici (jamais reçue du navigateur) et figée à la première saisie :
  // c'est elle qu'on compare à la note réelle.
  const { data: avant } = await db.from("notes_reelles").select("note_prevue").eq("user_id", u.id).eq("module_slug", slug).maybeSingle();
  let prevue = avant?.note_prevue ?? null;
  if (prevue === null) { const m = (await chargerMaitrise(u))[slug]; prevue = m ? notePrevue(m).note : null; }
  await db.from("notes_reelles").upsert({ user_id: u.id, module_slug: slug, note: Math.round(note * 100) / 100, note_prevue: prevue, created_at: new Date().toISOString() });
  revalidatePath("/app/progres"); revalidatePath("/app/admin");
}

// ---------- Offres : codes d'activation ----------
export async function activerCode(_prev: string, form: FormData): Promise<string> {
  const u = await moi();
  const code = String(form.get("code") || "").trim().toUpperCase();
  if (!code) return "Entre ton code.";
  const { data, error } = await admin().rpc("utiliser_code", { p_user: u.id, p_code: code });
  if (error) return "Activation impossible pour l'instant.";
  const r = data as { ok: boolean; message?: string; plan?: Plan; fin?: string };
  revalidatePath("/app/moi"); revalidatePath("/app/offres");
  if (!r.ok) return r.message || "Code refusé.";
  const nom = r.plan === "premium" ? "Premium" : "Essentiel";
  return `✓ Offre ${nom} activée jusqu'au ${new Date(r.fin!).toLocaleDateString("fr-FR")}.`;
}

const PLANS_PAYANTS = ["essentiel", "premium"];

export async function genererCodes(_prev: string, form: FormData): Promise<string> {
  await chef();
  const plan = String(form.get("plan"));
  const jours = Math.round(Number(form.get("jours")));
  const nombre = Math.round(Number(form.get("nombre")));
  if (!PLANS_PAYANTS.includes(plan) || !(jours >= 1 && jours <= 400) || !(nombre >= 1 && nombre <= 50)) return "Paramètres invalides.";
  const lot = String(form.get("lot") || "").trim().slice(0, 60) || null;
  const codes = Array.from({ length: nombre }, () => nouveauCodeOffre());
  const { error } = await admin().from("codes_offre").insert(codes.map((code) => ({ code, plan, jours, lot })));
  if (error) return "Erreur (" + error.code + "), réessaie.";
  revalidatePath("/app/admin");
  return codes.join("\n");
}

export async function accorderOffreAdmin(_prev: string, form: FormData): Promise<string> {
  await chef();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const plan = String(form.get("plan"));
  const jours = Math.round(Number(form.get("jours")));
  if (!email || !PLANS_PAYANTS.includes(plan) || !(jours >= 1 && jours <= 400)) return "Paramètres invalides.";
  const db = admin();
  const { data: m } = await db.from("members").select("user_id").ilike("email", email.replace(/[%_\\]/g, (c) => "\\" + c)).maybeSingle();
  if (!m) return "Aucun membre avec cet e-mail.";
  const { data: fin, error } = await db.rpc("accorder_offre", { p_user: m.user_id, p_plan: plan, p_jours: jours, p_source: "paid" });
  if (error) return "Erreur (" + error.code + ").";
  revalidatePath("/app/admin");
  return `✓ ${plan === "premium" ? "Premium" : "Essentiel"} jusqu'au ${new Date(fin as string).toLocaleDateString("fr-FR")} pour ${email}.`;
}

// Changer de guide (mascotte) depuis « Moi ».
export async function changerMascotte(form: FormData): Promise<void> {
  const u = await moi();
  const m = form.get("mascotte");
  if (!estMascotte(m)) return;
  await admin().from("profiles").update({ mascotte: m }).eq("user_id", u.id);
  revalidatePath("/app", "layout");
}

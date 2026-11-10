"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin, estMembre } from "@/lib/acces";
import { estSemestre, norm, quotaImport, resoudreEtab } from "@/lib/fac";

async function moi() {
  const { data: { user } } = await createClient().auth.getUser();
  // Membre obligatoire, comme dans ../actions.ts : un compte sans invitation ne peut ni créer d'établissement ni importer.
  if (!user || !(await estMembre(user))) throw new Error("Accès refusé");
  return user;
}

// Choix de l'établissement : un existant (id) ou un nouveau (nom tapé en toutes lettres).
export async function choisirFac(_prev: string, form: FormData): Promise<string> {
  const u = await moi();
  const r = await resoudreEtab(u.id, estAdmin(u), String(form.get("id") || ""), String(form.get("nom") || ""), String(form.get("ville") || ""));
  if ("erreur" in r) return r.erreur;
  const s = String(form.get("semestre") || "");
  const { error } = await admin().from("profiles").upsert({ user_id: u.id, etablissement_id: r.id, etablissement: r.nom, ville: r.ville, ...(estSemestre(s) ? { semestre: s } : {}) });
  if (error) return "Enregistrement impossible (" + error.code + ").";
  revalidatePath("/app/modules");
  return "";
}

export async function changerFac(): Promise<void> {
  const u = await moi();
  await admin().from("profiles").update({ etablissement_id: null }).eq("user_id", u.id);
  revalidatePath("/app/modules");
}

export async function choisirSemestre(form: FormData): Promise<void> {
  const u = await moi();
  const s = String(form.get("semestre"));
  const filiere = String(form.get("filiere") || "").trim().slice(0, 60);
  if (!estSemestre(s)) return;
  await admin().from("profiles").update({ semestre: s, ...(filiere ? { filiere } : {}) }).eq("user_id", u.id);
  revalidatePath("/app/modules");
}

// Cours importé depuis « Mon module n'y est pas » : enregistré puis analysé par /api/analyse.
export async function declarerCours(meta: { chemin: string; nom: string; type: string; module: string; semestre: string }): Promise<{ id: string } | { erreur: string }> {
  const u = await moi();
  const chemin = String(meta.chemin || "");
  if (!chemin.startsWith(u.id + "/") || chemin.includes("..") || chemin.split("/").length !== 2) return { erreur: "Fichier invalide." };
  if (!["cours", "td", "annale", "autre"].includes(meta.type)) return { erreur: "Type invalide." };
  if (!estSemestre(meta.semestre)) return { erreur: "Semestre invalide." };
  const nomModule = String(meta.module || "").replace(/\s+/g, " ").trim().slice(0, 80);
  if (nomModule.length < 2) return { erreur: "Indique le nom du module." };
  const q = await quotaImport(u.id, estAdmin(u));
  if (q.reste <= 0) return { erreur: `Tu as utilisé tes ${q.total} imports (sur ${q.jours} jours). Passe au Premium pour en avoir plus.` };
  const db = admin();
  const nomObjet = chemin.split("/")[1];
  const { data: present } = await db.storage.from("documents").list(u.id, { search: nomObjet, limit: 1 });
  if (!present?.some((f) => f.name === nomObjet)) return { erreur: "Fichier introuvable : renvoie-le." };
  const { data: p } = await db.from("profiles").select("etablissement_id, etablissement, filiere").eq("user_id", u.id).maybeSingle();
  if (!p?.etablissement_id) return { erreur: "Choisis d'abord ton établissement." };
  const { data, error } = await db.from("documents").insert({
    user_id: u.id, email: u.email, chemin, nom_fichier: String(meta.nom || "").slice(0, 120), type: meta.type,
    module_libre: nomModule, etablissement: p.etablissement, etablissement_id: p.etablissement_id,
    semestre: meta.semestre, filiere: p.filiere ?? null, analyse: "en_cours", // pris en charge par le pipeline d'import
  }).select("id").single();
  if (error || !data) return { erreur: "Enregistrement impossible (" + (error?.code ?? "?") + ")." };
  revalidatePath("/app/modules"); revalidatePath("/app/admin");
  return { id: data.id };
}

// Admin : rendre un cours visible par toute sa fac (ou le retirer).
export async function partagerCours(form: FormData): Promise<void> {
  const u = await moi();
  if (!estAdmin(u)) return;
  const id = String(form.get("id"));
  const partage = form.get("partage") === "1";
  await admin().from("documents").update({ partage, ...(partage ? { statut: "accepte" } : {}) }).eq("id", id);
  revalidatePath("/app/admin"); revalidatePath(`/app/cours/${id}`); revalidatePath("/app/modules");
}

// Admin : valider un établissement, ou le fusionner dans un autre (doublon).
export async function gererEtab(form: FormData): Promise<void> {
  const u = await moi();
  if (!estAdmin(u)) return;
  const db = admin();
  const id = String(form.get("id"));
  const vers = String(form.get("vers") || "");
  if (vers && vers !== id) {
    const { data: e } = await db.from("etablissements").select("nom").eq("id", id).single();
    const { data: cible } = await db.from("etablissements").select("nom, alias").eq("id", vers).single();
    if (!e || !cible) return;
    await db.from("profiles").update({ etablissement_id: vers, etablissement: cible.nom }).eq("etablissement_id", id);
    await db.from("documents").update({ etablissement_id: vers, etablissement: cible.nom }).eq("etablissement_id", id);
    await db.from("etablissements").update({ alias: Array.from(new Set([...(cible.alias ?? []), norm(e.nom)])) }).eq("id", vers);
    await db.from("etablissements").delete().eq("id", id);
  } else {
    await db.from("etablissements").update({ valide: true }).eq("id", id);
  }
  revalidatePath("/app/admin");
}

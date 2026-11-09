import { admin } from "@/lib/acces";
import { offresActives, offreDe, type Plan } from "@/lib/offres";

import { norm, score, type Etab } from "./fac-commun";
export * from "./fac-commun";

// ---------- Quota d'imports analysés par l'IA (spec V1) ----------
const env = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);
export const QUOTA_IMPORT: Record<Plan, { n: number; jours: number }> = {
  free: { n: env(process.env.IMPORT_QUOTA_FREE, 2), jours: 183 },
  essentiel: { n: env(process.env.IMPORT_QUOTA_ESSENTIEL, 5), jours: 30 },
  premium: { n: env(process.env.IMPORT_QUOTA_PREMIUM, 15), jours: 30 },
};
// Pendant la bêta (offres inactives) : 5 imports par 30 jours pour tout le monde.
const BETA = { n: env(process.env.IMPORT_QUOTA_BETA, 5), jours: 30 };

export async function quotaImport(userId: string, chef: boolean) {
  if (chef) return { reste: 999, total: 999, jours: 30, plan: "premium" as Plan };
  const plan: Plan = offresActives() ? (await offreDe(userId)).plan : "premium";
  const q = offresActives() ? QUOTA_IMPORT[plan] : BETA;
  const depuis = new Date(Date.now() - q.jours * 86400000).toISOString();
  const { count } = await admin().from("documents").select("id", { count: "exact", head: true })
    .eq("user_id", userId).neq("analyse", "aucune").neq("analyse", "erreur").gte("created_at", depuis);
  return { reste: Math.max(0, q.n - (count ?? 0)), total: q.n, jours: q.jours, plan };
}


// Établissement choisi (id) ou tapé en toutes lettres : renvoie l'id, en créant l'établissement s'il est nouveau.
export async function resoudreEtab(userId: string, chef: boolean, id: string, nomBrut: string, villeBrute: string): Promise<{ id: string; nom: string; ville: string | null } | { erreur: string }> {
  const db = admin();
  const nom = nomBrut.replace(/\s+/g, " ").trim().slice(0, 120);
  const ville = villeBrute.replace(/\s+/g, " ").trim().slice(0, 60) || null;
  if (id) {
    const { data } = await db.from("etablissements").select("id, nom, ville").eq("id", id).maybeSingle();
    if (data) return data;
  }
  if (norm(nom).length < 4) return { erreur: "Écris le nom complet de ton établissement." };
  const { data: tous } = await db.from("etablissements").select("id, nom, ville, alias, valide");
  const meme = ((tous ?? []) as Etab[]).find((e) => score(nom, e) >= 95);
  if (meme) return { id: meme.id, nom: meme.nom, ville: meme.ville };
  const { count } = await db.from("etablissements").select("id", { count: "exact", head: true }).eq("cree_par", userId);
  if ((count ?? 0) >= 3 && !chef) return { erreur: "Tu as déjà ajouté 3 établissements : choisis-en un dans la liste." };
  const { data: cree, error } = await db.from("etablissements").insert({ nom, ville, cree_par: userId }).select("id, nom, ville").single();
  if (error || !cree) return { erreur: "Ajout de l'établissement impossible pour l'instant." };
  return cree;
}

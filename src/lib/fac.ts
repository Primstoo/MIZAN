import { admin } from "@/lib/acces";
import { offresActives, offreDe, type Plan } from "@/lib/offres";

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


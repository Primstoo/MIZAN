import { admin } from "@/lib/acces";

// Récompense des contributeurs : chaque document accepté ajoute des questions au tuteur, chaque jour.
export const BONUS_PAR_TYPE: Record<string, number> = { annale: 10, td: 5, cours: 5, autre: 2 };
export const BONUS_MAX = 30;

export async function bonusTuteur(userId: string) {
  const { data } = await admin().from("documents").select("type").eq("user_id", userId).eq("statut", "accepte");
  return Math.min(BONUS_MAX, (data ?? []).reduce((t, d) => t + (BONUS_PAR_TYPE[d.type as string] ?? 0), 0));
}

import { admin } from "@/lib/acces";
import { randomBytes } from "node:crypto";

// Offres Gratuit / Abonnement mensuel (essentiel) / Pass examen (spec V1 06/11, D33 18/11/2026).
// Tant que OFFRES_ACTIVES n'est pas à 1, rien ne change pour les élèves (bêta : quota historique, tout ouvert).
// 18/11/2026 : « essentiel » = abonnement mensuel ; « examen » = Pass examen (court, accès complet, rang 3 comme Premium).
// Aucun prix n'est affiché dans l'appli : orientation + renvoi WhatsApp (WHATSAPP_CONTACT).
export type Plan = "free" | "essentiel" | "premium" | "examen";
export const NOMS: Record<Plan, string> = { free: "Gratuit", essentiel: "Abonnement mensuel", premium: "Premium", examen: "Pass examen" };
export const RANG: Record<Plan, number> = { free: 1, essentiel: 2, premium: 3, examen: 3 };
export const WHATSAPP_CONTACT = { numero: "+212 6 72 95 12 55", lien: "https://wa.me/212672951255" };
export const whatsappLien = (sujet: string) => `${WHATSAPP_CONTACT.lien}?text=${encodeURIComponent(`Bonjour, je voudrais des infos sur les offres ToumaiLearn (${sujet}).`)}`;

export const offresActives = () => process.env.OFFRES_ACTIVES === "1";

// Questions au tuteur par jour, selon l'offre. Réglables sans toucher au code.
const n = (v: string | undefined, d: number) => (Number.isFinite(Number(v)) && v ? Number(v) : d);
export const QUOTA_TUTEUR: Record<Plan, number> = {
  free: n(process.env.TUTOR_QUOTA_FREE, 5),
  essentiel: n(process.env.TUTOR_QUOTA_ESSENTIEL, 20),
  premium: n(process.env.TUTOR_QUOTA_PREMIUM, 100), // plafond anti-abus « caché »
  examen: n(process.env.TUTOR_QUOTA_EXAMEN, 40),
};

export type Offre = {
  plan: Plan;            // offre effective (plan payé ou bonus, le plus élevé)
  base: Plan;            // offre payée / essai, sans le bonus de parrainage
  fin: string | null;    // fin de l'offre effective
  source: string | null; // paid | invite | recompense
  bonus: { plan: Plan; fin: string } | null;
};

const actif = (d: string | null | undefined) => !!d && Date.parse(d) > Date.now();

export async function offreDe(userId: string): Promise<Offre> {
  const { data: a } = await admin().from("abonnements")
    .select("plan, plan_until, plan_source, bonus_plan, bonus_until").eq("user_id", userId).maybeSingle();
  const base: Plan = a && a.plan !== "free" && actif(a.plan_until) ? (a.plan as Plan) : "free";
  const bonus = a?.bonus_plan && actif(a.bonus_until) ? { plan: a.bonus_plan as Plan, fin: a.bonus_until as string } : null;
  const parBonus = bonus && RANG[bonus.plan] > RANG[base];
  return {
    plan: parBonus ? bonus!.plan : base,
    base,
    fin: parBonus ? bonus!.fin : base !== "free" ? (a!.plan_until as string) : null,
    source: base !== "free" ? (a!.plan_source as string) : null,
    bonus,
  };
}

// Rang utilisé pour les droits : en bêta (offres inactives), tout le monde a tout.
export async function rangEffectif(userId: string, estChef = false) {
  if (estChef || !offresActives()) return 3;
  return RANG[(await offreDe(userId)).plan];
}

// Code lisible, sans caractères ambigus (0/O, 1/I), ex. TOUMAI-K7QX-2MPA
export function nouveauCodeOffre() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = randomBytes(8);
  const s = Array.from(b, (x) => a[x % a.length]).join("");
  return `TOUMAI-${s.slice(0, 4)}-${s.slice(4)}`;
}

export const dateFr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

import type { User } from "@supabase/supabase-js";
import { admin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";

// Données du parcours de l'élève (profil, examens, série, mission du jour).
// Lues côté serveur avec la clé service, toujours filtrées sur l'élève connecté.

export const jourMaroc = (d = new Date()) =>
  new Intl.DateTimeFormat("fr-CA", { timeZone: "Africa/Casablanca" }).format(d); // AAAA-MM-JJ

export const joursEntre = (de: string, a: string) =>
  Math.round((Date.parse(a + "T00:00:00Z") - Date.parse(de + "T00:00:00Z")) / 864e5);

export async function chargerParcours(u: User) {
  const db = admin();
  const [{ data: profil }, { data: exams }, { data: act }] = await Promise.all([
    db.from("profiles").select("prenom, filiere, minutes_jour").eq("user_id", u.id).maybeSingle(),
    db.from("exams").select("module_slug, exam_date").eq("user_id", u.id),
    db.from("activity").select("day, module_slug").eq("user_id", u.id).gte("day", jourMaroc(new Date(Date.now() - 60 * 864e5))),
  ]);
  const auj = jourMaroc();
  const jours = new Set((act ?? []).map((a) => a.day as string));

  // Série : jours consécutifs avec révision, jusqu'à aujourd'hui (ou hier si rien encore aujourd'hui).
  let serie = 0;
  for (let i = jours.has(auj) ? 0 : 1; i < 60; i++) {
    if (jours.has(jourMaroc(new Date(Date.now() - i * 864e5)))) serie++; else break;
  }
  // Semaine en cours (lundi → dimanche)
  const dow = (new Date(auj + "T12:00:00Z").getUTCDay() + 6) % 7;
  const semaine = Array.from({ length: 7 }, (_, i) => {
    const d = jourMaroc(new Date(Date.parse(auj + "T12:00:00Z") + (i - dow) * 864e5));
    return { d, fait: jours.has(d), aujourdhui: d === auj, futur: d > auj };
  });

  const examens = (exams ?? [])
    .map((e) => ({ ...e, module: MODULES.find((m) => m.slug === e.module_slug), reste: joursEntre(auj, e.exam_date as string) }))
    .filter((e) => e.module && e.reste >= 0)
    .sort((a, b) => a.reste - b.reste);

  const faitAujourdhui = new Set((act ?? []).filter((a) => a.day === auj).map((a) => a.module_slug as string));
  return { profil, examens, serie, semaine, faitAujourdhui, auj };
}

// Mission du jour : le module dont l'examen est le plus proche, séance calibrée sur le temps dispo.
export function missionDuJour(minutes: number, reste: number) {
  const urgent = reste <= 14;
  const etapes =
    minutes <= 30
      ? ["Revoir 5 flashcards en retard", "Lire une section du cours", "Quiz de 5 questions"]
      : minutes <= 60
      ? ["Revoir 5 flashcards en retard", "Une section du cours (onglet Comprendre si besoin)", "3 questions en Rédaction", "10 calculs ou exercices"]
      : ["Revoir les flashcards en retard", "Deux sections du cours", "3 questions en Rédaction", "10 calculs ou exercices", "Un TD inédit en conditions réelles"];
  if (urgent) etapes.splice(1, 1, "Examen blanc ou TD inédit chronométré");
  return { etapes, urgent };
}

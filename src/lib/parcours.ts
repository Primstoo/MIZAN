import type { User } from "@supabase/supabase-js";
import { admin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { calculerMaitrise, type Maitrise } from "@/lib/maitrise";

// Données du parcours de l'élève (profil, examens, série, mission du jour).
// Lues côté serveur avec la clé service, toujours filtrées sur l'élève connecté.

export const jourMaroc = (d = new Date()) =>
  new Intl.DateTimeFormat("fr-CA", { timeZone: "Africa/Casablanca" }).format(d); // AAAA-MM-JJ

export const joursEntre = (de: string, a: string) =>
  Math.round((Date.parse(a + "T00:00:00Z") - Date.parse(de + "T00:00:00Z")) / 864e5);

export async function chargerParcours(u: User) {
  const db = admin();
  const [{ data: profil }, { data: exams }, { data: act }, { data: communes }] = await Promise.all([
    db.from("profiles").select("*").eq("user_id", u.id).maybeSingle(),
    db.from("exams").select("module_slug, exam_date, estimee").eq("user_id", u.id),
    db.from("activity").select("day, module_slug").eq("user_id", u.id).gte("day", jourMaroc(new Date(Date.now() - 60 * 864e5))),
    db.from("module_dates").select("module_slug, exam_date, officielle"),
  ]);
  const commune = new Map((communes ?? []).map((c) => [c.module_slug as string, c]));
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

  // Date estimée : remplacée par la date commune du module dès que l'admin la renseigne.
  const examens = (exams ?? [])
    .map((e) => {
      const c = e.estimee ? commune.get(e.module_slug as string) : undefined;
      const date = (c?.exam_date ?? e.exam_date) as string;
      const estimee = !!e.estimee && !c?.officielle;
      return { module_slug: e.module_slug as string, exam_date: date, estimee, module: MODULES.find((m) => m.slug === e.module_slug), reste: joursEntre(auj, date) };
    })
    .filter((e) => e.module && e.reste >= 0)
    .sort((a, b) => a.reste - b.reste);

  const faitAujourdhui = new Set((act ?? []).filter((a) => a.day === auj).map((a) => a.module_slug as string));
  return { profil, examens, serie, semaine, faitAujourdhui, auj };
}

// Mission du jour : le module dont l'examen est le plus proche, séance calibrée sur le temps dispo.
// Le vocabulaire suit les onglets réels de chaque module (tous n'ont pas de « Rédaction » ni de « TD inédit »).
type Etape = { k: "rev" | "lec" | "ecr" | "ent" | "gros"; t: string };
const VOCAB: Record<string, Record<Etape["k"], string>> = {
  "reseaux-m351": { rev: "Revoir tes flashcards en retard", lec: "Une section du cours", ecr: "3 questions en Rédaction", ent: "10 calculs (onglet Calculs)", gros: "Le TD inédit, en conditions réelles" },
  archi: { rev: "Revoir tes cartes", lec: "Une section du cours", ecr: "Un exercice de l'Atelier", ent: "Un exercice du TD / TP", gros: "L'examen blanc du module, chronométré" },
  probas: { rev: "Revoir tes cartes", lec: "Une notion du cours", ecr: "Un exercice-type", ent: "10 calculs (onglet Calculs)", gros: "Une annale, en conditions réelles" },
  crypto: { rev: "Revoir tes cartes", lec: "Un chapitre du cours, en entier", ecr: "Le quiz de fin de chapitre", ent: "Les exercices du chapitre (chiffrer, déchiffrer)", gros: "L'examen blanc ToumaiLearn (20 min)" },
  uml: { rev: "Revoir tes cartes", lec: "Un chapitre du cours", ecr: "Le diagramme d'exercice du chapitre", ent: "Refaire un diagramme sans regarder le corrigé", gros: "L'examen blanc du module, chronométré" },
};
const VOCAB_DEFAUT = { rev: "Revoir tes cartes", lec: "Une section du cours", ecr: "Le quiz de la section", ent: "Une série d'exercices", gros: "L'examen blanc ToumaiLearn (20 min)" };

function etapesDuJour(minutes: number, reste: number, slug?: string): Etape[] {
  const v = (slug && VOCAB[slug]) || VOCAB_DEFAUT;
  const ks: Etape["k"][] = minutes <= 30 ? ["rev", "lec", "ecr"] : minutes <= 60 ? ["rev", "lec", "ecr", "ent"] : ["rev", "lec", "ecr", "ent", "gros"];
  // À deux semaines de l'examen, on s'entraîne en conditions réelles plutôt que de découvrir le cours.
  if (reste <= 14) ks.splice(1, 1, "gros");
  return Array.from(new Set(ks)).map((k) => ({ k, t: v[k] }));
}

export function missionDuJour(minutes: number, reste: number, slug?: string) {
  return { etapes: etapesDuJour(minutes, reste, slug).map((e) => e.t), urgent: reste <= 14 };
}

// Estimation quand la date n'est pas annoncée : sessions habituelles de fin de semestre
// (semestres impairs : mi-janvier ; pairs : mi-juin). À remplacer dès que la date est connue.
export function dateEstimee(semestre: string, communeISO?: string) {
  if (communeISO) return communeISO;
  const n = Number(semestre.replace(/\D/g, "")) || 1;
  const auj = jourMaroc();
  const an = Number(auj.slice(0, 4));
  const mois = n % 2 ? "01-15" : "06-15";
  let d = `${an}-${mois}`;
  if (d <= auj) d = `${an + 1}-${mois}`;
  return d;
}

// Maîtrise de chaque module, calculée à partir de la progression synchronisée.
export async function chargerMaitrise(u: User): Promise<Record<string, Maitrise>> {
  const db = admin();
  const [{ data }, { data: niv }] = await Promise.all([
    db.from("progress").select("module_slug, data").eq("user_id", u.id),
    db.from("niveau").select("module_slug, notion, ok").eq("user_id", u.id),
  ]);
  const out: Record<string, Maitrise> = {};
  for (const m of MODULES) {
    const row = (data ?? []).find((r) => r.module_slug === m.slug);
    const n = Object.fromEntries((niv ?? []).filter((x) => x.module_slug === m.slug).map((x) => [x.notion as string, !!x.ok]));
    const x = calculerMaitrise(m.slug, (row?.data ?? {}) as Record<string, string>, n);
    if (x) out[m.slug] = x;
  }
  return out;
}

// Mission du jour personnalisée : on commence par les notions ratées, puis les notions
// importantes jamais testées ; elles remplacent la lecture « générique » du cours.
export function missionPerso(minutes: number, reste: number, m?: Maitrise, slug?: string) {
  const urgent = reste <= 14;
  const base = etapesDuJour(minutes, reste, slug ?? m?.slug);
  const sansCibles = { etapes: base.map((e) => e.t), urgent, cibles: [] as string[] };
  if (!m) return sansCibles;
  const nb = minutes <= 30 ? 1 : minutes <= 60 ? 2 : 3;
  const ratees = m.faibles.filter((i) => i.statut === "fragile").slice(0, nb);
  const neuves = m.faibles.filter((i) => i.statut === "jamais").slice(0, nb - ratees.length);
  const cibles = [
    ...ratees.map((i) => `Retravailler « ${i.t} »${i.score ? ` (${Math.round(i.score * 100)} % de réussite)` : ""}`),
    ...neuves.map((i) => `Découvrir et te tester sur « ${i.t} » (importance ${i.imp}/5)`),
  ];
  if (!cibles.length) return sansCibles;
  const reste_ = base.filter((e) => e.k !== "lec").slice(0, Math.max(1, base.length - cibles.length)).map((e) => e.t);
  return { etapes: [...cibles, ...reste_], urgent, cibles };
}

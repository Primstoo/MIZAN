import { CONSEILS } from "@/lib/conseils";

// Rappels envoyés en notification, une fois par jour (route /api/rappels, Vercel Cron 18 h).
// Un seul rappel par jour et par élève, 3 par semaine au maximum. Priorité : examen > inscription > inactivité > conseil.

export type TypeRappel = "inscription" | "inactif" | "examen" | "conseil";
export type Envoi = { type: TypeRappel; cle: string; ilYa: number }; // ilYa : jours écoulés depuis l'envoi
export type Contexte = {
  aProfil: boolean;
  inscritDepuis: number;            // jours depuis la création du compte
  sansReviser: number | null;       // jours depuis la dernière révision (null : jamais révisé)
  examen?: { slug: string; titre: string; reste: number };
  historique: Envoi[];              // envois des 30 derniers jours
  jourSemaine: number;              // 0 dimanche … 6 samedi (heure du Maroc)
  numeroJour: number;               // sert à faire tourner les conseils
};
export type Rappel = { type: TypeRappel; cle: string; title: string; body: string; url: string };

export const PALIERS_EXAMEN = [14, 7, 3, 1];
const MAX_SEMAINE = 3;

export function choisirRappel(c: Contexte): Rappel | null {
  const h = c.historique;
  if (h.some((e) => e.ilYa < 1)) return null;
  if (h.filter((e) => e.ilYa < 7).length >= MAX_SEMAINE) return null;
  const deja = (cle: string) => h.some((e) => e.cle === cle);

  // Inscription pas terminée : à J+1 puis J+3, jamais plus.
  if (!c.aProfil) {
    if (c.inscritDepuis >= 3 && !deja("inscription-2"))
      return { type: "inscription", cle: "inscription-2", title: "ToumaiLearn", body: "Tes révisions t'attendent. On finit ton inscription ?", url: "/app/bienvenue" };
    if (c.inscritDepuis >= 1 && !deja("inscription-1") && !deja("inscription-2"))
      return { type: "inscription", cle: "inscription-1", title: "ToumaiLearn", body: "Il te manque juste ta fac et tes modules. 1 minute et c'est bon.", url: "/app/bienvenue" };
    return null;
  }

  // Examen proche : J-14, J-7, J-3, J-1.
  const ex = c.examen;
  if (ex && PALIERS_EXAMEN.includes(ex.reste)) {
    const cle = `examen-${ex.slug}-${ex.reste}`;
    if (!deja(cle)) {
      const body = ex.reste === 1 ? `${ex.titre} demain. Un dernier tour de cartes ?` : `${ex.titre} dans ${ex.reste} jours. On avance un chapitre ce soir ?`;
      return { type: "examen", cle, title: "Je te préviens", body, url: `/app/m/${ex.slug}` };
    }
  }

  // Inactivité : après 2 jours, après 5 jours, puis une fois par semaine.
  const s = c.sansReviser ?? (c.inscritDepuis >= 2 ? c.inscritDepuis : null);
  if (s !== null && s >= 2) {
    const depuisPause = h.filter((e) => e.type === "inactif" && e.ilYa < s);
    const dernier = Math.min(...depuisPause.map((e) => e.ilYa), Infinity);
    const n = depuisPause.length;
    if (n === 0) return { type: "inactif", cle: `inactif-${c.numeroJour}`, title: "ToumaiLearn", body: "Ton examen ne se prépare pas tout seul. 10 minutes ce soir ?", url: "/app" };
    if (n === 1 && s >= 5) return { type: "inactif", cle: `inactif-${c.numeroJour}`, title: "ToumaiLearn", body: "Quelques jours sans réviser. On reprend doucement ?", url: "/app" };
    if (n >= 2 && dernier >= 7) return { type: "inactif", cle: `inactif-${c.numeroJour}`, title: "ToumaiLearn", body: "Une petite session aujourd'hui ? Toumaï t'attend.", url: "/app" };
  }

  // Conseil d'apprentissage : mardi et vendredi.
  if (c.jourSemaine === 2 || c.jourSemaine === 5) {
    const k = CONSEILS[c.numeroJour % CONSEILS.length];
    const cle = `conseil-${c.numeroJour}`;
    if (!deja(cle)) return { type: "conseil", cle, title: k.titre ? `Le savais-tu ? ${k.titre}` : "Le savais-tu ?", body: k.texte, url: k.action?.href ?? "/app" };
  }
  return null;
}

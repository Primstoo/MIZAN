import CATALOGUE from "./notions.json";

// Maîtrise des notions, dans un format commun à tous les modules.
// Chaque module garde sa progression à sa façon (dans le navigateur) ; elle est copiée telle quelle
// dans la table « progress » par la synchronisation. Ici, un petit « adaptateur » par module
// la traduit en statuts comparables. Aucun module n'a besoin d'être modifié.
// Catalogue des notions : src/lib/notions.json (régénéré par scripts/extraire-notions.cjs).

export type Statut = "ok" | "fragile" | "jamais";
export type Item = { id: string; t: string; imp: number; g: string; statut: Statut; score: number | null };
export type Groupe = { id: string; t: string; total: number; ok: number; fragile: number };
export type Maitrise = { slug: string; unite: string; items: Item[]; groupes: Groupe[]; pct: number; testes: number; faibles: Item[] };

type Cat = { unite: string; groupes: { id: string; t: string }[]; items: { id: string; t: string; imp: number; g: string }[] };
const CAT = CATALOGUE as Record<string, Cat>;
type Brut = Record<string, string>;

const lire = (d: Brut, k: string) => { try { return JSON.parse(d[k] ?? "null"); } catch { return null; } };

// Même règle que dans les modules : maîtrisé = au moins 3 essais et 80 % sur les 5 derniers.
function parEssais(essais: number[] | undefined): [Statut, number | null] {
  if (!essais?.length) return ["jamais", null];
  const der = essais.slice(-5);
  const r = der.reduce((a, b) => a + b, 0) / der.length;
  return [essais.length >= 3 && r >= 0.8 ? "ok" : "fragile", r];
}
const parScore = (s: number | undefined | null, seuil: number, max: number): [Statut, number | null] =>
  s === undefined || s === null ? ["jamais", null] : [s >= seuil ? "ok" : "fragile", s / max];

const ADAPT: Record<string, (d: Brut, id: string) => [Statut, number | null]> = {
  "reseaux-m351": (d, id) => parEssais(lire(d, "m351-revision-v1")?.attempts?.[id]),
  archi: (d, id) => parEssais(lire(d, "ao-revision-v1")?.attempts?.[id]),
  probas: (d, id) => parScore(lire(d, "ps3_revision_v1")?.notions?.[id]?.best, 0.8, 1),
  crypto: (d, id) => parScore(lire(d, "cryptoPR")?.[id]?.pc, 80, 100),
  uml: (d, id) => parScore(lire(d, "umlp_scores")?.[id], 8, 10),
};

export function calculerMaitrise(slug: string, data: Brut | null | undefined, niveau: Record<string, boolean> = {}): Maitrise | null {
  const cat = CAT[slug], f = ADAPT[slug];
  if (!cat || !f) return null;
  const d = data ?? {};
  const items: Item[] = cat.items.map((n) => {
    let [statut, score] = f(d, n.id);
    // Test de niveau : une erreur sur une notion jamais travaillée la classe « à revoir ».
    if (statut === "jamais" && niveau[n.id] === false) { statut = "fragile"; score = 0; }
    return { ...n, statut, score };
  });
  const groupes = cat.groupes
    .map((g) => {
      const l = items.filter((i) => i.g === g.id);
      return { id: g.id, t: g.t, total: l.length, ok: l.filter((i) => i.statut === "ok").length, fragile: l.filter((i) => i.statut === "fragile").length };
    })
    .filter((g) => g.total > 0);
  const ok = items.filter((i) => i.statut === "ok").length;
  // Points faibles : d'abord les notions ratées (les plus importantes et les moins réussies),
  // puis les notions importantes jamais testées.
  const faibles = [
    ...items.filter((i) => i.statut === "fragile").sort((a, b) => b.imp - a.imp || (a.score ?? 0) - (b.score ?? 0)),
    ...items.filter((i) => i.statut === "jamais" && i.imp >= 4).sort((a, b) => b.imp - a.imp),
  ];
  return {
    slug, unite: cat.unite, items, groupes,
    pct: items.length ? Math.round((ok / items.length) * 100) : 0,
    testes: items.filter((i) => i.statut !== "jamais").length,
    faibles,
  };
}


// Note prévue sur 20 : moyenne pondérée par l'importance des notions à l'examen.
// Notion maîtrisée = 1, ratée = son taux de réussite, jamais testée = 0,3 (hypothèse prudente).
// La fiabilité dépend de la part des notions (pondérée) déjà testées.
export function notePrevue(m: Maitrise) {
  let num = 0, den = 0, couv = 0;
  for (const i of m.items) {
    const v = i.statut === "ok" ? 1 : i.statut === "fragile" ? i.score ?? 0 : 0.3;
    num += i.imp * v; den += i.imp; if (i.statut !== "jamais") couv += i.imp;
  }
  const c = den ? couv / den : 0;
  return { note: den ? Math.round((num / den) * 200) / 10 : 0, fiabilite: c >= 0.6 ? "bonne" : c >= 0.3 ? "moyenne" : "faible", couverture: Math.round(c * 100) };
}

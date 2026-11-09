// « Ma fac » : établissement saisi librement, semestres de S1 au M4, cours importés par les élèves.
export const SEMESTRES = ["S1", "S2", "S3", "S4", "S5", "S6", "M1", "M2", "M3", "M4"] as const;
export const estSemestre = (s: unknown): s is string => typeof s === "string" && (SEMESTRES as readonly string[]).includes(s);

export type Etab = { id: string; nom: string; ville: string | null; alias: string[]; valide: boolean };

// Minuscules, sans accents ni ponctuation : « Faculté des Sciences, Béni-Mellal » → « faculte des sciences beni mellal ».
export const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const VIDES = new Set(["de", "des", "du", "la", "le", "les", "et", "d", "l", "a", "au", "aux", "en"]);
const mots = (s: string) => norm(s).split(" ").filter((m) => m && !VIDES.has(m));
// Sigle tiré du nom : « Faculté des Sciences Appliquées de Béni Mellal » → « fsabm ».
const sigle = (s: string) => mots(s).map((m) => m[0]).join("");

// Distance d'édition bornée (fautes de frappe : « beni melal » ≈ « beni mellal »).
function proche(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return false;
  const max = a.length <= 4 ? 0 : a.length <= 7 ? 1 : 2;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length] <= max;
}

// Score de ressemblance entre ce que l'élève tape et un établissement connu (0 = rien à voir).
export function score(saisie: string, e: Pick<Etab, "nom" | "ville" | "alias">) {
  const q = norm(saisie);
  if (q.length < 2) return 0;
  const noms = [e.nom, ...(e.alias || [])].map(norm);
  if (noms.some((n) => n === q)) return 100;
  const sigles = [sigle(e.nom), ...noms.filter((n) => !n.includes(" "))];
  if (sigles.includes(q.replace(/ /g, ""))) return 95;
  const qm = mots(q);
  if (!qm.length) return 0;
  let best = 0;
  for (const n of [...noms, norm(`${e.nom} ${e.ville ?? ""}`)]) {
    const base = mots(n);
    // Mots du nom + paires collées (« m sik » → « msik »).
    const nm = [...base, ...base.slice(1).map((x, i) => base[i] + x)];
    let ok = 0;
    for (const m of qm) {
      if (nm.some((x) => x === m || proche(m, x))) ok += 1;
      else if (nm.some((x) => x.startsWith(m)) || (m.length >= 2 && sigles.some((g) => g.startsWith(m)))) ok += 0.9;
    }
    best = Math.max(best, Math.round((ok / qm.length) * 90));
  }
  return best;
}

export const suggestions = (saisie: string, liste: Etab[], n = 6) =>
  liste.map((e) => ({ e, s: score(saisie, e) })).filter((x) => x.s >= 60).sort((a, b) => b.s - a.s).slice(0, n).map((x) => x.e);

// ---------- Contenu généré ----------
export type Contenu = {
  titre: string;
  resume: string;
  sections: { titre: string; texte: string; points: string[] }[];
  qcm: { q: string; options: string[]; bonne: number; explication: string }[];
  cartes: { q: string; r: string }[];
};

export function contenuValide(c: unknown): c is Contenu {
  const x = c as Contenu;
  return !!x && typeof x.titre === "string" && Array.isArray(x.sections) && Array.isArray(x.qcm) && Array.isArray(x.cartes);
}

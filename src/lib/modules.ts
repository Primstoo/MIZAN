// Catalogue des modules disponibles.
// - Modules produits depuis des sources Markdown : node scripts/construire-module.mjs <slug> (voir docs/PRODUIRE-UN-MODULE.md).
// - MANUELS : modules HTML écrits à la main (aucun aujourd'hui ; tous sont produits par le générateur).
// cles : clés localStorage du module à synchroniser ; « * » final = préfixe.
import SOURCES from "./modules-sources.json";

export type Module = {
  slug: string;
  titre: string;
  prof: string;
  semestre: string;
  fichier: string;
  resume: string;
  cles: string[];
  annexes?: string[];
  etablissement?: string; // établissement dont le module suit le cours (sert à filtrer l'inscription guidée)
};

// Établissements proposés à l'inscription (l'élève peut aussi en taper un autre).
export const ETABLISSEMENTS = [
  "FSABM · Béni Mellal", "FST · Béni Mellal", "ENSA · Béni Mellal", "ENCG · Béni Mellal",
  "FS · Rabat", "FSJES · Rabat", "FS Ben M'Sik · Casablanca", "FS Aïn Chock · Casablanca", "FST · Mohammedia",
  "FSSM · Marrakech", "FST · Marrakech", "FSDM · Fès", "FST · Fès", "FS · Meknès", "FS · Agadir", "FS · Kénitra",
  "FS · Tétouan", "FST · Tanger", "FS · Oujda", "FS · El Jadida", "FST · Settat",
];

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
// FSABM s'appelait FPBM (Faculté polydisciplinaire de Béni Mellal) : les deux noms comptent.
const ALIAS: Record<string, string[]> = { FSABM: ["fsabm", "fpbm", "polydisciplinaire de beni mellal", "polydisciplinaire beni mellal"] };
export const memeEtablissement = (saisi: string | null | undefined, code = "FSABM") =>
  !!saisi && (ALIAS[code] ?? [code.toLowerCase()]).some((a) => norm(saisi).includes(a));
export const modulesPour = (etab: string | null | undefined) => MODULES.filter((m) => memeEtablissement(etab, m.etablissement));

const MANUELS: Module[] = [
];

// Modules produits par scripts/construire-module.mjs (sources dans content/sources).
export const MODULES: Module[] = [...MANUELS, ...(SOURCES as Module[])];
export const MODULES_SOURCES = new Set((SOURCES as Module[]).map((m) => m.slug));

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

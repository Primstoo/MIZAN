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
};

const MANUELS: Module[] = [
];

// Modules produits par scripts/construire-module.mjs (sources dans content/sources).
export const MODULES: Module[] = [...MANUELS, ...(SOURCES as Module[])];
export const MODULES_SOURCES = new Set((SOURCES as Module[]).map((m) => m.slug));

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

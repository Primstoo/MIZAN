// Catalogue des modules disponibles.
// - Modules produits depuis des sources Markdown : node scripts/construire-module.mjs <slug> (voir docs/PRODUIRE-UN-MODULE.md).
// - Anciens modules (HTML écrit à la main) : ajouter une ligne dans MANUELS et déposer le fichier dans content/modules/.
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
};

const MANUELS: Module[] = [
  { slug: "reseaux-m351", titre: "Réseaux informatiques (M351)", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-M351.html", resume: "Introduction aux réseaux, topologies, débit, modèles OSI et TCP/IP.", cles: ["m351-revision-v1", "mzt-reseau*"] },
  { slug: "crypto", titre: "Cryptographie (partie 1 + TD1)", prof: "Pr A. Farchane", semestre: "S5", fichier: "crypto-farchane.html", resume: "Chiffres classiques, arithmétique modulaire, LFSR, modes, DES.", cles: ["cryptoPR*", "cryptoPlus", "ct", "mzt-crypto*"] },
  { slug: "archi", titre: "Architecture des ordinateurs", prof: "", semestre: "S5", fichier: "archi-ordinateurs.html", resume: "Révision complète du module.", cles: ["ao-revision-v1", "ao-cmode", "ao-vpos", "mzt-archi*"] },
  { slug: "uml", titre: "UML", prof: "", semestre: "S5", fichier: "uml.html", resume: "Diagrammes et modélisation orientée objet.", cles: ["umlp_*", "mzt-uml*"] },
  { slug: "probas", titre: "Probabilités et statistiques", prof: "", semestre: "S3", fichier: "probas-S3.html", resume: "Probabilités et statistiques de S3, préparées à partir des annales 2016-2024.", cles: ["ps3_revision_v1", "mzt-probas*"] },
];

// Modules produits par scripts/construire-module.mjs (sources dans content/sources).
export const MODULES: Module[] = [...MANUELS, ...(SOURCES as Module[])];
export const MODULES_SOURCES = new Set((SOURCES as Module[]).map((m) => m.slug));

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

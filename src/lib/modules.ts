// Catalogue des modules disponibles. Ajouter un module = ajouter une ligne ici
// et déposer son fichier HTML dans content/modules/ (non public, servi par /app/modules/[file]).
// cles : clés localStorage du module à synchroniser ; « * » final = préfixe.
export type Module = {
  slug: string;
  titre: string;
  prof: string;
  semestre: string;
  fichier: string;
  resume: string;
  cles: string[];
};

export const MODULES: Module[] = [
  { slug: "reseaux-m351", titre: "Réseaux informatiques (M351)", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-M351.html", resume: "Introduction aux réseaux, topologies, débit, modèles OSI et TCP/IP.", cles: ["m351-revision-v1", "mzt-reseau*"] },
  { slug: "reseaux-couches", titre: "Réseaux : couches 1 à 3 en clair", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-couches-1-3.html", resume: "Physique, liaison et réseau expliqués simplement.", cles: ["mzt-couches*"] },
  { slug: "crypto", titre: "Cryptographie (partie 1 + TD1)", prof: "Pr A. Farchane", semestre: "S5", fichier: "crypto-farchane.html", resume: "Chiffres classiques, arithmétique modulaire, LFSR, modes, DES.", cles: ["cryptoPR*", "ct", "mzt-crypto*"] },
  { slug: "archi", titre: "Architecture des ordinateurs", prof: "", semestre: "S5", fichier: "archi-ordinateurs.html", resume: "Révision complète du module.", cles: ["ao-revision-v1", "ao-cmode", "ao-vpos", "mzt-archi*"] },
  { slug: "uml", titre: "UML", prof: "", semestre: "S5", fichier: "uml.html", resume: "Diagrammes et modélisation orientée objet.", cles: ["umlp_*", "mzt-uml*"] },
  { slug: "probas", titre: "Probabilités et statistiques", prof: "", semestre: "S3", fichier: "probas-S3.html", resume: "Probabilités et statistiques de S3, préparées à partir des annales 2016-2024.", cles: ["ps3_revision_v1", "mzt-probas*"] },
];

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

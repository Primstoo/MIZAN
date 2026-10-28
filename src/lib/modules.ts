// Catalogue des modules disponibles. Ajouter un module = ajouter une ligne ici
// et déposer son fichier HTML dans public/modules/.
export type Module = {
  slug: string;
  titre: string;
  prof: string;
  semestre: string;
  fichier: string;
  resume: string;
};

export const MODULES: Module[] = [
  { slug: "reseaux-m351", titre: "Réseaux informatiques (M351)", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-M351.html", resume: "Introduction aux réseaux, topologies, débit, modèles OSI et TCP/IP." },
  { slug: "reseaux-couches", titre: "Réseaux : couches 1 à 3 en clair", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-couches-1-3.html", resume: "Physique, liaison et réseau expliqués simplement." },
  { slug: "crypto", titre: "Cryptographie (partie 1 + TD1)", prof: "Pr A. Farchane", semestre: "S5", fichier: "crypto-farchane.html", resume: "Chiffres classiques, arithmétique modulaire, LFSR, modes, DES." },
  { slug: "archi", titre: "Architecture des ordinateurs", prof: "", semestre: "S5", fichier: "archi-ordinateurs.html", resume: "Révision complète du module." },
  { slug: "uml", titre: "UML", prof: "", semestre: "S5", fichier: "uml.html", resume: "Diagrammes et modélisation orientée objet." },
  { slug: "probas", titre: "Probabilités et statistiques", prof: "", semestre: "S3", fichier: "probas-S3.html", resume: "Module de S3 à repasser." },
];

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

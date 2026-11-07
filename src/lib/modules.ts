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
  etablissement: string; // établissement dont le module suit le cours (sert à filtrer l'inscription guidée)
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
export const memeEtablissement = (saisi: string | null | undefined, code: string) =>
  !!saisi && (ALIAS[code] ?? [code.toLowerCase()]).some((a) => norm(saisi).includes(a));
export const modulesPour = (etab: string | null | undefined) => MODULES.filter((m) => memeEtablissement(etab, m.etablissement));

export const MODULES: Module[] = [
  { slug: "reseaux-m351", titre: "Réseaux informatiques (M351)", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-M351.html", resume: "Introduction aux réseaux, topologies, débit, modèles OSI et TCP/IP.", cles: ["m351-revision-v1", "mzt-reseau*"], etablissement: "FSABM" },
  { slug: "crypto", titre: "Cryptographie (partie 1 + TD1)", prof: "Pr A. Farchane", semestre: "S5", fichier: "crypto-farchane.html", resume: "Chiffres classiques, arithmétique modulaire, LFSR, modes, DES.", cles: ["cryptoPR*", "cryptoPlus", "ct", "mzt-crypto*"], etablissement: "FSABM" },
  { slug: "archi", titre: "Architecture des ordinateurs", prof: "", semestre: "S5", fichier: "archi-ordinateurs.html", resume: "Révision complète du module.", cles: ["ao-revision-v1", "ao-cmode", "ao-vpos", "mzt-archi*"], etablissement: "FSABM" },
  { slug: "uml", titre: "UML", prof: "", semestre: "S5", fichier: "uml.html", resume: "Diagrammes et modélisation orientée objet.", cles: ["umlp_*", "mzt-uml*"], etablissement: "FSABM" },
  { slug: "probas", titre: "Probabilités et statistiques", prof: "", semestre: "S3", fichier: "probas-S3.html", resume: "Probabilités et statistiques de S3, préparées à partir des annales 2016-2024.", cles: ["ps3_revision_v1", "mzt-probas*"], etablissement: "FSABM" },
];

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

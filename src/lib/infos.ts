import { createHash } from "node:crypto";
import { estSemestre, norm } from "./fac-commun";

// Infos de la fac : annonces des groupes WhatsApp, traduites par Miroir Darija puis validées par l'admin.
export const TYPES_INFO = ["annonce", "examen", "emploi_du_temps", "document", "autre"] as const;
export type TypeInfo = (typeof TYPES_INFO)[number];
export const LIBELLE_INFO: Record<TypeInfo, string> = { annonce: "Annonce", examen: "Examen", emploi_du_temps: "Emploi du temps", document: "Document", autre: "Info" };

// Retire ce qui identifie une personne : numéros de téléphone, e-mails, mentions @, codes étudiants (CNE / Massar).
// Filet de sécurité côté serveur : le bot anonymise déjà, l'admin relit avant de publier.
export function anonymiser(t: string) {
  return t
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[e-mail]")
    .replace(/@[A-Za-zÀ-ÿ\u0600-\u06FF\d_.]{2,}/g, "[personne]")
    .replace(/(?:\+|00)\d[\d\s.-]{7,}\d/g, "[numéro]")
    .replace(/\b0[5-7](?:[\s.-]?\d{2}){4}\b/g, "[numéro]")
    .replace(/\b[A-Z]\d{9}\b/g, "[code étudiant]")
    .replace(/\b\d{10}\b/g, "[numéro]");
}

export type InfoRecue = { etablissement: string; semestre: string | null; type: TypeInfo; texte_fr: string; texte_original: string | null; date_evenement: string | null; source: string | null; empreinte: string };

const texte = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+\n/g, "\n").trim().slice(0, max) : "");
const estDate = (s: unknown): s is string => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + "T00:00:00Z"));

// Valide et nettoie ce que le bot envoie. Renvoie un message d'erreur lisible si l'annonce est inutilisable.
export function lireInfo(b: unknown): InfoRecue | { erreur: string } {
  const x = (b ?? {}) as Record<string, unknown>;
  const etablissement = texte(x.etablissement, 120);
  const fr = anonymiser(texte(x.texte_fr, 2000));
  if (!etablissement) return { erreur: "etablissement manquant" };
  if (fr.length < 3) return { erreur: "texte_fr manquant" };
  const type = (TYPES_INFO as readonly string[]).includes(String(x.type)) ? (x.type as TypeInfo) : "annonce";
  const original = anonymiser(texte(x.texte_original, 2000)) || null;
  return {
    etablissement, type, texte_fr: fr, texte_original: original,
    semestre: estSemestre(x.semestre) ? x.semestre : null,
    date_evenement: estDate(x.date_evenement) ? x.date_evenement : null,
    // Le nom du groupe ne quitte jamais le serveur en clair : on n'en garde qu'une empreinte.
    source: texte(x.groupe, 200) ? createHash("sha256").update(texte(x.groupe, 200)).digest("hex").slice(0, 16) : null,
    empreinte: createHash("sha256").update(norm(etablissement) + "|" + norm(fr)).digest("hex"),
  };
}

// Aperçu pour l'offre gratuite : le début de l'annonce seulement.
export const apercu = (t: string, n = 70) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n) > 30 ? t.lastIndexOf(" ", n) : n) + "…");

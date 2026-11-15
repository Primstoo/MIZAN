import { describe, expect, it } from "vitest";
import { anonymiser, apercu, lireInfo } from "@/lib/infos";

describe("infos de la fac (Miroir Darija)", () => {
  it("retire numéros, e-mails, mentions et codes étudiants", () => {
    const t = anonymiser("Contactez @Youssef.B au 06 12 34 56 78 ou +212 612-345678, mail prof.x@usms.ma, CNE D130012345");
    expect(t).not.toMatch(/Youssef|06 12|612-345678|usms\.ma|D130012345/);
    expect(t).toContain("[numéro]");
    expect(t).toContain("[e-mail]");
  });
  it("garde les dates, les heures et les salles", () => {
    const t = "Examen de Crypto le 14/12/2026 à 9h30, amphi 3, durée 1h30";
    expect(anonymiser(t)).toBe(t);
  });
  it("valide une annonce et produit la même empreinte pour deux envois identiques", () => {
    const a = lireInfo({ etablissement: "FSABM", type: "examen", texte_fr: "Examen de Réseaux déplacé au lundi.", semestre: "S5", date_evenement: "2026-12-21", groupe: "MI S5 2026" });
    const b = lireInfo({ etablissement: "fsabm", texte_fr: "Examen de réseaux déplacé au lundi", groupe: "Autre groupe" });
    if ("erreur" in a || "erreur" in b) throw new Error("annonce refusée");
    expect(a).toMatchObject({ type: "examen", semestre: "S5", date_evenement: "2026-12-21" });
    expect(a.source).toMatch(/^[0-9a-f]{16}$/); // le nom du groupe n'est jamais gardé en clair
    expect(a.empreinte).toBe(b.empreinte);
    expect(b.type).toBe("annonce");
  });
  it("refuse une annonce vide ou sans établissement, et ignore un type ou une date invalides", () => {
    expect(lireInfo({ etablissement: "FSABM", texte_fr: " " })).toHaveProperty("erreur");
    expect(lireInfo({ texte_fr: "Bonjour à tous" })).toHaveProperty("erreur");
    expect(lireInfo(null)).toHaveProperty("erreur");
    expect(lireInfo({ etablissement: "FSABM", texte_fr: "Cours annulé", type: "x", date_evenement: "demain", semestre: "S9" })).toMatchObject({ type: "annonce", date_evenement: null, semestre: null });
  });
  it("coupe l'aperçu gratuit sur un mot", () => {
    const a = apercu("L'examen de Cryptographie du professeur aura lieu le lundi 14 décembre à 9 h en amphi 3, apportez votre carte.");
    expect(a.length).toBeLessThanOrEqual(71);
    expect(a.endsWith("…")).toBe(true);
    expect(apercu("Court")).toBe("Court");
  });
});

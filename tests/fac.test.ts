import { describe, expect, it } from "vitest";
import { contenuValide, estSemestre, norm, score, suggestions, type Etab } from "@/lib/fac-commun";

const e = (nom: string, ville: string | null = null, alias: string[] = []): Etab => ({ id: nom, nom, ville, alias, valide: true });
const FSABM = e("Faculté des Sciences Appliquées de Béni Mellal", "Béni Mellal", ["fsabm", "fpbm", "faculte polydisciplinaire de beni mellal"]);
const ENSA = e("École Nationale des Sciences Appliquées de Béni Mellal", "Béni Mellal", ["ensa beni mellal"]);
const BENMSIK = e("Faculté des Sciences Ben M'Sik", "Casablanca", ["fs ben msik"]);
const LISTE = [FSABM, ENSA, BENMSIK];

describe("reconnaissance des établissements", () => {
  it("normalise accents, majuscules et ponctuation", () => {
    expect(norm("Faculté des Sciences, Béni-Mellal")).toBe("faculte des sciences beni mellal");
  });
  it("reconnaît le nom exact, les sigles et les anciens noms (seuil 95 = même établissement)", () => {
    expect(score("faculté des sciences appliquées de béni mellal", FSABM)).toBe(100);
    expect(score("FSABM", FSABM)).toBeGreaterThanOrEqual(95);
    expect(score("fpbm", FSABM)).toBeGreaterThanOrEqual(95);
  });
  it("tolère les fautes de frappe sans confondre deux établissements", () => {
    const fautes = "faculté de science appliquées de béni-melal";
    expect(suggestions(fautes, LISTE)[0]).toBe(FSABM);
    expect(suggestions("ensa beni mellal", LISTE)[0]).toBe(ENSA);
    expect(suggestions("fs ben msik", LISTE)[0]).toBe(BENMSIK);
  });
  it("ne propose rien pour une saisie sans rapport ou trop courte", () => {
    expect(suggestions("université de tokyo", LISTE)).toEqual([]);
    expect(score("a", FSABM)).toBe(0);
  });
  it("valide les semestres S1 à M4 uniquement", () => {
    expect(estSemestre("S5")).toBe(true);
    expect(estSemestre("M4")).toBe(true);
    expect(estSemestre("S7")).toBe(false);
    expect(estSemestre(undefined)).toBe(false);
  });
  it("refuse un contenu généré incomplet", () => {
    expect(contenuValide({ titre: "x", sections: [], qcm: [], cartes: [] })).toBe(true);
    expect(contenuValide({ titre: "x", sections: [] })).toBe(false);
    expect(contenuValide(null)).toBe(false);
  });
});

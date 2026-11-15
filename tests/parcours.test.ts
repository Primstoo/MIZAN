import { describe, expect, it } from "vitest";
import { dateEstimee, jourMaroc, joursEntre, missionDuJour, missionPerso } from "@/lib/parcours";
import { calculerMaitrise, notePrevue } from "@/lib/maitrise";

describe("dates", () => {
  it("compte les jours entre deux dates", () => {
    expect(joursEntre("2026-11-10", "2026-12-14")).toBe(34);
    expect(joursEntre("2026-12-31", "2027-01-01")).toBe(1);
  });
  it("donne le jour au Maroc au format AAAA-MM-JJ", () => {
    expect(jourMaroc(new Date("2026-11-10T12:00:00Z"))).toBe("2026-11-10");
  });
  it("estime une date d'examen future (impairs : janvier, pairs : juin), ou reprend la date commune", () => {
    const auj = jourMaroc();
    expect(dateEstimee("S5") > auj).toBe(true);
    expect(dateEstimee("S5")).toMatch(/-01-15$/);
    expect(dateEstimee("S4")).toMatch(/-06-15$/);
    expect(dateEstimee("S5", "2026-12-14")).toBe("2026-12-14");
  });
});

describe("mission du jour", () => {
  it("s'allonge avec le temps disponible", () => {
    expect(missionDuJour(30, 60).etapes).toHaveLength(3);
    expect(missionDuJour(60, 60).etapes).toHaveLength(4);
    expect(missionDuJour(120, 60).etapes).toHaveLength(5);
  });
  it("passe en conditions réelles à deux semaines de l'examen", () => {
    const m = missionDuJour(30, 10, "crypto");
    expect(m.urgent).toBe(true);
    expect(m.etapes.join(" ")).toContain("examen blanc");
  });
  it("commence par les points faibles quand il y en a", () => {
    // Test de niveau raté sur une notion jamais travaillée : elle devient « fragile ».
    const premiere = calculerMaitrise("crypto", {})!.items[0];
    const m = calculerMaitrise("crypto", {}, { [premiere.id]: false })!;
    const mission = missionPerso(60, 40, m, "crypto");
    expect(mission.cibles[0]).toContain(premiere.t);
    expect(mission.etapes[0]).toBe(mission.cibles[0]);
  });
});

describe("maîtrise et note prévue", () => {
  it("part de zéro sans progression", () => {
    const m = calculerMaitrise("crypto", {})!;
    expect(m.pct).toBe(0);
    expect(m.testes).toBe(0);
    // Hypothèse prudente : notion jamais testée = 0,3 → 6/20, fiabilité faible.
    expect(notePrevue(m)).toMatchObject({ note: 6, fiabilite: "faible", couverture: 0 });
  });
  it("monte à 20/20 quand toutes les notions sont maîtrisées (format « pc » du module Crypto)", () => {
    const vide = calculerMaitrise("crypto", {})!;
    const data = { cryptoPR: JSON.stringify(Object.fromEntries(vide.items.map((i) => [i.id, { pc: 100 }]))) };
    const m = calculerMaitrise("crypto", data)!;
    expect(m.pct).toBe(100);
    expect(notePrevue(m)).toMatchObject({ note: 20, fiabilite: "bonne", couverture: 100 });
  });
  it("ne plante pas sur une progression corrompue ou un module inconnu", () => {
    expect(calculerMaitrise("crypto", { cryptoPR: "{pas du json" })!.pct).toBe(0);
    expect(calculerMaitrise("module-inconnu", {})).toBeNull();
  });
});

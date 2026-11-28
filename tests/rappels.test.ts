import { describe, expect, it } from "vitest";
import { choisirRappel, type Contexte } from "@/lib/rappels";

const base: Contexte = { aProfil: true, inscritDepuis: 20, sansReviser: 0, historique: [], jourSemaine: 1, numeroJour: 100 };
const c = (o: Partial<Contexte>) => ({ ...base, ...o });

describe("rappels", () => {
  it("inscription pas finie : J+1 puis J+3, puis plus rien", () => {
    expect(choisirRappel(c({ aProfil: false, inscritDepuis: 0 }))).toBeNull();
    expect(choisirRappel(c({ aProfil: false, inscritDepuis: 1 }))?.cle).toBe("inscription-1");
    expect(choisirRappel(c({ aProfil: false, inscritDepuis: 2, historique: [{ type: "inscription", cle: "inscription-1", ilYa: 1 }] }))).toBeNull();
    expect(choisirRappel(c({ aProfil: false, inscritDepuis: 3, historique: [{ type: "inscription", cle: "inscription-1", ilYa: 2 }] }))?.cle).toBe("inscription-2");
    expect(choisirRappel(c({ aProfil: false, inscritDepuis: 9, historique: [{ type: "inscription", cle: "inscription-2", ilYa: 6 }] }))).toBeNull();
  });
  it("examen aux paliers 14, 7, 3, 1 seulement, une fois", () => {
    const ex = { slug: "crypto", titre: "Crypto", reste: 7 };
    expect(choisirRappel(c({ examen: ex }))?.body).toContain("dans 7 jours");
    expect(choisirRappel(c({ examen: { ...ex, reste: 6 } }))).toBeNull();
    expect(choisirRappel(c({ examen: { ...ex, reste: 1 } }))?.body).toContain("demain");
    expect(choisirRappel(c({ examen: ex, historique: [{ type: "examen", cle: "examen-crypto-7", ilYa: 2 }] }))).toBeNull();
  });
  it("inactivité : 2 jours, 5 jours, puis une fois par semaine", () => {
    expect(choisirRappel(c({ sansReviser: 1 }))).toBeNull();
    expect(choisirRappel(c({ sansReviser: 2 }))?.type).toBe("inactif");
    const un = [{ type: "inactif" as const, cle: "inactif-1", ilYa: 2 }];
    expect(choisirRappel(c({ sansReviser: 4, historique: un }))).toBeNull();
    expect(choisirRappel(c({ sansReviser: 5, historique: un }))?.type).toBe("inactif");
    const deux = [{ type: "inactif" as const, cle: "a", ilYa: 3 }, { type: "inactif" as const, cle: "b", ilYa: 6 }];
    expect(choisirRappel(c({ sansReviser: 9, historique: deux }))).toBeNull();
    expect(choisirRappel(c({ sansReviser: 15, historique: [{ type: "inactif", cle: "a", ilYa: 7 }, { type: "inactif", cle: "b", ilYa: 10 }] }))?.type).toBe("inactif");
  });
  it("conseil le mardi et le vendredi", () => {
    expect(choisirRappel(c({ jourSemaine: 2 }))?.type).toBe("conseil");
    expect(choisirRappel(c({ jourSemaine: 3 }))).toBeNull();
  });
  it("un par jour, trois par semaine au maximum", () => {
    expect(choisirRappel(c({ sansReviser: 3, historique: [{ type: "conseil", cle: "x", ilYa: 0 }] }))).toBeNull();
    const trois = [1, 2, 3].map((i) => ({ type: "conseil" as const, cle: "c" + i, ilYa: i }));
    expect(choisirRappel(c({ examen: { slug: "a", titre: "A", reste: 3 }, historique: trois }))).toBeNull();
  });
});

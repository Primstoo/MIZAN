import { describe, expect, it } from "vitest";
import { ordreDesModeles } from "@/lib/tuteur-ordre";

describe("ordre d'essai des modèles du tuteur", () => {
  const G = ["g1", "g2"], Q = ["q1", "q2"];
  it("alterne Gemini et Groq quand il n'y a pas d'image", () => {
    expect(ordreDesModeles(G, Q, false).map((e) => e.m)).toEqual(["g1", "q1", "g2", "q2"]);
  });
  it("essaie tout Gemini avant Groq quand il y a une image", () => {
    expect(ordreDesModeles(G, Q, true).map((e) => e.m)).toEqual(["g1", "g2", "q1", "q2"]);
  });
  it("garde tous les modèles même si les listes sont inégales", () => {
    expect(ordreDesModeles(["g1"], ["q1", "q2", "q3"], false).map((e) => e.m)).toEqual(["g1", "q1", "q2", "q3"]);
    expect(ordreDesModeles([], Q, false).map((e) => e.f)).toEqual(["groq", "groq"]);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

// Base factice : une seule ligne « abonnements », renvoyée par admin().from(...).select(...).eq(...).maybeSingle().
let ligne: Record<string, unknown> | null = null;
vi.mock("@/lib/acces", () => ({
  admin: () => ({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: ligne }) }) }) }) }),
}));
import { nouveauCodeOffre, offreDe, rangEffectif } from "@/lib/offres";

const dans = (jours: number) => new Date(Date.now() + jours * 864e5).toISOString();

describe("offre effective d'un élève", () => {
  beforeEach(() => { ligne = null; delete process.env.OFFRES_ACTIVES; });

  it("est gratuite sans abonnement", async () => {
    expect((await offreDe("u")).plan).toBe("free");
  });
  it("suit l'offre payée tant qu'elle n'a pas expiré", async () => {
    ligne = { plan: "premium", plan_until: dans(10), plan_source: "paid", bonus_plan: null, bonus_until: null };
    expect(await offreDe("u")).toMatchObject({ plan: "premium", base: "premium", source: "paid" });
  });
  it("retombe en gratuit à l'expiration, sans tâche planifiée", async () => {
    ligne = { plan: "premium", plan_until: dans(-1), plan_source: "paid", bonus_plan: null, bonus_until: null };
    expect(await offreDe("u")).toMatchObject({ plan: "free", fin: null, source: null });
  });
  it("applique le bonus de parrainage seulement s'il est supérieur à l'offre payée", async () => {
    ligne = { plan: "essentiel", plan_until: dans(20), plan_source: "paid", bonus_plan: "premium", bonus_until: dans(5) };
    expect(await offreDe("u")).toMatchObject({ plan: "premium", base: "essentiel" });
    ligne = { plan: "premium", plan_until: dans(20), plan_source: "paid", bonus_plan: "essentiel", bonus_until: dans(5) };
    expect((await offreDe("u")).plan).toBe("premium");
    ligne = { plan: "free", plan_until: null, plan_source: "paid", bonus_plan: "essentiel", bonus_until: dans(-2) };
    expect((await offreDe("u")).plan).toBe("free");
  });
  it("ouvre tout pendant la bêta et à l'admin, applique l'offre sinon", async () => {
    expect(await rangEffectif("u")).toBe(3); // OFFRES_ACTIVES absent : bêta
    process.env.OFFRES_ACTIVES = "1";
    expect(await rangEffectif("u")).toBe(1);
    expect(await rangEffectif("u", true)).toBe(3);
  });
});

describe("codes d'activation", () => {
  it("ont le format TOUMAI-XXXX-XXXX sans caractères ambigus, et ne se répètent pas", () => {
    const codes = Array.from({ length: 500 }, nouveauCodeOffre);
    for (const c of codes) expect(c).toMatch(/^TOUMAI-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
    expect(new Set(codes).size).toBe(500);
  });
});

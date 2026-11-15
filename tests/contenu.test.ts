import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { MODULES } from "@/lib/modules";
import BANQUE from "@/lib/banque.json";
import NIVEAU from "@/lib/niveau.json";
import NOTIONS from "@/lib/notions.json";

type Q = { n: string; q: string; o: string[]; a: number; e?: string };
const fichier = (f: string) => path.join(process.cwd(), "content", "modules", f);
const notionsDe = (slug: string) => new Set(((NOTIONS as Record<string, { items: { id: string }[] }>)[slug]?.items ?? []).map((i) => i.id));

// Contrôles de contenu : une erreur ici = un module cassé ou une question fausse en ligne.
describe("catalogue des modules", () => {
  it("a des identifiants et des fichiers uniques", () => {
    expect(new Set(MODULES.map((m) => m.slug)).size).toBe(MODULES.length);
    expect(new Set(MODULES.map((m) => m.fichier)).size).toBe(MODULES.length);
  });
  it.each(MODULES.map((m) => [m.slug, m] as const))("%s : fichier, annexes et clés de synchronisation présents", (_slug, m) => {
    expect(existsSync(fichier(m.fichier)), m.fichier).toBe(true);
    for (const a of m.annexes ?? []) expect(existsSync(fichier(a)), a).toBe(true);
    expect(m.cles.length).toBeGreaterThan(0);
    // Pas de chemin relatif : le nom de fichier sert tel quel dans une route publique.
    for (const f of [m.fichier, ...(m.annexes ?? [])]) expect(f).toMatch(/^[\w.-]+\.html$/);
  });
  it.each(MODULES.map((m) => m.slug))("%s : catalogue de notions, banque de questions et test de niveau", (slug) => {
    expect(notionsDe(slug).size).toBeGreaterThan(0);
    expect(((BANQUE as unknown as Record<string, Q[]>)[slug] ?? []).length).toBeGreaterThanOrEqual(15); // examen blanc : 15 questions
    expect(((NIVEAU as unknown as Record<string, Q[]>)[slug] ?? []).length).toBeGreaterThanOrEqual(5);
  });
});

describe.each([["banque (examens blancs)", BANQUE], ["test de niveau", NIVEAU]] as const)("%s", (_nom, source) => {
  const tout = Object.entries(source as unknown as Record<string, Q[]>);
  it.each(tout)("%s : chaque question a une bonne réponse valide et une notion connue", (slug, qs) => {
    const connues = notionsDe(slug);
    qs.forEach((q, k) => {
      const ou = `${slug} #${k} « ${q.q.slice(0, 50)} »`;
      expect(q.q.trim().length, ou).toBeGreaterThan(5);
      expect(q.o.length, ou).toBeGreaterThanOrEqual(2);
      expect(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, `${ou} : index de bonne réponse hors des options`).toBe(true);
      expect(new Set(q.o.map((x: string) => x.trim())).size, `${ou} : options en double`).toBe(q.o.length);
      expect(connues.has(q.n), `${ou} : notion « ${q.n} » absente du catalogue`).toBe(true);
    });
  });
});

describe("modules HTML", () => {
  it.each(MODULES.map((m) => m.fichier))("%s : ne contient ni clé d'API ni clé service Supabase", (f) => {
    const html = readFileSync(fichier(f), "utf8");
    expect(html).not.toMatch(/AIza[0-9A-Za-z_-]{30,}/); // clé Google
    expect(html).not.toMatch(/gsk_[0-9A-Za-z]{30,}/); // clé Groq
    expect(html).not.toMatch(/service_role/);
    expect(html).not.toMatch(/sb_secret_/);
  });
});

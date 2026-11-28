import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

// Garde-fous du rendu des formules dans le tuteur (bug du 28/11 : formules en brut, accents flottants).
const RACINE = path.resolve(__dirname, "..");
const TUTEUR = fs.readFileSync(path.join(RACINE, "content", "commun", "tuteur.js"), "utf8");
const MODULES = path.join(RACINE, "content", "modules");

// Reprend l'expression des formules telle qu'écrite dans tuteur.js
const RX = (() => {
  const ligne = TUTEUR.split("\n").find((l) => l.includes("const RX ="));
  if (!ligne) throw new Error("const RX introuvable dans tuteur.js");
  const m = ligne.match(/const RX = \/(.+)\/g;/);
  if (!m) throw new Error("const RX illisible");
  return () => new RegExp(m[1], "g");
})();
const formules = (t: string) => Array.from(t.matchAll(RX())).map((m) => (m[1] ?? m[2] ?? m[3] ?? m[4]).trim());

describe("tuteur : détection des formules", () => {
  it("reconnaît les formules qui commencent par un chiffre", () => {
    expect(formules("On cherche $x$ tel que $2^x \\ge 4$. Ici, $2^2 = 4$.")).toEqual(["x", "2^x \\ge 4", "2^2 = 4"]);
    expect(formules("Nouveau masque : $24 + 2 = 26$. Ton masque devient /26.")).toEqual(["24 + 2 = 26"]);
  });
  it("reconnaît les formules centrées", () => {
    expect(formules("$$\\text{Hôtes par sous-réseau} = 2^6 - 2$$")).toEqual(["\\text{Hôtes par sous-réseau} = 2^6 - 2"]);
    expect(formules("\\[a^2\\] et \\(b\\)")).toEqual(["a^2", "b"]);
  });
  it("ne prend pas des prix pour des formules", () => {
    expect(formules("Ça coûte 5$ et 10$ (monnaie).")).toEqual([]);
    expect(formules("Entre 5 $ et 10 $.")).toEqual([]);
  });
});

describe("tuteur : MathJax correctement installé dans la page", () => {
  it("pose la feuille de style et la police après chaque formule dessinée", () => {
    // Sans updateDocument, tex2svg laisse les glyphes invisibles et le MathML de secours apparaît.
    expect(TUTEUR).toMatch(/MathJax\.startup\.document\.updateDocument\(\)/);
    expect(TUTEUR).toMatch(/poser\(n\); pagePrete\(\);/);
  });
  it("laisse défiler une formule centrée trop large", () => {
    expect(TUTEUR).toMatch(/\.mzt-tex\.d\{[^}]*overflow-x:auto/);
  });
});

describe("tuteur : une seule version partout", () => {
  const pages = fs.readdirSync(MODULES).filter((f) => f.endsWith(".html"))
    .filter((f) => fs.readFileSync(path.join(MODULES, f), "utf8").includes("window.MZT_CONFIG"));
  it("trouve des pages avec tuteur", () => { expect(pages.length).toBeGreaterThan(30); });
  it.each(pages)("%s embarque la version actuelle de content/commun/tuteur.js", (f) => {
    // Après une modification du tuteur : `npm run module -- <slug>` pour chaque module, ou recopier le fichier dans les pages « -outils ».
    expect(fs.readFileSync(path.join(MODULES, f), "utf8").includes(TUTEUR.trimEnd())).toBe(true);
  });
  it("tutor/mizan-tutor.js est identique au tuteur commun", () => {
    expect(fs.readFileSync(path.join(RACINE, "tutor", "mizan-tutor.js"), "utf8")).toBe(TUTEUR);
  });
});

// Extrait la liste des notions (ou chapitres) de chaque module, pour que la plateforme
// puisse lire la progression des élèves dans un format commun.
// Usage : node scripts/extraire-notions.cjs   (à relancer quand un module change)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "content", "modules");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const out = {};
  const ouvrir = async (f) => { await p.goto("file://" + path.join(dir, f)); await p.waitForTimeout(600); };

  await ouvrir("reseaux-M351.html");
  out["reseaux-m351"] = await p.evaluate(() => ({
    unite: "notion",
    groupes: COURSE.map((c) => ({ id: c.id, t: c.t })),
    items: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, g: n.sec })),
  }));

  await ouvrir("archi-ordinateurs.html");
  out["archi"] = await p.evaluate(() => ({
    unite: "notion",
    groupes: COURSE.map((c) => ({ id: c.id, t: c.t })),
    items: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, g: n.L })),
  }));

  await ouvrir("probas-S3.html");
  out["probas"] = await p.evaluate(() => {
    const noms = { A: "Chapitre 1", B: "Chapitre 2", C: "Chapitre 2 (suite)", D: "Chapitre 3", E: "Chapitre 4" };
    let ch = {}; try { ch = CHAPS; } catch (e) {}
    return {
      unite: "notion",
      groupes: Object.keys(noms).map((k) => ({ id: k, t: noms[k] + (ch[k] ? " · " + ch[k] : "") })),
      items: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, g: n.ch })),
    };
  });

  await ouvrir("crypto-farchane.html");
  out["crypto"] = await p.evaluate(() => ({
    unite: "thème",
    groupes: [{ id: "cours", t: "Partie 1" }],
    items: ORDER.map((k) => ({ id: k, t: NAMES[k], imp: 3, g: "cours" })),
  }));

  await ouvrir("uml.html");
  out["uml"] = await p.evaluate(() => ({
    unite: "chapitre",
    groupes: [{ id: "cours", t: "Chapitres" }],
    items: CHAPTERS.map((c) => ({ id: c.id, t: c.t, imp: c.imp, g: "cours" })),
  }));

  await b.close();
  const dest = path.join(__dirname, "..", "src", "lib", "notions.json");
  fs.writeFileSync(dest, JSON.stringify(out, null, 1));
  for (const [k, v] of Object.entries(out)) console.log(k, v.items.length, v.unite + "s,", v.groupes.length, "groupes");
})();

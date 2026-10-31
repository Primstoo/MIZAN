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

  // ---------- Banque du test de niveau : une question par notion importante (8 max) ----------
  const niveau = {};
  const banques = {};
  const brut0 = (t) => String(t).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
  const garder = (k, b) => { banques[k] = b.filter((x) => x.o && x.o.length >= 2 && Number.isInteger(x.a)).map((x) => ({ n: x.n, q: brut0(x.q), o: x.o.map(brut0), a: x.a, e: brut0(x.e || "") })); return b; };
  const choisir = (cat, banque) => {
    const ordre = [...cat.items].sort((a, b) => b.imp - a.imp);
    const out = [];
    for (const n of ordre) {
      const q = banque.find((x) => x.n === n.id && x.o && x.o.length >= 3);
      if (q) out.push({ n: n.id, q: q.q, o: q.o, a: q.a, e: q.e || "" });
      if (out.length >= 8) break;
    }
    return out;
  };
  await ouvrir("reseaux-M351.html");
  niveau["reseaux-m351"] = choisir(out["reseaux-m351"], garder("reseaux-m351", await p.evaluate(() => QS.map((x) => ({ n: x.n, q: x.q, o: x.o, a: x.a, e: x.e })))));
  await ouvrir("archi-ordinateurs.html");
  niveau["archi"] = choisir(out["archi"], garder("archi", await p.evaluate(() => QCM.map((x) => ({ n: x[0], q: x[1], o: x[2], a: x[3], e: x[4] })))));
  await ouvrir("probas-S3.html");
  niveau["probas"] = choisir(out["probas"], garder("probas", await p.evaluate(() => NOTIONS.flatMap((n) => (n.quiz || []).filter((x) => x.t === "q").map((x) => ({ n: n.id, q: x.q, o: x.o, a: x.a, e: x.e }))))));
  await ouvrir("crypto-farchane.html");
  niveau["crypto"] = choisir(out["crypto"], garder("crypto", await p.evaluate(() => Object.entries(EV).flatMap(([k, l]) => l.filter((x) => x.o).map((x) => ({ n: k, q: x.q, o: x.o, a: x.a, e: x.e }))))));
  await ouvrir("uml.html");
  niveau["uml"] = choisir(out["uml"], garder("uml", await p.evaluate(() => Object.entries(QUIZ).flatMap(([k, l]) => l.filter((x) => x.o).map((x) => ({ n: k, q: x.q, o: x.o, a: x.a, e: x.e }))))));
  // Texte brut uniquement (pas de HTML dans la plateforme)
  const brut = (t) => String(t).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
  for (const k in niveau) niveau[k] = niveau[k].map((x) => ({ ...x, q: brut(x.q), o: x.o.map(brut), e: brut(x.e) }));
  fs.writeFileSync(path.join(__dirname, "..", "src", "lib", "niveau.json"), JSON.stringify(niveau, null, 1));
  // Banque complète (QCM uniquement) pour les examens blancs de la plateforme
  // Questions du TD1 de crypto rattachées à leur notion (sinon elles ne comptent pas dans la maîtrise).
  (banques.crypto || []).forEach((q) => { if (q.n === "td1") q.n = /transposition/i.test(q.q) ? "trans" : "lfsr"; });
  fs.writeFileSync(path.join(__dirname, "..", "src", "lib", "banque.json"), JSON.stringify(banques));
  for (const [k, v] of Object.entries(banques)) console.log("banque", k, v.length, "QCM");
  for (const [k, v] of Object.entries(niveau)) console.log("test de niveau", k, v.length, "questions");

  await b.close();
  const dest = path.join(__dirname, "..", "src", "lib", "notions.json");
  fs.writeFileSync(dest, JSON.stringify(out, null, 1));
  for (const [k, v] of Object.entries(out)) console.log(k, v.items.length, v.unite + "s,", v.groupes.length, "groupes");
})();

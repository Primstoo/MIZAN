// Migration unique : ancien module (HTML écrit à la main) → sources Markdown du générateur.
//   NODE_PATH=... node scripts/migration/convertir-ancien-module.cjs <slug>
// L'ancien fichier est conservé sous <nom>-outils.html (outils interactifs non encore portés, accessibles
// depuis le menu). La progression des élèves est conservée : même clé de sauvegarde, même format
// (essais par notion, boîtes de flashcards au même emplacement).
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const RACINE = path.join(__dirname, "..", "..");
const esc = (t) => String(t).split(/(<[^>]+>)/).map((p, i) => (i % 2 ? p : p.replace(/([*_`\[\]])/g, "\\$1"))).join("");
const ligne = (t) => esc(String(t ?? "").trim()).replace(/\r?\n/g, "<br>");

// Chaque adaptateur lit les données de l'ancien module et renvoie un format commun.
const ADAPTATEURS = {
  "reseaux-m351": {
    ancien: "reseaux-M351-outils.html",
    lire: () => ({
      cours: COURSE.map((c) => ({ id: c.id, t: c.t.replace(/^\d+\.\s*/, ""), h: c.h, seance: /Ch2/.test(c.t) ? "Chapitre 2" : "Chapitre 1" })),
      notions: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, chapitre: n.sec })),
      cartes: CARDS, qcm: QS.map((q) => [q.n, q.q, q.o, q.a, q.e]),
      series: [["td", "TD corrigés (séries 1 à 3)", TD, "h"], ["tp1", "TP 1 · ping, tracert, DNS, HTTP (Wireshark)", TP, "w"], ["tp2", "TP 2 · Packet Tracer", TP2, "w"]],
      ouvertes: [], conventions: typeof CONVENTIONS !== "undefined" ? CONVENTIONS : "",
    }),
    module: {
      titre: "Réseaux informatiques (M351)", prof: "Pr A. Darif", semestre: "S5", fichier: "reseaux-M351.html",
      cle: "m351-revision-v1", tuteurId: "reseau", clesSupplementaires: ["mzt-reseau*"],
      resume: "Introduction aux réseaux, topologies, débit, modèles OSI et TCP/IP.",
      outils: "calculs générés, rédaction corrigée par le tuteur, TD inédit, journal d'erreurs",
    },
  },
  archi: {
    ancien: "archi-ordinateurs-outils.html",
    lire: () => ({
      cours: COURSE.map((c) => ({ id: c.id, t: c.t, h: c.h, seance: "" })),
      notions: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, chapitre: n.L })),
      cartes: CARDS, qcm: QCM,
      series: [["td", "TD corrigés (TD 1 à " + TD.length + ")", TD.map((s) => ({ ex: s.t, items: s.items })), "h"]],
      ouvertes: OPEN, conventions: typeof CONVENTIONS !== "undefined" ? CONVENTIONS : "",
    }),
    module: {
      titre: "Architecture des ordinateurs", prof: "", semestre: "S5", fichier: "archi-ordinateurs.html",
      cle: "ao-revision-v1", tuteurId: "archi", clesSupplementaires: ["ao-cmode", "ao-vpos", "mzt-archi*"],
      resume: "Représentation de l'information, algèbre de Boole, circuits, mémoires, processeur et assembleur 8086.",
      outils: "atelier de circuits et d'assembleur, examen blanc chronométré, journal d'erreurs",
    },
  },
};

(async () => {
  const slug = process.argv[2], A = ADAPTATEURS[slug];
  if (!A) throw new Error("Pas d'adaptateur pour " + slug);
  const out = path.join(RACINE, "content", "sources", slug);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("file://" + path.join(RACINE, "content", "modules", A.ancien)); await p.waitForTimeout(900);
  const D = await p.evaluate(A.lire);
  const css = await p.evaluate(() => [...document.querySelectorAll("style")].map((s) => s.textContent).join("\n"));
  await b.close();

  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const chDe = Object.fromEntries(D.notions.map((n) => [n.id, n.chapitre]));
  const chapitres = [];
  const ecrire = (id, md) => { const f = `${String(chapitres.length + 1).padStart(2, "0")}-${id}.md`; fs.writeFileSync(path.join(out, f), md); chapitres.push(f); };
  for (const c of D.cours) {
    const imps = D.notions.filter((n) => n.chapitre === c.id).map((n) => n.imp);
    let md = `---\nid: ${c.id}\ntitre: ${c.t}\nseance: ${c.seance}\nimportance: ${imps.length ? Math.max(...imps) : 3}\n---\n\n` + "```html\n" + c.h.trim() + "\n```\n\n";
    const cartes = D.cartes.map((x, k) => [x, k]).filter(([x]) => chDe[x[0]] === c.id);
    const qs = D.qcm.filter((q) => chDe[q[0]] === c.id);
    const ouv = D.ouvertes.filter((o) => chDe[o[0]] === c.id);
    if (ouv.length) md += "## Questions de rédaction\n\n```exercice\n" + ouv.map((o) => `? {${o[0]}} ${ligne(o[1])}\n= ${ligne(o[2])}`).join("\n") + "\n```\n\n";
    if (cartes.length) md += "## Flashcards\n\n```cartes\n" + cartes.map(([x, k]) => `{${x[0]}@${k}} ${ligne(x[1])} :: ${ligne(x[2])}`).join("\n") + "\n```\n\n";
    if (qs.length) md += "## QCM du chapitre\n\n```qcm\n" + qs.map((q) => `? {${q[0]}} ${ligne(q[1])}\n` + q[2].map((o, j) => `${j === q[3] ? "+" : "-"} ${ligne(o)}`).join("\n") + `\n= ${ligne(q[4])}`).join("\n\n") + "\n```\n";
    ecrire(c.id, md);
  }
  for (const [id, titre, series, cleIndice] of D.series) {
    let md = `---\nid: ${id}\ntitre: ${titre}\nseance: Travaux dirigés et pratiques\nimportance: 4\n---\n\n> [!astuce] Cherche d'abord seul, ouvre l'indice si tu bloques, puis compare avec le corrigé et note-toi honnêtement : ta réponse compte dans la maîtrise de la notion.\n\n`;
    for (const s of series) md += "```exercice " + ligne(s.ex) + "\n" + s.items.map((it) => `? {${it.n}} **${ligne(it.id)}.** ${ligne(it.q)}` + (it[cleIndice] ? `\nindice: ${ligne(it[cleIndice])}` : "") + `\n= ${ligne(it.c)}`).join("\n") + "\n```\n\n";
    ecrire(id, md);
  }

  // Styles des schémas d'origine : uniquement les classes utilisées par le cours, limitées à <main>.
  const classes = new Set(); D.cours.forEach((c) => c.h.replace(/class="([^"]+)"/g, (m, l) => l.split(/\s+/).forEach((k) => classes.add(k))));
  ["def", "trap", "exam", "formula", "table-wrap"].forEach((k) => classes.delete(k));   // repris par le gabarit
  const regles = [...css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)].filter(([, sel]) => [...classes].some((c) => new RegExp("\\." + c.replace(/[-]/g, "\\-") + "(?![\\w-])").test(sel)))
    .map(([, sel, corps]) => sel.split(",").map((x) => "main " + x.trim().replace(/^(html|body)\s+/, "")).join(",") + "{" + corps.trim() + "}");
  fs.writeFileSync(path.join(out, "styles.css"), [...new Set(regles)].join("\n") + "\n");

  const M = A.module;
  const module = {
    titre: M.titre, prof: M.prof, semestre: M.semestre, etablissement: "FSABM", fichier: M.fichier,
    cle: M.cle, progression: "essais", tuteurId: M.tuteurId, css: "styles.css", clesSupplementaires: M.clesSupplementaires,
    resume: M.resume, conventions: D.conventions,
    intro: `Le cours chapitre par chapitre, avec **QCM**, **flashcards** (révision espacée) et **TD corrigés**.\n\n- **Tableau de bord** : tes notions à consolider, les plus importantes d'abord.\n- **Flashcards** : quelques minutes par jour ; une carte réussie revient après 1, 3, 7, 14 puis 30 jours.\n- **TD** : cherche, ouvre l'indice si besoin, compare avec le corrigé et note-toi.\n- **Outils interactifs** (en bas du menu) : ${M.outils}.\n\nTa progression d'avant la nouvelle version est conservée.`,
    annexes: [{ fichier: A.ancien, titre: "Outils interactifs (" + M.outils + ")" }],
    notions: D.notions, chapitres,
  };
  fs.writeFileSync(path.join(out, "module.json"), JSON.stringify(module, null, 2) + "\n");
  const nEx = D.series.reduce((a, [, , s]) => a + s.reduce((x, y) => x + y.items.length, 0), 0) + D.ouvertes.length;
  console.log(`✔ ${slug} : ${chapitres.length} chapitres, ${D.notions.length} notions, ${D.qcm.length} QCM, ${D.cartes.length} cartes, ${nEx} exercices, ${regles.length} règles CSS`);
})().catch((e) => { console.error("✘ " + e.message); process.exit(1); });

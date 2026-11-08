// Migration unique : ancien module (HTML écrit à la main) → sources Markdown du générateur.
//   NODE_PATH=... node scripts/migration/convertir-ancien-module.cjs <slug>
// L'ancien fichier est conservé sous <nom>-outils.html (outils interactifs non encore portés, accessibles
// depuis le menu). La progression des élèves est conservée : même clé de sauvegarde, même format
// (essais par notion, boîtes de flashcards au même emplacement).
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const RACINE = path.join(__dirname, "..", "..");
// Échappe le Markdown hors balises HTML et hors formules ($...$), qui sont protégées par le générateur.
const esc = (t) => String(t).split(/(<[^>]+>|\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/).map((p, i) => (i % 2 ? p : p.replace(/([*_`\[\]])/g, "\\$1"))).join("");
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
      chapitreOutils: { id: "entrainement", titre: "Entraînement : calculs, rédaction, TD inédit", liste: [
        ["Calculs générés", "Débits, temps de transfert, délais : de nouveaux nombres à chaque fois, corrigés en détail.", "calc", '[data-tab="calc"]'],
        ["Rédaction corrigée", "Réponds comme à l'examen ; le tuteur corrige ta rédaction.", "redac", '[data-tab="redac"]'],
        ["TD inédit", "Un TD jamais vu, en conditions réelles.", "tdx", '[data-tab="tdx"]'],
        ["Journal d'erreurs", "Tes erreurs passées, pour les retravailler.", "erreurs", '[data-tab="erreurs"]']] },
    },
  },
  crypto: {
    ancien: "crypto-farchane-outils.html",
    lire: () => {
      const NOMS = { bases: "Bases de la cryptographie", cesar: "César et chiffrement affine", vig: "Vigenère", play: "Playfair", trans: "Transposition", crypta: "Cryptanalyse", arith: "Arithmétique modulaire", lfsr: "LFSR (registres à décalage)", modes: "Modes de chiffrement", des: "DES", td1: "TD 1 corrigé" };
      const ids = [...ORDER, "td1"];
      // Questions du TD1 rattachées à leur notion (comme dans l'ancienne banque d'examen blanc).
      const nDe = (k, q) => k !== "td1" ? k : (/transposition/i.test(q.q) ? "trans" : "lfsr");
      const cartes = document.querySelector('[data-tab="carte"]');
      return {
        cours: ids.map((k) => ({ id: k, t: NOMS[k] || k, h: (CF[k] || "") + L[k], seance: k === "td1" ? "Travaux dirigés" : "Partie 1" })),
        notions: ids.map((k) => ({ id: k, t: NAMES[k], imp: 3, chapitre: k })),
        cartes: CARDS,
        qcm: ids.flatMap((k) => (EV[k] || []).filter((q) => q.o).map((q) => [nDe(k, q), q.q, q.o, q.a, q.e, k])),
        courtes: ids.flatMap((k) => (EV[k] || []).filter((q) => !q.o).map((q) => [nDe(k, q), q.q, q.n != null ? q.t + " ~" + q.n : q.t, q.e, k])),
        series: [], ouvertes: [], conventions: typeof MZT_CONFIG !== "undefined" ? MZT_CONFIG.conventions || "" : "",
        intro: cartes ? cartes.innerHTML : "",
      };
    },
    module: {
      titre: "Cryptographie (partie 1 + TD1)", prof: "Pr A. Farchane", semestre: "S5", fichier: "crypto-farchane.html",
      cle: "cryptoPR", cleEtat: "cryptoPlus", progression: "pc", tuteurId: "crypto", clesSupplementaires: ["cryptoPR*", "ct"],
      cartes: { champ: "b", intervalles: [1, 3, 7, 14, 30], echec: 0, depart: -1 },
      resume: "Chiffres classiques, arithmétique modulaire, LFSR, modes, DES.",
      outils: "labos de chiffrement, exemples générés, calculettes, quiz bilan, examen blanc, carnet d'erreurs",
      parChapitre: { titre: "S'exercer : exercices guidés et labo", garder: ".guided,.bench" },
      chapitreOutils: { id: "entrainement", titre: "Bilan : failles, quiz, examen blanc", liste: [
        ["Mes failles", "Les notions où tu perds des points, d'après tes réponses.", "failles", '[data-tab="failles"]'],
        ["Quiz bilan", "Toutes les notions mélangées.", "quiz", '[data-tab="quiz"]'],
        ["Examen blanc", "Un sujet complet en temps limité.", "blanc", '[data-tab="blanc"]'],
        ["Carnet d'erreurs", "Tes erreurs passées, pour les retravailler.", "carnet", '[data-tab="carnet"]']] },
    },
  },
  probas: {
    ancien: "probas-S3-outils.html",
    lire: () => {
      const titreEx = Object.fromEntries(EXOS.map((e) => [e.id, e.t]));
      const annales = `<p>Les annales 2016-2024 et leur composition (chaque exercice est corrigé dans le chapitre « Exercices-types »).</p><div class="table-wrap"><table><thead><tr><th>Année</th><th>Session</th><th>Durée</th><th>Exercices</th></tr></thead><tbody>${EXAMS.map((x) => `<tr><td>${x.an}</td><td>${x.s}</td><td>${x.d || ""}</td><td>${x.parts.map((p) => `${titreEx[p[0]] || p[0]} (${p[1]}${p[2] ? ", " + p[2] : ""})`).join("<br>")}</td></tr>`).join("")}</tbody></table></div>`;
      return {
        cours: [...NOTIONS.map((n) => ({ id: n.id, t: n.t, h: (n.src ? `<p class="small muted">Source : ${n.src}</p>` : "") + n.body, seance: n.ch + " · " + CHAPS[n.ch] })),
          { id: "annales", t: "Annales d'examen (2016-2024)", h: annales, seance: "Examens" }],
        notions: NOTIONS.map((n) => ({ id: n.id, t: n.t, imp: n.imp, chapitre: n.id })),
        cartes: CARDS.map((c) => [c.n, c.f, c.b]),
        qcm: NOTIONS.flatMap((n) => (n.quiz || []).filter((q) => q.t === "q").map((q) => [n.id, q.q, q.o, q.a, q.e])),
        courtes: NOTIONS.flatMap((n) => (n.quiz || []).filter((q) => q.t === "n").map((q) => [n.id, q.q, q.a + " ~" + (q.tol || 0), q.e])),
        series: [["exos", "Exercices-types d'examen (corrigés et barèmes)", EXOS.map((e) => ({ ex: `${e.t} · ${e.pts}`, items: e.qs.map((q, j) => ({ id: e.id + "-" + (j + 1), n: e.notion, q: (j === 0 ? e.enonce : "") + q.q, c: q.corr + (q.bar && q.bar.length ? "<p><b>Barème (points attendus)</b></p><ul>" + q.bar.map((x) => "<li>" + x + "</li>").join("") + "</ul>" : "") })) })), "h"]],
        ouvertes: [], conventions: typeof MZT_CONFIG !== "undefined" ? MZT_CONFIG.conventions || "" : "",
      };
    },
    module: {
      titre: "Probabilités et statistiques", prof: "", semestre: "S3", fichier: "probas-S3.html",
      cle: "ps3_revision_v1", cleEtat: "ps3_revision_v1", progression: "best", maths: true, tuteurId: "probas", clesSupplementaires: [],
      resume: "Probabilités et statistiques de S3, préparées à partir des annales 2016-2024.",
      outils: "calculs générés, examen blanc chronométré, annales interactives",
      chapitreOutils: { id: "entrainement", titre: "Entraînement : calculs, formulaire, examen blanc", liste: [
        ["Calculs générés", "Les mêmes exercices que la prof, avec d'autres nombres.", "calc", "main#main"],
        ["Formulaire", "Toutes les formules du module, par notion.", "formulaire", "main#main"],
        ["Table de la loi normale", "Φ(u) = P(U ≤ u).", "table", "main#main"],
        ["Examen blanc", "1 h 30, sans notes, corrigé avec les barèmes.", "blanc", "main#main"]] },
      remplacer: { annales: ["annales", "main#main"] },
    },
  },
  uml: {
    ancien: "uml-outils.html",
    // Les diagrammes sont dessinés en JavaScript à l'affichage : on ouvre chaque page, on déplie les
    // corrections, puis on fige le résultat (SVG) avant la lecture.
    preparer: async () => {
      const ids = [...document.querySelectorAll("section.view")].map((v) => v.dataset.view);
      window.__SNAP = {};
      for (const id of ids) {
        location.hash = id; await new Promise((r) => setTimeout(r, 250));
        const v = document.querySelector(`section.view[data-view="${id}"]`);
        v.querySelectorAll("details").forEach((d) => (d.open = true));
        await new Promise((r) => setTimeout(r, 500));
        const c = v.cloneNode(true);
        c.querySelectorAll("details").forEach((d) => d.removeAttribute("open"));
        c.querySelectorAll(".q").forEach((q) => { const box = q.parentElement; if (box && box.querySelectorAll(".q").length === box.children.length - box.querySelectorAll(".score").length) box.remove(); else q.remove(); });
        c.querySelectorAll(".score,[data-done],.row:empty").forEach((x) => x.remove());
        c.querySelectorAll(".eyebrow,h1").forEach((x, i) => { if (i < 2) x.remove(); });
        c.querySelectorAll("[hidden]").forEach((x) => x.removeAttribute("hidden"));
        window.__SNAP[id] = c.innerHTML;
      }
    },
    lire: () => {
      const vues = [...CHAPTERS.map((c) => [c.id, c.t, "Cours · " + (c.src || "")]), ...PRACTICE.map((x) => [x.id, x.t, "Exercices et TD"]), ...PREP.filter((x) => x.id !== "cartes").map((x) => [x.id, x.t, "Préparer l'examen"])];
      return {
        cours: vues.filter(([id]) => window.__SNAP[id]).map(([id, t, seance]) => ({ id, t, h: window.__SNAP[id], seance })),
        notions: [...CHAPTERS.map((c) => ({ id: c.id, t: c.t, imp: c.imp, chapitre: c.id })), { id: "qcours", t: "Questions de cours (rédaction)", imp: 3, chapitre: "qcours" }],
        cartes: CARDS,
        qcm: Object.entries(QUIZ).flatMap(([k, l]) => l.filter((q) => q.o).map((q) => [k, q.q, q.o, q.a, q.e])),
        series: [["qcours", "Questions de cours (rédaction)", [{ ex: "Questions de cours type examen", items: QCOURS.map((q, j) => ({ id: "Q" + (j + 1), n: "qcours", q: q[0], c: q[1] })) }], "h"]],
        ouvertes: [], conventions: typeof MZT_CONFIG !== "undefined" ? MZT_CONFIG.conventions || "" : "",
        intro: window.__SNAP.accueil || "",
      };
    },
    module: {
      titre: "UML", prof: "", semestre: "S5", fichier: "uml.html",
      cle: "umlp_scores", cleEtat: "umlp_etat", progression: "score10", tuteurId: "uml", clesSupplementaires: ["umlp_*"],
      resume: "Diagrammes et modélisation orientée objet.",
      outils: "grille d'auto-correction de l'examen",
      remplacer: { methode: ["methode", '[data-view="methode"]'], examen: ["examen", '[data-view="examen"]'] },
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
      chapitreOutils: { id: "entrainement", titre: "Atelier, examen blanc et erreurs", liste: [
        ["Atelier", "Conversions, circuits logiques et assembleur 8086 : manipule et vérifie.", "atelier", '[data-tab="atelier"]'],
        ["Examen blanc chronométré", "Un sujet complet dans les conditions de l'examen.", "exam", '[data-tab="exam"]'],
        ["Journal d'erreurs", "Tes erreurs passées, pour les retravailler.", "erreurs", '[data-tab="erreurs"]']] },
    },
  },
};

(async () => {
  const slug = process.argv[2], A = ADAPTATEURS[slug];
  if (!A) throw new Error("Pas d'adaptateur pour " + slug);
  const out = path.join(RACINE, "content", "sources", slug);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setViewportSize({ width: 1200, height: 900 });
  await p.goto("file://" + path.join(RACINE, "content", "modules", A.ancien)); await p.waitForTimeout(900);
  if (A.preparer) await p.evaluate(A.preparer);
  const D = await p.evaluate(A.lire);
  const css = await p.evaluate(() => [...document.querySelectorAll("style")].map((s) => s.textContent).join("\n"));
  await b.close();

  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const chDe = Object.fromEntries(D.notions.map((n) => [n.id, n.chapitre]));
  const chapitres = [];
  const ecrire = (id, md) => { const f = `${String(chapitres.length + 1).padStart(2, "0")}-${id}.md`; fs.writeFileSync(path.join(out, f), md); chapitres.push(f); };
  for (const c of D.cours) {
    const imps = D.notions.filter((n) => n.chapitre === c.id).map((n) => n.imp);
    const M0 = A.module, rempl = (M0.remplacer || {})[c.id];
    const integre = (ancre, cible, garder) => "```integre " + A.ancien + "#" + ancre + "\ncible: " + cible + (garder ? "\ngarder: " + garder : "") + "\n```\n\n";
    let md = `---\nid: ${c.id}\ntitre: ${c.t}\nseance: ${c.seance}\nimportance: ${imps.length ? Math.max(...imps) : 3}\n---\n\n` + (rempl ? integre(rempl[0], rempl[1]) : "```html\n" + c.h.trim() + "\n```\n\n");
    if (M0.parChapitre) md += `## ${M0.parChapitre.titre}\n\n` + integre(c.id, `[data-tab="${c.id}"]`, M0.parChapitre.garder);
    const cartes = D.cartes.map((x, k) => [x, k]).filter(([x]) => chDe[x[0]] === c.id);
    const qs = D.qcm.filter((q) => (q[5] || chDe[q[0]]) === c.id);
    const courtes = (D.courtes || []).filter((q) => (q[4] || chDe[q[0]]) === c.id);
    const ouv = D.ouvertes.filter((o) => chDe[o[0]] === c.id);
    if (ouv.length) md += "## Questions de rédaction\n\n```exercice\n" + ouv.map((o) => `? {${o[0]}} ${ligne(o[1])}\n= ${ligne(o[2])}`).join("\n") + "\n```\n\n";
    if (cartes.length) md += "## Flashcards\n\n```cartes\n" + cartes.map(([x, k]) => `{${x[0]}@${k}} ${ligne(x[1])} :: ${ligne(x[2])}`).join("\n") + "\n```\n\n";
    if (courtes.length) md += "## Réponses courtes\n\n```exercice\n" + courtes.map((q) => `? {${q[0]}} ${ligne(q[1])}\nreponse: ${String(q[2]).replace(/\|/g, "/")}\n= ${ligne(q[3])}`).join("\n") + "\n```\n\n";
    if (qs.length) md += "## QCM du chapitre\n\n```qcm\n" + qs.map((q) => `? {${q[0]}} ${ligne(q[1])}\n` + q[2].map((o, j) => `${j === q[3] ? "+" : "-"} ${ligne(o)}`).join("\n") + `\n= ${ligne(q[4])}`).join("\n\n") + "\n```\n";
    ecrire(c.id, md);
  }
  for (const [id, titre, series, cleIndice] of D.series) {
    let md = `---\nid: ${id}\ntitre: ${titre}\nseance: Travaux dirigés et pratiques\nimportance: 4\n---\n\n> [!astuce] Cherche d'abord seul, ouvre l'indice si tu bloques, puis compare avec le corrigé et note-toi honnêtement : ta réponse compte dans la maîtrise de la notion.\n\n`;
    for (const s of series) md += "```exercice " + ligne(s.ex) + "\n" + s.items.map((it) => `? {${it.n}} **${ligne(it.id)}.** ${ligne(it.q)}` + (it[cleIndice] ? `\nindice: ${ligne(it[cleIndice])}` : "") + `\n= ${ligne(it.c)}`).join("\n") + "\n```\n\n";
    ecrire(id, md);
  }

  if (A.module.chapitreOutils) {
    const T = A.module.chapitreOutils;
    ecrire(T.id, `---\nid: ${T.id}\ntitre: ${T.titre}\nseance: Outils interactifs\nimportance: 3\n---\n\n` + T.liste.map(([t, txt, ancre, cible]) => `## ${t}\n\n${txt}\n\n` + "```integre " + A.ancien + "#" + ancre + "\ncible: " + cible + "\n```\n").join("\n"));
  }

  // Styles des schémas d'origine : uniquement les classes utilisées par le cours, limitées à <main>.
  const classes = new Set(); D.cours.forEach((c) => c.h.replace(/class="([^"]+)"/g, (m, l) => l.split(/\s+/).forEach((k) => classes.add(k))));
  ["def", "trap", "exam", "formula", "table-wrap"].forEach((k) => classes.delete(k));   // repris par le gabarit
  const regles = [...css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)].filter(([, sel]) => [...classes].some((c) => new RegExp("\\." + c.replace(/[-]/g, "\\-") + "(?![\\w-])").test(sel)))
    .map(([, sel, corps]) => sel.split(",").map((x) => "main " + x.trim().replace(/^(html|body)\s+/, "")).join(",") + "{" + corps.trim() + "}");
  // Variables de couleur de l'ancien module absentes du gabarit (ex. --paper), en clair et en sombre.
  const gab = fs.readFileSync(path.join(RACINE, "content", "commun", "gabarit-module.html"), "utf8");
  const connues = new Set([...gab.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  const varsDe = (bloc) => [...bloc.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)].filter(([, k]) => !connues.has(k)).map(([, k, v]) => `${k}:${v.trim()}`);
  const blocs = [...css.matchAll(/:root([^{]*)\{([^}]*)\}/g)].map((m) => ({ sel: m[1], corps: m[2], avant: css.slice(Math.max(0, m.index - 60), m.index) }));
  const estSombre = (b) => /dark/.test(b.sel) || /prefers-color-scheme:\s*dark\)\s*\{\s*$/.test(b.avant);
  const clair = blocs.filter((b) => !estSombre(b) && !/data-theme/.test(b.sel)).flatMap((b) => varsDe(b.corps));
  const sombre = blocs.filter((b) => /prefers-color-scheme:\s*dark\)\s*\{\s*$/.test(b.avant)).flatMap((b) => varsDe(b.corps));
  const vars = (clair.length ? `main{${[...new Set(clair)].join(";")}}\n` : "") + (sombre.length ? `@media (prefers-color-scheme:dark){main{${[...new Set(sombre)].join(";")}}}\n` : "");
  fs.writeFileSync(path.join(out, "styles.css"), vars + [...new Set(regles)].join("\n") + "\n");

  const M = A.module;
  const module = {
    titre: M.titre, prof: M.prof, semestre: M.semestre, etablissement: "FSABM", fichier: M.fichier,
    cle: M.cle, cleEtat: M.cleEtat, progression: M.progression || "essais", cartes: M.cartes, maths: M.maths, tuteurId: M.tuteurId, css: "styles.css", clesSupplementaires: M.clesSupplementaires,
    resume: M.resume, conventions: D.conventions,
    intro: (D.intro ? D.intro + "\n\n" : "") + `Le cours chapitre par chapitre, avec **QCM**, **flashcards** (révision espacée) et **TD corrigés**.\n\n- **Tableau de bord** : tes notions à consolider, les plus importantes d'abord.\n- **Flashcards** : quelques minutes par jour ; une carte réussie revient après 1, 3, 7, 14 puis 30 jours.\n- **TD** : cherche, ouvre l'indice si besoin, compare avec le corrigé et note-toi.\n- **Outils interactifs** (${M.outils}) : directement dans les chapitres.\n\nTa progression d'avant la nouvelle version est conservée.`,
    annexes: [{ fichier: A.ancien, titre: "Outils d'origine intégrés aux chapitres" }],
    notions: D.notions, chapitres,
  };
  fs.writeFileSync(path.join(out, "module.json"), JSON.stringify(module, null, 2) + "\n");
  const nEx = D.series.reduce((a, [, , s]) => a + s.reduce((x, y) => x + y.items.length, 0), 0) + D.ouvertes.length;
  console.log(`✔ ${slug} : ${chapitres.length} chapitres, ${D.notions.length} notions, ${D.qcm.length} QCM, ${D.cartes.length} cartes, ${nEx} exercices, ${regles.length} règles CSS`);
})().catch((e) => { console.error("✘ " + e.message); process.exit(1); });

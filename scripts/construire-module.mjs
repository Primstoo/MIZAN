// Construit un module ToumaiLearn à partir de ses sources Markdown.
//
//   node scripts/construire-module.mjs traitement-ad     (un module)
//   node scripts/construire-module.mjs --tous             (tous les modules de content/sources)
//
// Entrée  : content/sources/<slug>/module.json + un fichier .md par chapitre (voir docs/PRODUIRE-UN-MODULE.md)
// Sortie  : content/modules/<fichier>.html          (page autonome servie dans l'iframe)
//           src/lib/modules-sources.json            (catalogue : le module apparaît dans l'appli)
//           src/lib/notions.json   [slug]           (chapitres → maîtrise, page Progrès)
//           src/lib/banque.json    [slug]           (QCM → examen blanc de la plateforme)
//           src/lib/niveau.json    [slug]           (8 QCM → test de niveau)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = path.join(RACINE, "content", "sources");
const LIB = path.join(RACINE, "src", "lib");

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const brut = (t) => String(t).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
const lireJSON = (f, def) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : def);
const ecrireJSON = (f, v, indent = 1) => fs.writeFileSync(f, JSON.stringify(v, null, indent) + "\n");

// ---------- Blocs spéciaux ----------

// ```grille Titre facultatif
// #cols: a b c        (étiquettes de colonnes, facultatif)
// #rows: 0 1 2        (étiquettes de lignes, facultatif)
// 4 *9 2              (* = surligné, ! = 2e couleur, ~ = grisé ; « | » ou espaces séparent les cases)
// ```
function grille(titre, corps) {
  let cols = null, rows = null; const lignes = [];
  for (const l of corps.split("\n")) {
    const t = l.trim(); if (!t) continue;
    if (t.startsWith("#cols:")) cols = t.slice(6).trim().split(/\s*\|\s*|\s+/);
    else if (t.startsWith("#rows:")) rows = t.slice(6).trim().split(/\s*\|\s*|\s+/);
    else lignes.push(t.includes("|") ? t.split("|").map((c) => c.trim()) : t.split(/\s+/));
  }
  const cell = (c) => {
    const k = { "*": "h1", "!": "h2", "~": "h0" }[c[0]];
    return `<td${k ? ` class="${k}"` : ""}>${esc(k ? c.slice(1) : c)}</td>`;
  };
  const head = cols ? `<tr>${rows ? "<th></th>" : ""}${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr>` : "";
  const body = lignes.map((l, i) => `<tr>${rows ? `<th>${esc(rows[i] ?? "")}</th>` : ""}${l.map(cell).join("")}</tr>`).join("");
  return `<figure class="grille">${titre ? `<figcaption>${esc(titre)}</figcaption>` : ""}<table>${head}${body}</table></figure>`;
}

// ```flux Titre
// Étape A -> Étape B -> Étape C
// ```
function flux(titre, corps, md) {
  const lignes = corps.trim().split("\n").filter(Boolean).map((l) =>
    `<div class="flux-l">${l.split("->").map((x) => `<div class="flux-b">${md.parseInline(x.trim())}</div>`).join('<div class="flux-f">→</div>')}</div>`);
  return `<figure class="flux">${titre ? `<figcaption>${esc(titre)}</figcaption>` : ""}${lignes.join("")}</figure>`;
}

// ```etapes Titre
// Titre de l'étape :: contenu Markdown (une ligne ; « \n » pour aller à la ligne)
// ```
function etapes(titre, corps, md) {
  const items = corps.trim().split("\n").filter(Boolean).map((l) => {
    const [t, ...r] = l.split("::");
    return { t: t.trim(), c: md.parse(r.join("::").trim().replace(/\\n/g, "\n")) };
  });
  return `<figure class="etapes" data-i="0">${titre ? `<figcaption>${esc(titre)}</figcaption>` : ""}${items
    .map((x, i) => `<div class="etape"${i ? " hidden" : ""}><div class="et-t">${i + 1}/${items.length} · ${md.parseInline(x.t)}</div>${x.c}</div>`)
    .join("")}<div class="et-nav"><button class="b" data-et="-1">← Étape précédente</button><button class="b p" data-et="1">Étape suivante →</button></div></figure>`;
}

// ```qcm
// ? Question (Markdown en ligne)
// - mauvaise réponse
// + bonne réponse
// = explication
// ```
function lireQCM(corps) {
  const qs = []; let q = null;
  for (const l of corps.split("\n")) {
    const t = l.trim(); if (!t) continue;
    const m = /^([?+\-=])\s?(.*)$/.exec(t);
    if (!m) { if (q) { if (q.e !== undefined) q.e += " " + t; else if (q.o.length) q.o[q.o.length - 1] += " " + t; else q.q += " " + t; } continue; }
    if (m[1] === "?") { q = { q: m[2], o: [], a: -1, e: undefined }; qs.push(q); }
    else if (!q) throw new Error("QCM : une ligne « " + t + " » apparaît avant la question");
    else if (m[1] === "=") q.e = m[2];
    else { if (m[1] === "+") q.a = q.o.length; q.o.push(m[2]); }
  }
  for (const x of qs) {
    if (x.a < 0) throw new Error("QCM sans bonne réponse (+) : " + x.q);
    if (x.o.length < 2) throw new Error("QCM avec moins de 2 options : " + x.q);
    x.e = x.e || "";
  }
  return qs;
}

// ```cartes
// {n12} Question :: Réponse            ({nX} = notion, facultatif ; « \n » pour aller à la ligne)
// ```
function lireCartes(corps) {
  return corps.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [n, reste, k] = tagNotion(l);
    const i = reste.indexOf("::");
    if (i < 0) throw new Error("Carte sans « :: » : " + l);
    return { n, k, q: reste.slice(0, i).trim().replace(/\\n/g, "\n"), r: reste.slice(i + 2).trim().replace(/\\n/g, "\n") };
  });
}

// ```exercice Titre
// ? {n21} Énoncé (Markdown en ligne)
// indice: Piste (facultatif)
// = Corrigé (Markdown ; peut continuer sur les lignes suivantes)
// ```
function lireExercices(corps) {
  const items = []; let it = null, zone = null;
  for (const l of corps.split("\n")) {
    const t = l.trim();
    if (t.startsWith("? ")) { const [n, q] = tagNotion(t.slice(2)); it = { n, q, h: "", c: "", rep: null }; items.push(it); zone = "q"; continue; }
    if (!it) { if (t) throw new Error("Exercice : ligne avant le premier « ? » : " + t); continue; }
    if (/^indice\s*:/i.test(t)) { it.h = t.replace(/^indice\s*:\s*/i, ""); zone = "h"; continue; }
    if (/^reponse\s*:/i.test(t)) {          // « reponse: 0.038 ~0.002 » = valeur numérique avec tolérance ; « | » sépare les réponses acceptées
      let r = t.replace(/^reponse\s*:\s*/i, ""); const m = /\s~\s*([\d.]+)\s*$/.exec(r); if (m) { it.tol = Number(m[1]); r = r.slice(0, m.index); }
      it.rep = r.split("|").map((x) => x.trim()).filter(Boolean); zone = null; continue;
    }
    if (t.startsWith("=")) { it.c = t.slice(1).trim(); zone = "c"; continue; }
    if (zone === "c") it.c += "\n" + l; else if (zone === "h") it.h += " " + t; else if (t) it.q += " " + t;
  }
  return items;
}

const tagNotion = (t) => { const m = /^\{([\w.-]+)(?:@(\d+))?\}\s*/.exec(t); return m ? [m[1], t.slice(m[0].length), m[2] === undefined ? null : Number(m[2])] : [null, t, null]; };

// ---------- Lecture d'un chapitre ----------
function lireChapitre(fichier) {
  const src = fs.readFileSync(fichier, "utf8").replace(/\r\n/g, "\n");
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src);
  if (!m) throw new Error(fichier + " : en-tête --- manquant");
  const meta = {};
  for (const l of m[1].split("\n")) { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  for (const k of ["id", "titre"]) if (!meta[k]) throw new Error(fichier + " : champ « " + k + " » manquant dans l'en-tête");
  return { meta, corps: src.slice(m[0].length) };
}

function rendreChapitre({ meta, corps }, ctx) {
  const qcm = [], ex = [];
  const md = new Marked({ gfm: true });
  const nDefaut = meta.id;
  const rendu = {
    code({ text, lang }) {
      const [l, ...opts] = (lang || "").trim().split(/\s+/);
      const titre = opts.join(" ");
      if (l === "grille") return grille(titre, text);
      if (l === "flux") return flux(titre, text, md);
      if (l === "etapes") return etapes(titre, text, md);
      if (l === "html") return text;                       // HTML brut (schémas SVG, tableaux spéciaux)
      if (l === "outil") {                                 // HTML + <script> exécuté à l'affichage du chapitre
        const k = ctx.outils.length; ctx.outils.push(text);
        return `<div class="outil" data-outil="${k}"></div>`;
      }
      if (l === "qcm") {
        const qs = lireQCM(text).map((q) => { const [n, qq] = tagNotion(q.q); return { ...q, q: qq, n: n || nDefaut }; });
        const debut = qcm.length; qcm.push(...qs);
        return `<section class="qcm">${qs.map((q, j) => `<div class="qq" data-k="${debut + j}"><div class="qq-q">${md.parseInline(q.q)}</div>${q.o.map((o, i) => `<button class="opt" data-o="${i}">${md.parseInline(o)}</button>`).join("")}<div class="qq-e" hidden></div></div>`).join("")}</section>`;
      }
      if (l === "cartes") {
        const cs = lireCartes(text);
        for (const c of cs) ctx.cartes.push({ n: c.n || nDefaut, k: c.k, ch: meta.id, q: md.parse(c.q), r: md.parse(c.r) });
        return `<p class="cartes-info">🃏 ${cs.length} flashcard${cs.length > 1 ? "s" : ""} de ce chapitre ajoutée${cs.length > 1 ? "s" : ""} à la révision espacée (menu « Flashcards »).</p>`;
      }
      if (l === "exercice") {
        const items = lireExercices(text);
        return `<section class="exo">${titre ? `<h3>${md.parseInline(titre)}</h3>` : ""}${items.map((it) => {
          const k = ex.length; ex.push({ n: it.n || nDefaut, rep: it.rep, tol: it.tol ?? null });
          const saisie = it.rep ? `<div class="ex-r"><input type="text" placeholder="Ta réponse" autocomplete="off" spellcheck="false"><button class="b p" data-ex="v">Vérifier</button></div>` : "";
          const boutons = it.rep ? (it.h ? `<button class="b" data-ex="h">Indice</button>` : "") : `${it.h ? `<button class="b" data-ex="h">Indice</button>` : ""}<button class="b p" data-ex="c">Voir le corrigé</button>`;
          const auto = it.rep ? "" : `<div class="ex-b"><button class="b ok" data-ex="1">J'avais juste</button><button class="b ko" data-ex="0">J'avais faux</button></div>`;
          return `<div class="ex" data-x="${k}"><div class="ex-q">${md.parse(it.q)}</div>${saisie}<div class="ex-b">${boutons}</div>${it.h ? `<div class="ex-h" hidden>${md.parse(it.h)}</div>` : ""}<div class="ex-c" hidden>${it.rep ? `<p><b>Réponse attendue : ${esc(it.rep[0])}</b></p>` : ""}${md.parse(it.c)}${auto}</div></div>`;
        }).join("")}</section>`;
      }
      const etiquette = l === "sortie" ? '<div class="code-tag">Sortie</div>' : "";
      return `<pre class="${l === "sortie" ? "sortie" : ""}">${etiquette}<code>${esc(text)}</code></pre>`;
    },
    blockquote({ tokens }) {
      const html = this.parser.parse(tokens);
      const m = /^<p>\[!(piege|astuce|retenir|prof|attention)\]\s*/.exec(html);
      if (!m) return `<blockquote>${html}</blockquote>`;
      const noms = { piege: "Piège", astuce: "Astuce", retenir: "À retenir", prof: "Ce que le prof attend", attention: "Attention" };
      return `<aside class="enc ${m[1]}"><div class="enc-t">${noms[m[1]]}</div>${html.replace(m[0], "<p>")}</aside>`;
    },
  };
  md.use({ renderer: rendu });
  const html = md.parse(corps);
  return {
    id: meta.id, t: meta.titre, seance: meta.seance || "", imp: Number(meta.importance || 3), html, ex,
    qcm: qcm.map((q) => ({ n: q.n, q: md.parseInline(q.q), o: q.o.map((o) => md.parseInline(o)), a: q.a, e: md.parseInline(q.e) })),
  };
}

// ---------- Construction d'un module ----------
function construire(slug) {
  const dossier = path.join(SOURCES, slug);
  const mod = lireJSON(path.join(dossier, "module.json"), null);
  if (!mod) throw new Error("content/sources/" + slug + "/module.json introuvable");
  mod.slug = slug;
  mod.fichier = mod.fichier || slug + ".html";
  const ctx = { cartes: [], outils: [] };
  const ids = new Set();
  const chapitres = mod.chapitres.map((f) => {
    const c = rendreChapitre(lireChapitre(path.join(dossier, f)), ctx);
    if (ids.has(c.id)) throw new Error("id de chapitre en double : " + c.id);
    ids.add(c.id); return c;
  });

  // Emplacement de sauvegarde de chaque carte : fixé par {n@k} (reprise d'un ancien module), sinon à la suite.
  const pris = new Set();
  for (const c of ctx.cartes) if (c.k !== null) { if (pris.has(c.k)) throw new Error("emplacement de carte en double : " + c.k); pris.add(c.k); }
  let libre = pris.size ? Math.max(...pris) + 1 : 0;
  for (const c of ctx.cartes) if (c.k === null) c.k = libre++;

  // Notions : déclarées dans module.json (suivi fin), sinon une notion = un chapitre.
  const notions = mod.notions
    ? mod.notions.map((n) => ({ id: n.id, t: n.t, imp: n.imp ?? 3, ch: n.chapitre }))
    : chapitres.map((c) => ({ id: c.id, t: c.t, imp: c.imp, ch: c.id }));
  const nids = new Set(notions.map((n) => n.id));
  for (const n of notions) if (!ids.has(n.ch)) throw new Error(`notion ${n.id} : chapitre « ${n.ch} » inconnu`);
  const verifierN = (n, ou) => { if (!nids.has(n)) throw new Error(`${ou} : notion « ${n} » non déclarée dans module.json`); };
  chapitres.forEach((c) => { c.qcm.forEach((q) => verifierN(q.n, "QCM du chapitre " + c.id)); c.ex.forEach((x) => verifierN(x.n, "exercice du chapitre " + c.id)); });
  ctx.cartes.forEach((x) => verifierN(x.n, "carte du chapitre " + x.ch));

  // Progression : « essais » (par notion, compatible avec les anciens modules Réseaux et Archi)
  // ou « score10 » (score du QCM de chaque chapitre sur 10).
  // « pc » : pourcentage du dernier passage complet de l'évaluation du chapitre (ancien module Crypto).
  const format = mod.progression || (mod.notions ? "essais" : "score10");
  if (!["essais", "score10", "pc"].includes(format)) throw new Error("progression inconnue : " + format);
  const cle = mod.cle || slug.replace(/[^a-z0-9]/gi, "_") + (format === "essais" ? "_etat" : "_scores");
  const cleEtat = mod.cleEtat || (format === "essais" ? cle : cle + "_etat");

  // Page HTML
  const gabarit = fs.readFileSync(path.join(RACINE, "content", "commun", "gabarit-module.html"), "utf8");
  const tuteur = fs.readFileSync(path.join(RACINE, "content", "commun", "tuteur.js"), "utf8");
  const css = mod.css ? fs.readFileSync(path.join(dossier, mod.css), "utf8") : "";
  const intro = mod.intro ? new Marked({ gfm: true }).parse(mod.intro) : "";
  const config = { id: mod.tuteurId || slug, module: mod.titre, prof: mod.prof || "", student: "un étudiant de licence (" + (mod.etablissement || "FSABM") + ")", conventions: mod.conventions || "" };
  const donnees = { slug, titre: mod.titre, cle, cleEtat, format, intro, annexes: mod.annexes || [], cartes: mod.cartes || null };
  const page = gabarit
    .replaceAll("{{TITRE}}", esc(mod.titre))
    .replace("{{SOUS_TITRE}}", esc([mod.prof, mod.semestre, mod.etablissement].filter(Boolean).join(" · ")))
    .replace("/*{{CSS_MODULE}}*/", () => css)
    .replace("/*{{DONNEES}}*/", () => `const MODULE=${JSON.stringify(donnees)};\nconst CHAPS=${JSON.stringify(chapitres)};\nconst NOTIONS=${JSON.stringify(notions)};\nconst CARTES=${JSON.stringify(ctx.cartes)};\nconst OUTILS=${JSON.stringify(ctx.outils)};`)
    .replace("/*{{MZT_CONFIG}}*/", () => `window.MZT_CONFIG=${JSON.stringify(config)};`)
    .replace("/*{{TUTEUR}}*/", () => tuteur);
  fs.writeFileSync(path.join(RACINE, "content", "modules", mod.fichier), page);

  // Catalogue
  const catF = path.join(LIB, "modules-sources.json");
  const cat = lireJSON(catF, []).filter((m) => m.slug !== slug);
  const cles = [...new Set([cle, cleEtat, "mzt-" + (mod.tuteurId || slug) + "*", ...(mod.clesSupplementaires || [])])];
  cat.push({ slug, titre: mod.titre, prof: mod.prof || "", semestre: mod.semestre || "", fichier: mod.fichier, resume: mod.resume || "", cles, cle, format, annexes: (mod.annexes || []).map((a) => a.fichier) });
  ecrireJSON(catF, cat.sort((a, b) => a.semestre.localeCompare(b.semestre) || a.titre.localeCompare(b.titre)), 2);

  // Notions → maîtrise et page Progrès
  const notF = path.join(LIB, "notions.json"); const notJ = lireJSON(notF, {});
  notJ[slug] = mod.notions
    ? { unite: "notion", groupes: chapitres.map((c) => ({ id: c.id, t: c.t })), items: notions.map((n) => ({ id: n.id, t: n.t, imp: n.imp, g: n.ch })) }
    : { unite: "chapitre", groupes: [{ id: "cours", t: "Chapitres" }], items: chapitres.map((c) => ({ id: c.id, t: c.t, imp: c.imp, g: "cours" })) };
  ecrireJSON(notF, notJ);

  // Banque de QCM (examen blanc) et test de niveau (une question par notion importante, 8 max)
  const banque = chapitres.flatMap((c) => c.qcm.map((q) => ({ n: q.n, q: brut(q.q), o: q.o.map(brut), a: q.a, e: brut(q.e) })));
  const banF = path.join(LIB, "banque.json"); const ban = lireJSON(banF, {});
  ban[slug] = banque; fs.writeFileSync(banF, JSON.stringify(ban));
  const nivF = path.join(LIB, "niveau.json"); const niv = lireJSON(nivF, {});
  niv[slug] = [...notions].sort((a, b) => b.imp - a.imp).map((n) => banque.find((q) => q.n === n.id && q.o.length >= 3)).filter(Boolean).slice(0, 8);
  ecrireJSON(nivF, niv);

  const nEx = chapitres.reduce((a, c) => a + c.ex.length, 0);
  console.log(`✔ ${slug} : ${chapitres.length} chapitres, ${notions.length} notions, ${banque.length} QCM, ${ctx.cartes.length} flashcards, ${nEx} exercices, test de niveau ${niv[slug].length} → content/modules/${mod.fichier}`);
}

const arg = process.argv[2];
if (!arg) { console.error("Usage : node scripts/construire-module.mjs <slug> | --tous"); process.exit(1); }
const slugs = arg === "--tous" ? fs.readdirSync(SOURCES).filter((d) => fs.existsSync(path.join(SOURCES, d, "module.json"))) : [arg];
try { slugs.forEach(construire); } catch (e) { console.error("✘ " + e.message); process.exit(1); }

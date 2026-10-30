/* MIZAN · tuteur commun (bouton flottant présent sur chaque section)
   Configuration attendue avant ce script : window.MZT_CONFIG = {
     id: 'crypto',                      // identifiant court du module (stockage)
     module: 'Cryptographie',           // nom affiché et donné au tuteur
     prof: 'Pr A. Farchane',
     student: 'Patrick, L3 MIACSD à la FSABM (Béni Mellal)',
     conventions: '…',                  // conventions du prof à respecter
     getContext: () => ({label, text})  // facultatif : extrait courant (sinon section visible)
   };
   Fonctions : extrait automatique de la section visible (ou contexte fourni par le module),
   mode rapide explicatif par défaut, mode approfondi (modèle supérieur), relances rapides,
   photo jointe, bouton Arrêter, mémoire des difficultés (note cachée MÉMO), historique par
   section avec recherche. Stockage : compte (db) si disponible, sinon navigateur. */
(function () {
  if (window.MZT) return;
  const C = Object.assign({ id: 'module', module: 'ce module', prof: '', student: 'un étudiant', conventions: '' }, window.MZT_CONFIG || {});
  const LS = 'mzt-' + C.id;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const today = () => new Date().toLocaleDateString('fr-FR');
  const norm = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // ---------- état ----------
  let ST = { threads: [], memos: [] };
  try { ST = Object.assign(ST, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) {}
  const saveLocal = () => { try { localStorage.setItem(LS, JSON.stringify({ threads: ST.threads.slice(-80), memos: ST.memos.slice(-30) })); } catch (e) {} };
  let sample = null, ready = false, imgOK = false, db = null, base = null;
  let cur = null, busy = false, ctl = null, img = null, forced = null;

  // ---------- extrait de la section visible ----------
  function visibleSection() {
    const cands = [...document.querySelectorAll('section, [data-tab], [data-view], main')]
      .filter((el) => !el.closest('.mzt-pan') && el.offsetParent !== null && (el.innerText || '').trim().length > 80);
    // la plus profonde parmi les visibles qui contiennent le plus de texte
    cands.sort((a, b) => (b.innerText || '').length - (a.innerText || '').length);
    let el = cands.find((c) => !cands.some((d) => d !== c && c.contains(d) && (d.innerText || '').length > 0.6 * (c.innerText || '').length)) || cands[0] || document.body;
    const h = el.querySelector('h1, h2, h3');
    return { label: (h ? h.innerText : document.title).trim().slice(0, 80), text: (el.innerText || '').replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim() };
  }
  function context() {
    if (forced) return forced;
    try { if (C.getContext) { const c = C.getContext(); if (c && c.text) return c; } } catch (e) {}
    return visibleSection();
  }

  // ---------- interface ----------
  const css = `
.mzt-btn{position:fixed;right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9999;font:700 15px system-ui,sans-serif;background:#1f5fbf;color:#fff;border:0;border-radius:999px;padding:12px 20px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.mzt-pan{--b:#fff;--s:#f1f4f8;--i:#14213a;--m:#5a6782;--l:#d5dbe6;--a:#1f5fbf;--w:#b5791c;--bad:#b3261e;position:fixed;right:calc(10px + env(safe-area-inset-right,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:9999;width:min(440px,calc(100vw - 20px));height:min(680px,calc(100vh - 70px));background:var(--b);color:var(--i);border:1px solid var(--l);border-radius:12px;display:flex;flex-direction:column;box-shadow:0 8px 30px rgba(0,0,0,.3);font:14px/1.5 system-ui,sans-serif}
@media (prefers-color-scheme:dark){.mzt-pan{--b:#161f33;--s:#0e1524;--i:#e6ebf5;--m:#93a0bb;--l:#2a3652;--a:#7aa7f0;--w:#e0a447;--bad:#f08a80}}
.mzt-pan *{box-sizing:border-box}
.mzt-h{display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid var(--l)}
.mzt-h b{flex:0 0 auto}.mzt-h .mzt-ctx{flex:1;min-width:0;color:var(--m);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mzt-pan button{font:600 12px system-ui,sans-serif;border:1px solid var(--l);background:var(--s);color:var(--i);border-radius:999px;padding:4px 10px;cursor:pointer}
.mzt-pan button.mzt-pri{background:var(--a);color:#fff;border-color:var(--a)}
.mzt-pan button:disabled{opacity:.5}
.mzt-body{flex:1;min-height:0;display:flex;flex-direction:column}
.mzt-log{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}
.mzt-m{padding:8px 11px;border-radius:10px;max-width:92%;white-space:pre-wrap;word-wrap:break-word}
.mzt-m.a{background:var(--s);align-self:flex-start}.mzt-m.u{background:color-mix(in srgb,var(--a) 22%,transparent);align-self:flex-end}
.mzt-m .mzt-tag{display:block;font-size:11px;color:var(--w);font-weight:700}
.mzt-deepbtn{align-self:flex-start;border-color:var(--w)!important;color:var(--w)!important;background:transparent!important}
.mzt-chips{display:flex;gap:5px;flex-wrap:wrap;padding:4px 10px}
.mzt-f{display:flex;flex-direction:column;gap:6px;padding:8px 10px;border-top:1px solid var(--l)}
.mzt-f textarea{width:100%;min-height:54px;max-height:140px;resize:vertical;font:14px system-ui,sans-serif;padding:7px;border:1px solid var(--l);border-radius:8px;background:var(--s);color:var(--i)}
.mzt-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.mzt-row label{display:flex;gap:4px;align-items:center;font-size:12px;color:var(--m);cursor:pointer}
.mzt-note{font-size:11.5px;color:var(--m);margin:0}
.mzt-pan details{padding:0 10px}.mzt-pan summary{cursor:pointer;font-size:12px;color:var(--a);font-weight:600;padding:4px 0}
.mzt-prev{max-height:140px;overflow:auto;font-size:12px;white-space:pre-wrap;background:var(--s);border-radius:6px;padding:6px;color:var(--m)}
.mzt-list{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px}
.mzt-item{border:1px solid var(--l);border-radius:8px;padding:8px}
.mzt-item .mzt-meta{font-size:11px;color:var(--m)}
.mzt-pan input[type=search]{width:100%;font:14px system-ui,sans-serif;padding:7px;border:1px solid var(--l);border-radius:8px;background:var(--s);color:var(--i)}
.mzt-pan input[type=checkbox]{width:auto}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  document.body.insertAdjacentHTML('beforeend', `
<button class="mzt-btn" id="mztBtn" type="button">Tuteur</button>
<div class="mzt-pan" id="mztPan" hidden role="dialog" aria-label="Tuteur">
 <div class="mzt-h"><b>Tuteur</b><span class="mzt-ctx" id="mztCtx"></span><button type="button" id="mztTabH">Historique</button><button type="button" id="mztTabM">Mémoire</button><button type="button" id="mztX">Fermer</button></div>
 <div class="mzt-body" id="mztChat">
  <details><summary>Voir l'extrait envoyé au tuteur</summary><div class="mzt-prev" id="mztPrev"></div></details>
  <div class="mzt-log" id="mztLog"></div>
  <div class="mzt-chips" id="mztChips"></div>
  <form class="mzt-f" id="mztF">
   <textarea id="mztIn" placeholder="Ta question, ou ta réponse à vérifier… (Ctrl+Entrée pour envoyer)"></textarea>
   <div class="mzt-row">
    <button class="mzt-pri" id="mztSend" type="submit">Envoyer</button>
    <button type="button" id="mztStop" hidden>Arrêter</button>
    <label id="mztImgL" hidden>📎 Photo<input type="file" id="mztImg" accept="image/*" hidden></label>
    <span class="mzt-note" id="mztImgN"></span>
    <label title="Modèle plus puissant : réponse plus longue et plus détaillée, consomme davantage"><input type="checkbox" id="mztDeep"> Approfondi</label>
    <button type="button" id="mztNew">Nouvelle discussion</button>
   </div>
   <p class="mzt-note" id="mztNote"></p>
  </form>
 </div>
 <div class="mzt-body" id="mztHist" hidden><div style="padding:10px"><input type="search" id="mztQ" placeholder="Chercher dans toutes mes anciennes questions…"></div><div class="mzt-list" id="mztList"></div></div>
 <div class="mzt-body" id="mztMem" hidden><div class="mzt-list"><p class="mzt-note">Ce que le tuteur retient de tes difficultés d'une conversation à l'autre. Il s'en sert pour faire des liens avec tes confusions passées. Tu peux effacer une note.</p><div id="mztMemL"></div></div></div>
</div>`);

  const CHIPS = ['Explique plus simplement', 'Donne un exemple concret', "Pourquoi c'est un piège ?", 'Fais-moi un mini-exercice'];
  $('#mztChips').innerHTML = CHIPS.map((c) => `<button type="button" data-chip="${esc(c)}">${esc(c)}</button>`).join('');

  function view(v) {
    $('#mztChat').hidden = v !== 'chat'; $('#mztHist').hidden = v !== 'hist'; $('#mztMem').hidden = v !== 'mem';
    $('#mztTabH').textContent = v === 'hist' ? 'Retour' : 'Historique'; $('#mztTabM').textContent = v === 'mem' ? 'Retour' : 'Mémoire';
    if (v === 'hist') renderList(); if (v === 'mem') renderMem();
  }
  function note() {
    $('#mztNote').textContent = !ready ? 'Connexion au tuteur…' : sample
      ? 'Mode rapide (économe) par défaut. « Approfondi » ou « Approfondir cette réponse » utilise un modèle supérieur. Pense à chercher dans l\'Historique avant de reposer une question.'
      : 'Le tuteur n\'est pas disponible ici (il faut ouvrir la page dans Claude et accepter la demande d\'autorisation). L\'historique reste consultable.';
  }
  function refreshCtx() {
    const c = context(); $('#mztCtx').textContent = '· ' + c.label; $('#mztPrev').textContent = c.text.slice(0, 2500) + (c.text.length > 2500 ? '\n…' : '');
    return c;
  }
  function openPanel(ctx) {
    forced = ctx && ctx.text ? ctx : null;
    $('#mztPan').hidden = false; $('#mztBtn').hidden = true; view('chat');
    const c = refreshCtx();
    if (!cur || cur.sec !== c.label) { const ts = ST.threads.filter((t) => t.sec === c.label); cur = forced ? null : ts[ts.length - 1] || null; }
    renderLog(); note(); setTimeout(() => $('#mztIn').focus(), 30);
  }
  function closePanel() { $('#mztPan').hidden = true; $('#mztBtn').hidden = false; forced = null; }

  function renderLog() {
    const log = $('#mztLog'); log.innerHTML = '';
    if (!cur || !cur.msgs.length) {
      log.innerHTML = `<div class="mzt-m a">Pose ta question sur « ${esc(context().label)} » : une phrase que tu ne comprends pas, un calcul à vérifier, un exemple en plus… Tu peux joindre une photo de ton brouillon.</div>`; return;
    }
    cur.msgs.forEach((m, i) => {
      const d = document.createElement('div'); d.className = 'mzt-m ' + (m.r === 'u' ? 'u' : 'a');
      if (m.d) d.innerHTML = '<span class="mzt-tag">Réponse approfondie</span>';
      d.appendChild(document.createTextNode(m.t)); log.appendChild(d);
      if (m.r === 'a' && i === cur.msgs.length - 1 && !m.d && !busy) {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'mzt-deepbtn'; b.textContent = 'Approfondir cette réponse';
        b.onclick = () => ask('Approfondis ta réponse précédente : explique plus en détail, avec un exemple complet et les pièges.', true); log.appendChild(b);
      }
    });
    log.scrollTop = 1e9;
  }
  function renderList() {
    const q = norm($('#mztQ').value || ''); const ts = [...ST.threads].reverse().filter((t) => !q || norm(t.msgs.map((m) => m.t).join(' ')).includes(q));
    $('#mztList').innerHTML = ts.length ? ts.map((t) => `<details class="mzt-item"><summary>${esc(t.title)}</summary><div class="mzt-meta">${esc(t.sec)} · ${esc(t.date)}</div>${t.msgs.map((m) => `<div class="mzt-m ${m.r === 'u' ? 'u' : 'a'}" style="margin:6px 0">${esc(m.t)}</div>`).join('')}<button type="button" data-cont="${esc(t.id)}">Continuer cette discussion</button></details>`).join('')
      : `<p class="mzt-note">${ST.threads.length ? 'Aucune discussion ne contient ce mot.' : 'Aucune discussion pour l\'instant.'}</p>`;
  }
  function renderMem() {
    $('#mztMemL').innerHTML = ST.memos.length ? ST.memos.map((m, i) => `<div class="mzt-item"><div class="mzt-meta">${esc(m.date)}</div>${esc(m.text)}<div><button type="button" data-memdel="${i}" style="margin-top:4px">Effacer</button></div></div>`).join('')
      : '<p class="mzt-note">Aucune note pour l\'instant. Elles apparaîtront au fil de tes questions.</p>';
  }

  // ---------- stockage compte ----------
  async function saveThread(t) {
    saveLocal(); if (!db) return;
    try { await db.collection(base + '/threads').doc(t.id).set({ sec: t.sec, date: t.date, title: t.title, msgs: t.msgs.slice(-40) }); } catch (e) {}
  }
  async function saveMemos() { saveLocal(); if (!db) return; try { await db.doc(base).set({ memos: ST.memos.slice(-30), updated: Date.now() }); } catch (e) {} }

  // ---------- appel au tuteur ----------
  const ERR = { not_granted: 'Tu n\'as pas autorisé la page à utiliser Claude. Recharge-la et accepte la demande, ou change-le dans le menu Autorisations de l\'artifact.', rate_limited: 'Trop de questions d\'un coup, ou limite d\'usage atteinte. Réessaie dans un moment.', prompt_too_large: 'L\'extrait est trop long : ouvre une partie plus précise du cours.', image_rejected: 'Cette photo n\'est pas acceptée. Essaie un JPEG ou un PNG plus léger.', refused: 'Claude n\'a pas pu répondre à cette demande. Reformule ta question.' };
  const visible = (t) => t.split(/\n?\s*M[ÉE]MO\s*:/i)[0].trim();
  async function ask(q, deep) {
    q = (q || '').trim(); deep = deep || $('#mztDeep').checked;
    if (busy || !q) return; if (!sample) { note(); return; }
    const c = refreshCtx();
    if (!cur || (cur.sec !== c.label && !forced)) { cur = { id: 't' + Date.now().toString(36), sec: c.label, date: today(), title: q.slice(0, 80), msgs: [] }; ST.threads.push(cur); }
    else if (!ST.threads.includes(cur)) ST.threads.push(cur);
    cur.msgs.push({ r: 'u', t: q }); busy = true; renderLog();
    const out = document.createElement('div'); out.className = 'mzt-m a'; out.textContent = deep ? 'Réflexion approfondie…' : 'Réflexion…'; $('#mztLog').appendChild(out);
    $('#mztSend').disabled = true; $('#mztStop').hidden = false;
    const style = deep
      ? 'Réponse APPROFONDIE (400 à 700 mots) : 1) l\'intuition avec une analogie, 2) l\'explication détaillée pas à pas, 3) pourquoi ça marche, 4) un exemple complet chiffré, 5) les pièges fréquents et ce qui tombe à l\'examen, 6) une question pour vérifier la compréhension.'
      : 'Réponse EXPLICATIVE (150 à 250 mots) : 1) l\'idée en une phrase, 2) l\'explication pas à pas, 3) un petit exemple chiffré ou concret, 4) une courte question pour vérifier la compréhension.';
    const mem = [];
    if (ST.memos.length) mem.push('DIFFICULTÉS DÉJÀ REPÉRÉES :\n' + ST.memos.slice(-12).map((m) => `- ${m.date} : ${m.text}`).join('\n'));
    const lastQ = ST.threads.flatMap((t) => t.msgs.filter((m) => m.r === 'u').map((m) => `[${t.sec}] ${m.t.slice(0, 100)}`)).slice(-6);
    if (lastQ.length) mem.push('SES DERNIÈRES QUESTIONS :\n' + lastQ.map((x) => '- ' + x).join('\n'));
    const rules = `Tu es le tuteur de ${C.student}, pour le module ${C.module}${C.prof ? ' du ' + C.prof : ''}. Il apprend souvent la notion pour la première fois.
Règles : réponds en français simple, en texte brut (tirets, étapes numérotées, pas de tableaux markdown). ${style} Appuie-toi d'abord sur l'EXTRAIT ci-dessous et sur les conventions du prof ; si une source générale diffère du cours, signale l'écart et dis quelle version utiliser à l'examen (celle du prof). Pour un calcul, pose chaque étape et vérifie-la. S'il envoie une réponse ou une photo de brouillon, corrige étape par étape et nomme précisément l'erreur. Si tu n'es pas sûr, dis-le. S'il demande un mini-exercice, donne l'exercice sans la solution.
Utilise sa mémoire pour faire des liens avec ses confusions passées, sans la réciter.
Termine TOUJOURS par une dernière ligne séparée au format exact « MÉMO: … » qui résume en 15 mots maximum la difficulté révélée par sa question (ou « MÉMO: rien »). Cette ligne lui est cachée.
${C.conventions ? 'CONVENTIONS DU PROF : ' + C.conventions + '\n' : ''}MÉMOIRE DE L'ÉLÈVE :
${mem.join('\n\n') || '(rien pour l\'instant)'}
EXTRAIT (${c.label}) :
${c.text.slice(0, deep ? 9000 : 3500)}`;
    const recent = cur.msgs.slice(deep ? -9 : -5, -1).map((m) => ({ role: m.r === 'u' ? 'user' : 'assistant', content: m.t }));
    while (recent.length && recent[0].role !== 'user') recent.shift();
    const msgs = [...recent.filter((m) => m.content && m.content.trim()), { role: 'user', content: q }]; while (msgs.length > 1 && msgs[0].role !== 'user') msgs.shift(); msgs[0] = { role: 'user', content: rules + '\n\n---\nQuestion : ' + msgs[0].content };
    ctl = new AbortController();
    const opts = { modelTier: deep ? 'complex' : 'quick', cache: false, signal: ctl.signal, onText: ({ text }) => { out.textContent = visible(text); $('#mztLog').scrollTop = 1e9; } };
    if (img) opts.images = [img];
    try {
      const r = await sample(msgs, opts);
      const mm = r.text.match(/M[ÉE]MO\s*:\s*(.+)\s*$/i);
      cur.msgs.push({ r: 'a', t: visible(r.text) + (r.truncated ? '\n\n(Réponse coupée : pose une question plus ciblée.)' : ''), d: !!deep });
      if (mm && !/^\s*rien/i.test(mm[1])) { ST.memos.push({ date: today(), text: mm[1].trim().slice(0, 160) }); if (ST.memos.length > 30) ST.memos.shift(); saveMemos(); }
      await saveThread(cur);
    } catch (e) {
      const kept = e && e.text ? visible(e.text) : '';
      if (e && e.code === 'cancelled') { if (kept) cur.msgs.push({ r: 'a', t: kept + '\n(Arrêté.)' }); else cur.msgs.pop(); }
      else { cur.msgs.pop(); out.textContent = (kept ? kept + '\n\n' : '') + (ERR[e && e.code] || 'Le tuteur n\'a pas pu répondre. Réessaie dans un instant.'); }
      if (!cur.msgs.length) ST.threads = ST.threads.filter((t) => t !== cur);
      saveLocal();
      if (!(e && e.code === 'cancelled')) { busy = false; $('#mztSend').disabled = false; $('#mztStop').hidden = true; img = null; $('#mztImgN').textContent = ''; return; }
    }
    busy = false; $('#mztSend').disabled = false; $('#mztStop').hidden = true; img = null; $('#mztImg').value = ''; $('#mztImgN').textContent = ''; renderLog();
  }

  // ---------- événements ----------
  $('#mztBtn').onclick = () => openPanel(null);
  $('#mztX').onclick = closePanel;
  $('#mztTabH').onclick = () => view($('#mztHist').hidden ? 'hist' : 'chat');
  $('#mztTabM').onclick = () => view($('#mztMem').hidden ? 'mem' : 'chat');
  $('#mztQ').oninput = renderList;
  $('#mztList').onclick = (e) => { const id = e.target.dataset && e.target.dataset.cont; if (!id) return; cur = ST.threads.find((t) => t.id === id); view('chat'); $('#mztCtx').textContent = '· ' + cur.sec; renderLog(); };
  $('#mztMemL').onclick = (e) => { const i = e.target.dataset && e.target.dataset.memdel; if (i == null) return; ST.memos.splice(+i, 1); saveMemos(); renderMem(); };
  $('#mztChips').onclick = (e) => { const b = e.target.closest('[data-chip]'); if (!b) return; const t = $('#mztIn'); t.value = b.dataset.chip + (t.value ? ' : ' + t.value : ''); t.focus(); };
  $('#mztNew').onclick = () => { cur = null; renderLog(); };
  $('#mztStop').onclick = () => { if (ctl) ctl.abort(); };
  $('#mztImg').onchange = (e) => { img = e.target.files[0] || null; $('#mztImgN').textContent = img ? 'Photo : ' + img.name : ''; };
  $('#mztF').onsubmit = (e) => { e.preventDefault(); const v = $('#mztIn').value; $('#mztIn').value = ''; ask(v); };
  $('#mztIn').addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#mztF').requestSubmit(); } });

  // ---------- capacités (facultatives) ----------
  const W = window.claude;
  if (W && W.use) {
    W.use('sample').then((s) => { sample = s; ready = true; note();
      if (s && s.limits) s.limits().then((l) => { if (l && l.images) { imgOK = true; $('#mztImgL').hidden = false; if (l.images.mediaTypes) $('#mztImg').accept = l.images.mediaTypes.join(','); } }).catch(() => {});
    }).catch(() => { ready = true; note(); });
    Promise.all([W.use('db'), W.use('user')]).then(async ([d, u]) => {
      if (!d || !u) return; const id = await u.id(); if (!id) return; db = d; base = 'data/users/' + id + '/mzt_' + C.id;
      try {
        const m = await db.doc(base).get(); if (m.exists) { const v = m.data() || {}; if (Array.isArray(v.memos)) ST.memos = JSON.parse(JSON.stringify(v.memos)); }
        const q = await db.collection(base + '/threads').get(); const remote = q.docs.map((x) => Object.assign({ id: x.id }, JSON.parse(JSON.stringify(x.data() || {}))));
        const map = {}; [...ST.threads, ...remote].forEach((t) => { if (!map[t.id] || (t.msgs || []).length > (map[t.id].msgs || []).length) map[t.id] = t; });
        ST.threads = Object.values(map).sort((a, b) => parseInt(a.id.slice(1), 36) - parseInt(b.id.slice(1), 36)); saveLocal();
      } catch (e) {}
    }).catch(() => {});
  } else { ready = true; note(); }

  window.MZT = { open: openPanel, close: closePanel };
})();

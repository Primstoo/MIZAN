/* ToumaiLearn · pont entre un module (page HTML autonome) et la plateforme.
   Chargé en tout premier dans chaque module. Hors de Claude, il fournit
   window.claude.use(...) avec la même interface que les artifacts Claude :
   - "sample" : le tuteur, appelé via /api/tutor (clé IA côté serveur, quota par élève) ;
   - "db" et "user" : renvoient null. La progression des modules est stockée dans
     le navigateur puis synchronisée vers Supabase par la page parente (ModuleFrame).
   Dans Claude, window.claude existe déjà : ce script ne fait rien. */
(function () {
  if (window.claude && typeof window.claude.use === "function") return;

  const LIMITS = {
    maxPromptBytes: 262144,
    images: { maxCount: 1, maxInputBytes: 5 * 1024 * 1024, mediaTypes: ["image/jpeg", "image/png", "image/webp"] },
  };

  function fail(code, message, text) {
    const e = { code: code, message: message || code };
    if (text) e.text = text;
    return e;
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      const r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(",")[1] || ""); };
      r.onerror = function () { reject(fail("image_rejected", "Lecture de l'image impossible")); };
      r.readAsDataURL(blob);
    });
  }

  // Les modules affichent la réponse en texte brut : on retire la mise en forme Markdown
  // (**gras**, # titres, `code`) que les modèles ajoutent parfois, et les puces « * » deviennent « • ».
  function brut(t) {
    return t
      .replace(/\*\*([^*\n]+)\*\*/g, "$1").replace(/__([^_\n]+)__/g, "$1")
      .replace(/^#{1,6}\s+/gm, "").replace(/^(\s*)[*-]\s+/gm, "$1• ")
      .replace(/`{3}[a-z]*\n?/gi, "").replace(/`([^`\n]+)`/g, "$1")
      .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, "$1$2")
      .replace(/\*\*/g, "");
  }

  async function sample(input, opts) {
    opts = opts || {};
    if (typeof input === "string") input = [{ role: "user", content: input }];
    if (!Array.isArray(input) || !input.length) throw fail("invalid_request", "Entrée vide");
    let images = [];
    if (opts.images) {
      const list = opts.images instanceof Blob ? [opts.images] : Array.from(opts.images);
      if (list.length > LIMITS.images.maxCount) throw fail("image_rejected", "Une seule photo par question");
      for (const b of list) {
        if (b.size > LIMITS.images.maxInputBytes) throw fail("image_rejected", "Photo trop lourde (5 Mo max)");
        images.push({ mime: b.type || "image/jpeg", data: await blobToBase64(b) });
      }
    }
    let res;
    try {
      res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: input, tier: opts.modelTier || "default", images: images }),
        signal: opts.signal,
      });
    } catch (e) {
      if (opts.signal && opts.signal.aborted) throw fail("cancelled", "Arrêté");
      throw fail("upstream_error", "Connexion impossible au tuteur");
    }
    if (!res.ok) {
      let body = {};
      try { body = await res.json(); } catch (e) {}
      throw fail(body.code || "upstream_error", body.message || "Erreur " + res.status);
    }
    // Réponse en continu : une ligne JSON par morceau de texte.
    const rd = res.body.getReader(), dec = new TextDecoder();
    let buf = "", text = "", fin = {};
    for (;;) {
      let r;
      try { r = await rd.read(); } catch (e) { if (opts.signal && opts.signal.aborted) throw fail("cancelled", "Arrêté"); throw fail("upstream_error", "Connexion coupée"); }
      if (r.done) break;
      buf += dec.decode(r.value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const l = buf.slice(0, i); buf = buf.slice(i + 1);
        if (!l.trim()) continue;
        let o; try { o = JSON.parse(l); } catch (e) { continue; }
        if (o.erreur) throw fail(o.erreur, o.message);
        if (o.d) { text += o.d; if (typeof opts.onText === "function") { try { opts.onText({ text: brut(text), delta: o.d }); } catch (e) {} } }
        if (o.fin) fin = o;
      }
    }
    if (!text.trim()) throw fail("empty_completion", "Réponse vide");
    const body = fin;
    return { text: brut(text), truncated: !!body.truncated, modelTierApplied: opts.modelTier || "default" };
  }
  sample.limits = async function () { return LIMITS; };
  sample.json = async function (input, opts) {
    const r = await sample(input, opts);
    const t = r.text.trim();
    const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
    const raw = fence ? fence[1] : t.slice(Math.max(0, Math.min(...["{", "["].map(function (c) { const i = t.indexOf(c); return i < 0 ? Infinity : i; }))));
    try { return JSON.parse(raw); } catch (e) { throw fail("invalid_json", "Réponse non JSON", t); }
  };

  window.claude = {
    use: function (name) {
      if (name === "sample") return Promise.resolve(sample);
      return Promise.resolve(null);
    },
  };
})();

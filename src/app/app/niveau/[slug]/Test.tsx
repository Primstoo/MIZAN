"use client";
import { useEffect, useRef, useState } from "react";
import { enregistrerNiveau } from "../../actions";

type Q = { n: string; q: string; o: string[]; a: number; e: string };
type Win = Window & { renderMathInElement?: (el: Element, o: object) => void };

// Formules (module Probas) : rendu KaTeX chargé à la demande.
function useMaths(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !/\$/.test(el.textContent || "")) return;
    const rendre = () => (window as Win).renderMathInElement?.(el, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }], throwOnError: false });
    if ((window as Win).renderMathInElement) return rendre();
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"; document.head.appendChild(css);
    const s1 = document.createElement("script"); s1.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    s1.onload = () => { const s2 = document.createElement("script"); s2.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"; s2.onload = rendre; document.head.appendChild(s2); };
    document.head.appendChild(s1);
  }, [dep]);
  return ref;
}

export default function Test({ slug, titre, questions, premier }: { slug: string; titre: string; questions: Q[]; premier: boolean }) {
  const [i, setI] = useState(-1); // -1 = écran d'accueil
  const [choix, setChoix] = useState<number | null>(null);
  const [rep, setRep] = useState<{ n: string; ok: boolean }[]>([]);
  const [envoi, setEnvoi] = useState(false);
  const fini = i >= questions.length;
  const ref = useMaths(`${i}-${choix}`);
  const q = questions[i];
  const bons = rep.filter((r) => r.ok).length;

  async function suivant() {
    const r = [...rep, { n: q.n, ok: choix === q.a }];
    setRep(r); setChoix(null);
    if (i + 1 >= questions.length) { setEnvoi(true); await enregistrerNiveau(slug, r); setEnvoi(false); }
    setI(i + 1);
  }

  return (
    <main className="page narrow-m test" ref={ref}>
      <p className="eyebrow">Test de niveau · {titre}</p>
      {i === -1 && (
        <>
          <h1>Où en es-tu ?</h1>
          <p className="muted">{questions.length} questions, environ 3 minutes, sur les notions les plus importantes du module. Réponds sans regarder le cours : le but est de repérer tes points faibles, pas d&apos;avoir 20.</p>
          <div className="row">
            <button className="btn" onClick={() => setI(0)}>Commencer</button>
            <a className="btn alt" href="/app">{premier ? "Plus tard" : "Annuler"}</a>
          </div>
        </>
      )}
      {q && (
        <>
          <div className="bar"><i style={{ width: `${(i / questions.length) * 100}%` }} /></div>
          <p className="small muted">Question {i + 1} sur {questions.length}</p>
          <h2 className="tq">{q.q}</h2>
          <div className="stack">
            {q.o.map((o, j) => {
              const etat = choix === null ? "" : j === q.a ? "bon" : j === choix ? "faux" : "";
              return <button key={j} className={`opt big-opt ${etat}`} disabled={choix !== null} onClick={() => setChoix(j)}>{o}</button>;
            })}
          </div>
          {choix !== null && (
            <>
              <p className={`alert ${choix === q.a ? "ok" : "bad"}`}>{choix === q.a ? "Juste. " : "Pas tout à fait. "}{q.e}</p>
              <button className="btn" onClick={suivant} disabled={envoi}>{i + 1 >= questions.length ? "Voir mon résultat" : "Question suivante"}</button>
            </>
          )}
        </>
      )}
      {fini && (
        <>
          <h1>{bons} / {questions.length}</h1>
          <p className="muted">{bons >= questions.length * 0.8 ? "Très bonne base. Ta mission du jour va viser les notions qui restent." : bons >= questions.length * 0.5 ? "Une base correcte, avec des trous. Ta mission du jour commence par eux." : "Normal en début de révision. Ta mission du jour va reprendre ces notions une par une."}</p>
          {rep.some((r) => !r.ok) && <p className="small">Les notions ratées sont ajoutées à « À retravailler ».</p>}
          <div className="row">
            <a className="btn" href="/app">Voir ma mission du jour</a>
            <a className="btn alt" href="/app/progres">Ma progression</a>
          </div>
        </>
      )}
    </main>
  );
}

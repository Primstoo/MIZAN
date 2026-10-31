"use client";
import { useEffect, useRef, useState } from "react";
import { enregistrerBlanc } from "../../actions";

type Q = { id: number; n: string; q: string; o: string[]; a: number; e: string };
type Win = Window & { renderMathInElement?: (el: Element, o: object) => void };

function maths(el: HTMLElement | null) {
  if (!el || !/\$/.test(el.textContent || "")) return;
  const r = () => (window as Win).renderMathInElement?.(el, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
  if ((window as Win).renderMathInElement) return r();
  const c = document.createElement("link"); c.rel = "stylesheet"; c.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"; document.head.appendChild(c);
  const a = document.createElement("script"); a.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
  a.onload = () => { const b = document.createElement("script"); b.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"; b.onload = r; document.head.appendChild(b); };
  document.head.appendChild(a);
}

// Examen blanc chronométré : pas de correction pendant l'épreuve, note sur 20 et corrigé à la fin.
export default function Blanc({ slug, titre, questions, minutes }: { slug: string; titre: string; questions: Q[]; minutes: number }) {
  const [phase, setPhase] = useState<"accueil" | "epreuve" | "fin">("accueil");
  const [rep, setRep] = useState<(number | null)[]>(() => questions.map(() => null));
  const [i, setI] = useState(0);
  const [reste, setReste] = useState(minutes * 60);
  const debut = useRef(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { maths(ref.current); }, [phase, i]);
  useEffect(() => {
    if (phase !== "epreuve") return;
    const t = setInterval(() => setReste((r) => { if (r <= 1) { clearInterval(t); terminer(); return 0; } return r - 1; }), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  useEffect(() => {
    if (phase !== "epreuve") return;
    const avertir = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", avertir);
    return () => window.removeEventListener("beforeunload", avertir);
  }, [phase]);

  const repRef = useRef(rep); repRef.current = rep;
  const rendue = useRef(false);
  async function terminer() {
    if (rendue.current) return; // chrono et bouton au même instant : une seule copie
    rendue.current = true;
    setPhase("fin");
    await enregistrerBlanc(slug, questions.map((q, k) => ({ id: q.id, c: repRef.current[k] })), (Date.now() - debut.current) / 1000);
  }

  const bons = questions.filter((q, k) => rep[k] === q.a).length;
  const note = Math.round((bons / questions.length) * 200) / 10;
  const mm = String(Math.floor(reste / 60)).padStart(2, "0"), ss = String(reste % 60).padStart(2, "0");
  const q = questions[i];
  const repondues = rep.filter((x) => x !== null).length;

  return (
    <main className="page narrow-m test" ref={ref}>
      <p className="eyebrow">Examen blanc · {titre}</p>
      {phase === "accueil" && (
        <>
          <h1>Conditions réelles</h1>
          <p className="muted">{questions.length} questions tirées au hasard, {minutes} minutes. Pas de correction pendant l&apos;épreuve : tu vois ta note sur 20 et le corrigé à la fin. Les notions ratées remontent dans « À retravailler ».</p>
          <div className="row"><button className="btn" onClick={() => { debut.current = Date.now(); setPhase("epreuve"); }}>Commencer le chrono</button><a className="btn alt" href="/app/progres">Annuler</a></div>
        </>
      )}
      {phase === "epreuve" && q && (
        <>
          <div className="row between"><span className={`timer ${reste < 120 ? "bad" : ""}`}>{mm}:{ss}</span><span className="small muted">{repondues}/{questions.length} répondues</span></div>
          <div className="qn">{questions.map((_, k) => <button key={k} className={`${k === i ? "cur" : ""} ${rep[k] !== null ? "ok" : ""}`} onClick={() => setI(k)}>{k + 1}</button>)}</div>
          <h2 className="tq">{q.q}</h2>
          <div className="stack">
            {q.o.map((o, j) => <button key={j} className={`opt big-opt ${rep[i] === j ? "sel" : ""}`} onClick={() => setRep(rep.map((x, k) => (k === i ? j : x)))}>{o}</button>)}
          </div>
          <div className="row between">
            <button className="btn alt" disabled={i === 0} onClick={() => setI(i - 1)}>Précédente</button>
            {i < questions.length - 1
              ? <button className="btn" onClick={() => setI(i + 1)}>Suivante</button>
              : <button className="btn" onClick={() => { if (repondues < questions.length && !confirm(`${questions.length - repondues} question(s) sans réponse. Rendre la copie ?`)) return; terminer(); }}>Rendre ma copie</button>}
          </div>
        </>
      )}
      {phase === "fin" && (
        <>
          <h1>{String(note).replace(".", ",")} / 20</h1>
          <p className="muted">{bons} bonne{bons > 1 ? "s" : ""} réponse{bons > 1 ? "s" : ""} sur {questions.length}. Attention : ce sont des QCM ; l&apos;examen réel demande aussi de rédiger. Utilise cette note comme un thermomètre, pas comme une prédiction exacte.</p>
          <div className="row"><a className="btn" href="/app/progres">Voir mes points faibles</a><a className="btn alt" href={`/app/m/${slug}`}>Ouvrir le module</a></div>
          <h2>Corrigé</h2>
          <ol className="corrige">
            {questions.map((x, k) => (
              <li key={k} className={rep[k] === x.a ? "bon" : "faux"}>
                <p><strong>{x.q}</strong></p>
                <p className="small">Ta réponse : {rep[k] === null ? "aucune" : x.o[rep[k]!]} {rep[k] === x.a ? "✓" : `✗ · bonne réponse : ${x.o[x.a]}`}</p>
                {x.e && <p className="small muted">{x.e}</p>}
              </li>
            ))}
          </ol>
        </>
      )}
    </main>
  );
}

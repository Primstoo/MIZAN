"use client";
import { useState } from "react";
import type { Contenu } from "@/lib/fac-commun";

// Fiche, quiz et flashcards d'un cours importé. Score du quiz gardé dans le navigateur.
export default function Lecteur({ c, id }: { c: Contenu; id: string }) {
  const [onglet, setOnglet] = useState<"fiche" | "quiz" | "cartes">("fiche");
  return (
    <>
      <nav className="sems bloc" aria-label="Sections">
        {([["fiche", "Fiche"], ["quiz", `Quiz (${c.qcm.length})`], ["cartes", `Flashcards (${c.cartes.length})`]] as const).map(([k, l]) => (
          <a key={k} href={`#${k}`} className={onglet === k ? "on" : ""} onClick={(e) => { e.preventDefault(); setOnglet(k); }}>{l}</a>
        ))}
      </nav>
      {onglet === "fiche" && <Fiche c={c} />}
      {onglet === "quiz" && <Quiz c={c} id={id} />}
      {onglet === "cartes" && <Cartes c={c} />}
    </>
  );
}

function Fiche({ c }: { c: Contenu }) {
  return (
    <div className="stack">
      {c.resume && <div className="card soft"><p>{c.resume}</p></div>}
      {c.sections.map((s, i) => (
        <section key={i} className="card">
          <h3>{i + 1}. {s.titre}</h3>
          <p style={{ whiteSpace: "pre-line" }}>{s.texte}</p>
          {s.points?.length > 0 && <ul className="small">{s.points.map((p, j) => <li key={j}>{p}</li>)}</ul>}
        </section>
      ))}
    </div>
  );
}

function Quiz({ c, id }: { c: Contenu; id: string }) {
  const [rep, setRep] = useState<Record<number, number>>({});
  const faites = Object.keys(rep).length;
  const bonnes = Object.entries(rep).filter(([i, r]) => c.qcm[+i].bonne === r).length;
  function choisir(i: number, o: number) {
    if (rep[i] !== undefined) return;
    const n = { ...rep, [i]: o };
    setRep(n);
    if (Object.keys(n).length === c.qcm.length) {
      try { localStorage.setItem(`tl-cours-${id}`, JSON.stringify({ score: Object.entries(n).filter(([k, r]) => c.qcm[+k].bonne === r).length, sur: c.qcm.length, le: Date.now() })); } catch {}
    }
  }
  return (
    <div className="stack">
      {c.qcm.map((q, i) => (
        <div key={i} className="card">
          <p><strong>{i + 1}. {q.q}</strong></p>
          {q.options.map((o, j) => {
            const fait = rep[i] !== undefined;
            const cls = fait && j === q.bonne ? "ok" : fait && j === rep[i] ? "ko" : "";
            return <button key={j} type="button" className={`qcm-o ${cls}`} onClick={() => choisir(i, j)} disabled={fait}>{o}</button>;
          })}
          {rep[i] !== undefined && <p className="small muted">{rep[i] === q.bonne ? "✓ " : "✗ "}{q.explication}</p>}
        </div>
      ))}
      {faites > 0 && (
        <div className="card soft row between">
          <span>Score : <strong>{bonnes} / {faites}</strong>{faites < c.qcm.length ? ` (${c.qcm.length - faites} restantes)` : ""}</span>
          <button className="btn alt small" onClick={() => setRep({})}>Recommencer</button>
        </div>
      )}
    </div>
  );
}

function Cartes({ c }: { c: Contenu }) {
  const [i, setI] = useState(0);
  const [vue, setVue] = useState(false);
  const [aRevoir, setARevoir] = useState<number[]>([]);
  if (!c.cartes.length) return <p className="muted">Pas de flashcards pour ce document.</p>;
  const k = i % c.cartes.length;
  const suivante = (ok: boolean) => { if (!ok) setARevoir((a) => Array.from(new Set([...a, k]))); else setARevoir((a) => a.filter((x) => x !== k)); setVue(false); setI(i + 1); };
  return (
    <div className="stack">
      <p className="small muted">Carte {k + 1} / {c.cartes.length}{aRevoir.length ? ` · ${aRevoir.length} à revoir` : ""}</p>
      <button type="button" className="card carte" onClick={() => setVue(!vue)} aria-live="polite">
        {vue ? <span>{c.cartes[k].r}</span> : <strong>{c.cartes[k].q}</strong>}
        {!vue && <span className="small muted">Touche pour voir la réponse</span>}
      </button>
      {vue && (
        <div className="row" style={{ gap: 8 }}>
          <button className="btn alt" style={{ flex: 1 }} onClick={() => suivante(false)}>À revoir</button>
          <button className="btn" style={{ flex: 1 }} onClick={() => suivante(true)}>Je savais</button>
        </div>
      )}
    </div>
  );
}

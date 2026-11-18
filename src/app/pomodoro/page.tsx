"use client";
import { useEffect, useState } from "react";

// Minuteur Pomodoro : 25 min de travail, 5 de pause (ou ?min=10 pour une petite séance).
export default function Pomodoro() {
  const [travail, setTravail] = useState(25);
  const [pause, setPause] = useState(false);
  const [reste, setReste] = useState(25 * 60);
  const [marche, setMarche] = useState(false);
  useEffect(() => {
    const m = Number(new URLSearchParams(location.search).get("min"));
    if (m >= 1 && m <= 60) { setTravail(m); setReste(m * 60); }
  }, []);
  useEffect(() => {
    if (!marche) return;
    const t = setInterval(() => setReste((r) => {
      if (r > 1) return r - 1;
      try { navigator.vibrate?.(400); } catch { /* sans vibreur */ }
      setPause((p) => !p);
      return pause ? travail * 60 : 5 * 60;
    }), 1000);
    return () => clearInterval(t);
  }, [marche, pause, travail]);
  const mm = String(Math.floor(reste / 60)).padStart(2, "0"), ss = String(reste % 60).padStart(2, "0");
  return (
    <main className="page narrow pomo">
      <a href="/app" className="linkbtn">‹ Retour</a>
      <p className="tm-etq">{pause ? "Pause" : "Concentration"}</p>
      <p className="pomo-t" role="timer" aria-live="off">{mm}:{ss}</p>
      <p className="muted">{pause ? "Lève-toi, bois un verre d'eau." : "Téléphone retourné, une seule tâche."}</p>
      <div className="row" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={() => setMarche(!marche)}>{marche ? "Pause" : "Démarrer"}</button>
        <button className="btn alt" onClick={() => { setMarche(false); setPause(false); setReste(travail * 60); }}>Recommencer</button>
      </div>
    </main>
  );
}

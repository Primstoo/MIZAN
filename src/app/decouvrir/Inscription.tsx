"use client";
import { useEffect, useState } from "react";

type Raison = "tuteur" | "test" | "blanc" | "sauvegarde";
const TEXTES: Record<Raison, [string, string]> = {
  tuteur: ["Le tuteur est réservé aux inscrits", "Pose tes questions sur la section que tu lis, envoie une photo de ton brouillon : il connaît le module."],
  test: ["Le test de niveau demande un compte", "En 3 minutes, il repère tes points faibles et construit ta première mission du jour."],
  blanc: ["L'examen blanc demande un compte", "15 questions chronométrées, une note sur 20 et un corrigé détaillé."],
  sauvegarde: ["Garde ta progression", "Avec un compte, ta progression est sauvegardée sur ton téléphone et ton ordinateur."],
};

// Mode visiteur : fenêtre qui bloque une fonction réservée aux inscrits et propose de créer un compte.
// S'ouvre depuis les boutons de la barre, ou depuis le module (message « mz-inscription » envoyé par l'iframe).
export default function Inscription() {
  const [raison, setRaison] = useState<Raison | null>(null);
  useEffect(() => {
    const ecoute = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data?.type === "mz-inscription") setRaison((e.data.raison as Raison) || "tuteur");
    };
    window.addEventListener("message", ecoute);
    return () => window.removeEventListener("message", ecoute);
  }, []);
  useEffect(() => {
    if (!raison) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setRaison(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [raison]);

  return (
    <>
      <div className="row" style={{ gap: 8 }}>
        <button type="button" className="btn small alt" onClick={() => setRaison("tuteur")}>Tuteur IA</button>
        <button type="button" className="btn small alt" onClick={() => setRaison("test")}>Test de niveau</button>
        <button type="button" className="btn small" onClick={() => setRaison("sauvegarde")}>Créer mon compte</button>
      </div>
      {raison && (
        <div role="dialog" aria-modal="true" aria-labelledby="mz-insc-t" onClick={() => setRaison(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.55)", display: "grid", placeItems: "center", padding: 16 }}>
          <div className="card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, width: "100%", background: "var(--bg, #fff)" }}>
            <h2 id="mz-insc-t">{TEXTES[raison][0]}</h2>
            <p className="muted">{TEXTES[raison][1]}</p>
            <p className="muted small">La création du compte est gratuite. Pendant la bêta, il faut le code d&apos;invitation d&apos;un étudiant déjà inscrit.</p>
            <div className="stack">
              <a href="/login?invitation" className="btn big" target="_top">Créer mon compte</a>
              <a href="/login" className="btn alt" target="_top">J&apos;ai déjà un compte</a>
              <button type="button" className="link small" onClick={() => setRaison(null)}>Continuer sans compte</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

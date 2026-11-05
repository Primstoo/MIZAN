"use client";
// Écran affiché si une page plante : message clair et bouton pour réessayer.
export default function Erreur({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="err-page">
      <a href="/" className="logo">ToumaiLearn</a>
      <h1>Un souci est survenu</h1>
      <p className="muted">La page n&apos;a pas pu se charger. Vérifie ta connexion, puis réessaie.</p>
      <div className="row">
        <button className="btn" onClick={() => reset()}>Réessayer</button>
        <a href="/app" className="btn alt">Revenir à mon espace</a>
      </div>
    </main>
  );
}

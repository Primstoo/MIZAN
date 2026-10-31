export default function Introuvable() {
  return (
    <main className="err-page">
      <a href="/" className="logo">MIZAN</a>
      <h1>Page introuvable</h1>
      <p className="muted">Ce lien ne mène nulle part. Il a peut-être été mal copié.</p>
      <a href="/app" className="btn">Revenir à mon espace</a>
    </main>
  );
}

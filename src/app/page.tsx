import { MODULES } from "@/lib/modules";

export default function Accueil() {
  return (
    <main className="page">
      <header className="top">
        <span className="logo">MIZAN</span>
        <a href="/login" className="btn small">Se connecter</a>
      </header>
      <section className="hero">
        <h1>Réviser le cours de <em>ton</em> prof, pas un cours générique.</h1>
        <p className="lead">Leçons qui partent de zéro, exercices corrigés, évaluations qui montrent tes failles, et un tuteur qui connaît ton module. Pensé pour les étudiants de la FSABM.</p>
        <a href="/login" className="btn">Commencer gratuitement</a>
      </section>
      <h2>Modules disponibles</h2>
      <ul className="list">
        {MODULES.map((m) => (
          <li key={m.slug}><strong>{m.titre}</strong> <span className="muted">· {m.semestre}</span></li>
        ))}
      </ul>
    </main>
  );
}

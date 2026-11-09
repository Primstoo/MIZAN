import { MODULES } from "@/lib/modules";

export const metadata = {
  title: "Essayer sans compte",
  description: "Ouvre les modules de révision ToumaiLearn sans créer de compte : cours expliqués, exercices et quiz.",
  alternates: { canonical: "/decouvrir" },
};

// Mode visiteur : modules consultables sans compte, sans sauvegarde côté serveur ni tuteur.
export default function Decouvrir() {
  return (
    <main className="land">
      <header className="page top nob">
        <a href="/" className="logo">ToumaiLearn</a>
        <a href="/login" className="btn small">Créer mon compte</a>
      </header>
      <section className="page">
        <p className="eyebrow">Mode visiteur</p>
        <h1>Essaie les modules, sans compte</h1>
        <div className="grid" style={{ marginTop: 16 }}>
          {MODULES.map((m) => (
            <a key={m.slug} href={`/decouvrir/${m.slug}`} className="card">
              <span className="muted small">{m.semestre}{m.prof ? ` · ${m.prof}` : ""}</span>
              <h3>{m.titre}</h3>
              <p className="muted small">{m.resume}</p>
            </a>
          ))}
        </div>
      </section>
      <section className="page steps">
        <h2>Avec un compte, en plus</h2>
        <ol>
          <li><strong>Ta progression sauvegardée</strong>, sur téléphone et ordinateur.</li>
          <li><strong>Une mission chaque jour</strong>, calculée sur ta date d&apos;examen et tes points faibles.</li>
          <li><strong>Un tuteur IA</strong> sur chaque page du cours.</li>
        </ol>
        <p className="row" style={{ gap: 8 }}><a href="/login" className="btn big-inline">Créer mon compte</a><a href="/login?invitation" className="btn alt big-inline">J&apos;ai un code d&apos;invitation</a></p>
      </section>
    </main>
  );
}

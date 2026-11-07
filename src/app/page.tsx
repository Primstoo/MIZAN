// Page publique : présente ToumaiLearn sans dévoiler le catalogue (réservé aux membres).
export default function Accueil() {
  return (
    <main className="land">
      <header className="page top nob">
        <span className="logo">ToumaiLearn</span>
        <a href="/login" className="btn small">Se connecter</a>
      </header>

      <section className="page hero">
        <p className="eyebrow">Bêta privée · FSABM, Béni Mellal</p>
        <h1>Révise le cours de <em>ton</em> prof, pas un cours générique.</h1>
        <p className="lead">Chaque module est construit à partir des supports réels de ton enseignant : ses notations, ses exemples, le format de ses TD et de ses examens.</p>
        <div className="cta">
          <a href="/login?invitation" className="btn big-inline">J&apos;ai un code d&apos;invitation</a>
          <span className="muted small">Accès sur invitation d&apos;un étudiant déjà inscrit.</span>
        </div>
      </section>

      <section className="page">
        <div className="feats">
          <article><span className="num">01</span><h3>Le cours, expliqué</h3><p>Chaque notion part de zéro : intuition, schéma, exemple résolu, pièges fréquents.</p></article>
          <article><span className="num">02</span><h3>S&apos;entraîner au vrai format</h3><p>Exercices générés à volonté et corrigés, TD inédits dans le style du prof, examens blancs notés sur 20.</p></article>
          <article><span className="num">03</span><h3>Un tuteur sur chaque page</h3><p>Pose ta question sur la section que tu lis, envoie une photo de ton brouillon : il connaît le module.</p></article>
          <article><span className="num">04</span><h3>Ta progression, mesurée</h3><p>Notions maîtrisées, erreurs récurrentes, note prévue. Synchronisé entre ton téléphone et ton ordinateur.</p></article>
        </div>
      </section>

      <section className="page steps">
        <h2>Comment ça marche</h2>
        <ol>
          <li><strong>Reçois un code</strong> d&apos;un camarade déjà membre.</li>
          <li><strong>Connecte-toi</strong> avec ton e-mail : pas de mot de passe.</li>
          <li><strong>Choisis tes modules</strong> et commence là où tu es le plus faible.</li>
        </ol>
      </section>

      <footer className="page foot muted small">ToumaiLearn · conçu à Béni Mellal par un étudiant de la FSABM</footer>
    </main>
  );
}

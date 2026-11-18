import Mascotte from "@/components/Mascotte";

// Entrée unique : présentation courte, puis créer un compte, se connecter ou découvrir sans compte.
export default function Accueil() {
  return (
    <main className="cx">
      <aside className="cx-marque">
        <span className="logo cx-logo">ToumaiLearn</span>
        <p className="cx-devise">Le cours de ton professeur, expliqué et corrigé.</p>
        <span className="cx-mascotte" aria-hidden="true"><Mascotte id="toumai" taille={64} decor /></span>
      </aside>
      <section className="cx-zone">
        <div className="cx-carte">
          <h1>Bienvenue</h1>
          <p className="cx-sous">Cours expliqués, exercices corrigés et un tuteur, à partir des supports de ton professeur.</p>
          <div className="cx-form">
            <a href="/login?mode=inscription" className="btn big">Créer un compte</a>
            <a href="/login?mode=connexion" className="cx-google">J&apos;ai déjà un compte</a>
          </div>
          <a href="/visiteur" className="cx-decouvrir">Découvrir sans compte</a>
          <p className="cx-legal"><a href="/confidentialite">Politique de confidentialité</a></p>
        </div>
      </section>
    </main>
  );
}

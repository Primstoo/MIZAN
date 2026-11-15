export const metadata = {
  title: "Confidentialité",
  description: "Quelles données ToumaiLearn garde, pourquoi, et comment les faire supprimer.",
  alternates: { canonical: "/confidentialite" },
};

// Page d'information : ce que l'appli collecte réellement (voir supabase/schema.sql) et à qui c'est transmis.
// À faire relire avant le lancement payant (loi marocaine 09-08, CNDP).
export default function Confidentialite() {
  return (
    <main className="land">
      <header className="page top nob">
        <a href="/" className="logo">ToumaiLearn</a>
        <a href="/login" className="btn small">Se connecter</a>
      </header>
      <section className="page narrow-m">
        <p className="eyebrow">Confidentialité</p>
        <h1>Tes données, en clair</h1>
        <p className="muted small">Dernière mise à jour : 10 novembre 2026</p>

        <h2>Sans compte</h2>
        <p>Tu peux lire les modules sans compte. Ta progression reste alors dans ton navigateur : rien n&apos;est envoyé chez nous.</p>

        <h2>Avec un compte, ce qu&apos;on garde</h2>
        <ul>
          <li><strong>Ton adresse e-mail</strong>, pour te connecter (aucun mot de passe n&apos;est stocké).</li>
          <li><strong>Ton profil</strong> : prénom, établissement, ville, filière, semestre, temps de révision par jour.</li>
          <li><strong>Ta progression</strong> : réponses aux quiz, notions maîtrisées, dates d&apos;examen, jours de révision, notes que tu saisis.</li>
          <li><strong>Les documents que tu envoies</strong> (cours, TD, sujets). Le fichier d&apos;origine reste privé : toi et l&apos;administrateur.</li>
          <li><strong>Tes échanges avec le tuteur</strong> : l&apos;historique de tes conversations est sauvegardé avec ta progression, pour que tu le retrouves sur tes autres appareils, ainsi que le nombre de questions posées chaque jour.</li>
          <li>Si tu relies Telegram : l&apos;identifiant de ta conversation avec le bot, pour t&apos;envoyer ta mission du matin.</li>
        </ul>
        <p>Personne d&apos;autre que toi ne voit ta progression ni ton nom. Il n&apos;y a pas de classement. L&apos;administrateur y a accès pour faire fonctionner le service.</p>

        <h2>Le tuteur IA</h2>
        <p>Quand tu poses une question, ton message, l&apos;extrait du cours que tu lis et la photo que tu joins sont envoyés à un service d&apos;intelligence artificielle (Google Gemini, ou Groq en secours) pour produire la réponse. Avec l&apos;offre gratuite de ces services, ces contenus peuvent être utilisés par le fournisseur pour améliorer ses produits et relus par des personnes. <strong>N&apos;écris jamais d&apos;information personnelle dans une question</strong> (nom, numéro, CNE, adresse), et ne photographie pas de document qui en contient.</p>

        <h2>Où sont les données</h2>
        <p>La base de données est hébergée par Supabase en Irlande (Union européenne), le site par Vercel. Les e-mails de connexion partent d&apos;un service d&apos;envoi d&apos;e-mails. On ne vend aucune donnée et il n&apos;y a pas de publicité.</p>

        <h2>Documents des enseignants</h2>
        <p>Les modules sont préparés à partir de supports de cours. Si tu es enseignant et que tu souhaites le retrait ou la correction d&apos;un contenu, écris-nous : il sera retiré rapidement.</p>

        <h2>Supprimer ou récupérer tes données</h2>
        <p>Écris à <a href="mailto:toumailearn@gmail.com">toumailearn@gmail.com</a> depuis l&apos;adresse de ton compte : on supprime ton compte et tout ce qui y est rattaché, ou on t&apos;envoie une copie de tes données.</p>
      </section>
      <footer className="page foot muted small">ToumaiLearn · <a href="/">Accueil</a></footer>
    </main>
  );
}

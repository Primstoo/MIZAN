import { MODULES } from "@/lib/modules";
import Nav from "@/components/Nav";
import Embleme, { couleurCours } from "@/components/Embleme";

export const metadata = {
  title: "Essayer sans compte",
  description: "Ouvre les modules de révision ToumaiLearn sans créer de compte : cours expliqués, exercices et quiz.",
  alternates: { canonical: "/decouvrir" },
};

// Mode visiteur : modules consultables sans compte, sans sauvegarde côté serveur ni tuteur.
export default function Decouvrir() {
  return (
    <div className="shell">
      <Nav visiteur />
      <main className="page tl">
        <header className="tl-haut"><h1 className="tl-salut">Que veux-tu comprendre ?</h1><a href="/login?mode=connexion" className="tl-cnx">Se connecter</a></header>
        <div className="tl-grille">
          {MODULES.map((m) => (
            <a key={m.slug} href={`/decouvrir/${m.slug}`} className="tl-couv" style={{ borderLeftColor: couleurCours(m.slug) }}>
              <span className="tl-couv-haut"><Embleme slug={m.slug} /></span>
              <span>
                <strong>{m.titre.split(" (")[0]}</strong>
                <small>{m.chapitres ? `${m.chapitres} chapitre${m.chapitres > 1 ? "s" : ""}` : m.semestre}{m.prof ? ` · ${m.prof}` : ""}</small>
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

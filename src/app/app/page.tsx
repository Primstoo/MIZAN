import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { chargerParcours, chargerMaitrise, missionPerso } from "@/lib/parcours";
import { notePrevue } from "@/lib/maitrise";
import Installer from "./Installer";
import Notifications from "./moi/Notifications";
import Toumai from "@/components/Toumai";
import { cartesDuJour, type Carte } from "@/lib/conseils";
import { estMascotte } from "@/components/Mascotte";

// « Aujourd'hui » : la note prévue comme boussole, la séance du jour, puis ce qui coûte des points.
export const metadata = { title: "Aujourd’hui" };

export default async function Aujourdhui() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!user) return <Visiteur />;
  const [p, maitrise] = await Promise.all([chargerParcours(user!), chargerMaitrise(user!)]);
  if (!p.profil) redirect("/app/bienvenue");

  const cible = p.examens[0];
  const mc = cible ? maitrise[cible.module_slug] : undefined;
  const mission = cible ? missionPerso(p.profil.minutes_jour, cible.reste, mc, cible.module_slug) : null;
  const fait = cible ? p.faitAujourdhui.has(cible.module_slug) : false;
  const note = mc && mc.testes ? notePrevue(mc) : null;
  const appli = Array.isArray(user!.user_metadata?.appli) ? (user!.user_metadata.appli as unknown[]).filter((x): x is string => typeof x === "string") : [];
  const nf = (n: number) => String(n).replace(".", ",");
  const titre = cible ? cible.module!.titre.split(" (")[0] : "";
  const mascotte = estMascotte(p.profil.mascotte) ? p.profil.mascotte : "toumai";
  const salut = p.profil.prenom ? `Salut ${p.profil.prenom}` : "Salut";
  // Cartes de la mascotte selon la situation.
  const faible = mc?.faibles.find((f) => f.statut === "fragile") ?? mc?.faibles[0];
  const cartes: Carte[] = !cible ? cartesDuJour()
    : !note ? [{ etiquette: "Toumaï te dit", texte: "Un premier quiz de 5 minutes, et je te dis où tu en es.", action: { label: "Faire un quiz", href: `/app/m/${cible.module_slug}` } }, ...cartesDuJour()]
    : [...(faible ? [{ etiquette: "Toumaï te dit", texte: faible.statut === "fragile" ? `${faible.t} te coûte des points : ${Math.round((faible.score ?? 0) * 100)} % de réussite. On le revoit 10 minutes ?` : `${faible.t} n'est pas encore vu. On s'y met 10 minutes ?`, action: { label: "Revoir maintenant", href: `/app/module/${cible.module_slug}` } }] : []), ...(fait ? cartesDuJour() : [])];
  const duree = p.profil.minutes_jour >= 120 ? "2 h" : p.profil.minutes_jour + " min";

  return (
    <main className="page tl">
      <header className="tl-haut">
        {cible ? <a href={`/app/module/${cible.module_slug}`} className="tl-pastille">{titre} ›</a> : <h1 className="tl-salut">{salut}</h1>}
        {cible && <strong className="tl-compte">Examen {cible.estimee ? "≈ " : ""}dans {cible.reste} jour{cible.reste > 1 ? "s" : ""}</strong>}
      </header>
      <Notifications bandeau />

      {cible && (
        <section className="tl-note">
          <p className="tl-lbl">Ta note prévue si l&apos;examen était demain</p>
          {note ? (
            <>
              <div className="tl-note-ligne">
                <span className="tl-chiffre">{nf(note.note)}</span><span className="tl-sur">/ 20</span>
              </div>
            </>
          ) : (
            <p className="tl-vide">Elle s&apos;affichera après ton premier quiz.</p>
          )}
        </section>
      )}

      {cible && mission ? (
        <section className="tl-seance">
          <div className="tl-seance-haut"><span>{fait ? "Séance du jour, déjà commencée" : "Séance du jour"}</span><span>{duree}</span></div>
          <h2>{titre}</h2>
          {mission.urgent && <p className="tl-seance-info">Examen dans moins de deux semaines : place aux conditions réelles.</p>}
          <a href={`/app/m/${cible.module_slug}`} className="tl-btn sombre">{fait ? "Continuer" : "Commencer"}</a>
        </section>
      ) : (
        <>
          <Toumai cartes={cartes} mascotte={mascotte} />
          <section className="tl-seance">
            <p className="tl-seance-haut"><span>Pour commencer</span></p>
            <h2>Ajoute ta date d&apos;examen</h2>
            <p className="tl-seance-info">Je calcule ta note prévue et je prépare ta séance chaque jour.</p>
            <a href="/app/bienvenue" className="tl-btn sombre">Ajouter ma date</a>
          </section>
        </>
      )}

      {cible && <Toumai cartes={cartes} mascotte={mascotte} />}
      <Installer deja={appli} />
    </main>
  );
}

// Visiteur (« Découvrir sans compte ») : conseils de la mascotte, la note prévue comme raison de s'inscrire.
function Visiteur() {
  return (
    <main className="page tl">
      <header className="tl-haut"><h1 className="tl-salut">Bienvenue</h1><a href="/login?mode=connexion" className="tl-cnx">Se connecter</a></header>
      <Toumai cartes={cartesDuJour(true)} />
      <section className="tl-seance">
        <p className="tl-seance-haut"><span>Ta note prévue</span></p>
        <h2>Crée ton compte pour la voir</h2>
        <p className="tl-seance-info">Compte à rebours, séance du jour et points faibles, calculés pour toi.</p>
        <a href="/login?mode=inscription" className="tl-btn sombre">Créer mon compte</a>
      </section>
    </main>
  );
}

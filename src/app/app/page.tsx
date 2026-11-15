import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { chargerParcours, chargerMaitrise, missionPerso } from "@/lib/parcours";
import { notePrevue } from "@/lib/maitrise";
import Installer from "./Installer";

// « Aujourd'hui » : la note prévue comme boussole, la séance du jour, puis ce qui coûte des points.
export const metadata = { title: "Aujourd’hui" };

export default async function Aujourdhui() {
  const { data: { user } } = await createClient().auth.getUser();
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
  const duree = p.profil.minutes_jour >= 120 ? "2 h" : p.profil.minutes_jour + " min";

  return (
    <main className="page tl">
      <header className="tl-haut">
        {cible ? <a href={`/app/module/${cible.module_slug}`} className="tl-pastille">{titre} ›</a> : <span className="tl-pastille">{p.profil.prenom ? `Salut ${p.profil.prenom}` : "Salut"}</span>}
        {cible && <strong className="tl-compte">Examen {cible.estimee ? "≈ " : ""}dans {cible.reste} jour{cible.reste > 1 ? "s" : ""}</strong>}
      </header>

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
        <section className="tl-seance">
          <h2>Ajoute une date d&apos;examen</h2>
          <p className="tl-seance-info">Sans date d&apos;examen, l&apos;appli ne peut pas préparer ta séance du jour.</p>
          <a href="/app/bienvenue" className="tl-btn sombre">Choisir mes cours</a>
        </section>
      )}

      {mc && cible && mc.faibles.length > 0 && (
        <section>
          <p className="tl-lbl">Ce qui te coûte des points</p>
          <div className="tl-liste">
            {mc.faibles.slice(0, 3).map((f) => (
              <a key={f.id} href={`/app/module/${cible.module_slug}`}>
                <span>{f.t}</span>
                {f.statut === "fragile" ? <em>{Math.round((f.score ?? 0) * 100)} % de réussite</em> : <small>pas encore vu</small>}
              </a>
            ))}
          </div>
        </section>
      )}
      <Installer deja={appli} />
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";
import { chargerParcours, chargerMaitrise, missionPerso } from "@/lib/parcours";
import { notePrevue } from "@/lib/maitrise";

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
  const { data: lives } = await admin().from("live_sessions").select("id, titre, starts_at, prix_dh, places")
    .gte("starts_at", new Date().toISOString()).order("starts_at").limit(1);
  const live = lives?.[0];
  const heure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
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
                <span className="tl-note-info">fiabilité {note.fiabilite}<br />{note.couverture} % du programme testé</span>
              </div>
              <div className="tl-jauge" role="img" aria-label={`Note prévue ${nf(note.note)} sur 20, seuil de validation à 10`}>
                <i style={{ width: `${Math.min(100, note.note * 5)}%` }} /><b /><span>10, validé</span>
              </div>
            </>
          ) : (
            <p className="tl-vide">Elle s&apos;affichera après ton premier quiz. <a href={`/app/niveau/${cible.module_slug}`}>Faire le test de niveau (3 min)</a></p>
          )}
        </section>
      )}

      {cible && mission ? (
        <section className="tl-seance">
          <div className="tl-seance-haut"><span>{fait ? "Séance du jour, déjà commencée" : "Séance du jour"}</span><span>{duree}</span></div>
          <h2>{titre}</h2>
          {mission.urgent && <p className="tl-seance-info">Examen dans moins de deux semaines : place aux conditions réelles.</p>}
          <ul>{mission.etapes.slice(0, 4).map((e) => <li key={e}>{e}</li>)}</ul>
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

      <section>
        <div className="row between"><p className="tl-lbl">Ta semaine</p>{p.serie > 1 && <span className="small muted">{p.serie} jours d&apos;affilée</span>}</div>
        <div className="days">
          {p.semaine.map((j) => (
            <i key={j.d} className={j.fait ? "on" : j.aujourdhui ? "today" : ""} title={j.d}>
              {["L", "M", "M", "J", "V", "S", "D"][(new Date(j.d + "T12:00:00Z").getUTCDay() + 6) % 7]}
            </i>
          ))}
        </div>
        {p.examens.length > 1 && (
          <div className="tl-liste" style={{ marginTop: 12 }}>
            {p.examens.slice(1).map((e) => <a key={e.module_slug} href={`/app/module/${e.module_slug}`}><span>{e.module!.titre.split(" (")[0]}</span><small>{e.estimee ? "≈ " : ""}dans {e.reste} jour{e.reste > 1 ? "s" : ""}</small></a>)}
          </div>
        )}
      </section>

      {live && (
        <a href="/app/live" className="tl-ligne"><span>Séance live : {live.titre}, {heure(live.starts_at)}</span><strong>Voir</strong></a>
      )}
    </main>
  );
}

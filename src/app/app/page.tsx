import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";
import { chargerParcours, chargerMaitrise, missionPerso } from "@/lib/parcours";
import Mascotte, { estMascotte } from "@/components/Mascotte";
import Squelette, { osMaitrises } from "@/components/Squelette";

// « Aujourd'hui » : le cœur de l'appli. Mission du jour, compte à rebours, série, prochain live.
export const metadata = { title: "Aujourd’hui" };

export default async function Aujourdhui() {
  const { data: { user } } = await createClient().auth.getUser();
  const [p, maitrise] = await Promise.all([chargerParcours(user!), chargerMaitrise(user!)]);
  if (!p.profil) redirect("/app/bienvenue");

  const cible = p.examens[0];
  const mc = cible ? maitrise[cible.module_slug] : undefined;
  const mission = cible ? missionPerso(p.profil.minutes_jour, cible.reste, mc, cible.module_slug) : null;
  const fait = cible ? p.faitAujourdhui.has(cible.module_slug) : false;
  const { data: lives } = await admin().from("live_sessions").select("id, titre, starts_at, prix_dh, places")
    .gte("starts_at", new Date().toISOString()).order("starts_at").limit(1);
  const live = lives?.[0];
  const heure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

  return (
    <main className="page today">
      <header className="row between">
        <div className="salut">
          <Mascotte id={estMascotte(p.profil.mascotte) ? p.profil.mascotte : "toumai"} taille={52} />
          <div><p className="eyebrow">{p.profil.prenom ? `Salut ${p.profil.prenom}` : "Salut"}</p><h1>Aujourd&apos;hui</h1></div>
        </div>
        {p.serie > 1 && <span className="chip">{p.serie} jours de révision d&apos;affilée</span>}
      </header>

      {cible && mission ? (
        <section className="card hi">
          <p className="k">Mission du jour · {p.profil.minutes_jour >= 120 ? "2 h" : p.profil.minutes_jour + " min"}</p>
          <h2>{cible.module!.titre}</h2>
          {fait && <p className="badge-ok">✓ Tu as déjà révisé ce module aujourd&apos;hui</p>}
          {mission.urgent && <p className="small">Examen dans moins de deux semaines : place aux conditions réelles.</p>}
          {mc && <p className="small">Maîtrise du module : <strong>{mc.pct} %</strong>{mission.cibles.length ? " · la séance commence par tes points faibles" : ""}</p>}
          <ul className="tasks">
            {mission.etapes.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <a href={`/app/m/${cible.module_slug}`} className="btn inv">{fait ? "Continuer" : "Commencer"}</a>
        </section>
      ) : (
        <section className="card">
          <h2>Ajoute une date d&apos;examen</h2>
          <p className="muted small">Sans date d&apos;examen, l&apos;appli ne peut pas calculer ta mission du jour.</p>
          <a href="/app/bienvenue" className="btn">Choisir mes modules</a>
        </section>
      )}

      <div className="duo">
        {cible && (
          <section className="card">
            <div className="row between"><span className="k">Examen dans</span><span className="chip">{cible.module!.titre.split(" (")[0]}</span></div>
            <p className="big">{cible.estimee ? "≈ " : ""}{cible.reste} jour{cible.reste > 1 ? "s" : ""}</p>
            {cible.estimee && <p className="small muted">Date estimée : pas encore annoncée. <a href="/app/bienvenue">Mettre à jour</a></p>}
            <div className="days">
              {p.semaine.map((j) => (
                <i key={j.d} className={j.fait ? "on" : j.aujourdhui ? "today" : ""} title={j.d}>
                  {["L", "M", "M", "J", "V", "S", "D"][(new Date(j.d + "T12:00:00Z").getUTCDay() + 6) % 7]}
                </i>
              ))}
            </div>
            {p.examens.length > 1 && (
              <ul className="small muted list-plain">
                {p.examens.slice(1).map((e) => <li key={e.module_slug}>{e.module!.titre} : J-{e.reste}{e.estimee ? " (estimé)" : ""}</li>)}
              </ul>
            )}
          </section>
        )}
        <section className="card">
          <span className="k">Ton squelette</span>
          {mc && cible ? (
            <a href="/app/progres" className="squel" style={{ textDecoration: "none", color: "inherit" }}>
              <Squelette groupes={mc.groupes} taille={64} titre={cible.module!.titre} />
              <div>
                <p className="t">{cible.module!.titre.split(" (")[0]} · {osMaitrises(mc.groupes)} / 5 os</p>
                <p className="small muted">Chaque os s&apos;assemble quand tu maîtrises ses chapitres.</p>
              </div>
            </a>
          ) : <p className="small muted">Fais un premier quiz dans un module : ton squelette commence à s&apos;assembler.</p>}
          <a href="/app/progres" className="btn alt small">Ma progression</a>
        </section>
        <section className="card">
          <span className="k">Prochaine séance live</span>
          {live ? (
            <>
              <p className="t">{live.titre}</p>
              <p className="small muted">{heure(live.starts_at)} · {live.prix_dh} DH</p>
              <a href="/app/live" className="btn alt small">Voir et réserver</a>
            </>
          ) : <p className="small muted">Aucune séance programmée pour l&apos;instant.</p>}
        </section>
      </div>
    </main>
  );
}

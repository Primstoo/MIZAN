import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";
import { chargerParcours, missionDuJour } from "@/lib/parcours";

// « Aujourd'hui » : le cœur de l'appli. Mission du jour, compte à rebours, série, prochain live.
export default async function Aujourdhui() {
  const { data: { user } } = await createClient().auth.getUser();
  const p = await chargerParcours(user!);
  if (!p.profil) redirect("/app/bienvenue");

  const cible = p.examens[0];
  const mission = cible ? missionDuJour(p.profil.minutes_jour, cible.reste) : null;
  const fait = cible ? p.faitAujourdhui.has(cible.module_slug) : false;
  const { data: lives } = await admin().from("live_sessions").select("id, titre, starts_at, prix_dh, places")
    .gte("starts_at", new Date().toISOString()).order("starts_at").limit(1);
  const live = lives?.[0];
  const heure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

  return (
    <main className="page today">
      <header className="row between">
        <div><p className="eyebrow">Salut {p.profil.prenom || ""}</p><h1>Aujourd&apos;hui</h1></div>
        {p.serie > 0 && <span className="chip amber">🔥 {p.serie} jour{p.serie > 1 ? "s" : ""}</span>}
      </header>

      {cible && mission ? (
        <section className="card hi">
          <p className="k">Mission du jour · {p.profil.minutes_jour >= 120 ? "2 h" : p.profil.minutes_jour + " min"}</p>
          <h2>{cible.module!.titre}</h2>
          {mission.urgent && <p className="small">Examen dans moins de deux semaines : place aux conditions réelles.</p>}
          <ul className="tasks">
            {mission.etapes.map((e, i) => <li key={e} className={fait && i === 0 ? "done" : ""}>{e}</li>)}
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
            <p className="big">{cible.reste} jour{cible.reste > 1 ? "s" : ""}</p>
            <div className="days">
              {p.semaine.map((j) => (
                <i key={j.d} className={j.fait ? "on" : j.aujourdhui ? "today" : ""} title={j.d}>
                  {["L", "M", "M", "J", "V", "S", "D"][(new Date(j.d + "T12:00:00Z").getUTCDay() + 6) % 7]}
                </i>
              ))}
            </div>
            {p.examens.length > 1 && (
              <ul className="small muted list-plain">
                {p.examens.slice(1).map((e) => <li key={e.module_slug}>{e.module!.titre} : J-{e.reste}</li>)}
              </ul>
            )}
          </section>
        )}
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

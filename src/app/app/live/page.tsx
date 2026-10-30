import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";
import { reserverLive, annulerReservation } from "../actions";

// Séances live : réservation, paiement validé à la main par l'admin, lien visible
// uniquement pour les réservations payées, 30 minutes avant le début.
export default async function Live() {
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const depuis = new Date(Date.now() - 3 * 3600e3).toISOString();
  const [{ data: sessions }, { data: resas }] = await Promise.all([
    db.from("live_sessions").select("id, titre, starts_at, duree_min, prix_dh, places, animateurs, lien").gte("starts_at", depuis).order("starts_at"),
    db.from("live_bookings").select("session_id, user_id, statut").neq("statut", "annulee"),
  ]);
  const paiement = process.env.LIVE_PAIEMENT_INFO || "Les instructions de paiement seront affichées ici.";
  const heure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

  return (
    <main className="page">
      <h1>Séances live</h1>
      <p className="muted">Révision en groupe sur visio, avec des étudiants qui ont validé le module. Places limitées.</p>
      {!(sessions ?? []).length && <div className="card"><p className="muted">Aucune séance programmée pour l&apos;instant. Elles apparaîtront ici.</p></div>}
      <div className="stack">
        {(sessions ?? []).map((s) => {
          const inscrits = (resas ?? []).filter((r) => r.session_id === s.id);
          const mienne = inscrits.find((r) => r.user_id === user!.id);
          const restantes = Math.max(0, s.places - inscrits.length);
          const debut = Date.parse(s.starts_at);
          const lienVisible = mienne?.statut === "payee" && Date.now() >= debut - 30 * 60e3 && Date.now() <= debut + s.duree_min * 60e3;
          return (
            <section key={s.id} className={`card ${mienne?.statut === "payee" ? "hi" : ""}`}>
              <div className="row between">
                <span className="k">{mienne?.statut === "payee" ? "Inscrit · " : ""}{heure(s.starts_at)}</span>
                <span className="chip">{s.prix_dh} DH</span>
              </div>
              <h2>{s.titre}</h2>
              {s.animateurs && <p className="small">Avec {s.animateurs}</p>}
              {!mienne && (
                restantes > 0 ? (
                  <form action={reserverLive} className="stack">
                    <input type="hidden" name="session" value={s.id} />
                    <p className="small muted">{restantes} place{restantes > 1 ? "s" : ""} restante{restantes > 1 ? "s" : ""}</p>
                    <button className="btn">Réserver ma place</button>
                  </form>
                ) : <p className="small muted">Complet</p>
              )}
              {mienne?.statut === "en_attente" && (
                <div className="stack">
                  <p className="small"><strong>Place réservée, en attente de paiement.</strong> {paiement}</p>
                  <form action={annulerReservation}><input type="hidden" name="session" value={s.id} /><button className="linkbtn">Annuler ma réservation</button></form>
                </div>
              )}
              {mienne?.statut === "payee" && (
                lienVisible && s.lien
                  ? <a className="btn inv" href={s.lien} target="_blank" rel="noopener">Rejoindre la séance</a>
                  : <p className="small">Paiement validé ✓ Le lien apparaît ici 30 minutes avant le début.</p>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}

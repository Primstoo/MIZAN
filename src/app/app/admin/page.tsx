import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { jourMaroc } from "@/lib/parcours";
import { creerSession, statutReservation, majLien, majDateModule, statutDocument } from "../actions";

// Suivi du pilote, réservé aux admins (ADMIN_EMAILS) : qui est entré, qui révise quoi,
// combien coûte le tuteur. Ce sont les chiffres à montrer avant de lancer une offre payante.
export const dynamic = "force-dynamic";

const jourMoins = (n: number) => jourMaroc(new Date(Date.now() - n * 864e5));

export const metadata = { title: "Suivi du pilote" };

export default async function Suivi() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!estAdmin(user)) notFound();
  const db = admin();
  const [{ data: membres }, { data: prog }, { data: usage }, { data: invites }, { data: dates }, { data: sessions }, { data: resas }] = await Promise.all([
    db.from("members").select("user_id, email, invite_code, joined_at").order("joined_at", { ascending: false }),
    db.from("progress").select("user_id, module_slug, updated_at"),
    db.from("tutor_usage").select("user_id, day, count").gte("day", jourMoins(29)),
    db.from("invites").select("code, owner, uses, max_uses"),
    db.from("module_dates").select("module_slug, exam_date, officielle, source"),
    db.from("live_sessions").select("id, titre, starts_at, prix_dh, places, lien").order("starts_at", { ascending: false }).limit(20),
    db.from("live_bookings").select("session_id, user_id, email, statut, ref_paiement, created_at").order("created_at", { ascending: false }),
  ]);
  const S = sessions ?? [], R = resas ?? [];
  const { data: docs } = await db.from("documents").select("id, email, type, module_slug, module_libre, etablissement, chemin, nom_fichier, statut, created_at").order("created_at", { ascending: false }).limit(50);
  const liens = new Map<string, string>();
  for (const d of (docs ?? []).filter((x) => x.statut === "recu")) {
    const { data: u } = await db.storage.from("documents").createSignedUrl(d.chemin, 3600);
    if (u?.signedUrl) liens.set(d.id, u.signedUrl);
  }
  const encaisse = R.filter((r) => r.statut === "payee").reduce((t, r) => t + (S.find((s) => s.id === r.session_id)?.prix_dh ?? 0), 0);
  const attente = R.filter((r) => r.statut === "en_attente");
  const M = membres ?? [], P = prog ?? [], U = usage ?? [], I = invites ?? [];
  const actifs7 = new Set(P.filter((p) => p.updated_at >= jourMoins(6)).map((p) => p.user_id));
  const questions = (n: number) => U.filter((u) => u.day >= jourMoins(n - 1)).reduce((s, u) => s + u.count, 0);
  const emailDe = new Map(M.map((m) => [m.user_id, m.email]));
  const parUser = new Map<string, { modules: number; derniere: string; q: number }>();
  for (const p of P) {
    const x = parUser.get(p.user_id) ?? { modules: 0, derniere: "", q: 0 };
    x.modules++; if (p.updated_at > x.derniere) x.derniere = p.updated_at;
    parUser.set(p.user_id, x);
  }
  for (const u of U) {
    const x = parUser.get(u.user_id) ?? { modules: 0, derniere: "", q: 0 };
    x.q += u.count; parUser.set(u.user_id, x);
  }
  const fr = (d: string) => (d ? new Date(d).toLocaleDateString("fr-FR") : "—");

  return (
    <main className="page">
      <h1 className="page-title">Suivi du pilote</h1>
      <div className="kpis">
        <div className="card kpi"><strong>{M.length}</strong>membres</div>
        <div className="card kpi"><strong>{actifs7.size}</strong>actifs sur 7 jours</div>
        <div className="card kpi"><strong>{questions(1)}</strong>questions au tuteur aujourd&apos;hui</div>
        <div className="card kpi"><strong>{questions(30)}</strong>questions sur 30 jours</div>
        <div className="card kpi"><strong>{encaisse} DH</strong>encaissés (lives)</div>
        <div className="card kpi"><strong>{attente.length}</strong>paiements à valider</div>
        <div className="card kpi"><strong>{(docs ?? []).filter((d) => d.statut === "recu").length}</strong>documents à vérifier</div>
      </div>

      <section className="bloc">
        <h2>Dates d&apos;examen par module</h2>
        <p className="muted small">Dès qu&apos;une date est connue (calendrier de la fac, annonce du prof), renseigne-la ici : elle remplace l&apos;estimation chez tous les élèves qui n&apos;avaient pas de date.</p>
        <div className="tabw"><table className="tab dates"><tbody>
          {MODULES.map((m) => {
            const d = (dates ?? []).find((x) => x.module_slug === m.slug);
            return (
              <tr key={m.slug}><td>{m.titre}</td><td>
                <form action={majDateModule} className="dates-form">
                  <input type="hidden" name="module" value={m.slug} />
                  <input type="date" name="date" defaultValue={d?.exam_date ?? ""} />
                  <label className="row small"><input type="checkbox" name="officielle" defaultChecked={!!d?.officielle} /> officielle</label>
                  <input name="source" defaultValue={d?.source ?? ""} placeholder="Source (ex. affichage fac)" />
                  <button className="btn alt small">OK</button>
                </form>
              </td></tr>
            );
          })}
        </tbody></table></div>
      </section>

      <section className="bloc">
        <h2>Paiements à valider</h2>
        {!attente.length && <p className="muted small">Rien en attente.</p>}
        <div className="tabw"><table className="tab"><tbody>
          {attente.map((r) => (
            <tr key={r.session_id + r.user_id}>
              <td>{r.email}</td><td>{S.find((s) => s.id === r.session_id)?.titre}</td><td>{r.ref_paiement ?? ""}</td>
              <td className="row">
                <form action={statutReservation}><input type="hidden" name="session" value={r.session_id} /><input type="hidden" name="user" value={r.user_id} /><input type="hidden" name="statut" value="payee" /><button className="btn small">Payé ✓</button></form>
                <form action={statutReservation}><input type="hidden" name="session" value={r.session_id} /><input type="hidden" name="user" value={r.user_id} /><input type="hidden" name="statut" value="annulee" /><button className="btn alt small">Annuler</button></form>
              </td>
            </tr>
          ))}
        </tbody></table></div>
      </section>

      <section className="bloc">
        <h2>Documents reçus</h2>
        {!(docs ?? []).some((d) => d.statut === "recu") && <p className="muted small">Rien à vérifier.</p>}
        <ul className="list-plain">
          {(docs ?? []).filter((d) => d.statut === "recu").map((d) => (
            <li key={d.id} className="card">
              <div className="row between"><a href={liens.get(d.id)} target="_blank" rel="noopener noreferrer" className="t">{d.nom_fichier}</a><span className="chip">{d.type}</span></div>
              <span className="small muted">{d.email} · {MODULES.find((m) => m.slug === d.module_slug)?.titre ?? d.module_libre ?? "—"} · {d.etablissement ?? ""}</span>
              <div className="row">
                <form action={statutDocument}><input type="hidden" name="id" value={d.id} /><input type="hidden" name="statut" value="accepte" /><button className="btn small">Accepter</button></form>
                <form action={statutDocument} className="row"><input type="hidden" name="id" value={d.id} /><input type="hidden" name="statut" value="refuse" /><input name="note" placeholder="Raison (facultatif)" /><button className="btn alt small">Refuser</button></form>
              </div>
            </li>
          ))}
        </ul>
        <p className="small muted">{(docs ?? []).filter((d) => d.statut === "accepte").length} accepté(s) au total.</p>
      </section>

      <section className="bloc">
        <h2>Séances live</h2>
        <div className="tabw"><table className="tab"><thead><tr><th>Séance</th><th>Date</th><th>Payés / places</th><th>Lien visio</th></tr></thead><tbody>
          {S.map((s) => (
            <tr key={s.id}>
              <td>{s.titre}</td>
              <td>{new Date(s.starts_at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca", dateStyle: "short", timeStyle: "short" })}</td>
              <td>{R.filter((r) => r.session_id === s.id && r.statut === "payee").length} / {s.places}</td>
              <td><form action={majLien} className="row"><input type="hidden" name="session" value={s.id} /><input name="lien" defaultValue={s.lien ?? ""} placeholder="https://meet.google.com/…" /><button className="btn alt small">OK</button></form></td>
            </tr>
          ))}
        </tbody></table></div>
        <details className="bloc">
          <summary><strong>Programmer une séance</strong></summary>
          <form action={creerSession} className="stack form-grid">
            <input name="titre" placeholder="Titre (ex. Limites et continuité)" required />
            <select name="module" defaultValue=""><option value="">Module (facultatif)</option>{MODULES.map((m) => <option key={m.slug} value={m.slug}>{m.titre}</option>)}</select>
            <label>Date et heure (heure du Maroc)<input type="datetime-local" name="quand" required /></label>
            <label>Durée (min)<input type="number" name="duree" defaultValue={90} /></label>
            <label>Prix (DH)<input type="number" name="prix" defaultValue={25} /></label>
            <label>Places<input type="number" name="places" defaultValue={15} /></label>
            <input name="animateurs" placeholder="Animateurs (ex. Patrick et Youssef, 17/20)" />
            <input name="lien" placeholder="Lien visio (peut être ajouté plus tard)" />
            <button className="btn">Programmer</button>
          </form>
        </details>
      </section>

      <section className="bloc">
        <h2>Modules</h2>
        <div className="tabw"><table className="tab"><thead><tr><th>Module</th><th>Élèves</th><th>Actifs 7 j</th></tr></thead><tbody>
          {MODULES.map((m) => {
            const l = P.filter((p) => p.module_slug === m.slug);
            return <tr key={m.slug}><td>{m.titre}</td><td>{l.length}</td><td>{l.filter((p) => p.updated_at >= jourMoins(6)).length}</td></tr>;
          })}
        </tbody></table></div>
      </section>

      <section className="bloc">
        <h2>Membres</h2>
        <div className="tabw"><table className="tab"><thead><tr><th>E-mail</th><th>Entré le</th><th>Code</th><th>Modules</th><th>Dernière activité</th><th>Questions 30 j</th></tr></thead><tbody>
          {M.map((m) => {
            const x = parUser.get(m.user_id);
            return <tr key={m.user_id}><td>{m.email}</td><td>{fr(m.joined_at)}</td><td>{m.invite_code}</td><td>{x?.modules ?? 0}</td><td>{fr(x?.derniere ?? "")}</td><td>{x?.q ?? 0}</td></tr>;
          })}
        </tbody></table></div>
      </section>

      <section className="bloc">
        <h2>Codes d&apos;invitation</h2>
        <div className="tabw"><table className="tab"><thead><tr><th>Code</th><th>Créé par</th><th>Utilisations</th></tr></thead><tbody>
          {I.map((i) => <tr key={i.code}><td><code className="code">{i.code}</code></td><td>{i.owner === user!.id ? "toi" : emailDe.get(i.owner) ?? "—"}</td><td>{i.uses} / {i.max_uses}</td></tr>)}
        </tbody></table></div>
      </section>
    </main>
  );
}

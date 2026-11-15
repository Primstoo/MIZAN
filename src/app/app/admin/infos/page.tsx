import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { SEMESTRES } from "@/lib/fac-commun";
import { LIBELLE_INFO, TYPES_INFO } from "@/lib/infos";
import { traiterInfo } from "./actions";

// File de validation des annonces envoyées par Miroir Darija : relire, corriger, publier ou rejeter.
export const metadata = { title: "Infos de la fac · validation" };
export const dynamic = "force-dynamic";

export default async function InfosAdmin() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!estAdmin(user)) notFound();
  const db = admin();
  const { data: infos, error } = await db.from("fac_infos").select("id, etablissement_id, semestre, type, texte_fr, texte_original, date_evenement, statut, created_at")
    .order("created_at", { ascending: false }).limit(80);
  const { data: etabs } = await db.from("etablissements").select("id, nom");
  const nom = new Map((etabs ?? []).map((e) => [e.id as string, e.nom as string]));
  const attente = (infos ?? []).filter((i) => i.statut === "en_attente");
  const autres = (infos ?? []).filter((i) => i.statut !== "en_attente").slice(0, 20);

  return (
    <main className="page">
      <a href="/app/admin" className="small muted">← Suivi</a>
      <h1 className="page-title">Infos de la fac</h1>
      {error && <p className="alert bad">Table absente : applique <code>supabase/migration-2026-11-infos-fac.sql</code> dans Supabase.</p>}
      <p className="muted small">Relis chaque annonce avant de la publier : pas de nom, pas de numéro, uniquement des infos utiles à toute la promo. À la publication, les élèves reliés à Telegram la reçoivent.</p>
      <h2>À valider ({attente.length})</h2>
      {!attente.length && <p className="muted small">Rien en attente.</p>}
      <div className="stack">
        {attente.map((i) => (
          <form key={i.id} action={traiterInfo} className="card stack">
            <input type="hidden" name="id" value={i.id} />
            <span className="small muted">{nom.get(i.etablissement_id) ?? "?"} · reçue le {new Date(i.created_at).toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" })}</span>
            {i.texte_original && <p className="small muted" dir="auto" style={{ whiteSpace: "pre-wrap" }}>{i.texte_original}</p>}
            <textarea name="texte_fr" defaultValue={i.texte_fr} rows={4} maxLength={2000} required aria-label="Texte en français" />
            <div className="row">
              <select name="type" defaultValue={i.type} aria-label="Type">{TYPES_INFO.map((t) => <option key={t} value={t}>{LIBELLE_INFO[t]}</option>)}</select>
              <select name="semestre" defaultValue={i.semestre ?? ""} aria-label="Semestre"><option value="">Tout l&apos;établissement</option>{SEMESTRES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
              <input type="date" name="date_evenement" defaultValue={i.date_evenement ?? ""} aria-label="Date de l'événement" />
            </div>
            <div className="row">
              <button className="btn small" name="action" value="publier">Publier</button>
              <button className="btn alt small" name="action" value="rejeter">Rejeter</button>
            </div>
          </form>
        ))}
      </div>
      <h2 className="bloc">Dernières traitées</h2>
      <ul className="list-plain small">
        {autres.map((i) => <li key={i.id}><span className={`chip ${i.statut === "publiee" ? "good" : "bad"}`}>{i.statut === "publiee" ? "Publiée" : "Rejetée"}</span> {nom.get(i.etablissement_id) ?? "?"} · {i.texte_fr.slice(0, 90)}</li>)}
      </ul>
    </main>
  );
}

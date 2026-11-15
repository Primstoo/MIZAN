import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { rangEffectif } from "@/lib/offres";
import { apercu, LIBELLE_INFO, type TypeInfo } from "@/lib/infos";

// Infos de la fac : les annonces des groupes de promo (souvent en darija), traduites en français.
// Offres Essentiel et Premium : texte complet. Offre gratuite : le début seulement.
export const metadata = { title: "Infos de la fac" };
export const dynamic = "force-dynamic";

type Info = { id: string; type: TypeInfo; texte_fr: string; date_evenement: string | null; semestre: string | null; publiee_le: string | null; created_at: string };
const jour = (d: string) => new Date(d).toLocaleDateString("fr-FR", { timeZone: "Africa/Casablanca", weekday: "long", day: "numeric", month: "long" });

export default async function Infos() {
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const { data: p } = await db.from("profiles").select("etablissement_id, etablissement, semestre").eq("user_id", user!.id).maybeSingle();
  const complet = (await rangEffectif(user!.id, estAdmin(user))) >= 2;
  const depuis = new Date(Date.now() - 45 * 864e5).toISOString();
  const { data } = p?.etablissement_id
    ? await db.from("fac_infos").select("id, type, texte_fr, date_evenement, semestre, publiee_le, created_at")
        .eq("etablissement_id", p.etablissement_id).eq("statut", "publiee").gte("created_at", depuis)
        .order("created_at", { ascending: false }).limit(60)
    : { data: [] };
  // Annonces de son semestre d'abord, puis celles de tout l'établissement.
  const infos = ((data ?? []) as Info[]).filter((i) => !i.semestre || !p?.semestre || i.semestre === p.semestre);

  return (
    <main className="page narrow-m">
      <header>
        <p className="eyebrow">{p?.etablissement ?? "Ton établissement"}</p>
        <h1>Infos de la fac</h1>
        <p className="muted small">Les annonces des groupes de ta promo, traduites en français : dates d&apos;examen, séances déplacées, documents à récupérer.</p>
      </header>
      {!p?.etablissement_id && <div className="card soft"><p>Choisis d&apos;abord ton établissement dans <a href="/app/modules">Modules</a>.</p></div>}
      {p?.etablissement_id && !infos.length && <div className="card soft"><p><strong>Rien pour l&apos;instant.</strong></p><p className="muted small">Dès qu&apos;une annonce tombe dans un groupe de ta fac, elle apparaît ici en français.</p></div>}
      {!complet && infos.length > 0 && (
        <div className="card hi stack">
          <p><strong>{infos.length} info{infos.length > 1 ? "s" : ""} ces dernières semaines.</strong> Le texte complet est inclus dans les offres Essentiel et Premium.</p>
          <a href="/app/offres" className="btn inv">Voir les offres</a>
        </div>
      )}
      <div className="stack bloc">
        {infos.map((i) => (
          <article key={i.id} className="card">
            <div className="row between">
              <span className={`chip ${i.type === "examen" ? "amber" : ""}`}>{LIBELLE_INFO[i.type] ?? "Info"}{i.semestre ? ` · ${i.semestre}` : ""}</span>
              <span className="small muted">{jour(i.publiee_le ?? i.created_at)}</span>
            </div>
            {i.date_evenement && <p className="small"><strong>Date : {jour(i.date_evenement + "T12:00:00Z")}</strong></p>}
            <p style={{ whiteSpace: "pre-wrap" }}>{complet ? i.texte_fr : apercu(i.texte_fr)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { chargerParcours } from "@/lib/parcours";
import CarteModule from "@/components/CarteModule";

// Mes modules (avec date d'examen ou déjà commencés), puis le reste du catalogue replié.
export default async function Modules() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: prog }, p] = await Promise.all([supabase.from("progress").select("module_slug, updated_at"), chargerParcours(user!)]);
  const vus = new Map((prog ?? []).map((x) => [x.module_slug, x.updated_at as string]));
  const restes = new Map(p.examens.map((e) => [e.module_slug, e.reste]));
  const estimees = new Set(p.examens.filter((e) => e.estimee).map((e) => e.module_slug));
  const miens = MODULES.filter((m) => vus.has(m.slug) || restes.has(m.slug))
    .sort((a, b) => (restes.get(a.slug) ?? 999) - (restes.get(b.slug) ?? 999));
  const autres = MODULES.filter((m) => !miens.includes(m));
  const fr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  return (
    <main className="page">
      <header className="row between"><h1>Modules</h1><a href="/app/bienvenue" className="btn alt small">Mes examens</a></header>
      {miens.length > 0 && (
        <section>
          <h2>Mes modules</h2>
          <div className="grid">
            {miens.map((m) => <CarteModule key={m.slug} m={m} reste={restes.get(m.slug)} estimee={estimees.has(m.slug)} info={vus.has(m.slug) ? `Dernière séance : ${fr(vus.get(m.slug)!)}` : "Pas encore commencé"} />)}
          </div>
        </section>
      )}
      {autres.length > 0 && (
        <details className="bloc catalogue" open={miens.length === 0}>
          <summary><h2>Autres modules</h2><span className="muted small">{autres.length}</span></summary>
          <div className="grid">{autres.map((m) => <CarteModule key={m.slug} m={m} />)}</div>
        </details>
      )}
    </main>
  );
}

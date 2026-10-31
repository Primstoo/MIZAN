import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { chargerMaitrise, chargerParcours } from "@/lib/parcours";

export const metadata = { title: "Ma progression" };

// Maîtrise par module et par chapitre, puis les points faibles à retravailler.
export default async function Progres() {
  const { data: { user } } = await createClient().auth.getUser();
  const [maitrise, p] = await Promise.all([chargerMaitrise(user!), chargerParcours(user!)]);
  const restes = new Map(p.examens.map((e) => [e.module_slug, e.reste]));
  const ordre = [...MODULES].sort((a, b) => (restes.get(a.slug) ?? 999) - (restes.get(b.slug) ?? 999));
  const couleur = (x: number) => (x >= 0.7 ? "" : x >= 0.35 ? "warn" : "bad");

  return (
    <main className="page">
      <h1 className="page-title">Ma progression</h1>
      <p className="muted">Une notion est <b>maîtrisée</b> quand tu réussis au moins 80 % de ses questions, sur au moins 3 essais. Relire le cours ne suffit pas : il faut te tester dans le module.</p>
      {ordre.map((m) => {
        const x = maitrise[m.slug];
        if (!x) return null;
        const r = restes.get(m.slug);
        return (
          <section key={m.slug} className="bloc prog">
            <div className="row between">
              <h2>{m.titre}</h2>
              {r !== undefined && <span className={`chip ${r <= 14 ? "bad" : r <= 30 ? "amber" : ""}`}>Examen J-{r}</span>}
            </div>
            <div className="row between small"><span>Maîtrise globale</span><strong>{x.pct} %</strong></div>
            <div className={`bar ${couleur(x.pct / 100)}`}><i style={{ width: `${x.pct}%` }} /></div>
            <p className="small muted">{x.testes} {x.unite}{x.testes > 1 ? "s" : ""} testé{x.unite === "notion" ? "e" : ""}{x.testes > 1 ? "s" : ""} sur {x.items.length}</p>

            {x.groupes.length > 1 && (
              <details className="chap">
                <summary>Détail par chapitre</summary>
                <ul className="list-plain">
                  {x.groupes.map((g) => {
                    const v = g.total ? g.ok / g.total : 0;
                    return (
                      <li key={g.id}>
                        <div className="row between small"><span>{g.t}</span><span>{g.ok}/{g.total}{g.fragile ? ` · ${g.fragile} à revoir` : ""}</span></div>
                        <div className={`bar ${couleur(v)}`}><i style={{ width: `${Math.round(v * 100)}%` }} /></div>
                      </li>
                    );
                  })}
                </ul>
              </details>
            )}

            <h3 className="k" style={{ marginTop: 14 }}>À retravailler</h3>
            {x.faibles.length ? (
              <ul className="list-plain faibles">
                {x.faibles.slice(0, 5).map((i) => (
                  <li key={i.id} className="card">
                    <div className="row between">
                      <span className="t">{i.t}</span>
                      <span className={`chip ${i.statut === "fragile" ? "bad" : "amber"}`}>
                        {i.statut === "fragile" ? `${Math.round((i.score ?? 0) * 100)} %` : "jamais testé"}
                      </span>
                    </div>
                    <span className="small muted">Importance à l&apos;examen : {"★".repeat(i.imp)}{"☆".repeat(5 - i.imp)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small muted">{x.testes ? "Rien de fragile pour l'instant : continue à te tester sur les notions restantes." : "Pas encore de résultat : fais le test de niveau (3 min) ou un quiz dans le module."}</p>
            )}
            {!x.testes && <a href={`/app/niveau/${m.slug}`} className="btn small">Test de niveau · 3 min</a>}
            <a href={`/app/m/${m.slug}`} className="btn alt small">Ouvrir le module</a>
          </section>
        );
      })}
    </main>
  );
}

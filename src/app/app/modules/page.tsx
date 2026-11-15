import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { chargerParcours, chargerMaitrise } from "@/lib/parcours";
import Embleme, { couleurCours } from "@/components/Embleme";

// « Cours » : le catalogue, au centre de l'appli. Une couverture par cours, et le cours à reprendre en tête.
// Les supports déposés par l'élève sont dans Moi › Mes supports (/app/supports).
export const metadata = { title: "Cours" };
export const dynamic = "force-dynamic";

const court = (t: string) => t.split(" (")[0];

export default async function Cours() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const [{ data: prog }, p, maitrise] = await Promise.all([
    supabase.from("progress").select("module_slug, updated_at").order("updated_at", { ascending: false }),
    chargerParcours(user!), chargerMaitrise(user!),
  ]);
  const restes = new Map(p.examens.map((e) => [e.module_slug, e]));
  // À reprendre : l'examen le plus proche, sinon le dernier cours ouvert.
  const slugUne = p.examens[0]?.module_slug ?? prog?.find((x) => MODULES.some((m) => m.slug === x.module_slug))?.module_slug;
  const une = MODULES.find((m) => m.slug === slugUne);
  const mu = une ? maitrise[une.slug] : undefined;
  const acquis = mu ? mu.groupes.filter((g) => g.ok === g.total).length : 0;
  const suite = mu?.groupes.find((g) => g.ok < g.total);

  return (
    <main className="page tl">
      <header className="tl-head">
        <h1>Que veux-tu comprendre ?</h1>
      </header>

      {une && (
        <a href={`/app/module/${une.slug}`} className="tl-une">
          <span className="tl-une-deco"><Embleme slug={une.slug} taille={180} couleur="var(--acc)" /></span>
          <span className="tl-lbl">{restes.has(une.slug) ? `Reprendre · examen ${restes.get(une.slug)!.estimee ? "≈ " : ""}dans ${restes.get(une.slug)!.reste} jour${restes.get(une.slug)!.reste > 1 ? "s" : ""}` : "Reprendre"}</span>
          <span className="tl-une-bas">
            <strong>{court(une.titre)}</strong>
            <span>{suite ? `Suite : ${suite.t}` : mu ? "Tous les chapitres sont maîtrisés" : une.resume}</span>
            {mu && <span className="tl-segs" aria-label={`${acquis} chapitres maîtrisés sur ${mu.groupes.length}`}>{mu.groupes.map((g) => <i key={g.id} className={g.ok === g.total ? "f" : g.ok + g.fragile > 0 ? "m" : ""} />)}</span>}
          </span>
        </a>
      )}

      <div className="tl-grille">
        {MODULES.map((m) => {
          const mm = maitrise[m.slug], e = restes.get(m.slug);
          return (
            <a key={m.slug} href={`/app/module/${m.slug}`} className="tl-couv" style={{ borderLeftColor: couleurCours(m.slug) }}>
              <span className="tl-couv-haut"><Embleme slug={m.slug} />{e && <span className="tl-jour">J-{e.reste}</span>}</span>
              <span>
                <strong>{court(m.titre)}</strong>
                <small>{mm ? `${mm.groupes.length} chapitres${mm.testes ? ` · ${mm.pct} % maîtrisé` : ""}` : m.semestre}</small>
              </span>
            </a>
          );
        })}
      </div>

      <a href="/app/supports" className="btn alt">Déposer le cours de mon prof</a>
    </main>
  );
}

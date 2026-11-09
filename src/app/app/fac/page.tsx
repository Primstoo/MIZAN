import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { MODULES, memeEtablissement } from "@/lib/modules";
import { SEMESTRES, estSemestre, quotaImport, type Etab } from "@/lib/fac";
import ChoixFac from "./ChoixFac";
import AjouterCours from "./AjouterCours";
import { changerFac, choisirSemestre } from "./actions";

export const metadata = { title: "Ma fac" };
export const dynamic = "force-dynamic";

type Doc = { id: string; user_id: string; module_libre: string | null; type: string; analyse: string; partage: boolean; contenu: { titre?: string } | null; semestre: string | null };
const TYPE: Record<string, string> = { cours: "Cours", td: "TD/TP", annale: "Examen", autre: "Autre" };
const ETAT: Record<string, [string, string]> = { en_cours: ["Analyse en cours", "amber"], incoherent: ["Non reconnu", "bad"], erreur: ["À relancer", "bad"], aucune: ["Reçu", "amber"] };

export default async function MaFac({ searchParams }: { searchParams: { s?: string } }) {
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const { data: p } = await db.from("profiles").select("etablissement_id, semestre, filiere").eq("user_id", user!.id).maybeSingle();

  if (!p?.etablissement_id) {
    const { data } = await db.from("etablissements").select("id, nom, ville, alias, valide").or(`valide.eq.true,cree_par.eq.${user!.id}`).order("nom");
    return (
      <main className="page narrow-m">
        <h1 className="page-title">Ta fac</h1>
        <p className="muted">Dis-nous où tu étudies : tu verras les cours déjà disponibles pour ton établissement, du S1 au master, et tu pourras ajouter les tiens.</p>
        <ChoixFac etabs={(data ?? []) as Etab[]} />
      </main>
    );
  }

  const { data: etab } = await db.from("etablissements").select("id, nom, ville, valide").eq("id", p.etablissement_id).single();
  const sem = estSemestre(searchParams.s) ? searchParams.s : estSemestre(p.semestre) ? p.semestre : "S1";

  // Cours partagés avec la fac + cours de l'élève (tous semestres, pour les compteurs).
  const { data: docsBruts } = await db.from("documents")
    .select("id, user_id, module_libre, type, analyse, partage, contenu->titre, semestre")
    .eq("etablissement_id", p.etablissement_id)
    .or(`partage.eq.true,user_id.eq.${user!.id}`)
    .order("created_at", { ascending: false }).limit(500);
  const docs = ((docsBruts ?? []) as unknown as (Omit<Doc, "contenu"> & { titre?: string })[]).map((d) => ({ ...d, contenu: { titre: d.titre } })) as Doc[];
  const officiels = MODULES.filter((m) => memeEtablissement(etab?.nom, m.etablissement));
  const nb = (s: string) => officiels.filter((m) => m.semestre === s).length + docs.filter((d) => d.semestre === s && (d.partage || d.analyse === "pret")).length;

  const ici = docs.filter((d) => d.semestre === sem);
  const groupes = new Map<string, Doc[]>();
  for (const d of ici) {
    const k = (d.module_libre || "Autre").trim();
    groupes.set(k, [...(groupes.get(k) ?? []), d]);
  }
  const modulesSem = officiels.filter((m) => m.semestre === sem);
  const q = await quotaImport(user!.id, estAdmin(user));

  return (
    <main className="page">
      <div className="row between">
        <div>
          <span className="k">Ma fac</span>
          <h1 className="page-title" style={{ margin: "2px 0" }}>{etab?.nom}</h1>
          <p className="small muted">{[etab?.ville, p.filiere].filter(Boolean).join(" · ")}{!etab?.valide && " · en attente de vérification"}</p>
        </div>
        <form action={changerFac}><button className="btn alt small">Changer</button></form>
      </div>

      <nav className="sems bloc" aria-label="Semestres">
        {SEMESTRES.map((s) => (
          <a key={s} href={`/app/fac?s=${s}`} className={s === sem ? "on" : ""} aria-current={s === sem ? "page" : undefined}>
            {s}{nb(s) > 0 && <span className="n">{nb(s)}</span>}
          </a>
        ))}
      </nav>

      {p.semestre !== sem && (
        <form action={choisirSemestre} className="row small">
          <input type="hidden" name="semestre" value={sem} />
          <button className="btn alt small">Je suis en {sem} (ouvrir ce semestre par défaut)</button>
        </form>
      )}

      <section className="bloc">
        {modulesSem.length > 0 && (
          <>
            <h2>Modules complets</h2>
            <div className="grid">
              {modulesSem.map((m) => (
                <a key={m.slug} href={`/app/m/${m.slug}`} className="card">
                  <span className="chip good">Module ToumaiLearn</span>
                  <h3>{m.titre}</h3>
                  <p className="small muted">{m.resume}</p>
                </a>
              ))}
            </div>
          </>
        )}

        {groupes.size > 0 && (
          <>
            <h2 className="bloc">Cours ajoutés</h2>
            <div className="grid">
              {Array.from(groupes.entries()).map(([mod, ds]) => (
                <div key={mod} className="card">
                  <h3>{mod}</h3>
                  {ds.map((d) => {
                    const e = d.analyse === "pret" ? null : ETAT[d.analyse];
                    return (
                      <a key={d.id} href={`/app/cours/${d.id}`} className="row between small" style={{ textDecoration: "none", color: "inherit", padding: "4px 0" }}>
                        <span>{TYPE[d.type]} · {d.contenu?.titre || "Document"}</span>
                        <span className={`chip ${e ? e[1] : d.partage ? "good" : ""}`}>{e ? e[0] : d.partage ? "Partagé" : d.user_id === user!.id ? "Privé" : ""}</span>
                      </a>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {!modulesSem.length && !groupes.size && (
          <div className="card soft">
            <p><strong>Rien encore en {sem} pour {etab?.nom}.</strong></p>
            <p className="small muted">Ajoute ton premier cours : tu as tes fiches tout de suite, et une fois vérifié il servira à toute ta promo.</p>
          </div>
        )}
      </section>

      <section className="bloc narrow-m">
        <AjouterCours semestre={sem} reste={q.reste} modules={Array.from(new Set([...Array.from(groupes.keys()), ...modulesSem.map((m) => m.titre)]))} />
        <p className="small muted bloc">Les fichiers originaux restent privés. Seuls la fiche, le quiz et les flashcards générés sont partagés avec ta fac, après vérification par l&apos;équipe. Un cours partagé te rapporte des questions au tuteur en plus.</p>
      </section>
    </main>
  );
}

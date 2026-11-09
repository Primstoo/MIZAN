import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { MODULES, memeEtablissement } from "@/lib/modules";
import { chargerParcours, chargerMaitrise } from "@/lib/parcours";
import { SEMESTRES, estSemestre, quotaImport, type Etab } from "@/lib/fac";
import CarteModule from "@/components/CarteModule";
import ChoixFac from "../fac/ChoixFac";
import AjouterCours from "../fac/AjouterCours";
import { changerFac, choisirSemestre } from "../fac/actions";

// Modules de l'élève : son établissement, semestre par semestre (S1 → M4).
// Modules ToumaiLearn complets + cours ajoutés par les élèves (privés, ou partagés après vérification).
export const metadata = { title: "Modules" };
export const dynamic = "force-dynamic";

type Doc = { id: string; user_id: string; module_libre: string | null; type: string; analyse: string; partage: boolean; titre?: string; semestre: string | null };
const TYPE: Record<string, string> = { cours: "Cours", td: "TD/TP", annale: "Examen", autre: "Autre" };
const ETAT: Record<string, [string, string]> = { en_cours: ["En traitement", "amber"], incoherent: ["Non reconnu", "bad"], erreur: ["À relancer", "bad"], aucune: ["Reçu", "amber"] };

export default async function Modules({ searchParams }: { searchParams: { s?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const db = admin();
  const [{ data: prog }, p, maitrise, { data: profil }] = await Promise.all([
    supabase.from("progress").select("module_slug, updated_at"), chargerParcours(user!), chargerMaitrise(user!),
    db.from("profiles").select("etablissement_id, semestre").eq("user_id", user!.id).maybeSingle(),
  ]);
  const vus = new Map((prog ?? []).map((x) => [x.module_slug, x.updated_at as string]));
  const restes = new Map(p.examens.map((e) => [e.module_slug, e.reste]));
  const estimees = new Set(p.examens.filter((e) => e.estimee).map((e) => e.module_slug));
  const fr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  const carte = (m: (typeof MODULES)[number]) => <CarteModule key={m.slug} m={m} reste={restes.get(m.slug)} estimee={estimees.has(m.slug)} pct={maitrise[m.slug]?.testes ? maitrise[m.slug].pct : undefined} info={vus.has(m.slug) ? `Dernière séance : ${fr(vus.get(m.slug)!)}` : restes.has(m.slug) ? "Pas encore commencé" : undefined} />;
  const entete = <header className="row between"><h1>Modules</h1><div className="row"><a href="/app/progres" className="btn alt small">Ma progression</a><a href="/app/bienvenue" className="btn alt small">Mes examens</a></div></header>;

  // Ancien compte sans établissement : on le demande ici.
  if (!profil?.etablissement_id) {
    const { data } = await db.from("etablissements").select("id, nom, ville, alias, valide").or(`valide.eq.true,cree_par.eq.${user!.id}`).order("nom");
    return (
      <main className="page">
        {entete}
        <div className="card narrow-m stack">
          <h2>Où est-ce que tu étudies ?</h2>
          <ChoixFac etabs={(data ?? []) as Etab[]} />
        </div>
        <details className="bloc catalogue">
          <summary><h2>Modules disponibles</h2><span className="muted small">{MODULES.length}</span></summary>
          <div className="grid">{MODULES.map(carte)}</div>
        </details>
      </main>
    );
  }

  const { data: etab } = await db.from("etablissements").select("id, nom, ville, valide").eq("id", profil.etablissement_id).single();
  const sem = estSemestre(searchParams.s) ? searchParams.s : estSemestre(profil.semestre) ? profil.semestre : "S1";
  const { data: brut } = await db.from("documents")
    .select("id, user_id, module_libre, type, analyse, partage, contenu->titre, semestre")
    .eq("etablissement_id", profil.etablissement_id).or(`partage.eq.true,user_id.eq.${user!.id}`)
    .order("created_at", { ascending: false }).limit(500);
  const docs = (brut ?? []) as unknown as Doc[];
  const siens = MODULES.filter((m) => memeEtablissement(etab?.nom, m.etablissement));
  const nb = (s: string) => siens.filter((m) => m.semestre === s).length + docs.filter((d) => d.semestre === s).length;
  const ici = siens.filter((m) => m.semestre === sem);
  const groupes = new Map<string, Doc[]>();
  for (const d of docs.filter((x) => x.semestre === sem)) {
    const k = (d.module_libre || "Autre").trim();
    groupes.set(k, [...(groupes.get(k) ?? []), d]);
  }
  const autres = MODULES.filter((m) => !siens.includes(m));
  const q = await quotaImport(user!.id, estAdmin(user));

  return (
    <main className="page">
      {entete}
      <div className="row between">
        <p className="small muted" style={{ margin: 0 }}><strong>{etab?.nom}</strong>{etab?.ville ? ` · ${etab.ville}` : ""}{!etab?.valide && " · en cours de vérification"}</p>
        <form action={changerFac}><button className="lien small">Changer d&apos;établissement</button></form>
      </div>

      <nav className="sems bloc" aria-label="Semestres">
        {SEMESTRES.map((s) => (
          <a key={s} href={`/app/modules?s=${s}`} className={s === sem ? "on" : ""} aria-current={s === sem ? "page" : undefined}>
            {s}{nb(s) > 0 && <span className="n">{nb(s)}</span>}
          </a>
        ))}
      </nav>
      {profil.semestre !== sem && (
        <form action={choisirSemestre}><input type="hidden" name="semestre" value={sem} /><button className="lien small">Je suis en {sem} : l&apos;ouvrir par défaut</button></form>
      )}

      <section className="bloc">
        {ici.length > 0 && <div className="grid">{ici.map(carte)}</div>}
        {groupes.size > 0 && (
          <div className="grid bloc">
            {Array.from(groupes.entries()).map(([mod, ds]) => (
              <div key={mod} className="card">
                <span className="chip">Cours ajouté</span>
                <h3>{mod}</h3>
                {ds.map((d) => {
                  const e = d.analyse === "pret" ? null : ETAT[d.analyse];
                  return (
                    <a key={d.id} href={`/app/cours/${d.id}`} className="row between small" style={{ textDecoration: "none", color: "inherit", padding: "4px 0" }}>
                      <span>{TYPE[d.type]} · {d.titre || "Document"}</span>
                      <span className={`chip ${e ? e[1] : d.partage ? "good" : ""}`}>{e ? e[0] : d.partage ? "Partagé" : "Privé"}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        {!ici.length && !groupes.size && (
          <div className="card soft"><p><strong>Rien encore en {sem} pour ton établissement.</strong></p></div>
        )}
      </section>

      <section className="bloc narrow-m">
        <AjouterCours semestre={sem} reste={q.reste} modules={Array.from(new Set([...Array.from(groupes.keys()), ...ici.map((m) => m.titre)]))} />
        <p className="small muted bloc">Les fichiers originaux restent privés. Seuls la fiche, le quiz et les flashcards générés sont partagés avec ton établissement, après vérification.</p>
      </section>

      {autres.length > 0 && (
        <details className="bloc catalogue">
          <summary><h2>Modules d&apos;autres établissements</h2><span className="muted small">{autres.length}</span></summary>
          <div className="grid">{autres.map(carte)}</div>
        </details>
      )}
    </main>
  );
}

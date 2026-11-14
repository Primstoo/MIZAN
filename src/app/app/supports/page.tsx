import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { MODULES, memeEtablissement } from "@/lib/modules";
import { SEMESTRES, estSemestre, quotaImport, type Etab } from "@/lib/fac";
import ChoixFac from "../fac/ChoixFac";
import AjouterCours from "../fac/AjouterCours";
import { changerFac, choisirSemestre } from "../fac/actions";

// « Mes supports » : les cours déposés par l'élève (et ceux partagés dans son établissement), semestre par semestre.
// Rangé dans l'onglet Moi ; le catalogue des cours ToumaiLearn est dans /app/modules.
export const metadata = { title: "Mes supports" };
export const dynamic = "force-dynamic";

type Doc = { id: string; user_id: string; module_libre: string | null; type: string; analyse: string; partage: boolean; titre?: string; semestre: string | null };
const TYPE: Record<string, string> = { cours: "Cours", td: "TD/TP", annale: "Examen", autre: "Autre" };
const ETAT: Record<string, [string, string]> = { en_cours: ["En traitement", "amber"], incoherent: ["Non reconnu", "bad"], erreur: ["À relancer", "bad"], aucune: ["Reçu", "amber"] };

export default async function Supports({ searchParams }: { searchParams: { s?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const db = admin();
  const { data: profil } = await db.from("profiles").select("etablissement_id, semestre").eq("user_id", user!.id).maybeSingle();
  const entete = <header className="tl-head"><a href="/app/moi" className="tl-back">← Moi</a><h1>Mes supports</h1><p className="muted">Dépose le cours de ton prof : il est découpé en fiche, quiz et flashcards.</p></header>;

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
          <a key={s} href={`/app/supports?s=${s}`} className={s === sem ? "on" : ""} aria-current={s === sem ? "page" : undefined}>
            {s}{nb(s) > 0 && <span className="n">{nb(s)}</span>}
          </a>
        ))}
      </nav>
      {profil.semestre !== sem && (
        <form action={choisirSemestre}><input type="hidden" name="semestre" value={sem} /><button className="lien small">Je suis en {sem} : l&apos;ouvrir par défaut</button></form>
      )}

      <section className="bloc">
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
        {!groupes.size && (
          <div className="card soft"><p><strong>Aucun support déposé en {sem} pour l&apos;instant.</strong></p></div>
        )}
      </section>

      <section className="bloc narrow-m">
        <AjouterCours semestre={sem} reste={q.reste} modules={Array.from(new Set([...Array.from(groupes.keys()), ...ici.map((m) => m.titre)]))} />
        <p className="small muted bloc">Les fichiers originaux restent privés. Seuls la fiche, le quiz et les flashcards générés sont partagés avec ton établissement, après vérification.</p>
      </section>

    </main>
  );
}

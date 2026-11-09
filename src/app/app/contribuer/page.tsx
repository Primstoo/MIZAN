import { createClient } from "@/lib/supabase/server";
import { admin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";
import { BONUS_PAR_TYPE, BONUS_MAX } from "@/lib/bonus";
import Envoi from "./Envoi";

export const metadata = { title: "Partager mes cours" };

const STATUT: Record<string, string> = { recu: "En cours de vérification", accepte: "Accepté ✓", refuse: "Refusé" };
const TYPE: Record<string, string> = { cours: "Cours", td: "TD", annale: "Annale", autre: "Autre" };

export default async function Contribuer() {
  const { data: { user } } = await createClient().auth.getUser();
  const { data: docs } = await admin().from("documents").select("id, nom_fichier, type, module_slug, module_libre, statut, note, created_at")
    .eq("user_id", user!.id).order("created_at", { ascending: false });
  return (
    <main className="page narrow-m">
      <h1 className="page-title">Partager mes cours</h1>
      <p className="muted">Envoie les supports de tes profs : cours, TD, sujets d&apos;examen. Ils servent à améliorer les modules existants et à en créer de nouveaux, pour ton établissement et ta filière.</p>
      <div className="card soft">
        <p className="small"><strong>Ta récompense :</strong> chaque document accepté te donne des questions au tuteur en plus, chaque jour : annale +{BONUS_PAR_TYPE.annale}, TD +{BONUS_PAR_TYPE.td}, cours +{BONUS_PAR_TYPE.cours} (jusqu&apos;à +{BONUS_MAX}). Les annales sont les plus précieuses.</p>
      </div>
      <Envoi modules={MODULES.map((m) => ({ slug: m.slug, titre: m.titre }))} />
      <section className="bloc">
        <h2>Mes envois</h2>
        {docs?.length ? (
          <ul className="list-plain">
            {docs.map((d) => (
              <li key={d.id} className="card">
                <div className="row between"><span className="t">{d.nom_fichier}</span><span className={`chip ${d.statut === "accepte" ? "good" : d.statut === "refuse" ? "bad" : "amber"}`}>{STATUT[d.statut]}</span></div>
                <span className="small muted">{TYPE[d.type]} · {MODULES.find((m) => m.slug === d.module_slug)?.titre ?? d.module_libre ?? "module non précisé"} · {new Date(d.created_at).toLocaleDateString("fr-FR")}</span>
                {d.note && <span className="small">Note : {d.note}</span>}
              </li>
            ))}
          </ul>
        ) : <p className="small muted">Aucun envoi pour l&apos;instant.</p>}
      </section>
      <p className="small muted bloc">Les documents restent privés : seule l&apos;équipe ToumaiLearn les voit. Ils ne sont jamais publiés tels quels ; seul un contenu de révision retravaillé est proposé aux élèves.</p>
    </main>
  );
}

import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { chargerParcours } from "@/lib/parcours";
import { admin } from "@/lib/acces";
import Etapes from "./Etapes";
import type { Etab } from "@/lib/fac-commun";
import { estMascotte } from "@/components/Mascotte";

// Inscription guidée (une seule fois) : prénom et guide, établissement, modules et dates d'examen, temps par jour.
export const metadata = { title: "Bienvenue" };

export default async function Bienvenue() {
  const { data: { user } } = await createClient().auth.getUser();
  const { profil, examens } = await chargerParcours(user!);
  const db = admin();
  const { data: communes } = await db.from("module_dates").select("module_slug, exam_date, officielle");
  const { data: etabs } = await db.from("etablissements").select("id, nom, ville, alias, valide").or(`valide.eq.true,cree_par.eq.${user!.id}`);
  const { data: lieu } = await db.from("profiles").select("etablissement_id, semestre").eq("user_id", user!.id).maybeSingle();
  return (
    <main className="page narrow-m">
      <Etapes
        etabs={(etabs ?? []) as Etab[]}
        etablissementId={lieu?.etablissement_id ?? ""}
        semestre={lieu?.semestre ?? ""}
        modules={MODULES.map((m) => ({ slug: m.slug, titre: m.titre, semestre: m.semestre, etablissement: m.etablissement }))}
        etablissement={profil?.etablissement ?? ""}
        ville={profil?.ville ?? ""}
        filiere={profil?.filiere ?? ""}
        prenom={profil?.prenom ?? ""}
        mascotte={estMascotte(profil?.mascotte) ? profil.mascotte : "toumai"}
        minutes={profil?.minutes_jour ?? 60}
        dates={Object.fromEntries(examens.filter((e) => !e.estimee).map((e) => [e.module_slug, e.exam_date]))}
        inconnues={examens.filter((e) => e.estimee).map((e) => e.module_slug)}
        communes={Object.fromEntries((communes ?? []).map((c) => [c.module_slug, { date: c.exam_date as string, officielle: !!c.officielle }]))}
      />
    </main>
  );
}

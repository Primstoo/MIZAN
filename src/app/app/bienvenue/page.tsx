import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import { chargerParcours } from "@/lib/parcours";
import Etapes from "./Etapes";

// Inscription guidée (une seule fois) : prénom, modules, dates d'examen, temps par jour.
export default async function Bienvenue() {
  const { data: { user } } = await createClient().auth.getUser();
  const { profil, examens } = await chargerParcours(user!);
  return (
    <main className="page narrow-m">
      <Etapes
        modules={MODULES.map((m) => ({ slug: m.slug, titre: m.titre, semestre: m.semestre }))}
        prenom={profil?.prenom ?? ""}
        minutes={profil?.minutes_jour ?? 60}
        dates={Object.fromEntries(examens.map((e) => [e.module_slug, e.exam_date as string]))}
      />
    </main>
  );
}

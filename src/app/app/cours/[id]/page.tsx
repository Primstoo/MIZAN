import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { contenuValide } from "@/lib/fac";
import { partagerCours } from "../../fac/actions";
import Attente from "./Attente";
import Lecteur from "./Lecteur";

export const metadata = { title: "Cours" };
export const dynamic = "force-dynamic";

export default async function Cours({ params }: { params: { id: string } }) {
  if (!/^[0-9a-f-]{36}$/.test(params.id)) notFound();
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const { data: d } = await db.from("documents")
    .select("id, user_id, module_libre, type, semestre, analyse, analyse_note, contenu, partage, etablissement_id, nom_fichier").eq("id", params.id).maybeSingle();
  if (!d) notFound();
  const chef = estAdmin(user);
  const proprio = d.user_id === user!.id;
  if (!proprio && !chef) {
    // Cours partagé : réservé aux élèves du même établissement.
    const { data: p } = await db.from("profiles").select("etablissement_id").eq("user_id", user!.id).maybeSingle();
    if (!d.partage || p?.etablissement_id !== d.etablissement_id) notFound();
  }

  return (
    <main className="page narrow-m">
      <a href={`/app/modules?s=${d.semestre ?? ""}`} className="small muted">← Modules</a>
      <span className="k bloc">{[d.module_libre, d.semestre].filter(Boolean).join(" · ")}</span>
      {d.analyse === "pret" && contenuValide(d.contenu) ? (
        <>
          <h1 className="page-title" style={{ margin: "2px 0 8px" }}>{d.contenu.titre}</h1>
          <p className="small muted">Fiche générée automatiquement à partir {proprio ? "de ton document" : "d'un document de ta promo"}. Vérifie avec ton cours en cas de doute.</p>
          <Lecteur c={d.contenu} id={d.id} />
        </>
      ) : (
        <Attente id={d.id} etat={d.analyse} note={d.analyse_note} proprio={proprio || chef} />
      )}
      {chef && (
        <form action={partagerCours} className="card bloc">
          <input type="hidden" name="id" value={d.id} />
          <input type="hidden" name="partage" value={d.partage ? "0" : "1"} />
          <p className="small"><strong>Admin</strong> · {d.nom_fichier} · {d.partage ? "partagé avec l'établissement" : "privé"}</p>
          <button className="btn small" disabled={d.analyse !== "pret"}>{d.partage ? "Retirer du partage" : "Partager avec tout l'établissement"}</button>
        </form>
      )}
    </main>
  );
}

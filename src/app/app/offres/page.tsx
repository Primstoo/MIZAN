import { createClient } from "@/lib/supabase/server";
import { estAdmin } from "@/lib/acces";
import { dateFr, NOMS, offreDe, offresActives, QUOTA_TUTEUR } from "@/lib/offres";
import ActiverCode from "./ActiverCode";
import { WHATSAPP_CONTACT, whatsappLien } from "@/lib/offres";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mon offre" };

export default async function Offres() {
  const { data: { user } } = await createClient().auth.getUser();
  const o = await offreDe(user!.id);
  const chef = estAdmin(user);
  // Aucun prix ici (D33) : orientation seulement, le détail se donne sur WhatsApp.
  const offres: { id: "free" | "essentiel" | "examen"; nom: string; points: string[] }[] = [
    { id: "free", nom: "Gratuit", points: [`${QUOTA_TUTEUR.free} questions au tuteur par jour`, "5 quiz par chapitre, squelette de base"] },
    { id: "essentiel", nom: "Abonnement mensuel", points: [`${QUOTA_TUTEUR.essentiel} questions par jour, mode Approfondi`, "Quiz illimités, annales corrigées", "Squelette complet"] },
    { id: "examen", nom: "Pass examen", points: ["Pour la période de révision avant tes examens", `Tuteur renforcé (${QUOTA_TUTEUR.examen} questions par jour), photo de ton brouillon`, "Annales corrigées, examen blanc chronométré"] },
  ];
  return (
    <main className="page">
      <header>
        <p className="eyebrow">Mon offre</p>
        <h1>{NOMS[o.plan]}</h1>
        <p className="muted small">
          {o.plan === "free" ? "Tu utilises l'offre gratuite." : `Active jusqu'au ${dateFr(o.fin!)}${o.source === "invite" ? " (essai offert par invitation)" : o.bonus && o.plan === o.bonus.plan ? " (bonus de parrainage)" : ""}.`}
          {o.bonus && o.plan !== o.bonus.plan ? ` Bonus ${NOMS[o.bonus.plan]} jusqu'au ${dateFr(o.bonus.fin)}.` : ""}
        </p>
        {!offresActives() && <p className="alert ok small">Bêta : toutes les fonctions restent ouvertes pour l&apos;instant{chef ? " (OFFRES_ACTIVES n'est pas à 1)" : ""}.</p>}
      </header>

      <div className="offres">
        {offres.map((x) => (
          <section key={x.id} className={`offre ${x.id === "examen" ? "reco" : ""}`}>
            <div className="row between">
              <h2>{x.nom}</h2>
              {o.plan === x.id ? <span className="chip">Ton offre</span> : null}
            </div>
                        <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </section>
        ))}
      </div>

      <section className="bloc">
        <h2>Une offre t&apos;intéresse ?</h2>
        <p className="muted small">Les tarifs et le paiement se donnent sur WhatsApp. Tu reçois ensuite un code d&apos;activation.</p>
        <p><a className="btn" href={whatsappLien("offres")} target="_blank" rel="noopener noreferrer">Plus d&apos;infos sur WhatsApp : {WHATSAPP_CONTACT.numero}</a></p>
        <p className="muted small">Sans renouvellement, ton abonnement s&apos;arrête à sa date de fin et tu repasses automatiquement en gratuit.</p>
        <ActiverCode />
      </section>

      <section className="bloc">
        <h2>Gagner des jours gratuits</h2>
        <ul className="list-plain small">
          <li>Invite un camarade (Moi &gt; Inviter) : s&apos;il prend une offre, tu gagnes <strong>7 jours au niveau supérieur</strong>.</li>
          <li>Partage une annale acceptée : <strong>7 jours offerts</strong>.</li>
        </ul>
      </section>
    </main>
  );
}

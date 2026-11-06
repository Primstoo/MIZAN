import { createClient } from "@/lib/supabase/server";
import { estAdmin } from "@/lib/acces";
import { dateFr, NOMS, offreDe, offresActives, QUOTA_TUTEUR } from "@/lib/offres";
import ActiverCode from "./ActiverCode";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mon offre" };

const prix = (v: string | undefined, d: string) => v || d;

export default async function Offres() {
  const { data: { user } } = await createClient().auth.getUser();
  const o = await offreDe(user!.id);
  const chef = estAdmin(user);
  const offres: { id: "free" | "essentiel" | "premium"; nom: string; prix: string; points: string[] }[] = [
    { id: "free", nom: "Gratuit", prix: "0 DH", points: [`${QUOTA_TUTEUR.free} questions au tuteur par jour`, "5 quiz par chapitre, squelette de base"] },
    { id: "essentiel", nom: "Essentiel", prix: prix(process.env.PRIX_ESSENTIEL, "19 DH / mois · 49 DH / semestre"), points: [`${QUOTA_TUTEUR.essentiel} questions par jour, mode Approfondi`, "Quiz illimités, annales corrigées", "Squelette complet"] },
    { id: "premium", nom: "Premium", prix: prix(process.env.PRIX_PREMIUM, "39 DH / mois · 99 DH / semestre"), points: ["Tuteur sans limite pratique, photo de ton brouillon", "Examen blanc chronométré, live mensuel", "Squelette complet + pièces rares"] },
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
          <section key={x.id} className={`offre ${x.id === "premium" ? "reco" : ""}`}>
            <div className="row between">
              <h2>{x.nom}</h2>
              {o.plan === x.id ? <span className="chip">Ton offre</span> : x.id === "premium" ? <span className="chip amber">Conseillé</span> : null}
            </div>
            <p className="t">{x.prix}</p>
            <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </section>
        ))}
      </div>

      <section className="bloc">
        <h2>Comment payer</h2>
        <p className="muted small" style={{ whiteSpace: "pre-line" }}>
          {process.env.OFFRE_PAIEMENT_INFO || process.env.LIVE_PAIEMENT_INFO || "Paiement par CashPlus, Orange Money ou virement. Contacte l'équipe ToumaiLearn : tu reçois un code d'activation après le paiement."}
        </p>
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

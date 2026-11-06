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
  const lignes: [string, string, string, string][] = [
    ["Fiches et quiz des modules", "✓ (5 quiz / chapitre)", "✓ illimités", "✓ illimités"],
    ["Questions au tuteur par jour", String(QUOTA_TUTEUR.free), String(QUOTA_TUTEUR.essentiel), "Sans limite pratique"],
    ["Mode « Approfondi » du tuteur", "—", "✓", "✓"],
    ["Photo de ton brouillon au tuteur", "—", "—", "✓"],
    ["Examen blanc chronométré", "—", "—", "✓"],
    ["Live mensuel", "—", "—", "✓"],
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

      <section className="bloc">
        <h2>Les offres</h2>
        <div className="tabw">
          <table className="tab">
            <thead><tr><th></th><th>Gratuit</th><th>Essentiel</th><th>Premium</th></tr></thead>
            <tbody>
              {lignes.map((l) => <tr key={l[0]}><td>{l[0]}</td><td>{l[1]}</td><td>{l[2]}</td><td>{l[3]}</td></tr>)}
              <tr><td><strong>Prix</strong></td><td>0 DH</td>
                <td>{prix(process.env.PRIX_ESSENTIEL, "19 DH / mois · 49 DH / semestre")}</td>
                <td>{prix(process.env.PRIX_PREMIUM, "39 DH / mois · 99 DH / semestre")}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

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

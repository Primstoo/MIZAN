import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { chargerParcours, jourMaroc } from "@/lib/parcours";
import { changerMascotte, creerInvitation } from "../actions";
import Mascotte, { estMascotte, MASCOTTES } from "@/components/Mascotte";
import Theme from "./Theme";
import Copier from "../Copier";
import Deconnexion from "../Deconnexion";
import { bonusTuteur } from "@/lib/bonus";
import { botActif } from "@/lib/telegram";
import Telegram from "./Telegram";
import { dateFr, NOMS, offreDe, offresActives, QUOTA_TUTEUR } from "@/lib/offres";

export const metadata = { title: "Mon compte" };

export default async function Moi() {
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const [p, { data: inv }, { data: usage }] = await Promise.all([
    chargerParcours(user!),
    db.from("invites").select("code, uses, max_uses").eq("owner", user!.id),
    db.from("tutor_usage").select("count").eq("user_id", user!.id).eq("day", jourMaroc()).maybeSingle(),
  ]);
  const bonus = await bonusTuteur(user!.id);
  const { data: tg } = await db.from("telegram_links").select("chat_id, actif").eq("user_id", user!.id).maybeSingle();
  const offre = await offreDe(user!.id);
  const quota = offresActives() && !estAdmin(user) ? QUOTA_TUTEUR[offre.plan] : Number(process.env.TUTOR_DAILY_QUOTA || 40) + bonus;
  const restant = Math.max(0, quota - (usage?.count ?? 0));
  const peutCreer = estAdmin(user) || (inv?.length ?? 0) < Number(process.env.INVITES_PER_MEMBER || 1);
  const actifs = p.semaine.filter((j) => j.fait).length;

  return (
    <main className="page">
      <header className="row between">
        <div className="salut"><Mascotte id={estMascotte(p.profil?.mascotte) ? p.profil.mascotte : "toumai"} taille={48} /><div><h1>{p.profil?.prenom || "Mon compte"}</h1><p className="muted small">{user?.email}{p.profil?.filiere ? ` · ${p.profil.filiere}` : ""}</p></div></div>
        <div className="row">{estAdmin(user) && <a href="/app/admin" className="btn alt small">Suivi admin</a>}<Deconnexion /></div>
      </header>

      <div className="kpis">
        <div className="card"><span className="k">Cette semaine</span><span className="big">{actifs}/7</span><span className="small muted">jours de révision</span></div>
        <div className="card"><span className="k">Tuteur</span><span className="big">{restant}</span><span className="small muted">questions restantes aujourd&apos;hui</span></div>
        <div className="card"><span className="k">Temps prévu</span><span className="big">{p.profil?.minutes_jour ?? 60}</span><span className="small muted">minutes par jour</span></div>
      </div>

      <section className="bloc">
        <div className="row between"><h2>Mon offre : {NOMS[offre.plan]}</h2><a href="/app/offres" className="btn small">{offre.plan === "premium" ? "Voir" : "Voir les offres"}</a></div>
        <p className="muted small">{offre.fin ? `Active jusqu'au ${dateFr(offre.fin)}.` : "Fiches, quiz et tuteur de base. Tu as un code ? Active-le sur la page des offres."}</p>
      </section>

      <section className="bloc">
        <div className="row between"><h2>Ma progression</h2><a href="/app/progres" className="btn alt small">Voir</a></div>
        <p className="muted small">Ton squelette, ta note prévue et tes points faibles. Visible uniquement par toi.</p>
      </section>

      <section className="bloc">
        <div className="row between"><h2>Mes examens</h2><a href="/app/bienvenue" className="btn alt small">Modifier</a></div>
        {p.examens.length ? (
          <ul className="list-plain">{p.examens.map((e) => <li key={e.module_slug}><strong>{e.module!.titre}</strong> · {new Date(e.exam_date + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} <span className="muted">(J-{e.reste}{e.estimee ? ", estimée" : ""})</span></li>)}</ul>
        ) : <p className="muted small">Aucune date d&apos;examen. Ajoute-en une pour avoir ta mission du jour.</p>}
      </section>

      {botActif() && (
        <section className="bloc">
          <h2>Rappels Telegram</h2>
          <p className="muted small">{tg?.chat_id ? (tg.actif ? "✓ Relié : tu reçois ta mission chaque matin vers 8 h. Tape /stop dans Telegram pour arrêter." : "Relié, mais les rappels sont en pause : tape /reprendre dans Telegram.") : "Reçois chaque matin ta mission du jour, ton compte à rebours et les lives, là où tu es déjà."}</p>
          <Telegram relie={!!tg?.chat_id} />
        </section>
      )}

      <section className="bloc">
        <div className="row between"><h2>Partager mes cours</h2><a href="/app/contribuer" className="btn small">Envoyer un document</a></div>
        <p className="muted small">Envoie les cours, TD et annales de tes profs : ils servent à créer de nouveaux modules. Chaque document accepté te donne des questions au tuteur en plus, chaque jour{bonus ? ` (tu as déjà +${bonus})` : ""}.</p>
      </section>

      <section className="bloc">
        <h2>Inviter des camarades</h2>
        <p className="muted small">ToumaiLearn est en bêta privée : chaque code fait entrer quelques personnes. Si tu as une offre payée, tes invités l&apos;essaient 7 jours ; s&apos;ils s&apos;abonnent, tu gagnes 7 jours au niveau supérieur.</p>
        {(inv ?? []).map((i) => (
          <p key={i.code} className="row"><code className="code">{i.code}</code><span className="small muted">{i.max_uses - i.uses} place{i.max_uses - i.uses > 1 ? "s" : ""} restante{i.max_uses - i.uses > 1 ? "s" : ""}</span><Copier texte={i.code} /></p>
        ))}
        {peutCreer && <form action={creerInvitation}><button className="btn small">Créer un code</button></form>}
      </section>
      <section className="bloc">
        <h2>Réglages</h2>
        <p className="k">Thème</p>
        <Theme />
        <form action={changerMascotte} className="stack" style={{ marginTop: 12 }}>
          <p className="k">Ton guide</p>
          <div className="mascottes" role="radiogroup" aria-label="Choix du guide">
            {MASCOTTES.map((m) => (
              <label key={m.id}>
                <input type="radio" name="mascotte" value={m.id} defaultChecked={m.id === (estMascotte(p.profil?.mascotte) ? p.profil.mascotte : "toumai")} />
                <Mascotte id={m.id} taille={52} decor />
                {m.nom}
              </label>
            ))}
          </div>
          <button className="btn alt small" style={{ alignSelf: "flex-start" }}>Enregistrer le guide</button>
        </form>
      </section>
    </main>
  );
}

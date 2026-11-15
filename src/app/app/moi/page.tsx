import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { chargerParcours } from "@/lib/parcours";
import { changerMascotte } from "../actions";
import Mascotte, { estMascotte, MASCOTTES } from "@/components/Mascotte";
import Theme from "./Theme";
import Deconnexion from "../Deconnexion";
import { botActif } from "@/lib/telegram";
import Telegram from "./Telegram";
import { NOMS, offreDe } from "@/lib/offres";

export const metadata = { title: "Mon compte" };

export default async function Moi() {
  const { data: { user } } = await createClient().auth.getUser();
  const db = admin();
  const p = await chargerParcours(user!);
  const { data: tg } = await db.from("telegram_links").select("chat_id, actif").eq("user_id", user!.id).maybeSingle();
  const offre = await offreDe(user!.id);

  return (
    <main className="page">
      <header className="row between">
        <div className="salut"><Mascotte id={estMascotte(p.profil?.mascotte) ? p.profil.mascotte : "toumai"} taille={48} /><div><h1>{p.profil?.prenom || "Mon compte"}</h1><p className="muted small">{user?.email}{p.profil?.filiere ? ` · ${p.profil.filiere}` : ""}</p></div></div>
        <div className="row">{estAdmin(user) && <a href="/app/admin" className="btn alt small">Suivi admin</a>}<Deconnexion /></div>
      </header>

      <div className="tl-liste">
        <a href="/app/supports"><span>Mes supports</span><small>Déposer un cours</small></a>
        <a href="/app/progres"><span>Ma progression</span><small>Voir</small></a>
        <a href="/app/offres"><span>Mon offre</span><small>{NOMS[offre.plan]}</small></a>
      </div>

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

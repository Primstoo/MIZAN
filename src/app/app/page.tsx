import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import Deconnexion from "./Deconnexion";
import { admin, estAdmin } from "@/lib/acces";
import { creerInvitation } from "./actions";
import Copier from "./Copier";

// Tableau de bord : d'abord les modules commencés, le catalogue complet est replié.
export default async function Tableau() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: prog } = await supabase.from("progress").select("module_slug, updated_at");
  const db = admin();
  const jour = new Date().toISOString().slice(0, 10);
  const [{ data: inv }, { data: usage }] = await Promise.all([
    db.from("invites").select("code, uses, max_uses").eq("owner", user!.id),
    db.from("tutor_usage").select("count").eq("user_id", user!.id).eq("day", jour).maybeSingle(),
  ]);
  const quota = Number(process.env.TUTOR_DAILY_QUOTA || 40);
  const restant = Math.max(0, quota - (usage?.count ?? 0));
  const peutCreer = estAdmin(user) || (inv?.length ?? 0) < Number(process.env.INVITES_PER_MEMBER || 1);
  const vus = new Map((prog ?? []).map((p) => [p.module_slug, p.updated_at as string]));
  const commences = MODULES.filter((m) => vus.has(m.slug))
    .sort((a, b) => (vus.get(b.slug)! > vus.get(a.slug)! ? 1 : -1));
  const semestres = Array.from(new Set(MODULES.map((m) => m.semestre))).sort().reverse();
  const prenom = (user?.email ?? "").split("@")[0].split(/[._-]/)[0];
  const fr = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

  const Carte = ({ m }: { m: (typeof MODULES)[number] }) => (
    <a href={`/app/m/${m.slug}`} className="card">
      <span className="chip">{m.semestre}</span>
      <h3>{m.titre}</h3>
      {m.prof && <p className="muted small">{m.prof}</p>}
      <p className="small">{m.resume}</p>
      <p className="small muted foot-card">{vus.has(m.slug) ? `Dernière séance : ${fr(vus.get(m.slug)!)}` : "Pas encore commencé"}</p>
    </a>
  );

  return (
    <main className="page">
      <header className="top">
        <a href="/app" className="logo">MIZAN</a>
        <div className="row">
          {estAdmin(user) && <a href="/app/admin" className="btn alt small">Suivi</a>}
          <Deconnexion />
        </div>
      </header>

      <section className="hello">
        <div>
          <h1>Bonjour{prenom ? ` ${prenom.charAt(0).toUpperCase()}${prenom.slice(1)}` : ""}.</h1>
          <p className="muted">{commences.length ? "Reprends là où tu t'es arrêté." : "Choisis un premier module pour commencer."}</p>
        </div>
        <div className="stat"><strong>{restant}</strong><span className="small muted">questions au tuteur<br />restantes aujourd&apos;hui</span></div>
      </section>

      {commences.length > 0 && (
        <section>
          <h2>Mes modules</h2>
          <div className="grid">{commences.map((m) => <Carte key={m.slug} m={m} />)}</div>
        </section>
      )}

      <details className="bloc catalogue" open={commences.length === 0}>
        <summary><h2>{commences.length ? "Ajouter un module" : "Modules disponibles"}</h2><span className="muted small">{MODULES.length} modules</span></summary>
        {semestres.filter((s) => MODULES.some((m) => m.semestre === s && !vus.has(m.slug))).map((s) => (
          <div key={s}>
            <p className="eyebrow">Semestre {s.replace("S", "")}</p>
            <div className="grid">{MODULES.filter((m) => m.semestre === s && !vus.has(m.slug)).map((m) => <Carte key={m.slug} m={m} />)}</div>
          </div>
        ))}
      </details>

      <section className="bloc">
        <h2>Inviter des camarades</h2>
        <p className="muted small">MIZAN est en bêta privée : chaque code fait entrer quelques personnes.</p>
        {(inv ?? []).map((i) => (
          <p key={i.code} className="row"><code className="code">{i.code}</code><span className="small muted">{i.max_uses - i.uses} place{i.max_uses - i.uses > 1 ? "s" : ""} restante{i.max_uses - i.uses > 1 ? "s" : ""}</span><Copier texte={i.code} /></p>
        ))}
        {peutCreer && <form action={creerInvitation}><button className="btn small">Créer un code</button></form>}
      </section>
    </main>
  );
}

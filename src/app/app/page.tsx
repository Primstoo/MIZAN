import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import Deconnexion from "./Deconnexion";
import { admin, estAdmin } from "@/lib/acces";
import { creerInvitation } from "./actions";
import Copier from "./Copier";

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

  return (
    <main className="page">
      <header className="top">
        <a href="/" className="logo">MIZAN</a>
        <span className="muted small">{user?.email}</span>
        {estAdmin(user) && <a href="/app/admin" className="btn alt small">Suivi</a>}
        <Deconnexion />
      </header>
      <h1>Mes modules</h1>
      <div className="grid">
        {MODULES.map((m) => (
          <a key={m.slug} href={`/app/m/${m.slug}`} className="card">
            <span className="chip">{m.semestre}</span>
            <h2>{m.titre}</h2>
            {m.prof && <p className="muted small">{m.prof}</p>}
            <p>{m.resume}</p>
            <p className="small muted">{vus.has(m.slug) ? `Dernière activité : ${new Date(vus.get(m.slug)!).toLocaleDateString("fr-FR")}` : "Pas encore commencé"}</p>
          </a>
        ))}
      </div>

      <section className="bloc">
        <h2>Tuteur</h2>
        <p>{restant} question{restant > 1 ? "s" : ""} restante{restant > 1 ? "s" : ""} aujourd&apos;hui sur {quota}.</p>
      </section>

      <section className="bloc">
        <h2>Inviter des camarades</h2>
        <p className="muted small">MIZAN est en bêta fermée : chaque code fait entrer quelques personnes.</p>
        {(inv ?? []).map((i) => (
          <p key={i.code}><code className="code">{i.code}</code> · {i.max_uses - i.uses} place{i.max_uses - i.uses > 1 ? "s" : ""} restante{i.max_uses - i.uses > 1 ? "s" : ""} <Copier texte={i.code} /></p>
        ))}
        {peutCreer && (
          <form action={creerInvitation}><button className="btn small">Créer mon code</button></form>
        )}
      </section>
    </main>
  );
}

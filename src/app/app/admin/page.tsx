import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { admin, estAdmin } from "@/lib/acces";
import { MODULES } from "@/lib/modules";

// Suivi du pilote, réservé aux admins (ADMIN_EMAILS) : qui est entré, qui révise quoi,
// combien coûte le tuteur. Ce sont les chiffres à montrer avant de lancer une offre payante.
export const dynamic = "force-dynamic";

const jourMoins = (n: number) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);

export default async function Suivi() {
  const { data: { user } } = await createClient().auth.getUser();
  if (!estAdmin(user)) notFound();
  const db = admin();
  const [{ data: membres }, { data: prog }, { data: usage }, { data: invites }] = await Promise.all([
    db.from("members").select("user_id, email, invite_code, joined_at").order("joined_at", { ascending: false }),
    db.from("progress").select("user_id, module_slug, updated_at"),
    db.from("tutor_usage").select("user_id, day, count").gte("day", jourMoins(29)),
    db.from("invites").select("code, owner, uses, max_uses"),
  ]);
  const M = membres ?? [], P = prog ?? [], U = usage ?? [], I = invites ?? [];
  const actifs7 = new Set(P.filter((p) => p.updated_at >= jourMoins(6)).map((p) => p.user_id));
  const questions = (n: number) => U.filter((u) => u.day >= jourMoins(n - 1)).reduce((s, u) => s + u.count, 0);
  const emailDe = new Map(M.map((m) => [m.user_id, m.email]));
  const parUser = new Map<string, { modules: number; derniere: string; q: number }>();
  for (const p of P) {
    const x = parUser.get(p.user_id) ?? { modules: 0, derniere: "", q: 0 };
    x.modules++; if (p.updated_at > x.derniere) x.derniere = p.updated_at;
    parUser.set(p.user_id, x);
  }
  for (const u of U) {
    const x = parUser.get(u.user_id) ?? { modules: 0, derniere: "", q: 0 };
    x.q += u.count; parUser.set(u.user_id, x);
  }
  const fr = (d: string) => (d ? new Date(d).toLocaleDateString("fr-FR") : "—");

  return (
    <main className="page">
      <header className="top slim"><a href="/app" className="back">← Mes modules</a><strong>Suivi du pilote</strong></header>
      <div className="kpis">
        <div className="card kpi"><strong>{M.length}</strong>membres</div>
        <div className="card kpi"><strong>{actifs7.size}</strong>actifs sur 7 jours</div>
        <div className="card kpi"><strong>{questions(1)}</strong>questions au tuteur aujourd&apos;hui</div>
        <div className="card kpi"><strong>{questions(30)}</strong>questions sur 30 jours</div>
      </div>

      <section className="bloc">
        <h2>Modules</h2>
        <table className="tab"><thead><tr><th>Module</th><th>Élèves</th><th>Actifs 7 j</th></tr></thead><tbody>
          {MODULES.map((m) => {
            const l = P.filter((p) => p.module_slug === m.slug);
            return <tr key={m.slug}><td>{m.titre}</td><td>{l.length}</td><td>{l.filter((p) => p.updated_at >= jourMoins(6)).length}</td></tr>;
          })}
        </tbody></table>
      </section>

      <section className="bloc">
        <h2>Membres</h2>
        <table className="tab"><thead><tr><th>E-mail</th><th>Entré le</th><th>Code</th><th>Modules</th><th>Dernière activité</th><th>Questions 30 j</th></tr></thead><tbody>
          {M.map((m) => {
            const x = parUser.get(m.user_id);
            return <tr key={m.user_id}><td>{m.email}</td><td>{fr(m.joined_at)}</td><td>{m.invite_code}</td><td>{x?.modules ?? 0}</td><td>{fr(x?.derniere ?? "")}</td><td>{x?.q ?? 0}</td></tr>;
          })}
        </tbody></table>
      </section>

      <section className="bloc">
        <h2>Codes d&apos;invitation</h2>
        <table className="tab"><thead><tr><th>Code</th><th>Créé par</th><th>Utilisations</th></tr></thead><tbody>
          {I.map((i) => <tr key={i.code}><td><code className="code">{i.code}</code></td><td>{emailDe.get(i.owner) ?? "admin"}</td><td>{i.uses} / {i.max_uses}</td></tr>)}
        </tbody></table>
      </section>
    </main>
  );
}

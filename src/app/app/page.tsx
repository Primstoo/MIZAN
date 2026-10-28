import { createClient } from "@/lib/supabase/server";
import { MODULES } from "@/lib/modules";
import Deconnexion from "./Deconnexion";

export default async function Tableau() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: prog } = await supabase.from("progress").select("module_slug, updated_at");
  const vus = new Map((prog ?? []).map((p) => [p.module_slug, p.updated_at as string]));

  return (
    <main className="page">
      <header className="top">
        <a href="/" className="logo">MIZAN</a>
        <span className="muted small">{user?.email}</span>
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
    </main>
  );
}

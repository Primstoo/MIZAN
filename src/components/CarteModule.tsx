import type { Module } from "@/lib/modules";

export default function CarteModule({ m, info, reste }: { m: Module; info?: string; reste?: number }) {
  return (
    <a href={`/app/m/${m.slug}`} className="card">
      <div className="row between">
        <span className="chip">{m.semestre}</span>
        {reste !== undefined && <span className={`chip ${reste <= 14 ? "bad" : reste <= 30 ? "amber" : ""}`}>Examen J-{reste}</span>}
      </div>
      <h3>{m.titre}</h3>
      {m.prof && <p className="muted small">{m.prof}</p>}
      <p className="small">{m.resume}</p>
      {info && <p className="small muted foot-card">{info}</p>}
    </a>
  );
}

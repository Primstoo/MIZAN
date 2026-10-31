import type { Module } from "@/lib/modules";

export default function CarteModule({ m, info, reste, estimee, pct }: { m: Module; info?: string; reste?: number; estimee?: boolean; pct?: number }) {
  return (
    <a href={`/app/m/${m.slug}`} className="card">
      <div className="row between">
        <span className="chip">{m.semestre}</span>
        {reste !== undefined && <span className={`chip ${reste <= 14 ? "bad" : reste <= 30 ? "amber" : ""}`}>Examen {estimee ? "≈ " : ""}J-{reste}</span>}
      </div>
      <h3>{m.titre}</h3>
      {m.prof && <p className="muted small">{m.prof}</p>}
      <p className="small">{m.resume}</p>
      {pct !== undefined && (
        <div className="mbar"><div className="row between small"><span>Maîtrise</span><strong>{pct} %</strong></div><div className="bar"><i style={{ width: `${pct}%` }} /></div></div>
      )}
      {info && <p className="small muted foot-card">{info}</p>}
    </a>
  );
}

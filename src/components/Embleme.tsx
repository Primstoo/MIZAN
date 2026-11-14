// Emblème dessiné de chaque cours (couverture du catalogue). Un motif et une couleur par matière.
const STYLES: Record<string, { motif: string; couleur: string }> = {
  crypto: { motif: "crypto", couleur: "var(--acc)" },
  "reseaux-m351": { motif: "reseaux", couleur: "#5F8FD0" },
  probas: { motif: "proba", couleur: "#C9952E" },
  archi: { motif: "archi", couleur: "#3FA57A" },
  uml: { motif: "uml", couleur: "#9A78C9" },
  "traitement-ad": { motif: "donnees", couleur: "#C76A8A" },
  "analyse-1": { motif: "courbe", couleur: "#D9A441" },
};
export const couleurCours = (slug: string) => STYLES[slug]?.couleur ?? "var(--acc)";

export default function Embleme({ slug, taille = 52, couleur }: { slug: string; taille?: number; couleur?: string }) {
  const s = STYLES[slug] ?? { motif: "courbe", couleur: "var(--acc)" };
  const c = couleur ?? s.couleur;
  let dessin: React.ReactNode;
  if (s.motif === "crypto") {
    dessin = <>
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={32 + 25 * Math.sin((i * Math.PI) / 6)} cy={32 - 25 * Math.cos((i * Math.PI) / 6)} r={i === 5 ? 3.4 : 2} fill={c} stroke="none" />)}
      <circle cx="32" cy="29" r="6" /><path d="M32 35v9" />
    </>;
  } else if (s.motif === "reseaux") {
    const p = [[12, 16], [52, 14], [14, 52], [50, 50]];
    dessin = <>
      {p.map(([x, y]) => <path key={`l${x}${y}`} d={`M32 33L${x} ${y}`} />)}
      <path d="M12 16L52 14M14 52L50 50" />
      {[...p, [32, 33]].map(([x, y]) => <circle key={`c${x}${y}`} cx={x} cy={y} r="5" fill={c} stroke="none" />)}
    </>;
  } else if (s.motif === "proba") {
    dessin = <>
      {[8, 18, 32, 44, 32, 18, 8].map((h, i) => <rect key={i} x={8 + i * 7.3} y={56 - h} width="5" height={h} rx="2" fill={c} stroke="none" />)}
      <path d="M4 58h56" />
    </>;
  } else if (s.motif === "archi") {
    dessin = <>
      <rect x="18" y="18" width="28" height="28" rx="4" /><rect x="27" y="27" width="10" height="10" rx="2" fill={c} stroke="none" />
      {[24, 32, 40].map((v) => <path key={v} d={`M${v} 10v8M${v} 46v8M10 ${v}h8M46 ${v}h8`} />)}
    </>;
  } else if (s.motif === "uml") {
    dessin = <><rect x="6" y="8" width="26" height="20" rx="3" /><path d="M6 15h26" /><rect x="32" y="38" width="26" height="20" rx="3" /><path d="M32 45h26" /><path d="M19 28v20h13" /></>;
  } else if (s.motif === "donnees") {
    dessin = <>
      <path d="M8 6v50h50" />
      {[[18, 44], [26, 36], [30, 42], [38, 28], [44, 32], [52, 16]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={c} stroke="none" />)}
      <path d="M14 48L56 14" strokeDasharray="3 4" />
    </>;
  } else {
    dessin = <><path d="M8 6v50h50" /><path d="M8 50C22 50 24 16 36 16S50 40 58 20" /></>;
  }
  return (
    <svg width={taille} height={taille} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      {dessin}
    </svg>
  );
}

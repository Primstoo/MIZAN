// Emblème dessiné de chaque cours (couverture du catalogue). Un motif et une couleur par matière.
const STYLES: Record<string, { motif: string; couleur: string }> = {
  crypto: { motif: "crypto", couleur: "var(--acc)" },
  "reseaux-m351": { motif: "reseaux", couleur: "#5F8FD0" },
  probas: { motif: "proba", couleur: "#C9952E" },
  archi: { motif: "archi", couleur: "#3FA57A" },
  uml: { motif: "uml", couleur: "#9A78C9" },
  "traitement-ad": { motif: "donnees", couleur: "#C76A8A" },
  "analyse-1": { motif: "courbe", couleur: "#D9A441" },
  "machine-learning": { motif: "neurones", couleur: "#5E9E8A" },
  "java-poo": { motif: "tasse", couleur: "#D9824F" },
  cms: { motif: "page", couleur: "#4FA3A5" },
  "dessin-industriel": { motif: "vues", couleur: "#6C8FB8" },
  electrocinetique: { motif: "circuit", couleur: "#7B6FD0" },
  "algo-python-2": { motif: "python2", couleur: "#2E8B6E" },
  "analyse-2": { motif: "integrale", couleur: "#A0522D" },
  "culture-digitale": { motif: "globe", couleur: "#5B7FD6" },
  "algo-python-1": { motif: "python", couleur: "#3E7CB1" },
  "algebre-1": { motif: "ensembles", couleur: "#B5644A" },
  thermodynamique: { motif: "thermo", couleur: "#D0663F" },
  "mecanique-point": { motif: "trajectoire", couleur: "#8A7A5A" },
  "prog-web-1": { motif: "balise", couleur: "#E07A3F" },
  "prog-c": { motif: "accolades", couleur: "#5C7A99" },
  se1: { motif: "terminal", couleur: "#6A8F4E" },
  "analyse-numerique": { motif: "newton", couleur: "#4E8FB0" },
  "bdd-sql": { motif: "base", couleur: "#3C8D93" },
  se2: { motif: "engrenage", couleur: "#8B6BB5" },
  javascript: { motif: "js", couleur: "#C9A227" },
  "sd-c": { motif: "liste", couleur: "#B0557A" },
  "poo-cpp": { motif: "cpp", couleur: "#4F6FB0" },
  "biologie-cellulaire": { motif: "cellule", couleur: "#5E9E5A" },
  electricite: { motif: "champ", couleur: "#C98A2E" },
  "cosmologie-geodynamique": { motif: "globe", couleur: "#9A6B3F" },
  "biologie-vegetale": { motif: "feuille", couleur: "#4E9A4A" },
  stratigraphie: { motif: "strates", couleur: "#B08A4F" },
  microbiologie: { motif: "bacterie", couleur: "#5FA0A8" },
  biochimie: { motif: "molecule", couleur: "#C0675A" },
  tectonique: { motif: "faille", couleur: "#8C6A55" },
  "reactivite-chimique": { motif: "fiole", couleur: "#3E9E8E" },
  "chimie-minerale": { motif: "cristal", couleur: "#7A6FB5" },
  "optique-radioactivite": { motif: "lentille", couleur: "#4F8FC0" },
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
  } else if (s.motif === "page") {
    dessin = <>
      <rect x="6" y="10" width="52" height="44" rx="5" /><path d="M6 21h52" />
      <circle cx="13" cy="15.5" r="1.6" fill={c} stroke="none" /><circle cx="19" cy="15.5" r="1.6" fill={c} stroke="none" />
      <rect x="13" y="28" width="16" height="18" rx="2" fill={c} stroke="none" /><path d="M35 30h16M35 37h16M35 44h10" />
    </>;
  } else if (s.motif === "vues") {
    dessin = <>
      <path d="M8 8h12v16h18v12H8z" fill={c} stroke="none" /><rect x="46" y="8" width="12" height="28" rx="1" />
      <rect x="8" y="44" width="30" height="12" rx="1" /><path d="M20 44v12M42 40l14 14" strokeDasharray="3 4" />
    </>;
  } else if (s.motif === "cellule") {
    dessin = <><ellipse cx="32" cy="32" rx="26" ry="22" /><circle cx="30" cy="30" r="9" fill={c} stroke="none" /><ellipse cx="48" cy="40" rx="5" ry="3" /><ellipse cx="16" cy="40" rx="4" ry="2.5" /><circle cx="46" cy="20" r="2" fill={c} stroke="none" /></>;
  } else if (s.motif === "feuille") {
    dessin = <><path d="M12 52C12 24 32 10 54 10c0 26-16 42-42 42z" fill={c} fillOpacity=".3" /><path d="M12 52L44 20" /></>;
  } else if (s.motif === "strates") {
    dessin = <><path d="M6 16h52M6 28h52M6 40h52M6 52h52" /><path d="M6 22h52" stroke={c} strokeWidth="5" /><circle cx="22" cy="46" r="3" fill={c} stroke="none" /></>;
  } else if (s.motif === "bacterie") {
    dessin = <><rect x="10" y="20" width="44" height="24" rx="12" fill={c} fillOpacity=".3" /><path d="M54 32c4 0 4 8 8 8" /><circle cx="26" cy="32" r="3" fill={c} stroke="none" /></>;
  } else if (s.motif === "molecule") {
    dessin = <><path d="M16 44l16-12 16 12M32 32V14" />{[[16, 44], [32, 32], [48, 44], [32, 14]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={c} stroke="none" />)}</>;
  } else if (s.motif === "faille") {
    dessin = <><path d="M6 20h22l8 10h22M6 34h22M36 44h22M28 14v40" /><path d="M6 27h22M36 37h22" stroke={c} strokeWidth="5" /></>;
  } else if (s.motif === "fiole") {
    dessin = <><path d="M26 8h12M28 8v16L14 52a4 4 0 0 0 4 5h28a4 4 0 0 0 4-5L36 24V8" /><path d="M19 42h26l4 10a3 3 0 0 1-3 4H18a3 3 0 0 1-3-4z" fill={c} stroke="none" /></>;
  } else if (s.motif === "cristal") {
    dessin = <><path d="M14 22h28v28H14zM14 22l12-10h28L42 22M42 50l12-10V12" />{[[14, 22], [42, 22], [14, 50], [42, 50], [26, 12], [54, 12], [54, 40], [28, 36]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill={c} stroke="none" />)}</>;
  } else if (s.motif === "lentille") {
    dessin = <><path d="M4 32h56" /><path d="M32 8q10 24 0 48q-10-24 0-48z" fill={c} fillOpacity=".3" /><path d="M6 20l26 12 24 14" /><path d="M6 44l26-12 24-14" /></>;
  } else if (s.motif === "champ") {
    dessin = <><circle cx="32" cy="32" r="7" fill={c} stroke="none" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const r = (a * Math.PI) / 180; return <path key={a} d={`M${32 + 12 * Math.cos(r)} ${32 + 12 * Math.sin(r)}L${32 + 26 * Math.cos(r)} ${32 + 26 * Math.sin(r)}`} />; })}</>;
  } else if (s.motif === "python2") {
    dessin = <><path d="M20 8h24v14H20zM20 42h24v14H20z" /><path d="M32 22v20M26 36l6 6 6-6" /><circle cx="27" cy="15" r="2.5" fill={c} stroke="none" /><circle cx="37" cy="49" r="2.5" fill={c} stroke="none" /></>;
  } else if (s.motif === "integrale") {
    dessin = <><path d="M36 8c-6 0-6 6-6 12v24c0 6 0 12-6 12" strokeWidth="4" /><path d="M42 44h16M42 44c4-10 10-14 16-14" /><path d="M42 44l16 0 0-14z" fill={c} stroke="none" opacity=".5" /></>;
  } else if (s.motif === "globe") {
    dessin = <><circle cx="32" cy="32" r="22" /><ellipse cx="32" cy="32" rx="10" ry="22" /><path d="M10 32h44M14 20h36M14 44h36" /><circle cx="50" cy="14" r="5" fill={c} stroke="none" /></>;
  } else if (s.motif === "neurones") {
    const cs = [[12, [16, 32, 48]], [32, [12, 26, 40, 54]], [52, [24, 40]]] as const;
    dessin = <>
      {cs[0][1].flatMap((a) => cs[1][1].map((b) => <path key={`a${a}${b}`} d={`M12 ${a}L32 ${b}`} strokeWidth="1" />))}
      {cs[1][1].flatMap((a) => cs[2][1].map((b) => <path key={`b${a}${b}`} d={`M32 ${a}L52 ${b}`} strokeWidth="1" />))}
      {cs.flatMap(([x, ys]) => ys.map((y) => <circle key={`n${x}${y}`} cx={x} cy={y} r="4" fill={c} stroke="none" />))}
    </>;
  } else if (s.motif === "tasse") {
    dessin = <><path d="M12 26h30v16a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10z" fill={c} stroke="none" /><path d="M42 30h5a6 6 0 0 1 0 12h-5M8 58h40M20 8c-3 4 3 7 0 12M29 8c-3 4 3 7 0 12" /></>;
  } else if (s.motif === "circuit") {
    dessin = <><path d="M8 32h8l3-7 6 14 6-14 6 14 3-7h6M44 20v24M50 20v24M50 32h6M8 32v20h48V32" /><circle cx="56" cy="32" r="2.5" fill={c} stroke="none" /></>;
  } else if (s.motif === "python") {
    dessin = <><rect x="6" y="10" width="52" height="44" rx="6" /><path d="M14 26l6 5-6 5M24 26l6 5-6 5M34 26l6 5-6 5" /><rect x="14" y="42" width="12" height="4" rx="2" fill={c} stroke="none" /></>;
  } else if (s.motif === "ensembles") {
    dessin = <><circle cx="24" cy="32" r="16" /><circle cx="40" cy="32" r="16" /><path d="M32 18.1a16 16 0 0 1 0 27.8a16 16 0 0 1 0-27.8z" fill={c} stroke="none" /></>;
  } else if (s.motif === "thermo") {
    dessin = <><path d="M22 10a6 6 0 0 1 12 0v28a11 11 0 1 1-12 0z" /><circle cx="28" cy="46" r="6" fill={c} stroke="none" /><path d="M28 46V20" strokeWidth="4" /><path d="M44 18c6 6-2 10 4 16M52 12c6 6-2 10 4 16" /></>;
  } else if (s.motif === "trajectoire") {
    dessin = <><path d="M6 54C18 20 42 10 58 18" strokeDasharray="3 4" /><circle cx="28" cy="27" r="5" fill={c} stroke="none" /><path d="M28 27l16-9M44 18l-6 0M44 18l-3 5" /><path d="M28 27v16M28 43l-3-5M28 43l3-5" /></>;
  } else if (s.motif === "balise") {
    dessin = <><path d="M22 18L8 32l14 14M42 18l14 14-14 14" /><path d="M36 12L28 52" stroke={c} strokeWidth="4" /></>;
  } else if (s.motif === "accolades") {
    dessin = <><path d="M22 8c-8 0-8 4-8 12s-6 12-6 12 6 0 6 12-0 12 8 12M42 8c8 0 8 4 8 12s6 12 6 12-6 0-6 12 0 12-8 12" /><text x="32" y="40" fontSize="20" fill={c} fontFamily="ui-monospace,Menlo,monospace" fontWeight="700" stroke="none" textAnchor="middle">C</text></>;
  } else if (s.motif === "terminal") {
    dessin = <><rect x="6" y="10" width="52" height="44" rx="5" /><path d="M6 20h52" /><path d="M14 30l7 5-7 5" /><rect x="26" y="40" width="14" height="4" rx="2" fill={c} stroke="none" /></>;
  } else if (s.motif === "newton") {
    dessin = <><path d="M6 44h54" /><path d="M10 58C24 52 34 36 50 8" /><path d="M20 58L58 18" strokeDasharray="3 4" /><circle cx="44" cy="44" r="3.5" fill={c} stroke="none" /><circle cx="32" cy="44" r="3.5" fill={c} stroke="none" /></>;
  } else if (s.motif === "base") {
    dessin = <><ellipse cx="32" cy="14" rx="20" ry="7" fill={c} stroke="none" /><path d="M12 14v36c0 4 9 7 20 7s20-3 20-7V14M12 26c0 4 9 7 20 7s20-3 20-7M12 38c0 4 9 7 20 7s20-3 20-7" /></>;
  } else if (s.motif === "engrenage") {
    dessin = <>
      {Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; return <path key={i} d={`M${32 + 18 * Math.cos(a)} ${32 + 18 * Math.sin(a)}L${32 + 26 * Math.cos(a)} ${32 + 26 * Math.sin(a)}`} strokeWidth="6" />; })}
      <circle cx="32" cy="32" r="18" /><circle cx="32" cy="32" r="7" fill={c} stroke="none" />
    </>;
  } else if (s.motif === "js") {
    dessin = <><rect x="8" y="8" width="48" height="48" rx="6" fill={c} stroke="none" /><text x="40" y="49" fontSize="22" fill="#fff" fontFamily="ui-monospace,Menlo,monospace" fontWeight="700" stroke="none" textAnchor="middle">JS</text></>;
  } else if (s.motif === "liste") {
    dessin = <>
      {[4, 24, 44].map((x) => <g key={x}><rect x={x} y="24" width="16" height="16" rx="3" /><rect x={x + 10} y="24" width="6" height="16" rx="2" fill={c} stroke="none" /></g>)}
      <path d="M17 32h7M37 32h7M21 29l3 3-3 3M41 29l3 3-3 3" />
    </>;
  } else if (s.motif === "cpp") {
    dessin = <><path d="M32 6l22 13v26L32 58 10 45V19z" /><text x="32" y="38" fontSize="15" fill={c} fontFamily="ui-monospace,Menlo,monospace" fontWeight="700" stroke="none" textAnchor="middle">C++</text></>;
  } else {
    dessin = <><path d="M8 6v50h50" /><path d="M8 50C22 50 24 16 36 16S50 40 58 20" /></>;
  }
  return (
    <svg width={taille} height={taille} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      {dessin}
    </svg>
  );
}

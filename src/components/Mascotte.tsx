// Les 3 mascottes de ToumaiLearn (dessins SVG fixes, sans données utilisateur).
// Toumaï : le fossile tchadien, version « fossile doux ». Fenna : la fennec. Kouri : le bœuf kouri du lac Tchad.
export type MascotteId = "toumai" | "fenna" | "kouri";
export const MASCOTTES: { id: MascotteId; nom: string }[] = [
  { id: "toumai", nom: "Toumaï" },
  { id: "fenna", nom: "Fenna" },
  { id: "kouri", nom: "Kouri" },
];
export const estMascotte = (x: unknown): x is MascotteId => x === "toumai" || x === "fenna" || x === "kouri";

const DESSINS: Record<MascotteId, string> = {
  toumai: '<g transform="scale(.5)"><ellipse cx="100" cy="186" rx="56" ry="8" fill="#E2D2B6"/>        <path d="M30 96c0-46 32-74 70-74s70 28 70 74c0 30-14 48-30 56v18c0 6-5 10-11 10H71c-6 0-11-4-11-10v-18c-16-8-30-26-30-56z" fill="#F3E6CF" stroke="#8E6A45" stroke-width="4"/>        <path d="M38 84c18-10 40-14 62-14s44 4 62 14c-2 10-8 14-16 14H54c-8 0-14-4-16-14z" fill="#D9BE94"/>        <ellipse cx="72" cy="112" rx="18" ry="17" fill="#3B2A1C"/><ellipse cx="128" cy="112" rx="18" ry="17" fill="#3B2A1C"/>        <circle cx="77" cy="106" r="6" fill="#FFF8EE"/><circle cx="133" cy="106" r="6" fill="#FFF8EE"/>        <path d="M94 134l6-8 6 8z" fill="#8E6A45"/>        <path d="M74 152q26 14 52 0" fill="none" stroke="#8E6A45" stroke-width="4" stroke-linecap="round"/>        <circle cx="56" cy="138" r="7" fill="#EDB59A" opacity=".7"/><circle cx="144" cy="138" r="7" fill="#EDB59A" opacity=".7"/></g>',
  fenna: '<path d="M14 6l24 36-16 8zM86 6L62 42l16 8z" fill="#E9B46E"/><path d="M20 16l14 22-8 4zM80 16L66 38l8 4z" fill="#F3C9C0"/><path d="M20 60c0-18 14-24 30-24s30 6 30 24-12 30-30 30-30-12-30-30z" fill="#F1C489"/><rect x="34" y="34" width="32" height="7" rx="3" fill="#1E2433"/><circle cx="50" cy="37" r="6" fill="#F7E07A" stroke="#1E2433" stroke-width="2"/><path d="M32 60q5-5 10 0M58 60q5-5 10 0" fill="none" stroke="#1E2433" stroke-width="3.4" stroke-linecap="round"/><path d="M36 74c5 9 23 9 28 0" fill="#FFF4E6"/><ellipse cx="50" cy="73" rx="4" ry="3" fill="#1E2433"/>',
  kouri: '<path d="M30 40C10 34 2 16 10 6c6 10 14 18 26 22zM70 40c20-6 28-24 20-34-6 10-14 18-26 22z" fill="#F1E6D2" stroke="#A8957A" stroke-width="2"/><path d="M22 56c0-14 12-22 28-22s28 8 28 22-8 36-28 36-28-22-28-36z" fill="#7C4E33"/><rect x="22" y="44" width="56" height="8" fill="#C9472E"/><path d="M78 46l10-4-2 10z" fill="#C9472E"/><ellipse cx="50" cy="80" rx="17" ry="11" fill="#C6967A"/><path d="M34 61h9M57 61h9" stroke="#FFF8EE" stroke-width="4" stroke-linecap="round"/><circle cx="43" cy="80" r="2.2" fill="#4A230E"/><circle cx="57" cy="80" r="2.2" fill="#4A230E"/>',
};

export default function Mascotte({ id = "toumai", taille = 48, decor = false }: { id?: MascotteId; taille?: number; decor?: boolean }) {
  const nom = MASCOTTES.find((m) => m.id === id)?.nom ?? "Toumaï";
  return (
    <svg width={taille} height={taille} viewBox="0 0 100 100" className="mascotte"
      {...(decor ? { "aria-hidden": true } : { role: "img", "aria-label": nom })}
      dangerouslySetInnerHTML={{ __html: DESSINS[id] }} />
  );
}

import type { Groupe } from "@/lib/maitrise";

// Jauge de progression : un squelette en 5 os (crâne, colonne, côtes, bras, jambes).
// Les chapitres du module sont répartis sur les 5 os. Un os est :
//  - maîtrisé si au moins 80 % des notions de ses chapitres sont maîtrisées ;
//  - fragile si au moins une notion a été travaillée ;
//  - à découvrir sinon.
type Etat = "ok" | "fragile" | "jamais";
export const OS = ["Crâne", "Colonne", "Côtes", "Bras", "Jambes"];

export function etatsOs(groupes: Groupe[]): { etat: Etat; chapitres: string[] }[] {
  const n = groupes.length;
  return OS.map((_, i) => {
    const g = n ? groupes.filter((_, j) => Math.min(4, Math.floor((j * 5) / n)) === i) : [];
    // Moins de 5 chapitres : certains os n'ont pas de chapitre propre, ils suivent le précédent.
    const lot = g.length ? g : n ? [groupes[Math.min(n - 1, Math.floor((i * n) / 5))]] : [];
    const total = lot.reduce((a, x) => a + x.total, 0), ok = lot.reduce((a, x) => a + x.ok, 0), fr = lot.reduce((a, x) => a + x.fragile, 0);
    const etat: Etat = total && ok / total >= 0.8 ? "ok" : ok + fr > 0 ? "fragile" : "jamais";
    return { etat, chapitres: g.map((x) => x.t) };
  });
}

const STYLE: Record<Etat, { c: string; d?: string }> = {
  ok: { c: "var(--os-ok)" },
  fragile: { c: "var(--os-fragile)", d: "3 3" },
  jamais: { c: "var(--os-vide)", d: "2 4" },
};

export default function Squelette({ groupes, taille = 110, titre }: { groupes: Groupe[]; taille?: number; titre: string }) {
  const os = etatsOs(groupes);
  const s = (i: number) => STYLE[os[i].etat];
  const nOk = os.filter((o) => o.etat === "ok").length;
  return (
    <svg width={taille} height={taille * 1.25} viewBox="0 0 120 150" role="img" aria-label={`${titre} : ${nOk} os sur 5 maîtrisés`}>
      <circle cx="60" cy="22" r="15" fill={s(0).c} stroke="var(--os-trait)" strokeWidth="2" strokeDasharray={s(0).d} />
      <rect x="56" y="38" width="8" height="46" rx="3" fill={s(1).c} stroke="var(--os-trait)" strokeWidth="2" strokeDasharray={s(1).d} />
      <path d="M38 50h44M40 60h40M42 70h36" stroke={s(2).c} strokeWidth="7" strokeLinecap="round" strokeDasharray={s(2).d} />
      <path d="M38 46l-14 36M82 46l14 36" stroke={s(3).c} strokeWidth="7" strokeLinecap="round" strokeDasharray={s(3).d} />
      <path d="M50 88l-8 52M70 88l8 52" stroke={s(4).c} strokeWidth="8" strokeLinecap="round" strokeDasharray={s(4).d} />
    </svg>
  );
}

export const osMaitrises = (groupes: Groupe[]) => etatsOs(groupes).filter((o) => o.etat === "ok").length;

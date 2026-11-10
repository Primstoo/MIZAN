// Ordre d'essai des modèles du tuteur.
// Avec une photo : tous les modèles Gemini d'abord (Groq ne lit pas les images), Groq en dernier recours.
// Sans photo : on alterne les deux fournisseurs, pour ne pas attendre deux fois le même fournisseur en panne.
export type Essai = { f: "gemini" | "groq"; m: string };

export function ordreDesModeles(gemini: string[], groq: string[], avecImage: boolean): Essai[] {
  const g: Essai[] = gemini.map((m) => ({ f: "gemini", m }));
  const q: Essai[] = groq.map((m) => ({ f: "groq", m }));
  if (avecImage) return [...g, ...q];
  const out: Essai[] = [];
  for (let i = 0; i < Math.max(g.length, q.length); i++) {
    if (g[i]) out.push(g[i]);
    if (q[i]) out.push(q[i]);
  }
  return out;
}

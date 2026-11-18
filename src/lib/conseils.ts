// Conseils et coups de pouce de la mascotte (banque validée par Patrick le 18/11).
// Les mêmes pour tout le monde un jour donné : ils tournent chaque jour.
export type Carte = { etiquette: string; titre?: string; texte: string; action?: { label: string; href: string } };

export const CONSEILS: Carte[] = [
  { etiquette: "Le savais-tu ?", titre: "La répétition espacée", texte: "Revoir une notion demain, puis dans 3 jours, puis dans une semaine : on retient bien mieux qu'en la relisant cinq fois.", action: { label: "Essayer avec mes cartes", href: "/app/modules" } },
  { etiquette: "Le savais-tu ?", titre: "Se tester plutôt que relire", texte: "Faire un quiz fait plus progresser que relire son cours.", action: { label: "Faire un quiz", href: "/app/modules" } },
  { etiquette: "Le savais-tu ?", titre: "La méthode Pomodoro", texte: "25 minutes de travail, 5 de pause : on reste concentré plus longtemps.", action: { label: "Lancer un pomodoro", href: "/pomodoro" } },
  { etiquette: "Le savais-tu ?", titre: "Expliquer à voix haute", texte: "Si tu sais l'expliquer à un camarade, tu l'as compris." },
  { etiquette: "Le savais-tu ?", titre: "Alterner les exercices", texte: "Mélanger les types d'exercices prépare mieux aux surprises de l'examen.", action: { label: "Voir les exercices", href: "/app/modules" } },
  { etiquette: "Le savais-tu ?", titre: "Le sommeil", texte: "C'est pendant la nuit que le cerveau range ce que tu as appris. Une nuit blanche avant l'examen coûte plus qu'elle ne rapporte." },
  { etiquette: "Le savais-tu ?", titre: "Le téléphone loin", texte: "Un téléphone visible sur la table suffit à disperser l'attention." },
  { etiquette: "Le savais-tu ?", titre: "Commencer petit", texte: "10 minutes aujourd'hui valent mieux qu'une heure « demain ».", action: { label: "Lancer 10 minutes", href: "/pomodoro?min=10" } },
  { etiquette: "Le savais-tu ?", titre: "Revoir ses erreurs", texte: "Revoir ses erreurs fait plus progresser que refaire ce qu'on sait déjà." },
  { etiquette: "Le savais-tu ?", titre: "Les annales", texte: "S'entraîner au format exact de l'examen réduit le stress le jour J." },
  { etiquette: "Le savais-tu ?", titre: "Écrire avec ses mots", texte: "Reformuler une notion avec ses propres mots aide à la retenir." },
  { etiquette: "Le savais-tu ?", titre: "Réviser tôt", texte: "Étaler sur deux semaines rapporte plus que bachoter les trois derniers jours." },
];

export const POUSSEES: string[] = [
  "Tes examens ne vont pas se préparer tout seuls.",
  "Une petite séance aujourd'hui, c'est déjà une avance sur demain.",
  "Tu n'as pas besoin d'être motivé pour commencer, il faut commencer pour être motivé.",
  "Dix minutes, c'est le temps d'un épisode de série. Et ça compte pour ta note.",
  "Le meilleur moment pour réviser, c'était hier. Le deuxième meilleur, c'est maintenant.",
  "Chaque quiz réussi, c'est une notion de moins à stresser le jour de l'examen.",
  "Pas de panique : on y va un chapitre à la fois.",
  "Ce qui se répète se retient. On revient demain ?",
];

const jour = () => Math.floor(Date.now() / 864e5);

// Trois cartes du jour : deux conseils et un coup de pouce.
export function cartesDuJour(visiteur = false): Carte[] {
  const j = jour();
  const pick = (i: number) => CONSEILS[(j * 2 + i) % CONSEILS.length];
  const cartes = [pick(0), { etiquette: "Toumaï te dit", texte: POUSSEES[j % POUSSEES.length] }, pick(1)];
  // Un visiteur n'a pas accès à /app/modules : on l'envoie vers les cours ouverts.
  return visiteur ? cartes.map((c) => (c.action?.href.startsWith("/app") ? { ...c, action: { ...c.action, href: "/decouvrir" } } : c)) : cartes;
}

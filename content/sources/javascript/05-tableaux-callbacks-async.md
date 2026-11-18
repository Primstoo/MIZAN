---
id: tableaux-callbacks
titre: Tableaux (map, filter, reduce), callbacks et Event Loop
seance: Séance 3 · Tableaux, objets et fonctions avancées (2/2)
importance: 5
---

## Avant de commencer

Il faut savoir écrire une fonction qui reçoit un paramètre et renvoie une valeur (chapitre 3).

```exercice Vérifie ton prérequis
? Que renvoie `function double(x) { return x * 2; }` pour `double(21)` ?
reponse: 42
= 42. Dans ce chapitre, on va **passer** `double` à une autre fonction au lieu de l'appeler nous-mêmes.
```

## Comment aborder ce chapitre

> [!astuce] Avant `map`, `filter`, `find`, `reduce`, pose-toi une question : **qu'est-ce que je veux à la fin ?** Un tableau de même taille → `map`. Un sous-tableau → `filter`. Un seul élément → `find`. Une seule valeur (somme, total) → `reduce`.

> [!piege] Oublier `return` dans un callback entre accolades : `t.map(x => { x * 2 })` donne `[undefined, undefined, ...]`. Sans accolades, le retour est implicite.

À la fin, tu sais transformer un tableau sans boucle, écrire des callbacks et des fléchées, et prévoir l'ordre d'affichage d'un code avec `setTimeout(..., 0)`.

## Idée 1 · Créer un tableau

- Littéral (standard) : `const ports = [80, 443, 8080];`
- `new Array(100)` : 100 cases vides (rare).
- `Array.from("CODE")` : tableau à partir d'un itérable → `["C", "O", "D", "E"]`.

Méthodes de base utiles en TD et examen : `push` (ajoute à la fin), `pop`, `length`, `includes`, `indexOf`, `sort`.

```javascript
const t = [12, 3, 90, 7, 99];
console.log([...t].sort());
console.log([...t].sort((a, b) => a - b));
console.log([...t].sort((a, b) => b - a));
```

```sortie
[ 12, 3, 7, 90, 99 ]
[ 3, 7, 12, 90, 99 ]
[ 99, 90, 12, 7, 3 ]
```

> [!piege] `sort()` sans argument trie **comme du texte** ("12" avant "3"). Pour des nombres : `(a, b) => a - b` (croissant) ou `(a, b) => b - a` (décroissant). C'est la question 5 de l'examen 2025. Attention aussi : `sort` **modifie** le tableau (d'où la copie `[...t]`).

## Idée 2 · map, filter, find, reduce

```grille Ce que renvoie chaque méthode sur [100, 250, 400]
#cols: appel | résultat | taille
#rows: map | filter | find | reduce
p => p * 1.2 | *[120, 300, 480] | 3
p => p > 200 | *[250, 400] | 2 (ou [])
p => p > 200 | *250 | 1 élément (ou undefined)
(acc, p) => acc + p, 0 | *750 | 1 valeur
```

Aucune de ces méthodes ne modifie le tableau d'origine.

```javascript
const parcServeurs = [
  { id: "SRV-01", statut: "actif", charge: 85 },
  { id: "SRV-02", statut: "inactif", charge: 0 },
  { id: "SRV-03", statut: "actif", charge: 92 },
  { id: "SRV-04", statut: "maintenance", charge: 10 }
];
const actifs = parcServeurs.filter(s => s.statut === "actif");
const ids = actifs.map(s => s.id);
const total = parcServeurs.reduce((acc, s) => acc + s.charge, 0);
const critique = parcServeurs.find(s => s.charge > 90);
console.log(ids);
console.log(total);
console.log(critique.id);
```

```sortie
[ 'SRV-01', 'SRV-03' ]
187
SRV-03
```

C'est l'exercice 1 du TD 2.

```etapes Comment reduce calcule 187
Départ :: l'accumulateur vaut la valeur initiale 0.
SRV-01 :: 0 + 85 = 85.
SRV-02 :: 85 + 0 = 85.
SRV-03 :: 85 + 92 = 177.
SRV-04 :: 177 + 10 = 187. Fin : reduce renvoie 187.
```

> [!prof] Toujours donner la **valeur initiale** de `reduce` (le `0`). Sans elle, `[].reduce(...)` lève une TypeError.

## Idée 3 · Callbacks et fonctions fléchées

Un **callback** est une fonction A passée en argument à une fonction B, qui décide **quand** l'appeler (**inversion de contrôle**). En JS, les fonctions sont des **citoyens de première classe** : on les range dans des variables, on les passe, on les renvoie.

```javascript
function traiterTransactionFlexible(montant, actionSuivante) {
  const total = montant * 1.2;
  actionSuivante(total);
}
function archiver(m) { console.log("Archivé : " + m); }
function envoyerSMS(m) { console.log("SMS envoyé pour : " + m); }

traiterTransactionFlexible(100, archiver);
traiterTransactionFlexible(500, envoyerSMS);
```

```sortie
Archivé : 120
SMS envoyé pour : 600
```

La même fonction de calcul sert deux scénarios : c'est la **séparation des préoccupations**. Appeler `archiver` directement dans la fonction l'aurait rendue rigide.

Les trois écritures d'un même callback :

```flux Du plus long au plus court
function(prix) { return prix * 1.2; } -> (prix) => { return prix * 1.2; } -> prix => prix * 1.2
```

Une fléchée **n'a pas son propre `this`** : elle prend celui du contexte où elle est écrite (portée lexicale). C'est utile dans un `setTimeout` à l'intérieur d'une méthode :

```javascript
const serveur = {
  nom: "Serveur_DB",
  demarrer() {
    setTimeout(function () { console.log("classique : " + this.nom); }, 0);
    setTimeout(() => { console.log("fléchée : " + this.nom); }, 0);
  }
};
serveur.demarrer();
```

```sortie
classique : undefined
fléchée : Serveur_DB
```

## Idée 4 · Call Stack, Web APIs, Task Queue, Event Loop

```html
<svg viewBox="0 0 600 210" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Le callback de setTimeout passe de la Call Stack aux Web APIs, puis à la Task Queue ; l'Event Loop le remet dans la pile quand elle est vide">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="20" y="30" width="150" height="150" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="95" y="22" font-weight="700">Call Stack (LIFO)</text>
<rect x="35" y="140" width="120" height="28" rx="4" fill="none" stroke="currentColor"/><text x="95" y="159">global</text>
<rect x="225" y="30" width="150" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="22" font-weight="700">Web APIs</text><text x="300" y="70">timer 0 ms</text>
<rect x="425" y="30" width="155" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="502" y="22" font-weight="700">Task Queue (FIFO)</text><text x="502" y="70" fill="#D9824F" font-weight="700">callback</text>
<text x="300" y="165" fill="#D9824F" font-weight="700">Event Loop : pile vide ? alors push</text></g>
<line x1="170" y1="60" x2="222" y2="60" stroke="currentColor" stroke-width="2"/>
<line x1="375" y1="65" x2="422" y2="65" stroke="currentColor" stroke-width="2"/>
<path d="M500 100 C500 160 300 190 172 150" fill="none" stroke="#D9824F" stroke-width="3"/>
</svg>
```

- **Call Stack** (LIFO) : chaque appel fait un *push*, chaque `return` un *pop*. Une récursion sans fin la sature (*stack overflow*).
- **Web APIs** : le navigateur (ou Node) gère en arrière-plan les tâches longues (timers, réseau).
- **Task Queue** (FIFO) : les callbacks terminés y attendent leur tour.
- **Event Loop** : si (et seulement si) la pile est **vide**, elle prend le premier callback de la file et le pousse dans la pile.

```javascript
console.log("A - Initialisation du système");
setTimeout(() => {
  console.log("B - Nettoyage de la mémoire terminé");
}, 0);
console.log("C - Démarrage des processus");
```

```sortie
A - Initialisation du système
C - Démarrage des processus
B - Nettoyage de la mémoire terminé
```

> [!retenir] **0 ms ne veut pas dire « tout de suite ».** Le callback passe forcément par la Task Queue, et attend que tout le code synchrone soit fini. Ordre : A, C, B (TD 2, ex. 4).

> [!attention] Une diapo dit que l'Event Loop est « intégrée au moteur ». Plus précisément, elle est fournie par le **runtime** (navigateur ou Node.js), pas par V8 lui-même, comme les Web APIs.

## S'exercer

```exercice Exercices type examen 2025 et TD 2
? (Examen 2025, ex. 2) `const T1 = [12, 3, 90, 7, 99, 145, 5, 13, 88, 9];` Écris une fonction nominale qui renvoie les éléments strictement inférieurs à 100, une qui renvoie les pairs, une fléchée qui renvoie la somme, une fléchée qui trie par ordre décroissant.
= `function inferieursA100(t) { return t.filter(x => x < 100); }` → [12, 3, 90, 7, 99, 5, 13, 88, 9]. `function pairs(t) { return t.filter(x => x % 2 === 0); }` → [12, 90, 88]. `const somme = t => t.reduce((a, x) => a + x, 0);` → 471. `const trierDec = t => [...t].sort((a, b) => b - a);` → [145, 99, 90, 88, 13, 12, 9, 7, 5, 3].

? Que vaut la somme des éléments de T1 ?
reponse: 471
= 12+3+90+7+99+145+5+13+88+9 = 471.

? (TD 2, ex. 3) Écris `analyserFichier(nomFichier, callbackResolution)` qui affiche « Analyse en cours... » puis appelle le callback, et deux callbacks `archiver` et `alerterSecurite`.
= `function analyserFichier(nomFichier, callbackResolution) { console.log("Analyse en cours..."); callbackResolution(nomFichier); }` ; `function archiver(f) { console.log("Archivé : " + f); }` ; `function alerterSecurite(f) { console.log("Alerte sécurité : " + f); }` ; puis `analyserFichier("rapport.pdf", archiver); analyserFichier("virus.exe", alerterSecurite);`. La fonction hôte ne sait pas ce que fait le callback : elle est réutilisable.
```

## Flashcards

```cartes
map renvoie… :: Un nouveau tableau de même taille, chaque élément transformé.
filter renvoie… :: Un nouveau tableau avec les éléments qui passent le test (peut être vide).
find renvoie… :: Le premier élément qui passe le test, ou undefined.
reduce(fn, 0) :: Une seule valeur, construite avec un accumulateur qui part de 0.
sort() sans argument sur des nombres :: Tri alphabétique ! Utiliser (a, b) => a - b.
Callback :: Fonction passée en argument à une autre, qui décide quand l'appeler (inversion de contrôle).
this dans une fléchée :: Celui du contexte englobant (lexical) : la fléchée n'a pas son propre this.
Ordre de A ; setTimeout(B, 0) ; C :: A, C, B.
Event Loop, condition :: Pousse un callback de la Task Queue seulement quand la Call Stack est vide.
Call Stack et Task Queue :: Pile LIFO ; file FIFO.
```

## QCM du chapitre

```qcm
? `[1, 2, 3].map(x => x * 10)` renvoie :
+ [10, 20, 30]
- 60
- [1, 2, 3]
= map transforme chaque élément et renvoie un nouveau tableau.

? `[5, 12, 8].filter(x => x > 6)` renvoie :
- 12
+ [12, 8]
- [true, false, true]
= filter garde les éléments pour lesquels le callback renvoie true.

? `[5, 12, 8].find(x => x > 6)` renvoie :
+ 12
- [12, 8]
- 8
= find s'arrête au premier élément qui convient.

? `[1, 2, 3].reduce((a, x) => a + x, 0)` vaut :
- [1, 3, 6]
+ 6
- 0
= Somme accumulée à partir de 0.

? `[10, 9, 100].sort()` donne :
+ [10, 100, 9]
- [9, 10, 100]
- [100, 10, 9]
= Sans comparateur, le tri est alphabétique : "10" < "100" < "9".

? Quel comparateur trie par ordre décroissant ?
- (a, b) => a - b
+ (a, b) => b - a
- (a, b) => a > b
= b − a positif quand b > a : b passe devant.

? `t.map(x => { x * 2 })` renvoie :
- les doubles
+ un tableau de undefined
- une erreur
= Avec des accolades, il faut écrire return.

? Ordre d'affichage : `console.log(1); setTimeout(() => console.log(2), 0); console.log(3);`
- 1 2 3
+ 1 3 2
- 2 1 3
= Le callback attend dans la Task Queue que la pile soit vide.

? Quelle structure est LIFO ?
+ La Call Stack
- La Task Queue
- Le Heap
= Dernier entré, premier sorti. La Task Queue est FIFO.

? Pourquoi utiliser une fléchée dans un `setTimeout` à l'intérieur d'une méthode ?
- Elle est plus rapide
+ Elle garde le this de la méthode
- Elle évite la Task Queue
= Une fonction classique aurait son propre this (global/undefined).
```

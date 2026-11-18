---
id: controle-fonctions
titre: Conditions, boucles et fonctions
seance: Séance 2 · Syntaxe et fondamentaux (2/2)
importance: 5
---

## Avant de commencer

Tu connais `if`, `for` et `while` en C : la syntaxe est presque la même. Ce chapitre insiste sur ce qui est **propre à JS** : valeurs truthy/falsy, `for...of` / `for...in`, arguments manquants.

```exercice Vérifie ton prérequis
? Combien de fois s'affiche « Connexion... » ? `let t = 0; while (t < 3) { console.log("Connexion..."); t++; }`
reponse: 3
= 3 fois (t vaut 0, 1, 2). Sans `t++`, la boucle serait infinie et figerait le thread principal.
```

## Comment aborder ce chapitre

> [!astuce] Avant de lire un `if`, demande-toi : **cette valeur est-elle falsy ?** La liste des valeurs fausses est courte et fermée. Tout le reste est vrai.

> [!piege] Oublier `break` dans un `switch`. Sans lui, l'exécution « tombe » dans les `case` suivants (fall-through). C'est l'exercice 2 B du TD 1.

À la fin, tu sais choisir la bonne boucle, écrire un `switch` correct, et sécuriser une fonction avec des paramètres par défaut.

## Idée 1 · Conditions, truthy/falsy, switch, ternaire

`if / else if / else` : le moteur teste de haut en bas et **sort dès qu'une condition est vraie**.

```grille Les 6 valeurs falsy (tout le reste est truthy)
#cols: valeur
#rows: 1 | 2 | 3 | 4 | 5 | 6
*false
*0
*"" (chaîne vide)
*null
*undefined
*NaN
```

> [!piege] `[]`, `{}`, `"0"` et `"false"` sont **truthy**. Pour tester un tableau vide, écris `if (tab.length === 0)`.

Le `switch` compare avec `===` (pas de conversion) :

```javascript
const niveauAcces = "Moderateur";
switch (niveauAcces) {
  case "Admin":
    console.log("Accès total");
    break;
  case "Moderateur":
    console.log("Accès édition");
    break;
  case "Invite":
    console.log("Accès lecture seule");
    break;
  default:
    console.log("Accès refusé");
}
```

```sortie
Accès édition
```

Le **ternaire** `condition ? siVrai : siFaux` sert à une affectation simple : `const statut = age >= 18 ? "Majeur" : "Mineur";`. Ne pas les imbriquer.

## Idée 2 · Les boucles et break / continue

```grille Quelle boucle choisir ?
#cols: Quand l'utiliser | break / continue ?
#rows: while | do...while | for | forEach | for...of | for...in
nombre de tours inconnu | oui
au moins un tour garanti (menu) | oui
*nombre de tours connu | *oui
effet sur chaque élément d'un tableau | ~non : impossible de l'arrêter
*valeurs d'un tableau, d'une chaîne | *oui
clés d'un objet | oui (jamais sur un tableau)
```

`continue` saute le tour en cours ; `break` arrête toute la boucle.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;
  if (i === 7) break;
  console.log("Traitement du lot :", i);
}
```

```sortie
Traitement du lot : 0
Traitement du lot : 1
Traitement du lot : 2
Traitement du lot : 4
Traitement du lot : 5
Traitement du lot : 6
```

`for...of` donne les **valeurs**, `for...in` les **clés** :

```javascript
const serveurs = ["Web", "BDD"];
for (const nom of serveurs) console.log("valeur :", nom);

const config = { host: "localhost", port: 5432 };
for (const cle in config) console.log(cle, "=>", config[cle]);

for (const i in serveurs) console.log(typeof i);
```

```sortie
valeur : Web
valeur : BDD
host => localhost
port => 5432
string
string
```

La dernière boucle montre pourquoi `for...in` sur un tableau est déconseillé : les indices arrivent sous forme de **chaînes** `"0"`, `"1"`.

> [!attention] Sur la diapo, le commentaire dit que `const` convient dans `for (const x of ...)` « car la variable est réaffectée à chaque cycle ». C'est l'inverse : à chaque tour, une **nouvelle** variable est créée ; elle n'est jamais réaffectée, c'est pour ça que `const` est permis. Dans un `for (let i = 0; ...; i++)` classique, `const` est interdit car `i++` réaffecte.

## Idée 3 · Fonctions : déclaration, appel, arguments

```flux Ce qui se passe à l'appel
appel f(…) -> push du contexte dans la Call Stack -> exécution -> return : valeur renvoyée -> pop du contexte
```

- **Déclaration** : `function nom(params) { ... }` enregistre la fonction ; rien ne s'exécute. Elle est **hissée** : on peut l'appeler avant sa ligne.
- **Appel** : `nom(args)`. Sans les parenthèses, `nom` désigne la fonction elle-même, sans l'exécuter.
- **Paramètres** (dans la signature) vs **arguments** (valeurs passées à l'appel).
- Sans `return`, une fonction renvoie `undefined`. Après `return`, le code est mort.

JS **ne vérifie pas** le nombre d'arguments : il manque → `undefined` ; il y en a trop → ignorés.

```javascript
function calculerCout(prix, quantite, fraisPort) {
  return prix * quantite + fraisPort;
}
console.log(calculerCout(100, 2, 10));
console.log(calculerCout(100));
console.log(calculerCout(100, 2, 10, "CodePromo"));

function calculerCoutSecurise(prix, quantite = 1, fraisPort = 0) {
  return prix * quantite + fraisPort;
}
console.log(calculerCoutSecurise(100));
```

```sortie
210
NaN
210
100
```

> [!retenir] **Paramètres par défaut (ES6)** = programmation défensive : `function f(a = 0, b = 0)`. Ils évitent la cascade `undefined` → `NaN`.

> [!attention] Une diapo qualifie le hoisting de « comportement asynchrone ». Le mot est mal choisi : le hoisting vient de la phase de **création** (le moteur lit les déclarations avant d'exécuter). Cela n'a rien à voir avec l'asynchronisme (Event Loop, chapitre 5).

## S'exercer

```exercice Exercices type TD 1 et TP 1
? (TD 1, ex. 1.2) `console.log(initialisationApp()); function initialisationApp() { let statut = "Actif"; return statut; } console.log(statut);` : que se passe-t-il ?
= Ligne 1 : affiche `Actif`. La déclaration de fonction est hissée entièrement, on peut l'appeler avant. Dernière ligne : `ReferenceError: statut is not defined`. `statut` est locale à la fonction, invisible depuis la portée globale.

? (TD 1, ex. 3) `const transactions = [102, 105, "erreur", 108, 110, 404, 115];` Avec un `for` classique : ignorer ce qui n'est pas un nombre, s'arrêter à 404, afficher les autres.
= On utilise `continue` pour filtrer et `break` pour couper :
`for (let i = 0; i < transactions.length; i++) { if (typeof transactions[i] !== "number") continue; if (transactions[i] === 404) break; console.log(transactions[i]); }`
Affiche 102, 105, 108, 110. 115 n'est jamais atteint.

? (TD 1, ex. 4) Écris `calculerSalaireNet(tauxHoraire, heuresTravaillees, bonus)`. Par défaut : taux 15, heures 0, bonus 0. Brut = taux × heures. Net = brut − 20 % + bonus. Elle **retourne** le net. Que vaut `calculerSalaireNet(20, 100)` ?
reponse: 1600
= `function calculerSalaireNet(tauxHoraire = 15, heuresTravaillees = 0, bonus = 0) { const brut = tauxHoraire * heuresTravaillees; return brut * 0.8 + bonus; }`. Brut = 2000, net = 1600 + 0 = 1600. L'appel vide `calculerSalaireNet()` donne 0, pas `NaN`.
```

## Flashcards

```cartes
Les 6 valeurs falsy :: false, 0, "" (chaîne vide), null, undefined, NaN.
[] et {} dans un if :: Truthy ! Tester tab.length ou Object.keys(obj).length.
switch : quel type d'égalité ? :: Stricte (===).
Rôle de break dans un switch :: Empêche le fall-through (exécution des case suivants).
forEach et break :: Impossible : forEach ne peut pas être interrompu.
for...of vs for...in :: of → valeurs (tableaux, chaînes, Map, Set). in → clés d'un objet.
Fonction appelée avec trop peu d'arguments :: Les paramètres manquants valent undefined (souvent NaN au calcul).
Valeur renvoyée sans return :: undefined.
maFonction vs maFonction() :: Sans () : la fonction elle-même. Avec () : on l'exécute.
```

## QCM du chapitre

```qcm
? Laquelle de ces valeurs est **truthy** ?
- 0
- ""
+ "0"
- NaN
= Une chaîne non vide est vraie, même si elle contient "0".

? Dans un `switch` sans `break`, que se passe-t-il quand un `case` correspond ?
- Seul ce case s'exécute
+ Ce case et tous les suivants s'exécutent
- Erreur de syntaxe
= C'est le fall-through.

? Quelle boucle exécute son bloc **au moins une fois** ?
- while
+ do...while
- for
= La condition est testée à la fin du tour.

? Peut-on arrêter un `forEach` avec `break` ?
- Oui
+ Non, c'est une erreur de syntaxe ou c'est ignoré
- Oui, avec return
= `forEach` parcourt toujours tout. `return` ne fait que passer à l'élément suivant.

? `for (const i in ["a", "b"])` donne `i` de type :
- number
+ string
- undefined
= for...in énumère des clés, toujours sous forme de chaînes.

? `function f(a, b) { return a + b; }` puis `f(2)` renvoie :
- 2
+ NaN
- TypeError
= b vaut undefined, et 2 + undefined donne NaN.

? Comment rendre `b` optionnel à 0 ?
+ `function f(a, b = 0)`
- `function f(a, b ?= 0)`
- `function f(a, optional b)`
= Paramètre par défaut ES6.

? Une fonction déclarée avec `function nom() {}` peut être appelée :
+ avant sa ligne de définition (hoisting)
- seulement après sa définition
- seulement dans un bloc
= Les déclarations de fonction sont hissées entièrement.

? `const r = age >= 18 ? "Majeur" : "Mineur";` avec age = 16 donne :
- "Majeur"
+ "Mineur"
- undefined
= La condition est fausse, on prend la troisième partie.

? Que vaut `typeof f` pour une fonction `f`, et que fait `f` sans parenthèses ?
+ "function" ; rien n'est exécuté
- "object" ; la fonction s'exécute
- "undefined" ; erreur
= Sans (), on manipule la fonction comme une valeur.
```

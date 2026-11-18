---
id: variables-types
titre: Variables, types et opérateurs
seance: Séance 2 · Syntaxe et fondamentaux (1/2)
importance: 5
---

## Avant de commencer

Tu as déjà déclaré des variables en C ou en Python. Ici, la nouveauté est qu'il existe **trois** mots-clés (`var`, `let`, `const`) qui ne se comportent pas pareil.

```exercice Vérifie ton prérequis
? En C, `int a = 5; int b = a; b = 7;` : que vaut `a` à la fin ?
= `a` vaut toujours 5. L'affectation `b = a` copie la **valeur**. En JavaScript, c'est pareil pour les nombres et les chaînes, mais **pas** pour les objets et les tableaux (Idée 3).
```

## Comment aborder ce chapitre

> [!astuce] Raisonne toujours avec deux questions : **où vit la variable ?** (portée) et **peut-elle changer ?** (mutabilité). `const` par défaut, `let` si la valeur doit changer, `var` jamais.

> [!piege] Écrire `==` au lieu de `===`. `1 == "1"` vaut `true` car JS convertit en silence. Le prof est clair : `===` toujours.

À la fin, tu sais choisir entre `let` et `const`, prévoir ce qu'affiche un code avec hoisting, distinguer primitive et référence, et prévoir une coercition (`5 + "5"`).

## Idée 1 · var, let, const et la portée

La **portée** (scope) dit où une variable est visible. Globale (racine du fichier, visible partout : risque de collisions) ou locale (fonction ou bloc `{}`).

```grille Les trois déclarations
#cols: Portée | Réassignation | Accès avant la déclaration
#rows: var | let | const
fonction (ignore les blocs) | oui | undefined (hoisting)
*bloc {} | *oui | *ReferenceError (TDZ)
*bloc {} | ~non : TypeError | *ReferenceError (TDZ)
```

`var` « fuit » hors d'un `for` ou d'un `if` :

```javascript
for (var i = 0; i < 3; i++) {}
console.log("var après la boucle :", i);

for (let j = 0; j < 3; j++) {}
console.log(typeof j);
```

```sortie
var après la boucle : 3
undefined
```

`typeof j` donne `"undefined"` : `j` n'existe pas hors de la boucle.

## Idée 2 · Le hoisting et la zone morte (TDZ)

Avant d'exécuter, le moteur parcourt le code et enregistre les déclarations. Avec `var`, **la déclaration est hissée, pas la valeur**.

```javascript
function calculerTotal() {
  console.log(total);
  var total = 50;
  console.log(total);
}
calculerTotal();
```

```sortie
undefined
50
```

Le moteur l'a lu comme : `var total; console.log(total); total = 50; ...`.

Avec `let` et `const`, la variable est aussi enregistrée, mais placée dans une **Temporal Dead Zone** jusqu'à sa ligne : y accéder lève une erreur. C'est le principe **fail-fast** : mieux vaut planter tout de suite que continuer avec `undefined`.

```javascript
try {
  console.log(prix);
  let prix = 100;
} catch (e) {
  console.log(e.name);
}
```

```sortie
ReferenceError
```

> [!retenir] `var` → `undefined` en silence. `let`/`const` → `ReferenceError`. Une **déclaration de fonction** (`function f() {}`) est hissée **entièrement** : on peut l'appeler avant sa ligne.

## Idée 3 · Primitives (valeur) et références

```html
<svg viewBox="0 0 560 200" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Deux variables obj1 et obj2 dans la pile pointent vers le même objet dans le tas ; deux nombres a et b ont chacun leur copie">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<text x="90" y="22" text-anchor="middle" font-weight="700">Pile (Stack)</text>
<text x="420" y="22" text-anchor="middle" font-weight="700">Tas (Heap)</text>
<rect x="20" y="35" width="140" height="30" rx="5" fill="none" stroke="currentColor"/><text x="30" y="55">a = 5</text>
<rect x="20" y="70" width="140" height="30" rx="5" fill="none" stroke="currentColor"/><text x="30" y="90">b = 5 (copie)</text>
<rect x="20" y="120" width="140" height="30" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="30" y="140">obj1 → @A1</text>
<rect x="20" y="155" width="140" height="30" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="30" y="175">obj2 → @A1</text>
<rect x="330" y="120" width="180" height="65" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="345" y="145">@A1</text><text x="345" y="168">{ solde: 5000 }</text></g>
<line x1="160" y1="135" x2="328" y2="145" stroke="#D9824F" stroke-width="2"/>
<line x1="160" y1="170" x2="328" y2="160" stroke="#D9824F" stroke-width="2"/>
</svg>
```

- **Primitives** : `number`, `bigint`, `string`, `boolean`, `undefined` (déclarée, sans valeur), `null` (vide **volontaire**), `symbol`. Taille fixe, copiées **par valeur**.
- **Références** : objets `{}`, tableaux `[]`, fonctions. Stockées dans le tas ; la variable ne garde que **l'adresse**.

```javascript
let a = 5;
let b = a;
b = 7;
console.log(a, b);

const compte1 = { solde: 5000 };
const compte2 = compte1;
compte2.solde = 0;
console.log(compte1.solde);
```

```sortie
5 7
0
```

> [!piege] `const compte2 = compte1` ne copie **pas** l'objet (copie superficielle de la référence). Modifier `compte2` modifie `compte1`. Et `const` interdit seulement de **réassigner** la variable : `compte2.solde = 0` est permis.

## Idée 4 · Coercition et opérateurs

Le typage est **faible** : face à deux types différents, JS convertit au lieu de planter.

```javascript
console.log(5 + "5");
console.log(5 - "2");
console.log("3" * "4");
console.log(1 == "1", 1 === "1");
console.log(typeof null, typeof undefined, typeof NaN);
```

```sortie
55
3
12
true false
object undefined number
```

> [!retenir] `+` avec **au moins une chaîne** → concaténation. `-`, `*`, `/` → conversion en nombre. `===` compare **valeur et type**, sans conversion.

Les quatre familles d'opérateurs : arithmétiques (`+ - * / %`), affectation (`= += -=`), comparaison (`== === != !== > <`), logiques (`&& || !`).

Les logiques sont **court-circuités** : dans `a && b`, si `a` est faux, `b` n'est même pas évalué.

```javascript
let appels = 0;
function verifier() { appels++; return true; }
const r = false && verifier();
console.log(r, appels);
```

```sortie
false 0
```

Conventions de nommage vues en cours : `camelCase` (variables, fonctions), `PascalCase` (classes), `SNAKE_CASE` majuscule (constantes, ex. `TAUX_TVA`), `kebab-case` (classes CSS, pas d'identifiant JS car `-` est une soustraction).

## S'exercer

```exercice Exercices type TD 1
? (TD 1, ex. 1.1) Où sont stockées une primitive et une référence ? Que contient la variable dans chaque cas ?
= Une primitive (String, Number…) est stockée dans la **pile** : la variable contient la valeur elle-même, taille fixe, accès rapide. Pour une référence (Object, Array), l'objet est alloué dans le **tas** ; la variable, dans la pile, ne contient que son **adresse**.

? (TD 1, ex. 2 A) `const codeSaisi = "404"; if (codeSaisi == 404) {...}`. Quelle est la faille ? Corrige.
= `==` provoque une conversion implicite (la chaîne devient un nombre) : la condition passe alors que les types diffèrent. Correction : `if (codeSaisi === "404")`, ou conversion explicite `if (Number(codeSaisi) === 404)`.

? Que vaut `"10" - 3 + "1"` ?
indice: De gauche à droite : d'abord `-`, puis `+`.
reponse: 71
= `"10" - 3` donne le nombre 7 (le `-` convertit). Puis `7 + "1"` concatène : `"71"`.
```

## Flashcards

```cartes
var, let, const : portées :: var → fonction (ignore les blocs). let et const → bloc {}.
Accès à une var avant sa déclaration :: undefined (seule la déclaration est hissée).
Accès à un let avant sa déclaration :: ReferenceError : la variable est dans la Temporal Dead Zone.
Règle d'or du prof sur const :: const par défaut ; let seulement si la valeur doit changer (ex. compteur de boucle).
Les 7 types primitifs :: number, bigint, string, boolean, undefined, null, symbol.
undefined vs null :: undefined : déclarée sans valeur (état par défaut du moteur). null : vide volontaire, mis par le développeur.
5 + "5" et 5 - "2" :: "55" (concaténation) et 3 (conversion en nombre).
== vs === :: == compare après conversion. === compare valeur ET type, sans conversion.
let b = obj (objet) copie quoi ? :: Seulement la référence : les deux variables pointent vers le même objet.
```

## QCM du chapitre

```qcm
? Quelle déclaration a une portée de **fonction** et ignore les blocs ?
+ var
- let
- const
= `var` ne respecte pas les accolades d'un `if` ou d'un `for` : elle « fuit » dans toute la fonction.

? Que fait `const x = 1; x = 2;` ?
- x vaut 2
+ TypeError : assignation à une constante
- ReferenceError
= `const` verrouille l'identifiant : toute réassignation lève une TypeError.

? `console.log(n); var n = 3;` affiche :
- 3
+ undefined
- ReferenceError
= La déclaration `var n` est hissée, l'affectation reste à sa place.

? `console.log(n); let n = 3;` donne :
- undefined
- 3
+ ReferenceError (TDZ)
= `let` est dans la zone morte temporelle jusqu'à sa ligne : échec rapide.

? Que vaut `5 + "5"` ?
- 10
+ "55"
- NaN
= Avec une chaîne, `+` concatène.

? Que vaut `5 - "2"` ?
+ 3
- "52"
- NaN
= `-` force la conversion en nombre.

? `1 === "1"` vaut :
- true
+ false
- TypeError
= Égalité stricte : types différents, donc false.

? `const t = [1, 2]; t.push(3);` est-il valide ?
+ Oui : const interdit la réassignation, pas la modification du contenu
- Non : TypeError
- Non : ReferenceError
= La variable pointe toujours vers le même tableau ; seul son contenu change.

? `typeof null` renvoie :
- "null"
+ "object"
- "undefined"
= C'est une bizarrerie historique de JavaScript : null est pourtant une primitive.

? Dans `false && f()`, la fonction `f` :
- est appelée une fois
+ n'est pas appelée (court-circuit)
- provoque une erreur
= Le résultat est déjà connu (faux), la suite n'est pas évaluée.
```

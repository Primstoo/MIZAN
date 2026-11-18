---
id: revision-examen
titre: Révision et examen blanc
seance: Préparation à l'examen (session 1, 1h30)
importance: 5
---

## Avant de commencer

Ce chapitre suppose tout le module lu. L'examen 2025 (session 1, 1h30) comptait **4 exercices** : questions de cours courtes, fonctions sur un tableau, DOM sur une todo-list, `fetch` sur trois serveurs.

```exercice Vérifie ton prérequis
? Sans regarder : cite les 4 méthodes de tableau du cours et ce que chacune renvoie.
= `map` → nouveau tableau de même taille ; `filter` → sous-tableau ; `find` → premier élément (ou undefined) ; `reduce` → une seule valeur. Si tu as hésité, relis le chapitre 5 avant l'examen blanc.
```

## Comment aborder ce chapitre

> [!astuce] Fais l'examen blanc **en 1h30, sur papier**, sans exécuter. L'examen se passe sans ordinateur : écrire du JS juste à la main, ça s'entraîne. Ensuite seulement, compare avec le corrigé et exécute.

> [!piege] Perdre des points sur les détails de syntaxe vus en Q1 de 2025 : nom de variable invalide (`maVariable+`), `const` réassignée, `sort()` sans comparateur, `#` pour le privé.

À la fin, tu as fait un examen complet dans les conditions réelles et tu sais où sont tes points faibles.

## Idée 1 · La fiche de révision en une page

```grille Les 12 réflexes qui rapportent des points
#cols: réflexe
#rows: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
*const par défaut, let si mutation, jamais var
*=== et !== toujours
var → undefined avant la ligne ; let/const → ReferenceError (TDZ)
falsy : false, 0, "", null, undefined, NaN
objets et tableaux copiés par référence
*map / filter / find / reduce(…, 0)
sort((a, b) => a - b) pour des nombres
setTimeout(…, 0) passe après tout le code synchrone
*textContent pour les données utilisateur (XSS)
*délégation : un écouteur sur le parent + closest
JSON.stringify pour stocker, JSON.parse pour relire
*fetch : tester res.ok, deux await, try/catch/finally
```

Noms de variables : une lettre, `_` ou `$` en premier, puis lettres, chiffres, `_`, `$`. Donc `maVariable` et `$maVariable` sont valides ; `maVariable+` ne l'est pas.

## Idée 2 · L'exercice type « plusieurs serveurs »

```etapes Méthode pour un exercice fetch
Lister les URL :: const urls = ["https://api1.example.com/users", ...];
Choisir la combinaison :: le plus rapide qui réussit → Promise.any ; tout est indispensable → Promise.all.
Écrire une fonction qui charge UNE source :: fetch, test de res.ok (throw sinon), return res.json().
Combiner :: const users = await Promise.any(urls.map(charger));
Afficher :: boucle sur users, createElement("li"), textContent = u.name, append dans le `<ul>`.
Brancher sur le bouton :: addEventListener("click", async () => { try { … } catch { … } }).
```

Simulation exécutable (le « réseau » est remplacé par des promesses à délai) :

```javascript
const fauxServeur = (url, ms, enPanne = false) => new Promise((resolve, reject) =>
  setTimeout(() => enPanne ? reject(new Error(url + " en panne"))
                           : resolve([{ name: "Leanne" }, { name: "Ervin" }]), ms));

const sources = [
  () => fauxServeur("api1", 50),
  () => fauxServeur("api2", 10, true),
  () => fauxServeur("api3", 30)
];

(async () => {
  try {
    const users = await Promise.any(sources.map(f => f()));
    console.log(users.map(u => u.name));
  } catch (e) {
    console.log("Toutes les sources sont en panne");
  }
})();
```

```sortie
[ 'Leanne', 'Ervin' ]
```

api2 répond en premier mais en panne : `Promise.any` l'ignore et prend api3.

## Examen blanc

Durée : 1h30. Sans documents, sans ordinateur. Inspiré de l'examen de session 1 de 2025.

```exercice Exercice 1 · Questions de cours (6 points)
? 1. Parmi `maVariable`, `maVariable+`, `$maVariable`, lesquelles sont valides ?
= `maVariable` et `$maVariable`. `+` est un opérateur, interdit dans un identifiant.

? 2. Qu'affiche ce code ? `function hello(n, nom) { let i = 0; while (i < n) { console.log("Hello " + nom); i++; } } hello(3, "Mohamed", "Mahmoud", "Ahmed");`
= Trois fois « Hello Mohamed ». `n` vaut 3, `nom` vaut "Mohamed", les arguments en trop sont ignorés.

? 3. Modifie `hello` pour qu'elle ait des valeurs par défaut.
= `function hello(n = 1, nom = "inconnu") { ... }`. `hello()` affiche alors une fois « Hello inconnu ».

? 4. Parmi `let compteur = 0;`, `const compteur = 0; compteur = 1;`, `var compteur = 0;`, lesquelles sont valides et que se passe-t-il ?
= `let` : valide, réassignable, portée de bloc. `const ... compteur = 1` : la déclaration est valide mais la réassignation lève une TypeError. `var` : valide mais déconseillée (portée de fonction, hoisting).

? 5. Différence entre `array.sort((a, b) => a - b)` et `array.sort((a, b) => b - a)` ?
= Le premier trie par ordre croissant, le second par ordre décroissant. Les deux modifient le tableau.

? 6. Différence entre `querySelector("#p")`, `querySelector(".p")`, `querySelector("p")` ?
= Premier élément d'id `p` ; premier élément de classe `p` ; premier élément `<p>`.

? 7. Syntaxe d'un membre privé de classe ?
= `#nom` : `class A { #secret = 1; lire() { return this.#secret; } }`.

? 8. Gestion des erreurs : promesses vs async/await ?
= Promesses : `.then(...).catch(err => ...)` en fin de chaîne. async/await : `try { await ... } catch (err) { ... } finally { ... }`, écrit comme du code synchrone.
```

```exercice Exercice 2 · Fonctions sur un tableau (5 points)
? Avec `const T1 = [12, 3, 90, 7, 99, 145, 5, 13, 88, 9];` : (1) fonction nominale → T2 des éléments strictement inférieurs à 100 ; (2) fonction nominale → T3 des pairs ; (3) fléchée → somme ; (4) fléchée → tri décroissant ; (5) programme qui appelle tout et affiche les résultats.
indice: filter pour 1 et 2, reduce avec 0 pour 3, une copie puis sort((a, b) => b - a) pour 4.
= `function inferieursA100(t) { return t.filter(x => x < 100); }` ; `function pairs(t) { return t.filter(x => x % 2 === 0); }` ; `const somme = t => t.reduce((acc, x) => acc + x, 0);` ; `const trierDecroissant = t => [...t].sort((a, b) => b - a);` ; puis `console.log(inferieursA100(T1), pairs(T1), somme(T1), trierDecroissant(T1));`. Résultats : `[12, 3, 90, 7, 99, 5, 13, 88, 9]`, `[12, 90, 88]`, `471`, `[145, 99, 90, 88, 13, 12, 9, 7, 5, 3]`. La copie `[...t]` évite de modifier T1.

? Que vaut `somme(pairs(T1))` ?
reponse: 190
= 12 + 90 + 88 = 190.
```

```exercice Exercice 3 · DOM : la todo-list (5 points)
? HTML : `<ul id="todoList"><li>JavaScript</li><li>C++</li></ul>`. (1) Ajoute un `<li>` « Mysql » à la fin. (2) Clic sur un `<li>` : il est barré (`text-decoration: line-through`), un nouveau clic le remet normal. (3) Double-clic : le `<li>` devient un `<input type="text">` avec son texte ; « Entrée » valide et remet un `<li>`.
indice: Une classe CSS .barre + classList.toggle ; un seul écouteur sur la liste (délégation).
= (1) `const $liste = document.querySelector("#todoList"); const $li = document.createElement("li"); $li.textContent = "Mysql"; $liste.append($li);`
(2) CSS : `.barre { text-decoration: line-through; }`. JS : `$liste.addEventListener("click", (e) => { const $item = e.target.closest("li"); if ($item) $item.classList.toggle("barre"); });`
(3) `$liste.addEventListener("dblclick", (e) => { const $item = e.target.closest("li"); if (!$item) return; const $input = document.createElement("input"); $input.type = "text"; $input.value = $item.textContent; $liste.insertBefore($input, $item); $item.remove(); $input.focus(); $input.addEventListener("keydown", (ev) => { if (ev.key !== "Enter") return; const $nouveau = document.createElement("li"); $nouveau.textContent = $input.value; $liste.insertBefore($nouveau, $input); $input.remove(); }); });`
La délégation fait que « Mysql » et les `<li>` recréés réagissent aussi.
```

```exercice Exercice 4 · fetch et trois serveurs (4 points)
? La même API est sur `https://api1.example.com/users`, `api2` et `api3` ; chacune renvoie un tableau d'objets avec un champ `name`. (A) Récupérer les noms depuis la source qui répond le plus vite (certaines peuvent être en panne ou lentes). (B) Les afficher dans le `<ul>` de la page. (C) Le tout au clic sur `#usersDataLoad`.
indice: Le plus rapide qui RÉUSSIT : ni all, ni race.
= `const urls = ["https://api1.example.com/users", "https://api2.example.com/users", "https://api3.example.com/users"];`
`const charger = async (url) => { const res = await fetch(url); if (!res.ok) throw new Error(url + " : " + res.status); return res.json(); };`
`document.querySelector("#usersDataLoad").addEventListener("click", async () => { const $ul = document.querySelector("ul"); try { const users = await Promise.any(urls.map(charger)); $ul.textContent = ""; users.forEach(u => { const $li = document.createElement("li"); $li.textContent = u.name; $ul.append($li); }); } catch (err) { $ul.textContent = "Aucun serveur disponible."; } });`
`Promise.any` prend la première réussite ; `race` pourrait renvoyer un échec rapide ; `all` attendrait les trois et échouerait si un seul est en panne. `textContent` évite le XSS.
```

## Flashcards

```cartes
Format de l'examen 2025 :: 1h30, 4 exercices : cours, fonctions sur tableau, DOM (todo-list), fetch sur 3 serveurs.
Identifiant valide ? :: Commence par une lettre, _ ou $ ; ensuite lettres, chiffres, _, $. Pas de + ni de -.
Arguments en trop à l'appel :: Ignorés.
Barrer un `<li>` au clic, puis le rétablir :: classList.toggle("barre") avec .barre { text-decoration: line-through; }
Source la plus rapide parmi des serveurs dont certains sont en panne :: Promise.any(urls.map(charger))
Pourquoi copier avant sort ? :: sort modifie le tableau d'origine : [...t].sort(...) le préserve.
```

## QCM du chapitre

```qcm
? Lequel est un identifiant **invalide** ?
- $maVariable
- _total
+ maVariable+
= + est un opérateur.

? `hello(3, "Mohamed", "Mahmoud", "Ahmed")` avec `function hello(n, nom)` affiche :
+ 3 fois « Hello Mohamed »
- Hello Mohamed, Hello Mahmoud, Hello Ahmed
- une erreur : trop d'arguments
= Les arguments en trop sont ignorés.

? `const c = 0; c = 1;` :
- c vaut 1
+ TypeError
- SyntaxError à la déclaration
= On ne réassigne pas une const.

? `[12, 3, 90].filter(x => x % 2 === 0)` :
+ [12, 90]
- [3]
- 102
= Les pairs.

? Ordre affiché : `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");`
- A B C
+ A C B
- B A C
= Le callback attend que la pile soit vide.

? Pour afficher un nom venant d'une API dans un `<li>` :
+ $li.textContent = u.name
- $li.innerHTML = u.name
- $li.style = u.name
= textContent n'interprète pas le HTML (XSS).

? Un seul écouteur pour tous les `<li>`, même ajoutés plus tard :
- querySelectorAll("li").forEach(addEventListener)
+ écouteur sur le `<ul>` + e.target.closest("li")
- un écouteur sur window avec capture
= Délégation d'événements.

? Pour stocker un tableau d'objets dans le localStorage :
- setItem("t", tableau)
+ setItem("t", JSON.stringify(tableau))
- setItem(JSON.parse(tableau))
= Le Storage n'accepte que des chaînes.

? Trois serveurs, prendre le plus rapide qui **réussit** :
- Promise.all
- Promise.race
+ Promise.any
= any ignore les échecs tant qu'une promesse peut réussir.

? Un fetch reçoit un 404 : sans test de `res.ok`, le code :
- part dans catch
+ continue comme si tout allait bien
- s'arrête net
= fetch ne rejette que sur une panne réseau.
```

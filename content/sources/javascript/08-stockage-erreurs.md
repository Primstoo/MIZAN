---
id: stockage-erreurs
titre: JSON, Web Storage et gestion des erreurs
seance: Séance 6 · Persistance côté client et exceptions
importance: 4
---

## Avant de commencer

Il faut savoir écrire un objet littéral et lire une propriété (chapitre 4).

```exercice Vérifie ton prérequis
? Toutes tes variables JS sont en RAM. Que deviennent-elles quand l'utilisateur rafraîchit la page ?
= Elles sont **détruites** : la page repart de zéro. HTTP est en plus « sans état » : le serveur ne se souvient pas de toi. D'où le besoin de stocker des données dans le navigateur.
```

## Comment aborder ce chapitre

> [!astuce] Le Web Storage ne connaît que les **chaînes**. Retiens le pont : **`JSON.stringify` à l'écriture, `JSON.parse` à la lecture.**

> [!piege] `localStorage.setItem("config", objet)` sans `stringify` enregistre la chaîne `"[object Object]"` : la donnée est perdue.

À la fin, tu sais sérialiser un objet, choisir entre `localStorage` et `sessionStorage`, et protéger un code avec `try / catch / finally` et `throw`.

## Idée 1 · JSON : sérialiser et désérialiser

**JSON** est un format **texte** : clés et chaînes entre **guillemets doubles**. C'est le standard d'échange du web (il a remplacé XML).

```flux Le pont JSON
objet JS -> JSON.stringify -> chaîne JSON (réseau, stockage) -> JSON.parse -> objet JS
```

```javascript
const userPrefs = { theme: "dark", fontSize: 14 };
const payload = JSON.stringify(userPrefs);
console.log(typeof payload, payload);

const data = JSON.parse('{"status":"success","id":42}');
console.log(typeof data, data.id);
```

```sortie
string {"theme":"dark","fontSize":14}
object 42
```

> [!piege] `stringify` ne garde que les **données** : les fonctions, les `undefined` et les `Symbol` disparaissent en silence.

```javascript
const vehicule = {
  marque: "Renault",
  prix: undefined,
  demarrer() { console.log("Vroom"); }
};
console.log(JSON.stringify(vehicule));
```

```sortie
{"marque":"Renault"}
```

## Idée 2 · localStorage et sessionStorage

```grille Les deux stockages (environ 5 Mo par domaine, chaînes uniquement)
#cols: durée de vie | partagé entre onglets ? | usage
#rows: sessionStorage | localStorage
fermé avec l'onglet | non, un par onglet | étapes d'un long formulaire, panier éphémère
*sans expiration | *oui, même domaine | *thème sombre, langue, cache d'API
```

Les cookies, eux, sont limités à environ 4 Ko.

```javascript nontest
const parametres = { theme: "dark", volume: 80 };
localStorage.setItem("appConfig", JSON.stringify(parametres));   // 1. écrire

const brut = localStorage.getItem("appConfig");                    // 2. lire (null si absent)
if (brut) {
  const config = JSON.parse(brut);
  console.log("Volume restauré :", config.volume);
} else {
  console.log("Aucune configuration : valeurs par défaut.");
}
localStorage.removeItem("appConfig");   // supprimer une clé (hors diapos : clear() vide tout)
```

> [!prof] **Jamais de données sensibles** dans le Web Storage : mots de passe, numéros de carte, jetons d'authentification. Tout script qui tourne sur ton domaine (y compris un script injecté par XSS) peut les lire.

## Idée 3 · try, catch, finally

Une **erreur** fatale arrête le script ; une **exception** est un événement anormal mais prévisible (serveur absent, JSON mal formé). Objectif : **gérer la panne** au lieu d'afficher une page blanche.

```javascript
function analyserDonnees(texte) {
  console.log("1. Ouverture");
  try {
    const objet = JSON.parse(texte);
    console.log("2. Succès :", objet.nom);
  } catch (erreur) {
    console.log("2. Échec :", erreur.name);
  } finally {
    console.log("3. Fermeture");
  }
}
analyserDonnees('{"nom": "Alice"}');
analyserDonnees("Ceci n'est pas un JSON valide");
```

```sortie
1. Ouverture
2. Succès : Alice
3. Fermeture
1. Ouverture
2. Échec : SyntaxError
3. Fermeture
```

- `catch (err)` ne s'exécute que si le `try` a levé une erreur. `err.name` donne le type, `err.message` l'explication.
- `finally` s'exécute **toujours**, même après un `return` : on y arrête un spinner, on réactive un bouton.

> [!attention] Sur la diapo, le second appel est écrit `analyserDonnees('Ceci n'est pas un JSON valide');`. L'apostrophe de « n'est » ferme la chaîne : ce code ne se lance même pas (`SyntaxError` à la lecture du fichier, que `try` ne peut pas attraper). Il faut des guillemets doubles autour, comme ci-dessus, ou échapper l'apostrophe (`'n\'est'`).

## Idée 4 · throw et les types d'erreurs

`throw` lève **ta propre** erreur quand une règle métier est violée.

```javascript
function verifierAge(age) {
  if (age < 0) throw new Error("L'âge ne peut pas être négatif !");
  return age >= 18;
}
try {
  console.log(verifierAge(20));
  verifierAge(-5);
  console.log("jamais affiché");
} catch (err) {
  console.log("Validation échouée : " + err.message);
}
```

```sortie
true
Validation échouée : L'âge ne peut pas être négatif !
```

```javascript
const essais = [
  () => variableInconnue,
  () => (42)(),
  () => new Array(-1),
  () => JSON.parse("{mauvais}")
];
for (const f of essais) {
  try { f(); } catch (e) { console.log(e.name); }
}
```

```sortie
ReferenceError
TypeError
RangeError
SyntaxError
```

| Type | Cause |
|---|---|
| `ReferenceError` | variable non déclarée |
| `TypeError` | mauvais type (appeler un nombre comme une fonction, réassigner une `const`) |
| `SyntaxError` | code ou JSON mal écrit |
| `RangeError` | valeur hors limites (taille de tableau négative) |

## S'exercer

```exercice Exercices type TD 4 et cours
? Sauvegarde le nom d'un administrateur (`"Zouina"`) puis relis-le au chargement suivant (TD 4, ex. 3).
= Écriture : `localStorage.setItem("admin", "Zouina");` (c'est déjà une chaîne, pas besoin de stringify). Lecture : `const nom = localStorage.getItem("admin");` puis tester `if (nom)`. Pour un objet : `setItem("admin", JSON.stringify({ nom: "Zouina" }))` et `JSON.parse(getItem("admin"))`.

? Que vaut `JSON.stringify({ a: 1, b: undefined, c: "x" })` ?
= `'{"a":1,"c":"x"}'` : la clé b, qui vaut undefined, disparaît.

? Pourquoi ne pas stocker un jeton d'authentification dans le localStorage ?
= Tout JavaScript exécuté sur le domaine peut le lire. Un script injecté par une faille XSS peut donc le voler.
```

## Flashcards

```cartes
JSON.stringify :: Objet ou tableau → chaîne JSON (sérialisation).
JSON.parse :: Chaîne JSON → objet JS (désérialisation). Lève SyntaxError si le texte est invalide.
Ce que stringify supprime :: Fonctions, valeurs undefined, Symbol.
localStorage vs sessionStorage :: Persistant et partagé entre onglets ; détruit à la fermeture de l'onglet, un par onglet.
Type des valeurs du Web Storage :: Uniquement des chaînes.
Interdit dans le Web Storage :: Mots de passe, cartes bancaires, jetons d'authentification (risque XSS).
Quand s'exécute finally ? :: Toujours : succès, échec, même après un return.
Lever sa propre erreur :: throw new Error("message").
Les 4 erreurs natives du cours :: ReferenceError, TypeError, SyntaxError, RangeError.
```

## QCM du chapitre

```qcm
? `typeof JSON.stringify({ a: 1 })` vaut :
- "object"
+ "string"
- "json"
= stringify produit une chaîne.

? Que renvoie `JSON.stringify({ f() {}, x: 1 })` ?
+ '{"x":1}'
- '{"f":"function","x":1}'
- une erreur
= Les fonctions sont supprimées.

? `localStorage.setItem("c", { a: 1 })` enregistre :
- l'objet
+ la chaîne "[object Object]"
- rien
= Le Storage convertit en chaîne. Il fallait JSON.stringify.

? Quel stockage disparaît à la fermeture de l'onglet ?
+ sessionStorage
- localStorage
- les deux
= localStorage n'a pas d'expiration.

? Capacité approximative du Web Storage selon le cours :
- 4 Ko
+ environ 5 Mo par domaine
- illimitée
= 4 Ko, c'est la limite des cookies.

? `localStorage.getItem("absent")` renvoie :
- undefined
+ null
- ""
= D'où le test `if (brut)` avant JSON.parse.

? `JSON.parse("Texte Invalide")` lève :
- TypeError
+ SyntaxError
- RangeError
= Le texte n'est pas du JSON valide.

? Le bloc `finally` :
- ne s'exécute qu'en cas d'erreur
- ne s'exécute qu'en cas de succès
+ s'exécute dans tous les cas
= Idéal pour réactiver un bouton ou cacher un spinner.

? Appeler `(42)()` lève :
+ TypeError
- ReferenceError
- SyntaxError
= On appelle un nombre comme une fonction.

? Pour signaler qu'un âge négatif est interdit :
- return -1
+ throw new Error("…")
- console.log("erreur")
= throw interrompt et laisse l'appelant gérer avec catch.
```

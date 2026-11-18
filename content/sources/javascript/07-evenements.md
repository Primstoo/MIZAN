---
id: evenements
titre: Gestion des événements
seance: Séance 5 · Gestion des événements
importance: 4
---

## Avant de commencer

Ce chapitre combine deux choses déjà vues : les **callbacks** (chapitre 5) et la **sélection d'éléments** (chapitre 6).

```exercice Vérifie ton prérequis
? Dans `traiter(100, archiver)`, qui décide du moment où `archiver` est appelée ?
= La fonction `traiter`, pas toi : c'est l'inversion de contrôle. Avec les événements, c'est le **navigateur** qui appelle ton callback quand l'utilisateur agit.
```

## Comment aborder ce chapitre

> [!astuce] Un écouteur, c'est une consigne : « **si** l'utilisateur clique **ici**, **exécute** ça ». Trois ingrédients : l'élément, le type d'événement, la fonction.

> [!piege] Confondre `preventDefault()` et `stopPropagation()`. Le premier bloque l'action **du navigateur** (rechargement, lien). Le second bloque la **remontée** vers les parents. L'un n'implique pas l'autre.

À la fin, tu sais attacher et retirer un écouteur, utiliser l'objet `e`, expliquer capture et bouillonnement, et coder une délégation d'événements.

## Idée 1 · addEventListener et les types d'événements

```javascript nontest
const $monBouton = document.querySelector("#monBouton");
$monBouton.addEventListener("click", function () {
  console.log("Vous avez cliqué sur le bouton !");
});
```

| Famille | Événements |
|---|---|
| Souris | `click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove` |
| Clavier | `keydown` (enfoncée), `keyup` (relâchée) |
| Formulaire | `submit`, `input` (à chaque frappe), `change` (validé), `focus`, `blur` |
| Fenêtre / DOM | `DOMContentLoaded` (HTML prêt), `load` (images comprises), `scroll`, `resize`, `beforeunload` |
| Unifié | `pointerdown`, `pointermove` : souris, doigt ou stylet (`e.pointerType`) |

Le 3e paramètre, un objet d'options : `{ once: true }` (l'écouteur se détache après le 1er appel, ex. paiement unique), `{ passive: true }` (promet de ne pas appeler `preventDefault`, utile pour `scroll`), `{ capture: true }` (écoute pendant la descente).

**Retirer un écouteur** : `removeEventListener` exige **la même fonction en mémoire**. Avec une fléchée anonyme, c'est impossible.

```javascript
const cible = new EventTarget();
let n = 0;
function direBonjour() { n++; cible.removeEventListener("click", direBonjour); }
cible.addEventListener("click", direBonjour);
cible.addEventListener("click", () => console.log("anonyme"));
cible.removeEventListener("click", () => console.log("anonyme"));
cible.dispatchEvent(new Event("click"));
cible.dispatchEvent(new Event("click"));
console.log("direBonjour appelée", n, "fois");
```

```sortie
anonyme
anonyme
direBonjour appelée 1 fois
```

L'écouteur anonyme n'a pas été retiré : la fléchée passée à `removeEventListener` est une **autre** fonction. La fonction nommée, elle, s'est retirée après le premier clic.

> [!attention] Cet exemple utilise `EventTarget`, disponible aussi dans Node.js, pour pouvoir être exécuté ici. Dans la page, c'est la même API sur un bouton.

## Idée 2 · Les 3 phases : capture, cible, bouillonnement

```html
<svg viewBox="0 0 560 200" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Un clic descend de window jusqu'au bouton (capture), atteint la cible, puis remonte jusqu'à window (bouillonnement)">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="210" y="10" width="140" height="26" rx="5" fill="none" stroke="currentColor"/><text x="280" y="28">window / document</text>
<rect x="210" y="55" width="140" height="26" rx="5" fill="none" stroke="currentColor"/><text x="280" y="73">body</text>
<rect x="210" y="100" width="140" height="26" rx="5" fill="none" stroke="currentColor"/><text x="280" y="118">ul (parent)</text>
<rect x="210" y="150" width="140" height="30" rx="5" fill="none" stroke="#D9824F" stroke-width="3"/><text x="280" y="170" fill="#D9824F" font-weight="700">li cliqué (target)</text>
<text x="120" y="100">1. capture ↓</text><text x="450" y="100" fill="#D9824F" font-weight="700">3. bouillonnement ↑</text><text x="420" y="172">2. cible</text></g>
<path d="M195 20 L195 160" stroke="currentColor" stroke-width="2"/><path d="M188 150 L195 165 L202 150" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M365 165 L365 25" stroke="#D9824F" stroke-width="3"/><path d="M358 35 L365 20 L372 35" fill="none" stroke="#D9824F" stroke-width="3"/>
</svg>
```

Par défaut, les écouteurs réagissent au **bouillonnement** : un clic sur un `<li>` déclenche aussi les écouteurs du `<ul>`, du `<body>`…

| Appel | Le parent entend-il le clic ? | Le lien navigue-t-il ? |
|---|---|---|
| rien | oui | oui |
| `e.preventDefault()` | oui | **non** |
| `e.stopPropagation()` | **non** | oui |
| les deux | non | non |

`e.stopImmediatePropagation()` bloque aussi les autres écouteurs du **même** élément.

## Idée 3 · L'objet événement e

Le navigateur passe un objet événement comme **premier argument** du callback.

- `e.type` (`"click"`), `e.timeStamp`, `e.isTrusted` (`false` si l'événement est simulé par un script, ex. `bouton.click()`).
- **`e.target`** : l'élément réellement touché (ex. l'`<img>` dans le bouton). **`e.currentTarget`** : l'élément qui porte l'écouteur (le `<button>`).
- Clavier : `e.key` (le caractère, dépend de la disposition AZERTY/QWERTY) ; `e.code` (la touche physique, ex. `"KeyW"`).
- Pointeur : `e.clientX/Y` (par rapport à la fenêtre visible), `e.pageX/Y` (par rapport au document entier).

## Idée 4 · La délégation d'événements

Au lieu de 1000 écouteurs sur 1000 `<li>`, **un seul** sur le parent. Les clics remontent jusqu'à lui ; `e.target.closest(...)` retrouve l'élément visé. Bonus : les `<li>` ajoutés plus tard marchent aussi.

```etapes Coder une délégation
Un seul écouteur sur le parent :: $liste.addEventListener("click", (e) => { ... })
Retrouver l'élément visé :: const $item = e.target.closest("li"); — même si on a cliqué sur un `<span>` dedans.
Ignorer les clics à côté :: if (!$item) return;
Agir :: $item.classList.toggle("barre");
```

```javascript nontest
const $todo = document.querySelector("#todoList");
$todo.addEventListener("click", (e) => {
  const $li = e.target.closest("li");
  if (!$li) return;
  $li.classList.toggle("barre");   /* .barre { text-decoration: line-through; } */
});
```

C'est la question 2 de l'exercice 3 de l'examen 2025.

## Idée 5 · Événements avancés : debounce, throttle, CustomEvent, cycle de vie

- **Debounce** : attendre un silence (ex. 300 ms) avant d'exécuter. Pour une barre de recherche qui appelle une API.
- **Throttle** : au plus une exécution toutes les X ms. Pour `scroll` / `resize`.

```javascript
function debounce(fonctionMetier, delai) {
  let chronometre;
  return function (...args) {
    clearTimeout(chronometre);
    chronometre = setTimeout(() => fonctionMetier.apply(this, args), delai);
  };
}
const rechercher = debounce(q => console.log("Requête serveur pour : " + q), 50);
rechercher("J");
rechercher("Ja");
rechercher("JavaScript");
```

```sortie
Requête serveur pour : JavaScript
```

Trois frappes, **une** requête. La variable `chronometre` survit entre les appels grâce à une **fermeture** (closure).

**CustomEvent** : un module diffuse un événement, les autres s'y abonnent, sans se connaître.

```javascript
const bus = new EventTarget();
bus.addEventListener("achatValide", (e) => {
  console.log(`Article ${e.detail.idProduit} payé (${e.detail.prix} DH)`);
});
bus.dispatchEvent(new CustomEvent("achatValide", { detail: { idProduit: "PRD-404", prix: 99.99 } }));
```

```sortie
Article PRD-404 payé (99.99 DH)
```

Dans la page, le prof diffuse sur `window` : `window.dispatchEvent(eventAchat)`.

**Cycle de vie** : attends `DOMContentLoaded` avant de chercher des éléments (sinon `querySelector` renvoie `null`). `load` attend en plus les images. `MutationObserver` surveille les changements du DOM sans `setInterval`.

## S'exercer

```exercice Exercices type TD 4, TP 3 et examen
? (TD 4, ex. 2) 10 000 employés, un bouton `.btn-bannir` par carte `.carte-employe`. Un seul écouteur autorisé : supprime la carte du bouton cliqué.
= `document.querySelector("#liste-employes").addEventListener("click", (e) => { const $btn = e.target.closest(".btn-bannir"); if (!$btn) return; $btn.closest(".carte-employe").remove(); });`

? (Examen 2025, ex. 3.3) Double-clic sur un `<li>` : le remplacer par un `<input type="text">` pré-rempli ; « Entrée » valide et remet un `<li>` avec le nouveau texte.
= Délégation sur `#todoList` avec `dblclick` : `const $li = e.target.closest("li"); if (!$li) return; const $in = document.createElement("input"); $in.type = "text"; $in.value = $li.textContent; $li.replaceWith($in); $in.focus();` puis `$in.addEventListener("keydown", (ev) => { if (ev.key === "Enter") { const $n = document.createElement("li"); $n.textContent = $in.value; $in.replaceWith($n); } });`. (`replaceWith` n'est pas dans les diapos ; équivalent : `parent.insertBefore(nouveau, ancien)` puis `ancien.remove()`.)

? Un lien `<a href="/page">` est dans une carte cliquable. On veut que le lien ne navigue pas mais que la carte réagisse. Quelle méthode ?
= `e.preventDefault()` seulement : l'action native (navigation) est annulée, mais l'événement continue de remonter vers la carte.
```

## Flashcards

```cartes
Les 3 paramètres de addEventListener :: Type d'événement, fonction, options ({ once, passive, capture }).
removeEventListener ne marche pas si… :: On lui passe une fonction anonyme : ce n'est pas la même fonction en mémoire.
Les 3 phases d'un événement :: Capture (descente), cible, bouillonnement (remontée).
preventDefault vs stopPropagation :: Bloque l'action du navigateur ; bloque la remontée vers les parents.
e.target vs e.currentTarget :: Élément réellement cliqué ; élément qui porte l'écouteur.
e.key vs e.code :: Caractère tapé (dépend du clavier) ; touche physique (ex. KeyW).
Délégation d'événements :: Un seul écouteur sur le parent + e.target.closest() pour trouver l'enfant visé.
Debounce vs throttle :: Debounce : exécute après un silence. Throttle : au plus une fois par intervalle.
DOMContentLoaded vs load :: HTML lu et DOM construit ; toutes les ressources (images…) chargées.
e.isTrusted :: true si l'action vient d'un humain, false si simulée par script.
```

## QCM du chapitre

```qcm
? Quel événement se déclenche à **chaque frappe** dans un champ ?
+ input
- change
- submit
= change attend la fin de la modification.

? Pour empêcher un formulaire de recharger la page :
+ e.preventDefault() dans l'écouteur submit
- e.stopPropagation()
- return false dans le HTML uniquement
= On annule l'action native du navigateur.

? Pourquoi `btn.removeEventListener("click", () => f())` échoue-t-il ?
- removeEventListener n'existe pas
+ La fléchée est une nouvelle fonction, différente de celle attachée
- Il faut passer once: true
= Il faut la même référence de fonction.

? Ordre des phases d'un événement :
- bouillonnement, cible, capture
+ capture, cible, bouillonnement
- cible, capture, bouillonnement
= Descente, cible, remontée.

? Clic sur une `<img>` dans un `<button>` qui porte l'écouteur : `e.target` vaut
+ l'img
- le button
- document
= target = origine physique ; currentTarget = le button.

? Quelle option détache l'écouteur après la première exécution ?
- passive: true
+ once: true
- capture: true
= Utile contre les doubles paiements.

? Intérêt principal de la délégation :
+ Un seul écouteur, qui marche aussi pour les éléments ajoutés plus tard
- Elle bloque le bouillonnement
- Elle évite le DOM
= Elle repose justement sur le bouillonnement.

? Pour un jeu, quelle propriété vise la même touche physique en AZERTY et QWERTY ?
- e.key
+ e.code
- e.type
= e.code vaut "KeyW" quelle que soit la langue.

? Une barre de recherche qui interroge une API à chaque lettre doit utiliser :
+ debounce
- throttle
- stopPropagation
= On attend que l'utilisateur ait fini de taper.

? Quelle API permet de créer son propre événement avec des données ?
- new Event("x", data)
+ new CustomEvent("x", { detail: {...} }) puis dispatchEvent
- addEventListener("custom")
= Les données passent dans detail.
```

---
id: dom
titre: Manipuler le DOM
seance: Séance 4 · Manipulation du DOM
importance: 5
---

## Avant de commencer

Il faut connaître les sélecteurs CSS (`#id`, `.classe`, `div p`, `[attribut='valeur']`) : ce chapitre les réutilise tels quels.

```exercice Vérifie ton prérequis
? Quel sélecteur CSS vise le paragraphe `<p>` placé dans un élément de classe `module-cours` dont l'attribut `data-statut` vaut `en-attente` ?
= `.module-cours[data-statut='en-attente'] p` : la classe, puis l'attribut entre crochets, puis un espace pour « descendant », puis la balise.
```

## Comment aborder ce chapitre

> [!astuce] Le DOM est un **arbre**. Chaque manipulation suit le même schéma : **sélectionner** un nœud, **le ranger dans une constante** (préfixe `$` chez le prof), puis **lire ou modifier**. Teste tout dans la console du navigateur (F12).

> [!piege] Mettre une saisie utilisateur dans `innerHTML`. Si elle contient `<img src=x onerror="...">`, le script s'exécute : c'est une faille **XSS**. Pour du texte, `textContent`.

À la fin, tu sais sélectionner, modifier le texte, les attributs et les classes, créer et supprimer des éléments, et remonter l'arbre avec `closest`.

> [!attention] Les exemples de ce chapitre ont besoin d'un navigateur (`document` n'existe pas dans Node.js) : ils ne sont pas exécutés automatiquement ici. Copie-les dans la console de ta page.

## Idée 1 · L'arbre et la sélection

```html
<svg viewBox="0 0 560 200" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Arbre du DOM : document, html, head et body ; body contient un ul avec deux li ; les sauts de ligne sont des nœuds texte">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="230" y="8" width="100" height="26" rx="5" fill="none" stroke="currentColor"/><text x="280" y="26">document</text>
<rect x="230" y="52" width="100" height="26" rx="5" fill="none" stroke="currentColor"/><text x="280" y="70">html</text>
<rect x="120" y="96" width="90" height="26" rx="5" fill="none" stroke="currentColor"/><text x="165" y="114">head</text>
<rect x="350" y="96" width="90" height="26" rx="5" fill="none" stroke="currentColor"/><text x="395" y="114">body</text>
<rect x="350" y="140" width="90" height="26" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="395" y="158">ul#liste</text>
<rect x="250" y="172" width="80" height="24" rx="5" fill="none" stroke="currentColor" stroke-dasharray="4 3"/><text x="290" y="189">#text "\n"</text>
<rect x="350" y="172" width="80" height="24" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="390" y="189">li</text>
<rect x="450" y="172" width="80" height="24" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="490" y="189">li</text></g>
<g stroke="currentColor"><line x1="280" y1="34" x2="280" y2="52"/><line x1="280" y1="78" x2="165" y2="96"/><line x1="280" y1="78" x2="395" y2="96"/><line x1="395" y1="122" x2="395" y2="140"/><line x1="395" y1="166" x2="290" y2="172"/><line x1="395" y1="166" x2="390" y2="172"/><line x1="395" y1="166" x2="490" y2="172"/></g>
</svg>
```

Tout est **nœud** (Node) : balises, textes, et même les sauts de ligne invisibles (nœud texte en pointillés). Un **élément** (Element) est un nœud qui est une vraie balise.

```grille Les méthodes de sélection
#cols: renvoie | si rien | mise à jour
#rows: getElementById("id") | getElementsByClassName("c") | querySelector("sel") | querySelectorAll("sel")
un élément | null | -
HTMLCollection | collection vide | ~live (suit le DOM)
*le premier élément | *null | -
*NodeList | *liste vide | *statique (photo)
```

```javascript nontest
const $tableauDeBord = document.querySelector("#tableau-de-bord");
const $premierModule = document.querySelector(".module-cours");      // le premier seulement
const $p = document.querySelector(".module-cours[data-statut='en-attente'] p");
const $champs = document.querySelectorAll("form input[type='text']");
$champs.forEach($c => console.log($c.value));                        // NodeList a forEach
```

> [!prof] **Mise en cache** : ne cherche jamais deux fois le même élément. `const $compteur = document.querySelector(".compteur");` puis utilise `$compteur`. Chaque recherche traverse le pont JS ↔ rendu.

## Idée 2 · Modifier texte, HTML, attributs, style, classes

| Propriété | Fait quoi | Attention |
|---|---|---|
| `textContent` | texte brut, même caché | rapide, sûr |
| `innerText` | texte tel qu'affiché | force un calcul du CSS (reflow) |
| `innerHTML` | interprète des balises | **XSS** avec des données utilisateur |

```javascript nontest
const $titre = document.querySelector("#nom-utilisateur");
$titre.textContent = "Administrateur Système";            // sûr : pas d'interprétation HTML

const $lien = document.querySelector("a");
$lien.setAttribute("href", "https://fpbm.usms.ac.ma");
console.log($lien.getAttribute("href"));
document.querySelector("button").disabled = true;          // attribut standard = propriété

$titre.dataset.role;                                         // lit data-role (hors diapos)
```

Pour le style, le prof distingue :

- `element.style.backgroundColor = "red"` : style en ligne, en **camelCase**. Anti-pattern, sauf pour une valeur **calculée** (`$barre.style.width = progression + "%"`).
- **`classList`** : le standard. JS dit « tu es en état d'erreur », le CSS décide de la couleur.

```javascript nontest
$menu.classList.add("visible");
$menu.classList.remove("cache");
$menu.classList.contains("visible");   // true / false
$menu.classList.toggle("menu-ouvert"); // ajoute si absente, retire si présente
```

> [!retenir] **JS gère l'état, CSS gère l'apparence.** On communique par les classes (`classList`), pas par `style`.

## Idée 3 · Créer, insérer, supprimer

```etapes Ajouter un élément à une liste
Créer en mémoire :: const $li = document.createElement("li"); — l'élément n'est pas encore visible.
Configurer :: $li.textContent = "Mysql"; $li.classList.add("item");
Sélectionner le parent :: const $liste = document.querySelector("#todoList");
Attacher :: $liste.append($li); — il apparaît en dernier enfant (appendChild fait pareil pour un seul nœud).
```

| Méthode | Place |
|---|---|
| `parent.append(a, "texte", b)` | à la fin, plusieurs nœuds et du texte |
| `parent.appendChild(n)` | à la fin, un seul nœud (ancienne école) |
| `parent.prepend(n)` | au début |
| `parent.insertBefore(n, ref)` | juste avant `ref` |
| `el.insertAdjacentHTML(pos, html)` | `beforebegin`, `afterbegin`, `beforeend`, `afterend` |

`insertAdjacentHTML` ne reconstruit pas les enfants existants, contrairement à `innerHTML +=` ; mais il interprète le HTML, donc même risque XSS.

**Création en masse** : chaque insertion dans le DOM peut provoquer un recalcul de la mise en page (reflow). On remplit d'abord un **DocumentFragment** (conteneur fantôme), puis on l'insère **une seule fois**.

```javascript nontest
const $logs = document.querySelector("#liste-logs");
const $fragment = document.createDocumentFragment();
messages.forEach(msg => {
  const $li = document.createElement("li");
  $li.textContent = msg;
  $fragment.append($li);
});
$logs.append($fragment); // un seul accès au DOM visible
```

**Supprimer** : `$el.remove()` (moderne) ou `$el.parentNode.removeChild($el)` (historique).

## Idée 4 · Naviguer dans l'arbre

```grille Nœuds (risqué) vs éléments (recommandé)
#cols: tous les nœuds | éléments seulement
#rows: enfants | premier | dernier | nombre | frère suivant | frère précédent | parent
childNodes | *children
firstChild | *firstElementChild
lastChild | *lastElementChild
childNodes.length | *childElementCount
nextSibling | *nextElementSibling
previousSibling | *previousElementSibling
parentNode | *parentElement
```

`firstChild` peut renvoyer le saut de ligne invisible : préfère les versions **Element**.

Pour remonter, `closest(sélecteur)` remonte jusqu'au premier ancêtre qui correspond (ou `null`). C'est robuste : si un designer ajoute une `<div>`, ça marche encore, alors que `parentElement.parentElement` casse.

```javascript nontest
const $bouton = document.querySelector(".btn-reboot");
const $ligne = $bouton.closest("tr");      // remonte jusqu'au <tr>, quelle que soit la profondeur
$ligne.classList.add("en-maintenance");
```

## S'exercer

```exercice Exercices type TD 3
? (TD 3, ex. 1.3) Un attaquant contrôle `const payload = "<img src='x' onerror='alert(\"Piraté!\")'>";`. Injecte-le dans `.zone-securisee` sans que le script s'exécute.
= `document.querySelector(".zone-securisee").textContent = payload;` Le texte est affiché tel quel, les balises ne sont pas interprétées. Avec `innerHTML`, l'image fautive déclencherait `onerror`.

? (TD 3, ex. 2) Grise la ligne `<tr>` du premier serveur, en partant uniquement de son bouton.
= `const $btn = document.querySelector(".btn-reboot"); const $tr = $btn.closest("tr"); $tr.classList.add("en-maintenance");`

? (TD 3, ex. 4) Supprime la ligne du « Serveur Beta » de la manière la plus directe.
= `document.querySelector(".serveur-hs").remove();`

? (Examen 2025, ex. 3.1) Ajoute un `<li>` « Mysql » à la fin de `#todoList`.
= `const $li = document.createElement("li"); $li.textContent = "Mysql"; document.querySelector("#todoList").append($li);`
```

## Flashcards

```cartes
querySelector vs querySelectorAll :: Le premier élément (ou null) ; une NodeList statique de tous.
HTMLCollection vs NodeList :: getElementsByClassName → HTMLCollection live. querySelectorAll → NodeList statique.
textContent vs innerText :: textContent : texte brut, rapide. innerText : texte visible, force un reflow.
Danger de innerHTML :: Faille XSS si on y met des données utilisateur.
classList.toggle("x") :: Ajoute x si absente, la retire si présente.
append vs appendChild :: append : plusieurs nœuds et du texte. appendChild : un seul nœud.
DocumentFragment :: Conteneur hors DOM : on y prépare N éléments, puis une seule insertion.
closest("tr") :: Remonte les ancêtres jusqu'au premier `<tr>` (ou null).
firstChild vs firstElementChild :: firstChild peut être un nœud texte (saut de ligne) ; firstElementChild est toujours une balise.
Convention $ du prof :: Préfixer les variables qui contiennent un élément du DOM : const $liste = …
```

## QCM du chapitre

```qcm
? `document.querySelector(".p")` renvoie :
- tous les éléments de classe p
+ le premier élément de classe p, ou null
- la balise `<p>`
= `.p` est une classe ; querySelector s'arrête au premier.

? Différence entre `querySelector("#p")`, `(".p")` et `("p")` (examen 2025) ?
+ id « p », classe « p », balise `<p>`
- trois écritures identiques
- balise, id, classe
= Mêmes sélecteurs qu'en CSS.

? Quelle collection est **live** ?
+ getElementsByClassName (HTMLCollection)
- querySelectorAll (NodeList)
- un tableau JS
= Elle se met à jour si le DOM change.

? Pour afficher un commentaire utilisateur en toute sécurité :
- innerHTML
+ textContent
- insertAdjacentHTML
= textContent n'interprète pas les balises.

? En JS, la propriété CSS `background-color` s'écrit :
- style["background-color"] uniquement
+ style.backgroundColor
- style.background_color
= camelCase en JavaScript.

? Le prof recommande de changer l'apparence via :
- element.style
+ element.classList
- innerHTML
= JS change l'état (classe), le CSS décide du rendu.

? Un élément créé par `createElement` est visible :
- tout de suite
+ seulement après insertion (append, prepend…)
- après un rechargement
= Il n'existe d'abord qu'en mémoire.

? Pour insérer 100 `<li>` avec un seul accès au DOM visible :
- innerHTML += dans une boucle
+ un DocumentFragment
- 100 appendChild sur la liste
= On remplit le fragment, puis une seule insertion.

? `$btn.closest("tr")` :
+ remonte jusqu'au premier ancêtre `<tr>`
- cherche un `<tr>` parmi les enfants
- renvoie le `<tr>` le plus proche dans la page
= closest remonte les ancêtres (en commençant par l'élément lui-même).

? Quelle propriété peut renvoyer un nœud texte invisible ?
+ firstChild
- firstElementChild
- children[0]
= Les sauts de ligne du HTML sont des nœuds texte.
```

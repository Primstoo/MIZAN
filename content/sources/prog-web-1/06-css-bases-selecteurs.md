---
id: css-bases-selecteurs
titre: CSS3 (1) · où écrire le CSS, cascade et sélecteurs
seance: Partie III · CSS3, bases
importance: 5
---

## Avant de commencer

Il faut connaître les balises HTML et les attributs `class` et `id` (chapitres 2 et 3). Le CSS va **viser** ces éléments pour les habiller.

```exercice Vérifie ton prérequis
? Dans `<p class="note" id="intro">`, combien d'éléments de la page peuvent avoir `id="intro"` ? Et `class="note"` ?
= `id="intro"` : **un seul** élément (identifiant unique). `class="note"` : autant qu'on veut.
```

## Comment aborder ce chapitre

> [!astuce] **Une règle CSS = « qui ? » + « quoi ? ».** Le sélecteur répond à « qui je vise », les déclarations à « ce que je change ». Lis toujours une règle en commençant par le sélecteur.

> [!piege] Oublier le **point** devant une classe (`rouge { }` au lieu de `.rouge { }`) ou le **dièse** devant un id. Sans eux, le navigateur cherche une balise `<rouge>`, qui n'existe pas : la règle ne s'applique à rien, **sans message d'erreur**.

À la fin, tu sais lier une feuille de style, expliquer la cascade, et écrire les sélecteurs du cours : élément, multiple, universel, classe, id, descendant, adjacent, attribut.

## Idée 1 · Trois endroits pour écrire du CSS

```html
<svg viewBox="0 0 600 170" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Trois façons d'écrire du CSS : en ligne dans l'attribut style, interne dans une balise style du head, externe dans un fichier .css lié par link ; la méthode externe est recommandée">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="10" y="20" width="180" height="120" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="100" y="45" font-weight="700">1. En ligne</text><text x="100" y="75" font-family="monospace" font-size="11">&lt;h1 style="color:pink"&gt;</text><text x="100" y="110" font-size="12">un seul élément</text>
<rect x="210" y="20" width="180" height="120" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="300" y="45" font-weight="700">2. Interne</text><text x="300" y="75" font-family="monospace" font-size="11">&lt;style&gt; dans &lt;head&gt;</text><text x="300" y="110" font-size="12">une seule page</text>
<rect x="410" y="20" width="180" height="120" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="500" y="45" font-weight="700" fill="#D9824F">3. Externe ✔</text><text x="500" y="75" font-family="monospace" font-size="11">&lt;link href="style.css"&gt;</text><text x="500" y="110" font-size="12">tout le site</text>
<text x="300" y="162" font-size="12">recommandée par le prof : séparation contenu / présentation</text>
</g></svg>
```

```markup
<!-- 1. En ligne : attribut style -->
<h1 style="color: pink;">Titre</h1>

<!-- 2. Interne : dans le head -->
<head>
    <style>
        h2 { color: #fff; }
    </style>
</head>

<!-- 3. Externe : un fichier séparé, lié dans le head -->
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
```

CSS (*Cascading Style Sheets*, feuilles de style en cascade) **sépare la structure (HTML) de la présentation (CSS)** : `index.html` pour le contenu, `style.css` pour la mise en forme.

> [!prof] La méthode **externe** est « vivement recommandée » : une seule feuille pour tout le site, une modification change toutes les pages, présentation cohérente. Le style en ligne est « long et fastidieux » ; le style interne doit être recopié sur chaque page (20 pages = 20 modifications).

## Idée 2 · Syntaxe et cascade

```grille Anatomie d'une règle
#cols: sélecteur { propriété : valeur ; }
*h1 { !color : red ; }
```

```css
/* Un commentaire CSS */
selecteur {
    propriete: valeur;
    propriete: valeur;
}
```

Une **déclaration** = propriété + valeur ; les déclarations sont séparées par des **points-virgules**.

**La cascade** : quand deux règles se contredisent, **la dernière** l'emporte (à sélecteur équivalent).

```css
h1, h2 { color: yellow; }
h1 { color: red; }      /* h1 sera rouge : cette règle vient après */
```

```etapes Qui gagne ? (ordre de prise en compte selon le cours)
1. Feuille externe :: lue en premier.
2. Style interne (<style> du head) :: écrase l'externe s'il est placé après le `<link>`.
3. Style en ligne (attribut style) :: écrase les deux : il est le plus proche de l'élément.
```

> [!attention] Le cours ne parle que de l'**ordre**. En réalité, la **spécificité** du sélecteur compte avant l'ordre : un sélecteur d'**id** bat un sélecteur de **classe**, qui bat un sélecteur de **balise**, même s'il est écrit avant. Exemple : `#titre { color: blue }` puis `h1 { color: red }` → un `<h1 id="titre">` reste **bleu**. Et si `<style>` est placé **avant** le `<link>`, c'est l'externe qui gagne.

## Idée 3 · Sélecteurs simples : balise, groupe, *, classe, id

| Sélecteur | Exemple | Vise |
|---|---|---|
| élément | `p { }` | tous les `<p>` |
| multiple | `h1, div, p { }` | les `h1`, les `div` **et** les `p` |
| universel | `* { }` | tous les éléments |
| classe | `.rouge { }` | les éléments `class="rouge"` (plusieurs possibles) |
| balise + classe | `div.rouge { }` | seulement les `div` de classe rouge |
| identifiant | `#menu { }` | l'élément unique `id="menu"` |

```css
.rouge { background-color: red; }
#menu  { background-color: navy; }
```

```markup
<div class="rouge">Item 1</div>
<div>Item 2</div>
<div class="rouge">Item 3</div>   <!-- Items 1 et 3 sont rouges -->
<nav id="menu">...</nav>
```

> [!retenir] **Point = classe** (réutilisable), **dièse = id** (unique dans la page). En HTML, on écrit `class="rouge"` **sans** le point.

> [!attention] Les exemples des diapos ferment les `div` avec `<div>` au lieu de **`</div>`** (`<div class="rouge">Item 1<div>`) : avec ce code, les div s'imbriquent les unes dans les autres. Mets bien le slash.

## Idée 4 · Sélecteurs avancés : descendant, adjacent, attribut

```grille Sur <h3>…</h3><p>A</p><p>B</p><div><p>C</p></div>, qui est visé ?
#cols: sélecteur A B C
#rows: div_p h3+p p[title] 
~div_p ~non ~non *oui
~h3+p *oui ~non ~non
~p[title] ~si_title ~si_title ~si_title
```

```css
div p { color: blue; }                  /* p situés DANS un div (à n'importe quelle profondeur) */
h3 + p { color: blue; }                 /* le p qui suit IMMÉDIATEMENT un h3 (même parent) */
h2[title] { color: red; }               /* h2 qui ont un attribut title, quelle que soit sa valeur */
h2[title][id] { color: red; }           /* h2 qui ont title ET id */
a[title="Cliquez ici"] { color: red; }  /* liens dont title vaut exactement "Cliquez ici" */
input[type=text] { border: 1px solid red; }  /* utilisé dans le TD */
```

> [!piege] `div p` (avec **espace**) = les `p` **dans** un `div`. `div, p` (avec **virgule**) = les `div` **et** les `p`. Une virgule de plus change tout.

## S'exercer

```exercice Écrire des sélecteurs
? Écris la règle qui met en bleu (`color: blue`) uniquement les paragraphes situés dans un `<footer>`.
= `footer p { color: blue; }` (sélecteur descendant : espace entre les deux).
? `p { color: red; }` puis `.important { color: green; }`. De quelle couleur est `<p class="important">` ? Et si on inverse l'ordre des deux règles ?
= **Vert** dans les deux cas : la classe est plus **spécifique** que la balise, elle gagne quel que soit l'ordre. (Le cours ne parle que de l'ordre ; c'est la spécificité qui tranche ici.)
? Écris la balise qui lie la feuille `css/style.css` à la page (TP 1, exercice 4). Où la place-t-on ?
= `<link rel="stylesheet" href="css/style.css">`, dans le **`<head>`**.
? Écris la règle du TD : champs texte avec fond `lightblue`, bordure solide de 1 pixel rouge, coins arrondis de 5 pixels.
= `input[type=text] { background-color: lightblue; border: 1px solid red; border-radius: 5px; }`
```

## Flashcards

```cartes
Que signifie CSS ? :: Cascading Style Sheets : feuilles de style en cascade.
Les 3 façons d'écrire du CSS ? :: En ligne (attribut style), interne (<style> dans head), externe (fichier .css lié par <link>).
Méthode recommandée par le prof ? :: La feuille externe : un fichier pour tout le site.
Lier une feuille externe ? :: <link rel="stylesheet" href="style.css"> dans le head.
Règle de la cascade (cours) ? :: À égalité, la dernière règle définie l'emporte ; le style en ligne gagne sur interne et externe.
Sélecteur de classe vs d'id ? :: .classe (plusieurs éléments) ; #id (un seul élément).
div p vs div, p ? :: div p : les p dans un div. div, p : tous les div et tous les p.
h3 + p ? :: Le p qui suit immédiatement un h3.
Commentaire CSS ? :: /* commentaire */
```

## QCM du chapitre

```qcm
? Quelle méthode le prof recommande-t-il ?
- le style en ligne
- le style interne
+ la feuille de style externe
= Séparation totale et réutilisation sur tout le site.
? Quelle balise lie une feuille externe ?
- `<style src="style.css">`
+ `<link rel="stylesheet" href="style.css">`
- `<css href="style.css">`
= Dans le head.
? Dans `p { color: red; }`, `color` est…
- le sélecteur
+ la propriété
- la valeur
= Sélecteur `p`, propriété `color`, valeur `red`.
? `h1, h2 {color: yellow} h1 {color: red}` : le h1 est…
- jaune
+ rouge
- orange
= À sélecteur équivalent, la dernière règle gagne.
? Le sélecteur `.menu` vise…
- la balise `<menu>`
+ les éléments qui ont `class="menu"`
- l'élément `id="menu"`
= Point = classe.
? Combien d'éléments peuvent porter le même id ?
+ un seul
- deux
- autant qu'on veut
= Un id est unique dans le document.
? `div p` sélectionne…
- tous les div et tous les p
+ les p contenus dans un div
- le p qui suit un div
= Espace = descendant.
? `h3 + p` sélectionne…
- tous les p après un h3
+ le p qui suit immédiatement un h3
- les p dans un h3
= Successeur direct, sans être inclus.
? `h2[title]` vise…
+ les h2 qui ont un attribut title
- les h2 dont le texte est « title »
- les h2 de classe title
= Sélecteur d'attribut, quelle que soit la valeur.
? Le sélecteur universel s'écrit…
- `all`
+ `*`
- `#`
= `* { }` vise tous les éléments.
```

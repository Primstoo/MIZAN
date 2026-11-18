---
id: css-pseudo-couleurs-polices
titre: CSS3 (2) · pseudo-classes, unités, couleurs, polices et texte
seance: Partie III · CSS3, mise en forme du texte
importance: 4
---

## Avant de commencer

Tu dois savoir écrire une règle CSS et un sélecteur (chapitre 6).

```exercice Vérifie ton prérequis
? Écris la règle qui centre tous les titres `h1`.
= `h1 { text-align: center; }`
```

## Comment aborder ce chapitre

> [!astuce] **Ce chapitre est un dictionnaire.** Ne l'apprends pas d'un bloc : retiens la **famille** de chaque propriété (`font-…` = la police, `text-…` = le texte, `color` = la couleur) et retrouve le reste par le nom.

> [!piege] Écrire `font-color` ou `text-color`. Ces propriétés **n'existent pas** : la couleur du texte, c'est **`color`**.

À la fin, tu sais styler un lien selon son état, lire une couleur hexadécimale, choisir une police avec une famille de secours et utiliser le raccourci `font`.

## Idée 1 · Pseudo-classes : styler un état

```flux Les états d'un lien (ordre conseillé : LoVe HAte)
a:link (jamais visité) -> a:visited (déjà visité) -> a:hover (survolé) -> a:active (en train d'être cliqué)
```

```css
a:link    { color: black; text-decoration: none; }
a:visited { color: purple; }
a:hover   { color: green; text-decoration: underline; }  /* TP 1 */
a:active  { color: red; }

.lettrine::first-letter { font-size: 4em; margin-right: 5px; }
p::first-line { font-weight: bold; }
h1::before { content: "► "; }
h2::after  { content: url(new.png); }
```

Syntaxe : `sélecteur:pseudo-classe { … }`. Elle vise un **état** ou une **partie** de l'élément qu'aucune balise ne marque.

| Pseudo | Vise |
|---|---|
| `:link`, `:visited` | lien non visité, visité |
| `:hover` | survol de la souris (**sur n'importe quel élément**, pas que les liens) |
| `:active` | moment du clic |
| `:first-letter` | 1re lettre (effet **lettrine**) |
| `:first-line` | 1re ligne (dépend de la largeur de la boîte) |
| `:before`, `:after` | insère un contenu avant / après, **avec `content`** |

> [!attention] Le cours appelle tout cela « pseudo-classes ». En CSS3, `first-letter`, `first-line`, `before`, `after` sont des **pseudo-éléments**, notés avec **deux** deux-points (`::before`). La notation à un seul `:` marche encore. Les diapos écrivent aussi `:firstletter`, `marginleft` sans tiret : les vrais noms sont **`:first-letter`**, **`margin-left`**.

> [!piege] `:before` ou `:after` sans propriété **`content`** n'affiche **rien**.

## Idée 2 · Couleurs : RGB et hexadécimal

```grille Une couleur = 3 octets (rouge, vert, bleu), de 0 à 255 (00 à FF)
#cols: notation rouge vert bleu
#rows: blanc orange noir
#ffffff *ff !ff ~ff
#D9824F *D9 !82 ~4F
#000 *0 !0 ~0
```

| Notation | Blanc | Remarque |
|---|---|---|
| hexadécimale | `#ffffff` | 2 chiffres hexa par couleur |
| hexa courte | `#fff` | chaque chiffre est **doublé** : `#f80` = `#ff8800` |
| RGB | `rgb(255, 255, 255)` | 0 à 255 |
| HSL | `hsl(0, 0%, 100%)` | teinte, saturation, luminosité |
| mot clé | `white` | 16 couleurs de base (black, red, navy, purple…) |

256 × 256 × 256 = **16 777 216** couleurs (« plus de 16 millions »). La synthèse est **additive** : rouge + vert + bleu au maximum = blanc.

Conversion hexa → RGB, vérifiée par programme (code hors supports, pour t'entraîner) :

```javascript
function hexVersRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");  // forme courte doublée
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
console.log(hexVersRgb("#000080"));
console.log(hexVersRgb("#800080"));
console.log(hexVersRgb("#fc0"));
console.log(256 ** 3);
```

```sortie
rgb(0, 0, 128)
rgb(128, 0, 128)
rgb(255, 204, 0)
16777216
```

```etapes Lire #800080 (couleur des labels du TD) à la main
Découpe en 3 paires :: 80 | 00 | 80.
Convertis chaque paire :: 80 en hexa = 8 × 16 + 0 = 128 ; 00 = 0.
Lis :: rgb(128, 0, 128) : autant de rouge que de bleu, pas de vert → violet (`purple`).
```

## Idée 3 · Polices : font-family, taille, style, raccourci font

```css
body { font-family: Arial, Helvetica, sans-serif; }   /* liste de secours */
h1   { font-family: "Times New Roman", serif; }       /* guillemets si espaces */
h3   { font-style: italic; }                           /* normal | italic | oblique */
p    { font-weight: bold; }                            /* normal | bold | 100..900 */
p    { font-size: 12pt; }
.caps { font-variant: small-caps; }                    /* petites majuscules */

p { font: italic bold small-caps 24pt Arial, sans-serif; }   /* raccourci */
```

- Le navigateur prend la **première police installée** de la liste ; termine toujours par une **famille générique** : `serif`, `sans-serif`, `cursive`, `fantasy`, `monospace`.
- Nom avec espaces → **entre guillemets**. Les noms ne sont pas sensibles à la casse.

> [!retenir] Raccourci `font` : style, variante, graisse, puis **taille et famille en dernier** (obligatoires), séparés par des espaces.

> [!piege] Le TD demande les polices « Bauhaus » ou « Bodoni MT Black » : elles n'existent que si elles sont installées sur le PC. Ajoute toujours une famille générique de secours : `font-family: "Bodoni MT Black", serif;`.

## Idée 4 · Unités et propriétés du texte

| Unités absolues (fixes) | Unités relatives (s'adaptent) |
|---|---|
| `px` pixel, `pt` point, `cm`, `mm`, `in` pouce, `pc` pica | `%`, `em` (taille de police du parent), `rem` (de la racine) |

```css
h1 { text-align: center; text-transform: uppercase; }
p  { text-indent: 1cm; line-height: 1.5; }
a  { text-decoration: none; }        /* underline | overline | line-through | none */
h1 { letter-spacing: 2pt; }
h3 { word-spacing: 5pt; }
pre { white-space: pre; }
```

| Propriété | Valeurs |
|---|---|
| `text-align` | left, center, right, justify |
| `text-transform` | uppercase, lowercase, capitalize |
| `text-decoration` | underline, overline, line-through, none |
| `text-indent` | retrait de la 1re ligne |
| `line-height` | interligne |
| `letter-spacing` / `word-spacing` | espace entre lettres / entre mots |

> [!attention] Le cours cite `text-decoration: blink` : cette valeur est **ignorée** par les navigateurs actuels. Il écrit aussi `heigh: 100px` (lire **`height`**).

## S'exercer

```exercice Mise en forme
? Convertis `#C0C0C0` en rgb : quelle valeur obtiens-tu pour chaque composante ?
indice: C = 12, donc C0 = 12 × 16.
reponse: 192
= C0 = 12 × 16 + 0 = 192 pour les trois : **rgb(192, 192, 192)**, le gris argent (`silver`).
? Écris les règles du TP 1 : liens rouges, gras, non soulignés ; au survol verts et soulignés.
= ~~~
a { color: red; text-decoration: none; font-weight: bold; }
a:hover { color: green; text-decoration: underline; }
~~~
? Réécris avec le raccourci `font` : `font-style: italic; font-weight: bold; font-size: 20pt; font-family: Georgia, serif;`
= `font: italic bold 20pt Georgia, serif;`
? Écris la règle du TD pour `legend` : gras, couleur #000080, taille 40 pt, police Bauhaus.
= `legend { font-weight: bold; color: #000080; font-size: 40pt; font-family: "Bauhaus 93", sans-serif; }` (le nom exact installé sous Windows est souvent « Bauhaus 93 »).
```

## Flashcards

```cartes
Propriété de la couleur du texte ? :: color (pas font-color).
Les 4 états d'un lien ? :: :link, :visited, :hover, :active (dans cet ordre).
:hover marche-t-il hors des liens ? :: Oui, sur n'importe quel élément.
Que faut-il avec :before / :after ? :: La propriété content, sinon rien ne s'affiche.
#fff en version longue ? :: #ffffff (chaque chiffre doublé).
Combien de couleurs en RGB 24 bits ? :: 256³ = 16 777 216.
Familles génériques de polices ? :: serif, sans-serif, cursive, fantasy, monospace.
Ordre du raccourci font ? :: style variante graisse taille famille (taille et famille obligatoires, à la fin).
Enlever le soulignement d'un lien ? :: text-decoration: none;
em vs px ? :: em est relatif à la taille de police du parent ; px est absolu.
```

## QCM du chapitre

```qcm
? Quelle propriété change la couleur du texte ?
- `font-color`
- `text-color`
+ `color`
= `font-color` n'existe pas.
? `a:hover` s'applique…
- aux liens déjà visités
+ au survol de la souris
- au moment du clic
= Le clic, c'est `:active`.
? Que faut-il pour qu'un `h1::before` affiche quelque chose ?
- `display: block`
+ la propriété `content`
- un attribut `before`
= Sans `content`, aucun contenu n'est inséré.
? `#f80` équivaut à…
+ `#ff8800`
- `#f80000`
- `#0f0080`
= Chaque chiffre est doublé.
? `rgb(255, 255, 255)` est…
- noir
+ blanc
- rouge
= Synthèse additive : tout au maximum = blanc.
? Pourquoi terminer `font-family` par `sans-serif` ?
- c'est obligatoire en CSS3
+ c'est une police de secours si les autres manquent
- pour mettre le texte en gras
= Le navigateur prend la première police disponible.
? `font-variant: small-caps` donne…
- du texte barré
+ des petites majuscules
- du texte en exposant
= Petites capitales.
? Quelle unité est relative ?
- `px`
- `cm`
+ `em`
= `em` dépend de la taille de police du parent.
? `text-transform: capitalize` …
- met tout en majuscules
+ met la première lettre de chaque mot en majuscule
- met tout en minuscules
= `uppercase` met tout en majuscules.
? Dans le raccourci `font`, quels éléments sont obligatoires ?
- le style et la graisse
+ la taille et la famille
- la variante
= `font: 24pt Arial;` est valide ; `font: italic bold;` ne l'est pas.
```

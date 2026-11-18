---
id: css-boite-fonds-listes
titre: CSS3 (3) · arrière-plans, modèle de boîte, listes et menu
seance: Partie III · CSS3, boîtes · TP 2
importance: 5
---

## Avant de commencer

Tu dois savoir écrire une règle CSS et distinguer bloc / en ligne (chapitres 3 et 6).

```exercice Vérifie ton prérequis
? Par défaut, des `<li>` s'affichent-ils côte à côte ou l'un sous l'autre ?
= L'un sous l'autre : ce sont des éléments **bloc** (plus précisément `list-item`). Pour en faire un menu horizontal, il faudra changer leur `display`.
```

## Comment aborder ce chapitre

> [!astuce] **Chaque élément est une boîte rectangulaire.** Du centre vers l'extérieur : contenu, padding, bordure, marge. Dès qu'un espacement te gêne, demande-toi : est-il **dedans** (padding) ou **dehors** (margin) ?

> [!piege] Confondre `padding` et `margin`. Le padding prend la **couleur de fond** de l'élément ; la marge est **transparente**. Si le fond « déborde », c'est du padding.

À la fin, tu sais poser une image de fond, régler marges, bordures et padding (avec les raccourcis à 1, 2 ou 4 valeurs), arrondir des coins, ajouter une ombre et transformer une liste en menu horizontal.

## Idée 1 · Le modèle de boîte

```html
<svg viewBox="0 0 520 250" style="width:100%;max-width:520px;display:block;margin:10px auto" role="img" aria-label="Modèle de boîte : de l'extérieur vers l'intérieur, margin (transparente), border, padding, puis le contenu">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="10" y="10" width="500" height="230" fill="none" stroke="currentColor" stroke-dasharray="6 4"/><text x="260" y="30">margin (extérieur, transparente)</text>
<rect x="50" y="42" width="420" height="166" fill="none" stroke="#D9824F" stroke-width="6"/><text x="260" y="66" fill="#D9824F">border</text>
<rect x="90" y="78" width="340" height="104" fill="#D9824F" fill-opacity="0.15" stroke="currentColor"/><text x="260" y="98">padding (intérieur, a le fond)</text>
<rect x="170" y="110" width="180" height="56" fill="none" stroke="currentColor" stroke-width="2"/><text x="260" y="143" font-weight="700">contenu</text>
</g></svg>
```

```css
section {
    padding: 20px;               /* espace intérieur */
    border: 1px solid #ccc;      /* épaisseur, style, couleur */
    margin: 10px;                /* espace extérieur */
    border-radius: 8px;          /* coins arrondis */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);   /* ombre : x y flou couleur */
}
```

```etapes Les raccourcis margin / padding (sens des aiguilles d'une montre)
1 valeur :: `margin: 10px` → les 4 côtés.
2 valeurs :: `margin: 10px 20px` → haut et bas 10, gauche et droite 20.
4 valeurs :: `margin: 1px 2px 3px 4px` → **haut, droite, bas, gauche** (TRouBLe : Top Right Bottom Left).
Côté seul :: `margin-top`, `margin-right`, `margin-bottom`, `margin-left` (pareil pour `padding-…`).
```

**Exemple chiffré.** Une boîte `width: 200px; padding: 10px; border: 2px solid;` occupe à l'écran 200 + 2×10 + 2×2 = **224 px** de large (sans compter les marges).

> [!attention] Ce calcul suppose `box-sizing: content-box` (valeur par défaut, hors supports). Avec `box-sizing: border-box`, la largeur 200 px **inclut** padding et bordure.

## Idée 2 · Bordures

| Propriété | Valeurs |
|---|---|
| `border-width` (ou `border-top-width`…) | `thin`, `medium`, `thick`, ou une longueur |
| `border-style` | `none`, `solid`, `dotted`, `dashed`, `double`, `groove`, `ridge`, `inset`, `outset` |
| `border-color` | une couleur |
| `border` | raccourci : `border: 3px solid red;` |
| `border-radius` | coins arrondis ; `50%` sur une image carrée = **photo ronde** (bonus TP 2) |

> [!piege] Sans `border-style`, une bordure **ne s'affiche pas**, même avec une épaisseur et une couleur : le style par défaut est `none`.

> [!attention] La diapo écrit `{border-style: soliddashed}` : il manque l'espace. `border-style: solid dashed;` donne haut/bas pleins et gauche/droite en tirets.

## Idée 3 · Arrière-plans

```css
header {
    background-color: #003366;
    background-image: url(img/fond.jpg);
    background-repeat: no-repeat;        /* repeat | repeat-x | repeat-y | no-repeat */
    background-position: right top;
    background-attachment: fixed;        /* scroll | fixed */
}
p { background: url(motif.gif) repeat-x fixed; }   /* raccourci */
```

| Propriété | Rôle |
|---|---|
| `background-color` | couleur de fond (ou `transparent`) |
| `background-image` | image de fond, **avec `url(...)`** |
| `background-repeat` | `repeat-x` : répète **horizontalement** ; `repeat-y` : **verticalement** |
| `background-position` | position (`top/center/bottom`, `left/center/right`) |
| `background-attachment` | `fixed` : l'image ne défile pas avec la page |

> [!attention] Erreurs des diapos : `background-image: image.gif` doit s'écrire **`background-image: url(image.gif)`** ; `repeat-x` ne veut pas dire « x = nombre de répétitions » mais « répéter selon l'axe **x** » ; `background-repeat: repeat4` n'existe pas ; `background-attachement` s'écrit **`background-attachment`**.

## Idée 4 · Listes et menu horizontal (TP 2)

```css
ul { list-style-type: square; }          /* disc | circle | square | decimal | lower-roman | upper-alpha… */
ol { list-style-image: url(puce.png); }
ul { list-style-position: inside; }      /* inside | outside */
```

```flux Transformer une liste en menu (TP 2, exercice 4)
nav ul : list-style none + padding 0 -> nav li : display inline-block -> nav li : margin-right pour espacer
```

```css
nav ul { list-style: none; padding: 0; }
nav li { display: inline-block; margin-right: 15px; }
nav a  { color: white; text-decoration: none; }
```

```html
<nav style="background:#003366;padding:10px 14px;border-radius:6px;margin:10px 0">
<ul style="list-style:none;padding:0;margin:0">
<li style="display:inline-block;margin-right:15px"><a href="#" style="color:#fff;text-decoration:none" onclick="return false">Accueil</a></li>
<li style="display:inline-block;margin-right:15px"><a href="#" style="color:#fff;text-decoration:none" onclick="return false">À propos</a></li>
<li style="display:inline-block;margin-right:15px"><a href="#" style="color:#fff;text-decoration:none" onclick="return false">Contact</a></li>
</ul></nav>
```

> [!retenir] `display: inline-block` met les éléments **côte à côte** (comme en ligne) tout en acceptant **largeur, hauteur, marges et padding** (comme un bloc). Le TD l'utilise aussi pour aligner les `label`.

**Bonus du TD : transition.** `transition: all 3s;` anime le changement de style ; `transform: translateX(10px);` déplace l'élément de 10 px vers la droite.

```css
input[type=submit]:hover {
    transition: all 3s;
    transform: translateX(10px);
    background-color: purple;
    color: #ACF;
}
```

> [!attention] `transition`, `transform`, `box-shadow` et `border-radius` apparaissent dans le TD et le TP 2 mais **ne sont pas expliqués dans les diapos**. Pour que la transition joue aussi au retour, on la place plutôt sur l'état normal (`input[type=submit] { transition: all 3s; }`).

## S'exercer

```exercice Boîtes et menu
? Une boîte a `width: 300px; padding: 15px; border: 5px solid black; margin: 20px;`. Quelle largeur occupe sa **bordure extérieure** (sans la marge) ?
indice: largeur + 2 × padding + 2 × bordure.
reponse: 340
= 300 + 2×15 + 2×5 = **340 px**. Avec la marge, l'espace total réservé est 380 px.
? Que donne `padding: 5px 10px 15px 20px;` ?
= Haut 5 px, droite 10 px, bas 15 px, gauche 20 px (sens des aiguilles d'une montre).
? Écris le CSS du TP 2, exercice 2 : sections avec padding 20 px, marge 10 px, bordure fine grise ; header fond bleu foncé, texte blanc.
= ~~~
section { padding: 20px; margin: 10px; border: 1px solid #ccc; }
header { background-color: #003366; color: white; }
~~~
? Rends ronde une image de profil de classe `profile-pic` large de 150 px.
= `.profile-pic { width: 150px; height: 150px; border-radius: 50%; }` (l'image doit être carrée pour un cercle parfait).
```

## Flashcards

```cartes
Ordre du modèle de boîte (intérieur → extérieur) ? :: Contenu, padding, border, margin.
padding vs margin ? :: padding : espace intérieur, a la couleur de fond. margin : espace extérieur, transparent.
margin avec 4 valeurs ? :: haut, droite, bas, gauche (sens horaire).
Pourquoi ma bordure ne s'affiche pas ? :: Il manque border-style (none par défaut).
Image de fond ? :: background-image: url(fichier.jpg);
repeat-x ? :: Répète l'image de fond horizontalement.
Enlever les puces d'une liste ? :: list-style: none;
Menu horizontal ? :: nav li { display: inline-block; }
Photo ronde ? :: border-radius: 50%;
Ombre portée ? :: box-shadow: x y flou couleur; ex. 0 4px 8px rgba(0,0,0,0.1)
```

## QCM du chapitre

```qcm
? De l'intérieur vers l'extérieur, la boîte CSS est…
- contenu, margin, border, padding
+ contenu, padding, border, margin
- contenu, border, padding, margin
= Le padding est entre le contenu et la bordure.
? Quel espace prend la couleur de fond de l'élément ?
+ le padding
- la margin
- aucun des deux
= La marge est transparente.
? `margin: 10px 20px;` donne…
+ haut/bas 10px, gauche/droite 20px
- haut 10px, droite 20px, rien ailleurs
- gauche/droite 10px, haut/bas 20px
= Deux valeurs : vertical puis horizontal.
? `width: 100px; padding: 10px; border: 1px solid;` (content-box) : largeur visible ?
- 100 px
- 111 px
+ 122 px
= 100 + 2×10 + 2×1.
? Pourquoi `border: 2px red;` n'affiche rien ?
- il manque l'unité
+ il manque le style (solid…)
- `red` est invalide
= Le style par défaut est `none`.
? La bonne écriture d'une image de fond est…
- `background-image: fond.jpg;`
+ `background-image: url(fond.jpg);`
- `background: src(fond.jpg);`
= La diapo oublie `url()`.
? `background-repeat: repeat-y` …
- répète l'image y fois
+ répète l'image verticalement
- ne répète pas l'image
= x = horizontal, y = vertical.
? Pour enlever les puces d'une liste :
- `list-style-type: disc`
+ `list-style: none`
- `display: none`
= `display: none` cacherait toute la liste.
? Pour mettre des `li` côte à côte en gardant marges et padding :
- `display: block`
+ `display: inline-block`
- `float: none`
= C'est la méthode du TP 2.
? `border-radius: 50%` sur une image carrée donne…
- une image cachée
+ une image ronde
- une image deux fois plus petite
= Bonus du TP 2.
```

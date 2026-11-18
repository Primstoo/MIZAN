---
id: texte-listes-liens
titre: HTML5 (2) · blocs et en ligne, texte, listes et liens
seance: Partie II · HTML5, contenu textuel
importance: 4
---

## Avant de commencer

Tu dois savoir écrire le squelette d'une page et placer un attribut (chapitre 2).

```exercice Vérifie ton prérequis
? Dans `<a href="page2.html">Suite</a>`, quel est le nom de l'attribut et quelle est sa valeur ?
= L'attribut est `href`, sa valeur est `page2.html`.
```

## Comment aborder ce chapitre

> [!astuce] **Demande-toi : « ce morceau prend toute la ligne, ou il reste dans la phrase ? »** Toute balise de texte est soit **bloc** (elle s'empile), soit **en ligne** (elle reste dans le flux).

> [!piege] Choisir une balise pour son **apparence** (`<h3>` parce que « c'est la bonne taille »). HTML décrit le **sens** ; la taille, c'est le rôle du CSS.

À la fin, tu sais structurer un texte (titres, paragraphes, listes) et créer les quatre sortes de liens du cours : vers un site, vers une page du site, vers une ancre de la même page, vers une adresse mail.

## Idée 1 · Bloc ou en ligne

```html
<svg viewBox="0 0 560 170" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Les éléments bloc s'empilent sur toute la largeur ; les éléments en ligne restent côte à côte dans la ligne de texte">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<text x="20" y="20" font-weight="700">Bloc : s'empilent</text>
<rect x="20" y="30" width="250" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="30" y="50">&lt;p&gt; Paragraphe 1</text>
<rect x="20" y="70" width="250" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="30" y="90">&lt;p&gt; Paragraphe 2</text>
<rect x="20" y="110" width="250" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="30" y="130">&lt;h2&gt; Titre</text>
<text x="300" y="20" font-weight="700">En ligne : restent dans la phrase</text>
<rect x="300" y="30" width="250" height="40" fill="none" stroke="currentColor"/>
<text x="308" y="55">texte en</text><rect x="365" y="40" width="45" height="22" fill="none" stroke="#D9824F" stroke-width="2"/><text x="370" y="55">gras</text><text x="416" y="55">et en</text><rect x="453" y="40" width="58" height="22" fill="none" stroke="#D9824F" stroke-width="2"/><text x="457" y="55">italique</text>
</g></svg>
```

| Bloc (toute la largeur, l'un sous l'autre) | En ligne (dans le flux du texte) |
|---|---|
| `h1`…`h6`, `p`, `blockquote`, `hr` | `strong`, `em`, `br` |
| `ol`, `ul`, `dl` | `a`, `img` |
| `table`, `form` | `input`, `select`, `textarea` |
| **`div`** : division générique | **`span`** : division en ligne générique |

`<p>Paragraphe 1</p><p>Paragraphe 2</p>` s'affiche sur **deux lignes** ; `texte en <strong>gras</strong> et en <em>italique</em>` sur **une seule**.

> [!retenir] `div` et `span` n'ont aucun sens : ce sont des « boîtes vides » qu'on crée pour leur appliquer du **CSS**. `div` est bloc, `span` est en ligne.

## Idée 2 · Titres, paragraphes et mise en forme du texte

```grille Six niveaux de titres
#cols: balise importance
*h1 titre très important (un seul par page en général)
h2 titre important
h3 3e niveau
h4 4e niveau
h5 5e niveau
~h6 6e niveau
```

```markup
<h1>Programmation Web 1</h1>
<h2>Chapitre 1</h2>
<p>Le <strong>web</strong> repose sur <em>internet</em>.<br>
H<sub>2</sub>O et x<sup>2</sup>, et un prix <del>200 DH</del> 150 DH.</p>
```

```html
<div style="border:1px solid currentColor;border-radius:8px;padding:8px 14px;margin:8px 0">
<p style="margin:4px 0">Le <strong>web</strong> repose sur <em>internet</em>.<br>H<sub>2</sub>O et x<sup>2</sup>, et un prix <del>200 DH</del> 150 DH.</p>
</div>
```

| Balise | Effet |
|---|---|
| `strong` / `b` | gras (`strong` = important) |
| `em` / `i` | italique (`em` = mise en valeur) |
| `sub` / `sup` | indice / exposant |
| `del` | texte barré |
| `u` | souligné |
| `small` | plus petit |

> [!attention] La diapo « Traitement de texte » liste aussi `<FONT color=…>`, `<FONT size=…>`, `<BIG>`, `<BLINK>`, `<NOBR>`. Ces balises sont **obsolètes en HTML5** (BLINK ne marchait que sur Netscape). Pour la couleur et la taille, utilise le CSS : `color`, `font-size`.

## Idée 3 · Trois sortes de listes

```markup
<ol>                          <!-- ordered list : numérotée -->
    <li>premier élément</li>  <!-- list item -->
    <li>deuxième élément</li>
</ol>
<ul>                          <!-- unordered list : à puces -->
    <li>HTML</li>
    <li>CSS
        <ol>                  <!-- liste imbriquée : DANS le li -->
            <li>sélecteurs</li>
            <li>cascade</li>
        </ol>
    </li>
</ul>
<dl>                          <!-- liste de définitions -->
    <dt>CSS</dt><dd>Cascading Style Sheets</dd>
</dl>
```

```html
<div style="border:1px solid currentColor;border-radius:8px;padding:6px 14px;margin:8px 0">
<ol><li>premier élément</li><li>deuxième élément</li></ol>
<ul><li>HTML</li><li>CSS<ol><li>sélecteurs</li><li>cascade</li></ol></li></ul>
<dl><dt>CSS</dt><dd>Cascading Style Sheets</dd></dl>
</div>
```

> [!piege] Une liste imbriquée se place **à l'intérieur d'un `<li>`**, pas directement dans `<ul>` entre deux `<li>`.

## Idée 4 · Les liens : `<a href>`

```flux Où mène href ?
https://site.com (autre site) -> page2.html (même dossier) -> dossier/page2.html (sous-dossier) -> #id (même page) -> mailto:adresse (mail)
```

`a` = *anchor* (ancre), `href` = *hypertext reference* (où conduit le lien).

```markup
<a href="https://www.usms.ac.ma" target="_blank" title="Site de l'université">USMS</a>
<a href="page2.html">Page 2</a>
<a href="sous-dossier/page2.html">Page 2 rangée dans un sous-dossier</a>
<a href="#chap2">Aller au chapitre 2</a>
...
<h2 id="chap2">Chapitre 2</h2>
<a href="mailto:club.info@exemple.ma">Écrire au club</a>
```

```etapes Créer une table des matières (lien interne)
Marquer la cible :: Donne un `id` unique à l'élément d'arrivée : `<h2 id="chap2">`.
Créer le lien :: `href` commence par `#` puis l'id : `<a href="#chap2">`.
Le « # » :: Il dit au navigateur de **rester sur la même page** et de défiler jusqu'à l'élément.
```

| Attribut | Valeur | Effet |
|---|---|---|
| `target` | `_self` (défaut) | même fenêtre |
| | `_blank` | nouvel onglet / nouvelle fenêtre |
| | `_top` | même fenêtre, en plein écran (≈ `_self` sans cadres) |
| `title` | texte | **infobulle** au survol |

> [!attention] La diapo écrit `target="_balnk"` : c'est une faute de frappe. La bonne valeur est **`_blank`**. Avec la faute, le navigateur ouvre un onglet nommé « _balnk » et le réutilise.

> [!prof] Un lien `mailto:` ne marche que si un logiciel de messagerie est installé sur l'ordinateur.

## S'exercer

```exercice Écrire des liens et des listes
? Écris un lien vers Wikipédia (`https://fr.wikipedia.org`) qui s'ouvre dans un nouvel onglet et affiche l'infobulle « Encyclopédie » (TP 1, exercice 3).
= `<a href="https://fr.wikipedia.org" target="_blank" title="Encyclopédie">Wikipédia</a>`
? La page `index.html` est à la racine ; `cours.html` est dans le dossier `s3`. Écris le lien depuis `index.html`.
= `<a href="s3/cours.html">Cours S3</a>` : chemin relatif, dossier puis nom du fichier.
? Écris une liste à puces de 3 compétences, dont la deuxième contient une liste numérotée de 2 éléments (bonus TP 1).
= ~~~
<ul>
    <li>HTML</li>
    <li>CSS
        <ol>
            <li>Sélecteurs</li>
            <li>Couleurs</li>
        </ol>
    </li>
    <li>Travail en équipe</li>
</ul>
~~~
```

## Flashcards

```cartes
Bloc vs en ligne ? :: Bloc : prend toute la largeur, s'empile (p, h1, div). En ligne : reste dans le texte (strong, a, span).
div vs span ? :: Deux conteneurs sans sens, pour le CSS : div est bloc, span est en ligne.
ol, ul, dl ? :: ol : liste numérotée ; ul : à puces ; dl : définitions (dt terme, dd définition).
Que signifient a et href ? :: a = anchor (ancre) ; href = hypertext reference (destination du lien).
Ouvrir un lien dans un nouvel onglet ? :: target="_blank"
Lien vers un élément de la même page ? :: Donner un id à la cible, puis href="#id".
Rôle de l'attribut title sur un lien ? :: Afficher une infobulle au survol.
Lien vers une adresse mail ? :: href="mailto:adresse@exemple.ma"
```

## QCM du chapitre

```qcm
? Quelle balise est de type bloc ?
- `<strong>`
+ `<p>`
- `<a>`
= Le paragraphe occupe toute la largeur.
? Quelle balise est en ligne ?
- `<div>`
- `<ul>`
+ `<span>`
= `span` est le conteneur générique en ligne.
? `<ol>` produit…
+ une liste numérotée
- une liste à puces
- une liste de définitions
= ol = ordered list.
? Comment écrire x² en HTML ?
- `x<sub>2</sub>`
+ `x<sup>2</sup>`
- `x<big>2</big>`
= sup = exposant, sub = indice.
? Quelle valeur de `target` ouvre un nouvel onglet ?
- `_self`
- `_top`
+ `_blank`
= `_self` est la valeur par défaut. Attention à la faute `_balnk` des diapos.
? Pour lier vers `<h2 id="tp">`, on écrit…
- `<a href="tp">`
+ `<a href="#tp">`
- `<a id="#tp">`
= Le `#` suivi de l'id.
? Quel attribut affiche une infobulle au survol d'un lien ?
- `alt`
+ `title`
- `href`
= `title` donne une brève description.
? Où se place une liste imbriquée ?
- entre deux `<li>`, directement dans `<ul>`
+ à l'intérieur d'un `<li>`
- après `</ul>`
= Le seul enfant direct autorisé de `ul`/`ol` est `li`.
? En HTML5, pour écrire un texte en rouge, on utilise…
- `<font color="red">`
+ la propriété CSS `color: red`
- `<blink>`
= `font` est obsolète ; la présentation passe par le CSS.
? `mailto:` dans un `href` sert à…
- envoyer un formulaire
+ ouvrir la messagerie pour écrire à une adresse
- télécharger un fichier
= Il faut un logiciel de messagerie installé.
```

---
id: structure-html5
titre: HTML5 (1) · balises, attributs et structure d'une page
seance: Partie II · HTML5, structure du document
importance: 5
---

## Avant de commencer

Il faut savoir ce qu'est un navigateur et une page web (chapitre 1). HTML est le langage que le navigateur lit pour construire la page.

```exercice Vérifie ton prérequis
? HTML est-il un langage front-end ou back-end ?
= **Front-end** : il décrit ce qui s'affiche, et c'est le navigateur (côté client) qui l'interprète.
```

## Comment aborder ce chapitre

> [!astuce] **Pense en boîtes qui s'emboîtent.** Une page HTML est un arbre : `html` contient `head` et `body`, `body` contient `header`, `section`… Chaque balise ouverte se ferme **dans la boîte où elle a été ouverte**.

> [!piege] Fermer les balises dans le mauvais ordre : `<b><i>texte</b></i>`. La **dernière** balise ouverte doit être la **première** fermée : `<b><i>texte</i></b>`.

À la fin, tu sais écrire de mémoire le squelette d'une page HTML5 et la découper en zones sémantiques (`header`, `nav`, `section`, `article`, `aside`, `footer`).

## Idée 1 · Une balise ouvre, une balise ferme, les attributs précisent

HTML (*HyperText Markup Language*) est un langage de **balisage** inventé par Tim Berners-Lee (1990-1991). Une **balise** marque le début et la fin d'un **élément** ; un **attribut** donne une précision, toujours dans la balise **ouvrante**.

```grille Anatomie d'un élément : <a href="contact.html">Contact</a>
#cols: ouvrante attribut valeur contenu fermante
!<a *href ="contact.html"> Contact !</a>
```

```markup
<balise attribut1="valeur" attribut2="valeur"> contenu </balise>
<p>Un paragraphe avec un mot en <strong>gras</strong>.</p>
<br>   <!-- balise orpheline : pas de fermante -->
<img src="logo.png" alt="Logo FSABM">
```

- Plusieurs attributs sont séparés par **un espace**, la valeur est **entre guillemets**.
- Les **balises orphelines** n'ont pas de fermante : `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>` (on peut écrire `<br />`).
- Un commentaire s'écrit `<!-- commentaire -->`.

> [!attention] Les diapos écrivent les commentaires `<! ... >` et citent `<image/>` comme balise orpheline. En HTML correct : un commentaire est **`<!-- ... -->`** (avec les deux tirets), et la balise image est **`<img>`**.

> [!retenir] Imbrication : **`<a><b><c>contenu</c></b></a>`** est correct, **`<a><b><c>contenu</a></c></b>`** est faux. La première fermante correspond à la dernière ouvrante non fermée.

## Idée 2 · Le squelette d'un document HTML5

```html
<svg viewBox="0 0 560 230" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Arbre du document : DOCTYPE, puis html qui contient head (meta, title, link) et body (contenu)">
<g font-family="monospace" font-size="14" fill="currentColor">
<text x="20" y="28" fill="#D9824F">&lt;!DOCTYPE html&gt;</text>
<rect x="20" y="40" width="520" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="32" y="62">&lt;html lang="fr"&gt;</text>
<rect x="40" y="74" width="230" height="130" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="52" y="96" fill="#D9824F">&lt;head&gt;</text>
<text x="62" y="124" font-size="12">&lt;meta charset="utf-8"&gt;</text>
<text x="62" y="148" font-size="12">&lt;title&gt;…&lt;/title&gt;</text>
<text x="62" y="172" font-size="12">&lt;link rel="stylesheet"…&gt;</text>
<rect x="290" y="74" width="230" height="130" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="302" y="96">&lt;body&gt;</text>
<text x="312" y="124" font-size="12">tout ce qui s'affiche :</text>
<text x="312" y="148" font-size="12">titres, textes, images,</text>
<text x="312" y="172" font-size="12">tableaux, formulaires…</text>
</g></svg>
```

```markup
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Titre du document</title>
</head>
<body>
    ...
</body>
</html>
```

```etapes Ce que fait chaque ligne
<!DOCTYPE html> :: Préambule (pas une balise) : annonce au navigateur un document HTML5. Avant HTML5, il citait une DTD ; en HTML5 il est simplifié et insensible à la casse.
<html lang="fr"> :: La **racine** du document. `lang` précise la langue.
<head> :: L'**en-tête** : propriétés globales, non affichées dans la page (titre, encodage, styles, scripts).
<meta charset="utf-8"> :: L'encodage des caractères. Une seule déclaration par document. Sans lui, les accents peuvent s'afficher en « Ã© ».
<title> :: Le titre affiché par le navigateur, dans l'onglet.
<body> :: Le **corps** : tout le contenu visible.
```

> [!prof] Le prof demande d'**indenter** le code avec Tab : chaque niveau d'imbrication décale d'un cran.

## Idée 3 · Découper la page en zones sémantiques

```html
<svg viewBox="0 0 520 260" style="width:100%;max-width:520px;display:block;margin:10px auto" role="img" aria-label="Maquette d'une page HTML5 : header avec nav en haut, section avec trois articles au centre, aside à droite, footer en bas">
<g font-family="monospace" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="10" y="10" width="500" height="50" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="120" y="40" fill="#D9824F">&lt;header&gt;</text>
<rect x="260" y="20" width="230" height="30" rx="4" fill="none" stroke="currentColor"/><text x="375" y="40">&lt;nav&gt;</text>
<rect x="10" y="70" width="350" height="130" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="185" y="90">&lt;section&gt;</text>
<rect x="20" y="100" width="105" height="90" rx="4" fill="none" stroke="currentColor"/><text x="72" y="150" font-size="12">&lt;article&gt;</text>
<rect x="132" y="100" width="105" height="90" rx="4" fill="none" stroke="currentColor"/><text x="185" y="150" font-size="12">&lt;article&gt;</text>
<rect x="244" y="100" width="105" height="90" rx="4" fill="none" stroke="currentColor"/><text x="297" y="150" font-size="12">&lt;article&gt;</text>
<rect x="370" y="70" width="140" height="130" rx="6" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/><text x="440" y="140">&lt;aside&gt;</text>
<rect x="10" y="210" width="500" height="40" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="260" y="236" fill="#D9824F">&lt;footer&gt;</text>
</g></svg>
```

HTML5 donne des **noms** aux grandes zones de la page. Le code devient lisible d'un coup d'œil.

| Balise | Rôle | Exemple de contenu |
|---|---|---|
| `<header>` | en-tête de la page, d'une section ou d'un article | logo, titre `h1`, menu, recherche |
| `<nav>` | bloc de liens de navigation | menu principal (souvent dans `header`), liens annexes (dans `footer`) |
| `<section>` | regroupe un contenu sur **une même thématique** | chapitre, onglet, partie d'un article |
| `<article>` | contenu **autonome**, qu'on pourrait extraire seul | billet de blog, actualité |
| `<aside>` | contenu **tangentiel**, non essentiel | glossaire, biographie, astuces, notes |
| `<footer>` | pied de page, de section ou d'article | mentions légales, contact, plan du site |

```markup
<body>
    <header>
        <h1>Club Info FSABM</h1>
        <nav>
            <ul>
                <li><a href="index.html">Accueil</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <section>
        <h2>Actualités</h2>
        <article>
            <h3>Atelier HTML jeudi</h3>
            <p>Salle B12, 14 h.</p>
        </article>
    </section>
    <aside>
        <h2>Glossaire</h2>
        <dl><dt>CSS</dt><dd>Cascading Style Sheets</dd></dl>
    </aside>
    <footer><p>Tous droits réservés</p></footer>
</body>
```

> [!piege] Une `section` peut contenir des `article`, **et** un `article` peut contenir des `section` (le cours donne les deux exemples : une section d'articles, et un article « Les couleurs » découpé en sections « Le rouge », « Le vert »). Il n'y a pas d'ordre imposé : choisis selon le sens.

> [!attention] Une diapo dit que les grandes zones sont « l'entête header, la navigation, la zone principale **aside**, le pied de page ». C'est une erreur : `aside` est le contenu **secondaire**. La zone principale est `<main>` (vue au TP 2) ou une `section`.

## S'exercer

```exercice Écrire du HTML
? Écris le squelette HTML5 complet d'une page en français, encodée en UTF-8, dont l'onglet affiche « Mon Portfolio - Accueil » (TP 1, exercice 2).
= ~~~
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon Portfolio - Accueil</title>
</head>
<body>
</body>
</html>
~~~
? Corrige : `<p><strong>Bonjour <em>à tous</p></em></strong>`
= Les fermantes vont dans l'ordre inverse des ouvrantes : `<p><strong>Bonjour <em>à tous</em></strong></p>`.
? Pour un blog, quelle balise choisir pour : (a) chaque billet, (b) la liste « Articles récents » à côté, (c) le menu ?
= (a) `<article>` (contenu autonome), (b) `<aside>` (contenu annexe), (c) `<nav>`.
```

## Flashcards

```cartes
Que veut dire HTML ? :: HyperText Markup Language : langage de balisage hypertexte.
Où s'écrit un attribut ? :: Dans la balise ouvrante : <balise attribut="valeur">.
Rôle de <!DOCTYPE html> ? :: Préambule qui annonce un document HTML5 au navigateur (pas une vraie balise).
Contenu de <head> ? :: Propriétés globales non affichées : meta, title, link, style, script.
Rôle de <meta charset="utf-8"> ? :: Déclare l'encodage des caractères (une seule fois par document).
article vs section ? :: article : contenu autonome extractible. section : regroupement thématique.
Rôle de <aside> ? :: Contenu tangentiel, non essentiel : glossaire, biographie, notes.
Syntaxe d'un commentaire HTML ? :: <!-- commentaire -->
```

## QCM du chapitre

```qcm
? Quelle imbrication est correcte ?
- `<b><i>texte</b></i>`
+ `<b><i>texte</i></b>`
- `<b><i>texte</b>`
= La dernière balise ouverte se ferme en premier.
? Où place-t-on les attributs ?
+ dans la balise ouvrante
- dans la balise fermante
- entre les deux balises
= `<a href="...">` : jamais dans `</a>`.
? `<!DOCTYPE html>` est…
- une balise de contenu affichée
+ un préambule qui indique au navigateur le type de document
- une feuille de style
= Ce n'est pas un tag HTML à part entière.
? Quelle balise est la racine du document ?
- `<head>`
- `<body>`
+ `<html>`
= `<html>` contient `<head>` et `<body>`.
? Que contient `<head>` ?
- le contenu visible
+ le titre, l'encodage, les liens vers les styles
- uniquement le menu
= Le head décrit le document ; le body l'affiche.
? Où s'affiche le contenu de `<title>` ?
- en gros en haut de la page
+ dans l'onglet du navigateur
- nulle part
= Pour un titre visible dans la page, on utilise `<h1>`.
? Quelle balise est orpheline ?
- `<p>`
+ `<br>`
- `<li>`
= `br`, `hr`, `img`, `input`, `meta`, `link` n'ont pas de fermante.
? Un billet de blog qu'on pourrait publier seul ailleurs se met dans…
+ `<article>`
- `<aside>`
- `<nav>`
= Article = contenu autonome.
? Un glossaire à côté du texte principal se met dans…
- `<header>`
+ `<aside>`
- `<footer>`
= Aside = contenu tangentiel.
? Quel attribut de `<html>` précise la langue ?
- `charset`
+ `lang`
- `language`
= `<html lang="fr">`. `charset` est un attribut de `<meta>`.
```

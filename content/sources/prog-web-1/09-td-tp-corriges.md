---
id: td-tp-corriges
titre: TD et TP 1-2 corrigés
seance: TD Web 1 (exercices 1 à 3) · TP 1 · TP 2
importance: 5
---

## Avant de commencer

Il faut avoir vu les formulaires (chapitre 5) et les sélecteurs CSS (chapitre 6). Le TD réutilise presque tout le cours.

```exercice Vérifie ton prérequis
? Quel sélecteur CSS vise uniquement les `<input type="text">` ?
= `input[type=text]` (sélecteur de valeur d'attribut).
```

## Comment aborder ce chapitre

> [!astuce] **Cherche d'abord, compare ensuite.** Lis l'énoncé, écris ta solution dans VS Code, ouvre-la dans le navigateur, puis seulement lis le corrigé.

> [!piege] Le corrigé manuscrit distribué contient des **fautes** (balise `meta` à la place de `link`, `classe=` au lieu de `class=`). Ne le recopie pas les yeux fermés : les corrections sont signalées ci-dessous.

À la fin, tu sais refaire les trois exercices du TD et le mini-projet portfolio des TP 1 et 2.

## Idée 1 · TD, exercice 1 : formulaire dans un tableau

**Énoncé.** Reproduire un formulaire : Num_CIN*, Nom*, Prénom*, Ville, Adresse Email*, la mention « (*) Champs obligatoires », une liste de cases « Modules de formation proposés » (HTML, JavaScript, PHP), et deux boutons Envoyer / Annuler, le tout dans un tableau bordé.

```etapes Méthode
Compter les colonnes :: 2 colonnes (libellé | champ). Les lignes « Modules » et « boutons » prennent toute la largeur → `colspan="2"`.
Un champ = une rangée :: `<tr><td><label></td><td><input></td></tr>`.
Obligatoires :: les champs avec * reçoivent `required`.
Cases :: `type="checkbox"`, chacune avec un `name`.
Boutons :: `submit` et `reset`.
```

```markup
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Exercice 1</title>
</head>
<body>
<form method="post" action="">
    <table border="1">
        <tr><td><label for="cin">Num_CIN*</label></td>
            <td><input type="text" name="cin" id="cin" required></td></tr>
        <tr><td><label for="nom">Nom*</label></td>
            <td><input type="text" name="nom" id="nom" required></td></tr>
        <tr><td><label for="prenom">Prenom*</label></td>
            <td><input type="text" name="prenom" id="prenom" required></td></tr>
        <tr><td><label for="ville">Ville</label></td>
            <td><input type="text" name="ville" id="ville"></td></tr>
        <tr><td><label for="email">Adresse Email*</label></td>
            <td><input type="email" name="email" id="email" required></td></tr>
        <tr><td></td><td>(*) Champs obligatoires</td></tr>
        <tr><td colspan="2">Modules de formation proposés<br>
            <input type="checkbox" name="html" id="m1"> <label for="m1">Le Langage HTML</label><br>
            <input type="checkbox" name="js" id="m2"> <label for="m2">Le Langage Javascript</label><br>
            <input type="checkbox" name="php" id="m3"> <label for="m3">Le Langage PHP</label>
        </td></tr>
        <tr><td colspan="2">
            <input type="submit" value="Envoyer"> <input type="reset" value="Annuler">
        </td></tr>
    </table>
</form>
</body>
</html>
```

> [!attention] Le corrigé manuscrit met `id` mais **pas de `name`** sur les `input` : le formulaire s'affiche, mais rien ne serait envoyé au serveur. On a ajouté `name`. On a aussi utilisé `type="email"` pour l'adresse (vu en cours), plus juste que `text`.

## Idée 2 · TD, exercice 2 : la page « Inscription EVAX VACCIN » et son style.css

**Énoncé.** Une page `Inscription.html` (formulaire dans un `fieldset` avec `legend`, champs dans un tableau) liée à `style.css`. Il faut écrire le CSS à partir d'un tableau de consignes.

```markup
<head>
    <meta charset="UTF-8">
    <title>Inscription</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<fieldset>
    <legend>Inscription EVAX VACCIN</legend>
    <form method="post" action="">
        <table>
            <tr><td><label for="cin">cin</label></td><td><input type="text" name="cin" id="cin"></td></tr>
            <!-- nom, prenom, Tel, code client... -->
            <tr><td><label for="mdp">Mot de passe :</label></td><td><input type="password" name="mdp" id="mdp"></td></tr>
            <tr><td><input type="submit" value="verif inscription"></td><td><input type="reset" value="Annuler"></td></tr>
        </table>
    </form>
</fieldset>
</body>
```

```css
/* style.css */
fieldset {
    width: 500px; height: 500px; padding: 2px;
    border-radius: 15px; background-color: lightblue;
}
legend { font-weight: bold; color: #000080; font-size: 40pt; font-family: "Bauhaus 93", sans-serif; }
label  { font-family: "Bodoni MT Black", serif; font-size: 20pt; color: #800080; display: inline-block; }
input[type=text] {
    background-color: lightblue; border: 1px solid red;
    font-family: Georgia, serif; font-size: 12px;
    border-radius: 5px; box-shadow: 1px 1px 2px #C0C0C0;
}
table { border: 3px solid red; }
td {
    font-family: "Arial Black", sans-serif; font-size: 12pt; color: #660033;
    font-weight: bold; border: 2px solid blue;
}
input[type=submit], input[type=reset] {
    box-shadow: 10px 10px 20px gray;
    background-color: #4CAF50;
    font-family: "Bauhaus 93", sans-serif; font-size: 20pt; color: #000080;
    transition: all 3s;
}
legend:hover { color: black; text-shadow: #FC0 1px 0 10px; }
input[type=submit]:hover, input[type=reset]:hover {
    transform: translateX(10px);
    background-color: purple; color: #ACF;   /* bonus */
}
```

> [!attention] Corrections par rapport à l'énoncé et au corrigé : (1) l'énoncé dit « largeur : 500 » **sans unité** : en CSS il faut `500px` ; (2) il écrit `box-shadow: 10 px 10px 20px gris` : il faut `10px` collé et **`gray`** (les mots clés sont en anglais) ; (3) le corrigé écrit les règles CSS **au milieu du HTML**, après `<legend>` : elles doivent aller dans le fichier `style.css` (ou dans `<style>`) ; (4) `text-shadow` s'écrit d'habitude `1px 0 10px #FC0`, l'ordre de l'énoncé est aussi accepté.

## Idée 3 · TD, exercice 3 : la page CV (structure HTML)

```flux Plan de la page CV
head (title, meta, link CV.css) -> header (CV_Nom Prénom) -> section profil (photo | présentation + bouton | contact) -> section compétences (barres) -> section centres d'intérêt (vignettes) -> footer
```

```markup
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CV de Hamza Alaoui</title>
    <link rel="stylesheet" href="CV.css">
</head>
<body>
<header><h1>CV_Hamza Alaoui</h1></header>

<section class="id-section">
    <div class="photo"><img src="photo.jpg" alt="Photo personnelle"></div>
    <div class="presentation">
        <h2>Qui suis-je ?</h2>
        <p>Étudiant MIP S3 à la FSABM.</p>
        <a href="cv.pdf" download>Télécharger mon CV</a>
    </div>
    <div class="contact">
        <p>Email : hamza@exemple.ma</p>
        <p>Tél : 06 00 00 00 00</p>
    </div>
</section>

<section>
    <h2>Compétences</h2>
    <h3>Professionnelles</h3>
    <p>HTML/CSS</p>
    <div class="conteneur-barre"><span class="barre l100"></span></div>
    <p>JavaScript</p>
    <div class="conteneur-barre"><span class="barre l30"></span></div>
    <h3>Personnelles</h3>
    <p>Créativité 90 %</p>
    <div class="conteneur-barre"><span class="barre l90"></span></div>
</section>

<section class="interets">
    <h2>Centres d'intérêt</h2>
    <div class="vignette">Football</div>
    <div class="vignette">Musique</div>
</section>

<footer><p>CV_Hamza Alaoui · 2025</p></footer>
</body>
</html>
```

```css
/* CV.css : les barres de compétences */
.conteneur-barre { background-color: #ddd; width: 300px; height: 12px; border-radius: 6px; }
.barre { display: block; height: 100%; background-color: #003366; border-radius: 6px; }
.l100 { width: 100%; }
.l90  { width: 90%; }
.l30  { width: 30%; }
```

> [!attention] Erreurs du corrigé manuscrit : à la question 1, il écrit **`<meta charset="stylesheet" href="CV.CSS">`** : c'est faux, on lie une feuille de style avec **`<link rel="stylesheet" href="CV.css">`** (et il manque le vrai `<meta charset="UTF-8">`). Il écrit aussi `classe="..."` au lieu de **`class="..."`**. Le `span` d'une barre doit être en `display: block` (ou `inline-block`) pour que `width` s'applique : sur un élément en ligne, `width` est ignoré.

## Idée 4 · TP 1 et TP 2 : le mini-projet portfolio

```etapes TP 1 · Structure & style
Ex. 1 : dossiers :: `TP_Web_NomPrenom/index.html` et `TP_Web_NomPrenom/css/style.css`.
Ex. 2 : squelette :: DOCTYPE, `html lang="fr"`, `meta charset="UTF-8"`, `title`.
Ex. 3 : contenu :: `h1`, `h2` « À propos », deux `p` avec `strong`/`em`, une `ul` de 3 points, un lien `target="_blank"`.
Ex. 4 : CSS :: `<link rel="stylesheet" href="css/style.css">` ; `body` (police, fond), `h1` (couleur, centré), liens sans soulignement + `a:hover`.
```

```etapes TP 2 · Sémantique, médias, boîte, menu
Ex. 1 : sémantique :: `h1` + menu dans `<header>` (menu dans `<nav>`), contenu dans `<main>` découpé en `<section id="about">`, `<section id="skills">`, bas de page dans `<footer>`.
Ex. 2 : box model :: `section { padding: 20px; margin: 10px; border: 1px solid #ccc; }`, header foncé avec texte blanc.
Ex. 3 : médias :: `<img src="img/profil.jpg" alt="..." class="profile-pic">` avec `width: 150px`, vidéo `<video controls>`.
Ex. 4 : menu :: `nav ul { list-style: none; padding: 0; }`, `nav li { display: inline-block; margin-right: 15px; }`.
Bonus :: `border-radius: 50%` (photo ronde), `box-shadow: 0 4px 8px rgba(0,0,0,0.1)`, `background-image: url(...)` sur le header.
```

```markup
<body>
    <header>
        <h1>Mon Portfolio</h1>
        <nav>
            <ul>
                <li><a href="#about">À propos</a></li>
                <li><a href="#skills">Compétences</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="about">
            <h2>À propos</h2>
            <img src="img/profil.jpg" alt="Photo de Hamza" class="profile-pic">
            <p>Je suis <strong>étudiant</strong> en <em>MIP</em>.</p>
        </section>
        <section id="skills">
            <h2>Compétences</h2>
            <ul><li>HTML5</li><li>CSS3</li><li>Travail en équipe</li></ul>
        </section>
    </main>
    <footer><a href="mailto:hamza@exemple.ma">Contact</a> · © 2025</footer>
</body>
```

> [!astuce] Les liens du menu pointent vers `#about` et `#skills` : ce sont des **liens internes** (chapitre 3) grâce aux `id` des sections.

> [!attention] Le code d'exemple du TP 1 en PDF contient des espaces parasites (`font - family`, `# f4f4f4`) dus à la mise en page : en vrai, il n'y a **aucun espace** dans `font-family` ni dans `#f4f4f4`.

## S'exercer

```exercice Refaire sans regarder
? Écris la rangée du TD 1 « Modules de formation proposés » avec ses 3 cases à cocher, sur toute la largeur d'un tableau à 2 colonnes.
= ~~~
<tr><td colspan="2">Modules de formation proposés<br>
    <input type="checkbox" name="html" id="m1"> <label for="m1">Le Langage HTML</label><br>
    <input type="checkbox" name="js" id="m2"> <label for="m2">Le Langage Javascript</label><br>
    <input type="checkbox" name="php" id="m3"> <label for="m3">Le Langage PHP</label>
</td></tr>
~~~
? Trouve les 2 erreurs : `<meta charset="stylesheet" href="CV.CSS">`
= On a mélangé deux balises. Il faut `<meta charset="UTF-8">` **et** `<link rel="stylesheet" href="CV.css">`.
? Écris la règle qui fait glisser les boutons de 10 px vers la droite en 3 secondes au survol.
= ~~~
input[type=submit] { transition: all 3s; }
input[type=submit]:hover { transform: translateX(10px); }
~~~
? Pourquoi `<span class="barre" style="width:90%">` n'a pas de largeur visible ?
= `span` est un élément **en ligne** : `width` ne s'y applique pas. Il faut `display: block` ou `inline-block`.
```

## Flashcards

```cartes
TD 1 : quel attribut pour les champs marqués * ? :: required
TD 1 : la rangée Modules sur 2 colonnes ? :: <td colspan="2">
TD 2 : style des labels ? :: Bodoni MT Black, 20pt, #800080, display: inline-block.
TD 2 : bouton qui glisse au survol ? :: transition: all 3s; et au :hover transform: translateX(10px);
TD 3 : erreur du corrigé dans le head ? :: <meta charset="stylesheet" href="CV.CSS"> au lieu de <link rel="stylesheet" href="CV.css">.
TP 1 : arborescence ? :: TP_Web_NomPrenom/index.html et css/style.css
TP 2 : zones sémantiques ? :: header (h1 + nav), main (sections about, skills), footer.
Barre de compétence à 90 % ? :: Conteneur gris + span en display:block avec width: 90%.
```

## QCM du chapitre

```qcm
? Dans le TD 1, quel attribut rend un champ obligatoire ?
- `obligatoire`
+ `required`
- `needed`
= Attribut booléen HTML5.
? La rangée « Modules » sur toute la largeur d'un tableau à 2 colonnes utilise…
+ `colspan="2"`
- `rowspan="2"`
- `width="2"`
= Elle couvre 2 colonnes.
? Quel sélecteur vise les zones de texte du TD 2 ?
- `input.text`
+ `input[type=text]`
- `#text`
= Sélecteur de valeur d'attribut.
? `width: 500;` (sans unité) en CSS…
- vaut 500 pixels
+ est ignoré
- vaut 500 %
= Une longueur non nulle exige une unité.
? `box-shadow: 10px 10px 20px gris;` ne marche pas car…
+ `gris` n'est pas un mot clé CSS
- il faut 4 nombres
- box-shadow n'existe pas
= Les mots clés sont en anglais : `gray`.
? Dans le TD 3, comment lier `CV.css` ?
- `<meta charset="stylesheet" href="CV.css">`
+ `<link rel="stylesheet" href="CV.css">`
- `<style src="CV.css">`
= Le corrigé manuscrit se trompe de balise.
? Dans le TP 2, la balise qui contient le contenu principal est…
- `<aside>`
+ `<main>`
- `<nav>`
= `main` regroupe les sections principales.
? Un `span` avec `width: 90%` n'a pas de largeur. Pourquoi ?
- `%` est interdit
+ un élément en ligne ignore `width`
- il faut `height`
= Ajoute `display: block` ou `inline-block`.
? Pour mettre les `li` du menu du TP 2 côte à côte :
- `float: center`
+ `display: inline-block`
- `list-style: inline`
= Méthode demandée dans l'exercice 4.
? Que manque-t-il au corrigé manuscrit du TD 1 pour envoyer les données ?
- l'attribut `id`
+ l'attribut `name` sur les champs
- la balise `<table>`
= Sans `name`, rien n'est transmis.
```

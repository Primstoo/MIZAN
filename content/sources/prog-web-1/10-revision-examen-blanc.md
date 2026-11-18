---
id: revision-examen-blanc
titre: Révision et examen blanc
seance: Avant l'examen
importance: 4
---

## Avant de commencer

Ce chapitre suppose que tu as fait les QCM des chapitres 1 à 9. Aucune annale de Web 1 n'a été fournie : l'examen blanc ci-dessous reprend **le style du TD** (écrire du HTML et du CSS à partir d'une consigne) et des questions de cours.

```exercice Vérifie ton prérequis
? Sans regarder : écris le squelette HTML5 complet d'une page en français liée à `style.css`.
= ~~~
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>
~~~
Si tu as hésité sur une ligne, relis le chapitre 2 avant l'examen blanc.
```

## Comment aborder ce chapitre

> [!astuce] **Fais l'examen blanc en temps limité (1 h 30), sur papier**, comme le jour J. Le TD est écrit à la main : entraîne-toi à écrire du code sans éditeur ni autocomplétion.

> [!piege] À l'écrit, les fautes qui coûtent le plus : balises mal fermées, `name` oublié, point/dièse oublié devant une classe/un id, unité oubliée (`500` au lieu de `500px`), `meta` confondu avec `link`.

À la fin, tu sais où tu en es sur chaque partie du cours.

## Idée 1 · La fiche de révision en une page

```grille Les 12 choses à savoir par cœur
#cols: thème à_retenir
HTTP *requête = commande + en-têtes + ligne vide + corps
URL *protocole://hôte/chemin/page?requête
Squelette *DOCTYPE, html lang, head (meta charset, title, link), body
Sémantique *header, nav, section, article, aside, footer (+ main)
Bloc/en_ligne *p h1 div ul table form / strong em a img span input
Liens *href, target="_blank", #id, mailto:
Tableaux *table caption tr th td, colspan, rowspan
Formulaires *method get/post, action, name, label for=id
Choix *select/option, radio (même name), checkbox
CSS_où *en ligne < interne < externe (recommandée)
Sélecteurs *p .classe #id div_p h3+p [attr] :hover
Boîte *contenu < padding < border < margin
```

```flux Méthode pour une question « écrire le CSS d'après un tableau de consignes » (TD 2)
Une ligne du tableau = une règle -> traduire l'élément en sélecteur -> traduire chaque consigne en propriété: valeur -> vérifier unités et mots clés anglais
```

## Idée 2 · Examen blanc (1 h 30)

**Partie A · Questions de cours (6 points).** Réponds dans les exercices ci-dessous.

```exercice Partie A · Cours
? (1 pt) Différence entre internet et le web ?
= Internet est le réseau mondial de réseaux (TCP/IP). Le web est un service qui l'utilise : des pages reliées par des hyperliens, transmises par HTTP, nommées par des URL, affichées par des navigateurs.
? (1,5 pt) Décris la structure d'une réponse HTTP et donne un exemple de ligne de statut.
= Ligne de statut, champs d'en-tête, ligne vide, corps (le document). Exemple : `HTTP/1.1 404 Not Found`.
? (1 pt) Page statique vs dynamique ?
= Statique : fichier HTML envoyé tel quel par le serveur. Dynamique : générée à chaque demande par un programme côté serveur (PHP…), selon des données (BD, formulaires, cookies).
? (1,5 pt) Cite les trois façons d'appliquer du CSS et dis laquelle le prof recommande, et pourquoi.
= En ligne (attribut `style`), interne (`<style>` dans `<head>`), externe (`<link>` vers un `.css`). L'externe : une seule feuille pour tout le site, séparation contenu/présentation, cohérence, mise à jour en un endroit.
? (1 pt) GET ou POST pour un formulaire de connexion ? Justifie.
= **POST** : les données passent dans le corps de la requête et n'apparaissent pas dans l'URL (ni dans l'historique). GET afficherait le mot de passe dans l'adresse.
```

**Partie B · HTML (7 points).**

```exercice Partie B · HTML
? (4 pts) Écris le formulaire « Inscription au club » : un `fieldset` de légende « Club Info FSABM », Nom (obligatoire), Email (type email), Filière (liste : MIP, MIPC, BCG), Niveau (radio : S1, S3, S5), Intérêts (cases : Web, Réseaux, IA), un fichier « photo », boutons Envoyer et Annuler. Envoi en POST vers `club.php`.
= ~~~
<form method="post" action="club.php" enctype="multipart/form-data">
  <fieldset>
    <legend>Club Info FSABM</legend>
    <label for="nom">Nom :</label>
    <input type="text" name="nom" id="nom" required><br>
    <label for="email">Email :</label>
    <input type="email" name="email" id="email"><br>
    <label for="fil">Filière :</label>
    <select name="filiere" id="fil">
      <option value="MIP">MIP</option>
      <option value="MIPC">MIPC</option>
      <option value="BCG">BCG</option>
    </select><br>
    Niveau :
    <input type="radio" name="niveau" value="S1" id="s1"><label for="s1">S1</label>
    <input type="radio" name="niveau" value="S3" id="s3"><label for="s3">S3</label>
    <input type="radio" name="niveau" value="S5" id="s5"><label for="s5">S5</label><br>
    Intérêts :
    <input type="checkbox" name="web" id="w"><label for="w">Web</label>
    <input type="checkbox" name="reseaux" id="r"><label for="r">Réseaux</label>
    <input type="checkbox" name="ia" id="i"><label for="i">IA</label><br>
    <input type="file" name="photo"><br>
    <input type="submit" value="Envoyer"> <input type="reset" value="Annuler">
  </fieldset>
</form>
~~~
Barème indicatif : `form` + method/action/enctype (1), champs + labels (1), select (0,5), radio même name (0,5), checkbox (0,5), file + boutons (0,5).
? (3 pts) Écris le tableau : une 1re cellule « Emploi du temps » sur 3 colonnes ; puis une rangée « Lundi | Web 1 | Amphi 2 » ; une cellule « Mardi » sur 2 rangées avec « Analyse | Salle 5 » puis « Algèbre | Salle 7 ».
= ~~~
<table border="1">
  <tr><th colspan="3">Emploi du temps</th></tr>
  <tr><td>Lundi</td><td>Web 1</td><td>Amphi 2</td></tr>
  <tr><td rowspan="2">Mardi</td><td>Analyse</td><td>Salle 5</td></tr>
  <tr><td>Algèbre</td><td>Salle 7</td></tr>
</table>
~~~
La dernière rangée n'a que **2** cellules : « Mardi » occupe déjà la 1re colonne.
```

**Partie C · CSS (7 points).**

```exercice Partie C · CSS
? (4 pts) Écris le CSS : `fieldset` large de 450 px, coins arrondis de 10 px, fond `#f4f4f4` ; `legend` en gras, 24 pt, couleur `#003366` ; les `label` en `inline-block` larges de 120 px ; les zones de texte avec bordure solide 1 px grise et coins de 5 px ; au survol des boutons, fond vert et texte blanc.
= ~~~
fieldset { width: 450px; border-radius: 10px; background-color: #f4f4f4; }
legend { font-weight: bold; font-size: 24pt; color: #003366; }
label { display: inline-block; width: 120px; }
input[type=text], input[type=email] { border: 1px solid gray; border-radius: 5px; }
input[type=submit]:hover, input[type=reset]:hover { background-color: green; color: white; }
~~~
? (1,5 pt) Une `div` a `width: 250px; padding: 20px; border: 5px solid; margin: 10px;`. Largeur occupée bordure comprise (content-box) ?
reponse: 300
= 250 + 2×20 + 2×5 = **300 px** (320 px avec les marges).
? (1,5 pt) `p { color: red; }`, `.info { color: blue; }`, `#a1 { color: green; }`. Couleur de `<p class="info" id="a1">` ? Et de `<p class="info">` ?
= Vert (l'id est le plus spécifique), puis bleu (la classe bat la balise).
```

## S'exercer

```exercice Pièges de dernière minute
? Trouve les 4 erreurs : `<a href="#contact" target="_balnk">` … `<div id="contact"><p class=".note">Écrire</div></p>`
= `_balnk` → `_blank` ; `class=".note"` → `class="note"` (pas de point dans le HTML) ; fermetures inversées : `</p></div>` ; le lien interne est correct (`#contact` vers `id="contact"`).
? Pourquoi `h1:after { color: red; }` n'affiche rien ?
= Il manque `content` : `h1:after { content: " ★"; color: red; }`.
```

## Flashcards

```cartes
5 fautes classiques à l'écrit ? :: Balises mal fermées, name oublié, . ou # oublié, unité oubliée, meta confondu avec link.
Spécificité : qui gagne ? :: id > classe > balise ; à égalité, la dernière règle.
Envoyer un fichier ? :: post + enctype="multipart/form-data" + input type="file".
Largeur d'une boîte (content-box) ? :: width + 2×padding + 2×border (+ 2×margin pour l'espace total).
Rangée sous un rowspan ? :: Elle a une cellule de moins.
Zone principale d'une page HTML5 ? :: main (ou section), pas aside.
```

## QCM du chapitre

```qcm
? Quel code ouvre un lien dans un nouvel onglet ?
- `target="_new"`
+ `target="_blank"`
- `target="_balnk"`
= `_balnk` est la faute de frappe des diapos.
? Quelle ligne lie une feuille de style ?
- `<meta href="style.css">`
+ `<link rel="stylesheet" href="style.css">`
- `<script href="style.css">`
= Piège du corrigé du TD 3.
? La zone principale d'une page HTML5 est…
- `<aside>`
+ `<main>`
- `<header>`
= aside = contenu secondaire.
? Un mot de passe se transmet avec…
- GET
+ POST
- indifféremment
= GET le mettrait dans l'URL.
? `p.note` vise…
+ les `p` de classe note
- les `p` contenus dans un élément `.note`
- tous les `p` et tous les `.note`
= Collé = même élément.
? `<p class="x" id="y">` avec `.x{color:blue}` puis `p{color:red}` puis `#y{color:green}` : couleur ?
- rouge
- bleu
+ vert
= L'id est le plus spécifique.
? Une bordure `border: 3px red;` ne s'affiche pas car…
- red est invalide
+ le style manque
- il faut border-width
= Style par défaut : none.
? Quel élément HTML est en ligne ?
+ `<a>`
- `<table>`
- `<form>`
= Les liens restent dans le flux du texte.
? Quel est le rôle du W3C ?
- héberger les sites
+ normaliser les technologies du web
- vendre des noms de domaine
= World Wide Web Consortium.
? `rowspan="2"` sur une cellule de la 1re colonne : la rangée suivante a…
- autant de cellules
+ une cellule de moins
- deux cellules de moins
= La 1re colonne y est déjà occupée.
```

---
id: tableaux-images-medias
titre: HTML5 (3) · tableaux, images, audio et vidéo
seance: Partie II · HTML5, tableaux et médias
importance: 4
---

## Avant de commencer

Tu dois savoir imbriquer des balises et écrire des attributs (chapitre 2).

```exercice Vérifie ton prérequis
? Dans `<img src="logo.png" alt="Logo">`, pourquoi n'y a-t-il pas de `</img>` ?
= Parce que `img` est une **balise orpheline** : elle n'a pas de contenu, donc pas de fermante.
```

## Comment aborder ce chapitre

> [!astuce] **Un tableau se lit ligne par ligne.** On n'écrit jamais une colonne : on écrit des **rangées** (`tr`), et chaque rangée contient ses **cellules** (`td`). Les colonnes apparaissent toutes seules.

> [!piege] Avec `colspan` ou `rowspan`, oublier d'**enlever** les cellules recouvertes. Une cellule qui s'étend sur 2 colonnes « prend la place » d'une cellule : la rangée en contient une de moins.

À la fin, tu sais construire un tableau avec fusion de cellules, insérer une image avec un texte alternatif, et intégrer un son ou une vidéo avec ses contrôles.

## Idée 1 · table, tr, td, th, caption

```grille Un tableau = des rangées (tr) qui contiennent des cellules (td)
#cols: colonne1 colonne2
#rows: tr(en-tête) tr tr
!Ville !Distance
Béni Mellal 0 km
Khouribga 100 km
```

```markup
<table border="1">
    <caption>Distances depuis Béni Mellal</caption>
    <tr>
        <th>Ville</th>
        <th>Distance</th>
    </tr>
    <tr>
        <td>Khouribga</td>
        <td>100 km</td>
    </tr>
</table>
```

| Balise | Signification |
|---|---|
| `table` | le tableau |
| `caption` | la légende, **juste après** `<table>` |
| `tr` | *table row* : une rangée |
| `td` | *table data* : une cellule |
| `th` | *table header* : une cellule d'en-tête (en gras, centrée) |

> [!prof] « L'élément `<table>` n'est **pas** un outil de mise en page ! » Il sert à présenter des **données** en lignes et colonnes. La mise en forme se fait en CSS.

> [!attention] Les diapos utilisent les attributs `border`, `width`, `align`, `valign` (et écrivent `valign="midlle"` au lieu de **`middle`**). Ils fonctionnent encore dans les navigateurs mais sont **obsolètes en HTML5** : en CSS on écrit `border`, `width`, `text-align`, `vertical-align`. Le corrigé du TD utilise `border="1"` : c'est accepté en TD.

## Idée 2 · Fusionner : colspan et rowspan

```html
<div style="display:flex;flex-wrap:wrap;gap:24px;margin:10px 0">
<table style="border-collapse:collapse" aria-label="colspan 2">
<tr><td colspan="2" style="border:2px solid #D9824F;padding:6px 18px;text-align:center">Cellule 1 (colspan="2")</td></tr>
<tr><td style="border:1px solid currentColor;padding:6px 18px">Cellule 2</td><td style="border:1px solid currentColor;padding:6px 18px">Cellule 3</td></tr>
</table>
<table style="border-collapse:collapse" aria-label="rowspan 3">
<tr><td rowspan="3" style="border:2px solid #D9824F;padding:6px 18px">Cellule 1<br>(rowspan="3")</td><td style="border:1px solid currentColor;padding:6px 18px">Cellule 2</td></tr>
<tr><td style="border:1px solid currentColor;padding:6px 18px">Cellule 3</td></tr>
<tr><td style="border:1px solid currentColor;padding:6px 18px">Cellule 4</td></tr>
</table>
</div>
```

```markup
<table border="1">
    <tr><td colspan="2">Cellule 1</td></tr>             <!-- 1 cellule, 2 colonnes -->
    <tr><td>Cellule 2</td><td>Cellule 3</td></tr>
</table>
<table border="1">
    <tr><td rowspan="3">Cellule 1</td><td>Cellule 2</td></tr>
    <tr><td>Cellule 3</td></tr>                         <!-- 1 seule td : la 1re colonne est prise -->
    <tr><td>Cellule 4</td></tr>
</table>
```

```etapes Construire un tableau avec fusion
Dessine la grille :: Compte les colonnes réelles (ici 2) et les rangées (ici 3).
Repère les cellules fusionnées :: Cellule 1 couvre 3 rangées → `rowspan="3"` sur sa `td`.
Écris rangée par rangée :: Rangée 1 : Cellule 1 + Cellule 2. Rangées 2 et 3 : une seule `td` chacune.
Vérifie :: Chaque rangée doit « totaliser » le même nombre de colonnes, en comptant les cellules qui débordent d'en haut.
```

> [!retenir] `colspan` = nombre de **colonnes** couvertes (vers la droite). `rowspan` = nombre de **rangées** couvertes (vers le bas), **la sienne comprise**.

## Idée 3 · Images : src et alt

```markup
<img src="img/profil.jpg" alt="Photo de Hamza" width="150">
<hr>
```

- `src` : le chemin de l'image (mêmes règles que `href` : relatif ou URL complète).
- `alt` : **texte alternatif**, affiché si l'image ne charge pas, et lu par les lecteurs d'écran.
- `width`, `height` : dimensions (en pixels, ou `%` de la page).
- `<hr>` : ligne horizontale de séparation.

> [!prof] Une grosse image ralentit le chargement : présente une **petite** image qui mène vers l'image complète. Et prévois toujours un texte `alt`.

> [!piege] Si tu donnes **width et height** qui ne respectent pas les proportions, l'image est **déformée**. Donne une seule des deux dimensions, l'autre s'adapte.

## Idée 4 · Audio et vidéo

```flux Intégrer un média HTML5
<audio src="..." controls> -> <video src="..." controls width="..."> -> lecture dans la page, sans plugin
```

```markup
<audio src="ballade.mp3" controls preload="auto"></audio>
<video src="presentation.mp4" controls width="400"></video>
```

| Attribut | Effet |
|---|---|
| `controls` | affiche les boutons lecture / pause / volume |
| `muted` | son coupé |
| `preload="auto"` | précharge le fichier |
| `width`, `height` | taille de la zone vidéo |

> [!piege] Sans `controls`, la vidéo s'affiche mais l'utilisateur **ne peut pas la lancer** (pas de bouton).

> [!attention] Le cours cite aussi l'attribut `mediagroup` (synchroniser deux vidéos, par exemple une interprétation en langue des signes). Il a été **retiré** de la norme HTML et n'est supporté par aucun navigateur actuel. Les autres contenus embarqués cités (`canvas`, `iframe`, `object`, `map`/`area`) ne sont pas détaillés dans le cours.

## S'exercer

```exercice Tableaux et médias
? Combien de `<td>` faut-il écrire dans un tableau de 3 rangées × 2 colonnes si la première cellule a `rowspan="3"` ?
indice: 6 cellules au total, moins celles recouvertes.
reponse: 4
= 6 positions, la Cellule 1 en occupe 3 avec **une seule** `td` : 6 − 3 + 1 = **4** `td` (Cellule 1, 2, 3, 4).
? Écris un tableau avec une légende « Notes S3 », une rangée d'en-tête (Module, Note) et une rangée (Web 1, 14).
= ~~~
<table border="1">
    <caption>Notes S3</caption>
    <tr><th>Module</th><th>Note</th></tr>
    <tr><td>Web 1</td><td>14</td></tr>
</table>
~~~
? Écris la balise d'une vidéo `intro.mp4` avec les boutons de contrôle, sans le son (TP 2, exercice 3).
= `<video src="intro.mp4" controls muted></video>`
```

## Flashcards

```cartes
tr, td, th ? :: tr : rangée (table row) ; td : cellule (table data) ; th : cellule d'en-tête.
Où placer caption ? :: Juste après la balise ouvrante <table>.
colspan="2" ? :: La cellule s'étend sur 2 colonnes.
rowspan="3" ? :: La cellule s'étend sur 3 rangées (la sienne + 2).
À quoi sert alt dans img ? :: Texte alternatif si l'image ne s'affiche pas (et pour l'accessibilité).
Attribut pour afficher les boutons d'une vidéo ? :: controls
table sert-il à la mise en page ? :: Non : il présente des données. La mise en page se fait en CSS.
```

## QCM du chapitre

```qcm
? Quelle balise représente une rangée de tableau ?
- `<td>`
+ `<tr>`
- `<th>`
= tr = table row.
? `<th>` désigne…
- une cellule fusionnée
+ une cellule d'en-tête
- la légende du tableau
= La légende, c'est `<caption>`.
? Où se place `<caption>` ?
+ juste après `<table>`
- à la fin du tableau
- dans un `<td>`
= Le cours le précise : immédiatement après la balise ouvrante.
? Une cellule qui occupe 2 colonnes utilise…
+ `colspan="2"`
- `rowspan="2"`
- `span="2"`
= col = colonne.
? Tableau 2 colonnes, 3 rangées, Cellule 1 avec `rowspan="3"`. Combien de `td` dans la 2e rangée ?
- 0
+ 1
- 2
= La 1re colonne est occupée par la Cellule 1.
? À quoi sert `alt` ?
- à fixer la largeur
+ à afficher un texte si l'image ne charge pas
- à afficher une infobulle de lien
= L'infobulle d'un lien, c'est `title`.
? Que se passe-t-il si on donne width et height disproportionnés à une image ?
- rien
+ l'image est déformée
- l'image ne s'affiche pas
= Donne une seule dimension pour garder les proportions.
? Quel attribut affiche les boutons de lecture d'une vidéo ?
- `play`
+ `controls`
- `preload`
= Sans `controls`, aucun bouton.
? Pour couper le son d'une vidéo par défaut :
+ `muted`
- `silent`
- `volume="0"`
= `muted` est un attribut booléen.
? Selon le prof, `<table>` sert à…
- faire la mise en page du site
+ présenter des données en lignes et colonnes
- créer des formulaires
= La mise en page passe par le CSS.
```

---
id: correspondances
titre: Correspondances entre les vues et droite à 45°
seance: Chapitre 2 · partie 4
importance: 5
---

## Avant de commencer

Tu dois savoir placer les vues en premier dièdre.

```exercice Vérifie ton prérequis
? En premier dièdre, où se placent la vue de gauche et la vue de dessus par rapport à la vue de face ?
indice: Du côté opposé à celui d'où on regarde.
= La vue de gauche est **à droite** de la vue de face. La vue de dessus est **au-dessous**.
Si tu as inversé, relis le chapitre « Disposition des vues » avant de continuer : ici, tout repose sur ces positions.
```

## Comment aborder ce chapitre

> [!astuce] **Pense rails.** Les vues ne sont pas trois dessins séparés : c'est le même objet. Chaque point circule d'une vue à l'autre sur un rail horizontal ou vertical. Si tu traces les rails avant les formes, tu ne peux presque plus te tromper.

> [!piege] Dessiner chaque vue « à l'œil », en remesurant tout à la règle. Les vues finissent décalées et les dimensions ne correspondent plus. C'est l'erreur que le cours appelle « non-correspondance des vues ».

À la fin, tu sais aligner trois vues, transférer une profondeur avec la droite à 45°, distinguer une arête vue d'une arête cachée et construire la troisième vue à partir de deux autres.

## Idée 1 · Deux alignements à respecter

```html
<svg viewBox="0 0 260 190" style="width:100%;max-width:400px;display:block;margin:10px auto" role="img" aria-label="La vue de face et la vue de gauche sont alignées horizontalement : mêmes hauteurs. La vue de face et la vue de dessus sont alignées verticalement : mêmes largeurs.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="20,87.0 98.0,87.0 98.0,61.0 46.0,61.0 46.0,22 20,22" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="128,22 180.0,22 180.0,87.0 128,87.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="128" y1="61.0" x2="180.0" y2="61.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><polygon points="20,117 98.0,117 98.0,169.0 20,169.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="46.0" y1="117" x2="46.0" y2="169.0" stroke="currentColor" stroke-width="2.2"/><line x1="46.0" y1="22" x2="128" y2="22" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="61.0" x2="128" y2="61.0" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="87.0" x2="128" y2="87.0" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="20" y1="87.0" x2="20" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="46.0" y1="87.0" x2="46.0" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="87.0" x2="98.0" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><text x="59" y="14" text-anchor="middle" stroke="none" font-size="10">face</text><text x="154" y="14" text-anchor="middle" stroke="none" font-size="10">gauche</text><text x="59" y="182.0" text-anchor="middle" stroke="none" font-size="10">dessus</text><text x="190" y="57" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">mêmes</text><text x="190" y="69" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">hauteurs ↔</text><text x="106" y="107" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">mêmes largeurs ↕</text>
</g>
</svg>
```

Après le dépliage du cube, les vues gardent leurs correspondances géométriques :

- la vue de face, la vue de gauche, la vue de droite et la vue arrière sont **alignées horizontalement** ;
- la vue de face, la vue de dessus et la vue de dessous sont **alignées verticalement**.

Ce que ça veut dire, concrètement :

| Vues | Ce qu'elles partagent |
|---|---|
| Face et dessus | les **largeurs** |
| Face et droite (ou gauche) | les **hauteurs** |
| Dessus et droite (ou gauche) | les **profondeurs** |

**Exemple.** Pièce en L de 60 × 40 × 50. La vue de face fait 60 de large : la vue de dessus aussi, exactement en dessous. La vue de face fait 50 de haut : la vue de gauche aussi, exactement à côté.

Les lignes fines qui relient les vues s'appellent des **lignes de rappel**.

## Idée 2 · La droite à 45° transporte la profondeur

```html
<svg viewBox="0 0 270 200" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="La droite à 45 degrés part du point O, au croisement des axes entre les vues. Les lignes venant de la vue de dessus touchent cette droite puis remontent vers la vue de gauche : la profondeur est transférée.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="20,87.0 98.0,87.0 98.0,61.0 46.0,61.0 46.0,22 20,22" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="128,22 180.0,22 180.0,87.0 128,87.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="128" y1="61.0" x2="180.0" y2="61.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><polygon points="20,117 98.0,117 98.0,169.0 20,169.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="46.0" y1="117" x2="46.0" y2="169.0" stroke="currentColor" stroke-width="2.2"/><line x1="46.0" y1="22" x2="128" y2="22" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="61.0" x2="128" y2="61.0" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="87.0" x2="128" y2="87.0" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="20" y1="87.0" x2="20" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="46.0" y1="87.0" x2="46.0" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="98.0" y1="87.0" x2="98.0" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="113" y1="102" x2="195" y2="184" stroke="#D9824F" stroke-width="2"/><text x="183" y="194" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700">45°</text><circle cx="113" cy="102" r="3" fill="#D9824F" stroke="none"/><text x="107" y="98" text-anchor="end" stroke="none" fill="#D9824F" font-weight="700">O</text><line x1="98.0" y1="117" x2="128" y2="117" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="128" y1="117" x2="128" y2="90.0" stroke="#D9824F" stroke-width="1.2"/><polygon points="128,90.0 131.0,96.3 125.0,96.3" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><line x1="98.0" y1="169.0" x2="180.0" y2="169.0" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="180.0" y1="169.0" x2="180.0" y2="90.0" stroke="#D9824F" stroke-width="1.2"/><polygon points="180.0,90.0 183.0,96.3 177.0,96.3" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="59" y="14" text-anchor="middle" stroke="none" font-size="10">face</text><text x="154" y="14" text-anchor="middle" stroke="none" font-size="10">gauche</text><text x="59" y="182.0" text-anchor="middle" stroke="none" font-size="10">dessus</text><text x="206" y="150" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">profondeur</text><text x="206" y="162" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">transférée</text>
</g>
</svg>
```

Il reste un problème : la profondeur. Dans la vue de dessus, elle est **verticale**. Dans la vue de gauche, elle est **horizontale**. Aucun alignement direct ne les relie.

La solution est une ligne de construction : la **droite à 45°**. Elle fait tourner les lignes de rappel d'un quart de tour. Elle sert à :

- **transférer** la profondeur entre la vue de dessus et la vue de côté ;
- **éviter** de remesurer à la règle ;
- **garantir** la cohérence géométrique entre les vues.

```etapes La méthode de la droite à 45°
Place le point O :: Les vues sont séparées par un espace régulier. O se trouve au croisement des axes qui passent au milieu de ces espaces.
Trace la droite à 45° depuis O :: Elle part vers le coin vide de la feuille, entre la vue de dessus et la vue de côté.
Tire des lignes depuis la vue de dessus :: Depuis chaque élément de la vue de dessus, trace une ligne de rappel horizontale jusqu'à la droite à 45°.
Remonte vers la vue de côté :: Depuis chaque point touché sur la droite à 45°, trace une ligne verticale vers la zone de la vue de gauche.
Place les éléments de la vue de côté :: Les verticales donnent les profondeurs. Les lignes de rappel venues de la vue de face donnent les hauteurs. Il ne reste qu'à repasser les contours.
```

> [!prof] Le cours insiste : le point O **ne doit pas toucher le coin de la vue de face**. La droite à 45° démarre à l'intersection exacte des axes entre les vues, pour éviter tout décalage.

> [!attention] Les diapositives parlent tantôt de la vue de gauche, tantôt de la vue de droite. La méthode est la même des deux côtés : seule la position change. Vue de gauche à droite de la face : la droite à 45° descend vers la droite. Vue de droite à gauche de la face : elle descend vers la gauche.

## Idée 3 · Arêtes vues, arêtes cachées

```html
<svg viewBox="0 0 332 132" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Dans la vue de droite, l'arête de la marche est visible : trait continu fort. Dans la vue de gauche, la même arête est cachée par le montant : trait interrompu fin.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="50,26 102.0,26 102.0,91.0 50,91.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="50" y1="65.0" x2="102.0" y2="65.0" stroke="currentColor" stroke-width="2.2"/><polygon points="230,26 282.0,26 282.0,91.0 230,91.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="230" y1="65.0" x2="282.0" y2="65.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><text x="76" y="16" text-anchor="middle" stroke="none">vue de droite</text><text x="256" y="16" text-anchor="middle" stroke="none">vue de gauche</text><text x="76" y="110" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">arête vue</text><text x="76" y="124" text-anchor="middle" stroke="none" font-size="10">trait continu fort</text><text x="256" y="110" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">arête cachée</text><text x="256" y="124" text-anchor="middle" stroke="none" font-size="10">trait interrompu fin</text><line x1="166" y1="8" x2="166" y2="128" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
</g>
</svg>
```

| Arête | Trait |
|---|---|
| Arête **vue** | trait **continu fort** |
| Arête **cachée** | trait **interrompu fin** |

Ces conventions distinguent ce qui est visible de ce qui ne l'est pas dans la direction d'observation.

**Exemple.** Sur la pièce en L, la marche forme une arête à 20 mm de hauteur. Depuis la droite, on la voit : trait continu fort. Depuis la gauche, le montant la cache : trait interrompu fin. Même arête, même hauteur, deux traits différents.

## Idée 4 · Les trois erreurs à éviter

```html
<svg viewBox="0 0 330 122" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="À gauche, tracé correct : la vue de gauche est alignée avec la vue de face. À droite, tracé incorrect : la vue de gauche est décalée vers le bas, les hauteurs ne correspondent plus.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<text x="75" y="14" text-anchor="middle" stroke="none" font-weight="700">Correct</text><polygon points="12,69.0 66.0,69.0 66.0,51.0 30.0,51.0 30.0,24 12,24" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="88,24 124.0,24 124.0,69.0 88,69.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="88" y1="51.0" x2="124.0" y2="51.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="30" y1="24" x2="88" y2="24" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="66" y1="69" x2="88" y2="69" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><text x="255" y="14" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">Incorrect</text><polygon points="182,69.0 236.0,69.0 236.0,51.0 200.0,51.0 200.0,24 182,24" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="258,40 294.0,40 294.0,85.0 258,85.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="258" y1="67.0" x2="294.0" y2="67.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="200" y1="24" x2="300" y2="24" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><line x1="236" y1="69" x2="300" y2="69" stroke="#D9824F" stroke-width="1" stroke-dasharray="3 3"/><text x="255" y="104" text-anchor="middle" stroke="none" fill="#D9824F" font-size="10">vue décalée : les hauteurs</text><text x="255" y="116" text-anchor="middle" stroke="none" fill="#D9824F" font-size="10">ne correspondent plus</text><text x="75" y="104" text-anchor="middle" stroke="none" font-size="10">tout est aligné</text><line x1="160" y1="6" x2="160" y2="118" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
</g>
</svg>
```

Le cours montre trois tracés incorrects :

| Erreur | Ce qui ne va pas |
|---|---|
| Vues mal placées | une vue n'est pas à sa place du premier dièdre |
| Non-correspondance des vues | les vues ne sont pas alignées entre elles |
| Hauteur non respectée | une vue n'a pas la même hauteur que la vue de face |

> [!retenir] Avant de rendre un dessin, contrôle trois choses : chaque vue est **à sa place**, les vues sont **alignées**, les **dimensions communes** sont égales.

## Idée 5 · Construire la troisième vue

C'est l'exercice type : on te donne deux vues, tu complètes la troisième.

```etapes Compléter une vue par correspondance
Repère les arêtes communes :: Cherche dans les vues données les arêtes qui doivent apparaître dans la vue manquante.
Trace les lignes de rappel horizontales :: Depuis la vue de face, elles donnent les hauteurs de la vue de côté.
Positionne la vue de dessus :: Sous la vue de face, alignée par des lignes de rappel verticales : elles donnent les largeurs.
Transfère les profondeurs :: Avec la droite à 45°, entre la vue de dessus et la vue de côté.
Repasse les contours :: Arêtes vues en trait continu fort, arêtes cachées en trait interrompu fin.
```

> [!attention] La dernière étape (« repasse les contours ») est ajoutée par nous : les diapositives s'arrêtent au transfert des profondeurs. Elle reprend simplement les conventions de traits de l'idée 3.

## S'exercer

```exercice Quatre exercices types
? Une pièce a une vue de face de 80 mm de large et 30 mm de haut. Sa vue de dessus fait 45 mm de profondeur. Quelle est la hauteur, en mm, de sa vue de gauche ?
indice: Face et vues de côté partagent les hauteurs.
reponse: 30
= 30 mm. La vue de gauche est alignée horizontalement avec la vue de face : même hauteur.

? Même pièce. Quelle est la dimension horizontale de sa vue de gauche, en mm ?
indice: C'est la dimension qu'on transfère avec la droite à 45°.
reponse: 45
= 45 mm. C'est la profondeur, lue dans la vue de dessus et transférée par la droite à 45°.

? Pourquoi ne peut-on pas relier directement la vue de dessus à la vue de gauche par une ligne de rappel droite ?
indice: Dans quel sens est la profondeur dans chacune des deux vues ?
= Parce que la profondeur est verticale dans la vue de dessus et horizontale dans la vue de gauche. La droite à 45° fait tourner les lignes de rappel d'un quart de tour pour passer de l'une à l'autre.

? Sur la pièce en L, l'arête de la marche est en trait continu fort dans la vue de droite et en trait interrompu fin dans la vue de gauche. Explique.
= Depuis la droite, rien ne masque cette arête : elle est vue. Depuis la gauche, le montant se trouve devant elle : elle est cachée.
```

## Flashcards

```cartes
Quelles vues sont alignées horizontalement ? :: Face, gauche, droite et arrière.
Quelles vues sont alignées verticalement ? :: Face, dessus et dessous.
Que partagent la vue de face et la vue de dessus ? :: Les largeurs.
Que partagent la vue de face et la vue de droite ? :: Les hauteurs.
Que partagent la vue de dessus et la vue de droite ? :: Les profondeurs, transférées par la droite à 45°.
À quoi sert la droite à 45° ? :: À transférer la profondeur entre la vue de dessus et la vue de côté, sans remesurer, en gardant les vues cohérentes.
D'où part la droite à 45° ? :: Du point O, à l'intersection des axes entre les vues. Jamais du coin de la vue de face.
Trait d'une arête vue ? D'une arête cachée ? :: Arête vue : trait continu fort. Arête cachée : trait interrompu fin.
Les trois erreurs de représentation du cours :: Vues mal placées, non-correspondance des vues, hauteur non respectée.
```

## QCM du chapitre

```qcm
? Quelles vues sont alignées verticalement ?
- face, gauche et droite
+ face, dessus et dessous
- dessus, gauche et arrière
= Face, dessus et dessous sont l'une au-dessus de l'autre. Face, gauche, droite et arrière sont sur la même ligne horizontale.

? La vue de face et la vue de dessus partagent :
+ les largeurs
- les hauteurs
- les profondeurs
= Elles sont alignées verticalement : mêmes largeurs.

? La vue de face et la vue de droite partagent :
- les largeurs
+ les hauteurs
- les profondeurs
= Elles sont alignées horizontalement : mêmes hauteurs.

? La droite à 45° sert à transférer :
- la largeur entre la vue de face et la vue de dessus
- la hauteur entre la vue de face et la vue de côté
+ la profondeur entre la vue de dessus et la vue de côté
= Largeurs et hauteurs se reportent par simple alignement. Seule la profondeur a besoin de la droite à 45°.

? Le point O, origine de la droite à 45°, se place :
- sur le coin de la vue de face
+ à l'intersection des axes entre les vues
- au centre de la vue de dessus
= Le cours précise que O ne doit pas toucher le coin de la vue de face.

? Une arête cachée se représente par :
- un trait continu fort
- un trait continu fin
+ un trait interrompu fin
= Arête vue : trait continu fort. Arête cachée : trait interrompu fin.

? Une arête vue se représente par :
+ un trait continu fort
- un trait interrompu fort
- un trait mixte fin
= C'est le trait le plus épais du dessin : il marque les contours et arêtes visibles.

? Une pièce fait 70 de large, 30 de profondeur, 40 de haut. Sa vue de gauche s'inscrit dans un rectangle de :
- 70 × 40
+ 30 × 40
- 70 × 30
= Une vue de côté montre la profondeur (30) et la hauteur (40).

? Dans la méthode de la droite à 45°, quelle est la première étape ?
- reporter les points vers la vue de gauche
+ tracer les lignes de projection à partir des éléments de la vue de dessus
- repasser les contours en trait fort
= On part de la vue de dessus, on va jusqu'à la droite à 45°, puis on reporte vers la vue de côté.

? Laquelle n'est PAS une erreur de représentation citée par le cours ?
- vues mal placées
- hauteur non respectée
+ vue de face trop détaillée
= Les trois erreurs montrées : vues mal placées, non-correspondance des vues, hauteur non respectée.

? Une même arête peut-elle être vue dans une vue et cachée dans une autre ?
+ oui, cela dépend de la direction d'observation
- non, une arête est toujours vue
- non, une arête cachée l'est dans toutes les vues
= La visibilité dépend de ce qui se trouve devant l'arête quand on regarde depuis cette direction.
```

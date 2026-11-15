---
id: projection-orthogonale
titre: La projection orthogonale et le cube de projection
seance: Chapitre 2 · parties 1 et 2
importance: 4
---

## Avant de commencer

Tu as besoin de deux idées de géométrie : deux droites **parallèles** ne se coupent jamais, et une droite **perpendiculaire** à un plan le rencontre à angle droit. Et d'un constat : un objet a trois dimensions, la largeur, la hauteur et la profondeur.

```exercice Vérifie ton prérequis
? Une boîte mesure 60 mm de large, 50 mm de haut et 40 mm de profondeur. Tu la regardes bien en face, l'œil perpendiculaire à sa face avant. Quelles dimensions vois-tu ?
indice: Quelle dimension s'éloigne de toi ?
= Tu vois la **largeur (60)** et la **hauteur (50)**. La profondeur (40) part droit devant toi : elle n'apparaît pas.
Si tu as répondu « les trois », retiens ceci dès maintenant : c'est la raison pour laquelle il faut plusieurs vues.
```

## Comment aborder ce chapitre

> [!astuce] **Pense tampon, pas photo.** Une photo déforme : ce qui est loin paraît plus petit. La projection orthogonale ne déforme rien. Imagine que tu pousses la pièce bien droit contre un mur et qu'elle y laisse son empreinte : cette empreinte est une vue.

> [!piege] Croire qu'une seule vue montre toute la pièce. Une vue ne montre que **deux dimensions sur trois**. Deux pièces différentes peuvent avoir exactement la même vue de face.

À la fin, tu sais définir la projection orthogonale, citer ses cinq éléments, nommer les six vues et expliquer à quoi sert le cube de projection.

## Idée 1 · Projeter, c'est tirer des lignes droites vers un plan

```html
<svg viewBox="0 0 360 150" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Un observateur regarde un objet. Des lignes de projection parallèles, perpendiculaires au plan, reportent l'objet sur le plan placé derrière lui : c'est la vue.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<circle cx="40" cy="74" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="43" cy="74" r="3" fill="currentColor" stroke="none"/><text x="40" y="104" text-anchor="middle" stroke="none">observateur</text><polygon points="120,99.0 186.0,99.0 186.0,77.0 142.0,77.0 142.0,44 120,44" fill="none" stroke="currentColor" stroke-width="2.2" /><text x="153" y="118" text-anchor="middle" stroke="none">objet</text><line x1="300" y1="14" x2="300" y2="128" stroke="currentColor" stroke-width="3"/><text x="300" y="144" text-anchor="middle" stroke="none">plan de projection</text><line x1="125" y1="44" x2="292" y2="44" stroke="#D9824F" stroke-width="1.4" stroke-dasharray="4 4"/><line x1="190" y1="77" x2="292" y2="77" stroke="#D9824F" stroke-width="1.4" stroke-dasharray="4 4"/><line x1="190" y1="99" x2="292" y2="99" stroke="#D9824F" stroke-width="1.4" stroke-dasharray="4 4"/><line x1="56" y1="74" x2="108" y2="74" stroke="#D9824F" stroke-width="2"/><polygon points="108,74 101.7,77.0 101.7,71.0" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><line x1="300" y1="44" x2="300" y2="99" stroke="#D9824F" stroke-width="6"/><text x="312" y="74" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700">vue</text><text x="232" y="36" text-anchor="middle" stroke="none" fill="#D9824F" font-size="10">lignes de projection</text>
</g>
</svg>
```

La projection orthogonale représente un objet à **trois dimensions** sur un **plan**. Chaque point de l'objet est reporté sur le plan par une ligne de projection. Ces lignes sont :

- **parallèles entre elles** ;
- **perpendiculaires au plan** de projection.

Conséquence : les vues obtenues sont **précises et normalisées**. Elles décrivent la forme et les dimensions de l'objet.

Le cours retient cinq éléments :

| Élément | Rôle |
|---|---|
| L'objet | ce qu'on veut représenter |
| Le plan de projection | la surface qui reçoit le dessin |
| La direction d'observation | d'où on regarde |
| Les lignes de projection | perpendiculaires au plan |
| La vue | la projection obtenue |

## Idée 2 · L'observateur, l'objet, puis le plan

```flux Dans cet ordre, toujours
Observateur -> Objet -> Plan de projection
```

Le principe tient en trois phrases :

1. L'observateur se place **perpendiculairement** à une face de l'objet.
2. Cette face est projetée sur un plan **parallèle** à elle, situé **derrière l'objet**.
3. Le dessin obtenu sur le plan est une projection orthogonale de l'objet.

> [!retenir] Le plan est **derrière** l'objet. Ce détail explique tout le chapitre suivant : si tu regardes depuis la droite, le dessin se forme de l'autre côté, à gauche.

## Idée 3 · Six directions, six vues

```html
<svg viewBox="0 0 340 215" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Pièce en L vue en perspective, avec six flèches : face, dessus, dessous, droite, gauche et arrière.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="112.0,128.0 177.0,165.5 177.0,140.5 133.7,115.5 133.7,78.0 112.0,65.5" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="177.0,165.5 220.3,140.5 220.3,115.5 177.0,140.5" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="133.7,115.5 177.0,90.5 177.0,53.0 133.7,78.0" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="112.0,65.5 133.7,78.0 177.0,53.0 155.3,40.5" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="133.7,115.5 177.0,140.5 220.3,115.5 177.0,90.5" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="99.4" y1="160.2" x2="139.3" y2="137.2" stroke="#D9824F" stroke-width="2"/><polygon points="139.3,137.2 135.3,143.0 132.3,137.8" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="95.4" y="172.2" text-anchor="end" stroke="none" font-weight="700">face</text><line x1="243.6" y1="166.5" x2="203.8" y2="143.5" stroke="#D9824F" stroke-width="2"/><polygon points="203.8,143.5 210.8,144.0 207.7,149.3" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="247.6" y="178.5" text-anchor="start" stroke="none" font-weight="700">droite</text><line x1="144.5" y1="19.2" x2="144.5" y2="53.2" stroke="#D9824F" stroke-width="2"/><polygon points="144.5,53.2 141.4,46.9 147.5,46.9" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="144.5" y="14.2" text-anchor="middle" stroke="none" font-weight="700">dessus</text><line x1="93.8" y1="61.2" x2="128.5" y2="81.2" stroke="#D9824F" stroke-width="2"/><polygon points="128.5,81.2 121.5,80.7 124.5,75.5" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="89.8" y="59.2" text-anchor="end" stroke="none" font-weight="700">gauche</text><line x1="243.9" y1="73.8" x2="209.2" y2="93.8" stroke="#D9824F" stroke-width="2"/><polygon points="209.2,93.8 213.1,88.0 216.2,93.2" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="247.9" y="71.8" text-anchor="start" stroke="none" font-weight="700">arrière</text><line x1="166.1" y1="170.2" x2="166.1" y2="140.2" stroke="#D9824F" stroke-width="2"/><polygon points="166.1,140.2 169.2,146.6 163.1,146.6" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="166.1" y="182.2" text-anchor="middle" stroke="none" font-weight="700">dessous</text>
</g>
</svg>
```

On peut regarder un objet de six côtés, comme les six faces d'un cube. La **vue de face** est en général choisie comme **vue principale**. Les cinq autres se définissent par rapport à elle.

| Je regarde… | J'obtiens… |
|---|---|
| de face | la vue de face |
| d'en haut | la vue de dessus |
| d'en bas | la vue de dessous |
| depuis la droite | la vue de droite |
| depuis la gauche | la vue de gauche |
| de derrière | la vue arrière |

**Exemple.** La pièce du schéma est une pièce en L : 60 mm de large, 40 mm de profondeur, 50 mm de haut. On la garde pendant tout le module.

## Idée 4 · Le cube de projection

On enferme la pièce dans un cube imaginaire. Chaque face du cube est un **plan de projection** : la pièce est projetée sur chacune.

Trois plans servent le plus souvent :

| Plan | L'observateur regarde… | Vue obtenue |
|---|---|---|
| Plan frontal | de face | vue de face |
| Plan horizontal | d'en haut | vue de dessus |
| Plan latéral droit | depuis la droite | vue de droite |

Les vues sont pour l'instant sur six faces différentes. Pour les mettre sur une seule feuille, on **rabat** les faces du cube dans un même plan. C'est le sujet du chapitre suivant.

## Idée 5 · Une vue, deux dimensions

Une vue est la représentation obtenue par projection orthogonale **suivant une direction d'observation donnée**. Elle décrit avec précision la forme de l'objet, mais chaque vue n'apporte qu'une partie de l'information.

```grille Ce que montre chaque vue de la pièce en L (60 × 40 × 50)
#cols: largeur hauteur profondeur
#rows: face dessus droite
*60 *50 ~—
*60 ~— *40
~— *50 *40
```

Chaque dimension apparaît dans **deux** vues, et chaque vue en ignore une. C'est pour cela que plusieurs vues peuvent être nécessaires : elles sont **complémentaires** et renseignent sur les faces, les arêtes et les détails.

> [!attention] Le tableau ci-dessus est notre façon de résumer. Les diapositives disent la même chose dans le bilan du chapitre : face et dessus partagent les largeurs, face et droite les hauteurs, dessus et droite les profondeurs.

## S'exercer

```exercice Trois exercices types
? Cite les cinq éléments d'une projection orthogonale.
indice: Qui regarde quoi, vers où, comment, et qu'obtient-on ?
= L'objet, le plan de projection, la direction d'observation, les lignes de projection (perpendiculaires au plan) et la projection obtenue, appelée vue.

? La pièce en L mesure 60 × 40 × 50 (largeur × profondeur × hauteur, en mm). Quelle est la largeur, en mm, du rectangle qui entoure sa vue de dessus ?
indice: Vue d'en haut, la hauteur disparaît.
reponse: 60
= 60 mm. La vue de dessus montre la largeur (60) et la profondeur (40). La hauteur (50) n'y apparaît pas.

? Même pièce. Dans la vue de droite, quelle est la dimension horizontale du rectangle, en mm ?
indice: Depuis la droite, c'est la largeur qui part droit devant toi.
reponse: 40
= 40 mm. La vue de droite montre la profondeur (40) et la hauteur (50).
```

## Flashcards

```cartes
Définition de la projection orthogonale :: Méthode qui représente un objet en trois dimensions sur un plan, par des lignes de projection parallèles entre elles et perpendiculaires au plan.
Les cinq éléments d'une projection orthogonale :: Objet, plan de projection, direction d'observation, lignes de projection, vue.
Où se trouve le plan de projection par rapport à l'objet ? :: Derrière l'objet, parallèle à la face observée.
Les six vues :: Face, dessus, dessous, droite, gauche, arrière.
Quelle vue est la vue principale ? :: La vue de face, en général.
Les trois plans principaux et leurs vues :: Plan frontal : vue de face. Plan horizontal : vue de dessus. Plan latéral droit : vue de droite.
À quoi sert le rabattement des faces du cube ? :: À ramener toutes les vues dans un même plan, celui de la feuille.
Combien de dimensions montre une vue ? :: Deux sur trois. Il faut donc souvent plusieurs vues, qui se complètent.
```

## QCM du chapitre

```qcm
? Dans une projection orthogonale, les lignes de projection sont :
- parallèles au plan de projection
+ parallèles entre elles et perpendiculaires au plan de projection
- concourantes en un point, l'œil de l'observateur
= C'est la définition. Des lignes qui se rejoignent à l'œil donneraient une perspective, qui déforme.

? Lequel n'est PAS un des cinq éléments d'une projection orthogonale ?
- le plan de projection
- la direction d'observation
+ le point de fuite
= Les cinq éléments : objet, plan, direction d'observation, lignes de projection, vue. Le point de fuite appartient à la perspective.

? Dans le principe du cours, le plan de projection est situé :
- entre l'observateur et l'objet
+ derrière l'objet
- au-dessus de l'objet
= La face observée est projetée sur un plan parallèle à cette face, situé derrière l'objet.

? L'observateur se place :
+ perpendiculairement à l'une des faces de l'objet
- en biais, pour voir trois faces à la fois
- parallèlement à la face qu'il veut dessiner
= Il regarde une face bien droit devant lui. En biais, il obtiendrait une vue en perspective.

? Combien de directions d'observation définit-on, par analogie avec un cube ?
- trois
- quatre
+ six
= Face, dessus, dessous, droite, gauche, arrière : une par face du cube.

? Quelle vue est généralement choisie comme vue principale ?
- la vue de dessus
+ la vue de face
- la vue de droite
= Les cinq autres vues sont définies à partir de la vue de face.

? Le plan horizontal du cube de projection donne :
- la vue de face
- la vue de droite
+ la vue de dessus
= Plan frontal : face. Plan horizontal : dessus. Plan latéral droit : droite.

? À quoi sert le rabattement des faces du cube de projection ?
- à agrandir les vues
+ à ramener toutes les vues dans un même plan
- à supprimer les arêtes cachées
= Les six vues sont sur six faces. On rabat ces faces pour tout dessiner sur une seule feuille.

? Une pièce mesure 60 de large, 40 de profondeur et 50 de haut. Sa vue de face montre :
+ 60 et 50
- 60 et 40
- 40 et 50
= De face, on voit la largeur et la hauteur. La profondeur part droit devant l'observateur.

? Pourquoi a-t-on souvent besoin de plusieurs vues ?
- parce que la norme impose toujours six vues
- parce qu'une vue déforme les dimensions
+ parce que chaque vue apporte des informations complémentaires sur les faces, les arêtes et les détails
= Une vue ne déforme rien, mais elle ne montre que deux dimensions. Les vues se complètent.
```

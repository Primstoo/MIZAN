---
id: revision
titre: Fiche de révision et examen blanc
seance: Avant le contrôle
importance: 3
---

## 1. Tout le chapitre en cinq tableaux

### La projection

| Question | Réponse |
|---|---|
| Les lignes de projection sont… | parallèles entre elles, perpendiculaires au plan |
| Le plan de projection est… | derrière l'objet, parallèle à la face observée |
| Les cinq éléments | objet, plan, direction d'observation, lignes de projection, vue |
| Les trois plans principaux | frontal (face), horizontal (dessus), latéral droit (droite) |

### La place des vues en premier dièdre

```html
<svg viewBox="0 0 326 244" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Disposition du premier dièdre : la vue de face au centre, la vue de droite à sa gauche, la vue de gauche à sa droite, la vue de dessus en dessous, la vue de dessous au-dessus, la vue arrière tout à droite.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="10,94 58.0,94 58.0,154.0 10,154.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="10" y1="130.0" x2="58.0" y2="130.0" stroke="currentColor" stroke-width="2.2"/><polygon points="80,154.0 152.0,154.0 152.0,130.0 104.0,130.0 104.0,94 80,94" fill="none" stroke="#D9824F" stroke-width="2.8" /><polygon points="174,94 222.0,94 222.0,154.0 174,154.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="174" y1="130.0" x2="222.0" y2="130.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><polygon points="244,154.0 316.0,154.0 316.0,94 292.0,94 292.0,130.0 244,130.0" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="80,24 152.0,24 152.0,72.0 80,72.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="104.0" y1="24" x2="104.0" y2="72.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><polygon points="80,176 152.0,176 152.0,224.0 80,224.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="104.0" y1="176" x2="104.0" y2="224.0" stroke="currentColor" stroke-width="2.2"/><text x="34" y="167" text-anchor="middle" stroke="none" font-size="10">vue de droite</text><text x="116" y="167" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700" font-size="10">FACE</text><text x="198" y="167" text-anchor="middle" stroke="none" font-size="10">vue de gauche</text><text x="280" y="167" text-anchor="middle" stroke="none" font-size="10">vue arrière</text><text x="116" y="85" text-anchor="middle" stroke="none" font-size="10">vue de dessous</text><text x="116" y="237" text-anchor="middle" stroke="none" font-size="10">vue de dessus</text>
</g>
</svg>
```

| Vue | Place par rapport à la vue de face |
|---|---|
| Droite | à gauche |
| Gauche | à droite |
| Dessus | au-dessous |
| Dessous | au-dessus |
| Arrière | à droite ou à gauche |

### Les correspondances

| Vues | Dimension commune | Moyen |
|---|---|---|
| Face et dessus | largeurs | alignement vertical |
| Face et droite | hauteurs | alignement horizontal |
| Dessus et droite | profondeurs | droite à 45° |

### Les traits

| Élément | Trait |
|---|---|
| Arête vue | continu fort |
| Arête cachée | interrompu fin |
| Limite de vue partielle ou interrompue | fin à main levée, ou continu fin en zigzag |

### Le nombre de vues et les vues particulières

| Situation | Solution |
|---|---|
| Objet complexe | 3 vues |
| Objet relativement simple | 2 vues |
| Objet simple, symétrique ou d'épaisseur constante | 1 vue |
| Objet symétrique | demi-vue |
| Une seule partie utile | vue partielle |
| Objet long de forme constante | vue interrompue |
| Zone trop petite | détail |

## 2. Les huit pièges qui coûtent des points

1. Placer la vue de droite à droite. En premier dièdre, elle est **à gauche**.
2. Placer la vue de dessus en haut. Elle est **sous** la vue de face.
3. Écrire le nom des vues sur le dessin. On ne l'écrit **jamais**.
4. Faire partir la droite à 45° du coin de la vue de face. Elle part du **point O**, entre les vues.
5. Décaler une vue : les hauteurs ou les largeurs ne correspondent plus.
6. Dessiner une arête cachée en trait fort, ou l'oublier.
7. Ajouter des vues redondantes. L'objectif est le **minimum** de vues.
8. Confondre vue partielle (un morceau) et vue interrompue (les deux bouts, sans le milieu).

## 3. Examen blanc (45 minutes)

> [!attention] Le format et le barème du vrai contrôle ne figurent pas dans les diapositives. Cet examen blanc est construit par nous à partir du contenu du chapitre : il t'entraîne, il ne prédit pas le sujet.

```exercice Partie A · Questions de cours (8 points)
? Définis la projection orthogonale et cite ses cinq éléments. (2 points)
= Méthode de représentation d'un objet tridimensionnel sur un plan : les points de l'objet sont projetés suivant des droites parallèles entre elles et perpendiculaires au plan de projection. Les cinq éléments : l'objet, le plan de projection, la direction d'observation, les lignes de projection, la vue.

? Donne la place des vues de droite, de gauche, de dessus et de dessous en premier dièdre. (2 points)
= Vue de droite : à gauche de la vue de face. Vue de gauche : à droite. Vue de dessus : au-dessous. Vue de dessous : au-dessus.

? Énonce les trois règles de correspondance entre les vues de face, de dessus et de droite. (2 points)
= Face et dessus : on conserve les largeurs. Face et droite : on conserve les hauteurs. Dessus et droite : on transfère les profondeurs à l'aide de la droite à 45°.

? Cite les quatre vues particulières et le cas d'emploi de chacune. (2 points)
= Demi-vue : objet symétrique. Vue partielle : seule une partie est nécessaire. Vue interrompue : objet long de forme constante ou répétitive. Détail : agrandissement d'une petite zone.
```

```exercice Partie B · La pièce en L (8 points)
? La pièce en L du module mesure 60 mm de large, 40 mm de profondeur et 50 mm de haut. Son montant, à gauche, fait 20 mm de large. Sa semelle fait 20 mm de haut. Dans quel rectangle (largeur × hauteur) s'inscrit sa vue de face ? Donne la largeur en mm.
reponse: 60
= La vue de face s'inscrit dans un rectangle de **60 × 50**. On y voit le profil en L.

? Dans la vue de dessus, une arête verticale sépare le dessus du montant et le dessus de la semelle. À quelle distance du bord gauche se trouve-t-elle, en mm ?
indice: Face et dessus partagent les largeurs.
reponse: 20
= À 20 mm : c'est la largeur du montant, reportée depuis la vue de face par une ligne de rappel verticale.

? Dans la vue de gauche, à quelle hauteur, en mm, se trouve le trait qui représente l'arête de la marche ? Est-il continu ou interrompu ?
indice: Face et vue de côté partagent les hauteurs. Que voit-on en premier depuis la gauche ?
reponse: 20
= À 20 mm de hauteur, la hauteur de la semelle. Le trait est **interrompu fin** : depuis la gauche, le montant cache la marche.

? Tu ne peux garder que deux vues. Lesquelles choisis-tu ? Justifie.
= La vue de face, la plus représentative, car elle montre le L. Et la vue de droite : elle donne la profondeur sans aucune arête cachée. La vue de gauche donnerait la même information avec un trait interrompu en plus.
```

```exercice Partie C · Choisir la bonne représentation (4 points)
? Une cornière en acier de 3 m de long a la même section d'un bout à l'autre. Comment la représenter sur une feuille A4 sans réduire l'échelle ?
= Par une **vue interrompue** : on supprime une partie intermédiaire et on limite les deux bouts par un trait fin à main levée ou en zigzag.

? Un joint plat circulaire, d'épaisseur 2 mm, percé au centre. Combien de vues, et pourquoi ?
reponse: 1
= Une seule vue, avec l'indication de l'épaisseur : c'est un objet d'épaisseur constante. Comme il est symétrique, une demi-vue est même possible.
```

## Flashcards

```cartes
Les trois règles de correspondance :: Face et dessus : largeurs. Face et droite : hauteurs. Dessus et droite : profondeurs, par la droite à 45°.
La règle du premier dièdre en une phrase :: Chaque vue se place du côté opposé à celui d'où on regarde.
Les trois contrôles avant de rendre un dessin :: Chaque vue est à sa place, les vues sont alignées, les dimensions communes sont égales.
Les quatre idées du bilan du cours :: La projection représente précisément un objet en deux dimensions ; les vues sont complémentaires et respectent les correspondances ; en premier dièdre la vue de droite est à gauche ; les vues particulières simplifient certaines géométries.
```

## QCM de synthèse

```qcm
? En premier dièdre, quelle vue se trouve sous la vue de face ?
- la vue de dessous
+ la vue de dessus
- la vue arrière
= Ce qu'on voit d'en haut se dessine en bas.

? Les trois vues de face, de dessus et de droite doivent :
- avoir toutes la même taille
+ représenter le même objet et respecter les correspondances géométriques
- être séparées par exactement 10 mm
= C'est la phrase finale du bilan. L'espace entre les vues, lui, s'adapte à la mise en page.

? Une pièce fait 90 de large, 20 de profondeur et 35 de haut. Sa vue de dessus s'inscrit dans un rectangle de :
- 90 × 35
+ 90 × 20
- 20 × 35
= La vue de dessus montre la largeur et la profondeur.

? Quelle paire de vues partage les profondeurs ?
- face et dessus
- face et droite
+ dessus et droite
= Et c'est pour cette paire qu'on a besoin de la droite à 45°.

? Le plan latéral droit du cube de projection donne :
+ la vue de droite
- la vue de gauche
- la vue de dessus
= L'observateur regarde l'objet depuis la droite : on obtient la vue de droite.

? Un trait interrompu fin représente :
- un axe de symétrie
+ une arête cachée
- la limite d'une vue partielle
= La limite d'une vue se trace en trait fin à main levée ou en zigzag.

? Un objet relativement simple se définit en général avec :
- une vue
+ deux vues
- six vues
= 3 vues : complexe. 2 vues : relativement simple. 1 vue : simple, symétrique ou d'épaisseur constante.

? Pour une pièce longue dont la forme se répète, on utilise :
- le détail
- la demi-vue
+ la vue interrompue
= On supprime une partie intermédiaire pour réduire la longueur du dessin.

? Lequel de ces tracés est correct en premier dièdre ?
- vue de gauche à gauche de la face, vue de dessus au-dessus
+ vue de gauche à droite de la face, vue de dessus au-dessous
- vue de gauche à droite de la face, vue de dessus au-dessus
= Gauche à droite, dessus en bas : toujours du côté opposé.

? Que permet la projection orthogonale, selon le bilan du cours ?
+ représenter précisément un objet en deux dimensions
- représenter un objet tel que l'œil le voit, avec la perspective
- représenter un objet sans avoir besoin de plusieurs vues
= Elle est précise parce qu'elle ne déforme pas. Mais il faut souvent plusieurs vues, complémentaires.
```

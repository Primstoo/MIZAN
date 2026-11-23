---
id: methodes-etude
titre: Méthodes d'étude de la cellule
seance: TD 1 · Méthodes morphologiques et biochimiques
importance: 3
---

## Avant de commencer

Il faut savoir ce qu'est le pouvoir de résolution : la plus petite distance entre deux points que l'œil ou l'appareil distingue encore.

```exercice Vérifie ton prérequis
? L'œil distingue 0,2 mm. Un objet de 20 µm est-il visible à l'œil nu ?
= Non : 20 µm = 0,02 mm, dix fois plus petit que 0,2 mm.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « quelle question, quel outil ».** Voir la forme : microscope. Connaître la composition : fractionner puis analyser.

> [!piege] Confondre grossissement et résolution. Agrandir une image floue ne montre pas plus de détails.

À la fin, tu sais choisir la bonne technique pour chaque question du TD 1.

## Idée 1 · Les microscopes

```grille Microscopes
#cols: Microscope, Rayonnement, Résolution, Usage
*Optique (photonique), lumière visible, ≈ 0,2 µm, cellules entières vivantes ou colorées
*Électronique à transmission (MET), électrons, ≈ 0,2 nm, coupes ultrafines : organites, membranes
*Électronique à balayage (MEB), électrons, ≈ 10 nm, relief des surfaces
```

```etapes Préparer un échantillon pour le MET
1. Fixation (glutaraldéhyde, tétroxyde d'osmium) : on fige les structures.
2. Déshydratation (alcools) puis inclusion dans une résine.
3. Coupes ultrafines (≈ 50 à 100 nm) à l'ultramicrotome.
4. Contraste aux métaux lourds (acétate d'uranyle, citrate de plomb).
```

## Idée 2 · Le fractionnement cellulaire

```html
<svg viewBox="0 0 320 110" role="img" aria-label="Centrifugation différentielle : vitesse croissante, culots successifs noyaux, mitochondries, microsomes" style="max-width:420px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2">
<path d="M20 15v70a12 12 0 0 0 24 0V15"/><path d="M120 15v70a12 12 0 0 0 24 0V15"/><path d="M220 15v70a12 12 0 0 0 24 0V15"/>
<path d="M60 50h40M160 50h40" stroke="#D9824F"/></g>
<g fill="#D9824F"><circle cx="32" cy="92" r="7"/><circle cx="132" cy="94" r="5"/><circle cx="232" cy="95" r="3"/></g>
<g fill="currentColor" font-size="10"><text x="8" y="12">1 000 g</text><text x="108" y="12">10 000 g</text><text x="206" y="12">100 000 g</text>
<text x="10" y="110">noyaux</text><text x="100" y="110">mitochondries</text><text x="210" y="110">microsomes</text></g>
</svg>
```

On broie (homogénéisation), puis on centrifuge à vitesse croissante : les gros éléments tombent d'abord.

> [!retenir] Plus un élément est gros et dense, plus il sédimente tôt. Le surnageant de chaque étape est recentrifugé plus vite.

## Idée 3 · Autres méthodes

- **Autoradiographie** : un précurseur radioactif (ex. leucine tritiée) suit le trajet d'une molécule. C'est l'expérience « pulse-chase » qui montre RE → Golgi → vésicules.
- **Cytochimie et immunocytochimie** : un colorant ou un anticorps marqué révèle une molécule précise.
- **Culture cellulaire** : cellules vivantes hors de l'organisme.

## S'exercer

```exercice TD 1
? Tu veux observer les crêtes d'une mitochondrie. Quel microscope ?
= Le MET : les crêtes mesurent quelques dizaines de nm, sous la limite du microscope optique.

? Dans quel culot récupères-tu les mitochondries ?
= Le culot de vitesse moyenne (≈ 10 000 g), après avoir retiré les noyaux à basse vitesse.
```

## Flashcards

```cartes
Résolution du microscope optique :: ≈ 0,2 µm.
Résolution du MET :: ≈ 0,2 nm.
Ordre de sédimentation :: Noyaux, puis mitochondries, puis microsomes (fragments de RE).
Pulse-chase :: Marquage bref par un précurseur radioactif, puis suivi dans le temps.
```

## QCM du chapitre

```qcm
? Pour voir le relief d'une surface cellulaire :
- MET
+ MEB
- microscope optique
= Balayage = surface.

? La limite de résolution du microscope optique est d'environ :
+ 0,2 µm
- 0,2 nm
- 2 mm
= Limitée par la longueur d'onde de la lumière.

? Le premier culot de centrifugation contient :
+ les noyaux
- les ribosomes
- les microsomes
= Ce sont les plus gros éléments.

? Le tétroxyde d'osmium sert à :
- couper
+ fixer et contraster les lipides
- broyer
= Il fixe et colore les membranes.

? Les microsomes sont :
- des petits noyaux
+ des fragments de RE refermés en vésicules
- des bactéries
= Ils apparaissent au broyage.

? L'autoradiographie utilise :
- des anticorps
+ un précurseur radioactif
- des électrons
= Ex. leucine tritiée.

? Une coupe pour le MET mesure environ :
- 10 µm
+ 50 à 100 nm
- 1 mm
= Coupe ultrafine.

? Grossir une image sans améliorer la résolution :
- montre plus de détails
+ ne montre pas plus de détails
- augmente la résolution
= Grossissement vide.

? Pour localiser une protéine précise, on utilise :
- le MEB
+ l'immunocytochimie
- la centrifugation seule
= Un anticorps marqué reconnaît la protéine.

? On observe des cellules vivantes :
+ au microscope optique
- au MET
- au MEB
= Le MET demande fixation et vide.
```

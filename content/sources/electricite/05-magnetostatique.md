---
id: magnetostatique
titre: Magnétostatique · Biot-Savart, Ampère, Laplace
seance: Série 4 · Champ magnétique des courants
importance: 5
---

## Avant de commencer

Il faut savoir faire un produit vectoriel : $\vec u \wedge \vec v$ est perpendiculaire aux deux, de norme $uv\sin\alpha$.

```exercice Vérifie ton prérequis
? Que vaut $\vec e_x \wedge \vec e_y$ ?
= $\vec e_z$ (règle de la main droite).
```

## Comment aborder ce chapitre

> [!astuce] **Pense « le courant tourne, le champ l'entoure ».** Autour d'un fil, les lignes de champ sont des cercles. La main droite donne le sens : pouce dans le sens du courant, les doigts suivent B.

> [!piege] Utiliser Gauss en magnétostatique. Pour B, l'outil symétrique est le **théorème d'Ampère** (circulation sur un contour fermé), pas le flux.

À la fin, tu sais calculer B pour un fil, une spire et un cylindre, et la force entre deux fils.

## Idée 1 · Loi de Biot-Savart

$$d\vec B = \frac{\mu_0}{4\pi}\,\frac{I\,d\vec l \wedge \vec u}{r^2}$$

Pour une charge en mouvement : $\vec B = \dfrac{\mu_0}{4\pi}\dfrac{q\,\vec v\wedge\vec u}{r^2}$.

## Idée 2 · Théorème d'Ampère

$$\oint \vec B\cdot d\vec l = \mu_0 I_{\text{enlacé}}$$

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Fil traversé par un courant I, cercle d'Ampère de rayon a, B tangent au cercle" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M160 110V10"/><path d="M155 20l5-10 5 10"/><ellipse cx="160" cy="60" rx="70" ry="22" stroke="#D9824F"/><path d="M225 70l8-6-2 10" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="11"><text x="166" y="20">I</text><text x="240" y="62">B</text><text x="180" y="58">a</text></g>
</svg>
```

```grille Résultats classiques
#cols: Source, Champ B
*Fil infini (distance a), μ₀I / (2πa)
*Spire de rayon R (sur l'axe), μ₀IR² / (2(R² + z²)^{3/2})
*Cylindre plein de rayon R (r < R), μ₀Ir / (2πR²)
*Cylindre plein (r > R), μ₀I / (2πr)
```

Sur l'axe d'une spire, B est maximal au centre ($\frac{\mu_0 I}{2R}$) et décroît des deux côtés : courbe en cloche.

## Idée 3 · Force de Laplace entre deux fils

$d\vec F = I\,d\vec l \wedge \vec B$. Deux fils parallèles à la distance d : force par unité de longueur $\dfrac{F}{L} = \dfrac{\mu_0 I_1I_2}{2\pi d}$, **attractive** si les courants sont de même sens, répulsive sinon.

## S'exercer

```exercice Série 4
? Ex. II : fil infini, I = 10 A, a = 2 cm. Valeur de B ($\mu_0 = 4\pi\cdot10^{-7}$) ?
= $B = \frac{4\pi\cdot10^{-7}\times10}{2\pi\times0{,}02} = 10^{-4}$ T.
reponse: 0.0001

? Ex. VI : $\vec A = \frac12\vec B\wedge\vec r$ avec $\vec B = B\vec e_z$. Vérifier $\overrightarrow{\operatorname{rot}}\vec A = \vec B$.
= $\vec A = \frac B2(-y, x, 0)$. $\overrightarrow{\operatorname{rot}}\vec A = (0, 0, \frac B2 + \frac B2) = B\vec e_z$.

? Ex. IV : champ dans un cylindre plein à r = R/2 ?
= Courant enlacé : $I\frac{r^2}{R^2} = \frac I4$. $B\cdot2\pi r = \mu_0\frac I4$ donne $B = \frac{\mu_0 I}{4\pi R}$, la moitié du champ en surface.
```

## Flashcards

```cartes
Théorème d'Ampère :: $\oint\vec B\cdot d\vec l = \mu_0 I_{enlacé}$.
B d'un fil infini :: $\mu_0I/(2\pi a)$.
B au centre d'une spire :: $\mu_0I/(2R)$.
Deux courants de même sens :: Les fils s'attirent.
```

## QCM du chapitre

```qcm
? L'outil de symétrie pour B est :
- Gauss
+ Ampère
- Kirchhoff
= Circulation sur un contour fermé.

? Les lignes de champ d'un fil rectiligne sont :
+ des cercles autour du fil
- des droites parallèles au fil
- radiales
= Main droite.

? B d'un fil varie en :
+ $1/a$
- $1/a^2$
- $a$
= $\mu_0I/(2\pi a)$.

? Deux fils, courants opposés :
- s'attirent
+ se repoussent
- n'interagissent pas
= Même sens : attraction.

? $\mu_0$ vaut :
+ $4\pi\cdot10^{-7}$ SI
- $9\cdot10^9$ SI
- $8{,}85\cdot10^{-12}$ SI
= Perméabilité du vide.

? Dans un cylindre plein, B au centre vaut :
+ 0
- maximal
- infini
= Aucun courant enlacé.

? Sur l'axe d'une spire, B est maximal :
+ au centre
- à l'infini
- à z = R
= Courbe en cloche.

? La force de Laplace s'écrit :
+ $I\,d\vec l\wedge\vec B$
- $q\vec E$
- $\vec B\wedge I\,d\vec l$
= L'ordre du produit vectoriel compte.

? Biot-Savart contient :
- un produit scalaire
+ un produit vectoriel
- une divergence
= $d\vec l\wedge\vec u$.

? L'unité de B :
+ le tesla
- le volt
- le weber par mètre
= T.
```

---
id: miroirs
titre: Miroirs plans et sphériques
seance: Chapitre III · Série 2, exercice 1
importance: 5
---

## Avant de commencer

Il faut manipuler des distances **algébriques** : $\overline{SA}$ est positive si on va de S à A dans le sens de la lumière, négative sinon.

```exercice Vérifie ton prérequis
? La lumière va vers la droite. A est 4 cm à gauche de S. Que vaut $\overline{SA}$ ?
= $\overline{SA} = -4$ cm.
reponse: -4
```

## Comment aborder ce chapitre

> [!astuce] **Pense « une formule, des signes ».** Toute la difficulté est dans les signes. Pose les valeurs algébriques avant de remplacer.

> [!piege] Pour un miroir concave éclairé par la gauche, le centre C est du côté de la lumière : $\overline{SC} < 0$. Beaucoup prennent R positif et tout le reste devient faux.

À la fin, tu sais trouver l'image donnée par un miroir sphérique et son grandissement.

## Idée 1 · Le miroir plan

L'image est symétrique de l'objet par rapport au miroir, de même taille, virtuelle pour un objet réel.

## Idée 2 · Le miroir sphérique

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Miroir concave, axe optique, centre C et foyer F au milieu de SC" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10 65h300"/><path d="M270 10q-30 55 0 110" stroke="#D9824F" stroke-width="3"/></g>
<g fill="currentColor" font-size="11"><circle cx="110" cy="65" r="3"/><circle cx="185" cy="65" r="3"/><circle cx="258" cy="65" r="3"/><text x="105" y="82">C</text><text x="180" y="82">F</text><text x="262" y="82">S</text><text x="20" y="55">lumière →</text></g>
</svg>
```

```grille Formules (origine au sommet S)
#cols: Grandeur, Formule
*Conjugaison, 1/SA' + 1/SA = 2/SC
*Foyer, SF = SF' = SC/2
*Grandissement, γ = −SA'/SA
```

```etapes Trouver une image
1. Écris $\overline{SA}$ et $\overline{SC}$ avec leurs signes.
2. Conjugaison : $\frac{1}{\overline{SA'}} = \frac{2}{\overline{SC}} - \frac{1}{\overline{SA}}$.
3. Grandissement : $\gamma = -\overline{SA'}/\overline{SA}$ ; γ < 0 : image renversée.
4. Image réelle si elle est du côté de la lumière ($\overline{SA'} < 0$ pour un miroir éclairé par la gauche).
```

## S'exercer

```exercice Série 2, exercice 1
? Image réelle, renversée, 3 fois plus grande, $\overline{AA_1} = -8$ cm. Position de l'objet ?
= γ = −3 donne $\overline{SA_1} = 3\overline{SA}$. Alors $\overline{AA_1} = \overline{SA_1} - \overline{SA} = 2\overline{SA} = -8$, d'où **$\overline{SA} = -4$ cm** et $\overline{SA_1} = -12$ cm.
reponse: -4

? Rayon de courbure et foyer ?
= $\frac{2}{\overline{SC}} = \frac{1}{-12} + \frac{1}{-4} = -\frac{1}{3}$, donc **$\overline{SC} = -6$ cm** et $\overline{SF} = -3$ cm.
reponse: -6
```

## Flashcards

```cartes
Conjugaison du miroir sphérique :: $\frac{1}{\overline{SA'}} + \frac{1}{\overline{SA}} = \frac{2}{\overline{SC}}$.
Foyer du miroir :: Au milieu de [SC].
Grandissement :: $\gamma = -\overline{SA'}/\overline{SA}$.
Miroir plan :: Image symétrique, même taille.
```

## QCM du chapitre

```qcm
? Le foyer d'un miroir sphérique est :
+ au milieu de SC
- en C
- en S
= $\overline{SF} = \overline{SC}/2$.

? Un miroir concave éclairé par la gauche a :
+ $\overline{SC} < 0$
- $\overline{SC} > 0$
- $\overline{SC} = 0$
= C est du côté de la lumière.

? γ = −2 signifie :
+ image renversée, deux fois plus grande
- image droite, deux fois plus petite
- image virtuelle
= Signe : sens ; valeur : taille.

? L'image d'un objet réel dans un miroir plan est :
- réelle
+ virtuelle
- renversée
= Derrière le miroir.

? Objet au centre C d'un miroir concave : l'image est
+ en C, renversée, même taille
- à l'infini
- en F
= γ = −1.

? Objet au foyer F : l'image est
- en S
+ à l'infini
- en C
= Les rayons ressortent parallèles.

? Le miroir convexe donne d'un objet réel une image :
+ virtuelle, droite, plus petite
- réelle, renversée
- réelle, plus grande
= Rétroviseurs.

? Avec $\overline{SA} = -4$ et $\overline{SC} = -6$, $\overline{SA'}$ vaut :
+ −12 cm
- −2,4 cm
- 12 cm
= $2/(-6) - 1/(-4) = -1/12$.

? La distance focale d'un miroir de rayon 20 cm :
- 20 cm
+ 10 cm
- 40 cm
= R/2.

? Les distances algébriques sont orientées :
+ dans le sens de la lumière
- toujours vers la droite
- vers le haut
= Convention du cours.
```

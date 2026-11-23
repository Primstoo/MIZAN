---
id: analyse-vectorielle
titre: Analyse vectorielle
seance: Série 1 · Coordonnées, gradient, divergence, rotationnel
importance: 4
---

## Avant de commencer

Il faut savoir dériver une fonction de plusieurs variables en gardant les autres fixes : c'est la dérivée partielle.

```exercice Vérifie ton prérequis
? Si $f(x,y) = x^2y$, que vaut $\frac{\partial f}{\partial x}$ ?
= On traite y comme une constante : $\frac{\partial f}{\partial x} = 2xy$.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « trois opérateurs, trois questions ».** Le gradient dit où la fonction monte le plus. La divergence dit si un champ « sort » d'un point. Le rotationnel dit s'il « tourne ».

> [!piege] En coordonnées cylindriques ou sphériques, on ne dérive pas comme en cartésien : il y a des facteurs $\frac1r$, $\frac{1}{r\sin\theta}$. Recopie toujours la formule donnée dans le sujet.

À la fin, tu sais changer de coordonnées et calculer les trois opérateurs, outils de tout le module.

## Idée 1 · Les trois systèmes de coordonnées

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Coordonnées sphériques : r distance à O, theta angle avec Oz, phi angle dans le plan xOy" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M160 110V10M160 110l-70 15M160 110h130"/><path d="M160 110L235 40" stroke="#D9824F"/><path d="M235 40v80" stroke-dasharray="4 4"/><path d="M160 70a40 40 0 0 1 28 12" /></g>
<g fill="currentColor" font-size="11"><text x="164" y="12">z</text><text x="240" y="38">M</text><text x="195" y="72">r</text><text x="168" y="62">θ</text><text x="196" y="125">φ dans xOy</text></g>
</svg>
```

```grille Passages vers les cartésiennes
#cols: Système, x, y, z
*Cylindriques (r θ z), r cos θ, r sin θ, z
*Sphériques (r θ φ), r sin θ cos φ, r sin θ sin φ, r cos θ
```

## Idée 2 · Gradient, divergence, rotationnel en cartésien

```grille Formulaire cartésien
#cols: Opérateur, S'applique à, Donne, Formule
*grad f, un scalaire, un vecteur, (∂f/∂x, ∂f/∂y, ∂f/∂z)
*div A, un vecteur, un scalaire, ∂Ax/∂x + ∂Ay/∂y + ∂Az/∂z
*rot A, un vecteur, un vecteur, (∂Az/∂y − ∂Ay/∂z, ∂Ax/∂z − ∂Az/∂x, ∂Ay/∂x − ∂Ax/∂y)
```

**Exemple (série 1, ex. III).** $\vec E_1 = (2x + y,\ 2y + x,\ 4z)$ : $\operatorname{div}\vec E_1 = 2 + 2 + 4 = 8$ ; $\overrightarrow{\operatorname{rot}}\,\vec E_1 = (0,\ 0,\ 1 - 1) = \vec 0$.

## Idée 3 · Le théorème de Green-Ostrogradski

Le flux d'un champ à travers une surface fermée égale l'intégrale de sa divergence dans le volume : $\oint \vec A\cdot d\vec S = \iiint \operatorname{div}\vec A\, dV$.

```etapes Vérifier le théorème avec A = OM sur une sphère (série 1, ex. VI)
1. En sphériques, $\vec A = r\,\vec e_r$ ; sur la sphère, $\vec A\cdot d\vec S = R\cdot dS$.
2. Flux : $R \times 4\pi R^2 = 4\pi R^3$.
3. $\operatorname{div}\vec A = \frac{1}{r^2}\frac{\partial (r^3)}{\partial r} = 3$.
4. Intégrale : $3 \times \frac43\pi R^3 = 4\pi R^3$. Les deux côtés sont égaux.
```

## S'exercer

```exercice Série 1
? Ex. III : divergence de $\vec E_2 = (2y + 3z,\ 2x,\ 3x)$ ?
= $\frac{\partial(2y+3z)}{\partial x} + \frac{\partial(2x)}{\partial y} + \frac{\partial(3x)}{\partial z} = 0$.
reponse: 0

? Ex. III : rotationnel de $\vec E_2$ ?
= $(0 - 0,\ 3 - 3,\ 2 - 2) = \vec 0$ : le champ ne tourne pas, il dérive d'un potentiel.

? Ex. VI : flux de $\vec A = \overrightarrow{OM}$ à travers un cylindre de rayon R et de hauteur h ?
= En cylindriques, $\vec A = r\vec e_r + z\vec e_z$ et $\operatorname{div}\vec A = 3$. Flux $= 3\pi R^2h$ (surface latérale : $R\cdot 2\pi Rh$ ; fonds : $h\cdot\pi R^2$ ; total $3\pi R^2h$).
```

## Flashcards

```cartes
grad f :: Vecteur dirigé vers la plus forte croissance de f.
div A = 0 :: Le champ est à flux conservatif (pas de « source »).
rot A = 0 :: Le champ dérive d'un potentiel : A = grad f (au signe près).
Green-Ostrogradski :: Flux à travers une surface fermée = intégrale de la divergence dans le volume.
```

## QCM du chapitre

```qcm
? Le gradient d'une fonction scalaire est :
- un scalaire
+ un vecteur
- une matrice
= Trois composantes.

? La divergence d'un champ de vecteurs est :
+ un scalaire
- un vecteur
- toujours nulle
= Somme de trois dérivées.

? En sphériques, $z$ vaut :
- $r\sin\theta$
+ $r\cos\theta$
- $r\cos\varphi$
= θ est l'angle avec Oz.

? $\operatorname{div}(x, y, z)$ vaut :
- 1
+ 3
- 0
= 1 + 1 + 1.

? $\overrightarrow{\operatorname{rot}}\,(\overrightarrow{\operatorname{grad}} f)$ vaut :
+ $\vec 0$
- $\operatorname{div} f$
- $\vec 1$
= Identité à retenir.

? Le volume d'une sphère :
- $4\pi R^2$
+ $\frac43\pi R^3$
- $\pi R^2$
= $4\pi R^2$ est sa surface.

? En cylindriques, $x$ vaut :
+ $r\cos\theta$
- $r\sin\theta$
- $z$
= Comme en polaires.

? Un champ de rotationnel nul :
+ dérive d'un potentiel
- a une divergence nulle
- est nul
= C'est le cas du champ électrostatique.

? $\operatorname{div}\vec E_1 = 8$ pour $\vec E_1 = (2x+y, 2y+x, 4z)$ :
+ vrai
- faux
= 2 + 2 + 4.

? Green-Ostrogradski relie :
- circulation et rotationnel
+ flux et divergence
- gradient et potentiel
= La circulation et le rotationnel, c'est Stokes.
```

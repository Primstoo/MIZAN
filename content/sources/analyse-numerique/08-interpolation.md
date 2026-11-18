---
id: interpolation
titre: Interpolation polynomiale · Lagrange et Newton (annale)
seance: Hors chapitres fournis · tombé à l'examen 2023/2024
importance: 3
---

> [!attention] **Ce chapitre ne vient pas des chapitres 0 à 4 du Pr Laaribi** : aucun cours d'interpolation n'est dans les supports fournis. Mais l'examen 2023/2024 (exercice 4) le demande. Ce chapitre est une rédaction ToumaiLearn des méthodes standard. Demande au prof si l'interpolation est au programme cette année.

## Avant de commencer

Il te faut savoir développer un produit de polynômes et résoudre un petit système.

```exercice Vérifie ton prérequis
? Développe $(x - 1)(x - 2)$.
= $x^2 - 3x + 2$.
```

## Comment aborder ce chapitre

> [!astuce] **Par $n + 1$ points d'abscisses distinctes passe un unique polynôme de degré $\le n$.** Lagrange et Newton donnent **le même** polynôme, écrit de deux façons.

> [!piege] Recalculer tout Lagrange quand on ajoute un point. Avec Newton, on ajoute **un seul terme** : c'est exactement la question piège de l'annale.

À la fin, tu sais écrire le polynôme de Lagrange et celui de Newton (différences divisées), et expliquer lequel réutilise les calculs.

## Idée 1 · Lagrange

$$P(x) = \sum_{i=0}^{n} y_i\,L_i(x), \qquad L_i(x) = \prod_{j \neq i} \frac{x - x_j}{x_i - x_j}$$

$L_i$ vaut 1 en $x_i$ et 0 aux autres nœuds.

```etapes Lagrange sur (0,0), (1,2), (2,36)
L0 :: $\frac{(x-1)(x-2)}{(0-1)(0-2)} = \frac{(x-1)(x-2)}{2}$, mais $y_0 = 0$ : il disparaît.
L1 :: $\frac{x(x-2)}{(1)(-1)} = -x(x-2)$.
L2 :: $\frac{x(x-1)}{(2)(1)} = \frac{x(x-1)}{2}$.
Somme :: $P = 2\cdot(-x^2 + 2x) + 36\cdot\frac{x^2 - x}{2} = 16x^2 - 14x$.
```

## Idée 2 · Newton et les différences divisées

$$P(x) = f[x_0] + f[x_0,x_1](x - x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \cdots$$

avec $f[x_i, x_{i+1}] = \dfrac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i}$, puis on recommence sur les colonnes.

```grille Tableau des différences divisées (annale 2023/24)
#cols: x f ordre1 ordre2 ordre3
0 *0 ~ ~ ~
1 2 *2 ~ ~
2 36 34 *16 ~
3 252 216 91 *25
```

Les coefficients sont la **diagonale** : $0, 2, 16, 25$.

```python
from fractions import Fraction as F
xs = [0, 1, 2, 3]
ys = [0, 2, 36, 252]

def diff_divisees(xs, ys):
    c = [F(y) for y in ys]
    n = len(xs)
    for k in range(1, n):
        for i in range(n - 1, k - 1, -1):
            c[i] = (c[i] - c[i - 1]) / (xs[i] - xs[i - k])
    return c

def newton_eval(c, xs, x):
    p = c[-1]
    for k in range(len(c) - 2, -1, -1):
        p = p * (x - xs[k]) + c[k]
    return p

c3 = diff_divisees(xs[:3], ys[:3])
c4 = diff_divisees(xs, ys)
print("coefficients 3 points :", [str(v) for v in c3])
print("coefficients 4 points :", [str(v) for v in c4])
print("P3 aux noeuds :", [str(newton_eval(c4, xs, x)) for x in xs])

import numpy as np
print("P2 =", np.polyfit(xs[:3], ys[:3], 2).round(6))
print("P3 =", np.polyfit(xs, ys, 3).round(6))
```

```sortie
coefficients 3 points : ['0', '2', '16']
coefficients 4 points : ['0', '2', '16', '25']
P3 aux noeuds : ['0', '2', '36', '252']
P2 = [ 16. -14.   0.]
P3 = [ 25. -59.  36.   0.]
```

Donc $P_2(x) = 2x + 16x(x-1) = 16x^2 - 14x$ et $P_3(x) = P_2(x) + 25\,x(x-1)(x-2) = 25x^3 - 59x^2 + 36x$.

> [!retenir] Ajouter un point avec Newton = ajouter **un terme** $f[x_0,\ldots,x_n]\prod(x - x_j)$. Avec Lagrange, tous les $L_i$ changent : on ne peut **pas** réutiliser les calculs (réponse à la question 2 de l'annale).

## S'exercer

```exercice Annale 2023/24, exercice 4
? Polynôme de Lagrange par $(0,0)$, $(1,2)$, $(2,36)$ : coefficient de $x^2$ ?
reponse: 16
= $P_2(x) = 16x^2 - 14x$.

? Polynôme de Newton par les 4 points : coefficient de $x^3$ ?
reponse: 25
= Différence divisée d'ordre 3 : $f[0,1,2,3] = 25$, donc $P_3 = 25x^3 - 59x^2 + 36x$.
```

## Flashcards

```cartes
Unicité de l'interpolation :: $n+1$ points d'abscisses distinctes ⇒ un unique polynôme de degré $\le n$.
Polynôme de base de Lagrange :: $L_i(x) = \prod_{j\neq i}(x - x_j)/(x_i - x_j)$.
Différence divisée d'ordre 1 :: $f[x_i,x_{i+1}] = (f(x_{i+1}) - f(x_i))/(x_{i+1} - x_i)$.
Forme de Newton :: $P(x) = \sum_k f[x_0..x_k]\prod_{j<k}(x - x_j)$.
Avantage de Newton sur Lagrange :: Ajouter un point = ajouter un seul terme.
Lagrange et Newton donnent-ils le même polynôme ? :: Oui, par unicité ; seule l'écriture change.
```

## QCM du chapitre

```qcm
? Par 4 points d'abscisses distinctes passe un unique polynôme de degré :
- exactement 4
+ au plus 3
- au plus 4
= $n + 1$ points, degré $\le n$.

? $L_i(x_j)$ vaut, pour $j \neq i$ :
+ 0
- 1
- $x_j$
= $L_i$ s'annule aux autres nœuds.

? $f[0,1]$ pour $f(0) = 0$, $f(1) = 2$ :
- 1
+ 2
- 0
= $(2 - 0)/(1 - 0)$.

? Pour ajouter un point, la forme la plus pratique est :
- Lagrange
+ Newton
- les deux pareilles
= Un seul terme à ajouter.

? Lagrange et Newton sur les mêmes points donnent :
+ le même polynôme
- des polynômes différents
- des degrés différents
= Unicité.

? Le polynôme par $(0,0)$, $(1,2)$, $(2,36)$ est :
- $18x^2 - 16x$
+ $16x^2 - 14x$
- $17x^2 - 15x$
= Vérifie : $P(1) = 2$, $P(2) = 64 - 28 = 36$.

? Dans le tableau des différences divisées, les coefficients de Newton sont :
- la dernière ligne
+ la diagonale supérieure (premier terme de chaque colonne)
- la colonne des $f(x_i)$
= $f[x_0], f[x_0,x_1], \ldots$

? $f[0,1,2,3]$ dans l'annale vaut :
- 91
+ 25
- 216
= $(91 - 16)/(3 - 0) = 25$.

? Le coefficient dominant de $P_3$ est égal à :
+ la différence divisée d'ordre 3
- $f(3)$
- la somme des $y_i$
= Le terme $f[x_0..x_3]x^3$ est le seul en $x^3$.

? L'interpolation de Lagrange est-elle dans les chapitres 0–4 fournis ?
- Oui, chapitre 2
+ Non, elle n'apparaît que dans l'examen 2023/24
- Oui, chapitre 4
= À vérifier avec le prof pour cette année.
```

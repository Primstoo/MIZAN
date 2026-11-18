---
id: td-corriges
titre: Séries de TD 1 à 4 corrigées
seance: TD · séries 1, 2, 3 et 4
importance: 4
---

Ce chapitre reprend les exercices des séries qui ne sont pas déjà traités dans les chapitres de cours. Tous les nombres ont été recalculés en Python.

## Série 1 · Arithmétique de l'ordinateur

```exercice Série 1
? Ex. 5 : pourquoi $10^6 + 10^{-6} \approx 10^6$ en machine, et donne un exemple de non-distributivité.
= Pour additionner, on aligne les exposants : $10^{-6}$ devient $0.000000000001 \times 10^6$, chiffres qui sortent d'une mantisse courte (absorption ; en double précision, c'est $10^{16} + 1 = 10^{16}$ qui est absorbé). Non-distributivité (cours, $t = 3$) : $122\times(333 + 695) \to 0.126\times10^6$ mais $122\times333 + 122\times695 \to 0.125\times10^6$.

? Ex. 6 : vers quel rang la suite $u_{n+1} = 1 - 2u_n$, $u_0 = 1/3$, cesse-t-elle d'être utilisable en double précision ?
= $\epsilon_n = 2^n\epsilon_0$ avec $\epsilon_0 \approx 10^{-17}$ : l'erreur atteint l'ordre de $u_n$ vers $n \approx 55$. En Python : $u_{50} \approx 0.33$ (déjà faux au 2e chiffre), $u_{60} = -21$.
```

## Série 2 · Équations non linéaires

### Ex. 6 : $x = -\ln x$

$g(x) = -\ln x$ a $|g'(x)| = 1/x > 1$ sur $]0, 1[$ : l'itération $x_{n+1} = -\ln x_n$ **diverge**. On utilise la réciproque $g^{-1}(x) = e^{-x}$, qui a le même point fixe et $|(g^{-1})'| < 1$ près de la racine.

```python
import math
x = 2.5
for n in range(1, 23):
    x = math.exp(-x)
print("x22 =", round(x, 5))

f = lambda x: x + math.log(x)          # f(x) = x - g(x)
df = lambda x: 1 + 1 / x
y = 2.5
for k in range(1, 6):
    y = y - f(y) / df(y)
    print(k, round(y, 8))
```

```sortie
x22 = 0.56715
1 0.05979233
2 0.21534411
3 0.44926278
4 0.55803488
5 0.56709609
```

Newton part de $x_0 = 2.5$ : $x_1 \approx 0.0598$ (encore positif, heureusement), puis s'approche de $0.567143$ ($x_5 \approx 0.56710$). Mauvais départ : Newton perd des itérations au début, puis devient quadratique.

### Ex. 8 : $x^3 - x - 1 = 0$, trois écritures de point fixe

```python
F = lambda x: x**3 - 1
G = lambda x: 1 / (x**2 - 1)
H = lambda x: (x + 1) ** (1/3)
N = lambda x: (2*x**3 + 1) / (3*x**2 - 1)     # c'est Newton !
for nom, g, n in (("Newton", N, 5), ("F", F, 3), ("G", G, 4), ("H", H, 5)):
    x, it = 1.5, []
    for _ in range(n):
        x = g(x)
        it.append(round(x, 4))
    print(nom, it)
```

```sortie
Newton [1.3478, 1.3252, 1.3247, 1.3247, 1.3247]
F [2.375, 12.3965, 1904.0028]
G [0.8, -2.7778, 0.1489, -1.0227]
H [1.3572, 1.3309, 1.3259, 1.3249, 1.3248]
```

- La suite $x_{n+1} = \frac{2x_n^3 + 1}{3x_n^2 - 1}$ est **exactement Newton** : convergence en 3 itérations vers $1.3247$.
- $F$ et $G$ divergent ($|F'(\alpha)| \approx 5.3$, $|G'(\alpha)| \approx 3.9$) ; $H$ converge lentement ($|H'(\alpha)| \approx 0.19$).

## Série 3 · Méthodes directes

```exercice Série 3
? Ex. 2 : $A = \begin{pmatrix}2&1&-1\\1&3&2\\1&-1&2\end{pmatrix}$. Donne $\det A$ et la solution de $Ax = (1,0,1)^T$.
reponse: 20
= LU : $l_{21} = l_{31} = 1/2$, $u_{22} = 5/2$, $u_{23} = 5/2$, $l_{32} = -3/5$, $u_{33} = 4$. $\det A = 2\cdot\frac52\cdot4 = 20$. $x = (13/20,\ -1/4,\ 1/20)$ et $A^{-1} = \frac{1}{20}\begin{pmatrix}8&-1&5\\0&5&-5\\-4&3&5\end{pmatrix}$.

? Ex. 4 : $A$ $4\times4$ (lignes $(1,2,-1,3)$, $(2,5,1,0)$, $(1,0,4,-2)$, $(3,1,-1,2)$). Que vaut $\det A$ ?
reponse: -118
= LU (voir ci-dessous) : diagonale de $U$ $= 1, 1, 11, -118/11$, produit $-118$.

? Ex. 5 : Cholesky de $\begin{pmatrix}4&2&2\\2&5&1\\2&1&3\end{pmatrix}$. Que vaut $l_{22}$ ?
reponse: 2
= $l_{11} = 2$, $l_{21} = l_{31} = 1$, $l_{22} = \sqrt{5 - 1} = 2$, $l_{32} = (1 - 1)/2 = 0$, $l_{33} = \sqrt{3 - 1} = \sqrt2$.
```

```python
from fractions import Fraction as F
A = [[1, 2, -1, 3], [2, 5, 1, 0], [1, 0, 4, -2], [3, 1, -1, 2]]
n = 4
U = [[F(v) for v in r] for r in A]
L = [[F(int(i == j)) for j in range(n)] for i in range(n)]
for k in range(n - 1):
    for i in range(k + 1, n):
        L[i][k] = U[i][k] / U[k][k]
        U[i] = [U[i][j] - L[i][k] * U[k][j] for j in range(n)]
print("L :", [[str(v) for v in r] for r in L])
print("U :", [[str(v) for v in r] for r in U])
d = 1
for i in range(n):
    d *= U[i][i]
print("det =", d)
```

```sortie
L : [['1', '0', '0', '0'], ['2', '1', '0', '0'], ['1', '-2', '1', '0'], ['3', '-5', '17/11', '1']]
U : [['1', '2', '-1', '3'], ['0', '1', '3', '-6'], ['0', '0', '11', '-17'], ['0', '0', '0', '-118/11']]
det = -118
```

## Série 4 · Méthodes itératives

### Ex. 3 : réordonner pour converger

```python
import numpy as np
def jacobi(A, b, n):
    A, b = np.array(A, float), np.array(b, float)
    x = np.zeros(len(b)); D = np.diag(A)
    for k in range(1, n + 1):
        x = (b - A @ x + D * x) / D
        print("J ", k, np.round(x, 4))
def seidel(A, b, n, w=1.0):
    A, b = np.array(A, float), np.array(b, float)
    x = np.zeros(len(b))
    for k in range(1, n + 1):
        for i in range(len(b)):
            x[i] = (1 - w) * x[i] + w * (b[i] - A[i] @ x + A[i, i] * x[i]) / A[i, i]
        print("GS", k, np.round(x, 4))

print("ordre de l'énoncé :")
jacobi([[1, -2, -6], [1, 6, 0], [9, 4, 1]], [14, 4, -17], 3)
print("ordre réarrangé (diagonale dominante) :")
jacobi([[9, 4, 1], [1, 6, 0], [1, -2, -6]], [-17, 4, 14], 3)
seidel([[9, 4, 1], [1, 6, 0], [1, -2, -6]], [-17, 4, 14], 3)
print("solution :", np.round(np.linalg.solve([[9, 4, 1], [1, 6, 0], [1, -2, -6]], [-17, 4, 14]), 4))
```

```sortie
ordre de l'énoncé :
J  1 [ 14.       0.6667 -17.    ]
J  2 [ -86.6667   -1.6667 -145.6667]
J  3 [-863.3333   15.1111  769.6667]
ordre réarrangé (diagonale dominante) :
J  1 [-1.8889  0.6667 -2.3333]
J  2 [-1.9259  0.9815 -2.8704]
J  3 [-2.0062  0.9877 -2.9815]
GS 1 [-1.8889  0.9815 -2.9753]
GS 2 [-1.9945  0.9991 -2.9988]
GS 3 [-1.9997  1.     -2.9999]
solution : [-2.  1. -3.]
```

### Ex. 5 : relaxation sur un système à réordonner

Dans l'ordre donné, la 2e ligne a $a_{22} = 1$ et la 3e $a_{33} = 1$ : pas de dominance. On réordonne : $6x_1 - 3x_2 + x_3 = 11$, $x_1 - 7x_2 + x_3 = 10$, $2x_1 + x_2 - 8x_3 = -15$.

```python
for w in (0.5, 1.0, 1.5):
    print("omega =", w)
    seidel([[6, -3, 1], [1, -7, 1], [2, 1, -8]], [11, 10, -15], 5, w)
```

```sortie
omega = 0.5
GS 1 [ 0.9167 -0.6488  1.0115]
GS 2 [ 1.1285 -0.8858  1.529 ]
GS 3 [ 1.132  -0.9671  1.783 ]
GS 4 [ 1.0923 -0.9925  1.9035]
GS 5 [ 1.0561 -0.9991  1.9588]
omega = 1.0
GS 1 [ 1.8333 -1.1667  2.1875]
GS 2 [ 0.8854 -0.9896  1.9727]
GS 3 [ 1.0098 -1.0025  2.0021]
GS 4 [ 0.9984 -0.9999  1.9996]
GS 5 [ 1.0001 -1.      2.    ]
omega = 1.5
GS 1 [ 2.75   -1.5536  3.5525]
GS 2 [-0.6783 -0.7502  0.6413]
GS 3 [ 2.3662 -1.1233  3.1686]
GS 4 [-0.0677 -0.9167  1.0309]
GS 5 [ 1.8386 -1.0696  2.786 ]
```

La solution est $(1, -1, 2)$. Ici $\omega = 1$ (Gauss-Seidel) converge le plus vite ; $\omega = 1.5$ oscille davantage.

> [!attention] La réorganisation des équations est un choix ToumaiLearn : l'énoncé ne la demande pas, mais sans elle les méthodes divergent.

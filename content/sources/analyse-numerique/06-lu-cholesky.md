---
id: lu-cholesky
titre: Systèmes linéaires (2) · décomposition LU et Cholesky
seance: Chapitre 3 (2/2) · Méthodes directes
importance: 5
---

## Avant de commencer

Il te faut la méthode de Gauss (chapitre précédent) et le produit de matrices.

```exercice Vérifie ton prérequis
? Dans Gauss sur $A = \begin{pmatrix}1 & 4\\ -1 & 2\end{pmatrix}$, quel multiplicateur utilises-tu pour éliminer $a_{21}$ ?
reponse: -1
= $m = a_{21}/a_{11} = -1/1 = -1$ : $L_2 \leftarrow L_2 - (-1)L_1 = L_2 + L_1$.
```

## Comment aborder ce chapitre

> [!astuce] **LU, c'est Gauss qu'on garde en mémoire.** $U$ est la matrice triangulaire obtenue par Gauss ; $L$ range les multiplicateurs $l_{ik} = a_{ik}/a_{kk}$ sous une diagonale de 1.

> [!piege] Mettre dans $L$ le **signe opposé** du multiplicateur. Si l'opération est $L_i \leftarrow L_i - m L_k$, alors $l_{ik} = +m$.

À la fin, tu sais factoriser $A = LU$, résoudre $Ly = b$ puis $Ux = y$, en déduire $\det A$ et $A^{-1}$, et factoriser une matrice SPD en $A = LL^T$.

## Idée 1 · A = LU

```grille L (multiplicateurs) × U (résultat de Gauss) pour l'exemple du cours
#cols: L1 L2 L3 | U1 U2 U3
1 ~0 ~0 | *1 *4 *2
*-1 1 ~0 | ~0 *6 *4
*-4 *7/6 1 | ~0 ~0 *16/3
```

```etapes Construire L et U
Départ :: $L = I_n$, $U = A$.
Colonne k :: Pour $i > k$ : $l_{ik} = u_{ik}/u_{kk}$, puis $L_i(U) \leftarrow L_i(U) - l_{ik}L_k(U)$.
Fin :: $U$ triangulaire supérieure, $L$ triangulaire inférieure à diagonale unité.
Bonus :: $\det A = \prod u_{ii}$.
```

```python
from fractions import Fraction as F

def lu(A):
    n = len(A)
    U = [[F(v) for v in r] for r in A]
    L = [[F(int(i == j)) for j in range(n)] for i in range(n)]
    for k in range(n - 1):
        for i in range(k + 1, n):
            L[i][k] = U[i][k] / U[k][k]
            U[i] = [U[i][j] - L[i][k] * U[k][j] for j in range(n)]
    return L, U

def montrer(M):
    for r in M:
        print("  ", [str(v) for v in r])

L, U = lu([[1, 4, 2], [-1, 2, 2], [-4, -9, 2]])
print("L ="); montrer(L)
print("U ="); montrer(U)
print("det =", U[0][0] * U[1][1] * U[2][2])
```

```sortie
L =
   ['1', '0', '0']
   ['-1', '1', '0']
   ['-4', '7/6', '1']
U =
   ['1', '4', '2']
   ['0', '6', '4']
   ['0', '0', '16/3']
det = 32
```

> [!attention] La diapo donne $u_{33} = 26/3$. Le bon calcul est $u_{33} = 10 - \frac76 \times 4 = \frac{16}{3}$. Contrôle : $\det A = 1 \times 6 \times \frac{16}{3} = 32$, ce que confirme le calcul direct du déterminant.

## Idée 2 · Résoudre avec LU

```flux Ax = b avec A = LU
Ly = b (descente) -> Ux = y (remontée) -> x
```

L'intérêt : on factorise **une seule fois**, puis on résout pour autant de seconds membres qu'on veut. C'est ainsi qu'on calcule $A^{-1}$ : on résout $Ax = e_i$ pour chaque colonne de l'identité (série 3, ex. 4).

```python
def descente(L, b):
    y = []
    for i in range(len(b)):
        y.append(F(b[i]) - sum(L[i][j] * y[j] for j in range(i)))
    return y

def remontee(U, y):
    n = len(y)
    x = [F(0)] * n
    for i in range(n - 1, -1, -1):
        x[i] = (y[i] - sum(U[i][j] * x[j] for j in range(i + 1, n))) / U[i][i]
    return x

L, U = lu([[2, 1, -1], [1, 3, 2], [1, -1, 2]])     # série 3, ex. 2
print("det =", U[0][0] * U[1][1] * U[2][2])
x = remontee(U, descente(L, [1, 0, 1]))
print("x =", [str(v) for v in x])
inv = [remontee(U, descente(L, e)) for e in ([1, 0, 0], [0, 1, 0], [0, 0, 1])]
print("20 * A^-1 =")
for i in range(3):
    print("  ", [str(20 * inv[j][i]) for j in range(3)])
```

```sortie
det = 20
x = ['13/20', '-1/4', '1/20']
20 * A^-1 =
   ['8', '-1', '5']
   ['0', '5', '-5']
   ['-4', '3', '5']
```

## Idée 3 · Cholesky : A = L Lᵀ pour les matrices SPD

Si $A$ est **symétrique définie positive** ($A^T = A$ et $x^TAx > 0$ pour $x \neq 0$), il existe $L$ triangulaire inférieure avec $A = LL^T$. Moitié moins d'opérations que Gauss, et plus stable.

$$l_{jj} = \sqrt{a_{jj} - \sum_{k<j} l_{jk}^2}, \qquad l_{ij} = \frac{a_{ij} - \sum_{k<j} l_{ik}l_{jk}}{l_{jj}}\ (i > j)$$

```python
import math

def cholesky(A):
    n = len(A)
    L = [[0.0] * n for _ in range(n)]
    for j in range(n):
        L[j][j] = math.sqrt(A[j][j] - sum(L[j][k]**2 for k in range(j)))
        for i in range(j + 1, n):
            L[i][j] = (A[i][j] - sum(L[i][k] * L[j][k] for k in range(j))) / L[j][j]
    return L

for A in ([[4, 2, -2], [2, 2, 0], [-2, 0, 5]], [[4, 2, 2], [2, 5, 1], [2, 1, 3]]):
    for r in cholesky(A):
        print([round(v, 4) for v in r])
    print("---")
```

```sortie
[2.0, 0.0, 0.0]
[1.0, 1.0, 0.0]
[-1.0, 1.0, 1.7321]
---
[2.0, 0.0, 0.0]
[1.0, 2.0, 0.0]
[1.0, 0.0, 1.4142]
---
```

Premier exemple (cours) : $l_{33} = \sqrt3$. Second (série 3, ex. 5) : $l_{33} = \sqrt2$.

> [!retenir] Pour montrer qu'une matrice symétrique est définie positive à l'examen, le plus rapide est le **critère des mineurs principaux** : tous les déterminants $\Delta_1, \Delta_2, \ldots, \Delta_n$ sont $> 0$. (Ou bien : Cholesky aboutit avec des racines de nombres strictement positifs.)

## S'exercer

```exercice Série 3 et annales
? Série 3, ex. 3 : $A_\varepsilon = \begin{pmatrix}1 & 1\\ 1 & \varepsilon\end{pmatrix}$. Donne $L$, $U$, et la condition d'inversibilité.
= $l_{21} = 1$, $U = \begin{pmatrix}1 & 1\\ 0 & \varepsilon - 1\end{pmatrix}$. $\det A_\varepsilon = \varepsilon - 1$ : inversible si $\varepsilon \neq 1$. Pour $b = (2, 1)$ : $y = (2, -1)$, $x_2 = -1/(\varepsilon - 1)$, $x_1 = 2 + 1/(\varepsilon - 1)$.

? Exam 2023/24 : $A = \begin{pmatrix}4 & 2 & 0\\ 2 & 5 & 2\\ 0 & 2 & 5\end{pmatrix}$. Calcule $\det A$ par LU.
reponse: 64
= $l_{21} = 1/2$, $u_{22} = 4$ ; $l_{32} = 1/2$, $u_{33} = 4$. $U$ a pour diagonale $4, 4, 4$ : $\det A = 64$.

? Série 3, ex. 6 : avec $A$ ($4\times4$, diagonale $2, 3, 3, 2$) et $b = (1, 0, 0, 1)$, que vaut $x_1$ ?
reponse: 0.5
= La première ligne est $2x_1 = 1$. Cholesky donne ensuite $x = (1/2,\ 1/13,\ -3/13,\ 8/13)$.
```

## Flashcards

```cartes
Forme de L dans A = LU :: Triangulaire inférieure, diagonale de 1, $l_{ik} = $ multiplicateur de Gauss.
Résoudre Ax = b avec LU :: $Ly = b$ (descente), puis $Ux = y$ (remontée).
det A avec LU :: Produit des $u_{ii}$.
Intérêt de LU :: Une seule factorisation pour plusieurs seconds membres (ex. calcul de $A^{-1}$).
Condition de Cholesky :: $A$ symétrique définie positive.
Formule de $l_{jj}$ (Cholesky) :: $\sqrt{a_{jj} - \sum_{k<j}l_{jk}^2}$.
Test rapide SPD :: Symétrique et tous les mineurs principaux $> 0$.
```

## QCM du chapitre

```qcm
? Dans $A = LU$ (Doolittle, cours), $L$ est :
+ triangulaire inférieure à diagonale unité
- triangulaire supérieure
- diagonale
= Les multiplicateurs sont rangés sous la diagonale.

? Pour $A = \begin{pmatrix}1 & 4 & 2\\ -1 & 2 & 2\\ -4 & -9 & 2\end{pmatrix}$, $l_{31}$ vaut :
- 4
+ $-4$
- $-1/4$
= $a_{31}/a_{11} = -4$.

? Pour la même matrice, $u_{33}$ vaut :
- $26/3$
+ $16/3$
- $7/6$
= $10 - \frac76\times4 = 16/3$ (la diapo contient une coquille).

? $\det A$ se lit dans LU comme :
+ le produit des $u_{ii}$
- le produit des $l_{ii}$
- la somme des $u_{ii}$
= $\det L = 1$.

? Avec $A = LU$, on résout d'abord :
+ $Ly = b$
- $Ux = b$
- $Lx = y$
= Descente puis remontée.

? LU est surtout intéressante quand :
- $A$ est diagonale
+ on a plusieurs seconds membres avec la même $A$
- $A$ n'est pas inversible
= La factorisation est réutilisée.

? Cholesky exige que $A$ soit :
- triangulaire
+ symétrique définie positive
- de déterminant négatif
= Sinon on prend la racine d'un nombre négatif.

? Dans Cholesky de $\begin{pmatrix}4 & 2 & -2\\ 2 & 2 & 0\\ -2 & 0 & 5\end{pmatrix}$, $l_{11}$ vaut :
+ 2
- 4
- 1
= $\sqrt{4}$.

? Avec $L$ de Cholesky, on a :
- $A = L^2$
+ $A = LL^T$
- $A = L^TL^{-1}$
= Définition.

? Un critère pour une matrice symétrique définie positive :
- tous les coefficients positifs
+ tous les mineurs principaux strictement positifs
- déterminant non nul
= Critère de Sylvester.
```

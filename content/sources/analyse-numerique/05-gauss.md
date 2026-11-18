---
id: systemes-gauss
titre: Systèmes linéaires (1) · Cramer, triangulaires, Gauss, Gauss-Jordan
seance: Chapitre 3 (1/2) · Méthodes directes
importance: 5
---

## Avant de commencer

Il te faut savoir calculer un déterminant $2\times2$ et $3\times3$, et écrire un système sous la forme $Ax = b$.

```exercice Vérifie ton prérequis
? Calcule $\det\begin{pmatrix}1 & 2\\ 3 & -1\end{pmatrix}$.
reponse: -7
= $1\times(-1) - 2\times3 = -7$.
```

## Comment aborder ce chapitre

> [!astuce] **Une méthode directe donne la solution exacte en un nombre fini d'opérations** (aux arrondis près). Toutes reviennent au même geste : rendre la matrice triangulaire, puis remonter.

> [!piege] Oublier de faire subir au **second membre** $b$ les mêmes opérations que les lignes de $A$. Travaille toujours sur la matrice augmentée $[A\,|\,b]$.

À la fin, tu sais résoudre un système par Cramer, par substitution, par Gauss (avec permutation si un pivot est nul) et par Gauss-Jordan.

## Idée 1 · Cramer : la formule, pas la méthode

Si $\det A \neq 0$ : $x_i = \dfrac{\det A_i}{\det A}$, où $A_i$ est $A$ dont la colonne $i$ est remplacée par $b$.

```python
import numpy as np
A = np.array([[1, 2], [3, -1]])
b = np.array([5, 4])
d = round(np.linalg.det(A))
for i in range(2):
    Ai = A.copy()
    Ai[:, i] = b
    print(f"x{i+1} = {round(np.linalg.det(Ai))}/{d} = {np.linalg.det(Ai)/d:.4f}")
```

```sortie
x1 = -13/-7 = 1.8571
x2 = -11/-7 = 1.5714
```

> [!prof] Cramer est utile pour la théorie, mais **trop coûteux** : à réserver aux petits systèmes ($n \le 4$).

## Idée 2 · Systèmes triangulaires : remonter

```grille Système triangulaire supérieur du cours
#cols: x1 x2 x3 b
*2 3 1 5
~0 *4 2 6
~0 ~0 *3 9
```

Substitution arrière : $x_n = b_n/a_{nn}$, puis $x_i = \dfrac{1}{a_{ii}}\Big(b_i - \sum_{j>i} a_{ij}x_j\Big)$. Ici $x_3 = 3$, $x_2 = 0$, $x_1 = 1$. Coût : environ $n^2$ opérations.

```python
def remonter(U, b):
    n = len(b)
    x = [0] * n
    for i in range(n - 1, -1, -1):
        s = sum(U[i][j] * x[j] for j in range(i + 1, n))
        x[i] = (b[i] - s) / U[i][i]
    return x

print(remonter([[2, 3, 1], [0, 4, 2], [0, 0, 3]], [5, 6, 9]))
```

```sortie
[1.0, 0.0, 3.0]
```

## Idée 3 · Gauss : trianguler puis remonter

```etapes Méthode de Gauss
Matrice augmentée :: On écrit $[A\,|\,b]$.
Pivot :: À l'étape $k$, le pivot est $a_{kk}$. S'il est nul, on **permute** avec une ligne en dessous où $a_{lk} \neq 0$.
Élimination :: Pour chaque ligne $i > k$ : $L_i \leftarrow L_i - \dfrac{a_{ik}}{a_{kk}} L_k$.
Répéter :: $n - 1$ étapes donnent une matrice triangulaire supérieure.
Remonter :: Substitution arrière.
```

Exemple du cours : $x_2 + 3x_3 = 1$, $5x_1 + 2x_2 + 3x_3 = 4$, $6x_1 + 8x_2 + x_3 = 6$. Le premier pivot est nul : on échange $L_1$ et $L_2$.

```python
from fractions import Fraction as F

def gauss(A, b):
    n = len(b)
    M = [[F(v) for v in A[i]] + [F(b[i])] for i in range(n)]
    for k in range(n - 1):
        if M[k][k] == 0:
            l = next(i for i in range(k + 1, n) if M[i][k] != 0)
            M[k], M[l] = M[l], M[k]
            print(f"permutation L{k+1} <-> L{l+1}")
        for i in range(k + 1, n):
            m = M[i][k] / M[k][k]
            M[i] = [M[i][j] - m * M[k][j] for j in range(n + 1)]
            print(f"L{i+1} <- L{i+1} - ({m}) L{k+1}")
    for ligne in M:
        print([str(v) for v in ligne])
    x = [F(0)] * n
    for i in range(n - 1, -1, -1):
        x[i] = (M[i][n] - sum(M[i][j] * x[j] for j in range(i + 1, n))) / M[i][i]
    return [str(v) for v in x]

print(gauss([[0, 1, 3], [5, 2, 3], [6, 8, 1]], [1, 4, 6]))
```

```sortie
permutation L1 <-> L2
L2 <- L2 - (0) L1
L3 <- L3 - (6/5) L1
L3 <- L3 - (28/5) L2
['5', '2', '3', '4']
['0', '1', '3', '1']
['0', '0', '-97/5', '-22/5']
['52/97', '31/97', '22/97']
```

> [!attention] La diapo trouve $x_1 = 67/97$. C'est une erreur de calcul dans la remontée : $5x_1 = 4 - \frac{62}{97} - \frac{66}{97} = \frac{260}{97}$, donc $x_1 = \frac{52}{97} \approx 0.536$. On vérifie : $5\cdot\frac{52}{97} + 2\cdot\frac{31}{97} + 3\cdot\frac{22}{97} = \frac{388}{97} = 4$. Les valeurs $x_2 = 31/97$ et $x_3 = 22/97$ sont justes.

## Idée 4 · Gauss-Jordan : jusqu'à l'identité

On continue l'élimination **au-dessus** des pivots et on **normalise** chaque pivot à 1 : $[A\,|\,b] \to [I_n\,|\,x]$. Pas de remontée, mais plus d'opérations que Gauss.

```python
from fractions import Fraction as F
M = [[F(v) for v in r] for r in [[1, 3, 3, 0], [2, 2, 0, 2], [3, 2, 6, 11]]]
n = 3
for k in range(n):
    p = M[k][k]
    M[k] = [v / p for v in M[k]]
    for i in range(n):
        if i != k:
            m = M[i][k]
            M[i] = [M[i][j] - m * M[k][j] for j in range(n + 1)]
for r in M:
    print([str(v) for v in r])
```

```sortie
['1', '0', '0', '3']
['0', '1', '0', '-2']
['0', '0', '1', '1']
```

Solution : $x = (3, -2, 1)$, comme dans le cours.

> [!retenir] Gauss-Jordan sert aussi à calculer $A^{-1}$ : on réduit $[A\,|\,I_n]$ en $[I_n\,|\,A^{-1}]$.

## S'exercer

```exercice Série 3, ex. 1
? Résous par Gauss : $3x_1 - x_2 + 2x_3 = 4$, $x_1 + 2x_2 - x_3 = 1$, $2x_1 + x_2 + x_3 = 5$. Donne $x_3$.
reponse: 3
indice: $L_2 \leftarrow L_2 - \frac13 L_1$, $L_3 \leftarrow L_3 - \frac23 L_1$.
= Après élimination : $\frac73 x_2 - \frac53 x_3 = -\frac13$ et $\frac53x_2 - \frac13x_3 = \frac73$. Puis $L_3 \leftarrow L_3 - \frac57L_2$ : $\frac{6}{7}x_3 = \frac{18}{7}$, donc $x_3 = 3$, $x_2 = 2$, $x_1 = 0$.

? Pourquoi permute-t-on des lignes dans Gauss ?
= Quand le pivot $a_{kk}$ est nul (division impossible). Si aucune ligne en dessous n'a un coefficient non nul dans la colonne, la matrice est singulière.
```

## Flashcards

```cartes
Méthode directe :: Donne la solution exacte en un nombre fini d'opérations (aux arrondis près).
Formule de Cramer :: $x_i = \det A_i / \det A$, $A_i$ = $A$ avec la colonne $i$ remplacée par $b$.
Limite de Cramer :: Trop coûteuse, seulement pour $n \le 4$.
Substitution arrière :: $x_n = b_n/a_{nn}$, puis $x_i = (b_i - \sum_{j>i}a_{ij}x_j)/a_{ii}$.
Opération d'élimination de Gauss :: $L_i \leftarrow L_i - (a_{ik}/a_{kk})L_k$ pour $i > k$.
Pivot nul :: On permute avec une ligne inférieure où le coefficient est non nul.
Gauss-Jordan :: $[A\,|\,b] \to [I\,|\,x]$ : élimination au-dessus et en dessous, pivots normalisés.
```

## QCM du chapitre

```qcm
? Cramer s'applique si :
- $A$ est symétrique
+ $\det A \neq 0$
- $b = 0$
= Sinon on divise par zéro.

? Avec $x_1 + 2x_2 = 5$, $3x_1 - x_2 = 4$, $\det A_1$ vaut :
+ $-13$
- $-11$
- $-7$
= $5\times(-1) - 2\times4$.

? Le coût de la remontée triangulaire est de l'ordre de :
- $n$
+ $n^2$
- $n!$
= Environ $n^2/2$ multiplications.

? Dans Gauss, si $a_{11} = 0$ :
- le système n'a pas de solution
+ on permute $L_1$ avec une ligne où $a_{l1} \neq 0$
- on divise par $a_{21}$
= Permutation de lignes.

? L'opération $L_3 \leftarrow L_3 - \frac65 L_1$ annule le coefficient :
+ $a_{31}$
- $a_{33}$
- $a_{13}$
= Avec $a_{31} = 6$ et le pivot $5$.

? Après Gauss, la matrice est :
- diagonale
+ triangulaire supérieure
- l'identité
= On remonte ensuite.

? Gauss-Jordan aboutit à :
- une matrice triangulaire
+ la matrice identité
- une matrice symétrique
= $[I\,|\,x]$.

? Par rapport à Gauss, Gauss-Jordan est :
- moins coûteux
+ plus coûteux
- identique
= Il élimine aussi au-dessus des pivots.

? Solution du système triangulaire $2x_1 + 3x_2 + x_3 = 5$, $4x_2 + 2x_3 = 6$, $3x_3 = 9$ :
+ $(1, 0, 3)$
- $(3, 0, 1)$
- $(1, 1, 1)$
= $x_3 = 3$, $x_2 = 0$, $x_1 = 1$.

? On applique les opérations de lignes :
- seulement à $A$
+ à $A$ et à $b$ (matrice augmentée)
- seulement à $b$
= Sinon le système n'est plus équivalent.
```

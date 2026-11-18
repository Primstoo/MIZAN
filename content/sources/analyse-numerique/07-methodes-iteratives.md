---
id: methodes-iteratives
titre: Systèmes linéaires (3) · Jacobi, Gauss-Seidel, relaxation
seance: Chapitre 4 · Méthodes itératives
importance: 5
---

## Avant de commencer

Il te faut le **rayon spectral** : $\rho(B) = \max |\lambda_i|$, la plus grande valeur propre en module. Et savoir calculer les valeurs propres d'une petite matrice.

```exercice Vérifie ton prérequis
? Rayon spectral de $B = \begin{pmatrix}0 & 1/2\\ 1/2 & 0\end{pmatrix}$ ?
reponse: 0.5
= $\det(B - \lambda I) = \lambda^2 - 1/4$, donc $\lambda = \pm 1/2$ et $\rho(B) = 1/2$.
```

## Comment aborder ce chapitre

> [!astuce] **On ne résout plus, on corrige.** On part d'un vecteur $x^{(0)}$ quelconque et on l'améliore : $x^{(k+1)} = Bx^{(k)} + c$. Tout le chapitre tient dans une question : la matrice d'itération $B$ a-t-elle $\rho(B) < 1$ ?

> [!piege] Croire que si Jacobi converge, Gauss-Seidel converge aussi (ou l'inverse). C'est faux en général : la série 4 (ex. 4) montre les deux situations contraires. Seule une hypothèse comme la **diagonale strictement dominante** garantit les deux.

À la fin, tu sais écrire les formules de Jacobi, Gauss-Seidel et relaxation, calculer des itérés à la main, et justifier la convergence.

## Idée 1 · Le principe : A = M − N

On écrit $A = M - N$ avec $M$ facile à inverser. Alors $Ax = b$ devient $Mx^{(k+1)} = Nx^{(k)} + b$, soit

$$x^{(k+1)} = Bx^{(k)} + c, \qquad B = M^{-1}N,\ c = M^{-1}b.$$

> [!retenir] **Proposition 1** : la méthode converge pour tout $x^{(0)}$ **si et seulement si** $\rho(B) < 1$. Plus $\rho(B)$ est petit, plus elle est rapide.

On note $A = D - E - F$ : $D$ la diagonale, $-E$ la partie strictement inférieure, $-F$ la partie strictement supérieure.

```grille Découpage A = D − E − F (exemple 3×3)
#cols: c1 c2 c3
*D !−F !−F
~−E *D !−F
~−E ~−E *D
```

## Idée 2 · Jacobi

$M = D$, $N = E + F$. Chaque composante n'utilise que **l'ancien** vecteur :

$$x_i^{(k+1)} = \frac{1}{a_{ii}}\Big(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\Big)$$

Il faut $a_{ii} \neq 0$ (sinon on permute des lignes). On stocke **deux** vecteurs.

## Idée 3 · Gauss-Seidel

$M = D - E$, $N = F$. On utilise **tout de suite** les composantes déjà mises à jour :

$$x_i^{(k+1)} = \frac{1}{a_{ii}}\Big(b_i - \sum_{j<i} a_{ij}x_j^{(k+1)} - \sum_{j>i} a_{ij}x_j^{(k)}\Big)$$

Un seul vecteur suffit en mémoire.

```python
import numpy as np

def jacobi(A, b, x, n):
    A, b, x = np.array(A, float), np.array(b, float), np.array(x, float)
    for k in range(1, n + 1):
        x = np.array([(b[i] - sum(A[i, j] * x[j] for j in range(len(b)) if j != i)) / A[i, i]
                      for i in range(len(b))])
        print(k, np.round(x, 4))
    return x

def seidel(A, b, x, n, w=1.0):
    A, b, x = np.array(A, float), np.array(b, float), np.array(x, float)
    for k in range(1, n + 1):
        for i in range(len(b)):
            gs = (b[i] - A[i] @ x + A[i, i] * x[i]) / A[i, i]
            x[i] = (1 - w) * x[i] + w * gs
        print(k, np.round(x, 4))
    return x

A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]     # série 4, ex. 2
b = [6, 4, 6]
print("Jacobi"); jacobi(A, b, [0, 0, 0], 4)
print("Gauss-Seidel"); seidel(A, b, [0, 0, 0], 4)
```

```sortie
Jacobi
1 [1.5 1.  1.5]
2 [1.75 1.75 1.75]
3 [1.9375 1.875  1.9375]
4 [1.9688 1.9688 1.9688]
Gauss-Seidel
1 [1.5    1.375  1.8438]
2 [1.8438 1.9219 1.9805]
3 [1.9805 1.9902 1.9976]
4 [1.9976 1.9988 1.9997]
```

La solution exacte (par Gauss) est $(2, 2, 2)$. Gauss-Seidel y arrive environ deux fois plus vite.

> [!retenir] **Théorème 3** : si $A$ est à **diagonale strictement dominante** ($|a_{ii}| > \sum_{j\neq i}|a_{ij}|$ pour chaque ligne), Jacobi et Gauss-Seidel convergent. Ici : $4 > 1$, $4 > 2$, $4 > 1$.

## Idée 4 · Le rayon spectral décide

```python
import numpy as np
def rho(B):
    return max(abs(np.linalg.eigvals(B)))
def BJ(A):
    D = np.diag(np.diag(A)); return np.linalg.solve(D, D - A)
def BGS(A):
    M = np.tril(A); return np.linalg.solve(M, M - A)

for nom, A in [("ex. 2", [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]),
               ("ex. 1", [[1, -2], [3, 1]]),
               ("ex. 1 permuté", [[3, 1], [1, -2]]),
               ("A", [[1, 2, -2], [1, 1, 1], [2, 2, 1]]),
               ("B", [[2, -1, 1], [2, 2, 2], [-1, -1, 2]])]:
    A = np.array(A, float)
    print(f"{nom:14s} rho(J) = {rho(BJ(A)):.4f}   rho(GS) = {rho(BGS(A)):.4f}")
```

```sortie
ex. 2          rho(J) = 0.3536   rho(GS) = 0.1250
ex. 1          rho(J) = 2.4495   rho(GS) = 6.0000
ex. 1 permuté  rho(J) = 0.4082   rho(GS) = 0.1667
A              rho(J) = 0.0000   rho(GS) = 2.0000
B              rho(J) = 1.1180   rho(GS) = 0.5000
```

- Série 4, ex. 1 : $x_1 - 2x_2 = -1$, $3x_1 + x_2 = 4$. Les deux méthodes divergent, Gauss-Seidel plus vite ($\rho = 6$). En **permutant les équations**, la matrice devient à diagonale dominante : les deux convergent.
- Matrice A : Jacobi converge ($\rho = 0$), Gauss-Seidel diverge ($\rho = 2$). Matrice B : l'inverse.
- Pour une matrice tridiagonale (ex. 2) : $\rho(B_{GS}) = \rho(B_J)^2$ (ici $0.125 = 0.3536^2$).

> [!attention] Dans l'énoncé de la série 4, ex. 4, les matrices imprimées ($A$ de lignes $(1,1,4)$, $(1,2,-2)$, $(2,2,1)$ et $B$ avec deux lignes égales, donc non inversible) ne vérifient pas les inégalités demandées : le calcul donne $\rho(A_J) \approx 2.69$. Nous utilisons ci-dessus les matrices classiques de cet exercice, $A = \begin{pmatrix}1&2&-2\\1&1&1\\2&2&1\end{pmatrix}$ et $B = \begin{pmatrix}2&-1&1\\2&2&2\\-1&-1&2\end{pmatrix}$, qui donnent bien $\rho(A_J) < 1 < \rho(A_{GS})$ et $\rho(B_J) > 1 > \rho(B_{GS})$. Vérifie avec ton prof l'énoncé exact.

> [!prof] Note manuscrite du prof (conclusion ex. 4) : pour une matrice quelconque, une méthode peut converger et l'autre diverger. **La convergence est liée à la structure de la matrice.**

## Idée 5 · Relaxation (SOR)

On fait le pas de Gauss-Seidel $\tilde x_i$, puis on le **pondère** avec l'ancienne valeur :

$$x_i^{(k+1)} = (1 - \omega)\,x_i^{(k)} + \omega\,\tilde x_i^{(k+1)}$$

```grille Rôle de ω
#cols: ω Nom
0 < ω < 1 sous-relaxation (interpolation)
*ω = 1 Gauss-Seidel
1 < ω < 2 sur-relaxation (extrapolation)
```

- $A$ symétrique définie positive ⇒ convergence pour $\omega \in ]0, 2[$ (proposition 4).
- $A$ tridiagonale (proposition 6) : $\omega_{opt} = \dfrac{2}{1 + \sqrt{1 - \rho(J)^2}}$ et $\rho(L_{\omega_{opt}}) = \omega_{opt} - 1$.

```python
import math
A = [[4, -1, 0], [-1, 4, -1], [0, -1, 4]]
rJ = 0.3535533905932738
w = 2 / (1 + math.sqrt(1 - rJ**2))
print("omega_opt =", round(w, 4), " rho =", round(w - 1, 4))
for om in (0.5, 1.0, round(w, 4)):
    print("omega =", om)
    seidel(A, [6, 4, 6], [0, 0, 0], 3, om)
```

```sortie
omega_opt = 1.0334  rho = 0.0334
omega = 0.5
1 [0.75   0.5938 0.8242]
2 [1.1992 1.0498 1.2933]
3 [1.4808 1.3717 1.5681]
omega = 1.0
1 [1.5    1.375  1.8438]
2 [1.8438 1.9219 1.9805]
3 [1.9805 1.9902 1.9976]
omega = 1.0334
1 [1.5501 1.4339 1.9205]
2 [1.8688 1.9645 1.9935]
3 [1.9952 1.9983 1.9998]
```

## S'exercer

```exercice Série 4 et annales
? Exam 2023/24 : écris explicitement Gauss-Seidel pour un système $3\times3$.
= $x_1^{(k+1)} = (b_1 - a_{12}x_2^{(k)} - a_{13}x_3^{(k)})/a_{11}$ ; $x_2^{(k+1)} = (b_2 - a_{21}x_1^{(k+1)} - a_{23}x_3^{(k)})/a_{22}$ ; $x_3^{(k+1)} = (b_3 - a_{31}x_1^{(k+1)} - a_{32}x_2^{(k+1)})/a_{33}$.

? Série 4, ex. 2 : premier itéré de Jacobi avec $x^{(0)} = 0$. Donne $x_2^{(1)}$.
reponse: 1
= $x^{(1)} = (6/4, 4/4, 6/4) = (1.5, 1, 1.5)$.

? Série 4, ex. 3 : pourquoi faut-il réordonner $x - 2y - 6z = 14$, $x + 6y = 4$, $9x + 4y + z = -17$ ?
= Dans cet ordre la matrice n'est pas à diagonale dominante (et les itérés divergent). En mettant la 3e équation en premier ($9x$), la 2e au milieu ($6y$) et la 1re en dernier ($-6z$), on obtient $|9| > 5$, $|6| > 1$, $|-6| > 3$ : convergence garantie.

? Exam 2022/23 : $A_\beta = \begin{pmatrix}1&\beta&\beta\\ \beta&1&\beta\\ \beta&\beta&1\end{pmatrix}$. Pour quels $\beta$ est-elle définie positive ?
= Mineurs : $1 > 0$, $1 - \beta^2 > 0$, $\det = (1-\beta)^2(1+2\beta) > 0$. Donc $-\frac12 < \beta < 1$. Alors Gauss-Seidel converge (SPD). Jacobi : valeurs propres de $J$ : $-2\beta$ et $\beta$ (double), donc converge ssi $|\beta| < 1/2$.
```

## Flashcards

```cartes
Condition nécessaire et suffisante de convergence :: $\rho(B) < 1$, $B$ = matrice d'itération.
Matrice d'itération de Jacobi :: $J = D^{-1}(E + F)$.
Matrice d'itération de Gauss-Seidel :: $(D - E)^{-1}F$.
Différence Jacobi / Gauss-Seidel :: GS utilise immédiatement les composantes déjà calculées (un seul vecteur en mémoire).
Diagonale strictement dominante :: $|a_{ii}| > \sum_{j\neq i}|a_{ij}|$ : Jacobi et GS convergent.
Relaxation :: $x_i^{(k+1)} = (1-\omega)x_i^{(k)} + \omega\tilde x_i$ ; $\omega = 1$ : Gauss-Seidel.
Relaxation et SPD :: Converge pour $0 < \omega < 2$.
ω optimal (tridiagonale) :: $\omega_{opt} = 2/(1 + \sqrt{1 - \rho(J)^2})$.
Tridiagonale : lien J / GS :: $\rho(L_1) = \rho(J)^2$.
```

## QCM du chapitre

```qcm
? Une méthode itérative $x^{(k+1)} = Bx^{(k)} + c$ converge pour tout $x^{(0)}$ ssi :
- $\det B \neq 0$
+ $\rho(B) < 1$
- $B$ symétrique
= Proposition 1 du cours.

? Dans Jacobi, on prend $M =$ :
+ $D$
- $D - E$
- $A$
= La diagonale.

? Dans Gauss-Seidel, on prend $M =$ :
- $D$
+ $D - E$
- $F$
= Partie triangulaire inférieure (diagonale comprise).

? Quelle méthode n'a besoin que d'un seul vecteur en mémoire ?
- Jacobi
+ Gauss-Seidel
- Les deux en ont besoin de deux
= Remarque 2 du cours.

? Pour $4x_1 - x_2 = 6$, $-x_1 + 4x_2 - x_3 = 4$, $-x_2 + 4x_3 = 6$, la solution est :
+ $(2, 2, 2)$
- $(1.5, 1, 1.5)$
- $(1, 2, 1)$
= $(1.5, 1, 1.5)$ n'est que le premier itéré de Jacobi.

? Si $A$ est à diagonale strictement dominante :
- seule Jacobi converge
+ Jacobi et Gauss-Seidel convergent
- aucune ne converge
= Théorème 3.

? Relaxation avec $\omega = 1$ :
- Jacobi
+ Gauss-Seidel
- Gauss
= Pas de pondération.

? Pour $A$ SPD, la relaxation converge si :
- $\omega > 2$
+ $0 < \omega < 2$
- $\omega = 1$ seulement
= Proposition 4.

? Pour une matrice tridiagonale avec $\rho(J) = 0.5$, $\rho(GS)$ vaut :
- 0.5
+ 0.25
- 0.707
= $\rho(L_1) = \rho(J)^2$.

? Jacobi peut converger alors que Gauss-Seidel diverge :
+ Vrai
- Faux
- Seulement pour $n = 2$
= Exemple : $A = \begin{pmatrix}1&2&-2\\1&1&1\\2&2&1\end{pmatrix}$, $\rho(J) = 0$, $\rho(GS) = 2$.
```

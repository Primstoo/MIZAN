---
id: revision-examen
titre: Révision et examen blanc
seance: Avant l'examen · d'après les annales 2022/23 et 2023/24
importance: 5
---

## Ce qui tombe à l'examen

Les deux annales disponibles (1 h 30, session normale) ont la même structure :

| Exercice | 2022/23 | 2023/24 |
|---|---|---|
| Systèmes, méthode directe | Gauss puis LU, $\det$, $A^{-1}$ (matrice $4\times4$ à paramètre) | LU d'une tridiagonale, $\det$, $A^{-1}$ |
| Méthodes itératives | Jacobi / Gauss-Seidel sur $A_\beta$, SPD, rayons spectraux | Écrire Jacobi, Gauss-Seidel, relaxation |
| Équation $f(x) = 0$ | Point fixe ($g_1$, $g_2$) puis Newton | Dichotomie, point fixe, $n_0$ pour $10^{-3}$ |
| Autre | — | Interpolation de Lagrange et Newton |

> [!prof] Le prof demande souvent : **justifier** (existence, unicité, contraction, SPD), **calculer quelques itérés**, puis **conclure** en comparant les méthodes.

## Fiche méthode

```flux Résoudre f(x) = 0
TVI + monotonie -> intervalle [a,b] -> dichotomie (sûr) ou point fixe (vérifier g(I) ⊂ I et |g'| ≤ k < 1) ou Newton (bon x0, f' ≠ 0)
```

```flux Résoudre Ax = b
A SPD ? -> Cholesky | sinon -> Gauss / LU (pivot nul : permuter) | grand système -> Jacobi / GS si rho(B) < 1
```

```cartes
Les 4 ordres de convergence :: Dichotomie 1, point fixe 1 (en général), sécante ≈ 1.618, Newton 2.
Itérations de dichotomie :: $n \ge \ln((b-a)/\varepsilon)/\ln 2$.
Nombre d'itérations du point fixe :: $k^n|x_0 - \alpha| \le \varepsilon$ ⇒ $n \ge \ln(\varepsilon/|b-a|)/\ln k$.
LU en une phrase :: $U$ = résultat de Gauss, $L$ = multiplicateurs sous une diagonale de 1.
Convergence d'une méthode itérative :: $\rho(B) < 1$ ; suffisant : diagonale strictement dominante.
Erreurs typiques des diapos :: $x_1 = 52/97$ (Gauss), $u_{33} = 16/3$ (LU), $(1AC.2B)_{16} = 428.16796875$.
```

## Examen blanc (1 h 30)

Inspiré des annales 2022/23 et 2023/24. Fais-le sur papier, chronomètre en main, puis ouvre les corrigés.

```exercice Exercice 1 · Méthode directe (5 pts)
? $A = \begin{pmatrix}4&2&0\\2&5&2\\0&2&5\end{pmatrix}$. (a) Montre que $A$ admet une factorisation LU et calcule-la. (b) Déduis $\det A$.
reponse: 64
indice: Les mineurs principaux $4$, $16$, $64$ sont non nuls.
= (a) Mineurs principaux $\Delta_1 = 4$, $\Delta_2 = 16$, $\Delta_3 = 64$ non nuls ⇒ LU existe. $l_{21} = 1/2$ : $L_2 \leftarrow L_2 - \frac12L_1$ donne $(0, 4, 2)$. $l_{32} = 2/4 = 1/2$ : $L_3 \leftarrow L_3 - \frac12 L_2$ donne $(0, 0, 4)$.
$L = \begin{pmatrix}1&0&0\\1/2&1&0\\0&1/2&1\end{pmatrix}$, $U = \begin{pmatrix}4&2&0\\0&4&2\\0&0&4\end{pmatrix}$.
(b) $\det A = 4\times4\times4 = 64$. En résolvant $Ax = e_i$ : $A^{-1} = \frac{1}{64}\begin{pmatrix}21&-10&4\\-10&20&-8\\4&-8&16\end{pmatrix}$.

? (c) $A$ est-elle symétrique définie positive ? Donne $l_{11}$ de Cholesky.
reponse: 2
= Symétrique et mineurs $> 0$ : SPD. $l_{11} = \sqrt4 = 2$, $l_{21} = 1$, $l_{22} = 2$, $l_{32} = 1$, $l_{33} = 2$.
```

```exercice Exercice 2 · Méthodes itératives (5 pts)
? Soit $A_\beta = \begin{pmatrix}1&\beta&\beta\\ \beta&1&\beta\\ \beta&\beta&1\end{pmatrix}$, $\beta \neq 0$. (a) Pour quels $\beta$ est-elle définie positive ? (b) Écris $J(\beta)$ et dis quand Jacobi converge.
= (a) $\Delta_1 = 1$, $\Delta_2 = 1 - \beta^2$, $\Delta_3 = (1-\beta)^2(1 + 2\beta)$. Tous $> 0$ ⇔ $-\frac12 < \beta < 1$. Alors Gauss-Seidel converge (matrice SPD, relaxation avec $\omega = 1$).
(b) $J(\beta) = -\begin{pmatrix}0&\beta&\beta\\ \beta&0&\beta\\ \beta&\beta&0\end{pmatrix}$, valeurs propres $-2\beta$ et $\beta$ (double). $\rho(J) = 2|\beta|$ : Jacobi converge ⇔ $|\beta| < \frac12$. Pour $\beta \in [\frac12, 1[$, Gauss-Seidel converge mais pas Jacobi.
```

```exercice Exercice 3 · Équation non linéaire (6 pts)
? $f(x) = \dfrac{e^x}{x + 10}$. (a) Montre que $f(x) = x$ a une unique solution $\bar x \in [0,1]$. (b) Approche $\bar x$ à $10^{-1}$ par dichotomie.
= (a) $h(x) = f(x) - x$ : $h(0) = 0.1 > 0$, $h(1) = e/11 - 1 < 0$ ; $f'(x) = \frac{e^x(x+9)}{(x+10)^2} \le \frac{10e}{100} \approx 0.27$ sur $[0,1]$, donc $h' = f' - 1 < 0$ : unique.
(b) 4 itérations : $[0, 1] \to [0, 0.5] \to [0, 0.25] \to [0, 0.125] \to [0.0625, 0.125]$. $x^* \approx 0.09$ (vraie valeur $0.1105$).

? (c) Montre que $x_{n+1} = f(x_n)$, $x_0 = 0$, converge. (d) Trouve $n_0$ tel que $|x_{n_0} - \bar x| \le 10^{-3}$.
reponse: 6
= (c) $f$ croissante, $f(0) = 0.1$, $f(1) \approx 0.247$ : $f([0,1]) \subset [0,1]$, et $|f'| \le k = 0.272 < 1$. Contraction ⇒ convergence.
(d) $|x_n - \bar x| \le k^n \cdot 1 \le 10^{-3}$ ⇔ $n \ge \ln(10^{-3})/\ln(0.272) \approx 5.3$ : $n_0 = 6$, $x_6 \approx 0.110459$.

? (e) Exam 2022/23 : pour $e^x - x - 2 = 0$ ($\alpha > 0$), $g_1(x) = e^x - 2$ ou $g_2(x) = \ln(2 + x)$ ? Fais 2 itérations depuis $x_0 = 1$ et 2 itérations de Newton.
= $\alpha \in [1, 2]$ ($f(1) < 0 < f(2)$). $g_1'(x) = e^x > 1$ : diverge ($0.718$, $0.051$, ...). $g_2'(x) = \frac{1}{2+x} \le \frac13$ : converge ($1.0986$, $1.1310$). Newton : $1.16395$, $1.14642$ (racine $1.14619$) : bien plus rapide. Newton est impossible en $x_0 = 0$ ($f'(0) = 0$).
```

```exercice Exercice 4 · Interpolation (4 pts)
? Données $x = 0, 1, 2, 3$ ; $f = 0, 2, 36, 252$. Donne le polynôme de Newton passant par les 4 points.
= Différences divisées : $0$ ; $2$ ; $16$ ; $25$. $P_3(x) = 2x + 16x(x-1) + 25x(x-1)(x-2) = 25x^3 - 59x^2 + 36x$. On réutilise $P_2 = 16x^2 - 14x$ en ajoutant un terme (impossible avec Lagrange sans tout refaire).
```

```python
import math, numpy as np
f = lambda x: math.exp(x) / (x + 10)
x = 0.0
for n in range(1, 7):
    x = f(x)
print("x6 =", round(x, 6))
print("n0 >=", round(math.log(1e-3) / math.log(10 * math.e / 100), 2))
A = np.array([[4, 2, 0], [2, 5, 2], [0, 2, 5]])
print("det =", round(np.linalg.det(A)), " 64*A^-1 =", (64 * np.linalg.inv(A)).round().astype(int).tolist())
```

```sortie
x6 = 0.110459
n0 >= 5.3
det = 64  64*A^-1 = [[21, -10, 4], [-10, 20, -8], [4, -8, 16]]
```

## QCM de révision

```qcm
? Quelle méthode n'a besoin ni de dérivée ni d'intervalle à changement de signe ?
- Dichotomie
- Newton
+ Sécante
= Deux points de départ suffisent.

? Pour une matrice SPD, la méthode directe la plus efficace est :
- Cramer
+ Cholesky
- Gauss-Jordan
= Environ deux fois moins d'opérations que Gauss.

? $\rho(B_J) = 0$ et $\rho(B_{GS}) = 2$ : on conclut que
+ Jacobi converge, Gauss-Seidel diverge
- les deux convergent
- les deux divergent
= La convergence dépend de la structure de la matrice.

? Pour $f(x) = e^x/(x+10)$ sur $[0,1]$, $\sup|f'| \approx$ :
- 1
+ 0.27
- 2.7
= $10e/100$.

? Le premier itéré de Newton pour $e^x - x - 2$ avec $x_0 = 1$ vaut environ :
+ 1.164
- 1.099
- 0.718
= $1 - (e - 3)/(e - 1)$.

? Le déterminant de $\begin{pmatrix}4&2&0\\2&5&2\\0&2&5\end{pmatrix}$ vaut :
- 80
+ 64
- 48
= Diagonale de $U$ : $4, 4, 4$.

? Une valeur propre de $J(\beta)$ pour $A_\beta$ est :
+ $-2\beta$
- $1 + 2\beta$
- $1 - \beta$
= Les autres valent $\beta$.

? $0.1$ en binaire est :
- fini
+ infini et périodique
- égal à $0.1_2$
= $0.000110011\ldots$

? La relaxation avec $\omega = 1.5$ est une :
- sous-relaxation
+ sur-relaxation
- méthode de Jacobi
= $\omega > 1$ : extrapolation.

? Dans le cours, $x_1$ de l'exemple de Gauss vaut réellement :
- $67/97$
+ $52/97$
- $31/97$
= La diapo contient une erreur de remontée.
```

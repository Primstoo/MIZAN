---
id: numpy-matrices
titre: NumPy (2) · comparaisons, ensembles et algèbre linéaire
seance: Séance 3 · 11 octobre 2026
importance: 5
---

```python
import numpy as np
```

## 1. Comparer deux tableaux

Trois façons, à ne pas confondre :

| Outil | Résultat | Question posée |
|---|---|---|
| `a == b`, `a > b`, `np.greater(a, b)`, `np.less_equal(a, b)`… | **tableau de booléens** | case par case, la condition est-elle vraie ? |
| `np.all(a == b)` | **un seul booléen** | toutes les cases sont-elles égales ? |
| `np.array_equal(a, b)` | **un seul booléen** | même **forme** *et* mêmes éléments ? |

```python
a = np.array([101, 99, 87])
b = np.array([897, 97, 111])
print(a > b, np.less(a, b))
print(np.all(np.array([1, 2, 3]) == np.array([1, 2, 4])))
print(np.array_equal([[1, 2], [3, 4]], [[1, 2], [3, 4]]))
```

```sortie
[False  True False] [ True False  True]
False
True
```

> [!piege] `if a == b:` sur des tableaux lève `ValueError: The truth value of an array ... is ambiguous`. Il faut décider : `np.all(...)`, `np.any(...)` ou `np.array_equal(...)`.

## 2. Opérations d'ensemble

| Fonction | Rôle | Résultat |
|---|---|---|
| `np.union1d(a, b)` | éléments présents dans a **ou** b | trié, sans doublon |
| `np.intersect1d(a, b)` | éléments présents dans a **et** b | trié |
| `np.unique(a)` | valeurs distinctes | trié |

Un tableau 2D passé à `union1d` ou `intersect1d` est d'abord **aplati**.

```python
print(np.union1d([1, 2, 3, 4], [3, 4, 5, 6]))
print(np.intersect1d([[1, 2, 3], [0, 5, 6]], [0, 5, 10]))
```

```sortie
[1 2 3 4 5 6]
[0 5]
```

### `np.unique` et ses trois options

```python
arr = np.array(["MIP", "SVI", "MIP", "BCG", "SVI"])
u, idx, inv, cnt = np.unique(arr, return_index=True, return_inverse=True, return_counts=True)
print(u, idx, inv, cnt)
print(u[inv])
```

```sortie
['BCG' 'MIP' 'SVI'] [3 0 1] [1 2 1 0 2] [1 2 2]
['MIP' 'SVI' 'MIP' 'BCG' 'SVI']
```

```grille arr (indices en haut)
#cols: 0 1 2 3 4
MIP SVI MIP BCG SVI
```

```grille Résultats de np.unique(arr, ...)
#cols: BCG MIP SVI
#rows: return_index return_counts
!3 !0 !1
*1 *2 *2
```

- `return_index` : position de la **première** apparition de chaque valeur unique.
- `return_counts` : nombre d'apparitions (une fréquence : très utilisé en analyse de données).
- `return_inverse` : pour chaque case de `arr`, l'indice de sa valeur dans `u`. `u[inv]` reconstruit `arr`.

En 2D, `axis=0` garde les **lignes** distinctes (triées dans l'ordre du dictionnaire : 1re colonne, puis 2e en cas d'égalité), `axis=1` les **colonnes** distinctes. Sans `axis`, tout est aplati.

```python
print(np.unique(np.array([[4, 2], [1, 9], [1, 2]]), axis=0))
print(np.unique(np.array([[1, 1, 3], [4, 4, 6]]), axis=1))
```

```sortie
[[1 2]
 [1 9]
 [4 2]]
[[1 3]
 [4 6]]
```

### `np.trim_zeros` : enlever les zéros des bords

```python
tab = np.array([0, 0, 1, 5, 0, 9, 0, 0])
print(np.trim_zeros(tab), np.trim_zeros(tab, "f"), np.trim_zeros(tab, "b"))
```

```sortie
[1 5 0 9] [1 5 0 9 0 0] [0 0 1 5 0 9]
```

```grille trim="fb" (défaut) : les zéros des deux bords partent, le zéro du milieu reste
~0 ~0 *1 *5 !0 *9 ~0 ~0
```

## 3. Matrices : forme et opérations

Une matrice NumPy est un tableau 2D. `shape[0]` = lignes, `shape[1]` = colonnes, `size` = lignes × colonnes.

### Terme à terme vs produit matriciel

| Écriture | Opération | Condition sur les formes |
|---|---|---|
| `A + B`, `A - B`, `A * B`, `A / B`, `np.sqrt(A)` | **terme à terme** | formes identiques (ou compatibles) |
| `A @ B` ou `np.dot(A, B)` | **produit matriciel** | (m, **n**) @ (**n**, p) → (m, p) |

```python
A = np.array([[1, 2, 3], [4, 5, 6]])          # (2, 3)
B = np.array([[7, 8], [9, 10], [11, 12]])     # (3, 2)
print(A @ B)
```

```sortie
[[ 58  64]
 [139 154]]
```

```etapes Comment on obtient 154 (ligne 1, colonne 1)
On prend la ligne 1 de A :: `[4, 5, 6]`
On prend la colonne 1 de B :: `[8, 10, 12]`
On multiplie case par case :: 4 × 8 = 32 ; 5 × 10 = 50 ; 6 × 12 = 72
On additionne :: 32 + 50 + 72 = **154**. On répète pour chacune des 2 × 2 cases du résultat.
```

> [!piege] Ici `A * B` lève une erreur : (2, 3) et (3, 2) ne sont pas compatibles terme à terme. Le produit **matriciel** s'écrit `@`.

### Somme par axe et transposée

```python
y = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(np.sum(y), np.sum(y, axis=0), np.sum(y, axis=1))
print(y.T)
```

```sortie
45 [12 15 18] [ 6 15 24]
[[1 4 7]
 [2 5 8]
 [3 6 9]]
```

```grille np.sum(y, axis=0) écrase les lignes → une somme par COLONNE
#cols: col0 col1 col2
#rows: · · · axis=0
1 2 3
4 5 6
7 8 9
*12 *15 *18
```

```grille np.sum(y, axis=1) écrase les colonnes → une somme par LIGNE
#cols: · · · axis=1
1 2 3 !6
4 5 6 !15
7 8 9 !24
```

> [!retenir] **`axis=k` est l'axe qui disparaît.** axis=0 : on additionne vers le bas, il reste un résultat par colonne. axis=1 : vers la droite, un résultat par ligne. Même logique pour `mean`, `var`, `max`, `argmax`…

## 4. Le sous-module `numpy.matlib`

Héritage de MATLAB : toutes ses fonctions renvoient un objet **`numpy.matrix`**, toujours 2D.

- `matlib.zeros((2, 3))`, `matlib.ones(...)`, `matlib.empty(...)` : type **float** par défaut (`0.`, `1.`). Un entier N donne une matrice **ligne (1, N)**.
- `matlib.identity(n)` : identité n × n.
- `matlib.eye(n, M, k)` : des 1 sur la diagonale n° k (k > 0 au-dessus, k < 0 en dessous), M colonnes.
- Sur un `matrix`, `*` est le **produit matriciel** (sur un `ndarray`, c'est le terme à terme).

```python nontest
import numpy.matlib
print(np.matlib.zeros(4).shape)        # (1, 4)
print(np.matlib.eye(3, M=4, k=1))
```

```grille np.matlib.eye(3, M=4, k=1) : diagonale décalée d'un cran vers la droite
0 *1 0 0
0 0 *1 0
0 0 0 *1
```

> [!attention] `numpy.matrix` est **déconseillé** dans les versions récentes de NumPy (avertissement à l'import de `matlib`). Le prof le présente pour la culture : en pratique on utilise des `ndarray` avec `np.zeros`, `np.eye`, `@`.

## 5. Produits de vecteurs

| | Produit **scalaire** | Produit **vectoriel** |
|---|---|---|
| NumPy | `np.dot(a, b)` ou `a @ b` | `np.cross(a, b)` |
| Résultat | **un nombre** | **un vecteur 3D** perpendiculaire à a et b |
| Formule | a1b1 + a2b2 + a3b3 = ‖a‖‖b‖cos θ | norme = ‖a‖‖b‖ sin θ (aire du parallélogramme) |
| Usages | travail d'une force, similarité cosinus (NLP) | moment d'une force, normale d'une surface 3D |

```python
a, b = np.array([1, 2, 3]), np.array([4, 5, 6])
print(2 * a, np.dot(a, b), np.cross(a, b))
```

```sortie
[2 4 6] 32 [-3  6 -3]
```

Calcul du produit vectoriel : (2·6 − 3·5, 3·4 − 1·6, 1·5 − 2·4) = (−3, 6, −3).

## 6. Déterminant, variance, inverse, valeurs propres

### Déterminant : `np.linalg.det`

Défini **seulement pour une matrice carrée**.

- 2 × 2 : det [[a, b], [c, d]] = **ad − bc**
- 3 × 3 : a(ei − fh) − b(di − fg) + c(dh − eg)

```python
M = np.array([[4, 7], [2, 6]])
print(round(np.linalg.det(M), 6))
print(round(np.linalg.det(np.array([[55, 25, 15], [30, 44, 2], [11, 45, 77]]))))
```

```sortie
10.0
137180
```

> [!piege] `np.linalg.det` renvoie un **flottant** légèrement approximatif (ici 10.000000000000002). La diapo fait `int(det)` : dangereux, car `int(9.9999999)` donne 9. Utilise `round(...)`.

Ce que dit le déterminant : |det| = facteur d'agrandissement des aires (ou volumes) ; det < 0 = effet miroir ; **det = 0 ⇔ matrice singulière, pas d'inverse**.

### Variance : `np.var`

Moyenne des carrés des écarts à la moyenne : Var = (1/N) Σ (xᵢ − x̄)².

```python
tab = np.array([[4, 1], [12, 3]])
print(np.var(tab), np.var(tab, axis=0), np.var(tab, axis=1))
print(np.var(tab, ddof=1))
```

```sortie
17.5 [16.  1.] [ 2.25 20.25]
23.333333333333332
```

```etapes Calcul de la variance globale de [[4, 1], [12, 3]]
Moyenne :: (4 + 1 + 12 + 3) / 4 = **5**
Écarts au carré :: (4−5)² = 1 ; (1−5)² = 16 ; (12−5)² = 49 ; (3−5)² = 4
Moyenne des carrés :: (1 + 16 + 49 + 4) / 4 = 70 / 4 = **17.5**
Avec ddof=1 :: on divise par N − 1 = 3 : 70 / 3 ≈ 23.33 (variance d'échantillon)
```

> [!retenir] `ddof=0` (défaut) : division par **N** (population). `ddof=1` : division par **N − 1** (estimation sur un échantillon). L'écart-type est la racine de la variance (`np.std`).

### Inverse : `np.linalg.inv`

A⁻¹ vérifie A · A⁻¹ = A⁻¹ · A = I. Deux conditions : **carrée** et **det ≠ 0**. Sinon, `LinAlgError`.

```python
A = np.array([[2, 1], [1, 1]], dtype=float)
A_inv = np.linalg.inv(A)
print(A_inv)
print(np.allclose(A @ A_inv, np.eye(2)))
try:
    np.linalg.inv(np.array([[2, 4], [1, 2]]))
except np.linalg.LinAlgError:
    print("Matrice singuliere : pas d'inverse")
```

```sortie
[[ 1. -1.]
 [-1.  2.]]
True
Matrice singuliere : pas d'inverse
```

> [!astuce] Pour vérifier `A @ A_inv == I`, on utilise **`np.allclose`**, jamais `==` : les calculs en flottants laissent des résidus de l'ordre de 1e-16.

Application : résoudre A·x = b → x = A⁻¹·b (en pratique, `np.linalg.solve(A, b)` est plus précis).

### Valeurs et vecteurs propres

λ est valeur propre de A si **det(A − λI) = 0** ; v est vecteur propre associé si (A − λI)v = 0, c'est-à-dire **A·v = λ·v** (A ne fait qu'étirer v).

```python
A = np.array([[2, 1], [1, 3]])
vals, vecs = np.linalg.eig(A)
print(np.round(np.real(vals), 4))
v = vecs[:, 0]
print(np.allclose(A @ v, vals[0] * v))
```

```sortie
[1.382 3.618]
True
```

- `np.linalg.eigvals(A)` : seulement les valeurs propres.
- Selon la version de NumPy, les valeurs peuvent s'afficher en complexes (`3.618+0.j`) : `np.real(...)` garde la partie réelle, comme sur la diapo.
- `np.linalg.eig(A)` : valeurs **et** vecteurs. Les vecteurs propres sont les **colonnes** de `vecs` (d'où `vecs[:, 0]`).

## QCM du chapitre

```qcm
? `np.array_equal(a, b)` renvoie :
- un tableau de booléens case par case
+ un seul booléen : même forme et mêmes éléments
- l'intersection de a et b
- le nombre de cases égales
= C'est un test global ; `a == b` donne le tableau de booléens.

? `np.intersect1d([3, 1, 2], [2, 3, 4])` vaut :
- `[3 2]`
+ `[2 3]`
- `[1 2 3 4]`
- `[3]`
= Les éléments communs, **triés**.

? Avec `return_counts=True`, `np.unique(['a', 'b', 'a'])` renvoie aussi :
- `[0 1]`
+ `[2 1]`
- `[1 2]`
- `[0 1 0]`
= Uniques triés `['a' 'b']` avec leurs fréquences 2 et 1.

? Pour A de forme (2, 3) et B de forme (3, 4), la forme de `A @ B` est :
- (3, 3)
+ (2, 4)
- (4, 2)
- Erreur
= (m, n) @ (n, p) → (m, p).

? `np.sum(M, axis=0)` sur une matrice 3 × 4 a pour forme :
- (3,)
+ (4,)
- (3, 4)
- (1,)
= L'axe 0 (lignes) disparaît : il reste une somme par colonne.

? Le déterminant de `[[3, 2], [6, 4]]` vaut :
+ 0, donc la matrice n'est pas inversible
- 24
- 12
- −24
= 3·4 − 2·6 = 0 : matrice singulière.

? `np.linalg.inv` sur une matrice 2 × 3 :
- renvoie une matrice 3 × 2
+ lève une erreur : seule une matrice carrée peut être inversée
- renvoie la transposée
- renvoie None
= L'inverse n'existe que pour les matrices carrées de déterminant non nul.

? `np.var([2, 4, 6])` vaut :
- 4
+ 2.6666…
- 2
- 8
= Moyenne 4 ; écarts² 4, 0, 4 ; somme 8 divisée par N = 3.

? Quelle différence entre `np.dot(a, b)` et `np.cross(a, b)` pour deux vecteurs 3D ?
+ dot renvoie un nombre, cross renvoie un vecteur perpendiculaire
- Aucune
- dot renvoie un vecteur, cross un nombre
- cross n'existe qu'en 2D
= Produit scalaire → scalaire ; produit vectoriel → vecteur 3D.

? Pour vérifier que `A @ A_inv` vaut l'identité, on écrit :
- `A @ A_inv == np.eye(n)`
+ `np.allclose(A @ A_inv, np.eye(n))`
- `np.array_equal(A @ A_inv, 1)`
- `A @ A_inv is np.eye(n)`
= Les flottants contiennent des erreurs d'arrondi : on compare avec une tolérance.

? Un vecteur propre v de A associé à λ vérifie :
- A + v = λ
+ A·v = λ·v
- det(A) = λ
- A·λ = v
= A ne fait que multiplier v par λ.
```

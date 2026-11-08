---
id: numpy-tableaux
titre: NumPy (1) · créer, indexer et transformer des tableaux
seance: Séance 2 · 5 octobre 2026
importance: 5
---

**NumPy** (*Numerical Python*) est la bibliothèque de calcul numérique de Python. Son objet central est le **`ndarray`** (*N-dimensional array*) : un tableau de nombres **du même type**, rangés de façon compacte en mémoire.

## 1. Pourquoi NumPy plutôt qu'une liste ?

| | Liste Python | Tableau NumPy |
|---|---|---|
| Types | mélangés possibles | **homogènes** (un seul `dtype`) |
| Mémoire | références vers des objets | bloc compact et contigu |
| Calcul | boucle Python explicite | **vectorisé** (boucle en C) |
| Usage | collections générales | calcul scientifique, data, ML |

```python
import numpy as np

L = [1, 2, 3, 4, 5]
L2 = []
for x in L:
    L2.append(2 * x)

A = np.array([1, 2, 3, 4, 5])
A2 = 2 * A
print(L2)
print(A2)
```

```sortie
[2, 4, 6, 8, 10]
[ 2  4  6  8 10]
```

> [!retenir] Les quatre raisons de la vitesse de NumPy (question de cours classique) : **mémoire contiguë**, **code compilé en C**, **types homogènes**, **vectorisation** (+ le *broadcasting* : opérer entre tableaux de formes compatibles sans boucle).

> [!piege] `[1, 2] * 2` sur une **liste** donne `[1, 2, 1, 2]` (répétition). `np.array([1, 2]) * 2` donne `[2 4]` (calcul).

## 2. Dimensions, axes, forme

```python
arr0 = np.array(42)                                  # scalaire
arr1 = np.array([1, 2, 3, 4, 5])                     # vecteur
arr2 = np.array([[1, 2, 3], [4, 5, 6]])              # matrice
arr3 = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])  # tenseur
print(arr0.ndim, arr1.ndim, arr2.ndim, arr3.ndim)
print(arr1.shape, arr2.shape, arr3.shape)
```

```sortie
0 1 2 3
(5,) (2, 3) (2, 2, 2)
```

- **`ndim`** = nombre d'axes (niveaux d'imbrication des crochets).
- **`shape`** = taille le long de chaque axe. Pour une matrice : `(lignes, colonnes)`.
- Attention à la virgule : `(5,)` est un **tuple à un élément**, pas le nombre 5.

```grille arr2 : shape (2, 3) → axe 0 = lignes (taille 2), axe 1 = colonnes (taille 3)
#cols: col0 col1 col2
#rows: ligne0 ligne1
1 2 3
4 5 6
```

## 3. Créer des tableaux

| Fonction | Résultat | Exemple |
|---|---|---|
| `np.array(liste)` | à partir d'une liste ou d'un tuple | `np.array([1, 2, 3])` |
| `np.zeros(forme)` | rempli de `0.` (float) | `np.zeros(3)` → `[0. 0. 0.]` |
| `np.ones(forme)` | rempli de `1.` | `np.ones((2, 3))` |
| `np.empty(forme)` | **non initialisé** (valeurs au hasard de la mémoire) | à remplir ensuite |
| `np.arange(début, fin, pas)` | comme `range`, **fin exclue**, pas décimal possible | `np.arange(0, 2, 0.5)` |
| `np.linspace(début, fin, n)` | **n points**, **fin incluse** | `np.linspace(0, 1, 5)` |

```python
print(np.arange(0, 10, 2))
print(np.arange(0, 2, 0.5))
print(np.linspace(0, 1, 5))
print(np.ones((2, 3)))
```

```sortie
[0 2 4 6 8]
[0.  0.5 1.  1.5]
[0.   0.25 0.5  0.75 1.  ]
[[1. 1. 1.]
 [1. 1. 1.]]
```

> [!piege] `arange` **exclut** la fin, `linspace` l'**inclut**. Et pour `zeros`/`ones` en 2D, la forme est **un tuple** : `np.ones((2, 3))`, pas `np.ones(2, 3)`.

## 4. Indexation et découpage (slicing)

Les indices commencent à **0**. En 2D : `arr[ligne, colonne]`. Les indices négatifs partent de la fin.

```python
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr_2d[0, 1], arr_2d[1, 2], arr_2d[1, -1])
print(arr_2d[1, :])
```

```sortie
2 6 6
[4 5 6]
```

Découpage `début:fin:pas` (fin **exclue**) :

```python
arr = np.array([1, 2, 3, 4, 5, 6, 7])
print(arr[1:5], arr[-3:-1], arr[1:5:2], arr[::2])
```

```sortie
[2 3 4 5] [5 6] [2 4] [1 3 5 7]
```

```grille arr[1:5] → indices 1, 2, 3, 4 (5 exclu)
#cols: 0 1 2 3 4 5 6
1 *2 *3 *4 *5 6 7
```

En 2D, on découpe chaque axe séparément :

```python
arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print(arr[1, 1:4])
print(arr[0:2, 2])
print(arr[0:2, 1:4])
```

```sortie
[7 8 9]
[3 8]
[[2 3 4]
 [7 8 9]]
```

```grille arr[0:2, 1:4] → les 2 lignes, colonnes 1 à 3
#cols: 0 1 2 3 4
#rows: 0 1
1 *2 *3 *4 5
6 *7 *8 *9 10
```

```grille arr[0:2, 2] → une seule colonne : le résultat est 1D
#cols: 0 1 2 3 4
#rows: 0 1
1 2 !3 4 5
6 7 !8 9 10
```

## 5. Types de données (`dtype`)

Un type NumPy = **nature** + **précision en bits** : `int8` (de −128 à 127), `int32`, `int64`, `uint8` (non signé), `float32`, `float64`, `complex128`, `bool_`, chaînes `<U6` (Unicode, 6 caractères max).

```python
a = np.array([1, 2, 3, 4], dtype=np.float64)
b = np.array([1.1, 2.1, 3.1]).astype(np.int32)    # astype crée une COPIE
c = np.array([1, 0, 3]).astype(np.bool_)
d = np.array([1, '2', 3])                          # promotion de type
print(a, b, c, d, d.dtype)
```

```sortie
[1. 2. 3. 4.] [1 2 3] [ True False  True] ['1' '2' '3'] <U21
```

> [!retenir] **Promotion de type** : si on mélange entiers et chaînes, NumPy choisit un type commun capable de tout contenir, ici **la chaîne**. Le nombre après `<U` dépend de la machine : la diapo affiche `<U11`, d'autres versions affichent `<U21`. Ce qui compte, c'est `U` = Unicode.

> [!piege] `astype(int)` **tronque** vers 0 (`2.9 → 2`, `-1.5 → -1`), il n'arrondit pas.

## 6. Opérations vectorisées

Les opérateurs `+ - * / ** %` et les comparaisons s'appliquent **élément par élément**.

```python
a = np.array([1, 2, 3, 4])
b = np.array([4, 2, 2, 4])
print(a + 1, 2 ** a, a * b)
print(a == b)
x = np.array([1, 1, 0, 0], dtype=bool)
y = np.array([1, 0, 1, 0], dtype=bool)
print(np.logical_or(x, y), np.logical_and(x, y))
```

```sortie
[2 3 4 5] [ 2  4  8 16] [ 4  4  6 16]
[False  True False  True]
[ True  True  True False] [ True False False False]
```

## 7. Copie, vue et simple alias

C'est **la** notion piège de la séance.

| Instruction | Ce que c'est | Modifier le résultat modifie l'original ? | `.base` |
|---|---|---|---|
| `b = a` | **alias** : même objet | oui (c'est le même) | — (`b is a` → `True`) |
| `b = a[1:3]`, `a.view()`, `a.reshape(...)`, `a.ravel()` | **vue** : autre regard sur les mêmes données | **oui** | l'original |
| `b = a.copy()`, `a.flatten()`, `a.astype(...)` | **copie** indépendante | non | `None` |

```python
arr = np.array([5, 20, 41])
copie = arr.copy(); copie[0] = 16
vue = arr.view();   vue[1] = 25
print(arr, copie, copie.base is None, vue.base is arr)
```

```sortie
[ 5 25 41] [16 20 41] True True
```

```etapes Pourquoi le slicing modifie l'original
Création :: `arr = np.array([5, 20, 41])` réserve une zone mémoire.
Découpage :: `v = arr[1:]` ne copie rien : `v` « regarde » les cases 1 et 2 de la même zone.
Écriture :: `v[0] = 99` écrit dans la case 1 de la zone partagée.
Résultat :: `arr` vaut maintenant `[5 99 41]`. Pour éviter ça : `v = arr[1:].copy()`.
```

`np.empty_like(a)` réserve un tableau de même forme et même type, non initialisé ; suivi de `b[:] = a`, il produit une vraie copie.

## 8. Forme : `reshape`, `-1`, aplatir

**Règle d'or** : le nombre total d'éléments ne change pas (6 éléments → 2×3, 3×2, 6×1… mais jamais 3×3).

```python
arr = np.arange(1, 7)
print(arr.reshape(2, 3))
print(arr.reshape(2, -1).shape, np.arange(8).reshape(2, 2, -1).shape)
```

```sortie
[[1 2 3]
 [4 5 6]]
(2, 3) (2, 2, 2)
```

```grille np.arange(1, 7) : shape (6,)
1 2 3 4 5 6
```

```grille .reshape(2, 3) : on remplit ligne par ligne
#rows: 0 1
*1 *2 *3
!4 !5 !6
```

- `-1` = « calcule cette dimension tout seul ». **Une seule** dimension peut valoir `-1`.
- `arr.reshape(3, 3)` sur 6 éléments → `ValueError: cannot reshape array of size 6 into shape (3,3)`.
- Aplatir en 1D : `flatten()` renvoie une **copie** ; `ravel()` et `reshape(-1)` renvoient une **vue**.

## 9. Parcourir un tableau

```python
tab = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
for x in np.nditer(tab):                    # une seule boucle, quel que soit ndim
    print(x, end=" ")
print()
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
for x in np.nditer(arr2, order="F"):        # F = colonne par colonne
    print(x, end=" ")
print()
for idx, val in np.ndenumerate(np.array([[11, 22], [33, 44]])):
    print(idx, val, end=" | ")
print()
arr = np.array([1, 2, 3])
for x in np.nditer(arr, op_flags=["readwrite"]):
    x[...] = 2 * x                          # [...] obligatoire pour écrire
print(arr)
```

```sortie
1 2 3 4 5 6 7 8 
1 4 2 5 3 6 
(0, 0) 11 | (0, 1) 22 | (1, 0) 33 | (1, 1) 44 | 
[2 4 6]
```

> [!piege] Dans `nditer`, `x = 2 * x` ne modifie rien : `x` est un tableau de dimension 0. Il faut `x[...] = 2 * x` **et** `op_flags=["readwrite"]`.

## 10. Assembler et découper

### Les axes, une fois pour toutes

```grille A
#rows: 0 1
1 2
3 4
```

```grille B
#rows: 0 1
!5 !6
!7 !8
```

```grille np.concatenate((A, B), axis=0) → on ajoute des LIGNES : shape (4, 2)
1 2
3 4
!5 !6
!7 !8
```

```grille np.concatenate((A, B), axis=1) → on ajoute des COLONNES : shape (2, 4)
1 2 !5 !6
3 4 !7 !8
```

> [!retenir] **axis=0 = vers le bas** (le nombre de lignes grandit). **axis=1 = vers la droite** (le nombre de colonnes grandit). Les tableaux doivent avoir la même taille sur **les autres** axes.

Raccourcis : `np.vstack` (vertical, comme axis=0), `np.hstack` (horizontal), `np.dstack` (en profondeur, 3e axe).

```python
a1, a2 = np.array([1, 2, 3]), np.array([4, 5, 6])
print(np.hstack((a1, a2)))
print(np.vstack((a1, a2)))
print(np.dstack((a1, a2)).shape)
```

```sortie
[1 2 3 4 5 6]
[[1 2 3]
 [4 5 6]]
(1, 3, 2)
```

### Découper : `split` vs `array_split`

```python
arr = np.array([10, 20, 30, 40, 50, 60])
print(np.split(arr, 3))
print(np.split(arr, [2, 5]))
print(np.array_split(np.array([10, 20, 30, 40, 50]), 3))
```

```sortie
[array([10, 20]), array([30, 40]), array([50, 60])]
[array([10, 20]), array([30, 40, 50]), array([60])]
[array([10, 20]), array([30, 40]), array([50])]
```

```grille np.split(arr, [2, 5]) → coupes AVANT les indices 2 et 5 : arr[:2], arr[2:5], arr[5:]
#cols: 0 1 2 3 4 5
*10 *20 !30 !40 !50 60
```

- `split(arr, N)` exige des parts **égales** : `np.split(5 éléments, 3)` → `ValueError`.
- `array_split` accepte l'inégalité : le surplus va aux **premiers** morceaux (2, 2, 1).
- Une liste de k indices donne **k + 1** morceaux.
- En 2D : `vsplit` sépare des **lignes**, `hsplit` sépare des **colonnes**.

## 11. Chercher, trier, filtrer, ajouter

```python
arr = np.array([1, 2, 3, 4, 5, 4, 4])
print(np.where(arr == 4)[0])                 # indices, pas valeurs
v = np.array([1, 5, 3, 7, 2])
print(np.argmax(v), v[np.argmax(v)])         # indice du max, puis la valeur
print(np.searchsorted(np.array([1, 2, 4, 5]), 3))
```

```sortie
[3 5 6]
3 7
2
```

> [!piege] `argmax` renvoie **la position** du maximum, pas sa valeur. `searchsorted` exige un tableau **déjà trié** (recherche dichotomique, O(log n)).

**Trier** : `np.sort(a)` renvoie une **copie** triée ; `a.sort()` trie **sur place**. Ordre décroissant : `np.sort(a)[::-1]` (pas de `reverse=True`).

```python
m = np.array([[3, 8, 1], [7, 2, 5]])
print(np.sort(m))             # défaut axis=-1 : chaque LIGNE
print(np.sort(m, axis=0))     # chaque COLONNE
print(np.sort(m, axis=None))  # tout aplati
notes = np.array([14, 8, 19]); noms = np.array(["Youness", "Souad", "Kamal"])
print(noms[np.argsort(notes)])
print(np.lexsort((np.array([2, 1, 0, 3]), np.array(["B", "A", "A", "B"]))))
```

```sortie
[[1 3 8]
 [2 5 7]]
[[3 2 1]
 [7 8 5]]
[1 2 3 5 7 8]
['Souad' 'Youness' 'Kamal']
[2 1 0 3]
```

- `argsort` renvoie l'**ordre des indices** qui trie : idéal pour trier les noms selon les notes.
- `lexsort((secondaire, principale))` : la clé **principale est la dernière** du tuple (priorité de droite à gauche), comme un `ORDER BY principale, secondaire`.

**Filtrer avec un masque booléen** :

```python
tab = np.arange(1, 11)
print(tab[tab > 7])
print(tab[(tab > 3) & (tab % 2 == 0)])
```

```sortie
[ 8  9 10]
[ 4  6  8 10]
```

```grille tab > 7 : le masque garde les cases True
#cols: 1 2 3 4 5 6 7 8 9 10
~F ~F ~F ~F ~F ~F ~F *T *T *T
```

> [!piege] Conditions multiples : `&` (et), `|` (ou), **chaque condition entre parenthèses**. `tab > 3 and tab % 2 == 0` lève `ValueError: The truth value of an array... is ambiguous`.

**Ajouter** : `np.append` **ne modifie pas** le tableau, il en **renvoie un nouveau**. Sans `axis`, tout est aplati.

```python
m = np.array([[1, 2, 3], [4, 5, 6]])
print(np.append(m, [[7, 8, 9]], axis=0).shape)
print(np.append(m, [[10], [20]], axis=1).shape)
print(np.append(m, [7, 8]))
```

```sortie
(3, 3)
(2, 4)
[1 2 3 4 5 6 7 8]
```

## QCM du chapitre

```qcm
? Que contient `np.arange(2, 10, 3)` ?
- `[2 5 8 10]`
+ `[2 5 8]`
- `[3 6 9]`
- `[2 4 6 8]`
= De 2 à 10 **exclu**, par pas de 3 : 2, 5, 8.

? `np.linspace(0, 10, 3)` vaut :
- `[0. 3.33 6.67]`
+ `[ 0.  5. 10.]`
- `[0 3 6 9]`
- `[0. 10.]`
= 3 points régulièrement espacés, bornes **incluses**.

? Pour `a = np.array([[1, 2, 3], [4, 5, 6]])`, que vaut `a[:, 1]` ?
- `[4 5 6]`
+ `[2 5]`
- `[[2], [5]]`
- `2`
= `:` prend toutes les lignes, `1` la colonne d'indice 1. Le résultat est 1D.

? `b = a[0:2]` puis `b[0] = 99`. Que devient `a` ?
+ `a[0]` vaut aussi 99, car le slicing crée une vue
- `a` ne change pas, car le slicing crée une copie
- Erreur, car une vue est en lecture seule
- `a` est supprimé
= Le découpage renvoie une **vue** : les données sont partagées.

? Laquelle renvoie une **copie** ?
- `a.ravel()`
- `a.reshape(-1)`
+ `a.flatten()`
- `a[:]`
= `flatten()` copie ; `ravel()`, `reshape` et le slicing renvoient des vues.

? `np.arange(12).reshape(3, -1).shape` vaut :
- `(3, 3)`
+ `(3, 4)`
- `(4, 3)`
- Erreur
= 12 éléments / 3 lignes = 4 colonnes, calculées grâce à `-1`.

? `np.concatenate((A, B), axis=1)` avec A et B de forme (2, 2) donne :
- (4, 2)
+ (2, 4)
- (2, 2, 2)
- (4, 4)
= axis=1 ajoute des colonnes : 2 lignes, 2 + 2 colonnes.

? `np.split(np.arange(7), 3)` :
- donne 3 morceaux de tailles 3, 2, 2
+ lève une `ValueError`
- donne 3 morceaux de tailles 2, 2, 3
- donne 7 morceaux
= 7 n'est pas divisible par 3 : il faut `np.array_split`.

? `np.argmax(np.array([4, 9, 2, 9]))` renvoie :
- 9
+ 1
- 3
- `[1, 3]`
= L'indice de la **première** occurrence du maximum.

? Quelle écriture filtre les valeurs entre 3 et 7 (exclus) ?
- `t[t > 3 and t < 7]`
- `t[t > 3 & t < 7]`
+ `t[(t > 3) & (t < 7)]`
- `t[3:7]`
= `&` exige des parenthèses autour de chaque condition ; `and` ne marche pas sur des tableaux.

? `np.array([1, '2', 3]).dtype` est :
- int64
- object
+ une chaîne Unicode (`<U...`)
- float64
= Promotion de type : le type commun capable de tout contenir est la chaîne.

? Différence entre `np.sort(a)` et `a.sort()` :
+ `np.sort` renvoie une copie triée, `a.sort()` trie `a` sur place
- Aucune
- `a.sort()` renvoie une copie triée
- `np.sort` trie dans l'ordre décroissant
= La fonction ne touche pas l'original ; la méthode le modifie et renvoie `None`.
```

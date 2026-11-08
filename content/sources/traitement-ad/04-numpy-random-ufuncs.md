---
id: numpy-random
titre: NumPy (3) · le hasard (numpy.random) et les fonctions universelles
seance: Séances 3 et 4 · 11 et 22 octobre 2026
importance: 5
---

```python
import numpy as np
```

## 1. Pseudo-aléatoire et graine

Les nombres de `numpy.random` sont **pseudo-aléatoires** : un algorithme déterministe produit une suite qui *ressemble* au hasard. Si on fixe la **graine** (*seed*), on retrouve exactement la même suite : c'est indispensable pour des expériences **reproductibles**.

```python
rng = np.random.default_rng(42)
print(rng.integers(1, 11, size=5))
rng = np.random.default_rng(42)
print(rng.integers(1, 11, size=5))
```

```sortie
[1 8 7 5 5]
[1 8 7 5 5]
```

> [!retenir] Deux interfaces coexistent. L'**ancienne** : `np.random.randint`, `np.random.rand`, `np.random.normal`… L'**actuelle, recommandée** : on crée un générateur `rng = np.random.default_rng(graine)` puis `rng.integers`, `rng.random`, `rng.normal`… Le prof montre les deux : sache lire les deux.

> [!astuce] « Aléatoire » ne veut pas dire « toutes différentes » : 6 lancers de dé peuvent très bien donner deux fois 5 (c'est le cas ci-dessus).

## 2. Entiers et réels uniformes

| Fonction | Tire… | Intervalle | Forme |
|---|---|---|---|
| `np.random.randint(low, high, size)` | des **entiers** | [low, high) : high **exclu** | `size=(2, 3)` |
| `rng.integers(low, high, size, endpoint=False)` | des entiers | high exclu, **inclus si `endpoint=True`** | `size=...` |
| `np.random.rand(d0, d1, ...)` | des **réels** | [0, 1) | dimensions **séparées**, pas de tuple |
| `rng.random((d0, d1))`, `np.random.random_sample(size)` | des réels | [0, 1) | tuple |
| `np.random.uniform(low, high, size)` | des réels | [low, high) | `size=...` |

```python
print(np.random.rand(2, 3).shape)
print(np.random.randint(10) < 10)               # un seul argument : [0, 10)
d = np.random.randint(1, 7, size=1000)          # dé à 6 faces
print(d.min() >= 1, d.max() <= 6)
r = np.random.default_rng(0).integers(1, 6, size=1000, endpoint=True)
print(r.max())
```

```sortie
(2, 3)
True
True True
6
```

> [!piege] Pour un dé, `randint(1, 6)` ne donnera **jamais 6**. Il faut `randint(1, 7)` ou `rng.integers(1, 6, endpoint=True)`. Et `np.random.rand((2, 3))` (tuple) plante : `rand` veut `rand(2, 3)`.

**Loi uniforme** : chaque valeur (ou chaque sous-intervalle de même longueur) a la même chance.

- Continue U[a, b] : densité 1/(b − a), espérance **(a + b)/2**, variance **(b − a)²/12**.
- Discrète sur N valeurs : P(X = k) = **1/N** (dé : 1/6).

## 3. Tirer dans un tableau : `choice`, `shuffle`, `permutation`

`np.random.choice(a, size=None, replace=True, p=None)`

- `replace=True` (défaut) : **avec remise**, un élément peut sortir plusieurs fois.
- `replace=False` : **sans remise**, éléments distincts ; exige `size ≤ len(a)` sinon `ValueError`.
- `p` : probabilités de chaque élément, chacune entre 0 et 1, **somme = 1** (un `p` à 0 = jamais tiré).

```python
rng = np.random.default_rng(1)
elements = [6, -2, 3, 4]
t = rng.choice(elements, size=10_000, p=[0.1, 0.3, 0.6, 0.0])
valeurs, compte = np.unique(t, return_counts=True)
print(valeurs, 4 in t)
print(np.round(compte / len(t), 1))
print(len(set(rng.choice(elements, size=4, replace=False))))
```

```sortie
[-2  3  6] False
[0.3 0.6 0.1]
4
```

```grille Tirage pondéré : la valeur 3 sort ~60 % du temps, la valeur 4 jamais
#cols: 6 -2 3 4
#rows: p fréquence
0.1 0.3 *0.6 ~0.0
0.1 0.3 *0.6 ~0
```

| | `np.random.shuffle(x)` | `np.random.permutation(x)` |
|---|---|---|
| Modifie `x` ? | **oui, sur place** | non |
| Renvoie | **`None`** | une **copie** mélangée |
| Avec un entier N | — | mélange de `np.arange(N)` |
| En 2D | mélange **les lignes** seulement | idem |

```python
a = np.array([-5, 2, 6, -3, 5])
res = np.random.shuffle(a)
print(res, sorted(a) == [-5, -3, 2, 5, 6])
b = np.array([10, 20, 30])
p = np.random.permutation(b)
print(b, sorted(p))
```

```sortie
None True
[10 20 30] [np.int64(10), np.int64(20), np.int64(30)]
```

> [!piege] `a = np.random.shuffle(a)` est une erreur classique : `shuffle` renvoie `None`, et `a` est perdu.

## 4. Distributions : le vocabulaire

- **Distribution** : comment les valeurs d'une variable aléatoire X se répartissent. *Théorique* (le modèle) ou *empirique* (ce qu'on observe sur un échantillon).
- Variable **discrète** (comptage, dé) → **PMF** : P(X = k), la somme des P vaut 1.
- Variable **continue** (taille, temps) → **PDF** f(x) : P(X = x) = 0, une probabilité est une **aire** sous la courbe. La **CDF** F(x) = P(X ≤ x).
- **Espérance** E[X] (centre), **variance** Var(X) = E[X²] − E[X]² (dispersion), **écart-type** σ = √Var.
- **Loi des grands nombres** : plus l'échantillon est grand, plus la moyenne observée se rapproche de l'espérance. C'est pour ça que le prof vérifie ses tirages avec 100 000 valeurs.

> [!retenir] Les lois **discrètes** (`binomial`, `poisson`, `geometric`, `multinomial`) renvoient des **entiers** ; les lois **continues** (`normal`, `uniform`, `logistic`) renvoient des **flottants**.

## 5. Les lois à connaître

| Loi | Fonction | Paramètres | Modélise | Espérance |
|---|---|---|---|---|
| **Normale** (Gauss) | `normal(loc, scale, size)` | loc = moyenne μ, scale = **écart-type** σ | tailles, notes, erreurs de mesure | μ |
| **Binomiale** | `binomial(n, p, size)` | n essais, p succès | nb de succès sur n essais oui/non | n·p |
| **Poisson** | `poisson(lam, size)` | λ = taux moyen | nb d'événements par intervalle (clients/heure) | λ (et Var = λ) |
| **Uniforme** | `uniform(low, high, size)` | bornes | tout se vaut sur [low, high) | (low + high)/2 |
| **Logistique** | `logistic(loc, scale, size)` | centre μ, échelle s | croissance, régression logistique (sigmoïde) | μ (Var = π²s²/3) |
| **Multinomiale** | `multinomial(n, pvals, size)` | n essais, k probas | comptages dans k catégories | n·pᵢ par catégorie |
| **Géométrique** | `geometric(p, size)` | p succès | nb d'essais **jusqu'au 1er succès** | 1/p |

```python
rng = np.random.default_rng(42)
N = 200_000
print(round(rng.normal(loc=5, scale=2, size=N).mean(), 1), round(rng.normal(5, 2, N).std(), 1))
print(round(rng.binomial(n=10, p=0.5, size=N).mean(), 1))
x = rng.poisson(lam=3.0, size=N)
print(round(x.mean(), 1), round(x.var(), 1), x.dtype)
print(round(rng.uniform(10, 20, N).mean(), 1))
print(rng.multinomial(10, [0.2, 0.3, 0.5]).sum())
print(round(rng.geometric(p=0.25, size=N).mean(), 1))
```

```sortie
5.0 2.0
5.0
3.0 3.0 int64
15.0
10
4.0
```

```etapes Lire la sortie de multinomial(10, [0.2, 0.3, 0.5])
Les essais :: on fait 10 essais ; chacun tombe dans **une seule** des 3 catégories.
Les probabilités :: catégorie 1 : 20 %, catégorie 2 : 30 %, catégorie 3 : 50 % (somme = 1).
Le résultat :: un **vecteur de 3 comptages**, par exemple `[1 3 6]`, jamais un seul nombre.
La contrainte :: la somme des comptages vaut toujours n : 1 + 3 + 6 = 10.
```

> [!piege] Dans `normal(loc, scale)`, **scale est l'écart-type**, pas la variance. `normal(3, 2)` a une variance de 4. La binomiale renvoie un **nombre de succès** (entre 0 et n), pas une suite de 0/1.

Formules (vues en séance) :

- Binomiale : P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ
- Poisson : P(X = k) = λᵏ e^(−λ) / k!
- Logistique : sa CDF est la **sigmoïde** F(x) = 1 / (1 + e^(−(x − μ)/s)). Elle ressemble à la normale avec des **queues plus épaisses** (plus de valeurs extrêmes).

## 6. Les fonctions universelles (ufuncs)

Une **ufunc** est une fonction NumPy qui agit **élément par élément**, en C, sans boucle Python (*vectorisation*). Elles gèrent le *broadcasting* et ont des méthodes comme `reduce` et `accumulate`. Leur type est `numpy.ufunc`.

```python
a, b = [1, -2, 1, -7], [6, 3, 0, 7]
print([i + j for i, j in zip(a, b)], np.add(a, b))
```

```sortie
[7, 1, 1, 0] [7 1 1 0]
```

### Créer sa propre ufunc : `np.frompyfunc(fonction, nb_entrées, nb_sorties)`

```python
def myadd(x, y):
    return x + y

add_ufunc = np.frompyfunc(myadd, 2, 1)
print(add_ufunc([1, 2, 3, 4], [5, 6, 7, 8]), type(add_ufunc) == np.ufunc)
```

```sortie
[6 8 10 12] True
```

> [!attention] Une ufunc maison renvoie un tableau de type `object` et reste **lente** (elle appelle ta fonction Python à chaque case). Les ufuncs natives (`np.add`, `np.sqrt`…) sont bien plus rapides.

### Arithmétique

`np.add`, `np.subtract`, `np.multiply`, `np.divide`, `np.power`, `np.mod` / `np.remainder`, `np.divmod` (quotient **et** reste), `np.absolute` / `np.abs`, `np.sqrt`, `np.negative`, `np.exp`.

```python
a = np.array([2, 4, 6, 8]); b = np.array([3, 2, 5, 2])
print(np.power(a, b), np.mod(a, b))
q, r = np.divmod(np.array([10, -5, 25, -8]), np.array([3, 2, -5, 2]))
print(q, r)
```

```sortie
[   8   16 7776   64] [2 0 1 0]
[ 3 -3 -5 -4] [1 1 0 0]
```

### Le paramètre `where` (et son piège)

`where=condition` : l'opération n'est faite **que** là où la condition est vraie.

```python
a = np.array([7, 2, 8]); b = np.array([4, 5, 6])
sortie = np.zeros_like(a)
np.subtract(a, b, out=sortie, where=a > b)
print(sortie)
```

```sortie
[3 0 2]
```

> [!piege] La diapo écrit `np.add(arr1, arr2, where=arr1 > arr2)` **sans `out`** et annonce des 0 ailleurs. Faux en général : sans `out`, les cases non calculées contiennent **ce qui traînait en mémoire** (parfois des 0, parfois n'importe quoi). Donne toujours un `out=` initialisé, comme ci-dessus.

### Division par zéro

`np.divide([2, 4], [3, 0])` donne `inf` (avec un avertissement), et `0/0` donne `nan`. Pour gérer proprement :

```python
a = np.array([2., 4., 6., 8.]); b = np.array([3., 0., 5., 2.])
with np.errstate(divide="ignore"):
    print(np.where(b != 0, a / b, np.nan).round(2))
```

```sortie
[0.67  nan 1.2  4.  ]
```

### Arrondis : cinq fonctions, cinq comportements

| Fonction | Règle | 2.7 | −2.7 | 2.5 |
|---|---|---|---|---|
| `np.round` / `np.around(x, decimals)` | au plus proche, **égalité → pair** | 3 | −3 | **2** |
| `np.floor` | vers le **bas** | 2 | **−3** | 2 |
| `np.ceil` | vers le **haut** | 3 | −2 | 3 |
| `np.trunc` / `np.fix` | vers **zéro** (on coupe) | 2 | **−2** | 2 |

```python
print(np.around([0.5, 1.5, 2.5]), np.around(5.25, 1), np.around(5.2777, 2))
t = np.array([2.78, -3.45, 4.56])
print(np.floor(t), np.ceil(t), np.trunc(t))
```

```sortie
[0. 2. 2.] 5.2 5.28
[ 2. -4.  4.] [ 3. -3.  5.] [ 2. -3.  4.]
```

> [!piege] **Arrondi bancaire** : `np.around(2.5)` = 2 et `np.around(0.5)` = 0 (on va vers le **pair**). Et `5.25` arrondi à 1 décimale donne `5.2` (pair) : ce n'est pas l'arrondi « du collège ».

### Logarithmes

`np.log` (base e), `np.log10`, `np.log2`, et n'importe quelle base b : `np.log(x) / np.log(b)`.

```python
x = np.array([1, 10, 100])
print(np.log10(x), np.round(np.log(x) / np.log(3), 4))
```

```sortie
[0. 1. 2.] [0.     2.0959 4.1918]
```

## 7. Fonctions statistiques

| Fonction | Calcule | Remarque |
|---|---|---|
| `np.sum`, `np.prod` | somme, produit | `axis`, `keepdims=True` garde la dimension |
| `np.cumsum`, `np.cumprod` | cumul (même taille que l'entrée) | |
| `np.diff(x, n=1)` | différences successives | taille − n |
| `np.mean`, `np.median` | moyenne, médiane | médiane = valeur du milieu après tri |
| `np.std`, `np.var` | écart-type, variance | `ddof=0` par défaut |
| `np.cov(M)` | matrice de covariance | **chaque ligne = une variable**, ddof = 1 |
| `np.corrcoef(X, Y)` | matrice de corrélation r ∈ [−1, 1] | diagonale = 1 |

```python
arr = np.array([[-1, 12, 3], [7, 4, 2]])
print(np.sum(arr), np.sum(arr, axis=0), np.sum(arr, axis=1, keepdims=True).tolist())
print(np.cumsum([3, -2, 4, 2, 10]), np.cumprod([2, -1, 2, 4, 7]))
print(np.diff([1, 3, 7, 11, 18]), np.diff([1, 3, 7, 11, 18], n=2))
print(np.median([3, 1, 7, 6, 2, 8, 4, 5]), np.mean([[5, -2, 4], [4, 15, 7]], axis=1).round(2))
```

```sortie
27 [ 6 16  5] [[14], [13]]
[ 3  1  5  7 17] [   2   -2   -4  -16 -112]
[2 4 4 7] [2 0 3]
4.5 [2.33 8.67]
```

```grille np.cumsum([3, -2, 4, 2, 10]) : chaque case = somme de tout ce qui précède
#cols: 3 -2 4 2 10
#rows: entrée cumul
3 -2 4 2 10
*3 *1 *5 *7 *17
```

**Médiane** : on trie (1 2 3 4 5 6 7 8) ; 8 valeurs (nombre pair) → moyenne des deux du milieu : (4 + 5)/2 = 4.5. Avec un nombre impair, c'est la valeur centrale.

**Covariance et corrélation** :

- cov(X, Y) > 0 : X et Y montent ensemble ; < 0 : l'une monte quand l'autre baisse ; ≈ 0 : pas de lien **linéaire**.
- La corrélation r est la covariance « normalisée » : r = 1 lien linéaire parfait croissant, r = −1 décroissant, r = 0 aucun lien linéaire.

```python
X = np.array([-1, 12, 3, -4, 5]); Y = np.array([15, 44, 13, 2, -1])
print(np.round(np.corrcoef(X, Y)[0, 1], 4))
print(np.cov(np.array([[1, 6, 13, 41, 5], [5, 0, -3, 2, 11]]))[0, 1])
```

```sortie
0.7334
-23.75
```

> [!attention] **Corrélation n'est pas causalité** : deux variables peuvent évoluer ensemble sans que l'une cause l'autre.

## QCM du chapitre

```qcm
? Pourquoi fixer une graine (`default_rng(42)`) ?
- Pour obtenir des nombres vraiment aléatoires
+ Pour reproduire exactement la même suite de tirages
- Pour accélérer les calculs
- Pour tirer sans remise
= La graine initialise l'algorithme : même graine, même suite. C'est la reproductibilité.

? Quelle instruction simule un dé à 6 faces ?
- `np.random.randint(1, 6)`
+ `np.random.randint(1, 7)`
- `np.random.randint(0, 6)`
- `np.random.rand(6)`
= La borne haute est exclue : il faut 7 pour pouvoir obtenir 6.

? `np.random.shuffle(a)` renvoie :
+ `None`, et `a` est mélangé sur place
- une copie mélangée de `a`
- les indices du mélange
- `a` trié
= C'est `permutation` qui renvoie une copie.

? `np.random.choice([1, 2, 3], size=5, replace=False)` :
- renvoie 5 valeurs distinctes
+ lève une erreur, car on ne peut pas tirer 5 éléments distincts parmi 3
- renvoie 3 valeurs puis s'arrête
- renvoie des doublons
= Sans remise, `size` doit être inférieur ou égal à la taille du tableau.

? Dans `np.random.normal(10, 3, 100)`, que vaut 3 ?
- la variance
+ l'écart-type
- la médiane
- le nombre d'échantillons
= `scale` est l'écart-type σ ; la variance vaut 9.

? Quelle loi modélise le nombre de clients arrivant en une heure ?
- Normale
+ Poisson
- Uniforme continue
- Logistique
= Poisson compte des événements sur un intervalle, avec E[X] = Var(X) = λ.

? `np.random.binomial(n=10, p=0.5)` renvoie :
+ un entier entre 0 et 10 (nombre de succès)
- une suite de 10 valeurs 0/1
- un flottant entre 0 et 1
- toujours 5
= C'est le **nombre** de succès sur 10 essais ; sa moyenne vaut n·p = 5.

? `np.around(2.5)` vaut :
+ 2.0
- 3.0
- 2.5
- 3
= Arrondi bancaire : en cas d'égalité, on va vers le nombre pair.

? `np.floor(-2.3)` et `np.trunc(-2.3)` valent :
- −2 et −2
+ −3 et −2
- −2 et −3
- −3 et −3
= floor descend vers −∞ ; trunc coupe vers 0.

? `np.diff([2, 5, 9])` vaut :
+ `[3 4]`
- `[2 3 4]`
- `[7 14]`
- `[1]`
= Différences successives : 5 − 2 et 9 − 5. Le résultat a une case de moins.

? Une corrélation r = −0.95 entre X et Y signifie :
- aucun lien
+ un fort lien linéaire : quand X augmente, Y diminue
- X cause la baisse de Y
- une erreur de calcul
= r proche de −1 = forte relation linéaire décroissante. Pas de causalité pour autant.

? `np.cumsum([1, 2, 3])` vaut :
- 6
+ `[1 3 6]`
- `[1 2 3]`
- `[6 5 3]`
= Somme cumulée : chaque case additionne tout ce qui précède.
```

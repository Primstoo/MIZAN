---
id: revision
titre: Fiche de révision et examen blanc
seance: Avant l'examen
importance: 3
---

## 1. Les tableaux de survie

### Bornes : incluse ou exclue ?

| Écriture | Fin |
|---|---|
| `range(a, b)`, `np.arange(a, b)`, `np.random.randint(a, b)`, `a[i:j]`, `.iloc[i:j]` | **exclue** |
| `np.linspace(a, b, n)`, `.loc["x":"y"]`, `rng.integers(a, b, endpoint=True)` | **incluse** |

### Copie ou vue / sur place ou non ?

| Renvoie une **vue** (partage les données) | Renvoie une **copie** | Modifie **sur place** (renvoie `None`) |
|---|---|---|
| `a[1:3]`, `a.view()`, `a.reshape()`, `a.ravel()` | `a.copy()`, `a.flatten()`, `a.astype()`, `np.sort(a)`, `np.append(...)`, `np.random.permutation(a)` | `a.sort()`, `np.random.shuffle(a)` |

En Pandas, **par défaut tout renvoie une copie** (`drop`, `rename`, `sort_values`, `assign`, `reset_index`…) sauf `df["col"] = ...`, `insert`, `del`, `loc[...] = ...` et `inplace=True`.

### `axis`, une règle pour tout

```grille axis=0 → résultat par COLONNE · axis=1 → résultat par LIGNE
#cols: c0 c1 c2 axis=1
1 2 3 !6
4 5 6 !15
*5 *7 *9 ·
```

`axis=k` est l'axe **qui disparaît** (sum, mean, var, argmax, sort…). Pour `concatenate`, c'est l'axe **qui grandit** (axis=0 ajoute des lignes). Pour `drop`, axis=0 vise des **lignes**, axis=1 des **colonnes**.

### Les paires qu'on confond

| | | |
|---|---|---|
| `return` → renvoie une valeur | `print` → affiche, renvoie `None` | |
| `*args` → tuple | `**kwargs` → dictionnaire | |
| `A * B` → terme à terme | `A @ B` → produit matriciel | |
| `argmax` → **position** | `max` → valeur | |
| `np.dot(a, b)` → nombre | `np.cross(a, b)` → vecteur | |
| `floor(-2.5) = -3` | `trunc(-2.5) = -2` | `round(2.5) = 2` (pair) |
| `normal(μ, σ)` : σ = écart-type | variance = σ² | |
| `shuffle` → sur place, `None` | `permutation` → copie | |
| `.loc` → étiquettes, fin incluse | `.iloc` → positions, fin exclue | |
| `serie.map(dict)` → remplace | `serie.apply(f)` → calcule | `df.map(f)` → chaque case |
| `agg` → 1 ligne par groupe | `transform` → même taille | `filter` → groupes entiers |

## 2. Les 12 pièges qui coûtent des points

1. `print` au lieu de `return`.
2. Un paramètre par défaut **avant** un paramètre obligatoire (`SyntaxError`).
3. Modifier une liste dans une fonction **modifie l'original** ; réaffecter ne le modifie pas.
4. `randint(1, 6)` ne donne jamais 6.
5. `np.ones(2, 3)` au lieu de `np.ones((2, 3))`.
6. Croire que le slicing NumPy copie (c'est une **vue**).
7. `and` / `or` entre masques au lieu de `&` / `|` avec parenthèses.
8. `np.split` sur une taille non divisible (→ `array_split`).
9. Comparer des flottants avec `==` (→ `np.allclose`).
10. Inverser une matrice non carrée ou de déterminant nul.
11. Oublier de réaffecter après `drop`, `rename`, `sort_values`.
12. `df.append` (supprimé) au lieu de `pd.concat([df1, df2])`.

## 3. Examen blanc (1 h 30)

> [!prof] Format **supposé** : le barème réel n'est pas public. Fais-le en temps limité, sans regarder le cours, puis corrige-toi avec le corrigé ci-dessous.

**Exercice 1 · Fonctions (5 pts).** Écris `est_palindrome_nombre(n)` qui renvoie `True` si l'entier `n` se lit pareil dans les deux sens (121, 1331), **sans conversion en chaîne**. Puis `stats(*notes, arrondi=2)` qui renvoie un dictionnaire `{"min": ..., "max": ..., "moyenne": ...}`.

**Exercice 2 · NumPy (6 pts).** Soit `a = np.arange(1, 13).reshape(3, 4)`.
1. Somme de chaque ligne ; moyenne de chaque colonne.
2. Les éléments pairs ; les éléments entre 4 et 9 inclus.
3. La sous-matrice des 2 dernières lignes et 2 dernières colonnes.
4. Le produit `a @ a.T` et sa forme. Est-elle inversible ?

**Exercice 3 · Pandas (9 pts).** Avec le DataFrame `notes` ci-dessous :
1. Ajouter une colonne `Moyenne` = 0,4 × CC + 0,6 × Examen.
2. Afficher les étudiants admis (Moyenne ≥ 10) triés par moyenne décroissante.
3. Moyenne et effectif par filière.
4. Ajouter `Ecart_Filiere` = Moyenne − moyenne de sa filière.
5. Garder uniquement les filières qui ont au moins 3 étudiants.

```python
import numpy as np
import pandas as pd

notes = pd.DataFrame({
    "Nom": ["Amine", "Sara", "Youssef", "Hanane", "Karim", "Lina", "Omar"],
    "Filiere": ["MIACSD", "MIACSD", "MIP", "MIACSD", "MIP", "SVI", "MIACSD"],
    "CC": [12, 15, 8, 9, 14, 11, 6],
    "Examen": [10, 16, 7, 12, 9, 13, 8],
})
```

### Corrigé

```python
def est_palindrome_nombre(n):
    original, inverse = n, 0
    while n > 0:
        inverse = inverse * 10 + n % 10
        n //= 10
    return inverse == original

def stats(*notes, arrondi=2):
    return {"min": min(notes), "max": max(notes), "moyenne": round(sum(notes) / len(notes), arrondi)}

print(est_palindrome_nombre(1331), est_palindrome_nombre(123), stats(12, 15, 8))
```

```sortie
True False {'min': 8, 'max': 15, 'moyenne': 11.67}
```

```python
a = np.arange(1, 13).reshape(3, 4)
print(a.sum(axis=1), a.mean(axis=0))
print(a[a % 2 == 0], a[(a >= 4) & (a <= 9)])
print(a[-2:, -2:])
g = a @ a.T
print(g.shape, round(np.linalg.det(g)))
```

```sortie
[10 26 42] [5. 6. 7. 8.]
[ 2  4  6  8 10 12] [4 5 6 7 8 9]
[[ 7  8]
 [11 12]]
(3, 3) 0
```

La matrice 3 × 3 `a @ a.T` a un déterminant **nul** (les lignes de `a` sont en progression régulière, donc liées) : elle **n'est pas inversible**. Une réponse « np.linalg.inv(g) » sans vérifier le déterminant perd les points.

```python
notes["Moyenne"] = (0.4 * notes["CC"] + 0.6 * notes["Examen"]).round(2)
admis = notes[notes["Moyenne"] >= 10].sort_values("Moyenne", ascending=False)
print(admis[["Nom", "Moyenne"]].values.tolist())
print(notes.groupby("Filiere")["Moyenne"].agg(["mean", "count"]).round(2))
notes["Ecart_Filiere"] = (notes["Moyenne"] - notes.groupby("Filiere")["Moyenne"].transform("mean")).round(2)
print(notes.groupby("Filiere").filter(lambda g: len(g) >= 3)["Nom"].tolist())
```

```sortie
[['Sara', 15.6], ['Lina', 12.2], ['Karim', 11.0], ['Amine', 10.8], ['Hanane', 10.8]]
         mean  count
Filiere             
MIACSD   11.1      4
MIP       9.2      2
SVI      12.2      1
['Amine', 'Sara', 'Hanane', 'Omar']
```

> [!retenir] Q3 = `agg` (1 ligne par filière), Q4 = `transform` (une valeur par étudiant), Q5 = `filter` (des filières entières gardées ou supprimées). Savoir lequel choisir, c'est la moitié des points de l'exercice.

## QCM de synthèse

```qcm
? Quelle écriture **inclut** la borne de fin ?
- `np.arange(0, 5)`
- `s.iloc[0:5]`
+ `s.loc["a":"e"]`
- `arr[0:5]`
= `.loc` (étiquettes) inclut la fin ; tout ce qui est positionnel l'exclut.

? Laquelle modifie le tableau **sur place** ?
- `np.sort(a)`
+ `a.sort()`
- `np.random.permutation(a)`
- `np.append(a, 1)`
= La méthode `a.sort()` trie a et renvoie None.

? `np.mean(M, axis=1)` pour M de forme (4, 6) a la forme :
+ (4,)
- (6,)
- (4, 6)
- un nombre
= L'axe 1 (colonnes) disparaît : une moyenne par ligne.

? Quelle opération Pandas garde le même nombre de lignes après un groupby ?
- `agg`
+ `transform`
- `filter`
- `count`
= transform recopie le résultat du groupe sur chaque ligne d'origine.

? `def f(x, liste=[])` est risqué parce que :
+ la même liste est réutilisée d'un appel à l'autre
- `liste` est en lecture seule
- les listes sont interdites en paramètre
- Python lève une SyntaxError
= La valeur par défaut est créée une seule fois ; on écrit `liste=None` puis on la crée dans la fonction.

? Quelle commande crée un tableau de 5 valeurs régulièrement espacées de 0 à 1 inclus ?
- `np.arange(0, 1, 5)`
+ `np.linspace(0, 1, 5)`
- `np.random.rand(5)`
- `np.arange(0, 1.25, 5)`
= linspace prend le nombre de points et inclut la borne de fin.

? Le type `"Int64"` (I majuscule) sert à :
+ garder des entiers malgré des valeurs manquantes
- stocker des entiers sur 64 bits sans NaN
- convertir du texte en nombres
- accélérer les calculs
= C'est l'entier « nullable » de Pandas ; les manques s'affichent <NA>.

? `np.random.default_rng(0)` appelé deux fois puis `.integers(1, 7, 3)` :
+ donne deux fois la même suite
- donne deux suites différentes
- lève une erreur
- donne toujours [1, 2, 3]
= Même graine, même suite : c'est la reproductibilité.
```

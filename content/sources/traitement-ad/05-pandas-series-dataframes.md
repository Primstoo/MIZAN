---
id: pandas-bases
titre: Pandas (1) · Series, DataFrames, fichiers et inspection
seance: Séance 5 · 27 octobre 2026
importance: 5
---

**Pandas** est la bibliothèque de manipulation de **données tabulaires** (lignes × colonnes, comme une feuille Excel ou une table SQL). Elle repose sur NumPy (et, depuis la version 2.0, peut utiliser PyArrow pour la mémoire).

```flux Où se place Pandas
Fichiers bruts (CSV, Excel, JSON, SQL) -> pd.read_...() -> DataFrame : nettoyer, filtrer, regrouper -> Graphiques (Matplotlib) ou Machine Learning (scikit-learn)
```

```python
import numpy as np
import pandas as pd
```

> [!prof] Toujours `import pandas as pd`, **jamais** `from pandas import *` : le préfixe `pd.` montre d'où vient chaque fonction. L'ancien objet 3D `Panel` n'existe plus ; pour plus de 2 dimensions on utilise un `MultiIndex`.

## 1. Les deux structures

| | **Series** | **DataFrame** |
|---|---|---|
| Dimensions | 1D : une colonne | 2D : lignes × colonnes |
| Repères | un **index** (étiquettes des lignes) | un index **+** des noms de colonnes |
| Types | un type par Series | un type **par colonne** (hétérogène) |
| Lien | — | **une collection de Series qui partagent le même index** |

```python
df = pd.DataFrame({
    "Etudiant": ["Sofia", "Youssef", "Amine", "Youness"],
    "Note_Examen": [14.5, 9.0, 16.5, 12.0],
    "Presence": [True, True, True, False],
})
notes = df["Note_Examen"]
print(type(notes).__name__)
df["Note_Bonus"] = df["Note_Examen"] + 2.0      # vectorisé : pas de boucle
print(df)
```

```sortie
Series
  Etudiant  Note_Examen  Presence  Note_Bonus
0    Sofia         14.5      True        16.5
1  Youssef          9.0      True        11.0
2    Amine         16.5      True        18.5
3  Youness         12.0     False        14.0
```

## 2. Créer une Series

```python
s1 = pd.Series([5, -2, 14])                                  # liste → index 0, 1, 2
s2 = pd.Series(np.array([-1, 12, 11]), index=["x", "y", "z"]) # index personnalisé
s3 = pd.Series({"Rabat": 577, "Fes": 1112, "Agadir": 421})   # clés → index
s4 = pd.Series({"Rabat": 577, "Fes": 1112, "Agadir": 421}, index=["Fes", "Rabat"])  # filtre
s5 = pd.Series(5, index=["a", "b", "c"])                     # scalaire répété
print(s2["y"], s3["Fes"], s4.tolist(), s5.tolist())
```

```sortie
12 1112 [1112, 577] [5, 5, 5]
```

> [!retenir] Quelle que soit la source (liste, tableau NumPy, dictionnaire, scalaire), une Series = **des valeurs 1D + un index**. Avec un scalaire, l'index est obligatoire. Mélanger nombres et texte force le type `object` : on évite pour les calculs.

## 3. Accéder aux valeurs d'une Series

| Écriture | Se base sur | Fin d'un découpage |
|---|---|---|
| `s.loc[...]` | les **étiquettes** (l'index) | **incluse** |
| `s.iloc[...]` | les **positions** 0 … n−1 | **exclue** |
| `s[condition]` | un masque booléen | — |

```python
s = pd.Series([5, -2, 14, 22, 50], index=["a", "b", "c", "d", "e"])
print(s.loc["d"], s.iloc[1])
print(s.loc["b":"d"].tolist(), s.iloc[1:3].tolist())
print(s[s > 14].to_dict())
```

```sortie
22 -2
[-2, 14, 22] [-2, 14]
{'d': 22, 'e': 50}
```

```grille s.loc["b":"d"] → fin INCLUSE (b, c, d)
#cols: a b c d e
#rows: pos étiquette valeur
0 1 2 3 4
a *b *c *d e
5 *-2 *14 *22 50
```

```grille s.iloc[1:3] → fin EXCLUE (positions 1 et 2)
#cols: a b c d e
#rows: pos étiquette valeur
0 !1 !2 3 4
a !b !c d e
5 !-2 !14 22 50
```

> [!piege] **`.loc` inclut la fin, `.iloc` l'exclut.** Question d'examen quasi certaine. `iloc` ignore les étiquettes, `loc` ignore l'ordre.

## 4. Transformer une Series

- `.astype(type)` : change le type (`float` → `int` **tronque**).
- `.tolist()` : convertit en liste Python.
- `.apply(fonction)` : applique une fonction (souvent une `lambda`) à **chaque** élément. Pour un calcul.
- `.map(dictionnaire)` : **remplace** chaque valeur par celle du dictionnaire. Pour encoder des catégories. Une valeur absente du dictionnaire devient `NaN`.

```python
s = pd.Series([1.5, 2.3, 5.3]).astype(int)
print(s.tolist(), s.apply(lambda x: x + 5).tolist())
filieres = pd.Series(["MIP", "SVI", "BCG", "SVI", "GEO"])
print(filieres.map({"MIP": 15, "SVI": 12, "BCG": 19}).tolist())
```

```sortie
[1, 2, 5] [6, 7, 10]
[15.0, 12.0, 19.0, 12.0, nan]
```

## 5. Créer un DataFrame

`pd.DataFrame(data=None, index=None, columns=None, dtype=None)`

| Source | Chaque élément devient… | Exemple |
|---|---|---|
| liste simple | une **ligne** d'une colonne | `pd.DataFrame(["MIP", "SVI"], columns=["Filiere"])` |
| liste de listes | une **ligne** | `[["Youssef", 22], ["Ali", 25]]` |
| **dict de listes** (le plus courant) | clé = **colonne** | `{"Nom": [...], "Age": [...]}` |
| liste de dicts | une **ligne** ; clé manquante → `NaN` | `[{"Nom": "Souad"}, ...]` |
| dict de Series | colonne, **alignée sur l'index** | index final = union des index |
| tableau NumPy 2D | une ligne | `pd.DataFrame(arr, columns=[...])` |

```python
df = pd.DataFrame({"Nom": ["Youssef", "Ali", "Souad"], "Age": [25, 30, 35],
                   "Ville": ["Rabat", "Agadir", "Beni Mellal"]}, index=["E1", "E2", "E3"])
print(df)
print(pd.DataFrame([{"Nom": "Youssef", "Age": 25}, {"Nom": "Souad"}]))
```

```sortie
        Nom  Age        Ville
E1  Youssef   25        Rabat
E2      Ali   30       Agadir
E3    Souad   35  Beni Mellal
       Nom   Age
0  Youssef  25.0
1    Souad   NaN
```

### Alignement sur l'index et le mystère des `float`

```python
df = pd.DataFrame({"Col1": pd.Series([5, -2, 3], index=["a", "b", "c"]),
                   "Col2": pd.Series([2, 6, 3, 14], index=["a", "b", "c", "d"])})
print(df)
```

```sortie
   Col1  Col2
a   5.0     2
b  -2.0     6
c   3.0     3
d   NaN    14
```

```etapes Pourquoi Col1 est passée en décimales
Union des index :: le DataFrame prend l'index a, b, c, d (union des deux Series).
Case vide :: Col1 n'a pas de valeur pour `d` → Pandas y met `NaN`.
NaN est un float :: un entier `int64` ne peut pas contenir `NaN`.
Conséquence :: toute la colonne Col1 est convertie en `float64` : 5 devient 5.0.
Solution :: le type **`"Int64"`** (I majuscule, entier « nullable ») garde les entiers et note le manque `<NA>`.
```

```python
print(pd.Series([1, 2, np.nan]).dtype, pd.Series([1, 2, np.nan], dtype="Int64").tolist())
```

```sortie
float64 [1, 2, <NA>]
```

> [!piege] Un tableau NumPy qui mélange texte et nombres (`[["Youssef", 25, 8000], ...]`) est entièrement en **texte** : le DataFrame obtenu aura des âges `"25"` (chaînes), pas des nombres. Il faudra `astype(int)` avant de calculer.

## 6. Lire et écrire des fichiers

### CSV : `pd.read_csv` / `df.to_csv`

Créons un petit fichier pour tester :

```python
with open("clients.csv", "w", encoding="utf-8") as f:
    f.write("# Export du 12/05/2026\nID,Nom,Age,Ville,Salaire\n1,Youssef,25,Safi,8000\n"
            "2,Souad,30,Agadir,N/A\n3,Ali,22,Rabat,6000\n4,Sara,28,Tanger,9500\n")
df = pd.read_csv("clients.csv", comment="#", na_values=["N/A"], index_col="ID",
                 usecols=["ID", "Nom", "Salaire"], nrows=3)
print(df)
```

```sortie
        Nom  Salaire
ID                  
1   Youssef   8000.0
2     Souad      NaN
3       Ali   6000.0
```

| Paramètre de `read_csv` | Rôle |
|---|---|
| `sep` | séparateur (`,` par défaut, `;`, `\t`) |
| `header` / `names` | ligne d'en-tête / noms imposés si le fichier n'en a pas |
| `usecols` | ne charger **que** ces colonnes (gain de mémoire) |
| `index_col` | colonne qui devient l'**index** |
| `nrows` | ne lire que les N premières lignes de données (tester un gros fichier) |
| `skiprows` | un **entier N** : sauter les N premières lignes ; une **liste** `[0, 2]` : sauter ces lignes précises ; une **lambda** possible |
| `na_values` | textes à lire comme `NaN` (`"N/A"`, `"?"`, `"-"`) |
| `comment` | lignes commençant par ce caractère ignorées |
| `parse_dates`, `dtype`, `encoding` | dates, types forcés (`{"Code_Postal": str}`), encodage |

```grille skiprows=2 vs skiprows=[0, 2] sur le même fichier
#cols: fichier skiprows=2 skiprows=[0,2]
#rows: ligne0 ligne1 ligne2 ligne3
# Metadonnees ~sautée ~sautée
# Titre ~sautée *en-tête
Nom,Prix *en-tête ~sautée
A,100 donnée donnée
```

> [!astuce] Pour un **code postal** ou un identifiant, force `dtype={"Code_Postal": str}` : sinon `"01200"` devient le nombre `1200`.

**Écrire** : `df.to_csv(chemin, sep=",", index=True, header=True, columns=None, na_rep="", float_format=None, mode="w", encoding=...)`.

```python
df = pd.DataFrame({"Nom": ["Youssef", "Sara"], "Salaire": [8500.507, np.nan]})
print(df.to_csv())                                     # sans chemin : renvoie le texte
print(df.to_csv(sep=";", index=False, na_rep="NON_RENSEIGNE", float_format="%.2f"))
```

```sortie
,Nom,Salaire
0,Youssef,8500.507
1,Sara,

Nom;Salaire
Youssef;8500.51
Sara;NON_RENSEIGNE
```

> [!prof] En production : `index=False` (sauf si l'index est une vraie clé comme un ID ou une date), `sep=";"` et `encoding="utf-8-sig"` pour qu'Excel ouvre le fichier correctement avec les accents et l'arabe. `mode="a"` ajoute à la fin au lieu d'écraser.

### Excel : `pd.read_excel` / `df.to_excel`

Nécessite le moteur **openpyxl** pour les `.xlsx`.

```python
with pd.ExcelWriter("ventes.xlsx") as w:
    pd.DataFrame({"Produit": ["PC", "Souris"], "Prix": [1500, 25]}).to_excel(w, sheet_name="Janvier", index=False)
    pd.DataFrame({"Produit": ["Ecran"], "Prix": [900]}).to_excel(w, sheet_name="Fevrier", index=False)
une = pd.read_excel("ventes.xlsx", sheet_name="Fevrier")
toutes = pd.read_excel("ventes.xlsx", sheet_name=None)
print(type(une).__name__, type(toutes).__name__, list(toutes))
print(toutes["Janvier"]["Prix"].sum())
```

```sortie
DataFrame dict ['Janvier', 'Fevrier']
1525
```

> [!retenir] `sheet_name` = un entier ou un nom → **un DataFrame**. Une liste ou `None` (toutes les feuilles) → **un dictionnaire** `{nom_feuille: DataFrame}`. Autres paramètres utiles : `header=2` (l'en-tête est à la 3e ligne), `usecols="A,C"` ou `"A:D"`, `na_values`, `dtype`, `skiprows`.

### JSON : `pd.read_json` / `df.to_json`

Le paramètre **`orient`** décrit la forme du JSON :

| `orient` | Forme | Usage |
|---|---|---|
| `"records"` | `[{"A": 10, "B": 20}, {"A": 30, "B": 40}]` | APIs web (le plus courant) |
| `"columns"` (défaut d'un DataFrame) | `{"A": {"0": 10, "1": 30}, ...}` | |
| `"split"` | `{"columns": [...], "data": [[...]]}` | |

```python
df = pd.DataFrame({"Nom": ["Youssef", "Sara"], "Ville": ["Fès", "Salé"]})
print(df.to_json(orient="records", force_ascii=False))
from io import StringIO
print(pd.read_json(StringIO('[{"A": 10, "B": 20}, {"A": 30, "B": 40}]'), orient="records"))
```

```sortie
[{"Nom":"Youssef","Ville":"Fès"},{"Nom":"Sara","Ville":"Salé"}]
    A   B
0  10  20
1  30  40
```

> [!astuce] `force_ascii=False` garde les accents et l'arabe lisibles (sinon `Fès` devient `Fès`). `indent=4` rend le fichier lisible par un humain.

## 7. Inspecter un DataFrame

```python
df = pd.DataFrame({"Nom": ["Saad", "Amina", "Ali", "Hanane", "Yassine", "Sara"],
                   "Age": [33, 42, 24, 21, 19, 28],
                   "Salaire": [9000, 5000, 10000, 10500, 15000, 7000]})
print(df.head(2))
print(df.tail(1))
print(df.shape, df.size, df.ndim, df.empty)
print(df["Age"].describe().round(2).to_dict())
```

```sortie
     Nom  Age  Salaire
0   Saad   33     9000
1  Amina   42     5000
    Nom  Age  Salaire
5  Sara   28     7000
(6, 3) 18 2 False
{'count': 6.0, 'mean': 27.83, 'std': 8.57, 'min': 19.0, '25%': 21.75, '50%': 26.0, '75%': 31.75, 'max': 42.0}
```

| Méthode / attribut | Renvoie | Sert à |
|---|---|---|
| `head(n)` / `tail(n)` | les n premières / dernières lignes (5 par défaut) | jeter un œil |
| `describe()` | count, mean, std, min, quartiles 25/50/75 %, max | statistiques des colonnes **numériques** |
| `describe(include="all")` | + pour le texte : `count`, `unique`, `top` (valeur la plus fréquente), `freq` | |
| `info()` | **affiche** (renvoie `None`) : types, valeurs non nulles, mémoire | **premier réflexe** après un chargement |
| `.T` | lignes ↔ colonnes | |
| `.shape`, `.size`, `.ndim`, `.empty` | (lignes, colonnes), nb de cases, toujours 2, vide ? | |
| `.axes`, `.dtypes`, `.values` | [index, colonnes], type par colonne, tableau NumPy | |

> [!piege] Le **50 %** de `describe()` est la **médiane**, pas la moyenne. Et `count` compte les valeurs **non manquantes** : s'il est plus petit que le nombre de lignes, il y a des `NaN`.

> [!attention] Avec **Pandas 3**, les colonnes de texte s'affichent avec le type `str` au lieu de `object` (Pandas 2). Le cours a été écrit avec Pandas 2 : ne sois pas surpris par cette différence.

## QCM du chapitre

```qcm
? Quelle structure Pandas est une collection de Series partageant le même index ?
- Series
+ DataFrame
- ndarray
- Panel
= Chaque colonne d'un DataFrame est une Series ; elles partagent l'index des lignes.

? `s = pd.Series([10, 20, 30, 40], index=["a", "b", "c", "d"])`. Que vaut `s.loc["b":"c"].tolist()` ?
- `[20]`
+ `[20, 30]`
- `[20, 30, 40]`
- `[10, 20]`
= Avec `.loc`, la borne de fin est incluse.

? Même Series : que vaut `s.iloc[1:3].tolist()` ?
+ `[20, 30]`
- `[20, 30, 40]`
- `[10, 20, 30]`
- `[30]`
= Positions 1 et 2 : `.iloc` exclut la fin.

? `pd.Series(["A", "B"]).map({"A": 1})` donne :
- `[1, "B"]`
+ `[1.0, NaN]`
- une erreur
- `[1, 0]`
= Une valeur absente du dictionnaire devient NaN, ce qui force le type float.

? Pourquoi une colonne d'entiers devient-elle `float64` quand une valeur manque ?
- Pandas arrondit toujours les entiers
+ `NaN` est un float, et un `int64` ne peut pas le contenir
- À cause de `read_csv`
- Parce que l'index est mélangé
= Pour garder des entiers, on utilise le type nullable `"Int64"`.

? Dans `pd.read_csv("f.csv", skiprows=[0, 2])` :
- on saute les 2 premières lignes
+ on saute uniquement les lignes 0 et 2 du fichier
- on ne lit que les lignes 0 et 2
- on saute une ligne sur deux
= Une liste désigne des lignes précises ; un entier N saute les N premières.

? `pd.read_excel("f.xlsx", sheet_name=None)` renvoie :
- le DataFrame de la première feuille
+ un dictionnaire {nom de feuille : DataFrame}
- une liste de DataFrames
- None
= None (ou une liste) charge plusieurs feuilles, rangées dans un dictionnaire.

? Quel paramètre de `to_csv` évite d'écrire la colonne 0, 1, 2… ?
- `header=False`
+ `index=False`
- `sep=";"`
- `columns=None`
= `index=False` n'écrit pas l'index des lignes.

? Dans `df.describe()`, la ligne `50%` correspond à :
- la moyenne
+ la médiane
- la moitié du maximum
- l'écart-type
= Le 50e percentile est la médiane (Q2).

? `df.info()` renvoie :
- un DataFrame de statistiques
+ None : il affiche un résumé technique (types, non-nuls, mémoire)
- la forme du DataFrame
- les 5 premières lignes
= info() affiche puis renvoie None ; c'est le premier réflexe après un chargement.

? Pour un DataFrame de 120 lignes et 5 colonnes, `df.size` vaut :
- 120
- 5
+ 600
- (120, 5)
= size = nombre de cases = lignes × colonnes ; shape = (120, 5).

? Quel `orient` produit `[{"Nom": "Ali"}, {"Nom": "Sara"}]` ?
+ `"records"`
- `"columns"`
- `"split"`
- `"index"`
= records = une liste d'objets, un par ligne : le format des APIs web.
```

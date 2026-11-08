---
id: pandas-manipulation
titre: Pandas (2) · sélectionner, modifier, trier, agréger, regrouper
seance: Séance 6 · 1er novembre 2026
importance: 5
---

Tous les exemples de ce chapitre utilisent ce petit jeu de données :

```python
import pandas as pd

df = pd.DataFrame({
    "Nom": ["Ali", "Amina", "Saad", "Hanane", "Yassine"],
    "Age": [24, 42, 33, 21, 19],
    "Departement": ["IT", "RH", "IT", "Ventes", "IT"],
    "Salaire": [10000, 5000, 9000, 10500, 15000],
})
print(df)
```

```sortie
       Nom  Age Departement  Salaire
0      Ali   24          IT    10000
1    Amina   42          RH     5000
2     Saad   33          IT     9000
3   Hanane   21      Ventes    10500
4  Yassine   19          IT    15000
```

## 1. Sélectionner des colonnes

| Écriture | Résultat |
|---|---|
| `df["Nom"]` | une **Series** (1D) |
| `df[["Nom", "Age"]]` (doubles crochets) | un **DataFrame** (2D), même pour une seule colonne |
| `df.Nom` | Series ; ne marche pas si le nom contient un espace ou s'appelle comme une méthode (`count`, `shape`) |
| `df.loc[:, "Nom"]` / `df.iloc[:, 0]` | par nom / par position, avec `:` = toutes les lignes |

```python
print(type(df["Nom"]).__name__, type(df[["Nom"]]).__name__)
print(df.iloc[:, [0, 3]].columns.tolist())
```

```sortie
Series DataFrame
['Nom', 'Salaire']
```

> [!prof] En production, préfère `df["Nom"]` à `df.Nom` : l'attribut casse dès qu'un nom contient un espace ou entre en conflit avec une méthode Pandas.

## 2. Ajouter, supprimer, renommer des colonnes

| Méthode | Position | Modifie `df` ? |
|---|---|---|
| `df["Prime"] = ...` | à la fin (droite) | **oui, sur place** |
| `df.insert(loc, "Col", valeurs)` | à la **position** loc | **oui, sur place** |
| `df.assign(Col=...)` | à la fin | **non** : renvoie une copie (à réaffecter) |
| `df.drop(columns=[...])` ou `drop([...], axis=1)` | — | non (sauf `inplace=True`) |
| `del df["Col"]` | — | **oui**, une seule colonne |
| `df.rename(columns={"ancien": "nouveau"})` | — | non (sauf `inplace=True`) |

```python
d = df.copy()
d["Prime"] = d["Salaire"] * 0.10                     # opération vectorisée
d.insert(1, "Ville", ["Rabat", "Fes", "Safi", "Agadir", "Tanger"])
d2 = d.assign(Total=d["Salaire"] + d["Prime"])        # d n'est pas modifié
d2 = d2.drop(columns=["Ville"]).rename(columns={"Nom": "Employe"})
del d2["Prime"]
print(d.columns.tolist())
print(d2.columns.tolist())
```

```sortie
['Nom', 'Ville', 'Age', 'Departement', 'Salaire', 'Prime']
['Employe', 'Age', 'Departement', 'Salaire', 'Total']
```

> [!piege] `df.assign(...)`, `df.drop(...)`, `df.rename(...)`, `df.sort_values(...)` **renvoient une copie**. Écrire `df.drop(columns=["X"])` seul ne change rien : il faut `df = df.drop(...)` ou `inplace=True`.

### Le paramètre `axis`, enfin clair

```grille drop(..., axis=0) supprime une LIGNE · drop(..., axis=1) supprime une COLONNE
#cols: Nom Age Salaire
#rows: 0 1 2
Ali 24 *10000
~Amina ~42 ~5000
Saad 33 *9000
```

> [!retenir] L'axe indique **le sens dans lequel Pandas se déplace**. `axis=0` : de haut en bas. `drop(axis=0)` cherche une étiquette **de ligne** ; `sum(axis=0)` écrase les lignes → **une somme par colonne**. `axis=1` : de gauche à droite. `drop(axis=1)` cherche **une colonne** ; `sum(axis=1)` → **une somme par ligne**. Pour éviter la confusion avec `drop`, écris `drop(columns=...)` ou `drop(index=...)`.

## 3. Sélectionner des lignes

```python
print(df.loc[2, "Nom"], df.iloc[2, 0])
print(df.loc[[0, 2], ["Nom", "Age", "Salaire"]])
print(df[df["Age"] > 30]["Nom"].tolist())
print(df[(df["Departement"] == "IT") & (df["Salaire"] >= 10000)]["Nom"].tolist())
print(df[(df["Age"] < 20) | (df["Departement"] == "RH")]["Nom"].tolist())
```

```sortie
Saad Saad
    Nom  Age  Salaire
0   Ali   24    10000
2  Saad   33     9000
['Amina', 'Saad']
['Ali', 'Yassine']
['Amina', 'Yassine']
```

```grille df.loc[[0, 2], ["Nom", "Age", "Salaire"]] : on croise des lignes et des colonnes
#cols: Nom Age Departement Salaire
#rows: 0 1 2 3 4
*Ali *24 ~IT *10000
~Amina ~42 ~RH ~5000
*Saad *33 ~IT *9000
~Hanane ~21 ~Ventes ~10500
~Yassine ~19 ~IT ~15000
```

> [!retenir] Syntaxe universelle : **`df.loc[lignes, colonnes]`** avec des **étiquettes** ; **`df.iloc[lignes, colonnes]`** avec des **positions**. `:` = tout. Conditions multiples : `&`, `|`, et **parenthèses obligatoires** autour de chaque condition.

## 4. Ajouter, supprimer, renommer des lignes

```python
nouveau = pd.DataFrame([{"Nom": "Sara", "Age": 28, "Departement": "RH", "Salaire": 7000}])
d = pd.concat([df, nouveau], ignore_index=True)        # df.append n'existe plus
d.loc[len(d)] = ["Omar", 30, "IT", 8000]              # ajout à une étiquette précise
d = d.drop(index=[1, 3])                               # par étiquettes
print(d.index.tolist())
d = d.reset_index(drop=True)                           # renumérote 0, 1, 2...
print(d.index.tolist(), d.drop(d.index[0])["Nom"].tolist()[:2])
print(d.rename(index={0: "premier"}).index.tolist()[:2])
```

```sortie
[0, 2, 4, 5, 6]
[0, 1, 2, 3, 4] ['Saad', 'Yassine']
['premier', 1]
```

- `pd.concat([df1, df2])` (liste de DataFrames) remplace `append`, **supprimée en Pandas 2.0**.
- Après un `concat` ou un filtre, l'index garde ses anciens numéros (doublons, trous) : `ignore_index=True` ou `reset_index(drop=True)`. Sans `drop=True`, l'ancien index devient une colonne.
- `drop` attend des **étiquettes**. Pour supprimer la 2e ligne **par position** : `df.drop(df.index[1])`.

## 5. Réindexer : `reindex`

`reindex` **conforme** le DataFrame à une nouvelle liste d'étiquettes : il réordonne, et crée des lignes `NaN` pour les étiquettes inconnues. (À ne pas confondre avec `rename`, qui change les noms.)

```python
s = pd.Series([10, 20, 30], index=[0, 2, 4])
print(s.reindex([0, 1, 2, 3, 4, 5]).tolist())
print(s.reindex([0, 1, 2, 3, 4, 5], method="ffill").tolist())
print(s.reindex([0, 1, 2, 3, 4, 5], method="bfill").tolist())
print(s.reindex([0, 1, 2, 3, 4, 5], fill_value=100).tolist())
print(pd.Series([10, 40], index=[0, 3]).reindex(range(5), method="ffill", limit=1).tolist())
```

```sortie
[10.0, nan, 20.0, nan, 30.0, nan]
[10, 10, 20, 20, 30, 30]
[10.0, 20.0, 20.0, 30.0, 30.0, nan]
[10, 100, 20, 100, 30, 100]
[10.0, 10.0, nan, 40.0, 40.0]
```

```grille method="ffill" : on recopie la dernière valeur connue vers l'avant
#cols: 0 1 2 3 4 5
#rows: avant ffill bfill
10 ~NaN 20 ~NaN 30 ~NaN
10 *10 20 *20 30 *30
10 !20 20 !30 30 ~NaN
```

| Option | Effet |
|---|---|
| `method="ffill"` (`"pad"`) | propage la dernière valeur valide vers l'avant |
| `method="bfill"` (`"backfill"`) | prend la valeur valide suivante |
| `method="nearest"` | la plus proche (index trié, numérique) |
| `fill_value=v` | remplit les nouvelles lignes par une constante |
| `limit=n` | au plus n trous consécutifs remplis |

`a.reindex_like(b)` donne à `a` exactement l'index et les colonnes de `b` (utile en Machine Learning pour que le jeu de test ait les mêmes colonnes que le jeu d'entraînement).

## 6. Parcourir un DataFrame

| Boucle | Donne | Remarque |
|---|---|---|
| `for col in df:` | les **noms de colonnes** | souvent une surprise |
| `for nom, serie in df.items():` | (nom, Series) par colonne | |
| `for idx, ligne in df.iterrows():` | (index, Series) par ligne | lent ; peut changer les types |
| `for ligne in df.itertuples():` | un *namedtuple* par ligne : `ligne.Index`, `ligne.Age` | **plus rapide**, garde les types |

```python
print(list(df)[:2])
for ligne in df.head(2).itertuples():
    print(ligne.Index, ligne.Nom, ligne.Salaire)
```

```sortie
['Nom', 'Age']
0 Ali 10000
1 Amina 5000
```

> [!prof] Boucler sur les lignes est **très lent**. Cherche toujours d'abord l'opération vectorisée (`df["A"] * df["B"]`). Si une boucle est inévitable : `itertuples()` plutôt que `iterrows()`.

## 7. Trier

```python
print(df.sort_values(by="Salaire", ascending=False)["Nom"].tolist())
print(df.sort_values(by=["Departement", "Age"], ascending=[True, False])[["Departement", "Nom"]].values.tolist())
print(df.sort_index(ascending=False).index.tolist(), df.sort_index(axis=1).columns.tolist())
```

```sortie
['Yassine', 'Hanane', 'Ali', 'Saad', 'Amina']
[['IT', 'Saad'], ['IT', 'Ali'], ['IT', 'Yassine'], ['RH', 'Amina'], ['Ventes', 'Hanane']]
[4, 3, 2, 1, 0] ['Age', 'Departement', 'Nom', 'Salaire']
```

- `sort_values(by=...)` : par **contenu**. Avec une liste, tri hiérarchique : d'abord la 1re colonne, la 2e départage les égalités. `ascending` accepte aussi une liste.
- `sort_index()` : par **étiquettes** des lignes ; `axis=1` trie l'**ordre des colonnes**.

## 8. Transformer : `apply` et `map`

| Méthode | Reçoit | Usage |
|---|---|---|
| `serie.apply(f)` | chaque **valeur** | formule personnalisée |
| `df.apply(f)` (axis=0) | chaque **colonne** (une Series) | statistique par colonne |
| `df.apply(f, axis=1)` | chaque **ligne** (une Series) | calcul qui combine plusieurs colonnes d'un individu |
| `df.map(f)` (ex-`applymap`) | chaque **case** | transformation cellule par cellule |

```python
print(df["Salaire"].apply(lambda s: s * 1.05).tolist()[:2])
print(df.apply(lambda ligne: f"{ligne['Nom']} ({ligne['Departement']})", axis=1).tolist()[:2])
print(df[["Age", "Salaire"]].apply(lambda col: col.max() - col.min()).to_dict())
print(df[["Nom", "Departement"]].head(2).map(str.upper).values.tolist())
```

```sortie
[10500.0, 5250.0]
['Ali (IT)', 'Amina (RH)']
{'Age': 23, 'Salaire': 10000}
[['ALI', 'IT'], ['AMINA', 'RH']]
```

> [!attention] `applymap()` du cours a été **renommée `map()`** en Pandas 2.1, puis **supprimée en Pandas 3**. Si `df.applymap` plante chez toi, écris `df.map`. Le principe est identique : une fonction appliquée à chaque case.

## 9. Agréger : `agg`

**Agréger** = résumer beaucoup de valeurs en une seule (somme, moyenne, max…). `agg()` (alias `aggregate()`) permet **plusieurs** fonctions à la fois, ou des fonctions **différentes par colonne**.

```python
num = df[["Age", "Salaire"]]                      # pas de texte : mean planterait
print(num.agg(["sum", "min"]))
print(df.agg({"Age": ["mean"], "Salaire": ["max"]}).fillna("-"))
def etendue(x):
    return x.max() - x.min()
print(num.agg(etendue).tolist(), df["Departement"].unique().tolist(), df["Departement"].nunique())
```

```sortie
     Age  Salaire
sum  139    49500
min   19     5000
       Age  Salaire
mean  27.8        -
max      -  15000.0
[23, 10000] ['IT', 'RH', 'Ventes'] 3
```

- `count()` : nombre de valeurs **non manquantes** par colonne. `unique()` : les valeurs distinctes. `nunique()` : **combien** il y en a.
- `df.select_dtypes(include="number")` garde toutes les colonnes numériques, même celles ajoutées plus tard (plus robuste qu'une liste écrite à la main). `include="object"` (ou `"str"` en Pandas 3) pour le texte.

## 10. Regrouper : `groupby` (Split · Apply · Combine)

```flux Le paradigme Split-Apply-Combine
Split : découper en groupes (une valeur de la clé = un groupe) -> Apply : calculer sur chaque groupe -> Combine : rassembler les résultats
```

```python
ventes = pd.DataFrame({
    "Ville": ["Casablanca", "Casablanca", "Marrakech", "Marrakech", "Marrakech"],
    "Vendeur": ["Amine", "Khadija", "Youssef", "Salma", "Mehdi"],
    "Ventes_DH": [20000, 30000, 15000, 10000, 5000],
})
g = ventes.groupby("Ville")
print(g["Ventes_DH"].agg(["sum", "mean"]))
print(g.get_group("Casablanca")["Vendeur"].tolist())
```

```sortie
              sum     mean
Ville                     
Casablanca  50000  25000.0
Marrakech   30000  10000.0
['Amine', 'Khadija']
```

```etapes Split · Apply · Combine sur les ventes
Split :: Casablanca → [20000, 30000] ; Marrakech → [15000, 10000, 5000]
Apply (sum) :: Casablanca : 50000 ; Marrakech : 30000
Apply (mean) :: Casablanca : 25000 ; Marrakech : 10000
Combine :: un tableau d'**une ligne par ville** (5 lignes → 2 lignes)
```

Les trois façons d'appliquer, à bien distinguer :

| | `agg` | `transform` | `filter` |
|---|---|---|---|
| Fait | un résumé par groupe | un résumé **recopié sur chaque ligne** | garde ou supprime des **groupes entiers** |
| Taille du résultat | **1 ligne par groupe** | **même nombre de lignes** qu'au départ | ≤ au départ |
| Exemple | total par ville | total de la ville à côté de chaque vendeur | villes dont le total > 40 000 DH |

```python
ventes["Total_Ville"] = g["Ventes_DH"].transform("sum")
ventes["Part_%"] = (100 * ventes["Ventes_DH"] / ventes["Total_Ville"]).round(1)
print(ventes)
print(ventes.groupby("Ville").filter(lambda x: x["Ventes_DH"].sum() > 40000)["Vendeur"].tolist())
```

```sortie
        Ville  Vendeur  Ventes_DH  Total_Ville  Part_%
0  Casablanca    Amine      20000        50000    40.0
1  Casablanca  Khadija      30000        50000    60.0
2   Marrakech  Youssef      15000        30000    50.0
3   Marrakech    Salma      10000        30000    33.3
4   Marrakech    Mehdi       5000        30000    16.7
['Amine', 'Khadija']
```

> [!astuce] `groupby(["Departement", "Ville"])` regroupe sur **plusieurs clés** (index hiérarchique). On peut parcourir les groupes : `for cle, groupe in df.groupby("Ville"):`.

## QCM du chapitre

```qcm
? `df[["Age"]]` renvoie :
- une Series
+ un DataFrame d'une colonne
- une liste
- une erreur
= Les doubles crochets gardent le format DataFrame, même pour une seule colonne.

? Après `df.drop(columns=["Age"])` (sans réaffectation ni inplace), la colonne Age :
+ est toujours dans df
- est supprimée de df
- est mise à NaN
- est déplacée à la fin
= drop renvoie une copie ; il faut `df = df.drop(...)` ou `inplace=True`.

? Quelle méthode ajoute une colonne à une position précise ?
- `assign`
+ `insert`
- `concat`
- `rename`
= `df.insert(loc, nom, valeurs)` place la colonne à l'indice loc.

? `df.sum(axis=1)` renvoie :
- une somme par colonne
+ une somme par ligne
- la somme totale
- une erreur
= axis=1 parcourt de gauche à droite : les colonnes sont écrasées, il reste une valeur par ligne.

? Comment ajouter les lignes de df2 sous df1 en Pandas 2 et plus ?
- `df1.append(df2)`
+ `pd.concat([df1, df2])`
- `df1 + df2`
- `df1.merge(df2)`
= `append` a été supprimé ; on passe une **liste** à `pd.concat`.

? Quel filtre est correct ?
- `df[df.Age > 20 and df.Salaire > 9000]`
+ `df[(df.Age > 20) & (df.Salaire > 9000)]`
- `df[df.Age > 20 & df.Salaire > 9000]`
- `df.loc[df.Age > 20, df.Salaire > 9000]`
= `&` avec des parenthèses autour de chaque condition.

? `pd.Series([1, 2], index=[0, 2]).reindex([0, 1, 2], method="ffill")` vaut :
+ `[1, 1, 2]`
- `[1, 2, 2]`
- `[1, NaN, 2]`
- `[1, 0, 2]`
= ffill recopie la dernière valeur connue (1) dans le trou.

? Quelle boucle est la plus rapide et garde les types ?
- `iterrows()`
+ `itertuples()`
- `for col in df`
- `items()`
= itertuples renvoie des namedtuples ; iterrows renvoie des Series (lent, peut convertir les types).

? `df.apply(f, axis=1)` envoie à f :
- chaque colonne
+ chaque ligne
- chaque case
- le DataFrame entier
= axis=1 : de gauche à droite, une ligne à la fois (pour combiner plusieurs colonnes d'un individu).

? Après `groupby("Ville")["Ventes"].transform("sum")` sur 5 lignes et 2 villes, on obtient :
- 2 valeurs
+ 5 valeurs (le total de la ville recopié sur chaque ligne)
- 1 valeur
- une erreur
= transform garde la taille d'origine ; c'est agg qui réduit à une ligne par groupe.

? `groupby("Ville").filter(lambda g: g["Ventes"].sum() > 40000)` :
- garde les vendeurs dont les ventes dépassent 40 000
+ garde toutes les lignes des villes dont le total dépasse 40 000
- renvoie un booléen par ville
- calcule la somme par ville
= filter garde ou supprime des groupes entiers.

? `df["Ville"].nunique()` renvoie :
- la liste des villes distinctes
+ le nombre de villes distinctes
- la ville la plus fréquente
- le nombre de lignes
= unique() donne les valeurs, nunique() leur nombre.
```

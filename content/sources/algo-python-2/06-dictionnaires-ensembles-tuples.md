---
id: dictionnaires-ensembles-tuples
titre: Listes, dictionnaires, ensembles et tuples
seance: Chapitre IV + fonctions prédéfinies
importance: 5
---

## Avant de commencer

Il faut savoir créer une liste, lire `L[i]` et la parcourir avec `for`.

```exercice Vérifie ton prérequis
? `L = [4, 7, 9]`. Que vaut `L[1]` ?
reponse: 7
= Les indices commencent à 0 : `L[0] = 4`, `L[1] = 7`.
```

## Comment aborder ce chapitre

> [!astuce] **Choisis la structure selon la question que tu poses.** « Le i-ème ? » → liste. « La valeur de cette clé ? » → dictionnaire. « Est-il dedans, sans doublon ? » → ensemble. « Valeurs fixes ? » → tuple.

> [!piege] Croire qu'un ensemble garde l'ordre ou qu'on peut écrire `S[0]`. Un `set` n'est pas ordonné : pas d'indice, et `pop()` retire un élément imprévisible.

À la fin, tu connais les méthodes du polycopié (append, extend, insert, remove, pop, index, count, sort, reverse, add, update, discard, clear, keys, values, items, get, popitem) et ce qu'elles renvoient.

## Idée 1 · Quatre structures, quatre usages

| Structure | Écriture | Ordonnée | Modifiable | Doublons | Type (typing) |
|---|---|---|---|---|---|
| liste | `[1, 2]` | oui | oui | oui | `List[int]` |
| tuple | `(10, 20)` | oui | **non** | oui | `Tuple[int, int]` |
| ensemble | `{1, 2}` | **non** | oui | **non** | `Set[int]` |
| dictionnaire | `{"Alice": 123456}` | oui (3.7+) | oui | clés uniques | `Dict[str, int]` |

```html
<svg viewBox="0 0 560 100" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Un dictionnaire associe chaque clé à une valeur : Alice vers 123456, Bob vers 789012.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="40" y="15" width="110" height="30" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="95" y="35" text-anchor="middle">"Alice"</text>
<rect x="40" y="55" width="110" height="30" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="95" y="75" text-anchor="middle">"Bob"</text>
<text x="200" y="35">→</text><text x="200" y="75">→</text>
<rect x="240" y="15" width="110" height="30" rx="6" fill="none" stroke="currentColor"/><text x="295" y="35" text-anchor="middle">123456</text>
<rect x="240" y="55" width="110" height="30" rx="6" fill="none" stroke="currentColor"/><text x="295" y="75" text-anchor="middle">789012</text>
<text x="380" y="55">clé → valeur</text></g></svg>
```

```python
from typing import Dict, Set, Tuple
annuaire: Dict[str, int] = {"Alice": 123456, "Bob": 789012}
print("Numéro d'Alice :", annuaire["Alice"])
nombres: Set[int] = {1, 2, 3, 2}
print(nombres, 2 in nombres)
coordonnees: Tuple[int, int] = (10, 20)
x, y = coordonnees          # déballage
print(x, y)
```

```sortie
Numéro d'Alice : 123456
{1, 2, 3} True
10 20
```

## Idée 2 · Les méthodes des listes

```python
nombres = [1, 2, 4]
nombres.append(5)        # ajoute à la fin
nombres.insert(2, 3)     # insère 3 à l'indice 2
nombres.extend([6, 2])   # ajoute plusieurs éléments
print(nombres)
nombres.remove(2)        # supprime la PREMIÈRE occurrence de 2
print(nombres)
print(nombres.pop(), nombres.pop(0), nombres)
print(nombres.index(4), nombres.count(4))
nombres.sort(reverse=True)
print(nombres)
nombres.reverse()
print(nombres)
```

```sortie
[1, 2, 3, 4, 5, 6, 2]
[1, 3, 4, 5, 6, 2]
2 1 [3, 4, 5, 6]
1 1
[6, 5, 4, 3]
[3, 4, 5, 6]
```

> [!piege] `append([6, 2])` ajoute **une** case contenant une liste ; `extend([6, 2])` ajoute **deux** cases. Et `remove(x)` enlève une **valeur**, `pop(i)` enlève un **indice** et renvoie l'élément.

Un tuple n'a que deux méthodes : `count()` et `index()` (il est immuable).

> [!attention] Le polycopié type un tuple de longueur variable `Tuple[int]`. Ce type veut dire « tuple d'**un seul** entier ». Pour une longueur quelconque, écris `Tuple[int, ...]` (ou `tuple[int, ...]`).

## Idée 3 · Les méthodes des ensembles

```python
e = {1, 2}
e.add(1)                 # déjà présent : aucun effet
e.update([2, 3, 4])      # ajoute plusieurs éléments
print(e)
e.remove(2)              # KeyError si absent
e.discard(9)             # aucun effet si absent, pas d'erreur
print(e)
e.clear()
print(e)
```

```sortie
{1, 2, 3, 4}
{1, 3, 4}
set()
```

> [!retenir] `remove` lève `KeyError` si l'élément est absent ; `discard` ne dit rien. `pop()` sur un ensemble retire un élément **arbitraire**.

## Idée 4 · Les méthodes des dictionnaires

```python
d = {'a': 1, 'b': 2, 'c': 3}
print(d.keys())
print(list(d.values()), list(d.items())[0])
print(d.get('a'), d.get('z'), d.get('z', 'Non trouvé'))
print(d.pop('b'), d)
print(d.popitem(), d)
for cle, valeur in d.items():
    print(cle, "->", valeur)
```

```sortie
dict_keys(['a', 'b', 'c'])
[1, 2, 3] ('a', 1)
1 None Non trouvé
2 {'a': 1, 'c': 3}
('c', 3) {'a': 1}
a -> 1
```

```etapes Compter les occurrences avec un dictionnaire
Crée un dictionnaire vide :: `compte = {}`
Parcours les éléments :: `for x in L:`
Ajoute 1 à la bonne clé :: `compte[x] = compte.get(x, 0) + 1` (get évite la KeyError la première fois)
Résultat :: pour `L = ["a", "b", "a"]`, `compte = {'a': 2, 'b': 1}`
```

## S'exercer

```exercice Manipuler les collections
? `L = [3, 1, 3, 2]`. Que vaut `L.count(3)` ?
reponse: 2
= 3 apparaît deux fois.

? `d = {'x': 5}`. Que renvoie `d.get('y', 0)` ?
reponse: 0
= La clé est absente : on obtient la valeur par défaut.

? Élimine les doublons de `[4, 4, 1, 1, 2]` et renvoie une liste triée.
= `sorted(set([4, 4, 1, 1, 2]))` donne `[1, 2, 4]`.

? Écris `compter(L)` qui renvoie le dictionnaire des occurrences.
= `compte = {}` ; `for x in L: compte[x] = compte.get(x, 0) + 1` ; `return compte`.
```

## Flashcards

```cartes
`append` vs `extend` :: append ajoute un élément ; extend ajoute tous les éléments d'un itérable.
`remove` vs `pop` sur une liste :: remove(valeur) supprime la 1re occurrence ; pop(indice) supprime et renvoie (dernier par défaut).
`sort(reverse=True)` :: Trie la liste sur place par ordre décroissant.
Méthodes d'un tuple :: count() et index() seulement.
`discard` vs `remove` sur un set :: discard ne lève pas d'erreur si l'élément est absent.
`d.get(k, defaut)` :: Valeur de k, ou defaut (None sinon) si k est absente.
`d.popitem()` :: Supprime et renvoie la dernière paire insérée (Python 3.7+).
Ensemble vide :: `set()` (car `{}` est un dictionnaire vide).
`Tuple[int, ...]` :: Tuple d'entiers de longueur quelconque.
```

## QCM du chapitre

```qcm
? `L = [1, 2, 3, 2, 4]`, `L.remove(2)`. Que vaut L ?
+ `[1, 3, 2, 4]`
- `[1, 3, 4]`
- `[1, 2, 2, 4]`
= Seule la première occurrence de 2 est supprimée.

? `L = [1, 2, 3, 4]`, `L.pop(2)` renvoie…
- 2
+ 3
- 4
= pop(2) supprime et renvoie l'élément d'indice 2.

? `L = [1, 2, 4]`, `L.insert(2, 3)`. L vaut…
+ `[1, 2, 3, 4]`
- `[1, 3, 2, 4]`
- `[1, 2, 4, 3]`
= 3 est placé à l'indice 2.

? Quelle structure n'accepte pas les doublons ?
- liste
- tuple
+ ensemble
= Un set ne contient que des éléments uniques.

? `{}` crée…
+ un dictionnaire vide
- un ensemble vide
- un tuple vide
= L'ensemble vide s'écrit `set()`.

? `d = {'a': 1}`, `d['z']` provoque…
- None
+ KeyError
- 0
= Pour éviter l'erreur, on utilise `d.get('z')`.

? `{1, 2, 3}.remove(4)` provoque…
+ KeyError
- rien
- ValueError
= Contrairement à discard.

? Quelles méthodes possède un tuple ?
- append et remove
+ count et index
- sort et reverse
= Il est immuable : seulement des méthodes de consultation.

? `e = {1, 2}`, `e.update([2, 3])`. e vaut…
- `{1, 2, 2, 3}`
+ `{1, 2, 3}`
- `{2, 3}`
= Les doublons sont ignorés.

? `d = {'a': 1, 'b': 2}`, `d.popitem()` renvoie…
- `('a', 1)`
+ `('b', 2)`
- `2`
= Depuis Python 3.7, la dernière paire insérée.

? Que vaut `x` après `x, y = (10, 20)` ?
+ 10
- (10, 20)
- 20
= C'est le déballage d'un tuple.
```

---
id: collections
titre: Listes, tuples, ensembles et dictionnaires
seance: Séance 9 · novembre 2024
importance: 5
---

## Avant de commencer

Tu sais indexer et découper une chaîne ou un tableau (chapitres 6 et 8) : les listes s'utilisent pareil.

```exercice Vérifie ton prérequis
? Que vaut "MIPBCG"[::-1] ?
reponse: GCBPIM
= Un pas de -1 parcourt à l'envers : **GCBPIM**.
```

## Comment aborder ce chapitre

> [!astuce] Choisis la collection selon deux questions : **ordonnée ?** et **modifiable ?** Puis : **doublons autorisés ?** Le tableau de l'idée 1 répond à tout.

> [!piege] `L2 = L1` ne copie **pas** la liste : les deux noms pointent vers la même liste. Pour une vraie copie : `L1.copy()` ou `L1[:]`.

À la fin, tu sais créer et manipuler les quatre collections, écrire une liste en compréhension et parcourir un dictionnaire.

## Idée 1 · Quatre collections, quatre comportements

```grille Les collections Python
#cols: collection | syntaxe | ordonnée | modifiable | doublons
list | [ ] | *oui | *oui | *oui
tuple | ( ) | *oui | ~non | *oui
set | { } | ~non | *oui (ajout/retrait) | ~non
dict | {clé: valeur} | *oui (Python 3.7+) | *oui | ~clés uniques
```

## Idée 2 · Les listes

```python
fil = ["MIP", "BCG", "PC", "BCG", "MIPC", "DPF", "SEG"]
print(fil[1], fil[-1], fil[2:5], fil[::2])
print("PC" in fil, fil.count("BCG"))
fil[0] = "MI"
fil.append("SMA")
fil.insert(1, "SVT")
fil.remove("BCG")
print(fil)
L1 = [14, 2, -5, 8, 9]
L1.sort()
print(L1, sorted(L1, reverse=True))
```

```sortie
BCG SEG ['PC', 'BCG', 'MIPC'] ['MIP', 'PC', 'MIPC', 'SEG']
True 2
['MI', 'SVT', 'PC', 'BCG', 'MIPC', 'DPF', 'SEG', 'SMA']
[-5, 2, 8, 9, 14] [14, 9, 8, 2, -5]
```

`sort()` trie **sur place** (renvoie None) ; `sorted()` renvoie une **nouvelle** liste.

**Liste en compréhension** : `[expression for x in séquence if condition]` (condition facultative).

```python
carres_pairs = [x ** 2 for x in range(10) if x % 2 == 0]
print(carres_pairs)
L1 = ["MIP", "BCG"]
L2 = L1
L3 = L1.copy()
L1.append("PC")
print(L2, L3)
print([14, -5] + [25], end=" ")
a = [1, 2]
a.extend([3, 4])
print(a)
```

```sortie
[0, 4, 16, 36, 64]
['MIP', 'BCG', 'PC'] ['MIP', 'BCG']
[14, -5, 25] [1, 2, 3, 4]
```

> [!retenir] Copier une liste : boucle d'`append`, tranche complète `L[:]`, `L.copy()` ou `copy.copy(L)`. Pour une liste qui contient d'autres listes : `copy.deepcopy(L)`.

## Idée 3 · Tuples et ensembles

Un **tuple** ne se modifie pas. Astuce du prof pour le « modifier » : le convertir en liste, changer, reconvertir.

```python
mon_tuple = ("MIP", 45, "BCG", "PC", 23)
L = list(mon_tuple)
L[1] = 50
mon_tuple = tuple(L)
fil, nb, *reste = mon_tuple
print(mon_tuple, fil, nb, reste)
A = {"MIP", "BCG", "PC"}
B = {"PC", "SMA"}
print(sorted(A | B), A & B, sorted(A - B))
```

```sortie
('MIP', 50, 'BCG', 'PC', 23) MIP 50 ['BCG', 'PC', 23]
['BCG', 'MIP', 'PC', 'SMA'] {'PC'} ['BCG', 'MIP']
```

Un ensemble n'a pas d'ordre : on ne peut pas faire `A[0]`. Méthodes vues : `add`, `update`, `remove`, `discard`, `clear`, `union` (`|`), `intersection` (`&`). On trie ici avec `sorted` uniquement pour avoir un affichage stable.

## Idée 4 · Les dictionnaires

```html
<svg viewBox="0 0 420 150" style="width:100%;max-width:480px;display:block;margin:10px auto" role="img" aria-label="Un dictionnaire associe chaque clé unique à une valeur : Nom vers Souad, Age vers 28, CIN vers KK587">
<g font-family="sans-serif" font-size="14" fill="currentColor">
<text x="60" y="22" font-weight="700" text-anchor="middle">clés</text><text x="320" y="22" font-weight="700" text-anchor="middle">valeurs</text>
<rect x="20" y="34" width="80" height="28" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="60" y="53" text-anchor="middle">"Nom"</text>
<rect x="20" y="72" width="80" height="28" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="60" y="91" text-anchor="middle">"Age"</text>
<rect x="20" y="110" width="80" height="28" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/><text x="60" y="129" text-anchor="middle">"CIN"</text>
<rect x="270" y="34" width="100" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="320" y="53" text-anchor="middle">"Souad"</text>
<rect x="270" y="72" width="100" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="320" y="91" text-anchor="middle">28</text>
<rect x="270" y="110" width="100" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="320" y="129" text-anchor="middle">"KK587"</text>
<g stroke="currentColor" stroke-width="2"><line x1="100" y1="48" x2="270" y2="48"/><line x1="100" y1="86" x2="270" y2="86"/><line x1="100" y1="124" x2="270" y2="124"/></g>
</g></svg>
```

```python
etudiant = {"Nom": "Souad", "Age": 28, "CIN": "KK587"}
print(etudiant["Nom"], etudiant.get("Apogee", "absent"), "CIN" in etudiant)
etudiant["Age"] = 29
etudiant["Apogee"] = 55847
del etudiant["CIN"]
for cle, valeur in etudiant.items():
    print(cle, ":", valeur)
longueurs = {mot: len(mot) for mot in ("MIP", "BCG", "SMPC")}
print(longueurs)
```

```sortie
Souad absent True
Nom : Souad
Age : 29
Apogee : 55847
{'MIP': 3, 'BCG': 3, 'SMPC': 4}
```

> [!piege] `etudiant["Apogee"]` sur une clé absente lève `KeyError`. `get(cle, défaut)` évite l'erreur.

## S'exercer

```exercice Exercices du TD 6
? (TD 6, ex. 1) list_ex1 vide ; ajouter 2 à 7 avec une boucle ; ajouter 8 et 9 en une instruction ; insérer 1 au début ; supprimer l'élément 3 ; afficher.
= list_ex1 = [] ; for i in range(2, 8): list_ex1.append(i) ; list_ex1.extend([8, 9]) ; list_ex1.insert(0, 1) ; list_ex1.remove(3) ; print(list_ex1) → [1, 2, 4, 5, 6, 7, 8, 9].
« L'élément 3 » est ambigu : si c'est l'indice 3, on écrit list_ex1.pop(3) et on obtient [1, 2, 3, 5, 6, 7, 8, 9].

? (TD 6, ex. 3) Séparer pairs et impairs d'une liste nombres.
= pairs = [x for x in nombres if x % 2 == 0] ; impairs = [x for x in nombres if x % 2 != 0]

? (TD 6, ex. 6) Pour la phrase "Les sacs sont lourds", combien de « s » pour le mot "sacs" ?
reponse: 2
= d = {mot: mot.count("s") for mot in phrase.lower().split()} → {'les': 1, 'sacs': 2, 'sont': 1, 'lourds': 1}.
```

## Flashcards

```cartes
Collection non modifiable ? :: Le tuple.
Collection sans doublons ? :: L'ensemble (set).
sort() ou sorted() ? :: sort trie sur place et renvoie None ; sorted renvoie une nouvelle liste.
L2 = L1 copie-t-il la liste ? :: Non : même liste, deux noms. Utiliser L1.copy() ou L1[:].
Liste en compréhension ? :: [expression for x in séquence if condition]
Parcourir clés et valeurs ? :: for cle, valeur in d.items():
Lire une clé sans risque d'erreur ? :: d.get(cle, valeur_par_defaut)
Intersection de deux ensembles ? :: A & B (ou A.intersection(B))
```

## QCM du chapitre

```qcm
? `[1, 2, 3][-2]` vaut :
- 1
+ 2
- 3
= -1 est le dernier, -2 l'avant-dernier.

? Quelle instruction provoque une erreur ?
- `L = [1, 2]; L[0] = 5`
+ `T = (1, 2); T[0] = 5`
- `D = {"a": 1}; D["a"] = 5`
= Un tuple est immuable.

? `len({1, 2, 2, 3})` vaut :
+ 3
- 4
- 2
= Les doublons disparaissent.

? `x = [3, 1, 2].sort()` ; x vaut :
- [1, 2, 3]
+ None
- [3, 1, 2]
= sort() trie sur place et renvoie None.

? `[x * 2 for x in range(3)]` vaut :
+ [0, 2, 4]
- [2, 4, 6]
- [0, 1, 2]
= range(3) donne 0, 1, 2.

? `d = {"a": 1}` ; `d["b"]` :
- renvoie None
+ lève KeyError
- renvoie 0
= Clé absente. Utilise get.

? `L1 = [1]; L2 = L1; L2.append(2)` ; L1 vaut :
- [1]
+ [1, 2]
- [2]
= L1 et L2 désignent la même liste.

? `{1, 2} | {2, 3}` vaut :
+ {1, 2, 3}
- {2}
- {1, 3}
= | est l'union.

? Pour ajouter un élément à un ensemble :
- append
+ add
- insert
= Les ensembles n'ont pas d'append (pas d'ordre).

? `a, *b = (1, 2, 3)` ; b vaut :
- (2, 3)
+ [2, 3]
- 2
= L'étoile récupère le reste dans une liste.
```

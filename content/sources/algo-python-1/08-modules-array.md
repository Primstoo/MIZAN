---
id: modules-array
titre: Modules Python et tableaux (module array)
seance: Séance 8 · 10 novembre 2024
importance: 4
---

## Avant de commencer

Tu sais parcourir un tableau en pseudo-code (chapitre 3) et écrire une boucle `for i in range(n)` (chapitre 7).

```exercice Vérifie ton prérequis
? Quelles valeurs prend i dans `for i in range(len(T))` si T a 4 éléments ?
= 0, 1, 2, 3 : exactement les indices valides du tableau.
```

## Comment aborder ce chapitre

> [!astuce] Le module `array` est la traduction directe du `Tableau T[n] : Entier` du pseudo-code : **un seul type** par tableau, fixé par un code (`'i'` entier, `'d'` réel).

> [!piege] `Age.remove(9)` enlève la **valeur** 9 (première occurrence) ; `Age.pop(1)` enlève l'élément à l'**indice** 1. Ne les confonds pas.

À la fin, tu sais importer un module, utiliser `math`, créer un tableau `array` et le manipuler (accès, découpage, ajout, suppression, recherche, tri).

## Idée 1 · Importer un module

Un **module** est un fichier de fonctions prêtes à l'emploi. Trois façons d'importer :

```python
import math
import array as ar
from array import *
print(math.sqrt(16), round(math.pi, 4), math.radians(180) == math.pi)
print(round(math.sin(math.radians(30)), 2))
```

```sortie
4.0 3.1416 True
0.5
```

> [!retenir] Les fonctions trigonométriques de `math` travaillent en **radians** : convertis avec `math.radians()`. La diapo montre `sin(30°)` = 0.49999999999999994 : c'est une approximation des flottants, d'où le `round`.

## Idée 2 · Liste ou tableau array ?

| | list | array |
|---|---|---|
| Types des éléments | mélangés | un seul (code `'i'`, `'d'`…) |
| Import | aucun | `import array` |
| Usage | général | données numériques homogènes |

```grille Age = ar.array('i', [15, 9, 7, 23, 7, 11])
#cols: 0 | 1 | 2 | 3 | 4 | 5
15 | 9 | *7 | 23 | *7 | 11
#rows: valeur
```

```python
import array as ar
Age = ar.array('i', [15, 9, 7, 23, 7, 11])
print(len(Age), Age[0], Age[-1], Age.index(7), Age.count(7))
print(Age[1:3])
Age[1] = 31
for v in Age:
    print(v, end=" ")
print()
```

```sortie
6 15 11 2 2
array('i', [9, 7])
15 31 7 23 7 11 
```

`Age[6]` provoquerait `IndexError: array index out of range`. `index(7)` donne la **première** position.

## Idée 3 · Ajouter, supprimer, inverser

```python
import array as ar
Age = ar.array('i', [15, 9, 7, 11])
Age.append(35)
Age.extend([31, 22])
Age.insert(0, 45)
print(Age)
Age.remove(9)
Age.pop(1)
print(Age)
Age.reverse()
print("Tableau inversé :", *Age)
```

```sortie
array('i', [45, 15, 9, 7, 11, 35, 31, 22])
array('i', [45, 7, 11, 35, 31, 22])
Tableau inversé : 22 31 35 11 7 45
```

`*Age` dans `print` « déballe » le tableau : les valeurs s'affichent séparées par des espaces.

## Idée 4 · Remplir au clavier, puis trier

Le schéma du prof : un tableau vide `ar.array('i')`, puis `append` dans une boucle.

```python nontest
import array as ar
tab = ar.array('i')
n = int(input("entrer la taille du tableau : "))
for i in range(n):
    x = int(input(f"entrer l'élément {i} : "))
    tab.append(x)
```

Puis on applique les tris du chapitre 4. Ici le tri par sélection sur un tableau déjà rempli :

```python
import array as ar
tab = ar.array('i', [12, 45, 8, 5, 16])
n = len(tab)
for i in range(n - 1):
    m = i
    for j in range(i + 1, n):
        if tab[j] < tab[m]:
            m = j
    tab[i], tab[m] = tab[m], tab[i]
print(*tab)
```

```sortie
5 8 12 16 45
```

## S'exercer

```exercice Exercices types
? Que contient ar.array('i', [4, 4, 2]) après remove(4) ?
= array('i', [4, 2]) : seule la première occurrence est retirée.

? Écris l'appel qui crée un tableau de réels [1.5, 2.0].
= ar.array('d', [1.5, 2.0])

? Avec T = ar.array('i', [3, 8, 1]), que vaut T.index(1) ?
reponse: 2
= La valeur 1 est à l'indice **2**.
```

## Flashcards

```cartes
Code de type pour des entiers dans array ? :: 'i'
Code de type pour des réels (double) ? :: 'd'
remove(x) ou pop(i) ? :: remove enlève la valeur x (1re occurrence) ; pop enlève l'indice i.
append ou extend ? :: append ajoute un élément ; extend ajoute tous les éléments d'une liste.
insert(0, 45) ? :: Insère 45 au début.
Que renvoie index(v) ? :: L'indice de la première occurrence de v.
Unité des angles de math.sin ? :: Le radian.
Différence liste / array ? :: array impose un seul type d'éléments.
```

## QCM du chapitre

```qcm
? Comment importer le module array sous le nom ar ?
+ import array as ar
- from ar import array
- include array
= `as` donne un alias.

? `ar.array('i', [1, 2.5])` :
- crée [1, 2]
+ provoque une erreur (TypeError)
- crée [1, 2.5]
= Le code 'i' n'accepte que des entiers.

? `A = ar.array('i', [5, 6, 7])`, `A.pop(0)` ; A devient :
+ [6, 7]
- [5, 6]
- [5, 7]
= pop(0) retire l'élément d'indice 0.

? `A.count(7)` pour [7, 1, 7, 7] vaut :
- 1
+ 3
- 0
= Trois 7.

? `math.sqrt(25)` renvoie :
- 5
+ 5.0
- 25
= sqrt renvoie un float.

? `A[-1]` désigne :
+ le dernier élément
- le premier élément
- une erreur
= Indexation négative depuis la fin.

? `A = ar.array('i', [1, 2])` puis `A.extend([3, 4])` ; len(A) vaut :
- 3
+ 4
- 2
= extend ajoute chaque élément.

? `A.insert(2, 9)` sur [1, 2, 3] donne :
+ [1, 2, 9, 3]
- [1, 9, 2, 3]
- [9, 1, 2, 3]
= 9 prend la place d'indice 2.

? `math.radians(180)` vaut environ :
- 180
+ 3.14159
- 0.5
= 180° = π radians.

? `A[1:3]` sur [10, 20, 30, 40] renvoie :
- [10, 20, 30]
+ [20, 30]
- [20, 30, 40]
= Indices 1 et 2, 3 exclu.
```

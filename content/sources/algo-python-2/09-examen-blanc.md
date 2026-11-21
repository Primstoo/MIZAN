---
id: examen-blanc
titre: Révision et examen blanc corrigé
seance: Révision · format de l'examen blanc (TD 6)
importance: 5
payant: true
---

## Avant de commencer

Ce chapitre suppose que tu as fait les QCM des chapitres 1 à 8. Si un QCM est sous 8/10, reprends d'abord ce chapitre.

```exercice Vérifie ton prérequis
? Sans regarder : quelle est la différence entre `remove` et `discard` sur un ensemble ?
= `remove` lève `KeyError` si l'élément est absent ; `discard` ne fait rien.
```

## Comment aborder ce chapitre

> [!astuce] **Fais l'examen en conditions réelles** : 1 h 30, sans ordinateur, sur papier. Corrige-toi seulement après.

> [!piege] Perdre des points sur des détails de syntaxe : oublier `@dataclass`, les accolades d'une f-string, la conversion `float(input(...))` ou le cas de base d'une récursion.

À la fin, tu connais le format de l'examen et tu as vérifié chaque point du programme.

> [!prof] Format de l'examen blanc du Pr Biniz (TD 6) : **16 QCM** (A–D) sur une feuille de réponses, puis **Q17–Q20** (dataclass, saisie, affichage, tri) notées sur 1 point, et **Q21–Q24** (programme principal, somme itérative, somme récursive, coût d'un algorithme) notées sur 2 points.

> [!attention] L'énoncé des 16 QCM de l'examen blanc n'a pas été fourni (seulement la grille de réponses). Les QCM et le problème ci-dessous sont **nos propres sujets**, construits sur le même format et sur le polycopié.

## Idée 1 · La fiche de révision en une page

| Chapitre | À savoir écrire sans hésiter |
|---|---|
| Procédures / fonctions | `def f(n: int) -> None:` / `-> int:` + `return` |
| Passage des paramètres | mutable modifié sur place → visible dehors |
| Portée | `global x`, `nonlocal z` |
| Récursivité | cas de base + appel plus petit ; terminale = `return f(n-1, acc*n)` |
| Enregistrements | `@dataclass class Produit: nom: str ...` ; `Enum` ; `namedtuple` |
| Collections | append/extend/insert/remove/pop, add/discard, get/items/popitem |
| Fichiers | `with open(nom, "r"/"w"/"a") as f`, `read(n)`, `tell()`, `seek()`, `csv`, `try/except FileNotFoundError` |

```flux Ordre de travail le jour de l'examen
QCM (rapides) -> Q17–Q20 (dataclass et tri) -> Q22–Q23 (sommes) -> Q21 (assembler) -> Q24 (coût)
```

## Idée 2 · Problème corrigé : gestion d'étudiants

**Énoncé.** On gère les étudiants d'une filière de la FSABM.

1. Écris une dataclass `Etudiant` (nom : str, filiere : str, moyenne : float). *(1 pt)*
2. Écris `afficher_etudiant(e)` qui affiche « nom - filière : moyenne ». *(1 pt)*
3. Écris `trier_etudiants(T)` qui trie par moyenne décroissante (tri par sélection). *(1 pt)*
4. Écris `admis(T)` qui renvoie le dictionnaire {nom : moyenne} des étudiants ayant au moins 10. *(1 pt)*
5. Écris `maximum_recursif(L)` qui renvoie le plus grand élément d'une liste non vide, récursivement. *(2 pts)*
6. Écris `sauvegarder(T, nom_fichier)` qui écrit les étudiants dans un CSV, puis `relire(nom_fichier)` qui renvoie le nombre de lignes, ou -1 si le fichier n'existe pas. *(2 pts)*

```python
from dataclasses import dataclass
import csv

@dataclass
class Etudiant:                                   # 1
    nom: str
    filiere: str
    moyenne: float

def afficher_etudiant(e: Etudiant) -> None:       # 2
    print(f"{e.nom} - {e.filiere} : {e.moyenne}")

def trier_etudiants(T: list[Etudiant]) -> list[Etudiant]:   # 3
    for i in range(len(T) - 1):
        posmax = i
        for j in range(i + 1, len(T)):
            if T[j].moyenne > T[posmax].moyenne:
                posmax = j
        T[i], T[posmax] = T[posmax], T[i]
    return T

def admis(T: list[Etudiant]) -> dict[str, float]:          # 4
    d = {}
    for e in T:
        if e.moyenne >= 10:
            d[e.nom] = e.moyenne
    return d

def maximum_recursif(L: list[float]) -> float:            # 5
    if len(L) == 1:
        return L[0]
    m = maximum_recursif(L[1:])
    return L[0] if L[0] > m else m

def sauvegarder(T: list[Etudiant], nom_fichier: str) -> None:   # 6
    with open(nom_fichier, "w", newline="") as f:
        w = csv.writer(f)
        for e in T:
            w.writerow([e.nom, e.filiere, e.moyenne])

def relire(nom_fichier: str) -> int:
    try:
        with open(nom_fichier, "r") as f:
            return len(list(csv.reader(f)))
    except FileNotFoundError:
        return -1

T = [Etudiant("Amine", "MI", 9.5), Etudiant("Sara", "MI", 14.0), Etudiant("Yassine", "MI", 11.25)]
for e in trier_etudiants(T):
    afficher_etudiant(e)
print(admis(T))
print(maximum_recursif([9.5, 14.0, 11.25]))
sauvegarder(T, "etudiants.csv")
print(relire("etudiants.csv"), relire("absent.csv"))
```

```sortie
Sara - MI : 14.0
Yassine - MI : 11.25
Amine - MI : 9.5
{'Sara': 14.0, 'Yassine': 11.25}
14.0
3 -1
```

> [!retenir] `T[i], T[posmax] = T[posmax], T[i]` échange deux cases en une ligne : plus court et sans risque d'erreur que la version avec `temp`.

## Idée 3 · Prédire l'affichage : les pièges classiques

```python
def f(L: list[int], n: int) -> None:
    L.append(n)
    n = n + 1

A = [1]; k = 5
f(A, k)
print(A, k)

def compte(n: int, acc: int = 0) -> int:
    if n == 0:
        return acc
    return compte(n // 10, acc + 1)
print(compte(2026))

e = {3, 1, 3}
d = {"a": 1}
print(len(e), d.get("b", 0), (1, 2, 1).count(1))
```

```sortie
[1, 5] 5
4
2 0 2
```

```etapes Lire le premier bloc
f(A, k) :: L pointe vers la liste A, n reçoit 5.
L.append(n) :: la liste partagée devient [1, 5].
n = n + 1 :: n devient 6 dans la fonction seulement (int immuable).
Résultat :: `[1, 5] 5`.
```

## S'exercer

```exercice Questions longues type examen
? Écris `compter_mots(nom_fichier)` qui renvoie un dictionnaire {mot : nombre d'apparitions}.
= `d = {}` ; `with open(nom_fichier) as f:` ; `for ligne in f: for mot in ligne.split(): d[mot] = d.get(mot, 0) + 1` ; `return d`.

? Écris une version **terminale** de `maximum_recursif`.
= `def max_t(L, m): if len(L) == 0: return m` sinon `return max_t(L[1:], L[0] if L[0] > m else m)`. Premier appel : `max_t(L[1:], L[0])`.

? Combien vaut le coût d'un `Si` dont les branches coûtent 3 et 1 ?
reponse: 4
= 1 (test) + max(3, 1) = 4.

? Que vaut `compte(7)` dans l'exemple ci-dessus ?
reponse: 1
= 7 a un chiffre : un appel avec acc + 1, puis n = 0 renvoie 1.
```

## Flashcards

```cartes
Format examen blanc Biniz :: 16 QCM puis Q17–Q24 (dataclass, saisie, affichage, tri, main, somme itérative, somme récursive, coût).
Échange en une ligne :: `T[i], T[j] = T[j], T[i]`
Maximum récursif :: Cas de base : un seul élément ; sinon comparer L[0] au max du reste.
Compter des mots :: `d[mot] = d.get(mot, 0) + 1`
Lire un CSV sans planter :: `try: with open(...)` puis `except FileNotFoundError:`
Nombre de chiffres de n, récursif :: `0 si n == 0, sinon 1 + chiffres(n // 10)` (pour n > 0)
```

## QCM du chapitre

```qcm
? `def f(x: int) -> None: x += 1`, puis `a = 1; f(a); print(a)` ?
+ 1
- 2
- None
= int immuable : a ne change pas.

? `global` est nécessaire pour…
- lire une variable globale
+ modifier une variable globale dans une fonction
- créer une variable locale
= La lecture est possible sans `global`.

? Laquelle est une récursion terminale ?
- `return 1 + f(n - 1)`
+ `return f(n - 1, acc + 1)`
- `return f(n - 1) * 2`
= Rien n'est fait après l'appel.

? `@dataclass` génère automatiquement…
+ le constructeur `__init__`
- une base de données
- une énumération
= Ainsi qu'un affichage lisible.

? `JourSemaine(2)` avec MARDI = 2 renvoie…
+ `JourSemaine.MARDI`
- 2
- "MARDI"
= On retrouve le membre à partir de sa valeur.

? `[1, 2].append([3, 4])` donne…
- `[1, 2, 3, 4]`
+ `[1, 2, [3, 4]]`
- une erreur
= append ajoute UN élément : la liste entière.

? `s = set(); s.add(2); s.add(2); len(s)` vaut…
+ 1
- 2
- 0
= Pas de doublon dans un ensemble.

? Ouvrir un fichier en `"w"`…
- ajoute à la fin
+ efface son contenu s'il existe
- échoue s'il existe
= Utilise `"a"` pour ajouter.

? `f.seek(0)` sert à…
- fermer le fichier
+ revenir au début du fichier
- lire 0 caractère
= Le curseur revient à la position 0.

? Complexité d'un parcours simple d'une liste de n éléments ?
- O(log n)
+ O(n)
- O(1)
= Une opération par élément.

? `{"a": 1}.get("z")` renvoie…
+ None
- KeyError
- 0
= get renvoie None si la clé est absente et sans valeur par défaut.

? Après `x, y = (4, 9)`, que vaut `y` ?
- 4
+ 9
- (4, 9)
= Déballage du tuple.
```

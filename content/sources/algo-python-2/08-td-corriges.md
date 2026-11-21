---
id: td-corriges
titre: TD corrigé · gestion de produits (TD 6)
seance: TD 6 · partie programmation de l'examen blanc
importance: 5
---

## Avant de commencer

Ce TD mobilise trois chapitres : dataclass (chap. 5), listes (chap. 6) et récursivité (chap. 4).

```exercice Vérifie ton prérequis
? Avec `@dataclass class Produit: nom: str; prix: float`, comment lit-on le prix de `p` ?
= `p.prix`.
```

## Comment aborder ce chapitre

> [!astuce] **Écris chaque question comme une petite fonction indépendante**, puis assemble-les dans le programme principal (Q21). C'est exactement le découpage noté par le prof.

> [!piege] Dans une f-string, oublier les accolades : `f"Nom: p.nom"` affiche le texte `p.nom`, pas le nom du produit. Il faut `f"Nom: {p.nom}"`.

À la fin, tu sais écrire l'exercice « produits » de l'examen blanc sans erreur, et calculer une somme en itératif et en récursif.

> [!attention] Seule la **correction** du TD 6 était fournie, pas l'énoncé. Les consignes ci-dessous sont reconstruites à partir de la correction. La correction du prof contient deux erreurs, signalées et corrigées plus bas.

## Idée 1 · Q17–Q19 : la fiche Produit, la saisie, l'affichage

```flux Le programme de l'exercice
Q17 dataclass Produit -> Q18 ajouter_produit (saisie) -> Q20 trier_produits -> Q19 afficher_produit
```

Q18 utilise `input()` : on le montre sans l'exécuter.

```python nontest
def ajouter_produit() -> Produit:
    nom = input("Nom du produit : ")
    categorie = input("Catégorie : ")
    prix = float(input("Prix : "))      # input renvoie une chaîne : on convertit
    p = Produit(nom, categorie, prix)
    return p
```

```python
from dataclasses import dataclass

@dataclass
class Produit:                          # Q17
    nom: str
    categorie: str
    prix: float

def afficher_produit(p: Produit) -> None:   # Q19 corrigée
    print(f"Nom: {p.nom}")
    print(f"Catégorie: {p.categorie}")
    print(f"Prix: {p.prix}")

afficher_produit(Produit("Cahier", "Papeterie", 12.0))
```

```sortie
Nom: Cahier
Catégorie: Papeterie
Prix: 12.0
```

> [!attention] Erreur dans la correction (Q19) : `print(f"Nom: p.nom")` sans accolades affiche littéralement `Nom: p.nom`. Corrigé : `f"Nom: {p.nom}"`.

## Idée 2 · Q20 : tri par sélection, du plus cher au moins cher

```etapes Tri par sélection décroissant
Pour chaque position i :: on cherche le produit le plus cher parmi T[i], T[i+1], …
Recherche du max :: `posmax = i`, puis pour j > i, si `T[j].prix > T[posmax].prix` alors `posmax = j`.
Échange :: on échange T[i] et **T[posmax]** (pas T[j] !).
Fin :: après n − 1 tours, T est trié par prix décroissant.
```

```grille Prix pendant le tri (case échangée en orange)
#cols: 0 1 2 3
#rows: départ i=0 i=1 i=2
5 9 2 7
*9 *5 2 7
9 *7 2 *5
9 7 *5 *2
```

```python
from dataclasses import dataclass

@dataclass
class Produit:
    nom: str
    categorie: str
    prix: float

def trier_produits(T: list[Produit]) -> list[Produit]:
    for i in range(len(T) - 1):
        posmax = i
        for j in range(i + 1, len(T)):
            if T[j].prix > T[posmax].prix:
                posmax = j
        if posmax != i:
            temp = T[i]
            T[i] = T[posmax]
            T[posmax] = temp
    return T

T = [Produit("A", "x", 5), Produit("B", "x", 9), Produit("C", "x", 2), Produit("D", "x", 7)]
print([p.prix for p in trier_produits(T)])
```

```sortie
[9, 7, 5, 2]
```

> [!attention] Erreur dans la correction (Q20) : l'échange y est écrit `T[i] = T[j]` et `T[j] = temp`. Après la boucle, `j` vaut toujours le dernier indice : on échange avec le mauvais élément et la liste n'est pas triée (avec les prix 5, 9, 2, 7, on obtient 7, 9, 5, 2). Il faut échanger avec `T[posmax]`.

## Idée 3 · Q21 : le programme principal

```python nontest
N = int(input("Entrer le nbre de produits:"))
T = []
for _ in range(N):
    T.append(ajouter_produit())
T = trier_produits(T)
for p in T:
    afficher_produit(p)
```

> [!retenir] `for _ in range(N)` : le `_` signale qu'on n'utilise pas le compteur.

## Idée 4 · Q22–Q23 : somme itérative et somme récursive

```python
def somme_iterative(L: list[float]) -> float:     # Q22
    S = 0
    for x in L:
        S += x
    return S

def somme_recursive(L: list[float]) -> float:     # Q23
    if len(L) == 0:
        return 0
    else:
        return L[0] + somme_recursive(L[1:])

print(somme_iterative([3, 8, 1]), somme_recursive([3, 8, 1]))
```

```sortie
12 12
```

## Idée 5 · Q24 : coût d'une recherche dichotomique

> [!attention] La complexité n'apparaît pas dans le polycopié, et l'énoncé de Q24 (la fonction `Recherche`) n'a pas été fourni. Ce qui suit explique la méthode et le résultat de la correction.

La méthode du prof : coût d'un `Si` = 1 (le test) + le max des coûts des deux branches ; coût d'une boucle = nombre de tours × coût d'un tour + coût du test final ; on additionne les blocs.

```html
<svg viewBox="0 0 560 100" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Recherche dichotomique : à chaque tour la zone de recherche est coupée en deux : n, n/2, n/4, jusqu'à 1, soit log2(n) tours.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="15" width="400" height="18" fill="none" stroke="currentColor"/><text x="440" y="29">n</text>
<rect x="20" y="40" width="200" height="18" fill="none" stroke="currentColor"/><text x="440" y="54">n/2</text>
<rect x="20" y="65" width="100" height="18" fill="none" stroke="#D9824F" stroke-width="2"/><text x="440" y="79" fill="#D9824F" font-weight="700">n/4 … 1 : log₂(n) tours</text>
</g></svg>
```

Correction du prof : CSi2 = 1 + max(2, 2) = 3 ; CSi1 = 1 + max(1, 3) = 4 ; boucle : log₂(n) tours de coût 3 + 4 + 3 = 10, plus 3, soit 10·ln(n)/ln(2) + 3 ; avec CS = 3 et CSi3 = 2, le total vaut **10·log₂(n) + 8**. La complexité est **logarithmique : O(log n)**.

## S'exercer

```exercice Variantes de l'examen
? Modifie `trier_produits` pour trier par prix **croissant**. Quelle ligne change ?
= La comparaison : `if T[j].prix < T[posmin].prix:` (on cherche le minimum).

? Écris `produits_categorie(T, cat)` qui renvoie la liste des noms des produits de la catégorie `cat`.
= `return [p.nom for p in T if p.categorie == cat]`.

? Combien de tours fait une recherche dichotomique dans 1024 éléments (au pire, environ) ?
reponse: 10
= log₂(1024) = 10.
```

## Flashcards

```cartes
f-string :: `f"Prix: {p.prix}"` : les accolades insèrent la valeur.
input() :: Renvoie toujours une chaîne : convertir avec int() ou float().
Tri par sélection :: À chaque tour, chercher le max (ou min) restant et l'échanger avec la position i.
Échange de deux cases :: `temp = T[i]; T[i] = T[posmax]; T[posmax] = temp` (ou `T[i], T[posmax] = T[posmax], T[i]`).
Somme itérative :: `S = 0; for x in L: S += x; return S`.
Somme récursive :: `return 0` si L est vide, sinon `L[0] + somme_recursive(L[1:])`.
Coût d'un Si :: 1 (test) + max(coût alors, coût sinon).
Recherche dichotomique :: O(log n) : la zone est coupée en deux à chaque tour.
```

## QCM du chapitre

```qcm
? `print(f"Nom: p.nom")` affiche…
+ `Nom: p.nom`
- le nom du produit
- une erreur
= Sans accolades, rien n'est évalué.

? Que renvoie `input()` ?
- un int
+ une str
- un float
= Toujours une chaîne de caractères.

? Dans le tri par sélection décroissant, avec quoi échange-t-on T[i] ?
- T[j]
+ T[posmax]
- T[i+1]
= posmax est l'indice du plus grand élément restant.

? Combien de tours fait la boucle externe d'un tri par sélection de n éléments ?
- n
+ n − 1
- n²
= `range(len(T) - 1)` : le dernier élément est forcément à sa place.

? `somme_recursive([])` renvoie…
+ 0
- None
- une erreur
= C'est le cas de base.

? `somme_recursive` est-elle terminale ?
- oui
+ non
= L'addition `L[0] + …` se fait après l'appel.

? Complexité de la recherche dichotomique ?
- O(n)
+ O(log n)
- O(n²)
= La zone est divisée par deux à chaque tour.

? Coût de `Si` dont les branches coûtent 2 et 5 ?
- 7
+ 6
- 8
= 1 + max(2, 5) = 6.

? `for _ in range(3): T.append(0)`. Que vaut T si T était vide ?
+ `[0, 0, 0]`
- `[0]`
- `[3]`
= Trois tours, trois ajouts.

? Pour trier par prix croissant, on cherche à chaque tour…
- le maximum
+ le minimum
- le premier élément
= Le plus petit restant va en position i.
```

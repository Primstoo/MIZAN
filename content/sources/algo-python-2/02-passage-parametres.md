---
id: passage-parametres
titre: Passage par valeur et par adresse
seance: Chapitre I (§3–4)
importance: 5
---

## Avant de commencer

Il faut savoir qu'une liste se modifie sur place (`L[0] = 99`, `L.append(4)`) alors qu'un entier ne se modifie jamais : `x = x + 1` crée un nouvel entier.

```exercice Vérifie ton prérequis
? `L = [1, 2]`, puis `M = L`, puis `M.append(3)`. Que vaut `L` ?
= `[1, 2, 3]`. `M` et `L` sont deux noms pour **la même** liste.
```

## Comment aborder ce chapitre

> [!astuce] **Demande-toi : la fonction modifie-t-elle l'objet, ou fabrique-t-elle un nouvel objet ?** Modifier l'objet → visible dehors. Nouvel objet → invisible dehors.

> [!piege] Croire que `incrementer(y)` change `y`. Avec un entier, la fonction travaille sur une copie (en pratique : un nouvel objet). `y` reste 5.

À la fin, tu sais prédire ce qu'affiche un programme après l'appel d'une fonction, pour un `int`, une `str` ou une `list`.

## Idée 1 · Par valeur : la fonction reçoit une copie

```html
<svg viewBox="0 0 560 110" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Passage par valeur : y vaut 5 dans l'appelant, x reçoit une copie 5 puis devient 6, y reste 5.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="30" width="120" height="44" rx="6" fill="none" stroke="currentColor"/><text x="80" y="57" text-anchor="middle">y = 5</text>
<text x="80" y="20" text-anchor="middle">appelant</text>
<text x="210" y="57" text-anchor="middle">copie →</text>
<rect x="280" y="30" width="120" height="44" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="340" y="57" text-anchor="middle">x = 5 → 6</text>
<text x="340" y="20" text-anchor="middle">fonction</text>
<text x="420" y="100" fill="#D9824F" font-weight="700">y reste 5</text></g></svg>
```

La fonction reçoit une **copie** de la valeur. Elle peut la changer : l'original ne bouge pas.

```python
def incrementer(x: int) -> int:
    x = x + 1
    return x

y: int = 5
incrementer(y)
print(y)
y = incrementer(y)   # pour changer y, on récupère le résultat
print(y)
```

```sortie
5
6
```

Avantages : sécurité, comportement prévisible. Inconvénient : copier une grosse structure coûte du temps et de la mémoire.

## Idée 2 · Par adresse : la fonction reçoit l'original

La fonction reçoit **l'adresse** de la donnée. Ce qu'elle modifie, c'est l'original. Efficace (pas de copie), mais risque d'effets de bord.

```grille L avant (ligne 1) et après (ligne 2) modifier(L)
#cols: 0 1 2
#rows: avant après
1 2 3
*99 2 3
```

```python
def modifier(liste: list[int]) -> None:
    liste[0] = 99

L: list[int] = [1, 2, 3]
modifier(L)
print(L)
```

```sortie
[99, 2, 3]
```

> [!attention] Dans le polycopié, cette fonction est typée `-> list[int]` alors qu'elle ne renvoie rien. Le bon type est `-> None` (c'est une procédure).

## Idée 3 · En Python : passage par affectation d'objet

Python passe toujours **une référence vers l'objet**. Le comportement dépend du type :

**Ce qui se passe selon le type**

| Type | Exemples | Se comporte comme |
|---|---|---|
| immuable | int, float, str, tuple | par valeur |
| mutable | list, dict, set | par adresse |


```etapes Prédire l'affichage après un appel
Repère le type de l'argument :: immuable (int, str…) ou mutable (list, dict…) ?
Regarde ce que fait la fonction :: modification sur place (`L[0] = …`, `append`) ou réaffectation (`L = […]`, `x = x + 1`) ?
Conclus :: mutable ET modification sur place → l'original change. Sinon → il ne change pas.
```

```python
def reaffecter(liste: list[int]) -> None:
    liste = [0, 0]          # nouvelle liste locale : le lien est rompu

def ajouter(liste: list[int]) -> None:
    liste.append(4)         # modification sur place

def crier(s: str) -> None:
    s = s.upper()           # str immuable : nouvel objet

L = [1, 2, 3]; nom = "fsabm"
reaffecter(L); ajouter(L); crier(nom)
print(L, nom)
```

```sortie
[1, 2, 3, 4] fsabm
```

> [!retenir] **Mutable + modifié sur place = visible dehors.** Tout le reste est invisible dehors.

## S'exercer

```exercice Prédire l'affichage
? `def f(t: list[int]) -> None: t[1] = t[1] * 10`, puis `T = [1, 2, 3]`, `f(T)`, `print(T[1])`. Qu'affiche le programme ?
reponse: 20
= La liste est mutable et modifiée sur place : `T[1]` passe de 2 à 20.

? `def g(n: int) -> None: n = n * 10`, puis `a = 4`, `g(a)`, `print(a)` ?
reponse: 4
= Un entier est immuable : `a` ne change pas.

? Comment protéger une liste d'une fonction qui la modifie ?
= Passer une copie : `f(L.copy())` ou `f(L[:])`. La fonction modifie la copie, `L` reste intacte.
```

## Flashcards

```cartes
Passage par valeur :: La fonction reçoit une copie ; l'original ne change pas.
Passage par adresse :: La fonction reçoit l'adresse ; ses modifications touchent l'original.
Passage en Python :: Par affectation d'objet (référence vers l'objet).
Types immuables :: int, float, str, tuple : se comportent comme par valeur.
Types mutables :: list, dict, set : se comportent comme par adresse.
Avantage du passage par adresse :: Pas de copie coûteuse de grandes structures.
Risque du passage par adresse :: Effets de bord : modifier les données par erreur.
`liste = [0]` dans une fonction :: Crée une nouvelle liste locale : l'original n'est pas touché.
```

## QCM du chapitre

```qcm
? `y = 5`, `incrementer(y)` (qui fait `x = x + 1; return x`), puis `print(y)`. Affichage ?
+ 5
- 6
- None
= Le résultat n'est pas récupéré et l'entier original ne change pas.

? `L = [1, 2, 3]`, `modifier(L)` qui fait `liste[0] = 99`. Que vaut `L` ?
- `[1, 2, 3]`
+ `[99, 2, 3]`
- `[99]`
= La liste est modifiée sur place via sa référence.

? Comment le prof qualifie-t-il le passage des paramètres en Python ?
- toujours par valeur
- toujours par adresse
+ par affectation d'objet (valeur de référence)
= Python passe une référence vers l'objet.

? Lequel de ces types est mutable ?
- tuple
- str
+ dict
= dict, list et set sont mutables.

? Un inconvénient du passage par valeur ?
+ La copie de grosses structures coûte mémoire et temps
- Il modifie les données par erreur
- Il est imprévisible
= Copier coûte cher pour les grandes structures.

? Un inconvénient du passage par adresse ?
- Il copie tout
+ Risque de modifier l'original par erreur (effet de bord)
- Il est impossible en Python
= C'est le revers de son efficacité.

? `def f(L): L = [7]`, puis `A = [1]`, `f(A)`. Que vaut `A` ?
+ `[1]`
- `[7]`
- `[1, 7]`
= La réaffectation crée une liste locale ; `A` n'est pas touché.

? `def f(L): L.append(7)`, puis `A = [1]`, `f(A)`. Que vaut `A` ?
- `[1]`
+ `[1, 7]`
- `[7]`
= `append` modifie la liste partagée.

? `def f(s): s = s + "!"`, puis `m = "ok"`, `f(m)`. Que vaut `m` ?
+ `"ok"`
- `"ok!"`
- erreur
= Une chaîne est immuable.

? Quel type de retour convient à `def modifier(liste: list[int])` qui ne renvoie rien ?
- `-> list[int]`
+ `-> None`
- `-> int`
= Sans `return`, la fonction renvoie `None` : c'est une procédure.
```

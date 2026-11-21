---
id: recursivite
titre: Récursivité terminale et non terminale
seance: Chapitre II
importance: 5
---

## Avant de commencer

Il faut savoir écrire une fonction avec `if`/`else` et `return`.

```exercice Vérifie ton prérequis
? Écris la factorielle 5! = 5 × 4 × 3 × 2 × 1. Combien vaut-elle ?
reponse: 120
= 5 × 4 = 20, × 3 = 60, × 2 = 120.
```

## Comment aborder ce chapitre

> [!astuce] **Fais confiance à l'appel récursif.** Suppose que `somme(n - 1)` marche, et demande-toi seulement comment obtenir `somme(n)` à partir de lui.

> [!piege] Oublier le **cas de base** (ou ne jamais l'atteindre). La fonction s'appelle à l'infini : `RecursionError`.

À la fin, tu sais écrire une fonction récursive et dire si elle est terminale ou non.

## Idée 1 · Une fonction qui s'appelle elle-même

Deux ingrédients obligatoires : un **cas de base** qui renvoie directement, et un **appel récursif** sur un problème plus petit.

```python
def somme(n: int) -> int:
    if n == 0:
        return 0                 # cas de base
    else:
        return n + somme(n - 1)  # appel sur un problème plus petit

resultat: int = somme(5)
print("Somme des nombres de 1 à 5 :", resultat)
```

```sortie
Somme des nombres de 1 à 5 : 15
```

## Idée 2 · Non terminale : du travail APRÈS l'appel

Dans `n + somme(n - 1)`, il reste une addition à faire après le retour. Chaque appel attend sur une **pile**.

```html
<svg viewBox="0 0 560 190" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Pile d'appels de somme(3) : on empile somme(3), somme(2), somme(1), somme(0) qui renvoie 0, puis on dépile 1, 3, 6.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="40" y="140" width="200" height="30" fill="none" stroke="currentColor"/><text x="140" y="160" text-anchor="middle">somme(3) attend 3 + …</text>
<rect x="40" y="105" width="200" height="30" fill="none" stroke="currentColor"/><text x="140" y="125" text-anchor="middle">somme(2) attend 2 + …</text>
<rect x="40" y="70" width="200" height="30" fill="none" stroke="currentColor"/><text x="140" y="90" text-anchor="middle">somme(1) attend 1 + …</text>
<rect x="40" y="35" width="200" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="140" y="55" text-anchor="middle" fill="#D9824F">somme(0) = 0 (cas de base)</text>
<text x="140" y="22" text-anchor="middle">empiler ↑</text>
<text x="300" y="55">dépiler : 0</text><text x="300" y="90">1 + 0 = 1</text><text x="300" y="125">2 + 1 = 3</text><text x="300" y="160" fill="#D9824F" font-weight="700">3 + 3 = 6</text>
</g></svg>
```

## Idée 3 · Terminale : l'appel récursif est la DERNIÈRE action

On transporte le résultat partiel dans un **accumulateur** `acc`. Le retour de l'appel est renvoyé tel quel, sans calcul.

```grille factorielle(4) en version terminale : (n, acc) à chaque appel
#cols: n acc
#rows: appel1 appel2 appel3 appel4 appel5
4 1
3 4
2 12
1 24
*0 *24
```

```python
def factorielle(n: int, acc: int = 1) -> int:
    if n == 0:
        return acc
    else:
        return factorielle(n - 1, acc * n)

print("Factorielle de 5 :", factorielle(5))
```

```sortie
Factorielle de 5 : 120
```

> [!attention] Dans le **pseudo-code** du polycopié, le cas de base écrit `RETOURNER 1`. Avec un accumulateur, il faut `RETOURNER acc` (comme dans la version Python du prof) : sinon la fonction renverrait toujours 1.

```etapes Rendre une récursion terminale
Repère le calcul fait après l'appel :: dans `n + somme(n - 1)`, c'est `n + …`.
Ajoute un accumulateur :: paramètre `acc` avec une valeur de départ neutre (0 pour une somme, 1 pour un produit).
Fais le calcul AVANT l'appel :: `return somme_t(n - 1, acc + n)`.
Cas de base :: renvoie `acc`.
```

> [!retenir] **Terminale** = rien après l'appel (`return f(...)`). **Non terminale** = une opération attend le retour (`return n + f(...)`).

## S'exercer

```exercice Écrire des récursions
? Écris `somme_t(n, acc=0)` terminale. Que vaut `somme_t(4)` ?
reponse: 10
= `if n == 0: return acc` sinon `return somme_t(n - 1, acc + n)`. 4 + 3 + 2 + 1 = 10.

? (Examen blanc, Q23) Écris `somme_recursive(L)` qui renvoie la somme d'une liste. Que vaut `somme_recursive([2, 5, 1])` ?
reponse: 8
= Cas de base `if len(L) == 0: return 0`, sinon `return L[0] + somme_recursive(L[1:])`. Elle est non terminale.

? `puissance(x, n)` : écris-la récursivement.
= `if n == 0: return 1` sinon `return x * puissance(x, n - 1)`. Non terminale.
```

## Flashcards

```cartes
Récursivité :: Une fonction qui s'appelle elle-même sur un problème plus petit.
Cas de base :: Le cas qui renvoie sans appel récursif ; il arrête la récursion.
Récursivité terminale :: L'appel récursif est la dernière instruction ; son résultat est renvoyé tel quel.
Récursivité non terminale :: Une opération reste à faire après l'appel ; utilise une pile.
Accumulateur :: Paramètre qui transporte le résultat partiel dans une récursion terminale.
Sans cas de base :: RecursionError (pile dépassée).
`return n + somme(n-1)` :: Non terminale.
`return fact(n-1, acc*n)` :: Terminale.
```

## QCM du chapitre

```qcm
? Quelle version est terminale ?
- `return n * f(n - 1)`
+ `return f(n - 1, acc * n)`
- `return 1 + f(n - 1)`
= Rien n'est calculé après l'appel.

? Que vaut `somme(4)` avec `return n + somme(n - 1)` et `somme(0) = 0` ?
- 4
+ 10
- 24
= 4 + 3 + 2 + 1 + 0.

? Sans cas de base, une fonction récursive…
- renvoie None
+ provoque une RecursionError
- s'arrête au bout de 10 appels
= Elle s'appelle sans fin jusqu'à saturer la pile.

? Quelle structure la récursion non terminale utilise-t-elle ?
+ une pile
- une file
- un dictionnaire
= Les appels en attente sont empilés.

? Dans `factorielle(n, acc=1)`, que renvoie le cas de base ?
- 1
+ `acc`
- `n`
= L'accumulateur contient le résultat complet.

? `factorielle(3)` version terminale : valeurs de acc successives ?
+ 1, 3, 6, 6
- 1, 2, 6, 24
- 3, 2, 1
= acc = 1, puis 1×3, puis 3×2, puis 6×1.

? Valeur initiale d'un accumulateur pour une somme ?
+ 0
- 1
- None
= 0 est neutre pour l'addition.

? `somme_recursive([4, 6])` avec `L[0] + somme_recursive(L[1:])` ?
- 4
+ 10
- 6
= 4 + (6 + 0).

? Que fait `L[1:]` ?
- supprime L[1]
+ renvoie la liste sans son premier élément
- renvoie le deuxième élément
= C'est une tranche à partir de l'indice 1.

? `return f(n - 1) + 1` est…
- terminale
+ non terminale
- impossible
= L'addition se fait après le retour de l'appel.
```

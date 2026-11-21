---
id: procedures-fonctions
titre: Typage, procédures et fonctions
seance: Introduction + Chapitre I (§1–2)
importance: 4
---

## Avant de commencer

Tu dois savoir écrire un `print`, une affectation et une boucle `for` en Python (Python 1).

```exercice Vérifie ton prérequis
? Que fait `x = 3` puis `x = x * x` puis `print(x)` ?
= Il affiche `9`. On calcule à droite (3 × 3), puis on range le résultat dans `x`.
```

## Comment aborder ce chapitre

> [!astuce] **Une seule question à te poser : est-ce que ça RENVOIE quelque chose ?** Si non, c'est une procédure (`-> None`). Si oui, c'est une fonction (`-> int`, `-> str`…).

> [!piege] Confondre `print` et `return`. Une « fonction » qui affiche son résultat sans le renvoyer est en réalité une procédure : `x = f(5) + 1` plante car `f(5)` vaut `None`.

À la fin, tu sais traduire une procédure ou une fonction du pseudo-code du prof en Python typé.

## Idée 1 · Le typage rend le code lisible

Python devine les types à l'exécution (typage dynamique). Depuis Python 3.5 (PEP 484), on peut **annoter** les types : `nombre: int`, `-> int`. Le prof les met partout.

**Ce que t'apportent les annotations**

| Avantage | Ce que ça t'apporte |
|---|---|
| Clarté | on voit ce qu'on donne et ce qu'on reçoit |
| IDE | autocomplétion, alertes en direct |
| Refactoring | les outils repèrent les incohérences |
| Documentation | le type est écrit dans le code |
| Mypy | détecte les erreurs AVANT l'exécution |


```python
def double(n: int) -> int:
    return 2 * n

print(double(4))
print(double("ab"))   # Python n'empêche rien : les annotations sont indicatives
```

```sortie
8
abab
```

> [!retenir] Les annotations ne sont **pas vérifiées** par Python à l'exécution. Seul un outil comme **Mypy** signale l'erreur.

## Idée 2 · La procédure : des actions, pas de résultat

```html
<svg viewBox="0 0 560 120" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Procédure : paramètres en entrée, actions, rien en sortie. Fonction : paramètres en entrée, calcul, une valeur en sortie.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="150" y="10" width="200" height="40" rx="8" fill="none" stroke="currentColor"/><text x="250" y="35" text-anchor="middle">PROCEDURE : affiche, modifie</text>
<text x="20" y="35">paramètres →</text><text x="370" y="35">→ rien (None)</text>
<rect x="150" y="70" width="200" height="40" rx="8" fill="none" stroke="#D9824F" stroke-width="2"/><text x="250" y="95" text-anchor="middle">FONCTION : calcule</text>
<text x="20" y="95">paramètres →</text><text x="370" y="95" fill="#D9824F" font-weight="700">→ RETOURNER valeur</text>
</g></svg>
```

Une procédure exécute des instructions. Le prof la type `-> None`.

```etapes Traduire une procédure du pseudo-code
En-tête :: `PROCEDURE calculerCarré(nombre : ENTIER) -> None` devient `def calculer_carre(nombre: int) -> None:`
Variables locales :: `Var carre : int` devient une annotation à la première affectation : `carre: int = ...`
Affectation :: `carre <- nombre * nombre` devient `carre = nombre * nombre`
Affichage :: `AFFICHER(...)` devient `print(...)`
Fin :: `FIN PROCÉDURE` disparaît : c'est l'indentation qui ferme le bloc.
```

```python
def calculer_carre(nombre: int) -> None:
    carre: int = nombre * nombre
    print("Le carré de", nombre, "est", carre)

calculer_carre(5)
```

```sortie
Le carré de 5 est 25
```

## Idée 3 · La fonction : elle RETOURNE une valeur

Même structure, mais on termine par `RETOURNER` (`return`). Le résultat se range dans une variable.

```python
def calculer_carre(nombre: int) -> int:
    carre: int = nombre * nombre
    return carre

resultat: int = calculer_carre(5)
print("Le carré de 5 est :", resultat)
print(calculer_carre(3) + 1)
```

```sortie
Le carré de 5 est : 25
10
```

Une fonction sans paramètre existe aussi. L'exemple du prof tire un nombre au hasard avec `random.randint(1, 100)` :

```python nontest
import random
def generer_nombre_aleatoire() -> int:
    nombre: int = random.randint(1, 100)
    return nombre
```

> [!attention] Dans le pseudo-code du polycopié (fonction `calculerCarre`), la variable déclarée est `carre` mais la ligne de retour écrit `RETOURNER carré`. C'est la même variable : écris le même nom partout.

## S'exercer

```exercice Procédure ou fonction ?
? Écris une **procédure** typée `afficher_table(n: int)` qui affiche les 3 premiers multiples de n sur une ligne.
= `def afficher_table(n: int) -> None:` puis, dans le corps, `for i in range(1, 4): print(n * i, end=" ")`.
Elle ne renvoie rien : `-> None`.

? Écris une **fonction** typée `moyenne(a: float, b: float) -> float`. Que vaut `moyenne(12, 15)` ?
reponse: 13.5
= `return (a + b) / 2` donne 13.5.
```

## Flashcards

```cartes
Procédure :: Bloc d'instructions qui ne renvoie rien. En Python typé : `-> None`.
Fonction :: Bloc qui renvoie une valeur avec `return` (RETOURNER).
PEP 484 :: Proposition qui a introduit les annotations de type (Python 3.5).
Mypy :: Outil qui vérifie les annotations de type avant l'exécution.
`def f(n: int) -> int:` :: f reçoit un entier et renvoie un entier.
Annotation d'une variable locale :: `carre: int = nombre * nombre`
`<-` en pseudo-code :: L'affectation, `=` en Python.
```

## QCM du chapitre

```qcm
? Quelle est la différence entre une procédure et une fonction ?
- La procédure a toujours des paramètres
+ La fonction retourne une valeur, la procédure non
- La fonction ne peut pas afficher
= Une procédure fait des actions ; une fonction renvoie un résultat.

? Comment le prof type-t-il une procédure en Python ?
- `-> void`
+ `-> None`
- `-> proc`
= Une procédure ne renvoie rien : `None`.

? Depuis quelle version Python accepte-t-il les annotations de type (PEP 484) ?
- 2.7
+ 3.5
- 3.10
= Le type hinting est arrivé avec Python 3.5.

? `def f(n: int) -> int: return n * 2`. Que donne `f("a")` ?
- Une erreur de type
+ `'aa'`
- `None`
= Python ne vérifie pas les annotations à l'exécution.

? Quel outil détecte les erreurs de type avant l'exécution ?
- pip
+ Mypy
- IDLE
= Mypy lit les annotations et signale les incohérences.

? Que renvoie une fonction Python sans `return` ?
- 0
+ `None`
- une chaîne vide
= Sans `return`, la valeur renvoyée est `None`.

? Traduction de `carre <- nombre * nombre` ?
- `carre == nombre * nombre`
+ `carre = nombre * nombre`
- `carre -> nombre * nombre`
= `<-` est l'affectation, `=` en Python.

? Qu'est-ce qui ferme un bloc `def` en Python ?
- `FIN FONCTION`
- une accolade
+ le retour à l'indentation précédente
= L'indentation délimite les blocs en Python.

? `def g() -> int: return 7`. C'est…
+ une fonction sans paramètre
- une procédure sans paramètre
- une erreur de syntaxe
= Elle renvoie un entier : c'est une fonction, même sans paramètre.

? Lequel n'est PAS un avantage du typage cité par le prof ?
- documentation intégrée
- détection précoce des erreurs
+ le code devient obligatoirement plus rapide avec CPython
= Le gain de vitesse ne concerne que des outils comme Cython ou PyPy, pas CPython.
```

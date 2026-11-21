---
id: portee-variables
titre: Portée des variables · global, local, nonlocal
seance: Chapitre I (§5)
importance: 4
---

## Avant de commencer

Il faut savoir définir une fonction et l'appeler, et savoir qu'une fonction peut être écrite **dans** une autre.

```exercice Vérifie ton prérequis
? `def f(): a = 1` puis `f()` puis `print(a)`. Que se passe-t-il ?
= `NameError` : `a` n'existe que pendant l'appel de `f`.
```

## Comment aborder ce chapitre

> [!astuce] **Pense en boîtes emboîtées.** Le script est la grande boîte (global). Chaque fonction est une boîte dedans (local). Une fonction dans une fonction est une boîte encore plus petite.

> [!piege] Écrire `x = …` dans une fonction en croyant modifier la globale `x`. Sans `global x`, Python crée une **nouvelle** variable locale.

À la fin, tu sais dire, pour chaque variable, où elle vit et qui peut la modifier.

## Idée 1 · Trois niveaux de portée

```html
<svg viewBox="0 0 560 170" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Trois boîtes emboîtées : le script (global), la fonction externe (enclosing, nonlocal), la fonction interne (local).">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="10" y="10" width="540" height="150" rx="10" fill="none" stroke="currentColor"/><text x="24" y="30">Script : variables GLOBALES (modifiables avec global)</text>
<rect x="40" y="45" width="480" height="100" rx="10" fill="none" stroke="currentColor" stroke-dasharray="5 4"/><text x="54" y="65">externe() : z (modifiable depuis interne avec nonlocal)</text>
<rect x="80" y="80" width="400" height="50" rx="10" fill="none" stroke="#D9824F" stroke-width="2"/><text x="280" y="110" text-anchor="middle" fill="#D9824F" font-weight="700">interne() : variables LOCALES</text>
</g></svg>
```

- **Globale** : définie au niveau du script, lisible partout.
- **Locale** : créée dans une fonction à l'appel, détruite à la fin.
- **Nonlocale** : variable de la fonction englobante, modifiée depuis une fonction imbriquée.

## Idée 2 · `global` pour modifier une globale

```python
x: str = "global"

def sans_global() -> None:
    x = "locale"          # crée une locale, la globale ne change pas

def exemple() -> None:
    global x
    x = "modifiée globalement"

sans_global(); print(x)
exemple(); print(x)
```

```sortie
global
modifiée globalement
```

Une locale n'existe pas dehors :

```python nontest
def exemple() -> None:
    y: str = "locale"
    print(y)

exemple()   # affiche : locale
print(y)    # NameError: name 'y' is not defined
```

## Idée 3 · `nonlocal` pour les fonctions imbriquées

```etapes Lire l'exemple nonlocal du prof
Appel de externe() :: z vaut "externe" dans la boîte d'externe.
Appel de interne() :: `nonlocal z` dit : « le z dont je parle est celui de la boîte juste au-dessus ».
Affectation :: z devient "modifiée par interne" dans externe.
print(z) dans externe :: affiche la valeur modifiée.
```

```python
def externe() -> None:
    z: str = "externe"
    def interne() -> None:
        nonlocal z
        z = "modifiée par interne"
    interne()
    print(z)

externe()
```

```sortie
modifiée par interne
```

> [!retenir] `global` vise le script. `nonlocal` vise la fonction englobante **la plus proche**. `nonlocal` ne marche pas pour une variable globale (SyntaxError).

## S'exercer

```exercice Qui modifie quoi ?
? `c = 0`, `def inc(): global c; c += 1`, on appelle `inc()` trois fois. Que vaut `c` ?
reponse: 3
= `global c` fait pointer sur la globale : 0 → 1 → 2 → 3.

? Même code SANS la ligne `global c`. Que se passe-t-il à l'appel ?
= `UnboundLocalError` : `c += 1` fait de `c` une locale, lue avant d'être affectée.

? `def a(): n = 1; def b(): nonlocal n; n = n + 5; b(); return n`. Que renvoie `a()` ?
reponse: 6
= `b` modifie le `n` de `a` : 1 + 5 = 6.
```

## Flashcards

```cartes
Variable globale :: Définie au niveau du script, accessible partout.
Variable locale :: Créée à l'appel d'une fonction, détruite à la fin, invisible dehors.
Mot-clé global :: Permet de modifier une variable globale dans une fonction.
Mot-clé nonlocal :: Permet à une fonction imbriquée de modifier une variable de la fonction englobante la plus proche.
Affectation sans global :: Crée une locale du même nom ; la globale ne change pas.
`c += 1` sans global sur une globale c :: UnboundLocalError.
```

## QCM du chapitre

```qcm
? Une variable créée dans une fonction est…
+ locale
- globale
- nonlocale
= Elle n'existe que pendant l'appel.

? Quel mot-clé permet de modifier une globale dans une fonction ?
- nonlocal
+ global
- extern
= `global x` pointe vers la variable du script.

? `nonlocal` sert…
- à créer une globale
+ à modifier une variable de la fonction englobante
- à supprimer une variable
= Il vise la portée parente la plus proche.

? `x = 1`, `def f(): x = 2`, `f()`, `print(x)` ?
+ 1
- 2
- erreur
= Sans `global`, `x = 2` crée une locale.

? `def f(): y = 3`, `f()`, `print(y)` ?
- 3
- None
+ NameError
= `y` est détruite à la fin de l'appel.

? Combien de types de portée le prof distingue-t-il ?
- 2
+ 3
- 4
= Globale, locale et nonlocale.

? Où utilise-t-on `nonlocal` ?
- dans le script principal
+ dans une fonction imbriquée
- dans une classe uniquement
= Il n'a de sens que dans une fonction définie dans une autre.

? `c = 0`, `def f(): c += 1`, `f()` donne…
- c vaut 1
+ UnboundLocalError
- c vaut 0
= `c` est vue comme locale, lue avant affectation.

? Quand une variable locale est-elle détruite ?
+ à la fin de l'exécution de la fonction
- à la fin du programme
- jamais
= Elle vit le temps de l'appel.

? `global x` dans une fonction, puis `x = 5`. Résultat ?
- une locale x = 5
+ la globale x vaut 5
- une erreur
= La globale est modifiée.
```

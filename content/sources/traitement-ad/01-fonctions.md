---
id: fonctions
titre: Les fonctions en Python
seance: Séance 1 · 1er octobre 2026
importance: 4
---

Une **fonction** est un bloc de code nommé qui ne s'exécute **que lorsqu'on l'appelle**. Elle reçoit des données (les *paramètres*), fait un traitement, et peut renvoyer un résultat.

```flux Ce que fait une fonction
Entrées (arguments) -> Traitement (le corps) -> Sortie (return)
```

Pourquoi c'est indispensable : on écrit le code **une fois** et on le réutilise partout. Le programme devient plus lisible et plus facile à corriger.

## 1. Définir et appeler une fonction

Quatre ingrédients :

| Élément | Rôle | Obligatoire ? |
|---|---|---|
| `def nom(...):` | déclare la fonction | oui |
| indentation | délimite le corps | oui |
| paramètres entre `()` | données d'entrée | non (mais les `()` restent) |
| `return` | renvoie un résultat | non |

```python
def convertir_mad_vers_eur(montant_mad):
    montant_eur = montant_mad / 10.8
    return montant_eur

print(convertir_mad_vers_eur(1080))
```

```sortie
100.0
```

> [!retenir] **Définir n'est pas exécuter.** `def` range la fonction en mémoire. Rien ne se passe tant qu'on n'écrit pas `nom(...)`.

### Les trois formes de fonction vues en séance

```python
def afficher_bienvenue():                       # sans paramètre, sans retour
    print("Bienvenue aux etudiants de la FSA-BM !")

def afficher_infos_etudiant(nom, ville):        # avec paramètres, sans retour
    print("Nom :", nom, "| Ville :", ville)

def calculer_prix_reduit(prix_initial, pourcentage):   # avec retour
    return prix_initial - prix_initial * pourcentage / 100

afficher_bienvenue()
afficher_infos_etudiant("Amine", "Beni Mellal")
tarif_etudiant = calculer_prix_reduit(150, 30)
print(tarif_etudiant)
```

```sortie
Bienvenue aux etudiants de la FSA-BM !
Nom : Amine | Ville : Beni Mellal
105.0
```

> [!piege] `print` **n'est pas** `return`. Une fonction sans `return` renvoie `None`. Si l'énoncé dit « renvoie », il faut `return` : sinon `x = f(3) + 1` plante avec `TypeError`.

### Paramètre ou argument ?

- **Paramètre** : le nom dans l'en-tête → `prenom` dans `def afficher_prenom(prenom)`.
- **Argument** : la valeur passée à l'appel → `"Youness"` dans `afficher_prenom("Youness")`.

Chaque appel est indépendant : `distance_aller_retour(230)` et `distance_aller_retour(195)` utilisent chacun leur propre argument.

Le nombre d'arguments doit correspondre, sinon Python lève une `TypeError` :

```python nontest
def afficher_etudiant(nom, prenom):
    print(nom, prenom)

afficher_etudiant("Youssef")
# TypeError: afficher_etudiant() missing 1 required positional argument: 'prenom'
```

## 2. Les cinq façons de passer des arguments

### Positionnels : l'ordre compte

```python
def afficher_profil(ville, age):
    print(f"Habite a {ville} et a {age} ans.")

afficher_profil("Beni Mellal", 21)
afficher_profil(21, "Beni Mellal")      # ordre inversé : résultat absurde
```

```sortie
Habite a Beni Mellal et a 21 ans.
Habite a 21 et a Beni Mellal ans.
```

### Par mot-clé (nommés) : l'ordre ne compte plus

```python
def reserver_billet_oncf(depart, arrivee):
    print(f"Trajet ONCF : {depart} -> {arrivee}")

reserver_billet_oncf(arrivee="Marrakech", depart="Casablanca")
```

### Par défaut : paramètre optionnel

```python
def calculer_montant_total(prix_ht, tva=0.20, frais_port=0):
    return prix_ht * (1 + tva) + frais_port

print(calculer_montant_total(100))            # TVA 20 %, pas de port
print(calculer_montant_total(100, 0.20, 25))  # livraison Amana 25 DH
```

```sortie
120.0
145.0
```

> [!piege] Les paramètres **avec** valeur par défaut viennent **après** ceux **sans**. `def f(etablissement="FSABM", nom):` → `SyntaxError: parameter without a default follows parameter with a default`.

### `*args` : nombre libre d'arguments positionnels → **tuple**

```python
def calculer_moyenne(nom_etudiant, *notes):
    print(type(notes), notes)
    return sum(notes) / len(notes)

print(calculer_moyenne("Aymane", 14, 16, 12, 15))
```

```sortie
<class 'tuple'> (14, 16, 12, 15)
14.25
```

### `**kwargs` : nombre libre d'arguments nommés → **dictionnaire**

```python
def afficher_profil_etudiant(**kwargs):
    for cle, valeur in kwargs.items():
        print(f"{cle} : {valeur}")

afficher_profil_etudiant(nom="Souad", ville="Agadir", moyenne=15.5)
```

```sortie
nom : Souad
ville : Agadir
moyenne : 15.5
```

### L'ordre obligatoire quand on combine tout

```flux Ordre de déclaration des paramètres
positionnels -> *args -> par défaut / nommés -> **kwargs
```

```python
def fonction_combinee(arg1, arg2, *args, kwarg1="FSABM", **kwargs):
    print(arg1, arg2, args, kwarg1, kwargs)

fonction_combinee(10, 20, 30, 40, kwarg1="FST", ville="Beni Mellal", pays="Maroc")
```

```sortie
10 20 (30, 40) FST {'ville': 'Beni Mellal', 'pays': 'Maroc'}
```

Lecture : `10` et `20` remplissent `arg1`, `arg2` ; le surplus positionnel (`30, 40`) part dans le tuple `args` ; `kwarg1` est remplacé ; les noms inconnus (`ville`, `pays`) finissent dans le dictionnaire `kwargs`.

## 3. `return`, docstring, annotations, `pass`

**`return` arrête la fonction immédiatement.** Tout ce qui suit est ignoré. Sans `return`, la fonction renvoie `None`.

```python
def calculer_bourse(echelon):
    if echelon == 1:
        return 1900
    elif echelon == 2:
        return 2500
    return 0
    print("Jamais affiche")      # code mort

print(calculer_bourse(1), calculer_bourse(6))
```

```sortie
1900 0
```

> [!attention] Sur la diapositive du cours, la ligne `print("Montant reçu :", montant, ...)` apparaît **avant** `montant = calculer_bourse(...)`. Tel quel, ce code plante (`NameError: name 'montant' is not defined`) : une variable doit être affectée avant d'être utilisée.

- **Docstring** : texte entre `"""` juste sous l'en-tête ; lisible avec `nom_fonction.__doc__`.
- **Annotations** : `def convertir(montant: float, taux: float = 10.8) -> float:`. Elles sont **indicatives** : Python ne bloque rien si on passe un autre type.
- **`pass`** : corps vide autorisé (sinon `IndentationError`). Sert de « à faire plus tard ».

```python
def verifier_admission(moyenne: float) -> str:
    """Verifie si un etudiant de la FSABM est admis (moyenne >= 10/20)."""
    return "Admis" if moyenne >= 10 else "Ajourne"

def exporter_donnees():
    pass

print(verifier_admission.__doc__)
print(verifier_admission(12))
```

```sortie
Verifie si un etudiant de la FSABM est admis (moyenne >= 10/20).
Admis
```

## 4. Passage par référence d'objet

En Python, un paramètre reçoit **une référence vers l'objet**, pas une copie.

```etapes Ce qui se passe en mémoire
Avant l'appel :: `modules = ["Algebre", "Analyse"]` → la variable `modules` pointe vers une liste.
Pendant l'appel :: `ajouter_module(modules)` : le paramètre `liste_cours` pointe vers **la même** liste.
Modification sur place :: `liste_cours.append("Python")` modifie l'objet partagé.
Après l'appel :: `print(modules)` affiche `['Algebre', 'Analyse', 'Python']` : le changement est visible dehors.
Réaffectation :: Si la fonction fait `liste_cours = ["Physique"]`, elle crée une **nouvelle** liste locale. Le lien est rompu, `modules` ne change pas.
```

```python
def ajouter_module(liste_cours):
    liste_cours.append("Python")           # modifie l'objet partagé

def reinitialiser(liste_cours):
    liste_cours = ["Physique", "Chimie"]   # nouvelle référence locale

def modifier_note(note):
    note = 16                               # int immuable : nouvel objet

modules = ["Algebre", "Analyse"]
ajouter_module(modules); reinitialiser(modules)
valeur_note = 12; modifier_note(valeur_note)
print(modules, valeur_note)
```

```sortie
['Algebre', 'Analyse', 'Python'] 12
```

> [!retenir] Objet **mutable** (liste, dict) modifié **sur place** → visible dehors. **Réaffectation** ou type **immuable** (int, str, tuple) → invisible dehors.

## 5. Générateurs : `yield`

`yield` transforme la fonction en **générateur** : elle produit les valeurs **une par une**, à la demande, et garde son état entre deux valeurs. Utile pour de gros volumes : rien n'est stocké en entier en mémoire.

```python
def fonction_return():
    for x in [10, 20, 30]:
        return x * 2          # s'arrête au premier tour

def fonction_yield():
    for x in [10, 20, 30]:
        yield x * 2           # suspend, puis reprend

print(fonction_return())
print(list(fonction_yield()))
```

```sortie
20
[20, 40, 60]
```

## 6. Lambda, portée, `global`

**Lambda** : fonction anonyme d'une seule expression, `lambda arguments: expression`. Très utile comme argument d'une autre fonction (on la retrouvera avec Pandas : `apply`, `map`, `sort`).

```python
calculer_tva = lambda ht: ht * 0.20

def creer_calculateur_remise(pourcentage):
    return lambda prix: prix * (1 - pourcentage / 100)

remise_etudiant = creer_calculateur_remise(20)
print(calculer_tva(500), remise_etudiant(150))
```

```sortie
100.0 120.0
```

**Portée** : une variable créée **dans** une fonction est *locale* (détruite à la fin de l'appel, `NameError` dehors). Une variable créée hors de toute fonction est *globale* et lisible partout. Pour **modifier** une globale dans une fonction, il faut `global` ; sinon Python crée une locale du même nom.

```python
compteur_etudiants = 100
budget = 5000

def ajouter_etudiant():
    global compteur_etudiants
    compteur_etudiants += 1

def modifier_budget():
    budget = 10000            # locale : la globale ne bouge pas

ajouter_etudiant(); modifier_budget()
print(compteur_etudiants, budget)
```

```sortie
101 5000
```

## 7. La récursivité

Une fonction **récursive** s'appelle elle-même sur un problème plus petit. Elle a **toujours** un **cas de base** qui arrête les appels, sinon `RecursionError`.

```python
def factorielle(n):
    if n == 0 or n == 1:
        return 1                    # cas de base
    return n * factorielle(n - 1)   # appel récursif

print(factorielle(5))
```

```etapes Pile d'appels de factorielle(5)
Empilement :: `factorielle(5)` attend `5 * factorielle(4)`
Empilement :: `factorielle(4)` attend `4 * factorielle(3)`
Empilement :: `factorielle(3)` attend `3 * factorielle(2)`
Empilement :: `factorielle(2)` attend `2 * factorielle(1)`
Cas de base :: `factorielle(1)` renvoie **1** : on arrête d'empiler.
Dépilement :: 2 × 1 = 2 → 3 × 2 = 6 → 4 × 6 = 24 → 5 × 24 = **120**
```

## QCM du chapitre

```qcm
? Que renvoie une fonction qui ne contient aucune instruction `return` ?
- 0
- Une chaîne vide
+ `None`
- Une erreur
= Sans `return`, Python renvoie automatiquement `None`.

? Dans `def f(a, *b, **c)`, appelé par `f(1, 2, 3, x=4)`, que vaut `b` ?
- `[2, 3]`
+ `(2, 3)`
- `{'x': 4}`
- `2`
= `*b` regroupe les arguments positionnels en trop dans un **tuple**.

? Quelle définition est valide ?
- `def f(a=1, b):`
- `def f(**k, *a):`
+ `def f(a, b=2, *args, **kw):`
- `def f(*args, a, **kw, b=1):`
= Ordre imposé : positionnels, `*args`, par défaut / nommés, `**kwargs` en dernier.

? `L = [1]`, puis `def g(x): x.append(2)` et `g(L)`. Que vaut `L` ?
- `[1]`
+ `[1, 2]`
- `[2]`
- Erreur
= La liste est mutable et modifiée sur place : le changement est visible à l'extérieur.

? `n = 5`, puis `def h(v): v = 9` et `h(n)`. Que vaut `n` ?
+ `5`
- `9`
- `None`
- Erreur
= Un entier est immuable ; `v = 9` crée un nouvel objet local. `n` ne change pas.

? Que produit `list(x * 2 for x in [1, 2, 3])` comparé à une fonction avec `yield x * 2` ?
+ Les mêmes valeurs `[2, 4, 6]`, produites une par une
- `[2]` seulement
- `6`
- Une erreur : `yield` n'existe pas dans une boucle
= `yield` suspend la fonction à chaque valeur ; `return` l'aurait arrêtée au premier tour.

? Pourquoi une fonction récursive a-t-elle besoin d'un cas de base ?
- Pour aller plus vite
+ Pour arrêter les appels, sinon `RecursionError`
- Pour pouvoir utiliser `return`
- Ce n'est pas obligatoire
= Sans cas de base, la fonction s'appelle à l'infini jusqu'à dépasser la limite de la pile.

? Dans une fonction, `budget = 10000` sans `global budget` :
- modifie la variable globale `budget`
+ crée une variable locale ; la globale ne change pas
- provoque une erreur
- supprime la globale
= Sans le mot-clé `global`, l'affectation crée une variable locale du même nom.

? `f = lambda a, b: a * b` ; que vaut `f(3, 4)` ?
- `7`
+ `12`
- `34`
- Erreur : une lambda n'a qu'un argument
= Une lambda peut avoir plusieurs arguments mais une seule expression.

? Les annotations `def f(x: int) -> int:` :
- empêchent d'appeler `f("a")`
+ sont indicatives : Python ne vérifie rien à l'exécution
- convertissent `x` en entier
- sont obligatoires depuis Python 3
= Python reste à typage dynamique ; les annotations servent à la lecture et aux outils.
```

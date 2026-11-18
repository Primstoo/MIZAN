---
id: intro-python
titre: Introduction à Python · variables, types, conversions
seance: Séance 5 · octobre 2024
importance: 4
---

## Avant de commencer

Tu connais les variables et les types en pseudo-code (chapitre 1). Python fait la même chose, avec moins de cérémonie.

```exercice Vérifie ton prérequis
? En pseudo-code, quel type a la valeur 3.14 ?
reponse: réel
= C'est un nombre avec partie décimale : un **réel** (float en Python).
```

## Comment aborder ce chapitre

> [!astuce] Installe Python + VS Code (ou ouvre Google Colab) **maintenant** et tape chaque exemple. Python s'apprend avec les doigts.

> [!piege] `print("MIP" + 2023)` plante : on ne colle pas une chaîne et un nombre avec `+`. Utilise une virgule : `print("MIP", 2023)`.

À la fin, tu sais écrire et exécuter un fichier `.py`, créer des variables, connaître leur type avec `type()` et les convertir.

## Idée 1 · Python est un langage interprété

```flux Compilé ou interprété
Langage compilé (C, C++) : source -> compilateur -> exécutable binaire -> exécution rapide
```

```flux
Langage interprété (Python) : source .py -> interpréteur lit et exécute ligne par ligne -> résultat
```

Python est de **haut niveau**, interprété, et typé **dynamiquement**. Outils cités par le prof : IDLE, VS Code (extension Python), PyCharm, Spyder, Jupyter, Anaconda. Le premier programme du cours : un fichier `mip.py` exécuté par `python mip.py`.

## Idée 2 · Syntaxe : indentation et commentaires

- Les blocs sont délimités par l'**indentation** (4 espaces conseillés), pas par des accolades. Une indentation oubliée = erreur.
- `#` commence un commentaire. Un texte entre triples guillemets non affecté sert de commentaire multiligne (docstring).

```python
a = 10
if a > 5:
    print("a is greater than 5")  # bloc indenté
# print("MIP S1")  ← ligne désactivée
```

```sortie
a is greater than 5
```

## Idée 3 · Variables : on affecte, Python devine le type

Pas de déclaration : la variable naît à sa première affectation (`=`), et son type peut changer.

```python
a = 10
print(type(a))
a = "Béni Mellal"
print(type(a))
fil1, fil2, fil3 = "MIP", "PC", "BCG"
x = y = "MIP"
print(fil1, fil2, fil3, x, y)
```

```sortie
<class 'int'>
<class 'str'>
MIP PC BCG MIP MIP
```

Règles de nom : lettres, chiffres, `_` ; ne commence pas par un chiffre ; pas d'espace ni de tiret ; sensible à la casse (`age`, `Age`, `AGE` sont trois variables). Conventions : `anneeDeNaissance` (camelCase), `AnneeDeNaissance` (PascalCase), `annee_de_naissance` (snake_case).

> [!attention] Dans le texte extrait de la diapo, l'exemple « message 1 » a perdu son tiret bas : il faut lire `message_1` (valide) et `1_message` (invalide).

## Idée 4 · Les types de base

```grille Les types vus en séance 5
#cols: type | exemple | particularité
int | 25 | entier sans limite de taille
float | 98.6 | nombre à virgule
str | "MIP" | texte entre ' ou "
bool | True | True ou False
list | [25, "MIP"] | ordonnée, modifiable
tuple | (13, 'BCG') | ordonnée, non modifiable
dict | {"age": 30} | paires clé : valeur
set | {25, 45} | pas de doublons, pas d'ordre
NoneType | None | absence de valeur
complex | 1 + 2j | partie réelle et imaginaire
```

## Idée 5 · Conversions de type (casting)

```python
print(int("42"), int(2.8), float(1), str(3.0))
print(bool(5), bool(0))
print(list("hello"))
print(ord('A'), chr(65))
print(set([1, 2, 3, 2, 1]))
```

```sortie
42 2 1.0 3.0
True False
['h', 'e', 'l', 'l', 'o']
65 A
{1, 2, 3}
```

> [!retenir] `int(2.8)` vaut **2** : `int()` **tronque**, il n'arrondit pas. `int("3.5")` plante : la chaîne doit représenter un entier.

## S'exercer

```exercice Petits exercices
? Que vaut int(7.99) ?
reponse: 7
= int() supprime la partie décimale : **7**.

? Quels noms sont invalides : `note_1`, `1note`, `ma-note`, `Note` ?
= `1note` (commence par un chiffre) et `ma-note` (tiret interdit).

? Corrige `print("Année : " + 2024)`.
= `print("Année :", 2024)` ou `print("Année : " + str(2024))`.
```

## Flashcards

```cartes
Python est compilé ou interprété ? :: Interprété : le code est exécuté sans étape de compilation séparée.
Typage dynamique ? :: Pas de déclaration de type ; le type est fixé par la valeur et peut changer.
Comment Python délimite un bloc ? :: Par l'indentation (4 espaces conseillés).
Symbole de commentaire ? :: #
int(2.8) ? :: 2 (troncature)
ord('A') et chr(65) ? :: 65 et 'A'
Connaître le type d'une variable ? :: type(variable)
set([1, 2, 2]) ? :: {1, 2} : les doublons disparaissent.
```

## QCM du chapitre

```qcm
? Quel opérateur affecte une valeur en Python ?
- ←
+ =
- ==
= `=` affecte, `==` compare.

? `type(3.0)` renvoie :
- <class 'int'>
+ <class 'float'>
- <class 'str'>
= 3.0 a une partie décimale (même nulle).

? Quel nom de variable est valide ?
- 2myname
- my-name
+ my_name
= Le tiret bas est autorisé, pas le tiret ni le chiffre initial.

? `bool(0)` vaut :
+ False
- True
- 0
= 0 est « faux » ; tout autre nombre est vrai.

? `print("MIP" + 2023)` :
- affiche MIP2023
+ provoque une erreur TypeError
- affiche MIP 2023
= On ne concatène pas str et int.

? Quel type est non modifiable ?
- list
+ tuple
- dict
= Le tuple est immuable.

? `float("3.14")` renvoie :
+ 3.14
- "3.14"
- 3
= La chaîne est convertie en nombre à virgule.

? Que donne `a, b = 1, 2, 3` ?
- a = 1, b = 2
+ une erreur
- a = 1, b = (2, 3)
= Le nombre de variables doit égaler le nombre de valeurs.

? `Age` et `age` sont :
- la même variable
+ deux variables différentes
- une erreur
= Python est sensible à la casse.

? Avec z = 1 + 2j, `z.imag` vaut :
- 1.0
+ 2.0
- 2j
= imag renvoie la partie imaginaire sous forme de float.
```

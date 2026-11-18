---
id: chaines-operateurs
titre: Nombres, chaînes, opérateurs, input et print
seance: Séance 6 · 28 octobre 2024
importance: 5
---

## Avant de commencer

Tu connais les types int, float, str et la conversion `int()` (chapitre 5).

```exercice Vérifie ton prérequis
? Quel est le type de la valeur renvoyée par `input()` ?
reponse: str
= `input()` renvoie toujours une **chaîne** (str), même si l'utilisateur tape un nombre.
```

## Comment aborder ce chapitre

> [!astuce] Pour le découpage `[début:fin]`, pense aux indices comme des **barrières entre les lettres** : on garde ce qui est entre deux barrières, fin exclue.

> [!piege] `age = input("Âge : ")` puis `age + 1` plante : `age` est une chaîne. Il faut `int(input(...))`.

À la fin, tu sais indexer et découper une chaîne, utiliser ses méthodes, formater avec `format()` et les f-strings, et prévoir le résultat de tout opérateur.

## Idée 1 · Une chaîne est une suite de caractères indexés

```grille fil = "FPBM MIP S1" (indices positifs en haut, négatifs en bas)
#cols: F | P | B | M | ␣ | M | I | P | ␣ | S | 1
0 | 1 | 2 | 3 | 4 | *5 | *6 | *7 | *8 | *9 | 10
-11 | -10 | -9 | -8 | -7 | *-6 | *-5 | *-4 | *-3 | *-2 | -1
```

```python
fil = "FPBM MIP S1"
print(fil[2], len(fil))
print(fil[:7])
print(fil[2:])
print(fil[-6:-1])
print(repr(fil[2:9:2]))
```

```sortie
B 11
FPBM MI
BM MIP S1
MIP S
'B I '
```

> [!attention] La diapo annonce `fil[2:9:2]` → « B I ». En réalité le résultat est `'B I '` avec un **espace final** (indices 2, 4, 6, 8 : B, espace, I, espace). On le voit avec `repr()`.

## Idée 2 · Méthodes des chaînes et formatage

```python
fil = "fpbm mip s1"
print(fil.upper())
print("  FPBM MIP ".strip())
print("FPBM MIP".replace("FPBM", "FSTBM"))
print("fpbm,mip,s1".split(","))
produit, prix, version = "Smartphone", 3000, 100
print("Nom : {} , prix : {} , version : {}.".format(produit, prix, version))
print(f"Nom : {produit}, prix : {prix} DH")
pi = 3.14159265
print(f"La valeur de pi est d'environ {pi:.2f}")
print("Filière \"MIP\" de la FPBM.")
```

```sortie
FPBM MIP S1
FPBM MIP
FSTBM MIP
['fpbm', 'mip', 's1']
Nom : Smartphone , prix : 3000 , version : 100.
Nom : Smartphone, prix : 3000 DH
La valeur de pi est d'environ 3.14
Filière "MIP" de la FPBM.
```

`format()` accepte aussi des positions `{2}` et des noms `{name}`. Les chaînes sont **immuables** : `upper()` renvoie une nouvelle chaîne, l'originale ne change pas.

## Idée 3 · Opérateurs

```python
a, b = 10, 3
print(a + b, a - b, a * b, a / b, a % b, a // b, a ** b)
x = 10
x //= 3
x **= 2
print(x)
print(5 & 3, 5 | 3, 5 ^ 3, 5 << 2, 5 >> 2)
print(15 + 3 * 2, (8 + 2) * (7 + 3), 5 + 4 - 7 + 3)
print(bool(""), bool("MIP"), bool(None), bool([]))
```

```sortie
13 7 30 3.3333333333333335 1 3 1000
9
1 7 6 20 1
21 100 5
False True False False
```

> [!retenir] `/` donne **toujours** un float (10 / 2 = 5.0). `//` donne le quotient entier, `%` le reste, `**` la puissance.

Priorités : `**` puis `* / // %` puis `+ -`, puis comparaisons, puis `not`, `and`, `or`. À priorité égale, de gauche à droite.

## Idée 4 · input() et print()

```python nontest
age = int(input("Veuillez entrer votre age : "))
print("Votre age est :", age)
```

```python
print("MIP", end='@')
print("usms.ac.ma")
print('27', '10', '2023', sep='-')
```

```sortie
MIP@usms.ac.ma
27-10-2023
```

`sep` remplace l'espace entre les valeurs, `end` remplace le retour à la ligne final.

## S'exercer

```exercice Exercices types
? Que vaut "FSABM"[1:4] ?
reponse: SAB
= Indices 1, 2, 3 (4 exclu) : **SAB**.

? Que vaut 17 // 5 + 17 % 5 ?
reponse: 5
= 3 + 2 = **5**.

? (TD 5, ex. 2) Compter les chiffres et les lettres d'une chaîne.
= s = "MIP2024 S1" ; c = l = 0
for car in s : si car.isdigit() alors c += 1, sinon si car.isalpha() alors l += 1.
Résultat : 5 chiffres (2, 0, 2, 4, 1) et 4 lettres (M, I, P, S).
```

## Flashcards

```cartes
Premier caractère de s ? :: s[0]
Dernier caractère de s ? :: s[-1]
s[a:b] contient-il s[b] ? :: Non, la fin est exclue.
Différence / et // ? :: / donne un float, // le quotient entier.
Rôle de strip() ? :: Supprimer les espaces au début et à la fin.
Résultat de "a,b".split(",") ? :: ['a', 'b']
Afficher pi avec 2 décimales ? :: f"{pi:.2f}"
Type renvoyé par input() ? :: str : il faut convertir avec int() ou float().
```

## QCM du chapitre

```qcm
? `"MIP S1"[2]` vaut :
- I
+ P
- M
= Indices : M=0, I=1, P=2.

? `len("MIP S1")` vaut :
- 5
+ 6
- 4
= L'espace compte.

? `10 / 2` vaut :
- 5
+ 5.0
- 2
= `/` donne toujours un float.

? `2 ** 3 ** 2` vaut :
- 64
+ 512
- 36
= `**` s'évalue de droite à gauche : 3 ** 2 = 9, puis 2 ** 9.

? `"abc".upper()` modifie-t-il la chaîne d'origine ?
- Oui
+ Non, il renvoie une nouvelle chaîne
- Seulement si on écrit `upper(True)`
= Les chaînes sont immuables.

? `print("a", "b", sep="")` affiche :
+ ab
- a b
- a,b
= sep vide : rien entre les valeurs.

? `bool("")` vaut :
+ False
- True
- None
= Une chaîne vide est « fausse ».

? `5 << 2` vaut :
- 7
+ 20
- 1
= Décaler de 2 bits à gauche = multiplier par 4.

? Pour lire un entier au clavier :
- `input(int("..."))`
+ `int(input("..."))`
- `input("...")`
= On convertit la chaîne renvoyée par input.

? `f"{2/3:.2f}"` donne :
+ '0.67'
- '0.66'
- '0.6666'
= Arrondi à deux décimales.
```

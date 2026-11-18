---
id: conditions-boucles-python
titre: Conditions et boucles en Python
seance: Séance 7 · 4 novembre 2024
importance: 5
---

## Avant de commencer

Tu connais Si/Sinon, TantQue et Pour en pseudo-code (chapitre 2). Ici, on les traduit en Python.

```exercice Vérifie ton prérequis
? Quelle boucle de pseudo-code utilise-t-on quand le nombre de tours est connu ?
reponse: pour
= La boucle **Pour**. En Python, elle devient `for i in range(...)`.
```

## Comment aborder ce chapitre

> [!astuce] Traduis mot à mot : `si` → `if`, `sinon si` → `elif`, `sinon` → `else`, `tantque` → `while`, `pour i ← a jusqu'à b` → `for i in range(a, b + 1)`. Et n'oublie jamais les **deux-points** `:`.

> [!piege] `range(1, 10)` s'arrête à **9**. La borne de fin est exclue : pour aller jusqu'à 10, écris `range(1, 11)`.

À la fin, tu sais écrire if/elif/else, le ternaire, match-case, while et for avec range, break, continue, else et pass.

## Idée 1 · if / elif / else

```python
grade = 85
if grade >= 90:
    print("A")
elif grade >= 80:
    print("B")
elif grade >= 70:
    print("C")
else:
    print("D")
x, y = 10, 20
result = x if x > y else y
print(result)
a = b = 15
print("A") if a > b else print("égalité") if a == b else print("B")
```

```sortie
B
20
égalité
```

`and`, `or`, `not` combinent les conditions. `pass` remplit un bloc vide (un `if` ne peut pas être vide).

## Idée 2 · match-case (Python 3.10+)

C'est le « Selon » du pseudo-code. `case _` attrape tout le reste ; `|` regroupe plusieurs valeurs.

```python
def operation(a, b, op):
    match op:
        case "+":
            return a + b
        case "-":
            return a - b
        case "*" | "x":
            return a * b
        case _:
            return "opération inconnue"

print(operation(6, 3, "+"), operation(6, 3, "x"), operation(6, 3, "?"))
```

```sortie
9 18 opération inconnue
```

> [!attention] Les exemples match-case de la diapo sont des images non lisibles dans le support texte ; cet exemple est une rédaction ToumaiLearn (il prépare le TD 4, ex. 6).

## Idée 3 · while, break, continue, else

```flux Une itération de while
tester la condition -> si vraie : exécuter le bloc -> revenir tester -> si fausse : bloc else puis suite
```

```python
i = 0
while i < 5:
    i += 1
    if i == 3:
        continue
    print(i, end=" ")
print()
i = 1
while i < 6:
    i += 1
else:
    print("i n'est plus inférieure à 6 :", i)
```

```sortie
1 2 4 5 
i n'est plus inférieure à 6 : 6
```

> [!retenir] `break` sort de la boucle (et le `else` de la boucle est **sauté**). `continue` passe directement au tour suivant.

## Idée 4 · for et range()

```grille range(start, stop, step) : stop est exclu
#cols: appel | valeurs
range(5) | 0 1 2 3 4
range(2, 6) | 2 3 4 5
range(0, 11, 2) | 0 2 4 6 8 10
range(5, 0, -1) | 5 4 3 2 1
```

> [!attention] Sur la diapo, le commentaire de `range(2,6)` dit « start=2 et stop=5 ». Il faut lire **stop=6** : c'est la valeur 6 qui est exclue, la dernière valeur produite est 5.

```python
for fil in ["MIP", "BCG", "PC"]:
    print(fil, end=" ")
print()
for x in range(6):
    if x == 3:
        break
    print(x, end=" ")
else:
    print("La boucle est terminée")
print()
n = 3
for i in range(n):
    for j in range(n):
        print("*", end=" ")
    print()
```

```sortie
MIP BCG PC 
0 1 2 
* * * 
* * * 
* * * 
```

Le `else` n'a pas été affiché : la boucle a été cassée par `break`.

## S'exercer

```exercice Exercices du TD 4 et 5
? (TD 4, ex. 3) IMC = poids / taille². Pour 70 kg et 1,75 m, quelle catégorie (seuils 18,5 ; 25 ; 30) ?
= imc = 70 / 1.75 ** 2 ≈ 22.86. if imc < 18.5 : sous-poids ; elif imc < 25 : normal ; elif imc < 30 : surpoids ; else : obésité. Ici : **poids normal**.

? (TD 5, ex. 1) Table de multiplication de n.
= for i in range(1, 11): print(n, "x", i, "=", n * i)
Attention à range(1, 11) pour aller jusqu'à 10.

? Combien de lignes affiche `for i in range(2, 20, 5): print(i)` ?
reponse: 4
= Valeurs 2, 7, 12, 17 : **4** lignes.
```

## Flashcards

```cartes
« sinon si » en Python ? :: elif
Ternaire Python ? :: valeur_si_vrai if condition else valeur_si_faux
range(2, 6) ? :: 2, 3, 4, 5
Effet de break ? :: Sort immédiatement de la boucle ; le else de la boucle est sauté.
Effet de continue ? :: Passe au tour suivant sans finir le tour courant.
Quand s'exécute le else d'une boucle ? :: Quand la boucle se termine normalement (sans break).
Équivalent Python de « Selon » ? :: match … case (Python 3.10+), case _ pour le défaut.
Rôle de pass ? :: Instruction vide pour un bloc qui ne doit rien faire.
```

## QCM du chapitre

```qcm
? Que manque-t-il à `if x > 0 print(x)` ?
- Des parenthèses
+ Les deux-points et l'indentation
- Le mot then
= Syntaxe : `if x > 0:` puis bloc indenté.

? `list(range(1, 5))` vaut :
- [1, 2, 3, 4, 5]
+ [1, 2, 3, 4]
- [0, 1, 2, 3, 4]
= La fin est exclue.

? Combien de fois s'exécute `while False:` ?
+ 0
- 1
- infini
= La condition est testée avant le premier tour.

? `for i in range(5): if i == 3: break` ; quelles valeurs de i voit-on avant la sortie ?
+ 0, 1, 2, 3
- 0, 1, 2
- 0 à 4
= À i = 3, on entre dans le tour puis on sort par break.

? Le `else` d'un `for` s'exécute :
- toujours
+ si la boucle n'a pas été interrompue par break
- seulement si la boucle est vide
= break saute le else.

? `res = 6 if 62 > 45 else 10` donne :
+ 6
- 10
- True
= La condition est vraie.

? Dans match-case, `case _:` correspond à :
- la valeur `_`
+ tous les cas non traités avant
- une erreur
= C'est le cas par défaut.

? Quelle version de Python introduit match-case ?
- 3.6
+ 3.10
- 2.7
= Python 3.10.

? Deux boucles imbriquées de 4 tours chacune exécutent le bloc interne :
- 8 fois
+ 16 fois
- 4 fois
= 4 × 4.

? `range(10, 0, -3)` donne :
+ 10, 7, 4, 1
- 10, 7, 4, 1, -2
- 10, 7, 4
= On descend de 3, 0 exclu.
```

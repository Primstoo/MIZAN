---
id: td-corriges
titre: TD 1 à 6 corrigés
seance: TD · 2024-2025
importance: 5
---

Les fiches de TD 1 à 6 du Pr Madani n'ont pas de corrigé officiel. Les corrigés ci-dessous sont rédigés par ToumaiLearn, en Python. Les saisies `input()` sont remplacées par des valeurs fixes pour que chaque sortie soit vérifiée ; à l'examen, remets les `input()`.

> [!attention] Corrigés non officiels. Ils suivent les méthodes du cours (boucles, tableaux, tris) plutôt que les raccourcis Python (`max`, `sum`, `sort`), car l'examen d'algorithmique attend souvent la méthode.

## TD 1 · Instructions élémentaires

```python
# Ex. 4 et 5 : signe d'un nombre, signe d'un produit sans multiplier
def signe(n):
    if n < 0:
        return "valeur négative"
    elif n > 0:
        return "valeur positive"
    return "valeur nulle"

def signe_produit(a, b):
    if a == 0 or b == 0:
        return "nul"
    if (a > 0) == (b > 0):
        return "positif"
    return "négatif"

print(signe(-4), "|", signe(0))
print(signe_produit(-3, 5), signe_produit(-3, -5), signe_produit(0, 7))

# Ex. 7 : maximum de 3 valeurs ; Ex. 8 : ax + b = 0
a, b, c = 12, 45, 7
m = a
if b > m: m = b
if c > m: m = c
print("max =", m)
for a, b in [(2, -6), (0, 3), (0, 0)]:
    if a != 0:
        print("x =", -b / a)
    elif b == 0:
        print("tout réel est solution")
    else:
        print("pas de solution")
```

```sortie
valeur négative | valeur nulle
négatif positif nul
max = 45
x = 3.0
pas de solution
tout réel est solution
```

## TD 2 · Boucles

```python
# Ex. 4 : nombre premier
def est_premier(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

print([n for n in range(2, 20) if est_premier(n)])

# Ex. 6 : racine carrée par U(n+1) = 1/2 (Un + a/Un), U0 = 1, arrêt si écart < 0.001
a = 2
u = 1
while True:
    v = 0.5 * (u + a / u)
    if abs(v - u) < 0.001:
        break
    u = v
print(round(v, 4))
```

```sortie
[2, 3, 5, 7, 11, 13, 17, 19]
1.4142
```

> [!astuce] Tester les diviseurs jusqu'à √n suffit : si n = d × e avec d ≤ e, alors d ≤ √n.

## TD 3 · Tableaux

```python
T = [12, -5, 1, 2, 55, 100]
# Ex. 2 : max et min
mx = mn = T[0]
for i in range(1, len(T)):
    if T[i] > mx: mx = T[i]
    if T[i] < mn: mn = T[i]
print("max", mx, "min", mn)
# Ex. 4 : inverser sur place
for i in range(len(T) // 2):
    T[i], T[len(T) - 1 - i] = T[len(T) - 1 - i], T[i]
print(T)
# Ex. 5b : tri à bulles décroissant
for i in range(len(T) - 1, 0, -1):
    for j in range(1, i + 1):
        if T[j] > T[j - 1]:
            T[j], T[j - 1] = T[j - 1], T[j]
print(T)
# Ex. 6a : recherche séquentielle (s'arrête à la première occurrence)
VAL, POS, i = 55, -1, 0
while i < len(T) and POS == -1:
    if T[i] == VAL:
        POS = i
    i += 1
print("POS =", POS)
```

```sortie
max 100 min -5
[100, 55, 2, 1, -5, 12]
[100, 55, 12, 2, 1, -5]
POS = 1
```

La version 6b (dichotomique) est celle du chapitre 4, sur le tableau trié par ordre croissant.

## TD 4 · Conditions en Python

```python
# Ex. 4 : palindrome
for mot in ["radar", "level", "mardi"]:
    print(mot, mot == mot[::-1])

# Ex. 5 : second degré (racines réelles ou complexes)
import math
def second_degre(a, b, c):
    delta = b * b - 4 * a * c
    if delta > 0:
        return ((-b - math.sqrt(delta)) / (2 * a), (-b + math.sqrt(delta)) / (2 * a))
    if delta == 0:
        return (-b / (2 * a),)
    r, im = -b / (2 * a), math.sqrt(-delta) / (2 * a)
    return (complex(r, -im), complex(r, im))

print(second_degre(1, -3, 2), second_degre(1, 2, 1), second_degre(1, 2, 5))

# Ex. 2 : promotion -10 %
prix, promo = 250, True
print(prix * 0.9 if promo else prix)
```

```sortie
radar True
level True
mardi False
(1.0, 2.0) (-1.0,) ((-1-2j), (-1+2j))
225.0
```

La calculatrice de l'ex. 6 avec `match-case` est au chapitre 7. L'échange de l'ex. 7 s'écrit en Python `A, B = B, A`.

## TD 5 · Boucles en Python

```python
# Ex. 4 : nombre d'Armstrong
def armstrong(n):
    ch = str(n)
    return n == sum(int(c) ** len(ch) for c in ch)

print(armstrong(153), armstrong(1634), armstrong(154))

# Ex. 6 : triangle isocèle d'étoiles, hauteur 4
h = 4
for i in range(1, h + 1):
    print(" " * (h - i) + "* " * i)
```

```sortie
True True False
   * 
  * * 
 * * * 
* * * * 
```

## TD 6 · Listes et dictionnaires

```python
# Ex. 2
liste1, liste2 = [1, 2, 3], [10, 20, 30]
liste_concatenee = liste1 + liste2
double = [x * 2 for x in liste1]
liste_somme = [liste1[i] + liste2[i] for i in range(len(liste1))]
print(liste_concatenee, double, liste_somme)

# Ex. 4 : dictionnaire livre
livre = {"titre": "L'Alchimiste", "auteur": "Paulo Coelho", "année de publication": 1988}
livre["éditeur"] = "Anne Carrière"
livre["année de publication"] = 1994
del livre["auteur"]
print(livre)

# Ex. 5 : tuple -> dictionnaire en compréhension, noms alphabétiques seulement
T = ("Amine", "Souad", "R2D2", "Youssef")
d = {nom: len(nom) for nom in T if nom.isalpha()}
print(d)
```

```sortie
[1, 2, 3, 10, 20, 30] [2, 4, 6] [11, 22, 33]
{'titre': "L'Alchimiste", 'année de publication': 1994, 'éditeur': 'Anne Carrière'}
{'Amine': 5, 'Souad': 5, 'Youssef': 7}
```

## S'exercer

```exercice À refaire seul
? (TD 2, ex. 5) Somme harmonique pour N = 10, arrondie à 2 décimales ?
reponse: 2.93 ~0.01
= S = Σ 1/i pour i de 1 à 10 ≈ **2.93**.

? (TD 5, ex. 3) Calculer 2 puissance 10 avec une boucle.
reponse: 1024
= p = 1 ; for i in range(10): p *= 2 → **1024**.

? (TD 3, ex. 1) Compter les A[i] == B[i] pour A = [1, 2, 3, 4], B = [1, 0, 3, 0].
reponse: 2
= Indices 0 et 2 : **2**.
```

## Flashcards

```cartes
Tester si n est premier ? :: Chercher un diviseur d de 2 à √n ; aucun → premier (n ≥ 2).
Palindrome en Python ? :: mot == mot[::-1]
Nombre d'Armstrong ? :: Égal à la somme de ses chiffres élevés à la puissance du nombre de chiffres (153, 1634).
Échanger A et B en Python ? :: A, B = B, A
Discriminant négatif ? :: Deux racines complexes : -b/2a ± i·√(-Δ)/2a.
Inverser un tableau sur place ? :: Échanger T[i] et T[n-1-i] pour i de 0 à n//2 - 1.
```

## QCM du chapitre

```qcm
? 1634 est un nombre d'Armstrong car :
+ 1⁴ + 6⁴ + 3⁴ + 4⁴ = 1634
- 1 + 6 + 3 + 4 = 14
- 1634 est premier
= 4 chiffres, donc puissance 4.

? Pour ax + b = 0 avec a = 0 et b ≠ 0 :
- x = 0
+ pas de solution
- tout réel est solution
= 0·x = -b ≠ 0 est impossible.

? Jusqu'où tester les diviseurs pour savoir si 97 est premier ?
- 96
- 48
+ 9 (car 10² > 97)
= Il suffit d'aller jusqu'à √97 ≈ 9,8.

? Le signe de a × b sans multiplier, avec a = -2 et b = -7 :
+ positif
- négatif
- nul
= Même signe → positif.

? `"level"[::-1] == "level"` vaut :
+ True
- False
- Erreur
= level est un palindrome.

? Pour un tableau de 6 éléments, combien d'échanges pour l'inverser ?
- 6
+ 3
- 5
= On échange jusqu'au milieu : 6 // 2 = 3.

? Δ = b² − 4ac pour x² + 2x + 5 vaut :
- 24
+ -16
- 16
= 4 − 20 = −16 : racines complexes −1 ± 2i.

? La méthode de Héron (TD 2, ex. 6) s'arrête quand :
+ |U(n+1) − Un| < 0.001
- Un = 0
- n = 1000
= Critère d'arrêt de l'énoncé.

? Un prix de 250 DH avec −10 % devient :
- 240
+ 225
- 25
= 250 × 0,9.

? `{n: len(n) for n in ("ab", "cde")}` vaut :
+ {'ab': 2, 'cde': 3}
- [2, 3]
- {2: 'ab', 3: 'cde'}
= Clé = le nom, valeur = sa longueur.
```

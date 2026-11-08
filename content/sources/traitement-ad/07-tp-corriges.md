---
id: tp-corriges
titre: TP/TD 1 et 2 corrigés pas à pas
seance: Fiches de TP · A.U. 2026-2027
importance: 4
---

Les énoncés sont ceux du Pr Madani. Les noms de fonctions gardent **son orthographe** (`amstrong`) : garde-les tels quels pour coller à l'énoncé.

> [!astuce] Essaie **d'abord seul** chaque exercice (15 min max), puis compare. Recopier un corrigé ne fait pas progresser.

## TP/TD 1 · Exercice 1 : nombres d'Armstrong

Un nombre est d'Armstrong s'il est égal à la somme de ses chiffres **élevés à la puissance du nombre de chiffres** : 153 = 1³ + 5³ + 3³. Contrainte : **ne jamais convertir en chaîne**.

Les deux outils : `n % 10` donne le **dernier chiffre**, `n // 10` **enlève** le dernier chiffre.

```etapes Éplucher 153 chiffre par chiffre
Tour 1 :: 153 % 10 = **3**, puis 153 // 10 = 15
Tour 2 :: 15 % 10 = **5**, puis 15 // 10 = 1
Tour 3 :: 1 % 10 = **1**, puis 1 // 10 = 0 → on s'arrête
Bilan :: 3 chiffres ; 3³ + 5³ + 1³ = 27 + 125 + 1 = 153 → Armstrong
```

```python
def nombre_chiffres(nombre):
    nombre = abs(nombre)
    if nombre == 0:            # 0 a un chiffre, mais la boucle ne tournerait pas
        return 1
    n = 0
    while nombre > 0:
        nombre //= 10
        n += 1
    return n

def calcul_nombre_amstrong(x):
    p = nombre_chiffres(x)     # calculé UNE fois, avant la boucle
    s = 0
    while x > 0:
        s += (x % 10) ** p
        x //= 10
    return s

def est_un_nombre_amstrong(nombre):
    return nombre >= 0 and calcul_nombre_amstrong(nombre) == nombre

def afficher_nombres_amstrong(liste):
    return [n for n in liste if est_un_nombre_amstrong(n)]

print(afficher_nombres_amstrong([153, 154, 1634, 9474, 10, 370, 0, 5]))
```

```sortie
[153, 1634, 9474, 370, 0, 5]
```

> [!piege] Si tu appelles `nombre_chiffres(x)` **dans** la boucle, `x` rétrécit à chaque tour et la puissance change en cours de route : résultat faux. Et sans le cas `0`, `nombre_chiffres(0)` renvoie 0.

## Exercice 2 : `changer_car` sans `replace`

Une chaîne est **immuable** : on construit une nouvelle chaîne. `debut` et `fin` sont optionnels → valeurs par défaut (`fin=None`, car `len(chaine)` n'existe pas encore au moment de la définition).

```python
def changer_car(chaine, car1, car2, debut=0, fin=None):
    if fin is None or fin >= len(chaine):
        fin = len(chaine) - 1
    resultat = ""
    for i in range(len(chaine)):
        if debut <= i <= fin and chaine[i] == car1:
            resultat += car2
        else:
            resultat += chaine[i]
    return resultat

print(changer_car("banane", "a", "o"), changer_car("banane", "a", "o", 2), changer_car("banane", "a", "o", 0, 1))
```

```sortie
bonone banone bonane
```

> [!attention] « Se terminant à l'indice fin » : ici `fin` est **inclus**. Si le prof utilise la convention Python (fin exclue, comme `range`), remplace `<= fin` par `< fin` et la valeur par défaut par `len(chaine)`. Demande-lui.

## Exercice 3 : `verifie_ordre` (1, 2, 3 dans l'ordre)

Les exemples du prof montrent que 1, 2, 3 n'ont pas besoin d'être **collés** : c'est une **sous-séquence**. On garde un pointeur `k` sur le prochain nombre attendu.

```python
def verifie_ordre(liste):
    cible = [1, 2, 3]
    k = 0
    for x in liste:
        if x == cible[k]:
            k += 1
            if k == 3:
                return True
    return False

print(verifie_ordre([-1, 6, 7, 1, 2, 3, 5]), verifie_ordre([9, 1, 7, 4, 2, 5, 3]),
      verifie_ordre([6, 3, 12, 2, -4, 5, 1]), verifie_ordre([1, 3, 2]))
```

```sortie
True True False False
```

```grille Trace sur [9, 1, 7, 4, 2, 5, 3] : en couleur, les éléments qui font avancer k
#cols: 9 1 7 4 2 5 3
#rows: k après
0 *1 1 1 *2 2 *3
```

Un seul parcours : complexité **O(n)**.

## Exercice 4 : produit matriciel en Python pur

C(i, j) = Σₖ A(i, k) × B(k, j). Condition : colonnes de A = lignes de B. Trois boucles : `i` (lignes de A), `j` (colonnes de B), `k` (la somme).

```python nontest
def verifie_dimensions():
    while True:
        m = int(input("Lignes de A : "))
        n1 = int(input("Colonnes de A : "))
        n2 = int(input("Lignes de B : "))
        p = int(input("Colonnes de B : "))
        if n1 == n2:
            return m, n1, p
        print("Colonnes de A doivent etre = lignes de B. Recommence.")

def remplir_matrice(R, C):
    M = initialiser_matrice(R, C)       # l'énoncé impose de la réutiliser
    for i in range(R):
        for j in range(C):
            M[i][j] = float(input(f"M[{i}][{j}] = "))
    return M
```

```python
def initialiser_matrice(R, C):
    return [[0 for _ in range(C)] for _ in range(R)]

def calcul_produit_matriciel(A, B, C, m, n, p):
    for i in range(m):
        for j in range(p):
            s = 0                       # remis à zéro pour CHAQUE case
            for k in range(n):
                s += A[i][k] * B[k][j]
            C[i][j] = s
    return C

A = [[1, 2, 3], [4, 5, 6]]
B = [[7, 8], [9, 10], [11, 12]]
print(calcul_produit_matriciel(A, B, initialiser_matrice(2, 2), 2, 3, 2))
```

```sortie
[[58, 64], [139, 154]]
```

> [!piege] `[[0] * C] * R` crée R fois **la même** ligne : modifier `M[0][0]` modifie toutes les lignes. Il faut la compréhension de liste ci-dessus.

Programme principal : `m, n, p = verifie_dimensions()`, puis `A = remplir_matrice(m, n)`, `B = remplir_matrice(n, p)`, `C = initialiser_matrice(m, p)` et `calcul_produit_matriciel(A, B, C, m, n, p)`.

## TP/TD 2 · Exercice 1 : manipulation de tableaux NumPy

```python
import numpy as np

tab1 = np.arange(6)                              # 0 à 5
tab2 = np.random.randint(1, 11, size=(3, 3))     # 1 à 10 : high = 11 car exclu
tab1 = tab1 + 2
tab2 = tab2 * 2
print(tab1.shape, tab1.ndim, tab2.shape, tab2.ndim)
nb_lignes, nb_colonnes = tab2.shape
print(tab2[1].shape, tab2[1:, 1:].shape)        # 2e ligne ; sous-tableau sans 1re ligne/colonne
idx = (tab2.argmax(axis=0), tab2.argmax(axis=1), tab2.argmin(axis=0), tab2.argmin(axis=1))
sup_a_3 = tab1 > 3                               # AVANT le reshape : même taille que tab1
print(tab1[sup_a_3])
tab1 = tab1.reshape(2, 3)
tab3 = np.array([4, -5, 2])
tab4 = np.vstack((tab1, tab3))
print(tab4.sum(), tab2.mean(axis=0).shape)
```

```sortie
(6,) 1 (3, 3) 2
(3,) (2, 2)
[4 5 6 7]
28 (3,)
```

```grille tab4 = np.vstack((tab1, tab3)) : la ligne ajoutée est en couleur ; somme = 27 + 1 = 28
2 3 4
5 6 7
*4 *-5 *2
```

## Exercice 2 : matrices NumPy (et le piège de la question 9)

```python
rng_mat = np.random.normal(3, 2, 12)             # moyenne 3, ÉCART-TYPE 2
mat1 = np.floor(rng_mat.reshape(3, 4)).astype(int)   # entier inférieur, puis conversion
mat2 = np.arange(2, 14).reshape(4, 3)            # 12 valeurs de 2 à 13
produit = mat1 @ mat2                            # (3x4) @ (4x3) → (3x3)
transposee = mat1.T
carre = mat1[:, :3]                              # on exclut la dernière colonne → 3x3
print(produit.shape, transposee.shape, carre.shape)
```

```sortie
(3, 3) (4, 3) (3, 3)
```

> [!piege] La question 9 demande « l'inverse de la matrice **mat1** ». Or `mat1` est **3 × 4** : une matrice non carrée n'a **pas d'inverse** (`np.linalg.inv(mat1)` → `LinAlgError`). L'intention du prof est d'inverser la matrice **carrée de la question 8**. Écris-le explicitement sur ta copie.

```python
carre = np.array([[2, 1, 0], [1, 3, 1], [0, 1, 4]])   # exemple fixe (mat1 est aléatoire)
d = np.linalg.det(carre)
if abs(d) > 1e-10:
    inv = np.linalg.inv(carre)
    print(round(d), np.allclose(inv @ carre, np.eye(3)))
else:
    print("Non inversible")
```

```sortie
18 True
```

Pourquoi `abs(d) > 1e-10` et pas `d != 0` : un déterminant théoriquement nul peut valoir 1e-16 à cause des arrondis. Comme `mat1` est tirée au hasard puis arrondie, sa partie carrée **peut** être singulière : d'où le test demandé par l'énoncé.

## QCM du chapitre

```qcm
? `987 % 10` et `987 // 10` valent :
+ 7 et 98
- 98 et 7
- 9 et 87
- 7 et 98.7
= % donne le dernier chiffre, // l'enlève.

? 9474 est-il un nombre d'Armstrong ?
+ Oui : 9⁴ + 4⁴ + 7⁴ + 4⁴ = 9474
- Non : il faudrait des cubes
- Non : seul 153 l'est
- Impossible à savoir sans convertir en chaîne
= 6561 + 256 + 2401 + 256 = 9474.

? `verifie_ordre([3, 1, 2, 3])` renvoie :
+ True
- False
- Erreur
- 3
= 1 (indice 1), 2 (indice 2), 3 (indice 3) apparaissent dans l'ordre.

? Pour multiplier A (3 × 2) par B (2 × 5), le résultat a la forme :
- (2, 2)
+ (3, 5)
- (5, 3)
- impossible
= (m, n) @ (n, p) → (m, p).

? Dans le TD2, pourquoi `sup_a_3` doit-il être calculé avant `tab1.reshape(2, 3)` ?
+ L'énoncé le veut de la même taille que tab1 en 1D (6,)
- Sinon reshape lève une erreur
- Les masques ne marchent pas en 2D
- Pour gagner de la mémoire
= Après le reshape, le masque aurait la forme (2, 3).

? `np.linalg.inv(mat1)` avec mat1 de forme (3, 4) :
- renvoie une matrice 4 × 3
+ lève une erreur : la matrice n'est pas carrée
- renvoie la transposée
- renvoie une matrice remplie de NaN
= Seules les matrices carrées de déterminant non nul ont un inverse.
```

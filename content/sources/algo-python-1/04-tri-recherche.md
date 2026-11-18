---
id: tri-recherche
titre: Tri et recherche dans les tableaux
seance: Séance 4 · 17 octobre 2024
importance: 5
---

## Avant de commencer

Il faut savoir parcourir un tableau et **permuter** deux variables avec une variable `temp`.

```exercice Vérifie ton prérequis
? a ← 25, b ← 13. On exécute temp ← a ; a ← b ; b ← temp. Que vaut b ?
reponse: 25
= temp garde 25, a reçoit 13, puis b reçoit temp = **25**.
```

## Comment aborder ce chapitre

> [!astuce] Ne mémorise pas le code : mémorise **l'idée** de chaque tri en une phrase, puis déroule-la à la main sur 5 nombres. Le code se reconstruit tout seul.

> [!piege] La recherche dichotomique ne marche **que sur un tableau trié**. Sur un tableau en désordre, elle peut répondre « introuvable » alors que la valeur est là.

À la fin, tu sais dérouler et écrire le tri par sélection, le tri à bulles (2 versions), le tri par insertion, la recherche séquentielle et la recherche dichotomique.

## Idée 1 · Permuter deux variables

> [!attention] Sur la diapo « Permutation », la troisième ligne est `b ← a`. C'est une **erreur** : a vaut déjà 13 à ce moment, donc b reste 13 et l'ancienne valeur 25 est perdue. Il faut écrire **`b ← temp`**.

```python
a, b = 25, 13
temp = a
a = b
b = temp
print("Après la permutation a =", a, "et b =", b)
```

```sortie
Après la permutation a = 13 et b = 25
```

> [!attention] Dans plusieurs algorithmes de la séance, le tableau est déclaré `tab` mais rempli par `Note ← [...]`. Il faut lire `tab ← [...]`.

## Idée 2 · Tri par sélection : chercher le plus petit et le mettre devant

À chaque passe i, on cherche l'indice `min` du plus petit élément entre i et la fin, puis on l'échange avec la case i. N éléments → N − 1 passes.

```grille Tri par sélection de [23, 78, 45, 8, 32, 46] (orange = case fixée)
#rows: départ | passe 0 | passe 1 | passe 2 | passe 3 | passe 4
23 | 78 | 45 | 8 | 32 | 46
*8 | 78 | 45 | 23 | 32 | 46
*8 | *23 | 45 | 78 | 32 | 46
*8 | *23 | *32 | 78 | 45 | 46
*8 | *23 | *32 | *45 | 78 | 46
*8 | *23 | *32 | *45 | *46 | *78
```

```python
tab = [23, 78, 45, 8, 32, 46]
n = len(tab)
for i in range(n - 1):
    mini = i
    for j in range(i + 1, n):
        if tab[j] < tab[mini]:
            mini = j
    if mini != i:
        tab[i], tab[mini] = tab[mini], tab[i]
print(tab)
```

```sortie
[8, 23, 32, 45, 46, 78]
```

## Idée 3 · Tri à bulles : les grands remontent à la fin

On compare chaque élément à son **voisin** et on échange s'ils sont mal rangés. À la fin de chaque passe, le plus grand est au bout.

La **version 2** du prof ajoute un booléen `inversion` : si une passe entière se fait sans échange, le tableau est trié et on s'arrête.

```python
tab = [12, 45, 8, 5, 16]
L = len(tab)
inversion = True
passe = 0
while inversion:
    inversion = False
    for i in range(L - 1):
        if tab[i + 1] < tab[i]:
            inversion = True
            tab[i], tab[i + 1] = tab[i + 1], tab[i]
    L = L - 1
    passe += 1
    print("passe", passe, ":", tab)
```

```sortie
passe 1 : [12, 8, 5, 16, 45]
passe 2 : [8, 5, 12, 16, 45]
passe 3 : [5, 8, 12, 16, 45]
passe 4 : [5, 8, 12, 16, 45]
```

La passe 4 ne fait aucun échange : `inversion` reste faux, on sort.

## Idée 4 · Tri par insertion : comme des cartes en main

On prend chaque élément (`courant`) et on décale vers la droite les éléments triés plus grands que lui, puis on l'insère dans le trou.

```etapes Insertion sur [5, 2, 9, 1, 6] (exemple du prof)
Départ :: [5] est considéré trié.
On prend 2 :: 2 < 5, on décale 5 : [2, 5, 9, 1, 6]
On prend 9 :: 9 > 5, rien ne bouge : [2, 5, 9, 1, 6]
On prend 1 :: on décale 9, 5, 2 : [1, 2, 5, 9, 6]
On prend 6 :: on décale 9 : [1, 2, 5, 6, 9]
```

```python
tab = [23, 1, 10, 5, 2]
for i in range(1, len(tab)):
    courant = tab[i]
    j = i
    while j > 0 and tab[j - 1] > courant:
        tab[j] = tab[j - 1]
        j = j - 1
    tab[j] = courant
print(tab)
```

```sortie
[1, 2, 5, 10, 23]
```

## Idée 5 · Recherche séquentielle et dichotomique

**Séquentielle** : on compare la valeur cherchée à chaque case, de 0 à la fin. `pos ← -1` signifie « pas trouvé ».

> [!attention] La version du diapo ne s'arrête pas quand elle trouve : avec des doublons, `pos` contient la **dernière** position. Pour la première, on sort dès qu'on trouve (boucle TantQue ou `break`).

**Dichotomique** (tableau trié) : on regarde le milieu ; si la valeur est plus petite on garde la moitié gauche, sinon la droite. Chaque tour divise la zone par 2.

```etapes Chercher 20 dans [-2, 0, 4, 9, 11, 15, 20, 25, 30, 45]
Tour 1 :: id_min = 0, id_max = 9, milieu = 4 → tab[4] = 11 < 20 → id_min = 5
Tour 2 :: id_min = 5, id_max = 9, milieu = 7 → tab[7] = 25 > 20 → id_max = 6
Tour 3 :: id_min = 5, id_max = 6, milieu = 5 → tab[5] = 15 < 20 → id_min = 6
Tour 4 :: milieu = 6 → tab[6] = 20 : trouvé à la position 6, en 4 comparaisons au lieu de 7.
```

```python
tab = [-2, 0, 4, 9, 11, 15, 20, 25, 30, 45]
rech = 20
id_min, id_max = 0, len(tab) - 1
pos = -1
while id_min <= id_max and pos == -1:
    id_moy = (id_min + id_max) // 2
    if tab[id_moy] == rech:
        pos = id_moy
    elif rech < tab[id_moy]:
        id_max = id_moy - 1
    else:
        id_min = id_moy + 1
print("La valeur", rech, "est trouvée à la position", pos)
```

```sortie
La valeur 20 est trouvée à la position 6
```

> [!attention] Sur la diapo, la ligne `arret = vrai` utilise `=` au lieu de `←`, et `arret=false` mélange français et anglais : lire `arret ← vrai` et `arret = faux`. Et `(id_min + id_max)/2` doit être une division **entière**.

## S'exercer

```exercice Exercices du TD 3
? (TD 3, ex. 5) Comment modifier le tri par sélection pour trier en ordre **décroissant** ?
= On cherche le **maximum** au lieu du minimum : si tab[j] > tab[max] alors max ← j. Pour les bulles et l'insertion, on inverse aussi la comparaison (> devient <).

? (TD 3, ex. 6) Combien de comparaisons au maximum pour une recherche dichotomique dans 1000 éléments triés ?
indice: Combien de fois peut-on diviser 1000 par 2 avant d'arriver à 1 ?
reponse: 10
= 2¹⁰ = 1024 ≥ 1000 : environ **10** comparaisons, contre 1000 en séquentiel.

? Déroule le tri à bulles (version 1) sur [4, 3, 1] : donne le tableau après la première passe.
= Compare 4 et 3 → [3, 4, 1] ; compare 4 et 1 → [3, 1, 4]. Après la passe 1 : [3, 1, 4], le 4 est à sa place.
```

## Flashcards

```cartes
Idée du tri par sélection ? :: Chercher le minimum du reste et l'échanger avec la case i.
Idée du tri à bulles ? :: Comparer les voisins et échanger ; le plus grand remonte à la fin à chaque passe.
Rôle de « inversion » dans les bulles version 2 ? :: S'arrêter dès qu'une passe ne fait aucun échange.
Idée du tri par insertion ? :: Insérer chaque élément à sa place dans la partie déjà triée, en décalant les plus grands.
Condition de la recherche dichotomique ? :: Le tableau doit être trié.
Que signifie pos = -1 ? :: La valeur cherchée n'a pas été trouvée.
Erreur de la diapo « Permutation » ? :: b ← a au lieu de b ← temp.
Nombre de passes du tri par sélection pour N éléments ? :: N − 1
```

## QCM du chapitre

```qcm
? Après la passe 0 du tri par sélection sur [23, 78, 45, 8, 32, 46], le tableau est :
+ [8, 78, 45, 23, 32, 46]
- [8, 23, 32, 45, 46, 78]
- [23, 45, 8, 32, 46, 78]
= Le minimum 8 est échangé avec la case 0.

? Après une passe de tri à bulles, où est le plus grand élément ?
- Au début
+ À la fin
- Au milieu
= Il « remonte » de voisin en voisin jusqu'au bout.

? Quelle recherche exige un tableau trié ?
- Séquentielle
+ Dichotomique
- Les deux
= La dichotomie élimine une moitié en comparant au milieu : ça n'a de sens que si c'est trié.

? Dans la permutation correcte, la dernière instruction est :
- b ← a
+ b ← temp
- temp ← b
= temp a sauvegardé l'ancienne valeur de a.

? Le tri par insertion ressemble à :
+ trier des cartes dans sa main
- chercher un mot dans le dictionnaire
- faire remonter des bulles
= On insère chaque carte à sa place parmi celles déjà triées.

? Recherche dichotomique dans [1, 3, 5, 7, 9] de la valeur 7 : premier indice du milieu ?
- 1
+ 2
- 3
= (0 + 4) // 2 = 2, tab[2] = 5 < 7, on part à droite.

? À quoi sert le booléen `inversion` ?
+ À arrêter le tri dès qu'une passe ne fait aucun échange
- À trier en ordre décroissant
- À compter les échanges
= Pas d'échange = tableau trié.

? La recherche séquentielle du diapo, sur [7, 2, 7], cherchant 7, renvoie pos =
- 0
+ 2
- -1
= La boucle ne s'arrête pas : la dernière position trouvée écrase la première.

? Combien de passes fait le tri par sélection sur 6 éléments ?
- 6
+ 5
- 3
= N − 1 passes : le dernier élément est automatiquement à sa place.

? Pour trier en ordre décroissant par sélection, on cherche à chaque passe :
- le minimum
+ le maximum
- le milieu
= On place le plus grand en tête.
```

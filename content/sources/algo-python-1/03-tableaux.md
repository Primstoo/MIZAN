---
id: tableaux
titre: Les tableaux (pseudo-code)
seance: Séance 3 · 14 octobre 2024
importance: 5
---

## Avant de commencer

Il faut maîtriser la boucle `pour i ← 0 jusqu'à N − 1 faire` (chapitre 2).

```exercice Vérifie ton prérequis
? Combien de tours fait `pour i ← 0 jusqu'à 4 faire` ?
reponse: 5
= i vaut 0, 1, 2, 3, 4 : **5** tours.
```

## Comment aborder ce chapitre

> [!astuce] Un tableau, c'est une rangée de cases numérotées. Presque tous les exercices se résolvent avec **une boucle Pour qui visite chaque case**.

> [!piege] Les indices commencent à **0**. Un tableau de taille 5 a les cases 0 à **4**. Écrire `T[5]` sort du tableau.

À la fin, tu sais déclarer, remplir, afficher un tableau et y calculer somme, moyenne, minimum et nombre d'occurrences.

## Idée 1 · Un tableau = plusieurs valeurs du même type sous un seul nom

Stocker 100 notes avec 100 variables N1…N100 serait absurde. On déclare plutôt `Tableau Note[100] : Réel`.

```grille Tableau Note[5] ← {15, 12.5, 8, 7, 20}
#cols: 0 | 1 | 2 | 3 | 4
15 | 12.5 | *8 | 7 | 20
```

- Déclaration : `Tableau Nom[taille] : type`.
- Accès : `Note[2]` est la **troisième** case (ici 8). `Note[2] ← 16` la remplace.
- Toutes les cases ont le même type.

## Idée 2 · Le schéma universel : parcourir avec Pour

```
Constante taille : 5
Tableau Note[taille] : Réel
Variable i : Entier
Début
    pour i ← 0 jusqu'à taille − 1 faire
        Ecrire("Entrer l'élément ", i+1, " : ")
        Lire(Note[i])
    fin pour
    pour i ← 0 jusqu'à taille − 1 faire
        Ecrire(Note[i])
    fin pour
Fin
```

```etapes Les 3 calculs types du prof
Somme :: som ← 0, puis pour chaque i : som ← som + tab[i].
Moyenne :: La somme divisée par la taille : moyenne ← moyenne / nbProduits.
Minimum :: min ← tab[0], puis pour i de 1 à taille − 1 : si tab[i] < min alors min ← tab[i].
Occurrences de X :: nbOcc ← 0, puis si tab[i] = X alors nbOcc ← nbOcc + 1.
```

Vérification en Python avec les prix d'un exemple :

```python
prix = [12.0, 8.5, 20.0, 4.5, 5.0]
som = 0
mini = prix[0]
for i in range(len(prix)):
    som = som + prix[i]
    if prix[i] < mini:
        mini = prix[i]
print("somme :", som, "moyenne :", som / len(prix), "min :", mini)
```

```sortie
somme : 50.0 moyenne : 10.0 min : 4.5
```

> [!retenir] Pour le minimum, on initialise avec **tab[0]**, jamais avec 0 : si toutes les valeurs sont positives, 0 serait faux.

## S'exercer

```exercice Exercices du TD 3
? (TD 3, ex. 1) Compter les positions où A[i] = B[i] (deux tableaux de taille N). Pour A = {1, 4, 7, 2} et B = {1, 5, 7, 2} ?
reponse: 3
= nb ← 0 ; pour i ← 0 jusqu'à N − 1 faire si A[i] = B[i] alors nb ← nb + 1 finsi fin pour. Positions 0, 2, 3 : **3**.

? (TD 3, ex. 3) Produit scalaire de A = {1, 2, 3} et B = {4, 5, 6}.
reponse: 32
= ps ← 0 ; pour i : ps ← ps + A[i] * B[i]. 4 + 10 + 18 = **32**.

? (TD 3, ex. 4) Inverser l'ordre d'un tableau.
indice: Échange la case i avec la case N − 1 − i, mais seulement jusqu'au milieu.
= pour i ← 0 jusqu'à N div 2 − 1 faire
  temp ← T[i] ; T[i] ← T[N−1−i] ; T[N−1−i] ← temp
fin pour
Si on va jusqu'à N − 1, on ré-échange tout et le tableau revient à l'état initial.
```

## Flashcards

```cartes
Indice de la première case ? :: 0
Indice de la dernière case d'un tableau de taille N ? :: N − 1
Déclarer un tableau de 100 réels ? :: Tableau Note[100] : Réel
Initialiser le minimum ? :: min ← tab[0], puis comparer à partir de i = 1.
Compter les occurrences de X ? :: nbOcc ← 0 ; si tab[i] = X alors nbOcc ← nbOcc + 1.
Pourquoi un tableau plutôt que 100 variables ? :: Un seul nom, et une boucle remplace 200 lignes de Lire/Ecrire.
```

## QCM du chapitre

```qcm
? Tableau Note[5] ← {15, 12.5, 8, 7, 20}. Que vaut Note[1] ?
- 15
+ 12.5
- 8
= Les indices commencent à 0 : Note[1] est la deuxième case.

? Quel est le dernier indice valide de Tableau T[7] ?
- 7
+ 6
- 8
= Taille 7 : indices 0 à 6.

? Pour parcourir T[taille], la boucle correcte est :
+ pour i ← 0 jusqu'à taille − 1
- pour i ← 1 jusqu'à taille
- pour i ← 0 jusqu'à taille
= On s'arrête à taille − 1, dernière case.

? Les éléments d'un tableau en algorithmique sont :
+ tous du même type
- de types quelconques
- obligatoirement des entiers
= On parle de tableau d'entiers, de réels, de chaînes…

? Pour calculer une somme, on initialise `som` à :
+ 0
- 1
- tab[0] puis on recommence à 0
= 0 est neutre pour l'addition (1 pour un produit).

? Après `Note[2] ← 16` sur {15, 12.5, 8, 7, 20}, le tableau devient :
- {15, 16, 8, 7, 20}
+ {15, 12.5, 16, 7, 20}
- {16, 12.5, 8, 7, 20}
= Note[2] est la troisième case.

? Pour chercher le minimum, pourquoi ne pas initialiser min ← 0 ?
+ Si toutes les valeurs sont positives, le résultat serait 0, qui n'est pas dans le tableau
- Parce que 0 est interdit dans un tableau
- Ça ne change rien
= On part d'une vraie valeur du tableau : tab[0].

? Le nombre d'occurrences de 7 dans {7, 2, 7, 7, 1} est :
- 1
- 2
+ 3
= Trois cases valent 7.

? La taille d'un tableau correspond à :
+ son nombre de cases
- son dernier indice
- la plus grande valeur stockée
= Taille N : N cases, indices 0 à N − 1.

? Le produit scalaire de {1, 0, 2} et {3, 5, 4} vaut :
- 8
+ 11
- 15
= 3 + 0 + 8 = 11.
```

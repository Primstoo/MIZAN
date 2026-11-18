---
id: liste-tableau
titre: Liste avec un tableau (contiguë)
seance: Chapitre II · Listes (3)
importance: 3
---

## Avant de commencer

Il faut savoir parcourir un tableau avec une boucle `for` et passer une structure par adresse (`Liste *lst`, puis `lst->taille`).

```exercice Vérifie ton prérequis
? `int t[5] = {1,2,3}; ` Quels indices sont valides pour `t` ?
= De 0 à 4 (taille 5). Les cases 3 et 4 valent 0 ici car le tableau est partiellement initialisé.
```

## Comment aborder ce chapitre

> [!astuce] Ici tout est une histoire de **décalage**. Insérer au milieu = pousser vers la droite ; supprimer = tirer vers la gauche. Le sens de la boucle est la seule vraie difficulté.

> [!piege] Décaler vers la droite en partant du **début** (`for (i = index; …; i++)`) : tu écrases tout avec la même valeur. Pour insérer, on part de la **fin**.

À la fin, tu sais écrire une liste contiguë complète (TD1 ex. 1.1, TP1 ex. 1) et dire quand elle est préférable à une liste chaînée.

## Idée 1 · Un tableau + un compteur

```c nontest
#define MAX 100
typedef struct {
    int data[MAX];   /* les éléments */
    int taille;      /* nombre d'éléments présents */
} Liste;
void initialiserListe(Liste *lst) { lst->taille = 0; }
```

Seules les cases `0 … taille-1` comptent. Accès direct O(1), mais capacité fixe (`MAX`) et insertion/suppression au milieu en O(n).

## Idée 2 · Insérer à une position = décaler à droite

```grille insererA(lst, 9, 1) sur [4, 7, 8] : décalage depuis la fin, puis écriture
#cols: 0 1 2 3
#rows: avant décalé après
4 7 8 ~_
4 7 *7 *8
4 !9 7 8
```

```etapes insererA(lst, valeur, index)
Liste pleine ? :: `if (lst->taille >= MAX)` : message et retour.
Indice valide ? :: `0 ≤ index ≤ taille` (index = taille revient à ajouter à la fin).
Décaler :: `for (i = lst->taille; i > index; i--) lst->data[i] = lst->data[i-1];`
Écrire et compter :: `lst->data[index] = valeur; lst->taille++;`
```

## Idée 3 · Supprimer = décaler à gauche

```c
#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int taille; } Liste;

void initialiserListe(Liste *lst) { lst->taille = 0; }
void afficherListe(Liste *lst) {
    if (lst->taille == 0) { printf("La liste est vide.\n"); return; }
    printf("Liste : ");
    for (int i = 0; i < lst->taille; i++) printf("%d ", lst->data[i]);
    printf("\n");
}
void insererA(Liste *lst, int valeur, int index) {
    if (lst->taille >= MAX) { printf("Liste pleine !\n"); return; }
    if (index < 0 || index > lst->taille) { printf("Indice invalide !\n"); return; }
    for (int i = lst->taille; i > index; i--) lst->data[i] = lst->data[i - 1];
    lst->data[index] = valeur;
    lst->taille++;
}
void supprimerElement(Liste *lst, int valeur) {
    int i, index = -1;
    if (lst->taille == 0) { printf("Liste vide !\n"); return; }
    for (i = 0; i < lst->taille; i++)
        if (lst->data[i] == valeur) { index = i; break; }
    if (index == -1) { printf("Element non trouve !\n"); return; }
    for (i = index; i < lst->taille - 1; i++) lst->data[i] = lst->data[i + 1];
    lst->taille--;
}
int rechercher(Liste *lst, int valeur) {
    for (int i = 0; i < lst->taille; i++) if (lst->data[i] == valeur) return i;
    return -1;
}
int main(void) {
    Liste L;
    initialiserListe(&L);
    insererA(&L, 4, 0); insererA(&L, 7, 1); insererA(&L, 8, 2);
    insererA(&L, 9, 1);
    afficherListe(&L);
    insererA(&L, 5, 9);
    printf("position de 7 : %d\n", rechercher(&L, 7));
    supprimerElement(&L, 9);
    supprimerElement(&L, 42);
    afficherListe(&L);
    return 0;
}
```

```sortie
Liste : 4 9 7 8 
Indice invalide !
position de 7 : 2
Element non trouve !
Liste : 4 7 8 
```

> [!attention] Sur la diapo `supprimerElement`, l'accolade du `if (lst->taille == 0) { … return;` n'est pas fermée : tout le reste de la fonction se retrouve dans le `if`. Ferme-la juste après `return;`. La diapo écrit aussi « Indece » pour « Indice ».

> [!prof] Le TP1 demande la même liste avec un **tableau alloué dynamiquement** : `int *data = malloc(capacite * sizeof(int));` au lieu de `int data[MAX]`, et `free(data)` à la fin.

## S'exercer

```exercice Exercices types (TD1 ex. 1.1)
? Écris `Supprimer(liste *lst, int pos)` qui supprime l'élément à la **position** `pos` (et non une valeur).
= `if (pos < 0 || pos >= lst->taille) { printf("indice invalide"); return; }`
`for (i = pos; i < lst->taille - 1; i++) lst->donnee[i] = lst->donnee[i+1];`
`lst->taille--;` Attention : ici `pos == taille` est **invalide** (contrairement à l'insertion).

? Combien d'affectations fait `insererA` pour insérer en position 0 dans une liste de 50 éléments (décalages + écriture) ?
reponse: 51
= 50 décalages vers la droite + 1 écriture.

? Quelle liste choisir pour lire souvent le k-ième élément et insérer rarement ?
= La liste contiguë (tableau) : accès direct O(1).
```

## Flashcards

```cartes
Les 2 champs d'une liste contiguë :: Le tableau `data[MAX]` et l'entier `taille`.
Initialiser une liste contiguë :: `lst->taille = 0;`
Indices valides pour insérer :: De 0 à taille inclus.
Indices valides pour supprimer par position :: De 0 à taille - 1.
Sens de la boucle pour insérer :: De la fin vers l'indice (`i = taille; i > index; i--`).
Sens de la boucle pour supprimer :: De l'indice vers la fin (`i = index; i < taille-1; i++`).
Coût de l'accès au i-ème élément :: O(1).
Coût d'une insertion au milieu :: O(n) à cause du décalage.
```

## QCM du chapitre

```qcm
? Dans une liste contiguë vide, `taille` vaut :
+ 0
- -1
- MAX
= On initialise `taille` à 0.

? La liste est pleine quand :
- `taille == 0`
+ `taille >= MAX`
- `taille == MAX - 1`
= Toutes les cases 0…MAX-1 sont occupées.

? Pour insérer en position `index`, la boucle de décalage est :
- `for (i = index; i < taille; i++) data[i+1] = data[i];`
+ `for (i = taille; i > index; i--) data[i] = data[i-1];`
- `for (i = 0; i < index; i++) data[i] = data[i+1];`
= On part de la fin pour ne rien écraser.

? `insererA(&L, x, L.taille)` :
+ ajoute x à la fin
- est refusé
- écrase le dernier
= index = taille est valide : aucun décalage.

? `rechercher` retourne quoi si la valeur est absente ?
- 0
+ -1
- NULL
= -1 n'est jamais un indice valide.

? Coût de la suppression du premier élément d'une liste contiguë de n éléments :
- O(1)
+ O(n)
- O(log n)
= Tout le reste est décalé vers la gauche.

? Inconvénient principal de la version `int data[MAX]` :
+ capacité fixe
- accès lent
- pas de recherche possible
= La taille maximale est figée à la compilation.

? Après suppression, il ne faut pas oublier :
- `free(lst)`
+ `lst->taille--`
- `lst->taille = 0`
= Sinon la dernière case est comptée deux fois.

? Sur [4, 9, 7, 8], `supprimerElement(&L, 9)` donne :
- [4, 7, 8, 8]
+ [4, 7, 8]
- [9, 7, 8]
= Décalage à gauche, puis taille passe de 4 à 3.

? La diapo `supprimerElement` a un défaut de syntaxe :
- un `;` en trop
+ une accolade non fermée après le test « liste vide »
- un mauvais type de retour
= Il faut fermer le `if` juste après `return;`.
```

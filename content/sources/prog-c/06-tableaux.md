---
id: tableaux
titre: Tableaux à une et deux dimensions
seance: Chapitre 6 · Les tableaux
importance: 5
---

## Avant de commencer

Il faut maîtriser la boucle `for` (chapitre 3) : on parcourt un tableau avec un compteur de 0 à N−1.

```exercice Vérifie ton prérequis
? Quelles valeurs prend I dans `for (I = 0; I < 5; I++)` ?
= 0, 1, 2, 3, 4 : exactement les indices d'un tableau de 5 cases.
```

## Comment aborder ce chapitre

> [!astuce] Dessine les cases. Un tableau 1D est une rangée ; un 2D est une grille rangée **ligne par ligne** en mémoire.

> [!piege] Décalage d'indice : en algorithmique T[1]..T[N], en C **T[0]..T[N-1]**. Écrire `T[N]` sort du tableau, sans erreur à la compilation.

À la fin, tu sais déclarer, initialiser, remplir, afficher et parcourir un tableau 1D ou 2D, et calculer la place qu'il occupe.

## Idée 1 · Déclaration et mémoire

`type nom[dimension];` — N composantes de M octets occupent **N × M** octets, côte à côte. Le nom du tableau représente l'adresse de la première case.

```grille short A[5] = {1200, 2300, 3400, 4500, 5600} (short = 2 octets)
#cols: A[0], A[1], A[2], A[3], A[4]
#rows: valeur, adresse
*1200, 2300, 3400, 4500, 5600
1E04, 1E06, 1E08, 1E0A, 1E0C
```

Exemple du cours : `long T[15];` avec sizeof(long) = 4 → 60 octets (sur gcc Linux 64 bits, `long` fait 8 octets → 120).

## Idée 2 · Initialisation et réservation automatique

```c
#include <stdio.h>
int main(void)
{
    short A[5] = {200, 300, 400};      /* le reste vaut 0 */
    int B[] = {10, 20, 30, 40, 50};    /* taille calculée : 5 */
    int I;
    for (I = 0; I < 5; I++) printf("%d ", A[I]);
    printf("\n%zu octets pour B\n", sizeof(B));
    return 0;
}
```

```sortie
200 300 400 0 0 
20 octets pour B
```

> [!attention] Le cours affiche `short A[5]={200,300,400}` comme « 1200 2300 3400 0 0 » : les valeurs sont 200 300 400 0 0 (copier-coller de l'exemple précédent). Et `short A[3] = {200,300,400,500,600};` (trop de valeurs) est bien une erreur. Le cours compte aussi 2 octets par int (« 10 octets ») : avec gcc c'est 4 octets, donc 20.

## Idée 3 · Remplir, afficher, chercher

Schéma type : une boucle `for` par traitement. Pour lire : `scanf("%d", &A[I]);` (le `&` est indispensable).

```c
#include <stdio.h>
int main(void)
{
    int A[6] = {12, -4, 7, 19, 0, 7};
    int I, min = A[0], max = A[0], somme = 0;
    for (I = 0; I < 6; I++) {
        somme += A[I];
        if (A[I] < min) min = A[I];
        if (A[I] > max) max = A[I];
    }
    printf("min=%d max=%d moyenne=%.2f\n", min, max, somme / 6.0);
    for (I = 5; I >= 0; I--) printf("%d ", A[I]);   /* à l'envers */
    printf("\n");
    return 0;
}
```

```sortie
min=-4 max=19 moyenne=6.83
7 0 19 7 -4 12 
```

> [!attention] Dans l'exemple d'affichage du cours, `return 0;` est placé **avant** `printf("\n");` : cette dernière ligne ne s'exécute jamais. `return` doit être la dernière instruction de `main`.

> [!piege] `min` et `max` s'initialisent avec **A[0]**, pas avec 0 : si toutes les valeurs sont négatives, max = 0 serait faux.

## Idée 4 · Tableaux à deux dimensions

`type nom[L][C];` : L lignes, C colonnes, L × C × M octets. `A[i][j]` = ligne i, colonne j (de 0). Stockage **ligne après ligne**.

```grille short A[3][2] = {{1,2},{10,20},{100,200}}
#cols: col 0, col 1
#rows: ligne 0, ligne 1, ligne 2
*1, *2
10, 20
100, 200
```

En mémoire : 1 2 10 20 100 200 (ligne 0, puis ligne 1, puis ligne 2).

```c
#include <stdio.h>
int main(void)
{
    int B[4][4] = {{1}, {1, 1}, {1, 1, 1}, {1, 1, 1, 1}};  /* manquants = 0 */
    int i, j, trace = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) printf("%d ", B[i][j]);
        printf("\n");
        trace += B[i][i];
    }
    double T[10][15];
    printf("trace=%d, T occupe %zu octets\n", trace, sizeof(T));
    return 0;
}
```

```sortie
1 0 0 0 
1 1 0 0 
1 1 1 0 
1 1 1 1 
trace=4, T occupe 1200 octets
```

`int A[][10] = {…3 lignes…};` : le nombre de **lignes** peut être omis, jamais celui des colonnes.

> [!retenir] Indices de 0 à N−1. Taille = N × sizeof(type). Une boucle par dimension. Initialisation partielle → le reste vaut 0. Trop de valeurs → erreur.

## S'exercer

```exercice Taille
? Combien d'octets pour `int M[3][4];` avec int sur 4 octets ?
reponse: 48
= 3 × 4 × 4 = 48.
```

```exercice TP 3 · inverser un tableau
? Écris `void reverse_array(int a[], int n)` qui renverse le tableau sur place.
= On échange a[i] et a[n-1-i] pour i de 0 à n/2 − 1 : `for (i = 0; i < n / 2; i++) { t = a[i]; a[i] = a[n-1-i]; a[n-1-i] = t; }`. Le tableau est modifié chez l'appelant car on passe son adresse (voir chapitre 7). Programme complet au chapitre « TD et TP corrigés ».
```

```exercice Accès 2D
? Dans `int A[3][10]`, quelle composante est la 2e ligne, 5e colonne ?
= `A[1][4]` (indices décalés de 1).
```

## Flashcards

```cartes
Indice du dernier élément de T[N] ? :: N − 1
Place occupée par N composantes de M octets ? :: N × M octets
`int A[5] = {1, 2};` contient ? :: 1 2 0 0 0
Ordre de rangement d'un tableau 2D ? :: Ligne par ligne
Que représente le nom d'un tableau ? :: L'adresse de son premier élément
Dimension qu'on peut omettre en 2D ? :: Le nombre de lignes (la première)
Lire T[I] au clavier ? :: `scanf("%d", &T[I]);`
```

## QCM du chapitre

```qcm
? `int A[5];` : quelles composantes existent ?
- A[1] à A[5]
+ A[0] à A[4]
- A[0] à A[5]
= 5 cases, indices 0 à 4.

? `int A[5] = {10, 20};` : que vaut A[3] ?
- Indéterminé
+ 0
- 20
= Les composantes non initialisées valent 0.

? `double T[10][15];` occupe :
- 150 octets
+ 1200 octets
- 600 octets
= 10 × 15 × 8.

? `short A[3] = {1, 2, 3, 4};` :
- Ignore 4
+ Erreur : trop de valeurs
- Agrandit le tableau
= Il est interdit de donner plus de valeurs que la dimension.

? Dans `short A[3][2]={{1,2},{10,20},{100,200}}`, la 4e valeur en mémoire est :
- 10
+ 20
- 100
= Ordre : 1, 2, 10, 20, 100, 200.

? Quelle déclaration est valide ?
+ `int A[][3] = {{1,2,3},{4,5,6}};`
- `int A[2][] = {{1,2,3},{4,5,6}};`
- `int A[][] = {{1,2},{3,4}};`
= Seule la première dimension peut être omise.

? Pour trouver le maximum, on initialise max avec :
- 0
+ La première case du tableau
- -1
= Sinon un tableau de négatifs donne un faux résultat.

? `int B[] = {4, 5, 8};` : sizeof(B) avec int sur 4 octets ?
- 3
+ 12
- 4
= 3 × 4.

? Dans un 2D, `A[i][j]` désigne :
+ Ligne i, colonne j
- Colonne i, ligne j
- La case numéro i×j
= Le premier indice est la ligne.

? Écrire T[N] pour un tableau de N cases :
- Provoque une erreur de compilation
+ Lit hors du tableau (comportement indéfini)
- Renvoie 0
= Le C ne vérifie pas les bornes.
```

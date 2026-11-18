---
id: pointeurs
titre: Les pointeurs (adresses, *, tableaux, allocation)
seance: Chapitre 7 · Les pointeurs
importance: 5
---

## Avant de commencer

Il faut avoir compris le passage par valeur (chapitre 5) et le fait que le nom d'un tableau est l'adresse de sa première case (chapitre 6).

```exercice Vérifie ton prérequis
? Pourquoi écrit-on `scanf("%d", &x);` avec un `&` ?
= Parce que scanf doit **écrire** dans x : on lui donne l'adresse de x. Les pointeurs généralisent cette idée.
```

## Comment aborder ce chapitre

> [!astuce] Lis `&` comme « adresse de » et `*` comme « ce qui est à l'adresse ». Dessine toujours deux boîtes : la variable et le pointeur avec une flèche.

> [!piege] Confondre `p` (une adresse) et `*p` (la valeur pointée). `p = 12;` change l'adresse (bug) ; `*p = 12;` change la variable pointée.

À la fin, tu sais déclarer un pointeur, l'utiliser pour modifier une variable dans une fonction, parcourir un tableau avec `*(P+i)` et allouer un tableau avec malloc.

## Idée 1 · Adresse et pointeur

Chaque variable occupe des octets à une **adresse**. Un **pointeur** est une variable qui contient une adresse, et il est lié à un type : `int *pta;` pointe sur un int.

```html
<svg viewBox="0 0 560 150" role="img" aria-label="Le pointeur ptint contient l'adresse de a, la flèche va de ptint vers a" style="max-width:560px;width:100%">
<g font-family="monospace" font-size="16" fill="currentColor" stroke="currentColor">
<rect x="40" y="50" width="130" height="50" fill="none"/>
<text x="95" y="82" stroke="none">12</text>
<text x="40" y="40" stroke="none">a  (adresse bfbff000)</text>
<rect x="340" y="50" width="160" height="50" fill="none" stroke="#D9824F"/>
<text x="360" y="82" stroke="none">bfbff000</text>
<text x="340" y="40" stroke="none">ptint</text>
<path d="M340 75 H180" fill="none" stroke="#D9824F" stroke-width="2"/>
<path d="M180 75 l12 -7 v14 z" fill="#D9824F" stroke="none"/>
<text x="40" y="135" stroke="none" font-family="sans-serif" font-size="14">ptint = &amp;a ;   *ptint = 12 ;  → a vaut 12</text>
</g></svg>
```

```c
#include <stdio.h>
int main(void)
{
    int a = 1;
    int *ptint;          /* pointeur sur int */
    ptint = &a;          /* ptint pointe sur a */
    *ptint = 12;         /* la variable pointée reçoit 12 */
    printf("a = %d\n", a);
    printf("ptint == &a ? %d\n", ptint == &a);
    float x = 3.5, *px = &x;
    printf("valeur pointee par px : %3.1f\n", *px);
    return 0;
}
```

```sortie
a = 12
ptint == &a ? 1
valeur pointee par px : 3.5
```

Pour afficher une adresse, utilise `%p` : `printf("%p", (void*)&x);` (la valeur change à chaque exécution).

> [!attention] Le cours affiche les adresses avec `0x%lx`. Ça marche souvent, mais le format prévu par la norme est `%p`. Dans l'exemple mémoire, il est aussi écrit « b a pour adresse (20004) » : il faut lire bfbff004.

## Idée 2 · Modifier une variable dans une fonction

C'est **la** solution au problème d'`echange` du chapitre 5 : on passe les **adresses**.

```c
#include <stdio.h>
void echange(int *a, int *b)
{
    int c = *a;
    *a = *b;
    *b = c;
}
int main(void)
{
    int n = 10, p = 20;
    echange(&n, &p);
    printf("apres appel : %d %d\n", n, p);
    return 0;
}
```

```sortie
apres appel : 20 10
```

```etapes Pourquoi ça marche
Appel :: `echange(&n, &p)` : a reçoit l'adresse de n, b celle de p (copies d'adresses).
Lecture :: `c = *a` lit la valeur de n (10).
Écriture :: `*a = *b` écrit 20 **dans n** ; `*b = c` écrit 10 **dans p**.
Retour :: les copies d'adresses disparaissent, mais n et p ont été modifiés.
```

## Idée 3 · Pointeurs et tableaux

Si `P = A;` (ou `P = &A[0]`), alors `P + i` est l'adresse de `A[i]` et `*(P + i)` vaut `A[i]`. Le compilateur avance de **i × sizeof(type)** octets, pas de i octets.

```grille float A[20]; P = A; (float = 4 octets)
#cols: P, P+1, P+2, …, P+9
#rows: désigne, décalage
A[0], A[1], A[2], …, *A[9]
0 octet, 4, 8, …, *36 octets
```

```c
#include <stdio.h>
int main(void)
{
    int T[10] = {-3, 4, 0, -7, 3, 8, 0, -1, 4, -9};
    int POS[10];
    int I, J;
    for (J = 0, I = 0; I < 10; I++)       /* formalisme pointeur */
        if (*(T + I) > 0) {
            *(POS + J) = *(T + I);
            J++;
        }
    int *P = POS;
    for (I = 0; I < J; I++) printf("%d ", *P++);
    printf("\n%d positifs\n", J);
    return 0;
}
```

```sortie
4 3 8 4 
4 positifs
```

> [!prof] Différence essentielle (cours) : un pointeur est une **variable** (`P = A`, `P++` permis) ; le nom d'un tableau est une **constante** (`A = P`, `A++` interdits).

```grille Qui désigne quoi (int A[10]; int *P = A;)
#cols: Expression, Signification
*A ou &A[0], adresse de la 1re case
A + i ou &A[i], adresse de la case i
*(A + i) ou A[i], contenu de la case i
*P, contenu de la case pointée
P + i, adresse i cases plus loin
```

Conséquence : une fonction qui reçoit un tableau reçoit en fait **son adresse**. `void f(int t[], int n)` et `void f(int *t, int n)` sont identiques, et `f` peut modifier le tableau de l'appelant.

## Idée 4 · Allocation dynamique (malloc / free)

Quand la taille n'est connue qu'à l'exécution : `malloc(nb_octets)` (bibliothèque `<stdlib.h>`) réserve la zone et renvoie son adresse (ou `NULL` si échec). `free(p)` la rend.

```c
#include <stdio.h>
#include <stdlib.h>
int main(void)
{
    int n = 5, i, somme = 0;               /* n serait lu par scanf */
    int *tab = (int *) malloc(n * sizeof(int));
    if (tab == NULL) { printf("Memoire insuffisante\n"); return 1; }
    for (i = 0; i < n; i++) tab[i] = (i + 1) * 10;
    for (i = 0; i < n; i++) somme += tab[i];
    printf("somme = %d\n", somme);
    free(tab);                             /* toujours libérer */
    return 0;
}
```

```sortie
somme = 150
```

> [!attention] Le cours ne fait qu'évoquer malloc/free (chapitre 1, chaînes) ; les TP 3 et 4 les demandent. Cette partie est un complément ToumaiLearn. Tableau **statique** : taille fixée à la compilation, libéré automatiquement. Tableau **dynamique** : taille choisie à l'exécution, à libérer avec free.

> [!retenir] `&x` = adresse, `*p` = valeur pointée. Pour qu'une fonction modifie une variable : passe `&var` et écris `*p = …`. `A[i]` ≡ `*(A + i)`. malloc → vérifier NULL → free.

## S'exercer

```exercice TP 4 · Exercice IV
? Affiche les 5 éléments de `int t[5] = {2, 4, 6, 8, 10};` en n'utilisant que `p` et `*`.
= `int *p = t; for (int i = 0; i < 5; i++) printf("%d ", *(p + i));` ou bien `while (p < t + 5) printf("%d ", *p++);`.
```

```exercice Arithmétique de pointeurs
? `double A[10]; double *P = A;` De combien d'octets P + 3 est-il décalé par rapport à P ?
reponse: 24
= 3 × sizeof(double) = 3 × 8 = 24 octets.
```

```exercice Lire du code
? `int a = 5, *p = &a; *p += 3; p = NULL;` Que vaut a à la fin ?
reponse: 8
= `*p += 3` modifie a (8). Mettre p à NULL ne change pas a.
```

## Flashcards

```cartes
Qu'est-ce qu'un pointeur ? :: Une variable qui contient l'adresse d'une autre variable d'un type donné
`&x` ? `*p` ? :: Adresse de x ; valeur à l'adresse contenue dans p
`A[i]` s'écrit en formalisme pointeur ? :: `*(A + i)`
Peut-on faire `A++` sur un tableau A ? :: Non : le nom d'un tableau est une adresse constante
De combien avance `P + 1` pour un int * ? :: sizeof(int) octets (4 sur gcc)
Échanger deux variables par fonction ? :: `void echange(int *a, int *b)` appelée avec `echange(&n, &p)`
Après malloc, que vérifier ? :: Que le pointeur n'est pas NULL ; puis free à la fin
Format printf d'une adresse ? :: `%p`
```

## QCM du chapitre

```qcm
? Après `int a = 1, *p = &a; *p = 12;` que vaut a ?
- 1
+ 12
- L'adresse de a
= Manipuler *p revient à manipuler a.

? `int *p;` déclare :
- Un entier nommé *p
+ Un pointeur sur int
- Un tableau d'entiers
= L'étoile dans la déclaration indique un pointeur.

? Si `P = A;` alors `*(P + 2)` vaut :
- A[0] + 2
+ A[2]
- L'adresse de A[2]
= P + 2 est l'adresse de A[2], l'étoile en donne le contenu.

? Laquelle est interdite avec `int A[10], *P;` ?
- `P = A;`
- `P++;`
+ `A = P;`
= Le nom d'un tableau est une constante.

? Pour que `echange` modifie n et p, on l'appelle par :
- `echange(n, p)`
+ `echange(&n, &p)`
- `echange(*n, *p)`
= On transmet les adresses.

? `float A[20]; float *P = A;` P + 9 est décalé de :
- 9 octets
+ 36 octets
- 20 octets
= 9 × 4 octets.

? Que renvoie malloc en cas d'échec ?
+ NULL
- 0 octet alloué mais un pointeur valide
- -1
= Il faut tester le retour.

? `&tableau[0]` et `tableau` sont :
+ La même adresse
- Deux adresses différentes
- Une adresse et une valeur
= Le nom du tableau est l'adresse de sa première case.

? Dans `void f(int t[], int n)`, t est en réalité :
- Une copie du tableau
+ Un pointeur sur la première case
- Un entier
= Les tableaux sont transmis par leur adresse.

? Après `free(p);` :
- p vaut automatiquement NULL
+ La zone est rendue, p ne doit plus être déréférencé
- Le contenu est conservé pour plus tard
= p devient un pointeur « pendant » : ne plus l'utiliser.
```

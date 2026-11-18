---
id: entrees-sorties
titre: Lire et écrire (printf, scanf, getchar, putchar)
seance: Chapitre 4 · Lecture et écriture des données
importance: 4
---

## Avant de commencer

Tu dois connaître les types (`int`, `long`, `float`, `double`, `char`) et leurs formats `%d`, `%f`, `%c` (chapitre 1).

```exercice Vérifie ton prérequis
? Quel format pour afficher un `long` ?
reponse: %ld
= `%ld` (ou `%li`). Avec `%d` la valeur peut être tronquée.
```

## Comment aborder ce chapitre

> [!astuce] printf et scanf sont symétriques : printf reçoit des **valeurs**, scanf reçoit des **adresses** (`&x`). Un spécificateur `%` par variable, dans l'ordre.

> [!piege] `scanf("%d", x);` sans `&` compile (avec un avertissement) puis plante ou écrit n'importe où. Et pour un `double`, scanf veut `%lf`, pas `%f`.

À la fin, tu sais prévoir exactement ce qu'affiche un printf avec largeur et précision, et lire des données au clavier sans piège.

## Idée 1 · printf : format + expressions

`printf("<format>", expr1, expr2, …);` Le format contient du texte, des séquences `\n`, `\t`, et un spécificateur par expression.

```c
#include <stdio.h>
int main(void)
{
    int A = 234, B = 67;
    printf("%i fois %i est %li\n", A, B, (long)A * B);
    char C = 'A';
    printf("Le caractere %c a le code %i !\n", C, C);
    printf("%o %x %X %e\n", 255, 255, 255, 1234.5);
    return 0;
}
```

```sortie
234 fois 67 est 15678
Le caractere A a le code 65 !
377 ff FF 1.234500e+03
```

> [!attention] Le cours annonce « 234 fois 67 est 615678 ». C'est faux : 234 × 67 = **15 678**, comme le montre l'exécution.

```grille Spécificateurs de printf
#cols: Format, Type attendu, Affiche
*%d / %i, int, entier signé
%u, unsigned, entier ≥ 0
%o / %x, int, octal / hexadécimal
*%ld, long, entier long
*%f, double (float promu), 6 décimales
%e, double, notation scientifique
%Lf, long double, réel long
*%c, char/int, un caractère
*%s, char *, une chaîne
```

## Idée 2 · Largeur et précision

`%Wd` réserve W colonnes (aligné à droite). `%W.Pf` : W colonnes au total, P décimales, arrondi.

```c
#include <stdio.h>
int main(void)
{
    printf("[%4d][%4d][%4d][%4u][%4X][%4x]\n", 123, 1234, 12345, 0, 123, 123);
    printf("[%f][%12f][%.2f][%5.0f][%10.3f][%.4f]\n",
           100.123, 100.123, 100.123, 100.123, 100.123, 1.23456);
    printf("[%-6d]\n", 42);
    return 0;
}
```

```sortie
[ 123][1234][12345][   0][  7B][  7b]
[100.123000][  100.123000][100.12][  100][   100.123][1.2346]
[42    ]
```

Si la valeur est plus large que W, elle est affichée en entier (12345 sur `%4d`). Le `-` aligne à gauche (ajout hors cours).

```etapes Lire %10.3f appliqué à 100.123
Précision :: .3 → 3 décimales : 100.123
Longueur :: « 100.123 » fait 7 caractères
Largeur :: 10 colonnes → 3 espaces devant
Résultat :: «   100.123 »
```

## Idée 3 · scanf : lire à une adresse

`scanf("<format>", &var1, &var2, …);` Il renvoie le **nombre** de valeurs lues correctement.

```grille Formats de lecture
#cols: Variable, Format scanf
int, %d
long, %ld
*float, %f
*double, %lf
char, %c
chaîne (char t[]), %s sans &
```

- Les espaces, tabulations et retours à la ligne se valent comme séparateurs : « 12 4 1980 » ou sur trois lignes, c'est pareil.
- `scanf("%4d %2d", &A, &B);` avec 1234567 → A = 1234, B = 56 ; le 7 reste pour la lecture suivante.
- `scanf("%d/%d/%d", &J, &M, &A);` exige les `/` : « 17/7/1974 » marche, « 17 7 1974 » ne lit que J (renvoie 1).

```c nontest
int JOUR, MOIS, ANNEE, RECU;
RECU = scanf("%i %i %i", &JOUR, &MOIS, &ANNEE);
/* tape « 17 7 1974 »  -> RECU = 3
   tape « 17/7/1974 »  -> RECU = 1 (seul JOUR est lu) */
```

> [!attention] Le tableau des formats de scanf du cours donne `%b` pour l'hexadécimal : c'est `%x`. Et pour 17 7 19.74 le cours indique MOIS = 4 : avec « 17 7 19.74 » on obtient JOUR = 17, MOIS = 7, ANNEE = 19 (le « .74 » reste dans le tampon).

## Idée 4 · getchar et putchar

`getchar()` lit **un** caractère (après Entrée) et renvoie un `int` ; à la fin du fichier, elle renvoie `EOF` (−1). `putchar(c)` écrit un caractère.

```c
#include <stdio.h>
int main(void)
{
    int c;                       /* int, pas char : pour reconnaître EOF */
    while ((c = getchar()) != EOF)
        putchar(c);
    putchar('O'); putchar('K'); putchar('\n');
    return 0;
}
```

```sortie
OK
```

(Ici l'entrée est vide : la boucle s'arrête tout de suite sur EOF.)

> [!prof] Le cours insiste : la variable qui reçoit `getchar()` doit être un `int`. Avec un `char` non signé, `c != EOF` est toujours vrai (boucle infinie) ; avec un `char` signé, le caractère de code 255 est pris pour une fin de fichier.

`getch()` (`<conio.h>`) lit sans attendre Entrée mais n'est pas standard (Windows/DOS uniquement).

> [!retenir] printf : valeurs. scanf : adresses (`&`). `double` → `%lf` en lecture. getchar → `int`.

## S'exercer

```exercice Prévoir un affichage
? Qu'affiche `printf("[%6.2f]", 3.14159);` ?
= `[  3.14]` : 2 décimales → « 3.14 » (4 caractères), complété à 6 colonnes par 2 espaces.
```

```exercice scanf avec largeur
? `scanf("%4d %2d", &A, &B);` et on tape 1234567. Que vaut B ?
reponse: 56
= A prend les 4 premiers chiffres (1234), B les 2 suivants (56), 7 reste dans le tampon.
```

```exercice TD 2 · Exercice III (majuscule → minuscule)
? Lis un caractère ; si c'est une majuscule, affiche-la en minuscule, sinon un message d'erreur.
= `int c = getchar(); if (c >= 'A' && c <= 'Z') printf("%c\n", c + 32); else printf("Erreur\n");`
'a' − 'A' = 97 − 65 = 32. On peut écrire `c - 'A' + 'a'`, plus lisible, ou `tolower(c)` de `<ctype.h>`.
```

## Flashcards

```cartes
Que reçoit scanf après le format ? :: Des adresses : `&x` (sauf pour un tableau de char)
Format scanf pour un double ? :: `%lf`
Que renvoie scanf ? :: Le nombre de valeurs correctement lues
`%5.1f` appliqué à 3.14159 ? :: «   3.1 » (5 colonnes, 1 décimale)
Pourquoi `int c = getchar()` et pas char ? :: Pour distinguer EOF (−1) de tous les caractères
Précision par défaut de %f ? :: 6 décimales
Que vaut EOF en général ? :: −1
```

## QCM du chapitre

```qcm
? Qu'affiche `printf("%4d", 12345);` ?
- 1234
+ 12345
- 2345
= La largeur est un minimum : rien n'est coupé.

? Qu'affiche `printf("%.2f", 100.123);` ?
+ 100.12
- 100.123000
- 100.1
= Deux décimales, arrondi.

? Pour lire un double, on écrit :
- `scanf("%f", &x);`
+ `scanf("%lf", &x);`
- `scanf("%d", x);`
= En lecture, double ↔ %lf.

? Que renvoie `scanf("%d %d", &a, &b)` si on tape « 5 x » ?
- 2
+ 1
- 0
= Seul a est lu correctement.

? `printf("%x", 255)` affiche :
- 377
+ ff
- FF
= %x : hexadécimal en minuscules.

? Pourquoi `&` devant une variable dans scanf ?
- Pour l'afficher
+ scanf a besoin de son adresse pour y écrire
- C'est facultatif
= Le passage se fait par valeur : seule l'adresse permet de modifier la variable.

? Quel type de retour a getchar() ?
- char
+ int
- void
= int, pour pouvoir renvoyer EOF.

? `printf("%c", 66)` affiche :
- 66
+ B
- b
= 66 est le code ASCII de 'B'.

? `printf("[%5.0f]", 100.123)` affiche :
+ [  100]
- [100]
- [100.1]
= 0 décimale → « 100 », complété à 5 colonnes.

? 234 × 67 calculé par `printf("%li", (long)234*67)` affiche :
- 615678
+ 15678
- 1567
= Le cours se trompe (615678) ; le bon produit est 15678.
```

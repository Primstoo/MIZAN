---
id: td-tp-corriges
titre: TD 1, TD 2 et TP 2 à 5 corrigés
seance: TD et TP · 2025-2026
importance: 5
---

## Avant de commencer

Ce chapitre suppose les chapitres 1 à 7. Chaque programme ci-dessous a été compilé et exécuté ; les saisies clavier sont remplacées par des valeurs fixes (indiquées en commentaire) pour que la sortie soit vérifiable.

```exercice Vérifie ton prérequis
? Avec D = 2, que valent A et D après `A = 20; A %= D++;` ?
= A = 20 % 2 = **0** (D++ fournit 2), puis D = 3.
```

## Comment aborder ce chapitre

> [!astuce] Cherche d'abord sur papier, puis compare. Remplace ensuite les valeurs fixes par des `scanf` et teste chez toi.

> [!piege] Le corrigé manuscrit du TD qui circule entre étudiants contient plusieurs erreurs (voir les encadrés « Attention »). Un corrigé qui « a l'air juste » n'est pas un corrigé vérifié.

À la fin, tu sais refaire tous les exercices des TD 1-2 et des TP 2 à 5.

## TD 1 · Exercice III : types et valeurs des constantes

```c
#include <stdio.h>
int main(void)
{
    printf("12332 -> %d (int)\n", 12332);
    printf("23.4 -> %g (double)\n", 23.4);
    printf("345LU -> %lu (unsigned long)\n", 345LU);
    printf("34.5L -> %Lg (long double)\n", 34.5L);
    printf("0xeba -> %d   01231 -> %d   01001 -> %d\n", 0xeba, 01231, 01001);
    printf("'\\n' -> %d  '0' -> %d  'O' -> %d  '\\0' -> %d  '\\r' -> %d\n", '\n', '0', 'O', '\0', '\r');
    printf("-1.0e-1 -> %g   1e1f -> %g (float)   67e0 -> %g (double)\n", -1.0e-1, 1e1f, 67e0);
    printf("40000u -> %u   70000u -> %u   0XEUL -> %lu   0.0l -> %Lg\n", 40000u, 70000u, 0XEUL, 0.0l);
    return 0;
}
```

```sortie
12332 -> 12332 (int)
23.4 -> 23.4 (double)
345LU -> 345 (unsigned long)
34.5L -> 34.5 (long double)
0xeba -> 3770   01231 -> 665   01001 -> 513
'\n' -> 10  '0' -> 48  'O' -> 79  '\0' -> 0  '\r' -> 13
-1.0e-1 -> -0.1   1e1f -> 10 (float)   67e0 -> 67 (double)
40000u -> 40000   70000u -> 70000   0XEUL -> 14   0.0l -> 0
```

Constantes **invalides** : `1.23ul` (le suffixe u n'existe pas pour un réel), `0FE0` (commence par 0 donc octal, mais F n'est pas un chiffre octal), `o` (c'est un nom, pas une constante). `40000` est un `int` sur gcc (4 octets) ; avec un int de 2 octets ce serait un `long`.

> [!attention] Erreurs du corrigé manuscrit : `-1.0e-1` est **valide** (double, −0.1) ; `0XEUL` est **valide** (unsigned long, 14) : UL et LU sont acceptés tous les deux ; `23.4` et `67e0` sont des **double**, pas des float ; `'\n'` vaut 10 et `'O'` 79.

## TD 1 · Exercice IV : les 14 expressions

A = 20, B = 5, C = −10, D = 2, X = 12, Y = 15, remis à zéro avant chaque expression.

```c
#include <stdio.h>
#define RAZ A=20; B=5; C=-10; D=2; X=12; Y=15
int main(void)
{
    int A, B, C, D, X, Y, r;
    RAZ; r = (5*X)+2*((3*B)+4);        printf(" 1) %d\n", r);
    RAZ; r = (5*(X+2)*3)*(B+4);        printf(" 2) %d\n", r);
    RAZ; r = A == (B=5);               printf(" 3) %d  B=%d\n", r, B);
    RAZ; r = A += (X+5);               printf(" 4) %d  A=%d\n", r, A);
    RAZ; r = A != (C *= (-D));         printf(" 5) %d  C=%d\n", r, C);
    RAZ; r = A *= C+(X-D);             printf(" 6) %d  A=%d\n", r, A);
    RAZ; r = A %= D++;                 printf(" 7) %d  A=%d D=%d\n", r, A, D);
    RAZ; r = A %= ++D;                 printf(" 8) %d  A=%d D=%d\n", r, A, D);
    RAZ; r = (X++)*(A+C);              printf(" 9) %d  X=%d\n", r, X);
    RAZ; r = A = X*(B<C)+Y*!(B<C);     printf("10) %d  A=%d\n", r, A);
    RAZ; r = !(X-D+C)||D;              printf("11) %d\n", r);
    RAZ; r = A&&B||!0&&C&&!D;          printf("12) %d\n", r);
    RAZ; r = ((A&&B)||(!0&&C))&&!D;    printf("13) %d\n", r);
    RAZ; r = ((A&&B)||!0)&&(C&&(!D));  printf("14) %d\n", r);
    return 0;
}
```

```sortie
 1) 98
 2) 1890
 3) 0  B=5
 4) 37  A=37
 5) 0  C=20
 6) 0  A=0
 7) 0  A=0 D=3
 8) 2  A=2 D=3
 9) 120  X=13
10) 15  A=15
11) 1
12) 1
13) 0
14) 0
```

> [!attention] Le corrigé manuscrit se trompe sur : (3) il écrit « A == 5 » sans conclure → c'est **0** ; (5) il oublie que C devient 20 → résultat **0** ; (7) il calcule 20 % 3 = 2 → c'est **20 % 2 = 0** (D++ fournit l'ancienne valeur 2) ; (8) il dit « c'est faux » → l'expression est **valide** et vaut 2 ; (9) il trouve 130 → c'est **12 × 10 = 120** (X++ fournit 12) ; (12) il trouve 0 → `&&` passe avant `||`, donc (A&&B) || … = **1**.

**Exercice V** (parenthèses inutiles) : 1) `5*X+2*(3*B+4)` ; 2) `5*(X+2)*3*(B+4)` ; 3) `A == (B=5)` (garder : `=` est moins prioritaire que `==`) ; 4) `A += X+5` ; 5) `A != (C *= -D)` ; 6) `A *= C+X-D` ; 9) `X++*(A+C)` ; 10) `A = X*(B<C)+Y*!(B<C)` (rien à enlever) ; 11) `!(X-D+C)||D` ; 13) `(A&&B||!0&&C)&&!D` ; 14) `(A&&B||!0)&&C&&!D`.

> [!attention] Dans l'exercice II, le corrigé manuscrit écrit des boucles `for` et des `if` : l'exercice ne demande **que des déclarations** (voir chapitre 1). Il donne aussi 32⁶ = 2 147 482 336 : en réalité 32⁶ = 2³⁰ = **1 073 741 824**.

## TD 2 · Exercices IV et VI : somme et méthode de Héron

```c
#include <stdio.h>
int main(void)
{
    int N = 10, i;                       /* N lu au clavier dans le TD */
    float S = 0;
    for (i = 1; i <= N; i++)
        S = S + 1.0 / (i * i);
    printf("S%d = %f\n", N, S);

    double a = 2, u = 1;                 /* a lu au clavier ; u0 = 1 */
    int n = 0;
    while (n < 50) {
        double v = 0.5 * (u + a / u);
        n++;
        if (v == u) break;               /* plus de progrès */
        u = v;
    }
    printf("racine de %.0f = %.10f (en %d iterations)\n", a, u, n);
    return 0;
}
```

```sortie
S10 = 1.549768
racine de 2 = 1.4142135624 (en 6 iterations)
```

> [!attention] Le corrigé manuscrit de l'exercice VI écrit `for (i == 0; …)` (comparaison au lieu d'affectation) et `scanf("%f", U0)` sans `&`. Il faut `i = 0` et `&U0`. Pour un double, lis avec `%lf`. Il faut aussi `u0 > 0` (division par u).

## TP 2 : eau, second degré, max2, stats

```c
#include <stdio.h>
#include <math.h>
void nature_eau(float T)
{
    if (T <= 0) printf("T=%.1f : glace\n", T);
    else if (T < 100) printf("T=%.1f : liquide\n", T);
    else printf("T=%.1f : vapeur\n", T);
}
void second_degre(double a, double b, double c)
{
    double d = b * b - 4 * a * c;
    if (a == 0) {
        if (b != 0) printf("1er degre : x = %.2f\n", -c / b);
        else printf(c == 0 ? "tout x est solution\n" : "pas de solution\n");
    } else if (d > 0)
        printf("x1 = %.2f, x2 = %.2f\n", (-b - sqrt(d)) / (2 * a), (-b + sqrt(d)) / (2 * a));
    else if (d == 0) printf("racine double x = %.2f\n", -b / (2 * a));
    else printf("pas de solution reelle\n");
}
int max2(int a, int b) { return (a > b) ? a : b; }
void stats(int t[], int n, int *min, int *max, double *moy)
{
    int i, s = 0;
    *min = *max = t[0];
    for (i = 0; i < n; i++) {
        if (t[i] < *min) *min = t[i];
        if (t[i] > *max) *max = t[i];
        s += t[i];
    }
    *moy = (double) s / n;
}
int main(void)
{
    nature_eau(-5); nature_eau(37); nature_eau(120);
    second_degre(1, -3, 2); second_degre(1, 2, 1); second_degre(1, 0, 1);
    printf("max2(7, 12) = %d\n", max2(7, 12));
    int t[] = {14, 8, 17, 11, 5}, mi, ma;
    double mo;
    stats(t, 5, &mi, &ma, &mo);
    printf("min=%d max=%d moy=%.2f\n", mi, ma, mo);
    return 0;
}
```

```sortie
T=-5.0 : glace
T=37.0 : liquide
T=120.0 : vapeur
x1 = 1.00, x2 = 2.00
racine double x = -1.00
pas de solution reelle
max2(7, 12) = 12
min=5 max=17 moy=11.00
```

`stats` illustre le chapitre 7 : une fonction ne renvoie qu'une valeur, donc les trois résultats passent par des **pointeurs**.

## TP 3 : tableaux, chaînes, matrices, malloc

```c
#include <stdio.h>
void print_array(int a[], int n)
{
    int i;
    for (i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
}
void reverse_array(int a[], int n)
{
    int i, t;
    for (i = 0; i < n / 2; i++) { t = a[i]; a[i] = a[n - 1 - i]; a[n - 1 - i] = t; }
}
int longueur(const char s[]) { int n = 0; while (s[n] != '\0') n++; return n; }
int main(void)
{
    int a[] = {3, 9, 4, 1, 7};
    print_array(a, 5);
    reverse_array(a, 5);
    print_array(a, 5);

    char phrase[] = "le langage C est rapide";
    printf("longueur = %d\n", longueur(phrase));

    int A[2][3] = {{1, 2, 3}, {4, 5, 6}}, B[3][2] = {{1, 0}, {0, 1}, {2, 2}}, P[2][2];
    int i, j, k;
    for (i = 0; i < 2; i++)
        for (j = 0; j < 2; j++) {
            P[i][j] = 0;
            for (k = 0; k < 3; k++) P[i][j] += A[i][k] * B[k][j];
        }
    for (i = 0; i < 2; i++) printf("%d %d\n", P[i][0], P[i][1]);
    for (j = 0; j < 3; j++) printf("%d %d\n", A[0][j], A[1][j]);   /* transposée de A */
    return 0;
}
```

```sortie
3 9 4 1 7 
7 1 4 9 3 
longueur = 23
7 8
16 17
1 4
2 5
3 6
```

Produit A(m×p) × B(p×n) : `P[i][j] = Σ A[i][k] × B[k][j]`, k de 0 à p−1 ; il faut que le nombre de colonnes de A égale le nombre de lignes de B. L'addition exige des dimensions identiques. Pour l'exercice IV (malloc), voir le dernier programme du chapitre 7.

## TP 4 : pointeurs

```c
#include <stdio.h>
float moyenne(int *tab, int n)
{
    int *p, s = 0;
    for (p = tab; p < tab + n; p++) s += *p;
    return (float) s / n;
}
int main(void)
{
    int a = 5, b = 9;
    int *pa = &a, *pb = &b;
    printf("a=%d &a==p ? %d\n", *pa, pa == &a);
    *pa = *pa + *pb;      /* échange sans variable intermédiaire */
    *pb = *pa - *pb;
    *pa = *pa - *pb;
    printf("apres echange : a=%d b=%d\n", a, b);

    int t[5] = {2, 4, 6, 8, 10}, *p = t, i;
    for (i = 0; i < 5; i++) printf("%d ", *(p + i));
    printf("\nmoyenne = %.2f\n", moyenne(t, 5));
    return 0;
}
```

```sortie
a=5 &a==p ? 1
apres echange : a=9 b=5
2 4 6 8 10 
moyenne = 6.00
```

> [!attention] L'échange par sommes (TP 4, exercice III) peut déborder si a + b dépasse INT_MAX, et échoue si pa et pb pointent sur la **même** variable (on obtient 0). Avec une variable intermédiaire, c'est plus sûr.

## TP 5 : intégration numérique de eˣ sur [0, 1]

Valeur exacte : I = e − 1 ≈ 1,718281828.

```c
#include <stdio.h>
#include <math.h>
double f(double x) { return exp(x); }
double rect_milieu(double a, double b, int n)
{
    double h = (b - a) / n, s = 0; int i;
    for (i = 0; i < n; i++) s += f(a + i * h + h / 2);
    return h * s;
}
double trapezes(double a, double b, int n)
{
    double h = (b - a) / n, s = f(a) + f(b); int i;
    for (i = 1; i < n; i++) s += 2 * f(a + i * h);
    return h / 2 * s;
}
double simpson(double a, double b, int n)      /* n pair */
{
    double h = (b - a) / n, s = f(a) + f(b); int i;
    for (i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
    return h / 3 * s;
}
int main(void)
{
    double I = exp(1) - 1;
    int n;
    printf("n=4 : milieu %.8f  trapezes %.8f  simpson %.8f\n",
           rect_milieu(0, 1, 4), trapezes(0, 1, 4), simpson(0, 1, 4));
    printf("erreurs n=4 : %.2e  %.2e  %.2e\n", fabs(I - rect_milieu(0, 1, 4)),
           fabs(I - trapezes(0, 1, 4)), fabs(I - simpson(0, 1, 4)));
    for (n = 1; fabs(I - rect_milieu(0, 1, n)) > 1e-6; n++);
    printf("milieu : n = %d pour erreur <= 1e-6\n", n);
    for (n = 1; fabs(I - trapezes(0, 1, n)) > 1e-6; n++);
    printf("trapezes : n = %d\n", n);
    for (n = 2; fabs(I - simpson(0, 1, n)) > 1e-6; n += 2);
    printf("simpson : n = %d\n", n);
    return 0;
}
```

```sortie
n=4 : milieu 1.71381528  trapezes 1.72722190  simpson 1.71831884
erreurs n=4 : 4.47e-03  8.94e-03  3.70e-05
milieu : n = 268 pour erreur <= 1e-6
trapezes : n = 379
simpson : n = 10
```

> [!attention] Question 4 du TP 5 (« pour quelle valeur de n l'erreur est-elle nulle ? ») : avec des `double`, l'erreur n'est **jamais exactement nulle** pour eˣ ; elle diminue jusqu'à la précision machine (~10⁻¹⁵ à 10⁻¹⁶) puis stagne à cause des arrondis. La bonne réponse est d'expliquer ce phénomène. Pour Simpson, la somme « 2 Σ » s'arrête à n−2 et n doit être **pair**.

## S'exercer

```exercice TD 1 · expression 9
? `(X++) * (A + C)` avec X = 12, A = 20, C = −10 : valeur rendue ?
reponse: 120
= X++ fournit 12 (puis X = 13) : 12 × 10 = 120.
```

```exercice TD 1 · expression 12
? `A&&B||!0&&C&&!D` (A=20, B=5, C=−10, D=2) ?
reponse: 1
= On groupe les `&&` : (A&&B) || (!0&&C&&!D) = 1 || 0 = 1.
```

```exercice TP 2 · discriminant
? Pour x² − 3x + 2 = 0, que vaut le discriminant ?
reponse: 1
= Δ = 9 − 8 = 1 > 0 : deux racines, 1 et 2.
```

## Flashcards

```cartes
Rendre plusieurs résultats d'une fonction ? :: Passer des pointeurs : `void stats(int t[], int n, int *min, int *max, double *moy)`
Condition du produit matriciel A×B ? :: Colonnes de A = lignes de B
Méthode de Héron ? :: u(n+1) = (u(n) + a/u(n)) / 2 converge vers √a
Simpson : coefficients ? :: 1, 4, 2, 4, …, 2, 4, 1 ; n pair ; facteur h/3
Trapèzes : formule ? :: h/2 × [f0 + fn + 2 Σ f(xi), i = 1..n−1]
Longueur d'une chaîne sans strlen ? :: Compter jusqu'à '\0' : `while (s[n] != '\0') n++;`
Inverser un tableau sur place ? :: Échanger a[i] et a[n−1−i] pour i < n/2
```

## QCM du chapitre

```qcm
? `A %= D++` avec A = 20, D = 2 donne :
+ A = 0, D = 3
- A = 2, D = 3
- A = 0, D = 2
= D++ fournit 2 : 20 % 2 = 0, puis D passe à 3.

? `A != (C *= (-D))` avec A=20, C=−10, D=2 rend :
- 1
+ 0
- 20
= C devient 20, et 20 != 20 est faux.

? `0XEUL` est :
- Invalide
+ Un unsigned long de valeur 14
- Un long de valeur 0
= E en hexadécimal vaut 14, UL est un suffixe valide.

? `1.23ul` est :
- Un unsigned long
+ Invalide
- Un double
= Les suffixes u/U ne s'appliquent pas aux réels.

? Pour que `stats` renvoie min, max et moyenne, on utilise :
- Trois return
+ Des paramètres pointeurs
- Une variable locale static
= Une fonction ne fait qu'un seul return ; les autres résultats passent par adresse.

? Le produit A(2×3) × B(3×2) a pour dimensions :
- 3×3
+ 2×2
- 2×3
= (m×p) × (p×n) donne m×n.

? Avec la méthode de Simpson, n doit être :
- Impair
+ Pair
- Multiple de 3
= Elle regroupe les sous-intervalles deux par deux.

? L'erreur d'intégration numérique en double devient-elle exactement nulle ?
- Oui pour n assez grand
+ Non, elle stagne vers la précision machine
- Oui dès n = 4 pour Simpson
= Les arrondis flottants empêchent une erreur exactement nulle.

? Dans la méthode de Héron, u(n) tend vers :
+ √a
- a/2
- a²
= C'est la méthode de Newton appliquée à x² − a.

? Quelle instruction est erronée dans le corrigé manuscrit du TD 2 ?
- `scanf("%d", &N);`
+ `for (i == 0; i <= N; i++)`
- `S = S + 1/(float)(i*i);`
= `i == 0` compare au lieu d'affecter : i n'est pas initialisé.
```

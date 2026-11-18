---
id: operateurs
titre: Opérateurs et expressions
seance: Chapitre 2 · Opérateurs et expressions
importance: 5
---

## Avant de commencer

Il te faut les types du chapitre 1 (`int`, `double`, `char`) et l'idée qu'en C **vrai = tout sauf 0**, **faux = 0**.

```exercice Vérifie ton prérequis
? En C, l'expression `7 / 2` entre deux int vaut combien ?
reponse: 3
= Division entière : la partie décimale est jetée. Il faut un double (7.0 / 2) pour obtenir 3.5.
```

## Comment aborder ce chapitre

> [!astuce] Évalue **une étape à la fois** et note après chaque étape la valeur rendue **et** les variables modifiées. C'est exactement ce que demande l'exercice IV du TD 1.

> [!piege] `=` affecte, `==` compare. `if (a = 5)` met 5 dans `a` puis teste 5 (vrai) : toujours vrai, sans erreur de compilation.

À la fin, tu sais évaluer à la main n'importe quelle expression du TD 1 (priorité, `++`, affectations composées, logique).

## Idée 1 · Arithmétique : le type décide

`+ - * / %`. Le résultat a le type des opérandes : deux `int` → division **entière** ; un `double` → division réelle. `%` (modulo, reste) n'accepte que des entiers.

```c
#include <stdio.h>
int main(void)
{
    int x = 14, a;
    double y = 14, b;
    a = (x / 4) * 4;     /* 14/4 = 3, puis 3*4 */
    b = (y / 4) * 4;     /* 3.5 * 4 */
    printf("a=%d b=%.1f reste=%d\n", a, b, 14 % 4);
    return 0;
}
```

```sortie
a=12 b=14.0 reste=2
```

## Idée 2 · `++` avant ou après

```etapes x = ++n contre x = n++ (n vaut 10)
Pré-incrément `x = ++n;` :: n passe d'abord à 11, puis x reçoit 11.
Post-incrément `x = n++;` :: x reçoit d'abord 10, puis n passe à 11.
Bilan :: dans les deux cas n finit à 11 ; seule la valeur **utilisée** change.
```

```c
#include <stdio.h>
int main(void)
{
    int x, n = 10;
    x = ++n;
    printf("x=%d n=%d\n", x, n);
    n = 10;
    x = n++;
    printf("x=%d n=%d\n", x, n);
    return 0;
}
```

```sortie
x=11 n=11
x=10 n=11
```

## Idée 3 · Priorité et sens d'évaluation

```flux Du plus prioritaire au moins prioritaire (simplifié)
() [] -> . -> ! ++ -- - unaire * & sizeof -> * / % -> + - -> << >> -> < <= > >= -> == != -> & -> ^ -> | -> && -> || -> ?: -> = += -= *= /=
```

- `a = b - c - d` se lit `(b - c) - d` (gauche → droite).
- `a -= b -= c` se lit `a -= (b -= c)` (affectations : droite → gauche).
- `&&` passe **avant** `||`.

> [!prof] Le Pr Safi conseille : « mettez des parenthèses plutôt que de vous fier au tableau de priorité ». À l'examen, une parenthèse en trop ne coûte rien.

> [!attention] Dans le tableau du cours, l'opérateur `^` est imprimé « ∧ » et `||` est imprimé « k » (défaut de police). Il faut lire `^` (ou exclusif bit à bit) et `||` (ou logique).

## Idée 4 · Comparaison et logique rendent 0 ou 1

```c
#include <stdio.h>
int main(void)
{
    int n = 0, m = 10, x, y;
    x = (n < 20) && m;              /* 1 && 10 -> 1 */
    y = !((n > 20) || (m == 10));   /* !(0 || 1) -> 0 */
    printf("x=%d y=%d\n", x, y);
    printf("%d\n", (3 * 4) < (4 * 5));
    return 0;
}
```

```sortie
x=1 y=0
1
```

`&&` et `||` s'arrêtent dès que le résultat est connu (évaluation paresseuse) : dans `0 && f()`, `f` n'est jamais appelée.

## Idée 5 · Bits, décalages, affectation composée, ternaire, cast

```grille n = 13 en binaire, puis n & 12 et n >> 2
#cols: b3, b2, b1, b0, valeur
*1, *1, 0, 1, 13
1, 1, 0, 0, 12 (masque)
*1, *1, 0, 0, 13 & 12 = 12
~0, ~0, 1, 1, 13 >> 2 = 3
```

```c
#include <stdio.h>
int main(void)
{
    int n = 13, a = 5, b;
    printf("%d %d %d %d\n", n & 12, n | 2, n ^ 1, n >> 2);
    printf("%d\n", 3 << 1);          /* *2 */
    a *= 2 + 10;                     /* a = a * (2 + 10) */
    b = 2 * (a = 10);                /* une affectation a une valeur */
    printf("a=%d b=%d\n", a, b);
    double y = 100, r;
    r = (y < 200) ? 3.14 : 25;
    printf("%.2f\n", r);
    double p = 10, q = 3;
    printf("%.1f %.4f\n", (double)((int)p / (int)q), p / q);
    return 0;
}
```

```sortie
12 15 12 3
6
a=10 b=20
3.14
3.0 3.3333
```

Conversions implicites : `char` et `short` deviennent `int` ; si un opérande est `double`, l'autre devient `double`. Le **cast** `(type)` force une conversion.

> [!retenir] Méthode pour évaluer : 1) remplace les variables par leur valeur ; 2) applique la priorité ; 3) note la valeur rendue ; 4) note les variables modifiées (`=`, `+=`, `++`).

## S'exercer

```exercice TD 1 · Exercice IV (A=20, B=5, C=-10, D=2, X=12, Y=15, valeurs remises à chaque ligne)
? Évalue : (1) `(5*X)+2*((3*B)+4)` (2) `A == (B=5)` (3) `A += (X+5)` (4) `A != (C *= (-D))` (5) `A %= D++` (6) `(X++)*(A+C)` (7) `A&&B||!0&&C&&!D`
= (1) 60 + 2×19 = **98**.
(2) B reçoit 5 (inchangé), 20 == 5 → **0**.
(3) A = 20 + 17 = **37**.
(4) C devient −10 × −2 = 20 ; 20 != 20 → **0** ; C = 20.
(5) D++ donne 2 puis D = 3 ; A = 20 % 2 = **0**.
(6) X++ donne 12 puis X = 13 ; 12 × 10 = **120**.
(7) `&&` d'abord : (A&&B) = 1, donc `1 || ...` = **1**.
Le programme du chapitre « TD et TP corrigés » vérifie les 14 expressions.
```

```exercice Division
? Que vaut `c` après `double a = 10, b = 3, c; c = ((int)a) / ((int)b);` ?
reponse: 3
= Les deux opérandes sont convertis en int : division entière 10/3 = 3, puis 3 est rangé dans c (3.0).
```

```exercice Décalage
? Que vaut `5 << 3` ?
reponse: 40
= Décaler de 3 bits à gauche = multiplier par 2³ = 8 : 5 × 8 = 40.
```

## Flashcards

```cartes
`x = n++` avec n = 10 ? :: x = 10, n = 11 (on utilise puis on incrémente)
`x = ++n` avec n = 10 ? :: x = 11, n = 11
Qui passe en premier : `&&` ou `||` ? :: `&&`
Valeur de `(3 < 5)` ? :: 1 (vrai) ; une comparaison rend 0 ou 1
`a *= b + 10` équivaut à ? :: `a = a * (b + 10)`
Décalage à gauche d'un bit ? :: Multiplie par 2 ; à droite : division entière par 2
Seul opérateur ternaire du C ? :: `condition ? valeur_si_vrai : valeur_si_faux`
`%` s'applique à quels types ? :: Aux entiers seulement
```

## QCM du chapitre

```qcm
? `int x = 14; (x / 4) * 4` vaut :
+ 12
- 14
- 14.0
= 14/4 = 3 en division entière, puis 3×4 = 12.

? Après `int n = 10, x; x = n++;` :
- x=11, n=11
+ x=10, n=11
- x=10, n=10
= Post-incrément : la valeur 10 est utilisée, puis n devient 11.

? Que vaut `!0` ?
- 0
+ 1
- -1
= La négation de faux (0) est vrai, représenté par 1.

? `A && B || !0 && C && !D` avec A=20, B=5, C=-10, D=2 :
- 0
+ 1
- -10
= `&&` avant `||` : (A&&B)=1, donc 1 || ... = 1.

? `a -= b -= c` équivaut à :
- `(a -= b) -= c`
+ `a -= (b -= c)`
- `a = a - b - c`
= Les affectations s'évaluent de droite à gauche.

? Que vaut `13 & 12` ?
- 13
+ 12
- 1
= 1101 & 1100 = 1100 = 12.

? `int A = 20; A == (B = 5)` rend :
- 5
+ 0
- 20
= B reçoit 5, puis 20 == 5 est faux : 0.

? `(y < 200) ? 3.14 : 25` avec y = 100 vaut :
+ 3.14
- 25
- 1
= Condition vraie : on prend la première valeur.

? Type de `i + f` avec i int et f float ?
- int
+ float
- char
= Conversion implicite de i vers float.

? Que fait `if (a = 0)` ?
- Compare a à 0
+ Met 0 dans a et le test est toujours faux
- Erreur de compilation
= `=` affecte ; la valeur de l'affectation (0) est fausse.
```

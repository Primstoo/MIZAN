---
id: fonctions
titre: Fonctions, portée et classes de variables
seance: Chapitre 5 · La programmation modulaire et les fonctions
importance: 5
---

## Avant de commencer

Tu dois savoir écrire un `main` avec des boucles et des tests (chapitres 1 à 3). Une fonction est un « petit main » qu'on appelle par son nom.

```exercice Vérifie ton prérequis
? En maths, f(x) = x² + 3x + 5. Que vaut f(1.5) ?
reponse: 11.75
= 2.25 + 4.5 + 5 = 11.75. C'est exactement la fonction `fct` du cours avec b = 3, c = 5.
```

## Comment aborder ce chapitre

> [!astuce] Une fonction est une boîte noire : des **arguments** entrent (par copie), une **valeur** sort par `return`. Tout ce qui est déclaré dedans meurt à la sortie (sauf `static`).

> [!piege] Croire qu'une fonction peut modifier la variable qu'on lui passe. En C, le passage est **toujours par valeur** : `echange(n, p)` ne change ni n ni p. Il faudra des pointeurs (chapitre 7).

À la fin, tu sais définir, déclarer (prototype) et appeler une fonction, et prévoir la valeur d'une variable globale, locale ou statique.

## Idée 1 · En-tête, corps, return, prototype

```html
<svg viewBox="0 0 620 150" role="img" aria-label="Décomposition de l'en-tête float fct(float x, int b, int c)" style="max-width:620px;width:100%">
<g font-family="monospace" font-size="20" fill="currentColor">
<text x="20" y="50"><tspan fill="#D9824F">float</tspan> fct (<tspan fill="#D9824F">float x, int b, int c</tspan>)</text>
</g>
<g font-family="sans-serif" font-size="14" fill="currentColor" stroke="currentColor">
<line x1="45" y1="60" x2="45" y2="95"/><text x="10" y="115" stroke="none">type du résultat</text>
<line x1="105" y1="60" x2="105" y2="135"/><text x="112" y="140" stroke="none">nom</text>
<line x1="320" y1="60" x2="320" y2="95"/><text x="220" y="115" stroke="none">arguments muets (type + nom)</text>
</g></svg>
```

```c
#include <stdio.h>
float fct(float, int, int);          /* prototype (déclaration) */
int main(void)
{
    float x = 1.5, y, z;
    int n = 3, p = 5, q = 10;
    y = fct(x, n, p);                 /* arguments effectifs */
    printf("valeur de y : %e\n", y);
    z = fct(x + 0.5, q, n - 1);
    printf("valeur de z : %e\n", z);
    return 0;
}
float fct(float x, int b, int c)      /* définition */
{
    return x * x + b * x + c;
}
```

```sortie
valeur de y : 1.175000e+01
valeur de z : 2.600000e+01
```

> [!attention] Dans le cours, le prototype s'appelle `fct` mais les appels utilisent `fexple(...)` : erreur de nom (ça ne compile pas). Il faut le même nom partout. De même, la fonction `absom(double u, double v)` calcule `s = a + b` : il faut `s = u + v`.

- **Arguments muets** (formels) : `x, b, c` dans l'en-tête. **Arguments effectifs** : les valeurs passées à l'appel (`x + 0.5, q, n - 1`), n'importe quelle expression.
- `return` donne le résultat **et** arrête la fonction. Il peut y en avoir plusieurs.
- `void f(int n)` : pas de résultat. `float tirage(void)` : pas d'argument.
- Le **prototype** (en-tête + `;`) placé avant `main` permet au compilateur de vérifier les types et de convertir les arguments. Sans `#include <math.h>`, `sqrt` serait supposée renvoyer un `int` : résultat faux.

## Idée 2 · Passage par valeur

```etapes Ce qui se passe dans echange(n, p)
Avant l'appel :: n = 10, p = 20 dans main.
Appel :: a reçoit une **copie** de n (10), b une copie de p (20).
Dans echange :: a et b sont permutés : a = 20, b = 10.
Retour :: les copies a, b disparaissent. n et p n'ont jamais bougé : 10 et 20.
```

```c
#include <stdio.h>
void echange(int a, int b)
{
    int c;
    printf("debut echange : %d %d\n", a, b);
    c = a; a = b; b = c;
    printf("fin echange : %d %d\n", a, b);
}
int main(void)
{
    int n = 10, p = 20;
    printf("avant appel : %d %d\n", n, p);
    echange(n, p);
    printf("apres appel : %d %d\n", n, p);
    return 0;
}
```

```sortie
avant appel : 10 20
debut echange : 10 20
fin echange : 20 10
apres appel : 10 20
```

> [!prof] Deux remèdes selon le cours : passer l'**adresse** (comme `scanf(&x)`, chapitre 7) ou utiliser une **variable globale** (à réserver aux cas exceptionnels : effets de bord).

## Idée 3 · Globale, locale, statique

```grille Les trois sortes de variables
#cols: Sorte, Déclarée, Portée, Durée de vie, Valeur initiale
*globale, hors de toute fonction, du point de déclaration à la fin du fichier, tout le programme, 0
locale (auto), dans une fonction, la fonction, un appel, indéterminée
*locale static, dans une fonction avec static, la fonction, tout le programme, 0
```

```c
#include <stdio.h>
int i;                         /* globale : initialisée à 0 */
void opt(void) { printf("il fait beau %d fois\n", i); }
void fct(void)
{
    static int k;              /* garde sa valeur entre deux appels */
    k++;
    printf("call number : %d\n", k);
}
int main(void)
{
    for (i = 1; i <= 3; i++) opt();
    int n;
    for (n = 1; n <= 3; n++) fct();
    return 0;
}
```

```sortie
il fait beau 1 fois
il fait beau 2 fois
il fait beau 3 fois
call number : 1
call number : 2
call number : 3
```

Une locale qui porte le même nom qu'une globale la **masque** dans sa fonction. Une variable `static` locale reste invisible hors de sa fonction : ce n'est pas une globale.

## Idée 4 · La récursivité

Une fonction récursive s'appelle elle-même. Il faut un **cas d'arrêt**. Chaque appel empile ses propres variables ; on dépile au premier `return`.

```flux fact(4) dans le cours
fact(4) = fact(3)*4 -> fact(3) = fact(2)*3 -> fact(2) = fact(1)*2 -> fact(1) = 1 (arrêt) -> on remonte : 2, 6, 24
```

```c
#include <stdio.h>
long fact(int n)
{
    if (n > 1)
        return fact(n - 1) * n;
    else
        return 1;
}
int main(void)
{
    int n;
    for (n = 0; n <= 5; n++)
        printf("%d! = %ld\n", n, fact(n));
    return 0;
}
```

```sortie
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
```

> [!retenir] Prototype avant `main`, `return` arrête la fonction, passage par valeur (copie), `static` = mémoire permanente mais portée locale, récursivité = cas d'arrêt obligatoire.

## S'exercer

```exercice TP 2 · Exercice III
? Écris `int max2(int a, int b)` qui renvoie le plus grand des deux.
= `int max2(int a, int b) { return (a > b) ? a : b; }` — testé au chapitre « TD et TP corrigés ».
```

```exercice Variable statique
? `void f(void){ static int s = 5; s += 2; printf("%d ", s); }` appelée 3 fois affiche quoi ?
= `7 9 11` : l'initialisation à 5 n'a lieu qu'une fois ; s garde sa valeur d'un appel à l'autre.
```

```exercice Récursivité
? Combien d'appels de `fact` au total pour `fact(5)` ?
reponse: 5
= fact(5), fact(4), fact(3), fact(2), fact(1) : 5 appels (fact(1) est le cas d'arrêt).
```

## Flashcards

```cartes
Arguments muets ? effectifs ? :: Muets : noms dans l'en-tête. Effectifs : valeurs passées à l'appel.
Qu'est-ce qu'un prototype ? :: L'en-tête suivi de `;` : déclare type de retour et types des arguments
Mode de passage des arguments en C ? :: Par valeur (copie)
Que fait return ? :: Fournit le résultat et quitte la fonction
Fonction sans résultat ? :: Type `void` : `void f(int n)`
Valeur initiale d'une globale ou d'une static ? :: 0
Portée d'une locale static ? :: Sa fonction seulement (mais vit tout le programme)
Condition indispensable d'une récursion ? :: Un cas d'arrêt
```

## QCM du chapitre

```qcm
? Après `echange(n, p)` (passage par valeur) avec n=10, p=20 :
+ n=10, p=20
- n=20, p=10
- Erreur
= La fonction travaille sur des copies.

? Le prototype de `float fct(float x, int b, int c)` peut s'écrire :
+ `float fct(float, int, int);`
- `fct(float, int, int)`
- `float fct;`
= Les noms d'arguments sont facultatifs dans un prototype.

? Une variable locale static non initialisée vaut au premier appel :
- Une valeur aléatoire
+ 0
- 1
= Comme les globales, les static sont initialisées à 0.

? Que fait `return` au milieu d'une fonction ?
- Rien, on continue
+ Renvoie la valeur et quitte la fonction
- Quitte le programme
= return interrompt la fonction.

? `float tirage(void)` est une fonction :
+ Sans argument qui renvoie un float
- Sans résultat
- Qui prend un void en argument
= void entre parenthèses = aucun argument.

? Une globale déclarée **après** main est-elle visible dans main ?
- Oui
+ Non
- Seulement si elle est static
= La portée commence à la déclaration.

? `fact(4)` avec la fonction du cours vaut :
- 10
+ 24
- 4
= 4×3×2×1.

? Pourquoi `#include <math.h>` avant `sqrt` ?
+ Pour que le compilateur connaisse son prototype (double)
- Pour accélérer le programme
- Ce n'est pas utile
= Sans prototype, le compilateur suppose un résultat int.

? Une locale portant le même nom qu'une globale :
- Provoque une erreur
+ Masque la globale dans sa fonction
- Modifie la globale
= Les deux sont indépendantes.

? Dans `fct(n + 1, 2 * x, p)` avec le prototype `float fct(float,int,int)`, 2*x (float) est :
- Refusé
+ Converti en int
- Laissé en float
= Le prototype impose les conversions (ici dégradante).
```

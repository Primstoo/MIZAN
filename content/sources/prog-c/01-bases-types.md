---
id: bases-types
titre: Premier programme, types de base et constantes
seance: Chapitre 1 · L'environnement et les bibliothèques
importance: 4
---

## Avant de commencer

Tu dois savoir ce qu'est un algorithme : des variables, des affectations, une boucle « pour ». Le C n'est qu'une façon stricte de l'écrire.

```exercice Vérifie ton prérequis
? En algorithmique, que vaut S après : S ← 0 ; pour i de 1 à 4 faire S ← S + i ?
reponse: 10
= 0 + 1 + 2 + 3 + 4 = 10. C'est exactement le programme d'exemple du chapitre (somme des entiers de 1 à N).
```

## Comment aborder ce chapitre

> [!astuce] Le C ne devine rien. Chaque variable a un **type** déclaré, chaque instruction finit par `;`, chaque affichage dit son format (`%d`, `%f`…). Pense « contrat » : tu annonces, le compilateur vérifie.

> [!piege] Une variable non initialisée **ne vaut pas 0** : elle contient n'importe quoi. Le prof insiste : `int iSomme = 0;` et pas `int iSomme;`.

À la fin, tu sais lire la structure d'un programme C, choisir le bon type et reconnaître une constante valide.

## Idée 1 · La forme d'un programme C

Un programme C = des `#include` (bibliothèques) + une fonction **`main`** (le programme principal) + éventuellement d'autres fonctions. Un **bloc** est délimité par `{ }`.

```html
<svg viewBox="0 0 600 230" role="img" aria-label="Anatomie d'un programme C : include, main, déclarations, instructions, return" style="max-width:600px;width:100%">
<g font-family="monospace" font-size="15" fill="currentColor">
<rect x="10" y="10" width="330" height="210" rx="8" fill="none" stroke="currentColor"/>
<text x="25" y="40">#include &lt;stdio.h&gt;</text>
<text x="25" y="75">int main(void)</text>
<text x="25" y="100">{</text>
<text x="45" y="125" fill="#D9824F">int iSomme = 0;</text>
<text x="45" y="155">iSomme += 5;</text>
<text x="45" y="180">printf("%d\n", iSomme);</text>
<text x="45" y="205">return 0; }</text>
</g>
<g font-family="sans-serif" font-size="14" fill="currentColor">
<text x="360" y="40">← bibliothèque (printf, scanf)</text>
<text x="360" y="75">← programme principal</text>
<text x="360" y="125" fill="#D9824F">← déclarations (type + nom)</text>
<text x="360" y="167">← instructions, chacune avec ;</text>
<text x="360" y="205">← fin, 0 = tout va bien</text>
</g></svg>
```

Voici l'exemple du cours (somme de 1 à N), avec N fixé à 10 pour pouvoir l'exécuter :

```c
#include <stdio.h>
int main(void)
{
    int iCompteur;      /* compteur de boucle */
    int iSomme = 0;     /* somme initialisée à 0 */
    int N = 10;         /* borne (dans le cours : lue par scanf) */
    for (iCompteur = 1; iCompteur <= N; iCompteur++)
        iSomme += iCompteur;   /* iSomme = iSomme + iCompteur */
    printf("Somme = %d\n", iSomme);
    return 0;
}
```

```sortie
Somme = 55
```

> [!attention] Le cours écrit `void main()` (style des vieux compilateurs Turbo C). La norme demande `int main(void)` avec `return 0;`. Gcc accepte `void main` avec un avertissement : à l'examen, écris `int main`.

## Idée 2 · Les types de base et leur format

```grille Types de base (taille sur gcc actuel)
#cols: Type, Octets, Format printf, Exemple
*int, 4, %d, 42
short, 2, %hd, -300
long, 8, %ld, 1500000L
unsigned, 4, %u, 40000u
*float, 4, %f, 3.5f
*double, 8, %f / %lf, 3.14
*char, 1, %c, 'A'
```

> [!attention] Le cours dit « int codé sur 2 octets en général, parfois 4 ». C'était vrai sous DOS. Aujourd'hui (gcc, Code::Blocks, Linux, Windows) `int` fait **4 octets** et `long` 8 octets sous Linux 64 bits (4 sous Windows). Vérifie toujours avec `sizeof`.

```c
#include <stdio.h>
int main(void)
{
    printf("char=%zu short=%zu int=%zu float=%zu double=%zu\n",
           sizeof(char), sizeof(short), sizeof(int), sizeof(float), sizeof(double));
    char B = 'A';
    printf("Le caractere %c a le code %d\n", B, B);
    return 0;
}
```

```sortie
char=1 short=2 int=4 float=4 double=8
Le caractere A a le code 65
```

Un `char` est un petit entier : `'A'` vaut 65 (code ASCII). Il n'y a **pas de type chaîne** en C : une chaîne est un tableau de `char` terminé par `'\0'`.

## Idée 3 · Les noms et les constantes

Un identificateur commence par une **lettre ou `_`**, puis lettres, chiffres, `_`. Pas d'accent, pas de tiret, pas d'espace. Majuscules ≠ minuscules.

```etapes Lire une constante entière
Regarde le début :: `0x` ou `0X` → hexadécimal ; `0` suivi de chiffres → octal ; sinon décimal.
Regarde la fin :: `L` → long ; `U` → unsigned ; `UL` / `LU` → unsigned long.
Convertis :: 0110 (octal) = 1×64 + 1×8 + 0 = 72 ; 0xFF = 15×16 + 15 = 255.
Constantes réelles :: 23.4 est un `double` par défaut ; 1e1f est un `float` (10) ; 34.5L est un `long double`.
```

> [!attention] Le tableau du cours donne `0110 = 96 (= 8² + 8¹)`. C'est faux : 8² + 8¹ = 64 + 8 = **72**. Le programme ci-dessous le confirme.

```c
#include <stdio.h>
int main(void)
{
    printf("%d %d %d %ld\n", 1924, 0110, 0xFF, -123L);
    printf("%d %d\n", 01231, 0xeba);
    return 0;
}
```

```sortie
1924 72 255 -123
665 3770
```

Caractères spéciaux à connaître : `\n` (saut de ligne), `\t` (tabulation), `\0` (caractère nul, fin de chaîne), `\\`, `\'`, `\"`.

## Idée 4 · Tableaux statiques et chaînes (aperçu)

`int iTableau[10];` réserve 10 entiers consécutifs, indicés de **0 à 9**. `int t[] = {4,5,8,12,-3};` fixe la taille à 5. `char t[] = "abcde";` réserve **6** octets (5 lettres + `'\0'`).

```c
#include <stdio.h>
int main(void)
{
    int iTableau[] = {4, 5, 8, 12, -3};
    char t[] = "abcde";
    printf("%zu elements, 1er=%d, dernier=%d\n",
           sizeof(iTableau) / sizeof(int), iTableau[0], iTableau[4]);
    printf("%s occupe %zu octets\n", t, sizeof(t));
    return 0;
}
```

```sortie
5 elements, 1er=4, dernier=-3
abcde occupe 6 octets
```

Avec un pointeur `char *p;` rien n'est réservé : il faut `p = (char*) malloc(x);` puis `free(p);` (détaillé au chapitre 7).

> [!retenir] Type + nom + `;` pour déclarer. Initialise toujours. Indices de 0 à n−1. Une chaîne finit par `'\0'`.

## S'exercer

```exercice TD 1 · Exercice I (identificateurs)
? Lesquels sont acceptés : `fonction-1`, `_MOYENNE_du_MOIS_`, `3e_jour`, `limite_inf.`, `lim_supérieure`, `__A_`, `_`, `a`, `3` ?
= Acceptés : `_MOYENNE_du_MOIS_`, `__A_`, `_`, `a`.
Refusés : `fonction-1` (tiret), `3e_jour` et `3` (commencent par un chiffre), `limite_inf.` (point), `lim_supérieure` (accent é).
```

```exercice TD 1 · Exercice II (types économiques)
? Donne le type C le plus économique, sans perte de précision, pour : Compteur {0..300}, X {-120..100}, Mesure {-10..104}, surface1 {0.5..150075}, surface2 {-12..1500750.5}, N1 {0..2¹⁰}, N2 {0..4⁷}, N3 {0..32⁶}, trouve {vrai, faux}.
indice: char tient de -128 à 127, short de -32768 à 32767 ; un float garde environ 6-7 chiffres significatifs.
= Compteur : `unsigned short` (300 > 255, donc pas char).
X, Y : `signed char` (−120..100 tient dans −128..127).
Mesure : `signed char` (−10..104).
surface1 : `float` (150075 a 6 chiffres significatifs, 150075.0 : OK en float).
surface2 : `double` (1500750.5 demande 8 chiffres significatifs, trop pour un float).
N1 : 2¹⁰ = 1024 → `unsigned short`.
N2 : 4⁷ = 2¹⁴ = 16384 → `unsigned short` (ou `short`).
N3 : 32⁶ = 2³⁰ = 1 073 741 824 → `unsigned long` (dépasse short ; `int` 4 octets suffit sur gcc, mais la norme ne garantit qu'un `long`).
trouve : `int` (pas de booléen en C ANSI ; 0 = faux, autre = vrai), ou `char`.
```

```exercice Taille d'une chaîne
? Combien d'octets réserve `char nom[] = "FSABM";` ?
reponse: 6
= 5 lettres + le `'\0'` final ajouté par le compilateur.
```

## Flashcards

```cartes
Nom du programme principal en C ? :: `main` ; écrire `int main(void)` et finir par `return 0;`
Format printf d'un int ? d'un double ? d'un char ? d'une chaîne ? :: `%d`, `%f`, `%c`, `%s`
Que vaut une variable locale non initialisée ? :: N'importe quoi (valeur indéterminée) : il faut l'initialiser.
Constante 0x1F ? :: Hexadécimal : 1×16 + 15 = 31
Constante 017 ? :: Octal : 1×8 + 7 = 15
Type par défaut de 3.14 ? :: `double` (3.14f pour float)
Combien d'octets pour "abc" ? :: 4 : trois lettres + '\0'
Règle d'un identificateur ? :: Lettre ou _ au début, puis lettres, chiffres, _. Pas d'accent ni de tiret.
```

## QCM du chapitre

```qcm
? Quel identificateur est valide en C ?
- `3e_jour`
+ `_MOYENNE_du_MOIS_`
- `limite-inf`
= Un nom commence par une lettre ou `_` et ne contient que lettres, chiffres et `_`.

? Que vaut la constante `0110` ?
- 110
- 96
+ 72
= Le 0 initial indique l'octal : 1×64 + 1×8 + 0 = 72. Le cours écrit 96 par erreur.

? Que vaut `0xFF` en décimal ?
- 15
+ 255
- 256
= 15×16 + 15 = 255.

? Quel est le type de la constante `23.4` ?
- float
+ double
- int
= Les constantes réelles sont `double` par défaut ; il faut `23.4f` pour un float.

? Combien d'octets fait un `int` avec gcc sur un PC actuel ?
- 2
+ 4
- 8
= 4 octets (le cours mentionne 2 octets : c'était sous DOS).

? Quel format pour afficher un `char` comme caractère ?
- `%d`
+ `%c`
- `%s`
= `%c` pour un caractère, `%s` pour une chaîne ; `%d` affiche son code ASCII.

? Que contient `int iSomme;` juste après sa déclaration (variable locale) ?
- 0
- 1
+ Une valeur indéterminée
= Pas d'initialisation par défaut pour une variable locale.

? `int t[10];` : quel est l'indice du dernier élément ?
- 10
+ 9
- 11
= Indices de 0 à n−1.

? Que représente `'\0'` ?
- Le chiffre zéro
+ Le caractère nul qui termine une chaîne
- Un saut de ligne
= `'\0'` (code 0) marque la fin d'une chaîne ; le chiffre '0' a le code 48.

? Combien d'éléments a `int t[] = {4,5,8,12,-3};` ?
- 0, la taille manque
+ 5
- 6
= Sans taille, le compilateur compte les valeurs : 5.
```

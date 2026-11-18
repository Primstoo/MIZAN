---
id: revision-examen
titre: Révision et examen blanc corrigé
seance: Révision · examen blanc du Pr Safi (1 h 30)
importance: 4
---

## Avant de commencer

Ce chapitre suppose tout le module. Il reprend l'**examen blanc** distribué avec les TP (1 h 30, quatre exercices) et le corrige.

```exercice Vérifie ton prérequis
? Quel est l'équivalent de `T[i]` en formalisme pointeur ?
= `*(T + i)`.
```

## Comment aborder ce chapitre

> [!astuce] Fais l'examen blanc en 1 h 30, sur papier, **avant** de lire le corrigé. Puis compare ligne par ligne.

> [!piege] Les questions de cours se perdent par imprécision. « Un pointeur, c'est une adresse » ne suffit pas : un pointeur est une **variable** qui **contient** une adresse.

À la fin, tu as une fiche de méthode par type d'exercice et un examen blanc corrigé et testé.

## Idée 1 · La carte du module

```flux Ce qui s'enchaîne
types et constantes -> opérateurs -> tests et boucles -> printf / scanf -> fonctions (passage par valeur) -> tableaux -> pointeurs (passage par adresse, malloc)
```

```grille Ce qui tombe le plus (TD, TP, examen blanc)
#cols: Type d'exercice, Chapitre, Méthode clé
*Évaluer une expression, 2, priorité puis effets de bord (++ , +=)
Type / valeur d'une constante, 1, préfixe 0 / 0x et suffixes L U f
*Boucle + somme / suite, 3, initialiser, for, division réelle
*Fonction sur tableau, 5-6, (int t[], int n) + boucle
*Pointeurs, 7, & pour donner, * pour lire/écrire
Chaînes sans strlen, 6-7, parcourir jusqu'à '\0'
```

## Idée 2 · Questions de cours de l'examen blanc

```etapes Réponses attendues (exercice I)
Pointeur / adresse :: Une adresse est le numéro d'une case mémoire (une valeur). Un pointeur est une **variable typée** qui stocke une adresse ; on peut la modifier (`p++`) et la déréférencer (`*p`).
`==` / `=` :: `=` affecte une valeur et rend cette valeur ; `==` compare et rend 1 ou 0. `if (a = b)` est un piège classique.
`&` dans scanf :: Il donne l'**adresse** de la variable : scanf, recevant ses arguments par valeur, ne peut écrire dans la variable que par son adresse.
Statique / dynamique :: Statique (`int t[10]`) : taille fixée à la compilation, mémoire libérée automatiquement. Dynamique (`malloc`) : taille choisie à l'exécution, à libérer avec `free`.
```

## Idée 3 · Exercices II et IV : somme par pointeur, occurrences

```c
#include <stdio.h>
int somme(int *t, int n)
{
    int s = 0, *p;
    for (p = t; p < t + n; p++) s += *p;
    return s;
}
int occurrences(int tab[], int n, int valeur)
{
    int i, c = 0;
    for (i = 0; i < n; i++)
        if (tab[i] == valeur) c++;
    return c;
}
int main(void)
{
    int t[] = {12, 7, 15, 7, 9, 7};      /* n et les valeurs : scanf à l'examen */
    int n = 6, s = somme(t, n);
    printf("somme = %d, moyenne = %.2f\n", s, (float) s / n);
    printf("7 apparait %d fois\n", occurrences(t, n, 7));
    return 0;
}
```

```sortie
somme = 57, moyenne = 9.50
7 apparait 3 fois
```

> [!piege] `s / n` entre deux int donne une moyenne tronquée (9 au lieu de 9.50) : cast `(float) s / n`.

## Idée 4 · Exercice III : voyelles et consonnes sans strlen

Lecture d'une ligne sans `gets` : `scanf("%99[^\n]", ch);` (lit jusqu'au retour à la ligne, 99 caractères au plus). Ensuite on parcourt jusqu'à `'\0'`.

```c
#include <stdio.h>
int main(void)
{
    char ch[100] = "Programmation en C a la FSABM";   /* scanf("%99[^\n]", ch); */
    char voy[] = "aeiouyAEIOUY";
    int i, j, nv = 0, nc = 0, estVoy;
    for (i = 0; ch[i] != '\0'; i++) {
        char c = ch[i];
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            estVoy = 0;
            for (j = 0; voy[j] != '\0'; j++)
                if (c == voy[j]) estVoy = 1;
            if (estVoy) nv++; else nc++;
        }
    }
    printf("voyelles = %d, consonnes = %d\n", nv, nc);
    return 0;
}
```

```sortie
voyelles = 9, consonnes = 15
```

> [!attention] L'énoncé liste les voyelles a, e, i, o, u (sans y). Ici le y est compté comme voyelle (choix ToumaiLearn) ; retire `y` et `Y` de `voy` pour coller à l'énoncé : sur cette phrase, cela ne change rien (pas de y).

## Examen blanc à refaire (style Pr Safi)

```exercice Ex. A · Évaluation (A=4, B=7, X=3)
? Donne la valeur rendue et les variables modifiées : (1) `A += X++` (2) `B % A == 3 && !X` (3) `A = B > A ? B - A : A - B`
= (1) X++ fournit 3 : A = 7, X = 4, valeur rendue 7.
(2) 7 % 4 = 3 → 1 ; !3 = 0 → 1 && 0 = **0**.
(3) 7 > 4 vrai → A = 3, valeur 3.
```

```exercice Ex. B · Fonction et pointeurs
? Écris `void minmax(int t[], int n, int *mi, int *ma)` puis l'appel depuis main.
= `*mi = *ma = t[0]; for (i = 1; i < n; i++) { if (t[i] < *mi) *mi = t[i]; if (t[i] > *ma) *ma = t[i]; }` ; appel : `minmax(t, n, &mi, &ma);`.
```

```exercice Ex. C · Trace
? `int t[4] = {1, 2, 3, 4}, *p = t + 1; *p++ = 9; *p += 5;` Que vaut t[2] ?
reponse: 8
= `*p++ = 9` écrit 9 dans t[1] puis p avance sur t[2] ; `*p += 5` : t[2] = 3 + 5 = 8.
```

```exercice Ex. D · Affichage
? Qu'affiche `printf("%5.2f|%-3d|%c", 3.14159, 7, 'A' + 2);` ?
= ` 3.14|7  |C` : 3.14 sur 5 colonnes, 7 aligné à gauche sur 3, 'A'+2 = 'C'.
```

## Flashcards

```cartes
Pointeur vs adresse ? :: L'adresse est une valeur ; le pointeur est une variable typée qui la contient
Lire une ligne sans gets ? :: `scanf("%99[^\n]", ch);` ou `fgets(ch, 100, stdin);`
Parcourir une chaîne sans strlen ? :: `for (i = 0; ch[i] != '\0'; i++)`
Moyenne exacte de deux int s et n ? :: `(float) s / n`
Tester une lettre ? :: `(c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')`
Compter les occurrences ? :: Un compteur à 0, +1 à chaque `tab[i] == valeur`
Statique vs dynamique ? :: Taille à la compilation, libération auto / taille à l'exécution, malloc + free
```

## QCM du chapitre

```qcm
? Quelle affirmation est exacte ?
- Un pointeur et une adresse sont la même chose
+ Un pointeur est une variable qui contient une adresse
- Une adresse est une variable modifiable
= Seul le pointeur est une variable.

? Pour lire une phrase avec des espaces sans gets :
- `scanf("%s", ch);`
+ `scanf("%99[^\n]", ch);`
- `scanf("%c", ch);`
= `%s` s'arrête au premier espace.

? Après `int t[]={1,2,3}, *p = t; p++;` que vaut `*p` ?
- 1
+ 2
- 3
= p avance d'une case.

? `int s = 19, n = 2; float m = s / n;` m vaut :
+ 9.0
- 9.5
- 10.0
= Division entière avant la conversion en float.

? La boucle `for (i = 0; ch[i] != '\0'; i++)` s'arrête :
- Au premier espace
+ À la fin de la chaîne
- Après 100 tours
= '\0' marque la fin.

? `occurrences({7,1,7,7}, 4, 7)` renvoie :
- 1
+ 3
- 4
= Trois cases valent 7.

? Différence entre `=` et `==` ?
+ `=` affecte, `==` compare
- Aucune
- `==` affecte deux fois
= Question de cours de l'examen blanc.

? Un tableau créé par malloc doit être :
- Initialisé à 0 automatiquement
+ Libéré par free
- Déclaré avec une taille constante
= La mémoire dynamique n'est pas rendue automatiquement.

? `'A' + 2` affiché avec %c donne :
- A2
+ C
- 67
= 65 + 2 = 67 = 'C'.

? Quel en-tête permet à une fonction de calculer la somme d'un tableau via un pointeur ?
+ `int somme(int *t, int n)`
- `int somme(int t)`
- `int *somme(int n)`
= On transmet l'adresse du tableau et sa taille.
```

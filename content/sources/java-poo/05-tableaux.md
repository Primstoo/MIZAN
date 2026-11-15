---
id: tableaux
titre: Les tableaux en Java
seance: Séance 3
importance: 4
---

## Avant de commencer

Tu dois savoir écrire une boucle `for` en Java et connaître les tableaux du C (chapitre 4).

```exercice Vérifie ton prérequis
? Un tableau a 5 cases. Quel est l'indice de la première case, et celui de la dernière ?
= La première est à l'indice **0**, la dernière à l'indice **4** (taille − 1). Comme en C, les indices commencent à 0.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « télécommande et télévision ».** La variable tableau n'est pas le tableau : c'est une télécommande (une **référence**) qui pointe vers lui. Déclarer, c'est fabriquer la télécommande. `new`, c'est acheter la télévision.

> [!piege] En C, on écrit `int tab[10];`. En Java, **c'est une erreur** : on ne précise jamais la taille à la déclaration. La taille se donne plus tard, avec `new`.

À la fin, tu sais créer un tableau en trois temps, le parcourir avec `length`, et prévoir ce qui se passe quand on écrit `B = A`.

## Idée 1 · Un tableau est un objet

En Java, les tableaux sont **considérés comme des objets**. Un tableau est une **collection ordonnée de variables du même type**. Ses éléments peuvent être :

- de type **primitif** (`int`, `double`, `boolean`…) ;
- des **objets**.

Créer un tableau se fait en **trois temps** :

```flux Les trois temps d'un tableau
Déclaration (préciser son type) -> Dimensionnement (préciser sa taille) -> Initialisation (remplir chaque case)
```

## Idée 2 · Déclarer : le type seulement, jamais la taille

```java nontest
int[] tab;       // correct : tab vaut null
int tab2[];      // correct aussi : tab2 vaut null
int tab3[10];    // ERREUR : on ne précise pas la dimension à la déclaration
```

```html
<svg viewBox="0 0 360 80" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Après la déclaration, la variable tab ne pointe vers rien : elle vaut null">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="30" y="24" width="80" height="32" rx="6" fill="none" stroke="#D9824F" stroke-width="3"/><text x="70" y="45" fill="#D9824F" font-weight="700">tab</text>
<text x="250" y="45">null (aucun tableau)</text>
</g>
<path d="M112 40h60" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/><path d="M166 34l10 12M176 34l-10 12" stroke="currentColor" stroke-width="2"/>
</svg>
```

Après la déclaration, la variable vaut **`null`** : la télécommande existe, mais elle ne pointe vers aucune télévision.

## Idée 3 · Dimensionner avec new, parcourir avec length

Le tableau est créé et dimensionné à l'aide de **`new`** :

```java nontest
tab = new int[5];     // 5 est la taille du tableau
```

`new` fait deux choses :

1. il **alloue la mémoire**, en respectant le type du tableau et sa dimension ;
2. il **initialise les cases à 0** dans le cas d'un type simple.

La longueur d'un tableau s'obtient avec **`tab.length`**.

```java
public class Tab1 {
    public static void main(String[] args) {
        int T[] = new int[5];
        for (int i = 0; i < T.length; i++)
            System.out.println(T[i]);
    }
}
```

```sortie
0
0
0
0
0
```

```grille Le tableau T juste après new int[5]
#cols: T[0] | T[1] | T[2] | T[3] | T[4]
*0 | *0 | *0 | *0 | *0
```

> [!piege] `length` s'écrit **sans parenthèses** pour un tableau : `T.length`, pas `T.length()`.

## Idée 4 · Initialiser et accéder

- Comme en C, les indices commencent par **0**.
- On accède à un élément par `T[i]`, où l'indice varie entre **0 et taille − 1**.
- On peut tout faire en une ligne : `int[] T = {10, 14, 7};`

Les deux écritures suivantes sont **équivalentes** :

| En une ligne | En trois temps |
|---|---|
| `int[] T = {10, 14, 7};` | `int[] T;` puis `T = new int[3];` puis `T[0] = 10; T[1] = 14; T[2] = 7;` |

```java
int[] notes = {10, 14, 7};
System.out.println(notes.length);
System.out.println(notes[0] + notes[2]);

int somme = 0;
for (int i = 0; i < notes.length; i++) somme += notes[i];
System.out.println("Somme = " + somme);
```

```sortie
3
17
Somme = 31
```

```grille Le tableau notes
#cols: notes[0] | notes[1] | notes[2]
*10 | 14 | *7
```

Deux erreurs à l'exécution, toutes deux testées :

| Code | Ce qui se passe |
|---|---|
| `notes[3]` sur un tableau de taille 3 | `ArrayIndexOutOfBoundsException : Index 3 out of bounds for length 3` |
| `int[] vide = null; vide.length` | `NullPointerException` : on utilise une référence qui ne pointe vers rien |

> [!attention] Les noms de ces deux exceptions sont un ajout de ToumaiLearn (les notes ne les citent pas). Tu les verras forcément en TP : autant les reconnaître.

## Idée 5 · B = A ne copie pas le tableau

```java
int[] A = {1, 2, 3};
int[] B = A;          // B et A désignent LE MÊME tableau
B[0] = 99;
System.out.println(A[0]);

int[] C = {1, 2, 3};
int[] D = {1, 2, 3};
System.out.println(C == D);
System.out.println(A == B);
```

```sortie
99
false
true
```

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="A et B pointent vers le même tableau ; C et D pointent vers deux tableaux distincts de même contenu">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="14" y="10" width="36" height="24" rx="5" fill="none" stroke="#D9824F" stroke-width="3"/><text x="32" y="27" fill="#D9824F" font-weight="700">A</text>
<rect x="14" y="44" width="36" height="24" rx="5" fill="none" stroke="#D9824F" stroke-width="3"/><text x="32" y="61" fill="#D9824F" font-weight="700">B</text>
<rect x="110" y="26" width="34" height="26" fill="none" stroke="currentColor" stroke-width="2"/><text x="127" y="44">99</text><rect x="144" y="26" width="34" height="26" fill="none" stroke="currentColor" stroke-width="2"/><text x="161" y="44">2</text><rect x="178" y="26" width="34" height="26" fill="none" stroke="currentColor" stroke-width="2"/><text x="195" y="44">3</text>
<text x="290" y="44" font-size="10">un seul tableau</text>
<rect x="14" y="84" width="36" height="24" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="32" y="101">C</text>
<rect x="76" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="88" y="101">1</text><rect x="100" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="112" y="101">2</text><rect x="124" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="136" y="101">3</text>
<rect x="190" y="84" width="36" height="24" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="208" y="101">D</text>
<rect x="252" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="264" y="101">1</text><rect x="276" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="288" y="101">2</text><rect x="300" y="84" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/><text x="312" y="101">3</text>
</g>
<path d="M52 22L106 36M52 56L106 44M52 96h20M228 96h20" stroke="currentColor" stroke-width="2"/>
</svg>
```

```etapes Lire le programme ligne par ligne
int[] B = A; :: On copie la **référence**, pas les cases. A et B sont deux télécommandes pour la même télévision.
B[0] = 99; :: On modifie le tableau via B. Comme c'est le même tableau, A le voit aussi : `A[0]` vaut 99.
C == D :: C et D ont le même contenu, mais ce sont **deux tableaux distincts**. `==` compare les références : `false`.
A == B :: Même référence : `true`.
```

> [!retenir] En Java, pour les tableaux et les objets, `=` copie la **référence** et `==` compare les **références**, pas le contenu.

## S'exercer

```exercice Tableaux
? Laquelle de ces déclarations est refusée par le compilateur : `int[] t;`, `int t[];`, `int t[10];` ?
= `int t[10];`. On ne précise pas la dimension du tableau à la déclaration.

? Après `double[] t = new double[4];`, que contient chaque case, et que vaut `t.length` ?
= Chaque case contient 0 (ici `0.0`), car `new` initialise les cases à 0 pour un type simple. `t.length` vaut 4.

? Quel est l'indice de la dernière case d'un tableau de 8 éléments ?
reponse: 7
= Les indices vont de 0 à taille − 1, donc de 0 à 7.

? Soit `int[] a = {5, 6}; int[] b = a; b[1] = 0;`. Que vaut `a[1]` ?
reponse: 0
= `b = a` copie la référence : a et b désignent le même tableau. Modifier `b[1]` modifie donc `a[1]`.

? Écris une boucle qui affiche tous les éléments d'un tableau `T`.
= `for (int i = 0; i < T.length; i++) System.out.println(T[i]);`
```

## Flashcards

```cartes
Qu'est-ce qu'un tableau en Java ? :: Un objet : une collection ordonnée de variables du même type (primitifs ou objets).
Les 3 temps de création d'un tableau :: Déclaration (type), dimensionnement (taille, avec new), initialisation (chaque case).
Déclarer un tableau d'entiers :: int[] tab; ou int tab[]; (la variable vaut null).
Pourquoi int tab[10]; est faux en Java ? :: On ne précise pas la dimension à la déclaration.
Que fait new int[5] ? :: Il alloue la mémoire selon le type et la dimension, et initialise les cases à 0.
Obtenir la longueur d'un tableau :: tab.length (sans parenthèses).
Premier et dernier indice d'un tableau :: 0 et taille − 1.
Initialiser un tableau en une ligne :: int[] T = {10, 14, 7};
Que fait B = A pour deux tableaux ? :: B et A désignent le même tableau : on a copié la référence.
Que compare == entre deux tableaux ? :: Les références, pas le contenu.
```

## QCM du chapitre

```qcm
? En Java, un tableau est considéré comme :
- un type primitif
+ un objet
- une fonction
= C'est une collection ordonnée de variables du même type.

? Laquelle de ces déclarations est incorrecte en Java ?
- int[] tab;
- int tab[];
+ int tab[10];
= On ne précise pas la dimension à la déclaration.

? Que vaut une variable tableau juste après `int[] tab;` (sans `new`) ?
- Un tableau vide de taille 0
+ null
- Un tableau de 10 zéros
= La référence existe, mais elle ne désigne aucun tableau.

? Quel mot-clé crée et dimensionne le tableau ?
+ new
- malloc
- create
= `tab = new int[5];`

? Que contient `new int[3]` juste après sa création ?
- Des valeurs aléatoires
+ Trois zéros
- Trois null
= `new` initialise les cases à 0 pour un type simple.

? Comment obtient-on la taille d'un tableau `T` ?
- T.size()
- T.length()
+ T.length
= Sans parenthèses pour un tableau.

? Dans un tableau de taille 5, quel est le dernier indice valide ?
+ 4
- 5
- 6
= Les indices vont de 0 à taille − 1.

? Soit `int[] A = {1, 2, 3}; int[] B = A; B[0] = 99;`. Que vaut `A[0]` ?
- 1
+ 99
- 0
= A et B désignent le même tableau.

? Soit `int[] C = {1, 2, 3}; int[] D = {1, 2, 3};`. Que vaut `C == D` ?
- true
+ false
- Erreur de compilation
= Deux tableaux distincts : `==` compare les références.

? Les éléments d'un tableau peuvent être :
- seulement des entiers
- seulement des types primitifs
+ des types primitifs ou des objets
= Tous du même type, mais ce type peut être une classe.

? `int[] T = {10, 14, 7};` : que vaut `T[1]` ?
- 10
+ 14
- 7
= L'indice 1 désigne la deuxième case.
```

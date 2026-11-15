---
id: bases-java
titre: Les bases de Java · variables, conditions, boucles, opérateurs
seance: Séance 3 · TD 2
importance: 5
---

## Avant de commencer

Tu dois connaître la syntaxe du C : `int`, `if`, `for`, `while`, `switch`. Java la reprend presque à l'identique.

```exercice Vérifie ton prérequis
? En C, que vaut `7 / 2` quand les deux nombres sont des entiers ?
reponse: 3
= **3**, et pas 3,5 : la division de deux entiers est une division entière. C'est pareil en Java, et c'est la source d'un bug dans le corrigé du TD 2 (chapitre 9).
```

## Comment aborder ce chapitre

> [!astuce] **Pense « du C dans une classe ».** Les conditions et les boucles s'écrivent comme en C. La seule vraie nouveauté : en Java, **tout est fait en classe**. Même le plus petit programme vit dans une classe.

> [!piege] Le signe `+` fait deux métiers. Entre deux nombres, il **additionne**. Dès qu'une chaîne de caractères est en jeu, il **concatène**. `"Somme : " + 2 + 3` affiche `Somme : 23`, pas `Somme : 5`.

À la fin, tu sais écrire un programme Java complet avec saisie au clavier, conditions, boucles et calculs, sans tomber dans les trois pièges du chapitre.

## Idée 1 · Tout programme Java vit dans une classe

Java est un **langage orienté objet** : tout est fait en classe. Un fichier source porte l'extension **`.java`**.

```java
public class PremierProgramme {
    public static void main(String[] args) {
        System.out.print("Bonjour");
    }
}
```

```sortie
Bonjour
```

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="La classe contient la méthode main, qui contient les instructions">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<rect x="10" y="8" width="340" height="104" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="20" y="26" font-weight="700">public class PremierProgramme — le nom du programme</text>
<rect x="28" y="36" width="304" height="66" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="38" y="54" fill="#D9824F" font-weight="700">public static void main(String[] args) — le point d'entrée</text>
<rect x="46" y="64" width="268" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="82">System.out.print("Bonjour"); — l'instruction</text>
</g>
</svg>
```

| Ligne | Rôle (TD 2) |
|---|---|
| `public class PremierProgramme` | Le nom du programme |
| `public static void main(String args[])` | Le prototype de la méthode principale |
| `System.out.print("Bonjour");` | L'instruction d'affichage |

L'affichage dans trois langages :

| Java | C | Python |
|---|---|---|
| `System.out.println()` | `printf()` | `print()` |

`println` va à la ligne après l'affichage ; `print` reste sur la même ligne.

> [!retenir] Le nom du fichier doit être celui de la classe publique : la classe `PremierProgramme` va dans `PremierProgramme.java`.

## Idée 2 · Variables et constantes

Une variable peut recevoir une valeur **à la déclaration**, ou plus tard :

```java
int n = 1;             // déclaration + initialisation
boolean b = true;

int m;                 // déclaration seule
m = 1;                 // affectation ensuite
```

Une **constante** est une variable dont la valeur ne peut être affectée **qu'une seule fois**. On la déclare avec le mot **`final`**.

```java nontest
final int n = 5;
final int t;
t = 8;        // autorisé : première et unique affectation
n = 10;       // ERREUR de compilation : n est déclaré final
```

> [!attention] Dans les notes, on lit `boolean b = True;`. En Java, les booléens s'écrivent **en minuscules** : `true` et `false`. `True` (comme en Python) ne compile pas.

## Idée 3 · Conditions, boucles et switch

**La condition** : `if (condition) {...} else {...}`

```java
int h = 14;
if (h <= 18) System.out.println("Bonjour !");
else System.out.println("Bonsoir !");
```

```sortie
Bonjour !
```

**Les trois boucles** :

| Boucle | Syntaxe | Le test se fait… |
|---|---|---|
| `for` | `for (initialisation; condition; modification) {...}` | avant chaque tour |
| `while` | `while (condition) {...}` | avant chaque tour |
| `do while` | `do {...} while (condition);` | **après** chaque tour |

```java
for (int i = 0; i < 3; i++) System.out.print(i + " ");
System.out.println();

int k = 3;
while (k > 0) { System.out.print(k + " "); k--; }
System.out.println();

int j = 10;
do { System.out.println("j vaut " + j); j++; } while (j < 5);
```

```sortie
0 1 2
3 2 1
j vaut 10
```

Regarde la dernière ligne : `j` vaut 10, la condition `j < 5` est fausse dès le départ, et pourtant le corps s'exécute **une fois**.

> [!retenir] `do while` exécute son corps **au moins une fois**. `while` peut ne jamais l'exécuter.

**Le switch** : le mot **`break`** permet de **sortir du bloc switch**.

```java
int jour = 2;
switch (jour) {
    case 1: System.out.println("Lundi"); break;
    case 2: System.out.println("Mardi"); break;
    default: System.out.println("Autre jour");
}
```

```sortie
Mardi
```

Et sans les `break` :

```java
switch (jour) {
    case 1: System.out.println("Lundi");
    case 2: System.out.println("Mardi");
    case 3: System.out.println("Mercredi");
    default: System.out.println("Autre jour");
}
```

```sortie
Mardi
Mercredi
Autre jour
```

> [!piege] Sans `break`, l'exécution **continue dans les cas suivants**. Ici, on entre au `case 2` et on traverse tout jusqu'à la fin.

## Idée 4 · Les opérateurs, et le double jeu du +

| Famille | Opérateurs |
|---|---|
| Arithmétiques | `+` `-` `/` `*` `%` |
| Incrémentation, décrémentation | `++` `--` |
| Affectation élargie | `+=` `-=` `/=` `*=` |
| Comparaison | `==` `!=` `>` `<` `<=` `>=` |
| Logiques | **ET** : `&&` · **OU** : `\|\|` |

```java
System.out.println(7 / 2);      // division entière
System.out.println(7 % 2);      // reste
System.out.println(7 / 2.0);    // division réelle

int x = 5;
x += 3;      // x = 8
x *= 2;      // x = 16
x++;         // x = 17
System.out.println(x);

int h = 14;
System.out.println((h > 10) && (h < 12));
System.out.println((h > 10) || (h < 12));
```

```sortie
3
1
3.5
17
false
true
```

**Le rôle de `+` en Java est aussi la concaténation**, dès qu'on le combine avec une chaîne de caractères :

```java
int m = 2, p = 3;
System.out.println("La somme est: " + m + p);
System.out.println("La somme est: " + (m + p));
System.out.println(m + p + " est la somme");
```

```sortie
La somme est: 23
La somme est: 5
5 est la somme
```

```etapes Pourquoi « 23 » ? Java lit de gauche à droite
Première opération :: `"La somme est: " + m` : une chaîne et un entier. C'est une concaténation. Résultat : `"La somme est: 2"`.
Deuxième opération :: `"La somme est: 2" + p` : encore une chaîne et un entier. Concaténation. Résultat : `"La somme est: 23"`.
Avec les parenthèses :: `(m + p)` est calculé d'abord : deux entiers, donc une addition, 5. Puis on concatène.
Troisième ligne :: `m + p` vient en premier : deux entiers, addition, 5. Puis `5 + " est la somme"` : concaténation.
```

> [!retenir] Pour afficher un calcul dans une phrase, **mets le calcul entre parenthèses**.

**Affectation et comparaison.**

- `A = B;` : A prend la valeur de B. Ce sont deux variables différentes et **indépendantes** : toute modification de A **n'affecte pas** B.
- `A == B` : retourne `true` si A et B sont identiques.

> [!attention] Les notes écrivent « toute modification sur A affecte pas B » : c'est vrai pour les **types primitifs** (`int`, `double`, `boolean`). Pour les **tableaux** et les **objets**, c'est différent : `A = B` copie seulement la référence (chapitres 5 et 6).

**Comparer des chaînes.** Précision de ToumaiLearn, testée :

```java
String s1 = new String("FSABM"), s2 = new String("FSABM");
System.out.println(s1 == s2);            // compare les références
System.out.println(s1.equals(s2));       // compare le contenu
System.out.println("abc".compareTo("abd"));   // ordre lexical
```

```sortie
false
true
-1
```

Pour les chaînes, on compare le **contenu** avec `equals`, et l'**ordre lexical** (l'ordre du dictionnaire) avec `compareTo`. Le `==` compare les **références**, pas le texte.

## Idée 5 · Lire au clavier avec Scanner

Tous les corrigés du TD 2 lisent des valeurs au clavier de la même façon :

```java nontest
import java.util.Scanner;

public class Factorielle {
    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.println("Entrer un entier : ");
        int n = clavier.nextInt();

        int factoriel = 1;
        for (int i = 1; i <= n; i++)
            factoriel *= i;

        System.out.println("Factorielle de n =" + factoriel);
    }
}
```

Avec la saisie `5`, le programme affiche :

```sortie
Factorielle de n =120
```

| Étape | Code |
|---|---|
| 1. Importer la classe | `import java.util.Scanner;` (tout en haut du fichier) |
| 2. Créer le lecteur | `Scanner clavier = new Scanner(System.in);` |
| 3. Lire un entier | `clavier.nextInt()` |
| 3 bis. Lire un réel | `clavier.nextDouble()` |

> [!piege] Avec un `int`, la factorielle **déborde** à partir de 13 : le programme affiche `1932053504` pour 13!, alors que la vraie valeur est `6227020800`. Aucun message d'erreur. Avec un `long`, le résultat est juste (vérifié par exécution).

## S'exercer

```exercice Prédire la sortie
? Qu'affiche `System.out.println("Total : " + 4 + 6);` ?
= Lecture de gauche à droite : chaîne + 4 donne `"Total : 4"`, puis + 6 donne `"Total : 46"`. Pour obtenir 10, il faut écrire `"Total : " + (4 + 6)`.

? Que vaut `17 % 5` ?
reponse: 2
= 17 = 3 × 5 + 2. Le reste est 2.

? Que vaut `9 / 2` en Java (deux entiers) ?
reponse: 4
= Division entière : 4. Pour obtenir 4.5, il faut au moins un réel : `9 / 2.0`.

? Combien de fois le corps de cette boucle s'exécute-t-il ? `int i = 20; do { i++; } while (i < 10);`
reponse: 1
= Une fois. Le `do while` exécute le corps avant de tester la condition.

? Écris la déclaration d'une constante `TAXE` de type double valant 0.1, comme dans le TD 2.
= `final double TAXE = 0.1;`

? Dans un `switch`, à quoi sert `break` ?
= À sortir du bloc switch. Sans lui, l'exécution continue dans les cas suivants.
```

## Flashcards

```cartes
Extension d'un fichier source Java :: .java
Prototype de la méthode principale :: public static void main(String[] args)
Afficher en Java, en C, en Python :: System.out.println() ; printf() ; print()
Différence entre print et println :: println va à la ligne après l'affichage, print non.
Déclarer une constante en Java :: Avec le mot final : final int n = 5;
Les 3 boucles de Java :: for, while, do while.
Particularité de do while :: Le corps s'exécute au moins une fois : la condition est testée après.
À quoi sert break dans un switch ? :: À sortir du bloc switch. Sans lui, on continue dans les cas suivants.
ET logique, OU logique :: && et ||
Opérateurs d'affectation élargie :: += -= /= *=
Que fait + avec une chaîne de caractères ? :: Une concaténation.
"Somme : " + 2 + 3 affiche… :: Somme : 23 (concaténation de gauche à droite). Il faut des parenthèses : (2 + 3).
7 / 2 en Java :: 3 : division entière entre deux entiers.
Lire un entier au clavier :: Scanner clavier = new Scanner(System.in); int n = clavier.nextInt();
Import nécessaire pour Scanner :: import java.util.Scanner;
Comparer le contenu de deux chaînes :: s1.equals(s2). Le == compare les références.
Booléens en Java :: true et false, en minuscules.
```

## QCM du chapitre

```qcm
? Quelle est l'extension d'un fichier source Java ?
- .class
+ .java
- .jar
= Le compilateur produit ensuite un fichier .class.

? Quel est le prototype correct de la méthode principale ?
- void main()
- public void main(String args)
+ public static void main(String[] args)
= C'est le point d'entrée de tout programme Java.

? Quel mot-clé déclare une constante ?
- const
+ final
- static
= Une variable `final` ne peut recevoir une valeur qu'une seule fois.

? Qu'affiche `System.out.println("Resultat: " + 1 + 2);` ?
- Resultat: 3
+ Resultat: 12
- Une erreur de compilation
= Concaténation de gauche à droite : "Resultat: 1" puis "Resultat: 12".

? Qu'affiche `System.out.println(1 + 2 + " est le resultat");` ?
+ 3 est le resultat
- 12 est le resultat
- 1 + 2 est le resultat
= `1 + 2` est calculé d'abord (deux entiers), puis concaténé.

? Que vaut `7 / 2` en Java ?
- 3.5
+ 3
- 4
= Division entière. Pour 3.5, il faut écrire `7 / 2.0`.

? Quelle boucle exécute son corps au moins une fois ?
- for
- while
+ do while
= La condition est testée après le corps.

? Dans un `switch` sans aucun `break`, si on entre au `case 2` :
- seul le `case 2` s'exécute
+ le `case 2` et tous les cas suivants s'exécutent
- rien ne s'exécute
= Le `break` sert justement à sortir du bloc.

? Quel est l'opérateur du ET logique ?
- &
- and
+ &&
= Et `||` pour le OU logique.

? Quelle instruction lit un entier au clavier avec un Scanner nommé `sc` ?
- sc.readInt()
+ sc.nextInt()
- sc.getInt()
= Et `sc.nextDouble()` pour un réel.

? Après `int x = 5; x += 3; x++;`, que vaut x ?
- 8
+ 9
- 10
= 5 + 3 = 8, puis 8 + 1 = 9.

? Laquelle de ces déclarations est correcte en Java ?
- boolean b = True;
+ boolean b = true;
- bool b = 1;
= Les booléens s'écrivent en minuscules, et le type s'appelle `boolean`.
```

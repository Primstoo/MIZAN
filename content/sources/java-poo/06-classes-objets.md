---
id: classes-objets
titre: Classes et objets en Java · new, références, private
seance: Séances 2 et 4
importance: 5
---

## Avant de commencer

Tu dois connaître les mots classe, objet, attribut, méthode, encapsulation (chapitre 2), et savoir que `B = A` copie une référence pour un tableau (chapitre 5).

```exercice Vérifie ton prérequis
? Soit `int[] a = {1, 2}; int[] b = a;`. Combien de tableaux existent en mémoire ?
reponse: 1
= **Un seul.** `a` et `b` sont deux références vers le même tableau. Les objets se comportent exactement de la même façon : c'est l'idée centrale de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Compte les `new`.** Chaque `new` fabrique un objet, et rien d'autre n'en fabrique. Pour savoir combien d'objets existent dans un programme, compte les `new`. Les variables, elles, ne sont que des références.

> [!piege] Déclarer `Point p2;` **ne crée pas d'objet**. Tant qu'il n'y a pas eu de `new` (ou d'affectation), appeler `p2.initialiser(3, 4)` est une erreur.

À la fin, tu sais écrire une classe avec attributs privés et méthodes publiques, créer des objets, et prédire l'effet de `p2 = p1`.

## Idée 1 · Écrire une classe : attributs privés, méthodes publiques

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="La classe Point : attributs x et y privés, méthodes initialiser, deplacer et afficher publiques">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<rect x="100" y="8" width="160" height="114" fill="none" stroke="currentColor" stroke-width="2"/><line x1="100" y1="34" x2="260" y2="34" stroke="currentColor" stroke-width="2"/><line x1="100" y1="70" x2="260" y2="70" stroke="currentColor" stroke-width="2"/>
<text x="180" y="26" text-anchor="middle" font-weight="700">Point</text>
<text x="110" y="50" fill="#D9824F" font-weight="700">- x : double</text><text x="110" y="64" fill="#D9824F" font-weight="700">- y : double</text>
<text x="110" y="86">+ initialiser(a, b)</text><text x="110" y="100">+ deplacer(dx, dy)</text><text x="110" y="114">+ afficher()</text>
<text x="50" y="56" text-anchor="middle" font-size="10">private</text><text x="310" y="96" text-anchor="middle" font-size="10">public</text>
</g>
</svg>
```

```java
class Point {
    private double x, y;                       // attributs : l'état

    public void initialiser(double a, double b) { x = a; y = b; }
    public void deplacer(double dx, double dy)  { x += dx; y += dy; }
    public void afficher() { System.out.println("[" + x + ", " + y + "]"); }
}
```

| Mot | Règle |
|---|---|
| **`private`** | Visibilité limitée à **l'intérieur** de la classe. C'est la règle qui **assure l'encapsulation** : elle donne l'accès aux attributs seulement aux méthodes de la classe. |
| **`public`** | Visibilité à l'intérieur **et** à l'extérieur de la classe. |

> [!attention] Les notes disent : « si on n'a pas spécifié la règle (public, private…), la règle par défaut est **public** ». **C'est inexact en Java.** Sans mot-clé, la visibilité est celle du **paquetage** (« package-private ») : l'attribut est accessible depuis les classes du **même paquetage** seulement, pas de partout. Comme, en TP, toutes tes classes sont dans le même dossier, tout se passe « comme si » c'était public, d'où la confusion. Si la question tombe à l'examen, demande au prof quelle réponse il attend.

> [!retenir] La bonne habitude : **attributs `private`, méthodes `public`**.

## Idée 2 · new fabrique l'objet, la variable n'est qu'une référence

```java
public class TestPoint {
    public static void main(String[] args) {
        Point p1, p2;            // deux références, zéro objet
        p1 = new Point();        // un objet est créé
        p1.initialiser(1, 2);
        p1.afficher();
    }
}
```

```sortie
[1.0, 2.0]
```

```etapes Ce qui se passe en mémoire
Point p1, p2; :: Deux variables sont créées. Aucune ne désigne un objet. **Zéro objet** en mémoire.
p1 = new Point(); :: `new` fabrique un objet Point. `p1` reçoit sa référence (son adresse). **Un objet**.
p1.initialiser(1, 2); :: On envoie le message `initialiser` à l'objet désigné par p1. Son état devient x = 1, y = 2.
p1.afficher(); :: L'objet affiche son état : `[1.0, 2.0]`.
```

Trois règles des notes :

- **Le nombre de `new` = le nombre d'objets.**
- **Tout objet est identifié et manipulé par sa référence.**
- **On ne peut pas appliquer une méthode sur un objet non instancié.**

```java nontest
Point p1, p2;
p1 = new Point();
p1.initialiser(1, 2);    // correct
p2.initialiser(3, 4);    // ERREUR : p2 ne désigne aucun objet
```

> [!attention] Précision de ToumaiLearn, testée : pour une variable locale jamais affectée, le compilateur refuse (« variable p2 might not have been initialized »). Si la référence vaut `null`, le programme compile mais plante à l'exécution avec une `NullPointerException`.

## Idée 3 · p2 = p1 crée un alias, pas une copie

```java
Point p1, p2;
p1 = new Point();
p1.initialiser(1, 2);
p2 = p1;                  // p2 est un alias de p1
p2.deplacer(10, 0);
p1.afficher();
System.out.println(p1 == p2);
```

```sortie
[11.0, 2.0]
true
```

```html
<svg viewBox="0 0 360 96" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="p1 et p2 désignent le même objet Point">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="20" y="10" width="50" height="26" rx="5" fill="none" stroke="#D9824F" stroke-width="3"/><text x="45" y="28" fill="#D9824F" font-weight="700">p1</text>
<rect x="20" y="60" width="50" height="26" rx="5" fill="none" stroke="#D9824F" stroke-width="3"/><text x="45" y="78" fill="#D9824F" font-weight="700">p2</text>
<rect x="200" y="20" width="130" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="265" y="40" font-weight="700">objet Point</text><text x="265" y="58">x = 11.0   y = 2.0</text>
</g>
<path d="M72 24L196 42M72 72L196 54" stroke="currentColor" stroke-width="2"/><path d="M188 36l8 6-9 4M187 50l9 4-8 6" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

On a déplacé **p2**, et c'est **p1** qui affiche 11. Normal : il n'y a qu'**un seul `new`**, donc un seul objet. `p2` est **comme un alias** pour l'objet de `p1` : ils référencent le même objet.

## Idée 4 · == compare les adresses, pas les valeurs

```java
Point p3 = new Point();
p3.initialiser(11, 2);
p3.afficher();
System.out.println(p1 == p3);
```

```sortie
[11.0, 2.0]
false
```

`p1` et `p3` ont **les mêmes coordonnées**, et pourtant `p1 == p3` vaut `false`.

```grille Deux objets identiques, deux adresses différentes
#cols: Variable | Objet | x | y | p1==…
p1 | *objet n°1 | 11.0 | 2.0 | —
p2 | *objet n°1 | 11.0 | 2.0 | true
p3 | !objet n°2 | 11.0 | 2.0 | false
```

> [!retenir] Même si deux objets ont les mêmes coordonnées, ils **ne sont pas égaux** pour `==`, car ils ont **deux adresses différentes**. En Java, `==` compare **les références**, pas les valeurs.

> [!piege] Une référence désigne un objet, mais **une référence n'est pas un objet**. Plusieurs références peuvent désigner le même objet (alias), et une référence peut ne désigner aucun objet (`null`).

## S'exercer

```exercice Compter et prédire
? Combien d'objets sont créés ? `Point a = new Point(); Point b = new Point(); Point c = a; Point d;`
reponse: 2
= Deux `new`, donc deux objets. `c` est un alias de `a`, et `d` ne désigne rien.

? Avec le code précédent, que vaut `a == c` ? Et `a == b` ?
= `a == c` vaut `true` (même objet). `a == b` vaut `false` (deux objets distincts, même s'ils ont le même état).

? Soit `Point p = new Point(); p.initialiser(2, 3); Point q = p; q.deplacer(1, 1);`. Qu'affiche `p.afficher();` ?
= `[3.0, 4.0]`. `q` est un alias de `p` : le déplacement s'applique à l'unique objet.

? Pourquoi déclare-t-on les attributs `private` ?
= Pour assurer l'encapsulation : seules les méthodes de la classe peuvent accéder aux attributs, ce qui protège l'état de l'objet.

? Quelle est la visibilité d'un attribut déclaré `private` ?
= Limitée à l'intérieur de la classe.
```

## Flashcards

```cartes
private :: Visibilité limitée à l'intérieur de la classe. Assure l'encapsulation.
public :: Visibilité à l'intérieur et à l'extérieur de la classe.
Visibilité sans mot-clé en Java :: Celle du paquetage (package-private) : accessible depuis les classes du même paquetage. Les notes disent « public », c'est inexact.
Créer un objet Point :: Point p = new Point();
Que fait new ? :: Il fabrique un objet en mémoire et renvoie sa référence.
Nombre d'objets dans un programme :: Le nombre de new.
Point p2; crée-t-il un objet ? :: Non. Il crée seulement une référence, qui ne désigne encore rien.
Que fait p2 = p1 ? :: p2 devient un alias : p1 et p2 référencent le même objet.
Que compare == entre deux objets ? :: Les références (adresses), pas les valeurs.
Deux objets de mêmes coordonnées sont-ils égaux avec == ? :: Non : ils ont deux adresses différentes.
Appeler une méthode sur une référence null :: Erreur à l'exécution : NullPointerException.
Comment un objet est-il identifié et manipulé ? :: Par sa référence.
```

## QCM du chapitre

```qcm
? Quelle est la visibilité d'un attribut `private` ?
- Tout le programme
+ L'intérieur de la classe seulement
- Le paquetage seulement
= Seules les méthodes de la classe y accèdent.

? Quelle règle assure l'encapsulation ?
+ private
- public
- static
= Elle réserve l'accès aux attributs aux méthodes de la classe.

? Combien d'objets ce code crée-t-il ? `Point a = new Point(); Point b = a; Point c = b;`
+ 1
- 2
- 3
= Un seul `new`, donc un seul objet. b et c sont des alias.

? Que crée l'instruction `Point p;` ?
- Un objet Point initialisé à zéro
+ Une référence, sans objet
- Une classe Point
= L'objet n'existe qu'après un `new`.

? Après `p2 = p1;`, modifier l'objet via p2 :
- ne change rien pour p1
+ modifie aussi ce que voit p1, car c'est le même objet
- provoque une erreur de compilation
= p2 est un alias de p1.

? Deux objets Point distincts ont les mêmes coordonnées. Que vaut `p1 == p3` ?
- true
+ false
- Cela dépend des coordonnées
= `==` compare les adresses, et elles sont différentes.

? Quel opérateur crée un objet ?
- class
- this
+ new
= Le nombre de `new` est le nombre d'objets.

? Que se passe-t-il si on appelle une méthode sur une référence qui vaut `null` ?
- La méthode s'exécute avec des valeurs à zéro
+ Une NullPointerException à l'exécution
- Rien du tout
= On ne peut pas appliquer une méthode sur un objet non instancié.

? En Java, un attribut déclaré sans aucun mot-clé de visibilité est :
- public
- private
+ accessible dans son paquetage (package-private)
= Les notes disent « public » : c'est une simplification inexacte.

? Dans la classe Point, `x += dx;` écrit dans la méthode `deplacer` est autorisé parce que :
- x est une variable globale
+ deplacer est une méthode de la classe, donc elle accède aux attributs privés
- dx est public
= Les méthodes de la classe ont accès à ses attributs privés.

? Combien de références et d'objets ? `Point a = new Point(), b = new Point(), c = a;`
- 2 références, 3 objets
- 3 références, 3 objets
+ 3 références, 2 objets
= Trois variables, mais seulement deux `new`.
```

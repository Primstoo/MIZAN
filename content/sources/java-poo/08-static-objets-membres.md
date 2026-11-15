---
id: static-objets-membres
titre: Paramètre objet, static et objets membres
seance: Séance 5
importance: 5
---

## Avant de commencer

Tu dois savoir écrire un constructeur et utiliser `this` (chapitre 7).

```exercice Vérifie ton prérequis
? Dans une méthode de la classe Point, que désigne `this.x` ?
= L'attribut `x` de **l'objet courant**, celui sur lequel la méthode a été appelée. Dans ce chapitre, une méthode va manipuler **deux** points à la fois : `this` sert à ne pas les confondre.
```

## Comment aborder ce chapitre

> [!astuce] **Demande-toi toujours « à qui appartient cette donnée ? ».** À **cet objet** (attribut normal), à **l'autre objet** passé en paramètre, ou à **la classe entière** (attribut `static`) ? Les trois idées du chapitre sont les trois réponses.

> [!piege] Croire que tout est statique parce que `main` l'est. Les notes sont claires : « **Toutes les méthodes de Java sont statiques** » est **faux**.

À la fin, tu sais écrire une méthode qui reçoit un objet, utiliser `static` à bon escient, et construire une classe dont un attribut est lui-même un objet.

## Idée 1 · Une méthode peut recevoir un objet en paramètre

```java
class Point {
    private double x, y;

    public Point(double x, double y) { this.x = x; this.y = y; }

    public double distance(Point pt) {
        return Math.sqrt(Math.pow(pt.x - this.x, 2) + Math.pow(pt.y - this.y, 2));
    }

    public void deplacer(double d) { this.x += d; this.y += d; }

    public void afficher() { System.out.println("[" + this.x + ", " + this.y + "]"); }
}
```

```java
Point p1 = new Point(0, 0), p3 = new Point(3, 4);
System.out.println(p1.distance(p3));
System.out.println(p3.distance(p1));
```

```sortie
5.0
5.0
```

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Dans p1.distance(p3), this désigne p1 et pt désigne p3 ; la distance vaut 5">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<line x1="40" y1="110" x2="330" y2="110" stroke="currentColor" stroke-width="1.5"/><line x1="40" y1="110" x2="40" y2="10" stroke="currentColor" stroke-width="1.5"/>
<circle cx="40" cy="110" r="5" fill="#D9824F"/><text x="50" y="126" fill="#D9824F" font-weight="700">this = p1 (0, 0)</text>
<circle cx="220" cy="30" r="5" fill="currentColor"/><text x="230" y="26">pt = p3 (3, 4)</text>
<text x="112" y="62" fill="#D9824F" font-weight="700">distance = 5</text>
<text x="130" y="104" font-size="10">3</text><text x="226" y="74" font-size="10">4</text>
</g>
<line x1="40" y1="110" x2="220" y2="30" stroke="#D9824F" stroke-width="3"/>
<path d="M220 110V30" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
</svg>
```

Dans `p1.distance(p3)` : **`this`** est `p1` (l'objet courant), **`pt`** est `p3` (l'autre objet). `this` est important ici car il permet de **distinguer l'objet courant (`this.x`) de l'autre objet (`pt.x`)**.

Deux remarques :

- `p1.distance(p3)` et `p3.distance(p1)` donnent **le même résultat**.
- La méthode lit `pt.x` alors que `x` est `private`. C'est permis : `private` protège la **classe**, pas l'objet. Une méthode de Point a accès aux attributs privés de **tout** objet Point.

> [!attention] Dans les notes, la formule est d'abord écrite `pt.Coord_X - this.Coord_Y`, puis **barrée et corrigée**. Il faut soustraire **X avec X** et **Y avec Y** : `(pt.x - this.x)` et `(pt.y - this.y)`. Avec la version barrée, la distance entre (0, 0) et (3, 4) ne donnerait pas 5.

## Idée 2 · static : un seul exemplaire pour toute la classe

**`static`** permet de définir des **attributs statiques**, qui n'existent qu'en **un seul exemplaire pour tous les objets** de la classe.

```html
<svg viewBox="0 0 360 150" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Sans static, chaque objet a son n et son w. Avec static, n est partagé par tous les objets.">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<text x="90" y="16" font-weight="700">sans static</text>
<rect x="14" y="26" width="68" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="48" y="44">a1 : n</text><text x="48" y="62">a1 : w</text>
<rect x="98" y="26" width="68" height="46" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="132" y="44">a2 : n</text><text x="132" y="62">a2 : w</text>
<text x="270" y="16" font-weight="700" fill="#D9824F">avec static int n</text>
<rect x="236" y="26" width="68" height="26" rx="6" fill="none" stroke="#D9824F" stroke-width="3"/><text x="270" y="44" fill="#D9824F" font-weight="700">n (partagé)</text>
<rect x="194" y="90" width="68" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="228" y="109">a1 : w</text>
<rect x="278" y="90" width="68" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="312" y="109">a2 : w</text>
<text x="90" y="96" font-size="10">4 cases mémoire</text><text x="270" y="140" font-size="10">3 cases mémoire</text>
</g>
<path d="M228 90L262 54M312 90L278 54" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
</svg>
```

| Déclaration | Avec `A a1 = new A(), a2 = new A();` |
|---|---|
| `private int n; private int w;` | a1 a son `n` et son `w` ; a2 a son `n` et son `w` |
| `private static int n; private int w;` | **un seul `n`** partagé ; a1 et a2 ont chacun leur `w` |

Un exemple classique : compter les objets créés.

```java
class Etudiant {
    private static int compteur = 0;     // un seul pour toute la classe
    private String nom;                  // un par objet

    public Etudiant(String nom) { this.nom = nom; compteur++; }

    public static int getCompteur() { return compteur; }
}
```

```java
System.out.println(Etudiant.getCompteur());
Etudiant e1 = new Etudiant("Amine"), e2 = new Etudiant("Sara"), e3 = new Etudiant("Youssef");
System.out.println(Etudiant.getCompteur());
```

```sortie
0
3
```

Chaque `new` exécute le constructeur, qui incrémente **le même** `compteur`.

> [!attention] La classe `Etudiant` avec son compteur est un exemple ajouté par ToumaiLearn. Les notes utilisent une classe `A` avec les attributs `n` et `w`, sans programme complet.

## Idée 3 · Les méthodes statiques

`static` permet aussi de définir des **méthodes statiques**, qui agissent **seulement sur des attributs statiques**.

```java nontest
public class A {
    private static int n;
    private int w;

    public static void f() {
        // on peut accéder seulement à l'attribut n, car il est statique
    }
}
```

**Appel d'une méthode statique** : avec le **nom de la classe**, sans créer d'objet.

```java nontest
A.f();
```

```etapes Pourquoi f() ne peut pas toucher à w
f() appartient à la classe :: On l'appelle par `A.f()`. Aucun objet n'est en jeu.
w appartient à un objet :: Chaque objet A a son propre `w`.
Donc, quel w ? :: Dans `A.f()`, il n'y a pas d'objet courant, pas de `this`. Java ne saurait pas de quel `w` on parle : il refuse de compiler.
n, lui, est unique :: Il n'y a qu'un seul `n` pour toute la classe : aucune ambiguïté.
```

| | Attribut ou méthode d'instance | Attribut ou méthode `static` |
|---|---|---|
| Appartient à | chaque objet | la classe |
| Nombre d'exemplaires | un par objet | un seul |
| Appel | `objet.methode()` | `Classe.methode()` |
| Accès à `this` | oui | non |

> [!retenir] C'est pour cela que `main` est `static` : Java l'appelle **avant** qu'aucun objet n'existe. Mais **toutes les méthodes ne sont pas statiques** : `afficher()`, `distance()`, `deplacer()` ont besoin d'un objet.

## Idée 4 · L'objet membre : un attribut qui est un objet

On peut avoir des **attributs objets**. On parle alors d'**objet membre**.

```java
class Cercle {
    private double rayon;
    private Point centre;                       // objet membre

    public Cercle(double r, double x, double y) {
        this.centre = new Point(x, y);          // le cercle crée son centre
        this.rayon = r;
    }

    public void afficher() {
        System.out.println("Cercle de rayon " + this.rayon);
        System.out.print(" et de centre ");
        this.centre.afficher();                 // on délègue au Point
    }

    public void changerPosition(double d) {
        this.centre.deplacer(d);                // on délègue au Point
    }
}
```

```java
Cercle c = new Cercle(2.5, 1, 1);
c.afficher();
c.changerPosition(4);
c.afficher();
```

```sortie
Cercle de rayon 2.5
 et de centre [1.0, 1.0]
Cercle de rayon 2.5
 et de centre [5.0, 5.0]
```

```flux Le cercle délègue le travail à son centre
c.changerPosition(4) -> this.centre.deplacer(4) -> le Point modifie ses x et y
```

Le Cercle ne touche jamais directement aux coordonnées : il **envoie un message** à son centre. C'est la relation « **a un** » du chapitre 3. Comme le centre est créé **par** le cercle et **dans** le cercle, c'est une **composition**.

> [!attention] Dans les notes, le constructeur est écrit `Cercle(double r, double x, double y)` et l'attribut `private float Rayon`. Affecter un `double` à un `float` **ne compile pas** en Java (« possible lossy conversion from double to float »). Ici, `rayon` est déclaré `double` pour que le programme compile. Les noms ont aussi été mis en minuscules (`rayon`, `centre`), selon l'usage en Java.

## S'exercer

```exercice Paramètre objet, static, objet membre
? Dans `p1.distance(p3)`, que désignent `this` et `pt` à l'intérieur de la méthode ?
= `this` désigne `p1` (l'objet courant), `pt` désigne `p3` (l'objet passé en paramètre).

? `a = new Point(1, 1)` et `b = new Point(4, 5)`. Que renvoie `a.distance(b)` ?
reponse: 5
indice: Racine de (4 − 1)² + (5 − 1)².
= Racine de 9 + 16 = racine de 25 = 5.

? Une classe a un attribut `private static int n` et on crée 10 objets. Combien d'exemplaires de `n` existent en mémoire ?
reponse: 1
= Un seul : un attribut statique n'existe qu'en un seul exemplaire pour tous les objets.

? Comment appelle-t-on une méthode statique `f()` de la classe `A` ?
= `A.f();` : avec le nom de la classe.

? Vrai ou faux : « Toutes les méthodes de Java sont statiques. »
= **Faux.** Seules celles déclarées avec `static` le sont.

? Qu'est-ce qu'un objet membre ? Donne l'exemple du cours.
= Un attribut qui est lui-même un objet. Exemple : dans la classe Cercle, l'attribut `centre` est de type Point.

? Dans `Cercle`, pourquoi écrit-on `this.centre.deplacer(d)` plutôt que de modifier x et y directement ?
= Parce que x et y sont des attributs privés de Point : le Cercle n'y a pas accès. Il envoie un message à son centre, qui se déplace lui-même.
```

## Flashcards

```cartes
Dans p1.distance(p3), que vaut this ? :: p1, l'objet courant. Le paramètre pt désigne p3.
À quoi sert this dans distance(Point pt) ? :: À distinguer l'objet courant (this.x) de l'autre objet (pt.x).
Formule de distance correcte :: Math.sqrt(Math.pow(pt.x - this.x, 2) + Math.pow(pt.y - this.y, 2))
Attribut static :: Attribut qui n'existe qu'en un seul exemplaire pour tous les objets de la classe.
Méthode static :: Méthode qui agit seulement sur des attributs statiques, appelée par le nom de la classe.
Appeler la méthode statique f de la classe A :: A.f();
Une méthode static peut-elle utiliser un attribut non static ? :: Non : il n'y a pas d'objet courant, donc pas de this.
« Toutes les méthodes de Java sont statiques » :: Faux.
Objet membre :: Attribut qui est lui-même un objet (ex. le centre de type Point dans Cercle).
Où crée-t-on l'objet membre ? :: Dans le constructeur : this.centre = new Point(x, y);
Pourquoi main est-il static ? :: Parce que Java l'appelle avant qu'aucun objet n'existe.
private protège-t-il l'objet ou la classe ? :: La classe : une méthode de Point peut lire les attributs privés d'un autre objet Point.
```

## QCM du chapitre

```qcm
? Dans `p1.distance(p3)`, à l'intérieur de la méthode, `this` désigne :
+ p1
- p3
- la classe Point
= `this` est l'objet sur lequel la méthode est appelée.

? Que renvoie `new Point(0, 0).distance(new Point(3, 4))` ?
- 7.0
+ 5.0
- 25.0
= Racine de 3² + 4² = racine de 25 = 5.

? `p1.distance(p3)` et `p3.distance(p1)` :
+ donnent le même résultat
- donnent des résultats opposés
- provoquent une erreur pour le second
= La distance est symétrique.

? Un attribut `static` existe :
- en un exemplaire par objet
+ en un seul exemplaire pour tous les objets
- seulement pendant l'exécution du constructeur
= C'est la définition du cours.

? Classe A avec `private static int n; private int w;`. On crée 3 objets. Combien de `w` et de `n` en mémoire ?
- 3 w et 3 n
+ 3 w et 1 n
- 1 w et 3 n
= Un `w` par objet, un seul `n` pour la classe.

? Comment appelle-t-on la méthode statique `f()` de la classe `A` ?
- new A.f();
+ A.f();
- this.f();
= Par le nom de la classe, sans créer d'objet.

? Une méthode statique peut accéder directement :
+ seulement aux attributs statiques
- à tous les attributs
- seulement aux attributs privés non statiques
= Sans objet courant, elle ne peut pas savoir de quel attribut d'instance il s'agit.

? « Toutes les méthodes de Java sont statiques. »
- Vrai
+ Faux
- Vrai seulement pour les classes publiques
= `afficher()` ou `deplacer()` s'appliquent à un objet : elles ne sont pas statiques.

? Qu'est-ce qu'un objet membre ?
- Un objet créé dans main
+ Un attribut qui est lui-même un objet
- Un objet déclaré static
= Exemple : le centre (Point) d'un Cercle.

? Dans la classe Cercle, où l'objet `centre` est-il créé ?
- Dans la méthode afficher
- Dans la classe Point
+ Dans le constructeur de Cercle
= `this.centre = new Point(x, y);`

? Après `Cercle c = new Cercle(2.5, 1, 1); c.changerPosition(4);`, quel est le centre ?
- [1.0, 1.0]
+ [5.0, 5.0]
- [4.0, 4.0]
= `deplacer(4)` ajoute 4 à x et à y : (1 + 4, 1 + 4).

? Dans les notes, pourquoi la formule `pt.Coord_X - this.Coord_Y` a-t-elle été barrée ?
- Parce que `this` est interdit dans une méthode
+ Parce qu'il faut soustraire X avec X et Y avec Y
- Parce que `pt` est privé
= La bonne formule : (pt.x − this.x)² + (pt.y − this.y)².
```

---
id: revision-java
titre: Révision express et examen blanc
seance: Avant l'examen
importance: 3
---

## Avant de commencer

Ce chapitre rassemble tout le module. Fais-le quand tu as terminé les neuf chapitres précédents.

```exercice Vérifie ton prérequis
? Sans regarder : donne la formule d'un objet, et la différence entre une classe et un objet.
= **Objet = État + Comportement.** La classe est le modèle ; l'objet est une instance de la classe. Si tu as hésité, repasse par le chapitre 2 avant l'examen blanc.
```

## Comment aborder ce chapitre

> [!astuce] **Deux épreuves en une.** L'examen de POO mélange des **questions de cours** (définitions, comme au TD 1) et de la **lecture ou écriture de code** (comme aux TD 2 et 3). Révise les deux séparément : les flashcards pour le cours, le papier et le stylo pour le code.

> [!piege] Réviser le code en le relisant. Lire `this.x = x;` semble évident ; l'écrire de mémoire dans un constructeur, sans oublier `this`, l'est beaucoup moins. **Écris.**

À la fin, tu sais où tu en es sur chaque partie du module.

## Idée 1 · Le cours sur une page

| Thème | L'essentiel |
|---|---|
| **Paradigme** | Manière de programmer basée sur un ensemble de principes : procédural (C), objet (Java), descriptif (HTML) |
| **Cycle de vie** | Besoins, analyse, conception, implémentation, tests, validation, maintenance |
| **Qualités** | Exactitude, robustesse, extensibilité, réutilisabilité, portabilité, efficience |
| **Wirth** | Algorithmes + Structures de données = Programmes |
| **Objet** | État (valeurs des attributs) + comportement (méthodes) |
| **Classe** | Modèle d'objets ; l'objet en est une instance |
| **Encapsulation** | Attributs cachés (`private`), accès par les méthodes (`public`) |
| **Héritage** | Nouvelle classe à partir d'une existante : `class Fille extends Mere` |
| **Polymorphisme** | « Plusieurs formes » : de méthodes (surcharge, redéfinition) et d'objets |
| **Relations** | Association (« utilise un »), agrégation et composition (« a un »), héritage (« est un ») |
| **Tableau** | Objet ; `int[] t = new int[5];` ; `t.length` ; indices de 0 à taille − 1 |
| **Référence** | `new` crée l'objet ; `=` copie la référence ; `==` compare les références |
| **Constructeur** | Même nom que la classe, pas de type de retour, surchargeable |
| **this** | Référence sur l'objet courant |
| **static** | Un seul exemplaire pour toute la classe ; appel par `Classe.methode()` |
| **Objet membre** | Attribut qui est lui-même un objet (le centre d'un Cercle) |

## Idée 2 · Les paires à ne jamais confondre

| Ne confonds pas… | …avec |
|---|---|
| **Classe** (le modèle) | **Objet** (une instance) |
| **Exactitude** (cas normal) | **Robustesse** (cas anormal) |
| **Agrégation** (la partie survit) | **Composition** (la partie dépend du tout) |
| **Surcharge** (même classe, paramètres différents) | **Redéfinition** (classe fille, mêmes paramètres) |
| **Spécialisation** (mère vers fille) | **Généralisation** (fille vers mère) |
| **`=`** (copie la référence) | **`==`** (compare les références) |
| **`this.x`** (l'attribut) | **`x`** (le paramètre) |
| **Attribut d'instance** (un par objet) | **Attribut `static`** (un pour la classe) |

## Idée 3 · La classe modèle à savoir écrire les yeux fermés

```java
public class Point {
    private double x, y;                          // 1. attributs privés

    public Point(double x, double y) {            // 2. constructeur
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }            // 3. getter
    public void setX(double x) { this.x = x; }    //    setter

    public double distance(Point pt) {            // 4. méthode avec paramètre objet
        return Math.sqrt(Math.pow(pt.x - this.x, 2) + Math.pow(pt.y - this.y, 2));
    }

    public void afficher() {                      // 5. affichage
        System.out.println("[" + this.x + ", " + this.y + "]");
    }
}
```

```etapes La check-list d'une classe, dans l'ordre
1. Les attributs :: `private`, avec leur type.
2. Le constructeur :: Même nom que la classe, pas de `void`, `this.attribut = parametre;`.
3. Les accesseurs :: `getX()` renvoie, `setX(...)` modifie.
4. Les méthodes métier :: Elles utilisent `this` pour l'objet courant, et le paramètre pour l'autre objet.
5. L'affichage :: Une méthode `afficher()` avec `System.out.println`.
6. La classe de test :: Une autre classe avec `public static void main(String[] args)`, qui fait les `new` et appelle les méthodes.
```

> [!attention] Aucune annale ni barème d'examen de ce module n'a été fourni : le format réel de l'épreuve n'est pas connu. L'examen blanc ci-dessous est construit par ToumaiLearn à partir des séances 1 à 5 et des TD 1 à 3. La suite du programme (héritage en Java, classes abstraites, interfaces, exceptions) n'est pas encore couverte.

```flux Ton plan des trois derniers jours
J-3 : QCM des chapitres 1 à 3 + flashcards -> J-2 : QCM des chapitres 4 à 8, refaire les TD 2 et 3 sur papier -> J-1 : examen blanc sans rien regarder
```

## S'exercer

```exercice Comme à l'écrit
? Définis l'encapsulation et dis comment Java la met en œuvre.
= L'encapsulation consiste à regrouper les données et les méthodes dans une classe en cachant l'état interne : on n'accède aux données que par les méthodes. En Java, on déclare les attributs `private` et on fournit des méthodes `public` (getters, setters).

? Quelle est la différence entre surcharge et redéfinition ? Donne un exemple de chacune.
= **Surcharge** : même nom, paramètres différents, dans la même classe (`afficher(int)` et `afficher(String)`). **Redéfinition** : même nom, mêmes paramètres, dans la classe fille, pour remplacer la méthode héritée (`salut()` dans A et dans B).

? Écris une classe `Rectangle` avec deux attributs privés `largeur` et `hauteur`, un constructeur et une méthode `surface()`.
= `public class Rectangle { private double largeur, hauteur; public Rectangle(double largeur, double hauteur) { this.largeur = largeur; this.hauteur = hauteur; } public double surface() { return largeur * hauteur; } }`

? Combien d'objets et combien de références ? `Point a = new Point(1, 2); Point b = a; Point c = new Point(1, 2);` Et que valent `a == b` et `a == c` ?
= Deux objets (deux `new`), trois références. `a == b` vaut `true` (même objet). `a == c` vaut `false` (deux objets distincts, même contenu).

? Qu'affiche `System.out.println("x = " + 3 + 4);` ? Et `System.out.println(3 + 4 + " = x");` ?
= `x = 34` puis `7 = x`. Java lit de gauche à droite : dès qu'une chaîne est en jeu, `+` concatène.

? Quelle relation existe entre Cercle et Point dans le cours, et pourquoi ?
= Une composition (« a un ») : le Cercle a un centre de type Point, créé dans son constructeur. C'est un objet membre.
```

## Flashcards

```cartes
Les 3 piliers de la POO :: Encapsulation, héritage, polymorphisme.
La check-list d'une classe Java :: Attributs privés, constructeur, getters/setters, méthodes, affichage, puis une classe de test avec main.
3 choses que compare ou copie une référence :: = copie la référence ; == compare les références ; new crée l'objet.
Les 4 pièges du module :: "texte" + 2 + 3 concatène ; 7 / 2 vaut 3 ; x = x sans this ne fait rien ; == compare les adresses.
```

## QCM du chapitre

```qcm
? Lequel de ces langages illustre la programmation descriptive ?
- C
- Java
+ XML
= HTML et XML décrivent des structures de données.

? Laquelle de ces qualités concerne le temps d'exécution et la mémoire ?
- La portabilité
+ L'efficience
- L'extensibilité
= Efficience : temps d'exécution, taille mémoire.

? Une classe est à un objet ce que :
+ un moule est à un gâteau
- un gâteau est à un moule
- une fonction est à une variable
= La classe est le modèle, l'objet une instance.

? Quelle relation lie Voiture et Moteur dans le TD 1 ?
- Une association
- Une agrégation
+ Une composition
= La partie (le moteur) dépend du tout (la voiture).

? « Même nom, mêmes paramètres, dans la classe fille » décrit :
- la surcharge
+ la redéfinition
- l'instanciation
= La surcharge, c'est même classe et paramètres différents.

? Qu'affiche `System.out.println("A" + 1 + 1);` ?
- A2
+ A11
- Une erreur
= Concaténation de gauche à droite.

? Que vaut `10 / 4` en Java ?
+ 2
- 2.5
- 3
= Division entière entre deux `int`.

? Après `int[] t = new int[4];`, que vaut `t[3]` ?
+ 0
- null
- Une erreur : l'indice 3 n'existe pas
= Les indices vont de 0 à 3, et `new` met les cases à 0.

? Combien d'objets ? `Point a = new Point(0, 0); Point b = a; Point c = b;`
+ 1
- 2
- 3
= Un seul `new`.

? Un constructeur :
- a toujours le type de retour void
+ porte le nom de la classe et n'a pas de type de retour
- doit s'appeler `init`
= Et il peut être surchargé.

? Dans un setter `public void setX(double x)`, quelle instruction est correcte ?
- x = x;
+ this.x = x;
- x = this.x;
= `this.x` est l'attribut, `x` le paramètre.

? Un attribut `static` :
- existe en un exemplaire par objet
+ existe en un seul exemplaire pour toute la classe
- ne peut jamais être modifié
= C'est `final` qui empêche la modification, pas `static`.

? Comment appelle-t-on une méthode statique `f` de la classe `A` ?
- a.f() obligatoirement, avec un objet a
+ A.f()
- static.f()
= Par le nom de la classe.

? Dans la classe Cercle, `private Point centre;` est :
- un attribut statique
+ un objet membre
- un constructeur
= Un attribut qui est lui-même un objet.

? En Java, une classe peut hériter directement de combien de classes ?
+ Une seule
- Deux
- Autant qu'on veut
= Pas d'héritage multiple de classes.
```

---
id: constructeurs-this
titre: Constructeurs, this, getters et setters
seance: Séance 4 · TD 3
importance: 5
---

## Avant de commencer

Tu dois savoir créer un objet avec `new` et pourquoi les attributs sont `private` (chapitre 6).

```exercice Vérifie ton prérequis
? Dans le chapitre 6, il fallait deux lignes pour obtenir un point utilisable : `p = new Point();` puis `p.initialiser(1, 2);`. Quel risque y a-t-il à séparer les deux ?
= On peut **oublier** la seconde ligne : l'objet existe alors avec un état non voulu. Le constructeur règle ce problème : il crée **et** initialise en une seule instruction.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « acte de naissance ».** Le constructeur est la méthode qui s'exécute à la naissance de l'objet, une seule fois, au moment du `new`. Son rôle : que l'objet naisse déjà dans un état correct.

> [!piege] Écrire `void` devant un constructeur. Un constructeur n'a **aucun type de retour, même pas `void`**. Avec `void`, Java y voit une méthode ordinaire qui porte le nom de la classe, et ton « constructeur » n'est jamais appelé.

À la fin, tu sais écrire un ou plusieurs constructeurs, utiliser `this`, et protéger tes attributs avec des getters et des setters.

## Idée 1 · Le constructeur : même nom que la classe, pas de type de retour

**Constructeur.** Une méthode qui porte le **même nom que sa classe**, **sans type de retour, même pas `void`**. Il **crée les objets et initialise les attributs**.

```java
class Point {
    private double x, y;

    public Point(double x, double y) {
        this.x = x;
        this.y = y;
        System.out.println("Je suis le constructeur avec parametres");
    }

    public void afficher() { System.out.println("[" + this.x + ", " + this.y + "]"); }
}

public class TestC {
    public static void main(String[] args) {
        Point a = new Point(3, 4);
        a.afficher();
    }
}
```

```sortie
Je suis le constructeur avec parametres
[3.0, 4.0]
```

```etapes Ce que fait new Point(3, 4)
1. Allocation :: `new` réserve la mémoire pour un objet Point.
2. Appel du constructeur :: Java cherche un constructeur qui accepte deux `double`, et l'exécute avec x = 3 et y = 4.
3. Initialisation :: `this.x = x; this.y = y;` range 3 et 4 dans les attributs de l'objet.
4. Référence :: `new` renvoie la référence de l'objet, qui est rangée dans `a`.
```

| Règle | Détail |
|---|---|
| Nom | Le même que la classe |
| Type de retour | Aucun, même pas `void` |
| Rôle | Créer l'objet et initialiser ses attributs |
| Surcharge | Possible : dans la même classe, on peut définir **plusieurs** constructeurs |
| Aucun constructeur écrit ? | Le compilateur crée un **constructeur par défaut**, sans paramètres |

## Idée 2 · this : la référence sur l'objet courant

**`this`** est une **référence sur l'objet courant** : celui sur lequel la méthode est en train de s'exécuter.

```html
<svg viewBox="0 0 360 100" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="this.x désigne l'attribut de l'objet, x seul désigne le paramètre">
<g font-family="monospace" font-size="13" fill="currentColor">
<text x="96" y="50">this.x  =  x ;</text>
</g>
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<text x="110" y="20" fill="#D9824F" font-weight="700">l'attribut de l'objet</text>
<text x="230" y="86">le paramètre reçu</text>
</g>
<path d="M118 26v10" stroke="#D9824F" stroke-width="2.5"/><path d="M192 56v16" stroke="currentColor" stroke-width="2"/>
</svg>
```

Quand le paramètre porte **le même nom** que l'attribut, `this` est indispensable pour les distinguer. Sans lui :

```java
class Q {
    private double x;
    public void setX(double x) { x = x; }      // le paramètre s'affecte à lui-même !
    public double getX() { return x; }
}
```

Après `q.setX(5)`, `q.getX()` renvoie :

```sortie
0.0
```

L'attribut n'a **jamais été modifié** : `x = x` recopie le paramètre dans lui-même. Aucune erreur, aucun avertissement, juste un résultat faux.

> [!retenir] `this.x` = l'attribut de **l'objet courant**. `x` seul = le **paramètre** (s'il existe un paramètre de ce nom).

## Idée 3 · Plusieurs constructeurs, et le constructeur par défaut

Un constructeur **peut être surchargé** : même nom, paramètres différents.

```java
class Point {
    private double x, y;

    public Point() {                     // sans paramètre
        this(0, 0);                      // appelle l'autre constructeur
        System.out.println("Constructeur sans parametre");
    }

    public Point(double x, double y) {   // avec paramètres
        this.x = x;
        this.y = y;
        System.out.println("Je suis le constructeur avec parametres");
    }

    public void afficher() { System.out.println("[" + this.x + ", " + this.y + "]"); }
}
```

`Point o = new Point(); o.afficher();` affiche :

```sortie
Je suis le constructeur avec parametres
Constructeur sans parametre
[0.0, 0.0]
```

Java choisit le constructeur d'après les arguments du `new`.

```grille Quel constructeur est appelé ?
#cols: Instruction | Constructeur
new Point() | *Point()
new Point(3, 4) | !Point(double, double)
```

> [!piege] Le constructeur par défaut n'existe **que si tu n'as écrit aucun constructeur**. Dès que tu écris `Point(double x, double y)`, l'instruction `new Point()` ne compile plus (« constructor Point cannot be applied to given types »), sauf si tu écris aussi un constructeur sans paramètre. Testé.

> [!attention] `this(0, 0)` (un constructeur qui en appelle un autre) est un ajout de ToumaiLearn : les notes disent seulement que le constructeur peut être surchargé.

## Idée 4 · Getters et setters : la porte d'entrée des attributs privés

Les attributs sont `private`. Pour les lire et les modifier de l'extérieur, on passe par des méthodes publiques :

| Méthode | Nom | Rôle |
|---|---|---|
| **Getter** | `getReel()` | **Renvoie** la valeur de l'attribut |
| **Setter** | `setReel(double reel)` | **Modifie** la valeur de l'attribut |

Extrait de la classe `Complexe` du TD 3 :

```java
public class Complexe {
    private double Img, Reel;

    public double getReel() { return Reel; }
    public double getImg()  { return Img; }

    public void setReel(double reel) { this.Reel = reel; }
    public void setImg(double img)   { this.Img = img; }
}
```

L'intérêt : le setter peut **contrôler** la valeur avant de l'accepter.

```java
class Compte {
    private double solde;
    public double getSolde() { return solde; }
    public void setSolde(double s) {
        if (s >= 0) this.solde = s;
        else System.out.println("Solde refuse : " + s);
    }
}
```

`c.setSolde(1500); c.setSolde(-200); System.out.println(c.getSolde());` affiche :

```sortie
Solde refuse : -200.0
1500.0
```

Le solde négatif est refusé : l'objet reste dans un état correct. Avec un attribut `public`, rien n'aurait empêché `c.solde = -200`.

> [!attention] La classe `Compte` est un exemple ajouté par ToumaiLearn pour montrer l'intérêt d'un setter. Les getters et setters de `Complexe` viennent du corrigé du TD 3.

> [!prof] Dans le TD 3, la classe `Complexe` n'a **pas de constructeur** : on crée l'objet avec `new Complexe()` (constructeur par défaut), puis on le remplit avec les setters. La classe `Rationnel`, elle, a un constructeur à deux paramètres. Les deux styles sont à connaître.

## S'exercer

```exercice Constructeurs et this
? Donne les deux particularités d'écriture d'un constructeur.
= Il porte le même nom que sa classe, et il n'a pas de type de retour (même pas `void`).

? Une classe ne contient aucun constructeur. Peut-on écrire `new MaClasse()` ?
= Oui. Le compilateur crée un constructeur par défaut, sans paramètres.

? Une classe `Rationnel` a un seul constructeur : `Rationnel(int x, int y)`. L'instruction `new Rationnel()` compile-t-elle ?
= Non. Comme un constructeur a été écrit, le constructeur par défaut n'est plus créé. Il faut passer deux entiers, ou ajouter un constructeur sans paramètre.

? Écris un constructeur pour la classe `Complexe` (attributs `Reel` et `Img`) qui reçoit la partie réelle et la partie imaginaire.
= `public Complexe(double reel, double img) { this.Reel = reel; this.Img = img; }`

? Qu'est-ce que `this` ?
= Une référence sur l'objet courant.

? Dans `public void setX(double x) { x = x; }`, pourquoi l'attribut n'est-il pas modifié ?
= Parce que `x` désigne les deux fois le paramètre : il s'affecte à lui-même. Il faut écrire `this.x = x;`.
```

## Flashcards

```cartes
Constructeur : définition :: Méthode qui porte le même nom que sa classe, sans type de retour (même pas void). Elle crée les objets et initialise les attributs.
Un constructeur peut-il être surchargé ? :: Oui : on peut définir plusieurs constructeurs dans la même classe, avec des paramètres différents.
Pas de constructeur écrit : que se passe-t-il ? :: Le compilateur crée un constructeur par défaut, sans paramètres.
Quand le constructeur par défaut disparaît-il ? :: Dès qu'on écrit soi-même au moins un constructeur.
this :: Une référence sur l'objet courant.
this.x = x; :: L'attribut x de l'objet courant reçoit la valeur du paramètre x.
Que fait x = x; dans un setter ? :: Rien d'utile : le paramètre s'affecte à lui-même, l'attribut ne change pas.
Getter :: Méthode publique qui renvoie la valeur d'un attribut privé (getReel()).
Setter :: Méthode publique qui modifie la valeur d'un attribut privé (setReel(double reel)).
Intérêt d'un setter par rapport à un attribut public :: Il peut contrôler la valeur avant de l'accepter.
Quand le constructeur s'exécute-t-il ? :: Au moment du new, une seule fois par objet.
```

## QCM du chapitre

```qcm
? Quel nom porte un constructeur ?
- init
+ Le même nom que sa classe
- constructor
= C'est ainsi que Java le reconnaît.

? Quel est le type de retour d'un constructeur ?
- void
- Le type de la classe
+ Aucun, même pas void
= Avec `void`, ce serait une méthode ordinaire.

? Quel est le rôle du constructeur ?
+ Créer les objets et initialiser les attributs
- Détruire les objets inutilisés
- Afficher l'état de l'objet
= Il s'exécute au moment du `new`.

? Une classe peut-elle avoir plusieurs constructeurs ?
- Non, un seul
+ Oui, s'ils ont des paramètres différents
- Oui, mais seulement deux
= Le constructeur peut être surchargé.

? Si on n'écrit aucun constructeur dans une classe :
- on ne peut pas créer d'objet
+ le compilateur crée un constructeur par défaut sans paramètres
- la classe ne compile pas
= C'est ce qui se passe pour la classe Complexe du TD 3.

? La classe Point a un seul constructeur : `Point(double x, double y)`. Que donne `new Point()` ?
- Un point (0, 0)
+ Une erreur de compilation
- Un point aux coordonnées aléatoires
= Le constructeur par défaut n'existe plus dès qu'on en écrit un.

? Que désigne `this` ?
- La classe courante
+ L'objet courant
- La méthode main
= C'est une référence sur l'objet sur lequel la méthode s'exécute.

? Dans `public Point(double x, double y) { this.x = x; }`, que désigne `this.x` ?
+ L'attribut x de l'objet
- Le paramètre x
- Une variable locale
= `x` seul désigne le paramètre.

? Un setter sert à :
- renvoyer la valeur d'un attribut
+ modifier la valeur d'un attribut
- créer un nouvel objet
= Le getter, lui, renvoie la valeur.

? Pourquoi préférer un setter à un attribut public ?
- Le setter est plus rapide
+ Le setter peut vérifier la valeur avant de la ranger
- Un attribut public ne peut pas être modifié
= C'est tout l'intérêt de l'encapsulation.

? Quand le constructeur est-il appelé ?
- À chaque appel de méthode
+ Au moment du `new`
- À la fin du programme
= Une fois par objet créé.
```

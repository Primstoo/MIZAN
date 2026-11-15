---
id: relations-classes
titre: Relations entre classes, surcharge et redéfinition
seance: Séance 1 · TD 1 (exercices 5 et 6)
importance: 5
---

## Avant de commencer

Tu dois savoir ce qu'est une classe, un objet et l'héritage (chapitre 2).

```exercice Vérifie ton prérequis
? Complète : « L'héritage permet de définir une nouvelle classe à partir de… »
= « …d'une **classe existante**, en ajoutant de nouvelles méthodes et de nouvelles données. » Si c'est acquis, tu connais déjà l'une des trois relations du chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Trois petites phrases suffisent.** « **utilise** un » = association. « **a** un » = agrégation ou composition. « **est** un » = héritage. Face à deux classes, dis les trois phrases à voix haute : une seule sonne juste.

> [!piege] **Surcharge et redéfinition** se ressemblent et s'échangent tout le temps dans les copies. Surcharge : **même classe**, paramètres **différents**. Redéfinition : classe **fille**, **mêmes** paramètres.

À la fin, tu sais classer une relation entre deux classes, distinguer agrégation et composition, et ne plus confondre surcharge et redéfinition.

## Idée 1 · Trois familles de relations

Une application objet, ce sont des objets qui **travaillent ensemble**. Comme chaque objet vient d'une classe, les classes sont liées entre elles. Il y a trois types de relations.

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Association : utilise un. Agrégation et composition : a un. Héritage : est un.">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="6" y="8" width="108" height="114" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="28" font-weight="700">Association</text><text x="60" y="48" fill="#D9824F" font-weight="700">« utilise un »</text><text x="60" y="70" font-size="10">lien simple</text><text x="60" y="84" font-size="10">et temporaire</text><text x="60" y="108" font-size="10">Personne — Entreprise</text>
<rect x="126" y="8" width="108" height="114" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="24" font-weight="700" font-size="10">Agrégation</text><text x="180" y="36" font-weight="700" font-size="10">Composition</text><text x="180" y="52" fill="#D9824F" font-weight="700">« a un »</text><text x="180" y="70" font-size="10">une classe en</text><text x="180" y="84" font-size="10">contient une autre</text><text x="180" y="108" font-size="10">Homme — Tête</text>
<rect x="246" y="8" width="108" height="114" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="28" font-weight="700">Héritage</text><text x="300" y="48" fill="#D9824F" font-weight="700">« est un »</text><text x="300" y="70" font-size="10">reprend attributs</text><text x="300" y="84" font-size="10">et méthodes</text><text x="300" y="108" font-size="10">Étudiant — Personne</text>
</g>
</svg>
```

| Relation | Définition | Lien |
|---|---|---|
| **Association** | Une classe **utilise** une autre, sans la posséder | Simple et temporaire |
| **Agrégation / Composition** | Une classe **contient** (est composée de) une autre | « a un » |
| **Héritage** | Une classe **reprend** les attributs et les méthodes d'une autre | « est un » |

Exemple d'association du cours : une **Personne** travaille dans une **Entreprise**. Exemple du TD : un **Médecin** soigne un **Patient**.

## Idée 2 · Agrégation ou composition : la partie survit-elle au tout ?

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Losange vide : agrégation, la partie peut exister sans le tout. Losange plein : composition, la partie dépend du tout.">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="8" y="14" width="96" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="33">Bibliothèque</text>
<rect x="252" y="14" width="96" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="33">Livre</text>
<text x="180" y="18" font-size="10">agrégation (losange vide)</text>
<rect x="8" y="76" width="96" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="95">Voiture</text>
<rect x="252" y="76" width="96" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="95">Moteur</text>
<text x="180" y="80" font-size="10" fill="#D9824F" font-weight="700">composition (losange plein)</text>
</g>
<path d="M124 28H252" stroke="currentColor" stroke-width="2"/><path d="M104 28l10-6 10 6-10 6z" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M124 90H252" stroke="#D9824F" stroke-width="2"/><path d="M104 90l10-6 10 6-10 6z" fill="#D9824F" stroke="#D9824F" stroke-width="2"/>
</svg>
```

| | Agrégation | Composition |
|---|---|---|
| Symbole | Losange **vide** | Losange **plein** |
| Force du lien | Composante, mais **pas obligatoire** | **Indispensable**, obligatoire |
| La partie… | **peut exister sans** le tout | **dépend** du tout |
| Exemple du TD | Une Bibliothèque contient des Livres | Une Voiture a un Moteur |
| Exemple du cours | Homme et Bras | Homme et Tête |

La composition est une **agrégation forte**.

```etapes Le test en deux questions
Question 1 : A contient-il B ? :: Si non, ce n'est ni une agrégation ni une composition (regarde du côté de l'association ou de l'héritage).
Question 2 : si je détruis A, B a-t-il encore un sens ? :: **Oui** : agrégation. On ferme la bibliothèque, les livres existent toujours. **Non** : composition. Dans le modèle, le moteur n'existe que dans sa voiture.
```

**La multiplicité** se note au bout du lien. `1..*` veut dire **« un ou plusieurs »**.

> [!attention] L'exemple « Homme et Bras » en agrégation vient des notes de séance. On peut en discuter (un bras sans homme ?), mais c'est l'exemple du cours : en examen, reprends plutôt **Bibliothèque / Livres** et **Voiture / Moteur**, qui sont les réponses du TD.

## Idée 3 · L'héritage : trois intérêts, deux sens de lecture

Les trois intérêts de l'héritage :

| Intérêt | En un mot | Explication |
|---|---|---|
| **Réutilisation** | Reprendre | On ne réécrit pas le code : il est déjà fait |
| **Spécialisation / enrichissement** | Ajouter | On ajoute des éléments propres à la classe fille |
| **Redéfinition** | Modifier | On change le comportement d'une méthode héritée |

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="De Étudiant vers Personne : généralisation. De Personne vers Étudiant : spécialisation.">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="130" y="10" width="100" height="28" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="29" fill="#D9824F" font-weight="700">Personne</text><text x="76" y="29" font-size="10">classe mère</text>
<rect x="130" y="82" width="100" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="101">Étudiant</text><text x="76" y="101" font-size="10">sous-classe</text>
<text x="290" y="48" font-size="10">généralisation</text><text x="290" y="60" font-size="10">(abstraction) ↑</text><text x="290" y="82" font-size="10">spécialisation</text><text x="290" y="94" font-size="10">(raffinement) ↓</text>
</g>
<path d="M180 82V42" stroke="currentColor" stroke-width="2"/><path d="M173 50l7-10 7 10z" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

- **Spécialisation** : on va de la classe mère vers la classe fille (Personne vers Étudiant). On raffine.
- **Généralisation** : on va de la classe fille vers la classe mère (Étudiant vers Personne). On abstrait.

Syntaxe en Java (TD 1) :

```java
class ClasseFille extends ClasseMere {
    // attributs et méthodes
}
```

> [!piege] **En Java, il n'y a pas d'héritage multiple de classes** : une classe a **une seule** classe mère.

> [!retenir] **Polymorphisme d'objets** : un objet d'une classe fille **est aussi** un objet de la classe mère. C'est le sens de « est un ».

## Idée 4 · Surcharge contre redéfinition

```grille Surcharge et redéfinition, face à face
#cols: Critère | Surcharge | Redéfinition
Nom anglais | *overloading | !overriding
Où ? | *même classe | !classe fille
Nom de la méthode | *identique | !identique
Paramètres | *différents | !identiques
```

**Surcharge (overloading).** Une méthode peut prendre **plusieurs formes dans la même classe** : même nom, **paramètres différents**. Exemple du cours : `afficher(int)` et `afficher(String)`.

**Redéfinition (overriding).** On change, **dans la classe fille**, la définition d'une méthode **héritée** de la classe mère : même nom, **mêmes paramètres**, pour remplacer la version du parent. Exemple du cours : `salut()` dans A, `salut()` dans B.

Les deux forment le **polymorphisme des méthodes**.

Voici les deux mécanismes en Java. Ce programme a été compilé et exécuté :

```java
class Personne {
    protected String nom;
    public Personne(String nom) { this.nom = nom; }

    public void salut() { System.out.println("Bonjour, je suis " + nom); }

    // Surcharge : même nom, paramètres différents, même classe
    public void afficher(int n)    { System.out.println("Entier : " + n); }
    public void afficher(String s) { System.out.println("Chaine : " + s); }
}

class Etudiant extends Personne {
    private String filiere;
    public Etudiant(String nom, String filiere) { super(nom); this.filiere = filiere; }

    // Redéfinition : même nom, mêmes paramètres, dans la classe fille
    @Override
    public void salut() {
        System.out.println("Salut, je suis " + nom + ", etudiant en " + filiere);
    }
}

public class TestH {
    public static void main(String[] args) {
        Personne p = new Personne("Karim");
        Etudiant e = new Etudiant("Sara", "MIACSD");
        p.salut();
        e.salut();
        e.afficher(5);
        e.afficher("cinq");
        Personne q = new Etudiant("Amine", "MIACSD");   // polymorphisme d'objets
        q.salut();
        System.out.println(e instanceof Personne);
        System.out.println(p instanceof Etudiant);
    }
}
```

```sortie
Bonjour, je suis Karim
Salut, je suis Sara, etudiant en MIACSD
Entier : 5
Chaine : cinq
Salut, je suis Amine, etudiant en MIACSD
true
false
```

Lis les deux dernières lignes : une Étudiante **est une** Personne (`true`), mais une Personne n'est pas forcément un Étudiant (`false`). L'opérateur `instanceof` teste si un objet a été créé à partir d'une classe.

> [!attention] Ce programme est un **ajout de ToumaiLearn** pour montrer les deux mécanismes en vrai. Le cours n'a donné que la syntaxe `extends` et les définitions. Les mots `super`, `protected` et `@Override` n'ont pas encore été expliqués en séance : ne t'y attarde pas pour l'instant.

## S'exercer

```exercice TD 1 · exercices 5 et 6
? Quelles sont les trois grandes catégories de relations entre classes ?
= Association, agrégation (et composition), héritage.

? Quelle est la différence entre association et agrégation ?
= **Association** : relation simple entre deux classes. **Agrégation** : une classe A fait partie de la classe B.

? Quelle est la différence entre agrégation et composition ?
= **Agrégation** : la partie peut exister sans le tout. **Composition** : c'est une agrégation forte, la partie dépend du tout.

? Donne un exemple d'association, un d'agrégation et un de composition.
= Association : un Médecin soigne un Patient. Agrégation : une Bibliothèque contient des Livres. Composition : une Voiture a un Moteur.

? Que signifie la multiplicité `1..*` ?
= Un ou plusieurs.

? Donne la syntaxe de l'héritage en Java.
= `class ClasseFille extends ClasseMere { // attributs et méthodes }`

? Quelle est la différence entre spécialisation et généralisation ?
= Spécialisation : de la classe mère vers la classe fille. Généralisation : de la classe fille vers la classe mère.

? Entre Véhicule et Voiture, laquelle est la classe mère ?
= **Véhicule** est la classe mère, **Voiture** la classe fille : une voiture « est un » véhicule.

? Quelle est la différence entre surcharge et redéfinition ?
= **Surcharge** : une méthode peut prendre plusieurs formes dans la même classe. **Redéfinition** : on change, dans la classe fille, la définition d'une méthode héritée de la classe mère.

? Que signifie la relation « est-un » ?
= Un objet de la classe dérivée est aussi un objet de la classe de base.

? Quel est l'avantage principal de l'héritage ?
= La réutilisation du code : la classe fille réutilise les méthodes et les attributs de la classe mère.
```

## Flashcards

```cartes
Les 3 types de relations entre classes :: Association, agrégation/composition, héritage.
Association :: Une classe utilise une autre sans la posséder. Lien simple et temporaire.
Agrégation :: Une classe contient une autre, mais la partie peut exister sans le tout. Losange vide.
Composition :: Agrégation forte : la partie dépend du tout. Losange plein.
Les 3 phrases tests :: « utilise un » = association, « a un » = agrégation/composition, « est un » = héritage.
Exemples du TD : association, agrégation, composition :: Médecin soigne Patient ; Bibliothèque contient Livres ; Voiture a un Moteur.
Multiplicité 1..* :: Un ou plusieurs.
Les 3 intérêts de l'héritage :: Réutilisation (reprendre), spécialisation (ajouter), redéfinition (modifier).
Syntaxe de l'héritage en Java :: class ClasseFille extends ClasseMere { ... }
Héritage multiple en Java ? :: Non : une seule classe mère par classe.
Spécialisation / généralisation :: Spécialisation : mère vers fille. Généralisation : fille vers mère.
Surcharge (overloading) :: Même nom, paramètres différents, dans la même classe.
Redéfinition (overriding) :: Même nom, mêmes paramètres, dans la classe fille, pour remplacer la version du parent.
Polymorphisme d'objets :: Un objet de la classe fille est aussi un objet de la classe mère.
Que teste instanceof ? :: Si un objet a été créé à partir d'une classe (ou d'une de ses classes filles).
```

## QCM du chapitre

```qcm
? « Un Médecin soigne un Patient » est un exemple :
+ d'association
- de composition
- d'héritage
= Le médecin utilise la relation avec le patient sans le posséder : lien simple.

? Quelle relation correspond à la phrase « est un » ?
- L'association
- L'agrégation
+ L'héritage
= « a un » correspond à l'agrégation et à la composition.

? Dans une composition :
- la partie peut exister sans le tout
+ la partie dépend du tout
- il n'y a aucun lien entre les classes
= C'est une agrégation forte, représentée par un losange plein.

? Quel symbole représente l'agrégation ?
+ Un losange vide
- Un losange plein
- Une flèche à triangle
= Le losange plein est réservé à la composition.

? « Une Bibliothèque contient des Livres » est, d'après le TD :
- une composition
+ une agrégation
- un héritage
= Les livres peuvent exister sans la bibliothèque.

? Que signifie la multiplicité `1..*` ?
- Exactement un
- Zéro ou un
+ Un ou plusieurs
= Le `*` signifie « plusieurs », le `1` fixe le minimum.

? Quel mot-clé Java exprime l'héritage ?
- inherits
+ extends
- implements
= `class ClasseFille extends ClasseMere`.

? En Java, une classe peut hériter :
+ d'une seule classe mère
- de deux classes mères au maximum
- d'autant de classes mères qu'on veut
= Il n'y a pas d'héritage multiple de classes en Java.

? Deux méthodes `afficher(int)` et `afficher(String)` dans la même classe, c'est :
- une redéfinition
+ une surcharge
- une erreur de compilation
= Même nom, paramètres différents, même classe : surcharge (overloading).

? La redéfinition (overriding) se fait :
- dans la même classe, avec des paramètres différents
+ dans la classe fille, avec le même nom et les mêmes paramètres
- uniquement dans la méthode main
= Elle remplace la version héritée du parent.

? Aller de la classe Étudiant vers la classe Personne s'appelle :
- la spécialisation
+ la généralisation
- l'instanciation
= La spécialisation va dans l'autre sens : de la mère vers la fille.

? Lequel de ces intérêts n'est PAS un intérêt de l'héritage cité dans le cours ?
- La réutilisation
- La redéfinition
+ L'accélération de la compilation
= Les trois intérêts : réutilisation, spécialisation ou enrichissement, redéfinition.
```

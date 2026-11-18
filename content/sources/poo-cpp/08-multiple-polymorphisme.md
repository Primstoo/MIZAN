---
id: multiple-polymorphisme
titre: Héritage multiple, fonctions virtuelles et classes abstraites
seance: Partie III · Héritage multiple et polymorphisme
importance: 5
---

## Avant de commencer

Il faut maîtriser l'héritage simple, en particulier la conversion `pointcol*` → `point*` (chapitre 7).

```exercice Vérifie ton prérequis
? `point *adp = &pc;` où pc est un pointcol, sans mot-clé virtual. Quelle version d'affiche est appelée par `adp->affiche()` ?
= point::affiche : le compilateur choisit d'après le type du pointeur (point*). Ce chapitre montre comment obtenir pointcol::affiche.
```

## Comment aborder ce chapitre

> [!astuce] Pose toujours deux questions : quel est le **type déclaré** (du pointeur ou de la référence) ? quel est le **type réel** de l'objet ? Sans `virtual`, c'est le type déclaré qui décide. Avec `virtual`, c'est le type réel.

> [!piege] Oublier le **destructeur virtuel**. Avec `Graphic *og = new Fenetre; delete og;`, seul ~Graphic est appelé si le destructeur n'est pas virtuel : la partie Fenetre n'est jamais détruite.

À la fin, tu sais écrire une classe à deux bases, éviter la duplication avec l'héritage virtuel, prédire l'effet de virtual, et définir une classe abstraite.

## Idée 1 · Héritage multiple

`class pointcoul : public point, public coul { ... };`. Les constructeurs des bases s'appellent **dans l'ordre de déclaration des bases**, les destructeurs dans l'ordre inverse.

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs, int ord) { cout << "++ Constr. point\n"; x = abs; y = ord; }
    ~point() { cout << "-- Destr. point\n"; }
    void affiche() { cout << "Coordonnees : " << x << " " << y << "\n"; }
};
class coul {
    short couleur;
public:
    coul(int cl) { cout << "++ Constr. coul\n"; couleur = cl; }
    ~coul() { cout << "-- Destr. coul\n"; }
    void affiche() { cout << "Couleur : " << couleur << "\n"; }
};
class pointcoul : public point, public coul {
public:
    pointcoul(int abs, int ord, int cl) : point(abs, ord), coul(cl) { cout << "++++ Constr. pointcoul\n"; }
    ~pointcoul() { cout << "---- Destr. pointcoul\n"; }
    void affiche() { point::affiche(); coul::affiche(); }
};
int main() {
    pointcoul p(3, 9, 2);
    p.affiche();
    p.coul::affiche();         // on force la version de coul
    return 0;
}
```

```sortie
++ Constr. point
++ Constr. coul
++++ Constr. pointcoul
Coordonnees : 3 9
Couleur : 2
Couleur : 2
---- Destr. pointcoul
-- Destr. coul
-- Destr. point
```

Les deux bases ont une méthode `affiche` : il faut lever l'ambiguïté avec `point::` ou `coul::`.

## Idée 2 · Le losange et l'héritage virtuel

```html
<svg viewBox="0 0 640 200" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Losange : B et C héritent de A, D hérite de B et C. Sans virtual, D contient deux copies de A ; avec virtual, une seule">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="270" y="10" width="100" height="34" rx="6" fill="none" stroke="#D9824F" stroke-width="3"/><text x="320" y="32">A (x, y)</text>
<rect x="150" y="80" width="100" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="200" y="102">B</text>
<rect x="390" y="80" width="100" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="440" y="102">C</text>
<rect x="270" y="150" width="100" height="34" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="320" y="172">D</text>
<line x1="200" y1="80" x2="290" y2="44" stroke="currentColor" stroke-width="2"/><line x1="440" y1="80" x2="350" y2="44" stroke="currentColor" stroke-width="2"/>
<line x1="290" y1="150" x2="200" y2="114" stroke="currentColor" stroke-width="2"/><line x1="350" y1="150" x2="440" y2="114" stroke="currentColor" stroke-width="2"/>
<text x="140" y="60" font-size="12" fill="#D9824F">virtual</text><text x="500" y="60" font-size="12" fill="#D9824F">virtual</text>
<text x="560" y="170" font-size="12">un seul A dans D</text>
</g></svg>
```

Sans précaution, D hérite **deux fois** de A (via B et via C) : deux x, deux y, à distinguer par `B::x` et `C::x`. Avec `class B : public virtual A` et `class C : public virtual A`, A n'est incorporée qu'**une fois**.

> [!retenir] Avec une base virtuelle, c'est la classe **la plus dérivée** (D) qui appelle le constructeur de A ; les arguments que B et C transmettraient à A sont ignorés. Sans indication, A doit avoir un constructeur **par défaut**.

```cpp
#include <iostream>
#include <string>
using namespace std;
class Personne {
protected:
    string nom;
public:
    Personne(string n = "?") : nom(n) { cout << "++ Personne " << nom << "\n"; }
    virtual ~Personne() {}
};
class Etudiant : public virtual Personne {
public:
    Etudiant(string n = "?") : Personne(n) { cout << "++ Etudiant\n"; }
};
class Employe : public virtual Personne {
public:
    Employe(string n = "?") : Personne(n) { cout << "++ Employe\n"; }
};
class EmployeEtudiant : public Employe, public Etudiant {
public:
    EmployeEtudiant(string n) : Personne(n), Employe(n), Etudiant(n) { cout << "++ EmployeEtudiant\n"; }
    void qui() { cout << "Je suis " << nom << "\n"; }   // nom non ambigu : un seul Personne
};
int main() {
    EmployeEtudiant ee("Amine");
    ee.qui();
    return 0;
}
```

```sortie
++ Personne Amine
++ Employe
++ Etudiant
++ EmployeEtudiant
Je suis Amine
```

Une seule ligne « ++ Personne » : la base virtuelle n'est construite qu'une fois, et en premier.

> [!attention] Dans l'exemple pointcolmasse des diapos, `<< abs + " " <<` additionne un entier et une chaîne (arithmétique de pointeur) : l'affichage montré « 2 5 10 20 » ne correspond pas à ce code. Il faut `<< abs << " " <<`.

## Idée 3 · Fonctions virtuelles : le polymorphisme

```cpp
#include <iostream>
using namespace std;
class Graphic {
public:
    void print() const { cout << "Graphic::print()\n"; }            // NON virtuelle
    virtual void printV() const { cout << "Graphic::printV()\n"; }  // virtuelle
    virtual ~Graphic() { cout << "fin de Graphic\n"; }
};
class Bouton : public Graphic {
public:
    void print() const { cout << "Bouton::print()\n"; }
    void printV() const { cout << "Bouton::printV()\n"; }
};
class Fenetre : public Graphic {
public:
    void print() const { cout << "Fenetre::print()\n"; }
    void printV() const { cout << "Fenetre::printV()\n"; }
    ~Fenetre() { cout << "fin de Fenetre\n"; }
};
void traitement(const Graphic &og) { og.print(); og.printV(); }
int main() {
    Bouton OK; Fenetre Window;
    traitement(OK);
    traitement(Window);
    Graphic *og = new Fenetre;
    delete og;                  // destructeur virtuel : Fenetre puis Graphic
    cout << "--- fin de main\n";
    return 0;
}
```

```sortie
Graphic::print()
Bouton::printV()
Graphic::print()
Fenetre::printV()
fin de Fenetre
fin de Graphic
--- fin de main
fin de Fenetre
fin de Graphic
fin de Graphic
```

Les trois dernières lignes viennent de la destruction automatique de Window (Fenetre puis Graphic) et de OK (Graphic seul, Bouton n'ayant pas de destructeur propre) à la fin de main.

```etapes Quelle méthode est appelée ?
Appel par objet :: `OK.print()` : le type de OK décide, virtuel ou non.
Appel par pointeur/référence, méthode non virtuelle :: le type **déclaré** décide (liaison statique, à la compilation).
Appel par pointeur/référence, méthode virtuelle :: le type **réel** de l'objet décide (liaison dynamique, à l'exécution).
Redéfinition :: une méthode virtuelle dans la base reste virtuelle dans les dérivées, même sans réécrire virtual.
```

Règles du cours : un **constructeur** ne peut pas être virtuel ; une méthode **statique** non plus ; le statut d'accès d'une méthode virtuelle est celui de la **base**.

> [!attention] Les diapos utilisent `void main()` : ce n'est pas du C++ standard, écris `int main()`. Et le commentaire « fin de Fenêtre fin de Graphic » suppose un destructeur ~Fenetre que la diapo ne montre pas : on l'a ajouté ici.

## Idée 4 · Classes abstraites

Une **fonction virtuelle pure** se déclare `virtual void affiche() = 0;`. Une classe qui en contient au moins une est **abstraite** : on ne peut pas créer d'objet de ce type, seulement des pointeurs ou références. Toute dérivée concrète doit définir les fonctions pures.

```cpp
#include <iostream>
using namespace std;
class Forme {                          // abstraite
public:
    virtual double surface() const = 0;
    virtual ~Forme() {}
};
class Rectangle : public Forme {
    double l, h;
public:
    Rectangle(double a, double b) : l(a), h(b) {}
    double surface() const { return l * h; }
};
class Cercle : public Forme {
    double r;
public:
    Cercle(double a) : r(a) {}
    double surface() const { return 3.14 * r * r; }
};
int main() {
    Forme *t[2] = { new Rectangle(3, 4), new Cercle(1) };   // Forme f; serait refusé
    for (int i = 0; i < 2; i++) cout << "surface : " << t[i]->surface() << "\n";
    for (int i = 0; i < 2; i++) delete t[i];
    return 0;
}
```

```sortie
surface : 12
surface : 3.14
```

> [!retenir] Tableau de pointeurs vers la base + méthode virtuelle = **polymorphisme** : la même boucle traite des objets de classes différentes. C'est l'exercice type du TD4 (Personne, Etudiant, Employe).

## S'exercer

```exercice Exercices du TD4
? {multiple-polymorphisme} (TD4, ex. 4.1) Donne la déclaration des quatre classes : Personne (nom, prenom, `virtual afficher()`), Etudiant et Employe (héritage virtuel, numeroApogee / numeroSomme), EmployeEtudiant.
= `class Personne { protected: string nom, prenom; public: Personne(string n="", string p=""); virtual ~Personne(); virtual void afficher() const; };`
`class Etudiant : virtual public Personne { protected: int numeroApogee; public: Etudiant(string n="", string p="", int a=0) : Personne(n,p), numeroApogee(a) {} void afficher() const; };` (Employe idem avec numeroSomme.)
`class EmployeEtudiant : public Employe, public Etudiant { public: EmployeEtudiant(string n, string p, int s, int a) : Personne(n,p), Employe(n,p,s), Etudiant(n,p,a) {} void afficher() const; };`
Dans main : `Personne *tab[3] = { new Etudiant(...), new Employe(...), new EmployeEtudiant(...) };` puis `tab[i]->afficher();` et `delete tab[i];`.

? {multiple-polymorphisme} Pourquoi faut-il `: Personne(n,p)` dans le constructeur de EmployeEtudiant ?
= Personne est une base virtuelle : c'est la classe la plus dérivée qui la construit. Sans cela, le constructeur par défaut de Personne serait appelé et nom/prénom resteraient vides.

? {multiple-polymorphisme} `class X { virtual void affiche() = 0; };` puis `X a;` dans main. Que se passe-t-il ?
= Erreur de compilation : X est abstraite (fonction virtuelle pure), on ne peut pas l'instancier. On peut seulement déclarer `X *p;` ou `X &r = ...;` vers une dérivée concrète.
```

## Flashcards

```cartes
Syntaxe de l'héritage multiple :: `class pointcoul : public point, public coul { ... };`
Ordre des constructeurs en héritage multiple :: Ordre de déclaration des bases, puis la classe dérivée.
Problème du losange :: D hérite deux fois de A via B et C : membres de A en double.
Solution au losange :: `class B : public virtual A` et `class C : public virtual A`.
Qui construit une base virtuelle ? :: La classe la plus dérivée.
Effet de virtual :: L'appel via pointeur/référence choisit la méthode du type réel de l'objet.
Pourquoi un destructeur virtuel ? :: Pour que `delete` sur un pointeur de base appelle aussi le destructeur de la dérivée.
Fonction virtuelle pure :: `virtual void f() = 0;` ; rend la classe abstraite.
Peut-on déclarer un constructeur virtuel ? :: Non (ni une méthode statique).
```

## QCM du chapitre

```qcm
? Pour `class D : public B, public C`, quel constructeur s'exécute en premier ?
+ Celui de B
- Celui de C
- Celui de D
= Les bases sont construites dans l'ordre de déclaration.

? Sans héritage virtuel, dans le losange A → B, C → D, combien de copies de A contient D ?
- 1
+ 2
- 0
= Une via B, une via C.

? Où écrit-on virtual pour éviter la duplication de A ?
- Dans la déclaration de D
+ Dans les déclarations de B et de C
- Dans la classe A
= `class B : public virtual A` et `class C : public virtual A`.

? Sans virtual, `Graphic &og = OK; og.print();` (OK est un Bouton) appelle :
+ Graphic::print
- Bouton::print
- Une erreur
= Liaison statique : type déclaré.

? Avec `virtual void print() const` dans Graphic, le même appel donne :
- Graphic::print
+ Bouton::print
- Les deux
= Liaison dynamique : type réel.

? `Graphic *og = new Fenetre; delete og;` sans destructeur virtuel :
- Appelle ~Fenetre puis ~Graphic
+ N'appelle que ~Graphic
- Ne compile pas
= Il faut un destructeur virtuel dans la base.

? Lequel ne peut pas être virtuel ?
+ Un constructeur
- Un destructeur
- Une méthode const
= Le cours le précise ; une méthode statique non plus.

? Une classe est abstraite si :
- Elle n'a que des méthodes virtuelles
+ Elle contient au moins une fonction virtuelle pure
- Elle n'a pas de constructeur
= Une seule `= 0` suffit.

? Avec `class X { public: virtual void f() = 0; };`, laquelle est correcte ?
- `X a;`
+ `X *p;`
- `X t[3];`
= On ne peut pas instancier X, mais on peut déclarer des pointeurs.

? Une méthode déclarée virtual dans la base et redéfinie sans le mot virtual dans la dérivée :
+ Reste virtuelle
- Devient non virtuelle
- Provoque une erreur
= Le caractère virtuel se transmet.
```

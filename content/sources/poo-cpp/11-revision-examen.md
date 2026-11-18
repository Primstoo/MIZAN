---
id: revision-examen
titre: Révision et examen blanc
seance: Préparation de l'examen
importance: 5
---

> [!attention] Aucune annale de POO en C++ n'a été fournie (les fichiers « Exam 2223 » et « Exam 2324 » du dossier sont des examens d'analyse numérique). Cet examen blanc est **construit à partir des TD et du cours** : même style d'exercices (« quels résultats fournira ce programme ? », « écrire la classe… »), mais le format réel de l'examen est à confirmer auprès du prof.

## La carte du module

```flux Ce qui s'enchaîne
C → C++ (références, surdéfinition, new/delete) -> classes (constructeur, static, this) -> recopie et opérateurs (=, [], +) -> héritage (protected, constructeurs) -> virtual et classes abstraites -> patrons et exceptions
```

```grille Les 8 réflexes de l'examen
#cols: Si tu vois… | …pense à
un pointeur membre + new | destructeur, constructeur de recopie, operator=
un objet passé par valeur | appel du constructeur de recopie + destruction de la copie
`6 + p` | operator+ ami (pas membre)
`a[i] = ...` | operator[] qui renvoie une référence
un pointeur de base vers un objet dérivé | virtual ? sinon méthode de la base
un losange d'héritage | dérivation virtuelle + constructeur appelé par la plus dérivée
delete via pointeur de base | destructeur virtuel
`throw` | catch du bon type, puis suite après le dernier catch
```

```etapes Méthode pour « quels résultats fournira ce programme ? »
1. Repère chaque création d'objet :: déclarations, temporaires (conversions, `point(12)`), passages par valeur, new.
2. Écris la trace des constructeurs :: base avant dérivée, membres avant englobant, bases dans l'ordre de déclaration.
3. Suis les appels :: pour chaque appel via pointeur/référence, regarde si la méthode est virtuelle.
4. Ferme les blocs :: à chaque `}`, détruis les objets automatiques dans l'ordre inverse de création.
5. Vérifie les cas pièges :: char affiché comme caractère, postfixé qui renvoie l'ancienne valeur, auto-affectation.
```

> [!prof] Les TD du Pr Farchane posent systématiquement des questions de **trace** (TD2 : « quels résultats fournira le programme »), des **variantes** d'une même déclaration (ami/membre, `point&`/`const point&`) et l'écriture d'une **hiérarchie complète** (TD3, TD4). Entraîne-toi sur ces trois formats.

## Examen blanc · 1 h 30

### Exercice 1 · Questions de cours (4 points)

```exercice Exercice 1
? {revision-examen} 1) Différence entre surdéfinition et redéfinition ? 2) Trois situations où le constructeur de recopie est appelé ? 3) Qu'est-ce qu'une classe abstraite ? 4) Pourquoi un destructeur virtuel ?
= 1) Surdéfinition : même nom, signatures différentes (même portée). Redéfinition : même signature dans une classe dérivée, pour remplacer la méthode de la base.
2) Initialisation d'un objet par un autre (`point b = a;`), passage par valeur, retour par valeur.
3) Une classe qui contient au moins une fonction virtuelle pure (`= 0`) ; on ne peut pas l'instancier.
4) Pour que `delete p` (p pointeur sur la base, objet dérivé) appelle aussi le destructeur de la dérivée.
```

### Exercice 2 · Trace d'exécution (5 points)

Quels résultats fournit ce programme ?

```cpp
#include <iostream>
using namespace std;
class A {
public:
    A()  { cout << "+A "; }
    virtual void f() { cout << "A::f "; }
    void g() { cout << "A::g "; }
    virtual ~A() { cout << "-A "; }
};
class B : public A {
public:
    B()  { cout << "+B "; }
    void f() { cout << "B::f "; }
    void g() { cout << "B::g "; }
    ~B() { cout << "-B "; }
};
void h(A a) { a.f(); }
int main() {
    A *p = new B;
    cout << "\n";
    p->f(); p->g();
    cout << "\n";
    h(*p);
    cout << "\n";
    delete p;
    cout << "\n";
    return 0;
}
```

```sortie
+A +B 
B::f A::g 
A::f -A 
-B -A 
```

```exercice Corrigé de l'exercice 2
? {revision-examen} Explique chaque ligne de la trace ci-dessus.
= Ligne 1 : `new B` construit A puis B : « +A +B ».
Ligne 2 : f est virtuelle, l'objet réel est un B : « B::f ». g ne l'est pas, le pointeur est un A* : « A::g ».
Ligne 3 : h reçoit **par valeur** un A : la copie ne garde que la partie A (le constructeur de recopie par défaut n'affiche rien), donc « A::f » ; la copie est détruite en sortie : « -A ».
Ligne 4 : destructeur virtuel : « -B -A ».
```

### Exercice 3 · Une classe avec un tableau dynamique (6 points)

```exercice Exercice 3
? {revision-examen} Écris une classe `pile` d'entiers : constructeur `pile(int n = 20)` qui alloue un tableau de n entiers, destructeur, constructeur de recopie, `operator=`, `void empiler(int)`, `int depiler()`, `bool vide() const`. Empiler sur une pile pleine ou dépiler une pile vide lance une exception `out_of_range`.
indice: Membres : int *t ; int taille ; int sommet. Recopie profonde dans le constructeur de recopie et dans operator=.
= Voir le programme corrigé ci-dessous : il teste la recopie, l'affectation et l'exception.
```

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;
class pile {
    int *t; int taille; int sommet;
public:
    pile(int n = 20) : taille(n), sommet(0) { t = new int[taille]; }
    ~pile() { delete[] t; }
    pile(const pile &p) : taille(p.taille), sommet(p.sommet) {
        t = new int[taille];
        for (int i = 0; i < sommet; i++) t[i] = p.t[i];
    }
    pile &operator=(const pile &p) {
        if (this != &p) {
            delete[] t;
            taille = p.taille; sommet = p.sommet;
            t = new int[taille];
            for (int i = 0; i < sommet; i++) t[i] = p.t[i];
        }
        return *this;
    }
    void empiler(int x) { if (sommet == taille) throw out_of_range("pile pleine"); t[sommet++] = x; }
    int depiler() { if (vide()) throw out_of_range("pile vide"); return t[--sommet]; }
    bool vide() const { return sommet == 0; }
};
int main() {
    pile a(3);
    a.empiler(1); a.empiler(2);
    pile b = a;            // recopie
    b.empiler(30);
    pile c; c = b;         // affectation
    while (!c.vide()) cout << c.depiler() << " ";
    cout << "| a : " << a.depiler() << "\n";
    try { b.empiler(4); }
    catch (out_of_range &e) { cout << "erreur : " << e.what() << "\n"; }
    return 0;
}
```

```sortie
30 2 1 | a : 2
erreur : pile pleine
```

### Exercice 4 · Hiérarchie et polymorphisme (5 points)

```exercice Exercice 4
? {revision-examen} Écris une classe abstraite `Employe` (nom, `virtual double salaire() const = 0`, `afficher()` qui affiche le nom et le salaire) et deux dérivées : `Permanent` (salaire fixe) et `Vacataire` (nombre d'heures × taux horaire). Dans main, range un Permanent (« Amal », 8000 DH) et un Vacataire (« Karim », 40 h à 150 DH) dans un tableau `Employe*` et affiche-les.
indice: afficher() peut rester non virtuelle : elle appelle salaire(), qui l'est.
= Voir le programme corrigé ci-dessous.
```

```cpp
#include <iostream>
#include <string>
using namespace std;
class Employe {
protected:
    string nom;
public:
    Employe(string n) : nom(n) {}
    virtual ~Employe() {}
    virtual double salaire() const = 0;            // virtuelle pure : classe abstraite
    void afficher() const { cout << nom << " : " << salaire() << " DH\n"; }
};
class Permanent : public Employe {
    double fixe;
public:
    Permanent(string n, double f) : Employe(n), fixe(f) {}
    double salaire() const { return fixe; }
};
class Vacataire : public Employe {
    int heures; double taux;
public:
    Vacataire(string n, int h, double t) : Employe(n), heures(h), taux(t) {}
    double salaire() const { return heures * taux; }
};
int main() {
    Employe *tab[2] = { new Permanent("Amal", 8000), new Vacataire("Karim", 40, 150) };
    for (int i = 0; i < 2; i++) tab[i]->afficher();
    for (int i = 0; i < 2; i++) delete tab[i];
    return 0;
}
```

```sortie
Amal : 8000 DH
Karim : 6000 DH
```

## Flashcards de révision

```cartes
Les 3 fonctions à écrire pour une classe à pointeur :: Destructeur, constructeur de recopie, operator=.
Objet dérivé passé par valeur comme base :: Il est « tranché » : seule la partie base est copiée.
Méthode non virtuelle via A* sur un B :: Version de A.
Ordre complet pour `D d;` (D : B1, B2 ; membre m) :: B1, B2, membre m, corps de D ; destruction inverse.
`throw` dans un try :: Saut au catch du type ; destructeurs des objets du try appelés avant.
Préfixé ou postfixé : lequel a un int fictif ? :: Le postfixé : `T operator++(int)`.
```

## QCM de révision

```qcm
? Dans `A *p = new B;` (B dérive de A), `p->g()` avec g non virtuelle appelle :
+ A::g
- B::g
- Une erreur
= Liaison statique.

? Un objet B passé par valeur à `void h(A a)` :
- Reste un B dans h
+ Est copié en un A (seule la partie A est conservée)
- Provoque une erreur de compilation
= C'est le « tranchage » de l'objet.

? Pour une classe contenant `int *t` alloué par new[], laquelle n'est PAS indispensable ?
- Le destructeur
- Le constructeur de recopie
+ Une fonction amie
= Destructeur, recopie et = gèrent la zone dynamique.

? Quel mot-clé interdit les conversions implicites par un constructeur ?
- const
+ explicit
- static
= explicit point(int);

? Quelle déclaration rend une classe abstraite ?
- `virtual void f();`
+ `virtual void f() = 0;`
- `static void f();`
= Une fonction virtuelle pure.

? Ordre de destruction de `pointcoul p` (bases point puis coul) :
+ pointcoul, coul, point
- point, coul, pointcoul
- coul, point, pointcoul
= Ordre inverse de la construction.

? Quelle surdéfinition permet `cout << v[i]` sur un `const vecteur3d v` ?
- `float & operator[](int);`
+ `float operator[](int) const;`
- `float operator[](int);`
= Sur un objet constant, seule une méthode const est appelable.

? Quelle instruction appelle l'opérateur = ?
- `point b = a;`
+ `b = a;` avec b déjà déclaré
- `point b(a);`
= Les deux autres sont des initialisations (recopie).

? `template <class T> class pile` : comment déclarer une pile d'entiers ?
+ `pile<int> p;`
- `pile p<int>;`
- `template pile<int> p;`
= Le type se précise entre chevrons après le nom.

? Exception lancée, aucun catch du bon type :
- Le programme continue après le try
+ La fonction terminate est appelée
- L'exception est ignorée
= Le programme s'arrête.
```

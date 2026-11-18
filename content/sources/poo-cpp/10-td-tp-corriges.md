---
id: td-tp-corriges
titre: TD et TP corrigés
seance: TD1 à TD4 et TP1 · A.U. 2025-2026
importance: 4
---

Les énoncés viennent des fiches de TD et de TP du Pr Farchane. Les corrigés ci-dessous sont **réécrits et testés** (g++, C++17) ; ils suivent la démarche des corrections du prof.

> [!astuce] Essaie d'abord seul chaque exercice (15 minutes au plus), puis compare. Les petits exercices du TD1 sont corrigés dans les chapitres 1 à 3.

## Où trouver chaque exercice

```grille Plan des TD et TP
#cols: Fiche | Thème | Corrigé
TD1 ex. 1.1 à 1.6 | du C au C++, références, new/delete | chapitres 1 et 2
TD1 ex. 1.7, 1.8 | classe point, compteur statique | chapitre 3 et ci-dessous
TD2 ex. 2.1 | opérateur + ami ou membre, conversions | ci-dessous
TD3 ex. 1 | héritage : pointcol | ci-dessous
TD4 ex. 4.1 | héritage multiple virtuel, polymorphisme | ci-dessous
TP1 | classe vecteur3d complète | ci-dessous
```

## TD1 · Exercices 1.7 et 1.8 : la classe point

On réunit les deux exercices : coordonnées float privées, accesseurs, distance à l'origine, et un compteur d'objets.

```cpp
#include <iostream>
#include <cmath>
using namespace std;
// --- point.h (déclaration) ---
class point {
    float x, y;
    static int nb;                    // ex. 1.8 : nombre d'objets existants
public:
    point(float, float);
    ~point();
    void deplace(float, float);
    void affiche();
    float distance();
    float abscisse() { return x; }
    float ordonnee() { return y; }
};
// --- point.cpp (définition) ---
int point::nb = 0;
point::point(float a, float b) { x = a; y = b; nb++; }
point::~point() { nb--; }
void point::deplace(float dx, float dy) { x += dx; y += dy; }
void point::affiche() { cout << "point (" << x << ", " << y << ") ; il y a " << nb << " point(s)\n"; }
float point::distance() { return sqrt(x * x + y * y); }
// --- programme d'essai ---
int main() {
    point a(3, 4);
    a.affiche();
    cout << "distance a l'origine : " << a.distance() << "\n";
    a.deplace(1, -1);
    point b(0, 0);
    a.affiche();
    cout << "abscisse : " << a.abscisse() << ", ordonnee : " << a.ordonnee() << "\n";
    return 0;
}
```

```sortie
point (3, 4) ; il y a 1 point(s)
distance a l'origine : 5
point (4, 3) ; il y a 2 point(s)
abscisse : 4, ordonnee : 3
```

## TD2 · Exercice 2.1 : opérateur + et conversions

Énoncé : `point(int abs=0, int ord=0)` affiche « construction point », `friend point operator+(point, point)`. Que donnent `a = b + 6;` puis `a = 6 + b;` ?

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; cout << "construction point : " << x << " " << y << "\n"; }
    friend point operator+(point, point);
    void affiche() { cout << "Coordonnees : " << x << " " << y << "\n"; }
};
point operator+(point a, point b) { point r; r.x = a.x + b.x; r.y = a.y + b.y; return r; }
int main() {
    point a, b(2, 4);
    a = b + 6;    // affectation 1
    a.affiche();
    a = 6 + b;    // affectation 2
    b.affiche();
    return 0;
}
```

```sortie
construction point : 0 0
construction point : 2 4
construction point : 6 0
construction point : 0 0
Coordonnees : 8 4
construction point : 6 0
construction point : 0 0
Coordonnees : 2 4
```

```etapes Lire cette trace
a et b :: « 0 0 » puis « 2 4 ».
b + 6 :: 6 est converti en point(6, 0) (« 6 0 »), puis operator+ crée r (« 0 0 »). a vaut (8, 4).
6 + b :: même chose dans l'autre sens : « 6 0 » puis « 0 0 ».
Dernière ligne :: on affiche **b**, resté (2, 4).
```

```grille Les quatre variantes de l'énoncé
#cols: Déclaration de + | b + 6 | 6 + b
friend point operator+(point, point) | oui | oui
membre point operator+(point) | oui | *non
friend point operator+(point &, point &) | *non | *non
friend point operator+(const point &, const point &) | oui | oui
```

Avec un membre, `6 + b` voudrait dire `6.operator+(b)` : impossible. Avec `point &`, le point temporaire issu de 6 ne peut pas se lier à une référence non constante. Avec `const point &`, si.

## TD3 · Exercice 1 : la classe pointcol

```cpp
#include <iostream>
using namespace std;
class point {
    float x, y;
public:
    point(float abs = 0.0, float ord = 0.0) { x = abs; y = ord; }
    void affiche() { cout << "Coordonnees : " << x << " " << y << "\n"; }
    void deplace(float dx, float dy) { x = x + dx; y = y + dy; }
};
class pointcol : public point {
    int cl;
public:
    pointcol(float = 0.0, float = 0.0, int = 0);      // non en ligne
    void affiche();                                    // redéfinie
    void colore(int couleur) { cl = couleur; }
};
pointcol::pointcol(float abs, float ord, int couleur) : point(abs, ord) { cl = couleur; }
void pointcol::affiche() { point::affiche(); cout << "  couleur : " << cl << "\n"; }
int main() {
    pointcol p(2.5, 3.25, 5);
    p.affiche();
    p.deplace(1, 1);
    p.colore(9);
    p.affiche();
    pointcol q;          // valeurs par défaut : 0 0, couleur 0
    q.affiche();
    return 0;
}
```

```sortie
Coordonnees : 2.5 3.25
  couleur : 5
Coordonnees : 3.5 4.25
  couleur : 9
Coordonnees : 0 0
  couleur : 0
```

> [!prof] La correction du TD3 trace aussi les appels (« constructeur de point »…) pour montrer que le constructeur de la base passe **avant** celui de la dérivée. Ajoute des cout dans les constructeurs pour le vérifier toi-même.

## TD4 · Exercice 4.1 : Personne, Etudiant, Employe, EmployeEtudiant

```cpp
#include <iostream>
#include <string>
using namespace std;
class Personne {
protected:
    string nom, prenom;
public:
    Personne(string n = "", string p = "") : nom(n), prenom(p) {}
    virtual ~Personne() {}
    virtual void afficher() const { cout << "Personne : " << nom << " " << prenom << "\n"; }
};
class Etudiant : virtual public Personne {
protected:
    int numeroApogee;
public:
    Etudiant(string n = "", string p = "", int a = 0) : Personne(n, p), numeroApogee(a) {}
    void afficher() const { cout << "Etudiant : " << nom << " " << prenom << ", Apogee " << numeroApogee << "\n"; }
};
class Employe : virtual public Personne {
protected:
    int numeroSomme;
public:
    Employe(string n = "", string p = "", int s = 0) : Personne(n, p), numeroSomme(s) {}
    void afficher() const { cout << "Employe : " << nom << " " << prenom << ", Somme " << numeroSomme << "\n"; }
};
class EmployeEtudiant : public Employe, public Etudiant {
public:
    EmployeEtudiant(string n, string p, int s, int a) : Personne(n, p), Employe(n, p, s), Etudiant(n, p, a) {}
    void afficher() const {
        cout << "Employe-etudiant : " << nom << " " << prenom
             << ", Somme " << numeroSomme << ", Apogee " << numeroApogee << "\n";
    }
};
int main() {
    Personne *tab[4] = {
        new Personne("Alaoui", "Sara"),
        new Etudiant("Bennani", "Omar", 21004567),
        new Employe("Idrissi", "Nadia", 1234),
        new EmployeEtudiant("Tazi", "Youssef", 5678, 22001122)
    };
    for (int i = 0; i < 4; i++) tab[i]->afficher();    // polymorphisme
    for (int i = 0; i < 4; i++) delete tab[i];          // destructeur virtuel
    return 0;
}
```

```sortie
Personne : Alaoui Sara
Etudiant : Bennani Omar, Apogee 21004567
Employe : Idrissi Nadia, Somme 1234
Employe-etudiant : Tazi Youssef, Somme 5678, Apogee 22001122
```

> [!retenir] Trois points font gagner les points de cet exercice : `virtual public Personne` dans **Etudiant et Employe** ; `Personne(n, p)` appelé **par EmployeEtudiant** ; destructeur **virtuel** dans Personne, puisqu'on détruit via des `Personne*`.

## TP1 · La classe vecteur3d

Énoncé : constructeurs (surdéfinis puis un seul), affichage `< x, y, z >`, `coincide` amie (par adresse puis par référence), `normax` (par valeur, référence, adresse), `==` et `!=`, `+` et `*` (produit scalaire) en membres, puis un main avec un vecteur automatique et un dynamique.

```cpp
#include <iostream>
#include <cmath>
using namespace std;
class vecteur3d {
    float x, y, z;
public:
    // I.b : un seul constructeur grâce aux valeurs par défaut
    // (I.a serait : vecteur3d() { x = y = z = 0; } et vecteur3d(float, float, float);)
    vecteur3d(float c1 = 0, float c2 = 0, float c3 = 0) { x = c1; y = c2; z = c3; }
    void affiche() const { cout << "< " << x << ", " << y << ", " << z << " >\n"; }     // II
    friend bool coincide(const vecteur3d *, const vecteur3d *);                          // III.a
    friend bool coincide(const vecteur3d &, const vecteur3d &);                          // III.b
    float norme() const { return sqrt(x * x + y * y + z * z); }
    vecteur3d normax(vecteur3d v) const { return norme() > v.norme() ? *this : v; }     // IV.a
    vecteur3d &normax(vecteur3d &v) { return norme() > v.norme() ? *this : v; }         // IV.b
    vecteur3d *normax(vecteur3d *v) { return norme() > v->norme() ? this : v; }         // IV.c
    bool operator==(const vecteur3d &v) const { return x == v.x && y == v.y && z == v.z; } // V.a
    bool operator!=(const vecteur3d &v) const { return !(*this == v); }
    vecteur3d operator+(const vecteur3d &v) const { return vecteur3d(x + v.x, y + v.y, z + v.z); } // VI
    float operator*(const vecteur3d &v) const { return x * v.x + y * v.y + z * v.z; }
};
bool coincide(const vecteur3d *a, const vecteur3d *b) { return a->x == b->x && a->y == b->y && a->z == b->z; }
bool coincide(const vecteur3d &a, const vecteur3d &b) { return a.x == b.x && a.y == b.y && a.z == b.z; }
int main() {                                     // VII
    vecteur3d a(1, 2, 3);                        // automatique
    vecteur3d *b = new vecteur3d(4, 0, 0);       // dynamique
    a.affiche(); b->affiche();
    cout << "coincide (adresse)   : " << coincide(&a, b) << "\n";
    cout << "coincide (reference) : " << coincide(a, a) << "\n";
    cout << "normax par reference : "; a.normax(*b).affiche();
    cout << "normax par adresse   : "; a.normax(b)->affiche();
    cout << "a + b : "; (a + *b).affiche();
    cout << "a * b = " << a * *b << "\n";
    cout << "a == b : " << (a == *b) << ", a != b : " << (a != *b) << "\n";
    delete b;
    return 0;
}
```

```sortie
< 1, 2, 3 >
< 4, 0, 0 >
coincide (adresse)   : 0
coincide (reference) : 1
normax par reference : < 4, 0, 0 >
normax par adresse   : < 4, 0, 0 >
a + b : < 5, 2, 3 >
a * b = 4
a == b : 0, a != b : 1
```

> [!piege] Pour normax par valeur et par référence, les deux versions ont presque la même signature : l'appel `a.normax(*b)` choisit la version par **référence** (correspondance exacte avec un objet modifiable). Si tu gardes les trois dans la même classe, donne des noms différents à l'examen pour éviter tout doute (`normaxV`, `normaxR`, `normaxA`).

> [!attention] L'énoncé du TP dit « tester la coïncidence de deux **points** » à la question V : il s'agit bien de deux **vecteurs**.

## S'exercer

```exercice Vérifie que tu as compris les corrigés
? {td-tp-corriges} Dans le TD2, combien de lignes « construction point » affiche `a = b + 6;` seule ?
reponse: 2
= Une pour la conversion de 6 en point(6, 0), une pour l'objet r créé dans operator+. Le retour par valeur est ici optimisé (pas de recopie affichée, et il n'y a d'ailleurs pas de constructeur de recopie qui affiche).

? {td-tp-corriges} Dans le TD4, que se passe-t-il si on enlève `virtual` devant `afficher()` dans Personne ?
= Les quatre appels `tab[i]->afficher()` exécutent Personne::afficher : quatre lignes « Personne : nom prénom », sans numéros.

? {td-tp-corriges} Dans le TD4, que se passe-t-il si on enlève `Personne(n, p)` de la liste d'initialisation d'EmployeEtudiant ?
= La base virtuelle Personne est construite avec son constructeur par défaut : nom et prénom vides pour l'employé-étudiant, même si Employe et Etudiant transmettent n et p.
```

## QCM du chapitre

```qcm
? Dans le TD1 (ex. 1.8), pourquoi décrémenter le compteur dans le destructeur ?
+ Pour compter les objets existants, et pas seulement ceux créés
- Parce que static l'impose
- Pour libérer la mémoire du compteur
= Sans nb-- dans le destructeur, le compteur ne ferait qu'augmenter.

? TD2 : avec `friend point operator+(point, point)`, `a = 6 + b;` :
+ Compile : 6 est converti en point(6, 0)
- Est refusé
- Additionne 6 à x et à y
= L'amie accepte une conversion sur ses deux arguments.

? TD2 : avec `+` en fonction membre, quelle affectation est refusée ?
- `a = b + 6;`
+ `a = 6 + b;`
- `a = a + b;`
= Le premier opérande d'une méthode doit être un objet.

? TD2 : avec `friend point operator+(point &, point &)`, `a = b + 6;` :
- Compile
+ Est refusé à la compilation
- Plante à l'exécution
= Un temporaire ne se lie pas à une référence non constante.

? TD3 : comment le constructeur de pointcol transmet-il les coordonnées ?
+ `pointcol::pointcol(float a, float o, int c) : point(a, o) { cl = c; }`
- `pointcol::pointcol(float a, float o, int c) { point(a, o); cl = c; }`
- `pointcol::pointcol(float a, float o, int c) : x(a), y(o) { cl = c; }`
= La base se construit dans la liste d'initialisation ; x et y sont privés de point.

? TD4 : où place-t-on le mot virtual pour n'avoir qu'une Personne dans EmployeEtudiant ?
- Devant la classe EmployeEtudiant
+ Dans la dérivation d'Etudiant et d'Employe
- Devant le constructeur de Personne
= `class Etudiant : virtual public Personne`, idem pour Employe.

? TD4 : pourquoi Personne a-t-elle un destructeur virtuel ?
- Pour pouvoir l'appeler explicitement
+ Parce qu'on détruit des objets dérivés via des Personne*
- Parce que la classe est abstraite
= Sinon delete tab[i] n'appellerait que ~Personne.

? TP1 : quel prototype permet l'affichage `< 1, 2, 3 >` sans modifier l'objet ?
+ `void affiche() const;`
- `void affiche(vecteur3d);`
- `vecteur3d affiche();`
= Une méthode const, utilisable même sur un vecteur constant.

? TP1 : normax « par adresse » a pour prototype :
- `vecteur3d normax(vecteur3d);`
- `vecteur3d & normax(vecteur3d &);`
+ `vecteur3d * normax(vecteur3d *);`
= L'argument et le résultat sont des pointeurs ; on renvoie this ou v.

? TP1 : le produit scalaire de (1,2,3) et (4,0,0) vaut :
- 0
+ 4
- 7
= 1×4 + 2×0 + 3×0 = 4.
```

## Flashcards

```cartes
TD2 : + ami avec (point, point) :: b + 6 et 6 + b acceptés (6 converti en point).
TD2 : + membre :: b + 6 accepté, 6 + b refusé.
TD2 : + ami avec (point&, point&) :: Les deux refusés : un temporaire ne se lie pas à point&.
TD3 : constructeur de pointcol :: `: point(abs, ord)` dans la liste d'initialisation.
TD4 : trois points clés :: virtual public Personne ; Personne(n,p) dans la plus dérivée ; destructeur virtuel.
TP1 : un seul constructeur pour 0 ou 3 composantes :: `vecteur3d(float c1=0, float c2=0, float c3=0)`.
```

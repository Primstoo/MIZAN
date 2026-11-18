---
id: amies-operateurs
titre: Fonctions amies et surdéfinition d'opérateurs
seance: Partie II · Fonctions amies, surcharge des opérateurs
importance: 5
---

## Avant de commencer

Tu dois connaître public/private et le passage par référence (chapitres 2 et 3).

```exercice Vérifie ton prérequis
? Une fonction indépendante `int coincide(point p, point q)` peut-elle lire `p.x` si x est privé ?
reponse: non
= Non : un membre privé n'est accessible qu'aux fonctions membres de la classe… sauf si la classe déclare la fonction **amie**. C'est l'objet de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] Un opérateur, c'est **une fonction avec un nom spécial** : `a + b` est traduit en `operator+(a, b)` (fonction amie) ou en `a.operator+(b)` (fonction membre). Une fois ce réflexe acquis, tout le chapitre se lit facilement.

> [!piege] En fonction membre, l'opérateur binaire n'a **qu'un** argument explicite : le premier opérande est l'objet lui-même (`this`). Écrire `vecteur3d operator+(vecteur3d, vecteur3d)` comme membre est une erreur.

À la fin, tu sais déclarer une amie dans les quatre situations du cours, surdéfinir +, ==, [], ++ et =, et choisir entre membre et amie.

## Idée 1 · Les fonctions amies

Une classe peut autoriser une fonction extérieure à lire ses membres privés avec `friend`. Quatre situations :

```grille Situations d'amitié
#cols: Situation | Déclaration dans la classe A
Fonction indépendante amie | friend int coincide(point, point);
Membre de B amie de A | friend int B::fct(A);
Amie de plusieurs classes | friend void fct(A, B); dans A et dans B
Toute la classe B amie | friend class B;
```

```cpp
#include <iostream>
using namespace std;
class matrice;                         // annonce, pour compiler vect
class vect {
    double v[3];
public:
    vect(double v1 = 0, double v2 = 0, double v3 = 0) { v[0] = v1; v[1] = v2; v[2] = v3; }
    friend vect prod(matrice, vect);   // amie de vect
    void affiche() { for (int i = 0; i < 3; i++) cout << v[i] << " "; cout << "\n"; }
};
class matrice {
    double mat[3][3];
public:
    matrice(double t[3][3]) { for (int i = 0; i < 3; i++) for (int j = 0; j < 3; j++) mat[i][j] = t[i][j]; }
    friend vect prod(matrice, vect);   // amie de matrice aussi
};
vect prod(matrice m, vect x) {
    vect res;
    for (int i = 0; i < 3; i++) {
        double som = 0;
        for (int j = 0; j < 3; j++) som += m.mat[i][j] * x.v[j];
        res.v[i] = som;
    }
    return res;
}
int main() {
    vect w(1, 2, 3);
    double tb[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    matrice a = tb;
    prod(a, w).affiche();
    return 0;
}
```

```sortie
14 32 50 
```

Vérification de la première ligne : 1×1 + 2×2 + 3×3 = 14.

> [!attention] L'affichage des diapos contient `" «` (guillemet typographique) : il faut des guillemets droits `" "` pour compiler.

## Idée 2 · Surdéfinir un opérateur : amie ou membre

```html
<svg viewBox="0 0 640 130" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="a plus b se traduit en operator+(a,b) pour une fonction amie, ou en a.operator+(b) pour une fonction membre">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="250" y="45" width="140" height="40" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="320" y="70" font-weight="700">a + b</text>
<line x1="250" y1="65" x2="170" y2="65" stroke="currentColor" stroke-width="2"/><line x1="390" y1="65" x2="470" y2="65" stroke="currentColor" stroke-width="2"/>
<text x="95" y="60">operator+(a, b)</text><text x="95" y="82" font-size="12">amie : 2 arguments</text>
<text x="550" y="60">a.operator+(b)</text><text x="550" y="82" font-size="12">membre : 1 argument</text>
</g></svg>
```

```cpp
#include <iostream>
using namespace std;
class vecteur3d {
    float x, y, z;
public:
    vecteur3d(float a = 0, float b = 0, float c = 0) { x = a; y = b; z = c; }
    friend vecteur3d operator+(vecteur3d, vecteur3d);       // version amie
    float operator*(const vecteur3d &v) const {              // version membre : produit scalaire
        return x * v.x + y * v.y + z * v.z;
    }
    bool operator==(const vecteur3d &v) const { return x == v.x && y == v.y && z == v.z; }
    bool operator!=(const vecteur3d &v) const { return !(*this == v); }
    void affiche() { cout << "coordonnees : " << x << " " << y << " " << z << "\n"; }
};
vecteur3d operator+(vecteur3d a, vecteur3d b) {
    vecteur3d p;
    p.x = a.x + b.x; p.y = a.y + b.y; p.z = a.z + b.z;
    return p;
}
int main() {
    vecteur3d a(1, 2, 3), b(2, 5, 8), c;
    c = a + b;  c.affiche();
    cout << "a*b = " << a * b << "\n";
    cout << "a==b : " << (a == b) << "  a!=b : " << (a != b) << "\n";
    return 0;
}
```

```sortie
coordonnees : 3 7 11
a*b = 36
a==b : 0  a!=b : 1
```

> [!attention] Dans les diapos, `<<z"\n"` oublie un `<<` (il faut `<< z << "\n"`), et `Vecteur3d` avec une majuscule ne correspond pas à la classe `vecteur3d` : C++ distingue majuscules et minuscules.

```etapes Membre ou amie ?
Premier opérande d'un type de base ? :: `3 * v` ou `6 + p` avec 6 converti : il faut une **amie** (une méthode reçoit forcément un objet de sa classe en premier).
Opérateur imposé membre ? :: `=`, `[]`, `()`, `->` et les cast doivent être des **membres**.
Sinon :: libre choix. Une amie traite les deux opérandes de façon symétrique.
```

## Idée 3 · ++ préfixé et postfixé, [] et const

- `T operator++()` : notation **préfixée** `++a` (incrémente puis renvoie).
- `T operator++(int)` : notation **postfixée** `a++` ; l'`int` est un argument fictif qui sert juste à distinguer.

```cpp
#include <iostream>
using namespace std;
class point {
public:
    int x, y;
    point(int abs = 0, int ord = 0) { x = abs; y = ord; }
    point operator++()    { x++; y++; return *this; }          // préfixé
    point operator++(int) { point p = *this; x++; y++; return p; } // postfixé
    void affiche() { cout << x << " " << y << "\n"; }
};
class vecteur3d {
    float v[3];
public:
    vecteur3d(float c1 = 0, float c2 = 0, float c3 = 0) { v[0] = c1; v[1] = c2; v[2] = c3; }
    float &operator[](int i)      { if (i < 0 || i > 2) i = 0; return v[i]; }  // lecture/écriture
    float operator[](int i) const { if (i < 0 || i > 2) i = 0; return v[i]; }  // objet constant
};
int main() {
    point a1(2, 5), a2(2, 5), b;
    b = ++a1; cout << "a1 : "; a1.affiche(); cout << "b : "; b.affiche();
    b = a2++; cout << "a2 : "; a2.affiche(); cout << "b : "; b.affiche();
    vecteur3d v(1, 2, 3);
    v[1] = 20;                       // possible car [] renvoie float&
    const vecteur3d w(7, 8, 9);
    cout << v[1] << " " << w[2] << " " << v[9] << "\n";   // v[9] -> protégé : v[0]
    return 0;
}
```

```sortie
a1 : 3 6
b : 3 6
a2 : 3 6
b : 2 5
20 9 1
```

> [!retenir] Pour que `v[i] = ...` marche, `operator[]` doit renvoyer une **référence**. La version `const` renvoie une valeur : `w[i] = ...` est alors refusé à la compilation.

## Idée 4 · L'opérateur = pour une classe à pointeur

Même problème que la recopie : l'affectation par défaut copie le pointeur. On écrit donc `vect & operator=(const vect &)`.

```etapes Les 4 temps d'un operator= correct
Auto-affectation ? :: `if (this != &v)` : pour `c = c`, on ne fait rien (sinon on détruirait la zone qu'on veut copier).
Libérer :: `delete[] adr;` l'ancienne zone de l'objet de gauche.
Réallouer et copier :: `adr = new int[nelem = v.nelem];` puis copie élément par élément.
Renvoyer *this par référence :: permet d'enchaîner `a = b = c;`.
```

```cpp
#include <iostream>
using namespace std;
class vect {
    int nelem; int *adr;
public:
    vect(int n) { nelem = n; adr = new int[nelem]; for (int i = 0; i < nelem; i++) adr[i] = n; }
    ~vect() { delete[] adr; }
    vect &operator=(const vect &v) {
        if (this != &v) {
            cout << "copie de " << v.nelem << " elements\n";
            delete[] adr;
            adr = new int[nelem = v.nelem];
            for (int i = 0; i < nelem; i++) adr[i] = v.adr[i];
        } else cout << "on ne fait rien\n";
        return *this;
    }
    void affiche() { for (int i = 0; i < nelem; i++) cout << adr[i] << " "; cout << "\n"; }
};
int main() {
    vect a(5), b(3), c(4);
    b = a;  b.affiche();
    c = c;
    a = b = c;  a.affiche();
    return 0;
}
```

```sortie
copie de 5 elements
5 5 5 5 5 
on ne fait rien
copie de 4 elements
copie de 4 elements
4 4 4 4 
```

> [!attention] Les diapos libèrent avec `delete adr;` une zone allouée par `new int[...]` : la forme correcte est `delete[] adr;`.

## S'exercer

```exercice Exercices du cours et du TD2
? {amies-operateurs} (TD2, ex. 2.1) Classe point avec constructeur `point(int abs=0, int ord=0)` et `friend point operator+(point, point)`. Que font `a = b + 6;` et `a = 6 + b;` ? Et si + était membre ?
indice: Le constructeur à un argument sert de conversion int → point.
= Avec l'amie : 6 est converti en point(6, 0) par le constructeur, dans les deux cas. Les deux affectations marchent. Avec un membre : `b + 6` marche (`b.operator+(point(6))`), mais `6 + b` est refusé : 6 n'est pas un objet, on ne peut pas appeler 6.operator+.

? {amies-operateurs} (TD2, ex. 2.1, q. 3 et 4) Et avec `friend point operator+(point &, point &)` ? Puis avec `const point &` ?
= Avec `point &` : `b + 6` et `6 + b` sont **refusés** : une référence non constante ne peut pas désigner le point temporaire issu de la conversion de 6. Avec `const point &` : tout redevient correct, le temporaire est accepté.

? {amies-operateurs} Combien de lignes « copie de… » affiche le programme de l'idée 4 ?
reponse: 3
= `b = a` (1), `c = c` affiche « on ne fait rien », puis `a = b = c` fait b = c (2) et a = b (3).
```

## Flashcards

```cartes
Rôle de friend :: Autoriser une fonction (ou une classe) extérieure à accéder aux membres privés.
Rendre toutes les méthodes de B amies de A :: Dans A : `friend class B;`
`a + b` avec operator+ membre devient… :: `a.operator+(b)`
Quand l'opérateur doit-il être ami ? :: Quand le premier opérande peut être d'un type de base (ex. 6 + p).
Opérateurs obligatoirement membres :: =, [], (), -> (et les opérateurs de cast).
Distinguer ++a et a++ :: `T operator++()` préfixé ; `T operator++(int)` postfixé (int fictif).
Pourquoi operator[] renvoie float& ? :: Pour pouvoir écrire `v[i] = ...` (lvalue).
Test au début de operator= :: `if (this != &v)` pour gérer l'auto-affectation.
```

## QCM du chapitre

```qcm
? Où se place la déclaration `friend int coincide(point, point);` ?
+ Dans la classe point
- Dans main
- Dans la fonction coincide
= C'est la classe qui accorde l'amitié.

? Un opérateur binaire défini comme fonction membre a :
- 2 arguments explicites
+ 1 argument explicite
- 0 argument
= Le premier opérande est l'objet appelant (this).

? Avec `point operator+(point)` membre et un constructeur point(int), quelle expression est refusée ?
- `b + 6`
+ `6 + b`
- `a + b`
= On ne peut pas appeler une méthode sur l'entier 6.

? Quel opérateur doit obligatoirement être membre ?
- +
- ==
+ []
= =, [], () et -> sont toujours membres.

? Quel en-tête correspond à `a++` ?
- `point operator++()`
+ `point operator++(int)`
- `point operator++(point)`
= L'int fictif signale la notation postfixée.

? Avec `point a(2,5), b; b = a++;`, que contient b ?
+ 2 5
- 3 6
- 0 0
= Le postfixé renvoie l'ancienne valeur.

? Pour pouvoir écrire `v[1] = 20;`, operator[] doit renvoyer :
- float
+ float&
- void
= Il faut une référence vers l'élément.

? Pourquoi tester `this != &v` dans operator= ?
- Pour accélérer le programme
+ Pour éviter de détruire la zone qu'on veut copier lors de `c = c`
- Parce que C++ l'impose
= Sans ce test, delete[] adr détruirait aussi v.adr.

? Pourquoi operator= renvoie-t-il `*this` par référence ?
- Pour libérer la mémoire
+ Pour permettre `a = b = c`
- Pour appeler le destructeur
= b = c renvoie b, qui est ensuite affecté à a.

? `friend point operator+(point &, point &);` et l'appel `b + 6` :
- Correct
+ Refusé : le temporaire point(6) ne peut pas se lier à point&
- Correct mais 6 est ignoré
= Il faut const point& pour accepter un temporaire.
```

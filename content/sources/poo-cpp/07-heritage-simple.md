---
id: heritage-simple
titre: Héritage simple · dérivation, redéfinition, protected, constructeurs
seance: Partie III · Héritage
importance: 5
---

## Avant de commencer

Il faut savoir écrire une classe avec constructeur et liste d'initialisation (chapitres 3 et 4).

```exercice Vérifie ton prérequis
? Comment le constructeur de `cercle` transmet-il (abs, ord) à son objet membre `centre` ?
= Dans la liste d'initialisation : `cercle(int abs, int ord, int r) : centre(abs, ord) { rayon = r; }`. L'héritage utilise exactement la même syntaxe, avec le nom de la classe de base.
```

## Comment aborder ce chapitre

> [!astuce] L'héritage traduit « **est un** » : un point coloré **est un** point. La classe dérivée reçoit tout ce qu'a la base et y ajoute ses propres membres. Un objet membre traduit plutôt « **a un** » : un cercle **a un** centre.

> [!piege] Croire que la classe dérivée voit les membres **privés** de sa base. Non : ils existent dans l'objet, mais seules les méthodes de la base y accèdent. Pour les ouvrir aux dérivées, il faut `protected`.

À la fin, tu sais dériver une classe, redéfinir une méthode en appelant celle de la base, transmettre des arguments au constructeur de base et lire le tableau des modes de dérivation.

## Idée 1 · Dériver et redéfinir

```html
<svg viewBox="0 0 640 190" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="pointcol hérite de point : il garde x, y, deplace et affiche, et ajoute couleur et colore">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="220" y="10" width="200" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="320" y="30" text-anchor="middle" font-weight="700">point</text>
<text x="235" y="52">x, y</text><text x="235" y="70">initialise, deplace, affiche</text>
<line x1="320" y1="115" x2="320" y2="80" stroke="currentColor" stroke-width="2"/>
<polygon points="320,80 312,95 328,95" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="220" y="115" width="200" height="70" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="320" y="135" text-anchor="middle" font-weight="700">pointcol : public point</text>
<text x="235" y="157" fill="#D9824F">+ couleur</text><text x="235" y="175" fill="#D9824F">+ colore ; affiche redéfinie</text>
<text x="440" y="100">« est un »</text>
</g></svg>
```

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    void initialise(int abs, int ord) { x = abs; y = ord; }
    void deplace(int dx, int dy) { x += dx; y += dy; }
    void affiche() { cout << "Je suis en " << x << " " << y << "\n"; }
};
class pointcol : public point {
    short couleur;
public:
    void colore(short cl) { couleur = cl; }
    void affiche() {                       // redéfinition
        point::affiche();                  // appel de la version de la base
        cout << "  et ma couleur est : " << couleur << "\n";
    }
    void initialise(int abs, int ord, short cl) { point::initialise(abs, ord); couleur = cl; }
};
int main() {
    pointcol p;
    p.initialise(10, 20, 5);
    p.affiche();
    p.point::affiche();        // on force la version de point
    p.deplace(2, 4);
    p.colore(2);
    p.affiche();
    return 0;
}
```

```sortie
Je suis en 10 20
  et ma couleur est : 5
Je suis en 10 20
Je suis en 12 24
  et ma couleur est : 2
```

> [!retenir] **Surdéfinition** (overloading) : même nom, signatures **différentes**, dans la même portée. **Redéfinition** (overriding) : même signature, dans une classe **dérivée**, pour remplacer la méthode de la base. `classe::methode()` permet d'appeler la version de la base.

Si une dérivée redéfinit un **membre donnée** (`float a` dans B, `int a` dans A), `p.a` désigne celui de B et `p.A::a` celui de A.

## Idée 2 · Constructeurs et destructeurs dans une hiérarchie

```etapes Ordre d'appel
Construction :: d'abord le constructeur de la **base**, puis celui de la **dérivée**.
Arguments :: `pointcol(int abs, int ord, char cl) : point(abs, ord) { ... }` ; sans liste, c'est le constructeur par défaut de la base qui est appelé (il doit exister).
Destruction :: ordre inverse : la **dérivée**, puis la **base**.
Non hérités :: constructeurs, destructeur et opérateur = de la base ne sont pas hérités.
```

```cpp
#include <iostream>
using namespace std;
class point {
protected:
    int x, y;                  // visibles dans les dérivées
public:
    point(int abs = 0, int ord = 0) : x(abs), y(ord) { cout << "++ point " << x << " " << y << "\n"; }
    ~point() { cout << "-- point\n"; }
};
class pointcol : public point {
    int coul;
public:
    pointcol(int abs = 0, int ord = 0, int cl = 1) : point(abs, ord) { coul = cl; cout << "++ pointcol " << coul << "\n"; }
    ~pointcol() { cout << "-- pointcol\n"; }
    void affiche() { cout << "Je suis en " << x << " " << y << " couleur " << coul << "\n"; }  // x, y protected
};
int main() {
    pointcol a(2, 3, 4);
    a.affiche();
    return 0;
}
```

```sortie
++ point 2 3
++ pointcol 4
Je suis en 2 3 couleur 4
-- pointcol
-- point
```

> [!attention] Dans l'exemple de recopie des diapos, la couleur est un `char` et s'affiche avec `cout << coul` : on obtient le **caractère** de code 4, pas le chiffre 4. Il faut `int(coul)`, comme le fait d'ailleurs le constructeur usuel de la même diapo.

## Idée 3 · Modes de dérivation

```grille Statut d'un membre hérité
#cols: Dans la base | dérivation public | dérivation protected | dérivation private
public | public | *protected | *private
protected | protected | protected | *private
private | ~inaccessible | ~inaccessible | ~inaccessible
```

- **public** (le cas courant) : l'utilisateur de pointcol peut encore appeler `p.affiche()` de point.
- **private** : `p.deplace(...)` est refusé, même écrit `p.point::deplace(...)`.
- **protected** : intermédiaire ; les membres publics de la base deviennent protégés pour les dérivations suivantes.

## Idée 4 · Conversions entre base et dérivée

```flux Ce qui est permis
pointcol -> point (a = b : on garde la partie point)
pointcol* -> point* (adp = adpc)
```

L'inverse (`b = a;`, `adpc = adp;`) est refusé : un point n'a pas de couleur.

> [!piege] Avec `point *adp = &pc;` (pc est un pointcol), `adp->affiche()` appelle **point::affiche()**. Le choix est fait à la compilation d'après le type du **pointeur** (typage statique). Pour obtenir pointcol::affiche, il faudra une fonction **virtuelle** (chapitre 8).

Recopie et affectation : si la dérivée **ne définit pas** son constructeur de recopie (ou son =), la version par défaut appelle celle de la base pour la partie héritée. Si elle **en définit un**, c'est à elle de traiter la partie base : `pointcol(const pointcol &p) : point(p) {...}`.

## S'exercer

```exercice Exercices du TD3
? {heritage-simple} (TD3, ex. 1) À partir de `class point { float x, y; public: point(float abs=0.0, float ord=0.0); void affiche(); void deplace(float, float); };`, écris pointcol avec un membre `int cl`, `affiche` redéfinie, `colore(int)` et un constructeur (non en ligne).
= `class pointcol : public point { int cl; public: pointcol(float = 0.0, float = 0.0, int = 0); void affiche(); void colore(int c) { cl = c; } };` puis hors classe : `pointcol::pointcol(float a, float o, int c) : point(a, o) { cl = c; }` et `void pointcol::affiche() { point::affiche(); cout << " couleur : " << cl << "\n"; }`.

? {heritage-simple} Avec `class B : private A`, l'utilisateur peut-il appeler une méthode publique de A sur un objet B ?
reponse: non
= Non : en dérivation privée, les membres publics de A deviennent privés dans B.

? {heritage-simple} Écris l'operator= de pointcol qui affecte aussi la partie point, en réutilisant l'operator= de point.
= `pointcol & operator=(const pointcol &b) { point::operator=(b); coul = b.coul; return *this; }`. Le cours obtient le même effet avec deux pointeurs : `point *ad1 = this, *ad2 = (point*)&b; *ad1 = *ad2;`.
```

## Flashcards

```cartes
Syntaxe de dérivation publique :: `class pointcol : public point { ... };`
Surdéfinition vs redéfinition :: Surdéfinition : signatures différentes. Redéfinition : même signature dans une classe dérivée.
Appeler la méthode de la base depuis la redéfinition :: `point::affiche();`
protected :: Inaccessible à l'utilisateur, accessible aux classes dérivées.
Ordre des constructeurs :: Base puis dérivée. Destructeurs : dérivée puis base.
Passer des arguments au constructeur de base :: `pointcol(int a, int o, char c) : point(a, o) { ... }`
Ce qui n'est pas hérité :: Constructeurs, destructeur, opérateur =.
`point *adp = &pc; adp->affiche();` sans virtual :: Appelle point::affiche (typage statique).
```

## QCM du chapitre

```qcm
? Quelle relation traduit l'héritage public ?
+ « est un »
- « a un »
- « utilise un »
= Un pointcol est un point.

? Une méthode de pointcol peut-elle lire x si x est private dans point ?
- Oui, toujours
+ Non
- Oui si la dérivation est publique
= Il faut que x soit protected (ou public).

? Ordre d'exécution pour `pointcol a(2,3,4);` ?
+ Constructeur de point, puis de pointcol
- Constructeur de pointcol, puis de point
- Seulement le constructeur de pointcol
= La base est construite d'abord.

? Ordre de destruction de a ?
- point puis pointcol
+ pointcol puis point
- Seulement point
= Inverse de la construction.

? Redéfinir une méthode signifie :
- Lui donner une autre signature dans la même classe
+ La réécrire avec la même signature dans une classe dérivée
- La déclarer static
= Avec une autre signature, ce serait une surdéfinition.

? En dérivation publique, un membre protected de la base devient :
- public
+ protected
- private
= Le statut est conservé.

? En dérivation privée, un membre public de la base devient :
- public
- protected
+ private
= Il n'est plus accessible à l'utilisateur de la dérivée.

? Avec `point a; pointcol b;`, quelle affectation est légale ?
+ `a = b;`
- `b = a;`
- Aucune
= Conversion dérivée → base seulement.

? `point *adp = &pc;` (pc est un pointcol), sans virtual, `adp->affiche()` appelle :
+ point::affiche
- pointcol::affiche
- Une erreur de compilation
= Le choix suit le type du pointeur.

? Qu'est-ce qui est hérité par la classe dérivée ?
- Le constructeur de la base
- L'opérateur = de la base
+ Les fonctions membres publiques ordinaires
= Constructeurs, destructeur et = ne sont pas hérités.
```

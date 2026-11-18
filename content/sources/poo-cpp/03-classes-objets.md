---
id: classes-objets
titre: Classes et objets · constructeur, destructeur, static, const, this
seance: Partie II · Notions de classe
importance: 5
---

## Avant de commencer

Tu connais les `struct` du C : un type qui regroupe plusieurs champs. Une classe, c'est une struct qui contient aussi des fonctions, et qui cache ses champs.

```exercice Vérifie ton prérequis
? En C, avec `struct point { int x, y; }; struct point a;`, comment donner la valeur 5 au champ x de a ?
= `a.x = 5;` : l'opérateur point accède à un champ. En C++ on garde ce point pour les membres publics d'un objet.
```

## Comment aborder ce chapitre

> [!astuce] Pense « mode d'emploi » : la partie `public` est ce que l'utilisateur de la classe a le droit de toucher, la partie `private` est la cuisine interne. Toutes les méthodes de la classe, elles, voient tout.

> [!piege] Oublier le **point-virgule** après l'accolade fermante de la classe : `class point { ... };`. Et confondre la déclaration (dans la classe) avec la définition `void point::deplacer(...)`, qui demande l'opérateur `::`.

À la fin, tu sais écrire une classe complète, prévoir l'ordre d'appel des constructeurs et destructeurs, et utiliser un compteur d'objets statique.

## Idée 1 · Déclarer, définir, utiliser une classe

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="La classe point a une partie privée x y et une partie publique avec point, deplacer et afficher ; l'utilisateur ne voit que la partie publique">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="15" width="300" height="140" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="35" y="38" font-weight="700">class point</text>
<rect x="35" y="50" width="120" height="90" fill="none" stroke="currentColor" stroke-dasharray="5 4"/>
<text x="45" y="72">private :</text><text x="45" y="95">int x ;</text><text x="45" y="115">int y ;</text>
<rect x="170" y="50" width="135" height="90" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="180" y="72" fill="#D9824F" font-weight="700">public :</text><text x="180" y="95">point(int,int)</text><text x="180" y="113">deplacer(int,int)</text><text x="180" y="131">afficher()</text>
<line x1="470" y1="95" x2="310" y2="95" stroke="#D9824F" stroke-width="2"/>
<polygon points="310,95 322,89 322,101" fill="#D9824F"/>
<text x="400" y="85" text-anchor="middle">main()</text>
<text x="400" y="115" text-anchor="middle">a.afficher() : oui</text>
<text x="400" y="135" text-anchor="middle">a.x = 3 : non</text>
</g></svg>
```

```cpp
#include <iostream>
using namespace std;
class point {               // déclaration
    int x, y;               // privés par défaut dans une class
public:
    point(int, int);        // constructeur
    void deplacer(int, int);
    void afficher();
};                          // point-virgule indispensable
point::point(int abs, int ord) { x = abs; y = ord; }      // définitions
void point::deplacer(int dx, int dy) { x = x + dx; y = y + dy; }
void point::afficher() { cout << "Je suis en " << x << " " << y << "\n"; }
int main() {
    point a(5, 2), b(1, -1);
    a.afficher();
    a.deplacer(-2, 4);
    a.afficher();
    b.afficher();
    return 0;
}
```

```sortie
Je suis en 5 2
Je suis en 3 6
Je suis en 1 -1
```

```grille Niveaux d'accès
#cols: Mot-clé | Qui y accède ?
public | tout le monde
private | seulement les membres de la classe (et ses amies)
protected | la classe et ses classes dérivées
friend | les fonctions déclarées amies
```

En pratique, on sépare : la **déclaration** dans `point.h`, les **définitions** dans `point.cpp`, l'**utilisation** dans le programme qui fait `#include "point.h"`.

> [!attention] Les diapos incluent `"point.cpp"` dans le programme de test. Ça marche pour un petit exemple, mais la bonne pratique est d'inclure le `.h` et de compiler les deux `.cpp` ensemble (`g++ point.cpp test.cpp`).

`b = a;` recopie membre à membre tous les champs, même privés.

## Idée 2 · Constructeur et destructeur

Le **constructeur** porte le nom de la classe, n'a pas de type de retour, et s'exécute à chaque création d'objet. Le **destructeur** `~classe()` s'exécute à sa destruction. On peut **surdéfinir** le constructeur, pas le destructeur (il n'a pas d'argument).

```cpp
#include <iostream>
using namespace std;
class test {
public:
    int num;
    test(int n) { num = n; cout << "++ Appel constructeur - num = " << num << "\n"; }
    ~test()     { cout << "-- Appel destructeur - num = " << num << "\n"; }
};
void fct(int p) { test x(p); }      // x détruit à la sortie de fct
int main() {
    test a(1);
    fct(2);
    return 0;                       // a détruit ici
}
```

```sortie
++ Appel constructeur - num = 1
++ Appel constructeur - num = 2
-- Appel destructeur - num = 2
-- Appel destructeur - num = 1
```

```etapes Durée de vie des objets
Automatique :: déclaré dans une fonction ou un bloc ; détruit à la sortie du bloc.
Statique :: déclaré hors de toute fonction ou avec `static` ; créé avant main, détruit après.
Temporaire :: `a = point(1, 2);` crée un objet sans nom, détruit dès qu'il ne sert plus.
Dynamique :: `adr = new point(1, 4);` ; vit jusqu'au `delete adr;`.
```

> [!retenir] Si le constructeur fait un `new`, le destructeur doit faire le `delete` correspondant (exemple du cours : la classe `tableau` alloue `new int[taille]` et libère par `delete[] tab`).

## Idée 3 · Membres statiques : un exemplaire pour toute la classe

Un membre donnée `static` existe **en un seul exemplaire**, partagé par tous les objets. Il s'initialise hors de la classe : `int point::ctr = 0;`. Une fonction membre `static` ne travaille que sur les membres statiques et s'appelle sans objet : `point::compte();`.

```cpp
#include <iostream>
using namespace std;
class point {
    static int ctr;          // compteur partagé
    int x, y;
public:
    point()  { x = y = 0; cout << "++ construction : il y a maintenant " << ++ctr << " objets\n"; }
    ~point() { cout << "-- destruction : il reste maintenant " << --ctr << " objets\n"; }
    static void compte() { cout << "appel compte : il y a " << ctr << " objets\n"; }
};
int point::ctr = 0;          // initialisation obligatoire, hors de la classe
void fct() { point u, v; }
int main() {
    point::compte();
    point a;
    point::compte();
    fct();
    point::compte();
    return 0;
}
```

```sortie
appel compte : il y a 0 objets
++ construction : il y a maintenant 1 objets
appel compte : il y a 1 objets
++ construction : il y a maintenant 2 objets
++ construction : il y a maintenant 3 objets
-- destruction : il reste maintenant 2 objets
-- destruction : il reste maintenant 1 objets
appel compte : il y a 1 objets
-- destruction : il reste maintenant 0 objets
```

## Idée 4 · Méthodes constantes et pointeur this

- `void affiche() const;` promet de ne pas modifier l'objet. Sur un **objet constant**, seules les méthodes `const` sont appelables.
- `this` est un pointeur sur l'objet qui a appelé la méthode. `*this` est l'objet lui-même.

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; }
    void affiche() const { cout << this->x << " " << y << "\n"; }   // this->x = x
    int coincide(const point &pt) const { return pt.x == x && pt.y == y; }
};
int main() {
    const point c(3, 4);
    c.affiche();                     // OK : affiche est const
    point a, b(1), d(1, 0);
    cout << "a et b : " << a.coincide(b) << "\n";
    cout << "b et d : " << b.coincide(d) << "\n";
    return 0;
}
```

```sortie
3 4
a et b : 0
b et d : 1
```

Remarque la « dissymétrie » de `coincide` : `pt.x` est le x de l'argument, `x` tout seul est celui de l'objet appelant (`this->x`). Une méthode accède aux membres privés de **tous** les objets de sa classe.

> [!attention] Les diapos écrivent `void affiche(char *message)` puis appellent `affiche("Point b - ")`. En C++ moderne, une chaîne littérale est constante : écris `const char *message`, sinon g++ signale l'erreur (ou un avertissement).

## S'exercer

```exercice Exercices du TD1 (classe point)
? {classes-objets} (TD1, ex. 1.7) Écris la déclaration de la classe point : coordonnées float privées, constructeur, `deplace`, `affiche`, `distance` (à l'origine), `abscisse` et `ordonnee`.
= `class point { float x, y; public: point(float, float); void deplace(float, float); void affiche(); float distance(); float abscisse(); float ordonnee(); };` Définitions : `point::point(float a, float b){ x=a; y=b; }`, `float point::distance(){ return sqrt(x*x + y*y); }` (avec `<cmath>`), `float point::abscisse(){ return x; }`…

? {classes-objets} (TD1, ex. 1.8) Modifie point pour que `affiche` donne aussi le nombre d'objets point existants.
indice: Un compteur commun à tous les objets.
= Ajoute `static int nb;` dans la classe et `int point::nb = 0;` dehors. Le constructeur fait `nb++`, le destructeur `nb--`, et affiche écrit `"nombre de points : " << nb`. Sans destructeur, le compteur donnerait le nombre d'objets **créés**, pas existants.

? {classes-objets} Combien de lignes « ++ » et « -- » affiche le programme de l'idée 2 si on ajoute `fct(3);` après `fct(2);` ?
reponse: 6
= Trois constructions (1, 2, 3) et trois destructions : 6 lignes. Ordre : ++1, ++2, --2, ++3, --3, --1.
```

## Flashcards

```cartes
Membres d'une class sans mot-clé :: Privés par défaut.
Syntaxe de définition hors classe :: `void point::deplacer(int dx, int dy) { ... }`
Constructeur :: Même nom que la classe, pas de type de retour, appelé à chaque création.
Peut-on surdéfinir le destructeur ? :: Non : il n'a pas d'argument.
Membre donnée static :: Un seul exemplaire pour tous les objets ; initialisé hors classe : `int point::ctr = 0;`
Appel d'une fonction membre statique :: `point::compte();` même sans aucun objet.
Méthode const :: `void affiche() const;` seule appelable sur un objet constant.
this :: Pointeur sur l'objet qui a appelé la méthode.
```

## QCM du chapitre

```qcm
? Dans `class point { int x; public: ... };`, x est :
+ privé
- public
- protégé
= Dans une class, l'accès par défaut est private.

? Quelle écriture définit la méthode afficher hors de la classe ?
- `void afficher::point() {...}`
+ `void point::afficher() {...}`
- `point.afficher() {...}`
= Classe, deux-points doubles, puis nom de la méthode.

? Le constructeur d'une classe :
- Renvoie void
+ N'a pas de type de retour
- Renvoie un objet de la classe
= On n'écrit aucun type de retour, même pas void.

? Ordre d'affichage pour `test a(1); fct(2);` où fct crée `test x(2)` ?
- ++1, ++2, --1, --2
+ ++1, ++2, --2, --1
- ++2, ++1, --1, --2
= x est détruit à la sortie de fct, a à la fin de main.

? Combien d'exemplaires d'un membre `static int ctr` existe-t-il pour 10 objets ?
+ 1
- 10
- 0 tant qu'il n'est pas initialisé dans le constructeur
= Un membre statique est partagé par toute la classe.

? Où initialise-t-on `static int ctr;` ?
- Dans le constructeur
+ Hors de la classe : `int point::ctr = 0;`
- Dans main
= C'est une définition à part, hors de la déclaration de classe.

? Une fonction membre statique :
- Peut utiliser this
+ Peut être appelée sans aucun objet
- Doit être virtuelle
= Elle ne dépend d'aucun objet, donc pas de this.

? Sur un objet `const point c;`, on peut appeler :
- Toutes les méthodes publiques
+ Seulement les méthodes déclarées const
- Aucune méthode
= Une méthode const promet de ne pas modifier l'objet.

? Que vaut `this` dans une méthode ?
- L'objet lui-même
+ L'adresse de l'objet appelant
- L'adresse de la classe
= this est un pointeur ; *this est l'objet.

? `point a(5,2), b(1,1); b = a;` :
- Est interdit car x et y sont privés
+ Recopie x et y de a dans b
- Fait de b une référence à a
= L'affectation par défaut recopie tous les membres, même privés.
```

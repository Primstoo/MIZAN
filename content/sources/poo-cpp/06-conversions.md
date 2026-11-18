---
id: conversions
titre: Conversions de type définies par l'utilisateur
seance: Partie II · Les conversions de type
importance: 3
---

## Avant de commencer

Tu dois savoir surdéfinir un opérateur (chapitre 5) et connaître les conversions implicites du C (int → double…).

```exercice Vérifie ton prérequis
? Avec `int n; double z = 3.85; n = z;`, que vaut n ?
reponse: 3
= L'affectation convertit le double en int en tronquant : n vaut 3.
```

## Comment aborder ce chapitre

> [!astuce] Deux sens, deux outils. **Classe → type de base** : un opérateur de cast `operator int()`. **Type de base → classe** : un constructeur à un argument. Pour classe → classe, l'un ou l'autre.

> [!piege] Oublier que ces conversions sont **implicites** : `a = 12;` crée en douce un `point(12)`. Pratique, mais source de surprises. Le mot-clé `explicit` les interdit.

À la fin, tu sais écrire un opérateur de cast, prévoir quand un constructeur sert de conversion, et bloquer cette conversion avec explicit.

## Idée 1 · L'opérateur de cast : classe → type de base

```flux Deux sens de conversion
point -> operator int() -> int
int -> constructeur point(int) -> point
```

L'opérateur de cast est une **fonction membre**, sans argument, **sans type de retour écrit** (le type est dans le nom).

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; }
    operator int() { cout << "== appel int() pour " << x << " " << y << "\n"; return x; }
};
int main() {
    point a(3, 4), b(5, 7);
    int n1 = int(a);          // appel explicite
    cout << "n1 = " << n1 << "\n";
    int n2 = b;               // appel implicite
    cout << "n2 = " << n2 << "\n";
    int n3 = a + b;           // les deux points convertis en int, puis addition
    cout << "n3 = " << n3 << "\n";
    double z = a + 3.85;      // conversion en chaîne : point -> int -> double
    cout << "z = " << z << "\n";
    return 0;
}
```

```sortie
== appel int() pour 3 4
n1 = 3
== appel int() pour 5 7
n2 = 5
== appel int() pour 3 4
== appel int() pour 5 7
n3 = 8
== appel int() pour 3 4
z = 6.85
```

## Idée 2 · Le constructeur comme conversion : type de base → classe

Tout constructeur appelable avec **un seul argument** définit une conversion. Avec `point(int abs = 0, int ord = 0)` :

- `a = point(12);` : conversion explicite (objet temporaire, puis affectation) ;
- `a = 12;` : même chose, implicitement ;
- `fct(4);` avec `void fct(point)` : 4 devient `point(4, 0)`.

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; cout << "++ construction point " << x << " " << y << "\n"; }
};
void fct(point p) { cout << "** appel fct\n"; }
int main() {
    point a(3, 4);
    a = point(12);     // explicite
    a = 12;            // implicite
    fct(4);            // implicite
    return 0;
}
```

```sortie
++ construction point 3 4
++ construction point 12 0
++ construction point 12 0
++ construction point 4 0
** appel fct
```

```cpp nontest
class point {
    int x, y;
public:
    explicit point(int);            // plus de conversion implicite
};
point a(0), b(1);
a = 12;               // refusé
a = point(3);         // accepté : conversion explicite
```

> [!retenir] `explicit` devant un constructeur interdit les conversions implicites (simples ou en chaîne), mais laisse la conversion explicite `point(3)`.

> [!attention] Les diapos écrivent `friend operator + (point, point);` sans type de retour : il faut `friend point operator+(point, point);`.

## Idée 3 · Conversion entre deux classes

Pour convertir un `point` en `complexe`, deux possibilités : un cast `operator complexe()` dans **point**, ou un constructeur `complexe(point)` dans **complexe**. Le cours utilise le cast, déclaré ami de complexe pour remplir ses champs privés.

```cpp
#include <iostream>
using namespace std;
class complexe;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; }
    operator complexe();               // point -> complexe
};
class complexe {
    double reel, imag;
public:
    complexe(double r = 0, double i = 0) { reel = r; imag = i; }
    friend point::operator complexe();
    void affiche() { cout << reel << " + " << imag << "i\n"; }
};
point::operator complexe() { complexe r; r.reel = x; r.imag = y; return r; }
int main() {
    point a(2, 5);
    complexe c;
    c = (complexe) a; c.affiche();   // explicite
    point b(9, 12);
    c = b;            c.affiche();   // implicite
    return 0;
}
```

```sortie
2 + 5i
9 + 12i
```

> [!piege] Ne définis pas **les deux** (cast dans A et constructeur dans B) pour la même conversion : le compilateur ne saura pas lequel choisir (ambiguïté).

## S'exercer

```exercice S'entraîner
? {conversions} Avec la classe point de l'idée 1 (cast vers int renvoyant x), que vaut `n = a + b;` pour `point a(3,4), b(5,7);` ?
reponse: 8
= a → 3 et b → 5 par operator int(), puis 3 + 5 = 8.

? {conversions} Combien de « ++ construction » affiche le programme de l'idée 2 ?
reponse: 4
= a(3,4), point(12), le temporaire de `a = 12`, et le point(4) de `fct(4)`.

? {conversions} Comment empêcher `a = 12;` tout en gardant `a = point(12);` ?
= Déclarer le constructeur `explicit point(int abs = 0, int ord = 0);`.
```

## Flashcards

```cartes
Conversion classe → int :: Fonction membre `operator int()`, sans argument ni type de retour écrit.
Conversion int → classe :: Un constructeur appelable avec un seul argument.
`a = 12;` avec point(int) :: Crée un point temporaire point(12) puis l'affecte à a.
Rôle de explicit :: Interdit l'usage implicite du constructeur comme conversion.
Conversion en chaîne :: Ex. point → int (cast) → double (conversion standard).
Classe A → classe B, deux solutions :: `operator B()` dans A, ou constructeur `B(A)` dans B.
```

## QCM du chapitre

```qcm
? Comment s'écrit l'opérateur de cast point → int ?
- `int operator int();`
+ `operator int();`
- `friend int operator(point);`
= Pas de type de retour écrit : il est dans le nom.

? Un opérateur de cast doit être :
+ Une fonction membre
- Une fonction amie
- Une fonction statique
= Le cours l'impose : fonction membre.

? Avec `point(int abs=0, int ord=0)`, l'instruction `a = 12;` :
- Est refusée
+ Crée un point(12, 0) temporaire puis l'affecte
- Met x et y à 12
= Le constructeur sert de conversion implicite.

? Avec `explicit point(int);`, laquelle est acceptée ?
- `a = 12;`
- `a = b + 5;`
+ `a = point(3);`
= explicit n'interdit que l'usage implicite.

? `double z = a + 3.85;` avec `operator int()` renvoyant x = 3 donne :
- 3
+ 6.85
- 7
= a → 3 (int), puis 3 + 3.85 en double.

? `fct(4);` avec `void fct(point)` et point(int) :
+ Construit point(4) puis appelle fct
- Erreur de type
- Appelle fct avec un int
= Conversion implicite par le constructeur.

? Pour convertir un point en complexe, on peut :
- Seulement surdéfinir =
+ Écrire `operator complexe()` dans point, ou `complexe(point)` dans complexe
- Écrire `operator point()` dans complexe
= Un cast dans la classe source ou un constructeur dans la classe cible.

? Pourquoi `point::operator complexe()` est-il déclaré ami de complexe ?
- Pour pouvoir être virtuel
+ Pour accéder aux membres privés reel et imag
- C'est obligatoire pour tout cast
= Il remplit directement les champs privés de complexe.

? Quel risque si on définit à la fois `operator complexe()` dans point et `complexe(point)` dans complexe ?
+ Ambiguïté à la compilation
- Double appel à l'exécution
- Aucun
= Deux chemins équivalents : le compilateur refuse.

? `int n1 = int(a);` est :
+ Un appel explicite de operator int()
- Un appel du constructeur de recopie
- Une erreur
= Notation fonctionnelle du cast, comme `(int) a`.
```

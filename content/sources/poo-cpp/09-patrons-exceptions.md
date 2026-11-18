---
id: patrons-exceptions
titre: Patrons de fonctions et de classes, gestion des exceptions
seance: Parties IV et V · Templates et exceptions
importance: 4
---

## Avant de commencer

Il faut connaître la surdéfinition de fonctions (chapitre 1) et la surdéfinition d'opérateurs (chapitre 5).

```exercice Vérifie ton prérequis
? Pour avoir une fonction min sur des int et sur des float, combien de fonctions faut-il écrire avec la seule surdéfinition ?
reponse: 2
= Deux : `int min(int, int)` et `float min(float, float)`, au corps identique. Un patron évite cette répétition.
```

## Comment aborder ce chapitre

> [!astuce] Un patron (template) est un **moule** : tu écris le code une fois avec un type T, et le compilateur fabrique la version int, float, vect… quand il en a besoin. Une exception est un **signal d'erreur** qui remonte jusqu'au premier `catch` capable de la traiter.

> [!piege] Avec `using namespace std;`, nommer son patron `min` entre en conflit avec `std::min` : l'appel devient ambigu. Les diapos le font ; dans tes programmes, appelle-le `minimum` (ou n'utilise pas `using namespace std`).

À la fin, tu sais écrire un patron de fonction et de classe, prévoir quelle fonction le compilateur choisit, et structurer un `try / throw / catch`.

## Idée 1 · Patrons de fonctions

```flux Instanciation d'un patron
template <class T> T minimum(T a, T b) -> appel minimum(4, 12) -> T = int -> int minimum(int, int)
```

```cpp
#include <iostream>
using namespace std;
template <class T> T minimum(T a, T b) {
    if (a < b) return a;
    else return b;
}
class vect {
    int x, y;
public:
    vect(int abs = 0, int ord = 0) { x = abs; y = ord; }
    void affiche() { cout << x << " " << y; }
    friend int operator<(vect, vect);
};
int operator<(vect a, vect b) { return a.x*a.x + a.y*a.y < b.x*b.x + b.y*b.y; }   // compare les modules
int main() {
    int n = 4, p = 12;
    float x = 2.5, y = 3.25;
    cout << "minimum(n, p) = " << minimum(n, p) << "\n";
    cout << "minimum(x, y) = " << minimum(x, y) << "\n";
    vect u(3, 2), v(4, 1);
    cout << "minimum(u, v) = "; minimum(u, v).affiche(); cout << "\n";
    return 0;
}
```

```sortie
minimum(n, p) = 4
minimum(x, y) = 2.5
minimum(u, v) = 3 2
```

Pour appliquer le patron à une classe, l'opérateur `<` doit exister pour cette classe : ici 3²+2² = 13 < 4²+1² = 17, donc u.

```etapes Ordre de recherche du compilateur
1. Fonction ordinaire exacte :: une fonction non patron dont la signature correspond exactement.
2. Patron exact :: un patron qui produit exactement ces types (sans conversion).
3. Fonction ordinaire avec conversions :: une fonction normale en acceptant des conversions.
4. Sinon :: erreur de compilation. Note : `minimum(n, x)` (int et float) échoue, car T ne peut pas être à la fois int et float.
```

> [!attention] Les diapos utilisent le nom `min` et, dans un premier exemple, des paramètres `T &a, T &b`. Avec `using namespace std;` et `<iostream>`, g++ peut signaler l'ambiguïté avec `std::min` ; on a renommé en `minimum`.

## Idée 2 · Patrons de classes

```cpp
#include <iostream>
using namespace std;
template <class T> class point {
    T x, y;
public:
    point(T abs = 0, T ord = 0) { x = abs; y = ord; }
    void affiche();
};
template <class T> void point<T>::affiche() {      // définition hors classe
    cout << "Coordonnees : " << x << " " << y << "\n";
}
int main() {
    point<int> a(1, 13);
    point<float> b(2.5, 5.25);
    a.affiche();
    b.affiche();
    return 0;
}
```

```sortie
Coordonnees : 1 13
Coordonnees : 2.5 5.25
```

> [!retenir] Pour une classe patron, le type se donne **explicitement** entre chevrons : `point<int>`. Une méthode définie hors de la classe répète `template <class T>` et écrit `point<T>::`.

> [!attention] Les diapos écrivent `class point<int> a(1, 13);` : le mot `class` y est permis mais inutile, `point<int> a(1, 13);` suffit.

## Idée 3 · Lancer et attraper une exception

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Dans le bloc try, throw lance une exception ; le contrôle saute au catch du bon type, puis le programme continue après le dernier catch">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="20" y="30" width="170" height="80" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="105" y="55" font-weight="700">try { ... }</text><text x="105" y="85" fill="#D9824F">throw x;</text>
<rect x="240" y="20" width="150" height="40" rx="8" fill="none" stroke="currentColor" stroke-dasharray="5 4"/><text x="315" y="45">catch (int)</text>
<rect x="240" y="80" width="150" height="40" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="315" y="105">catch (string e)</text>
<rect x="450" y="80" width="170" height="40" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="535" y="105">suite du programme</text>
<line x1="190" y1="88" x2="240" y2="100" stroke="#D9824F" stroke-width="2"/><line x1="390" y1="100" x2="450" y2="100" stroke="currentColor" stroke-width="2"/>
<text x="215" y="140" font-size="12">x est une string : le catch(int) est sauté</text>
</g></svg>
```

```cpp
#include <iostream>
#include <string>
using namespace std;
class exception_div_by_zero {
    string message;
public:
    exception_div_by_zero() { message = "division par zero!"; }
    string getMessage() const { return message; }
};
int diviser(int a, int b) {
    if (b == 0) throw exception_div_by_zero();   // on lance un objet
    return a / b;
}
int main() {
    try {
        cout << "c: " << diviser(7, 2) << endl;
        cout << "c: " << diviser(1, 0) << endl;  // lance l'exception
        cout << "jamais affiche\n";
    }
    catch (exception_div_by_zero err) { cout << err.getMessage() << endl; }
    cout << "suite du programme!\n";
    return 0;
}
```

```sortie
c: 3
c: division par zero!
suite du programme!
```

Remarque le « c: » orphelin : il est affiché **avant** l'appel de `diviser(1, 0)`, qui lance l'exception au milieu de l'instruction.

```etapes Les règles du try/catch (cours)
1 :: Une exception lancée dans un try donne la main au catch de son type.
2 :: Un try est suivi d'au moins un catch ; plusieurs catch interceptent des types différents.
3 :: Avant d'entrer dans le catch, les destructeurs des objets du try sont exécutés.
4 :: Après le catch, on continue à l'instruction qui suit le dernier catch.
5 :: Aucun catch adapté : la fonction terminate est appelée (arrêt du programme).
```

> [!attention] Le premier exemple des diapos fait `c = a/b;` avec b = 0 et parle d'une erreur générée : une division entière par zéro n'est **pas** une exception C++, c'est un comportement indéfini (souvent un plantage). C'est bien pour cela qu'on teste `b == 0` et qu'on fait `throw` soi-même.

## Idée 4 · catch(...), throw; et stdexcept

- `catch(T)` attrape T **et ses classes dérivées** ; `catch(T info)` donne en plus l'objet.
- `catch(...)` attrape tout ce qui n'a pas été traité avant.
- `throw;` seul, dans un catch, **relance** l'exception vers le try englobant le plus proche.

```cpp
#include <iostream>
#include <string>
#include <stdexcept>
using namespace std;
void fct(int i) {
    try { throw i; }
    catch (int e) {
        if (e) cout << "catch in\n";
        else cout << "e: " << e << endl;
        throw;                       // relance
    }
    cout << "OK!\n";
}
int main() {
    try { fct(0); fct(1); }
    catch (string x) { cout << "catch_string !\n"; }
    catch (int) { cout << "catch_int!\n"; }
    try { throw out_of_range("indice 9 hors limites"); }
    catch (logic_error &e) { cout << "logic_error : " << e.what() << "\n"; }  // out_of_range dérive de logic_error
    cout << "fin du programme!\n";
    return 0;
}
```

```sortie
e: 0
catch_int!
logic_error : indice 9 hors limites
fin du programme!
```

`fct(1)` n'est jamais exécuté : l'exception relancée par `fct(0)` a quitté le bloc try de main.

```grille Quelques classes de stdexcept
#cols: Classe | Quand l'utiliser
logic_error | erreur de logique du programme
invalid_argument | argument invalide
out_of_range | indice hors limites
domain_error | hors du domaine (racine d'un négatif)
runtime_error | erreur détectée à l'exécution
overflow_error | dépassement arithmétique
```

## S'exercer

```exercice S'entraîner
? {patrons-exceptions} Écris un patron `echange` qui échange deux variables de même type.
= `template <class T> void echange(T &a, T &b) { T c = a; a = b; b = c; }`. Les références sont indispensables, sinon on échange des copies.

? {patrons-exceptions} Dans le programme de l'idée 4, combien de lignes sont affichées ?
reponse: 4
= « e: 0 », « catch_int! », « logic_error : indice 9 hors limites », « fin du programme! ».

? {patrons-exceptions} Modifie `vecteur3d::operator[]` (chapitre 5) pour qu'un indice hors de 0..2 lance une exception au lieu de renvoyer v[0].
= `float & operator[](int i) { if (i < 0 || i > 2) throw out_of_range("indice invalide"); return v[i]; }`, avec `#include <stdexcept>`. L'appelant écrit `try { v[5] = 1; } catch (out_of_range &e) { cout << e.what(); }`.
```

## Flashcards

```cartes
Syntaxe d'un patron de fonction :: `template <class T> T minimum(T a, T b) { ... }`
Condition pour appliquer minimum à une classe :: L'opérateur < doit être défini pour cette classe.
Ordre de recherche :: Fonction ordinaire exacte, patron exact, fonction ordinaire avec conversions, sinon erreur.
Déclarer un objet d'un patron de classe :: `point<int> a(1, 13);`
Méthode de patron définie hors classe :: `template <class T> void point<T>::affiche() { ... }`
throw; seul :: Relance l'exception en cours vers le try englobant.
catch(...) :: Attrape les exceptions de tous types.
Exception non attrapée :: La fonction terminate est appelée.
```

## QCM du chapitre

```qcm
? Quelle ligne déclare un patron de fonction ?
+ `template <class T> T f(T a);`
- `template T f(T a);`
- `class <T> T f(T a);`
= template, puis la liste des paramètres de type entre chevrons.

? `minimum(4, 2.5)` avec `template <class T> T minimum(T, T)` :
- Renvoie 2.5
+ Ne compile pas : T ne peut pas être à la fois int et double
- Renvoie 2
= Le patron exige deux arguments du même type.

? Que faut-il pour appliquer minimum à des objets vect ?
- Un constructeur de recopie
+ Un opérateur < pour vect
- Une fonction virtuelle
= Le corps du patron utilise a < b.

? En cas de choix, le compilateur préfère :
+ Une fonction ordinaire de signature exacte
- Toujours le patron
- La fonction déclarée en premier
= Fonction ordinaire exacte d'abord, puis patron exact.

? Comment déclare-t-on un point de coordonnées float avec le patron point ?
- `point a(2.5, 5.25);`
+ `point<float> a(2.5, 5.25);`
- `template point<float> a;`
= Pour un patron de classe, on précise le type.

? Après l'exécution d'un catch, le programme :
- Revient à l'instruction qui a lancé l'exception
+ Continue après le dernier catch
- S'arrête
= Il n'y a pas de retour dans le try.

? Que fait `throw;` sans argument dans un catch ?
- Lance une exception vide
+ Relance l'exception courante
- Termine le programme
= Elle est transmise au try englobant le plus proche.

? `catch(...)` :
+ Attrape tous les types d'exception
- Attrape uniquement les int
- Est une erreur de syntaxe
= Les trois points signifient « n'importe quel type ».

? `int c = 1 / 0;` (entiers) en C++ :
- Lance automatiquement une exception attrapable
+ Est un comportement indéfini, pas une exception
- Donne 0
= Il faut tester b == 0 et lancer soi-même l'exception.

? `catch (logic_error &e)` attrape-t-il un `out_of_range` ?
+ Oui, car out_of_range dérive de logic_error
- Non, il faut catch(out_of_range)
- Seulement avec catch(...)
= catch(T) attrape T et ses dérivées.
```

---
id: references-new-delete
titre: Références, passage d'arguments et new/delete
seance: Partie I · Références, constantes, gestion dynamique
importance: 5
---

## Avant de commencer

Il faut savoir ce qu'est un pointeur : `int *p = &n;` puis `*p` désigne n.

```exercice Vérifie ton prérequis
? Avec `int n = 10; int *p = &n; *p = 30;`, que vaut n ?
reponse: 30
= p contient l'adresse de n, donc `*p = 30` écrit dans n. n vaut 30.
```

## Comment aborder ce chapitre

> [!astuce] Une référence est **un deuxième nom** pour une variable existante. Pas une copie, pas un pointeur qu'on déréférence : le même emplacement mémoire, avec un autre nom.

> [!piege] Oublier qu'en C, et par défaut en C++, les arguments sont passés **par valeur** : la fonction travaille sur une copie. Un `echange(int a, int b)` n'échange rien chez l'appelant.

À la fin, tu sais choisir entre passage par valeur, par adresse et par référence, expliquer pourquoi `fct(3)` est refusé avec `int&` mais accepté avec `const int&`, et allouer/libérer avec new/delete.

## Idée 1 · Trois façons de transmettre un argument

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Par valeur la fonction reçoit une copie ; par adresse elle reçoit un pointeur ; par référence elle reçoit un autre nom de la même case">
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<text x="105" y="20" font-weight="700">Par valeur</text>
<rect x="30" y="40" width="60" height="36" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="63">n=10</text>
<rect x="120" y="110" width="60" height="36" fill="none" stroke="#D9824F" stroke-width="2"/><text x="150" y="133">a=10</text>
<text x="105" y="165">copie : n inchangé</text>
<line x1="75" y1="78" x2="135" y2="108" stroke="#D9824F" stroke-width="2" stroke-dasharray="5 4"/>
<text x="320" y="20" font-weight="700">Par adresse</text>
<rect x="250" y="40" width="60" height="36" fill="none" stroke="currentColor" stroke-width="2"/><text x="280" y="63">n=10</text>
<rect x="330" y="110" width="70" height="36" fill="none" stroke="#D9824F" stroke-width="2"/><text x="365" y="133">a=&amp;n</text>
<line x1="350" y1="108" x2="300" y2="78" stroke="#D9824F" stroke-width="2"/>
<text x="320" y="165">*a modifie n</text>
<text x="535" y="20" font-weight="700">Par référence</text>
<rect x="490" y="60" width="90" height="40" fill="none" stroke="#D9824F" stroke-width="3"/><text x="535" y="85">n = a = 10</text>
<text x="535" y="165">même case, deux noms</text>
</g></svg>
```

```cpp
#include <iostream>
using namespace std;
void echangeV(int a, int b)   { int c = a; a = b; b = c; }
void echangeP(int *a, int *b) { int c = *a; *a = *b; *b = c; }
void echangeR(int &a, int &b) { int c = a; a = b; b = c; }
int main() {
    int n = 10, p = 20;
    echangeV(n, p);   cout << "valeur    : " << n << " " << p << "\n";
    echangeP(&n, &p); cout << "adresse   : " << n << " " << p << "\n";
    echangeR(n, p);   cout << "reference : " << n << " " << p << "\n";
    return 0;
}
```

```sortie
valeur    : 10 20
adresse   : 20 10
reference : 10 20
```

Lis les lignes une par une. Par valeur, rien ne change (10 20). Par adresse, l'échange marche (20 10), mais l'appelant doit écrire `&n`. Par référence, l'échange marche **et** l'appel s'écrit simplement `echangeR(n, p)` : on repasse de 20 10 à 10 20.

> [!retenir] `int &a` dans un en-tête = « a est transmis par référence ». Dans la fonction, on écrit `a`, sans `*`. À l'appel, on écrit `n`, sans `&`.

## Idée 2 · Référence et constance

Une référence doit être **initialisée** à sa déclaration et ne change plus de cible : `int &p = n;` est correct, `int &p;` ne l'est pas. Ensuite `p = q;` copie la **valeur** de q dans n.

```grille Ce que le compilateur accepte
#cols: Appel | void f(int&) | void f(const int&)
f(n) avec int n | oui | oui
f(3) | *non | oui (temporaire)
f(c) avec const int c | *non | oui
f(x) avec float x | *non | oui (temporaire int)
```

Avec `int&`, la fonction pourrait modifier son argument : le compilateur refuse donc les constantes et les conversions. Avec `const int&`, aucun risque : il crée au besoin une **variable temporaire** (par exemple la conversion de x en int) et transmet sa référence.

> [!piege] `int &n = 3;` est faux. `const int &n = 3;` est juste : une variable temporaire contenant 3 est créée.

## Idée 3 · Retourner une référence

Une fonction `int& f()` renvoie l'emplacement lui-même, pas une copie. Son appel devient une **lvalue** : on peut écrire `f() = 2*n + 5;`.

```cpp
#include <iostream>
using namespace std;
int& valeurRef() {
    static int x = 10;   // static : x survit à la fin de la fonction
    return x;
}
int main() {
    int& ref = valeurRef();
    cout << "Avant : " << ref << "\n";
    ref = 20;
    cout << "Apres : " << valeurRef() << "\n";
    valeurRef() = 99;            // l'appel est une lvalue
    cout << "Enfin : " << valeurRef() << "\n";
    return 0;
}
```

```sortie
Avant : 10
Apres : 20
Enfin : 99
```

> [!attention] Ne renvoie **jamais** la référence d'une variable locale non statique : elle n'existe plus après le return. Et avec `int& f()`, `return 5;` ou `return x;` (x float) sont interdits ; avec `const int& f()`, ils sont acceptés (référence à un temporaire).

**lvalue** : expression qui désigne un emplacement identifiable, modifiable (`x`). **rvalue** : valeur temporaire (`10 + 5`, `x + y`), seulement à droite d'une affectation.

## Idée 4 · new et delete

```grille C → C++
#cols: C (malloc/free) | C++ (new/delete)
ad = (int*) malloc(sizeof(int)); | ad = new int;
adc = (char*) malloc(100); | adc = new char[100];
free(ad); | delete ad;
free(adc); | delete[] adc;
```

```etapes Cycle de vie d'une zone dynamique
Allouer :: `int *p = new int(10);` réserve un int et l'initialise à 10.
Utiliser :: `*p = 100;`
Libérer :: `delete p;` (ou `delete[] t;` pour un tableau alloué avec new[]).
Neutraliser :: `p = nullptr;` évite d'utiliser une zone déjà libérée (comportement indéfini).
```

```cpp
#include <iostream>
#include <new>
using namespace std;
int main() {
    double *d = new double(3.14);
    cout << *d << "\n";
    delete d; d = nullptr;
    int *t = new int[5];
    for (int i = 0; i < 5; i++) t[i] = i * i;
    for (int i = 0; i < 5; i++) cout << t[i] << " ";
    cout << "\n";
    delete[] t;
    int *q = new (nothrow) int;      // renvoie nullptr au lieu de lever bad_alloc
    if (q) { *q = 100; cout << "Valeur: " << *q << "\n"; delete q; }
    return 0;
}
```

```sortie
3.14
0 1 4 9 16 
Valeur: 100
```

> [!retenir] Chaque `new` a son `delete`, chaque `new[]` a son `delete[]`. Un oubli = **fuite de mémoire**. Par défaut, un new qui échoue lève `std::bad_alloc` ; `new(nothrow)` renvoie `nullptr`.

## S'exercer

```exercice Exercices du TD1
? {references-new-delete} (TD1, ex. 1.6) Réécris avec new et delete : `adi = malloc(sizeof(int)); add = malloc(sizeof(double)*100); ... free(adi); free(add);`
= `adi = new int;` puis `add = new double[100];` puis `delete adi;` et `delete[] add;` (crochets car add est un tableau).

? {references-new-delete} (TD1, ex. 1.4) Écris une fonction d'échange de deux int par adresse, puis par référence, avec leurs appels.
= Par adresse : `void echange(int *a, int *b){ int c=*a; *a=*b; *b=c; }`, appel `echange(&n, &p);`. Par référence : `void echange(int &a, int &b){ int c=a; a=b; b=c; }`, appel `echange(n, p);`. Les deux noms peuvent coexister : les signatures diffèrent.

? {references-new-delete} Avec `void f(int &n); float x;`, l'appel `f(x)` compile-t-il ? Et avec `void g(const int &n);`, `g(x)` ?
reponse: non
= `f(x)` est refusé : un `int&` ne peut pas désigner un float (pas de conversion avec une référence non constante). `g(x)` est accepté : un int temporaire reçoit la conversion de x.
```

## Flashcards

```cartes
Passage par valeur :: La fonction reçoit une copie : l'original n'est pas modifié.
Passage par référence :: `void f(int &a)` ; appel `f(n)` ; a et n sont le même emplacement.
`int &p;` sans initialisation :: Erreur : une référence doit être initialisée à sa déclaration.
`const int &n = 3;` :: Correct : référence à une variable temporaire contenant 3.
Pourquoi `fct(3)` est refusé avec `void fct(int&)` ? :: fct pourrait modifier son argument, or 3 est une constante.
Retour par référence :: L'appel devient une lvalue : `f() = 5;` possible. Ne jamais renvoyer une locale.
new[] se libère avec… :: delete[]
Après delete p, bonne pratique :: `p = nullptr;`
```

## QCM du chapitre

```qcm
? Après `void f(int a){ a = 0; }` et `int n = 5; f(n);`, que vaut n ?
+ 5
- 0
- Indéterminé
= Passage par valeur : f modifie une copie.

? Comment appelle-t-on `void echange(int &a, int &b)` ?
- `echange(&n, &p);`
+ `echange(n, p);`
- `echange(*n, *p);`
= Le compilateur gère lui-même la transmission par adresse.

? Laquelle de ces déclarations est correcte ?
- `int &r;`
- `int &r = 3;`
+ `const int &r = 3;`
= Seule une référence à une constante peut être liée à une constante (via un temporaire).

? Avec `void fct(const int &);` et `float x;`, l'appel `fct(x)` :
- Est refusé
+ Crée un int temporaire contenant la conversion de x
- Modifie x
= const int& accepte une conversion grâce à un temporaire.

? Après `int n = 1, q = 7; int &p = n; p = q;`, que se passe-t-il ?
- p devient une référence à q
+ n prend la valeur 7
- Erreur de compilation
= Une référence ne change jamais de cible : p = q copie la valeur.

? Quelle fonction peut s'utiliser à gauche d'une affectation : `f() = 3;` ?
- `int f();`
+ `int& f();`
- `void f();`
= Un retour par référence fait de l'appel une lvalue.

? Avec `int& f(){ ... }`, quelle instruction est interdite ?
+ `return 5;`
- `return n;` (n int global)
- `return t[0];` (t tableau global d'int)
= On ne peut pas renvoyer une référence non constante à une constante.

? Comment libérer `char *adc = new char[100];` ?
- `delete adc;`
+ `delete[] adc;`
- `free(adc);`
= Un tableau alloué par new[] se libère par delete[].

? Par défaut, que fait new si l'allocation échoue ?
- Renvoie NULL
+ Lève l'exception std::bad_alloc
- Arrête le programme sans message
= Pour obtenir nullptr, il faut `new(nothrow)`.

? Laquelle est une rvalue ?
- `x` (int x)
+ `x + y`
- `*p` (p int*)
= x + y est un résultat temporaire sans adresse identifiable.
```

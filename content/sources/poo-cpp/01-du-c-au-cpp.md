---
id: du-c-au-cpp
titre: Du C au C++ · prototypes, cout/cin, surdéfinition, arguments par défaut
seance: Partie I · Syntaxe du C++ (différences avec le C)
importance: 4
---

## Avant de commencer

Tu dois savoir écrire une fonction en C : en-tête, prototype, appel. Le C++ part de là et ajoute des règles plus strictes et quelques facilités.

```exercice Vérifie ton prérequis
? En C, quelle est la différence entre le **prototype** et la **définition** d'une fonction ?
indice: L'un se termine par un point-virgule, l'autre par un bloc { }.
= Le prototype annonce la fonction (type de retour, types des arguments) : `double Add(int, double);`. La définition donne son corps : `double Add(int u, double v) { return u + v; }`. Le compilateur a besoin du prototype pour vérifier un appel placé avant la définition.
```

## Comment aborder ce chapitre

> [!astuce] Le prof résume le langage par une formule : **C++ = C + E + S + P**. C, c'est le C ANSI. E, les **écarts** (règles plus strictes). S, les **spécificités** hors objet (références, surdéfinition, new/delete, inline…). P, la **programmation objet**. Ce chapitre couvre E et une partie de S.

> [!piege] Croire que tout programme C compile en C++. Faux : `fct(int, double);` sans type de retour, `float f(void)` mélangé, ou `int *p = malloc(...)` sans cast sont refusés ou interprétés autrement.

À la fin, tu sais repérer ce qu'un compilateur C++ refuse dans un code C, afficher et lire avec `cout`/`cin`, et prédire quelle version d'une fonction surdéfinie est appelée.

## Idée 1 · Les quatre piliers de la POO

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Quatre notions : objet égale méthodes plus données, encapsulation, classe, héritage et polymorphisme">
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<rect x="10" y="20" width="140" height="100" rx="10" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="80" y="50" font-weight="700">Objet</text><text x="80" y="75">méthodes</text><text x="80" y="95">+ données</text>
<rect x="170" y="20" width="140" height="100" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="240" y="50" font-weight="700">Encapsulation</text><text x="240" y="75">accès aux données</text><text x="240" y="95">par les méthodes</text>
<rect x="330" y="20" width="140" height="100" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="400" y="50" font-weight="700">Classe</text><text x="400" y="75">un « type » ;</text><text x="400" y="95">objet = instance</text>
<rect x="490" y="20" width="140" height="100" rx="10" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="560" y="50" font-weight="700">Héritage</text><text x="560" y="75">+ polymorphisme :</text><text x="560" y="95">spécialiser, redéfinir</text>
</g></svg>
```

Un **objet** associe des données et les fonctions qui agissent dessus (Méthodes + Données = Objet). L'**encapsulation** interdit de toucher aux données directement : on passe par les méthodes. Une **classe** décrit un ensemble d'objets de même structure ; chaque objet est une **instance**. En C++, on dit « membres données » et « fonctions membres ».

## Idée 2 · Ce que le C++ refuse alors que le C l'acceptait

```grille Écarts C → C++
#cols: Situation | C ANSI | C++
En-tête ancienne forme | accepté | *refusé
Appel sans prototype | int supposé | *refusé
Fonction sans argument | f(void) | f()
Fonction sans retour | void conseillé | *void obligatoire
void* vers int* | implicite | *cast obligatoire
```

Trois règles à retenir :

- Un appel n'est accepté que si le compilateur connaît **le type des arguments et du retour** (prototype ou définition placée avant).
- Écrire `fct(int, double);` déclare une fonction qui **renvoie un int**. Pour « rien », écris `void`.
- `int* → void*` est implicite, mais `void* → int*` demande un cast : `adi = (int*) gen;`.

Au moment de l'appel, le compilateur convertit les arguments si besoin, même avec perte (`double → int`) : `Add(z, n)` convertit z en int et n en double.

## Idée 3 · Entrées-sorties avec cout et cin

```flux Le flot de sortie
valeurs -> opérateur << -> cout -> écran
```

`cout << "valeur : " << n;` remplace `printf`. `cin >> n >> x;` remplace `scanf`, sans `&` ni `%d`. Il faut `#include <iostream>` et `using namespace std;`.

```cpp
#include <iostream>
using namespace std;
int main() {
    int n = 25;
    float x = 12.3456789;
    double y = 12.3456789e16;
    char c = 'a';
    cout << "valeur de n : " << n << "\n";
    cout << "caractere c : " << c << "\n";
    cout << "valeur de x : " << x << "\n";
    cout << "valeur de y : " << y << "\n";
    return 0;
}
```

```sortie
valeur de n : 25
caractere c : a
valeur de x : 12.3457
valeur de y : 1.23457e+17
```

`cout` affiche par défaut 6 chiffres significatifs : 12.3456789 devient 12.3457.

> [!attention] Les diapos écrivent `main()` sans type. Un compilateur récent l'accepte parfois avec un avertissement, mais la forme correcte est `int main()`. Les diapos montrent aussi `1.23457e+017` : c'est l'affichage de l'ancien compilateur Windows. Avec g++ tu obtiens `1.23457e+17`.

En C++, tu peux aussi déclarer une variable **là où tu en as besoin**, y compris dans un `for` : `for (int i = 0; i < n; i++)`. Sa portée est limitée à la boucle. Et `//` commente jusqu'à la fin de la ligne.

## Idée 4 · Surdéfinition et arguments par défaut

**Surdéfinir** (surcharger), c'est donner le même nom à plusieurs fonctions. Le compilateur choisit d'après la **signature** : nombre et types des arguments. Le type de retour ne compte pas.

```cpp
#include <iostream>
using namespace std;
void test(int a)    { cout << "test numero I a = " << a << "\n"; }
void test(double a) { cout << "test numero II a = " << a << "\n"; }
void fct(int a, int b = 12) {          // b vaut 12 si on l'omet
    cout << "premier : " << a << " second : " << b << "\n";
}
int main() {
    int n = 5; double x = 2.5; char c = 'A'; float y = 1.5;
    test(n); test(x);
    test(c);   // char -> int : test I
    test(y);   // float -> double : test II
    fct(10, 20);
    fct(10);
    return 0;
}
```

```sortie
test numero I a = 5
test numero II a = 2.5
test numero I a = 65
test numero II a = 1.5
premier : 10 second : 20
premier : 10 second : 12
```

```etapes Choisir la fonction appelée
Correspondance exacte :: si un prototype a exactement les types des arguments, il gagne.
Promotions :: sinon char et short deviennent int, float devient double.
Conversions usuelles :: sinon on essaie les autres conversions (int ↔ double…).
Une seule gagnante ? :: si deux candidates sont aussi bonnes l'une que l'autre : erreur de compilation (ambiguïté).
```

Exemple d'ambiguïté du cours : avec `essai(int, double)` et `essai(double, int)`, l'appel `essai(n, p)` (deux int) est refusé. Il faudrait convertir un argument dans les deux cas : aucune n'est meilleure.

> [!retenir] Les arguments par défaut se mettent **dans le prototype**, de **droite à gauche** : `void f(int a, int b = 12);` est valide, `void f(int a = 0, int b);` ne l'est pas.

> [!piege] `void truc(int)` et `void truc(const int)` sont **la même** signature (erreur). En revanche `chose(int*)` et `chose(const int*)`, ou `chose(int&)` et `chose(const int&)`, sont **différentes** : la seconde est choisie pour une constante.

Une fonction **en ligne** (`inline`) demande au compilateur de recopier son corps à l'endroit de l'appel : plus rapide pour les fonctions courtes.

## S'exercer

```exercice Exercices du TD1
? {du-c-au-cpp} (TD1, ex. 1.1) Ce code C est compilé en C++ : `int main(){ int a=10,b=20,c; c=fct(a,b); printf(...); return 0; } fct(int x, int y){ return x*x + x*y + y*y; }`. Quelles erreurs ? Rends `fct` en ligne.
indice: Que sait le compilateur de fct au moment de l'appel ? Et quel est son type de retour ?
= 1) `fct` est appelée avant d'être déclarée : C++ exige un prototype. 2) L'en-tête `fct(int x, int y)` n'a pas de type de retour : écris `int`. 3) `printf` exige `#include <cstdio>`.
Correction : placer avant main `inline int fct(int x, int y) { return x*x + x*y + y*y; }` (définition en ligne placée avant l'appel).

? {du-c-au-cpp} (TD1, ex. 1.5) Prototypes : I `int fct(int)`, II `int fct(float)`, III `void fct(int,float)`, IV `void fct(float,int)`. Variables : int n,p ; float x ; char c ; double z. Quelle fonction pour `fct(n)`, `fct(c)`, `fct(n,x)`, `fct(n,p)`, `fct(z)`, `fct(n,z)` ?
indice: Correspondance exacte d'abord, puis promotions, puis conversions. Deux candidates équivalentes = erreur.
= `fct(n)` → I. `fct(c)` → I (promotion char → int). `fct(n,x)` → III. `fct(n,p)` → **erreur** : III et IV demandent chacune une conversion, ambiguïté. `fct(z)` → **erreur** : double → int et double → float sont deux conversions de même rang. `fct(n,z)` → III (z converti en float ; IV demanderait deux conversions).

? {du-c-au-cpp} (TD1, ex. 1.3) Réécris en C++ sans printf ni scanf : lire un entier n et un flottant x, puis afficher leur produit.
= `#include <iostream>` puis `using namespace std;`, et dans `int main()` : `int n; float x; cout << "donnez un entier et un flottant\n"; cin >> n >> x; cout << "le produit de " << n << " par " << x << "\nest : " << n*x << "\n";`
```

## Flashcards

```cartes
Formule du C++ selon le cours :: C++ = C + E + S + P (C ANSI, Écarts, Spécificités hors objet, POO).
Équation de la POO :: Méthodes + Données = Objet.
Encapsulation :: On n'agit sur les données d'un objet qu'à travers ses méthodes.
Que signifie `fct(int, double);` en C++ ? :: Une fonction qui renvoie un **int** (et non void).
Conversion void* → int* en C++ :: Interdite implicitement : il faut un cast `(int*)`.
Sur quoi se base le choix d'une fonction surdéfinie ? :: Sur la signature : nombre et types des arguments (pas le type de retour).
Où mettre les valeurs par défaut ? :: Dans le prototype, à partir de la droite.
truc(int) et truc(const int) :: Même signature : erreur de compilation.
```

## QCM du chapitre

```qcm
? Dans la formule C++ = C + E + S + P, que désigne P ?
- Les pointeurs
+ Les possibilités de programmation orientée objet
- Les prototypes
= E = écarts, S = spécificités hors objet, P = POO.

? En C++, une fonction sans argument se déclare plutôt :
- `float fct(void...);`
+ `float fct();`
- `fct float();`
= Le C++ accepte une liste vide ; `void` reste toléré mais n'est pas nécessaire.

? Que signifie la déclaration `fct(int, double);` en C++ ?
- fct ne renvoie rien
+ fct renvoie un int
- C'est une erreur de syntaxe toujours
= Sans type de retour, l'ancienne règle « int par défaut » s'applique dans le cours. Pour ne rien renvoyer, il faut `void`.

? Avec `void* gen; int* adi;`, laquelle est acceptée en C++ sans cast ?
+ `gen = adi;`
- `adi = gen;`
- Aucune des deux
= Seule la conversion vers void* est implicite.

? Quel fichier d'en-tête pour cout et cin ?
- stdio.h
+ iostream
- stdlib.h
= Les entrées-sorties du C++ sont déclarées dans `<iostream>`.

? `float x = 12.3456789; cout << x;` affiche :
- 12.3456789
+ 12.3457
- 12.34
= Par défaut, 6 chiffres significatifs.

? Avec `void test(int); void test(double); float y;`, l'appel `test(y)` appelle :
- test(int)
+ test(double)
- Erreur d'ambiguïté
= float → double est une promotion, meilleure qu'une conversion vers int.

? Avec `essai(int,double)` et `essai(double,int)`, l'appel `essai(n,p)` avec deux int :
- Appelle essai(int,double)
- Appelle essai(double,int)
+ Provoque une erreur d'ambiguïté
= Chaque candidate demande une conversion : aucune n'est meilleure.

? Quelle déclaration est correcte ?
+ `void f(int a, int b = 12);`
- `void f(int a = 0, int b);`
- `void f(int = 0, int);`
= Les valeurs par défaut partent de la droite.

? Quelles déclarations peuvent coexister ?
- `void truc(int);` et `void truc(const int);`
+ `void chose(int&);` et `void chose(const int&);`
- `int g(int);` et `double g(int);`
= Le const sur une valeur copiée ne change pas la signature, le type de retour non plus ; const sur une référence, si.
```

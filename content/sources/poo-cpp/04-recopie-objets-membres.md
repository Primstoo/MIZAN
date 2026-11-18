---
id: recopie-objets-membres
titre: Constructeur de recopie, objets membres et liste d'initialisation
seance: Partie II · Initialisation des objets
importance: 5
---

## Avant de commencer

Il faut maîtriser le constructeur, le destructeur et new/delete (chapitres 2 et 3).

```exercice Vérifie ton prérequis
? Une classe `vect` fait `adr = new double[n];` dans son constructeur. Que doit contenir son destructeur ?
= `delete[] adr;` : chaque new[] du constructeur doit être libéré par un delete[] dans le destructeur, sinon fuite de mémoire.
```

## Comment aborder ce chapitre

> [!astuce] Dès qu'une classe contient un **pointeur vers une zone dynamique**, pose-toi trois questions : que se passe-t-il quand on **copie** l'objet ? quand on **l'affecte** ? quand on **le détruit** ? Ce chapitre traite la copie ; l'affectation vient au chapitre 5.

> [!piege] La copie par défaut recopie **le pointeur**, pas le tableau pointé. Deux objets partagent alors le même tableau, et les deux destructeurs le libèrent : double delete, plantage.

À la fin, tu sais quand le constructeur de recopie est appelé, pourquoi l'écrire, et comment initialiser des objets membres avec la syntaxe `: centre(abs, ord)`.

## Idée 1 · Les trois appels du constructeur de recopie

Le constructeur de recopie a pour prototype `classe(const classe &)`. Il crée un objet **neuf** à partir d'un objet existant de même type.

```etapes Quand est-il appelé ?
1. Initialisation :: `point b = a;` ou `point b(a);`
2. Passage par valeur :: `void fct(vect b)` appelée par `fct(a)` : b est une copie de a.
3. Retour par valeur :: `return res;` dans une fonction qui renvoie un objet (le compilateur peut supprimer cette copie).
Pas lui ! :: `b = a;` entre deux objets **déjà existants** appelle l'opérateur =, pas le constructeur de recopie.
```

> [!retenir] Pourquoi `const classe &` et pas `classe` ? Si l'argument était passé par valeur, il faudrait… le copier, donc appeler le constructeur de recopie, à l'infini.

## Idée 2 · Le danger de la recopie par défaut

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Copie par défaut : a et b pointent vers le même tableau. Copie écrite : b a son propre tableau">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<text x="160" y="18" font-weight="700">Recopie par défaut</text>
<rect x="30" y="35" width="80" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="70" y="57">a.adr</text>
<rect x="30" y="105" width="80" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="70" y="127">b.adr</text>
<rect x="190" y="70" width="110" height="34" fill="none" stroke="#D9824F" stroke-width="3"/><text x="245" y="92">tableau</text>
<line x1="110" y1="52" x2="190" y2="82" stroke="#D9824F" stroke-width="2"/><line x1="110" y1="122" x2="190" y2="94" stroke="#D9824F" stroke-width="2"/>
<text x="160" y="162" fill="#D9824F">un seul tableau, deux delete</text>
<text x="490" y="18" font-weight="700">Recopie écrite</text>
<rect x="360" y="35" width="80" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="400" y="57">a.adr</text>
<rect x="360" y="105" width="80" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="400" y="127">b.adr</text>
<rect x="510" y="35" width="110" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="565" y="57">tableau 1</text>
<rect x="510" y="105" width="110" height="34" fill="none" stroke="currentColor" stroke-width="2"/><text x="565" y="127">tableau 2 (copie)</text>
<line x1="440" y1="52" x2="510" y2="52" stroke="currentColor" stroke-width="2"/><line x1="440" y1="122" x2="510" y2="122" stroke="currentColor" stroke-width="2"/>
<text x="490" y="162">chacun libère le sien</text>
</g></svg>
```

L'exemple du cours : `vect a(5); fct(a);` avec `void fct(vect b)`. Sans recopie écrite, b copie le pointeur de a ; à la sortie de fct, le destructeur de b libère le tableau de a. Voici la version corrigée, avec une recopie profonde.

```cpp
#include <iostream>
using namespace std;
class vect {
    int nelem;
    double *adr;
public:
    vect(int n) { adr = new double[nelem = n]; cout << "+ const. usuel\n"; }
    vect(const vect &v) {                      // constructeur de recopie
        nelem = v.nelem;
        adr = new double[nelem];               // nouveau tableau
        for (int i = 0; i < nelem; i++) adr[i] = v.adr[i];
        cout << "+ const. recopie\n";
    }
    ~vect() { cout << "- destr.\n"; delete[] adr; }
};
void fct(vect b) { cout << "*** appel de fct ***\n"; }
int main() {
    vect a(5);
    fct(a);
    return 0;
}
```

```sortie
+ const. usuel
+ const. recopie
*** appel de fct ***
- destr.
- destr.
```

> [!attention] Les diapos libèrent le tableau avec `delete adr;`. Pour une zone allouée par `new double[...]`, il faut `delete[] adr;`. Les adresses affichées dans les diapos (006AFDE4…) dépendent de la machine : on ne les reproduit pas.

## Idée 3 · Objet renvoyé par valeur

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs = 0, int ord = 0) { x = abs; y = ord; cout << "++ usuel " << x << " " << y << "\n"; }
    point(const point &p) { x = p.x; y = p.y; cout << "++ recopie " << x << " " << y << "\n"; }
    ~point() { cout << "-- destr " << x << " " << y << "\n"; }
    point symetrique() { point res; res.x = -x; res.y = -y; return res; }
};
int main() {
    point a(1, 3), b;
    cout << "** avant appel\n";
    b = a.symetrique();
    cout << "** apres appel\n";
    return 0;
}
```

```sortie
++ usuel 1 3
++ usuel 0 0
** avant appel
++ usuel 0 0
-- destr -1 -3
** apres appel
-- destr -1 -3
-- destr 1 3
```

> [!attention] Dans les diapos, on voit en plus « ++ Appel Const. recopie -1 -3 » suivi d'une destruction : c'est la copie de `res` vers un objet temporaire. Les compilateurs actuels (g++ en C++17) **suppriment** souvent cette copie (« élision de copie »). À l'examen, raisonne comme le prof : un retour par valeur **peut** appeler le constructeur de recopie.

Remarque : `point a = 3;` équivaut à `point a(3);` (constructeur à un argument), et `point b = a;` équivaut à `point b(a);` (recopie).

## Idée 4 · Objets membres et liste d'initialisation

Une classe peut contenir un objet d'une autre classe. Son constructeur se choisit **dans l'en-tête** du constructeur englobant, après les deux-points.

```cpp
#include <iostream>
using namespace std;
class point {
    int x, y;
public:
    point(int abs, int ord) : x(abs), y(ord) { cout << "Constr. point " << x << " " << y << "\n"; }
    ~point() { cout << "Destr. point\n"; }
};
class cercle {
    point centre;          // objet membre
    int rayon;
public:
    cercle(int abs, int ord, int ray) : centre(abs, ord) {
        rayon = ray;
        cout << "Constr. cercle " << rayon << "\n";
    }
    ~cercle() { cout << "Destr. cercle\n"; }
};
int main() {
    cercle c(1, 2, 5);
    return 0;
}
```

```sortie
Constr. point 1 2
Constr. cercle 5
Destr. cercle
Destr. point
```

```flux Ordre de construction puis de destruction
membre centre -> corps de cercle -> ... -> ~cercle -> ~point
```

> [!retenir] Les objets membres sont **construits avant** le corps du constructeur englobant et **détruits après** son destructeur. La liste d'initialisation sert aussi pour les membres simples : `point(int abs=0, int ord=0) : x(abs), y(ord) {}`.

## S'exercer

```exercice S'entraîner
? {recopie-objets-membres} Dans `vect a(5); vect b = a; vect c(3); c = a;`, combien de fois le constructeur de recopie est-il appelé ?
reponse: 1
= Seulement pour `vect b = a;` (création). `c = a;` affecte un objet déjà existant : c'est l'opérateur =.

? {recopie-objets-membres} Pourquoi le prototype `vect(vect v)` est-il refusé pour un constructeur de recopie ?
= Passer v par valeur demanderait de copier l'argument, donc d'appeler… le constructeur de recopie lui-même : récursion infinie. Il faut une référence, de préférence `const vect &`.

? {recopie-objets-membres} Écris le constructeur d'une classe `segment` contenant deux objets membres `point debut, fin;` (point n'a qu'un constructeur `point(int,int)`).
= `segment(int x1, int y1, int x2, int y2) : debut(x1, y1), fin(x2, y2) {}`. Sans cette liste, le compilateur chercherait un constructeur `point()` sans argument, qui n'existe pas : erreur.
```

## Flashcards

```cartes
Prototype du constructeur de recopie :: `classe(const classe &);`
Trois cas d'appel du constructeur de recopie :: Initialisation par un objet, passage par valeur, retour par valeur.
`b = a;` entre objets existants appelle… :: L'opérateur d'affectation =, pas le constructeur de recopie.
Problème de la recopie par défaut avec un pointeur :: Les deux objets partagent la même zone : double libération.
Recopie profonde :: Allouer un nouveau tableau puis recopier les éléments un par un.
Syntaxe pour initialiser un objet membre :: `cercle(int a, int o, int r) : centre(a, o) { ... }`
Ordre : objet membre ou objet englobant ? :: Membre construit d'abord, détruit en dernier.
`point a = 3;` équivaut à… :: `point a(3);`
```

## QCM du chapitre

```qcm
? Quel est le prototype usuel du constructeur de recopie de point ?
- `point(point p);`
+ `point(const point &p);`
- `point operator=(const point &p);`
= Référence obligatoire, const conseillé.

? Lequel n'appelle PAS le constructeur de recopie ?
- `point b = a;`
- `fct(a);` avec `void fct(point p)`
+ `b = a;` avec b déjà déclaré
= Pour deux objets existants, c'est l'opérateur =.

? Quand la recopie par défaut pose-t-elle problème ?
- Quand la classe a des membres int
+ Quand la classe contient un pointeur vers une zone allouée dynamiquement
- Jamais
= Elle copie l'adresse, pas la zone pointée.

? `void fct(point p)` appelée avec `fct(a)` : combien de destructeurs s'exécutent à la fin de main ?
- 1
+ 2
- 3
= Celui de la copie p (en sortant de fct) et celui de a.

? Dans un constructeur de recopie profonde de vect, on doit :
+ Allouer un nouveau tableau et recopier les éléments
- Copier le pointeur adr
- Appeler delete[] v.adr
= On crée une zone propre au nouvel objet.

? Comment initialiser l'objet membre centre dans cercle ?
- `cercle(int a, int o, int r) { centre(a, o); }`
+ `cercle(int a, int o, int r) : centre(a, o) { ... }`
- `cercle(int a, int o, int r) : point(a, o) { ... }`
= On nomme le membre dans la liste d'initialisation.

? Ordre d'affichage pour `cercle c(1,2,5);` puis fin de main ?
+ Constr. point, Constr. cercle, Destr. cercle, Destr. point
- Constr. cercle, Constr. point, Destr. point, Destr. cercle
- Constr. point, Constr. cercle, Destr. point, Destr. cercle
= Membres construits d'abord, détruits en dernier.

? Un objet créé par `new point(1,4)` est détruit :
- À la fin du bloc
- À la fin de main
+ Par `delete`
= Un objet dynamique n'a pas de durée de vie fixée d'avance.

? Que crée `a = point(1, 2);` ?
+ Un objet temporaire, affecté à a puis détruit
- Un nouvel objet nommé point
- Rien, c'est une erreur
= Appel explicite du constructeur : objet temporaire.

? Pourquoi un compilateur moderne peut-il afficher moins de recopies que les diapos pour un retour par valeur ?
- Parce que le constructeur de recopie est ignoré s'il affiche du texte
+ Parce qu'il supprime la copie inutile (élision de copie)
- Parce que les objets locaux ne sont jamais copiés en C++
= C++17 autorise, et parfois impose, cette optimisation.
```

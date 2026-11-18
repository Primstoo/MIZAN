---
id: piles
titre: Piles (LIFO) · tableau et liste chaînée
seance: Chapitre III · Piles et files (1)
importance: 5
---

## Avant de commencer

Une pile est une liste où l'on ne touche qu'**un seul bout**. Il te faut l'insertion et la suppression en tête d'une liste simple (chapitre 2).

```exercice Vérifie ton prérequis
? Dans une liste simple, quelle insertion et quelle suppression sont en O(1) ?
= L'insertion **en tête** et la suppression **en tête**. C'est pour ça que le sommet d'une pile chaînée est la tête de la liste.
```

## Comment aborder ce chapitre

> [!astuce] Pense à une pile d'assiettes : on pose sur le dessus, on prend sur le dessus. Le seul repère est le **sommet**.

> [!piege] Dans la version tableau, `top` est l'indice du **dernier élément**, pas le nombre d'éléments. Pile vide : `top == -1`. Pile pleine : `top == MAX_SIZE - 1`.

À la fin, tu sais écrire une pile en tableau et en liste chaînée, avec `empiler`, `depiler`, `sommet`, `estVide`, `viderPile`.

## Idée 1 · LIFO : dernier entré, premier sorti

Exemple du cours : on empile 6, 3, 16, on dépile, puis on empile 87.

```html
<svg viewBox="0 0 600 170" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Evolution de la pile : 6 ; 6 3 ; 6 3 16 ; après dépilement 6 3 ; puis 6 3 87">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<g transform="translate(20,0)"><rect x="0" y="110" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="129">6</text><text x="35" y="160">push 6</text></g>
<g transform="translate(135,0)"><rect x="0" y="110" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="129">6</text><rect x="0" y="82" width="70" height="28" fill="none" stroke="#D9824F" stroke-width="2"/><text x="35" y="101">3</text><text x="35" y="160">push 3</text></g>
<g transform="translate(250,0)"><rect x="0" y="110" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="129">6</text><rect x="0" y="82" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="101">3</text><rect x="0" y="54" width="70" height="28" fill="none" stroke="#D9824F" stroke-width="2"/><text x="35" y="73">16</text><text x="35" y="160">push 16</text></g>
<g transform="translate(365,0)"><rect x="0" y="110" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="129">6</text><rect x="0" y="82" width="70" height="28" fill="none" stroke="#D9824F" stroke-width="2"/><text x="35" y="101">3</text><text x="35" y="40" fill="#D9824F">16 sort</text><text x="35" y="160">pop</text></g>
<g transform="translate(480,0)"><rect x="0" y="110" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="129">6</text><rect x="0" y="82" width="70" height="28" fill="none" stroke="currentColor" stroke-width="2"/><text x="35" y="101">3</text><rect x="0" y="54" width="70" height="28" fill="none" stroke="#D9824F" stroke-width="2"/><text x="35" y="73">87</text><text x="35" y="160">push 87</text></g>
</g></svg>
```

Opérations : **empiler** (push), **dépiler** (pop), **sommet** (peek, lire sans retirer), **estVide**, **estPleine** (tableau seulement). Usages du cours : annuler (Undo), historique d'un navigateur, parcours en profondeur.

## Idée 2 · Pile en tableau : un indice `top`

```c
#include <stdio.h>
#define MAX_SIZE 100

typedef struct { int data[MAX_SIZE]; int top; } Pile;

void init(Pile *s) { s->top = -1; }
int estVide(Pile *s) { return s->top == -1; }
void empile(Pile *s, int value) {
    if (s->top == MAX_SIZE - 1) { printf("La pile est pleine.\n"); return; }
    s->top++;
    s->data[s->top] = value;
}
int depile(Pile *s) {
    if (estVide(s)) { printf("La pile est vide.\n"); return -1; }
    return s->data[s->top--];
}
int peek(Pile *s) {
    if (estVide(s)) { printf("La pile est vide.\n"); return -1; }
    return s->data[s->top];
}
void afficherPile(Pile *s) {
    printf("Pile : ");
    for (int i = s->top; i >= 0; i--) printf("%d ", s->data[i]);
    printf("\n");
}
int main(void) {
    Pile p; init(&p);
    empile(&p, 6); empile(&p, 3); empile(&p, 16);
    printf("depile : %d\n", depile(&p));
    empile(&p, 87);
    afficherPile(&p);
    printf("sommet : %d, top = %d\n", peek(&p), p.top);
    return 0;
}
```

```sortie
depile : 16
Pile : 87 3 6 
sommet : 87, top = 2
```

> [!attention] Dans les diapos, `peek` et `depile` font `return ;` (sans valeur) quand la pile est vide, alors qu'elles retournent un `int`. C'est un comportement indéfini. Retourne une valeur d'erreur, comme `-1` (choix fait aussi dans la version chaînée du cours).

## Idée 3 · Pile chaînée : le sommet est la tête

```flux Pile chaînée après empiler 10, 20, 30
pile (sommet) -> 30 -> 20 -> 10 -> NULL
```

Empiler = insérer en tête, dépiler = supprimer en tête. Pas de limite de taille, pas de `estPleine`.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Noeud { int donnee; struct Noeud *suivant; } Noeud;

void initialiser(Noeud **pile) { *pile = NULL; }
int estVide(Noeud *pile) { return pile == NULL; }
Noeud *empiler(Noeud *pile, int valeur) {
    Noeud *n = malloc(sizeof(Noeud));
    if (n == NULL) { printf("Erreur d'allocation\n"); return pile; }
    n->donnee = valeur; n->suivant = pile;
    return n;
}
int depiler(Noeud **pile) {
    if (estVide(*pile)) { printf("pile vide\n"); return -1; }
    Noeud *temp = *pile;
    int val = temp->donnee;
    *pile = temp->suivant;
    free(temp);
    return val;
}
int sommet(Noeud *pile) { return estVide(pile) ? -1 : pile->donnee; }
int taille_pile(Noeud *pile) {
    int c = 0;
    for (; pile != NULL; pile = pile->suivant) c++;
    return c;
}
void afficher(Noeud *pile) {
    printf("Pile :");
    for (; pile != NULL; pile = pile->suivant) printf(" %d", pile->donnee);
    printf("\n");
}
Noeud *viderPile(Noeud *pile) {
    while (!estVide(pile)) depiler(&pile);
    return NULL;
}
int main(void) {
    Noeud *pile;
    initialiser(&pile);
    pile = empiler(pile, 10); pile = empiler(pile, 20); pile = empiler(pile, 30);
    afficher(pile);
    printf("taille %d, sommet %d\n", taille_pile(pile), sommet(pile));
    printf("depile : %d\n", depiler(&pile));
    afficher(pile);
    pile = viderPile(pile);
    printf("vide ? %d\n", estVide(pile));
    return 0;
}
```

```sortie
Pile : 30 20 10
taille 3, sommet 30
depile : 30
Pile : 20 10
vide ? 1
```

> [!attention] Diapo `push` : en cas d'échec de `malloc`, elle fait `return ;` dans une fonction qui retourne `Noeud*`. On retourne plutôt `pile` inchangée. La diapo écrit aussi `Nœud**` (avec œ) dans `pop` : ce n'est pas un identifiant C valide, c'est `Noeud`.

## S'exercer

```exercice Exercices types (TD2, TP2)
? Écris `Noeud* inverse_pile(Noeud *pile)` (TD2 / TP2 question 8).
indice: Dépile tout dans une nouvelle pile.
= `Noeud *r = NULL; while (!estVide(pile)) r = empiler(r, depiler(&pile)); return r;` Le sommet devient la base.

? Écris `copierPile` qui renvoie une copie **indépendante** dans le même ordre (TP2 question 11).
= Deux passages : on parcourt la pile en empilant dans une pile `tmp` (ordre inversé), puis on parcourt `tmp` en empilant dans `copie` (ordre rétabli), et on vide `tmp`. On n'a pas le droit de faire `copie = pile` : ce serait le même chaînage.

? Pile tableau vide puis : empile 5, empile 8, depile, empile 2, empile 9. Que vaut `top` ?
reponse: 2
= 3 éléments (5, 2, 9) aux indices 0, 1, 2 : top = 2.
```

## Flashcards

```cartes
Principe de la pile :: LIFO : dernier entré, premier sorti.
Pile tableau vide :: `top == -1`.
Pile tableau pleine :: `top == MAX_SIZE - 1`.
Empiler (tableau) :: Vérifier pleine, `top++`, `data[top] = v`.
Dépiler (tableau) :: Vérifier vide, lire `data[top]`, `top--`.
Pile chaînée : où est le sommet ? :: En tête de liste (insertion/suppression en O(1)).
`peek` / sommet :: Lire l'élément du sommet sans le retirer.
Trois usages des piles :: Undo, historique du navigateur, parcours en profondeur.
viderPile :: Dépiler jusqu'à ce que la pile soit vide (libère chaque nœud).
```

## QCM du chapitre

```qcm
? On empile 1, 2, 3 puis on dépile une fois. On obtient :
- 1
- 2
+ 3
= Le dernier entré sort en premier.

? Dans la pile tableau du cours, `init` fait :
+ `s->top = -1;`
- `s->top = 0;`
- `s->top = MAX_SIZE;`
= -1 signifie « aucun élément ».

? Avec `top = 4`, combien d'éléments contient la pile ?
- 4
+ 5
- 3
= Indices 0 à 4.

? Pourquoi le sommet d'une pile chaînée est-il la tête ?
- par convention arbitraire
+ parce que l'insertion et la suppression en tête sont en O(1)
- parce que la queue est NULL
= En queue, il faudrait parcourir toute la liste.

? Quelle opération n'existe que pour la pile en tableau ?
- estVide
+ estPleine
- sommet
= La pile chaînée n'a pas de taille maximale.

? `peek` :
- retire le sommet
+ lit le sommet sans le retirer
- vide la pile
= C'est la définition du cours.

? Dans `depiler` (chaînée), l'ordre correct est :
+ sauver le nœud, lire la valeur, avancer la tête, `free`
- `free`, lire la valeur, avancer la tête
- avancer la tête, `free` de la tête
= Après `free`, on ne peut plus lire le nœud.

? Pourquoi `depiler` prend-il `Noeud **pile` ?
- pour aller plus vite
+ parce qu'il modifie le sommet du `main`
- parce qu'il retourne un pointeur
= Il change la tête et retourne la valeur.

? Le parcours en profondeur utilise :
+ une pile
- une file
- un tableau trié
= Explicite (DFS itératif) ou implicite (pile d'appels récursifs).

? Diapo `peek` : `return ;` dans une fonction `int` est :
- correct
+ une erreur (valeur de retour indéfinie)
- obligatoire
= Il faut retourner une valeur d'erreur, par exemple -1.
```

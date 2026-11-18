---
id: td-tp-corriges
titre: TD 1 à 3 et TP 1-2 corrigés
seance: TD1 (listes), TD2 (piles), TD3 (ABR), TP1-TP2
importance: 4
---

## Avant de commencer

Ce chapitre reprend les exercices des TD avec une correction **testée**. Lis d'abord les chapitres 2 à 8.

```exercice Vérifie ton prérequis
? Quelle est la différence entre retourner la nouvelle tête et passer `Noeud **` ?
= Les deux permettent de modifier la tête du `main`. Retour : `L = f(L, x);`. Double pointeur : `f(&L, x);`. Les corrections de TD utilisent surtout le retour.
```

## Comment aborder ce chapitre

> [!astuce] Avant de regarder une correction, écris ta version sur papier, puis teste-la sur trois cas : liste vide, un seul élément, plusieurs éléments.

> [!piege] Les cas limites. Presque toutes les erreurs trouvées dans les corrections scannées viennent du premier ou du dernier nœud.

À la fin, tu sais refaire seul les exercices des trois TD.

## Idée 1 · TD1 : liste simple (ex. 1.2) et deux défauts de la correction

```flux Exercice 1.2 : opérations demandées
Créer -> Insérer début et fin -> Afficher -> Rechercher -> Supprimer -> Compter
```

> [!attention] Correction scannée du TD1, `recherche` : la boucle est `while (temp->next != NULL)`. Elle s'arrête **avant** d'examiner le dernier nœud : chercher la dernière valeur répond « absent ». La bonne condition est `while (temp != NULL)`.

> [!attention] Correction du TD1, `supprimer` : après `while (temp->next != NULL && temp->data != val)`, on fait `prev->next = temp->next` sans vérifier qu'on a trouvé `val`. Si la valeur est absente, le **dernier nœud est supprimé** à tort. Il faut tester `if (temp->data == val)` avant de supprimer.

## Idée 2 · TD1 : fusion (1.4), doublons (1.5)

```grille Fusion de 1→4→7 et 2→3→9 : on prend à chaque fois la plus petite tête
#cols: étape1 étape2 étape3 étape4 étape5 étape6
#rows: choisi
*1 !2 !3 *4 *7 !9
```

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Noeud { int data; struct Noeud *next; } Noeud;

Noeud *inserer_en_fin(Noeud *tete, int val) {
    Noeud *n = malloc(sizeof(Noeud)), *t;
    n->data = val; n->next = NULL;
    if (tete == NULL) return n;
    for (t = tete; t->next != NULL; t = t->next);
    t->next = n;
    return tete;
}
void affiche(Noeud *t) {
    for (; t; t = t->next) printf("%d ", t->data);
    printf("\n");
}
/* Exercice 1.4 : version récursive de la correction */
Noeud *fusionner(Noeud *l1, Noeud *l2) {
    if (l1 == NULL) return l2;
    if (l2 == NULL) return l1;
    if (l1->data < l2->data) { l1->next = fusionner(l1->next, l2); return l1; }
    else { l2->next = fusionner(l1, l2->next); return l2; }
}
/* Exercice 1.5 : supprimer les doublons d'une liste triée */
void supprimer_doublons(Noeud *tete) {
    Noeud *actuel = tete;
    while (actuel != NULL && actuel->next != NULL) {
        if (actuel->data == actuel->next->data) {
            Noeud *d = actuel->next;
            actuel->next = d->next;
            free(d);
        } else actuel = actuel->next;
    }
}
int main(void) {
    Noeud *a = NULL, *b = NULL;
    int x[] = {1, 4, 7}, y[] = {2, 3, 9};
    for (int i = 0; i < 3; i++) { a = inserer_en_fin(a, x[i]); b = inserer_en_fin(b, y[i]); }
    Noeud *f = fusionner(a, b);
    affiche(f);
    Noeud *d = NULL;
    int z[] = {10, 10, 20, 30, 30, 30};
    for (int i = 0; i < 6; i++) d = inserer_en_fin(d, z[i]);
    supprimer_doublons(d);
    affiche(d);
    return 0;
}
```

```sortie
1 2 3 4 7 9 
10 20 30 
```

> [!attention] La correction de 1.5 commence par `while (actuel->next != NULL)` : sur une liste **vide**, `actuel` vaut NULL et ça plante. La version ci-dessus teste `actuel != NULL` d'abord. Elle est aussi plus simple : un seul pointeur suffit puisque la liste est triée (les doublons sont côte à côte).

> [!prof] Une correction itérative de la fusion (fiche « Correction de l'exercice 1.4 ») est aussi fournie : elle insère les nœuds de la seconde liste dans la première sans allouer de mémoire. La version récursive est plus courte et c'est celle du TD.

## Idée 3 · TD2 et TP2 : pile chaînée complète

Le TP2 demande : `initPile`, `empiler`, `depiler`, `affichage`, `taille`, `estVide`, `sommet`, `inverser`, `rechercher`, `viderPile`, `copierPile`, puis un `main` qui empile 5 éléments et teste tout.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Noeud { int donnee; struct Noeud *suivant; } Noeud;

int estVide(Noeud *p) { return p == NULL; }
Noeud *empiler(Noeud *p, int v) {
    Noeud *n = malloc(sizeof(Noeud)); n->donnee = v; n->suivant = p; return n;
}
int depiler(Noeud **p) {
    if (estVide(*p)) return -1;
    Noeud *t = *p; int v = t->donnee; *p = t->suivant; free(t); return v;
}
void affichage(Noeud *p) {
    printf("Pile (haut->bas) :");
    for (; p; p = p->suivant) printf(" %d", p->donnee);
    printf("\n");
}
int taille(Noeud *p) { int c = 0; for (; p; p = p->suivant) c++; return c; }
int rechercher(Noeud *p, int v) { for (; p; p = p->suivant) if (p->donnee == v) return 1; return 0; }
Noeud *inverser(Noeud *p) { Noeud *r = NULL; while (!estVide(p)) r = empiler(r, depiler(&p)); return r; }
Noeud *viderPile(Noeud *p) { while (!estVide(p)) depiler(&p); return NULL; }
Noeud *copierPile(Noeud *p) {
    Noeud *tmp = NULL, *copie = NULL;
    for (Noeud *q = p; q; q = q->suivant) tmp = empiler(tmp, q->donnee);
    for (Noeud *q = tmp; q; q = q->suivant) copie = empiler(copie, q->donnee);
    viderPile(tmp);
    return copie;
}
int main(void) {
    Noeud *pile = NULL;
    for (int v = 10; v <= 50; v += 10) pile = empiler(pile, v);
    affichage(pile);
    printf("taille %d, sommet %d, 30 present ? %d\n", taille(pile), pile->donnee, rechercher(pile, 30));
    Noeud *copie = copierPile(pile);
    pile = inverser(pile);
    affichage(pile);
    affichage(copie);
    pile = viderPile(pile); copie = viderPile(copie);
    printf("vides ? %d %d\n", estVide(pile), estVide(copie));
    return 0;
}
```

```sortie
Pile (haut->bas) : 50 40 30 20 10
taille 5, sommet 50, 30 present ? 1
Pile (haut->bas) : 10 20 30 40 50
Pile (haut->bas) : 50 40 30 20 10
vides ? 1 1
```

## Idée 4 · TD3 : ABR

Les exercices 3.1 à 3.8 (insérer, rechercher, trois parcours, min/max, hauteur, supprimer, libérer, `estABR`) sont tous écrits et testés dans le chapitre 8. Ce qu'il faut retenir de la correction :

```etapes estABR(r, min, max) sur 50(30,70)
Racine 50 :: INT_MIN < 50 < INT_MAX : ok. On vérifie la gauche avec max = 50 et la droite avec min = 50.
Gauche 30 :: INT_MIN < 30 < 50 : ok. Ses fils NULL renvoient 1.
Droite 70 :: 50 < 70 < INT_MAX : ok.
Résultat :: 1, c'est un ABR. Il faut `#include <limits.h>` pour INT_MIN et INT_MAX.
```

## S'exercer

```exercice TP1 et variantes
? TP1 ex. 1 : comment déclarer une liste contiguë **dynamique** de capacité choisie à l'exécution ?
= `typedef struct { int *data; int taille, capacite; } Liste;` puis `L.data = malloc(cap * sizeof(int)); L.capacite = cap; L.taille = 0;` et à la fin `free(L.data);`.

? TP1 ex. 2 : écris la suppression à la position `pos` (0 = tête) d'une liste simple.
= Si `pos == 0` : suppression en tête. Sinon, avancer `prev` de `pos - 1` pas (en vérifiant `prev->next != NULL`), puis `Noeud *d = prev->next; prev->next = d->next; free(d);`.

? Pourquoi `copierPile` ne peut pas simplement retourner `p` ?
= Les deux variables pointeraient sur **les mêmes nœuds** : vider l'une détruirait l'autre. Il faut allouer de nouveaux nœuds.

? Fusionner 1→5 et 2→3→8. Combien de nœuds a le résultat ?
reponse: 5
= 1 2 3 5 8.
```

## Flashcards

```cartes
Défaut de `recherche` (correction TD1) :: `while (temp->next != NULL)` saute le dernier nœud ; il faut `temp != NULL`.
Défaut de `supprimer` (correction TD1) :: Supprime le dernier nœud si la valeur est absente.
Principe de la fusion récursive :: La plus petite tête reste devant, son `next` = fusion du reste.
Doublons dans une liste triée :: Ils sont voisins : comparer `actuel` et `actuel->next`.
Inverser une pile :: Dépiler tout en empilant dans une nouvelle pile.
Copier une pile dans le même ordre :: Deux transferts via une pile temporaire.
Bibliothèque pour INT_MIN :: `<limits.h>`.
Tester une fonction de liste :: Liste vide, un élément, plusieurs éléments.
```

## QCM du chapitre

```qcm
? `fusionner(1→4, 2→3)` retourne :
+ 1→2→3→4
- 1→4→2→3
- 2→3→1→4
= À chaque étape, la plus petite tête.

? Après `supprimer_doublons` sur 5→5→5→6 :
- 5→5→6
+ 5→6
- 6
= Les copies voisines sont supprimées.

? Dans la correction du TD1, `recherche(liste, dernier)` :
- trouve la valeur
+ répond « absent » à tort
- plante toujours
= La boucle s'arrête avant le dernier nœud.

? `inverser` sur la pile (haut→bas) 3 2 1 donne :
+ 1 2 3
- 3 2 1
- 2 3 1
= Le fond devient le sommet.

? Combien de piles temporaires utilise `copierPile` (version ci-dessus) ?
- 0
+ 1
- 2
= `tmp`, vidée à la fin.

? Pour tester `estABR` sur toutes les valeurs possibles, on appelle :
+ `estABR(r, INT_MIN, INT_MAX)`
- `estABR(r, 0, 0)`
- `estABR(r, r->val, r->val)`
= Bornes les plus larges.

? La fusion récursive alloue :
- un nœud par élément
+ aucun nœud
- deux listes neuves
= Elle recâble les nœuds existants.

? Le TP2 demande l'affichage de la pile :
+ de haut en bas
- de bas en haut
- dans un ordre aléatoire
= Du sommet vers la base.

? Dans le TP1, la liste « dynamique avec tableaux » utilise :
- un `int data[MAX]`
+ un tableau alloué avec `malloc`
- une liste chaînée
= Tableau alloué dynamiquement.

? Le défaut de la correction de 1.5 apparaît pour :
+ une liste vide
- une liste sans doublon
- une liste de 2 éléments égaux
= `actuel->next` avec `actuel == NULL`.
```

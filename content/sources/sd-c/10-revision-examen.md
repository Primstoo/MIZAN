---
id: revision-examen
titre: Révision et examen blanc
seance: Préparation à l'examen (1 h 30)
importance: 5
---

## Avant de commencer

L'examen 2024-2025 (session ordinaire, 1 h 30) contenait **deux exercices de code** : une liste simplement chaînée complète, puis un ABR complet. Pas de question de cours isolée.

```exercice Vérifie ton prérequis
? Sans regarder, écris la structure d'un nœud de liste simple d'entiers.
= `typedef struct Noeud { int data; struct Noeud *next; } Noeud;` N'oublie pas le `;` après chaque champ et après `Noeud`.
```

## Comment aborder ce chapitre

> [!astuce] À l'examen, **écris d'abord toutes les structures et les signatures**, puis remplis. Une signature correcte rapporte déjà des points.

> [!piege] Oublier le `main` ou la libération mémoire : l'énoncé 2025 demande explicitement « créez et initialisez » et « libérez la mémoire ».

À la fin, tu as écrit un examen complet en temps limité.

## Idée 1 · Le tableau de bord

| Structure | Opération clé | Coût | Cas limite à tester |
|---|---|---|---|
| Liste simple | insertion en tête | O(1) | liste vide |
| Liste simple | suppression en queue | O(n) | un seul nœud |
| Liste double | suppression | O(n) recherche + O(1) | tête, queue |
| Liste circulaire | parcours | O(n) | `do…while` |
| Pile tableau | push / pop | O(1) | `top == -1`, `top == MAX-1` |
| Pile chaînée | push / pop | O(1) | pile vide |
| File chaînée | enfiler / défiler | O(1) | remettre `queue` à NULL |
| ABR | recherche / insertion | O(h) | doublon, arbre vide |

```flux Méthode pour toute fonction
Structure et signature -> Cas vide -> Cas général (dessin) -> Cas un seul élément -> free
```

## Idée 2 · Examen blanc (sur le modèle de 2025)

Durée conseillée : **1 h 30**. Écris tout sur papier, puis compare.

```exercice Exercice 1 · Liste simplement chaînée (8 pts)
? 1) Définis la structure d'un nœud contenant un entier. 2) Crée et initialise une liste vide.
= `typedef struct Noeud { int data; struct Noeud *next; } Noeud;` puis dans le `main` : `Noeud *liste = NULL;`

? 3) Écris `Noeud* insererTete(Noeud *tete, int v)`.
= `Noeud *n = malloc(sizeof(Noeud)); if (!n) return tete; n->data = v; n->next = tete; return n;`

? 4) Écris `Noeud* supprimerTete(Noeud *tete)`.
= `if (tete == NULL) return NULL; Noeud *s = tete->next; free(tete); return s;`

? 5) Écris `Noeud* rechercher(Noeud *tete, int v)`.
= `while (tete != NULL && tete->data != v) tete = tete->next; return tete;`

? 6) Écris l'affichage et 7) la libération.
= Affichage : `for (Noeud *p = tete; p; p = p->next) printf("%d ", p->data);`
Libération : `while (tete) { Noeud *s = tete->next; free(tete); tete = s; } return NULL;`
```

```exercice Exercice 2 · ABR d'entiers (12 pts)
? 1-2) Structure d'un nœud d'ABR et arbre vide.
= `typedef struct Noeud { int val; struct Noeud *gauche, *droite; } Noeud;` et `Noeud *racine = NULL;`

? 3) Insertion (récursive).
= `void inserer(Noeud **r, int v) { if (*r == NULL) { *r = creerNoeud(v); return; } if (v < (*r)->val) inserer(&(*r)->gauche, v); else if (v > (*r)->val) inserer(&(*r)->droite, v); }`

? 4) Recherche.
= `Noeud *rechercher(Noeud *r, int v) { if (!r || r->val == v) return r; return v < r->val ? rechercher(r->gauche, v) : rechercher(r->droite, v); }`

? 5) Affichage infixe. Que donne-t-il après insertion de 45, 12, 60, 3, 20 ?
= `if (r) { infixe(r->gauche); printf("%d ", r->val); infixe(r->droite); }` → 3 12 20 45 60 (ordre croissant).

? 6) Hauteur. Valeur pour l'arbre de la question 5 (convention : vide = -1) ?
reponse: 2
= 45 → 12 → 3 (ou 20) : 2 liens. Avec la convention « vide = 0 », on répondrait 3 : précise toujours la convention.

? 7) Suppression : décris les trois cas, puis supprime 12 dans l'arbre de la question 5.
= Feuille : free et NULL. Un fils : on renvoie le fils. Deux fils : on copie le min du sous-arbre droit puis on le supprime. 12 a deux fils (3 et 20) : il est remplacé par 20 (min de son sous-arbre droit). Infixe : 3 20 45 60.

? 8) Libération de l'arbre.
= Postfixe : `void liberer(Noeud *r) { if (r) { liberer(r->gauche); liberer(r->droite); free(r); } }`
```

Le programme de référence de l'exercice 2 (vérifié) :

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Noeud { int val; struct Noeud *gauche, *droite; } Noeud;

Noeud *creerNoeud(int v) { Noeud *n = malloc(sizeof(Noeud)); n->val = v; n->gauche = n->droite = NULL; return n; }
void inserer(Noeud **r, int v) {
    if (*r == NULL) { *r = creerNoeud(v); return; }
    if (v < (*r)->val) inserer(&(*r)->gauche, v);
    else if (v > (*r)->val) inserer(&(*r)->droite, v);
}
void infixe(Noeud *r) { if (r) { infixe(r->gauche); printf("%d ", r->val); infixe(r->droite); } }
int hauteur(Noeud *r) {
    if (!r) return -1;
    int g = hauteur(r->gauche), d = hauteur(r->droite);
    return 1 + (g > d ? g : d);
}
Noeud *supprimer(Noeud *r, int v) {
    if (!r) return NULL;
    if (v < r->val) r->gauche = supprimer(r->gauche, v);
    else if (v > r->val) r->droite = supprimer(r->droite, v);
    else {
        if (!r->gauche) { Noeud *t = r->droite; free(r); return t; }
        if (!r->droite) { Noeud *t = r->gauche; free(r); return t; }
        Noeud *m = r->droite; while (m->gauche) m = m->gauche;
        r->val = m->val;
        r->droite = supprimer(r->droite, m->val);
    }
    return r;
}
void liberer(Noeud *r) { if (r) { liberer(r->gauche); liberer(r->droite); free(r); } }
int main(void) {
    Noeud *racine = NULL;
    int t[] = {45, 12, 60, 3, 20};
    for (int i = 0; i < 5; i++) inserer(&racine, t[i]);
    infixe(racine); printf("| hauteur %d\n", hauteur(racine));
    racine = supprimer(racine, 12);
    infixe(racine); printf("| gauche de 45 : %d\n", racine->gauche->val);
    liberer(racine);
    return 0;
}
```

```sortie
3 12 20 45 60 | hauteur 2
3 20 45 60 | gauche de 45 : 20
```

## Idée 3 · Barème indicatif

> [!attention] Le barème ci-dessus (8 + 12 pts) est **une hypothèse** de ToumaiLearn : l'énoncé 2025 n'indique pas de points. Demande le barème au prof.

## S'exercer

```exercice Questions éclair
? Quel parcours d'un ABR affiche les clés triées ?
reponse: infixe | infix | infixé
= Le parcours infixe (GRD).

? Quelle structure utilise le parcours en largeur ?
reponse: file
= Une file (FIFO).

? Dans une pile tableau, que vaut `top` pour une pile vide ?
reponse: -1
= -1.
```

## Flashcards

```cartes
Format de l'examen 2025 :: 1 h 30, deux exercices de code : liste simple complète, ABR complet.
Les 7 fonctions de l'exercice liste :: Structure, création, insertion en tête, suppression en tête, recherche, affichage, libération.
Les 8 points de l'exercice ABR :: Structure, création, insertion, recherche, infixe, hauteur, suppression, libération.
Méthode pour écrire une fonction :: Signature, cas vide, cas général dessiné, cas un élément, free.
Coût d'une opération dans un ABR :: O(h), h = hauteur.
Libérer un arbre :: Parcours postfixe avec free.
```

## QCM du chapitre

```qcm
? Quelle opération est en O(1) sur une liste simple ?
+ insertion en tête
- insertion en queue sans pointeur de queue
- recherche
= Pas de parcours.

? Après insertion de 45, 12, 60, 3, 20, la racine est :
- 3
+ 45
- 20
= La première valeur insérée devient la racine.

? Dans cet arbre, le parent de 20 est :
+ 12
- 45
- 60
= 20 < 45 → gauche ; 20 > 12 → droite de 12.

? On supprime 12 (deux fils 3 et 20). Il est remplacé par :
- 3
+ 20
- 45
= Le min du sous-arbre droit de 12 est 20.

? Pour supprimer en tête d'une liste vide, la fonction doit :
+ retourner NULL sans rien libérer
- appeler free(NULL->next)
- planter
= Toujours tester le cas vide.

? File : enfiler 1, 2, 3, défiler, défiler. Il reste :
- 1
- 2
+ 3
= Les deux premiers sont sortis.

? Pile : empiler 1, 2, 3, dépiler, dépiler. Il reste :
+ 1
- 2
- 3
= Les deux derniers sont sortis.

? Quelle liste demande un `do…while` pour être parcourue ?
- simplement chaînée
- doublement chaînée
+ circulaire
= Pas de NULL pour s'arrêter.

? Une recherche dans un ABR dégénéré de n nœuds coûte :
- O(1)
- O(log n)
+ O(n)
= Il ressemble à une liste.

? Quelle fonction n'a pas besoin de `free` ?
+ afficher
- supprimer en tête
- libérer
= L'affichage ne fait que lire.
```

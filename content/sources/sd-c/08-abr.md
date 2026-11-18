---
id: abr
titre: Arbres binaires de recherche (ABR)
seance: Chapitre IV · Arbres (2)
importance: 5
---

## Avant de commencer

Un ABR est un arbre binaire (chapitre 7) avec une règle d'ordre. Il faut connaître le parcours infixe.

```exercice Vérifie ton prérequis
? Donne le parcours infixe (GRD) de `50(30(20,40),70(60,80))`.
= 20 30 40 50 60 70 80. Remarque : c'est **trié**. Ce n'est pas un hasard, c'est la propriété clé des ABR.
```

## Comment aborder ce chapitre

> [!astuce] Chaque opération d'un ABR est une **descente** : plus petit → à gauche, plus grand → à droite. Insérer, chercher, trouver le min : c'est la même descente.

> [!piege] Vérifier la règle seulement entre un père et ses fils. Elle porte sur **tout le sous-arbre** : dans `50(30(20,60),70)`, 60 > 30 est correct localement, mais 60 est dans le sous-arbre **gauche** de 50 : ce n'est pas un ABR.

À la fin, tu sais écrire tout l'exercice 2 de l'examen 2025 : structure, insertion, recherche, infixe, hauteur, suppression, libération.

## Idée 1 · La règle d'ordre

Pour tout nœud p : les clés du sous-arbre **gauche** sont **plus petites** que p, celles du sous-arbre **droit** sont **plus grandes**. Le cours n'accepte pas de doublons dans l'insertion.

```html
<svg viewBox="0 0 440 200" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="ABR obtenu en insérant 50, 30, 70, 20, 40, 60, 80 ; la recherche de 60 passe par 50 puis 70 puis 60">
<g stroke="currentColor" stroke-width="2"><line x1="220" y1="30" x2="120" y2="95"/><line x1="220" y1="30" x2="320" y2="95"/><line x1="120" y1="95" x2="70" y2="165"/><line x1="120" y1="95" x2="170" y2="165"/><line x1="320" y1="95" x2="370" y2="165"/></g>
<g stroke="#D9824F" stroke-width="4"><line x1="220" y1="30" x2="320" y2="95"/><line x1="320" y1="95" x2="270" y2="165"/></g>
<g font-family="sans-serif" font-size="14" text-anchor="middle">
<circle cx="220" cy="30" r="18" fill="#D9824F"/><text x="220" y="35" fill="#fff">50</text>
<circle cx="120" cy="95" r="18" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="120" y="100" fill="currentColor">30</text>
<circle cx="320" cy="95" r="18" fill="#D9824F"/><text x="320" y="100" fill="#fff">70</text>
<circle cx="70" cy="165" r="18" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="70" y="170" fill="currentColor">20</text>
<circle cx="170" cy="165" r="18" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="170" y="170" fill="currentColor">40</text>
<circle cx="270" cy="165" r="18" fill="#D9824F"/><text x="270" y="170" fill="#fff">60</text>
<circle cx="370" cy="165" r="18" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="370" y="170" fill="currentColor">80</text>
<text x="400" y="40" fill="#D9824F" font-size="12">chercher 60 :</text><text x="400" y="56" fill="#D9824F" font-size="12">60&gt;50, 60&lt;70</text>
</g></svg>
```

- **Minimum** : descendre à gauche tant que possible (20). **Maximum** : à droite (80).
- **Infixe = ordre croissant.**
- Une recherche visite au plus h + 1 nœuds (h = hauteur) : rapide si l'arbre est équilibré, O(n) s'il est dégénéré (insertion de valeurs déjà triées : on obtient une « liste »).

## Idée 2 · Insérer et chercher

```etapes Insérer 27 dans l'ABR
Partir de la racine :: comparer 27 à la clé du nœud courant.
Descendre :: plus petit → sous-arbre gauche ; plus grand → sous-arbre droit ; égal → on ne fait rien (pas de doublon).
Trouver NULL :: la place vide rencontrée est celle du nouveau nœud.
Accrocher :: `*racine = creerNoeud(27);` d'où le paramètre `Noeud **racine`.
```

## Idée 3 · Supprimer : trois cas

```flux Cas de la suppression
Nœud trouvé -> Feuille : free, on renvoie NULL
Nœud trouvé -> Un seul fils : on renvoie ce fils au parent, free
Nœud trouvé -> Deux fils : on copie le min du sous-arbre droit, puis on supprime ce min à droite
```

Le programme ci-dessous reprend la correction du TD3 et les questions de l'examen 2025.

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct Noeud { int val; struct Noeud *gauche, *droite; } Noeud;

Noeud *creerNoeud(int v) {
    Noeud *n = malloc(sizeof(Noeud));
    n->val = v; n->gauche = n->droite = NULL;
    return n;
}
void inserer(Noeud **racine, int v) {
    if (*racine == NULL) { *racine = creerNoeud(v); return; }
    if (v < (*racine)->val) inserer(&(*racine)->gauche, v);
    else if (v > (*racine)->val) inserer(&(*racine)->droite, v);
}
Noeud *rechercher(Noeud *r, int v) {
    if (r == NULL || r->val == v) return r;
    return v < r->val ? rechercher(r->gauche, v) : rechercher(r->droite, v);
}
void infixe(Noeud *r) {
    if (r) { infixe(r->gauche); printf("%d ", r->val); infixe(r->droite); }
}
int minABR(Noeud *r) { while (r->gauche) r = r->gauche; return r->val; }
int maxABR(Noeud *r) { while (r->droite) r = r->droite; return r->val; }
int hauteur(Noeud *r) {               /* convention du cours : vide = -1 */
    if (r == NULL) return -1;
    int hg = hauteur(r->gauche), hd = hauteur(r->droite);
    return 1 + (hg > hd ? hg : hd);
}
Noeud *supprimer(Noeud *r, int v) {
    if (r == NULL) return NULL;
    if (v < r->val) r->gauche = supprimer(r->gauche, v);
    else if (v > r->val) r->droite = supprimer(r->droite, v);
    else {
        if (r->gauche == NULL) { Noeud *t = r->droite; free(r); return t; }
        if (r->droite == NULL) { Noeud *t = r->gauche; free(r); return t; }
        int m = minABR(r->droite);     /* successeur */
        r->val = m;
        r->droite = supprimer(r->droite, m);
    }
    return r;
}
int estABR(Noeud *r, int min, int max) {
    if (r == NULL) return 1;
    if (r->val <= min || r->val >= max) return 0;
    return estABR(r->gauche, min, r->val) && estABR(r->droite, r->val, max);
}
void libererABR(Noeud *r) {
    if (r) { libererABR(r->gauche); libererABR(r->droite); free(r); }
}
int main(void) {
    Noeud *racine = NULL;
    int t[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) inserer(&racine, t[i]);
    printf("Infixe : "); infixe(racine); printf("\n");
    printf("Min %d, Max %d, Hauteur %d\n", minABR(racine), maxABR(racine), hauteur(racine));
    printf("40 %s\n", rechercher(racine, 40) ? "trouve" : "absent");
    racine = supprimer(racine, 20);   /* feuille */
    racine = supprimer(racine, 30);   /* un fils */
    racine = supprimer(racine, 50);   /* deux fils : remplacé par 60 */
    printf("Apres suppressions : "); infixe(racine); printf("\n");
    printf("Nouvelle racine : %d\n", racine->val);
    printf("ABR ? %d\n", estABR(racine, INT_MIN, INT_MAX));
    racine->gauche->val = 99;          /* on casse l'ordre volontairement */
    printf("ABR ? %d\n", estABR(racine, INT_MIN, INT_MAX));
    libererABR(racine);
    return 0;
}
```

```sortie
Infixe : 20 30 40 50 60 70 80 
Min 20, Max 80, Hauteur 2
40 trouve
Apres suppressions : 40 60 70 80 
Nouvelle racine : 60
ABR ? 1
ABR ? 0
```

> [!prof] Point important du cours : **le parcours infixe d'un ABR affiche les clés en ordre croissant**. Si ton infixe n'est pas trié après une insertion, ton insertion est fausse.

> [!attention] Les fonctions `minABR`/`maxABR` du TD3 ne testent pas `r == NULL` : sur un arbre vide elles plantent. Les versions du cours (`minimum`, `maximum`) retournent `NULL` dans ce cas. Autre écart : la `hauteur` du TD3 retourne 0 pour un arbre vide (elle compte les niveaux), celle du cours retourne -1 (elle compte les liens). Sur l'arbre initial ci-dessus : 3 avec le TD3, 2 avec le cours.

## S'exercer

```exercice Exercices types (TD3, examen 2025)
? Hauteur de l'ABR 50(30(20,40),70(60,80)) avec la convention du TD3 (arbre vide = 0) ?
reponse: 3
= Une feuille vaut 1, son père 2, la racine 3 : on compte les **niveaux**. Avec la convention du cours (vide = -1), on trouve 2 : on compte les **liens**.

? Écris la recherche dans un ABR en version **itérative** (exercice proposé dans le cours).
= `while (A != NULL && A->val != e) A = (e > A->val) ? A->droite : A->gauche; return A;`

? On insère dans un ABR vide : 40, 20, 60, 10, 30, 80, 90. Donne la hauteur (convention du cours).
reponse: 3
= 40 a pour fils 20 (10, 30) et 60 ; 60 a un fils droit 80, qui a un fils droit 90. Chemin 40-60-80-90 : 3 liens. C'est l'exemple de la dernière diapo.

? Que devient `50(30(20,40),70(60,80))` après suppression de 50 ?
= 50 a deux fils : on le remplace par le min du sous-arbre droit, 60, puis on supprime 60 à droite. On obtient `60(30(20,40),70(,80))`.
```

## Flashcards

```cartes
Règle d'un ABR :: Gauche < nœud < droite, pour tout le sous-arbre.
Minimum d'un ABR :: Descendre à gauche jusqu'au nœud sans fils gauche.
Maximum d'un ABR :: Descendre à droite jusqu'au nœud sans fils droit.
Infixe d'un ABR :: Les clés en ordre croissant.
Suppression d'une feuille :: `free` et on renvoie NULL au parent.
Suppression avec un seul fils :: On renvoie ce fils au parent, puis `free`.
Suppression avec deux fils :: Remplacer par le successeur (min du sous-arbre droit), puis supprimer ce successeur.
Pourquoi `inserer(Noeud **racine, …)` ? :: Pour pouvoir remplacer un pointeur NULL par le nouveau nœud.
estABR(r, min, max) :: Chaque nœud doit être strictement entre min et max ; à gauche max devient r->val, à droite min devient r->val.
Hauteur avec vide = -1 :: Une feuille a hauteur 0 ; on compte les liens.
```

## QCM du chapitre

```qcm
? Dans un ABR, le sous-arbre gauche d'un nœud contient :
+ des clés plus petites
- des clés plus grandes
- n'importe quelles clés
= C'est la règle d'ordre.

? Le parcours qui donne les clés triées est :
- préfixe
+ infixe
- en largeur
= Gauche (plus petits), racine, droite (plus grands).

? Pour chercher 25 dans `30(20,40)`, on va :
+ à gauche de 30, puis à droite de 20, et on trouve NULL
- à droite de 30
- on parcourt tout l'arbre
= 25 < 30 puis 25 > 20 : le fils droit de 20 est vide, 25 est absent.

? On insère 50, 30, 70, 20 dans un ABR vide. Où est 20 ?
- fils droit de 30
+ fils gauche de 30
- fils gauche de 70
= 20 < 50 → gauche ; 20 < 30 → gauche.

? Le minimum d'un ABR est :
- toujours la racine
+ le nœud le plus à gauche
- toujours une feuille de droite
= On descend à gauche tant que possible.

? Supprimer un nœud à deux fils : on le remplace par
- son fils gauche
+ le plus petit nœud de son sous-arbre droit
- la racine
= C'est le successeur (choix du cours).

? Insérer 1, 2, 3, 4, 5 dans cet ordre donne un arbre :
- équilibré
+ dégénéré (comme une liste)
- vide
= Chaque valeur va à droite de la précédente : recherche en O(n).

? Dans le cours, insérer une valeur déjà présente :
- crée un doublon à gauche
+ ne fait rien
- remplace le nœud
= « pas de doublons ».

? `estABR(r, INT_MIN, INT_MAX)` en descendant à gauche de r appelle :
+ `estABR(r->gauche, min, r->val)`
- `estABR(r->gauche, r->val, max)`
- `estABR(r->gauche, min, max)`
= Tout le sous-arbre gauche doit être < r->val.

? Hauteur de `50(30(20,40),70(60,80))` avec la convention du cours (vide = -1) :
- 1
+ 2
- 3
= Deux liens de la racine aux feuilles.
```

---
id: arbres-binaires
titre: Arbres et arbres binaires · vocabulaire et parcours
seance: Chapitre IV · Arbres (1)
importance: 5
---

## Avant de commencer

Les parcours d'arbre sont **récursifs**. Il faut savoir suivre une fonction qui s'appelle elle-même.

```exercice Vérifie ton prérequis
? `void f(int n) { if (n > 0) { f(n - 1); printf("%d ", n); } }` Qu'affiche `f(3)` ?
= `1 2 3`. L'appel `f(3)` lance d'abord `f(2)`, qui lance `f(1)`, qui lance `f(0)` (rien). Les `printf` se font au retour : 1, puis 2, puis 3.
```

## Comment aborder ce chapitre

> [!astuce] Retiens les parcours par **la place de la racine** : avant (préfixe, RGD), au milieu (infixe, GRD), après (postfixe, GDR). Gauche passe toujours avant droite.

> [!piege] Appliquer l'ordre une seule fois à la racine puis lister « à l'œil ». L'ordre s'applique **à chaque sous-arbre**, récursivement. Fais-le nœud par nœud.

À la fin, tu sais donner taille, hauteur, feuilles, degré d'un arbre et écrire ses trois parcours en profondeur et son parcours en largeur.

## Idée 1 · Le vocabulaire sur un exemple

L'arbre du cours (notation parenthésée `1(2(4,5(,8)),3(6,7))`) :

```html
<svg viewBox="0 0 420 230" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Arbre binaire : racine 1, fils 2 et 3 ; 2 a pour fils 4 et 5 ; 5 a un fils droit 8 ; 3 a pour fils 6 et 7">
<g stroke="currentColor" stroke-width="2"><line x1="210" y1="30" x2="110" y2="90"/><line x1="210" y1="30" x2="310" y2="90"/><line x1="110" y1="90" x2="60" y2="150"/><line x1="110" y1="90" x2="160" y2="150"/><line x1="160" y1="150" x2="200" y2="205"/><line x1="310" y1="90" x2="260" y2="150"/><line x1="310" y1="90" x2="360" y2="150"/></g>
<g font-family="sans-serif" font-size="15" text-anchor="middle">
<circle cx="210" cy="30" r="17" fill="#D9824F"/><text x="210" y="35" fill="#fff">1</text>
<circle cx="110" cy="90" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="110" y="95" fill="currentColor">2</text>
<circle cx="310" cy="90" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="310" y="95" fill="currentColor">3</text>
<circle cx="60" cy="150" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="60" y="155" fill="currentColor">4</text>
<circle cx="160" cy="150" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="160" y="155" fill="currentColor">5</text>
<circle cx="260" cy="150" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="260" y="155" fill="currentColor">6</text>
<circle cx="360" cy="150" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="360" y="155" fill="currentColor">7</text>
<circle cx="200" cy="205" r="17" fill="var(--bg, #fff)" stroke="currentColor" stroke-width="2"/><text x="200" y="210" fill="currentColor">8</text>
<text x="20" y="35" fill="currentColor" font-size="12" text-anchor="start">niveau 0</text><text x="20" y="95" fill="currentColor" font-size="12" text-anchor="start">1</text><text x="20" y="210" fill="currentColor" font-size="12" text-anchor="start">3</text>
</g></svg>
```

| Terme | Définition | Ici |
|---|---|---|
| Racine | nœud sans père | 1 |
| Feuille | nœud sans fils | 4, 8, 6, 7 |
| Nœud interne | pas une feuille | 1, 2, 3, 5 |
| Degré d'un nœud | nombre de fils | d°(5) = 1, d°(2) = 2 |
| Taille | nombre de nœuds | 8 |
| Profondeur (niveau) d'un nœud | nombre de liens depuis la racine | h(8) = 3 |
| Hauteur de l'arbre | profondeur maximale | 3 |
| Ancêtres de 8 | nœuds sur le chemin depuis la racine | 5, 2, 1 |

Un **arbre binaire** : chaque nœud a au plus 2 fils, et on distingue **gauche** et **droit**. Ici 8 est le fils **droit** de 5 : d'où la virgule dans `5(,8)`.

> [!attention] Le cours appelle « hauteur d'un nœud » ce qui est la **profondeur** (distance à la racine), puis dit qu'un arbre vide a une hauteur « nulle ». Plus loin, la fonction `hauteur` retourne **-1** pour un arbre vide, et la correction du TD3 retourne **0**. Les deux conventions existent : à l'examen, **écris laquelle tu prends** (avec -1, une feuille a hauteur 0 ; avec 0, une feuille a hauteur 1).

## Idée 2 · Représentation chaînée en C

Chaque nœud : une valeur, l'adresse du fils gauche, l'adresse du fils droit. L'arbre est désigné par un pointeur sur la racine ; arbre vide = `NULL`.

```c nontest
typedef struct noeud {
    int donnee;
    struct noeud *gauche;   /* fils gauche */
    struct noeud *droit;    /* fils droit  */
} ArbreB;
```

> [!attention] Diapos 151 et 153 : la structure est déclarée `struct nœud` (avec œ, invalide en C) puis pointe vers `struct noeud`, et `ajouterNoeud` écrit `Noeud->droite` alors que le champ s'appelle `droit`. Utilise **un seul nom** partout (`noeud`, `droit`). On y trouve aussi `prinft` pour `printf`.

## Idée 3 · Les trois parcours en profondeur (DFS)

```etapes Parcours préfixe (RGD) de l'arbre ci-dessus
Racine 1 :: on affiche 1, puis on parcourt le sous-arbre gauche (2), puis le droit (3).
Sous-arbre 2 :: affiche 2, puis gauche 4 (feuille : affiche 4), puis droit 5.
Sous-arbre 5 :: affiche 5, gauche vide, droit 8 : affiche 8.
Sous-arbre 3 :: affiche 3, puis 6, puis 7.
Résultat :: 1 2 4 5 8 3 6 7
```

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct noeud { int donnee; struct noeud *gauche, *droit; } ArbreB;

ArbreB *ajouterNoeud(int v) {
    ArbreB *n = malloc(sizeof(ArbreB));
    n->donnee = v; n->gauche = n->droit = NULL;
    return n;
}
int estVide(ArbreB *A) { return A == NULL; }
void prefixe(ArbreB *A) {
    if (!estVide(A)) { printf("%d ", A->donnee); prefixe(A->gauche); prefixe(A->droit); }
}
void infixe(ArbreB *A) {
    if (!estVide(A)) { infixe(A->gauche); printf("%d ", A->donnee); infixe(A->droit); }
}
void postfixe(ArbreB *A) {
    if (!estVide(A)) { postfixe(A->gauche); postfixe(A->droit); printf("%d ", A->donnee); }
}
/* parcours en largeur avec une file (tableau de pointeurs) */
void largeur(ArbreB *A) {
    ArbreB *file[100]; int debut = 0, fin = 0;
    if (A == NULL) return;
    file[fin++] = A;                         /* enfiler la racine */
    while (debut < fin) {                    /* tant que la file n'est pas vide */
        ArbreB *c = file[debut++];           /* défiler */
        printf("%d ", c->donnee);
        if (c->gauche) file[fin++] = c->gauche;
        if (c->droit)  file[fin++] = c->droit;
    }
}
int taille(ArbreB *A) { return A ? 1 + taille(A->gauche) + taille(A->droit) : 0; }
int feuilles(ArbreB *A) {
    if (!A) return 0;
    if (!A->gauche && !A->droit) return 1;
    return feuilles(A->gauche) + feuilles(A->droit);
}
void liberer(ArbreB *A) {                    /* postfixe : les fils avant le père */
    if (A) { liberer(A->gauche); liberer(A->droit); free(A); }
}
int main(void) {
    ArbreB *N[9];
    for (int i = 1; i <= 8; i++) N[i] = ajouterNoeud(i);
    N[1]->gauche = N[2]; N[1]->droit = N[3];
    N[2]->gauche = N[4]; N[2]->droit = N[5];
    N[5]->droit = N[8];
    N[3]->gauche = N[6]; N[3]->droit = N[7];
    printf("prefixe  : "); prefixe(N[1]);  printf("\n");
    printf("infixe   : "); infixe(N[1]);   printf("\n");
    printf("postfixe : "); postfixe(N[1]); printf("\n");
    printf("largeur  : "); largeur(N[1]);  printf("\n");
    printf("taille %d, feuilles %d\n", taille(N[1]), feuilles(N[1]));
    liberer(N[1]);
    return 0;
}
```

```sortie
prefixe  : 1 2 4 5 8 3 6 7 
infixe   : 4 2 5 8 1 6 3 7 
postfixe : 4 8 5 2 6 7 3 1 
largeur  : 1 2 3 4 5 6 7 8 
taille 8, feuilles 4
```

On retrouve les résultats des diapos : 12458367, 42581637, 48526731.

> [!prof] Usages cités par le prof : préfixe pour **copier** un arbre, infixe pour écrire une expression arithmétique, postfixe pour **libérer la mémoire** (on libère les fils avant le père).

## Idée 4 · Le parcours en largeur (BFS)

```flux Algorithme du cours
Enfiler la racine -> Défiler un nœud -> Le traiter -> Enfiler son fils gauche puis son fils droit -> Recommencer tant que la file n'est pas vide
```

Niveau par niveau, de gauche à droite : 1 2 3 4 5 6 7 8. Pas de récursion : c'est une **file** qui retient les nœuds à visiter (le DFS itératif, lui, utilise une **pile**).

## S'exercer

```exercice Parcours à la main
? Donne les trois parcours de l'arbre A(B(D,E(H,I)),C(F,G)) (exemple des diapos).
= Préfixe : A B D E H I C F G. Infixe : D B H E I A F C G. Postfixe : D H I E B F G C A.

? Donne la notation parenthésée de l'arbre : racine 1, fils gauche 2 (fils gauche 4, fils droit 5 qui a un fils gauche 8), fils droit 3 (6, 7 qui a 9 et 10).
= `1(2(4,5(8,)),3(6,7(9,10)))` (arbre B des diapos).

? Combien de nœuds a l'arbre A(B(D,E(H,I)),C(F,G)) ?
reponse: 9
= A, B, C, D, E, F, G, H, I.

? Écris `int hauteur(ArbreB *A)` avec la convention « arbre vide = -1 ».
= `if (A == NULL) return -1; int hg = hauteur(A->gauche), hd = hauteur(A->droit); return 1 + (hg > hd ? hg : hd);`
```

## Flashcards

```cartes
Feuille :: Nœud sans fils.
Nœud interne :: Nœud qui n'est pas une feuille.
Degré d'un nœud :: Nombre de ses fils.
Degré (arité) d'un arbre :: Le plus grand degré de ses nœuds.
Taille d'un arbre :: Nombre de nœuds.
Préfixe :: RGD : Racine, Gauche, Droit.
Infixe :: GRD : Gauche, Racine, Droit.
Postfixe :: GDR : Gauche, Droit, Racine.
Parcours en largeur :: Niveau par niveau, de gauche à droite, avec une file.
Quel parcours pour libérer un arbre ? :: Postfixe : les fils avant le père.
```

## QCM du chapitre

```qcm
? Dans un arbre binaire, chaque nœud a :
- exactement 2 fils
+ au plus 2 fils
- au moins 1 fils
= 0, 1 ou 2 fils.

? Le parcours préfixe de `1(2,3)` est :
+ 1 2 3
- 2 1 3
- 2 3 1
= Racine d'abord.

? Le parcours infixe de `1(2,3)` est :
- 1 2 3
+ 2 1 3
- 2 3 1
= Gauche, racine, droit.

? Le parcours postfixe de `1(2,3)` est :
- 1 2 3
- 2 1 3
+ 2 3 1
= La racine en dernier.

? Le parcours en largeur utilise :
- une pile
+ une file
- un tri
= On enfile les fils, on défile dans l'ordre d'arrivée.

? Dans `1(2(4,5(,8)),3(6,7))`, 8 est :
- le fils gauche de 5
+ le fils droit de 5
- le fils droit de 2
= La virgule avant 8 indique un fils gauche vide.

? Hauteur de l'arbre `1(2(4,5(,8)),3(6,7))` (racine au niveau 0) :
- 2
+ 3
- 4
= Le chemin 1-2-5-8 compte 3 liens.

? Combien de feuilles dans `1(2(4,5(,8)),3(6,7))` ?
- 3
+ 4
- 5
= 4, 8, 6, 7.

? Pour libérer un arbre, on utilise :
- le préfixe
- l'infixe
+ le postfixe
= On ne peut pas libérer un père avant d'avoir lu l'adresse de ses fils.

? Un arbre vide est représenté en C par :
+ un pointeur racine égal à NULL
- un nœud de valeur 0
- un nœud sans fils
= Convention du cours.
```

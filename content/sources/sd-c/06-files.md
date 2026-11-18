---
id: files
titre: Files (FIFO) · liste chaînée et tableau
seance: Chapitre III · Piles et files (2)
importance: 4
---

## Avant de commencer

Une file ajoute **en queue** et retire **en tête**. Il te faut l'insertion en queue et la suppression en tête d'une liste simple.

```exercice Vérifie ton prérequis
? Dans une liste simple qui ne garde que la tête, combien coûte l'insertion en queue ?
= O(n) : il faut parcourir jusqu'au dernier. La file garde donc **deux** pointeurs, `tete` et `queue`, pour enfiler en O(1).
```

## Comment aborder ce chapitre

> [!astuce] Pense à la file d'attente à la scolarité de la FSABM : on entre par l'arrière, on sort par l'avant. Deux repères : `tete` (qui sort) et `queue` (qui vient d'arriver).

> [!piege] Oublier de remettre `queue` à NULL quand on défile le **dernier** élément. La tête vaut NULL mais `queue` pointe sur un nœud libéré : le prochain `enfiler` écrit dans de la mémoire libérée.

À la fin, tu sais écrire une file chaînée complète et expliquer la limite de la file en tableau statique.

## Idée 1 · FIFO avec deux pointeurs

```html
<svg viewBox="0 0 600 130" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="File 10, 20, 30 : tete pointe sur 10, queue pointe sur 30 ; on défile à gauche, on enfile à droite">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="130" y="50" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="152" y="70">10</text><rect x="175" y="50" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="250" y="50" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="272" y="70">20</text><rect x="295" y="50" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="370" y="50" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="392" y="70">30</text><rect x="415" y="50" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="490" y="70">NULL</text><text x="152" y="20">tete</text><text x="392" y="20">queue</text>
<text x="60" y="70" fill="#D9824F">← défiler</text><text x="540" y="115" fill="#D9824F">enfiler →</text>
</g>
<g stroke="#D9824F" stroke-width="2"><line x1="185" y1="65" x2="248" y2="65"/><line x1="305" y1="65" x2="368" y2="65"/><line x1="425" y1="65" x2="465" y2="65"/><line x1="152" y1="26" x2="152" y2="48"/><line x1="392" y1="26" x2="392" y2="48"/></g>
</svg>
```

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Noeud { int data; struct Noeud *next; } Noeud;
typedef struct File { Noeud *tete; Noeud *queue; } File;

void initialiser(File *f) { f->tete = f->queue = NULL; }
int estVide(File *f) { return f->tete == NULL; }
void enfiler(File *f, int valeur) {
    Noeud *n = malloc(sizeof(Noeud));
    if (n == NULL) { printf("Erreur d'allocation !\n"); return; }
    n->data = valeur; n->next = NULL;
    if (estVide(f)) f->tete = f->queue = n;
    else { f->queue->next = n; f->queue = n; }
}
int defiler(File *f) {
    if (estVide(f)) { printf("Erreur : File vide !\n"); return -1; }
    Noeud *temp = f->tete;
    int valeur = temp->data;
    f->tete = f->tete->next;
    if (f->tete == NULL) f->queue = NULL;   /* la file devient vide */
    free(temp);
    return valeur;
}
void afficherFile(File *f) {
    if (estVide(f)) { printf("File vide !\n"); return; }
    printf("File : ");
    for (Noeud *t = f->tete; t; t = t->next) printf("%d -> ", t->data);
    printf("NULL\n");
}
void libererFile(File *f) { while (!estVide(f)) defiler(f); }

int main(void) {
    File f; initialiser(&f);
    enfiler(&f, 10); enfiler(&f, 20); enfiler(&f, 30);
    afficherFile(&f);
    printf("Defile : %d\n", defiler(&f));
    afficherFile(&f);
    libererFile(&f);
    afficherFile(&f);
    printf("queue NULL ? %d\n", f.queue == NULL);
    return 0;
}
```

```sortie
File : 10 -> 20 -> 30 -> NULL
Defile : 10
File : 20 -> 30 -> NULL
File vide !
queue NULL ? 1
```

> [!attention] Le « programme complet » de la diapo utilise `f->front` dans `afficherFile` alors que la structure a les champs `tete` et `queue` : ça ne compile pas. Le commentaire de `enfiler` parle aussi de `rear` : c'est `queue`.

## Idée 2 · File en tableau statique : `debut` et `fin`

```etapes File tableau (MAX = 4) : enfiler 1, 2, 3 puis défiler
Initialisation :: `debut = 0`, `fin = -1`. Vide si `debut > fin`.
Enfiler 1, 2, 3 :: `fin` passe à 0, 1, 2. Cases : [1, 2, 3, _].
Défiler :: on lit `elements[0] = 1`, puis `debut = 1`. Cases utiles : 2, 3.
Le problème :: pleine si `fin == MAX - 1`. Après 1 enfilement de plus, la file est « pleine » alors que la case 0 est libre.
```

```grille Après défilement : la case 0 est perdue (grisée), debut en bleu, fin en orange
#cols: 0 1 2 3
~1 !2 3 *4
```

> [!retenir] La file en tableau du cours ne réutilise pas les cases libérées au début. Elle convient pour un nombre total d'enfilements inférieur à `MAX`.

> [!attention] Hors support : la solution classique est la **file circulaire** (`fin = (fin + 1) % MAX`), qui réutilise les cases du début. Elle n'est pas dans le cours ; ne l'utilise à l'examen que si on te la demande.

## Idée 3 · Coûts

| Opération | Complexité |
|---|---|
| Enfiler | O(1) |
| Défiler | O(1) |
| Vérifier si vide | O(1) |
| Afficher | O(n) |
| Libérer | O(n) |

La file sert aussi au **parcours en largeur** d'un arbre (chapitre 7).

## S'exercer

```exercice Exercices types
? Écris `int tailleFile(File *f)`.
= `int c = 0; for (Noeud *t = f->tete; t != NULL; t = t->next) c++; return c;`

? File chaînée vide. On fait : enfiler 4, enfiler 7, défiler, enfiler 9, défiler. Quelle valeur est en tête ?
reponse: 9
= Après enfiler 4, 7 : [4, 7]. Défiler → [7]. Enfiler 9 → [7, 9]. Défiler → [9].

? Que se passe-t-il si on enlève la ligne `if (f->tete == NULL) f->queue = NULL;` ?
= Après avoir défilé le dernier élément, `queue` pointe sur un nœud libéré. `estVide` dit vrai (tête NULL), donc le prochain `enfiler` fait `tete = queue = n` : ça marche par chance ici, mais toute fonction qui lit `queue` sur une file vide lit de la mémoire libérée. On remet toujours `queue` à NULL.
```

## Flashcards

```cartes
Principe de la file :: FIFO : premier entré, premier sorti.
Les 2 pointeurs d'une file chaînée :: `tete` (on défile) et `queue` (on enfile).
File chaînée vide :: `tete == NULL`.
Enfiler dans une file vide :: `tete = queue = nouveau`.
Défiler le dernier élément :: Remettre aussi `queue` à NULL.
File tableau : initialisation :: `debut = 0`, `fin = -1`.
File tableau vide :: `debut > fin`.
Défaut de la file tableau du cours :: Les cases libérées au début ne sont pas réutilisées.
```

## QCM du chapitre

```qcm
? On enfile A, B, C puis on défile. On obtient :
+ A
- C
- B
= Premier entré, premier sorti.

? Pourquoi garder un pointeur `queue` ?
- pour défiler en O(1)
+ pour enfiler en O(1)
- pour afficher à l'envers
= Sans lui, il faudrait parcourir jusqu'au dernier.

? Enfiler dans une file vide :
- `queue->next = n`
+ `tete = queue = n`
- `tete = n` seulement
= Le nœud est à la fois premier et dernier.

? Défiler retire l'élément :
+ en tête
- en queue
- au milieu
= On sort par l'avant.

? Après avoir défilé le seul élément, il faut :
- libérer la structure File
+ mettre `queue` à NULL
- mettre `tete` à `queue`
= Sinon `queue` pointe sur de la mémoire libérée.

? Dans la file tableau du cours, la file est vide quand :
- `fin == -1` seulement
+ `debut > fin`
- `debut == 0`
= Après des défilements, debut dépasse fin.

? Complexité de « Défiler » :
+ O(1)
- O(n)
- O(log n)
= Tableau du cours.

? Quelle erreur contient le programme complet de la diapo ?
- `malloc` non casté
+ `f->front` au lieu de `f->tete`
- `free` manquant dans `defiler`
= La structure n'a pas de champ `front`.

? Quel parcours d'arbre utilise une file ?
- le parcours préfixé
+ le parcours en largeur
- le parcours postfixé
= On traite les nœuds niveau par niveau.

? Avec MAX = 3 (tableau) : enfiler 1, 2, 3, défiler, puis enfiler 4. Résultat :
- 4 est placé en case 0
+ « File pleine ! » car fin == MAX - 1
- 4 remplace 3
= La case 0 libérée n'est pas réutilisée.
```

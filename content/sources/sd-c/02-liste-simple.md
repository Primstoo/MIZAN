---
id: liste-simple
titre: Listes simplement chaînées
seance: Chapitre II · Listes (1)
importance: 5
---

## Avant de commencer

Tu dois savoir allouer avec `malloc`, libérer avec `free`, et accéder à un champ par pointeur avec `->`.

```exercice Vérifie ton prérequis
? `node *p = malloc(sizeof(node));` Comment écrire 12 dans le champ `data` du nœud pointé par `p` ?
= `p->data = 12;` (équivalent à `(*p).data = 12;`).
```

## Comment aborder ce chapitre

> [!astuce] **Dessine avant de coder.** Une case pour la donnée, une case pour `next`, une flèche. Chaque ligne de code déplace une flèche : vérifie-la sur ton dessin.

> [!piege] Avancer la tête elle-même pour parcourir (`liste = liste->next`). Tu perds l'adresse du début : la liste est perdue. On parcourt **toujours** avec un pointeur temporaire `p`.

À la fin, tu sais écrire de mémoire : la structure, l'insertion en tête et en queue, l'affichage, la recherche, la suppression et la libération.

## Idée 1 · Un nœud = une donnée + l'adresse du suivant

```html
<svg viewBox="0 0 600 110" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Pointeur liste vers le nœud 2, puis 4, puis 6, puis 7 qui pointe vers NULL">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<text x="35" y="30">liste</text><rect x="15" y="40" width="40" height="30" fill="none" stroke="#D9824F" stroke-width="2"/>
<rect x="100" y="40" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="122" y="60">2</text><rect x="145" y="40" width="25" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="215" y="40" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="237" y="60">4</text><rect x="260" y="40" width="25" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="330" y="40" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="352" y="60">6</text><rect x="375" y="40" width="25" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="445" y="40" width="45" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="467" y="60">7</text><rect x="490" y="40" width="25" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="565" y="60">NULL</text>
<text x="122" y="95">tête</text><text x="467" y="95">queue</text><text x="157" y="30" font-size="11">next</text><text x="122" y="30" font-size="11">data</text>
</g>
<g stroke="#D9824F" stroke-width="2"><line x1="35" y1="55" x2="98" y2="55"/><line x1="157" y1="55" x2="213" y2="55"/><line x1="272" y1="55" x2="328" y2="55"/><line x1="387" y1="55" x2="443" y2="55"/><line x1="502" y1="55" x2="540" y2="55"/></g>
</svg>
```

Le premier nœud est la **tête**, le dernier la **queue** (son `next` vaut `NULL`). La liste est désignée par l'adresse de sa tête. Liste vide : `node *liste = NULL;`.

```c nontest
typedef struct node {
    int data;
    struct node *next;   /* pointeur vers un nœud du même type */
} node;
```

> [!attention] Sur la diapo, le `;` manque après `struct node * next`. Sans lui, le code ne compile pas.

## Idée 2 · Insérer en tête et en queue

```etapes Insertion en tête de 12
Allouer :: `newNode = malloc(sizeof(node));`
Remplir :: `newNode->data = 12;`
Chaîner :: `newNode->next = *liste;` le nouveau pointe sur l'ancienne tête.
Mettre à jour la tête :: `*liste = newNode;` C'est pour ça qu'on passe `node **liste` : on modifie le pointeur du `main`.
```

En queue : on crée le nœud avec `next = NULL`, puis soit la liste est vide (il devient la tête), soit on cherche le dernier avec `for (p = *liste; p->next != NULL; p = p->next);` et on fait `p->next = newNode`.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node { int data; struct node *next; } node;

void inserer_en_tete(node **liste, int donnee) {
    node *newNode = malloc(sizeof(node));
    newNode->data = donnee;
    newNode->next = *liste;
    *liste = newNode;
}

void inserer_en_queue(node **liste, int donnee) {
    node *newNode = malloc(sizeof(node)), *p;
    if (newNode == NULL) { printf("Erreur"); return; }
    newNode->data = donnee;
    newNode->next = NULL;
    if (*liste == NULL) *liste = newNode;
    else {
        for (p = *liste; p->next != NULL; p = p->next);
        p->next = newNode;
    }
}

void afficherListe(node *liste) {
    node *p = liste;
    while (p != NULL) { printf("%d -> ", p->data); p = p->next; }
    printf("NULL\n");
}

int main(void) {
    node *liste = NULL;
    inserer_en_queue(&liste, 4);
    inserer_en_tete(&liste, 2);
    inserer_en_queue(&liste, 6);
    inserer_en_queue(&liste, 7);
    afficherListe(liste);
    return 0;
}
```

```sortie
2 -> 4 -> 6 -> 7 -> NULL
```

> [!retenir] Si une fonction doit **changer la tête**, deux styles du prof : passer `node **liste`, ou retourner la nouvelle tête (`liste = inserer(liste, x);`). Avec un simple `node *liste` sans retour, la modification est perdue.

## Idée 3 · Rechercher et supprimer

Rechercher = parcourir et comparer, retourner l'adresse du nœud ou `NULL`.

```grille Supprimer en queue : on garde precedent un cran derrière temp
#cols: 2 4 6 7
#rows: début étape2 étape3 fin
!2 4 6 7
2 !4 6 7
2 4 !6 *7
2 4 !6 ~7
```

(bleu : `precedent`, orange : `temp`, grisé : nœud libéré ; `precedent->next = NULL`.)

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct node { int data; struct node *next; } node;

void inserer_en_tete(node **liste, int d) {
    node *n = malloc(sizeof(node)); n->data = d; n->next = *liste; *liste = n;
}
void afficherListe(node *liste) {
    for (node *p = liste; p != NULL; p = p->next) printf("%d -> ", p->data);
    printf("NULL\n");
}
node *rechercher(node *tete, int valeur) {
    node *temp = tete;
    while (temp != NULL) {
        if (temp->data == valeur) return temp;
        temp = temp->next;
    }
    return NULL;
}
void supprimer_tete(node **liste) {
    if (*liste != NULL) {
        node *p = *liste;
        *liste = (*liste)->next;
        free(p);
    }
}
void supprimerFin(node **tete) {
    if (*tete == NULL) return;
    if ((*tete)->next == NULL) { free(*tete); *tete = NULL; return; } /* un seul nœud */
    node *temp = *tete, *precedent = NULL;
    while (temp->next != NULL) { precedent = temp; temp = temp->next; }
    precedent->next = NULL;
    free(temp);
}
node *liberer(node *tete) {
    while (tete != NULL) { node *s = tete->next; free(tete); tete = s; }
    return NULL;
}

int main(void) {
    node *L = NULL;
    for (int v = 7; v >= 1; v -= 2) inserer_en_tete(&L, v);
    afficherListe(L);
    printf("6 %s\n", rechercher(L, 6) ? "trouvé" : "absent");
    printf("5 %s\n", rechercher(L, 5) ? "trouvé" : "absent");
    supprimer_tete(&L);
    supprimerFin(&L);
    afficherListe(L);
    supprimerFin(&L); supprimerFin(&L); supprimerFin(&L);
    afficherListe(L);
    L = liberer(L);
    return 0;
}
```

```sortie
1 -> 3 -> 5 -> 7 -> NULL
6 absent
5 trouvé
3 -> 5 -> NULL
NULL
```

> [!attention] La fonction `supprimerFin` de la diapo plante si la liste n'a **qu'un seul nœud** : `precedent` reste `NULL` et `precedent->next = NULL` déréférence `NULL`. La version ci-dessus traite ce cas à part (et remet la tête à `NULL`).

## S'exercer

```exercice Exercices types (TD1, examen 2025)
? Écris `int compter(node *tete)` qui retourne le nombre de nœuds (TD1, ex. 1.2).
= `int count = 0; for (node *p = tete; p != NULL; p = p->next) count++; return count;`

? Écris une fonction qui inverse une liste simplement chaînée (TD1, ex. 1.3).
indice: Trois pointeurs : `inverse` (déjà retourné), `temp` (reste à traiter), `actuel`.
= `node *inverse = NULL, *temp = tete, *actuel;`
`while (temp != NULL) { actuel = temp; temp = temp->next; actuel->next = inverse; inverse = actuel; }`
`return inverse;` Chaque nœud est retiré du début et posé devant `inverse`.

? Pourquoi `void inserer(node *liste, int x)` qui fait `liste = nouveau;` ne modifie pas la liste du `main` ?
= Le paramètre est une **copie** du pointeur. Il faut passer `node **liste` ou retourner la nouvelle tête.
```

## Flashcards

```cartes
Champs d'un nœud de liste simple :: Une donnée (`data`) et un pointeur `next` vers le nœud suivant.
Comment représenter une liste vide ? :: `node *liste = NULL;`
Le `next` de la queue vaut… :: `NULL`.
4 étapes de l'insertion en tête :: Allouer, remplir, `nouveau->next = tête`, tête = nouveau.
Boucle pour atteindre le dernier nœud :: `for (p = liste; p->next != NULL; p = p->next);`
Pourquoi `node **liste` ? :: Pour pouvoir modifier le pointeur de tête du `main`.
Cas oublié dans supprimerFin de la diapo :: La liste à un seul nœud (precedent reste NULL).
Libérer une liste :: Sauver `next`, `free` du nœud courant, passer au suivant sauvé.
```

## QCM du chapitre

```qcm
? Que contient le champ `next` du dernier nœud ?
- l'adresse de la tête
+ `NULL`
- 0 dans le champ data
= Dans une liste non circulaire, la fin est marquée par NULL.

? Quelle est la complexité de l'insertion en tête ?
+ O(1)
- O(n)
- O(log n)
= Aucun parcours : on change deux pointeurs.

? Quelle est la complexité de l'insertion en queue sans pointeur de queue ?
- O(1)
+ O(n)
- O(n²)
= Il faut parcourir jusqu'au dernier nœud.

? Dans l'insertion en tête, quelle instruction vient juste avant `*liste = newNode;` ?
- `free(newNode);`
+ `newNode->next = *liste;`
- `(*liste)->next = newNode;`
= On accroche d'abord le nouveau à l'ancienne tête, sinon on la perd.

? Pourquoi parcourir avec un pointeur `p` et pas avec `liste` ?
- c'est plus rapide
+ pour ne pas perdre l'adresse de la tête
- parce que `liste` est constant
= Si on avance `liste`, le début est perdu.

? `rechercher` retourne quoi si la valeur est absente ?
- -1
+ `NULL`
- l'adresse de la queue
= Elle retourne un `node*`.

? Dans `supprimer_tete`, pourquoi sauver `p = *liste` avant d'avancer ?
+ pour pouvoir faire `free(p)` sur l'ancienne tête
- pour l'afficher
- pour le remettre en queue
= Après `*liste = (*liste)->next`, on n'aurait plus son adresse.

? La condition de la boucle `for (p = liste; p->next != NULL; p = p->next);` sur une liste vide :
- s'arrête tout de suite
+ plante (déréférence NULL)
- retourne NULL
= `p` vaut NULL et `p->next` est invalide : d'où le test `if (*liste == NULL)` avant.

? Après `supprimerFin` (version corrigée) sur une liste d'un nœud, la tête vaut :
- l'ancien nœud
+ `NULL`
- indéfinie
= Le nœud est libéré et la tête remise à NULL.

? Quel oubli provoque une fuite mémoire ?
- oublier `printf`
+ ne pas appeler `free` sur les nœuds
- utiliser `->` au lieu de `.`
= Chaque `malloc` doit avoir son `free`.
```

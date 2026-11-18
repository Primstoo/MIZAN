---
id: liste-double-circulaire
titre: Listes doublement chaînées et circulaires
seance: Chapitre II · Listes (2)
importance: 4
---

## Avant de commencer

Ce chapitre réutilise tout le chapitre précédent : insertion en tête et en queue d'une liste simple.

```exercice Vérifie ton prérequis
? Dans une liste simple, en combien d'opérations accède-t-on au **prédécesseur** d'un nœud dont on a l'adresse ?
= On ne peut pas y remonter : il faut repartir de la tête et parcourir, donc O(n). C'est exactement ce que corrige la liste double.
```

## Comment aborder ce chapitre

> [!astuce] Une liste double, c'est **deux listes simples superposées** : une dans chaque sens. À chaque opération, compte les flèches à refaire : souvent 4 au lieu de 2.

> [!piege] Écrire `temp->suivant->precedent = …` sans tester `temp->suivant != NULL`. Sur le dernier nœud, c'est un plantage assuré. Même chose pour `precedent` sur la tête.

À la fin, tu sais insérer, supprimer et afficher dans une liste double, et parcourir une liste circulaire sans boucle infinie.

## Idée 1 · Deux pointeurs par nœud

```html
<svg viewBox="0 0 600 110" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Trois nœuds 5, 10, 20 reliés dans les deux sens ; le precedent du premier et le suivant du dernier valent NULL">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<text x="40" y="60">NULL</text>
<rect x="100" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/><rect x="120" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="140" y="60">5</text><rect x="160" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="240" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/><rect x="260" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="280" y="60">10</text><rect x="300" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="380" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/><rect x="400" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="420" y="60">20</text><rect x="440" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="540" y="60">NULL</text><text x="140" y="95">tete</text><text x="110" y="30" font-size="10">prec</text><text x="170" y="30" font-size="10">suiv</text>
</g>
<g stroke="#D9824F" stroke-width="2"><line x1="170" y1="48" x2="238" y2="48"/><line x1="250" y1="62" x2="182" y2="62"/><line x1="310" y1="48" x2="378" y2="48"/><line x1="390" y1="62" x2="322" y2="62"/><line x1="110" y1="55" x2="65" y2="55"/><line x1="450" y1="55" x2="515" y2="55"/></g>
</svg>
```

```c nontest
typedef struct Element {
    int donnee;
    struct Element *suivant;
    struct Element *precedent;
} Element;
```

Avantage : on avance **et** on recule. Prix : un pointeur de plus par nœud et plus de pointeurs à mettre à jour.

## Idée 2 · Les opérations de la liste double

Le prof retourne la nouvelle tête : `tete = insererTete(tete, 5);`.

```etapes Supprimer la valeur 10 dans 5 ⇄ 10 ⇄ 20
Chercher :: `temp` avance jusqu'au nœud 10. S'il vaut NULL, la valeur est absente : on retourne la tête.
Recâbler le précédent :: `temp->precedent` existe (c'est 5), donc `5->suivant = 20`. Sinon on supprimait la tête : `tete = temp->suivant`.
Recâbler le suivant :: `temp->suivant` existe (c'est 20), donc `20->precedent = 5`.
Libérer :: `free(temp);` puis `return tete;`
```

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Element { int donnee; struct Element *suivant, *precedent; } Element;

Element *insererTete(Element *tete, int val) {
    Element *n = malloc(sizeof(Element));
    n->donnee = val; n->suivant = tete; n->precedent = NULL;
    if (tete != NULL) tete->precedent = n;
    return n;
}
Element *insererFin(Element *tete, int val) {
    if (tete == NULL) return insererTete(tete, val);
    Element *n = malloc(sizeof(Element)), *t = tete;
    n->donnee = val; n->suivant = NULL;
    while (t->suivant != NULL) t = t->suivant;
    t->suivant = n; n->precedent = t;
    return tete;
}
Element *supprimer(Element *tete, int val) {
    Element *temp = tete;
    while (temp != NULL && temp->donnee != val) temp = temp->suivant;
    if (temp == NULL) return tete;
    if (temp->precedent != NULL) temp->precedent->suivant = temp->suivant;
    else tete = temp->suivant;
    if (temp->suivant != NULL) temp->suivant->precedent = temp->precedent;
    free(temp);
    return tete;
}
void afficherListe(Element *tete) {
    for (Element *a = tete; a != NULL; a = a->suivant) printf("%d <-> ", a->donnee);
    printf("NULL\n");
}
void afficherInverse(Element *tete) {
    if (tete == NULL) { printf("NULL\n"); return; }
    Element *a = tete;
    while (a->suivant != NULL) a = a->suivant;
    for (; a != NULL; a = a->precedent) printf("%d <-> ", a->donnee);
    printf("NULL\n");
}
Element *libererListe(Element *tete) {
    Element *s;
    while (tete != NULL) { s = tete->suivant; free(tete); tete = s; }
    return NULL;
}
int main(void) {
    Element *L = NULL;
    L = insererTete(L, 10);
    L = insererFin(L, 20);
    L = insererTete(L, 5);
    afficherListe(L);
    afficherInverse(L);
    L = supprimer(L, 10);
    afficherListe(L);
    L = supprimer(L, 5);
    afficherListe(L);
    L = libererListe(L);
    return 0;
}
```

```sortie
5 <-> 10 <-> 20 <-> NULL
20 <-> 10 <-> 5 <-> NULL
5 <-> 20 <-> NULL
20 <-> NULL
```

> [!attention] Dans la correction du TD1 (ex. 1.6), la suppression de la tête fait `lst = lst->suivant; lst->precedent = NULL;`. Si la liste n'a qu'un nœud, `lst` devient NULL et `lst->precedent` plante. Il faut tester `if (lst != NULL)` avant. La version du cours ci-dessus n'a pas ce défaut.

## Idée 3 · La liste circulaire : la queue pointe sur la tête

```html
<svg viewBox="0 0 520 150" style="width:100%;max-width:520px;display:block;margin:10px auto" role="img" aria-label="Trois nœuds 1, 2, 3 ; le dernier pointe de nouveau vers le premier">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="60" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="80" y="60">1</text><rect x="100" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="210" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="230" y="60">2</text><rect x="250" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="360" y="40" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="380" y="60">3</text><rect x="400" y="40" width="20" height="30" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="80" y="30">head</text></g>
<g stroke="#D9824F" stroke-width="2" fill="none"><line x1="110" y1="55" x2="208" y2="55"/><line x1="260" y1="55" x2="358" y2="55"/><path d="M410 70 L410 120 L80 120 L80 72"/></g>
</svg>
```

Plus de `NULL` à la fin : la condition `while (p != NULL)` tournerait **à l'infini**. On utilise une boucle `do … while (temp != head)` : on traite le premier nœud, puis on s'arrête quand on revient à la tête.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

Node *insererEnFin(Node *head, int v) {
    Node *n = malloc(sizeof(Node)); n->data = v;
    if (head == NULL) { n->next = n; return n; }   /* pointe sur lui-même */
    Node *t = head;
    while (t->next != head) t = t->next;
    t->next = n; n->next = head;
    return head;
}
Node *insererEnDebut(Node *head, int v) {
    Node *n = malloc(sizeof(Node)); n->data = v;
    if (head == NULL) { n->next = n; return n; }
    Node *t = head;
    while (t->next != head) t = t->next;
    t->next = n; n->next = head;
    return n;                                      /* seule différence */
}
int compter(Node *head) {
    if (head == NULL) return 0;
    int c = 0; Node *t = head;
    do { c++; t = t->next; } while (t != head);
    return c;
}
int main(void) {
    Node *h = NULL;
    h = insererEnFin(h, 2);
    h = insererEnFin(h, 3);
    h = insererEnDebut(h, 1);
    Node *t = h;
    for (int i = 0; i < 7; i++) { printf("%d ", t->data); t = t->next; }
    printf("\nnoeuds : %d\n", compter(h));
    return 0;
}
```

```sortie
1 2 3 1 2 3 1 
noeuds : 3
```

Le tour de 7 pas montre bien la boucle : après 3, on revient à 1.

> [!retenir] Insertion en début et en fin d'une circulaire : **le même code**. Seule la valeur retournée change (`n` = nouvelle tête, ou `head`).

## S'exercer

```exercice Exercices types
? Écris l'affichage d'une liste double « de la fin vers le début » (TD1, ex. 1.6, question 5).
= Aller au dernier nœud (`while (a->suivant != NULL) a = a->suivant;`), puis remonter avec `a = a->precedent` jusqu'à NULL en affichant. Voir `afficherInverse` ci-dessus.

? Pourquoi la fonction `rechercher` d'une liste circulaire utilise `do … while` et pas `while (temp != head)` ?
= Avec `while`, on testerait `temp != head` dès le départ : faux, donc on ne regarderait aucun nœud. `do…while` traite d'abord la tête.

? Combien de pointeurs modifie l'insertion en tête d'une liste double non vide ?
reponse: 3
= `nouveau->suivant`, `nouveau->precedent` (NULL) et `ancienneTete->precedent`. Plus la tête elle-même, mise à jour par le retour.
```

## Flashcards

```cartes
Champs d'un nœud de liste double :: `donnee`, `suivant`, `precedent`.
`precedent` de la tête vaut… :: `NULL` (liste double non circulaire).
Avantage de la liste double :: Parcours dans les deux sens, accès direct au prédécesseur.
Inconvénient de la liste double :: Plus de mémoire (2 pointeurs) et manipulation plus complexe.
Liste circulaire :: Le dernier nœud pointe vers le premier au lieu de NULL.
Liste circulaire à un seul nœud :: `n->next = n` (il pointe sur lui-même).
Boucle de parcours d'une circulaire :: `do { … t = t->next; } while (t != head);`
Insérer en début vs en fin d'une circulaire :: Même chaînage ; on retourne le nouveau nœud (début) ou head (fin).
```

## QCM du chapitre

```qcm
? Un nœud de liste doublement chaînée contient :
- une donnée et un pointeur
+ une donnée et deux pointeurs
- deux données et un pointeur
= suivant + precedent.

? Après `insererTete` sur une liste double non vide, `ancienneTete->precedent` vaut :
- NULL
+ l'adresse du nouveau nœud
- l'adresse de la queue
= Le chaînage arrière doit être mis à jour.

? Dans `supprimer` (liste double), si `temp->precedent == NULL`, c'est que :
+ on supprime la tête
- on supprime la queue
- la liste est vide
= On fait alors `tete = temp->suivant`.

? Pourquoi tester `temp->suivant != NULL` avant `temp->suivant->precedent = …` ?
- pour gagner du temps
+ parce que la queue n'a pas de suivant
- ce test est inutile
= Sinon on déréférence NULL.

? Dans une liste circulaire, `while (p != NULL)` :
- parcourt la liste une fois
+ boucle à l'infini
- ne s'exécute jamais
= Aucun nœud ne pointe vers NULL.

? La liste circulaire `1 → 2 → 3 → (1)` : après 5 pas depuis 1, on est sur :
- 2
+ 3
- 1
= 1,2,3,1,2,3 : le 6ᵉ nœud visité (5 pas) est 3.

? Une liste circulaire peut être :
- seulement simplement chaînée
- seulement doublement chaînée
+ simplement ou doublement chaînée
= Le cours présente les deux variantes.

? Dans le cours, `insererTete` d'une liste double :
+ retourne la nouvelle tête
- prend un `Element **`
- ne retourne rien
= On l'appelle `tete = insererTete(tete, val);`.

? Le défaut de la correction du TD1 (suppression de la tête d'une liste double) apparaît quand :
- la liste a deux nœuds
+ la liste n'a qu'un nœud
- la valeur est absente
= `lst` devient NULL puis on écrit `lst->precedent`.

? Dans une liste circulaire de n nœuds, trouver le dernier depuis `head` coûte :
- O(1)
+ O(n)
- O(log n)
= On avance jusqu'à `t->next == head`.
```

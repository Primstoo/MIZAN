---
id: sd-introduction
titre: Introduction · organiser les données en mémoire
seance: Chapitre I · Introduction aux structures de données
importance: 3
---

## Avant de commencer

Il te faut deux bases de C : la `struct` et le pointeur (une variable qui contient une adresse).

```exercice Vérifie ton prérequis
? Si `int x = 5; int *p = &x; *p = 8;`, que vaut `x` ?
indice: `*p` désigne la case dont p contient l'adresse.
reponse: 8
= `p` pointe sur `x`. Écrire dans `*p`, c'est écrire dans `x`. Donc `x` vaut 8.
```

## Comment aborder ce chapitre

> [!astuce] Une structure de données, ce n'est pas du code compliqué : c'est **un choix de rangement**. Demande-toi toujours « quelle opération dois-je faire vite ? ».

> [!piege] Croire qu'il existe une structure « meilleure » que les autres. Le tableau gagne pour l'accès par indice, la liste chaînée pour l'insertion sans décalage.

À la fin, tu sais classer une structure (linéaire ou non) et justifier le choix tableau ou liste chaînée.

## Idée 1 · Une structure = des données + des opérations

Une structure de données organise, stocke et manipule les données en mémoire. Elle fixe **la forme** des données et **les opérations** permises.

Exemple du prof : stocker des noms.

- Nombre de noms fixe → un **tableau**.
- Noms ajoutés et supprimés en cours de route → une **liste chaînée**.

Le choix change l'algorithme : dans une liste **triée**, on cherche par dichotomie en O(log n) ; dans une liste non triée, il faut une recherche linéaire en O(n). Pour 1 000 éléments : environ 10 comparaisons contre 1 000.

## Idée 2 · Deux familles

```flux Les catégories du cours
Structures de données -> Linéaires : listes chaînées, piles, files
Structures de données -> Non linéaires : arbres, graphes, tables de hachage
```

- **Linéaire** : les éléments se suivent l'un après l'autre.
- **Non linéaire** : un élément peut avoir plusieurs successeurs (hiérarchie, réseau).

Chaque structure a son usage : la **pile** gère le « dernier entré, premier sorti » (LIFO), la **file** le « premier entré, premier sorti » (FIFO), l'**arbre** une hiérarchie, la **table de hachage** un accès rapide par clé.

## Idée 3 · Tableau ou liste chaînée

```html
<svg viewBox="0 0 600 170" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="En haut un tableau de quatre cases contiguës, en bas une liste chaînée de quatre nœuds dispersés reliés par des flèches jusqu'à NULL">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<text x="40" y="38">Tableau</text>
<rect x="90" y="18" width="50" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="115" y="38">2</text>
<rect x="140" y="18" width="50" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="165" y="38">4</text>
<rect x="190" y="18" width="50" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="215" y="38">6</text>
<rect x="240" y="18" width="50" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="265" y="38">7</text>
<text x="420" y="38" fill="#D9824F">cases contiguës, accès t[i] direct</text>
<text x="40" y="128">Liste</text>
<rect x="90" y="108" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="110" y="128">2</text><rect x="130" y="108" width="20" height="30" fill="none" stroke="#D9824F" stroke-width="2"/>
<rect x="200" y="88" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="220" y="108">4</text><rect x="240" y="88" width="20" height="30" fill="none" stroke="#D9824F" stroke-width="2"/>
<rect x="310" y="120" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="330" y="140">6</text><rect x="350" y="120" width="20" height="30" fill="none" stroke="#D9824F" stroke-width="2"/>
<rect x="420" y="96" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2"/><text x="440" y="116">7</text><rect x="460" y="96" width="20" height="30" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="540" y="116">NULL</text>
</g>
<g stroke="#D9824F" stroke-width="2" fill="none"><path d="M140 123 L198 105"/><path d="M250 103 L308 133"/><path d="M360 135 L418 113"/><path d="M470 111 L515 111"/></g>
</svg>
```

| | Tableau | Liste chaînée |
|---|---|---|
| Mémoire | contiguë, taille fixe | dispersée, allouée au besoin (`malloc`) |
| Accès au i-ème | direct, O(1) | parcours, O(n) |
| Insertion au milieu | décalage, O(n) | changer deux pointeurs |
| Coût mémoire | données seules | données + un pointeur par nœud |

> [!retenir] Liste chaînée : **taille dynamique**, insertion/suppression faciles. Prix à payer : **accès séquentiel O(n)** et un pointeur de plus par élément.

## S'exercer

```exercice Choisir une structure
? Une appli de la FSABM doit garder l'historique des pages visitées pour un bouton « Retour ». Quelle structure ?
= Une **pile** : la dernière page visitée est la première qu'on retrouve (LIFO). C'est l'exemple du navigateur cité dans le cours.

? On reçoit des demandes d'impression qu'il faut traiter dans l'ordre d'arrivée. Quelle structure ?
= Une **file** (FIFO) : la première demande arrivée est la première servie.

? Classe : arbre, pile, graphe, file, liste chaînée, table de hachage.
= Linéaires : liste chaînée, pile, file. Non linéaires : arbre, graphe, table de hachage.
```

## Flashcards

```cartes
Définition d'une structure de données :: Une façon d'organiser, stocker et manipuler les données en mémoire, avec les opérations permises.
Structures linéaires du cours :: Listes chaînées, piles, files.
Structures non linéaires du cours :: Arbres, graphes, tables de hachage.
LIFO :: Last In First Out : dernier entré, premier sorti (pile).
FIFO :: First In First Out : premier entré, premier sorti (file).
Recherche dans une liste triée :: Dichotomie, O(log n).
Recherche dans une liste non triée :: Linéaire, O(n).
Deux inconvénients d'une liste chaînée :: Accès O(n) et mémoire en plus pour les pointeurs.
```

## QCM du chapitre

```qcm
? Une structure de données définit :
- seulement le type des variables
+ l'organisation des données et les opérations possibles
- uniquement l'algorithme de tri
= C'est la définition du cours : forme + opérations.

? Laquelle est non linéaire ?
- la pile
- la file
+ l'arbre
= L'arbre organise les données en hiérarchie.

? Le principe d'une pile est :
+ LIFO
- FIFO
- aléatoire
= Dernier entré, premier sorti.

? Le principe d'une file est :
- LIFO
+ FIFO
- par priorité seulement
= Premier entré, premier sorti.

? Accéder au 500ᵉ élément d'une liste chaînée coûte :
- O(1)
+ O(n)
- O(log n)
= Il faut suivre les pointeurs depuis la tête.

? Accéder à `t[499]` dans un tableau coûte :
+ O(1)
- O(n)
- O(n²)
= L'adresse se calcule directement.

? Pourquoi une liste chaînée consomme plus de mémoire par élément ?
- parce que `malloc` double la taille
+ parce que chaque nœud stocke aussi un pointeur
- parce que les données sont copiées deux fois
= Donnée + pointeur vers le suivant.

? La recherche dichotomique exige :
- une liste chaînée
+ des données triées
- une pile
= Sans tri, on ne sait pas de quel côté continuer.

? Quelle structure donne un accès rapide via une clé ?
- la file
- la liste simplement chaînée
+ la table de hachage
= Cité dans le cours parmi les structures non linéaires.

? Un avantage de la liste chaînée sur le tableau statique :
- l'accès direct par indice
+ pas besoin de connaître la taille à l'avance
- la mémoire contiguë
= Les nœuds sont alloués au fur et à mesure.
```

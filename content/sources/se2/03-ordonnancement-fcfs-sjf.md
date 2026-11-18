---
id: ordo-fcfs-sjf
titre: Ordonnancement (1) · critères, diagramme de Gantt, FCFS et SJF
seance: Chapitre 2 · Ordonnancement des processus · TD2
importance: 5
---

## Avant de commencer

Il te faut les états **prêt** et **élu** (chapitre 1) et savoir faire une moyenne. Tout le reste se fait avec une règle et un crayon.

```exercice Vérifie ton prérequis
? Trois processus attendent dans la file des prêts. Le processeur se libère. Lequel des trois change d'état, et vers quel état ?
= Un seul : celui que l'ordonnanceur choisit passe de **prêt** à **élu**. Les deux autres restent prêts. Tout ce chapitre répond à la question « lequel choisir ? ».
```

## Comment aborder ce chapitre

> [!astuce] **Gantt d'abord, calculs ensuite.** Dessine une frise graduée de 0 à la fin, place chaque processus case par case, et écris sous la frise la date de **fin** de chacun. Ensuite, deux soustractions suffisent pour tout.

> [!piege] Calculer le temps de rotation comme « fin » au lieu de « fin − **arrivée** ». Quand tous arrivent à t = 0 ça ne se voit pas ; dès que les arrivées sont décalées, toute la ligne est fausse.

À la fin, tu sais dessiner le Gantt de FCFS et de SJF, et calculer temps de rotation, temps d'attente, leurs moyennes et le rendement.

## Idée 1 · Qui décide ? Ordonnanceur et dispatcheur

- L'**ordonnanceur** (*scheduler*) **choisit** le processus à exécuter, selon un algorithme.
- Le **dispatcheur** **donne** le processeur au processus choisi : commutation de contexte, passage du mode maître au mode utilisateur, branchement au bon endroit du programme.

```grille Les trois ordonnanceurs du cours
#cols: Ordonnanceur | Transition contrôlée | Rôle
*À court terme (du processeur) | prêt → élu | choisit parmi les processus en mémoire
À long terme (de travail) | nouveau → prêt | choisit quels processus du disque charger en mémoire
À moyen terme | — | décharge / recharge en mémoire des processus déjà admis (va-et-vient)
```

**Deux modes :**

- **Non préemptif** (sans réquisition) : le processus élu garde le CPU jusqu'à ce qu'il se bloque ou se termine.
- **Préemptif** (avec réquisition) : le SE peut lui retirer le CPU (fin du quantum, arrivée d'un processus plus prioritaire).

## Idée 2 · Les critères et les deux formules

| Critère | Définition | On veut |
|---|---|---|
| Utilisation CPU | part du temps où le CPU travaille | maximiser |
| Débit (*throughput*) | nombre de processus terminés par unité de temps | maximiser |
| **Temps de rotation** (*turnaround*) | de l'arrivée à la terminaison | minimiser |
| **Temps d'attente** | somme du temps passé dans la file des **prêts** | minimiser |
| Temps de réponse | de la création au **premier** passage sur le CPU | minimiser |

> [!retenir] **Rotation = Fin − Arrivée.** **Attente = Rotation − Exécution.** TMR et TMA sont les moyennes. Le **rendement** d'un processus (colonne des tableaux d'examen) = Exécution ÷ Rotation ; le **débit** global = nombre de processus ÷ date de fin du dernier.

Le cours donne aussi une **méthode 2** pour l'attente : additionner, pour chaque passage sur le CPU, « date de début − date où il est redevenu prêt ». Les deux méthodes donnent le même résultat ; la première est plus sûre.

Ce petit programme applique les deux formules à partir des dates de fin lues sur le Gantt. On s'en resservira pour chaque exemple.

```python
def temps(fin, arrivee, duree):
    rot = {p: fin[p] - arrivee[p] for p in fin}
    att = {p: rot[p] - duree[p] for p in fin}
    for p in fin:
        print(f"{p} : rotation {fin[p]}-{arrivee[p]}={rot[p]}  attente {rot[p]}-{duree[p]}={att[p]}  rendement {duree[p]}/{rot[p]}")
    n = len(fin)
    print(f"TMR = {sum(rot.values())}/{n} = {sum(rot.values())/n:g}")
    print(f"TMA = {sum(att.values())}/{n} = {sum(att.values())/n:g}")
    print(f"Débit = {n}/{max(fin.values())} processus par unité de temps")
```

## Idée 3 · FCFS : premier arrivé, premier servi

**FCFS** (*First Come First Served*, aussi PAPS ou FIFO) : la file des prêts est rangée **par ordre d'arrivée**. Le processus en tête prend le CPU et le garde jusqu'à sa fin ou une E/S. **Non préemptif.** Mal adapté au temps partagé.

**Exemple 1 du cours** : cinq processus arrivés à t = 0, durées P1 = 3, P2 = 6, P3 = 4, P4 = 2, P5 = 1. ■ = exécution, · = attente.

```grille FCFS, exemple 1 du cours (tous arrivés à t = 0)
#cols: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
#rows: P1 P2 P3 P4 P5
*■ *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~· ~· ~· *■ *■ *■ *■ *■ *■ ~ ~ ~ ~ ~ ~ ~
~· ~· ~· ~· ~· ~· ~· ~· ~· *■ *■ *■ *■ ~ ~ ~
~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· *■ *■ ~
~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· ~· *■
```

Fins : P1 = 3, P2 = 9, P3 = 13, P4 = 15, P5 = 16.

```python
temps(fin={"P1": 3, "P2": 9, "P3": 13, "P4": 15, "P5": 16},
      arrivee={"P1": 0, "P2": 0, "P3": 0, "P4": 0, "P5": 0},
      duree={"P1": 3, "P2": 6, "P3": 4, "P4": 2, "P5": 1})
```

```sortie
P1 : rotation 3-0=3  attente 3-3=0  rendement 3/3
P2 : rotation 9-0=9  attente 9-6=3  rendement 6/9
P3 : rotation 13-0=13  attente 13-4=9  rendement 4/13
P4 : rotation 15-0=15  attente 15-2=13  rendement 2/15
P5 : rotation 16-0=16  attente 16-1=15  rendement 1/16
TMR = 56/5 = 11.2
TMA = 40/5 = 8
Débit = 5/16 processus par unité de temps
```

**Exemple 2 du cours** : mêmes durées, mais arrivées 0, 1, 4, 6, 7. Le Gantt est **le même** (le CPU n'est jamais vide), mais les temps changent car on soustrait l'arrivée.

```grille FCFS, exemple 2 du cours (arrivées décalées)
#cols: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
#rows: P1 P2 P3 P4 P5
*■ *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~· ~· *■ *■ *■ *■ *■ *■ ~ ~ ~ ~ ~ ~ ~
~ ~ ~ ~ ~· ~· ~· ~· ~· *■ *■ *■ *■ ~ ~ ~
~ ~ ~ ~ ~ ~ ~· ~· ~· ~· ~· ~· ~· *■ *■ ~
~ ~ ~ ~ ~ ~ ~ ~· ~· ~· ~· ~· ~· ~· ~· *■
```

```python
temps(fin={"P1": 3, "P2": 9, "P3": 13, "P4": 15, "P5": 16},
      arrivee={"P1": 0, "P2": 1, "P3": 4, "P4": 6, "P5": 7},
      duree={"P1": 3, "P2": 6, "P3": 4, "P4": 2, "P5": 1})
```

```sortie
P1 : rotation 3-0=3  attente 3-3=0  rendement 3/3
P2 : rotation 9-1=8  attente 8-6=2  rendement 6/8
P3 : rotation 13-4=9  attente 9-4=5  rendement 4/9
P4 : rotation 15-6=9  attente 9-2=7  rendement 2/9
P5 : rotation 16-7=9  attente 9-1=8  rendement 1/9
TMR = 38/5 = 7.6
TMA = 22/5 = 4.4
Débit = 5/16 processus par unité de temps
```

Les moyennes retrouvent celles des diapos : TMR = 7,6 et TMA = 4,4.

> [!astuce] Dans un Gantt, si le CPU est libre et qu'aucun processus n'est arrivé, laisse une case **vide** (temps mort). On ne « tire » jamais un processus avant son arrivée.

## Idée 4 · SJF : le plus court d'abord

**SJF** (*Shortest Job First*, aussi PCTE) : quand le CPU se libère, il prend le processus **prêt** dont le temps d'exécution est le **plus court** ; en cas d'égalité, FCFS.

```etapes Méthode pour un SJF non préemptif
À t = 0 :: Seuls les processus déjà arrivés comptent. S'il n'y en a qu'un, il démarre, même s'il est long.
Il finit :: On note la date de fin. On ne l'interrompt jamais (non préemptif).
On regarde la file :: Parmi les processus arrivés à cette date, on prend le plus court.
On recommence :: Jusqu'au dernier. Puis rotation et attente avec les deux formules.
```

**Exemple du cours** : P2 (arrivée 0, durée 12), P3 (3, 8), P4 (5, 4), P1 (10, 10), P5 (12, 6).

```grille SJF non préemptif, exemple du cours (frise compacte)
#cols: 0–12 | 12–16 | 16–22 | 22–30 | 30–40
*P2 | *P4 | *P5 | *P3 | *P1
```

À t = 12, P3 (8), P4 (4), P1 (10) et P5 (6) sont arrivés : P4 est le plus court. À t = 16 : P5 (6). À t = 22 : P3 (8) avant P1 (10).

```python
temps(fin={"P2": 12, "P4": 16, "P5": 22, "P3": 30, "P1": 40},
      arrivee={"P2": 0, "P4": 5, "P5": 12, "P3": 3, "P1": 10},
      duree={"P2": 12, "P4": 4, "P5": 6, "P3": 8, "P1": 10})
```

```sortie
P2 : rotation 12-0=12  attente 12-12=0  rendement 12/12
P4 : rotation 16-5=11  attente 11-4=7  rendement 4/11
P5 : rotation 22-12=10  attente 10-6=4  rendement 6/10
P3 : rotation 30-3=27  attente 27-8=19  rendement 8/27
P1 : rotation 40-10=30  attente 30-10=20  rendement 10/30
TMR = 90/5 = 18
TMA = 50/5 = 10
Débit = 5/40 processus par unité de temps
```

> [!retenir] SJF est **optimal** : il donne le temps d'attente moyen **minimal**. Mais il est difficile à réaliser, car le SE ne connaît pas à l'avance la durée d'un processus. Et il peut provoquer la **famine** des longs processus.

SJF existe en deux modes ; la version préemptive et SRTF sont au chapitre suivant.

## S'exercer

```exercice TD2, exercice 2 (a et b)
? Processus (arrivée, durée) : P1 (0, 3), P2 (2, 6), P3 (4, 4), P4 (6, 5), P5 (8, 2). Donne le Gantt **FCFS** et le TMA.
reponse: 4.6 ~0.01
= Gantt : P1 [0–3], P2 [3–9], P3 [9–13], P4 [13–18], P5 [18–20].
  Rotations : 3, 7, 9, 12, 12 → TMR = 43/5 = **8,6**.
  Attentes : 0, 1, 5, 7, 10 → TMA = 23/5 = **4,6**. Débit = 5/20 = 0,25.

? Même données en **SJF non préemptif**. Donne le Gantt et le TMA.
indice: À t = 9, P3 (4), P4 (5) et P5 (2) sont arrivés.
reponse: 3.6 ~0.01
= Gantt : P1 [0–3], P2 [3–9] (seul arrivé à t = 3), **P5** [9–11], P3 [11–15], P4 [15–20].
  Rotations : 3, 7, 11, 14, 3 → TMR = 38/5 = **7,6**.
  Attentes : 0, 1, 7, 9, 1 → TMA = 18/5 = **3,6**.

? Si n processus doivent passer sur le CPU, combien d'ordres d'exécution différents sont possibles (TD2, ex. 1) ?
= **n!** (n factorielle) : n choix pour le premier, n − 1 pour le second, etc.

? En quoi SJF est-il un cas particulier de l'ordonnancement à priorités ?
= C'est un ordonnancement à priorités où la priorité est l'**inverse du temps d'exécution** : plus le processus est court, plus il est prioritaire.
```

Le Gantt SJF de l'exercice 2, case par case :

```grille SJF non préemptif, TD2 exercice 2
#cols: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
#rows: P1 P2 P3 P4 P5
*■ *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~ ~· *■ *■ *■ *■ *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~ ~ ~ ~· ~· ~· ~· ~· ~· ~· *■ *■ *■ *■ ~ ~ ~ ~ ~
~ ~ ~ ~ ~ ~ ~· ~· ~· ~· ~· ~· ~· ~· ~· *■ *■ *■ *■ *■
~ ~ ~ ~ ~ ~ ~ ~ ~· *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~
```

> [!attention] Le corrigé « Rapports TD » qui circule recopie mal les données (P4 arrive à 5 au lieu de 6) et ses tableaux SJF et SRTF sont faux (TRM = 3,6 pour SJF, attente « 90 »…). Les valeurs justes sont celles ci-dessus, recalculées par programme.

## Flashcards

```cartes
Ordonnanceur vs dispatcheur :: L'ordonnanceur choisit le processus ; le dispatcheur lui donne le CPU (commutation de contexte, passage en mode utilisateur, branchement).
Temps de rotation :: Fin − Arrivée.
Temps d'attente :: Rotation − Exécution (= temps total passé dans la file des prêts).
Temps de réponse :: De la création au premier passage sur le CPU.
Rendement d'un processus (tableaux d'examen) :: Exécution ÷ Rotation.
Débit (throughput) :: Nombre de processus terminés par unité de temps.
FCFS :: Premier arrivé, premier servi ; non préemptif.
SJF :: Le plus court temps d'exécution d'abord (FCFS en cas d'égalité) ; optimal pour l'attente moyenne.
Préemptif vs non préemptif :: Préemptif : le SE peut retirer le CPU. Non préemptif : le processus le garde jusqu'à blocage ou fin.
Ordonnanceur à long terme :: Contrôle nouveau → prêt : quels processus du disque charger en mémoire.
```

## QCM du chapitre

```qcm
? Le temps de rotation d'un processus est :
- sa durée d'exécution
+ sa date de fin moins sa date d'arrivée
- sa date de fin
- son temps passé dans la file des prêts
= Rotation (turnaround) = de l'arrivée à la terminaison.

? Un processus arrive à 4, dure 3 et finit à 12. Son temps d'attente est :
- 8
+ 5
- 12
- 3
= Rotation = 12 − 4 = 8 ; attente = 8 − 3 = 5.

? FCFS est :
+ non préemptif
- préemptif
- préemptif seulement avec priorités
= Le processus élu garde le CPU jusqu'à la fin ou une E/S.

? Quel algorithme donne le temps d'attente moyen minimal ?
- FCFS
+ SJF
- Round-Robin
= Le cours : SJF est optimal pour le temps moyen d'attente.

? Pourquoi SJF est-il difficile à mettre en œuvre ?
- Il demande plusieurs processeurs
+ On ne connaît pas à l'avance la durée d'exécution
- Il ne marche qu'en mode préemptif
= Le SE doit deviner la durée du prochain cycle CPU.

? Quel composant fait la commutation de contexte ?
- L'ordonnanceur à long terme
+ Le dispatcheur
- L'éditeur de liens
- La MMU
= L'ordonnanceur choisit, le dispatcheur exécute le changement.

? L'ordonnanceur à court terme contrôle la transition :
- nouveau → prêt
+ prêt → élu
- élu → terminé
= C'est l'ordonnanceur du processeur.

? Cinq processus tous arrivés à 0, durées 3, 6, 4, 2, 1, en FCFS dans cet ordre. Le TMR vaut :
- 8
+ 11,2
- 16
- 7,6
= Fins 3, 9, 13, 15, 16 : somme 56, divisée par 5.

? En SJF non préemptif, à t = 0 un seul processus long est arrivé. On :
+ le lance, même s'il est long
- attend qu'un plus court arrive
- le découpe en quanta
= On ne choisit que parmi les processus arrivés ; sans préemption, il ira jusqu'au bout.

? Combien d'ordres d'exécution différents pour 4 processus sur un CPU ?
- 4
- 16
+ 24
- 8
= 4! = 24.
```

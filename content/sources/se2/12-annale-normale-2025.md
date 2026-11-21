---
id: annale-normale-2025
titre: Annale corrigée · session normale 2025 (08/07/2025)
seance: Examen M24, session ordinaire 2024-2025 (1 h 30)
importance: 5
payant: true
---

Le vrai sujet, dans l'ordre et avec son barème, corrigé question par question. Les méthodes sont aux chapitres 2 (fork), 4 (SRTF), 5 (mémoire) et 7 (disque).

> [!astuce] Fais d'abord le sujet en 1 h 30 sur papier, puis compare question par question.

## Exercice 1 · fork et bras du disque (4 points)

**Énoncé.** A) Programme : `int cpt = 6; while (cpt < 10) { if (fork() > 0) cpt--; else cpt = 3; }`. Q1 : nombre total de processus engendrés (2 pts). B) Disque de 800 cylindres (0 à 799). Dernière requête traitée : piste 250 ; le bras monte (vers 799). File d'attente dans l'ordre d'arrivée : 180, 920, 45, 670, 300, 150, 580. Q2 : nombre total de pistes traversées en FIFO (2 pts).

```c nontest
#include <stdio.h>
#include <unistd.h>
int main() {
    int cpt = 6;
    while (cpt < 10) {
        if (fork() > 0) cpt--;   /* père */
        else cpt = 3;            /* fils */
    }
    return 0;
}
```

```exercice Exercice 1
? Q1 : combien de processus ce programme engendre-t-il ?
= Tel qu'il est écrit, **une infinité** : le père décrémente (cpt reste < 10) et chaque fils repart à 3 (< 10). Tous rebouclent et forkent sans fin : c'est une bombe fork. Si l'on lit `cpt++` dans le père et une sortie de boucle dans le fils (`cpt = 10`), le père forke pour cpt = 6, 7, 8, 9 : 4 fils + le père = **5 processus**. Écris les deux lectures sur ta copie.

? Q2 : déplacement total du bras en FIFO depuis 250.
= La requête 920 est **invalide** (le disque s'arrête à 799) : à signaler. Sans elle : 250→180 (70), →45 (135), →670 (625), →300 (370), →150 (150), →580 (430), total **1780** cylindres. Si l'on traite 920 comme le sujet l'écrit : 70 + 740 + 875 + 625 + 370 + 150 + 430 = **3260**.
reponse: 1780
```

> [!attention] Le sujet contient deux erreurs : la boucle ne termine pas, et la piste 920 n'existe pas sur un disque de 800 cylindres. Le corrigé donne la réponse « littérale » et la réponse « attendue ».

## Exercice 2 · Ordonnancement SRTF (6 points)

**Énoncé.** P1 (arrivée 0, durée 4), P2 (2, 5), P3 (4, 6), P4 (6, 2). Q3 : Gantt SRTF (2 pts). Q4 : tableau temps de rotation, temps d'attente, rendement (3 pts). Q5 : moyennes (1 pt).

> [!attention] Sur le scan, la durée de P2 est mal lisible (5 ou 3 surchargé). La valeur **5** est la seule compatible avec un Gantt qui finit à 17 (4 + 5 + 6 + 2 = 17), comme sur la copie annotée.

```etapes Déroulé SRTF
t = 0 :: seul P1 (4) → P1 démarre.
t = 2 :: P2 arrive (5) ; P1 n'a plus que 2 → P1 continue jusqu'à 4.
t = 4 :: P2 (5) et P3 (6) → P2 démarre.
t = 6 :: P4 arrive (2) ; P2 a encore 3 → **préemption**, P4 de 6 à 8.
t = 8 :: P2 (3) contre P3 (6) → P2 de 8 à 11, puis P3 de 11 à 17.
```

```grille Gantt et tableau (Q3 à Q5)
#cols: Processus | Fin | Rotation = fin − arrivée | Attente = rotation − durée | Rendement = durée ÷ rotation
P1 | 4 | 4 | 0 | 1
P2 | 11 | 9 | 4 | 5/9 ≈ 0,56
P3 | 17 | 13 | 7 | 6/13 ≈ 0,46
P4 | 8 | 2 | 0 | 1
*Moyenne | — | *28/4 = 7 | *11/4 = 2,75 | *≈ 0,75
```

Gantt : P1 [0–4] · P2 [4–6] · P4 [6–8] · P2 [8–11] · P3 [11–17].

```exercice Exercice 2
? Q5 : temps de rotation moyen ?
= (4 + 9 + 13 + 2) ÷ 4 = **7**.
reponse: 7

? Q5 : temps d'attente moyen ?
= (0 + 4 + 7 + 0) ÷ 4 = **2,75**.
reponse: 2,75

? Pourquoi P2 n'interrompt-il pas P1 à t = 2 ?
= SRTF compare le **temps restant** du processus en cours (P1 : 2) à la durée du nouveau (P2 : 5). 2 < 5 : P1 garde le CPU.
```

## Exercice 3 · Pagination et segmentation (5 points)

**Énoncé.** A) Adresse virtuelle 15360. Q6 : numéro de page et déplacement avec des pages de 2 Ko, puis de 8 Ko (3 pts). B) Table des segments : 0 (base 1200, limite 512), 1 (3400, 256), 2 (800, 180), 3 (5000, 2048), 4 (2560, 300). Q7 : adresses physiques de (0:256), (1:200), (2:250), (3:1500), en signalant les erreurs (2 pts).

```exercice Exercice 3
? Q6, pages de 2 Ko : page et déplacement de 15360 ?
= 2 Ko = 2048. 15360 = 7 × 2048 + 1024 : page **7**, déplacement **1024**.

? Q6, pages de 8 Ko ?
= 8 Ko = 8192. 15360 = 1 × 8192 + 7168 : page **1**, déplacement **7168**.

? Q7 : traduis les quatre adresses segmentées.
= On vérifie d'abord déplacement < limite, puis adresse = base + déplacement. (0:256) : 256 < 512 → **1456**. (1:200) : 200 < 256 → **3600**. (2:250) : 250 ≥ 180 → **erreur d'adressage** (déroutement). (3:1500) : 1500 < 2048 → **6500**.
```

## Exercice 4 · Blocs, FAT et partition (5 points)

**Énoncé.** A) Disque de 128 Go, blocs de 8 Ko. Q8 : nombre de blocs (1 pt). Q9 : taille minimale (en bits) d'une adresse de bloc (1 pt). Q10 : avec un SGF à liste chaînée indexée (FAT), nombre de blocs pour sauvegarder la FAT (1 pt). B) Partition de 32 Go, blocs de 16 Ko, adresse de bloc sur 24 bits, SGF de type FAT. Q11 : taille minimale de la FAT (2 pts).

```exercice Exercice 4
? Q8 : nombre de blocs ?
= 128 Go ÷ 8 Ko = 2³⁷ ÷ 2¹³ = **2²⁴** = 16 777 216 blocs.

? Q9 : bits pour adresser un bloc ?
= Il faut numéroter 2²⁴ blocs : **24 bits**.
reponse: 24

? Q10 : blocs occupés par la FAT ?
= Une entrée par bloc, de 24 bits = 3 octets : 2²⁴ × 3 = 48 Mo. 48 Mo ÷ 8 Ko = 3 × 2²⁴ ÷ 2¹³ = 3 × 2¹¹ = **6144 blocs**.
reponse: 6144

? Q11 : taille minimale de la FAT de la partition de 32 Go ?
= Nombre de blocs : 2³⁵ ÷ 2¹⁴ = **2²¹** (2 097 152). Une entrée de 24 bits (3 octets, imposée par l'énoncé) par bloc : 2²¹ × 3 = 6 × 2²⁰ octets = **6 Mo** (soit 384 blocs de 16 Ko).
```

> [!piege] En Q11, ne recalcule pas la taille d'une entrée à partir du nombre de blocs (21 bits) : l'énoncé fixe l'adresse à **24 bits**, c'est elle qui compte.

## Flashcards

```cartes
SRTF :: à chaque arrivée, on compare le temps **restant** du processus en cours à la durée du nouveau.
Rotation :: fin − arrivée.
Attente :: rotation − durée d'exécution.
Rendement :: durée ÷ rotation.
Page / déplacement :: quotient et reste de l'adresse par la taille de page.
Adresse segmentée valide :: déplacement < limite ; adresse = base + déplacement.
Nombre de blocs :: taille disque ÷ taille bloc, en puissances de 2.
Taille de la FAT :: nombre de blocs × taille d'une entrée.
```

## QCM du chapitre

```qcm
? En SRTF, à t = 6, P4 (2) arrive pendant que P2 a encore 3 unités. Que se passe-t-il ?
+ P4 préempte P2
- P2 continue
- P3 prend le CPU
= 2 < 3 : le plus petit temps restant gagne.

? Temps de rotation de P3 (arrivée 4, fin 17) ?
- 17
+ 13
- 7
= 17 − 4.

? Temps d'attente de P2 (rotation 9, durée 5) ?
+ 4
- 9
- 2
= 9 − 5.

? Adresse 15360, pages de 8 Ko : déplacement ?
- 1024
+ 7168
- 15360
= 15360 − 8192.

? (2:250) avec segment 2 (base 800, limite 180) donne :
- 1050
+ une erreur d'adressage
- 980
= 250 ≥ 180.

? (3:1500) avec segment 3 (base 5000, limite 2048) donne :
+ 6500
- 3500
- erreur
= 1500 < 2048, 5000 + 1500.

? 128 Go en blocs de 8 Ko font :
- 2¹⁶ blocs
+ 2²⁴ blocs
- 2³⁷ blocs
= 2³⁷ ÷ 2¹³.

? Partition de 32 Go, blocs de 16 Ko : nombre de blocs ?
- 2¹⁹
+ 2²¹
- 2²⁴
= 2³⁵ ÷ 2¹⁴.

? FAT de 2²¹ entrées de 24 bits :
+ 6 Mo
- 2 Mo
- 48 Mo
= 2²¹ × 3 octets.

? En FIFO, le bras du disque :
+ sert les requêtes dans l'ordre d'arrivée
- va toujours vers la piste la plus proche
- balaie dans un seul sens
= FIFO ignore le sens de déplacement.
```

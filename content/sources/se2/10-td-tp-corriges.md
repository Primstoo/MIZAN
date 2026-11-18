---
id: td-tp-corriges
titre: TD 1 à 5 et TP 1 à 3 corrigés
seance: Travaux dirigés et pratiques
importance: 4
---

Ce chapitre regroupe **toutes les réponses** des TD et TP, recalculées. Les méthodes sont expliquées dans les chapitres 1 à 9 ; ici, on va droit au résultat. Fais chaque exercice sur papier avant de lire.

> [!attention] Le document « Rapports TD SE2 » qui circule (corrigé d'étudiant, 2024) contient des erreurs : données recopiées de travers (TD2 ex. 2, TD3 ex. 3), tableaux de temps faux, i-node, FAT, préséance et TD5 ex. 2. Chaque erreur est signalée ci-dessous.

## TD1 · Processus

```grille TD1, exercices 2, 3 et 5
#cols: Code | Processus au total | Remarque
fork(); fork(); | *4 | 2²
if (fork() > 0) fork(); | *3 | seul le père re-forke
while (cpt < 3) { if (fork() > 0) cpt++; else cpt = 3; } | *4 | le père crée 3 fils
fork1 / fork2 / fork3 (ex. 3) | *8 | « fork1 » ×2, « fork2 » ×4, « fork3 » ×8
fork(); fork(); fork(); printf("hello") (ex. 5) | *8 | 8 « hello »
```

> [!attention] Le corrigé étudiant donne « fork1 : 1, fork2 : 2, fork3 : 4 ». C'est faux : « fork1 » est affiché **après** le premier fork, donc par 2 processus ; « fork2 » par 4 ; « fork3 » par 8. Total 14 lignes.

Ex. 1 : a **faux**, b **vrai**, c **faux** (chapitre 1). Ex. 4 : programme corrigé testé au chapitre 2. Ex. 6 (chaîne et arbre) : chapitre 2, idée 5 ; le corrigé étudiant inverse les deux structures, et sa boucle d'affichage commence à 0 au lieu de 1.

## TD2 · Ordonnancement

```grille TD2 ex. 2 : P1 (0,3), P2 (2,6), P3 (4,4), P4 (6,5), P5 (8,2)
#cols: Algorithme | Gantt | TMR | TMA
FCFS | P1 0–3, P2 3–9, P3 9–13, P4 13–18, P5 18–20 | 8,6 | *4,6
SJF | P1 0–3, P2 3–9, P5 9–11, P3 11–15, P4 15–20 | 7,6 | *3,6
SRTF | P1 0–3, P2 3–4, P3 4–8, P5 8–10, P2 10–15, P4 15–20 | 7,2 | *3,2
```

Débit identique pour les trois : 5 processus en 20 unités = **0,25** processus par unité de temps.

```grille TD2 ex. 3 : A (0,3), B (1,6), C (4,4), D (6,2)
#cols: Algorithme | Gantt | TMR | TMA
SRTF | A 0–3, B 3–4, C 4–8, D 8–10, B 10–15 | 6,25 | *2,5
RR q = 2 | A 0–2, B 2–4, A 4–5, C 5–7, B 7–9, D 9–11, C 11–13, B 13–15 | 8,25 | *4,5
```

```grille TD2 ex. 4 (grand nombre = prioritaire)
#cols: Mode | Gantt | TMR | TMA
Non préemptif | A 0–5, C 5–7, D 7–11, B 11–15 | 7,5 | *3,75
Préemptif | A 0–2, C 2–4, A 4–7, D 7–11, B 11–15 | 7,25 | *3,5
```

> [!attention] Le corrigé étudiant inverse TMR et TMA dans plusieurs tableaux (ex. « TMR = 3,6 » pour SJF), recopie P4 avec une arrivée à 5 et donne pour RR un TMA de 4 au lieu de 4,5. Il a aussi échangé les colonnes de l'ex. 4 (TMA 7,5 annoncé au lieu de 3,75).

Ex. 1 : FCFS (non préemptif), SJF (deux versions), SRTF (préemptif), RR (préemptif), priorités (deux versions) ; quantum grand → FCFS ; **n!** ordres possibles ; SJF = priorités avec priorité = 1/durée.

## TD3 · Mémoire

Ex. 1 : a → **1111010101010** (7850), b → **110000000001** (3073). Ex. 2 : 4 Ko → (4, 3616), (8, 0), (15, 2656) ; 8 Ko → (2, 3616), (4, 0), (7, 6752). Ex. 4 et ex. 5 : chapitre 5 (668, 1354, erreur, 2936, 1076, erreur ; (4,200) invalide ; 1008, 34, 1322, erreur, défaut de page). Ex. 5 q. 5 : page 0 → cadre 0011 → **0011 0000 0000 0111**.

**Ex. 3, question 1** (on suppose qu'une zone prise est entièrement occupée, puisque le découpage n'est introduit qu'à la question 2) :

```grille TD3 ex. 3.1 : z1=11, z2=4, z3=24, z4=18, z5=7, z6=9, z7=14, z8=15 Ko
#cols: Requête | First-fit | Next-fit | Best-fit | Worst-fit
12 Ko | z3 | z3 | *z7 | z3
10 Ko | z1 | z4 | z1 | z4
9 Ko | z4 | z6 | z6 | z8
```

**Ex. 3, question 2** (avec découpage ; Zi1 = partie prise, Zi2 = reste libre, Zi3 = reste après un second découpage) :

```grille TD3 ex. 3.2 : Z1=3, Z2=14, Z3=12, Z4=8, Z5=4, Z6=5 Ko
#cols: Requête | First-fit | Next-fit | Best-fit | Worst-fit
7 Ko | Z21 | Z21 | Z41 | Z21
2 Ko | Z11 | Z22 | *Z11 | *Z31
5 Ko | Z22 | Z23 | Z6 | *Z32
8 Ko | Z31 | Z31 | Z31 | *Z4
```

> [!attention] Le corrigé étudiant remplace z1 = 11 par 10, place 12 Ko dans z4 en best-fit (la plus petite zone ≥ 12 est z7 = 14), place 2 Ko dans Z42 en best-fit (Z42 ne fait que 1 Ko) et suit mal le worst-fit de la question 2 (après 7 Ko, la plus grande zone est Z3 = 12, pas le reste de Z2 = 7).

## TD4 · Fichiers et disque

64 Go / 4 Ko → 2²⁴ blocs, **24 bits**, FAT de 48 Mo = **12 288 blocs**. 16 Go / 8 Ko → 2²¹ blocs : FAT max **8 Mo**, min **5,25 Mo** (21 bits). i-node (1 Ko, pointeurs 4 octets) : max ≈ **16,06 Go** ; 532 Ko → 532 blocs de données + 4 d'index ; 100 000 octets → 98 + 1 = **99 blocs**. Disque (345, vers 0) : FIFO **2013**, SSTF **1298**, SCAN **1219**. Détails : chapitre 7.

**SSTF favorise le centre** : on a intérêt à placer au centre du disque les données les plus utilisées (répertoires, i-nodes, FAT), et à surveiller la famine des pistes extrêmes.

## TD5 · Synchronisation (et ex. 1 de l'ancien TD5 « disque »)

Préséance : 7 sémaphores à 0, un par flèche (chapitre 8). Ex. 2 : **valide**, pas d'interblocage (chapitre 8). Ex. 3 : producteur/consommateur avec Mutex, Plein, Vide. Capacité CHS : cylindre 8 064 000 octets, plateau 32 901 120 octets, disque 8 225 280 000 octets.

## TP1 à TP3 · Programmation système

| TP | Ce qu'il faut savoir écrire | Où |
|---|---|---|
| TP1 | fork + getpid/getppid, wait + WEXITSTATUS, execlp/execvp, chaîne, arbre | chapitre 2 |
| TP2 | mémoire séparée après fork, `&` contre `;`, pipe père → fils, producteur/consommateur | chapitres 2 et 9 |
| TP3 | zombie (et `signal(SIGCHLD, SIG_IGN)`), FIFO, SIGUSR1, `kill(-getpid())`, client/serveur FIFO + signal | chapitres 2 et 9 |
| TP « Pipes et FIFO » | majuscules avec `toupper`, deux tubes aller-retour, `ls` branché sur `wc -l` avec dup2 | chapitre 9 |

TP2, ex. 1 : le fils affiche **200**, le père **300** ; les adresses de `n` sont **identiques** (adresses virtuelles), mais les pages physiques diffèrent.

```c nontest
/* TP « Pipes et FIFO », ex. 2 : deux tubes. Le pere envoie 10 entiers, le fils renvoie somme, min, max. */
int aller[2], retour[2];
pipe(aller); pipe(retour);
if (fork() == 0) {
    close(aller[1]); close(retour[0]);
    int t[10], r[3];
    read(aller[0], t, sizeof t);
    r[0] = 0; r[1] = r[2] = t[0];
    for (int i = 0; i < 10; i++) { r[0] += t[i]; if (t[i] < r[1]) r[1] = t[i]; if (t[i] > r[2]) r[2] = t[i]; }
    write(retour[1], r, sizeof r);
    exit(0);
}
close(aller[0]); close(retour[1]);
write(aller[1], tab, 10 * sizeof(int)); close(aller[1]);
read(retour[0], res, 3 * sizeof(int)); wait(NULL);
```

## S'exercer

```exercice Refaire les points délicats
? TD2 ex. 3 en RR (q = 2) : à t = 4, quelle est la file des prêts juste après la préemption de B ?
= C arrive à 4 et entre en premier, puis B est remis en queue. A était déjà en attente : file **[A, C, B]**.

? TD3 ex. 3.1, best-fit pour 12 Ko : quelle zone ?
= Zones ≥ 12 : 24, 18, 14, 15. La plus petite est **z7 = 14 Ko**.

? TD1 ex. 3 : combien de lignes affichées au total ?
reponse: 14
= 2 + 4 + 8 = **14**.
```

## Flashcards

```cartes
TD2 ex. 2, TMA FCFS / SJF / SRTF :: 4,6 / 3,6 / 3,2.
TD2 ex. 3, TMA SRTF / RR q=2 :: 2,5 / 4,5.
TD2 ex. 4, TMA priorités non préemptif / préemptif :: 3,75 / 3,5.
TD3 ex. 3.1, best-fit 12 Ko :: z7 (14 Ko).
TD4 disque 345 vers 0, FIFO / SSTF / SCAN :: 2013 / 1298 / 1219 pistes.
TD5 ex. 2 (mutex1, mutex2) :: Valide : pas d'attente circulaire, n et out bien protégés.
TD1 ex. 3, nombre de « fork1 », « fork2 », « fork3 » :: 2, 4, 8.
```

## QCM du chapitre

```qcm
? TD2 ex. 2 en SRTF, quel processus s'exécute de 4 à 8 ?
- P2
+ P3
- P4
= P3 (4) a un temps restant plus petit que P2 (5).

? TD2 ex. 2 en SJF non préemptif, qui passe à t = 9 ?
- P3
- P4
+ P5
= P5 (2) est le plus court des arrivés.

? TD2 ex. 3 en RR q = 2, quand A termine-t-il ?
- 3
+ 5
- 7
= A 0–2 puis A 4–5.

? TD3 ex. 3.2 en best-fit, où vont les 2 Ko demandés en 2e ?
+ Z1 (3 Ko)
- Z42 (1 Ko)
- Z6 (5 Ko)
= Z42 est trop petit ; la plus petite zone ≥ 2 est Z1.

? TD3 ex. 5 : adresse virtuelle 2072 avec 8 pages de 256 mots :
- 24
+ erreur : page 8 inexistante
- défaut de page
= 2072 ÷ 256 = 8, or les pages vont de 0 à 7.

? TD1 : `if (fork() > 0) fork();` crée au total :
- 2 processus
+ 3 processus
- 4 processus
= Le fils ne re-forke pas.

? TD5 ex. 2 : la proposition à deux mutex :
+ est valide
- provoque un interblocage
- ne protège pas out
= Aucune attente circulaire possible.

? TD4 : un fichier de 532 Ko (blocs de 1 Ko, 12 directs, N = 256) utilise l'indirection double ?
+ Oui
- Non
= 532 > 12 + 256 = 268.

? TP2 : pour simuler `who ; ps ; ls -l`, le père fait :
- 3 fork puis 3 wait
+ fork, wait, fork, wait, fork, wait
- un seul fork
= Le `;` impose l'ordre : une commande à la fois.

? TP3 : quel appel évite les zombies sans wait() ?
+ signal(SIGCHLD, SIG_IGN)
- signal(SIGUSR1, SIG_IGN)
- pause()
= Le système nettoie alors les fils automatiquement.
```

---
id: revision-examen-blanc
titre: Révision et examen blanc
seance: Annales 2025 (normale et rattrapage)
importance: 5
---

## Ce que tombe à l'examen

Les deux sujets de 2025 (1 h 30, documents interdits) ont la même structure : **4 exercices de calcul**, presque pas de cours.

```grille Annales 2025 : ce qui a été demandé
#cols: Thème | Normale (juillet 2025) | Rattrapage | Points
Processus | compter les processus d'une boucle avec fork | — | 2
Ordonnancement | *Gantt SRTF + tableau rotation/attente/rendement | *Gantt RR q=2 + tableau | 6 à 8
Mémoire | page/déplacement (2 Ko, 8 Ko), adresses segmentées | first-fit / next-fit, adresses segmentées | 3 à 5
Fichiers et disque | FIFO du bras, nombre de blocs, bits d'adresse, FAT | i-node : taille max, blocs d'un fichier | 4 à 5
Synchronisation | — | lecteurs/rédacteurs (problème + correction) | 3
```

> [!prof] Les calculs de Gantt pèsent le plus lourd. Entraîne-toi à faire un Gantt complet + tableau en **15 minutes**.

> [!attention] Dans le sujet de la session normale, le programme de l'exercice 1 est `int cpt=6; while (cpt < 10) { if (fork() > 0) cpt--; else cpt=3; }`. Tel qu'il est écrit, le père fait `cpt--` (il reste toujours sous 10) et chaque fils met `cpt = 3` (aussi sous 10) : **tous bouclent et forkent sans fin**, le nombre de processus est illimité (bombe fork). Le sujet attendait sans doute `cpt++` dans le père et une sortie de boucle dans le fils (par ex. `cpt = 10`) : le père forkerait alors 4 fois (cpt = 6, 7, 8, 9), soit **5 processus**. À l'examen, écris les deux lectures. De même, la file du disque contient **920** alors que le disque n'a que 800 cylindres (0 à 799) : requête invalide à signaler.

## Méthodes express

```etapes Les 5 réflexes de l'examen
Gantt :: Frise graduée, file des prêts réécrite à chaque événement, date de fin sous chaque processus.
Temps :: Rotation = fin − arrivée ; attente = rotation − exécution ; rendement = exécution ÷ rotation ; moyennes sur n.
Adresses :: page = adresse ÷ taille, déplacement = reste ; segment valide si déplacement < limite.
Disque :: blocs = taille disque ÷ taille bloc en puissances de 2 ; bits = exposant ; FAT = blocs × taille d'entrée.
Sémaphores :: un mutex à 1 par donnée partagée, un sémaphore à 0 par « attendre que ».
```

## Examen blanc (1 h 30, sur 20)

Fais-le sans regarder le corrigé, puis note-toi.

**Exercice 1 (3 pts).** a) Combien de processus au total crée `int main(){ int i; for (i = 0; i < 3; i++) if (fork() == 0) break; }` ? b) Qu'est-ce qu'un processus zombie et comment l'éviter ?

**Exercice 2 (7 pts).** Cinq processus arrivés à t = 0 dans l'ordre P1 (2), P2 (1), P3 (8), P4 (4), P5 (5) (rattrapage 2025). a) Gantt **Round-Robin, q = 2**. b) Temps de rotation et d'attente de chaque processus, TMR, TMA. c) Rendement moyen.

**Exercice 3 (5 pts).** a) Mémoire en zones Z1 = 4, Z2 = 12, Z3 = 9, Z4 = 6, Z5 = 5, Z6 = 8 Ko ; requêtes 11, 2, 5, 7 Ko. Zones choisies en first-fit et next-fit (une zone trop grande est découpée, le reste restant libre). b) Adresse 15360 : page et déplacement pour des pages de 2 Ko et 8 Ko.

**Exercice 4 (5 pts).** a) Disque de 128 Go, blocs de 8 Ko : nombre de blocs, bits pour adresser un bloc, nombre de blocs occupés par la FAT. b) i-node à 12 directs + simple + double + triple, blocs de 1 Ko, pointeurs de 4 octets : nombre total de blocs pour un fichier de 77 824 octets. c) Tête en 250, 800 cylindres, file 180, 45, 670, 300, 150, 580 : total parcouru en FIFO.

## Corrigé

```python
def rr(procs, q):
    file = [p for p, _ in procs]
    reste = dict(procs)
    t, fin, gantt = 0, {}, []
    while file:
        p = file.pop(0)
        d = min(q, reste[p])
        gantt.append(f"{p}[{t}-{t + d}]")
        t += d
        reste[p] -= d
        if reste[p]:
            file.append(p)
        else:
            fin[p] = t
    print(" ".join(gantt))
    rot = {p: fin[p] for p, _ in procs}                  # arrivée = 0
    att = {p: rot[p] - d for p, d in procs}
    for p, d in procs:
        print(f"{p} : rotation {rot[p]}, attente {att[p]}, rendement {d}/{rot[p]}")
    n = len(procs)
    print(f"TMR = {sum(rot.values()) / n:g} ; TMA = {sum(att.values()) / n:g}")
    print(f"rendement moyen = {sum(d / rot[p] for p, d in procs) / n:.3f}")

rr([("P1", 2), ("P2", 1), ("P3", 8), ("P4", 4), ("P5", 5)], 2)
```

```sortie
P1[0-2] P2[2-3] P3[3-5] P4[5-7] P5[7-9] P3[9-11] P4[11-13] P5[13-15] P3[15-17] P5[17-18] P3[18-20]
P1 : rotation 2, attente 0, rendement 2/2
P2 : rotation 3, attente 2, rendement 1/3
P3 : rotation 20, attente 12, rendement 8/20
P4 : rotation 13, attente 9, rendement 4/13
P5 : rotation 18, attente 13, rendement 5/18
TMR = 11.2 ; TMA = 7.2
rendement moyen = 0.464
```

```exercice Corrigé détaillé
? Ex. 1 a) `for (i = 0; i < 3; i++) if (fork() == 0) break;` : combien de processus au total ?
reponse: 4
= Chaque fils sort de la boucle (`break`) ; seul le père forke, 3 fois : **4 processus** (un arbre). b) Zombie : fils terminé dont le père n'a pas fait `wait()` ; on l'évite avec `wait()`/`waitpid()` ou `signal(SIGCHLD, SIG_IGN)`.

? Ex. 2 : TMA du Round-Robin ?
reponse: 7.2 ~0.01
= Voir le programme ci-dessus : TMR = 56/5 = **11,2**, TMA = 36/5 = **7,2**, rendement moyen ≈ 0,464. Le débit vaut 5/20 = 0,25.

? Ex. 3 a) first-fit et next-fit pour 11, 2, 5, 7 Ko.
= **First-fit** : 11 → Z2 (reste 1), 2 → Z1 (reste 2), 5 → Z3 (reste 4), 7 → Z6 (reste 1).
  **Next-fit** : 11 → Z2 (reste 1), 2 → Z3 (on repart de Z2, son reste de 1 Ko est trop petit ; Z3 garde 7), 5 → Z3 (reste 2), 7 → Z6.
  b) 2 Ko : page **7**, dép 1024 ; 8 Ko : page **1**, dép 7168.

? Ex. 4 a) 128 Go, blocs de 8 Ko : nombre de blocs FAT ?
reponse: 6144
= 2³⁷ ÷ 2¹³ = **2²⁴ blocs**, donc **24 bits** (3 octets). FAT = 2²⁴ × 3 = 48 Mo = 48 Mo ÷ 8 Ko = **6144 blocs**.

? Ex. 4 b) blocs pour 77 824 octets ?
reponse: 77
= 77 824 ÷ 1024 = **76 blocs de données** (12 directs + 64 par l'indirection simple) + **1 bloc d'index** = **77**. (Taille max du système : (12 + 256 + 256² + 256³) Ko ≈ 16,06 Go.)

? Ex. 4 c) FIFO depuis 250 : 180, 45, 670, 300, 150, 580.
reponse: 1780
= 70 + 135 + 625 + 370 + 150 + 430 = **1780** cylindres. (Avec la requête 920 du sujet, invalide sur 800 cylindres, on obtiendrait 3260.)
```

## Flashcards

```cartes
Structure des examens 2025 :: 4 exercices : processus/fork, ordonnancement (Gantt + tableau), mémoire (adresses, allocation), fichiers/disque (FAT, i-node, bras) ; rattrapage avec lecteurs/rédacteurs.
Rendement dans les tableaux d'examen :: Temps d'exécution ÷ temps de rotation.
RR q=2, P1(2) P2(1) P3(8) P4(4) P5(5) tous à 0 :: TMR 11,2 ; TMA 7,2.
128 Go, blocs de 8 Ko :: 2²⁴ blocs, 24 bits, FAT de 48 Mo = 6144 blocs.
32 Go, blocs de 16 Ko, FAT minimale :: 2²¹ blocs × 21 bits = 5,25 Mo.
77 824 octets, i-node, blocs 1 Ko :: 76 blocs de données + 1 index = 77.
Correction lecteurs/rédacteurs :: Sémaphore Acces : premier lecteur P(Acces), dernier V(Acces), rédacteur P/V(Acces).
```

## QCM du chapitre

```qcm
? En RR q = 2 (P1 2, P2 1, P3 8, P4 4, P5 5, tous à 0), qui termine en dernier ?
- P5
+ P3
- P4
= P3 finit à 20, P5 à 18.

? Rotation de P4 dans ce même RR :
- 11
+ 13
- 9
= P4 [5–7] puis [11–13].

? 128 Go avec des blocs de 8 Ko donnent :
- 2²⁰ blocs
+ 2²⁴ blocs
- 2²⁷ blocs
= 37 − 13 = 24.

? Partition de 32 Go, blocs de 16 Ko, adresses sur 24 bits. Taille minimale de la FAT ?
- 6 Mo
+ 5,25 Mo
- 8 Mo
= 2²¹ blocs × 21 bits = 2²¹ × 21 ÷ 8 octets = 5,25 Mo (6 Mo avec des entrées de 3 octets).

? Segment base 560, limite 215 : (0:210) donne :
+ 770
- erreur
- 350
= 210 < 215, donc 560 + 210.

? Pages de 2 Ko, adresse 15360 :
- page 1, dép 7168
+ page 7, dép 1024
- page 7, dép 1536
= 7 × 2048 = 14336 ; reste 1024.

? Dans la solution lecteurs/rédacteurs du rattrapage, le défaut est :
- un interblocage entre lecteurs
+ rien n'empêche un rédacteur d'écrire pendant une lecture
- nb_lecteurs n'est pas protégé
= Mutex protège le compteur, pas la ressource.

? First-fit, zones 4, 12, 9, 6, 5, 8 Ko : où vont les 11 Ko ?
+ Z2
- Z3
- Z6
= Seule Z2 (12) est assez grande.

? Une boucle `while` où le père fait `cpt--` sous la condition `cpt < 10` sans jamais l'atteindre :
- crée 4 processus
+ ne s'arrête pas (création infinie)
- ne crée aucun processus
= C'est le cas du sujet 2025 tel qu'il est imprimé.

? FIFO du bras de 250 vers 180 puis 45 : distance parcourue sur ces deux requêtes :
- 135
+ 205
- 115
= 70 + 135.
```

---
id: ordo-preemptif
titre: Ordonnancement (2) · SRTF, SJF préemptif, Round-Robin et priorités
seance: Chapitre 2 · Ordonnancement des processus (suite) · TD2
importance: 5
---

## Avant de commencer

Ce chapitre suppose que tu sais dessiner un Gantt FCFS ou SJF et appliquer **rotation = fin − arrivée**, **attente = rotation − exécution** (chapitre précédent).

```exercice Vérifie ton prérequis
? Un processus arrive à 2, dure 6, et termine à 15. Rotation et attente ?
= Rotation = 15 − 2 = **13**. Attente = 13 − 6 = **7**. Ces deux formules restent valables même si le processus a été coupé en plusieurs morceaux : on ne regarde que sa date de **fin**.
```

## Comment aborder ce chapitre

> [!astuce] En préemptif, **réexamine la file à chaque événement** : une arrivée, une fin, une fin de quantum. Tiens à jour, au crayon, un petit tableau « temps restant » pour chaque processus.

> [!piege] En Round-Robin, oublier **où** remettre le processus coupé. Il va **en queue** de la file, **après** les processus arrivés pendant son quantum. Une erreur d'ordre ici fausse tout le reste du Gantt.

À la fin, tu sais dessiner les Gantt SRTF, RR et priorités (avec ou sans préemption) et en tirer les temps moyens.

## Idée 1 · SRTF : le plus petit temps restant

**SRTF** (*Shortest Remaining Time First*, PCTER) est **préemptif** : à chaque arrivée, on compare le **temps restant** du processus en cours avec la durée du nouveau. Le plus petit prend le CPU.

```etapes SRTF, exemple du cours : P1 (0, 7), P2 (2, 4), P3 (4, 1), P4 (5, 4)
t = 0 :: Seul P1 est là. Il démarre.
t = 2 :: P2 arrive (4). P1 a encore 5 : P2 (4 < 5) prend le CPU.
t = 4 :: P3 arrive (1). P2 a encore 2 : P3 (1 < 2) prend le CPU.
t = 5 :: P3 fini. P4 arrive (4). Restes : P2 = 2, P4 = 4, P1 = 5. P2 reprend.
t = 7 :: P2 fini. P4 (4) avant P1 (5).
t = 11 :: P4 fini. P1 termine ses 5 unités : fin à 16.
```

```grille SRTF, exemple du cours
#cols: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
#rows: P1 P2 P3 P4
*■ *■ ~· ~· ~· ~· ~· ~· ~· ~· ~· *■ *■ *■ *■ *■
~ ~ *■ *■ ~· *■ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~ ~ ~ *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~ ~ ~ ~ ~· ~· *■ *■ *■ *■ ~ ~ ~ ~ ~
```

```python
def temps(fin, arrivee, duree):
    rot = {p: fin[p] - arrivee[p] for p in fin}
    att = {p: rot[p] - duree[p] for p in fin}
    for p in fin:
        print(f"{p} : rotation {fin[p]}-{arrivee[p]}={rot[p]}  attente {rot[p]}-{duree[p]}={att[p]}")
    n = len(fin)
    print(f"TMR = {sum(rot.values())}/{n} = {sum(rot.values())/n:g} ; TMA = {sum(att.values())}/{n} = {sum(att.values())/n:g}")

temps(fin={"P1": 16, "P2": 7, "P3": 5, "P4": 11},
      arrivee={"P1": 0, "P2": 2, "P3": 4, "P4": 5},
      duree={"P1": 7, "P2": 4, "P3": 1, "P4": 4})
```

```sortie
P1 : rotation 16-0=16  attente 16-7=9
P2 : rotation 7-2=5  attente 5-4=1
P3 : rotation 5-4=1  attente 1-1=0
P4 : rotation 11-5=6  attente 6-4=2
TMR = 28/4 = 7 ; TMA = 12/4 = 3
```

On retrouve le TMA = 3 des diapos.

> [!retenir] SRTF minimise l'attente des processus courts, mais **pénalise les longs** (risque de **famine**) et ne tient pas compte de leur importance.

## Idée 2 · « SJF préemptif » dans le cours : on compare les durées totales

Le cours traite à part un **SJF préemptif**. Dans son exemple (P2 (0, 12), P3 (3, 8), P4 (5, 4), P1 (10, 10), P5 (12, 6)), le choix se fait sur la **durée totale** de chaque processus, pas sur son temps restant.

```grille SJF préemptif du cours (frise compacte)
#cols: 0–3 | 3–5 | 5–9 | 9–12 | 12–18 | 18–21 | 21–31 | 31–40
*P2 | *P3 | *P4 | *P3 | *P5 | *P3 | *P1 | *P2
```

À t = 12, P5 (durée 6) coupe P3 (durée 8), alors que P3 n'avait plus que 3 unités à faire. Et à t = 21, P1 (10) passe avant P2 (12), alors qu'il ne restait que 9 à P2.

```python
temps(fin={"P2": 40, "P3": 21, "P4": 9, "P1": 31, "P5": 18},
      arrivee={"P2": 0, "P3": 3, "P4": 5, "P1": 10, "P5": 12},
      duree={"P2": 12, "P3": 8, "P4": 4, "P1": 10, "P5": 6})
```

```sortie
P2 : rotation 40-0=40  attente 40-12=28
P3 : rotation 21-3=18  attente 18-8=10
P4 : rotation 9-5=4  attente 4-4=0
P1 : rotation 31-10=21  attente 21-10=11
P5 : rotation 18-12=6  attente 6-6=0
TMR = 89/5 = 17.8 ; TMA = 49/5 = 9.8
```

C'est bien le TMA = 9,8 des diapos.

> [!attention] Dans la plupart des livres, « SJF préemptif » est **synonyme** de SRTF (on compare les temps restants). Avec SRTF, cet exemple donne TMA = **9** au lieu de 9,8 (P5 n'interrompt plus P3). À l'examen, si l'énoncé dit « SRTF », compare les **temps restants** ; s'il dit « SJF avec préemption », précise la règle que tu appliques en une phrase.

## Idée 3 · Round-Robin : chacun son quantum

**RR** (tourniquet) : FCFS **avec préemption** par une horloge. Chaque processus reçoit au plus un **quantum** q de CPU (10 à 100 ms en vrai), puis retourne **en queue** de file.

```etapes Les règles qui font tout le Round-Robin
Tête de file :: Le processus en tête reçoit le CPU pour au plus q unités.
Il finit avant q :: Il sort ; le suivant démarre aussitôt (pas besoin d'attendre la fin du quantum).
Il n'a pas fini après q :: Il est préempté et remis EN QUEUE.
Ordre à l'instant t :: Les processus qui arrivent à t entrent dans la file AVANT celui qui vient d'être préempté à t (convention suivie par le cours).
Garantie :: Avec n processus, chacun attend au plus (n − 1) × q avant de reprendre la main.
```

**TD2, exercice 3** : A (0, 3), B (1, 6), C (4, 4), D (6, 2), q = 2.

```grille RR quantum 2, TD2 exercice 3
#cols: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14
#rows: A B C D
*■ *■ ~· ~· *■ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
~ ~· *■ *■ ~· ~· ~· *■ *■ ~· ~· ~· ~· *■ *■
~ ~ ~ ~ ~· *■ *■ ~· ~· ~· ~· *■ *■ ~ ~
~ ~ ~ ~ ~ ~ ~· ~· ~· *■ *■ ~ ~ ~ ~
```

File : à t = 2 → [B, A] ; à t = 4, C arrive puis B est remis : [A, C, B] ; A finit à 5 ; à t = 6, D arrive puis C remis : [B, D, C]…

```python
temps(fin={"A": 5, "B": 15, "C": 13, "D": 11},
      arrivee={"A": 0, "B": 1, "C": 4, "D": 6},
      duree={"A": 3, "B": 6, "C": 4, "D": 2})
```

```sortie
A : rotation 5-0=5  attente 5-3=2
B : rotation 15-1=14  attente 14-6=8
C : rotation 13-4=9  attente 9-4=5
D : rotation 11-6=5  attente 5-2=3
TMR = 33/4 = 8.25 ; TMA = 18/4 = 4.5
```

**Exemple du cours** (q = 5) : P1 (0, 12), P2 (1, 8), P3 (2, 4), P4 (3, 10), P5 (4, 5).

```grille RR quantum 5, exemple du cours (frise compacte)
#cols: 0–5 | 5–10 | 10–14 | 14–19 | 19–24 | 24–29 | 29–32 | 32–37 | 37–39
*P1 | *P2 | *P3 | *P4 | *P5 | *P1 | *P2 | *P4 | *P1
```

```python
temps(fin={"P1": 39, "P2": 32, "P3": 14, "P4": 37, "P5": 24},
      arrivee={"P1": 0, "P2": 1, "P3": 2, "P4": 3, "P5": 4},
      duree={"P1": 12, "P2": 8, "P3": 4, "P4": 10, "P5": 5})
```

```sortie
P1 : rotation 39-0=39  attente 39-12=27
P2 : rotation 32-1=31  attente 31-8=23
P3 : rotation 14-2=12  attente 12-4=8
P4 : rotation 37-3=34  attente 34-10=24
P5 : rotation 24-4=20  attente 20-5=15
TMR = 136/5 = 27.2 ; TMA = 97/5 = 19.4
```

TMA = 19,4 : identique aux diapos.

> [!prof] **Effet du quantum (TD2, ex. 1).** Quantum **très grand** : RR devient **FCFS** (personne n'est jamais coupé). Quantum **très petit** : beaucoup de commutations de contexte, donc beaucoup de temps perdu.

## Idée 4 · Priorités, avec ou sans préemption

Chaque processus a une **priorité** ; le CPU va au plus prioritaire (FCFS en cas d'égalité).

- **Non préemptif** : le processus en cours termine son cycle.
- **Préemptif** : un nouveau venu plus prioritaire prend la main tout de suite.

> [!piege] **Lis l'énoncé** : dans le cours, la priorité 1 est la plus forte (petit nombre = prioritaire). Dans le TD2 ex. 4, c'est l'inverse : « un nombre de priorité élevé correspond à une priorité plus importante ».

**Exemple du cours, non préemptif** (tous à t = 0 ; priorités P1 = 3, P2 = 1, P3 = 4, P4 = 5, P5 = 2 ; durées 10, 1, 2, 1, 5) : ordre P2, P5, P1, P3, P4.

```grille Priorités non préemptif, exemple du cours (1 = plus prioritaire)
#cols: 0–1 | 1–6 | 6–16 | 16–18 | 18–19
*P2 | *P5 | *P1 | *P3 | *P4
```

Attentes : P1 = 6, P2 = 0, P3 = 16, P4 = 18, P5 = 1, donc TMA = 41/5 = **8,2**.

**Version préemptive** (arrivées 0, 1, 2, 3, 4) : P1 démarre, P2 (priorité 1) le coupe à t = 1, P1 reprend à 2, P5 (priorité 2) le coupe à 4, P1 reprend à 9.

```grille Priorités préemptif, exemple du cours
#cols: 0–1 | 1–2 | 2–4 | 4–9 | 9–16 | 16–18 | 18–19
*P1 | *P2 | *P1 | *P5 | *P1 | *P3 | *P4
```

```python
temps(fin={"P1": 16, "P2": 2, "P3": 18, "P4": 19, "P5": 9},
      arrivee={"P1": 0, "P2": 1, "P3": 2, "P4": 3, "P5": 4},
      duree={"P1": 10, "P2": 1, "P3": 2, "P4": 1, "P5": 5})
```

```sortie
P1 : rotation 16-0=16  attente 16-10=6
P2 : rotation 2-1=1  attente 1-1=0
P3 : rotation 18-2=16  attente 16-2=14
P4 : rotation 19-3=16  attente 16-1=15
P5 : rotation 9-4=5  attente 5-5=0
TMR = 54/5 = 10.8 ; TMA = 35/5 = 7
```

> [!retenir] Le risque des priorités est la **famine** : un processus peu prioritaire peut ne jamais passer. Remède : le **vieillissement** (*aging*), qui augmente la priorité d'un processus avec son temps d'attente.

```grille Récapitulatif des algorithmes
#cols: Algorithme | Critère de choix | Préemptif ?
FCFS | ordre d'arrivée | non
SJF | durée totale la plus courte | les deux versions
SRTF | temps restant le plus court | *oui
RR | ordre d'arrivée + quantum | *oui
Priorités | priorité la plus forte | les deux versions
```

## S'exercer

```exercice TD2 et annales
? TD2 ex. 2 en **SRTF** : P1 (0, 3), P2 (2, 6), P3 (4, 4), P4 (6, 5), P5 (8, 2). Gantt et TMA ?
indice: À t = 4, P3 (4) arrive et P2 n'a plus que 5.
reponse: 3.2 ~0.01
= Gantt : P1 [0–3], P2 [3–4], P3 [4–8], P5 [8–10], P2 [10–15], P4 [15–20].
  Rotations : 3, 13, 4, 14, 2 → TMR = 36/5 = **7,2**.
  Attentes : 0, 7, 0, 9, 0 → TMA = 16/5 = **3,2**.

? TD2 ex. 3 en **SJF avec préemption** : A (0, 3), B (1, 6), C (4, 4), D (6, 2). Gantt ?
= Avec SRTF : A [0–3], B [3–4], C [4–8], D [8–10], B [10–15]. TMR = 25/4 = 6,25 ; TMA = 10/4 = **2,5**.
  Avec la règle du cours (durées totales), à t = 6 D (2) coupe C (4) : A [0–3], B [3–4], C [4–6], D [6–8], C [8–10], B [10–15] ; même TMA = 2,5 (C attend 2 et D 0 au lieu de 0 et 2).

? TD2 ex. 4, priorités (**grand nombre = prioritaire**) : A (0, 5, p4), B (2, 4, p2), C (2, 2, p6), D (4, 4, p3). Non préemptif puis préemptif : TMA ?
= Non préemptif : A [0–5], C [5–7], D [7–11], B [11–15] → attentes 0, 9, 3, 3 → TMA = 15/4 = **3,75** ; TMR = 30/4 = 7,5.
  Préemptif : A [0–2], C [2–4], A [4–7], D [7–11], B [11–15] → attentes 2, 9, 0, 3 → TMA = 14/4 = **3,5** ; TMR = 29/4 = 7,25.

? Examen 2025 (normale) : SRTF avec P1 (0, 4), P2 (2, 5), P3 (4, 6), P4 (6, 2). TMA ?
reponse: 2.75 ~0.01
= Gantt : P1 [0–4] (à t = 2, P1 n'a plus que 2 < 5), P2 [4–6], P4 [6–8] (2 < 3 restants de P2), P2 [8–11], P3 [11–17].
  Rotations 4, 9, 13, 2 → TMR = 7. Attentes 0, 4, 7, 0 → TMA = 11/4 = **2,75**.
```

## Flashcards

```cartes
SRTF :: Préemptif : à chaque arrivée, le processus au plus petit temps RESTANT prend le CPU.
SJF préemptif dans le cours du Pr Ouchitachen :: Compare les durées TOTALES (exemple du cours : TMA 9,8 ; avec SRTF on obtiendrait 9).
Round-Robin :: FCFS + quantum : après q unités, le processus retourne en queue de file.
Arrivée et préemption au même instant en RR :: Le nouveau venu entre dans la file avant le processus préempté.
Quantum très grand en RR :: RR devient FCFS.
Quantum très petit en RR :: Trop de commutations de contexte : temps perdu.
Temps de réponse maximal en RR :: (n − 1) × q pour n processus.
Famine :: Un processus attend indéfiniment (longs processus en SRTF, faible priorité).
Vieillissement (aging) :: Augmenter la priorité d'un processus avec son temps d'attente, contre la famine.
Algorithmes préemptifs du cours :: SRTF, RR ; SJF et priorités existent dans les deux versions ; FCFS jamais.
```

## QCM du chapitre

```qcm
? En SRTF, un processus de durée 3 arrive alors que le processus en cours a encore 5 unités à faire. Que se passe-t-il ?
+ Le nouveau prend le CPU
- Le processus en cours continue
- Les deux se partagent le CPU
= 3 < 5 : le plus petit temps restant gagne.

? En Round-Robin, un processus préempté va :
- en tête de la file
+ en queue de la file
- dans la file du périphérique
= C'est un tourniquet : retour en queue.

? Que devient RR si le quantum est plus grand que toutes les durées ?
+ FCFS
- SJF
- SRTF
= Plus personne n'est coupé : on sert dans l'ordre d'arrivée.

? Avec 5 processus et q = 20 ms, le temps de réponse est au plus :
- 100 ms
+ 80 ms
- 20 ms
= (n − 1) × q = 4 × 20.

? Quel algorithme n'a jamais de version préemptive ?
+ FCFS
- SJF
- Priorités
= FCFS sert jusqu'au bout dans l'ordre d'arrivée.

? Le vieillissement sert à :
- accélérer les commutations de contexte
+ éviter la famine des processus peu prioritaires
- réduire le quantum
= On augmente la priorité de ceux qui attendent longtemps.

? Exemple SRTF du cours : P1 (0, 7), P2 (2, 4), P3 (4, 1), P4 (5, 4). Quand P1 termine-t-il ?
- 7
- 11
+ 16
- 12
= P1 ne reprend qu'après P2, P3 et P4 : de 11 à 16.

? Un processus a été coupé trois fois et termine à 20. Il est arrivé à 4 et dure 7. Son attente :
- 13
+ 9
- 16
= Rotation 16, moins 7 d'exécution. Le nombre de coupures ne change rien à la formule.

? Dans le TD2 ex. 4, la priorité 6 est :
+ la plus forte
- la plus faible
- invalide
= L'énoncé précise : nombre élevé = priorité plus importante.

? Quel inconvénient de SRTF le cours souligne-t-il ?
- Il est non préemptif
+ Il pénalise les processus longs (famine possible)
- Il ignore les durées
= Les courts passent toujours devant.
```

---
id: fichiers-disques
titre: Fichiers et disques · SGF, i-node, FAT et ordonnancement du bras
seance: Chapitre 4 · Systèmes de gestion de fichiers · TD4 et TD5
importance: 5
---

## Avant de commencer

Il te faut les puissances de 2 (1 Go = 2³⁰ octets, 1 Mo = 2²⁰, 1 Ko = 2¹⁰) et l'arrondi **au-dessus** : un fichier de 1025 octets occupe 2 blocs de 1 Ko, pas 1,0009.

```exercice Vérifie ton prérequis
? Combien de blocs de 4 Ko dans un disque de 64 Go ? Donne une puissance de 2.
indice: 64 Go = 2⁶ × 2³⁰ ; 4 Ko = 2² × 2¹⁰.
= 2³⁶ ÷ 2¹² = **2²⁴ = 16 777 216** blocs. Diviser des puissances de 2, c'est soustraire les exposants : c'est tout le calcul de la FAT.
```

## Comment aborder ce chapitre

> [!astuce] Les exercices de ce chapitre sont du **calcul pur** : écris les tailles en puissances de 2 avant de diviser. Pour le bras du disque, dessine une **ligne graduée** des pistes et trace le trajet de la tête : le total est la somme des segments.

> [!piege] Oublier les **blocs d'index** dans le compte d'un fichier i-node. Dès qu'un fichier dépasse les 12 blocs directs, il faut **au moins un bloc d'index en plus** des blocs de données.

À la fin, tu sais calculer une taille maximale de fichier, un nombre de blocs, la taille d'une FAT, une capacité de disque CHS, et le trajet de la tête pour FIFO, SSTF, SCAN, C-SCAN, LOOK et C-LOOK.

## Idée 1 · Le SGF : fichiers, attributs, opérations

Sous Unix, **presque tout est fichier** : les données, les périphériques (terminal, souris…) et les moyens de communication (sockets, tubes nommés). Le **SGF** (système de gestion de fichiers) organise les données sur le support et offre les primitives pour les manipuler.

- **Attributs d'un fichier** : nom, identifiant, type, emplacement, taille, protections (lecture, écriture, exécution), dates et utilisateur.
- **Opérations** : création, écriture et lecture (à la position courante), repositionnement, suppression, vidage (taille à 0 sans toucher aux autres attributs).
- **Méthodes d'accès** : séquentielle, indexée séquentielle, indexée.

**Sur le disque** on trouve : le **bloc de démarrage** (*boot control block*), le **bloc de contrôle de partition** (nombre et taille des blocs, blocs libres) et un **bloc de contrôle par fichier** (FCB ; sous Unix, l'**i-node**).

**Les E/S.** Chaque périphérique a un **contrôleur** (électronique) et un **pilote** (logiciel du SE qui traduit les requêtes en commandes pour le contrôleur et gère les erreurs).

```flux Architecture de contrôle des E/S
Programme utilisateur -> Partie du SE indépendante du matériel -> Pilote -> Contrôleur -> Périphérique
```

## Idée 2 · Trois façons de ranger un fichier sur le disque

```grille Allocation contiguë, chaînée, indexée
#cols: Méthode | Principe | Avantage | Inconvénient
Contiguë | blocs consécutifs ; il suffit du premier bloc et de la longueur | simple, accès direct | fragmentation externe, le fichier ne peut pas grandir
Chaînée | chaque bloc pointe vers le suivant ; le répertoire garde le premier et le dernier | plus de fragmentation externe | accès séquentiel seulement ; un pointeur perdu = fin du fichier perdue
*Indexée | tous les pointeurs rangés dans un bloc d'index | accès direct, pas de fragmentation externe | un bloc d'index par fichier
```

La **FAT** (*File Allocation Table*) est une allocation **chaînée indexée** : les pointeurs de chaînage sont retirés des blocs et rangés dans **une table** qui a **une entrée par bloc du disque**.

> [!retenir] **Taille de la FAT = nombre de blocs × taille d'une entrée.** La taille minimale d'une entrée est le nombre de bits n tel que 2ⁿ ≥ nombre de blocs.

## Idée 3 · L'i-node d'Unix

L'i-node (ext3 sous Linux) contient les **attributs** du fichier (taille, propriétaire et groupe, droits, dates, nombre de liens) et des **adresses de blocs** :

```html
<svg viewBox="0 0 640 250" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Structure d'un i-node : 12 pointeurs directs vers des blocs de données, un pointeur d'indirection simple vers un bloc d'index, un double vers deux niveaux d'index, un triple vers trois niveaux">
<g font-family="sans-serif" font-size="12" fill="currentColor">
<rect x="20" y="20" width="150" height="210" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="95" y="40" text-anchor="middle" font-weight="700">i-node</text>
<text x="30" y="62">attributs</text>
<rect x="28" y="72" width="134" height="60" fill="#D9824F" fill-opacity="0.15" stroke="#D9824F"/><text x="95" y="106" text-anchor="middle">12 pointeurs directs</text>
<rect x="28" y="140" width="134" height="24" fill="none" stroke="currentColor"/><text x="95" y="157" text-anchor="middle">indirect simple</text>
<rect x="28" y="168" width="134" height="24" fill="none" stroke="currentColor"/><text x="95" y="185" text-anchor="middle">indirect double</text>
<rect x="28" y="196" width="134" height="24" fill="none" stroke="currentColor"/><text x="95" y="213" text-anchor="middle">indirect triple</text>
<rect x="250" y="80" width="60" height="40" fill="none" stroke="#D9824F" stroke-width="2"/><text x="280" y="104" text-anchor="middle">données</text>
<rect x="250" y="140" width="60" height="24" fill="none" stroke="currentColor"/><text x="280" y="157" text-anchor="middle">index</text>
<rect x="250" y="174" width="60" height="24" fill="none" stroke="currentColor"/><text x="280" y="191" text-anchor="middle">index</text>
<rect x="340" y="174" width="60" height="24" fill="none" stroke="currentColor"/><text x="370" y="191" text-anchor="middle">index</text>
<rect x="250" y="208" width="60" height="24" fill="none" stroke="currentColor"/><text x="280" y="225" text-anchor="middle">index</text>
<rect x="340" y="208" width="60" height="24" fill="none" stroke="currentColor"/><text x="370" y="225" text-anchor="middle">index</text>
<rect x="430" y="208" width="60" height="24" fill="none" stroke="currentColor"/><text x="460" y="225" text-anchor="middle">index</text>
<text x="420" y="157">N blocs de données</text>
<text x="420" y="191">N² blocs</text>
<text x="510" y="225">N³ blocs</text>
<text x="330" y="104">12 blocs</text>
</g>
<g stroke="currentColor" stroke-width="1.5" fill="none"><line x1="162" y1="100" x2="248" y2="100"/><line x1="162" y1="152" x2="248" y2="152"/><line x1="162" y1="180" x2="248" y2="186"/><line x1="310" y1="186" x2="338" y2="186"/><line x1="162" y1="208" x2="248" y2="220"/><line x1="310" y1="220" x2="338" y2="220"/><line x1="400" y1="220" x2="428" y2="220"/></g>
</svg>
```

Avec des blocs de B octets et des pointeurs de p octets, un bloc d'index contient **N = B ÷ p** pointeurs. Taille max d'un fichier = (12 + N + N² + N³) × B.

**TD4 ex. 2** (blocs de 1 Ko, pointeurs de 4 octets, donc N = 256) :

```python
import math
BLOC, PTR = 1024, 4
N = BLOC // PTR                     # pointeurs par bloc d'index
print("pointeurs par bloc :", N)
max_blocs = 12 + N + N**2 + N**3
print("taille max :", max_blocs, "blocs =", max_blocs * BLOC, "octets")

def blocs(taille):
    data = math.ceil(taille / BLOC)
    index, reste = 0, data - 12
    if reste > 0:                    # indirection simple : 1 bloc d'index
        index += 1; reste -= N
    if reste > 0:                    # indirection double : 1 + autant que nécessaire
        index += 1 + math.ceil(reste / N); reste -= N * N
    return data, index

for t in (532 * 1024, 100000, 77824):
    d, i = blocs(t)
    print(f"{t} octets : {d} blocs de données + {i} blocs d'index = {d + i}")
```

```sortie
pointeurs par bloc : 256
taille max : 16843020 blocs = 17247252480 octets
544768 octets : 532 blocs de données + 4 blocs d'index = 536
100000 octets : 98 blocs de données + 1 blocs d'index = 99
77824 octets : 76 blocs de données + 1 blocs d'index = 77
```

Lecture : la taille max vaut 12 Ko + 256 Ko + 64 Mo + 16 Go, soit environ **16,06 Go**. Pour le fichier de 532 Ko : **12** blocs directs, **256** par l'indirection simple, **264** par la double ; il faut 1 bloc d'index simple + 1 bloc d'index double de 1er niveau + 2 de 2e niveau = **4 blocs d'index**.

> [!attention] Le corrigé « Rapports TD » donne 533 blocs pour 532 Ko (il fait passer 520 blocs par l'indirection simple, qui n'en contient que 256) et dit que 100 000 octets n'utilisent « que les blocs directs » (98 blocs > 12 : il faut l'indirection simple). Les bons comptes sont ci-dessus.

## Idée 4 · Le disque : CHS et temps d'accès

Un disque est fait de **plateaux**, de **pistes** (cercles), de **secteurs** ; les pistes de même rayon forment un **cylindre**. L'adresse **CHS** (cylindre / tête / secteur) : cylindre de 0 à NC − 1, tête de 0 à NH − 1, secteur de **1** à NS. Le premier secteur est 0/0/1.

> [!retenir] **Capacité = NC × NH × NS × taille d'un secteur.** Temps d'une requête = temps de **positionnement** (déplacer la tête sur le cylindre) + temps de **latence** (attendre que le secteur passe sous la tête) + temps de **transfert**.

**TD5, ex. 1** (anciennes limites : 1020 cylindres, 250 têtes, 63 secteurs de 512 octets) :

```python
cyl, tetes, secteurs, octets = 1020, 250, 63, 512
print("taille d'un cylindre :", tetes * secteurs * octets, "octets")
print("capacité d'un plateau (une face) :", cyl * secteurs * octets, "octets")
print("capacité du disque :", cyl * tetes * secteurs * octets, "octets")
```

```sortie
taille d'un cylindre : 8064000 octets
capacité d'un plateau (une face) : 32901120 octets
capacité du disque : 8225280000 octets
```

Soit environ 7,7 Mo par cylindre et 7,66 Gio pour le disque.

## Idée 5 · Ordonnancer le bras du disque

Le pilote reçoit plusieurs requêtes et choisit dans quel ordre les servir, pour **réduire le temps de positionnement**, donc le nombre de cylindres parcourus.

| Algorithme | Règle |
|---|---|
| **FIFO** | dans l'ordre d'arrivée |
| **SSTF** | la requête la **plus proche** de la position actuelle |
| **SCAN** (ascenseur) | va jusqu'au **bout du disque** en servant au passage, puis repart dans l'autre sens |
| **C-SCAN** | comme SCAN, mais au bout il **revient au début** sans rien servir, puis repart dans le même sens |
| **LOOK** | comme SCAN, mais fait demi-tour à la **dernière requête**, pas au bout du disque |
| **C-LOOK** | comme C-SCAN, mais s'arrête à la dernière requête et saute à la plus basse |

**Exemple du cours** : tête en 11, montant, cylindres 0 à 49, requêtes 1, 36, 16, 34, 9, 12.

```python
def trajet(chemin):
    total = sum(abs(chemin[i + 1] - chemin[i]) for i in range(len(chemin) - 1))
    print(" -> ".join(map(str, chemin)), "=", total)

trajet([11, 1, 36, 16, 34, 9, 12])            # FIFO
trajet([11, 12, 9, 16, 1, 34, 36])            # SSTF
trajet([11, 12, 16, 34, 36, 49, 9, 1])        # SCAN (va jusqu'à 49)
trajet([11, 12, 16, 34, 36, 49, 0, 1, 9])     # C-SCAN (retour compté)
trajet([11, 12, 16, 34, 36, 9, 1])            # LOOK
trajet([11, 12, 16, 34, 36, 1, 9])            # C-LOOK
```

```sortie
11 -> 1 -> 36 -> 16 -> 34 -> 9 -> 12 = 111
11 -> 12 -> 9 -> 16 -> 1 -> 34 -> 36 = 61
11 -> 12 -> 16 -> 34 -> 36 -> 49 -> 9 -> 1 = 86
11 -> 12 -> 16 -> 34 -> 36 -> 49 -> 0 -> 1 -> 9 = 96
11 -> 12 -> 16 -> 34 -> 36 -> 9 -> 1 = 60
11 -> 12 -> 16 -> 34 -> 36 -> 1 -> 9 = 68
```

> [!attention] La diapo SCAN annonce **96** cylindres parcourus. Avec l'ordre de service qu'elle donne (12, 16, 34, 36, puis 9, 1) et un demi-tour au bout (49), on trouve **86** : 38 pour monter de 11 à 49, puis 48 pour redescendre à 1. 96 est le total de C-SCAN (retour à 0 compté). Les cinq autres totaux de la diapo sont justes.

> [!astuce] La définition de LOOK dans la diapo dit « variante de C-SCAN », mais son exemple fait bien un aller-retour comme SCAN : LOOK est la variante de **SCAN**, C-LOOK celle de **C-SCAN**.

**Choisir** : SSTF est courant (simple) mais peut affamer les requêtes éloignées et **favorise le centre** du disque ; SCAN et C-SCAN sont meilleurs quand la charge est forte ; SSTF et LOOK sont de bons choix par défaut. Les disques modernes ordonnancent souvent eux-mêmes.

## S'exercer

```exercice TD4, TD5 et annales
? TD5 ex. 5 : 1000 cylindres, dernière requête en 345, la tête **descend** vers 0. File : 123, 874, 692, 475, 105, 376. Total en FIFO ?
reponse: 2013
= 222 + 751 + 182 + 217 + 370 + 271 = **2013** pistes.

? Même énoncé en SSTF.
reponse: 1298
= 345 → 376 (31) → 475 (99) → 692 (217) → 874 (182) → 123 (751) → 105 (18) = **1298**.

? Même énoncé en SCAN (la tête descend).
reponse: 1219
= 345 → 123 → 105 → **0** (345) puis 0 → 376 → 475 → 692 → 874 (874). Total **1219**.

? Disque de 64 Go, blocs de 4 Ko (TD4 ex. 1). Nombre de blocs, bits d'adresse minimum, et nombre de blocs occupés par la FAT ?
= 2³⁶ ÷ 2¹² = **2²⁴** blocs ; il faut **24 bits** (3 octets) par adresse. FAT = 2²⁴ × 3 octets = 48 Mo, soit 48 Mo ÷ 4 Ko = **12 288 blocs**. (Avec des entrées alignées sur 4 octets : 64 Mo, 16 384 blocs.)

? Partition de 16 Go, blocs de 8 Ko, adresses sur 32 bits (TD4 ex. 1.3). Taille maximale et minimale de la FAT ?
= 2³⁴ ÷ 2¹³ = 2²¹ blocs. **Max** (entrées de 32 bits) : 2²¹ × 4 octets = **8 Mo**. **Min** (21 bits suffisent) : 2²¹ × 21 bits = 5 505 024 octets = **5,25 Mo** (6 Mo si on arrondit l'entrée à 3 octets).

? TD5 ex. 4 : blocs de 4 Ko, fichier de 20 000 000 caractères. Fragmentation interne ?
reponse: 768
= ⌈20 000 000 ÷ 4096⌉ = 4883 blocs de données = 20 000 768 octets. Perte dans le dernier bloc : **768 octets** (sans compter la place inutilisée des blocs d'index).
```

## Flashcards

```cartes
Les 3 blocs de contrôle sur le disque :: Bloc de démarrage, bloc de contrôle de partition, bloc de contrôle de fichier (FCB = i-node sous Unix).
Allocation contiguë :: Blocs consécutifs : simple et accès direct, mais fragmentation externe et fichier qui ne peut pas grandir.
Allocation chaînée :: Chaque bloc pointe vers le suivant : pas de fragmentation externe, mais accès séquentiel et fragile.
Allocation indexée :: Tous les pointeurs dans un bloc d'index : accès direct.
Taille de la FAT :: Nombre de blocs du disque × taille d'une entrée.
Pointeurs d'un i-node classique :: 12 directs, 1 indirect simple, 1 double, 1 triple.
Taille max d'un fichier i-node :: (12 + N + N² + N³) × taille de bloc, avec N = taille de bloc ÷ taille d'un pointeur.
Capacité CHS :: Cylindres × têtes × secteurs par piste × octets par secteur.
Temps d'accès disque :: Positionnement (seek) + latence rotationnelle + transfert.
SSTF :: Sert la requête la plus proche de la tête ; favorise le centre, risque de famine.
SCAN vs LOOK :: SCAN va jusqu'au bout du disque avant de repartir ; LOOK fait demi-tour à la dernière requête.
C-SCAN :: Sert dans un seul sens ; au bout, retour au début sans servir.
```

## QCM du chapitre

```qcm
? Sous Unix, le bloc de contrôle d'un fichier s'appelle :
- la FAT
+ l'i-node
- le PCB
- le superbloc de démarrage
= FCB = i-node sous Unix.

? Quel inconvénient a l'allocation chaînée ?
- La fragmentation externe
+ L'accès au fichier est séquentiel
- Le fichier ne peut pas grandir
= Pour lire le bloc 50, il faut parcourir les 49 précédents.

? Blocs de 1 Ko et pointeurs de 4 octets : combien de pointeurs par bloc d'index ?
- 128
+ 256
- 1024
= 1024 ÷ 4.

? Un disque a 2²¹ blocs. Combien de bits faut-il au minimum pour adresser un bloc ?
- 16
+ 21
- 32
= 2²¹ adresses demandent 21 bits.

? Capacité d'un disque CHS :
+ cylindres × têtes × secteurs × octets par secteur
- cylindres × secteurs × octets par secteur
- têtes × secteurs × octets par secteur
= La 2e formule donne une face (plateau), la 3e un cylindre.

? Le premier secteur d'un disque en CHS a l'adresse :
- 0/0/0
+ 0/0/1
- 1/1/1
= Les secteurs sont numérotés à partir de 1.

? Tête en 11, requêtes 1, 36, 16, 34, 9, 12. Quelle est la première requête servie en SSTF ?
- 9
+ 12
- 1
= 12 est à 1 cylindre de 11.

? Quel algorithme fait demi-tour à la dernière requête et non au bout du disque ?
- SCAN
+ LOOK
- C-SCAN
- FIFO
= LOOK ne va pas plus loin que nécessaire.

? Le temps de latence d'un disque est :
- le temps pour déplacer la tête sur le cylindre
+ le temps pour que le secteur voulu passe sous la tête
- le temps de transfert
= Le positionnement est le seek time ; la latence dépend de la rotation.

? Un fichier de 100 000 octets, blocs de 1 Ko, i-node à 12 pointeurs directs : combien de blocs en tout ?
- 98
+ 99
- 12
= 98 blocs de données (> 12), donc 1 bloc d'index simple en plus.
```

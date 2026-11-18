---
id: memoire-allocation-pagination
titre: Mémoire (1) · allocation, pagination et segmentation
seance: Chapitre 3 · Gestion de la mémoire · TD3
importance: 5
---

## Avant de commencer

Deux outils de calcul servent partout : la **division entière** et le **reste** (modulo), et les **puissances de 2** (1 Ko = 1024 = 2¹⁰ octets, 4 Ko = 2¹², 8 Ko = 2¹³).

```exercice Vérifie ton prérequis
? Combien valent 20000 ÷ 4096 (division entière) et 20000 mod 4096 ?
indice: 4 × 4096 = 16384.
= 20000 = 4 × 4096 + 3616. Quotient **4**, reste **3616**. C'est exactement « page 4, déplacement 3616 » pour des pages de 4 Ko.
```

## Comment aborder ce chapitre

> [!astuce] Une adresse virtuelle, c'est un **numéro de page + une position dans la page**, comme « immeuble 4, appartement 3616 ». La traduction ne change **que** le numéro de l'immeuble ; l'appartement (le déplacement) reste le même.

> [!piege] En segmentation, une adresse est valide si **déplacement < limite**, strictement. (4:200) avec une limite de 200 est une **erreur** : les positions valides vont de 0 à 199.

À la fin, tu sais choisir une zone libre (first, next, best, worst fit), traduire une adresse paginée ou segmentée et distinguer les deux fragmentations.

## Idée 1 · Adresse logique, adresse physique et MMU

- **Adresse logique** (virtuelle) : générée par le CPU, relative au programme, indépendante de sa place en RAM.
- **Adresse physique** : l'adresse réelle dans la RAM.
- La **MMU** (*Memory Management Unit*), un circuit matériel, traduit l'une en l'autre à chaque accès.

La **mémoire virtuelle** permet d'exécuter des programmes plus grands que la RAM : seule une partie est en mémoire, le reste sur le disque.

Le gestionnaire de mémoire du SE doit : **partager** la mémoire entre processus, **allouer** des blocs, **protéger** chaque espace, **récupérer** la mémoire libérée et **optimiser** la place disponible.

**Registres base et limite.** Le registre **base** contient le début de la zone du processus, le registre **limite** sa taille. Toute adresse logique doit être **< limite** (protection), puis on lui ajoute la base (réallocation).

```flux Exemple du cours : base = 12000
Adresse logique 1352 -> 1352 < limite ? oui -> 1352 + 12000 -> Adresse physique 13352
```

Si le processus est déplacé en mémoire, il suffit de changer son registre base.

## Idée 2 · Choisir une zone libre : first, next, best, worst

Allocation **contiguë** : tout le processus dans des adresses consécutives. **Non contiguë** : ses morceaux sont dispersés (pagination, segmentation).

| Stratégie | Règle |
|---|---|
| **First-fit** | la **première** zone assez grande, en partant du début |
| **Next-fit** | comme first-fit, mais on repart de **la dernière zone utilisée** |
| **Best-fit** | la **plus petite** zone assez grande |
| **Worst-fit** | la **plus grande** zone |

**Exemple du cours** : zones de 100, 500, 200, 300 et 600 Ko ; processus P1 = 212, P2 = 417, P3 = 112, P4 = 426 Ko. Quand une zone est plus grande que la demande, le reste reste libre.

```python
def allouer(zones, requetes, strategie):
    zones = [list(z) for z in zones]
    pos = 0                                    # next-fit : où reprendre la recherche
    for r in requetes:
        ok = [i for i, z in enumerate(zones) if z[1] >= r]
        if not ok:
            print(f"{r:>4} : aucune zone assez grande (attente)"); continue
        if strategie == "first":
            i = ok[0]
        elif strategie == "next":
            i = next((j for j in ok if j >= pos), ok[0])
        elif strategie == "best":
            i = min(ok, key=lambda j: zones[j][1])
        else:
            i = max(ok, key=lambda j: zones[j][1])
        avant = zones[i][1]
        zones[i][1] -= r
        pos = i
        print(f"{r:>4} -> {zones[i][0]} (libre {avant}, reste {zones[i][1]})")

zones = [["100Ko", 100], ["500Ko", 500], ["200Ko", 200], ["300Ko", 300], ["600Ko", 600]]
for s in ("first", "best", "worst"):
    print(s)
    allouer(zones, [212, 417, 112, 426], s)
```

```sortie
first
 212 -> 500Ko (libre 500, reste 288)
 417 -> 600Ko (libre 600, reste 183)
 112 -> 500Ko (libre 288, reste 176)
 426 : aucune zone assez grande (attente)
best
 212 -> 300Ko (libre 300, reste 88)
 417 -> 500Ko (libre 500, reste 83)
 112 -> 200Ko (libre 200, reste 88)
 426 -> 600Ko (libre 600, reste 174)
worst
 212 -> 600Ko (libre 600, reste 388)
 417 -> 500Ko (libre 500, reste 83)
 112 -> 600Ko (libre 388, reste 276)
 426 : aucune zone assez grande (attente)
```

> [!retenir] Ici, **seul best-fit** place les quatre processus. First-fit et worst-fit laissent P4 (426 Ko) en attente, alors qu'il reste plus de 426 Ko libres au total, mais en morceaux : c'est la **fragmentation externe**.

**Va-et-vient (swapping).** Une partie de l'espace d'un processus peut être retirée temporairement de la RAM vers le disque (*swap out*) puis ramenée (*swap in*), au profit d'un autre processus.

## Idée 3 · La pagination

- L'espace **virtuel** est découpé en **pages**, l'espace **physique** en **cadres** (*frames*), de **même taille fixe**.
- Une adresse virtuelle = (**numéro de page**, **déplacement**). Une adresse physique = (**numéro de cadre**, **déplacement**). Le déplacement ne change pas.
- La **table des pages** (une par processus) donne, pour chaque page : le **numéro de cadre**, un bit de **présence**, un bit de **modification** (M), un bit de **référence** (R), des bits de **protection**.

```html
<svg viewBox="0 0 640 230" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Traduction paginée : l'adresse virtuelle 1578 se découpe en page 6 et déplacement 42 ; la table des pages donne le cadre 5 ; l'adresse physique est 5 fois 256 plus 42, soit 1322">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<text x="110" y="22" font-weight="700">Adresse virtuelle 1578</text>
<rect x="30" y="34" width="90" height="36" fill="none" stroke="#D9824F" stroke-width="3"/><text x="75" y="57">page 6</text>
<rect x="120" y="34" width="90" height="36" fill="none" stroke="currentColor" stroke-width="2"/><text x="165" y="57">dép 42</text>
<text x="320" y="22" font-weight="700">Table des pages</text>
<rect x="270" y="34" width="100" height="150" fill="none" stroke="currentColor" stroke-width="1.5"/>
<text x="320" y="56">0 → 3</text><text x="320" y="80">2 → 0</text>
<rect x="272" y="92" width="96" height="26" fill="#D9824F" fill-opacity="0.2"/><text x="320" y="110" font-weight="700">6 → 5</text>
<text x="320" y="140">…</text>
<text x="530" y="22" font-weight="700">Adresse physique</text>
<rect x="440" y="34" width="90" height="36" fill="none" stroke="#D9824F" stroke-width="3"/><text x="485" y="57">cadre 5</text>
<rect x="530" y="34" width="90" height="36" fill="none" stroke="currentColor" stroke-width="2"/><text x="575" y="57">dép 42</text>
<text x="530" y="110">5 × 256 + 42</text><text x="530" y="134" font-weight="700" fill="#D9824F">= 1322</text>
</g>
<g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M75,72 L75,105 L268,105"/><path d="M372,105 L485,105 L485,72"/><path d="M165,72 L165,200 L575,200 L575,72" stroke-dasharray="5 4"/></g>
<text x="370" y="218" font-family="sans-serif" font-size="12" fill="currentColor" text-anchor="middle">le déplacement est recopié tel quel</text>
</svg>
```

```etapes Traduire une adresse paginée
Découper :: page = adresse ÷ taille de page (division entière) ; déplacement = adresse mod taille de page.
Vérifier :: La page existe-t-elle ? Sinon : erreur d'adressage.
Présence :: Bit de présence à 0 : défaut de page (chapitre suivant).
Calculer :: adresse physique = cadre × taille de page + déplacement.
```

**TD3, exercice 5** : pages de 256 mots, table des pages de P1 ci-dessous.

```grille Table des pages de P1 (TD3, exercice 5)
#cols: 0 1 2 3 4 5 6 7
#rows: Cadre Présente
*011 001 *000 010 100 111 *101 110
*oui ~non *oui ~non ~non ~non *oui ~non
```

```python
TAILLE = 256                       # mots par page
cadre    = [0b011, 0b001, 0b000, 0b010, 0b100, 0b111, 0b101, 0b110]
presente = [True, False, True, False, False, False, True, False]

def physique(v):
    page, dep = v // TAILLE, v % TAILLE
    if page >= len(cadre):
        return f"{v} : page {page} hors de l'espace d'adressage -> erreur"
    if not presente[page]:
        return f"{v} : page {page} absente -> défaut de page"
    return f"{v} : page {page}, dép {dep} -> cadre {cadre[page]} -> {cadre[page]}*{TAILLE}+{dep} = {cadre[page] * TAILLE + dep}"

for v in (240, 546, 1578, 2072, 770):
    print(physique(v))
```

```sortie
240 : page 0, dép 240 -> cadre 3 -> 3*256+240 = 1008
546 : page 2, dép 34 -> cadre 0 -> 0*256+34 = 34
1578 : page 6, dép 42 -> cadre 5 -> 5*256+42 = 1322
2072 : page 8 hors de l'espace d'adressage -> erreur
770 : page 3 absente -> défaut de page
```

Taille de l'espace d'adressage de P1 : 8 pages × 256 = **2048 mots**. Mémoire vive : les cadres sont codés sur 3 bits, donc 2³ = 8 cadres × 256 = **2048 mots**.

**En binaire**, c'est encore plus simple : avec des pages de 2^d, les **d bits de droite** sont le déplacement, les autres le numéro de page. On remplace le numéro de page par le numéro de cadre, on recopie le déplacement.

> [!retenir] La pagination **élimine la fragmentation externe** (tous les cadres se valent), mais crée un peu de **fragmentation interne** dans la dernière page.

## Idée 4 · La segmentation

Le programme est découpé en **segments de tailles variables** (code, données, pile…). Chaque segment a une **base** et une **limite** dans la **table des segments** (qui contient aussi des informations de protection). Le PCB garde un pointeur vers cette table et le nombre de segments.

```etapes Traduire une adresse segmentée (s:d)
Lire la table :: Ligne du segment s : base et limite.
Tester :: Si d ≥ limite : erreur d'adressage (erreur de segmentation).
Ajouter :: Sinon, adresse physique = base + d.
```

```grille TD3, exercice 4 : table des segments et traductions
#cols: Adresse | Base | Limite | Résultat
(0:128) | 540 | 234 | *668
(1:100) | 1254 | 128 | *1354
(2:465) | 54 | 328 | !erreur (465 ≥ 328)
(3:888) | 2048 | 1024 | *2936
(4:100) | 976 | 200 | *1076
(4:344) | 976 | 200 | !erreur (344 ≥ 200)
(4:200) | 976 | 200 | !erreur (200 ≥ 200)
```

Avantages cités par le cours : taille variable, structures dynamiques, protection (niveaux de privilège par segment).

**Segmentation paginée.** Chaque segment est lui-même découpé en pages : l'adresse (s, d) devient (s, p, d'). Exemple du cours, pages de 4 Ko : (2, 9392) → 9392 = 2 × 4096 + 1200 → **(2, 2, 1200)**.

## Idée 5 · Les deux fragmentations

```grille Fragmentation interne contre externe
#cols: | Interne | Externe
Où ? | *à l'intérieur d'une zone allouée | !entre les zones allouées
Typique de | la pagination (taille fixe) | la segmentation / l'allocation contiguë
Exemple du cours | A demande 5 Ko, reçoit 2 pages de 4 Ko : 3 Ko perdus | assez de place au total, mais pas d'un seul tenant
Remède | pages plus petites | compactage (coûteux)
```

## S'exercer

```exercice TD3 et annales
? Pages de 8 Ko : page et déplacement de l'adresse 64096 (TD3, ex. 2) ?
indice: 7 × 8192 = 57344.
= 64096 = 7 × 8192 + 6752 → page **7**, déplacement **6752**. (Avec 4 Ko : page 15, déplacement 2656.)

? Examen 2025 : adresse virtuelle 15360. Page et déplacement avec des pages de 2 Ko, puis de 8 Ko ?
= 2 Ko = 2048 : 15360 = 7 × 2048 + 1024 → page **7**, dép **1024**. 8 Ko = 8192 : 15360 = 1 × 8192 + 7168 → page **1**, dép **7168**.

? Examen 2025 : segments 0 (1200, 512), 1 (3400, 256), 2 (800, 180), 3 (5000, 2048), 4 (2560, 300). Traduis (0:256), (1:200), (2:250), (3:1500).
= (0:256) → 1200 + 256 = **1456** ; (1:200) → **3600** ; (2:250) → **erreur** (250 ≥ 180) ; (3:1500) → **6500**.

? TD3 ex. 1 : adresses sur 32 bits, 22 bits de page, 10 bits de déplacement ; la table des pages commence par 3, 6, 7, 1. Traduis l'adresse binaire 101010101010.
= Les 10 bits de droite `1010101010` sont le déplacement (682). Ce qui reste, `10`, est la page 2, qui est dans le cadre 7 = `111`. Adresse physique : `111` suivi de `1010101010` = `1111010101010` (7 × 1024 + 682 = **7850**).

? Rattrapage 2025 : base 560, limite 215. Traduis (0:137) et (0:210).
= 137 < 215 → **697** ; 210 < 215 → **770**.
```

## Flashcards

```cartes
Rôle de la MMU :: Circuit matériel qui traduit les adresses logiques (virtuelles) en adresses physiques.
Registres base et limite :: Adresse valide si < limite ; adresse physique = base + adresse logique.
First-fit :: Première zone libre assez grande, depuis le début.
Next-fit :: Comme first-fit, mais on repart de la dernière zone utilisée.
Best-fit :: Plus petite zone assez grande.
Worst-fit :: Plus grande zone libre.
Page et déplacement :: page = adresse ÷ taille (entier) ; déplacement = adresse mod taille.
Adresse physique en pagination :: cadre × taille de page + déplacement.
Champs d'une table des pages :: Numéro de cadre, bit de présence, bit de modification (M), bit de référence (R), protection.
Adresse segmentée valide :: (s:d) valide si d < limite ; physique = base + d.
Fragmentation interne vs externe :: Interne : place perdue DANS une zone allouée (pagination). Externe : trous ENTRE les zones (segmentation).
```

## QCM du chapitre

```qcm
? Qui traduit les adresses virtuelles en adresses physiques ?
- Le compilateur
+ La MMU
- L'ordonnanceur
- Le dispatcheur
= C'est un circuit matériel dédié.

? Pages de 4 Ko : à quelle page appartient l'adresse 32768 ?
- 4
+ 8
- 7
= 32768 = 8 × 4096, déplacement 0.

? Zones libres 100, 500, 200, 300, 600 Ko ; demande de 212 Ko en best-fit :
- 500
+ 300
- 600
- 200
= La plus petite zone ≥ 212 est 300.

? Même demande de 212 Ko en worst-fit :
- 300
- 500
+ 600
= La plus grande zone.

? Segment de base 976 et limite 200 : l'adresse (4:200) est :
- 1176
+ invalide
- 1076
= Il faut déplacement < limite : 200 n'est pas < 200.

? La pagination élimine :
+ la fragmentation externe
- la fragmentation interne
- les défauts de page
= Tous les cadres ont la même taille : n'importe quel cadre libre convient.

? Un processus demande 5 Ko avec des pages de 4 Ko. Combien sont perdus ?
- 1 Ko
+ 3 Ko
- 4 Ko
= Il reçoit 2 pages (8 Ko) : 8 − 5 = 3 Ko de fragmentation interne.

? Registre base = 12000, adresse logique 1352. Adresse physique ?
- 10648
+ 13352
- 1352
= On ajoute la base.

? Pages de 256 mots, page 6 dans le cadre 5. Adresse physique de l'adresse virtuelle 1578 ?
- 1578
+ 1322
- 1536
= 1578 = 6 × 256 + 42 ; 5 × 256 + 42 = 1322.

? Avec des pages de 4 Ko, l'adresse segmentée (2, 9392) devient en segmentation paginée :
- (2, 1, 5296)
+ (2, 2, 1200)
- (2, 9, 392)
= 9392 = 2 × 4096 + 1200.
```

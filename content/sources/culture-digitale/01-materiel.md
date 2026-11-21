---
id: materiel
titre: Environnement de travail · le matériel
seance: Séquence 1
importance: 5
---

## Avant de commencer

Aucun prérequis technique. Il faut juste savoir qu'un ordinateur manipule des informations codées en **0 et 1**.

```exercice Vérifie ton prérequis
? Combien de bits contient un octet ?
reponse: 8
= Un octet = 8 bits. Un bit vaut 0 ou 1.
```

## Comment aborder ce chapitre

> [!astuce] Pense à l'ordinateur comme à une équipe : chaque composant a **un seul rôle**. Retiens le rôle, pas la fiche technique.

> [!piege] Confondre **RAM** et **ROM**. La RAM est **volatile** (effacée à l'extinction). La ROM est **permanente** et contient le démarrage (BIOS).

À la fin, tu sais nommer les composants, raconter l'évolution du microprocesseur et classer un périphérique.

## Idée 1 · Les composants principaux

Chaque composant a un rôle précis ; la carte mère les relie tous.

**Qui fait quoi ?**

| Composant | Rôle | À retenir |
|---|---|---|
| **Carte mère** | relie et fait communiquer tout | spécifique à certains processeurs |
| **CPU** | exécute les instructions | vitesse en Hertz |
| **RAM** | stockage temporaire | volatile, > 4 Go = plus fluide |
| **ROM** | stockage permanent | contient le BIOS |
| **Disque dur** | stockage permanent des fichiers | IDE, SATA, SSD |

Exemple : tu ouvres Word. Le fichier est lu sur le **disque**, copié en **RAM**, et le **CPU** exécute le programme. Si le courant coupe, ce qui n'était pas enregistré (en RAM) est perdu.

> [!retenir] Disques : **IDE** (ancien) → **SATA** (plus rapide) → **SSD** (le plus rapide, résiste aux chocs, plus cher).

> [!attention] Le résumé dit que les SSD sont « résistants aux chocs, mais aussi les plus fragiles ». C'est contradictoire. En pratique, un SSD n'a pas de pièce mobile : il résiste **mieux** aux chocs qu'un disque dur classique ; sa limite est l'usure après de très nombreuses écritures. Au quiz, retiens « plus rapides et plus chers ».

## Idée 2 · L'évolution du microprocesseur

```flux De la lampe à la puce
Tubes à vide (ENIAC, 1945) -> Transistor (TRADIC, 1955) -> Microprocesseur (Intel 4004, 1971) -> Quantique (Sycamore, 54 Q-bits)
```

L'Intel 4004 (1971) : **2300 transistors**, **92 600 opérations/s**. La **loi de Moore** (Gordon Moore) : le nombre de transistors sur une puce **double tous les deux ans**. Aujourd'hui, la gravure descend **sous 10 nm**.

> [!retenir] Q-bit = 0, 1 **ou une superposition des deux**. Les ordinateurs quantiques sont puissants mais encore instables.

## Idée 3 · Comment le processeur travaille

Le CPU ne comprend que le **binaire**. Les transistors sont des interrupteurs ; combinés, ils forment des **portes logiques** (ET, OU…). Le code **ASCII** facilite la communication homme-machine.

```etapes Le cycle d'exécution
Charger :: l'instruction est lue en mémoire
Décoder :: le processeur comprend ce qu'il faut faire
Exécuter :: l'UAL fait le calcul
Stocker :: le résultat est rangé (registre, mémoire)
```

**Les unités internes**

| Unité | Rôle |
|---|---|
| **Registres** | mémoire ultra-rapide, temporaire |
| **Cache** | réduit l'attente vers la RAM |
| **Unité d'instruction** | lit, code et envoie à l'unité de contrôle |
| **Unité de contrôle** | synchronise (séquenceur, compteur ordinal, registre d'instructions) |
| **UAL** | calculs de base et logique |
| **FPU** | calculs complexes (virgule flottante) |
| **Gestion des bus** | flux entre CPU et RAM |

## Idée 4 · Les périphériques

Un périphérique permet à l'ordinateur de communiquer avec l'extérieur. On le classe selon **le sens** de l'information.

**Classer un périphérique**

| Entrée | Sortie | Entrée-Sortie |
|---|---|---|
| **Clavier, souris** | Écran | Clé USB |
| **Scanner, micro, webcam** | Haut-parleurs | Graveur CD/DVD |
| **Écran tactile, manette** | Imprimante | Routeur |

```etapes Méthode pour classer
Question :: l'information va-t-elle vers l'ordinateur, vers l'utilisateur, ou les deux ?
Vers l'ordinateur :: entrée (le scanner numérise)
Vers l'utilisateur :: sortie (l'imprimante reproduit)
Les deux :: entrée-sortie (la clé USB lit et reçoit)
```

> [!attention] Le support classe le « lecteur CD/DVD » en entrée et le « lecteur/graveur » en entrée-sortie. La nuance : un lecteur ne fait que lire, un graveur écrit aussi. L'écran tactile est en entrée dans le support (il est aussi un écran, donc souvent classé entrée-sortie ailleurs).

## S'exercer

```exercice Exercices
? Un PC perd le document non enregistré après une coupure de courant. Quel composant est en cause et pourquoi ?
= La RAM : elle est volatile, son contenu disparaît sans alimentation.

? Selon la loi de Moore, une puce a 1 million de transistors. Combien en aura-t-elle environ 4 ans plus tard ?
reponse: 4000000
= Doublement tous les 2 ans : ×2 après 2 ans, ×4 après 4 ans, donc 4 millions.

? Classe : webcam, imprimante, routeur.
= Webcam : entrée. Imprimante : sortie. Routeur : entrée-sortie.
```

## Flashcards

```cartes
Rôle de la carte mère :: Relier tous les composants et les faire communiquer
Unité de la vitesse du CPU :: Le Hertz
RAM vs ROM :: RAM volatile (temporaire) ; ROM permanente (BIOS)
Premier microprocesseur Intel :: Intel 4004, 1971, 2300 transistors
Loi de Moore :: Le nombre de transistors double tous les deux ans
Premier ordinateur à transistors :: TRADIC, 1955
Q-bit :: 0, 1 ou superposition des deux
UAL :: Unité arithmétique et logique : calculs de base et opérations logiques
```

## QCM du chapitre

```qcm
? Quel composant relie tous les autres ?
- Le disque dur
+ La carte mère
- La RAM
= La carte mère assure la connexion et la communication entre les composants.

? La mémoire vive (RAM) est…
+ volatile
- permanente
- en lecture seule
= Son contenu est perdu à l'extinction.

? Où se trouvent les instructions de démarrage (BIOS) ?
- RAM
+ ROM
- Cache
= La ROM garde les informations sans alimentation.

? En quelle unité mesure-t-on la vitesse d'un microprocesseur ?
- Octets
+ Hertz
- Watts
= La fréquence du CPU se mesure en Hertz (souvent GHz).

? Quelle technologie de disque est la plus rapide ?
- IDE
- SATA
+ SSD
= Le SSD est le plus rapide (et le plus cher).

? Premier microprocesseur commercialisé par Intel ?
- Intel 8086
+ Intel 4004
- Pentium
= Intel 4004, 1971, 2300 transistors.

? La loi de Moore prédit que le nombre de transistors…
- double chaque année
+ double tous les deux ans
- triple tous les dix ans
= Formulée par Gordon Moore : doublement tous les deux ans.

? Quelle unité synchronise l'exécution des instructions ?
- UAL
+ Unité de contrôle
- FPU
= Elle contient séquenceur, compteur ordinal et registre d'instructions.

? Un scanner est un périphérique…
+ d'entrée
- de sortie
- d'entrée-sortie
= Il numérise un document vers l'ordinateur.

? Un Q-bit peut valoir…
- seulement 0
- 0 ou 1 uniquement
+ 0, 1 ou une superposition des deux
= C'est la particularité de l'informatique quantique.
```

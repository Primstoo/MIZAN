---
id: composantes-se
titre: Noyau, interfaces et principaux SE
seance: Chapitre I · Introduction aux SE (parties 3 et 4)
importance: 4
---

## Avant de commencer

Tu dois savoir que le SE gère processus, mémoire, entrées/sorties et fichiers (chapitre précédent).

```exercice Vérifie ton prérequis
? Cite les quatre ressources que le SE gère.
= Le processeur (processus), la mémoire, les entrées/sorties (périphériques) et le système de fichiers (disque).
```

## Comment aborder ce chapitre

> [!astuce] Retiens une seule question pour classer les noyaux : **qu'est-ce qui tourne dans l'espace noyau ?** Tout (monolithique), le strict minimum (micro-noyau), ou un mélange (hybride).

> [!piege] Croire que Linux est un « UNIX ». Linux est **Unix-like** : inspiré d'Unix, mais **non certifié** par l'Open Group. macOS, lui, est certifié UNIX®. C'est une question classique de l'examen.

À la fin, tu sais décrire le noyau et ses trois types, distinguer CLI, GUI et API système, expliquer ce qu'est un pilote et un démon, et comparer Windows, macOS et Linux.

## Idée 1 · Le noyau, cœur du SE

Le **noyau** (kernel) est le premier programme chargé au démarrage (après le chargeur d'amorçage). C'est **la seule partie du SE qui parle directement au matériel**. Il gère processus, mémoire, E/S, interruptions et sécurité.

```html
<svg viewBox="0 0 640 190" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Trois types de noyaux : monolithique tout dans le noyau, micro-noyau minimum dans le noyau, hybride compromis">
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<text x="105" y="18" font-weight="700">Monolithique</text><text x="320" y="18" font-weight="700">Micro-noyau</text><text x="535" y="18" font-weight="700">Hybride</text>
<rect x="20" y="30" width="170" height="40" fill="none" stroke="currentColor"/><text x="105" y="55">applications</text>
<rect x="20" y="80" width="170" height="90" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="105" y="110">ordonnanceur, mémoire</text><text x="105" y="130">pilotes, FS, réseau</text><text x="105" y="160" font-size="11">Linux, Unix classiques</text>
<rect x="235" y="30" width="170" height="90" fill="none" stroke="currentColor"/><text x="320" y="55">applications</text><text x="320" y="80">pilotes, FS</text><text x="320" y="100" font-size="11">(espace utilisateur)</text>
<rect x="235" y="130" width="170" height="40" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="320" y="150">ordonnancement, IPC</text><text x="320" y="166" font-size="11">Minix, QNX, Mach</text>
<rect x="450" y="30" width="170" height="60" fill="none" stroke="currentColor"/><text x="535" y="55">applications</text><text x="535" y="75">une partie des services</text>
<rect x="450" y="100" width="170" height="70" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="535" y="130">parties critiques</text><text x="535" y="160" font-size="11">Windows NT, macOS (XNU)</text>
<text x="320" y="186" fill="#D9824F">en orange : ce qui tourne en espace noyau</text>
</g>
</svg>
```

- **Monolithique** : tout le SE dans le noyau. Rapide, mais un pilote bogué peut tout faire planter.
- **Micro-noyau** : seul le minimum (ordonnancement, communication entre processus) ; pilotes et FS en espace utilisateur. Plus stable et plus sûr.
- **Hybride** : compromis.

Exemple : sur Linux (monolithique), un pilote de carte graphique défectueux peut geler toute la machine. Sur un micro-noyau, le pilote planté serait un simple processus à relancer.

## Idée 2 · Trois façons de parler au SE

```flux Les interfaces
CLI (shell) : l'utilisateur tape des commandes -> GUI (bureau) : fenêtres, icônes, menus, pointeur -> API système : les programmes appellent le noyau (appels système)
```

- **CLI** : le **shell** lit une commande, la fait exécuter par le noyau ou un programme, et renvoie le résultat. Exemples : bash, zsh, fish, PowerShell. Puissant, scriptable, léger : indispensable pour l'administration.
- **GUI** : GNOME, KDE, XFCE (Linux), Explorateur (Windows), Aqua + Finder (macOS). Accessible aux non-techniciens.
- **API système** : fonctions comme `fork()`, `open()`, `read()`, `write()`, `mmap()`, `socket()`, `pipe()`. Chaque **appel système** (syscall) est une passerelle contrôlée entre l'espace utilisateur et le noyau.

Exemple : quand ton programme C fait `read()` sur un fichier, il ne lit pas le disque lui-même : il demande au noyau, qui vérifie les droits puis lit.

## Idée 3 · Pilotes et services (démons)

- **Pilote** : traducteur entre le noyau et un périphérique précis (carte réseau, GPU, USB). Il tourne en mode noyau.
- **Service / démon** : processus lancé au démarrage, qui tourne **en arrière-plan** sans interaction. Exemples : `sshd` (accès SSH), `cron` (tâches planifiées), `systemd-journald` (journaux), `cupsd` (impression).

Exemple : tu programmes une sauvegarde chaque nuit à 2 h. C'est le démon `cron` qui la lance, même si personne n'est connecté.

Le cours cite aussi les gestionnaires internes : de **processus**, de **mémoire**, des **E/S**, du **système de fichiers**.

## Idée 4 · Windows, macOS, Linux

```html
<table>
<tr><th></th><th>Windows</th><th>macOS</th><th>Linux</th></tr>
<tr><td>Noyau</td><td>NT, hybride</td><td>XNU (Darwin) = Mach + BSD, hybride</td><td>monolithique</td></tr>
<tr><td>Modèle</td><td>propriétaire, payant</td><td>fondations ouvertes, interface propriétaire</td><td>libre, open source</td></tr>
<tr><td>Matériel</td><td>surtout x86/x64</td><td>uniquement Apple</td><td>presque tout (PC, serveurs, Raspberry Pi, Android)</td></tr>
<tr><td>Statut Unix</td><td>non</td><td><b>certifié UNIX®</b></td><td>Unix-like</td></tr>
</table>
```

- Windows : avant NT (1993), Windows 1.0 à 3.11 n'étaient qu'une interface sur MS-DOS. Architecture NT : noyau + Executive + sous-systèmes (Win32) + **HAL**. Environ 75 % des postes grand public (chiffre 2024 du cours).
- macOS : depuis Mac OS X (2001), basé sur Darwin. XNU = « X is Not Unix ».
- Linux : noyau de Linus Torvalds (1991), base de milliers de distributions (Ubuntu, Fedora…).

## S'exercer

```exercice Questions de cours
? Quel type de noyau place les pilotes et le système de fichiers dans l'espace utilisateur ? Donne un avantage.
reponse: micro-noyau | micronoyau
= Le **micro-noyau**. Avantage : plus stable et plus sûr, car un pilote qui plante ne fait pas tomber le noyau.

? Explique ce qu'est un appel système et donne deux exemples.
= C'est une passerelle contrôlée par laquelle un programme de l'espace utilisateur demande un service au noyau. Exemples : `fork()` (créer un processus), `open()` / `read()` / `write()` (fichiers).

? Pourquoi dit-on que Linux est « Unix-like » et pas « un UNIX » ?
= UNIX® est une marque de l'Open Group : seuls les systèmes certifiés peuvent porter ce nom (macOS, AIX…). Linux respecte les principes d'Unix mais n'a jamais été certifié.
```

## Flashcards

```cartes
Noyau (kernel) :: Cœur du SE, premier chargé au démarrage, seule partie qui communique directement avec le matériel.
Noyau monolithique :: Tout le SE dans l'espace noyau. Performant, moins modulaire. Ex : Linux.
Micro-noyau :: Seulement ordonnancement et IPC dans le noyau ; pilotes et FS en espace utilisateur. Ex : Minix, QNX.
Noyau hybride :: Compromis entre les deux. Ex : Windows NT, macOS.
Appel système :: Passerelle contrôlée entre l'espace utilisateur et le noyau (fork, open, read, write…).
Démon :: Processus de service en arrière-plan, lancé au démarrage. Ex : sshd, cron, cupsd.
HAL :: Hardware Abstraction Layer : couche qui isole le noyau du matériel et rend le SE portable.
SE certifié UNIX® :: macOS, AIX, HP-UX. Linux et FreeBSD sont Unix-like.
```

## QCM du chapitre

```qcm
? Quel type de noyau place les pilotes et le système de fichiers dans l'espace utilisateur pour plus de stabilité ?
- Noyau monolithique
+ Micro-noyau
- Noyau hybride
- Noyau temps réel
= Question 4 de l'examen blanc. Micro-noyau : le minimum dans le noyau.

? Quel système d'exploitation est certifié UNIX® par l'Open Group ?
- Ubuntu
- Android
- FreeBSD
+ macOS
= macOS est certifié depuis la version 10.5. Les autres sont Unix-like.

? Le noyau Linux est de type :
+ monolithique
- micro-noyau
- hybride
= Linux et les Unix classiques sont monolithiques.

? Quelle est la seule partie du SE qui communique directement avec le matériel ?
- Le shell
+ Le noyau
- L'interface graphique
- Le démon cron
= Le shell, la GUI et les démons passent tous par le noyau.

? `fork()`, `read()`, `socket()` sont des exemples :
- de commandes du shell
+ d'appels système (API système)
- de pilotes de périphériques
= Ce sont des fonctions exposées par le noyau aux programmes.

? Lequel est un démon ?
- bash
+ sshd
- gedit
- ls
= sshd tourne en arrière-plan et fournit l'accès SSH.

? Le noyau de macOS s'appelle :
- NT
+ XNU
- Minix
= XNU (« X is Not Unix »), dans Darwin, mélange Mach et BSD.

? À quoi sert la HAL ?
- À afficher les fenêtres
+ À isoler le noyau du matériel
- À planifier les tâches
= Hardware Abstraction Layer : elle rend le SE portable sur plusieurs architectures.

? Avant Windows NT, Windows 1.0 à 3.11 étaient :
+ une interface graphique sur MS-DOS
- un micro-noyau
- un dérivé d'Unix
= Le cours dit : « pas un vrai SE ». NT (1993) est le premier vrai SE moderne de Microsoft.

? Un pilote de périphérique s'exécute généralement :
- dans le shell
+ en mode noyau
- sur un autre ordinateur
= Il a besoin d'un accès direct au matériel ; d'où le risque : un pilote bogué peut planter le système.
```

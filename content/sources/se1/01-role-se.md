---
id: role-se
titre: Rôle et fonctions d'un système d'exploitation
seance: Chapitre I · Introduction aux SE (parties 1 et 2)
importance: 4
---

## Avant de commencer

Il te faut une seule idée : un ordinateur, c'est du **matériel** (processeur, mémoire vive, disque, clavier, écran) et des **logiciels** qui s'en servent.

```exercice Vérifie ton prérequis
? Classe en « matériel » ou « logiciel » : la RAM, un navigateur web, le disque SSD, un compilateur.
= Matériel : la RAM et le disque SSD. Logiciel : le navigateur et le compilateur.
Le système d'exploitation est le logiciel qui se place **entre** les deux.
```

## Comment aborder ce chapitre

> [!astuce] Pense au SE comme à un **gestionnaire** : il ne fait pas ton travail, il distribue les ressources (CPU, mémoire, disque, périphériques) entre ceux qui les demandent, et il empêche qu'ils se marchent dessus.

> [!piege] Confondre **programme** et **processus**. Le programme est un fichier immobile sur le disque. Le processus est ce programme **en cours d'exécution**, en mémoire, avec son état. Un même programme peut donner plusieurs processus.

À la fin, tu sais définir un SE, citer ses quatre grandes fonctions, reconnaître les types de SE et expliquer la mémoire virtuelle et les techniques d'entrées/sorties.

## Idée 1 · Le SE est un intermédiaire entre trois niveaux

```html
<svg viewBox="0 0 640 120" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Couches : utilisateur, applications, API et SE, pilotes, matériel. Le SE est au centre.">
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="5" y="35" width="110" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="65">Utilisateur</text>
<rect x="135" y="35" width="110" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="190" y="65">Applications</text>
<rect x="265" y="35" width="110" height="50" rx="8" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="3"/><text x="320" y="65" font-weight="700">API / SE</text>
<rect x="395" y="35" width="110" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="450" y="65">Pilotes</text>
<rect x="525" y="35" width="110" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="580" y="65">Matériel</text>
<text x="320" y="110" fill="#D9824F">chaque couche cache la complexité de la suivante</text>
</g>
<g stroke="currentColor" stroke-width="2"><line x1="115" y1="60" x2="135" y2="60"/><line x1="245" y1="60" x2="265" y2="60"/><line x1="375" y1="60" x2="395" y2="60"/><line x1="505" y1="60" x2="525" y2="60"/></g>
</svg>
```

**Définition du prof.** Un SE est un ensemble de programmes qui **gère les ressources matérielles**, **fournit une interface** aux utilisateurs et aux applications, et **permet l'exécution et la coordination** des programmes.

Ses quatre rôles : **abstraction** (cacher le matériel), **allocation** (répartir les ressources), **contrôle** (sécurité, isolation), **optimisation** (bien utiliser les ressources).

Exemple : tu cliques sur « Enregistrer ». Le SE reçoit l'ordre, l'écrit sur le disque, et gère l'erreur si le disque est plein. L'application n'a jamais touché le disque directement.

> [!retenir] Sans SE, chaque application devrait piloter le matériel elle-même : ce serait complexe, inefficace et dangereux (une erreur pourrait planter toute la machine).

## Idée 2 · Une histoire en trois temps

```flux Des lots à Unix et ses héritiers
Batch (1950-60) : un job après l'autre, CPU inactif pendant les E/S -> Temps partagé (1960-70) : plusieurs utilisateurs, chacun croit avoir la machine -> Unix (1969, Bell Labs) : Thompson et Ritchie, écrit en C, « tout est fichier » -> Linux (1991), macOS, Android
```

- **Batch** : premier SE batch, GM-NAA I/O sur IBM 704 (1954). Gros défaut : la machine attend sans rien faire pendant les entrées/sorties.
- **Temps partagé** : le SE découpe le temps CPU en tranches (quanta) et les distribue.
- Aujourd'hui : **Windows** (architecture NT, 1993), **Linux** (Linus Torvalds, 1991, libre), **macOS** (noyau Darwin, BSD + Mach).

## Idée 3 · Les types de SE

```html
<table>
<tr><th>Type</th><th>Idée</th><th>Exemple du cours</th></tr>
<tr><td>Monoposte</td><td>un seul utilisateur à la fois</td><td>Windows familial</td></tr>
<tr><td>Multi-utilisateurs</td><td>comptes, permissions, quotas</td><td>Linux serveur, Windows Server</td></tr>
<tr><td>Embarqué</td><td>dans un appareil, peu de ressources</td><td>FreeRTOS, routeur, GPS</td></tr>
<tr><td>Temps réel</td><td>réponse dans un <b>délai garanti</b></td><td>aéronautique, médical</td></tr>
<tr><td>Distribué</td><td>plusieurs machines vues comme une seule</td><td>clusters, Kubernetes</td></tr>
</table>
```

Exemple : un serveur d'entreprise où 50 employés partagent des fichiers demande un SE **multi-utilisateurs**. Un airbag de voiture demande un SE **temps réel** : répondre vite ne suffit pas, il faut répondre **à temps, toujours**.

## Idée 4 · Gérer les processus

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Cycle de vie d'un processus : création, prêt, en cours, bloqué, terminé">
<defs><marker id="f1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="10" y="60" width="100" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="85">Création</text>
<rect x="160" y="60" width="100" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="210" y="85">Prêt</text>
<rect x="320" y="60" width="120" height="40" rx="20" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="3"/><text x="380" y="85">En cours</text>
<rect x="500" y="60" width="120" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="560" y="85">Terminé</text>
<rect x="250" y="125" width="120" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="310" y="150">Bloqué</text>
<text x="295" y="40" font-size="12">ordonnanceur</text><text x="400" y="125" font-size="12">attend une E/S</text>
</g>
<g stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#f1)">
<line x1="110" y1="80" x2="158" y2="80"/><path d="M260,72 Q290,45 318,72"/><path d="M320,90 Q290,110 262,90"/><line x1="440" y1="80" x2="498" y2="80"/><path d="M400,100 Q390,140 372,142"/><path d="M250,145 Q210,140 210,102"/>
</g>
</svg>
```

Un **processus** = un programme en exécution, avec son espace mémoire, son contexte (registres, compteur ordinal, pile) et son **état** : prêt, en cours, bloqué, terminé.

- Création : `fork()` sous Unix, `CreateProcess()` sous Windows.
- Le SE suit chaque processus dans une **table des processus** (PCB, Process Control Block).
- L'**ordonnancement** choisit qui prend le CPU (FIFO, Round Robin, priorités).
- À la fin, le parent récupère le code de retour avec `wait()` (0 = fin normale).

Exemple : tu lances Firefox, un processus naît. Il lit une page sur le disque : il passe **bloqué** le temps de la lecture, et le CPU sert un autre processus.

## Idée 5 · Gérer la mémoire : pagination et mémoire virtuelle

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Pages virtuelles traduites par la table des pages vers la RAM ou vers le swap sur disque">
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<text x="70" y="18">Mémoire virtuelle</text><text x="320" y="18">Table des pages</text><text x="560" y="18">RAM / disque</text>
<rect x="20" y="30" width="100" height="30" fill="none" stroke="currentColor"/><text x="70" y="50">page 0</text>
<rect x="20" y="60" width="100" height="30" fill="none" stroke="currentColor"/><text x="70" y="80">page 1</text>
<rect x="20" y="90" width="100" height="30" fill="none" stroke="currentColor"/><text x="70" y="110">page 2</text>
<rect x="260" y="30" width="120" height="90" fill="none" stroke="#D9824F" stroke-width="3"/><text x="320" y="55">0 → cadre 5</text><text x="320" y="80">1 → swap</text><text x="320" y="105">2 → cadre 1</text>
<rect x="510" y="30" width="100" height="55" fill="none" stroke="currentColor"/><text x="560" y="62">RAM</text>
<rect x="510" y="100" width="100" height="40" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F"/><text x="560" y="125">swap</text>
<text x="320" y="160" fill="#D9824F">page absente de la RAM = faute de page</text>
</g>
<g stroke="currentColor" stroke-width="1.5"><line x1="120" y1="75" x2="260" y2="75"/><line x1="380" y1="55" x2="510" y2="55"/><line x1="380" y1="80" x2="510" y2="118"/></g>
</svg>
```

Le SE alloue la mémoire, **isole** les processus et donne à chacun l'illusion d'avoir toute la mémoire : c'est la **mémoire virtuelle**.

- **Pagination** : mémoire découpée en **pages de taille fixe** (souvent 4 Ko). Une **table des pages** traduit adresse virtuelle → adresse physique.
- Les pages peu utilisées partent sur le disque (**swap**). Si on en a besoin : **faute de page**, le SE la recharge.
- Trop de swap : la machine passe son temps à échanger, c'est le **thrashing**.

Exemple chiffré : un processus de 10 Ko avec des pages de 4 Ko occupe 3 pages (12 Ko). Les 2 Ko perdus dans la dernière page, c'est de la **fragmentation interne**.

> [!attention] La diapo écrit « Interne : espace alloué => espace utilisé ». Il faut lire : fragmentation interne = **espace alloué > espace utilisé** (de la place perdue *à l'intérieur* d'un bloc). La fragmentation **externe**, ce sont les trous *entre* les blocs ; la pagination la réduit.

## Idée 6 · Entrées/sorties et système de fichiers

Les périphériques sont **lents** comparés au CPU. Le SE ne doit pas laisser le processeur attendre. Trois techniques :

```html
<table>
<tr><th>Technique</th><th>Principe</th><th>Bilan</th></tr>
<tr><td>E/S programmée (polling)</td><td>le CPU interroge le périphérique en boucle</td><td>gaspille le CPU</td></tr>
<tr><td>Par interruption</td><td>le périphérique prévient le CPU quand il est prêt</td><td>CPU libre pendant l'attente</td></tr>
<tr><td>DMA</td><td>un contrôleur copie les données vers la mémoire sans le CPU</td><td>idéal pour gros volumes (copier 1 Go)</td></tr>
</table>
```

Le **pilote** (driver) traduit les ordres génériques du SE (« lire », « écrire ») en instructions propres au matériel. Il tourne en mode noyau : un pilote bogué peut planter tout le système.

Le **système de fichiers** organise les données en fichiers et dossiers (arbre à partir de `/` sous Unix, `C:\` sous Windows) et garde les **métadonnées** (nom, taille, droits, dates) dans des **inodes** (Unix) ou la MFT (NTFS). Exemples : ext4 (Linux, journalisé), NTFS (Windows), APFS (macOS), FAT32 (clés USB).

Caractéristiques d'un SE moderne : **multitâche préemptif** (le SE reprend la main de force ; le coopératif, où chaque programme rend la main, c'était Windows 3.x), **multi-utilisateur**, **temps partagé**, **portable** (grâce à une couche d'abstraction matérielle, HAL).

## S'exercer

```exercice Questions du type examen
? Donne la définition d'un système d'exploitation en une phrase, puis ses quatre rôles.
= Un SE est un ensemble de programmes qui gère les ressources matérielles, fournit une interface aux utilisateurs et aux applications, et permet l'exécution et la coordination des programmes. Rôles : abstraction, allocation, contrôle, optimisation.

? Pourquoi les systèmes batch gaspillaient-ils le processeur ?
indice: Que fait le CPU pendant qu'on lit une bande ou une carte perforée ?
= Ils exécutaient un job à la fois. Pendant les entrées/sorties (lentes), le CPU restait inactif. Le temps partagé et le multitâche ont résolu ce problème en donnant le CPU à un autre travail pendant l'attente.

? Un processus de 13 Ko est chargé avec des pages de 4 Ko. Combien de pages occupe-t-il ? Combien de Ko sont perdus en fragmentation interne ?
reponse: 4
= 13 / 4 = 3,25, donc **4 pages** (16 Ko). Il reste 16 − 13 = 3 Ko perdus dans la dernière page : c'est la fragmentation interne.

? Pour copier un fichier de 1 Go, quelle technique d'E/S est la plus adaptée et pourquoi ?
= Le **DMA** : le contrôleur DMA transfère les données directement entre le disque et la mémoire, sans faire passer chaque octet par le CPU, qui reste libre pour d'autres processus.
```

## Flashcards

```cartes
Définition d'un SE :: Ensemble de programmes qui gère les ressources matérielles, fournit une interface et permet l'exécution et la coordination des programmes.
Programme ou processus ? :: Programme = fichier statique sur le disque. Processus = programme en cours d'exécution, en mémoire, avec un état.
Les 4 états d'un processus :: Prêt, en cours d'exécution, bloqué (attend un événement), terminé.
PCB :: Process Control Block : l'entrée de la table des processus qui décrit chaque processus.
Mémoire virtuelle :: Illusion d'une mémoire plus grande que la RAM : pages sur le disque (swap), rechargées lors d'une faute de page.
Thrashing :: Ralentissement sévère quand le système passe son temps à échanger des pages avec le swap.
Polling, interruption, DMA :: Polling : le CPU interroge en boucle. Interruption : le périphérique prévient. DMA : transfert sans le CPU.
Multitâche préemptif :: Le SE interrompt lui-même les processus pour partager le CPU (Linux, Windows NT, macOS).
SE temps réel :: SE qui garantit une réponse dans un délai fixé (aéronautique, médical).
```

## QCM du chapitre

```qcm
? Quelle est la définition principale d'un système d'exploitation ?
- Un logiciel qui remplace le processeur pour accélérer les calculs
+ Un ensemble de programmes qui gère les ressources matérielles, fournit une interface et permet l'exécution des programmes
- Un pilote qui contrôle directement les périphériques sans intermédiaire
- Un outil de développement réservé aux programmeurs système
= C'est la définition du cours, reprise mot pour mot à la question 1 de l'examen blanc.

? Quel mécanisme donne l'illusion d'une mémoire plus grande que la RAM ?
- La défragmentation
+ La mémoire virtuelle
- La pagination externe
- Le swapping des processus terminés
= La mémoire virtuelle place des pages sur le disque (swap) et les recharge à la demande.

? Un processus attend la fin d'une lecture sur disque. Dans quel état est-il ?
- Prêt
- En cours d'exécution
+ Bloqué
- Terminé
= Bloqué = en attente d'un événement (E/S, signal). Il repassera « prêt » à la fin de la lecture.

? Quel premier SE batch le cours cite-t-il ?
+ GM-NAA I/O sur IBM 704
- Unix sur PDP-7
- MS-DOS
- Windows NT
= GM-NAA I/O (1954) sur IBM 704.

? Quel type de SE doit répondre dans un délai garanti ?
- Distribué
- Monoposte
+ Temps réel
- Multi-utilisateurs
= Temps réel : la contrainte, c'est le délai garanti, pas seulement la vitesse.

? La fragmentation interne, c'est :
+ de l'espace alloué mais non utilisé à l'intérieur d'un bloc
- des trous entre les blocs alloués
- un fichier éclaté sur plusieurs secteurs du disque
= Exemple : 10 Ko dans 3 pages de 4 Ko laissent 2 Ko perdus dans la dernière page.

? Quelle technique d'E/S transfère les données sans passer par le CPU ?
- Le polling
- Les interruptions
+ Le DMA
= Le contrôleur DMA (Direct Memory Access) fait la copie lui-même.

? Sous Unix, quel appel système crée un processus ?
- CreateProcess()
+ fork()
- wait()
- exit()
= `fork()` crée un processus fils ; `CreateProcess()` est l'équivalent Windows ; `wait()` récupère le code de retour.

? Dans le multitâche coopératif :
- le SE interrompt les processus quand il veut
+ chaque processus rend lui-même la main
- un seul processus peut exister
= Coopératif (Windows 3.x) : chacun rend la main. Préemptif : le SE la reprend.

? Qui a créé Unix, et où ?
- Linus Torvalds, à Helsinki
+ Ken Thompson et Dennis Ritchie, aux Bell Labs
- Microsoft, à Redmond
= Unix est né en 1969 aux Bell Labs (AT&T). Torvalds a créé le noyau Linux en 1991.
```

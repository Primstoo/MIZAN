---
id: processus-notions
titre: Processus (1) · du programme au processus, états et PCB
seance: Chapitre 1 · Les processus
importance: 4
---

## Avant de commencer

Il te faut une seule idée : un **programme** est un fichier sur le disque, il ne fait rien tout seul. Et savoir ce qu'est le **processeur** (CPU) : il exécute une instruction à la fois.

```exercice Vérifie ton prérequis
? Tu tapes `gcc monprog.c -o monprog`. Est-ce qu'un nouveau processus « monprog » existe après cette commande ?
indice: Qu'est-ce que gcc produit : quelque chose sur le disque ou quelque chose en mémoire ?
= Non. gcc produit un **fichier exécutable** sur le disque. Le processus « monprog » n'existe qu'au moment où tu lances `./monprog` : le chargeur copie alors le code en mémoire centrale. (Pendant la compilation, c'est gcc lui-même qui est un processus.)
```

## Comment aborder ce chapitre

> [!astuce] Pense « **programme = recette**, **processus = le cuisinier en train de cuisiner** ». Le même programme peut donner dix processus en même temps, chacun avec ses propres données.

> [!piege] Croire qu'un processus « bloqué » est un processus qui attend le processeur. Non : celui qui attend le processeur est **prêt**. Le **bloqué** attend un événement (fin d'une E/S, un message) ; même si on lui donnait le processeur, il ne pourrait rien faire.

À la fin, tu sais suivre la vie d'un processus (5 états, 4 transitions), dire ce que contient un PCB et expliquer une commutation de contexte.

## Idée 1 · Du programme au processus : 4 étapes

```flux Du fichier source au processus
Éditeur : monprog.c -> Compilateur gcc -c : monprog.o -> Éditeur de liens : monprog (exécutable sur disque) -> Chargeur : processus en mémoire
```

1. L'**éditeur de texte** crée le fichier source `monprog.c`.
2. Le **compilateur** produit le fichier objet `monprog.o` (`gcc -c monprog.c`).
3. L'**éditeur de liens** ajoute les bibliothèques et produit l'exécutable (`gcc monprog.o -o monprog`).
4. Le **chargeur** monte l'exécutable en mémoire centrale : le système réserve de la place pour le code et les données. **C'est seulement là qu'on a un processus.**

> [!retenir] Un processus est un **programme en cours d'exécution** avec ses ressources physiques (mémoire, processeur, E/S) et logiques (données, variables). C'est une entité **dynamique** ; le programme est **statique**.

Dès sa création, un processus reçoit : **PID** (son numéro unique), **PPID** (le PID de son père), **UID** (l'utilisateur qui l'a lancé), **GID** (le groupe de cet utilisateur).

On distingue les **processus système** (lancés par le système, comme `init`, père de tous) et les **processus utilisateur** (lancés par une commande).

**Vrai ou faux parallélisme ?** Avec plusieurs CPU, plusieurs processus tournent vraiment en même temps. Avec un seul CPU partagé dans le temps, c'est un **pseudo-parallélisme** : le CPU passe très vite de l'un à l'autre.

L'espace de travail d'un processus est fait de **4 segments** : code, données, données supplémentaires (le tas) et pile.

## Idée 2 · Les 5 états et les transitions

```html
<svg viewBox="0 0 640 300" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Diagramme des états d'un processus : Nouveau, Prêt, Élu, Bloqué, Terminé, avec les transitions admis, élection, interrompu, attente d'E/S, fin d'E/S, exit">
<defs><marker id="se2fl1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"/></marker></defs>
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="20" y="20" width="110" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="75" y="45">Nouveau</text>
<rect x="510" y="20" width="110" height="40" rx="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="565" y="45">Terminé</text>
<rect x="130" y="130" width="120" height="44" rx="22" fill="none" stroke="#D9824F" stroke-width="3"/><text x="190" y="157" font-weight="700">PRÊT</text>
<rect x="390" y="130" width="120" height="44" rx="22" fill="none" stroke="#D9824F" stroke-width="3"/><text x="450" y="157" font-weight="700">ÉLU</text>
<rect x="260" y="240" width="120" height="44" rx="22" fill="none" stroke="currentColor" stroke-width="2"/><text x="320" y="267" font-weight="700">BLOQUÉ</text>
</g>
<g stroke="currentColor" stroke-width="1.8" fill="none" marker-end="url(#se2fl1)">
<path d="M90,60 L160,128"/>
<path d="M250,140 L388,140"/>
<path d="M390,166 L252,166"/>
<path d="M480,128 L550,62"/>
<path d="M430,176 L360,238"/>
<path d="M280,238 L210,176"/>
</g>
<g font-family="sans-serif" font-size="12" fill="currentColor">
<text x="95" y="100">admis</text>
<text x="320" y="132" text-anchor="middle" fill="#D9824F" font-weight="700">élection</text>
<text x="320" y="186" text-anchor="middle">interrompu (quantum)</text>
<text x="525" y="100">exit</text>
<text x="415" y="225">attente d'E/S</text>
<text x="150" y="225">fin de l'E/S</text>
</g>
</svg>
```

| État | Le processus | Le processeur |
|---|---|---|
| **Nouveau** | créé, PCB construit, pas encore admis | — |
| **Prêt** | OK, il attend dans la file des prêts | occupé par un autre |
| **Élu** (en exécution) | OK | OK, ses instructions s'exécutent |
| **Bloqué** (en attente) | **pas OK** : il attend un événement | même libre, inutile |
| **Terminé** | ne s'exécute plus ; ses données servent encore au SE (comptabilité) | — |

Les quatre transitions du cœur du schéma :

- **Prêt → Élu** : l'ordonnanceur le choisit.
- **Élu → Prêt** : interruption extérieure au processus, le cas typique étant la **fin du quantum**.
- **Élu → Bloqué** : le processus demande un service que le SE ne peut pas rendre tout de suite (E/S, ressource occupée, réponse d'un autre processus).
- **Bloqué → Prêt** : l'événement attendu arrive.

> [!piege] Il n'existe **pas** de flèche Bloqué → Élu. Quand l'E/S se termine, le processus repasse par la file des **prêts** et attend son tour.

## Idée 3 · Le PCB et la table des processus

Un processus s'exécute **par morceaux**. Pour reprendre exactement là où il s'était arrêté, le SE sauvegarde tout dans son **PCB** (*Process Control Block*, ou bloc de contrôle de processus).

```grille Contenu d'un PCB
#cols: Champ | Exemple
État | *Prêt
Numéro (PID) | 4812
Compteur d'instructions | *adresse de la prochaine instruction
Registres CPU | accumulateurs, pointeur de pile…
Ordonnancement | priorité, pointeurs vers les files
Mémoire | registres base / limite, table des pages
E/S | fichiers ouverts, périphériques
```

Les PCB sont rangés dans la **table des processus**, une entrée par processus, dans l'espace mémoire du système.

## Idée 4 · La commutation de contexte

Passer le processeur du processus A au processus B s'appelle une **commutation de contexte** (*context switch*).

```etapes Le CPU passe de A à B, puis revient à A
A s'exécute :: B attend dans la file des prêts.
Interruption :: Le SE sauvegarde le contexte de A (registres, compteur ordinal) dans PCB(A).
Chargement :: Le SE recharge les registres depuis PCB(B). B reprend exactement là où il s'était arrêté.
B s'exécute :: A est maintenant prêt ou bloqué.
Retour :: Nouvelle interruption : sauvegarde de PCB(B), chargement de PCB(A).
```

> [!retenir] Pendant la commutation, **aucun** processus utile ne tourne : c'est du temps perdu. C'est pour ça qu'un quantum trop petit en Round-Robin est mauvais (chapitre 4).

**La pile.** Elle aussi fait partie du contexte : à chaque appel de fonction, on y empile l'adresse de retour, les paramètres et les variables locales ; on les dépile au retour.

## Idée 5 · Les files d'attente

Le SE gère plusieurs **files**, chacune étant une **liste chaînée de PCB** :

- la **file des prêts** : tous les processus qui attendent le processeur ;
- une **file par périphérique** : les processus qui attendent ce disque, cette imprimante…

```flux Parcours d'un processus élu
File des prêts -> Élu -> requête d'E/S -> File du périphérique -> File des prêts
```

Une fois élu, le processus peut : faire une E/S (→ file du périphérique), créer un fils et attendre sa fin, être **réquisitionné** (→ retour dans la file des prêts), ou se terminer.

## S'exercer

```exercice Exercices types (TD1, exercice 1)
? Vrai ou faux ? « Un processus est une entité produite après compilation. »
= **Faux.** La compilation produit un fichier objet puis un exécutable, sur le disque. Le processus n'apparaît qu'au chargement en mémoire.

? Vrai ou faux ? « Un processus est une entité produite après chargement d'un binaire en mémoire. »
= **Vrai.** C'est exactement la définition : le chargeur monte l'exécutable en mémoire centrale et lui alloue ses ressources.

? Vrai ou faux ? « Le pseudo-parallélisme impose aux processus de se connaître mutuellement. »
= **Faux.** C'est le SE qui partage le processeur dans le temps. Chaque processus se croit seul ; il ne connaît pas les autres.

? Un processus en exécution lance la lecture d'un fichier sur disque. Donne les états successifs jusqu'à ce qu'il reprenne le CPU.
= Élu → **Bloqué** (il attend la fin de l'E/S) → **Prêt** (l'E/S est finie) → **Élu** (quand l'ordonnanceur le choisit à nouveau).
```

## Flashcards

```cartes
Différence programme / processus :: Programme = fichier exécutable statique sur disque. Processus = programme en cours d'exécution, avec ses ressources (entité dynamique).
Les 4 étapes du programme au processus :: Éditeur (source .c) → compilateur (objet .o) → éditeur de liens (exécutable) → chargeur (processus en mémoire).
Les 5 états d'un processus :: Nouveau, Prêt, Élu, Bloqué, Terminé.
Prêt vs Bloqué :: Prêt : attend seulement le processeur. Bloqué : attend un événement (E/S…), le processeur ne lui servirait à rien.
Élu → Prêt arrive quand… :: Une interruption indépendante du processus, typiquement la fin de son quantum.
Que contient un PCB ? :: État, PID, compteur d'instructions, registres CPU, infos d'ordonnancement (priorité), infos mémoire (base/limite, table des pages), état des E/S (fichiers ouverts).
Commutation de contexte :: Sauvegarder le PCB du processus qui quitte le CPU, recharger celui du processus suivant.
Paramètres reçus à la création :: PID, PPID (père), UID (utilisateur), GID (groupe).
Vrai et faux parallélisme :: Vrai : plusieurs CPU. Faux (pseudo-parallélisme) : un seul CPU partagé dans le temps.
```

## QCM du chapitre

```qcm
? Quand un processus apparaît-il ?
- Après la compilation
- Après l'édition de liens
+ Au chargement de l'exécutable en mémoire
- À l'écriture du fichier source
= Compilation et édition de liens produisent des fichiers sur disque. Le processus naît au chargement.

? Un processus attend la fin d'une lecture disque. Son état est :
- Prêt
+ Bloqué
- Élu
- Nouveau
= Il attend un événement, pas le processeur : il est bloqué.

? Un processus est retiré du CPU car son quantum est épuisé. Il passe à l'état :
+ Prêt
- Bloqué
- Terminé
- Nouveau
= Il pourrait continuer : il retourne dans la file des prêts.

? Quelle transition n'existe pas dans le schéma du cours ?
- Prêt → Élu
- Élu → Bloqué
+ Bloqué → Élu
- Bloqué → Prêt
= Un processus débloqué repasse toujours par la file des prêts.

? Où le SE sauvegarde-t-il le compteur d'instructions d'un processus interrompu ?
- Dans la pile du processeur
+ Dans le PCB du processus
- Dans le fichier exécutable
- Dans la file du périphérique
= Le PCB garde tout le contexte nécessaire à la reprise.

? Comment s'appelle la table qui regroupe les PCB ?
- La table des pages
+ La table des processus
- La table des segments
- La FAT
= Une entrée par processus, dans la mémoire du système.

? Que fait une commutation de contexte ?
- Elle compile le programme suivant
- Elle copie le processus sur le disque
+ Elle sauvegarde le contexte du processus sortant et charge celui du processus entrant
- Elle crée un processus fils
= C'est le passage du CPU d'un processus à un autre.

? Avec un seul processeur, plusieurs processus « en même temps » relèvent du :
- vrai parallélisme
+ pseudo-parallélisme
- multithreading matériel
= Le CPU n'exécute qu'un processus à la fois et alterne très vite.

? Le PPID d'un processus est :
- son propre numéro
+ le numéro de son père
- le numéro de son groupe
- le numéro de l'utilisateur
= PPID = Parent Process IDentifier.

? Une file d'attente du SE est représentée par :
- un tableau d'exécutables
+ une liste chaînée de PCB
- un fichier sur disque
- un registre du processeur
= Le cours le précise : chaque file chaîne des PCB.
```

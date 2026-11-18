---
id: ipc-tubes-signaux
titre: Communication · tubes anonymes, tubes nommés (FIFO), signaux
seance: Chapitre 5 · Communication et synchronisation (2) · TP2 et TP3
importance: 4
---

## Avant de commencer

Il te faut `fork()` et `wait()` (chapitre 2) et savoir qu'après un fork, père et fils ont des mémoires **séparées**.

```exercice Vérifie ton prérequis
? Le fils fait `x = 42;` après le fork. Le père peut-il lire 42 dans sa variable x ?
= Non : chacun a sa copie. Pour faire passer une donnée de l'un à l'autre, il faut un mécanisme de **communication** du système : fichier, mémoire partagée, tube, file de messages. C'est l'objet de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] Un tube est un **tuyau à sens unique** : on écrit par `fd[1]`, on lit par `fd[0]` (comme stdout = 1 et stdin = 0). Avant d'écrire du code, dessine qui écrit, qui lit, et barre les extrémités que chacun doit fermer.

> [!piege] Oublier de fermer l'extrémité d'**écriture** chez le lecteur (et chez le père). Tant qu'un descripteur d'écriture reste ouvert quelque part, `read()` ne voit jamais la fin du tube et **bloque pour toujours**. C'est le bug n°1 des TP.

À la fin, tu sais faire communiquer père et fils par un tube, brancher deux commandes avec `dup2()`, utiliser un FIFO entre programmes indépendants et envoyer ou capter un signal.

## Idée 1 · Les familles d'IPC du cours

```grille Les trois catégories d'outils IPC
#cols: Rôle | Outils
Échanger des données | fichiers, mémoire partagée (shmget, shmat, shmdt, shmctl)
Synchroniser | *sémaphores, *signaux
Échanger ET synchroniser | !tubes, !files de messages (msgget, msgsnd, msgrcv, msgctl)
```

Le **fichier** est le moyen le plus primitif (coûteux, accès disque, il faut des verrous). Les **files de messages** fonctionnent comme une boîte aux lettres : un message n'est lu qu'une fois, l'envoi et la réception peuvent être bloquants ou non, avec des priorités.

## Idée 2 · Le tube anonyme : pipe()

```flux Père écrivain, fils lecteur
Père : write(fd[1]) -> [ tube FIFO ] -> Fils : read(fd[0])
```

- `int pipe(int p[2]);` crée le tube : `p[0]` pour **lire**, `p[1]` pour **écrire**. Rend 0, ou −1 en cas d'erreur.
- Le tube doit être créé **avant** le `fork()` : les fils héritent des descripteurs. Seuls le créateur et ses descendants peuvent l'utiliser.
- Pas d'`open()` : le tube est utilisable tout de suite ; on le ferme avec `close()`.
- La lecture est **destructrice** (une donnée lue sort du tube) et les données sortent dans l'ordre d'entrée (FIFO). Lecture et écriture sont **bloquantes** par défaut.
- Taille limitée (`PIPE_BUF`) : un gros message peut être découpé.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int fd[2];
    if (pipe(fd) == -1) { perror("pipe"); return 1; }
    if (fork() == 0) {                 /* fils : lecteur */
        close(fd[1]);
        char buf[100];
        int n = read(fd[0], buf, 99);
        buf[n] = '\0';                 /* read() ne met pas le '\0' */
        printf("Fils a recu : %s\n", buf);
        close(fd[0]);
        exit(0);
    }
    close(fd[0]);                      /* pere : ecrivain */
    char *msg = "Salut le fils !";
    write(fd[1], msg, strlen(msg));
    close(fd[1]);
    wait(NULL);
    return 0;
}
```

```sortie
Fils a recu : Salut le fils !
```

> [!piege] `read()` n'ajoute pas le `'\0'` final : sans `buf[n] = '\0';`, `printf` affiche n'importe quoi après le message.

`read()` et `write()` manipulent des **octets bruts** : on peut faire passer des entiers ou des tableaux tant qu'on connaît leur taille. TP2, exercice 5 : un fils producteur, un fils consommateur.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int fd[2];
    pipe(fd);
    if (fork() == 0) {                       /* fils 1 : producteur */
        close(fd[0]);
        for (int i = 1; i <= 5; i++) write(fd[1], &i, sizeof(int));
        close(fd[1]);
        exit(0);
    }
    if (fork() == 0) {                       /* fils 2 : consommateur */
        close(fd[1]);
        int x;
        while (read(fd[0], &x, sizeof(int)) > 0)
            printf("Consommateur recoit : %d\n", x);
        close(fd[0]);
        exit(0);
    }
    close(fd[0]); close(fd[1]);              /* le pere ferme LES DEUX bouts */
    wait(NULL); wait(NULL);
    return 0;
}
```

```sortie
Consommateur recoit : 1
Consommateur recoit : 2
Consommateur recoit : 3
Consommateur recoit : 4
Consommateur recoit : 5
```

> [!retenir] **Règle d'or des TP** : chaque processus ferme l'extrémité qu'il n'utilise pas, et le **père ferme les deux** après ses `fork()`. Si le père gardait `fd[1]` ouvert, la boucle `while (read(...) > 0)` du consommateur ne s'arrêterait jamais.

## Idée 3 · dup2() : brancher une commande sur un tube

`dup2(fd[1], STDOUT_FILENO)` signifie « désormais, écrire sur la sortie standard (1), c'est écrire dans le tube ». Combiné à `exec`, cela reproduit le `|` du shell (TP « Pipes et FIFO », exercice 3, ici avec `echo … | wc -w` pour une sortie fixe).

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

/* equivalent C de : echo un deux trois | wc -w */
int main(void) {
    int fd[2];
    pipe(fd);
    if (fork() == 0) {                     /* fils 1 : echo */
        dup2(fd[1], STDOUT_FILENO);        /* stdout -> entree du tube */
        close(fd[0]); close(fd[1]);
        execlp("echo", "echo", "un", "deux", "trois", NULL);
        exit(1);                           /* seulement si exec echoue */
    }
    if (fork() == 0) {                     /* fils 2 : wc -w */
        dup2(fd[0], STDIN_FILENO);         /* stdin <- sortie du tube */
        close(fd[0]); close(fd[1]);
        execlp("wc", "wc", "-w", NULL);
        exit(1);
    }
    close(fd[0]); close(fd[1]);
    wait(NULL); wait(NULL);
    return 0;
}
```

```sortie
3
```

## Idée 4 · Le tube nommé (FIFO)

Un **FIFO** a un **nom** dans le système de fichiers (`mkfifo monfifo`, ou `mkfifo("monfifo", 0666)` en C ; `ls -l` affiche `p` en tête). Il relie des processus **sans lien de parenté**. On l'ouvre avec `open()`, **soit** en `O_RDONLY` **soit** en `O_WRONLY`.

```c nontest
/* ecrivain.c */
int fd = open("monfifo", O_WRONLY);       /* bloque tant qu'il n'y a pas de lecteur */
write(fd, "Bonjour depuis P1 !", 20);
close(fd);

/* lecteur.c */
char buf[100];
int fd = open("monfifo", O_RDONLY);       /* bloque tant qu'il n'y a pas d'écrivain */
int n = read(fd, buf, 99); buf[n] = '\0';
printf("%s\n", buf);
close(fd);
unlink("monfifo");                        /* supprimer le FIFO après usage */
```

> [!retenir] `open()` sur un FIFO **bloque** jusqu'à ce que l'autre côté soit ouvert : synchronisation gratuite. C'est pourquoi le cours lance l'écrivain en arrière-plan (`./fifo1 &`) : seul, il resterait suspendu.

## Idée 5 · Les signaux

Un **signal** notifie un processus d'un événement ; il ne transporte pas de données. Chaque signal a un comportement par défaut : terminer (avec ou sans fichier core), ignorer, stopper, reprendre.

```grille Signaux à connaître
#cols: N° | Nom | Rôle
1 | SIGHUP | déconnexion du terminal
2 | *SIGINT | interruption clavier (Ctrl-C)
3 | SIGQUIT | quitter (Ctrl-\)
9 | *SIGKILL | destruction inconditionnelle (ne peut être ni capté ni ignoré)
10 / 12 | *SIGUSR1 / SIGUSR2 | libres pour l'utilisateur
11 | SIGSEGV | référence mémoire invalide
13 | SIGPIPE | écriture dans un tube sans lecteur
14 | SIGALRM | alarme (horloge)
15 | SIGTERM | demande de terminaison normale
17 | SIGCHLD | un fils est mort
18 / 19 | SIGCONT / SIGSTOP | reprendre / stopper
```

> [!attention] Corrections du tableau des diapos : « SIGUP » s'écrit **SIGHUP**, « SIGALARM » s'écrit **SIGALRM**. Et **Ctrl-Z** envoie **SIGTSTP** (n° 20), pas SIGSTOP : SIGTSTP peut être capté, SIGSTOP jamais. Les numéros 10 et 12 de SIGUSR1/2 valent pour Linux sur PC.

Envoyer : en shell `kill -9 4014` ou `kill -SIGUSR1 2584` ; en C `kill(pid, SIGUSR1)`. `kill(-getpid(), sig)` vise tout le groupe du processus. Capter : `signal(SIGUSR1, handler)` (ou `sigaction()`). `pause()` endort jusqu'au prochain signal. `signal(SIGCHLD, SIG_IGN)` évite les zombies.

TP3, exercice 3 : le père envoie SIGUSR1 à son fils.

```c
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <sys/wait.h>

volatile sig_atomic_t recu = 0;
void handler(int sig) { recu = sig; }

int main(void) {
    setvbuf(stdout, NULL, _IONBF, 0);   /* pas de tampon : affichage immediat */
    signal(SIGUSR1, handler);           /* installe AVANT fork : le fils en herite */
    pid_t pid = fork();
    if (pid == 0) {
        while (!recu) pause();          /* attend un signal */
        printf("Fils : SIGUSR1 recu (numero %d)\n", recu);
        exit(0);
    }
    sleep(1);
    printf("Pere : j'envoie SIGUSR1 au fils...\n");
    kill(pid, SIGUSR1);
    wait(NULL);
    printf("Pere : fils termine.\n");
    return 0;
}
```

```sortie
Pere : j'envoie SIGUSR1 au fils...
Fils : SIGUSR1 recu (numero 10)
Pere : fils termine.
```

> [!piege] Installe le gestionnaire **avant** le `fork()` (le fils en hérite) ou au tout début du fils. Si le signal arrive avant l'installation, le comportement par défaut de SIGUSR1 s'applique : le fils **meurt**.

## S'exercer

```exercice TP2 et TP3
? Le père crée un tube, forke, écrit dans `fd[1]` mais ne ferme jamais `fd[1]`. Le fils lit en boucle jusqu'à `read() == 0`. Que se passe-t-il ?
= Le fils lit le message puis **reste bloqué** : tant qu'une extrémité d'écriture est ouverte (celle du père), le système ne signale pas la fin du tube. Il faut `close(fd[1])` chez le père après l'écriture.

? Différence entre `who & ps & ls -l` et `who ; ps ; ls -l`, traduits en C (TP2, ex. 2 et 3) ?
= `&` : le père fait 3 `fork()` d'affilée, puis 3 `wait()` : les commandes tournent en parallèle, ordre d'affichage non garanti. `;` : `fork()`, `wait()`, `fork()`, `wait()`… : une commande à la fois, ordre garanti.

? Pourquoi un tube anonyme ne peut-il pas relier deux programmes lancés dans deux terminaux ?
= Il n'a pas de nom : il n'existe que dans les tables de descripteurs, qui ne se transmettent que par `fork()`. Il faut un **FIFO** (tube nommé).

? Le père fait `kill(-getpid(), SIGUSR1)` pour prévenir ses 3 fils, sans précaution. Que lui arrive-t-il ?
= Il fait partie du groupe : il reçoit aussi SIGUSR1 et, avec le comportement par défaut, **se termine**. D'où le `signal(SIGUSR1, SIG_IGN)` dans le père (TP3, ex. 4).
```

## Flashcards

```cartes
pipe(fd) :: fd[0] = lecture, fd[1] = écriture. Tube anonyme, unidirectionnel, entre processus apparentés.
Quand créer le tube ? :: Avant le fork(), pour que les fils héritent des descripteurs.
Pourquoi read() bloque à vie ? :: Une extrémité d'écriture est restée ouverte quelque part (souvent chez le père).
dup2(fd[1], STDOUT_FILENO) :: Redirige la sortie standard vers le tube : sert à brancher une commande exec sur un tube.
Tube nommé (FIFO) :: Tube avec un nom dans le système de fichiers (mkfifo) ; relie des processus sans parenté ; open() bloquant.
Lecture dans un tube :: Destructrice et dans l'ordre FIFO.
SIGKILL :: Signal 9 : destruction inconditionnelle, ni captable ni ignorable.
Ctrl-C, Ctrl-Z, Ctrl-\ :: SIGINT, SIGTSTP (pas SIGSTOP), SIGQUIT.
signal(SIGCHLD, SIG_IGN) :: Les fils morts sont nettoyés automatiquement : pas de zombie.
pause() :: Suspend le processus jusqu'à l'arrivée d'un signal.
```

## QCM du chapitre

```qcm
? Dans `int fd[2]; pipe(fd);`, on écrit dans :
- fd[0]
+ fd[1]
- les deux
= fd[0] lecture, fd[1] écriture.

? Un tube anonyme permet la communication entre :
- deux programmes quelconques
+ le processus créateur et ses descendants
- deux machines
= Il faut hériter des descripteurs par fork().

? Après `read()` d'une chaîne dans un tube, il faut souvent :
+ ajouter le caractère '\0' à la fin
- appeler open()
- appeler wait()
= read ne termine pas la chaîne.

? Quelle primitive crée un tube nommé ?
- pipe()
+ mkfifo()
- dup2()
- shmget()
= mkfifo (ou mknod).

? `open("monfifo", O_WRONLY)` sans aucun lecteur :
- échoue tout de suite
+ bloque jusqu'à l'ouverture en lecture
- écrit dans le vide
= Synchronisation automatique du FIFO.

? Quel signal ne peut être ni capté ni ignoré ?
- SIGTERM
- SIGINT
+ SIGKILL
- SIGUSR1
= SIGKILL (9), comme SIGSTOP.

? Quel signal reçoit un processus qui écrit dans un tube sans lecteur ?
+ SIGPIPE
- SIGSEGV
- SIGCHLD
= Signal 13.

? Les signaux servent principalement à :
- transférer de gros volumes de données
+ notifier un événement
- partager la mémoire
= Le cours : « limités au rôle de notification d'événement ».

? Quel est l'effet de `dup2(fd[0], STDIN_FILENO)` ?
+ Ce que le processus lit sur l'entrée standard vient du tube
- Ce que le processus écrit va dans le tube
- Le tube est fermé
= Côté lecteur d'un pipeline (wc -l par exemple).

? Les files de messages se manipulent avec :
- shmget, shmat
+ msgget, msgsnd, msgrcv, msgctl
- pipe, read, write
= Primitives citées par le cours.
```

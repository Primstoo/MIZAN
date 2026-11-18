---
id: fork-wait-exit
titre: Processus (2) · fork, exit, wait, zombies et orphelins
seance: Chapitre 1 · Les processus (suite) · TP1
importance: 5
---

## Avant de commencer

Tu dois savoir écrire un petit programme C (`main`, `printf`, `if`, `for`) et connaître les états d'un processus (chapitre précédent).

```exercice Vérifie ton prérequis
? Dans `int main(void){ int i; for(i = 0; i < 3; i++) printf("%d", i); return 0; }`, que vaut `i` après la boucle et qu'est-ce qui est affiché ?
= Affichage `012`, et `i` vaut 3 en sortie de boucle (c'est le test `3 < 3` faux qui l'arrête). Si tu hésites, revois les boucles en C avant ce chapitre : on va compter des processus créés dans des boucles.
```

## Comment aborder ce chapitre

> [!astuce] Après un `fork()`, imagine **deux copies du même programme**, posées côte à côte, qui reprennent **juste après** le `fork()`. Seule la valeur rendue par `fork()` les distingue. Dessine toujours l'**arbre** des processus.

> [!piege] Penser que le fils recommence au début de `main`. Non : il démarre **à la fin du fork()**, avec une copie de toutes les variables du père à cet instant.

À la fin, tu sais compter les processus créés par n'importe quel code à base de `fork()`, synchroniser un père et ses fils avec `wait()`, et expliquer zombie et orphelin.

## Idée 1 · fork() rend deux valeurs différentes

```html
<svg viewBox="0 0 640 220" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Après fork, le père de PID 17 reçoit 48, le PID du fils ; le fils de PID 48 reçoit 0">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="230" y="10" width="180" height="46" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="320" y="31">Père (PID 17)</text><text x="320" y="49" font-family="monospace">i = fork();</text>
<rect x="40" y="140" width="220" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="150" y="164">Père (PID 17)</text><text x="150" y="188" font-family="monospace" fill="#D9824F" font-weight="700">i = 48</text>
<rect x="380" y="140" width="220" height="60" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="490" y="164">Fils (PID 48)</text><text x="490" y="188" font-family="monospace" fill="#D9824F" font-weight="700">i = 0</text>
</g>
<g stroke="currentColor" stroke-width="2"><line x1="290" y1="58" x2="160" y2="138"/><line x1="350" y1="58" x2="480" y2="138"/></g>
<g font-family="sans-serif" font-size="12" fill="currentColor"><text x="150" y="100">continue</text><text x="430" y="100">copie (clone)</text></g>
</svg>
```

`#include <unistd.h>` puis `pid_t fork(void);`

| Où ? | Valeur rendue par `fork()` |
|---|---|
| dans le **père** | le **PID du fils** (> 0) |
| dans le **fils** | **0** |
| en cas d'**échec** | **−1** (aucun fils créé) |

Après le `fork()`, les deux processus ont :

- **le même code** (partagé, non dupliqué) ;
- **les mêmes données, mais dupliquées** : modifier une variable dans l'un est invisible dans l'autre ;
- **les mêmes fichiers ouverts** (si le fils avance dans un fichier, le père voit aussi la position bouger) ;
- le même environnement.

`getpid()` rend ton propre PID, `getppid()` celui de ton père.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int n = 100;
    pid_t pid = fork();
    if (pid == 0) {              /* fils */
        n = n * 2;
        printf("Fils : n=%d\n", n);
        exit(0);
    }
    wait(NULL);                  /* le pere attend : l'ordre est garanti */
    n = n * 3;
    printf("Pere : n=%d\n", n);
    return 0;
}
```

```sortie
Fils : n=200
Pere : n=300
```

Le père obtient 300 et non 600 : le `n * 2` du fils a modifié **sa copie** de `n`. (TP2, exercice 1.) Si tu affiches `&n` dans les deux, tu obtiens la **même adresse virtuelle**, mais elle correspond à deux pages physiques différentes (copie à l'écriture, *copy-on-write*).

## Idée 2 · Compter les processus : dessine l'arbre

```etapes Combien de processus pour fork(); fork(); fork(); ?
Départ :: 1 processus, le programme lancé (P0).
1er fork :: Chaque processus existant se duplique : 1 → 2.
2e fork :: Les 2 processus exécutent ce fork : 2 → 4.
3e fork :: Les 4 processus exécutent ce fork : 4 → 8.
Conclusion :: k appels fork() à la suite (sans condition) donnent 2^k processus au total, dont 2^k − 1 créés.
```

Le programme suivant le vérifie : chaque processus écrit un octet dans un tube, et le processus d'origine les compte.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int p[2];
    pipe(p);                     /* chaque processus y deposera 1 octet */
    pid_t original = getpid();

    fork();
    fork();
    fork();

    write(p[1], "x", 1);         /* "je suis un processus" */
    while (wait(NULL) > 0) ;     /* chacun attend ses propres fils */
    if (getpid() != original) exit(0);

    close(p[1]);
    char c; int total = 0;
    while (read(p[0], &c, 1) == 1) total++;
    printf("Nombre de processus : %d\n", total);
    return 0;
}
```

```sortie
Nombre de processus : 8
```

**Avec une condition**, seuls certains processus exécutent le fork suivant (TD1, exercice 2) :

```grille Nombre total de processus (programme lancé compris)
#cols: Code | Qui forke ? | Total
fork(); fork(); | tout le monde, 2 fois | *4
if (fork() > 0) fork(); | seul le père forke la 2e fois | *3
while(cpt<3){ if(fork()>0) cpt++; else cpt=3; } | le père forke 3 fois, chaque fils sort de la boucle | *4
```

> [!piege] Dans `fork(); printf("fork1\n"); fork(); printf("fork2\n"); fork(); printf("fork3\n");` on a 8 processus, mais « fork1 » s'affiche **2 fois**, « fork2 » **4 fois**, « fork3 » **8 fois** (14 lignes). Attention : si la sortie est redirigée vers un fichier ou un tube, `printf` garde le texte en tampon, et ce tampon est **copié** par le fork suivant : on voit alors plus de lignes. Un `fflush(stdout)` avant chaque `fork()` évite la surprise.

## Idée 3 · exit() et wait() : le père récupère le code du fils

- `void exit(int status)` termine le processus avec un **code de retour**. Convention : **0 = succès**, non nul (souvent 1) = erreur. Un `return` dans `main` fait pareil.
- `pid_t wait(int *status)` suspend le père jusqu'à la fin **d'un** fils. Elle rend le PID du fils terminé, ou **−1** s'il n'y a plus de fils. Si un fils est déjà terminé, elle revient tout de suite.
- `waitpid(pid, &status, options)` attend **un fils précis** ; `options` dit s'il faut bloquer ou non (`WNOHANG` : ne pas attendre).
- `WEXITSTATUS(status)` extrait le code passé à `exit()`.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int status;
    pid_t pid = fork();
    if (pid == -1) { perror("fork"); return 1; }
    if (pid == 0) {
        printf("Je suis le fils\n");
        exit(7);
    }
    pid_t fini = wait(&status);
    if (WIFEXITED(status))
        printf("wait a rendu le PID du fils : %s\n", fini == pid ? "oui" : "non");
    printf("Code de retour du fils : %d\n", WEXITSTATUS(status));
    return 0;
}
```

```sortie
Je suis le fils
wait a rendu le PID du fils : oui
Code de retour du fils : 7
```

> [!prof] Les trois causes de fin d'un fils que `wait()` distingue : **stoppé**, terminé **volontairement par exit()**, terminé **par un signal**. Et les deux familles de terminaison : **volontaire** (exit, return, erreur gérée) ou **involontaire** (erreur fatale comme une erreur de segmentation, `kill()` par un autre processus, arrêt par le système).

## Idée 4 · Zombie et orphelin

```grille Qui meurt en premier ?
#cols: Situation | Nom | Que se passe-t-il ?
Le fils meurt, le père ne fait pas wait() | *Zombie | Le fils garde son entrée dans la table des processus (état Z, <defunct>) mais n'utilise plus de ressources
Le père meurt avant le fils | !Orphelin | Le fils est adopté par init (PID 1), qui récupérera son code de fin
```

```etapes Vie et mort d'un zombie
fork() :: A crée B.
exit() de B :: B se termine et envoie le signal SIGCHLD à son père A.
A ne fait pas wait() :: B reste dans la table des processus : c'est un zombie (Z, <defunct> dans ps).
A appelle wait() :: A récupère le code de B ; l'entrée de B est enfin supprimée. wait() « tue » les zombies.
Si A meurt sans wait() :: B, zombie orphelin, est adopté par init, qui fait le wait() à sa place.
```

> [!astuce] Pour **voir** un zombie (TP3) : le fils fait `exit(0)` tout de suite, le père fait `sleep(30)` ou une boucle infinie. Pendant ce temps, `ps -ef | grep defunct` dans un autre terminal. Pour éviter les zombies sans `wait()` : `signal(SIGCHLD, SIG_IGN);` avant le `fork()`, le système nettoie alors les fils tout seul.

## Idée 5 · Chaîne et arbre de processus

```grille Chaîne contre arbre (TP1, exercices 4 et 5)
#cols: Critère | Chaîne P0→P1→P2 | Arbre P0→{P1, P2, P3}
Qui fait exit() dans la boucle ? | *le PÈRE | *le FILS
Même PPID pour tous les fils ? | non | oui (celui de P0)
getppid() du fils i | PID du fils i−1 | PID de P0
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

/* Chaine de 3 processus : chacun cree UN fils puis l'attend */
int main(void) {
    int n = 3;
    for (int i = 0; i < n; i++) {
        pid_t pid = fork();
        if (pid > 0) {               /* pere : attend puis quitte la boucle */
            wait(NULL);
            printf("Processus %d termine apres son fils\n", i);
            exit(0);
        }
        /* fils : continue la boucle et cree le suivant */
    }
    printf("Processus %d (le dernier) : pas de fils\n", n);
    return 0;
}
```

```sortie
Processus 3 (le dernier) : pas de fils
Processus 2 termine apres son fils
Processus 1 termine apres son fils
Processus 0 termine apres son fils
```

Pour l'**arbre**, c'est l'inverse : le fils affiche puis fait `exit(0)`, et le père continue la boucle ; à la fin, il fait `wait()` n fois.

```c nontest
for (int i = 1; i <= n; i++) {
    if (fork() == 0) {
        printf("Fils %d : PID=%d, PPID=%d\n", i, getpid(), getppid());
        exit(0);            /* sans cet exit, le fils reboucle et forke : explosion */
    }
}
for (int i = 0; i < n; i++) wait(NULL);
```

> [!attention] Le corrigé « Rapports TD » de l'exercice 6 du TD1 échange les deux structures : son programme « chaîne » est en fait un **arbre** (c'est le fils qui fait `exit`), et son « arbre » une **chaîne** (c'est le père qui fait `exit`). Fie-toi au tableau ci-dessus, tiré du TP1.

## Idée 6 · exec : remplacer le programme du fils

`fork()` copie le **même** programme. Pour lancer **une autre commande**, le fils appelle une fonction de la famille `exec`, qui **remplace** son code par celui de la commande (le PID ne change pas).

```c nontest
if (fork() == 0) {
    execlp("ls", "ls", "-l", NULL);     /* arguments en liste, terminée par NULL */
    perror("execlp");                   /* n'est atteint QUE si exec a échoué */
    exit(1);
}
wait(NULL);
printf("ls termine\n");
```

- `execlp(cmd, arg0, arg1, …, NULL)` : arguments **listés**.
- `execvp(cmd, tableau)` : arguments dans un **tableau** terminé par `NULL`. Astuce du TP1 : `execvp(argv[1], &argv[1])` exécute la commande passée en paramètre du programme.

## Idée 7 · Les threads (processus légers)

Un **thread** est un fil d'exécution **à l'intérieur** d'un processus. Il **partage** la mémoire et les variables du processus qui l'a créé (pas une copie comme avec `fork()`).

| | Processus (lourd) | Thread (léger) |
|---|---|---|
| Création | recopie : lourde | rapide |
| Mémoire | séparée | **partagée** |
| Communication | tubes, signaux… | variables communes |

Le cours cite trois défauts des processus lourds : gestion lourde par recopie, gaspillage de mémoire, perte de temps. Le **multithreading** permet d'exécuter plusieurs parties d'un même processus en (pseudo-)parallèle.

## S'exercer

```exercice Exercices types (TD1 et TP1)
? Combien de processus au total (programme lancé compris) pour `int main(){ fork(); fork(); fork(); printf("hello\n"); exit(0); }` ? Combien de « hello » ?
reponse: 8
= 2³ = **8 processus**, chacun affiche « hello » une fois : **8 hello** (TD1, exercice 5).

? Écris un programme où deux fils affichent l'un 1 à 50, l'autre 51 à 100, **dans l'ordre** (TD1, exercice 4).
indice: Le 2e fils ne doit être créé qu'après la fin du 1er.
= Il suffit d'un `wait(NULL)` entre les deux créations : le programme corrigé, testé, est juste sous ce bloc d'exercices.
  Sans le premier `wait`, les deux fils tournent en même temps et les nombres peuvent se mélanger (question 1).

? Écris un programme qui affiche PID, PPID, UID, EUID, GID et EGID (TD1, exercice 1).
= `printf("PID:%d PPID:%d UID:%d EUID:%d GID:%d EGID:%d\n", getpid(), getppid(), getuid(), geteuid(), getgid(), getegid());` avec `#include <unistd.h>`. Le propriétaire **effectif** diffère du **réel** pour un programme avec le bit setuid (ex. `passwd`).

? Le père fait `for(;;);` sans jamais appeler `wait()`, le fils fait `exit(0)`. Que montre `ps` ? Que se passe-t-il si on tue le père ?
= Le fils apparaît en **zombie** (état Z, `<defunct>`). Si on tue le père, le zombie devient orphelin, il est adopté par **init**, qui fait le `wait()` : le zombie disparaît (TP3, exercice 1).
```

**Corrigé testé du TD1, exercice 4 (question 2)**

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

/* TD1 ex4 question 2 : afficher 1 2 3 ... 100 dans l'ordre */
int main(void) {
    if (fork() == 0) {
        for (int i = 1; i <= 50; i++) printf("%d ", i);
        fflush(stdout);
        exit(0);
    }
    wait(NULL);                     /* le 2e fils n'est cree qu'apres la fin du 1er */
    if (fork() == 0) {
        for (int i = 51; i <= 100; i++) printf(i < 100 ? "%d " : "%d\n", i);
        exit(0);
    }
    wait(NULL);
    return 0;
}
```

```sortie
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
```

## Flashcards

```cartes
Valeurs de retour de fork() :: Dans le père : PID du fils (> 0). Dans le fils : 0. Échec : −1.
Où démarre le fils après fork() ? :: Juste après l'appel fork(), avec une copie des variables du père.
Que partagent père et fils ? :: Le code (non dupliqué), les fichiers ouverts, l'environnement. Les données sont dupliquées.
k fork() à la suite donnent… :: 2^k processus au total (programme initial compris).
Que rend wait(&status) ? :: Le PID du fils terminé (−1 s'il n'y a plus de fils) ; le code est lu avec WEXITSTATUS(status).
Processus zombie :: Fils terminé dont le père n'a pas encore fait wait() : il reste dans la table des processus (état Z, <defunct>).
Processus orphelin :: Fils dont le père est mort : il est adopté par init (PID 1).
Signal envoyé au père quand un fils meurt :: SIGCHLD.
Chaîne vs arbre de processus :: Chaîne : le père fait exit() dans la boucle. Arbre : le fils fait exit() dans la boucle.
execlp vs execvp :: execlp : arguments en liste terminée par NULL. execvp : arguments dans un tableau. Les deux remplacent le programme du processus.
```

## QCM du chapitre

```qcm
? Dans le processus fils, `fork()` renvoie :
- le PID du père
+ 0
- −1
- le PID du fils
= Le père reçoit le PID du fils ; le fils reçoit 0.

? Combien de processus au total pour `fork(); fork();` ?
- 2
- 3
+ 4
- 6
= 2² = 4, programme initial compris.

? Combien de processus au total pour `if (fork() > 0) fork();` ?
- 2
+ 3
- 4
= Seul le père (qui reçoit un PID > 0) exécute le second fork.

? Le fils fait `x = 5;` après le fork. Que vaut `x` chez le père ?
- 5
+ La valeur qu'il avait avant, inchangée
- Une valeur aléatoire
= Les données sont dupliquées : chacun modifie sa propre copie.

? Avec `fork(); printf("A\n"); fork(); printf("B\n");` (sortie sur le terminal), combien de « B » ?
- 2
+ 4
- 3
- 8
= 4 processus existent quand on arrive au second printf.

? Un fils terminé dont le père n'a pas appelé wait() est :
- orphelin
+ zombie
- bloqué
- démon
= Il reste dans la table des processus jusqu'au wait().

? Si le père meurt avant son fils, le fils :
- meurt aussi
+ est adopté par init (PID 1)
- devient zombie immédiatement
- reprend le PID du père
= C'est un orphelin, adopté par init.

? `wait()` quand il n'y a plus aucun fils :
- bloque indéfiniment
+ revient tout de suite avec −1
- revient avec 0
= Le cours : « S'il n'y a plus de fils en cours, wait se termine immédiatement et renvoie −1 ».

? Que fait `execlp("ls", "ls", "-l", NULL)` dans le fils ?
- Crée un nouveau processus qui exécute ls
+ Remplace le programme du fils par ls, sans changer son PID
- Attend la fin de ls
= exec ne crée pas de processus : il remplace le code du processus courant.

? Qu'est-ce qu'un thread partage avec son processus, contrairement à un fils créé par fork() ?
- Rien
+ Son espace mémoire et ses variables
- Uniquement son PID
= Le thread n'est pas une copie : il travaille dans la même mémoire.

? Quelle fonction permet d'attendre la fin d'un fils précis ?
- wait()
+ waitpid()
- exit()
- getppid()
= waitpid prend le PID du fils en premier paramètre.
```

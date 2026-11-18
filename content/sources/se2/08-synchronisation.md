---
id: synchronisation-semaphores
titre: Synchronisation · section critique, sémaphores et problèmes classiques
seance: Chapitre 5 · Communication et synchronisation (1) · TD5
importance: 5
---

## Avant de commencer

Il te faut deux choses : un processus peut être **interrompu entre deux instructions** (chapitres 1 et 4), et l'état **bloqué** (un processus qui attend un événement).

```exercice Vérifie ton prérequis
? L'instruction `V = V - 1` est-elle exécutée « d'un seul coup » par le processeur ?
= Non. Elle se décompose en au moins trois étapes : **lire** V dans un registre, **calculer** V − 1, **écrire** le résultat dans V. L'ordonnanceur peut couper le processus entre deux de ces étapes : c'est la source de tous les problèmes du chapitre.
```

## Comment aborder ce chapitre

> [!astuce] Lis chaque solution à sémaphores en jouant **l'ordonnanceur méchant** : coupe le processus au pire moment et regarde si quelque chose casse. Une solution est bonne seulement si aucun entrelacement ne la casse.

> [!piege] Écrire `V()` sans le `P()` correspondant (ou l'inverse). Un sémaphore de synchronisation se lit par paires : celui qui doit **attendre** fait `P(s)`, celui qui **autorise** fait `V(s)`. Un `V()` que personne n'attend ne bloque rien.

À la fin, tu sais repérer une section critique, la protéger par un mutex, imposer un ordre d'exécution avec des sémaphores, et écrire producteur/consommateur et lecteurs/rédacteurs.

## Idée 1 · Pourquoi synchroniser : l'exemple du cours

Deux processus P1 et P2 décrémentent la même variable partagée V (valeur initiale v0). Chacun exécute : `1. x = V - 1;  2. V = x;`

```etapes Un entrelacement qui perd une décrémentation
P1.1 :: P1 lit v0 et calcule x = v0 − 1. Il est interrompu avant d'écrire.
P2.1 :: P2 lit V, qui vaut encore v0, et calcule x = v0 − 1.
P2.2 :: P2 écrit V = v0 − 1.
P1.2 :: P1 reprend et écrit SON x : V = v0 − 1.
Bilan :: V vaut v0 − 1 au lieu de v0 − 2. Le résultat dépend de l'ordre d'exécution : c'est le non-déterminisme.
```

Les relations entre processus sont soit **conflictuelles** (ils partagent des ressources), soit de **coopération** (ils participent à un même traitement).

| Mot | Définition du cours |
|---|---|
| **Ressource critique** | ressource utilisable par un seul processus à la fois (des accès concurrents mènent à un état incohérent) |
| **Section critique** | portion de code qui manipule une ressource critique |
| **Exclusion mutuelle** | garantir qu'un seul processus à la fois est dans sa section critique |
| **Interblocage** | chaque processus d'un groupe attend une ressource tenue par un autre du groupe : attente **infinie** |
| **Famine** | des processus monopolisent les ressources au détriment d'autres : attente **indéfinie** |

```flux Structure d'un processus qui utilise une section critique
Partie non conflictuelle -> Protocole d'acquisition -> Section critique -> Protocole de libération -> Partie non conflictuelle
```

## Idée 2 · Le sémaphore : un compteur et une file

Un **sémaphore** est un compteur entier (≥ 0) associé à une **file de processus bloqués**. On n'y touche que par trois opérations : l'initialisation, **P** (*Puis-je ?*, wait, prise) et **V** (*Vas-y !*, signal, libération).

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:620px;display:block;margin:10px auto" role="img" aria-label="Sémaphore : P décrémente le compteur s'il est positif, sinon bloque le processus dans la file ; V réveille un processus de la file s'il y en a, sinon incrémente le compteur">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="250" y="40" width="140" height="90" rx="10" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="320" y="68" text-anchor="middle" font-weight="700">sémaphore S</text>
<text x="320" y="92" text-anchor="middle">compteur</text>
<text x="320" y="116" text-anchor="middle">file des bloqués</text>
<text x="20" y="60" font-weight="700">P(S)</text>
<text x="20" y="80">si compteur &gt; 0 : compteur − 1</text>
<text x="20" y="100">sinon : je me bloque</text>
<text x="410" y="60" font-weight="700">V(S)</text>
<text x="410" y="80">si quelqu'un attend : le réveiller</text>
<text x="410" y="100">sinon : compteur + 1</text>
</g>
<g stroke="currentColor" stroke-width="2" fill="none"><line x1="200" y1="110" x2="246" y2="90"/><line x1="394" y1="90" x2="408" y2="110"/></g>
</svg>
```

> [!attention] La diapo écrit `V()` ainsi : « compteur = compteur + 1 ; si (compteur > 0) alors extraire un processus de la file ». Avec un compteur qui ne descend jamais sous 0 (comme dans le `P()` de la diapo), cela réveillerait un processus **et** laisserait un jeton en trop. Version cohérente : **si la file n'est pas vide, réveiller un processus ; sinon compteur + 1.** (Dans la variante où le compteur peut devenir négatif, on teste « si compteur ≤ 0 après l'incrément ».)

> [!retenir] **Analogie du cours** : un parking de N places avec un feu. P = entrer (s'il reste une place, sinon attendre au feu). V = sortir (on libère une place ou on laisse entrer le premier qui attend).

**Deux usages :**

- **Exclusion mutuelle** : sémaphore **binaire** `mutex` initialisé à **1**. `P(mutex)` avant la section critique, `V(mutex)` après.
- **Synchronisation (ordre)** : sémaphore initialisé à **0**. Celui qui doit attendre fait `P(s)`, celui qui donne le signal fait `V(s)`.

Le même principe en C, avec deux threads POSIX qui incrémentent 100 000 fois chacun un compteur commun :

```c
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

int compteur = 0;
sem_t mutex;

void *travail(void *arg) {
    for (int i = 0; i < 100000; i++) {
        sem_wait(&mutex);      /* P(mutex) */
        compteur++;            /* section critique */
        sem_post(&mutex);      /* V(mutex) */
    }
    return NULL;
}

int main(void) {
    sem_init(&mutex, 0, 1);    /* semaphore binaire initialise a 1 */
    pthread_t t1, t2;
    pthread_create(&t1, NULL, travail, NULL);
    pthread_create(&t2, NULL, travail, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("compteur = %d\n", compteur);
    return 0;
}
```

```sortie
compteur = 200000
```

Sans `sem_wait` / `sem_post`, le résultat est **variable et souvent inférieur** à 200 000 (des incrémentations se perdent comme dans l'exemple de V). Compile avec `gcc prog.c -o prog -pthread`.

> [!attention] `sem_wait`, `sem_post` et les threads POSIX ne sont pas dans les diapos : c'est l'implémentation Linux des opérations P et V du cours. Le cours cite aussi la mémoire partagée (`shmget`, `shmat`, `shmdt`, `shmctl`).

## Idée 3 · Imposer un ordre : le graphe de préséance (TD5, ex. 1)

```html
<svg viewBox="0 0 640 230" style="width:100%;max-width:520px;display:block;margin:10px auto" role="img" aria-label="Graphe de préséance : S1 vers S2, S3 et S4 ; S2 et S3 vers S5 ; S5 et S4 vers S6">
<defs><marker id="se2fl8" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"/></marker></defs>
<g font-family="sans-serif" font-size="14" font-weight="700" text-anchor="middle" fill="currentColor">
<circle cx="320" cy="30" r="20" fill="none" stroke="#D9824F" stroke-width="3"/><text x="320" y="35">S1</text>
<circle cx="200" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="200" y="105">S2</text>
<circle cx="300" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="105">S3</text>
<circle cx="440" cy="100" r="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="440" y="105">S4</text>
<circle cx="250" cy="160" r="20" fill="none" stroke="currentColor" stroke-width="2"/><text x="250" y="165">S5</text>
<circle cx="340" cy="205" r="20" fill="none" stroke="#D9824F" stroke-width="3"/><text x="340" y="210">S6</text>
</g>
<g stroke="currentColor" stroke-width="1.8" marker-end="url(#se2fl8)">
<line x1="305" y1="44" x2="216" y2="88"/><line x1="317" y1="50" x2="304" y2="79"/><line x1="337" y1="42" x2="422" y2="88"/>
<line x1="210" y1="118" x2="238" y2="143"/><line x1="292" y1="119" x2="262" y2="143"/>
<line x1="268" y1="170" x2="321" y2="196"/><line x1="433" y1="119" x2="356" y2="191"/>
</g>
</svg>
```

```etapes Méthode : un sémaphore à 0 par flèche
Compter les flèches :: S1→S2, S1→S3, S1→S4, S2→S5, S3→S5, S5→S6, S4→S6 : 7 sémaphores, tous initialisés à 0.
Au départ d'une flèche :: Le processus d'origine fait V(sémaphore) APRÈS son bloc d'instructions.
À l'arrivée d'une flèche :: Le processus de destination fait P(sémaphore) AVANT son bloc.
Plusieurs flèches entrantes :: Autant de P() que de flèches : S5 attend S2 ET S3.
```

```c nontest
Semaphore a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
/* a: S1->S2  b: S1->S3  c: S1->S4  d: S2->S5  e: S3->S5  f: S5->S6  g: S4->S6 */
Process P1 { S1; a.V(); b.V(); c.V(); }
Process P2 { a.P(); S2; d.V(); }
Process P3 { b.P(); S3; e.V(); }
Process P4 { c.P(); S4; g.V(); }
Process P5 { d.P(); e.P(); S5; f.V(); }
Process P6 { f.P(); g.P(); S6; }
```

> [!attention] Le corrigé « Rapports TD » de cet exercice ne met **que des V()** : sans les P(), aucun processus n'attend personne et les contraintes ne sont pas respectées.

## Idée 4 · Producteurs / consommateurs

Des **producteurs** déposent des messages dans un **tampon** de N cases ; des **consommateurs** les retirent (exemple : la file d'impression). Contraintes : pas de message perdu (on ne dépose pas dans un tampon plein), chaque message retiré une seule fois, et une opération impossible **bloque** le processus.

```c nontest
Semaphore Mutex  = 1;      /* exclusion mutuelle sur le tampon     */
Semaphore Plein  = 0;      /* nombre de messages disponibles       */
Semaphore Vide   = N;      /* nombre de cases libres               */

Producteur() {                       Consommateur() {
  Tantque Vrai faire                   Tantque Vrai faire
    m = creermessage();                  Plein.P();     /* attend un message */
    Vide.P();      /* attend une case */  Mutex.P();
    Mutex.P();                            m = LectureTampon();
    EcritureTampon(m);                    Mutex.V();
    Mutex.V();                            Vide.V();      /* une case de plus */
    Plein.V();     /* un message de plus */ consommer(m);
  FinTantque                           FinTantque
}                                    }
```

> [!piege] L'ordre compte : il faut faire `Vide.P()` **avant** `Mutex.P()`. Dans l'autre sens, un producteur qui trouve le tampon plein s'endort **en tenant le mutex** ; plus aucun consommateur ne peut entrer pour vider : **interblocage**.

Avec un tampon **illimité** (TD5 ex. 3, question 1), on garde seulement `Mutex` et `Plein` : les producteurs ne bloquent jamais.

## Idée 5 · Lecteurs / rédacteurs

Un fichier partagé : **plusieurs lecteurs** peuvent lire ensemble ; un **rédacteur** doit être **seul** (ni autre rédacteur, ni lecteur).

```grille Accès simultanés autorisés
#cols: | Lecture | Écriture
Lecture | *possible | !interdit
Écriture | !interdit | !interdit
```

```c nontest
Semaphore Mutex = 1;    /* protège nb_lecteurs     */
Semaphore Acces = 1;    /* accès exclusif au fichier */
int nb_lecteurs = 0;

Lecteur() {                          Redacteur() {
  Mutex.P();                           Acces.P();
  nb_lecteurs++;                       EcrireRessource();
  if (nb_lecteurs == 1) Acces.P();     Acces.V();
  Mutex.V();                         }
  LireRessource();
  Mutex.P();
  nb_lecteurs--;
  if (nb_lecteurs == 0) Acces.V();
  Mutex.V();
}
```

> [!retenir] Le **premier** lecteur ferme la porte aux rédacteurs, le **dernier** la rouvre. Les lecteurs suivants entrent sans attendre : conforme au cours (« si le fichier est déjà en lecture, toute nouvelle lecture est honorée, même si des rédacteurs attendent »). Revers : les rédacteurs peuvent subir une **famine**.

## S'exercer

```exercice TD5 et rattrapage 2025
? TD5 ex. 2 : `mutex1 = mutex2 = 1`. P1 : `mutex1.P(); mutex2.P(); out = out + 1; n = n - 1; mutex2.V(); mutex1.V();` ; P2 : `mutex2.P(); out = out - 1; mutex2.V();` ; P3 : `mutex1.P(); n = n + 1; mutex1.V();`. La proposition est-elle valide ?
indice: Un interblocage demande une attente circulaire : P1 attend un sémaphore tenu par X, qui attend un sémaphore tenu par P1.
= **Oui, elle est valide.** `out` est toujours modifiée sous `mutex2` (P1, P2) et `n` sous `mutex1` (P1, P3) : exclusion mutuelle respectée. Pas d'interblocage possible : seul P1 prend deux sémaphores, et P2, P3 n'en prennent qu'un, donc aucune attente circulaire. Défaut mineur : P1 garde `mutex1` pendant qu'il touche `out`, ce qui retarde P3 sans nécessité. Amélioration : `mutex2.P(); out = out + 1; mutex2.V(); mutex1.P(); n = n - 1; mutex1.V();`.
  Attention : le corrigé « Rapports TD » conclut à un interblocage, ce qui est faux pour ce code.

? Rattrapage 2025 : dans la solution `Mutex.P(); nb_lecteurs++; Mutex.V(); LireRessource(donnees); Mutex.P(); nb_lecteurs--; Mutex.V();`, quel est le problème ?
= `Mutex` protège seulement le **compteur** : rien n'empêche un rédacteur d'écrire **pendant** qu'un lecteur lit. Il faut un second sémaphore `Acces` : le premier lecteur fait `Acces.P()`, le dernier `Acces.V()`, et le rédacteur encadre son écriture par `Acces.P()` / `Acces.V()` (code de l'idée 5).

? TD5 ex. 3 : tampon illimité. Adapte la solution pour bloquer les consommateurs quand le tampon est vide.
= Ajouter `Semaphore Plein = 0`. Producteur : après `Mutex.V()`, faire `Plein.V()`. Consommateur : faire `Plein.P()` **avant** `Mutex.P()`. Pour un tampon de taille Max, ajouter `Vide = Max` (producteur : `Vide.P()` avant `Mutex.P()` ; consommateur : `Vide.V()` après `Mutex.V()`).

? Laquelle est exacte ? A. Un processus peut se bloquer en libérant un sémaphore. B. Un processus peut se bloquer en demandant un sémaphore « vide » (compteur à 0). C. Un processus peut se bloquer en créant un sémaphore.
= **B.** Seul `P()` peut bloquer, quand le compteur est à 0. `V()` ne bloque jamais.
```

## Flashcards

```cartes
Section critique :: Portion de code qui manipule une ressource critique (utilisable par un seul processus à la fois).
Exclusion mutuelle :: Un seul processus à la fois dans sa section critique.
Interblocage vs famine :: Interblocage : attente circulaire, infinie. Famine : un processus est toujours doublé, attente indéfinie.
Opération P(S) :: Si compteur > 0 : compteur − 1. Sinon le processus se bloque dans la file de S.
Opération V(S) :: Si un processus attend : le réveiller. Sinon compteur + 1. Ne bloque jamais.
Mutex :: Sémaphore binaire initialisé à 1 : P(mutex) avant la section critique, V(mutex) après.
Sémaphore de synchronisation :: Initialisé à 0 : celui qui attend fait P, celui qui autorise fait V.
Producteur/consommateur, sémaphores :: Mutex = 1, Plein = 0 (messages), Vide = N (cases libres).
Ordre P dans le producteur :: Vide.P() puis Mutex.P(), sinon interblocage quand le tampon est plein.
Lecteurs/rédacteurs :: Le premier lecteur fait Acces.P(), le dernier Acces.V() ; le rédacteur encadre son écriture par Acces.P()/V().
Les 3 problèmes classiques du cours :: Section critique (exclusion mutuelle), lecteurs/rédacteurs, producteurs/consommateurs.
```

## QCM du chapitre

```qcm
? Deux processus font chacun `x = V - 1; V = x;` sur V = 10. Quelles valeurs finales sont possibles sans synchronisation ?
- 8 seulement
+ 8 ou 9
- 9 seulement
- 10
= 8 si les exécutions ne se chevauchent pas, 9 si l'un est coupé entre lecture et écriture.

? Un mutex est un sémaphore initialisé à :
- 0
+ 1
- N
= Un seul processus peut franchir P(mutex).

? Pour obliger S2 à s'exécuter après S1, on utilise un sémaphore s initialisé à 0 et :
+ P1 : S1; s.V();  P2 : s.P(); S2;
- P1 : s.P(); S1;  P2 : S2; s.V();
- P1 : S1; s.P();  P2 : s.V(); S2;
= S2 attend le signal donné après S1.

? Quelle opération peut bloquer un processus ?
+ P()
- V()
- l'initialisation
= V ne bloque jamais.

? Dans producteur/consommateur avec un tampon de N cases, Vide est initialisé à :
- 0
- 1
+ N
= Au départ, toutes les cases sont libres.

? Un producteur fait `Mutex.P(); Vide.P();` et le tampon est plein. Que se passe-t-il ?
- Rien de grave
+ Interblocage : il dort en tenant le mutex
- Le message est perdu
= Les consommateurs ne peuvent plus prendre le mutex pour libérer une case.

? Lecteurs/rédacteurs : qui peut accéder en même temps ?
+ Plusieurs lecteurs
- Un lecteur et un rédacteur
- Plusieurs rédacteurs
= Seule la lecture est partageable.

? Une attente infinie due à une attente circulaire de ressources s'appelle :
- famine
+ interblocage
- section critique
= L'attente indéfinie (on est toujours doublé) est la famine.

? Dans un graphe de préséance, S5 dépend de S2 et de S3. Le processus P5 commence par :
- un seul P()
+ deux P(), un par flèche entrante
- un V()
= Il doit attendre les deux signaux.

? Laquelle n'est pas un mécanisme de synchronisation ou de communication du cours ?
- Les sémaphores
- Les tubes
- Les files de messages
+ La pagination
= La pagination relève de la gestion mémoire.
```

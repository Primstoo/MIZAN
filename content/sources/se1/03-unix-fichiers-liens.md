---
id: unix-fichiers-liens
titre: Unix · arborescence, inodes, chemins et liens
seance: Chapitre II · Système Unix (parties 1 à 6)
importance: 5
---

## Avant de commencer

Tu sais qu'un système de fichiers organise les données en fichiers et dossiers, avec des métadonnées (chapitre 1).

```exercice Vérifie ton prérequis
? Dans le chemin `/home/etu/document.txt`, quel est le nom du fichier et dans quel dossier se trouve-t-il ?
= Le fichier s'appelle `document.txt`, il est dans le dossier `etu`, lui-même dans `home`, lui-même à la racine `/`.
```

## Comment aborder ce chapitre

> [!astuce] Sépare toujours deux choses : le **nom** d'un fichier (une entrée dans un répertoire) et le fichier **lui-même** (un inode + des données). Tout le chapitre sur les liens découle de cette séparation.

> [!piege] Croire que supprimer un fichier efface ses données. `rm` enlève **un nom**. Les données ne disparaissent que quand **plus aucun lien physique** ne pointe vers l'inode.

À la fin, tu sais citer les caractéristiques d'Unix, situer les répertoires standards, lire le type d'un fichier, écrire un chemin absolu et relatif, et prédire ce qui arrive aux liens quand on supprime la cible.

## Idée 1 · Unix en sept caractéristiques

```etapes Les caractéristiques d'Unix selon le cours
Multi-utilisateurs et multi-tâches :: alice compile pendant que bob édite et que root met à jour, en même temps.
Portable et modulaire :: réécrit en C en 1973 ; noyau, commandes et bibliothèques sont des briques séparées.
CLI et scripts :: tout se fait au clavier dans un shell, donc tout s'automatise.
Arborescence unique :: une seule racine `/` ; disques et clés USB sont **montés** dedans (`/mnt/usb`), pas de C: ni D:.
Tout est fichier :: les périphériques sont dans `/dev` (`/dev/sda`, `/dev/tty`, `/dev/null`).
Sécurité par permissions :: droits r, w, x pour le propriétaire (u), le groupe (g) et les autres (o).
Petits outils combinés :: chaque outil fait une chose bien ; on les enchaîne avec des pipes `|`.
```

Histoire : 1969 aux Bell Labs (PDP-7), réécriture en C en 1973. Deux branches : **System V** (AT&T, commerciale) et **BSD** (Berkeley, universitaire, a ajouté TCP/IP). Philosophie **KISS** : « faire une chose, et la faire bien ».

Structure d'Unix : le **noyau** (ressources), le **shell** (interprète de commandes : sh, bash, csh, zsh, fish), le **système de fichiers**, les **utilisateurs** (UID) et **processus** (PID), et les **démons**.

## Idée 2 · Les répertoires standards (FHS)

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Arborescence Unix : la racine et ses répertoires bin, etc, home, dev, tmp, usr, var">
<g font-family="monospace" font-size="14" text-anchor="middle" fill="currentColor">
<circle cx="320" cy="25" r="18" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F" stroke-width="2"/><text x="320" y="30" font-weight="700">/</text>
<text x="50" y="100">/bin</text><text x="135" y="100">/etc</text><text x="220" y="100">/home</text><text x="305" y="100">/dev</text><text x="390" y="100">/tmp</text><text x="475" y="100">/usr</text><text x="560" y="100">/var</text>
<text x="220" y="135" font-size="12">alice, bob</text><text x="135" y="135" font-size="12">passwd</text><text x="305" y="135" font-size="12">sda, tty</text>
</g>
<g stroke="currentColor" stroke-width="1.5"><line x1="320" y1="43" x2="50" y2="85"/><line x1="320" y1="43" x2="135" y2="85"/><line x1="320" y1="43" x2="220" y2="85"/><line x1="320" y1="43" x2="305" y2="85"/><line x1="320" y1="43" x2="390" y2="85"/><line x1="320" y1="43" x2="475" y2="85"/><line x1="320" y1="43" x2="560" y2="85"/></g>
</svg>
```

```html
<table>
<tr><th>Répertoire</th><th>Contenu</th></tr>
<tr><td>/bin, /sbin</td><td>exécutables essentiels (utilisateurs / système)</td></tr>
<tr><td>/boot</td><td>noyau et chargeur d'amorçage</td></tr>
<tr><td>/dev</td><td>fichiers de périphériques</td></tr>
<tr><td>/etc</td><td>configuration (passwd, group, shadow…)</td></tr>
<tr><td>/home</td><td>répertoires personnels ; /root pour l'administrateur</td></tr>
<tr><td>/proc</td><td>fichiers virtuels sur le système et les processus</td></tr>
<tr><td>/lib</td><td>bibliothèques partagées</td></tr>
<tr><td>/mnt</td><td>points de montage (clé USB, CD)</td></tr>
<tr><td>/tmp</td><td>fichiers temporaires, effacés au redémarrage</td></tr>
<tr><td>/usr</td><td>commandes utilisateurs, bibliothèques, sources</td></tr>
<tr><td>/var</td><td>données variables : journaux (logs), bases</td></tr>
</table>
```

Exemple : tu cherches la liste des comptes ? `/etc/passwd`. Les journaux d'un serveur web ? `/var/log`.

## Idée 3 · Types de fichiers et inode

Le **premier caractère** de `ls -l` donne le type :

```html
<table>
<tr><th>Car.</th><th>Type</th><th>Exemple</th></tr>
<tr><td><code>-</code></td><td>fichier régulier</td><td>rapport.txt</td></tr>
<tr><td><code>d</code></td><td>répertoire</td><td>/home</td></tr>
<tr><td><code>l</code></td><td>lien symbolique</td><td>raccourci</td></tr>
<tr><td><code>c</code></td><td>périphérique caractère (octet par octet)</td><td>/dev/tty</td></tr>
<tr><td><code>b</code></td><td>périphérique bloc</td><td>/dev/sda</td></tr>
<tr><td><code>p</code></td><td>tube nommé (FIFO)</td><td>communication entre processus</td></tr>
<tr><td><code>s</code></td><td>socket</td><td>communication réseau ou locale</td></tr>
</table>
```

L'**inode** stocke les **métadonnées**, pas le contenu ni le nom : numéro d'inode, permissions, propriétaire (UID) et groupe (GID), taille, dates (atime accès, mtime modification, ctime changement d'inode), **nombre de liens physiques**, pointeurs vers les blocs de données.

```bash nontest
ls -i fichier.txt     # numéro d'inode
ls -l fichier.txt     # type, droits, liens, propriétaire, taille, date
stat fichier.txt      # toutes les métadonnées
```

```text
131074 fichier.txt
-rw-r--r-- 1 alice alice 28 avr. 5 10:00 fichier.txt
```

*(sortie indicative : le numéro d'inode et la date changent selon la machine)*

Exemple : un fichier vide a quand même un inode (taille 0, droits, dates).

## Idée 4 · Chemin absolu, chemin relatif

```html
<svg viewBox="0 0 640 180" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Arborescence du TD1 : home contient bob et alice ; alice contient documents et images ; documents contient rapport.pdf et projet">
<g font-family="monospace" font-size="13" text-anchor="middle" fill="currentColor">
<text x="320" y="20">/home</text>
<text x="160" y="65">bob</text><text x="460" y="65">alice</text>
<text x="160" y="110">travail/stage</text><text x="160" y="150">compte_rendu.txt</text>
<rect x="335" y="95" width="110" height="24" rx="4" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F" stroke-width="2"/><text x="390" y="112">documents</text><text x="550" y="112">images</text>
<text x="340" y="160">rapport.pdf</text><text x="440" y="160">projet</text><text x="560" y="160">photo.jpg</text>
<text x="390" y="88" font-size="11" fill="#D9824F">tu es ici</text>
</g>
<g stroke="currentColor" stroke-width="1.5"><line x1="320" y1="25" x2="160" y2="52"/><line x1="320" y1="25" x2="460" y2="52"/><line x1="160" y1="70" x2="160" y2="97"/><line x1="160" y1="115" x2="160" y2="137"/><line x1="460" y1="70" x2="390" y2="95"/><line x1="460" y1="70" x2="550" y2="97"/><line x1="390" y1="119" x2="340" y2="147"/><line x1="390" y1="119" x2="440" y2="147"/><line x1="550" y1="117" x2="560" y2="147"/></g>
</svg>
```

- **Absolu** : commence par `/`, part de la racine, valable de partout. `/home/alice/documents/rapport.pdf`.
- **Relatif** : part du répertoire courant (`pwd`). `.` = ici, `..` = le parent.

```etapes Écrire un chemin relatif (exemple du TD 1)
Repère où tu es :: alice est dans /home/alice/documents.
Remonte jusqu'à l'ancêtre commun :: compte_rendu.txt est sous /home/bob, l'ancêtre commun est /home : deux remontées, `../..`.
Redescends vers la cible :: `bob/travail/stage/compte_rendu.txt`.
Assemble :: `../../bob/travail/stage/compte_rendu.txt`.
```

> [!retenir] Dans un **script** ou une tâche `cron`, utilise des chemins **absolus** : le script peut être lancé depuis n'importe où. En navigation au clavier, le relatif est plus rapide.

## Idée 5 · Lien physique et lien symbolique

```html
<svg viewBox="0 0 640 170" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Deux noms pointent vers le même inode pour le lien physique ; le lien symbolique a son propre inode qui contient un chemin">
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<rect x="20" y="25" width="140" height="34" rx="6" fill="none" stroke="currentColor"/><text x="90" y="47">fichier.txt</text>
<rect x="20" y="75" width="140" height="34" rx="6" fill="none" stroke="currentColor"/><text x="90" y="97">lien_dur</text>
<rect x="20" y="125" width="140" height="34" rx="6" fill="none" stroke="currentColor"/><text x="90" y="147">lien_symbolique</text>
<rect x="280" y="45" width="150" height="50" rx="6" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="355" y="66">inode 131074</text><text x="355" y="84" font-size="11">2 liens physiques</text>
<rect x="280" y="120" width="150" height="45" rx="6" fill="none" stroke="currentColor" stroke-dasharray="4"/><text x="355" y="140">inode 131075</text><text x="355" y="157" font-size="11">contient « fichier.txt »</text>
<rect x="510" y="45" width="110" height="50" rx="6" fill="none" stroke="currentColor"/><text x="565" y="74">données</text>
</g>
<g stroke="currentColor" stroke-width="1.8" fill="none"><line x1="160" y1="42" x2="280" y2="62"/><line x1="160" y1="92" x2="280" y2="80"/><line x1="160" y1="142" x2="280" y2="142"/><line x1="430" y1="70" x2="510" y2="70"/><path d="M355,120 Q240,110 160,46" stroke-dasharray="4"/></g>
</svg>
```

```bash nontest
echo "Contenu du fichier original" > fichier.txt
ln fichier.txt lien_dur               # lien physique
ln -s fichier.txt lien_symbolique     # lien symbolique
ls -li
```

```text
131074 -rw-r--r-- 2 alice alice 28 avr. 5 10:00 fichier.txt
131074 -rw-r--r-- 2 alice alice 28 avr. 5 10:00 lien_dur
131075 lrwxrwxrwx 1 alice alice 11 avr. 5 10:05 lien_symbolique -> fichier.txt
```

*(sortie indicative)* : même inode et compteur de liens à **2** pour le lien physique ; inode différent et type `l` pour le symbolique.

```html
<table>
<tr><th></th><th>Lien physique (<code>ln</code>)</th><th>Lien symbolique (<code>ln -s</code>)</th></tr>
<tr><td>Inode</td><td>le même</td><td>un autre</td></tr>
<tr><td>Type dans ls -l</td><td>celui de la cible</td><td><code>l</code></td></tr>
<tr><td>Cible supprimée</td><td>données intactes</td><td>lien cassé</td></tr>
<tr><td>Vers un répertoire</td><td>non (sauf <code>.</code> et <code>..</code>)</td><td>oui</td></tr>
<tr><td>Autre partition</td><td>non</td><td>oui</td></tr>
</table>
```

Exemple : `rm fichier.txt`, puis `cat lien_dur` affiche toujours le texte (le compteur passe de 2 à 1) ; `cat lien_symbolique` donne « No such file or directory ». Modifier le contenu via l'un ou l'autre lien modifie le même fichier (tant que le symbolique n'est pas cassé).

> [!attention] Le tableau de la diapo indique « taille du lien physique : 0 (pas de donnée propre) ». C'est trompeur : un lien physique n'est pas un fichier à part, c'est un nom de plus. `ls -l` affiche **la même taille** que la cible (28 octets ci-dessus). Seul le lien symbolique a sa propre taille, égale à la longueur du chemin stocké (11 pour « fichier.txt »).

Pourquoi pas de lien physique sur un répertoire ? Pour éviter des **boucles** dans l'arbre, qui casseraient `find`, `du` ou `rm -r`. Diagnostic d'un lien cassé : `file lien` répond « broken symbolic link » ; `readlink lien` affiche la cible.

## S'exercer

```exercice Exercices du TD 1
? alice est dans `/home/alice/documents`. Donne le chemin relatif de `photo.jpg`, qui est dans `/home/alice/images`.
= On remonte d'un niveau puis on entre dans images : `../images/photo.jpg`.

? Depuis `/home/alice/documents/projet`, quelle commande ramène dans `/home/alice` avec un chemin relatif ?
reponse: cd ../..
= `cd ../..` : un `..` pour documents, un second pour alice.

? On a `fichier.txt` avec 1 lien. On fait `ln fichier.txt a` puis `ln fichier.txt b`, puis `rm fichier.txt`. Quel nombre de liens affiche `ls -l a` ?
reponse: 2
= Après les deux `ln`, l'inode a 3 noms. `rm` en enlève un : il en reste **2** (a et b). Les données sont intactes.

? Que se passe-t-il si on supprime la cible d'un lien physique ? D'un lien symbolique ? (question 23 de l'examen blanc)
= Lien physique : les données restent accessibles, car elles ne sont libérées que quand le compteur de liens atteint 0. Lien symbolique : il devient cassé, car il ne contient qu'un chemin qui ne mène plus à rien.
```

## Flashcards

```cartes
Où sont les fichiers de périphériques ? :: Dans /dev (ex : /dev/sda, /dev/tty, /dev/null).
Où sont les fichiers de configuration ? :: Dans /etc (passwd, group, shadow…).
Que stocke un inode ? :: Les métadonnées : numéro, droits, UID/GID, taille, dates, nombre de liens, pointeurs vers les blocs. Pas le nom.
Type « d », « l », « b », « c » dans ls -l :: Répertoire, lien symbolique, périphérique bloc, périphérique caractère.
Chemin absolu :: Commence par /, part de la racine, indépendant du répertoire courant.
. et .. :: Le répertoire courant et le répertoire parent.
Créer un lien physique / symbolique :: ln cible nom / ln -s cible nom
Supprimer la cible d'un lien physique :: Les données restent : elles disparaissent quand le compteur de liens atteint 0.
Lien physique vers un répertoire ? :: Interdit (risque de boucles), sauf . et .. gérés par le système.
Unix et Linux :: Linux est Unix-like (non certifié) ; macOS est certifié UNIX®.
```

## QCM du chapitre

```qcm
? Où sont situés les fichiers de périphériques dans un système Unix ?
- /proc
+ /dev
- /etc
- /sys
= Question 6 de l'examen blanc. « Tout est fichier » : les périphériques sont dans /dev.

? Quelle commande crée un lien symbolique ?
- `cp -s cible lien`
+ `ln -s cible lien`
- `ln cible lien`
- `link cible lien`
= `ln` seul crée un lien physique ; `-s` le rend symbolique.

? Quelle commande affiche le numéro d'inode d'un fichier ?
- `ls -l`
+ `ls -i`
- `inode`
= `ls -i` affiche l'inode en première colonne. (`stat` l'affiche aussi, mais la réponse attendue à l'examen est `ls -i`.)

? Un fichier a 3 liens physiques. On supprime l'un des noms avec `rm`. Que deviennent les données ?
- Elles sont effacées
+ Elles restent, accessibles par les 2 autres noms
- Elles deviennent un lien cassé
= Les données ne sont libérées qu'à 0 lien.

? Dans `ls -l`, la ligne commence par `l`. C'est :
- un fichier régulier
+ un lien symbolique
- un fichier de log
= Le premier caractère indique le type : `l` = lien symbolique.

? Lequel est un chemin absolu ?
- `../bob/notes.txt`
- `docs/rapport.pdf`
+ `/etc/passwd`
- `./script.sh`
= Un chemin absolu commence toujours par `/`.

? Quelle affirmation est vraie pour un lien symbolique ?
+ Il peut pointer vers un répertoire et traverser les partitions
- Il partage l'inode de sa cible
- Il garde les données si la cible est supprimée
= Il a son propre inode et ne stocke qu'un chemin.

? Dans quel répertoire se trouvent les journaux (logs) ?
- /tmp
- /bin
+ /var
= /var contient les données variables, dont /var/log.

? Unix a été réécrit en C en :
- 1969
+ 1973
- 1991
= Écrit d'abord en assembleur (1969), réécrit en C en 1973, ce qui l'a rendu portable.

? Le répertoire `/tmp` :
+ contient des fichiers temporaires effacés au redémarrage
- contient les répertoires personnels
- contient le noyau
= Les répertoires personnels sont dans /home, le noyau dans /boot.
```

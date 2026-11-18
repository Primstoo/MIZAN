---
id: commandes-fichiers
titre: Commandes de base · utilisateurs, fichiers, éditeurs, archives
seance: Chapitre III · Commandes de base (parties 1 à 7)
importance: 5
---

## Avant de commencer

Tu dois savoir écrire un chemin absolu et un chemin relatif (chapitre 3).

```exercice Vérifie ton prérequis
? Tu es dans `/home/alice`. Que désigne `projets/rapport.pdf` en chemin absolu ?
= `/home/alice/projets/rapport.pdf`.
```

## Comment aborder ce chapitre

> [!astuce] Ne mémorise pas des listes : apprends la **forme** `commande [options] [arguments]`, puis pour chaque commande **une option clé** (`mkdir -p`, `rm -r`, `cp -r`, `useradd -m`, `usermod -aG`, `tar -czf`). L'examen demande presque toujours celles-là.

> [!piege] `usermod -G sudo alice` **remplace** tous les groupes secondaires d'alice par sudo. Pour **ajouter** sans écraser : `usermod -aG sudo alice`. C'est la question 26 de l'examen blanc.

À la fin, tu sais créer utilisateurs et groupes, créer, copier, déplacer et supprimer des fichiers, te servir de vi et nano, naviguer et chercher, afficher et comparer des fichiers, archiver et compresser.

## Idée 1 · Une commande, internes et externes

```flux Forme d'une commande
nom_commande -> options (un tiret + une lettre, accolables : -la = -l -a) -> arguments (fichiers, répertoires…)
```

- Le **prompt** : `$` (ou `%`) pour un utilisateur normal, `#` pour root.
- **Commande interne** (builtin) : exécutée par le shell lui-même, **sans processus fils**. Ex : `cd`, `echo`, `pwd`, `export`, `read`, `type`, `umask`.
- **Commande externe** : un fichier exécutable (dans `/bin`, `/usr/bin`…). Le shell crée un **processus fils** et attend sa fin.

```bash nontest
type cd       # cd is a shell builtin
type ls       # ls is /bin/ls  (ou /usr/bin/ls selon la distribution)
which ls      # /usr/bin/ls
man ls        # manuel : Espace page suivante, b page précédente, /mot chercher, q quitter
```

Pourquoi `cd` est forcément interne : s'il tournait dans un processus fils, seul le fils changerait de répertoire, et ton shell resterait au même endroit.

## Idée 2 · Utilisateurs et groupes

```html
<table>
<tr><th>But</th><th>Commande</th></tr>
<tr><td>Créer alice avec home, bash, groupe principal dev</td><td><code>useradd -m -s /bin/bash -g dev alice</code></td></tr>
<tr><td>Ajouter un groupe secondaire sans écraser</td><td><code>usermod -aG sudo alice</code></td></tr>
<tr><td>Changer le groupe principal</td><td><code>usermod -g developpeurs charlie</code></td></tr>
<tr><td>Supprimer bob et son home</td><td><code>userdel -r bob</code></td></tr>
<tr><td>Créer / renommer / supprimer un groupe</td><td><code>groupadd</code>, <code>groupmod -n dev developpeurs</code>, <code>groupdel</code></td></tr>
<tr><td>Ajouter / retirer un membre</td><td><code>gpasswd -a alice dev</code>, <code>gpasswd -d bob dev</code></td></tr>
<tr><td>Qui suis-je, mes groupes</td><td><code>whoami</code>, <code>id alice</code>, <code>groups bob</code></td></tr>
<tr><td>Qui est connecté</td><td><code>who</code>, <code>w</code></td></tr>
<tr><td>Devenir root / bob ; une commande en root</td><td><code>su</code>, <code>su - bob</code> ; <code>sudo commande</code></td></tr>
</table>
```

Ces commandes demandent les droits root (`sudo`). Sans `-m`, `useradd` ne crée **pas** de répertoire personnel ; sans `-r`, `userdel` laisse les fichiers sur le disque. Un changement de groupe ne compte qu'à la prochaine connexion (ou avec `newgrp`).

Les trois fichiers :

```html
<table>
<tr><th>Fichier</th><th>Format</th></tr>
<tr><td>/etc/passwd</td><td><code>nom:x:UID:GID:commentaire:home:shell</code> (x = mot de passe dans shadow)</td></tr>
<tr><td>/etc/shadow</td><td><code>nom:hash_mdp:dernier_chgt:…</code>, lisible par root seulement</td></tr>
<tr><td>/etc/group</td><td><code>nom:x:GID:liste_membres</code></td></tr>
</table>
```

Ne les édite jamais à la main : utilise `vipw`, `vigr`, `vipw -s` (verrouillage et vérification), et `visudo` pour `/etc/sudoers`.

Exemple chiffré : la ligne `alice:x:1001:1001::/home/alice:/bin/bash` donne UID 1001, home `/home/alice`, shell bash. `cut -d: -f1 /etc/passwd` liste les noms (champ 1).

## Idée 3 · Créer, copier, déplacer, supprimer

```html
<table>
<tr><th>Action</th><th>Commande</th><th>À savoir</th></tr>
<tr><td>Fichier vide</td><td><code>touch f.txt</code></td><td>met aussi à jour la date s'il existe</td></tr>
<tr><td>Répertoire(s)</td><td><code>mkdir -p a/b/c</code></td><td>-p crée les parents manquants</td></tr>
<tr><td>Supprimer un répertoire vide</td><td><code>rmdir rep</code></td><td>échoue s'il n'est pas vide</td></tr>
<tr><td>Supprimer un répertoire plein</td><td><code>rm -r rep</code></td><td>irréversible, pas de corbeille</td></tr>
<tr><td>Renommer / déplacer</td><td><code>mv ancien nouveau</code></td><td>écrase sans prévenir (sauf -i)</td></tr>
<tr><td>Copier un répertoire</td><td><code>cp -r src/ dest/</code></td><td>sans -r, cp refuse</td></tr>
<tr><td>Copie fidèle (sauvegarde)</td><td><code>cp -a /etc /backup/</code></td><td>garde droits, dates, propriétaire</td></tr>
</table>
```

Options communes : `-i` (demande confirmation), `-r` (récursif), `-f` (force, sans question), `-v` (affiche chaque action). `rm -rf` cumule récursif et forcé : dangereux.

```etapes Construire l'arborescence du TD 2
Créer td2 et entrer dedans :: `mkdir ~/td2` puis `cd ~/td2`.
Trois répertoires d'un coup :: `mkdir projet1 projet2 archives`.
Sous-répertoires :: `mkdir projet1/src projet1/docs projet1/temp projet2/data` (ou `mkdir -p` si les parents manquent).
Fichiers :: `touch projet1/src/main.c` et `echo "Ce projet concerne la gestion de l'arborescence sous UNIX." > projet1/docs/rapport.txt`.
Vérifier sans se déplacer :: `ls projet1/docs`, ou `tree .` / `find .` pour tout voir.
Supprimer le vide :: `rmdir projet1/temp`.
```

## Idée 4 · vi/vim et nano

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Les trois modes de vi : commande au centre, insertion avec i a o, ligne de commande avec deux-points, retour par Échap">
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="245" y="45" width="150" height="50" rx="10" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="320" y="68" font-weight="700">Mode commande</text><text x="320" y="86" font-size="11">(au démarrage)</text>
<rect x="20" y="45" width="150" height="50" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="95" y="75">Mode insertion</text>
<rect x="470" y="45" width="150" height="50" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="545" y="75">Ligne de commande</text>
<text x="207" y="38" font-size="12">i, a, o</text><text x="207" y="120" font-size="12">Échap</text>
<text x="432" y="38" font-size="12">:</text><text x="432" y="120" font-size="12">Entrée / Échap</text>
<text x="545" y="140" font-size="12">:w  :q  :wq  :x  :q!</text>
</g>
<g stroke="currentColor" stroke-width="1.8"><line x1="245" y1="60" x2="170" y2="60"/><line x1="170" y1="82" x2="245" y2="82"/><line x1="395" y1="60" x2="470" y2="60"/><line x1="470" y1="82" x2="395" y2="82"/></g>
</svg>
```

- **vi** : navigation `h j k l`, `w`/`b` (mot suivant/précédent), `0`/`$` (début/fin de ligne) ; `x` efface un caractère, `dd` une ligne. `:w` sauvegarde, `:q` quitte (refuse s'il reste des modifications), `:wq` ou `:x` les deux, `:q!` quitte sans sauvegarder.
- **nano** : pas de modes. `Ctrl+O` sauvegarder, `Ctrl+X` quitter, `Ctrl+K` couper la ligne, `Ctrl+U` coller, `Ctrl+W` chercher.
- gedit, Kate, VS Code : confortables, mais absents sur un serveur en SSH.

Exemple du TP 1 : remplacer tous les `true` par `false` dans vim : `:%s/true/false/g`. Changer le port sans ouvrir d'éditeur : `sed -i 's/PORT=8080/PORT=3000/' config.txt`.

> [!attention] La commande de substitution `:%s/…/…/g` n'est pas écrite dans les diapos, mais le TP 1 la demande. C'est la syntaxe standard de vim.

## Idée 5 · Naviguer, chercher, lire

- `pwd` : chemin absolu du répertoire courant. `cd` seul ou `cd ~` : home ; `cd ..` : parent ; `cd -` : répertoire précédent.
- `ls -l` (détails), `-a` (cachés), `-h` (tailles lisibles), `-R` (récursif), `-t` (par date), `-S` (par taille), `-r` (inverse). `ls -ltr` : du plus ancien au plus récent.
- `find [chemin] [critères]` : `-name "*.log"`, `-iname`, `-type f|d|l`, `-mtime -7` (modifié il y a moins de 7 jours), `-size +100M`.
- `cat` (tout), `head` / `tail` (10 lignes par défaut, `-n N`), `tail -f` (suivre en temps réel), `less` (pages, retour arrière, `/motif`, `q`), `more` (sans retour arrière).
- `diff -u` (fichiers texte, ligne à ligne), `cmp` (octet par octet, binaires).
- `wc` : lignes `-l`, mots `-w`, octets `-c`. `sort` : `-n` numérique, `-r` inverse, `-u` sans doublons, `-k 2` par colonne. `split -l 1000` (morceaux xaa, xab…), `paste` (colle côte à côte), `join` (jointure sur une clé, fichiers **triés**).

```bash nontest
find /home -name "*.log"
find . -type d -name "cache"
tail -n 5 -f data.csv        # les 5 dernières lignes, puis la suite en temps réel
```

## Idée 6 · Archiver et compresser

```html
<table>
<tr><th>Extension</th><th>Ce que c'est</th><th>Créer</th><th>Ouvrir</th></tr>
<tr><td>.gz</td><td>un fichier compressé</td><td><code>gzip f</code> (supprime f)</td><td><code>gunzip f.gz</code>, lire : <code>zcat</code></td></tr>
<tr><td>.tar</td><td>une archive, sans compression</td><td><code>tar -cf a.tar rep/</code></td><td><code>tar -xf a.tar</code></td></tr>
<tr><td>.tar.gz</td><td>archive + gzip</td><td><code>tar -czf a.tar.gz rep/</code></td><td><code>tar -xzf a.tar.gz</code></td></tr>
<tr><td>.tar.bz2 / .tar.xz</td><td>archive + bzip2 / xz</td><td><code>tar -cjf</code> / <code>tar -cJf</code></td><td><code>-xjf</code> / <code>-xJf</code></td></tr>
<tr><td>.zip</td><td>archive + compression, portable Windows</td><td><code>zip -r a.zip rep/</code></td><td><code>unzip a.zip -d dest/</code>, lister : <code>unzip -l</code></td></tr>
</table>
```

Mnémonique tar : **c** create, **x** extract, **t** list, **v** verbose, **f** fichier (suivi du nom de l'archive), **z** gzip, **j** bzip2, **J** xz. `-C dossier` extrait ailleurs.

Exemple (question 29 de l'examen) : `tar -czf logs.tar.gz /var/log`.

> [!piege] `gzip repertoire/` ne marche pas : gzip compresse **un seul fichier**. Pour un répertoire, on passe par tar (`-z`).

## S'exercer

```exercice Exercices du TD 1, du TD 2 et de l'examen
? Crée l'utilisateur dev1 avec un répertoire personnel, le shell /bin/bash et le groupe principal dev (question 25).
= `sudo useradd -m -s /bin/bash -g dev dev1`

? Crée bob avec developpeurs comme groupe principal et testeurs comme groupe secondaire (TD 1).
= `sudo useradd -m -g developpeurs -G testeurs bob`. `-g` = principal, `-G` = secondaires. Vérification : `id bob` ou `groups bob`.

? Différence entre `rmdir` et `rm -r` (question 27) ?
= `rmdir` ne supprime qu'un répertoire **vide**. `rm -r` supprime un répertoire et tout son contenu, récursivement.

? Crée une archive compressée td2_backup.tar.gz de tout td2/, puis liste son contenu sans l'extraire.
= `tar -czvf td2_backup.tar.gz td2/` puis `tar -tzvf td2_backup.tar.gz`.

? Liste les noms des utilisateurs dont le home est dans /home (TD 1).
= `grep '/home' /etc/passwd | cut -d: -f1`. grep garde les lignes, cut prend le champ 1 (séparateur `:`).
```

> [!attention] Dans la correction du TD 2 (exercice 2, question 9), `rm -f projet1/temp` est proposé pour supprimer un répertoire. Ça échoue : `rm` sans `-r` refuse les répertoires (« est un dossier »). Il faut `rmdir projet1/temp` (s'il est vide) ou `rm -r`.

## Flashcards

```cartes
Commande interne ou externe ? :: Interne (builtin) : exécutée par le shell, sans processus fils (cd, echo). Externe : un exécutable, le shell crée un fils (ls, cp).
Savoir si une commande est interne :: type cd → « cd is a shell builtin ».
Créer un utilisateur avec home et shell :: useradd -m -s /bin/bash -g groupe nom
Ajouter un groupe secondaire sans écraser :: usermod -aG groupe nom
Format de /etc/passwd :: nom:x:UID:GID:commentaire:home:shell
Créer une arborescence complète :: mkdir -p a/b/c
Quitter vi sans sauvegarder :: :q!
Sauvegarder et quitter vi :: :wq ou :x
Archiver et compresser un répertoire :: tar -czf archive.tar.gz rep/
Lister une archive sans l'extraire :: tar -tzf archive.tar.gz (zip : unzip -l)
```

## QCM du chapitre

```qcm
? Pour archiver et compresser un répertoire en une seule commande, on utilise :
- `gzip repertoire/`
+ `tar -czf archive.tar.gz repertoire/`
- `zip -r archive.tar.gz repertoire/`
- `tar -cf archive.tar.gz repertoire/`
= Question 12 de l'examen blanc. Sans `z`, tar ne compresse pas, même si le nom finit par .gz.

? Quel fichier contient UID, répertoire personnel et shell des utilisateurs ?
+ /etc/passwd
- /etc/shadow
- /etc/group
- /etc/users
= /etc/shadow contient les mots de passe chiffrés ; /etc/users n'existe pas.

? Quelle commande affiche les 5 dernières lignes de log.txt ?
- `head -5 log.txt`
+ `tail -n 5 log.txt`
- `less -5 log.txt`
- `cat log.txt | wc -l 5`
= `tail` = la fin ; `head` = le début.

? Que fait `useradd alice` sans option ?
+ Crée le compte sans répertoire personnel
- Crée le compte avec /home/alice
- Échoue toujours
= Il faut `-m` pour créer le home.

? `cd` est une commande interne parce que :
- elle est trop courte pour être un fichier
+ un processus fils ne pourrait pas changer le répertoire du shell parent
- elle est dans /bin
= Le répertoire courant appartient au processus shell : seul lui peut le changer.

? Dans vi, quelle commande quitte sans sauvegarder ?
- `:wq`
- `:w`
+ `:q!`
= `:q` refuse s'il y a des modifications ; `!` force.

? Quelle commande ramène au répertoire précédent ?
- `cd ..`
+ `cd -`
- `cd ~`
= `cd ..` va au parent, `cd ~` au home.

? Que fait `mv rapport_v1.pdf rapport.pdf` ?
+ Renomme le fichier
- Copie le fichier
- Crée un lien
= mv renomme ou déplace ; il écrase rapport.pdf s'il existe déjà.

? Avec tar, l'option `t` sert à :
- compresser avec gzip
+ lister le contenu
- extraire
= c = créer, x = extraire, t = lister, z = gzip.

? Quelle commande trouve les fichiers modifiés il y a moins de 7 jours ?
- `find . -size -7`
+ `find . -mtime -7`
- `ls -t 7`
= `-mtime -7` : modifié il y a moins de 7 jours.
```

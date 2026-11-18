---
id: droits-acces
titre: Droits d'accès · chmod, chown, umask
seance: Chapitre III · Commandes de base (partie 8)
importance: 5
---

## Avant de commencer

Tu dois savoir lire la première colonne de `ls -l` (type de fichier, chapitre 3).

```exercice Vérifie ton prérequis
? Dans `-rwxr-xr-- 1 alice dev 1024 script.sh`, quel est le type du fichier, son propriétaire et son groupe ?
= Type `-` : fichier régulier. Propriétaire : alice. Groupe : dev.
```

## Comment aborder ce chapitre

> [!astuce] Découpe toujours les 9 caractères en **trois paquets de trois** : propriétaire, groupe, autres. Chaque paquet vaut un chiffre : r = 4, w = 2, x = 1.

> [!piege] Penser qu'un répertoire se lit avec `r` seul. Sur un **répertoire**, `x` veut dire « traverser / entrer » (`cd`). Sans `x`, même avec `r`, tu ne peux pas accéder aux fichiers qu'il contient.

À la fin, tu sais lire et écrire des droits en notation symbolique et octale, changer propriétaire et groupe, et calculer les droits par défaut avec umask.

## Idée 1 · Trois catégories, trois droits

```html
<svg viewBox="0 0 640 140" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Découpage de -rwxr-xr-- : type, propriétaire rwx 7, groupe r-x 5, autres r-- 4">
<g font-family="monospace" font-size="22" text-anchor="middle" fill="currentColor">
<rect x="20" y="20" width="50" height="45" rx="6" fill="none" stroke="currentColor"/><text x="45" y="50">-</text>
<rect x="90" y="20" width="150" height="45" rx="6" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="165" y="50">rwx</text>
<rect x="260" y="20" width="150" height="45" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="335" y="50">r-x</text>
<rect x="430" y="20" width="150" height="45" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="505" y="50">r--</text>
</g>
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<text x="45" y="90">type</text><text x="165" y="90">u (propriétaire)</text><text x="335" y="90">g (groupe)</text><text x="505" y="90">o (autres)</text>
<text x="165" y="120" fill="#D9824F" font-size="16">4+2+1 = 7</text><text x="335" y="120" font-size="16">4+0+1 = 5</text><text x="505" y="120" font-size="16">4+0+0 = 4</text>
</g>
</svg>
```

```html
<table>
<tr><th>Droit</th><th>Sur un fichier</th><th>Sur un répertoire</th><th>Valeur</th></tr>
<tr><td>r</td><td>lire</td><td>lister le contenu</td><td>4</td></tr>
<tr><td>w</td><td>modifier</td><td>créer / supprimer des fichiers dedans</td><td>2</td></tr>
<tr><td>x</td><td>exécuter</td><td>traverser (entrer avec cd)</td><td>1</td></tr>
</table>
```

Exemple : `-rwxr-xr--` = 754.

## Idée 2 · chmod symbolique et octal

```etapes Passer d'une consigne aux droits (TD 2, exercice 4)
Lis la consigne par catégorie :: propriétaire lecture-écriture-exécution, groupe lecture-exécution, autres lecture.
Écris en symbolique :: `chmod u=rwx,g=rx,o=r main.c`.
Convertis chaque paquet :: rwx = 7, r-x = 5, r-- = 4.
Écris en octal :: `chmod 754 main.c`.
Vérifie :: `ls -l main.c` doit afficher `-rwxr-xr--`.
```

- Symbolique : qui (`u`, `g`, `o`, `a` = tous), opération (`+` ajoute, `-` retire, `=` fixe exactement), droits. `chmod u+x script.sh`, `chmod go-w f`, `chmod a=r f`.
- Octal : `755` = rwxr-xr-x (scripts, répertoires), `644` = rw-r--r--, `600` = rw------- (privé, clés SSH), `640` = rw-r-----, `770` = rwxrwx---.

> [!attention] La diapo décrit 644 comme « fichier lisible/éditable par le propriétaire seulement ». En réalité 644 = rw-r--r-- : **seul le propriétaire écrit, mais tout le monde lit**. Le fichier « privé », c'est 600.

> [!piege] `chmod u+rw,go+r f` n'est pas toujours égal à `chmod 644 f` : `+` **ajoute** sans retirer. Si le fichier avait déjà `x` ou un `w` pour le groupe, il le garde. Pour imposer exactement rw-r--r--, utilise `=` (`u=rw,go=r`) ou l'octal.

## Idée 3 · chown et chgrp

```bash nontest
sudo chown alice rapport.pdf          # propriétaire
sudo chgrp dev script.sh              # groupe
sudo chown alice:dev script.sh        # les deux
sudo chown :dev fichier               # seulement le groupe
sudo chown -R alice:dev /home/alice/projet   # récursif
```

Changer le propriétaire demande root. Un utilisateur peut changer le groupe d'un de ses fichiers vers un groupe dont il est membre.

## Idée 4 · umask, les droits par défaut

`umask` dit quels droits **retirer** à la création. Base : **666** pour un fichier (jamais de `x` par défaut), **777** pour un répertoire.

Exemple chiffré avec umask 022 : fichier 666 − 022 = **644** (rw-r--r--), répertoire 777 − 022 = **755**. Avec umask 007 : fichiers 660, répertoires 770.

> [!attention] Le cours présente le calcul comme une soustraction. Ça marche pour 022 et 007, mais le vrai calcul retire des **bits** : droits = base ET (NON umask). Avec umask 033, la soustraction donnerait 666 − 033 = 633, alors que bash crée réellement des fichiers en **644** (vérifié). Méthode sûre : pour chaque chiffre, enlève les droits présents dans le umask, sans jamais descendre « sous » zéro bit.

## S'exercer

```exercice TD 1, TD 2 et examen blanc
? Que signifie `chmod 640 fichier.txt` ? (question 30)
= Propriétaire rw- (6), groupe r-- (4), autres --- (0) : `-rw-r-----`.

? Rends `docs/` accessible uniquement à son propriétaire et au groupe developpeurs, avec tous les droits pour eux.
reponse: chmod 770 docs
= `chmod 770 docs` : rwx pour u et g, rien pour o.

? Avec umask 027, quels droits aura un nouveau fichier ? (en octal)
reponse: 640
= Base 666. On retire 0 au propriétaire (rw-), 2 au groupe (r--), 7 aux autres (---) : **640**.

? Tous les fichiers de src/ doivent être lisibles par tous et exécutables uniquement par le propriétaire. Quelle commande ?
= `chmod 744 projet-web/src/*` (rwxr--r--).
```

> [!attention] La correction du TD 1 (exercice 5, question 6) donne `chmod 644`, puis écrit « si on voulait autoriser l'exécution par le propriétaire, on mettrait 744, mais ici ce n'est pas demandé ». Or l'énoncé le demande bien (« exécutables uniquement par le propriétaire »). La bonne réponse est **744**.

## Flashcards

```cartes
Valeurs de r, w, x :: r = 4, w = 2, x = 1. On additionne par catégorie.
755 en lettres :: rwxr-xr-x
644 en lettres :: rw-r--r-- (le propriétaire écrit, tout le monde lit)
640 en lettres :: rw-r-----
x sur un répertoire :: Le droit de le traverser (y entrer, accéder aux fichiers).
Différence + et = dans chmod :: + ajoute sans retirer ; = fixe exactement les droits.
Changer propriétaire et groupe :: chown alice:dev fichier (-R pour récursif)
umask 022 :: Fichiers 644, répertoires 755.
Base de calcul umask :: 666 pour un fichier, 777 pour un répertoire.
```

## QCM du chapitre

```qcm
? Que signifie `chmod 640 fichier.txt` ?
+ Propriétaire rw-, groupe r--, autres ---
- Propriétaire rwx, groupe r--, autres ---
- Propriétaire r--, groupe rw-, autres ---
= 6 = 4+2 (rw), 4 = r, 0 = rien.

? Les droits `rwxr-xr-x` valent en octal :
- 644
+ 755
- 775
= 7, 5, 5.

? Avec umask 022, un fichier créé a les droits :
+ 644
- 755
- 666
= 666 − 022 = 644. Le 755 concerne les répertoires.

? Sur un répertoire, le droit `x` permet :
- d'exécuter tous les fichiers dedans
+ d'y entrer et d'accéder à son contenu
- de le supprimer
= C'est le droit de traversée.

? Quelle commande retire l'écriture au groupe et aux autres ?
- `chmod go+w f`
+ `chmod go-w f`
- `chmod a=w f`
= `-` retire.

? Quelle commande rend `script.sh` exécutable pour tout le monde ?
+ `chmod a+x script.sh`
- `chmod u+x script.sh`
- `chmod 644 script.sh`
= `a` = all (u, g et o).

? `chown :dev fichier` :
- change le propriétaire en dev
+ change seulement le groupe en dev
- supprime le groupe
= Rien avant les deux-points : le propriétaire ne change pas.

? Pourquoi éviter `chmod 777` en production ?
+ Tout le monde peut lire, modifier et exécuter le fichier
- Le fichier devient invisible
- Le fichier n'est plus exécutable
= C'est un risque de sécurité majeur sur une machine partagée.

? Un fichier privé (clé SSH) doit avoir :
- 644
- 755
+ 600
= Lecture-écriture pour le propriétaire, rien pour les autres.

? Avec umask 077, un nouveau répertoire a :
- 777
+ 700
- 755
= 777 sans les bits de 077 : rwx------.
```

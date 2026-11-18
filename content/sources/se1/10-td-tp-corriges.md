---
id: td-tp-corriges
titre: TD 1 à 5 et TP 1 à 4 corrigés
seance: Séries de TD et de TP du Pr El Amrani
importance: 4
---

## Avant de commencer

Ce chapitre suppose les chapitres 3 à 9 lus. Il reprend les exercices types des séries, avec une correction vérifiée.

```exercice Vérifie ton prérequis
? Sans regarder : quelle commande crée `a/b/c` d'un coup, même si `a` n'existe pas ?
reponse: mkdir -p a/b/c
= `mkdir -p a/b/c`.
```

## Comment aborder ce chapitre

> [!astuce] Fais chaque exercice **dans un vrai terminal** avant d'ouvrir le corrigé. En TP, le prof relève le compte rendu sur Google Classroom : il veut les commandes **et** la sortie obtenue.

> [!piege] Recopier une correction sans la tester. Plusieurs corrections des séries contiennent des erreurs (signalées plus bas) : ta machine est le seul juge.

À la fin, tu as refait les exercices types de chaque série et tu connais les pièges des corrections.

## Idée 1 · Carte des séries

```html
<table>
<tr><th>Série</th><th>Contenu</th><th>Chapitre</th></tr>
<tr><td>TD 1 / TP 1</td><td>chemins, liens, regex, utilisateurs et groupes, droits d'un projet, vi</td><td>3, 4, 5, 6</td></tr>
<tr><td>TD 2 / TP 2</td><td>arborescence, fichiers, tar/gzip/zip, chmod, umask</td><td>5, 6</td></tr>
<tr><td>TD 3 / TP 3</td><td>redirections, filtres (cut, grep, awk, sed, sort), processus et jobs</td><td>7</td></tr>
<tr><td>TD 4 / TP 4</td><td>calculatrice, paramètres spéciaux, if, case, boucles</td><td>8, 9</td></tr>
<tr><td>TD 5 / TP 4</td><td>tableaux, fonctions itératives et récursives</td><td>9</td></tr>
</table>
```

## Idée 2 · Les erreurs relevées dans les corrections

```etapes Ce qu'il faut corriger dans les corrigés distribués
TD 1, ex. 3, q. 1 :: `ls rapport_*.txt` ne liste pas rapport_2022 (c'est un .bak). Résultat : 4 fichiers.
TD 1, ex. 5, q. 4 :: `chmod u+rw,go+r` ajoute sans retirer : il n'est équivalent à 644 que si le fichier n'avait pas d'autres droits. Préférer `u=rw,go=r`.
TD 1, ex. 5, q. 6 :: l'énoncé demande l'exécution pour le propriétaire : `chmod 744`, pas 644.
TD 2, ex. 2, q. 9 :: `rm -f projet1/temp` échoue sur un répertoire : `rmdir` ou `rm -r`.
TD 3, ex. 2, q. 7 :: la correction parle de `gsub` (awk) alors que la commande montrée est `sed 's/ /_/g'`. La commande sed est la bonne réponse.
TD 5, ex. 3 :: le compteur d'appels de fibonacci affiche 0, pas 25 (incrément perdu dans les sous-shells `$( )`).
Examen blanc, q. 35 :: `for ligne in $(head -n 3 f)` parcourt des **mots**, pas des lignes (voir chapitre suivant).
```

## S'exercer

```exercice TD 1 · liens (exercice 2)
? Après `echo "Contenu" > fichier.txt ; ln fichier.txt lien_dur ; ln -s fichier.txt lien_symbolique`, on fait `echo "nouveau" > lien_dur`. Que contient fichier.txt ?
= « nouveau » : lien_dur et fichier.txt sont deux noms du même inode, donc du même contenu.

? Puis `rm fichier.txt`. Que donnent `cat lien_dur` et `cat lien_symbolique` ?
= `cat lien_dur` affiche « nouveau » (les données ont encore un lien). `cat lien_symbolique` : « No such file or directory », le lien est cassé.
```

```exercice TD 2 · fichiers et archives
? Déplace `projet1/docs/rapport.txt` dans `archives/` en le renommant `rapport_projet1.txt`.
= `mv projet1/docs/rapport.txt archives/rapport_projet1.txt` (un seul mv déplace et renomme).

? Écris dans `projet1/notes.txt` deux lignes en une seule commande.
= Avec un here document : `cat > projet1/notes.txt << EOF`, puis les deux lignes, puis `EOF`. Ou `printf "Projet en cours\nDernière mise à jour : 2025-12-05\n" > projet1/notes.txt`.

? Affiche les lignes de log.txt contenant [ERROR] ou [WARNING].
= `grep "\[ERROR\]\|\[WARNING\]" projet1/log.txt` (les crochets sont échappés car ce sont des métacaractères ; `\|` est le « ou » de grep GNU). Ou `grep -E "\[(ERROR|WARNING)\]"`.

? Crée logs.zip avec log.txt et notes.txt, liste-le, puis extrais-le dans archives/.
= `zip logs.zip projet1/log.txt projet1/notes.txt`, puis `unzip -l logs.zip`, puis `unzip logs.zip -d archives/`.
```

```exercice TD 3 · redirections et filtres
? Compte les lignes de donnees.txt (7 noms) et ne garde que le nombre dans comptage.txt.
reponse: 7
= `wc -l < donnees.txt > comptage.txt`. Le fichier contient **7** (sans le nom du fichier, grâce à `<`).

? Combien de noms uniques après `sort -u donnees.txt` (Alice, Bob, Charlie, Alice, David, Bob, Eve) ?
reponse: 5
= Alice, Bob, Charlie, David, Eve : **5**.

? Âge moyen (entier) des informaticiens du CSV : Dupont 34, Lefevre 45, Durand 37 ?
reponse: 38
= `grep ",Informatique," utilisateurs.csv | awk -F',' '{s += $3 ; n++} END {print int(s/n)}'` : 116 / 3 = 38,67, donc **38**.

? Lance `sleep 120 &`. Que signifie `[1] 12345` ?
= `[1]` : numéro de job dans ce shell. `12345` : PID du processus (il change à chaque fois).
```

```exercice TD 4, TD 5 et TP 4 · scripts
? Dans la calculatrice du TD 4, comment vérifier qu'une saisie est un entier (éventuellement négatif) ?
= `if ! [[ "$a" =~ ^-?[0-9]+$ ]] ; then echo "pas un entier" ; exit 1 ; fi`. `[[ … =~ … ]]` compare à une regex ERE (bash).

? Que donne la calculatrice pour 15 / 4 ?
reponse: 3
= **3** : la division du shell est entière.

? Écris la factorielle itérative du TD 5.
= `factorielle () { local n=$1 ; local r=1 ; for ((i=1; i<=n; i++)) ; do r=$((r * i)) ; done ; echo $r ; }` puis `f=$(factorielle 5)` donne 120.

? Version récursive ?
= `fact () { if (( $1 == 0 )) ; then echo 1 ; return ; fi ; local p=$(fact $(( $1 - 1 ))) ; echo $(( $1 * p )) ; }`. `fact 6` donne 720.
```

```exercice TP 1 · éditeur vi
? Dans config.txt ouvert avec vim, remplace tous les « true » par « false », puis enregistre et quitte.
= `:%s/true/false/g` puis `:wq`.

? Sans éditeur, change PORT=8080 en PORT=3000.
= `sed -i 's/PORT=8080/PORT=3000/' config.txt`.
```

## Flashcards

```cartes
Déplacer et renommer en une commande :: mv source dossier/nouveau_nom
Compter les lignes sans afficher le nom du fichier :: wc -l < fichier
Trier en supprimant les doublons :: sort -u fichier
Mettre en majuscules :: tr 'a-z' 'A-Z' < fichier
Moyenne avec awk :: awk -F',' '{s+=$3; n++} END {print s/n}' f
Tester qu'une saisie est un entier (bash) :: [[ "$a" =~ ^-?[0-9]+$ ]]
Lister un zip sans l'extraire :: unzip -l archive.zip
Extraire un zip ailleurs :: unzip archive.zip -d dossier/
```

## QCM du chapitre

```qcm
? `ls rapport_*.txt` parmi rapport_2020.txt, rapport_2022.bak, rapport_final.txt, backup.rapport liste :
+ rapport_2020.txt et rapport_final.txt
- les quatre fichiers
- rapport_2020.txt, rapport_2022.bak et rapport_final.txt
= Le nom doit commencer par « rapport_ » et finir par « .txt ».

? Les fichiers de src/ doivent être lisibles par tous et exécutables par le propriétaire seul :
- `chmod 644`
+ `chmod 744`
- `chmod 755`
= rwxr--r--. 755 donnerait aussi l'exécution au groupe et aux autres.

? Quelle commande supprime le répertoire vide temp ?
- `rm -f temp`
+ `rmdir temp`
- `rm temp`
= `rm` sans `-r` refuse les répertoires.

? `wc -l < donnees.txt` affiche :
+ seulement le nombre de lignes
- le nombre suivi du nom du fichier
- le contenu du fichier
= Avec `<`, wc ne connaît pas le nom du fichier.

? Combien vaut `$((15 / 4))` ?
- 3,75
+ 3
- 4
= Division entière.

? Dans le TD 5, pourquoi le compteur de fibonacci reste à 0 ?
+ Chaque appel `$(fibonacci …)` tourne dans un sous-shell
- `local` remet le compteur à 0
- La récursion n'est pas permise en bash
= Les modifications d'un sous-shell ne remontent jamais au shell père.

? `kill %1` envoie :
+ SIGTERM au job numéro 1
- SIGKILL au PID 1
- un signal au processus systemd
= `%1` désigne un job du shell ; le signal par défaut est SIGTERM (15).

? Pour ramener le job 2 au premier plan :
- `bg %2`
+ `fg %2`
- `jobs 2`
= fg = foreground.

? `unzip logs.zip -d archives/` :
+ extrait le contenu de logs.zip dans archives/
- supprime logs.zip
- liste le contenu
= `-d` précise le dossier de destination ; `-l` liste.

? Dans le TP 1, `:%s/true/false/g` dans vim :
+ remplace toutes les occurrences dans tout le fichier
- remplace seulement la première ligne
- supprime les lignes contenant true
= `%` = toutes les lignes, `g` = toutes les occurrences de chaque ligne.
```

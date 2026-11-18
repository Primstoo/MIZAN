---
id: shell-controle
titre: Shell (2) · tests, if, case, boucles, fonctions, tableaux
seance: Chapitre IV · Programmation shell (parties 6 à 10)
importance: 5
---

## Avant de commencer

Tu dois savoir qu'une commande renvoie un **code retour** dans `$?`, 0 voulant dire succès (chapitre 8).

```exercice Vérifie ton prérequis
? Après `ls /dossier_qui_nexiste_pas`, que vaut `$?` : 0 ou autre chose ?
= Autre chose (2 sous Linux) : la commande a échoué. Seul 0 signifie succès.
```

## Comment aborder ce chapitre

> [!astuce] En shell, une condition n'est pas un booléen : c'est **une commande qui réussit (0) ou échoue**. `if`, `while` et `until` exécutent une commande et regardent son code retour. `[ … ]` n'est qu'une commande parmi d'autres (`test`).

> [!piege] Oublier les espaces dans les crochets. `[$a -eq 5]` est une erreur ; on écrit `[ $a -eq 5 ]`, avec un espace après `[`, avant `]` et autour de l'opérateur.

À la fin, tu sais écrire des tests sur fichiers, chaînes et nombres, des `if` / `case`, des boucles `for`, `while`, `until`, `select`, des fonctions avec `return` et `local`, et manipuler un tableau.

## Idée 1 · La commande test

`test expr` ou `[ expr ]` renvoie 0 si c'est vrai, autre chose sinon.

```html
<table>
<tr><th>Fichiers</th><th>Chaînes</th><th>Nombres</th></tr>
<tr><td><code>-a f</code> existe (<code>-e</code> aussi)<br><code>-f f</code> fichier ordinaire<br><code>-d f</code> répertoire<br><code>-L f</code> lien symbolique<br><code>-s f</code> taille non nulle<br><code>-r -w -x f</code> droits</td>
<td><code>s1 = s2</code> égales<br><code>s1 != s2</code> différentes<br><code>-z s</code> vide<br><code>-n s</code> non vide<br><code>s1 \&lt; s2</code> ordre</td>
<td><code>-eq</code> égal<br><code>-ne</code> différent<br><code>-lt</code> &lt;<br><code>-le</code> ≤<br><code>-gt</code> &gt;<br><code>-ge</code> ≥</td></tr>
</table>
```

Logique : `-a` (et), `-o` (ou), `!` (non) à l'intérieur des crochets. Exemple : `val=53 ; [ $val -gt 10 -a $val -lt 100 ] ; echo $?` affiche **0** (vrai).

> [!retenir] Mets les variables **entre guillemets** : `[ "$x" = oui ]`. Si x est vide, `[ $x = oui ]` devient `[ = oui ]` et bash répond « unary operator expected » (vérifié, code 2). Avec les guillemets, on compare proprement `""` à `oui` (code 1, faux).

> [!attention] Le cours dit que `test` est une commande externe. Dans bash, `type test` répond « test is a shell builtin » : c'est une commande **interne** (il existe aussi un exécutable `/usr/bin/test`, mais bash utilise sa version intégrée).

## Idée 2 · if et case

```flux if … elif … else
if [ cond1 ] -> then instructions1 -> elif [ cond2 ] -> then instructions2 -> else instructions3 -> fi
```

Si `if` et `then` sont sur la même ligne, il faut un `;` : `if [ -d "$1" ]; then`. Forme courte : `cmd1 && cmd2` (si cmd1 réussit), `cmd1 || cmd2` (si elle échoue), par exemple `cat main.c || touch main.c`.

Exemple du cours (exercice 5), type d'un fichier passé en argument :

```bash nontest
#!/bin/bash
if test -d "$1"
then echo "c'est un répertoire"
elif test -L "$1"
then echo "c'est un lien symbolique"
else echo "c'est un fichier ordinaire"
fi
```

**case** compare une valeur (comme chaîne) à des motifs shell (`*`, `?`, `[ ]`, alternatives avec `|`). Chaque cas finit par `;;`, le cas par défaut est `*)` en dernier, la fin est `esac`.

```bash nontest
case "$op" in
  "+") r=$((a + b)) ;;
  "-") r=$((a - b)) ;;
  "*") r=$((a * b)) ;;
  "/"|"%") [ "$b" -eq 0 ] && { echo "division par zéro" ; exit 1 ; } ; r=$((a $op b)) ;;
  *) echo "opérateur inconnu" ; exit 1 ;;
esac
```

*(extrait de la calculatrice du TD 4, condensé ; les guillemets autour de `"*"` empêchent qu'il serve de cas par défaut)*

## Idée 3 · Les boucles

```html
<table>
<tr><th>Boucle</th><th>Tourne…</th><th>Exemple</th></tr>
<tr><td><code>for v in liste ; do … done</code></td><td>une fois par mot de la liste</td><td><code>for mois in janvier février mars</code></td></tr>
<tr><td><code>for v ; do … done</code> ou <code>for v in "$@"</code></td><td>sur les arguments</td><td><code>for arg in "$@"</code></td></tr>
<tr><td><code>for ((i=1; i&lt;=n; i++))</code></td><td>forme arithmétique (bash)</td><td>TD 5</td></tr>
<tr><td><code>while cond ; do … done</code></td><td><b>tant que</b> cond réussit</td><td><code>while test $i -le 10</code></td></tr>
<tr><td><code>until cond ; do … done</code></td><td><b>jusqu'à ce que</b> cond réussisse</td><td><code>until [ $count -lt 0 ]</code></td></tr>
<tr><td><code>select v in liste ; do … done</code></td><td>affiche un menu numéroté</td><td>plat préféré : tajine, couscous, harira</td></tr>
</table>
```

Un mot entre guillemets compte pour **une seule** itération : `for m in janvier "février mars" avril` fait 3 tours (vérifié).

`break` sort de la boucle, `continue` passe au tour suivant, `exit n` arrête le script.

```etapes Dérouler l'exemple 2 du cours (continue)
Départ :: i = 0. La condition `test $i -lt 6` est vraie.
Tour 1 :: i devient 1. 1 % 2 = 1, pas de continue : affiche 1.
Tour 2 :: i devient 2. 2 % 2 = 0 : continue, rien n'est affiché.
Tours suivants :: 3 affiché, 4 sauté, 5 affiché, 6 sauté.
Fin :: i = 6, la condition est fausse. Sortie : 1, 3, 5 (vérifié dans bash).
```

Lire un fichier ligne par ligne : `while read ligne ; do echo "$ligne" ; done < fiche`.

> [!attention] L'exemple `select` des diapos écrit `then ; break`. C'est une erreur de syntaxe : rien ne doit séparer `then` de la commande par un `;`. Écris `then break` ou `then` puis `break` à la ligne.

## Idée 4 · Les fonctions

```bash nontest
pair_impair () {
  if test `expr $1 % 2` -eq 0 ; then echo "$1 est pair"
  else echo "$1 est impair"
  fi
}
for nb in "$@" ; do pair_impair $nb ; done
```

Avec `./script 4 7` : « 4 est pair », « 7 est impair » (vérifié).

- Déclarer **avant** d'appeler ; appeler comme une commande : `nom arg1 arg2`.
- Dans la fonction, `$1`, `$#`, `$@` désignent **ses** arguments ; `$0` reste le nom du script.
- `return n` (0 à 255) fixe le code retour, lu dans `$?`. Pour « renvoyer » une valeur, on fait `echo` et on capture avec `r=$(fonction 5)`.
- Pas de sous-shell : les variables sont **globales** par défaut ; `local j=8` rend j locale. Un `exit` dans une fonction arrête tout le script.

Exemple du cours avec `i=0 ; j=0` : dans `modif`, `i=5` et `local j=8`. Après l'appel : **i = 5, j = 0** (vérifié).

> [!attention] Le TD 5 (exercice 3) compte les appels de `fibonacci` dans une variable globale et annonce « 25 appels » pour n = 6. Dans bash, le script affiche en fait **0** : chaque appel passe par `$(fibonacci …)`, donc dans un **sous-shell**, et l'incrément du compteur meurt avec lui (vérifié). Le vrai nombre d'appels pour F(6) est bien 25, mais il faudrait appeler la fonction sans `$( )` (résultat dans une variable globale) pour le compter.

## Idée 5 · Les tableaux

```html
<svg viewBox="0 0 640 120" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Tableau notes avec indices 0 à 5 et valeurs 12 15 8 17 14 9">
<g font-family="monospace" font-size="16" text-anchor="middle" fill="currentColor">
<text x="45" y="62" font-family="sans-serif" font-size="13">notes</text>
<rect x="90" y="40" width="80" height="36" fill="none" stroke="currentColor"/><text x="130" y="64">12</text>
<rect x="170" y="40" width="80" height="36" fill="none" stroke="currentColor"/><text x="210" y="64">15</text>
<rect x="250" y="40" width="80" height="36" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F" stroke-width="2"/><text x="290" y="64">8</text>
<rect x="330" y="40" width="80" height="36" fill="none" stroke="currentColor"/><text x="370" y="64">17</text>
<rect x="410" y="40" width="80" height="36" fill="none" stroke="currentColor"/><text x="450" y="64">14</text>
<rect x="490" y="40" width="80" height="36" fill="none" stroke="currentColor"/><text x="530" y="64">9</text>
<g font-size="12"><text x="130" y="30">0</text><text x="210" y="30">1</text><text x="290" y="30">2</text><text x="370" y="30">3</text><text x="450" y="30">4</text><text x="530" y="30">5</text></g>
<text x="290" y="100" font-size="13" fill="#D9824F">${notes[2]} = 8</text>
</g>
</svg>
```

```html
<table>
<tr><th>Écriture</th><th>Sens</th></tr>
<tr><td><code>notes=(12 15 8 17 14 9)</code></td><td>déclarer et remplir</td></tr>
<tr><td><code>${notes[2]}</code></td><td>un élément (indices à partir de 0) ; <code>${notes}</code> = <code>${notes[0]}</code></td></tr>
<tr><td><code>${notes[@]}</code> ou <code>${notes[*]}</code></td><td>tous les éléments</td></tr>
<tr><td><code>${#notes[@]}</code></td><td>nombre d'éléments</td></tr>
<tr><td><code>${!notes[@]}</code></td><td>la liste des indices</td></tr>
<tr><td><code>${#notes[2]}</code></td><td>longueur du 3e élément</td></tr>
<tr><td><code>notes+=(16)</code></td><td>ajouter à la fin</td></tr>
<tr><td><code>unset notes[2]</code> / <code>unset notes</code></td><td>supprimer un élément / tout le tableau</td></tr>
</table>
```

Exemple chiffré : somme = 12 + 15 + 8 + 17 + 14 + 9 = 75, moyenne entière `$((75 / 6))` = **12**. Après `unset notes[2]`, les indices sont 0 1 3 4 5 : il y a un trou. `notes=("${notes[@]}")` renumérote de 0 à 4.

## S'exercer

```exercice Exercices du cours, des TD 4-5 et du TP 4
? Écris un script qui crée le répertoire passé en argument s'il n'existe pas.
= `if test ! -d "$1"` puis `then mkdir "$1"` puis `fi`. Forme courte : `[ -d "$1" ] || mkdir "$1"`.

? Combien de nombres affiche `count=10 ; until [ $count -lt 0 ] ; do echo $count ; count=$((count - 1)) ; done` ?
reponse: 11
= De 10 jusqu'à 0 inclus : **11** nombres. La boucle s'arrête quand count vaut −1.

? Écris le test « mention » du TP 4 pour 12 ≤ note < 14.
= `elif [ $note -ge 12 -a $note -lt 14 ]` puis `then echo "Assez bien"`.

? Avec `tab=(a bb ccc)`, que valent `${#tab[@]}` et `${#tab[2]}` ?
= `${#tab[@]}` = 3 (trois éléments) et `${#tab[2]}` = 3 (« ccc » a trois caractères). Vérifié.
```

## Flashcards

```cartes
Code retour d'un test vrai :: 0 (faux : autre valeur, souvent 1).
Tester qu'un fichier est un répertoire :: [ -d "$f" ]
Comparer deux nombres :: -eq -ne -lt -le -gt -ge (et pas = ou < qui sont pour les chaînes)
Pourquoi "$x" dans un test ? :: Si x est vide, [ $x = oui ] devient [ = oui ] : erreur de syntaxe.
Fin d'un cas dans case :: ;; (et le cas par défaut est *) en dernier, fin par esac)
while ou until :: while : tant que la condition réussit. until : jusqu'à ce qu'elle réussisse.
break et continue :: break sort de la boucle ; continue passe à l'itération suivante.
Variable locale à une fonction :: local var=valeur (sinon elle est globale)
Nombre d'éléments d'un tableau :: ${#tab[@]}
Indices d'un tableau :: ${!tab[@]}
```

## QCM du chapitre

```qcm
? Quelle boucle itère sur une liste explicite comme jan fev mar ?
- while
+ for
- until
- select
= Question 20 de l'examen blanc.

? `[ $a -lt 10 ]` est vrai si :
+ a est strictement inférieur à 10
- a est inférieur ou égal à 10
- a est différent de 10
= lt = lower than, strictement. `-le` = inférieur ou égal.

? Quelle écriture est correcte ?
- `[$x -eq 3]`
+ `[ $x -eq 3 ]`
- `[ $x-eq3 ]`
= Espaces après `[`, avant `]` et autour de l'opérateur.

? `[ -f fiche ]` est vrai si :
- fiche est un répertoire
+ fiche est un fichier ordinaire
- fiche est vide
= `-d` répertoire, `-s` taille non nulle.

? Dans `case`, chaque bloc d'instructions se termine par :
- `;`
+ `;;`
- `esac`
= `esac` ferme toute la structure.

? Combien de tours fait `for m in janvier "février mars" avril` ?
- 4
+ 3
- 1
= Ce qui est entre guillemets compte pour un seul élément.

? Avec `i=0 ; j=0`, la fonction fait `i=5 ; local j=8`. Après l'appel :
+ i = 5 et j = 0
- i = 0 et j = 0
- i = 5 et j = 8
= Variables globales par défaut ; `local` protège j.

? Comment une fonction peut-elle rendre un résultat numérique de 120 ?
- `return 120` puis le lire dans `$1`
+ `echo 120`, puis `r=$(fonction)`
- `export 120`
= `return` ne transmet qu'un code (0 à 255) lu dans `$?`. Pour une vraie valeur, on affiche et on capture.

? `${#tab[@]}` donne :
- le premier élément
+ le nombre d'éléments
- la liste des indices
= Les indices, c'est `${!tab[@]}`.

? Que fait `continue` dans une boucle ?
- Arrête le script
- Sort de la boucle
+ Passe directement à l'itération suivante
= `break` sort, `exit` arrête le script.
```

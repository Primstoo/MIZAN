---
id: shell-variables
titre: Shell (1) · variables, quotes, calcul et scripts
seance: Chapitre IV · Programmation shell (parties 1 à 5)
importance: 5
---

## Avant de commencer

Tu dois savoir ce qu'est un sous-shell : une commande entre `( )` ou un `bash` lancé depuis le shell s'exécute dans un **processus fils** (chapitre 7).

```exercice Vérifie ton prérequis
? Depuis `/home/etudiant`, tu tapes `(cd /tmp)` puis `pwd`. Qu'affiche pwd ?
= `/home/etudiant` : le `cd` a eu lieu dans le sous-shell, qui est mort aussitôt.
```

## Comment aborder ce chapitre

> [!astuce] Avant d'exécuter une ligne, le shell la **réécrit** : il remplace les variables, les substitutions de commande, puis gère redirections et motifs. Pour prévoir un résultat, fais cette réécriture à la main.

> [!piege] Mettre des espaces autour du `=`. `mois = janvier` ne crée pas de variable : le shell cherche une commande appelée `mois`. On écrit `mois=janvier`, collé.

À la fin, tu sais créer, lire, protéger et exporter une variable, choisir entre `'…'` et `"…"`, faire un calcul entier, utiliser `read` et `echo`, et écrire un script qui exploite `$0`, `$1`, `$#`, `$@`, `$?`, `$$`.

## Idée 1 · Les variables

- Pas de type : toute valeur est une **chaîne**. Pas de déclaration. Majuscules et minuscules sont distinctes.
- Affecter : `mois=janvier`. Lire : `$mois`. Accolades pour coller du texte : `${vol}60`.
- `unset mois` détruit ; `readonly mois` interdit toute modification (et toute destruction) jusqu'à la fin du shell.
- `alias ll="ls -l"` crée un raccourci ; `alias` les liste ; `unalias ll` le supprime.

```bash nontest
vol=volume
echo $vol60       # rien : la variable vol60 n'existe pas
echo ${vol}60     # volume60
```

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Une variable exportée descend du shell père vers le fils ; jamais du fils vers le père">
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="40" y="30" width="220" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><text x="150" y="55" font-weight="700">shell père</text><text x="150" y="80" font-family="monospace">a=35 ; export a</text>
<rect x="380" y="30" width="220" height="80" rx="10" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="490" y="55" font-weight="700">sous-shell (bash)</text><text x="490" y="80" font-family="monospace">echo $a → 35</text>
<text x="320" y="52" fill="#D9824F">export ✓</text><text x="320" y="135">du fils vers le père : jamais</text>
</g>
<g stroke="currentColor" stroke-width="2"><line x1="260" y1="62" x2="380" y2="62"/><line x1="380" y1="95" x2="260" y2="95" stroke-dasharray="5"/></g>
</svg>
```

- **Locale** : connue du seul shell qui l'a créée. `a=35 ; bash` puis `echo $a` dans le fils : rien.
- **D'environnement** : après `export a` (ou `export a=35`), elle est **transmise aux fils**. Jamais l'inverse : `(B=20 ; export B)` puis `echo $B` n'affiche rien.
- Variables usuelles : `HOME`, `PATH` (où chercher les commandes), `PS1` (prompt), `USER`, `PWD`, `SHELL`, `LANG`, `HISTSIZE`, `RANDOM` (0 à 32767), `SECONDS`. `env` les affiche.

## Idée 2 · Quotes et substitution de commande

```html
<table>
<tr><th>Écriture</th><th>Ce qui reste interprété</th><th>Exemple avec a=20</th><th>Affiche</th></tr>
<tr><td><code>\x</code></td><td>tout sauf le caractère suivant</td><td><code>echo \$a</code></td><td>$a</td></tr>
<tr><td><code>'…'</code></td><td><b>rien</b></td><td><code>echo 'a=$a &gt; res'</code></td><td>a=$a &gt; res</td></tr>
<tr><td><code>"…"</code></td><td>seulement <code>$</code>, <code>\</code>, <code>"</code>, <code>`</code></td><td><code>echo "a=$a &gt; res"</code></td><td>a=20 &gt; res</td></tr>
<tr><td>sans quotes</td><td>tout</td><td><code>echo a=$a &gt; res</code></td><td>(rien : écrit « a=20 » dans res)</td></tr>
</table>
```

Ces trois résultats ont été vérifiés dans bash.

**Substitution de commande** : `$(commande)` ou `` `commande` `` est remplacé par ce que la commande affiche.

```bash nontest
rep=$(pwd) ; echo $rep          # /home/etudiant/cours
echo "la date est $(date)"      # la date est mardi 25 novembre 2025, 11:59:10
```

*(sortie indicative)*

## Idée 3 · Calcul sur les entiers

`var=10 ; var=$var+2 ; echo $var` affiche **10+2** : c'est une chaîne. Pour calculer, trois outils :

```html
<table>
<tr><th>Outil</th><th>Exemple</th><th>À savoir</th></tr>
<tr><td><code>expr</code></td><td><code>b=`expr $a + 1`</code> ; <code>expr 2 \* 3</code></td><td>espaces obligatoires ; <code>*</code>, <code>(</code>, <code>)</code> à échapper</td></tr>
<tr><td><code>$(( ))</code></td><td><code>d=$(( (a + c) * b ))</code></td><td>parenthèses sans <code>\</code>, <code>$</code> facultatif devant les noms</td></tr>
<tr><td><code>let</code></td><td><code>let i=i+1</code> ; <code>let var="(2+a)*5"</code></td><td>évalue puis affecte</td></tr>
</table>
```

Exemple chiffré : `a=12 ; b=$((a / 5))` donne **2** (division entière) ; `expr 6 % 4` donne **2** (reste).

> [!attention] La diapo propose `let a=1 + 2`. Ça échoue dans bash (« let: +: syntax error ») car `let` reçoit trois arguments séparés. Écris `let a=1+2` ou `let a="1 + 2"`.

## Idée 4 · read et echo

`read v1 v2 v3` lit une ligne au clavier et coupe aux espaces :

- autant de valeurs que de variables : une chacune ;
- moins de valeurs : les dernières variables sont vides ;
- plus de valeurs : **la dernière variable prend tout le reste**. Avec « val1 val2 val3 val4 val5 », `v3` vaut « val3 val4 val5 » (vérifié).
- sans nom de variable, la ligne va dans `REPLY`. `read -p "Question : " x` affiche une invite (utilisé dans le TD 4).

`echo -n` : pas de retour à la ligne (`echo -n 1 ; echo 2` affiche 12). `echo -e` : interprète `\n`, `\t`, `\c`, `\\`.

## Idée 5 · Script et paramètres

```etapes Écrire et lancer un script
Première ligne :: `#!/bin/bash` (le shell qui interprétera le script).
Le code :: une commande par ligne ; `#` commence un commentaire.
Fin :: `exit n` avec n entre 0 et 255 (0 = succès). Sans exit, le code est celui de la dernière commande.
Droit d'exécution :: `chmod +x prog_debut`.
Lancement :: `./prog_debut` si le répertoire courant n'est pas dans PATH (cas le plus courant).
```

```html
<table>
<tr><th>Paramètre</th><th>Contenu</th></tr>
<tr><td><code>$0</code></td><td>nom du script</td></tr>
<tr><td><code>$1</code> … <code>$9</code>, <code>${10}</code></td><td>arguments ; au-delà de 9, accolades obligatoires</td></tr>
<tr><td><code>$#</code></td><td>nombre d'arguments</td></tr>
<tr><td><code>$*</code></td><td>tous les arguments, en <b>un seul</b> mot (entre guillemets)</td></tr>
<tr><td><code>$@</code></td><td>tous les arguments, <b>chacun séparé</b> (entre guillemets)</td></tr>
<tr><td><code>$?</code></td><td>code retour de la dernière commande</td></tr>
<tr><td><code>$$</code></td><td>PID du shell qui exécute le script</td></tr>
<tr><td><code>$!</code></td><td>PID de la dernière commande lancée en arrière-plan</td></tr>
</table>
```

Exemple : `./test un deux … onze douze` avec `echo $10` affiche « un0 » à la place de « dix » : le shell lit `$1` suivi de « 0 ». Il faut `${10}`.

## S'exercer

```exercice Exercices du cours, du TP 4 et de l'examen
? Qu'affiche `a=3 ; b=$((a + 1)) ; echo $((b * 2))` ?
reponse: 8
= b = 4, puis 4 × 2 = **8**.

? Pourquoi écrit-on `${var}60` et pas `$var60` ? (question 15)
= Pour séparer le nom de la variable du texte collé derrière. `$var60` chercherait une variable nommée var60.

? Écris un script qui affiche son nom, le nombre d'arguments, puis tous les arguments.
= Quatre lignes : `#!/bin/bash`, puis `echo "Nom du script : $0"`, puis `echo "Nombre d'arguments : $#"`, puis `echo "Arguments : $@"`. On termine par `exit 0`, on rend exécutable avec `chmod +x`, et on lance avec `./script a b c`.

? On tape `x=5 ; bash`, puis dans le nouveau shell `echo $x`. Qu'est-ce qui s'affiche, et comment l'éviter ?
= Rien : x est locale au shell père. Il fallait `export x` avant de lancer `bash`.
```

## Flashcards

```cartes
Affecter une variable :: mois=janvier (sans espace autour de =)
Rendre une variable visible des sous-shells :: export var
Variable en lecture seule :: readonly var (impossible à modifier ou détruire jusqu'à la fin du shell)
'…' ou "…" :: Simples : rien n'est interprété. Doubles : $, \, " et ` restent interprétés.
Substitution de commande :: $(commande) ou `commande` : remplacée par la sortie de la commande.
Calcul entier en bash :: $(( a + 3 )), let, ou expr (avec espaces et \*)
read avec plus de valeurs que de variables :: La dernière variable reçoit tout le reste de la ligne.
$# , $? , $$ :: Nombre d'arguments ; code retour de la dernière commande ; PID du shell du script.
$* et $@ entre guillemets :: "$*" = un seul mot ; "$@" = un mot par argument.
11e argument d'un script :: ${11} (accolades obligatoires après 9)
```

## QCM du chapitre

```qcm
? Quelle commande rend une variable accessible aux sous-shells ?
+ `export var`
- `global var`
- `publish var`
- `share var`
= Question 16 de l'examen blanc.

? Dans les doubles quotes, quels caractères sont toujours interprétés ?
- `>`, `|`, `;`
+ `$`, `\`, `"`, `` ` ``
- Tous
- Aucun
= Question 17. Les simples quotes, elles, bloquent tout.

? Quelle option de echo interprète `\t` ?
- `-n`
+ `-e`
- `-x`
= Question 18. `-n` supprime le retour à la ligne.

? Quelle variable contient le PID du script en cours ?
+ `$$`
- `$!`
- `$?`
- `$PID`
= Question 19. `$!` = PID du dernier processus lancé en arrière-plan.

? Que vaut var après `var=10 ; var=$var+2` ?
- 12
+ la chaîne 10+2
- une erreur
= Le shell ne calcule pas sans `$(( ))`, `let` ou `expr`.

? Quelle écriture est correcte ?
- `mois = janvier`
+ `mois=janvier`
- `$mois=janvier`
= Pas d'espace, pas de `$` à l'affectation.

? `echo 'Total : $x'` affiche :
+ Total : $x
- Total : suivi de la valeur de x
- rien
= Entre simples quotes, `$` n'est pas interprété.

? Dans un script lancé par `./s a b c`, que vaut `$#` ?
- 4
+ 3
- abc
= Trois arguments ; `$0` (le nom) n'est pas compté.

? Pour multiplier avec expr, on écrit :
- `expr 2 * 3`
+ `expr 2 \* 3`
- `expr 2*3`
= Le `*` non échappé serait remplacé par les noms de fichiers ; et expr veut des espaces.

? Quel code retour signifie « succès » ?
+ 0
- 1
- 255
= Toute valeur différente de 0 indique une erreur.
```

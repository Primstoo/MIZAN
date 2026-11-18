---
id: redirections-filtres-processus
titre: Redirections, filtres, composition et processus
seance: Chapitre III · Commandes de base (parties 9 à 12)
importance: 5
---

## Avant de commencer

Tu dois connaître `cat`, `sort`, `wc`, `head` et `tail` (chapitre 5).

```exercice Vérifie ton prérequis
? Que fait `wc -l fichier.txt` ?
= Elle affiche le nombre de lignes de fichier.txt.
```

## Comment aborder ce chapitre

> [!astuce] Imagine chaque commande comme une machine avec **une entrée (0)** et **deux sorties : normale (1) et erreurs (2)**. Les redirections branchent ces tuyaux sur des fichiers ; le pipe `|` branche la sortie 1 d'une commande sur l'entrée 0 de la suivante.

> [!piege] `>` **écrase** le fichier, `>>` **ajoute** à la fin. Un `>` de trop, et ton journal est vidé.

À la fin, tu sais rediriger entrées, sorties et erreurs, enchaîner des filtres (grep, cut, sort, uniq, tr, sed, awk), composer des commandes (`;`, `&`, `&&`, `||`, `( )`, `{ }`) et piloter des processus (ps, kill, jobs, bg, fg, nice).

## Idée 1 · Les trois flux et leurs redirections

```html
<svg viewBox="0 0 640 150" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Une commande reçoit stdin 0 et produit stdout 1 et stderr 2, chacun redirigeable">
<g font-family="sans-serif" font-size="14" text-anchor="middle" fill="currentColor">
<rect x="250" y="45" width="140" height="60" rx="10" fill="#D9824F" fill-opacity="0.2" stroke="#D9824F" stroke-width="2"/><text x="320" y="80" font-weight="700">commande</text>
<text x="100" y="70">0 stdin (clavier)</text><text x="100" y="92" font-family="monospace">&lt; fichier</text>
<text x="530" y="45">1 stdout (écran)</text><text x="530" y="65" font-family="monospace">&gt;  &gt;&gt;  |</text>
<text x="530" y="110">2 stderr (écran)</text><text x="530" y="130" font-family="monospace">2&gt;  2&gt;&amp;1</text>
</g>
<g stroke="currentColor" stroke-width="2"><line x1="170" y1="75" x2="250" y2="75"/><line x1="390" y1="60" x2="460" y2="50"/><line x1="390" y1="90" x2="460" y2="108"/></g>
</svg>
```

```html
<table>
<tr><th>Écriture</th><th>Effet</th></tr>
<tr><td><code>cmd &gt; f</code></td><td>sortie dans f (écrase)</td></tr>
<tr><td><code>cmd &gt;&gt; f</code></td><td>sortie ajoutée à la fin de f</td></tr>
<tr><td><code>cmd &lt; f</code></td><td>f devient l'entrée</td></tr>
<tr><td><code>cmd 2&gt; err.log</code></td><td>erreurs dans err.log</td></tr>
<tr><td><code>cmd 2&gt;/dev/null</code></td><td>erreurs jetées, sortie normale affichée</td></tr>
<tr><td><code>cmd &gt; tout.log 2&gt;&amp;1</code></td><td>sortie et erreurs dans le même fichier (portable) ; <code>&amp;&gt;</code> en bash</td></tr>
<tr><td><code>cmd &lt;&lt; EOF … EOF</code></td><td>here document : bloc de lignes en entrée</td></tr>
<tr><td><code>cmd &lt;&lt;&lt; "texte"</code></td><td>here string : une chaîne en entrée (<code>bc &lt;&lt;&lt; "2 + 3 * 4"</code> donne 14)</td></tr>
</table>
```

Exemple : `wc -l < texte.txt` affiche juste le nombre (« 7 »), alors que `wc -l texte.txt` affiche « 7 texte.txt ». C'est pour ça que le TD 3 utilise `<` quand on veut stocker uniquement le nombre.

## Idée 2 · Les filtres et le pipe

```flux Exemple du TD 3
sort donnees.txt -> uniq (enlève les doublons voisins) -> tr 'a-z' 'A-Z' (majuscules) -> > resultat_final.txt
```

Résultat sur Alice, Bob, Charlie, Alice, David, Bob, Eve : ALICE, BOB, CHARLIE, DAVID, EVE. `uniq` ne supprime que les doublons **adjacents** : c'est pour ça qu'on trie d'abord.

```html
<table>
<tr><th>Filtre</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>grep</td><td>garde les lignes qui contiennent un motif ; <code>-i</code> casse, <code>-v</code> inverse, <code>-c</code> compte, <code>-n</code> numéros, <code>-r</code> récursif, <code>-l</code> noms de fichiers</td><td><code>grep -i "erreur" app.log</code></td></tr>
<tr><td>cut</td><td>extrait des champs (<code>-d</code> séparateur, <code>-f</code> champs) ou des caractères (<code>-c</code>)</td><td><code>cut -d: -f1 /etc/passwd</code> ; <code>echo abcde | cut -c2-4</code> donne bcd</td></tr>
<tr><td>sed</td><td>édite le flux : <code>s/ancien/nouveau/g</code>, <code>2,5d</code>, <code>/^#/d</code> ; <code>-i</code> modifie le fichier</td><td><code>sed 's/foo/bar/g' f</code></td></tr>
<tr><td>awk</td><td>découpe en champs <code>$1</code>, <code>$2</code>… (<code>$0</code> ligne, <code>NF</code> nb de champs, <code>NR</code> n° de ligne), conditions, calculs</td><td><code>awk -F, '$3 &gt; 35' users.csv</code></td></tr>
<tr><td>sort, uniq, tr, wc</td><td>trier, dédoublonner (<code>uniq -c</code> compte), traduire des caractères, compter</td><td><code>cut -d: -f7 /etc/passwd | sort | uniq -c</code></td></tr>
</table>
```

```etapes Les 3 utilisateurs les plus jeunes (TD 3, exercice 2)
Le séparateur :: le fichier est un CSV, donc `-t ','` pour sort.
La colonne :: l'âge est le champ 3 : `-k3`.
Le type de tri :: numérique, sinon « 100 » passerait avant « 26 » : `-n`.
Garder le début :: `head -n 3`.
La commande :: `sort -t ',' -k3 -n utilisateurs.csv | head -n 3` donne Petit (26), Dubois (31), Dupont (34).
```

## Idée 3 · Composer des commandes

```html
<table>
<tr><th>Écriture</th><th>Sens</th></tr>
<tr><td><code>cmd1 ; cmd2</code></td><td>l'une après l'autre, quoi qu'il arrive</td></tr>
<tr><td><code>cmd &amp;</code></td><td>en arrière-plan, le prompt revient tout de suite</td></tr>
<tr><td><code>cmd1 &amp;&amp; cmd2</code></td><td>cmd2 seulement si cmd1 réussit (code retour 0)</td></tr>
<tr><td><code>cmd1 || cmd2</code></td><td>cmd2 seulement si cmd1 échoue (code ≠ 0)</td></tr>
<tr><td><code>( cmds )</code></td><td>dans un <b>sous-shell</b> (processus fils)</td></tr>
<tr><td><code>{ cmds ; }</code></td><td>dans le shell courant (espace après <code>{</code>, <code>;</code> avant <code>}</code>)</td></tr>
</table>
```

Exemple du cours, depuis `/home/etudiant` : `(cd cours ; pwd)` affiche `/home/etudiant/cours`, puis `pwd` affiche encore `/home/etudiant` (le `cd` a eu lieu dans le fils). Avec `{ cd cours ; pwd ; }`, on reste dans `cours`.

Exemple pratique : `gcc main.c -o main && ./main` lance le programme seulement si la compilation a réussi.

> [!attention] La diapo du « ; » écrit `ls -f file.c ; wc -l file.c` pour « lister file.c ». L'option voulue est `-l` (format long) ; `-f` désactive le tri et n'a rien à voir.

## Idée 4 · Les processus

- `ps aux` (style BSD : tous, format utilisateur, y compris sans terminal) ou `ps -ef` (style POSIX, avec PPID). Colonnes : PID, PPID, STAT (R en cours, S endormi, Z zombie), %CPU, %MEM. `pstree -p` montre l'arbre (racine : systemd, PID 1). `top` en temps réel (`k` pour tuer, `q` pour quitter).
- Signaux : **SIGTERM (15)** demande polie, par défaut de `kill` ; **SIGKILL (9)** arrêt immédiat, non interceptable ; **SIGHUP (1)** souvent « recharge la config ». `kill PID`, `kill -9 PID`, `killall nom`, `pkill nom`.
- Priorité : `nice -n 10 cmd`, `renice -n 5 -p PID`. Valeurs de −20 (plus prioritaire) à +19 ; défaut 0 ; seul root met une valeur négative.
- Jobs du shell : `Ctrl+Z` suspend, `jobs` liste (`%1`, `%2`), `bg %1` reprend en arrière-plan, `fg %1` ramène au premier plan, `cmd &` lance en arrière-plan. `nohup cmd &` survit à la fermeture du terminal.

```bash nontest
sleep 120 &          # le shell affiche [1] 12345 : numéro de job et PID
jobs                 # [1]+  Running   sleep 120 &
fg %1                # premier plan, puis Ctrl+Z pour suspendre
bg %1                # reprend en arrière-plan
kill %1              # SIGTERM au job 1
```

*(sortie indicative : le PID change à chaque fois)*

> [!retenir] Essaie toujours `kill` (SIGTERM) avant `kill -9` : SIGKILL ne laisse pas le processus fermer proprement ses fichiers et connexions.

## S'exercer

```exercice TD 3, TP 3 et examen blanc
? Lance `grep "404" access.log` en jetant les erreurs mais en gardant la sortie normale (question 31).
= `grep "404" access.log 2>/dev/null`

? Que fait `nohup ./long_process.sh > sortie.log 2>&1 &` ?
= `nohup` : le script continue même si on ferme le terminal. `> sortie.log` : stdout dans le fichier. `2>&1` : stderr va au même endroit que stdout. `&` : en arrière-plan.

? Avec awk, affiche les utilisateurs de plus de 35 ans du fichier CSV (âge en champ 3).
= `awk -F',' '$3 > 35' utilisateurs.csv` donne Lefevre (45), Durand (37), Garnier (50).

? Combien d'utilisateurs du service Informatique dans le CSV du TD 3 ? (commande puis nombre)
reponse: 3
= `grep ",Informatique," utilisateurs.csv | wc -l` donne **3** (Dupont, Lefevre, Durand). Les virgules autour du mot évitent de capturer un autre champ.

? Comment tuer tous les processus nommés python ? (question 34)
= `killall python` ou `pkill python`.
```

## Flashcards

```cartes
> ou >> :: > écrase le fichier ; >> ajoute à la fin.
Numéros des flux :: 0 = stdin, 1 = stdout, 2 = stderr.
Jeter les erreurs :: cmd 2>/dev/null
Tout dans un même fichier :: cmd > f 2>&1 (ou cmd &> f en bash)
cmd1 && cmd2 :: cmd2 s'exécute seulement si cmd1 réussit (code retour 0).
cmd1 || cmd2 :: cmd2 s'exécute seulement si cmd1 échoue.
( ) et { } :: ( ) : sous-shell, les changements ne restent pas. { ; } : shell courant.
SIGTERM et SIGKILL :: 15 : demande polie, interceptable (défaut de kill). 9 : arrêt immédiat, non interceptable.
Suspendre puis reprendre en fond :: Ctrl+Z puis bg %1
Plage des valeurs nice :: De −20 (priorité max) à +19 (priorité min), défaut 0.
```

## QCM du chapitre

```qcm
? Quelle séquence exécute cmd2 uniquement si cmd1 réussit ?
- `cmd1 ; cmd2`
- `cmd1 || cmd2`
+ `cmd1 && cmd2`
- `cmd1 | cmd2`
= Question 14 de l'examen blanc.

? Quelle commande recherche « erreur » sans tenir compte de la casse ?
+ `grep -i "erreur" fichier`
- `grep "erreur" -c fichier`
- `find . -name "*erreur*"`
- `cat fichier | sed "erreur"`
= `-i` = insensible à la casse ; `-c` compte.

? Quelle commande affiche les 5 dernières lignes de data.csv en temps réel ?
- `head -n 5 data.csv`
+ `tail -n 5 -f data.csv`
- `less -f data.csv`
= `-f` suit le fichier au fur et à mesure (question 32).

? Que fait `ps aux | grep firefox` ?
+ Affiche les processus dont la ligne contient « firefox »
- Lance Firefox en arrière-plan
- Tue Firefox
= ps liste tous les processus, grep filtre (question 33).

? Que signifie `2>&1` ?
- Envoie la sortie vers le fichier 2
+ Redirige stderr vers la même destination que stdout
- Lance deux commandes
= 2 = stderr, &1 = « là où va le flux 1 ».

? Quel signal ne peut pas être intercepté ?
- SIGTERM
- SIGHUP
+ SIGKILL
= SIGKILL (9) tue immédiatement.

? Depuis `/home/etudiant`, après `(cd cours ; pwd)`, que donne `pwd` ?
+ /home/etudiant
- /home/etudiant/cours
- une erreur
= Les parenthèses créent un sous-shell : son `cd` ne touche pas le shell parent.

? Pourquoi trier avant `uniq` ?
+ uniq ne supprime que les doublons adjacents
- uniq ne lit que des fichiers triés, sinon il plante
- sort supprime déjà les doublons
= Sans tri, « Alice … Alice » séparées resteraient toutes les deux. (`sort -u` fait les deux d'un coup.)

? Quelle valeur nice donne la priorité la plus haute ?
+ −20
- 0
- +19
= Plus la valeur est basse, plus le processus est prioritaire ; seul root peut descendre sous 0.

? `cut -d: -f1 /etc/passwd` affiche :
- les mots de passe
+ les noms d'utilisateurs
- les shells
= Champ 1 avec le séparateur `:`. Le shell est le champ 7.
```

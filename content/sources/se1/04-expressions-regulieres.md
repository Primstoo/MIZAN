---
id: expressions-regulieres
titre: Expressions régulières et motifs du shell
seance: Chapitre II · Système Unix (partie 7)
importance: 4
---

## Avant de commencer

Tu dois savoir qu'une commande Unix lit des lignes de texte et peut en garder certaines (philosophie « petits outils », chapitre 3).

```exercice Vérifie ton prérequis
? Que fait `grep "TODO" notes.txt` ?
= Elle affiche les lignes du fichier `notes.txt` qui contiennent le texte « TODO ».
```

## Comment aborder ce chapitre

> [!astuce] Lis une regex **caractère par caractère, de gauche à droite**, en te demandant pour chacun : « est-ce un caractère normal ou un métacaractère ? ». `^E.*[0-9]$` se lit : début de ligne, E, n'importe quoi, un chiffre, fin de ligne.

> [!piege] Confondre deux langages qui se ressemblent. Dans le **shell** (`ls rapport_*.txt`), `*` veut dire « n'importe quelle suite de caractères ». Dans une **regex** (`grep 'a*'`), `*` veut dire « **0 ou plusieurs fois le caractère précédent** ». Le « n'importe quoi » d'une regex s'écrit `.*`.

À la fin, tu sais écrire une regex avec ancres, classes et quantificateurs, choisir entre `grep` et `grep -E`, et écrire un motif shell pour `ls`.

## Idée 1 · Littéraux et métacaractères

Une **regex** décrit un motif de texte. Ce n'est pas un outil, c'est un langage, utilisé par `grep`, `sed`, `awk`… Il en existe des variantes : **BRE** (basique), **ERE** (étendue), **PCRE** (Perl).

```html
<table>
<tr><th>Symbole</th><th>Sens</th><th>Exemple</th><th>Trouve</th></tr>
<tr><td><code>.</code></td><td>un caractère quelconque</td><td><code>a.c</code></td><td>abc, a9c</td></tr>
<tr><td><code>*</code></td><td>0, 1 ou plusieurs fois le précédent</td><td><code>ab*c</code></td><td>ac, abc, abbc</td></tr>
<tr><td><code>^</code> / <code>$</code></td><td>début / fin de ligne</td><td><code>^ERROR</code></td><td>lignes commençant par ERROR</td></tr>
<tr><td><code>[abc]</code></td><td>un caractère parmi a, b, c</td><td><code>[aeiou]</code></td><td>une voyelle</td></tr>
<tr><td><code>[a-z]</code></td><td>un caractère dans l'intervalle</td><td><code>[0-9]</code></td><td>un chiffre</td></tr>
<tr><td><code>[^…]</code></td><td>tout sauf…</td><td><code>[^0-9]</code></td><td>un non-chiffre</td></tr>
<tr><td><code>\</code></td><td>rend littéral le caractère suivant</td><td><code>\.</code></td><td>un vrai point</td></tr>
</table>
```

Classes POSIX, plus portables : `[[:digit:]]` = `[0-9]`, `[[:alpha:]]` = lettres, `[[:alnum:]]` = lettres et chiffres.

> [!attention] Deux coquilles dans les diapos.
> 1. « `[abc]` ou `[a,b,c]` » : ce n'est **pas** pareil. Dans des crochets, la virgule est un caractère normal : `[a,b,c]` accepte aussi `,`. Écris `[abc]`.
> 2. « `^$$` => ligne vide » : la ligne vide s'écrit `^$` (un seul `$`).

## Idée 2 · Ancres et quantificateurs

```html
<svg viewBox="0 0 640 120" style="width:100%;max-width:640px;display:block;margin:10px auto" role="img" aria-label="Décomposition de la regex ^Erreur.*[0-9]$ en cinq morceaux">
<g font-family="monospace" font-size="18" text-anchor="middle" fill="currentColor">
<rect x="20" y="20" width="50" height="40" rx="6" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F"/><text x="45" y="47">^</text>
<rect x="80" y="20" width="130" height="40" rx="6" fill="none" stroke="currentColor"/><text x="145" y="47">Erreur</text>
<rect x="220" y="20" width="80" height="40" rx="6" fill="none" stroke="currentColor"/><text x="260" y="47">.*</text>
<rect x="310" y="20" width="110" height="40" rx="6" fill="none" stroke="currentColor"/><text x="365" y="47">[0-9]</text>
<rect x="430" y="20" width="50" height="40" rx="6" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F"/><text x="455" y="47">$</text>
</g>
<g font-family="sans-serif" font-size="12" text-anchor="middle" fill="currentColor">
<text x="45" y="85">début</text><text x="145" y="85">le mot exact</text><text x="260" y="85">n'importe quoi</text><text x="365" y="85">un chiffre</text><text x="455" y="85">fin</text>
<text x="560" y="40">« Erreur disque 3 »</text><text x="560" y="60" fill="#D9824F">trouvée</text>
</g>
</svg>
```

```html
<table>
<tr><th>Quantificateur</th><th>Sens</th><th>En BRE (grep)</th><th>En ERE (grep -E)</th></tr>
<tr><td>0 ou plus</td><td>répété ou absent</td><td><code>*</code></td><td><code>*</code></td></tr>
<tr><td>1 ou plus</td><td>au moins une fois</td><td><code>\+</code></td><td><code>+</code></td></tr>
<tr><td>0 ou 1</td><td>facultatif</td><td><code>\?</code></td><td><code>?</code></td></tr>
<tr><td>exactement n</td><td><code>a{3}</code> = aaa</td><td><code>\{3\}</code></td><td><code>{3}</code></td></tr>
<tr><td>entre n et m</td><td>au moins n, au plus m</td><td><code>\{n,m\}</code></td><td><code>{n,m}</code></td></tr>
</table>
```

Sans ancre, le motif peut être n'importe où : `error` trouve « my_error_log ». `^error$` ne trouve que la ligne exactement égale à « error ».

Exemple chiffré : `[0-9]{3}-[0-9]{2}` (en ERE) reconnaît « 123-45 » (3 chiffres, un tiret, 2 chiffres).

> [!attention] La diapo donne `.log$` pour « lignes se terminant par .log ». Le point non échappé veut dire « n'importe quel caractère » : `.log$` trouve aussi « catalog » ou « xlog ». La version exacte est `\.log$`. Vérifié : `grep 'log.log'` trouve à la fois « log.log » et « logxlog ».

## Idée 3 · grep, BRE et ERE

```etapes Choisir la bonne commande
Tu utilises seulement . * ^ $ [ ] :: `grep 'motif' fichier` suffit (BRE).
Tu utilises + ? { } ou | :: soit tu échappes en BRE (`\+`, `\?`), soit tu passes en ERE avec `grep -E` (ou `egrep`).
Tu protèges la regex :: mets-la entre **simples quotes** pour que le shell ne touche pas à `*`, `$`, `[`.
Tu testes :: sur un petit fichier, et tu regardes aussi les lignes qui NE doivent PAS sortir.
```

Exemple du TD 1 : un mot qui commence par une majuscule, suivi de minuscules, et finit par un point.

```bash nontest
grep -E '^[A-Z][a-z]+\.$' texte.txt     # ERE : + direct
grep '^[A-Z][a-z]\+\.$' texte.txt       # BRE : + échappé
grep '^[A-Z][a-z]+\.$' texte.txt        # BRE avec + non échappé : + est un caractère normal
```

Sur un fichier contenant « Bonjour. », les deux premières commandes l'affichent ; la troisième ne trouve rien (elle cherche un vrai `+`).

Autres exemples du cours : `grep '^[^#]' fichier` (lignes qui ne commencent pas par `#`), `grep -v '^#' /etc/hosts` (lignes non commentées).

## Idée 4 · Les motifs du shell (globbing)

Pour **nommer des fichiers** dans `ls`, `cp`, `rm`, c'est le shell qui développe les motifs, avant la commande :

```html
<table>
<tr><th>Motif shell</th><th>Sens</th><th>Équivalent regex</th></tr>
<tr><td><code>*</code></td><td>n'importe quelle suite (même vide)</td><td><code>.*</code></td></tr>
<tr><td><code>?</code></td><td>exactement un caractère</td><td><code>.</code></td></tr>
<tr><td><code>[0-9]</code></td><td>un caractère de la liste</td><td><code>[0-9]</code></td></tr>
</table>
```

Exemple du TD 1. Fichiers : rapport_2020.txt, rapport_2021.txt, rapport_2022.bak, rapport_2023.txt, rapport_final.txt, backup.rapport, notes.txt…

- `ls rapport_*.txt` → rapport_2020.txt, rapport_2021.txt, rapport_2023.txt, rapport_final.txt.
- `ls *[0-9][0-9][0-9][0-9]*` → les quatre fichiers rapport_20xx (y compris le .bak).

> [!attention] La correction du TD 1 range `rapport_2022.txt` dans le résultat de `ls rapport_*.txt`. Ce fichier n'existe pas : c'est `rapport_2022.bak`, qui ne se termine pas par `.txt`. Le bon résultat compte **4** fichiers, pas 5.

## S'exercer

```exercice Exercices du TD 1 et de l'examen blanc
? Écris une regex qui identifie les lignes commençant par « Erreur » et se terminant par un chiffre (question 24 de l'examen blanc).
= `^Erreur.*[0-9]$` (ou `^Erreur.*[[:digit:]]$`). Commande : `grep '^Erreur.*[0-9]$' fichier`.

? Explique la différence entre `*`, `.*` et `.+`.
= `*` : 0 ou plusieurs fois le caractère **précédent** (`ab*` = a, ab, abb…). `.*` : n'importe quelle suite de caractères, éventuellement vide. `.+` : au moins un caractère quelconque (en ERE ; `.\+` en BRE).

? Combien de lignes sort `grep -c '^[^#]' f`, si f contient : « # titre », « ali », « (ligne vide) », « #fin », « 42 » ?
reponse: 2
= `^[^#]` exige un premier caractère qui n'est pas `#`. « ali » et « 42 » conviennent. La ligne vide n'a pas de premier caractère, donc elle ne correspond pas. Réponse : **2**.

? Écris une commande qui affiche les lignes de notes.txt contenant une adresse e-mail.
= `grep '[a-zA-Z0-9._-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}' notes.txt` en BRE, ou `grep -E '[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' notes.txt` en ERE.
```

## Flashcards

```cartes
Le . dans une regex :: N'importe quel caractère (un seul). Pour un vrai point : \.
Le * dans une regex :: 0, 1 ou plusieurs fois le caractère précédent.
Le * dans le shell (ls *.txt) :: N'importe quelle suite de caractères dans un nom de fichier.
^ et $ :: Début et fin de ligne. ^$ = ligne vide.
[^0-9] :: Un caractère qui n'est pas un chiffre (^ au début des crochets = négation).
BRE ou ERE pour + ? { } :: En grep simple (BRE) il faut \+ \? \{ \} ; avec grep -E (ERE) on les écrit directement.
Regex : ligne commençant par Erreur et finissant par un chiffre :: ^Erreur.*[0-9]$
Classe POSIX des chiffres :: [[:digit:]]
```

## QCM du chapitre

```qcm
? Que signifie `.` dans une expression régulière ?
- Le répertoire courant
+ N'importe quel caractère
- La fin de la ligne
= Le `.` désigne un caractère quelconque. Le répertoire courant, c'est dans un chemin.

? Quelle regex trouve les lignes commençant par « Erreur » et finissant par un chiffre ?
- `Erreur*[0-9]`
+ `^Erreur.*[0-9]$`
- `$Erreur.*[0-9]^`
- `^Erreur[0-9]`
= `^` au début, `.*` pour le milieu, `[0-9]` puis `$` à la fin.

? `ab*c` correspond à :
+ ac, abc, abbc
- uniquement abc
- ab suivi de n'importe quoi puis c
= `*` porte sur le `b` qui précède : 0 ou plusieurs b.

? Avec `grep` sans option, comment écrire « une ou plusieurs lettres minuscules » ?
- `[a-z]+`
+ `[a-z]\+`
- `[a-z]*`
= En BRE, `+` doit être échappé. `[a-z]*` accepte aussi zéro lettre.

? Que trouve `[^0-9]` ?
- Une ligne qui commence par un chiffre
+ Un caractère qui n'est pas un chiffre
- Un chiffre en début de ligne
= `^` juste après `[` signifie la négation. Hors crochets, `^` est l'ancre de début.

? Quelle regex désigne une ligne vide ?
+ `^$`
- `^$$`
- `.*`
= Début immédiatement suivi de fin. `^$$` (diapo) est une coquille.

? Que liste `ls *[0-9][0-9][0-9][0-9]*` ?
- Les fichiers dont le nom fait 4 caractères
+ Les fichiers dont le nom contient 4 chiffres consécutifs
- Les fichiers qui commencent par 4 chiffres
= `*` avant et après autorise n'importe quel préfixe et suffixe.

? Quelle option de grep active les expressions régulières étendues ?
- `-i`
- `-v`
+ `-E`
= `-E` (ou `egrep`). `-i` ignore la casse, `-v` inverse la sélection.

? `[0-9]{3}-[0-9]{2}` (ERE) reconnaît :
- 12-345
+ 123-45
- 1234-5
= 3 chiffres, un tiret, 2 chiffres.

? Pourquoi écrire `\.log$` plutôt que `.log$` ?
+ Parce que `.` non échappé accepte n'importe quel caractère
- Parce que `$` doit toujours être précédé de `\`
- Il n'y a aucune différence
= `.log$` trouverait aussi « catalog ».
```

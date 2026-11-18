---
id: revision-examen-blanc
titre: Révision et examen blanc
seance: Examen blanc du Pr El Amrani (TD 6) · 1 h 30
importance: 5
---

## Avant de commencer

Ce chapitre reprend l'**examen blanc distribué par le prof** (TD 6, corrigé le 29 décembre 2025). Il faut avoir fait les QCM des chapitres 1 à 9.

```exercice Vérifie ton prérequis
? Combien vaut une question de cours à l'examen blanc, et combien y en a-t-il ?
= 20 questions à réponse unique (QCU), 0,4 point chacune : **8 points** sur 20.
```

## Comment aborder ce chapitre

> [!astuce] Le barème de l'examen blanc : QCU 8 pts, exercices 1 à 4 (2 pts chacun) sur chemins/liens/regex, utilisateurs/fichiers, archives/droits/redirections, processus, puis **un script de 4 pts**. Passe 20 minutes maximum sur les QCU pour garder du temps pour le script.

> [!piege] Écrire des commandes approximatives. À l'écrit, une option fausse (`-G` au lieu de `-aG`, `tar -cf` au lieu de `-czf`) coûte toute la question. Apprends les formes exactes.

À la fin, tu as fait l'examen blanc dans les conditions et tu sais écrire le script final sans le piège de la boucle `for`.

## Idée 1 · Les formes exactes à connaître par cœur

```html
<table>
<tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Lien symbolique « rapport » vers /home/etu/docs/rapport.pdf</td><td><code>ln -s /home/etu/docs/rapport.pdf rapport</code></td></tr>
<tr><td>Regex : commence par Erreur, finit par un chiffre</td><td><code>^Erreur.*[0-9]$</code></td></tr>
<tr><td>Utilisateur dev1 : home, bash, groupe principal dev</td><td><code>useradd -m -s /bin/bash -g dev dev1</code></td></tr>
<tr><td>Ajouter dev1 à sudo sans perdre ses groupes</td><td><code>usermod -aG sudo dev1</code></td></tr>
<tr><td>Chemin absolu du répertoire courant</td><td><code>pwd</code></td></tr>
<tr><td>Archiver et compresser /var/log</td><td><code>tar -czf logs.tar.gz /var/log</code></td></tr>
<tr><td>chmod 640</td><td><code>rw-r-----</code></td></tr>
<tr><td>grep sans les erreurs</td><td><code>grep "404" access.log 2&gt;/dev/null</code></td></tr>
<tr><td>5 dernières lignes en temps réel</td><td><code>tail -n 5 -f data.csv</code></td></tr>
<tr><td>Tuer tous les python</td><td><code>killall python</code> ou <code>pkill python</code></td></tr>
</table>
```

## Idée 2 · Le script de l'examen (question 35)

Consigne : `analyse.sh` prend un nom de fichier, vérifie qu'il existe et est lisible, affiche le nombre de lignes et le nombre de lignes contenant « erreur » (sans casse), puis les 3 premières lignes numérotées avec une boucle `for`.

```etapes Construire le script
Contrôler les arguments :: `if [ $# -ne 1 ]; then echo "Usage: $0 <fichier>"; exit 1; fi`
Contrôler le fichier :: `if [ ! -f "$fichier" ] || [ ! -r "$fichier" ]; then … exit 2; fi`
Compter :: `total=$(wc -l < "$fichier")` et `erreurs=$(grep -ic "erreur" "$fichier")`
Boucler sur les lignes :: découper sur les retours à la ligne (`IFS=$'\n'`) avant `for ligne in $(head -n 3 "$fichier")`.
Numéroter :: `n=$((n + 1))` puis `echo "$n: $ligne"`.
```

```bash nontest
#!/bin/bash
if [ $# -ne 1 ]; then
  echo "Usage: $0 <fichier>"
  exit 1
fi
fichier="$1"
if [ ! -f "$fichier" ] || [ ! -r "$fichier" ]; then
  echo "Erreur: '$fichier' n'existe pas ou n'est pas lisible."
  exit 2
fi
total=$(wc -l < "$fichier")
erreurs=$(grep -ic "erreur" "$fichier")
echo "Nombre total de lignes : $total"
echo "Lignes contenant 'erreur' : $erreurs"
echo "3 premières lignes :"
n=0
IFS=$'\n'
for ligne in $(head -n 3 "$fichier"); do
  n=$((n + 1))
  echo "$n: $ligne"
done
```

Sur un fichier de 4 lignes « Demarrage ok / ERREUR disque / fin du test / erreur 2 », il affiche (vérifié) :

```text
Nombre total de lignes : 4
Lignes contenant 'erreur' : 2
3 premières lignes :
1: Demarrage ok
2: ERREUR disque
3: fin du test
```

> [!attention] La correction distribuée écrit `for ligne in $(head -n 3 "$fichier")` **sans** changer `IFS`. Le shell découpe alors aux espaces : la boucle parcourt des **mots** (« 1: Demarrage », « 2: ok »…), pas des lignes (vérifié). Ajoute `IFS=$'\n'` avant la boucle, ou utilise `head -n 3 "$fichier" | while read ligne`. Si la consigne impose `for`, garde la version avec IFS.

> [!attention] L'en-tête de l'examen blanc porte « 2024-2025, semestre II, M9 », alors que le module est le M17 du S3 2025-2026. Ce n'est qu'une erreur d'en-tête : le contenu correspond bien au cours de cette année.

## S'exercer

```exercice Exercices 1 à 4 de l'examen blanc (8 points)
? Q21. Différence entre chemin absolu et chemin relatif, avec un exemple.
= Absolu : commence par `/`, indépendant du répertoire courant (`/home/user/doc.txt`). Relatif : dépend du répertoire courant (`doc.txt`, `../backup/file`).

? Q23. Suppression de la cible d'un lien physique ? d'un lien symbolique ?
= Physique : données toujours accessibles par l'autre nom. Symbolique : lien cassé.

? Q27. Différence entre rmdir et rm -r.
= `rmdir` : répertoires vides uniquement. `rm -r` : supprime récursivement le répertoire et tout son contenu.

? Q30. Droits lisibles de chmod 640.
= Propriétaire `rw-`, groupe `r--`, autres `---`.

? Q33. À quoi sert `ps aux | grep firefox` ?
= À afficher les processus dont la ligne contient « firefox », pour vérifier s'il tourne (et récupérer son PID).
```

## Flashcards

```cartes
Barème de l'examen blanc :: 20 QCU × 0,4 = 8 pts ; 4 exercices × 2 pts ; script 4 pts. Durée 1 h 30.
Ajouter à sudo sans écraser :: usermod -aG sudo dev1
Archiver /var/log :: tar -czf logs.tar.gz /var/log
for sur les lignes d'une commande :: Mettre IFS=$'\n' avant, sinon la boucle parcourt des mots.
Vérifier qu'un fichier existe et est lisible :: [ -f "$f" ] && [ -r "$f" ]
Compter les lignes contenant un mot sans casse :: grep -ic "mot" fichier
```

## QCM du chapitre

```qcm
? (Q2) Quel système historique a introduit la philosophie « tout est fichier » ?
+ Unix
- GM-NAA I/O
- MS-DOS
- Windows 3.1
= Unix (1969). GM-NAA I/O est le premier SE batch.

? (Q3) Illusion d'une mémoire plus grande que la RAM :
- la défragmentation
- la pagination externe
+ la mémoire virtuelle
- le swapping des processus terminés
= Pages en swap, rechargées lors d'une faute de page.

? (Q5) La philosophie Unix :
+ Chaque programme fait une seule chose, mais la fait bien
- Un seul outil doit tout faire
- L'interface graphique est essentielle
- Les données doivent être en binaire
= KISS et petits outils combinés par des pipes.

? (Q7) Créer un lien symbolique :
- `cp -s cible lien`
+ `ln -s cible lien`
- `ln cible lien`
- `link cible lien`
= `ln` seul = lien physique.

? (Q10) Informations de base des utilisateurs (UID, home, shell) :
+ /etc/passwd
- /etc/shadow
- /etc/group
- /etc/users
= shadow = mots de passe chiffrés.

? (Q12) Archiver et compresser en une commande :
- `gzip repertoire/`
+ `tar -czf archive.tar.gz repertoire/`
- `tar -cf archive.tar.gz repertoire/`
- `zip -r archive.tar.gz repertoire/`
= Il faut `z` pour la compression gzip.

? (Q15) Pourquoi `${var}60` ?
+ Pour distinguer le nom de la variable du texte adjacent
- Pour forcer l'évaluation arithmétique
- Pour protéger la variable contre la suppression
- Pour exporter la variable
= Sans accolades, le shell chercherait `var60`.

? (Q17) Dans "...", quels caractères restent interprétés ?
- `>`, `|`, `;`
- Tous
+ `$`, `\`, `"`, `` ` ``
- Aucun
= Les autres caractères spéciaux sont neutralisés.

? (Q19) PID du script en cours :
- `$!`
- `$?`
+ `$$`
- `$PID`
= `$!` : dernier processus en arrière-plan ; `$?` : code retour.

? Dans le script de la Q35, que parcourt `for ligne in $(head -n 3 f)` sans changer IFS ?
- Les 3 premières lignes
+ Les mots des 3 premières lignes
- Le nom du fichier
= Le découpage par défaut se fait aux espaces, tabulations et retours à la ligne.

? `[ ! -f "$f" ] || [ ! -r "$f" ]` est vrai si :
+ f n'est pas un fichier ordinaire, ou n'est pas lisible
- f est un fichier lisible
- f est un répertoire lisible seulement
= C'est la condition d'erreur du script : on quitte avec exit 2.
```

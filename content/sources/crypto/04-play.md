---
id: play
titre: Playfair
seance: Partie 1
importance: 3
---

```html
<h3>L'idée</h3>
<p>Playfair chiffre les lettres <b>deux par deux</b> (substitution <b>polygrammique</b>). Une même paire de lettres donne toujours la même paire chiffrée, mais il y a 25×25 = <b>625 paires</b> possibles au lieu de 26 lettres. L'analyse de fréquences devient bien plus difficile et demande un texte très long.</p>
<h3>Étape 1 : construire la grille 5×5</h3>
<p>On écrit le mot-clé sans répéter les lettres, puis le reste de l'alphabet dans l'ordre. Comme 26 lettres ne tiennent pas dans 25 cases, <b>dans la version du prof, on supprime W et on le remplace par V</b>. (La version anglaise garde W et fusionne I et J.)</p>
<p>Clé « exemple playfair » : E X M P L A Y F I R (sans doublons), puis B C D G H J K N O Q S T U V Z :</p>
<div class="scroll"><table class="t"><tr><td>E</td><td>X</td><td>M</td><td>P</td><td>L</td></tr><tr><td>A</td><td>Y</td><td>F</td><td>I</td><td>R</td></tr><tr><td>B</td><td>C</td><td>D</td><td>G</td><td>H</td></tr><tr><td>J</td><td>K</td><td>N</td><td>O</td><td>Q</td></tr><tr><td>S</td><td>T</td><td>U</td><td>V</td><td>Z</td></tr></table></div>
<h3>Étape 2 : découper le message en paires</h3>
<p>« Cache l'or dans la souche de l'arbre » → CA CH EL OR DA NS LA SO UC HE DE LA RB RE. Si une paire contient deux lettres identiques (ex. « LL »), on insère un <b>X</b> après la première lettre : LX, puis on continue avec le L suivant. Si une lettre reste seule à la fin, on lui ajoute un X.</p>
<h3>Étape 3 : chiffrer chaque paire avec 3 règles</h3>
<ol>
<li><b>Même ligne</b> : chaque lettre est remplacée par celle <b>à sa droite</b> (on revient au début de la ligne si besoin). CH : C et H sont sur la ligne B C D G H. C → D, H → (bord) → B. Résultat <b>DB</b>.</li>
<li><b>Même colonne</b> : chaque lettre est remplacée par celle <b>en dessous</b> (on revient en haut si besoin). Exemple : MU dans la colonne M F D N U → M devient F, U devient (bas) M → FM.</li>
<li><b>Rectangle</b> (ni même ligne ni même colonne) : les deux lettres forment deux coins d'un rectangle. Chaque lettre est remplacée par le coin <b>situé sur sa propre ligne</b>, dans la colonne de l'autre lettre. CA : C est ligne 3, colonne 2 ; A est ligne 2, colonne 1. C prend la lettre de sa ligne dans la colonne de A → B. A prend la lettre de sa ligne dans la colonne de C → Y. Résultat <b>BY</b>.</li>
</ol>
<p>Le prof obtient BY DB XE QI BF JU ER VJ TD BL BM ER AH AL. Refais les 4 premières paires à la main avec la grille, puis vérifie avec la machine, qui indique la règle utilisée pour chaque paire.</p>
<h3>Déchiffrer</h3>
<p>Mêmes règles, à l'envers : même ligne → à <b>gauche</b> ; même colonne → <b>au-dessus</b> ; rectangle → coins opposés (la règle ne change pas). On retire ensuite les X qui n'ont pas de sens.</p>
```

## S'exercer : exercices guidés et labo

```integre crypto-farchane-outils.html#play
cible: [data-tab="play"]
garder: .guided,.bench
```

## Flashcards

```cartes
{play@25} Comment remplit-on la grille Playfair ? :: Le mot-clé sans doublons, puis le reste de l'alphabet. Version du prof : le W est supprimé et remplacé par V (25 lettres).
{play@26} Deux lettres identiques dans une paire ? :: On insère un X entre elles. Idem pour une lettre seule en fin de message.
{play@27} Playfair, même ligne ? :: Chaque lettre est remplacée par celle à sa droite (on boucle en fin de ligne).
{play@28} Playfair, même colonne ? :: Chaque lettre est remplacée par celle en dessous (on boucle en bas).
{play@29} Playfair, ni même ligne ni même colonne ? :: Coins opposés du rectangle, en restant sur la ligne de chaque lettre.
{play@30} Comment déchiffre-t-on en Playfair ? :: Gauche, dessus, et la même règle du rectangle ; puis on retire les X de remplissage.
{play@31} Pourquoi Playfair est-il plus solide que César ? :: Il chiffre des digrammes : 25² = 625 paires possibles au lieu de 26 lettres.
```

## Réponses courtes

```exercice
? {play} Dans la version Playfair du prof, quelle lettre remplace W ?
reponse: V
= W est supprimé de la grille et remplacé par V.
? {play} Grille « exemple playfair » : chiffre la paire CH.
reponse: DB
= Même ligne B C D G H : C→D, H→ on revient au début → B.
? {play} Même grille : chiffre la paire EL.
reponse: XE
= Même ligne E X M P L : E→X, L→ retour au début → E.
? {play} Même grille : chiffre la paire CA.
reponse: BY
= Rectangle : C garde sa ligne et prend la colonne de A → B ; A garde sa ligne et prend la colonne de C → Y.
? {play} Combien de digrammes (paires) possibles dans Playfair ?
reponse: 625
= 25 × 25 = 625.
```

## QCM du chapitre

```qcm
? {play} Deux lettres sur la même ligne sont remplacées par :
- celles en dessous
+ celles à droite
- les coins opposés
- celles à gauche
= À droite au chiffrement, à gauche au déchiffrement.

? {play} Le message contient « LL » dans une même paire. On :
- supprime un L
+ insère un X : LX
- remplace par W
- laisse LL
= On insère un X après la première lettre, puis on continue.
```

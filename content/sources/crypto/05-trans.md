---
id: trans
titre: Transposition
seance: Partie 1
importance: 3
---

```html
<h3>L'idée</h3>
<p>Jusqu'ici, on <b>remplaçait</b> les lettres (substitution). La transposition garde les mêmes lettres mais <b>change leur ordre</b>, comme une anagramme organisée. Conséquence importante : les fréquences des lettres restent celles du français (beaucoup de E), ce qui révèle qu'il s'agit d'une transposition.</p>
<h3>Transposition simple par colonnes</h3>
<p>On écrit le message <b>en lignes</b> dans une grille de taille fixée, puis on le lit <b>en colonnes</b>, de gauche à droite.</p>
<p>Exemple : « BONJOUR » dans une grille de 3 colonnes :</p>
<div class="scroll"><table class="t"><tr><td>B</td><td>O</td><td>N</td></tr><tr><td>J</td><td>O</td><td>U</td></tr><tr><td>R</td><td>X</td><td>X</td></tr></table></div>
<p>On complète la dernière ligne avec des lettres de remplissage (X). Lecture par colonnes : BJR OOX NUX. Le prof fait de même avec « faculte polydisciplinaire de beni mellal » dans une grille 6×6 → Feiidm apsnee… Pour déchiffrer, on fait l'inverse : on remplit les colonnes et on lit en lignes.</p>
<h3>Transposition complexe par colonnes (avec clé)</h3>
<p>La clé est un mot qui indique <b>dans quel ordre lire les colonnes</b>.</p>
<ol>
<li>Numéroter les lettres de la clé selon l'ordre alphabétique. La première dans l'alphabet reçoit 1, la suivante 2, etc. À lettres égales, celle de gauche passe d'abord.</li>
<li>Écrire le message en lignes sous la clé (une colonne par lettre de la clé).</li>
<li>Lire la colonne numéro 1, puis la 2, puis la 3…</li>
</ol>
<p><b>Numérotation de DELIVRANCE</b> : les lettres triées sont A, C, D, E, E, I, L, N, R, V. Donc A=1, C=2, D=3, le premier E=4, le second E=5, I=6, L=7, N=8, R=9, V=10. Dans l'ordre du mot : D3 E4 L7 I6 V10 R9 A1 N8 C2 E5.</p>
<p>« VENEZ NOUS AIDER AU PORT DE BREST » écrit en lignes de 10 :</p>
<div class="scroll"><table class="t"><tr><th>D</th><th>E</th><th>L</th><th>I</th><th>V</th><th>R</th><th>A</th><th>N</th><th>C</th><th>E</th></tr><tr><th>3</th><th>4</th><th>7</th><th>6</th><th>10</th><th>9</th><th>1</th><th>8</th><th>2</th><th>5</th></tr><tr><td>V</td><td>E</td><td>N</td><td>E</td><td>Z</td><td>N</td><td>O</td><td>U</td><td>S</td><td>A</td></tr><tr><td>I</td><td>D</td><td>E</td><td>R</td><td>A</td><td>U</td><td>P</td><td>O</td><td>R</td><td>T</td></tr><tr><td>D</td><td>E</td><td>B</td><td>R</td><td>E</td><td>S</td><td>T</td><td>X</td><td>X</td><td>X</td></tr></table></div>
<p>Colonne 1 (sous A) : OPT. Colonne 2 (sous C) : SRX. Colonne 3 (sous D) : VID… On obtient <b>OPT SRX VID EDE ATX ERR NEB UOX NUS ZAE</b>. Le prof a mis d'autres lettres de remplissage (SRY, ATZ), ce qui est aussi correct.</p>
<p><b>Déchiffrer</b> : nombre de lignes = longueur du message ÷ longueur de la clé. On découpe le chiffré en morceaux de cette taille, on place le 1er morceau dans la colonne n°1, le 2e dans la colonne n°2…, puis on lit en lignes.</p>
```

## S'exercer : exercices guidés et labo

```integre crypto-farchane-outils.html#trans
cible: [data-tab="trans"]
garder: .guided,.bench
```

## Flashcards

```cartes
{trans@32} Principe de la transposition ? :: On ne change pas les lettres, on change leur ordre : le chiffré est une anagramme du clair.
{trans@33} Transposition simple ? :: On écrit le message en lignes dans une grille, puis on lit en colonnes, de gauche à droite.
{trans@34} Transposition à clé ? :: La clé numérote ses colonnes selon l'ordre alphabétique de ses lettres (à lettres égales, de gauche à droite), puis on lit les colonnes dans l'ordre 1, 2, 3…
{trans@35} Numérotation de DELIVRANCE ? :: D3 E4 L7 I6 V10 R9 A1 N8 C2 E5.
{trans@36} Qu'est-ce qu'une transposition conserve ? :: Les lettres elles-mêmes et leur nombre, donc les fréquences. Seul l'ordre change.
{trans@37} Convention de permutation du TD1 ? :: c\_j = m\_K\[j\] : la j-ème lettre du bloc chiffré est la lettre n° K\[j\] du bloc clair.
{trans@38} Comment trouve-t-on la clé inverse d'une permutation ? :: Si K\[i\] = v, alors K⁻¹\[v\] = i.
{trans@39} Les lettres de remplissage de la dernière ligne sont-elles imposées ? :: Non, elles sont libres : le prof met des lettres arbitraires, des X marchent aussi. Précise ton choix sur la copie.
```

## Réponses courtes

```exercice
? {trans} Transposition simple : écris BONJOUR dans 3 colonnes (remplissage X) et lis par colonnes (sans espace).
reponse: BJROOXNUX
= Grille BON / JOU / RXX ; colonnes BJR, OOX, NUX.
? {trans} Numérote les lettres de la clé CAB (réponds avec 3 chiffres, dans l'ordre du mot).
reponse: 312
= A est 1re dans l'alphabet, B 2e, C 3e. Dans l'ordre C A B : 3 1 2.
? {trans} Chiffre ATTAQUE avec la clé CAB (remplissage X, sans espace).
reponse: TQXTUXAAE
= Lignes ATT / AQU / EXX. Colonne 1 (sous A) = TQX, colonne 2 (sous B) = TUX, colonne 3 (sous C) = AAE.
? {trans} Dans la clé DELIVRANCE, quel numéro reçoit la lettre A ?
reponse: 1
= A est la première lettre dans l'ordre alphabétique.
```

## QCM du chapitre

```qcm
? {trans} Après une transposition, les fréquences des lettres :
- sont totalement brouillées
+ sont identiques à celles du clair
- deviennent uniformes
- dépendent de la clé
= On ne change que l'ordre des lettres, pas les lettres elles-mêmes.
```

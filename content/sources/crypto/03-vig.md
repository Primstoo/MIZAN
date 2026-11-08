---
id: vig
titre: Vigenère
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 115" role="img" aria-label="Vigenère TCHAD clé CLE" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><text x="20" y="30" font-size="11">Message</text><text x="20" y="62" font-size="11">Clé répétée</text><text x="20" y="94" font-size="11">Chiffré</text><rect x="120" y="14" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="140" y="32" text-anchor="middle" font-family="var(--mono)" font-weight="700">T</text><rect x="120" y="46" width="40" height="26" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="140" y="64" text-anchor="middle" font-family="var(--mono)" font-weight="700">C</text><rect x="120" y="78" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="140" y="96" text-anchor="middle" font-family="var(--mono)" font-weight="700">V</text><rect x="164" y="14" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="184" y="32" text-anchor="middle" font-family="var(--mono)" font-weight="700">C</text><rect x="164" y="46" width="40" height="26" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="184" y="64" text-anchor="middle" font-family="var(--mono)" font-weight="700">L</text><rect x="164" y="78" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="184" y="96" text-anchor="middle" font-family="var(--mono)" font-weight="700">N</text><rect x="208" y="14" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="228" y="32" text-anchor="middle" font-family="var(--mono)" font-weight="700">H</text><rect x="208" y="46" width="40" height="26" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="228" y="64" text-anchor="middle" font-family="var(--mono)" font-weight="700">E</text><rect x="208" y="78" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="228" y="96" text-anchor="middle" font-family="var(--mono)" font-weight="700">L</text><rect x="252" y="14" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="272" y="32" text-anchor="middle" font-family="var(--mono)" font-weight="700">A</text><rect x="252" y="46" width="40" height="26" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="272" y="64" text-anchor="middle" font-family="var(--mono)" font-weight="700">C</text><rect x="252" y="78" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="272" y="96" text-anchor="middle" font-family="var(--mono)" font-weight="700">C</text><rect x="296" y="14" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="316" y="32" text-anchor="middle" font-family="var(--mono)" font-weight="700">D</text><rect x="296" y="46" width="40" height="26" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="316" y="64" text-anchor="middle" font-family="var(--mono)" font-weight="700">L</text><rect x="296" y="78" width="40" height="26" fill="var(--panel)" stroke="var(--line)"/><text x="316" y="96" text-anchor="middle" font-family="var(--mono)" font-weight="700">O</text><text x="360" y="32" font-size="11">T(19) + C(2) = 21 → V</text><text x="360" y="64" font-size="11">Le même T chiffré ailleurs avec une</text><text x="360" y="80" font-size="11">autre lettre de clé donnera une autre lettre :</text><text x="360" y="96" font-size="11">l'analyse de fréquences simple ne marche plus.</text></svg></figure>
<h3>Le problème de César et de l'affine</h3>
<p>Une même lettre claire donne toujours la même lettre chiffrée, donc les fréquences de la langue se voient dans le chiffré. Vigenère règle ce problème en changeant de décalage à chaque lettre : c'est une substitution <b>polyalphabétique</b>.</p>
<h3>Comment ça marche</h3>
<p>La clé est un mot, par exemple FPBM. On l'écrit sous le message en la répétant autant de fois que nécessaire. Chaque lettre de la clé donne le décalage (F=5, P=15, B=1, M=12), puis on fait un César avec ce décalage sur la lettre du dessus.</p>
<p><span class="f">cᵢ = (pᵢ + kᵢ) mod 26</span> &nbsp; <span class="f">pᵢ = (cᵢ − kᵢ) mod 26</span></p>
<p><b>Exemple du prof</b>, « CHIFFRE… » avec FPBM :<br>C(2) + F(5) = 7 → H<br>H(7) + P(15) = 22 → W<br>I(8) + B(1) = 9 → J<br>F(5) + M(12) = 17 → R<br>F(5) + F(5) = 10 → K (la clé recommence)<br>On obtient HWJRK… Remarque : les deux F de « CHIFF » donnent R puis K. La même lettre est chiffrée différemment, donc les fréquences sont brouillées.</p>
<p><b>Le carré de Vigenère</b> (diapo 30) est un tableau 26×26 qui évite de calculer : ligne = lettre de la clé, colonne = lettre claire, intersection = lettre chiffrée. Le calcul avec les numéros donne exactement le même résultat.</p>
<h3>L'image à retenir : des roues de César qui tournent</h3>
<p>César, c'est <b>une seule roue</b> : toutes les lettres sont décalées du même nombre. Vigenère, c'est <b>plusieurs roues utilisées à tour de rôle</b>. Avec la clé CLE (C=2, L=11, E=4) : 1re lettre décalée de 2, 2e de 11, 3e de 4, puis on recommence (2, 11, 4…).</p>
<p><b>Exemple : ATTAQUE avec la clé CLE</b></p>
<div class="scroll"><table class="t"><tr><th>Position</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><th>Message</th><td>A</td><td>T</td><td>T</td><td>A</td><td>Q</td><td>U</td><td>E</td></tr><tr><th>Clé répétée</th><td>C</td><td>L</td><td>E</td><td>C</td><td>L</td><td>E</td><td>C</td></tr><tr><th>Calcul</th><td>0+2</td><td>19+11=30→4</td><td>19+4</td><td>0+2</td><td>16+11=27→1</td><td>20+4</td><td>4+2</td></tr><tr><th>Chiffré</th><td class="hl">C</td><td class="hl">E</td><td class="hl">X</td><td class="hl">C</td><td class="hl">B</td><td class="hl">Y</td><td class="hl">G</td></tr></table></div>
<ul><li><b>Les deux T</b> (positions 2 et 3) deviennent <b>E</b> et <b>X</b> : la même lettre donne deux résultats différents. C'est la force de Vigenère, les fréquences sont brouillées.</li>
<li><b>Les deux A</b> (positions 1 et 4) deviennent tous les deux <b>C</b>. Normal : la clé fait 3 lettres, donc les positions 1, 4, 7… utilisent toujours <b>la même roue</b> (+2). C'est LA faille, qu'on exploite plus bas.</li></ul>
<h3>Vernam, ou masque jetable (One-Time Pad)</h3>
<p>C'est Vigenère poussé au maximum : la clé est <b>aussi longue que le message</b>, <b>totalement aléatoire</b>, <b>secrète</b> et <b>jamais réutilisée</b>. Dans ces conditions, c'est le seul système prouvé <b>inconditionnellement sûr</b>. Pourquoi ? Pour un chiffré donné, chaque message clair de même longueur est possible avec une certaine clé. Oscar n'a aucun moyen de choisir.</p>
<p>Ses défauts (diapo 34) : il faut produire d'énormes quantités de clés vraiment aléatoires, et les <b>distribuer</b> en secret à l'avance, ce qui est très difficile en pratique.</p>
<h3>Comment on casse quand même Vigenère</h3>
<p>Si la clé fait L lettres, les lettres 1, L+1, 2L+1… ont toutes été décalées de la même valeur. Chacun de ces groupes est un simple César. Méthode :</p>
<ol><li>Trouver la longueur L de la clé.</li><li>Découper le chiffré en L groupes (une lettre sur L).</li><li>Faire une analyse de fréquences sur chaque groupe, comme pour César.</li></ol>
<p>Pour trouver L, on utilise l'<b>indice de coïncidence</b> (IC), inventé par Friedman en 1920. L'IC est la probabilité que deux lettres tirées au hasard dans le texte soient identiques :</p>
<p><span class="f">IC = [n_A(n_A−1) + n_B(n_B−1) + … + n_Z(n_Z−1)] / [N(N−1)]</span>, avec n_A = nombre de A, …, et N = nombre total de lettres.</p>
<ul><li>Texte en français : IC élevé (environ 0,07 à 0,08), car certaines lettres reviennent souvent.</li><li>Texte aléatoire : IC ≈ <b>0,038</b> (environ 1/26).</li><li>Un chiffrement monoalphabétique ne change pas l'IC (il renomme les lettres sans changer leurs nombres).</li></ul>
<p><b>Test de Friedman</b> : pour chaque longueur L candidate, on découpe le chiffré en L groupes et on calcule leurs IC. Avec la bonne L, chaque groupe est un César du français, donc les IC sont élevés. Dans l'exemple du prof (diapo 60), L=4 donne 0,077 → <b>la clé fait 4 lettres</b>.</p>
<h3>Le cassage, en clair</h3>
<p>Si on connaît la longueur L de la clé (ici 3), on découpe le chiffré en L <b>paquets</b> :</p>
<ul><li>Paquet 1 = lettres 1, 4, 7, 10… : toutes décalées par la même roue, donc <b>c'est un simple César</b>.</li><li>Paquet 2 = lettres 2, 5, 8… : un autre César.</li><li>Paquet 3 = lettres 3, 6, 9… : encore un autre César.</li></ul>
<p>Chaque César se casse par analyse de fréquences (la lettre la plus fréquente du paquet vient probablement de E). On obtient les L décalages, donc la clé. <b>Tout le problème se résume à trouver L.</b></p>
<p><b>L'IC en une phrase :</b> si tu pioches deux lettres au hasard dans un texte, quelle est la probabilité qu'elles soient identiques ? En français, environ 0,078 (beaucoup de E, A, S, on retombe souvent sur la même lettre). Au hasard, environ 0,038 (une chance sur 26). Un César renomme les lettres sans changer leurs quantités, donc il garde l'IC du français. Un Vigenère mélange plusieurs Césars, donc il fait baisser l'IC.</p>
<p><b>Le test de Friedman, c'est essayer les longueurs une par une :</b> avec L = 2, on fait 2 paquets ; si leur IC est bas, ce n'est pas la bonne longueur. Avec L = 3, si chaque paquet a un IC proche de 0,078, chaque paquet « ressemble au français » : c'est un César pur, la clé fait 3 lettres.</p>
<div class="tip"><b>Méthode à retenir pour l'examen :</b> 1) trouver L avec l'IC (test de Friedman) ; 2) découper en L paquets ; 3) analyse de fréquences sur chaque paquet, comme pour un César.</div>
<h3>Pourquoi Vernam est vraiment incassable</h3>
<p>Vernam supprime la faille : la clé ne se répète jamais (aussi longue que le message, aléatoire, utilisée une seule fois). Il n'y a plus de paquets.</p>
<p>Oscar intercepte <b>CEXCBYG</b> chiffré avec une clé aléatoire de 7 lettres :</p>
<ul><li>si le message était ATTAQUE, la clé serait CLECLEC ;</li><li>si c'était BONJOUR, la clé serait BQKTNEP ;</li><li>si c'était DEFENSE, la clé serait ZASYOGC.</li></ul>
<p>Toutes ces clés sont aussi probables, puisque la clé est aléatoire. Oscar ne peut <b>pas</b> savoir quel message est le bon, même avec une puissance de calcul infinie : le chiffré ne lui apprend rien. C'est le sens de « inconditionnellement sûr ».</p>
<p><b>Pourquoi jamais réutilisée ?</b> Avec deux messages chiffrés par la même clé, on soustrait les deux chiffrés : la clé s'annule et il reste un mélange des deux messages, qui se casse. C'est exactement le TD1, exercice 2 : C₁ ⊕ C₂ fait disparaître la clé.</p>
<div class="tip"><b>Le résumé en 3 lignes :</b> César = 1 roue, cassé par les fréquences. Vigenère = L roues qui tournent : on trouve L avec l'IC, puis on casse chaque roue comme un César. Vernam = une roue différente pour chaque lettre, jamais réutilisée : rien à casser.</div>
```

## Flashcards

```cartes
{vig@17} Formule de Vigenère ? :: cᵢ = (pᵢ + k indice i mod L) mod 26, où L est la longueur de la clé.
{vig@18} Pourquoi l'analyse de fréquences simple échoue-t-elle sur Vigenère ? :: Un même E clair devient des lettres différentes selon sa position : le profil des fréquences est aplati.
{vig@19} Qu'est-ce que Vernam (masque jetable) ? :: Un Vigenère dont la clé est aléatoire, aussi longue que le message et jamais réutilisée. Seul système inconditionnellement sûr.
{vig@20} Les deux limites pratiques de Vernam ? :: Produire et distribuer d'énormes clés vraiment aléatoires.
{vig@21} Les 3 étapes pour casser Vigenère ? :: 1) trouver la longueur L de la clé (indice de coïncidence, test de Friedman) ; 2) couper le texte en L colonnes ; 3) chaque colonne est un simple César → fréquences.
{vig@22} Formule de l'indice de coïncidence ? :: IC = Σ nᵢ(nᵢ − 1) / (N(N − 1)).
{vig@23} Les valeurs repères de l'IC ? :: Français ≈ 0,078 ; texte aléatoire ≈ 0,038. Le bon L est celui qui donne l'IC le plus élevé.
{vig@24} Clé inverse de Vigenère ? :: k⁻¹ = 26 − k lettre par lettre (A reste A) : déchiffrer revient alors à chiffrer avec k⁻¹.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#vig)

## Réponses courtes

```exercice
? {vig} Vigenère : chiffre ABC avec la clé BD.
reponse: BED
= A+B(1)=B, B+D(3)=E, C+B(1)=D.
? {vig} Vigenère : déchiffre HW avec la clé FP.
reponse: CH
= H(7)−F(5)=2=C, W(22)−P(15)=7=H.
? {vig} IC d'un texte aléatoire (environ, 3 décimales) :
reponse: 0.038 ~0.003
= Environ 1/26 ≈ 0,038. Le français est autour de 0,07-0,08.
```

## QCM du chapitre

```qcm
? {vig} Laquelle de ces conditions est obligatoire pour un masque jetable (Vernam) ?
- Clé courte et facile à retenir
+ Clé aléatoire, aussi longue que le message, jamais réutilisée
- Clé égale au mot de passe
- Clé publique
= C'est ce qui le rend inconditionnellement sûr.

? {vig} Pourquoi l'analyse de fréquences simple ne marche pas sur Vigenère ?
- La clé est secrète
+ Une même lettre claire est chiffrée de plusieurs façons
- On utilise des chiffres
- C'est asymétrique
= Le décalage dépend de la position, donc les fréquences sont brouillées.

? {vig} Première étape pour casser un Vigenère :
+ Trouver la longueur de la clé
- Faire une force brute sur 26 clés
- Calculer un PGCD
- Inverser la clé
= Ensuite, chaque groupe est un simple César.

? {vig} Vigenère, clé CLE : quelles positions du chiffré forment le « paquet 2 » ?
- 1, 4, 7…
+ 2, 5, 8…
- 3, 6, 9…
- 2, 4, 6…
= Avec une clé de 3 lettres, les positions 2, 5, 8… sont toutes décalées par la 2e lettre de la clé (L) : c'est un César.

? {vig} Pourquoi réutiliser une clé de Vernam la rend cassable ?
- La clé devient trop courte
+ En combinant deux chiffrés, la clé s'annule
- Le message devient plus long
- On ne peut plus déchiffrer
= C₁ − C₂ (ou C₁ ⊕ C₂) fait disparaître la clé : il reste un mélange des deux messages, cassable. Voir le TD1, exercice 2.

? {vig} Une fois la longueur L de la clé trouvée, chaque paquet de lettres se casse comme…
- un Playfair
+ un César
- un Vernam
- une transposition
= Toutes les lettres d'un paquet sont décalées par la même lettre de la clé : c'est un César, cassé par analyse de fréquences.
```

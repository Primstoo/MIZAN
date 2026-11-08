---
id: cesar
titre: César et chiffrement affine
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 125" role="img" aria-label="décalage de César" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><text x="20" y="30" font-size="11">Clair</text><text x="20" y="80" font-size="11">Chiffré (k = 3)</text><rect x="110" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="119.5" y="31" text-anchor="middle" font-family="var(--mono)">A</text><rect x="110" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="119.5" y="81" text-anchor="middle" font-family="var(--mono)">D</text><rect x="130" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="139.5" y="31" text-anchor="middle" font-family="var(--mono)">B</text><rect x="130" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="139.5" y="81" text-anchor="middle" font-family="var(--mono)">E</text><rect x="150" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="159.5" y="31" text-anchor="middle" font-family="var(--mono)">C</text><rect x="150" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="159.5" y="81" text-anchor="middle" font-family="var(--mono)">F</text><rect x="170" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="179.5" y="31" text-anchor="middle" font-family="var(--mono)">D</text><rect x="170" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="179.5" y="81" text-anchor="middle" font-family="var(--mono)">G</text><rect x="190" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="199.5" y="31" text-anchor="middle" font-family="var(--mono)">E</text><rect x="190" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="199.5" y="81" text-anchor="middle" font-family="var(--mono)">H</text><rect x="210" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="219.5" y="31" text-anchor="middle" font-family="var(--mono)">F</text><rect x="210" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="219.5" y="81" text-anchor="middle" font-family="var(--mono)">I</text><rect x="230" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="239.5" y="31" text-anchor="middle" font-family="var(--mono)">G</text><rect x="230" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="239.5" y="81" text-anchor="middle" font-family="var(--mono)">J</text><rect x="250" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="259.5" y="31" text-anchor="middle" font-family="var(--mono)">H</text><rect x="250" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="259.5" y="81" text-anchor="middle" font-family="var(--mono)">K</text><rect x="270" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="279.5" y="31" text-anchor="middle" font-family="var(--mono)">I</text><rect x="270" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="279.5" y="81" text-anchor="middle" font-family="var(--mono)">L</text><rect x="290" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="299.5" y="31" text-anchor="middle" font-family="var(--mono)">J</text><rect x="290" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="299.5" y="81" text-anchor="middle" font-family="var(--mono)">M</text><rect x="310" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="319.5" y="31" text-anchor="middle" font-family="var(--mono)">K</text><rect x="310" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="319.5" y="81" text-anchor="middle" font-family="var(--mono)">N</text><rect x="330" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="339.5" y="31" text-anchor="middle" font-family="var(--mono)">L</text><rect x="330" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="339.5" y="81" text-anchor="middle" font-family="var(--mono)">O</text><rect x="350" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="359.5" y="31" text-anchor="middle" font-family="var(--mono)">M</text><rect x="350" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="359.5" y="81" text-anchor="middle" font-family="var(--mono)">P</text><rect x="370" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="379.5" y="31" text-anchor="middle" font-family="var(--mono)">N</text><rect x="370" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="379.5" y="81" text-anchor="middle" font-family="var(--mono)">Q</text><rect x="390" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="399.5" y="31" text-anchor="middle" font-family="var(--mono)">O</text><rect x="390" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="399.5" y="81" text-anchor="middle" font-family="var(--mono)">R</text><rect x="410" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="419.5" y="31" text-anchor="middle" font-family="var(--mono)">P</text><rect x="410" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="419.5" y="81" text-anchor="middle" font-family="var(--mono)">S</text><rect x="430" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="439.5" y="31" text-anchor="middle" font-family="var(--mono)">Q</text><rect x="430" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="439.5" y="81" text-anchor="middle" font-family="var(--mono)">T</text><rect x="450" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="459.5" y="31" text-anchor="middle" font-family="var(--mono)">R</text><rect x="450" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="459.5" y="81" text-anchor="middle" font-family="var(--mono)">U</text><rect x="470" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="479.5" y="31" text-anchor="middle" font-family="var(--mono)">S</text><rect x="470" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="479.5" y="81" text-anchor="middle" font-family="var(--mono)">V</text><rect x="490" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="499.5" y="31" text-anchor="middle" font-family="var(--mono)">T</text><rect x="490" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="499.5" y="81" text-anchor="middle" font-family="var(--mono)">W</text><rect x="510" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="519.5" y="31" text-anchor="middle" font-family="var(--mono)">U</text><rect x="510" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="519.5" y="81" text-anchor="middle" font-family="var(--mono)">X</text><rect x="530" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="539.5" y="31" text-anchor="middle" font-family="var(--mono)">V</text><rect x="530" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="539.5" y="81" text-anchor="middle" font-family="var(--mono)">Y</text><rect x="550" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="559.5" y="31" text-anchor="middle" font-family="var(--mono)">W</text><rect x="550" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="559.5" y="81" text-anchor="middle" font-family="var(--mono)">Z</text><rect x="570" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="579.5" y="31" text-anchor="middle" font-family="var(--mono)">X</text><rect x="570" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="579.5" y="81" text-anchor="middle" font-family="var(--mono)">A</text><rect x="590" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="599.5" y="31" text-anchor="middle" font-family="var(--mono)">Y</text><rect x="590" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="599.5" y="81" text-anchor="middle" font-family="var(--mono)">B</text><rect x="610" y="14" width="19" height="24" fill="var(--panel)" stroke="var(--line)"/><text x="619.5" y="31" text-anchor="middle" font-family="var(--mono)">Z</text><rect x="610" y="64" width="19" height="24" fill="rgba(31,95,191,.13)" stroke="var(--line)"/><text x="619.5" y="81" text-anchor="middle" font-family="var(--mono)">C</text><line x1="119" y1="38" x2="119" y2="64" stroke="var(--acc)"/><line x1="579" y1="38" x2="579" y2="64" stroke="var(--acc)"/><text x="110" y="112" font-size="11">Chaque lettre avance de 3 places, et l'alphabet « boucle » : X → A, Y → B, Z → C (c'est le « mod 26 »).</text></svg></figure>
<h3>Le chiffre de César : l'idée</h3>
<p>Jules César remplaçait chaque lettre par celle située 3 rangs plus loin dans l'alphabet : A→D, B→E, C→F… et à la fin on boucle : X→A, Y→B, Z→C. Le nombre de rangs (ici 3) est la <b>clé k</b>. C'est un chiffrement par <b>substitution</b> (on remplace des lettres par d'autres) et <b>monoalphabétique</b> (une lettre claire donne toujours la même lettre chiffrée).</p>
<h3>Avec des nombres</h3>
<p>On remplace chaque lettre par son numéro p (A=0 … Z=25) :</p>
<p><span class="f">Chiffrement : c = (p + k) mod 26</span> &nbsp; <span class="f">Déchiffrement : p = (c − k) mod 26</span></p>
<p><b>Exemple guidé</b> : chiffrer « BON » avec k=3.<br>B=1 → 1+3=4 → E. &nbsp;O=14 → 17 → R. &nbsp;N=13 → 16 → Q. Résultat : <b>ERQ</b> (le prof trouve « ERQMR… » pour « bonjour »).<br>Lettre en fin d'alphabet : Y=24 → 24+3=27 → 27 mod 26 = 1 → B.</p>
<p><b>Déchiffrer « FKLII » avec k=3</b> : F=5 → 2 → C, K=10 → 7 → H, L=11 → 8 → I, I=8 → 5 → F. On obtient « CHIFF… ». Si le calcul donne un nombre négatif, on ajoute 26 : B=1 → 1−3 = −2 → 24 → Y.</p>
<h3>Pourquoi César est faible</h3>
<ul>
<li><b>Force brute</b> : il n'y a que <b>26 clés</b> (l'espace de clés |K| = 26). Oscar essaie les 26 et garde celle qui donne du français. C'est ce que fait le bouton « Force brute » de la machine.</li>
<li><b>Analyse de fréquences</b> : en français, E est la lettre la plus fréquente (puis A, S, I…), W la plus rare. Dans un chiffré César, la lettre la plus fréquente correspond probablement à E. Exemple du prof (diapo 19) : HMNKK WJIJH JXFW. J apparaît le plus, J=9, E=4, donc k = 9−4 = <b>5</b>, et on obtient « CHIFFRE DE CESAR ». Cela ne marche bien que sur un texte assez long. Les paires (ES, LE, EN) et triplets fréquents (ENT, LES) aident aussi.</li>
</ul>
<h3>Le chiffre affine : César amélioré</h3>
<p>On multiplie avant de décaler : <span class="f">c = (k1·p + k2) mod 26</span>. La clé est le couple (k1, k2). Si k1 = 1, on retrouve César.</p>
<p><b>Condition obligatoire : pgcd(k1, 26) = 1</b> (k1 et 26 n'ont aucun diviseur commun à part 1). Pourquoi ? Prenons k1 = 2 : A (0) donne 0 et N (13) donne 26 mod 26 = 0. Deux lettres différentes donnent la même lettre chiffrée : impossible de déchiffrer. Les k1 valides sont les nombres impairs sauf 13 : <b>1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25</b>, soit 12 valeurs. Nombre de clés : 12 × 26 = <b>312</b>.</p>
<h3>Déchiffrer un affine : l'inverse modulaire</h3>
<p>Pour défaire « ×k1 », on ne divise pas : on multiplie par l'<b>inverse de k1 modulo 26</b>, noté k1⁻¹, le nombre tel que <span class="f">k1 × k1⁻¹ ≡ 1 (mod 26)</span>.</p>
<p>Exemple : 3⁻¹ = 9 car 3 × 9 = 27 ≡ 1 (mod 26). Les inverses mod 26 à connaître (on les retrouve en essayant, ou avec Euclide étendu, voir onglet Arithmétique) :</p>
<div class="scroll"><table class="t"><tr><th>k1</th><td>1</td><td>3</td><td>5</td><td>7</td><td>9</td><td>11</td><td>15</td><td>17</td><td>19</td><td>21</td><td>23</td><td>25</td></tr><tr><th>k1⁻¹</th><td>1</td><td>9</td><td>21</td><td>15</td><td>3</td><td>19</td><td>7</td><td>23</td><td>11</td><td>5</td><td>17</td><td>25</td></tr></table></div>
<p><span class="f">Déchiffrement : p = k1⁻¹ · (c − k2) mod 26</span></p>
<p><b>Exemple guidé</b>, clé (3, 11) comme le prof. Chiffrer C (2) : 3×2 + 11 = 17 → <b>R</b>. Déchiffrer R (17) : 9 × (17 − 11) = 54 = 2×26 + 2 → 2 → <b>C</b>. On retombe bien sur C.</p>
<h3>Casser un affine (diapos 26-27, exercice type examen)</h3>
<ol>
<li>Compter les lettres du chiffré. Le prof : G apparaît 13 fois, A 8 fois.</li>
<li>Supposer : la plus fréquente vient de E (4), la deuxième de S (18). Donc E→G et S→A.</li>
<li>Écrire les équations : 4k1 + k2 ≡ 6 et 18k1 + k2 ≡ 0 (mod 26).</li>
<li>Soustraire pour éliminer k2 : 14k1 ≡ −6 ≡ 20 (mod 26). On divise tout par 2 (y compris le module) : 7k1 ≡ 10 (mod 13).</li>
<li>Inverse de 7 mod 13 = 2 (7×2 = 14 ≡ 1). Donc k1 ≡ 2×10 = 20 ≡ 7 (mod 13). Candidats : 7 ou 20 ; 20 est pair, donc refusé : <b>k1 = 7</b>.</li>
<li>k2 ≡ 6 − 4×7 = −22 ≡ <b>4</b>. On déchiffre et on vérifie que le texte a du sens : « TESTONS A PRESENT LES EQUATIONS… ». Si le texte n'a pas de sens, on essaie une autre hypothèse (E→G et A→A, par exemple).</li>
</ol>
```

## Flashcards

```cartes
{cesar@8} Formule de César, dans les deux sens ? :: c = (p + k) mod 26 ; p = (c − k) mod 26.
{cesar@9} Pourquoi César est-il indéfendable ? :: Il n'y a que 26 clés : la force brute se fait à la main en quelques minutes (bouton « Force brute » de la machine).
{cesar@10} Formule du chiffre affine, avec sa condition ? :: c = (k1·p + k2) mod 26, avec pgcd(k1, 26) = 1.
{cesar@11} Déchiffrement affine ? :: p = k1⁻¹·(c − k2) mod 26. On multiplie par l'inverse ; on ne divise JAMAIS par k1.
{cesar@12} Les valeurs possibles de k1 modulo 26 ? :: 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25 : les 12 nombres premiers avec 26.
{cesar@13} Nombre total de clés de l'affine modulo 26 ? :: 12 × 26 = 312.
{cesar@14} Pourquoi k1 = 13 est-il interdit ? :: pgcd(13, 26) = 13 ≠ 1 : 13 n'a pas d'inverse modulo 26, donc le chiffrement n'est pas réversible.
{cesar@15} 3⁻¹ mod 26 = ? :: 9, car 3 × 9 = 27 ≡ 1 (mod 26).
{cesar@16} Comment casse-t-on un affine par les fréquences ? :: Lettre la plus fréquente du chiffré → E (4), la deuxième → S (18) ou A. Deux équations k1·p + k2 ≡ c, on soustrait et on résout.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#cesar)

## Réponses courtes

```exercice
? {cesar} Chiffre SALUT avec César, k = 3 (5 lettres, sans espace).
reponse: VDOXW
= S(18)+3=21=V, A→D, L→O, U(20)+3=23=X, T→W.
? {cesar} Déchiffre EUDYR avec César, k = 3.
reponse: BRAVO
= On retire 3 : E→B, U→R, D→A, Y→V, R→O.
? {cesar} Combien de clés possède César ?
reponse: 26
= 26 décalages possibles, d'où la force brute immédiate.
? {cesar} Quel est l'inverse de 7 modulo 26 ?
reponse: 15
= 7 × 15 = 105 = 4×26 + 1.
? {cesar} Affine, clé (3, 11) : chiffre la lettre C.
reponse: R
= C = 2 ; 3×2 + 11 = 17 = R.
? {cesar} Affine, clé (3, 11) : déchiffre la lettre O.
reponse: B
= O = 14 ; 9 × (14 − 11) = 27 ≡ 1 = B (9 est l'inverse de 3).
```

## QCM du chapitre

```qcm
? {cesar} Dans le chiffre affine, pourquoi k1 = 13 est-il interdit ?
- 13 est premier
+ pgcd(13, 26) ≠ 1 : deux lettres donneraient le même chiffré
- 13 dépasse 12
- Il redonne César
= pgcd(13, 26) = 13, donc 13 n'a pas d'inverse modulo 26 et le déchiffrement est impossible.
```

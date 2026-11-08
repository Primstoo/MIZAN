---
id: arith
titre: Arithmétique modulaire
seance: Partie 1
importance: 3
---

```html
<h3>Pourquoi ce chapitre est crucial</h3>
<p>L'affine en a déjà besoin (inverse modulo 26). Toute la partie 2 (RSA, ElGamal, Diffie-Hellman) n'est faite que de ces outils. C'est le chapitre le plus rentable à travailler.</p>
<h3>1. PGCD et algorithme d'Euclide</h3>
<p>Le <b>PGCD</b> de a et b est le plus grand nombre qui divise a et b. pgcd(42, 30) = 6.</p>
<p>Calculer les diviseurs est trop long pour de grands nombres. L'<b>algorithme d'Euclide</b> repose sur une idée : <span class="f">pgcd(a, b) = pgcd(b, a mod b)</span>. On répète jusqu'à obtenir un reste 0. Le dernier reste non nul est le PGCD.</p>
<p>42 = 1×30 + <b>12</b> → pgcd(30, 12)<br>30 = 2×12 + <b>6</b> → pgcd(12, 6)<br>12 = 2×6 + <b>0</b> → stop. pgcd = <b>6</b>.</p>
<h3>2. Nombres premiers entre eux</h3>
<p>a et b sont <b>premiers entre eux</b> si pgcd(a, b) = 1 : leur seul diviseur commun est 1. Exemple : 26 et 7. Attention : 8 et 9 sont premiers entre eux alors qu'aucun n'est un nombre premier. Un nombre premier est premier avec tout nombre qu'il ne divise pas.</p>
<h3>3. Bézout et inverse modulaire</h3>
<p><b>Théorème de Bézout</b> : a et b sont premiers entre eux si et seulement s'il existe deux entiers u et v tels que <span class="f">a·u + b·v = 1</span>.</p>
<p>Lien avec l'inverse : si <span class="f">a·u + b·v = 1</span>, alors modulo a le terme a·u disparaît et il reste <span class="f">b·v ≡ 1 (mod a)</span>. Donc <b>v est l'inverse de b modulo a</b>.</p>
<p>Conséquences (diapos 66-70) :</p>
<ul><li>b a un inverse modulo n <b>si et seulement si</b> pgcd(b, n) = 1. Cet inverse est unique.</li><li>Si pgcd(b, n) ≠ 1, b est un « diviseur de zéro » : il existe y ≠ 0 tel que b·y ≡ 0. Exemple : 2 × 13 ≡ 0 (mod 26).</li><li>Si n est premier, tous les éléments non nuls de Zn sont inversibles. Zn* désigne l'ensemble des éléments inversibles.</li></ul>
<h3>4. Algorithme d'Euclide étendu (trouver u et v)</h3>
<p>On garde à chaque ligne une égalité « a·u + b·v = r ». On part de deux lignes évidentes, puis on soustrait q fois la ligne précédente, où q est le quotient de la division.</p>
<p>Exemple du prof : inverse de 3 modulo 40.</p>
<div class="scroll"><table class="t"><tr><th>ligne</th><th>40·u + 3·v = r</th><th>quotient</th></tr><tr><td>E0</td><td>40·1 + 3·0 = 40</td><td></td></tr><tr><td>E1</td><td>40·0 + 3·1 = 3</td><td>q = 40 ÷ 3 = 13</td></tr><tr><td>E2 = E0 − 13·E1</td><td>40·1 + 3·(−13) = 1</td><td>r = 1, on s'arrête</td></tr></table></div>
<p>Donc 3 × (−13) ≡ 1 (mod 40). On ramène entre 0 et 39 : −13 + 40 = <b>27</b>. Vérification : 3 × 27 = 81 = 2×40 + 1 ✓. La machine fait ce tableau pour n'importe quels nombres.</p>
<h3>5. Indicatrice d'Euler φ(n)</h3>
<p><span class="f">φ(n)</span> = nombre d'entiers entre 1 et n−1 premiers avec n = nombre d'éléments inversibles modulo n.</p>
<ul><li>φ(10) = 4 : {1, 3, 7, 9}.</li><li>Si p est premier : <span class="f">φ(p) = p − 1</span> (tous les nombres de 1 à p−1 sont premiers avec p). φ(17) = 16.</li><li>Puissance d'un premier : <span class="f">φ(pᵉ) = pᵉ − pᵉ⁻¹</span>. φ(8) = 8 − 4 = 4.</li><li>Si m et n sont premiers entre eux : <span class="f">φ(m·n) = φ(m)·φ(n)</span>. φ(26) = φ(2)·φ(13) = 1 × 12 = <b>12</b>. C'est exactement le nombre de k1 valides dans l'affine.</li><li>Conventions : φ(0) = 0, φ(1) = 1.</li></ul>
<h3>6. Fermat et Euler</h3>
<p><b>Petit théorème de Fermat</b> : si p est premier, <span class="f">aᵖ ≡ a (mod p)</span>. Si de plus p ne divise pas a : a^(p−1) ≡ 1.</p>
<p><b>Théorème d'Euler</b> (généralisation) : si pgcd(a, n) = 1, <span class="f">a^φ(n) ≡ 1 (mod n)</span>.</p>
<p><b>Règle pratique (diapo 74)</b> : dans aˣ mod n, on peut remplacer l'exposant x par <b>x mod φ(n)</b>. Pourquoi : chaque bloc a^φ(n) vaut 1, on peut donc le retirer.</p>
<p><b>Exemple guidé</b> : 3¹⁰⁰ mod 7. φ(7) = 6 ; 100 = 16×6 + 4, donc 3¹⁰⁰ ≡ 3⁴ = 81 = 11×7 + 4 → <b>4</b>.<br>Exemple du prof : 51447²¹ mod 17. Base : 51447 mod 17 = 5. Exposant : 21 mod 16 = 5. Puis 5⁵ = (5²)² × 5 ; 5² = 25 ≡ 8 ; 8² = 64 ≡ 13 ; 13 × 5 = 65 ≡ <b>14</b>.</p>
<p><b>Exponentiation rapide</b> : pour un grand exposant, on calcule a, a², a⁴, a⁸… en élevant au carré (en réduisant modulo n à chaque étape), puis on multiplie les puissances qui composent l'exposant écrit en binaire.</p>
<h3>7. Élément générateur</h3>
<p>Si p est premier, il existe un nombre a dont les puissances a⁰, a¹, …, a^(p−2) donnent <b>tous</b> les éléments de Zp*. On l'appelle <b>générateur</b> (ou élément primitif). Dans Z7* : 3⁰=1, 3¹=3, 3²=2, 3³=6, 3⁴=4, 3⁵=5 → on obtient {1, 2, 3, 4, 5, 6}, donc 3 est un générateur. Cela servira pour Diffie-Hellman et ElGamal.</p>
<h3>8. Fonctions à sens unique</h3>
<p>Une fonction est <b>à sens unique</b> si calculer y = f(x) est facile mais retrouver x à partir de y est très difficile. Exemple : multiplier deux grands nombres premiers p × q = N est facile, mais <b>factoriser</b> N pour retrouver p et q est extrêmement long. Une fonction <b>à trappe</b> devient facile à inverser si l'on connaît un secret (la trappe). C'est le principe de RSA.</p>
```

## Flashcards

```cartes
{arith@46} Algorithme d'Euclide ? :: pgcd(a, b) = pgcd(b, a mod b), jusqu'à un reste nul. Le dernier reste non nul est le pgcd.
{arith@47} Que donne Euclide étendu (Bézout) ? :: u et v tels que a·u + b·v = pgcd(a, b). Si pgcd = 1, alors b⁻¹ ≡ v (mod a).
{arith@48} Quand b est-il inversible modulo n ? :: Exactement quand pgcd(b, n) = 1.
{arith@49} φ(p) pour p premier ? :: p − 1.
{arith@50} φ(pᵉ) ? :: pᵉ − pᵉ⁻¹.
{arith@51} φ(n·m) quand n et m sont premiers entre eux ? :: φ(n) · φ(m).
{arith@52} Théorème d'Euler, et ce qu'il permet ? :: Si pgcd(a, n) = 1 : a^φ(n) ≡ 1 (mod n). Donc on réduit l'exposant modulo φ(n).
{arith@53} Petit théorème de Fermat, forme du cours ? :: p premier : aᵖ ≡ a (mod p) ; et si pgcd(a, p) = 1, alors a^(p−1) ≡ 1 (mod p).
{arith@54} La méthode pour a^x mod M avec x énorme ? :: 1) réduire la base modulo M ; 2) réduire l'exposant modulo φ(M) si pgcd(a, M) = 1 ; 3) carrés successifs.
{arith@55} 51447²¹ mod 17 = ? (exemple du prof, diapo 75) :: 14. 51447 ≡ 5 ; φ(17) = 16 et 21 ≡ 5 ; donc 5⁵ mod 17 = 14.
{arith@56} Pourquoi cet onglet est-il le plus rentable ? :: RSA, ElGamal et Diffie-Hellman (partie 2) ne sont que des exponentiations modulaires : inverse modulo φ(n) et exponentiation rapide y servent partout.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#arith)

## Réponses courtes

```exercice
? {arith} pgcd(42, 30) = ?
reponse: 6
= 42 = 30 + 12 ; 30 = 2×12 + 6 ; 12 = 2×6 + 0.
? {arith} pgcd(26, 7) = ?
reponse: 1
= Ils sont premiers entre eux, donc 7 est inversible modulo 26.
? {arith} Inverse de 3 modulo 40 (avec Euclide étendu) :
reponse: 27
= 40·1 + 3·(−13) = 1, donc 3⁻¹ ≡ −13 ≡ 27.
? {arith} φ(26) = ?
reponse: 12
= φ(2)·φ(13) = 1 × 12.
? {arith} φ(17) = ?
reponse: 16
= 17 est premier : φ(p) = p − 1.
? {arith} 2¹⁰ mod 11 = ? (pense à Fermat)
reponse: 1
= 11 est premier et ne divise pas 2, donc 2^(11−1) ≡ 1.
? {arith} 3¹⁰⁰ mod 7 = ?
reponse: 4
= φ(7) = 6 ; 100 mod 6 = 4 ; 3⁴ = 81 ≡ 4.
```

## QCM du chapitre

```qcm
? {arith} Multiplier p × q est facile, mais retrouver p et q à partir de N est difficile. C'est :
+ une fonction à sens unique
- une permutation
- un générateur
- un LFSR
= La factorisation est difficile, principe de RSA.
```

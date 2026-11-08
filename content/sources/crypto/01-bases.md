---
id: bases
titre: Bases de la cryptographie
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 195" role="img" aria-label="Alice, Bob et Oscar" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><rect x="20" y="50" width="110" height="50" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="75" y="73" text-anchor="middle" font-weight="700">Alice</text><text x="75" y="88" text-anchor="middle" font-size="11">M clair</text><line x1="130" y1="75" x2="230" y2="75" stroke="currentColor"  marker-end="url(#cfA1)"/><rect x="230" y="50" width="130" height="50" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="295" y="73" text-anchor="middle" font-weight="700">Chiffrer</text><text x="295" y="88" text-anchor="middle" font-size="11">avec la clé K</text><line x1="360" y1="75" x2="500" y2="75" stroke="currentColor"  marker-end="url(#cfA1)"/><rect x="500" y="50" width="120" height="50" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="560" y="73" text-anchor="middle" font-weight="700">Bob</text><text x="560" y="88" text-anchor="middle" font-size="11">déchiffre → M</text><text x="430" y="66" text-anchor="middle" font-family="var(--mono)">C = x7#qL…</text><text x="430" y="125" text-anchor="middle" font-size="11">canal non sécurisé</text><rect x="370" y="140" width="120" height="44" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="430" y="160" text-anchor="middle" font-weight="700">Oscar</text><text x="430" y="175" text-anchor="middle" font-size="11">voit C, pas M</text><line x1="430" y1="80" x2="430" y2="140" stroke="var(--bad)" stroke-dasharray="4 3"/><text x="40" y="160" font-size="11">Symétrique : la même clé K des deux côtés (coffre avec deux doubles).</text><text x="40" y="178" font-size="11">Asymétrique : on chiffre avec la clé publique de Bob, seul Bob déchiffre (sa clé privée).</text></svg></figure>
<h3>Pourquoi la cryptographie existe</h3>
<p>Imagine qu'Alice envoie un message à Bob par Internet. Ce message passe par des dizaines de machines (routeurs, Wi-Fi, opérateur) qu'elle ne contrôle pas. N'importe qui sur le chemin peut le lire ou le modifier. Dans le cours, cet espion s'appelle <b>Oscar</b>. Le canal entre Alice et Bob est dit <b>non sécurisé</b>.</p>
<p>La cryptographie fournit des outils pour qu'Alice et Bob communiquent en sécurité, même sur ce canal. Elle vise <b>quatre buts</b> (à connaître par cœur, c'est une question de cours classique) :</p>
<ul>
<li><b>Confidentialité</b> : seul Bob peut lire le message. Oscar voit passer du charabia. <i>Exemple : ton mot de passe envoyé à un site.</i></li>
<li><b>Authentification</b> : Bob est sûr que c'est bien Alice qui écrit (et inversement). <i>Exemple : vérifier que le site de ta banque est le vrai.</i></li>
<li><b>Intégrité</b> : Bob peut détecter si le message a été modifié en route. <i>Exemple : Oscar change « virer 10 DH » en « virer 1000 DH ».</i></li>
<li><b>Non-répudiation</b> : Alice ne peut pas nier plus tard avoir envoyé le message. Elle est assurée par la <b>signature</b> numérique (asymétrique), car seule Alice possède sa clé privée.</li>
</ul>
<h3>Le vocabulaire (attention aux pièges)</h3>
<ul>
<li><b>Cryptologie</b> = science du secret = <b>cryptographie</b> (construire des systèmes) + <b>cryptanalyse</b> (les attaquer pour mesurer leur solidité).</li>
<li><b>Message clair</b> M (plaintext) : le texte lisible. <b>Cryptogramme / chiffré</b> C (ciphertext) : le texte illisible.</li>
<li><b>Chiffrer</b> : M → C avec la clé. <b>Déchiffrer</b> : C → M <b>avec</b> la clé (action autorisée).</li>
<li><b>Décrypter</b> : retrouver M <b>sans</b> la clé. C'est ce que fait Oscar (action « illégale »). On ne dit jamais « crypter » en français correct.</li>
<li><b>Cryptosystème</b> : l'algorithme qui chiffre et déchiffre. <b>Casser</b> un cryptosystème : retrouver M ou la clé sans la connaître.</li>
<li><b>Algorithme</b> : méthode non ambiguë. <b>Protocole</b> : suite d'échanges entre plusieurs participants.</li>
</ul>
<h3>Symétrique ou asymétrique</h3>
<p><b>Symétrique (à clé privée)</b> : une seule clé, partagée par Alice et Bob, sert à chiffrer ET déchiffrer. Image : un coffre dont Alice et Bob ont chacun un double de la clé. Rapide, mais il faut d'abord s'échanger la clé en secret. Exemples : César, Vigenère, DES, AES.</p>
<p><b>Asymétrique (à clé publique)</b> : chaque personne a deux clés. La <b>clé publique</b> (donnée à tout le monde) sert à chiffrer, la <b>clé privée</b> (gardée secrète) sert à déchiffrer. Image : une boîte aux lettres. Tout le monde peut y glisser une lettre, seul le propriétaire a la clé pour l'ouvrir. Exemples : RSA, ElGamal (partie 2).</p>
<h3>L'outil indispensable : le modulo</h3>
<p>Presque tout le cours calcule « modulo n ». <span class="f">a mod n</span> = le <b>reste</b> de la division de a par n. C'est le calcul d'une horloge : sur une horloge de 12 heures, 10 h + 5 h = 3 h, car 15 mod 12 = 3.</p>
<ul>
<li>29 mod 26 = 3 (29 = 1×26 + 3)</li>
<li>52 mod 26 = 0</li>
<li>Nombre négatif : on ajoute n jusqu'à revenir entre 0 et n−1. −3 mod 26 = −3 + 26 = 23.</li>
<li>On écrit <span class="f">a ≡ b (mod n)</span> (« a congru à b ») quand a et b ont le même reste. 29 ≡ 3 (mod 26).</li>
</ul>
<p>Pour les lettres, on numérote <b>A=0, B=1, …, Z=25</b> et on calcule modulo 26 : après Z, on revient à A.</p>
<div class="scroll"><table class="t"><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th><th>K</th><th>L</th><th>M</th></tr><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr><tr><th>N</th><th>O</th><th>P</th><th>Q</th><th>R</th><th>S</th><th>T</th><th>U</th><th>V</th><th>W</th><th>X</th><th>Y</th><th>Z</th></tr><tr><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr></table></div>
<div class="tip">Garde ce tableau sous les yeux pour tous les exercices des chapitres suivants.</div>
```

## S'exercer : exercices guidés et labo

```integre crypto-farchane-outils.html#bases
cible: [data-tab="bases"]
garder: .guided,.bench
```

## Flashcards

```cartes
{bases@0} Les 4 buts de la cryptographie ? :: Confidentialité, authentification, intégrité, non-répudiation.
{bases@1} Déchiffrer ou décrypter : quelle différence ? :: Déchiffrer = retrouver le clair AVEC la clé (destinataire légitime). Décrypter = y arriver SANS la clé (l'attaquant).
{bases@2} Chiffrement symétrique et asymétrique, en une phrase chacun ? :: Symétrique : une seule clé secrète, partagée. Asymétrique : clé publique pour chiffrer, clé privée pour déchiffrer.
{bases@3} La convention de numérotation de ce cours ? :: A = 0, B = 1, … Z = 25, et tous les calculs se font modulo 26.
{bases@4} Combien vaut −5 mod 26 ? :: 21. On ajoute le module jusqu'à retomber entre 0 et n − 1.
{bases@5} Que veut dire a ≡ b (mod n) ? :: a et b ont le même reste dans la division par n ; autrement dit n divise a − b.
{bases@6} Oscar modifie le montant d'un virement : quel but est attaqué ? :: L'intégrité.
{bases@7} Un client nie avoir passé commande : quel but manquait ? :: La non-répudiation.
```

## Réponses courtes

```exercice
? {bases} Calcule 29 mod 26.
reponse: 3
= 29 = 1×26 + 3.
? {bases} Calcule −3 mod 26.
reponse: 23
= On ajoute 26 : −3 + 26 = 23.
```

## QCM du chapitre

```qcm
? {bases} Oscar récupère un message chiffré et retrouve le message clair sans connaître la clé. Il a :
- déchiffré
+ décrypté
- chiffré
- signé
= Sans la clé, on dit décrypter. Déchiffrer se fait avec la clé.

? {bases} Oscar modifie le montant d'un virement en route. Quel but est attaqué en premier ?
- Confidentialité
+ Intégrité
- Non-répudiation
- Aucun
= Une modification non autorisée attaque l'intégrité. C'est une attaque active.

? {bases} Alice nie avoir envoyé un message qu'elle a signé. Quel but l'en empêche ?
- Confidentialité
- Intégrité
+ Non-répudiation
- Authentification du destinataire
= La non-répudiation, grâce à la signature avec sa clé privée.

? {bases} Dans un chiffrement symétrique :
- On chiffre avec la clé publique et on déchiffre avec la clé privée
+ La même clé sert à chiffrer et à déchiffrer
- Il n'y a pas de clé
- Seul le destinataire a une clé
= Symétrique = une clé partagée. Asymétrique = clé publique + clé privée.
```

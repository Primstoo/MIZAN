---
id: des
titre: DES
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 205" role="img" aria-label="tour de Feistel" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><rect x="150" y="20" width="140" height="34" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="220" y="41" text-anchor="middle" font-weight="700">L₀ (32 bits)</text><rect x="350" y="20" width="140" height="34" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="420" y="41" text-anchor="middle" font-weight="700">R₀ (32 bits)</text><line x1="420" y1="54" x2="420" y2="150" stroke="currentColor"/><rect x="330" y="80" width="90" height="34" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="375" y="101" text-anchor="middle" font-weight="700">f(R₀, K₁)</text><line x1="420" y1="97" x2="420" y2="97" stroke="currentColor"/><circle cx="220" cy="97" r="12" fill="var(--panel)" stroke="currentColor"/><text x="220" y="102" text-anchor="middle" font-size="15">⊕</text><line x1="220" y1="54" x2="220" y2="85" stroke="currentColor"/><line x1="330" y1="97" x2="232" y2="97" stroke="currentColor"  marker-end="url(#cfA6)"/><path d="M220 109 L220 125 L420 160" fill="none" stroke="currentColor"/><path d="M420 125 L220 160" fill="none" stroke="currentColor"/><rect x="150" y="160" width="140" height="34" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="220" y="181" text-anchor="middle" font-weight="700">L₁ = R₀</text><rect x="350" y="160" width="140" height="34" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="420" y="181" text-anchor="middle" font-weight="700">R₁ = L₀ ⊕ f(R₀,K₁)</text><text x="510" y="80" font-size="11">Un tour de Feistel :</text><text x="510" y="96" font-size="11">les moitiés s'échangent,</text><text x="510" y="112" font-size="11">DES en fait 16.</text><text x="510" y="135" font-size="11">Déchiffrer = mêmes</text><text x="510" y="151" font-size="11">tours, clés à l'envers.</text></svg></figure>
<h3>Qu'est-ce que DES</h3>
<p>DES (Data Encryption Standard) est un chiffrement symétrique <b>par blocs</b>, standard américain de 1976 (ses S-boxes ont été modifiées par la NSA pendant sa conception). Chiffres à connaître :</p>
<ul><li>Blocs de <b>64 bits</b>.</li><li>Clé de 64 bits dont 8 bits de parité, donc <b>56 bits utiles</b>.</li><li><b>16 tours</b>, chacun avec une sous-clé de <b>48 bits</b>.</li><li>Structure : un <b>réseau de Feistel</b>.</li></ul>
<h3>Le réseau de Feistel, le cœur de DES</h3>
<p>On coupe le bloc en deux moitiés, gauche L et droite R. À chaque tour :</p>
<p><span class="f">Lᵢ = Rᵢ₋₁</span> &nbsp; <span class="f">Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ)</span></p>
<p>En mots : la moitié droite passe à gauche telle quelle ; la nouvelle moitié droite est l'ancienne gauche, brouillée par un XOR avec f(ancienne droite, sous-clé).</p>
<p><b>Pourquoi on peut toujours déchiffrer</b> (diapos 142-143, démonstration classique d'examen) : connaissant (Lᵢ, Rᵢ), on sait que Rᵢ₋₁ = Lᵢ. On peut donc recalculer f(Rᵢ₋₁, kᵢ), puis Lᵢ₋₁ = Rᵢ ⊕ f(Rᵢ₋₁, kᵢ), car X ⊕ f ⊕ f = X. On n'a <b>jamais besoin d'inverser f</b>. f peut être aussi compliquée qu'on veut. Le déchiffrement est le <b>même algorithme</b>, avec les sous-clés dans l'ordre inverse (k16, k15, …, k1).</p>
<h3>Le schéma complet de DES</h3>
<ol><li><b>IP</b> (permutation initiale) mélange les 64 bits selon une table fixe : le bit 58 devient le 1er, le bit 50 le 2e…</li><li>On coupe en L₀ et R₀ (32 bits chacun).</li><li><b>16 tours</b> de Feistel.</li><li>On échange les deux moitiés à la fin : (R16, L16).</li><li><b>IP⁻¹</b> (permutation inverse) donne le chiffré.</li></ol>
<h3>La fonction f(R, k) = P(S(E(R) ⊕ k))</h3>
<ol><li><b>E (expansion)</b> : R passe de 32 à 48 bits (certains bits sont dupliqués) pour avoir la même taille que la sous-clé.</li><li><b>XOR</b> avec la sous-clé kᵢ (48 bits).</li><li><b>S-boxes</b> : on coupe les 48 bits en 8 groupes de 6 bits. Chaque groupe passe dans sa S-box (S1 à S8), qui renvoie 4 bits. 8 × 4 = 32 bits. C'est la seule étape <b>non linéaire</b>, donc la source de la sécurité.</li><li><b>P</b> : permutation fixe des 32 bits.</li></ol>
<h3>Lire une S-box (exercice classique)</h3>
<p>Entrée de 6 bits b1 b2 b3 b4 b5 b6 :</p>
<ul><li>Ligne = b1 b6 (premier et dernier bit) → nombre de 0 à 3.</li><li>Colonne = b2 b3 b4 b5 (les 4 bits du milieu) → nombre de 0 à 15.</li><li>La case donne un nombre de 0 à 15, qu'on écrit sur 4 bits.</li></ul>
<p>Exemple du prof : 101100 → ligne 1 0 = 2, colonne 0110 = 6 → S1[2][6] = 2 → <b>0010</b>.</p>
<h3>Les 16 sous-clés</h3>
<ol><li>On retire les 8 bits de parité et on applique <b>PC-1</b> : il reste 56 bits, coupés en C₀ (28 bits) et D₀ (28 bits).</li><li>À chaque tour i, on fait une <b>rotation circulaire à gauche</b> de C et D : 1 position aux tours 1, 2, 9 et 16, sinon 2 positions. Au total, 28 positions, donc C16 = C0.</li><li>kᵢ = <b>PC-2</b>(Cᵢ Dᵢ) : on choisit 48 des 56 bits.</li></ol>
<p>Pour déchiffrer, on produit les sous-clés à l'envers avec des rotations à <b>droite</b> : k16 sans décalage, puis 1 position aux tours 2, 9 et 16 du déchiffrement, 2 positions sinon.</p>
<h3>Critique</h3>
<p>Une clé de 56 bits est trop courte : 2⁵⁶ ≈ 7,2 × 10¹⁶ possibilités, à la portée d'une machine spécialisée. En janvier 1999, une machine de 250 000 $ a trouvé une clé DES en <b>22 h 15 min</b>. DES a été remplacé par <b>AES</b> (partie 2).</p>
<h3>Feistel à deux rondes (TD2, exercice 5)</h3>
<p>Même principe que DES, en miniature : bloc de 8 bits coupé en L (4 bits) et R (4 bits), clé de 8 bits coupée en K₁ (4 premiers bits) et K₂ (4 derniers). À chaque ronde : <span class="f">Lᵢ = Rᵢ₋₁</span>, <span class="f">Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, Kᵢ)</span>. Dans f, « u₁u'₄ » est un ET (produit) entre bits et ⊕ un XOR.</p>
<div class="trap"><b>Convention à vérifier avec le prof :</b> le TD ne dit pas s'il faut un échange final des moitiés comme dans DES. Les corrigés ci-dessous donnent C = (L₂, R₂), sans échange. Avec échange, on écrit R₂L₂.</div>
<h3>MiniDES (TD2, exercice 6)</h3>
<p>Bloc de 16 bits (L et R de 8 bits), clé de 12 bits coupée en deux moitiés de 6 bits. Les sous-clés : décalage circulaire à gauche des deux moitiés (1 position aux rondes 1, 2, 9, 16, sinon 2), puis la permutation PC (8 7 1 4 10 5 3 9 2 12 6 11). f(R, K) = P(S(E(R) ⊕ K)), avec E (8 1 2 3 4 5 4 5 6 7 8 1) qui passe R de 8 à 12 bits.</p>
<div class="trap"><b>Il manque les S-boxes du MiniDES</b> dans le document du TD : sans elles, on ne peut pas aller jusqu'au chiffré final. Demande-les au prof ; les étapes calculables sont corrigées dans les exercices ci-dessous.</div>
```

## Flashcards

```cartes
{des@71} Les paramètres de DES ? :: Bloc 64 bits, clé 56 bits utiles (64 avec parité), 16 tours, sous-clés de 48 bits.
{des@72} Formule d'un tour de Feistel ? :: Lᵢ = Rᵢ₋₁ et Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ).
{des@73} De quoi est faite la fonction f ? :: f(R, k) = P(S(E(R) ⊕ k)) : E étend 32 → 48 bits, 8 S-box font 6 → 4 bits, P permute 32 bits.
{des@74} Structure générale de DES ? :: IP → 16 tours → échange final de L et R → IP⁻¹.
{des@75} Comment lit-on une S-box ? :: Les bits 1 et 6 donnent la ligne, les bits 2 à 5 la colonne ; la valeur lue s'écrit sur 4 bits.
{des@76} Calcul des sous-clés ? :: PC-1, puis rotations à gauche (1 aux tours 1, 2, 9 et 16, sinon 2), puis PC-2 qui sort 48 bits.
{des@77} Comment déchiffre-t-on avec DES ? :: Même algorithme, sous-clés dans l'ordre inverse : k16 → k1.
{des@78} Pourquoi f n'a-t-elle pas besoin d'être inversible ? :: Parce que f(R, k) ⊕ f(R, k) = 0 : la structure de Feistel s'annule d'elle-même au déchiffrement.
{des@79} La critique principale de DES ? :: Clé de 56 bits trop courte : cassée en 22 h 15 en 1999. Remplacée par AES.
{des@80} Combien de S-box, et quelle transformation ? :: 8 S-box (S1 à S8), chacune 6 bits → 4 bits.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#des)

## Réponses courtes

```exercice
? {des} Taille d'un bloc DES (en bits) :
reponse: 64
= Blocs de 64 bits.
? {des} Taille effective de la clé DES (en bits) :
reponse: 56
= 64 bits dont 8 de parité.
? {des} Nombre de tours de DES :
reponse: 16
= 16 tours, avec 16 sous-clés de 48 bits.
? {des} S1, entrée 011011 : quelle sortie sur 4 bits ? (la table S1 est dans la machine)
reponse: 0101
= Ligne 01 = 1, colonne 1101 = 13, S1\[1\]\[13\] = 5 = 0101.
? {des} L'expansion E fait passer R de 32 bits à :
reponse: 48
= Pour avoir la même taille que la sous-clé.
? {des} TD2 Ex. 5 : K = 10110010. Que vaut la sous-clé K₁ (4 bits) ?
reponse: 1011
= K₁ = les 4 premiers bits de K, K₂ = les 4 derniers (0010).
? {des} TD2 Ex. 5 : avec R₀ = 0111 et K₁ = 1011, que vaut f(R₀, K₁) ?
reponse: 0101
= v₁ = 0⊕1⊕1 = 0, v₂ = 0⊕1 = 1, v₃ = 0⊕0 = 0, v₄ = 1⊕0 = 1.
? {des} Même exemple : L₀ = 0100. Que vaut R₁ = L₀ ⊕ f(R₀, K₁) ?
reponse: 0001
= 0100 ⊕ 0101 = 0001.
```

## QCM du chapitre

```qcm
? {des} Dans un tour de Feistel, Lᵢ = ?
+ Rᵢ₋₁
- Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ)
- f(Lᵢ₋₁)
- Rᵢ₋₁ ⊕ kᵢ
= La droite passe à gauche ; Rᵢ = Lᵢ₋₁ ⊕ f(Rᵢ₋₁, kᵢ).

? {des} La fonction f doit-elle être inversible pour que le déchiffrement marche ?
- Oui, toujours
+ Non, grâce au XOR de Feistel
- Seulement au dernier tour
- Oui, sinon pas de S-box
= f ⊕ f = 0, donc on n'a jamais besoin d'inverser f.

? {des} Pour déchiffrer, DES utilise les sous-clés :
- dans le même ordre
+ dans l'ordre inverse k16 → k1
- une seule sous-clé
- la clé publique
= Même algorithme, sous-clés dans l'ordre inverse.

? {des} MiniDES : de combien de positions décale-t-on les moitiés de clé à la ronde 1 ?
+ 1
- 2
- 3
- 4
= 1 position aux rondes 1, 2, 9 et 16, sinon 2.
```

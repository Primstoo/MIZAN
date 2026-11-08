---
id: modes
titre: Modes de chiffrement
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 185" role="img" aria-label="ECB et CBC" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><text x="20" y="20" font-weight="700">ECB</text><rect x="60" y="30" width="70" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="95" y="49" text-anchor="middle" font-weight="700">P1</text><line x1="95" y1="60" x2="95" y2="80" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="60" y="80" width="70" height="30" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="95" y="99" text-anchor="middle" font-weight="700">E_K</text><line x1="95" y1="110" x2="95" y2="128" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="60" y="128" width="70" height="28" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="95" y="146" text-anchor="middle" font-weight="700">C1</text><rect x="150" y="30" width="70" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="185" y="49" text-anchor="middle" font-weight="700">P2</text><line x1="185" y1="60" x2="185" y2="80" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="150" y="80" width="70" height="30" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="185" y="99" text-anchor="middle" font-weight="700">E_K</text><line x1="185" y1="110" x2="185" y2="128" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="150" y="128" width="70" height="28" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="185" y="146" text-anchor="middle" font-weight="700">C2</text><rect x="240" y="30" width="70" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="275" y="49" text-anchor="middle" font-weight="700">P3</text><line x1="275" y1="60" x2="275" y2="80" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="240" y="80" width="70" height="30" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="275" y="99" text-anchor="middle" font-weight="700">E_K</text><line x1="275" y1="110" x2="275" y2="128" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="240" y="128" width="70" height="28" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="275" y="146" text-anchor="middle" font-weight="700">C3</text><text x="60" y="176" font-size="11">Blocs identiques → chiffrés identiques.</text><text x="360" y="20" font-weight="700">CBC</text><rect x="400" y="30" width="60" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="430" y="49" text-anchor="middle" font-weight="700">P1</text><line x1="430" y1="60" x2="430" y2="72" stroke="currentColor"  marker-end="url(#cfA5)"/><circle cx="430" cy="80" r="8" fill="var(--panel)" stroke="currentColor"/><text x="430" y="84" text-anchor="middle">⊕</text><line x1="430" y1="88" x2="430" y2="98" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="400" y="98" width="60" height="26" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="430" y="115" text-anchor="middle" font-weight="700">E_K</text><line x1="430" y1="124" x2="430" y2="134" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="400" y="134" width="60" height="26" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="430" y="151" text-anchor="middle" font-weight="700">C1</text><path d="M460 147 L470 147 L470 80 L502 80" fill="none" stroke="var(--acc)"/><rect x="480" y="30" width="60" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="510" y="49" text-anchor="middle" font-weight="700">P2</text><line x1="510" y1="60" x2="510" y2="72" stroke="currentColor"  marker-end="url(#cfA5)"/><circle cx="510" cy="80" r="8" fill="var(--panel)" stroke="currentColor"/><text x="510" y="84" text-anchor="middle">⊕</text><line x1="510" y1="88" x2="510" y2="98" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="480" y="98" width="60" height="26" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="510" y="115" text-anchor="middle" font-weight="700">E_K</text><line x1="510" y1="124" x2="510" y2="134" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="480" y="134" width="60" height="26" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="510" y="151" text-anchor="middle" font-weight="700">C2</text><path d="M540 147 L550 147 L550 80 L582 80" fill="none" stroke="var(--acc)"/><rect x="560" y="30" width="60" height="30" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="590" y="49" text-anchor="middle" font-weight="700">P3</text><line x1="590" y1="60" x2="590" y2="72" stroke="currentColor"  marker-end="url(#cfA5)"/><circle cx="590" cy="80" r="8" fill="var(--panel)" stroke="currentColor"/><text x="590" y="84" text-anchor="middle">⊕</text><line x1="590" y1="88" x2="590" y2="98" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="560" y="98" width="60" height="26" rx="6" fill="rgba(31,95,191,.13)" stroke="currentColor"/><text x="590" y="115" text-anchor="middle" font-weight="700">E_K</text><line x1="590" y1="124" x2="590" y2="134" stroke="currentColor"  marker-end="url(#cfA5)"/><rect x="560" y="134" width="60" height="26" rx="6" fill="var(--panel)" stroke="currentColor"/><text x="590" y="151" text-anchor="middle" font-weight="700">C3</text><text x="372" y="84" font-size="11">IV</text><line x1="388" y1="80" x2="422" y2="80" stroke="var(--acc)"/><text x="360" y="176" font-size="11">Chaque bloc dépend du chiffré précédent.</text></svg></figure>
<h3>Pourquoi des « modes »</h3>
<p>Un chiffrement par blocs (DES, AES) sait chiffrer <b>un</b> bloc de taille fixe : E_k(bloc). Un vrai message contient beaucoup de blocs. Le <b>mode opératoire</b> dit comment les enchaîner. Notations : mᵢ = bloc clair n°i, cᵢ = bloc chiffré, E_k = chiffrer avec la clé k, D_k = déchiffrer, ⊕ = XOR, IV = valeur initiale.</p>
<h3>1. ECB (Electronic Code Book)</h3>
<p>Chaque bloc est chiffré seul : <span class="f">cᵢ = E_k(mᵢ)</span>, <span class="f">mᵢ = D_k(cᵢ)</span>.<br><b>Défaut</b> : deux blocs clairs identiques donnent deux chiffrés identiques, donc la structure du message reste visible. Un attaquant peut aussi échanger ou remplacer des blocs sans être détecté. Le prof le dit : <b>jamais utilisé en pratique</b>.</p>
<h3>2. CBC (Cipher Block Chaining)</h3>
<p>Avant de chiffrer un bloc, on le XOR avec le chiffré précédent. Pour le premier bloc, on utilise l'IV.<br><span class="f">c₀ = E_k(m₀ ⊕ IV)</span>, <span class="f">cᵢ = E_k(mᵢ ⊕ cᵢ₋₁)</span><br>Déchiffrement : <span class="f">m₀ = IV ⊕ D_k(c₀)</span>, <span class="f">mᵢ = cᵢ₋₁ ⊕ D_k(cᵢ)</span>.<br>On transmet IV c₀ c₁ … cₙ. Chaque chiffré dépend de tous les blocs précédents, donc des blocs identiques ne donnent plus le même résultat. L'IV peut être aléatoire et envoyé en clair, aléatoire et envoyé en secret, fixé dans le système, ou intégré à la clé.</p>
<h3>3. CFB (Cipher FeedBack)</h3>
<p>On chiffre le chiffré précédent, puis on XOR avec le clair :<br><span class="f">c₀ = m₀ ⊕ E_k(IV)</span>, <span class="f">cᵢ = mᵢ ⊕ E_k(cᵢ₋₁)</span><br>Déchiffrement : <span class="f">mᵢ = cᵢ ⊕ E_k(cᵢ₋₁)</span>. On utilise <b>E_k</b> aussi pour déchiffrer, donc pas besoin de D_k. Moins sûr que CBC, utilisé pour les chiffrages réseau.</p>
<h3>4. OFB (Output FeedBack)</h3>
<p>On fabrique un masque en chiffrant l'IV en boucle, indépendamment du message, puis on XOR (c'est un chiffrement par flot) :<br><span class="f">z₀ = E_k(IV)</span>, <span class="f">zᵢ = E_k(zᵢ₋₁)</span>, <span class="f">cᵢ = mᵢ ⊕ zᵢ</span>, <span class="f">mᵢ = cᵢ ⊕ zᵢ</span>.<br>Chiffrement et déchiffrement sont identiques. Utilisé pour les satellites. Sécurité équivalente à CFB.</p>
<h3>5. CTR (CounTeR)</h3>
<p>On chiffre un compteur T+1+i :<br><span class="f">cᵢ = mᵢ ⊕ E_k(T + 1 + i)</span>, <span class="f">mᵢ = cᵢ ⊕ E_k(T + 1 + i)</span>.<br>Chaque bloc est indépendant des autres, donc le mode est <b>parallélisable</b> (on peut chiffrer tous les blocs en même temps). Un même bloc n'est jamais chiffré pareil deux fois. Sécurité équivalente à CFB.</p>
<div class="tip"><b>Moyen mnémotechnique :</b> si la formule contient « mᵢ ⊕ E_k(…) » (CFB, OFB, CTR), le déchiffrement utilise aussi E_k. Seuls ECB et CBC utilisent D_k.</div>
<p><b>Exemple guidé avec le chiffre jouet de la machine</b>, E(x) = (5x + 3) mod 16, IV = 9, m₀ = 7.<br>ECB : E(7) = 38 mod 16 = 6.<br>CBC : 7 ⊕ 9 en binaire : 0111 ⊕ 1001 = 1110 = 14, puis E(14) = 73 mod 16 = <b>9</b>.</p>
<h3>Le chiffre de Hill (utilisé dans le TD2)</h3>
<p>Le TD2 applique les modes opératoires au <b>chiffre de Hill</b>, un chiffrement par blocs de 2 lettres. On numérote A=0…Z=25 et on multiplie le bloc (ligne) par une matrice clé A, modulo 26.</p>
<p>Avec <span class="f">A = (2 1 / 1 1)</span> : <span class="f">E(x₁, x₂) = (2x₁ + x₂, x₁ + x₂) mod 26</span>.<br>Exemple : BA = (1, 0) → (2·1 + 0, 1 + 0) = (2, 1) = <b>CB</b>.</p>
<p><b>Déchiffrer</b> : on multiplie par la matrice inverse. Ici det(A) = 2·1 − 1·1 = 1, donc <span class="f">A⁻¹ = (1 −1 / −1 2)</span> et <span class="f">D(y₁, y₂) = (y₁ − y₂, −y₁ + 2y₂) mod 26</span>. Exemple : CB = (2, 1) → (1, 0) = BA ✓.</p>
<p><b>Le XOR sur des lettres</b> : dans le TD, « LETTRE ⊕ LETTRE » se calcule sur les numéros écrits en binaire. Exemple : X ⊕ B = 23 ⊕ 1 = 10111 ⊕ 00001 = 10110 = 22 = W.</p>
<div class="trap"><b>Piège repéré dans le TD2 (mode CFB) :</b> un XOR de deux numéros peut dépasser 25 (ex. 15 ⊕ 19 = 28). Le corrigé de classe écrit 28 mod 26 = 2 (C), mais alors le déchiffrement ne redonne plus le message (on retrouve AN au lieu de AT). Signale-le sur ta copie et demande au prof quelle convention il veut ; en ECB, CBC et OFB, les valeurs de ce TD restent sous 26 et tout se déchiffre correctement.</div>
```

## Flashcards

```cartes
{modes@64} ECB, dans les deux sens ? :: cᵢ = E(mᵢ) ; mᵢ = D(cᵢ). Défaut : deux blocs clairs égaux donnent deux chiffrés égaux.
{modes@65} CBC ? :: cᵢ = E(mᵢ ⊕ cᵢ₋₁) avec c₋₁ = IV ; mᵢ = D(cᵢ) ⊕ cᵢ₋₁. Il a besoin de D.
{modes@66} CFB ? :: cᵢ = mᵢ ⊕ E(cᵢ₋₁) ; mᵢ = cᵢ ⊕ E(cᵢ₋₁). Pas besoin de D.
{modes@67} OFB ? :: zᵢ = E(zᵢ₋₁) puis cᵢ = mᵢ ⊕ zᵢ ; mᵢ = cᵢ ⊕ zᵢ.
{modes@68} CTR ? :: cᵢ = mᵢ ⊕ E(T + 1 + i) ; mᵢ = cᵢ ⊕ E(T + 1 + i). Parallélisable.
{modes@69} L'astuce qui évite de se tromper entre E et D ? :: Dès que le message est XORé avec un E(…), le déchiffrement utilise aussi E, jamais D : CFB, OFB, CTR.
{modes@70} Quel mode n'utilise ni IV ni compteur ? :: ECB. C'est pour ça qu'il est déterministe, donc inutilisable en pratique.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#modes)

## Réponses courtes

```exercice
? {modes} Chiffre jouet E(x) = (5x + 3) mod 16. Mode ECB, bloc m = 2. Que vaut c ?
reponse: 13
= 5×2 + 3 = 13.
? {modes} Même chiffre, mode CBC, IV = 9, m₀ = 7. Que vaut c₀ ?
reponse: 9
= 7 ⊕ 9 = 0111 ⊕ 1001 = 1110 = 14 ; E(14) = 73 mod 16 = 9.
? {modes} TD2, Hill A = (2 1 / 1 1) : chiffre le bloc AT.
reponse: TT
= AT = (0, 19) → (2·0 + 19, 0 + 19) = (19, 19) = TT.
? {modes} Même matrice : chiffre le bloc ED.
reponse: LH
= ED = (4, 3) → (8 + 3, 4 + 3) = (11, 7) = LH.
? {modes} TD2 Ex. 4 : S₁ : 00→11, 10→10, 01→00, 11→01, K = 10. Que vaut E\_K(11) ?
reponse: 00
= 11 ⊕ 10 = 01, puis S₁(01) = 00.
```

## QCM du chapitre

```qcm
? {modes} Défaut majeur de ECB :
- Il est lent
+ Deux blocs clairs identiques donnent deux chiffrés identiques
- Il exige un IV
- Il n'est pas réversible
= La structure du message reste visible.

? {modes} Formule de chiffrement de CBC :
- cᵢ = E\_k(mᵢ)
+ cᵢ = E\_k(mᵢ ⊕ cᵢ₋₁)
- cᵢ = mᵢ ⊕ E\_k(cᵢ₋₁)
- cᵢ = mᵢ ⊕ E\_k(T+1+i)
= Les autres formules correspondent à ECB, CFB et CTR.

? {modes} Quel mode est facilement parallélisable ?
- CBC
- CFB
+ CTR
- OFB
= CTR : chaque bloc ne dépend que du compteur.

? {modes} Pour déchiffrer en CFB, on utilise :
- D\_k
+ E\_k
- les deux
- aucune fonction
= mᵢ = cᵢ ⊕ E\_k(cᵢ₋₁).

? {modes} Inverse de A = (2 1 / 1 1) modulo 26 :
+ (1 −1 / −1 2)
- (2 −1 / −1 1)
- (1 1 / 1 2)
- A n'a pas d'inverse
= det(A) = 2 − 1 = 1, donc A⁻¹ = (1 −1 / −1 2).

? {modes} En CFB, pourquoi le TD2 pose problème avec le bloc AT ?
- Hill n'a pas d'inverse
+ 15 ⊕ 19 = 28 dépasse 25 et la réduction mod 26 empêche de retrouver le clair
- Il manque l'IV
- Le mode CFB n'existe pas pour Hill
= 28 ramené à 2 : au déchiffrement on trouve AN au lieu de AT.
```

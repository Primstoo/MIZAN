---
id: lfsr
titre: LFSR (registres à décalage)
seance: Partie 1
importance: 3
---

```html
<figure class="cfig"><svg viewBox="0 0 640 200" role="img" aria-label="registre à décalage" style="width:100%;min-width:480px;color:var(--ink)" font-family="var(--body),system-ui,sans-serif" font-size="12"><defs><marker id="cfA4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="currentColor"/></marker></defs><rect x="140" y="40" width="56" height="40" fill="var(--panel)" stroke="currentColor"/><text x="168" y="65" text-anchor="middle" font-family="var(--mono)" font-size="16">1</text><rect x="210" y="40" width="56" height="40" fill="var(--panel)" stroke="currentColor"/><text x="238" y="65" text-anchor="middle" font-family="var(--mono)" font-size="16">0</text><rect x="280" y="40" width="56" height="40" fill="var(--panel)" stroke="currentColor"/><text x="308" y="65" text-anchor="middle" font-family="var(--mono)" font-size="16">1</text><rect x="350" y="40" width="56" height="40" fill="var(--panel)" stroke="currentColor"/><text x="378" y="65" text-anchor="middle" font-family="var(--mono)" font-size="16">1</text><line x1="420" y1="60" x2="520" y2="60" stroke="currentColor"  marker-end="url(#cfA4)"/><text x="530" y="56" font-size="11">bit de sortie</text><text x="530" y="72" font-size="11">(suite chiffrante)</text><circle cx="260" cy="130" r="14" fill="var(--panel)" stroke="currentColor"/><text x="260" y="135" text-anchor="middle" font-size="16">⊕</text><path d="M168 80 L168 130 L246 130" fill="none" stroke="currentColor"/><path d="M378 80 L378 130 L274 130" fill="none" stroke="currentColor"/><path d="M260 144 L260 165 L100 165 L100 60 L140 60" fill="none" stroke="currentColor" marker-end="url(#cfA4)"/><text x="40" y="190" font-size="11">À chaque top : le bit de droite sort, tout décale, le XOR des cases branchées entre à gauche.</text></svg></figure>
<h3>Deux familles de chiffrement symétrique</h3>
<ul><li><b>Par blocs</b> : on découpe le message en blocs de taille fixe (64 bits pour DES), chiffrés chacun par la même fonction. Exemples : DES, AES.</li><li><b>Par flot (stream cipher)</b> : on chiffre symbole par symbole (souvent bit par bit), avec une transformation qui change à chaque position. Exemples : RC4 (SSL, Wi-Fi 802.11), E0 (Bluetooth), A5/1, A5/2, A5/3 (GSM).</li></ul>
<h3>Le XOR, l'opération de base</h3>
<p>Le XOR (⊕) est l'addition modulo 2 : 0⊕0 = 0, 0⊕1 = 1, 1⊕0 = 1, 1⊕1 = 0. Propriété clé : <span class="f">(m ⊕ z) ⊕ z = m</span>. XORer deux fois avec la même chose ramène au départ. C'est pourquoi chiffrer et déchiffrer sont la même opération.</p>
<h3>Le principe du chiffrement par flot</h3>
<p>On produit une suite de bits z₁, z₂, … appelée <b>suite chiffrante</b> ou <b>masque</b>, puis <span class="f">cᵢ = mᵢ ⊕ zᵢ</span> et <span class="f">mᵢ = cᵢ ⊕ zᵢ</span>. Si le masque était vraiment aléatoire et jamais réutilisé, on aurait un Vernam, inconditionnellement sûr. En pratique, on le fabrique avec un <b>générateur pseudo-aléatoire (GPA)</b>.</p>
<h3>Le générateur pseudo-aléatoire</h3>
<ul><li>C'est un automate à nombre fini d'états. À partir d'une petite valeur de départ, la <b>graine</b> (seed), il produit une longue suite qui <b>a l'air</b> aléatoire.</li><li>La graine est calculée à partir de la clé k et d'un vecteur d'initialisation IV : q₀ = Φ(k, IV).</li><li><b>Synchrone</b> : les bits produits ne dépendent que de l'état interne du GPA, pas du message.</li><li><b>Asynchrone (auto-synchronisant)</b> : ils dépendent de l'état interne <b>et</b> d'un nombre fixé t de symboles du message.</li><li>Un GPA est <b>cryptographiquement sûr (GPACS)</b> s'il passe le <b>test du prochain bit</b> : connaissant les k premiers bits, aucun algorithme efficace (polynomial) ne peut deviner le bit k+1 avec une probabilité nettement différente de 1/2.</li><li><b>BBS (Blum-Blum-Shub)</b> est un GPACS, mais trop lent (calculs lourds pour chaque bit), donc inutilisable en pratique pour le chiffrement par flot.</li></ul>
<h3>Le LFSR (registre à décalage à rétroaction linéaire)</h3>
<p>C'est un GPA très rapide, facile à construire en électronique. Il se compose de <b>m cases</b> contenant chacune un bit (m est le degré). À chaque top d'horloge :</p>
<ol><li>Le bit de la case de droite (s₀, poids faible) <b>sort</b> : c'est le bit produit.</li><li>Tous les bits se <b>décalent</b> d'une case vers la droite.</li><li>Un nouveau bit entre à gauche. Il est calculé comme une somme modulo 2 de certaines cases : <span class="f">sₘ = pₘ₋₁·sₘ₋₁ + … + p₁·s₁ + p₀·s₀ mod 2</span>. Les coefficients pⱼ valent 0 ou 1 et indiquent quelles cases participent.</li></ol>
<p><b>Exemple du prof (diapos 91-92)</b> : 3 cases, rétroaction <span class="f">s(i+3) = s(i+1) + s(i) mod 2</span>, départ s₂=1, s₁=0, s₀=0.</p>
<div class="scroll"><table class="t"><tr><th>top</th><th>s₂ s₁ s₀</th><th>sort</th><th>nouveau = s₁ ⊕ s₀</th></tr><tr><td>0</td><td>1 0 0</td><td>0</td><td>0⊕0 = 0</td></tr><tr><td>1</td><td>0 1 0</td><td>0</td><td>1⊕0 = 1</td></tr><tr><td>2</td><td>1 0 1</td><td>1</td><td>0⊕1 = 1</td></tr><tr><td>3</td><td>1 1 0</td><td>0</td><td>1⊕0 = 1</td></tr><tr><td>4</td><td>1 1 1</td><td>1</td><td>1⊕1 = 0</td></tr><tr><td>5</td><td>0 1 1</td><td>1</td><td>1⊕1 = 0</td></tr><tr><td>6</td><td>0 0 1</td><td>1</td><td>0⊕1 = 1</td></tr><tr><td>7</td><td>1 0 0</td><td colspan="2">même état qu'au top 0 : la suite se répète</td></tr></table></div>
<p>Sortie : <b>0010111</b> 0010111… Période = <b>7</b>. Pour un LFSR de degré m, la période maximale est <span class="f">2ᵐ − 1</span> (ici 2³ − 1 = 7, donc ce LFSR atteint le maximum). On exclut l'état 000, qui resterait bloqué à 0.</p>
<h3>Polynôme associé</h3>
<p>Un LFSR de coefficients (pₘ₋₁, …, p₁, p₀) se note <span class="f">P(x) = xᵐ + pₘ₋₁xᵐ⁻¹ + … + p₁x + p₀</span>. Pour (p₃, p₂, p₁, p₀) = (0, 0, 1, 1) : <b>P(x) = x⁴ + x + 1</b>. Ce LFSR donne une période 15, le maximum pour m = 4 (exercice de la diapo 95, à refaire avec la machine).</p>
<h3>Faiblesse et parades</h3>
<ul><li>Un LFSR seul est <b>prévisible</b>, donc ce n'est pas un GPACS. Connaissant m bits consécutifs et les coefficients, on calcule tous les suivants. Connaissant <b>2m bits</b> consécutifs sans les coefficients, on les retrouve avec l'algorithme de <b>Berlekamp-Massey</b> (ou en résolvant un système linéaire).</li><li>Parades : combiner plusieurs LFSR avec une fonction non linéaire ; filtrer un LFSR par une fonction non linéaire ; utiliser une horloge irrégulière commandée par un autre LFSR.</li><li><b>A5/1 (GSM)</b> : 3 LFSR de degrés 19, 22 et 23. Chaque registre a un bit de déclenchement (positions 8, 10, 10). À chaque top, un registre n'avance que si son bit de déclenchement est égal à la <b>majorité</b> des trois : Maj(s1, s2, s3) = (s1∧s2) ⊕ (s1∧s3) ⊕ (s2∧s3).</li></ul>
```

## Flashcards

```cartes
{lfsr@57} Formule du chiffrement par flot ? :: cᵢ = mᵢ ⊕ zᵢ, et mᵢ = cᵢ ⊕ zᵢ : le XOR se défait par lui-même.
{lfsr@58} Fonctionnement d'un LFSR de degré m ? :: À chaque top : s₀ sort, tout se décale, et le nouveau bit vaut sₘ = Σ pⱼ·sⱼ mod 2.
{lfsr@59} Période maximale d'un LFSR de degré m ? :: 2^m − 1, soit 15 pour m = 4.
{lfsr@60} Polynôme de rétroaction ? :: P(x) = xᵐ + p(m−1)·x^(m−1) + … + p₁·x + p₀.
{lfsr@61} La faiblesse fondamentale du LFSR ? :: Il est linéaire : avec 2m bits de sortie, Berlekamp-Massey retrouve le polynôme, donc tout le flot.
{lfsr@62} Comment casse-t-on cette linéarité en pratique ? :: On combine plusieurs LFSR par une fonction non linéaire. A5/1 : 3 registres et une fonction majorité.
{lfsr@63} Diapo 95 : (1,1,0,0) contre (1,1,1,1) ? :: (1,1,0,0) donne la période maximale 15 ; (1,1,1,1) seulement 5. Tous les polynômes ne se valent pas.
```

🧰 [Exemples générés, outils et exercices interactifs de ce chapitre](crypto-farchane-outils.html#lfsr)

## Réponses courtes

```exercice
? {lfsr} 1 ⊕ 1 = ?
reponse: 0
= XOR = addition modulo 2.
? {lfsr} Période maximale d'un LFSR de degré 5 :
reponse: 31
= 2⁵ − 1 = 31.
? {lfsr} Exemple du prof : s(i+3) = s(i+1) + s(i) mod 2, départ s₂s₁s₀ = 100. Donne les 7 premiers bits de sortie.
reponse: 0010111
= Voir le tableau de la leçon : 0, 0, 1, 0, 1, 1, 1.
? {lfsr} TD2 : LFSR x⁴ + x + 1, état s₃s₂s₁s₀ = 1000. Donne les 8 premiers bits de sortie.
reponse: 00010011
= Nouveau bit = s₀ ⊕ s₁, le bit sortant est s₀. Flux complet : 000100110101111.
? {lfsr} Chiffrement par flot : M = 1001 et le flux vaut S = 0001. Que vaut C ?
reponse: 1000
= C = M ⊕ S = 1001 ⊕ 0001 = 1000.
? {lfsr} Attaque à clair connu : M = 1001, C = 1011. Que vaut le flux S ?
reponse: 0010
= S = M ⊕ C = 0010 : connaître le clair donne directement le flux.
? {lfsr} Le flux récupéré se répète tous les 7 bits. Degré m du LFSR (période maximale) ?
reponse: 3
= 2ᵐ − 1 = 7, donc m = 3.
```

## QCM du chapitre

```qcm
? {lfsr} Un chiffrement par flot est synchrone si la suite chiffrante dépend :
+ seulement de l'état interne du GPA
- du message
- de la clé publique
- du dernier bit chiffré
= Asynchrone = dépend aussi de t symboles du message.

? {lfsr} Polynôme du LFSR de coefficients (p₃, p₂, p₁, p₀) = (0, 0, 1, 1) :
- x⁴ + x³ + 1
+ x⁴ + x + 1
- x³ + x + 1
- x⁴ + 1
= On garde x⁴ et les termes dont le coefficient vaut 1 : x (p₁) et 1 (p₀).

? {lfsr} Pourquoi n'utilise-t-on pas un LFSR seul ?
- Il est trop lent
+ Il est prévisible : 2m bits suffisent pour retrouver ses coefficients
- Il n'a pas de période
- Il faut une clé publique
= Berlekamp-Massey retrouve les coefficients à partir de 2m bits.

? {lfsr} A5/1 est utilisé dans :
- le Bluetooth
- le Wi-Fi
+ le GSM
- SSL
= RC4 : SSL et Wi-Fi ; E0 : Bluetooth ; A5 : GSM.
```

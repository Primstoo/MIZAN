---
id: denombrement
titre: Dénombrement : compter les cas
seance: A · Bases de probabilité
importance: 2
---

```html
<p class="small muted">Source : TD 3, 4, 5 · base de tous les calculs</p>
<p>Avant de calculer une probabilité, il faut souvent <b>compter</b> les cas possibles. Trois questions décident de la formule :</p>
<ol class="steps">
<li><b>L'ordre compte-t-il ?</b> Tirer « une boule puis une autre » (ordre) ou « deux boules d'un coup » (pas d'ordre, on dit <i>simultanément</i>).</li>
<li><b>Y a-t-il remise ?</b> Avec remise, le même objet peut ressortir.</li>
<li><b>Combien d'objets</b> $n$ au total, et <b>combien</b> $p$ on en prend.</li>
</ol>
<div class="tablewrap"><table class="t"><tr><th>Situation</th><th>Nombre de cas</th><th>Exemple</th></tr>
<tr><td>Ordre + sans remise (arrangement)</td><td>$A_n^p=\dfrac{n!}{(n-p)!}$</td><td>podium de 3 parmi 10 : $A_{10}^3=720$</td></tr>
<tr><td>Ordre + avec remise</td><td>$n^p$</td><td>code à 4 chiffres : $10^4$</td></tr>
<tr><td>Sans ordre + sans remise (combinaison)</td><td>$C_n^p=\dfrac{n!}{p!\,(n-p)!}$</td><td>2 boules parmi 7 : $C_7^2=21$</td></tr>
<tr><td>Tout ranger ($p=n$)</td><td>$n!$</td><td>5 livres sur une étagère : $120$</td></tr></table></div>
<div class="box"><b>Équiprobabilité.</b> Quand tous les résultats élémentaires ont la même chance (pièce équilibrée, tirage « au hasard »), on a
$$P(A)=\frac{\text{Card}(A)}{\text{Card}(\Omega)}=\frac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}.$$</div>
<h4>Exemple du TD (exercice 5)</h4>
<p>Une urne contient une boule « 0 », deux boules « 1 » et quatre boules « 3 ». On tire <b>simultanément</b> deux boules : $C_7^2=21$ paires équiprobables. La somme vaut 4 quand on tire un « 1 » et un « 3 » : $2\times4=8$ paires, donc $P(X=4)=8/21$.</p>
<div class="box trap"><b>Piège.</b> « Simultanément » = combinaisons. Ne multiplie pas par 2 pour l'ordre, sinon il faut aussi compter $\Omega$ avec ordre ($7\times6=42$) : le résultat est le même, mais mélanger les deux conventions donne une erreur.</div>
```

## Flashcards

```cartes
{denombrement@5} $C_n^p$ ? :: $\dfrac{n!}{p!(n-p)!}$ (sans ordre, sans remise)
{denombrement@6} $A_n^p$ ? :: $\dfrac{n!}{(n-p)!}$ (avec ordre, sans remise)
```

## Réponses courtes

```exercice
? {denombrement} Calcule $C_7^2$.
reponse: 21 ~0
= $C_7^2=\frac{7\times6}{2}=21$.
? {denombrement} Urne du TD (0 ; 1,1 ; 3,3,3,3), deux boules tirées simultanément. Donne $P(X=6)$ en décimal (somme = 6). Arrondis à 3 décimales.
reponse: 0.2857142857142857 ~0.002
= Il faut deux « 3 » : $C_4^2=6$ paires sur 21, soit $6/21=2/7\approx0{,}286$.
```

## QCM du chapitre

```qcm
? {denombrement} On tire simultanément 3 cartes parmi 32. Nombre de mains possibles ?
- $32^3$
- $A_{32}^3$
+ $C_{32}^3$
- $3!$
= Simultanément, sans ordre, sans remise : combinaison $C_{32}^3=4960$.

? {denombrement} On lance une pièce 3 fois. Nombre de résultats possibles ?
- 6
+ 8
- 9
- 3
= Ordre + « remise » (chaque lancer a 2 issues) : $2^3=8$.
```

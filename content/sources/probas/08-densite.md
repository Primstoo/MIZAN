---
id: densite
titre: Densité, fonction de répartition, probabilités
seance: C · Variables aléatoires continues
importance: 5
---

```html
<p class="small muted">Source : Toutes les questions continues · examens 2019-20, 2022-23 (U[0,1])</p>
<p>Une v.a <b>continue</b> $X$ a une <b>densité</b> $f$ : une fonction $f\ge0$ avec $\int_{-\infty}^{+\infty}f(x)\,dx=1$. Alors $P(a\le X\le b)=\int_a^b f(x)\,dx$ et $P(X=a)=0$ (donc $<$ ou $\le$, c'est pareil).</p>
<div class="box"><b>Fonction de répartition</b> : $F(x)=P(X\le x)=\int_{-\infty}^x f(t)\,dt$, et $F'=f$ là où $f$ est continue.
$$P(a<X\le b)=F(b)-F(a)$$
Propriétés : $0\le F\le1$, $F$ croissante, $\lim_{-\infty}F=0$, $\lim_{+\infty}F=1$, continue à droite.</div>
<h4>Méthode pour calculer $F$ : découper en zones</h4>
<p>Écris toujours les trois cas : à gauche du support ($F=0$), dans le support (on intègre), à droite ($F=1$).</p>
<h3>Exercice qui tombe : $X\sim\mathcal U[0,1]$, $P(x_1\le X\le x_2)$ (4 à 5 pts)</h3>
<p>$f(x)=1$ sur $[0,1]$, 0 ailleurs. $P(x_1\le X\le x_2)=\int_{x_1}^{x_2}f$. Il faut <b>discuter selon la position de $x_1<x_2$</b> :</p>
<div class="tablewrap"><table class="t"><tr><th>Cas</th><th>$P(x_1\le X\le x_2)$</th></tr>
<tr><td>$x_2<0$</td><td>0</td></tr>
<tr><td>$x_1<0\le x_2\le1$</td><td>$x_2$</td></tr>
<tr><td>$0\le x_1<x_2\le1$</td><td>$x_2-x_1$</td></tr>
<tr><td>$0\le x_1\le1<x_2$</td><td>$1-x_1$</td></tr>
<tr><td>$x_1<0$ et $x_2>1$</td><td>1</td></tr>
<tr><td>$x_1>1$</td><td>0</td></tr></table></div>
<div class="box prof">Les points viennent de la <b>discussion complète</b> : beaucoup d'étudiants ne donnent que $x_2-x_1$ et perdent la moitié.</div>
<h4>TD 8 : $F(x)=ax^2$ sur $]0,1]$</h4>
<p>$F$ continue en 1 : $a\cdot1^2=1$, donc $a=1$. $f(x)=F'(x)=2x$ sur $[0,1]$. $P(0{,}25<X<0{,}5)=F(0{,}5)-F(0{,}25)=0{,}25-0{,}0625=0{,}1875$, et on retrouve la même valeur avec $\int_{0{,}25}^{0{,}5}2x\,dx$.</p>
<h4>TD 9 : $f(x)=\tfrac34\sqrt{1-|x|}$ sur $[-1,1]$</h4>
<p>Pour $-1\le x\le0$ : $F(x)=\int_{-1}^x\tfrac34\sqrt{1+t}\,dt=\tfrac12(1+x)^{3/2}$. Pour $0\le x\le1$ : $F(x)=1-\tfrac12(1-x)^{3/2}$ (par symétrie). $F=0$ avant $-1$, $F=1$ après 1.</p>
```

## Flashcards

```cartes
{densite@19} Lien entre $F$ et $f$ (continu) :: $F(x)=\int_{-\infty}^xf(t)dt$ et $F'=f$
{densite@20} $P(a<X\le b)$ avec $F$ :: $F(b)-F(a)$
{densite@21} $\mathcal U[0,1]$ : $P(x_1\le X\le x_2)$ si $0\le x_1\le1<x_2$ :: $1-x_1$
```

## Réponses courtes

```exercice
? {densite} $X\sim\mathcal U[0,1]$. $P(-0{,}5\le X\le 0{,}3)$ ?
reponse: 0.3 ~0.001
= Cas $x_1<0\le x_2\le1$ : $x_2=0{,}3$.
? {densite} $X\sim\mathcal U[0,1]$. $P(0{,}4\le X\le 2)$ ?
reponse: 0.6 ~0.001
= $1-x_1=0{,}6$.
? {densite} $F(x)=ax^2$ sur $]0,1]$. Que vaut $a$ ?
reponse: 1 ~0
= Continuité en 1.
? {densite} $f(x)=2x$ sur $[0,1]$. $P(X\le0{,}5)$ ?
reponse: 0.25 ~0.001
= $F(0{,}5)=0{,}5^2$.
```

## QCM du chapitre

```qcm
? {densite} Pour une v.a continue, $P(X=2)$ vaut…
- $f(2)$
- $F(2)$
+ 0
= Un point a une probabilité nulle.
```

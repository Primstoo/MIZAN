---
id: normale
titre: Loi normale : transformations et table
seance: E · Lois usuelles continues
importance: 5
---

```html
<p class="small muted">Source : 5 examens sur 11, souvent 10 à 12 pts</p>
<p>$X\sim\mathcal N(m,\sigma)$ (attention : dans ce cours, le 2<sup>e</sup> paramètre est l'<b>écart-type</b> $\sigma$, pas la variance) :</p>
$$f(x)=\frac1{\sigma\sqrt{2\pi}}\exp\left[-\frac{(x-m)^2}{2\sigma^2}\right],\qquad E(X)=m,\ V(X)=\sigma^2.$$
<h3>1-a) Montrer que $Y=aX+b\sim\mathcal N(am+b,\,a\sigma)$ ($a>0$)</h3>
<ol class="steps">
<li>$G(y)=P(Y\le y)=P\left(X\le\frac{y-b}a\right)=F\left(\frac{y-b}a\right)$ car $a>0$.</li>
<li>$g(y)=\frac1af\left(\frac{y-b}a\right)=\frac1{a\sigma\sqrt{2\pi}}\exp\left[-\frac{\left(\frac{y-b}a-m\right)^2}{2\sigma^2}\right]$.</li>
<li>$\left(\frac{y-b}a-m\right)^2=\frac{(y-(am+b))^2}{a^2}$, donc $g(y)=\frac1{(a\sigma)\sqrt{2\pi}}\exp\left[-\frac{(y-(am+b))^2}{2(a\sigma)^2}\right]$.</li>
<li>On reconnaît la densité de $\mathcal N(am+b,\,a\sigma)$.</li></ol>
<h3>1-b) En déduire $Z=\frac{X-m}\sigma\sim\mathcal N(0,1)$</h3>
<p>$Z=\frac1\sigma X-\frac m\sigma$ : c'est $aX+b$ avec $a=\frac1\sigma>0$ et $b=-\frac m\sigma$. Donc $Z\sim\mathcal N\left(\frac m\sigma-\frac m\sigma,\ \frac\sigma\sigma\right)=\mathcal N(0,1)$.</p>
<h3>1-c) Si $Z\sim\mathcal N(0,1)$, alors $\sigma Z+m\sim\mathcal N(m,\sigma)$</h3>
<p>Appliquer 1-a à $Z$ (paramètres $0$ et $1$) avec $a=\sigma>0$, $b=m$ : $\mathcal N(\sigma\cdot0+m,\ \sigma\cdot1)=\mathcal N(m,\sigma)$.</p>
<h3>Utiliser la table</h3>
<p>$\Phi(x)=P(U\le x)$ pour $U\sim\mathcal N(0,1)$, donnée pour $x\ge0$. Pour $x<0$ : $\Phi(-x)=1-\Phi(x)$. Pour une normale quelconque :
$$P(X\le x)=\Phi\left(\frac{x-m}\sigma\right).$$</p>
<h3>Problème inverse (examen 2016-17 et TD 15)</h3>
<p>$P(X<2)=0{,}0668$ et $P(X\ge12)=0{,}1587$. On lit dans la table $\Phi(1{,}5)=0{,}9332$ et $\Phi(1)=0{,}8413$, donc :</p>
<ul><li>$\Phi\left(\frac{2-m}\sigma\right)=0{,}0668=1-0{,}9332$ ⇒ $\frac{2-m}\sigma=-1{,}5$</li>
<li>$1-\Phi\left(\frac{12-m}\sigma\right)=0{,}1587$ ⇒ $\frac{12-m}\sigma=1$</li></ul>
<p>Soustraction : $\frac{10}\sigma=2{,}5$, donc $\sigma=4$, $m=8$. Puis $P\big((X-8)^2<a\big)=P\left(|U|<\frac{\sqrt a}4\right)=2\Phi\left(\frac{\sqrt a}4\right)-1=0{,}95$ ⇒ $\Phi\left(\frac{\sqrt a}4\right)=0{,}975$ ⇒ $\frac{\sqrt a}4=1{,}96$ ⇒ $a=7{,}84^2\approx61{,}47$.</p>
<div class="box trap"><b>Erreur dans le corrigé du TD 15</b> (« exercices_proba », page 19). Avec $P(X<3)=0{,}1587$ et $P(X>12)=0{,}0228$, il faut $\frac{3-m}\sigma=-1$ et $\frac{12-m}\sigma=2$, donc $\sigma=3$ et $m=6$, puis $P(1<X<10)=\Phi(1{,}33)-\Phi(-1{,}67)\approx0{,}9082+0{,}9525-1=0{,}861$. Le corrigé trouve $m=1{,}9$, $\sigma=5{,}05$ et $0{,}51$ : c'est faux (il a lu la table à l'envers). Vérifié par calcul.</div>
```

## Flashcards

```cartes
{normale@48} $\mathcal N(m,\sigma)$ : que représente $\sigma$ ? :: L'écart-type ($V=\sigma^2$)
{normale@49} Loi de $aX+b$ si $X\sim\mathcal N(m,\sigma)$, $a>0$ :: $\mathcal N(am+b,\,a\sigma)$
{normale@50} $\Phi(-x)$ ? :: $1-\Phi(x)$
{normale@51} $P(|U|<c)$ pour $U\sim\mathcal N(0,1)$ :: $2\Phi(c)-1$
{normale@52} Valeurs de table à connaître :: $\Phi(1)=0{,}8413$ ; $\Phi(1{,}5)=0{,}9332$ ; $\Phi(1{,}96)=0{,}975$ ; $\Phi(2)=0{,}9772$
```

## Réponses courtes

```exercice
? {normale} $X\sim\mathcal N(10,2)$. $P(X\le12)$ à 4 décimales (table) ?
reponse: 0.8413 ~0.0006
= $\Phi(1)=0{,}8413$.
? {normale} $X\sim\mathcal N(10,2)$. $P(X\le7)$ à 4 décimales ?
reponse: 0.0668 ~0.0006
= $\Phi(-1{,}5)=1-0{,}9332$.
? {normale} Problème inverse de l'examen 2016-17 : valeur de $\sigma$ ?
reponse: 4 ~0.001
= $10/2{,}5$.
? {normale} TD 15 corrigé juste : $P(1<X<10)$ à 2 décimales ?
reponse: 0.86 ~0.006
= $m=6$, $\sigma=3$ : $\approx0{,}861$.
```

## QCM du chapitre

```qcm
? {normale} $X\sim\mathcal N(m,\sigma)$, $Y=3X-2$. Loi de $Y$ :
- $\mathcal N(3m-2,\,9\sigma)$
+ $\mathcal N(3m-2,\,3\sigma)$
- $\mathcal N(3m,\,3\sigma)$
= $\mathcal N(am+b,\,a\sigma)$ avec le 2e paramètre = écart-type.
```

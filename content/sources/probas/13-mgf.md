---
id: mgf
titre: Fonction génératrice des moments
seance: C · Variables aléatoires continues
importance: 3
---

```html
<p class="small muted">Source : Examens 2017-18 et 2020-21 (8 pts)</p>
$$M_X(t)=E\big(e^{tX}\big)=\int_{-\infty}^{+\infty}e^{tx}f(x)\,dx\quad(\text{continu}),\qquad =\sum_k e^{tk}P(X=k)\quad(\text{discret}).$$
<p>Elle « génère » les moments : $M_X'(0)=E(X)$, $M_X''(0)=E(X^2)$.</p>
<h3>Les trois calculs demandés à l'examen</h3>
<h4>a) Uniforme sur $[a,b]$</h4>
<p>$M_X(t)=\int_a^b\frac{e^{tx}}{b-a}dx$. Si $t=0$ : $M_X(0)=1$. Si $t\neq0$ :
$$M_X(t)=\frac{e^{tb}-e^{ta}}{t(b-a)}.$$</p>
<h4>b) Exponentielle de paramètre $\theta$</h4>
<p>$M_X(t)=\int_0^{+\infty}e^{tx}\theta e^{-\theta x}dx=\theta\int_0^{+\infty}e^{(t-\theta)x}dx$. L'intégrale converge seulement si $t-\theta<0$ :
$$M_X(t)=\frac{\theta}{\theta-t}\quad\text{si } t<\theta,\qquad M_X(t)=+\infty\quad\text{si } t\ge\theta.$$</p>
<h4>c) Normale centrée réduite</h4>
<p>On complète le carré : $tx-\frac{x^2}2=-\frac12(x-t)^2+\frac{t^2}2$.
$$M_X(t)=\frac1{\sqrt{2\pi}}\int e^{-\frac{(x-t)^2}2}e^{\frac{t^2}2}dx=e^{t^2/2}\underbrace{\int\frac1{\sqrt{2\pi}}e^{-s^2/2}ds}_{=1}=e^{t^2/2}\quad(s=x-t).$$</p>
<div class="box trap"><b>Pièges.</b> Tes notes manuscrites écrivent $\frac{-\theta}{t-\theta}$ : c'est juste, c'est la même chose que $\frac\theta{\theta-t}$. Le piège est d'oublier la condition $t<\theta$ (l'intégrale diverge si $t\ge\theta$) et le cas $t=0$ pour l'uniforme (on ne peut pas diviser par $t$).</div>
```

## Flashcards

```cartes
{mgf@33} Fonction génératrice des moments :: $M_X(t)=E(e^{tX})$
{mgf@34} $M_X(t)$ pour $\mathcal U[a,b]$ :: $\frac{e^{tb}-e^{ta}}{t(b-a)}$ si $t\neq0$, 1 si $t=0$
{mgf@35} $M_X(t)$ pour $\mathcal E(\theta)$ :: $\frac\theta{\theta-t}$ si $t<\theta$
{mgf@36} $M_X(t)$ pour $\mathcal N(0,1)$ :: $e^{t^2/2}$
```

## Réponses courtes

```exercice
? {mgf} $X\sim\mathcal E(2)$. $M_X(1)$ ?
reponse: 2 ~0.001
= $\frac{2}{2-1}=2$.
? {mgf} $X\sim\mathcal N(0,1)$. $M_X(2)$ arrondi à 2 décimales ?
reponse: 7.38905609893065 ~0.01
= $e^{2}\approx7{,}39$.
```

## QCM du chapitre

```qcm
? {mgf} Pour $X\sim\mathcal E(\theta)$, $M_X(t)$ est finie pour…
- $t>\theta$
+ $t<\theta$
- tout $t$
= Il faut $t-\theta<0$.

? {mgf} $M_X(0)$ vaut toujours :
- 0
+ 1
- $E(X)$
= $E(e^0)=1$.
```

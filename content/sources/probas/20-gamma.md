---
id: gamma
titre: Loi Gamma
seance: E · Lois usuelles continues
importance: 5
---

```html
<p class="small muted">Source : Examens 2022-23 ord. (10 pts) et 2023-24 ord. (12 pts)</p>
<p>$X\sim\gamma(p,\theta)$ ($p>0$, $\theta>0$) : v.a positive de densité
$$f(x)=\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}\ (x\ge0),\qquad \Gamma(p)=\int_0^{+\infty}e^{-x}x^{p-1}dx.$$
<p>Cas particulier : $\gamma(1,\theta)=\mathcal E(\theta)$.</p>
<h3>1-a) $\Gamma(p)=(p-1)!$</h3>
<ol class="steps">
<li>Intégration par parties avec $u=x^{p-1}$, $v'=e^{-x}$ (pour $p>1$) :
$\Gamma(p)=\big[-e^{-x}x^{p-1}\big]_0^{+\infty}+(p-1)\int_0^{+\infty}e^{-x}x^{p-2}dx$.</li>
<li>Le crochet vaut 0 (en $+\infty$ l'exponentielle l'emporte ; en 0, $x^{p-1}\to0$ car $p>1$). Donc $\Gamma(p)=(p-1)\Gamma(p-1)$.</li>
<li>$\Gamma(1)=\int_0^{+\infty}e^{-x}dx=1$.</li>
<li>Par récurrence, pour $p\in\mathbb N^*$ : $\Gamma(p)=(p-1)(p-2)\cdots1\cdot\Gamma(1)=(p-1)!$</li></ol>
<p class="small muted">L'énoncé écrit « $\forall p>1$ » ; la factorielle n'a de sens que pour $p$ entier. Précise-le en une ligne.</p>
<h3>1-b) $E(X)=\frac p\theta$ et $V(X)=\frac p{\theta^2}$</h3>
<p>Changement de variable $y=\theta x$ ($dx=dy/\theta$) :
$$E(X)=\frac{\theta^p}{\Gamma(p)}\int_0^{+\infty}e^{-\theta x}x^pdx=\frac{\theta^p}{\Gamma(p)}\int_0^{+\infty}e^{-y}\frac{y^p}{\theta^p}\frac{dy}\theta=\frac1\theta\frac{\Gamma(p+1)}{\Gamma(p)}=\frac p\theta,$$
car $\Gamma(p+1)=p\,\Gamma(p)$. De même $E(X^2)=\frac1{\theta^2}\frac{\Gamma(p+2)}{\Gamma(p)}=\frac{p(p+1)}{\theta^2}$, d'où $V(X)=\frac{p(p+1)-p^2}{\theta^2}=\frac p{\theta^2}$.</p>
<h3>2) Loi de $Y=\theta X$</h3>
<p>$G(y)=P(\theta X\le y)=F\left(\frac y\theta\right)$ donc $g(y)=\frac1\theta f\left(\frac y\theta\right)=\frac1\theta\frac{\theta^p}{\Gamma(p)}e^{-y}\frac{y^{p-1}}{\theta^{p-1}}=\frac{e^{-y}y^{p-1}}{\Gamma(p)}$ pour $y\ge0$ : <b>$Y\sim\gamma(p,1)$</b>.</p>
<h3>3-a) $E(Y)=p$ et $V(Y)=p$</h3>
<p>Formules précédentes avec $\theta=1$, ou bien $E(Y)=\theta E(X)=p$ et $V(Y)=\theta^2V(X)=p$.</p>
<h3>3-b) Passer de $\gamma(p,1)$ à $\gamma(p,\theta)$</h3>
<p>Si $Y\sim\gamma(p,1)$, alors $X=\frac Y\theta\sim\gamma(p,\theta)$ : $F_X(x)=P(Y\le\theta x)=F_Y(\theta x)$, donc $f_X(x)=\theta f_Y(\theta x)=\theta\frac{e^{-\theta x}(\theta x)^{p-1}}{\Gamma(p)}=\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}$.</p>
<h3>4) Loi de $\theta S_n$ avec $X_i\sim\mathcal E(\theta)$ indépendantes</h3>
<p><b>Convolution</b> (cours) : si $X\sim\gamma(p,\theta)$ et $Y\sim\gamma(q,\theta)$ sont indépendantes, $X+Y\sim\gamma(p+q,\theta)$. Comme $X_i\sim\gamma(1,\theta)$, $S_n\sim\gamma(n,\theta)$, puis d'après la question 2, $\theta S_n\sim\gamma(n,1)$.</p>
<div class="box prof">Variante possible : prouver la somme avec la fonction génératrice : $M_{S_n}(t)=\prod M_{X_i}(t)=\left(\frac\theta{\theta-t}\right)^n$, qui est celle de $\gamma(n,\theta)$.</div>
<p>Les questions 5 et 6 (Khi-deux) sont dans la notion suivante.</p>
```

## Flashcards

```cartes
{gamma@53} Densité de $\gamma(p,\theta)$ :: $\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}$, $x\ge0$
{gamma@54} $\Gamma(p)$ pour $p$ entier ; $\Gamma(\frac12)$ :: $(p-1)!$ ; $\sqrt\pi$
{gamma@55} $\gamma(p,\theta)$ : $E$ et $V$ :: $\frac p\theta$ et $\frac p{\theta^2}$
{gamma@56} Loi de $\theta X$ si $X\sim\gamma(p,\theta)$ :: $\gamma(p,1)$
{gamma@57} Somme de $n$ exponentielles $\mathcal E(\theta)$ indépendantes :: $\gamma(n,\theta)$
```

## Réponses courtes

```exercice
? {gamma} $\Gamma(5)$ ?
reponse: 24 ~0
= $4!$.
? {gamma} $X\sim\gamma(3,2)$. $E(X)$ ?
reponse: 1.5 ~0.001
= $p/\theta$.
? {gamma} $X\sim\gamma(3,2)$. $V(X)$ ?
reponse: 0.75 ~0.001
= $p/\theta^2=3/4$.
```

## QCM du chapitre

```qcm
? {gamma} $X\sim\gamma(p,\theta)$. Loi de $\theta X$ :
- $\gamma(p,\theta^2)$
+ $\gamma(p,1)$
- $\gamma(\theta p,1)$
= Question 2 de l'examen.

? {gamma} $X_1,\dots,X_n$ indépendantes $\mathcal E(\theta)$. Loi de $S_n$ :
- $\mathcal E(n\theta)$
+ $\gamma(n,\theta)$
- $\gamma(1,n\theta)$
= Convolution des Gamma de même $\theta$.
```

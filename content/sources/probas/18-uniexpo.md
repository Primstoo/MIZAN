---
id: uniexpo
titre: Uniforme et exponentielle (et taux de hasard)
seance: E · Lois usuelles continues
importance: 3
---

```html
<p class="small muted">Source : Examens 2016-17 ord. (7 pts), U[0,1] dans 2 sujets</p>
<div class="tablewrap"><table class="t"><tr><th>Loi</th><th>Densité</th><th>$F(x)$</th><th>$E$</th><th>$V$</th></tr>
<tr><td>$\mathcal U[a,b]$</td><td>$\frac1{b-a}$ sur $[a,b]$</td><td>$\frac{x-a}{b-a}$ sur $[a,b]$</td><td>$\frac{a+b}2$</td><td>$\frac{(b-a)^2}{12}$</td></tr>
<tr><td>$\mathcal E(\theta)$</td><td>$\theta e^{-\theta x}$, $x>0$</td><td>$1-e^{-\theta x}$, $x>0$</td><td>$\frac1\theta$</td><td>$\frac1{\theta^2}$</td></tr></table></div>
<p>L'exponentielle modélise une durée de vie. C'est aussi $\gamma(1,\theta)$ : voir la notion Gamma.</p>
<h3>Exercice d'examen : le taux de hasard</h3>
<p>$X\ge0$ de densité $f$ et répartition $F$ ; $g(x)=\dfrac{f(x)}{1-F(x)}$.</p>
<ol class="steps">
<li>$\dfrac{f}{1-F}=-\big(\ln(1-F)\big)'$. On intègre de 0 à $x$ avec $F(0)=0$ : $G(x)=\int_0^xg(u)du=-\ln(1-F(x))$.</li>
<li>Donc $1-F(x)=e^{-G(x)}$, soit $F(x)=1-e^{-G(x)}$.</li>
<li>Exponentielle : $g(x)=\dfrac{\lambda e^{-\lambda x}}{e^{-\lambda x}}=\lambda$ (taux constant : pas de vieillissement).</li>
<li>$f(x)=\alpha\lambda x^{\alpha-1}e^{-\lambda x^\alpha}$ (loi de Weibull) : $F(x)=1-e^{-\lambda x^\alpha}$, donc $g(x)=\alpha\lambda x^{\alpha-1}$.</li></ol>
```

## Flashcards

```cartes
{uniexpo@45} $\mathcal U[a,b]$ : $E$ et $V$ :: $\frac{a+b}2$ et $\frac{(b-a)^2}{12}$
{uniexpo@46} $\mathcal E(\theta)$ : $F$, $E$, $V$ :: $1-e^{-\theta x}$, $\frac1\theta$, $\frac1{\theta^2}$
{uniexpo@47} Taux de hasard et $F$ :: $F=1-e^{-G}$, $G=\int_0^xg$
```

## Réponses courtes

```exercice
? {uniexpo} $X\sim\mathcal U[2,8]$. $V(X)$ ?
reponse: 3 ~0.001
= $36/12$.
? {uniexpo} $X\sim\mathcal E(0{,}5)$. $E(X)$ ?
reponse: 2 ~0
= $1/\theta$.
? {uniexpo} $X\sim\mathcal E(0{,}5)$. $P(X>2)$ à 3 décimales ?
reponse: 0.36787944117144233 ~0.002
= $e^{-1}\approx0{,}368$.
```

## QCM du chapitre

```qcm
? {uniexpo} Taux de hasard de $\mathcal E(\lambda)$ :
- $\lambda x$
+ $\lambda$
- $1/\lambda$
= Constant.
```

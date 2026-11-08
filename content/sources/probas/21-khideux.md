---
id: khideux
titre: Loi du Khi-deux et liens Normale-Gamma
seance: E · Lois usuelles continues
importance: 5
---

```html
<p class="small muted">Source : Examens 2019-20, 2021-22, 2022-23, 2023-24</p>
<div class="box">$\chi^2_n=\gamma\left(\frac n2,\frac12\right)$, $n$ entier $\ge1$ (degrés de liberté). Donc
$$E(\chi^2_n)=\frac{n/2}{1/2}=n,\qquad V(\chi^2_n)=\frac{n/2}{1/4}=2n.$$</div>
<h3>5-6) Passer de $\gamma(p,1)$ à $\chi^2_{2p}$</h3>
<p>Si $Y\sim\gamma(p,1)$ et $X=2Y$ : $G(x)=P(2Y\le x)=F_Y\left(\frac x2\right)$, donc
$$g(x)=\frac12f_Y\left(\frac x2\right)=\frac12\frac{e^{-x/2}(x/2)^{p-1}}{\Gamma(p)}=\frac{(1/2)^p}{\Gamma(p)}e^{-x/2}x^{p-1},$$
qui est la densité de $\gamma(p,\frac12)=\chi^2_{2p}$.</p>
<h3>Si $X\sim\mathcal N(m,\sigma)$ alors $\left(\frac{X-m}\sigma\right)^2\sim\chi^2_1$</h3>
<p>Indications données à l'examen : $\chi^2_1=\gamma(\frac12,\frac12)$ et $\Gamma(\frac12)=\sqrt\pi$.</p>
<ol class="steps">
<li>$U=\frac{X-m}\sigma\sim\mathcal N(0,1)$ (question précédente). On pose $Y=U^2$, densité de $U$ : $\varphi(u)=\frac1{\sqrt{2\pi}}e^{-u^2/2}$, répartition $\Phi$.</li>
<li>Pour $y\le0$ : $G(y)=0$. Pour $y>0$ : $G(y)=P(-\sqrt y\le U\le\sqrt y)=\Phi(\sqrt y)-\Phi(-\sqrt y)$.</li>
<li>$g(y)=\frac1{2\sqrt y}\big[\varphi(\sqrt y)+\varphi(-\sqrt y)\big]=\frac{\varphi(\sqrt y)}{\sqrt y}=\frac{e^{-y/2}}{\sqrt{2\pi y}}$ (car $\varphi$ est paire).</li>
<li>On réécrit : $\frac{e^{-y/2}}{\sqrt{2\pi}\sqrt y}=\frac{(1/2)^{1/2}}{\sqrt\pi}e^{-y/2}y^{\frac12-1}=\frac{(1/2)^{1/2}}{\Gamma(1/2)}e^{-y/2}y^{\frac12-1}$.</li>
<li>C'est la densité de $\gamma(\frac12,\frac12)=\chi^2_1$.</li></ol>
<h3>Somme de carrés (examen 2019-20)</h3>
<p>$X_1,\dots,X_n$ <b>indépendantes</b> de loi $\mathcal N(0,1)$ : chaque $X_i^2\sim\chi^2_1=\gamma(\frac12,\frac12)$. Par convolution des Gamma de même $\theta=\frac12$ :
$$X_1^2+\dots+X_n^2\sim\gamma\left(\frac n2,\frac12\right)=\chi^2_n.$$
Plus généralement $\chi^2_n+\chi^2_m=\chi^2_{n+m}$ (indépendantes) : en ajoutant un carré de plus, on obtient $\chi^2_{n+1}$.</p>
<div class="box prof">Le nombre de degrés de liberté = nombre de v.a indépendantes qui entrent dans la construction (moins le nombre de relations entre elles).</div>
```

## Flashcards

```cartes
{khideux@58} $\chi^2_n$ = quelle loi Gamma ? :: $\gamma\left(\frac n2,\frac12\right)$
{khideux@59} $E(\chi^2_n)$ et $V(\chi^2_n)$ :: $n$ et $2n$
{khideux@60} Loi de $2Y$ si $Y\sim\gamma(p,1)$ :: $\gamma(p,\frac12)=\chi^2_{2p}$
{khideux@61} Loi de $\left(\frac{X-m}\sigma\right)^2$ si $X\sim\mathcal N(m,\sigma)$ :: $\chi^2_1$
{khideux@62} $\sum_{i=1}^nX_i^2$, $X_i$ i.i.d. $\mathcal N(0,1)$ :: $\chi^2_n$
```

## Réponses courtes

```exercice
? {khideux} $E(\chi^2_{10})$ ?
reponse: 10 ~0
= $n$.
? {khideux} $V(\chi^2_{10})$ ?
reponse: 20 ~0
= $2n$.
```

## QCM du chapitre

```qcm
? {khideux} $Y\sim\gamma(3,1)$. Loi de $2Y$ :
- $\chi^2_3$
+ $\chi^2_6$
- $\gamma(6,\frac12)$
= $\gamma(p,\frac12)=\chi^2_{2p}$.

? {khideux} $X_1..X_5$ indépendantes $\mathcal N(0,1)$. Loi de $\sum X_i^2$ :
- $\mathcal N(0,5)$
+ $\chi^2_5$
- $\gamma(5,1)$
= $\gamma(\frac52,\frac12)$.

? {khideux} Quelle indication sert à reconnaître $\gamma(\frac12,\frac12)$ ?
- $\Gamma(1)=1$
+ $\Gamma(\frac12)=\sqrt\pi$
- $\Phi(-x)=1-\Phi(x)$
= On remplace $\sqrt\pi$ par $\Gamma(\frac12)$.
```

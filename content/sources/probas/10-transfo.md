---
id: transfo
titre: Loi de Y = g(X) : la méthode de la fonction de répartition
seance: C · Variables aléatoires continues
importance: 5
---

```html
<p class="small muted">Source : Cœur des exercices Gamma et Normale (10 à 12 pts) · TD 12</p>
<p>Presque toutes les questions « donner la loi de $Y$ » ou « montrer que $Y\sim\dots$ » se font avec <b>une seule méthode</b> :</p>
<ol class="steps">
<li>Écrire $G(y)=P(Y\le y)$.</li>
<li>Remplacer $Y$ par $g(X)$ et <b>isoler $X$</b> : on obtient $G(y)$ en fonction de $F$.</li>
<li>Dériver : $g_Y(y)=G'(y)$ (dérivée d'une composée : $[F(u(y))]'=u'(y)\,f(u(y))$).</li>
<li>Remplacer $f$ par sa formule et <b>reconnaître</b> une densité connue.</li></ol>
<h4>Cas 1 : $Y=aX+b$</h4>
<p>Si $a>0$ : $G(y)=P(aX+b\le y)=P\left(X\le\frac{y-b}a\right)=F\left(\frac{y-b}a\right)$, donc $g(y)=\frac1a f\left(\frac{y-b}a\right)$.<br>
Si $a<0$ : l'inégalité change de sens, $G(y)=1-F\left(\frac{y-b}a\right)$, $g(y)=-\frac1af\left(\frac{y-b}a\right)$.<br>
Les deux cas ensemble : $g(y)=\dfrac1{|a|}f\left(\dfrac{y-b}a\right)$.</p>
<h4>Cas 2 : $Z=|X|$</h4>
<p>Pour $z\le0$ : $H(z)=0$. Pour $z>0$ : $H(z)=P(-z\le X\le z)=F(z)-F(-z)$, donc $h(z)=f(z)+f(-z)$.</p>
<h4>Cas 3 : $T=\ln|X|$</h4>
<p>$K(t)=P(|X|\le e^t)=F(e^t)-F(-e^t)$, donc $k(t)=e^t\big(f(e^t)+f(-e^t)\big)$ pour tout $t\in\mathbb R$.</p>
<h4>Cas 4 : $T=\ln|aX+b|$ (TD 16-II)</h4>
<p>$K(t)=P(|aX+b|\le e^t)$. Pour $a>0$ : $K(t)=F\left(\frac{e^t-b}a\right)-F\left(\frac{-e^t-b}a\right)$, et dans tous les cas $k(t)=\dfrac{e^t}{|a|}\left[f\left(\frac{e^t-b}a\right)+f\left(\frac{-e^t-b}a\right)\right]$.</p>
<h4>Cas 5 : $Y=U^2$ (sert pour le Khi-deux)</h4>
<p>Pour $y>0$ : $G(y)=P(-\sqrt y\le U\le\sqrt y)=F(\sqrt y)-F(-\sqrt y)$, donc $g(y)=\frac1{2\sqrt y}\big(f(\sqrt y)+f(-\sqrt y)\big)$.</p>
<div class="box prof"><b>Ce que le correcteur attend.</b> La ligne $G(y)=P(Y\le y)$ écrite explicitement, la discussion sur le signe de $a$ quand il n'est pas imposé, et la conclusion « on reconnaît la densité de … ».</div>
```

## Flashcards

```cartes
{transfo@24} Méthode pour la loi de $Y=g(X)$ :: Écrire $G(y)=P(Y\le y)$, isoler $X$, dériver, reconnaître
{transfo@25} Densité de $Y=aX+b$ :: $\frac1{|a|}f\left(\frac{y-b}a\right)$
{transfo@26} Densité de $|X|$ ($z>0$) :: $f(z)+f(-z)$
{transfo@27} Densité de $\ln|X|$ :: $e^t\left(f(e^t)+f(-e^t)\right)$
```

## Réponses courtes

```exercice
? {transfo} $X$ de densité $f$, $Y=2X+1$. On a $g(5)=\frac1{2}f(c)$. Que vaut $c$ ?
reponse: 2 ~0
= $\frac{y-b}a=\frac{5-1}2=2$.
```

## QCM du chapitre

```qcm
? {transfo} $Y=aX+b$ avec $a<0$. $G(y)$ vaut :
- $F(\frac{y-b}a)$
+ $1-F(\frac{y-b}a)$
- $F(ay+b)$
= Diviser par $a<0$ change le sens : $P(X\ge\frac{y-b}a)$.

? {transfo} Densité de $|X|$ pour $z>0$ :
- $f(z)-f(-z)$
+ $f(z)+f(-z)$
- $2f(z)$ toujours
= Dérivée de $F(z)-F(-z)$ : $f(z)+f(-z)$ ($2f(z)$ seulement si $f$ est paire).

? {transfo} Première ligne à écrire pour trouver la loi de $Y=g(X)$ :
- $g_Y(y)=f(g(y))$
+ $G(y)=P(Y\le y)$
- $E(Y)=g(E(X))$
= On part toujours de la fonction de répartition.
```

---
id: minmax
titre: Min et max de n variables indépendantes
seance: C · Variables aléatoires continues
importance: 5
---

```html
<p class="small muted">Source : 5 examens sur 11, 3 à 8 pts</p>
<p>$X_1,\dots,X_n$ indépendantes, de même fonction de répartition $F$ et même densité $f$. On note $M_n=\max X_i$ et $m_n=\min X_i$.</p>
<h4>Le maximum</h4>
<p>$M_n\le x$ signifie que <b>tous</b> les $X_i$ sont $\le x$ :</p>
$$G(x)=P(M_n\le x)=P\Big(\bigcap_{i=1}^n\{X_i\le x\}\Big)\overset{\text{indép.}}{=}\prod_{i=1}^nP(X_i\le x)=F(x)^n,\qquad g(x)=n\,f(x)\,F(x)^{n-1}.$$
<h4>Le minimum</h4>
<p>$m_n>x$ signifie que tous les $X_i$ sont $>x$ :</p>
$$H(x)=P(m_n\le x)=1-P(m_n>x)=1-\big(1-F(x)\big)^n,\qquad h(x)=n\,f(x)\,\big(1-F(x)\big)^{n-1}.$$
<h3>Application 1 : densité $\frac2a(1-\frac xa)$ (l'exercice phare)</h3>
<p>Avec $F(x)=\frac{2x}a-\frac{x^2}{a^2}$ sur $[0,a]$ : $G(x)=0$ si $x<0$ ; $G(x)=\left(\frac{2x}a-\frac{x^2}{a^2}\right)^n$ si $0\le x\le a$ ; $G(x)=1$ si $x>a$. Densité :
$$g(x)=n\cdot\frac2a\left(1-\frac xa\right)\left(\frac{2x}a-\frac{x^2}{a^2}\right)^{n-1}\ \text{ sur }[0,a],\quad 0\ \text{sinon.}$$</p>
<h3>Application 2 : loi uniforme sur [0,1] (examen 2016-17 ratt.)</h3>
<p>$F(x)=x$ sur $[0,1]$. Donc $g(x)=nx^{n-1}$ et $h(x)=n(1-x)^{n-1}$ sur $[0,1]$.</p>
$$E(M_n)=\int_0^1 x\cdot nx^{n-1}dx=\frac n{n+1},\qquad E(m_n)=\int_0^1 xn(1-x)^{n-1}dx=\frac1{n+1}.$$
<p><b>$m_n$ et $1-M_n$ ont la même loi</b> : $P(1-M_n\le x)=P(M_n\ge1-x)=1-(1-x)^n=H(x)$. On en déduit $E(m_n)=E(1-M_n)=1-E(M_n)$.</p>
<div class="box trap"><b>Pièges.</b> Écrire le mot « indépendantes » au moment de transformer l'intersection en produit (c'est là que sont les points). Ne pas oublier les zones $x<0$ et $x>a$.</div>
```

## Flashcards

```cartes
{minmax@28} Répartition et densité du max $M_n$ :: $F^n$ et $nfF^{n-1}$
{minmax@29} Répartition du min $m_n$ :: $1-(1-F)^n$
{minmax@30} $\mathcal U[0,1]$ : $E(M_n)$ et $E(m_n)$ :: $\frac n{n+1}$ et $\frac1{n+1}$
```

## Réponses courtes

```exercice
? {minmax} $X_i\sim\mathcal U[0,1]$, $n=4$. $E(M_4)$ ?
reponse: 0.8 ~0.001
= $n/(n+1)=4/5$.
? {minmax} $X_i\sim\mathcal U[0,1]$, $n=4$. $E(m_4)$ ?
reponse: 0.2 ~0.001
= $1/(n+1)$.
? {minmax} $X_i\sim\mathcal U[0,1]$, $n=3$. $P(M_3\le0{,}5)$ ?
reponse: 0.125 ~0.001
= $0{,}5^3$.
```

## QCM du chapitre

```qcm
? {minmax} $P(M_n\le x)$ vaut :
- $1-(1-F(x))^n$
+ $F(x)^n$
- $nF(x)$
= Tous les $X_i\le x$, indépendance, produit.
```

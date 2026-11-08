---
id: poisson
titre: Loi de Poisson et loi conditionnelle
seance: D · Lois usuelles discrètes
importance: 3
---

```html
<p class="small muted">Source : Examen 2017-18 (8 pts) · TD 11</p>
<p>$X\sim\mathcal P(\lambda)$ compte des apparitions d'un événement pendant une durée ; $\lambda$ est la moyenne.</p>
$$P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!},\ k\in\mathbb N,\qquad E(X)=V(X)=\lambda.$$
<p><b>Somme</b> : $X\sim\mathcal P(\lambda)$, $Y\sim\mathcal P(\mu)$ indépendantes $\Rightarrow S=X+Y\sim\mathcal P(\lambda+\mu)$.</p>
<h3>Exercice d'examen : loi de $X$ sachant $S=s$</h3>
<ol class="steps">
<li>Pour $0\le x\le s$ : $P(X=x\mid S=s)=\dfrac{P(X=x,\,S=s)}{P(S=s)}=\dfrac{P(X=x,\,Y=s-x)}{P(S=s)}$.</li>
<li>Indépendance : $=\dfrac{e^{-\lambda}\frac{\lambda^x}{x!}\cdot e^{-\mu}\frac{\mu^{s-x}}{(s-x)!}}{e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^s}{s!}}$.</li>
<li>Simplifier : les exponentielles s'annulent, $\frac{s!}{x!(s-x)!}=C_s^x$, donc $P(X=x\mid S=s)=C_s^x\left(\frac\lambda{\lambda+\mu}\right)^x\left(1-\frac\lambda{\lambda+\mu}\right)^{s-x}$.</li>
<li>On reconnaît : $X\mid(S=s)\sim\mathcal B\!\left(s,\frac\lambda{\lambda+\mu}\right)$.</li>
<li>Fonction de régression : $E(X\mid S=s)=s\,\frac\lambda{\lambda+\mu}$, donc $E(X\mid S)=S\frac\lambda{\lambda+\mu}$.</li>
<li>$E\big[E(X\mid S)\big]=\frac\lambda{\lambda+\mu}E(S)=\frac\lambda{\lambda+\mu}(\lambda+\mu)=\lambda=E(X)$.</li></ol>
<h4>Exemple du cours</h4>
<p>Une machine tombe en panne 2 fois par mois en moyenne : $X\sim\mathcal P(2)$. $P(X=0)=e^{-2}\approx0{,}135$ ; $P(X\ge2)=1-e^{-2}(1+2)\approx0{,}594$.</p>
```

## Flashcards

```cartes
{poisson@38} Poisson $\mathcal P(\lambda)$ : $P(X=k)$, $E$, $V$ :: $e^{-\lambda}\frac{\lambda^k}{k!}$, $\lambda$, $\lambda$
{poisson@39} $X\mid(X+Y=s)$ pour deux Poisson indépendantes :: $\mathcal B\left(s,\frac\lambda{\lambda+\mu}\right)$
```

## Réponses courtes

```exercice
? {poisson} $X\sim\mathcal P(2)$. $P(X\ge2)$ à 3 décimales ?
reponse: 0.5939941502901619 ~0.002
= $1-e^{-2}(1+2)\approx0{,}594$.
? {poisson} $\lambda=1$, $\mu=3$, $s=8$. $E(X\mid S=8)$ ?
reponse: 2 ~0.001
= $8\times\frac14$.
? {poisson} $X\sim\mathcal P(4)$. $V(X)$ ?
reponse: 4 ~0
= $V=\lambda$.
```

## QCM du chapitre

```qcm
? {poisson} $X\sim\mathcal P(\lambda)$, $Y\sim\mathcal P(\mu)$ indépendantes. Loi de $X$ sachant $X+Y=s$ :
- $\mathcal P(\lambda)$
+ $\mathcal B(s,\frac\lambda{\lambda+\mu})$
- $\mathcal P(\lambda+\mu)$
= Calcul direct avec la définition de la probabilité conditionnelle.
```

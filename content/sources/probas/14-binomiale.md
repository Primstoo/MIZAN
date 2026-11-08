---
id: binomiale
titre: Bernoulli, binomiale (et uniforme, Dirac)
seance: D · Lois usuelles discrètes
importance: 3
---

```html
<p class="small muted">Source : Base des exercices discrets</p>
<div class="tablewrap"><table class="t"><tr><th>Loi</th><th>Valeurs</th><th>$P(X=k)$</th><th>$E$</th><th>$V$</th></tr>
<tr><td>Dirac $\delta_a$</td><td>$a$</td><td>1</td><td>$a$</td><td>0</td></tr>
<tr><td>Uniforme sur $\{x_1..x_n\}$</td><td>$x_i$</td><td>$1/n$</td><td>$\bar x$</td><td>$\frac1n\sum x_i^2-\bar x^2$</td></tr>
<tr><td>Bernoulli $\mathcal B(p)$</td><td>0, 1</td><td>$P(X=1)=p$</td><td>$p$</td><td>$p(1-p)$</td></tr>
<tr><td>Binomiale $\mathcal B(n,p)$</td><td>$0..n$</td><td>$C_n^kp^k(1-p)^{n-k}$</td><td>$np$</td><td>$np(1-p)$</td></tr></table></div>
<p><b>Binomiale</b> = nombre de succès en $n$ épreuves <b>indépendantes</b> et identiques. On écrit $X=X_1+\dots+X_n$ (Bernoulli indépendantes), d'où $E=np$ et $V=np(1-p)$.</p>
<p><b>Somme</b> : si $X_1\sim\mathcal B(n_1,p)$ et $X_2\sim\mathcal B(n_2,p)$ indépendantes, $X_1+X_2\sim\mathcal B(n_1+n_2,p)$ (même $p$ obligatoire).</p>
<h4>Exemple du cours</h4>
<p>On lance un dé 100 fois, succès = « 3 ou 6 » ($p=1/3$). $X\sim\mathcal B(100,\frac13)$, $E(X)=\frac{100}3\approx33{,}3$, $V(X)=100\cdot\frac13\cdot\frac23\approx22{,}2$, $\sigma\approx4{,}71$.</p>
<div class="box trap"><b>Piège</b> (exercice du poly) : $P(X=1{,}5)=0$ pour une binomiale, car 1,5 n'est pas une valeur possible.</div>
```

## Flashcards

```cartes
{binomiale@37} Binomiale $\mathcal B(n,p)$ : $P(X=k)$, $E$, $V$ :: $C_n^kp^k(1-p)^{n-k}$, $np$, $np(1-p)$
```

## Réponses courtes

```exercice
? {binomiale} $X\sim\mathcal B(20;0{,}1)$. $E(X)$ ?
reponse: 2 ~0
= $np$.
? {binomiale} $X\sim\mathcal B(20;0{,}1)$. $P(X=0)$ à 4 décimales ?
reponse: 0.12157665459056935 ~0.0005
= $0{,}9^{20}\approx0{,}1216$.
? {binomiale} $X\sim\mathcal B(20;0{,}1)$. $P(X=1{,}5)$ ?
reponse: 0 ~0
= Valeur impossible.
? {binomiale} $V(X)$ pour $\mathcal B(100,\frac13)$, à 2 décimales ?
reponse: 22.22222222222222 ~0.01
= $100\cdot\frac13\cdot\frac23=22{,}22$.
```


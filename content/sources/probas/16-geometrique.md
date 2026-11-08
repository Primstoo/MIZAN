---
id: geometrique
titre: Loi géométrique (de Pascal)
seance: D · Lois usuelles discrètes
importance: 3
---

```html
<p class="small muted">Source : Examens 2021-22 ratt. et 2022-23 ord. (5 pts)</p>
<p>On répète des épreuves <b>indépendantes</b> de probabilité de succès $p$ <b>jusqu'au premier succès</b>. $X$ = nombre d'épreuves nécessaires (succès compris).</p>
$$P(X=k)=p\,(1-p)^{k-1},\ k\in\mathbb N^*,\qquad E(X)=\frac1p,\qquad V(X)=\frac{1-p}{p^2}.$$
<p>$\{X=k\}$ = $k-1$ échecs puis un succès : $\underbrace{\bar A\cdots\bar A}_{k-1}A$.</p>
<p>Formule utile : $P(X>k)=(1-p)^k$ (les $k$ premiers essais sont des échecs), donc $P(X\le k)=1-(1-p)^k$.</p>
<h3>L'exercice des cartes (examen)</h3>
<p>$n$ cartes numérotées de 1 à $n$, tirages <b>avec remise</b> jusqu'à obtenir la carte $n$.</p>
<ol class="steps">
<li>Chaque tirage est une épreuve de Bernoulli indépendante, succès = « tirer la carte $n$ », $p=\frac1n$. Donc $X\sim\mathcal G(\frac1n)$.</li>
<li>$P(X=k)=\frac1n\left(1-\frac1n\right)^{k-1}=\dfrac{(n-1)^{k-1}}{n^k}$, $k\ge1$.</li>
<li>$P(X\le50)=1-P(X>50)=1-\left(1-\frac1n\right)^{50}$. Pour $n=100$ : $1-0{,}99^{50}\approx0{,}395$.</li></ol>
<p>Version du cours : $P(X=21)=\frac{99^{20}}{100^{21}}\approx0{,}0082$ ; $P(X\le60)=1-0{,}99^{60}\approx0{,}453$.</p>
<div class="box prof">Si tu préfères la somme : $P(X>50)=\sum_{k\ge51}p(1-p)^{k-1}=p(1-p)^{50}\cdot\frac1{1-(1-p)}=(1-p)^{50}$. C'est la démarche du poly ; montre-la pour avoir tous les points.</div>
```

## Flashcards

```cartes
{geometrique@40} Géométrique $\mathcal G(p)$ : $P(X=k)$, $E$, $V$ :: $p(1-p)^{k-1}$, $\frac1p$, $\frac{1-p}{p^2}$
{geometrique@41} Géométrique : $P(X>k)$ :: $(1-p)^k$
```

## Réponses courtes

```exercice
? {geometrique} Cartes, $n=100$. $P(X\le50)$ à 3 décimales ?
reponse: 0.39499393286246365 ~0.002
= $1-0{,}99^{50}\approx0{,}395$.
? {geometrique} $X\sim\mathcal G(0{,}2)$. $E(X)$ ?
reponse: 5 ~0
= $1/p$.
? {geometrique} $X\sim\mathcal G(0{,}5)$. $P(X=3)$ ?
reponse: 0.125 ~0.001
= $0{,}5\times0{,}5^2$.
```

## QCM du chapitre

```qcm
? {geometrique} Les tirages des cartes se font avec remise. Pourquoi est-ce indispensable pour la loi géométrique ?
+ Pour que $p$ reste constant et les épreuves indépendantes
- Pour que $X$ soit fini
- Ce n'est pas indispensable
= Sans remise, la probabilité changerait à chaque tirage.
```

---
id: autresdiscretes
titre: Binomiale négative, hypergéométrique, différences
seance: D · Lois usuelles discrètes
importance: 2
---

```html
<p class="small muted">Source : Examen 2020-21 ord. (8 pts)</p>
<h4>Binomiale négative $\mathcal{BN}(n,p)$</h4>
<p>Épreuves indépendantes jusqu'à obtenir <b>$n$ succès</b>. $Y$ = nombre d'épreuves. $\{Y=y\}$ : $n-1$ succès parmi les $y-1$ premières, puis un succès.</p>
$$P(Y=y)=C_{y-1}^{n-1}p^n(1-p)^{y-n},\ y\ge n,\qquad E(Y)=\frac np,\ V(Y)=\frac{n(1-p)}{p^2}.$$
<p>C'est une somme de $n$ géométriques indépendantes.</p>
<h4>Hypergéométrique $\mathcal H(N,n,N_A)$</h4>
<p>$n$ tirages <b>sans remise</b> dans $N$ objets dont $N_A$ de type A. $X$ = nombre d'objets A tirés.</p>
$$P(X=k)=\frac{C_{N_A}^k\,C_{N-N_A}^{n-k}}{C_N^n},\qquad \max\{0,\,n-(N-N_A)\}\le k\le\min\{n,\,N_A\},\qquad E(X)=n\frac{N_A}N.$$
<h3>Exercice d'examen : les représentants</h3>
<p>On choisit $n$ étudiants parmi $N$, dont $N_1$ garçons. $X$ = nombre de garçons choisis.</p>
<ol class="steps"><li>Choix simultané, sans remise : $X\sim\mathcal H(N,n,N_1)$.</li>
<li>$k\le n$ et $k\le N_1$ ; il y a $n-k$ filles, donc $n-k\le N-N_1$. D'où $m=\max\{0,\,n-(N-N_1)\}$ et $M=\min\{n,\,N_1\}$.</li>
<li>$P(X=k)=\dfrac{C_{N_1}^kC_{N-N_1}^{n-k}}{C_N^n}$ pour $m\le k\le M$.</li></ol>
<h4>Les différences demandées</h4>
<div class="tablewrap"><table class="t"><tr><th>Paire</th><th>Ce qui est fixé</th><th>Ce qui est aléatoire</th></tr>
<tr><td>Binomiale / binomiale négative</td><td>Binomiale : le nombre d'épreuves $n$. BN : le nombre de succès $n$.</td><td>Binomiale : le nombre de succès. BN : le nombre d'épreuves.</td></tr>
<tr><td>Géométrique / binomiale négative</td><td colspan="2">La géométrique est le cas $n=1$ de la BN (attente du <b>premier</b> succès, au lieu du $n$-ième).</td></tr>
<tr><td>Binomiale / hypergéométrique</td><td colspan="2">Binomiale : tirages <b>avec remise</b>, indépendants, $p$ constant. Hypergéométrique : <b>sans remise</b>, tirages dépendants. Avec remise, $\mathcal H$ devient $\mathcal B(n,\frac{N_A}N)$.</td></tr></table></div>
<div class="box trap">Le poly dit que les indicatrices $X_i$ de l'hypergéométrique sont « indépendantes » : c'est inexact (sans remise, elles sont dépendantes). Le calcul de $E(X)$ reste juste, car la linéarité de l'espérance n'a pas besoin d'indépendance. Ne recopie pas cette phrase.</div>
```

## Flashcards

```cartes
{autresdiscretes@42} Binomiale négative : $P(Y=y)$ :: $C_{y-1}^{n-1}p^n(1-p)^{y-n}$, $y\ge n$
{autresdiscretes@43} Hypergéométrique : $P(X=k)$ :: $\frac{C_{N_A}^kC_{N-N_A}^{n-k}}{C_N^n}$
{autresdiscretes@44} Hypergéométrique : bornes de $k$ :: $\max\{0,n-(N-N_A)\}\le k\le\min\{n,N_A\}$
```

## Réponses courtes

```exercice
? {autresdiscretes} $N=10$, $N_1=4$ garçons, $n=8$ choisis. Valeur minimale $m$ du nombre de garçons ?
reponse: 2 ~0
= $\max(0,8-6)=2$.
? {autresdiscretes} Même situation. Valeur maximale $M$ ?
reponse: 4 ~0
= $\min(8,4)=4$.
? {autresdiscretes} $\mathcal{BN}(10,\frac13)$ : $E(Y)$ ?
reponse: 30 ~0
= $n/p$.
```

## QCM du chapitre

```qcm
? {autresdiscretes} Laquelle fixe le nombre de succès et rend aléatoire le nombre d'épreuves ?
- Binomiale
+ Binomiale négative
- Hypergéométrique
= BN : on attend le $n$-ième succès.
```

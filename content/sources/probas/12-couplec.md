---
id: couplec
titre: Couple de v.a continues
seance: C · Variables aléatoires continues
importance: 2
---

```html
<p class="small muted">Source : Examen 2016-17 ratt. (6 pts) · TD 10</p>
<p>La loi d'un couple continu est donnée par une densité $f(x,y)\ge0$ avec $\iint f=1$.</p>
<ul><li>$F(x,y)=P(X\le x,Y\le y)=\int_{-\infty}^x\int_{-\infty}^y f(u,v)\,dv\,du$</li>
<li>Marginales : $f_X(x)=\int f(x,y)\,dy$ et $f_Y(y)=\int f(x,y)\,dx$</li>
<li>Indépendance $\iff f(x,y)=f_X(x)f_Y(y)$ partout</li>
<li>Loi conditionnelle : $f_{Y\mid X=x}(y)=\dfrac{f(x,y)}{f_X(x)}$</li></ul>
<h3>Examen : $f(x,y)=\frac{xy}2$ sur $0\le y\le x\le2$</h3>
<p>Dessine le triangle : $x$ de 0 à 2, et pour chaque $x$, $y$ de 0 à $x$.</p>
<ol class="steps">
<li>Pour $0\le y\le x\le2$ : $F(x,y)=\int_0^y\int_v^x\frac{uv}2\,du\,dv=\int_0^y\frac v4(x^2-v^2)\,dv=\frac{x^2y^2}8-\frac{y^4}{16}$. Contrôle : $F(2,2)=2-1=1$.</li>
<li>$f_X(x)=\int_0^x\frac{xy}2dy=\frac{x^3}4$ sur $[0,2]$ ; $f_Y(y)=\int_y^2\frac{xy}2dx=\frac{y(4-y^2)}4$ sur $[0,2]$.</li>
<li>$f_X(x)f_Y(y)\neq f(x,y)$ (par exemple en $x=1$, $y=1{,}5$ : $f=0$ mais le produit est non nul) : <b>pas indépendantes</b>. Un support triangulaire donne toujours des variables dépendantes.</li>
<li>$f_{Y\mid X=x}(y)=\dfrac{xy/2}{x^3/4}=\dfrac{2y}{x^2}$ pour $0\le y\le x$.</li></ol>
<h3>TD 10 : $f(x,y)=k(x+y)$ sur $[0,1]^2$</h3>
<p>$\iint (x+y)=1$ donc $k=1$. $F(x,y)=\frac{xy(x+y)}2$ sur $[0,1]^2$. $f_X(x)=x+\frac12$, $f_Y(y)=y+\frac12$. Non indépendantes. $f_{Y\mid X=x}(y)=\dfrac{x+y}{x+\frac12}$.</p>
```

## Flashcards

```cartes
{couplec@31} Marginale $f_X$ d'un couple continu :: $\int f(x,y)dy$
{couplec@32} Densité conditionnelle $f_{Y\mid X=x}$ :: $\dfrac{f(x,y)}{f_X(x)}$
```

## Réponses courtes

```exercice
? {couplec} $f(x,y)=k(x+y)$ sur $[0,1]^2$. Valeur de $k$ ?
reponse: 1 ~0
= $\iint(x+y)=\frac12+\frac12=1$.
? {couplec} $f(x,y)=\frac{xy}2$ sur $0\le y\le x\le2$. $f_X(2)$ ?
reponse: 2 ~0.001
= $x^3/4=8/4$.
```

## QCM du chapitre

```qcm
? {couplec} Un couple de densité non nulle seulement sur un triangle peut-il être indépendant ?
- Oui
+ Non
= Le produit des marginales serait non nul sur tout un rectangle.
```

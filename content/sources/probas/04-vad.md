---
id: vad
titre: V.a discrète : loi, espérance, variance
seance: B · Variables aléatoires discrètes
importance: 4
---

```html
<p class="small muted">Source : Examens 2020-21 ord., 2022-23 ratt. (4 pts)</p>
<p>Une <b>variable aléatoire discrète</b> $X$ associe un nombre à chaque résultat ; elle prend des valeurs $x_1,x_2,\dots$ en nombre fini ou dénombrable. Sa <b>loi</b> est la liste des couples $(x_i,\,p_i)$ avec $p_i=P(X=x_i)$.</p>
<div class="box"><b>Vérifier qu'une suite est une loi de probabilité</b> : deux conditions, toutes deux à écrire.
$$\text{(1) } 0\le p_i\le 1\ \text{ pour tout } i\qquad\text{(2) }\sum_i p_i=1$$</div>
<h4>Les formules à connaître par cœur</h4>
$$E(X)=\sum_i x_i\,p_i\qquad E(g(X))=\sum_i g(x_i)\,p_i\qquad V(X)=E(X^2)-\big(E(X)\big)^2$$
$$E(aX+b)=aE(X)+b\qquad V(aX+b)=a^2\,V(X)\qquad \sigma(X)=\sqrt{V(X)}$$
<p>Fonction de répartition : $F(x)=P(X\le x)=\sum_{x_i\le x}p_i$. C'est une fonction en escalier, croissante, de 0 à 1.</p>
<h3>L'exercice qui tombe (4 pts)</h3>
<p>$P(X=0)=(1-p)^2$, $P(X=1)=2p(1-p)$, $P(X=2)=p^2$ avec $0\le p\le1$.</p>
<ol class="steps">
<li><b>C'est une loi.</b> Chaque terme est un produit de nombres de $[0,1]$ donc dans $[0,1]$ (pour $2p(1-p)$ : son maximum vaut $1/2$ en $p=1/2$). Somme : $(1-p)^2+2p(1-p)+p^2=\big((1-p)+p\big)^2=1$.</li>
<li>$E(X)=0\cdot(1-p)^2+1\cdot2p(1-p)+2p^2=2p$.</li>
<li>$E(X^2)=2p(1-p)+4p^2=2p+2p^2$, donc $V(X)=2p+2p^2-4p^2=2p(1-p)$.</li>
<li>$Y=-3X+1$ : $E(Y)=-3E(X)+1=1-6p$ et $V(Y)=(-3)^2V(X)=18p(1-p)$.</li></ol>
<div class="box prof"><b>Remarque qui rapporte.</b> Cette loi est la binomiale $\mathcal B(2,p)$ : on retrouve $E=np=2p$ et $V=np(1-p)$. Le dire en une ligne montre que tu as compris.</div>
<div class="box trap"><b>Pièges.</b> $V(-3X+1)=9V(X)$, jamais $-3V(X)$ ; la constante $+1$ disparaît dans la variance. Et $V(X)=E(X^2)-E(X)^2$, pas $E(X)^2-E(X^2)$.</div>
```

## Flashcards

```cartes
{vad@7} Deux conditions pour qu'une suite $(p_i)$ soit une loi :: $p_i\ge0$ et $\sum p_i=1$
{vad@8} $E(aX+b)$ et $V(aX+b)$ :: $aE(X)+b$ et $a^2V(X)$
{vad@9} Formule de König :: $V(X)=E(X^2)-E(X)^2$
```

## Réponses courtes

```exercice
? {vad} Avec la loi $(1-p)^2,\ 2p(1-p),\ p^2$ et $p=0{,}3$ : calcule $E(-3X+1)$.
reponse: -0.8 ~0.001
= $1-6p=1-1{,}8=-0{,}8$.
? {vad} Même loi, $p=0{,}3$ : calcule $V(-3X+1)$.
reponse: 3.78 ~0.001
= $18p(1-p)=18\times0{,}3\times0{,}7=3{,}78$.
? {vad} TD 1 : $X(a)=X(b)=X(c)=X(d)=-1$, $X(e)=0$ avec $P(\{a,b\})=2/5$, $P(\{c,d\})=1/5$, $P(\{e\})=2/5$. Donne $P(X=-1)$ en décimal.
reponse: 0.6 ~0.001
= $2/5+1/5=3/5=0{,}6$.
```

## QCM du chapitre

```qcm
? {vad} $V(-3X+1)$ vaut :
- $-3V(X)+1$
- $9V(X)+1$
+ $9V(X)$
- $-3V(X)$
= $V(aX+b)=a^2V(X)$.

? {vad} Pour montrer qu'une suite $(p_i)$ est une loi de probabilité, on vérifie…
- seulement $\sum p_i=1$
+ $p_i\ge0$ et $\sum p_i=1$
- $E(X)$ existe
- que $F$ est continue
= Positivité (donc $\le1$) et somme égale à 1.
```

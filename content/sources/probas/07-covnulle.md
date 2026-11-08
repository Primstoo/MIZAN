---
id: covnulle
titre: Covariance nulle et indépendance
seance: B · Variables aléatoires discrètes
importance: 4
---

```html
<p class="small muted">Source : Examens 2020-21 ratt., 2021-22 ratt. (5 à 8 pts)</p>
$$\text{Cov}(X,Y)=E\big[(X-E X)(Y-E Y)\big]=E(XY)-E(X)E(Y)$$
<div class="box"><b>Le résultat central.</b> Indépendantes $\Rightarrow$ $\text{Cov}=0$. <b>La réciproque est fausse en général</b>, sauf pour deux variables de Bernoulli.</div>
<h3>1) Indépendantes ⇒ Cov = 0</h3>
<p>Cas continu (examen 2021-22) : <b>CNS d'indépendance</b> : $f(x,y)=f_X(x)\,f_Y(y)$ pour tout $(x,y)$ (ou $F(x,y)=F_X(x)F_Y(y)$). Alors
$$E(XY)=\iint xy\,f_X(x)f_Y(y)\,dx\,dy=\int x f_X(x)dx\int yf_Y(y)dy=E(X)E(Y),$$ donc $\text{Cov}(X,Y)=0$.</p>
<h3>2) Contre-exemple : $Z\sim\mathcal N(0,1)$ et $T=Z^2$</h3>
<ol class="steps"><li>$E(Z^3)=\int_{-\infty}^{+\infty}\frac{x^3}{\sqrt{2\pi}}e^{-x^2/2}dx=0$ : la fonction est <b>impaire</b> et l'intégrale converge, sur un intervalle symétrique.</li>
<li>$\text{Cov}(Z,T)=E(Z\cdot Z^2)-E(Z)E(Z^2)=E(Z^3)-0\times1=0$.</li>
<li><b>Conclusion</b> : $\text{Cov}(Z,T)=0$ alors que $T=Z^2$ dépend totalement de $Z$. Une covariance nulle n'implique pas l'indépendance.</li></ol>
<h3>3) Le cas Bernoulli où la réciproque est vraie</h3>
<p>Tableau donné (avec $0\le p<1$) :</p>
<div class="tablewrap"><table class="t"><tr><th>$X\backslash Y$</th><th>0</th><th>1</th><th>$P(X=i)$</th></tr>
<tr><th>0</th><td>$p$</td><td>$1-p-p_1$</td><td>$1-p_1$</td></tr>
<tr><th>1</th><td>$1-p-p_2$</td><td>$p_1+p_2+p-1$</td><td>$p_1$</td></tr>
<tr><th>$P(Y=j)$</th><td>$1-p_2$</td><td>$p_2$</td><td>1</td></tr></table></div>
<ol class="steps">
<li>$XY$ vaut 1 seulement si $X=Y=1$ : $E(XY)=P(X=1,Y=1)=p_1+p_2+p-1$.</li>
<li>$E(X)=p_1$, $E(Y)=p_2$, donc $\text{Cov}(X,Y)=p_1+p_2+p-1-p_1p_2$.</li>
<li><b>CNS d'indépendance</b> : $P(X=i,Y=j)=P(X=i)P(Y=j)$ pour les 4 cases.</li>
<li><b>Si Cov = 0</b> : $P(1,1)=p_1p_2$. Puis on déduit les trois autres cases :
$P(1,0)=p_1-p_1p_2=p_1(1-p_2)$ ; $P(0,1)=p_2-p_1p_2=(1-p_1)p_2$ ; $P(0,0)=1-p_1-p_2+p_1p_2=(1-p_1)(1-p_2)$. Les 4 cases sont des produits : $X$ et $Y$ sont indépendantes.</li></ol>
<div class="box prof">Le prof a aussi donné en TD un tableau ($X\in\{0,1\}$, $Y\in\{0,1,2\}$, cases 1/20, 1/4, 0 / 17/60, 1/4, 1/6) où $\text{Cov}=0$ mais $P(X=0,Y=2)=0\neq\frac3{10}\cdot\frac16$ : non indépendantes. Même message.</div>
```

## Flashcards

```cartes
{covnulle@15} Indépendantes $\Rightarrow$ Cov = 0. Et la réciproque ? :: Fausse en général (contre-exemple $Z$, $Z^2$). Vraie pour deux Bernoulli.
{covnulle@16} $E(Z^3)$ pour $Z\sim\mathcal N(0,1)$ :: 0 (fonction impaire)
{covnulle@17} Tableau Bernoulli : $E(XY)$ :: $P(X=1,Y=1)=p_1+p_2+p-1$
{covnulle@18} CNS d'indépendance, cas continu :: $f(x,y)=f_X(x)f_Y(y)$ pour tout $(x,y)$
```

## Réponses courtes

```exercice
? {covnulle} $Z\sim\mathcal N(0,1)$. Combien vaut $E(Z^3)$ ?
reponse: 0 ~0
= Intégrande impaire sur $\mathbb R$ : 0.
? {covnulle} Tableau Bernoulli avec $p=0{,}2$, $p_1=0{,}5$, $p_2=0{,}6$. Calcule $\text{Cov}(X,Y)$.
reponse: 0 ~0.001
= $0{,}5+0{,}6+0{,}2-1-0{,}3=0$ : ici elles sont indépendantes.
? {covnulle} Même tableau avec $p=0{,}3$, $p_1=0{,}5$, $p_2=0{,}6$. $\text{Cov}(X,Y)$ ?
reponse: 0.1 ~0.001
= $0{,}4-0{,}3=0{,}1$.
```

## QCM du chapitre

```qcm
? {covnulle} $\text{Cov}(X,Y)=0$. Peut-on conclure que $X$ et $Y$ sont indépendantes ?
- Oui
+ Non en général ; oui si ce sont deux Bernoulli
= Contre-exemple $Z$ et $Z^2$. Exception : variables de Bernoulli.
```

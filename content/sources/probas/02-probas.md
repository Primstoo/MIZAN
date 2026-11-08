---
id: probas
titre: Probabilité, conditionnelle, Bayes
seance: A · Bases de probabilité
importance: 2
---

```html
<p class="small muted">Source : TD 2, 4 · cours chapitre 1</p>
<p>Une <b>expérience aléatoire</b> a des résultats imprévisibles. L'ensemble de tous les résultats est l'<b>univers</b> $\Omega$. Un <b>événement</b> est une partie de $\Omega$.</p>
<div class="box"><b>Règles de base</b> (à savoir réciter) :
<ul><li>$0\le P(A)\le 1$, $P(\Omega)=1$, $P(\emptyset)=0$</li>
<li>$P(\bar A)=1-P(A)$</li>
<li>$P(A\cup B)=P(A)+P(B)-P(A\cap B)$ ; si $A\cap B=\emptyset$ (incompatibles), $P(A\cup B)=P(A)+P(B)$</li>
<li>Si $A\subset B$ : $P(A)\le P(B)$ et $P(B\setminus A)=P(B)-P(A)$</li></ul>
« ET » se traduit par un produit (si indépendance ou en conditionnant), « OU » exclusif par une somme.</div>
<h4>Probabilité conditionnelle</h4>
<p>Si $P(B)\neq0$, la probabilité de $A$ <b>sachant</b> que $B$ est réalisé :</p>
$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}\qquad\text{donc}\qquad P(A\cap B)=P(B)\,P(A\mid B).$$
<h4>Probabilités totales et Bayes</h4>
<p>Si $A_1,\dots,A_n$ forment un <b>système complet</b> (ils sont disjoints et leur réunion vaut $\Omega$) :</p>
$$P(B)=\sum_{j=1}^n P(A_j)\,P(B\mid A_j)\qquad\qquad P(A_i\mid B)=\frac{P(A_i)\,P(B\mid A_i)}{\sum_{j=1}^n P(A_j)\,P(B\mid A_j)}.$$
<h4>Exemple (cours, 3 urnes)</h4>
<p>On choisit une urne au hasard parmi 3, puis une boule. Si $P(\text{rouge}\mid U_1)=\tfrac12$, $P(\text{rouge}\mid U_2)=\tfrac14$, $P(\text{rouge}\mid U_3)=0$, alors $P(\text{rouge})=\tfrac13(\tfrac12+\tfrac14+0)=\tfrac14$ et $P(U_1\mid\text{rouge})=\dfrac{\frac13\cdot\frac12}{\frac14}=\tfrac23$.</p>
<div class="box trap"><b>Piège.</b> $P(A\mid B)\neq P(B\mid A)$ en général. Bayes sert justement à « retourner » le conditionnement.</div>
```

## Flashcards

```cartes
{probas@0} $P(\bar A)$ ? :: $1-P(A)$
{probas@1} $P(A\cup B)$ ? :: $P(A)+P(B)-P(A\cap B)$
{probas@2} Définition de $P(A\mid B)$ :: $\dfrac{P(A\cap B)}{P(B)}$, avec $P(B)\neq0$
{probas@3} Formule de Bayes :: $P(A_i\mid B)=\dfrac{P(A_i)P(B\mid A_i)}{\sum_j P(A_j)P(B\mid A_j)}$
```

## Réponses courtes

```exercice
? {probas} Même données. Calcule $P(A\cup B)$.
reponse: 0.7 ~0.001
= $0{,}5+0{,}4-0{,}2=0{,}7$.
? {probas} Tournoi du TD 3 : chaque partie est gagnée par A avec probabilité 1/2. Probabilité que la finale s'arrête en 2 parties (AA ou BB) ?
reponse: 0.5 ~0.001
= $P(AA)+P(BB)=\frac14+\frac14=\frac12$.
```

## QCM du chapitre

```qcm
? {probas} $P(A)=0{,}5$, $P(B)=0{,}4$, $P(A\cap B)=0{,}2$. Que vaut $P(A\mid B)$ ?
- 0,4
+ 0,5
- 0,8
- 0,2
= $0{,}2/0{,}4=0{,}5$.

? {probas} La formule de Bayes sert à calculer…
- $P(B)$ à partir des $P(A_j)$
+ $P(A_i\mid B)$ quand on connaît les $P(B\mid A_j)$
- $P(A\cap B)$ pour des événements indépendants
- le nombre de cas favorables
= Bayes retourne le conditionnement : on connaît $P(B\mid A_j)$, on veut $P(A_i\mid B)$.
```

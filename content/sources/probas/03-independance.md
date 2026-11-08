---
id: independance
titre: Indépendance d'événements
seance: A · Bases de probabilité
importance: 2
---

```html
<p class="small muted">Source : TD 2</p>
<div class="box">$A$ et $B$ sont <b>indépendants</b> $\iff P(A\cap B)=P(A)\,P(B)$.</div>
<p>Pour trois événements, on distingue :</p>
<ul><li><b>Deux à deux</b> : $P(A\cap B)=P(A)P(B)$, $P(A\cap C)=P(A)P(C)$, $P(B\cap C)=P(B)P(C)$.</li>
<li><b>Mutuellement</b> (dans leur ensemble) : les trois égalités <b>et</b> $P(A\cap B\cap C)=P(A)P(B)P(C)$.</li></ul>
<p>Deux à deux n'implique pas mutuellement. Contre-exemple du cours : deux pièces, $A$ = « 1<sup>re</sup> pile », $B$ = « 2<sup>e</sup> pile », $C$ = « une seule pile ». Chaque paire est indépendante ($1/4=1/2\times1/2$) mais $A\cap B\cap C=\emptyset$.</p>
<h4>Démonstration classique (TD 2-II) : si $A$, $B$ indépendants, alors $A$ et $\bar B$ aussi</h4>
<ol class="steps">
<li>$A=(A\cap B)\cup(A\cap\bar B)$, union disjointe, donc $P(A)=P(A\cap B)+P(A\cap\bar B)$.</li>
<li>$P(A\cap\bar B)=P(A)-P(A)P(B)=P(A)\,(1-P(B))=P(A)\,P(\bar B)$.</li>
<li>Même raisonnement pour $\bar A$ et $\bar B$ : $P(\bar A\cap\bar B)=1-P(A\cup B)=\dots=P(\bar A)P(\bar B)$.</li></ol>
<div class="box trap"><b>Piège.</b> Incompatibles ($A\cap B=\emptyset$) n'est pas indépendants. Si $P(A)>0$ et $P(B)>0$, deux événements incompatibles sont même forcément <b>dépendants</b> ($0\neq P(A)P(B)$).</div>
```

## Flashcards

```cartes
{independance@4} $A$, $B$ indépendants $\iff$ ? :: $P(A\cap B)=P(A)P(B)$
```

## QCM du chapitre

```qcm
? {independance} $P(A)=0{,}3$, $P(B)=0{,}5$, $A$ et $B$ indépendants. $P(A\cap B)$ ?
- 0,8
+ 0,15
- 0,2
- 0
= Produit : $0{,}15$.

? {independance} $A$ et $B$ incompatibles, de probabilités non nulles. Sont-ils indépendants ?
- Oui toujours
+ Non, jamais
- Ça dépend
= $P(A\cap B)=0\neq P(A)P(B)>0$.

? {independance} Trois événements indépendants deux à deux sont-ils mutuellement indépendants ?
- Toujours
+ Pas forcément
= Il faut en plus $P(A\cap B\cap C)=P(A)P(B)P(C)$.
```

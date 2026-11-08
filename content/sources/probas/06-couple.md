---
id: couple
titre: Couple discret : tableau, marginales, covariance
seance: B · Variables aléatoires discrètes
importance: 5
---

```html
<p class="small muted">Source : 5 examens sur 11 (les « trois pièces »), 4 à 8 pts</p>
<p>C'est l'exercice le plus répété du module. Méthode en 6 étapes, toujours la même.</p>
<h3>L'énoncé</h3>
<p>On lance trois pièces. $X$ = nombre de faces sur les <b>deux premières</b>, $Y$ = nombre de piles sur les <b>deux dernières</b>. La pièce du milieu compte pour les deux.</p>
<h4>Étape 1 : lister les 8 résultats équiprobables (probabilité 1/8 chacun)</h4>
<div class="tablewrap"><table class="t"><tr><th>Résultat</th><th>FFF</th><th>FFP</th><th>FPF</th><th>FPP</th><th>PFF</th><th>PFP</th><th>PPF</th><th>PPP</th></tr>
<tr><td>$X$ (faces sur 1-2)</td><td>2</td><td>2</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>$Y$ (piles sur 2-3)</td><td>0</td><td>1</td><td>1</td><td>2</td><td>0</td><td>1</td><td>1</td><td>2</td></tr></table></div>
<h4>Étape 2 : le tableau de la loi du couple, avec les marges</h4>
<div class="tablewrap"><table class="t"><tr><th>$X\backslash Y$</th><th>0</th><th>1</th><th>2</th><th>$P(X=i)$</th></tr>
<tr><th>0</th><td>0</td><td>1/8</td><td>1/8</td><td>2/8</td></tr>
<tr><th>1</th><td>1/8</td><td>2/8</td><td>1/8</td><td>4/8</td></tr>
<tr><th>2</th><td>1/8</td><td>1/8</td><td>0</td><td>2/8</td></tr>
<tr><th>$P(Y=j)$</th><td>2/8</td><td>4/8</td><td>2/8</td><td>1</td></tr></table></div>
<h4>Étape 3 : lois marginales</h4>
<p>On somme les lignes (loi de $X$) et les colonnes (loi de $Y$) : $X$ et $Y$ prennent 0, 1, 2 avec probabilités $\tfrac14,\tfrac12,\tfrac14$.</p>
<h4>Étape 4 : indépendance ?</h4>
<p>Il suffit d'<b>un seul</b> contre-exemple : $P(X=0,Y=0)=0\neq P(X=0)P(Y=0)=\tfrac14\cdot\tfrac14$. Donc <b>non indépendantes</b>. (Pour prouver l'indépendance, il faudrait vérifier <i>toutes</i> les cases.)</p>
<h4>Étape 5 : covariance</h4>
$$E(X)=E(Y)=0\cdot\tfrac14+1\cdot\tfrac12+2\cdot\tfrac14=1,\qquad E(XY)=\sum_{i,j}ij\,p_{ij}=1\cdot1\cdot\tfrac28+1\cdot2\cdot\tfrac18+2\cdot1\cdot\tfrac18=\tfrac34$$
$$\text{Cov}(X,Y)=E(XY)-E(X)E(Y)=\tfrac34-1=-\tfrac14.$$
<h4>Étape 6 : loi du couple $(\min\{X,Y\},\max\{X,Y\})$</h4>
<p>Pour chaque case non nulle, on écrit le couple (min, max) puis on regroupe :</p>
<div class="tablewrap"><table class="t"><tr><th>$(X,Y)$</th><td>(0,1)</td><td>(0,2)</td><td>(1,0)</td><td>(1,1)</td><td>(1,2)</td><td>(2,0)</td><td>(2,1)</td></tr>
<tr><th>(min, max)</th><td>(0,1)</td><td>(0,2)</td><td>(0,1)</td><td>(1,1)</td><td>(1,2)</td><td>(0,2)</td><td>(1,2)</td></tr>
<tr><th>proba</th><td>1/8</td><td>1/8</td><td>1/8</td><td>2/8</td><td>1/8</td><td>1/8</td><td>1/8</td></tr></table></div>
<div class="tablewrap"><table class="t"><tr><th>$\min\backslash\max$</th><th>0</th><th>1</th><th>2</th></tr>
<tr><th>0</th><td>0</td><td>1/4</td><td>1/4</td></tr><tr><th>1</th><td>—</td><td>1/4</td><td>1/4</td></tr><tr><th>2</th><td>—</td><td>—</td><td>0</td></tr></table></div>
<div class="box prof"><b>Variante vue en TD (examen 7 pts)</b> : tableau $X\in\{1,2,3\}$, $Y\in\{1,2,3,4\}$ dont chaque case vaut le produit des marges. Là il faut écrire « $P(X=i,Y=j)=P(X=i)P(Y=j)$ pour <b>toutes</b> les cases », donc indépendance et $\text{Cov}=0$.</div>
<div class="box trap"><b>Pièges vus dans les copies.</b> Oublier que la pièce du milieu est commune ; confondre « faces » et « piles » ; ne pas vérifier que le tableau somme à 1 ; conclure à l'indépendance sans tout vérifier.</div>
<h4>Loi de la somme (cours 7.4)</h4>
<p>$P(X+Y=k)=\sum_{i}P(X=i,\,Y=k-i)$ : on additionne les cases d'une même « anti-diagonale ».</p>
```

## Flashcards

```cartes
{couple@10} $\text{Cov}(X,Y)$ ? :: $E(XY)-E(X)E(Y)$
{couple@11} Indépendance d'un couple discret :: $P(X=x_i,Y=y_j)=P(X=x_i)P(Y=y_j)$ pour TOUTES les cases
{couple@12} Trois pièces : loi marginale de $X$ :: $0,1,2$ avec $\frac14,\frac12,\frac14$
{couple@13} Trois pièces : $\text{Cov}(X,Y)$ :: $\frac34-1=-\frac14$
{couple@14} Trois pièces : loi de $(\min,\max)$ :: (0,1), (0,2), (1,1), (1,2) chacun $\frac14$
```

## Réponses courtes

```exercice
? {couple} Trois pièces : donne $P(X=1,Y=1)$ en décimal.
reponse: 0.25 ~0.001
= FPF et PFP : $2/8=0{,}25$.
? {couple} Calcule $E(XY)$ (trois pièces), en décimal.
reponse: 0.75 ~0.001
= $\frac28+\frac28+\frac28=\frac34$.
? {couple} Donne $\text{Cov}(X,Y)$ en décimal.
reponse: -0.25 ~0.001
= $\frac34-1\times1=-\frac14$.
? {couple} Toujours les trois pièces : $P(X+Y=2)$ en décimal.
reponse: 0.5 ~0.001
= Cases (0,2), (1,1), (2,0) : $\frac18+\frac28+\frac18=\frac12$.
? {couple} $P(\min\{X,Y\}=0)$ en décimal.
reponse: 0.5 ~0.001
= (0,1) et (0,2) : $\frac14+\frac14$.
```

## QCM du chapitre

```qcm
? {couple} Pour montrer que $X$ et $Y$ ne sont pas indépendantes, il faut…
- vérifier toutes les cases
+ trouver une seule case où $p_{ij}\neq p_{i\bullet}p_{\bullet j}$
- montrer que $\text{Cov}\neq0$ uniquement
= Un seul contre-exemple suffit (et $\text{Cov}\neq0$ marche aussi, mais un contre-exemple est plus rapide).
```

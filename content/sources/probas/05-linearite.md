---
id: linearite
titre: Preuves : E(X+Y) et E(XY)
seance: B · Variables aléatoires discrètes
importance: 3
---

```html
<p class="small muted">Source : Examen 2023-24 ord. (4 pts)</p>
<p>Ces deux démonstrations sont courtes et tombent telles quelles. On travaille avec la <b>loi du couple</b> $p_{ij}=P(X=x_i,\,Y=y_j)$ et ses marginales $p_{i\bullet}=\sum_j p_{ij}=P(X=x_i)$, $p_{\bullet j}=\sum_i p_{ij}=P(Y=y_j)$.</p>
<h4>1) $E(X+Y)=E(X)+E(Y)$</h4>
$$\begin{aligned}E(X+Y)&=\sum_i\sum_j (x_i+y_j)\,p_{ij}=\sum_i x_i\sum_j p_{ij}+\sum_j y_j\sum_i p_{ij}\\&=\sum_i x_i\,p_{i\bullet}+\sum_j y_j\,p_{\bullet j}=E(X)+E(Y).\end{aligned}$$
<h4>2) Si $X$ et $Y$ sont indépendantes, $E(XY)=E(X)E(Y)$</h4>
<p>Indépendance : $p_{ij}=p_{i\bullet}\,p_{\bullet j}$ pour tous $i,j$.</p>
$$E(XY)=\sum_i\sum_j x_iy_j\,p_{ij}=\sum_i\sum_j x_iy_j\,p_{i\bullet}p_{\bullet j}=\Big(\sum_i x_ip_{i\bullet}\Big)\Big(\sum_j y_jp_{\bullet j}\Big)=E(X)E(Y).$$
<div class="box prof"><b>Barème probable.</b> Écrire la définition avec la loi du couple, séparer les sommes, reconnaître les marginales, citer l'hypothèse d'indépendance au bon endroit. Chaque étape compte : n'en saute aucune.</div>
<div class="box trap"><b>Piège.</b> La première égalité n'a besoin d'aucune hypothèse. La seconde exige l'indépendance : la réciproque est fausse ($E(XY)=E(X)E(Y)$ n'entraîne pas l'indépendance, voir la notion « Covariance nulle »).</div>
```

## QCM du chapitre

```qcm
? {linearite} $E(X+Y)=E(X)+E(Y)$ nécessite…
- l'indépendance
+ rien de plus que l'existence des espérances
- que $X$ et $Y$ aient la même loi
= La linéarité de l'espérance est toujours vraie.

? {linearite} Dans la preuve de $E(XY)=E(X)E(Y)$, l'étape clé est :
- $p_{ij}=p_{i\bullet}+p_{\bullet j}$
+ $p_{ij}=p_{i\bullet}\,p_{\bullet j}$
- $\sum_j p_{ij}=1$
= C'est la définition de l'indépendance pour un couple discret.
```

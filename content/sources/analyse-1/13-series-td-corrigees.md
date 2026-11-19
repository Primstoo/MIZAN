---
id: series-td-corrigees
titre: Séries de TD corrigées
seance: Séries 1 à 3 · Travaux dirigés
importance: 5
---

Exercices types des séries de TD d'Analyse 1 de la FSABM (nombres réels, suites, fonctions). Les énoncés sont reformulés ; les corrigés sont rédigés par ToumaiLearn.

> [!astuce] Cherche chaque exercice 10 minutes avant d'ouvrir l'indice, puis le corrigé. Rédige comme en examen : hypothèses, outil, conclusion.

## Série 1 · Nombres réels

```exercice Irrationalité, récurrence, inégalités
? Montre que $\dfrac{\ln 3}{\ln 2}$ est irrationnel.
indice: Par l'absurde, écris-le $\tfrac pq$ avec $p, q \ge 1$.
= Supposons $\tfrac{\ln3}{\ln2} = \tfrac pq$ avec $p, q \in \mathbb N^*$ (le quotient est $> 0$). Alors $q\ln 3 = p\ln 2$, donc $3^q = 2^p$. Le membre de gauche est impair, celui de droite pair ($p \ge 1$) : contradiction.

? Montre que pour tout $n \ge 1$ : $\sum_{p=1}^{n} p \cdot p! = (n + 1)! - 1$.
indice: Récurrence ; remarque que $(n+1)\cdot(n+1)! + (n+1)! = (n+2)!$.
= Pour $n = 1$ : $1 = 2! - 1$. Si c'est vrai au rang $n$, alors $\sum_{p=1}^{n+1} p\cdot p! = (n+1)! - 1 + (n+1)(n+1)! = (n+1)!(n+2) - 1 = (n+2)! - 1$.

? Montre que $x^2 + y^2 + xy + 1 > 0$ pour tous réels $x, y$, puis que $x \ne y \Rightarrow x^3 + x \ne y^3 + y$.
indice: Forme canonique en $x$ ; puis factorise $x^3 - y^3$.
= $x^2 + xy + y^2 + 1 = (x + \tfrac y2)^2 + \tfrac34 y^2 + 1 > 0$. Si $x^3 + x = y^3 + y$ avec $x \ne y$ : $(x - y)(x^2 + xy + y^2 + 1) = 0$, donc $x^2 + xy + y^2 + 1 = 0$, impossible.

? Pour $a \ge 1$ et $b \ge 1$, montre que $a\sqrt{b - 1} + b\sqrt{a - 1} \le ab$.
indice: $(\sqrt{b-1} - 1)^2 \ge 0$ donne $2\sqrt{b - 1} \le b$.
= De $(\sqrt{b-1} - 1)^2 \ge 0$ on tire $\sqrt{b-1} \le \tfrac b2$, de même $\sqrt{a-1} \le \tfrac a2$. Donc $a\sqrt{b-1} + b\sqrt{a-1} \le \tfrac{ab}2 + \tfrac{ab}2 = ab$.
```

```exercice Partie entière et densité
? Montre que $E(x + p) = E(x) + p$ pour $x$ réel et $p$ entier.
= $E(x) \le x < E(x) + 1$ donne $E(x) + p \le x + p < E(x) + p + 1$ ; $E(x) + p$ est un entier : c'est $E(x + p)$.

? Montre que $E\left(\dfrac{E(nx)}{n}\right) = E(x)$ pour $n \ge 1$.
indice: Encadre $\tfrac{E(nx)}{n}$ entre $E(x)$ et $x$.
= $nE(x) \le nx$ et $nE(x)$ entier, donc $nE(x) \le E(nx) \le nx$. En divisant : $E(x) \le \tfrac{E(nx)}n \le x < E(x) + 1$. D'où le résultat.

? Montre que $D = \{\tfrac{m}{2^n},\ m \in \mathbb Z,\ n \in \mathbb N\}$ est dense dans $\mathbb R$.
indice: Prends $n$ avec $2^n(y - x) > 1$, puis $m = E(2^n x) + 1$.
= Soient $x < y$. Comme $2^n \ge n$, il existe $n$ avec $2^n(y - x) > 1$. Avec $m = E(2^n x) + 1$ : $2^n x < m \le 2^n x + 1 < 2^n y$, donc $x < \tfrac m{2^n} < y$.

? Soit $A = \left\{\dfrac{n - 1}{n},\ n \ge 1\right\}$. Donne $\inf A$, $\sup A$, et dis s'ils sont atteints.
= $\tfrac{n-1}{n} = 1 - \tfrac1n$ croît de 0 vers 1. $\min A = 0$ (atteint en $n = 1$). $\sup A = 1$, non atteint (caractérisation : pour $\varepsilon > 0$, $1 - \tfrac1n > 1 - \varepsilon$ dès que $n > \tfrac1\varepsilon$).
```

## Série 2 · Suites réelles

```exercice Monotonie, Cauchy, sous-suites
? Soit $a \in ]0, 1[$ et $u_n = \prod_{k=1}^{n}(1 + a^k)$. Montre que $(u_n)$ est croissante, puis que $u_n \le e^{v_n}$ avec $v_n = \sum_{k=1}^n a^k$. Conclus.
indice: $\ln(1 + t) \le t$ pour $t > -1$.
= $\tfrac{u_{n+1}}{u_n} = 1 + a^{n+1} > 1$ : croissante. $\ln u_n = \sum \ln(1 + a^k) \le \sum a^k = v_n \le \tfrac{a}{1 - a}$. Donc $u_n \le e^{a/(1-a)}$ : croissante et majorée, elle converge.

? Montre que $u_n = \sum_{k=1}^{n} \dfrac{(-1)^{k-1}}{k}$ converge.
indice: Montre que $(u_{2n})$ et $(u_{2n+1})$ sont adjacentes.
= $u_{2n+2} - u_{2n} = \tfrac1{2n+1} - \tfrac1{2n+2} > 0$ : $(u_{2n})$ croît. $u_{2n+3} - u_{2n+1} = -\tfrac1{2n+2} + \tfrac1{2n+3} < 0$ : $(u_{2n+1})$ décroît. $u_{2n+1} - u_{2n} = \tfrac1{2n+1} \to 0$. Adjacentes : même limite $\ell$, donc $u_n \to \ell$.

? Montre que $u_n = \sum_{k=1}^{n} \dfrac1k$ n'est pas de Cauchy, puis que $u_n \to +\infty$.
= $u_{2n} - u_n \ge n\cdot\tfrac1{2n} = \tfrac12$ : pas de Cauchy, donc divergente. Elle est croissante : non majorée, elle tend vers $+\infty$.

? $u_0 = a$ et $u_{n+1} = \dfrac12 + \dfrac{u_n^2}{2}$. Montre que $(u_n)$ est croissante. Si elle converge, quelle est sa limite ?
indice: $u_{n+1} - u_n = \tfrac12(u_n - 1)^2$.
= $u_{n+1} - u_n = \tfrac12(u_n^2 - 2u_n + 1) = \tfrac12(u_n - 1)^2 \ge 0$ : croissante. Si $u_n \to \ell$, alors $\ell = \tfrac12 + \tfrac{\ell^2}2$, soit $(\ell - 1)^2 = 0$ : $\ell = 1$.
```

## Série 3 · Fonctions d'une variable réelle

```exercice Limites, continuité, TVI
? Montre qu'une fonction périodique non constante n'a pas de limite en $+\infty$.
= Soit $T$ la période et $x_0, x_1$ avec $f(x_0) \ne f(x_1)$. Les suites $x_0 + nT$ et $x_1 + nT$ tendent vers $+\infty$, et leurs images valent $f(x_0)$ et $f(x_1)$ : deux limites différentes.

? Soit $f : [0, 1] \to [0, 1]$ continue et croissante. Montre que $f$ a un point fixe.
indice: TVI sur $g(x) = f(x) - x$.
= $g(0) = f(0) \ge 0$, $g(1) = f(1) - 1 \le 0$, $g$ continue : il existe $c$ avec $g(c) = 0$, soit $f(c) = c$. (La croissance n'est pas nécessaire ici.)

? Soit $f$ continue en $a$ avec $f(a) \ne 0$. Montre que $f$ garde un signe constant au voisinage de $a$.
= Avec $\varepsilon = \tfrac{|f(a)|}2$ : il existe $\delta$ tel que $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \tfrac{|f(a)|}2$, donc $f(x)$ a le signe de $f(a)$.

? $f : \mathbb R \to \mathbb R$ continue en 0, avec $f(x + y) = f(x) + f(y)$ et $f(1) = k$. Montre que $f(x) = kx$ pour tout $x$.
indice: $f(0)$, puis $f(n)$, $f(\tfrac pq)$, puis densité.
= $f(0) = 2f(0)$ donc $f(0) = 0$ ; $f(-x) = -f(x)$. Par récurrence $f(n) = kn$, puis $f(-n) = -kn$. Pour $r = \tfrac pq$ : $qf(r) = f(p) = kp$, donc $f(r) = kr$. $f$ est continue partout ($f(x + h) - f(x) = f(h) \to 0$) et égale à $kx$ sur $\mathbb Q$, dense : $f(x) = kx$.
```

## Flashcards

```cartes
Irrationalité par l'absurde :: Supposer $= \frac pq$, en déduire une égalité d'entiers impossible (parité, divisibilité).
Encadrement de $E(x)$ :: $E(x) \le x < E(x) + 1$.
Prouver la densité de $D$ :: Entre $x < y$, construire un élément de $D$, souvent avec $E(\cdot)$ et l'archimédien.
Somme alternée $\sum \frac{(-1)^{k-1}}{k}$ :: Termes pairs et impairs adjacents : elle converge.
Suite $u_{n+1} = \frac12 + \frac{u_n^2}2$ :: $u_{n+1} - u_n = \frac12(u_n - 1)^2 \ge 0$.
Équation $f(x+y) = f(x) + f(y)$ :: $f(q) = qf(1)$ sur $\mathbb Q$, puis continuité et densité.
Signe au voisinage :: Continue et $f(a) \ne 0$ : même signe que $f(a)$ près de $a$ ($\varepsilon = \frac{|f(a)|}{2}$).
```

## QCM du chapitre

```qcm
? Pour montrer que $3^q = 2^p$ est impossible ($p, q \ge 1$), on utilise :
+ la parité
- la monotonie de $\ln$
- le TVI
= Impair contre pair.

? $(x + \frac y2)^2 + \frac34y^2 + 1$ est égal à :
+ $x^2 + xy + y^2 + 1$
- $x^2 + y^2 + 1$
- $x^2 + 2xy + y^2 + 1$
= On développe.

? $\inf\{1 - \frac1n, n \ge 1\}$ vaut :
+ 0
- 1
- $-1$
= Atteint en $n = 1$.

? Pour la somme alternée $\sum \frac{(-1)^{k-1}}{k}$, on utilise :
- la limite monotone directe
+ deux sous-suites adjacentes
- le TVI
= Les termes pairs montent, les impairs descendent.

? $\ln(1 + t) \le t$ sert à majorer :
+ un produit
- une somme alternée
- une partie entière
= Le $\ln$ transforme le produit en somme.

? Si $f(x+y) = f(x) + f(y)$, alors $f(0)$ :
+ vaut 0
- vaut 1
- est quelconque
= $f(0) = 2f(0)$.

? Pour passer de $\mathbb Q$ à $\mathbb R$, il faut :
- la dérivabilité
+ la continuité
- la monotonie seulement
= Densité et continuité.

? Une fonction périodique non constante en $+\infty$ :
- tend vers sa moyenne
+ n'a pas de limite
- tend vers 0
= Deux suites, deux valeurs.

? $E(x + 3)$ vaut :
+ $E(x) + 3$
- $E(x)$
- $3E(x)$
= On peut sortir les entiers.

? $u_{n+1} = \frac12 + \frac{u_n^2}2$ converge. Sa limite est :
+ 1
- 0
- $\frac12$
= $(\ell - 1)^2 = 0$.
```

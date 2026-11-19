---
id: examen-blanc
titre: Examen blanc corrigé
seance: Révision · Examen de fin de semestre
importance: 5
payant: true
---

Sujet d'entraînement de 1 h 30, dans l'esprit des examens d'Analyse 1 de la FSABM. Sans calculatrice. Barème indicatif sur 20.

> [!astuce] Lis tout le sujet d'abord. Commence par l'exercice où tu te sens le plus sûr, et rédige chaque question avec hypothèses et conclusion.

## Exercice 1 · Borne supérieure (4 points)

```exercice Exercice 1
? Soit $A = \left\{ \dfrac{1}{n} + \dfrac{1}{m},\ n, m \in \mathbb N^* \right\}$. Détermine $\sup A$ et $\inf A$. Sont-ils atteints ?
indice: Majorer chaque terme par 1, minorer par 0, puis la caractérisation avec $\varepsilon$.
= Chaque élément vérifie $0 < \tfrac1n + \tfrac1m \le 2$, et 2 est atteint ($n = m = 1$) : $\max A = \sup A = 2$. 0 minore $A$. Pour $\varepsilon > 0$, avec $n = m > \tfrac2\varepsilon$ : $\tfrac2n < \varepsilon$. Donc $\inf A = 0$, non atteint (les éléments sont $> 0$).
```

## Exercice 2 · Suite récurrente (5 points)

```exercice Exercice 2
? Soit $u_0 = 1$ et $u_{n+1} = \sqrt{2 + u_n}$. (a) Montre que $1 \le u_n \le 2$. (b) Montre que $(u_n)$ est croissante. (c) Conclus et donne la limite.
indice: Récurrence ; puis $u_{n+1}^2 - u_n^2 = (2 - u_n)(1 + u_n)$.
= (a) $u_0 = 1$. Si $1 \le u_n \le 2$ : $\sqrt3 \le u_{n+1} \le 2$, donc $1 \le u_{n+1} \le 2$. (b) $u_{n+1}^2 - u_n^2 = 2 + u_n - u_n^2 = (2 - u_n)(1 + u_n) \ge 0$ ; les termes étant positifs, $u_{n+1} \ge u_n$. (c) Croissante et majorée : elle converge vers $\ell \in [1, 2]$ avec $\ell = \sqrt{2 + \ell}$, soit $\ell^2 - \ell - 2 = 0$ : $\ell = 2$.
reponse: 2
```

## Exercice 3 · Somme et critère de Cauchy (3 points)

```exercice Exercice 3
? Soit $U_n = \sum_{k=1}^{n} \dfrac{1}{\sqrt k}$. Montre que $(U_n)$ n'est pas une suite de Cauchy. Quelle est sa limite ?
= $U_{2n} - U_n = \sum_{k=n+1}^{2n}\tfrac1{\sqrt k} \ge \tfrac{n}{\sqrt{2n}} = \sqrt{\tfrac n2} \ge \tfrac1{\sqrt2}$. Avec $\varepsilon = \tfrac1{\sqrt2}$, ce n'est pas une suite de Cauchy, donc elle diverge. Croissante et divergente : non majorée, elle tend vers $+\infty$.
```

## Exercice 4 · Continuité et équation (4 points)

```exercice Exercice 4
? Soit $n \ge 1$ et $g_n(x) = x^n + \arctan x - 1$ sur $[0, +\infty[$. (a) Montre que $g_n(x) = 0$ a une unique solution $a_n$, et que $a_n \in ]0, 1[$. (b) Montre que $(a_n)$ est croissante.
indice: (b) Calcule $g_{n+1}(a_n)$ en utilisant $a_n^{n+1} < a_n^n$.
= (a) $g_n$ est continue, strictement croissante (somme de deux fonctions strictement croissantes). $g_n(0) = -1 < 0$ et $g_n(1) = \tfrac\pi4 > 0$ : par le TVI et la bijection, unique solution $a_n \in ]0, 1[$. (b) Comme $0 < a_n < 1$, $a_n^{n+1} < a_n^n$, donc $g_{n+1}(a_n) < g_n(a_n) = 0 = g_{n+1}(a_{n+1})$. $g_{n+1}$ étant strictement croissante, $a_n < a_{n+1}$.
```

## Exercice 5 · Dérivabilité et accroissements finis (4 points)

```exercice Exercice 5
? (a) $f(x) = x^2\sin\tfrac1x$ si $x \ne 0$, $f(0) = 0$. Montre que $f$ est dérivable en 0. (b) À l'aide du TAF, montre que pour $x > 0$ : $\dfrac{1}{2\sqrt{x+1}} < \sqrt{x+1} - \sqrt x < \dfrac{1}{2\sqrt x}$.
= (a) $\left|\tfrac{f(h) - f(0)}{h}\right| = |h\sin\tfrac1h| \le |h| \to 0$ : $f'(0) = 0$. (b) TAF à $\sqrt{\ }$ sur $[x, x+1]$ : $\sqrt{x+1} - \sqrt x = \tfrac{1}{2\sqrt c}$ avec $x < c < x + 1$. Comme $\sqrt x < \sqrt c < \sqrt{x+1}$, on obtient l'encadrement.
```

## Bilan

> [!retenir] Les points se perdent surtout sur les hypothèses oubliées : « continue sur un intervalle » pour le TVI, « croissante **et** majorée » pour la limite monotone, « continue sur $[a,b]$, dérivable sur $]a,b[$ » pour le TAF.

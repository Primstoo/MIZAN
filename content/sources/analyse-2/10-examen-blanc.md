---
id: examen-blanc
titre: Examen blanc corrigé
seance: Révision · Examen de fin de semestre
importance: 5
payant: true
---

Sujet d'entraînement de 1 h 30 couvrant tout le programme d'Analyse 2. Sans calculatrice. Barème indicatif sur 20.

> [!astuce] Lis tout le sujet d'abord. Commence par l'exercice où tu es le plus sûr, et écris l'ordre de chaque DL avant de le calculer.

## Exercice 1 · Accroissements finis (4 points)

```exercice Exercice 1
? (a) Montre que pour $0 < a < b$ : $\frac{b - a}{1 + b^2} < \arctan b - \arctan a < \frac{b - a}{1 + a^2}$. (b) Déduis-en un encadrement de $\arctan 2 - \frac\pi4$.
= (a) TAF à $\arctan$ sur $[a, b]$ : $\arctan b - \arctan a = \frac{b - a}{1 + c^2}$ avec $a < c < b$, et $\frac{1}{1+b^2} < \frac{1}{1+c^2} < \frac{1}{1+a^2}$. (b) $a = 1$, $b = 2$ : $\frac15 < \arctan 2 - \frac\pi4 < \frac12$.
```

## Exercice 2 · Développements limités (6 points)

```exercice Exercice 2
? (a) DL à l'ordre 3 en 0 de $e^x\sin x$. (b) Calcule $\lim_{x \to 0}\frac{e^x\sin x - x - x^2}{x^3}$. (c) $g(x) = \frac{x}{e^x - 1}$ prolongée par $g(0) = 1$ : donne sa tangente en 0 et la position de la courbe.
indice: (c) $\frac{e^x - 1}{x} = 1 + \frac x2 + \frac{x^2}{6} + o(x^2)$, puis $\frac{1}{1+u}$.
= (a) $\left(1 + x + \frac{x^2}{2}\right)\left(x - \frac{x^3}{6}\right) = x + x^2 + \frac{x^3}{3} + o(x^3)$. (b) Le numérateur vaut $\frac{x^3}{3} + o(x^3)$ : limite $\frac13$. (c) $g(x) = \frac{1}{1 + u}$ avec $u = \frac x2 + \frac{x^2}{6}$ : $1 - \frac x2 - \frac{x^2}{6} + \frac{x^2}{4} = 1 - \frac x2 + \frac{x^2}{12} + o(x^2)$. Tangente $y = 1 - \frac x2$ ; $\frac{x^2}{12} > 0$ : courbe au-dessus.
reponse: 1/3
```

## Exercice 3 · Intégrales (5 points)

```exercice Exercice 3
? (a) Calcule $\int_0^1 xe^x\,dx$. (b) Calcule $\int_1^{+\infty}\frac{dx}{x(x+1)}$. (c) Limite de $\sum_{k=1}^{n}\frac{1}{n + k}$.
= (a) IPP : $[xe^x]_0^1 - \int_0^1 e^x = e - (e - 1) = 1$. (b) $\frac1x - \frac{1}{x+1}$ : primitive $\ln\frac{x}{x+1} \to 0$ en $+\infty$. Valeur : $0 - \ln\frac12 = \ln 2$. (c) $\frac1n\sum\frac{1}{1 + k/n} \to \int_0^1\frac{dx}{1+x} = \ln 2$.
```

## Exercice 4 · Nature d'intégrales impropres (5 points)

```exercice Exercice 4
? Donne la nature de : (a) $\int_0^{+\infty}t^2e^{-t}dt$ ; (b) $\int_0^1\frac{dt}{t^2 - t}$ ; (c) $\int_1^{+\infty}\frac{\ln t}{t^2}dt$.
= (a) $t^2e^{-t} \le \frac{1}{t^2}$ pour $t$ grand (car $t^4e^{-t} \to 0$) : converge (valeur 2 par deux IPP). (b) En 0 : $\frac{1}{t(t-1)} \sim -\frac1t$, Riemann $\alpha = 1$ : diverge. (c) $\frac{\ln t}{t^2} \le \frac{1}{t^{3/2}}$ pour $t$ grand ($\frac{\ln t}{\sqrt t} \to 0$) : converge. IPP : valeur 1.
```

> [!retenir] Barème : rédaction des hypothèses (Rolle, TAF, continuité sur l'intervalle) et ordre des DL comptent autant que le résultat.

---
id: series-td-corrigees
titre: Séries de TD corrigées
seance: Séries 1 à 4 · Travaux dirigés
importance: 5
---

Exercices types des quatre séries de TD d'Analyse 2 de la FSABM (dérivabilité, développements limités, intégrale simple, intégrale impropre). Les énoncés sont reformulés ; les corrigés sont rédigés par ToumaiLearn et les calculs ont été vérifiés par ordinateur.

> [!astuce] Cherche chaque exercice 10 minutes avant d'ouvrir l'indice, puis le corrigé. Rédige comme en examen : hypothèses, outil, conclusion.

## Série 1 · Dérivabilité et applications

```exercice Série 1
? Montre que $f(x) = \frac{\sin x + \cos x}{1 + \cos^2 x}$ a une dérivée qui s'annule sur $]a, a + 2\pi[$, pour tout réel $a$.
= $f$ est dérivable sur $\mathbb R$ (dénominateur $\ge 1$) et $2\pi$-périodique : $f(a) = f(a + 2\pi)$. Rolle sur $[a, a + 2\pi]$ donne $c$ avec $f'(c) = 0$.

? Soient $f, g$ continues sur $[a, b]$, dérivables sur $]a, b[$, avec $f(a) \ne f(b)$ et $g(a) \ne g(b)$. Montre qu'il existe $c$ avec $\frac{f'(c)}{f(a) - f(b)} = \frac{g'(c)}{g(a) - g(b)}$.
indice: $F(x) = [f(a) - f(b)]g(x) - [g(a) - g(b)]f(x)$.
= $F(a) = f(a)g(a) - f(b)g(a) - g(a)f(a) + g(b)f(a) = g(b)f(a) - f(b)g(a)$, et le même calcul donne $F(b) = g(b)f(a) - f(b)g(a)$. Rolle : $F'(c) = 0$, soit $[f(a) - f(b)]g'(c) = [g(a) - g(b)]f'(c)$. On divise par $[f(a) - f(b)][g(a) - g(b)] \ne 0$.

? Soit $f$ continue sur $[a, b]$, dérivable sur $]a, b[$, à valeurs strictement positives. Montre qu'il existe $c$ avec $\frac{f(b)}{f(a)} = \exp\left(\frac{f'(c)}{f(c)}(b - a)\right)$.
= TAF à $g = \ln f$ : $\ln f(b) - \ln f(a) = \frac{f'(c)}{f(c)}(b - a)$. On passe à l'exponentielle.

? Montre que $x^n + px + q$ ($n \ge 2$) a au plus trois racines réelles si $n$ est impair, deux si $n$ est pair.
= Voir le chapitre 1, idée 3 : $P''$ a une seule racine (0), donc $P'$ au plus deux et $P$ au plus trois. Si $n$ est pair, $P' = nx^{n-1} + p$ est strictement croissante ($n - 1$ impair) : une racine au plus, donc deux pour $P$.
```

## Série 2 · Développements limités

```exercice Série 2
? DL à l'ordre 2 en 0 de $\frac{\sin x - 1}{\cos x + 1}$.
= $\sin x - 1 = -1 + x + o(x^2)$ et $\frac{1}{\cos x + 1} = \frac{1}{2 - \frac{x^2}{2}} = \frac12\left(1 + \frac{x^2}{4}\right) + o(x^2)$. Produit : $-\frac12 + \frac x2 - \frac{x^2}{8} + o(x^2)$.

? DL à l'ordre 4 en 0 de $x(\operatorname{ch} x)^{1/x}$.
indice: $(\operatorname{ch} x)^{1/x} = \exp\left(\frac{\ln \operatorname{ch} x}{x}\right)$.
= $\ln\operatorname{ch} x = \frac{x^2}{2} - \frac{x^4}{12} + o(x^4)$, donc $\frac{\ln\operatorname{ch}x}{x} = \frac x2 - \frac{x^3}{12} + o(x^3)$. L'exponentielle vaut $1 + \frac x2 + \frac{x^2}{8} - \frac{x^3}{16} + o(x^3)$. Fois $x$ : $x + \frac{x^2}{2} + \frac{x^3}{8} - \frac{x^4}{16} + o(x^4)$.

? DL à l'ordre 5 de $(\cos x)^{\sin x}$.
= $\ln\cos x = -\frac{x^2}{2} - \frac{x^4}{12}$, fois $\sin x = x - \frac{x^3}{6}$ : $-\frac{x^3}{2} + o(x^5)$ (le terme en $x^5$ vaut $-\frac1{12} + \frac1{12} = 0$). Exponentielle : $1 - \frac{x^3}{2} + o(x^5)$.

? $f(x) = xe^{x^2}$. (a) DL à l'ordre 5. (b) Montre que $f$ est une bijection de $\mathbb R$ sur $\mathbb R$. (c) Sachant que $f^{-1}(x) = ax + bx^3 + cx^5 + o(x^5)$, trouve $a, b, c$.
indice: Écris $f(f^{-1}(x)) = x$ et identifie.
= (a) $x + x^3 + \frac{x^5}{2} + o(x^5)$. (b) $f'(x) = (1 + 2x^2)e^{x^2} > 0$, $f$ continue, limites $\mp\infty$ : bijection. (c) Avec $y = f^{-1}(x)$ : $y + y^3 + \frac{y^5}{2} = x$. Ordre 1 : $a = 1$. Ordre 3 : $b + 1 = 0$, $b = -1$. Ordre 5 : $c + 3a^2b + \frac12 = 0$, soit $c = \frac52$.
```

## Série 3 · Intégrale simple

```exercice Série 3
? Calcule $J_2 = \int e^x\cos x\,dx$.
= Deux IPP : $J_2 = e^x\sin x - \int e^x\sin x = e^x\sin x + e^x\cos x - J_2$. Donc $J_2 = \frac{e^x(\sin x + \cos x)}{2} + C$.

? Calcule $I_2 = \int_0^{\pi/2}\frac{\sin^3 x\cos x}{1 + \cos^2 x}dx$ avec $u = \sin x$.
= $du = \cos x\,dx$ et $\cos^2 x = 1 - u^2$ : $I_2 = \int_0^1\frac{u^3}{2 - u^2}du$. Or $\frac{u^3}{2 - u^2} = -u + \frac{2u}{2 - u^2}$. Donc $I_2 = -\frac12 + [-\ln(2 - u^2)]_0^1 = \ln 2 - \frac12$.

? Calcule $K_2 = \int_0^\pi\frac{x\sin x}{1 + \cos^2 x}dx$.
indice: Pose $x = \pi - t$.
= Le changement donne $K_2 = \int_0^\pi\frac{(\pi - t)\sin t}{1 + \cos^2 t}dt = \pi\int_0^\pi\frac{\sin t}{1 + \cos^2 t}dt - K_2$. Avec $u = \cos t$ : $\int_0^\pi\frac{\sin t}{1 + \cos^2 t}dt = \int_{-1}^1\frac{du}{1 + u^2} = \frac\pi2$. Donc $2K_2 = \frac{\pi^2}{2}$ et $K_2 = \frac{\pi^2}{4}$.

? $I_n = \int_n^{n+1}\frac{dx}{e^x + e^{-x}}$. Montre que $f(n+1) \le I_n \le f(n)$ et que $(I_n)$ converge.
= $f(x) = \frac{1}{e^x + e^{-x}}$ est décroissante sur $[0, +\infty[$ (dénominateur croissant). L'encadrement suit en intégrant $f(n+1) \le f \le f(n)$ sur un intervalle de longueur 1. Comme $f(n) \to 0$, $I_n \to 0$.

? $u_n = \int_0^{1/2}\frac{x^n}{1 - x^2}dx$. Calcule $u_0$, $u_1$ et montre que $u_n - u_{n+2} = \frac{1}{(n+1)2^{n+1}}$.
= $u_0 = \frac12\left[\ln\frac{1+x}{1-x}\right]_0^{1/2} = \frac{\ln 3}{2}$. $u_1 = \left[-\frac12\ln(1 - x^2)\right]_0^{1/2} = \frac12\ln\frac43$. $u_n - u_{n+2} = \int_0^{1/2}\frac{x^n(1 - x^2)}{1 - x^2}dx = \int_0^{1/2}x^n dx = \frac{1}{(n+1)2^{n+1}}$.
```

## Série 4 · Intégrale impropre

```exercice Série 4
? $\int_1^{+\infty}\frac{t}{(1 + t^2)^2}dt$ : nature et valeur.
= Primitive $-\frac{1}{2(1 + t^2)}$, qui tend vers 0 en $+\infty$. Valeur : $0 + \frac14 = \frac14$.
reponse: 1/4 | 0.25

? Nature de $\int_0^{+\infty}\frac{t - 5}{t^2 + 4t + 4}dt$.
= Continue sur $[0, +\infty[$. En $+\infty$ : $\frac{t - 5}{(t+2)^2} \sim \frac1t$, positive pour $t > 5$ : diverge (Riemann $\alpha = 1$).

? Montre que $\int_2^{+\infty}\frac{dx}{x+1}$ et $\int_2^{+\infty}\frac{dx}{x-1}$ divergent, mais que $\int_2^{+\infty}\left(\frac{1}{1+x} + \frac{1}{1-x}\right)dx$ converge.
= Chacune se comporte comme $\int\frac{dx}{x}$ : diverge. La somme vaut $\frac{-2}{x^2 - 1} \sim -\frac{2}{x^2}$ : converge. Valeur : $[\ln\frac{x+1}{x-1}]_2^{+\infty} = -\ln 3$.

? Nature de $\int_0^1\frac{e^{-1/x}}{x^2}dx$.
= En $0^+$, $e^{-1/x}/x^2 \to 0$ (l'exponentielle l'emporte) : la fonction se prolonge par continuité, l'intégrale converge. Primitive $e^{-1/x}$ : valeur $e^{-1}$.
```

> [!attention] Les séries de TD ne contiennent pas d'exercice sur les équations différentielles : ce module n'en traite donc pas. Vérifie avec ton prof si ce chapitre est au programme de ton année.

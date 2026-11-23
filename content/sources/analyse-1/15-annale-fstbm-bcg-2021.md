---
id: annale-fstbm-bcg-2021
titre: Annale corrigée · contrôle d'analyse FST Béni Mellal (BCG, février 2021)
seance: Contrôle d'analyse du 18/02/2021, filière BCG section B, semestre 1 (1 h 30)
importance: 4
payant: true
---

Un vrai contrôle de la FST Béni Mellal (filière BCG). Il touche la valeur absolue, les fonctions réciproques, les suites, les équivalents, les DL, les primitives et une équation différentielle. Certaines questions (DL, primitives, équation différentielle) dépassent l'Analyse 1 de certaines facs : saute-les si ton prof ne les a pas faites.

> [!astuce] Fais le sujet en 1 h 30 sur papier avant d'ouvrir les corrigés.

## Questions de cours

```exercice Questions de cours
? 1) Montrer $|x + y| \le |x| + |y|$.
= On a $-|x| \le x \le |x|$ et $-|y| \le y \le |y|$. On additionne : $-(|x|+|y|) \le x + y \le |x| + |y|$, c'est exactement $|x+y| \le |x|+|y|$.

? 2a) Résoudre $\arccos(\sin x) = \pi - x$.
= Un arccos est dans $[0, \pi]$, donc il faut $x \in [0, \pi]$. Alors $\sin x = \cos(\pi - x)$ donne $\cos(\pi - x) = \sin x$, soit $-\cos x = \sin x$ : $x = \frac{3\pi}{4}$. Vérification : $\sin\frac{3\pi}{4} = \frac{\sqrt2}{2}$ et $\arccos\frac{\sqrt2}{2} = \frac{\pi}{4} = \pi - \frac{3\pi}{4}$. **Solution : $x = \frac{3\pi}{4}$.**

? 2b) Résoudre $|x^2 - 1| = x^2 - 1$.
= $|A| = A \iff A \ge 0$. Donc $x^2 \ge 1$ : **$x \in\, ]-\infty, -1] \cup [1, +\infty[$**.

? 3) DL à l'ordre 3 en 0 de $e^{\cos x}$, $\frac{1}{2-x}$, $\tan x$.
= $e^{\cos x} = e\cdot e^{\cos x - 1} = e\left(1 - \frac{x^2}{2}\right) + o(x^3)$. $\frac{1}{2-x} = \frac12 \cdot \frac{1}{1 - x/2} = \frac12 + \frac{x}{4} + \frac{x^2}{8} + \frac{x^3}{16} + o(x^3)$. $\tan x = x + \frac{x^3}{3} + o(x^3)$.
```

## Exercice 1 · une suite arithmético-géométrique (COVID à Béni Mellal)

**Énoncé.** Fin septembre 2020 : $U_0 = 6000$ infectés. Chaque mois, 6 % guérissent et 600 nouveaux cas apparaissent. 1) Calculer $U_1$, $U_2$ et exprimer $U_{n+1}$. 2) $V_n = U_n - 10000$ : montrer qu'elle est géométrique, limite de $U_n$. 3) Quel mois $U_n$ dépasse-t-il 10 000 ?

```etapes Méthode pour toute suite u(n+1) = a·u(n) + b
1. Cherche le point fixe ℓ : ℓ = aℓ + b, ici ℓ = 0,94ℓ + 600, donc ℓ = 10 000.
2. Pose v(n) = u(n) − ℓ : elle est géométrique de raison a.
3. Écris u(n) = ℓ + (u(0) − ℓ)·aⁿ.
```

```exercice Exercice 1
? 1) Valeur de $U_1$ (fin octobre).
= $U_{n+1} = 0{,}94\,U_n + 600$. $U_1 = 0{,}94 \times 6000 + 600 = 6240$, puis $U_2 = 6465{,}6$.
reponse: 6240

? 2) Nature de $V_n$ et limite de $U_n$.
= $V_{n+1} = U_{n+1} - 10000 = 0{,}94U_n - 9400 = 0{,}94\,V_n$ : géométrique de raison $0{,}94$, $V_0 = -4000$. Donc $U_n = 10000 - 4000 \times 0{,}94^n \to 10000$.

? 3) Quel mois dépasse 10 000 ?
= **Jamais.** $U_n = 10000 - 4000\times0{,}94^n$ reste strictement inférieur à 10 000 : la suite monte vers 10 000 sans l'atteindre. Écris-le avec cette justification : c'est la réponse attendue, la question est un piège.
```

> [!piege] Ne cherche pas un n avec la calculatrice : le calcul de $U_n$ explicite montre qu'aucun n ne convient.

## Exercice 2 · continuité, équivalent, prolongement

**Énoncé.** $f(x) = \dfrac{\ln(1+x^2) - 2x\sin x}{\sqrt{x^2+1} - 1}$.

```exercice Exercice 2
? 1) Continuité de f.
= Le dénominateur s'annule seulement en 0. f est définie et continue sur $\mathbb R^*$ (somme, produit, quotient de fonctions continues).

? 2) Équivalent de f en 0.
= Numérateur : $\ln(1+x^2) \sim x^2$ et $2x\sin x \sim 2x^2$, donc numérateur $= x^2 - 2x^2 + o(x^2) \sim -x^2$. Dénominateur : $\sqrt{1+x^2} - 1 \sim \frac{x^2}{2}$. Donc **$f(x) \to -2$** ; f est équivalente à la constante $-2$.
reponse: -2

? 3) Prolongement.
= f a une limite finie $-2$ en 0 : on pose $g(x) = f(x)$ si $x \ne 0$ et $g(0) = -2$. g est continue sur $\mathbb R$.
```

> [!attention] Attention à l'équivalent d'une différence : on n'écrit pas « $\ln(1+x^2) - 2x\sin x \sim x^2 - 2x^2$ » sans passer par les DL. Ici c'est juste parce que les termes d'ordre 2 ne s'annulent pas.

## Exercice 3 · primitives et équation différentielle

```exercice Exercice 3
? 1) $I = \int \frac{x^2}{1+x^2}dx$ et $J = \int \tan x\,dx$.
= $\frac{x^2}{1+x^2} = 1 - \frac{1}{1+x^2}$ donc $I = x - \arctan x + C$. $\tan x = \frac{\sin x}{\cos x} = -\frac{(\cos x)'}{\cos x}$ donc $J = -\ln|\cos x| + C$.

? 2) Résoudre $(1+x^2)y' - x^2 y = x\,e^{x - \arctan x}$.
= On divise : $y' - \frac{x^2}{1+x^2}y = \frac{x\,e^{x-\arctan x}}{1+x^2}$. Une primitive de $\frac{x^2}{1+x^2}$ est $x - \arctan x$ (c'est I !). Solutions homogènes : $y_h = C e^{x - \arctan x}$. Variation de la constante : $C'(x) = \frac{x}{1+x^2}$, donc $C(x) = \frac12\ln(1+x^2) + K$. **$y = \left(\frac12\ln(1+x^2) + K\right)e^{x - \arctan x}$.**
```

> [!retenir] Le sujet est construit en chaîne : la primitive I de la question 1 sert de facteur intégrant à la question 2. Repère toujours ces liens dans un sujet.

## QCM du sujet

```qcm
? $|x^2 - 1| = x^2 - 1$ équivaut à :
- $x \in [-1, 1]$
+ $|x| \ge 1$
- $x = \pm1$
= $|A| = A \iff A \ge 0$.

? L'image de arccos est :
- $[-1, 1]$
+ $[0, \pi]$
- $[-\frac{\pi}{2}, \frac{\pi}{2}]$
= C'est la restriction bijective de cos sur $[0, \pi]$.

? DL de $\tan x$ à l'ordre 3 :
+ $x + \frac{x^3}{3}$
- $x - \frac{x^3}{6}$
- $x + \frac{x^3}{6}$
= $x - \frac{x^3}{6}$ est le DL de $\sin x$.

? Point fixe de $u_{n+1} = 0{,}94u_n + 600$ :
- 600
+ 10 000
- 6 000
= $\ell = 600 / 0{,}06$.

? $V_n = U_n - 10000$ a pour raison :
+ 0,94
- 0,06
- 600
= $V_{n+1} = 0{,}94V_n$.

? Avec $U_0 = 6000$, la suite $U_n$ :
- dépasse 10 000 au bout d'un an
+ croît vers 10 000 sans l'atteindre
- décroît
= $U_n = 10000 - 4000\times0{,}94^n$.

? En 0, $\sqrt{1+x^2} - 1 \sim$ :
- $x^2$
+ $\frac{x^2}{2}$
- $x$
= $(1+u)^{1/2} - 1 \sim \frac{u}{2}$.

? $\lim_{x\to0} f(x)$ dans l'exercice 2 :
- 0
- 2
+ $-2$
= $-x^2 / (x^2/2)$.

? Une primitive de $\tan x$ :
- $\ln|\cos x|$
+ $-\ln|\cos x|$
- $\frac{1}{\cos^2 x}$
= $\frac{1}{\cos^2x}$ est la dérivée de tan.

? Les solutions de $y' = a(x)\,y$ sont :
+ $Ce^{A(x)}$ avec $A' = a$
- $Ce^{a(x)}$
- $A(x) + C$
= On intègre $y'/y = a$.
```

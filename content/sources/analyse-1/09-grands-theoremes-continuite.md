---
id: grands-theoremes-continuite
titre: TVI, bornes atteintes, bijection, continuité uniforme
seance: Chapitre 3 · Fonctions d'une variable réelle
importance: 5
---

## Avant de commencer

Il faut savoir ce qu'est une fonction continue et une borne supérieure.

```exercice Vérifie ton prérequis
? $f$ est continue sur $[0, 1]$, $f(0) = -2$, $f(1) = 3$. Peut-on affirmer qu'il existe $c$ avec $f(c) = 0$ ?
= Oui : c'est exactement le théorème des valeurs intermédiaires, au cœur de ce chapitre. Si « continue » reste flou, relis le chapitre précédent.
```

## Comment aborder ce chapitre

> [!astuce] **Ces théorèmes donnent l'existence, pas la valeur.** On ne calcule pas $c$ : on prouve qu'il existe. Chaque fois, vérifie les hypothèses une par une.

> [!piege] Appliquer le TVI sur un ensemble qui n'est pas un intervalle, ou oublier la continuité. $\frac1x$ vaut $-1$ en $-1$ et $1$ en $1$, mais ne s'annule jamais : elle n'est pas continue sur $[-1, 1]$.

À la fin, tu sais montrer qu'une équation a une solution (et une seule), qu'une fonction est bornée et atteint ses bornes, qu'elle est bijective, et distinguer continuité et continuité uniforme.

## Idée 1 · Le théorème des valeurs intermédiaires

```html
<svg viewBox="0 0 340 180" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une courbe continue de f(a) négatif à f(b) positif coupe forcément l'axe horizontal en un point c">
<line x1="20" y1="90" x2="330" y2="90" stroke="currentColor" stroke-width="2"/>
<path d="M50 150 C100 140 120 60 170 90 S250 30 300 25" fill="none" stroke="currentColor" stroke-width="2.5"/>
<circle cx="50" cy="150" r="4.5" fill="currentColor"/><circle cx="300" cy="25" r="4.5" fill="currentColor"/><circle cx="141" cy="90" r="5" fill="#D9824F"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="30" y="170" fill="currentColor">f(a) &lt; 0</text><text x="260" y="18" fill="currentColor">f(b) &gt; 0</text><text x="135" y="112" fill="#D9824F">c</text></g>
</svg>
```

Si $f$ est **continue sur $[a, b]$**, elle prend toutes les valeurs entre $f(a)$ et $f(b)$. En particulier, si $f(a)f(b) < 0$, il existe $c \in ]a, b[$ avec $f(c) = 0$.

Plus généralement : l'image d'un intervalle par une fonction continue est un intervalle.

**Exemple.** $x^3 + x - 1 = 0$ a une solution dans $]0, 1[$ : $f(0) = -1 < 0$ et $f(1) = 1 > 0$.

```etapes Montrer qu'une équation a une unique solution
Mettre sous la forme f(x) = 0 :: Tout passer du même côté.
Continuité :: Justifier que $f$ est continue sur l'intervalle.
Changement de signe :: Trouver $a, b$ avec $f(a)f(b) < 0$ (ou des limites de signes opposés).
Unicité :: Montrer que $f$ est strictement monotone.
```

**Application : point fixe.** Si $f : [0,1] \to [0,1]$ est continue, $g(x) = f(x) - x$ vérifie $g(0) \ge 0$ et $g(1) \le 0$ : $f$ a un point fixe.

## Idée 2 · Une fonction continue sur un segment est bornée et atteint ses bornes

Si $f$ est continue sur un **segment** $[a, b]$ (fermé et borné), alors $f$ est bornée et il existe $x_m, x_M$ avec $f(x_m) = \min f$ et $f(x_M) = \max f$. Donc $f([a, b]) = [m, M]$.

> [!attention] Les deux mots comptent. Sur $]0, 1]$, $\tfrac1x$ n'est pas bornée. Sur $[0, +\infty[$, $\arctan$ est bornée mais n'atteint pas $\tfrac\pi2$.

## Idée 3 · Théorème de la bijection

Si $f$ est **continue et strictement monotone** sur un intervalle $I$, alors $f$ est une bijection de $I$ sur l'intervalle $J = f(I)$. Sa réciproque $f^{-1}$ est continue, strictement monotone, de même sens que $f$.

**Exemple.** $f(x) = x^3 + 4x - 1$ est continue, strictement croissante sur $\mathbb R$, avec limites $-\infty$ et $+\infty$ : c'est une bijection de $\mathbb R$ sur $\mathbb R$.

Les graphes de $f$ et $f^{-1}$ sont symétriques par rapport à la droite $y = x$.

## Idée 4 · Continuité uniforme

$f$ est **uniformément continue** sur $I$ si $\forall \varepsilon > 0, \exists \delta > 0, \forall x, y \in I, |x - y| < \delta \Rightarrow |f(x) - f(y)| < \varepsilon$.

La différence avec la continuité : ici, $\delta$ ne dépend que de $\varepsilon$, **pas du point**.

```grille Ce qui implique quoi
#cols: Propriété, Conséquence
*k-lipschitzienne (|f(x) - f(y)| ≤ k|x - y|), uniformément continue (prendre δ = ε/k)
*uniformément continue, continue
*continue sur un segment [a, b], uniformément continue (théorème de Heine)
~continue sur ℝ, pas forcément uniformément continue (x²)
```

**Exemple.** $x \mapsto x^2$ n'est pas uniformément continue sur $\mathbb R$ : avec $x_n = n + \tfrac1n$, $y_n = n$, on a $x_n - y_n \to 0$ mais $x_n^2 - y_n^2 = 2 + \tfrac1{n^2} \ge 2$.

## S'exercer

```exercice Les grands théorèmes
? $f : [a, b] \to \mathbb R$ continue avec $f(a) < f(b)$. Soit $E = \{x \in [a, b] : f(x) \le f(a)\}$. Montre que $E$ a une borne supérieure $\alpha$ et que $a \le \alpha < b$. (Série 3, exercice 2)
indice: $a \in E$ et $E \subset [a, b]$.
= $E$ contient $a$ (non vide) et est majoré par $b$ : $\alpha = \sup E$ existe et $\alpha \ge a$. Par continuité en $b$, $f(x) > f(a)$ pour $x$ proche de $b$, donc ces $x$ ne sont pas dans $E$ : $\alpha < b$.

? Montre que l'équation $\cos x = x$ a une unique solution dans $[0, \tfrac\pi2]$.
= $g(x) = \cos x - x$ est continue, $g(0) = 1 > 0$, $g(\tfrac\pi2) = -\tfrac\pi2 < 0$ : existence par le TVI. $g'(x) = -\sin x - 1 < 0$ sur $]0, \tfrac\pi2]$ : strictement décroissante, d'où l'unicité.

? Montre que $f(x) = \dfrac{x}{1 + |x|}$ est 1-lipschitzienne sur $\mathbb R^+$.
= Pour $x, y \ge 0$ : $f(x) - f(y) = \dfrac{x - y}{(1 + x)(1 + y)}$, donc $|f(x) - f(y)| \le |x - y|$. Elle est donc uniformément continue.
```

## Flashcards

```cartes
TVI :: $f$ continue sur $[a,b]$ prend toutes les valeurs entre $f(a)$ et $f(b)$.
Image d'un intervalle par une fonction continue :: Un intervalle.
Continue sur un segment :: Bornée et atteint ses bornes : $f([a,b]) = [m, M]$.
Théorème de la bijection :: Continue et strictement monotone sur $I$ : bijection de $I$ sur $f(I)$, réciproque continue de même monotonie.
Unicité d'une solution de $f(x) = 0$ :: Stricte monotonie de $f$.
Continuité uniforme :: $\delta$ ne dépend que de $\varepsilon$, pas du point.
Théorème de Heine :: Continue sur un segment donne uniformément continue.
Lipschitzienne :: $|f(x) - f(y)| \le k|x - y|$ ; elle implique la continuité uniforme.
```

## QCM du chapitre

```qcm
? Le TVI demande :
+ $f$ continue sur un intervalle
- $f$ dérivable
- $f$ monotone
= La continuité suffit.

? $x^5 + x - 1 = 0$ admet une solution dans :
+ $]0, 1[$
- $]1, 2[$
- aucune
= $f(0) = -1$, $f(1) = 1$.

? $\frac1x$ sur $[-1, 1] \setminus\{0\}$ ne s'annule pas car :
- le TVI est faux
+ l'ensemble n'est pas un intervalle
- $\frac1x$ n'est pas monotone
= Le domaine est coupé en 0.

? Une fonction continue sur $]0, 1]$ est :
- toujours bornée
+ pas forcément bornée
- toujours atteinte en son max
= $\frac1x$ est un contre-exemple.

? L'unicité d'une solution vient en général de :
- la continuité
+ la stricte monotonie
- le TVI
= Une fonction strictement monotone est injective.

? La réciproque d'une fonction continue strictement décroissante sur un intervalle est :
- croissante
+ continue et strictement décroissante
- pas forcément continue
= Théorème de la bijection.

? $x^2$ sur $\mathbb R$ est :
+ continue mais pas uniformément continue
- uniformément continue
- lipschitzienne
= Sa pente grandit sans limite.

? Théorème de Heine : continue sur un segment implique :
- dérivable
+ uniformément continue
- lipschitzienne
= Le segment est essentiel.

? $f$ $k$-lipschitzienne : quel $\delta$ pour $\varepsilon$ ?
+ $\frac{\varepsilon}{k}$
- $k\varepsilon$
- $\varepsilon^2$
= $|f(x) - f(y)| \le k|x - y| < k\delta = \varepsilon$.

? $f : [0,1] \to [0,1]$ continue :
+ a au moins un point fixe
- n'a pas de point fixe
- a exactement un point fixe
= TVI sur $f(x) - x$ ; il peut y en avoir plusieurs.
```

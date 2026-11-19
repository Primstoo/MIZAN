---
id: suites-cauchy
titre: Suites de Cauchy, suites usuelles, densité par les suites
seance: Chapitre 2 · Les suites numériques
importance: 3
---

## Avant de commencer

Il te faut la **définition de la limite** avec $\varepsilon$ et l'inégalité triangulaire $|a + b| \le |a| + |b|$.

```exercice Vérifie ton prérequis
? Si $|u_n - \ell| < \tfrac{\varepsilon}{2}$ et $|u_p - \ell| < \tfrac{\varepsilon}{2}$, que peux-tu dire de $|u_n - u_p|$ ?
indice: Écris $u_n - u_p = (u_n - \ell) + (\ell - u_p)$.
= $|u_n - u_p| \le |u_n - \ell| + |\ell - u_p| < \varepsilon$. Si ça coince, reprends l'idée 3 du chapitre « Valeur absolue ».
```

## Comment aborder ce chapitre

> [!astuce] **Une suite de Cauchy, c'est une suite dont les termes se rapprochent les uns des autres.** On ne parle plus de la limite : on compare les termes entre eux. C'est l'outil quand la limite est inconnue et que la suite n'est pas monotone.

> [!piege] « $u_{n+1} - u_n \to 0$, donc la suite est de Cauchy. » Faux. $u_n = \sqrt n$ vérifie $u_{n+1} - u_n \to 0$ et tend pourtant vers $+\infty$. Il faut contrôler $|u_p - u_n|$ pour **tous** les $p, n$ grands, pas seulement deux voisins.

À la fin, tu sais prouver qu'une suite est (ou n'est pas) de Cauchy, manipuler suites arithmétiques et géométriques, et caractériser la densité avec des suites.

## Idée 1 · Les termes se resserrent entre eux

```html
<svg viewBox="0 0 340 120" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="À partir du rang N, deux termes quelconques de la suite sont à moins d'epsilon l'un de l'autre">
<line x1="20" y1="70" x2="330" y2="70" stroke="currentColor" stroke-width="2"/>
<rect x="200" y="50" width="70" height="40" fill="#D9824F" opacity="0.18"/>
<g fill="currentColor"><circle cx="40" cy="70" r="4"/><circle cx="120" cy="70" r="4"/><circle cx="170" cy="70" r="4"/></g>
<g fill="#D9824F"><circle cx="210" cy="70" r="4"/><circle cx="255" cy="70" r="4"/><circle cx="228" cy="70" r="4"/><circle cx="242" cy="70" r="4"/><circle cx="236" cy="70" r="4"/></g>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="196" y="40" fill="#D9824F">largeur &lt; ε</text><text x="30" y="105" fill="currentColor">premiers termes : libres</text><text x="200" y="105" fill="#D9824F">après N : serrés</text></g>
</svg>
```

$(u_n)$ est **de Cauchy** si : pour tout $\varepsilon > 0$, il existe $N$ tel que pour tous $p, n \ge N$, $|u_p - u_n| < \varepsilon$.

Dans $\mathbb R$ : **une suite converge si et seulement si elle est de Cauchy**. Le sens « convergente donc Cauchy » est le prérequis ci-dessus. L'autre sens utilise Bolzano-Weierstrass.

**Exemple.** $u_n = \sum_{k=1}^{n} \dfrac{\sin k}{2^k}$. Pour $p > n$ : $|u_p - u_n| \le \sum_{k=n+1}^{p} \dfrac{1}{2^k} < \dfrac{1}{2^n}$. Comme $\tfrac1{2^n} \to 0$, la suite est de Cauchy, donc converge.

```etapes Prouver qu'une somme est de Cauchy
Écrire la différence :: Pour $p > n$, $u_p - u_n = \sum_{k=n+1}^{p} a_k$.
Majorer en valeur absolue :: Inégalité triangulaire, puis une majoration simple de $|a_k|$.
Majorer par un terme qui ne dépend que de n :: Souvent une somme géométrique ou télescopique.
Conclure :: Ce majorant tend vers 0, donc la suite est de Cauchy, donc convergente.
```

## Idée 2 · Montrer qu'une suite n'est PAS de Cauchy

On nie la définition : il existe $\varepsilon > 0$ tel que, pour tout $N$, on trouve $p, n \ge N$ avec $|u_p - u_n| \ge \varepsilon$. En pratique, on prend $p = 2n$.

**Exemple (série harmonique).** $u_n = \sum_{k=1}^{n} \dfrac1k$. Alors $u_{2n} - u_n = \sum_{k=n+1}^{2n} \dfrac1k \ge n \cdot \dfrac{1}{2n} = \dfrac12$. Avec $\varepsilon = \tfrac12$ : pas de Cauchy, donc divergente. Comme elle est croissante, elle tend vers $+\infty$.

> [!retenir] Pour une somme : minore $u_{2n} - u_n$ par $n$ fois le plus petit terme. Si tu obtiens une constante $> 0$, la suite n'est pas de Cauchy.

## Idée 3 · Suites arithmétiques et géométriques

```grille Les deux suites de référence
#cols: Suite, Terme général, Somme des termes, Limite
*Arithmétique, u_n = u_0 + n r, (nb de termes)(premier + dernier)/2, ±∞ si r ≠ 0
*Géométrique, u_n = u_0 q^n, u_0 (1 - q^(n+1))/(1 - q) si q ≠ 1, 0 si |q| < 1
```

Pour $q^n$ : il tend vers 0 si $|q| < 1$, vaut 1 si $q = 1$, tend vers $+\infty$ si $q > 1$, et n'a pas de limite si $q \le -1$.

**Exemple.** $\sum_{k=0}^{n} a^k = \dfrac{1 - a^{n+1}}{1 - a} \to \dfrac{1}{1 - a}$ pour $0 < a < 1$.

## Idée 4 · La densité caractérisée par les suites

Une partie $D$ de $\mathbb R$ est **dense** si elle rencontre tout intervalle $]x, y[$ avec $x < y$. Version suites : $D$ est dense **si et seulement si** tout réel $x$ est limite d'une suite d'éléments de $D$.

**Exemple.** $\mathbb Q$ est dense : pour $x$ réel, $r_n = \dfrac{E(nx)}{n}$ est rationnel et $x - \tfrac1n < r_n \le x$, donc $r_n \to x$ par les gendarmes.

## S'exercer

```exercice Cauchy en pratique
? Montre que $u_n = \sum_{k=1}^{n} \dfrac{1}{k^2}$ est de Cauchy. Indication : $\dfrac1{k^2} \le \dfrac1{k-1} - \dfrac1k$ pour $k \ge 2$.
indice: La somme devient télescopique.
= Pour $p > n \ge 1$ : $0 \le u_p - u_n \le \sum_{k=n+1}^{p}\left(\tfrac1{k-1} - \tfrac1k\right) = \tfrac1n - \tfrac1p < \tfrac1n$. Donc $|u_p - u_n| < \varepsilon$ dès que $n \ge N > \tfrac1\varepsilon$. La suite est de Cauchy, donc converge.

? Montre que $u_n = \sum_{k=1}^{n} \dfrac{1}{\sqrt k}$ n'est pas de Cauchy.
indice: Minore $u_{2n} - u_n$.
= $u_{2n} - u_n = \sum_{k=n+1}^{2n} \tfrac1{\sqrt k} \ge n \cdot \tfrac1{\sqrt{2n}} = \sqrt{\tfrac n2} \ge \tfrac{1}{\sqrt 2}$. Pas de Cauchy avec $\varepsilon = \tfrac1{\sqrt2}$ ; croissante, elle tend vers $+\infty$.

? Soit $x$ réel. Montre que $\dfrac{E(nx)}{n} \to x$.
indice: $nx - 1 < E(nx) \le nx$.
= On divise par $n > 0$ : $x - \tfrac1n < \tfrac{E(nx)}{n} \le x$. Les deux bornes tendent vers $x$ : gendarmes.
```

## Flashcards

```cartes
Suite de Cauchy :: Pour tout $\varepsilon > 0$, il existe $N$ tel que $|u_p - u_n| < \varepsilon$ pour tous $p, n \ge N$.
Cauchy et convergence dans $\mathbb R$ :: Une suite réelle converge si et seulement si elle est de Cauchy.
$u_{n+1} - u_n \to 0$ suffit-il ? :: Non : $\sqrt n$ en est un contre-exemple.
Nier Cauchy en pratique :: Trouver $\varepsilon > 0$ avec $|u_{2n} - u_n| \ge \varepsilon$ pour tout $n$.
Somme géométrique :: $\sum_{k=0}^{n} q^k = \dfrac{1 - q^{n+1}}{1 - q}$ si $q \ne 1$.
Limite de $q^n$ :: 0 si $|q| < 1$ ; 1 si $q = 1$ ; $+\infty$ si $q > 1$ ; pas de limite si $q \le -1$.
Densité par les suites :: $D$ dense dans $\mathbb R$ ssi tout réel est limite d'une suite d'éléments de $D$.
Série harmonique :: $\sum_{k=1}^n \tfrac1k \to +\infty$ car $u_{2n} - u_n \ge \tfrac12$.
```

## QCM du chapitre

```qcm
? Dans $\mathbb R$, une suite de Cauchy :
+ converge toujours
- peut tendre vers $+\infty$
- est forcément monotone
= C'est la complétude de $\mathbb R$.

? $u_n = \sqrt n$ vérifie $u_{n+1} - u_n \to 0$. Elle est :
- de Cauchy
+ pas de Cauchy
- convergente
= Elle tend vers $+\infty$ : l'écart entre voisins ne suffit pas.

? Pour montrer qu'une somme $\sum_{k=1}^n a_k$ n'est pas de Cauchy, on minore souvent :
- $u_{n+1} - u_n$
+ $u_{2n} - u_n$
- $u_n$
= On compare des termes éloignés, pas deux voisins.

? $\sum_{k=n+1}^{2n} \frac1k$ est minorée par :
+ $\frac12$
- $1$
- $\frac1n$
= $n$ termes, chacun $\ge \frac1{2n}$.

? $\sum_{k=0}^{n} \left(\frac12\right)^k$ tend vers :
- 1
+ 2
- $+\infty$
= $\frac{1}{1 - 1/2} = 2$.

? $(-2)^n$ :
- tend vers $+\infty$
- tend vers 0
+ n'a pas de limite
= Le signe alterne et la valeur absolue explose.

? Toute suite convergente est :
+ de Cauchy
- croissante
- géométrique
= Prérequis du chapitre : on passe par $\ell$ avec $\frac\varepsilon2$.

? $D$ est dense dans $\mathbb R$ si :
- $D$ contient tous les rationnels
+ tout réel est limite d'une suite d'éléments de $D$
- $D$ est infini
= $\mathbb N$ est infini et pas dense.

? La suite $\frac{E(nx)}{n}$ tend vers :
- $E(x)$
+ $x$
- 0
= Encadrement $x - \frac1n < \frac{E(nx)}{n} \le x$.

? Une suite arithmétique de raison $r \ne 0$ :
- converge
+ diverge
- est bornée
= Elle tend vers $\pm\infty$ selon le signe de $r$.
```

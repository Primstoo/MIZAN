---
id: frenet
titre: Repère de Frenet et rayon de courbure
seance: Chapitre II · Cinématique (abscisse curviligne, Frenet)
importance: 4
---

## Avant de commencer

Tu dois savoir calculer une norme et un produit vectoriel (chapitre 1), et la vitesse en cartésiennes (chapitre 3).

```exercice Vérifie ton prérequis
? $\vec V = \vec i - 2\vec j$ et $\vec\gamma = -2\vec j$. Calcule $\|\vec V\wedge\vec\gamma\|$.
reponse: 2
= $\vec V\wedge\vec\gamma = (1)(-2)\,\vec k - 0 = -2\vec k$, de norme 2.
```

## Comment aborder ce chapitre

> [!astuce] **Frenet, c'est le repère du conducteur** : $\vec\tau$ devant soi (le long de la route), $\vec n$ vers l'intérieur du virage. L'accélération tangentielle change la vitesse, la normale change la direction.

> [!piege] Croire que l'accélération est nulle quand $\|\vec V\|$ est constante. Dans un virage à vitesse constante, $\gamma_t = 0$ mais $\gamma_n = V^2/R_c \ne 0$.

À la fin, tu sais décomposer $\vec\gamma$ en $\gamma_t$ et $\gamma_n$ et calculer un rayon de courbure de deux façons.

## Idée 1 · Abscisse curviligne et base de Frenet

```html
<svg viewBox="0 0 440 200" role="img" aria-label="Base de Frenet : tau tangent à la trajectoire, n vers le centre de courbure C, rayon de courbure Rc" style="max-width:100%;height:auto"><path d="M40 170Q200 10 400 150" fill="none" stroke="currentColor" stroke-width="2"/><g stroke="#D9824F" stroke-width="2.4"><path d="M220 90L300 98"/><path d="M220 90L214 150"/></g><path d="M220 90L208 190" stroke="currentColor" stroke-dasharray="4 3"/><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="210" y="82">M</text><text x="304" y="100" fill="#D9824F">τ</text><text x="196" y="150" fill="#D9824F">n</text><text x="214" y="196">C (centre de courbure)</text><text x="226" y="176">R_c</text></g></svg>
```

- Abscisse curviligne $s(t)$ : longueur d'arc parcourue ; $ds = \|d\overrightarrow{OM}\|$ et $\|\vec V\| = \dfrac{ds}{dt}$.
- $\vec\tau = \dfrac{\vec V}{\|\vec V\|}$ (tangent), $\dfrac{d\vec\tau}{ds} = \dfrac1{R_c}\vec n$ (normale, vers le centre de courbure), $\vec b = \vec\tau\wedge\vec n$.

## Idée 2 · Accélération tangentielle et normale

$$\vec V = V\,\vec\tau,\qquad \vec\gamma = \frac{dV}{dt}\,\vec\tau + \frac{V^2}{R_c}\,\vec n$$

| Composante | Formule | Rôle |
|---|---|---|
| $\gamma_t$ | $\dfrac{d\|\vec V\|}{dt}$ | change la valeur de la vitesse |
| $\gamma_n$ | $\dfrac{V^2}{R_c} \ge 0$ | change la direction |

```etapes Série 2, ex. 1 : $\vec V = \vec i - 2t\vec j$, $\vec\gamma = -2\vec j$
$\gamma_t$ :: $\|\vec V\| = \sqrt{1+4t^2}$, donc $\gamma_t = \dfrac{4t}{\sqrt{1+4t^2}}$.
$\vec\gamma_t$ :: $\gamma_t\,\vec\tau = \dfrac{4t}{1+4t^2}(\vec i - 2t\vec j)$.
$\vec\gamma_n$ :: $\vec\gamma - \vec\gamma_t = -\dfrac{4t}{1+4t^2}\vec i - \dfrac{2}{1+4t^2}\vec j$.
$R_c$ :: $R_c = \dfrac{\|\vec V\|^3}{\|\vec V\wedge\vec\gamma\|} = \dfrac{(1+4t^2)^{3/2}}{2}$.
```

> [!retenir] Deux méthodes pour $R_c$ : $R_c = \dfrac{\|\vec V\|^3}{\|\vec V\wedge\vec\gamma\|}$ (la plus rapide) ou $R_c = \dfrac{V^2}{\gamma_n}$.

## S'exercer

```exercice Série 2, exercice 2
? Pour $x = 2e^t\sin t$, $y = 2e^t\cos t$, $z = e^t$ ($V = 3e^t$), calcule $R_c$ avec $\dfrac{d\vec\tau}{ds} = \dfrac1{R_c}\vec n$.
indice: $\vec\tau = \vec V/V = \tfrac23(\sin t+\cos t,\ \cos t-\sin t,\ \tfrac12)$, puis $\dfrac{d\vec\tau}{ds} = \dfrac{d\vec\tau}{dt}\dfrac{dt}{ds}$ avec $\dfrac{dt}{ds} = \dfrac1{3e^t}$.
= $\left\|\dfrac{d\vec\tau}{dt}\right\| = \tfrac23\sqrt2$, donc $\left\|\dfrac{d\vec\tau}{ds}\right\| = \dfrac{2\sqrt2}{9e^t}$ et $R_c = \dfrac{9e^t}{2\sqrt2} = \dfrac{9\sqrt2}{4}e^t = \dfrac{9\sqrt2}{4}z$ (vérifié par calcul symbolique). Le rayon de courbure dépend de $z$.
? Projection dans $z = 0$ : exprime $\rho(\varphi)$.
= $\rho = \sqrt{x^2+y^2} = 2e^t$ et $\tan\varphi = y/x = \cot t$, donc $\varphi = \tfrac\pi2 - t$. D'où $\rho = 2e^{\pi/2 - \varphi}$ : une **spirale logarithmique**.
```

## Flashcards

```cartes
$\vec\tau$ :: $\vec V/\|\vec V\|$
$\gamma_t$ :: $d\|\vec V\|/dt$
$\gamma_n$ :: $V^2/R_c$
Rayon de courbure (formule rapide) :: $R_c = \|\vec V\|^3/\|\vec V\wedge\vec\gamma\|$
$d\vec\tau/ds$ :: $\vec n/R_c$
$\vec b$ :: $\vec\tau\wedge\vec n$
Vitesse et abscisse curviligne :: $\|\vec V\| = ds/dt$
```

## QCM du chapitre

```qcm
? $\vec n$ est dirigé vers :
+ le centre de courbure
- l'extérieur du virage
- l'origine $O$
= Concavité de la trajectoire.

? À vitesse de norme constante, $\gamma_t$ vaut :
+ 0
- $V^2/R_c$
- $V$
= $\gamma_t = dV/dt$.

? $\gamma_n$ vaut :
- $dV/dt$
+ $V^2/R_c$
- $R_c/V^2$
= Accélération normale.

? Pour une droite, $R_c$ est :
- nul
+ infini
- égal à 1
= Aucune courbure, $\gamma_n = 0$.

? $R_c = \|\vec V\|^3/\|\vec V\wedge\vec\gamma\|$ pour $\vec V = \vec i - 2t\vec j$, $\vec\gamma = -2\vec j$, à $t = 0$ :
+ 1/2
- 2
- 1
= $1^3/2$.

? $\vec b$ se définit par :
+ $\vec\tau\wedge\vec n$
- $\vec n\wedge\vec\tau$
- $\vec\tau + \vec n$
= Pour que $(\vec\tau, \vec n, \vec b)$ soit direct.

? L'abscisse curviligne vérifie :
+ $ds/dt = \|\vec V\|$
- $ds/dt = \|\vec\gamma\|$
- $s = \|\overrightarrow{OM}\|$
= C'est la longueur parcourue sur la courbe.

? La trajectoire $\rho = 2e^{\pi/2-\varphi}$ est :
- un cercle
+ une spirale logarithmique
- une parabole
= Rayon exponentiel en fonction de l'angle.

? Dans un virage à vitesse constante, l'accélération est :
- nulle
+ normale à la trajectoire
- tangente
= $\gamma_t = 0$, il reste $\gamma_n$.

? $\gamma_n$ est toujours :
+ positive ou nulle
- négative
- de signe quelconque
= $V^2/R_c \ge 0$.
```

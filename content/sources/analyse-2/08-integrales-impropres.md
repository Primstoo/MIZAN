---
id: integrales-impropres
titre: Intégrales impropres
seance: Chapitre 8 · Intégrale impropre
importance: 5
---

## Avant de commencer

Il faut savoir calculer une primitive (chapitres 6 et 7) et une limite en $+\infty$ ou en un point.

```exercice Vérifie ton prérequis
? Que vaut $\lim_{X \to +\infty} \left(1 - e^{-X}\right)$ ?
= 1, car $e^{-X} \to 0$.
reponse: 1
```

## Comment aborder ce chapitre

> [!astuce] **Une intégrale impropre, c'est une limite d'intégrales ordinaires.** On intègre jusqu'à $X$, puis on fait tendre $X$ vers le bord gênant. Pour la seule nature, on compare à une intégrale de référence.

> [!piege] Couper une intégrale en deux morceaux divergents et « compenser ». $\int_2^{+\infty}\left(\frac{1}{x+1} + \frac{1}{1-x}\right)dx$ converge alors que les deux morceaux divergent : on étudie la **somme**, pas chaque terme.

À la fin, tu sais calculer une intégrale impropre convergente et décider de la nature avec Riemann, la comparaison et les équivalents.

## Idée 1 · La définition

$\int_a^{+\infty} f$ converge si $\lim_{X \to +\infty}\int_a^X f$ existe et est finie. Même idée en un point où $f$ n'est pas définie. Deux bords gênants : on coupe en un point au milieu, et **chaque** morceau doit converger.

**Exemple.** $\int_0^X te^{-t}dt = 1 - (X + 1)e^{-X} \to 1$ : l'intégrale converge et vaut 1.

## Idée 2 · Les intégrales de Riemann

```html
<svg viewBox="0 0 340 150" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Axe des exposants alpha avec la valeur 1 comme frontière entre convergence et divergence">
<line x1="20" y1="70" x2="320" y2="70" stroke="currentColor" stroke-width="2"/>
<circle cx="170" cy="70" r="5" fill="#D9824F"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="163" y="95" fill="#D9824F">α = 1</text>
<text x="30" y="40" fill="currentColor">en +∞ : diverge</text><text x="200" y="40" fill="#D9824F">en +∞ : converge</text>
<text x="30" y="125" fill="#D9824F">en 0 : converge</text><text x="200" y="125" fill="currentColor">en 0 : diverge</text></g>
</svg>
```

$\int_1^{+\infty}\frac{dt}{t^\alpha}$ converge **ssi $\alpha > 1$**. $\int_0^1\frac{dt}{t^\alpha}$ converge **ssi $\alpha < 1$**. Pour $\alpha = 1$, les deux divergent (le $\ln$).

Aussi : $\int_0^{+\infty}e^{-\lambda t}dt$ converge pour $\lambda > 0$ et vaut $\frac1\lambda$.

## Idée 3 · Comparer pour décider

```etapes Étudier la nature (fonction positive)
Repérer les bords gênants :: $\int_0^{+\infty}\frac{\ln t}{t^2 + 1}dt$ : bords 0 et $+\infty$.
Trouver un équivalent ou une majoration à chaque bord :: En 0 : $|f| \sim |\ln t|$, intégrable. En $+\infty$ : $\frac{\ln t}{t^2} \le \frac{1}{t^{3/2}}$ pour $t$ grand.
Comparer à une référence :: $\int_1^{+\infty}t^{-3/2}$ converge ($\alpha > 1$).
Conclure :: Les deux morceaux convergent : l'intégrale converge.
```

- **Comparaison** : $0 \le f \le g$ et $\int g$ converge, alors $\int f$ converge.
- **Équivalents** : $f \sim g$ au bord, de signe constant : même nature.
- **Absolue convergence** : si $\int |f|$ converge, $\int f$ converge. Exemple : $\left|\frac{\sin t}{t^2}\right| \le \frac{1}{t^2}$ sur $[1, +\infty[$.

> [!retenir] Pour une fonction positive : un équivalent simple à chaque bord, puis Riemann ou exponentielle.

## S'exercer

```exercice Impropres
? $\int_0^1\frac{dt}{\sqrt{1 - t}}$ : nature et valeur.
= $\int_0^X (1-t)^{-1/2}dt = 2 - 2\sqrt{1 - X} \to 2$. Converge, vaut 2.
reponse: 2

? Nature de $\int_0^{+\infty}\sqrt{\frac{2t + 3}{5t^3 + 3t^2 + 7}}\,dt$.
= Pas de problème en 0 (fonction continue). En $+\infty$ : équivalent $\sqrt{\frac{2}{5}}\,t^{-1}$, intégrale de Riemann avec $\alpha = 1$ : diverge.

? Montre que $\int_0^{+\infty}\frac{\ln t}{1 + t^2}dt = 0$.
indice: Coupe en 1 et pose $u = \frac1t$ sur $[1, +\infty[$.
= Les deux morceaux convergent (voir étapes). Avec $u = \frac1t$ : $\int_1^{+\infty}\frac{\ln t}{1+t^2}dt = \int_0^1\frac{-\ln u}{1 + u^2}du$. Les deux morceaux sont opposés : somme nulle.
reponse: 0
```

## Flashcards

```cartes
Définition :: $\int_a^{+\infty} f = \lim_{X \to +\infty}\int_a^X f$, si elle existe et est finie.
Riemann en $+\infty$ :: $\int_1^{+\infty}t^{-\alpha}$ converge ssi $\alpha > 1$.
Riemann en 0 :: $\int_0^1 t^{-\alpha}$ converge ssi $\alpha < 1$.
$\int_0^{+\infty}e^{-\lambda t}dt$ :: $\frac1\lambda$ pour $\lambda > 0$.
Critère des équivalents :: $f \sim g$, de signe constant : même nature.
Absolue convergence :: $\int|f|$ converge implique $\int f$ converge.
Deux bords gênants :: Couper ; chaque morceau doit converger.
$\int_0^{+\infty}te^{-t}dt$ :: 1.
```

## QCM du chapitre

```qcm
? $\int_1^{+\infty}\frac{dt}{t^2}$ :
+ converge et vaut 1
- diverge
- vaut 2
= $\left[-\frac1t\right]_1^{+\infty}$.

? $\int_1^{+\infty}\frac{dt}{\sqrt t}$ :
- converge
+ diverge
- vaut 2
= $\alpha = \frac12 \le 1$.

? $\int_0^1\frac{dt}{\sqrt t}$ :
+ converge et vaut 2
- diverge
- vaut $\frac12$
= $\alpha = \frac12 < 1$ en 0.

? $\int_2^{+\infty}\frac{dt}{3^t}$ :
+ converge
- diverge
- n'est pas définie
= Exponentielle décroissante.

? $\int_0^{+\infty}dt$ :
- converge et vaut 0
+ diverge
- vaut 1
= $\int_0^X dt = X \to +\infty$.

? $\int_0^{+\infty}\frac{dt}{1 + t^2}$ :
+ $\frac\pi2$
- $\frac\pi4$
- diverge
= $\arctan$ tend vers $\frac\pi2$.

? $\int_1^2\frac{dt}{t^2 - t}$ est impropre en :
+ 1
- 2
- aucun point
= $t^2 - t = 0$ en $t = 1$ ; équivalent $\frac{1}{t-1}$ : diverge.

? Si $0 \le f \le g$ et $\int g$ diverge :
- $\int f$ diverge
- $\int f$ converge
+ on ne peut rien conclure
= La comparaison ne marche que dans un sens.

? $\int_{-\infty}^0 te^{-t^2}dt$ :
+ $-\frac12$
- $\frac12$
- diverge
= $\left[-\frac12 e^{-t^2}\right]_{-\infty}^0$.

? $\int_1^{+\infty}\frac{\sin t}{t^2}dt$ :
+ converge absolument
- diverge
- converge mais pas absolument
= $|\sin t| / t^2 \le 1/t^2$.
```

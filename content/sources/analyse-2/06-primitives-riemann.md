---
id: primitives-integrale
titre: Primitives et intégrale de Riemann
seance: Chapitre 6 · Intégrale simple
importance: 5
---

## Avant de commencer

Tu dois connaître les dérivées usuelles ($\ln$, $\arctan$, $\arcsin$, puissances) et la dérivée d'une composée $(g \circ u)' = u' \cdot g' \circ u$.

```exercice Vérifie ton prérequis
? Dérive $\arctan(2x)$.
= $\frac{2}{1 + 4x^2}$ : $u' = 2$ fois $\arctan'(u) = \frac{1}{1+u^2}$.
```

## Comment aborder ce chapitre

> [!astuce] **Primitiver, c'est dériver à l'envers : cherche la forme $u' \cdot g(u)$.** La moitié des primitives du TD se lisent directement avec cette question.

> [!piege] Oublier la constante d'ajustement. $\int \frac{x^3}{1 + x^4}dx$ : la dérivée de $1 + x^4$ est $4x^3$, pas $x^3$. Il faut un $\frac14$ devant le $\ln$.

À la fin, tu sais trouver les primitives usuelles, utiliser les propriétés de l'intégrale et calculer une limite de somme de Riemann.

## Idée 1 · Reconnaître une forme $u' g(u)$

```grille Formes à reconnaître
#cols: forme primitive
#rows: 1 2 3 4 5
u'uⁿ *uⁿ⁺¹/(n+1)
u'/u *ln|u|
u'/(1+u²) *arctan(u)
u'eᵘ *eᵘ
u'/√(1−u²) *arcsin(u)
```

**Exemples.** $\sin x \cos^5 x = -u'u^5$ avec $u = \cos x$ : primitive $-\frac{\cos^6 x}{6}$. $\frac{\arctan(2x)}{1 + 4x^2} = \frac12 u'u$ avec $u = \arctan(2x)$ : primitive $\frac{\arctan^2(2x)}{4}$. $\frac{1}{x^2 + 121} = \frac{1}{121}\cdot\frac{1}{1 + (x/11)^2}$ : primitive $\frac{1}{11}\arctan\frac{x}{11}$.

## Idée 2 · L'intégrale comme aire

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Aire sous une courbe approchée par des rectangles de même largeur">
<line x1="20" y1="150" x2="330" y2="150" stroke="currentColor" stroke-width="2"/>
<g fill="#D9824F" fill-opacity="0.35" stroke="#D9824F"><rect x="50" y="110" width="50" height="40"/><rect x="100" y="85" width="50" height="65"/><rect x="150" y="65" width="50" height="85"/><rect x="200" y="50" width="50" height="100"/><rect x="250" y="42" width="50" height="108"/></g>
<path d="M50 125 C120 80 200 55 300 40" fill="none" stroke="currentColor" stroke-width="2.5"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="45" y="166" fill="currentColor">a</text><text x="296" y="166" fill="currentColor">b</text><text x="120" y="30" fill="#D9824F">Σ (b−a)/n · f(xₖ)</text></g>
</svg>
```

Pour $f$ continue sur $[a, b]$ et $F$ une primitive : $\int_a^b f(x)\,dx = F(b) - F(a)$. Propriétés : linéarité, Chasles, positivité ($f \ge 0 \Rightarrow \int f \ge 0$), donc croissance : $f \le g \Rightarrow \int f \le \int g$.

**Encadrer une intégrale.** Si $f$ est décroissante sur $[n, n+1]$ : $f(n+1) \le \int_n^{n+1} f \le f(n)$.

## Idée 3 · Sommes de Riemann

Si $f$ est continue sur $[0, 1]$ : $\displaystyle\frac1n\sum_{k=1}^{n} f\left(\frac kn\right) \xrightarrow[n \to \infty]{} \int_0^1 f(x)\,dx$.

```etapes Reconnaître une somme de Riemann
Factoriser 1/n :: $r_n = \sum \frac{n + k}{n^2 + k^2} = \frac1n \sum \frac{1 + k/n}{1 + (k/n)^2}$.
Lire f :: $f(x) = \frac{1 + x}{1 + x^2}$, continue sur $[0, 1]$.
Intégrer :: $\int_0^1 \frac{1 + x}{1 + x^2}dx = \frac\pi4 + \frac{\ln 2}{2}$.
Conclure :: $r_n \to \frac\pi4 + \frac{\ln 2}{2}$.
```

> [!retenir] Somme de $n$ termes avec $\frac kn$ dedans et un $\frac1n$ à faire sortir : pense Riemann.

## S'exercer

```exercice Primitives et Riemann
? Primitive de $\frac{x^3}{1 + x^4}$.
= $\frac14 \cdot \frac{4x^3}{1 + x^4}$ : $\frac14\ln(1 + x^4)$.

? Primitive de $\frac{1}{\arccos(x)\sqrt{1 - x^2}}$ sur $]-1, 1[$.
indice: $\arccos'(x) = -\frac{1}{\sqrt{1-x^2}}$.
= C'est $-\frac{u'}{u}$ avec $u = \arccos x > 0$ : primitive $-\ln(\arccos x)$.

? Limite de $t_n = \sum_{k=1}^n \frac{k}{n^2}\sin\frac{k\pi}{n}$.
= $t_n = \frac1n\sum \frac kn\sin\left(\pi\frac kn\right) \to \int_0^1 x\sin(\pi x)dx = \frac1\pi$ (par parties).
reponse: 0.318 ~0.002
```

## Flashcards

```cartes
Primitive de $u'u^n$ :: $\frac{u^{n+1}}{n+1}$ ($n \ne -1$).
Primitive de $\frac{u'}{u}$ :: $\ln|u|$.
Primitive de $\frac{u'}{1+u^2}$ :: $\arctan u$.
Primitive de $\frac{1}{x^2 + a^2}$ :: $\frac1a\arctan\frac xa$.
Primitive de $\tan^2 x$ :: $\tan x - x$ (car $\tan^2 = (1 + \tan^2) - 1$).
Théorème fondamental :: $\int_a^b f = F(b) - F(a)$.
Somme de Riemann :: $\frac1n\sum_{k=1}^n f(\frac kn) \to \int_0^1 f$.
Encadrement par monotonie :: $f$ décroissante : $f(n+1) \le \int_n^{n+1} f \le f(n)$.
```

## QCM du chapitre

```qcm
? Une primitive de $\frac{2x}{1 + x^2}$ :
+ $\ln(1 + x^2)$
- $\arctan(x^2)$
- $\frac{1}{1 + x^2}$
= Forme $\frac{u'}{u}$.

? Une primitive de $\frac{1}{1 + x^2}$ :
- $\ln(1 + x^2)$
+ $\arctan x$
- $\frac{1}{x}$
= Dérivée usuelle.

? Une primitive de $\sin x \cos^5 x$ :
+ $-\frac{\cos^6 x}{6}$
- $\frac{\cos^6 x}{6}$
- $\frac{\sin^6 x}{6}$
= $u = \cos x$, $u' = -\sin x$.

? Une primitive de $\tan^2 x$ :
+ $\tan x - x$
- $\frac{\tan^3 x}{3}$
- $\ln|\cos x|$
= $\tan^2 = \tan' - 1$.

? $\frac1n\sum_{k=1}^n \frac kn$ tend vers :
+ $\frac12$
- 1
- 0
= $\int_0^1 x\,dx$.

? Si $f \le g$ sur $[a, b]$ avec $a < b$ :
+ $\int_a^b f \le \int_a^b g$
- $\int_a^b f \ge \int_a^b g$
- rien
= Croissance de l'intégrale.

? $\int_0^1 \frac{dx}{1 + x^2}$ :
+ $\frac\pi4$
- $\ln 2$
- 1
= $\arctan 1$.

? Une primitive de $\frac{1}{x^2 + 9}$ :
- $\arctan\frac x3$
+ $\frac13\arctan\frac x3$
- $\frac19\arctan x$
= Formule avec $a = 3$.

? Chasles : $\int_a^b f + \int_b^c f = $ :
+ $\int_a^c f$
- $\int_b^a f$
- $\int_a^b f \cdot \int_b^c f$
= Additivité.

? La limite de $\sum_{k=1}^n \frac{n+k}{n^2+k^2}$ :
+ $\frac\pi4 + \frac{\ln 2}{2}$
- $\frac\pi4$
- $\ln 2$
= Riemann avec $f(x) = \frac{1+x}{1+x^2}$.
```

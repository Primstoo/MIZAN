---
id: techniques-integration
titre: Techniques de calcul : parties, changement de variable, fractions rationnelles
seance: Chapitre 7 · Intégrale simple (techniques)
importance: 5
---

## Avant de commencer

Il faut les primitives usuelles (chapitre 6) et savoir décomposer une fraction simple comme $\frac{1}{x(x+1)} = \frac1x - \frac{1}{x+1}$.

```exercice Vérifie ton prérequis
? Décompose $\frac{1}{x^2 - 1}$.
= $x^2 - 1 = (x-1)(x+1)$, et $\frac{1}{x^2-1} = \frac12\left(\frac{1}{x-1} - \frac{1}{x+1}\right)$.
```

## Comment aborder ce chapitre

> [!astuce] **Trois outils, une question : qu'est-ce qui me gêne ?** Un produit de deux fonctions de familles différentes : parties. Une fonction cachée dans une autre : changement de variable. Une fraction de polynômes : décomposition.

> [!piege] En changement de variable, oublier de changer **les bornes** et le $dx$. Avec $u = \sin x$ sur $[0, \frac\pi2]$ : $du = \cos x\,dx$ et les bornes deviennent 0 et 1.

À la fin, tu sais choisir et mener chacune des trois techniques, et étudier une suite d'intégrales.

## Idée 1 · Intégration par parties

$\int_a^b u'v = [uv]_a^b - \int_a^b uv'$. On dérive ce qui se simplifie ($x^n$, $\ln$, $\arctan$) et on primitive le reste.

```etapes Une IPP
Choisir v (à dériver) :: $J_4 = \int_0^1 \arctan x\,dx$ : $v = \arctan x$, $u' = 1$.
Calculer u et v' :: $u = x$, $v' = \frac{1}{1+x^2}$.
Appliquer la formule :: $J_4 = [x\arctan x]_0^1 - \int_0^1 \frac{x}{1+x^2}dx$.
Finir :: $\frac\pi4 - \frac12\ln 2$.
```

**IPP deux fois.** $\int e^x\cos x\,dx$ : deux IPP font revenir l'intégrale de départ. On obtient $\frac{e^x(\cos x + \sin x)}{2}$.

## Idée 2 · Changement de variable

```flux Changer de variable dans une intégrale
poser u = φ(x) -> du = φ'(x) dx -> nouvelles bornes φ(a), φ(b) -> intégrale en u plus simple
```

**Exemple.** $I_1 = \int_0^{\pi/2}\frac{dx}{2 + \cos x}$ avec $t = \tan\frac x2$ : $\cos x = \frac{1 - t^2}{1 + t^2}$, $dx = \frac{2\,dt}{1 + t^2}$, bornes 0 et 1. On obtient $\int_0^1 \frac{2\,dt}{3 + t^2} = \frac{2}{\sqrt3}\arctan\frac{1}{\sqrt3} = \frac{\pi\sqrt3}{9}$.

## Idée 3 · Fractions rationnelles

```grille Éléments simples et leurs primitives
#cols: élément primitive
#rows: 1 2 3
1/(x−a) *ln|x−a|
1/(x−a)ⁿ *−1/((n−1)(x−a)ⁿ⁻¹)
1/(x²+px+q),_Δ<0 *forme_canonique_puis_arctan
```

**Exemple.** $\frac{x + 2}{x^2 - 3x - 4} = \frac{x+2}{(x-4)(x+1)} = \frac{6/5}{x-4} - \frac{1/5}{x+1}$. Primitive : $\frac65\ln|x-4| - \frac15\ln|x+1|$.

**Cas $\Delta < 0$.** $x^2 + x + 1 = \left(x + \frac12\right)^2 + \frac34$, donc $\int_0^1 \frac{dx}{1 + x + x^2} = \frac{2}{\sqrt3}\left[\arctan\frac{2x + 1}{\sqrt3}\right]_0^1 = \frac{\pi\sqrt3}{9}$.

## Idée 4 · Suites d'intégrales

Pour $I_n = \int_0^1 f_n$ : on compare $f_{n+1}$ et $f_n$ (monotonie), on encadre $f_n$ (limite), et une IPP donne souvent une relation de récurrence.

**Exemple.** $I_n = \int_0^1 \frac{x^n}{1 + x + x^2}dx$. Sur $[0, 1]$ : $1 \le 1 + x + x^2 \le 3$, donc $\frac{1}{3(n+1)} \le I_n \le \frac{1}{n+1}$ et $I_n \to 0$.

> [!retenir] IPP : dérive le terme qui se simplifie. Changement de variable : change $dx$ et les bornes. Fraction : décompose d'abord.

## S'exercer

```exercice Techniques
? Calcule $J_3 = \int_1^e x^2\ln x\,dx$.
= IPP avec $v = \ln x$, $u' = x^2$ : $\left[\frac{x^3}{3}\ln x\right]_1^e - \int_1^e \frac{x^2}{3}dx = \frac{e^3}{3} - \frac{e^3 - 1}{9} = \frac{2e^3 + 1}{9}$.

? Montre que $\int_{\pi/6}^{\pi/3}\frac{dx}{\cos x\sin x} = \ln 3$.
indice: $\frac{1}{\cos x\sin x} = \frac{1}{\cos^2 x\tan x}$.
= C'est $\frac{u'}{u}$ avec $u = \tan x$ : primitive $\ln|\tan x|$. $\ln\sqrt3 - \ln\frac{1}{\sqrt3} = \ln 3$.

? Calcule $\int_0^1 \frac{dx}{(1+x^2)^2}$.
indice: Pose $x = \tan t$.
= $dx = (1 + \tan^2 t)dt$ : $\int_0^{\pi/4}\cos^2 t\,dt = \left[\frac t2 + \frac{\sin 2t}{4}\right]_0^{\pi/4} = \frac\pi8 + \frac14$.
```

## Flashcards

```cartes
Formule d'IPP :: $\int_a^b u'v = [uv]_a^b - \int_a^b uv'$.
Que dériver dans une IPP ? :: Ce qui se simplifie : $x^n$, $\ln x$, $\arctan x$.
$\int e^x\cos x\,dx$ :: $\frac{e^x(\cos x + \sin x)}{2}$, par deux IPP.
Changement de variable :: Changer $dx$ ET les bornes.
$t = \tan\frac x2$ :: $\cos x = \frac{1-t^2}{1+t^2}$, $\sin x = \frac{2t}{1+t^2}$, $dx = \frac{2dt}{1+t^2}$.
Trinôme avec $\Delta < 0$ :: Forme canonique, puis $\arctan$.
$\int_0^1 \arctan x\,dx$ :: $\frac\pi4 - \frac{\ln 2}{2}$.
Limite d'une suite d'intégrales :: Encadrer l'intégrande, puis intégrer l'encadrement.
```

## QCM du chapitre

```qcm
? Pour $\int x\sin x\,dx$, on dérive :
+ $x$
- $\sin x$
- les deux
= $x' = 1$ simplifie.

? $\int x\sin x\,dx = $ :
+ $\sin x - x\cos x + C$
- $x\cos x + C$
- $-x\cos x + C$
= IPP : $-x\cos x + \int\cos x$.

? Avec $u = \sin x$, $dx$ devient :
+ $\frac{du}{\cos x}$
- $du$
- $\cos x\,du$
= $du = \cos x\,dx$.

? Avec $t = \tan\frac x2$, $\cos x$ vaut :
+ $\frac{1 - t^2}{1 + t^2}$
- $\frac{2t}{1 + t^2}$
- $\frac{1}{1 + t^2}$
= Formule de l'angle moitié.

? $\frac{1}{x(x+1)} = $ :
+ $\frac1x - \frac{1}{x+1}$
- $\frac1x + \frac{1}{x+1}$
- $\frac{1}{x+1} - \frac1x$
= Réduire au même dénominateur pour vérifier.

? $\int_0^1 \frac{dx}{1 + x + x^2}$ :
+ $\frac{\pi\sqrt3}{9}$
- $\ln 3$
- $\frac\pi4$
= Forme canonique.

? $\int_1^e \ln x\,dx$ :
+ 1
- $e$
- 0
= $[x\ln x - x]_1^e = 0 - (-1)$.

? Si $0 \le I_n \le \frac{1}{n+1}$ :
+ $I_n \to 0$
- $I_n \to 1$
- on ne peut rien dire
= Gendarmes.

? Une IPP sur $\int x^n\ln x$ fait apparaître :
+ $\int \frac{x^n}{n+1}dx$
- $\int x^{n-1}\ln x$
- $\int \ln^2 x$
= On dérive $\ln x$.

? $\frac{x+2}{(x-4)(x+1)}$ : coefficient de $\frac{1}{x-4}$ :
+ $\frac65$
- $\frac15$
- 2
= Multiplier par $x - 4$ et faire $x = 4$.
```

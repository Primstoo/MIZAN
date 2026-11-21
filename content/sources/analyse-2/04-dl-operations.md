---
id: dl-operations
titre: Opérations sur les DL
seance: Chapitre 4 · Développements limités (suite)
importance: 5
---

## Avant de commencer

Il faut les DL usuels du chapitre 3 et savoir développer un produit de polynômes en ne gardant que les petits degrés.

```exercice Vérifie ton prérequis
? Dans $(1 + x + x^2)(1 - x + x^2)$, quel est le coefficient de $x^2$ ?
= $1 \cdot x^2 + x \cdot (-x) + x^2 \cdot 1 = x^2 - x^2 + x^2$ : coefficient 1.
reponse: 1
```

## Comment aborder ce chapitre

> [!astuce] **Calcule comme avec des polynômes, et jette tout ce qui dépasse l'ordre visé.** Un DL faux vient presque toujours d'un terme oublié ou d'un terme gardé à tort.

> [!piege] Dans un produit, l'ordre utile dépend du **premier terme** de l'autre facteur. Pour $\cos x \ln(1+x)$ à l'ordre 4, comme $\ln(1+x)$ commence par $x$, il suffit de $\cos$ à l'ordre 3 ; mais pour un quotient par $\sin x$ (qui commence par $x$), il faut monter d'un cran.

À la fin, tu sais faire somme, produit, composée, quotient, et intégrer un DL.

## Idée 1 · Somme et produit

Somme : on additionne les parties régulières. Produit : on multiplie et on tronque.

**Exemple.** $\sin x \cos(2x)$ à l'ordre 6 :
$\left(x - \frac{x^3}{6} + \frac{x^5}{120}\right)\left(1 - 2x^2 + \frac{2x^4}{3}\right) = x - \frac{13}{6}x^3 + \frac{121}{120}x^5 + o(x^6)$.
Le $o(x^6)$ vient de l'imparité : le terme en $x^6$ est nul.

## Idée 2 · Composée

```flux Composer deux DL
u(x) tend vers 0 -> DL de u à l'ordre n -> remplacer dans le DL de g(u) -> tronquer à l'ordre n
```

On a besoin que $u(x) \to 0$. **Exemple.** $e^{\sin x}$ à l'ordre 4 : $u = \sin x = x - \frac{x^3}{6}$, puis
$e^u = 1 + u + \frac{u^2}{2} + \frac{u^3}{6} + \frac{u^4}{24}$. On obtient $e^{\sin x} = 1 + x + \frac{x^2}{2} - \frac{x^4}{8} + o(x^4)$.

**Puissance variable.** $f^g = e^{g \ln f}$. Ainsi $(\cos x)^{\sin x} = e^{\sin x \ln \cos x} = 1 - \frac{x^3}{2} + o(x^5)$.

## Idée 3 · Quotient

```etapes Développer 1/(1 + u)
Mettre sous la forme 1/(1+u) :: $\frac{1}{1 + x + x^2}$ : $u = x + x^2 \to 0$.
Utiliser 1/(1+u) :: $1 - u + u^2 - u^3 + u^4 + o(u^4)$.
Développer chaque puissance de u :: Ne garder que les termes de degré $\le 4$.
Rassembler :: $1 - x + x^3 - x^4 + o(x^4)$.
```

**Tangente.** $\tan x = \frac{\sin x}{\cos x}$ : $\sin x \cdot \frac{1}{\cos x}$ avec $\frac{1}{\cos x} = 1 + \frac{x^2}{2} + \frac{5x^4}{24}$. Résultat : $\tan x = x + \frac{x^3}{3} + \frac{2x^5}{15} + o(x^6)$.

**Si le dénominateur s'annule en 0** (comme $\sin x$), factorise $x$ en haut et en bas : $\frac{\ln(1+x)}{\sin x} = \dfrac{1 - \frac x2 + \frac{x^2}{3} - \frac{x^3}{4}}{1 - \frac{x^2}{6}} + o(x^3) = 1 - \frac x2 + \frac{x^2}{2} - \frac{x^3}{3} + o(x^3)$. Le $x$ simplifié fait perdre un ordre : il faut les DL du haut et du bas à l'ordre 4.

## Idée 4 · Intégrer un DL

Si $f'(x) = a_0 + a_1 x + \dots + a_n x^n + o(x^n)$, alors $f(x) = f(0) + a_0 x + \frac{a_1}{2}x^2 + \dots + o(x^{n+1})$. **On n'oublie pas $f(0)$.**

**Exemple.** $f(x) = \arctan(1+x)$ : $f'(x) = \frac{1}{2 + 2x + x^2} = \frac12 - \frac x2 + \frac{x^2}{4} + 0 \cdot x^3 + o(x^3)$. Avec $f(0) = \frac\pi4$ : $f(x) = \frac\pi4 + \frac x2 - \frac{x^2}{4} + \frac{x^3}{12} + o(x^4)$.

> [!retenir] Primitiver un DL fait gagner un ordre ; dériver un DL n'est permis que si l'on sait que $f'$ a un DL.

## S'exercer

```exercice Opérations
? DL à l'ordre 4 de $(\ln(1+x))^2$.
= $\ln(1+x) = x\left(1 - \frac x2 + \frac{x^2}{3}\right) + o(x^3)$, donc le carré vaut $x^2\left(1 - x + \frac{11}{12}x^2\right) + o(x^4) = x^2 - x^3 + \frac{11}{12}x^4 + o(x^4)$.

? DL à l'ordre 4 de $\cos x \ln(1+x)$.
= $\left(1 - \frac{x^2}{2}\right)\left(x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4}\right)$ tronqué : $x - \frac{x^2}{2} - \frac{x^3}{6} + 0 \cdot x^4 + o(x^4)$.

? DL à l'ordre 4 de $\ln\frac{\sin x}{x}$.
= $\frac{\sin x}{x} = 1 + u$ avec $u = -\frac{x^2}{6} + \frac{x^4}{120}$. $\ln(1+u) = u - \frac{u^2}{2} = -\frac{x^2}{6} + \frac{x^4}{120} - \frac{x^4}{72} = -\frac{x^2}{6} - \frac{x^4}{180} + o(x^4)$.
```

## Flashcards

```cartes
DL d'un produit :: Multiplier les parties régulières et tronquer à l'ordre voulu.
Composée $g(u(x))$ :: Possible si $u(x) \to 0$ ; remplacer $u$ dans le DL de $g$.
$f^g$ :: S'écrit $e^{g \ln f}$.
Quotient :: Se ramener à $\frac{1}{1+u}$ avec $u \to 0$.
DL de $\tan x$ à l'ordre 5 :: $x + \frac{x^3}{3} + \frac{2x^5}{15} + o(x^5)$.
DL de $e^{\sin x}$ à l'ordre 4 :: $1 + x + \frac{x^2}{2} - \frac{x^4}{8} + o(x^4)$.
Primitiver un DL :: On gagne un ordre et on ajoute $f(0)$.
Dénominateur nul en 0 :: Factoriser par $x$ haut et bas, et monter d'un ordre.
```

## QCM du chapitre

```qcm
? Pour composer $g(u(x))$ en 0, il faut :
+ $u(x) \to 0$
- $u(x) \to 1$
- $g$ polynomiale
= On utilise le DL de $g$ en 0.

? Le terme en $x^3$ de $\tan x$ :
+ $\frac{x^3}{3}$
- $-\frac{x^3}{3}$
- $\frac{x^3}{6}$
= $\tan x = x + \frac{x^3}{3} + \dots$

? $(\cos x)^{\sin x}$ se réécrit :
- $\cos(x \sin x)$
+ $e^{\sin x \ln(\cos x)}$
- $\sin x \cdot \ln(\cos x)$
= $a^b = e^{b \ln a}$.

? Si $f' = 1 - x + o(x)$ et $f(0) = 2$ :
+ $f = 2 + x - \frac{x^2}{2} + o(x^2)$
- $f = 1 - x + o(x)$
- $f = x - \frac{x^2}{2} + o(x^2)$
= Primitiver, ajouter $f(0)$.

? $\frac{1}{1 + x + x^2}$ à l'ordre 2 :
+ $1 - x + o(x^2)$
- $1 - x - x^2 + o(x^2)$
- $1 + x + o(x^2)$
= $1 - u + u^2$ avec $u = x + x^2$ : $1 - x - x^2 + x^2$.

? Le coefficient de $x^2$ de $e^{\sin x}$ :
+ $\frac12$
- 0
- 1
= $\frac{u^2}{2}$ avec $u \approx x$.

? Produit d'un DL d'ordre 3 par une fonction en $x + o(x)$ : on obtient un DL d'ordre :
- 3
+ 4
- 2
= Le facteur $x$ fait gagner un ordre.

? $\sin x \cos 2x$ est :
+ impaire, son DL n'a que des puissances impaires
- paire
- ni paire ni impaire
= Impaire fois paire.

? Le terme en $x^3$ de $(\ln(1+x))^2$ :
+ $-x^3$
- $x^3$
- $-\frac{x^3}{2}$
= $2 \cdot x \cdot \left(-\frac{x^2}{2}\right)$.

? Dériver un DL est permis :
- toujours
+ si l'on sait déjà que $f'$ admet un DL
- jamais
= Seule la primitivation est automatique.
```

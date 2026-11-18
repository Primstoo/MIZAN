---
id: point-fixe
titre: Méthode du point fixe (approximations successives)
seance: Chapitre 2 (2/3) · Résolution numérique des équations
importance: 5
---

## Avant de commencer

Il te faut savoir dériver et majorer $|g'(x)|$ sur un intervalle, et connaître le théorème des accroissements finis : $|g(x) - g(y)| = |g'(c)|\,|x - y|$.

```exercice Vérifie ton prérequis
? Majore $|g'(x)|$ pour $g(x) = e^{-x}$ sur $[0.5, \ln 2]$.
indice: $g'(x) = -e^{-x}$ ; $e^{-x}$ décroît.
= $|g'(x)| = e^{-x} \le e^{-0.5} \approx 0.607 < 1$ sur cet intervalle.
```

## Comment aborder ce chapitre

> [!astuce] **Tout se joue sur le choix de $g$.** La même équation $f(x) = 0$ peut s'écrire $x = g(x)$ de plusieurs façons : certaines convergent, d'autres divergent. Ton travail est de choisir $g$ et l'intervalle.

> [!piege] Vérifier seulement $|g'| < 1$ en un point. Le théorème demande **deux** conditions sur tout l'intervalle $I$ : $g(I) \subset I$ (stabilité) **et** $\sup_I |g'| = k < 1$ (contraction).

À la fin, tu sais transformer une équation en $x = g(x)$, prouver la convergence, calculer les itérés et donner l'ordre de convergence.

## Idée 1 · Le principe : $x_{n+1} = g(x_n)$

Un point fixe de $g$ est un $r$ tel que $g(r) = r$. On transforme $f(x) = 0$ en $x = g(x)$, puis on itère.

```html
<svg viewBox="0 0 320 220" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Escalier entre la courbe y = g(x) et la droite y = x qui converge vers le point fixe">
<line x1="30" y1="200" x2="310" y2="200" stroke="currentColor"/><line x1="30" y1="200" x2="30" y2="10" stroke="currentColor"/>
<line x1="30" y1="200" x2="220" y2="10" stroke="currentColor" stroke-dasharray="5 4"/>
<path d="M30 110 C 100 90, 180 70, 300 55" fill="none" stroke="#D9824F" stroke-width="3"/>
<path d="M270 200 L270 60 L60 60 L60 104 L104 104 L104 93 L93 93" fill="none" stroke="currentColor" stroke-width="1.5"/>
<g font-family="sans-serif" font-size="12" fill="currentColor"><text x="272" y="214">x0</text><text x="226" y="18">y = x</text><text x="250" y="48" fill="#D9824F">y = g(x)</text><circle cx="97" cy="97" r="4" fill="#D9824F"/><text x="108" y="130">r</text></g>
</svg>
```

## Idée 2 · Le théorème du point fixe

> [!retenir] Si $g(I) \subset I$ (avec $I = [a,b]$) et s'il existe $k < 1$ tel que $|g'(x)| \le k$ sur $I$, alors $g$ est **contractante** : $|g(x) - g(y)| \le k|x - y|$. Elle a un unique point fixe $r$ dans $I$, et pour tout $x_0 \in I$ : $|x_n - r| \le k^n |x_0 - r| \le k^n (b-a)$.

```grille Que dit |g'(r)| ?
#cols: Cas Comportement
*|g'(r)| < 1 convergence (locale), linéaire en général
|g'(r)| = 1 cas douteux : lent ou oscillations
!|g'(r)| > 1 divergence
```

> [!attention] La fiche « Things you'll need » écrit « $|F'(x)| < 1 \Rightarrow$ contractante ». Il faut en fait une **borne uniforme** : $\sup_I |F'| = k < 1$ sur un intervalle fermé (sinon $k$ peut valoir 1).

Exemples du cours avec $x^2 - 2x - 3 = 0$ (racines $-1$ et $3$) :

- $g(x) = \sqrt{2x+3}$ : $g'(3) = 1/3 < 1$, convergence vers 3.
- $g(x) = (x^2 - 3)/2$ : $g'(3) = 3$, divergence autour de 3 ; $g'(-1) = -1$, cas limite, convergence très lente vers $-1$.

```python
import math
x = 4.0
for n in range(1, 6):
    x = math.sqrt(2*x + 3)
    print(n, round(x, 5))
y = 0.0
for n in range(1, 2001):
    y = (y*y - 3) / 2
print("g2 après 2000 itérations :", round(y, 4))
```

```sortie
1 3.31662
2 3.10375
3 3.03439
4 3.01144
5 3.00381
g2 après 2000 itérations : -0.9682
```

## Idée 3 · Exemple complet : $x = e^{-x}$ (série 2, ex. 3)

```etapes Méthode type d'examen
Existence/unicité :: $f(x) = x - e^{-x}$, $f' = 1 + e^{-x} > 0$, $f(0) = -1 < 0$, $f(1) \approx 0.63 > 0$ : racine unique $\alpha \in ]0,1[$.
Pas contractante sur [0,1] :: $|F'(0)| = e^0 = 1$ : pas de $k < 1$.
Réduire l'intervalle :: $f(1/2) < 0$ et $f(\ln 2) = \ln 2 - 1/2 > 0$, donc $\alpha \in [1/2, \ln 2]$.
Contraction :: Sur $[1/2, \ln 2]$, $|F'(x)| \le e^{-1/2} \approx 0.607 = k < 1$.
Stabilité :: $F$ décroissante : $F([1/2, \ln 2]) = [1/2, e^{-1/2}] \subset [1/2, \ln 2]$ car $e^{-0.5} \approx 0.607 < 0.693$.
Conclure :: Pour tout $x_0 \in [1/2, \ln 2]$, $x_{n+1} = e^{-x_n}$ converge vers $\alpha$.
```

```python
import math
x = 0.5
for n in range(1, 5):
    x = math.exp(-x)
    print(f"x{n} = {x:.6f}")
for n in range(5, 40):
    x = math.exp(-x)
print("alpha ≈", round(x, 6))
```

```sortie
x1 = 0.606531
x2 = 0.545239
x3 = 0.579703
x4 = 0.560065
alpha ≈ 0.567143
```

## Idée 4 · Ordre de convergence

La méthode est d'ordre $p$ si $\lim \dfrac{|x_{n+1} - r|}{|x_n - r|^p} = C \neq 0$.

Pour le point fixe : $x_{n+1} - r = g(x_n) - g(r) \approx g'(r)(x_n - r)$. Donc **ordre 1** si $g'(r) \neq 0$, avec $C = |g'(r)|$ ; ordre $\ge 2$ si $g'(r) = 0$ (c'est le cas de Newton).

```python
import math
r = 0.5671432904097838
x = 0.5
for n in range(6):
    xn = math.exp(-x)
    print(n, round(abs(xn - r) / abs(x - r), 4))
    x = xn
print("|g'(r)| =", round(math.exp(-r), 4))
```

```sortie
0 0.5866
1 0.5561
2 0.5734
3 0.5636
4 0.5692
5 0.566
|g'(r)| = 0.5671
```

Le rapport des erreurs tend vers $|g'(\alpha)| = \alpha \approx 0.567$ : convergence linéaire.

## S'exercer

```exercice Exercices de la série 2
? Ex. 5 : $g(x) = \ln(1+x) + 0.2$. Montre que $x_{n+1} = g(x_n)$ converge sur $[0.1, 5]$.
indice: $g'(x) = 1/(1+x)$.
= Sur $[0.1, 5]$ : $|g'(x)| \le 1/1.1 \approx 0.909 < 1$. $g$ croissante, $g(0.1) \approx 0.295$, $g(5) \approx 1.992$ : $g([0.1,5]) \subset [0.1,5]$. Donc convergence vers l'unique point fixe $r \approx 0.77225$ (constante $k \approx 0.909$, mais près de $r$ le rapport des erreurs vaut $g'(r) \approx 0.56$).

> [!attention] L'énoncé demande $x_n = 0.77228$. Le calcul (Python) donne un point fixe $0.772250$ : avec $x_0 = 4$, on a $x_n = 0.77225$ à $10^{-5}$ près dès $n = 22$. La valeur $0.77228$ de l'énoncé est probablement une coquille.

? Ex. 7 : $g(x) = xe^{-x} + 1$, $x_0 = 1.5$. Calcule $x_1$ à $10^{-3}$ près.
reponse: 1.335 ~0.001
= $x_1 = 1.5\,e^{-1.5} + 1 \approx 1.335$. Puis $x_2 \approx 1.351$, $x_3 \approx 1.350$, $x_4 \approx 1.350$ : $\alpha \approx 1.349$.

? Ex. 8 : pour $x^3 - x - 1 = 0$ ($\alpha \approx 1.3247$), lequel de $F(x) = x^3 - 1$, $H(x) = (x+1)^{1/3}$ converge ?
= $F'(\alpha) = 3\alpha^2 \approx 5.3 > 1$ : diverge. $H'(\alpha) = \frac{1}{3}(\alpha+1)^{-2/3} \approx 0.19 < 1$ : converge.
```

## Flashcards

```cartes
Point fixe de g :: Un réel $r$ tel que $g(r) = r$.
Deux hypothèses du théorème du point fixe :: $g(I) \subset I$ et $\sup_I |g'| = k < 1$.
Majoration de l'erreur :: $|x_n - r| \le k^n|x_0 - r|$.
|g'(r)| > 1 :: Divergence : l'itération s'éloigne de $r$.
Ordre du point fixe si g'(r) ≠ 0 :: 1 (linéaire), constante $|g'(r)|$.
Définition de l'ordre p :: $\lim |x_{n+1} - r| / |x_n - r|^p = C \neq 0$.
Pourquoi e^{-x} n'est pas contractante sur [0,1] :: $|g'(0)| = 1$ : aucune constante $k < 1$.
```

## QCM du chapitre

```qcm
? Un point fixe de $g$ vérifie :
- $g(r) = 0$
+ $g(r) = r$
- $g'(r) = 0$
= Par définition.

? Pour $g(x) = \sqrt{2x+3}$, $g'(3)$ vaut :
+ $1/3$
- $3$
- $1$
= $g'(x) = 1/\sqrt{2x+3}$, et $\sqrt 9 = 3$.

? Avec $g(x) = (x^2-3)/2$ près de $r = 3$ :
- convergence rapide
+ divergence car $|g'(3)| = 3 > 1$
- convergence lente
= $g'(x) = x$.

? Le théorème du point fixe demande :
- seulement $|g'(r)| < 1$
+ $g(I) \subset I$ et $|g'| \le k < 1$ sur $I$
- $g$ croissante
= Stabilité de l'intervalle et contraction uniforme.

? $e^{-x}$ est contractante sur :
- $[0, 1]$
+ $[1/2, \ln 2]$
- $[-1, 0]$
= Sur $[0,1]$, $|g'(0)| = 1$.

? En général, le point fixe converge à l'ordre :
+ 1
- 2
- 3
= Ordre 1 sauf si $g'(r) = 0$.

? Si $|g'| \le 0.5$ sur $I$ et $|x_0 - r| \le 1$, alors $|x_{10} - r| \le$ :
- $0.05$
+ $0.5^{10} \approx 10^{-3}$
- $10^{-10}$
= $k^n|x_0 - r|$.

? Pour $x^3 - x - 1 = 0$, quelle écriture converge près de $1.32$ ?
- $x = x^3 - 1$
+ $x = (x+1)^{1/3}$
- $x = 1/(x^2 - 1)$
= $|H'(\alpha)| \approx 0.19 < 1$ ; les deux autres ont $|g'(\alpha)| > 1$.

? Le rapport $|x_{n+1} - r|/|x_n - r|$ tend vers :
- 0
+ $|g'(r)|$
- 1
= Développement de Taylor à l'ordre 1.

? Le point fixe d'ordre 2 apparaît quand :
+ $g'(r) = 0$
- $g'(r) = 1$
- $g(r) = 0$
= Le terme d'ordre 1 disparaît : c'est le cas de Newton.
```

---
id: newton-secante
titre: Méthodes de Newton-Raphson et de la sécante
seance: Chapitre 2 (3/3) · Résolution numérique des équations
importance: 5
---

## Avant de commencer

Il te faut l'équation de la tangente : en $x_n$, la tangente à $y = f(x)$ est $y = f(x_n) + f'(x_n)(x - x_n)$.

```exercice Vérifie ton prérequis
? Où la tangente à $f(x) = x^2 - 2$ en $x_0 = 2$ coupe-t-elle l'axe des abscisses ?
reponse: 1.5
= Tangente : $y = 2 + 4(x - 2)$. $y = 0$ donne $x = 2 - 2/4 = 1.5$. C'est déjà le premier pas de Newton.
```

## Comment aborder ce chapitre

> [!astuce] **Newton = remplacer la courbe par sa tangente.** La sécante fait la même chose avec une droite passant par deux points : pas besoin de dérivée.

> [!piege] Lancer Newton loin de la racine, ou là où $f'$ s'annule. La méthode peut alors diverger ou osciller. Et pour une **racine double**, elle n'est plus quadratique mais linéaire.

À la fin, tu sais écrire et appliquer Newton et la sécante, expliquer leurs ordres (2 et 1.618) et les comparer à la dichotomie.

## Idée 1 · La formule de Newton

```html
<svg viewBox="0 0 340 200" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="La tangente en x0 coupe l'axe en x1, plus proche de la racine r">
<line x1="20" y1="160" x2="330" y2="160" stroke="currentColor"/>
<path d="M40 185 C 120 175, 200 140, 300 20" fill="none" stroke="#D9824F" stroke-width="3"/>
<line x1="300" y1="20" x2="180" y2="190" stroke="currentColor" stroke-dasharray="5 4"/>
<line x1="300" y1="20" x2="300" y2="160" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
<g font-family="sans-serif" font-size="12" fill="currentColor"><text x="294" y="176">x0</text><text x="190" y="176">x1</text><circle cx="201" cy="160" r="4" fill="currentColor"/><circle cx="170" cy="160" r="4" fill="#D9824F"/><text x="160" y="150">r</text><text x="232" y="60">tangente</text></g>
</svg>
```

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

C'est un point fixe avec $g(x) = x - f(x)/f'(x)$. Comme $g'(r) = \dfrac{f(r)f''(r)}{f'(r)^2} = 0$ pour une racine simple, la convergence est **quadratique** : le nombre de bons chiffres double à chaque pas.

```etapes Newton pour √N (série 2, ex. 4)
Équation :: $\sqrt N$ est racine de $f(x) = x^2 - N$, $f'(x) = 2x$.
Formule :: $x_{n+1} = x_n - \dfrac{x_n^2 - N}{2x_n} = \dfrac{1}{2}\left(x_n + \dfrac{N}{x_n}\right)$.
Application N = 2, x0 = 2 :: $x_1 = 1.5$, $x_2 = 1.41667$, $x_3 = 1.414216$, $x_4 = 1.41421356$.
```

```python
import math
def newton(f, df, x, n):
    for k in range(1, n + 1):
        x = x - f(x) / df(x)
        print(k, f"{x:.10f}")
    return x

newton(lambda x: x*x - 2, lambda x: 2*x, 2.0, 4)
print("calculatrice :", f"{math.sqrt(2):.10f}")
```

```sortie
1 1.5000000000
2 1.4166666667
3 1.4142156863
4 1.4142135624
calculatrice : 1.4142135624
```

## Idée 2 · Vérifier l'ordre 2 sur $\cos x - x$

Exemple du prof : $x_0 = 1$, $r \approx 0.7390851$.

```python
import math
r = 0.7390851332151607
x = 1.0
for k in range(1, 5):
    x = x - (math.cos(x) - x) / (-math.sin(x) - 1)
    print(k, f"{x:.8f}", f"erreur = {abs(x - r):.1e}")
```

```sortie
1 0.75036387 erreur = 1.1e-02
2 0.73911289 erreur = 2.8e-05
3 0.73908513 erreur = 1.7e-10
4 0.73908513 erreur = 0.0e+00
```

L'erreur passe de $10^{-2}$ à $10^{-5}$ puis $10^{-10}$ : elle est à peu près élevée au carré.

> [!attention] La diapo donne $|x_2 - r| \approx 5\times10^{-4}$ et $|x_3 - r| \approx 2\times10^{-7}$. Le calcul exact donne des erreurs plus petites (environ $2.8\times10^{-5}$ et $1.7\times10^{-10}$, ci-dessus). La conclusion (ordre 2) reste juste.

## Idée 3 · Les limites de Newton

- Si $f'(x_n) = 0$, la formule n'existe pas.
- Mauvais $x_0$ : divergence ou oscillations.
- **Racine multiple** : convergence seulement linéaire. Avec $f(x) = (x-1)^2$ : $x_{n+1} = \frac{x_n + 1}{2}$, l'erreur est juste divisée par 2.

Remède vu en série 2 (ex. 9) : pour une racine double, on applique Newton à $g = \sqrt{|f|}$, qui a une racine **simple**. Cela revient à $x_{n+1} = x_n - 2\dfrac{f(x_n)}{f'(x_n)}$.

```python
f = lambda x: 4*x**3 - 3*x + 1        # racine double 1/2
df = lambda x: 12*x**2 - 3
x, y = 0.25, 0.25
for k in range(1, 5):
    x = x - f(x) / df(x)              # Newton classique
    y = y - 2 * f(y) / df(y)          # schéma de l'ex. 9
    print(k, f"{x:.6f}", f"{y:.6f}")
```

```sortie
1 0.388889 0.527778
2 0.446759 0.500250
3 0.473879 0.500000
4 0.487056 0.500000
```

## Idée 4 · La sécante : Newton sans dérivée

On remplace $f'(x_n)$ par la pente entre les deux derniers points :

$$x_{n+1} = x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$

Il faut **deux** points de départ. Ordre $p = \frac{1+\sqrt5}{2} \approx 1.618$ (superlinéaire).

```python
def secante(f, x0, x1, n):
    for k in range(2, n + 2):
        x0, x1 = x1, x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0))
        print(f"x{k} = {x1:.6f}")

f = lambda x: x**3 - 2*x - 5
secante(f, 2.0, 3.0, 5)
```

```sortie
x2 = 2.058824
x3 = 2.081264
x4 = 2.094824
x5 = 2.094549
x6 = 2.094551
```

> [!attention] La diapo donne $x_3 \approx 2.09$ pour cet exemple. Le calcul donne $x_3 \approx 2.0813$ ; $x_4 \approx 2.0948$ et la racine $2.09455$ sont justes.

## Idée 5 · Comparer les quatre méthodes

| Méthode | Ordre | Avantage | Inconvénient |
|---|---|---|---|
| Dichotomie | 1 | converge toujours | lente (≈ 20 itérations pour $10^{-6}$) |
| Point fixe | 1 (ou plus si $g'(r) = 0$) | simple | dépend du choix de $g$ |
| Newton | 2 | très rapide (≈ 4 itérations) | besoin de $f'$ et d'un bon $x_0$ |
| Sécante | ≈ 1.618 | pas de dérivée | deux points de départ, un peu plus lente |

> [!prof] Conclusion de la série 2 : dichotomie sûre mais lente, Newton rapide mais exige une bonne approximation initiale, sécante = compromis sans dérivée, point fixe = étude de contractance obligatoire, racines multiples = schéma adapté.

## S'exercer

```exercice Série 2
? Ex. 2 : Newton sur $x^3 - 3x - 1$ à partir de $x_0 = 2$. Donne $x_2$ à $10^{-4}$.
reponse: 1.8795 ~0.0001
= $x_1 = 2 - 1/9 = 1.8889$, $x_2 \approx 1.87945$, puis $x_3 = x_4 = x_5 \approx 1.879385$.

? Ex. 8 : $x^3 + 2x^2 + 10x - 20 = 0$, Newton avec $x_0 = 2$. Calcule $x_1$.
reponse: 1.4667 ~0.0002
= $f(2) = 16$, $f'(x) = 3x^2 + 4x + 10$, $f'(2) = 30$, $x_1 = 2 - 16/30 \approx 1.4667$. Ensuite $x_2 \approx 1.3715$, $x_3 \approx 1.368810$, $x_4 \approx 1.368808$.

? Exam 2022/23 : pour $f(x) = e^x - x - 2$, pour quelle valeur de $x_0$ ne peut-on pas démarrer Newton ?
reponse: 0
= $f'(x) = e^x - 1$ s'annule en $x = 0$ : la tangente est horizontale.
```

## Flashcards

```cartes
Formule de Newton :: $x_{n+1} = x_n - f(x_n)/f'(x_n)$.
Newton pour √N :: $x_{n+1} = \frac12(x_n + N/x_n)$.
Ordre de Newton (racine simple) :: 2 (quadratique).
Newton et racine double :: Ordre 1 seulement ; remède : $x_{n+1} = x_n - 2f(x_n)/f'(x_n)$.
Formule de la sécante :: $x_{n+1} = x_n - f(x_n)\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$.
Ordre de la sécante :: $(1+\sqrt5)/2 \approx 1.618$.
Quand préférer la sécante :: Quand $f'$ est difficile ou coûteuse à calculer.
Interprétation géométrique de Newton :: $x_{n+1}$ = intersection de la tangente en $x_n$ avec l'axe des x.
```

## QCM du chapitre

```qcm
? La formule de Newton est :
- $x_{n+1} = x_n - f'(x_n)/f(x_n)$
+ $x_{n+1} = x_n - f(x_n)/f'(x_n)$
- $x_{n+1} = f(x_n)$
= Intersection de la tangente avec l'axe.

? Newton pour $x^2 - 2$ avec $x_0 = 2$ donne $x_1 =$ :
- 1.25
+ 1.5
- 1.4167
= $\frac12(2 + 2/2) = 1.5$.

? L'ordre de Newton pour une racine simple est :
- 1
+ 2
- 1.618
= Quadratique.

? Pour $f(x) = (x-1)^2$, Newton :
- converge quadratiquement
+ converge linéairement, l'erreur divisée par 2
- diverge
= $x_{n+1} = (x_n + 1)/2$.

? La sécante a besoin de :
+ deux valeurs initiales
- la dérivée $f'$
- un intervalle où $f$ change de signe
= Elle utilise $x_{n-1}$ et $x_n$.

? L'ordre de la sécante vaut environ :
- 1
+ 1.618
- 2
= Nombre d'or $(1+\sqrt5)/2$.

? Newton échoue immédiatement si :
- $f(x_n) = 0$
+ $f'(x_n) = 0$
- $x_n < 0$
= Division par zéro : tangente horizontale.

? Pour $10^{-6}$ sur $x^2 - 2$, Newton demande environ :
+ 4 itérations
- 20 itérations
- 100 itérations
= Contre ≈ 20 pour la dichotomie.

? Newton est un point fixe avec $g(x) = x - f(x)/f'(x)$. Pour une racine simple, $g'(r)$ vaut :
+ 0
- 1
- $f''(r)$
= $g'(r) = f(r)f''(r)/f'(r)^2 = 0$, d'où l'ordre 2.

? Quelle méthode est la plus robuste ?
- Newton
- Sécante
+ Dichotomie
= Elle converge toujours dès que $f(a)f(b) < 0$.
```

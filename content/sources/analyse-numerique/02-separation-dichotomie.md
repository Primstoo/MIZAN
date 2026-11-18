---
id: separation-dichotomie
titre: Équations f(x) = 0 · séparation des racines et dichotomie
seance: Chapitre 2 (1/3) · Résolution numérique des équations
importance: 5
---

## Avant de commencer

Il te faut le **théorème des valeurs intermédiaires** (TVI) et savoir dresser un tableau de variations.

```exercice Vérifie ton prérequis
? $f(x) = x^3 + 2x^2 - 3x - 1$. Calcule $f(1)$ et $f(2)$. Que peux-tu conclure ?
indice: Regarde les signes.
= $f(1) = -1 < 0$ et $f(2) = 9 > 0$. $f$ est continue, donc d'après le TVI il existe une racine dans $]1, 2[$.
```

## Comment aborder ce chapitre

> [!astuce] **Toujours deux volets.** D'abord le volet mathématique : existe-t-il une racine, est-elle unique, où est-elle ? Ensuite seulement le volet numérique : construire une suite $(x_n)$ qui s'en approche.

> [!piege] Appliquer la dichotomie sans avoir vérifié $f(a)f(b) < 0$ et l'unicité. Sans changement de signe, la méthode ne garantit rien ; sans monotonie, tu peux tomber sur une autre racine.

À la fin, tu sais isoler chaque racine dans un intervalle, appliquer la dichotomie et calculer à l'avance le nombre d'itérations.

## Idée 1 · Séparer les racines

```html
<svg viewBox="0 0 360 170" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Une courbe continue négative en a et positive en b coupe l'axe entre a et b">
<line x1="20" y1="100" x2="340" y2="100" stroke="currentColor" stroke-width="1.5"/>
<path d="M60 140 C 140 135, 190 110, 210 95 S 280 30, 310 20" fill="none" stroke="#D9824F" stroke-width="3"/>
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<line x1="60" y1="96" x2="60" y2="104" stroke="currentColor"/><text x="60" y="120">a</text><text x="78" y="155">f(a) &lt; 0</text>
<line x1="310" y1="96" x2="310" y2="104" stroke="currentColor"/><text x="310" y="120">b</text><text x="300" y="14">f(b) &gt; 0</text>
<circle cx="214" cy="100" r="5" fill="currentColor"/><text x="214" y="122">r</text></g>
</svg>
```

> [!retenir] **TVI** : $f$ continue sur $[a,b]$ et $f(a)f(b) < 0$ ⇒ au moins une racine dans $]a,b[$. Si de plus $f$ est **strictement monotone**, la racine est **unique**.

```etapes Séparer les racines de x³ − 3x − 1 = 0 (série 2, ex. 2)
Dériver :: $f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$ : $f$ croît, décroît sur $[-1,1]$, puis croît.
Valeurs clés :: $f(-1) = 1 > 0$, $f(1) = -3 < 0$, $f(-2) = -3$, $f(2) = 1$.
Conclure :: Trois racines, une dans chacun des intervalles $]-2,-1[$, $]-1,1[$ (en fait $]-1,0[$ car $f(0) = -1$), $]1,2[$.
```

## Idée 2 · La dichotomie (bissection)

On coupe l'intervalle en deux et on garde la moitié où $f$ change de signe.

```etapes Algorithme de dichotomie
Départ :: $f(a)f(b) < 0$, une seule racine $r$ dans $[a,b]$.
Milieu :: $c = \dfrac{a+b}{2}$.
Choix :: Si $f(a)f(c) \le 0$, alors $b \leftarrow c$ ; sinon $a \leftarrow c$.
Arrêt :: On recommence tant que $|b - a| > \varepsilon$.
```

```python
def dichotomie(f, a, b, eps):
    n = 0
    while b - a > eps:
        c = (a + b) / 2
        if f(a) * f(c) <= 0:
            b = c
        else:
            a = c
        n += 1
        if n <= 4:
            print(n, c, round(f(c), 4))
    return (a + b) / 2, n

r, n = dichotomie(lambda x: x**2 - 2, 1, 2, 1e-6)
print("racine ≈", round(r, 6), "après", n, "itérations")
```

```sortie
1 1.5 0.25
2 1.25 -0.4375
3 1.375 -0.1094
4 1.4375 0.0664
racine ≈ 1.414214 après 20 itérations
```

Ce sont exactement les itérés du prof : $c_1 = 1.5$, $c_2 = 1.25$, $c_3 = 1.375$, $c_4 = 1.4375$.

## Idée 3 · Combien d'itérations ?

Après $n$ itérations, l'intervalle mesure $\dfrac{b-a}{2^n}$. Pour une précision $\varepsilon$ :

$$n \ge \frac{\ln\left(\frac{b-a}{\varepsilon}\right)}{\ln 2}$$

```python
import math
for (a, b, eps) in [(1, 2, 1e-6), (2, 3, 1e-3), (4.4, 4.5, 1e-3)]:
    n = math.log((b - a) / eps) / math.log(2)
    print(a, b, eps, round(n, 2), "->", math.ceil(n))
```

```sortie
1 2 1e-06 19.93 -> 20
2 3 0.001 9.97 -> 10
4.4 4.5 0.001 6.64 -> 7
```

> [!prof] Le théorème du cours : $|c_n - r| \le \dfrac{b-a}{2^{n+1}}$. La dichotomie **converge toujours** (si $f(a)f(b) < 0$), mais **lentement** : ordre 1, on gagne un bit par itération.

Critères d'arrêt possibles : $|x_{n+1} - x_n| < \varepsilon$ ou $|f(x_n)| < \varepsilon$.

## Idée 4 · Exemple d'examen : tan x = x

Série 2, ex. 1 : $f(x) = \tan x - x$ sur $]\pi/2, 3\pi/2[$. $f'(x) = \tan^2 x \ge 0$ donc $f$ croissante, de $-\infty$ à $+\infty$ : racine unique. $f(4.4) < 0 < f(4.5)$.

```python
import math
f = lambda x: math.tan(x) - x
print(round(f(4.4), 4), round(f(4.5), 4))
a, b = 4.4, 4.5
while b - a > 1e-3:
    c = (a + b) / 2
    a, b = (a, c) if f(a) * f(c) <= 0 else (c, b)
print(round(a, 4), round(b, 4))
```

```sortie
-1.3037 0.1373
4.493 4.4938
```

Donc $\alpha \approx 4.493$ à $10^{-3}$ près (7 itérations).

## S'exercer

```exercice Exercices types
? Nombre minimal d'itérations de dichotomie sur $[1, 2]$ pour $\varepsilon = 10^{-6}$ ?
reponse: 20
= $n \ge \ln(10^6)/\ln 2 \approx 19.93$, donc $n = 20$.

? Montre que $x^4 - 3x^3 - x^2 + 3x = 0$ a trois racines dans $[-1, 2]$ et sépare-les.
indice: Factorise par $x$ puis par $(x^2 - 1)$.
= $f(x) = x(x-1)(x+1)(x-3)$. Racines $-1, 0, 1$ dans $[-1,2]$ ($3$ est hors de l'intervalle). Le signe change sur $[-1,0]$, $[0,1]$, $[1,2]$.

? Approche la plus grande racine de $x^3 - 3x - 1$ à $10^{-2}$ près par dichotomie sur $[1, 2]$.
= 7 itérations ($\ln(100)/\ln 2 \approx 6.64$) : $\alpha \in [1.875, 1.8828]$, soit $\alpha \approx 1.88$ (valeur exacte $1.8794$).
```

## Flashcards

```cartes
TVI :: $f$ continue sur $[a,b]$ et $f(a)f(b) < 0$ ⇒ au moins une racine dans $]a,b[$.
Unicité de la racine :: $f$ strictement monotone sur $[a,b]$.
Règle de choix en dichotomie :: Si $f(a)f(c) \le 0$ on garde $[a,c]$, sinon $[c,b]$.
Longueur après n itérations :: $(b-a)/2^n$.
Nombre d'itérations pour ε :: $n \ge \ln((b-a)/\varepsilon)/\ln 2$.
Ordre de la dichotomie :: 1 (linéaire) : sûre mais lente.
Deux critères d'arrêt :: $|x_{n+1} - x_n| < \varepsilon$ ou $|f(x_n)| < \varepsilon$.
```

## QCM du chapitre

```qcm
? La dichotomie exige au départ :
- $f'(a) \neq 0$
+ $f$ continue et $f(a)f(b) < 0$
- $f$ convexe
= C'est l'hypothèse du TVI.

? Pour garantir l'unicité de la racine dans $[a,b]$, il suffit que :
- $f(a) > 0$
+ $f$ soit strictement monotone sur $[a,b]$
- $f$ soit continue
= Une fonction strictement monotone coupe l'axe au plus une fois.

? Sur $[1,2]$ avec $f(x) = x^2 - 2$, le premier milieu est $c_1 = 1.5$ et $f(1.5) = 0.25$. Le nouvel intervalle est :
+ $[1, 1.5]$
- $[1.5, 2]$
- $[1.25, 1.5]$
= $f(1)f(1.5) < 0$ : la racine est à gauche.

? Après 10 itérations sur un intervalle de longueur 1, la longueur vaut :
- $1/10$
+ $1/1024$
- $1/20$
= $1/2^{10}$.

? Ordre de convergence de la dichotomie :
+ 1
- 2
- 1.618
= Linéaire : l'erreur est divisée par 2 à chaque pas.

? Nombre d'itérations pour $[2,3]$ et $\varepsilon = 10^{-3}$ :
- 3
+ 10
- 30
= $\ln(1000)/\ln 2 \approx 9.97$.

? Combien de racines réelles a $x^3 - 3x - 1$ ?
- 1
- 2
+ 3
= Maximum local $f(-1) = 1 > 0$, minimum local $f(1) = -3 < 0$.

? Pour $\tan x - x$ sur $]\pi/2, 3\pi/2[$, l'unicité vient de :
+ $f'(x) = \tan^2 x \ge 0$
- $f(4.4) < 0$
- $\tan$ est périodique
= $f$ est croissante sur l'intervalle.

? La principale qualité de la dichotomie est :
- sa rapidité
+ sa robustesse : elle converge toujours
- elle n'a pas besoin de deux points
= Sûre mais lente.

? $|c_n - r|$ est majoré par :
- $(b-a)/n$
+ $(b-a)/2^{n+1}$
- $(b-a)^n$
= Théorème du cours : $r$ est dans un intervalle de longueur $(b-a)/2^n$ dont $c_n$ est le milieu.
```

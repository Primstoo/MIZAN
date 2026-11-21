---
id: rolle-taf-applications
titre: Rolle, accroissements finis et leurs usages
seance: Chapitre 1 · Dérivabilité et applications
importance: 4
---

## Avant de commencer

Il te faut la définition de la dérivée et le fait qu'une fonction continue sur un segment $[a, b]$ atteint un maximum et un minimum.

```exercice Vérifie ton prérequis
? $f(x) = x^2$ sur $[-1, 2]$ : quel est son minimum, et où la dérivée s'annule-t-elle ?
= Le minimum vaut 0, atteint en $x = 0$, à l'intérieur de l'intervalle. Et justement $f'(0) = 0$. C'est l'idée qui fait marcher Rolle.
```

## Comment aborder ce chapitre

> [!astuce] **Tout le chapitre tient dans un dessin : quelque part, la tangente est parallèle à la corde.** Chaque exercice consiste à choisir la bonne fonction auxiliaire pour se ramener à ce dessin.

> [!piege] Appliquer Rolle sans vérifier les trois hypothèses : continue sur le **fermé** $[a, b]$, dérivable sur l'**ouvert** $]a, b[$, et $f(a) = f(b)$. Écris-les toutes, à chaque fois : c'est noté.

À la fin, tu sais montrer qu'une dérivée s'annule, compter des racines et encadrer une expression avec le TAF.

## Idée 1 · Rolle : la tangente horizontale

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Courbe partant et revenant à la même hauteur, avec un sommet à tangente horizontale">
<line x1="20" y1="140" x2="330" y2="140" stroke="currentColor" stroke-width="2"/>
<path d="M50 115 C100 20 170 25 200 70 S270 130 300 115" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="50" y1="115" x2="300" y2="115" stroke="currentColor" stroke-dasharray="5 4"/>
<line x1="80" y1="45" x2="180" y2="45" stroke="#D9824F" stroke-width="2.5"/>
<circle cx="130" cy="45" r="4.5" fill="#D9824F"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="45" y="155" fill="currentColor">a</text><text x="296" y="155" fill="currentColor">b</text><text x="110" y="35" fill="#D9824F">f'(c) = 0</text></g>
</svg>
```

Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$ et $f(a) = f(b)$, il existe $c \in ]a, b[$ tel que $f'(c) = 0$.

**Exemple.** $P(x) = 3x^4 - 11x^3 + 12x^2 - 4x + 2$ : $P(0) = 2$ et $P(1) = 3 - 11 + 12 - 4 + 2 = 2$. $P$ est un polynôme, donc Rolle s'applique : $P'$ s'annule sur $]0, 1[$.

## Idée 2 · Le TAF : la pente de la corde

Si $f$ est continue sur $[a, b]$ et dérivable sur $]a, b[$, il existe $c \in ]a, b[$ tel que $f(b) - f(a) = f'(c)(b - a)$.

On le prouve en appliquant Rolle à $F(x) = f(x) - \dfrac{f(b) - f(a)}{b - a}(x - a)$, qui vérifie $F(a) = F(b) = f(a)$.

```etapes Encadrer avec le TAF
Repérer la différence :: Écris l'expression comme $f(b) - f(a)$ : par exemple $\arctan t - \arctan 0$.
Appliquer le TAF :: Il existe $c$ entre $a$ et $b$ avec $f(b) - f(a) = f'(c)(b - a)$.
Encadrer f'(c) :: Utilise $a < c < b$ et la monotonie de $f'$.
Conclure :: Remplace dans l'égalité et vérifie le sens des inégalités.
```

**Exemple.** Pour $t > 0$ : $\arctan t = \dfrac{t}{1 + c^2}$ avec $0 < c < t$. Comme $1 + c^2 < 1 + t^2$, on obtient $\arctan t \ge \dfrac{t}{1 + t^2}$.

## Idée 3 · Compter des racines

```flux Rolle sert à majorer le nombre de racines
P a k racines -> Rolle entre deux racines voisines -> P' a au moins k - 1 racines
```

Lu à l'envers : si $P'$ a au plus $m$ racines, alors $P$ en a au plus $m + 1$.

**Exemple.** $P(x) = x^n + px + q$ : $P''(x) = n(n-1)x^{n-2}$ ne s'annule qu'en 0, donc $P'$ a au plus 2 racines et $P$ au plus 3. Si $n$ est pair, $P'(x) = nx^{n-1} + p$ est strictement croissante : une racine au plus pour $P'$, donc deux au plus pour $P$.

> [!retenir] Pour montrer qu'une expression $g$ s'annule, cherche une fonction $F$ dont $g$ est la dérivée et qui prend la même valeur aux deux bouts. Puis Rolle.

## S'exercer

```exercice Rolle et TAF
? Soit $P(x) = a_0 + a_1 x + \dots + a_n x^n$ avec $a_0 + \frac{a_1}{2} + \dots + \frac{a_n}{n+1} = 0$. Montre que $P$ a une racine dans $]0, 1[$.
indice: Prends la primitive $Q$ de $P$ qui s'annule en 0.
= $Q(x) = a_0 x + \frac{a_1}{2}x^2 + \dots + \frac{a_n}{n+1}x^{n+1}$. $Q(0) = 0$ et $Q(1) = 0$ par hypothèse. $Q$ est un polynôme : Rolle donne $c \in ]0, 1[$ avec $Q'(c) = P(c) = 0$.

? Montre que pour $x > 0$ : $\dfrac{1}{x+1} < \ln(x+1) - \ln x < \dfrac1x$.
= TAF à $\ln$ sur $[x, x+1]$ : $\ln(x+1) - \ln x = \frac1c$ avec $x < c < x + 1$. Donc $\frac{1}{x+1} < \frac1c < \frac1x$.

? Calcule $\lim_{x \to +\infty} x^2\left(e^{1/x} - e^{1/(x+1)}\right)$.
indice: TAF à $f(x) = e^{1/x}$ sur $[x, x+1]$.
= $f'(c) = -\frac{1}{c^2}e^{1/c}$, donc $e^{1/x} - e^{1/(x+1)} = \frac{1}{c^2}e^{1/c}$ avec $x < c < x + 1$. Alors $\frac{x^2}{(x+1)^2}e^{1/(x+1)} \le x^2(\dots) \le e^{1/x}$ (avec $e^{1/c} \le e^{1/x}$ et $e^{1/c} \ge e^{1/(x+1)}$). Les deux bornes tendent vers 1 : la limite vaut 1.
reponse: 1
```

## Flashcards

```cartes
Hypothèses de Rolle :: Continue sur $[a,b]$, dérivable sur $]a,b[$, $f(a) = f(b)$.
Conclusion de Rolle :: Il existe $c \in ]a,b[$ avec $f'(c) = 0$.
TAF :: $f(b) - f(a) = f'(c)(b-a)$ pour un $c \in ]a,b[$.
Fonction auxiliaire du TAF :: $F(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x-a)$.
Inégalité des accroissements finis :: Si $|f'| \le k$, alors $|f(b) - f(a)| \le k|b-a|$.
Compter les racines :: $k$ racines pour $P$ donnent au moins $k-1$ racines pour $P'$.
Montrer que $P$ s'annule :: Trouver une primitive $Q$ avec $Q(a) = Q(b)$, puis Rolle.
Contre-exemple à Rolle :: $|x|$ sur $[-1,1]$ : non dérivable en 0.
```

## QCM du chapitre

```qcm
? Rolle exige la dérivabilité sur :
- $[a, b]$
+ $]a, b[$
- $\mathbb R$ tout entier
= Les bornes peuvent poser problème sans gêner le théorème.

? $|x|$ sur $[-1, 1]$ :
- vérifie Rolle avec $c = 0$
+ ne vérifie pas les hypothèses de Rolle
- a une dérivée nulle en 1
= Pas dérivable en 0.

? Le TAF affirme l'existence de $c$ avec :
+ $f(b) - f(a) = f'(c)(b - a)$
- $f(c) = 0$
- $f'(c) = f(b)$
= Tangente parallèle à la corde.

? Si $|f'| \le 3$ sur $\mathbb R$, $|f(4) - f(2)|$ est au plus :
- 3
+ 6
- 12
= $3 \times 2$.

? Si $P'$ a au plus 2 racines réelles, $P$ en a au plus :
- 2
+ 3
- 4
= Rolle entre racines voisines.

? Pour $P(x) = x^4 + px + q$, nombre maximal de racines réelles :
+ 2
- 3
- 4
= $P'$ strictement croissante, une seule racine.

? $\ln(x+1) - \ln x$, pour $x > 0$, est minoré par :
+ $\frac{1}{x+1}$
- $\frac1x$
- $1$
= TAF avec $c < x + 1$.

? $f' = 0$ sur un intervalle implique :
+ $f$ constante
- $f$ nulle
- $f$ dérivable deux fois
= Conséquence du TAF.

? Pour montrer que $P$ a une racine dans $]0,1[$, on applique Rolle à :
- $P$
- $P'$
+ une primitive de $P$
= La dérivée de la primitive, c'est $P$.

? Dans le TAF, $c$ est :
- toujours le milieu de $[a,b]$
+ un point de $]a,b[$ qu'on ne connaît pas en général
- forcément unique
= Le théorème donne l'existence, pas la valeur.
```

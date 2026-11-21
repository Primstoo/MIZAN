---
id: formules-taylor
titre: Les formules de Taylor
seance: Chapitre 2 · Formules de Taylor
importance: 4
---

## Avant de commencer

Tu dois savoir dériver plusieurs fois une fonction usuelle et connaître le TAF (chapitre 1).

```exercice Vérifie ton prérequis
? Calcule $f^{(n)}(0)$ pour $f(x) = e^x$.
= Toutes les dérivées valent $e^x$, donc $f^{(n)}(0) = 1$ pour tout $n$.
reponse: 1
```

## Comment aborder ce chapitre

> [!astuce] **Taylor, c'est le TAF poussé plus loin.** Le TAF approche $f$ par une constante plus une erreur ; Taylor l'approche par un polynôme plus une erreur plus petite.

> [!piege] Confondre les trois formules. Taylor-Young donne un $o((x-a)^n)$ : **local**, sans valeur. Taylor-Lagrange donne un reste précis : il sert à **majorer** une erreur.

À la fin, tu sais écrire le polynôme de Taylor, choisir la bonne formule et majorer une erreur d'approximation.

## Idée 1 · Le polynôme de Taylor

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="La courbe de exponentielle et ses approximations de degré 1 et 2 qui la collent près de zéro">
<line x1="20" y1="140" x2="330" y2="140" stroke="currentColor"/><line x1="170" y1="10" x2="170" y2="160" stroke="currentColor"/>
<path d="M30 136 C100 130 150 112 170 100 S250 40 280 10" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="60" y1="144" x2="290" y2="52" stroke="#D9824F" stroke-dasharray="6 4" stroke-width="2"/>
<path d="M70 104 Q170 92 270 22" fill="none" stroke="#D9824F" stroke-width="2"/>
<g font-family="sans-serif" font-size="12" font-weight="700"><text x="285" y="25" fill="currentColor">eˣ</text><text x="285" y="58" fill="#D9824F">1 + x</text><text x="40" y="100" fill="#D9824F">1 + x + x²/2</text></g>
</svg>
```

Le polynôme de Taylor d'ordre $n$ de $f$ en $a$ est $T_n(x) = \displaystyle\sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k$. Il a les mêmes dérivées que $f$ en $a$ jusqu'à l'ordre $n$.

**Exemple.** Pour $e^x$ en 0 : $T_3(x) = 1 + x + \frac{x^2}{2} + \frac{x^3}{6}$.

## Idée 2 · Trois formules, trois usages

```grille Quelle formule de Taylor ?
#cols: reste sert_à hypothèse
#rows: Young Lagrange reste_intégral
*o((x−a)ⁿ) *limites,_DL Cⁿ
!f⁽ⁿ⁺¹⁾(c)… !majorer_l'erreur Cⁿ⁺¹
~intégrale ~inégalités_fines Cⁿ⁺¹
```

- **Young** : $f$ de classe $C^n$ suffit, et $f(x) = T_n(x) + o((x-a)^n)$ quand $x \to a$.
- **Lagrange** : $f$ de classe $C^{n+1}$, il existe $c$ entre $a$ et $x$ avec $f(x) = T_n(x) + \dfrac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$. Avec $n = 0$, c'est le TAF.

## Idée 3 · Majorer une erreur (inégalité de Taylor-Lagrange)

Si $|f^{(n+1)}| \le M$ entre $a$ et $x$, alors $|f(x) - T_n(x)| \le \dfrac{M|x-a|^{n+1}}{(n+1)!}$.

```etapes Majorer l'erreur de Taylor
Choisir n et a :: Exemple : approcher $e^{0{,}1}$ par $T_2(0{,}1) = 1{,}105$, avec $a = 0$.
Majorer la dérivée suivante :: $f''' = e^x \le e^{0{,}1} < 2$ sur $[0; 0{,}1]$.
Appliquer l'inégalité :: Erreur $\le \frac{2 \times 0{,}1^3}{6} \approx 3{,}4 \times 10^{-4}$.
Conclure :: $e^{0{,}1} \approx 1{,}105$ à moins de $4 \times 10^{-4}$ près.
```

**Exemple classique.** Pour $x \ge 0$ : $x - \frac{x^3}{6} \le \sin x \le x$. Lagrange à l'ordre 2 donne $\sin x = x - \frac{\cos c}{6}x^3$ (le terme en $x^2$ est nul), et comme $|\cos c| \le 1$, le terme d'erreur est majoré par $\frac{x^3}{6}$.

> [!attention] Ajout ToumaiLearn : les séries de TD ne contiennent pas d'exercice dédié à Taylor-Lagrange ; cette section prépare les DL du chapitre suivant, qui reposent sur Taylor-Young.

## S'exercer

```exercice Taylor
? Écris le polynôme de Taylor d'ordre 3 de $\ln(1+x)$ en 0.
= $f' = \frac{1}{1+x}$, $f'' = -\frac{1}{(1+x)^2}$, $f''' = \frac{2}{(1+x)^3}$. En 0 : 1, -1, 2. $T_3 = x - \frac{x^2}{2} + \frac{x^3}{3}$.

? Montre que pour tout $x \in \mathbb R$ : $\cos x \ge 1 - \frac{x^2}{2}$.
indice: Lagrange à l'ordre 1... ou étudie $g(x) = \cos x - 1 + \frac{x^2}{2}$.
= $g'(x) = x - \sin x$, positive pour $x \ge 0$ et négative pour $x \le 0$ (car $|\sin x| \le |x|$). Donc $g$ a un minimum en 0, qui vaut 0 : $g \ge 0$.

? Majore l'erreur commise en remplaçant $\sin(0{,}2)$ par $0{,}2$.
= Lagrange d'ordre 2 en 0 (le terme en $x^2$ est nul) : $|\sin x - x| \le \frac{|x|^3}{6}$. Erreur $\le \frac{0{,}008}{6} \approx 1{,}3 \times 10^{-3}$.
```

## Flashcards

```cartes
Polynôme de Taylor en $a$ :: $\sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x-a)^k$.
Taylor-Young :: $f(x) = T_n(x) + o((x-a)^n)$, pour $f$ de classe $C^n$.
Taylor-Lagrange :: $f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$, $c$ entre $a$ et $x$.
Taylor-Lagrange pour $n = 0$ :: C'est le TAF.
Inégalité de Taylor-Lagrange :: $|f - T_n| \le \frac{M|x-a|^{n+1}}{(n+1)!}$ si $|f^{(n+1)}| \le M$.
Young ou Lagrange pour une limite ? :: Young.
Young ou Lagrange pour majorer une erreur ? :: Lagrange.
$T_3$ de $e^x$ en 0 :: $1 + x + \frac{x^2}{2} + \frac{x^3}{6}$.
```

## QCM du chapitre

```qcm
? Le coefficient de $(x-a)^k$ dans $T_n$ est :
+ $\frac{f^{(k)}(a)}{k!}$
- $f^{(k)}(a)$
- $\frac{f^{(k)}(a)}{k}$
= Ne pas oublier la factorielle.

? Taylor-Young donne une information :
+ locale, au voisinage de $a$
- valable sur tout $\mathbb R$
- chiffrée pour tout $x$
= Le $o$ n'a pas de valeur.

? Pour majorer une erreur d'approximation, on utilise :
- Taylor-Young
+ Taylor-Lagrange
- la règle de L'Hôpital
= Le reste de Lagrange est explicite.

? Taylor-Lagrange à l'ordre 0, c'est :
+ le TAF
- Rolle
- le TVI
= $f(x) = f(a) + f'(c)(x-a)$.

? $T_2$ de $\cos x$ en 0 :
- $1 + \frac{x^2}{2}$
+ $1 - \frac{x^2}{2}$
- $1 - x$
= $\cos''(0) = -1$.

? Le coefficient de $x^3$ dans $T_3$ de $\ln(1+x)$ en 0 :
+ $\frac13$
- $-\frac13$
- $\frac16$
= $f'''(0) = 2$, divisé par $3! = 6$.

? Si $|f'''| \le 6$, l'erreur $|f(x) - T_2(x)|$ est au plus :
+ $|x-a|^3$
- $6|x-a|^3$
- $|x-a|^2$
= $\frac{6}{3!} = 1$.

? Taylor-Young à l'ordre $n$ demande que $f$ soit :
- continue seulement
+ de classe $C^n$ (au moins $n$ fois dérivable)
- polynomiale
= Il faut les dérivées jusqu'à l'ordre $n$.

? Dans Taylor-Lagrange, le point $c$ est situé :
+ entre $a$ et $x$
- toujours en $a$
- au milieu de $[a, x]$
= Comme dans le TAF.

? Pour $x \ge 0$ on a :
+ $x - \frac{x^3}{6} \le \sin x \le x$
- $\sin x \ge x$
- $\sin x \le x - \frac{x^3}{6}$
= Encadrement classique.
```

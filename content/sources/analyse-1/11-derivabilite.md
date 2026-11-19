---
id: derivabilite
titre: Dérivabilité, règles de calcul, dérivée d'une réciproque
seance: Chapitre 4 · Fonctions dérivables
importance: 4
---

## Avant de commencer

La dérivée est une **limite** de taux d'accroissement. Il faut savoir calculer une limite de fonction.

```exercice Vérifie ton prérequis
? Calcule $\lim_{h \to 0} \dfrac{(1 + h)^2 - 1}{h}$.
= $\dfrac{2h + h^2}{h} = 2 + h \to 2$. C'est déjà la dérivée de $x^2$ en 1.
reponse: 2
```

## Comment aborder ce chapitre

> [!astuce] **Dérivée = pente de la tangente.** Les formules servent partout, mais aux points délicats (raccord, valeur absolue, racine en 0), reviens toujours au taux d'accroissement.

> [!piege] « Continue donc dérivable. » Faux : $|x|$ est continue en 0 mais pas dérivable. Le sens vrai est l'inverse : dérivable donc continue.

À la fin, tu sais étudier la dérivabilité en un point, dériver avec les règles, et dériver une réciproque.

## Idée 1 · Le taux d'accroissement

```html
<svg viewBox="0 0 340 180" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Les sécantes entre a et a plus h se rapprochent de la tangente en a quand h tend vers 0">
<path d="M30 160 Q150 150 320 20" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="60" y1="170" x2="320" y2="85" stroke="#D9824F" stroke-width="2"/>
<line x1="60" y1="190" x2="320" y2="20" stroke="currentColor" stroke-dasharray="5 4"/>
<circle cx="150" cy="140" r="4.5" fill="#D9824F"/><circle cx="270" cy="62" r="4.5" fill="currentColor"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="140" y="162" fill="#D9824F">a</text><text x="278" y="62" fill="currentColor">a + h</text><text x="230" y="112" fill="#D9824F">tangente</text></g>
</svg>
```

$f$ est **dérivable en $a$** si $\dfrac{f(a + h) - f(a)}{h}$ a une limite **finie** quand $h \to 0$. Cette limite est $f'(a)$. La tangente a pour équation $y = f(a) + f'(a)(x - a)$.

**Dérivées à gauche et à droite** : mêmes limites avec $h \to 0^-$ ou $h \to 0^+$. Dérivable ssi les deux existent et sont égales.

**Exemple.** $|x|$ en 0 : taux $\tfrac{|h|}{h}$, vaut 1 à droite et $-1$ à gauche. Pas dérivable (point anguleux).

**Exemple.** $\sqrt x$ en 0 : taux $\tfrac{1}{\sqrt h} \to +\infty$. Pas dérivable (tangente verticale).

> [!retenir] Dérivable en $a$ implique continue en $a$. La réciproque est fausse.

## Idée 2 · Les règles de calcul

```grille Formulaire
#cols: Opération, Dérivée
*u + v, u' + v'
*uv, u'v + uv'
*u / v (v ≠ 0), (u'v - uv') / v²
*g ∘ u, u' × g'(u)
~xⁿ, n xⁿ⁻¹
~√x (x > 0), 1 / (2√x)
~arcsin x (|x| < 1), 1 / √(1 - x²)
~arctan x, 1 / (1 + x²)
```

**Exemple.** $(\sin(x^2))' = 2x\cos(x^2)$.

## Idée 3 · Dérivée d'une réciproque

Si $f$ est continue strictement monotone sur $I$, dérivable en $a$ avec $f'(a) \ne 0$, alors $f^{-1}$ est dérivable en $b = f(a)$ et

$$(f^{-1})'(b) = \frac{1}{f'(f^{-1}(b))} = \frac{1}{f'(a)}.$$

```etapes Calculer (f⁻¹)'(b)
Trouver a :: Résoudre $f(a) = b$ (souvent une valeur évidente).
Calculer f'(a) :: Vérifier $f'(a) \ne 0$.
Inverser :: $(f^{-1})'(b) = \dfrac{1}{f'(a)}$.
```

**Exemple (type cours).** $f(x) = x^3 + 4x - 1$. On cherche $(f^{-1})'(4)$ : $f(1) = 4$, $f'(x) = 3x^2 + 4$, $f'(1) = 7$. Donc $(f^{-1})'(4) = \tfrac17$.

**Exemple.** $\arctan$ : avec $f = \tan$, $f' = 1 + \tan^2$, donc $\arctan'(x) = \dfrac{1}{1 + x^2}$.

## Idée 4 · Extremum et dérivée nulle

Si $f$ est dérivable en $c$, intérieur à l'intervalle, et que $f$ a un maximum ou un minimum local en $c$, alors $f'(c) = 0$.

> [!attention] La réciproque est fausse : $x^3$ a une dérivée nulle en 0 sans extremum. Et en une **borne** de l'intervalle, un extremum n'impose pas $f'(c) = 0$.

## S'exercer

```exercice Dérivabilité
? $f(x) = x^2 \sin\tfrac1x$ pour $x \ne 0$, $f(0) = 0$. Est-elle dérivable en 0 ?
= Taux : $\tfrac{f(h)}{h} = h\sin\tfrac1h$, et $|h \sin\tfrac1h| \le |h| \to 0$. Oui, $f'(0) = 0$.

? $f(x) = x|x|$. Dérivable en 0 ?
= Taux : $\tfrac{h|h|}{h} = |h| \to 0$. Oui, $f'(0) = 0$.

? $f(x) = x^5 + x$. Calcule $(f^{-1})'(2)$.
= $f(1) = 2$, $f'(1) = 5 + 1 = 6$, donc $(f^{-1})'(2) = \tfrac16$.
```

## Flashcards

```cartes
Dérivable en $a$ :: $\frac{f(a+h) - f(a)}{h}$ a une limite finie quand $h \to 0$.
Dérivable et continue :: Dérivable implique continue ; la réciproque est fausse ($|x|$).
$|x|$ en 0 :: Continue, dérivées à gauche $-1$ et à droite $1$ : pas dérivable.
Tangente en $a$ :: $y = f(a) + f'(a)(x - a)$.
Dérivée d'une composée :: $(g\circ u)' = u' \times g'(u)$.
Dérivée de la réciproque :: $(f^{-1})'(f(a)) = \frac{1}{f'(a)}$ si $f'(a) \ne 0$.
$\arctan'$ :: $\frac{1}{1+x^2}$.
Extremum intérieur :: $f'(c) = 0$ ; la réciproque est fausse.
```

## QCM du chapitre

```qcm
? $|x|$ en 0 est :
+ continue mais pas dérivable
- dérivable
- discontinue
= Point anguleux.

? $\sqrt x$ en 0 :
- est dérivable de dérivée 0
+ n'est pas dérivable (tangente verticale)
- n'est pas continue
= Le taux tend vers $+\infty$.

? $(\cos(3x))'$ :
- $\sin 3x$
+ $-3\sin 3x$
- $3\cos 3x$
= Composée.

? $\arcsin'(x)$ :
+ $\frac{1}{\sqrt{1 - x^2}}$
- $\frac{-1}{\sqrt{1-x^2}}$
- $\frac{1}{1 + x^2}$
= Pour $|x| < 1$.

? $f(x) = x^3 + 4x - 1$, $(f^{-1})'(4)$ :
- 7
+ $\frac17$
- $\frac14$
= $f(1) = 4$, $f'(1) = 7$.

? Dérivable en $a$ implique :
+ continue en $a$
- monotone autour de $a$
- $f'(a) \ne 0$
= Résultat de cours.

? $f'(c) = 0$ implique un extremum en $c$ :
- toujours
+ pas forcément
- jamais
= $x^3$ en 0.

? $(u/v)'$ :
- $\frac{u'v' }{v^2}$
+ $\frac{u'v - uv'}{v^2}$
- $\frac{uv' - u'v}{v^2}$
= Formule du quotient.

? $x|x|$ en 0 :
+ dérivable, $f'(0) = 0$
- pas dérivable
- dérivable, $f'(0) = 1$
= Taux $|h| \to 0$.

? Pour que $f^{-1}$ soit dérivable en $f(a)$, il faut :
- $f'(a) = 0$
+ $f'(a) \ne 0$
- $f$ paire
= Sinon tangente verticale pour la réciproque.
```

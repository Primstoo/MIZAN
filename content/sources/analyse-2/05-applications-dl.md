---
id: applications-dl
titre: Applications des DL : limites, tangentes, asymptotes
seance: Chapitre 5 · Applications des développements limités
importance: 5
---

## Avant de commencer

Il faut savoir calculer un DL (chapitres 3 et 4) et reconnaître une forme indéterminée comme $\frac00$ ou $\infty - \infty$.

```exercice Vérifie ton prérequis
? $\lim_{x \to 0} \frac{\sin x}{x}$ : quelle forme, et quelle valeur ?
= Forme $\frac00$. Avec $\sin x = x + o(x)$, le quotient vaut $1 + o(1)$ : la limite est 1.
reponse: 1
```

## Comment aborder ce chapitre

> [!astuce] **Développe juste assez pour que quelque chose ne s'annule plus.** Dans une limite, on s'arrête au premier terme non nul ; dans une position relative, au premier terme après la tangente.

> [!piege] Ne remplacer que le numérateur par un équivalent dans une différence. $\frac{e^{x^2} - \cos x}{x^2}$ : écrire $e^{x^2} \sim 1$ et $\cos x \sim 1$ donne $\frac{0}{x^2}$, faux. Les équivalents ne s'ajoutent pas : utilise des DL.

À la fin, tu sais lever une indétermination, trouver une tangente et sa position, et une asymptote en $\pm\infty$.

## Idée 1 · Lever une forme indéterminée

```etapes Calculer une limite par DL
Ramener en 0 :: Si $x \to 1$, pose $x = 1 + h$ ; si $x \to \infty$, pose $u = 1/x$.
Développer le dénominateur :: Trouve son premier terme non nul, par exemple $x^2$.
Développer le numérateur au même ordre :: $e^{x^2} - \cos x = \left(1 + x^2\right) - \left(1 - \frac{x^2}{2}\right) + o(x^2)$.
Simplifier :: $\frac{\frac32 x^2 + o(x^2)}{x^2} \to \frac32$.
```

**Exemple.** $\lim_{x \to 0} \frac{e^{\sin x} - 1 - x}{x^2}$ : avec $e^{\sin x} = 1 + x + \frac{x^2}{2} + o(x^2)$, la limite vaut $\frac12$.

## Idée 2 · Tangente et position

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Courbe au-dessus de sa tangente au point de contact, car le terme suivant est positif">
<path d="M40 40 Q170 190 300 40" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="40" y1="115" x2="300" y2="115" stroke="#D9824F" stroke-width="2.5"/>
<circle cx="170" cy="115" r="4.5" fill="#D9824F"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="200" y="135" fill="#D9824F">tangente y = a₀ + a₁x</text><text x="60" y="40" fill="currentColor">a₂ &gt; 0 : courbe au-dessus</text></g>
</svg>
```

Si $f(x) = a_0 + a_1 x + a_p x^p + o(x^p)$ avec $a_p \ne 0$ ($p \ge 2$), la tangente en 0 est $y = a_0 + a_1 x$, et le signe de $a_p x^p$ donne la position : $p$ pair, la courbe reste d'un seul côté ; $p$ impair, elle traverse (point d'inflexion).

**Exemple.** $f(x) = \sqrt{1 + x + x^2} = 1 + \frac x2 + \frac{3x^2}{8} + o(x^2)$. Tangente : $y = 1 + \frac x2$. Comme $\frac38 > 0$, la courbe est au-dessus près de 0.

## Idée 3 · Asymptote en l'infini

```flux Trouver une asymptote oblique
f(x) = x·g(1/x) -> DL de g en u = 1/x -> f(x) = ax + b + c/x + o(1/x) -> asymptote y = ax + b, signe de c/x donne la position
```

**Exemple.** $\sqrt{1 + x + x^2} = x\sqrt{1 + u + u^2}$ avec $u = \frac1x$, $x > 0$. Donc $f(x) = x\left(1 + \frac u2 + \frac{3u^2}{8} + o(u^2)\right) = x + \frac12 + \frac{3}{8x} + o\left(\frac1x\right)$. Asymptote $y = x + \frac12$, courbe au-dessus en $+\infty$.

> [!retenir] Pour la position, il faut toujours **un terme de plus** que ce qui donne la droite.

## S'exercer

```exercice Limites et asymptotes
? Calcule $\lim_{x \to 1} \frac{x \ln x}{x^2 - 1}$.
indice: Pose $x = 1 + h$.
= $x \ln x = (1+h)(h + o(h)) = h + o(h)$ et $x^2 - 1 = 2h + h^2$. Le quotient tend vers $\frac12$.
reponse: 1/2

? Calcule $\lim_{x \to +\infty} \left(\sqrt{x^2 + 3x + 2} - x\right)$.
= $\sqrt{x^2 + 3x + 2} = x\sqrt{1 + 3u + 2u^2} = x\left(1 + \frac{3u}{2} + o(u)\right) = x + \frac32 + o(1)$. Limite : $\frac32$.
reponse: 3/2

? $f(x) = xe^{x^2}$ : donne la tangente en 0 et sa position.
= $f(x) = x + x^3 + o(x^3)$. Tangente $y = x$. Le terme suivant $x^3$ change de signe en 0 : la courbe traverse sa tangente (inflexion), au-dessus pour $x > 0$.
```

## Flashcards

```cartes
Limite par DL :: Développer jusqu'au premier terme non nul du dénominateur.
Équivalents et sommes :: On n'additionne pas des équivalents ; on passe aux DL.
Tangente en 0 :: $y = a_0 + a_1 x$, partie de degré $\le 1$ du DL.
Position par rapport à la tangente :: Signe du premier terme non nul après $a_1 x$.
Point d'inflexion :: Premier terme suivant de degré impair.
Asymptote en $+\infty$ :: Écrire $f(x) = ax + b + \frac cx + o(\frac1x)$.
Changement de variable en $+\infty$ :: $u = \frac1x \to 0$.
$\lim \frac{e^{x^2} - \cos x}{x^2}$ :: $\frac32$.
```

## QCM du chapitre

```qcm
? $\lim_{x \to 0} \frac{1 - \cos x}{x^2}$ :
- 0
+ $\frac12$
- 1
= $1 - \cos x = \frac{x^2}{2} + o(x^2)$.

? Si $f(x) = 2 + 3x - x^2 + o(x^2)$, la tangente en 0 est :
+ $y = 2 + 3x$
- $y = 3x$
- $y = 2 - x^2$
= Partie affine du DL.

? Avec le même $f$, la courbe est :
- au-dessus de la tangente
+ en dessous de la tangente
- traversée par la tangente
= $-x^2 < 0$.

? Si $f(x) = 1 + x + 4x^3 + o(x^3)$ en 0 :
- minimum local en 0
+ point d'inflexion en 0
- la tangente est horizontale
= Terme suivant de degré impair.

? $\sqrt{x^2 + 3x + 2} - x \to$ :
- 0
- $+\infty$
+ $\frac32$
= DL avec $u = \frac1x$.

? Asymptote de $\sqrt{1 + x + x^2}$ en $+\infty$ :
+ $y = x + \frac12$
- $y = x$
- $y = \frac x2 + 1$
= Calcul du cours.

? Pour une limite en 1, on pose :
+ $x = 1 + h$, $h \to 0$
- $u = \frac1x$
- $x = h^2$
= On se ramène en 0.

? $\lim_{x \to 0} \frac{e^{\sin x} - 1 - x}{x^2}$ :
+ $\frac12$
- 1
- 0
= Coefficient de $x^2$ dans $e^{\sin x}$.

? Pour la position par rapport à l'asymptote, on a besoin :
- seulement de $a$ et $b$
+ du terme en $\frac1x$ (ou suivant)
- de $f'(x)$
= Un terme de plus.

? $e^{x^2} \sim 1$ et $\cos x \sim 1$ permettent-ils de conclure sur $\frac{e^{x^2} - \cos x}{x^2}$ ?
- oui, la limite est 0
+ non, il faut des DL
- oui, la limite est 1
= Les équivalents ne passent pas à la différence.
```

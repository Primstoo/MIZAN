---
id: limites-fonctions
titre: Limite d'une fonction
seance: Chapitre 3 · Fonctions d'une variable réelle
importance: 4
---

## Avant de commencer

C'est la limite des suites, transposée : au lieu de « $n$ grand », on dira « $x$ proche de $a$ ».

```exercice Vérifie ton prérequis
? Écris avec des quantificateurs : « $u_n$ tend vers $\ell$ ».
= $\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N,\ |u_n - \ell| < \varepsilon$. Si ce n'est pas fluide, relis l'idée 2 de « Limite d'une suite ».
```

## Comment aborder ce chapitre

> [!astuce] **Deux tubes au lieu d'un.** On choisit la précision $\varepsilon$ autour de $\ell$ (en vertical), et on trouve une marge $\delta$ autour de $a$ (en horizontal) qui garantit cette précision.

> [!piege] Croire que la limite en $a$ dépend de $f(a)$. Elle n'en dépend pas : $f$ peut même ne pas être définie en $a$. Exemple : $\dfrac{\sin x}{x} \to 1$ en 0.

À la fin, tu sais écrire et utiliser la définition, distinguer limite à gauche et à droite, et prouver qu'une limite n'existe pas avec deux suites.

## Idée 1 · La définition $\varepsilon$–$\delta$

```html
<svg viewBox="0 0 340 200" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une bande horizontale de demi-largeur epsilon autour de l et une bande verticale de demi-largeur delta autour de a : le graphe dans la bande verticale reste dans la bande horizontale">
<rect x="30" y="60" width="300" height="50" fill="#D9824F" opacity="0.15"/>
<rect x="140" y="10" width="60" height="180" fill="currentColor" opacity="0.08"/>
<line x1="30" y1="185" x2="330" y2="185" stroke="currentColor" stroke-width="2"/><line x1="30" y1="10" x2="30" y2="185" stroke="currentColor" stroke-width="2"/>
<path d="M40 170 Q120 140 170 85 T320 20" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="30" y1="85" x2="330" y2="85" stroke="#D9824F" stroke-dasharray="5 4"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="8" y="89" fill="#D9824F">ℓ</text><text x="165" y="200" fill="currentColor">a</text><text x="250" y="78" fill="#D9824F">± ε</text><text x="146" y="25" fill="currentColor">± δ</text></g>
</svg>
```

$\lim_{x \to a} f(x) = \ell$ signifie : $\forall \varepsilon > 0,\ \exists \delta > 0,\ \forall x \in D_f,\ |x - a| < \delta \Rightarrow |f(x) - \ell| < \varepsilon$.

**Exemple.** $f(x) = 3x + 1$ en $a = 2$, $\ell = 7$ : $|f(x) - 7| = 3|x - 2|$. Il suffit de prendre $\delta = \tfrac{\varepsilon}{3}$.

Variantes : en $+\infty$, on remplace « $|x - a| < \delta$ » par « $x > A$ » ; une limite infinie remplace « $|f(x) - \ell| < \varepsilon$ » par « $f(x) > B$ ».

## Idée 2 · Limite à gauche, limite à droite

$\lim_{x \to a^+} f(x)$ ne regarde que les $x > a$ ; $\lim_{x \to a^-}$ que les $x < a$. La limite en $a$ (pour $x \ne a$) existe si et seulement si les deux existent et sont égales.

**Exemple.** $f(x) = \dfrac{|x|}{x}$ : vaut 1 à droite de 0 et $-1$ à gauche. Deux limites différentes, donc pas de limite en 0.

**Exemple.** $E(x)$ en $a = 1$ : limite à gauche 0, limite à droite 1.

## Idée 3 · Le pont avec les suites (caractérisation séquentielle)

$\lim_{x \to a} f(x) = \ell$ **si et seulement si** pour toute suite $x_n \to a$ (avec $x_n \in D_f$), $f(x_n) \to \ell$.

```etapes Prouver qu'une limite n'existe pas
Choisir deux suites :: Deux suites $x_n$ et $y_n$ qui tendent vers $a$.
Calculer les images :: Calculer $\lim f(x_n)$ et $\lim f(y_n)$.
Comparer :: Si les deux limites sont différentes, $f$ n'a pas de limite en $a$.
```

**Exemple.** $f(x) = \sin \tfrac1x$ en 0 : $x_n = \tfrac{1}{2n\pi} \to 0$ donne $f(x_n) = 0$ ; $y_n = \tfrac{1}{\pi/2 + 2n\pi} \to 0$ donne $f(y_n) = 1$. Pas de limite.

## Idée 4 · Fonctions monotones : la limite existe

Comme pour les suites : si $f$ est **croissante et majorée** sur $]a, b[$, alors $\lim_{x \to b^-} f(x)$ existe et vaut $\sup_{]a,b[} f$.

En particulier, une fonction croissante sur $\mathbb R$ et majorée admet une limite finie en $+\infty$. Une fonction périodique non constante, elle, n'a pas de limite en $+\infty$ (deux suites $x_0 + nT$ et $x_1 + nT$ donnent deux valeurs différentes).

> [!retenir] Les règles de calcul (somme, produit, quotient, gendarmes, composition) sont les mêmes que pour les suites.

## S'exercer

```exercice Limites de fonctions
? Avec la définition, montre que $\lim_{x \to 1} (2x - 5) = -3$.
= $|2x - 5 + 3| = 2|x - 1|$. Pour $\varepsilon > 0$, $\delta = \tfrac\varepsilon2$ convient.

? Montre que $\cos x$ n'a pas de limite en $+\infty$.
indice: Deux suites qui tendent vers $+\infty$.
= $x_n = 2n\pi$ donne $\cos x_n = 1$ ; $y_n = \pi + 2n\pi$ donne $-1$. Limites différentes, donc pas de limite.

? Calcule $\lim_{x \to 0} x \sin \tfrac1x$.
indice: Gendarmes.
= $|x \sin\tfrac1x| \le |x| \to 0$, donc la limite vaut 0.
reponse: 0
```

## Flashcards

```cartes
Définition de $\lim_{x\to a} f(x) = \ell$ :: $\forall \varepsilon > 0, \exists \delta > 0, |x - a| < \delta \Rightarrow |f(x) - \ell| < \varepsilon$.
La limite en $a$ dépend-elle de $f(a)$ ? :: Non. $f$ peut même ne pas être définie en $a$.
Limite en $a$ et limites latérales :: Elle existe ssi les limites à gauche et à droite existent et sont égales.
Caractérisation séquentielle :: $f(x) \to \ell$ ssi $f(x_n) \to \ell$ pour toute suite $x_n \to a$.
Prouver la non-existence d'une limite :: Deux suites vers $a$ dont les images ont des limites différentes.
Croissante et majorée sur $]a,b[$ :: Admet une limite finie en $b^-$, égale au sup.
$\lim_{x\to 0} \frac{\sin x}{x}$ :: 1.
Périodique non constante en $+\infty$ :: Pas de limite.
```

## QCM du chapitre

```qcm
? Pour $f(x) = 5x$ en $a = 0$, quel $\delta$ convient à $\varepsilon$ donné ?
- $\delta = 5\varepsilon$
+ $\delta = \frac{\varepsilon}{5}$
- $\delta = \varepsilon$
= $|5x| < \varepsilon$ dès que $|x| < \frac\varepsilon5$.

? $\frac{|x|}{x}$ en 0 :
- tend vers 1
- tend vers 0
+ n'a pas de limite
= 1 à droite, $-1$ à gauche.

? $\lim_{x \to 1^-} E(x)$ vaut :
+ 0
- 1
- n'existe pas
= Pour $0 \le x < 1$, $E(x) = 0$.

? Pour prouver qu'une limite n'existe pas, on utilise :
- une seule suite
+ deux suites aux images de limites différentes
- la dérivée
= Caractérisation séquentielle.

? $\sin\frac1x$ en 0 :
- tend vers 0
- tend vers 1
+ n'a pas de limite
= Elle oscille entre $-1$ et 1.

? $x\sin\frac1x$ en 0 :
+ tend vers 0
- n'a pas de limite
- tend vers 1
= Gendarmes avec $|x|$.

? Une fonction croissante et majorée sur $\mathbb R$ en $+\infty$ :
+ a une limite finie
- tend vers $+\infty$
- peut ne pas avoir de limite
= Analogue de la limite monotone.

? $\lim_{x\to a} f(x) = +\infty$ s'écrit :
- $\forall \varepsilon, \exists \delta, |f(x)| < \varepsilon$
+ $\forall B, \exists \delta > 0, |x - a| < \delta \Rightarrow f(x) > B$
- $\exists B, f(x) > B$
= On dépasse toute barre $B$.

? $f$ n'est pas définie en $a$. Elle peut avoir une limite en $a$ :
+ vrai
- faux
- seulement si elle est continue
= Exemple : $\frac{\sin x}{x}$ en 0.

? $\cos x$ en $+\infty$ :
- tend vers 0
- tend vers 1
+ n'a pas de limite
= Suites $2n\pi$ et $\pi + 2n\pi$.
```

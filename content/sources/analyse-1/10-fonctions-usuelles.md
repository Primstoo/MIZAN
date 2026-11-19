---
id: fonctions-usuelles
titre: Racines n-ièmes, puissances, fonctions circulaires réciproques
seance: Chapitre 3 · Fonctions d'une variable réelle
importance: 3
---

## Avant de commencer

Tout ce chapitre applique le **théorème de la bijection** : une fonction continue strictement monotone a une réciproque.

```exercice Vérifie ton prérequis
? Pourquoi $x \mapsto x^2$ n'a-t-elle pas de réciproque sur $\mathbb R$, mais en a une sur $[0, +\infty[$ ?
= Sur $\mathbb R$, elle n'est pas injective ($(-2)^2 = 2^2$). Sur $[0, +\infty[$, elle est continue et strictement croissante : bijection vers $[0, +\infty[$, de réciproque $\sqrt{\ }$.
```

## Comment aborder ce chapitre

> [!astuce] **Une réciproque = restreindre puis inverser.** Pour chaque fonction, retiens l'intervalle de départ choisi : c'est lui qui fixe l'image de la réciproque.

> [!piege] Écrire $\arcsin(\sin x) = x$ pour tout $x$. C'est faux hors de $[-\tfrac\pi2, \tfrac\pi2]$ : $\arcsin(\sin \pi) = \arcsin 0 = 0 \ne \pi$.

À la fin, tu sais manipuler $\sqrt[n]{x}$, $x^r$ pour $r$ rationnel, et $\arcsin$, $\arccos$, $\arctan$ avec leurs domaines.

## Idée 1 · La racine n-ième

Pour $n \ge 1$, $x \mapsto x^n$ est continue strictement croissante de $[0, +\infty[$ sur $[0, +\infty[$. Sa réciproque est $\sqrt[n]{x}$ :

$y = \sqrt[n]{x}$ avec $x \ge 0$ $\iff$ $y^n = x$ avec $y \ge 0$.

Propriétés : $\sqrt[n]{ab} = \sqrt[n]a \sqrt[n]b$ ; $\sqrt[n]a < \sqrt[n]b \iff a < b$ ; $(\sqrt[n]x)^n = \sqrt[n]{x^n} = x$ pour $x \ge 0$.

## Idée 2 · Puissances rationnelles

Pour $x > 0$ et $r = \tfrac pq$ ($p \in \mathbb Z$, $q \in \mathbb N^*$), on pose $x^r = \sqrt[q]{x^p}$. Le résultat ne dépend pas de l'écriture de $r$.

**Exemple.** $8^{2/3} = \sqrt[3]{64} = 4$. Les règles $x^{r+s} = x^r x^s$ et $(x^r)^s = x^{rs}$ restent vraies.

## Idée 3 · arcsin, arccos, arctan

```grille Les trois réciproques
#cols: Fonction, Restreinte à, Réciproque, Définie sur, À valeurs dans
*sin (croissante), [-π/2, π/2], arcsin, [-1, 1], [-π/2, π/2]
*cos (décroissante), [0, π], arccos, [-1, 1], [0, π]
*tan (croissante), ]-π/2, π/2[, arctan, ℝ, ]-π/2, π/2[
```

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Graphe de arctan : croissante, entre deux asymptotes horizontales moins pi sur deux et pi sur deux">
<line x1="20" y1="85" x2="330" y2="85" stroke="currentColor" stroke-width="1.5"/><line x1="175" y1="10" x2="175" y2="160" stroke="currentColor" stroke-width="1.5"/>
<line x1="20" y1="25" x2="330" y2="25" stroke="#D9824F" stroke-dasharray="5 4"/><line x1="20" y1="145" x2="330" y2="145" stroke="#D9824F" stroke-dasharray="5 4"/>
<path d="M20 141 C120 138 140 120 175 85 S230 32 330 29" fill="none" stroke="currentColor" stroke-width="2.5"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="280" y="20" fill="#D9824F">π/2</text><text x="272" y="162" fill="#D9824F">-π/2</text><text x="30" y="70" fill="currentColor">arctan</text></g>
</svg>
```

Formules sûres :

- $\sin(\arcsin x) = x$ pour $x \in [-1, 1]$ ; $\arcsin(\sin x) = x$ seulement pour $x \in [-\tfrac\pi2, \tfrac\pi2]$.
- $\cos(\arcsin x) = \sqrt{1 - x^2}$ (car $\cos \ge 0$ sur $[-\tfrac\pi2, \tfrac\pi2]$).
- $\arcsin x + \arccos x = \dfrac\pi2$ pour $x \in [-1, 1]$.
- $\arctan x + \arctan \tfrac1x = \dfrac\pi2$ pour $x > 0$.

**Exemple.** $\arcsin \tfrac12 = \tfrac\pi6$, $\arccos \tfrac12 = \tfrac\pi3$, et $\tfrac\pi6 + \tfrac\pi3 = \tfrac\pi2$. $\arctan 1 = \tfrac\pi4$.

```etapes Calculer arcsin(sin x) pour x hors de [-π/2, π/2]
Chercher un angle y dans [-π/2, π/2] :: Avec $\sin y = \sin x$ : essayer $y = \pi - x$ ou $y = x - 2k\pi$.
Vérifier l'intervalle :: $y$ doit être dans $[-\tfrac\pi2, \tfrac\pi2]$.
Conclure :: $\arcsin(\sin x) = y$.
```

**Exemple.** $\arcsin(\sin \tfrac{5\pi}{6})$ : $\pi - \tfrac{5\pi}6 = \tfrac\pi6 \in [-\tfrac\pi2, \tfrac\pi2]$, donc le résultat est $\tfrac\pi6$.

## S'exercer

```exercice Fonctions usuelles
? Calcule $\cos(\arctan x)$ pour $x$ réel.
indice: $1 + \tan^2 = \tfrac1{\cos^2}$, et $\cos > 0$ sur $]-\tfrac\pi2, \tfrac\pi2[$.
= Avec $\theta = \arctan x$ : $\cos^2\theta = \tfrac1{1 + x^2}$ et $\cos\theta > 0$, donc $\cos(\arctan x) = \tfrac{1}{\sqrt{1 + x^2}}$.

? Calcule $\arccos(\cos \tfrac{4\pi}{3})$.
= $\cos\tfrac{4\pi}3 = \cos\tfrac{2\pi}3$ et $\tfrac{2\pi}3 \in [0, \pi]$. Résultat : $\tfrac{2\pi}{3}$.

? Montre que $\arcsin x + \arccos x = \tfrac\pi2$.
= Soit $t = \arccos x \in [0, \pi]$. Alors $\tfrac\pi2 - t \in [-\tfrac\pi2, \tfrac\pi2]$ et $\sin(\tfrac\pi2 - t) = \cos t = x$, donc $\arcsin x = \tfrac\pi2 - t$.
```

## Flashcards

```cartes
$\sqrt[n]{x}$ :: Réciproque de $x^n$ sur $[0, +\infty[$ : $y = \sqrt[n]x \iff y^n = x, y \ge 0$.
$x^{p/q}$ pour $x > 0$ :: $\sqrt[q]{x^p}$.
arcsin :: De $[-1,1]$ vers $[-\frac\pi2, \frac\pi2]$.
arccos :: De $[-1,1]$ vers $[0, \pi]$.
arctan :: De $\mathbb R$ vers $]-\frac\pi2, \frac\pi2[$.
$\arcsin x + \arccos x$ :: $\frac\pi2$.
$\cos(\arcsin x)$ :: $\sqrt{1 - x^2}$.
$\arctan x + \arctan\frac1x$ pour $x > 0$ :: $\frac\pi2$.
```

## QCM du chapitre

```qcm
? $\sqrt[3]{-8}$ dans ce cours (racine définie sur $[0,+\infty[$) :
- vaut $-2$
+ n'est pas définie
- vaut 2
= La racine n-ième est définie ici pour $x \ge 0$.

? $16^{3/4}$ vaut :
- 12
+ 8
- 4
= $\sqrt[4]{16} = 2$, puis $2^3 = 8$.

? $\arcsin(\sin \pi)$ vaut :
+ 0
- $\pi$
- $\frac\pi2$
= $\sin\pi = 0$ et $\arcsin 0 = 0$.

? arccos est à valeurs dans :
- $[-\frac\pi2, \frac\pi2]$
+ $[0, \pi]$
- $\mathbb R$
= Restriction de $\cos$ à $[0, \pi]$.

? $\arctan 1$ vaut :
+ $\frac\pi4$
- $\frac\pi2$
- 1
= $\tan\frac\pi4 = 1$.

? $\lim_{x\to+\infty} \arctan x$ :
- $+\infty$
+ $\frac\pi2$
- $\pi$
= Asymptote horizontale.

? $\cos(\arcsin x)$ vaut :
+ $\sqrt{1 - x^2}$
- $-\sqrt{1 - x^2}$
- $1 - x^2$
= Le cosinus est positif sur $[-\frac\pi2, \frac\pi2]$.

? $\arcsin\frac12 + \arccos\frac12$ :
- $\pi$
+ $\frac\pi2$
- $\frac\pi3$
= Formule générale.

? arcsin est :
+ strictement croissante
- strictement décroissante
- périodique
= Même sens que $\sin$ sur $[-\frac\pi2, \frac\pi2]$.

? $\arccos(\cos\frac{4\pi}3)$ :
- $\frac{4\pi}3$
+ $\frac{2\pi}3$
- $-\frac{2\pi}3$
= On ramène dans $[0, \pi]$.
```

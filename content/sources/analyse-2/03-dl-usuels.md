---
id: dl-definition-usuels
titre: Développements limités : définition et DL usuels
seance: Chapitre 3 · Développements limités
importance: 5
---

## Avant de commencer

Il faut la formule de Taylor-Young (chapitre 2) et savoir manipuler la notation $o(x^n)$ : une quantité négligeable devant $x^n$ quand $x \to 0$.

```exercice Vérifie ton prérequis
? Que vaut $x^2 \cdot o(x^3)$ ? Et $o(x^3) + o(x^2)$ ?
= $x^2 \cdot o(x^3) = o(x^5)$. $o(x^3) + o(x^2) = o(x^2)$ : on garde toujours le $o$ le plus gros (le plus petit exposant).
```

## Comment aborder ce chapitre

> [!astuce] **Un DL, c'est une fonction compliquée remplacée par un polynôme, près de 0.** Tu ne recalcules presque jamais de dérivées : tu combines une petite liste de DL appris par cœur.

> [!piege] Mélanger les ordres. Si tu écris $\cos x = 1 - \frac{x^2}{2} + o(x^2)$, tu ne peux **rien** affirmer sur le terme en $x^3$ ou $x^4$. Annonce l'ordre avant de calculer.

À la fin, tu connais les DL usuels en 0 et tu sais les adapter (en $x_0 \ne 0$, par substitution, par parité).

## Idée 1 · Ce qu'est un DL

$f$ admet un DL d'ordre $n$ en 0 s'il existe un polynôme $P$ de degré $\le n$ avec $f(x) = P(x) + o(x^n)$. $P$ est la **partie régulière**, il est unique.

Par Taylor-Young, si $f$ est $C^n$, $P$ est son polynôme de Taylor. L'ordre 0 dit « continue en 0 », l'ordre 1 dit « dérivable en 0 ».

**Parité.** Si $f$ est paire, son DL n'a que des puissances paires ; impaire, que des impaires. $\cos$ : pair. $\sin$, $\arctan$ : impairs.

## Idée 2 · Les DL à connaître par cœur

```grille DL usuels en 0
#cols: fonction début terme_général
#rows: eˣ 1/(1−x) ln(1+x) sin cos (1+x)^α arctan
1+x+x²/2 *xⁿ/n! .
1+x+x² *xⁿ .
x−x²/2+x³/3 *(−1)ⁿ⁺¹xⁿ/n .
x−x³/6+x⁵/120 *(−1)ᵏx²ᵏ⁺¹/(2k+1)! .
1−x²/2+x⁴/24 *(−1)ᵏx²ᵏ/(2k)! .
1+αx+α(α−1)x²/2 *binôme_généralisé .
x−x³/3+x⁵/5 *(−1)ᵏx²ᵏ⁺¹/(2k+1) .
```

$ch$ et $sh$ : mêmes DL que $\cos$ et $\sin$, mais **tous les signes +**.

**Exemple.** $\sqrt{1+x} = (1+x)^{1/2} = 1 + \frac x2 - \frac{x^2}{8} + \frac{x^3}{16} + o(x^3)$.

## Idée 3 · Substituer et se ramener en 0

```etapes Obtenir un DL par substitution
Repérer la fonction usuelle :: $\sqrt{1 - x}$, c'est $(1+u)^{1/2}$ avec $u = -x$.
Remplacer :: $1 - \frac x2 - \frac{x^2}{8} - \frac{x^3}{16} - \frac{5x^4}{128} + o(x^4)$.
Combiner :: $\sqrt{1-x} + \sqrt{1+x}$ : les termes impairs s'annulent.
Conclure :: $2 - \frac{x^2}{4} - \frac{5x^4}{64} + o(x^4)$.
```

**En $x_0 \ne 0$** : pose $h = x - x_0$ et développe en $h \to 0$. **En $+\infty$** : pose $u = 1/x$.

> [!retenir] Avant tout calcul : quel ordre ? Puis remplace chaque fonction par son DL usuel, au même ordre.

## S'exercer

```exercice DL usuels
? DL à l'ordre 3 en 0 de $\frac{1}{1-x} - e^x$.
= $(1 + x + x^2 + x^3) - (1 + x + \frac{x^2}{2} + \frac{x^3}{6}) + o(x^3) = \frac{x^2}{2} + \frac{5x^3}{6} + o(x^3)$.

? DL à l'ordre 2 en 1 de $\ln x$.
indice: Pose $x = 1 + h$.
= $\ln(1+h) = h - \frac{h^2}{2} + o(h^2)$, soit $\ln x = (x-1) - \frac{(x-1)^2}{2} + o((x-1)^2)$.

? Coefficient de $x^4$ dans le DL de $\cos(2x)$ en 0.
= $\cos u = 1 - \frac{u^2}{2} + \frac{u^4}{24}$ avec $u = 2x$ : $\frac{16}{24} = \frac23$.
reponse: 2/3
```

## Flashcards

```cartes
DL de $e^x$ :: $1 + x + \frac{x^2}{2!} + \dots + \frac{x^n}{n!} + o(x^n)$.
DL de $\frac{1}{1-x}$ :: $1 + x + x^2 + \dots + x^n + o(x^n)$.
DL de $\ln(1+x)$ :: $x - \frac{x^2}{2} + \frac{x^3}{3} - \dots$
DL de $\sin x$ :: $x - \frac{x^3}{6} + \frac{x^5}{120} + o(x^6)$.
DL de $\cos x$ :: $1 - \frac{x^2}{2} + \frac{x^4}{24} + o(x^5)$.
DL de $(1+x)^\alpha$ :: $1 + \alpha x + \frac{\alpha(\alpha-1)}{2}x^2 + \dots$
DL de $\arctan x$ :: $x - \frac{x^3}{3} + \frac{x^5}{5} + o(x^6)$.
Fonction paire :: DL avec uniquement des puissances paires.
Unicité :: La partie régulière d'un DL est unique.
DL en $x_0$ :: Poser $h = x - x_0$ et développer en $h \to 0$.
```

## QCM du chapitre

```qcm
? Un DL d'ordre 1 en 0 existe si et seulement si $f$ est :
- continue en 0
+ dérivable en 0
- de classe $C^2$
= Ordre 1 : $f(0) + f'(0)x + o(x)$.

? Le DL de $\cos x$ ne contient :
+ que des puissances paires
- que des puissances impaires
- aucun terme constant
= $\cos$ est paire.

? Le coefficient de $x^3$ dans $\sin x$ :
- $\frac16$
+ $-\frac16$
- $\frac13$
= $-\frac{x^3}{3!}$.

? $\frac{1}{1+x} = $ :
+ $1 - x + x^2 - x^3 + o(x^3)$
- $1 + x + x^2 + o(x^2)$
- $1 - x + \frac{x^2}{2} + o(x^2)$
= On remplace $x$ par $-x$ dans $\frac{1}{1-x}$.

? Le terme en $x^2$ de $\sqrt{1+x}$ :
- $\frac{x^2}{8}$
+ $-\frac{x^2}{8}$
- $\frac{x^2}{4}$
= $\frac{\alpha(\alpha-1)}{2} = \frac{1/2 \cdot (-1/2)}{2}$.

? $o(x^2) + o(x^4) = $ :
+ $o(x^2)$
- $o(x^4)$
- $o(x^6)$
= On garde le plus gros.

? Le DL d'ordre 3 de $\ln(1+x)$ :
+ $x - \frac{x^2}{2} + \frac{x^3}{3} + o(x^3)$
- $x + \frac{x^2}{2} + \frac{x^3}{3} + o(x^3)$
- $1 + x - \frac{x^2}{2} + o(x^2)$
= Signes alternés, pas de factorielle.

? $ch(x)$ en 0 commence par :
+ $1 + \frac{x^2}{2}$
- $1 - \frac{x^2}{2}$
- $x + \frac{x^3}{6}$
= Comme $\cos$, mais avec des +.

? Pour un DL en $+\infty$ on pose :
- $u = x - 1$
+ $u = \frac1x$
- $u = x^2$
= Et $u \to 0^+$.

? Le terme constant de $\sqrt{1-x} + \sqrt{1+x}$ :
- 0
- 1
+ 2
= $1 + 1$.
```

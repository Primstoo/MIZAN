---
id: anneaux-corps
titre: Anneaux et corps
seance: Chapitre 4 §4.5 et chapitre 5 du polycopié
importance: 4
---

## Avant de commencer

Il te faut la définition d'un groupe abélien (chapitre précédent).

```exercice Vérifie ton prérequis
? $(\mathbb Q^*, \times)$ est-il un groupe abélien ?
reponse: oui
= Oui : produit associatif et commutatif, neutre 1, inverse $1/x$.
```

## Comment aborder ce chapitre

> [!astuce] **Un anneau = un groupe pour + et « presque » un groupe pour ×.** On garde associativité, neutre 1 et distributivité, mais pas les inverses. Un corps, c'est quand tous les non nuls deviennent inversibles.

> [!piege] Simplifier $ab = 0$ en « $a = 0$ ou $b = 0$ » dans n'importe quel anneau. Dans $\mathbb Z/4\mathbb Z$, $2 \times 2 = 0$ avec $2 \neq 0$.

À la fin, tu sais vérifier qu'un ensemble est un anneau, trouver ses inversibles et ses diviseurs de zéro, et utiliser le binôme.

## Idée 1 · Anneau

```flux Définition (A, +, ×)
(A,+) groupe abélien -> × associative -> × distributive sur + -> neutre 1 pour ×
```

Exemples : $\mathbb Z, \mathbb Q, \mathbb R, \mathbb C$, $\mathbb R[X]$, $\mathbb R^{\mathbb N}$, $M_n(\mathbb R)$ (non commutatif).

Règles (théorème 28) : $a \times 0 = 0$, $(-a)b = -(ab)$, $(-a)(-b) = ab$.

**Inversibles** : $A^* = \{a \mid \exists a',\ aa' = a'a = 1\}$ est un **groupe** (groupe des unités). Dans $\mathbb Z$ : $\{1, -1\}$.

## Idée 2 · $\mathbb Z/n\mathbb Z$ et les diviseurs de zéro

```grille Table de × dans Z/4Z (orange : produit nul avec facteurs non nuls)
#cols: × 0 1 2 3
#rows: 0 1 2 3
0 0 0 0 0
0 0 1 2 3
0 0 2 *0 2
0 0 3 2 1
```

Dans $\mathbb Z/n\mathbb Z$, on calcule puis on prend le reste modulo $n$. Ici $2 \times 2 = 4 \equiv 0$ : 2 est un **diviseur de zéro**. Inversibles de $\mathbb Z/4\mathbb Z$ : $1$ et $3$ ($3 \times 3 = 9 \equiv 1$).

Un anneau commutatif sans diviseur de zéro est **intègre** (ex. $\mathbb Z$, $K[X]$).

## Idée 3 · Binôme et factorisation (si $ab = ba$)

$$(a + b)^n = \sum_{k=0}^n \binom nk a^k b^{n-k}, \qquad a^n - b^n = (a - b)\sum_{k=0}^{n-1} a^{n-1-k}b^k.$$

En particulier $1 - a^n = (1 - a)(1 + a + \dots + a^{n-1})$.

**Exemple (TD 3, ex. 6).** Si $x^m = 0$ ($x$ nilpotent), alors $1 = 1 - x^m = (1 - x)(1 + x + \dots + x^{m-1})$ : $1 - x$ est inversible, d'inverse $\sum_{k=0}^{m-1} x^k$.

> [!piege] Dans $M_2(\mathbb R)$, $(A + B)^2 = A^2 + AB + BA + B^2$, pas $A^2 + 2AB + B^2$ : le binôme exige $AB = BA$.

## Idée 4 · Corps et corps des fractions

Un **corps** est un anneau commutatif non réduit à $\{0\}$ où tout élément non nul est inversible : $\mathbb Q, \mathbb R, \mathbb C, K(X)$. Dans un corps, $xy = 0 \Rightarrow x = 0$ ou $y = 0$. $\mathbb Z/p\mathbb Z$ est un corps quand $p$ est premier (Bézout donne l'inverse).

```etapes Construire Q à partir de Z (corps des fractions)
Couples :: on prend $(a, b)$ avec $b \neq 0$.
Relation :: $(a, b) \mathcal R (a', b') \iff ab' = a'b$ ; c'est une équivalence.
Classes :: la classe de $(a, b)$ se note $\frac ab$ ; $(1, 2)$ et $(2, 4)$ donnent la même.
Lois :: $\frac ab + \frac{a'}{b'} = \frac{ab' + a'b}{bb'}$ et $\frac ab \cdot \frac{a'}{b'} = \frac{aa'}{bb'}$.
```

> [!attention] Le polycopié prend les couples dans $A \times A^*$ en notant $A^*$… alors que $A^*$ désigne aussi les inversibles. Il faut lire $A \times (A \setminus \{0\})$, et supposer $A$ **commutatif et intègre** (sinon la relation n'est pas transitive).

## S'exercer

```exercice Exercices du TD 3
? Anneau de Boole ($x^2 = x$ pour tout $x$). Montre que $x + x = 0$.
indice: Développe (x + y)² = x + y.
= $(x+y)^2 = x^2 + xy + yx + y^2 = x + xy + yx + y$, et vaut aussi $x + y$, donc $xy + yx = 0$. Avec $y = x$ : $x^2 + x^2 = 0$, soit $x + x = 0$. Donc $-z = z$ pour tout $z$, et $xy = -yx = yx$ : l'anneau est commutatif.

? Si $ab$ est nilpotent ($(ab)^m = 0$), donne l'inverse de $1 - ab$.
= $(1 - ab)^{-1} = 1 + ab + (ab)^2 + \dots + (ab)^{m-1}$, par la factorisation $1 - x^m = (1-x)(1 + \dots + x^{m-1})$ avec $x = ab$ (qui commute avec 1).

? Quels sont les inversibles de $\mathbb Z/6\mathbb Z$ ?
= $1$ et $5$ ($5 \times 5 = 25 \equiv 1$). Les autres (2, 3, 4) ont un facteur commun avec 6.
```

## Flashcards

```cartes
Anneau :: $(A,+)$ groupe abélien, $\times$ associative, distributive, avec neutre 1.
Corps :: Anneau commutatif non nul où tout élément non nul est inversible.
Diviseur de zéro :: $a \neq 0$ tel que $ab = 0$ pour un $b \neq 0$.
Groupe des unités de $\mathbb Z$ :: $\{1, -1\}$.
Condition du binôme dans un anneau :: $ab = ba$.
Inverse de $1 - x$ si $x^m = 0$ :: $1 + x + \dots + x^{m-1}$.
$\mathbb Z/n\mathbb Z$ est un corps quand… :: $n$ est premier.
Pourquoi $(A, \times)$ n'est jamais un groupe ? :: $0$ n'est pas inversible (anneau non nul).
```

## QCM du chapitre

```qcm
? Dans $\mathbb Z/4\mathbb Z$, $2 \times 2$ vaut :
+ $0$
- $4$
- $2$
= $4 \equiv 0 \pmod 4$.

? $(\mathbb Z, +, \times)$ est :
- un corps
+ un anneau intègre qui n'est pas un corps
- un anneau avec diviseurs de zéro
= Seuls $\pm 1$ sont inversibles.

? Les inversibles de $\mathbb Z/4\mathbb Z$ sont :
- 1 seulement
+ 1 et 3
- 1, 2 et 3
= $3 \times 3 = 9 \equiv 1$ ; 2 est diviseur de zéro.

? La formule du binôme est valable dans un anneau quand :
+ $ab = ba$
- toujours
- jamais
= Il faut pouvoir regrouper $ab$ et $ba$.

? Dans un corps, $xy = 0$ implique :
+ $x = 0$ ou $y = 0$
- $x = y$
- rien de particulier
= Si $x \neq 0$, on multiplie par $x^{-1}$.

? $M_2(\mathbb R)$ est :
- un corps
+ un anneau non commutatif
- un anneau intègre
= Il y a des matrices non nulles de produit nul.

? Dans tout anneau, $a \times 0$ vaut :
+ $0$
- $a$
- dépend de l'anneau
= $a \times 0 = a \times (0 + 0) = a\times 0 + a \times 0$.

? Si $x^3 = 0$, l'inverse de $1 - x$ est :
- $1 + x$
+ $1 + x + x^2$
- $1 - x^2$
= $(1 - x)(1 + x + x^2) = 1 - x^3 = 1$.

? $\mathbb Z/5\mathbb Z$ est :
+ un corps
- un anneau non intègre
- pas un anneau
= 5 est premier.

? Le corps des fractions de $\mathbb Z$ est :
- $\mathbb R$
+ $\mathbb Q$
- $\mathbb Z$ lui-même
= On construit $\mathbb Q$ par les classes de couples $(a, b)$.
```

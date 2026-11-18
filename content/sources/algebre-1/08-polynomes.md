---
id: polynomes
titre: Polynômes
seance: Chapitre 6 du polycopié
importance: 5
---

## Avant de commencer

Il te faut la division euclidienne des entiers et l'algorithme d'Euclide (chapitre 5) : on va faire exactement pareil avec des polynômes.

```exercice Vérifie ton prérequis
? Développe $(X - 1)^2(X + 2)$.
= $(X^2 - 2X + 1)(X + 2) = X^3 - 3X + 2$.
```

## Comment aborder ce chapitre

> [!astuce] **$K[X]$ ressemble à $\mathbb Z$.** Le degré joue le rôle de la taille : division euclidienne, PGCD, Bézout, Gauss, « irréductibles » au lieu de « premiers ». Ce que tu sais sur les entiers se transpose.

> [!piege] Oublier que $\deg(P + Q)$ peut être **plus petit** que le max : $(X^2 + 1) + (-X^2) = 1$.

À la fin, tu sais diviser, trouver racines et multiplicités, factoriser sur $\mathbb R$ et $\mathbb C$, et calculer un PGCD de polynômes.

## Idée 1 · Degré et division euclidienne

$\deg(PQ) = \deg P + \deg Q$ et $\deg(P+Q) \le \max(\deg P, \deg Q)$. Le polycopié pose $\deg 0 = -1$.

> [!attention] Avec $\deg 0 = -1$, la formule $\deg(PQ) = \deg P + \deg Q$ est fausse si $P = 0$ ($-1 \neq -1 + \deg Q$). La plupart des livres posent $\deg 0 = -\infty$. Garde la convention du prof, mais traite le polynôme nul à part.

Pour $B \neq 0$, il existe $Q$, $R$ uniques avec $A = BQ + R$ et $\deg R < \deg B$.

```etapes Diviser X⁵ + X + 1 par X² + X + 1
X⁵ ÷ X² = X³ :: on retire $X^3(X^2+X+1)$ ; reste $-X^4 - X^3 + X + 1$.
−X⁴ ÷ X² = −X² :: on ajoute $X^2(X^2+X+1)$ ; reste $X^2 + X + 1$.
X² ÷ X² = 1 :: on retire $X^2+X+1$ ; reste $0$.
Résultat :: $X^5 + X + 1 = (X^2+X+1)(X^3 - X^2 + 1)$ : la division tombe juste.
```

> [!attention] Exemple 36 du polycopié : pour $A = X^4 - aX^2 - bX - c$ et $B = X^2 - X - 1$, le quotient correct est $X^2 + X + (2 - a)$ et le reste $(3 - a - b)X + (2 - a - c)$ (vérifié par calcul formel), et non ceux annoncés.

## Idée 2 · Racines et multiplicité

$a$ est racine de $P$ $\iff$ $(X - a) \mid P$. Un polynôme non nul de degré $n$ a au plus $n$ racines.

```html
<svg viewBox="0 0 400 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Courbe de X³−3X+2 : elle touche l'axe en 1 (racine double) et le traverse en −2 (racine simple)">
<line x1="10" y1="120" x2="390" y2="120" stroke="currentColor"/>
<path d="M40 165 C 70 40, 110 30, 150 60 S 230 122, 260 120 S 300 90, 340 20" fill="none" stroke="#D9824F" stroke-width="3"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><circle cx="62" cy="120" r="4"/><text x="40" y="140">−2 simple</text><circle cx="260" cy="120" r="4"/><text x="235" y="140">1 double</text></g>
</svg>
```

La **multiplicité** $m$ de $a$ : $(X - a)^m \mid P$ mais pas $(X-a)^{m+1}$. Par Taylor : $P(a) = P'(a) = \dots = P^{(m-1)}(a) = 0$ et $P^{(m)}(a) \neq 0$.

**Exemple.** $P = X^3 - 3X + 2$ : $P(1) = 0$, $P' = 3X^2 - 3$, $P'(1) = 0$, $P'' = 6X$, $P''(1) = 6 \neq 0$. Racine double : $P = (X-1)^2(X+2)$.

> [!attention] Exercice 40 du polycopié : avec $X^3 - 3X^2 - 2$ et $X^3 - 4X^2 - 5X - 2$, 1 n'est même pas racine ($P(1) = -4$, $Q(1) = -10$) : énoncés sans doute mal recopiés. Les versions $X^3 - 3X + 2$ et $X^3 - 4X^2 + 5X - 2 = (X-1)^2(X-2)$ donnent 1 racine double. Aussi, remarque 73 : « $a$ racine $\iff m_P(a) \ge 1$ » (pas $> 1$), et dans la formule de Taylor, $P^{(r)} = \sum_{k \ge r} \frac{k!}{(k-r)!} a_k X^{k-r}$.

## Idée 3 · Factoriser sur $\mathbb C$ et sur $\mathbb R$

$\mathbb C$ est **algébriquement clos** : tout polynôme non constant y est scindé, $P = \lambda \prod (X - a_k)^{m_k}$. Sur $\mathbb R$, on regroupe les racines complexes conjuguées en facteurs de degré 2 à discriminant négatif.

```grille Exemples du polycopié
#rows: 1 2 3
X⁴+X²+1 = *(X²−X+1)(X²+X+1)
X²+1 = *(X−i)(X+i)_sur_C
X⁴−X²−1 = *(X²+(√5−1)/2)(X²−(1+√5)/2)
```

> [!attention] Le polycopié termine la factorisation de $X^4 - X^2 - 1$ par un facteur $X^2 - \frac{1+\sqrt5}2$ en trop. La factorisation dans $\mathbb R[X]$ est $\left(X^2 + \frac{\sqrt5 - 1}2\right)\left(X - \sqrt{\tfrac{1+\sqrt5}2}\right)\left(X + \sqrt{\tfrac{1+\sqrt5}2}\right)$. De même, dans l'exemple 38, le produit doit porter sur $k = 0, \dots, 2n - 1$ (les $2n$ racines $2n$-ièmes de l'unité).

**Relations coefficients-racines.** Pour $aX^2 + bX + c$ de racines $x_1, x_2$ : $x_1 + x_2 = -b/a$, $x_1 x_2 = c/a$. En général $\alpha_{n-k} = (-1)^k \alpha_n \sigma_k$.

## Idée 4 · PGCD et Bézout dans $K[X]$

Même algorithme d'Euclide ; le PGCD est le dernier reste non nul **rendu unitaire**.

**Exemple 39 (vérifié).** $P = X^5 - 2X^3 - 2X^2 - 3X - 2$, $Q = X^5 - 3X^4 + 2X^3 - 3X^2 + X$ : dernier reste non nul $18X^2 + 18$, donc $P \wedge Q = X^2 + 1$, et
$$\left(-\tfrac{1}{10}X^2 + \tfrac12 X - \tfrac12\right)P + \left(\tfrac1{10}X^2 - \tfrac15 X - \tfrac12\right)Q = X^2 + 1.$$

Gauss : si $P \mid QR$ et $P \wedge Q = 1$, alors $P \mid R$. Tout polynôme non nul est produit (unique) d'une constante et d'irréductibles unitaires.

## S'exercer

```exercice Exercices types
? Quelle est la multiplicité de 2 dans $X^3 - 4X^2 + 5X - 2$ ?
reponse: 1
= $P(2) = 8 - 16 + 10 - 2 = 0$ ; $P' = 3X^2 - 8X + 5$, $P'(2) = 1 \neq 0$ : racine simple. (1 est racine double.)

? Calcule $(X^4 - 1) \wedge (X^3 - 1)$.
= $X^4 - 1 = X(X^3 - 1) + (X - 1)$, puis $X^3 - 1 = (X-1)(X^2+X+1) + 0$. PGCD : $X - 1$.

? Soit $P$ de degré $\le 2$. Montre que $P = \frac{X(X-1)}{2}P(-1) + (1 - X^2)P(0) + \frac{X(X+1)}{2}P(1)$.
indice: Compare les valeurs en −1, 0, 1.
= La différence est de degré $\le 2$ et s'annule en $-1$, $0$ et $1$ : trois racines pour un degré $\le 2$, donc elle est nulle. (Le polycopié, ex. 39, a perdu les « /2 ».)
```

## Flashcards

```cartes
$a$ racine de $P$ équivaut à… :: $(X - a) \mid P$.
Nombre maximal de racines d'un polynôme de degré $n$ :: $n$ (s'il est non nul).
Racine de multiplicité $m$ par les dérivées :: $P(a) = \dots = P^{(m-1)}(a) = 0$ et $P^{(m)}(a) \neq 0$.
Formule de Taylor en $a$ :: $P = \sum_k \frac{P^{(k)}(a)}{k!}(X - a)^k$.
Algébriquement clos :: Tout polynôme non constant a une racine ; c'est le cas de $\mathbb C$.
Somme et produit des racines de $aX^2+bX+c$ :: $-b/a$ et $c/a$.
PGCD de polynômes :: Dernier reste non nul de l'algorithme d'Euclide, rendu unitaire.
$\deg(PQ)$ :: $\deg P + \deg Q$ (pour $P, Q$ non nuls).
```

## QCM du chapitre

```qcm
? $\deg\big((X^3 + 1)(2X^2 - X)\big)$ vaut :
+ 5
- 6
- 3
= $3 + 2 = 5$.

? $\deg\big((X^2 + X) + (-X^2 + 1)\big)$ vaut :
- 2
+ 1
- 0
= Les termes dominants s'annulent : il reste $X + 1$.

? $1$ est racine de $P$ si et seulement si :
+ $(X - 1) \mid P$
- $(X + 1) \mid P$
- $P'(1) = 0$
= Théorème 39.

? Multiplicité de 1 dans $X^3 - 3X + 2$ :
- 1
+ 2
- 3
= $P(1) = P'(1) = 0$ et $P''(1) = 6 \neq 0$.

? Un polynôme de degré 3 à coefficients réels a toujours :
+ au moins une racine réelle
- trois racines réelles
- aucune racine réelle
= Les racines non réelles vont par paires conjuguées : il en reste au moins une réelle.

? $X^2 + 1$ est :
- scindé sur $\mathbb R$
+ scindé sur $\mathbb C$ mais pas sur $\mathbb R$
- scindé sur $\mathbb Q$
= $X^2 + 1 = (X - i)(X + i)$.

? Le reste de la division de $P$ par $X - a$ est :
+ $P(a)$
- $P'(a)$
- $0$
= $P = Q(X - a) + R$ avec $R$ constant ; on évalue en $a$.

? Le PGCD de $X^4 - 1$ et $X^3 - 1$ est :
- $1$
+ $X - 1$
- $X^2 - 1$
= Racines communes réelles et complexes : seulement 1.

? Les racines de $2X^2 - 6X + 4$ ont pour somme :
+ 3
- $-3$
- 2
= $-b/a = 6/2$. (Et produit $4/2 = 2$.)

? $X^4 + X^2 + 1$ se factorise dans $\mathbb R[X]$ en :
+ $(X^2 - X + 1)(X^2 + X + 1)$
- $(X^2 + 1)^2$
- il est irréductible
= $(X^2 + 1)^2 - X^2$, différence de deux carrés.
```

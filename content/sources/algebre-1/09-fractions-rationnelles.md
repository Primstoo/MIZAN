---
id: fractions-rationnelles
titre: Fractions rationnelles et éléments simples
seance: Chapitre 7 du polycopié
importance: 4
---

## Avant de commencer

Il te faut la division euclidienne des polynômes et la factorisation sur $\mathbb R$ et $\mathbb C$ (chapitre 8).

```exercice Vérifie ton prérequis
? Factorise $X^3 - X$ dans $\mathbb R[X]$.
= $X(X - 1)(X + 1)$.
```

## Comment aborder ce chapitre

> [!astuce] **Une recette, toujours la même.** Partie entière par division, factorisation du dénominateur, forme a priori, puis calcul des coefficients en commençant par les pôles simples (« cache-pôle »).

> [!piege] Oublier la partie entière quand $\deg P \ge \deg Q$. $\frac{X^3}{X^2 - 1}$ contient un $X$ qui n'apparaît dans aucun élément simple.

À la fin, tu sais décomposer une fraction en éléments simples dans $\mathbb C(X)$ et dans $\mathbb R(X)$.

## Idée 1 · Fraction, degré, pôles

$F = P/Q$ avec $P \wedge Q = 1$ et $Q$ unitaire (forme irréductible). $\deg F = \deg P - \deg Q \in \mathbb Z$. Les racines de $Q$ sont les **pôles**, celles de $P$ les **zéros**.

**Exemple.** $F = \frac{X^2 + 1}{(X-1)^2(X+2)}$ : degré $2 - 3 = -1$, pôle double 1, pôle simple $-2$.

## Idée 2 · La forme a priori

```flux Décomposition
F -> partie entière E (division) -> une partie polaire par pôle -> coefficients
```

Théorème 56 : dans $\mathbb C(X)$, si $Q = \prod (X - a_j)^{r_j}$,
$$F = E + \sum_j \sum_{p=1}^{r_j} \frac{C_{jp}}{(X - a_j)^p}.$$
Un pôle d'ordre $r$ donne $r$ termes. Dans $\mathbb R(X)$, un facteur irréductible $X^2 + bX + c$ donne un terme $\frac{\alpha X + \beta}{X^2 + bX + c}$.

> [!attention] Théorème 55 du polycopié : la partie polaire est $\frac{D}{(X-a)^k}$ (et non $\frac{A}{(X-a)^k}$). Remarque 80 : pour un pôle simple $a$ de $Q = (X-a)V$, le coefficient est $C = \frac{P(a)}{V(a)} = \frac{P(a)}{Q'(a)}$. Théorème 53 : avec la convention du prof, $\deg 0 = -1$ ; mais pour les fractions, mieux vaut $-\infty$, car une fraction peut avoir le degré $-1$ sans être nulle.

## Idée 3 · Calculer les coefficients

```etapes Décomposer F = (X² + 1) / ((X − 1)²(X + 2))
Forme a priori :: $\deg F < 0$ donc $E = 0$ ; $F = \frac{a}{X + 2} + \frac{b}{X - 1} + \frac{c}{(X-1)^2}$.
Pôle simple −2 :: on multiplie par $X + 2$ et on prend $x = -2$ : $a = \frac{4 + 1}{(-3)^2} = \frac59$.
Pôle double 1, plus haute puissance :: on multiplie par $(X-1)^2$, $x = 1$ : $c = \frac{2}{3}$.
Coefficient restant :: on prend $x = 0$ : $-\frac12 = \frac a2 - b + c$, donc $b = \frac{5}{18} + \frac23 + \frac12 = \frac49$.
Résultat :: $F = \frac{5}{9(X+2)} + \frac{4}{9(X-1)} + \frac{2}{3(X-1)^2}$ (vérifié par calcul formel).
```

**Exemple avec partie entière.** $\frac{X^3}{X^2 - 1}$ : $X^3 = X(X^2 - 1) + X$, donc $E = X$ et $\frac{X}{X^2 - 1} = \frac{1/2}{X - 1} + \frac{1/2}{X + 1}$.

## Idée 4 · Sur $\mathbb R$ ou sur $\mathbb C$

```grille 1 / (X(X² + 1)) selon le corps
#rows: dans_C(X) dans_R(X)
*1/X −1/(2(X−i)) −1/(2(X+i))
*1/X −X/(X²+1)
```

Sur $\mathbb C$, tout se décompose en $\frac{c}{(X-a)^p}$ ; sur $\mathbb R$, on regroupe les pôles conjugués : $\frac{-1/2}{X - i} + \frac{-1/2}{X + i} = \frac{-X}{X^2 + 1}$.

## S'exercer

```exercice Exercices types
? Décompose $\frac{1}{X^3 - X}$ dans $\mathbb R(X)$.
indice: Trois pôles simples 0, 1, −1 ; utilise C = P(a)/Q'(a) avec Q' = 3X² − 1.
= $Q' = 3X^2 - 1$ : en 0, $C = 1/(-1) = -1$ ; en 1, $1/2$ ; en $-1$, $1/2$. Donc $\frac{1}{X^3 - X} = -\frac1X + \frac{1}{2(X-1)} + \frac{1}{2(X+1)}$.

? Partie entière de $\frac{X^3 + 2}{X^2 - 1}$ ?
= $X^3 + 2 = X(X^2 - 1) + X + 2$ : partie entière $X$.

? Coefficient de $\frac{1}{X - 2}$ dans $\frac{X + 1}{(X - 2)(X + 3)}$ ?
reponse: 0.6 ~0.01
= Cache-pôle : $\frac{2 + 1}{2 + 3} = \frac35 = 0{,}6$.
```

## Flashcards

```cartes
Degré de $P/Q$ :: $\deg P - \deg Q$.
Pôle de $P/Q$ (forme irréductible) :: Racine de $Q$.
Partie entière :: Quotient de la division euclidienne de $P$ par $Q$.
Pôle d'ordre $r$ en $a$ donne… :: $r$ termes $\frac{C_1}{X-a}, \dots, \frac{C_r}{(X-a)^r}$.
Coefficient d'un pôle simple $a$ :: $\frac{P(a)}{Q'(a)}$.
Élément simple de 2e espèce sur $\mathbb R$ :: $\frac{\alpha X + \beta}{X^2 + bX + c}$ avec $b^2 - 4c < 0$.
Si $\deg F < 0$, la partie entière vaut… :: $0$.
```

## QCM du chapitre

```qcm
? Le degré de $\frac{X^3 + 1}{X^5 - X}$ est :
+ $-2$
- $2$
- $8$
= $3 - 5$.

? La partie entière de $\frac{X^3}{X^2 - 1}$ est :
+ $X$
- $0$
- $X^2$
= $X^3 = X(X^2 - 1) + X$.

? Combien de termes pour un pôle triple ?
- 1
+ 3
- 6
= $\frac{c_1}{X-a} + \frac{c_2}{(X-a)^2} + \frac{c_3}{(X-a)^3}$.

? Dans $\frac{1}{X^2 - 1}$, le coefficient de $\frac{1}{X - 1}$ est :
+ $\frac12$
- $1$
- $-\frac12$
= $\frac{P(1)}{Q'(1)} = \frac12$.

? Si $\deg P < \deg Q$, la partie entière de $P/Q$ est :
+ nulle
- égale à $P$
- égale à $Q$
= Le quotient de la division est 0.

? Sur $\mathbb R$, $X^2 + X + 1$ au dénominateur donne un terme :
- $\frac{a}{X^2 + X + 1}$ seulement
+ $\frac{aX + b}{X^2 + X + 1}$
- deux termes $\frac{a}{X - r}$ réels
= Discriminant $-3 < 0$ : facteur irréductible sur $\mathbb R$.

? Les pôles de $\frac{X - 1}{X^2 - 1}$ (après simplification) :
- 1 et $-1$
+ seulement $-1$
- aucun
= $\frac{X-1}{(X-1)(X+1)} = \frac1{X+1}$ : il faut d'abord rendre la fraction irréductible.

? $\frac{1}{X(X^2+1)}$ dans $\mathbb R(X)$ vaut :
+ $\frac1X - \frac{X}{X^2 + 1}$
- $\frac1X + \frac{1}{X^2+1}$
- $\frac1X - \frac{1}{X^2 + 1}$
= On vérifie : $\frac{X^2 + 1 - X^2}{X(X^2+1)}$.

? $(K(X), +, \times)$ est :
+ un corps
- un anneau non intègre
- un groupe pour $\times$
= Toute fraction non nulle a un inverse (définition 68 du polycopié).

? Pour le coefficient de $\frac{1}{(X-1)^2}$ dans $\frac{X^2+1}{(X-1)^2(X+2)}$, on multiplie par $(X-1)^2$ puis on évalue en :
+ $1$
- $-2$
- $0$
= On obtient $\frac{1 + 1}{1 + 2} = \frac23$.
```

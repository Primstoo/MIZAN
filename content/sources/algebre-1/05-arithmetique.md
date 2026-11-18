---
id: arithmetique
titre: Arithmétique dans Z
seance: Chapitre 3 du polycopié
importance: 5
---

## Avant de commencer

Il te faut la division « à la main » avec quotient et reste, et la récurrence.

```exercice Vérifie ton prérequis
? Quotient et reste de la division de 366 par 43 ?
= $366 = 43 \times 8 + 22$ : quotient 8, reste 22 (et $0 \le 22 < 43$).
```

## Comment aborder ce chapitre

> [!astuce] **Tout passe par Euclide et Bézout.** L'algorithme d'Euclide donne le PGCD ; en remontant ses lignes, il donne $u, v$ avec $au + bv = a \wedge b$. Gauss et la résolution de $ax + by = c$ en découlent.

> [!piege] Oublier que le reste d'une division par $b$ vérifie $0 \le r < b$. Pour $a = -7$ et $b = 3$ : $-7 = 3 \times (-3) + 2$, et non $3 \times (-2) - 1$.

À la fin, tu sais calculer un PGCD, un couple de Bézout, résoudre $ax + by = c$ dans $\mathbb Z^2$ et utiliser la décomposition en facteurs premiers.

## Idée 1 · Divisibilité et division euclidienne

$a \mid b \iff \exists k \in \mathbb Z,\ b = ka$. Si $a \mid b$ et $a \mid c$, alors $a \mid k_1 b + k_2 c$ (propriété 3) : c'est l'outil n°1 des TD.

Théorème 15 : pour $a \in \mathbb Z$ et $b \in \mathbb N^*$, il existe un **unique** $(q, r)$ avec $a = bq + r$ et $0 \le r < b$.

**Exemple (TD 2, ex. 2).** $n - 1 \mid n + 3$. Or $n + 3 = (n - 1) + 4$, donc $n - 1 \mid 4$ : $n - 1 \in \{1, 2, 4\}$ ou $n - 1 = -1$, soit $n \in \{0, 2, 3, 5\}$.

## Idée 2 · Algorithme d'Euclide et Bézout

Théorème 14 : si $a = bq + r$, alors $a \wedge b = b \wedge r$. Le dernier reste non nul est le PGCD.

```grille Euclide pour 22 et 17 (exemple 18 du polycopié)
#cols: division reste u v
#rows: r0 r1 r2 r3 r4
. 22 1 0
. 17 0 1
22=17×1+5 5 1 −1
17=5×3+2 2 −3 4
5=2×2+1 *1 *7 *−9
```

Chaque ligne vérifie $r_k = u_k \cdot 22 + v_k \cdot 17$ ; on calcule $u_{k+1} = u_{k-1} - q_k u_k$ (idem pour $v$). Donc $1 = 7 \times 22 - 9 \times 17$ ($154 - 153 = 1$).

> [!attention] Dans la remarque 26, le polycopié écrit « $0 < r_{k+1} \le r_k$ » : il faut lire $0 \le r_{k+1} < r_k$ (reste strictement plus petit que le diviseur).

**Bézout (théorème 16)** : $a \wedge b = 1 \iff \exists (u, v) \in \mathbb Z^2,\ au + bv = 1$.
**Gauss (théorème 17)** : si $a \mid bc$ et $a \wedge b = 1$, alors $a \mid c$.
**PPCM** : $(a \wedge b)(a \vee b) = |ab|$.

## Idée 3 · Résoudre $ax + by = c$

```etapes Résoudre 15x + 8y = 1000 dans Z² (TD 2, ex. 10)
Solution particulière de 15x + 8y = 1 :: $15 = 8 + 7$, $8 = 7 + 1$, donc $1 = 8 - 7 = 8 - (15 - 8) = 2 \times 8 - 15$ : $(x_0, y_0) = (-1, 2)$.
Pour 1000 on multiplie :: $(-1000, 2000)$ est solution.
On soustrait :: $15(x + 1000) = -8(y - 2000)$. Comme $15 \wedge 8 = 1$, Gauss donne $8 \mid x + 1000$.
Solutions :: $x = -1000 + 8k$, $y = 2000 - 15k$, $k \in \mathbb Z$ (et toutes conviennent).
```

**Exemple.** $11x + 16y = 0$ (TD 2, ex. 8) : $11x = -16y$, $11 \wedge 16 = 1$, donc $16 \mid x$ : $(x, y) = (16k, -11k)$.

## Idée 4 · Nombres premiers

$p$ est premier si $p \ge 2$ et ses seuls diviseurs positifs sont 1 et $p$. Tout entier $\ge 2$ a un diviseur premier, et il y a une infinité de premiers (preuve : $n! + 1$).

**Décomposition (théorème 19)** : $n = p_1^{\alpha_1} \cdots p_m^{\alpha_m}$, unique. Puis $a \wedge b = \prod p^{\min}$ et $a \vee b = \prod p^{\max}$.

**Exemple.** $360 = 2^3 \cdot 3^2 \cdot 5$ et $84 = 2^2 \cdot 3 \cdot 7$ : PGCD $= 2^2 \cdot 3 = 12$, PPCM $= 2^3 \cdot 3^2 \cdot 5 \cdot 7 = 2520$. Vérif : $12 \times 2520 = 30240 = 360 \times 84$.

> [!attention] Propriété 7.1 du polycopié : « $n \mid a$ ou bien $n \nmid a$ » est une tautologie. L'énoncé voulu : si $p$ est premier, alors $p \mid a$ **ou** $p \wedge a = 1$.

## S'exercer

```exercice Exercices du TD 2
? Calcule $\mathrm{PGCD}(n, 2n+1)$ pour $n \ge 1$.
reponse: 1
= $2n + 1 = 2 \times n + 1$, donc $n \wedge (2n+1) = n \wedge 1 = 1$. Le PPCM vaut donc $n(2n+1)$.

? $a \wedge b = d$. Que vaut $\mathrm{PGCD}(13a + 5b,\ 5a + 2b)$ ?
indice: Le déterminant 13·2 − 5·5 vaut 1.
= Soit $\delta$ ce PGCD. $\delta$ divise $x = 13a + 5b$ et $y = 5a + 2b$, donc $2x - 5y = a$ et $13y - 5x = b$ : $\delta \mid d$. Inversement $d \mid x$ et $d \mid y$. Donc $\delta = d$.

? Montre que le carré de tout entier naturel est de la forme $5n - 1$, $5n$ ou $5n + 1$.
= On écrit $a = 5q + r$, $r \in \{0,\dots,4\}$. $a^2 \equiv r^2 \pmod 5$ et $r^2 \in \{0, 1, 4, 9, 16\} \equiv \{0, 1, -1, -1, 1\}$. Donc $a^2 \equiv 0$ ou $\pm 1 \pmod 5$.
```

## Flashcards

```cartes
$a \wedge b = b \wedge r$ si… :: $a = bq + r$ (théorème d'Euclide).
Le PGCD par Euclide :: Le dernier reste non nul.
Théorème de Bézout :: $a \wedge b = 1 \iff \exists u, v,\ au + bv = 1$.
Lemme de Gauss :: $a \mid bc$ et $a \wedge b = 1 \Rightarrow a \mid c$.
Lien PGCD-PPCM :: $(a \wedge b)(a \vee b) = |ab|$.
Couple de Bézout pour 22 et 17 :: $1 = 7 \times 22 - 9 \times 17$.
PGCD par les facteurs premiers :: Produit des $p^{\min(\nu_p(a), \nu_p(b))}$.
Pourquoi une infinité de premiers ? :: Si $n$ était le plus grand, un diviseur premier de $n! + 1$ serait $\le n$ et diviserait 1.
```

## QCM du chapitre

```qcm
? $366 \wedge 43$ vaut :
+ 1
- 43
- 22
= Euclide : restes 22, 21, 1, 0 (exemple 17).

? Le reste de la division euclidienne de $-7$ par $3$ est :
- $-1$
+ $2$
- $1$
= $-7 = 3 \times (-3) + 2$ avec $0 \le 2 < 3$.

? Si $a \mid bc$ et $a \wedge b = 1$, alors :
+ $a \mid c$
- $a \mid b$
- $a = c$
= C'est le lemme de Gauss.

? $12 \vee 18$ (PPCM) vaut :
- 6
+ 36
- 216
= $12 \wedge 18 = 6$ et $6 \times \mathrm{PPCM} = 216$.

? $1 = 7 \times 22 - 9 \times 17$ montre que :
+ $22 \wedge 17 = 1$
- $22 \wedge 17 = 7$
- $22$ divise $17$
= Bézout : une combinaison égale à 1 prouve que le PGCD vaut 1.

? Les solutions entières de $11x + 16y = 0$ sont :
+ $(16k, -11k)$, $k \in \mathbb Z$
- $(11k, -16k)$
- seulement $(0, 0)$
= $16 \mid 11x$ et $16 \wedge 11 = 1$, donc $16 \mid x$.

? Si $a \mid b$ et $a \mid c$, alors :
- $a \mid bc$ seulement
+ $a \mid 3b - 5c$
- $b \mid c$
= $a$ divise toute combinaison $k_1 b + k_2 c$.

? $\mathrm{PGCD}(2n+2, 4n+2)$ vaut :
- 1
+ 2
- $2n + 2$
= $= 2 \cdot \mathrm{PGCD}(n+1, 2n+1) = 2 \cdot \mathrm{PGCD}(n+1, 1) = 2$, car $2n+1 = 2(n+1) - 1$.

? $360 = 2^3 \cdot 3^2 \cdot 5$ et $84 = 2^2 \cdot 3 \cdot 7$. Leur PGCD vaut :
+ 12
- 6
- 2520
= On prend les plus petits exposants : $2^2 \cdot 3$.

? Un carré d'entier peut-il être de la forme $5n + 2$ ?
- oui
+ non
- seulement si l'entier est pair
= Les carrés modulo 5 sont 0, 1 ou 4.
```

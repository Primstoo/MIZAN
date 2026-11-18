---
id: revision
titre: Révision et examen blanc
seance: Fin de semestre
importance: 5
---

## Fiche de révision

```grille Les méthodes à savoir refaire sans notes
#cols: question méthode
#rows: 1 2 3 4 5 6 7 8
nier_une_phrase *∀↔∃,_nier_la_fin
injective? *f(x)=f(x')⇒x=x'
équivalence? *réfl.,_sym.,_trans.
PGCD *Euclide,_dernier_reste_non_nul
ax+by=c *Bézout_puis_Gauss
sous-groupe? *e∈H,_stable_loi_et_inverse
multiplicité *P(a)=…=P^(m−1)(a)=0
éléments_simples *partie_entière_puis_pôles
```

> [!attention] Aucune annale d'Algèbre 1 n'a été fournie. L'examen blanc ci-dessous imite le style du polycopié et des TD (2 h, sans calculatrice, à titre indicatif). Le vrai barème et le format sont à demander au prof.

## Examen blanc (2 heures)

```exercice Exercice 1 · Logique et ensembles (4 points)
? (a) Écris la négation de : $\forall \varepsilon > 0,\ \exists N \in \mathbb N,\ \forall n \ge N,\ |u_n| < \varepsilon$. (b) Montre par récurrence que $\sum_{k=1}^n k = \frac{n(n+1)}2$.
= (a) $\exists \varepsilon > 0,\ \forall N \in \mathbb N,\ \exists n \ge N,\ |u_n| \ge \varepsilon$.
(b) $n = 1$ : $1 = 1$. Si vrai au rang $n$, $\sum_{k=1}^{n+1} k = \frac{n(n+1)}2 + n + 1 = \frac{(n+1)(n+2)}2$. Vrai pour tout $n \ge 1$.
```

```exercice Exercice 2 · Applications et relations (4 points)
? (a) $f : \mathbb R \setminus \{1\} \to \mathbb R \setminus \{1\}$, $f(x) = \frac{x+1}{x-1}$. Montre que $f$ est bijective et calcule $f^{-1}$. (b) Sur $\mathbb R$, $x \mathcal R y \iff x^2 - y^2 = x - y$. Est-ce une équivalence ? Donne la classe de $2$.
indice: (a) Résous y = f(x). (b) x² − x = y² − y.
= (a) $y = \frac{x+1}{x-1} \iff y(x - 1) = x + 1 \iff x(y - 1) = y + 1 \iff x = \frac{y+1}{y-1}$ (avec $y \neq 1$, et on vérifie $x \neq 1$). Chaque $y$ a un unique antécédent : bijective, et $f^{-1} = f$ (involution).
(b) $x \mathcal R y \iff g(x) = g(y)$ avec $g(t) = t^2 - t$ : c'est réflexif, symétrique, transitif (égalité des images). $\mathrm{Cl}(2) = \{y \mid y^2 - y = 2\} = \{2, -1\}$.
```

```exercice Exercice 3 · Arithmétique (4 points)
? (a) Calcule $\mathrm{PGCD}(252, 198)$ et un couple de Bézout. (b) Résous $252x + 198y = 36$ dans $\mathbb Z^2$.
= (a) $252 = 198 + 54$ ; $198 = 3 \times 54 + 36$ ; $54 = 36 + 18$ ; $36 = 2 \times 18$. PGCD $= 18$. En remontant : $18 = 54 - 36 = 54 - (198 - 3 \cdot 54) = 4 \cdot 54 - 198 = 4(252 - 198) - 198 = 4 \cdot 252 - 5 \cdot 198$.
(b) On divise par 18 : $14x + 11y = 2$. Solution particulière : $(8, -10)$ (deux fois $(4, -5)$). Puis $14(x - 8) = -11(y + 10)$, $14 \wedge 11 = 1$ : $x = 8 + 11k$, $y = -10 - 14k$, $k \in \mathbb Z$.
```

```exercice Exercice 4 · Structures (4 points)
? $G = \{x + y\sqrt3 \mid x, y \in \mathbb Q\} \setminus \{0\}$. Montre que $(G, \times)$ est un sous-groupe de $(\mathbb R^*, \times)$.
indice: Pour l'inverse, multiplie par le conjugué x − y√3.
= $G \subseteq \mathbb R^*$ ; $1 = 1 + 0\sqrt3 \in G$. Produit : $(x + y\sqrt3)(x' + y'\sqrt3) = (xx' + 3yy') + (xy' + yx')\sqrt3$, non nul comme produit de réels non nuls. Inverse : $\frac{1}{x + y\sqrt3} = \frac{x - y\sqrt3}{x^2 - 3y^2}$ ; le dénominateur est non nul car $\sqrt3 \notin \mathbb Q$ (si $x^2 = 3y^2$ avec $y \neq 0$, alors $\sqrt3 = |x/y|$ serait rationnel ; si $y = 0$, $x \neq 0$). Donc l'inverse est dans $G$.
```

```exercice Exercice 5 · Polynômes et fractions (4 points)
? (a) Montre que 1 est racine double de $P = X^3 - 3X + 2$ et factorise $P$. (b) Décompose $\frac{1}{P}$ en éléments simples.
= (a) $P(1) = 0$, $P'(1) = 3 - 3 = 0$, $P''(1) = 6 \neq 0$ : racine double. $P = (X - 1)^2(X + 2)$.
(b) $\frac1P = \frac{a}{X+2} + \frac{b}{X-1} + \frac{c}{(X-1)^2}$. $a = \frac{1}{(-3)^2} = \frac19$, $c = \frac{1}{3}$. En $x = 0$ : $\frac12 = \frac{a}{2} - b + c$, donc $b = \frac1{18} + \frac13 - \frac12 = -\frac19$.
$\frac{1}{P} = \frac{1}{9(X+2)} - \frac{1}{9(X-1)} + \frac{1}{3(X-1)^2}$.
```

## Flashcards

```cartes
Négation de « $\forall \varepsilon\ \exists N\ \forall n\ |u_n| < \varepsilon$ » :: $\exists \varepsilon\ \forall N\ \exists n \ge N,\ |u_n| \ge \varepsilon$.
$x \mathcal R y \iff g(x) = g(y)$ est toujours… :: une relation d'équivalence.
$\mathrm{PGCD}(252, 198)$ :: 18.
Inverse de $x + y\sqrt3$ :: $\frac{x - y\sqrt3}{x^2 - 3y^2}$.
$\frac{1}{(X-1)^2(X+2)}$, coefficient de $\frac{1}{(X-1)^2}$ :: $\frac13$.
Ordre de rédaction d'une récurrence :: Initialisation, hérédité, conclusion (le $\forall n$ seulement à la fin).
```

## QCM de révision

```qcm
? La contraposée de $P \Rightarrow Q$ est :
+ $\neg Q \Rightarrow \neg P$
- $Q \Rightarrow P$
- $\neg P \Rightarrow \neg Q$
= Elle a la même valeur logique que $P \Rightarrow Q$.

? $f : \mathbb N \to \mathbb N,\ n \mapsto 2n$ est :
+ injective non surjective
- surjective non injective
- bijective
= Les impairs n'ont pas d'antécédent.

? $\mathrm{PGCD}(252, 198)$ vaut :
- 6
+ 18
- 36
= $252 = 2^2 3^2 7$, $198 = 2 \cdot 3^2 \cdot 11$ : $2 \cdot 9 = 18$.

? $14x + 11y = 2$ a des solutions entières car :
+ $14 \wedge 11 = 1$ divise 2
- 14 et 11 sont pairs
- 2 est premier
= $ax + by = c$ a des solutions ssi $a \wedge b \mid c$.

? Lequel n'est **pas** un groupe ?
- $(\mathbb Z, +)$
+ $(\mathbb Z, \times)$
- $(\mathbb Q^*, \times)$
= 2 n'a pas d'inverse dans $\mathbb Z$.

? Dans $\mathbb Z/6\mathbb Z$, $2 \times 3$ vaut :
+ 0
- 6
- 5
= $6 \equiv 0$ : 2 et 3 sont diviseurs de zéro.

? La multiplicité de $-2$ dans $(X-1)^2(X+2)$ est :
+ 1
- 2
- 3
= Le facteur $(X + 2)$ apparaît une fois.

? La partie entière de $\frac{X^2}{X - 1}$ est :
+ $X + 1$
- $X$
- $1$
= $X^2 = (X - 1)(X + 1) + 1$.

? $\mathbb U$ est un sous-groupe de :
+ $(\mathbb C^*, \times)$
- $(\mathbb C, +)$
- $(\mathbb R, +)$
= Ses éléments sont de module 1 ; $0 \notin \mathbb U$.

? « $\forall n \in \mathbb N,\ (n$ pair ou $n$ impair$)$ » et « ($\forall n$, $n$ pair) ou ($\forall n$, $n$ impair) » :
- sont équivalentes
+ ne sont pas équivalentes : la première est vraie, la seconde fausse
- sont toutes deux fausses
= On ne distribue pas $\forall$ sur « ou ».
```

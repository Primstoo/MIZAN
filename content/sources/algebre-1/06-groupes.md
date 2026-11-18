---
id: groupes
titre: Lois de composition interne et groupes
seance: Chapitre 4 · §4.1 à 4.4 du polycopié
importance: 5
---

## Avant de commencer

Il te faut savoir prouver un « pour tout » et connaître les applications bijectives (chapitre 3).

```exercice Vérifie ton prérequis
? La soustraction est-elle associative sur $\mathbb Z$ ?
= Non : $(5 - 3) - 1 = 1$ mais $5 - (3 - 1) = 3$.
```

## Comment aborder ce chapitre

> [!astuce] **Un groupe, c'est une liste de contrôle.** Loi interne, associative, neutre, inverses. Coche les quatre cases dans l'ordre. Pour un sous-groupe, on a un raccourci qui évite l'associativité.

> [!piege] Chercher des inverses **avant** d'avoir trouvé le neutre. Sans neutre, la notion d'inverse n'a pas de sens (remarque 32).

À la fin, tu sais montrer qu'un ensemble est un groupe, un sous-groupe, et qu'une application est un morphisme.

## Idée 1 · Loi de composition interne et ses propriétés

Une lci sur $E$ est une application $E \times E \to E$, notée $(a, b) \mapsto a \star b$. Elle peut être commutative, associative, avoir un neutre $e$ (unique s'il existe), et des éléments inversibles.

```grille Exemples du cours
#cols: loi assoc. comm. neutre
#rows: (N,+) (Z,×) (F(R,R),∘) (P(G),∪)
+ *oui *oui 0
× *oui *oui 1
∘ *oui !non id
∪ *oui *oui ∅
```

**Exemple (exercice 32 du polycopié).** Sur $\mathbb R^2$ : $(x, y) \star (x', y') = (xx' - yy',\ xy' + yx')$. C'est le produit des complexes $x + iy$ ! Donc $\star$ est commutative, associative, de neutre $(1, 0)$.

Inverse d'un produit : $(a \star b)^{-1} = b^{-1} \star a^{-1}$ (l'ordre s'inverse).

## Idée 2 · Groupe

```flux Les quatre axiomes
lci -> associative -> neutre e -> tout x a un inverse
```

Si en plus la loi est commutative, le groupe est **abélien**. Groupes de référence : $(\mathbb Z, +)$, $(\mathbb R^*, \times)$, $(\mathbb U, \times)$, $(\mathcal S_E, \circ)$ (non abélien si $\mathrm{card}\,E \ge 3$).

**Contre-exemples.** $(\mathbb N, +)$ : seul 0 a un opposé. $(\mathbb Z, \times)$ : seuls $\pm 1$ sont inversibles.

> [!attention] Le polycopié écrit (remarque 36) que $(\mathcal S_E, \circ)$ est non abélien « si $E$ est non vide ». C'est faux pour $\mathrm{card}\,E \le 2$ : il faut au moins 3 éléments.

## Idée 3 · Sous-groupe : le test en 4 étapes

```etapes H est un sous-groupe de (G, ⋆)
Partie :: $H \subseteq G$.
Neutre :: $e_G \in H$.
Stable par la loi :: $\forall x, y \in H,\ x \star y \in H$.
Stable par inverse :: $\forall x \in H,\ x^{-1} \in H$. Pas besoin de vérifier l'associativité.
```

**Exemple.** $\mathbb U = \{z \in \mathbb C \mid |z| = 1\}$ dans $(\mathbb C^*, \times)$ : $|1| = 1$ ; $|zz'| = |z||z'| = 1$ ; $|1/z| = 1/|z| = 1$. Sous-groupe.

**Contre-exemple.** $2\mathbb Z + 1$ (les impairs) ne contient pas 0 : pas un sous-groupe de $(\mathbb Z, +)$.

Les sous-groupes de $(\mathbb Z, +)$ sont exactement les $n\mathbb Z$ (exercice 34).

## Idée 4 · Morphismes de groupes

$f : (G_1, \star) \to (G_2, \cdot)$ est un morphisme si $f(x \star y) = f(x) \cdot f(y)$ pour tous $x, y$. Alors $f(e_1) = e_2$ et $f(x^{-1}) = f(x)^{-1}$.

**Exemple.** $\exp : (\mathbb R, +) \to (\mathbb R_+^*, \times)$, car $e^{x+y} = e^x e^y$. Autre : $n \mapsto a^n$ de $(\mathbb Z, +)$ dans $(G, \cdot)$ (exemple 31), et $\theta \mapsto e^{i\theta}$ de $(\mathbb R, +)$ dans $(\mathbb U, \times)$.

> [!piege] $(ab)^n = a^n b^n$ n'est vrai que si $a$ et $b$ commutent (remarque 39).

## S'exercer

```exercice Exercices du polycopié et du TD 3
? Montre que le centre $C = \{x \in G \mid \forall g,\ gx = xg\}$ est un sous-groupe de $G$.
= $C \subseteq G$ ; $e \in C$ car $ge = eg = g$. Si $x, y \in C$ : $g(xy) = (gx)y = x(gy) = x(yg) = (xy)g$, donc $xy \in C$. Si $x \in C$ : de $gx = xg$, on multiplie par $x^{-1}$ à gauche et à droite : $x^{-1}g = gx^{-1}$, donc $x^{-1} \in C$.

? Soit $G$ un groupe. Montre que $f(x) = x^{-1}$ est un morphisme si et seulement si $G$ est abélien.
= $f(xy) = (xy)^{-1} = y^{-1}x^{-1}$ et $f(x)f(y) = x^{-1}y^{-1}$. Si $G$ est abélien, ils sont égaux. Réciproquement, si $f$ est un morphisme, $y^{-1}x^{-1} = x^{-1}y^{-1}$ pour tous $x, y$ ; en passant à l'inverse, $xy = yx$. De plus $f$ est une involution, donc bijective : c'est un isomorphisme.

? Pour la loi $(x,y) \star (x',y') = (xx' - yy', xy' + yx')$, quel est l'inverse de $(0, 2)$ ?
indice: (0, 2) correspond à 2i.
= $1/(2i) = -i/2$, donc $(0, -\tfrac12)$. Vérif : $(0 \cdot 0 - 2 \cdot (-\tfrac12),\ 0) = (1, 0)$.
```

## Flashcards

```cartes
Les quatre axiomes d'un groupe :: Loi interne, associative, neutre, tout élément inversible.
Groupe abélien :: Groupe dont la loi est commutative.
Test du sous-groupe :: $H \subseteq G$, $e \in H$, stable par la loi, stable par inverse.
$(a \star b)^{-1}$ :: $b^{-1} \star a^{-1}$.
Morphisme de groupes :: $f(x \star y) = f(x) \cdot f(y)$.
Un morphisme envoie le neutre sur… :: le neutre : $f(e_1) = e_2$.
Sous-groupes de $(\mathbb Z, +)$ :: Les $n\mathbb Z$, $n \in \mathbb N$.
Pourquoi $2\mathbb Z + 1$ n'est pas un sous-groupe ? :: Il ne contient pas le neutre 0.
```

## QCM du chapitre

```qcm
? $(\mathbb N, +)$ est-il un groupe ?
- oui
+ non, seul 0 a un opposé dans $\mathbb N$
- non, + n'est pas associative
= $-1 \notin \mathbb N$.

? Le neutre de $(\mathcal P(G), \cup)$ est :
+ $\emptyset$
- $G$
- il n'y en a pas
= $A \cup \emptyset = A$.

? Dans un groupe, $(ab)^{-1}$ vaut :
- $a^{-1}b^{-1}$
+ $b^{-1}a^{-1}$
- $ab$
= $(ab)(b^{-1}a^{-1}) = e$.

? Pour montrer qu'une partie $H$ est un sous-groupe, on n'a pas besoin de vérifier :
+ l'associativité
- que $e \in H$
- la stabilité par inverse
= Elle est héritée de $G$.

? $(\mathbb U, \times)$ est :
+ un sous-groupe de $(\mathbb C^*, \times)$
- un sous-groupe de $(\mathbb C, +)$
- pas un groupe
= Module 1 stable par produit et inverse.

? $\exp : (\mathbb R, +) \to (\mathbb R_+^*, \times)$ est un morphisme car :
- $e^{xy} = e^x + e^y$
+ $e^{x+y} = e^x e^y$
- $e^0 = 0$
= La loi de départ est $+$, celle d'arrivée $\times$.

? $(\mathbb Z, \times)$ :
- est un groupe
+ n'est pas un groupe : seuls $1$ et $-1$ sont inversibles
- n'a pas de neutre
= $2$ n'a pas d'inverse dans $\mathbb Z$.

? La loi $(x,y)\star(x',y') = (xx'-yy', xy'+yx')$ a pour neutre :
- $(0, 0)$
+ $(1, 0)$
- $(1, 1)$
= C'est le produit des complexes ; le neutre est $1 = (1, 0)$.

? Dans un groupe non abélien, $(ab)^2$ vaut :
- toujours $a^2 b^2$
+ $abab$, différent de $a^2b^2$ en général
- $e$
= $a^2b^2 = abab$ équivaut à $ab = ba$.

? Le neutre d'un magma, s'il existe, est :
+ unique
- jamais unique
- unique seulement si la loi est commutative
= Si $e$ et $e'$ sont neutres, $e = e \star e' = e'$.
```

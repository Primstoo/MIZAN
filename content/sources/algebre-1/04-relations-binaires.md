---
id: relations-binaires
titre: Relations d'équivalence et relations d'ordre
seance: Chapitre 2 · §2.3 du polycopié
importance: 4
---

## Avant de commencer

Il te faut les quantificateurs et la notion de produit cartésien $E \times E$.

```exercice Vérifie ton prérequis
? Dans $\mathbb Z$, $7 - 1$ appartient-il à $2\mathbb Z$ ?
reponse: oui
= Oui : $6 = 2 \times 3$.
```

## Comment aborder ce chapitre

> [!astuce] **Quatre propriétés, deux recettes.** Réflexive + symétrique + transitive = **équivalence** (on regroupe). Réflexive + antisymétrique + transitive = **ordre** (on classe).

> [!piege] Croire qu'« antisymétrique » est le contraire de « symétrique ». L'égalité est les deux à la fois ; « divise » sur $\mathbb Z$ n'est ni l'un ni l'autre ($2 \mid -2$ et $-2 \mid 2$ mais $2 \neq -2$).

À la fin, tu sais reconnaître une relation d'équivalence, décrire ses classes, et parler de majorant, maximum, ordre total ou partiel.

## Idée 1 · Les quatre propriétés

```grille Qui a quoi ? (orange = oui)
#cols: réflexive symétrique antisym. transitive
#rows: x≤y_(R) x−y∈2Z A⊆B a∣b_(Z)
*oui non *oui *oui
*oui *oui non *oui
*oui non *oui *oui
*oui non non *oui
```

- Réflexive : $\forall x,\ x\mathcal R x$. Symétrique : $x \mathcal R y \Rightarrow y \mathcal R x$.
- Antisymétrique : $x\mathcal R y$ et $y \mathcal R x \Rightarrow x = y$. Transitive : $x\mathcal R y$ et $y \mathcal R z \Rightarrow x \mathcal R z$.

## Idée 2 · Équivalence et classes : une partition

```html
<svg viewBox="0 0 520 120" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Z découpé en cinq classes modulo 5">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="10" y="20" width="92" height="70" rx="8" fill="#D9824F" fill-opacity="0.2" stroke="currentColor"/><text x="56" y="45">Cl(0)</text><text x="56" y="70">…,−5,0,5,10…</text>
<rect x="112" y="20" width="92" height="70" rx="8" fill="none" stroke="currentColor"/><text x="158" y="45">Cl(1)</text><text x="158" y="70">…,−4,1,6…</text>
<rect x="214" y="20" width="92" height="70" rx="8" fill="#D9824F" fill-opacity="0.2" stroke="currentColor"/><text x="260" y="45">Cl(2)</text><text x="260" y="70">…,−3,2,7…</text>
<rect x="316" y="20" width="92" height="70" rx="8" fill="none" stroke="currentColor"/><text x="362" y="45">Cl(3)</text><text x="362" y="70">…,−2,3,8…</text>
<rect x="418" y="20" width="92" height="70" rx="8" fill="#D9824F" fill-opacity="0.2" stroke="currentColor"/><text x="464" y="45">Cl(4)</text><text x="464" y="70">…,−1,4,9…</text>
<text x="260" y="112">Les classes sont non vides, disjointes, et leur réunion est Z</text></g>
</svg>
```

Classe de $a$ : $\mathrm{Cl}(a) = \{x \in E \mid x \mathcal R a\}$. Théorème 13 : $\mathrm{Cl}(a) = \mathrm{Cl}(b) \iff a \mathcal R b$, et les classes forment une **partition** de $E$.

**Exemple (congruence modulo 5).** $x \equiv y \pmod 5 \iff 5 \mid x - y$. $\mathrm{Cl}(n) = \{n + 5k \mid k \in \mathbb Z\}$ ; il y a exactement 5 classes. $17 \in \mathrm{Cl}(2)$ car $17 - 2 = 15$.

```etapes Montrer que la congruence modulo n est une équivalence
Réflexive :: $x - x = 0 = 0 \cdot n$.
Symétrique :: si $x - y = kn$, alors $y - x = (-k)n$.
Transitive :: si $x - y = kn$ et $y - z = k'n$, alors $x - z = (k + k')n$.
Conclusion :: c'est une relation d'équivalence.
```

## Idée 3 · Ordre, majorant, maximum

Un **ordre** est réflexif, antisymétrique, transitif. Il est **total** si deux éléments sont toujours comparables ($\le$ sur $\mathbb R$), **partiel** sinon ($\subseteq$ sur $\mathcal P(E)$ : $\{1\}$ et $\{2\}$ ne sont pas comparables).

- $M$ **majorant** de $A$ : $\forall x \in A,\ x \le M$ ($M$ n'est pas forcément dans $A$).
- **Maximum** : un majorant qui appartient à $A$. Il est unique. $[0 ; 1[$ est majoré par 1 mais n'a pas de maximum.

> [!attention] Deux coquilles du polycopié. (1) Ordre lexicographique : il faut lire $(x,y) \le (x',y') \iff x < x'$ **ou** ($x = x'$ et $y \le y'$) ; avec « $x \le x'$ » la relation n'est pas antisymétrique. (2) $(\mathcal P(E), \subseteq)$ est partiellement ordonné dès que $\mathrm{card}(E) \ge 2$ (et pas « $> 2$ »).

> [!piege] Pour un ordre partiel, la négation de $x \le y$ n'est **pas** $x > y$ : $x$ et $y$ peuvent être non comparables.

## S'exercer

```exercice Exercices du polycopié
? Montre que le maximum d'une partie $A$, s'il existe, est unique.
= Si $a$ et $a'$ sont deux maximums, $a' \le a$ (car $a$ majore $A$ et $a' \in A$) et $a \le a'$. Par antisymétrie, $a = a'$.

? Dans $\mathbb Z$, on pose $x \mathcal S y \iff x - y \in 2\mathbb Z$. Combien de classes ?
reponse: 2
= Deux : les pairs $\mathrm{Cl}(0)$ et les impairs $\mathrm{Cl}(1)$.
```

## Flashcards

```cartes
Relation d'équivalence :: Réflexive, symétrique, transitive.
Relation d'ordre :: Réflexive, antisymétrique, transitive.
Antisymétrique :: $x \mathcal R y$ et $y\mathcal R x \Rightarrow x = y$.
$\mathrm{Cl}(a) = \mathrm{Cl}(b)$ équivaut à… :: $a \mathcal R b$.
Les classes d'équivalence forment… :: une partition de $E$ (non vides, disjointes, réunion $= E$).
Ordre total :: Deux éléments sont toujours comparables.
Majorant ou maximum ? :: Un maximum est un majorant qui appartient à la partie.
Nombre de classes modulo $n$ dans $\mathbb Z$ :: $n$ : celles de $0, 1, \dots, n-1$.
```

## QCM du chapitre

```qcm
? $\le$ sur $\mathbb R$ est :
+ une relation d'ordre total
- une relation d'équivalence
- une relation d'ordre partiel
= Réflexive, antisymétrique, transitive, et deux réels sont toujours comparables.

? L'inclusion sur $\mathcal P(\{1,2\})$ est :
- un ordre total
+ un ordre partiel
- une équivalence
= $\{1\}$ et $\{2\}$ ne sont pas comparables.

? « $x - y \in 2\mathbb Z$ » sur $\mathbb Z$ est :
+ une relation d'équivalence
- une relation d'ordre
- ni l'une ni l'autre
= Réflexive, symétrique, transitive (exemple 13).

? $17$ et $2$ sont-ils dans la même classe modulo 5 ?
+ oui
- non
- on ne peut pas savoir
= $17 - 2 = 15 = 3 \times 5$.

? La relation « divise » sur $\mathbb Z$ est :
- une relation d'ordre
- une relation d'équivalence
+ ni l'une ni l'autre
= Elle n'est ni symétrique, ni antisymétrique ($2 \mid -2$ et $-2 \mid 2$).

? Deux classes d'équivalence distinctes sont :
- incluses l'une dans l'autre
+ disjointes
- égales
= Elles forment une partition.

? $[0 ; 1[$ dans $\mathbb R$ :
- a un maximum égal à 1
+ est majoré mais n'a pas de maximum
- n'est pas majoré
= $1$ majore mais n'appartient pas à l'ensemble.

? Une relation à la fois symétrique et antisymétrique peut-elle exister ?
+ oui, l'égalité par exemple
- non, c'est contradictoire
- seulement sur un ensemble vide
= Antisymétrique n'est pas la négation de symétrique.

? Dans un ordre partiel, la négation de $x \le y$ est :
- $x > y$
+ $x$ et $y$ non comparables, ou $y < x$
- $x = y$
= Remarque 22 du polycopié.

? L'ordre lexicographique correct sur $\mathbb R^2$ est :
- $x \le x'$ ou ($x = x'$ et $y \le y'$)
+ $x < x'$ ou ($x = x'$ et $y \le y'$)
- $x \le x'$ et $y \le y'$
= Avec $x \le x'$, on aurait $(0,1) \le (0,0)$ et $(0,0) \le (0,1)$ : pas antisymétrique. La troisième est l'ordre produit, partiel.
```

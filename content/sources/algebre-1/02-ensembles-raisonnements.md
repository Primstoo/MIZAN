---
id: ensembles-raisonnements
titre: Ensembles et types de raisonnement
seance: Chapitre 1 · §1.2 à 1.5 du polycopié
importance: 5
---

## Avant de commencer

Il te faut le chapitre précédent : implication, contraposée et négation d'une phrase avec $\forall$ et $\exists$.

```exercice Vérifie ton prérequis
? Écris la contraposée de « si $x^2 \neq 4$, alors $x \neq 2$ ».
indice: ¬B ⇒ ¬A.
= « Si $x = 2$, alors $x^2 = 4$ », qui est évidente. Prouver la contraposée suffit (exercice 19.1 du polycopié).
```

## Comment aborder ce chapitre

> [!astuce] **Choisis le raisonnement selon la forme de la phrase.** $\exists$ : un exemple. $\forall$ : « Soit $x$ quelconque ». $\Rightarrow$ : direct ou contraposée. Propriété sur tous les entiers : récurrence. « Trouver toutes les solutions » : analyse-synthèse.

> [!piege] Confondre $\in$ et $\subseteq$. On écrit $2 \in [0 ; 2]$ (un élément) mais $\{2\} \subseteq [0 ; 2]$ (un ensemble). Et $\{2\} \in [0 ; 2]$ n'a aucun sens.

À la fin, tu sais manipuler réunion, intersection et produit cartésien, et rédiger les six types de preuves du cours.

## Idée 1 · Décrire et comparer des ensembles

Un ensemble s'écrit **en extension** (on liste : $\{2, 4, 6\}$) ou **en compréhension** (une propriété : $\{x \in \mathbb R \mid x^2 = 4\} = \{-2, 2\}$).

```html
<svg viewBox="0 0 420 160" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Deux ensembles A et B qui se chevauchent : la zone commune est l'intersection, le tout est la réunion">
<circle cx="160" cy="80" r="65" fill="#D9824F" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
<circle cx="260" cy="80" r="65" fill="#D9824F" fill-opacity="0.15" stroke="currentColor" stroke-width="2"/>
<path d="M210 38 A65 65 0 0 1 210 122 A65 65 0 0 1 210 38 Z" fill="#D9824F" fill-opacity="0.6"/>
<g font-family="sans-serif" font-size="14" fill="currentColor" font-weight="700">
<text x="120" y="85">A</text><text x="290" y="85">B</text><text x="196" y="85" font-size="12">A∩B</text></g>
</svg>
```

- $A \subseteq B$ : $\forall x \in A,\ x \in B$. Égalité : $A \subseteq B$ **et** $B \subseteq A$ (double inclusion).
- $x \in A \cup B \iff x \in A$ ou $x \in B$ ; $x \in A \cap B \iff x \in A$ et $x \in B$.
- $B \setminus A$ : les éléments de $B$ qui ne sont pas dans $A$. Ex. $\mathbb R^* = \mathbb R \setminus \{0\}$.
- $E \times F$ : les couples $(x, y)$ avec $x \in E$, $y \in F$. Dans un couple, **l'ordre compte** : $(2, 3) \neq (3, 2)$ mais $\{2, 3\} = \{3, 2\}$.

**Exemple chiffré.** $A = \{1, 2\}$, $B = \{a, b, c\}$ : $\mathrm{card}(A \times B) = 2 \times 3 = 6$.

## Idée 2 · Démontrer un $\forall$, un $\exists$, une implication

```etapes Rédiger une preuve de « ∀x ∈ E, A(x) »
On fixe l'objet :: « Soit $x \in E$ quelconque. »
On démontre A(x) :: avec des mots : donc, alors, par conséquent.
On conclut :: « Ceci étant vrai pour tout $x \in E$, on a montré $\forall x \in E,\ A(x)$. »
Pour un ∃ :: un seul exemple bien choisi suffit. Pour réfuter un ∀, un seul contre-exemple suffit.
```

**Exemple (exercice 4.2 du polycopié).** Montrer $xy \le \frac12 (x^2 + y^2)$. Soient $x, y$ réels. $x^2 + y^2 - 2xy = (x - y)^2 \ge 0$, donc $2xy \le x^2 + y^2$. Vrai pour tous $x, y$.

Pour $P \Rightarrow Q$ : soit « Supposons $P$… donc $Q$ », soit la contraposée « Supposons $\neg Q$… donc $\neg P$ ». Pour $P \Leftrightarrow Q$ : double implication.

## Idée 3 · L'absurde et l'analyse-synthèse

**Absurde.** On suppose $P$ fausse et on arrive à une contradiction.

```etapes √2 est irrationnel (exercice 20 du polycopié)
On suppose le contraire :: $\sqrt 2 = p/q$ avec $p, q$ entiers, $q \neq 0$, fraction irréductible.
On élève au carré :: $p^2 = 2q^2$, donc $p^2$ est pair, donc $p$ est pair : $p = 2k$.
On remplace :: $4k^2 = 2q^2$, donc $q^2 = 2k^2$ : $q$ est pair aussi.
Contradiction :: $p$ et $q$ pairs, alors que la fraction était irréductible. Donc $\sqrt 2 \notin \mathbb Q$.
```

**Analyse-synthèse** (pour « trouver **tous** les objets qui vérifient… ») :

```flux Trois temps
Analyse : soit f une solution, on trouve sa forme -> Construction : on pose les candidats -> Synthèse : on vérifie qu'ils marchent
```

**Exemple (exercice 21.4).** Résoudre $\sqrt{x + 4} + \sqrt{x + 2} = \frac12$. Analyse : $(\sqrt{x+4} + \sqrt{x+2})(\sqrt{x+4} - \sqrt{x+2}) = 2$, donc $\sqrt{x+4} - \sqrt{x+2} = 4$. En additionnant : $2\sqrt{x+4} = \frac92$, $x + 4 = \frac{81}{16}$, $x = \frac{17}{16}$. Synthèse : $\sqrt{x + 2} = \sqrt{49/16} = \frac74$ et $\sqrt{x+4} = \frac94$, dont la somme vaut $4 \neq \frac12$. **Aucune solution.** Sans la synthèse, on aurait donné une fausse réponse !

## Idée 4 · La récurrence sous ses trois formes

```grille Trois récurrences
#cols: forme initialisation hérédité
#rows: simple ordre_2 forte
. P(0) *P(n)⇒P(n+1)
. P(0),P(1) *P(n),P(n+1)⇒P(n+2)
. P(0) *P(0..n)⇒P(n+1)
```

**Exemple (exercice 23).** $u_0 = u_1 = 1$, $u_{n+2} = u_{n+1} + u_n$. Montrer $u_n \ge n$ pour tout $n$… mais attention :

> [!attention] Le polycopié demande « $u_n > n$ », qui est **faux** pour $n = 1$ ($u_1 = 1$). L'énoncé correct est $u_n \ge n$. Initialisation : $u_0 = 1 \ge 0$, $u_1 = 1 \ge 1$. Hérédité (ordre 2) : si $u_n \ge n$ et $u_{n+1} \ge n + 1$, alors $u_{n+2} \ge 2n + 1 \ge n + 2$ dès que $n \ge 1$ ; pour $n = 0$, $u_2 = 2 \ge 2$ directement.

> [!prof] Le symbole $\forall n$ ne doit figurer **que dans la conclusion**. Et si ton hérédité n'utilise pas l'hypothèse de récurrence, la récurrence était inutile.

## S'exercer

```exercice Exercices du polycopié
? Montre par récurrence que $2^n > n + 1$ pour tout entier $n \ge 2$.
indice: 2^(n+1) = 2·2^n.
= Initialisation : $2^2 = 4 > 3$. Hérédité : si $2^n > n + 1$ pour un $n \ge 2$, alors $2^{n+1} = 2 \cdot 2^n > 2n + 2 > n + 2$. Conclusion : vrai pour tout $n \ge 2$.

? Déterminer $\bigcup_{n \in \mathbb N} A_n$ et $\bigcap_{n \in \mathbb N} A_n$ pour $A_n = ]n ; n + 1[$.
indice: Ces intervalles sont disjoints deux à deux.
= La réunion est $\mathbb R_+ \setminus \mathbb N$ (les réels positifs non entiers). L'intersection est vide, car $A_0 \cap A_1 = \emptyset$.

? $\{2, 3\}$, $(2, 3)$ et $\{(2,3)\}$ sont-ils égaux à $\{3,2\}$, $(3,2)$, $\{(3,2)\}$ ?
= $\{2,3\} = \{3,2\}$ (un ensemble n'est pas ordonné). $(2,3) \neq (3,2)$ (couple ordonné). Donc $\{(2,3)\} \neq \{(3,2)\}$.
```

## Flashcards

```cartes
Différence entre $\in$ et $\subseteq$ :: $\in$ relie un élément à un ensemble ; $\subseteq$ relie deux ensembles. $2 \in [0;2]$, $\{2\} \subseteq [0;2]$.
Comment prouver $A = B$ entre ensembles ? :: Par double inclusion : $A \subseteq B$ et $B \subseteq A$.
Comment réfuter « $\forall x,\ A(x)$ » ? :: Avec un seul contre-exemple.
Les trois temps de l'analyse-synthèse :: Analyse (conditions nécessaires), construction des candidats, synthèse (on vérifie qu'ils conviennent).
Récurrence d'ordre 2 : l'initialisation :: Vérifier $P(0)$ **et** $P(1)$.
Récurrence forte : l'hérédité :: Si $P(0), \dots, P(n)$ sont vraies, alors $P(n+1)$ est vraie.
Couple ou paire ? :: Dans un couple $(x, y)$ l'ordre compte ; dans une paire $\{x, y\}$ non.
$\mathrm{card}(E \times F)$ :: $\mathrm{card}(E) \times \mathrm{card}(F)$.
```

## QCM du chapitre

```qcm
? Laquelle est correcte ?
- $\{2\} \in [0 ; 2]$
+ $\{2\} \subseteq [0 ; 2]$
- $2 \subseteq [0 ; 2]$
= Un singleton est un ensemble : il est **inclus**, pas élément.

? $\{x \in \mathbb R \mid x^2 = 4\}$ vaut :
- $\{2\}$
+ $\{-2, 2\}$
- $\{4\}$
= Les réels de carré 4 sont $2$ et $-2$.

? Pour montrer qu'un énoncé « $\exists x \in E,\ A(x)$ » est vrai, il suffit :
+ de donner un $x$ précis qui vérifie $A(x)$
- de vérifier $A(x)$ pour plusieurs $x$ puis de conclure pour tous
- de supposer $A(x)$ faux pour tout $x$
= Un exemple suffit pour un « il existe ».

? Pour réfuter « $\forall x \in E,\ A(x)$ », il suffit :
- de trouver des $x$ qui vérifient $A(x)$
+ de trouver un $x$ qui ne vérifie pas $A(x)$
- de montrer que $A(x)$ est vrai pour $x = 0$
= Un contre-exemple prouve la négation $\exists x,\ \neg A(x)$.

? Dans une preuve par l'absurde de « $P$ », on commence par :
- supposer $P$
+ supposer $\neg P$
- montrer la contraposée
= On suppose $P$ fausse et on cherche une contradiction.

? Pour la suite $u_{n+2} = u_{n+1} + u_n$, quelle récurrence est naturelle ?
- simple
+ d'ordre 2
- aucune
= Le rang $n+2$ dépend des **deux** rangs précédents.

? Lors d'une analyse-synthèse, la synthèse sert à :
- trouver la forme des solutions
+ vérifier que les candidats trouvés sont bien solutions
- prouver l'unicité par l'absurde
= L'analyse ne donne que des conditions nécessaires ; la synthèse vérifie qu'elles suffisent.

? $(2, 3) = (3, 2)$ ?
- oui
+ non
- seulement dans $\mathbb N^2$
= Dans un couple, l'ordre des composantes compte.

? Si $A \subseteq B$, alors $A \cup B$ vaut :
- $A$
+ $B$
- $A \cap B$
= Tout élément de $A$ est déjà dans $B$.

? Si $\mathrm{card}(E) = 3$ et $\mathrm{card}(F) = 4$, $\mathrm{card}(E \times F)$ vaut :
- 7
+ 12
- 81
= On forme $3 \times 4$ couples.
```

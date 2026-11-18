---
id: td-corriges
titre: TD 1, 2 et 3 corrigés
seance: Travaux dirigés · Faculté Polydisciplinaire, MIP
importance: 5
---

Les trois feuilles de TD du module, corrigées en entier. Cherche chaque exercice **au moins 15 minutes** avant d'ouvrir le corrigé.

> [!attention] Ce qui manque dans les supports : l'**exercice 5 du TD 2** est vide (seul le titre est imprimé), la **cible** de l'exercice 10 du TD 2 n'apparaît pas (on suppose deux zones à 15 et 8 points, cohérentes avec l'équation), et le nombre $\omega$ de l'exercice 1 du TD 3 est illisible (on traite un $\omega \in \mathbb C$ quelconque, la preuve ne dépend pas de sa valeur).

## TD 1 · Logique, ensembles, applications, relations

```exercice TD 1 · Récurrences
? **Ex. 1.** Montre que pour tout $n \ge 2$ : $1 + \frac1{2^2} + \dots + \frac1{n^2} > \frac{3n}{2n+1}$.
indice: Compare 3(n+1)/(2n+3) − 3n/(2n+1) à 1/(n+1)².
= Notons $S_n$ la somme. **Initialisation** : $S_2 = \frac54 = 1{,}25 > \frac65 = 1{,}2$.
**Hérédité** : supposons $S_n > \frac{3n}{2n+1}$ pour un $n \ge 2$. Alors $S_{n+1} > \frac{3n}{2n+1} + \frac1{(n+1)^2}$. Or
$\frac{3(n+1)}{2n+3} - \frac{3n}{2n+1} = \frac{3[(n+1)(2n+1) - n(2n+3)]}{(2n+1)(2n+3)} = \frac{3}{(2n+1)(2n+3)}$.
Et $(2n+1)(2n+3) - 3(n+1)^2 = n^2 + 2n > 0$, donc $\frac{1}{(n+1)^2} > \frac{3}{(2n+1)(2n+3)}$. D'où $S_{n+1} > \frac{3(n+1)}{2n+3}$.
**Conclusion** : vrai pour tout $n \ge 2$.

? **Ex. 2.** Montre que $1! \cdot 3! \cdot 5! \cdots (2n+1)! > ((n+1)!)^{n+1}$.
indice: (2n+3)! = (n+2)! × (n+3)(n+4)···(2n+3).
= **Attention** : Pour $n = 0$, on a $1 = 1$ : l'inégalité stricte est fausse. On prouve $\ge$ pour tout $n$, et $>$ pour $n \ge 1$.
Notons $P_n$ le produit. **Initialisation** : $P_1 = 1 \times 6 = 6 > (2!)^2 = 4$.
**Hérédité** : si $P_n > ((n+1)!)^{n+1}$, alors $P_{n+1} = P_n \cdot (2n+3)! > ((n+1)!)^{n+1}(2n+3)!$. Il suffit de montrer $((n+1)!)^{n+1}(2n+3)! \ge ((n+2)!)^{n+2}$, c'est-à-dire, en divisant par $((n+1)!)^{n+1}$ : $(2n+3)! \ge (n+2)^{n+1}(n+2)!$.
Or $(2n+3)! = (n+2)! \times (n+3)(n+4)\cdots(2n+3)$ : ce sont $n+1$ facteurs tous $> n+2$. Donc c'est vrai.

? **Ex. 3.** $x \neq 0$ et $x + \frac1x \in \mathbb Z$. Montre que $x^n + \frac{1}{x^n} \in \mathbb Z$ pour tout $n$.
indice: Récurrence d'ordre 2 : multiplie S_n par S_1.
= Posons $S_n = x^n + x^{-n}$. On a $S_1 S_n = x^{n+1} + x^{n-1} + x^{-(n-1)} + x^{-(n+1)} = S_{n+1} + S_{n-1}$, donc $S_{n+1} = S_1 S_n - S_{n-1}$.
**Initialisation** : $S_0 = 2 \in \mathbb Z$, $S_1 \in \mathbb Z$.
**Hérédité (ordre 2)** : si $S_{n-1}$ et $S_n$ sont entiers, $S_{n+1} = S_1S_n - S_{n-1}$ l'est aussi.

? **Ex. 4.** Trouve toutes les $f : \mathbb R \to \mathbb R$ telles que $f(x) + x f(1 - x) = 1 + x$ pour tout $x$.
indice: Analyse-synthèse : remplace x par 1 − x.
= **Analyse.** Soit $f$ solution. En remplaçant $x$ par $1 - x$ : $f(1-x) + (1-x)f(x) = 2 - x$, donc $f(1 - x) = 2 - x - (1-x)f(x)$. On reporte :
$f(x) + x(2 - x) - x(1-x)f(x) = 1 + x$, soit $f(x)(x^2 - x + 1) = x^2 - x + 1$.
Comme $x^2 - x + 1 = (x - \frac12)^2 + \frac34 > 0$, on obtient $f(x) = 1$.
**Synthèse.** $f = 1$ vérifie $1 + x \cdot 1 = 1 + x$. Unique solution : la fonction constante 1.
```

```exercice TD 1 · Applications et relations
? **Ex. 5.** Montre que $f : E \to F$ est bijective si et seulement si $f(\overline A) = \overline{f(A)}$ pour toute partie $A$ de $E$.
= **(⇒)** Soit $A \subseteq E$. Si $y \in f(\overline A)$, $y = f(x)$ avec $x \notin A$ ; si on avait $y \in f(A)$, $y = f(a)$ avec $a \in A$, et l'injectivité donnerait $x = a \in A$ : absurde. Donc $f(\overline A) \subseteq \overline{f(A)}$. Si $y \notin f(A)$, par surjectivité $y = f(x)$, et $x \notin A$ (sinon $y \in f(A)$) : $y \in f(\overline A)$.
**(⇐)** Avec $A = \emptyset$ : $f(E) = \overline{f(\emptyset)} = \overline{\emptyset} = F$, donc $f$ est surjective. Soient $x \neq x'$ ; avec $A = \{x\}$, $x' \in \overline A$, donc $f(x') \in f(\overline A) = \overline{\{f(x)\}}$ : $f(x') \neq f(x)$. Donc $f$ est injective.

? **Ex. 6.** $E$ de cardinal $n$, $\mathcal R$ une équivalence à $k$ classes, de graphe $G$ de cardinal $p$. Montre $n^2 \le kp$.
indice: Si la classe i a n_i éléments, combien de couples (x, y) avec x R y dans cette classe ?
= Soient $C_1, \dots, C_k$ les classes, de cardinaux $n_1, \dots, n_k$. Elles forment une partition : $\sum n_i = n$. On a $x \mathcal R y$ ssi $x$ et $y$ sont dans la même classe, donc $p = \sum n_i^2$. Par l'inégalité de Cauchy-Schwarz : $n^2 = \left(\sum_{i=1}^k n_i \cdot 1\right)^2 \le \left(\sum n_i^2\right)\left(\sum 1^2\right) = pk$.

? **Ex. 7.** Compare $V_1 = \max_j \min_i a_{i,j}$ et $V_2 = \min_i \max_j a_{i,j}$ ($E$ totalement ordonné). Donne un exemple où ils diffèrent.
= Pour tous $i, j$ : $\min_{i'} a_{i',j} \le a_{i,j} \le \max_{j'} a_{i,j'}$. Le membre de gauche ne dépend que de $j$, celui de droite que de $i$. On prend le max en $j$ à gauche et le min en $i$ à droite : $V_1 \le V_2$.
Exemple : $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$. Minimums des colonnes : 0 et 0, donc $V_1 = 0$. Maximums des lignes : 1 et 1, donc $V_2 = 1$.

? **Ex. 8.** $E$ ordonné. Montre : toute partie non vide de $E$ a un élément maximal $\iff$ toute suite croissante de $E$ est stationnaire.
= **(⇒)** Soit $(u_n)$ croissante. La partie $\{u_n\}$ a un élément maximal $u_N$. Pour $n \ge N$, $u_N \le u_n$, et $u_N < u_n$ est impossible (maximalité) : $u_n = u_N$.
**(⇐)** par contraposée : soit $A$ non vide sans élément maximal. On choisit $u_0 \in A$ ; $u_0$ n'est pas maximal, donc il existe $u_1 \in A$ avec $u_0 < u_1$, et ainsi de suite. La suite $(u_n)$ est strictement croissante, donc non stationnaire.
**Attention** : l'énoncé du TD dit « toute partie » : il faut « toute partie **non vide** » (le vide n'a pas d'élément maximal).
```

## TD 2 · Arithmétique

```exercice TD 2 · Divisibilité
? **Ex. 1.** (1) Montre $a \mid b \iff \forall k \in \mathbb Z,\ a \mid b - ka$. (2) Trouve les $a \in \mathbb Z$ tels que $(a - 5) \mid (a + 7)$.
= (1) Si $a \mid b$, comme $a \mid ka$, $a$ divise la combinaison $b - ka$. Réciproquement, $k = 0$ donne $a \mid b$.
(2) $a + 7 = (a - 5) + 12$, donc, d'après (1), $(a - 5) \mid (a+7) \iff (a - 5) \mid 12$. Les diviseurs de 12 sont $\pm1, \pm2, \pm3, \pm4, \pm6, \pm12$, d'où $a \in \{-7, -1, 1, 2, 3, 4, 6, 7, 8, 9, 11, 17\}$ (vérifié par ordinateur).

? **Ex. 2.** Les entiers naturels $n$ tels que $n - 1$ divise $n + 3$.
= $n + 3 = (n - 1) + 4$ donc $(n-1) \mid 4$. Avec $n \in \mathbb N$ : $n - 1 \in \{-1, 1, 2, 4\}$, soit $n \in \{0, 2, 3, 5\}$.

? **Ex. 3.** (1) Résous $x^2 - y^2 = 13$ dans $\mathbb N^2$. (2) Résous $2x^3 + xy - 11 = 0$ dans $\mathbb Z^2$.
= (1) $(x - y)(x + y) = 13$, premier, avec $0 \le x - y \le x + y$ : $x + y = 13$ et $x - y = 1$, donc $(x, y) = (7, 6)$.
(2) $x(2x^2 + y) = 11$, donc $x \mid 11$ : $x \in \{\pm1, \pm11\}$, et $y = \frac{11}{x} - 2x^2$. On obtient $(1, 9)$, $(-1, -13)$, $(11, -241)$, $(-11, -243)$. Vérif : $2 \cdot 1331 - 11 \cdot 241 - 11 = 2662 - 2651 - 11 = 0$.

? **Ex. 4.** $q_n = \frac{n - 7}{n + 19}$, $n > 7$. (1) Quand est-elle simplifiable ? (2) Quand est-elle un entier naturel ?
= (1) $\mathrm{PGCD}(n - 7, n + 19) = \mathrm{PGCD}(n - 7, 26)$, car $(n + 19) - (n - 7) = 26 = 2 \times 13$. Simplifiable ssi $2 \mid n - 7$ ou $13 \mid n - 7$ : $n$ impair, ou $n \equiv 7 \pmod{13}$.
(2) Pour $n > 7$, $0 < n - 7 < n + 19$, donc $0 < q_n < 1$ : **jamais** un entier naturel.
```

```exercice TD 2 · PGCD, Bézout
? **Ex. 6.** Calcule $\mathrm{PGCD}$ et $\mathrm{PPCM}$ de $(n, 2n+1)$ puis de $(2n+2, 4n+2)$.
= $2n + 1 = 2 \times n + 1$ donne $n \wedge (2n+1) = n \wedge 1 = 1$, PPCM $= n(2n+1)$.
$(2n+2) \wedge (4n+2) = 2\big((n+1) \wedge (2n+1)\big)$ et $2n + 1 = 2(n+1) - 1$, donc ce PGCD vaut $2$. PPCM $= \frac{(2n+2)(4n+2)}{2} = 2(n+1)(2n+1)$.

? **Ex. 7.** $a \wedge b = d$. Que vaut $(13a + 5b) \wedge (5a + 2b)$ ?
= $d$. Soit $\delta$ le PGCD cherché. $d$ divise $x$ et $y$, donc $d \mid \delta$. Et $2x - 5y = a$, $13y - 5x = b$, donc $\delta \mid a$ et $\delta \mid b$ : $\delta \mid d$. Ce sont des entiers positifs : $\delta = d$.

? **Ex. 8.** Résous $11x + 16y = 0$ dans $\mathbb Z^2$.
= $11x = -16y$, donc $16 \mid 11x$ avec $16 \wedge 11 = 1$ : par Gauss, $x = 16k$, puis $y = -11k$. Solutions : $(16k, -11k)$, $k \in \mathbb Z$.

? **Ex. 9.** Le carré de tout entier naturel est de la forme $5n - 1$, $5n$ ou $5n + 1$.
= Selon le reste $r \in \{0,1,2,3,4\}$ de $a$ modulo 5, $a^2 \equiv r^2 \in \{0, 1, 4, 9, 16\}$, soit $\{0, 1, 4, 4, 1\}$ modulo 5. Et $4 \equiv -1$. Donc $a^2 = 5n$, $5n + 1$ ou $5n - 1$ (avec $n \ge 1$ dans le dernier cas, car $a^2 \ge 4$).

? **Ex. 10.** (1) Solution particulière de $15x + 8y = 1$. (2) Résous $15x + 8y = 1000$. (3) Nombre de façons de marquer 1000 points (zones à 15 et 8 points).
reponse: 9
= (1) $15 = 8 + 7$, $8 = 7 + 1$ : $1 = 8 - 7 = 2 \times 8 - 15$, donc $(-1, 2)$.
(2) $(-1000, 2000)$ est solution. Si $(x, y)$ est solution, $15(x + 1000) = 8(2000 - y)$ ; $15 \wedge 8 = 1$ donc $8 \mid x + 1000$ : $x = -1000 + 8k$, $y = 2000 - 15k$, $k \in \mathbb Z$ (réciproque immédiate).
(3) Il faut $x \ge 0$ et $y \ge 0$ : $k \ge 125$ et $k \le 133$. Donc **9 façons** : $(0,125), (8,110), \dots, (64, 5)$ (énumérées par ordinateur).
```

## TD 3 · Structures algébriques

```exercice TD 3 · Groupes
? **Ex. 1.** $\omega \in \mathbb C$ et $H = \{a + \omega b \mid (a, b) \in \mathbb Z^2\}$. Montre que $H$ est un sous-groupe de $(\mathbb C, +)$.
= $H \subseteq \mathbb C$ ; $0 = 0 + \omega \cdot 0 \in H$. Si $z = a + \omega b$ et $z' = a' + \omega b'$, alors $z + z' = (a + a') + \omega(b + b') \in H$ et $-z = (-a) + \omega(-b) \in H$.

? **Ex. 2 et 3.** Centre d'un groupe, et $x \mapsto x^{-1}$ morphisme ssi $G$ abélien.
= Corrigés dans le chapitre « Lois de composition interne et groupes », section S'exercer.

? **Ex. 4.** Trouve tous les morphismes de $(\mathbb Q, +)$ vers $(\mathbb Z, +)$.
indice: f(x) = 2^k f(x / 2^k).
= Soit $f$ un tel morphisme et $x \in \mathbb Q$. Pour tout $k \in \mathbb N$, $x = 2^k \cdot \frac{x}{2^k}$, donc $f(x) = 2^k f\left(\frac{x}{2^k}\right)$ : l'entier $f(x)$ est divisible par toutes les puissances de 2, donc $f(x) = 0$. Seul le **morphisme nul** convient (et il convient).
```

```exercice TD 3 · Anneaux
? **Ex. 5.** Anneau de Boole ($x^2 = x$). (1) $xy + yx = 0$, $x + x = 0$, $A$ commutatif. (2) $x \le y \iff yx = x$ est un ordre. (3) $xy(x+y) = 0$ ; un anneau de Boole intègre a deux éléments.
= (1) $(x + y)^2 = x + y$ donne $x + xy + yx + y = x + y$, donc $xy + yx = 0$. Avec $y = x$ : $2x^2 = 2x = 0$. Donc $-z = z$ et $xy = -yx = yx$.
(2) Réflexive : $xx = x$. Antisymétrique : $yx = x$ et $xy = y$ avec $xy = yx$ donnent $x = y$. Transitive : $yx = x$ et $zy = y$ donnent $zx = z(yx) = (zy)x = yx = x$.
(3) $xy(x+y) = x^2y + xy^2 = xy + xy = 0$. Si $A$ est intègre et $x \neq 0$ : $x(1 + x) = x + x^2 = x + x = 0$, donc $1 + x = 0$, soit $x = -1 = 1$. Ainsi $A = \{0, 1\}$.

? **Ex. 6.** (1) $ab$ nilpotent : $1 - ab$ inversible. (2) et (3) Si $1 - ab$ est inversible, alors $1 - ba$ aussi.
= (1) Si $(ab)^m = 0$ : $(1 - ab)^{-1} = \sum_{k=0}^{m-1}(ab)^k$ (chapitre anneaux).
(2)-(3) Soit $u = (1 - ab)^{-1}$. On pose $v = 1 + bua$. Alors $(1 - ba)v = 1 - ba + bua - babua = 1 - ba + b(1 - ab)ua = 1 - ba + ba = 1$, et de même $v(1 - ba) = 1 - ba + bua - buaba = 1 - ba + bu(1 - ab)a = 1$. Donc $(1 - ba)^{-1} = 1 + b(1 - ab)^{-1}a$, que $ab$ soit nilpotent ou non.

? **Ex. 7.** $\mathbb Z[\sqrt2]$ : $\mathbb Z^2$ avec $(a,a') + (b,b') = (a+b, a'+b')$ et $(a,a')(b,b') = (ab + 2a'b', ab' + a'b)$.
= Idée : $(a, a')$ code $a + a'\sqrt2$ ; la multiplication est celle de $(a + a'\sqrt2)(b + b'\sqrt2)$.
(1) $(\mathbb Z^2, +)$ est un groupe abélien ; $\times$ est commutative (formule symétrique), associative et distributive (on le vérifie en développant, ou via le codage dans $\mathbb R$). Neutre : $(1, 0)$.
(2) $\mathbb Z_0 = \{(a, 0)\}$ contient $(1, 0)$, est stable par différence et par produit : $(a,0)(b,0) = (ab, 0)$. Sous-anneau.
(3) $(a, a') = (a, 0) + (a', 0)(0, 1)$, car $(a',0)(0,1) = (0, a')$. Unicité : les composantes sont déterminées.
(4) $X = (0, 1)$ : $X^2 = (0 + 2, 0) = (2, 0) = 2$.
```

## Flashcards

```cartes
Astuce de l'équation fonctionnelle $f(x) + xf(1-x) = 1+x$ :: Remplacer $x$ par $1 - x$ pour obtenir un système en $f(x)$ et $f(1-x)$.
$(a - 5) \mid (a + 7)$ se ramène à… :: $(a - 5) \mid 12$.
$\mathrm{PGCD}(n-7, n+19)$ :: $\mathrm{PGCD}(n - 7, 26)$.
Morphismes de $(\mathbb Q, +)$ dans $(\mathbb Z, +)$ :: Seulement le morphisme nul.
Inverse de $1 - ba$ :: $1 + b(1 - ab)^{-1}a$.
Dans un anneau de Boole, $x + x$ vaut… :: $0$.
```

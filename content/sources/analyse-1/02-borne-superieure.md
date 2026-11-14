---
id: borne-superieure
titre: Majorant, borne supérieure, partie entière
seance: Chapitre 1 · Les nombres réels
importance: 4
---

## Avant de commencer

Il te faut deux choses : lire un intervalle, et lire les mots « pour tout » et « il existe ».

- $[0, 1[$ contient 0, ne contient pas 1.
- « **Pour tout** $x$ de $A$, $x \le 5$ » : aucun élément de $A$ ne dépasse 5.
- « **Il existe** $x$ dans $A$ tel que $x > 4$ » : au moins un élément de $A$ dépasse 4.

```exercice Vérifie ton prérequis
? Vrai ou faux : pour tout $x$ de $[0, 3[$, on a $x \le 5$.
indice: Cherche un élément de [0, 3[ qui dépasserait 5.
= Vrai. Tous les éléments de $[0, 3[$ sont plus petits que 3, donc plus petits que 5. Pour que ce soit faux, il faudrait **un** élément qui dépasse 5.
```

## Comment aborder ce chapitre

> [!astuce] **Pense plafond.** Un majorant est un plafond au-dessus de l'ensemble. La borne supérieure est le plafond **le plus bas possible**. Qu'il touche l'ensemble ou non n'a pas d'importance.

> [!piege] Confondre borne supérieure et maximum. Le maximum doit **appartenir** à l'ensemble, la borne supérieure non. $[0, 1[$ a une borne supérieure (1) mais pas de maximum.

À la fin, tu sais trouver sup, inf, max et min d'un ensemble, et utiliser la caractérisation avec $\varepsilon$, qui revient dans tout le chapitre sur les suites.

## Idée 1 · Majorant : un plafond

```html
<svg viewBox="0 0 340 100" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="L'intervalle de 0 à 1, 1 exclu, avec ses majorants 1, 1,5 et 2 à droite">
<line x1="10" y1="56" x2="330" y2="56" stroke="currentColor" stroke-width="2"/>
<line x1="60" y1="56" x2="160" y2="56" stroke="#D9824F" stroke-width="7" stroke-linecap="round"/>
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<circle cx="60" cy="56" r="5" fill="#D9824F"/><text x="60" y="82">0</text>
<circle cx="160" cy="56" r="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="160" y="82">1</text>
<line x1="210" y1="50" x2="210" y2="62" stroke="currentColor" stroke-width="2"/><text x="210" y="82">1,5</text>
<line x1="260" y1="50" x2="260" y2="62" stroke="currentColor" stroke-width="2"/><text x="260" y="82">2</text>
<text x="110" y="34" fill="#D9824F" font-weight="700">A = [0, 1[</text><text x="235" y="34">majorants de A</text></g>
<path d="M160 42h150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
</svg>
```

- $M$ est un **majorant** de $A$ si tous les éléments de $A$ sont $\le M$.
- $m$ est un **minorant** de $A$ si tous les éléments de $A$ sont $\ge m$.
- $A$ est **bornée** si elle a un majorant et un minorant.

Un majorant n'est jamais seul : si 1 majore $A$, alors 1,5, 2 et 100 aussi. La vraie question est : quel est le plus petit ?

## Idée 2 · La borne supérieure : le plus petit plafond

La **borne supérieure** de $A$, notée $\sup A$, est le plus petit des majorants de $A$. La **borne inférieure** $\inf A$ est le plus grand des minorants.

Pour $A = [0, 1[$ : les majorants sont tous les nombres $\ge 1$, le plus petit est 1, donc $\sup A = 1$. Et 1 n'est pas dans $A$ : pas de maximum.

> [!retenir] **Propriété de la borne supérieure.** Toute partie de $\mathbb{R}$ non vide et majorée admet une borne supérieure. C'est ce qui distingue $\mathbb{R}$ de $\mathbb{Q}$ : dans $\mathbb{Q}$, l'ensemble des rationnels dont le carré est inférieur à 2 n'a pas de plus petit majorant rationnel.

Lien avec le maximum : si $A$ a un maximum, alors $\sup A = \max A$. La réciproque est fausse.

## Idée 3 · Reconnaître un sup avec $\varepsilon$

```html
<svg viewBox="0 0 340 100" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Entre M moins epsilon et M, on trouve toujours un élément de A">
<line x1="10" y1="56" x2="330" y2="56" stroke="currentColor" stroke-width="2"/>
<line x1="40" y1="56" x2="270" y2="56" stroke="#D9824F" stroke-width="7" stroke-linecap="round" opacity=".45"/>
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<line x1="270" y1="46" x2="270" y2="66" stroke="currentColor" stroke-width="2.5"/><text x="270" y="86">M = sup A</text>
<line x1="190" y1="48" x2="190" y2="64" stroke="currentColor" stroke-width="2"/><text x="186" y="86">M − ε</text>
<circle cx="236" cy="56" r="6" fill="#D9824F"/><text x="236" y="34" fill="#D9824F" font-weight="700">un x de A</text></g>
</svg>
```

$M = \sup A$ exactement quand deux choses sont vraies :

1. $M$ est un majorant : pour tout $x$ de $A$, $x \le M$.
2. On ne peut pas descendre : pour tout $\varepsilon > 0$, il existe $x$ dans $A$ tel que $x > M - \varepsilon$.

La deuxième ligne dit : dès qu'on baisse le plafond, même d'un cheveu, un élément de $A$ passe au-dessus.

```etapes Exemple : A = { 1 − 1/n, n ≥ 1 }
Les premiers éléments :: $0,\ \tfrac12,\ \tfrac23,\ \tfrac34, \dots$ Ils montent vers 1 sans jamais l'atteindre.
1 est un majorant :: $1 - \tfrac1n < 1$ pour tout $n$.
On ne peut pas descendre :: Soit $\varepsilon > 0$. On veut $1 - \tfrac1n > 1 - \varepsilon$, c'est-à-dire $\tfrac1n < \varepsilon$, donc $n > \tfrac1\varepsilon$. Un tel entier existe.
Conclusion :: $\sup A = 1$, non atteint : pas de maximum. En bas, $\inf A = 0 = \min A$ (obtenu pour $n = 1$).
```

## Idée 4 · La partie entière

La **partie entière** $E(x)$ est le plus grand entier inférieur ou égal à $x$ :

$$E(x) \le x < E(x) + 1$$

- $E(2{,}7) = 2$ ;
- $E(5) = 5$ ;
- $E(-2{,}7) = -3$, et non $-2$ : on va vers la **gauche**.

Elle existe grâce à la **propriété d'Archimède** : pour tout réel $x$, il existe un entier $n$ tel que $n > x$. Autrement dit, $\mathbb{N}$ n'est pas majoré. C'est elle qui garantit, dans l'exemple précédent, qu'on trouve un entier $n > \tfrac1\varepsilon$.

## S'exercer

```exercice Sup, inf, max, min
? Donne sup, inf, max et min de $A = ]-2, 5]$.
indice: Une borne qui appartient à l'ensemble est aussi un max ou un min.
= $\sup A = \max A = 5$ (5 appartient à $A$). $\inf A = -2$, mais pas de minimum car $-2$ n'est pas dans $A$.

? Même question pour $B = \{ \tfrac1n,\ n \ge 1 \}$.
indice: Écris les premiers éléments : 1, 1/2, 1/3…
= $\sup B = \max B = 1$ (pour $n = 1$). $\inf B = 0$ : 0 minore $B$, et pour tout $\varepsilon > 0$ il existe $n$ avec $\tfrac1n < \varepsilon$. Pas de minimum, car $\tfrac1n$ ne vaut jamais 0.

? Calcule $E(-0{,}5)$.
indice: Le plus grand entier inférieur ou égal à −0,5.
reponse: -1
= $-1 \le -0{,}5 < 0$, donc $E(-0{,}5) = -1$.
```

## Flashcards

```cartes
Majorant de $A$ :: Un nombre $M$ tel que tout élément de $A$ est $\le M$.
Borne supérieure :: Le plus petit des majorants. Elle peut ne pas appartenir à l'ensemble.
Différence entre sup et max :: Le max doit appartenir à l'ensemble. $[0,1[$ a pour sup 1 mais n'a pas de max.
Propriété de la borne supérieure :: Toute partie de $\mathbb{R}$ non vide et majorée admet une borne supérieure.
Caractérisation du sup avec $\varepsilon$ :: $M$ majore $A$, et pour tout $\varepsilon > 0$ il existe $x$ dans $A$ avec $x > M - \varepsilon$.
Partie entière $E(x)$ :: L'unique entier tel que $E(x) \le x < E(x) + 1$. Exemple : $E(-2{,}7) = -3$.
Propriété d'Archimède :: Pour tout réel $x$, il existe un entier $n > x$ : $\mathbb{N}$ n'est pas majoré.
```

## QCM du chapitre

```qcm
? La borne supérieure de $[0, 1[$ est :
- $0$
+ $1$
- elle n'existe pas
= Les majorants sont les nombres $\ge 1$. Le plus petit est 1.

? L'intervalle $[0, 1[$ a-t-il un maximum ?
- Oui, c'est 1
+ Non
- Oui, c'est 0,999
= Un maximum doit appartenir à l'ensemble. 1 n'y est pas, et aucun élément n'est plus grand que tous les autres.

? Que vaut $E(-2{,}7)$ ?
- $-2$
+ $-3$
- $2$
= $-3 \le -2{,}7 < -2$. Pour un négatif, la partie entière va vers la gauche.

? Pour $A = \{ \tfrac1n,\ n \ge 1 \}$, la borne inférieure est :
+ $0$, et elle n'est pas atteinte
- $0$, et c'est le minimum
- $1$
= $\tfrac1n$ s'approche de 0 autant qu'on veut sans jamais valoir 0.

? La propriété de la borne supérieure affirme que :
- toute partie de $\mathbb{R}$ a un maximum
+ toute partie de $\mathbb{R}$ non vide et majorée a une borne supérieure
- toute partie majorée de $\mathbb{Q}$ a une borne supérieure dans $\mathbb{Q}$
= Les deux hypothèses comptent : non vide et majorée. Dans $\mathbb{Q}$, la propriété est fausse.

? Si un ensemble $A$ a un maximum, alors :
+ $\sup A = \max A$
- $\sup A > \max A$
- $A$ n'a pas de borne supérieure
= Le maximum est un majorant, et aucun majorant ne peut être plus petit que lui puisqu'il est dans $A$.

? L'ensemble des majorants de $]-\infty, 3]$ est :
- $]3, +\infty[$
+ $[3, +\infty[$
- $\{3\}$
= 3 lui-même est un majorant, ainsi que tout nombre plus grand.

? $M$ est un majorant de $A$. Pour que $M = \sup A$, il faut en plus que, pour tout $\varepsilon > 0$ :
- tous les éléments de $A$ soient supérieurs à $M - \varepsilon$
+ il existe un élément de $A$ supérieur à $M - \varepsilon$
- $M - \varepsilon$ soit un majorant de $A$
= Un seul élément suffit : il prouve que $M - \varepsilon$ n'est plus un plafond.

? Pour tout réel $x$, la partie entière vérifie :
- $E(x) < x \le E(x) + 1$
+ $E(x) \le x < E(x) + 1$
- $E(x) - 1 < x < E(x)$
= L'inégalité large est à gauche : $E(5) = 5$.

? L'ensemble $\mathbb{N}$ est-il majoré dans $\mathbb{R}$ ?
- Oui
+ Non
- Seulement par un nombre irrationnel
= C'est la propriété d'Archimède : pour tout réel, un entier le dépasse.
```

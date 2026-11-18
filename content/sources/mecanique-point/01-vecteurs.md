---
id: vecteurs
titre: Vecteurs, bases et produits
seance: Chapitre I · Rappels mathématiques (I à III)
importance: 4
---

## Avant de commencer

Tu dois savoir calculer une racine carrée et utiliser le théorème de Pythagore : la longueur de la diagonale d'un rectangle de côtés $a$ et $b$ vaut $\sqrt{a^2+b^2}$.

```exercice Vérifie ton prérequis
? Un rectangle a pour côtés 3 et 4. Quelle est la longueur de sa diagonale ?
reponse: 5
= $\sqrt{3^2+4^2} = \sqrt{25} = 5$. La norme d'un vecteur, c'est exactement ce calcul, avec une troisième coordonnée en plus.
```

## Comment aborder ce chapitre

> [!astuce] **Un vecteur, c'est quatre informations** : module, support (direction), sens, origine. Le produit scalaire répond à « sont-ils alignés ? », le produit vectoriel à « quel plan forment-ils ? ».

> [!piege] Écrire $\vec u \wedge \vec v = \vec v \wedge \vec u$. Le produit vectoriel est **antisymétrique** : $\vec v \wedge \vec u = -\,\vec u \wedge \vec v$. Échanger l'ordre change le signe.

À la fin, tu sais calculer une norme, un vecteur unitaire, un angle, un produit vectoriel et un produit mixte dans une base orthonormée directe.

## Idée 1 · Repère, base orthonormée directe

Un repère d'espace $\mathcal R(O, x, y, z)$ = une origine $O$ et trois axes non coplanaires. Il est **orthonormé direct** si les vecteurs unitaires $(\vec i, \vec j, \vec k)$ sont orthogonaux deux à deux, de norme 1, et respectent la **règle du tire-bouchon** : en tournant de $\vec i$ vers $\vec j$, le tire-bouchon avance vers $\vec k$.

```html
<svg viewBox="0 0 420 200" role="img" aria-label="Repère orthonormé direct : i, j, k avec la règle du tire-bouchon" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="2" fill="none"><path d="M200 140V30"/><path d="M200 140H330"/><path d="M200 140L120 185"/></g><g stroke="#D9824F" stroke-width="2" fill="none"><path d="M245 120A40 22 0 0 1 180 115"/></g><g font-family="sans-serif" font-size="14" fill="currentColor"><text x="206" y="34">k</text><text x="334" y="145">j</text><text x="104" y="190">i</text><text x="186" y="158">O</text><text x="250" y="100" fill="#D9824F">de i vers j : on avance selon k</text></g></svg>
```

Repère d'espace + repère de temps (horloge, en secondes) = **référentiel**.

Tout vecteur s'écrit de façon unique $\vec V = v_1\vec i + v_2\vec j + v_3\vec k$. En 3D, $\overrightarrow{OM} = x\vec i + y\vec j + z\vec k$ : on note $M(x, y, z)$.

## Idée 2 · Produit scalaire : norme, angle, orthogonalité

$$\vec u\cdot\vec v = u_1v_1 + u_2v_2 + u_3v_3 = \|\vec u\|\,\|\vec v\|\cos(\vec u,\vec v)$$

- Norme : $\|\vec u\| = \sqrt{\vec u\cdot\vec u} = \sqrt{u_1^2+u_2^2+u_3^2}$.
- Vecteur unitaire porté par $\vec A$ : $\vec u_A = \vec A / \|\vec A\|$.
- $\vec u \perp \vec v \iff \vec u\cdot\vec v = 0$.
- Le produit scalaire ne dépend pas de la base, **mais** les deux vecteurs doivent être écrits dans la même base pour le calculer.

Exemple (série 1) : $\vec A(3, 2, \sqrt3)$ donne $\|\vec A\| = \sqrt{9+4+3} = 4$ et $\vec u_A = \left(\tfrac34, \tfrac12, \tfrac{\sqrt3}{4}\right)$.

```etapes Angle entre deux vecteurs
Écris les deux vecteurs dans la même base :: par exemple $\vec u(1,0,1)$ et $\vec v(0,1,1)$.
Calcule le produit scalaire :: $\vec u\cdot\vec v = 0 + 0 + 1 = 1$.
Calcule les normes :: $\|\vec u\| = \|\vec v\| = \sqrt2$.
Divise :: $\cos\theta = \dfrac{1}{\sqrt2\cdot\sqrt2} = \dfrac12$, donc $\theta = 60°$.
```

## Idée 3 · Produit vectoriel et produit mixte

$\vec u\wedge\vec v$ est un vecteur :

- de module $\|\vec u\|\,\|\vec v\|\,|\sin(\vec u,\vec v)|$ (l'aire du parallélogramme) ;
- perpendiculaire au plan de $\vec u$ et $\vec v$ ;
- tel que $(\vec u, \vec v, \vec u\wedge\vec v)$ soit direct.

```html
<svg viewBox="0 0 420 200" role="img" aria-label="Produit vectoriel perpendiculaire au plan formé par u et v" style="max-width:100%;height:auto"><path d="M120 150L260 150L330 100L190 100Z" fill="#D9824F" opacity="0.15"/><g stroke="currentColor" stroke-width="2" fill="none"><path d="M120 150H260"/><path d="M120 150L190 100"/></g><path d="M120 150V40" stroke="#D9824F" stroke-width="2.5"/><g font-family="sans-serif" font-size="14" fill="currentColor"><text x="262" y="168">u</text><text x="194" y="94">v</text><text x="128" y="46" fill="#D9824F">u ∧ v</text><text x="230" y="130">aire = ‖u ∧ v‖</text></g></svg>
```

En composantes :

$$\vec u\wedge\vec v = (u_2v_3 - u_3v_2)\,\vec i - (u_1v_3 - u_3v_1)\,\vec j + (u_1v_2 - u_2v_1)\,\vec k$$

Base directe : $\vec i\wedge\vec j = \vec k$, $\vec j\wedge\vec k = \vec i$, $\vec k\wedge\vec i = \vec j$.

- $\vec u \parallel \vec v \iff \vec u\wedge\vec v = \vec 0$.
- Double produit vectoriel : $\vec u\wedge(\vec v\wedge\vec w) = (\vec u\cdot\vec w)\,\vec v - (\vec u\cdot\vec v)\,\vec w$.
- Produit mixte : $(\vec u, \vec v, \vec w) = \vec u\cdot(\vec v\wedge\vec w)$, un scalaire, invariant par permutation circulaire. Il est **non nul** si et seulement si les trois vecteurs ne sont pas coplanaires : ils forment alors une base.

> [!retenir] Pour montrer que trois vecteurs forment une base : calcule leur produit mixte. S'il est non nul, c'est une base. Pour dire qu'elle est **normée**, vérifie en plus que chaque vecteur a une norme 1.

## S'exercer

```exercice Série 1, exercice 1 (extrait)
? Soit $\vec B(2, \sqrt3, \sqrt2)$. Calcule $\|\vec B\|$.
reponse: 3
= $\|\vec B\| = \sqrt{4 + 3 + 2} = \sqrt9 = 3$, donc $\vec u_B = \left(\tfrac23, \tfrac{\sqrt3}{3}, \tfrac{\sqrt2}{3}\right)$.
? Avec $\vec C(1, 2, 2)$, calcule $\|\vec C\|$, puis $\cos\theta_A = \vec u_B\cdot\vec u_C$.
indice: $\vec u_C = (1/3, 2/3, 2/3)$.
= $\|\vec C\| = 3$. $\cos\theta_A = \tfrac23\cdot\tfrac13 + \tfrac{\sqrt3}{3}\cdot\tfrac23 + \tfrac{\sqrt2}{3}\cdot\tfrac23 = \dfrac{2 + 2\sqrt3 + 2\sqrt2}{9} \approx 0{,}921$.
```

```exercice Produit vectoriel
? Calcule $\vec i\wedge(\vec i + \vec k)$ dans une base orthonormée directe.
= $\vec i\wedge\vec i + \vec i\wedge\vec k = \vec 0 - \vec j = -\vec j$ (car $\vec k\wedge\vec i = \vec j$, donc $\vec i\wedge\vec k = -\vec j$).
? Les vecteurs $(1,0,0)$, $(1,1,0)$ et $(1,1,1)$ forment-ils une base ?
= Produit mixte : déterminant de la matrice triangulaire, égal à $1\times1\times1 = 1 \ne 0$. Oui, c'est une base (non orthonormée).
```

## Flashcards

```cartes
Les quatre propriétés d'un vecteur :: module, support (direction), sens, origine.
Référentiel :: un repère d'espace + un repère de temps (horloge).
Norme de $\vec u(u_1,u_2,u_3)$ :: $\sqrt{u_1^2+u_2^2+u_3^2}$
Condition d'orthogonalité :: $\vec u\cdot\vec v = 0$
Condition de parallélisme :: $\vec u\wedge\vec v = \vec 0$
$\vec j\wedge\vec k$ en base directe :: $\vec i$
Double produit vectoriel :: $\vec u\wedge(\vec v\wedge\vec w) = (\vec u\cdot\vec w)\vec v - (\vec u\cdot\vec v)\vec w$
Trois vecteurs forment une base si… :: leur produit mixte est non nul (ils ne sont pas coplanaires).
```

## QCM du chapitre

```qcm
? La norme de $\vec A(3, 2, \sqrt3)$ vaut :
- $3 + 2 + \sqrt3$
+ 4
- 16
= $\sqrt{9 + 4 + 3} = \sqrt{16} = 4$.

? $\vec u\cdot\vec v = 0$ avec $\vec u, \vec v$ non nuls signifie :
- $\vec u \parallel \vec v$
+ $\vec u \perp \vec v$
- $\vec u = -\vec v$
= Le cosinus de l'angle est nul : angle droit.

? $\vec k\wedge\vec i$ vaut, en base orthonormée directe :
- $-\vec j$
+ $\vec j$
- $\vec 0$
= Permutation circulaire $(\vec k, \vec i, \vec j)$ : $\vec k\wedge\vec i = \vec j$.

? $\vec v\wedge\vec u$ est égal à :
- $\vec u\wedge\vec v$
+ $-\,\vec u\wedge\vec v$
- $\vec u\cdot\vec v$
= Le produit vectoriel est antisymétrique.

? Le module de $\vec u\wedge\vec v$ vaut :
- $\|\vec u\|\,\|\vec v\|\cos\theta$
+ $\|\vec u\|\,\|\vec v\|\,|\sin\theta|$
- $\|\vec u\| + \|\vec v\|$
= C'est l'aire du parallélogramme construit sur $\vec u$ et $\vec v$.

? Le produit mixte $(\vec u, \vec v, \vec w)$ est :
- un vecteur
+ un scalaire
- toujours nul
= $\vec u\cdot(\vec v\wedge\vec w)$ : un produit scalaire, donc un nombre.

? Un produit mixte nul signifie que les trois vecteurs sont :
+ coplanaires
- orthogonaux deux à deux
- unitaires
= Ils sont dans un même plan, donc ne forment pas une base.

? Le vecteur unitaire porté par $\vec A$ est :
- $\vec A\,\|\vec A\|$
+ $\vec A/\|\vec A\|$
- $\|\vec A\|/\vec A$
= On divise par la norme pour obtenir un vecteur de norme 1.

? Une grandeur scalaire comme la masse :
+ ne dépend pas du repère d'observation
- dépend du repère d'observation
- est toujours un vecteur unitaire
= Le cours oppose grandeurs scalaires (masse, température) et vectorielles (vitesse, accélération), qui dépendent du repère.

? $\vec u\wedge(\vec v\wedge\vec w)$ vaut :
- $(\vec u\cdot\vec v)\vec w - (\vec u\cdot\vec w)\vec v$
+ $(\vec u\cdot\vec w)\vec v - (\vec u\cdot\vec v)\vec w$
- $\vec 0$ toujours
= Formule du double produit vectoriel ; il appartient au plan $(\vec v, \vec w)$.
```

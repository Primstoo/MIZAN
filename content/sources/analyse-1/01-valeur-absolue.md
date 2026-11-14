---
id: valeur-absolue
titre: Inégalités et valeur absolue
seance: Chapitre 1 · Les nombres réels
importance: 5
---

## Avant de commencer

Ce chapitre demande une seule chose : savoir manipuler une inégalité.

- Ajouter le même nombre des deux côtés **ne change pas** le sens.
- Multiplier par un nombre **positif** ne change pas le sens.
- Multiplier par un nombre **négatif renverse** le sens.

```exercice Vérifie ton prérequis
? Résous $-2x + 6 \ge 0$.
indice: Isole x. Attention au moment où tu divises par −2.
= $-2x \ge -6$, puis on divise par $-2$, qui est négatif : le sens se renverse. On obtient $x \le 3$.
Si tu as trouvé $x \ge 3$, relis la troisième règle ci-dessus : c'est le seul prérequis du chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Pense distance, pas formule.** La valeur absolue $|x - a|$ est la distance entre $x$ et $a$ sur la droite des réels. Toutes les règles du chapitre se voient sur un dessin.

> [!piege] Presque tout le monde écrit un jour $|a + b| = |a| + |b|$. C'est faux dès que $a$ et $b$ sont de signes contraires : $|3 + (-5)| = 2$, alors que $|3| + |-5| = 8$.

À la fin, tu sais résoudre une inéquation avec valeur absolue en une ligne et majorer une expression, ce qui sert dans **toutes** les preuves de limites.

## Idée 1 · La valeur absolue est une distance à zéro

```html
<svg viewBox="0 0 340 90" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Droite graduée : -3 et 3 sont tous deux à distance 3 de zéro">
<line x1="10" y1="50" x2="330" y2="50" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<line x1="50" y1="44" x2="50" y2="56" stroke="currentColor" stroke-width="2"/><text x="50" y="74">−3</text>
<line x1="170" y1="44" x2="170" y2="56" stroke="currentColor" stroke-width="2"/><text x="170" y="74">0</text>
<line x1="290" y1="44" x2="290" y2="56" stroke="currentColor" stroke-width="2"/><text x="290" y="74">3</text>
<text x="110" y="24" fill="#D9824F" font-weight="700">distance 3</text><text x="230" y="24" fill="#D9824F" font-weight="700">distance 3</text></g>
<line x1="54" y1="34" x2="166" y2="34" stroke="#D9824F" stroke-width="3"/><line x1="174" y1="34" x2="286" y2="34" stroke="#D9824F" stroke-width="3"/>
</svg>
```

$|x|$ vaut $x$ si $x \ge 0$, et $-x$ si $x < 0$. Donc $|3| = 3$ et $|-3| = 3$ : les deux sont à 3 pas de zéro.

Trois conséquences à connaître :

- $|x| \ge 0$, et $|x| = 0$ seulement pour $x = 0$ ;
- $|ab| = |a| \cdot |b|$ ;
- $\sqrt{x^2} = |x|$ (et non $x$ : pour $x = -3$, $\sqrt{9} = 3$).

## Idée 2 · $|x - a| < r$ dessine un intervalle

```html
<svg viewBox="0 0 340 96" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Les x à distance inférieure à r de a forment l'intervalle de a moins r à a plus r">
<line x1="10" y1="52" x2="330" y2="52" stroke="currentColor" stroke-width="2"/>
<line x1="80" y1="52" x2="260" y2="52" stroke="#D9824F" stroke-width="7" stroke-linecap="round"/>
<g font-family="sans-serif" font-size="13" text-anchor="middle" fill="currentColor">
<circle cx="80" cy="52" r="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="80" y="80">a − r</text>
<circle cx="170" cy="52" r="5" fill="currentColor"/><text x="170" y="80">a</text>
<circle cx="260" cy="52" r="5" fill="none" stroke="currentColor" stroke-width="2"/><text x="260" y="80">a + r</text>
<text x="125" y="34" fill="#D9824F" font-weight="700">r</text><text x="215" y="34" fill="#D9824F" font-weight="700">r</text></g>
</svg>
```

« $x$ est à moins de $r$ de $a$ » : $x$ est dans l'intervalle centré en $a$, de rayon $r$.

$$|x - a| < r \iff a - r < x < a + r$$

Et le contraire : « $x$ est à au moins $r$ de $a$ » donne **deux** morceaux.

$$|x - a| \ge r \iff x \le a - r \ \text{ ou } \ x \ge a + r$$

```etapes Résoudre |2x − 1| ≤ 5, pas à pas
On enlève la valeur absolue :: $|2x - 1| \le 5$ signifie $-5 \le 2x - 1 \le 5$.
On ajoute 1 partout :: $-4 \le 2x \le 6$.
On divise par 2, qui est positif :: $-2 \le x \le 3$. Le sens ne change pas.
On vérifie avec une valeur :: $x = 0$ donne $|-1| = 1 \le 5$ : c'est cohérent.
```

## Idée 3 · L'inégalité triangulaire

$$|a + b| \le |a| + |b|$$

En mots : aller de 0 à $a + b$ directement n'est jamais plus long que faire deux trajets.

- Même signe : égalité. $|2 + 5| = 7 = |2| + |5|$.
- Signes contraires : ça se compense. $|3 + (-5)| = 2 < 8$.

Pourquoi c'est vrai : $-|a| \le a \le |a|$ et $-|b| \le b \le |b|$. On additionne : $-(|a| + |b|) \le a + b \le |a| + |b|$, ce qui est exactement $|a + b| \le |a| + |b|$ d'après l'idée 2.

Sa cousine, utile pour minorer : $\big|\,|a| - |b|\,\big| \le |a - b|$.

## Idée 4 · Majorer : la technique de toutes les preuves

Majorer, c'est trouver un nombre plus grand que l'expression, à coup sûr.

**Exemple.** On sait que $|x - 1| \le 2$. Majorer $|x^2 - 1|$.

1. On factorise : $|x^2 - 1| = |x - 1| \cdot |x + 1|$.
2. Le premier facteur est connu : $|x - 1| \le 2$.
3. Le second se ramène au premier : $|x + 1| = |(x - 1) + 2| \le |x - 1| + 2 \le 4$.
4. On multiplie : $|x^2 - 1| \le 2 \times 4 = 8$.

> [!retenir] Pour majorer : **factoriser**, faire apparaître la quantité qu'on contrôle, puis utiliser l'inégalité triangulaire. Tu referas ces trois gestes dans chaque preuve de limite.

## S'exercer

```exercice Trois exercices types
? Résous $|x + 1| < 4$.
indice: x + 1 = x − (−1) : le centre est −1, le rayon 4.
= $-4 < x + 1 < 4$, donc $-5 < x < 3$.

? Résous $|3 - x| \ge 2$.
indice: |3 − x| = |x − 3| : distance entre x et 3.
= $x$ est à au moins 2 de 3 : $x \le 1$ ou $x \ge 5$.

? Montre que si $|x - 3| < 1$, alors $|x^2 - 9| < 7$.
indice: Factorise, puis encadre x + 3.
= $|x^2 - 9| = |x - 3| \cdot |x + 3|$. Comme $2 < x < 4$, on a $5 < x + 3 < 7$, donc $|x + 3| < 7$. Ainsi $|x^2 - 9| < 1 \times 7 = 7$.
```

## Flashcards

```cartes
Que mesure $|x - a|$ ? :: La distance entre $x$ et $a$ sur la droite des réels.
$|x - a| < r$ équivaut à… :: $a - r < x < a + r$ : l'intervalle centré en $a$, de rayon $r$.
$|x - a| \ge r$ équivaut à… :: $x \le a - r$ ou $x \ge a + r$ (deux morceaux).
Inégalité triangulaire :: $|a + b| \le |a| + |b|$, avec égalité quand $a$ et $b$ ont le même signe.
$\sqrt{x^2}$ vaut… :: $|x|$, et pas $x$.
Les trois gestes pour majorer :: Factoriser, faire apparaître la quantité contrôlée, appliquer l'inégalité triangulaire.
```

## QCM du chapitre

```qcm
? Que vaut $|-7|$ ?
- $-7$
+ $7$
- $0$
= Une valeur absolue est une distance : elle n'est jamais négative.

? $|x - 2| < 3$ équivaut à :
- $x < 5$
+ $-1 < x < 5$
- $x < -1$ ou $x > 5$
= Intervalle centré en 2, de rayon 3 : de $2 - 3$ à $2 + 3$.

? Pour tout réel $x$, $\sqrt{x^2}$ vaut :
- $x$
- $-x$
+ $|x|$
= Une racine carrée est positive. Pour $x = -3$ : $\sqrt{9} = 3 = |-3|$.

? Laquelle est vraie pour tous réels $a$ et $b$ ?
- $|a + b| = |a| + |b|$
+ $|a + b| \le |a| + |b|$
- $|a + b| \ge |a| + |b|$
= C'est l'inégalité triangulaire. L'égalité n'a lieu que si $a$ et $b$ ont le même signe.

? L'ensemble des solutions de $|x| > 2$ est :
- $-2 < x < 2$
+ $x < -2$ ou $x > 2$
- $x > 2$ seulement
= « À plus de 2 de zéro » : deux morceaux, un de chaque côté.

? La distance entre $-3$ et $4$ vaut :
- $1$
+ $7$
- $-7$
= $|-3 - 4| = |-7| = 7$.

? Si $|x - 5| \le 0{,}1$, alors $x$ appartient à :
- $[5 ; 5{,}1]$
+ $[4{,}9 ; 5{,}1]$
- $[-0{,}1 ; 0{,}1]$
= Centre 5, rayon 0,1.

? Dans $|a + b| \le |a| + |b|$, il y a égalité quand :
- $a$ et $b$ sont de signes contraires
+ $a$ et $b$ ont le même signe (ou l'un est nul)
- jamais
= Si les signes sont contraires, les deux nombres se compensent et la somme est plus petite.

? L'ensemble des solutions de $|2x - 1| \le 5$ est :
+ $[-2 ; 3]$
- $[-3 ; 2]$
- $[-4 ; 6]$
= $-5 \le 2x - 1 \le 5$, donc $-4 \le 2x \le 6$, donc $-2 \le x \le 3$.

? Laquelle de ces affirmations est **fausse** en général ?
- $|ab| = |a| \cdot |b|$
- $|-a| = |a|$
+ $|a - b| \le |a| - |b|$
= Contre-exemple : $a = 1$, $b = 3$ donne $|a - b| = 2$ mais $|a| - |b| = -2$. La bonne inégalité est $|a - b| \ge \big||a| - |b|\big|$.
```

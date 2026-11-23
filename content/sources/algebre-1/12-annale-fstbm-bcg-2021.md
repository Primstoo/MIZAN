---
id: annale-fstbm-bcg-2021
titre: Annale corrigée · examen d'algèbre FST Béni Mellal (BCG, 2020-2021)
seance: Examen d'algèbre, filière BCG section B, FST Béni Mellal (1 h 30)
importance: 4
payant: true
---

Un vrai sujet d'une autre faculté de la même université (FST Béni Mellal, filière BCG). Il couvre tout le module : logique, récurrence, complexes, polynômes, fractions rationnelles, systèmes. C'est un excellent entraînement, quel que soit ton établissement.

> [!astuce] Fais le sujet en 1 h 30 sur papier avant d'ouvrir les corrigés.

## Exercice 1 · logique et récurrence

**Énoncé.** 1) Écrire la négation de : a) $P \wedge (Q \Rightarrow \neg R)$ ; b) $\forall \varepsilon > 0, \exists \alpha > 0, |x| < \alpha \Rightarrow x^2 < \varepsilon$. 2) Pour $n \ge 2$, $S_n = 1\times2 + 2\times3 + \dots + (n-1)\times n$. Montrer que $S_n = \dfrac{n(n-1)(n+1)}{3}$.

```exercice Exercice 1
? 1a) Négation de $P \wedge (Q \Rightarrow \neg R)$.
= $\neg P \vee (Q \wedge R)$. On utilise $\neg(A \Rightarrow B) \equiv A \wedge \neg B$.

? 1b) Négation de la phrase quantifiée.
= $\exists \varepsilon > 0, \forall \alpha > 0, |x| < \alpha \text{ et } x^2 \ge \varepsilon$. Les quantificateurs s'échangent, l'implication devient « et non ».

? 2) Récurrence : que vaut $S_2$, et quelle est l'étape clé ?
= $S_2 = 1\times 2 = 2 = \frac{2\cdot1\cdot3}{3}$ : vrai. Hérédité : $S_{n+1} = S_n + n(n+1) = \frac{n(n-1)(n+1)}{3} + n(n+1) = \frac{n(n+1)(n-1+3)}{3} = \frac{(n+1)\,n\,(n+2)}{3}$. C'est la formule au rang $n+1$.
reponse: 2
```

> [!attention] Le texte du sujet, mal imprimé, laisse lire « $S_n = n(n-1)(n+1)$ » sans le $\frac13$. Le calcul de $S_2$ montre que le $\frac13$ est indispensable.

## Exercice 2 · nombres complexes

**Énoncé.** 1) Racines carrées de $9 + 40i$. 2) $z_1 = -\sqrt3 - i$, $z_2 = 1 + i$, $Z = z_1 / z_2$. a) Forme algébrique de $Z$. b) Modules et arguments. c) En déduire $\cos\frac{11\pi}{12}$ et $\sin\frac{11\pi}{12}$.

```exercice Exercice 2
? 1) Racines carrées de $9 + 40i$.
= On cherche $(a+ib)^2 = 9+40i$ : $a^2 - b^2 = 9$, $2ab = 40$, $a^2 + b^2 = |9+40i| = 41$. Donc $a^2 = 25$, $b^2 = 16$, $ab > 0$ : **$5 + 4i$ et $-5 - 4i$**.

? 2a) Forme algébrique de $Z$.
= Multiplie par le conjugué $1 - i$ : $Z = \frac{(-\sqrt3 - i)(1 - i)}{2} = \frac{-\sqrt3 - 1}{2} + i\,\frac{\sqrt3 - 1}{2}$.

? 2b) Modules et arguments.
= $|z_1| = 2$, $\arg z_1 = -\frac{5\pi}{6}$ ; $|z_2| = \sqrt2$, $\arg z_2 = \frac{\pi}{4}$ ; $|Z| = \sqrt2$, $\arg Z = -\frac{5\pi}{6} - \frac{\pi}{4} = -\frac{13\pi}{12} \equiv \frac{11\pi}{12}$.

? 2c) Valeurs de $\cos\frac{11\pi}{12}$ et $\sin\frac{11\pi}{12}$.
= On identifie $Z = \sqrt2(\cos\frac{11\pi}{12} + i\sin\frac{11\pi}{12})$ : $\cos\frac{11\pi}{12} = -\frac{\sqrt6 + \sqrt2}{4}$, $\sin\frac{11\pi}{12} = \frac{\sqrt6 - \sqrt2}{4}$.
```

## Exercice 3 · polynôme et fraction rationnelle

**Énoncé.** $P(X) = X^5 - X^4 + \alpha X^2 + 7X - 3$. 1) $\alpha$ pour que 1 soit racine. 2) Avec $\alpha = -4$, multiplicité de 1. 3) Factoriser dans $\mathbb R$ puis $\mathbb C$. 4) $F(X) = \dfrac{X}{(X-1)^4(X^2+X+1)}$ : partie entière, partie polaire, décomposition dans $\mathbb R$.

```exercice Exercice 3
? 1) Valeur de $\alpha$.
= $P(1) = 1 - 1 + \alpha + 7 - 3 = \alpha + 4 = 0$, donc $\alpha = -4$.
reponse: -4

? 2) Multiplicité de la racine 1.
= $P'(X) = 5X^4 - 4X^3 - 8X + 7$ : $P'(1) = 0$. $P''(X) = 20X^3 - 12X^2 - 8$ : $P''(1) = 0$. $P'''(1) = 60 - 24 = 36 \ne 0$. La racine 1 est **triple**.
reponse: 3

? 3) Factorisation.
= Division par $(X-1)^3$ : $P = (X-1)^3(X^2 + 2X + 3)$. Discriminant de $X^2+2X+3$ : $-8 < 0$, irréductible dans $\mathbb R$. Dans $\mathbb C$ : $P = (X-1)^3(X + 1 - i\sqrt2)(X + 1 + i\sqrt2)$.

? 4) Décomposition de $F$ dans $\mathbb R$.
= Degré du numérateur < degré du dénominateur : **partie entière nulle**. On trouve $F = \frac{1/3}{(X-1)^4} + \frac{0}{(X-1)^3} - \frac{1/9}{(X-1)^2} + \frac{1/9}{X-1} - \frac{1}{9}\cdot\frac{X+1}{X^2+X+1}$. Contrôle : le coefficient de $\frac{1}{(X-1)^4}$ vaut $\frac{1}{1+1+1} = \frac13$ (cache-cache en $X = 1$).
```

## Exercice 4 · système par la méthode de Gauss

**Énoncé.** $x + 2y + 3z = 1$ ; $-x - 3y + 5z = 2$ ; $x + y + z = -1$.

```etapes Pivot de Gauss
1. L2 ← L2 + L1 : −y + 8z = 3.
2. L3 ← L3 − L1 : −y − 2z = −2.
3. L3 ← L3 − L2 : −10z = −5, donc z = 1/2.
4. Remonte : y = 8z − 3 = 1, puis x = 1 − 2y − 3z = −5/2.
```

```exercice Exercice 4
? Solution du système (donne $x$).
= $(x, y, z) = (-\frac52, 1, \frac12)$. Vérifie dans la 3e équation : $-2{,}5 + 1 + 0{,}5 = -1$.
reponse: -2.5
```

## QCM du sujet

```qcm
? La négation de $A \Rightarrow B$ est :
- $\neg A \Rightarrow \neg B$
+ $A \wedge \neg B$
- $\neg A \vee B$
= Une implication est fausse seulement quand A est vrai et B faux.

? $S_3 = 1\times2 + 2\times3$ vaut :
- 6
+ 8
- 12
= $\frac{3\cdot2\cdot4}{3} = 8$.

? Les racines carrées de $9+40i$ :
+ $\pm(5+4i)$
- $\pm(4+5i)$
- $\pm(3+\sqrt{40}\,i)$
= $a^2 = 25$, $b^2 = 16$, même signe.

? Le module de $-\sqrt3 - i$ :
- 1
+ 2
- $\sqrt3$
= $\sqrt{3 + 1}$.

? Un argument de $1 + i$ :
+ $\frac{\pi}{4}$
- $\frac{\pi}{2}$
- $-\frac{\pi}{4}$
= Partie réelle et imaginaire égales et positives.

? 1 est racine de multiplicité 3 de P si :
- $P(1) = P'(1) = 0$
+ $P(1) = P'(1) = P''(1) = 0$ et $P'''(1) \ne 0$
- $P'''(1) = 0$
= La multiplicité est l'ordre de la première dérivée non nulle.

? $X^2 + 2X + 3$ dans $\mathbb R$ :
- se factorise en $(X+1)(X+3)$
+ est irréductible
- a une racine double
= Discriminant $4 - 12 = -8$.

? Partie entière de $\frac{X}{(X-1)^4(X^2+X+1)}$ :
+ 0
- X
- 1
= Numérateur de degré 1, dénominateur de degré 6.

? Coefficient de $\frac{1}{(X-1)^4}$ :
- 1
+ $\frac13$
- $\frac19$
= On multiplie par $(X-1)^4$ et on remplace X par 1 : $\frac{1}{3}$.

? Dans le pivot de Gauss, l'opération autorisée est :
- multiplier une ligne par 0
+ ajouter à une ligne un multiple d'une autre
- échanger une colonne et une ligne
= Les opérations élémentaires gardent les solutions.
```

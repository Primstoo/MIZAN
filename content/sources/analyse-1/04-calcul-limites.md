---
id: calcul-limites
titre: Suites · calculer une limite
seance: Chapitre 2 · Les suites numériques
importance: 5
---

## Avant de commencer

Deux acquis du chapitre précédent suffisent : ce que veut dire « $u_n$ tend vers $\ell$ », et le fait que $\tfrac1n$ tend vers 0.

```exercice Vérifie ton prérequis
? Sans calcul compliqué : vers quoi tend $u_n = 3 + \dfrac1n$ ?
indice: Que devient 1/n quand n grandit ?
reponse: 3
= Vers 3. $\tfrac1n$ devient aussi petit qu'on veut, donc $u_n$ se colle à 3. Si tu hésites, relis l'idée 2 du chapitre « La limite, avec ε et N ».
```

## Comment aborder ce chapitre

> [!astuce] **Pense briques.** On ne revient presque jamais à $\varepsilon$. On connaît quelques limites de base, et on les assemble avec des règles : somme, produit, quotient, encadrement.

> [!piege] Écrire « $\infty - \infty = 0$ » ou « $\tfrac{\infty}{\infty} = 1$ ». Ce sont des **formes indéterminées** : le résultat dépend des suites. Il faut transformer l'expression avant de conclure.

À la fin, tu sais calculer la limite de presque toutes les suites d'un TD de première année.

## Idée 1 · Les briques et les règles

**Limites de référence**

- $\dfrac{1}{n^\alpha} \to 0$ pour tout $\alpha > 0$ (donc $\tfrac1n$, $\tfrac1{n^2}$, $\tfrac1{\sqrt n}$).
- $q^n \to 0$ si $|q| < 1$ ; $q^n \to +\infty$ si $q > 1$ ; pas de limite si $q \le -1$.

**Règles.** Si $u_n \to \ell$ et $v_n \to \ell'$ (deux limites finies) :

- $u_n + v_n \to \ell + \ell'$ ;
- $u_n \times v_n \to \ell \times \ell'$ ;
- $\dfrac{u_n}{v_n} \to \dfrac{\ell}{\ell'}$ si $\ell' \ne 0$.

Les quatre formes indéterminées à reconnaître : $\infty - \infty$, $0 \times \infty$, $\dfrac{\infty}{\infty}$, $\dfrac00$.

## Idée 2 · Lever une forme indéterminée

Deux gestes couvrent la plupart des cas.

```etapes Geste 1 : factoriser par le terme dominant
La suite :: $u_n = \dfrac{3n^2 + n}{2n^2 - 5}$. En haut et en bas, ça part vers l'infini : forme $\tfrac{\infty}{\infty}$.
On factorise par n² :: $u_n = \dfrac{n^2\left(3 + \tfrac1n\right)}{n^2\left(2 - \tfrac5{n^2}\right)}$.
On simplifie :: $u_n = \dfrac{3 + \tfrac1n}{2 - \tfrac5{n^2}}$. Il n'y a plus rien d'indéterminé.
On applique les règles :: Le haut tend vers 3, le bas vers 2. Donc $u_n \to \tfrac32$.
```

```etapes Geste 2 : la quantité conjuguée
La suite :: $u_n = \sqrt{n + 1} - \sqrt n$. Forme $\infty - \infty$.
On multiplie en haut et en bas :: par $\sqrt{n+1} + \sqrt n$, pour utiliser $(a - b)(a + b) = a^2 - b^2$.
Le haut se simplifie :: $(n + 1) - n = 1$. Donc $u_n = \dfrac{1}{\sqrt{n+1} + \sqrt n}$.
On conclut :: Le bas tend vers $+\infty$, donc $u_n \to 0$.
```

> [!retenir] Fraction de polynômes : **factoriser par la plus grande puissance**. Différence de racines : **quantité conjuguée**.

## Idée 3 · Le théorème des gendarmes

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="La suite u est coincée entre deux suites v et w qui tendent vers la même limite">
<line x1="30" y1="90" x2="330" y2="90" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 5"/>
<path d="M40 20 C110 70 200 84 325 88" fill="none" stroke="currentColor" stroke-width="2.5"/>
<path d="M40 160 C110 112 200 96 325 92" fill="none" stroke="currentColor" stroke-width="2.5"/>
<g fill="#D9824F"><circle cx="60" cy="120" r="4.5"/><circle cx="90" cy="62" r="4.5"/><circle cx="120" cy="108" r="4.5"/><circle cx="150" cy="76" r="4.5"/><circle cx="180" cy="98" r="4.5"/><circle cx="210" cy="84" r="4.5"/><circle cx="240" cy="93" r="4.5"/><circle cx="270" cy="88" r="4.5"/><circle cx="300" cy="91" r="4.5"/></g>
<g font-family="sans-serif" font-size="13" fill="currentColor" font-weight="700"><text x="48" y="16">w</text><text x="48" y="168">v</text><text x="8" y="94">ℓ</text><text x="96" y="52" fill="#D9824F">u</text></g>
</svg>
```

Si, à partir d'un certain rang, $v_n \le u_n \le w_n$, et si $v_n$ et $w_n$ tendent vers la **même** limite $\ell$, alors $u_n \to \ell$.

**Exemple.** $u_n = \dfrac{\sin n}{n}$. On ne sait rien de précis sur $\sin n$, mais $-1 \le \sin n \le 1$, donc $-\tfrac1n \le u_n \le \tfrac1n$. Les deux gendarmes tendent vers 0 : $u_n \to 0$.

Deux versions qui servent tout le temps :

- si $|u_n - \ell| \le v_n$ et $v_n \to 0$, alors $u_n \to \ell$ ;
- **bornée × tend vers 0 = tend vers 0**.

Et vers l'infini, un seul gendarme suffit : si $u_n \ge v_n$ et $v_n \to +\infty$, alors $u_n \to +\infty$.

## Idée 4 · Les inégalités deviennent larges à la limite

Si $u_n < v_n$ pour tout $n$ et que les deux suites convergent, on peut seulement dire $\ell \le \ell'$.

**Exemple.** $\tfrac1n > 0$ pour tout $n$, et pourtant la limite vaut 0, qui n'est pas strictement positif.

> [!piege] Une inégalité **stricte** entre les termes donne une inégalité **large** entre les limites.

## S'exercer

```exercice Calcule ces limites
? $u_n = \dfrac{5n^3 - n}{2n^3 + 7}$
indice: Factorise par n³ en haut et en bas.
= $u_n = \dfrac{5 - \tfrac1{n^2}}{2 + \tfrac7{n^3}} \to \dfrac52$.

? $u_n = \dfrac{n + (-1)^n}{n}$
indice: Sépare en deux fractions.
reponse: 1
= $u_n = 1 + \dfrac{(-1)^n}{n}$. Le second terme est borné × $\tfrac1n$, il tend vers 0. Donc $u_n \to 1$.

? $u_n = \sqrt{n^2 + n} - n$
indice: Quantité conjuguée, puis factorise par n au dénominateur.
= $u_n = \dfrac{n}{\sqrt{n^2 + n} + n} = \dfrac{1}{\sqrt{1 + \tfrac1n} + 1} \to \dfrac12$.

? $u_n = \dfrac{2^n + 3^n}{3^n}$
indice: Sépare et reconnais une suite géométrique.
reponse: 1
= $u_n = \left(\tfrac23\right)^n + 1$. Comme $\left|\tfrac23\right| < 1$, $\left(\tfrac23\right)^n \to 0$, donc $u_n \to 1$.
```

## Flashcards

```cartes
Limite de $q^n$ selon $q$ :: $0$ si $|q| < 1$ ; $+\infty$ si $q > 1$ ; pas de limite si $q \le -1$ ; $1$ si $q = 1$.
Les quatre formes indéterminées :: $\infty - \infty$, $0 \times \infty$, $\tfrac{\infty}{\infty}$, $\tfrac00$.
Fraction de polynômes en $n$ : quel geste ? :: Factoriser par la plus grande puissance de $n$, en haut et en bas.
Différence de deux racines : quel geste ? :: Multiplier et diviser par la quantité conjuguée.
Théorème des gendarmes :: Si $v_n \le u_n \le w_n$ à partir d'un rang et si $v_n$, $w_n$ tendent vers la même limite $\ell$, alors $u_n \to \ell$.
Bornée × tend vers 0 :: Tend vers 0.
$u_n < v_n$ pour tout $n$ : que dire des limites ? :: Seulement $\ell \le \ell'$ : l'inégalité devient large.
```

## QCM du chapitre

```qcm
? La limite de $\dfrac{3n^2 + n}{2n^2 - 5}$ est :
- $+\infty$
+ $\tfrac32$
- $0$
= On factorise par $n^2$ : il reste $\tfrac{3 + 1/n}{2 - 5/n^2}$.

? La limite de $(0{,}5)^n$ est :
+ $0$
- $0{,}5$
- $+\infty$
= Suite géométrique de raison $q$ avec $|q| < 1$.

? La limite de $\dfrac{(-1)^n}{n^2}$ est :
- elle n'existe pas
+ $0$
- $1$
= $-\tfrac1{n^2} \le u_n \le \tfrac1{n^2}$ : les deux gendarmes tendent vers 0.

? Laquelle n'est **pas** une forme indéterminée ?
- $\infty - \infty$
- $0 \times \infty$
+ $+\infty + \infty$
= La somme de deux suites qui tendent vers $+\infty$ tend vers $+\infty$, sans ambiguïté.

? Pour appliquer le théorème des gendarmes à $v_n \le u_n \le w_n$, il faut que :
- $v_n$ et $w_n$ soient croissantes
+ $v_n$ et $w_n$ aient la même limite
- $u_n$ soit positive
= Si les deux gendarmes ont des limites différentes, on ne peut rien conclure.

? On sait que $u_n > 0$ pour tout $n$ et que $u_n \to \ell$. Alors :
- $\ell > 0$
+ $\ell \ge 0$
- on ne peut rien dire
= L'inégalité stricte devient large. Exemple : $\tfrac1n > 0$ et la limite vaut 0.

? La limite de $\sqrt{n + 1} - \sqrt n$ est :
+ $0$
- $1$
- $+\infty$
= Par la quantité conjuguée, $u_n = \tfrac{1}{\sqrt{n+1} + \sqrt n}$.

? La suite $2^n$ :
- tend vers 0
- tend vers 2
+ tend vers $+\infty$
= Raison $q = 2 > 1$.

? La limite de $\dfrac{\sin n}{n}$ est :
- elle n'existe pas, car $\sin n$ n'a pas de limite
+ $0$
- $1$
= $\sin n$ est bornée et $\tfrac1n \to 0$ : bornée × tend vers 0.

? $(u_n)$ est bornée et $v_n \to 0$. Alors $u_n v_n$ :
+ tend vers 0
- est bornée, sans qu'on puisse en dire plus
- tend vers la limite de $u_n$
= Si $|u_n| \le M$, alors $|u_n v_n| \le M |v_n|$, qui tend vers 0.
```

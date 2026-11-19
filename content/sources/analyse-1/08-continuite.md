---
id: continuite
titre: Continuité en un point et sur un intervalle
seance: Chapitre 3 · Fonctions d'une variable réelle
importance: 4
---

## Avant de commencer

La continuité, c'est une limite particulière : celle qui vaut $f(a)$.

```exercice Vérifie ton prérequis
? $f(x) = \dfrac{x^2 - 1}{x - 1}$ pour $x \ne 1$. Quelle est sa limite en 1 ?
= $f(x) = x + 1$ pour $x \ne 1$, donc la limite vaut 2. Revois « Limite d'une fonction » si besoin.
reponse: 2
```

## Comment aborder ce chapitre

> [!astuce] **Continue = on trace sans lever le crayon, mais on le prouve avec une limite.** Toutes les fonctions usuelles le sont sur leur domaine ; le travail porte sur les points de raccord.

> [!piege] Oublier de comparer à $f(a)$. Avoir une limite en $a$ ne suffit pas : il faut que cette limite **soit égale** à $f(a)$.

À la fin, tu sais vérifier la continuité en un point de raccord, prolonger par continuité et utiliser la continuité avec des suites.

## Idée 1 · La définition

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="À gauche un graphe sans coupure en a, à droite un graphe qui saute en a">
<g stroke="currentColor" stroke-width="2" fill="none"><path d="M20 130 Q80 120 100 80 T160 30"/><path d="M190 120 Q230 110 250 95"/><path d="M250 55 Q280 45 320 30"/></g>
<circle cx="100" cy="80" r="5" fill="#D9824F"/><circle cx="250" cy="95" r="5" fill="#D9824F"/><circle cx="250" cy="55" r="5" fill="none" stroke="#D9824F" stroke-width="2"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="40" y="155" fill="currentColor">continue en a</text><text x="200" y="155" fill="#D9824F">saut : discontinue</text></g>
</svg>
```

$f$ est **continue en $a$** si $\lim_{x \to a} f(x) = f(a)$. Avec $\varepsilon$ : $\forall \varepsilon > 0, \exists \delta > 0, |x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$.

Continue à droite : $\lim_{x \to a^+} f(x) = f(a)$. Continue en $a$ ssi continue à gauche et à droite.

**Exemple.** $E(x)$ est continue à droite en 1 ($E(1) = 1$) mais pas à gauche (limite 0).

## Idée 2 · Étudier un point de raccord

```etapes Méthode pour une fonction définie par morceaux
Calculer f(a) :: Avec la formule qui contient $a$.
Limite à gauche :: Avec la formule valable pour $x < a$.
Limite à droite :: Avec la formule valable pour $x > a$.
Comparer :: Continue en $a$ ssi les trois nombres sont égaux.
```

**Exemple.** $f(x) = x^2$ si $x \le 1$, $f(x) = 2x - 1$ si $x > 1$. $f(1) = 1$, à gauche 1, à droite 1 : continue en 1.

## Idée 3 · Opérations et prolongement

- Sommes, produits, quotients (dénominateur non nul), composées de fonctions continues sont continues.
- Polynômes, $\sin$, $\cos$, $\exp$, $\ln$, $\sqrt{\ }$ sont continues sur leur domaine.

**Prolongement par continuité.** Si $f$ n'est pas définie en $a$ mais a une limite finie $\ell$ en $a$, on pose $\tilde f(a) = \ell$ : la nouvelle fonction est continue en $a$.

**Exemple.** $\dfrac{\sin x}{x}$ se prolonge en 0 par la valeur 1.

## Idée 4 · Continuité et suites

$f$ est continue en $a$ **si et seulement si** pour toute suite $x_n \to a$, $f(x_n) \to f(a)$.

Deux usages fréquents dans les séries de TD :

- **Passer à la limite** dans $u_{n+1} = f(u_n)$ : si $u_n \to \ell$ et $f$ continue en $\ell$, alors $\ell = f(\ell)$.
- **Densité** : si $f$ et $g$ sont continues et égales sur une partie dense $D$ (par exemple $\mathbb Q$), alors $f = g$ partout. Pour $x$ réel, on prend $d_n \in D$ avec $d_n \to x$ : $f(x) = \lim f(d_n) = \lim g(d_n) = g(x)$.

> [!retenir] « Continue + égale sur une partie dense » donne « égale partout ». C'est l'argument final des exercices sur $f(x + y) = f(x) + f(y)$.

## S'exercer

```exercice Continuité
? Pour quelle valeur de $m$ la fonction $f(x) = x + m$ si $x < 0$, $f(x) = \cos x$ si $x \ge 0$ est-elle continue en 0 ?
= $f(0) = 1$, limite à droite 1, limite à gauche $m$. Il faut $m = 1$.
reponse: 1

? $f : \mathbb R \to \mathbb R$ continue et nulle sur $\mathbb Q$. Montre que $f = 0$.
indice: Densité de $\mathbb Q$ par les suites.
= Soit $x$ réel et $r_n = \tfrac{E(nx)}{n} \in \mathbb Q$, $r_n \to x$. Par continuité, $f(x) = \lim f(r_n) = 0$.

? $f(x) = x \sin \tfrac1x$ pour $x \ne 0$. Se prolonge-t-elle par continuité en 0 ?
= Oui : $|f(x)| \le |x| \to 0$. On pose $f(0) = 0$.
```

## Flashcards

```cartes
Continuité en $a$ :: $\lim_{x\to a} f(x) = f(a)$.
Continue en $a$ et limites latérales :: Continue ssi continue à gauche et à droite.
Point de raccord :: Comparer $f(a)$, la limite à gauche et la limite à droite.
Prolongement par continuité :: Si $f$ a une limite finie $\ell$ en $a$ hors domaine, poser $f(a) = \ell$.
Continuité séquentielle :: $f$ continue en $a$ ssi $f(x_n) \to f(a)$ pour toute suite $x_n \to a$.
Passage à la limite dans $u_{n+1} = f(u_n)$ :: Si $u_n \to \ell$ et $f$ continue en $\ell$, alors $f(\ell) = \ell$.
Égales sur une partie dense :: Deux fonctions continues égales sur une partie dense sont égales partout.
$E(x)$ en un entier :: Continue à droite, pas à gauche.
```

## QCM du chapitre

```qcm
? $f$ est continue en $a$ si :
- $f$ a une limite en $a$
+ $\lim_{x\to a} f(x) = f(a)$
- $f$ est définie en $a$
= Il faut l'égalité avec $f(a)$.

? $E(x)$ en $x = 2$ est :
+ continue à droite seulement
- continue à gauche seulement
- continue
= Limite à gauche 1, $E(2) = 2$.

? $\frac{\sin x}{x}$ se prolonge par continuité en 0 par :
- 0
+ 1
- impossible
= Limite connue : 1.

? Une composée de fonctions continues est :
+ continue
- continue seulement si elles sont monotones
- pas forcément continue
= Résultat général.

? $f$ continue, nulle sur $\mathbb Q$. Alors :
- $f$ peut être non nulle sur les irrationnels
+ $f$ est nulle partout
- $f$ est constante non nulle
= Densité de $\mathbb Q$ et continuité.

? $u_n \to \ell$, $u_{n+1} = \cos u_n$. Alors :
+ $\ell = \cos \ell$
- $\ell = 0$
- $\ell = 1$
= $\cos$ est continue : on passe à la limite.

? $f(x) = \frac{1}{x}$ est continue :
- sur $\mathbb R$
+ sur $\mathbb R^*$
- nulle part
= Elle est continue sur son domaine.

? Pour un raccord en $a$, on compare :
+ $f(a)$, limite à gauche et limite à droite
- seulement $f(a)$
- les dérivées à gauche et à droite
= Les dérivées concernent la dérivabilité.

? $f(x) = |x|$ en 0 est :
+ continue
- discontinue
- non définie
= Limites à gauche et à droite égales à 0.

? Caractérisation séquentielle : $f$ continue en $a$ ssi :
- il existe une suite $x_n \to a$ avec $f(x_n) \to f(a)$
+ pour toute suite $x_n \to a$, $f(x_n) \to f(a)$
- $f(n) \to f(a)$
= Il faut toutes les suites.
```

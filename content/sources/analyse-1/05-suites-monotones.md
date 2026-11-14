---
id: suites-monotones
titre: Suites monotones, adjacentes, sous-suites
seance: Chapitre 2 · Les suites numériques
importance: 4
---

## Avant de commencer

Ce chapitre réunit deux idées déjà vues : la **borne supérieure** (le plus petit plafond) et la **définition de la limite**.

```exercice Vérifie ton prérequis
? Quelle est la borne supérieure de l'ensemble $\{ 1 - \tfrac1n,\ n \ge 1 \}$ ? Est-elle atteinte ?
indice: Écris les premiers termes : 0, 1/2, 2/3, 3/4…
= La borne supérieure est 1, et elle n'est pas atteinte. Si ce n'est pas clair, reprends l'idée 3 du chapitre « Majorant, borne supérieure, partie entière » : c'est exactement l'outil de la preuve qui suit.
```

## Comment aborder ce chapitre

> [!astuce] **On prouve qu'une limite existe sans la connaître.** Jusqu'ici, il fallait deviner $\ell$ pour montrer la convergence. Ici, deux informations simples suffisent : la suite monte, et elle a un plafond.

> [!piege] « Croissante et majorée par 5, donc elle tend vers 5. » Faux. Elle converge, mais vers sa borne supérieure, qui est **au plus** 5. La suite $1 - \tfrac1n$ est majorée par 5 et tend vers 1.

À la fin, tu sais prouver une convergence par monotonie, reconnaître deux suites adjacentes et prouver une divergence avec des sous-suites.

## Idée 1 · Étudier le sens de variation

$(u_n)$ est **croissante** si $u_{n+1} \ge u_n$ pour tout $n$, **décroissante** si $u_{n+1} \le u_n$.

Deux méthodes :

- le signe de $u_{n+1} - u_n$ (marche toujours) ;
- si tous les termes sont strictement positifs, comparer $\dfrac{u_{n+1}}{u_n}$ à 1 (pratique avec des produits et des puissances).

**Exemple.** $u_n = \dfrac{n}{n+1}$. On calcule $u_{n+1} - u_n = \dfrac{n+1}{n+2} - \dfrac{n}{n+1} = \dfrac{1}{(n+1)(n+2)} > 0$ : la suite est croissante.

## Idée 2 · Le théorème de la limite monotone

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une suite croissante monte vers son plafond, la borne supérieure, sans le dépasser">
<line x1="30" y1="34" x2="330" y2="34" stroke="#D9824F" stroke-width="2" stroke-dasharray="6 5"/>
<line x1="30" y1="140" x2="330" y2="140" stroke="currentColor" stroke-width="2"/><line x1="30" y1="10" x2="30" y2="140" stroke="currentColor" stroke-width="2"/>
<g fill="currentColor"><circle cx="55" cy="126" r="4.5"/><circle cx="85" cy="92" r="4.5"/><circle cx="115" cy="70" r="4.5"/><circle cx="145" cy="57" r="4.5"/><circle cx="175" cy="49" r="4.5"/><circle cx="205" cy="44" r="4.5"/><circle cx="235" cy="41" r="4.5"/><circle cx="265" cy="39" r="4.5"/><circle cx="295" cy="38" r="4.5"/></g>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="196" y="24" fill="#D9824F">plafond le plus bas : sup</text><text x="60" y="156" fill="currentColor">la suite monte et se tasse dessous</text></g>
</svg>
```

- Toute suite **croissante et majorée** converge, vers la borne supérieure de ses termes.
- Toute suite **décroissante et minorée** converge, vers la borne inférieure de ses termes.
- Une suite croissante **non majorée** tend vers $+\infty$.

Pourquoi : notons $\ell$ la borne supérieure des termes et prenons $\varepsilon > 0$. Par la caractérisation du sup, un terme $u_N$ dépasse $\ell - \varepsilon$. Comme la suite monte, tous les suivants aussi : $\ell - \varepsilon < u_N \le u_n \le \ell$ pour $n \ge N$. Ils sont dans le tube.

```etapes Exemple complet : u₀ = 0 et uₙ₊₁ = √(uₙ + 2)
Majorée par 2 :: Par récurrence. $u_0 = 0 \le 2$. Si $u_n \le 2$, alors $u_{n+1} = \sqrt{u_n + 2} \le \sqrt4 = 2$.
Croissante :: $u_{n+1} \ge u_n$ revient à $u_n + 2 \ge u_n^2$, soit $(u_n - 2)(u_n + 1) \le 0$. C'est vrai puisque $0 \le u_n \le 2$.
Donc elle converge :: Croissante et majorée : la limite $\ell$ existe, avec $0 \le \ell \le 2$.
On trouve la limite :: En passant à la limite dans la relation : $\ell = \sqrt{\ell + 2}$, donc $\ell^2 - \ell - 2 = 0$, soit $\ell = 2$ ou $\ell = -1$. Comme $\ell \ge 0$, on garde $\ell = 2$.
```

> [!retenir] L'ordre ne change pas : **1.** bornée (souvent par récurrence), **2.** monotone, **3.** donc convergente, **4.** la limite vérifie l'équation obtenue en remplaçant $u_n$ et $u_{n+1}$ par $\ell$.

## Idée 3 · Les suites adjacentes

```html
<svg viewBox="0 0 340 150" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une suite qui monte et une suite qui descend se resserrent autour de la même limite">
<line x1="30" y1="75" x2="330" y2="75" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 5"/>
<g fill="#D9824F"><circle cx="55" cy="18" r="4.5"/><circle cx="95" cy="42" r="4.5"/><circle cx="135" cy="55" r="4.5"/><circle cx="175" cy="63" r="4.5"/><circle cx="215" cy="68" r="4.5"/><circle cx="255" cy="71" r="4.5"/><circle cx="295" cy="73" r="4.5"/></g>
<g fill="currentColor"><circle cx="55" cy="132" r="4.5"/><circle cx="95" cy="108" r="4.5"/><circle cx="135" cy="95" r="4.5"/><circle cx="175" cy="87" r="4.5"/><circle cx="215" cy="82" r="4.5"/><circle cx="255" cy="79" r="4.5"/><circle cx="295" cy="77" r="4.5"/></g>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="68" y="20" fill="#D9824F">v descend</text><text x="68" y="138" fill="currentColor">u monte</text><text x="8" y="79" fill="currentColor">ℓ</text></g>
</svg>
```

$(u_n)$ et $(v_n)$ sont **adjacentes** si :

1. $(u_n)$ est croissante ;
2. $(v_n)$ est décroissante ;
3. $v_n - u_n \to 0$.

Alors elles convergent vers la **même** limite $\ell$, et $u_n \le \ell \le v_n$ pour tout $n$.

C'est un étau : chaque paire $(u_n, v_n)$ donne un encadrement de $\ell$, de plus en plus serré. Exemple simple : $u_n = 1 - \tfrac1n$ et $v_n = 1 + \tfrac1n$ encadrent 1.

## Idée 4 · Les sous-suites

Une **sous-suite** s'obtient en ne gardant que certains termes, dans l'ordre : les termes pairs $(u_{2n})$, les termes impairs $(u_{2n+1})$…

- Si $u_n \to \ell$, alors **toute** sous-suite tend vers $\ell$.
- Donc, si deux sous-suites ont des limites différentes, la suite **diverge**. C'est l'outil le plus rapide pour prouver une divergence.
- Dans l'autre sens : si $(u_{2n})$ et $(u_{2n+1})$ tendent vers la même limite $\ell$, alors $u_n \to \ell$.

**Exemple.** $u_n = (-1)^n$ : $u_{2n} = 1 \to 1$ et $u_{2n+1} = -1 \to -1$. Deux limites différentes, donc pas de limite. C'est la preuve du chapitre précédent, en une ligne.

**Théorème de Bolzano-Weierstrass.** Toute suite bornée admet une sous-suite convergente. Pour $(-1)^n$, les termes pairs en sont une.

## S'exercer

```exercice Trois situations types
? Montre que $u_n = \dfrac{n}{n+1}$ converge, sans calculer sa limite.
indice: Croissante (idée 1), et majorée par… ?
= Elle est croissante (calcul de l'idée 1) et majorée par 1, car $n < n + 1$. Par le théorème de la limite monotone, elle converge. (Sa limite est d'ailleurs 1.)

? Montre que $u_n = (-1)^n + \dfrac1n$ diverge.
indice: Regarde les termes pairs et les termes impairs.
= $u_{2n} = 1 + \tfrac1{2n} \to 1$ et $u_{2n+1} = -1 + \tfrac1{2n+1} \to -1$. Deux sous-suites ont des limites différentes : la suite diverge.

? Les suites $u_n = 1 - \dfrac1n$ et $v_n = 1 + \dfrac1n$ sont-elles adjacentes ?
indice: Vérifie les trois conditions, une par une.
= Oui. $(u_n)$ est croissante car $\tfrac1n$ décroît ; $(v_n)$ est décroissante ; $v_n - u_n = \tfrac2n \to 0$. Leur limite commune est 1.
```

## Flashcards

```cartes
Théorème de la limite monotone :: Croissante et majorée : converge vers le sup de ses termes. Décroissante et minorée : converge vers l'inf.
Croissante et majorée par $M$ : la limite vaut-elle $M$ ? :: Pas forcément. La limite est la borne supérieure, qui est $\le M$.
Croissante et non majorée :: Tend vers $+\infty$.
Deux méthodes pour le sens de variation :: Signe de $u_{n+1} - u_n$, ou comparaison de $\tfrac{u_{n+1}}{u_n}$ à 1 si les termes sont strictement positifs.
Définition de suites adjacentes :: L'une croissante, l'autre décroissante, et leur différence tend vers 0. Elles ont alors la même limite.
Prouver une divergence avec des sous-suites :: Trouver deux sous-suites qui tendent vers des limites différentes.
Théorème de Bolzano-Weierstrass :: Toute suite bornée admet une sous-suite convergente.
Plan pour une suite $u_{n+1} = f(u_n)$ :: Bornée, monotone, donc convergente, puis la limite vérifie $\ell = f(\ell)$.
```

## QCM du chapitre

```qcm
? Une suite croissante et majorée :
+ converge
- tend vers $+\infty$
- peut ne pas avoir de limite
= C'est le théorème de la limite monotone.

? $(u_n)$ est croissante et majorée par 5. Sa limite $\ell$ vérifie :
- $\ell = 5$
+ $\ell \le 5$
- $\ell > 5$
= La limite est la borne supérieure des termes, qui ne dépasse aucun majorant.

? Une suite croissante et non majorée :
- converge
+ tend vers $+\infty$
- est bornée
= Elle dépasse toute barre, et comme elle monte, elle reste au-dessus.

? Pour que $(u_n)$ et $(v_n)$ soient adjacentes, il faut :
- qu'elles soient toutes les deux croissantes
+ l'une croissante, l'autre décroissante, et $v_n - u_n \to 0$
- qu'elles aient la même limite
= Avoir la même limite est la conclusion, pas la définition.

? On sait que $u_{2n} \to 1$ et $u_{2n+1} \to -1$. Alors $(u_n)$ :
- converge vers 0
- converge vers 1
+ diverge
= Si elle convergeait, toutes ses sous-suites auraient la même limite.

? Si $u_n \to \ell$, alors la sous-suite $(u_{2n})$ :
+ tend vers $\ell$
- tend vers $2\ell$
- peut diverger
= Toute sous-suite d'une suite convergente a la même limite.

? Pour $u_n = \dfrac{n}{n+1}$, $u_{n+1} - u_n$ vaut $\dfrac{1}{(n+1)(n+2)}$. La suite est donc :
+ croissante
- décroissante
- constante
= La différence est strictement positive.

? Le théorème de Bolzano-Weierstrass affirme que toute suite bornée :
- converge
+ admet une sous-suite convergente
- est monotone
= $(-1)^n$ est bornée, ne converge pas, mais ses termes pairs forment une sous-suite convergente.

? Pour $u_0 = 0$ et $u_{n+1} = \sqrt{u_n + 2}$, la limite est :
- $-1$
+ $2$
- $\sqrt2$
= $\ell = \sqrt{\ell + 2}$ donne $\ell = 2$ ou $\ell = -1$, et les termes sont positifs.

? Une suite décroissante et minorée converge vers :
- son premier terme
+ la borne inférieure de ses termes
- n'importe lequel de ses minorants
= Par symétrie avec le cas croissant : le plus grand des minorants.
```

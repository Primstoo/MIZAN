---
id: limite-suite
titre: Suites · la limite, avec ε et N
seance: Chapitre 2 · Les suites numériques
importance: 5
---

## Avant de commencer

Un seul prérequis, vu au chapitre 1 : $|u - \ell| < \varepsilon$ veut dire que $u$ est à moins de $\varepsilon$ de $\ell$, donc dans l'intervalle $]\ell - \varepsilon,\ \ell + \varepsilon[$.

```exercice Vérifie ton prérequis
? Traduis $|u - 2| < 0{,}1$ en encadrement de $u$.
indice: Centre 2, rayon 0,1.
= $1{,}9 < u < 2{,}1$. Si ce passage n'est pas immédiat, reprends l'idée 2 du chapitre « Inégalités et valeur absolue » avant de continuer : toute la définition de la limite repose dessus.
```

## Comment aborder ce chapitre

> [!astuce] **Pense à un jeu à deux.** Un adversaire choisit une marge $\varepsilon$, aussi petite qu'il veut. Toi, tu dois répondre par un rang $N$ à partir duquel **tous** les termes sont dans la marge. Si tu sais toujours répondre, la suite converge.

> [!piege] Croire que $N$ est fixé une fois pour toutes. $N$ **dépend de** $\varepsilon$ : plus la marge est fine, plus il faut aller loin. C'est pour ça que « pour tout $\varepsilon$ » est écrit **avant** « il existe $N$ ».

À la fin, tu sais lire la définition, la faire tourner sur un exemple, et prouver qu'une suite n'a pas de limite.

## Idée 1 · Une suite est une liste numérotée

Une suite $(u_n)$ associe un réel à chaque entier $n$.

- $u_n = \tfrac1n$ : $1,\ \tfrac12,\ \tfrac13,\ \tfrac14,\dots$ les termes se tassent vers 0.
- $u_n = (-1)^n$ : $-1,\ 1,\ -1,\ 1,\dots$ elle saute sans se poser.
- $u_n = n^2$ : $1,\ 4,\ 9,\ 16,\dots$ elle part vers l'infini.

La question du chapitre : que font les termes **quand $n$ devient grand** ?

## Idée 2 · Converger, c'est finir dans le tube

```html
<svg viewBox="0 0 340 190" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Les termes de la suite 1 sur n entrent dans la bande de largeur epsilon autour de zéro à partir du rang N et n'en sortent plus">
<rect x="30" y="118" width="300" height="44" fill="#D9824F" opacity=".18"/>
<line x1="30" y1="118" x2="330" y2="118" stroke="#D9824F" stroke-width="1.5" stroke-dasharray="5 4"/>
<line x1="30" y1="162" x2="330" y2="162" stroke="#D9824F" stroke-width="1.5" stroke-dasharray="5 4"/>
<line x1="30" y1="140" x2="330" y2="140" stroke="currentColor" stroke-width="2"/>
<line x1="30" y1="10" x2="30" y2="176" stroke="currentColor" stroke-width="2"/>
<g fill="currentColor"><circle cx="60" cy="20" r="4.5"/><circle cx="90" cy="80" r="4.5"/><circle cx="120" cy="100" r="4.5"/></g>
<g fill="#D9824F"><circle cx="150" cy="110" r="4.5"/><circle cx="180" cy="116" r="4.5"/><circle cx="210" cy="120" r="4.5"/><circle cx="240" cy="123" r="4.5"/><circle cx="270" cy="125" r="4.5"/><circle cx="300" cy="127" r="4.5"/></g>
<line x1="210" y1="10" x2="210" y2="176" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 5"/>
<g font-family="sans-serif" font-size="13" fill="currentColor">
<text x="214" y="22" font-weight="700">rang N</text><text x="36" y="136" font-weight="700">ℓ</text><text x="36" y="113" fill="#D9824F" font-weight="700">ℓ + ε</text><text x="36" y="177" fill="#D9824F" font-weight="700">ℓ − ε</text><text x="236" y="182">n ≥ N : dans le tube</text></g>
</svg>
```

On dit que $(u_n)$ **converge vers** $\ell$ si :

> [!retenir] **Pour tout** $\varepsilon > 0$, **il existe** un rang $N$ tel que, **pour tout** $n \ge N$ : $|u_n - \ell| < \varepsilon$.

En symboles :

$$\forall \varepsilon > 0,\ \exists N,\ \forall n \ge N,\ |u_n - \ell| < \varepsilon$$

Lecture mot à mot :

- **pour tout $\varepsilon > 0$** : quelle que soit la largeur du tube ;
- **il existe $N$** : on trouve un rang ;
- **pour tout $n \ge N$** : à partir de là, **tous** les termes, sans exception ;
- **$|u_n - \ell| < \varepsilon$** : sont dans le tube.

Quelques termes dans le tube ne suffisent pas. Il faut qu'ils y soient tous, pour toujours, à partir d'un certain rang.

## Idée 3 · Faire tourner la définition

```etapes Prouver que 1/n tend vers 0
L'adversaire joue :: Il donne un $\varepsilon > 0$ quelconque. On ne le choisit pas.
Ce qu'on veut :: $\left|\tfrac1n - 0\right| < \varepsilon$, c'est-à-dire $\tfrac1n < \varepsilon$.
On isole n :: $\tfrac1n < \varepsilon$ équivaut à $n > \tfrac1\varepsilon$.
On répond par un rang :: $N = E\!\left(\tfrac1\varepsilon\right) + 1$. Cet entier est strictement plus grand que $\tfrac1\varepsilon$.
On conclut :: Pour tout $n \ge N$ : $n > \tfrac1\varepsilon$, donc $\tfrac1n < \varepsilon$. La suite converge vers 0.
Avec un nombre :: Pour $\varepsilon = 0{,}01$ : $N = 101$. À partir du 101ᵉ terme, tout est à moins de 0,01 de zéro.
```

**Deuxième exemple.** $u_n = \dfrac{2n + 1}{n + 3}$ tend vers 2.

$$|u_n - 2| = \left|\frac{2n + 1 - 2(n + 3)}{n + 3}\right| = \frac{5}{n + 3}$$

On veut $\tfrac{5}{n+3} < \varepsilon$. Il suffit que $n > \tfrac5\varepsilon$, car alors $n + 3 > \tfrac5\varepsilon$. On prend $N = E\!\left(\tfrac5\varepsilon\right) + 1$.

> [!retenir] La méthode ne change jamais : **calculer $|u_n - \ell|$, le simplifier ou le majorer, isoler $n$, en déduire $N$.** On n'a pas besoin du plus petit $N$ : n'importe quel rang qui marche suffit.

## Idée 4 · Ce qui découle de la définition

- **La limite est unique.** Une suite ne peut pas finir dans deux tubes disjoints à la fois.
- **Toute suite convergente est bornée.** À partir du rang $N$ les termes sont dans le tube, et avant il n'y en a qu'un nombre fini.
- **La réciproque est fausse.** $(-1)^n$ est bornée et ne converge pas.

Pourquoi $(-1)^n$ n'a pas de limite : supposons qu'elle tende vers $\ell$, et prenons $\varepsilon = 1$. À partir d'un rang, on aurait à la fois $|1 - \ell| < 1$ et $|-1 - \ell| < 1$. Mais alors $2 = |1 - (-1)| \le |1 - \ell| + |\ell + 1| < 2$ : impossible.

**Limite infinie.** $(u_n)$ tend vers $+\infty$ si, pour tout réel $A$, il existe un rang $N$ tel que $u_n > A$ pour tout $n \ge N$. Ici le tube est remplacé par une barre que la suite finit par dépasser pour toujours. Exemple : $n^2 > A$ dès que $n > \sqrt{|A|}$.

## S'exercer

```exercice Applique la méthode
? Prouve que $u_n = \dfrac{3}{n^2}$ tend vers 0 : donne un rang $N$ en fonction de $\varepsilon$.
indice: Isole n dans 3/n² < ε.
= $\tfrac{3}{n^2} < \varepsilon$ équivaut à $n^2 > \tfrac3\varepsilon$, soit $n > \sqrt{3/\varepsilon}$. On prend $N = E\!\left(\sqrt{3/\varepsilon}\right) + 1$.

? La suite $u_n = \dfrac{(-1)^n}{n}$ converge-t-elle ?
indice: Regarde |u_n|.
= Oui, vers 0. $|u_n - 0| = \tfrac1n$, qui est inférieur à $\varepsilon$ dès que $n > \tfrac1\varepsilon$. Le signe qui alterne ne gêne pas : les termes sont dans le tube des deux côtés de 0.

? Pour $u_n = \tfrac1n$ et $\varepsilon = 0{,}1$, quel est le plus petit rang $N$ qui convient ?
indice: Il faut 1/n < 0,1 strictement.
reponse: 11
= $\tfrac1n < 0{,}1$ équivaut à $n > 10$. Le plus petit rang est $N = 11$ (pour $n = 10$, $\tfrac1{10} = 0{,}1$ n'est pas strictement inférieur).
```

## Flashcards

```cartes
Définition de « $(u_n)$ converge vers $\ell$ » :: Pour tout $\varepsilon > 0$, il existe $N$ tel que pour tout $n \ge N$, $|u_n - \ell| < \varepsilon$.
L'image à garder pour la convergence :: Un tube de largeur $\varepsilon$ autour de $\ell$ : à partir d'un rang, tous les termes y sont.
De quoi dépend le rang $N$ ? :: De $\varepsilon$. Plus la marge est fine, plus $N$ est grand.
Méthode pour prouver une limite :: Calculer $|u_n - \ell|$, simplifier ou majorer, isoler $n$, en déduire $N$.
Convergente implique… :: Bornée. La réciproque est fausse : $(-1)^n$.
Définition de « $u_n$ tend vers $+\infty$ » :: Pour tout réel $A$, il existe $N$ tel que pour tout $n \ge N$, $u_n > A$.
Combien de limites peut avoir une suite ? :: Une seule au plus : la limite est unique.
```

## QCM du chapitre

```qcm
? Quelle écriture est la définition de « $(u_n)$ converge vers $\ell$ » ?
- Il existe $N$ tel que pour tout $\varepsilon > 0$ et tout $n \ge N$, $|u_n - \ell| < \varepsilon$
+ Pour tout $\varepsilon > 0$, il existe $N$ tel que pour tout $n \ge N$, $|u_n - \ell| < \varepsilon$
- Pour tout $\varepsilon > 0$, il existe $n$ tel que $|u_n - \ell| < \varepsilon$
= L'ordre compte : $\varepsilon$ d'abord, puis $N$ qui en dépend, puis tous les $n \ge N$.

? Pour $u_n = \tfrac1n$ et $\varepsilon = 0{,}1$, le plus petit rang $N$ qui convient est :
- $10$
+ $11$
- $100$
= Il faut $\tfrac1n < 0{,}1$ strictement, donc $n > 10$.

? La suite $u_n = (-1)^n$ :
- converge vers 0
- converge vers 1
+ n'a pas de limite
= Elle saute entre $-1$ et $1$ : aucun tube de largeur 1 ne contient tous ses termes à partir d'un rang.

? Toute suite convergente est :
+ bornée
- croissante
- positive
= À partir d'un rang les termes sont dans le tube, et avant ce rang il n'y en a qu'un nombre fini.

? Toute suite bornée est-elle convergente ?
- Oui
+ Non
- Oui, si elle est positive
= Contre-exemple : $(-1)^n$ est bornée et ne converge pas.

? La limite de $u_n = \dfrac{2n + 1}{n + 3}$ est :
- $\tfrac13$
+ $2$
- $+\infty$
= $|u_n - 2| = \tfrac{5}{n+3}$, qui devient aussi petit qu'on veut.

? Dans la définition de la limite, le rang $N$ :
- est le même pour tous les $\varepsilon$
+ dépend de $\varepsilon$
- dépend de $n$
= Plus $\varepsilon$ est petit, plus il faut aller loin dans la suite.

? « À partir d'un certain rang, tous les termes sont dans le tube » veut dire :
- au moins un terme est dans le tube
- une infinité de termes sont dans le tube
+ il existe $N$ tel que tous les termes de rang $n \ge N$ sont dans le tube
= Une infinité ne suffit pas : $(-1)^n$ a une infinité de termes égaux à 1 sans converger vers 1.

? « $(u_n)$ tend vers $+\infty$ » signifie :
- $u_n$ est croissante
+ pour tout réel $A$, il existe $N$ tel que $u_n > A$ pour tout $n \ge N$
- $u_n$ n'est pas bornée
= La suite doit dépasser toute barre et rester au-dessus. « Non bornée » ne suffit pas : $0, 1, 0, 2, 0, 3,\dots$ n'est pas bornée et ne tend pas vers $+\infty$.

? Une suite peut-elle converger vers deux limites différentes ?
- Oui
+ Non
- Seulement si elle alterne
= La limite est unique : deux tubes assez fins autour de deux limites distinctes sont disjoints.
```

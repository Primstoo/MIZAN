---
id: coulomb-champ-potentiel
titre: Coulomb, champ et potentiel électrostatiques
seance: Série 2 · Exercices I, II, III, VI, VII
importance: 5
---

## Avant de commencer

Il faut savoir additionner des vecteurs par composantes.

```exercice Vérifie ton prérequis
? $\vec u = (3, 4)$ et $\vec v = (-3, 4)$. Que vaut $\vec u + \vec v$ ?
= $(0, 8)$ : les composantes en x s'annulent. C'est exactement ce qui arrive sur un axe de symétrie.
```

## Comment aborder ce chapitre

> [!astuce] **Pense symétrie avant calcul.** Sur un axe de symétrie, les composantes perpendiculaires s'annulent deux à deux : il ne reste qu'une composante à calculer.

> [!piege] Ajouter les normes des champs au lieu des vecteurs. Deux champs de 10 N/C ne donnent pas 20 N/C s'ils ne sont pas dans le même sens.

À la fin, tu sais calculer le champ et le potentiel de charges ponctuelles, d'un fil et d'un anneau.

## Idée 1 · Loi de Coulomb et champ d'une charge

$\vec F = k\dfrac{q_1q_2}{r^2}\vec u$, avec $k = \dfrac{1}{4\pi\varepsilon_0} \approx 9\cdot10^9$ SI. Le champ créé par q est $\vec E = k\dfrac{q}{r^2}\vec u_r$ et le potentiel $V = k\dfrac{q}{r}$.

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Deux charges sur Oy, point M sur l'axe Ox : les composantes selon y s'annulent" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M60 110V10M60 60h240"/><path d="M60 25L220 60M60 95L220 60" stroke-dasharray="4 4"/><path d="M220 60l50 11M220 60l50-11" stroke="#D9824F"/><path d="M220 60h80" stroke="#D9824F" stroke-width="3"/></g>
<g fill="currentColor" font-size="11"><circle cx="60" cy="25" r="5"/><circle cx="60" cy="95" r="5"/><text x="70" y="22">A (+q)</text><text x="70" y="108">B (+q)</text><text x="214" y="52">M</text></g>
</svg>
```

## Idée 2 · Le potentiel et la circulation

$\vec E = -\overrightarrow{\operatorname{grad}}\,V$. La circulation de $\vec E$ de A à B vaut $V_A - V_B$, quel que soit le chemin ; sur un contour fermé, elle est nulle.

## Idée 3 · Distributions continues

```etapes Calculer un champ créé par une distribution continue
1. Découpe en charges élémentaires : dq = λ dl, σ dS ou ρ dV.
2. Écris le champ dE d'un élément.
3. Utilise la symétrie pour ne garder qu'une composante.
4. Intègre.
```

> [!retenir] Fil infini : $E = \dfrac{\lambda}{2\pi\varepsilon_0 a}$ à la distance a. Anneau de rayon R sur son axe : $E_z = \dfrac{\lambda R z}{2\varepsilon_0 (R^2+z^2)^{3/2}}$.

## S'exercer

```exercice Série 2
? Ex. II-1 : deux charges +q en $(0, \pm a, 0)$. Champ en $M(x, 0, 0)$ ?
= Les composantes en y s'annulent. Chaque charge donne $k\frac{q}{a^2+x^2}$, projeté sur Ox par $\frac{x}{\sqrt{a^2+x^2}}$. Total : $\vec E = \dfrac{2kqx}{(a^2+x^2)^{3/2}}\vec e_x$.

? Ex. II-2 : même chose avec −q en A.
= Cette fois les composantes en x s'annulent et celles en y s'ajoutent : $\vec E = \dfrac{2kqa}{(a^2+x^2)^{3/2}}(-\vec e_y)$, dirigé de B (+q) vers A (−q).

? Ex. VII : potentiel d'un dipôle de moment $p = qa$ loin des charges.
= $V(M) \approx \dfrac{p\cos\theta}{4\pi\varepsilon_0 r^2}$, puis $E_r = \dfrac{2p\cos\theta}{4\pi\varepsilon_0 r^3}$ et $E_\theta = \dfrac{p\sin\theta}{4\pi\varepsilon_0 r^3}$.
```

> [!attention] Ex. I de la série 2 : la figure n'est pas dans le fichier, et la valeur $q_1 = 1{,}5\cdot10^{-1}$ C est sans doute une coquille pour $1{,}5\cdot10^{-3}$ C (même ordre que $q_2$ et $q_3$). On ne donne pas de valeur numérique.

## Flashcards

```cartes
$k$ :: $\frac{1}{4\pi\varepsilon_0} \approx 9\cdot10^9$ N·m²·C⁻².
Lien champ-potentiel :: $\vec E = -\overrightarrow{\operatorname{grad}}V$.
Circulation de E sur un contour fermé :: Nulle.
Champ d'un fil infini :: $\frac{\lambda}{2\pi\varepsilon_0 a}$.
```

## QCM du chapitre

```qcm
? Si la distance double, la force de Coulomb est :
- divisée par 2
+ divisée par 4
- multipliée par 2
= Loi en $1/r^2$.

? Le potentiel d'une charge ponctuelle varie en :
+ $1/r$
- $1/r^2$
- $r$
= Le champ varie en $1/r^2$.

? $\vec E$ est dirigé vers les potentiels :
- croissants
+ décroissants
- constants
= Signe moins du gradient.

? Deux charges +q symétriques : sur la médiatrice, E est :
+ porté par la médiatrice
- perpendiculaire à la médiatrice
- nul partout
= Les composantes perpendiculaires s'annulent.

? La circulation de E de A à B dépend :
- du chemin
+ seulement de A et B
- de la vitesse
= Elle vaut $V_A - V_B$.

? Une charge linéique s'écrit :
+ dq = λ dl
- dq = σ dS
- dq = ρ dV
= λ en C/m.

? Au centre d'un anneau chargé (z = 0), le champ est :
+ nul
- maximal
- infini
= La formule contient z au numérateur.

? Le champ d'un dipôle loin des charges varie en :
- $1/r^2$
+ $1/r^3$
- $1/r$
= Le potentiel varie en $1/r^2$.

? L'unité du champ électrique :
+ V/m
- V·m
- C/m²
= Ou N/C.

? $\varepsilon_0$ est :
- une charge
+ la permittivité du vide
- un potentiel
= $8{,}85\cdot10^{-12}$ F/m.
```

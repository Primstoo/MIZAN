---
id: series-corrigees
titre: Séries de TD corrigées (1 à 3)
seance: TD · Séries 1, 2 et 3
importance: 4
---

Les trois séries du semestre, avec la méthode et les résultats. Les corrections fournies sont manuscrites (étudiant) ; nous avons recalculé les résultats clés.

> [!attention] Série 1, ex. 1 : la correction manuscrite conclut que la base $(\vec e_1, \vec e_2, \vec e_3)$ « n'est pas orthogonale » sans le vérifier par des produits scalaires ; la seule conclusion démontrée est qu'elle **n'est pas normée** ($\|\vec e_1\| = \sin\theta_A \ne 1$). Série 2, ex. 2 : la valeur finale de $R_c$ est mal lisible dans la correction ; le calcul donne $R_c = \dfrac{9\sqrt2}{4}e^t$.

## Série 1 · Rappels mathématiques

```exercice Série 1
? Ex. 1 : avec $\vec u_A, \vec u_B, \vec u_C$ unitaires, on pose $\vec e_1 = \vec u_B\wedge\vec u_C$. Pourquoi $\|\vec e_1\| = \sin\theta_A$ ?
= $\|\vec u_B\wedge\vec u_C\| = \|\vec u_B\|\,\|\vec u_C\|\,|\sin\theta_A| = \sin\theta_A$ (normes égales à 1, $\theta_A\in[0,\pi]$). On vérifie avec $\sin^2\theta_A + \cos^2\theta_A = 1$.
? Ex. 2 : dimensions et domaines de $x, y, z, \rho, \varphi$ ?
= $x, y, z, \rho$ en mètres ; $\varphi$ en radians. $x, y, z\in\mathbb R$, $\rho\ge0$, $\varphi\in[0, 2\pi[$.
? Ex. 3 : calcule $\dfrac{d\vec e_x}{dt}\Big|_{\mathcal R_{cyl}}$.
indice: Dans le repère cylindrique, c'est $\vec e_\rho$ qui est fixe ; $\vec e_x = \cos\varphi\,\vec e_\rho - \sin\varphi\,\vec e_\varphi$.
= En dérivant avec $\vec e_\rho, \vec e_\varphi$ fixes : $\dfrac{d\vec e_x}{dt} = -\dot\varphi(\sin\varphi\,\vec e_\rho + \cos\varphi\,\vec e_\varphi) = -\dot\varphi\,\vec e_y$. De même $\dfrac{d\vec e_y}{dt} = \dot\varphi\,\vec e_x$.
```

## Série 2 · Cinématique et changement de référentiel

```exercice Série 2
? Ex. 1 : rayon de courbure de $x = t-1$, $y = -t^2+1$ ?
= $R_c = \dfrac{(1+4t^2)^{3/2}}{2}$.
? Ex. 3 : accélération de Coriolis de l'anneau sur le cercle tournant ?
= $\vec\gamma_c = 2r\dot\alpha\dot\theta\cos\theta\,\vec e_{y'}$ (complémentaire, perpendiculaire au plan du cercle).
? Ex. 4 : vitesse absolue de l'anneau à la sortie de la tige ?
= $\vec V_a = \omega\sqrt{L^2 - r_0^2}\,\vec i_1 + \omega L\,\vec j_1$.
```

## Série 3 · Dynamique et théorèmes généraux

```exercice Série 3
? Ex. 1 : équation différentielle de l'anneau sur le cerceau en rotation ($\overrightarrow{O_1M} = r\vec e_\rho$, $\overrightarrow{OO_1} = a\vec i_1 + b\vec k_1$) ?
= Projection du PFD sur $\vec e_\theta$ : $\ddot\theta = \dfrac gr\sin\theta + \dfrac ar\omega^2\cos\theta + \omega^2\sin\theta\cos\theta$. Avec $\theta = \dot\theta = 0$ à $t = 0$, une intégration donne $\dot\theta^2$.
? Ex. 3 : $\mathcal R_1$ (lié au cerceau en translation, $\overrightarrow{OO_1} = b\vec j + \tfrac12 at^2\vec k$) est-il galiléen ?
= Non : $\vec\gamma(O_1/\mathcal R) = a\vec k \ne \vec 0$, translation rectiligne **accélérée**.
? Ex. 3 : équation en $\theta$ (par PFD, TEC, TEM ou TMC) ?
= $\ddot\theta = -\dfrac{g+a}{R}\cos\theta$, et la réaction : $R_\rho = m\sin\theta(a+g) - mR\dot\theta^2$ (au signe de la convention de l'énoncé), $R_z = 0$.
```

## Flashcards

```cartes
Série 2 ex. 1 : $R_c$ :: $(1+4t^2)^{3/2}/2$
Série 2 ex. 4 : temps de sortie :: $\tau = \frac1\omega\,\text{argch}(L/r_0)$
Série 3 ex. 2 : puissance :: $P = 19t^2 - 19t + 8$ W
Série 3 ex. 3 : équation :: $\ddot\theta = -\frac{g+a}{R}\cos\theta$
Série 3 ex. 3 : $\mathcal R_1$ galiléen ? :: non, translation accélérée
Série 3 ex. 3 : $E_c$ dans $\mathcal R_1$ :: $\frac12 mR^2\dot\theta^2$
```

## QCM du chapitre

```qcm
? Dans la série 3 ex. 3, $\vec F_c$ est nulle car :
+ $\mathcal R_1$ est en translation ($\vec\Omega = \vec 0$)
- la vitesse relative est nulle
- il n'y a pas de pesanteur
= $\vec\gamma_c = 2\vec\Omega\wedge\vec V_r = \vec 0$.

? Série 3 ex. 2 : $W = 28{,}7$ J sur la trajectoire, $67{,}3$ J en ligne droite. Donc :
+ la force n'est pas conservative
- la force est conservative
- il y a une erreur de calcul
= Le travail dépend du chemin.

? Série 2 ex. 1 : l'accélération est :
+ constante, $-2\vec j$
- nulle
- variable
= $\ddot y = -2$.

? Série 2 ex. 4 : l'accélération absolue est portée par :
+ $\vec j_1$
- $\vec i_1$
- $\vec k$
= Les termes sur $\vec i_1$ s'annulent.

? Série 3 ex. 3 : $E_p$ de $\vec F_e$ dans $\mathcal R_1$ :
+ $maR\sin\theta$
- $-maR\sin\theta$
- 0
= $\vec F_e = -ma\vec k_1$, conservative.

? Série 1 ex. 4 : $f = 3r^3\sin^2\theta\cos\theta\sin2\varphi$ s'écrit en cartésiennes :
+ $6xyz$
- $3xyz$
- $x^2+y^2+z^2$
= $\sin2\varphi = 2\sin\varphi\cos\varphi$.

? Série 2 ex. 2 : $\|\vec\gamma\|$ vaut :
+ $\sqrt{17}\,e^t$
- $3e^t$
- $e^t$
= $\sqrt{16e^{2t} + e^{2t}}$.

? Série 1 ex. 1 : la base $(\vec e_1, \vec e_2, \vec e_3)$ :
+ est une base mais pas normée
- est orthonormée
- n'est pas une base
= Produit mixte non nul, normes différentes de 1.

? Série 3 ex. 1 : si le plan est fixe :
+ le repère relatif devient galiléen
- Coriolis double
- $\vec\gamma_e$ reste centripète
= $\omega = 0$.

? Série 2 ex. 3 : $\vec\gamma_c$ est dite :
+ complémentaire
- centripète
- tangentielle
= Autre nom de l'accélération de Coriolis.
```

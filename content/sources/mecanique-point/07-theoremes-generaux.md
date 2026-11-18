---
id: theoremes-generaux
titre: Théorèmes généraux · moment cinétique et énergie
seance: Chapitre V · Théorèmes généraux de la dynamique
importance: 5
---

## Avant de commencer

Tu dois maîtriser le PFD et le produit vectoriel.

```exercice Vérifie ton prérequis
? Que vaut $\overrightarrow{OM}\wedge\vec F$ si $\vec F$ est parallèle à $\overrightarrow{OM}$ ?
= $\vec 0$ : le produit vectoriel de deux vecteurs colinéaires est nul. C'est le cas des forces centrales.
```

## Comment aborder ce chapitre

> [!astuce] **Trois théorèmes, une même équation du mouvement.** Quantité de mouvement, moment cinétique, énergie : on retrouve le même $\ddot\theta$. Choisis celui qui élimine l'inconnue gênante (une réaction qui ne travaille pas disparaît du TEC).

> [!piege] Appliquer le théorème du moment cinétique en un point **mobile** sans le terme correctif. Le cours conseille de choisir un point **fixe**.

À la fin, tu sais appliquer le TMC, le TEC et la conservation de l'énergie mécanique, en galiléen et en non galiléen.

## Idée 1 · Moment cinétique

$$\vec\sigma_O(M/\mathcal R) = \overrightarrow{OM}\wedge m\vec V(M/\mathcal R),\qquad \vec{\mathcal M}_O(\vec F) = \overrightarrow{OM}\wedge\vec F\ (\text{N·m})$$

**TMC** ($O$ fixe, $\mathcal R$ galiléen) : $\dfrac{d\vec\sigma_O}{dt}\Big|_{\mathcal R} = \vec{\mathcal M}_O\left(\sum\vec F_{ext}\right)$. En non galiléen, on ajoute $\vec{\mathcal M}_O(\vec F_e) + \vec{\mathcal M}_O(\vec F_c)$.

```etapes TMC pour le pendule simple
Moment cinétique :: $\vec\sigma_O = \ell\vec e_\rho\wedge m\ell\dot\varphi\vec e_\varphi = m\ell^2\dot\varphi\,\vec k$.
Moments :: $\vec{\mathcal M}_O(\vec T) = \vec 0$ (colinéaire au fil) ; $\vec{\mathcal M}_O(\vec P) = -\ell mg\sin\varphi\,\vec k$.
TMC :: $m\ell^2\ddot\varphi = -mg\ell\sin\varphi$, soit $\ddot\varphi + \dfrac g\ell\sin\varphi = 0$, la même équation qu'avec le PFD, sans calculer $T$.
```

Si $M$ est isolé ou soumis à une force centrale : $\vec\sigma_O$ est constant.

## Idée 2 · Travail, puissance, énergie cinétique

$$dW = \vec F\cdot d\overrightarrow{OM},\quad P = \frac{dW}{dt} = \vec F\cdot\vec V\ (\text{W}),\quad E_c = \tfrac12 mV^2$$

**TEC** (galiléen) : $E_c(B) - E_c(A) = W_{A\to B}\left(\sum\vec F_{ext}\right)$. En non galiléen, on ajoute $W(\vec F_e)$ ; **la force de Coriolis ne travaille pas** ($\vec F_c\perp\vec V_r$).

## Idée 3 · Énergie potentielle et énergie mécanique

```flux Force conservative
F = −grad Ep -> rot F = 0 -> W(A→B) = Ep(A) − Ep(B), indépendant du chemin
```

- Pesanteur ($z$ vers le haut) : $E_p = mgz + \text{cte}$ ; ressort : $E_p = \tfrac12 kx^2 + \text{cte}$.
- $E_m = E_c + E_p$ ; $\Delta E_m = W(\vec F_{non\,cons})$.
- Si toutes les forces qui travaillent sont conservatives : $E_m$ = constante (intégrale première).
- Le frottement n'est pas conservatif : $E_m$ diminue (dissipation).

> [!attention] Le signe de $E_p$ de pesanteur dépend de l'orientation de l'axe. Avec un axe $Oz$ vers le haut, $E_p = mgz$ ; avec un axe vers le bas (comme $\vec j$ du pendule du cours), $E_p = -mgy$.

## S'exercer

```exercice Série 3, exercice 2
? $\vec F = \tfrac{25}{6}y\,\vec e_x + (z-x)\,\vec e_y + (2z^2 - x)\,\vec e_z$, trajectoire $x = 3t$, $y = 2t^2$, $z = t - 2$. Puissance $P(t)$ ?
= $\vec V = (3, 4t, 1)$. $P = \tfrac{25}{6}\cdot2t^2\cdot3 + (t-2-3t)\cdot4t + 2(t-2)^2 - 3t = 19t^2 - 19t + 8$ W.
? À quel instant (s) la puissance est-elle minimale ?
reponse: 0.5
= $dP/dt = 38t - 19 = 0$, donc $t = 0{,}5$ s ; position $(3/2,\ 1/2,\ -3/2)$.
? Travail entre $t_1 = 0$ et $t_2 = 2$ s (J, une décimale) ?
reponse: 28.7 ~0.1
= $W = \int_0^2 (19t^2 - 19t + 8)\,dt = \tfrac{152}{3} - 38 + 16 \approx 28{,}7$ J.
? En ligne droite de $A(0,0,-2)$ à $B(6,8,0)$, le travail vaut $\approx 67{,}3$ J. Conclusion ?
= Le travail dépend du chemin : $\vec F$ **n'est pas conservative**.
```

```exercice Série 3, exercice 3 : énergie
? Anneau sur un cerceau de rayon $R$ en translation verticale d'accélération $a$. On trouve $E_p(\vec P) = mgR\sin\theta$ et $E_p(\vec F_e) = maR\sin\theta$ dans $\mathcal R_1$. Retrouve l'équation en $\theta$ par l'énergie mécanique.
= $E_m = \tfrac12 mR^2\dot\theta^2 + m(g+a)R\sin\theta$ est constante (la réaction et Coriolis ne travaillent pas). En dérivant : $mR^2\dot\theta\ddot\theta + m(g+a)R\dot\theta\cos\theta = 0$, donc $\ddot\theta = -\dfrac{g+a}{R}\cos\theta$.
```

## Flashcards

```cartes
Moment cinétique :: $\vec\sigma_O = \overrightarrow{OM}\wedge m\vec V$
TMC :: $d\vec\sigma_O/dt = \sum\vec{\mathcal M}_O(\vec F_{ext})$, $O$ fixe
Puissance d'une force :: $P = \vec F\cdot\vec V$
TEC :: $\Delta E_c = W(\sum\vec F)$
Force conservative :: $\vec F = -\overrightarrow{\text{grad}}\,E_p$, $\overrightarrow{\text{rot}}\,\vec F = \vec 0$
Énergie mécanique :: $E_m = E_c + E_p$ ; $\Delta E_m = W(\vec F_{non\,cons})$
Travail de Coriolis :: nul
$\sigma_O$ du pendule :: $m\ell^2\dot\varphi$
```

## QCM du chapitre

```qcm
? Le moment cinétique en $O$ vaut :
+ $\overrightarrow{OM}\wedge m\vec V$
- $m\vec V\wedge\overrightarrow{OM}$
- $\overrightarrow{OM}\cdot m\vec V$
= Ordre : position puis quantité de mouvement.

? Une force centrale (portée par $\overrightarrow{OM}$) a un moment en $O$ :
+ nul
- maximal
- égal à $\vec F$
= Vecteurs colinéaires.

? La force de Coriolis :
+ ne travaille pas
- travaille toujours
- est conservative
= Elle est perpendiculaire à $\vec V_r$.

? Si $\vec F = -\overrightarrow{\text{grad}}\,E_p$, alors :
+ son travail ne dépend pas du chemin
- son travail est nul
- elle est une force de frottement
= Force conservative.

? $E_m$ se conserve si :
+ seules des forces conservatives travaillent
- il y a du frottement
- le repère tourne
= $\Delta E_m = W(\vec F_{non\,cons}) = 0$.

? La puissance minimale de $P = 19t^2 - 19t + 8$ est atteinte à :
+ $t = 0{,}5$ s
- $t = 1$ s
- $t = 0$ s
= $dP/dt = 0$.

? L'unité du moment d'une force est :
+ N·m
- J/s
- kg·m/s
= Produit d'une distance par une force.

? Le TEC relie :
+ variation de $E_c$ et travail des forces
- variation de $\vec\sigma$ et moment des forces
- $\vec\gamma$ et forces
= Théorème de l'énergie cinétique.

? Pour montrer qu'une force est conservative, on peut vérifier :
+ $\overrightarrow{\text{rot}}\,\vec F = \vec 0$
- $\text{div}\,\vec F = 0$
- $\vec F\cdot\vec V = 0$
= Condition du cours.

? $W \ne W'$ sur deux chemins entre $A$ et $B$ prouve que la force est :
+ non conservative
- conservative
- nulle
= Série 3, exercice 2.
```

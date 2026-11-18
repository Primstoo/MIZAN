---
id: changement-referentiel
titre: Changement de référentiel
seance: Chapitre III · Changement de référentiel
importance: 5
---

## Avant de commencer

Tu dois savoir écrire $\dfrac{d\vec u}{dt} = \vec\omega\wedge\vec u$ pour un vecteur unitaire qui tourne (chapitre 2).

```exercice Vérifie ton prérequis
? Un repère tourne autour de $Oz$ avec $\vec\Omega = \omega\vec k$. Que vaut $\dfrac{d\vec i_1}{dt}$ ?
= $\vec\Omega\wedge\vec i_1 = \omega\,\vec k\wedge\vec i_1 = \omega\,\vec j_1$.
```

## Comment aborder ce chapitre

> [!astuce] **Trois questions** : comment bouge $M$ dans $\mathcal R_1$ (relatif) ? Comment bougerait un point **fixe** de $\mathcal R_1$ situé en $M$ (entraînement) ? Et Coriolis, le terme qui couple les deux.

> [!piege] Calculer $\vec\gamma_e$ en dérivant $\vec V_e$. **Faux** : $\vec\gamma_e$ est l'accélération qu'aurait $M$ s'il était fixe dans $\mathcal R_1$, ce n'est pas la dérivée de $\vec V_e$.

À la fin, tu sais appliquer $\vec V_a = \vec V_r + \vec V_e$ et $\vec\gamma_a = \vec\gamma_r + \vec\gamma_e + \vec\gamma_c$.

## Idée 1 · Dérivée d'un vecteur dans deux repères

$\mathcal R$ absolu, $\mathcal R_1(O_1, \vec i_1, \vec j_1, \vec k_1)$ relatif, de vecteur rotation $\vec\Omega(\mathcal R_1/\mathcal R)$ :

$$\left.\frac{d\vec A}{dt}\right|_{\mathcal R} = \left.\frac{d\vec A}{dt}\right|_{\mathcal R_1} + \vec\Omega(\mathcal R_1/\mathcal R)\wedge\vec A$$

```html
<svg viewBox="0 0 440 200" role="img" aria-label="Repère fixe R et repère mobile R1 tournant à la vitesse angulaire omega" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M80 170H260"/><path d="M80 170V30"/></g><g stroke="#D9824F" stroke-width="2" fill="none"><path d="M80 170L230 90"/><path d="M80 170L150 50"/><path d="M150 170A70 70 0 0 0 140 136"/></g><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="264" y="174">x (R)</text><text x="84" y="28">y (R)</text><text x="234" y="88" fill="#D9824F">x₁ (R₁)</text><text x="154" y="48" fill="#D9824F">y₁ (R₁)</text><text x="160" y="150" fill="#D9824F">θ = ωt</text></g></svg>
```

## Idée 2 · Composition des vitesses

$$\vec V_a(M/\mathcal R) = \vec V_r(M/\mathcal R_1) + \vec V_e,\qquad \vec V_e = \vec V(O_1/\mathcal R) + \vec\Omega\wedge\overrightarrow{O_1M}$$

## Idée 3 · Composition des accélérations

$$\vec\gamma_a = \vec\gamma_r + \vec\gamma_e + \vec\gamma_c$$
$$\vec\gamma_e = \vec\gamma(O_1/\mathcal R) + \frac{d\vec\Omega}{dt}\wedge\overrightarrow{O_1M} + \vec\Omega\wedge(\vec\Omega\wedge\overrightarrow{O_1M}),\qquad \vec\gamma_c = 2\,\vec\Omega\wedge\vec V_r$$

| Mouvement de $\mathcal R_1$ | $\vec\gamma_e$ | $\vec\gamma_c$ |
|---|---|---|
| Translation ($\vec\Omega = \vec 0$) | $\vec\gamma(O_1/\mathcal R)$ | $\vec 0$ |
| Rotation uniforme autour d'un axe fixe | $\vec\Omega\wedge(\vec\Omega\wedge\overrightarrow{O_1M})$ (centripète) | $2\vec\Omega\wedge\vec V_r$ |

```etapes Série 2, ex. 4 : anneau sur une tige qui tourne à $\omega$, $\overrightarrow{OM} = r_0\cosh(\omega t)\,\vec i_1$
Relatif :: $\vec V_r = r_0\omega\sinh(\omega t)\,\vec i_1$ ; $\vec\gamma_r = r_0\omega^2\cosh(\omega t)\,\vec i_1$.
Entraînement :: $\vec V_e = \omega\vec k\wedge r\vec i_1 = r_0\omega\cosh(\omega t)\,\vec j_1$ ; $\vec\gamma_e = -\omega^2 r_0\cosh(\omega t)\,\vec i_1$.
Coriolis :: $\vec\gamma_c = 2\omega\vec k\wedge\vec V_r = 2\omega^2 r_0\sinh(\omega t)\,\vec j_1$.
Absolu :: $\vec\gamma_a = 2\omega^2 r_0\sinh(\omega t)\,\vec j_1$ (les termes sur $\vec i_1$ s'annulent).
Sortie de la tige (longueur $L$) :: $r_0\cosh(\omega\tau) = L$, donc $\tau = \dfrac1\omega\,\text{argch}\dfrac{L}{r_0}$, et $V_r = \omega\sqrt{L^2 - r_0^2}$.
```

> [!retenir] Un repère en **translation rectiligne uniforme** par rapport à un repère galiléen est galiléen. Dès qu'il accélère ou tourne, il ne l'est plus.

## S'exercer

```exercice Série 2, exercice 3 : anneau sur un cercle qui tourne
? Le cercle de rayon $r$ tourne autour de $Oz$ à $\dot\alpha$ ; $A$ repéré par $\theta$, $\overrightarrow{OA} = r\sin\theta\,\vec e_{x'} + r\cos\theta\,\vec e_{z'}$. Donne $\vec V_r$.
= $\vec V_r = r\dot\theta\cos\theta\,\vec e_{x'} - r\dot\theta\sin\theta\,\vec e_{z'} = r\dot\theta\,\vec e_\theta$.
? Donne $\vec V_e$ et $\vec\gamma_c$.
= $\vec V_e = \dot\alpha\,\vec e_{z'}\wedge\overrightarrow{OA} = r\dot\alpha\sin\theta\,\vec e_{y'}$. $\vec\gamma_c = 2\dot\alpha\,\vec e_{z'}\wedge\vec V_r = 2r\dot\alpha\dot\theta\cos\theta\,\vec e_{y'}$.
```

```exercice Entraînement en translation
? $\mathcal R_1$ accélère en translation à $3$ m/s² par rapport à $\mathcal R$. $M$ est immobile dans $\mathcal R_1$. Accélération absolue (m/s²) ?
reponse: 3
= $\vec\gamma_r = \vec 0$, $\vec\gamma_c = \vec 0$ (pas de rotation), $\vec\gamma_a = \vec\gamma_e = 3$ m/s².
```

## Flashcards

```cartes
Dérivée dans deux repères :: $\frac{d\vec A}{dt}|_{\mathcal R} = \frac{d\vec A}{dt}|_{\mathcal R_1} + \vec\Omega\wedge\vec A$
Composition des vitesses :: $\vec V_a = \vec V_r + \vec V_e$
$\vec V_e$ :: $\vec V(O_1/\mathcal R) + \vec\Omega\wedge\overrightarrow{O_1M}$
Composition des accélérations :: $\vec\gamma_a = \vec\gamma_r + \vec\gamma_e + \vec\gamma_c$
$\vec\gamma_c$ :: $2\,\vec\Omega\wedge\vec V_r$
$\vec\gamma_e$ (rotation uniforme, axe fixe) :: $\vec\Omega\wedge(\vec\Omega\wedge\overrightarrow{O_1M})$
Translation : Coriolis ? :: nulle, car $\vec\Omega = \vec 0$.
```

## QCM du chapitre

```qcm
? L'accélération de Coriolis vaut :
- $\vec\Omega\wedge\vec V_r$
+ $2\,\vec\Omega\wedge\vec V_r$
- $2\,\vec\Omega\wedge\vec V_a$
= Avec la vitesse **relative**.

? Si $\mathcal R_1$ est en translation par rapport à $\mathcal R$ :
+ $\vec\gamma_c = \vec 0$
- $\vec\gamma_e = \vec 0$
- $\vec V_e = \vec 0$
= $\vec\Omega = \vec 0$.

? $\vec V_e$ est la vitesse :
+ qu'aurait $M$ s'il était fixe dans $\mathcal R_1$
- de $M$ dans $\mathcal R_1$
- de $O$ dans $\mathcal R_1$
= Définition de l'entraînement.

? Pour la tige qui tourne, $\vec\gamma_e$ est :
- tangentielle
+ centripète, $-\omega^2 r\,\vec i_1$
- nulle
= $\vec\Omega\wedge(\vec\Omega\wedge r\vec i_1) = -\omega^2 r\vec i_1$.

? $\frac{d\vec i_1}{dt}|_{\mathcal R}$ avec $\vec\Omega = \omega\vec k$ vaut :
+ $\omega\,\vec j_1$
- $-\omega\,\vec j_1$
- $\vec 0$
= $\omega\vec k\wedge\vec i_1 = \omega\vec j_1$.

? $\vec\gamma_e$ s'obtient :
- en dérivant $\vec V_e$
+ par sa formule (point fixe de $\mathcal R_1$)
- en dérivant $\vec V_r$
= Piège classique.

? Pour $r = r_0\cosh(\omega t)$, le temps de sortie de la tige est :
+ $\frac1\omega\,\text{argch}(L/r_0)$
- $L/(r_0\omega)$
- $\omega L$
= $\cosh(\omega\tau) = L/r_0$.

? $\cosh^2 x - \sinh^2 x$ vaut :
+ 1
- 0
- $\cosh 2x$
= Identité utilisée dans la série 2.

? Un repère en translation rectiligne uniforme par rapport à un galiléen est :
+ galiléen
- non galiléen
- en rotation
= $\vec\gamma_e = \vec 0$, pas de force d'inertie.

? Si $M$ est fixe dans $\mathcal R_1$ :
+ $\vec V_r = \vec 0$ et $\vec\gamma_c = \vec 0$
- $\vec V_e = \vec 0$
- $\vec\gamma_a = \vec 0$
= Coriolis dépend de $\vec V_r$.
```

---
id: cinematique
titre: Cinématique · vitesse et accélération
seance: Chapitre II · Cinématique du point matériel
importance: 5
---

## Avant de commencer

Il te faut les bases du chapitre 2 : $\overrightarrow{OM}$ en cylindriques et $\dfrac{d\vec e_\rho}{dt} = \dot\varphi\,\vec e_\varphi$.

```exercice Vérifie ton prérequis
? $x(t) = t - 1$. Que vaut $\dot x$ ?
reponse: 1
= $\dot x = dx/dt = 1$. Le point au-dessus signifie « dérivée par rapport au temps ».
```

## Comment aborder ce chapitre

> [!astuce] **Tout part de $\overrightarrow{OM}$.** Écris la position, dérive une fois (vitesse), dérive encore (accélération). La seule difficulté : dériver aussi les vecteurs de base qui tournent.

> [!piege] Une vitesse ou une accélération n'a de sens que **par rapport à un référentiel** : on écrit $\vec V(M/\mathcal R)$, jamais $\vec V$ tout court, dès qu'il y a deux repères.

À la fin, tu sais trouver la trajectoire, la vitesse et l'accélération en cartésiennes et en cylindriques.

## Idée 1 · Trajectoire, vitesse, accélération

```flux Une dérivation à chaque étape
position OM(t) -> vitesse V = dOM/dt|R -> accélération γ = dV/dt|R
```

- **Trajectoire** : ensemble des positions de $M$ ; on l'obtient en **éliminant $t$** entre les équations horaires.
- $\vec V(M/\mathcal R) = \dfrac{d\overrightarrow{OM}}{dt}\Big|_{\mathcal R}$ (m/s) ; $\vec\gamma(M/\mathcal R) = \dfrac{d\vec V}{dt}\Big|_{\mathcal R}$ (m/s²).
- Cartésiennes (base fixe) : $\vec V = \dot x\vec i + \dot y\vec j + \dot z\vec k$, $\vec\gamma = \ddot x\vec i + \ddot y\vec j + \ddot z\vec k$.

```etapes Série 2, ex. 1 : $x = t - 1$, $y = -t^2 + 1$, $z = 0$
Élimine $t$ :: $t = x + 1$, donc $y = -(x+1)^2 + 1 = -x^2 - 2x$ : une **parabole**.
Vitesse :: $\vec V = \vec i - 2t\,\vec j$, et $\|\vec V\| = \sqrt{1 + 4t^2}$.
Accélération :: $\vec\gamma = -2\,\vec j$ (constante).
```

## Idée 2 · En cylindriques (polaires)

```html
<svg viewBox="0 0 420 210" role="img" aria-label="Vitesse en polaires : composante radiale rho point selon e_rho et orthoradiale rho phi point selon e_phi" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M60 180H380"/><path d="M60 180V20"/><path d="M60 180L230 90"/></g><g stroke="#D9824F" stroke-width="2.4"><path d="M230 90L300 53"/><path d="M230 90L267 160"/></g><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="236" y="86">M</text><text x="300" y="48" fill="#D9824F">ρ̇ e_ρ</text><text x="272" y="168" fill="#D9824F">ρφ̇ e_φ</text><text x="130" y="128">ρ</text></g></svg>
```

En dérivant $\overrightarrow{OM} = \rho\,\vec e_\rho + z\,\vec e_z$ :

$$\vec V = \dot\rho\,\vec e_\rho + \rho\dot\varphi\,\vec e_\varphi + \dot z\,\vec e_z$$
$$\vec\gamma = (\ddot\rho - \rho\dot\varphi^2)\,\vec e_\rho + (2\dot\rho\dot\varphi + \rho\ddot\varphi)\,\vec e_\varphi + \ddot z\,\vec e_z$$

> [!retenir] Le terme $-\rho\dot\varphi^2$ est l'accélération **centripète**. Le terme $2\dot\rho\dot\varphi$ apparaît dès que $\rho$ et $\varphi$ varient ensemble.

Exemple chiffré : cercle $\rho = 2$ m, $\dot\varphi = 3$ rad/s constant. Alors $\vec V = 6\,\vec e_\varphi$ m/s et $\vec\gamma = -18\,\vec e_\rho$ m/s².

## Idée 3 · Mouvements types

| Mouvement | Caractéristique |
|---|---|
| Rectiligne uniforme | $\vec\gamma = \vec 0$, $\vec V$ constant |
| Rectiligne uniformément varié | $\vec\gamma$ constant, colinéaire à $\vec V$ ; $x = \tfrac12 a t^2 + v_0 t + x_0$ |
| Circulaire uniforme | $\rho = R$, $\dot\varphi = \omega$ ; $V = R\omega$, $\gamma = R\omega^2$ dirigée vers le centre |
| Sinusoïdal | $x = X_m\cos(\omega t + \phi)$, $\ddot x + \omega^2 x = 0$ |

Mouvement **accéléré** si $\vec V\cdot\vec\gamma > 0$, **retardé** si $\vec V\cdot\vec\gamma < 0$.

## S'exercer

```exercice Série 2, exercice 2
? $x = 2e^t\sin t$, $y = 2e^t\cos t$, $z = e^t$. Calcule $\|\vec V\|$.
indice: $\dot x = 2e^t(\sin t + \cos t)$, $\dot y = 2e^t(\cos t - \sin t)$, $\dot z = e^t$.
= $\|\vec V\|^2 = 4e^{2t}\cdot2 + e^{2t} = 9e^{2t}$, donc $\|\vec V\| = 3e^t$.
? Et $\|\vec\gamma\|$ ?
= $\ddot x = 4e^t\cos t$, $\ddot y = -4e^t\sin t$, $\ddot z = e^t$, donc $\|\vec\gamma\| = \sqrt{17}\,e^t$.
```

```exercice Mouvement circulaire
? Un point tourne sur un cercle de rayon $0{,}5$ m à $\dot\varphi = 4$ rad/s constant. Accélération en m/s² ?
reponse: 8
= $\gamma = R\omega^2 = 0{,}5\times16 = 8$ m/s², dirigée vers le centre.
```

## Flashcards

```cartes
Trajectoire :: on élimine le temps entre les équations horaires.
$\vec V$ en polaires :: $\dot\rho\,\vec e_\rho + \rho\dot\varphi\,\vec e_\varphi$
$\vec\gamma$ en polaires :: $(\ddot\rho - \rho\dot\varphi^2)\vec e_\rho + (2\dot\rho\dot\varphi + \rho\ddot\varphi)\vec e_\varphi$
Circulaire uniforme : $\gamma$ :: $R\omega^2$, vers le centre (centripète)
Mouvement accéléré :: $\vec V\cdot\vec\gamma > 0$
Mouvement uniforme rectiligne :: $\vec\gamma = \vec 0$
```

## QCM du chapitre

```qcm
? La trajectoire de $x = t-1$, $y = -t^2+1$ est :
- une droite
+ une parabole
- un cercle
= $y = -x^2 - 2x$.

? La vitesse est la dérivée de :
+ $\overrightarrow{OM}$ par rapport au temps
- l'accélération
- l'abscisse curviligne par rapport à $x$
= $\vec V = d\overrightarrow{OM}/dt$.

? En polaires, la composante orthoradiale de la vitesse vaut :
- $\dot\rho$
+ $\rho\dot\varphi$
- $\rho\dot\varphi^2$
= Elle vient de $\rho\,d\vec e_\rho/dt$.

? Dans un mouvement circulaire uniforme, l'accélération est :
- nulle
+ dirigée vers le centre
- tangente à la trajectoire
= $\vec\gamma = -R\omega^2\,\vec e_\rho$.

? Si $\vec V\cdot\vec\gamma < 0$, le mouvement est :
- accéléré
+ retardé
- uniforme
= La vitesse diminue.

? Pour $\rho = 2$ m et $\dot\varphi = 3$ rad/s constants, $\|\vec V\|$ vaut :
- 3 m/s
+ 6 m/s
- 18 m/s
= $\rho\dot\varphi = 6$.

? Le terme $2\dot\rho\dot\varphi$ apparaît sur :
- $\vec e_\rho$
+ $\vec e_\varphi$
- $\vec e_z$
= Composante orthoradiale de l'accélération.

? Pour $x = 2e^t\sin t$, $y = 2e^t\cos t$, $z = e^t$, $\|\vec V\|$ vaut :
- $e^t$
+ $3e^t$
- $\sqrt{17}e^t$
= $\sqrt{8e^{2t} + e^{2t}}$.

? L'unité de l'accélération est :
- m/s
+ m/s²
- rad/s
= Dérivée d'une vitesse.

? Un mouvement sinusoïdal vérifie :
+ $\ddot x + \omega^2 x = 0$
- $\ddot x = \omega x$
- $\dot x = 0$
= Équation de l'oscillateur harmonique.
```

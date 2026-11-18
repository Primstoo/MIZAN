---
id: revision
titre: Révision et examen blanc
seance: Révision · tout le cours
importance: 5
---

## La méthode à appliquer partout

```etapes Résoudre un problème de mécanique du point
Choisis le système et le référentiel :: galiléen ou non ? S'il tourne ou accélère, prévois $\vec F_e$ et $\vec F_c$.
Choisis la base :: celle qui suit le mouvement (polaire pour un cercle, cartésienne pour une droite).
Écris $\overrightarrow{OM}$, puis dérive :: n'oublie pas les dérivées des vecteurs de base ($\vec\Omega\wedge\vec u$).
Bilan des forces :: poids, réaction, tension, rappel, inertie.
Choisis le théorème :: PFD (forces inconnues), TMC (point fixe, élimine les forces qui passent par lui), énergie (élimine les forces qui ne travaillent pas).
Vérifie :: homogénéité, cas limite ($\omega = 0$, petits angles).
```

> [!attention] Aucune annale de contrôle ne nous a été fournie : cet examen blanc reprend le format des séries (un exercice par grande partie du cours). Durée conseillée : 1 h 30.

## Examen blanc

```exercice Exercice 1 · Outils (4 pts)
? Soit $\vec A = \vec i + \vec j$ et $\vec B = \vec j + \vec k$. Calcule $\vec A\wedge\vec B$ et l'angle entre $\vec A$ et $\vec B$.
= $\vec A\wedge\vec B = (1\cdot1 - 0)\vec i - (1\cdot1 - 0)\vec j + (1\cdot1 - 0)\vec k = \vec i - \vec j + \vec k$. $\cos\theta = \dfrac{1}{\sqrt2\sqrt2} = \tfrac12$, donc $\theta = 60°$.
? $f = xy + z^2$. Calcule $\overrightarrow{\text{grad}}\,f$ et vérifie que son rotationnel est nul.
= $\overrightarrow{\text{grad}}\,f = y\vec i + x\vec j + 2z\vec k$. Rotationnel : $(0-0)\vec i - (0-0)\vec j + (1-1)\vec k = \vec 0$.
```

```exercice Exercice 2 · Cinématique (5 pts)
? $M$ décrit $\rho = R$ constant, $\varphi = \omega t$. Donne $\vec V$ et $\vec\gamma$ en polaires.
= $\vec V = R\omega\,\vec e_\varphi$, $\vec\gamma = -R\omega^2\,\vec e_\rho$.
? $x = 2t$, $y = t^2$. Rayon de courbure à $t = 0$ (m) ?
reponse: 2
= $\vec V = (2, 2t)$, $\vec\gamma = (0, 2)$. À $t = 0$ : $\|\vec V\|^3 = 8$, $\|\vec V\wedge\vec\gamma\| = 4$, $R_c = 2$ m.
```

```exercice Exercice 3 · Changement de référentiel (5 pts)
? Une tige tourne dans $(xOy)$ autour de $Oz$ à $\omega$ constant. Un anneau glisse sur la tige avec $\overrightarrow{OM} = r(t)\vec i_1$. Donne $\vec V_r$, $\vec V_e$, $\vec\gamma_r$, $\vec\gamma_e$, $\vec\gamma_c$.
= $\vec V_r = \dot r\,\vec i_1$ ; $\vec V_e = r\omega\,\vec j_1$ ; $\vec\gamma_r = \ddot r\,\vec i_1$ ; $\vec\gamma_e = -r\omega^2\,\vec i_1$ ; $\vec\gamma_c = 2\omega\dot r\,\vec j_1$.
? Sans frottement, la tige horizontale. Équation en $r$ ?
= PFD dans $\mathcal R_1$ projeté sur $\vec i_1$ : $m\ddot r = mr\omega^2$ (seule $\vec F_e$ a une composante sur $\vec i_1$), donc $\ddot r - \omega^2 r = 0$, de solution $r = r_0\cosh(\omega t)$ si $\dot r(0) = 0$.
```

```exercice Exercice 4 · Énergie (6 pts)
? Un ressort horizontal ($k = 50$ N/m) porte $m = 0{,}5$ kg, lâché sans vitesse à $x_0 = 0{,}1$ m. Énergie mécanique (J) ?
reponse: 0.25 ~0.005
= $E_m = \tfrac12 kx_0^2 = \tfrac12\times50\times0{,}01 = 0{,}25$ J (conservée, pas de frottement).
? Vitesse maximale (m/s) ?
reponse: 1 ~0.01
= En $x = 0$ : $\tfrac12 mV^2 = 0{,}25$, donc $V = 1$ m/s. Ou $V_{max} = \omega_0 x_0 = 10\times0{,}1$.
? Retrouve l'équation du mouvement en dérivant $E_m$.
= $\dfrac{dE_m}{dt} = m\dot x\ddot x + kx\dot x = 0$, donc $\ddot x + \dfrac km x = 0$.
```

## Flashcards

```cartes
Méthode générale :: système, référentiel, base, cinématique, forces, théorème.
Quand utiliser le TMC ? :: point fixe, pour éliminer les forces qui passent par ce point (tension d'un fil).
Quand utiliser l'énergie ? :: pour éliminer les forces qui ne travaillent pas (réaction sans frottement, Coriolis).
Repère non galiléen : forces en plus :: $\vec F_e = -m\vec\gamma_e$ et $\vec F_c = -m\vec\gamma_c$
Vitesse maximale d'un oscillateur :: $\omega_0 X_m$
$E_m$ d'un ressort lâché sans vitesse :: $\frac12 kx_0^2$
```

## QCM du chapitre

```qcm
? Pour éliminer la tension d'un fil, on utilise de préférence :
+ le TMC au point d'attache
- le PFD projeté sur le fil
- la composition des vitesses
= Son moment au point d'attache est nul.

? Pour $x = 2t$, $y = t^2$, $R_c$ à $t = 0$ vaut :
+ 2 m
- 1 m
- 4 m
= $8/4$.

? Sur une tige tournante horizontale sans frottement, l'anneau :
+ s'éloigne de l'axe
- reste immobile
- se rapproche de l'axe
= $\ddot r = \omega^2 r > 0$.

? $E_m$ d'un ressort ($k = 50$ N/m) lâché à $0{,}1$ m :
+ 0,25 J
- 2,5 J
- 0,5 J
= $\tfrac12 kx_0^2$.

? La réaction normale sans frottement :
+ ne travaille pas
- travaille toujours
- est conservative
= Elle est perpendiculaire à la vitesse.

? Dans un repère non galiléen en rotation, on ajoute :
+ $\vec F_e$ et $\vec F_c$
- seulement $\vec F_c$
- rien
= Les deux forces d'inertie.

? $\overrightarrow{\text{grad}}(xy + z^2)$ vaut :
+ $y\vec i + x\vec j + 2z\vec k$
- $x\vec i + y\vec j + 2z\vec k$
- $xy\vec i + z^2\vec k$
= Dérivées partielles.

? $(\vec i + \vec j)\wedge(\vec j + \vec k)$ vaut :
+ $\vec i - \vec j + \vec k$
- $\vec i + \vec j + \vec k$
- $\vec 0$
= Calcul par composantes.

? Dans un mouvement circulaire uniforme, $\vec\gamma$ vaut :
+ $-R\omega^2\,\vec e_\rho$
- $R\omega\,\vec e_\varphi$
- $\vec 0$
= Centripète.

? Le terme $2\omega\dot r\,\vec j_1$ est :
+ l'accélération de Coriolis
- l'accélération d'entraînement
- l'accélération relative
= $2\vec\Omega\wedge\vec V_r$.
```

---
id: dynamique
titre: Dynamique · PFD, forces d'inertie, pendule et ressort
seance: Chapitre IV · Dynamique du point matériel
importance: 5
---

## Avant de commencer

Tu dois savoir écrire l'accélération en polaires et la composition des accélérations (chapitres 3 et 5).

```exercice Vérifie ton prérequis
? Pour un point sur un cercle de rayon $\ell$ fixe, repéré par $\varphi$, que vaut $\vec\gamma$ en polaires ?
= $\rho = \ell$ constant : $\vec\gamma = -\ell\dot\varphi^2\,\vec e_\rho + \ell\ddot\varphi\,\vec e_\varphi$.
```

## Comment aborder ce chapitre

> [!astuce] **Toujours la même recette** : système, référentiel, bilan des forces, PFD, projection sur une base bien choisie.

> [!piege] Ajouter des forces d'inertie dans un référentiel **galiléen**. Elles n'existent que dans un repère non galiléen ; dans $\mathcal R$ galiléen on écrit seulement $m\vec\gamma = \sum\vec F_{ext}$.

À la fin, tu sais établir l'équation différentielle du pendule simple et du ressort, et appliquer le PFD dans un repère non galiléen.

## Idée 1 · Les trois lois de Newton

- **Inertie** : dans un référentiel galiléen, un point isolé est au repos ou en mouvement rectiligne uniforme.
- **PFD** : $\dfrac{d\vec p}{dt}\Big|_{\mathcal R} = m\,\vec\gamma(M/\mathcal R) = \sum\vec F_{ext}$, avec $\vec p = m\vec V$.
- **Actions réciproques** : $\vec F_{A\to B} = -\vec F_{B\to A}$.

Forces usuelles : poids $\vec P = m\vec g$ ; réaction $\vec R = \vec R_n + \vec R_t$ ($\vec R_t = \vec 0$ sans frottement) ; tension d'un fil $\vec T$ ; rappel d'un ressort $\vec F = -k\,\Delta\ell\,\vec u$.

## Idée 2 · PFD dans un référentiel non galiléen

$$m\,\vec\gamma(M/\mathcal R_1) = \sum\vec F_{ext} + \vec F_e + \vec F_c,\qquad \vec F_e = -m\vec\gamma_e,\quad \vec F_c = -m\vec\gamma_c$$

Équilibre dans $\mathcal R_1$ : $\sum\vec F_{ext} + \vec F_e + \vec F_c = \vec 0$ (et $\vec F_c = \vec 0$ car $\vec V_r = \vec 0$).

> [!prof] Le cours insiste : $\vec F_e$ et $\vec F_c$ **n'apparaissent que dans les repères non galiléens**.

## Idée 3 · Pendule simple

```html
<svg viewBox="0 0 400 230" role="img" aria-label="Pendule simple : fil de longueur l, angle phi avec la verticale, poids P et tension T" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M120 20H280"/><path d="M200 20V200" stroke-dasharray="4 3"/><path d="M200 20L280 150"/><circle cx="280" cy="150" r="9"/></g><g stroke="#D9824F" stroke-width="2.4"><path d="M280 159V215"/><path d="M280 150L250 101"/></g><path d="M200 70A50 50 0 0 0 226 63" stroke="#D9824F" fill="none"/><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="214" y="88" fill="#D9824F">φ</text><text x="246" y="80">ℓ</text><text x="288" y="212" fill="#D9824F">P = mg</text><text x="222" y="114" fill="#D9824F">T</text></g></svg>
```

```etapes Équation du pendule (base polaire, $\vec e_\rho$ le long du fil)
Bilan :: $\vec P = mg\cos\varphi\,\vec e_\rho - mg\sin\varphi\,\vec e_\varphi$ ; $\vec T = -T\vec e_\rho$.
Accélération :: $\vec\gamma = -\ell\dot\varphi^2\vec e_\rho + \ell\ddot\varphi\vec e_\varphi$.
Projection sur $\vec e_\rho$ :: $T = mg\cos\varphi + m\ell\dot\varphi^2$ (tension du fil).
Projection sur $\vec e_\varphi$ :: $\ddot\varphi + \dfrac g\ell\sin\varphi = 0$.
Petites oscillations :: $\sin\varphi \approx \varphi$, donc $\ddot\varphi + \omega_0^2\varphi = 0$ avec $\omega_0 = \sqrt{g/\ell}$.
```

## Idée 4 · Ressort horizontal

Masse $m$, ressort de raideur $k$, sans frottement, $x$ = allongement. PFD projeté sur $\vec i$ :

$$m\ddot x = -kx \;\Longrightarrow\; \ddot x + \omega_0^2 x = 0,\quad \omega_0 = \sqrt{k/m}$$

Solution : $x(t) = X_m\cos(\omega_0 t + \phi)$ ; période $T_0 = 2\pi/\omega_0$. $X_m$ et $\phi$ viennent des conditions initiales. Projection sur $\vec j$ : $R = mg$.

Exemple : $k = 20$ N/m, $m = 0{,}2$ kg : $\omega_0 = 10$ rad/s, $T_0 \approx 0{,}63$ s.

> [!retenir] Pendule (petits angles) et ressort donnent la même équation $\ddot y + \omega_0^2 y = 0$ : **oscillateur harmonique**.

## S'exercer

```exercice Pendule
? Un pendule de longueur $\ell = 1$ m, $g = 9{,}8$ m/s². Période des petites oscillations en s (deux décimales) ?
reponse: 2.01 ~0.01
= $T_0 = 2\pi\sqrt{\ell/g} = 2\pi\sqrt{1/9{,}8} \approx 2{,}01$ s.
```

```exercice Série 3, exercice 1 (extrait)
? Anneau sur un cerceau dans un plan vertical tournant à $\omega$ autour de $Oz$. Dans $\mathcal R_1$ (lié au plan), quelles forces faut-il écrire ?
= Le poids $\vec P$, la réaction $\vec R$ (sans frottement : perpendiculaire au cerceau), la force d'inertie d'entraînement $\vec F_e = -m\vec\gamma_e$ et celle de Coriolis $\vec F_c = -m\vec\gamma_c$, car $\mathcal R_1$ tourne : il n'est pas galiléen.
? Que devient le problème si le plan $(P)$ est fixe ?
= $\vec\Omega = \vec 0$ : $\vec V_e = \vec\gamma_e = \vec\gamma_c = \vec 0$, le repère est galiléen et l'équation se réduit à $\ddot\theta = \dfrac gr\sin\theta$ (avec l'orientation de $\theta$ de l'énoncé), et $\dot\theta^2 = \dfrac{2g}{r}(1-\cos\theta)$.
```

## Flashcards

```cartes
PFD (galiléen) :: $m\vec\gamma(M/\mathcal R) = \sum\vec F_{ext}$
PFD (non galiléen) :: $m\vec\gamma(M/\mathcal R_1) = \sum\vec F_{ext} + \vec F_e + \vec F_c$
Force d'inertie d'entraînement :: $\vec F_e = -m\vec\gamma_e$
Force de Coriolis :: $\vec F_c = -m\vec\gamma_c$
Équation du pendule simple :: $\ddot\varphi + (g/\ell)\sin\varphi = 0$
Tension du fil :: $T = mg\cos\varphi + m\ell\dot\varphi^2$
Pulsation du ressort :: $\omega_0 = \sqrt{k/m}$
Période propre :: $T_0 = 2\pi/\omega_0$
```

## QCM du chapitre

```qcm
? Le PFD dans un référentiel galiléen s'écrit :
+ $m\vec\gamma = \sum\vec F_{ext}$
- $m\vec V = \sum\vec F_{ext}$
- $m\vec\gamma = \sum\vec F_{ext} + \vec F_e$
= Pas de force d'inertie en galiléen.

? La pulsation du pendule simple (petits angles) est :
+ $\sqrt{g/\ell}$
- $\sqrt{\ell/g}$
- $g/\ell$
= De $\ddot\varphi + (g/\ell)\varphi = 0$.

? La force de Coriolis vaut :
- $-m\vec\gamma_e$
+ $-2m\,\vec\Omega\wedge\vec V_r$
- $m\vec g$
= $-m\vec\gamma_c$.

? Pour $k = 20$ N/m et $m = 0{,}2$ kg, $\omega_0$ vaut :
- 100 rad/s
+ 10 rad/s
- 4 rad/s
= $\sqrt{100}$.

? Sans frottement, la réaction du support est :
+ perpendiculaire au support
- tangente au support
- nulle
= $\vec R_t = \vec 0$.

? À l'équilibre dans un repère non galiléen, $\vec F_c$ est :
+ nulle
- égale à $\vec F_e$
- égale au poids
= $\vec V_r = \vec 0$.

? L'amplitude et la phase d'un oscillateur sont fixées par :
+ les conditions initiales
- la masse seule
- la raideur seule
= Deux constantes d'intégration.

? La tension du fil du pendule est maximale quand :
+ le pendule passe à la verticale ($\varphi = 0$)
- $\varphi$ est maximal
- la vitesse est nulle
= $\cos\varphi$ et $\dot\varphi^2$ sont alors maximaux.

? La quantité de mouvement est :
+ $m\vec V$
- $m\vec\gamma$
- $\tfrac12 mV^2$
= $\vec p = m\vec V$.

? Le principe des actions réciproques dit :
+ $\vec F_{A\to B} = -\vec F_{B\to A}$
- $\vec F_{A\to B} = \vec F_{B\to A}$
- $\sum\vec F = \vec 0$ toujours
= Troisième loi de Newton.
```

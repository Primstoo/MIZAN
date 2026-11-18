---
id: coordonnees-operateurs
titre: Coordonnées et opérateurs (gradient, divergence, rotationnel)
seance: Chapitre I · Rappels mathématiques (IV à VI)
importance: 4
---

## Avant de commencer

Tu dois savoir dériver $\cos$ et $\sin$ : $(\cos\varphi)' = -\sin\varphi$ et $(\sin\varphi)' = \cos\varphi$, et une dérivée partielle (on dérive par rapport à une variable, les autres restent constantes).

```exercice Vérifie ton prérequis
? Soit $f(x,y) = x^2 y$. Que vaut $\dfrac{\partial f}{\partial x}$ en $x = 3$, $y = 2$ ?
reponse: 12
= $\dfrac{\partial f}{\partial x} = 2xy = 2\times3\times2 = 12$ ($y$ reste constant).
```

## Comment aborder ce chapitre

> [!astuce] **Choisis les coordonnées qui suivent la symétrie.** Un mouvement circulaire ? Cylindriques. Une sphère ? Sphériques. Le bon choix rend les calculs courts.

> [!piege] Croire que $\vec e_\rho$ et $\vec e_\varphi$ sont fixes. Ils **tournent** avec $M$ : $\dfrac{d\vec e_\rho}{dt} = \dot\varphi\,\vec e_\varphi$ et $\dfrac{d\vec e_\varphi}{dt} = -\dot\varphi\,\vec e_\rho$. Les oublier fausse toute vitesse.

À la fin, tu sais passer des cartésiennes aux cylindriques et sphériques, écrire $d\overrightarrow{OM}$ et calculer gradient, divergence et rotationnel.

## Idée 1 · Coordonnées cylindriques $(\rho, \varphi, z)$

```html
<svg viewBox="0 0 440 220" role="img" aria-label="Coordonnées cylindriques : projection m de M dans le plan xOy, rho = Om, angle phi, vecteurs e_rho et e_phi" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.6" fill="none"><path d="M150 160V20"/><path d="M150 160H320"/><path d="M150 160L70 205"/><path d="M150 160L250 190" stroke-dasharray="4 3"/><path d="M250 190V70" stroke-dasharray="4 3"/></g><g stroke="#D9824F" stroke-width="2.2" fill="none"><path d="M250 190L295 203"/><path d="M250 190L275 160"/><path d="M110 182A45 45 0 0 0 190 172"/></g><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="156" y="24">z</text><text x="324" y="164">y</text><text x="58" y="210">x</text><text x="254" y="66">M</text><text x="254" y="208">m</text><text x="190" y="190">ρ</text><text x="140" y="205" fill="#D9824F">φ</text><text x="298" y="206" fill="#D9824F">e_ρ</text><text x="278" y="156" fill="#D9824F">e_φ</text></g></svg>
```

$m$ est la projection de $M$ dans le plan $(xOy)$ ; $\rho = Om \ge 0$, $\varphi = (\vec i, \overrightarrow{Om}) \in [0, 2\pi[$, $z$ la cote.

$$x = \rho\cos\varphi,\quad y = \rho\sin\varphi,\quad \rho = \sqrt{x^2+y^2}$$
$$\vec e_\rho = \cos\varphi\,\vec i + \sin\varphi\,\vec j,\qquad \vec e_\varphi = -\sin\varphi\,\vec i + \cos\varphi\,\vec j$$
$$\overrightarrow{OM} = \rho\,\vec e_\rho + z\,\vec e_z,\qquad d\overrightarrow{OM} = d\rho\,\vec e_\rho + \rho\,d\varphi\,\vec e_\varphi + dz\,\vec e_z$$

Coordonnées polaires = cylindriques sans $z$ (mouvement plan).

> [!retenir] La dérivée d'un vecteur unitaire n'a **pas** de composante sur lui-même (car $\vec u\cdot\vec u = 1$ donne $\vec u\cdot\dfrac{d\vec u}{dt} = 0$). On l'écrit $\dfrac{d\vec u}{dt} = \vec\omega\wedge\vec u$ avec $\vec\omega = \dot\varphi\,\vec e_z$ (série 1, ex. 3).

## Idée 2 · Coordonnées sphériques $(r, \theta, \varphi)$

$r = OM \ge 0$, $\theta = (\vec k, \overrightarrow{OM}) \in [0, \pi]$ (colatitude), $\varphi \in [0, 2\pi[$ (longitude).

$$x = r\sin\theta\cos\varphi,\quad y = r\sin\theta\sin\varphi,\quad z = r\cos\theta$$
$$\overrightarrow{OM} = r\,\vec e_r,\qquad d\overrightarrow{OM} = dr\,\vec e_r + r\,d\theta\,\vec e_\theta + r\sin\theta\,d\varphi\,\vec e_\varphi$$

| | Cartésiennes | Cylindriques | Sphériques |
|---|---|---|---|
| $\overrightarrow{OM}$ | $x\vec i + y\vec j + z\vec k$ | $\rho\vec e_\rho + z\vec e_z$ | $r\vec e_r$ |
| Volume élémentaire | $dx\,dy\,dz$ | $\rho\,d\rho\,d\varphi\,dz$ | $r^2\sin\theta\,dr\,d\theta\,d\varphi$ |

## Idée 3 · Gradient, divergence, rotationnel

L'opérateur nabla en cartésiennes : $\vec\nabla = \dfrac{\partial}{\partial x}\vec i + \dfrac{\partial}{\partial y}\vec j + \dfrac{\partial}{\partial z}\vec k$.

```flux Ce que chaque opérateur prend et rend
grad : scalaire f → vecteur ∇f -> div : vecteur A → scalaire ∇·A -> rot : vecteur A → vecteur ∇∧A
```

- $\overrightarrow{\text{grad}}\,f$ ; différentielle totale : $df = \overrightarrow{\text{grad}}\,f\cdot d\overrightarrow{OM}$.
- En cylindriques : $\overrightarrow{\text{grad}}\,f = \dfrac{\partial f}{\partial\rho}\vec e_\rho + \dfrac1\rho\dfrac{\partial f}{\partial\varphi}\vec e_\varphi + \dfrac{\partial f}{\partial z}\vec e_z$.
- En sphériques : $\overrightarrow{\text{grad}}\,f = \dfrac{\partial f}{\partial r}\vec e_r + \dfrac1r\dfrac{\partial f}{\partial\theta}\vec e_\theta + \dfrac1{r\sin\theta}\dfrac{\partial f}{\partial\varphi}\vec e_\varphi$.
- Identités : $\overrightarrow{\text{rot}}(\overrightarrow{\text{grad}}\,f) = \vec 0$ et $\text{div}(\overrightarrow{\text{rot}}\,\vec A) = 0$.

```etapes Série 1, ex. 4 : div et rot de $\vec f = x^2yz\,\vec i + xy^2z\,\vec j + z\,\vec k$
Divergence :: $\dfrac{\partial(x^2yz)}{\partial x} + \dfrac{\partial(xy^2z)}{\partial y} + \dfrac{\partial z}{\partial z} = 2xyz + 2xyz + 1 = 4xyz + 1$.
Rotationnel, composante $\vec i$ :: $\dfrac{\partial f_z}{\partial y} - \dfrac{\partial f_y}{\partial z} = 0 - xy^2 = -xy^2$.
Composante $\vec j$ :: $\dfrac{\partial f_x}{\partial z} - \dfrac{\partial f_z}{\partial x} = x^2y - 0 = x^2y$.
Composante $\vec k$ :: $\dfrac{\partial f_y}{\partial x} - \dfrac{\partial f_x}{\partial y} = y^2z - x^2z$.
Résultat :: $\overrightarrow{\text{rot}}\,\vec f = -xy^2\,\vec i + x^2y\,\vec j + (y^2 - x^2)z\,\vec k$.
```

## S'exercer

```exercice Série 1, exercice 4
? $f(x,y,z) = r^2$ avec $r = \|\overrightarrow{OM}\|$. Calcule $\overrightarrow{\text{grad}}\,f$ et $df$.
= $f = x^2+y^2+z^2$, donc $\overrightarrow{\text{grad}}\,f = 2x\vec i + 2y\vec j + 2z\vec k = 2\overrightarrow{OM}$ et $df = 2x\,dx + 2y\,dy + 2z\,dz$. On vérifie bien $df = \overrightarrow{\text{grad}}\,f\cdot d\overrightarrow{OM}$.
? $f(M) = 3r^3\sin^2\theta\cos\theta\sin 2\varphi$. Exprime $f$ en cartésiennes, puis $\overrightarrow{\text{grad}}\,f$.
indice: $\sin 2\varphi = 2\sin\varphi\cos\varphi$.
= $f = 6\,(r\sin\theta\cos\varphi)(r\sin\theta\sin\varphi)(r\cos\theta) = 6xyz$. Donc $\overrightarrow{\text{grad}}\,f = 6yz\,\vec i + 6xz\,\vec j + 6xy\,\vec k$.
```

```exercice Série 1, exercice 3
? $P$ se déplace dans $(xOy)$, coordonnées $(\rho, \varphi, 0)$. Calcule $\dfrac{d\vec e_\rho}{dt}$ dans la base cartésienne, puis cylindrique.
= $\vec e_\rho = \cos\varphi\,\vec i + \sin\varphi\,\vec j$ donne $\dfrac{d\vec e_\rho}{dt} = \dot\varphi(-\sin\varphi\,\vec i + \cos\varphi\,\vec j) = \dot\varphi\,\vec e_\varphi$. De même $\dfrac{d\vec e_\varphi}{dt} = -\dot\varphi\,\vec e_\rho$.
```

## Flashcards

```cartes
$\vec e_\rho$ en cartésiennes :: $\cos\varphi\,\vec i + \sin\varphi\,\vec j$
$\vec e_\varphi$ en cartésiennes :: $-\sin\varphi\,\vec i + \cos\varphi\,\vec j$
$d\vec e_\rho/dt$ :: $\dot\varphi\,\vec e_\varphi$
$d\vec e_\varphi/dt$ :: $-\dot\varphi\,\vec e_\rho$
$d\overrightarrow{OM}$ en cylindriques :: $d\rho\,\vec e_\rho + \rho\,d\varphi\,\vec e_\varphi + dz\,\vec e_z$
$d\overrightarrow{OM}$ en sphériques :: $dr\,\vec e_r + r\,d\theta\,\vec e_\theta + r\sin\theta\,d\varphi\,\vec e_\varphi$
Différentielle totale :: $df = \overrightarrow{\text{grad}}\,f\cdot d\overrightarrow{OM}$
$\overrightarrow{\text{rot}}(\overrightarrow{\text{grad}}\,f)$ :: $\vec 0$
```

## QCM du chapitre

```qcm
? En cylindriques, $x$ vaut :
+ $\rho\cos\varphi$
- $\rho\sin\varphi$
- $r\sin\theta\cos\varphi$
= $\rho$ est la distance dans le plan $(xOy)$.

? $\dfrac{d\vec e_\rho}{dt}$ vaut :
- $\vec 0$
+ $\dot\varphi\,\vec e_\varphi$
- $-\dot\varphi\,\vec e_\rho$
= $\vec e_\rho$ tourne avec $M$ à la vitesse angulaire $\dot\varphi$.

? En sphériques, l'angle $\theta$ est mesuré à partir de :
+ l'axe $Oz$
- l'axe $Ox$
- le plan $(xOy)$
= $\theta = (\vec k, \overrightarrow{OM})$, entre $0$ et $\pi$.

? Le gradient d'un champ scalaire est :
+ un vecteur
- un scalaire
- toujours nul
= Il pointe dans la direction où $f$ augmente le plus vite.

? La divergence de $\vec f = x^2yz\,\vec i + xy^2z\,\vec j + z\,\vec k$ vaut :
- $2xyz$
+ $4xyz + 1$
- $x^2 + y^2 + 1$
= $2xyz + 2xyz + 1$.

? $\overrightarrow{\text{grad}}(x^2+y^2+z^2)$ vaut :
- $\overrightarrow{OM}$
+ $2\,\overrightarrow{OM}$
- $r^2$
= $2x\vec i + 2y\vec j + 2z\vec k$.

? La composante $\vec e_\varphi$ du gradient en cylindriques est :
- $\partial f/\partial\varphi$
+ $\dfrac1\rho\,\partial f/\partial\varphi$
- $\rho\,\partial f/\partial\varphi$
= Car le déplacement sur $\vec e_\varphi$ vaut $\rho\,d\varphi$.

? La dérivée d'un vecteur unitaire est :
+ perpendiculaire à ce vecteur
- parallèle à ce vecteur
- toujours nulle
= Dériver $\vec u\cdot\vec u = 1$ donne $2\,\vec u\cdot\dot{\vec u} = 0$.

? Le volume élémentaire en sphériques est :
- $dr\,d\theta\,d\varphi$
+ $r^2\sin\theta\,dr\,d\theta\,d\varphi$
- $r\,dr\,d\theta\,d\varphi$
= Produit des trois déplacements $dr$, $r\,d\theta$, $r\sin\theta\,d\varphi$.

? $\text{div}(\overrightarrow{\text{rot}}\,\vec A)$ vaut :
+ 0
- $\vec 0$
- $\overrightarrow{\text{grad}}\,A$
= Identité du cours ; c'est un scalaire nul.
```

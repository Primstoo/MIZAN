---
id: theoreme-de-gauss
titre: Le théorème de Gauss
seance: Série 2 · Exercices IV et V (sphères chargées)
importance: 5
---

## Avant de commencer

Il faut connaître la surface et le volume d'une sphère : $S = 4\pi r^2$, $V = \frac43\pi r^3$.

```exercice Vérifie ton prérequis
? Une sphère de rayon 2 a une surface de combien de fois π ?
= $4\pi \times 4 = 16\pi$.
reponse: 16
```

## Comment aborder ce chapitre

> [!astuce] **Pense « enveloppe imaginaire ».** On entoure les charges d'une surface fermée bien choisie (une sphère, un cylindre) sur laquelle E est constant : le calcul tient en une ligne.

> [!piege] Prendre la charge totale alors que la surface de Gauss n'en enferme qu'une partie. Seule compte la charge **intérieure** à la surface.

À la fin, tu sais trouver E et V partout pour une sphère chargée en surface ou en volume.

## Idée 1 · L'énoncé

$$\oint \vec E\cdot d\vec S = \frac{Q_{\text{int}}}{\varepsilon_0}$$

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Sphère chargée de rayon R et surface de Gauss sphérique de rayon r autour" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><circle cx="160" cy="60" r="30" fill="#D9824F" fill-opacity=".25" stroke="#D9824F"/><circle cx="160" cy="60" r="52" stroke-dasharray="5 5"/><path d="M160 60h52"/></g>
<g fill="currentColor" font-size="11"><text x="150" y="64">R</text><text x="190" y="56">r</text><text x="225" y="20">surface de Gauss</text></g>
</svg>
```

```etapes Appliquer Gauss
1. Symétries : par symétrie sphérique, $\vec E = E(r)\vec e_r$.
2. Surface de Gauss : sphère de rayon r. Flux $= E(r)\cdot 4\pi r^2$.
3. Charge intérieure : dépend de r < R ou r > R.
4. Égalise et isole E(r). Puis $V$ par $E = -\frac{dV}{dr}$ et la continuité.
```

## Idée 2 · Sphère chargée en surface (σ)

$Q = 4\pi R^2\sigma$. À l'intérieur, $Q_{\text{int}} = 0$ donc **$E = 0$** et V est constant : $V = \frac{\sigma R}{\varepsilon_0}$. À l'extérieur, $E = \frac{\sigma R^2}{\varepsilon_0 r^2}$ et $V = \frac{\sigma R^2}{\varepsilon_0 r}$.

## Idée 3 · Sphère chargée en volume (ρ)

```grille Champ d'une sphère chargée en volume
#cols: Région, Q intérieure, E(r)
*r < R, ρ·(4/3)πr³, ρr / (3ε₀)
*r > R, ρ·(4/3)πR³, ρR³ / (3ε₀r²)
```

Le champ croît linéairement à l'intérieur, est maximal en r = R, puis décroît en $1/r^2$.

## S'exercer

```exercice Série 2, ex. IV et V
? Ex. IV-3 : énergie potentielle de la sphère chargée en surface.
= $E_p = \frac12 QV = \frac12 \cdot 4\pi R^2\sigma\cdot\frac{\sigma R}{\varepsilon_0} = \dfrac{2\pi\sigma^2R^3}{\varepsilon_0}$.

? Ex. V : potentiel à l'intérieur de la sphère chargée en volume.
= On intègre $E = \frac{\rho r}{3\varepsilon_0}$ et on raccorde en r = R avec $V = \frac{\rho R^3}{3\varepsilon_0 r}$ : $V(r) = \dfrac{\rho}{6\varepsilon_0}(3R^2 - r^2)$.
```

## Flashcards

```cartes
Théorème de Gauss :: Flux de E à travers une surface fermée = $Q_{int}/\varepsilon_0$.
E dans une sphère chargée en surface :: Nul.
E dans une sphère chargée en volume :: $\rho r/(3\varepsilon_0)$, proportionnel à r.
Hors de la sphère :: Tout se passe comme si la charge était au centre.
```

## QCM du chapitre

```qcm
? Le théorème de Gauss utilise :
- la charge totale
+ la charge intérieure à la surface
- la charge extérieure
= $Q_{int}$.

? Dans une sphère chargée en surface, E vaut :
+ 0
- $\sigma/\varepsilon_0$
- infini
= Aucune charge intérieure.

? Hors d'une sphère chargée, E varie en :
- r
+ $1/r^2$
- $1/r$
= Comme une charge ponctuelle.

? Dans une sphère chargée en volume, E est :
+ proportionnel à r
- constant
- nul
= $\rho r/(3\varepsilon_0)$.

? La surface de Gauss doit être :
+ fermée
- plane
- conductrice
= Sinon pas de théorème.

? Pour un fil infini, la surface de Gauss adaptée est :
- une sphère
+ un cylindre coaxial
- un cube
= Symétrie cylindrique.

? Charge d'une sphère chargée en surface :
+ $4\pi R^2\sigma$
- $\frac43\pi R^3\sigma$
- $\pi R^2\sigma$
= σ × surface.

? V est continu à la traversée d'une surface chargée :
+ oui
- non
= C'est E qui peut sauter.

? Le maximum de E pour la sphère en volume est en :
- r = 0
+ r = R
- r infini
= E croît puis décroît.

? Le flux de E à travers une surface sans charge intérieure :
+ est nul
- vaut $1/\varepsilon_0$
- est infini
= Les lignes qui entrent ressortent.
```

---
id: fermat-descartes
titre: Principe de Fermat et lois de Descartes
seance: Chapitres 1 et 2 · Série 1
importance: 4
---

## Avant de commencer

Il faut connaître l'indice d'un milieu : $n = \frac{c}{v}$, toujours ≥ 1.

```exercice Vérifie ton prérequis
? La lumière va à $2\cdot10^8$ m/s dans un verre. Son indice ($c = 3\cdot10^8$ m/s) ?
= $n = 3/2 = 1{,}5$.
reponse: 1.5
```

## Comment aborder ce chapitre

> [!astuce] **Pense « la lumière est paresseuse ».** Elle prend le chemin dont la durée est stationnaire (minimale le plus souvent) : c'est le principe de Fermat. Les lois de Descartes en découlent.

> [!piege] Mesurer les angles par rapport à la surface. Les angles d'incidence et de réfraction se mesurent par rapport à la **normale**.

À la fin, tu sais appliquer Descartes et prévoir une réflexion totale.

## Idée 1 · Les lois de Descartes

```html
<svg viewBox="0 0 320 140" role="img" aria-label="Rayon incident, réfléchi et réfracté de part et d'autre de la normale" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 70h280"/><path d="M160 10v120" stroke-dasharray="4 4"/><path d="M90 15L160 70L230 15"/><path d="M160 70L195 130" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="11"><text x="128" y="45">i</text><text x="178" y="45">i'</text><text x="168" y="110">r</text><text x="24" y="62">n₁</text><text x="24" y="88">n₂</text></g>
</svg>
```

```grille Les deux lois
#cols: Phénomène, Loi
*Réflexion, i' = i (dans le plan d'incidence)
*Réfraction, n₁ sin i = n₂ sin r
```

## Idée 2 · La réflexion totale

Si $n_1 > n_2$, le rayon réfracté s'écarte de la normale. Au-delà de l'angle limite $\lambda$ tel que $\sin\lambda = \frac{n_2}{n_1}$, il n'y a plus de réfraction : tout est réfléchi.

**Exemple.** Verre ($n = 1{,}5$) vers air : $\sin\lambda = \frac{1}{1{,}5}$, $\lambda \approx 41{,}8°$.

## Idée 3 · Retrouver Descartes avec Fermat (série 1)

```etapes Méthode
1. Écris la durée $t = \frac{AI}{v_1} + \frac{IB}{v_2}$ en fonction de la position de I.
2. Dérive par rapport à la position de I et pose $dt = 0$.
3. Une des équations impose que A, I, B soient dans un même plan (plan d'incidence).
4. L'autre donne $\frac{\sin i}{v_1} = \frac{\sin r}{v_2}$, soit $n_1\sin i = n_2\sin r$.
```

## S'exercer

```exercice Série 1
? Ex. 4 : rayon incident à 45° de la face d'un cube, réfracté à 60° de la face. Indice ?
= Angles mesurés à la normale : i = 90° − 45° = 45° dans l'air et r = 90° − 60° = 30° dans le plastique (le rayon réfracté se rapproche de la normale). $n = \frac{\sin 45°}{\sin 30°} = \sqrt2 \approx 1{,}41$ et $v = c/n \approx 2{,}12\cdot10^8$ m/s.
reponse: 1.41

? Ex. 3 : combien d'images d'un point A voit-on dans deux miroirs perpendiculaires ?
= Trois : A₁ (dans M₁), A₂ (dans M₂) et A₁₂ = A₂₁ (image double, symétrique de A par rapport à l'arête).
reponse: 3
```

> [!attention] Dans la figure de l'exercice 4, les angles 60° et 45° sont mesurés par rapport à la face ; la figure n'étant pas dans le fichier, on a retenu la seule lecture physiquement possible.

## Flashcards

```cartes
Principe de Fermat :: Le chemin optique suivi par la lumière est stationnaire.
Loi de la réfraction :: $n_1\sin i = n_2\sin r$.
Angle limite :: $\sin\lambda = n_2/n_1$, avec $n_1 > n_2$.
Indice :: $n = c/v$.
```

## QCM du chapitre

```qcm
? Les angles se mesurent par rapport à :
- la surface
+ la normale
- l'axe optique
= Toujours la normale.

? En passant de l'air au verre, le rayon :
+ se rapproche de la normale
- s'en écarte
- n'est pas dévié
= $n_2 > n_1$.

? La réflexion totale est possible :
- de l'air vers l'eau
+ de l'eau vers l'air
- toujours
= Il faut $n_1 > n_2$.

? Angle limite verre-air ($n = 1{,}5$) :
- 30°
+ ≈ 42°
- 60°
= $\arcsin(2/3)$.

? L'angle de réflexion vaut :
+ l'angle d'incidence
- son double
- 90° moins l'incidence
= i' = i.

? Le principe de Fermat porte sur :
+ le chemin optique
- l'intensité
- la couleur
= Durée stationnaire.

? Un indice de 1,33 correspond à :
+ l'eau
- le diamant
- le vide
= Le diamant vaut 2,42.

? La vitesse de la lumière dans un milieu d'indice 2 :
- $6\cdot10^8$ m/s
+ $1{,}5\cdot10^8$ m/s
- $3\cdot10^8$ m/s
= $c/n$.

? Incident, réfléchi, réfracté et normale sont :
+ dans un même plan
- dans trois plans différents
- toujours parallèles
= Plan d'incidence.

? Sous incidence normale (i = 0), le rayon réfracté :
+ n'est pas dévié
- est réfléchi totalement
- est dévié de 90°
= sin r = 0.
```

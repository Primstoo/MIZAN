---
id: oeil-instruments
titre: L'œil et les instruments
seance: Chapitre V · Œil, correction, systèmes grossissants
importance: 4
---

## Avant de commencer

Il faut savoir qu'un petit angle en radians vaut à peu près sa tangente : $\alpha \approx \frac{AB}{d}$.

```exercice Vérifie ton prérequis
? Un objet de 1 cm vu à 25 cm : angle en radians ?
= $\alpha \approx 1/25 = 0{,}04$ rad.
reponse: 0.04
```

## Comment aborder ce chapitre

> [!astuce] **Pense « l'œil est une lentille dont la rétine ne bouge pas ».** Pour voir net de près, l'œil réduit sa distance focale (accommodation), pas la distance cristallin-rétine.

> [!piege] Corriger un myope avec une lentille convergente. Le myope voit mal de loin : il faut une lentille **divergente**, dont le foyer image est au punctum remotum.

À la fin, tu sais traiter un œil myope et calculer le grossissement d'un système à deux lentilles.

## Idée 1 · L'œil réduit

```grille Vocabulaire
#cols: Terme, Sens
*Punctum remotum (PR), point le plus loin vu net sans accommoder (infini pour un œil normal)
*Punctum proximum (PP), point le plus proche vu net en accommodant au maximum (≈ 25 cm)
*Myope, PR à distance finie, œil trop convergent
*Hypermétrope, œil pas assez convergent
```

```html
<svg viewBox="0 0 320 110" role="img" aria-label="Œil réduit : lentille et rétine à distance fixe" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10 55h290"/><path d="M150 15v80" stroke="#D9824F" stroke-width="3"/><path d="M260 15v80" stroke-width="4"/><path d="M40 30L150 55L260 80" stroke-dasharray="4 4"/></g>
<g fill="currentColor" font-size="11"><text x="140" y="108">cristallin</text><text x="245" y="108">rétine</text><text x="190" y="48">≈ 17 mm</text></g>
</svg>
```

## Idée 2 · Corriger la myopie

```etapes Lentille de correction (accolée à l'œil)
1. La lentille doit donner d'un objet à l'infini une image au PR.
2. Donc son foyer image est au PR : $f' = -d_{PR}$.
3. Exemple : PR à 12 cm, f' = −12 cm, V ≈ −8,3 δ.
```

## Idée 3 · Le grossissement

$G = \dfrac{\alpha'}{\alpha}$, où α est l'angle sous lequel on voit l'objet à l'œil nu au PP (25 cm), α' l'angle de l'image à travers l'instrument. Pour observer **sans fatigue**, l'image finale est à l'infini : l'image intermédiaire est au foyer objet de l'oculaire.

## S'exercer

```exercice Application
? Œil myope : au repos il voit net à 12 cm avec f = 16 mm. Distance cristallin-rétine ?
= $\frac{1}{d'} = \frac{1}{16} - \frac{1}{120}$ (mm), $d' \approx 18{,}5$ mm.
reponse: 18.5

? En accommodant au maximum, f = 14,8 mm. Distance minimale de vision ?
= $\frac{1}{\overline{OA}} = \frac{1}{18{,}46} - \frac{1}{14{,}8} \approx -0{,}0134$, soit **≈ 7,5 cm**.
reponse: 7.5
```

## Flashcards

```cartes
Accommodation :: L'œil diminue sa distance focale pour voir net de près.
Correction d'un myope :: Lentille divergente, $f' = -d_{PR}$.
Grossissement :: $G = \alpha'/\alpha$, α mesuré à 25 cm.
Observer sans fatigue :: Image finale à l'infini.
```

## QCM du chapitre

```qcm
? Le myope voit mal :
+ de loin
- de près
- en couleur
= PR à distance finie.

? On corrige la myopie avec une lentille :
- convergente
+ divergente
- cylindrique
= Elle réduit la vergence de l'ensemble.

? Le PP d'un œil normal est vers :
+ 25 cm
- 1 m
- l'infini
= Distance minimale de vision distincte.

? Pour voir de près, l'œil :
+ diminue sa focale
- avance la rétine
- augmente sa focale
= Accommodation.

? Le PR d'un œil normal est :
+ à l'infini
- à 25 cm
- à 1 m
= Vision de loin sans effort.

? Observer sans fatigue signifie :
+ image finale à l'infini
- image au PP
- image réelle
= L'œil n'accommode pas.

? PR à 50 cm : vergence de la correction
+ −2 δ
- +2 δ
- −0,5 δ
= f' = −0,5 m.

? Le grossissement compare :
+ deux angles
- deux longueurs
- deux vergences
= α'/α.

? Distance cristallin-rétine pendant l'accommodation :
+ constante
- diminue
- augmente
= C'est la focale qui change.

? L'hypermétrope a un œil :
- trop convergent
+ pas assez convergent
- normal
= Il se corrige avec une lentille convergente.
```

---
id: radioactivite
titre: Radioactivité et dosimétrie
seance: Chapitre 6 · Partie atomique, partie nucléaire, dosimétrie
importance: 5
---

## Avant de commencer

Il faut connaître la notation d'un noyau : ${}^A_Z X$, avec Z protons et A nucléons (protons + neutrons).

```exercice Vérifie ton prérequis
? Combien de neutrons dans ${}^{24}_{11}\text{Na}$ ?
= A − Z = 24 − 11 = 13.
reponse: 13
```

## Comment aborder ce chapitre

> [!astuce] **Pense « on conserve A et Z ».** Toute équation de désintégration s'écrit en équilibrant le haut (A) et le bas (Z) des deux côtés.

> [!piege] Confondre demi-vie et durée de vie totale. Après une demi-vie, il reste la **moitié** ; après deux, un quart, pas zéro.

À la fin, tu sais écrire une désintégration, utiliser la loi de décroissance et faire un calcul de dilution comme à l'examen.

## Idée 1 · Les désintégrations

```grille Types de désintégration
#cols: Type, Particule émise, Effet sur le noyau
*α, noyau d'hélium ⁴₂He, A − 4 et Z − 2
*β⁻, électron ⁰₋₁e (+ antineutrino), Z + 1, A inchangé
*β⁺, positon ⁰₊₁e (+ neutrino), Z − 1, A inchangé
*γ, photon, désexcitation, ni A ni Z ne changent
```

**Exemple.** ${}^{24}_{11}\text{Na} \to {}^{24}_{12}\text{Mg} + {}^{0}_{-1}e$ : désintégration β⁻.

## Idée 2 · La loi de décroissance

$$N(t) = N_0\,e^{-\lambda t}, \qquad T = \frac{\ln 2}{\lambda}, \qquad A(t) = \lambda N(t)$$

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Courbe de décroissance exponentielle : N0, N0/2 à T, N0/4 à 2T" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v100h270"/><path d="M30 20C80 60 120 80 160 88S260 104 295 107" stroke="#D9824F"/><path d="M30 65h70v45M30 87h130v23" stroke-dasharray="3 4"/></g>
<g fill="currentColor" font-size="10"><text x="2" y="24">N₀</text><text x="0" y="68">N₀/2</text><text x="0" y="90">N₀/4</text><text x="96" y="124">T</text><text x="154" y="124">2T</text></g>
</svg>
```

L'activité A se mesure en becquerels (1 Bq = 1 désintégration par seconde).

## Idée 3 · Dosimétrie

```grille Grandeurs
#cols: Grandeur, Définition, Unité
*Dose absorbée D, énergie reçue par kg, gray (Gy = J/kg)
*Dose équivalente H, D × facteur de pondération du rayonnement, sievert (Sv)
*Dose efficace E, somme des H × facteurs tissulaires, sievert (Sv)
```

## S'exercer

```exercice Application
? Na 24, T = 15 h. Constante radioactive en h⁻¹ ?
= $\lambda = \ln2 / 15 \approx 0{,}0462$ h⁻¹ (≈ $1{,}28\cdot10^{-5}$ s⁻¹).
reponse: 0.0462

? Quelle fraction reste après 45 h ?
= 45 h = 3 demi-vies : $\frac18$ = 12,5 %.
reponse: 0.125
```

## Flashcards

```cartes
β⁻ :: Un neutron devient proton : Z + 1, émission d'un électron.
Demi-vie :: Durée au bout de laquelle la moitié des noyaux s'est désintégrée : $T = \ln2/\lambda$.
Activité :: $A = \lambda N$, en becquerels.
Gray / sievert :: Dose absorbée (J/kg) / dose pondérée par l'effet biologique.
```

## QCM du chapitre

```qcm
? En α, A diminue de :
+ 4
- 2
- 1
= On perd un noyau d'hélium.

? En β⁻, Z :
+ augmente de 1
- diminue de 1
- ne change pas
= Un neutron devient proton.

? Après 2 demi-vies, il reste :
- la moitié
+ le quart
- rien
= $(1/2)^2$.

? $T = $
+ $\ln2/\lambda$
- $\lambda\ln2$
- $1/\lambda$
= $1/\lambda$ est la constante de temps.

? 1 Bq vaut :
+ 1 désintégration par seconde
- 1 J/kg
- 1 Sv
= Unité d'activité.

? Le gray mesure :
+ l'énergie absorbée par kg
- l'activité
- l'effet biologique
= Le sievert pondère l'effet.

? Le rayonnement γ modifie :
- A
- Z
+ ni A ni Z
= Désexcitation du noyau.

? Le Na 24 se désintègre en :
+ Mg 24 (β⁻)
- Ne 24 (β⁺)
- Na 23
= Z passe de 11 à 12.

? L'activité d'un échantillon au cours du temps :
+ décroît exponentiellement
- reste constante
- croît
= $A = \lambda N_0 e^{-\lambda t}$.

? Plus λ est grand, plus la demi-vie est :
+ courte
- longue
- infinie
= T inversement proportionnel à λ.
```

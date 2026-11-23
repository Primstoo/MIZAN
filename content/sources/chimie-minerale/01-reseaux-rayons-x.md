---
id: reseaux-rayons-x
titre: Réseau cristallin et diffraction des rayons X
seance: Chapitre 1 · Chimie du solide (réseau, Bravais, Miller, RX)
importance: 4
---

## Avant de commencer

Il faut savoir calculer un sinus inverse et convertir : 1 Å = 100 pm = 10⁻¹⁰ m.

```exercice Vérifie ton prérequis
? 398 pm en ångströms ?
= 3,98 Å.
reponse: 3.98
```

## Comment aborder ce chapitre

> [!astuce] **Pense « un motif répété ».** Un cristal = un réseau (des points) + un motif (les atomes posés sur chaque point). On étudie la plus petite boîte qui se répète : la maille.

> [!piege] Compter un atome de sommet comme 1. Un sommet de cube est partagé par 8 mailles : il compte pour 1/8. Une face : 1/2. Une arête : 1/4.

À la fin, tu sais compter Z, nommer un réseau de Bravais et placer le premier pic de diffraction.

## Idée 1 · Maille et comptage

```grille Contribution d'un atome à la maille cubique
#cols: Position, Partagé entre, Compte pour
*Sommet, 8 mailles, 1/8
*Arête, 4 mailles, 1/4
*Face, 2 mailles, 1/2
*Centre, 1 maille, 1
```

```grille Les trois réseaux cubiques
#cols: Réseau, Symbole, Nœuds par maille
*Cubique simple, P, 8 × 1/8 = 1
*Cubique centré, I, 1 + 1 = 2
*Cubique à faces centrées, F, 1 + 6 × 1/2 = 4
```

Il existe 7 systèmes cristallins et 14 réseaux de Bravais.

## Idée 2 · Plans et indices de Miller

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Cube avec le plan (111) coupant les trois axes à 1" style="max-width:300px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M60 110h100v-80H60zM60 30l40-20h100l-40 20M160 110l40-20V10"/><path d="M100 10v80h100" stroke-dasharray="4 4"/><path d="M60 30L160 110L200 10z" fill="#D9824F" fill-opacity=".3" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="11"><text x="215" y="60">plan (111)</text></g>
</svg>
```

```etapes Trouver (hkl)
1. Lis les intersections du plan avec les axes, en unités de a, b, c.
2. Prends les inverses.
3. Ramène à des entiers les plus petits possibles.
```

En cubique : $d_{hkl} = \dfrac{a}{\sqrt{h^2+k^2+l^2}}$.

## Idée 3 · Diffraction : loi de Bragg

$$2\,d_{hkl}\sin\theta = n\lambda$$

```grille Premier pic observé (réflexions permises)
#cols: Réseau, Condition, Premier pic
*P, aucune extinction, (100)
*I, h + k + l pair, (110)
*F, h k l tous pairs ou tous impairs, (111)
```

**Exemple.** Réseau P, a = 3,98 Å, λ = 1,541 Å : $d_{100} = 3{,}98$ Å, $\sin\theta = \frac{1{,}541}{7{,}96}$, θ ≈ 11,2°, **2θ ≈ 22,3°**.

## S'exercer

```exercice Application
? Combien de nœuds dans une maille cubique F ?
= 8 × 1/8 + 6 × 1/2 = 4.
reponse: 4

? Réseau F, a = 6,02 Å : 2θ du premier pic (λ = 1,541 Å) ?
= Premier pic (111) : $d = 6{,}02/\sqrt3 = 3{,}476$ Å ; θ = arcsin(1,541/6,951) ≈ 12,8° ; **2θ ≈ 25,6°**.
reponse: 25.6
```

## Flashcards

```cartes
Sommet / face / arête :: 1/8, 1/2, 1/4.
Nœuds par maille P, I, F :: 1, 2, 4.
Loi de Bragg :: $2d\sin\theta = n\lambda$.
Premier pic en F :: (111).
```

## QCM du chapitre

```qcm
? Un atome au centre d'une face compte pour :
- 1/8
+ 1/2
- 1
= Partagé entre 2 mailles.

? Nombre de réseaux de Bravais :
- 7
+ 14
- 32
= 7 systèmes, 14 réseaux.

? $d_{110}$ en cubique vaut :
+ $a/\sqrt2$
- $a\sqrt2$
- $a/2$
= $\sqrt{1+1+0}$.

? En réseau I, la réflexion (100) est :
- observée
+ éteinte
- la plus intense
= h + k + l = 1, impair.

? Le premier pic d'un réseau F est :
- (100)
- (110)
+ (111)
= Indices de même parité.

? Plan coupant les axes en 1, 1, ∞ :
+ (110)
- (111)
- (001)
= Inverses : 1, 1, 0.

? Si d augmente, θ :
+ diminue
- augmente
- ne change pas
= $\sin\theta = \lambda/(2d)$.

? Un cube centré contient :
+ 2 nœuds
- 1 nœud
- 4 nœuds
= Sommets + centre.

? La raie Kα du cuivre vaut environ :
+ 1,54 Å
- 15,4 Å
- 0,154 Å
= Source classique des diffractomètres.

? Un cristal est :
+ un réseau + un motif
- un ensemble désordonné
- un seul atome
= Définition.
```

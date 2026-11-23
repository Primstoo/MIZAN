---
id: ph-des-solutions
titre: Le pH des solutions
seance: Chapitre I-2 · Réactions acido-basiques
importance: 5
---

## Avant de commencer

Il faut savoir manipuler les logarithmes décimaux : $\log(10^{-3}) = -3$ et $\log(ab) = \log a + \log b$.

```exercice Vérifie ton prérequis
? $[H_3O^+] = 10^{-3}$ mol/L. pH ?
= pH = 3.
reponse: 3
```

## Comment aborder ce chapitre

> [!astuce] **Pense « fort ou faible, puis une formule ».** Identifie l'espèce (acide fort, acide faible, base faible, ampholyte), choisis la formule, puis vérifie l'approximation.

> [!piege] Appliquer la formule de l'acide fort à un acide faible. L'acide acétique 0,1 M n'a pas un pH de 1 mais d'environ 2,85 : il est très peu dissocié.

À la fin, tu sais calculer le pH de n'importe quelle solution simple et justifier ton approximation.

## Idée 1 · Le formulaire

```grille Formules du pH (25 °C)
#cols: Solution, Formule, Valable si
*Acide fort C, pH = −log C, C > 10⁻⁶ M
*Base forte C, pH = 14 + log C, C > 10⁻⁶ M
*Acide faible C, pH = ½(pKa − log C), α < 5 % (pH < pKa − 1)
*Base faible C, pH = 7 + ½(pKa + log C), pH > pKa + 1
*Ampholyte, pH = ½(pKa1 + pKa2), indépendant de C
```

## Idée 2 · Le coefficient de dissociation

$\alpha = \frac{[A^-]}{C}$. Pour un acide faible peu dissocié, $\alpha \approx \sqrt{K_a / C}$.

```html
<svg viewBox="0 0 320 70" role="img" aria-label="Axe des pH : en dessous de pKa l'acide domine, au-dessus la base" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10 35h300"/><path d="M160 25v20" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="11"><text x="150" y="18">pKa</text><text x="40" y="60">HA majoritaire</text><text x="200" y="60">A⁻ majoritaire</text></g>
</svg>
```

```etapes Calcul type : acide acétique 0,1 M, Ka = 2·10⁻⁵
1. Acide faible : on suppose α petit.
2. pH = ½(pKa − log C) = ½(4,70 + 1) ≈ 2,85.
3. α ≈ √(2·10⁻⁵ / 0,1) ≈ 1,4 % < 5 % : approximation justifiée.
```

## Idée 3 · Les ampholytes

Une espèce à la fois acide et base (HCO₃⁻) : pH = ½(pKa1 + pKa2). Pour NaHCO₃ : ½(6,30 + 10,33) ≈ **8,32**, quelle que soit la concentration.

## S'exercer

```exercice Exercices de révision
? Ex. 3 : acide formique 10⁻² M, pH = 2,9. α et pKa ?
= [H₃O⁺] = 10⁻²·⁹ ≈ 1,26·10⁻³ ; α ≈ 12,6 %. $K_a = \frac{h^2}{C - h}$ donne **pKa ≈ 3,74** (pas d'approximation, α > 5 %).
reponse: 3.74

? Ex. 4 : NaF 0,1 M (pKa HF/F⁻ = 3,18). pH ?
= F⁻ est une base faible : pH = 7 + ½(3,18) + ½ log(0,1) ≈ **8,09**.
reponse: 8.09
```

## Flashcards

```cartes
pH d'un acide faible :: ½(pKa − log C), si α < 5 %.
pH d'une base faible :: 7 + ½(pKa + log C).
pH d'un ampholyte :: ½(pKa1 + pKa2).
Coefficient de dissociation :: α = [A⁻]/C ≈ √(Ka/C).
```

## QCM du chapitre

```qcm
? pH de HCl 10⁻² M :
+ 2
- 12
- 7
= Acide fort.

? pH de NaOH 10⁻³ M :
+ 11
- 3
- 14
= 14 + log C.

? Un acide plus dilué est :
+ plus dissocié
- moins dissocié
- pas plus dissocié
= α ≈ √(Ka/C) augmente.

? pH d'un ampholyte :
+ ne dépend pas de C
- dépend fortement de C
- vaut toujours 7
= ½(pKa1 + pKa2).

? À pH = pKa :
+ [HA] = [A⁻]
- [HA] > [A⁻]
- il n'y a plus d'acide
= Demi-équivalence.

? NaF en solution est :
+ basique
- acide
- neutre
= F⁻ est une base faible.

? L'approximation « acide faiblement dissocié » est valable si :
+ α < 5 %
- α > 50 %
- toujours
= Sinon on résout l'équation du second degré.

? Ke à 25 °C vaut :
+ 10⁻¹⁴
- 10⁻⁷
- 14
= pKe = 14.

? pH d'acide acétique 0,1 M (Ka = 2·10⁻⁵) :
+ ≈ 2,85
- 1
- 4,7
= Formule de l'acide faible.

? HCO₃⁻ est :
+ un ampholyte
- un acide fort
- un ion indifférent
= Base de H₂CO₃, acide de CO₃²⁻.
```

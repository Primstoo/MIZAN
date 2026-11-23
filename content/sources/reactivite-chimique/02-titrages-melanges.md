---
id: titrages-melanges
titre: Mélanges et titrages acido-basiques
seance: Chapitre I-2 · Dosages
importance: 5
---

## Avant de commencer

Il faut savoir calculer une quantité de matière : n = C × V.

```exercice Vérifie ton prérequis
? 20 mL de NaOH 0,25 M : combien de mmol ?
= 20 × 0,25 = 5 mmol.
reponse: 5
```

## Comment aborder ce chapitre

> [!astuce] **Pense « qui est en excès ? ».** Dans un mélange acide + base, fais d'abord la réaction totale, puis calcule le pH avec ce qui reste.

> [!piege] Oublier de diviser par le volume total. Après un mélange, toutes les concentrations se calculent sur la somme des volumes.

À la fin, tu sais tracer et exploiter la courbe de dosage d'un acide faible par une base forte.

## Idée 1 · Les mélanges

```etapes Mélange acide fort + base forte
1. Calcule les quantités : n(H₃O⁺) et n(OH⁻).
2. Retranche : l'espèce en excès fixe le pH.
3. Divise par le volume total.
```

**Exemple (révision, ex. 5).** 10 mL de HCl 0,1 M (1 mmol) + 20 mL de NaOH 0,25 M (5 mmol) : il reste 4 mmol de OH⁻ dans 30 mL, [OH⁻] = 0,133 M, **pH ≈ 13,1**.

## Idée 2 · Le dosage d'un acide faible par une base forte

```html
<svg viewBox="0 0 320 150" role="img" aria-label="Courbe de dosage acide faible base forte : demi-équivalence à pH = pKa, saut de pH à l'équivalence" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v130h270"/><path d="M30 110C60 95 70 92 100 90S150 82 160 70C166 40 175 30 200 25S270 20 295 18" stroke="#D9824F"/><path d="M95 90v50M30 90h65M165 50v90" stroke-dasharray="3 4"/></g>
<g fill="currentColor" font-size="10"><text x="0" y="94">pKa</text><text x="85" y="148">Ve/2</text><text x="160" y="148">Ve</text><text x="250" y="148">V</text><text x="5" y="14">pH</text></g>
</svg>
```

```grille Points remarquables (x = V/Ve)
#cols: Point, pH
*x = 0, acide faible seul : ½(pKa − log Ca)
*0 < x < 1, tampon : pKa + log(x / (1 − x))
*x = 0,5, demi-équivalence : pH = pKa
*x = 1, base faible seule : 7 + ½(pKa + log C)
*x > 1, base forte en excès : 14 + log[OH⁻]
```

## Idée 3 · Les solutions tampons

Un mélange acide faible + base conjuguée en quantités proches : le pH varie peu par ajout d'acide, de base ou par dilution. pH = pKa + log([A⁻]/[HA]).

## S'exercer

```exercice Révision, exercice 6
? 50 mL d'acide formique 0,1 M dosés par NaOH 0,5 M. Ve ?
= Ve = 50 × 0,1 / 0,5 = **10 mL**.
reponse: 10

? pH à l'équivalence (pKa = 3,8) ?
= C(HCOO⁻) = 5 mmol / 60 mL ≈ 0,083 M ; pH = 7 + ½(3,8) + ½ log(0,083) ≈ **8,36**.
reponse: 8.36

? pH pour x = 1,5 ?
= V = 15 mL : excès de 2,5 mmol de OH⁻ dans 65 mL, [OH⁻] ≈ 0,0385 M, **pH ≈ 12,6**.
reponse: 12.6
```

## Flashcards

```cartes
Demi-équivalence :: pH = pKa.
Henderson :: pH = pKa + log([A⁻]/[HA]).
pH à l'équivalence (acide faible / base forte) :: > 7 (la base conjuguée est seule).
Mélange : quel volume ? :: Toujours le volume total.
```

## QCM du chapitre

```qcm
? À la demi-équivalence :
+ pH = pKa
- pH = 7
- pH = 14
= Autant de HA que de A⁻.

? Le pH à l'équivalence d'un acide faible dosé par une base forte est :
+ supérieur à 7
- égal à 7
- inférieur à 7
= Il reste la base conjuguée.

? Un tampon résiste à :
+ l'ajout modéré d'acide ou de base
- toute réaction
- la chaleur
= pH quasi constant.

? Ve se calcule par :
+ Ca·Va = Cb·Ve
- Ca + Cb
- Va/Vb
= Égalité des quantités.

? Après l'équivalence, le pH est fixé par :
+ la base forte en excès
- l'acide faible
- le pKa
= OH⁻ en excès.

? Dosage d'un acide fort par une base forte : pH à l'équivalence :
+ 7
- 8,4
- pKa
= Seuls des ions indifférents.

? Pour x = 0,25, pH =
+ pKa − log 3
- pKa + log 3
- pKa
= log(0,25/0,75).

? 1 mmol de HCl + 5 mmol de NaOH dans 30 mL :
+ basique
- acide
- neutre
= 4 mmol de OH⁻ en excès.

? Le saut de pH sert à :
+ repérer l'équivalence
- mesurer le pKa
- calculer la masse molaire
= Indicateur coloré ou dérivée.

? Diluer un tampon :
+ change peu son pH
- le rend neutre
- double son pH
= Le rapport [A⁻]/[HA] ne change pas.
```

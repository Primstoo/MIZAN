---
id: ellingham
titre: Diagrammes d'Ellingham
seance: Chapitre 3 · Initiation à la réactivité en chimie minérale
importance: 5
---

## Avant de commencer

Il faut connaître $\Delta_rG° = \Delta_rH° - T\Delta_rS°$ et savoir que $\Delta_rG° < 0$ favorise la réaction.

```exercice Vérifie ton prérequis
? ΔH° = −1000 kJ/mol, ΔS° = −0,2 kJ/(mol·K). ΔG° à 1000 K ?
= −1000 − 1000 × (−0,2) = −800 kJ/mol.
reponse: -800
```

## Comment aborder ce chapitre

> [!astuce] **Pense « une droite par couple oxyde/métal, toujours pour 1 mol de O₂ ».** Plus une droite est basse, plus l'oxyde est stable. Un métal réduit l'oxyde d'un couple situé **au-dessus** de lui.

> [!piege] Écrire les réactions avec des coefficients quelconques. Les droites ne se comparent que si chaque réaction consomme **1 mol de O₂**.

À la fin, tu sais tracer $\Delta_rG°(T)$, trouver une température d'inversion et prévoir une réduction.

## Idée 1 · L'approximation d'Ellingham

ΔH° et ΔS° sont supposés indépendants de T : $\Delta_rG°(T) = \Delta_rH° - T\Delta_rS°$ est une **droite**. Pour une oxydation $2M + O_2 \to 2MO$, un gaz disparaît : ΔS° < 0, donc la pente $-\Delta_rS°$ est **positive**.

```html
<svg viewBox="0 0 320 140" role="img" aria-label="Deux droites d'Ellingham : la plus basse correspond à l'oxyde le plus stable ; le métal du bas réduit l'oxyde du haut" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v120h270"/><path d="M30 40L290 20"/><path d="M30 100L290 60" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="10"><text x="200" y="22">Cu₂O/Cu</text><text x="200" y="68">Al₂O₃/Al</text><text x="230" y="140">T</text><text x="0" y="12">ΔG°</text></g>
</svg>
```

## Idée 2 · Domaines de stabilité

Pour un couple, au-dessus de la droite (si la pression de O₂ est supérieure) l'oxyde est stable ; en dessous, le métal. Quand un métal a plusieurs oxydes (MO, M₃O₄, M₂O₃), un oxyde intermédiaire n'est stable que si son domaine existe : là où deux droites se croisent, il peut disparaître (**dismutation**).

```etapes Trouver une température d'inversion Ti
1. Écris les deux réactions pour 1 mol de O₂.
2. Exprime $\Delta_rG°_1(T)$ et $\Delta_rG°_2(T)$.
3. Résous $\Delta_rG°_1(T_i) = \Delta_rG°_2(T_i)$ : $T_i = \frac{\Delta H_1 - \Delta H_2}{\Delta S_1 - \Delta S_2}$.
4. De part et d'autre de Ti, l'ordre des droites s'inverse.
```

## Idée 3 · Combiner des réactions

Si (4) = a·(1) + b·(2), alors $\Delta_rG°_4 = a\,\Delta_rG°_1 + b\,\Delta_rG°_2$ (loi de Hess).

**Exemple.** $6MO + O_2 \to 2M_3O_4$ (2) et $2M + O_2 \to 2MO$ (1). Pour $\frac32M + O_2 \to \frac12M_3O_4$ (4) : (4) = ¾·(1) + ¼·(2), donc $\Delta_rG°_4 = \frac34\Delta_rG°_1 + \frac14\Delta_rG°_2$.

## S'exercer

```exercice Application
? Équilibre $4M + 3O_2 \to 2M_2O_3$ pour 1 mol de O₂ ?
= On divise par 3 : $\frac43M + O_2 \to \frac23M_2O_3$.

? Réaction 1 : ΔH = −500 kJ, ΔS = −0,1 kJ/K. Réaction 2 : ΔH = −600 kJ, ΔS = −0,2 kJ/K. Ti ?
= $T_i = \frac{-500 - (-600)}{-0{,}1 - (-0{,}2)} = \frac{100}{0{,}1} = 1000$ K.
reponse: 1000
```

## Flashcards

```cartes
Approximation d'Ellingham :: ΔH° et ΔS° constants : ΔG°(T) est une droite.
Pente d'une droite d'oxydation :: $-\Delta_rS°$, positive (un gaz disparaît).
Qui réduit qui ? :: Le métal de la droite du bas réduit l'oxyde de la droite du haut.
Convention :: Toujours 1 mol de O₂.
```

## QCM du chapitre

```qcm
? Les réactions d'Ellingham sont écrites pour :
+ 1 mol de O₂
- 1 mol de métal
- 1 mol d'oxyde
= Pour pouvoir comparer.

? La pente d'une droite d'oxydation est généralement :
+ positive
- négative
- nulle
= ΔS° < 0.

? L'oxyde le plus stable a la droite :
+ la plus basse
- la plus haute
- la plus pentue
= ΔG° le plus négatif.

? L'aluminium peut réduire Cu₂O car :
+ sa droite est en dessous
- sa droite est au-dessus
- il est plus lourd
= Aluminothermie.

? Ti s'obtient en égalant :
+ deux ΔG°(T)
- deux ΔH°
- deux ΔS°
= Intersection des droites.

? Une dismutation transforme :
+ un oxyde intermédiaire en un oxyde supérieur et un inférieur
- un métal en gaz
- un oxyde en métal seul
= Ex. 4MO → M + M₃O₄.

? Changement de pente sur une droite d'Ellingham :
+ changement d'état (fusion, ébullition)
- erreur de tracé
- changement de catalyseur
= ΔS° change.

? $\Delta_rG°_4 = \frac34\Delta_rG°_1 + \frac14\Delta_rG°_2$ découle de :
+ la loi de Hess
- la loi de Bragg
- la règle des phases
= Combinaison linéaire.

? ΔG° < 0 signifie que la réaction est :
+ favorisée dans le sens direct
- impossible
- à l'équilibre
= K > 1.

? Le carbone réduit beaucoup d'oxydes à haute T car sa droite C/CO :
+ descend quand T augmente
- monte très vite
- est horizontale
= 2C + O₂ → 2CO : un gaz se forme, ΔS° > 0.
```

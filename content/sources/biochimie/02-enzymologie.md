---
id: enzymologie
titre: Enzymologie
seance: Biochimie métabolique · Enzymes, cinétique, inhibitions
importance: 5
---

## Avant de commencer

Il faut savoir qu'une réaction est spontanée si ΔG < 0, mais peut être très lente.

```exercice Vérifie ton prérequis
? Une réaction avec ΔG < 0 est-elle forcément rapide ?
= Non : ΔG dit si elle est possible, pas à quelle vitesse. C'est l'énergie d'activation qui fixe la vitesse.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « l'enzyme change le chemin, pas l'arrivée ».** Elle abaisse l'énergie d'activation ; elle ne change ni ΔG ni la constante d'équilibre.

> [!piege] Écrire qu'une enzyme baisse ΔG. **Faux** : c'est la question 1 de l'examen 2020.

À la fin, tu sais interpréter Km et Vmax et reconnaître le type d'inhibition.

## Idée 1 · Propriétés

```grille Ce que fait et ne fait pas une enzyme
#cols: Une enzyme…, Oui ou non
*abaisse l'énergie d'activation, oui
*change ΔG de la réaction, non
*change la constante d'équilibre, non
*est retrouvée intacte à la fin, oui
*catalyse dans les deux sens (si la réaction est réversible), oui
*a une structure tertiaire à l'état natif, oui (quaternaire seulement si plusieurs sous-unités)
```

## Idée 2 · Michaelis-Menten

v = Vmax·[S] / (Km + [S]). Km est la concentration de substrat qui donne la moitié de Vmax : plus Km est petit, plus l'affinité est grande.

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Courbe hyperbolique de Michaelis : v tend vers Vmax, Km à Vmax/2" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v110h280"/><path d="M30 120C70 50 120 35 300 25" stroke="#D9824F"/><path d="M30 22h270M30 70h45v50" stroke-dasharray="4 4"/></g>
<g fill="currentColor" font-size="10"><text x="2" y="20">Vmax</text><text x="0" y="74">Vmax/2</text><text x="68" y="128">Km</text><text x="285" y="128">[S]</text></g>
</svg>
```

## Idée 3 · Les inhibitions

```grille Types d'inhibition
#cols: Type, Se fixe sur, Km, Vmax
*Compétitive, le site actif, augmente, inchangée
*Non compétitive, un autre site, inchangé, diminue
*Incompétitive, le complexe ES, diminue, diminue
```

## S'exercer

```exercice Examen 2020
? « Le froid conserve les aliments en réduisant l'énergie d'activation » ?
= Non : le froid ne change pas Ea ; il ralentit les réactions parce que moins de molécules ont l'énergie de franchir la barrière.

? « Un inhibiteur compétitif ne change pas la Vmax » ?
= Oui : un excès de substrat déplace l'inhibiteur.
```

## Flashcards

```cartes
Km :: [S] donnant Vmax/2 ; petit Km = forte affinité.
Enzyme et ΔG :: L'enzyme ne change pas ΔG ni Kéq.
Inhibition compétitive :: Km augmente, Vmax inchangée.
Inhibition non compétitive :: Km inchangé, Vmax diminue.
```

## QCM du chapitre

```qcm
? Une enzyme abaisse :
+ l'énergie d'activation
- ΔG
- la constante d'équilibre
= Catalyse.

? En fin de réaction l'enzyme est :
+ inchangée
- consommée
- dénaturée
= Catalyseur.

? Km faible signifie :
+ forte affinité
- faible affinité
- vitesse nulle
= Peu de substrat suffit.

? Inhibiteur compétitif : Vmax
+ inchangée
- diminue
- augmente
= Surmontable.

? Inhibiteur non compétitif : Km
+ inchangé
- augmente
- diminue
= Autre site.

? Le froid conserve les aliments car :
+ il ralentit les réactions
- il réduit l'énergie d'activation
- il change ΔG
= Moins de chocs efficaces.

? Une enzyme native a toujours une structure quaternaire :
- oui
+ non
= Seulement si plusieurs sous-unités.

? À [S] très grand, v tend vers :
+ Vmax
- 0
- Km
= Saturation.

? Une enzyme peut catalyser une réaction réversible :
+ dans les deux sens
- dans un seul sens
- jamais
= Elle ne change pas l'équilibre.

? Le site actif est :
+ la zone de fixation du substrat
- le gène de l'enzyme
- le produit
= Spécificité.
```

---
id: electrocinetique
titre: Électrocinétique · Kirchhoff, diviseurs, Thévenin et Norton
seance: Série 3 · Circuits en régime continu
importance: 5
---

## Avant de commencer

Il faut connaître la loi d'Ohm : $U = RI$.

```exercice Vérifie ton prérequis
? Une résistance de 10 Ω parcourue par 2 A. Tension à ses bornes ?
= $U = 10 \times 2 = 20$ V.
reponse: 20
```

## Comment aborder ce chapitre

> [!astuce] **Pense « nœuds et mailles ».** Ce qui entre dans un nœud en sort ; le tour d'une maille fait zéro volt. Avec ces deux lois, tout circuit se résout.

> [!piege] Les signes. Choisis un sens pour chaque courant et un sens de parcours pour chaque maille, et n'en change plus. Un courant négatif à la fin veut juste dire que le vrai sens est l'inverse.

À la fin, tu sais résoudre un circuit à trois branches et le remplacer par son modèle de Thévenin ou de Norton.

## Idée 1 · Les associations

```grille Résistances équivalentes
#cols: Montage, Formule
*Série, Req = R1 + R2
*Parallèle, 1/Req = 1/R1 + 1/R2 (soit R1R2/(R1+R2) pour deux)
```

## Idée 2 · Les lois de Kirchhoff

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Circuit à deux mailles avec trois branches entre les nœuds A et B" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="30" y="20" width="260" height="80"/><path d="M160 20v80"/>
<rect x="80" y="12" width="30" height="16" fill="#D9824F" fill-opacity=".3" stroke="#D9824F"/><rect x="152" y="45" width="16" height="30" fill="#D9824F" fill-opacity=".3" stroke="#D9824F"/><rect x="210" y="12" width="30" height="16" fill="#D9824F" fill-opacity=".3" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="11"><text x="85" y="45">R1</text><text x="172" y="64">R2</text><text x="215" y="45">R3</text><text x="155" y="14">A</text><text x="155" y="115">B</text><text x="20" y="64">E1</text><text x="294" y="64">E2</text></g>
</svg>
```

```etapes Résoudre un circuit à 3 branches
1. Loi des nœuds en A : $I_1 + I_3 = I_2$ (selon tes sens choisis).
2. Loi des mailles à gauche : $E_1 - R_1I_1 - R_2I_2 = 0$.
3. Loi des mailles à droite : $E_2 - R_3I_3 - R_2I_2 = 0$.
4. Résous le système de 3 équations, puis $U_{AB} = R_2I_2$.
```

**Exemple** (montage du schéma, $E_1 = 20$ V, $E_2 = 70$ V, $R_1 = 2$ Ω, $R_2 = 5$ Ω, $R_3 = 10$ Ω) : on trouve $I_2 = 4{,}25$ A, $I_3 = 4{,}875$ A, $I_1 = -0{,}625$ A (le vrai courant dans $R_1$ circule dans l'autre sens) et $U_{AB} = 21{,}25$ V.

> [!attention] Les valeurs viennent de l'exercice III de la série 3, mais la figure du TD n'est pas dans le fichier : le montage ci-dessus est une hypothèse. Si ton circuit est différent, garde la méthode.

## Idée 3 · Diviseurs, Thévenin et Norton

```grille Formules à connaître
#cols: Outil, Formule
*Diviseur de tension, U1 = E·R1/(R1 + R2)
*Diviseur de courant, I1 = I·R2/(R1 + R2)
*Thévenin (MET), E_th = tension à vide ; R_th = résistance vue des bornes, sources éteintes
*Norton (MEN), I_N = courant de court-circuit = E_th/R_th ; R_N = R_th
```

## S'exercer

```exercice Série 3
? Résous proprement : $I_2 = I_1 + I_3$, $20 = 2I_1 + 5I_2$, $70 = 10I_3 + 5I_2$. Que vaut $U_{AB} = 5I_2$ ?
= De la 2e : $I_1 = (20 - 5I_2)/2$ ; de la 3e : $I_3 = (70 - 5I_2)/10$. Nœud : $I_2 = 10 - 2{,}5I_2 + 7 - 0{,}5I_2$, donc $4I_2 = 17$, $I_2 = 4{,}25$ A, $U_{AB} = 21{,}25$ V. Puis $I_1 = -0{,}625$ A et $I_3 = 4{,}875$ A. Contrôle de la maille de gauche : $2\times(-0{,}625) + 5\times4{,}25 = 20$ V.
reponse: 21.25

? MET d'un générateur (E, r) en parallèle avec une résistance R ?
= $E_{th} = E\frac{R}{R + r}$ (diviseur de tension) et $R_{th} = \frac{rR}{r + R}$ (E éteinte, r et R en parallèle).
```

## Flashcards

```cartes
Loi des nœuds :: Somme des courants entrants = somme des courants sortants.
Loi des mailles :: Somme algébrique des tensions sur une maille = 0.
Éteindre une source de tension :: La remplacer par un fil.
Lien Thévenin-Norton :: $I_N = E_{th}/R_{th}$, même résistance.
```

## QCM du chapitre

```qcm
? Deux résistances de 6 Ω en parallèle :
- 12 Ω
+ 3 Ω
- 6 Ω
= $36/12$.

? Un courant trouvé négatif signifie :
- une erreur
+ que le vrai sens est l'inverse
- un court-circuit
= Le sens choisi était arbitraire.

? Pour trouver $R_{th}$, on éteint les sources de tension en les remplaçant par :
+ un fil
- un interrupteur ouvert
- une résistance infinie
= Les sources de courant, elles, deviennent des circuits ouverts.

? Diviseur de tension : $U_1 =$
+ $E\frac{R_1}{R_1+R_2}$
- $E\frac{R_2}{R_1+R_2}$
- $E\frac{R_1}{R_2}$
= Proportionnelle à sa résistance.

? Diviseur de courant : $I_1 =$
- $I\frac{R_1}{R_1+R_2}$
+ $I\frac{R_2}{R_1+R_2}$
- $I$
= Le courant préfère la petite résistance.

? $E_{th}$ est :
+ la tension à vide entre les bornes
- le courant de court-circuit
- toujours égale à E
= Bornes ouvertes.

? $I_N$ est :
- la tension à vide
+ le courant de court-circuit
- nul
= Bornes reliées par un fil.

? Le nombre d'équations nécessaires pour 3 courants inconnus :
- 2
+ 3
- 4
= Une équation par inconnue.

? Deux résistances de 4 Ω en série :
+ 8 Ω
- 2 Ω
- 16 Ω
= On additionne.

? La loi des mailles traduit :
+ la conservation de l'énergie (le potentiel revient à sa valeur)
- la conservation de la charge
- la loi d'Ohm
= La loi des nœuds traduit la conservation de la charge.
```

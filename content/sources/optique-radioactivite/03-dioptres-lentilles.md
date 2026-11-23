---
id: dioptres-lentilles
titre: Dioptres et lentilles
seance: Chapitres IV et V · Série 2, exercices 2 et 3
importance: 5
---

## Avant de commencer

Il faut savoir additionner des inverses : $\frac1a - \frac1b$.

```exercice Vérifie ton prérequis
? Calcule $\frac{1}{30} - \frac{1}{90}$ puis prends l'inverse.
= $\frac{3 - 1}{90} = \frac{2}{90}$, inverse : 45.
reponse: 45
```

## Comment aborder ce chapitre

> [!astuce] **Pense vergence.** La vergence $V = \frac{1}{f'}$ (en dioptries, f' en mètres) s'additionne pour des lentilles accolées. C'est l'outil le plus rapide.

> [!piege] Oublier le signe moins dans la conjugaison des lentilles : $\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'}$, avec $\overline{OA} < 0$ pour un objet réel.

À la fin, tu sais trouver l'image par une lentille et la vergence d'une lentille épaisse.

## Idée 1 · Le dioptre sphérique

```grille Formules du dioptre (origine au sommet S)
#cols: Grandeur, Formule
*Conjugaison, n₂/SA' − n₁/SA = (n₂ − n₁)/SC
*Vergence, V = (n₂ − n₁)/SC
*Foyer image, SF' = n₂·SC/(n₂ − n₁)
*Foyer objet, SF = −n₁·SC/(n₂ − n₁)
```

## Idée 2 · La lentille mince

```html
<svg viewBox="0 0 320 130" role="img" aria-label="Lentille convergente : rayon parallèle passant par F', rayon passant par O non dévié" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10 65h300"/><path d="M160 10v110" stroke="#D9824F" stroke-width="3"/><path d="M155 15l5-5 5 5M155 115l5 5 5-5" stroke="#D9824F"/>
<path d="M50 35h110l100 60"/><path d="M50 35L270 101" stroke-dasharray="4 4"/></g>
<g fill="currentColor" font-size="11"><circle cx="210" cy="65" r="3"/><circle cx="110" cy="65" r="3"/><text x="205" y="82">F'</text><text x="105" y="82">F</text><text x="164" y="80">O</text><text x="40" y="30">B</text></g>
</svg>
```

```etapes Image par une lentille mince
1. Conjugaison : $\frac{1}{\overline{OA'}} = \frac{1}{f'} + \frac{1}{\overline{OA}}$.
2. Grandissement : $\gamma = \frac{\overline{OA'}}{\overline{OA}}$.
3. Vérifie par la construction : le rayon par O n'est pas dévié, le rayon parallèle passe par F'.
```

**Exemple (série 2, ex. 3).** Objet à 90 cm devant une lentille de f' = 30 cm : $\frac{1}{\overline{OA'}} = \frac{1}{30} - \frac{1}{90}$, donc $\overline{OA'} = 45$ cm ; γ = 45/(−90) = −0,5 : image réelle, renversée, deux fois plus petite.

## Idée 3 · Lentille épaisse : formule de Gullstrand

$$V = V_1 + V_2 - \frac{e}{n}V_1V_2$$

avec e l'épaisseur et n l'indice entre les deux dioptres. Pour deux lentilles minces dans l'air distantes de e : $V = V_1 + V_2 - eV_1V_2$.

## S'exercer

```exercice Série 2
? Ex. 2 : boule de verre (n = 1,5, rayon R). Où converge un faisceau parallèle ?
= Premier dioptre : $\frac{1{,}5}{\overline{S_1A_1}} = \frac{0{,}5}{R}$ donne $\overline{S_1A_1} = 3R$, soit R après S₂. Second dioptre : $\frac{1}{\overline{S_2A'}} - \frac{1{,}5}{R} = \frac{-0{,}5}{-R}$ donne $\overline{S_2A'} = \frac{R}{2}$. A' est le **foyer image** de la boule, à R/2 après S₂. Par symétrie, F est à R/2 avant S₁.

? Vergence d'une lentille mince de f' = 25 cm ?
= V = 1/0,25 = 4 δ.
reponse: 4
```

## Flashcards

```cartes
Conjugaison lentille mince :: $\frac{1}{\overline{OA'}} - \frac{1}{\overline{OA}} = \frac{1}{f'}$.
Grandissement lentille :: $\gamma = \overline{OA'}/\overline{OA}$.
Vergence :: $V = 1/f'$, en dioptries (f' en m).
Gullstrand :: $V = V_1 + V_2 - \frac{e}{n}V_1V_2$.
```

## QCM du chapitre

```qcm
? Une lentille divergente a :
- f' > 0
+ f' < 0
- V > 0
= Vergence négative.

? Le rayon passant par le centre optique O :
+ n'est pas dévié
- passe par F'
- ressort parallèle
= Propriété du centre optique.

? Objet au foyer objet F d'une lentille convergente : image
+ à l'infini
- en F'
- en O
= Rayons parallèles en sortie.

? Deux lentilles minces accolées de 2 δ et 3 δ :
+ 5 δ
- 6 δ
- 1,2 δ
= Les vergences s'ajoutent.

? Vergence du dioptre air → verre ($n = 1{,}5$), $\overline{SC} = 10$ cm :
+ 5 δ
- 15 δ
- 0,05 δ
= 0,5 / 0,1 m.

? Objet à 90 cm, f' = 30 cm : l'image est à
- 30 cm
+ 45 cm
- 60 cm
= Exemple du chapitre.

? γ = −0,5 signifie une image :
+ renversée, deux fois plus petite
- droite, deux fois plus grande
- virtuelle
= |γ| < 1.

? Une lentille biconcave en verre dans l'air est :
- convergente
+ divergente
- sans effet
= Bords épais.

? Le foyer image d'une boule de verre (n = 1,5) est à
+ R/2 après la boule
- au centre
- R avant la boule
= Exercice 2.

? 1 dioptrie équivaut à :
+ 1 m⁻¹
- 1 m
- 1 cm⁻¹
= V = 1/f'.
```

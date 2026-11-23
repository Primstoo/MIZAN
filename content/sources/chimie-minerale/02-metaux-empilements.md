---
id: metaux-empilements
titre: Métaux · empilements compacts et sites
seance: Chapitre 1 · Structures métalliques (CFC, HC, CC)
importance: 5
---

## Avant de commencer

Il faut connaître le volume d'une sphère : $\frac43\pi r^3$.

```exercice Vérifie ton prérequis
? Volume (en Å³) d'un atome de rayon 1 Å, à 0,1 près ?
= $\frac43\pi \approx 4{,}2$ Å³.
reponse: 4.2
```

## Comment aborder ce chapitre

> [!astuce] **Pense « où les sphères se touchent ».** Toute relation entre a et r vient de la direction où les atomes sont tangents : la diagonale d'une face en CFC, la grande diagonale en CC, l'arête en HC.

> [!piege] Écrire a = 2r en CFC. Les atomes ne se touchent pas le long de l'arête, mais le long de la diagonale d'une face : $a\sqrt2 = 4r$.

À la fin, tu sais calculer coordinence, compacité, masse volumique et taille des sites.

## Idée 1 · Les trois structures

```grille Comparaison
#cols: Structure, Contact, Z, Coordinence, Compacité
*CFC, a√2 = 4r, 4, 12, 0,74
*HC, a = 2r et c/a = √(8/3) ≈ 1,633, 2 (6 pour la maille triple), 12, 0,74
*CC, a√3 = 4r, 2, 8, 0,68
```

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Empilements ABAB pour HC et ABCABC pour CFC" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><g stroke="#D9824F"><circle cx="40" cy="95" r="12"/><circle cx="64" cy="95" r="12"/><circle cx="52" cy="73" r="12" stroke="currentColor"/><circle cx="40" cy="51" r="12"/><circle cx="64" cy="51" r="12"/></g>
<g><circle cx="200" cy="95" r="12" stroke="#D9824F"/><circle cx="224" cy="95" r="12" stroke="#D9824F"/><circle cx="212" cy="73" r="12"/><circle cx="224" cy="51" r="12" stroke-dasharray="3 3"/></g></g>
<g fill="currentColor" font-size="11"><text x="90" y="75">HC : A B A B</text><text x="245" y="75">CFC : A B C</text></g>
</svg>
```

## Idée 2 · Masse volumique et compacité

$$\rho = \frac{Z\,M}{N_A\,V_{\text{maille}}} \qquad C = \frac{Z\cdot\frac43\pi r^3}{V_{\text{maille}}}$$

```etapes Calcul type (cobalt HC, examen corrigé)
1. Tangence selon l'arête : a = 2r = 2,5 Å.
2. c = a√(8/3) = 4,08 Å.
3. Maille triple (prisme hexagonal) : V = 3a²c·sin 120°, Z = 6.
4. ρ = 6 × 58,93 / (6,02·10²³ × V) ≈ 8,86 g/cm³, la même que la variété CFC : même compacité.
```

## Idée 3 · Les sites interstitiels

```grille Sites du CFC
#cols: Site, Nombre par maille, Position, Rayon max du site
*Octaédrique [6], 4, centre + milieux des arêtes, 0,414 r
*Tétraédrique [4], 8, centres des 8 petits cubes, 0,225 r
```

## S'exercer

```exercice Application
? Cuivre CFC, r = 1,28 Å. Paramètre a ?
= $a = 4r/\sqrt2 = 2\sqrt2\,r \approx 3{,}62$ Å.
reponse: 3.62

? Compacité du CC ?
= Z = 2, $a\sqrt3 = 4r$ : $C = \frac{2\cdot\frac43\pi r^3}{(4r/\sqrt3)^3} = \frac{\pi\sqrt3}{8} \approx 0{,}68$.
reponse: 0.68
```

## Flashcards

```cartes
Contact en CFC :: Diagonale d'une face : $a\sqrt2 = 4r$.
Contact en CC :: Grande diagonale : $a\sqrt3 = 4r$.
Compacité CFC et HC :: 0,74 (empilements compacts).
Sites du CFC :: 4 octaédriques, 8 tétraédriques.
```

## QCM du chapitre

```qcm
? Coordinence dans un empilement compact :
- 8
+ 12
- 6
= CFC et HC.

? Compacité du CC :
+ 0,68
- 0,74
- 0,52
= Moins compact.

? Le CFC correspond à l'empilement :
- ABAB
+ ABCABC
- AAAA
= HC = ABAB.

? En CFC, Z vaut :
+ 4
- 2
- 6
= 8 × 1/8 + 6 × 1/2.

? Rapport c/a idéal en HC :
+ 1,633
- 1,414
- 2
= √(8/3).

? Nombre de sites octaédriques par maille CFC :
+ 4
- 8
- 12
= Autant que d'atomes.

? Nombre de sites tétraédriques par maille CFC :
- 4
+ 8
- 6
= Deux fois plus que d'atomes.

? En CFC, a vaut :
+ $2\sqrt2\,r$
- $2r$
- $4r/\sqrt3$
= Contact sur la diagonale de face.

? Le cobalt HC et le cobalt CFC ont :
+ la même masse volumique
- des masses volumiques très différentes
- des coordinences différentes
= Même compacité 0,74.

? La coordinence en CC vaut :
+ 8
- 12
- 4
= 8 voisins aux sommets.
```

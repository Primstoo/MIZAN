---
id: diagrammes-de-phases
titre: Diagrammes de phases binaires
seance: Chapitre 2 · Diagrammes de phases
importance: 4
---

## Avant de commencer

Il faut savoir lire une composition en fraction massique ou molaire : $x_B = \frac{n_B}{n_A + n_B}$.

```exercice Vérifie ton prérequis
? 3 mol de A et 1 mol de B : fraction molaire de B ?
= 1/4 = 0,25.
reponse: 0.25
```

## Comment aborder ce chapitre

> [!astuce] **Pense « verticale et horizontale ».** Un refroidissement se lit sur une verticale (composition fixe). Dans un domaine à deux phases, une horizontale (isotherme) donne la composition de chaque phase.

> [!piege] Lire la proportion des phases à l'envers. Avec la règle des moments (des leviers), la quantité d'une phase est proportionnelle au segment **opposé**.

À la fin, tu sais lire un diagramme à eutectique et tracer une courbe de refroidissement.

## Idée 1 · La règle des phases

Variance $v = c + 2 - \varphi$ ; à pression fixée, $v = c + 1 - \varphi$. Pour un binaire (c = 2) à P fixée : un point eutectique (3 phases) a v = 0, d'où le palier de température.

## Idée 2 · Le diagramme à eutectique

```html
<svg viewBox="0 0 320 150" role="img" aria-label="Diagramme binaire à eutectique : liquidus en V, palier eutectique horizontal" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v120h260V10"/><path d="M30 30Q120 60 170 100Q220 60 290 20" stroke="#D9824F"/><path d="M30 100h260"/><path d="M110 15v115" stroke-dasharray="4 4"/></g>
<g fill="currentColor" font-size="10"><text x="120" y="45">liquide</text><text x="40" y="90">L + A</text><text x="230" y="90">L + B</text><text x="140" y="118">A + B solides</text><text x="160" y="96">E</text><text x="24" y="145">A</text><text x="286" y="145">B</text></g>
</svg>
```

```grille Les lignes
#cols: Ligne, Sens
*Liquidus, au-dessus : tout est liquide
*Solidus (palier eutectique), en dessous : tout est solide
*Point eutectique E, liquide → solide A + solide B à température constante
```

## Idée 3 · Règle des moments

Sur l'isotherme, pour un mélange de composition $x_0$ entre une phase de composition $x_1$ et une autre $x_2$ :

$$\frac{m_1}{m_2} = \frac{x_2 - x_0}{x_0 - x_1}$$

```etapes Lire un refroidissement
1. Pars du liquide sur la verticale de ta composition.
2. Au liquidus : premier cristal (rupture de pente sur la courbe de refroidissement).
3. Entre liquidus et palier : cristallisation d'un solide pur, le liquide s'enrichit vers E.
4. Au palier eutectique : le liquide restant cristallise en A + B à T constante (palier horizontal).
```

## S'exercer

```exercice Application
? Variance au point eutectique d'un binaire à P fixée ?
= $v = 2 + 1 - 3 = 0$ : la température est imposée, d'où le palier.
reponse: 0

? Mélange $x_0 = 0{,}3$ entre un solide pur A ($x_1 = 0$) et un liquide $x_2 = 0{,}5$. Fraction de solide ?
= $\frac{m_{solide}}{m_{total}} = \frac{0{,}5 - 0{,}3}{0{,}5 - 0} = 0{,}4$.
reponse: 0.4
```

## Flashcards

```cartes
Liquidus :: Courbe au-dessus de laquelle tout est liquide.
Eutectique :: Liquide qui cristallise en deux solides à T constante.
Variance (binaire, P fixée) :: $v = 3 - \varphi$.
Règle des moments :: Chaque phase est proportionnelle au segment opposé.
```

## QCM du chapitre

```qcm
? Au point eutectique, la variance vaut :
+ 0
- 1
- 2
= Trois phases.

? Sous le palier eutectique, on a :
+ deux solides
- un liquide
- un gaz
= Tout est solide.

? Sur une courbe de refroidissement, l'eutectique donne :
+ un palier horizontal
- une rupture de pente
- une droite verticale
= T constante.

? Le liquidus marque :
+ l'apparition du premier cristal
- la fin de la solidification
- l'ébullition
= En refroidissant.

? La règle des moments donne :
+ les proportions des phases
- la température de fusion
- la variance
= Bras de levier.

? Au-dessus du liquidus :
+ une seule phase liquide
- deux phases
- trois phases
= Domaine liquide.

? Un mélange de composition eutectique :
+ fond à température constante, comme un corps pur
- ne fond jamais
- fond sur un intervalle
= Palier unique.

? Pour un binaire à P fixée, la variance maximale est :
+ 2
- 3
- 1
= Une seule phase.

? Pendant la cristallisation de A, le liquide :
+ s'enrichit en B
- s'enrichit en A
- garde sa composition
= A le quitte.

? Une isotherme dans un domaine biphasé relie :
+ les compositions des deux phases
- deux températures
- deux pressions
= Conode.
```

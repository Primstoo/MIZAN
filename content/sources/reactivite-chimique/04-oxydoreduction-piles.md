---
id: oxydoreduction-piles
titre: Oxydoréduction et piles
seance: Chapitre I-4 · Réactions d'oxydoréduction
importance: 5
---

## Avant de commencer

Il faut savoir qu'un oxydant capte des électrons et un réducteur en cède.

```exercice Vérifie ton prérequis
? Dans $Ag^+ + e^- \to Ag$, qui est l'oxydant ?
= Ag⁺ : il capte un électron (il est réduit).
```

## Comment aborder ce chapitre

> [!astuce] **Pense « le plus grand E est la cathode ».** L'électrode de plus haut potentiel est le pôle + où a lieu la réduction ; l'autre est l'anode où a lieu l'oxydation.

> [!piege] Oublier de diviser 0,06 par n dans la loi de Nernst. Pour Cd²⁺/Cd, n = 2 : le facteur est 0,03.

À la fin, tu sais équilibrer une réaction, calculer des potentiels, une fem et une constante d'équilibre.

## Idée 1 · Équilibrer en milieu acide

```etapes Méthode des demi-équations
1. Équilibre l'élément qui change d'oxydation.
2. Équilibre O avec H₂O, puis H avec H⁺.
3. Équilibre les charges avec des électrons.
4. Multiplie pour avoir autant d'électrons dans les deux demi-équations, puis additionne.
```

**Exemple (révision, ex. 11a).** $MnO_4^- + 8H^+ + 5e^- \to Mn^{2+} + 4H_2O$ et $2Cl^- \to Cl_2 + 2e^-$. Bilan : $2MnO_4^- + 16H^+ + 10Cl^- \to 2Mn^{2+} + 5Cl_2 + 8H_2O$.

## Idée 2 · La loi de Nernst

$$E = E° + \frac{0{,}06}{n}\log\frac{[Ox]}{[Red]}$$

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Pile : anode à gauche, cathode à droite, électrons dans le fil de l'anode vers la cathode, pont salin" style="max-width:380px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M30 50h70v60H30zM220 50h70v60h-70z"/><path d="M60 50V20h200v30"/><path d="M90 60q70-40 140 0" stroke="#D9824F"/><path d="M150 14l10 6-10 6"/></g>
<g fill="currentColor" font-size="10"><text x="30" y="125">anode (−) oxydation</text><text x="200" y="125">cathode (+) réduction</text><text x="120" y="12">électrons →</text><text x="130" y="48">pont salin</text></g>
</svg>
```

## Idée 3 · Fem et constante d'équilibre

fem = E(cathode) − E(anode). Constante : $\log K = \frac{n\,(E°_{cathode} - E°_{anode})}{0{,}06}$. À l'équilibre (pile usée), les deux potentiels sont égaux.

## S'exercer

```exercice Révision, exercice 12 : Cu/Cu²⁺ (0,1 M) // Fe²⁺ (0,1 M)/Fe
? Potentiels des électrodes ?
= E(Cu) = 0,34 + 0,03 log 0,1 = **0,31 V** ; E(Fe) = −0,44 + 0,03 log 0,1 = **−0,47 V**.
reponse: 0.31

? Anode, cathode, fem ?
= Cathode : cuivre ($Cu^{2+} + 2e^- \to Cu$). Anode : fer ($Fe \to Fe^{2+} + 2e^-$). fem = 0,31 − (−0,47) = **0,78 V**. Attention : la pile est écrite à l'envers dans le sujet, le fer est bien l'anode.
reponse: 0.78

? Constante de $Cu^{2+} + Fe \to Cu + Fe^{2+}$ ?
= log K = 2 × 0,78 / 0,06 = 26, **K = 10²⁶** : réaction totale.
reponse: 26
```

> [!attention] Révision, exercice 13 : le sujet annonce Fe cathode d'une pile Ni/Fe avec une fem de 0,21 V. Avec les vraies valeurs (E°(Ni²⁺/Ni) = −0,25 V, E°(Fe²⁺/Fe) = −0,44 V), c'est le nickel qui serait la cathode. Les données conduisent à E°(Ni²⁺/Ni) ≈ −0,63 V, valeur fictive : signale-le sur ta copie.

## Flashcards

```cartes
Nernst :: $E = E° + \frac{0{,}06}{n}\log\frac{[Ox]}{[Red]}$.
Cathode :: Pôle + , réduction, plus grand potentiel.
fem :: E(cathode) − E(anode).
Constante d'une pile :: $\log K = n\Delta E°/0{,}06$.
```

## QCM du chapitre

```qcm
? À la cathode a lieu :
+ la réduction
- l'oxydation
- rien
= Gain d'électrons.

? Les électrons circulent dans le fil :
+ de l'anode vers la cathode
- de la cathode vers l'anode
- dans le pont salin
= Les ions circulent dans le pont.

? Pour Cd²⁺/Cd, le facteur de Nernst est :
+ 0,03
- 0,06
- 0,12
= 0,06/2.

? Quand la pile est usée :
+ fem = 0
- fem maximale
- K = 0
= Équilibre atteint.

? Dans MnO₄⁻ → Mn²⁺, le nombre d'électrons est :
+ 5
- 2
- 7
= Mn passe de +7 à +2.

? K = 10²⁶ signifie une réaction :
+ totale
- impossible
- équilibrée à 50 %
= K très grand.

? fem de Cd/Ag (0,20 M chacun) :
+ 1,18 V
- 1,20 V
- 0,40 V
= Devoir 2.

? Rôle du pont salin :
+ fermer le circuit et garder la neutralité
- fournir des électrons
- stocker l'énergie
= Migration d'ions.

? Un réducteur :
+ cède des électrons
- capte des électrons
- capte des protons
= Il s'oxyde.

? Augmenter [Ag⁺] fait :
+ monter E(Ag⁺/Ag)
- baisser E(Ag⁺/Ag)
- rien
= Log croissant.
```

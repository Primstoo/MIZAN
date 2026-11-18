---
id: premier-principe-travail
titre: Premier principe, travail et statique des fluides
seance: Chapitre 2 (1re partie) · Premier principe de la thermodynamique
importance: 5
---

## Avant de commencer

Il faut savoir intégrer $\int \frac{dV}{V} = \ln V$ et lire une aire sous une courbe.

```exercice Vérifie ton prérequis
? Calcule $\int_{V_1}^{V_2}\frac{dV}{V}$ pour $V_2 = 2V_1$.
reponse: 0.693 ~0.01
= $\ln(V_2/V_1) = \ln 2 \approx 0{,}693$.
```

## Comment aborder ce chapitre

> [!astuce] Le premier principe est un **bilan de compte en banque** : ce qui entre (W et Q reçus) fait varier le solde (U).

> [!piege] Prendre la pression du gaz au lieu de la **pression extérieure** dans $\delta W = -P_{ext}dV$. On ne remplace $P_{ext}$ par $P$ que si la transformation est quasi-statique.

À la fin, tu sais écrire $\Delta U = W + Q$, calculer un travail de pression et utiliser $dP/dz = -\rho g$.

## Idée 1 · Conservation de l'énergie

$$E = E_c + E_p + U \qquad\text{et, si } dE_c = dE_p = 0 :\quad dU = \delta W + \delta Q$$

- Entre deux états d'équilibre : $\Delta U = W + Q$.
- Sur un **cycle** : $\Delta U = 0$, donc $W + Q = 0$.
- $U$ (énergie interne) regroupe l'énergie cinétique microscopique et l'énergie potentielle d'interaction des particules.

Exemple : un gaz reçoit 500 J de chaleur et fournit 200 J de travail. $\Delta U = -200 + 500 = 300$ J.

> [!prof] Le premier principe est aussi appelé **principe d'équivalence** : il y a équivalence entre chaleur et travail.

## Idée 2 · Le travail des forces de pression

```html
<svg viewBox="0 0 400 220" style="width:100%;max-width:480px;display:block;margin:10px auto" role="img" aria-label="Diagramme de Clapeyron : le travail est l'aire sous la courbe P de V entre V1 et V2">
<line x1="50" y1="190" x2="380" y2="190" stroke="currentColor" stroke-width="2"/><line x1="50" y1="190" x2="50" y2="15" stroke="currentColor" stroke-width="2"/>
<path d="M100 50 Q170 130 320 150 L320 190 L100 190 Z" fill="#D9824F" opacity="0.35"/>
<path d="M100 50 Q170 130 320 150" fill="none" stroke="#D9824F" stroke-width="3"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><text x="370" y="208">V</text><text x="30" y="20">P</text><text x="92" y="208">V₁</text><text x="312" y="208">V₂</text><text x="170" y="175">|W| = aire</text></g>
</svg>
```

Travail élémentaire : $\delta W = -P_{ext}\,dV$. En quasi-statique, $P_{ext} = P$ :

$$W = -\int_{V_1}^{V_2} P\,dV$$

- Compression ($V_2 < V_1$) : W > 0, le gaz **reçoit** du travail.
- Détente ($V_2 > V_1$) : W < 0.
- Isochore : W = 0.
- Cycle : |W| = aire du cycle ; W > 0 si le cycle est parcouru dans le sens trigonométrique, W < 0 dans le sens horaire (cycle moteur).

```etapes Calculer W pour une détente isotherme réversible
Écrire P :: $P = nRT/V$ (gaz parfait, T constante).
Intégrer :: $W = -nRT\int_{V_1}^{V_2}\frac{dV}{V} = -nRT\ln\frac{V_2}{V_1}$.
Passer aux pressions :: $P_1V_1 = P_2V_2$ donne $W = nRT\ln\frac{P_2}{P_1}$.
Application :: 1 mol à 300 K, $P_1 = 10$ atm, $P_2 = 3$ atm : $W = 8{,}314\times300\times\ln 0{,}3 \approx -3003$ J.
```

Généralisation : $\delta W = \sum_i Y_i\,dX_i$ (variable intensive × variation d'une extensive) : fil $F\,dl$, surface $A\,d\Sigma$, pile $E\,dq$.

## Idée 3 · Pression dans un fluide en équilibre

L'équilibre d'un petit volume $dx\,dy\,dz$ donne $\partial P/\partial x = \partial P/\partial y = 0$ et

$$\frac{dP}{dz} = -\rho g$$

(axe Oz vers le haut). Les plans horizontaux sont **isobares**.

```grille Deux cas
#cols: Fluide | ρ | Résultat
#rows: Incompressible (liquide) | Compressible (gaz isotherme)
constante | *$P_2 - P_1 = -\rho g(z_2 - z_1)$
dépend de P | *$P(z) = P_0\,e^{-(z-z_0)/H}$, $H = RT/(Mg)$
```

Exemples du prof : 1 m d'eau ($\rho = 10^3$ kg/m³, g = 10) donne $|\Delta P| = 10^4$ Pa = 0,1 bar ; 1 m d'air ($\rho = 1{,}3$) seulement 13 Pa.

Atmosphère : troposphère (0–10,5 km, T baisse d'environ 6 °C/km), stratosphère (10,5–50 km, modèle isotherme T = 217 K), ionosphère (au-delà, pas de modèle simple).

## S'exercer

```exercice Travail et pression
? Un plongeur descend de 20 m dans l'eau. De combien la pression augmente-t-elle ($\rho = 10^3$, g = 10) ?
reponse: 200000 ~1000
= $\Delta P = \rho g h = 10^3\times10\times20 = 2\times10^5$ Pa = 2 bar.

? Un gaz décrit un cycle et reçoit Q = −150 J. Que vaut W ?
reponse: 150
= Sur un cycle, $W + Q = 0$, donc W = +150 J.

? Calcule l'échelle de hauteur $H = RT/(Mg)$ pour l'air (M = 0,029 kg/mol) à T = 217 K, g = 9,81.
= $H = 8{,}314\times217/(0{,}029\times9{,}81) \approx 6{,}34\times10^3$ m, soit environ 6,3 km.
```

## Flashcards

```cartes
Premier principe (système fermé, au repos) :: $dU = \delta W + \delta Q$, et $\Delta U = W + Q$.
Premier principe sur un cycle :: $W + Q = 0$.
Travail élémentaire de pression :: $\delta W = -P_{ext}\,dV$.
Travail quasi-statique :: $W = -\int P\,dV$ (P du gaz = $P_{ext}$).
Travail isotherme réversible (gaz parfait) :: $W = -nRT\ln(V_2/V_1) = nRT\ln(P_2/P_1)$.
Signe du travail d'un cycle moteur :: W < 0, cycle parcouru dans le sens horaire.
Statique des fluides :: $dP/dz = -\rho g$ (Oz vers le haut).
Atmosphère isotherme :: $P(z) = P_0 e^{-Mg(z-z_0)/(RT)}$.
```

## QCM du chapitre

```qcm
? Un gaz reçoit 400 J de chaleur et fournit 100 J de travail. $\Delta U$ vaut :
- 500 J
+ 300 J
- −300 J
= $\Delta U = W + Q = -100 + 400$.

? Sur un cycle :
- $W = 0$ et $Q = 0$
+ $W + Q = 0$
- $W = Q$
= $\Delta U = 0$ car U est une fonction d'état.

? Le travail élémentaire des forces de pression s'écrit :
+ $\delta W = -P_{ext}\,dV$
- $\delta W = P\,dV$
- $\delta W = V\,dP$
= Signe moins : une compression (dV < 0) donne un travail reçu positif.

? Lors d'une compression, le travail reçu par le gaz est :
+ positif
- négatif
- nul
= dV < 0 donc $-P\,dV > 0$.

? Pour une transformation isochore :
- W = Q
+ W = 0
- Q = 0
= dV = 0.

? Un cycle parcouru dans le sens horaire dans (P, V) :
- reçoit du travail
+ fournit du travail (W < 0)
- n'échange pas de travail
= C'est un cycle moteur.

? Dans un fluide au repos (Oz vers le haut) :
- $dP/dz = \rho g$
+ $dP/dz = -\rho g$
- $dP/dz = 0$
= La pression diminue quand on monte.

? 10 m d'eau correspondent à environ :
- 0,1 bar
+ 1 bar
- 10 bar
= $10^3\times10\times10 = 10^5$ Pa.

? Le travail isotherme réversible d'un gaz parfait vaut :
- $nR(T_2 - T_1)$
+ $-nRT\ln(V_2/V_1)$
- $-P(V_2 - V_1)$
= On intègre $-nRT\,dV/V$.

? Le modèle de la stratosphère retenu par le prof est :
- adiabatique
+ isotherme (T ≈ 217 K)
- incompressible
= Pas de courants verticaux, T presque constante.
```

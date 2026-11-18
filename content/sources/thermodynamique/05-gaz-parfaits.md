---
id: gaz-parfaits
titre: Propriétés énergétiques des gaz parfaits
seance: Chapitre 3 · Propriétés énergétiques des gaz parfaits
importance: 5
---

## Avant de commencer

Il faut connaître $\Delta U = W + Q$, $W = -\int P\,dV$ et $H = U + PV$.

```exercice Vérifie ton prérequis
? Pour un gaz parfait, que vaut $PV$ en fonction de n et T ?
= $PV = nRT$, avec R = 8,314 J·K⁻¹·mol⁻¹ (le TD prend parfois 8,32).
```

## Comment aborder ce chapitre

> [!astuce] Pour un gaz parfait, **U et H ne dépendent que de T**. Donc, quelle que soit la transformation : $\Delta U = nC_{V,m}\Delta T$ et $\Delta H = nC_{P,m}\Delta T$. Il reste ensuite à trouver W ou Q.

> [!piege] Utiliser $PV^\gamma = $ cte pour une transformation adiabatique **brusque** (irréversible). Laplace ne vaut que pour l'adiabatique **quasi-statique** (réversible).

À la fin, tu sais traiter les quatre transformations classiques d'un gaz parfait et utiliser Mayer, Laplace et Reech.

## Idée 1 · Les lois de Joule

```grille Les deux expériences
#cols: Expérience | Résultat mesuré | Conclusion
#rows: Joule–Gay-Lussac | Joule–Thomson
détente dans le vide, enceinte isolée : W = 0, Q = 0 | ΔT = 0 | *U = U(T) : 1re loi de Joule
détente à travers une paroi poreuse, P₁ > P₂ | ΔT = 0 | *H = H(T) : 2e loi de Joule
```

- 1re détente : iso-énergétique ($\Delta U = 0$). 2e détente : isenthalpique ($\Delta H = 0$).
- Conséquences : $\ell = P$, $h = -V$, $dU = mc_v\,dT$, $dH = mc_p\,dT$.
- Gaz réel : léger refroidissement observé.

## Idée 2 · La relation de Mayer

$$H = U + nRT \;\Rightarrow\; C_P - C_V = nR \qquad C_{P,m} - C_{V,m} = R$$

Avec $\gamma$ : $C_{V,m} = \frac{R}{\gamma - 1}$, $C_{P,m} = \frac{\gamma R}{\gamma - 1}$. Comme $C_P > C_V$, $\gamma > 1$.

Exemple : air ($\gamma = 1{,}4$) : $C_{V,m} = 8{,}314/0{,}4 \approx 20{,}8$ J·K⁻¹·mol⁻¹.

## Idée 3 · Compression isotherme quasi-statique

T constante, donc $\Delta U = 0$ et $Q = -W$.

$$W = nRT\ln\frac{V_1}{V_2} = nRT\ln\frac{P_2}{P_1}$$

Le rapport volumétrique $a = V_1/V_2$ : $a > 1$ compression (W > 0), $a < 1$ détente. En compression isotherme, le gaz **cède** au milieu extérieur une chaleur égale au travail reçu.

## Idée 4 · Adiabatique quasi-statique : la loi de Laplace

```etapes Démonstration du cours
Premier principe avec Q = 0 :: $nC_{V,m}\,dT = -P\,dV$.
Différentier PV = nRT :: $\frac{dP}{P} + \frac{dV}{V} = \frac{dT}{T}$.
Éliminer dT :: $\frac{dP}{P} + \left(1 + \frac{R}{C_{V,m}}\right)\frac{dV}{V} = 0$, soit $\frac{dP}{P} + \gamma\frac{dV}{V} = 0$.
Intégrer (γ constant) :: $PV^\gamma = $ cte.
Formes équivalentes :: $TV^{\gamma-1} = $ cte et $P^{1-\gamma}T^\gamma = $ cte.
```

Travail : $W = \Delta U = nC_{V,m}(T_2 - T_1) = \frac{P_2V_2 - P_1V_1}{\gamma - 1}$.

> [!prof] Exemple du cours : air comprimé adiabatiquement avec $a = 10$, $T_1 = 293$ K, $\gamma = 1{,}4$. $T_2 = T_1 a^{\gamma-1} = 293\times10^{0{,}4} \approx 735{,}983$ K. Le prof veut 3 chiffres après la virgule.

```html
<svg viewBox="0 0 400 220" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Dans le diagramme P V, l'adiabatique est plus pentue que l'isotherme passant par le même point">
<line x1="50" y1="195" x2="380" y2="195" stroke="currentColor" stroke-width="2"/><line x1="50" y1="195" x2="50" y2="10" stroke="currentColor" stroke-width="2"/>
<path d="M90 25 Q140 150 340 165" fill="none" stroke="#D9824F" stroke-width="3"/>
<path d="M150 70 Q200 145 340 165" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
<circle cx="340" cy="165" r="5" fill="currentColor"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><text x="370" y="212">V</text><text x="30" y="18">P</text><text x="98" y="22" fill="#D9824F">adiabatique</text><text x="190" y="95">isotherme</text></g>
</svg>
```

## Idée 5 · Relation de Reech

Pente de l'isotherme : $-P/V$. Pente de l'adiabatique : $-\gamma P/V$. L'adiabatique est $\gamma$ fois plus raide : à même rapport volumétrique, une compression adiabatique élève davantage la pression (et la température).

$$\frac{\chi_T}{\chi_{Q=0}} = \gamma \quad\text{(relation de Reech)}$$

Application : vitesse du son $v = \sqrt{\frac{\gamma RT}{M}}$. Pour l'air à 293 K : $v = \sqrt{1{,}4\times8{,}314\times293/0{,}029} \approx 343$ m/s.

## S'exercer

```exercice Gaz parfaits
? Calcule $C_{P,m}$ d'un gaz parfait de $\gamma = 5/3$ (R = 8,314).
reponse: 20.8 ~0.1
= $C_{P,m} = \gamma R/(\gamma - 1) = (5/3)(8{,}314)/(2/3) = 2{,}5R \approx 20{,}8$ J·K⁻¹·mol⁻¹.

? Un moteur a un rapport volumétrique a = 9 ; air (γ = 1,4) aspiré à 300 K, compression adiabatique réversible. T en fin de compression ?
reponse: 722 ~2
= $T_2 = 300\times9^{0{,}4} \approx 722{,}4$ K.

? 2 mol de gaz parfait sont comprimées de façon isotherme réversible à 300 K de 1 bar à 5 bar. Calcule Q.
= $W = nRT\ln(P_2/P_1) = 2\times8{,}314\times300\times\ln5 \approx 8029$ J, et $Q = -W \approx -8029$ J : le gaz cède de la chaleur.
```

## Flashcards

```cartes
1re loi de Joule :: L'énergie interne d'un gaz parfait ne dépend que de T : $dU = nC_{V,m}dT$.
2e loi de Joule :: L'enthalpie d'un gaz parfait ne dépend que de T : $dH = nC_{P,m}dT$.
Relation de Mayer :: $C_{P,m} - C_{V,m} = R$.
$C_{V,m}$ en fonction de γ :: $R/(\gamma - 1)$.
Isotherme quasi-statique :: $\Delta U = 0$, $W = nRT\ln(P_2/P_1) = -Q$.
Loi de Laplace :: $PV^\gamma = $ cte, $TV^{\gamma-1} = $ cte, $P^{1-\gamma}T^\gamma = $ cte (adiabatique réversible).
Travail adiabatique :: $W = \frac{P_2V_2 - P_1V_1}{\gamma - 1} = nC_{V,m}(T_2 - T_1)$.
Relation de Reech :: $\chi_T/\chi_S = \gamma$ : l'adiabatique est γ fois plus pentue que l'isotherme.
```

## QCM du chapitre

```qcm
? La détente de Joule–Gay-Lussac est :
+ iso-énergétique ($\Delta U = 0$)
- isenthalpique
- isobare
= W = 0 et Q = 0.

? La détente de Joule–Thomson est :
- iso-énergétique
+ isenthalpique ($\Delta H = 0$)
- isochore
= Bilan avec les travaux de poussée $P_1V_1$ et $P_2V_2$.

? La relation de Mayer s'écrit :
+ $C_{P,m} - C_{V,m} = R$
- $C_{P,m} + C_{V,m} = R$
- $C_{P,m}/C_{V,m} = R$
= Elle vient de $H = U + nRT$.

? Pour une isotherme d'un gaz parfait :
- Q = 0
+ $\Delta U = 0$
- W = 0
= U ne dépend que de T.

? La loi de Laplace $PV^\gamma = $ cte vaut pour :
- toute transformation adiabatique
+ une adiabatique quasi-statique d'un gaz parfait (γ constant)
- une isotherme
= Elle suppose la réversibilité.

? Une forme équivalente de Laplace est :
- $TV^\gamma = $ cte
+ $TV^{\gamma-1} = $ cte
- $PT^\gamma = $ cte
= On remplace P par nRT/V.

? Le travail d'une adiabatique réversible vaut :
+ $\frac{P_2V_2 - P_1V_1}{\gamma - 1}$
- $nRT\ln(V_1/V_2)$
- 0
= $W = \Delta U = nC_{V,m}\Delta T$.

? Dans le diagramme (P, V), au même point :
- l'isotherme est plus pentue
+ l'adiabatique est γ fois plus pentue
- les deux ont la même pente
= Pentes $-P/V$ et $-\gamma P/V$.

? Air, $T_1 = 293$ K, a = 10, γ = 1,4 : $T_2$ vaut environ :
- 410 K
+ 736 K
- 2930 K
= $293\times10^{0{,}4} \approx 735{,}98$ K.

? En compression isotherme, le gaz :
- reçoit de la chaleur
+ cède de la chaleur égale au travail reçu
- n'échange pas de chaleur
= $Q = -W < 0$.
```

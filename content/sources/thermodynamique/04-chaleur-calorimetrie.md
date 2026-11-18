---
id: chaleur-calorimetrie
titre: Chaleur, enthalpie, calorimétrie et chaleur latente
seance: Chapitre 2 (2e partie) · Premier principe de la thermodynamique
importance: 5
---

## Avant de commencer

Il faut savoir écrire le premier principe $dU = \delta W + \delta Q$ et $\delta W = -P\,dV$.

```exercice Vérifie ton prérequis
? À volume constant, que vaut $\Delta U$ ?
= $W = 0$, donc $\Delta U = Q_V$ : la chaleur échangée à volume constant.
```

## Comment aborder ce chapitre

> [!astuce] En calorimétrie, une seule équation : **la somme de toutes les chaleurs échangées dans l'enceinte isolée est nulle**. Écris chaque terme comme « m c (T_final − T_initial) », sans réfléchir aux signes : ils sortent tout seuls.

> [!piege] Oublier le changement d'état. Avant de calculer $T_f$, vérifie si la glace fond **en entier** : sinon $T_f = 0$ °C et l'inconnue devient la masse fondue.

À la fin, tu sais utiliser H, les coefficients calorimétriques et résoudre un problème de calorimètre avec glace.

## Idée 1 · Les coefficients calorimétriques

$$\delta Q = mc_v\,dT + \ell\,dV = mc_p\,dT + h\,dP = \lambda\,dP + \mu\,dV$$

- $c_v$, $c_p$ : chaleurs massiques (J·K⁻¹·kg⁻¹) à V ou P constant.
- $\ell$ : coefficient de dilatation à T constante (Pa) ; $h$ : de compression à T constante (m³).
- Ces six coefficients ne sont pas indépendants : $\ell = m(c_p - c_v)\left(\frac{\partial T}{\partial V}\right)_P$ et $h = -m(c_p - c_v)\left(\frac{\partial T}{\partial P}\right)_V$.
- Capacités totales : $C_V = mc_v = nC_{V,m}$, $C_P = mc_p = nC_{P,m}$ ; $\gamma = C_P/C_V$ (coefficient de Laplace).

## Idée 2 · L'enthalpie H = U + PV

```flux Pourquoi H est pratique
H = U + PV -> dH = δQ + V dP (quasi-statique) -> à P constante : ΔH = Q_P
```

- Isobare quasi-statique : $\Delta H = Q_P$. Isochore : $\Delta U = Q_V$.
- $dU = mc_v\,dT + (\ell - P)dV$ et $dH = mc_p\,dT + (h + V)dP$.

Capacités du cours :

```grille Valeurs à connaître
#cols: Cas | Valeur | Remarque
#rows: Solide | Eau liquide | Éthanol | Gaz monoatomique | Gaz diatomique
$C_m \approx 3R \approx 25$ J·K⁻¹·mol⁻¹ | ~Dulong et Petit
c = 4187 J·K⁻¹·kg⁻¹ | *la plus élevée
c ≈ 2500 J·K⁻¹·kg⁻¹ | ~liquide organique
$C_{P,m} = 5R/2$, $C_{V,m} = 3R/2$ | *γ = 5/3 ≈ 1,67
$C_{P,m} = 7R/2$, $C_{V,m} = 5R/2$ | *γ = 7/5 = 1,4
```

## Idée 3 · Le calorimètre

```html
<svg viewBox="0 0 360 200" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Calorimètre : enceinte extérieure, couche d'air isolante, enceinte intérieure contenant l'eau, thermomètre et agitateur">
<rect x="70" y="40" width="220" height="150" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="95" y="60" width="170" height="115" fill="none" stroke="currentColor" stroke-width="2"/>
<rect x="97" y="100" width="166" height="73" fill="#D9824F" opacity="0.3"/>
<rect x="60" y="30" width="240" height="10" fill="currentColor"/>
<line x1="140" y1="5" x2="140" y2="150" stroke="#D9824F" stroke-width="3"/><line x1="220" y1="5" x2="220" y2="160" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="12" fill="currentColor"><text x="146" y="16">thermomètre</text><text x="226" y="16">agitateur</text><text x="150" y="140">eau</text><text x="300" y="120">air isolant</text></g>
</svg>
```

Le calorimètre est **adiabatique** : $\sum Q_i = 0$ (et $\Delta H = Q_P = 0$).

```etapes Méthode des mélanges (trouver c_p d'un solide)
Écrire le bilan :: $m_1c_p(\theta_f - \theta_1) + (M_{eau}c_{eau} + \mu c_{eau})(\theta_f - \theta_2) = 0$.
Repérer μ :: $\mu$ est la **valeur en eau** du calorimètre : il se comporte comme une masse μ d'eau.
Isoler c_p :: $c_p = \frac{(M_{eau} + \mu)c_{eau}(\theta_f - \theta_2)}{m_1(\theta_1 - \theta_f)}$.
Mesurer μ avant :: on mélange de l'eau chaude $(m_1, \theta_1)$ et froide $(m_2, \theta_2)$ : $\mu = m_1\frac{\theta_1 - \theta_f}{\theta_f - \theta_2} - m_2$.
```

Méthode électrique (liquides) : une résistance R parcourue par I pendant Δt fournit $RI^2\Delta t$, d'où $c_l = \frac{RI^2\Delta t}{m_l(\theta_f - \theta_i)}$.

## Idée 4 · Changements d'état et chaleur latente

```flux Les changements de phase
Solide -> (fusion) Liquide -> (vaporisation) Gaz
```

Sens inverses : solidification, liquéfaction (condensation) ; solide ↔ gaz : sublimation / condensation.

$$Q = mL$$

- $L$ en J/kg ; $L_f > 0$, $L_s = -L_f$ ; $L_v > 0$, $L_l = -L_v$.
- Le changement d'état se fait **à T constante** pour une P donnée.
- Eau : $L_v = 537$ cal/g à 100 °C ; $L_f = 80$ cal/g à 0 °C (≈ 334 J/g).
- L'eau bout à 100 °C sous 1 atm, 151 °C sous 5 bar, 6,7 °C sous 0,01 bar ; vers 85 °C à 4500 m.

## S'exercer

```exercice Calorimétrie
? On mélange 100 g d'eau à 80 °C et 200 g d'eau à 20 °C (calorimètre parfait). Température finale ?
reponse: 40
= $100(\theta - 80) + 200(\theta - 20) = 0$, donc $\theta = 40$ °C.

? Chaleur pour fondre 50 g de glace à 0 °C ($L_f = 334$ J/g) ?
reponse: 16700
= $Q = 50\times334 = 16\,700$ J.

? Un gaz diatomique parfait : que vaut γ ?
reponse: 1.4
= $\gamma = C_{P,m}/C_{V,m} = (7/2)/(5/2) = 1{,}4$.
```

## Flashcards

```cartes
Enthalpie :: $H = U + PV$ ; à P constante (quasi-statique), $\Delta H = Q_P$.
Isochore :: $\Delta U = Q_V$.
Coefficient de Laplace :: $\gamma = C_P/C_V = c_p/c_v$.
Gaz monoatomique :: $C_{V,m} = 3R/2$, $C_{P,m} = 5R/2$, $\gamma = 5/3$.
Gaz diatomique :: $C_{V,m} = 5R/2$, $C_{P,m} = 7R/2$, $\gamma = 1{,}4$.
Loi de Dulong et Petit :: $C_m \approx 3R \approx 25$ J·K⁻¹·mol⁻¹ pour les solides.
Valeur en eau μ :: Masse d'eau qui absorberait la même chaleur que le calorimètre et ses accessoires.
Chaleur latente :: $Q = mL$, à T constante pour P donnée.
Eau : chaleur massique :: ≈ 4180 J·K⁻¹·kg⁻¹.
```

## QCM du chapitre

```qcm
? À pression constante, la chaleur échangée (quasi-statique) est égale à :
- $\Delta U$
+ $\Delta H$
- $W$
= $dH = \delta Q + V\,dP$ et $dP = 0$.

? La définition de l'enthalpie est :
+ $H = U + PV$
- $H = U - PV$
- $H = U + TS$
= Définition du cours.

? Pour un gaz parfait diatomique, $C_{V,m}$ vaut :
- $3R/2$
+ $5R/2$
- $7R/2$
= Et $C_{P,m} = 7R/2$.

? Dans un calorimètre adiabatique :
+ la somme des chaleurs échangées est nulle
- la température reste constante
- seule l'eau échange de la chaleur
= $\sum Q_i = 0$.

? La valeur en eau μ d'un calorimètre représente :
- sa masse réelle
+ la masse d'eau thermiquement équivalente au calorimètre
- la masse d'eau qu'il contient
= On remplace le calorimètre par une masse μ d'eau.

? Pendant la fusion de la glace sous 1 atm, la température :
- augmente
+ reste à 0 °C
- diminue
= Le changement d'état se fait à T constante.

? La chaleur latente de solidification vérifie :
- $L_s = L_f$
+ $L_s = -L_f$
- $L_s = 0$
= L'eau rend en gelant la chaleur absorbée en fondant.

? Selon Dulong et Petit, la capacité molaire d'un solide vaut environ :
- R
+ 3R
- 5R/2
= ≈ 25 J·K⁻¹·mol⁻¹.

? En altitude (4500 m), l'eau bout vers 85 °C parce que :
+ la pression est inférieure à 1 atm
- la gravité est plus faible
- l'air est plus froid
= La température d'ébullition dépend de la pression.

? La chaleur massique de l'eau liquide est :
- la plus faible des liquides
+ la plus élevée des liquides courants (≈ 4187 J·K⁻¹·kg⁻¹)
- égale à celle de l'éthanol
= Remarque du prof.
```

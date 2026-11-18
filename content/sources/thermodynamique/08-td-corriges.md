---
id: td-corriges
titre: TD corrigés (séries 1 et 2)
seance: Séries de TD 1 et 2 · 2023-2024
importance: 5
---

Les deux séries de TD du Pr Arroub, corrigées pas à pas. Les calculs numériques sont vérifiés en Python (tu peux les relancer).

> [!attention] Ces corrigés sont une rédaction ToumaiLearn, pas le corrigé officiel du prof. Compare avec ta correction de TD.

## Avant de commencer

Revois le test de Schwarz (chapitre 1), $W = -\int P_{ext}dV$ (chapitre 3) et la méthode du calorimètre (chapitre 4).

```exercice Vérifie ton prérequis
? Dans un calorimètre adiabatique, que vaut la somme des chaleurs échangées ?
reponse: 0
= Zéro : $\sum Q_i = 0$.
```

## Comment aborder ce chapitre

> [!astuce] Cherche d'abord seul, 15 minutes par exercice. Ouvre ensuite le corrigé et compare **la méthode**, pas seulement le résultat.

> [!piege] En TD 1 exercice 4, prendre $P_{ext} = P$ du gaz dans les cas « brusques ». Quand la pression extérieure saute brusquement, c'est **elle** qui est constante, pas celle du gaz.

À la fin, tu as refait tous les types d'exercices tombés en TD.

## Idée 1 · Série 1 : formes différentielles

**Exercice 1.** (a) $2y^2dx + 3x^2dy$ : $4y \ne 6x$, **non exacte**. (b) $y\,dx + x\,dy$ : exacte, $u = xy + C$.
II) Facteur intégrant de $(x^2 + y)dx - x\,dy$ : $\lambda = 1/x^2$, $f = x - y/x + C$.

**Exercice 2.** $\delta Q = C_p(T)dT - \frac{RT}{P}dP$ (1 mol).

```etapes δQ et δQ/T sont-elles exactes ?
δQ :: $\frac{\partial C_p(T)}{\partial P} = 0$ mais $\frac{\partial}{\partial T}\left(-\frac{RT}{P}\right) = -\frac{R}{P} \ne 0$ : **non exacte**.
δQ/T :: $\frac{C_p(T)}{T}dT - \frac{R}{P}dP$ : les deux dérivées croisées valent 0 : **exacte**.
Interprétation :: $1/T$ est un facteur intégrant ; $\delta Q/T = dS$ avec $S = \int\frac{C_p}{T}dT - R\ln P + $ cte.
```

**Exercice 3.** $\rho = m/V = 15/20 = 0{,}75$ g/cm³. Incertitudes : $\frac{\Delta\rho}{\rho} = \frac{\Delta m}{m} + \frac{\Delta V}{V} = \frac{0{,}2}{15} + \frac{1}{20} \approx 0{,}0633$ (6,3 %), donc $\Delta\rho \approx 0{,}0475$ g/cm³ ; $\rho = 0{,}75 \pm 0{,}05$ g/cm³.

## Idée 2 · Série 1, exercice 4 : trois détentes isothermes

1 mol de gaz parfait, de $P_1 = 10$ atm à $P_2 = 3$ atm, T constante.

```grille Les trois cas
#cols: Cas | P_ext | Travail
#rows: 1 réversible | 2 brusque | 3 deux étapes
= P du gaz | $W = -RT\ln(P_1/P_2) = -1{,}204\,RT$
P₂ constante | $W = -P_2(V_2 - V_1) = -RT(1 - P_2/P_1) = -0{,}7\,RT$
2P₂ puis P₂ | $W = -RT(1 - 2P_2/P_1) - RT(1 - 1/2) = -0{,}9\,RT$
```

> [!attention] L'énoncé ne donne pas T. On prend T = 300 K pour l'application numérique.

```python
import math
R, T = 8.314, 300
P1, P2 = 10, 3
W1 = -R*T*math.log(P1/P2)
W2 = -R*T*(1 - P2/P1)
W3 = -R*T*(1 - 2*P2/P1) - R*T*(1 - P2/(2*P2))
for nom, W in [("réversible", W1), ("brusque", W2), ("deux étapes", W3)]:
    print(f"{nom:12s} W = {W:.1f} J")
```

```sortie
réversible   W = -3002.9 J
brusque      W = -1745.9 J
deux étapes  W = -2244.8 J
```

**Conclusion** : le travail **fourni** par le gaz ($-W$) est maximal pour la détente réversible. Plus on découpe en étapes, plus on s'en rapproche.

## Idée 3 · Série 2 : équations d'état et Van der Waals

**Exercice 1.** $\beta = \frac{1}{T}\left(1 + \frac{a}{PV^2}\right)$, $\chi_T = \frac{V^2(V-b)^2}{RTV^3 - 2a(V-b)^2}$.

```etapes Retrouver l'équation d'état
Remarque :: $\beta = \frac{1}{P}\left(\frac{\partial P}{\partial T}\right)_V$, donc $\left(\frac{\partial P}{\partial T}\right)_V = \frac{P + a/V^2}{T}$.
Intuition :: $P + a/V^2$ est proportionnel à T à V fixé : $P + \frac{a}{V^2} = T\,g(V)$.
Utiliser χ_T :: $\left(\frac{\partial P}{\partial V}\right)_T = Tg'(V) + \frac{2a}{V^3} = -\frac{1}{V\chi_T} = -\frac{RT}{(V-b)^2} + \frac{2a}{V^3}$.
Identifier :: $g'(V) = -\frac{R}{(V-b)^2}$, donc $g(V) = \frac{R}{V-b}$ (constante nulle pour retrouver le gaz parfait).
Conclure :: $\left(P + \frac{a}{V^2}\right)(V - b) = RT$ : équation de **Van der Waals**.
n moles :: V → V/n (volume molaire) : $\left(P + \frac{n^2a}{V^2}\right)(V - nb) = nRT$.
```

**Exercice 2.** 1 mol de Van der Waals, isotherme réversible de $V_1$ à $V_2$, avec $\ell = T\left(\frac{\partial P}{\partial T}\right)_V = \frac{RT}{V-b}$.

1. $Q = \int\ell\,dV = RT\ln\frac{V_2 - b}{V_1 - b}$.
2. Adiabatique réversible : $C_V dT + \frac{RT}{V-b}dV = 0$, donc $T(V-b)^{R/C_V} = $ cte.
3. $W = -\int P\,dV = -RT\ln\frac{V_2 - b}{V_1 - b} + a\left(\frac{1}{V_1} - \frac{1}{V_2}\right)$.
4. $\Delta U = W + Q = a\left(\frac{1}{V_1} - \frac{1}{V_2}\right)$ : contrairement au gaz parfait, U varie à T constante.

## Idée 4 · Série 2 : calorimétrie avec glace

**Exercice 3.** Calorimètre C = 50,1 J/K, 300 g d'eau à 15 °C, 50 g de glace à 0 °C.

```python
C, M, ce, Lf = 50.1, 0.300, 4180, 334000
m = 0.050
Q1 = (C + M*ce)*15
Q2 = m*Lf
Tf = (Q1 - Q2)/(C + M*ce + m*ce)
print(f"Q1 = {Q1:.1f} J, Q2 = {Q2:.1f} J")
print(f"Tf = {Tf:.3f} °C")
print(f"glace totale = {Q1/Lf*1000:.1f} g, à ajouter = {(Q1/Lf - m)*1000:.1f} g")
```

```sortie
Q1 = 19561.5 J, Q2 = 16700.0 J
Tf = 1.891 °C
glace totale = 58.6 g, à ajouter = 8.6 g
```

- 1-a) $Q_1 = 19\,561{,}5$ J. 1-b) $Q_2 = 16\,700$ J < $Q_1$ : toute la glace fond, donc $T_f > 0$ °C. 1-c) $T_f \approx 1{,}891$ °C.
- 2) Pour finir exactement à 0 °C avec seulement de l'eau, il faut 58,6 g de glace au total, soit **8,6 g de plus**.

**Exercice 4.** 200 g d'eau à 50 °C, m' de glace à −10 °C, c' = c/2.

```python
c, L = 4.18, 334
cg = c/2
Qeau = 200*c*50
for mg in (100, 200):
    besoin = mg*cg*10 + mg*L
    if besoin <= Qeau:
        Tf = (Qeau - besoin)/((200 + mg)*c)
        print(f"m' = {mg} g : tout fond, Tf = {Tf:.2f} °C")
    else:
        fondu = (Qeau - mg*cg*10)/L
        print(f"m' = {mg} g : Tf = 0 °C, glace fondue = {fondu:.1f} g, reste {mg - fondu:.1f} g de glace")
```

```sortie
m' = 100 g : tout fond, Tf = 5.03 °C
m' = 200 g : Tf = 0 °C, glace fondue = 112.6 g, reste 87.4 g de glace
```

```etapes Méthode générale (glace)
Chaleur disponible :: eau jusqu'à 0 °C : $200\times4{,}18\times50 = 41\,800$ J.
Chaleur nécessaire :: réchauffer la glace à 0 °C, puis la fondre.
Comparer :: si disponible > nécessaire, tout fond et on calcule $T_f$ ; sinon $T_f = 0$ °C et on calcule la masse fondue.
```

## Idée 5 · Série 2, exercice 5 : compression brusque

2 g de diazote (γ = 7/5), S = 0,01 m², $T_0 = 300$ K, $P_0 = 10^5$ Pa. On pose 100 kg sur le piston : $P_1 = P_0 + mg/S$. Transformation adiabatique **irréversible** à $P_{ext} = P_1$ constante.

```etapes Méthode
Bilan :: $\Delta U = W$ : $nC_{V,m}(T_1 - T_0) = -P_1(V_1 - V_0)$.
Remplacer V₁ :: $V_1 = nRT_1/P_1$ et $V_0 = nRT_0/P_0$.
Résoudre :: $\frac{7}{2}T_1 = \frac{5}{2}T_0 + T_0\frac{P_1}{P_0}$.
```

```python
R, T0, P0 = 8.32, 300, 1e5
n = 2/28
V0 = n*R*T0/P0
P1 = P0 + 100*9.81/0.01
T1 = (2.5*T0 + T0*P1/P0)/3.5
V1 = n*R*T1/P1
dU = 2.5*n*R*(T1 - T0)
print(f"V0 = {V0*1e3:.3f} L, P1 = {P1:.0f} Pa")
print(f"T1 = {T1:.2f} K, V1 = {V1*1e3:.3f} L, dU = {dU:.1f} J")
```

```sortie
V0 = 1.783 L, P1 = 198100 Pa
T1 = 384.09 K, V1 = 1.152 L, dU = 124.9 J
```

> [!piege] Ici, pas de Laplace : la transformation est brusque. Laplace donnerait $T_1 \approx 365$ K, ce qui est faux.

## S'exercer

```exercice Refais seul
? Avec T = 300 K, calcule le travail de la détente brusque de 1 mol de 10 atm à 3 atm.
reponse: -1746 ~2
= $W = -RT(1 - P_2/P_1) = -8{,}314\times300\times0{,}7 \approx -1746$ J.

? 200 g d'eau à 50 °C et 100 g de glace à −10 °C : $T_f$ ?
reponse: 5.03 ~0.05
= Tout fond, $T_f \approx 5{,}03$ °C.

? Variation d'énergie interne du diazote dans l'exercice 5 ?
reponse: 124.9 ~0.5
= $\Delta U = \frac{5}{2}nR(T_1 - T_0) \approx 124{,}9$ J.
```

## Flashcards

```cartes
Détente brusque à P₂ :: $W = -P_2(V_2 - V_1)$, la pression extérieure est constante.
Facteur intégrant de δQ :: $1/T$ : $\delta Q/T$ est exacte (entropie).
Incertitude relative de ρ = m/V :: $\Delta\rho/\rho = \Delta m/m + \Delta V/V$.
Équation de Van der Waals (n moles) :: $(P + n^2a/V^2)(V - nb) = nRT$.
ℓ pour Van der Waals :: $\ell = RT/(V - b)$.
ΔU isotherme Van der Waals :: $a(1/V_1 - 1/V_2)$.
Calorimètre avec glace :: Comparer chaleur disponible et chaleur pour tout fondre avant de calculer $T_f$.
Compression adiabatique brusque :: $\Delta U = -P_1(V_1 - V_0)$, pas de Laplace.
```

## QCM du chapitre

```qcm
? $\delta Q = C_p(T)dT - \frac{RT}{P}dP$ est :
- exacte
+ non exacte, mais $\delta Q/T$ est exacte
- exacte, mais $\delta Q/T$ ne l'est pas
= Dérivées croisées : 0 et $-R/P$.

? Parmi les trois détentes du TD 1, celle qui fournit le plus de travail est :
+ la réversible
- la brusque
- celle en deux étapes
= $|W| = 1{,}204\,RT$ contre 0,7 et 0,9 RT.

? $\rho = m/V$ avec m = 15 g, V = 20 cm³ :
- 1,33 g/cm³
+ 0,75 g/cm³
- 300 g/cm³
= 15/20.

? L'équation trouvée en série 2 ex. 1 est celle de :
- gaz parfait
+ Van der Waals
- Laplace
= $(P + a/V^2)(V - b) = RT$.

? Pour un gaz de Van der Waals en isotherme, $\Delta U$ :
- vaut toujours 0
+ vaut $a(1/V_1 - 1/V_2)$
- vaut Q
= U dépend aussi de V.

? Dans l'exercice 3 de la série 2, $Q_2 < Q_1$ signifie :
+ toute la glace fond et $T_f > 0$ °C
- $T_f < 0$ °C
- il reste de la glace
= L'eau et le calorimètre ont plus de chaleur à céder qu'il n'en faut.

? Avec 200 g de glace à −10 °C dans 200 g d'eau à 50 °C :
- tout fond
+ $T_f = 0$ °C, il reste environ 87 g de glace
- toute l'eau gèle
= 41 800 J disponibles < 70 980 J nécessaires.

? Pour une compression adiabatique **brusque**, on utilise :
- $PV^\gamma = $ cte
+ $\Delta U = -P_{ext}(V_f - V_i)$
- $\Delta U = 0$
= Laplace exige la réversibilité.

? La pression après avoir posé 100 kg sur un piston de 0,01 m² (g = 9,81, $P_0 = 10^5$ Pa) :
- $10^5$ Pa
+ $1{,}981\times10^5$ Pa
- $9{,}81\times10^4$ Pa
= $P_0 + mg/S$.

? Le volume initial de 2 g de N₂ à 300 K et $10^5$ Pa vaut environ :
+ 1,78 L
- 17,8 L
- 0,178 L
= $nRT/P$ avec n = 2/28 mol.
```

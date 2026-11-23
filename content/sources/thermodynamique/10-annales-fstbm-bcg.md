---
id: annales-fstbm-bcg
titre: Annales corrigées · thermodynamique FST Béni Mellal (BCG)
seance: Examens de thermodynamique, filière BCG, FST Béni Mellal
importance: 4
payant: true
---

Deux sources de la FST Béni Mellal (filière BCG) : le corrigé d'une session ordinaire (4 exercices courts) et le QCM « justifié » d'un examen 2019-2020. Ce sont les calculs qui tombent tous les ans : calorimétrie, isotherme, adiabatique, entropie.

> [!attention] Pour la session ordinaire, seul le corrigé était fourni. Les énoncés ci-dessous sont reconstitués à partir des données du corrigé. Le scan de l'examen 2019-2020 est en partie illisible : on n'a gardé que les questions complètes.

## Session ordinaire · exercice 1 (bouilloire)

**Énoncé reconstitué.** Une bouilloire de puissance P = 1200 W chauffe V = 2 L d'eau (c = 4185 J·kg⁻¹·K⁻¹) prise à 5 °C pendant 10 min. a) Température finale si la bouilloire ne capte pas de chaleur. b) Même question si sa capacité est C_b = 800 J·K⁻¹. 2) Durée pour atteindre la température du a) dans le cas b).

```exercice Exercice 1
? a) Température finale sans la bouilloire.
= Bilan : P·Δt = m·c·(θF − θ1), avec m = 2 kg. θF = 1200 × 600 / (2 × 4185) + 5 = 86,02 + 5 = **91,02 °C**.
reponse: 91.02

? b) Avec C_b = 800 J/K.
= P·Δt = (m·c + C_b)(θ'F − θ1). θ'F = 720 000 / 9170 + 5 ≈ **83,51 °C**. La bouilloire « vole » une partie de l'énergie.
reponse: 83.51

? 2) Durée pour revenir à 91,02 °C.
= Δt' = (m·c + C_b) × 86,02 / P = 9170 × 86,02 / 1200 ≈ **657 s**, soit 10 min 57 s.
reponse: 657
```

## Session ordinaire · exercices 2 à 4

```exercice Exercices 2, 3, 4
? Ex. 2 : un gaz parfait passe de façon isotherme de (P_A = 2 bar, V_A = 0,5 L) à P_B = 1 bar. Travail W_AB ?
= V_B = P_A·V_A / P_B = 1 L. W_AB = P_A·V_A·ln(V_A / V_B) = 2·10⁵ × 0,5·10⁻³ × ln(0,5) = **−69,31 J** (le gaz fournit du travail en se détendant). ΔU = 0 (isotherme d'un gaz parfait), donc Q_AB = +69,31 J.
reponse: -69.31

? Ex. 3 : 0,1 mol de gaz parfait (c_v = 20,8 J·mol⁻¹·K⁻¹) passe adiabatiquement de 300 K à 400 K. Travail ?
= Q = 0, donc W = ΔU = n·c_v·(T2 − T1) = 0,1 × 20,8 × 100 = **208 J** reçus (compression).
reponse: 208

? Ex. 4 : S passe de 140 à 100 J/K en cédant 12 000 J à un thermostat à 300 K. Nature de la transformation ?
= ΔS = −40 J/K ; entropie échangée S_e = Q/T = −12 000 / 300 = −40 J/K ; entropie créée S_c = ΔS − S_e = 0 : **réversible**.
reponse: 0
```

> [!retenir] Pour juger une transformation : calcule toujours S_c = ΔS − Q/T. S_c = 0 : réversible ; S_c > 0 : irréversible ; S_c < 0 : impossible.

## Examen 2019-2020 · QCM justifiés

```exercice QCM à justifier
? On mélange 120 g d'eau à 25 °C et 180 g à 85 °C. Température d'équilibre (41, 51, 61 ou 65 °C) ?
= Même liquide : moyenne pondérée par les masses. θ = (120 × 25 + 180 × 85) / 300 = **61 °C**.
reponse: 61

? Chaleur à prélever pour faire 1 kg de glace à −10 °C à partir d'eau à 20 °C (L_f = 336 kJ/kg, c_eau = 4180, c_glace = 2100) ?
= Trois étapes : eau de 20 à 0 °C : −83,6 kJ ; solidification : −336 kJ ; glace de 0 à −10 °C : −21 kJ. Total **−440,6 kJ**.
reponse: -440.6

? Une résistance de 150 Ω parcourue par 2 A pendant 30 min fournit :
= Q = R·I²·Δt = 150 × 4 × 1800 = 1,08·10⁶ J = **0,3 kWh** (1 kWh = 3,6·10⁶ J).
reponse: 0.3

? On double la pression d'une mole de gaz parfait à 15 °C par compression isotherme réversible. Travail reçu ?
= W = nRT·ln(P2/P1) = 8,32 × 288 × ln 2 ≈ **1660,9 J**, positif car le gaz reçoit du travail.
reponse: 1660.9
```

## QCM

```qcm
? Dans une isotherme de gaz parfait :
+ ΔU = 0 et Q = −W
- Q = 0
- W = 0
= U ne dépend que de T (1re loi de Joule).

? Dans une adiabatique :
- ΔU = 0
+ W = ΔU
- W = −Q
= Q = 0, le premier principe donne ΔU = W.

? Si l'on tient compte de la capacité de la bouilloire, la température finale :
- monte
+ baisse
- ne change pas
= Une partie de l'énergie chauffe la bouilloire.

? Mélange de masses égales d'eau à 20 °C et 60 °C :
- 30 °C
+ 40 °C
- 50 °C
= Moyenne simple quand les masses sont égales.

? 1 kWh vaut :
- 1000 J
+ 3,6·10⁶ J
- 3600 J
= 1000 W × 3600 s.

? Pour solidifier 1 kg d'eau à 0 °C, on prélève :
+ 336 kJ
- 4,18 kJ
- 2,1 kJ
= C'est la chaleur latente de fusion.

? Entropie créée négative :
- réversible
- irréversible
+ impossible
= Second principe : S_c ≥ 0.

? Le travail d'une détente isotherme reçu par le gaz est :
- positif
+ négatif
- nul
= Le gaz fournit du travail au milieu extérieur.

? W = n·c_v·ΔT s'applique à :
+ une adiabatique de gaz parfait
- toute transformation
- une isobare uniquement
= Car Q = 0 et ΔU = n·c_v·ΔT.

? Entropie échangée avec un thermostat à T :
- ΔS
+ Q / T
- T / Q
= Q est la chaleur reçue par le système.
```

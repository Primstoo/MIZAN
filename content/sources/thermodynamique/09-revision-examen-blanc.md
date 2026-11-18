---
id: revision-examen-blanc
titre: Révision et examen blanc
seance: Examen · session ordinaire 2022-2023 (1 h 30)
importance: 5
---

## Avant de commencer

Ce chapitre suppose que tu as fait les QCM des chapitres 1 à 7. L'examen blanc reprend **l'examen de session ordinaire 2022-2023** du Pr Arroub.

```exercice Vérifie ton prérequis
? Pour un gaz parfait sur une isobare, que vaut Q ?
= $Q = \Delta H = nC_{P,m}\Delta T$.
```

## Comment aborder ce chapitre

> [!astuce] Fais l'examen blanc en 1 h 30, sans le cours, puis corrige-toi. Note où tu as perdu du temps.

> [!prof] Consigne de l'examen : résultats numériques **avec unités** et **trois chiffres significatifs après la virgule**, copie propre.

À la fin, tu sais ce que tu maîtrises vraiment et ce qu'il faut revoir.

## Idée 1 · La fiche résumé

```grille Les formules à savoir par cœur
#cols: Transformation (gaz parfait) | W | Q | ΔU
#rows: Isochore | Isobare | Isotherme réversible | Adiabatique réversible
0 | $nC_{V,m}\Delta T$ | *$nC_{V,m}\Delta T$
$-P\Delta V$ | $nC_{P,m}\Delta T$ | *$nC_{V,m}\Delta T$
$nRT\ln(P_2/P_1)$ | $-W$ | *0
$\frac{P_2V_2 - P_1V_1}{\gamma - 1}$ | 0 | *$W$
```

```flux Démarche type d'un problème
Identifier les transformations -> Écrire ΔU = nC_V ΔT pour chacune -> Calculer W ou Q -> Bilan sur le cycle (W + Q = 0) -> Rendement ou ΔS
```

## Idée 2 · Examen blanc, exercice 1

> [!prof] C'est **exactement** l'exercice 2 du TD 1 : le prof reprend les exercices de TD à l'examen.

$\delta Q = C_p(T)dT - \frac{RT}{P}dP$ : $\delta Q$ non exacte, $\delta Q/T$ exacte (voir chapitre TD).

## Idée 3 · Examen blanc, exercice 2 : cycle de Brayton (Joule)

```html
<svg viewBox="0 0 400 220" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Cycle formé de deux isobares P1 et P2 et deux adiabatiques : A vers B adiabatique, B vers C isobare P2, C vers D adiabatique, D vers A isobare P1">
<line x1="40" y1="200" x2="380" y2="200" stroke="currentColor" stroke-width="2"/><line x1="40" y1="200" x2="40" y2="10" stroke="currentColor" stroke-width="2"/>
<line x1="110" y1="50" x2="200" y2="50" stroke="#D9824F" stroke-width="3"/>
<path d="M200 50 Q240 140 340 160" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="340" y1="160" x2="170" y2="160" stroke="currentColor" stroke-width="3"/>
<path d="M170 160 Q120 120 110 50" fill="none" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><text x="100" y="42">B</text><text x="204" y="42">C</text><text x="346" y="164">D</text><text x="158" y="178">A</text><text x="8" y="54">P₂</text><text x="8" y="164">P₁</text><text x="370" y="215">V</text></g>
</svg>
```

Cycle réversible moteur, n moles de gaz parfait, AB et CD adiabatiques, BC et DA isobares, $a = P_2/P_1 = 8$, γ = 1,4.

```etapes Corrigé
1. Chaleur totale :: Seules les isobares échangent de la chaleur. $Q_{BC} = nC_{P,m}(T_C - T_B) = \frac{\gamma}{\gamma-1}P_2(V_C - V_B)$ et $Q_{DA} = \frac{\gamma}{\gamma-1}P_1(V_A - V_D)$. Donc $Q = \frac{\gamma}{\gamma-1}\left[P_2(V_C - V_B) + P_1(V_A - V_D)\right]$.
2. Travail :: Sur un cycle, $W = -Q = -\frac{\gamma}{\gamma-1}\left[P_2(V_C - V_B) + P_1(V_A - V_D)\right]$.
3. Rendement :: $\rho = \frac{-W}{Q_{BC}} = 1 + \frac{P_1(V_A - V_D)}{P_2(V_C - V_B)}$. Laplace : $V_A = a^{1/\gamma}V_B$ et $V_D = a^{1/\gamma}V_C$, donc $\rho = 1 - a^{(1-\gamma)/\gamma}$.
4. Second principe :: Cycle réversible : $\oint\frac{\delta Q}{T} = nC_{P,m}\ln\frac{T_C}{T_B} + nC_{P,m}\ln\frac{T_A}{T_D} = 0$, donc $\frac{T_C}{T_B} = \frac{T_D}{T_A}$.
```

Application numérique (vérifiée) :

```python
a, g = 8, 1.4
rho = 1 - a**((1 - g)/g)
print(f"rho = {rho:.3f}")
```

```sortie
rho = 0.448
```

Soit **ρ ≈ 44,8 %**.

> [!piege] Ici $a = P_2/P_1$ est un rapport de **pressions** : l'exposant est $(1-\gamma)/\gamma$. Avec un rapport de volumes (Beau de Rochas), c'est $1 - \gamma$.

## S'exercer

```exercice Entraînement final
? Rendement du cycle de Brayton pour a = 10, γ = 1,4 ?
reponse: 0.482 ~0.002
= $1 - 10^{-0{,}4/1{,}4} \approx 0{,}482$.

? Pour le même cycle, montre que le rendement ne dépasse pas celui de Carnot entre $T_C$ et $T_A$.
= $\rho = 1 - T_A/T_B$ (car $T_B/T_A = a^{(\gamma-1)/\gamma}$). Comme $T_B < T_C$, $\rho < 1 - T_A/T_C = \rho_{Carnot}$.

? 1 mol de gaz parfait diatomique chauffée à P constante de 300 K à 400 K : Q et ΔU ?
= $Q = \frac{7}{2}R\times100 \approx 2910$ J ; $\Delta U = \frac{5}{2}R\times100 \approx 2079$ J.
```

## Flashcards

```cartes
Rendement Brayton :: $\rho = 1 - a^{(1-\gamma)/\gamma}$ avec $a = P_2/P_1$.
Isobare d'un gaz parfait :: $Q = nC_{P,m}\Delta T$, $W = -P\Delta V$.
Méthode « cycle » :: ΔU par étape, puis W + Q = 0 sur le cycle.
Montrer une égalité de températures avec le 2e principe :: Écrire $\oint\delta Q/T = 0$ pour le cycle réversible.
Consigne d'examen du prof :: Unités + trois chiffres significatifs après la virgule.
Q d'une isobare en P et V :: $\frac{\gamma}{\gamma-1}P\Delta V$.
```

## QCM du chapitre

```qcm
? Dans le cycle de Brayton, la chaleur est échangée pendant :
- les adiabatiques
+ les isobares
- tout le cycle
= Q = 0 sur les adiabatiques.

? Le rendement du cycle de Brayton pour a = 8, γ = 1,4 vaut :
- 56,5 %
+ 44,8 %
- 87,5 %
= $1 - 8^{-0{,}2857}$. 56,5 % serait la formule avec un rapport de volumes.

? Sur une isobare d'un gaz parfait, $Q$ vaut aussi :
+ $\frac{\gamma}{\gamma - 1}P\Delta V$
- $P\Delta V$
- $\frac{1}{\gamma - 1}P\Delta V$
= $nC_{P,m}\Delta T$ avec $nR\Delta T = P\Delta V$.

? Pour un gaz parfait, sur une adiabatique réversible :
- W = 0
+ W = ΔU
- ΔU = 0
= Q = 0.

? Le travail total d'un cycle moteur est :
+ négatif
- positif
- nul
= Le moteur fournit du travail.

? Sur une isotherme d'un gaz parfait :
- $\Delta U = Q$
+ $\Delta U = 0$
- $W = 0$
= U = U(T).

? La relation $T_C/T_B = T_D/T_A$ se démontre avec :
- le premier principe seul
+ le second principe ($\oint\delta Q/T = 0$)
- la loi de Joule
= Demandé à la question 4.

? Pour une isochore d'un gaz parfait :
+ $Q = \Delta U = nC_{V,m}\Delta T$
- $Q = \Delta H$
- $Q = 0$
= W = 0.

? Le rendement d'un cycle réel entre deux sources est :
- supérieur à celui de Carnot
+ inférieur ou égal à celui de Carnot
- toujours égal à 50 %
= Carnot est la borne maximale.

? L'exercice 1 de l'examen 2022-2023 est :
+ un exercice de la série de TD 1
- un exercice inédit sur l'entropie
- un exercice sur Van der Waals
= Revoir les TD est la meilleure préparation.
```

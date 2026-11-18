---
id: machines-thermiques
titre: Les machines thermiques, cycle de Beau de Rochas et cycle de Carnot
seance: Chapitre 5 · Notions sur les machines thermiques
importance: 5
---

## Avant de commencer

Il faut savoir écrire le premier principe sur un cycle ($W + Q = 0$) et la loi de Laplace $TV^{\gamma-1} = $ cte.

```exercice Vérifie ton prérequis
? Une machine décrit un cycle : elle reçoit $Q_c = 1000$ J et cède $Q_f = -700$ J. Que vaut W ?
reponse: -300
= $W + Q_c + Q_f = 0$, donc $W = -300$ J : la machine fournit 300 J.
```

## Comment aborder ce chapitre

> [!astuce] Pour toute machine : **rendement (ou efficacité) = ce qui est utile / ce qui coûte**, puis deux bilans : énergie ($W + Q_c + Q_f = 0$) et entropie ($Q_c/T_c + Q_f/T_f \le 0$).

> [!piege] Oublier les signes. Avec la convention du prof, pour un moteur W < 0, donc $\rho = -W/Q_c$ (et non $W/Q_c$).

À la fin, tu sais calculer le rendement de Carnot, l'efficacité d'un frigo ou d'une pompe à chaleur, et le rendement du cycle de Beau de Rochas.

## Idée 1 · Les trois machines dithermes

```grille Signes et performance
#cols: Machine | W | Q_c | Q_f | Performance | Réversible (Carnot)
#rows: Moteur | Réfrigérateur | Pompe à chaleur
< 0 | > 0 | < 0 | $\rho = -W/Q_c$ | *$1 - T_f/T_c$
> 0 | < 0 | > 0 | $e = Q_f/W$ | *$T_f/(T_c - T_f)$
> 0 | < 0 | > 0 | $e = -Q_c/W$ | *$T_c/(T_c - T_f)$
```

- Bilan énergétique : $W = -(Q_c + Q_f)$.
- Bilan entropique : $\frac{Q_c}{T_c} + \frac{Q_f}{T_f} \le 0$ (égalité si réversible).
- Monotherme : le second principe exclut les moteurs, mais autorise les récepteurs.

Exemple : sources à 600 K et 300 K : $\rho_{Carnot} = 1 - 300/600 = 50$ %. Frigo entre 5 °C (278 K) et 25 °C (298 K) : $e_{rev} = 278/20 = 13{,}9$.

## Idée 2 · Le cycle de Carnot

```html
<svg viewBox="0 0 400 220" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Cycle de Carnot : deux isothermes Tc et Tf reliées par deux adiabatiques, points 1 2 3 4">
<line x1="40" y1="200" x2="380" y2="200" stroke="currentColor" stroke-width="2"/><line x1="40" y1="200" x2="40" y2="10" stroke="currentColor" stroke-width="2"/>
<path d="M90 30 Q150 70 230 90" fill="none" stroke="#D9824F" stroke-width="3"/>
<path d="M230 90 Q270 140 340 160" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M340 160 Q230 150 160 130" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 3"/>
<path d="M160 130 Q110 80 90 30" fill="none" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><text x="78" y="26">2</text><text x="236" y="86">3</text><text x="346" y="164">4</text><text x="146" y="146">1</text><text x="160" y="50" fill="#D9824F">T_c</text><text x="240" y="170">T_f</text><text x="370" y="215">V</text><text x="22" y="18">P</text></g>
</svg>
```

Deux isothermes ($T_c$ et $T_f$) et deux adiabatiques réversibles : c'est le cycle de rendement **maximal**.

```etapes Rendement de Carnot (gaz parfait)
Isotherme chaude 2→3 :: $Q_c = nRT_c\ln\frac{P_2}{P_3} > 0$.
Isotherme froide 4→1 :: $Q_f = nRT_f\ln\frac{P_4}{P_1} < 0$.
Laplace sur les adiabatiques :: $\frac{P_2}{P_1} = \frac{P_3}{P_4}$, donc $\frac{P_4}{P_1} = \frac{P_3}{P_2}$.
Égalité de Carnot-Clausius :: $\frac{Q_c}{T_c} + \frac{Q_f}{T_f} = 0$.
Rendement :: $\rho = 1 + \frac{Q_f}{Q_c} = 1 - \frac{T_f}{T_c}$.
```

> [!retenir] Aucun moteur réel fonctionnant entre les deux mêmes sources ne dépasse le rendement de Carnot.

## Idée 3 · Le moteur à explosion à 4 temps (Beau de Rochas)

```flux Les 4 temps
Admission A'→A -> Compression AB (adiabatique) -> Explosion BC (isochore) + détente CD (adiabatique) -> Échappement DA puis AA'
```

- Chaleur reçue (explosion, isochore) : $Q_1 = mc_v(T_C - T_B) > 0$.
- Chaleur cédée (DA, isochore) : $Q_2 = mc_v(T_A - T_D) < 0$.
- $\rho = \frac{Q_1 + Q_2}{Q_1} = 1 - \frac{T_D - T_A}{T_C - T_B}$.
- Laplace sur AB et CD avec $a = V_2/V_1$ : $\frac{T_B}{T_A} = \frac{T_C}{T_D} = a^{\gamma-1}$, donc

$$\rho = 1 - a^{1-\gamma}$$

> [!prof] Pour a ≈ 9 et γ = 1,4 : ρ ≈ 58,5 % en théorie, contre ≈ 35 % pour un moteur réel.

## S'exercer

```exercice Machines
? Un moteur de Carnot fonctionne entre 500 K et 300 K et reçoit $Q_c = 2000$ J par cycle. Calcule W.
reponse: -800
= $\rho = 1 - 300/500 = 0{,}4$, donc $-W = 0{,}4\times2000 = 800$ J, soit $W = -800$ J.

? Efficacité maximale d'une pompe à chaleur entre 7 °C et 20 °C ?
reponse: 22.5 ~0.1
= $e = T_c/(T_c - T_f) = 293{,}15/13 \approx 22{,}5$.

? Rendement théorique de Beau de Rochas pour a = 8, γ = 1,4 ?
reponse: 0.565 ~0.002
= $\rho = 1 - 8^{-0{,}4} \approx 0{,}565$ (56,5 %).
```

## Flashcards

```cartes
Moteur ditherme : signes :: W < 0, $Q_c$ > 0, $Q_f$ < 0.
Rendement d'un moteur :: $\rho = -W/Q_c = 1 + Q_f/Q_c$.
Rendement de Carnot :: $1 - T_f/T_c$ (maximum possible).
Efficacité d'un réfrigérateur :: $e = Q_f/W$ ; réversible : $T_f/(T_c - T_f)$.
Efficacité d'une pompe à chaleur :: $e = -Q_c/W$ ; réversible : $T_c/(T_c - T_f)$.
Égalité de Carnot-Clausius :: $Q_c/T_c + Q_f/T_f = 0$ (cycle réversible).
Cycle de Carnot :: Deux isothermes + deux adiabatiques réversibles.
Rendement de Beau de Rochas :: $\rho = 1 - a^{1-\gamma}$, a = rapport volumétrique.
```

## QCM du chapitre

```qcm
? Pour un moteur thermique (convention du prof) :
+ W < 0, $Q_c$ > 0, $Q_f$ < 0
- W > 0, $Q_c$ < 0, $Q_f$ > 0
- W < 0, $Q_c$ < 0, $Q_f$ > 0
= Il reçoit de la chaleur de la source chaude et fournit du travail.

? Le rendement de Carnot entre 600 K et 300 K vaut :
- 25 %
+ 50 %
- 100 %
= $1 - 300/600$.

? L'efficacité d'un réfrigérateur est définie par :
+ $Q_f/W$
- $-Q_c/W$
- $-W/Q_c$
= L'utile est la chaleur retirée à la source froide.

? L'efficacité d'une pompe à chaleur réversible vaut :
- $T_f/(T_c - T_f)$
+ $T_c/(T_c - T_f)$
- $1 - T_f/T_c$
= L'utile est la chaleur fournie au local.

? Le cycle de Carnot est formé de :
- deux isobares et deux adiabatiques
+ deux isothermes et deux adiabatiques
- deux isochores et deux adiabatiques
= Les isochores, c'est Beau de Rochas.

? Le rendement de Beau de Rochas dépend de :
- $T_c$ et $T_f$ seulement
+ du rapport volumétrique a et de γ
- de la masse de gaz
= $\rho = 1 - a^{1-\gamma}$.

? Pour a = 9, γ = 1,4, le rendement théorique est environ :
- 35 %
+ 58,5 %
- 90 %
= 35 % est la valeur réelle.

? Pendant l'explosion (BC) du moteur à essence, la transformation est :
- isobare
+ isochore
- isotherme
= $Q_1 = mc_v(T_C - T_B)$.

? Un moteur monotherme est :
- possible si réversible
+ impossible (second principe)
- possible avec un gaz parfait
= Énoncé de Kelvin.

? Bilan entropique d'une machine ditherme réversible :
+ $Q_c/T_c + Q_f/T_f = 0$
- $Q_c + Q_f = 0$
- $Q_c/T_c = Q_f/T_f$
= Égalité de Clausius.
```

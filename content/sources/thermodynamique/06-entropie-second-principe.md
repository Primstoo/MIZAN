---
id: entropie-second-principe
titre: L'entropie et le second principe
seance: Chapitre 4 · L'entropie et le second principe
importance: 5
---

## Avant de commencer

Il faut savoir écrire $\delta Q$ pour un gaz parfait : $\delta Q = nC_{V,m}dT + P\,dV$.

```exercice Vérifie ton prérequis
? Calcule $\int_{T_1}^{T_2}\frac{dT}{T}$ pour $T_1 = 300$ K, $T_2 = 600$ K.
reponse: 0.693 ~0.01
= $\ln(600/300) = \ln 2 \approx 0{,}693$.
```

## Comment aborder ce chapitre

> [!astuce] Le premier principe dit **combien** d'énergie s'échange ; le second dit **dans quel sens** les choses arrivent. L'entropie de l'univers ne peut qu'augmenter.

> [!piege] Calculer $\Delta S$ avec $\int\delta Q/T$ le long de la transformation **réelle** irréversible. S est une fonction d'état : on calcule $\Delta S$ sur un chemin **réversible** fictif reliant les mêmes états.

À la fin, tu sais calculer ΔS d'un gaz parfait et d'un corps au contact d'un thermostat, et énoncer Clausius et Kelvin.

## Idée 1 · Pourquoi un second principe

Le premier principe ne distingue pas ces sens :

```flux Ce qui se produit seul, jamais l'inverse
corps chaud + corps froid -> températures égales
```

- Un morceau de glace fond dans un verre d'eau ; l'inverse n'arrive pas.
- Les molécules détendues dans le vide ne reviennent pas dans le compartiment de départ.
- La chaleur dissipée par frottement ne se retransforme pas en travail.

## Idée 2 · La définition de l'entropie

Il existe une fonction d'état extensive S (J/K) telle que

$$dS = \frac{\delta Q_{rev}}{T}$$

```grille Conséquences
#cols: Situation | Résultat
#rows: Cycle | Adiabatique réversible | Irréversible | Système isolé
$\Delta S = 0$ | ~S fonction d'état
$dS = 0$ | *isentropique
$dS > \delta Q/T$ | *création d'entropie
$\Delta S \ge 0$ | *maximal à l'équilibre
```

Interprétation : S mesure le **désordre** microscopique. Fusion, vaporisation, échauffement font augmenter S.

## Idée 3 · Entropie d'un gaz parfait

```etapes Les deux formules du cours
Variables (T, V) :: $dS = nC_{V,m}\frac{dT}{T} + nR\frac{dV}{V}$, donc $\Delta S = nC_{V,m}\ln\frac{T_f}{T_i} + nR\ln\frac{V_f}{V_i}$.
Variables (T, P) :: $dS = nC_{P,m}\frac{dT}{T} - nR\frac{dP}{P}$, donc $\Delta S = nC_{P,m}\ln\frac{T_f}{T_i} - nR\ln\frac{P_f}{P_i}$.
Exemple :: 1 mol, isotherme, volume doublé : $\Delta S = R\ln 2 \approx 5{,}76$ J/K.
```

## Idée 4 · Corps froid au contact d'un thermostat

Un corps (m, c, $T_1$) est mis en contact avec un thermostat à $T_0$, à P constante.

- Corps : $\Delta S_{corps} = mc\ln\frac{T_0}{T_1}$.
- Thermostat (T fixe, reçoit $-Q_{corps}$) : $\Delta S_{th} = -\frac{mc(T_0 - T_1)}{T_0}$.
- Univers : $\Delta S_{univ} = mc\left(\frac{T_1}{T_0} - 1 - \ln\frac{T_1}{T_0}\right) = mc\,f(x)$ avec $x = T_1/T_0$ et $f(x) = x - 1 - \ln x$.

```html
<svg viewBox="0 0 400 210" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Courbe de f de x égale x moins 1 moins ln x, positive avec un minimum nul en x égale 1">
<line x1="40" y1="180" x2="380" y2="180" stroke="currentColor" stroke-width="2"/><line x1="40" y1="190" x2="40" y2="10" stroke="currentColor" stroke-width="2"/>
<path d="M52 20 Q110 175 150 180 Q260 172 375 95" fill="none" stroke="#D9824F" stroke-width="3"/>
<circle cx="150" cy="180" r="5" fill="currentColor"/>
<g font-family="sans-serif" font-size="13" fill="currentColor"><text x="146" y="200">1</text><text x="370" y="200">x</text><text x="250" y="110">f(x) = x − 1 − ln x ≥ 0</text></g>
</svg>
```

$f'(x) = 1 - 1/x$ : f décroît sur ]0, 1[, croît ensuite, minimum $f(1) = 0$. Donc $\Delta S_{univ} \ge 0$, nul seulement si $T_1 = T_0$.

Exemple : 1 kg d'eau (c = 4180) à 280 K mis au contact d'un thermostat à 350 K : $x = 0{,}8$, $f = 0{,}8 - 1 - \ln 0{,}8 \approx 0{,}0231$, $\Delta S_{univ} \approx 96{,}7$ J/K.

## Idée 5 · Inégalité de Clausius, énoncés de Clausius et Kelvin

- Système isolé : $\Delta S_{système} = \Delta S_{corps} + \Delta S_{sources} \ge 0$.
- Avec plusieurs sources isothermes : $\sum_i \frac{Q_i}{T_i} \le \Delta S_{corps}$ ; sur un **cycle**, $\sum_i \frac{Q_i}{T_i} \le 0$ (inégalité de Clausius). Égalité si tout est réversible.

> [!retenir] **Clausius** : la chaleur ne passe pas spontanément d'un corps froid à un corps chaud. **Kelvin** : un cycle monotherme ne peut que recevoir du travail (W ≥ 0) et céder de la chaleur (Q ≤ 0). Pas de moteur monotherme.

## S'exercer

```exercice Entropie
? 2 mol de gaz parfait se détendent de façon isotherme de 10 L à 30 L. Calcule ΔS.
reponse: 18.3 ~0.1
= $\Delta S = nR\ln(V_f/V_i) = 2\times8{,}314\times\ln3 \approx 18{,}3$ J/K.

? Même calcul si la détente est brusque (dans le vide) entre les mêmes états ?
= Même valeur, 18,3 J/K : S est une fonction d'état. Seule l'entropie **créée** change (ici Q = 0, tout est créé).

? Pourquoi un moteur monotherme est-il impossible ?
= Bilan : W + Q = 0 et $\Delta S_{source} = -Q/T_0 \ge 0$, donc Q ≤ 0 et W ≥ 0 : le système reçoit du travail, il ne peut pas en fournir.
```

## Flashcards

```cartes
Définition de S :: $dS = \delta Q_{rev}/T$, fonction d'état extensive en J/K.
Isentropique :: Adiabatique réversible : $dS = 0$.
Irréversible :: $dS > \delta Q/T$.
Système isolé :: $\Delta S \ge 0$ ; S maximale à l'équilibre.
ΔS gaz parfait (T, V) :: $nC_{V,m}\ln(T_f/T_i) + nR\ln(V_f/V_i)$.
ΔS gaz parfait (T, P) :: $nC_{P,m}\ln(T_f/T_i) - nR\ln(P_f/P_i)$.
ΔS d'un thermostat :: $Q_{thermostat}/T_0$.
Énoncé de Clausius :: La chaleur ne passe pas spontanément du froid au chaud.
Énoncé de Kelvin :: Un cycle monotherme ne peut pas fournir de travail.
Inégalité de Clausius (cycle) :: $\sum Q_i/T_i \le 0$.
```

## QCM du chapitre

```qcm
? L'unité de l'entropie est :
- J
+ J/K
- K/J
= $dS = \delta Q/T$.

? Pour une adiabatique réversible :
+ $\Delta S = 0$
- $\Delta S > 0$
- $\Delta S < 0$
= $\delta Q_{rev} = 0$.

? Pour un système isolé siège de transformations irréversibles :
- $\Delta S = 0$
+ $\Delta S > 0$
- $\Delta S < 0$
= Création d'entropie.

? Pour calculer ΔS d'une transformation irréversible, on :
- intègre δQ/T le long du chemin réel
+ imagine un chemin réversible entre les mêmes états
- prend ΔS = 0
= S est une fonction d'état.

? ΔS d'1 mol de gaz parfait dont le volume double à T constante :
- 0
+ $R\ln 2$
- $-R\ln 2$
= $nR\ln(V_f/V_i)$.

? $f(x) = x - 1 - \ln x$ a pour minimum :
+ 0 en x = 1
- −1 en x = 0
- 1 en x = 1
= D'où $\Delta S_{univ} \ge 0$.

? L'énoncé de Clausius dit :
- l'entropie d'un cycle est nulle
+ la chaleur ne passe pas spontanément d'un corps froid à un corps chaud
- un moteur peut avoir un rendement de 1
= Énoncé historique du second principe.

? Selon Kelvin, un cycle monotherme :
- peut fournir du travail
+ ne peut que recevoir du travail et céder de la chaleur
- n'échange rien
= W ≥ 0 et Q ≤ 0.

? L'inégalité de Clausius pour un cycle s'écrit :
+ $\sum Q_i/T_i \le 0$
- $\sum Q_i/T_i \ge 0$
- $\sum Q_i = 0$
= Égalité pour un cycle réversible.

? L'entropie augmente quand :
- un gaz se liquéfie
+ un solide fond
- un liquide gèle
= Le désordre augmente.
```

---
id: coefficients-transformations
titre: Coefficients thermoélastiques, équilibre et transformations
seance: Chapitre 1 (2e partie) · Généralités sur les systèmes
importance: 4
---

## Avant de commencer

Tu dois savoir écrire une dérivée partielle « à variable constante » et utiliser $PV = nRT$.

```exercice Vérifie ton prérequis
? Pour un gaz parfait, calcule $\left(\frac{\partial V}{\partial T}\right)_P$.
= $V = nRT/P$, donc $\left(\frac{\partial V}{\partial T}\right)_P = \frac{nR}{P} = \frac{V}{T}$.
```

## Comment aborder ce chapitre

> [!astuce] Chaque coefficient répond à une question simple : « de combien varie V (ou P) quand je change T (ou P), le reste étant bloqué ? ». Lis l'indice d'abord.

> [!piege] Oublier le signe moins de $\chi_T$. Le volume **diminue** quand la pression augmente : sans le « − », $\chi_T$ serait négatif.

À la fin, tu sais calculer α, β, χ_T, démontrer $\alpha = \chi_T\beta P$ et nommer chaque transformation.

## Idée 1 · Les trois coefficients thermoélastiques

```grille Les coefficients du cours
#cols: Nom | Définition | Unité | Gaz parfait
#rows: α | β | χ_T
dilatation isobare | $\frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_P$ | K⁻¹ | *1/T
augmentation de pression isochore | $\frac{1}{P}\left(\frac{\partial P}{\partial T}\right)_V$ | K⁻¹ | *1/T
compressibilité isotherme | $-\frac{1}{V}\left(\frac{\partial V}{\partial P}\right)_T$ | Pa⁻¹ | *1/P
```

Exemple : un gaz parfait à 300 K a $\alpha = 1/300 \approx 3{,}33\times10^{-3}\ \text{K}^{-1}$. À $10^5$ Pa, $\chi_T = 10^{-5}\ \text{Pa}^{-1}$.

Le prof définit aussi la compressibilité **isentropique** (adiabatique réversible) : $\chi_S = -\frac{1}{V}\left(\frac{\partial V}{\partial P}\right)_S$.

## Idée 2 · La relation α = χ_T β P

```etapes Démonstration du prof
Partir de la relation « −1 » :: $\left(\frac{\partial P}{\partial V}\right)_T\left(\frac{\partial V}{\partial T}\right)_P\left(\frac{\partial T}{\partial P}\right)_V = -1$.
Remplacer par les coefficients :: $\left(\frac{\partial V}{\partial T}\right)_P = \alpha V$, $\left(\frac{\partial P}{\partial V}\right)_T = -\frac{1}{\chi_T V}$, $\left(\frac{\partial T}{\partial P}\right)_V = \frac{1}{\beta P}$.
Simplifier :: $-\frac{1}{\chi_T V}\cdot \alpha V \cdot \frac{1}{\beta P} = -1$.
Conclure :: $\alpha = \chi_T\,\beta\,P$.
Vérifier sur le gaz parfait :: $\frac{1}{P}\cdot\frac{1}{T}\cdot P = \frac{1}{T} = \alpha$. ✓
```

> [!retenir] Deux coefficients suffisent pour retrouver l'équation d'état (c'est l'exercice 1 de la série 2).

## Idée 3 · Grandeurs extensives et intensives, équilibre

- **Extensive** : proportionnelle à la quantité de matière, additive (masse, volume, charge, U, H, S).
- **Intensive** : indépendante de la quantité (T, P, masse volumique).

Équilibre d'un système homogène : immobile, variables constantes dans le temps, intensives uniformes. Équilibre **thermique** = même T partout ; **mécanique** = même P partout. L'équilibre mécanique arrive en général plus vite.

> [!prof] **Principe zéro** : deux systèmes en équilibre thermique avec un même troisième sont en équilibre thermique entre eux. C'est ce qui justifie le thermomètre.

## Idée 4 · Le vocabulaire des transformations

```grille Ce qui reste constant
#cols: Transformation | Ce qui est fixé
#rows: 1 | 2 | 3 | 4 | 5 | 6
adiabatique | *pas d'échange de chaleur (Q = 0)
isobare | *P constante
isotherme | *T constante
isochore | *V constant
monotherme | ~contact avec une seule source (T_i = T_f seulement)
cyclique | *état final = état initial
```

- **Quasi-statique** : suite d'états d'équilibre infiniment proches ; les variables sont définies à chaque instant.
- **Réversible** : quasi-statique **et** on peut repasser par les mêmes états en sens inverse.
- Toute transformation réelle est **irréversible** : frottements, effet Joule, réactions chimiques, transferts dus à des différences de T ou de concentration.

> [!piege] Quasi-statique n'implique pas réversible. Le prof donne l'exemple du fil étiré au-delà de sa limite d'élasticité : lent, mais irréversible.

Unités utiles : 1 bar = $10^5$ Pa ; 1 atm = 1,01325 × $10^5$ Pa = 760 mmHg ; 1 kWh = 3600 kJ ; 1 cal ≈ 4,18 J.

## S'exercer

```exercice Coefficients
? Un gaz vérifie $\alpha = 1/T$ et $\chi_T = 1/P$. Quelle est son équation d'état ?
indice: Écris dV/V = α dT − χ_T dP.
= $\frac{dV}{V} = \frac{dT}{T} - \frac{dP}{P}$, donc $\ln V = \ln T - \ln P + C$, soit $PV/T = $ constante : gaz parfait, $PV = nRT$.

? Calcule $\beta$ pour un gaz parfait à 400 K.
reponse: 0.0025 ~0.0001
= $\beta = 1/T = 1/400 = 2{,}5\times10^{-3}\ \text{K}^{-1}$.

? Convertis 3 atm en Pa.
= $3 \times 1{,}01325\times10^5 \approx 3{,}04\times10^5$ Pa.
```

## Flashcards

```cartes
α (dilatation isobare) :: $\frac{1}{V}(\partial V/\partial T)_P$, en K⁻¹. Gaz parfait : $1/T$.
β (pression isochore) :: $\frac{1}{P}(\partial P/\partial T)_V$, en K⁻¹. Gaz parfait : $1/T$.
χ_T :: $-\frac{1}{V}(\partial V/\partial P)_T$, en Pa⁻¹. Gaz parfait : $1/P$.
Relation entre coefficients :: $\alpha = \chi_T\,\beta\,P$.
Grandeur extensive :: Proportionnelle à la quantité de matière (m, V, U, S).
Grandeur intensive :: Indépendante de la quantité (T, P, ρ).
Principe zéro :: Deux systèmes en équilibre thermique avec un troisième le sont entre eux.
Réversible :: Quasi-statique et parcourable en sens inverse par les mêmes états.
```

## QCM du chapitre

```qcm
? Pour un gaz parfait, $\chi_T$ vaut :
- $1/T$
+ $1/P$
- $P$
= $-\frac{1}{V}\cdot(-\frac{V}{P}) = \frac{1}{P}$.

? La relation entre les coefficients thermoélastiques est :
+ $\alpha = \chi_T\beta P$
- $\beta = \alpha\chi_T P$
- $\chi_T = \alpha\beta P$
= Démonstration à partir de la relation « −1 ».

? Le signe « − » dans $\chi_T$ sert à :
- rendre $\chi_T$ négatif
+ rendre $\chi_T$ positif, car V diminue quand P augmente
- respecter la convention de signe des échanges
= $(\partial V/\partial P)_T < 0$.

? La température est une grandeur :
- extensive
+ intensive
- additive
= Elle ne dépend pas de la quantité de matière.

? Une transformation isochore se fait à :
- pression constante
+ volume constant
- température constante
= Iso-chore : volume constant.

? Une transformation monotherme :
- se fait à T constante
+ met le système en contact avec une seule source de chaleur
- est toujours réversible
= Seules T initiale et T finale sont égales à celle de la source.

? Quelle affirmation est vraie ?
- toute transformation quasi-statique est réversible
+ toute transformation réversible est quasi-statique
- les transformations réelles sont réversibles
= Réversible = quasi-statique + retour possible par les mêmes états.

? 1 atm vaut :
- $10^5$ Pa
+ $1{,}01325\times10^5$ Pa
- 1 bar exactement
= 1 atm = 760 mmHg = 101 325 Pa.

? Le principe zéro concerne :
- la conservation de l'énergie
+ l'équilibre thermique
- l'entropie
= Il justifie la mesure de température.

? Lequel n'est **pas** une cause d'irréversibilité citée par le prof ?
- frottements
- effet Joule
+ compression infiniment lente sans frottement
= C'est au contraire le modèle de transformation réversible.
```

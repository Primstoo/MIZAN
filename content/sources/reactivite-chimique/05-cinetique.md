---
id: cinetique
titre: Notions de cinétique chimique
seance: Chapitre II · Vitesse, ordre, énergie d'activation
importance: 4
---

## Avant de commencer

Il faut savoir que $\ln$ et $\exp$ sont réciproques : $\ln(e^{-kt}) = -kt$.

```exercice Vérifie ton prérequis
? Résous $e^{-x} = 0{,}5$ (à 0,01 près).
= $x = \ln 2 \approx 0{,}69$.
reponse: 0.69
```

## Comment aborder ce chapitre

> [!astuce] **Pense « quelle fonction est une droite ? ».** Pour trouver l'ordre, teste : [A] (ordre 0), ln[A] (ordre 1) ou 1/[A] (ordre 2) en fonction du temps. Celle qui donne un k constant est la bonne.

> [!piege] Croire que t½ dépend toujours de [A]₀. Pour l'ordre 1, t½ = ln2/k ne dépend pas de la concentration initiale.

À la fin, tu sais trouver l'ordre, k, t½ et l'énergie d'activation.

## Idée 1 · Les lois de vitesse intégrées

```grille Ordres 0, 1, 2
#cols: Ordre, Loi intégrée, Droite, t½, Unité de k
*0, [A] = [A]₀ − kt, [A] = f(t), [A]₀/(2k), mol·L⁻¹·s⁻¹
*1, ln([A]₀/[A]) = kt, ln[A] = f(t), ln2/k, s⁻¹
*2, 1/[A] − 1/[A]₀ = kt, 1/[A] = f(t), 1/(k[A]₀), L·mol⁻¹·s⁻¹
```

## Idée 2 · La loi d'Arrhenius

$$k = A\,e^{-E_a/RT} \qquad \ln\frac{k_2}{k_1} = \frac{E_a}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right)$$

```html
<svg viewBox="0 0 320 120" role="img" aria-label="Profil énergétique : barrière d'activation Ea entre réactifs et produits" style="max-width:360px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 80h60Q140-10 200 95h100" stroke="#D9824F"/><path d="M140 30v50" stroke-dasharray="3 4"/></g>
<g fill="currentColor" font-size="10"><text x="146" y="60">Ea</text><text x="20" y="95">réactifs</text><text x="250" y="112">produits</text></g>
</svg>
```

## Idée 3 · Méthode pour un tableau de mesures

```etapes Révision, exercice 14
1. Calcule k avec la loi d'ordre 1 pour chaque point : $k = \frac{1}{t}\ln\frac{[A]_0}{[A]}$.
2. On trouve 8,50·10⁻³ ; 8,51·10⁻³ ; 8,56·10⁻³ ; 8,51·10⁻³ ; 8,49·10⁻³ min⁻¹ : constant.
3. Ordre 1 confirmé ; k ≈ 8,5·10⁻³ min⁻¹.
4. t½ = ln2 / k ≈ 81,5 min.
```

## S'exercer

```exercice Application
? Avec la loi d'ordre 2 sur le même tableau, k est-il constant ?
= Non : (1/[A] − 10)/t donne 0,097 puis 0,111, 0,135… en croissant. L'ordre 2 est exclu.

? t½ pour k = 8,5·10⁻³ min⁻¹ (ordre 1) ?
= ln2 / 8,5·10⁻³ ≈ **81,5 min**.
reponse: 81.5
```

> [!attention] Exercice 14 c : le rapport des constantes entre 25 °C et 50 °C n'apparaît pas dans le fichier. Méthode : $E_a = \frac{R\ln(k_2/k_1)}{1/T_1 - 1/T_2}$ avec T₁ = 298 K et T₂ = 323 K. Par exemple, un rapport de 5 donnerait Ea ≈ 51,5 kJ/mol.

## Flashcards

```cartes
Test de l'ordre 1 :: ln[A] linéaire en t ; k constant.
t½ (ordre 1) :: ln2/k, indépendant de [A]₀.
Arrhenius :: $k = Ae^{-E_a/RT}$.
Unité de k (ordre 1) :: s⁻¹ ou min⁻¹.
```

## QCM du chapitre

```qcm
? Pour l'ordre 1, la droite est :
+ ln[A] = f(t)
- [A] = f(t)
- 1/[A] = f(t)
= Pente −k.

? t½ d'ordre 1 :
+ ln2/k
- 1/(k[A]₀)
- [A]₀/(2k)
= Indépendant de [A]₀.

? Unité de k pour l'ordre 2 :
+ L·mol⁻¹·s⁻¹
- s⁻¹
- mol·L⁻¹·s⁻¹
= Selon la loi de vitesse.

? Quand T augmente, k :
+ augmente
- diminue
- ne change pas
= Arrhenius.

? Ea est :
+ la barrière d'énergie à franchir
- l'énergie libérée
- la température de réaction
= Énergie d'activation.

? Un catalyseur :
+ abaisse Ea
- augmente Ea
- change l'état final
= Même équilibre, atteint plus vite.

? Après 3 demi-vies (ordre 1), il reste :
+ 12,5 %
- 33 %
- 0 %
= (1/2)³.

? L'ordre de l'exercice 14 est :
+ 1
- 0
- 2
= k constant avec la loi d'ordre 1.

? Pour l'ordre 0, [A] décroît :
+ linéairement
- exponentiellement
- en 1/t
= [A]₀ − kt.

? R vaut :
+ 8,3 J·mol⁻¹·K⁻¹
- 0,06 V
- 6,02·10²³
= Constante des gaz.
```

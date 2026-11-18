---
id: ml-fondements-maths
titre: Fondements mathématiques de l'apprentissage
seance: Séance 3 · 12 octobre 2026
importance: 5
---

## Avant de commencer

Il te faut deux outils de maths : calculer une moyenne, et savoir qu'une dérivée donne la **pente** d'une courbe (positive : ça monte, négative : ça descend).

```exercice Vérifie ton prérequis
? Soit $J(w) = (w - 3)^2$. Que vaut la dérivée $J'(w)$ en $w = 0$ ? La fonction monte-t-elle ou descend-elle à cet endroit ?
indice: La dérivée de $(w - 3)^2$ est $2(w - 3)$.
reponse: -6
= $J'(0) = 2(0 - 3) = -6 < 0$ : la fonction descend vers la droite. Pour la faire baisser, il faut **augmenter** $w$.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « paysage ».** La fonction de coût $J(\theta)$ est un relief. Apprendre, c'est descendre vers le point le plus bas en suivant la pente. Tout le ML supervisé tient dans : $\theta^* = \arg\min_\theta J(\theta)$.

> [!piege] Confondre **erreur**, **perte** et **objectif**. L'erreur $e_i = y_i - \hat y_i$ peut être négative. La perte $L(y_i, \hat y_i) \ge 0$ concerne **une** observation. L'objectif $J(\theta)$ est la **moyenne** des pertes sur tout le train.

À la fin, tu sais écrire un modèle $\hat y = f_\theta(x)$, calculer MAE, MSE et RMSE, faire un pas de descente de gradient, expliquer biais et variance, et distinguer L1 (Lasso) et L2 (Ridge).

## Idée 1 · Du tableau à la matrice

L'exemple fil rouge du prof : trois logements.

```grille X (caractéristiques) et y (cible, en kDH)
#cols: Superficie Chambres *Prix
#rows: Log.1 Log.2 Log.3
60 2 *650
85 3 *900
120 4 *1250
```

$X \in \mathbb{R}^{3 \times 2}$ ($n = 3$ observations, $p = 2$ caractéristiques) et $y \in \mathbb{R}^3$. On lit $x_{12} = 2$ : la 2e caractéristique du 1er logement (deux chambres).

> [!attention] Le numéro du logement **identifie** l'observation, ce n'est pas une caractéristique utile pour prédire le prix.

## Idée 2 · Le modèle et ses paramètres

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:400px;display:block;margin:10px auto" role="img" aria-label="Deux droites de prédiction du prix en fonction de la superficie : y = 10x + 50 et une droite de pente plus faible y = 8x + 50">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M40 150H330M40 150V10" stroke="currentColor" stroke-width="1.5"/>
<line x1="40" y1="140" x2="320" y2="20" stroke="#D9824F" stroke-width="2.5"/>
<line x1="40" y1="140" x2="320" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="230" y="40" fill="#D9824F">ŷ = 10x + 50</text><text x="240" y="85">ŷ = 8x + 50</text>
<text x="290" y="165">superficie x</text><text x="45" y="20">prix ŷ</text></g>
</svg>
```

Le modèle le plus simple : $\hat y = wx + b$. $w$ (le **poids**) règle la pente, $b$ (le **biais**) le décalage vertical. Ici $\theta = (w, b)$.

Avec $w = 10$ et $b = 50$ : pour 60 m², $\hat y = 10 \times 60 + 50 = 650$ kDH. Ce modèle reproduit exactement les trois logements, et prédit 1 050 kDH pour 100 m².

| Paramètres | Prédiction pour 60 m² |
|---|---|
| $w = 10,\ b = 50$ | 650 kDH |
| $w = 8,\ b = 50$ | 530 kDH |
| $w = 10,\ b = 100$ | 700 kDH |

En réalité $y = f(x) + \varepsilon$ : le **bruit irréductible** $\varepsilon$ (localisation, état, étage non mesurés) fait qu'aucun modèle réel n'est parfait.

## Idée 3 · Mesurer l'erreur : MAE, MSE, RMSE

Un modèle prédit 630, 940 et 1 200 pour des prix réels 650, 900 et 1 250. Erreurs : $e = [20, -40, 50]$.

```etapes Les trois métriques sur cet exemple
MAE :: $\dfrac{|20| + |-40| + |50|}{3} = \dfrac{110}{3} \approx 36{,}67$ kDH. Même unité que $y$.
MSE :: $\dfrac{20^2 + 40^2 + 50^2}{3} = \dfrac{400 + 1600 + 2500}{3} = 1500$ kDH². Unité au carré.
RMSE :: $\sqrt{1500} \approx 38{,}73$ kDH. On revient à l'unité de $y$.
```

| | MAE | MSE | RMSE |
|---|---|---|---|
| Pénalité | linéaire | quadratique | quadratique |
| Outliers | robuste | très sensible | très sensible |
| Unité | celle de $y$ | $y^2$ | celle de $y$ |
| Dérivable partout | non (angle en 0) | oui | non en 0 |
| Analogie | médiane | moyenne | — |

Une erreur 10 fois plus grande coûte 10 fois plus en MAE, mais **100 fois** plus en MSE. Avec la MSE, un seul outlier tire fortement le modèle : le nettoyage des valeurs aberrantes devient indispensable.

> [!retenir] **La hiérarchie** : erreur $e_i$ (signée) → perte $L_i \ge 0$ (une observation) → objectif $J(\theta) = \frac{1}{n}\sum L_i$ (tout le train). Minimiser $J$ sur l'échantillon s'appelle la **minimisation du risque empirique** (ERM).

| Problème | Perte | Objectif |
|---|---|---|
| Régression | $(y_i - \hat y_i)^2$ | MSE |
| Classification | entropie croisée (log loss) | log loss moyenne |
| Clustering (K-Means) | $\lVert x_i - \mu_{c_i} \rVert^2$ | inertie |
| Réduction de dimension (ACP) | — | erreur de reconstruction |

## Idée 4 · La descente de gradient

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:400px;display:block;margin:10px auto" role="img" aria-label="Une parabole J(w) avec un point de départ w0 à gauche et des pas successifs qui descendent vers le minimum w étoile">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M30 20Q170 260 310 20" fill="none" stroke="currentColor" stroke-width="2"/>
<circle cx="52" cy="54" r="5" fill="#D9824F"/><circle cx="92" cy="104" r="5" fill="#D9824F" fill-opacity=".7"/><circle cx="124" cy="126" r="5" fill="#D9824F" fill-opacity=".5"/>
<circle cx="170" cy="140" r="5" fill="currentColor"/>
<path d="M57 60L86 97M97 109L118 122" stroke="#D9824F" stroke-width="1.5"/>
<text x="20" y="48">w₀ = 0</text><text x="98" y="96">w₁ = 0,6</text><text x="130" y="122">w₂ = 1,08</text><text x="160" y="160">w* = 3</text></g>
</svg>
```

Règle de mise à jour, avec le taux d'apprentissage $\eta$ :

$$w \leftarrow w - \eta \,\frac{dJ}{dw}$$

Si la pente est négative, on **augmente** $w$ ; si elle est positive, on le diminue. On va toujours **à l'opposé du gradient**, car le gradient indique la direction de plus forte **hausse**.

```etapes L'exemple du prof : J(w) = (w − 3)², η = 0,1, départ w₀ = 0
Pente en w₀ :: $J'(w) = 2(w - 3)$, donc $J'(0) = -6$.
Pas 1 :: $w_1 = 0 - 0{,}1 \times (-6) = 0{,}6$.
Pente en w₁ :: $J'(0{,}6) = 2(0{,}6 - 3) = -4{,}8$.
Pas 2 :: $w_2 = 0{,}6 - 0{,}1 \times (-4{,}8) = 1{,}08$. On se rapproche de $w^* = 3$.
```

```python
w, eta = 0.0, 0.1
for t in range(3):
    w = w - eta * 2 * (w - 3)
    print(round(w, 4))
```

```sortie
0.6
1.08
1.464
```

**Le taux d'apprentissage $\eta$** est un hyperparamètre : trop petit, la convergence est lente ; trop grand, l'algorithme oscille ou **diverge**.

| Variante | Gradient calculé sur | Compromis |
|---|---|---|
| Batch GD | les $n$ observations | exact mais lent |
| SGD (stochastique) | **une** observation tirée au hasard | rapide, trajectoire bruitée |
| Mini-batch GD | un lot de $B$ observations (32, 64, 128…) | **le standard** en pratique |

> [!attention] La descente de gradient exige une fonction différentiable. Les arbres de décision et le KNN n'apprennent **pas** par descente de gradient.

## Idée 5 · Biais, variance, compromis

$$\mathbb{E}\big[(y - \hat f(x))^2\big] = \text{Biais}^2 + \text{Variance} + \sigma^2$$

- **Biais** : erreur due à des hypothèses trop simples (une droite pour une relation courbe). → sous-apprentissage.
- **Variance** : sensibilité excessive aux fluctuations du train (le modèle change beaucoup si l'échantillon change). → surapprentissage.
- **$\sigma^2$** : le bruit irréductible.

```grille Les quatre situations de la cible du prof
#cols: Variance faible | Variance élevée
#rows: Biais faible | Biais élevé
*Modèle idéal | Surapprentissage
Sous-apprentissage | ~Pire scénario
```

L'**écart de généralisation** $\Delta E = E_{val} - E_{train}$ : proche de 0 avec une erreur faible = bonne généralisation ; s'il grandit fortement = surapprentissage. Une erreur d'entraînement **nulle** est souvent le signe d'un surapprentissage sévère.

| Biais élevé : que faire ? | Variance élevée : que faire ? |
|---|---|
| modèle plus complexe | plus de données |
| nouvelles variables | moins de variables |
| moins de régularisation | plus de régularisation |

On ne peut pas annuler les deux : baisser le biais augmente presque toujours la variance.

## Idée 6 · La régularisation : L1 et L2

$$J_{reg}(\theta) = J_{train}(\theta) + \lambda\, R(\theta), \quad \lambda \ge 0$$

| | L1 · **Lasso** | L2 · **Ridge** |
|---|---|---|
| Pénalité | $\sum \lvert w_j \rvert = \lVert w \rVert_1$ | $\sum w_j^2 = \lVert w \rVert_2^2$ |
| Effet | annule **exactement** certains coefficients | réduit tous les coefficients **sans les annuler** |
| Intérêt | sélection automatique de variables (*sparse*) | stabilité, variables corrélées (colinéarité) |
| Géométrie | contrainte à coins (losange) | contrainte lisse (cercle) |

**ElasticNet** combine les deux : $r\lVert w \rVert_1 + \frac{1-r}{2}\lVert w \rVert_2^2$. Le biais $b$ n'est en général **pas** pénalisé.

Exemple du prof avec $w_1 = 2,\ w_2 = -3$ : L1 $= 2 + 3 = 5$, L2 $= 4 + 9 = 13$. Ce n'est qu'une illustration : cela ne prouve pas que L2 pénalise toujours plus.

```flux Effet de λ
λ → 0 : peu contraint -> λ* : compromis biais-variance -> λ → ∞ : trop contraint
```

- $\lambda = 0$ : on retrouve l'objectif sans régularisation.
- $\lambda$ trop faible : surapprentissage. $\lambda$ trop grand : sous-apprentissage.

> [!piege] Choisir $\lambda$ par descente de gradient sur le train. Comme l'entraînement minimise l'erreur pure, on obtiendrait toujours $\lambda = 0$. On choisit $\lambda$ **sur la validation** (ou par validation croisée).

> [!retenir] La régularisation **modifie la fonction objectif**. Ce n'est pas un algorithme d'optimisation : on minimise ensuite $J_{reg}$ avec une méthode (formule fermée, descente de gradient…).

## S'exercer

```exercice Calculs du chapitre
? Erreurs $e = [10, -10, 20]$. Calcule la MAE.
reponse: 13.33 ~0.01
= $(10 + 10 + 20) / 3 = 40/3 \approx 13{,}33$.

? Même exemple : calcule la MSE.
reponse: 200
= $(100 + 100 + 400) / 3 = 200$.

? $J(w) = (w - 5)^2$, $\eta = 0{,}25$, $w_0 = 1$. Calcule $w_1$.
indice: $J'(w) = 2(w - 5)$.
reponse: 3
= $J'(1) = -8$, donc $w_1 = 1 - 0{,}25 \times (-8) = 3$.

? Coefficients $w = (1, -2, 0{,}5)$. Calcule la pénalité L2.
reponse: 5.25
= $1 + 4 + 0{,}25 = 5{,}25$. La pénalité L1 vaudrait $1 + 2 + 0{,}5 = 3{,}5$.
```

## Flashcards

```cartes
θ* = argmin J(θ) :: Apprendre = trouver les paramètres qui minimisent la fonction objectif sur le train.
Erreur, perte, objectif :: Erreur e = y − ŷ (signée) ; perte L ≥ 0 sur une observation ; objectif J = moyenne des pertes.
MAE vs MSE :: MAE : pénalité linéaire, robuste, unité de y. MSE : pénalité quadratique, sensible aux outliers, unité².
RMSE :: Racine de la MSE : pénalise les grandes erreurs mais revient à l'unité de y.
Descente de gradient :: w ← w − η · dJ/dw : on avance à l'opposé du gradient.
Taux d'apprentissage η :: Trop petit : lent. Trop grand : oscillations ou divergence.
SGD vs mini-batch :: SGD : une observation par pas (bruité). Mini-batch : un lot de B observations (standard).
Biais :: Erreur due à un modèle trop simple → sous-apprentissage.
Variance :: Sensibilité aux fluctuations du train → surapprentissage.
Lasso (L1) :: Pénalité Σ|wj| : annule certains coefficients → sélection de variables.
Ridge (L2) :: Pénalité Σwj² : réduit les coefficients sans les annuler → stabilité face à la colinéarité.
Choisir λ :: Sur la validation ou par validation croisée, jamais sur le train ni sur le test.
```

## QCM du chapitre

```qcm
? Dans $\hat y = f_\theta(x)$, que représente $\theta$ ?
+ les paramètres appris du modèle
- le bruit irréductible
- la valeur réelle de la cible
= $\theta$ regroupe les paramètres ajustés pendant l'entraînement, par exemple $(w, b)$.


? Avec $\hat y = 10x + 50$ (kDH), le prix prédit pour 100 m² est :
- 1 000 kDH
+ 1 050 kDH
- 1 500 kDH
= $10 \times 100 + 50 = 1\,050$.


? Prix réel 650, prix prédit 630. La perte quadratique vaut :
- 400 kDH
- 20
+ 400 kDH²
= $(650 - 630)^2 = 400$, exprimée dans le carré de l'unité.


? Quelle métrique est la plus **robuste** aux valeurs aberrantes ?
+ la MAE
- la MSE
- la RMSE
= La MAE pénalise linéairement ; MSE et RMSE élèvent les erreurs au carré.


? Une erreur multipliée par 10 multiplie la contribution à la MSE par :
- 10
+ 100
- 20
= Le carré : $10^2 = 100$.


? Pourquoi présenter la RMSE plutôt que la MSE à un décideur ?
- elle ignore les grandes erreurs
- elle est toujours plus petite
+ elle s'exprime dans l'unité de la cible
= La MSE est en unité², difficile à interpréter ; la racine revient à l'unité de $y$.


? La règle de mise à jour de la descente de gradient est :
+ $w \leftarrow w - \eta \, dJ/dw$
- $w \leftarrow \eta \, dJ/dw$
- $w \leftarrow w + \eta \, dJ/dw$
= On va à l'opposé du gradient, qui pointe vers la hausse.


? $J(w) = (w-3)^2$, $\eta = 0{,}1$, $w_0 = 0$. Que vaut $w_1$ ?
- 0,3
+ 0,6
- 1,08
= $w_1 = 0 - 0{,}1 \times 2(0 - 3) = 0{,}6$. Ensuite $w_2 = 1{,}08$.


? Un taux d'apprentissage trop grand peut provoquer :
- un sous-apprentissage garanti
- une convergence trop lente
+ des oscillations ou une divergence
= Les pas sautent par-dessus le minimum.


? Le gradient calculé sur **une seule** observation tirée au hasard correspond à :
+ la descente de gradient stochastique (SGD)
- la descente par mini-lots
- la descente de gradient batch
= La SGD est rapide à chaque pas, mais sa trajectoire est bruitée.


? Un modèle linéaire utilisé pour une relation fortement courbe souffre surtout de :
- bruit irréductible nul
+ biais élevé
- variance élevée
= Hypothèse trop simple : erreur systématique, sous-apprentissage.


? Un modèle dont les prédictions changent beaucoup quand on change un peu l'échantillon d'entraînement a :
- une régularisation trop forte
- un biais élevé
+ une variance élevée
= La variance mesure la sensibilité aux fluctuations du train.


? Quelle régularisation peut annuler **exactement** certains coefficients ?
+ L1 (Lasso)
- L2 (Ridge)
- aucune des deux
= Sa contrainte à coins pousse des $w_j$ à 0 : sélection automatique de variables.


? Si $\lambda \to \infty$ en régularisation :
- le modèle surapprend
+ les poids tendent vers 0 et le modèle sous-apprend
- on retrouve la régression sans pénalité
= C'est $\lambda = 0$ qui redonne le modèle non régularisé.


? Comment choisir $\lambda$ ?
- en minimisant l'erreur d'entraînement
- sur le jeu de test
+ sur un jeu de validation ou par validation croisée
= Sur le train on trouverait toujours $\lambda = 0$ ; le test doit rester intact.


? La régularisation est :
+ une modification de la fonction objectif
- une méthode de séparation des données
- un algorithme d'optimisation
= Elle ajoute $\lambda R(\theta)$ à $J$ ; on minimise ensuite avec un optimiseur.
```

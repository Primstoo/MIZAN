---
id: ml-regression
titre: Régression linéaire, polynomiale et régularisée
seance: Séance 4 · 22 octobre 2026 (+ rappel mathématique)
importance: 5
---

## Avant de commencer

Il te faut la moyenne, la notion de variance, et la règle de mise à jour de la descente de gradient (chapitre 3).

```exercice Vérifie ton prérequis
? Calcule la moyenne et la variance de $x = [50, 70, 90, 110]$ (variance = moyenne des carrés des écarts à la moyenne).
indice: Écarts à la moyenne : −30, −10, 10, 30.
reponse: 500
= Moyenne $\bar x = 80$. Variance $= (900 + 100 + 100 + 900) / 4 = 500$. Ce sont exactement les valeurs de l'exemple du prof.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « droite qui passe au mieux ».** La régression linéaire choisit la droite (ou le plan) qui rend la somme des **carrés des erreurs verticales** la plus petite possible. Toutes les formules en découlent.

> [!piege] Croire que « linéaire » veut dire « droite en $x$ ». Le modèle doit être linéaire **en ses paramètres**. $\hat y = w_0 + w_1 x + w_2 x^2$ est une régression **linéaire** (polynomiale), même si la courbe est une parabole.

À la fin, tu sais calculer $w$ et $b$ par les moindres carrés, interpréter un coefficient, calculer MAE, RMSE et $R^2$, et expliquer quand utiliser la régression polynomiale, Ridge ou Lasso.

## Idée 1 · La régression linéaire simple

```html
<svg viewBox="0 0 340 180" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Quatre points de prix en fonction de la superficie, la droite des moindres carrés et les résidus verticaux en pointillés">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M40 160H330M40 160V10" stroke="currentColor" stroke-width="1.5"/>
<line x1="60" y1="140" x2="320" y2="25" stroke="#D9824F" stroke-width="2.5"/>
<g stroke="currentColor" stroke-dasharray="3 3"><line x1="90" y1="128" x2="90" y2="126"/><line x1="150" y1="104" x2="150" y2="100"/><line x1="210" y1="64" x2="210" y2="74"/><line x1="270" y1="52" x2="270" y2="47"/></g>
<circle cx="90" cy="127" r="4.5"/><circle cx="150" cy="104" r="4.5"/><circle cx="210" cy="64" r="4.5"/><circle cx="270" cy="52" r="4.5"/>
<text x="240" y="22" fill="#D9824F">ŷ = 9,35x + 34,5</text><text x="215" y="90">résidu e₃ = +24</text>
<text x="280" y="176">superficie (m²)</text><text x="45" y="18">prix (kDH)</text></g>
</svg>
```

$$\hat y = wx + b$$

- $w$ : la **pente**, la hausse prédite pour une unité de $x$ en plus ;
- $b$ : l'**ordonnée à l'origine**, la valeur prédite pour $x = 0$ ;
- le **résidu** $e_i = y_i - \hat y_i$ : distance **verticale** entre le point et la droite. $e_i > 0$ : le modèle a **sous-estimé** ; $e_i < 0$ : il a **surestimé**.

**Les moindres carrés ordinaires (MCO).** On minimise $J(w, b) = \frac1n \sum (y_i - wx_i - b)^2$. $J$ est convexe (un bol) : son minimum est là où les dérivées partielles s'annulent. On obtient :

$$w = \frac{\text{Cov}(x, y)}{\text{Var}(x)} = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \qquad b = \bar y - w\,\bar x$$

```etapes L'exemple du prof : (50, 500), (70, 680), (90, 900), (110, 1050)
Moyennes :: $\bar x = 80$ m², $\bar y = 782{,}5$ kDH.
Variance de x :: $\text{Var}(x) = (900 + 100 + 100 + 900)/4 = 500$.
Covariance :: $\big[(-30)(-282{,}5) + (-10)(-102{,}5) + (10)(117{,}5) + (30)(267{,}5)\big]/4 = 18\,700/4 = 4\,675$.
Pente :: $w = 4\,675 / 500 = 9{,}35$ kDH par m², soit 9 350 DH/m².
Biais :: $b = 782{,}5 - 9{,}35 \times 80 = 34{,}5$ kDH.
Prédiction :: $\hat y(80) = 9{,}35 \times 80 + 34{,}5 = 782{,}5$ kDH. Normal : la droite passe par le point moyen $(\bar x, \bar y)$.
```

```grille Prédictions et résidus de la droite ŷ = 9,35x + 34,5
#cols: x y ŷ *e
#rows: L1 L2 L3 L4
50 500 502 *-2
70 680 689 *-9
90 900 876 *24
110 1050 1063 *-13
```

> [!retenir] Avec un biais $b$, la somme des résidus MCO est **toujours nulle** : $-2 - 9 + 24 - 13 = 0$. C'est pour ça qu'on ne peut pas mesurer l'erreur par $\sum e_i$ : on prend des carrés ou des valeurs absolues.

**Interprétation.** $b = 34{,}5$ n'a pas de sens économique (un logement de 0 m² n'existe pas), mais il cale la droite. Changer d'unité change $w$, pas la qualité du modèle : en DH au lieu de kDH, $w$ et $b$ sont multipliés par 1 000.

**Corrélation n'est pas causalité** : le modèle montre une association entre surface et prix, pas que la surface est la seule cause du prix.

**Interpolation ou extrapolation ?** Les données vont de 50 à 110 m². Prédire pour 80 m² est une **interpolation** (risque faible). Prédire pour un château de 1 000 m² est une **extrapolation** : on suppose que la droite continue à l'infini, souvent faux.

## Idée 2 · La régression linéaire multiple

$$\hat y = w_1 x_1 + w_2 x_2 + \dots + w_p x_p + b = w^T x + b$$

Avec $p = 1$ c'est une droite, avec $p = 2$ un **plan**, au-delà un **hyperplan**.

Exemple du prof : $\hat y = 8x_1 + 30x_2 - 5x_3 + 100$ (surface, chambres, distance en km ; prix en kDH). Pour 80 m², 3 chambres, 5 km :

$$\hat y = 640 + 90 - 25 + 100 = 805 \text{ kDH}$$

**Toutes choses égales par ailleurs** (*ceteris paribus*) : $w_3 = -5$ signifie qu'à surface et chambres identiques, 1 km de plus fait baisser la prédiction de 5 000 DH.

> [!piege] **Multicolinéarité.** Si deux variables sont très corrélées (surface et nombre de chambres), leurs coefficients deviennent instables et difficiles à interpréter un par un. Tu le verras dans le code plus bas.

**Forme matricielle.** On ajoute une colonne de 1 à $X$ pour absorber le biais ($\tilde X$). On minimise $\frac1n\lVert y - \tilde X \tilde w \rVert^2$ ; le gradient s'annule pour les **équations normales** :

$$\tilde X^T \tilde X\, \tilde w = \tilde X^T y \quad\Longrightarrow\quad \hat w = (\tilde X^T \tilde X)^{-1} \tilde X^T y$$

Il faut que $\tilde X^T \tilde X$ soit inversible : pas de multicolinéarité **parfaite**. Géométriquement, $\hat y = Hy$ est la **projection orthogonale** de $y$ sur l'espace engendré par les colonnes de $\tilde X$, et les résidus sont orthogonaux à ces colonnes : $\tilde X^T e = 0$.

> [!prof] Le rappel mathématique du prof démontre ces formules pas à pas (dérivée par rapport à $b$, puis à $w$, règle de la chaîne, propriété $\sum (y_i - \bar y) = 0$). En QCM, retiens surtout le résultat et les conditions.

## Idée 3 · Évaluer une régression

$$\text{MAE} = \frac1n \sum |e_i| \qquad \text{MSE} = \frac1n \sum e_i^2 \qquad \text{RMSE} = \sqrt{\text{MSE}}$$

$$R^2 = 1 - \frac{SS_{res}}{SS_{tot}} = 1 - \frac{\sum (y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}$$

```etapes Les 4 logements, e = [−2, −9, 24, −13]
MAE :: $(2 + 9 + 24 + 13)/4 = 12$ kDH.
MSE :: $(4 + 81 + 576 + 169)/4 = 830/4 = 207{,}5$ kDH².
RMSE :: $\sqrt{207{,}5} \approx 14{,}4$ kDH.
SS_tot :: $282{,}5^2 + 102{,}5^2 + 117{,}5^2 + 267{,}5^2 = 175\,675$.
R² :: $1 - 830 / 175\,675 \approx 0{,}9953$, calculé sur le train : il ne prouve pas la généralisation.
```

> [!attention] La diapo écrit $SS_{tot} = 178\,875$. Le bon total est **175 675** (refais l'addition : 79 806,25 + 10 506,25 + 13 806,25 + 71 556,25). Le $R^2 \approx 0{,}9953$ annoncé reste juste à quatre décimales.

| $R^2$ | Lecture |
|---|---|
| $= 1$ | ajustement parfait |
| $= 0$ | le modèle ne fait pas mieux que prédire la moyenne $\bar y$ |
| $< 0$ | pire que la moyenne (possible sur le test) |

> [!piege] $R^2 = 0{,}95$ ne veut pas dire « 95 % des prédictions sont exactes ». Il veut dire que **95 % de la variance** de $y$ est expliquée par le modèle.

**MAE ou RMSE ?** Modèle A : erreurs $[0, 20]$. Modèle B : $[10, 10]$. Même MAE (10), mais RMSE de A $= \sqrt{200} \approx 14{,}14$ contre 10 pour B. La RMSE punit la grosse erreur isolée : choisis-la si les grands écarts sont inacceptables.

## Idée 4 · Quand la droite ne suffit pas : la régression polynomiale

On enrichit les features : $x \to (x, x^2, \dots, x^d)$, puis on applique les MCO.

$$\hat y = w_0 + w_1 x + w_2 x^2 + \dots + w_d x^d$$

Non linéaire en $x$, mais **linéaire en $w$** : la solution reste $\hat w = (\Phi^T\Phi)^{-1}\Phi^T y$, avec $\Phi$ la **matrice de Vandermonde**.

```etapes Exemple du prof : x = −2, −1, 0, 1, 2 et y = x²
Droite (d = 1) :: Par symétrie la pente est nulle : $\hat y = \bar y = 2$. MSE $= (4 + 1 + 4 + 1 + 4)/5 = 2{,}8$. Biais fort.
Parabole (d = 2) :: Les MCO donnent $\hat y = x^2$ : MSE = 0, ajustement parfait.
Degré 9 :: Erreur d'entraînement nulle, erreur de test qui explose : surapprentissage.
```

Le **degré $d$** est un hyperparamètre : on le choisit sur la validation. Pour des degrés élevés, $\Phi^T\Phi$ est **mal conditionnée** : il faut standardiser.

Avec deux variables, `PolynomialFeatures(degree=2)` crée $x_1, x_2, x_1^2, x_2^2$ et l'**interaction** $x_1 x_2$. `include_bias=False` évite une colonne de 1 en double, car `LinearRegression` calcule déjà son biais.

## Idée 5 · Ridge et Lasso en pratique

$$\text{Ridge : } \min\ \text{MSE}(w) + \alpha \sum w_j^2 \qquad \text{Lasso : } \min\ \text{MSE}(w) + \alpha \sum |w_j|$$

En scikit-learn, la force de régularisation s'appelle `alpha` ($\alpha = 0$ : MCO classique ; $\alpha \to \infty$ : tous les poids vers 0). La standardisation est **obligatoire** avant Ridge ou Lasso : sinon la pénalité frappe plus fort les variables à petite échelle.

Voici l'atelier du prof, exécuté (10 logements, 70 % / 30 %).

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = pd.DataFrame({
    "Surface": [50, 65, 80, 90, 110, 120, 140, 160, 180, 200],
    "Chambres": [1, 2, 2, 3, 3, 4, 4, 4, 5, 5],
    "Distance_KM": [12.0, 10.5, 8.0, 6.5, 5.0, 4.0, 3.0, 2.5, 1.5, 1.0],
    "Prix_kDH": [150, 185, 230, 270, 310, 360, 410, 450, 520, 580],
})
X = data[["Surface", "Chambres", "Distance_KM"]]
y = data["Prix_kDH"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

lr = LinearRegression().fit(X_train, y_train)
print("w :", np.round(lr.coef_, 3), " b :", round(lr.intercept_, 3))
p = lr.predict(X_test)
print(f"MAE = {mean_absolute_error(y_test, p):.2f}  RMSE = {np.sqrt(mean_squared_error(y_test, p)):.2f}  R2 = {r2_score(y_test, p):.4f}")

for nom, modele in [("Poly + MCO", LinearRegression()), ("Poly + Ridge", Ridge(alpha=10.0)), ("Poly + Lasso", Lasso(alpha=2.0))]:
    pipe = make_pipeline(PolynomialFeatures(degree=2, include_bias=False), StandardScaler(), modele)
    pipe.fit(X_train, y_train)
    nuls = int(np.sum(np.abs(pipe[-1].coef_) < 1e-9))
    print(f"{nom} : R2 test = {pipe.score(X_test, y_test):.4f}, coefficients nuls = {nuls}/9")
```

```sortie
w : [ 2.637 33.079  9.046]  b : -122.938
MAE = 12.49  RMSE = 15.57  R2 = 0.9870
Poly + MCO : R2 test = 0.9646, coefficients nuls = 0/9
Poly + Ridge : R2 test = 0.9952, coefficients nuls = 0/9
Poly + Lasso : R2 test = 0.9931, coefficients nuls = 5/9
```

Ce que ce résultat montre :

- Le coefficient de la distance est **positif** (+9) : absurde « toutes choses égales par ailleurs ». C'est la multicolinéarité : surface, chambres et distance évoluent ensemble dans ces données.
- Le polynôme seul fait **moins bien** sur le test (0,9646) que le linéaire (0,9870) : 9 features pour 7 logements, il surapprend.
- Ridge et Lasso corrigent ce surapprentissage. Lasso met **5 coefficients sur 9 à zéro** : sélection de variables.
- `pipe.score(X_test, y_test)` renvoie directement le $R^2$.

> [!attention] Sur les diapos, le code de l'atelier a des erreurs de copie : la parenthèse `})` qui ferme le `DataFrame` manque, et la ligne `r2 = r2_score(...)` a perdu son nom de variable. Le commentaire parle de « k€ » et de `Prix_kEUR` alors que tout le cours est en kDH. Le code ci-dessus est corrigé.

## S'exercer

```exercice Régression à la main
? Données $(1, 2), (2, 3), (3, 5), (4, 6), (5, 9)$ (expérience en années, salaire), exemple du rappel mathématique du prof. Calcule la pente $w$ par les MCO.
indice: $\bar x = 3$, $\bar y = 5$. Écarts de x : −2, −1, 0, 1, 2. Écarts de y : −3, −2, 0, 1, 4.
reponse: 1.7
= $\sum (x_i - \bar x)(y_i - \bar y) = 6 + 2 + 0 + 1 + 8 = 17$ et $\sum (x_i - \bar x)^2 = 10$, donc $w = 1{,}7$.

? Même exemple : calcule $b$.
reponse: -0.1 ~0.001
= $b = \bar y - w\bar x = 5 - 1{,}7 \times 3 = -0{,}1$.

? Avec $\hat y = 8x_1 + 30x_2 - 5x_3 + 100$, prédis le prix (kDH) d'un logement de 100 m², 2 chambres, à 4 km.
reponse: 940
= $800 + 60 - 20 + 100 = 940$ kDH.

? Un résidu vaut $e_i = -15$. Le modèle a-t-il sous-estimé ou surestimé ?
= Surestimé : $e_i = y_i - \hat y_i = -15$ donne $\hat y_i = y_i + 15$.
```

## Flashcards

```cartes
MCO (simple) :: w = Cov(x, y) / Var(x) ; b = ȳ − w x̄. La droite passe par (x̄, ȳ).
Résidu :: e = y − ŷ, distance verticale. e > 0 : sous-estimation ; e < 0 : surestimation.
Somme des résidus MCO :: Toujours nulle quand le modèle a un biais b.
Équations normales :: X̃ᵀX̃ w̃ = X̃ᵀy, donc ŵ = (X̃ᵀX̃)⁻¹X̃ᵀy si X̃ᵀX̃ est inversible.
Ceteris paribus :: Un coefficient wj mesure l'effet de xj quand toutes les autres variables restent fixes.
Multicolinéarité :: Variables très corrélées : coefficients instables et difficiles à interpréter.
R² :: 1 − SSres/SStot : part de la variance de y expliquée. 0 = pas mieux que la moyenne ; < 0 possible sur le test.
Interpolation vs extrapolation :: Prédire dans l'intervalle des données (sûr) ou en dehors (dangereux).
Régression polynomiale :: Features x, x², …, x^d ; non linéaire en x mais linéaire en w.
include_bias=False :: Dans PolynomialFeatures, évite une colonne de 1 en double avec LinearRegression.
alpha en scikit-learn :: Force de régularisation de Ridge et Lasso (λ dans le cours).
```

## QCM du chapitre

```qcm
? Les MCO cherchent la droite qui minimise :
- la somme des résidus
+ la somme des carrés des résidus
- la plus grande erreur absolue
= La somme brute des résidus vaut toujours 0 avec un biais : il faut des carrés.


? En régression simple, la pente MCO vaut :
- $\text{Var}(x) / \text{Cov}(x, y)$
- $\bar y / \bar x$
+ $\text{Cov}(x, y) / \text{Var}(x)$
= Puis $b = \bar y - w \bar x$.


? La droite des moindres carrés passe toujours par :
+ le point moyen $(\bar x, \bar y)$
- le premier point des données
- l'origine $(0, 0)$
= $b = \bar y - w\bar x$ donne $\hat y(\bar x) = \bar y$.


? Dans l'exemple du prof, $w = 9{,}35$ signifie :
- le prix est divisé par 9,35
+ chaque m² en plus augmente le prix prédit de 9 350 DH
- un logement coûte 9,35 kDH
= La pente est la hausse de $\hat y$ pour une unité de $x$ en plus (ici en kDH).


? Un résidu $e_i = y_i - \hat y_i > 0$ signifie que le modèle a :
- surestimé la valeur réelle
- fait une prédiction exacte
+ sous-estimé la valeur réelle
= $y_i > \hat y_i$ : la prédiction est trop basse.


? Les données vont de 50 à 110 m². Prédire le prix d'un bien de 1 000 m², c'est :
+ une extrapolation risquée
- impossible mathématiquement
- une interpolation sûre
= On suppose que la tendance linéaire continue bien au-delà des données observées.


? La formule $\hat w = (\tilde X^T \tilde X)^{-1} \tilde X^T y$ exige que :
- $y$ soit centré
+ $\tilde X^T \tilde X$ soit inversible (pas de multicolinéarité parfaite)
- toutes les variables soient positives
= Si une colonne est combinaison exacte des autres, la matrice n'est pas inversible.


? Avec $\hat y = 8x_1 + 30x_2 - 5x_3 + 100$, que vaut $\hat y$ pour $(80, 3, 5)$ ?
- 830 kDH
- 780 kDH
+ 805 kDH
= $640 + 90 - 25 + 100 = 805$.


? Le terme « linéaire » dans « régression linéaire » signifie :
+ le modèle est linéaire par rapport à ses paramètres
- les données sont équidistantes
- la courbe est forcément une droite en $x$
= C'est pour ça que la régression polynomiale reste une régression linéaire.


? $R^2 = 0$ signifie que le modèle :
- est parfait
+ ne fait pas mieux que prédire la moyenne $\bar y$
- est pire que la moyenne
= $SS_{res} = SS_{tot}$. Un $R^2$ négatif voudrait dire pire que la moyenne.


? $R^2 = 0{,}95$ signifie :
- l'erreur moyenne est de 5 %
- 95 % des prédictions sont exactes
+ 95 % de la variance de $y$ est expliquée par le modèle
= C'est une part de variance expliquée, pas un taux de bonnes réponses.


? Erreurs du modèle A : $[0, 20]$ ; du modèle B : $[10, 10]$. Lequel a la plus grande RMSE ?
+ A
- B
- elles sont égales
= Même MAE (10), mais RMSE(A) $\approx 14{,}14$ contre 10 : la RMSE punit l'erreur isolée de 20.


? Pour $x = -2..2$ et $y = x^2$, la meilleure droite a une MSE de :
- 0
+ 2,8
- 2
= La droite est $\hat y = 2$ ; MSE $= (4 + 1 + 4 + 1 + 4)/5 = 2{,}8$. Le degré 2 donne 0.


? Pourquoi `include_bias=False` dans `PolynomialFeatures` suivi de `LinearRegression` ?
- pour standardiser les données
- pour supprimer les termes d'interaction
+ parce que `LinearRegression` calcule déjà son propre biais
= Sinon on aurait une colonne de 1 en double.


? Dans le code exécuté du chapitre, quel modèle met des coefficients exactement à zéro ?
+ Lasso
- la régression polynomiale sans pénalité
- Ridge
= Lasso (L1) annule 5 coefficients sur 9 : sélection automatique de variables.


? Pourquoi standardiser avant Ridge ou Lasso ?
- pour que $R^2$ soit positif
+ pour que la pénalité traite toutes les variables à la même échelle
- parce que ces modèles n'acceptent que des valeurs entre 0 et 1
= La pénalité porte sur la taille des coefficients, qui dépend de l'unité de chaque variable.
```

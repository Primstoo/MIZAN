---
id: ml-revision
titre: Révision express et examen blanc QCM
seance: Préparation de l'examen · décembre 2026
importance: 5
---

## Avant de commencer

Ce chapitre résume les chapitres 1 à 8. Fais-le **après** les QCM des chapitres, puis refais-le la veille de l'examen. Le prof a annoncé un examen à au moins 90 % de QCM, entre la 3e et la 4e semaine de décembre.

```exercice Vérifie ton prérequis
? Sans regarder le cours : donne les formules de la précision et du rappel.
= Précision $= TP/(TP + FP)$. Rappel $= TP/(TP + FN)$. Si tu as hésité, refais le QCM du chapitre 2 avant de continuer.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « élimination ».** En QCM, deux options sont souvent fausses pour une raison évidente (mauvaise formule, mauvais sens d'une inégalité). Élimine-les, puis départage les deux restantes avec un mini-calcul.

> [!piege] Les trois inversions qui coûtent le plus de points : précision ↔ rappel, L1 ↔ L2, biais ↔ variance. Relis le tableau ci-dessous jusqu'à pouvoir le refaire de tête.

À la fin, tu as revu en une page tout ce qui tombe en QCM et tu t'es entraîné sur un examen blanc de 30 questions qui mélange les chapitres.

## Idée 1 · La fiche d'une page

| Thème | À savoir par cœur |
|---|---|
| Paradigmes | supervisé $(X, y)$ ; non supervisé $X$ seul ; renforcement (agent, état, action, récompense) |
| Cible | catégorie → classification ; nombre → régression |
| Données | train : paramètres ; validation : hyperparamètres ; test : une seule fois à la fin |
| Fuite | tout ce qui apprend ($\mu$, $\sigma$, médiane) se calcule sur le train → `Pipeline` |
| Encodage | nominale → One-Hot ; ordinale → Ordinal |
| Échelle | sensibles : KNN, K-Means, SVM, logistique, Ridge/Lasso ; insensibles : arbres, forêts |
| Erreurs | MAE linéaire, robuste ; MSE carré, sensible ; RMSE racine, unité de $y$ |
| Gradient | $w \leftarrow w - \eta\, dJ/dw$ ; $\eta$ trop grand → divergence |
| Biais / variance | biais = trop simple (sous-app.) ; variance = trop sensible (sur-app.) |
| L1 / L2 | Lasso annule des poids (sélection) ; Ridge les réduit (colinéarité) |
| MCO | $w = \text{Cov}/\text{Var}$, $b = \bar y - w\bar x$, $\sum e_i = 0$ |
| $R^2$ | $1 - SS_{res}/SS_{tot}$ ; 0 = moyenne ; < 0 possible sur le test |
| Logistique | $\sigma(z)$, frontière $w^Tx + b = 0$, log loss, $\nabla = (p - y)x$ |
| Softmax | $e^{z_k}/\sum e^{z_j}$ ; somme 1 ; $K = 2$ → sigmoïde |
| KNN | standardiser ; petit $k$ → variance ; grand $k$ → biais ; $k$ impair |
| Métriques | précision $TP/(TP+FP)$ ; rappel $TP/(TP+FN)$ ; spécificité $TN/(TN+FP)$ ; F1 harmonique |
| ROC / AUC | TPR vs FPR ; AUC 0,5 = hasard ; 1 = parfait |
| Arbres | entropie (max 1) ; Gini (max 0,5) ; ID3 gain ; C4.5 gain ratio ; CART Gini binaire |
| Forêts | bootstrap 63,2 % ; OOB 36,8 % ; `max_features` à chaque nœud ; vote / moyenne |
| K-Means | inertie ↓ quand $K$ ↑ ; coude ; silhouette $(b - a)/\max(a, b)$ |
| CAH | Single (chaîne), Complete (compacts), Average, Ward (inertie) ; couper au plus grand saut |
| DBSCAN | cœur ≥ MinPts dans $\varepsilon$ ; frontière ; bruit = −1 ; formes quelconques |

## Idée 2 · Les calculs qui tombent

```etapes Les dix mini-calculs à savoir faire en 30 secondes
Métriques :: TP = 40, FP = 10, FN = 20, TN = 130 → précision 0,8 ; rappel 0,667 ; accuracy 0,85 ; spécificité 0,929.
F1 :: $P = 0{,}9$, $R = 0{,}6$ → $F_1 = 2 \times 0{,}54 / 1{,}5 = 0{,}72$.
MAE / MSE :: $e = [20, -40, 50]$ → MAE ≈ 36,67 ; MSE = 1 500 ; RMSE ≈ 38,73.
Gradient :: $J = (w - 3)^2$, $\eta = 0{,}1$, $w_0 = 0$ → $w_1 = 0{,}6$, $w_2 = 1{,}08$.
MCO :: $\text{Cov} = 4\,675$, $\text{Var} = 500$, $\bar x = 80$, $\bar y = 782{,}5$ → $w = 9{,}35$, $b = 34{,}5$.
Sigmoïde :: $z = 1$ → 0,731 ; $z = 0$ → 0,5 ; $z = 2$ → 0,881.
Entropie :: 6 / 4 → 0,971 ; 50 / 50 → 1 ; pur → 0.
Gini :: 6 / 4 → 0,48 ; 50 / 50 → 0,5 ; 8 / 2 → 0,32.
Distances :: (1, 2) et (4, 6) → euclidienne 5, Manhattan 7.
Silhouette :: $a = 2$, $b = 5$ → 0,6.
```

## Idée 3 · Les erreurs des diapos à connaître

> [!attention] Ces points ont été repérés en refaisant les calculs des séances. Si une question d'examen reprend l'un de ces exemples, fie-toi à la valeur correcte.

| Séance | Ce qui est écrit | Correction |
|---|---|---|
| 4 · évaluation | $SS_{tot} = 178\,875$ | **175 675** ; le $R^2 \approx 0{,}9953$ reste juste |
| 4 · atelier | `DataFrame({...` sans `})`, `= r2_score(...)` sans variable, unité k€ | code corrigé au chapitre 4, unité kDH |
| 2 · mise à l'échelle | standardisation « robuste aux outliers » | seulement **moins** sensible que Min-Max |
| 6 · gain d'information | gain = 0,0466, gain ratio = 0,0480 | valeurs exactes 0,0464 et 0,0478 (arrondis intermédiaires) |

## S'exercer

```exercice Trois questions ouvertes de synthèse
? Un modèle de détection de fraude a 99 % d'accuracy sur des données à 1 % de fraudes. Est-ce un bon modèle ?
= On ne peut pas conclure : un modèle qui dit toujours « pas de fraude » a aussi 99 %. Il faut regarder le **rappel** de la classe fraude, le F1, la matrice de confusion ou la PR-AUC.

? Pourquoi la forêt aléatoire ne demande-t-elle pas de standardisation, alors que KNN si ?
= Une forêt combine des arbres qui posent des seuils sur une variable à la fois : changer d'unité déplace le seuil sans changer la séparation. KNN calcule des **distances** entre points, qui dépendent directement des unités.

? Tu as 3 groupes de forme allongée et quelques points isolés. K-Means, CAH ou DBSCAN ?
= DBSCAN : il suit les zones denses (formes quelconques), découvre seul le nombre de groupes et marque les points isolés en bruit (−1). La CAH en Single linkage pourrait aussi suivre des formes allongées, mais sans détecter le bruit.
```

## Flashcards

```cartes
Les 3 inversions à éviter :: Précision ↔ rappel ; L1 (annule) ↔ L2 (réduit) ; biais (trop simple) ↔ variance (trop sensible).
Accuracy sur classes déséquilibrées :: Trompeuse : regarder rappel, F1, matrice de confusion, PR-AUC.
Modèles insensibles à l'échelle :: Arbres de décision, forêts aléatoires (et boosting d'arbres).
Où se calcule tout prétraitement :: Sur le train seulement, idéalement dans un Pipeline.
Valeurs maximales en binaire :: Entropie : 1. Gini : 0,5. Les deux valent 0 pour un nœud pur.
```

## QCM du chapitre

```qcm
? Un détecteur d'intrusion doit rater le moins d'attaques possible. On maximise :
- la précision
+ le rappel
- la spécificité
= Rater une attaque = faux négatif ; le rappel $TP/(TP + FN)$ les pénalise.


? On règle `max_depth` d'un arbre en comparant plusieurs valeurs sur le jeu de test. Conséquence :
- le modèle sous-apprend forcément
- aucune, c'est la méthode recommandée
+ le score de test devient optimiste : le test a servi à choisir le modèle
= Le réglage se fait par validation ou validation croisée.


? Quelle étape doit venir **en premier** ?
+ séparer train et test
- standardiser toutes les données
- imputer avec la médiane globale
= Toute transformation qui apprend se fait après la séparation, sur le train.


? Erreurs $[3, -3, 6]$. La MAE vaut :
- 2
+ 4
- 18
= $(3 + 3 + 6)/3 = 4$.


? Toujours avec $[3, -3, 6]$, la MSE vaut :
- 54
- 4
+ 18
= $(9 + 9 + 36)/3 = 18$.


? Le taux d'apprentissage est trop grand. On observe :
+ une fonction de coût qui oscille ou explose
- un minimum global garanti
- une convergence très lente mais sûre
= Les pas sautent par-dessus le minimum.


? Un modèle a 99 % sur le train et 70 % sur le test. Le diagnostic est :
- un biais élevé
+ une variance élevée (surapprentissage)
- une bonne généralisation
= Écart de généralisation important.


? Quelle méthode réalise une **sélection automatique de variables** ?
- Ridge
- les MCO sans pénalité
+ Lasso
= La pénalité L1 met des coefficients exactement à 0.


? Une régression avec biais a des résidus $-4,\ 1,\ x$. Que vaut $x$ ?
+ 3
- 0
- −3
= La somme des résidus MCO est nulle : $-4 + 1 + x = 0$.


? $R^2 = -0{,}3$ sur le test signifie que le modèle :
- explique 30 % de la variance
+ fait pire que prédire la moyenne
- est impossible
= $SS_{res} > SS_{tot}$ ; cela arrive sur des données inédites.


? La régression polynomiale de degré 3 est :
- non linéaire en ses paramètres
- un modèle de classification
+ linéaire en ses paramètres, donc résoluble par les MCO
= On ajoute $x^2$ et $x^3$ comme features, puis MCO.


? $z = w^Tx + b = -2$. La régression logistique prédit, avec le seuil 0,5 :
+ la classe 0
- une probabilité de −2
- la classe 1
= $\sigma(-2) \approx 0{,}12 < 0{,}5$.


? La perte utilisée pour entraîner la régression logistique est :
- la MSE
+ l'entropie croisée (log loss)
- l'indice de Gini
= Elle est convexe avec la sigmoïde.


? Classification à 10 classes exclusives avec un modèle unique dont les probabilités somment à 1 :
- sigmoïde seule
- One-vs-Rest
+ Softmax
= L'OvR entraîne 10 modèles indépendants dont les sorties ne somment pas à 1.


? KNN avec $k = n$ (toutes les observations) prédit :
+ toujours la classe majoritaire du jeu d'entraînement
- toujours la classe du point le plus proche
- une classe au hasard
= Tous les points votent, quelle que soit la position du nouveau point.


? TN = 90, FP = 10. La spécificité vaut :
- 0,1
+ 0,9
- 0,5
= $90/100$ ; le FPR vaut 0,1.


? Une AUC de 0,3 indique un modèle :
- parfait
- au hasard
+ pire que le hasard (inverser ses prédictions l'améliorerait)
= Sous 0,5, l'ordre des scores est majoritairement inversé.


? Courbe ROC : l'axe horizontal est :
+ le FPR = 1 − spécificité
- le rappel
- la précision
= L'axe vertical est le TPR (rappel).


? Entropie d'un nœud contenant 4 observations d'une seule classe :
- 0,5
+ 0
- 1
= Nœud pur.


? Gini d'un nœud binaire 50 / 50 :
- 0,25
- 1
+ 0,5
= $1 - 0{,}25 - 0{,}25$.


? Quel algorithme utilise le **gain ratio** ?
+ C4.5
- CART
- ID3
= ID3 : gain d'information ; CART : Gini.


? Arbre de régression : une feuille contient les prix 200, 220, 240. Elle prédit :
- 200
+ 220
- 240
= La moyenne des valeurs cibles de la feuille.


? Dans une forêt aléatoire, les observations out-of-bag d'un arbre sont :
- celles du jeu de test
- les observations aberrantes
+ celles absentes de son échantillon bootstrap
= Environ 36,8 % ; elles servent à estimer l'erreur.


? Le bagging réduit surtout :
+ la variance
- le bruit irréductible
- le biais
= Moyenner des modèles instables les stabilise.


? Quand $K$ augmente, l'inertie de K-Means :
- augmente
+ diminue
- reste stable
= D'où la méthode du coude, et la silhouette qui ne baisse pas mécaniquement.


? Silhouette d'un point avec $a(i) = 3$ et $b(i) = 3$ :
- 1
- −1
+ 0, le point est à la frontière
= $(3 - 3)/3 = 0$.


? Pour des groupes très compacts en CAH, avec prise en compte des effectifs, on choisit :
+ Ward
- Single
- Average
= Ward minimise la hausse d'inertie à chaque fusion.


? Un dendrogramme montre des fusions à 1 ; 1 ; 1,58 et 5,15. Combien de groupes en coupant au plus grand saut ?
- 1
+ 2
- 3
= Le plus grand saut est entre 1,58 et 5,15 : la coupe traverse 2 branches.


? DBSCAN, $\varepsilon = 1$, MinPts = 3. Un point a 2 points dans son voisinage (lui compris) et n'est voisin d'aucun point cœur. C'est :
- un point cœur
- un point frontière
+ du bruit (−1)
= Ni assez de voisins, ni rattaché à un cœur.


? Quel algorithme découvre **seul** le nombre de groupes et détecte le bruit ?
+ DBSCAN
- K-Means
- la CAH
= K-Means demande $K$ ; la CAH demande une coupe ; aucun des deux ne marque le bruit.
```

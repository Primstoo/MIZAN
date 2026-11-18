---
id: ml-cycle-de-vie
titre: Cycle de vie d'un projet de Machine Learning
seance: Séance 2 · 6 octobre 2026
importance: 5
---

## Avant de commencer

Tu dois savoir ce que sont $X$ (les caractéristiques), $y$ (la cible) et la différence entre classification et régression (chapitre 1).

```exercice Vérifie ton prérequis
? On veut prédire si une connexion est « Normale » ou « Attaque ». Quelle est la cible, et de quel type de problème s'agit-il ?
indice: La cible est la réponse que le modèle doit produire.
= La cible est la classe Normale / Attaque : c'est une classification binaire. Les features sont la durée, les paquets, les octets, le protocole…
```

## Comment aborder ce chapitre

> [!astuce] **Pense « étanchéité ».** Presque toutes les règles de ce chapitre disent la même chose : le jeu de test ne doit **jamais** influencer ce que le modèle apprend, ni directement ni indirectement.

> [!piege] Standardiser ou imputer **avant** de séparer train et test. La moyenne ou la médiane calculée sur toutes les données contient de l'information du test : c'est une **fuite de données** (*data leakage*).

À la fin, tu sais préparer les données (manquants, encodage, mise à l'échelle), séparer train / validation / test, utiliser la validation croisée, calculer les métriques de classification et de régression, et reconnaître sous- et surapprentissage.

## Idée 1 · Le cycle complet

```flux Les étapes d'un projet ML (le cycle est itératif)
Problème -> Données -> Préparation -> Séparation -> Modélisation -> Évaluation -> Optimisation -> Déploiement et surveillance
```

Avant tout algorithme, quatre questions : quelle décision veut-on prendre ? Quelles informations sont disponibles ? Existe-t-il une réponse connue à apprendre ? Comment mesurer la qualité ?

> [!attention] Une caractéristique doit être **disponible au moment de la prédiction**. Une information connue seulement après l'événement crée une fuite d'information.

L'**exploration** (EDA) n'est pas décorative : elle mène à des décisions.

| Ce que l'EDA révèle | Décision |
|---|---|
| valeurs manquantes | supprimer ou imputer ? |
| variable catégorielle | quel encodage ? |
| échelles très différentes | standardiser ? |
| valeurs extrêmes | erreur ou vraie observation ? |
| classes déséquilibrées | quelle métrique ? (pas l'accuracy seule) |

## Idée 2 · Préparer les données

**Valeurs manquantes.** On peut supprimer (si justifié), **imputer** (remplacer par la moyenne, la médiane ou le mode), ou utiliser un modèle qui les gère. La valeur d'imputation se calcule **sur $X_{train}$ seulement**.

**Variables catégorielles.**

```grille One-Hot Encoding du protocole : une colonne binaire par catégorie
#cols: Protocole *TCP *UDP *ICMP
#rows: c1 c2 c3
TCP *1 0 0
UDP 0 *1 0
ICMP 0 0 *1
```

| Variable | Exemple | Encodage |
|---|---|---|
| **nominale** (pas d'ordre) | protocole, pays, couleur | **One-Hot** |
| **ordinale** (ordre clair) | risque faible < moyen < élevé | **Ordinal** (1, 2, 3) |

> [!piege] Coder TCP = 1, UDP = 2, ICMP = 3 impose un ordre et des distances qui n'existent pas. Règle du prof : si « A est supérieur à B » n'a pas de sens métier, pas d'encodage ordinal.

Pour une variable à **forte cardinalité** (code postal, adresse IP), le One-Hot fait exploser le nombre de colonnes. Alternatives : regrouper les catégories rares (« Autre »), *frequency encoding*, *target encoding*.

**Mise à l'échelle.**

| | Standardisation (Z-score) | Normalisation Min-Max |
|---|---|---|
| Formule | $z = \dfrac{x-\mu}{\sigma}$ | $x' = \dfrac{x - x_{min}}{x_{max} - x_{min}}$ |
| Résultat | moyenne 0, écart-type 1, pas de bornes | valeurs dans $[0, 1]$ |
| Valeurs aberrantes | moins sensible que Min-Max | très sensible |

Les modèles à **distance** (KNN, K-Means, SVM) et à **gradient** (régression logistique, réseaux de neurones) y sont sensibles. Les **arbres** et les forêts aléatoires ne le sont pas : un seuil sur une variable ne change pas si on change son unité.

> [!attention] La diapo dit que la standardisation est « robuste aux valeurs aberrantes ». C'est relatif : la moyenne et l'écart-type sont eux-mêmes tirés par un outlier. Elle est seulement **moins** sensible que Min-Max. Pour des données très bruitées, le prof cite `RobustScaler` (séance 7).

**Feature engineering** : construire une variable plus parlante, par exemple débit moyen = octets / durée.

## Idée 3 · Train, validation, test

```html
<svg viewBox="0 0 360 90" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Une barre découpée en entraînement 70 %, validation 15 % et test 15 %">
<g font-family="sans-serif" font-size="12" text-anchor="middle">
<rect x="10" y="20" width="238" height="34" fill="#D9824F" fill-opacity=".35" stroke="#D9824F"/>
<rect x="248" y="20" width="51" height="34" fill="none" stroke="currentColor"/>
<rect x="299" y="20" width="51" height="34" fill="currentColor" fill-opacity=".15" stroke="currentColor"/>
<g fill="currentColor"><text x="129" y="42">Train 70 % : apprendre θ</text><text x="273" y="42">Valid.</text><text x="324" y="42">Test</text>
<text x="273" y="74" font-size="10">choisir</text><text x="324" y="74" font-size="10">évaluer 1 fois</text></g></g>
</svg>
```

- **Train** : apprendre les **paramètres** du modèle.
- **Validation** : comparer des modèles, régler les **hyperparamètres**.
- **Test** : évaluation **finale**, une seule fois.

| Configuration | Train | Validation | Test |
|---|---|---|---|
| Simple | 80 % | – | 20 % |
| Classique | 70 % | 15 % | 15 % |
| Grande base | 90 % | 5 % | 5 % |

Ce sont des ordres de grandeur, pas des règles.

**Paramètres ou hyperparamètres ?**

| Paramètres (appris par `fit`) | Hyperparamètres (fixés avant) |
|---|---|
| coefficients $w$ et biais $b$ d'une régression | $k$ du KNN |
| poids d'un réseau de neurones | profondeur max d'un arbre |
| seuils de division d'un arbre | taux d'apprentissage, $C$, $\alpha$, nombre d'arbres |

**Stratification.** Avec 98 % de connexions normales et 2 % d'attaques, un tirage simple peut laisser le test sans attaque. Avec `stratify=y`, les proportions 98 / 2 sont conservées dans le train et le test. En validation croisée : `StratifiedKFold`.

**Données temporelles.** On respecte l'ordre : passé → train, période suivante → validation, futur → test. Un mélange aléatoire laisserait le modèle « voir le futur ».

## Idée 4 · La validation croisée K-fold

```grille K = 5 : chaque fold sert une fois de validation (V), quatre fois d'entraînement (T)
#cols: F1 F2 F3 F4 F5
#rows: Itér.1 Itér.2 Itér.3 Itér.4 Itér.5
*V T T T T
T *V T T T
T T *V T T
T T T *V T
T T T T *V
```

On découpe **le train** (jamais le test) en $K$ blocs. On entraîne $K$ fois sur $K-1$ blocs et on valide sur le bloc restant. Le score est la moyenne :

$$\text{Score}_{CV} = \frac{1}{K} \sum_{k=1}^{K} \text{Score}_k$$

Avantages : on n'immobilise pas de données pour la validation, et l'estimation dépend moins d'un seul découpage.

```etapes GridSearchCV : la démarche complète du prof
Définir une grille :: Par exemple `max_depth ∈ {3, 5, 7, 10}` et `min_samples_split ∈ {2, 5, 10}` : 4 × 3 = 12 configurations.
Évaluer par K-fold :: Chaque configuration reçoit un score moyen de validation croisée, calculé sur $X_{train}$.
Choisir :: On garde la meilleure (`best_params_`, `best_score_`).
Ré-entraîner :: Le modèle est réentraîné sur tout $X_{train}$ avec ces réglages (`best_estimator_`).
Tester une fois :: On mesure la performance finale sur $X_{test}$.
```

La **recherche aléatoire** (Random Search) tire un nombre fixé de combinaisons au hasard. Elle teste plus de valeurs différentes de chaque paramètre qu'une grille de même budget.

> [!retenir] Toute transformation qui apprend quelque chose (`StandardScaler`, imputation, PCA) va **dans un `Pipeline`** passé à `GridSearchCV`. Ainsi $\mu$ et $\sigma$ sont recalculés sur le pli d'entraînement de chaque itération, sans fuite.

## Idée 5 · La matrice de confusion et ses métriques

```grille Matrice de confusion (positif = Attaque)
#cols: Prédit Normal | Prédit Attaque
#rows: Réel Normal | Réel Attaque
TN | *FP
*FN | !TP
```

- **TP** : attaque détectée. **TN** : normal reconnu.
- **FP** : normal pris pour une attaque (fausse alerte).
- **FN** : attaque **ratée** (le plus grave en cybersécurité).

| Métrique | Formule | Question |
|---|---|---|
| Accuracy | $\dfrac{TP+TN}{TP+TN+FP+FN}$ | quelle part est bien classée ? |
| Précision | $\dfrac{TP}{TP+FP}$ | parmi les alertes, combien sont vraies ? |
| Rappel (sensibilité) | $\dfrac{TP}{TP+FN}$ | parmi les vraies attaques, combien sont détectées ? |
| F1 | $2 \cdot \dfrac{P \times R}{P + R}$ | compromis (moyenne harmonique) |

```etapes Exemple du prof : 100 connexions, TP = 18, TN = 78, FP = 2, FN = 2
Accuracy :: $(18 + 78) / 100 = 96\,\%$.
Précision :: $18 / (18 + 2) = 90\,\%$ : 9 alertes sur 10 sont de vraies attaques.
Rappel :: $18 / (18 + 2) = 90\,\%$ : 9 attaques sur 10 sont détectées.
F1 :: $2 \times 0{,}9 \times 0{,}9 / 1{,}8 = 0{,}90$.
```

> [!piege] **Le paradoxe de l'accuracy.** 98 normales et 2 attaques : un modèle qui répond toujours « Normal » a 98 % d'accuracy… et ne détecte **aucune** attaque (TP = 0, rappel = 0). Sur des classes déséquilibrées, regarde le rappel, le F1 ou la PR-AUC.

Autre exemple du prof : précision 0,90 et rappel 0,60 donnent $F_1 = 2 \times 0{,}54 / 1{,}50 = 0{,}72$. Le F1 est tiré vers la plus petite des deux.

| Contrainte métier | Métrique à privilégier |
|---|---|
| toutes les erreurs coûtent pareil | accuracy |
| éviter les fausses alertes | précision (peu de FP) |
| ne rater aucun cas positif (attaques, maladies) | **rappel** (peu de FN) |
| classes très déséquilibrées | F1, rappel, PR-AUC |

**Métriques de régression** (détaillées au chapitre 4) : MAE, MSE, RMSE, $R^2$. Exemple du prof : $y = [10, 20, 30]$, $\hat y = [12, 18, 35]$ → erreurs $[-2, 2, -5]$, MAE $= 3$, MSE $= 11$, RMSE $= \sqrt{11} \approx 3{,}32$.

**Clustering** : score de silhouette, inertie (chapitre 7).

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

y_test = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
y_pred = [1, 1, 1, 0, 1, 0, 0, 0, 0, 0]
print(confusion_matrix(y_test, y_pred))
print(accuracy_score(y_test, y_pred), precision_score(y_test, y_pred), recall_score(y_test, y_pred), f1_score(y_test, y_pred))
```

```sortie
[[5 1]
 [1 3]]
0.8 0.75 0.75 0.75
```

> [!attention] En scikit-learn, `confusion_matrix` range les lignes par classe **réelle** et les colonnes par classe **prédite**, classes triées : la ligne 0 est `[TN, FP]`, la ligne 1 est `[FN, TP]`. Même disposition que le tableau du prof.

## Idée 6 · Sous-apprentissage, surapprentissage

```html
<svg viewBox="0 0 360 170" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Courbes d'erreur en fonction de la complexité : l'erreur d'entraînement baisse toujours, l'erreur de test forme un U avec un minimum au compromis optimal">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M40 150H340M40 150V15" stroke="currentColor" stroke-width="1.5"/>
<path d="M50 40C110 95 200 125 330 138" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M50 45C110 100 160 112 190 110S280 80 330 40" fill="none" stroke="#D9824F" stroke-width="2.5"/>
<line x1="185" y1="20" x2="185" y2="150" stroke="currentColor" stroke-dasharray="4 4"/>
<text x="300" y="132">train</text><text x="300" y="38" fill="#D9824F">test</text>
<text x="60" y="165">sous-apprentissage</text><text x="160" y="16">optimum</text><text x="240" y="165">surapprentissage</text>
<text x="10" y="80" transform="rotate(-90 14 80)">erreur</text></g>
</svg>
```

| Situation | Train | Test | Diagnostic |
|---|---|---|---|
| Sous-apprentissage | faible | faible | modèle trop simple |
| Bonne généralisation | bonne | bonne | modèle adapté |
| Surapprentissage | très bonne | faible | écart important |

**Contre le surapprentissage** : plus de données, un modèle moins complexe (limiter la profondeur d'un arbre), la régularisation, moins de variables inutiles, la validation croisée.

**Contre le sous-apprentissage** : un modèle plus flexible, de meilleures features, moins de régularisation.

> [!retenir] Le meilleur modèle n'est pas celui qui a la meilleure performance sur l'entraînement, mais celui qui **généralise**.

## Idée 7 · Interpréter, déployer, surveiller

- **Interprétation globale** : comportement général (importance des variables, `permutation_importance`, modèles simples).
- **Interprétation locale** : une prédiction précise (**SHAP**, **LIME**).
- Une variable importante n'est **pas** une preuve de causalité.
- En production, le prétraitement doit appliquer **exactement** les mêmes transformations qu'à l'entraînement.
- Le **data drift** : la distribution des données réelles s'éloigne de celle de l'entraînement (nouveaux comportements, capteurs modifiés). On surveille, puis on réentraîne.

## S'exercer

```exercice Métriques et protocole
? 200 connexions : TP = 40, FN = 20, FP = 10, TN = 130. Calcule le rappel.
indice: Rappel = TP / (TP + FN).
reponse: 0.667 ~0.002
= $40 / 60 \approx 0{,}667$. Un tiers des attaques passe inaperçu.

? Même matrice : calcule la précision.
reponse: 0.8
= $40 / (40 + 10) = 0{,}8$.

? Un étudiant calcule $\mu$ et $\sigma$ sur toutes les données, standardise, puis fait `train_test_split`. Quel est le problème et comment corriger ?
= Fuite de données : $\mu$ et $\sigma$ contiennent de l'information du test. Il faut séparer d'abord, faire `fit` du scaler sur le train, puis `transform` du train et du test. Le plus sûr : un `Pipeline`.
```

## Flashcards

```cartes
Data leakage :: Une information indisponible au moment de la prédiction (souvent issue du test) influence l'apprentissage ou l'évaluation.
Imputation sans fuite :: La médiane (ou moyenne) se calcule sur X_train seulement, puis s'applique au test.
Nominale vs ordinale :: Nominale (pas d'ordre) → One-Hot. Ordinale (ordre réel) → Ordinal Encoding.
Forte cardinalité :: Trop de catégories pour le One-Hot : regrouper les rares, frequency encoding, target encoding.
Z-score vs Min-Max :: Z-score : moyenne 0, écart-type 1, sans bornes. Min-Max : [0, 1], très sensible aux outliers.
Train / validation / test :: Train : apprendre θ. Validation : choisir les hyperparamètres. Test : évaluation finale unique.
Stratification :: Garder les proportions des classes dans train et test (stratify=y, StratifiedKFold).
K-fold :: K entraînements sur K−1 blocs, validation sur le bloc restant, score = moyenne des K.
Précision :: TP / (TP + FP) : fiabilité des alertes.
Rappel :: TP / (TP + FN) : part des vrais positifs détectés.
F1 :: 2PR / (P + R), moyenne harmonique de la précision et du rappel.
Paradoxe de l'accuracy :: Sur 98 % / 2 %, prédire toujours la classe majoritaire donne 98 % d'accuracy et 0 détection.
Data drift :: La distribution des données réelles change après le déploiement ; il faut surveiller et réentraîner.
```

## QCM du chapitre

```qcm
? On calcule la médiane d'imputation sur toutes les données avant de séparer train et test. C'est :
- la bonne pratique
+ une fuite de données
- sans effet sur l'évaluation
= La médiane contient de l'information du test. Elle doit être calculée sur $X_{train}$ seulement.


? Pour la variable Protocole ∈ {TCP, UDP, ICMP}, l'encodage adapté est :
- l'Ordinal Encoding TCP = 1, UDP = 2, ICMP = 3
- la standardisation
+ le One-Hot Encoding
= C'est une variable nominale : aucun ordre entre les catégories.


? Pour la variable Risque ∈ {Faible, Moyen, Élevé}, l'encodage le plus naturel est :
+ l'Ordinal Encoding (1, 2, 3)
- le target encoding obligatoirement
- le One-Hot obligatoirement
= L'ordre Faible < Moyen < Élevé a un sens métier.


? Quel modèle n'a généralement **pas** besoin de mise à l'échelle des variables ?
- la régression logistique
+ l'arbre de décision
- KNN
= Un arbre teste des seuils sur une variable à la fois : changer d'unité ne change pas la séparation.


? La normalisation Min-Max :
- donne une moyenne 0 et un écart-type 1
- est insensible aux valeurs aberrantes
+ ramène les valeurs dans $[0, 1]$ et est très sensible aux valeurs aberrantes
= Un seul outlier fixe $x_{min}$ ou $x_{max}$ et écrase toutes les autres valeurs.


? Lequel est un **hyperparamètre** ?
+ le nombre de voisins $k$ du KNN
- les seuils de division appris par un arbre
- le coefficient $w_1$ d'une régression linéaire
= Un hyperparamètre est fixé avant l'entraînement ; les paramètres sont appris par `fit()`.


? Le jeu de validation sert à :
- l'évaluation finale du modèle
+ comparer des modèles et régler les hyperparamètres
- apprendre les coefficients
= La validation guide les choix ; le test reste à l'écart jusqu'à la fin.


? En validation croisée 5-fold, combien de fois chaque observation du train sert-elle à valider ?
- quatre fois
- cinq fois
+ une fois
= Elle valide une fois et sert à l'entraînement $K - 1 = 4$ fois.


? Pourquoi utiliser `stratify=y` sur des données 98 % / 2 % ?
+ pour conserver les proportions 98 / 2 dans le train et le test
- pour supprimer la classe minoritaire
- pour équilibrer les classes à 50 / 50
= La stratification ne rééquilibre pas : elle préserve la distribution d'origine.


? Pour une série temporelle (prévision des ventes), la bonne séparation est :
- un mélange aléatoire des lignes
+ passé pour l'entraînement, futur pour le test
- futur pour l'entraînement, passé pour le test
= Un mélange laisserait le modèle utiliser le futur : estimation trop optimiste.


? 100 connexions : TP = 18, TN = 78, FP = 2, FN = 2. L'accuracy vaut :
- 90 %
- 18 %
+ 96 %
= $(18 + 78) / 100 = 0{,}96$.


? La précision répond à la question :
+ parmi les alertes produites, combien sont de vraies attaques ?
- parmi les vraies attaques, combien sont détectées ?
- quelle part de toutes les observations est bien classée ?
= Précision $= TP / (TP + FP)$.


? En cybersécurité, manquer une attaque est plus grave qu'une fausse alerte. On privilégie :
- la précision
+ le rappel
- l'accuracy
= Le rappel mesure la part des attaques réelles détectées : il pénalise les FN.


? Précision = 0,90 et rappel = 0,60. Le F1-score vaut :
- 0,54
- 0,75
+ 0,72
= $2 \times 0{,}54 / 1{,}50 = 0{,}72$ : la moyenne harmonique est tirée vers la plus faible.


? Un modèle a une erreur faible sur le train et élevée sur le test. Que faire ?
+ le régulariser ou réduire sa complexité
- supprimer le jeu de test
- augmenter sa complexité
= C'est du surapprentissage : il faut contraindre le modèle (ou ajouter des données).


? Dans `GridSearchCV`, l'attribut qui contient le modèle réentraîné sur tout le train avec les meilleurs réglages est :
- `best_score_`
+ `best_estimator_`
- `best_params_`
= `best_params_` donne la configuration, `best_score_` le score moyen de CV.


? Le data drift désigne :
- un surapprentissage dû à trop d'arbres
- une fuite de données pendant l'entraînement
+ un changement de la distribution des données après le déploiement
= Les données réelles s'éloignent de celles de l'entraînement : il faut surveiller et réentraîner.
```

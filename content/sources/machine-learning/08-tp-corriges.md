---
id: ml-tp-corriges
titre: TP/TD 1 à 4 corrigés
seance: TP/TD 1 à 4 · octobre–novembre 2026
importance: 4
---

## Avant de commencer

Ce chapitre suppose que tu as lu les chapitres 4 (régression), 5 (classification), 6 (arbres) et 7 (clustering). Le prof a dit que l'examen porte sur **le cours et les TP** : les questions d'interprétation des TP sont de vrais sujets de QCM.

```exercice Vérifie ton prérequis
? Dans un `Pipeline(StandardScaler, KNN)` passé à `GridSearchCV`, sur quelles données le `StandardScaler` calcule-t-il $\mu$ et $\sigma$ ?
= Sur le **pli d'entraînement** de chaque itération de la validation croisée, puis il les applique au pli de validation. C'est ce qui évite la fuite de données.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « ce que fait scikit-learn à ta place ».** Le TP 1 interdit scikit-learn pour t'obliger à réécrire `train_test_split`, `StandardScaler`, `LinearRegression` et les métriques. Si tu comprends ces 10 lignes, tu comprends ce que font les classes.

> [!piege] Les questions des TP ne demandent presque jamais un chiffre exact. Elles demandent **pourquoi** : pourquoi standardiser, pourquoi `stratify`, pourquoi ne pas choisir $\alpha$ sur le test. Prépare les justifications.

À la fin, tu as un corrigé des fonctions du TP 1, les réponses aux questions d'interprétation des quatre TP, et les résultats attendus des expériences du TP 4.

## Idée 1 · TP/TD 1 : la régression linéaire de A à Z (sans scikit-learn)

Contexte : 300 logements d'une agence de Béni Mellal (`Surface`, `Chambres`, `Distance_KM`, `Age`, cible `Prix_kDH`), `SEED = 42`.

**Partie 1 · Python pur.** Point de contrôle du prof : $w = 9{,}35$, $b = 34{,}5$, $\hat y(80) = 782{,}5$.

```python
def moyenne(v):
    return sum(v) / len(v)

def regression_simple(x, y):
    mx, my = moyenne(x), moyenne(y)
    cov = sum((a - mx) * (b - my) for a, b in zip(x, y))
    var = sum((a - mx) ** 2 for a in x)
    w = cov / var
    return w, my - w * mx

w, b = regression_simple([50, 70, 90, 110], [500, 680, 900, 1050])
print(round(w, 2), round(b, 2), round(w * 80 + b, 1))
```

```sortie
9.35 34.5 782.5
```

**Parties 3 à 5 · les outils, les MCO et la descente de gradient.**

```python
import numpy as np

def train_test_split_manual(n, test_size=0.3, seed=42):
    idx = np.random.default_rng(seed).permutation(n)
    n_test = int(round(n * test_size))
    return idx[n_test:], idx[:n_test]          # indices train, test

class Standardiseur:
    def fit(self, X):
        self.mu, self.sigma = X.mean(axis=0), X.std(axis=0)
        return self
    def transform(self, X):
        return (X - self.mu) / self.sigma

def ajouter_biais(X):
    return np.column_stack([np.ones(len(X)), X])

def mae(y, yh): return np.mean(np.abs(y - yh))
def mse(y, yh): return np.mean((y - yh) ** 2)
def rmse(y, yh): return np.sqrt(mse(y, yh))
def r2(y, yh): return 1 - np.sum((y - yh) ** 2) / np.sum((y - np.mean(y)) ** 2)

def fit_mco(X, y):
    return np.linalg.solve(X.T @ X, X.T @ y)   # (XᵀX) w = Xᵀy

def fit_gd(X, y, lr=0.05, n_iter=2000):
    w = np.zeros(X.shape[1])
    for _ in range(n_iter):
        w -= lr * (2 / len(y)) * X.T @ (X @ w - y)
    return w

# Données de démonstration (le CSV du prof n'est pas inclus ici)
rng = np.random.default_rng(42)
X = rng.uniform([40, 1, 0.5], [200, 6, 15], size=(60, 3))
y = 2 * X[:, 0] + 15 * X[:, 1] - 6 * X[:, 2] + 40 + rng.normal(0, 10, 60)

tr, te = train_test_split_manual(len(y))
sc = Standardiseur().fit(X[tr])                 # μ et σ appris sur le train seulement
Xtr, Xte = ajouter_biais(sc.transform(X[tr])), ajouter_biais(sc.transform(X[te]))
w_mco, w_gd = fit_mco(Xtr, y[tr]), fit_gd(Xtr, y[tr])
e = y[tr] - Xtr @ w_mco
print("somme des résidus ≈ 0 :", abs(e.sum()) < 1e-8)
print("Xᵀe ≈ 0 :", np.allclose(Xtr.T @ e, 0, atol=1e-7))
print("écart GD / MCO < 1e-8 :", np.max(np.abs(w_gd - w_mco)) < 1e-8)
base = np.full(len(te), y[tr].mean())
print("R² baseline :", round(r2(y[te], base), 2), "| R² MCO :", round(r2(y[te], Xte @ w_mco), 3))
```

```sortie
somme des résidus ≈ 0 : True
Xᵀe ≈ 0 : True
écart GD / MCO < 1e-8 : True
R² baseline : -0.02 | R² MCO : 0.989
```

> [!attention] Le jeu de données ci-dessus est **simulé** pour que le code tourne ici. Sur `immobilier.csv`, tes chiffres seront différents ; ce sont les **points de contrôle** du prof qui comptent : somme des résidus de l'ordre de $10^{-8}$, écart GD / MCO de l'ordre de $10^{-10}$ sur données standardisées, $R^2$ de la baseline proche de 0.

**Réponses aux questions du TP 1** (rédaction ToumaiLearn, fidèle au cours) :

| Q | Réponse courte |
|---|---|
| 1 | Un $R^2$ proche de 1 sur 4 points d'entraînement ne prouve rien sur de nouveaux logements : il faut l'évaluer sur un test. |
| 2 | 300 m² est hors de [50, 110] : **extrapolation**, prédiction peu fiable. |
| 3 | Surface et Chambres sont fortement corrélées : multicolinéarité, coefficients instables à interpréter un par un. |
| 4 | Les MCO élèvent les erreurs au carré : un outlier pèse énormément et tire la droite. |
| 5 | Oui, médiane calculée sur toute la base = fuite. Rigoureux : la calculer sur le train, l'appliquer au test. |
| 6 | La baseline prédit $\bar y$ : par définition $R^2 \approx 0$. Elle sert de **référence** minimale à battre. |
| 7 | Non fiable : Chambres est corrélée à Surface (voir Q3). |
| 8 | Hausse (ou baisse) du prix, en DH, pour 1 km de plus, **toutes choses égales par ailleurs**. Association, pas causalité. |
| 9 | Sans standardisation, les échelles très différentes rendent la descente lente ou divergente pour un même `lr` ; standardiser rend le « bol » plus rond. |
| 10 | Le polynôme peut gagner un peu en test, au prix de beaucoup de colonnes ; le conditionnement de $X^TX$ explose sans standardisation. |
| 11 | $\alpha$ grand → sous-apprentissage ; $\alpha$ petit → surapprentissage ; $\alpha \to 0$ : MCO ; $\alpha \to \infty$ : poids vers 0. |
| 12 | Choisir $\alpha$ sur le test le contamine : la performance annoncée devient trop optimiste. |
| 13 | Résidus centrés, sans structure, dispersion constante = bon signe ; une structure révèle une relation non captée. |
| 14 | 400 m² : extrapolation, confiance faible. |

Pour Ridge sans pénaliser le biais : $(\tilde X^T \tilde X + \alpha P)w = \tilde X^T y$, avec $P$ = identité sauf un 0 en haut à gauche. Le degré 2 sur $p$ variables donne $p + p(p+1)/2$ colonnes (4 variables → 14).

## Idée 2 · TP/TD 2 : préparation, pipelines, régression et classification

Deux jeux : immobilier (`kc_house_data.csv`) et **spam** (`spambase_csv.csv`).

```flux Le squelette de tout le TP
Inspecter -> Séparer X et y -> train_test_split (stratify=y en classification) -> Pipeline (imputation + standardisation + modèle) -> GridSearchCV sur le train -> Test final une seule fois
```

```python nontest
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
pipe = Pipeline([("imput", SimpleImputer(strategy="median")),
                 ("scaler", StandardScaler()),
                 ("modele", KNeighborsClassifier())])
grille = {"modele__n_neighbors": [3, 5, 7, 9]}       # préfixe = nom de l'étape + __
gs = GridSearchCV(pipe, grille, cv=StratifiedKFold(5, shuffle=True, random_state=42), scoring="f1")
gs.fit(X_train, y_train)
print(gs.best_params_, gs.best_score_, gs.score(X_test, y_test))
```

> [!retenir] Dans une grille de `GridSearchCV` sur un `Pipeline`, les hyperparamètres s'écrivent `nom_etape__parametre` (deux tirets bas) : `modele__n_neighbors`.

**Réponses clés.**

- **Colonnes exclues de X** : l'identifiant et la date brute (pas de pouvoir prédictif, ou fuite), et bien sûr la cible.
- **Spam, `stratify=y`** : conserver la proportion spam / non-spam dans le train et le test.
- **Faux positif ou faux négatif ?** Un FP envoie un vrai e-mail dans les spams (on peut rater un message important) ; un FN laisse passer un spam. Pour un filtre anti-spam, on évite surtout les **FP** : on privilégie la **précision**.
- **Seuil** : le monter augmente la précision et baisse le rappel ; le baisser fait l'inverse.
- **CV vs test** : un score de test proche du score moyen de validation croisée indique une estimation fiable ; un écart-type élevé entre les folds indique un modèle instable.
- Standardiser surtout les modèles sensibles à l'échelle : **KNN, régression logistique, Ridge**. La forêt aléatoire n'en a pas besoin.

## Idée 3 · TP/TD 3 : arbres de décision et Random Forest

**Exercice numérique** (6 A, 4 B) : Gini $= 0{,}48$, entropie $\approx 0{,}971$ bit. Pour 10 A et 0 B : les deux valent 0 (nœud pur). Le nœud 6 / 4 est impur car il mélange deux classes.

**Ce qu'il faut savoir répondre :**

- Un arbre **sans limite** atteint presque 100 % sur le train et moins sur le test : surapprentissage. On le corrige par `max_depth`, `min_samples_leaf` ou l'élagage `ccp_alpha`.
- Arbre de **régression** : `DecisionTreeRegressor`, critère `squared_error`, feuille = moyenne. Sa prédiction est en **escalier**.
- **Random Forest** : `n_estimators`, `max_features`, `oob_score=True` donne une estimation interne.
- `feature_importances_` = importance **MDI** ; `permutation_importance` = MDA, plus fiable mais plus lente.
- Une forêt **n'extrapole pas** : en régression, elle ne prédit jamais au-delà des valeurs cibles vues.

## Idée 4 · TP/TD 4 : K-Means, CAH, DBSCAN

Données : `make_blobs(n_samples=300, centers=4, cluster_std=0.7, random_state=42)` et `make_moons(n_samples=250, noise=0.08, random_state=42)`.

```python
from sklearn.datasets import make_blobs, make_moons
from sklearn.cluster import KMeans, DBSCAN

X_blobs, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.7, random_state=42)
inerties = [round(KMeans(n_clusters=k, random_state=42, n_init=10).fit(X_blobs).inertia_) for k in range(1, 8)]
print("inertie pour K = 1..7 :", inerties)

X_moons, _ = make_moons(n_samples=250, noise=0.08, random_state=42)
for eps in (0.2, 0.8, 0.02):
    lab = DBSCAN(eps=eps, min_samples=5).fit_predict(X_moons)
    print(f"eps = {eps} : {len(set(lab) - {-1})} cluster(s), {(lab == -1).sum()} point(s) de bruit")
```

```sortie
inertie pour K = 1..7 : [19711, 9126, 1841, 278, 251, 226, 200]
eps = 0.2 : 2 cluster(s), 0 point(s) de bruit
eps = 0.8 : 1 cluster(s), 0 point(s) de bruit
eps = 0.02 : 0 cluster(s), 250 point(s) de bruit
```

**Réponses aux questions.**

| Question | Réponse |
|---|---|
| Pourquoi l'inertie baisse toujours ? | Plus de centroïdes = chaque point plus proche du sien. Avec $K = 300$ : inertie **0**. |
| Pourquoi $K = 4$ est le coude ? | L'inertie chute fortement jusqu'à 4 (1 841 → 278), puis baisse à peine (278 → 251 → 226). |
| `cluster_std = 2,5` ? | Groupes qui se chevauchent : la courbe s'adoucit, plus de coude net. |
| Coupe à $y = 15$ (Ward) ? | La ligne horizontale coupe 4 branches verticales → 4 groupes. |
| Longues lignes verticales ? | Grandes distances avant fusion : groupes bien séparés, donc pertinents. |
| CAH sur 500 000 points ? | Il faut toutes les distances deux à deux (mémoire et temps énormes). K-Means est linéaire en $n$. |
| K-Means sur les lunes ? | Chaque point va au centroïde le plus proche : la frontière entre deux centroïdes est une **droite** (médiatrice), elle coupe les lunes. |
| `eps = 0.8` puis `0.02` ? | 0,8 : un seul cluster (les lunes fusionnent). 0,02 : tout devient bruit. |
| Les « x » noirs ? | Points de bruit (−1). Utile pour repérer des fraudes, mais un point de bruit n'est pas forcément une fraude. |

## S'exercer

```exercice Questions de TP
? Combien de colonnes donne `poly_features(X, degree=2)` pour $p = 4$ variables (sans le biais) ?
indice: $p + p(p+1)/2$.
reponse: 14
= $4 + 10 = 14$ : 4 variables, 4 carrés et 6 interactions.

? Pour un filtre anti-spam, quelle erreur coûte le plus à l'utilisateur, et quelle métrique privilégier ?
= Le faux positif (un vrai e-mail classé spam). On privilégie la **précision** de la classe spam.

? Dans le TP 4, que vaut l'inertie de K-Means si $K = 300$ pour 300 points ?
reponse: 0
= Chaque point est son propre centroïde.
```

## Flashcards

```cartes
Baseline :: Prédire la moyenne du train pour tout le test ; R² ≈ 0. Référence minimale à battre.
fit_mco :: np.linalg.solve(XᵀX, Xᵀy) plutôt que l'inverse explicite.
fit_gd :: w ← w − lr · (2/n) Xᵀ(Xw − y), en partant de w = 0.
Standardiseur sans fuite :: fit (μ, σ) sur le train, transform du train et du test.
Ridge sans pénaliser le biais :: (XᵀX + αP)w = Xᵀy, P = identité avec un 0 pour le biais.
Grille d'un Pipeline :: Paramètres nommés etape__parametre (ex. modele__n_neighbors).
Filtre anti-spam :: Un FP perd un vrai e-mail : on privilégie la précision.
Coude du TP 4 :: Inertie 1 841 → 278 à K = 4, puis presque plate : K = 4.
DBSCAN sur les lunes :: eps = 0,2 : 2 clusters ; 0,8 : 1 cluster ; 0,02 : tout en bruit.
```

## QCM du chapitre

```qcm
? Dans le TP 1, la baseline qui prédit la moyenne du train obtient sur le test un $R^2$ :
+ proche de 0
- proche de 1
- toujours égal à 0,5
= Elle ne fait que prédire $\bar y$ ; c'est la définition de $R^2 = 0$.


? Pourquoi résoudre $(X^TX)w = X^Ty$ avec `np.linalg.solve` plutôt que calculer l'inverse ?
- l'inverse donne un autre résultat
+ c'est plus stable numériquement et plus rapide
- `solve` ajoute automatiquement la régularisation
= Mathématiquement c'est la même solution, mais l'inversion explicite est plus fragile.


? Dans le TP 1, la fonction `Standardiseur.fit` doit être appelée sur :
- le jeu de test
- toute la base
+ le jeu d'entraînement seulement
= Sinon on introduit une fuite de données.


? La règle de mise à jour de `fit_gd` pour la MSE est :
+ $w \leftarrow w - lr \cdot \frac{2}{n} X^T(Xw - y)$
- $w \leftarrow (X^TX)^{-1}X^Ty$
- $w \leftarrow w + lr \cdot X^T(Xw - y)$
= C'est le gradient de la MSE ; $w = (X^TX)^{-1}X^Ty$ est la formule fermée, pas une itération.


? Dans `GridSearchCV` sur un `Pipeline` dont l'étape KNN s'appelle `modele`, la clé de la grille est :
- `n_neighbors`
+ `modele__n_neighbors`
- `modele.n_neighbors`
= Nom de l'étape, deux tirets bas, nom du paramètre.


? Pour un filtre anti-spam, l'erreur la plus gênante pour l'utilisateur est en général :
- le faux négatif (un spam qui passe)
- le vrai négatif
+ le faux positif (un vrai e-mail classé spam)
= Perdre un vrai message est plus grave que voir passer un spam.


? Dans le TP 4, l'inertie passe de 1 841 ($K = 3$) à 278 ($K = 4$) puis à 251 ($K = 5$). On choisit :
+ $K = 4$
- $K = 5$
- $K = 3$
= Au-delà de 4, le gain devient marginal : c'est le coude.


? Sur `make_moons`, K-Means avec $K = 2$ échoue parce que :
- il détecte trop de bruit
+ il sépare les points par une frontière droite entre les deux centroïdes
- il ne peut pas traiter deux dimensions
= Chaque point va au centroïde le plus proche : la frontière est la médiatrice.


? Sur les lunes, DBSCAN avec `eps = 0.02` et `min_samples = 5` donne :
- 2 clusters
- 1 cluster
+ aucun cluster, tous les points en bruit
= Le rayon est trop petit pour atteindre 5 voisins.


? Pourquoi la CAH est-elle peu adaptée à 500 000 observations ?
+ elle doit calculer et stocker les distances entre toutes les paires de points
- elle ne fonctionne qu'avec la méthode de Ward
- elle exige de connaître $K$ à l'avance
= La mémoire et le temps explosent ; K-Means reste linéaire en $n$.
```

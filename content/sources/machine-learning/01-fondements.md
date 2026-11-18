---
id: ml-fondements
titre: Fondements du Machine Learning
seance: Séance 1 · 1er octobre 2026
importance: 4
---

## Avant de commencer

Il te faut une seule chose : savoir lire un tableau de données. Une **ligne** décrit un individu (un logement, une connexion réseau), une **colonne** décrit une information sur tous les individus (la surface, la durée).

```exercice Vérifie ton prérequis
? Un tableau contient 200 logements et, pour chacun, la surface, le nombre de chambres et le prix. Combien de lignes et de colonnes ?
indice: Un logement = une ligne.
= 200 lignes (une par logement) et 3 colonnes (surface, chambres, prix). Si on veut **prédire** le prix, la colonne prix joue un rôle à part : c'est la cible.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « exemples → règle ».** En programmation classique, tu écris la règle. En Machine Learning, tu donnes des exemples et l'algorithme trouve la règle tout seul.

> [!piege] Croire que le ML, c'est « programmer sans programme ». Le prof insiste : l'**algorithme d'apprentissage** est bel et bien programmé. Ce qui n'est pas écrit à la main, ce sont les **paramètres** du modèle.

À la fin, tu sais définir le ML, situer IA / ML / Deep Learning / Data Science, reconnaître un problème de classification, de régression ou non supervisé, et expliquer pourquoi on teste un modèle sur des données qu'il n'a jamais vues.

## Idée 1 · Programmation classique ou Machine Learning

```html
<svg viewBox="0 0 360 150" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Programmation classique : règles et données donnent un résultat. Machine Learning : données et résultats donnent un modèle">
<g font-family="sans-serif" font-size="12" fill="currentColor" text-anchor="middle">
<text x="90" y="18" font-weight="700">Programmation classique</text>
<rect x="20" y="30" width="140" height="28" rx="6" fill="none" stroke="currentColor"/><text x="90" y="48">Règles + Données</text>
<path d="M90 60v18" stroke="currentColor" stroke-width="1.5"/><path d="M85 72l5 8 5-8" fill="currentColor"/>
<rect x="20" y="84" width="140" height="28" rx="6" fill="none" stroke="currentColor"/><text x="90" y="102">Programme → Résultat</text>
<text x="270" y="18" font-weight="700" fill="#D9824F">Machine Learning</text>
<rect x="200" y="30" width="140" height="28" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="270" y="48">Données + Résultats</text>
<path d="M270 60v18" stroke="#D9824F" stroke-width="1.5"/><path d="M265 72l5 8 5-8" fill="#D9824F"/>
<rect x="200" y="84" width="140" height="28" rx="6" fill="none" stroke="#D9824F" stroke-width="2"/><text x="270" y="102">Algorithme → Modèle</text>
<text x="180" y="138" font-size="11">Le modèle appris sert ensuite à prédire sur de nouvelles données</text></g>
</svg>
```

Certaines règles s'écrivent facilement : « si température > 38 °C, alors fièvre ». D'autres sont impossibles à écrire à la main : reconnaître un spam, une attaque réseau, un visage.

**Définition du prof.** Le Machine Learning (apprentissage automatique) est un domaine de l'IA qui étudie des méthodes permettant à un système de **construire un modèle à partir de données**, puis d'utiliser ce modèle pour produire des prédictions ou des classifications **sur de nouvelles données**.

**Définition de Tom Mitchell** (classique en QCM) : un programme apprend d'une **expérience E**, pour une **tâche T**, selon une **mesure de performance P**, si sa performance sur T, mesurée par P, s'améliore avec E.

| Filtre anti-spam | |
|---|---|
| E (expérience) | des e-mails passés, étiquetés spam / non-spam |
| T (tâche) | classer un nouvel e-mail |
| P (performance) | une métrique, par exemple la proportion d'e-mails bien classés |

## Idée 2 · IA ⊃ ML ⊃ Deep Learning, et la Data Science à côté

```html
<svg viewBox="0 0 360 170" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Trois ensembles emboîtés : l'intelligence artificielle contient le machine learning, qui contient le deep learning">
<g font-family="sans-serif" font-size="12" fill="currentColor" text-anchor="middle">
<ellipse cx="180" cy="88" rx="170" ry="78" fill="none" stroke="currentColor" stroke-width="1.5"/>
<ellipse cx="200" cy="100" rx="115" ry="55" fill="none" stroke="#D9824F" stroke-width="2"/>
<ellipse cx="220" cy="110" rx="58" ry="30" fill="#D9824F" fill-opacity=".18" stroke="#D9824F" stroke-width="2"/>
<text x="70" y="40" font-weight="700">IA</text><text x="140" y="70" font-weight="700" fill="#D9824F">Machine Learning</text><text x="220" y="114" font-weight="700">Deep Learning</text></g>
</svg>
```

- **IA** : le domaine général. Il regroupe le ML, mais aussi le raisonnement symbolique, la planification, la vision, le langage…
- **ML** : les méthodes qui **apprennent un modèle à partir de données**.
- **Deep Learning** : une famille du ML fondée sur des **réseaux de neurones à plusieurs couches**, qui apprennent des représentations de plus en plus abstraites. Il n'est pas défini par un nombre fixe de couches.
- **Data Science** : une démarche interdisciplinaire pour tirer de l'information des données (collecte, nettoyage, statistiques, visualisation, modélisation). Elle **utilise** souvent le ML, mais pas seulement.

> [!retenir] Le ML est une approche de l'IA, mais l'IA ne se limite pas au ML. Ces domaines sont liés, pas synonymes.

## Idée 3 · Observations, caractéristiques, cible

On range les données dans une matrice $X$ de taille $n \times p$ et, en supervisé, un vecteur cible $y$ :

- $n$ = nombre d'**observations** (lignes) ;
- $p$ = nombre de **caractéristiques** ou *features* (colonnes) ;
- $x_{ij}$ = valeur de la caractéristique $j$ pour l'observation $i$ ;
- $y_i$ = valeur réelle de la cible pour l'observation $i$, et $\hat y_i$ = valeur **prédite**.

```grille Exemple du prof : 4 maisons, 3 features (X : m², chambres, km) et la cible prix (y, en milliers de MAD)
#cols: m² | Ch. | km | Prix y
#rows: M1 | M2 | M3 | M4
80 2 3.2 *720
120 3 2.1 *1050
65 2 5.4 *580
150 4 1.8 *1350
```

Ici $n = 4$ et $p = 3$ : $X \in \mathbb{R}^{4 \times 3}$ et $y$ contient 4 valeurs. L'erreur de prédiction sur une observation est $e_i = y_i - \hat y_i$.

Le modèle s'écrit $\hat y = f_\theta(x)$ : $f$ est la forme du modèle, $\theta$ ses **paramètres appris** à partir des données.

## Idée 4 · Les trois paradigmes

```flux Quelle information a-t-on pendant l'apprentissage ?
Données avec cible connue -> Supervisé (prédire y)
Données sans cible -> Non supervisé (découvrir une structure)
Interaction avec un environnement -> Renforcement (apprendre une politique)
```

| Paradigme | Données | But | Exemples |
|---|---|---|---|
| Supervisé | $(X, y)$ étiquetées | prédire $y$ | classification, régression |
| Non supervisé | $X$ seul | trouver une structure | clustering (K-Means, CAH), réduction de dimension (PCA) |
| Renforcement | états, actions, récompenses | maximiser la récompense **cumulée** | jeux, robotique |

En renforcement : un **agent** observe un **état**, choisit une **action**, reçoit une **récompense** et un nouvel état. Sa **politique** est la règle qui dit quelle action prendre dans chaque état.

> [!retenir] **Classification ou régression ?** Regarde la cible. Une **catégorie** (spam / non-spam, attaque / normale, type de malware) → classification. Une **valeur numérique** (prix, température, durée) → régression.

## Idée 5 · Apprendre n'est pas mémoriser

Un modèle peut être excellent sur ses données d'entraînement et mauvais sur de nouvelles données : c'est le **surapprentissage** (*overfitting*).

- **Apprentissage** : ajuster le modèle aux données disponibles.
- **Généralisation** : bien fonctionner sur des données **jamais vues**.

D'où la séparation **entraînement / test** : on apprend sur l'un, on évalue sur l'autre. Le jeu de test ne doit servir **ni** à choisir le modèle, **ni** à régler ses hyperparamètres.

```python nontest
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)      # apprendre les paramètres
y_pred = model.predict(X_test)   # prédire sur des données inédites
```

> [!prof] Dans ce module, **scikit-learn** est la bibliothèque principale. Presque tous ses modèles partagent la même interface : `fit()` apprend, `predict()` prédit.

> [!piege] Choisir l'algorithme en premier. Le prof le répète : un projet ML commence par **comprendre le problème et les données**, pas par le choix d'un algorithme.

## S'exercer

```exercice La mini-activité du prof
? Problème 1 : prédire le prix d'une maison à partir de sa surface, du nombre de chambres et de sa localisation. Type de problème ? Cible ? Supervisé ou non ?
= Régression (le prix est un nombre). Cible : le prix. Features : surface, chambres, localisation. Supervisé, car on connaît le prix des maisons d'entraînement.

? Problème 2 : déterminer si une connexion réseau est normale ou une attaque.
= Classification binaire. Cible : la classe normale / attaque. Features : durée, paquets, octets, protocole… Supervisé.

? Problème 3 : regrouper les utilisateurs d'un réseau selon leurs comportements, sans catégories préalables.
= Non supervisé (clustering). Pas de cible. Les features décrivent le comportement de chaque utilisateur.
```

## Flashcards

```cartes
Définition du ML (Pr Madani) :: Domaine de l'IA : construire un modèle à partir de données pour prédire ou classer de nouvelles données.
Définition de Mitchell :: Un programme apprend d'une expérience E, pour une tâche T, selon une performance P, si P sur T s'améliore avec E.
IA, ML, DL :: IA ⊃ ML ⊃ Deep Learning. Le DL utilise des réseaux de neurones à plusieurs couches.
Feature et cible :: Feature = information en entrée (colonne de X). Cible y = ce qu'on veut prédire.
n et p :: n = nombre d'observations (lignes), p = nombre de caractéristiques (colonnes). X ∈ R^(n×p).
Classification ou régression :: Cible catégorielle → classification. Cible numérique → régression.
Renforcement :: Un agent choisit des actions selon des états et cherche à maximiser la récompense cumulée.
Généralisation :: Capacité à bien prédire sur des données jamais vues pendant l'apprentissage.
fit() et predict() :: fit apprend les paramètres sur le train ; predict applique le modèle appris à de nouvelles données.
```

## QCM du chapitre

```qcm
? Selon le cours, qu'est-ce qui n'est **pas** écrit à la main en Machine Learning ?
+ les paramètres du modèle (la relation à apprendre)
- le code de prétraitement
- l'algorithme d'apprentissage
= L'algorithme est bien programmé. Ce sont les paramètres, appris à partir des exemples, qui ne sont pas fixés à la main.


? Dans la définition de Mitchell, que désigne E ?
- l'erreur du modèle
+ l'expérience : les données ou interactions disponibles
- l'espérance de la performance
= E = expérience, T = tâche, P = mesure de performance.


? Quelle relation est correcte ?
- Deep Learning ⊃ ML ⊃ IA
- ML ⊃ IA ⊃ Deep Learning
+ IA ⊃ ML ⊃ Deep Learning
= Le Deep Learning est une famille du ML, qui est une branche de l'IA.


? Le Deep Learning se définit par :
+ l'usage de réseaux de neurones à plusieurs couches qui apprennent des représentations
- l'absence de données d'entraînement
- au moins 10 couches de neurones
= Le prof précise qu'aucun nombre fixe de couches ne définit le « deep ».


? Une matrice de données $X \in \mathbb{R}^{300 \times 5}$ contient :
- 1 500 observations
+ 300 observations et 5 caractéristiques
- 5 observations et 300 caractéristiques
= $n$ lignes = observations, $p$ colonnes = caractéristiques.


? Prédire la durée d'une connexion réseau (en secondes) est un problème de :
- clustering
- classification
+ régression
= La cible est une valeur numérique.


? Déterminer le type de malware (ransomware, trojan, ver) est un problème de :
+ classification multiclasse
- régression
- renforcement
= La cible est une catégorie parmi plus de deux.


? Regrouper des clients sans catégories connues relève de :
- l'apprentissage supervisé
+ l'apprentissage non supervisé
- l'apprentissage par renforcement
= Pas de cible : on cherche une structure (des groupes) dans les données.


? En apprentissage par renforcement, l'agent cherche à maximiser :
- la précision sur un jeu de test
- le nombre d'états visités
+ la récompense cumulée au cours du temps
= La politique apprise doit maximiser la somme des récompenses obtenues.


? Un modèle excellent sur l'entraînement mais mauvais sur de nouvelles données :
+ surapprend
- généralise bien
- sous-apprend
= C'est le surapprentissage (overfitting) : il a mémorisé au lieu d'apprendre une règle générale.


? À quoi sert le jeu de test ?
- entraîner le modèle
+ évaluer le modèle final sur des données inédites
- choisir les hyperparamètres
= Il doit rester indépendant : ni entraînement, ni sélection du modèle.


? Par quoi commence un projet de Machine Learning, selon le prof ?
- le réglage des hyperparamètres
- le choix de l'algorithme
+ la compréhension du problème et des données
= Il faut d'abord savoir ce que le modèle doit prédire, avec quelles données, et comment mesurer la qualité.


? En scikit-learn, la méthode qui apprend les paramètres est :
+ `fit()`
- `predict()`
- `score()`
= `fit()` entraîne ; `predict()` applique le modèle appris.
```

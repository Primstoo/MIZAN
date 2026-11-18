---
id: ml-classification
titre: Classification · régression logistique, KNN, métriques, ROC
seance: Séance 5 · 27 octobre 2026
importance: 5
---

## Avant de commencer

Il te faut la matrice de confusion (TP, TN, FP, FN) du chapitre 2, et la règle $w \leftarrow w - \alpha \cdot \text{gradient}$ du chapitre 3.

```exercice Vérifie ton prérequis
? Un détecteur produit 50 alertes, dont 40 sont de vraies attaques. Il y avait 60 attaques en tout. Quelle est sa précision ?
indice: Précision = TP / (TP + FP) = vraies alertes / toutes les alertes.
reponse: 0.8
= $40/50 = 0{,}8$. Son rappel vaut $40/60 \approx 0{,}667$ : il rate un tiers des attaques.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « score, puis seuil ».** Un classifieur calcule d'abord un **score** ou une **probabilité**, puis un **seuil** transforme ce score en classe. Changer le seuil ne change pas le modèle, mais change les FP et les FN.

> [!piege] La régression logistique porte le mot « régression », mais c'est un modèle de **classification**. Elle prédit une probabilité, puis une classe.

À la fin, tu sais calculer une probabilité avec la sigmoïde et la softmax, faire un pas de descente de gradient en régression logistique, classer un point avec KNN, calculer toutes les métriques (y compris spécificité, macro et weighted) et lire une courbe ROC.

## Idée 1 · Binaire, multiclasse, multilabel

| Type | Classes | Exemple |
|---|---|---|
| Binaire | 2 | spam / non-spam |
| Multiclasse | plus de 2, **exclusives** | chiffre 0 à 9, sentiment positif / neutre / négatif |
| Multilabel | plusieurs étiquettes **à la fois** | un article à la fois « sport » et « économie » |

Un classifieur peut donner une probabilité par classe (non-spam 0,18 ; spam 0,82). Une probabilité de 0,82 n'est pas une certitude de 82 % : cela dépend du **calibrage**. Un modèle bien calibré qui prédit 0,80 pour 100 e-mails doit avoir environ 80 spams parmi eux. Selon le prof, la régression logistique est naturellement bien calibrée ; les arbres et forêts demandent souvent un recalibrage (`CalibratedClassifierCV`).

## Idée 2 · La régression logistique

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:400px;display:block;margin:10px auto" role="img" aria-label="Courbe sigmoïde en S qui passe de 0 à 1, valant 0,5 en z égal 0, avec le seuil 0,5 en pointillés">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M30 140H320M175 150V15" stroke="currentColor" stroke-width="1.2"/>
<path d="M30 138C120 136 140 120 175 78S230 22 320 20" fill="none" stroke="#D9824F" stroke-width="2.5"/>
<line x1="30" y1="78" x2="320" y2="78" stroke="currentColor" stroke-dasharray="4 4"/>
<text x="290" y="72">0,5</text><text x="290" y="16">1</text><text x="290" y="134">0</text><text x="180" y="160">z = 0</text>
<text x="40" y="70">ŷ = 0</text><text x="230" y="100">ŷ = 1</text><text x="200" y="40" fill="#D9824F">σ(z)</text></g>
</svg>
```

Une régression linéaire peut sortir des valeurs hors de $[0, 1]$. La logistique calcule un **score linéaire** $z = w^T x + b$ puis le passe dans la **sigmoïde** :

$$P(y = 1 \mid x) = \sigma(z) = \frac{1}{1 + e^{-z}}$$

$\sigma(0) = 0{,}5$ ; $z$ très négatif → proche de 0 ; $z$ très positif → proche de 1. Et $P(y = 0 \mid x) = 1 - P(y = 1 \mid x)$.

**Exemple du prof.** $z = 0{,}8x - 3$ ($x$ = heures de révision). Pour 5 h : $z = 1$, $P = 1/(1 + e^{-1}) \approx 0{,}731$.

**Seuil.** Avec $s = 0{,}5$ : $\hat y = 1$ si $P \ge 0{,}5$. Or $\sigma(z) = 0{,}5 \iff z = 0$ : la **frontière de décision** est l'hyperplan $w^T x + b = 0$. Elle est **linéaire**. Le vecteur $w$ est orthogonal à cette frontière et pointe vers la région $\hat y = 1$.

**Apprentissage.** La perte est l'**entropie croisée binaire** (log loss) :

$$\ell(y, p) = -\big[y \log p + (1 - y)\log(1 - p)\big]$$

Si $y = 1$, la perte vaut $-\log p$ : énorme quand $p \to 0$. On n'utilise pas la MSE : avec la sigmoïde elle donne une fonction **non convexe** (minima locaux), alors que la log loss est convexe. Il n'y a pas de formule fermée : on utilise la **descente de gradient**, avec ce gradient remarquablement simple :

$$\frac{\partial J}{\partial w_j} = \frac1n \sum (p_i - y_i)\, x_{ij} \qquad \frac{\partial J}{\partial b} = \frac1n \sum (p_i - y_i)$$

Il vient de la propriété $\sigma'(z) = \sigma(z)\big(1 - \sigma(z)\big)$.

```etapes Une époque de descente de gradient (exemple du prof)
Données :: 2 étudiants : $x_1 = 2$ h, $y_1 = 0$ ; $x_2 = 6$ h, $y_2 = 1$. Départ $w = 0{,}5$, $b = -1$, $\alpha = 0{,}1$.
Scores :: $z_1 = 0{,}5 \times 2 - 1 = 0$ → $p_1 = 0{,}5$. $z_2 = 3 - 1 = 2$ → $p_2 \approx 0{,}881$.
Erreurs :: $p_1 - y_1 = +0{,}5$ ; $p_2 - y_2 = -0{,}119$.
Gradients :: $\partial J/\partial w = \frac12(0{,}5 \times 2 - 0{,}119 \times 6) = 0{,}143$ ; $\partial J/\partial b = \frac12(0{,}5 - 0{,}119) \approx 0{,}19$.
Mise à jour :: $w = 0{,}5 - 0{,}1 \times 0{,}143 = 0{,}4857$ ; $b \approx -1{,}019$.
```

| Avantages | Limites |
|---|---|
| simple, rapide | frontière **linéaire** dans l'espace d'origine |
| probabilités exploitables | relations complexes difficiles sans transformation des features |
| coefficients interprétables | sensible aux variables redondantes ou mal préparées |
| bonne **référence** de départ | |

## Idée 3 · Plus de deux classes : OvR et Softmax

**One-vs-Rest (OvR)** : $K$ classifieurs binaires indépendants (« chat contre le reste »…), puis on prend la plus grande sortie. Exemple : 0,70 / 0,40 / 0,10 → chat. Les sorties ne somment pas à 1 (ici 1,20) : ce n'est pas une vraie distribution.

**Softmax** (régression logistique multinomiale) : un seul modèle, les classes en compétition.

$$p_k = \frac{e^{z_k}}{\sum_{j=1}^{K} e^{z_j}} \qquad \sum_k p_k = 1$$

```etapes Exemple du prof : scores z = (−1,6 ; 1,1 ; 1,4) pour Rattrapage, Admis, Mention
Exponentielles :: $e^{-1{,}6} \approx 0{,}202$ ; $e^{1{,}1} \approx 3{,}004$ ; $e^{1{,}4} \approx 4{,}055$. Somme $S \approx 7{,}261$.
Probabilités :: $p \approx (0{,}028 ;\ 0{,}414 ;\ 0{,}558)$.
Prédiction :: Classe 3 (Mention), 55,8 %.
Erreur pour l'apprentissage :: Si la vraie classe est Mention, $y = (0, 0, 1)$ en One-Hot et $e = p - y = (0{,}028 ;\ 0{,}414 ;\ -0{,}442)$.
```

À retenir pour le QCM : pour $K = 2$, la softmax **redevient la sigmoïde** ; ajouter une même constante à tous les $z_k$ ne change rien (on soustrait le max pour éviter l'overflow) ; le gradient par rapport aux scores vaut $p - y$ ; la perte est l'**entropie croisée catégorielle**, et la minimiser revient à **maximiser la vraisemblance**.

## Idée 4 · Les K plus proches voisins (KNN)

```html
<svg viewBox="0 0 300 170" style="width:100%;max-width:360px;display:block;margin:10px auto" role="img" aria-label="Un point inconnu au centre, un cercle contenant ses trois plus proches voisins : deux rouges et un bleu">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<circle cx="150" cy="90" r="52" fill="#D9824F" fill-opacity=".08" stroke="#D9824F" stroke-dasharray="5 4"/>
<circle cx="150" cy="90" r="7" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="160" y="86">?</text>
<g fill="#D9824F"><circle cx="118" cy="70" r="6"/><circle cx="170" cy="128" r="6"/><circle cx="60" cy="40" r="6"/></g>
<g fill="none" stroke="currentColor" stroke-width="2"><rect x="178" y="60" width="11" height="11"/><rect x="240" y="40" width="11" height="11"/><rect x="250" y="120" width="11" height="11"/><rect x="40" y="130" width="11" height="11"/></g>
<text x="10" y="165">● rouge  ■ bleu : k = 3 → 2 rouges, 1 bleu → rouge</text></g>
</svg>
```

Pour classer un point : on calcule sa distance à **tous** les points d'entraînement, on garde les $k$ plus proches, et on vote.

**Distances** (famille de Minkowski, $q \ge 1$) :

$$d_q(x, z) = \Big(\sum_j |x_j - z_j|^q\Big)^{1/q}$$

- $q = 1$ : **Manhattan**, somme des écarts. Pour $A(2, 3)$ et $B(5, 7)$ : $3 + 4 = 7$.
- $q = 2$ : **euclidienne**, ligne droite : $\sqrt{9 + 16} = 5$.
- Plus $q$ est grand, plus un gros écart sur un seul axe pèse.
- Pour du texte : distance **cosinus** $1 - \dfrac{x^T z}{\lVert x\rVert \lVert z\rVert}$.

> [!piege] **L'échelle.** Âge (écart 10 ans) et revenu (écart 50 000) : la distance vaut $\approx 50\,000{,}001$, l'âge ne compte plus. **Standardise toujours avant KNN.**

```etapes Étude de cas du prof : classer X = (3, 2)
Données :: P1 (1, 2) Rouge ; P2 (2, 5) Bleu ; P3 (4, 1) Rouge ; P4 (3, 4) Bleu ; P5 (6, 5) Bleu.
Distances :: P3 : $\sqrt2 \approx 1{,}414$ ; P1 : 2 ; P4 : 2 ; P2 : $\sqrt{10} \approx 3{,}162$ ; P5 : $\sqrt{18} \approx 4{,}243$.
k = 3 :: P3, P1, P4 → 2 Rouge, 1 Bleu → **Rouge**.
k = 5 :: tous → 2 Rouge, 3 Bleu → **Bleu**. Un grand $k$ dilue l'information locale.
k = 5 pondéré (wᵢ = 1/dᵢ) :: Rouge : $0{,}707 + 0{,}5 = 1{,}207$ ; Bleu : $0{,}5 + 0{,}316 + 0{,}236 = 1{,}052$ → **Rouge**.
```

```python
from sklearn.neighbors import KNeighborsClassifier

X = [[1, 2], [2, 5], [4, 1], [3, 4], [6, 5]]
y = ["Rouge", "Bleu", "Rouge", "Bleu", "Bleu"]
for k in (3, 5):
    vote = KNeighborsClassifier(n_neighbors=k).fit(X, y).predict([[3, 2]])[0]
    pondere = KNeighborsClassifier(n_neighbors=k, weights="distance").fit(X, y).predict([[3, 2]])[0]
    print(k, vote, pondere)
```

```sortie
3 Rouge Rouge
5 Bleu Rouge
```

| Petit $k$ (1, 3) | Grand $k$ ($k \to n$) |
|---|---|
| frontière dentelée | frontière lisse |
| biais faible, **variance élevée** | **biais élevé**, variance faible |
| risque de surapprentissage | risque de sous-apprentissage |

Si $k = n$, KNN prédit toujours la classe majoritaire. Règles du prof : $k$ **impair** en binaire (pas d'égalité), point de départ $k \approx \sqrt n$, puis choix par validation croisée, **jamais** sur le test.

KNN **n'apprend rien** pendant `fit` (il mémorise les données) et calcule tout à la prédiction : lent et gourmand sur de grands jeux, et fragile en très grande dimension (**fléau de la dimensionnalité**). Il est **non paramétrique** : aucune hypothèse sur la forme de la frontière.

## Idée 5 · Toutes les métriques d'un classifieur

```grille Exemple du prof : 200 observations
#cols: Prédit 0 | Prédit 1
#rows: Réel 0 | Réel 1
TN = 130 | *FP = 10
*FN = 20 | !TP = 40
```

| Métrique | Calcul | Valeur |
|---|---|---|
| Accuracy | $(40 + 130)/200$ | 85,0 % |
| Précision | $40/50$ | 80,0 % |
| Rappel (sensibilité, TPR) | $40/60$ | 66,7 % |
| **Spécificité** | $TN/(TN + FP) = 130/140$ | 92,9 % |
| F1 | $2 \times 0{,}8 \times 0{,}667 / 1{,}467$ | 72,7 % |

Le F1 ne tient **pas** compte des vrais négatifs.

**En multiclasse**, on calcule la métrique classe par classe (en OvR), puis on moyenne :

| Moyenne | Poids de chaque classe | Quand ? |
|---|---|---|
| **Macro** | égal ($1/K$) : « 1 classe = 1 vote » | la petite classe compte autant (maladie rare) |
| **Weighted** | proportionnel à son effectif $n_k/N$ | refléter la distribution réelle |
| **Micro** | on additionne d'abord tous les TP, FP… | « 1 observation = 1 vote », multilabel |

Exemple du prof (spécificités Chat 0,960 ; Chien 0,843 ; Oiseau 0,925 ; effectifs 50 %, 30 %, 20 %) : macro $= 0{,}909$, weighted $= 0{,}918$. La weighted est plus haute car le modèle est bon sur la grosse classe.

## Idée 6 · Seuil, courbe ROC et AUC

| Seuil bas (0,2) | Seuil haut (0,8) |
|---|---|
| beaucoup de positifs prédits | peu de positifs prédits |
| **rappel ↑**, plus de FP | **précision ↑**, plus de FN |

La **courbe ROC** (*Receiver Operating Characteristic*, née du radar pendant la Seconde Guerre mondiale) trace, pour **tous** les seuils :

- en ordonnée le **TPR** = rappel $= TP/(TP + FN)$ ;
- en abscisse le **FPR** $= FP/(FP + TN) = 1 -$ spécificité.

```html
<svg viewBox="0 0 220 200" style="width:100%;max-width:280px;display:block;margin:10px auto" role="img" aria-label="Courbe ROC en escalier passant par les points (0 ; 0,67), (0,5 ; 0,67), (0,5 ; 1) puis (1 ; 1), au-dessus de la diagonale du hasard">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M30 170H200M30 170V10" stroke="currentColor" stroke-width="1.5"/>
<line x1="30" y1="170" x2="200" y2="10" stroke="currentColor" stroke-dasharray="4 4"/>
<path d="M30 170V63H115V10H200" fill="#D9824F" fill-opacity=".15" stroke="#D9824F" stroke-width="2.5"/>
<text x="120" y="186">FPR</text><text x="2" y="90" transform="rotate(-90 12 90)">TPR</text>
<text x="120" y="130">hasard (AUC 0,5)</text><text x="40" y="40" fill="#D9824F">AUC = 5/6</text></g>
</svg>
```

```etapes Exemple du prof : 5 individus triés par probabilité
Données :: 0,90 (P) ; 0,80 (P) ; 0,60 (N) ; 0,40 (P) ; 0,20 (N). Soit 3 positifs, 2 négatifs.
Seuil 0,75 :: TP = 2, FP = 0 → point (0 ; 0,67).
Seuil 0,50 :: TP = 2, FP = 1 → point (0,5 ; 0,67).
Seuil 0,30 :: TP = 3, FP = 1 → point (0,5 ; 1).
AUC :: L'aire vaut $0{,}5 \times 0{,}67 + 0{,}5 \times 1 \approx 0{,}83$, soit $5/6$ : sur les 6 paires (positif, négatif), 5 sont bien ordonnées.
```

$$\text{AUC} = P\big(\text{Score}(X_+) > \text{Score}(X_-)\big)$$

| AUC | Lecture |
|---|---|
| 1 | parfait |
| 0,7 à 0,9 | bon modèle |
| 0,5 | hasard, inutile |
| < 0,5 | pire que le hasard (inversé) |

L'AUC est **invariante au seuil** et **invariante à l'échelle** des scores (elle ne dépend que de leur ordre).

| | Régression logistique | KNN |
|---|---|---|
| Principe | apprend $(w, b)$ une fois pour toutes | mémorise les données, cherche les voisins |
| Prédiction | probabilité puis seuil | vote des $k$ voisins |
| Frontière | linéaire | quelconque (non linéaire) |
| Coût | rapide à prédire | lent à prédire sur de gros jeux |

## S'exercer

```exercice Classification à la main
? $z = 0{,}8x - 3$. Calcule $z$ pour un étudiant qui a révisé 2 heures, puis dis si $P > 0{,}5$.
reponse: -1.4 ~0.001
= $z = 1{,}6 - 3 = -1{,}4 < 0$, donc $P = \sigma(-1{,}4) < 0{,}5$ : prédit « échec » avec le seuil 0,5.

? 100 malades et 900 sains. TP = 70, FN = 30, FP = 90, TN = 810. Calcule la spécificité.
reponse: 0.9
= $810 / (810 + 90) = 0{,}9$.

? Même matrice : calcule le FPR.
reponse: 0.1
= $FPR = 1 - 0{,}9 = 0{,}1$.

? Calcule la distance de Manhattan entre $(1, 2)$ et $(4, 6)$.
reponse: 7
= $|4 - 1| + |6 - 2| = 7$ ; la distance euclidienne vaut 5.
```

## Flashcards

```cartes
Sigmoïde :: σ(z) = 1/(1 + e^(−z)) ; σ(0) = 0,5. Transforme un score en probabilité.
Frontière de la logistique :: wᵀx + b = 0 (seuil 0,5) : un hyperplan, donc une frontière linéaire.
Log loss :: −[y log p + (1 − y) log(1 − p)]. Convexe avec la sigmoïde, contrairement à la MSE.
Gradient de la logistique :: ∂J/∂wj = (1/n) Σ (pi − yi) xij. Pas de formule fermée : descente de gradient.
Softmax :: pk = e^(zk) / Σ e^(zj) : vraie distribution (somme 1). Pour K = 2, c'est la sigmoïde.
OvR :: K classifieurs binaires indépendants ; les sorties ne somment pas à 1.
KNN :: Vote des k plus proches voisins. Non paramétrique, sensible à l'échelle, coûteux à la prédiction.
Petit k / grand k :: Petit k : variance élevée (surapprentissage). Grand k : biais élevé. k = n : classe majoritaire.
Manhattan vs euclidienne :: q = 1 : somme des |écarts|. q = 2 : racine de la somme des carrés.
Spécificité :: TN / (TN + FP). FPR = 1 − spécificité.
Macro vs weighted :: Macro : chaque classe pèse pareil. Weighted : pondérée par l'effectif.
ROC :: TPR (rappel) en fonction du FPR, pour tous les seuils.
AUC :: Probabilité qu'un positif ait un score plus haut qu'un négatif. 0,5 = hasard, 1 = parfait.
```

## QCM du chapitre

```qcm
? La régression logistique est principalement utilisée pour :
- le clustering
- la régression d'une valeur continue
+ la classification
= Malgré son nom, elle prédit une probabilité puis une classe.


? Que vaut $\sigma(0)$ ?
+ 0,5
- 1
- 0
= $1/(1 + e^0) = 1/2$.


? Avec $z = 0{,}8x - 3$, la probabilité de réussite pour $x = 5$ est environ :
- 0,5
+ 0,731
- 0,881
= $z = 1$ et $\sigma(1) \approx 0{,}731$.


? Avec le seuil 0,5, la frontière de décision de la régression logistique est :
- l'ensemble des points où $w^T x + b = 0{,}5$
- une courbe en S dans l'espace des features
+ l'ensemble des points où $w^T x + b = 0$
= $\sigma(z) = 0{,}5 \iff z = 0$ : c'est un hyperplan, la frontière est linéaire.


? Pourquoi ne pas entraîner la régression logistique avec la MSE ?
+ avec la sigmoïde, la MSE donne une fonction de coût non convexe
- la MSE ne s'applique qu'aux entiers
- la MSE est trop lente à calculer
= La log loss garantit un coût convexe, sans minima locaux secondaires.


? Pour une observation, le gradient de la log loss par rapport à $w_j$ vaut :
- $p(1 - p)$
+ $(p - y)\,x_j$
- $(y - p)^2$
= C'est la simplification remarquable vue en cours ; $p(1-p)$ est la dérivée de la sigmoïde.


? En One-vs-Rest à 3 classes, les sorties 0,70 ; 0,40 ; 0,10 :
- sont impossibles
- forment une distribution de probabilité
+ ne somment pas à 1, mais on prédit quand même la classe à 0,70
= Les 3 modèles sont indépendants ; on applique un argmax.


? La fonction softmax garantit que :
+ les probabilités sont dans $]0, 1[$ et somment à 1
- la classe prédite est toujours la première
- chaque probabilité vaut 0 ou 1
= C'est une vraie distribution, contrairement à l'OvR.


? Scores $z = (-1{,}6 ;\ 1{,}1 ;\ 1{,}4)$. Quelle classe la softmax prédit-elle ?
- la classe 2
+ la classe 3
- la classe 1
= Le score le plus haut donne la plus grande probabilité (≈ 55,8 %).


? Pour $K = 2$ classes, la softmax est équivalente à :
- la fonction ReLU
- la tangente hyperbolique
+ la sigmoïde
= En posant $z_2 = 0$, $p_1 = e^z/(e^z + 1) = \sigma(z)$.


? Distance euclidienne entre $A(2, 3)$ et $B(5, 7)$ :
+ 5
- 7
- 25
= $\sqrt{3^2 + 4^2} = 5$. La distance de Manhattan vaut 7.


? Pourquoi standardiser avant KNN ?
- pour accélérer l'entraînement
+ parce qu'une variable à grande échelle écrase les autres dans le calcul des distances
- parce que KNN n'accepte que des valeurs entre 0 et 1
= Un écart de revenu de 50 000 noie un écart d'âge de 10.


? Dans l'étude de cas du prof, la prédiction passe de Rouge ($k = 3$) à Bleu ($k = 5$). Cela illustre que :
- le vote pondéré est inutile
- KNN est déterministe
+ un grand $k$ dilue l'information locale au profit de la classe globale
= Avec $k = 5$, tous les points votent : la classe majoritaire globale (Bleu) gagne.


? Un KNN avec $k = 1$ a typiquement :
+ un biais faible et une variance élevée
- un biais et une variance nuls
- un biais élevé et une variance faible
= Il suit chaque point, y compris le bruit : risque de surapprentissage.


? Pendant `fit()`, KNN :
- calcule des coefficients $w$
+ mémorise simplement les données d'entraînement
- construit un arbre de décision
= Tout le calcul (distances, vote) se fait à la prédiction.


? 200 observations : TP = 40, FN = 20, FP = 10, TN = 130. La spécificité vaut :
- 66,7 %
- 80 %
+ 92,9 %
= $TN/(TN + FP) = 130/140$.


? Quelle métrique ne tient **pas** compte des vrais négatifs ?
+ le F1-score
- la spécificité
- l'accuracy
= Le F1 combine précision et rappel, qui n'utilisent pas TN.


? Une maladie rare doit absolument être bien détectée. Pour résumer un modèle multiclasse, on préfère la moyenne :
- micro
+ macro
- weighted
= Macro donne le même poids à chaque classe : une mauvaise performance sur la petite classe se voit.


? Baisser le seuil de décision de 0,5 à 0,2 :
- augmente la précision et les faux négatifs
- ne change rien aux prédictions
+ augmente le rappel et augmente les faux positifs
= Plus d'observations passent en positif.


? La courbe ROC représente :
+ le TPR en fonction du FPR pour tous les seuils
- l'accuracy en fonction de $k$
- la précision en fonction du rappel
= TPR = rappel, FPR = 1 − spécificité.


? Une AUC de 0,5 signifie :
- un modèle parfait
+ un modèle équivalent au hasard
- un modèle pire que le hasard
= Moins de 0,5 serait pire que le hasard ; 1 serait parfait.


? Une AUC de 0,85 signifie :
- 85 % des prédictions sont correctes
- le seuil optimal vaut 0,85
+ 85 % de chances qu'un positif tiré au hasard ait un score plus élevé qu'un négatif tiré au hasard
= C'est l'interprétation probabiliste de l'AUC.
```

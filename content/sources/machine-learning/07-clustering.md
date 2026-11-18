---
id: ml-clustering
titre: Apprentissage non supervisé · K-Means, CAH, DBSCAN
seance: Séance 7 · 9 novembre 2026
importance: 5
---

## Avant de commencer

Il te faut la distance euclidienne entre deux points du plan et la formule du Z-score (chapitres 2 et 5).

```exercice Vérifie ton prérequis
? Calcule la distance euclidienne entre $A(1, 2)$ et $B(4, 6)$.
indice: $\sqrt{(4-1)^2 + (6-2)^2}$
reponse: 5
= $\sqrt{9 + 16} = 5$. La distance de Manhattan vaut $3 + 4 = 7$.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « carte sans légende ».** Il n'y a pas de cible $y$ : l'algorithme ne sait pas ce qu'il cherche. Il s'appuie sur une seule idée géométrique : des points **proches** doivent être dans le même groupe, des groupes différents doivent être **loin**.

> [!piege] Lancer K-Means ou DBSCAN sur des données **non standardisées**. Avec l'âge (20 à 60) et le salaire (10 000 à 100 000 DH), la distance ne voit que le salaire. Standardise d'abord.

À la fin, tu sais choisir une distance, standardiser, dérouler K-Means à la main, calculer une inertie et une silhouette, lire un dendrogramme (Single, Complete, Average, Ward), et classer des points avec DBSCAN.

## Idée 1 · Supervisé ou non supervisé

| | Supervisé | Non supervisé |
|---|---|---|
| Données | caractéristiques **+ étiquettes** | caractéristiques **seules** |
| But | prédire | **découvrir** une structure |

Les quatre familles du non supervisé : **clustering** (regrouper), **réduction de dimension** (ex. PCA : 3D → 2D), **détection d'anomalies**, **règles d'association** (« achat X ⇒ achat Z »).

Un bon clustering optimise deux critères à la fois : la **cohésion** (points proches de leur centroïde, variance interne minimale) et la **séparation** (groupes éloignés les uns des autres). Le **centroïde** $\mu$ d'un groupe est la moyenne de ses points.

## Idée 2 · Mesurer la similarité

| Mesure | Formule | Exemple A(1, 2), B(4, 6) |
|---|---|---|
| Euclidienne ($L_2$) | $\sqrt{\sum (a_j - b_j)^2}$ | 5 |
| Manhattan ($L_1$) | $\sum \lvert a_j - b_j \rvert$ | 7 |
| Minkowski | $\big(\sum \lvert a_j - b_j\rvert^p\big)^{1/p}$ | $p = 1$ : Manhattan, $p = 2$ : euclidienne |

**Similarité cosinus** : l'angle entre deux vecteurs, pas leur longueur. $A(1, 2)$, $B(2, 1)$ : $\cos = \dfrac{4}{\sqrt5 \times \sqrt5} = 0{,}8$. Et $A(1, 2)$, $B(2, 4)$ ont la même direction : $\cos = 1$. Elle varie de $-1$ (opposés) à $1$ (même direction) ; $0$ = perpendiculaires. Ce n'est pas une distance au sens strict : on utilise $d_{cos} = 1 - \cos$. Très utilisée pour le **texte** (vecteurs TF-IDF).

> [!piege] Coder les villes Béni Mellal = 1, Casablanca = 2, Rabat = 3, puis calculer une distance euclidienne : Rabat devient « deux fois plus loin » de Béni Mellal que Casablanca. Absurde. Solutions : **One-Hot**, distance de **Hamming** (0 si identique, 1 sinon), distance de **Gower** (données mixtes), ou l'algorithme **K-Modes** (données 100 % catégorielles).

**Standardisation.** Clients A (20 ans, 20 000 DH) et B (40 ans, 80 000 DH) : distance brute $\approx 60\,000$, l'âge ne compte pas. Avec $\mu_{âge} = 30$, $\sigma_{âge} = 10$, $\mu_{sal} = 50\,000$, $\sigma_{sal} = 30\,000$ : $A' = (-1, -1)$, $B' = (1, 1)$, distance $\sqrt8 \approx 2{,}83$, et les deux variables pèsent autant.

```python
import numpy as np
from sklearn.preprocessing import StandardScaler

X = np.array([[20, 20000], [30, 50000], [40, 80000]])
print(StandardScaler().fit_transform(X).round(2))
```

```sortie
[[-1.22 -1.22]
 [ 0.    0.  ]
 [ 1.22  1.22]]
```

`fit_transform` fait deux choses : `fit` (calcule $\mu$ et $\sigma$ de chaque colonne) puis `transform` (applique $z = (x - \mu)/\sigma$). Min-Max force dans $[0, 1]$ (10 → 0, 50 → 1, donc 30 → 0,5). Si les données ont des valeurs extrêmes : `RobustScaler`.

## Idée 3 · K-Means

```html
<svg viewBox="0 0 320 170" style="width:100%;max-width:380px;display:block;margin:10px auto" role="img" aria-label="Six clients en deux groupes, chacun avec son centroïde marqué d'une croix">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<path d="M30 150H310M30 150V10" stroke="currentColor" stroke-width="1.2"/>
<g fill="#D9824F"><circle cx="70" cy="130" r="5"/><circle cx="85" cy="110" r="5"/><circle cx="100" cy="120" r="5"/></g>
<g fill="none" stroke="currentColor" stroke-width="2"><circle cx="220" cy="50" r="5"/><circle cx="250" cy="50" r="5"/><circle cx="235" cy="30" r="5"/></g>
<path d="M80 116l10 10M90 116l-10 10" stroke="#D9824F" stroke-width="3"/><path d="M230 38l10 10M240 38l-10 10" stroke="currentColor" stroke-width="3"/>
<text x="60" y="95" fill="#D9824F">C1, μ₁ = (1,5 ; 1,5)</text><text x="185" y="80">C2, μ₂ = (5,5 ; 5,33)</text></g>
</svg>
```

On fixe $K$, puis on minimise l'**inertie intra-classe** (WCSS) :

$$J = \sum_{k=1}^{K} \sum_{x_i \in C_k} \lVert x_i - \mu_k \rVert^2$$

```etapes L'algorithme de Lloyd (1957)
1. Initialiser :: Choisir $K$ centroïdes (au hasard, ou mieux avec **K-Means++**, le défaut de scikit-learn, qui les éloigne les uns des autres).
2. Affecter :: Chaque point rejoint le centroïde le plus proche.
3. Mettre à jour :: Chaque centroïde devient la moyenne des points de son groupe (un point virtuel, pas forcément une observation).
4. Répéter :: Jusqu'à ce que les affectations ne changent plus (ou que les centroïdes bougent moins qu'une tolérance).
```

```etapes Exemple du prof : 6 clients, K = 2
Données :: P1 (1, 1), P2 (1,5 ; 2), P3 (2 ; 1,5), P4 (5, 5), P5 (6, 5), P6 (5,5 ; 6). Départ : μ₁ = P1, μ₂ = P5.
Affectation de P2 :: $d(P2, \mu_1) = \sqrt{0{,}25 + 1} \approx 1{,}118$ ; $d(P2, \mu_2) \approx 5{,}408$ → C1.
Groupes :: C1 = {P1, P2, P3} et C2 = {P4, P5, P6}.
Nouveaux centroïdes :: μ₁ = (1,5 ; 1,5) et μ₂ = (5,5 ; 5,33).
Itération suivante :: Les affectations ne changent plus : convergence.
Inertie :: $J_1 = 0{,}5 + 0{,}25 + 0{,}25 = 1$ ; $J_2 \approx 0{,}361 + 0{,}361 + 0{,}444 = 1{,}167$ ; $J \approx 2{,}167$.
```

```python
from sklearn.cluster import KMeans

X = np.array([[1, 1], [1.5, 2], [2, 1.5], [5, 5], [6, 5], [5.5, 6]])
km = KMeans(n_clusters=2, init=np.array([[1, 1], [6, 5]]), n_init=1).fit(X)
print(km.labels_)
print(km.cluster_centers_.round(2))
print(round(km.inertia_, 3))
```

```sortie
[0 0 0 1 1 1]
[[1.5  1.5 ]
 [5.5  5.33]]
2.167
```

**Propriétés.** Lloyd converge toujours, en un nombre fini d'itérations, mais vers un **minimum local** : le résultat dépend de l'initialisation (d'où `n_init`, plusieurs lancements, le meilleur gardé). Complexité $O(n \cdot K \cdot I \cdot d)$ : rapide, adapté aux gros volumes.

> [!piege] **L'inertie diminue toujours quand $K$ augmente.** Avec $K = n$, chaque point est son propre centroïde : $J = 0$, et on n'a rien appris. C'est l'équivalent du surapprentissage. Ne cherche pas l'inertie minimale.

**Choisir $K$.**

- **Méthode du coude** : tracer l'inertie en fonction de $K$ ; le « coude » est là où la baisse ralentit nettement. Il n'est pas toujours net.
- **Silhouette** : pour chaque point, $a(i)$ = distance moyenne à son groupe, $b(i)$ = plus petite distance moyenne à un autre groupe.

$$s(i) = \frac{b(i) - a(i)}{\max\big(a(i), b(i)\big)} \in [-1, 1]$$

$s \approx 1$ : bien placé ; $s \approx 0$ : à la frontière ; $s < 0$ : probablement mal affecté. Exemple du prof : $a = 2$, $b = 5$ → $s = 3/5 = 0{,}6$. Le score global (`silhouette_score`) est la moyenne : on choisit le $K$ qui le **maximise**. Contrairement à l'inertie, il ne baisse pas mécaniquement avec $K$.

## Idée 4 · La classification ascendante hiérarchique (CAH)

On part de $n$ groupes d'un point, puis on fusionne à chaque étape les **deux groupes les plus proches**, jusqu'à n'en avoir qu'un. L'historique forme un **dendrogramme**.

Toute la question est : quelle distance entre deux **groupes** (le *linkage*) ? Exemple du prof : $C_1 = \{A(1, 1), B(2, 1)\}$ et $C_2 = \{C(6, 5), D(7, 5)\}$, avec $d(A,C) = 6{,}403$, $d(A,D) = 7{,}211$, $d(B,C) = 5{,}657$, $d(B,D) = 6{,}403$.

| Linkage | Règle | Valeur | Tendance |
|---|---|---|---|
| **Single** | distance **minimale** | 5,657 | effet de **chaîne**, formes étirées, sensible au bruit |
| **Complete** | distance **maximale** | 7,211 | groupes compacts, sensible aux outliers |
| **Average** | **moyenne** des distances | 6,419 | compromis |
| **Ward** | plus faible **hausse d'inertie** $\frac{n_1 n_2}{n_1 + n_2}\lVert \mu_1 - \mu_2\rVert^2$ | $\frac{4}{4} \times 41 = 41$ | groupes compacts et homogènes |

La valeur de Ward est une hausse d'inertie, pas une distance : on ne la compare pas aux trois autres.

```html
<svg viewBox="0 0 300 170" style="width:100%;max-width:340px;display:block;margin:10px auto" role="img" aria-label="Dendrogramme de cinq points : A et B fusionnent à 1, D et E à 1, AB et C à 1,58, puis tout à 5,15, avec une coupe horizontale qui donne deux groupes">
<g font-family="sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
<path d="M40 150V130H80V150M60 130V112H120V150M90 112V30H220V130M200 150V130H240V150" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="20" y1="70" x2="280" y2="70" stroke="#D9824F" stroke-width="2" stroke-dasharray="6 4"/>
<text x="40" y="164">A</text><text x="80" y="164">B</text><text x="120" y="164">C</text><text x="200" y="164">D</text><text x="240" y="164">E</text>
<text x="270" y="134" font-size="10">h = 1</text><text x="150" y="108" font-size="10">1,58</text><text x="155" y="24" font-size="10">5,15</text>
<text x="255" y="64" fill="#D9824F">coupe → 2 groupes</text></g>
</svg>
```

**Lire le dendrogramme.** La hauteur d'une fusion = la distance à laquelle elle a lieu. On coupe horizontalement là où le **saut vertical sans fusion est le plus grand** (ici entre 1,58 et 5,15). Le nombre de branches verticales coupées = le nombre de groupes.

| | K-Means | CAH |
|---|---|---|
| Nombre de groupes | fixé **avant** | lu **après**, sur le dendrogramme |
| Résultat | dépend de l'initialisation | **déterministe** (distance et linkage fixés) |
| Formes | compactes, sphériques | étirées possibles (Single) |
| Gros volumes | très rapide | lourd ($O(N^3)$ en version naïve) |

En pratique : SciPy (`linkage`, `dendrogram`) pour explorer et choisir $K$, puis scikit-learn (`AgglomerativeClustering(n_clusters=..., linkage=...)`) pour affecter les points.

## Idée 5 · DBSCAN : les groupes comme zones denses

Deux paramètres : $\varepsilon$ (le rayon du voisinage) et **MinPts** (le nombre minimal de points dans ce rayon). Le voisinage $N_\varepsilon(p) = \{q : d(p, q) \le \varepsilon\}$ **contient $p$ lui-même**.

| Type | Condition |
|---|---|
| **Cœur** | $\lvert N_\varepsilon(p)\rvert \ge$ MinPts |
| **Frontière** | moins de MinPts voisins, mais dans le voisinage d'un point cœur |
| **Bruit** | ni l'un ni l'autre → étiquette **−1** |

Un cluster se propage de proche en proche, de point cœur en point cœur (effet boule de neige). Un point frontière appartient au cluster mais ne propage rien.

```etapes Exemple du prof : ε = 1,5, MinPts = 4
Point A (1, 1) :: Voisins : A, B, C, D (distances 0 ; 1 ; 1 ; 1,41). 4 points ≥ 4 → cœur, le cluster C1 naît.
Point D (2, 2) :: Capte A, B, C, lui-même et E (3, 2) : 5 voisins → cœur, le cluster s'étend à E.
Point E (3, 2) :: Ne capte que E, D, B : 3 < 4 → **frontière**. Dans C1, mais le cluster s'arrête là.
Point X (4,5 ; 4,5) :: Le plus proche est E à $\approx 2{,}91 > 1{,}5$. Voisinage = {X} → **bruit** (−1).
```

> [!attention] Un point « bruit » n'est pas forcément une anomalie : il est peut-être juste dans une zone peu dense. Le prof insiste sur cette nuance.

**Choisir les paramètres.** MinPts d'abord : au moins $2 \times d$ ($d$ = dimension), au minimum 3, plus si les données sont bruitées ou volumineuses. Puis $\varepsilon$ par le **graphe des k-distances** ($k$ = MinPts) : distance de chaque point à son $k$-ième voisin, triée ; $\varepsilon$ = l'ordonnée du coude. $\varepsilon$ trop petit : beaucoup de bruit, groupes fragmentés. Trop grand : groupes fusionnés.

| | K-Means | CAH | DBSCAN |
|---|---|---|---|
| Principe | centroïdes | fusions successives | densité |
| Nombre de groupes | fixé | coupe du dendrogramme | **découvert seul** |
| Formes | sphériques | selon le linkage | **quelconques** (lunes, anneaux) |
| Bruit | non détecté (tout point est affecté) | non détecté | **détecté** (−1) |
| Paramètres | $K$, initialisation | linkage, nombre de groupes | $\varepsilon$, MinPts |

Limite de DBSCAN : un seul couple ($\varepsilon$, MinPts) convient mal à des groupes de **densités très différentes**, et il marche moins bien en grande dimension.

## S'exercer

```exercice Clustering à la main
? Similarité cosinus entre $A(1, 0)$ et $B(0, 1)$ ?
reponse: 0
= Produit scalaire nul : vecteurs perpendiculaires, $\cos = 0$.

? Silhouette d'un point avec $a(i) = 4$ et $b(i) = 2$ ?
reponse: -0.5
= $(2 - 4)/4 = -0{,}5 < 0$ : le point est plus proche du groupe voisin, sans doute mal affecté.

? Groupe {(0, 0), (2, 0)}. Calcule son inertie autour de son centroïde.
indice: Le centroïde est (1, 0).
reponse: 2
= Chaque point est à distance 1 du centroïde : $1^2 + 1^2 = 2$.

? Ward : deux groupes de 1 et 3 points, $\lVert \mu_1 - \mu_2 \rVert^2 = 8$. Hausse d'inertie ?
reponse: 6
= $\frac{1 \times 3}{4} \times 8 = 6$.
```

## Flashcards

```cartes
Non supervisé :: Pas de cible y ; on découvre une structure (groupes, dimensions, anomalies, associations).
Cohésion et séparation :: Points proches dans un groupe ; groupes éloignés entre eux.
Similarité cosinus :: A·B / (‖A‖‖B‖) ∈ [−1, 1] ; mesure l'orientation, pas la longueur. Utile pour le texte.
Variables catégorielles et distance :: One-Hot, Hamming, Gower (mixte) ou K-Modes ; jamais un codage 1, 2, 3 arbitraire.
Inertie (WCSS) :: Σ ‖xi − μk‖² ; diminue toujours quand K augmente (0 si K = n).
Lloyd :: Affecter au centroïde le plus proche, recalculer les moyennes, répéter. Converge vers un minimum local.
K-Means++ :: Initialisation qui éloigne les centroïdes de départ (défaut de scikit-learn).
Silhouette :: s = (b − a)/max(a, b) ∈ [−1, 1] ; on choisit le K qui la maximise.
Single / Complete / Average :: Distance min (effet de chaîne) / max (compacts, outliers) / moyenne (compromis).
Ward :: Fusion qui augmente le moins l'inertie : n1n2/(n1 + n2) ‖μ1 − μ2‖².
Couper un dendrogramme :: Là où le saut vertical sans fusion est le plus grand.
DBSCAN :: Cœur (≥ MinPts dans ε), frontière (voisin d'un cœur), bruit (−1). Trouve seul le nombre de groupes.
Choisir ε :: Graphe des k-distances (k = MinPts) : ε = ordonnée du coude.
```

## QCM du chapitre

```qcm
? Quelle tâche relève de l'apprentissage **non** supervisé ?
- prédire le prix d'un logement
+ regrouper des acheteurs selon leur comportement
- détecter un spam à partir d'e-mails étiquetés
= Pas d'étiquettes : on découvre des groupes.


? Similarité cosinus entre $A(1, 2)$ et $B(2, 4)$ :
- 0
- 0,8
+ 1
= Même direction ; la cosinus ne dépend pas de la longueur.


? Coder Béni Mellal = 1, Casablanca = 2, Rabat = 3 avant un clustering euclidien est une erreur car :
+ cela crée un ordre et des distances qui n'ont pas de sens
- les nombres sont trop petits
- K-Means n'accepte que des entiers pairs
= Une variable nominale doit être encodée en One-Hot ou traitée avec une distance adaptée.


? Pourquoi standardiser avant K-Means ?
- pour que l'algorithme converge en une itération
+ pour qu'une variable à grande échelle ne domine pas la distance
- pour obtenir exactement K groupes
= K-Means repose entièrement sur des distances.


? Dans K-Means, le centroïde d'un groupe est :
- le premier point affecté au groupe
- le point le plus central parmi les observations
+ la moyenne des coordonnées des points du groupe
= Ce peut être un point virtuel, absent des données.


? Quand on augmente $K$, l'inertie de K-Means :
+ diminue toujours
- augmente toujours
- reste constante
= Avec $K = n$ elle vaut même 0 : il ne faut donc pas chercher le minimum absolu.


? L'algorithme de Lloyd garantit :
- de trouver le meilleur clustering possible
+ de converger, mais éventuellement vers un minimum local
- un résultat indépendant de l'initialisation
= D'où K-Means++ et le paramètre `n_init`.


? Dans l'exemple du prof, $\mu_2$ après la première mise à jour vaut :
- (6 ; 5)
- (5 ; 5)
+ (5,5 ; 5,33)
= Moyenne de (5, 5), (6, 5) et (5,5 ; 6).


? Un point a $a(i) = 2$ et $b(i) = 5$. Sa silhouette vaut :
+ 0,6
- 2,5
- 0,4
= $(5 - 2)/5 = 0{,}6$.


? Une silhouette négative signifie que le point :
- est un point cœur
+ est plus proche d'un autre groupe que du sien
- est parfaitement affecté
= $a(i) > b(i)$ : affectation probablement mauvaise.


? Avec le score de silhouette global, on choisit $K$ qui :
- le rend égal à 0
- le minimise
+ le maximise
= Plus proche de 1, meilleure partition.


? Quel linkage provoque l'**effet de chaîne** ?
+ Single (distance minimale)
- Complete (distance maximale)
- Ward
= Il suffit d'une paire proche pour fusionner deux groupes, même étirés.


? Le critère de Ward fusionne les deux groupes qui :
- ont les centroïdes les plus éloignés
+ augmentent le moins l'inertie intra-classe
- contiennent le plus de points
= Hausse $\frac{n_1 n_2}{n_1 + n_2}\lVert \mu_1 - \mu_2\rVert^2$, qui tient compte des effectifs.


? Sur un dendrogramme, on coupe de préférence :
- toujours à mi-hauteur
- tout en bas
+ là où le saut vertical sans fusion est le plus grand
= Couper plus haut forcerait l'union de groupes très éloignés.


? Avantage de la CAH sur K-Means :
+ le nombre de groupes peut être choisi après coup sur le dendrogramme
- elle est plus rapide sur 500 000 observations
- elle détecte le bruit avec l'étiquette −1
= Mais elle est bien plus lourde en calcul et en mémoire.


? Dans DBSCAN, un point dont le voisinage contient au moins MinPts points est :
- un point bruit
+ un point cœur
- un point frontière
= Le point lui-même compte dans son voisinage.


? Avec $\varepsilon = 1{,}5$ et MinPts = 4, le point E a 3 points dans son voisinage mais il est voisin d'un point cœur. E est :
- du bruit
- un point cœur
+ un point frontière
= Il appartient au cluster sans pouvoir le propager.


? Quelle étiquette scikit-learn donne-t-il aux points de bruit de DBSCAN ?
+ −1
- `None`
- 0
= Les points non rattachés à un cluster reçoivent −1.


? Pourquoi DBSCAN réussit-il sur deux lunes entrelacées là où K-Means échoue ?
- parce qu'il utilise la distance de Manhattan
+ parce qu'il suit les zones denses au lieu de former des groupes autour d'un centre
- parce qu'il fixe K = 2
= K-Means coupe par une frontière droite entre deux centroïdes.


? Si on augmente fortement $\varepsilon$ dans DBSCAN :
- l'algorithme ne converge plus
- on obtient plus de points de bruit
+ des groupes distincts risquent de fusionner
= Un rayon trop grand relie tout ; trop petit, tout devient bruit.
```

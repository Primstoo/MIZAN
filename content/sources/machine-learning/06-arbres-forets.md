---
id: ml-arbres-forets
titre: Arbres de décision et forêts aléatoires
seance: Séance 6 · 3 novembre 2026
importance: 5
---

## Avant de commencer

Il te faut deux choses : une proportion ($6$ réussites sur $10$ = $0{,}6$) et le logarithme en base 2 ($\log_2 1 = 0$, $\log_2 0{,}5 = -1$).

```exercice Vérifie ton prérequis
? Un groupe contient 8 réussites et 2 échecs. Quelles sont les proportions $p_+$ et $p_-$ ?
reponse: 0.8
= $p_+ = 8/10 = 0{,}8$ et $p_- = 0{,}2$. Elles somment toujours à 1.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « jeu des questions ».** Un arbre pose une question (« Note ≤ 10 ? »), coupe le groupe en deux, et recommence dans chaque sous-groupe. Il choisit à chaque fois la question qui **trie le mieux**, c'est-à-dire qui rend les groupes les plus **purs**.

> [!piege] Croire que l'arbre cherche le meilleur arbre global. Il est **glouton** : il prend la meilleure question **maintenant**, sans anticiper et sans jamais revenir en arrière.

À la fin, tu sais calculer une entropie, un gain d'information, un Gini et sa réduction, distinguer ID3, C4.5 et CART, expliquer l'élagage, le bootstrap, le bagging et le fonctionnement d'une forêt aléatoire.

## Idée 1 · Un arbre = des questions successives

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:400px;display:block;margin:10px auto" role="img" aria-label="Arbre de décision : la racine teste la note, la branche gauche teste les absences, et les feuilles donnent réussite ou échec">
<g font-family="sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
<rect x="120" y="10" width="100" height="28" rx="6" fill="#D9824F" fill-opacity=".2" stroke="#D9824F" stroke-width="2"/><text x="170" y="28">Note ≤ 10 ?</text>
<path d="M150 38L90 70M190 38L250 70" stroke="currentColor"/><text x="108" y="56">oui</text><text x="232" y="56">non</text>
<rect x="40" y="70" width="100" height="28" rx="6" fill="none" stroke="currentColor"/><text x="90" y="88">Absences ≤ 1 ?</text>
<rect x="210" y="70" width="80" height="28" rx="14" fill="currentColor" fill-opacity=".12" stroke="currentColor"/><text x="250" y="88">Réussite</text>
<path d="M70 98L45 130M110 98L135 130" stroke="currentColor"/>
<rect x="5" y="130" width="80" height="28" rx="14" fill="currentColor" fill-opacity=".12" stroke="currentColor"/><text x="45" y="148">Réussite</text>
<rect x="95" y="130" width="80" height="28" rx="14" fill="currentColor" fill-opacity=".12" stroke="currentColor"/><text x="135" y="148">Échec</text>
<text x="300" y="150" font-size="10">nœud → test</text><text x="300" y="164" font-size="10">feuille → décision</text></g>
</svg>
```

Un arbre résout la **classification** (feuille = une classe) comme la **régression** (feuille = une valeur). La construction est **récursive** :

```flux Construction gloutonne
Nœud -> Chercher la meilleure séparation -> Créer deux sous-groupes -> Recommencer sur chacun -> Arrêt : feuille
```

**Conditions d'arrêt** : nœud **pur** (une seule classe), profondeur maximale atteinte, trop peu d'observations, ou aucune séparation n'améliore assez le critère.

Dans les arbres CART, chaque question porte sur **une seule variable** à la fois : l'arbre ne fait pas de combinaison linéaire des variables.

> [!attention] Le comportement glouton a un prix (exemple du prof) : la variable A rapporte +40 % tout de suite puis +10 % ; la variable B rapporte +15 % puis +65 %. L'arbre choisit A (gain total 50 %) et rate B (80 %). En échange, il construit un bon arbre en une fraction de seconde.

## Idée 2 · Mesurer le désordre : l'entropie

$$H(S) = -\sum_k p_k \log_2 p_k$$

- nœud pur : $H = 0$ ;
- deux classes à 50 / 50 : $H = -0{,}5\log_2 0{,}5 - 0{,}5\log_2 0{,}5 = 1$ (le maximum en binaire).

Le **gain d'information** d'une séparation $A$ est la baisse d'entropie, avec une moyenne **pondérée par la taille** des enfants :

$$\text{Gain}(S, A) = H(S) - \sum_j \frac{|S_j|}{|S|} H(S_j)$$

```etapes L'exemple du prof : 10 étudiants (6 réussites, 4 échecs), règle « Heures > 5 ? »
Parent :: $p_+ = 0{,}6$ et $p_- = 0{,}4$. Donc $H(S) \approx 0{,}442 + 0{,}529$, soit $H(S) \approx 0{,}971$.
Groupe 1 (> 5 h) :: 4 étudiants : 3 réussites, 1 échec → $H(S_1) \approx 0{,}811$.
Groupe 2 (≤ 5 h) :: 6 étudiants : 3 et 3 → $H(S_2) = 1$ (chaos total).
Après séparation :: $\frac{4}{10} \times 0{,}811 + \frac{6}{10} \times 1 \approx 0{,}924$.
Gain :: $0{,}971 - 0{,}924 \approx 0{,}046$ : séparation très faible.
```

L'algorithme teste **tous les seuils** de **toutes les variables**, garde le meilleur seuil de chacune, puis la meilleure de toutes. Dans l'exemple du prof : Heures ≤ 5 (gain 0,046), Absences ≤ 3 (0,120), **Note ≤ 10 (0,250)** → la racine sera « Note ≤ 10 ».

## Idée 3 · ID3 et C4.5

**ID3** (Ross Quinlan, 1986) : descendant et glouton, critère = **gain d'information**. Il traite surtout des variables **catégorielles** et crée **une branche par modalité** (une variable à 4 valeurs donne 4 branches). Pas d'élagage dans sa version originale.

> [!piege] **Le piège de l'identifiant.** Le gain d'information favorise les variables à **beaucoup de modalités**. Un numéro d'étudiant crée une branche par étudiant : chaque feuille est pure, le gain est maximal… et le modèle ne sait rien prédire pour un nouvel étudiant.

**C4.5** (Quinlan, 1993) corrige cela avec le **Gain Ratio** :

$$\text{GainRatio}(S, A) = \frac{\text{Gain}(S, A)}{\text{SplitInfo}(S, A)}, \quad \text{SplitInfo} = -\sum_j \frac{|S_j|}{|S|}\log_2\frac{|S_j|}{|S|}$$

Le SplitInfo est une entropie sur **la taille des branches** : 2 branches égales → 1 (pas de pénalité) ; 100 branches d'un élément → $\log_2 100 \approx 6{,}64$ (forte pénalité).

| | ID3 (1986) | C4.5 (1993) |
|---|---|---|
| Critère | gain d'information | gain ratio |
| Variables numériques | non | oui (recherche de seuils) |
| Valeurs manquantes | non gérées | traitement probabiliste |
| Élagage | aucun | post-élagage intégré |

## Idée 4 · CART et l'indice de Gini

**CART** (Breiman et al., 1984) est l'algorithme de **scikit-learn**. Il fait toujours des séparations **binaires** ($X_j \le t$ ?), et il traite classification **et** régression.

$$\text{Gini}(S) = 1 - \sum_k p_k^2$$

Nœud pur : 0. Binaire à 50 / 50 : $1 - 0{,}25 - 0{,}25 = 0{,}5$ (le maximum en binaire).

```etapes Même exemple : 6 réussites, 4 échecs, puis séparation 4 / 6
Parent :: $1 - 0{,}36 - 0{,}16 = 0{,}48$.
S₁ (3 R, 1 E) :: $1 - 0{,}75^2 - 0{,}25^2 = 0{,}375$.
S₂ (3 R, 3 E) :: $1 - 0{,}25 - 0{,}25 = 0{,}5$.
Après :: $0{,}4 \times 0{,}375 + 0{,}6 \times 0{,}5 = 0{,}45$.
Réduction :: $\Delta\text{Gini} = 0{,}48 - 0{,}45 = 0{,}03$. CART garde la séparation au plus faible Gini après.
```

```python
import numpy as np

pA, pB = 6 / 10, 4 / 10
gini = 1 - (pA**2 + pB**2)
entropie = -(pA * np.log2(pA) + pB * np.log2(pB))
print("Gini :", round(gini, 3))
print("Entropie :", round(entropie, 3))
```

```sortie
Gini : 0.48
Entropie : 0.971
```

Gini est plus rapide à calculer que l'entropie (pas de logarithme) : c'est pourquoi CART le préfère. Pour une variable numérique, CART teste des seuils **entre** les valeurs observées (par exemple 2,5 entre 2 et 3).

**Arbre de régression.** Le critère est la **réduction du SSE** (somme des carrés des écarts à la moyenne, c'est-à-dire la variance). La feuille prédit la **moyenne** de ses observations : prix 500, 520, 550 → 523,33. L'arbre peut donc prédire une valeur absente des données. Quand deux variables très corrélées donnent exactement le même SSE, l'algorithme choisit arbitrairement : la structure d'un arbre est **instable**.

## Idée 5 · Surapprentissage et élagage

```grille Profondeur et complexité
#cols: Peu profond | Très profond
#rows: Règles | Risque
peu de règles | *règles très spécifiques
sous-apprentissage | *surapprentissage
```

Un arbre sans limite crée une feuille par individu : erreur d'entraînement nulle, mauvaise généralisation.

**Pré-élagage** (arrêter tôt, hyperparamètres scikit-learn) : `max_depth`, `min_samples_split`, `min_samples_leaf`, `min_impurity_decrease`. Limite : étant glouton, il peut s'arrêter juste avant une très bonne séparation.

**Post-élagage** : laisser pousser, puis couper de **bas en haut** les branches qui n'améliorent pas l'erreur de validation. CART utilise l'élagage **coût-complexité** :

$$R_\alpha(T) = R(T) + \alpha |T|$$

$R(T)$ = erreur de l'arbre, $|T|$ = nombre de feuilles, $\alpha$ = pénalité.

```etapes Exemple du prof : arbre A (3 feuilles, 10 erreurs) contre arbre B (15 feuilles, 2 erreurs)
α = 0 :: Coût A = 10, coût B = 2 → le grand arbre B gagne.
α = 1 :: Coût A = 10 + 3 = 13, coût B = 2 + 15 = 17 → le petit arbre A gagne.
Choix de α :: C'est un hyperparamètre, choisi par validation croisée.
```

CART coupe d'abord le **maillon faible** : le nœud qui minimise $g(t) = \dfrac{R(t) - R(T_t)}{|T_t| - 1}$, c'est-à-dire « erreurs ajoutées / feuilles supprimées ». On obtient une petite suite d'arbres de plus en plus petits, puis on garde celui qui fait le moins d'erreurs en validation.

## Idée 6 · Les forêts aléatoires

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:420px;display:block;margin:10px auto" role="img" aria-label="Les données donnent trois échantillons bootstrap, chacun entraîne un arbre, et les prédictions sont agrégées par vote ou moyenne">
<g font-family="sans-serif" font-size="11" fill="currentColor" text-anchor="middle">
<rect x="10" y="62" width="60" height="30" rx="6" fill="none" stroke="currentColor"/><text x="40" y="81">Données</text>
<g stroke="currentColor"><path d="M70 77L110 30M70 77L110 77M70 77L110 124"/><path d="M190 30L250 72M190 77L250 77M190 124L250 82"/></g>
<g fill="#D9824F" fill-opacity=".2" stroke="#D9824F"><rect x="110" y="16" width="80" height="28" rx="6"/><rect x="110" y="63" width="80" height="28" rx="6"/><rect x="110" y="110" width="80" height="28" rx="6"/></g>
<text x="150" y="34">bootstrap → arbre 1</text><text x="150" y="81">bootstrap → arbre 2</text><text x="150" y="128">bootstrap → arbre M</text>
<rect x="250" y="62" width="80" height="30" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="290" y="81">vote / moyenne</text></g>
</svg>
```

Un arbre seul est **instable** (variance élevée). Idée : en construire beaucoup, différents, et combiner leurs prédictions (*ensemble learning*).

| Stratégie | Principe |
|---|---|
| **Bagging** | modèles en **parallèle** sur des échantillons bootstrap différents |
| **Boosting** | modèles **successifs**, chacun corrige les erreurs du précédent |
| **Stacking** | un modèle supplémentaire combine les prédictions des autres |

**Bootstrap** : tirer $N$ observations **avec remise** parmi $N$. Exemple : $\{A, B, C, D, E\} \to \{A, C, C, E, B\}$. Une observation peut revenir plusieurs fois, d'autres manquent.

$$P(\text{absente}) = \Big(1 - \frac1N\Big)^N \longrightarrow e^{-1} \approx 0{,}368$$

Environ **63,2 %** des observations distinctes sont dans chaque échantillon ; les 36,8 % restantes sont **out-of-bag (OOB)** et servent à estimer l'erreur sans jeu de validation séparé (sans remplacer le test final).

**Random Forest = bagging + tirage aléatoire des variables** : à **chaque nœud**, l'arbre ne cherche sa séparation que parmi un sous-ensemble tiré au hasard. Avec $p = 16$ et `max_features="sqrt"`, il examine $\sqrt{16} = 4$ variables à chaque nœud, renouvelées à chaque nœud. Sinon, une variable très forte serait à la racine de tous les arbres, qui se ressembleraient.

**Agrégation.** Classification : **vote majoritaire** (3 « Oui » contre 2 « Non » → Oui). scikit-learn fait en pratique la **moyenne des probabilités** (*soft voting*) : $(0{,}9 + 0{,}8 + 0{,}4 + 0{,}7 + 0{,}6)/5 = 0{,}68$ → Oui. Régression : **moyenne** des prédictions (950 000, 1 000 000, 980 000, 1 020 000 et 1 050 000 DH → 1 000 000 DH).

**Pourquoi décorréler les arbres ?** Pour $M$ arbres de variance $\sigma^2$ et de corrélation $\rho$ :

$$\text{Var} = \sigma^2\Big(\rho + \frac{1-\rho}{M}\Big)$$

Avec $\sigma^2 = 1$ et $M = 100$ : $\rho = 0$ donne $0{,}01$ ; $\rho = 0{,}8$ donne $0{,}802$. Même avec 100 arbres, des arbres corrélés réduisent peu la variance.

**Importance des variables.**

| | MDI (*Mean Decrease in Impurity*) | MDA (permutation) |
|---|---|---|
| Principe | somme des baisses d'impureté des nœuds qui utilisent la variable | baisse du score quand on mélange la variable |
| Avantage | rapide | mesure l'effet réel sur la prédiction |
| Limite | favorise les variables continues ou à nombreuses modalités | fragile si des variables sont corrélées |

Exemple MDA du prof : accuracy OOB 90 % ; en permutant $X_1$ elle tombe à 65 % (MDA = 0,25), en permutant $X_2$ à 87 % (0,03) : $X_1$ apporte bien plus d'information. Dans les deux cas : **importance n'est pas causalité**.

| Avantages | Limites |
|---|---|
| classification et régression, non linéaire | moins interprétable qu'un arbre |
| variance réduite par rapport à un arbre | coûteux avec beaucoup d'arbres |
| peu de normalisation nécessaire | importances parfois biaisées |
| importance des variables, arbres en parallèle | **n'extrapole pas** au-delà des valeurs cibles vues |

Principaux hyperparamètres : `n_estimators` (100 par défaut), `max_depth`, `max_features`, `min_samples_split`, `min_samples_leaf`, `max_leaf_nodes`, `bootstrap`.

## S'exercer

```exercice Impureté et forêts
? Calcule l'indice de Gini d'un nœud contenant 8 réussites et 2 échecs.
reponse: 0.32 ~0.001
= $1 - 0{,}64 - 0{,}04 = 0{,}32$.

? Calcule l'entropie d'un nœud contenant 10 observations de la classe A et aucune de la classe B.
reponse: 0
= Nœud pur : entropie et Gini valent 0.

? Une forêt de 4 arbres prédit pour la classe « Oui » les probabilités 0,9 ; 0,3 ; 0,6 ; 0,4. Calcule la probabilité moyenne (soft voting).
reponse: 0.55
= $(0{,}9 + 0{,}3 + 0{,}6 + 0{,}4)/4 = 0{,}55 > 0{,}5$ → la forêt prédit Oui.

? Avec $p = 25$ variables et `max_features="sqrt"`, combien de variables candidates à chaque nœud ?
reponse: 5
= $\sqrt{25} = 5$, retirées au hasard à chaque nœud.
```

## Flashcards

```cartes
Algorithme glouton :: Choisit la meilleure séparation immédiate, sans anticipation ni retour en arrière.
Entropie :: H = −Σ pk log2 pk. 0 si pur, 1 pour 50/50 en binaire.
Gain d'information :: H(parent) − moyenne pondérée des H(enfants).
Gini :: 1 − Σ pk². 0 si pur, 0,5 pour 50/50 en binaire. Utilisé par CART.
ID3 :: Quinlan 1986, gain d'information, variables catégorielles, une branche par modalité, pas d'élagage.
C4.5 :: Quinlan 1993, gain ratio = gain / SplitInfo, variables numériques, manquants, post-élagage.
CART :: Breiman 1984, séparations binaires, Gini (classification) ou SSE (régression). Celui de scikit-learn.
Arbre de régression :: La feuille prédit la moyenne des valeurs cibles de ses observations.
Élagage coût-complexité :: Rα(T) = R(T) + α|T| ; α choisi par validation croisée.
Bootstrap :: Tirage de N parmi N avec remise : ≈ 63,2 % d'observations distinctes, 36,8 % out-of-bag.
Random Forest :: Bagging + sous-ensemble aléatoire de variables à chaque nœud ; vote ou moyenne.
Bagging vs boosting :: Bagging : modèles en parallèle sur bootstrap. Boosting : modèles successifs qui corrigent les erreurs.
MDI vs MDA :: MDI : baisse d'impureté (rapide, biaisée). MDA : baisse du score après permutation.
```

## QCM du chapitre

```qcm
? Un arbre de décision construit ses séparations de façon :
+ gloutonne : la meilleure séparation immédiate, sans retour en arrière
- exhaustive : il teste tous les arbres possibles
- aléatoire
= C'est un compromis : très rapide, mais il peut rater une meilleure séparation au niveau suivant.


? Entropie d'un nœud binaire à 50 / 50 :
- 0,5
+ 1
- 0
= $-0{,}5\log_2 0{,}5 \times 2 = 1$, le maximum en binaire.


? Indice de Gini d'un nœud binaire à 50 / 50 :
- 1
- 0
+ 0,5
= $1 - 0{,}25 - 0{,}25 = 0{,}5$.


? Gini d'un nœud de 6 réussites et 4 échecs :
+ 0,48
- 0,971
- 0,24
= $1 - 0{,}36 - 0{,}16 = 0{,}48$ ; 0,971 est son entropie.


? Le gain d'information se calcule comme :
- l'entropie du parent divisée par le nombre de branches
+ l'entropie du parent moins la moyenne pondérée des entropies des enfants
- la somme des entropies des enfants
= La pondération utilise la taille de chaque enfant.


? Pourquoi le gain d'information d'ID3 favorise-t-il une variable « identifiant » ?
- parce qu'elle est toujours corrélée à la cible
- parce qu'elle est numérique
+ parce qu'elle crée une branche par individu, avec des feuilles toutes pures
= Gain maximal, mais aucune généralisation : c'est l'hyper-fragmentation.


? C4.5 corrige ce défaut en utilisant :
+ le gain ratio (gain / SplitInfo)
- la descente de gradient
- l'indice de Gini
= Le SplitInfo pénalise les séparations en beaucoup de branches.


? Quel algorithme d'arbre est implémenté dans scikit-learn ?
- C4.5
+ CART
- ID3
= CART fait des séparations binaires avec Gini ou le SSE.


? CART fait des séparations :
- avec une branche par modalité
- sur des combinaisons linéaires de variables
+ toujours binaires ($X_j \le t$)
= Une question oui / non sur une seule variable.


? Dans un arbre de régression, une feuille prédit :
+ la moyenne des valeurs cibles de ses observations
- la médiane de toutes les données
- la valeur la plus fréquente
= Prix 500, 520, 550 → prédiction 523,33, une valeur absente des données.


? Avec $R_\alpha(T) = R(T) + \alpha|T|$ et $\alpha = 1$, quel arbre gagne entre A (3 feuilles, 10 erreurs) et B (15 feuilles, 2 erreurs) ?
- égalité
+ A, coût 13 contre 17
- B, coût 2 contre 10
= La pénalité sur le nombre de feuilles fait gagner le petit arbre.


? `max_depth` et `min_samples_leaf` servent au :
- post-élagage coût-complexité
- bootstrap
+ pré-élagage
= Ils arrêtent la croissance pendant la construction.


? Dans un échantillon bootstrap de grande taille, la part d'observations distinctes présentes est environ :
+ 63,2 %
- 36,8 %
- 50 %
= $1 - e^{-1} \approx 0{,}632$ ; les 36,8 % restantes sont out-of-bag.


? Ce que la forêt aléatoire ajoute au bagging :
- le boosting des erreurs
+ un tirage aléatoire des variables candidates à chaque nœud
- la standardisation des variables
= Cela décorrèle les arbres.


? Avec $p = 16$ et `max_features="sqrt"`, chaque nœud examine :
- 4 variables, fixées pour tout l'arbre
- 16 variables
+ 4 variables, retirées à chaque nœud
= Le sous-ensemble est renouvelé à chaque nœud.


? Pour $\sigma^2 = 1$, $M = 100$ et $\rho = 0{,}8$, la variance de la forêt vaut :
+ 0,802
- 0,8
- 0,01
= $0{,}8 + 0{,}2/100 = 0{,}802$ : la corrélation limite l'effet de la moyenne.


? En régression, une forêt aléatoire combine ses arbres par :
- vote majoritaire
+ moyenne des prédictions
- le maximum des prédictions
= Le vote sert à la classification.


? L'importance par permutation (MDA) d'une variable mesure :
- sa corrélation avec la cible
- la réduction d'impureté qu'elle apporte dans les arbres
+ la baisse de performance quand on mélange ses valeurs
= Accuracy 90 % → 65 % après permutation de $X_1$ : MDA = 0,25.


? Quelle affirmation sur les forêts aléatoires est **fausse** ?
+ elles extrapolent bien au-delà des valeurs cibles vues à l'entraînement
- elles réduisent la variance par rapport à un arbre seul
- elles nécessitent peu de normalisation
= Une moyenne de feuilles ne peut pas dépasser les valeurs observées.
```

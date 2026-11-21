---
id: intelligence-artificielle
titre: L'intelligence artificielle
seance: Séquence 4
importance: 5
---

## Avant de commencer

Il faut se souvenir que le **GPU**, le **cloud** et la puissance des processeurs (loi de Moore) ont progressé : l'IA moderne en dépend.

```exercice Vérifie ton prérequis
? Que prédit la loi de Moore ?
= Le nombre de transistors sur une puce double tous les deux ans.
```

## Comment aborder ce chapitre

> [!astuce] Range tout dans **trois vagues** : prémices (1940-1970), Machine/Deep Learning (1980-2010), explosion (2020-…). Chaque nom célèbre a sa vague.

> [!piege] Croire que l'IA « pense ». Pour le cours, l'IA est une **imitation** de l'intelligence, pas une intelligence biologique.

À la fin, tu sais définir l'IA, citer ses usages, dater ses grandes étapes et distinguer IA classique et IA générative.

## Idée 1 · Définition et usages

L'IA vise à rendre les machines capables d'agir de façon appropriée et prévoyante dans leur environnement.

| Usage | Ce qu'elle fait | Exemple |
|---|---|---|
| **Prédiction** | apprend une relation f : x → y | prix d'une maison, score d'un match |
| **Classification** | range dans des groupes | trier les spams, classer des fruits |
| **Contrôle** | agit dans un environnement | déplacer un robot, jouer à un jeu |

Deux façons d'interagir : avec une **base de données** (images → résultats) ou avec un **environnement** (état → action).

## Idée 2 · Les trois vagues

```etapes Histoire de l'IA
Guerre mondiale :: Alan Turing décrypte ENIGMA avec la machine « Victory »
Années 50 · test de Turing :: une machine peut-elle imiter une conversation humaine ?
Années 60 · Arthur Samuel :: IA qui apprend seule à jouer aux dames
Années 70 · hiver de l'IA :: moins d'investissements après un optimisme excessif
Années 80 · Machine Learning :: la machine apprend des données, sans programmation explicite
Années 90 · Deep Blue (IBM) :: bat Garry Kasparov aux échecs
2000-2010 · Deep Learning :: réseaux de neurones ; AlphaGo (DeepMind/Google) bat le champion de Go
2020-… :: Big Data, GPU, Cloud, IA générative
```

> [!attention] Le support dit qu'Arthur Samuel a « battu le champion du monde » de dames. Les sources historiques parlent d'une victoire contre un bon joueur (1962), pas contre un champion du monde. De même, Deep Blue (1997) reposait surtout sur la recherche par force brute plutôt que sur le Machine Learning. Au quiz, suis la formulation du cours.

## Idée 3 · L'IA générative

```flux Comment elle répond
Prompt (instruction) -> Modèle statistique (prédit la suite) -> Nouveau contenu (texte, image, son)
```

| | IA classique (discriminante) | IA générative |
|---|---|---|
| Sortie | un nombre, une probabilité, une classe | du langage, de la parole, une image |
| Exemple | « c'est un chien » | génère une nouvelle image de chien |

- C'est un sous-domaine du **Deep Learning**.
- Ses modèles font partie des **modèles de fondation** (entraînés sur d'énormes données, adaptables).
- **Multimodalité** : texte → vidéo, vidéo → podcast, audio → slides.
- Bill Gates y voit la **3e grande époque** de l'informatique, après Internet et le mobile.

> [!attention] Le quiz officiel a un thème « ChatGPT », absent du résumé. Complément : ChatGPT (OpenAI, novembre 2022) est un assistant conversationnel d'IA générative basé sur un grand modèle de langage (GPT).

## S'exercer

```exercice Exercices
? Trier des e-mails entre « spam » et « non spam » : prédiction, classification ou contrôle ?
reponse: classification
= Classification : on range chaque e-mail dans un groupe.

? Quel programme d'IBM a battu Garry Kasparov ?
reponse: Deep Blue
= Deep Blue, dans les années 90.

? Donne la différence clé entre IA classique et IA générative.
= La classique produit un nombre, une probabilité ou une classe ; la générative produit un nouveau contenu (texte, parole, image).
```

## Flashcards

```cartes
Définition de l'IA :: Rendre les machines capables d'agir de façon appropriée et prévoyante ; une imitation de l'intelligence
Trois usages :: Prédiction, classification, contrôle
Test de Turing :: Années 50 : une machine peut-elle imiter une conversation humaine ?
Hiver de l'IA :: Années 70, baisse des investissements
Deep Blue :: IBM, bat Kasparov aux échecs (années 90)
AlphaGo :: DeepMind/Google, bat le champion du monde de Go
Modèle discriminant :: Classe ou prédit une étiquette
IA générative :: Sous-domaine du Deep Learning qui crée de nouveaux contenus à partir d'un prompt
```

## QCM du chapitre

```qcm
? Selon le cours, l'IA est…
- une intelligence biologique
+ une imitation de l'intelligence
- un composant matériel
= Elle simule l'intelligence humaine.

? Prévoir le prix d'une maison relève de…
+ la prédiction
- la classification
- du contrôle
= On apprend une relation x → y.

? Diriger les déplacements d'un robot relève de…
- la prédiction
- la classification
+ du contrôle
= Gérer des actions dans un environnement.

? Qui a décrypté la machine ENIGMA ?
+ Alan Turing et son équipe
- Arthur Samuel
- Garry Kasparov
= Avec la machine « Victory ».

? L'« hiver de l'IA » correspond aux années…
- 50
+ 70
- 2020
= Baisse des investissements après des promesses non tenues.

? Le Machine Learning permet à la machine…
+ d'apprendre à partir de données sans programmation explicite
- de fonctionner sans électricité
- de remplacer le noyau
= Avec des probabilités statistiques.

? AlphaGo a battu le champion du monde de…
- échecs
- dames
+ Go
= Le Go est réputé plus complexe que les échecs.

? Le Deep Learning utilise…
+ des réseaux de neurones artificiels
- des cartes perforées
- des tubes à vide
= C'est un dérivé du Machine Learning.

? Une IA générative produit…
- seulement une probabilité
+ un nouveau contenu (texte, image, son)
- seulement une classe
= C'est la différence avec l'IA classique.

? Pour Bill Gates, l'IA générative est la 3e grande époque après…
+ Internet et le mobile
- le transistor et la souris
- MS-DOS et Windows
= Internet, mobile, puis IA générative.
```

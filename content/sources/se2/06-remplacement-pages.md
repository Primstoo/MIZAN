---
id: remplacement-pages
titre: Mémoire (2) · défauts de page et algorithmes de remplacement
seance: Chapitre 3 · Gestion de la mémoire (suite)
importance: 4
---

## Avant de commencer

Il te faut la pagination (chapitre précédent) : une page virtuelle est soit dans un **cadre** de la RAM (bit de présence à 1), soit sur le disque (bit à 0).

```exercice Vérifie ton prérequis
? Le processus accède à une page dont le bit de présence vaut 0. Que se passe-t-il ?
= Un **défaut de page** : le SE interrompt le processus, va chercher la page sur le disque et la charge dans un cadre. Si aucun cadre n'est libre, il doit d'abord **choisir une victime** : c'est l'objet de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] Fais un **tableau** : une colonne par page demandée, une ligne par cadre, une dernière ligne « défaut ». Pour chaque demande : la page est-elle déjà là ? Oui → rien ne bouge. Non → F, et tu remplaces selon la règle.

> [!piege] En FIFO, la victime est la page **entrée** en mémoire le plus tôt, même si on vient de s'en servir. Une page « réutilisée » ne rajeunit pas en FIFO ; elle rajeunit en LRU.

À la fin, tu sais remplir le tableau OPT, FIFO, LRU et MRU d'une suite de références et compter les défauts.

## Idée 1 · Que fait le SE lors d'un défaut de page ?

```etapes Traitement d'un défaut de page
Défaut :: La page demandée n'est pas en RAM (bit de présence à 0) : déroutement vers le SE.
Place libre ? :: S'il y a un cadre libre, on y charge la page. Sinon, on passe au remplacement.
Victime :: On choisit une page à retirer selon l'algorithme de remplacement.
Bit M :: Si la victime a été modifiée (bit M à 1), on la réécrit sur le disque d'abord.
Chargement :: On charge la page demandée dans le cadre libéré (placement).
Mise à jour :: On met à jour les bits de présence dans la table des pages, puis le processus reprend.
```

> [!retenir] Objectif d'un algorithme de remplacement : **minimiser le nombre de défauts de page**. Le cours cite deux problèmes à traiter : le **remplacement** des pages et l'**allocation** des cadres entre processus.

## Idée 2 · Les quatre algorithmes du cours

| Algorithme | Victime | Remarque |
|---|---|---|
| **OPT** (Belady, optimal) | la page qui sera utilisée **le plus tard dans le futur** (ou jamais) | impossible en vrai (on ne connaît pas le futur) ; sert de **référence** |
| **FIFO** | la page la plus **ancienne en mémoire** | simple, ignore l'usage ; beaucoup de défauts |
| **LRU** (*Least Recently Used*) | la page **utilisée il y a le plus longtemps** | efficace mais coûteux à réaliser |
| **MRU** (*Most Recently Used*) | la page **utilisée le plus récemment** | facile : il suffit de retenir la dernière page référencée |

L'exemple du cours : suite 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1, avec **3 cadres**. Case orange = page qui vient d'entrer ; F = défaut.

```grille OPT (Belady) : 9 défauts
#cols: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
#rows: cadre1 cadre2 cadre3 défaut
*7 7 7 *2 2 2 2 2 2 2 2 2 2 2 2 2 2 *7 7 7
~ *0 0 0 0 0 0 *4 4 4 *0 0 0 0 0 0 0 0 0 0
~ ~ *1 1 1 *3 3 3 3 3 3 3 3 *1 1 1 1 1 1 1
!F !F !F !F ~ !F ~ !F ~ ~ !F ~ ~ !F ~ ~ ~ !F ~ ~
```

À la 4e demande (page 2), les cadres contiennent 7, 0, 1. Dans le futur, 0 revient tout de suite, 1 un peu plus tard, 7 en tout dernier : on retire **7**.

```grille FIFO : 15 défauts
#cols: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
#rows: cadre1 cadre2 cadre3 défaut
*7 7 7 *2 2 2 2 *4 4 4 *0 0 0 0 0 0 0 *7 7 7
~ *0 0 0 0 *3 3 3 *2 2 2 2 2 *1 1 1 1 1 *0 0
~ ~ *1 1 1 1 *0 0 0 *3 3 3 3 3 *2 2 2 2 2 *1
!F !F !F !F ~ !F !F !F !F !F !F ~ ~ !F !F ~ ~ !F !F !F
```

En FIFO, les cadres sont remplacés **à tour de rôle** (1, 2, 3, 1, 2, 3…) : c'est un bon moyen de vérifier ton tableau.

```grille LRU : 12 défauts
#cols: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
#rows: cadre1 cadre2 cadre3 défaut
*7 7 7 *2 2 2 2 *4 4 4 *0 0 0 *1 1 1 1 1 1 1
~ *0 0 0 0 0 0 0 0 *3 3 3 3 3 3 *0 0 0 0 0
~ ~ *1 1 1 *3 3 3 *2 2 2 2 2 2 2 2 2 *7 7 7
!F !F !F !F ~ !F ~ !F !F !F !F ~ ~ !F ~ !F ~ !F ~ ~
```

Pour LRU, **regarde en arrière** : parmi les pages présentes, laquelle a été demandée il y a le plus longtemps ? Pour OPT, **regarde en avant**.

```grille MRU : 16 défauts
#cols: 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
#rows: cadre1 cadre2 cadre3 défaut
*7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 *0 0
~ *0 0 0 0 *3 *0 *4 4 4 4 4 4 4 4 4 4 4 4 4
~ ~ *1 *2 2 2 2 2 2 *3 *0 *3 *2 *1 *2 *0 *1 1 1 1
!F !F !F !F ~ !F !F !F ~ !F !F !F !F !F !F !F !F ~ !F ~
```

## Idée 3 · Vérifier ses comptes par programme

```python
def remplacer(refs, n, algo):
    cadres, defauts, dernier = [], 0, {}
    for i, p in enumerate(refs):
        if p not in cadres:
            defauts += 1
            if len(cadres) == n:                      # plus de place : une victime
                if algo == "FIFO":
                    victime = cadres[0]               # cadres garde l'ordre d'entrée
                elif algo == "LRU":
                    victime = min(cadres, key=lambda c: dernier[c])
                elif algo == "MRU":
                    victime = max(cadres, key=lambda c: dernier[c])
                else:                                 # OPT
                    futur = refs[i + 1:]
                    victime = max(cadres, key=lambda c: futur.index(c) if c in futur else len(refs))
                cadres.remove(victime)
            cadres.append(p)
        dernier[p] = i
    return defauts

refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1]
for algo in ("OPT", "FIFO", "LRU", "MRU"):
    print(algo, remplacer(refs, 3, algo))
```

```sortie
OPT 9
FIFO 15
LRU 12
MRU 16
```

> [!attention] La ligne « Def » du tableau LRU, telle qu'on la lit dans le support PDF, semble compter 11 F. Le décompte correct pour cette suite est **12** défauts (le tableau des cadres du cours, lui, est juste). Recompte toujours la ligne F à partir des colonnes.

> [!attention] Ajout ToumaiLearn, hors support : avec FIFO, **ajouter des cadres peut augmenter** le nombre de défauts (anomalie de Belady). Exemple classique : 1 2 3 4 1 2 5 1 2 3 4 5 donne 9 défauts avec 3 cadres et 10 avec 4. LRU et OPT n'ont jamais ce défaut.

```python
r = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print("FIFO 3 cadres :", remplacer(r, 3, "FIFO"), "/ 4 cadres :", remplacer(r, 4, "FIFO"))
print("LRU  3 cadres :", remplacer(r, 3, "LRU"), "/ 4 cadres :", remplacer(r, 4, "LRU"))
```

```sortie
FIFO 3 cadres : 9 / 4 cadres : 10
LRU  3 cadres : 10 / 4 cadres : 8
```

## S'exercer

```exercice Exercices types
? Suite 1 2 3 1 4 1 2 5, 3 cadres, **FIFO**. Nombre de défauts ?
indice: Le « 1 » redemandé en 4e position ne rajeunit pas.
reponse: 7
= 1 F, 2 F, 3 F, 1 (présent), 4 F → retire 1 (le plus ancien), 1 F → retire 2, 2 F → retire 3, 5 F → retire 4. Total **7** défauts.

? Même suite en **LRU**.
reponse: 6
= 1 F, 2 F, 3 F, 1, 4 F → retire 2 (le moins récemment utilisé : 1 a servi juste avant), 1 présent, 2 F → retire 3, 5 F → retire 4 (1 et 2 ont servi après). Total **6** défauts.

? Même suite en **OPT**.
reponse: 5
= 1 F, 2 F, 3 F, 1, 4 F → retire 3 (jamais redemandé), 1, 2 présents, 5 F → retire n'importe laquelle des pages non redemandées. Total **5** défauts.

? Pourquoi OPT n'est-il pas utilisé dans un vrai système ?
= Il faut connaître les **références futures**, ce qui est impossible. Il sert de **borne inférieure** pour juger les autres algorithmes.
```

## Flashcards

```cartes
Défaut de page :: Accès à une page dont le bit de présence vaut 0 : le SE doit la charger depuis le disque.
Rôle du bit M lors d'un remplacement :: Si la victime a été modifiée, il faut la réécrire sur le disque avant de la remplacer.
OPT (Belady) :: Remplace la page utilisée le plus tard dans le futur. Optimal mais irréalisable : sert de référence.
FIFO (remplacement) :: Remplace la page entrée en mémoire le plus tôt, sans tenir compte de son usage.
LRU :: Remplace la page utilisée il y a le plus longtemps. Efficace mais coûteux.
MRU :: Remplace la page utilisée le plus récemment. Facile : on retient la dernière page référencée.
Défauts pour 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1 avec 3 cadres :: OPT 9, LRU 12, FIFO 15, MRU 16.
Objectif d'un algorithme de remplacement :: Minimiser le nombre de défauts de page.
```

## QCM du chapitre

```qcm
? Un défaut de page se produit quand :
- une page est modifiée
+ la page demandée n'est pas en mémoire physique
- la table des pages est pleine
- le quantum est épuisé
= Bit de présence à 0.

? Quel algorithme est optimal ?
- LRU
+ OPT (Belady)
- FIFO
- MRU
= Il retire la page utilisée le plus tard dans le futur.

? Pourquoi OPT est-il irréalisable ?
+ Il faut connaître les références futures
- Il demande trop de cadres
- Il ne gère pas le bit M
= On ne connaît pas l'avenir ; OPT sert de référence.

? LRU retire la page :
- entrée en premier en mémoire
+ utilisée il y a le plus longtemps
- utilisée le plus récemment
= Least Recently Used.

? Cadres : 4, 0, 3 (entrés dans cet ordre) ; on vient d'utiliser 4. En FIFO, quelle page est retirée au prochain défaut ?
+ 4
- 0
- 3
= FIFO regarde l'ordre d'entrée, pas l'usage.

? Pour la suite du cours avec 3 cadres, combien de défauts en FIFO ?
- 9
- 12
+ 15
- 16
= OPT 9, LRU 12, FIFO 15, MRU 16.

? Avant de remplacer une victime dont le bit M vaut 1, le SE :
+ la réécrit sur le disque
- la supprime sans rien faire
- l'envoie dans la file des prêts
= Sinon les modifications seraient perdues.

? Quel algorithme ne demande que de retenir la dernière page référencée ?
- LRU
+ MRU
- OPT
= C'est l'argument du cours en faveur de MRU.

? En FIFO, les cadres sont remplacés :
+ à tour de rôle, dans l'ordre où ils ont été remplis
- selon la dernière utilisation
- au hasard
= Pratique pour vérifier un tableau FIFO.

? Avec 3 cadres vides au départ, les 3 premières pages différentes provoquent :
- 0 défaut
- 1 défaut
+ 3 défauts
= Chaque page absente provoque un défaut, même sans remplacement.
```

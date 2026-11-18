---
id: structures-controle
titre: Structures de contrôle · conditions et boucles (pseudo-code)
seance: Séance 2 · octobre 2024
importance: 5
---

## Avant de commencer

Tu dois savoir écrire une affectation (`x ← x + 1`) et une condition simple (`x > 10`) qui vaut vrai ou faux.

```exercice Vérifie ton prérequis
? Avec x ← 7, que vaut la condition « x > 5 ET x % 2 = 0 » ?
indice: Évalue chaque morceau séparément.
reponse: faux
= x > 5 est vrai, mais 7 % 2 = 1, donc x % 2 = 0 est faux. vrai ET faux = **faux**.
```

## Comment aborder ce chapitre

> [!astuce] Pour chaque boucle, pose-toi trois questions : **où j'initialise ? quelle est la condition ? qu'est-ce qui change à chaque tour ?** Si rien ne change, la boucle ne s'arrête jamais.

> [!piege] La boucle **Répéter … jusqu'à** s'arrête quand la condition devient **vraie** ; la boucle **TantQue** continue tant que la condition est **vraie**. Les deux conditions sont donc contraires.

À la fin, tu sais choisir entre Si, Si-Sinon, Sinon Si, Selon, et entre les boucles Pour, TantQue et Répéter, puis faire la trace d'une boucle à la main.

## Idée 1 · Si … alors … sinon : choisir un chemin

```html
<svg viewBox="0 0 440 210" style="width:100%;max-width:500px;display:block;margin:10px auto" role="img" aria-label="Organigramme : la condition est testée ; si elle est vraie on exécute le bloc 1, sinon le bloc 2, puis on reprend après finsi">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<polygon points="220,10 300,50 220,90 140,50" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="220" y="55">condition ?</text>
<line x1="140" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/><line x1="80" y1="50" x2="80" y2="110" stroke="currentColor" stroke-width="2"/>
<line x1="300" y1="50" x2="360" y2="50" stroke="currentColor" stroke-width="2"/><line x1="360" y1="50" x2="360" y2="110" stroke="currentColor" stroke-width="2"/>
<text x="105" y="42">vrai</text><text x="335" y="42">faux</text>
<rect x="20" y="110" width="120" height="36" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="80" y="133">instructions 1</text>
<rect x="300" y="110" width="120" height="36" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="360" y="133">instructions 2</text>
<line x1="80" y1="146" x2="80" y2="180" stroke="currentColor" stroke-width="2"/><line x1="360" y1="146" x2="360" y2="180" stroke="currentColor" stroke-width="2"/>
<line x1="80" y1="180" x2="360" y2="180" stroke="currentColor" stroke-width="2"/>
<text x="220" y="200">suite après finsi</text>
</g></svg>
```

Une **condition** est une expression qui vaut vrai ou faux. Trois formes :

```
si x > 10 alors                     si note >= 10 alors
    Ecrire("x > 10")                    Ecrire("Validé")
sinon si x < 10 alors               sinon si note < 10 ET note >= 5 alors
    Ecrire("x < 10")                    Ecrire("Rattrapage")
sinon                               sinon
    Ecrire("x = 10")                    Ecrire("Non Validé")
finsi                               finsi
```

- `si … alors … finsi` : on agit seulement si c'est vrai.
- `si … sinon … finsi` : exactement une des deux branches s'exécute.
- `sinon si` : on teste les conditions **dans l'ordre** ; la première vraie gagne, `sinon` attrape le reste.

Le test de parité du prof utilise le modulo : `si nombre % 2 = 0 alors` pair `sinon` impair.

Les **conditions composées** relient plusieurs conditions par ET, OU, NON. « x dans ]10, 20[ » s'écrit `x > 10 ET x < 20`.

La **structure à choix multiples** (Selon) compare une variable à plusieurs valeurs possibles ; elle remplace une longue cascade de `sinon si`. Elle est traduite en Python par `match-case` (chapitre 7).

> [!astuce] Dans l'exemple de la note, `note < 10` est déjà acquis quand on arrive au `sinon si` (sinon la première branche aurait été prise). On peut donc écrire simplement `sinon si note >= 5`.

## Idée 2 · Les trois boucles

| Boucle | Quand l'utiliser | Exécutions minimum |
|---|---|---|
| `pour i ← a jusqu'à b faire` | nombre de tours **connu** | 0 |
| `tantque condition faire` | nombre de tours inconnu | 0 |
| `répéter … jusqu'à condition` | inconnu, mais au moins une fois | **1** |

```
S ← 0                       S ← 0                     S ← 0 ; i ← 1
pour i ← 1 jusqu'à 10 faire i ← 1                     répéter
    S ← S + i               tantque i <= 10 faire        S ← S + i
fin pour                        S ← S + i                i ← i + 1
                                i ← i + 1             jusqu'à i > 10
                            fin tantque
```

Les trois calculent la somme 1 + 2 + … + 10. Avec `Pas`, le compteur avance d'autre chose que 1 : `pour i ← 0 jusqu'à N Pas 2` parcourt les pairs.

> [!retenir] La condition d'arrêt de **Répéter** est l'**inverse** de la condition de continuation de **TantQue** : `tantque i <= 10` ↔ `jusqu'à i > 10`.

> [!attention] Sur la diapo de l'algorithme 10 (somme des nombres pairs), le titre de l'algorithme est resté « somme des dix premiers nombres entiers » : c'est un copier-coller, il calcule bien la somme des **pairs** de 0 à N.

## Idée 3 · Faire la trace d'une boucle

Faire la trace, c'est noter la valeur de chaque variable à chaque tour. C'est **la** compétence demandée à l'examen.

```etapes Trace de « somme des pairs » avec N = 6
Initialisation :: S ← 0. La boucle va de i = 0 à 6 avec un pas de 2.
Tour 1 :: i = 0 → S ← 0 + 0 = 0
Tour 2 :: i = 2 → S ← 0 + 2 = 2
Tour 3 :: i = 4 → S ← 2 + 4 = 6
Tour 4 :: i = 6 → S ← 6 + 6 = 12
Fin :: i passerait à 8 > 6 : on sort. On affiche S = 12.
```

Même chose en Python pour vérifier (Python arrive à la séance 5 ; `range(0, N+1, 2)` = de 0 à N avec un pas de 2) :

```python
N = 6
S = 0
for i in range(0, N + 1, 2):
    S = S + i
    print("i =", i, "S =", S)
print("La somme des nombres pairs est :", S)
```

```sortie
i = 0 S = 0
i = 2 S = 2
i = 4 S = 6
i = 6 S = 12
La somme des nombres pairs est : 12
```

> [!piege] La **boucle infinie** de la diapo : `i ← 1 ; tantque i <= 7 faire Ecrire("Hello MIP") fin tantque`. `i` ne change jamais, la condition reste vraie pour toujours. Il manque `i ← i + 1`.

## Idée 4 · L'indentation et les commentaires

Le prof insiste : le contenu de chaque `si`, `pour`, `tantque` est **décalé vers la droite**. On voit d'un coup d'œil où commence et où finit chaque bloc. En Python, ce décalage devient **obligatoire**.

> [!prof] « Toutes vos instructions doivent être commentées » : un code commenté est plus facile à modifier plus tard.

## S'exercer

```exercice Exercices du TD 2
? (TD 2, ex. 1) Somme des entiers de 0 jusqu'à N (N saisi) avec les trois boucles.
= Pour : S ← 0 ; pour i ← 0 jusqu'à N faire S ← S + i fin pour
TantQue : S ← 0 ; i ← 0 ; tantque i <= N faire S ← S + i ; i ← i + 1 fin tantque
Répéter : S ← 0 ; i ← 0 ; répéter S ← S + i ; i ← i + 1 jusqu'à i > N
Pour N = 4, les trois donnent 10.

? (TD 2, ex. 2) Calculer X puissance n (n ≥ 0).
indice: Multiplie n fois par X en partant de 1.
= P ← 1
pour i ← 1 jusqu'à n faire
  P ← P * X
fin pour
Ecrire(P)
Pour n = 0 la boucle ne tourne pas et P = 1, ce qui est juste (X⁰ = 1).

? (TD 2, ex. 3) Factorielle N! en redemandant N tant qu'il est négatif.
indice: Une boucle Répéter pour la saisie, une boucle Pour pour le calcul.
= répéter
  Ecrire("N = ") ; Lire(N)
jusqu'à N >= 0
F ← 1
pour i ← 1 jusqu'à N faire F ← F * i fin pour
Ecrire(N, "! = ", F)
0! = 1 car la boucle ne tourne pas. 5! = 120.

? (TD 2, ex. 5) Somme S = 1 + 1/2 + … + 1/N. Que vaut S pour N = 4 (arrondi à 2 décimales) ?
reponse: 2.08 ~0.01
= S ← 0 ; pour i ← 1 jusqu'à N faire S ← S + 1/i fin pour. Pour N = 4 : 1 + 0.5 + 0.333 + 0.25 ≈ **2.08**.
```

## Flashcards

```cartes
Quand utiliser la boucle Pour ? :: Quand le nombre de tours est connu à l'avance.
Différence TantQue / Répéter ? :: Répéter s'exécute au moins une fois ; TantQue peut ne jamais s'exécuter.
Condition d'arrêt de Répéter ? :: Elle est l'inverse de la condition de continuation du TantQue (on sort quand elle devient vraie).
À quoi sert « Pas » ? :: À changer l'incrément du compteur de la boucle Pour (Pas 2, Pas -1…).
Pourquoi une boucle devient-elle infinie ? :: Parce que la variable testée dans la condition ne change jamais dans la boucle.
Comment tester qu'un nombre est pair ? :: si nombre % 2 = 0 alors …
« x dans ]10, 20[ » en pseudo-code ? :: x > 10 ET x < 20
Rôle de « sinon si » ? :: Tester plusieurs conditions en cascade ; la première vraie est exécutée.
```

## QCM du chapitre

```qcm
? Quelle boucle s'exécute toujours au moins une fois ?
- Pour
- TantQue
+ Répéter … jusqu'à
= La condition de Répéter est testée à la fin du tour.

? `i ← 1 ; tantque i <= 5 faire Ecrire(i) ; i ← i + 1 fin tantque`. Combien de valeurs sont affichées ?
- 4
+ 5
- 6
= i vaut 1, 2, 3, 4, 5 ; à 6 la condition est fausse.

? Que vaut i à la sortie de la boucle précédente ?
- 5
+ 6
- 1
= C'est la valeur 6 qui rend `i <= 5` faux.

? Une boucle TantQue équivalente à `répéter … jusqu'à i > N` s'écrit :
+ tantque i <= N
- tantque i > N
- tantque i >= N
= On continue tant que la condition d'arrêt est fausse : NON(i > N) = i <= N.

? `pour i ← 10 jusqu'à 1 Pas -3` donne les valeurs :
- 10, 7, 4, 1, -2
+ 10, 7, 4, 1
- 10, 9, 8 … 1
= On descend de 3 en 3 tant qu'on ne dépasse pas 1.

? Avec note ← 7, l'algorithme (≥ 10 : Validé ; ≥ 5 : Rattrapage ; sinon Non Validé) affiche :
- Validé
+ Rattrapage
- Non Validé
= 7 n'est pas ≥ 10 mais est ≥ 5.

? Avec A ← 4 et B ← 4, l'algorithme du maximum du prof affiche :
- Le maximum est 4
+ égalité
- rien
= Ni A > B ni A < B : on tombe dans le sinon.

? Pourquoi `i ← 1 ; tantque i <= 7 faire Ecrire("Hello MIP") fin tantque` ne s'arrête-t-il pas ?
- La condition est fausse dès le départ
+ i n'est jamais modifié dans la boucle
- Ecrire bloque la boucle
= Sans `i ← i + 1`, la condition reste vraie pour toujours.

? Quelle structure remplace une longue cascade de « sinon si » sur les valeurs d'une variable ?
- Répéter
+ La structure à choix multiples (Selon)
- La boucle Pour
= Selon compare une variable à une liste de valeurs.

? `S ← 0 ; pour i ← 1 jusqu'à 4 faire S ← S + i fin pour`. S vaut :
- 4
+ 10
- 15
= 1 + 2 + 3 + 4 = 10.
```

---
id: revision-examen
titre: Révision et examen blanc
seance: Révision · fin de semestre
importance: 5
---

> [!attention] Aucune annale n'était fournie. Cet examen blanc est construit à partir des TD 1 à 6 et des exemples du cours, au format habituel d'un examen d'algorithmique de S1 (questions de cours, traces, algorithmes à écrire). Demande au prof le format réel.

## Fiche de révision en une page

```flux Le fil du semestre
Variables et opérateurs -> Si / Selon -> Pour, TantQue, Répéter -> Tableaux -> Tris et recherches -> Python : types, chaînes -> if, match, while, for -> array -> listes, tuples, sets, dicts
```

| Pseudo-code | Python |
|---|---|
| `x ← 5` | `x = 5` |
| `Ecrire("a =", a)` / `Lire(a)` | `print("a =", a)` / `a = int(input())` |
| `si … alors … sinon si … sinon … finsi` | `if … : … elif … : … else: …` |
| `pour i ← 0 jusqu'à n − 1 faire` | `for i in range(n):` |
| `tantque c faire` | `while c:` |
| `répéter … jusqu'à c` | `while True: … if c: break` |
| `Tableau T[5] : Entier` | `T = ar.array('i', [0]*5)` ou une liste |
| `a % b`, ET, OU, NON | `a % b`, `and`, `or`, `not` |

> [!retenir] Les 5 algorithmes à savoir écrire les yeux fermés : **somme/moyenne**, **minimum/maximum**, **recherche séquentielle**, **recherche dichotomique**, **un tri** (sélection, bulles ou insertion).

## Examen blanc (2 h, sans document)

```exercice Partie 1 · Questions de cours (4 pts)
? Cite quatre caractéristiques d'un algorithme.
= Entrée/sortie, absence d'ambiguïté, finitude, déterminisme (aussi : généricité, lisibilité, efficacité, indépendance du langage).

? Différence entre TantQue et Répéter … jusqu'à ?
= Répéter s'exécute au moins une fois et s'arrête quand la condition devient vraie ; TantQue teste avant chaque tour et peut ne jamais s'exécuter.

? Différence entre une liste et un tuple en Python ?
= La liste est modifiable, le tuple ne l'est pas. Les deux sont ordonnés et acceptent les doublons.
```

```exercice Partie 2 · Traces (5 pts)
? Que vaut S à la fin de : S ← 0 ; i ← 1 ; tantque i < 10 faire S ← S + i ; i ← i + 3 fin tantque ?
reponse: 12
= i prend 1, 4, 7 (10 n'est pas < 10). S = 1 + 4 + 7 = **12**.

? Qu'affiche `print("FSABM S1"[1:5], 17 // 4, 17 % 4)` ?
= SABM 4 1

? Tableau après la 2e passe du tri par sélection sur [9, 4, 7, 1] ?
= Passe 0 : [1, 4, 7, 9] (échange 9 et 1). Passe 1 : 4 est déjà le minimum du reste → **[1, 4, 7, 9]**.

? Combien de tours fait la recherche dichotomique de 4 dans [-2, 0, 4, 9, 11, 15, 20, 25, 30, 45] ?
reponse: 3
= milieu 4 (11) → gauche ; milieu 1 (0) → droite ; milieu 2 (4) → trouvé : **3** tours.
```

```exercice Partie 3 · Algorithmes et programmes (11 pts)
? (3 pts) Écris en pseudo-code un algorithme qui lit N notes dans un tableau puis affiche la moyenne et le nombre de notes ≥ 10.
= Lire(N) ; pour i ← 0 jusqu'à N − 1 faire Lire(T[i]) fin pour
s ← 0 ; nb ← 0
pour i ← 0 jusqu'à N − 1 faire
  s ← s + T[i]
  si T[i] >= 10 alors nb ← nb + 1 finsi
fin pour
Ecrire("moyenne : ", s / N, " validées : ", nb)

? (4 pts) Programme Python : lire un entier n ≥ 2 et dire s'il est premier (TD 5, ex. 5).
= n = int(input("n = "))
premier = True
for d in range(2, int(n ** 0.5) + 1):
    if n % d == 0:
        premier = False
        break
print(n, "est premier" if premier else "n'est pas premier")

? (4 pts) Programme Python : à partir d'une phrase, construire un dictionnaire mot → nombre de « s » (TD 6, ex. 6), puis afficher le mot qui en contient le plus.
= phrase = input("Phrase : ")
d = {mot: mot.count("s") for mot in phrase.lower().split()}
meilleur = None
for mot, nb in d.items():
    if meilleur is None or nb > d[meilleur]:
        meilleur = mot
print(d, meilleur)
```

Vérification du code de la partie 3 avec des valeurs fixes :

```python
notes = [12, 8, 15, 9.5, 10]
s = 0
nb = 0
for x in notes:
    s += x
    if x >= 10:
        nb += 1
print("moyenne :", s / len(notes), "validées :", nb)
phrase = "Les sacs des Etudiants sont lourds"
d = {mot: mot.count("s") for mot in phrase.lower().split()}
meilleur = None
for mot, n in d.items():
    if meilleur is None or n > d[meilleur]:
        meilleur = mot
print(meilleur, d[meilleur])
```

```sortie
moyenne : 10.9 validées : 3
sacs 2
```

## Flashcards

```cartes
Traduire `pour i ← 1 jusqu'à N` en Python ? :: for i in range(1, N + 1):
Traduire Répéter … jusqu'à c en Python ? :: while True: … puis if c: break
Les 5 algorithmes incontournables ? :: Somme/moyenne, min/max, recherche séquentielle, dichotomique, un tri.
Erreur la plus fréquente avec range ? :: Oublier que la borne de fin est exclue.
Erreur la plus fréquente avec input ? :: Oublier int() : input renvoie une chaîne.
Erreur de la permutation ? :: b ← a au lieu de b ← temp.
```

## QCM du chapitre

```qcm
? `for i in range(3): print(i, end="")` affiche :
+ 012
- 123
- 0 1 2
= end="" colle les valeurs.

? Quelle structure garantit au moins une exécution ?
- Pour
- TantQue
+ Répéter … jusqu'à
= Le test est en fin de tour.

? `int("12") + 3` vaut :
+ 15
- "123"
- Erreur
= La chaîne est d'abord convertie.

? Dans un tableau trié de 16 éléments, la dichotomie fait au plus environ :
- 16 comparaisons
+ 5 comparaisons
- 8 comparaisons
= 16 → 8 → 4 → 2 → 1 : log₂16 + 1.

? `len([1, [2, 3], 4])` vaut :
+ 3
- 4
- 2
= La sous-liste compte pour un élément.

? `"BM".lower() * 2` vaut :
+ 'bmbm'
- 'BMBM'
- Erreur
= * répète une chaîne.

? Après `T = [5, 1]` puis `T[0], T[1] = T[1], T[0]`, T vaut :
+ [1, 5]
- [5, 1]
- [1, 1]
= Échange simultané.

? `not (3 > 2 and 2 > 3)` vaut :
+ True
- False
- Erreur
= True and False = False, not False = True.

? Le tri qui place à chaque passe le minimum en tête est :
+ le tri par sélection
- le tri à bulles
- le tri par insertion
= Sélection du minimum.

? `{"a": 1, "a": 2}` donne :
+ {'a': 2}
- {'a': 1}
- une erreur
= Les clés sont uniques : la dernière valeur l'emporte.
```

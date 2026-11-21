---
id: enregistrements-enumerations
titre: Enregistrements (dataclass) et énumérations
seance: Chapitre III + namedtuple (Chapitre IV §5)
importance: 5
---

## Avant de commencer

Il faut savoir qu'une variable peut contenir des valeurs de types différents (int, str, float) et savoir écrire une fonction typée.

```exercice Vérifie ton prérequis
? Quel type donner à un prix comme 12.5 ?
reponse: float
= Un nombre à virgule est un `float`.
```

## Comment aborder ce chapitre

> [!astuce] **Un enregistrement, c'est une fiche.** Une fiche « Produit » a des cases : nom, catégorie, prix. Chaque produit est une fiche remplie.

> [!piege] Écrire une classe avec seulement `x: int` et `y: int` (sans `@dataclass`), puis appeler `Point(3, 5)`. Python plante : `TypeError: Point() takes no arguments`.

À la fin, tu sais écrire une `@dataclass`, créer des instances, lire leurs champs et définir une `Enum`. C'est le cœur de l'examen blanc.

## Idée 1 · L'enregistrement regroupe des champs de types différents

```html
<svg viewBox="0 0 560 120" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Fiche Produit avec trois champs : nom de type str, categorie de type str, prix de type float ; on y accède par p.nom, p.categorie, p.prix.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="10" width="300" height="100" rx="8" fill="none" stroke="#D9824F" stroke-width="2"/><text x="35" y="30" fill="#D9824F" font-weight="700">p : Produit</text>
<text x="35" y="55">nom : str = "Stylo"</text><text x="35" y="75">categorie : str = "Papeterie"</text><text x="35" y="95">prix : float = 4.5</text>
<text x="350" y="55">← p.nom</text><text x="350" y="75">← p.categorie</text><text x="350" y="95">← p.prix</text>
</g></svg>
```

En pseudo-code : `ENREGISTREMENT Point: x : ENTIER  y : ENTIER  FIN ENREGISTREMENT`. En Python, première méthode du prof : une classe avec `__init__`.

```python
class Point:
    def __init__(self, x: int, y: int):
        self.x: int = x
        self.y: int = y

point: Point = Point(3, 5)
print("Coordonnées du point :", point.x, ",", point.y)
```

```sortie
Coordonnées du point : 3 , 5
```

## Idée 2 · `@dataclass` : la méthode à retenir

Depuis Python 3.7, `@dataclass` écrit le `__init__` (et un affichage lisible) à ta place.

```python
from dataclasses import dataclass

@dataclass
class Produit:
    nom: str
    categorie: str
    prix: float

p = Produit("Stylo", "Papeterie", 4.5)
print(p.nom, p.prix)
print(p)
p.prix = 5.0          # les champs sont modifiables
print(p.prix)
```

```sortie
Stylo 4.5
Produit(nom='Stylo', categorie='Papeterie', prix=4.5)
5.0
```

> [!attention] Le polycopié propose une « deuxième méthode » : une classe avec seulement `x: int` et `y: int`, sans `@dataclass`. Ce code **plante** à `Point(3, 5)` (`TypeError`), car aucune méthode `__init__` n'est créée. Il faut ajouter `@dataclass` au-dessus de la classe.

> [!prof] L'examen blanc commence par une `@dataclass Produit` (nom, catégorie, prix). Sache l'écrire sans hésiter.

## Idée 3 · L'énumération : un choix parmi une liste finie

```python
from enum import Enum

class JourSemaine(Enum):
    LUNDI = 1
    MARDI = 2
    MERCREDI = 3
    JEUDI = 4
    VENDREDI = 5
    SAMEDI = 6
    DIMANCHE = 7

jour: JourSemaine = JourSemaine.MERCREDI
print("Aujourd'hui, c'est", jour)
print(jour.name, jour.value)
print(JourSemaine(5))
```

```sortie
Aujourd'hui, c'est JourSemaine.MERCREDI
MERCREDI 3
JourSemaine.VENDREDI
```

## Idée 4 · `namedtuple` : un tuple avec des noms

```python
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y', 'z'])
p = Point(1.5, 2.5, 0.0)
print(p.x, p[1])
print(p)
```

```sortie
1.5 2.5
Point(x=1.5, y=2.5, z=0.0)
```

**Choisir sa structure**

| Outil | Champs nommés | Modifiable |
|---|---|---|
| @dataclass | oui | oui |
| namedtuple | oui | non (tuple) |
| Enum | membres fixes | non |


## S'exercer

```exercice Fiches et énumérations
? (Examen blanc, Q17) Écris la dataclass `Produit` (nom, catégorie, prix).
= `from dataclasses import dataclass`, puis `@dataclass`, puis `class Produit:` avec les trois lignes `nom: str`, `categorie: str`, `prix: float`.

? Écris `Couleur(Enum)` avec ROUGE = 1, VERT = 2. Que vaut `Couleur.VERT.value` ?
reponse: 2
= `.value` renvoie la valeur associée au membre.

? Avec `P = namedtuple('P', ['a', 'b'])` et `q = P(1, 2)`, que fait `q.a = 5` ?
= Erreur `AttributeError` : un namedtuple est un tuple, donc immuable.
```

## Flashcards

```cartes
Enregistrement :: Regroupe plusieurs valeurs de types différents sous un seul nom ; accès par nom de champ.
@dataclass :: Décorateur (Python 3.7+) qui crée automatiquement `__init__` et l'affichage d'une classe de données.
Accès à un champ :: `p.nom`
Énumération :: Ensemble fini de valeurs possibles : `class Jour(Enum): LUNDI = 1 ...`
`.name` et `.value` d'un membre Enum :: Le nom (`'MERCREDI'`) et la valeur (`3`).
namedtuple :: Tuple aux champs nommés, du module collections ; immuable.
Classe avec seulement des annotations, sans @dataclass :: Pas de `__init__` : `Point(3, 5)` lève TypeError.
```

## QCM du chapitre

```qcm
? Quel module fournit `@dataclass` ?
- typing
+ dataclasses
- collections
= `from dataclasses import dataclass`.

? Depuis quelle version de Python existe `dataclasses` ?
- 3.5
+ 3.7
- 2.7
= Introduit en Python 3.7.

? Avec `@dataclass class Produit: nom: str; prix: float`, comment créer un produit ?
+ `Produit("Stylo", 4.5)`
- `Produit.nom = "Stylo"`
- `new Produit("Stylo", 4.5)`
= Le constructeur prend les champs dans l'ordre.

? `print(p)` pour une dataclass affiche…
- l'adresse mémoire
+ `Produit(nom='Stylo', prix=4.5)`
- rien
= La dataclass génère un affichage lisible.

? Quel module fournit `Enum` ?
+ enum
- dataclasses
- typing
= `from enum import Enum`.

? `JourSemaine.MERCREDI.value` vaut…
- "MERCREDI"
+ 3
- JourSemaine.MERCREDI
= `.value` renvoie la valeur associée.

? Un namedtuple est-il modifiable ?
- oui
+ non, c'est un tuple
- seulement ses champs numériques
= Les tuples sont immuables.

? D'où vient `namedtuple` ?
- enum
+ collections
- dataclasses
= `from collections import namedtuple`.

? `class Point: x: int; y: int` (sans décorateur), puis `Point(3, 5)` ?
- crée le point
+ TypeError
- renvoie None
= Sans `@dataclass`, aucun constructeur à deux arguments n'existe.

? À quoi sert une énumération ?
- à numéroter les lignes d'un fichier
+ à limiter une variable à un ensemble fini de valeurs
- à trier une liste
= Elle rend explicites les choix possibles.
```

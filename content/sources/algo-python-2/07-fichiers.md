---
id: fichiers
titre: Manipulation des fichiers et gestion des erreurs
seance: Chapitre V
importance: 4
---

## Avant de commencer

Il faut savoir manipuler les chaînes de caractères (`len`, tranches `s[0:10]`) et les listes.

```exercice Vérifie ton prérequis
? `s = "Beni Mellal"`. Que vaut `s[0:4]` ?
reponse: Beni
= Indices 0 à 3 (le 4 est exclu).
```

## Comment aborder ce chapitre

> [!astuce] **Imagine un curseur de traitement de texte.** Chaque lecture ou écriture le fait avancer. `tell()` dit où il est, `seek()` le déplace.

> [!piege] Ouvrir en mode `"w"` un fichier qui contient déjà des données : il est **vidé** à l'ouverture. Pour ajouter à la fin, c'est `"a"`.

À la fin, tu sais ouvrir, lire, écrire un fichier texte ou CSV, déplacer le curseur et gérer l'erreur « fichier introuvable ».

## Idée 1 · Ouvrir, lire, fermer

Deux types de fichiers : **texte** (lisible par l'humain) et **binaire** (images, audio…).

```flux Cycle de vie d'un fichier
OUVRIR (open) -> LIRE / ÉCRIRE (read, write) -> FERMER (close)
```

| Mode | Rôle | Si le fichier existe | S'il n'existe pas |
|---|---|---|---|
| `"r"` | lecture | lit | FileNotFoundError |
| `"w"` | écriture | **l'efface** | le crée |
| `"a"` | ajout | écrit à la fin | le crée |
| `"b"` | binaire (avec r/w/a : `"rb"`) | | |

```python
with open("mon_fichier.txt", "w") as f:
    f.write("Bonjour\nFSABM\n")
with open("mon_fichier.txt", "a") as f:
    f.write("Python 2\n")

f = open("mon_fichier.txt", "r")
for ligne in f:
    print(ligne.strip())       # strip enlève le \n de fin de ligne
f.close()

with open("mon_fichier.txt") as f:
    print(f.readlines())
```

```sortie
Bonjour
FSABM
Python 2
['Bonjour\n', 'FSABM\n', 'Python 2\n']
```

> [!retenir] `with open(...) as f:` ferme le fichier **automatiquement**, même en cas d'erreur. C'est l'équivalent de `OUVRIR ... COMME f` du pseudo-code du prof.

> [!attention] Dans l'exemple du polycopié, `print(ligne)` affiche une ligne vide entre chaque ligne : la ligne lue contient déjà son `\n`, et `print` en ajoute un. Utilise `ligne.strip()` ou `print(ligne, end="")`.

## Idée 2 · Le curseur : `read(n)`, `tell()`, `seek()`

```html
<svg viewBox="0 0 600 90" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Fichier de 25 caractères : read(10) lit les positions 0 à 9, seek saute les positions 10 à 14, read(10) lit 15 à 24.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="30" width="200" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="120" y="50" text-anchor="middle">read(10) : 0 → 9</text>
<rect x="220" y="30" width="100" height="30" fill="none" stroke="currentColor" stroke-dasharray="4 3"/><text x="270" y="50" text-anchor="middle">sauté (5)</text>
<rect x="320" y="30" width="200" height="30" fill="none" stroke="#D9824F" stroke-width="2"/><text x="420" y="50" text-anchor="middle">read(10) : 15 → 24</text>
<text x="220" y="80" text-anchor="middle">tell() = 10</text><text x="320" y="80" text-anchor="middle">seek(15)</text></g></svg>
```

```python
with open("exemple.txt", "w") as f:
    f.write("ABCDEFGHIJ-----KLMNOPQRST")

with open("exemple.txt", "r") as fichier:
    premier_bloc: str = fichier.read(10)
    print("Premier bloc :", premier_bloc, "| position :", fichier.tell())
    fichier.seek(fichier.tell() + 5)
    deuxieme_bloc: str = fichier.read(10)
    print("Deuxième bloc :", deuxieme_bloc)
```

```sortie
Premier bloc : ABCDEFGHIJ | position : 10
Deuxième bloc : KLMNOPQRST
```

## Idée 3 · Gérer fichiers et dossiers : `shutil` et `os`

| Action | Code |
|---|---|
| copier | `shutil.copy(source, destination)` |
| déplacer | `shutil.move(source, destination)` |
| supprimer | `os.remove(chemin)` (après `os.path.exists(chemin)`) |
| créer un dossier | `os.mkdir(nom)` |

```python
import os, shutil
with open("source.txt", "w") as f:
    f.write("data")
os.mkdir("nouveau_dossier")
shutil.copy("source.txt", "copie.txt")
shutil.move("copie.txt", "nouveau_dossier/destination.txt")
if os.path.exists("source.txt"):
    os.remove("source.txt")
print(os.listdir("nouveau_dossier"), os.path.exists("source.txt"))
```

```sortie
['destination.txt'] False
```

## Idée 4 · CSV et `try … except`

```python
import csv
with open("nouveau.csv", "w", newline="") as fichier_csv:
    ecrivain = csv.writer(fichier_csv)
    ecrivain.writerow(["Nom", "Age"])
    ecrivain.writerow(["Alice", 25])

with open("nouveau.csv", "r") as fichier_csv:
    for ligne in csv.reader(fichier_csv):
        print(ligne)
```

```sortie
['Nom', 'Age']
['Alice', '25']
```

> [!piege] `csv.reader` renvoie **toujours des chaînes** : `'25'`, pas `25`. Convertis avec `int(ligne[1])`.

```etapes Lire un fichier sans planter
Essaie :: `try:` puis `with open('donnees.csv', 'r') as f:` et la lecture.
Cas prévu :: `except FileNotFoundError:` affiche « Le fichier n'a pas été trouvé. »
Cas imprévu :: `except Exception as e:` affiche le message de l'erreur `e`.
Ordre :: l'exception la plus précise d'abord, `Exception` en dernier.
```

```python
import csv
try:
    with open('absent.csv', 'r') as f:
        for ligne in csv.reader(f):
            print(ligne)
except FileNotFoundError:
    print("Le fichier n'a pas été trouvé.")
except Exception as e:
    print(f"Une erreur est survenue: {e}")
```

```sortie
Le fichier n'a pas été trouvé.
```

## S'exercer

```exercice Fichiers
? Un fichier contient 3 lignes. On l'ouvre en `"w"` et on écrit `"x"`. Combien de lignes contient-il ensuite ?
reponse: 1
= Le mode `"w"` efface le contenu : il ne reste que `x`.

? Après `f.read(7)` sur un fichier neuf, que renvoie `f.tell()` ?
reponse: 7
= Le curseur a avancé de 7 caractères.

? Écris une fonction `compter_lignes(nom: str) -> int` qui renvoie -1 si le fichier n'existe pas.
= `try:` `with open(nom) as f: return len(f.readlines())` puis `except FileNotFoundError: return -1`.
```

## Flashcards

```cartes
Mode "r" :: Lecture ; FileNotFoundError si le fichier n'existe pas.
Mode "w" :: Écriture ; crée le fichier ou l'efface s'il existe.
Mode "a" :: Ajout à la fin du fichier.
`with open(...) as f:` :: Ouvre et ferme automatiquement le fichier.
`f.tell()` :: Position actuelle du curseur.
`f.seek(p)` :: Déplace le curseur à la position p.
read / readline / readlines :: Tout le texte (ou n caractères) / une ligne / la liste des lignes.
shutil.copy / shutil.move :: Copier / déplacer un fichier.
os.remove / os.mkdir :: Supprimer un fichier / créer un dossier.
csv.reader :: Renvoie chaque ligne comme une liste de chaînes.
```

## QCM du chapitre

```qcm
? Quel mode ajoute du texte à la fin sans effacer ?
- "w"
+ "a"
- "r"
= "a" = append.

? Ouvrir en "r" un fichier inexistant provoque…
+ FileNotFoundError
- la création du fichier
- None
= Le mode lecture n'en crée pas.

? `f.read(10)` lit…
- 10 lignes
+ 10 caractères
- 10 octets en binaire seulement
= En mode texte, read(n) lit n caractères.

? Quelle méthode renvoie la position du curseur ?
- seek()
+ tell()
- pos()
= seek déplace, tell indique.

? Quel module sert à copier un fichier ?
- os
+ shutil
- csv
= `shutil.copy(source, destination)`.

? Quelle fonction supprime un fichier ?
+ `os.remove`
- `shutil.delete`
- `os.mkdir`
= os.remove(chemin).

? Que renvoie `readlines()` ?
- une chaîne
+ une liste de lignes
- le nombre de lignes
= Chaque élément garde son `\n`.

? Avantage de `with open(...)` ?
+ le fichier est fermé automatiquement
- il lit plus vite
- il évite toutes les erreurs
= La fermeture est garantie à la sortie du bloc.

? csv.reader renvoie l'âge 25 sous la forme…
- 25
+ '25'
- 25.0
= Tout est lu comme chaîne.

? Dans `try ... except`, où place-t-on `except Exception` ?
- en premier
+ en dernier
- jamais
= Les exceptions précises d'abord, la générale ensuite.
```

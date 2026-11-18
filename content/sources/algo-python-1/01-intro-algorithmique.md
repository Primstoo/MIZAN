---
id: intro-algorithmique
titre: Introduction à l'algorithmique et instructions élémentaires
seance: Séance 1 · 7 octobre 2024
importance: 4
---

## Avant de commencer

Aucun prérequis en informatique. Il faut juste savoir faire une division euclidienne : quotient et reste.

```exercice Vérifie ton prérequis
? Dans la division de 17 par 5, quel est le reste ?
indice: 5 × 3 = 15. Combien manque-t-il pour arriver à 17 ?
reponse: 2
= 17 = 5 × 3 + 2. Le quotient est 3, le reste est **2**. En algorithmique, ce reste s'obtient avec l'opérateur modulo : 17 % 5 vaut 2.
```

## Comment aborder ce chapitre

> [!astuce] Un algorithme, c'est une recette : des ingrédients (entrées), des étapes précises (traitement), un plat (sortie). Avant d'écrire une ligne, demande-toi toujours : **qu'est-ce que je reçois, qu'est-ce que je dois rendre ?**

> [!piege] Confondre la flèche d'affectation `←` et le signe `=`. En pseudo-code, `age ← 18` **range** 18 dans `age`. Le signe `=` sert à **comparer** : `a = b` vaut vrai ou faux.

À la fin, tu sais écrire un algorithme complet en pseudo-langage (en-tête + corps) avec variables, constantes, opérateurs et entrées/sorties.

## Idée 1 · Un algorithme transforme des entrées en sorties

```flux Ce que fait tout algorithme
Entrées (données lues) -> Traitement (instructions pas à pas) -> Sorties (résultats affichés)
```

Un **algorithme** est une suite finie d'instructions claires qui résout un problème. Un **programme** est la traduction de cet algorithme dans un langage (ici Python, à partir de la séance 5).

Le prof cite plusieurs familles d'algorithmes : force brute (on essaie tout), récursif, recherche, tri, diviser pour régner, hachage.

Les qualités attendues d'un algorithme :

| Qualité | Ce que ça veut dire |
|---|---|
| Entrée / Sortie | il reçoit des valeurs et produit au moins un résultat |
| Sans ambiguïté | chaque instruction a un seul sens |
| Finitude | il s'arrête après un nombre fini d'étapes |
| Déterminisme | même entrée → même résultat |
| Généricité | il marche pour toute une famille de cas |
| Lisibilité, efficacité | clair, sans étapes inutiles |
| Indépendance du langage | traduisible en C, Python, Java… |

> [!prof] Le prof insiste sur la **finitude** : un algorithme qui tourne en boucle infinie n'est pas un algorithme.

## Idée 2 · La structure d'un algorithme : en-tête + corps

```html
<svg viewBox="0 0 460 230" style="width:100%;max-width:520px;display:block;margin:10px auto" role="img" aria-label="Un algorithme se compose d'un en-tête (nom, rôle, entrées, sorties, déclarations) puis d'un corps entre Début et Fin">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="10" width="420" height="92" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="34" y="32" font-weight="700">En-tête</text>
<text x="34" y="52">Algorithme Cercle · Rôle : surface d'un cercle</text>
<text x="34" y="70">ENTRÉES : r   ·   SORTIES : surface</text>
<text x="34" y="88">Constante PI : 3.1415927   Variables r, surface : réels</text>
<rect x="20" y="114" width="420" height="104" rx="8" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="34" y="136" font-weight="700" fill="#D9824F">Corps</text>
<text x="34" y="156">Début</text>
<text x="58" y="174">r ← 2.3</text>
<text x="58" y="192">surface ← PI * r * r</text>
<text x="34" y="210">Fin</text>
</g></svg>
```

L'**en-tête** donne le nom, le rôle, les entrées, les sorties et les déclarations. Le **corps** est la suite d'instructions indentées entre `Début` et `Fin`. Les commentaires s'écrivent `/* ... */` : la machine les ignore.

```
Algorithme Surface_cercle
/* ENTRÉES : r   SORTIES : surface, perimetre */
Constante PI : 3.1415927
Variables r, surface, perimetre : réels
Début
    r ← 2.3
    surface ← PI * r * r
    perimetre ← 2 * PI * r
Fin
```

Le prof décrit 4 étapes pour construire un algorithme :

```etapes Construire un algorithme
Comprendre le problème :: Quelles entrées, quelles sorties, quels cas particuliers ?
Préparer :: Lister les données nécessaires et les déclarer (variables, constantes).
Traiter :: Écrire la résolution pas à pas, en découpant en sous-problèmes si besoin.
Éditer les résultats :: Afficher à l'écran (Ecrire) ou écrire dans un fichier.
```

## Idée 3 · Variables, types, constantes, affectation

Une **variable** est un emplacement mémoire nommé, avec un **type**. Sa valeur peut changer. Une **constante** (`Constante Pi : 3.14159265359`) ne change jamais.

| Type | Exemples |
|---|---|
| Entier | -3, 0, 42 |
| Réel | 3.14, -0.5 |
| Caractère | 'A', '5', '@' |
| Chaîne de caractères | "Bonjour", "12345" |
| Booléen | Vrai, Faux |

L'affectation `age ← age + 2` se lit **de droite à gauche** : on calcule `age + 2` avec l'ancienne valeur, puis on range le résultat dans `age`.

```grille Trace de l'algorithme du prof (age)
#cols: instruction | age
age ← 18 | *18
age ← age + 2 | *20
```

Voici la même chose en Python (tu le verras en détail à la séance 5 : `=` remplace `←`) :

```python
age = 18
age = age + 2
print(age)
```

```sortie
20
```

## Idée 4 · Opérateurs arithmétiques, logiques, de comparaison

**Arithmétiques** : `+`, `-`, `*`, `/`, et `%` (modulo = reste de la division entière). Exemple du prof : 15 divisé par 2 donne 7, il reste 1, donc 15 % 2 vaut 1.

**Comparaison** : `=`, `!=` (ou `<>`), `<`, `>`, `<=`, `>=`. Le résultat est un booléen.

**Logiques** : ET, OU, NON.

```grille Tables de vérité
#cols: A | B | A ET B | A OU B | NON A
vrai | vrai | *vrai | *vrai | faux
vrai | faux | faux | *vrai | faux
faux | vrai | faux | *vrai | *vrai
faux | faux | faux | faux | *vrai
```

> [!retenir] **ET** n'est vrai que si **les deux** sont vraies. **OU** n'est faux que si **les deux** sont fausses.

L'exemple de comparaison du prof (a ← 5, b ← 5, c ← 10), traduit en Python :

```python
a, b, c = 5, 5, 10
print(a < c, a <= b, c > b, c >= c, not (c <= b), c > a)
print(15 % 2, 18 % 5)
```

```sortie
True True True True True True
1 3
```

> [!attention] Sur la diapositive « Algorithm 7 », la ligne `S ORTIES` est écrite « Comprarer » : simple faute de frappe, il faut lire « Comparer ».

## Idée 5 · Lire et Écrire

- `Ecrire("message", variable)` affiche à l'écran (sortie).
- `Lire(variable)` attend une saisie au clavier et la range dans la variable (entrée).

```
Variables nom : chaîne de caractères
          age : Entier
Début
    Ecrire("Entrez votre nom : ")
    Lire(nom)
    Ecrire("Entrez votre âge : ")
    Lire(age)
    Ecrire("Bonjour, ", nom)
    Ecrire("Vous avez ", age, " ans.")
Fin
```

> [!piege] Toujours un `Ecrire` **avant** chaque `Lire` : sinon l'utilisateur voit un écran vide et ne sait pas quoi taper.

## S'exercer

```exercice Exercices du TD 1
? (TD 1, ex. 1) Écris un algorithme qui lit deux nombres a et b et affiche leur somme, différence, produit, division et modulo.
indice: Deux Lire, puis cinq Ecrire. Attention à la division par zéro.
= Variables a, b : entiers
Début
  Ecrire("a = ") ; Lire(a)
  Ecrire("b = ") ; Lire(b)
  Ecrire("somme : ", a + b)
  Ecrire("différence : ", a - b)
  Ecrire("produit : ", a * b)
  Ecrire("division : ", a / b)
  Ecrire("modulo : ", a % b)
Fin
(Pour a = 17, b = 5 : 22, 12, 85, 3.4, 2.) La division et le modulo supposent b ≠ 0 : on le vérifiera avec un Si au chapitre suivant.

? (TD 1, ex. 2) Calcule l'aire S = Pi × R² d'un cercle de rayon R lu au clavier (Pi = 3.14159).
= Constante Pi : 3.14159
Variables R, S : réels
Début
  Ecrire("Rayon : ") ; Lire(R)
  S ← Pi * R * R
  Ecrire("Aire : ", S)
Fin

? (TD 1, ex. 6) Échange les valeurs de deux variables A et B.
indice: Il faut une troisième variable.
= Variables A, B, temp : entiers
Début
  Lire(A) ; Lire(B)
  temp ← A
  A ← B
  B ← temp
  Ecrire("A = ", A, " B = ", B)
Fin
Sans temp, A ← B écrase l'ancienne valeur de A, qui est perdue.
```

## Flashcards

```cartes
Qu'est-ce qu'un algorithme ? :: Une suite finie d'instructions non ambiguës qui transforme des entrées en sorties.
Différence algorithme / programme ? :: Le programme est la traduction de l'algorithme dans un langage de programmation.
Les deux parties d'un algorithme ? :: L'en-tête (nom, rôle, entrées, sorties, déclarations) et le corps (Début … Fin).
Que fait age ← age + 2 ? :: Calcule age + 2 avec l'ancienne valeur, puis range le résultat dans age.
Que vaut 15 % 2 ? :: 1 (le reste de la division entière de 15 par 2).
Quand A ET B est-il vrai ? :: Seulement quand A et B sont toutes les deux vraies.
Quand A OU B est-il faux ? :: Seulement quand A et B sont toutes les deux fausses.
Variable ou constante ? :: Une variable peut changer pendant l'exécution ; une constante (mot-clé Constante) jamais.
```

## QCM du chapitre

```qcm
? Quelle qualité impose qu'un algorithme s'arrête après un nombre fini d'étapes ?
- Le déterminisme
+ La finitude
- La généricité
= La finitude interdit la boucle infinie.

? Un algorithme est déterministe si…
- il est écrit dans un seul langage
+ la même entrée donne toujours le même résultat
- il utilise des nombres aléatoires
= Un algorithme non déterministe peut donner des résultats différents pour la même entrée.

? Que vaut 18 % 5 ?
- 3.6
+ 3
- 1
= 18 = 5 × 3 + 3 : le reste est 3.

? Après `x ← 4` puis `x ← x * 3`, que vaut x ?
- 4
- 7
+ 12
= On calcule 4 × 3 avec l'ancienne valeur puis on range 12 dans x.

? En pseudo-langage, `a = b`…
+ compare a et b et vaut vrai ou faux
- range b dans a
- range a dans b
= L'affectation s'écrit `←`. Le `=` est une comparaison.

? « vrai OU faux » vaut :
+ vrai
- faux
- impossible à dire
= OU est vrai dès qu'une des deux conditions est vraie.

? « NON(vrai) ET vrai » vaut :
- vrai
+ faux
- vrai OU faux
= NON(vrai) = faux, et faux ET vrai = faux.

? Où déclare-t-on les variables et les constantes ?
+ Dans l'en-tête, avant Début
- Après Fin
- N'importe où dans le corps
= Les déclarations font partie de l'en-tête.

? Quel type pour stocker "12345" ?
- Entier
- Réel
+ Chaîne de caractères
= Les guillemets en font un texte, pas un nombre.

? Que fait `Lire(x)` ?
- Affiche x à l'écran
+ Attend une saisie au clavier et la range dans x
- Efface x
= Lire est l'instruction d'entrée ; Ecrire est l'instruction de sortie.
```

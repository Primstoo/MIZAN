---
id: arithmetique-ordinateur
titre: Introduction et arithmétique de l'ordinateur
seance: Chapitres 0 et 1 · Introduction, arithmétique de l'ordinateur
importance: 4
---

## Avant de commencer

Il te faut savoir écrire un nombre en puissances de 10 : $4526 = 4\times10^3 + 5\times10^2 + 2\times10 + 6$. Tout le chapitre fait la même chose en base 2.

```exercice Vérifie ton prérequis
? Écris $0.0523$ sous la forme $0.d_1d_2d_3 \times 10^e$ avec $d_1 \neq 0$.
indice: Décale la virgule jusqu'à ce que le premier chiffre après la virgule soit non nul.
= $0.0523 = 0.523 \times 10^{-1}$. C'est exactement la « forme normalisée » du cours.
```

## Comment aborder ce chapitre

> [!astuce] **L'ordinateur ne connaît pas les réels.** Il ne stocke qu'un nombre fini de chiffres. Chaque nombre et chaque opération sont donc arrondis. Le chapitre t'apprend à mesurer et à prévoir ces petites erreurs.

> [!piege] Croire qu'un calcul « juste en théorie » donne un résultat juste en machine. La suite $u_{n+1} = 1 - 2u_n$ avec $u_0 = 1/3$ est constante en théorie, et pourtant elle explose en machine.

À la fin, tu sais convertir entre bases, coder un entier en complément à 2, normaliser un flottant, calculer erreur absolue et relative, et expliquer absorption, non-distributivité et instabilité.

## Idée 1 · Pourquoi l'analyse numérique

```flux Démarche d'un problème scientifique (chapitre 0)
Phénomène réel -> Modèle mathématique -> Analyse numérique -> Implémentation informatique -> Résultat
```

L'analyse numérique sert quand la solution exacte est **inaccessible** : équation sans formule ($x = \cos x$), intégrale impossible à calculer, équation différentielle trop complexe. On construit alors une **approximation fiable**, et on étudie sa **convergence**, sa **stabilité** et son **coût**.

```python
import math
x = 1.0
for n in range(1, 31):
    x = math.cos(x)
    if n in (1, 2, 10, 30):
        print(n, round(x, 6))
```

```sortie
1 0.540302
2 0.857553
10 0.744237
30 0.739087
```

C'est l'exemple du prof : la suite $x_{n+1} = \cos(x_n)$ s'approche de la solution de $x = \cos x$, environ $0.739085$.

## Idée 2 · Trois sources d'erreurs

```grille D'où viennent les erreurs
#cols: Source Exemple
Données mesures imprécises, bruit
Méthode troncature, discrétisation
*Machine arrondis, overflow, underflow
```

- **Conditionnement** : sensibilité du **problème** aux perturbations des données. Exemple du prof : $f(x) = \frac{1}{1-x}$ donne $f(0.99) = 100$ mais $f(0.991) \approx 111.11$.
- **Stabilité** : un **algorithme** est stable s'il n'amplifie pas les erreurs d'arrondi.

> [!retenir] Un problème bien conditionné peut être mal résolu si l'algorithme est instable.

## Idée 3 · Entiers : bases et complément à 2

Conversion décimal → base $b$ : divisions successives par $b$, on lit les restes **de bas en haut**.

```etapes Coder −12 sur 5 bits en complément à 2
Écrire |x| en binaire :: $12 = (01100)_2$ sur 5 bits.
Inverser tous les bits :: $01100 \to 10011$.
Ajouter 1 :: $10011 + 1 = 10100$. Donc $-12 = (10100)_2$.
Vérifier :: On stocke $2^5 + x = 32 - 12 = 20 = (10100)_2$. Même résultat.
```

```python
def c2(x, n):
    return format((2**n + x) % 2**n, f"0{n}b")

print(bin(42), oct(57), hex(57))
print(c2(-12, 5), c2(-13, 6))
print("intervalle 8 bits :", -2**7, 2**7 - 1)
```

```sortie
0b101010 0o71 0x39
10100 110011
intervalle 8 bits : -128 127
```

Sur $n$ bits signés : $-2^{n-1} \le x \le 2^{n-1} - 1$. Au-delà, **dépassement** : sur 8 bits, $72 + 59 = 131$ devient $-125$.

## Idée 4 · Réels : virgule flottante normalisée

Partie fractionnaire → binaire : on **multiplie par 2** et on garde la partie entière.

```grille 0.375 en binaire
#cols: Calcul Bit
2 × 0.375 = 0.75 *0
2 × 0.75 = 1.5 *1
2 × 0.5 = 1.0 *1
```

Donc $0.375 = (0.011)_2$ et $3.375 = (11.011)_2$. Mais $0.1 = (0.000110011\ldots)_2$ : **infini et périodique**. D'où le fameux $0.1 + 0.2 \neq 0.3$.

Forme normalisée : $x = (-1)^s\, m \times B^e$, $m = 0.d_1d_2\ldots d_t$ avec $d_1 \neq 0$, donc $B^{-1} \le m < 1$.

| Format | Signe | Exposant | Mantisse | $x_{max}$ |
|---|---|---|---|---|
| Simple (32 bits) | 1 | 8 | 23 | $\approx 3.4\times10^{38}$ |
| Double (64 bits) | 1 | 11 | 52 | $\approx 1.8\times10^{308}$ |

```python
from fractions import Fraction
print(0.1 + 0.2, 0.1 + 0.2 == 0.3)
print(Fraction(0.1))
print(float(int("11001", 2) + Fraction(0b01101, 2**5)))
print(float(0x1AC + Fraction(0x2B, 256)))
```

```sortie
0.30000000000000004 False
3602879701896397/36028797018963968
25.40625
428.16796875
```

> [!attention] Dans la diapo 22, $(1AC.2B)_{16}$ est converti en $428.1250000078093$. C'est faux : $428 + \frac{2}{16} + \frac{11}{256} = 428.16796875$ (vérifié ci-dessus).

## Idée 5 · Arrondi, erreur absolue et relative

Avec $t$ chiffres : on garde $d_1\ldots d_t$ ; si $d_{t+1} \ge B/2$ on ajoute $B^{-t}$ (arrondi), sinon on coupe.

- Erreur absolue : $\Delta x = |x - fl(x)|$ (la quantité d'erreur).
- Erreur relative : $\delta x = \Delta x / |x|$ (l'importance de l'erreur, souvent en %).

```python
x, fx = 0.3147, 0.315
da = abs(x - fx)
print(round(da, 6), round(da / abs(x), 6))
```

```sortie
0.0003 0.000953
```

> [!attention] La diapo 32 appelle « troncature » le premier cas de la règle. En réalité les deux cas forment **l'arrondi au plus proche**. La troncature, c'est couper **toujours**, sans regarder $d_{t+1}$ : $3.14159 \to 3.14$ (TD 1).

## Idée 6 · Arithmétique flottante : absorption, non-distributivité

Chaque opération est arrondie : $x \oplus y = fl(fl(x) + fl(y))$. Pour additionner, on **aligne les exposants** : le petit nombre perd ses chiffres.

```python
def fl(x, t):
    from math import floor, log10
    if x == 0: return 0.0
    e = floor(log10(abs(x))) + 1
    return float(f"{round(x / 10**e, t)}e{e}")

print(fl(76.54 + 0.004856, 4))                    # absorption, t = 4
print(fl(122 * fl(333 + 695, 3), 3))              # 122 x (333 + 695)
print(fl(fl(122 * 333, 3) + fl(122 * 695, 3), 3))  # 122x333 + 122x695
print(1e9 + 1e-9 == 1e9)
```

```sortie
76.54
126000.0
125000.0
True
```

Exemple du prof avec $t = 3$ : $0.126\times10^6 \neq 0.125\times10^6$. La distributivité échoue, et « $x + y = x \Rightarrow y = 0$ » n'est plus vrai.

## Idée 7 · Stabilité : la suite qui explose

```etapes Pourquoi u(n+1) = 1 − 2 u(n) explose
Théorie :: Avec $u_0 = 1/3$, on a $u_n = 1/3$ pour tout $n$.
Erreur initiale :: La machine stocke $u_0 + \epsilon_0$, avec $\epsilon_0 \approx 10^{-17}$.
Propagation :: $\epsilon_n = -2\,\epsilon_{n-1}$, donc $\epsilon_n = (-2)^n \epsilon_0$.
Explosion :: Dès que $2^n \approx 10^{16}$, soit $n \approx 55$ à $60$, l'erreur domine.
Remède :: Récurrence inversée $u_n = (1 - u_{n+1})/2$ : l'erreur est **divisée** par 2 à chaque pas.
```

```python
u = 1/3
for n in range(1, 81):
    u = 1 - 2*u
    if n in (1, 10, 40, 60, 80):
        print(n, u)

v = 0.0                      # u100 très mal connu (erreur 1/3)
for n in range(99, 79, -1):
    v = (1 - v) / 2
print("inversée u80 =", v)
```

```sortie
1 0.33333333333333337
10 0.3333333333333144
40 0.33331298828125
60 -21.0
80 -22369621.0
inversée u80 = 0.33333301544189453
```

> [!prof] Le prof insiste : **un algorithme correct en théorie peut être inutilisable en pratique**. Choisis toujours un algorithme stable.

## S'exercer

```exercice Exercices types (série 1)
? Convertis $57$ en binaire, puis en octal et en hexadécimal.
= $57 = (111001)_2$. Groupes de 3 bits : $111\,001 = (71)_8$. Groupes de 4 : $0011\,1001 = (39)_{16}$. Vérification : $3\times16 + 9 = 57$.

? Représente $-13$ sur 6 bits en complément à 2 et donne l'intervalle représentable.
= $13 = 001101$, inversé $110010$, $+1$ : $110011$. Intervalle $[-32, 31]$.

? Normalise $12.75$ en binaire.
= $12 = 1100_2$, $0.75 = 0.11_2$, donc $12.75 = 1100.11_2 = 1.10011_2 \times 2^3$ (ou $0.110011_2\times 2^4$ en forme $0.d_1\ldots$ du cours).

? Erreur relative si $x = 0.3147$ est arrondi à $0.315$ ? (en notation scientifique, 2 chiffres)
reponse: 0.00095 ~0.00002
= $\Delta x = 0.0003$, $\delta x = 0.0003 / 0.3147 \approx 9.5\times10^{-4}$.
```

## Flashcards

```cartes
Conversion décimal → base b (entier) :: Divisions successives par b, restes lus de bas en haut.
Complément à 2 de x < 0 sur n bits :: On stocke $2^n + x$ : inverser les bits de $|x|$ puis ajouter 1.
Intervalle des entiers signés sur n bits :: $[-2^{n-1},\ 2^{n-1} - 1]$.
Mantisse normalisée en base B :: $m = 0.d_1d_2\ldots d_t$ avec $d_1 \neq 0$, donc $B^{-1} \le m < 1$.
Double précision IEEE 754 :: 64 bits : 1 signe, 11 exposant, 52 mantisse.
Erreur relative :: $\delta x = |x - fl(x)| / |x|$ : mesure l'importance de l'erreur.
Absorption :: Un très petit nombre ajouté à un grand disparaît après alignement des exposants.
Conditionnement vs stabilité :: Conditionnement = sensibilité du problème ; stabilité = l'algorithme n'amplifie pas les erreurs.
Pourquoi $u_{n+1} = 1 - 2u_n$ explose :: L'erreur est multipliée par $-2$ à chaque pas : $\epsilon_n = (-2)^n\epsilon_0$.
```

## QCM du chapitre

```qcm
? $42$ s'écrit en binaire :
- $(110101)_2$
+ $(101010)_2$
- $(100110)_2$
= Divisions par 2 : restes 0,1,0,1,0,1 lus de bas en haut.

? $-12$ sur 5 bits en complément à 2 :
- $11100$
+ $10100$
- $01100$
= $01100 \to 10011 \to 10100$.

? Sur 8 bits signés, on représente :
- $[0, 255]$
+ $[-128, 127]$
- $[-127, 127]$
= $[-2^7, 2^7 - 1]$, un seul zéro en complément à 2.

? Pourquoi $0.1 + 0.2 \neq 0.3$ en Python ?
- Python a un bug d'addition
+ $0.1$ a une écriture binaire infinie, donc il est arrondi
- Les flottants n'ont que 8 chiffres
= $0.1 = (0.000110011\ldots)_2$ ne tient pas dans 52 bits de mantisse.

? $(0.375)_{10}$ en binaire :
- $(0.101)_2$
+ $(0.011)_2$
- $(0.0011)_2$
= $0.375 = 1/4 + 1/8$.

? En double précision, la mantisse occupe :
- 23 bits
- 11 bits
+ 52 bits
= 1 + 11 + 52 = 64 bits.

? $x = 0.2\times10^{-3}$ et $fl(x) = 0.22\times10^{-3}$. L'erreur relative vaut :
- $0.2\times10^{-4}$
+ $10\,\%$
- $1\,\%$
= $\Delta x = 0.2\times10^{-4}$, divisé par $0.2\times10^{-3}$ : $0.1$.

? Le phénomène d'absorption, c'est :
+ un petit nombre ajouté à un grand qui disparaît
- un dépassement de la plus grande valeur
- une division par zéro
= Après alignement des exposants, les chiffres du petit nombre sortent de la mantisse.

? La suite $u_{n+1} = 1 - 2u_n$, $u_0 = 1/3$, calculée en machine :
- reste égale à $1/3$
+ diverge à cause de l'amplification de l'erreur par 2
- converge vers 0
= $\epsilon_n = (-2)^n\epsilon_0$ : vers $n \approx 60$, l'erreur dépasse la valeur.

? Le conditionnement mesure :
- la vitesse d'un algorithme
+ la sensibilité de la solution exacte aux perturbations des données
- le nombre de bits de la mantisse
= C'est une propriété du problème, pas de l'algorithme.
```

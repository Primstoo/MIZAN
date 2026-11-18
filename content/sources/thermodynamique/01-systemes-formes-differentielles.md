---
id: systemes-formes-differentielles
titre: Systèmes, variables d'état et formes différentielles
seance: Chapitre 1 (1re partie) · Généralités sur les systèmes
importance: 5
---

## Avant de commencer

Il te faut une seule chose : savoir calculer une **dérivée partielle**. On dérive par rapport à une variable en traitant les autres comme des constantes.

```exercice Vérifie ton prérequis
? Soit $f(x,y) = x\sin y - x^2 y$. Calcule $\left(\frac{\partial f}{\partial x}\right)_y$ et $\left(\frac{\partial f}{\partial y}\right)_x$.
indice: Pour la première, y est une constante.
= $\left(\frac{\partial f}{\partial x}\right)_y = \sin y - 2xy$ et $\left(\frac{\partial f}{\partial y}\right)_x = x\cos y - x^2$. C'est l'exemple du prof.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « état » contre « chemin ».** Une fonction d'état (U, H, S…) ne dépend que de l'état initial et de l'état final. Le travail et la chaleur dépendent du chemin. Tout le chapitre sert à reconnaître mathématiquement la différence.

> [!piege] Écrire $dW$ ou $dQ$ comme si W et Q étaient des fonctions d'état. Le prof écrit $\delta W$ et $\delta Q$ : ce sont des formes différentielles **non exactes**. On n'écrit jamais $\Delta W$.

À la fin, tu sais classer un système, tester si une forme différentielle est exacte (Schwarz) et trouver un facteur intégrant.

## Idée 1 · Système, milieu extérieur, et ce qu'ils échangent

```grille Ce que chaque type de système peut échanger
#cols: Énergie | Matière | Exemple du cours
#rows: Isolé | Fermé | Ouvert
~non | ~non | L'univers
*oui | ~non | Gaz dans un cylindre fermé par un piston
*oui | *oui | Êtres vivants, compresseur
```

Le système est la partie de l'univers délimitée par une surface fermée (réelle ou fictive). Tout le reste est le **milieu extérieur**.

> [!retenir] **Convention de signe du prof** : on compte **positif** ce qui est **reçu** par le système, **négatif** ce qui est **cédé**. Un gaz comprimé reçoit du travail : W > 0.

## Idée 2 · Variables d'état, équation d'état, fonction d'état

```flux Du plus simple au plus construit
Variables d'état (P, V, T, m…) -> Équation d'état f(P,V,T)=0 -> Fonctions d'état (U, H, S)
```

- **Variables d'état** : masse, volume, pression, température, concentration… Elles décrivent l'état à un instant.
- **Équation d'état** : relation entre elles. Gaz parfait : $PV = nRT$. Ressort : $F = kx$.
- **Fonction d'état** : fonction de variables d'état indépendantes. Ex. $V = V(P,T)$, mais aussi l'énergie, l'enthalpie, l'entropie.

Exemple : pour 1 mol de gaz parfait à 300 K et $10^5$ Pa, $V = RT/P = 8{,}314 \times 300 / 10^5 \approx 0{,}0249\ \text{m}^3$, soit environ 24,9 L.

## Idée 3 · Différentielle totale et théorème de Schwarz

Pour $f(x,y)$ :

$$df = \left(\frac{\partial f}{\partial x}\right)_y dx + \left(\frac{\partial f}{\partial y}\right)_x dy$$

Une **forme différentielle** $\delta\omega = P(x,y)\,dx + Q(x,y)\,dy$ est **exacte** s'il existe $f$ avec $df = \delta\omega$. Schwarz (dérivées croisées égales) donne le test :

$$\delta\omega \text{ exacte} \iff \left(\frac{\partial P}{\partial y}\right)_x = \left(\frac{\partial Q}{\partial x}\right)_y$$

À 3 variables, $P\,dx + Q\,dy + R\,dz$ : il faut $P'_y = Q'_x$, $Q'_z = R'_y$ et $P'_z = R'_x$.

```etapes Tester une forme et retrouver f
Identifier P et Q :: Pour $\delta u = y\,dx + x\,dy$ : $P = y$, $Q = x$.
Dérivées croisées :: $\partial P/\partial y = 1$ et $\partial Q/\partial x = 1$ : égales, donc exacte.
Intégrer P en x :: $u = xy + g(y)$.
Dériver en y et comparer à Q :: $\partial u/\partial y = x + g'(y) = x$, donc $g' = 0$.
Conclure :: $u(x,y) = xy + C$.
```

> [!prof] L'exemple du prof : pour un gaz parfait, $P = nRT/V$ et $dP = -\frac{nRT}{V^2}dV + \frac{nR}{V}dT$. Les dérivées croisées valent toutes deux $-nR/V^2$ : $dP$ est bien une différentielle totale exacte.

## Idée 4 · Le facteur intégrant

Une forme non exacte peut le devenir après multiplication par une fonction $\lambda$ : c'est un **facteur intégrant**, $\lambda\,\delta\omega = dF$.

C'est exactement ce qui se passe en thermo : $\delta Q$ n'est pas exacte, mais $\delta Q/T$ l'est (on le verra avec l'entropie). Ici $\lambda = 1/T$.

```etapes Trouver λ(x) pour δf = (x² + y)dx − x dy (TD 1)
Écrire la condition :: $\frac{\partial}{\partial y}[\lambda(x^2+y)] = \frac{\partial}{\partial x}[-\lambda x]$.
Calculer :: $\lambda = -\lambda - x\lambda'$, donc $x\lambda' = -2\lambda$.
Résoudre :: $\lambda'/\lambda = -2/x$, donc $\lambda = 1/x^2$ (à une constante près).
Vérifier :: $\left(1 + \frac{y}{x^2}\right)dx - \frac{1}{x}dy = d\!\left(x - \frac{y}{x}\right)$.
```

## Idée 5 · Les relations générales entre dérivées partielles

Si $f(x,y,z) = 0$, chaque variable est fonction des deux autres. On obtient :

$$\left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial x}\right)_z = 1 \qquad \left(\frac{\partial x}{\partial y}\right)_z \left(\frac{\partial y}{\partial z}\right)_x \left(\frac{\partial z}{\partial x}\right)_y = -1$$

La seconde (le « $-1$ ») sert au chapitre suivant pour relier les coefficients thermoélastiques.

Vérification avec $PV = nRT$ : $\left(\frac{\partial P}{\partial V}\right)_T = -\frac{P}{V}$, $\left(\frac{\partial V}{\partial T}\right)_P = \frac{V}{T}$, $\left(\frac{\partial T}{\partial P}\right)_V = \frac{T}{P}$. Produit : $-\frac{P}{V}\cdot\frac{V}{T}\cdot\frac{T}{P} = -1$.

## S'exercer

```exercice Exercices du TD 1
? $\delta u = 2y^2\,dx + 3x^2\,dy$ est-elle exacte ?
indice: Compare ∂P/∂y et ∂Q/∂x.
= $\partial(2y^2)/\partial y = 4y$ et $\partial(3x^2)/\partial x = 6x$. Différents : **non exacte**, pas de fonction $u$.

? $\delta u = y\,dx + x\,dy$ : exacte ? Si oui, donne $u$.
= Dérivées croisées égales à 1 : exacte, $u = xy + C$.

? Trouve le facteur intégrant $\lambda(x)$ de $\delta f = (x^2 + y)dx - x\,dy$.
= $\lambda = 1/x^2$, et alors $f = x - y/x + C$.
```

## Flashcards

```cartes
Système isolé :: N'échange ni énergie ni matière avec l'extérieur (ex. l'univers).
Système fermé :: Échange de l'énergie, pas de matière (gaz dans un cylindre à piston).
Système ouvert :: Échange énergie et matière.
Convention de signe :: Positif ce qui est reçu par le système, négatif ce qui est cédé.
Fonction d'état :: Grandeur qui ne dépend que de l'état (initial et final), pas du chemin : U, H, S.
Test de Schwarz :: $P\,dx + Q\,dy$ exacte $\iff \partial P/\partial y = \partial Q/\partial x$.
Facteur intégrant :: Fonction $\lambda$ telle que $\lambda\,\delta\omega$ devienne une différentielle exacte.
Relation « −1 » :: $(\partial x/\partial y)_z(\partial y/\partial z)_x(\partial z/\partial x)_y = -1$.
```

## QCM du chapitre

```qcm
? Un gaz enfermé dans un cylindre fermé par un piston est un système :
- isolé
+ fermé
- ouvert
= Il peut échanger de l'énergie (travail, chaleur) mais pas de matière.

? Avec la convention du prof, un système qui cède 200 J de chaleur a :
- $Q = +200$ J
+ $Q = -200$ J
- $Q = 0$
= Ce qui est cédé est compté négativement.

? Laquelle n'est **pas** une fonction d'état ?
- l'énergie interne U
- l'enthalpie H
+ le travail W
= Le travail dépend du chemin suivi : on écrit $\delta W$, jamais $dW$.

? $\delta\omega = 2y^2dx + 3x^2dy$ est :
- exacte
+ non exacte
- exacte seulement si x = y
= $4y \ne 6x$ en général.

? $y\,dx + x\,dy$ est la différentielle de :
- $x + y$
+ $xy$
- $x^2 + y^2$
= $d(xy) = y\,dx + x\,dy$.

? Le théorème de Schwarz affirme, pour f de classe $C^2$ :
+ $\frac{\partial^2 f}{\partial x\partial y} = \frac{\partial^2 f}{\partial y\partial x}$
- $\frac{\partial f}{\partial x} = \frac{\partial f}{\partial y}$
- $\frac{\partial^2 f}{\partial x^2} = 0$
= L'ordre de dérivation n'importe pas.

? Un facteur intégrant de $(x^2+y)dx - x\,dy$ est :
- $x^2$
+ $1/x^2$
- $1/x$
= Condition $x\lambda' = -2\lambda$, d'où $\lambda = 1/x^2$.

? Pour $PV = nRT$, le produit $(\partial P/\partial V)_T(\partial V/\partial T)_P(\partial T/\partial P)_V$ vaut :
- $1$
+ $-1$
- $0$
= C'est la relation générale « −1 ».

? Une équation d'état est :
- une fonction qui dépend du chemin
+ une relation entre variables d'état, du type $f(P,V,T) = 0$
- une forme différentielle non exacte
= Ex. $PV = nRT$ pour le gaz parfait.

? $\left(\frac{\partial f}{\partial x}\right)_y$ signifie :
- dériver f par rapport à y
+ dériver f par rapport à x en gardant y constant
- dériver x par rapport à f
= L'indice rappelle la variable maintenue constante.
```

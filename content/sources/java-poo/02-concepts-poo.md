---
id: concepts-poo
titre: Objet, classe et les trois piliers de la POO
seance: Séance 1 · TD 1 (exercices 3 et 4)
importance: 5
---

## Avant de commencer

Tu dois savoir pourquoi on est passé du procédural à la POO : pour mieux **réutiliser** et **modulariser** (chapitre 1).

```exercice Vérifie ton prérequis
? En programmation procédurale, les données et les fonctions sont-elles regroupées ou séparées ?
= **Séparées** (Algorithmes + Structures de données). La POO fait l'inverse : elle les **regroupe** dans un objet. Garde cette opposition en tête pour tout le chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « moule et gâteaux ».** La classe est le moule : elle décrit la forme. Les objets sont les gâteaux : chacun est concret, avec son propre contenu. Un seul moule, autant de gâteaux que tu veux.

> [!piege] Le cours pose la question : « L'objet arrive avant la classe ? » **Non.** Il faut le moule avant le gâteau : on définit la classe, puis on crée des objets à partir d'elle.

À la fin, tu sais définir objet, classe, instance, attribut, méthode, et expliquer encapsulation, héritage et polymorphisme.

## Idée 1 · Un objet, c'est un état plus un comportement

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Un objet regroupe un état, ses données, et un comportement, ses méthodes">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="90" y="8" width="180" height="104" rx="10" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="26" font-weight="700" fill="#D9824F">Objet « Bob »</text>
<rect x="102" y="36" width="72" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="138" y="54" font-weight="700">État</text><text x="138" y="70" font-size="10">nom = Bob</text><text x="138" y="84" font-size="10">poste = directeur</text>
<rect x="186" y="36" width="72" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="222" y="54" font-weight="700">Comportement</text><text x="222" y="70" font-size="10">travailler()</text><text x="222" y="84" font-size="10">sePresenter()</text>
<text x="40" y="64" font-size="10">message</text>
</g>
<path d="M8 72h78" stroke="currentColor" stroke-width="2"/><path d="M80 67l6 5-6 5" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

**Objet = État + Comportement.** C'est une **entité autonome** qui regroupe un état et les opérations permettant de manipuler cet état.

| Mot | Définition |
|---|---|
| **État** | Les **valeurs des attributs** de l'objet (ses données) |
| **Comportement** | Les **opérations possibles** sur l'objet, déclenchées par des **stimulations externes** (appels de méthodes, ou « messages ») |
| **Message** | On « envoie un message » à un objet quand on **appelle une de ses méthodes** |

Exemple du cours : l'objet **Bob**, dont l'état contient « directeur ».

> [!retenir] « L'appel d'une méthode est en fait l'envoi d'un **message** à l'objet. »

## Idée 2 · La classe est le modèle, l'objet est l'instance

```html
<svg viewBox="0 0 360 150" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="La classe Point, en trois cases, et son instance PremierPoint avec les valeurs de ses attributs">
<g font-family="sans-serif" font-size="11" fill="currentColor">
<rect x="20" y="10" width="120" height="96" fill="none" stroke="currentColor" stroke-width="2"/><line x1="20" y1="36" x2="140" y2="36" stroke="currentColor" stroke-width="2"/><line x1="20" y1="70" x2="140" y2="70" stroke="currentColor" stroke-width="2"/>
<text x="80" y="27" text-anchor="middle" font-weight="700">Point</text><text x="28" y="50">coordX</text><text x="28" y="63">coordY</text><text x="28" y="86">deplacer()</text><text x="28" y="99">afficher()</text>
<text x="80" y="124" text-anchor="middle" font-size="10">la classe (le modèle)</text>
<rect x="220" y="26" width="124" height="66" fill="none" stroke="#D9824F" stroke-width="3"/><line x1="220" y1="50" x2="344" y2="50" stroke="#D9824F" stroke-width="2"/>
<text x="282" y="42" text-anchor="middle" font-weight="700" fill="#D9824F">premierPoint</text><text x="228" y="66">coordX = 12.45</text><text x="228" y="81">coordY = 13.45</text>
<text x="282" y="110" text-anchor="middle" font-size="10">l'objet (une instance)</text>
<text x="180" y="50" text-anchor="middle" font-size="10">« instance of »</text>
</g>
<path d="M218 58H146" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/><path d="M152 53l-6 5 6 5" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

**Classe.** Un **modèle** (une description) d'un ensemble d'objets qui ont la **même structure de données** et les **mêmes méthodes**, mais des **valeurs différentes** pour chaque objet.

**Objet.** Une **instance** de la classe : un objet concret, créé à partir de cette classe. Créer un objet à partir d'une classe s'appelle l'**instanciation**.

Une classe a deux composantes :

| Composante | Nom en POO | Rôle |
|---|---|---|
| Données | **Attributs** | Variables qui décrivent l'état |
| Comportements, traitements | **Méthodes** | Fonctions que l'objet peut exécuter |

On dessine une classe en **trois cases** : le nom de la classe, les attributs, les méthodes.

> [!retenir] Chaque objet de la classe Point possède **son propre état**. Deux points ont les mêmes attributs (coordX, coordY) mais pas les mêmes valeurs.

Trois faits sur les objets :

- les valeurs des attributs caractérisent l'**état** de l'objet ;
- l'objet peut faire appel à **n'importe quelle méthode** de sa classe ;
- tout objet est identifié et manipulé par sa **référence**.

## Idée 3 · L'encapsulation : cacher l'état, passer par les méthodes

```html
<svg viewBox="0 0 360 110" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Les attributs sont cachés à l'intérieur, les méthodes forment l'interface autour">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="110" y="8" width="140" height="94" rx="12" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="24">méthodes (public)</text>
<rect x="134" y="34" width="92" height="52" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="56" fill="#D9824F" font-weight="700">attributs</text><text x="180" y="72" font-size="10">(private)</text>
<text x="42" y="44">extérieur</text><text x="318" y="62" font-size="10">accès direct</text><text x="318" y="76" font-size="10">interdit</text>
</g>
<path d="M14 58h92" stroke="currentColor" stroke-width="2"/><path d="M100 53l6 5-6 5" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M290 40L232 54" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/><path d="M252 40l14 16M266 40l-14 16" stroke="#D9824F" stroke-width="2.5"/>
</svg>
```

**Encapsulation.** C'est **regrouper les données et les méthodes** dans une classe, tout en **cachant l'état interne** : on y accède **uniquement via des méthodes**, qui jouent le rôle d'**interface**.

Elle repose sur deux niveaux de visibilité :

| Mot | Symbole dans un diagramme | Visibilité |
|---|---|---|
| **public** | `+` | À l'intérieur **et** à l'extérieur de la classe : accessible par tous |
| **private** | `-` | Limitée à l'**intérieur** de la classe : accessible seulement par les méthodes de la classe |

À quoi ça sert : la **sécurité**. On protège les données contre les modifications, grâce aux privilèges d'accès.

> [!piege] **Rendre les attributs publics casse l'encapsulation** (TD 1, exercice 4). N'importe qui pourrait alors mettre une valeur absurde dans l'objet, sans contrôle.

## Idée 4 · Héritage et polymorphisme, en une phrase chacun

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Forme est la classe mère de Rectangle et Cercle ; Carré hérite de Rectangle">
<g font-family="sans-serif" font-size="12" text-anchor="middle" fill="currentColor">
<rect x="140" y="6" width="80" height="26" rx="4" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="24" fill="#D9824F" font-weight="700">Forme</text>
<rect x="60" y="54" width="90" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><text x="105" y="72">Rectangle</text>
<rect x="210" y="54" width="90" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><text x="255" y="72">Cercle</text>
<rect x="60" y="100" width="90" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><text x="105" y="118">Carré</text>
</g>
<path d="M105 54L170 34M255 54L190 34M105 100V82" stroke="currentColor" stroke-width="2"/>
<path d="M162 40l8-6-1 10M198 40l-8-6 1 10M100 89l5-7 5 7" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>
```

**Héritage.** C'est le fait de **définir une nouvelle classe à partir d'une classe existante**, en lui ajoutant de nouvelles méthodes et de nouvelles données. Il permet de **réutiliser** ce qui existe déjà pour créer une classe plus spécialisée. Exemple du cours : Forme, puis Rectangle et Cercle, puis Carré.

**Polymorphisme.** Le mot veut dire **« plusieurs formes »**. Il permet de **manipuler des objets sans connaître précisément leur type**. Il existe sous deux formes :

- le **polymorphisme de méthodes** (surcharge et redéfinition) ;
- le **polymorphisme d'objets**.

**Le lien entre les deux** (TD 1) : le polymorphisme **complète** l'héritage. L'héritage crée la hiérarchie de classes, et le polymorphisme l'exploite : il permet de manipuler les objets des classes dérivées sans connaître leur type exact.

```etapes Les trois piliers en trois questions
Encapsulation : qui a le droit de toucher ? :: Seules les méthodes de la classe touchent aux attributs. Le reste du programme passe par elles.
Héritage : d'où vient cette classe ? :: D'une classe existante, qu'on enrichit. Un Carré est un Rectangle particulier.
Polymorphisme : à qui je parle ? :: À une Forme, sans savoir si c'est un Cercle ou un Carré. Chacun répond à sa façon.
```

> [!attention] Les relations entre classes (association, agrégation, composition) et le détail surcharge / redéfinition sont dans le chapitre suivant. Le code Java de l'héritage n'a pas encore été vu en séance.

## S'exercer

```exercice TD 1 · exercices 3 et 4
? Qu'est-ce qu'un objet ?
= Objet = État + Comportement. C'est une entité autonome regroupant un état et les opérations permettant de manipuler cet état.

? Définis l'état et le comportement d'un objet.
= **État** : les valeurs des attributs de l'objet. **Comportement** : les opérations possibles sur l'objet, déclenchées par des stimulations externes.

? Quelle est la différence entre une classe et un objet ?
= La classe est un modèle (une description) d'un ensemble d'objets ayant une structure de données commune et disposant des mêmes méthodes. L'objet est une instance de la classe.

? Qu'est-ce que l'encapsulation ?
= Elle consiste à cacher les attributs d'une classe et à n'autoriser l'accès aux données que par les méthodes de l'objet, qui jouent le rôle d'interface.

? Quelles sont les composantes principales d'une classe ? Distingue-les.
= Les **attributs** (données : variables décrivant l'état) et les **méthodes** (fonctions que l'objet peut exécuter).

? Comment appelle-t-on le processus de création d'un objet à partir d'une classe ?
= L'**instanciation**.

? Que signifient les symboles + et - dans un diagramme de classe ?
= `+` : public (accessible par tous). `-` : private (accessible seulement par les méthodes de la classe).

? Une classe doit-elle obligatoirement avoir des attributs ?
= Non, ce n'est pas obligatoire.

? Que signifie « envoyer un message » à un objet ?
= Faire appel à une de ses méthodes.
```

## Flashcards

```cartes
Objet : la formule :: Objet = État + Comportement.
État d'un objet :: Les valeurs de ses attributs.
Comportement d'un objet :: Les opérations possibles sur l'objet, déclenchées par des stimulations externes (appels de méthodes).
Classe : définition :: Modèle d'objets qui ont la même structure de données et les mêmes méthodes, avec des valeurs différentes pour chaque objet.
Instance :: Un objet concret créé à partir d'une classe.
Instanciation :: Le processus de création d'un objet à partir d'une classe.
Les 2 composantes d'une classe :: Les attributs (données) et les méthodes (traitements).
Les 3 cases du dessin d'une classe :: Nom de la classe, attributs, méthodes.
Encapsulation :: Regrouper données et méthodes dans une classe en cachant l'état interne : on n'y accède que par des méthodes.
public / private :: public (+) : visible à l'intérieur et à l'extérieur de la classe. private (-) : visible seulement à l'intérieur.
Qu'est-ce qui casse l'encapsulation ? :: Rendre les attributs publics.
Héritage :: Définir une nouvelle classe à partir d'une classe existante, en ajoutant de nouvelles méthodes et données.
Polymorphisme :: « Plusieurs formes » : manipuler des objets sans connaître précisément leur type.
Les 2 formes de polymorphisme :: Polymorphisme de méthodes (surcharge, redéfinition) et polymorphisme d'objets.
« Envoyer un message » à un objet :: Appeler une de ses méthodes.
L'objet arrive-t-il avant la classe ? :: Non : on définit d'abord la classe (le modèle), puis on crée des objets.
```

## QCM du chapitre

```qcm
? Quelle formule résume un objet ?
- Objet = Classe + Instance
+ Objet = État + Comportement
- Objet = Algorithme + Données
= L'état, ce sont les valeurs des attributs ; le comportement, les opérations possibles.

? L'état d'un objet correspond :
- au nom de sa classe
- à la liste de ses méthodes
+ aux valeurs de ses attributs
= Deux objets de la même classe ont les mêmes attributs mais des états différents.

? Une classe est :
+ un modèle d'objets ayant la même structure et les mêmes méthodes
- un objet particulier
- une variable globale
= La classe décrit ; l'objet existe.

? Comment appelle-t-on la création d'un objet à partir d'une classe ?
- L'encapsulation
- La compilation
+ L'instanciation
= L'objet créé est une instance de la classe.

? Dans un diagramme de classe, le symbole `-` devant un attribut signifie :
- public
+ private
- supprimé
= `+` = public, `-` = private.

? Un attribut `private` est accessible :
- par tout le programme
+ seulement par les méthodes de sa classe
- seulement par la méthode main
= C'est le principe de l'encapsulation.

? Qu'est-ce qui casse l'encapsulation ?
+ Rendre les attributs publics
- Ajouter une méthode à la classe
- Créer plusieurs objets
= L'état interne ne serait plus protégé.

? L'héritage consiste à :
- copier-coller le code d'une classe dans une autre
+ définir une nouvelle classe à partir d'une classe existante
- cacher les attributs d'une classe
= On ajoute de nouvelles méthodes et de nouvelles données à ce qui existe.

? Que signifie « polymorphisme » ?
- Une seule forme
+ Plusieurs formes
- Sans forme
= Il permet de manipuler des objets sans connaître précisément leur type.

? « Envoyer un message à un objet » signifie :
- afficher un texte à l'écran
+ appeler une de ses méthodes
- le supprimer de la mémoire
= L'appel de méthode est une stimulation externe qui déclenche un comportement.

? Dans l'exemple du cours (Forme, Rectangle, Cercle, Carré), de quelle classe Carré hérite-t-elle directement ?
- Forme
+ Rectangle
- Cercle
= Carré est sous Rectangle, lui-même sous Forme.
```

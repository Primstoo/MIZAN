---
id: paradigmes
titre: Paradigmes, cycle de vie et qualités d'un logiciel
seance: Séance 1 · Chapitre 1 · TD 1 (exercices 1 et 2)
importance: 4
---

## Avant de commencer

Tu dois avoir déjà écrit un programme en C : des variables, des fonctions, un `main`. C'est ce qu'on appelle la programmation procédurale.

```exercice Vérifie ton prérequis
? En C, tu as une fonction `moyenne(int tab[], int n)`. Où sont rangées les données, et où est rangé le traitement ?
= Les **données** sont dans le tableau, déclaré ailleurs. Le **traitement** est dans la fonction. Les deux sont **séparés** : c'est le point de départ de tout le chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « histoire d'un problème ».** Les programmes sont devenus trop gros. On a essayé de réutiliser du code, et ça cassait. La programmation orientée objet (POO) est la réponse. Chaque définition du chapitre est une étape de cette histoire.

> [!piege] Ce chapitre n'a aucun code, alors beaucoup le survolent. Pourtant le **TD 1 est fait uniquement de questions de cours** : définitions, listes, comparaisons. Ce sont des points faciles à l'examen, à condition de connaître les mots exacts.

À la fin, tu sais définir un paradigme, citer le cycle de vie en 7 étapes, les qualités d'un logiciel, et expliquer pourquoi on est passé à la POO.

## Idée 1 · Un paradigme est une manière de programmer

**Définition.** Un paradigme est une **manière de programmer un ordinateur, basée sur un ensemble de principes ou une théorie**.

```html
<svg viewBox="0 0 360 120" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Trois paradigmes : procédural avec C, orienté objet avec Java, descriptif avec HTML">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="6" y="14" width="108" height="92" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="36" font-weight="700">Procédural</text><text x="60" y="56" font-size="10">appel de procédures</text><text x="60" y="70" font-size="10">et de fonctions</text><text x="60" y="94">C</text>
<rect x="126" y="14" width="108" height="92" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="36" font-weight="700" fill="#D9824F">Orienté objet</text><text x="180" y="56" font-size="10">assemblage de briques</text><text x="180" y="70" font-size="10">appelées objets</text><text x="180" y="94">Java, C++</text>
<rect x="246" y="14" width="108" height="92" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="36" font-weight="700">Descriptif</text><text x="300" y="56" font-size="10">décrire des structures</text><text x="300" y="70" font-size="10">de données</text><text x="300" y="94">HTML, XML</text>
</g>
</svg>
```

| Paradigme | Principe | Exemple |
|---|---|---|
| **Programmation procédurale** | Se fonde sur le concept d'**appel procédural** : le programme tourne autour de procédures ou de fonctions | C |
| **Programmation orientée objet** | Consiste en la définition et l'assemblage de **briques logicielles appelées objets** | Java, C++ |
| **Programmation descriptive** | Permet de **décrire des structures de données** | HTML, XML |

> [!retenir] Procédural : on pense **actions** (fonctions). Objet : on pense **choses** (objets). Descriptif : on **décrit**, on ne calcule pas.

## Idée 2 · Le cycle de vie d'un logiciel en 7 étapes

Construire un logiciel devient complexe parce qu'il demande **plusieurs ressources humaines, matérielles et technologiques**. On découpe donc le travail en étapes.

```flux Le cycle de vie, dans l'ordre
1. Expression des besoins -> 2. Analyse -> 3. Conception -> 4. Implémentation -> 5. Tests -> 6. Validation -> 7. Maintenance et évolution
```

```etapes Les 7 étapes, une par une
1. L'expression des besoins :: Le client dit ce qu'il veut.
2. L'analyse :: On comprend et on précise le problème.
3. La conception :: On dessine la solution (classes, relations) avant de coder.
4. L'implémentation :: On écrit le code.
5. Les tests :: On vérifie que le code fonctionne.
6. La validation :: On vérifie que le logiciel répond bien au besoin du client.
7. La maintenance et l'évolution :: Pendant la **phase d'exploitation**, on corrige et on fait évoluer.
```

> [!attention] Les notes donnent seulement les **noms** des sept étapes. La phrase d'explication de chaque étape ci-dessus est ajoutée par ToumaiLearn. En examen, ce sont les noms et leur ordre qui comptent.

> [!astuce] Pour l'ordre : « **B**eaucoup d'**A**mis **C**odent, **I**ls **T**estent, **V**alident et **M**aintiennent » : Besoins, Analyse, Conception, Implémentation, Tests, Validation, Maintenance.

## Idée 3 · Les six qualités d'un logiciel

| Qualité | Définition |
|---|---|
| **Exactitude** | Le programme donne le résultat que l'on veut ; il répond aux spécifications |
| **Robustesse** | Le programme sait bien réagir quand on s'écarte des conditions normales d'utilisation |
| **Extensibilité** | Le programme peut être adapté pour répondre à l'évolution des spécifications |
| **Réutilisabilité** | On peut utiliser certaines parties du logiciel pour résoudre un autre problème |
| **Portabilité** | On peut exploiter le même logiciel sur d'autres machines ou implémentations |
| **Efficience** | Temps d'exécution et taille mémoire |

```html
<svg viewBox="0 0 360 86" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Exactitude : conditions normales. Robustesse : conditions anormales.">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="10" y="12" width="160" height="62" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="90" y="34" font-weight="700">Exactitude</text><text x="90" y="52" font-size="10">utilisation normale</text><text x="90" y="66" font-size="10">le bon résultat</text>
<rect x="190" y="12" width="160" height="62" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="270" y="34" font-weight="700" fill="#D9824F">Robustesse</text><text x="270" y="52" font-size="10">utilisation anormale</text><text x="270" y="66" font-size="10">une bonne réaction</text>
</g>
</svg>
```

Exemple : un programme de division. **Exact** : 10 / 2 affiche 5. **Robuste** : 10 / 0 affiche « division impossible » au lieu de planter.

> [!piege] Exactitude et robustesse se confondent facilement. L'exactitude concerne le cas **normal**, la robustesse le cas **anormal**.

## Idée 4 · De la programmation structurée à la POO

L'équation de **Wirth** résume la programmation structurée :

```flux L'équation de Wirth
Algorithmes + Structures de données = Programmes
```

Le problème : la programmation structurée **ne suffit plus pour les grands systèmes logiciels**. En pratique, pour **étendre et réutiliser** un logiciel, il fallait souvent **« casser » le module intéressant**, parce qu'il était nécessaire de remettre en cause une structure de données.

```etapes Pourquoi on est passé à la POO
Le point de départ :: En procédural, les données et les fonctions sont séparées (équation de Wirth).
Le besoin :: On veut réutiliser un module dans un autre projet, avec des données un peu différentes.
Le blocage :: Pour l'adapter, il faut modifier la structure de données, donc « casser » le module.
La réponse de la POO :: Des composants autonomes, les objets, qui regroupent données et traitements. Et l'**héritage** : on crée une nouvelle classe à partir d'une existante, sans la casser.
La conclusion à écrire :: La **réutilisation** et la **modularité** sont les deux objectifs qui ont fait évoluer les paradigmes, jusqu'à la POO qui les réalise le mieux.
```

En POO, le logiciel est fait de **composants autonomes**, les « objets », qui disposent de ressources et de moyens d'interaction entre eux.

## S'exercer

```exercice TD 1 · exercices 1 et 2
? Définis un paradigme de programmation.
= Un paradigme est une manière de programmer un ordinateur, basée sur un ensemble de principes ou une théorie.

? Donne trois exemples de paradigmes avec leur principe et un langage.
= **Procédural** : fondé sur l'appel procédural (C). **Orienté objet** : définition et assemblage de briques logicielles appelées objets (Java). **Descriptif** : permet de décrire des structures de données (HTML, XML).

? Pourquoi la construction d'un logiciel devient-elle complexe ?
= Parce qu'elle nécessite plusieurs ressources humaines, matérielles et technologiques.

? Cite les étapes du cycle de vie d'un logiciel.
= 1) L'expression des besoins. 2) L'analyse. 3) La conception. 4) L'implémentation. 5) Les tests. 6) La validation. 7) La maintenance et l'évolution pendant la phase d'exploitation.

? Donne deux qualités d'un logiciel et définis-les.
= **Exactitude** : aptitude d'un programme à fournir le résultat voulu et à répondre aux spécifications. **Robustesse** : aptitude à bien réagir lorsque l'on s'écarte des conditions normales d'utilisation.

? Écris l'équation de Wirth.
= Algorithmes + Structures de données = Programmes.

? Quel est le problème de la programmation procédurale, et quelle solution apporte la POO ?
= La programmation structurée ne suffit plus pour les grands systèmes : réutiliser un logiciel conduisait souvent à « casser » le module intéressant. La POO apporte une solution grâce au concept d'héritage entre classes.
```

## Flashcards

```cartes
Paradigme : définition :: Manière de programmer un ordinateur, basée sur un ensemble de principes ou une théorie.
Programmation procédurale :: Paradigme fondé sur le concept d'appel procédural (procédures, fonctions). Exemple : C.
Programmation orientée objet :: Définition et assemblage de briques logicielles appelées objets. Exemples : Java, C++.
Programmation descriptive :: Permet de décrire des structures de données. Exemples : HTML, XML.
Les 7 étapes du cycle de vie :: Expression des besoins, analyse, conception, implémentation, tests, validation, maintenance et évolution.
Les 6 qualités d'un logiciel :: Exactitude, robustesse, extensibilité, réutilisabilité, portabilité, efficience.
Exactitude :: Le programme fournit le résultat voulu et répond aux spécifications.
Robustesse :: Le programme réagit bien quand on s'écarte des conditions normales d'utilisation.
Extensibilité :: Le programme peut être adapté à l'évolution des spécifications.
Réutilisabilité :: On peut utiliser certaines parties du logiciel pour résoudre un autre problème.
Portabilité :: Le même logiciel s'exploite sur d'autres machines ou implémentations.
Efficience :: Temps d'exécution et taille mémoire.
Équation de Wirth :: Algorithmes + Structures de données = Programmes.
Limite de la programmation structurée :: Pour étendre ou réutiliser, il fallait souvent « casser » le module, car il fallait remettre en cause une structure de données.
Les 2 objectifs qui ont mené à la POO :: La réutilisation et la modularité.
```

## QCM du chapitre

```qcm
? Qu'est-ce qu'un paradigme de programmation ?
- Un langage de programmation particulier
+ Une manière de programmer basée sur un ensemble de principes ou une théorie
- Un logiciel qui traduit le code en binaire
= C, Java ou HTML sont des langages ; le paradigme est la façon de penser le programme.

? Quel langage illustre la programmation procédurale dans le cours ?
+ C
- Java
- HTML
= Java illustre l'orienté objet, HTML le descriptif.

? HTML et XML relèvent de la programmation :
- procédurale
- orientée objet
+ descriptive
= Ils décrivent des structures de données, ils ne calculent pas.

? Quelle est la première étape du cycle de vie d'un logiciel ?
- L'analyse
+ L'expression des besoins
- La conception
= On commence par savoir ce que veut le client.

? Dans le cycle de vie, quelle étape vient juste après l'implémentation ?
- La validation
- La conception
+ Les tests
= Ordre : besoins, analyse, conception, implémentation, tests, validation, maintenance.

? Un programme qui affiche un message clair au lieu de planter quand on saisit une lettre à la place d'un nombre est :
- extensible
+ robuste
- portable
= La robustesse, c'est bien réagir hors des conditions normales d'utilisation.

? Le même logiciel fonctionne sur Windows et sur Linux. Quelle qualité est en jeu ?
- La réutilisabilité
- L'efficience
+ La portabilité
= Portabilité : exploiter le même logiciel sur d'autres machines ou implémentations.

? L'efficience d'un logiciel concerne :
+ le temps d'exécution et la taille mémoire
- le nombre de développeurs
- la beauté de l'interface
= C'est la définition donnée dans le cours.

? Complète l'équation de Wirth : Algorithmes + … = Programmes.
- Objets
+ Structures de données
- Fonctions
= C'est le résumé de la programmation structurée.

? Pourquoi la programmation structurée ne suffit-elle plus pour les grands systèmes ?
- Elle est trop lente à l'exécution
+ Réutiliser un module obligeait souvent à le « casser »
- Elle ne permet pas d'écrire des fonctions
= Il fallait remettre en cause une structure de données pour étendre ou réutiliser.

? Quels sont les deux objectifs qui ont fait évoluer les paradigmes jusqu'à la POO ?
- La vitesse et la sécurité
+ La réutilisation et la modularité
- La portabilité et l'efficience
= La POO est le paradigme qui les réalise le mieux.
```

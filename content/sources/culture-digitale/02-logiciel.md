---
id: logiciel
titre: Environnement de travail · le logiciel
seance: Séquence 2
importance: 5
---

## Avant de commencer

Il faut connaître les composants matériels de la séquence 1 (CPU, RAM, disque) : le système d'exploitation sert justement à les gérer.

```exercice Vérifie ton prérequis
? Quel composant stocke les fichiers de façon permanente ?
= Le disque dur (ou SSD).
```

## Comment aborder ce chapitre

> [!astuce] Le système d'exploitation (SE, ou OS) est un **chef d'orchestre** entre toi, les applications et le matériel. Tout le chapitre tourne autour de cette image.

> [!piege] Mélanger les dates Windows. Retiens les tournants : **1985** Windows 1, **1995** menu Démarrer, **2001** XP, **2007** Vista (échec), **2015** Windows 10, **2021** Windows 11.

À la fin, tu sais décrire les parties d'un SE, ses quatre phases historiques et la chronologie de Windows.

## Idée 1 · À quoi sert un système d'exploitation

Le SE fait le lien entre le matériel, l'utilisateur et les applications : il gère mémoire, fichiers, matériel et connexion Internet.

```flux Le SE au milieu
Utilisateur -> Applications -> Système d'exploitation (noyau) -> Matériel
```

| Partie | Rôle |
|---|---|
| **Noyau (kernel)** | cœur : processus, mémoire, fichiers, entrées/sorties, réseau. Accès direct restreint (sécurité) |
| **API** | outils pour que les développeurs créent des programmes compatibles |
| **GUI** | interface graphique : icônes, menus |
| **Terminal** | commandes en ligne, pour utilisateurs avancés |

Exemple : tu double-cliques sur une icône (GUI) ; le noyau charge le programme du disque vers la RAM et lui donne du temps processeur.

## Idée 2 · Les quatre phases de l'histoire des SE

| Phase | Période | Ce qui change |
|---|---|---|
| Préhistoire | 1949-1955 | pas de SE, tubes à vide, le constructeur est aussi programmeur et opérateur |
| 2e phase | 1956-1965 | transistors, premiers SE, cartes perforées, **traitement par lots** |
| 3e phase | 1961-1972 | circuits intégrés, **multiprogrammation**, **temps partagé** (plusieurs utilisateurs via terminaux) |
| 4e phase | 1972-aujourd'hui | ordinateurs personnels : MS-DOS, CP/M, MacOS, Unix, Linux, Windows |

> [!retenir] MS-DOS : mode réel, **mono-tâche**, **mono-utilisateur**, ligne de commande.

## Idée 3 · La chronologie de Windows

```etapes De MS-DOS à Windows 11
1975 :: Bill Gates et Paul Allen créent Microsoft
1981 · MS-DOS :: premier SE de Microsoft, lignes de commande, pas d'interface graphique
1985 · Windows 1 :: première interface graphique sur MS-DOS, souris obligatoire (jeu Reversi)
1990 · Windows 3 :: CD-ROM et cartes son, arrivée du Solitaire
1995 · Windows 95 :: barre des tâches, menu Démarrer, corbeille
2001 · XP :: interface assouplie, sécurité accrue, bureau à distance
2007 · Vista :: échec commercial (performances, compatibilité)
2009 · Windows 7 :: retour de la satisfaction des utilisateurs
2015 · Windows 10 :: « en tant que service », Cortana, Edge
2021 · Windows 11 :: nouveau design, applications Android
```

> [!attention] Le support décrit « Windows 365 » comme un abonnement à la dernière version de Microsoft Office. En réalité, l'offre Office s'appelle Microsoft 365 ; Windows 365 est un PC Windows dans le cloud. Au quiz, réponds selon le cours si la question reprend sa formulation.

## Idée 4 · Les TP Windows

Les TP portent sur le bureau, la barre des tâches, le menu Démarrer, les paramètres et la gestion des fichiers.

```etapes Gérer un fichier (TP)
Naviguer :: ouvre l'Explorateur et va dans le bon dossier
Créer :: clic droit > Nouveau > Dossier, puis renomme
Copier ou déplacer :: Ctrl+C / Ctrl+X puis Ctrl+V
Supprimer :: le fichier part dans la corbeille
Restaurer :: dans la corbeille, clic droit > Restaurer
Compresser :: avec WinRAR, pour envoyer un dossier en un seul fichier
```

> [!attention] Les raccourcis Ctrl+C, Ctrl+X, Ctrl+V ne figurent pas dans le résumé : ce sont des compléments utiles pour le TP.

## S'exercer

```exercice Exercices
? Quelle notion de la 3e phase permet à plusieurs utilisateurs d'utiliser le même ordinateur en même temps ?
reponse: temps partagé
= Le temps partagé, rendu possible par la multiprogrammation.

? Quelle version de Windows a introduit le menu Démarrer et la corbeille ?
reponse: Windows 95
= Windows 95 (1995).

? Pourquoi l'accès direct au noyau est-il restreint ?
= Pour la sécurité : une erreur ou un programme malveillant pourrait bloquer tout le système.
```

## Flashcards

```cartes
Rôle du SE :: Faire le lien entre matériel, utilisateur et applications
Noyau (kernel) :: Partie principale du SE : processus, mémoire, fichiers, E/S, réseau
GUI :: Interface graphique (icônes, menus)
Traitement par lots :: 2e phase (1956-1965), cartes perforées
Temps partagé :: 3e phase : plusieurs utilisateurs simultanés via terminaux
MS-DOS :: 1981, ligne de commande, mono-tâche, mono-utilisateur
Windows 95 :: Barre des tâches, menu Démarrer, corbeille
Windows Vista :: 2007, échec commercial
```

## QCM du chapitre

```qcm
? Quelle est la partie principale du système d'exploitation ?
- L'interface graphique
+ Le noyau
- Le terminal
= Le noyau gère processus, mémoire, fichiers, E/S et réseau.

? À quoi servent les API ?
- À afficher des icônes
+ À aider les développeurs à créer des programmes compatibles
- À refroidir le processeur
= Interfaces de programmation d'application.

? Pendant la préhistoire des SE (1949-1955)…
+ il n'y avait pas de SE
- on utilisait Windows
- on utilisait le temps partagé
= Le constructeur était programmeur et opérateur.

? Les cartes perforées et le traitement par lots caractérisent…
- la préhistoire
+ la 2e phase (1956-1965)
- la 4e phase
= Avec l'arrivée des transistors.

? Qui a fondé Microsoft en 1975 ?
- Steve Jobs et Steve Wozniak
+ Bill Gates et Paul Allen
- Tim Berners-Lee
= Bill Gates et Paul Allen.

? MS-DOS est…
+ mono-tâche et en ligne de commande
- multitâche avec interface graphique
- un navigateur web
= Mode réel, mono-tâche, mono-utilisateur.

? Quel jeu accompagnait Windows 1 pour apprendre la souris ?
- Solitaire
+ Reversi
- Démineur
= Reversi (le Solitaire arrive avec Windows 3).

? Quelle version a été un échec commercial ?
- Windows 7
+ Windows Vista
- Windows XP
= Problèmes de performance et de compatibilité.

? Quelle version permet d'installer des applications Android ?
- Windows 10
+ Windows 11
- Windows 95
= Windows 11 (2021).

? Windows 10 a introduit…
- la corbeille
+ Cortana et Microsoft Edge
- le Solitaire
= Avec une approche « en tant que service ».
```

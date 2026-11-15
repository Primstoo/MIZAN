---
id: tableau-de-bord
titre: Le tableau de bord de WordPress, menu par menu
seance: Partie 1 · WordPress · Dashboard
importance: 5
---

## Avant de commencer

Tu dois avoir un WordPress installé (chapitre 6) et savoir que le contenu et la forme sont séparés (chapitre 1).

```exercice Vérifie ton prérequis
? Dans WordPress, qu'est-ce qui change l'apparence du site, et qu'est-ce qui lui ajoute des fonctions ?
= Les **thèmes** changent l'apparence. Les **extensions** (plugins) ajoutent des fonctions. Ces deux mots correspondent à deux menus du tableau de bord.
```

## Comment aborder ce chapitre

> [!astuce] **Classe les menus en trois familles.** Ce que j'écris (Articles, Médias, Pages, Commentaires). Ce que je règle sur le site (Apparence, Extensions). Ce que j'administre (Comptes, Outils, Réglages). Dix menus, trois tiroirs.

> [!piege] **Article et page ne sont pas la même chose**, et **catégorie et étiquette non plus**. Ce sont les deux confusions classiques de l'examen.

À la fin, tu sais dire dans quel menu se fait n'importe quelle action, et citer les sous-menus importants.

## Idée 1 · Dix menus, trois familles

```grille Les menus du tableau de bord
#cols: Contenu | Site | Administration
*Articles | !Apparence | Comptes
*Médias | !Extensions | Outils
*Pages | ~ | Réglages
*Commentaires | ~ | ~
```

Tout en haut, le menu **Tableau de bord** lui-même contient deux entrées : **Accueil** et **Mises à jour**.

| Dans Accueil | Rôle |
|---|---|
| **Vue d'ensemble** | Statistiques globales du site : nombre d'articles, de pages, de commentaires |
| **Activité** | Derniers articles, commentaires et autres activités récentes |
| **Brouillon rapide** | Créer rapidement un brouillon d'article |
| **État de santé du site** | Informe sur les performances et les aspects techniques à améliorer |

**Mises à jour** : vérifie les mises à jour disponibles pour WordPress, les thèmes et les plugins.

## Idée 2 · La famille « contenu »

**Articles (Posts)**

| Sous-menu | Rôle |
|---|---|
| Tous les articles | Liste les articles : les éditer, les supprimer, changer leur statut |
| Ajouter | Créer un article avec l'éditeur **Gutenberg** |
| **Catégories** | Classer les articles en **groupes** |
| **Étiquettes** | **Mots-clés** qui décrivent les articles en détail |

```html
<svg viewBox="0 0 360 110" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Une catégorie range l'article dans un groupe, les étiquettes sont des mots-clés accrochés à l'article">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="8" y="14" width="150" height="86" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="83" y="30" font-weight="700">Catégorie : Sport</text>
<rect x="28" y="42" width="110" height="44" rx="6" fill="none" stroke="#D9824F" stroke-width="3"/><text x="83" y="62" fill="#D9824F" font-weight="700">Article</text><text x="83" y="77" font-size="10">Finale de la CAN</text>
<rect x="200" y="18" width="70" height="22" rx="11" fill="none" stroke="currentColor" stroke-width="2"/><text x="235" y="33">football</text>
<rect x="278" y="48" width="70" height="22" rx="11" fill="none" stroke="currentColor" stroke-width="2"/><text x="313" y="63">Maroc</text>
<rect x="200" y="78" width="70" height="22" rx="11" fill="none" stroke="currentColor" stroke-width="2"/><text x="235" y="93">CAN</text>
</g>
<path d="M138 56L200 30M138 64L278 60M138 72L200 88" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
</svg>
```

> [!retenir] **Catégorie = le groupe** où l'on range l'article (un rayon de bibliothèque). **Étiquette = un mot-clé** qui le décrit en détail (un post-it collé dessus).

**Médias (Media)**

- **Médiathèque** : affiche tous les fichiers multimédias téléchargés ; on peut les trier, les modifier, les supprimer.
- **Ajouter** : téléverser de nouveaux fichiers.

**Pages**

- **Toutes les pages** : liste, édition, suppression, changement de statut.
- **Ajouter** : créer une nouvelle page.

**Commentaires**

- Liste tous les commentaires du site : on peut les **approuver**, y **répondre**, les **modifier**, les **supprimer**.

> [!attention] Le cours liste les menus Articles et Pages sans expliquer leur différence. En pratique (précision de ToumaiLearn) : un **article** est un contenu daté, classé par catégories et étiquettes (actualités, blog). Une **page** est un contenu fixe, sans catégorie (« À propos », « Contact »).

## Idée 3 · La famille « site » : Apparence et Extensions

| Menu | Sous-menu | Rôle |
|---|---|---|
| **Apparence** | Thèmes | Gérer les thèmes installés : en ajouter, en activer, en supprimer |
| | Éditeur de fichier de thème | Modifier directement les fichiers du thème (**à utiliser avec précaution**) |
| **Extensions** | Extensions installées | Lister les plugins : les activer, les désactiver, les supprimer |
| | Ajouter | Ajouter de nouveaux plugins |

> [!piege] Les éditeurs de fichiers (thème et extension) modifient le code **directement sur le site**. Une erreur de PHP peut rendre le site inaccessible. D'où le « à utiliser avec précaution » du cours.

## Idée 4 · La famille « administration » : Comptes, Outils, Réglages

**Comptes**

- **Tous les comptes** : liste des utilisateurs enregistrés, à éditer ou supprimer.
- **Ajouter** : créer un nouvel utilisateur.
- **Votre profil** : modifier son propre profil (nom, mot de passe, biographie).

**Outils**

- **Outils disponibles** : des outils pour importer et exporter du contenu.
- **Importer** : importer du contenu depuis d'autres plateformes (Blogger, Tumblr).
- **Exporter** : exporter le contenu du site (articles, pages).
- **Éditeur de fichier d'extension** : modifier directement les fichiers des plugins (avec précaution).

**Réglages**, les six sous-menus :

| Sous-menu | Ce qu'on y règle |
|---|---|
| **Général** | Titre, description, adresse e-mail, fuseau horaire |
| **Écriture** | Rédaction des articles : catégorie par défaut, format par défaut |
| **Lecture** | Affichage du site : page d'accueil, nombre d'articles par page |
| **Commentaires** | Modération, notifications, avatars |
| **Médias** | Tailles des images téléversées |
| **Permaliens** | Structure des **URL** du site |

```etapes « Où est-ce que je clique ? » : la méthode
Je veux changer le titre du site :: C'est une information de base : **Réglages, Général**.
Je veux que la page d'accueil soit une page fixe :: C'est de l'affichage : **Réglages, Lecture**.
Je veux des adresses du type monsite.com/mon-article :: C'est la structure des URL : **Réglages, Permaliens**.
Je veux récupérer les articles d'un ancien blog Blogger :: **Outils, Importer**.
Je veux donner un accès à un collègue :: **Comptes, Ajouter**.
Je veux un nouveau look :: **Apparence, Thèmes**.
Je veux un formulaire de contact :: C'est une nouvelle fonction : **Extensions, Ajouter**.
```

## S'exercer

```exercice Où se trouve...
? Dans quel menu approuve-t-on ou supprime-t-on les réactions des visiteurs ?
= Dans **Commentaires**.

? Quelle est la différence entre une catégorie et une étiquette ?
= Les **catégories** classent les articles en groupes. Les **étiquettes** sont des mots-clés qui décrivent les articles en détail.

? Cite les six sous-menus de Réglages.
indice: G, É, L, C, M, P.
= Général, Écriture, Lecture, Commentaires, Médias, Permaliens.

? Tu veux changer le nombre d'articles affichés par page. Où vas-tu ?
= **Réglages, Lecture**.

? Que contient la zone « État de santé du site » de l'accueil ?
= Des informations sur les performances du site et les aspects techniques à améliorer.
```

## Flashcards

```cartes
Les 4 zones de l'accueil du tableau de bord :: Vue d'ensemble, Activité, Brouillon rapide, État de santé du site.
Les 4 sous-menus d'Articles :: Tous les articles, Ajouter, Catégories, Étiquettes.
Catégorie vs étiquette :: Catégorie : classe les articles en groupes. Étiquette : mot-clé qui décrit l'article en détail.
Avec quel éditeur crée-t-on un article ? :: L'éditeur Gutenberg.
Menu Médias : les 2 sous-menus :: Médiathèque (voir, trier, modifier, supprimer) et Ajouter.
Que peut-on faire d'un commentaire ? :: L'approuver, y répondre, le modifier, le supprimer.
Menu Apparence :: Thèmes (ajouter, activer, supprimer) et Éditeur de fichier de thème (avec précaution).
Menu Extensions :: Extensions installées (activer, désactiver, supprimer) et Ajouter.
Menu Comptes :: Tous les comptes, Ajouter, Votre profil.
Menu Outils :: Outils disponibles, Importer, Exporter, Éditeur de fichier d'extension.
Les 6 sous-menus de Réglages :: Général, Écriture, Lecture, Commentaires, Médias, Permaliens.
À quoi servent les permaliens ? :: À définir la structure des URL du site.
Réglages, Lecture :: Page d'accueil et nombre d'articles par page.
Réglages, Général :: Titre, description, adresse e-mail, fuseau horaire.
```

## QCM du chapitre

```qcm
? Quel menu permet de classer les articles en groupes ?
- Étiquettes
+ Catégories
- Permaliens
= Les étiquettes, elles, sont des mots-clés qui décrivent les articles en détail.

? Les étiquettes (tags) sont :
+ des mots-clés qui décrivent les articles en détail
- des groupes d'utilisateurs
- des tailles d'images
= Catégorie = groupe ; étiquette = mot-clé.

? Où règle-t-on la structure des URL du site ?
- Réglages, Général
- Réglages, Lecture
+ Réglages, Permaliens
= Permalien = lien permanent, donc l'adresse de chaque contenu.

? Où change-t-on le titre et le fuseau horaire du site ?
+ Réglages, Général
- Réglages, Écriture
- Apparence, Thèmes
= Général regroupe les paramètres de base : titre, description, e-mail, fuseau horaire.

? Où définit-on la page d'accueil et le nombre d'articles par page ?
- Réglages, Médias
+ Réglages, Lecture
- Pages, Toutes les pages
= « Lecture » concerne l'affichage du site.

? Dans quel menu active-t-on ou désactive-t-on un plugin ?
- Apparence
- Outils
+ Extensions
= Extensions installées : activer, désactiver, supprimer.

? Quel menu sert à importer du contenu depuis Blogger ou Tumblr ?
+ Outils
- Médias
- Comptes
= Outils, Importer. L'export se fait au même endroit.

? Laquelle de ces zones ne fait PAS partie de l'accueil du tableau de bord ?
- Brouillon rapide
- État de santé du site
+ Éditeur de fichier de thème
= L'éditeur de fichier de thème est dans le menu Apparence.

? Pourquoi les éditeurs de fichiers de thème et d'extension sont-ils « à utiliser avec précaution » ?
- Ils sont payants
+ Ils modifient directement les fichiers du site
- Ils suppriment les commentaires
= Une erreur dans le code peut casser le site.

? Où modifie-t-on son propre mot de passe ?
- Réglages, Général
+ Comptes, Votre profil
- Outils, Outils disponibles
= Votre profil : nom, mot de passe, biographie.

? Que règle-t-on dans Réglages, Médias ?
- Les droits des utilisateurs
+ Les tailles des images téléversées
- La modération des commentaires
= La modération des commentaires se règle dans Réglages, Commentaires.
```

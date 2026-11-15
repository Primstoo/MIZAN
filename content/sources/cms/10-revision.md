---
id: revision-cms
titre: Révision express et examen blanc
seance: Avant l'examen
importance: 3
---

## Avant de commencer

Ce chapitre ne t'apprend rien de nouveau : il rassemble tout. Fais-le quand tu as terminé les neuf chapitres précédents.

```exercice Vérifie ton prérequis
? Sans regarder : cite les cinq avantages d'un CMS.
= Séparation contenu/conception, autorisations d'accès, gratuit ou peu coûteux, facile pour le référencement, simple et intuitif. Si tu en as oublié plus d'un, repasse par le chapitre 1 avant l'examen blanc.
```

## Comment aborder ce chapitre

> [!astuce] **Récite avant de relire.** Pour chaque tableau ci-dessous, cache la colonne de droite et dis la réponse à voix haute. Ce que tu ne retrouves pas, tu le sais maintenant : c'est ça qu'il faut revoir.

> [!piege] Relire dix fois le cours donne l'impression de savoir. Ce module est fait de listes et de comparaisons : seule la **récitation** te dit si tu les tiens.

À la fin, tu sais où tu en es, question par question.

## Idée 1 · Le cours sur une seule page

| Thème | L'essentiel |
|---|---|
| **CMS** | Logiciel pour créer, gérer et modifier le contenu d'un site sans connaissances techniques spécialisées |
| **5 avantages** | Séparation contenu/conception, autorisations, gratuit ou peu coûteux, référencement, simplicité |
| **Propriétaire** | Code fermé, licence payante, support du vendeur, personnalisation limitée (Shopify, Wix, Squarespace) |
| **Libre** | Code ouvert, gratuit, communauté, plugins (WordPress, PrestaShop, Joomla, Drupal) |
| **5 critères de choix** | Prix, facilité, fond du CMS, assistance, développement de fonctionnalités |
| **WordPress** | Gratuit, open source, PHP + MySQL, plus de 43 % de parts de marché |
| **Dates WordPress** | 2003 lancement, 2014 numéro 1 mondial, 2018 Gutenberg |
| **.org / .com** | .org : logiciel à auto-héberger, contrôle total. .com : service hébergé d'Automattic, clé en main |
| **Prérequis** | Nom de domaine, serveur (partagé, dédié, cloud, local), hébergeur |
| **XAMPP** | Cross-platform, Apache, MariaDB, PHP, Perl |
| **Installation** | 9 étapes ; base dans phpMyAdmin, fichiers dans htdocs, lien dans wp-config.php |
| **Tableau de bord** | Articles, Médias, Pages, Commentaires, Apparence, Extensions, Comptes, Outils, Réglages |
| **SSL** | Certificat, URL en https + .htaccess, éléments mixtes, test |
| **WooCommerce** | Extension e-commerce gratuite, septembre 2011, Automattic en mai 2015 |

## Idée 2 · Les paires à ne jamais confondre

| Ne confonds pas… | …avec |
|---|---|
| **CMS** (le logiciel) | le **site** (le résultat) |
| **WordPress.org** (logiciel à installer) | **WordPress.com** (service hébergé) |
| **Catégorie** (groupe d'articles) | **Étiquette** (mot-clé) |
| **Thème** (apparence) | **Extension** (fonction) |
| **WooCommerce** (extension) | **PrestaShop** (CMS) |
| **BuiltWith, Wappalyzer** (détecter WordPress) | **SSL Labs** (tester le SSL) |

```flux Le réflexe face à deux mots qui se ressemblent
Je lis le mot -> Je me demande : logiciel, service ou contenu ? -> Je réponds
```

## Idée 3 · Les chiffres et les noms qui tombent

| Question | Réponse |
|---|---|
| Lancement de WordPress | 2003 (v0.7) |
| WordPress numéro 1 mondial | 2014 (v4.0) |
| Éditeur Gutenberg | 2018 (v5.0) |
| Part de marché de WordPress | plus de 43 % |
| Joomla / Drupal | 3 % / 4 % |
| Lancement de WooCommerce | septembre 2011 |
| Rachat par Automattic | mai 2015 |
| Créateurs de WooCommerce | Mike Jolley et James Koster |
| Certificat gratuit | Let's Encrypt |
| Port de HTTPS | 443 |

> [!attention] Aucune annale ni barème d'examen de CMS n'a été fourni : le format réel de l'épreuve du Pr Falih n'est pas connu. L'examen blanc ci-dessous est construit par ToumaiLearn à partir du cours. Le module comporte aussi une partie pratique (réaliser un site) que cette page ne peut pas remplacer.

```etapes Ton plan des trois derniers jours
J-3 :: Refais les QCM des chapitres 1 à 5. Note chaque question ratée.
J-2 :: Refais les QCM des chapitres 6 à 9. Installe (ou réinstalle) WordPress avec XAMPP une fois, chrono en main.
J-1 :: Passe les flashcards, puis fais l'examen blanc ci-dessous sans rien regarder.
Le jour J :: Relis seulement les trois tableaux de cette page.
```

## S'exercer

```exercice Questions de cours, comme à l'écrit
? Définis un CMS et donne deux exemples de chaque famille.
= Un CMS est un logiciel qui aide à créer, gérer et modifier le contenu d'un site web sans connaissances techniques spécialisées. Libres : WordPress, PrestaShop (ou Joomla, Drupal). Propriétaires : Shopify, Wix (ou Squarespace, Sitecore).

? Compare WordPress.org et WordPress.com sur trois critères.
= **Hébergement** : à trouver et payer soi-même (.org) contre inclus (.com). **Contrôle** : total (.org) contre limité (.com). **Maintenance et sécurité** : à la charge de l'utilisateur (.org) contre gérées par WordPress.com (.com).

? Décris les étapes pour installer WordPress en local.
= Installer XAMPP, démarrer Apache et MySQL, créer une base dans phpMyAdmin, télécharger WordPress, copier le dossier dans htdocs, configurer wp-config.php (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST), ouvrir http://localhost/dossier, remplir les informations du site, se connecter.

? Comment sécurise-t-on un site WordPress avec SSL ?
= On achète et on installe un certificat SSL, on configure WordPress (URL en https dans Réglages, Général, et redirection dans .htaccess), on vérifie les éléments mixtes (plugin Really Simple SSL), puis on teste la configuration (SSL Labs).
```

## Flashcards

```cartes
Les 3 dates clés de WordPress :: 2003 (lancement), 2014 (numéro 1 mondial), 2018 (Gutenberg).
Les 2 dates clés de WooCommerce :: Septembre 2011 (lancement), mai 2015 (rachat par Automattic).
Thème vs extension :: Le thème change l'apparence ; l'extension ajoute une fonction.
Les 9 menus de contenu et d'administration du tableau de bord :: Articles, Médias, Pages, Commentaires, Apparence, Extensions, Comptes, Outils, Réglages.
```

## QCM du chapitre

```qcm
? Lequel de ces avantages n'est PAS dans la liste des cinq avantages d'un CMS ?
- Possibilité de définir des autorisations d'accès
- Facile à utiliser pour le référencement
+ Garantie de ne jamais être piraté
= Les cinq : séparation, autorisations, gratuit ou peu coûteux, référencement, simplicité.

? Lequel de ces couples associe deux CMS libres ?
- Wix et Joomla
+ Drupal et PrestaShop
- Shopify et WordPress
= Wix et Shopify sont propriétaires.

? Le support d'un CMS libre est assuré le plus souvent par :
- le vendeur, avec un contrat obligatoire
+ la communauté, ou des entreprises spécialisées payantes
- personne
= C'est la ligne « Support et maintenance » du tableau comparatif.

? Quel critère de choix d'un CMS mentionne Google Analytics et le live chat ?
- Le prix
+ La vérification du fond du CMS (fonctions spécifiques)
- L'assistance
= Ce sont des exemples de fonctions spécifiques à pouvoir installer.

? WordPress repose sur :
+ PHP et MySQL
- Java et Oracle
- Python et SQLite
= C'est sa carte d'identité technique.

? Quelle version de WordPress a introduit Gutenberg ?
- v3.0 (2010)
- v4.0 (2014)
+ v5.0 (2018)
= v4.0 correspond à l'« explosion » de 2014.

? Sur quelle formule l'utilisateur est-il responsable de la sécurité et des mises à jour ?
+ WordPress.org
- WordPress.com
- Les deux
= Sur .com, c'est le service qui les gère.

? « Puissance et contrôle, mais plus cher » décrit :
- le serveur partagé
+ le serveur dédié
- le serveur local
= Le partagé est pas cher mais partagé ; le cloud offre évolutivité et flexibilité.

? Dans XAMPP, le second P désigne :
- PHP
+ Perl
- phpMyAdmin
= Le premier P est PHP, le second est Perl.

? Dans `wp-config.php`, quelle constante contient le nom de la base de données ?
- DB_HOST
- DB_USER
+ DB_NAME
= DB_HOST est l'hôte (localhost), DB_USER l'utilisateur (root).

? Où ajoute-t-on une extension dans WordPress ?
- Apparence, Thèmes
+ Extensions, Ajouter
- Réglages, Écriture
= Apparence concerne les thèmes.

? Que règle le sous-menu Réglages, Commentaires ?
+ La modération, les notifications et les avatars
- Les tailles des images
- La structure des URL
= Les tailles d'images sont dans Médias, les URL dans Permaliens.

? Quel plugin facilite le passage d'un site en HTTPS ?
- WooCommerce
+ Really Simple SSL
- Gutenberg
= Il aide à éviter les avertissements de contenu mixte.

? Quelle caractéristique de WooCommerce envoie des notifications par e-mail ?
- Rapports et analyses
- Expédition
+ Gestion des commandes
= Notifications pour les nouvelles commandes et les changements de statut.

? Laquelle de ces méthodes ne sert PAS à reconnaître un site WordPress ?
- Chercher « wp-content » dans le code
- Utiliser Wappalyzer
+ Tester le site sur SSL Labs
= SSL Labs teste la configuration SSL, pas la technologie du site.
```

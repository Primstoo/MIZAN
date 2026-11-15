---
id: installation-xampp
titre: Installer WordPress en local avec XAMPP
seance: Partie 1 · WordPress · Installation
importance: 5
---

## Avant de commencer

Tu dois connaître les trois prérequis de WordPress (nom de domaine, serveur, hébergeur) et savoir qu'un **serveur local** sert aux tests et à la formation (chapitre 5).

```exercice Vérifie ton prérequis
? WordPress a besoin de deux « moteurs » sur le serveur pour fonctionner. Lesquels ?
indice: Un langage et une base de données.
= **PHP** (le langage dans lequel WordPress est écrit) et **MySQL** (la base de données). XAMPP installe les deux d'un coup, avec le serveur web Apache.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « trois briques à relier ».** Un serveur (XAMPP), une base de données vide, les fichiers de WordPress. L'installation consiste à poser les trois, puis à dire à WordPress où se trouve la base. Tout le reste est du clic.

> [!piege] L'erreur numéro un en TP : ouvrir `http://localhost/wordpress` **sans avoir démarré Apache et MySQL** dans le panneau XAMPP. Rien ne s'affiche, et on croit que l'installation est cassée.

À la fin, tu sais dérouler les 9 étapes dans l'ordre et expliquer les quatre lignes de `wp-config.php`.

## Idée 1 · XAMPP, cinq lettres à connaître

XAMPP est un **ensemble de logiciels libres** qui permet de mettre en place facilement un **serveur web local**. C'est une solution multiplateforme, flexible et riche en fonctionnalités.

```grille XAMPP, lettre par lettre
#cols: X | A | M | P | P
*Cross-platform | Apache | !MariaDB | PHP | Perl
```

| Lettre | Signifie | Rôle |
|---|---|---|
| **X** | Cross-platform | Fonctionne sur Windows, Linux et macOS |
| **A** | Apache | Le serveur web |
| **M** | MariaDB | Le SGBD (auparavant, c'était MySQL) |
| **P** | PHP | Le langage de script côté serveur |
| **P** | Perl | Un autre langage de script |

> [!piege] Le **X** ne désigne pas un logiciel : il veut dire « cross-platform ». Et le **M** est aujourd'hui **MariaDB**, même si le bouton du panneau XAMPP s'appelle encore « MySQL ».

## Idée 2 · Les 9 étapes, regroupées en trois blocs

```flux Les trois blocs de l'installation
Préparer le serveur (étapes 1 à 3) -> Poser WordPress (étapes 4 à 6) -> Lancer l'installateur (étapes 7 à 9)
```

```etapes Les 9 étapes du cours
1. Télécharger et installer XAMPP :: Sur le site **Apache Friends**, télécharge la version qui correspond à ton système d'exploitation, puis installe-la.
2. Démarrer Apache et MySQL :: Ouvre le **panneau de contrôle XAMPP** et clique sur **Start** à côté des modules Apache et MySQL.
3. Créer une base de données :: Dans le navigateur, va sur `http://localhost/phpmyadmin`. Clique sur **Bases de données**, puis crée une base (par exemple `wordpress_votrenom`).
4. Télécharger WordPress :: Sur **WordPress.org**, télécharge la dernière version et décompresse le fichier.
5. Déplacer les fichiers vers XAMPP :: Copie le dossier décompressé dans le répertoire **htdocs** (`C:\xampp\htdocs` sur Windows, `/Applications/XAMPP/htdocs` sur Mac). Renomme-le comme tu veux (par exemple `wordpress`).
6. Configurer wp-config.php :: Renomme `wp-config-sample.php` en `wp-config.php`, ouvre-le et renseigne les informations de ta base de données.
7. Lancer l'installation :: Va sur `http://localhost/nom_du_dossier` (par exemple `http://localhost/wordpress`). Choisis la langue et clique sur **Continuer**.
8. Configurer les informations du site :: Remplis le titre du site, le nom d'utilisateur, le mot de passe et l'adresse e-mail. Clique sur **Installer WordPress**.
9. Finaliser :: Un message de succès s'affiche. Clique sur **Se connecter** et entre le nom d'utilisateur et le mot de passe que tu viens de créer.
```

> [!retenir] Trois adresses à connaître : `http://localhost/phpmyadmin` (gérer les bases), `C:\xampp\htdocs` (le dossier des sites), `http://localhost/wordpress` (ton site).

## Idée 3 · wp-config.php relie WordPress à sa base

```html
<svg viewBox="0 0 360 100" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Le fichier wp-config.php fait le lien entre les fichiers WordPress et la base de données">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="8" y="26" width="104" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="60" y="47">Fichiers WordPress</text><text x="60" y="63" font-size="10">dans htdocs</text>
<rect x="128" y="20" width="104" height="60" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="44" fill="#D9824F" font-weight="700">wp-config.php</text><text x="180" y="60" font-size="10">nom, utilisateur,</text><text x="180" y="72" font-size="10">mot de passe, hôte</text>
<rect x="248" y="26" width="104" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="47">Base de données</text><text x="300" y="63" font-size="10">dans phpMyAdmin</text>
</g>
<path d="M112 50h16M232 50h16" stroke="currentColor" stroke-width="2"/>
</svg>
```

Les quatre lignes à modifier, telles que le cours les montre :

```php
define('DB_NAME', 'nom_de_votre_base_de_données'); // Nom de la base de données créée
define('DB_USER', 'root');       // Utilisateur de la base, par défaut 'root'
define('DB_PASSWORD', '');       // Mot de passe, par défaut vide
define('DB_HOST', 'localhost');  // Hôte de la base, généralement 'localhost'
```

| Constante | Valeur en local avec XAMPP |
|---|---|
| `DB_NAME` | Le nom de la base créée à l'étape 3 (ex. `wordpress_votrenom`) |
| `DB_USER` | `root` |
| `DB_PASSWORD` | vide |
| `DB_HOST` | `localhost` |

> [!piege] `DB_NAME` doit être **exactement** le nom de la base créée dans phpMyAdmin. Une lettre de différence, et WordPress affiche « Erreur lors de la connexion à la base de données ».

> [!attention] `root` sans mot de passe est acceptable **seulement en local**. Sur un vrai hébergement, l'hébergeur te fournit un utilisateur et un mot de passe : c'est une précision de ToumaiLearn, le cours ne traite que du cas local.

Une fois l'installation finie, le site est prêt : tu peux le personnaliser, ajouter des thèmes et des plugins, et créer du contenu.

## S'exercer

```exercice Questions types
? Que signifient les cinq lettres de XAMPP ?
= X : cross-platform (Windows, Linux, macOS). A : Apache (serveur web). M : MariaDB (SGBD, auparavant MySQL). P : PHP (langage de script côté serveur). P : Perl (autre langage de script).

? Remets ces actions dans l'ordre : configurer wp-config.php, créer la base de données, démarrer Apache et MySQL, copier WordPress dans htdocs.
= 1) Démarrer Apache et MySQL. 2) Créer la base de données (phpMyAdmin). 3) Copier WordPress dans htdocs. 4) Configurer wp-config.php.

? Tu as créé une base `wordpress_patrick`. Écris les valeurs de DB_NAME, DB_USER, DB_PASSWORD et DB_HOST pour une installation XAMPP.
= DB_NAME : `wordpress_patrick`. DB_USER : `root`. DB_PASSWORD : vide. DB_HOST : `localhost`.

? Ton dossier dans htdocs s'appelle `monblog`. Quelle adresse ouvres-tu pour lancer l'installation ?
= `http://localhost/monblog`
```

## Flashcards

```cartes
Qu'est-ce que XAMPP ? :: Un ensemble de logiciels libres qui permet de mettre en place facilement un serveur web local, multiplateforme.
XAMPP : que signifie le X ? :: Cross-platform : fonctionne sur Windows, Linux et macOS.
XAMPP : A, M, P, P :: Apache (serveur web), MariaDB (SGBD, avant MySQL), PHP (script serveur), Perl (autre langage de script).
Où télécharge-t-on XAMPP ? :: Sur le site Apache Friends.
Quels modules démarrer dans le panneau XAMPP ? :: Apache et MySQL (bouton Start).
Adresse pour créer la base de données :: http://localhost/phpmyadmin, onglet « Bases de données ».
Dans quel dossier copier WordPress ? :: Dans htdocs (C:\xampp\htdocs sur Windows).
Quel fichier renommer en wp-config.php ? :: wp-config-sample.php
Les 4 constantes de wp-config.php :: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST.
Valeurs par défaut en local :: DB_USER = root, DB_PASSWORD = vide, DB_HOST = localhost.
Informations demandées à l'étape 8 :: Titre du site, nom d'utilisateur, mot de passe, adresse e-mail.
```

## QCM du chapitre

```qcm
? Dans XAMPP, que signifie la lettre X ?
- XML
+ Cross-platform
- Xdebug
= XAMPP fonctionne sur Windows, Linux et macOS.

? Dans XAMPP, la lettre A désigne :
+ Apache, le serveur web
- Automattic
- Administration
= Apache sert les pages au navigateur.

? Aujourd'hui, la lettre M de XAMPP désigne :
- MongoDB
- Mamp
+ MariaDB
= Auparavant, c'était MySQL.

? Quels modules faut-il démarrer dans le panneau de contrôle XAMPP ?
- PHP et Perl
+ Apache et MySQL
- FileZilla et Tomcat
= Sans eux, `http://localhost` ne répond pas.

? À quelle adresse crée-t-on la base de données ?
- http://localhost/wordpress
+ http://localhost/phpmyadmin
- http://wordpress.org/database
= Puis on clique sur « Bases de données ».

? Dans quel répertoire de XAMPP colle-t-on le dossier WordPress ?
- php
- mysql
+ htdocs
= `C:\xampp\htdocs` sur Windows.

? Quel fichier faut-il renommer en `wp-config.php` ?
+ wp-config-sample.php
- wp-settings.php
- index.php
= On l'ouvre ensuite pour y mettre les informations de la base.

? En local avec XAMPP, quelle est la valeur par défaut de DB_USER ?
- admin
+ root
- wordpress
= Et le mot de passe par défaut est vide.

? En local, quelle est la valeur habituelle de DB_HOST ?
- 127.0.0.2
- xampp
+ localhost
= La base de données tourne sur la même machine que le site.

? Laquelle de ces informations n'est PAS demandée lors de la configuration du site (étape 8) ?
- Le titre du site
- L'adresse e-mail
+ Le nom de la base de données
= Le nom de la base est donné avant, dans wp-config.php. L'étape 8 demande titre, nom d'utilisateur, mot de passe et e-mail.
```

---
id: wordpress-presentation
titre: WordPress · pourquoi lui, ce qu'il est, son histoire
seance: Partie 1 · WordPress
importance: 5
---

## Avant de commencer

Tu dois savoir ce qu'est un CMS libre et pourquoi le prof en choisit un pour la formation (chapitres 2 et 3).

```exercice Vérifie ton prérequis
? WordPress est-il un CMS propriétaire ou libre ? Cite un autre CMS de la même famille.
= **Libre** (open source). De la même famille : PrestaShop, Joomla, Drupal, Magento.
```

## Comment aborder ce chapitre

> [!astuce] **Retiens trois mots : PHP, MySQL, extensions.** WordPress est écrit en PHP, range ses données dans MySQL, et se complète avec des extensions et des thèmes. Le reste du chapitre habille ces trois mots.

> [!piege] Ne dis pas « WordPress sert à faire des blogs ». C'était vrai **à ses débuts**. Aujourd'hui, c'est un CMS capable de gérer n'importe quel type de site, y compris une boutique en ligne.

À la fin, tu sais justifier le choix de WordPress en six arguments, le présenter techniquement et dérouler son historique.

## Idée 1 · Six raisons de choisir WordPress

```html
<svg viewBox="0 0 360 150" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Six raisons de choisir WordPress autour du logo : communauté, facilité, extensions, thèmes, part de marché, emploi">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<circle cx="180" cy="75" r="30" fill="none" stroke="#D9824F" stroke-width="3"/><text x="180" y="79" fill="#D9824F" font-weight="700">WordPress</text>
<rect x="6" y="8" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="25">Communauté</text>
<rect x="130" y="4" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="21">Facilité</text>
<rect x="254" y="8" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="304" y="25">Extensions</text>
<rect x="6" y="116" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="133">Thèmes</text>
<rect x="130" y="120" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="137">Part de marché</text>
<rect x="254" y="116" width="100" height="26" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><text x="304" y="133">Emploi</text>
</g>
</svg>
```

| Raison | Ce que dit le cours |
|---|---|
| **Communauté** | Le nombre d'utilisateurs croît sans cesse. En cas de problème, une aide est toujours accessible, et le **coût de maintenance** du site est moins élevé. |
| **Facilité** | Pas besoin de maîtriser HTML/CSS ou PHP, contrairement à d'autres CMS plus complexes. Simple pour les utilisateurs et pour les développeurs de thèmes et d'extensions. |
| **Système d'extensions** | On ajoute des fonctions au site en installant des extensions (plugins). |
| **Système de thèmes** | On change l'apparence du site en changeant de thème. |
| **Part de marché** | Plus de **43 %** des parts de marché, loin devant **Joomla (3 %)** et **Drupal (4 %)**. Le reste : des solutions sur mesure. |
| **Emploi** | Les profils WordPress sont très recherchés par les entreprises et les startups, pour des sites vitrines comme pour des boutiques en ligne. |

> [!attention] Les diapos donnent deux chiffres : WordPress « utilisé sur environ **30 %** des sites Internet » (diapo Communauté) et « plus de **43 %** des parts de marché » (diapo Part de marché). Ce n'est pas forcément une contradiction : les deux chiffres ne datent pas de la même année, et le second est le plus récent. En examen, cite le chiffre de la question posée ; par défaut, **43 %**.

## Idée 2 · La carte d'identité de WordPress

```flux Comment WordPress fabrique une page
Visiteur demande une page -> PHP (le code de WordPress) -> MySQL (les contenus) -> Page HTML envoyée au visiteur
```

Les cinq phrases de présentation du cours :

- WordPress est une plateforme de création de sites web **gratuite et open source**.
- C'est un CMS **écrit en PHP** qui utilise une base de données **MySQL**.
- C'est le créateur de blogs et de sites web **le plus simple et le plus puissant** qui existe aujourd'hui.
- C'est une excellente plateforme pour une **variété de sites web**.
- C'est un CMS **polyvalent**, conçu pour l'**accessibilité** et la **flexibilité**, bon pour les sites simples comme pour les sites complexes.

Deux précisions à connaître :

- WordPress était **orienté blog à ses débuts**, puis il est devenu un CMS puissant, capable de gérer n'importe quel type de site.
- WordPress est un **« début de site Internet »** : il faut le compléter avec des **extensions**, des **thèmes** et des **développements personnalisés**.

> [!retenir] WordPress = **PHP + MySQL**, gratuit, open source. Livré comme un « début de site », à compléter par extensions, thèmes et développements.

## Idée 3 · L'historique en six dates

```html
<svg viewBox="0 0 360 96" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Frise : 2003 lancement, 2008, 2010, 2012, 2014 numéro un mondial, 2018 Gutenberg">
<line x1="14" y1="48" x2="346" y2="48" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<circle cx="30" cy="48" r="5" fill="#D9824F"/><text x="30" y="34" font-weight="700">2003</text><text x="30" y="70" font-size="9">v0.7</text>
<circle cx="90" cy="48" r="5" fill="currentColor"/><text x="90" y="34">2008</text><text x="90" y="70" font-size="9">v2.5</text>
<circle cx="150" cy="48" r="5" fill="currentColor"/><text x="150" y="34">2010</text><text x="150" y="70" font-size="9">v3.0</text>
<circle cx="210" cy="48" r="5" fill="currentColor"/><text x="210" y="34">2012</text><text x="210" y="70" font-size="9">v3.x</text>
<circle cx="270" cy="48" r="5" fill="#D9824F"/><text x="270" y="34" font-weight="700">2014</text><text x="270" y="70" font-size="9">v4.0</text>
<circle cx="330" cy="48" r="5" fill="#D9824F"/><text x="330" y="34" font-weight="700">2018</text><text x="330" y="70" font-size="9">v5.0</text>
</g>
</svg>
```

| Année | Version | Événement |
|---|---|---|
| **2003** | v0.7 | **Lancement** de WordPress |
| 2008 | v2.5 | Presque **5 millions** de téléchargements depuis sa sortie |
| 2010 | v3.0 | **10 millions** de téléchargements depuis 2003 |
| 2012 | v3.x | **50 millions** de téléchargements depuis 2003 |
| **2014** | v4.0 | « Explosion » : WordPress devient **numéro 1 mondial** des plateformes de gestion de contenu |
| **2018** | v5.0 | Nouvel éditeur par blocs, le **Block Editor (Gutenberg)**, pour une construction de site plus intuitive |

```etapes Mémoriser la frise
Les trois dates clés :: **2003** naissance, **2014** numéro 1 mondial, **2018** Gutenberg. Ce sont celles qui tombent.
Les téléchargements :: 5 millions (2008), 10 millions (2010), 50 millions (2012). Ça double, puis ça fait fois cinq.
Les versions :: Le premier chiffre suit presque les événements : 0.7, 2.5, 3.0, 3.x, 4.0, 5.0.
Le mot à ne pas oublier :: **Gutenberg** = l'éditeur par blocs arrivé avec la version 5.0.
```

## S'exercer

```exercice Questions types
? Donne quatre raisons de choisir WordPress.
= Au choix parmi : sa communauté (aide accessible, maintenance moins chère), sa facilité (pas besoin de maîtriser HTML/CSS/PHP), son système d'extensions, son système de thèmes, sa part de marché (plus de 43 %), l'emploi (profils très recherchés).

? Avec quel langage WordPress est-il écrit, et quelle base de données utilise-t-il ?
= Il est écrit en **PHP** et utilise une base de données **MySQL**.

? Que signifie « WordPress est un début de site Internet » ?
= WordPress seul ne suffit pas : il faut le compléter via des extensions, des thèmes et des développements personnalisés.

? Qu'apporte la version 5.0 de 2018 ?
= Le nouvel éditeur par blocs, **Block Editor (Gutenberg)**, pour une expérience de construction de site plus intuitive.
```

## Flashcards

```cartes
Langage et base de données de WordPress :: Écrit en PHP, base de données MySQL.
Année de lancement de WordPress :: 2003 (version 0.7).
Que se passe-t-il en 2014 (v4.0) ? :: « Explosion » de WordPress, qui devient numéro 1 mondial des plateformes de gestion de contenu.
Que se passe-t-il en 2018 (v5.0) ? :: Arrivée de l'éditeur par blocs : Block Editor (Gutenberg).
Part de marché de WordPress selon le cours :: Plus de 43 %, devant Joomla (3 %) et Drupal (4 %).
À quoi WordPress était-il destiné à ses débuts ? :: Au blog. Il est devenu ensuite un CMS capable de gérer tout type de site.
« WordPress est un début de site Internet » :: Il faut le compléter par des extensions, des thèmes et des développements personnalisés.
Avantage de la grande communauté WordPress :: Une aide toujours accessible et un coût de maintenance moins élevé.
Téléchargements de WordPress : 2008, 2010, 2012 :: Presque 5 millions, 10 millions, 50 millions.
```

## QCM du chapitre

```qcm
? WordPress est écrit en :
- Java
+ PHP
- Python
= Et il utilise une base de données MySQL.

? Quelle base de données WordPress utilise-t-il ?
+ MySQL
- MongoDB
- Oracle
= WordPress = PHP + MySQL.

? En quelle année WordPress a-t-il été lancé ?
- 1999
+ 2003
- 2008
= Version 0.7, en 2003.

? Que s'est-il passé en 2014 avec la version 4.0 ?
- WordPress est devenu payant
+ WordPress est devenu numéro 1 mondial des plateformes de gestion de contenu
- WordPress a abandonné PHP
= Le cours parle d'« explosion » de WordPress.

? Quel est le nom de l'éditeur par blocs arrivé avec la version 5.0 ?
- Elementor
- Classic Editor
+ Gutenberg
= Block Editor (Gutenberg), en 2018.

? À ses débuts, WordPress était orienté principalement :
+ blog
- e-commerce
- réseaux sociaux
= Il a ensuite évolué en CMS capable de gérer n'importe quel type de site.

? Selon la diapo « Part de marché », WordPress occupe :
- environ 4 % des parts de marché
- environ 20 % des parts de marché
+ plus de 43 % des parts de marché
= Joomla et Drupal occupent respectivement 3 % et 4 %.

? Pourquoi la communauté est-elle un argument pour WordPress ?
- Elle rend WordPress payant
+ Une aide est toujours accessible et la maintenance coûte moins cher
- Elle interdit les extensions non officielles
= Plus il y a d'utilisateurs, plus il est facile de trouver une solution.

? Que veut dire « WordPress est un début de site Internet » ?
- Il ne permet de créer que la page d'accueil
+ Il faut le compléter avec des extensions, des thèmes et des développements personnalisés
- Il est encore en version d'essai
= WordPress fournit la base ; le reste s'ajoute.

? Combien de fois WordPress avait-il été téléchargé en 2012, depuis 2003 ?
- 5 millions
- 10 millions
+ 50 millions
= 5 millions en 2008, 10 millions en 2010, 50 millions en 2012.
```

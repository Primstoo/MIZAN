---
id: org-com-prerequis
titre: WordPress.org, WordPress.com et les prérequis
seance: Partie 1 · WordPress
importance: 5
---

## Avant de commencer

Tu dois savoir que WordPress est un logiciel **gratuit et open source**, écrit en PHP avec une base MySQL (chapitre 4).

```exercice Vérifie ton prérequis
? Un logiciel écrit en PHP avec une base MySQL peut-il fonctionner tout seul, sans serveur ?
= Non. PHP s'exécute **sur un serveur web**, et MySQL est un **serveur de base de données**. Il faut donc une machine qui fait tourner les deux : c'est tout l'objet de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « propriétaire ou locataire ».** WordPress.org, c'est être propriétaire de sa maison : tu fais ce que tu veux, mais tu répares toi-même. WordPress.com, c'est louer un appartement meublé : tout est géré, mais tu ne casses pas les murs.

> [!piege] Les deux noms se ressemblent, et beaucoup les confondent. **.org = le logiciel à télécharger. .com = un service commercial hébergé.** C'est le même logiciel WordPress derrière, mais pas la même formule.

À la fin, tu sais comparer .org et .com sur dix critères et lister les trois prérequis pour utiliser WordPress.

## Idée 1 · Même logiciel, deux formules

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="WordPress.org : tu héberges toi-même. WordPress.com : hébergé par Automattic">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="10" y="10" width="160" height="110" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="90" y="32" font-weight="700" fill="#D9824F">WordPress.org</text><text x="90" y="54">tu télécharges</text><text x="90" y="71">tu héberges toi-même</text><text x="90" y="88">contrôle total</text><text x="90" y="108" font-size="10">« propriétaire »</text>
<rect x="190" y="10" width="160" height="110" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="270" y="32" font-weight="700">WordPress.com</text><text x="270" y="54">tu crées un compte</text><text x="270" y="71">hébergé par Automattic</text><text x="270" y="88">clé en main</text><text x="270" y="108" font-size="10">« locataire »</text>
</g>
</svg>
```

**WordPress.org**

- **Description** : le site officiel du logiciel WordPress. On y télécharge gratuitement le logiciel open source pour l'installer sur son propre serveur.
- **Fonctionnement** : on télécharge WordPress et on l'installe sur l'hébergement de son choix. Contrôle total : personnaliser les thèmes, installer des plugins, modifier le code source.
- **Utilisation** : pour ceux qui veulent une liberté totale, sans limites.

**WordPress.com**

- **Description** : un service commercial géré par **Automattic**, la société fondée par l'un des co-créateurs de WordPress. Il offre une version **hébergée** de WordPress.
- **Fonctionnement** : on crée un compte et on construit son site directement sur leur plateforme. Ils s'occupent de l'hébergement, des mises à jour, de la sécurité et des sauvegardes. Il existe des plans gratuits et payants.
- **Utilisation** : solution **clé en main**, sans se soucier de l'hébergement ni de la technique.

> [!attention] La diapo WordPress.com écrit que « toute l'infrastructure est gérée **par soi même** ». C'est une coquille : la phrase suivante de la même diapo dit bien qu'« **ils** s'occupent de l'hébergement, des mises à jour, de la sécurité et des sauvegardes ». L'infrastructure est gérée **par WordPress.com (Automattic)**, pas par toi.

## Idée 2 · Le tableau comparatif en dix lignes

| Caractéristique | WordPress.org | WordPress.com |
|---|---|---|
| Type de plateforme | **Auto-hébergée** | **Hébergée** par WordPress |
| Hébergement | À trouver et à payer soi-même | Inclus dans le service |
| Coût | Gratuit à télécharger, mais hébergement et nom de domaine à payer | Plans gratuits et payants |
| Personnalisation | Accès complet aux fichiers, thèmes et plugins | Limitée selon le plan |
| Extensions | Accès à tous les plugins | Limitées en gratuit, plus d'options en payant |
| Thèmes | Tous les thèmes disponibles | Limités en gratuit, plus d'options en payant |
| Contrôle et flexibilité | **Contrôle total** | Contrôle limité : WordPress.com gère la technique |
| Monétisation | Libre | Restreinte, surtout en gratuit |
| Maintenance et sécurité | **Tu** es responsable des mises à jour et de la sécurité | **WordPress.com** les gère |
| Support | Communauté, forums, documentation | De base en gratuit, premium en payant |

```etapes Retrouver les dix lignes sans les apprendre par cœur
Pars de l'image :: .org = propriétaire de sa maison. .com = locataire d'un meublé.
Qui paie les murs ? :: Propriétaire : il trouve et paie son terrain (hébergement, nom de domaine). Locataire : c'est inclus dans le loyer (plan gratuit ou payant).
Qui décide de la déco ? :: Propriétaire : tout est permis (tous les thèmes, tous les plugins, le code). Locataire : selon le bail (limité selon le plan).
Qui répare ? :: Propriétaire : lui-même (mises à jour, sécurité). Locataire : le bailleur (WordPress.com).
Qui peut louer une chambre ? :: Propriétaire : libre de monétiser. Locataire : restreint, surtout en gratuit.
```

## Idée 3 · Avantages, inconvénients, et pour qui

| | WordPress.org | WordPress.com |
|---|---|---|
| **Avantages** | Contrôle complet. Tous les thèmes et plugins. Personnalisation entière. Monétisation possible (vente, publicité). | Facile, hébergement inclus. Mises à jour et sécurité gérées. Support technique selon le plan. |
| **Inconvénients** | Demande des connaissances techniques (hébergement, mises à jour, sécurité). Coûts : hébergement, nom de domaine, thèmes et plugins premium. | Personnalisation et extensions limitées, surtout en gratuit. Monétisation restreinte. Moins de contrôle sur le site et son contenu. |
| **Pour qui** | Ceux qui ont des compétences techniques, ou les moyens de gérer la technique | Ceux qui préfèrent une solution clé en main et acceptent de payer pour le confort |

> [!retenir] **.org = liberté et contrôle, mais technique à ta charge. .com = confort clé en main, mais limites.**

## Idée 4 · Les trois prérequis de WordPress

```flux Ce qu'il faut pour mettre un site WordPress en ligne
Nom de domaine (l'adresse) -> Serveur (la machine) -> Hébergeur (qui loue la machine)
```

| Prérequis | Définition | Exemple |
|---|---|---|
| **Nom de domaine** | L'adresse web que l'on saisit dans le navigateur. S'achète auprès d'un **registraire de domaine**. | monsite.com |
| **Serveur** | Ordinateur puissant, connecté en permanence à Internet, qui stocke et diffuse le site. | voir ci-dessous |
| **Hébergeur** | Entreprise qui loue de l'espace pour héberger des sites. | Bluehost, SiteGround, HostGator |

Les quatre types de serveur :

| Type | En un mot |
|---|---|
| **Partagé** | Pas cher, mais partagé avec d'autres sites |
| **Dédié** | Puissance et contrôle, mais plus cher |
| **Cloud** | Évolutivité et flexibilité |
| **Local** | Excellent pour les tests, la formation et le travail avant mise en ligne (MAMP, XAMPP) |

En TP, on travaille avec un **serveur local** : XAMPP. C'est le sujet du chapitre suivant.

## S'exercer

```exercice Questions types
? Quelle est la différence principale entre WordPress.org et WordPress.com ?
= WordPress.org fournit le logiciel à télécharger et à installer sur son propre hébergement (contrôle total). WordPress.com est un service commercial d'Automattic qui héberge le site et gère la technique (clé en main, mais limité).

? Sur WordPress.org, qui est responsable des mises à jour et de la sécurité ?
= **Toi.** Sur WordPress.com, c'est le service qui les gère.

? Cite les trois prérequis pour utiliser WordPress et donne une phrase pour chacun.
= Un **nom de domaine** (l'adresse web, achetée chez un registraire), un **serveur** (ordinateur connecté en permanence qui stocke et diffuse le site), un **hébergeur** (entreprise qui loue de l'espace pour héberger des sites).

? Quel type de serveur choisir pour un site à très fort trafic variable, et lequel pour apprendre ?
indice: Relis le tableau des quatre types.
= Trafic variable : **hébergement cloud** (évolutivité et flexibilité). Pour apprendre : **serveur local** (XAMPP, MAMP).
```

## Flashcards

```cartes
WordPress.org en une phrase :: Le site officiel où l'on télécharge gratuitement le logiciel WordPress pour l'installer sur son propre serveur.
WordPress.com en une phrase :: Un service commercial d'Automattic qui propose une version hébergée de WordPress, clé en main.
Qui gère WordPress.com ? :: Automattic, la société fondée par l'un des co-créateurs de WordPress.
Type de plateforme : .org / .com :: .org : auto-hébergée. .com : hébergée par WordPress.
Qui gère mises à jour et sécurité ? .org / .com :: .org : toi. .com : WordPress.com.
Monétisation : .org / .com :: .org : libre. .com : restreinte, surtout dans les plans gratuits.
Les 3 prérequis de WordPress :: Nom de domaine, serveur, hébergeur.
Les 4 types de serveur :: Partagé, dédié, cloud, local.
Où achète-t-on un nom de domaine ? :: Auprès d'un registraire de domaine.
Cite 3 hébergeurs du cours :: Bluehost, SiteGround, HostGator.
Serveur local : à quoi sert-il ? :: Aux tests, à la formation et au travail en local avant la mise en ligne (MAMP, XAMPP).
```

## QCM du chapitre

```qcm
? Que trouve-t-on sur WordPress.org ?
- Un service d'hébergement payant
+ Le logiciel WordPress à télécharger gratuitement
- Une boutique de noms de domaine
= On l'installe ensuite sur l'hébergement de son choix.

? Qui gère le service WordPress.com ?
- La fondation Apache
+ Automattic
- Google
= La société fondée par l'un des co-créateurs de WordPress.

? Sur WordPress.com, qui s'occupe de l'hébergement, des mises à jour et des sauvegardes ?
- L'utilisateur
+ WordPress.com
- Le registraire de domaine
= C'est le principe de la solution clé en main. La diapo contient une coquille sur ce point.

? Quel est le type de plateforme de WordPress.org ?
+ Auto-hébergée
- Hébergée par WordPress
- Hébergée par le navigateur
= Tu trouves et tu paies ton propre hébergement.

? Sur quel point WordPress.com est-il plus limité que WordPress.org ?
- La facilité d'utilisation
+ La personnalisation, les extensions et la monétisation
- La gestion des mises à jour
= Surtout dans les plans gratuits.

? À qui le cours conseille-t-il WordPress.org ?
- À ceux qui ne veulent rien gérer
+ À ceux qui ont des compétences techniques ou les ressources pour gérer la technique
- Uniquement aux grandes entreprises
= Plus de liberté et de contrôle, en échange de la gestion technique.

? Qu'est-ce qu'un nom de domaine ?
- Un ordinateur connecté en permanence à Internet
+ L'adresse web que l'on saisit dans le navigateur pour accéder au site
- Une entreprise qui loue de l'espace disque
= Exemple : monsite.com. Il s'achète auprès d'un registraire.

? Quel type de serveur le cours décrit-il comme « pas cher mais partagé » ?
+ Le serveur partagé
- Le serveur dédié
- L'hébergement cloud
= Le dédié apporte puissance et contrôle, mais coûte plus cher.

? Quel type de serveur convient pour les tests et la formation ?
- Le serveur dédié
- L'hébergement cloud
+ Le serveur local
= Exemples : MAMP, XAMPP.

? Bluehost, SiteGround et HostGator sont des :
- CMS propriétaires
+ hébergeurs
- registraires de thèmes
= Des entreprises qui louent de l'espace pour héberger des sites web.
```

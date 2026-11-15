---
id: woocommerce
titre: WooCommerce, et reconnaître un site WordPress
seance: Partie 1 · WordPress · E-commerce
importance: 4
---

## Avant de commencer

Tu dois savoir ce qu'est une **extension** (plugin) : un module qu'on ajoute à WordPress pour lui donner une nouvelle fonction (chapitres 4 et 7).

```exercice Vérifie ton prérequis
? Dans quel menu du tableau de bord installe-t-on une nouvelle extension ?
= Dans **Extensions, Ajouter**. WooCommerce s'installe exactement là.
```

## Comment aborder ce chapitre

> [!astuce] **Suis le trajet d'une commande.** Un produit est mis en ligne, le client paie, le colis est expédié, la commande est suivie, le vendeur lit ses chiffres. Les caractéristiques de WooCommerce suivent ce trajet, dans cet ordre.

> [!piege] WooCommerce **n'est pas un CMS**. C'est une **extension de WordPress**. Sans WordPress, pas de WooCommerce. (Le CMS e-commerce à part entière du module, c'est PrestaShop, en partie 2.)

À la fin, tu sais présenter WooCommerce, dérouler ses six caractéristiques, et dire si un site est fait avec WordPress.

## Idée 1 · Une extension qui transforme le site en boutique

```flux Ce que fait WooCommerce
Site WordPress -> + extension WooCommerce -> Boutique en ligne complète
```

**Présentation.** WooCommerce est une extension **gratuite** pour WordPress, conçue pour transformer un site WordPress en **boutique en ligne entièrement fonctionnelle**. C'est l'un des outils e-commerce les plus populaires, grâce à sa **flexibilité**, son **extensibilité** et sa **facilité d'utilisation**.

```html
<svg viewBox="0 0 360 90" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Frise : septembre 2011 lancement de WooCommerce, mai 2015 rachat par Automattic">
<line x1="20" y1="46" x2="340" y2="46" stroke="currentColor" stroke-width="2"/>
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<circle cx="90" cy="46" r="6" fill="#D9824F"/><text x="90" y="30" font-weight="700">Septembre 2011</text><text x="90" y="70" font-size="10">Lancement (WooThemes)</text>
<circle cx="270" cy="46" r="6" fill="#D9824F"/><text x="270" y="30" font-weight="700">Mai 2015</text><text x="270" y="70" font-size="10">Rachat par Automattic</text>
</g>
</svg>
```

| Fait | À retenir |
|---|---|
| **Créateurs** | **Mike Jolley** et **James Koster**, deux développeurs de **WooThemes** |
| **Lancement** | **Septembre 2011** |
| **Popularité** | Très vite l'un des plugins e-commerce les plus populaires de WordPress |
| **Acquisition** | En **mai 2015**, **Automattic** (la société derrière WordPress.com) rachète WooThemes, et donc WooCommerce |
| **Effet du rachat** | WooCommerce est intégré plus étroitement à l'écosystème WordPress, et son développement continu est assuré |

## Idée 2 · Les six caractéristiques, dans l'ordre d'une vente

```flux Le trajet d'une commande
Produits -> Paiements -> Expédition -> Commandes -> Personnalisation -> Rapports
```

| N° | Caractéristique | Détail du cours |
|---|---|---|
| 1 | **Gestion des produits** | **Ajout** de produits (descriptions, images, catégories, étiquettes). **Variations** (taille, couleur). **Inventaire** suivi depuis le tableau de bord. |
| 2 | **Paiements** | Méthodes intégrées : **PayPal, Stripe**, virement bancaire, chèque, **paiement à la livraison**. D'autres via des extensions de paiement. |
| 3 | **Expédition** | Options et tarifs de livraison **selon les zones géographiques**. **Calcul automatique** des frais de port (poids, taille, destination). |
| 4 | **Gestion des commandes** | **Suivi** de l'état de la commande, de la commande initiale à la livraison. **Notifications par e-mail** (nouvelle commande, changement de statut). |
| 5 | **Personnalisation et thèmes** | De nombreux **thèmes compatibles**. Apparence et fonctions réglables via le **customizer** de WordPress. |
| 6 | **Rapports et analyses** | **Rapports de vente** (ventes, produits, clients). **Statistiques en temps réel**. |

```etapes Dérouler les 6 caractéristiques sur un exemple : vendre de l'huile d'argan
1. Produits :: J'ajoute « Huile d'argan » avec photo et description. Variations : 50 ml, 100 ml. Je suis mon stock.
2. Paiements :: J'active le paiement à la livraison et la carte bancaire.
3. Expédition :: 20 DH pour Béni Mellal, 35 DH pour le reste du Maroc. Les frais se calculent tout seuls.
4. Commandes :: Je vois chaque commande passer de « en cours » à « livrée ». Le client reçoit un e-mail à chaque étape.
5. Personnalisation :: Je choisis un thème compatible et je règle les couleurs dans le customizer.
6. Rapports :: En fin de mois, je lis mes ventes par produit et par client.
```

> [!attention] L'exemple de l'huile d'argan et ses tarifs sont inventés par ToumaiLearn pour illustrer. Les six caractéristiques et leur contenu viennent du cours.

## Idée 3 · Extensions et avantages de WooCommerce

WooCommerce a sa propre bibliothèque d'extensions. Les quatre familles citées :

| Extension | Sert à |
|---|---|
| **Abonnements** | Gérer les abonnements et les paiements récurrents |
| **Réservations** | Permettre aux clients de réserver des produits ou des services |
| **Membres** | Créer des zones réservées aux membres |
| **SEO** | Améliorer le référencement de la boutique |

Les quatre avantages :

1. **Gratuit et open source** : grande flexibilité pour personnaliser la boutique.
2. **Facilité d'utilisation** : interface conviviale, intégration transparente avec WordPress.
3. **Communauté active** : beaucoup de développeurs et de support.
4. **Extensibilité** : on ajoute des fonctions via des extensions et des plugins.

> [!retenir] Les avantages de WooCommerce sont ceux de WordPress : **gratuit, facile, communauté, extensible**. Si tu connais les uns, tu connais les autres.

## Idée 4 · Trois méthodes pour reconnaître un site WordPress

```html
<svg viewBox="0 0 360 96" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Trois méthodes : chercher wp-content dans le code, BuiltWith, Wappalyzer">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="6" y="14" width="108" height="68" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/><text x="60" y="36" font-weight="700" fill="#D9824F">1. Le code</text><text x="60" y="54" font-size="10">Ctrl+Maj+I, Ctrl+F</text><text x="60" y="68" font-size="10">« wp-content »</text>
<rect x="126" y="14" width="108" height="68" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="180" y="36" font-weight="700">2. BuiltWith</text><text x="180" y="54" font-size="10">site web</text><text x="180" y="68" font-size="10">builtwith.com</text>
<rect x="246" y="14" width="108" height="68" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="300" y="36" font-weight="700">3. Wappalyzer</text><text x="300" y="54" font-size="10">extension</text><text x="300" y="68" font-size="10">du navigateur</text>
</g>
</svg>
```

| Méthode | Comment |
|---|---|
| **1. Le code** | Ouvrir le code de la page (**Ctrl+Maj+I**), puis **Ctrl+F**, et chercher **« wp-content »** |
| **2. BuiltWith** | Aller sur `https://builtwith.com/fr/` : la plateforme indique si le site est fait avec WordPress |
| **3. Wappalyzer** | Une extension à installer dans le navigateur |

> [!astuce] Pourquoi « wp-content » ? C'est le dossier où WordPress range les thèmes, les extensions et les images. Presque toutes les pages d'un site WordPress y font référence. (Explication ajoutée par ToumaiLearn.)

## S'exercer

```exercice Questions types
? Présente WooCommerce en deux phrases.
= WooCommerce est une extension (plugin) gratuite pour WordPress, conçue pour transformer un site WordPress en boutique en ligne entièrement fonctionnelle. C'est l'un des outils e-commerce les plus populaires grâce à sa flexibilité, son extensibilité et sa facilité d'utilisation.

? Qui a créé WooCommerce, quand, et qui l'a racheté ?
= Créé par Mike Jolley et James Koster (WooThemes), lancé en septembre 2011. Racheté en mai 2015 par Automattic, la société derrière WordPress.com.

? Cite les six caractéristiques de WooCommerce.
indice: Suis le trajet d'une commande.
= Gestion des produits, paiements, expédition, gestion des commandes, personnalisation et thèmes, rapports et analyses.

? Donne trois méthodes pour vérifier si un site est fait avec WordPress.
= 1) Ouvrir le code (Ctrl+Maj+I), Ctrl+F, chercher « wp-content ». 2) Utiliser BuiltWith. 3) Utiliser l'extension de navigateur Wappalyzer.
```

## Flashcards

```cartes
WooCommerce en une phrase :: Extension gratuite de WordPress qui transforme un site en boutique en ligne entièrement fonctionnelle.
Créateurs de WooCommerce :: Mike Jolley et James Koster, développeurs chez WooThemes.
Date de lancement de WooCommerce :: Septembre 2011.
Qui a racheté WooCommerce, et quand ? :: Automattic, en mai 2015 (rachat de WooThemes).
Les 6 caractéristiques de WooCommerce :: Produits, paiements, expédition, commandes, personnalisation et thèmes, rapports et analyses.
Méthodes de paiement citées :: PayPal, Stripe, virement bancaire, chèque, paiement en espèces à la livraison.
De quoi dépend le calcul des frais de port ? :: Du poids, de la taille et de la destination.
Les 4 familles d'extensions WooCommerce :: Abonnements, réservations, membres, SEO.
Les 4 avantages de WooCommerce :: Gratuit et open source, facilité d'utilisation, communauté active, extensibilité.
Quel texte chercher dans le code pour reconnaître WordPress ? :: « wp-content »
Deux outils pour savoir si un site est fait avec WordPress :: BuiltWith (site web) et Wappalyzer (extension de navigateur).
```

## QCM du chapitre

```qcm
? WooCommerce est :
- un CMS concurrent de WordPress
+ une extension gratuite de WordPress
- un hébergeur spécialisé e-commerce
= Il transforme un site WordPress en boutique en ligne.

? Quand WooCommerce a-t-il été lancé ?
- En 2003
+ En septembre 2011
- En mai 2015
= 2003 est le lancement de WordPress ; mai 2015 est le rachat par Automattic.

? Qui a racheté WooThemes, et donc WooCommerce, en mai 2015 ?
+ Automattic
- Shopify
- PrestaShop
= Automattic est la société derrière WordPress.com.

? Pour quelle société travaillaient les créateurs de WooCommerce ?
- Automattic
+ WooThemes
- Apache Friends
= Mike Jolley et James Koster, développeurs chez WooThemes.

? « Taille, couleur » : de quelle fonction de WooCommerce s'agit-il ?
- L'inventaire
+ Les variations de produits
- Les zones de livraison
= Les variations permettent de décliner un même produit.

? Laquelle de ces méthodes de paiement n'est PAS citée dans le cours ?
- PayPal
- Paiement en espèces à la livraison
+ Cryptomonnaie
= Sont cités : PayPal, Stripe, virements bancaires, chèques, espèces à la livraison.

? Le calcul automatique des frais de port se fait en fonction :
+ du poids, de la taille et de la destination
- de l'âge du client
- du nombre de visiteurs du site
= C'est la partie « Expédition ».

? Quelle extension WooCommerce sert aux paiements récurrents ?
- Réservations
- Membres
+ Abonnements
= Abonnements : gérer les abonnements et les paiements récurrents.

? Que cherche-t-on dans le code d'une page pour savoir si le site est fait avec WordPress ?
- « woo-shop »
+ « wp-content »
- « php-admin »
= Ctrl+Maj+I pour ouvrir le code, puis Ctrl+F.

? Wappalyzer est :
- un thème WordPress
- un hébergeur
+ une extension de navigateur qui détecte les technologies d'un site
= BuiltWith fait la même chose depuis un site web.
```

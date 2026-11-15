---
id: proprietaire-libre
titre: CMS propriétaire ou CMS libre
seance: Introduction · Quel CMS choisir ?
importance: 5
---

## Avant de commencer

Tu dois savoir ce qu'est le **code source** d'un logiciel : le texte écrit par les développeurs, que l'on peut lire et modifier si on y a accès.

```exercice Vérifie ton prérequis
? Tu utilises un logiciel dont tu ne peux ni lire ni modifier le code. Peux-tu corriger toi-même un défaut de ce logiciel ?
= Non. Sans accès au code source, tu dépends de l'entreprise qui le développe. C'est exactement la différence entre un CMS propriétaire et un CMS libre.
```

## Comment aborder ce chapitre

> [!astuce] **Pose toujours la même question : qui a la main sur le code ?** Si c'est une entreprise, c'est propriétaire. Si c'est tout le monde, c'est libre. Licence, coût, support, personnalisation : toutes les lignes du tableau se déduisent de cette réponse.

> [!piege] « Libre » ne veut pas dire « zéro dépense ». Le logiciel est gratuit, mais l'hébergement, le développement sur mesure et le support technique peuvent coûter.

À la fin, tu sais remplir le tableau comparatif du prof de mémoire et classer un CMS dans la bonne famille.

## Idée 1 · Deux familles, une seule différence de départ

```html
<svg viewBox="0 0 360 130" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Deux familles de CMS : propriétaire avec code fermé, libre avec code ouvert">
<g font-family="sans-serif" font-size="12" text-anchor="middle" fill="currentColor">
<rect x="10" y="10" width="160" height="110" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="90" y="32" font-weight="700">Propriétaire</text><text x="90" y="54">code fermé</text><text x="90" y="72">licence à acheter</text><text x="90" y="90">support du vendeur</text><text x="90" y="108" font-size="10">Shopify, Wix, Sitecore</text>
<rect x="190" y="10" width="160" height="110" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="270" y="32" font-weight="700" fill="#D9824F">Libre (open source)</text><text x="270" y="54">code ouvert</text><text x="270" y="72">utilisation libre</text><text x="270" y="90">communauté active</text><text x="270" y="108" font-size="10">WordPress, PrestaShop</text>
</g>
</svg>
```

**CMS propriétaire.** Son code source est la propriété d'une entreprise ou d'un individu et **n'est pas disponible publiquement**. L'utilisation, la modification et la distribution sont restreintes par des licences. Il faut souvent acheter une licence ou un abonnement.

**CMS libre (open source).** Son code source est **disponible publiquement**. Les utilisateurs ont le droit de l'étudier, de le modifier et de le distribuer, selon la licence open source. Ses trois caractéristiques :

- **accès au code source** : on modifie et on adapte à ses besoins ;
- **licences open source** : liberté d'utilisation, de modification, de distribution ;
- **communauté active** : elle développe et assure le support.

> [!attention] Une diapo écrit « C'est un **SMS** dont le code source… ». C'est une faute de frappe : il faut lire **CMS**.

## Idée 2 · Le tableau comparatif, ligne par ligne

| Critère | Propriétaire (payant) | Libre (open source) |
|---|---|---|
| **Licence et coûts** | Généralement payant. Licence obligatoire. Frais en plus pour mises à jour, support, personnalisations. | Généralement gratuit. Licence qui autorise utilisation, modification, distribution. Coûts possibles : hébergement, développement sur mesure, support par des tiers. |
| **Propriété du code** | Code non accessible. Il appartient à l'entreprise. Pas de permission de le modifier. | Code ouvert à tous. On peut le modifier. Une communauté de développeurs le fait évoluer. |
| **Support et maintenance** | Support technique dédié. Mises à jour et correctifs fournis par le vendeur : fiabilité et sécurité. | Support souvent par la communauté, ou par des entreprises spécialisées payantes. Mises à jour par la communauté ou les développeurs principaux. |
| **Personnalisation** | Généralement limitée, avec parfois des frais. | Flexibilité et agilité, sans restriction. Vaste gamme de plugins et d'extensions. |

```etapes Reconstruire le tableau à partir d'une seule question
Qui possède le code ? :: Propriétaire : une entreprise. Libre : tout le monde y a accès.
Donc, qui paie quoi ? :: Propriétaire : on paie la licence, puis les extras. Libre : logiciel gratuit, on paie seulement ce qui tourne autour (hébergement, sur-mesure).
Donc, qui répare ? :: Propriétaire : le vendeur, avec un support dédié. Libre : la communauté, ou un prestataire payant.
Donc, peut-on adapter ? :: Propriétaire : peu, et parfois avec des frais. Libre : oui, librement, avec beaucoup de plugins.
```

## Idée 3 · Savoir classer les exemples

| Propriétaires | Libres |
|---|---|
| Adobe Experience Manager | **WordPress** |
| Sitecore | **PrestaShop** |
| Shopify | Joomla |
| HubSpot CMS | Drupal |
| Squarespace | Magento |
| Wix | TYPO3 |
| Kentico | Concrete5 |

Qui choisit quoi, d'après le cours :

- les **propriétaires** sont souvent choisis par des entreprises qui veulent des solutions robustes et intégrées, avec support technique et fonctionnalités avancées ;
- les **libres** sont largement utilisés dans le monde entier pour tous types de projets, grâce à leur flexibilité, leur communauté et leurs extensions.

> [!attention] La diapo écrit « Kentic » : le vrai nom du CMS est **Kentico**.

> [!astuce] Pour retenir les propriétaires : ce sont ceux que tu vois en **publicité** (Wix, Shopify, Squarespace). Une entreprise paie la pub parce qu'elle vend le produit.

## Idée 4 · Avantages et inconvénients de chaque camp

| | Propriétaire | Libre |
|---|---|---|
| **Avantage** | **Contrôle total du code** par le créateur. Si tu ne veux pas que le code soit altéré ou piraté, c'est l'alternative à choisir. | La modification du code et sa qualité sont **transparentes** : prévisibilité et sécurité pour les utilisateurs. La communauté peut toujours évaluer et améliorer le code. |
| **Inconvénient** | On **ne peut pas connaître la qualité** d'un code fermé. Plus fermé au développement, il dépend uniquement de son propriétaire. | **Manque de contrôle** du code d'origine. Des copies peuvent être faites, séparées du référentiel d'origine. |

> [!retenir] Le même fait a deux faces. Code fermé : contrôle total, mais qualité invisible. Code ouvert : transparence, mais moins de contrôle sur ce que les autres en font.

Pour la formation, le prof tranche : on **opte pour un CMS libre**, et le plus intéressant est **WordPress**.

## S'exercer

```exercice Classer et justifier
? Classe ces CMS en deux familles : Drupal, Wix, Shopify, Joomla, Magento, Squarespace.
= **Libres** : Drupal, Joomla, Magento. **Propriétaires** : Wix, Shopify, Squarespace.

? Une PME dit : « Nous prenons un CMS libre, donc notre site ne coûtera rien. » Corrige cette phrase.
indice: Que reste-t-il à payer quand le logiciel est gratuit ?
= Le logiciel est gratuit, mais il peut y avoir des coûts d'hébergement, de développement personnalisé et de support technique (fourni par des tiers).

? Donne un avantage et un inconvénient du CMS propriétaire.
= Avantage : contrôle total du code source par le créateur (code protégé contre l'altération). Inconvénient : on ne peut pas connaître la qualité d'un code fermé, et le CMS dépend uniquement de son propriétaire.
```

## Flashcards

```cartes
CMS propriétaire : définition :: CMS dont le code source appartient à une entreprise ou un individu et n'est pas disponible publiquement. Licence ou abonnement souvent nécessaire.
CMS libre : définition :: CMS dont le code source est disponible publiquement : on peut l'étudier, le modifier et le distribuer selon sa licence open source.
3 caractéristiques d'un CMS libre :: Accès au code source, licences open source, communauté active.
Cite 4 CMS propriétaires :: Shopify, Wix, Squarespace, Sitecore (aussi : Adobe Experience Manager, HubSpot CMS, Kentico).
Cite 4 CMS libres :: WordPress, PrestaShop, Joomla, Drupal (aussi : Magento, TYPO3, Concrete5).
Coûts possibles d'un CMS libre :: Hébergement, développement personnalisé, support technique fourni par des tiers.
Qui assure le support d'un CMS propriétaire ? :: Le vendeur, avec un support technique dédié, des mises à jour et des correctifs.
Avantage principal du CMS propriétaire :: Contrôle total du code source par le créateur.
Inconvénient du CMS libre :: Manque de contrôle du code d'origine : des copies séparées du référentiel d'origine peuvent être faites.
```

## QCM du chapitre

```qcm
? Qu'est-ce qui définit un CMS propriétaire ?
- Il est toujours plus rapide qu'un CMS libre
+ Son code source appartient à une entreprise et n'est pas disponible publiquement
- Il ne fonctionne que sur Windows
= La propriété du code est le point de départ de toutes les autres différences.

? Lequel de ces CMS est libre (open source) ?
- Shopify
- Wix
+ Drupal
= Shopify et Wix sont propriétaires. Drupal, comme WordPress et Joomla, est libre.

? Lequel de ces CMS est propriétaire ?
- PrestaShop
+ Squarespace
- Magento
= PrestaShop et Magento sont classés libres dans le cours.

? Un CMS libre peut quand même entraîner des coûts. Lesquels, selon le cours ?
- L'achat obligatoire d'une licence
+ L'hébergement, le développement personnalisé et le support technique
- Une taxe sur chaque visiteur
= Le logiciel est gratuit ; ce qui gravite autour ne l'est pas forcément.

? Qui fournit les mises à jour d'un CMS propriétaire ?
+ Le vendeur
- La communauté des utilisateurs
- L'hébergeur du site
= Le vendeur fournit mises à jour et correctifs, ce qui garantit une certaine fiabilité.

? Sur la personnalisation, le cours dit que le CMS propriétaire est :
- sans aucune limite
+ généralement limité, avec parfois des frais supplémentaires
- impossible à personnaliser
= « Généralement limitée » : pas impossible, mais encadrée et parfois payante.

? Laquelle de ces caractéristiques n'appartient PAS au CMS libre ?
- Accès au code source
- Communauté active
+ Licence d'utilisation à acheter obligatoirement
= L'achat d'une licence est la marque du CMS propriétaire.

? Quel est l'inconvénient d'un code source fermé, d'après le cours ?
- Il est forcément piraté
+ On ne peut pas connaître la qualité du code
- Il empêche le référencement
= Personne d'extérieur ne peut l'évaluer : il faut faire confiance au propriétaire.

? Quel avantage le cours attribue-t-il au CMS libre ?
- Un support technique dédié fourni par le vendeur
+ La transparence des modifications et de la qualité du code
- Un contrôle total du code par un seul créateur
= La communauté peut toujours évaluer et améliorer le code source.

? Pour la formation, quel choix fait le prof ?
- Un CMS propriétaire, pour le support
+ Un CMS libre, et plus précisément WordPress
- Aucun CMS : tout est codé à la main
= « Opter pour un CMS libre », et « le CMS libre le plus intéressant : WordPress ».
```

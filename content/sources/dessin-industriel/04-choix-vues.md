---
id: choix-vues
titre: Choisir les vues · lesquelles et combien
seance: Chapitre 2 · partie 4 (choix des vues)
importance: 4
---

## Avant de commencer

Tu dois savoir reconnaître une arête cachée.

```exercice Vérifie ton prérequis
? Par quel trait représente-t-on une arête cachée ? Et une arête vue ?
= Arête cachée : **trait interrompu fin**. Arête vue : **trait continu fort**.
Si tu as hésité, relis l'idée 3 du chapitre précédent : ici, on choisit les vues justement pour limiter les arêtes cachées.
```

## Comment aborder ce chapitre

> [!astuce] **Chaque vue doit payer sa place.** Avant de dessiner une vue, demande-toi : qu'est-ce qu'elle montre que les autres ne montrent pas ? Si la réponse est « rien », elle ne sert à rien.

> [!piege] Dessiner trois vues par réflexe, ou six « pour être sûr ». Plus de vues ne veut pas dire un meilleur dessin : une vue redondante prend du temps, de la place, et ajoute des occasions de se tromper.

À la fin, tu sais choisir la vue de face, décider du nombre de vues et éliminer celles qui sont inutiles.

## Idée 1 · L'objectif : le minimum de vues

L'objectif du cours tient en une phrase : **définir complètement l'objet avec le minimum de vues**.

Les deux mots comptent :

- **complètement** : toutes les formes doivent être définies, sans ambiguïté ;
- **minimum** : pas une vue de plus que nécessaire.

## Idée 2 · La vue de face d'abord

```html
<svg viewBox="0 0 340 160" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="La face choisie comme vue de face est celle qui montre le profil en L. Vue de côté, la pièce n'est qu'un rectangle avec une arête cachée.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<polygon points="20.0,96.0 79.8,130.5 79.8,107.5 39.9,84.5 39.9,50.0 20.0,38.5" fill="#D9824F" stroke="currentColor" stroke-width="2.2" fill-opacity="0.28"/><polygon points="79.8,130.5 119.6,107.5 119.6,84.5 79.8,107.5" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="39.9,84.5 79.8,61.5 79.8,27.0 39.9,50.0" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="20.0,38.5 39.9,50.0 79.8,27.0 59.8,15.5" fill="none" stroke="currentColor" stroke-width="2.2" /><polygon points="39.9,84.5 79.8,107.5 119.6,84.5 79.8,61.5" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="19.9" y1="135.8" x2="43.9" y2="109.8" stroke="#D9824F" stroke-width="2"/><polygon points="43.9,109.8 41.8,116.4 37.4,112.3" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="4" y="151.8" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700">vue de face</text><polygon points="196,65.0 250.0,65.0 250.0,47.0 214.0,47.0 214.0,20 196,20" fill="none" stroke="#D9824F" stroke-width="2.6" /><text x="223" y="82" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700" font-size="10">on voit le L : à garder</text><polygon points="196,98 232.0,98 232.0,143.0 196,143.0" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="196" y1="125.0" x2="232.0" y2="125.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><text x="262" y="118" text-anchor="start" stroke="none" font-size="10">un rectangle :</text><text x="262" y="130" text-anchor="start" stroke="none" font-size="10">forme peu lisible</text>
</g>
</svg>
```

On choisit comme vue de face la vue **la plus représentative** : celle qui montre le mieux la forme de l'objet.

**Exemple.** Pour la pièce en L, la face choisie est celle où l'on voit le L. Vue de côté, la même pièce n'est qu'un rectangle : on ne devine pas sa forme.

Ensuite, quatre critères guident le choix :

| Critère | En pratique |
|---|---|
| Vue de face la plus représentative | celle qui « ressemble » le plus à la pièce |
| Vues qui montrent le mieux les formes | on garde les vues les plus lisibles |
| Limiter les arêtes cachées | à information égale, la vue avec le moins de traits interrompus |
| Supprimer les vues inutiles ou redondantes | deux vues qui disent la même chose : on en garde une |

> [!retenir] Chaque vue doit apporter une **information complémentaire**. Sinon, on la supprime.

## Idée 3 · Combien de vues ?

```html
<svg viewBox="0 0 340 132" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une vue suffit pour une plaque d'épaisseur constante, deux vues pour une pièce simple, trois vues pour une pièce complexe.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<rect x="14" y="34" width="80" height="48" rx="10" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="38" cy="58" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="72" cy="58" r="8" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="54" y="98" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">ép. 3</text><text x="54" y="18" text-anchor="middle" stroke="none" font-weight="700">1 vue</text><text x="54" y="114" text-anchor="middle" stroke="none" font-size="10">plaque d'épaisseur</text><text x="54" y="126" text-anchor="middle" stroke="none" font-size="10">constante</text><polygon points="128,46 160,46 160,36 176,36 176,80 160,80 160,70 128,70" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="160" y1="46" x2="160" y2="70" stroke="currentColor" stroke-width="2.2"/><line x1="120" y1="58" x2="184" y2="58" stroke="currentColor" stroke-width="1" stroke-dasharray="10 3 2 3"/><circle cx="212" cy="58" r="22" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="212" cy="58" r="12" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="176" y="18" text-anchor="middle" stroke="none" font-weight="700">2 vues</text><text x="176" y="114" text-anchor="middle" stroke="none" font-size="10">pièce simple</text><polygon points="262,55.0 292.0,55.0 292.0,45.0 272.0,45.0 272.0,30 262,30" fill="none" stroke="currentColor" stroke-width="2" /><polygon points="300,30 320.0,30 320.0,55.0 300,55.0" fill="none" stroke="currentColor" stroke-width="2" /><line x1="300" y1="45.0" x2="320.0" y2="45.0" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/><polygon points="262,63 292.0,63 292.0,83.0 262,83.0" fill="none" stroke="currentColor" stroke-width="2" /><line x1="272.0" y1="63" x2="272.0" y2="83.0" stroke="currentColor" stroke-width="2.2"/><text x="292" y="18" text-anchor="middle" stroke="none" font-weight="700">3 vues</text><text x="292" y="114" text-anchor="middle" stroke="none" font-size="10">pièce complexe</text><line x1="108" y1="8" x2="108" y2="128" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/><line x1="246" y1="8" x2="246" y2="128" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
</g>
</svg>
```

| Nombre de vues | Pour quel objet ? |
|---|---|
| **3 vues** | un objet complexe |
| **2 vues** | un objet relativement simple |
| **1 vue** | un objet simple, symétrique ou d'épaisseur constante |

**Exemple.** Une plaque découpée dans une tôle de 3 mm : une seule vue suffit, à condition d'indiquer l'épaisseur à côté. La vue de dessus ne montrerait qu'un rectangle de 3 mm de haut.

> [!retenir] Le nombre de vues dépend de la **forme de l'objet** et des **informations nécessaires**. Il n'y a pas de nombre obligatoire.

## Idée 4 · Éliminer une vue, pas à pas

```etapes Faut-il garder cette vue ?
Dessine d'abord la vue de face :: C'est la vue la plus représentative. On la garde toujours.
Cherche la dimension manquante :: La vue de face ne montre pas la profondeur. Il faut au moins une vue qui la donne, sauf si une simple indication d'épaisseur suffit.
Compare les candidates :: Vue de dessus, vue de droite, vue de gauche : laquelle montre le mieux les formes ?
Préfère la vue sans arêtes cachées :: Pour la pièce en L, la vue de droite montre la marche en trait fort. La vue de gauche la montre en trait interrompu. On garde la vue de droite.
Supprime ce qui n'apporte rien :: Si une vue ne montre rien de nouveau, elle est redondante : on l'élimine.
```

**Exemple complet.** Pièce en L : vue de face (le L) et vue de droite (la profondeur, sans arête cachée). Deux vues la définissent complètement. La vue de gauche, la vue de dessous et la vue arrière sont redondantes.

> [!attention] Cet exemple sur la pièce en L est le nôtre. Les diapositives montrent d'autres pièces : une pièce dont on élimine les vues chargées d'arêtes cachées, des pièces où deux vues suffisent et des pièces où une seule vue suffit, dont une d'épaisseur 3 mm.

## Idée 5 · Quand les vues principales ne suffisent pas

Le cours cite des **vues complémentaires** : vue auxiliaire, coupe, section, vue partielle.

> [!attention] Ce chapitre ne détaille ni la vue auxiliaire, ni la coupe, ni la section : elles sont seulement nommées. La vue partielle est traitée au chapitre suivant, avec la demi-vue, la vue interrompue et le détail.

## S'exercer

```exercice Trois exercices types
? Une rondelle plate est découpée dans une tôle de 2 mm. Combien de vues faut-il pour la définir, et à quelle condition ?
indice: C'est un objet d'épaisseur constante.
reponse: 1
= Une seule vue : celle qui montre les deux cercles. Il suffit d'indiquer l'épaisseur (2 mm) à côté de la vue.

? Tu hésites entre la vue de droite et la vue de gauche d'une pièce. Elles donnent les mêmes dimensions, mais la vue de gauche contient quatre arêtes cachées et la vue de droite aucune. Laquelle gardes-tu ?
= La **vue de droite**. À information égale, on limite les arêtes cachées. L'autre vue est redondante : on la supprime.

? Cite les quatre critères de choix des vues.
= Choisir la vue de face la plus représentative ; retenir les vues qui montrent le mieux les formes ; limiter les arêtes cachées ; supprimer les vues inutiles ou redondantes.
```

## Flashcards

```cartes
Objectif du choix des vues :: Définir complètement l'objet avec le minimum de vues.
Comment choisir la vue de face ? :: On prend la vue la plus représentative de l'objet.
Les quatre critères de choix des vues :: Vue de face la plus représentative, vues qui montrent le mieux les formes, limiter les arêtes cachées, supprimer les vues inutiles ou redondantes.
Quand trois vues ? :: Pour définir un objet complexe.
Quand deux vues ? :: Pour un objet relativement simple.
Quand une seule vue ? :: Pour un objet simple, symétrique ou d'épaisseur constante.
Que doit apporter chaque vue ? :: Une information complémentaire.
Les vues complémentaires citées par le cours :: Vue auxiliaire, coupe, section, vue partielle.
```

## QCM du chapitre

```qcm
? L'objectif du choix des vues est de :
- dessiner les six vues de l'objet
+ définir complètement l'objet avec le minimum de vues
- dessiner toujours exactement trois vues
= Complètement, mais sans vue inutile.

? La vue de face doit être :
- la plus petite
- celle qui contient le plus d'arêtes cachées
+ la plus représentative de l'objet
= C'est le premier critère : la vue de face est celle qui montre le mieux la forme.

? Pour un objet d'épaisseur constante, il suffit en général de :
+ une vue
- deux vues
- trois vues
= Une vue, avec l'indication de l'épaisseur.

? Trois vues servent à définir :
- un objet d'épaisseur constante
- un objet symétrique simple
+ un objet complexe
= 3 vues : objet complexe. 2 vues : objet relativement simple. 1 vue : objet simple, symétrique ou d'épaisseur constante.

? Deux vues donnent la même information. La première n'a aucune arête cachée, la seconde en a cinq. On garde :
+ la première
- la seconde
- les deux
= On limite les arêtes cachées et on supprime la vue redondante.

? Lequel n'est PAS un critère de choix des vues du cours ?
- limiter les arêtes cachées
- supprimer les vues redondantes
+ placer le plus de vues possible sur la feuille
= On cherche au contraire le minimum de vues.

? Selon le cours, le nombre de vues dépend :
- du format de la feuille
+ de la forme de l'objet et des informations nécessaires
- de la disposition choisie, premier ou troisième dièdre
= C'est la phrase « à retenir » de cette partie.

? Laquelle de ces vues est citée comme vue complémentaire ?
- la vue arrière
+ la coupe
- la vue de dessous
= Vues complémentaires : vue auxiliaire, coupe, section, vue partielle. La vue arrière et la vue de dessous font partie des six vues principales.

? Une vue qui n'apporte aucune information nouvelle est :
- obligatoire
+ redondante, donc à supprimer
- à dessiner en trait fin
= Chaque vue doit apporter une information complémentaire.

? Pour une pièce simple et symétrique, le cours indique qu'on peut se contenter de :
+ une vue
- quatre vues
- six vues
= « 1 vue : pour un objet simple, symétrique ou d'épaisseur constante. »
```

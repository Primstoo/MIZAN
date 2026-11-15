---
id: vues-particulieres
titre: Vues particulières · demi-vue, vue partielle, vue interrompue, détail
seance: Chapitre 2 · partie 5
importance: 4
---

## Avant de commencer

Tu dois savoir ce qu'est un axe de symétrie : une droite qui partage une forme en deux moitiés identiques, en miroir.

```exercice Vérifie ton prérequis
? Une pièce est symétrique par rapport à un axe vertical. Tu connais parfaitement sa moitié gauche. Que sais-tu de sa moitié droite ?
= **Tout.** La moitié droite est le reflet exact de la moitié gauche. La dessiner n'apporte aucune information nouvelle.
C'est exactement l'idée de la demi-vue, la première vue particulière du chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Ne dessine que ce qui informe.** Chaque vue particulière répond à un problème précis : une moitié répétée, une zone sans intérêt, une pièce trop longue, un détail trop petit. Retiens le problème, tu retrouves la vue.

> [!piege] Confondre vue partielle et vue interrompue. La vue partielle **garde un seul morceau** de la pièce. La vue interrompue **garde les deux bouts** et supprime le milieu.

À la fin, tu sais reconnaître les quatre vues particulières, dire quand utiliser chacune et comment limiter une vue.

## Idée 1 · Pourquoi des vues particulières ?

On les utilise quand les vues principales ne permettent pas de représenter **simplement et clairement** certaines caractéristiques de l'objet.

| Vue particulière | Le problème qu'elle règle |
|---|---|
| Demi-vue | la pièce est symétrique : une moitié suffit |
| Vue partielle | une seule partie de la pièce est utile |
| Vue interrompue | la pièce est longue, de forme constante ou répétitive |
| Détail | une zone est trop petite pour être lisible |

## Idée 2 · La demi-vue

```html
<svg viewBox="0 0 300 146" style="width:100%;max-width:380px;display:block;margin:10px auto" role="img" aria-label="Demi-vue d'une bride circulaire : seule la moitié gauche est dessinée, jusqu'à l'axe de symétrie, repéré par deux petits traits fins à chaque extrémité.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<path d="M120 24 A50 50 0 0 0 120 124" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M120 56 A18 18 0 0 0 120 92" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="86" cy="74" r="6" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="120" y1="12" x2="120" y2="136" stroke="currentColor" stroke-width="1" stroke-dasharray="10 3 2 3"/><line x1="114" y1="16" x2="126" y2="16" stroke="#D9824F" stroke-width="1.4"/><line x1="114" y1="20" x2="126" y2="20" stroke="#D9824F" stroke-width="1.4"/><line x1="114" y1="128" x2="126" y2="128" stroke="#D9824F" stroke-width="1.4"/><line x1="114" y1="132" x2="126" y2="132" stroke="#D9824F" stroke-width="1.4"/><text x="136" y="22" text-anchor="start" stroke="none" font-size="10">axe de symétrie</text><text x="136" y="78" text-anchor="start" stroke="none" font-size="10">moitié non dessinée</text><line x1="180" y1="112" x2="130" y2="129" stroke="#D9824F" stroke-width="2"/><polygon points="130,129 135.0,124.1 136.9,129.9" fill="#D9824F" stroke="#D9824F" stroke-width="1"/><text x="182" y="110" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">deux petits traits fins</text>
</g>
</svg>
```

La demi-vue s'utilise pour les objets qui présentent **une symétrie**. On ne représente qu'**une moitié** de la vue, jusqu'à l'axe de symétrie.

**Exemple.** Une bride circulaire de 100 mm de diamètre : la demi-vue ne dessine qu'un demi-disque de 50 mm de rayon. On gagne la moitié de la place et du temps.

> [!attention] Les deux petits traits fins tracés à chaque extrémité de l'axe, sur notre schéma, ne sont pas mentionnés dans les diapositives. C'est le repère habituel d'une demi-vue en dessin normalisé. Vérifie auprès de ta prof si elle les attend.

## Idée 3 · La vue partielle

La vue partielle représente **uniquement la partie nécessaire** de l'objet, afin de simplifier le dessin. Le reste de la pièce n'est pas dessiné.

```html
<svg viewBox="0 0 340 122" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="À gauche, une vue partielle : seule une partie de la pièce est dessinée, limitée par un trait fin à main levée. À droite, un détail : une petite gorge entourée d'un cercle repéré A est redessinée en plus grand.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<text x="80" y="14" text-anchor="middle" stroke="none" font-weight="700">Vue partielle</text><path d="M96 30 H24 V92 H104" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="52" cy="61" r="12" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M96 26 C108 40 88 52 100 62 S92 84 104 96" fill="none" stroke="#D9824F" stroke-width="1.4"/><text x="108" y="58" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">trait fin</text><text x="108" y="70" text-anchor="start" stroke="none" fill="#D9824F" font-weight="700" font-size="10">à main levée</text><line x1="180" y1="6" x2="180" y2="118" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/><text x="262" y="14" text-anchor="middle" stroke="none" font-weight="700">Détail</text><polygon points="190,46 236,46 236,52 240,52 240,46 262,46 262,70 240,70 240,64 236,64 236,70 190,70" fill="none" stroke="currentColor" stroke-width="1.8" /><circle cx="238" cy="49" r="9" fill="none" stroke="#D9824F" stroke-width="1.4"/><text x="238" y="36" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">A</text><circle cx="304" cy="64" r="28" fill="none" stroke="#D9824F" stroke-width="1.4"/><polyline points="280,56 298,56 298,74 310,74 310,56 328,56" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="292" y="108" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700" font-size="10">Détail A, agrandi</text>
</g>
</svg>
```

**Exemple.** Sur une longue platine, seul le bout percé nous intéresse : on dessine ce bout, et on arrête la vue par un trait fin à main levée.

## Idée 4 · La vue interrompue

```html
<svg viewBox="0 0 340 142" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une barre longue de forme constante. Dans la vue interrompue, la partie du milieu est supprimée et les deux bouts sont rapprochés, limités par un trait fin en zigzag.">
<g font-family="sans-serif" font-size="11" fill="currentColor" stroke-linejoin="round" stroke-linecap="round">
<text x="170" y="14" text-anchor="middle" stroke="none" font-size="10">Pièce longue de forme constante</text><polygon points="20,28 320,28 320,52 20,52" fill="none" stroke="currentColor" stroke-width="2.2" /><line x1="12" y1="40" x2="328" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="10 3 2 3"/><line x1="120" y1="22" x2="120" y2="58" stroke="#D9824F" stroke-width="1.4" stroke-dasharray="3 3"/><line x1="220" y1="22" x2="220" y2="58" stroke="#D9824F" stroke-width="1.4" stroke-dasharray="3 3"/><text x="170" y="70" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700" font-size="10">partie supprimée</text><text x="170" y="96" text-anchor="middle" stroke="none" font-weight="700">Vue interrompue</text><polyline points="134,106 80,106 80,130 134,130" fill="none" stroke="currentColor" stroke-width="2.2"/><polyline points="134,100 134,111.0 129,115.0 139,121.0 134,125.0 134,136" fill="none" stroke="currentColor" stroke-width="1.2"/><polyline points="166,106 220,106 220,130 166,130" fill="none" stroke="currentColor" stroke-width="2.2"/><polyline points="166,100 166,111.0 161,115.0 171,121.0 166,125.0 166,136" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="72" y1="118" x2="228" y2="118" stroke="currentColor" stroke-width="1" stroke-dasharray="10 3 2 3"/><text x="260" y="116" text-anchor="start" stroke="none" font-size="10">trait fin</text><text x="260" y="128" text-anchor="start" stroke="none" font-size="10">en zigzag</text><line x1="256" y1="118" x2="174" y2="118" stroke="#D9824F" stroke-width="1.2"/><polygon points="174,118 180.3,115.0 180.3,121.0" fill="#D9824F" stroke="#D9824F" stroke-width="1"/>
</g>
</svg>
```

La vue interrompue s'utilise pour les objets **longs**, de forme **constante ou répétitive**. On supprime une partie intermédiaire pour réduire la longueur du dessin.

**Exemple.** Une barre ronde de 2 mètres, identique sur toute sa longueur. On dessine les deux extrémités, on supprime le milieu et on rapproche les deux bouts.

> [!attention] Les diapositives ne le précisent pas, mais c'est la règle habituelle : la pièce n'est pas raccourcie pour autant. Si une cote est portée sur une vue interrompue, elle indique la longueur réelle de la pièce.

## Idée 5 · Le détail

Le détail est une **représentation agrandie** d'une partie de l'objet (schéma de l'idée 3, à droite). Il montre avec précision sa forme et ses caractéristiques techniques.

```etapes Faire un détail
Repère la zone trop petite :: Par exemple une gorge de 2 mm sur un arbre de 200 mm : à l'échelle du dessin, elle est illisible.
Entoure-la et nomme-la :: Un cercle fin autour de la zone, avec une lettre : A.
Redessine-la en plus grand :: À côté, sous le titre « Détail A », la même zone agrandie. On voit enfin sa forme.
```

## Idée 6 · Limiter une vue

Une vue partielle ou une vue interrompue s'arrête quelque part. Cette limite se trace de deux façons :

| Limite | Comment |
|---|---|
| Trait fin **à main levée** | tracé sans instrument |
| Trait continu fin **en zigzag** | tracé aux instruments |

> [!retenir] Demi-vue : **symétrie**. Vue partielle : **une partie**. Vue interrompue : **pièce longue**. Détail : **agrandissement**. Limite : trait fin, à main levée ou en zigzag.

## S'exercer

```exercice Quatre exercices types
? Une tige filetée de 1,5 m a la même forme sur toute sa longueur. Quelle vue particulière utilises-tu ?
indice: Objet long, forme constante.
= La **vue interrompue**. On supprime une partie intermédiaire et on limite les deux bouts par un trait fin, à main levée ou en zigzag.

? Un couvercle rond est symétrique. Tu veux gagner de la place sur la feuille. Quelle vue particulière utilises-tu ?
= La **demi-vue** : on ne représente qu'une moitié de la vue.

? Un disque de 120 mm de diamètre est représenté en demi-vue. Quel est le rayon, en mm, du demi-disque dessiné ?
indice: La demi-vue s'arrête à l'axe de symétrie.
reponse: 60
= 60 mm. La demi-vue garde une moitié de la vue : un demi-disque de rayon 120 / 2 = 60 mm.

? Quelle est la différence entre une vue partielle et un détail ?
= La vue partielle ne montre qu'une partie de la pièce, à la même taille que le reste du dessin, pour simplifier. Le détail montre une partie **agrandie**, pour qu'on puisse la lire.
```

## Flashcards

```cartes
Quand utilise-t-on des vues particulières ? :: Quand les vues principales ne permettent pas de représenter simplement et clairement certaines caractéristiques de l'objet.
Les quatre vues particulières du cours :: Demi-vue, vue partielle, vue interrompue, détail.
Demi-vue :: Pour les objets présentant une symétrie : on ne représente qu'une moitié de la vue.
Vue partielle :: On représente uniquement la partie nécessaire de l'objet, pour simplifier le dessin.
Vue interrompue :: Pour les objets longs de forme constante ou répétitive : on supprime une partie intermédiaire pour réduire la longueur du dessin.
Détail :: Représentation agrandie d'une partie de l'objet, pour montrer précisément sa forme.
Comment limite-t-on une vue partielle ou interrompue ? :: Par un trait fin à main levée, ou par un trait continu fin en zigzag tracé aux instruments.
Vue partielle ou vue interrompue ? :: Partielle : on garde un seul morceau. Interrompue : on garde les deux bouts et on supprime le milieu.
```

## QCM du chapitre

```qcm
? La demi-vue s'utilise pour un objet :
- très long
+ qui présente une symétrie
- trop petit pour être lisible
= On ne dessine qu'une moitié, l'autre étant identique en miroir.

? La vue interrompue s'utilise pour :
+ un objet long de forme constante ou répétitive
- un objet symétrique
- un objet d'épaisseur constante
= On supprime une partie intermédiaire pour réduire la longueur de la représentation.

? Le détail est :
- une vue réduite de l'ensemble de la pièce
- une vue de la pièce sans ses arêtes cachées
+ une représentation agrandie d'une partie de l'objet
= Il sert à montrer précisément une zone trop petite à l'échelle du dessin.

? La vue partielle représente :
- une moitié de la pièce, jusqu'à l'axe de symétrie
+ uniquement la partie nécessaire de l'objet
- les deux extrémités de la pièce, sans le milieu
= Une moitié : c'est la demi-vue. Les deux bouts sans le milieu : c'est la vue interrompue.

? La limite d'une vue partielle peut être tracée par :
- un trait continu fort
+ un trait fin à main levée
- un trait interrompu fin
= Ou par un trait continu fin en zigzag, tracé aux instruments.

? Le trait continu fin en zigzag se trace :
- à main levée
+ aux instruments
- uniquement sur les demi-vues
= Le cours distingue le trait fin à main levée et le trait continu fin en zigzag, exécuté aux instruments.

? Lequel n'est PAS une vue particulière citée dans cette partie du cours ?
- la demi-vue
- le détail
+ la vue arrière
= Les quatre vues particulières : demi-vue, vue partielle, vue interrompue, détail. La vue arrière est une des six vues principales.

? Un arbre de 800 mm porte une petite gorge de 2 mm, illisible sur le dessin. La bonne solution est :
- une demi-vue
- une vue interrompue
+ un détail
= Une zone trop petite se montre agrandie, dans un détail.

? On utilise les vues particulières quand :
- on veut dessiner les six vues
+ les vues principales ne représentent pas simplement et clairement certaines caractéristiques
- la pièce est dessinée en troisième dièdre
= Elles simplifient la représentation de certaines géométries.

? Dans une vue interrompue, on supprime :
- une moitié de la pièce
- les deux extrémités
+ une partie intermédiaire
= On garde les extrémités et on enlève le milieu, là où la forme ne change pas.
```

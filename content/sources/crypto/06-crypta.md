---
id: crypta
titre: Cryptanalyse
seance: Partie 1
importance: 3
---

```html
<h3>Le rôle de la cryptanalyse</h3>
<p>La cryptanalyse étudie comment attaquer un cryptosystème. On ne fait confiance à un système que s'il a résisté à de nombreuses attaques.</p>
<h3>Attaques passives et actives</h3>
<ul><li><b>Passive</b> : Oscar se contente d'<b>écouter</b> le canal. Il menace la <b>confidentialité</b>.</li>
<li><b>Active</b> : Oscar <b>modifie, supprime ou injecte</b> des messages. Il menace l'<b>intégrité</b> et l'<b>authentification</b>.</li></ul>
<h3>Les attaques selon ce que connaît Oscar (de la plus faible à la plus forte)</h3>
<ol>
<li><b>Texte chiffré connu</b> : Oscar n'a que des chiffrés. Il cherche les clairs, ou mieux, la clé. C'est le cas le plus difficile pour lui. Exemple : l'analyse de fréquences sur un chiffré César.</li>
<li><b>Texte clair connu</b> : Oscar a des chiffrés <b>et</b> les clairs correspondants. Il cherche la clé pour déchiffrer d'autres messages. Exemple : il sait qu'un message commence toujours par « Bonjour ».</li>
<li><b>Texte clair choisi</b> : Oscar <b>choisit</b> des clairs et obtient leurs chiffrés. Plus efficace que le cas 2, car il choisit des clairs qui révèlent un maximum sur la clé.</li>
<li><b>Texte chiffré choisi</b> : Oscar choisit des chiffrés et obtient les clairs. Exemple du prof : il dispose d'un boîtier qui déchiffre automatiquement mais ne peut pas être ouvert. Il cherche la clé cachée dedans.</li>
<li><b>Recherche exhaustive (force brute)</b> : essayer toutes les clés. Elle marche toujours en théorie. La parade est d'avoir un très grand nombre de clés (César : 26 clés, cassé instantanément ; DES : 2⁵⁶, cassé en 22 h en 1999).</li>
</ol>
<h3>Les outils statistiques</h3>
<p><b>Analyse de fréquences</b> : casse toutes les substitutions monoalphabétiques (César, affine). En français : E et A sont les plus fréquentes, W la moins fréquente. Paires fréquentes : ES, LE, EN. Triplets : ENT, LES, EDE.</p>
<p><b>Indice de coïncidence et test de Friedman</b> : servent à trouver la longueur de clé d'un Vigenère (voir l'onglet Vigenère). À retenir : IC du français ≈ 0,07-0,08 ; IC d'un texte aléatoire ≈ 0,038. Exemple du prof : « Un enfant n'a pas d'aversion pour la laideur de sa mère », N = 43, IC = 0,070.</p>
```

## S'exercer : exercices guidés et labo

```integre crypto-farchane-outils.html#crypta
cible: [data-tab="crypta"]
garder: .guided,.bench
```

## Flashcards

```cartes
{crypta@40} Les 4 types d'attaques sur le texte ? :: Chiffré connu, clair connu, clair choisi, chiffré choisi.
{crypta@41} Attaque passive ou active ? :: Passive : Oscar écoute sans modifier (menace la confidentialité). Active : il modifie (menace l'intégrité et l'authentification).
{crypta@42} Clair connu ou clair choisi ? :: Clair connu : il possède des couples clair/chiffré mais ne les a pas choisis. Clair choisi : il fait chiffrer les messages qu'il veut.
{crypta@43} Que casse l'analyse de fréquences ? :: Toute substitution mono-alphabétique (César, affine, alphabet-clé) : une même lettre claire donne toujours la même lettre chiffrée.
{crypta@44} 26! clés et pourtant cassable : pourquoi ? :: Parce qu'on n'attaque pas par force brute mais par fréquences. La taille de l'espace des clés ne protège de rien ici.
{crypta@45} À quoi sert le test de Friedman ? :: À estimer la longueur de la clé d'un Vigenère : on calcule l'IC moyen des sous-textes pour chaque L et on garde le L au plus haut IC.
```

## Réponses courtes

```exercice
? {crypta} Lettre la plus fréquente en français :
reponse: E
= E, puis A, S, I…
```

## QCM du chapitre

```qcm
? {crypta} Une attaque passive menace surtout :
+ la confidentialité
- l'intégrité
- la disponibilité
- la non-répudiation
= Écouter permet de lire, pas de modifier.

? {crypta} Oscar choisit des messages clairs et obtient leurs chiffrés. C'est une attaque :
- à texte chiffré connu
- à texte clair connu
+ à texte clair choisi
- à texte chiffré choisi
= Il choisit les clairs : texte clair choisi.

? {crypta} Oscar a un boîtier scellé qui déchiffre tout ce qu'on lui donne. Attaque :
- à texte clair choisi
+ à texte chiffré choisi
- par force brute
- passive
= Il choisit les chiffrés et obtient les clairs (exemple du prof).

? {crypta} De quoi Oscar dispose-t-il dans l'attaque la plus difficile pour lui ?
+ Uniquement de chiffrés
- De clairs et de chiffrés
- De clairs choisis
- De la clé
= Texte chiffré connu : il n'a que des chiffrés.

? {crypta} Dans le test de Friedman, la longueur de clé retenue est celle qui donne :
- l'IC le plus bas
+ l'IC le plus élevé
- un IC de 0
- la plus petite longueur
= Avec la bonne longueur, chaque groupe est un César du français, donc son IC est élevé.
```

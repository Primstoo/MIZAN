---
id: noyau-information-genetique
titre: Noyau et information génétique
seance: Chapitres 3 et 4 · Noyau, réplication, transcription, traduction · TD 4
importance: 5
---

## Avant de commencer

Il faut connaître la complémentarité des bases : A avec T (U dans l'ARN), G avec C.

```exercice Vérifie ton prérequis
? Brin complémentaire de 5' ATGC 3' ?
= 3' TACG 5', qu'on écrit dans le sens habituel 5' GCAT 3'.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « recopier, transcrire, traduire ».** ADN → ADN (réplication), ADN → ARN (transcription), ARN → protéine (traduction).

> [!piege] Oublier les extrémités 5' et 3'. Un brin sans orientation est une réponse fausse : les deux brins sont antiparallèles et toute synthèse se fait de 5' vers 3'.

À la fin, tu sais traiter l'exercice de séquence du TD 4 : promoteur, RBS, codon start, codon stop, peptide, mutations.

## Idée 1 · Le noyau

Enveloppe nucléaire (deux membranes) percée de **pores** ; nucléoplasme ; chromatine ; nucléole.

```grille Passage par les pores nucléaires
#cols: Taille, Passage
*Moins de ≈ 40 kDa, diffusion libre
*Plus de ≈ 40 kDa, transport actif avec un signal (NLS) et de l'énergie
```

Le **nucléofilament** (fibre de 10 nm, « collier de perles ») est fait d'ADN **et** de protéines (histones) : il n'est donc pas composé « uniquement d'ADN ». Il se replie en fibre de 30 nm. Le **nucléole** fabrique les ARN ribosomiques à partir d'un grand précurseur (ARN 45S chez les mammifères), découpé en ARNr 18S, 5,8S et 28S.

## Idée 2 · Réplication et transcription

```html
<svg viewBox="0 0 320 90" role="img" aria-label="Deux brins antiparallèles 5 vers 3 et 3 vers 5, ARN synthétisé de 5 vers 3" style="max-width:420px;width:100%">
<g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 25h280M20 55h280"/><path d="M290 20l10 5-10 5M30 50l-10 5 10 5"/><path d="M80 72h120" stroke="#D9824F"/><path d="M190 67l10 5-10 5" stroke="#D9824F"/></g>
<g fill="currentColor" font-size="10"><text x="4" y="22">5'</text><text x="304" y="22">3'</text><text x="4" y="52">3'</text><text x="304" y="52">5'</text><text x="90" y="88">ARN 5' → 3'</text></g>
</svg>
```

- **Réplication** : semi-conservative ; l'ADN polymérase allonge de 5' vers 3' ; un brin continu, un brin discontinu (fragments d'Okazaki).
- **Transcription** : l'ARN polymérase lit le **brin transcrit** (matrice) de 3' vers 5' et fabrique l'ARN de 5' vers 3'. L'ARNm a la même séquence que le **brin codant**, avec U au lieu de T.

## Idée 3 · Traduction

```etapes Lire un gène bactérien (TD 4)
1. Repère le promoteur : boîtes −35 (TTGACA) et −10 (TATAAT).
2. Repère le RBS (Shine-Dalgarno, ex. GGAGG), qui s'apparie à l'extrémité 3' de l'ARNr 16S.
3. Le premier ATG après le RBS est le codon d'initiation (Met).
4. Lis par triplets jusqu'au premier codon stop (TAA, TAG, TGA).
```

## S'exercer

```exercice TD 4
? Exo 2 : vrai ou faux ? a) Un nucléotide = base + ribose. b) L'ARN est plus stable que l'ADN. c) L'ARN a de l'uracile à la place de la thymine.
= a) Faux : il faut aussi un ou plusieurs phosphates (base + sucre = nucléoside). b) Faux : l'ADN est plus stable (pas de 2'-OH, double brin). c) Vrai.

? Exo 3 : brin transcrit CAA TCC CAG GAC ATG ACT, écrit de 3' vers 5'. ARNm ?
= ARNm (5' → 3') : GUU AGG GUC CUG UAC UGA. Si le brin était écrit 5' → 3', il faudrait inverser l'ordre : écris toujours ton hypothèse d'orientation.

? Exo 4 : dans la séquence du TD, RBS, codon start et peptide ?
= Boîte −35 TTGACA, boîte −10 TATAAT, RBS **GGAGG**, start **ATG** (AAA GCG…), stop **TAA**. Peptide : Met-Lys-Ala-Asp-Ala-Gly-Ser-Arg, soit **8 acides aminés**.
reponse: 8

? Exo 4-5 : conséquences des mutations (positions comptées à partir du TATA).
= a) T → G en position 42 : le codon GAT (Asp) devient GAG (Glu), mutation faux-sens. b) A → C en position 49 : AGC (Ser) devient CGC (Arg), faux-sens aussi.
```

> [!attention] L'exercice 1 du TD (hybridation d'un fragment) renvoie à un fragment dessiné qui n'apparaît pas dans le texte fourni : il n'est pas corrigé ici.

## Flashcards

```cartes
Seuil des pores nucléaires :: ≈ 40 kDa : en dessous diffusion libre, au-dessus transport actif.
Nucléofilament :: ADN + histones (fibre de 10 nm).
Sens de synthèse des acides nucléiques :: Toujours 5' → 3'.
RBS (Shine-Dalgarno) :: Séquence de l'ARNm bactérien qui s'apparie à l'ARNr 16S en amont de l'AUG.
```

## QCM du chapitre

```qcm
? Les pores nucléaires laissent passer librement une protéine de 100 kDa :
- oui
+ non
= Au-dessus de ≈ 40 kDa, transport actif.

? Les nucléofilaments sont composés :
- uniquement d'ADN
+ d'ADN et d'histones
- d'ARN
= « Collier de perles » des nucléosomes.

? Un nucléoside est :
+ base + sucre
- base + sucre + phosphate
- deux bases appariées
= Avec un phosphate, c'est un nucléotide.

? L'ARN polymérase synthétise l'ARN :
+ de 5' vers 3'
- de 3' vers 5'
- dans les deux sens
= Comme l'ADN polymérase.

? L'ARNm a la même séquence que :
- le brin transcrit
+ le brin codant (U à la place de T)
- l'ARNr
= Il est complémentaire du brin transcrit.

? Codon d'initiation :
+ AUG
- UAA
- UGA
= Il code la méthionine.

? Lequel est un codon stop ?
- AUG
+ UAG
- GGA
= UAA, UAG, UGA.

? La réplication est :
- conservative
+ semi-conservative
- dispersive
= Meselson et Stahl.

? Les ARNr sont fabriqués dans :
- le RE
+ le nucléole
- la mitochondrie
= À partir d'un précurseur découpé.

? Remplacer GAT par GAG est une mutation :
- non-sens
+ faux-sens
- silencieuse
= Asp devient Glu.
```

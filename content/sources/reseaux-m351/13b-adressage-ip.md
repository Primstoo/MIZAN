---
id: adressage
titre: Ch3 · Adressage IP, sous-réseaux, IPv6
seance: Chapitre 3 (rédigé d'après le TD 4)
importance: 5
---

## Avant de commencer

Une adresse IPv4 est faite de 4 octets. Chaque octet s'écrit sur 8 bits : 128, 64, 32, 16, 8, 4, 2, 1.

```html
<details class="prereq"><summary><b>Vérifie ton prérequis.</b> Écris 192 en binaire sur 8 bits.</summary><p>11000000 (128 + 64 = 192). Les 8 bits se lisent 128, 64, 32, 16, 8, 4, 2, 1.</p></details>
```

## Comment aborder ce chapitre

> [!astuce] **Pense en bits, pas en points.** Une adresse IPv4 est une suite de 32 bits. Le masque dit où couper : à gauche le réseau, à droite la machine. Tout le chapitre découle de cette coupure.

> [!piege] Compter toutes les adresses d'un réseau comme des machines. La première (bits machine à 0) est l'adresse du réseau, la dernière (bits machine à 1) est l'adresse de diffusion : il reste 2^h − 2 adresses pour les machines.

À la fin, tu sais trouver la classe d'une adresse, calculer réseau, diffusion et plage d'hôtes, découper un bloc en sous-réseaux, expliquer pourquoi deux réseaux ne se parlent pas sans routeur, et lire une adresse IPv6.

> [!attention] **Source de ce chapitre.** Il est rédigé à partir du TD 4 de ton prof et des règles standard de l'adressage IP. Le cours du prof sur ce chapitre n'a pas été fourni (le dossier contient les chapitres 1 et 2) : vérifie les définitions avec ton cours dès que tu l'as. Les exercices viennent du TD 4 ; les exercices 6 et 7 ne sont pas corrigés dans le scan, les corrigés ci-dessous sont rédigés ici et vérifiés par calcul.

## Idée 1 · Une adresse IPv4 = réseau + machine

Idée : l'adresse est une seule suite de 32 bits ; la **classe** (lue dans le premier octet) dit où se trouve la coupure par défaut.

```html
<svg viewBox="0 0 560 120" role="img" aria-label="Adresse IPv4 de 32 bits en 4 octets, avec la coupure réseau machine d'une classe B après 16 bits" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="30" width="135" height="44" rx="5" stroke="#D9824F" stroke-width="2.5"/><rect x="145" y="30" width="135" height="44" rx="5" stroke="#D9824F" stroke-width="2.5"/><rect x="280" y="30" width="135" height="44" rx="5"/><rect x="415" y="30" width="135" height="44" rx="5"/><path d="M280 20v64" stroke="#D9824F" stroke-width="3" stroke-dasharray="5 4"/></g><g font-family="sans-serif" font-size="15" fill="currentColor" text-anchor="middle"><text x="77" y="58">138</text><text x="212" y="58">96</text><text x="347" y="58">32</text><text x="482" y="58">3</text><text x="212" y="100" fill="#D9824F" font-size="13">réseau (16 bits)</text><text x="482" y="100" font-size="13">machine (16 bits)</text><text x="347" y="100" font-size="13">machine</text><text x="280" y="14" font-size="12" fill="#D9824F">coupure /16</text></g></svg>
```

| Classe | 1er octet | Bits de début | Masque par défaut | Hôtes par réseau |
|---|---|---|---|---|
| A | 0 à 127 | 0 | /8 (255.0.0.0) | 2²⁴ − 2 = 16 777 214 |
| B | 128 à 191 | 10 | /16 (255.255.0.0) | 2¹⁶ − 2 = 65 534 |
| C | 192 à 223 | 110 | /24 (255.255.255.0) | 2⁸ − 2 = 254 |

Les classes D (224 à 239, multicast) et E (réservée) ne s'attribuent pas à des machines.

```etapes Trouver la classe et le nombre d'hôtes : 191.16.32.29
Lis le premier octet :: 191.
Place-le dans un intervalle :: 191 est dans [128, 191] donc classe B. Contrôle en binaire : 191 = 10111111, il commence par 10.
Déduis le masque :: Classe B, donc /16.
Compte les bits machine :: 32 − 16 = 16 bits machine.
Calcule les hôtes :: 2¹⁶ − 2 = 65 534 (on retire l'adresse du réseau et celle de diffusion).
```

> [!retenir] Classe A : /8. Classe B : /16. Classe C : /24. Hôtes = 2^(bits machine) − 2.

### Application · TD 4, exercice 1 (question 1)

```exercice TD 4 · Exercice 1 · Classes d'adresses
? {n44} **T4.1.1.** Quelles sont les classes des adresses suivantes ? Combien d'adresses machines chacune peut-elle utiliser ? a) 204.160.241.93 · b) 138.96.32.3 · c) 18.181.0.31 · d) 191.16.32.29
indice: Regarde seulement le premier octet : 0-127 classe A, 128-191 classe B, 192-223 classe C. Hôtes = 2^(bits machine) − 2.
= <b>a)</b> 204 ∈ [192, 223] → <b>classe C</b>, /24, 2⁸ − 2 = <b>254</b> hôtes.<br><b>b)</b> 138 ∈ [128, 191] → <b>classe B</b>, /16, 2¹⁶ − 2 = <b>65 534</b>.<br><b>c)</b> 18 ∈ [0, 127] → <b>classe A</b>, /8, 2²⁴ − 2 = <b>16 777 214</b>.<br><b>d)</b> 191 = 10111111 commence par 10 → <b>classe B</b>, /16, <b>65 534</b> hôtes (191 est le dernier octet de la classe B, pas de la classe C).
```

## Idée 2 · Le masque coupe l'adresse : réseau, diffusion, plage d'hôtes

Idée : le masque est une suite de 1 (partie réseau) puis de 0 (partie machine). Un « ET » bit à bit entre l'adresse et le masque donne l'adresse du réseau.

```html
<svg viewBox="0 0 560 130" role="img" aria-label="Adresse 200.100.10.60 avec masque /27 : 27 bits de réseau et 5 bits de machine" style="max-width:100%;height:auto"><g font-family="monospace" font-size="15" fill="currentColor"><text x="10" y="28" xml:space="preserve">adresse&#160;&#160;11001000.01100100.00001010.001<tspan fill="#D9824F">11100</tspan></text><text x="10" y="58" xml:space="preserve">masque&#160;&#160;&#160;11111111.11111111.11111111.111<tspan fill="#D9824F">00000</tspan></text><text x="10" y="88" xml:space="preserve">réseau&#160;&#160;&#160;11001000.01100100.00001010.001<tspan fill="#D9824F">00000</tspan></text></g><g font-family="sans-serif" font-size="13" fill="currentColor"><text x="10" y="118">→ 200.100.10.32 (27 bits réseau, 5 bits machine en orange)</text></g></svg>
```

| Masque | Notation | Bits machine | Hôtes |
|---|---|---|---|
| 255.255.255.192 | /26 | 6 | 62 |
| 255.255.255.224 | /27 | 5 | 30 |
| 255.255.255.240 | /28 | 4 | 14 |
| 255.255.255.248 | /29 | 3 | 6 |
| 255.255.240.0 | /20 | 12 | 4 094 |

```etapes Adresse réseau, diffusion et plage d'hôtes de 200.100.10.60 / 255.255.255.224
Trouve la longueur du masque :: 224 = 11100000, donc 3 bits dans le dernier octet : 24 + 3 = /27. Il reste 5 bits machine.
Écris le dernier octet de l'adresse :: 60 = 00111100. Les 3 premiers bits (001) sont réseau, les 5 derniers (11100) sont machine.
Adresse du réseau :: Bits machine à 0 : 00100000 = 32. Réseau = 200.100.10.32.
Adresse de diffusion :: Bits machine à 1 : 00111111 = 63. Diffusion = 200.100.10.63.
Plage d'hôtes :: De réseau + 1 à diffusion − 1 : 200.100.10.33 à 200.100.10.62 (30 hôtes).
Appartenance :: 200.100.10.35 = 00100011, ET avec le masque = 00100000 = 32 : même réseau, il appartient au sous-réseau.
```

> [!retenir] Réseau : bits machine à 0. Diffusion : bits machine à 1. Premier hôte = réseau + 1. Dernier hôte = diffusion − 1.

### Application · TD 4, exercices 2 et 3

```exercice TD 4 · Exercice 2 · Tableau d'adressage
? {n45} **T4.2.1.** Pour 145.16.64.0/18 : masque, première adresse IP, dernière adresse IP, adresse de diffusion.
indice: /18 = 16 + 2 bits dans le 3ᵉ octet : 11000000 = 192. Le bloc fait 64 dans le 3ᵉ octet (256 − 192).
= Masque <b>255.255.192.0</b> · première <b>145.16.64.1</b> · dernière <b>145.16.127.254</b> · diffusion <b>145.16.127.255</b> (16 382 hôtes).
? {n45} **T4.2.2.** Pour 192.168.1.32/27 : masque, première, dernière, diffusion.
indice: /27 → 5 bits machine, bloc de 32 dans le dernier octet.
= Masque <b>255.255.255.224</b> · première <b>192.168.1.33</b> · dernière <b>192.168.1.62</b> · diffusion <b>192.168.1.63</b> (30 hôtes).
? {n45} **T4.2.3.** Pour 200.168.1.0/28 : masque, première, dernière, diffusion.
indice: /28 → 4 bits machine, bloc de 16.
= Masque <b>255.255.255.240</b> · première <b>200.168.1.1</b> · dernière <b>200.168.1.14</b> · diffusion <b>200.168.1.15</b> (14 hôtes).
? {n45} **T4.2.4.** Pour 18.1.5.24/29 : masque, première, dernière, diffusion.
indice: /29 → 3 bits machine, bloc de 8 : 24 à 31.
= Masque <b>255.255.255.248</b> · première <b>18.1.5.25</b> · dernière <b>18.1.5.30</b> · diffusion <b>18.1.5.31</b> (6 hôtes).
? {n45} **T4.2.5.** Pour 145.16.64.0/20 : masque, première, dernière, diffusion.
indice: /20 = 16 + 4 bits dans le 3ᵉ octet : 11110000 = 240. Le bloc fait 16 dans le 3ᵉ octet : 64 à 79.
= Masque <b>255.255.240.0</b> · première <b>145.16.64.1</b> · dernière <b>145.16.79.254</b> · diffusion <b>145.16.79.255</b> (4 094 hôtes).
? {n45} **T4.2.6.** Pour 10.96.0.0/11 : masque, première, dernière, diffusion.
indice: /11 = 8 + 3 bits dans le 2ᵉ octet : 11100000 = 224. Le bloc fait 32 dans le 2ᵉ octet : 96 à 127.
= Masque <b>255.224.0.0</b> · première <b>10.96.0.1</b> · dernière <b>10.127.255.254</b> · diffusion <b>10.127.255.255</b> (2 097 150 hôtes). Tous les résultats de ce tableau sont vérifiés par programme.
```

```exercice TD 4 · Exercice 3 · Paramètres de l'ordinateur P1
? {n45} **T4.3.1.** P1 a pour adresse 200.100.10.60 et pour masque 255.255.255.224. Codez l'adresse IP en binaire.
indice: 200 = 128 + 64 + 8, 100 = 64 + 32 + 4, 10 = 8 + 2, 60 = 32 + 16 + 8 + 4.
= <b>11001000.01100100.00001010.00111100</b>
? {n44} **T4.3.2.** Quelle est la classe du réseau ?
indice: Regarde les premiers bits du premier octet.
= Le premier octet 11001000 commence par <b>110</b> (200 ∈ [192, 223]) : <b>classe C</b>.
? {n45} **T4.3.3.** Quelle est l'adresse du sous-réseau ?
indice: Deux méthodes : ET logique avec le masque, ou bits machine à 0.
= Masque dernier octet 11100000. 60 = 00111100. ET = 00100000 = 32. Sous-réseau : <b>200.100.10.32</b> (/27).
? {n45} **T4.3.4.** Quelle est l'adresse de diffusion de ce sous-réseau ?
indice: Bits machine (les 5 derniers) à 1.
= 00111111 = 63. Diffusion : <b>200.100.10.63</b>.
? {n45} **T4.3.5.** L'adresse 200.100.10.35 appartient-elle à ce sous-réseau ?
indice: Fais le ET avec le masque et compare avec l'adresse du sous-réseau.
= 35 = 00100011. ET avec 11100000 = 00100000 = 32 = adresse du sous-réseau. <b>Oui</b>, elle appartient à 200.100.10.32/27 (plage 33 à 62).
```

## Idée 3 · Découper un bloc en sous-réseaux

Idée : pour obtenir n sous-réseaux, on **emprunte** x bits à la partie machine, avec 2^x ≥ n. Ces bits s'ajoutent au préfixe.

```html
<svg viewBox="0 0 560 110" role="img" aria-label="Réseau 172.32.0.0 de classe B : 16 bits de réseau, 4 bits de sous-réseau empruntés, 12 bits de machine" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="26" width="240" height="46" rx="5"/><rect x="250" y="26" width="60" height="46" rx="5" stroke="#D9824F" stroke-width="2.5"/><rect x="310" y="26" width="240" height="46" rx="5"/></g><g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle"><text x="130" y="55">réseau : 16 bits</text><text x="280" y="55" fill="#D9824F">4</text><text x="430" y="55">machine : 12 bits</text><text x="280" y="96" fill="#D9824F" font-size="13">bits empruntés : 2⁴ = 16 sous-réseaux</text></g></svg>
```

```etapes Découper 172.32.0.0 pour 10 succursales
Classe :: 172 ∈ [128, 191] : classe B, masque par défaut /16.
Combien de bits emprunter :: 2ˣ ≥ 10 donne x = 4 (2³ = 8 est trop petit, 2⁴ = 16 convient).
Nouveau masque :: 16 + 4 = /20, soit 255.255.240.0.
Machines par sous-réseau :: 32 − 20 = 12 bits machine : 2¹² − 2 = 4 094 hôtes.
Pas entre deux sous-réseaux :: 256 − 240 = 16 dans le 3ᵉ octet : 172.32.0.0, 172.32.16.0, 172.32.32.0, 172.32.48.0…
Diffusion du sous-réseau 3 :: 172.32.32.0 = 172.32.0010 0000.0 ; bits machine à 1 : 172.32.0010 1111.1111 = 172.32.47.255.
```

> [!retenir] n sous-réseaux : 2ˣ ≥ n. Masque = préfixe d'origine + x. Pas = 256 − (valeur du masque dans l'octet concerné).

### Application · TD 4, exercices 1 (question 2), 5 et 6

```exercice TD 4 · Exercice 1 · Question 2 · Hôte valide avec 11 bits de sous-réseau
? {n46} **T4.1.2.** Laquelle des adresses suivantes est une adresse IP valide d'un hôte, l'adresse du réseau étant 191.254.0.0 quand on utilise 11 bits pour la création de sous-réseaux ? a) 191.254.0.32 · b) 191.254.0.96 · c) 191.254.0.29 · d) 191.54.1.64
indice: 191.254.0.0 est de classe B (/16). 11 bits de sous-réseau donnent /27 : 5 bits machine, blocs de 32. Un hôte ne peut pas avoir tous ses bits machine à 0 (adresse du réseau) ni tous à 1 (diffusion).
= Masque /27 : blocs de 32 dans le dernier octet.<br>a) 32 = 00100000 : bits machine 00000 → <b>adresse de sous-réseau</b>, pas un hôte.<br>b) 96 = 01100000 : bits machine 00000 → <b>adresse de sous-réseau</b>, pas un hôte.<br>c) 29 = 00011101 : bits machine 11101 → ni tout à 0, ni tout à 1 → <b>hôte valide</b> (du sous-réseau 191.254.0.0/27).<br>d) 191.<b>54</b>.1.64 : le 2ᵉ octet n'est pas 254, ce n'est pas le réseau 191.254.0.0.<br><b>Réponse : c) 191.254.0.29.</b><br><br><b>Attention :</b> le corrigé manuscrit du TD retient b) 191.254.0.96. Ce n'est pas un hôte : 96 est le début d'un bloc de 32. Certitude : élevée (calcul vérifié par programme). À confirmer avec ton prof, en lui montrant les bits machine 00000.
```

```exercice TD 4 · Exercice 5 · Entreprise à 10 succursales (172.32.0.0)
? {n44} **T4.5.1.** De quelle classe d'adressage s'agit-il ?
= 172 ∈ [128, 191] : <b>classe B</b>.
? {n46} **T4.5.2.** Donnez et expliquez la valeur du masque de sous-réseau correspondant à ce besoin.
indice: Il faut au moins 10 sous-réseaux : 2ˣ ≥ 10.
= 2⁴ = 16 ≥ 10 (2³ = 8 < 10) : on emprunte <b>4 bits</b>. Masque = 16 + 4 = <b>/20 = 255.255.240.0</b>.
? {n46} **T4.5.3.** Combien de machines chaque sous-réseau pourra-t-il comporter, et pourquoi ?
indice: Il reste 32 − 20 = 12 bits machine.
= 2¹² − 2 = <b>4 094 machines</b>. On retire deux adresses : celle du sous-réseau (bits machine à 0) et celle de diffusion (bits machine à 1).
? {n46} **T4.5.4.** Pour chaque sous-réseau : adresse du sous-réseau, première et dernière machine.
indice: Le pas est de 16 dans le 3ᵉ octet.
= SR1 172.32.0.0/20 · 172.32.0.1 · 172.32.15.254<br>SR2 172.32.16.0/20 · 172.32.16.1 · 172.32.31.254<br>SR3 172.32.32.0/20 · 172.32.32.1 · 172.32.47.254<br>SR4 172.32.48.0/20 · 172.32.48.1 · 172.32.63.254<br>SR5 172.32.64.0/20 · 172.32.64.1 · 172.32.79.254<br>SR6 172.32.80.0/20 · 172.32.80.1 · 172.32.95.254<br>SR7 172.32.96.0/20 · 172.32.96.1 · 172.32.111.254<br>SR8 172.32.112.0/20 · 172.32.112.1 · 172.32.127.254<br>SR9 172.32.128.0/20 · 172.32.128.1 · 172.32.143.254<br>SR10 172.32.144.0/20 · 172.32.144.1 · 172.32.159.254
? {n46} **T4.5.5.** Quelle est l'adresse de diffusion du sous-réseau 3 (expliquez) ?
indice: Mets tous les bits machine du sous-réseau 3 à 1.
= SR3 = 172.32.32.0/20 = 172.32.0010 0000.00000000. Bits machine (4 derniers bits du 3ᵉ octet + tout le 4ᵉ) à 1 : 172.32.0010 1111.11111111 = <b>172.32.47.255</b>.
```

```exercice TD 4 · Exercice 6 · Société à trois sites (172.32.0.0/20) · corrigé rédigé ici
? {n46} **T4.6.1.** Selon le schéma (3 sites, chacun avec son routeur R1, R2, R3, reliés deux à deux par des lignes séries), donnez le nombre de sous-réseaux.
indice: Un sous-réseau = un domaine de diffusion = un côté d'un routeur. Compte les réseaux locaux, puis les liaisons entre routeurs.
= 3 réseaux locaux (un par site : Switch1, Switch2 + hub, Switch3) + 3 liaisons séries (R1-R2, R1-R3, R2-R3) = <b>6 sous-réseaux</b>.
? {n46} **T4.6.2.** Donnez la valeur du masque pour ce besoin.
indice: 2ˣ ≥ 6, à partir de /20.
= 2³ = 8 ≥ 6 : on emprunte 3 bits : 20 + 3 = <b>/23 = 255.255.254.0</b> (510 hôtes par sous-réseau).
? {n46} **T4.6.3.** Donnez le nombre de domaines de collision et le nombre de domaines de diffusion.
indice: Collision : chaque port de switch (et chaque liaison routeur-routeur) en est un ; un hub en partage un avec tout ce qui lui est relié. Diffusion : un routeur sépare les domaines de diffusion.
= <b>Diffusion : 6</b> (un par sous-réseau).<br><b>Collision : 13</b> en lisant le schéma : site 1 = 3 (PC1, imprimante 1, routeur sur Switch1), site 2 = 3 (routeur, Server2, et le segment du hub avec PC2 et imprimante 2), site 3 = 4 (routeur, PC4, PC3, PC5), plus 3 liaisons séries.<br>Certitude : moyenne pour le 13, car il dépend de ce que montre le schéma (nombre de PC du site 3, hub relié à Switch2). Refais le décompte sur ton énoncé.
? {n46} **T4.6.4.** Copiez le schéma et affectez les adresses IP nécessaires.
indice: Un bloc /23 par sous-réseau, en avançant de 2 dans le 3ᵉ octet.
= Plan possible (un bloc /23 par sous-réseau) :<br>Site 1 : 172.32.0.0/23 · Site 2 : 172.32.2.0/23 · Site 3 : 172.32.4.0/23<br>R1-R2 : 172.32.6.0/23 · R1-R3 : 172.32.8.0/23 · R2-R3 : 172.32.10.0/23<br>Sur chaque LAN, l'interface Fa0/0 du routeur prend la première adresse (172.32.0.1, 172.32.2.1, 172.32.4.1) ; les PC et imprimantes prennent les suivantes, avec la passerelle par défaut = l'adresse du routeur. Sur chaque liaison série, S2/0 et S3/0 prennent .6.1 et .6.2 (par exemple). Il reste 2 blocs /23 libres (172.32.12.0 et 172.32.14.0).
? {n46} **T4.6.5.** Donnez l'adresse de diffusion de chaque sous-réseau.
indice: Pour un /23, la diffusion est le dernier octet 255 du 2ᵉ des deux blocs de 256.
= Site 1 <b>172.32.1.255</b> · Site 2 <b>172.32.3.255</b> · Site 3 <b>172.32.5.255</b> · R1-R2 <b>172.32.7.255</b> · R1-R3 <b>172.32.9.255</b> · R2-R3 <b>172.32.11.255</b>.
? {n46} **T4.6.6.** Donnez le nombre total d'adresses IP gaspillées dans les lignes séries.
indice: Une liaison série n'a besoin que de 2 adresses.
= Chaque liaison série reçoit un /23 : 510 hôtes possibles pour 2 utilisés = 508 gaspillées. Pour les 3 liaisons : 3 × 508 = <b>1 524 adresses gaspillées</b>. (Piste d'amélioration hors cours : un masque /30 pour les liaisons séries, avec 2 hôtes chacune, ne gaspille rien.)
```

## Idée 4 · Deux réseaux ne se parlent pas sans routeur

Idée : deux machines sont dans le même réseau si leur adresse ET masque donne le même résultat. Sinon, il faut un routeur et une passerelle par défaut.

```html
<svg viewBox="0 0 560 150" role="img" aria-label="Quatre machines de quatre réseaux différents reliées par un routeur central, une interface par réseau" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="280" cy="75" r="26" stroke="#D9824F" stroke-width="2.5"/><path d="M254 75L170 30M254 75L170 120M306 75L390 30M306 75L390 120"/><rect x="20" y="14" width="150" height="32" rx="5"/><rect x="20" y="104" width="150" height="32" rx="5"/><rect x="390" y="14" width="150" height="32" rx="5"/><rect x="390" y="104" width="150" height="32" rx="5"/></g><g font-family="sans-serif" font-size="12.5" fill="currentColor" text-anchor="middle"><text x="280" y="79" fill="#D9824F">Routeur</text><text x="95" y="35">192.168.20.1/24</text><text x="95" y="125">192.168.22.4/24</text><text x="465" y="35">192.168.16.2/24</text><text x="465" y="125">192.168.18.3/24</text></g></svg>
```

```etapes Pourquoi 192.168.20.1 ne parle pas à 192.168.16.2 (TD 4, exercice 4)
Calcule le réseau de chaque machine :: Masque 255.255.255.0 = /24. Les réseaux sont 192.168.20.0, 192.168.16.0, 192.168.22.0 et 192.168.18.0 : quatre réseaux différents.
Regarde ce qui les relie :: Seulement des switchs. Un switch travaille dans un seul réseau : il ne passe pas d'un réseau à l'autre.
Cherche un routeur :: Il n'y en a pas, donc pas de passerelle par défaut : aucun paquet ne sort de son réseau.
Choisis une solution :: Routeur (une interface par réseau), ou même réseau pour tout le monde, ou sur-réseau (CIDR).
```

> [!retenir] Même réseau : même (adresse ET masque). Réseaux différents : routeur obligatoire, et passerelle par défaut = adresse du routeur dans le réseau de la machine. Masque plus long que le masque par défaut : sous-réseau. Plus court : sur-réseau.

### Application · TD 4, exercice 4

```exercice TD 4 · Exercice 4 · La maquette à 4 machines
? {n47} **T4.4.1.** Quatre machines (192.168.20.1, 192.168.16.2, 192.168.22.4, 192.168.18.3, toutes en 255.255.255.0) sont reliées par deux switchs. Pourquoi ne peut-on pas avoir de communications entre elles ?
indice: Calcule le réseau de chaque machine avec son masque /24.
= Chaque machine appartient à un <b>réseau différent</b> (192.168.20.0, 192.168.16.0, 192.168.22.0, 192.168.18.0). Les 4 machines sont reliées par des switchs, qui ne font pas passer d'un réseau à l'autre, et il n'y a <b>ni routeur ni passerelle par défaut</b> : aucune communication n'est possible.
? {n47} **T4.4.2.** Proposez des solutions pour résoudre ce problème.
indice: Trois idées : ajouter un équipement de couche 3, changer les adresses, ou changer les masques.
= <b>Solution 1 : un routeur</b> à la place des switchs, une interface par réseau, avec une adresse libre de chaque réseau (par exemple 192.168.20.254/24, 192.168.16.254/24, 192.168.18.254/24, 192.168.22.254/24), puis configurer cette adresse comme <b>passerelle par défaut</b> de chaque machine. (Le scan note .3 et .4 pour deux interfaces : ce sont les adresses des PC, pas celles du routeur.)<br><b>Solution 2 : même réseau</b> pour les 4 machines, par exemple 192.168.20.1 à 192.168.20.4, toutes en /24, avec les switchs.<br><b>Solution 3 : un sur-réseau (CIDR)</b> : les adresses 192.168.16.x, .18.x, .20.x, .22.x ont en commun les 21 premiers bits (3ᵉ octet : 00010000, 00010010, 00010100, 00010110, donc 00010 en commun) : on les met dans 192.168.16.0/21 en changeant le masque en 255.255.248.0.
? {n47} **T4.4.3.** Pourquoi n'a-t-on pas choisi l'une des deux adresses 192.168.16.0 et 192.168.16.255 comme adresse machine ?
indice: Le masque est /24 : regarde les bits machine du dernier octet.
= Dans 192.168.16.0/24, <b>192.168.16.0</b> a tous ses bits machine à 0 : c'est l'<b>adresse du réseau</b>. <b>192.168.16.255</b> les a tous à 1 : c'est l'<b>adresse de diffusion</b>. Aucune des deux ne peut être attribuée à une machine.
```

## Idée 5 · IPv6 : 128 bits, une écriture plus courte

Idée : IPv6 règle le manque d'adresses d'IPv4. Une adresse fait 128 bits, écrits en 8 groupes de 4 chiffres hexadécimaux.

```html
<svg viewBox="0 0 560 100" role="img" aria-label="Adresse IPv6 : 8 groupes de 16 bits, soit 128 bits" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="28" width="62" height="40" rx="4"/><rect x="76" y="28" width="62" height="40" rx="4"/><rect x="142" y="28" width="62" height="40" rx="4"/><rect x="208" y="28" width="62" height="40" rx="4"/><rect x="274" y="28" width="62" height="40" rx="4" stroke="#D9824F" stroke-width="2.5"/><rect x="340" y="28" width="62" height="40" rx="4" stroke="#D9824F" stroke-width="2.5"/><rect x="406" y="28" width="62" height="40" rx="4"/><rect x="472" y="28" width="62" height="40" rx="4"/></g><g font-family="monospace" font-size="13" fill="currentColor" text-anchor="middle"><text x="41" y="53">2001</text><text x="107" y="53">0082</text><text x="173" y="53">0007</text><text x="239" y="53">0071</text><text x="305" y="53" fill="#D9824F">0000</text><text x="371" y="53" fill="#D9824F">0000</text><text x="437" y="53">00fe</text><text x="503" y="53">00b1</text><text x="338" y="90" font-family="sans-serif" fill="#D9824F" font-size="12">groupes de zéros → ::</text></g></svg>
```

Règles d'écriture : on peut supprimer les zéros de tête de chaque groupe (0082 → 82), et remplacer **une seule fois** une suite de groupes nuls par `::`.

```etapes Retrouver la forme complète de 2001:82:7:71::fe:b1
Compte les groupes écrits :: 2001, 82, 7, 71, fe, b1 : 6 groupes. Une adresse en a 8.
Complète avec des groupes nuls :: Il manque 8 − 6 = 2 groupes : le double deux-points vaut 0000:0000.
Complète chaque groupe à 4 chiffres :: 82 → 0082, 7 → 0007, 71 → 0071, fe → 00fe, b1 → 00b1.
Résultat :: 2001:0082:0007:0071:0000:0000:00fe:00b1.
```

```etapes Adresse lien local (link-local) à partir d'une adresse MAC : 02:00:4c:4f:4f:50
Coupe la MAC en deux :: 02:00:4c | 4f:4f:50.
Insère ff:fe au milieu :: 02:00:4c:ff:fe:4f:4f:50 (c'est l'identifiant EUI-64).
Inverse le 7ᵉ bit du 1ᵉʳ octet :: 02 = 00000010, le bit « universel/local » passe de 1 à 0 : 00.
Écris l'identifiant :: 00:00:4c:ff:fe:4f:4f:50, soit 0000:4cff:fe4f:4f50.
Ajoute le préfixe :: Devant l'identifiant, on met fe80:: ce qui donne fe80::4cff:fe4f:4f50.
```

### Application · TD 4, exercice 7

```exercice TD 4 · Exercice 7 · IPv6 et multicast · corrigé rédigé ici
? {n48} **T4.7.1.** Citez les avantages d'utiliser l'adressage IPv6.
indice: Pense à la taille, à la configuration, à l'en-tête et à la sécurité.
= Espace d'adressage immense (2¹²⁸ adresses) qui supprime le manque d'adresses et le besoin de NAT · autoconfiguration des machines (adresse lien local, SLAAC) · en-tête simplifié, donc routage plus efficace · plus de diffusion : remplacée par le multicast et l'anycast · IPsec prévu dès la conception.<br>(Rédigé ici à partir de connaissances standard, certitude élevée ; la liste exacte du cours du prof peut différer.)
? {n48} **T4.7.2.** Donnez la forme complète des adresses : a) ::1 · b) 2001:82:7:71::fe:b1 · c) FF02::2 · d) 2001:ac3::3030:510:0:4
indice: Compte les groupes écrits : « :: » remplace les groupes manquants pour arriver à 8. Complète chaque groupe à 4 chiffres.
= a) <b>0000:0000:0000:0000:0000:0000:0000:0001</b><br>b) <b>2001:0082:0007:0071:0000:0000:00fe:00b1</b><br>c) <b>ff02:0000:0000:0000:0000:0000:0000:0002</b><br>d) <b>2001:0ac3:0000:0000:3030:0510:0000:0004</b> (6 groupes écrits : « :: » remplace 2 groupes). Vérifié par programme.
? {n48} **T4.7.3.** Calculez l'adresse lien local (link-local) de la machine d'adresse MAC 02:00:4c:4f:4f:50.
indice: EUI-64 : insère ff:fe au milieu de la MAC, inverse le 7ᵉ bit du premier octet, ajoute le préfixe fe80::.
= 02:00:4c : ff:fe : 4f:4f:50 → 02:00:4c:ff:fe:4f:4f:50. Le premier octet 02 (00000010) devient 00 une fois le bit U/L inversé. Adresse : <b>fe80::4cff:fe4f:4f50</b> (forme complète fe80:0000:0000:0000:0000:4cff:fe4f:4f50). Vérifié par programme.
? {n48} **T4.7.4.** Calculez l'adresse MAC multicast équivalente à l'adresse IP multicast 224.212.110.199.
indice: MAC multicast IPv4 = 01:00:5e suivi des 23 bits de poids faible de l'adresse IP (donc le 1ᵉʳ bit du 2ᵉ octet est mis à 0).
= 212 = 11010100 → on garde 7 bits : 1010100 = 0x54. 110 = 0x6e. 199 = 0xc7. Adresse MAC : <b>01:00:5e:54:6e:c7</b>. Vérifié par programme.
```

## Flashcards

```cartes
{n44} Classes A, B, C : intervalle du 1ᵉʳ octet et masque ? :: A : 0-127, /8. B : 128-191, /16. C : 192-223, /24.
{n44} Nombre d'hôtes d'un réseau ? :: 2^h − 2, avec h = nombre de bits machine (on retire l'adresse du réseau et celle de diffusion).
{n45} Adresse réseau, diffusion, plage d'hôtes ? :: Réseau : bits machine à 0. Diffusion : bits machine à 1. Hôtes : de réseau + 1 à diffusion − 1.
{n45} Comment trouver l'adresse réseau avec un masque ? :: ET bit à bit entre l'adresse IP et le masque.
{n45} Masque /27 : en décimal, bits machine, hôtes ? :: 255.255.255.224, 5 bits machine, 2⁵ − 2 = 30 hôtes.
{n46} Combien de bits emprunter pour n sous-réseaux ? :: x tel que 2ˣ ≥ n. Le nouveau préfixe = ancien préfixe + x.
{n46} Pas entre deux sous-réseaux ? :: 256 − valeur du masque dans l'octet concerné. Ex. : masque 240 → pas de 16.
{n47} Deux machines peuvent-elles communiquer si leurs réseaux sont différents ? :: Seulement via un routeur et une passerelle par défaut. Un switch ne change pas de réseau.
{n47} Sous-réseau ou sur-réseau ? :: Masque plus long que le masque par défaut de la classe : sous-réseau. Plus court : sur-réseau (CIDR).
{n48} Taille et écriture d'une adresse IPv6 ? :: 128 bits, 8 groupes de 4 chiffres hexadécimaux. On supprime les zéros de tête et on remplace une seule suite de groupes nuls par « :: ».
{n48} Adresse lien local depuis une MAC (EUI-64) ? :: ff:fe au milieu de la MAC, 7ᵉ bit du 1ᵉʳ octet inversé, préfixe fe80::.
{n48} MAC multicast d'une IP multicast IPv4 ? :: 01:00:5e + les 23 bits de poids faible de l'adresse IP.
```

## QCM du chapitre

```qcm
? {n44} L'adresse 172.20.5.9 est de classe…
- A
+ B
- C
- D
= 172 est dans [128, 191] : classe B (masque par défaut /16).

? {n44} Combien de machines peut-on adresser dans un réseau de classe C ?
- 256
- 255
+ 254
- 65 534
= 8 bits machine : 2⁸ − 2 = 254 (on retire l'adresse du réseau et celle de diffusion).

? {n45} Le masque 255.255.255.224 s'écrit en notation CIDR…
- /24
- /26
+ /27
- /28
= 224 = 11100000 : 3 bits dans le dernier octet, soit 24 + 3 = /27.

? {n45} Quelle est l'adresse de diffusion du réseau 192.168.1.32/27 ?
- 192.168.1.62
+ 192.168.1.63
- 192.168.1.64
- 192.168.1.255
= Bloc de 32 : 32 à 63. La dernière adresse du bloc, 63, est la diffusion.

? {n45} Combien d'hôtes utilisables dans un réseau /28 ?
- 16
+ 14
- 30
- 28
= 4 bits machine : 2⁴ − 2 = 14.

? {n45} Quelle est la dernière adresse utilisable de 10.96.0.0/11 ?
- 10.96.255.254
+ 10.127.255.254
- 10.255.255.254
- 10.111.255.254
= /11 : 3 bits dans le 2ᵉ octet, blocs de 32 : 96 à 127. Diffusion 10.127.255.255, donc dernier hôte 10.127.255.254.

? {n46} On veut 10 sous-réseaux à partir d'un réseau de classe B. Combien de bits faut-il emprunter ?
- 3
+ 4
- 5
- 10
= 2³ = 8 < 10 et 2⁴ = 16 ≥ 10 : 4 bits, donc un masque /20.

? {n46} 172.32.0.0 est découpé en /20. Quelle est l'adresse du sous-réseau n° 3 ?
- 172.32.3.0
- 172.32.16.0
+ 172.32.32.0
- 172.32.48.0
= Le pas est 16 dans le 3ᵉ octet : SR1 = 0, SR2 = 16, SR3 = 32.

? {n47} Deux PC de réseaux différents, reliés seulement par des switchs, ne communiquent pas parce que…
- les switchs sont trop lents
+ il n'y a pas de routeur ni de passerelle par défaut
- leurs adresses sont de classes différentes
- leur masque est /24
= Un switch ne passe pas d'un réseau à l'autre. Il faut un routeur et une passerelle par défaut.

? {n47} Un masque plus court que le masque par défaut de la classe correspond à…
- un sous-réseau
+ un sur-réseau (CIDR)
- une adresse de diffusion
- une adresse IPv6
= Plus de bits machine qu'à l'origine : on regroupe plusieurs réseaux en un seul (agrégation CIDR).

? {n48} Combien de bits fait une adresse IPv6 ?
- 32
- 64
+ 128
- 256
= 8 groupes de 16 bits : 128 bits, contre 32 pour IPv4.

? {n48} L'adresse MAC multicast liée à une adresse IP multicast IPv4 commence par…
- 33:33
+ 01:00:5e
- ff:ff:ff
- 02:00:4c
= Pour IPv4, 01:00:5e suivi des 23 bits de poids faible de l'adresse IP (TD 4, exercice 7).
```

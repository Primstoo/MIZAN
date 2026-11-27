---
id: routage
titre: Ch4 · Routage IP : statique, RIP, OSPF
seance: Chapitre 4
importance: 5
---

## Avant de commencer

Il te faut deux choses du chapitre 3 : trouver l'adresse réseau d'une machine (adresse ET masque), et savoir que deux réseaux différents ne se parlent qu'à travers un routeur.

```html
<details class="prereq"><summary><b>Vérifie ton prérequis.</b> Un paquet va vers 172.16.3.10. Le routeur connaît 172.16.3.0/24 et 172.16.0.0/16. Laquelle des deux routes correspond ?</summary><p>Les deux : 172.16.3.10 ET 255.255.255.0 = 172.16.3.0, et ET 255.255.0.0 = 172.16.0.0. Le routeur choisit la plus précise, le /24 (préfixe le plus long). C'est la règle de base de ce chapitre.</p></details>
```

## Comment aborder ce chapitre

> [!astuce] **Pense « panneau indicateur ».** Un routeur ne connaît jamais le chemin complet : pour chaque réseau, il sait seulement **par où envoyer** (le prochain saut). Tout le chapitre répond à une question : comment le routeur remplit ses panneaux ? À la main (statique) ou en discutant avec ses voisins (dynamique : RIP, OSPF, BGP).

> [!piege] Croire qu'une route suffit dans un sens. Un ping a besoin d'une route **à l'aller et au retour** : chaque routeur traversé doit connaître le réseau de la source. C'est l'erreur n° 1 en TP (voir le TP 3).

À la fin, tu sais lire une table de routage, fragmenter un datagramme, écrire les quatre types de routes statiques, distinguer vecteur de distance et état de liens, et configurer RIPv2 et OSPF à zone unique.

> [!attention] **Sources.** Chapitre 4 de ton prof. Plusieurs diapos (en-têtes, tables de routage, sorties de commandes, schémas SPF) sont des images : les explications correspondantes sont rédigées ici d'après le fonctionnement standard de Cisco IOS, certitude élevée. Il n'y a pas d'annales de ce chapitre dans ton dossier.

## Idée 1 · Le routeur choisit le prochain saut

Idée : pour chaque paquet, le routeur lit l'**adresse IP de destination**, cherche dans sa **table de routage** la route la plus précise, et envoie le paquet au **prochain saut** (next hop) par l'**interface de sortie**.

```html
<svg viewBox="0 0 560 150" role="img" aria-label="PC A envoie vers PC B à travers R1, R2 et R3. Chaque routeur ne connaît que le prochain saut ; le TTL baisse de 1 à chaque routeur" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="55" width="50" height="34" rx="5"/><circle cx="160" cy="72" r="22" stroke="#D9824F" stroke-width="2.5"/><circle cx="280" cy="72" r="22" stroke="#D9824F" stroke-width="2.5"/><circle cx="400" cy="72" r="22" stroke="#D9824F" stroke-width="2.5"/><rect x="500" y="55" width="50" height="34" rx="5"/><path d="M60 72h78M182 72h76M302 72h76M422 72h78"/></g><g font-family="sans-serif" font-size="12.5" fill="currentColor" text-anchor="middle"><text x="35" y="77">A</text><text x="160" y="76">R1</text><text x="280" y="76">R2</text><text x="400" y="76">R3</text><text x="525" y="77">B</text><text x="100" y="45">TTL 64</text><text x="220" y="45">TTL 63</text><text x="340" y="45">TTL 62</text><text x="460" y="45">TTL 61</text><text x="280" y="125" fill="#D9824F">chaque routeur : « pour le réseau de B, j'envoie au suivant »</text></g></svg>
```

| Élément de la table | Rôle |
|---|---|
| Réseau de destination + masque | le réseau atteignable |
| Prochain saut | l'adresse du routeur suivant |
| Interface de sortie | par où envoyer |
| Métrique | le « coût » du chemin (sauts, coût, délai) |
| Route par défaut 0.0.0.0/0 | utilisée quand aucune autre route ne correspond (souvent vers Internet) |

```etapes Ce que fait le routeur pour chaque paquet
Lit la destination :: L'adresse IP de destination, dans l'en-tête.
Cherche la route la plus précise :: Préfixe le plus long qui correspond ; sinon la route par défaut ; sinon le paquet est jeté (et un message ICMP « destination inaccessible » est renvoyé).
Décrémente le TTL :: TTL − 1. S'il tombe à 0, le paquet est éliminé : ça évite qu'il tourne en boucle.
Réencapsule et transmet :: Nouvelle trame (nouvelles adresses MAC) vers le prochain saut. Les adresses IP, elles, ne changent pas.
```

> [!prof] La diapo 3 se termine par « s'appelle. » sans le mot : ce mécanisme s'appelle le **routage saut par saut** (hop-by-hop).

> [!retenir] Destination → préfixe le plus long → prochain saut + interface. TTL − 1 à chaque routeur. L'IP ne change pas, la MAC change à chaque saut.

## Idée 2 · Le datagramme IP et la fragmentation

Idée : quand un paquet est plus grand que la **MTU** du lien suivant, le routeur IPv4 le **découpe en fragments**. Chaque fragment garde la même **identification** ; le **décalage** (offset) dit où il se place, compté en **blocs de 8 octets** ; le drapeau **MF** (More Fragments) vaut 1 tant qu'il en reste. Le réassemblage se fait **à la destination**.

| Champ | Rôle |
|---|---|
| Version, IHL | IPv4 ; longueur de l'en-tête (20 octets sans options) |
| ToS / DSCP | qualité de service |
| Longueur totale | en-tête + données |
| Identification, drapeaux (DF, MF), décalage | fragmentation |
| TTL | nombre maximal de routeurs traversés |
| Protocole | 1 ICMP, 6 TCP, 17 UDP |
| Somme de contrôle | vérifie l'en-tête |
| Adresses source et destination | 32 bits chacune |

| Réseau | MTU |
|---|---|
| Ethernet | 1500 octets |
| FDDI | 4470 octets |
| Anneau à jeton 16 Mbit/s | 17 914 octets |

```etapes Fragmenter 4000 octets sur une MTU de 1500 (diapo 20)
Données à transporter :: 4000 − 20 d'en-tête = 3980 octets.
Données max par fragment :: 1500 − 20 = 1480 octets (multiple de 8 : 1480 / 8 = 185 blocs).
Découpe :: 1480 + 1480 + 1020 = 3980 : 3 fragments.
Décalages :: 0, puis 185, puis 370 (en blocs de 8 octets).
Drapeau MF :: 1, 1, puis 0 pour le dernier.
Tailles totales :: 1500, 1500 et 20 + 1020 = 1040 octets.
```

> [!prof] **Diapo 19.** Le second fragment est noté « décalage-fragment = 600 ». En octets, oui, mais le champ de l'en-tête compte en blocs de 8 : il vaut **75** (600 / 8). La diapo 20 et la figure de la diapo 21 (offsets 410, 820, 1230) utilisent bien les blocs de 8 : c'est cette convention qu'il faut suivre en examen. Vérifié par programme.

```exercice Fragmentation
? {n61} A envoie un paquet de 1100 octets (en-tête de 20) sur un lien de MTU 620. Donne pour chaque fragment : taille totale, MF, décalage.
indice: Données = 1080. Par fragment : 620 − 20 = 600 octets de données.
= Fragment 1 : <b>620 octets</b>, MF = 1, décalage <b>0</b>.<br>Fragment 2 : 20 + 480 = <b>500 octets</b>, MF = 0, décalage <b>75</b> (600 octets / 8).
reponse: 75
? {n61} Un datagramme porte 11 980 octets de données. La MTU est de 3300. Combien de fragments, et quel décalage pour le dernier ?
indice: 3300 − 20 = 3280 octets par fragment, soit 410 blocs de 8.
= 3280 × 3 = 9840, reste 2140 : <b>4 fragments</b>. Décalages 0, 410, 820 et <b>1230</b> (figure de la diapo 21).
? {n61} Qui réassemble les fragments : le routeur suivant ou la destination ? Pourquoi ?
= <b>La destination.</b> Les fragments peuvent prendre des chemins différents ; un routeur intermédiaire ne les verra pas forcément tous.
```

## Idée 3 · Routage statique : quatre sortes de routes

Idée : l'administrateur écrit lui-même chaque route. C'est simple, stable et sûr pour un petit réseau, mais rien ne s'adapte en cas de panne.

```html
<svg viewBox="0 0 560 140" role="img" aria-label="R1 est un routeur d'extrémité avec un seul voisin R2 : une route par défaut sur R1 vers R2 suffit, et R2 a une route statique vers le LAN de R1, 172.16.3.0/24" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="10" y="50" width="130" height="40" rx="6"/><circle cx="210" cy="70" r="24" stroke="#D9824F" stroke-width="2.5"/><circle cx="380" cy="70" r="24"/><path d="M140 70h46M234 70h122M404 70h60"/><path d="M470 50c10-20 60-20 70 5c15 15-5 40-30 30c-15 15-45 5-40-10z"/></g><g font-family="sans-serif" font-size="12" fill="currentColor" text-anchor="middle"><text x="75" y="75">172.16.3.0/24</text><text x="210" y="74" fill="#D9824F">R1</text><text x="380" y="74">R2</text><text x="505" y="70">reste</text><text x="210" y="120" fill="#D9824F">R1 : route par défaut → R2</text><text x="390" y="120">R2 : route vers 172.16.3.0/24 → R1</text></g></svg>
```

| Type | À quoi ça sert | Exemple de commande |
|---|---|---|
| Standard | atteindre un réseau précis | `ip route 172.16.3.0 255.255.255.0 172.16.2.2` |
| Par défaut | tout ce qui n'a pas de route (réseau d'extrémité, Internet) | `ip route 0.0.0.0 0.0.0.0 s0/0/0` |
| Récapitulative | une seule route pour plusieurs réseaux contigus qui sortent au même endroit | `ip route 172.16.8.0 255.255.248.0 …` |
| Flottante | secours : distance administrative plus grande, n'apparaît que si la principale tombe | `ip route 0.0.0.0 0.0.0.0 10.1.1.1 5` |

Syntaxe : `ip route réseau masque {adresse-du-prochain-saut | interface-de-sortie}`.

| Forme | Le routeur doit… | Usage |
|---|---|---|
| Prochain saut (route **récursive**) | faire 2 recherches : trouver le saut, puis l'interface vers ce saut | liens Ethernet (supports de diffusion) |
| Interface de sortie (route **reliée directement**) | une seule recherche | liaisons point à point (séries) |

```etapes Vérifier ses routes statiques
show ip route :: Les routes statiques sont marquées S, la route par défaut S*. Les réseaux directement connectés : C (et L pour l'adresse de l'interface).
show ip route 172.16.3.0 :: Le détail d'une seule entrée.
show running-config | include ip route :: Les commandes ip route tapées.
```

> [!retenir] Statique : `ip route réseau masque saut|interface`. Défaut = 0.0.0.0 0.0.0.0. Récursive = 2 recherches. Flottante = distance administrative > 1. Tout ça est pratiqué pas à pas dans le **TP 3**.

```exercice Routes statiques
? {n62} R1 est un routeur d'extrémité : son seul voisin est R2 (172.16.2.2). Quelle route unique suffit sur R1 ?
indice: Tout ce qui n'est pas local part au même endroit.
= Une route statique par défaut : <b>ip route 0.0.0.0 0.0.0.0 172.16.2.2</b> (ou l'interface de sortie à la place de l'adresse).
? {n62} Quelle est la différence entre ip route 172.16.1.0 255.255.255.0 172.16.2.1 et ip route 172.16.1.0 255.255.255.0 s0/0/1 ?
= La première est <b>récursive</b> : le routeur cherche d'abord la route vers 172.16.2.1 pour trouver l'interface (2 recherches). La seconde est <b>reliée directement</b> : l'interface est donnée, une seule recherche.
? {n62} À quoi reconnaît-on une route flottante ?
= On ajoute à la fin une <b>distance administrative</b> plus grande que celle de la route principale (une statique vaut 1). Elle reste cachée tant que la principale fonctionne.
```

## Idée 4 · Routage dynamique : IGP, EGP et distance administrative

Idée : les routeurs **échangent** ce qu'ils savent et recalculent seuls en cas de panne. Ça coûte de la bande passante et du processeur, mais ça passe à l'échelle.

```flux Classer les protocoles de routage
IGP, dans un AS -> vecteur de distance : RIP, IGRP, EIGRP -> état de liens : OSPF, IS-IS -> EGP, entre AS : BGP
```

| | Statique | Dynamique |
|---|---|---|
| Configuration | à la main, route par route | on active un protocole |
| Panne | rien ne change seul | recalcul automatique |
| Ressources | aucune | bande passante + CPU |
| Taille idéale | petit réseau, réseau d'extrémité | moyen et grand réseau |

- **Protocole routé** : celui qui transporte les données (IP).
- **Protocole de routage** : celui qui remplit les tables (RIP, OSPF, BGP).
- **Système autonome (AS)** : les routeurs d'une même administration (une entreprise, un FAI).
- **BGP** : le protocole d'Internet entre les AS. Il choisit selon des **politiques** et le chemin d'AS (AS-path), pas seulement la distance. Il parle via **TCP, port 179**.

Quand deux sources proposent une route vers le même réseau, le routeur garde celle qui a la plus petite **distance administrative** (la plus fiable) :

| Origine | Distance administrative |
|---|---|
| Directement connecté | 0 |
| Statique | 1 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |

> [!attention] Seule la valeur 110 d'OSPF est dans les diapos ; les autres sont les valeurs par défaut de Cisco IOS (certitude élevée).

> [!retenir] IGP dans un AS (RIP, EIGRP, OSPF, IS-IS), EGP entre AS (BGP, TCP 179). Plus la distance administrative est petite, plus la route est préférée.

## Idée 5 · Vecteur de distance : RIP

Idée : un routeur à vecteur de distance ne connaît que la **distance** (pour RIP : le nombre de sauts) et la **direction** (l'interface ou le voisin). Il croit ses voisins sur parole : les routeurs servent de « poteaux indicateurs ».

```html
<svg viewBox="0 0 560 120" role="img" aria-label="R1 sait que 172.16.3.0/24 est à 1 saut, dans la direction de l'interface S0/0/0 vers R2" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="90" cy="55" r="24" stroke="#D9824F" stroke-width="2.5"/><circle cx="300" cy="55" r="24"/><rect x="420" y="38" width="130" height="34" rx="6"/><path d="M114 55h162M324 55h96"/><path d="M200 45l14 10l-14 10" stroke="#D9824F" stroke-width="2"/></g><g font-family="sans-serif" font-size="12.5" fill="currentColor" text-anchor="middle"><text x="90" y="59" fill="#D9824F">R1</text><text x="300" y="59">R2</text><text x="485" y="60">172.16.3.0/24</text><text x="195" y="35">S0/0/0</text><text x="280" y="105" fill="#D9824F">distance : 1 saut · vecteur : vers S0/0/0</text></g></svg>
```

| Protocole | En bref |
|---|---|
| RIPv1 | ancien, avec classes (n'envoie pas les masques) |
| RIPv2 | sans classe : envoie les masques, gère le VLSM |
| IGRP | Cisco, obsolète, remplacé par EIGRP |
| EIGRP | Cisco, vecteur de distance avancé |

```text
R1# conf t
R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# network 192.168.1.0
R1(config-router)# network 192.168.2.0
R1(config-router)# no auto-summary
R1(config-router)# end
R1# show ip protocols
R1# show ip route rip
```

```etapes Configurer RIPv2
router rip :: Entre en mode de configuration RIP (ça ne lance rien tout seul).
version 2 :: Envoie et reçoit uniquement des messages RIPv2.
network … :: Un réseau directement connecté par commande, sans masque (adresse avec classe). Les interfaces de ces réseaux participent à RIP.
no auto-summary :: Coupe la récapitulation automatique aux frontières de classe (activée par défaut). À taper après version 2.
Vérifier :: show ip protocols (version, réseaux annoncés), show ip route (routes marquées R).
no router rip :: Supprime tout le processus RIP et sa configuration.
```

> [!piege] Oublier `no auto-summary` avec des sous-réseaux discontinus : RIP annonce alors 172.16.0.0/16 au lieu des vrais sous-réseaux, et des routes partent au mauvais endroit.

```exercice RIP
? {n64} Que sait R1 d'un réseau appris par RIP, et que ne sait-il pas ?
= Il sait la <b>distance</b> (nombre de sauts) et la <b>direction</b> (interface ou voisin). Il ne connaît <b>pas le chemin complet</b> ni la topologie.
? {n64} Après router rip, R1 n'envoie toujours aucune mise à jour. Pourquoi ?
indice: Quelle commande dit à RIP quelles interfaces utiliser ?
= Il manque les commandes <b>network</b> : sans elles, aucune interface ne participe à RIP.
```

## Idée 6 · État de liens : OSPF et l'algorithme de Dijkstra

Idée : chaque routeur OSPF connaît **toute la carte** de sa zone (les liens et leurs coûts), puis calcule lui-même le chemin le moins coûteux avec l'algorithme **SPF de Dijkstra**.

```html
<svg viewBox="0 0 560 170" role="img" aria-label="Exemple du cours : de R2 au réseau local de R3, le chemin R2 vers R1 coûte 20, R1 vers R3 coûte 5, R3 vers le LAN coûte 2, total 27" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="70" cy="110" r="24"/><circle cx="250" cy="40" r="24"/><circle cx="420" cy="110" r="24"/><rect x="480" y="140" width="70" height="26" rx="5"/><path d="M92 100L228 50M272 50L398 100M442 122L490 145" stroke="#D9824F" stroke-width="2.5"/></g><g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle"><text x="70" y="114">R2</text><text x="250" y="44">R1</text><text x="420" y="114">R3</text><text x="515" y="158" font-size="11">LAN</text><text x="145" y="65" fill="#D9824F">20</text><text x="350" y="65" fill="#D9824F">5</text><text x="475" y="125" fill="#D9824F">2</text><text x="250" y="160">20 + 5 + 2 = 27</text></g></svg>
```

```etapes Comment OSPF construit ses routes
Rencontrer les voisins :: Les routeurs OSPF se découvrent et forment des contiguïtés (table de voisinage, show ip ospf neighbor).
Échanger l'état des liens :: Chacun envoie ses LSA (réseaux connectés, état des interfaces, coûts) dans des paquets LSU. Tous les routeurs d'une zone ont la même base LSDB (la carte).
Calculer :: Chaque routeur lance SPF (Dijkstra) depuis sa propre position et obtient un arbre des plus courts chemins.
Remplir la table :: Les meilleures routes vont dans la table de routage (show ip route, marquées O). Distance administrative : 110.
```

| Vecteur de distance (RIP) | État de liens (OSPF) |
|---|---|
| connaît distance + direction | connaît toute la topologie de la zone |
| métrique : nombre de sauts | métrique : coût (lié au débit) |
| mises à jour périodiques | mises à jour seulement quand ça change |
| converge lentement | converge vite |
| simple | plus de mémoire et de calcul |

Atouts d'OSPF (diapo 66) : **sans classe** (VLSM, CIDR), **efficace**, **convergence rapide**, **évolutif** (découpage en zones), **sécurisé** (authentification MD5).

> [!prof] La diapo 66 dit que les routeurs acceptent « uniquement les mises à jour de routage **chiffrées** ». MD5 sert à **authentifier** (prouver que la mise à jour vient d'un voisin qui connaît le mot de passe), pas à chiffrer : le contenu reste lisible. Et la LSDB s'affiche avec `show ip ospf database` ; `show ip ospf` (diapo 69) donne les informations générales du processus.

```exercice Dijkstra
? {n65} Dans l'exemple du cours, quel est le coût du meilleur chemin de R2 vers le LAN de R3 ?
indice: Additionne les coûts des liens du chemin R2 → R1 → R3 → LAN.
= 20 + 5 + 2 = <b>27</b>.
reponse: 27
? {n65} Pourquoi chaque routeur OSPF a-t-il une table de routage différente alors que leur LSDB est identique ?
= Chacun lance SPF <b>depuis sa propre position</b> : même carte, mais point de départ différent, donc arbre des plus courts chemins différent.
```

## Idée 7 · Configurer OSPF à zone unique

Idée : trois réglages suffisent : lancer le processus, fixer l'ID du routeur, et dire quelles interfaces participent avec `network … masque-générique area 0`.

```text
R1(config)# router ospf 10
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 172.16.1.0 0.0.0.255 area 0
R1(config-router)# network 172.16.3.0 0.0.0.3 area 0
R1(config-router)# network 192.168.10.5 0.0.0.3 area 0
R1(config-router)# passive-interface g0/0
R1(config-router)# end
R1# show ip protocols
R1# show ip ospf neighbor
```

```etapes Les réglages, un par un
router ospf 10 :: Le process-id (1 à 65 535) est local : il peut être différent sur chaque routeur.
router-id 1.1.1.1 :: Un identifiant de 32 bits écrit comme une adresse IPv4. Il nomme le routeur dans la zone et départage l'élection du DR (priorité OSPF la plus haute, puis ID le plus haut).
Sans router-id :: Le routeur prend la plus haute adresse d'interface de bouclage, sinon la plus haute adresse d'interface active.
Changer l'ID :: Il ne s'applique qu'après clear ip ospf process (ou un redémarrage) : les contiguïtés sont renégociées.
network … area 0 :: Les interfaces dont l'adresse correspond participent. Même zone partout ; 0 est la bonne pratique en zone unique.
passive-interface g0/0 :: Pas de messages OSPF sur le LAN (aucun routeur à rencontrer), mais le réseau reste annoncé. Aucune contiguïté possible sur cette interface.
```

```etapes Calculer un masque générique (wildcard)
Règle :: 255.255.255.255 − masque de sous-réseau.
/24 :: 255.255.255.255 − 255.255.255.0 = 0.0.0.255.
/30 :: 255.255.255.255 − 255.255.255.252 = 0.0.0.3.
Lecture :: Un bit 0 = « vérifie ce bit », un bit 1 = « ignore-le ». C'est l'inverse d'un masque.
Une seule interface :: network 192.168.10.5 0.0.0.0 area 0 vise exactement cette adresse.
```

> [!retenir] `router ospf id` → `router-id` → `network réseau wildcard area 0` → `passive-interface` sur les LAN. Wildcard = 255.255.255.255 − masque. Distance administrative OSPF : 110.

```exercice OSPF
? {n65} Quel masque générique pour annoncer 10.1.4.0/22 ?
indice: /22 = 255.255.252.0.
= 255.255.255.255 − 255.255.252.0 = <b>0.0.3.255</b>.
? {n65} R1 a une loopback 1.1.1.1/32, une interface 192.168.10.5 et aucune commande router-id. Quel est son ID OSPF ?
indice: Ordre de choix : router-id, puis loopback la plus haute, puis interface active la plus haute.
= <b>1.1.1.1</b> : une interface de bouclage passe avant les interfaces physiques.
? {n65} Pourquoi déclarer l'interface du LAN en passive ?
= Aucun routeur OSPF n'est derrière : envoyer des Hello y est inutile (et donne des informations à n'importe quel PC). L'interface ne forme pas de voisinage mais son réseau reste annoncé.
```

## S'exercer

```exercice Synthèse du chapitre
? {n62} Un routeur reçoit un paquet pour 10.5.7.1. Sa table contient 10.0.0.0/8 via R2, 10.5.0.0/16 via R3 et 0.0.0.0/0 via R4. Où part le paquet ?
indice: Préfixe le plus long.
= Les trois correspondent ; le plus précis est <b>10.5.0.0/16</b> : le paquet part vers <b>R3</b>.
? {n63} Le routeur apprend 172.16.5.0/24 par RIP et par OSPF. Laquelle met-il dans sa table ?
= Celle d'<b>OSPF</b> : distance administrative 110 contre 120 pour RIP.
? {n61} Un paquet part avec un TTL de 3 et doit traverser 4 routeurs. Que se passe-t-il ?
= Le TTL vaut 2, 1, puis <b>0 au 3ᵉ routeur</b> : le paquet est éliminé avant la destination (et un ICMP « temps dépassé » est renvoyé à la source, c'est ce qu'utilise tracert).
```

## Flashcards

```cartes
{n61} Que fait un routeur à chaque paquet ? :: Lit la destination, cherche le préfixe le plus long, TTL − 1 (0 = éliminé), réencapsule vers le prochain saut.
{n61} Décalage de fragment : quelle unité ? :: Des blocs de 8 octets. 1480 octets de données = 185.
{n61} Qui réassemble les fragments ? :: La destination finale.
{n62} Les 4 types de routes statiques ? :: Standard, par défaut (0.0.0.0 0.0.0.0), récapitulative, flottante (distance administrative plus grande).
{n62} Route récursive ou reliée directement ? :: Récursive : on donne le prochain saut, 2 recherches. Reliée directement : on donne l'interface, 1 recherche.
{n63} IGP ou EGP ? :: IGP dans un même AS (RIP, EIGRP, OSPF, IS-IS). EGP entre AS : BGP (TCP 179).
{n63} Distances administratives ? :: Connecté 0, statique 1, EIGRP 90, OSPF 110, RIP 120.
{n64} Vecteur de distance ? :: Le routeur connaît la distance (sauts) et la direction, jamais le chemin complet.
{n64} Commandes RIPv2 ? :: router rip, version 2, network …, no auto-summary.
{n65} État de liens ? :: Toute la topologie de la zone (LSDB, via LSA dans des LSU), calcul SPF de Dijkstra par chaque routeur.
{n65} Les 3 tables d'OSPF ? :: Voisinage (show ip ospf neighbor), topologique LSDB (show ip ospf database), routage (show ip route).
{n65} Masque générique ? :: 255.255.255.255 − masque. 0 = vérifier le bit, 1 = l'ignorer.
```

## QCM du chapitre

```qcm
? {n61} Un routeur reçoit un paquet avec TTL = 1. Que fait-il ?
- Il le transmet avec TTL = 1
- Il le transmet avec TTL = 0
+ Il l'élimine
- Il le renvoie à la source sans modification
= TTL − 1 = 0 : le paquet est éliminé, pour éviter les boucles.

? {n61} 3980 octets de données sur une MTU de 1500 : quel est le décalage du 3ᵉ fragment ?
- 2960
+ 370
- 185
- 296
= 2 × 1480 = 2960 octets, soit 2960 / 8 = 370 blocs.

? {n61} Le drapeau MF du dernier fragment vaut…
+ 0
- 1
- le nombre de fragments
- la même valeur que DF
= MF = 1 tant que d'autres fragments suivent, 0 pour le dernier.

? {n62} La route statique par défaut s'écrit…
- ip route 255.255.255.255 0.0.0.0 …
+ ip route 0.0.0.0 0.0.0.0 …
- ip route default …
- ip default-network 0.0.0.0
= Destination 0.0.0.0 avec le masque 0.0.0.0 : correspond à toutes les adresses.

? {n62} Quelle route impose deux recherches dans la table ?
+ Une route avec l'adresse du prochain saut (récursive)
- Une route avec l'interface de sortie
- Un réseau directement connecté
- Une route OSPF
= Il faut d'abord trouver comment joindre le prochain saut pour connaître l'interface.

? {n62} Une route statique flottante se distingue par…
- son masque 0.0.0.0
+ une distance administrative plus grande que la route principale
- l'interface Loopback
- le mot-clé overload
= Elle n'apparaît que si la route principale (distance plus petite) disparaît.

? {n63} BGP est un protocole…
- à état de liens, à l'intérieur d'un AS
- à vecteur de distance, propriétaire Cisco
+ de routage entre systèmes autonomes (EGP)
- de couche 2
= BGP relie les AS d'Internet, selon des politiques, via TCP port 179.

? {n63} RIP et OSPF proposent chacun une route vers le même réseau. Le routeur garde…
- celle de RIP (120)
+ celle d'OSPF (110)
- les deux à égalité
- la plus ancienne
= La plus petite distance administrative gagne.

? {n64} La métrique de RIP est…
- le coût lié au débit
+ le nombre de sauts
- le délai
- la distance administrative
= RIP compte les routeurs à traverser.

? {n64} À quoi sert no auto-summary sous RIPv2 ?
- À activer RIPv2
+ À annoncer les vrais sous-réseaux au lieu du réseau avec classe
- À arrêter RIP
- À rendre une interface passive
= Par défaut RIPv2 résume aux frontières de classe ; no auto-summary l'en empêche.

? {n65} OSPF calcule ses meilleurs chemins avec l'algorithme…
- de Bellman-Ford
+ SPF de Dijkstra
- du saut par saut
- de Hamming
= Chaque routeur lance SPF (Dijkstra) sur la LSDB depuis sa position.

? {n65} Quel masque générique pour un réseau /30 dans une commande network OSPF ?
- 255.255.255.252
- 0.0.0.252
+ 0.0.0.3
- 0.0.0.255
= 255.255.255.255 − 255.255.255.252 = 0.0.0.3.
```

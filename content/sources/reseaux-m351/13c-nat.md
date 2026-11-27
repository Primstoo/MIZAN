---
id: nat
titre: Ch5 · NAT : traduction d'adresses
seance: Chapitre 5
importance: 5
---

## Avant de commencer

Il te faut deux choses : savoir qu'une adresse comme **192.168.x.x** est **privée** (elle n'existe pas sur Internet), et savoir qu'un routeur a une interface de chaque côté (vers le réseau local, vers l'extérieur).

```exercice Vérifie ton prérequis
? {n52} PC1 a l'adresse 192.168.10.10. Peut-il recevoir directement un paquet envoyé depuis Internet à 192.168.10.10 ?
indice: Les routeurs d'Internet ont-ils une route vers 192.168.0.0/16 ?
= **Non.** 192.168.0.0/16 fait partie des plages **privées** (avec 10.0.0.0/8 et 172.16.0.0/12). Des milliers de réseaux locaux utilisent les mêmes : les routeurs d'Internet ne les acheminent jamais.
Pour sortir sur Internet, PC1 doit donc emprunter une adresse **publique**. C'est le rôle du NAT.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « déguisement ».** Le routeur NAT déguise l'adresse privée en adresse publique à la sortie, note le déguisement dans sa table, et enlève le déguisement au retour. Tout le chapitre (types, commandes, vérification) répond à trois questions : qui est déguisé, avec quelle adresse, et comment le routeur s'en souvient.

> [!piege] Mélanger les quatre noms d'adresses. « Locale / globale » dit **d'où on regarde** (de l'intérieur ou de l'extérieur). « Interne / externe » dit **à qui appartient l'adresse** (une machine de chez nous ou la machine d'en face). Presque toutes les erreurs d'examen viennent de là.

À la fin, tu sais remplir une table NAT, choisir entre NAT statique, dynamique et PAT, écrire leur configuration Cisco et lire `show ip nat translations`.

## Idée 1 · Le NAT remplace l'adresse privée à la frontière

```html
<svg viewBox="0 0 660 250" style="width:100%;max-width:680px;display:block;margin:10px auto" role="img" aria-label="Réseau du cours. PC1 192.168.10.10 et PC2 192.168.11.10 sont reliés à R1, lui-même relié à R2 par le lien 10.1.1.0/30. R2 est le routeur NAT, à la frontière entre le réseau interne et Internet. Le paquet de PC1 part avec la source 192.168.10.10 ; après R2, sa source devient 209.165.200.226. Le serveur Web est en 209.165.201.1.">
<g font-family="sans-serif" font-size="13" fill="currentColor" stroke-linecap="round">
<rect x="10" y="30" width="345" height="200" rx="8" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/>
<text x="20" y="22" stroke="none" font-weight="700">Réseau interne (adresses privées)</text>
<text x="420" y="22" stroke="none" font-weight="700">Externe (Internet)</text>
<line x1="380" y1="30" x2="380" y2="230" stroke="#D9824F" stroke-width="2" stroke-dasharray="6 5"/>
<rect x="24" y="60" width="44" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="46" y="78" text-anchor="middle" stroke="none">PC1</text>
<text x="24" y="104" stroke="none">192.168.10.10</text>
<rect x="24" y="160" width="44" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="46" y="178" text-anchor="middle" stroke="none">PC2</text>
<text x="24" y="204" stroke="none">192.168.11.10</text>
<line x1="70" y1="76" x2="152" y2="120" stroke="currentColor" stroke-width="1.6"/>
<line x1="70" y1="172" x2="152" y2="136" stroke="currentColor" stroke-width="1.6"/>
<circle cx="170" cy="128" r="18" fill="none" stroke="currentColor" stroke-width="2.2"/><text x="170" y="132" text-anchor="middle" stroke="none" font-weight="700">R1</text>
<line x1="188" y1="128" x2="342" y2="128" stroke="currentColor" stroke-width="1.6"/>
<text x="265" y="120" text-anchor="middle" stroke="none">10.1.1.0/30</text>
<circle cx="380" cy="128" r="20" fill="none" stroke="#D9824F" stroke-width="2.6"/><text x="380" y="132" text-anchor="middle" stroke="none" font-weight="700" fill="#D9824F">R2</text>
<text x="380" y="166" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">routeur NAT</text>
<line x1="400" y1="128" x2="560" y2="128" stroke="currentColor" stroke-width="1.6"/>
<rect x="566" y="110" width="80" height="36" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="606" y="132" text-anchor="middle" stroke="none">Serveur</text>
<text x="606" y="164" text-anchor="middle" stroke="none">209.165.201.1</text>
<text x="265" y="62" text-anchor="middle" stroke="none">source : 192.168.10.10</text>
<text x="480" y="62" text-anchor="middle" stroke="none" fill="#D9824F" font-weight="700">source : 209.165.200.226</text>
<line x1="200" y1="72" x2="360" y2="72" stroke="currentColor" stroke-width="1.4" marker-end="url(#fl5)"/>
<line x1="400" y1="72" x2="560" y2="72" stroke="#D9824F" stroke-width="1.8" marker-end="url(#fl5)"/>
<defs><marker id="fl5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
</g>
</svg>
```

Le NAT (Network Address Translation) **modifie l'adresse IP d'un paquet** quand il traverse le routeur entre le réseau local et Internet. Il existe pour trois raisons : il manque d'adresses IPv4 publiques, il cache les adresses internes, et il permet à tout un réseau de sortir avec **une seule** adresse publique.

```etapes Un aller-retour PC1 → serveur Web
Départ :: PC1 envoie le paquet : source 192.168.10.10, destination 209.165.201.1. R1 le passe à R2.
Traduction :: R2 vérifie que la source fait partie des adresses à traduire, la remplace par 209.165.200.226 et **note le couple** dans sa table NAT.
Envoi :: Le paquet part sur Internet avec la source 209.165.200.226. Le serveur ne voit jamais 192.168.10.10.
Réponse :: Le serveur répond à 209.165.200.226.
Traduction inverse :: R2 trouve 209.165.200.226 dans sa table, remet 192.168.10.10 en destination et transmet à PC1.
```

> [!retenir] Sans table NAT, pas de retour. C'est elle qui permet à R2 de savoir à quelle machine interne rendre la réponse.

**Ce que le NAT apporte, et ses limites.** Il économise les adresses publiques et rend les machines internes injoignables directement depuis Internet. Mais il **ne remplace pas un pare-feu** : il ne filtre pas le trafic. Et il gêne les applications qui ont besoin de connexions entrantes : VoIP, jeux en ligne, P2P.

> [!attention] **Dans les diapos (diapo 13)** : il est écrit que R2 « lit l'adresse IPv4 de destination » pour décider s'il traduit, puis la phrase suivante parle de l'adresse **source**. Pour un paquet qui sort, c'est bien la **source** que R2 compare à la liste des adresses à traduire (l'ACL, Idée 5).

## Idée 2 · Les quatre noms d'adresses

```html
<svg viewBox="0 0 560 230" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Tableau deux sur deux. Lignes : interne (l'adresse de PC1) et externe (l'adresse du serveur). Colonnes : locale (vue de l'intérieur) et globale (vue de l'extérieur). Locale interne 192.168.10.10, globale interne 209.165.200.226, locale externe 209.165.201.1, globale externe 209.165.201.1. Seule la case globale interne change grâce au NAT.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<text x="270" y="22" text-anchor="middle" font-weight="700">Locale</text><text x="270" y="40" text-anchor="middle">vue de l'intérieur</text>
<text x="450" y="22" text-anchor="middle" font-weight="700">Globale</text><text x="450" y="40" text-anchor="middle">vue de l'extérieur</text>
<text x="10" y="94" font-weight="700">Interne</text><text x="10" y="112">l'adresse de PC1</text>
<text x="10" y="174" font-weight="700">Externe</text><text x="10" y="192">l'adresse du serveur</text>
<rect x="180" y="56" width="180" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="270" y="90" text-anchor="middle" font-weight="700">192.168.10.10</text><text x="270" y="110" text-anchor="middle">locale interne</text>
<rect x="370" y="56" width="180" height="76" rx="6" fill="none" stroke="#D9824F" stroke-width="2.6"/>
<text x="460" y="90" text-anchor="middle" font-weight="700" fill="#D9824F">209.165.200.226</text><text x="460" y="110" text-anchor="middle" fill="#D9824F">globale interne</text>
<rect x="180" y="142" width="180" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="270" y="176" text-anchor="middle" font-weight="700">209.165.201.1</text><text x="270" y="196" text-anchor="middle">locale externe</text>
<rect x="370" y="142" width="180" height="76" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="460" y="176" text-anchor="middle" font-weight="700">209.165.201.1</text><text x="460" y="196" text-anchor="middle">globale externe</text>
</g>
</svg>
```

Lis chaque nom en deux morceaux : **interne / externe** = la machine (chez nous ou en face), **locale / globale** = le côté d'où on regarde.

| Nom | De quelle machine ? | Vue d'où ? | Exemple du cours |
|---|---|---|---|
| Locale interne (inside local) | PC1 | de l'intérieur | 192.168.10.10 |
| Globale interne (inside global) | PC1 | d'Internet | 209.165.200.226 |
| Locale externe (outside local) | le serveur | de l'intérieur | 209.165.201.1 |
| Globale externe (outside global) | le serveur | d'Internet | 209.165.201.1 |

> [!retenir] Le NAT du cours ne traduit que l'adresse de **notre** machine : seule la **globale interne** diffère de la locale interne. Locale externe et globale externe sont presque toujours identiques.

**SNAT et DNAT.** Le **SNAT** change l'adresse **source** (un PC interne sort sur Internet). Le **DNAT** change l'adresse **destination** (un client d'Internet est renvoyé vers un serveur interne).

| | Avant | Après |
|---|---|---|
| SNAT (sortie) | src 192.168.10.10 → dst 209.165.201.1 | src **209.165.200.226** → dst 209.165.201.1 |
| DNAT (entrée) | src 209.165.201.1 → dst 209.165.200.226 | src 209.165.201.1 → dst **192.168.10.10** |

## Idée 3 · Trois types de NAT

| Type | Association | Pour quoi ? | Exemple |
|---|---|---|---|
| **NAT statique** | 1 : 1, fixe | un serveur interne joignable depuis Internet | 192.168.10.254 ↔ toujours 209.165.201.5 |
| **NAT dynamique** | m : n (m > n), pool d'adresses publiques | des PC qui sortent, adresse prise au premier arrivé | 192.168.10.12 → la 1ʳᵉ adresse libre du pool |
| **PAT** (NAT avec surcharge) | m : 1, une seule adresse publique | tout un réseau derrière une adresse ; le plus utilisé (box, entreprises) | 192.168.10.10:1444 → 209.165.200.225:1444 |

```flux NAT statique : toujours la même adresse
Svr1 192.168.10.10 -> R2 (table fixe) -> 209.165.200.226, même au millième paquet
```

```flux NAT dynamique : on puise dans un pool
PC3 192.168.10.12 sort -> R2 prend la 1ʳᵉ adresse libre du pool (209.165.200.226 à .230) -> la garde tant que l'entrée vit
```

> [!piege] Le NAT dynamique n'est **pas** fait pour plusieurs PC en même temps sur une seule adresse : c'est 1 PC = 1 adresse du pool. Si le pool compte 5 adresses et qu'un 6ᵉ PC veut sortir, il attend qu'une entrée expire (son paquet est rejeté). Pour partager une adresse, il faut le **PAT**.

## Idée 4 · Le PAT distingue les machines par le port

```html
<svg viewBox="0 0 640 200" style="width:100%;max-width:680px;display:block;margin:10px auto" role="img" aria-label="PAT. PC1 192.168.10.10 port 1444 et PC2 192.168.10.11 port 1444 sortent tous les deux par R2 avec la même adresse 209.165.200.225. R2 garde le port 1444 pour PC1 et prend le port 1445 pour PC2, car 1444 est déjà utilisé.">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="10" y="30" width="200" height="44" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="110" y="50" text-anchor="middle" font-weight="700">PC1</text><text x="110" y="66" text-anchor="middle">192.168.10.10 : 1444</text>
<rect x="10" y="120" width="200" height="44" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/>
<text x="110" y="140" text-anchor="middle" font-weight="700">PC2</text><text x="110" y="156" text-anchor="middle">192.168.10.11 : 1444</text>
<line x1="212" y1="52" x2="290" y2="94" stroke="currentColor" stroke-width="1.6"/>
<line x1="212" y1="142" x2="290" y2="106" stroke="currentColor" stroke-width="1.6"/>
<circle cx="310" cy="100" r="20" fill="none" stroke="#D9824F" stroke-width="2.6"/><text x="310" y="104" text-anchor="middle" font-weight="700" fill="#D9824F">R2</text>
<line x1="332" y1="94" x2="410" y2="52" stroke="currentColor" stroke-width="1.6"/>
<line x1="332" y1="106" x2="410" y2="142" stroke="currentColor" stroke-width="1.6"/>
<rect x="412" y="30" width="218" height="44" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="521" y="50" text-anchor="middle">vers Svr1 209.165.201.1:80</text><text x="521" y="66" text-anchor="middle" font-weight="700" fill="#D9824F">209.165.200.225 : 1444</text>
<rect x="412" y="120" width="218" height="44" rx="5" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="521" y="140" text-anchor="middle">vers Svr2 209.165.202.129:80</text><text x="521" y="156" text-anchor="middle" font-weight="700" fill="#D9824F">209.165.200.225 : 1445</text>
<text x="310" y="190" text-anchor="middle">même adresse publique, ports différents</text>
</g>
</svg>
```

Avec une seule adresse publique, R2 ne peut plus reconnaître les machines par leur IP. Il ajoute donc le **numéro de port source** à chaque entrée de sa table.

| Globale interne | Locale interne | Locale externe | Globale externe |
|---|---|---|---|
| 209.165.200.225:**1444** | 192.168.10.10:1444 | 209.165.201.1:80 | 209.165.201.1:80 |
| 209.165.200.225:**1445** | 192.168.10.11:1444 | 209.165.202.129:80 | 209.165.202.129:80 |

```etapes Ce que fait R2 (diapos 39 et 40)
PC1 sort :: Source 192.168.10.10:1444. Le port 1444 est libre sur l'adresse publique : R2 le **garde** → 209.165.200.225:1444.
PC2 sort :: Source 192.168.10.11:1444. Le port 1444 est déjà pris : R2 en **choisit un autre**, 1445 → 209.165.200.225:1445.
Svr2 répond :: Destination 209.165.200.225:1445. R2 lit la ligne « 1445 » et rend le paquet à 192.168.10.11:1444.
```

> [!retenir] PAT = adresse **et port**. R2 garde le port d'origine s'il est libre, sinon il en prend un autre. C'est le couple (adresse, port) qui rend chaque ligne unique.

> [!attention] Les diapos 20-21 utilisent 209.165.200.**226** et les diapos 36-40 209.165.200.**225** : ce ne sont pas des erreurs, ce sont deux exemples différents. 226 est une adresse prise dans un **pool**, 225 est l'adresse de **l'interface** Serial0/1/0 de R2 (PAT « adresse unique »).

## Idée 5 · Configurer le NAT sur un routeur Cisco

Trois briques reviennent dans toutes les configurations :

- **inside / outside** : on marque chaque interface. `ip nat inside` côté réseau local, `ip nat outside` côté Internet. Sans ces deux marques, rien n'est traduit.
- **l'ACL** : la liste des adresses **sources** à traduire. `access-list 1 permit 192.168.0.0 0.0.255.255`.
- **la règle** `ip nat inside source …`, qui dit avec quoi traduire.

> [!astuce] Le masque de l'ACL est un **masque générique** (wildcard) : c'est l'inverse du masque réseau. 0 = « ce bit doit correspondre », 1 = « peu importe ». 0.0.255.255 est l'inverse de 255.255.0.0 : il accepte toute adresse 192.168.x.x. (Le cours donne la commande sans détailler ce point.)

**NAT statique** (diapo 25 : le serveur Web 192.168.10.254 est publié en 209.165.201.5) :

```text
R2(config)# ip nat inside source static 192.168.10.254 209.165.201.5
R2(config)# interface Serial0/0/0
R2(config-if)# ip address 10.1.1.2 255.255.255.252
R2(config-if)# ip nat inside
R2(config-if)# exit
R2(config)# interface Serial0/1/0
R2(config-if)# ip address 209.165.200.225 255.255.255.224
R2(config-if)# ip nat outside
```

Pas d'ACL : la correspondance est écrite à la main. Pour la supprimer : `no ip nat inside source static 192.168.10.254 209.165.201.5`.

**NAT dynamique** (diapo 32) :

```etapes Les 5 étapes du NAT dynamique
1. Le pool :: ip nat pool NAT-POOL1 209.165.200.226 209.165.200.240 netmask 255.255.255.224 (ou prefix-length 27)
2. L'ACL :: access-list 1 permit 192.168.0.0 0.0.255.255
3. La règle :: ip nat inside source list 1 pool NAT-POOL1
4. L'interface interne :: interface Serial0/0/0 puis ip nat inside
5. L'interface externe :: interface Serial0/1/0 puis ip nat outside
```

**PAT** : la même chose avec le mot-clé **overload**, qui active la surcharge.

| PAT avec… | Commande clé (étape 3) |
|---|---|
| un pool d'adresses | `ip nat inside source list 1 pool NAT-POOL2 overload` |
| l'adresse de l'interface externe | `ip nat inside source list 1 interface Serial0/1/0 overload` |

La version « adresse unique » n'a **pas de pool** : elle emprunte l'adresse de l'interface de sortie (ici 209.165.200.225). C'est ce que fait ta box Internet.

> [!piege] Oublier `overload`. La règle devient alors du NAT dynamique un pour un : le 16ᵉ PC (pool de 15 adresses) ne sort plus.

> [!attention] **Erreurs dans les diapos.** Diapo 32 : la dernière annotation dit « Identifiez l'interface série 0/0/0 comme interne » au-dessus de `interface Serial0/1/0` et `ip nat outside`. Il faut lire **0/1/0 externe**. Diapos 31 et 34 : « prefix-legth » s'écrit **prefix-length**. Diapo 29 : la première sortie indique l'interface externe Serial0/0/**1**, la seconde Serial0/**1**/0, qui est la bonne dans cet exemple.

## Idée 6 · Vérifier

| Commande | Ce qu'elle montre |
|---|---|
| `show ip nat translations` | les traductions actives, une ligne par entrée |
| `show ip nat translations verbose` | en plus : date de création, dernière utilisation, délai d'expiration |
| `show ip nat statistics` | nombre de traductions (static / dynamic / extended), interfaces inside et outside, Hits et Misses |
| `clear ip nat statistics` | remet les compteurs à zéro |

Une entrée **statique** est toujours là, même sans trafic. Les colonnes « Outside » ne se remplissent que pendant une session :

```text
R2# show ip nat translations
Pro Inside global   Inside local     Outside local    Outside global
--- 209.165.201.5   192.168.10.254   ---              ---
```

```text
R2# show ip nat translations
Pro Inside global   Inside local     Outside local    Outside global
--- 209.165.201.5   192.168.10.254   209.165.200.254  209.165.200.254
```

Dans `show ip nat statistics`, **Hits** compte les paquets traduits avec une entrée existante. Il passe de 0 à 5 dans l'exemple du cours après la connexion du client. Une entrée **dynamique** expire si elle ne sert plus : `timeout:86400000` dans la sortie verbose, en millisecondes, soit **24 h**.

## Résumé du cours

| Type | Principe | IP privée | IP publique | Usage |
|---|---|---|---|---|
| NAT statique (1:1) | une IP privée ↔ toujours la même IP publique | 192.168.1.10 | 203.0.113.5 | serveur interne joignable depuis Internet |
| NAT dynamique (M:N, M > N) | IP prise dans un pool à la connexion | 192.168.1.2 / .3 | 203.0.113.10 / .11 | PC qui sortent, adresse pas fixe |
| PAT (M:1) | une IP publique partagée, distinction par le port | 192.168.1.2 / .3 / .4 | 203.0.113.50:10001 / :10002 / :10003 | réseaux domestiques et d'entreprise |

> [!prof] La conclusion du cours dit que « le NAT » permet à plusieurs machines de sortir avec une seule adresse publique : c'est vrai du **PAT** en particulier. En examen, précise le type.

## S'exercer

```exercice Table NAT et types
? {n52} PC2 (192.168.11.10) ouvre une page sur 209.165.201.1. R2 lui attribue 209.165.200.227. Donne les quatre adresses de la ligne de la table NAT.
indice: Interne = PC2, externe = le serveur. Seule l'adresse de PC2 vue de l'extérieur change.
= **Globale interne** 209.165.200.227 · **Locale interne** 192.168.11.10 · **Locale externe** 209.165.201.1 · **Globale externe** 209.165.201.1.
Locale et globale externes sont identiques : le NAT ne touche pas à l'adresse du serveur.
? {n52} Le serveur Web répond à PC2. Avant et après R2, quelles sont les adresses source et destination du paquet ?
indice: C'est la traduction inverse : R2 modifie la destination.
= Avant R2 : source 209.165.201.1, destination **209.165.200.227**.
Après R2 : source 209.165.201.1, destination **192.168.11.10**.
Vu depuis Internet, c'est du DNAT au retour : R2 change l'adresse de destination grâce à sa table.
? {n53} Une entreprise a un serveur Web interne (192.168.10.254) qui doit être joignable depuis Internet, et 200 PC qui naviguent avec une seule adresse publique. Quel type de NAT pour chacun ?
= **Serveur : NAT statique.** Les clients d'Internet doivent toujours le trouver à la même adresse publique (209.165.201.5 dans le cours).
**PC : PAT.** 200 machines, 1 adresse : seul le port permet de les distinguer. Le NAT dynamique demanderait autant d'adresses publiques que de PC connectés en même temps.
? {n54} Combien d'adresses publiques contient le pool `ip nat pool NAT-POOL1 209.165.200.226 209.165.200.240 netmask 255.255.255.224` ?
indice: Compte de 226 à 240, bornes comprises.
reponse: 15
= 240 − 226 + 1 = **15 adresses**. Le masque /27 (bloc 209.165.200.224 à .255) indique seulement le réseau auquel elles appartiennent.
En NAT dynamique sans overload, 15 machines au maximum peuvent sortir en même temps.
```

```exercice Configuration
? {n54} Écris la configuration du NAT statique qui publie un serveur 192.168.10.254 sous l'adresse 209.165.201.5. Interne : Serial0/0/0, externe : Serial0/1/0.
indice: Une règle « static », puis on marque les deux interfaces.
= <pre><code>R2(config)# ip nat inside source static 192.168.10.254 209.165.201.5
R2(config)# interface Serial0/0/0
R2(config-if)# ip nat inside
R2(config-if)# exit
R2(config)# interface Serial0/1/0
R2(config-if)# ip nat outside</code></pre>
Pas de pool ni d'ACL : la correspondance est fixée à la main.
? {n55} Écris la configuration PAT qui fait sortir tout 192.168.0.0/16 avec l'adresse de l'interface Serial0/1/0.
indice: ACL, règle avec « interface … overload », puis inside / outside.
= <pre><code>R2(config)# access-list 1 permit 192.168.0.0 0.0.255.255
R2(config)# ip nat inside source list 1 interface Serial0/1/0 overload
R2(config)# interface Serial0/0/0
R2(config-if)# ip nat inside
R2(config-if)# exit
R2(config)# interface Serial0/1/0
R2(config-if)# ip nat outside</code></pre>
**overload** active le PAT. Sans lui, une seule machine pourrait sortir à la fois (une seule adresse disponible).
? {n54} Un étudiant a tapé le pool, l'ACL et `ip nat inside source list 1 pool NAT-POOL1`, mais rien n'est traduit. `show ip nat statistics` affiche « Inside interfaces: » vide. Que manque-t-il ?
= Il a oublié de marquer l'interface interne : `interface Serial0/0/0` puis `ip nat inside`. Le routeur ne traduit que les paquets qui **entrent par une interface inside** et **sortent par une interface outside**. Vérifie aussi `ip nat outside` sur Serial0/1/0.
```

```exercice PAT
? {n55} Avec le PAT sur 209.165.200.225, un 3ᵉ poste (192.168.10.12) ouvre une connexion avec le port source 1444 vers 209.165.201.1:80, alors que les deux lignes de l'Idée 4 existent déjà. Quelle ligne R2 ajoute-t-il, au plus probable ?
indice: Les ports 1444 et 1445 sont déjà pris sur l'adresse publique.
= Globale interne **209.165.200.225:1446** · locale interne 192.168.10.12:1444 · locale et globale externes 209.165.201.1:80.
R2 ne peut garder ni 1444 ni 1445 (déjà utilisés). Il prend un autre port libre ; 1446 est le plus probable, mais le numéro exact dépend du routeur. Ce qui compte : un port **unique** sur l'adresse publique.
? {n56} Dans `show ip nat statistics`, « Hits: 0 » passe à « Hits: 5 » après la connexion du client. Que signifie ce chiffre ?
= 5 paquets ont été traduits en utilisant une **entrée déjà présente** dans la table NAT (ici l'entrée statique du serveur). « Misses » compte les fois où aucune entrée n'existait et où le routeur a dû en créer une.
```

## Flashcards

```cartes
{n52} NAT : définition en une phrase ? :: Mécanisme qui modifie l'adresse IP d'un paquet quand il traverse le routeur entre le réseau local et Internet.
{n52} Pourquoi le NAT ? :: Manque d'adresses IPv4 publiques, adresses internes cachées, tout un réseau derrière une seule adresse publique.
{n52} Plages d'adresses privées ? :: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
{n52} Locale interne / globale interne ? :: L'adresse de NOTRE machine vue de l'intérieur (192.168.10.10) / vue d'Internet (209.165.200.226).
{n52} Locale externe / globale externe ? :: L'adresse de la machine d'en face vue de l'intérieur / vue d'Internet. Presque toujours identiques.
{n52} SNAT vs DNAT ? :: SNAT change l'adresse source (sortie vers Internet). DNAT change l'adresse destination (entrée vers un serveur interne).
{n52} Le NAT est-il un pare-feu ? :: Non. Il cache les adresses internes mais ne filtre pas le trafic.
{n53} NAT statique / dynamique / PAT ? :: Statique 1:1 fixe (serveurs). Dynamique m:n avec un pool, 1er arrivé 1er servi. PAT m:1, distinction par le port.
{n54} Les 3 briques d'une configuration NAT ? :: ip nat inside / ip nat outside sur les interfaces, une ACL des sources à traduire, la règle ip nat inside source …
{n54} Commande NAT statique ? :: ip nat inside source static LOCALE-INTERNE GLOBALE-INTERNE
{n54} Commandes NAT dynamique ? :: ip nat pool NOM DÉBUT FIN netmask MASQUE\naccess-list 1 permit 192.168.0.0 0.0.255.255\nip nat inside source list 1 pool NOM
{n55} Quel mot-clé active le PAT ? :: overload
{n55} PAT avec l'adresse de l'interface ? :: ip nat inside source list 1 interface Serial0/1/0 overload
{n56} Afficher les traductions actives ? :: show ip nat translations (ajoute verbose pour les délais)
{n56} Afficher les compteurs du NAT ? :: show ip nat statistics (remise à zéro : clear ip nat statistics)
```

## QCM du chapitre

```qcm
? {n52} Quel est le rôle principal du NAT ?
- chiffrer les paquets qui sortent vers Internet
+ remplacer l'adresse IP privée par une adresse publique à la sortie, et inversement au retour
- attribuer automatiquement des adresses aux PC du réseau local
- choisir le meilleur chemin vers Internet
= Attribuer les adresses, c'est DHCP ; choisir le chemin, c'est le routage. Le NAT traduit les adresses.

? {n52} Dans l'exemple du cours, 192.168.10.10 est l'adresse…
+ locale interne de PC1
- globale interne de PC1
- locale externe du serveur
- globale externe du serveur
= C'est l'adresse de notre machine (interne) vue depuis le réseau local (locale).

? {n52} PC1 (192.168.10.10) est traduit en 209.165.200.226 pour joindre 209.165.201.1. Quelle est l'adresse globale interne ?
- 192.168.10.10
+ 209.165.200.226
- 209.165.201.1
- 10.1.1.2
= Globale interne = l'adresse de PC1 telle qu'Internet la voit.

? {n52} Un client d'Internet envoie un paquet à 209.165.200.226 et R2 change la destination en 192.168.10.10. C'est…
- du SNAT
+ du DNAT
- du PAT
- du routage statique
= DNAT = Destination NAT : l'adresse de destination est modifiée.

? {n53} Quel type de NAT pour un serveur Web interne qui doit toujours être joignable à la même adresse publique ?
+ NAT statique
- NAT dynamique
- PAT avec pool
- aucun, un serveur n'a pas besoin de NAT
= 1:1 fixe : les clients d'Internet le trouvent toujours à la même adresse.

? {n53} Un pool de 5 adresses publiques en NAT dynamique (sans overload). Un 6ᵉ PC veut sortir alors que les 5 adresses sont prises. Que se passe-t-il ?
- il partage l'adresse du 5ᵉ PC grâce au port
+ il ne peut pas sortir tant qu'aucune adresse n'est libérée
- R2 crée une 6ᵉ adresse publique
- il sort avec son adresse privée
= En NAT dynamique, une adresse du pool = une machine. Partager une adresse, c'est le PAT.

? {n55} Comment le PAT distingue-t-il deux PC qui sortent avec la même adresse publique ?
- par leur adresse MAC
+ par le numéro de port source
- par le TTL des paquets
- il ne les distingue pas
= Chaque entrée de la table est un couple (adresse, port) unique.

? {n55} PC1 sort avec le port 1444 → 209.165.200.225:1444. PC2 sort aussi avec le port 1444. Que fait R2 ?
- il rejette le paquet de PC2
- il réutilise 209.165.200.225:1444 pour les deux
+ il attribue un autre port à PC2, par exemple 209.165.200.225:1445
- il donne à PC2 une autre adresse publique
= Le port 1444 étant déjà pris sur l'adresse publique, R2 en choisit un autre (1445 dans le cours).

? {n55} Quel mot-clé transforme une règle de NAT dynamique en PAT ?
- static
- pool
+ overload
- extendable
= ip nat inside source list 1 pool NAT-POOL2 overload

? {n54} Dans `access-list 1 permit 192.168.0.0 0.0.255.255`, quelles adresses sont traduites ?
- seulement 192.168.0.0
- 192.168.0.0 à 192.168.0.255
+ toutes les adresses 192.168.x.x
- toutes les adresses sauf 192.168.x.x
= 0.0.255.255 est un masque générique : les deux derniers octets peuvent valoir n'importe quoi.

? {n54} Que fait `ip nat inside` sur une interface ?
- il active le NAT statique
+ il indique que l'interface est du côté du réseau local
- il donne une adresse privée à l'interface
- il crée le pool d'adresses
= Le routeur traduit les paquets qui passent d'une interface inside à une interface outside.

? {n54} Quelle commande crée une traduction statique de 192.168.10.254 vers 209.165.201.5 ?
- ip nat outside source static 209.165.201.5 192.168.10.254
+ ip nat inside source static 192.168.10.254 209.165.201.5
- ip nat pool static 192.168.10.254 209.165.201.5
- ip nat inside source list 1 static 209.165.201.5
= Ordre : d'abord la locale interne, ensuite la globale interne.

? {n56} Quelle commande affiche les traductions NAT actives ?
- show ip route nat
+ show ip nat translations
- show nat table
- show ip interface brief
= Ajoute verbose pour voir création, utilisation et délai d'expiration.

? {n56} Avant toute connexion, `show ip nat translations` affiche déjà une ligne 209.165.201.5 / 192.168.10.254 avec « --- » côté Outside. Pourquoi ?
- le NAT est mal configuré
+ c'est une traduction statique : elle est toujours présente dans la table
- un client est déjà connecté
- c'est une entrée dynamique qui n'a pas encore expiré
= Les colonnes Outside ne se remplissent qu'une fois une session ouverte.
```

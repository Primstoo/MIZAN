---
id: internet-web
titre: Internet et le Web
seance: Séquence 3
importance: 5
---

## Avant de commencer

Il faut savoir ce qu'est un périphérique d'entrée-sortie comme le **routeur** (séquence 1) : il revient ici comme pièce clé d'Internet.

```exercice Vérifie ton prérequis
? Le routeur est-il un périphérique d'entrée, de sortie ou d'entrée-sortie ?
= D'entrée-sortie : il reçoit et envoie des données.
```

## Comment aborder ce chapitre

> [!astuce] **Internet** est la route, **le Web** est un service qui roule dessus (comme l'e-mail). Garde cette image.

> [!piege] Dire « Internet = Web ». Le Web (1991, Tim Berners-Lee) est arrivé 20 ans après ARPANET (1971).

À la fin, tu sais dater les étapes d'Internet, expliquer IP, DNS et routeurs, et décrire une URL et le trio HTML/CSS/JavaScript.

## Idée 1 · L'histoire d'Internet

```etapes Les grandes dates
1971 · ARPANET :: réseau américain (Guerre froide) qui multiplie les chemins pour survivre à une attaque
1971 · e-mail :: premier courrier électronique, par Tomlinson
1983 :: adoption du mot « Internet » (interconnexion de réseaux)
1984 → 1989 :: de 1 000 à 100 000 ordinateurs connectés (usage scientifique)
1991 · Web :: inventé par Tim Berners-Lee
1993 / 1995 :: navigateurs Mosaic puis Internet Explorer
1995 / 1998 :: moteurs de recherche Yahoo puis Google
1996 :: 36 millions d'ordinateurs connectés
Années 2000 :: Web 2.0, les utilisateurs créent du contenu (Facebook, Twitter, LinkedIn)
Années 2010 :: mobilité, smartphones
Aujourd'hui :: Internet des objets (IoT)
```

> [!retenir] Web 1.0 = contenu **statique** ; Web 2.0 = les utilisateurs **créent et partagent**.

## Idée 2 · IP, DNS, routeurs

```flux Ce qui se passe quand tu tapes www.google.com
Navigateur -> Serveur DNS (nom → adresse IP) -> Routeurs (tables de routage) -> Serveur de Google
```

| Notion | Rôle | Exemple |
|---|---|---|
| **Adresse IP** | identifiant unique d'un appareil | IPv4 : 203.0.113.45 |
| **IPv4** | 4 nombres, ~4,3 milliards d'adresses, en voie d'épuisement | 203.0.113.45 |
| **IPv6** | format long, résout la pénurie | 2001:0db8:85a3:0000:0000:8a2e:0370:7334 |
| **DNS** | traduit un nom de domaine en adresse IP | www.google.com → IP |
| **Routeur** | relie les réseaux et achemine les paquets | choisit le chemin le plus court et fiable |

> [!attention] Complément hors support : 4,3 milliards vient de 2³² (adresses IPv4 sur 32 bits). IPv6 utilise 128 bits.

## Idée 3 · Le Web : client, serveur, URL

Le **client** (navigateur) envoie une requête ; le **serveur** la traite et renvoie la ressource.

```flux Une URL décortiquée
https:// (protocole) -> www.fsabm.ma (nom de domaine) -> /cours/s1 (chemin)
```

> [!attention] L'adresse www.fsabm.ma est un exemple de construction d'URL, pas une adresse vérifiée.

- **HTTP** : protocole standard d'échange sur le Web.
- **HTTPS** : version sécurisée, **chiffrée** (confidentialité et intégrité). À exiger pour mots de passe et paiements.

## Idée 4 · HTML, CSS, JavaScript

| Langage | Rôle | Image |
|---|---|---|
| **HTML** | structure : titres, paragraphes, images | le squelette |
| **CSS** | apparence : couleurs, polices, marges | les vêtements |
| **JavaScript** | interactivité | les muscles |

```html
<p style="color:#D9824F">Bonjour</p>
```

Ici, `<p>` est du HTML (un paragraphe) et `color:#D9824F` du CSS (la couleur).

## S'exercer

```exercice Exercices
? Quel système traduit « www.google.com » en adresse IP ?
reponse: DNS
= Le DNS (Domain Name System).

? Pourquoi a-t-on créé IPv6 ?
= Parce que les ~4,3 milliards d'adresses IPv4 sont en voie d'épuisement.

? Dans https://www.exemple.com/page, donne le protocole, le domaine et le chemin.
= Protocole : https. Domaine : www.exemple.com. Chemin : /page.
```

## Flashcards

```cartes
ARPANET :: 1971, réseau américain de la Guerre froide, ancêtre d'Internet
Premier e-mail :: 1971, Tomlinson
Mot « Internet » :: Adopté en 1983
Inventeur du Web :: Tim Berners-Lee, 1991
Google :: Lancé en 1998 (Yahoo en 1995)
DNS :: Traduit un nom de domaine en adresse IP
HTTPS :: HTTP sécurisé par chiffrement
CSS :: Contrôle l'apparence (couleurs, polices, marges)
```

## QCM du chapitre

```qcm
? En quelle année ARPANET a-t-il été créé (selon le cours) ?
- 1945
+ 1971
- 1991
= En pleine Guerre froide, par les États-Unis.

? Qui a envoyé le premier e-mail ?
+ Tomlinson
- Tim Berners-Lee
- Bill Gates
= En 1971.

? Qui a inventé le World Wide Web ?
- Gordon Moore
+ Tim Berners-Lee
- Alan Turing
= En 1991.

? Quel navigateur est sorti en 1993 ?
+ Mosaic
- Internet Explorer
- Chrome
= Internet Explorer arrive en 1995.

? Le Web 2.0 se caractérise par…
- des pages statiques
+ du contenu créé et partagé par les utilisateurs
- l'invention des transistors
= Réseaux sociaux : Facebook, Twitter, LinkedIn.

? Combien d'adresses environ offre IPv4 ?
- 4,3 millions
+ 4,3 milliards
- illimité
= D'où son épuisement et la création d'IPv6.

? Le rôle du DNS est de…
+ convertir un nom de domaine en adresse IP
- chiffrer les données
- afficher les pages
= C'est le traducteur d'Internet.

? Le routeur…
- stocke les sites web
+ relie les réseaux et achemine les paquets
- traduit les noms de domaine
= Avec des tables de routage.

? Quelle version du protocole chiffre les échanges ?
- HTTP
+ HTTPS
- HTML
= HTTPS garantit confidentialité et intégrité.

? Quel langage structure le contenu d'une page ?
+ HTML
- CSS
- JavaScript
= CSS gère l'apparence, JavaScript l'interactivité.
```

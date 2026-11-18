---
id: generalites-web
titre: Généralités · internet, web, HTTP et client-serveur
seance: Partie I · Généralités
importance: 3
---

## Avant de commencer

Aucun prérequis technique : il suffit d'avoir déjà ouvert un site dans un navigateur. On va mettre des mots précis sur ce que tu fais chaque jour.

```exercice Vérifie ton prérequis
? Quand tu tapes `https://www.google.fr` dans ton navigateur, qui « fabrique » la page que tu vois : ton ordinateur ou une autre machine ?
= Une autre machine, le **serveur**, envoie le code de la page (HTML, CSS). Ton **navigateur** (le client) se contente de l'interpréter et de l'afficher. Tout ce chapitre décrit ce dialogue.
```

## Comment aborder ce chapitre

> [!astuce] **Pense en dialogue.** Le web, c'est un client qui demande et un serveur qui répond. Chaque notion du chapitre (HTTP, URL, statique/dynamique, front/back) se place sur ce dialogue.

> [!piege] Internet et le web, **ce n'est pas la même chose**. Internet est le réseau (les câbles, TCP/IP). Le web est **un service** qui tourne dessus, comme le mail ou le FTP.

À la fin, tu sais définir internet, le web et le W3C, lire une URL, décrire une requête et une réponse HTTP, et classer un langage en front-end ou back-end.

## Idée 1 · Internet est le réseau, le web est un service dessus

```flux Du réseau à la page
Internet (réseau de réseaux, TCP/IP) -> Web (pages + hyperliens, HTTP) -> Navigateur (affiche les pages)
```

- **Internet** (*INTERconnected NETwork*) : réseau mondial de machines interconnectées. Il porte plusieurs applications : courrier électronique, transfert de fichiers (FTP), messagerie instantanée, peer-to-peer…
- **Web** (*World Wide Web*), créé par **Tim Berners-Lee en 1989** : un système d'information réparti en **pages web** reliées par des **hyperliens**. Il repose sur internet et utilise **HTTP/HTTPS**, des adresses (**URL**), des langages (HTML, CSS…) et des **navigateurs**.
- **W3C** (*World Wide Web Consortium*), fondé par Berners-Lee : l'organisme qui **normalise** les technologies du web. Sa devise : « un seul web partout et pour tous ».

Exemple : envoyer un mail Gmail via l'application mobile utilise internet **sans** passer par une page web.

```grille Les quatre âges du web (selon le cours)
#cols: Version Nom Idée
#rows: 1 2 3 4
Web 1.0 *statique sites vitrines, peu d'interaction
Web 2.0 *social partage, réseaux sociaux, blogs, smartphones
Web 3.0 *sémantique la machine comprend les données, profil
Web 4.0 *connecté objets connectés (IoT) + IA
```

## Idée 2 · HTTP : une requête, une réponse

```html
<svg viewBox="0 0 600 190" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Le client envoie une requête HTTP au serveur, qui renvoie une réponse avec un code d'état et le document">
<g font-family="sans-serif" font-size="14" fill="currentColor" text-anchor="middle">
<rect x="20" y="50" width="150" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="95" y="85">Client</text><text x="95" y="105" font-size="12">(navigateur)</text>
<rect x="430" y="50" width="150" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="505" y="85">Serveur</text><text x="505" y="105" font-size="12">(Apache…)</text>
<line x1="175" y1="70" x2="420" y2="70" stroke="#D9824F" stroke-width="3"/><polygon points="420,64 430,70 420,76" fill="#D9824F"/>
<text x="300" y="58" fill="#D9824F">1. Requête : GET /page.html HTTP/1.1</text>
<line x1="425" y1="115" x2="180" y2="115" stroke="currentColor" stroke-width="3"/><polygon points="180,109 170,115 180,121" fill="currentColor"/>
<text x="300" y="140">2. Réponse : HTTP/1.1 200 OK + HTML/CSS</text>
</g></svg>
```

HTTP (*HyperText Transfer Protocol*) est le langage du dialogue **client-serveur**, sur le modèle **requête / réponse**. HTTPS en est la version sécurisée.

| | Requête (client → serveur) | Réponse (serveur → client) |
|---|---|---|
| 1re ligne | **ligne de commande** : MÉTHODE URL VERSION | **ligne de statut** : VERSION CODE EXPLICATION |
| ensuite | champs d'en-tête `Nom: valeur` | champs d'en-tête |
| séparateur | **une ligne vide** | **une ligne vide** |
| fin | corps (facultatif, données d'un formulaire en POST) | corps : **le document demandé** |

Exemple de requête minimale :

```text
GET /index.html HTTP/1.1
Host: www.exemple.com

```

Et la réponse : `HTTP/1.1 200 OK`, quelques en-têtes, une ligne vide, puis le code HTML.

> [!retenir] Requête = **ligne de commande + en-têtes + ligne vide + corps**. Réponse = **ligne de statut + en-têtes + ligne vide + corps**. La ligne vide est obligatoire : elle sépare les en-têtes du corps.

> [!attention] Le cours dit que HTTP/1.1 est « la plus utilisée actuellement » et cite une statistique de 2019. C'est daté : aujourd'hui HTTP/2 et HTTP/3 (RFC 9114, 2022) servent une grande partie du trafic. Pour l'examen, retiens les RFC citées par le prof : HTTP/1.0 = RFC 1945, HTTP/1.1 = RFC 2068 et 2616, HTTP/2 = RFC 7540.

## Idée 3 · Lire une URL

```grille http://www.exemple.com/chemin/page.html?q=req
#cols: protocole hôte chemin page requête
*http !www.exemple.com /chemin/ page.html ~q=req
```

L'URL (*Uniform Resource Locator*) adresse une ressource du web. On la découpe toujours dans le même ordre.

```etapes Découper https://www.usms.ac.ma/fr/etudiants.html?annee=2025
Protocole :: `https` (HTTP sécurisé), avant `://`.
Hôte :: `www.usms.ac.ma`, le nom de la machine (serveur).
Chemin :: `/fr/`, le dossier sur le serveur.
Page :: `etudiants.html`, le fichier demandé.
Chaîne de requête :: `annee=2025`, après le `?` : des données transmises à la page.
```

## Idée 4 · Front-end, back-end, statique, dynamique

```flux Les trois temps du dialogue
Le client demande une page -> Le serveur génère la page (langage serveur) -> Le serveur envoie HTML + CSS
```

| | Front-end (client) | Back-end (serveur) |
|---|---|---|
| Rôle | comment le site **s'affiche** | comment le site **se comporte** |
| Langages | HTML5, CSS3, JavaScript | PHP, Java, C#, Python, Ruby, Perl… |

- **Page statique** : le fichier HTML est stocké tel quel ; le serveur l'envoie sans rien calculer.
- **Page dynamique** : un programme côté serveur la **génère** à chaque demande, selon les données (formulaires, cookies, base de données SQL…).

Autres mots du cours :

- **Framework** = boîte à outils pour coder plus vite (la « pelleteuse » au lieu de creuser à la main) : Symfony (PHP), Django (Python), Ruby on Rails, ASP.NET (C#), Angular (JS).
- **CMS** (WordPress, Joomla) = site prêt à l'emploi, **sans coder**. Ce n'est **pas** un framework. Le prof le déconseille à un informaticien.
- **Navigateur** : Chrome, Firefox, Edge, Safari, Opera… Il **interprète** HTML, CSS, JS.
- **Serveur web** : Apache (le plus répandu, gratuit, modules PHP/MySQL), Microsoft IIS…
- **SGBD** : MySQL, PostgreSQL, Oracle, SQLite… interrogés en **SQL** par le langage serveur.
- **Site responsive** : le design s'adapte aux petits écrans (solution la plus simple), contre une **application native** (iOS, Android).

> [!prof] Teste toujours ton site **sur au moins deux navigateurs** pendant sa création.

Les étapes d'un projet de site selon le cours : **spécification des besoins** (objectifs, nom de domaine, hébergeur) → **conception** (structure des pages, arborescence, charte graphique) → **réalisation** (pages, développements dynamiques) → **terminaison et suivi** (mise en ligne, annonce, maintenance).

> [!attention] Les **notes de cours manuscrites** fournies ajoutent quelques définitions d'informatique d'entreprise : **intranet** (réseau interne à l'entreprise, sur un LAN), **extranet** (accessible à des acteurs externes avec droits d'accès : clients, fournisseurs), **ERP** (progiciel de gestion intégré : SAP, Odoo, Sage), **CRM** (gestion de la relation client), **SI** (système d'information). On ne sait pas si elles tombent à l'examen.

## S'exercer

```exercice Questions de cours
? Donne les trois parties d'une **réponse** HTTP, dans l'ordre.
= 1) La **ligne de statut** (version, code, explication, ex. `HTTP/1.1 404 Not Found`). 2) Les **champs d'en-tête**. 3) Après une **ligne vide**, le **corps** qui contient le document demandé.
? Découpe l'URL `http://fsbm.usms.ac.ma/notes/s3.php?cne=R123` (protocole, hôte, chemin, page, requête).
= Protocole `http`, hôte `fsbm.usms.ac.ma`, chemin `/notes/`, page `s3.php`, chaîne de requête `cne=R123`.
? Classe ces langages en front-end ou back-end : CSS, PHP, JavaScript, Python, HTML.
= Front-end : HTML, CSS, JavaScript. Back-end : PHP, Python. (JavaScript peut aussi tourner côté serveur avec Node.js, mais le cours le classe en front-end.)
? Quelle est la différence entre un framework et un CMS ?
= Un **framework** est une boîte à outils pour **programmer** plus vite (Symfony, Django). Un **CMS** (WordPress) est un site **prêt à l'emploi** qu'on gère **sans coder**, plus simple mais plus limité.
```

## Flashcards

```cartes
Qui a créé le web, et quand ? :: Tim Berners-Lee, en 1989.
Que signifie W3C et quel est son rôle ? :: World Wide Web Consortium : il normalise les technologies du web.
Les 3 parties d'une requête HTTP ? :: Ligne de commande (méthode, URL, version), en-têtes, puis corps après une ligne vide.
Les 3 parties d'une réponse HTTP ? :: Ligne de statut (version, code, texte), en-têtes, puis corps après une ligne vide.
Front-end vs back-end ? :: Front-end : affichage (HTML, CSS, JS). Back-end : comportement côté serveur (PHP, Java, Python…).
Page statique vs dynamique ? :: Statique : fichier envoyé tel quel. Dynamique : générée par un programme serveur à chaque demande.
Web 1.0, 2.0, 3.0, 4.0 ? :: Statique (vitrine), social, sémantique, connecté (IoT + IA).
Le serveur web le plus répandu selon le cours ? :: Apache (gratuit, Windows/Unix, modules PHP, MySQL).
```

## QCM du chapitre

```qcm
? Internet, c'est…
- un synonyme exact du web
+ un réseau mondial de réseaux qui communiquent avec TCP/IP
- un navigateur
= Le web n'est qu'un des services d'internet (avec le mail, FTP…).
? Qui a inventé le web ?
- Bill Gates
+ Tim Berners-Lee
- le W3C
= Tim Berners-Lee, en 1989. Il a ensuite fondé le W3C.
? Le Web 2.0 est surtout caractérisé par…
- des sites vitrines sans interaction
+ le partage et les réseaux sociaux
- l'internet des objets
= Web 1.0 = statique, 2.0 = social, 3.0 = sémantique, 4.0 = IoT + IA.
? Dans une requête HTTP, qu'est-ce qui sépare les en-têtes du corps ?
- un point-virgule
+ une ligne vide
- le mot BODY
= Une ligne vide (CRLF seul) marque la fin des en-têtes.
? La première ligne d'une réponse HTTP s'appelle…
- la ligne de commande
+ la ligne de statut
- l'en-tête Host
= Ligne de statut : version, code (200, 404…), explication.
? Dans `http://www.exemple.com/chemin/page.html?q=req`, `q=req` est…
- le chemin
- l'hôte
+ la chaîne de requête
= Ce qui suit le `?` est transmis à la page.
? Lequel est un langage back-end ?
- CSS
+ PHP
- HTML
= PHP s'exécute côté serveur.
? WordPress est…
- un framework PHP
+ un CMS
- un serveur web
= Un CMS est un site prêt à l'emploi ; le cours insiste : ce n'est pas un framework.
? Une page dynamique est…
- une page avec des animations CSS
+ une page générée par un programme côté serveur à chaque demande
- une page stockée telle quelle sur le disque
= Dynamique = générée (BD, formulaires, cookies…), pas forcément animée.
? Apache est…
- un navigateur
- un SGBD
+ un serveur web
= Apache est un serveur HTTP ; Chrome est un navigateur ; MySQL est un SGBD.
```

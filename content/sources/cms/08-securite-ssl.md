---
id: securite-ssl
titre: Sécuriser WordPress avec SSL (HTTPS)
seance: Partie 1 · WordPress · Sécurité
importance: 4
---

## Avant de commencer

Tu dois savoir la différence entre **HTTP** et **HTTPS** : en HTTPS, les échanges entre le navigateur et le serveur sont chiffrés.

```exercice Vérifie ton prérequis
? Tu tapes ton mot de passe sur un site en `http://`. Quelqu'un sur le même Wi-Fi peut-il le lire ?
= Oui : en HTTP, les données circulent **en clair**. En HTTPS, elles sont chiffrées grâce à un certificat. C'est ce que tu as vu en Réseaux et en Cryptographie, et c'est l'objet de ce chapitre.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « un cadenas à poser en quatre gestes ».** Obtenir le certificat, dire à WordPress d'utiliser https, chasser ce qui reste en http, tester. Quatre étapes, toujours dans cet ordre.

> [!piege] Installer le certificat ne suffit pas. Si une seule image de la page est encore appelée en `http://`, le navigateur affiche un avertissement de **contenu mixte**. C'est pour ça que l'étape 3 existe.

À la fin, tu sais dérouler les quatre étapes, citer les outils et expliquer ce qu'est un certificat auto-signé.

## Idée 1 · Le certificat, la pièce d'identité du site

```html
<svg viewBox="0 0 360 100" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Le navigateur et le serveur échangent en HTTPS, chiffré grâce au certificat SSL">
<g font-family="sans-serif" font-size="11" text-anchor="middle" fill="currentColor">
<rect x="8" y="28" width="96" height="44" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="56" y="54">Navigateur</text>
<rect x="256" y="28" width="96" height="44" rx="8" fill="none" stroke="currentColor" stroke-width="2"/><text x="304" y="48">Serveur</text><text x="304" y="63" font-size="10">+ certificat SSL</text>
<text x="180" y="38" fill="#D9824F" font-weight="700">HTTPS : chiffré</text>
</g>
<path d="M106 50h148" stroke="#D9824F" stroke-width="3"/>
<rect x="170" y="52" width="20" height="16" rx="3" fill="#D9824F"/><path d="M174 52v-5a6 6 0 0112 0v5" fill="none" stroke="#D9824F" stroke-width="2.5"/>
</svg>
```

SSL veut dire **Secure Sockets Layer**. Un **certificat SSL** permet au site d'être servi en **HTTPS**.

> [!attention] Précision de ToumaiLearn : le protocole réellement utilisé aujourd'hui s'appelle **TLS**, le successeur de SSL. Tout le monde continue de dire « certificat SSL », le prof aussi. En examen, emploie le vocabulaire du cours : **SSL**.

## Idée 2 · Les quatre étapes pour passer en HTTPS

```flux Sécuriser un site WordPress avec SSL
1. Acheter et installer le certificat -> 2. Configurer WordPress -> 3. Vérifier les éléments mixtes -> 4. Tester la configuration
```

```etapes Les 4 étapes du cours
1. Acheter et installer un certificat SSL :: On l'obtient auprès de son **hébergeur** ou d'un fournisseur : **Let's Encrypt** (gratuit), **Comodo**, **DigiCert**. On l'installe en suivant les instructions de l'hébergeur. En local avec XAMPP, on utilise **OpenSSL** pour générer un certificat **auto-signé**.
2. Configurer WordPress pour utiliser SSL :: Dans **Réglages, Général**, on met à jour les deux URL (celle de WordPress et celle du site) en remplaçant `http` par `https`. Puis on **force HTTPS** avec une règle dans le fichier `.htaccess`.
3. Vérifier les éléments mixtes :: On vérifie que **tous** les éléments (images, scripts) sont chargés en HTTPS. Le plugin **Really Simple SSL** facilite la transition et évite les avertissements de contenu mixte.
4. Vérifier la configuration SSL :: On teste le site avec un outil en ligne comme **SSL Labs**.
```

| Étape | Outil ou lieu à citer |
|---|---|
| 1 | Hébergeur, Let's Encrypt (gratuit), Comodo, DigiCert, OpenSSL en local |
| 2 | Réglages, Général et fichier `.htaccess` |
| 3 | Plugin Really Simple SSL |
| 4 | SSL Labs |

## Idée 3 · Forcer HTTPS avec .htaccess

Le code du cours, à ajouter dans le fichier `.htaccess` :

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

```etapes Lire la règle ligne par ligne
IfModule mod_rewrite.c :: « Si le module de réécriture d'Apache est disponible, applique ce qui suit. »
RewriteEngine On :: On allume le moteur de réécriture d'URL.
RewriteCond %{HTTPS} off :: La condition : la requête est arrivée **sans** HTTPS.
RewriteRule ... [L,R=301] :: La règle : on renvoie vers la même adresse, mais en `https://`. **R=301** = redirection permanente. **L** = dernière règle à appliquer.
```

> [!attention] La lecture ligne par ligne est une explication ajoutée par ToumaiLearn : la diapo donne le code sans le commenter. Retiens surtout l'idée : **tout le trafic HTTP est redirigé automatiquement vers HTTPS**.

## Idée 4 · En local : le certificat auto-signé

Un certificat **auto-signé** est un certificat que tu fabriques toi-même, sans autorité extérieure. Le cours le réserve **aux fins de développement**.

Les trois étapes avec XAMPP :

**1) Générer une clé privée et un certificat auto-signé** (avec OpenSSL)

```bash
openssl genpkey -algorithm RSA -out /path/to/xampp/apache/conf/ssl.key/server.key
openssl req -new -key /path/to/xampp/apache/conf/ssl.key/server.key -out /path/to/xampp/apache/conf/ssl.csr/server.csr
openssl x509 -req -days 365 -in /path/to/xampp/apache/conf/ssl.csr/server.csr -signkey /path/to/xampp/apache/conf/ssl.key/server.key -out /path/to/xampp/apache/conf/ssl.crt/server.crt
```

| Commande | Ce qu'elle produit |
|---|---|
| `openssl genpkey` | La **clé privée** (`server.key`), ici en RSA |
| `openssl req -new` | La **demande de certificat** (`server.csr`) |
| `openssl x509 -req -days 365 -signkey` | Le **certificat** (`server.crt`), signé avec ta propre clé, valable 365 jours |

> [!attention] Sur la diapo, les commandes 2 et 3 sont **coupées** au bord de l'image. La fin de chaque ligne (les chemins après `-out` et `-signkey`) a été complétée par ToumaiLearn d'après la configuration Apache de la diapo suivante. Vérifie avec le support du prof s'il le redonne en entier.

**2) Configurer Apache pour utiliser SSL**, dans le fichier `httpd-ssl.conf` :

```apache
<VirtualHost _default_:443>
    DocumentRoot "C:/path/to/your/xampp/htdocs"
    ServerName localhost:443
    SSLEngine on
    SSLCertificateFile "C:/path/to/xampp/apache/conf/ssl.crt/server.crt"
    SSLCertificateKeyFile "C:/path/to/xampp/apache/conf/ssl.key/server.key"
</VirtualHost>
```

**3) Redémarrer Apache** pour appliquer les modifications.

> [!retenir] HTTPS passe par le port **443**. `SSLCertificateFile` pointe vers le **certificat** (.crt), `SSLCertificateKeyFile` vers la **clé privée** (.key).

## S'exercer

```exercice Questions types
? Cite les quatre étapes pour sécuriser un site WordPress avec SSL.
= 1) Acheter et installer un certificat SSL. 2) Configurer WordPress pour utiliser SSL (URL en https, redirection .htaccess). 3) Vérifier les éléments mixtes. 4) Vérifier la configuration SSL.

? Cite un fournisseur de certificat gratuit et deux fournisseurs payants.
= Gratuit : **Let's Encrypt**. Payants : **Comodo**, **DigiCert**.

? Qu'est-ce qu'un avertissement de contenu mixte, et quel plugin aide à l'éviter ?
= Il apparaît quand une page en HTTPS charge encore des éléments (images, scripts) en HTTP. Le plugin **Really Simple SSL** aide à vérifier que tout est chargé en HTTPS.

? Après avoir modifié httpd-ssl.conf, que faut-il faire pour que le changement soit pris en compte ?
= **Redémarrer Apache.**

? Dans la configuration Apache, quel port est utilisé pour SSL ?
reponse: 443
= Le VirtualHost est déclaré sur `_default_:443`, le port de HTTPS.
```

## Flashcards

```cartes
Que signifie SSL ? :: Secure Sockets Layer.
Les 4 étapes pour passer un site WordPress en SSL :: Acheter/installer le certificat, configurer WordPress, vérifier les éléments mixtes, tester la configuration.
Fournisseurs de certificats SSL cités :: Let's Encrypt (gratuit), Comodo, DigiCert, ou l'hébergeur.
Où met-on à jour les URL du site en https ? :: Dans Réglages, Général (URL de WordPress et URL du site).
Quel fichier sert à forcer HTTPS ? :: Le fichier .htaccess, avec une règle de redirection.
Plugin pour faciliter le passage à HTTPS :: Really Simple SSL.
Outil pour tester sa configuration SSL :: SSL Labs.
Certificat auto-signé :: Certificat généré soi-même (avec OpenSSL), réservé au développement.
Fichier Apache à modifier pour SSL avec XAMPP :: httpd-ssl.conf
Port de HTTPS :: 443
Que signifie R=301 dans la règle .htaccess ? :: Redirection permanente.
```

## QCM du chapitre

```qcm
? Que signifie SSL ?
- Secure Site Login
+ Secure Sockets Layer
- Server Side Language
= Le certificat SSL permet de servir le site en HTTPS.

? Lequel de ces fournisseurs de certificats est gratuit, selon le cours ?
- Comodo
- DigiCert
+ Let's Encrypt
= Comodo et DigiCert sont des fournisseurs commerciaux.

? Quel outil utilise-t-on en local avec XAMPP pour générer un certificat ?
+ OpenSSL
- phpMyAdmin
- Gutenberg
= Il sert à générer un certificat auto-signé, pour le développement.

? Où remplace-t-on `http` par `https` dans les URL du site ?
- Réglages, Permaliens
+ Réglages, Général
- Outils, Exporter
= On y met à jour l'URL de WordPress et l'URL du site.

? Quel fichier permet de rediriger automatiquement le trafic HTTP vers HTTPS ?
- wp-config.php
- httpd-ssl.conf
+ .htaccess
= On y ajoute une règle RewriteRule avec R=301.

? À quoi sert le plugin Really Simple SSL ?
- À acheter un nom de domaine
+ À faciliter la transition vers HTTPS et éviter le contenu mixte
- À sauvegarder la base de données
= Il vérifie que tous les éléments du site sont chargés en HTTPS.

? Qu'est-ce qu'un avertissement de contenu mixte ?
- Un mélange d'articles et de pages
+ Une page HTTPS qui charge encore des éléments en HTTP
- Un thème incompatible avec une extension
= D'où l'étape 3 : vérifier images, scripts, etc.

? Quel outil en ligne sert à tester la configuration SSL ?
- BuiltWith
- Wappalyzer
+ SSL Labs
= BuiltWith et Wappalyzer servent à détecter la technologie d'un site (chapitre suivant).

? Un certificat auto-signé est destiné :
- aux sites de e-commerce en production
+ au développement en local
- aux sites gouvernementaux
= Le cours précise « pour des fins de développement ».

? Dans quel fichier configure-t-on Apache pour SSL sous XAMPP ?
+ httpd-ssl.conf
- .htaccess
- wp-config-sample.php
= Puis on redémarre Apache.

? Dans la règle `.htaccess`, que signifie `RewriteCond %{HTTPS} off` ?
- HTTPS est désactivé sur tout le serveur
+ La règle s'applique seulement si la requête n'est pas en HTTPS
- Le certificat a expiré
= C'est la condition : on ne redirige que les requêtes arrivées en HTTP.
```

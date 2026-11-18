---
id: introduction-js
titre: Introduction à JavaScript · web, moteur et balise script
seance: Séance 1 · Introduction
importance: 2
---

## Avant de commencer

Il te faut une seule idée : une page web est un fichier HTML que le navigateur lit, puis affiche. Le reste du chapitre explique qui fait quoi dans ce navigateur.

```exercice Vérifie ton prérequis
? Dans l'URL `http://www.example.com/chemin/page.html?q=req`, quelle partie est le protocole, laquelle est l'hôte, laquelle est la chaîne de requête ?
indice: Lis de gauche à droite : le protocole est avant `://`.
= Protocole : `http`. Hôte : `www.example.com`. Chemin : `/chemin/`, page : `page.html`. Chaîne de requête : `q=req` (après le `?`), transmise à la page.
```

## Comment aborder ce chapitre

> [!astuce] Le prof compare la page web à un ordinateur : **HTML = le châssis**, **CSS = l'habillage**, **JavaScript = le processeur** qui lit l'état et modifie l'affichage. Garde cette image : elle revient dans toutes les séances.

> [!piege] Croire que `document.getElementById` « fait partie de JavaScript ». Non : le DOM est une **API du navigateur** (écrite en C++). Le moteur JS seul (par exemple dans Node.js) ne connaît ni `document` ni `window`.

À la fin, tu sais expliquer comment le code JS est exécuté (compilation JIT), ce qu'est le DOM, et où placer la balise `<script>` (avec `defer`).

## Idée 1 · Web, Internet et client/serveur

**Internet** est le réseau mondial (depuis ARPANET, années 1960). **Le Web** n'est qu'un de ses services, à côté des e-mails (SMTP, IMAP, POP3), du streaming ou du FTP. Le Web repose sur les pages, les liens hypertextes et HTTP/HTTPS.

```flux Une page dynamique interprétée côté client
Navigateur (client) -> requête HTTP -> Serveur -> renvoie HTML + CSS + JS -> le navigateur exécute le JS
```

- **Page statique** : le serveur renvoie toujours le même fichier.
- **Page dynamique côté serveur** : le serveur (PHP, Python, Node) fabrique la page à chaque requête.
- **Page dynamique côté client** : le JavaScript, exécuté dans le navigateur, modifie la page **sans la recharger**. C'est le rôle de JS.

## Idée 2 · Le moteur JavaScript et la compilation JIT

JavaScript est un **langage de script** standardisé par **ECMAScript** (ES6 en 2015 : classes, promesses, modules). Il a été créé en 10 jours par Brendan Eich en 1995.

Ses caractéristiques, telles que le prof les résume :

| Propriété | Sens |
|---|---|
| Multi-paradigme | impératif, orienté objet (prototypes, classes), fonctionnel (callbacks) |
| Typage dynamique | le type n'est pas déclaré, il est fixé à l'exécution |
| Typage faible | conversions implicites (coercition) |
| Mémoire automatique | Heap pour objets/tableaux/fonctions, Stack pour les primitives ; Garbage Collector |
| Mono-thread | une seule pile d'appels : une boucle lourde fige la page |

Le **moteur** (V8 pour Chrome, Edge et Node.js ; SpiderMonkey pour Firefox ; JavaScriptCore pour Safari) traduit le code en langage machine. Il ne choisit ni la compilation complète à l'avance (AOT, comme le C) ni l'interprétation ligne par ligne : il fait du **JIT** (Just-In-Time).

```etapes Le pipeline d'exécution de V8
Parser :: lit le texte source, découpe les mots-clés (tokens : let, function, =) et vérifie la syntaxe.
AST :: les tokens deviennent un arbre syntaxique en mémoire.
Interpréteur (Ignition) :: génère un bytecode et l'exécute tout de suite : démarrage rapide.
Profiler :: repère les « fonctions chaudes », exécutées très souvent (boucles).
Compilateur optimiseur (TurboFan) :: compile ces fonctions chaudes en code machine natif (x86, ARM).
Dé-optimisation :: si un type change (un nombre devient une chaîne), le code machine est jeté et on revient au bytecode.
```

> [!retenir] **JIT = démarrer comme un interpréteur, accélérer comme un compilateur.** La dé-optimisation explique pourquoi changer le type d'une variable coûte cher.

## Idée 3 · Moteur, runtime, Web APIs et DOM

```html
<svg viewBox="0 0 560 190" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Le navigateur (runtime) contient le moteur JavaScript et les Web APIs : DOM, fetch, setTimeout">
<rect x="10" y="10" width="540" height="170" rx="10" fill="none" stroke="currentColor" stroke-width="2"/>
<text x="24" y="34" font-family="sans-serif" font-size="14" fill="currentColor" font-weight="700">Navigateur = runtime</text>
<rect x="30" y="55" width="200" height="105" rx="8" fill="none" stroke="#D9824F" stroke-width="3"/>
<text x="130" y="95" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#D9824F" font-weight="700">Moteur JS (V8)</text>
<text x="130" y="118" text-anchor="middle" font-family="sans-serif" font-size="12" fill="currentColor">calcule seulement</text>
<text x="130" y="136" text-anchor="middle" font-family="sans-serif" font-size="12" fill="currentColor">Call Stack + Heap</text>
<line x1="230" y1="107" x2="300" y2="107" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4"/>
<text x="265" y="98" text-anchor="middle" font-family="sans-serif" font-size="11" fill="currentColor">pont</text>
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="300" y="55" width="230" height="30" rx="6" fill="none" stroke="currentColor"/><text x="415" y="75">DOM (document)</text>
<rect x="300" y="92" width="230" height="30" rx="6" fill="none" stroke="currentColor"/><text x="415" y="112">Réseau : fetch</text>
<rect x="300" y="129" width="230" height="30" rx="6" fill="none" stroke="currentColor"/><text x="415" y="149">Timers : setTimeout</text></g>
</svg>
```

Le moteur ne connaît ni l'écran ni le réseau. Le **navigateur** (le runtime) l'entoure et lui fournit des **Web APIs** en C++ : le DOM, `fetch`, `setTimeout`.

Le **DOM** (Document Object Model) est l'arbre des balises HTML en mémoire : `window` (objet global) → `document` (point d'entrée) → `<html>` → `<head>`, `<body>`. JS le **lit** (entrée) et le **modifie** (sortie), comme des registres d'entrée/sortie.

> [!prof] L'accès au DOM traverse un « pont » entre moteur JS et moteur de rendu : c'est **le principal goulot de performance**. Règle : minimiser les accès, grouper les modifications.

## Idée 4 · Intégrer le script : async ou defer ?

Trois façons d'écrire du JS dans une page :

1. **Inline** (`onclick="..."` dans le HTML) : à bannir (illisible, risque XSS).
2. **Interne** (`<script>...</script>`) : pour un petit script d'une page ; pas mis en cache.
3. **Externe** (`<script src="app.js"></script>`) : recommandé (réutilisable, mis en cache).

Un `<script>` classique **bloque** le parseur HTML : il s'arrête, télécharge, exécute, puis reprend. Écran blanc si le script est lourd.

```grille Comportement des trois balises
#cols: Téléchargement | Exécution | Ordre garanti | Usage
#rows: script seul | async | defer
bloque le parseur | tout de suite | oui | rare aujourd'hui
en parallèle | dès qu'il est téléchargé | ~non | analytique, pubs
*en parallèle | *après tout le HTML | *oui | *choix par défaut
```

```html nontest
<script defer src="app.js"></script>
```

> [!retenir] **`defer` par défaut** : le DOM est complet quand ton code s'exécute, et l'ordre des scripts est respecté. La vieille astuce (mettre le script juste avant `</body>`) marche aussi, mais le téléchargement commence tard.

**DevTools** (F12 ou Ctrl+Maj+J) : la **console** (`console.log`, la sortie standard), l'onglet **Sources** pour poser des **points d'arrêt** et avancer pas à pas, en lisant la **Call Stack** et le **Scope**.

## S'exercer

```exercice Questions de cours
? Pourquoi l'attribut `defer` est-il le choix par défaut pour un script qui manipule la page ?
= Le script est téléchargé en parallèle du HTML (pas de blocage), puis exécuté **après** la fin de la lecture du HTML : le DOM est complet. En plus, l'ordre des scripts `defer` est respecté.

? Explique en deux phrases la « dé-optimisation » dans V8.
= TurboFan compile une fonction chaude en supposant des types fixes. Si un type change (un nombre devient une chaîne), cette hypothèse tombe : le code machine est jeté et le moteur revient au bytecode, plus lent.

? Un camarade lance `node app.js` et obtient `ReferenceError: document is not defined`. Pourquoi ?
= `document` est une Web API fournie par le navigateur, pas par le moteur JavaScript. Node.js embarque V8 mais pas de DOM.
```

## Flashcards

```cartes
Rôle de JavaScript dans la page (image du prof) :: Le processeur : il lit l'état, exécute la logique et modifie l'affichage. HTML = structure, CSS = présentation.
Que signifie JIT ? :: Just-In-Time : le code est compilé en code machine pendant l'exécution, seulement pour les fonctions chaudes.
Les étapes du pipeline V8 :: Parser → AST → interpréteur (bytecode) → profiler → compilateur optimiseur (code machine).
Moteurs JS à connaître :: V8 (Chrome, Edge, Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari).
Le DOM fait-il partie de JS ? :: Non : c'est une Web API du navigateur (C++), exposée via document.
async vs defer :: async : exécuté dès la fin du téléchargement, ordre non garanti. defer : exécuté après tout le HTML, dans l'ordre.
Typage de JavaScript :: Dynamique (type fixé à l'exécution) et faible (conversions implicites).
Mono-thread, conséquence :: Une seule Call Stack : une boucle lourde fige toute l'interface.
```

## QCM du chapitre

```qcm
? Qui a créé JavaScript, et en combien de temps ?
- Microsoft, en 1997
+ Brendan Eich, en 10 jours (1995)
- Google, avec le moteur V8 en 2008
= Créé en 1995 par Brendan Eich (d'abord « Mocha », puis « LiveScript »). V8 date de 2008.

? Quel organisme standardise le langage ?
- Le W3C
+ L'ECMA (norme ECMAScript)
- L'IETF
= JavaScript suit la spécification ECMAScript (ES6 en 2015, etc.).

? Quel moteur utilise Node.js ?
- SpiderMonkey
- JavaScriptCore
+ V8
= V8 est le moteur de Chrome, Edge et Node.js.

? Dans le pipeline de V8, quel composant repère les fonctions « chaudes » ?
- Le parser
+ Le profiler
- Le garbage collector
= Le profiler observe l'exécution du bytecode et marque les fonctions répétées pour TurboFan.

? Que produit l'interpréteur Ignition ?
+ Du bytecode, exécuté immédiatement
- Du code machine optimisé
- Un fichier .exe
= Ignition produit un bytecode indépendant du processeur. C'est TurboFan qui produit le code machine.

? `setTimeout`, `fetch` et le DOM sont :
- des mots-clés du langage
+ des Web APIs fournies par le navigateur
- des fonctions du moteur V8
= Ce sont des interfaces du runtime (navigateur), écrites en C++, externes au moteur.

? Que fait le parseur HTML quand il rencontre un `<script src>` sans attribut ?
- Il continue et exécute le script à la fin
+ Il s'arrête, télécharge et exécute le script, puis reprend
- Il ignore le script
= C'est le blocage (« pipeline stall ») : écran blanc si le script est lent.

? Quel attribut garantit que le DOM est complet et que l'ordre des scripts est respecté ?
- async
+ defer
- type="module" n'existe pas
= `defer` télécharge en parallèle et exécute après le parsing, dans l'ordre des balises.

? Pourquoi bannir le code inline (`onclick="..."`) ?
- Il est plus lent à télécharger
+ Il mélange HTML et logique, et ouvre la porte aux failles XSS
- Il ne fonctionne pas dans Chrome
= Il casse la séparation des préoccupations et il est difficile à maintenir.

? Dans les DevTools, où regarde-t-on la pile d'appels pendant un point d'arrêt ?
- Dans l'onglet Réseau
+ Dans l'onglet Sources (Call Stack, Scope)
- Dans la console uniquement
= L'onglet Sources est le débogueur : points d'arrêt, pas à pas, Call Stack (LIFO) et Scope.
```

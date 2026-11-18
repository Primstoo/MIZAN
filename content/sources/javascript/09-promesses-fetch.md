---
id: promesses-fetch
titre: HTTP, promesses, async/await et fetch
seance: Séance 7 · Requêtes HTTP et APIs (Fetch)
importance: 5
---

## Avant de commencer

Il faut avoir compris l'Event Loop (chapitre 5) : une tâche longue est déléguée, et son callback revient plus tard.

```exercice Vérifie ton prérequis
? Pourquoi JavaScript n'attend-il pas simplement la réponse du serveur, ligne par ligne ?
= Il n'a qu'un seul thread. Attendre bloquerait la pile d'appels : plus aucun clic ne marcherait, la page gèlerait. Il délègue donc la requête et continue.
```

## Comment aborder ce chapitre

> [!astuce] Une promesse est un **ticket de retrait** : tu le reçois tout de suite, la commande arrivera plus tard (ou sera annulée). `then` = « quand c'est prêt », `catch` = « si ça rate ». `await` = « j'attends mon ticket ici ».

> [!piege] Croire que `fetch` rejette sur une erreur 404 ou 500. Non : il ne rejette que si le **réseau** échoue. Il faut tester `response.ok` soi-même.

À la fin, tu sais lire une requête/réponse HTTP, créer et consommer une promesse, appeler une API avec `fetch` et `async/await`, et choisir entre `Promise.all`, `allSettled`, `race` et `any`.

## Idée 1 · HTTP et REST en bref

- **Client** (navigateur) envoie des requêtes ; **serveur** (Node, Python, PHP) gère la base et la logique. HTTP est **sans état**.
- Requête = **URL** (endpoint) + **méthode** + **headers** (`Content-Type`, `Authorization`) + **body** (POST/PUT/PATCH).

| Méthode | Action | Exemple REST |
|---|---|---|
| GET | lire | `GET /users`, `GET /users/42` |
| POST | créer | `POST /users` |
| PUT / PATCH | modifier | `PUT /users/42` |
| DELETE | supprimer | `DELETE /users/42` |

Codes de réponse : **2xx** succès (200 OK, 201 Created), **3xx** redirection, **4xx** erreur du client (400, 401, 404), **5xx** erreur du serveur (500). Format d'échange : JSON, type MIME `application/json`.

## Idée 2 · Les promesses

L'ancien monde : des callbacks imbriqués (`getUser(1, user => getPosts(user.id, posts => ...))`), la « pyramide de l'enfer ». Une **promesse** est un objet qui représente le résultat futur d'une opération.

```flux Les 3 états d'une promesse
pending (en attente) -> fulfilled (resolve : succès) -> .then
pending (en attente) -> rejected (reject : échec) -> .catch
```

Une promesse n'appelle **qu'une fois** `resolve` **ou** `reject` : le premier appel fixe l'état final.

```javascript
const testerConnexion = (estConnecte) => {
  return new Promise((resolve, reject) => {
    if (estConnecte === true) resolve("Connexion réussie !");
    else reject(new Error("Connexion perdue."));
  });
};
testerConnexion(true)
  .then(message => console.log(message))
  .catch(erreur => console.log("Échec :", erreur.message));
testerConnexion(false)
  .then(message => console.log(message))
  .catch(erreur => console.log("Échec :", erreur.message));
```

```sortie
Connexion réussie !
Échec : Connexion perdue.
```

« Promisifier » un minuteur :

```javascript
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
console.log("avant");
wait(100).then(() => console.log("100 ms écoulées"));
console.log("après");
```

```sortie
avant
après
100 ms écoulées
```

## Idée 3 · async / await

`async` déclare une fonction qui renvoie toujours une promesse. **`await`** suspend **cette fonction** (pas toute la page) jusqu'à ce que la promesse soit résolue, et en extrait la valeur. Les erreurs se gèrent avec `try / catch`.

```javascript
const simulerCreationCompte = (nom, mdp) => new Promise((resolve, reject) => {
  if (mdp.length < 8) return reject(new Error("Mot de passe trop court"));
  setTimeout(() => resolve(`Compte ${nom} créé`), 100);
});

const inscrire = async (nom, mdp) => {
  console.log("Création en cours...");
  try {
    const message = await simulerCreationCompte(nom, mdp);
    console.log("Succès :", message);
  } catch (err) {
    console.log("Erreur :", err.message);
  } finally {
    console.log("Bouton réactivé");
  }
};

(async () => {
  await inscrire("admin", "123");
  await inscrire("zouina", "motdepasse");
})();
```

```sortie
Création en cours...
Erreur : Mot de passe trop court
Bouton réactivé
Création en cours...
Succès : Compte zouina créé
Bouton réactivé
```

C'est le squelette de l'exercice 3 du TD 4 (sans le DOM).

> [!attention] Une diapo affirme qu'avec async/await « nous ne pouvons plus utiliser `.catch()` ». C'est trop fort : une fonction `async` renvoie une promesse, donc `maFonction().catch(...)` reste valable. Le `try / catch` est simplement l'écriture **recommandée** à l'intérieur de la fonction.

## Idée 4 · fetch : GET, vérification, POST

`fetch(url)` renvoie une promesse. Il faut **deux** étapes : la réponse (headers), puis le corps (`response.json()`, qui renvoie lui aussi une promesse).

```etapes Le modèle complet d'un appel fetch
Lancer la requête :: const res = await fetch(url); — rejette seulement si le réseau échoue.
Vérifier le statut :: if (!res.ok) throw new Error("Erreur HTTP: " + res.status); — 404 et 500 ne rejettent pas.
Lire le corps :: const data = await res.json(); — deuxième attente : téléchargement + parsing.
Afficher :: on met à jour le DOM avec data (textContent ou createElement).
Gérer l'échec :: catch (err) affiche un message clair à l'utilisateur.
Nettoyer :: finally réactive le bouton, cache « Chargement... ».
```

```javascript nontest
const $btn = document.querySelector("#charger");
const $p = document.querySelector("#resultat");

$btn.addEventListener("click", async () => {
  $btn.disabled = true;
  $p.textContent = "Chargement...";                       // 1. loading
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Erreur HTTP: " + res.status);
    const users = await res.json();
    $p.textContent = users.map(u => u.name).join(", "); // 2. succès
  } catch (err) {
    $p.textContent = "Erreur : " + err.message;          // 3. erreur
  } finally {
    $btn.disabled = false;
  }
});
```

C'est le TP 4 (« Charger les utilisateurs »).

Envoyer des données (POST) : on configure les options.

```javascript nontest
fetch("https://api.exemple.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Architecture", author: "M. Zouina" })
});
```

## Idée 5 · Plusieurs promesses à la fois

`await` en série additionne les durées. Si les requêtes sont indépendantes, on les lance **en parallèle**.

| Méthode | Réussit quand | Échoue quand | Usage |
|---|---|---|---|
| `Promise.all` | **toutes** réussissent | **dès la première** qui échoue | tableau de bord complet |
| `Promise.allSettled` | toujours (rapport de chaque résultat) | jamais | envoi de 5 fichiers |
| `Promise.race` | la première **terminée** réussit | la première terminée échoue | délai maximum (timeout) |
| `Promise.any` | la première **réussite** | toutes échouent (`AggregateError`) | serveurs miroirs |

```javascript
const req = (nom, ms, ok = true) => new Promise((res, rej) =>
  setTimeout(() => ok ? res(nom) : rej(new Error(nom + " en panne")), ms));

(async () => {
  console.log(await Promise.all([req("api1", 30), req("api2", 10)]));
  console.log(await Promise.race([req("api1", 30), req("api2", 10)]));
  console.log(await Promise.any([req("api1", 5, false), req("api2", 20), req("api3", 40)]));
  const r = await Promise.allSettled([req("a", 5), req("b", 5, false)]);
  console.log(r.map(x => x.status));
  try { await Promise.all([req("a", 5), req("b", 5, false)]); }
  catch (e) { console.log("all a échoué :", e.message); }
})();
```

```sortie
[ 'api1', 'api2' ]
api2
api2
[ 'fulfilled', 'rejected' ]
all a échoué : b en panne
```

`Promise.all` garde l'**ordre du tableau**, pas l'ordre d'arrivée. `Promise.any` ignore api1 (en panne) et prend la première réussite.

> [!prof] Examen 2025, ex. 4 : trois serveurs identiques, prendre **le plus rapide qui répond**, même si certains sont en panne. C'est `Promise.any` (corrigé complet au chapitre 11).

## S'exercer

```exercice Exercices type examen et TD 4
? (Examen 2025, Q8) Différence entre la gestion des erreurs avec les promesses et avec async/await ?
= Avec les promesses chaînées, on attache `.catch(err => ...)` à la fin de la chaîne `.then(...)`. Avec async/await, on écrit du code d'allure synchrone et on entoure les `await` d'un `try { } catch (err) { }` (plus `finally`). Les deux attrapent les rejets ; `try/catch` attrape en plus les erreurs ordinaires du même bloc.

? Un serveur répond 404. `fetch(url).then(r => r.json()).catch(...)` : le `catch` est-il déclenché par le 404 ?
= Non. Pour fetch, une réponse 404 est une communication réussie : la promesse est tenue. Il faut tester `if (!r.ok) throw new Error(...)`.

? Deux requêtes indépendantes de 2 s et 3 s. Durée totale avec deux `await` successifs, puis avec `Promise.all` ?
= En série : 2 + 3 = 5 s. Avec `Promise.all` : 3 s (la plus longue).
```

## Flashcards

```cartes
Les 3 états d'une promesse :: pending, fulfilled (resolve), rejected (reject).
then / catch :: then : succès (chaînable) ; catch : échec.
Que fait await ? :: Suspend la fonction async jusqu'à la résolution de la promesse et renvoie sa valeur.
Quand fetch rejette-t-il ? :: Seulement si le réseau échoue. Un 404 ou un 500 ne rejette pas : tester response.ok.
Pourquoi deux await avec fetch ? :: Le 1er attend la réponse (headers), le 2e attend le corps (res.json()).
Options d'un POST fetch :: method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(données).
Promise.all :: Tout ou rien : échoue dès la première promesse rejetée.
Promise.any :: Première réussite ; AggregateError si toutes échouent.
Promise.race :: Première terminée, succès ou échec.
Promise.allSettled :: Attend tout, ne rejette jamais, donne le statut de chacune.
Codes HTTP 2xx, 4xx, 5xx :: Succès ; erreur du client ; erreur du serveur.
```

## QCM du chapitre

```qcm
? Quelle méthode HTTP sert à **créer** une ressource ?
- GET
+ POST
- DELETE
= GET lit, POST crée, PUT/PATCH modifie, DELETE supprime.

? Un code 404 signifie :
- erreur du serveur
+ ressource introuvable (erreur du client)
- succès
= Les 4xx sont des erreurs côté client.

? Combien de fois une promesse peut-elle changer d'état final ?
+ Une seule
- Autant qu'on appelle resolve
- Deux (resolve puis reject)
= Le premier appel verrouille l'état.

? `fetch` reçoit une réponse 500. La promesse est :
+ tenue (fulfilled), avec res.ok === false
- rejetée
- en attente pour toujours
= Seul un échec réseau la rejette.

? `res.json()` renvoie :
- directement un objet
+ une promesse de l'objet
- une chaîne
= D'où le second then ou le second await.

? `await` peut s'utiliser :
- n'importe où
+ dans une fonction async (ou au niveau supérieur d'un module)
- seulement dans un then
= Hors fonction async, c'est une erreur de syntaxe dans un script classique.

? Pour envoyer un objet en JSON avec fetch, le body doit être :
- l'objet lui-même
+ JSON.stringify(objet)
- JSON.parse(objet)
= Le corps est du texte.

? Interroger 3 serveurs miroirs et garder la première **réussite** :
- Promise.all
- Promise.race
+ Promise.any
= race prendrait aussi un échec s'il arrive en premier.

? `Promise.all([p1, p2])` si p2 est rejetée :
+ rejette avec l'erreur de p2
- renvoie [p1, undefined]
- attend p1 puis réussit
= Tout ou rien.

? Quel bloc permet de réactiver le bouton après un fetch, réussi ou non ?
- catch
- then
+ finally
= finally s'exécute dans tous les cas.
```

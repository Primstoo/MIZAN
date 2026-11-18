---
id: td-tp-corriges
titre: TD 1 à 4 et TP corrigés
seance: Travaux dirigés et travaux pratiques
importance: 4
---

Ce chapitre reprend les énoncés des **TD 1 à 4** et des **TP 1 à 4** du Pr Zouina, avec une correction rédigée par ToumaiLearn. Essaie d'abord seul : ouvre le corrigé seulement après.

> [!attention] Les fiches sont scannées. Les corrigés manuscrits fournis (TD 1, TD 4) ont servi de référence ; les autres corrections sont rédigées ici à partir du cours. Le code DOM se teste dans le navigateur, le reste a été exécuté avec Node.js.

## Avant de commencer

Ce chapitre suppose les chapitres 2 à 9 lus. Un seul réflexe à vérifier : savoir où se teste un code.

```exercice Vérifie ton prérequis
? Peut-on tester `document.querySelector("#liste")` avec `node fichier.js` ?
= Non : `document` est fourni par le navigateur. Le code DOM se teste dans une page HTML (console F12) ; le JavaScript pur (tableaux, classes, promesses) peut se tester avec Node.
```

## Comment aborder ce chapitre

> [!astuce] Pour chaque exercice, repère d'abord **la notion du cours visée** (le titre de l'exercice la donne presque toujours : « Délégation », « Création de masse », « Callbacks »…). La solution attendue est celle du cours, pas une autre.

> [!piege] Recopier un corrigé sans l'exécuter. Ouvre une page vide, colle le HTML de l'énoncé, puis ton script avec `defer`.

À la fin, tu as traité les quatre TD et les quatre TP, qui couvrent tout le programme de l'examen.

## TD 1 · Mémoire, flux et sous-programmes

Les exercices 1 à 4 sont corrigés dans les chapitres 2 et 3 (hoisting, `==`, `switch` sans `break`, boucle sur `transactions`, `calculerSalaireNet`). Version complète de l'exercice 4 :

```javascript
function calculerSalaireNet(tauxHoraire = 15, heuresTravaillees = 0, bonus = 0) {
  const brut = tauxHoraire * heuresTravaillees;
  return brut - brut * 0.20 + bonus;
}
const complet = calculerSalaireNet(20, 100, 300);
const sansBonus = calculerSalaireNet(20, 100);
const vide = calculerSalaireNet();
console.log(complet, sansBonus, vide);
```

```sortie
1900 1600 0
```

## TD 2 · Programmation fonctionnelle, objets intégrés, callbacks

Exercices 1, 3 et 4 : voir chapitre 5 (`filter`/`map`/`reduce` sur `parcServeurs` → `['SRV-01','SRV-03']` et 187 ; `analyserFichier` ; ordre A, C, B). Exercice 2 :

```javascript
const prenomBrut = "  aLi ";
const prenomPropre = prenomBrut.trim().toUpperCase();
console.log(`[${prenomPropre}] [${prenomBrut}]`);

const idSession = Math.floor(Math.random() * 1000) + 1;
console.log(idSession >= 1 && idSession <= 1000);

const iso = new Date(Date.UTC(2026, 3, 1, 10, 0, 44)).toISOString();
console.log(iso);
```

```sortie
[ALI] [  aLi ]
true
2026-04-01T10:00:44.000Z
```

Dans le vrai code, `new Date().toISOString()` donne l'instant présent ; ici la date est fixée pour que la sortie soit vérifiable.

## TD 3 · DOM

Le HTML : un `#dashboard` avec `header.carte-profil` (contenant `h2#nom-utilisateur` « Invité » et `div.zone-securisee`), une `table.table-serveurs` (deux lignes, la seconde `tr.serveur-hs`), une `ul#liste-logs` vide.

```javascript nontest
// Ex. 1 : sélection, sécurité, état
document.querySelector("#nom-utilisateur").textContent = "Administrateur Système";
const $carte = document.querySelector("header.carte-profil");
$carte.classList.add("connecte");
const payload = "<img src='x' onerror='alert(\"Piraté!\")'>";
document.querySelector(".zone-securisee").textContent = payload;   // pas innerHTML !

// Ex. 2 : navigation agnostique
const $btn = document.querySelector(".btn-reboot");
$btn.closest("tr").classList.add("en-maintenance");

// Ex. 3 : création de masse, une seule insertion
const logs = Array.from({ length: 100 }, (_, i) => `Log n°${i + 1}`);
const $fragment = document.createDocumentFragment();
logs.forEach(texte => {
  const $li = document.createElement("li");
  $li.textContent = texte;
  $fragment.append($li);
});
document.querySelector("#liste-logs").append($fragment);

// Ex. 4 : suppression directe
document.querySelector(".serveur-hs").remove();
```

## TD 4 · Formulaires, délégation, promesses et persistance

Le HTML : `form#form-creation-compte` (`#input-nom`, `#input-mdp`, bouton submit, `#zone-erreurs`) et `ul#liste-employes` avec des `li.carte-employe` contenant un `button.btn-bannir`.

```javascript nontest
const $formulaire = document.querySelector("#form-creation-compte");
const $inputNom = document.querySelector("#input-nom");
const $inputMdp = document.querySelector("#input-mdp");
const $zoneErreurs = document.querySelector("#zone-erreurs");
const $bouton = $formulaire.querySelector("button[type='submit']");

// Ex. 2 : un seul écouteur pour 10 000 boutons (délégation)
document.querySelector("#liste-employes").addEventListener("click", (e) => {
  const $btn = e.target.closest(".btn-bannir");
  if (!$btn) return;
  $btn.closest(".carte-employe").remove();
});

// Ex. 3 : promesse simulée
const simulerCreationCompte = (nom, mdp) => new Promise((resolve, reject) => {
  if (mdp.length < 8) return reject(new Error("Le mot de passe doit faire 8 caractères minimum."));
  setTimeout(() => resolve(nom), 2000);
});

// Ex. 1 + 3 : validation, puis async/await
$formulaire.addEventListener("submit", async (e) => {
  e.preventDefault();                                   // pas de rechargement
  const nom = $inputNom.value.trim();
  const mdp = $inputMdp.value;
  if (nom === "") {                                      // ex. 1 (le mdp est vérifié par la promesse)
    $zoneErreurs.textContent = "Le nom est obligatoire.";
    return;
  }
  const texteOrigine = $bouton.textContent;
  $bouton.disabled = true;
  $bouton.textContent = "Création en cours...";
  $zoneErreurs.textContent = "";
  try {
    const nomCree = await simulerCreationCompte(nom, mdp);
    localStorage.setItem("dernierAdmin", nomCree);
    $formulaire.reset();
    alert("Compte créé avec succès");
  } catch (err) {
    $zoneErreurs.textContent = err.message;
  } finally {
    $bouton.disabled = false;
    $bouton.textContent = texteOrigine;
  }
});
```

> [!prof] Dans son corrigé de l'exercice 1, le prof teste `nom === "" || mdp.length < 8`, écrit l'erreur dans `#zone-erreurs` avec `textContent`, fait un `return` (court-circuit), puis `form.reset()` et `console.log("Compte créé avec succès")`. Les deux écouteurs `submit` (ex. 1 et ex. 3) ne doivent pas coexister : garde la version de l'exercice 3.

## TP 1 · Bases (prompt, alert, conditions, fonctions, boucles)

`prompt()` renvoie **toujours une chaîne** : convertis avec `Number()` avant de calculer. Ces fonctions n'existent que dans le navigateur.

```javascript nontest
const prenom = prompt("Ton prénom ?");
const pays = "Maroc";
alert(`Bonjour, je m'appelle ${prenom} et je vis au ${pays}.`);
alert(prenom.length);

const heure = Number(prompt("Quelle heure est-il (0-23) ?"));
if (heure < 12) alert("Bonjour !");
else if (heure < 18) alert("Bon après-midi !");
else alert("Bonsoir !");
```

La logique, sans `prompt`, peut se tester avec Node :

```javascript
const meteoMessage = (meteo) => {
  switch (meteo) {
    case "ensoleillé": return "Lunettes de soleil !";
    case "pluvieux": return "Prends un parapluie.";
    case "nuageux": return "Une veste suffira.";
    default: return "Météo inconnue.";
  }
};
const calculerAge = (anneeNaissance, anneeCourante = 2026) => anneeCourante - anneeNaissance;
const estMajeur = age => age >= 18;
function afficherProfil(nom, anneeNaissance) {
  const age = calculerAge(anneeNaissance);
  return `Nom : ${nom} | Âge : ${age} | Majeur ? ${estMajeur(age) ? "Oui" : "Non"}`;
}
const pays = "maroc", age = 18;
console.log(meteoMessage("pluvieux"));
console.log(pays === "maroc" && age >= 18 ? "Accès autorisé" : "Accès restreint");
console.log(afficherProfil("Patrick", 2004));
for (let i = 1; i <= 3; i++) console.log(`Café n°${i}`);
```

```sortie
Prends un parapluie.
Accès autorisé
Nom : Patrick | Âge : 22 | Majeur ? Oui
Café n°1
Café n°2
Café n°3
```

> [!attention] Le TP propose `new Date().getFullYear()` pour l'année en cours. On a mis `anneeCourante = 2026` en paramètre par défaut uniquement pour que la sortie ci-dessus reste vérifiable.

## TP 2 · Garage automobile (classes)

```javascript
class Moteur {
  constructor(type, puissance) { this.type = type; this.puissance = puissance; }
}

class Vehicule {
  #prix;
  constructor(marque, modele, annee, moteur, prix) {
    this.marque = marque; this.modele = modele; this.annee = annee;
    this.moteur = moteur;
    this.prix = prix;                      // passe par le setter
  }
  get prix() { return this.#prix; }
  set prix(v) { if (v <= 0) throw new Error("prix invalide"); this.#prix = v; }
  getAnciennete(anneeCourante = 2026) { return anneeCourante - this.annee; }
  afficherFiche() {
    return `${this.marque} ${this.modele} (${this.annee}) ${this.moteur.type} ${this.moteur.puissance} CH - ${this.prix} DH`;
  }
}

class Voiture extends Vehicule {
  constructor(marque, modele, annee, moteur, prix, nombreDePortes) {
    super(marque, modele, annee, moteur, prix);
    this.nombreDePortes = nombreDePortes;
  }
  afficherFiche() { return `${super.afficherFiche()} - ${this.nombreDePortes} portes`; }
}

class Garage {
  static nom = "Garage FSABM";
  constructor() { this.vehicules = []; }
  ajouterVehicule(v) { this.vehicules.push(v); }
  afficherTousLesVehicules() { this.vehicules.forEach(v => console.log(v.afficherFiche())); }
  rechercherParMarque(marque) { return this.vehicules.filter(v => v.marque === marque); }
  vehiculesRecents() { return this.vehicules.filter(v => v.annee > 2020); }
  calculerValeurTotale() { return this.vehicules.reduce((s, v) => s + v.prix, 0); }
}

const essence = new Moteur("essence", 90);
const diesel = new Moteur("diesel", 110);
const electrique = new Moteur("électrique", 150);
const garage = new Garage();
[
  new Voiture("Renault", "Clio", 2019, essence, 120000, 5),
  new Voiture("Dacia", "Logan", 2022, diesel, 140000, 5),
  new Voiture("Renault", "Megane", 2021, diesel, 210000, 5),
  new Voiture("Peugeot", "208", 2018, essence, 110000, 3),
  new Voiture("Tesla", "Model 3", 2023, electrique, 450000, 4)
].forEach(v => garage.ajouterVehicule(v));

console.log(Garage.nom);
garage.afficherTousLesVehicules();
console.log(garage.rechercherParMarque("Renault").map(v => v.modele));
console.log(garage.vehiculesRecents().map(v => v.modele));
console.log(garage.calculerValeurTotale());
```

```sortie
Garage FSABM
Renault Clio (2019) essence 90 CH - 120000 DH - 5 portes
Dacia Logan (2022) diesel 110 CH - 140000 DH - 5 portes
Renault Megane (2021) diesel 110 CH - 210000 DH - 5 portes
Peugeot 208 (2018) essence 90 CH - 110000 DH - 3 portes
Tesla Model 3 (2023) électrique 150 CH - 450000 DH - 4 portes
[ 'Clio', 'Megane' ]
[ 'Logan', 'Megane', 'Model 3' ]
1030000
```

## TP 3 · DOM et événements

Les exercices finissent par une validation de formulaire (champs non vides, message rouge ou vert dans `#msg`, pas de rechargement) et une todo-list (`ul#todo-list`, un écouteur sur `<ul>`, `event.target`, classe qui barre l'élément).

```javascript nontest
// Formulaire
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const $msg = document.querySelector("#msg");
  const vides = [...e.target.querySelectorAll("input")].some($in => $in.value.trim() === "");
  $msg.textContent = vides ? "Tous les champs sont obligatoires." : "Envoyé !";
  $msg.style.color = vides ? "red" : "green";   // ou mieux : classList.toggle("erreur", vides)
});

// Todo-list (délégation)
document.querySelector("#todo-list").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") event.target.classList.toggle("barre");
});
```

## TP 4 · Charger des utilisateurs depuis une API

Le corrigé complet (bouton, `fetch` sur `https://jsonplaceholder.typicode.com/users`, `response.ok`, affichage des noms dans un paragraphe, `try/catch/finally`) est dans le chapitre 9, Idée 4.

## Flashcards

```cartes
TD 1, ex. 4 : calculerSalaireNet() sans argument :: Renvoie 0 grâce aux valeurs par défaut (15, 0, 0), pas NaN.
TD 2, ex. 2 : nettoyer "  aLi " :: prenomBrut.trim().toUpperCase() → "ALI" ; l'original ne change pas.
Entier aléatoire entre 1 et 1000 :: Math.floor(Math.random() * 1000) + 1
TD 3, ex. 3 : 100 `<li>` en une insertion :: Les ajouter à un DocumentFragment, puis append du fragment sur #liste-logs.
TD 4, ex. 2 : 10 000 boutons, un écouteur :: Écouteur sur la liste + e.target.closest(".btn-bannir"), puis closest(".carte-employe").remove().
TP 1 : prompt("âge") renvoie… :: Toujours une chaîne : Number(...) avant de calculer.
TP 2 : appeler le constructeur parent :: super(marque, modele, annee, moteur, prix) avant this.nombreDePortes.
TP 2 : valeur totale du stock :: this.vehicules.reduce((s, v) => s + v.prix, 0)
```

## QCM du chapitre

```qcm
? TD 1 : `calculerSalaireNet(20, 100, 300)` (net = brut − 20 % + bonus) vaut :
- 2300
+ 1900
- 1600
= 2000 × 0,8 = 1600, + 300 = 1900.

? TD 2 : `"  aLi ".trim().toUpperCase()` donne :
+ "ALI"
- "  ALI "
- "Ali"
= trim enlève les espaces aux extrémités.

? TD 2 : `Math.random()` renvoie un nombre dans :
- [0, 1]
+ [0, 1[
- [1, 1000]
= 1 est exclu, d'où floor puis + 1.

? TD 3, ex. 1.3 : pour injecter le payload sans exécution :
- innerHTML
+ textContent
- insertAdjacentHTML
= Les deux autres interprètent le HTML.

? TD 3, ex. 2 : remonter du bouton à sa ligne, quelle que soit la profondeur :
- parentElement.parentElement
+ closest("tr")
- previousElementSibling
= closest est robuste aux changements de structure.

? TD 4, ex. 1 : première instruction de l'écouteur submit :
+ e.preventDefault()
- e.stopPropagation()
- form.reset()
= Elle bloque le rechargement de la page.

? TD 4, ex. 3 : où remettre le bouton dans son état d'origine ?
- dans try
- dans catch
+ dans finally
= Exécuté en cas de succès comme d'échec.

? TP 1 : avec `const age = prompt("Âge ?")`, `age + 1` pour la saisie 18 donne :
- 19
+ "181"
- NaN
= prompt renvoie une chaîne : + concatène.

? TP 2 : quelle méthode de tableau pour `vehiculesRecents()` ?
- map
+ filter
- reduce
= On garde un sous-ensemble (annee > 2020).

? TP 3 : dans l'écouteur posé sur `<ul>`, quel `<li>` a été cliqué ?
+ event.target
- event.currentTarget
- this.children[0]
= currentTarget serait le `<ul>` lui-même.
```

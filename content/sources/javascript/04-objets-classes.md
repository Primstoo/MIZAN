---
id: objets-classes
titre: Objets, classes et objets intégrés
seance: Séance 3 · Tableaux, objets et fonctions avancées (1/2)
importance: 5
---

## Avant de commencer

Il faut avoir compris le chapitre 2 : une variable qui contient un objet ne contient que son **adresse**.

```exercice Vérifie ton prérequis
? `const p = { x: 1 }; const q = p; q.x = 9;` Que vaut `p.x` ?
reponse: 9
= 9. `q` et `p` pointent vers le même objet dans le tas : c'est l'état partagé.
```

## Comment aborder ce chapitre

> [!astuce] Un objet = **état** (propriétés) + **comportement** (méthodes). Une classe = le **plan de fabrication** de ces objets. Pense « moule » et « pièces ».

> [!piege] Écrire une méthode d'objet avec une **fonction fléchée** : `this` ne pointerait plus vers l'objet. Pour les méthodes, utilise la syntaxe courte `nom() { ... }`.

À la fin, tu sais écrire un objet littéral avec getter/setter, une classe avec `constructor`, `extends`, `super` et `#prive`, faire une copie profonde, et utiliser `String`, `Math`, `Date`.

## Idée 1 · Mode strict et TypeScript

JS est historiquement permissif (il se tait face aux erreurs). Deux garde-fous :

- **`"use strict";`** en tête de fichier ou de fonction : interdit les variables non déclarées, interdit `delete` sur une variable, et `this` ne vaut plus l'objet global par défaut. Principe **fail-fast**.
- **TypeScript** (Microsoft) : sur-ensemble de JS avec **typage statique** (`let montant: number = 50;`). Le compilateur `tsc` le transpile en `.js`, car les navigateurs ne lisent pas le TS.

```javascript
"use strict";
try {
  compteur = 1;
} catch (e) {
  console.log(e.name + " : " + e.message);
}
```

```sortie
ReferenceError : compteur is not defined
```

Sans `"use strict"`, cette ligne aurait créé en silence une variable globale.

## Idée 2 · Objets littéraux, this, getters et setters

Un objet regroupe des paires **clé/valeur**. Accès par **point** (`obj.port`, nom connu) ou par **crochets** (`obj[cle]`, nom dans une variable).

Dans une méthode classique, **`this` désigne l'objet qui appelle la méthode**.

```javascript
const compteBancaire = {
  titulaire: "Mouad",
  solde: 5000,
  afficherSolde() {
    console.log(`Titulaire: ${this.titulaire} | Solde: ${this.solde} DH`);
  },
  deposer(montant) {
    this.solde += montant;
  }
};
compteBancaire.deposer(1500);
compteBancaire.afficherSolde();
const champ = "solde";
console.log(compteBancaire[champ]);
```

```sortie
Titulaire: Mouad | Solde: 6500 DH
6500
```

Un **getter** se lit comme une propriété mais exécute une fonction ; un **setter** filtre l'affectation. Le préfixe `_` signale par convention une propriété interne.

```javascript
const utilisateur = {
  _age: 25,
  get age() { return `${this._age} ans`; },
  set age(v) {
    if (v > 0 && v < 120) this._age = v;
    else console.log("Valeur d'âge non conforme.");
  }
};
console.log(utilisateur.age);
utilisateur.age = -5;
console.log(utilisateur.age);
```

```sortie
25 ans
Valeur d'âge non conforme.
25 ans
```

## Idée 3 · Classes, héritage et membres privés

```flux De la classe aux instances
class Serveur (plan) -> new Serveur("192.168.1.1", 80) -> constructor() initialise this -> instance propre dans le tas
```

```javascript
class Vehicule {
  #prix;
  constructor(marque, prix) {
    this.marque = marque;
    this.prix = prix;
  }
  get prix() { return this.#prix; }
  set prix(v) {
    if (v <= 0) throw new Error("prix invalide");
    this.#prix = v;
  }
  afficherFiche() { return `${this.marque} - ${this.prix} DH`; }
}

class Voiture extends Vehicule {
  constructor(marque, prix, nombreDePortes) {
    super(marque, prix);
    this.nombreDePortes = nombreDePortes;
  }
  afficherFiche() { return super.afficherFiche() + ` - ${this.nombreDePortes} portes`; }
}

const v = new Voiture("Dacia", 150000, 5);
console.log(v.afficherFiche());
console.log(v instanceof Vehicule);
try { v.prix = -1; } catch (e) { console.log(e.message); }
```

```sortie
Dacia - 150000 DH - 5 portes
true
prix invalide
```

- `#prix` est **privé** (ES2022) : `v.#prix` hors de la classe est une erreur de syntaxe.
- `_nom` : convention « protected », rien n'est bloqué.
- `super(...)` appelle le constructeur parent ; il doit venir **avant** tout `this` dans le constructeur de la classe fille.
- Une propriété **statique** (`static nom = "Garage"`) appartient à la classe, pas aux instances.

> [!prof] C'est exactement le TP 2 (garage : `Moteur`, `Vehicule`, `Voiture extends Vehicule`, `Garage`). Le corrigé complet est au chapitre 10.

## Idée 4 · Copie superficielle et copie profonde

Copier une référence (`const b = a`) partage l'objet. Le prof montre un **constructeur de copie** qui recrée l'objet imbriqué à une nouvelle adresse :

```javascript
class ConfigurationServeur {
  constructor(nom, specsReseau) {
    if (nom instanceof ConfigurationServeur) {
      const source = nom;
      this.nom = source.nom + " (Clone)";
      this.specsReseau = { port: source.specsReseau.port, protocole: source.specsReseau.protocole };
    } else {
      this.nom = nom;
      this.specsReseau = specsReseau;
    }
  }
}
const configProd = new ConfigurationServeur("Prod", { port: 443, protocole: "HTTPS" });
const configTest = new ConfigurationServeur(configProd);
configTest.specsReseau.port = 8080;
console.log(configProd.specsReseau.port, configTest.specsReseau.port);
```

```sortie
443 8080
```

> [!attention] Hors supports : la fonction native `structuredClone(obj)` (navigateurs récents, Node 17+) fait une copie profonde en une ligne.

## Idée 5 · Objets intégrés : String, Math, Date

**Autoboxing** : `"Sofia".length` marche car le moteur enveloppe un instant la primitive dans un objet `String`.

```javascript
const nom = "Sofia";
console.log(nom.length, nom.toUpperCase(), nom);
console.log(nom.includes("fi"), nom.slice(0, 2));
console.log("  aLi ".trim().toUpperCase());
console.log("a,b,c".split(","));
console.log(Array.from("CODE"));

console.log(Math.round(Math.PI * Math.pow(5.5, 2)));

const d = new Date(2026, 3, 1);
console.log(d.getFullYear(), d.getMonth() + 1, d.getDate());
```

```sortie
5 SOFIA Sofia
true So
ALI
[ 'a', 'b', 'c' ]
[ 'C', 'O', 'D', 'E' ]
95
2026 4 1
```

> [!piege] Dans `new Date(2026, 3, 1)`, **les mois commencent à 0** : 3 = avril. D'où le `+ 1` à la lecture. Les jours, eux, commencent à 1.

- Les méthodes de `String` ne modifient **jamais** la chaîne : elles en créent une nouvelle (immutabilité).
- `Math` est **statique** : `new Math()` lève une TypeError. `Date` s'instancie avec `new`.
- `Date` stocke un **timestamp** : millisecondes depuis le 1er janvier 1970 UTC (`getTime()`). Pour une API, envoie `toISOString()` (format ISO 8601, en UTC).

## S'exercer

```exercice Exercices type TD 2 et examen
? (TD 2, ex. 2) `const prenomBrut = "  aLi ";` Nettoie les espaces, mets en majuscules sans modifier la variable d'origine. Puis génère un entier entre 1 et 1000, et la date du jour au format ISO.
= `const prenomPropre = prenomBrut.trim().toUpperCase();` → `"ALI"` ; `prenomBrut` reste intact (chaînes immuables). `const id = Math.floor(Math.random() * 1000) + 1;` (random donne [0, 1[, donc ×1000 → [0, 1000[, floor → 0..999, +1 → 1..1000). `const iso = new Date().toISOString();`.

? (Examen 2025, Q7) Quelle est la syntaxe d'un membre privé de classe ?
= Le préfixe `#` : `class Compte { #solde = 0; getSolde() { return this.#solde; } }`. Il est inaccessible hors de la classe.

? Pourquoi `const objet = { nom: "A", saluer: () => this.nom }` ne marche-t-il pas ?
= Une fléchée n'a pas son propre `this` : elle prend celui du contexte où l'objet est écrit (global), pas l'objet. Il faut `saluer() { return this.nom; }`.
```

## Flashcards

```cartes
Effets de "use strict" :: Interdit les variables non déclarées, delete sur variable ; this n'est plus l'objet global par défaut.
TypeScript en une phrase :: Sur-ensemble typé de JS, transpilé en .js par tsc.
obj.cle vs obj[cle] :: Point : nom connu à l'écriture. Crochets : nom contenu dans une variable.
this dans une méthode classique :: L'objet qui appelle la méthode.
Rôle d'un setter :: Intercepter l'affectation pour valider la valeur avant de la stocker.
#x vs _x dans une classe :: #x : vraiment privé (ES2022). _x : simple convention « protected ».
super(...) :: Appelle le constructeur parent ; obligatoire avant d'utiliser this dans une classe fille.
Mois de Date :: De 0 (janvier) à 11 (décembre).
Math vs Date :: Math est statique (pas de new). Date s'instancie avec new.
Copie profonde :: Recréer chaque objet imbriqué à une nouvelle adresse (constructeur de copie, ou structuredClone).
```

## QCM du chapitre

```qcm
? Que fait `"use strict"` face à `x = 5` (x non déclaré) ?
- Crée une variable globale x
+ Lève une ReferenceError
- Ignore la ligne
= Le mode strict transforme les erreurs silencieuses en exceptions.

? Dans `compte.deposer(100)`, `this` à l'intérieur de `deposer` désigne :
+ compte
- window
- la fonction deposer
= Dans une méthode classique, this = l'objet avant le point.

? Comment lire la propriété dont le nom est dans la variable `champ` ?
- obj.champ
+ obj[champ]
- obj->champ
= obj.champ chercherait une propriété nommée littéralement "champ".

? Quel mot-clé appelle le constructeur de la classe parente ?
- parent()
+ super()
- this.parent()
= super(...) dans le constructeur de la classe fille.

? Quelle syntaxe déclare un champ **privé** ?
- private solde
- _solde
+ #solde
= `#` est la syntaxe officielle (ES2022). `_` n'est qu'une convention.

? `new Date(2026, 0, 15)` correspond au :
+ 15 janvier 2026
- 15 février 2026
- 0 janvier 2026
= Les mois commencent à 0.

? `new Math()` :
- crée un objet Math
+ lève une TypeError : Math n'est pas un constructeur
- renvoie undefined
= Math est une boîte à outils statique.

? Après `const s = "abc"; s.toUpperCase();`, `s` vaut :
+ "abc"
- "ABC"
- undefined
= Les chaînes sont immuables : la méthode renvoie une nouvelle chaîne.

? `structuredClone` / constructeur de copie servent à :
- copier la référence
+ faire une copie profonde, indépendante de l'original
- supprimer un objet
= Modifier la copie ne touche plus l'original.

? Pour une méthode d'objet littéral, il faut éviter :
- la syntaxe courte nom() {}
- function()
+ la fonction fléchée, qui n'a pas son propre this
= Le prof l'appelle un anti-pattern.
```

---
id: mld-normalisation
titre: Du MCD au MLD, puis normalisation (1NF à BCNF)
seance: Séance 3 · 21 mars 2026
importance: 4
---

## Avant de commencer

Il faut savoir lire une cardinalité (1,1 ; 0,N…) et une dépendance fonctionnelle (chapitre 1).

```exercice Vérifie ton prérequis
? « Enseignant 0,N — Enseigne — 1,1 Cours ». Combien d'enseignants a un cours ?
= Exactement un (la cardinalité 1,1 est du côté Cours). Un enseignant, lui, peut avoir 0 ou plusieurs cours.
```

## Comment aborder ce chapitre

> [!astuce] **Regarde les maximums.** Toute la conversion MCD → MLD dépend d'une seule question : y a-t-il un « 1 » en maximum d'un côté ? Si oui, clé étrangère. Si les deux maximums valent N, nouvelle table.

> [!piege] Mettre la clé étrangère du mauvais côté. Elle va **dans la relation de l'entité qui a la cardinalité 1,1** (celle qui « pointe » vers une seule occurrence de l'autre).

À la fin, tu sais transformer un MCD en MLD, l'écrire en CREATE TABLE et vérifier les formes normales 1NF, 2NF, 3NF et BCNF.

## Idée 1 · Le vocabulaire du MLD

Une **relation** a un nom, des attributs, **une seule clé primaire** (soulignée) et zéro, une ou plusieurs **clés étrangères** (notées `#`).

`Enseignant (num_ens, nom, prénom, spécialité)` · `Cours (code_cours, intitulé, num_ens#)`

- **Cardinalité d'une relation** = nombre de lignes. **Degré** = nombre d'attributs.
- Termes rigoureux : **clé candidate** (ensemble minimal identifiant) et **contrainte d'inclusion** (= clé étrangère).
- Une clé étrangère a **le même type** que la clé primaire qu'elle référence.

## Idée 2 · Les quatre règles de conversion

```etapes Convertir un MCD en MLD
Règle 1 · Entité :: Chaque entité devient une relation ; son identifiant devient la clé primaire.
Règle 2 · Association (0/1,N)–(0/1,N) :: Nouvelle relation (associative). Clé = concaténation des identifiants, qui sont aussi clés étrangères. Les données portées deviennent des attributs. Ex. ENSEIGNE(num_ens#, code_cours#, date_attribution).
Règle 3 · Une cardinalité 1,1 :: Clé étrangère dans la relation du côté 1,1, vers l'autre entité. L'association doit être binaire et sans données propres. Ex. Etudiant(…, code_formation#).
Règle 4 · Une cardinalité 0,1 :: Clé étrangère côté 0,1 (association sans données), ou relation associative (permet des employés sans projet et d'ajouter une date d'affectation).
Cas mixtes :: 0,1 – 1,1 : clé étrangère côté 1,1. 0,1 – 0,1 : au choix (cas rare, vérifier la réalité).
```

```grille MCD de la séance 2 → MLD
#cols: Relation | Clé primaire | Clés étrangères
Enseignant | *num_ens | ·
Formation | *code_formation | ·
Cours | *code_cours | !num_ens#
Etudiant | *num_etu | !code_formation#
SUIVRE | *num_etu, code_cours | !num_etu#, code_cours#
CONTIENT | *code_formation, code_cours | !code_formation#, code_cours#
```

> [!attention] Une diapo de la règle 3 écrit `Client (…, num_commande#)` et `Commande (num_commande, …)`. Si un client passe **plusieurs** commandes (cas normal, Commande 1,1 — Client 1,N), la clé étrangère doit aller dans **Commande** : `Commande (num_commande, date, montant, num_client#)`. La version des diapos ne marche que si un client n'a qu'une commande.

## Idée 3 · Passage au SQL (MPD)

Chaque relation → `CREATE TABLE` ; clé primaire → `PRIMARY KEY` ; clé étrangère → `FOREIGN KEY … REFERENCES`. Voici le MLD du cours, exécuté sous SQLite :

```sql
CREATE TABLE Enseignant (num_ens INTEGER PRIMARY KEY, nom VARCHAR(50) NOT NULL, specialite VARCHAR(100));
CREATE TABLE Formation (code_formation INTEGER PRIMARY KEY, intitule VARCHAR(100) NOT NULL);
CREATE TABLE Etudiant (
  num_etu INTEGER PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  code_formation INT NOT NULL,
  FOREIGN KEY (code_formation) REFERENCES Formation(code_formation)
);
CREATE TABLE Cours (code_cours INTEGER PRIMARY KEY, intitule VARCHAR(100) NOT NULL, num_ens INT NOT NULL,
  FOREIGN KEY (num_ens) REFERENCES Enseignant(num_ens));
CREATE TABLE SUIVRE (
  num_etu INT NOT NULL, code_cours INT NOT NULL,
  PRIMARY KEY (num_etu, code_cours),
  FOREIGN KEY (num_etu) REFERENCES Etudiant(num_etu) ON DELETE CASCADE,
  FOREIGN KEY (code_cours) REFERENCES Cours(code_cours) ON DELETE CASCADE
);
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
```

```sortie
name
Cours
Enseignant
Etudiant
Formation
SUIVRE
```

> [!attention] Le prof écrit `num_ens INT AUTO_INCREMENT PRIMARY KEY` (MySQL). Sous SQLite, l'équivalent est `INTEGER PRIMARY KEY` (auto-incrémenté d'office). À l'examen, écris la syntaxe **MySQL**.

`ON DELETE CASCADE` : supprimer un étudiant supprime automatiquement ses lignes dans SUIVRE (table enfant).

## Idée 4 · Les formes normales

```flux Chaque forme inclut la précédente
1NF -> 2NF -> 3NF -> BCNF
```

| Forme | Condition (en plus de la précédente) | Violation typique |
|---|---|---|
| **1NF** | valeurs **atomiques**, pas de groupe répétitif | colonne cours = « SQL, Java » |
| **2NF** | aucun attribut non-clé ne dépend d'une **partie** de la clé | (num_etu, code_cours) → nom_etudiant |
| **3NF** | pas de dépendance **transitive** (non-clé → non-clé) | num_etu → code_formation → intitule_formation |
| **BCNF** | pour toute DF X → Y, X est une **super-clé** | un non-clé qui détermine une partie de la clé |

**Exemple chiffré.** `Inscription(num_etu, code_cours, nom_etu, note)` : clé (num_etu, code_cours). Or num_etu → nom_etu : dépendance partielle, donc **pas en 2NF**. Correction : `Etudiant(num_etu, nom_etu)` et `Inscription(num_etu#, code_cours#, note)`.

> [!retenir] 2NF = « toute la clé », 3NF = « rien que la clé », BCNF = « seules les (super-)clés déterminent ».

## S'exercer

```exercice MLD et normalisation (TD1, examen)
? (TD1) Donne le MLD de : Livre (ISBN) 1,N — possède — 1,1 Exemplaire (num_exemplaire, état).
= Livre(ISBN, titre, …) et Exemplaire(num_exemplaire, etat, ISBN#). La clé étrangère va côté 1,1 (Exemplaire).

? (TD1) Auteur 1,N — rédige — 1,N Livre. MLD ?
= Relation associative : Rediger(id_auteur#, ISBN#). Sa clé primaire est le couple, chaque partie est aussi clé étrangère.

? La table Etudiant(num_etu, nom, code_formation, intitule_formation) est-elle en 3NF ?
= Non : num_etu → code_formation → intitule_formation est transitive. On sort Formation(code_formation, intitule_formation) et on garde code_formation# dans Etudiant.
```

## Flashcards

```cartes
Règle 1 de conversion :: Chaque entité devient une relation, son identifiant devient la clé primaire.
Association N–N au MLD :: Relation associative ; clé = concaténation des identifiants (aussi clés étrangères).
Association avec une cardinalité 1,1 :: Clé étrangère dans la relation du côté 1,1.
Degré d'une relation :: Nombre d'attributs (la cardinalité = nombre de lignes).
1NF :: Valeurs atomiques, pas de groupes répétitifs.
2NF :: 1NF + aucun attribut non-clé ne dépend d'une partie de la clé.
3NF :: 2NF + aucune dépendance transitive entre attributs non-clés.
BCNF :: Pour toute DF X → Y, X est une super-clé.
ON DELETE CASCADE :: Supprimer la ligne parente supprime les lignes enfants qui la référencent.
```

## QCM du chapitre

```qcm
? Une table est en 2NF si :
+ elle est en 1NF et tous les attributs non-clés dépendent entièrement de la clé primaire
- elle est en 1NF et n'a pas de dépendance transitive
- tous les attributs sont atomiques
- elle respecte la forme de Boyce-Codd
= Question de l'examen 2025. « Pas de dépendance transitive », c'est la 3NF.

? Combien de clés primaires possède une relation ?
- Zéro ou plus
+ Exactement une (éventuellement composée)
- Autant que de clés étrangères
= Une seule clé primaire, qui peut contenir plusieurs attributs.

? Association Étudiant 0,N — Suivre — 0,N Cours. Au MLD :
- clé étrangère dans Étudiant
- clé étrangère dans Cours
+ nouvelle relation SUIVRE(num_etu#, code_cours#)
= Deux maximums N : relation associative.

? Étudiant 1,1 — Inscrit — 0,N Formation. Où va la clé étrangère ?
+ Dans Étudiant
- Dans Formation
- Dans une nouvelle relation obligatoirement
= Côté 1,1 : Etudiant(…, code_formation#).

? Le degré d'une relation est :
- son nombre de lignes
+ son nombre d'attributs
- son nombre de clés étrangères
= Le nombre de lignes s'appelle la cardinalité de la relation.

? Une colonne « telephones » contenant « 0611…, 0522… » viole :
+ la 1NF
- la 2NF
- la 3NF
= Valeur non atomique.

? Dans R(A, B, C) de clé A, avec B → C : R n'est pas en
- 1NF
- 2NF
+ 3NF
= A → B → C : dépendance transitive.

? La règle 3 (cardinalité 1,1) exige que l'association soit :
+ binaire et sans données propres
- ternaire
- porteuse de données
= Sinon on crée une relation associative.

? Que fait ON DELETE CASCADE ?
- Il interdit la suppression du parent
+ Il supprime automatiquement les lignes enfants
- Il met les clés étrangères à NULL
= Mettre à NULL, c'est ON DELETE SET NULL.

? Une super-clé est :
+ un ensemble d'attributs qui identifie une ligne, éventuellement avec des attributs en trop
- une clé étrangère composée
- la plus petite clé possible
= La clé candidate est minimale ; la super-clé peut contenir du superflu.
```

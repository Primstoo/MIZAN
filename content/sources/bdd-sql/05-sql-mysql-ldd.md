---
id: sql-ldd
titre: SQL et MySQL · définir les données (LDD)
seance: Séances 6 et 7 · 3 et 7 avril 2026
importance: 4
---

## Avant de commencer

Il faut savoir lire un MLD (chapitre 2) : chaque relation devient une table, chaque clé une contrainte.

```exercice Vérifie ton prérequis
? Traduis en phrase la relation Cours(code_cours, intitulé, num_ens#).
= Une table Cours, de clé primaire code_cours, avec une colonne num_ens qui référence la clé primaire de la table Enseignant.
```

## Comment aborder ce chapitre

> [!astuce] **Classe chaque commande dans sa famille.** CREATE / ALTER / DROP = structure (LDD). INSERT / UPDATE / DELETE = contenu (LMD). Une question d'examen sur deux se résout en reconnaissant la famille.

> [!piege] Confondre `DROP TABLE` (supprime la table **et** sa structure), `TRUNCATE` (vide toutes les lignes, garde la structure) et `DELETE` (supprime des lignes choisies).

À la fin, tu sais créer une base et des tables MySQL avec leurs types et contraintes, et modifier leur structure avec ALTER TABLE.

## Idée 1 · SQL et ses familles de commandes

SQL (Structured Query Language) vient du modèle relationnel d'**Edgar F. Codd** (IBM, 1970). C'est un langage **normalisé**, utilisé par MySQL, PostgreSQL, Oracle, SQL Server, SQLite…

```grille Les cinq familles
#cols: Famille | Rôle | Commandes
*LDD (DDL) | structure | CREATE, ALTER, DROP, TRUNCATE, RENAME
*LMD (DML) | contenu | INSERT, UPDATE, DELETE, REPLACE
*LID (DQL) | interrogation | SELECT
*LCD (DCL) | droits | GRANT, REVOKE
*TCL | transactions | COMMIT, ROLLBACK
```

**MySQL** en pratique (TP avec MySQL Workbench) : serveur sur le **port 3306**, moteur de stockage par défaut **InnoDB** (transactions, clés étrangères), autres moteurs : MyISAM, MEMORY, CSV.

## Idée 2 · Créer une base et une table

```sql nontest
CREATE DATABASE IF NOT EXISTS Universite
  DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
USE Universite;
DROP DATABASE IF EXISTS Universite;   -- DATABASE et SCHEMA sont synonymes en MySQL
```

> [!attention] Ces commandes sont propres au serveur MySQL : SQLite (un fichier = une base) ne connaît ni `CREATE DATABASE` ni `USE`. Bloc non exécuté ici.

`IF NOT EXISTS` / `IF EXISTS` évitent une erreur si l'objet existe (ou pas).

## Idée 3 · Types de données MySQL

| Catégorie | Types | À retenir |
|---|---|---|
| Entiers | TINYINT, SMALLINT, INT, BIGINT | `INT AUTO_INCREMENT` pour les clés |
| Réels | FLOAT, DOUBLE (approchés), **DECIMAL(p, s)** (exact) | DECIMAL(4,2) : 4 chiffres dont 2 après la virgule → 99.99 max |
| Texte | **CHAR(n)** taille fixe complétée par des espaces, **VARCHAR(n)** taille variable, TEXT | |
| Dates | DATE `'YYYY-MM-DD'`, DATETIME, **TIMESTAMP** (1970 → 2038), TIME, YEAR | |
| Listes | **ENUM** (une valeur parmi une liste), **SET** (zéro ou plusieurs valeurs) | spécifiques à MySQL |

```sql nontest
CREATE TABLE Etudiant (
  id_etudiant INT AUTO_INCREMENT PRIMARY KEY,
  genre ENUM('Homme', 'Femme') DEFAULT 'Femme',
  langues SET('Français', 'Anglais', 'Espagnol'),
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  dernier_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;
```

> [!attention] SQLite n'a ni ENUM, ni SET, ni `ON UPDATE CURRENT_TIMESTAMP`, ni `ENGINE`. On simule ENUM par `CHECK (genre IN ('Homme','Femme'))`.

> [!prof] **SET** trie et dédoublonne : insérer `'A,C,C,B'` dans `SET('A','B','C')` donne `'A,B,C'`. `ON UPDATE CURRENT_TIMESTAMP` remet le champ à l'heure **à chaque modification** de la ligne (questions de l'examen 2025).

## Idée 4 · Les contraintes

```sql
PRAGMA foreign_keys = ON;
CREATE TABLE Formation (
  code_formation CHAR(5) PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  niveau VARCHAR(10) CHECK (niveau IN ('DEUG', 'Licence', 'Master'))
);
CREATE TABLE Etudiant (
  code_etud INTEGER PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  date_naissance DATE,
  code_formation CHAR(5),
  CONSTRAINT un_email UNIQUE (email),
  CONSTRAINT chk_naissance CHECK (date_naissance < '2010-01-01'),
  CONSTRAINT fk_formation FOREIGN KEY (code_formation) REFERENCES Formation(code_formation)
    ON DELETE SET NULL
);
INSERT INTO Formation VALUES ('MIA', 'Maths-Info', 'Licence');
INSERT INTO Etudiant (nom, email, date_naissance, code_formation) VALUES ('Sara', 'sara@usms.ma', '2004-05-02', 'MIA');
SELECT code_etud, nom, code_formation FROM Etudiant;
```

```sortie
code_etud | nom | code_formation
1 | Sara | MIA
```

| Contrainte | Garantit |
|---|---|
| PRIMARY KEY | unicité + non NULL |
| NOT NULL | valeur obligatoire |
| **UNIQUE** | pas de doublon dans la colonne |
| CHECK | condition sur la valeur |
| DEFAULT | valeur si rien n'est fourni |
| FOREIGN KEY | la valeur existe dans la table référencée (ON DELETE CASCADE / SET NULL / RESTRICT) |

Nommer une contrainte (`CONSTRAINT nom …`) permet de la supprimer plus tard.

> [!attention] SQLite n'applique les clés étrangères qu'après `PRAGMA foreign_keys = ON;`. En MySQL/InnoDB, elles sont actives par défaut. Le prof utilise `AUTO_INCREMENT` ; en SQLite, `INTEGER PRIMARY KEY` suffit.

## Idée 5 · Modifier la structure : ALTER TABLE

```sql
ALTER TABLE Etudiant ADD COLUMN ville VARCHAR(50);
ALTER TABLE Etudiant RENAME COLUMN ville TO ville_naissance;
ALTER TABLE Etudiant DROP COLUMN ville_naissance;
ALTER TABLE Etudiant RENAME TO Apprenant;
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
```

```sortie
name
Apprenant
Formation
```

Commandes propres à MySQL (non exécutables sous SQLite) :

```sql nontest
ALTER TABLE Etudiant ADD ville VARCHAR(50) AFTER prenom;         -- position de la colonne
ALTER TABLE Etudiant MODIFY nom VARCHAR(100) NOT NULL;           -- changer le type
ALTER TABLE Etudiant CHANGE nom nom_complet VARCHAR(100);        -- renommer + retyper
ALTER TABLE Livre ADD CONSTRAINT unq_titre UNIQUE (titre);
ALTER TABLE Livre DROP INDEX unq_titre;                          -- supprimer un UNIQUE
ALTER TABLE Etudiant DROP FOREIGN KEY fk_formation;
ALTER TABLE etudiant AUTO_INCREMENT = 100;
DESCRIBE Etudiant;
SHOW CREATE TABLE Etudiant;
TRUNCATE TABLE Etudiant;   -- vide la table
```

> [!retenir] En MySQL, une contrainte UNIQUE est un **index** : on la supprime avec `ALTER TABLE t DROP INDEX nom_contrainte;` (question de l'examen 2025).

## S'exercer

```exercice Exercices types (TD3, TP1, examen)
? (TD3 Q4) Crée la table Livre : id_livre clé primaire, titre obligatoire, annee_parution ≥ 1900, genre optionnel.
= CREATE TABLE Livre (id_livre INT PRIMARY KEY, titre VARCHAR(100) NOT NULL, annee_parution INT CHECK (annee_parution >= 1900), genre VARCHAR(30));

? (TD3 Q7 et Q10) Passe genre à 50 caractères et rends nationalite obligatoire dans Auteur (MySQL).
= ALTER TABLE Livre MODIFY genre VARCHAR(50); puis ALTER TABLE Auteur MODIFY nationalite VARCHAR(30) NOT NULL; (MODIFY redéfinit toute la colonne : type + contraintes).

? Différence entre CHAR(10) et VARCHAR(10) pour la valeur 'Ali' ?
= CHAR(10) stocke toujours 10 caractères (complété par des espaces) ; VARCHAR(10) ne stocke que les 3 caractères utiles (+ la longueur).
```

## Flashcards

```cartes
Port par défaut de MySQL :: 3306.
Moteur de stockage par défaut de MySQL :: InnoDB (transactions, clés étrangères).
CHAR vs VARCHAR :: CHAR taille fixe complétée par des espaces ; VARCHAR taille variable.
ENUM vs SET :: ENUM : une seule valeur de la liste ; SET : plusieurs valeurs (triées, sans doublon).
Format par défaut du type DATE :: YYYY-MM-DD.
ON UPDATE CURRENT_TIMESTAMP :: Le champ est remis à la date/heure courante à chaque modification de la ligne.
Ajouter une colonne :: ALTER TABLE t ADD [COLUMN] col type;
DROP vs TRUNCATE :: DROP supprime la table ; TRUNCATE la vide en gardant sa structure.
GRANT et REVOKE appartiennent à :: DCL / LCD (contrôle des données).
```

## QCM du chapitre

```qcm
? Quelle catégorie SQL contient GRANT et REVOKE ?
- DDL
- DML
- TCL
+ DCL
= Examen 2025.

? En MySQL, différence principale entre CHAR(n) et VARCHAR(n) ?
- CHAR pour les nombres, VARCHAR pour le texte
+ CHAR a une taille fixe complétée par des espaces, VARCHAR une taille variable
- CHAR accepte les caractères spéciaux, VARCHAR non
= Examen 2025.

? Quelle contrainte garantit qu'une colonne n'a pas de doublons ?
- NOT NULL
+ UNIQUE
- NULL
- CHECK
= Examen 2025.

? Comment ajouter une colonne à une table existante ?
+ ALTER TABLE nomTable ADD COLUMN nomColonne type;
- ALTER TABLE nomTable INSERT COLUMN nomColonne type;
- UPDATE TABLE nomTable ADD nomColonne type;
- MODIFY TABLE nomTable NEW COLUMN nomColonne type;
= Examen 2025.

? Comment supprimer une contrainte UNIQUE en MySQL ?
- ALTER TABLE t DROP CONSTRAINT nom;
- ALTER TABLE t DROP UNIQUE nom;
+ ALTER TABLE t DROP INDEX nom;
- ALTER TABLE t REMOVE UNIQUE nom;
= Examen 2025 : UNIQUE est implémenté par un index.

? Port par défaut de MySQL ?
- 3000
- 8080
- 5432
+ 3306
= 5432 est PostgreSQL, 8080 un port web.

? Moteur de stockage par défaut de MySQL (versions récentes) ?
- MyISAM
- MEMORY
+ InnoDB
- CSV
= Examen 2025.

? Format par défaut du type DATE en MySQL ?
- DD-MM-YYYY
- MM/DD/YYYY
+ YYYY-MM-DD
- DD/MM/YY
= Examen 2025.

? Que signifie ON UPDATE CURRENT_TIMESTAMP ?
- Le champ est initialisé à l'insertion seulement
+ Le champ est mis à jour à chaque modification de la ligne
- Le champ est supprimé lors des updates
- Le champ devient NULL à chaque update
= Examen 2025.

? CREATE TABLE Test (valeur SET('A','B','C')); INSERT INTO Test VALUES ('A,C,C,B'); SELECT valeur FROM Test; donne :
+ 'A,B,C'
- 'A,C,C,B'
- 'A,C,B'
- Erreur
= Examen 2025 : SET range les valeurs dans l'ordre de la définition et supprime les doublons.

? DECIMAL(4,2) peut stocker au maximum :
- 9999.99
+ 99.99
- 4.2
= 4 chiffres en tout, dont 2 après la virgule.
```

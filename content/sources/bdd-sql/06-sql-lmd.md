---
id: sql-lmd
titre: SQL · manipuler les données (INSERT, UPDATE, DELETE, REPLACE)
seance: Séance 8 · 14 avril 2026
importance: 4
---

## Avant de commencer

Il faut savoir créer une table avec ses contraintes (chapitre 5) : ce sont elles qui font accepter ou refuser une insertion.

```exercice Vérifie ton prérequis
? Une table a `cne CHAR(10) PRIMARY KEY`. Que se passe-t-il si on insère deux fois le même CNE ?
= Erreur de clé dupliquée : la clé primaire impose l'unicité.
```

## Comment aborder ce chapitre

> [!astuce] **Avant chaque UPDATE ou DELETE, écris d'abord le SELECT avec le même WHERE.** Tu vois exactement quelles lignes seront touchées.

> [!piege] Oublier le `WHERE` : `UPDATE Etudiant SET ville = 'Rabat';` modifie **toutes** les lignes, `DELETE FROM Etudiant;` les supprime **toutes**.

À la fin, tu sais insérer (une ou plusieurs lignes, depuis un SELECT), gérer les doublons (IGNORE, ON DUPLICATE KEY, REPLACE), modifier et supprimer en respectant les clés étrangères.

## Idée 1 · INSERT sous toutes ses formes

```sql
CREATE TABLE Filiere (id INTEGER PRIMARY KEY, nom VARCHAR(50) UNIQUE NOT NULL);
CREATE TABLE Etudiant (
  cne CHAR(10) PRIMARY KEY, nom VARCHAR(50) NOT NULL, prenom VARCHAR(50),
  age INT DEFAULT 18, ville VARCHAR(50), idFiliere INT REFERENCES Filiere(id));
INSERT INTO Filiere (nom) VALUES ('Informatique'), ('Mathématiques');
INSERT INTO Etudiant VALUES ('CNE1234567', 'Sara', 'Souad', 21, 'Agadir', 1);
INSERT INTO Etudiant (cne, nom, prenom, ville, idFiliere) VALUES ('CNE2233445', 'Omar', 'Hassan', 'Rabat', 1);
INSERT INTO Etudiant (cne, nom, prenom, age, idFiliere) VALUES ('CNE3344556', 'Youssef', 'Youness', 20, 2),
                                                              ('CNE4455667', 'Fahd', 'Mouna', 22, 2);
SELECT * FROM Etudiant;
```

```sortie
cne | nom | prenom | age | ville | idFiliere
CNE1234567 | Sara | Souad | 21 | Agadir | 1
CNE2233445 | Omar | Hassan | 18 | Rabat | 1
CNE3344556 | Youssef | Youness | 20 | NULL | 2
CNE4455667 | Fahd | Mouna | 22 | NULL | 2
```

- Sans liste de colonnes : il faut **toutes** les valeurs, dans l'ordre de la table.
- Colonne omise : elle prend sa valeur **DEFAULT** (Omar → 18) ou **NULL** (ville de Youssef).
- Plusieurs lignes en une instruction : `VALUES (...), (...)`.

> [!attention] Le prof écrit aussi `VALUES ('CNE2233445', 'Omar', 'Hassan', DEFAULT, 'Rabat')` : le mot-clé **DEFAULT dans VALUES** marche en MySQL, pas en SQLite (on omet la colonne à la place).

## Idée 2 · Les doublons : IGNORE, ON DUPLICATE KEY UPDATE, REPLACE

```flux Clé déjà présente ?
INSERT -> erreur
INSERT IGNORE -> ligne ignorée, pas d'erreur
ON DUPLICATE KEY UPDATE -> la ligne existante est modifiée
REPLACE -> l'ancienne ligne est supprimée puis la nouvelle insérée
```

```sql nontest
INSERT IGNORE INTO Etudiant (cne, nom) VALUES ('CNE1234567', 'Doublon');      -- MySQL
INSERT INTO Produit (ref, stock) VALUES ('P001', 10)
  ON DUPLICATE KEY UPDATE stock = stock + 10;                                  -- MySQL
```

Équivalents SQLite, exécutés :

```sql
INSERT OR IGNORE INTO Etudiant (cne, nom) VALUES ('CNE1234567', 'Doublon');
CREATE TABLE Produit (ref TEXT PRIMARY KEY, stock INT);
INSERT INTO Produit VALUES ('P001', 10);
INSERT INTO Produit VALUES ('P001', 10) ON CONFLICT(ref) DO UPDATE SET stock = stock + 10;
REPLACE INTO Etudiant VALUES ('CNE2233445', 'Omar', 'Hassan', 23, 'Fès', 1);
SELECT nom, age, ville FROM Etudiant WHERE cne IN ('CNE1234567', 'CNE2233445');
SELECT * FROM Produit;
```

```sortie
nom | age | ville
Sara | 21 | Agadir
Omar | 23 | Fès
ref | stock
P001 | 20
```

> [!attention] MySQL écrit `INSERT IGNORE` et `ON DUPLICATE KEY UPDATE` ; SQLite écrit `INSERT OR IGNORE` et `ON CONFLICT(col) DO UPDATE`. `REPLACE INTO` existe dans les deux, avec le même sens (supprimer puis insérer).

> [!prof] `REPLACE` met à jour l'étudiant s'il existe (en réalité : suppression + insertion) ou l'insère sinon. Les colonnes non fournies reprennent leur DEFAULT, pas l'ancienne valeur ! `INSERT DELAYED` n'est plus supporté par InnoDB (MySQL ≥ 8).

## Idée 3 · INSERT … SELECT

On copie des lignes d'une table vers une autre, avec un filtre :

```sql
CREATE TABLE Etudiant_Agadir (cne CHAR(10), nom VARCHAR(50));
INSERT INTO Etudiant_Agadir (cne, nom)
  SELECT cne, nom FROM Etudiant WHERE ville IS NOT NULL AND ville = 'Agadir';
SELECT * FROM Etudiant_Agadir;
```

```sortie
cne | nom
CNE1234567 | Sara
```

Pas de mot-clé `VALUES` dans ce cas ; le nombre et les types des colonnes doivent correspondre.

## Idée 4 · UPDATE et DELETE

```sql
UPDATE Etudiant SET age = age + 1, ville = 'Béni Mellal' WHERE cne = 'CNE3344556';
DELETE FROM Etudiant WHERE age > 22;
SELECT cne, nom, age, ville FROM Etudiant;
```

```sortie
cne | nom | age | ville
CNE1234567 | Sara | 21 | Agadir
CNE3344556 | Youssef | 21 | Béni Mellal
CNE4455667 | Fahd | 22 | NULL
```

```etapes Une modification sûre
Écrire le SELECT :: SELECT * FROM Etudiant WHERE cne = 'CNE3344556'; → 1 ligne visée.
Remplacer SELECT * FROM par UPDATE … SET :: Garder exactement le même WHERE.
Vérifier :: Relancer le SELECT pour contrôler la nouvelle valeur.
```

| Commande | Supprime | WHERE | Remet AUTO_INCREMENT à 1 |
|---|---|---|---|
| `DELETE FROM t WHERE …` | les lignes choisies | oui | non |
| `TRUNCATE TABLE t` | toutes les lignes | non | **oui** |
| `DROP TABLE t` | la table entière | non | (table disparue) |

> [!retenir] Avec une clé étrangère, on ne peut pas supprimer une ligne **parente** encore référencée (ex. une filière qui a des étudiants), sauf si la clé a été déclarée `ON DELETE CASCADE` ou `SET NULL`. C'est la question 17 du TD3 : « supprimez le livre si c'est possible ».

## S'exercer

```exercice Exercices types (TD3, TP2)
? (TD3 Q14) Corrige l'année de parution de « Introduction à Python » à 1995.
= UPDATE Livre SET annee_parution = 1995 WHERE titre = 'Introduction à Python';

? (TD3 Q16) Supprime l'association entre l'auteur Youssef Saad (id 2) et son livre.
= DELETE FROM Rediger WHERE id_auteur = 2; (on supprime la ligne de la table associative, pas l'auteur).

? (TD3 Q17) Peut-on supprimer le livre 101 alors qu'il est référencé dans Rediger ?
= Oui seulement si la clé étrangère de Rediger vers Livre est en ON DELETE CASCADE (c'est le cas dans la correction du TD3) : les lignes de Rediger sont supprimées avec lui. Sinon, MySQL refuse (erreur de contrainte de clé étrangère).
```

## Flashcards

```cartes
INSERT IGNORE (MySQL) :: Ignore la ligne en cas de doublon de clé, sans erreur.
ON DUPLICATE KEY UPDATE :: Si la clé existe déjà, modifie la ligne existante au lieu d'insérer.
REPLACE INTO :: Supprime la ligne de même clé puis insère la nouvelle (ou insère simplement).
Colonne omise dans un INSERT :: Elle prend sa valeur DEFAULT, sinon NULL.
UPDATE sans WHERE :: Modifie toutes les lignes de la table.
TRUNCATE vs DELETE :: TRUNCATE vide tout et réinitialise AUTO_INCREMENT ; DELETE peut filtrer avec WHERE.
INSERT … SELECT :: Insère le résultat d'une requête, sans VALUES.
```

## QCM du chapitre

```qcm
? Que fait REPLACE INTO Etudiant VALUES (5, 'Karim', NULL, DEFAULT, 15.5); ?
- Insère toujours un nouvel étudiant
- Supprime l'étudiant 5
- Génère une erreur à cause de NULL
+ Met à jour (supprime puis réinsère) l'étudiant 5 s'il existe, sinon l'insère
= Examen 2025.

? Une colonne omise dans un INSERT avec liste de colonnes prend :
+ sa valeur DEFAULT, ou NULL s'il n'y en a pas
- toujours 0
- la valeur de la ligne précédente
= Si elle est NOT NULL sans DEFAULT, MySQL strict refuse l'insertion.

? `UPDATE Etudiant SET ville = 'Rabat';` :
- ne modifie rien sans WHERE
+ modifie toutes les lignes
- provoque une erreur
= Le WHERE est facultatif : c'est le piège classique.

? Quelle commande vide une table et remet l'auto-incrément à zéro ?
- DELETE FROM t;
+ TRUNCATE TABLE t;
- DROP TABLE t;
= DROP supprime aussi la structure.

? Équivalent SQLite de INSERT IGNORE :
+ INSERT OR IGNORE
- INSERT SKIP
- IGNORE INSERT
= Même effet, autre syntaxe.

? INSERT INTO Produit VALUES ('P001', 10) ON DUPLICATE KEY UPDATE stock = stock + 10; alors que P001 a un stock de 10 :
- stock = 10
+ stock = 20
- erreur de doublon
= La ligne existante est mise à jour.

? Pour INSERT … SELECT :
- on écrit VALUES (SELECT …)
+ on écrit le SELECT directement après la liste de colonnes
- le SELECT doit renvoyer une seule ligne
= Le SELECT peut renvoyer plusieurs lignes.

? Supprimer une filière référencée par des étudiants (clé étrangère sans option) :
+ est refusé
- supprime aussi les étudiants
- met les étudiants à NULL
= Le comportement par défaut est RESTRICT / NO ACTION.

? INSERT DELAYED en MySQL 8 avec InnoDB :
- est le mode par défaut
+ n'est plus supporté
- accélère toujours les insertions
= Remarque de la séance 8.

? Plusieurs lignes en un seul INSERT s'écrivent :
+ VALUES (…), (…), (…)
- VALUES (…); VALUES (…)
- INSERT MULTI
= Syntaxe standard.
```

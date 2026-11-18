---
id: index-vues-utilisateurs
titre: Index, vues et gestion des utilisateurs MySQL
seance: Séance 11 · 12 mai 2026
importance: 4
---

## Avant de commencer

Il faut savoir écrire un SELECT avec WHERE et sous-requête (chapitres 7 et 8) : une vue n'est qu'un SELECT enregistré.

```exercice Vérifie ton prérequis
? Écris la requête qui liste les produits plus chers que le prix moyen (table Products(ProductName, Price)).
= SELECT ProductName, Price FROM Products WHERE Price > (SELECT AVG(Price) FROM Products);
```

## Comment aborder ce chapitre

> [!astuce] **Trois outils, trois buts.** Index → aller **plus vite**. Vue → **simplifier** ou **masquer**. Utilisateurs et privilèges → **sécuriser**.

> [!piege] Croire qu'une vue stocke une copie des données. Une vue (simple) est une **requête enregistrée** : à chaque lecture, elle relit les tables. Si la table change, la vue change.

À la fin, tu sais créer et supprimer un index, créer / remplacer / supprimer une vue, créer un utilisateur MySQL et lui donner ou retirer des droits.

## Idée 1 · L'index, une table des matières

Sans index, `SELECT * FROM etudiant WHERE nom = 'Salma'` parcourt **toutes** les lignes (full table scan). Un index est une structure auxiliaire **triée**, par défaut un **arbre B-Tree** (balancé) avec InnoDB.

```html
<svg viewBox="0 0 560 170" style="width:100%;max-width:560px;display:block;margin:10px auto" role="img" aria-label="Arbre B-Tree : la racine M oriente vers les feuilles A à L ou M à Z, en trois lectures au lieu de toute la table">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<rect x="230" y="10" width="100" height="32" fill="none" stroke="#D9824F" stroke-width="2"/><text x="280" y="31" fill="#D9824F" font-weight="700">M</text>
<rect x="80" y="75" width="140" height="32" fill="none" stroke="currentColor"/><text x="150" y="96">E · I</text>
<rect x="340" y="75" width="140" height="32" fill="none" stroke="currentColor"/><text x="410" y="96">R · S</text>
<line x1="260" y1="42" x2="150" y2="75" stroke="currentColor"/><line x1="300" y1="42" x2="410" y2="75" stroke="currentColor"/>
<rect x="20" y="135" width="120" height="28" fill="none" stroke="currentColor"/><text x="80" y="154">Ali … Hind</text>
<rect x="160" y="135" width="120" height="28" fill="none" stroke="currentColor"/><text x="220" y="154">Imane … Lina</text>
<rect x="300" y="135" width="120" height="28" fill="none" stroke="currentColor"/><text x="360" y="154">Mehdi … Rami</text>
<rect x="440" y="135" width="110" height="28" fill="#D9824F" fill-opacity=".3" stroke="#D9824F" stroke-width="2"/><text x="495" y="154">Salma …</text>
<line x1="120" y1="107" x2="80" y2="135" stroke="currentColor"/><line x1="180" y1="107" x2="220" y2="135" stroke="currentColor"/>
<line x1="380" y1="107" x2="360" y2="135" stroke="currentColor"/><line x1="440" y1="107" x2="495" y2="135" stroke="#D9824F" stroke-width="2"/>
</g></svg>
```

Pour trouver « Salma » : racine → nœud → feuille, **3 lectures** au lieu de toute la table.

```sql
CREATE TABLE Produit (id INTEGER PRIMARY KEY, nom VARCHAR(50), categorie VARCHAR(30), prix DECIMAL(8,2));
INSERT INTO Produit (nom, categorie, prix) VALUES ('Clavier','Informatique',150), ('Souris','Informatique',80),
 ('Chaise','Mobilier',600), ('Bureau','Mobilier',1200), ('Écran','Informatique',1500);
CREATE INDEX idx_categorie ON Produit (categorie);
CREATE UNIQUE INDEX idx_nom ON Produit (nom);
CREATE INDEX idx_cat_prix ON Produit (categorie, prix);
SELECT name FROM sqlite_master WHERE type = 'index' ORDER BY name;
```

```sortie
name
idx_cat_prix
idx_categorie
idx_nom
```

```sql nontest
-- MySQL
CREATE TABLE Etudiant (id INT PRIMARY KEY, Nom VARCHAR(50), INDEX idx_nom (Nom));   -- index à la création
CREATE FULLTEXT INDEX idx_desc ON Livre (Description);                             -- recherche de texte
SHOW INDEX FROM Etudiant;
EXPLAIN SELECT * FROM Produit WHERE categorie = 'Informatique';   -- type ALL (scan) avant l'index, ref après
DROP INDEX idx_nom ON Etudiant;
```

> [!attention] SQLite n'a ni FULLTEXT dans `CREATE INDEX`, ni `SHOW INDEX` ; son `EXPLAIN QUERY PLAN` remplace `EXPLAIN`. Syntaxe de suppression : `DROP INDEX idx_nom;` (sans `ON table`).

> [!retenir] Un index accélère les lectures (WHERE, JOIN, ORDER BY) mais **ralentit les écritures** (INSERT, UPDATE, DELETE doivent mettre l'index à jour) et prend de la place. On indexe les colonnes souvent filtrées, pas toutes. Clé primaire et UNIQUE créent un index automatiquement.

## Idée 2 · Les vues

```sql
CREATE VIEW Produits_Chers AS
  SELECT nom, prix FROM Produit WHERE prix > (SELECT AVG(prix) FROM Produit);
SELECT * FROM Produits_Chers;
INSERT INTO Produit (nom, categorie, prix) VALUES ('Imprimante','Informatique',2500);
SELECT * FROM Produits_Chers;
```

```sortie
nom | prix
Bureau | 1200
Écran | 1500
nom | prix
Bureau | 1200
Écran | 1500
Imprimante | 2500
```

La moyenne passe de 706 à 1005 DH : Bureau et Écran restent au-dessus, et l'Imprimante apparaît. La vue a **suivi** la table sans être recréée.

```sql nontest
CREATE OR REPLACE VIEW Morocco_Customers_vw AS
  SELECT CustomerName, ContactName, Country FROM `International Customers` WHERE Country = 'Morocco';
DROP VIEW IF EXISTS Morocco_Customers_vw;
```

> [!attention] `CREATE OR REPLACE VIEW` est du MySQL ; SQLite impose `DROP VIEW` puis `CREATE VIEW`. Les noms entre accents graves (`` `International Customers` ``) sont propres à MySQL.

Intérêts d'une vue : **simplifier** une requête complexe, **masquer** des colonnes sensibles (on donne le droit sur la vue, pas sur la table), présenter les données autrement.

## Idée 3 · Utilisateurs et privilèges (MySQL)

Un compte MySQL = **'nom'@'hôte'**. `'youness'@'localhost'` ne peut se connecter **que depuis la machine du serveur** ; `'youness'@'%'` depuis n'importe où.

```sql nontest
CREATE USER 'enseignant'@'localhost' IDENTIFIED BY 'pass123';
GRANT SELECT ON tp_gestion_universite.Etudiant TO 'enseignant'@'localhost';
GRANT INSERT ON tp_gestion_universite.Inscription TO 'enseignant'@'localhost';
GRANT UPDATE (note) ON tp_gestion_universite.Inscription TO 'enseignant'@'localhost';
GRANT ALL PRIVILEGES ON db_priv.* TO 'youness'@'localhost';
SHOW GRANTS FOR 'enseignant'@'localhost';
REVOKE INSERT ON tp_gestion_universite.Inscription FROM 'enseignant'@'localhost';
ALTER USER 'enseignant'@'localhost' IDENTIFIED BY 'NouveauMdp!2026';
DROP USER 'enseignant'@'localhost';
```

> [!attention] SQLite n'a **aucune** gestion d'utilisateurs (la sécurité passe par les droits du fichier). Tout ce bloc est du MySQL, non exécuté ici.

```etapes Lire un GRANT
Quoi :: le privilège (SELECT, INSERT, UPDATE(note), ALL PRIVILEGES…).
Sur quoi :: base.table, base.* (toute la base) ou *.* (tout le serveur).
À qui :: 'utilisateur'@'hôte'.
Vérifier :: SHOW GRANTS FOR 'utilisateur'@'hôte';
```

`UPDATE(note)` ne permet de modifier **que** la colonne note ; `UPDATE` tout court, toutes les colonnes (question du TP4).

> [!prof] Bonne pratique de sécurité : principe du **moindre privilège**, ne jamais travailler en root dans une application, des mots de passe forts.

## S'exercer

```exercice Exercices types (TP4, examen)
? (Examen 2025) Comment attribuer tous les privilèges à 'youness' sur la base db_priv ?
= GRANT ALL PRIVILEGES ON db_priv.* TO 'youness'@'localhost';

? (TP4) L'utilisateur 'enseignant'@'localhost' peut-il se connecter depuis un autre PC ?
= Non : l'hôte localhost limite la connexion à la machine du serveur. Il faudrait un compte 'enseignant'@'%' (ou une IP précise).

? Crée une vue Etudiants_Admis(nom, moyenne) pour les étudiants ayant au moins 10, puis remplace-la pour ajouter la ville (MySQL).
= CREATE VIEW Etudiants_Admis AS SELECT nom, moyenne FROM etudiant WHERE moyenne >= 10; puis CREATE OR REPLACE VIEW Etudiants_Admis AS SELECT nom, moyenne, ville FROM etudiant WHERE moyenne >= 10;
```

## Flashcards

```cartes
Structure par défaut d'un index InnoDB :: Arbre B-Tree (Balanced Tree).
Full table scan :: Lecture de toutes les lignes d'une table, faute d'index utilisable.
Inconvénient d'un index :: Ralentit les écritures et occupe de l'espace.
Vue :: Requête SELECT enregistrée, relue à chaque utilisation (table virtuelle).
Modifier une vue sans la supprimer (MySQL) :: CREATE OR REPLACE VIEW nom AS SELECT …
Voir les privilèges d'un utilisateur :: SHOW GRANTS FOR 'utilisateur'@'hôte';
Retirer un droit :: REVOKE privilège ON base.table FROM 'utilisateur'@'hôte';
'u'@'localhost' :: Compte utilisable seulement depuis la machine du serveur.
```

## QCM du chapitre

```qcm
? Structure de données par défaut des index MySQL (InnoDB) ?
- Hash Table
- Arbre binaire
- Liste chaînée
+ B-Tree (Balanced Tree)
= Examen 2025.

? Quelle commande modifie une vue existante sans la supprimer ?
- ALTER VIEW nom_vue AS SELECT …
- UPDATE VIEW nom_vue AS SELECT …
+ CREATE OR REPLACE VIEW nom_vue AS SELECT …
- MODIFY VIEW nom_vue AS SELECT …
= Réponse attendue à l'examen 2025. (ALTER VIEW existe aussi en MySQL, mais le cours utilise CREATE OR REPLACE.)

? Quelle commande permet de voir tous les privilèges d'un utilisateur ?
- DESCRIBE GRANTS FOR 'u'@'hôte';
- LIST GRANTS FOR 'u'@'hôte';
+ SHOW GRANTS FOR 'u'@'hôte';
- DISPLAY GRANTS FOR 'u'@'hôte';
= Examen 2025.

? Comment attribuer tous les privilèges à 'youness' sur db_priv ?
+ GRANT ALL PRIVILEGES ON db_priv.* TO 'youness'@'localhost';
- GRANT ALL TO 'youness' ON db_priv;
- GRANT ALL ON db_priv FOR 'youness';
- SET PRIVILEGES * ON db_priv TO 'youness';
= Examen 2025.

? Un index accélère surtout :
+ les recherches (WHERE, JOIN, ORDER BY)
- les insertions
- les suppressions
= Les écritures sont au contraire ralenties.

? Une vue simple :
- stocke une copie figée des données
+ relit les tables à chaque utilisation
- ne peut pas contenir de sous-requête
= C'est une table virtuelle.

? GRANT UPDATE (note) ON Inscription :
+ autorise la modification de la seule colonne note
- autorise la modification de toutes les colonnes
- autorise la lecture de note
= Privilège au niveau colonne (TP4).

? Quelle contrainte crée automatiquement un index ?
- CHECK
- DEFAULT
+ UNIQUE
- NOT NULL
= PRIMARY KEY et UNIQUE s'appuient sur un index.

? Pour supprimer un index en MySQL :
+ DROP INDEX idx_nom ON Etudiant;
- DELETE INDEX idx_nom;
- ALTER INDEX idx_nom DROP;
= En SQLite, on omet ON table.

? `EXPLAIN SELECT …` en MySQL sert à :
- exécuter la requête deux fois
+ afficher le plan d'exécution (scan complet ou utilisation d'un index)
- expliquer une erreur de syntaxe
= On compare le plan avant et après la création d'un index.
```

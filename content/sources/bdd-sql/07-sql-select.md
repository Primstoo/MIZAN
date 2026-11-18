---
id: sql-select
titre: SQL · interroger une table (SELECT, WHERE, GROUP BY, HAVING)
seance: Séance 9 · 20 avril 2026
importance: 5
---

## Avant de commencer

Il faut connaître σ, π et γ (chapitres 3 et 4) : SELECT n'en est que la version SQL.

```exercice Vérifie ton prérequis
? Traduis π nom (σ ville='Rabat' (ETUDIANT)) en SQL.
= SELECT DISTINCT nom FROM Etudiant WHERE ville = 'Rabat'; (WHERE = σ, liste de colonnes = π, DISTINCT pour l'élimination des doublons).
```

## Comment aborder ce chapitre

> [!astuce] **Lis une requête dans l'ordre où le SGBD l'exécute** : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Ça explique presque toutes les erreurs.

> [!piege] Mettre une fonction d'agrégation dans le WHERE (`WHERE AVG(moyenne) > 12`). Le WHERE filtre les **lignes avant** le regroupement ; pour filtrer des **groupes**, c'est **HAVING**.

À la fin, tu sais filtrer, trier, limiter, regrouper et filtrer des groupes en SQL.

## Idée 1 · La base de travail (TP2)

```sql
CREATE TABLE filiere (id_filiere INTEGER PRIMARY KEY, nom_filiere VARCHAR(100) UNIQUE NOT NULL, departement VARCHAR(100) NOT NULL);
CREATE TABLE etudiant (id_etudiant INTEGER PRIMARY KEY, nom VARCHAR(50) NOT NULL, prenom VARCHAR(50) NOT NULL,
  niveau VARCHAR(10) NOT NULL, moyenne DECIMAL(4,2), ville VARCHAR(50), id_filiere INT REFERENCES filiere(id_filiere));
INSERT INTO filiere (nom_filiere, departement) VALUES ('Informatique','Sciences'), ('Mathématiques','Sciences'),
 ('Physique','Sciences'), ('Génie Civil','Technologie'), ('Électronique','Technologie'),
 ('Biologie','Sciences de la Vie'), ('Chimie','Sciences de la Vie');
INSERT INTO etudiant (nom, prenom, niveau, moyenne, ville, id_filiere) VALUES
 ('Sara','Sara','L1',15.50,'Casablanca',1), ('Youssef','Youssef','L2',13.20,'Rabat',2),
 ('Kamal','Hind','L3',12.80,'Béni Mellal',1), ('Sami','Omar','M1',17.00,'Marrakech',3),
 ('Said','Amal','M2',11.50,'Agadir',4), ('Rami','Hamza','L1',14.00,'Tanger',5),
 ('Souad','Mouna','L2',16.20,'Meknès',1), ('Hanane','Imane','M1',NULL,'Tétouan',6),
 ('Saad','Anas','M2',18.30,NULL,7), ('Salma','Rania','L3',12.50,'Khouribga',2);
SELECT COUNT(*) AS nb_etudiants FROM etudiant;
```

```sortie
nb_etudiants
10
```

> [!attention] Dans le script d'insertion du TP2, deux apostrophes sont fautives : `('Youssef, 'Youssef', …)` (guillemet fermant manquant) et des apostrophes typographiques ‘…’ autour de 'Sara' et 'Béni Mellal'. MySQL refuse ces lignes : on les a corrigées ici.

## Idée 2 · Colonnes, alias, DISTINCT

```sql
SELECT DISTINCT niveau FROM etudiant ORDER BY niveau;
SELECT nom AS lastName, moyenne * 1.1 AS moyenne_bonus FROM etudiant WHERE id_etudiant <= 2;
```

```sortie
niveau
L1
L2
L3
M1
M2
lastName | moyenne_bonus
Sara | 17.05
Youssef | 14.52
```

`AS` est facultatif (`SELECT nom lastName`). Alias de table : `FROM etudiant AS e` puis `e.nom`.

## Idée 3 · WHERE : les opérateurs

| Opérateur | Exemple |
|---|---|
| =, <>, <, >, <=, >= | `age <> 20` |
| AND, OR, NOT | `ville = 'Tanger' AND (moyenne > 13 OR moyenne IS NULL)` |
| BETWEEN a AND b (**bornes incluses**) | `moyenne BETWEEN 12 AND 15` |
| IN (liste) | `ville IN ('Agadir', 'Rabat')` |
| LIKE motif | `%` = n'importe quelle suite, `_` = **un** caractère |
| IS NULL / IS NOT NULL | jamais `= NULL` |

```sql
SELECT nom, moyenne FROM etudiant WHERE moyenne BETWEEN 12 AND 15 ORDER BY moyenne;
SELECT nom FROM etudiant WHERE nom LIKE 'S_a%';
SELECT nom FROM etudiant WHERE moyenne IS NULL OR ville IS NULL;
```

```sortie
nom | moyenne
Salma | 12.5
Kamal | 12.8
Youssef | 13.2
Rami | 14
nom
Saad
nom
Hanane
Saad
```

`'S_a%'` : un S, **exactement un** caractère quelconque, un a, puis n'importe quoi. Saad (S-a-**a**-d) passe ; Said (S-a-**i**) et Sara (S-a-**r**) non. LIKE n'est sensible à la casse ni en MySQL (collation par défaut) ni en SQLite pour les lettres ASCII.

> [!piege] `WHERE moyenne = NULL` ne renvoie **jamais** rien : toute comparaison avec NULL donne « inconnu ». Utilise `IS NULL`.

## Idée 4 · ORDER BY et LIMIT

```sql
SELECT nom, moyenne FROM etudiant WHERE moyenne IS NOT NULL ORDER BY moyenne DESC LIMIT 3;
SELECT nom FROM etudiant ORDER BY id_etudiant LIMIT 2, 3;
```

```sortie
nom | moyenne
Saad | 18.3
Sami | 17
Souad | 16.2
nom
Kamal
Sami
Said
```

- `ORDER BY col1 ASC, col2 DESC` : tri sur plusieurs critères (ASC par défaut).
- `LIMIT n` : les n premières lignes ; `LIMIT début, n` : saute `début` lignes puis en prend n (ici les 3e, 4e, 5e).

## Idée 5 · Agrégats, GROUP BY, HAVING

```sql
SELECT niveau, COUNT(*) AS nb, COUNT(moyenne) AS nb_notes, ROUND(AVG(moyenne), 2) AS moy
FROM etudiant GROUP BY niveau ORDER BY niveau;
```

```sortie
niveau | nb | nb_notes | moy
L1 | 2 | 2 | 14.75
L2 | 2 | 2 | 14.7
L3 | 2 | 2 | 12.65
M1 | 2 | 1 | 17.0
M2 | 2 | 2 | 14.9
```

`COUNT(*)` compte les lignes, `COUNT(moyenne)` ignore les NULL (M1 : 2 étudiants, 1 note). AVG, SUM, MIN, MAX ignorent aussi les NULL.

```sql
SELECT f.nom_filiere, COUNT(*) AS nb
FROM etudiant e JOIN filiere f ON e.id_filiere = f.id_filiere
GROUP BY f.nom_filiere
HAVING COUNT(*) >= 2
ORDER BY nb DESC;
```

```sortie
nom_filiere | nb
Informatique | 3
Mathématiques | 2
```

```etapes Ordre d'exécution d'un SELECT complet
FROM / JOIN :: On construit la table de départ.
WHERE :: On filtre les lignes (pas d'agrégat ici).
GROUP BY :: On forme les groupes.
HAVING :: On filtre les groupes (agrégats permis).
SELECT :: On calcule les colonnes et les alias.
ORDER BY puis LIMIT :: On trie, puis on coupe.
```

> [!retenir] Toute colonne du SELECT qui n'est pas dans une fonction d'agrégation doit figurer dans le GROUP BY (MySQL l'impose avec le mode ONLY_FULL_GROUP_BY, actif par défaut depuis 5.7).

## S'exercer

```exercice Exercices types (TP2, examen)
? Que fait `SELECT * FROM utilisateur WHERE email LIKE '_.%@gmail.com';` ?
= Elle sélectionne les emails qui commencent par un caractère, puis un point, puis n'importe quoi, et finissent par @gmail.com (ex. a.benali@gmail.com). Question de l'examen 2025.

? (TP2) Moyenne générale des étudiants par filière, seulement pour les filières dont la moyenne dépasse 14.
= SELECT id_filiere, AVG(moyenne) AS moy FROM etudiant GROUP BY id_filiere HAVING AVG(moyenne) > 14;

? (TP2) Les 3 meilleurs étudiants.
= SELECT nom, prenom, moyenne FROM etudiant ORDER BY moyenne DESC LIMIT 3; → Saad (18.3), Sami (17), Souad (16.2).
```

## Flashcards

```cartes
WHERE vs HAVING :: WHERE filtre les lignes avant le regroupement ; HAVING filtre les groupes après.
LIKE '%' et '_' :: % = n'importe quelle suite (même vide) ; _ = exactement un caractère.
BETWEEN 12 AND 15 :: Bornes incluses : 12 ≤ x ≤ 15.
Tester une valeur manquante :: IS NULL (jamais = NULL).
COUNT(*) vs COUNT(col) :: COUNT(*) compte les lignes ; COUNT(col) ignore les NULL.
LIMIT 2, 3 (MySQL) :: Saute 2 lignes, puis en renvoie 3.
Ordre d'exécution :: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.
DISTINCT :: Supprime les lignes en double du résultat (équivalent de la projection π).
```

## QCM du chapitre

```qcm
? Que sélectionne `WHERE email LIKE '_.%@gmail.com'` ?
- Tous les emails Gmail
- Les emails avec un seul caractère avant le @
+ Les emails avec un caractère, un point, puis n'importe quoi avant @gmail.com
- Les emails finissant par .gmail.com
= Examen 2025.

? Pour garder les filières ayant plus de 2 étudiants :
- WHERE COUNT(*) > 2
+ HAVING COUNT(*) > 2
- ORDER BY COUNT(*) > 2
= Filtre sur un groupe → HAVING.

? `moyenne BETWEEN 12 AND 15` inclut-il 12 et 15 ?
+ Oui, les deux bornes
- Non, aucune
- Seulement 12
= BETWEEN est inclusif.

? Quelle requête trouve les étudiants sans moyenne ?
- WHERE moyenne = NULL
+ WHERE moyenne IS NULL
- WHERE moyenne = 0
= = NULL n'est jamais vrai.

? Sur 10 étudiants dont un sans moyenne, COUNT(moyenne) vaut :
- 10
+ 9
- NULL
= COUNT(col) ignore les NULL.

? `ORDER BY note DESC LIMIT 3` renvoie :
+ les 3 meilleures notes
- les 3 plus faibles
- les lignes 3 et suivantes
= DESC = décroissant.

? Quelle clause s'exécute en premier ?
+ FROM
- SELECT
- WHERE
- ORDER BY
= On ne peut filtrer que ce qui a été lu.

? `SELECT nom lastName FROM etudiant;` :
- provoque une erreur
+ affiche la colonne nom sous l'alias lastName
- sélectionne deux colonnes
= AS est facultatif.

? Le mot-clé qui supprime les doublons d'un résultat :
- UNIQUE
+ DISTINCT
- ONLY
= UNIQUE est une contrainte de table.

? `WHERE ville IN ('Agadir', 'Rabat')` équivaut à :
+ ville = 'Agadir' OR ville = 'Rabat'
- ville = 'Agadir' AND ville = 'Rabat'
- ville BETWEEN 'Agadir' AND 'Rabat'
= IN est un raccourci pour une suite de OR.
```

---
id: td-tp-corriges
titre: TD et TP corrigés (TD2, TD3, TD4, TP1 à TP4)
seance: TD 1 à 4 · TP 1 à 4
importance: 4
---

## Avant de commencer

Ce chapitre suppose les chapitres 3 à 8. Les TD2 (algèbre) et TD4 (SQL) posent **les mêmes 11 questions** sur la même base : compare les deux écritures, c'est le meilleur entraînement pour l'examen.

```exercice Vérifie ton prérequis
? Quel opérateur de l'algèbre correspond à « tous les livres de Gallimard » ?
= La division ÷.
```

## Comment aborder ce chapitre

> [!astuce] Fais chaque question **toi-même** avant de lire la correction, puis exécute la requête (MySQL Workbench, ou n'importe quel SQLite en ligne) et compare avec la sortie affichée ici.

> [!piege] Dans les questions « par auteur » (Q8 à Q10), utiliser `JOIN` au lieu de `LEFT JOIN` fait disparaître les auteurs sans livre (Lopez a 1 livre, mais Youssfi en a 0).

À la fin, tu sais résoudre les 11 questions types en algèbre et en SQL, et écrire le script LDD/LMD complet du TD3.

## TD2 et TD4 · la base bibliographique

```sql
CREATE TABLE AUTEUR (IdAuteur VARCHAR(5) PRIMARY KEY, Nom VARCHAR(30), Prenom VARCHAR(30), Nationalite VARCHAR(30));
CREATE TABLE LIVRE (ISBN VARCHAR(5) PRIMARY KEY, Titre VARCHAR(50), AnneeParution INT, Editeur VARCHAR(30));
CREATE TABLE REDIGE (IdAuteur VARCHAR(5) REFERENCES AUTEUR(IdAuteur), ISBN VARCHAR(5) REFERENCES LIVRE(ISBN),
  Role VARCHAR(30), PRIMARY KEY (IdAuteur, ISBN));
INSERT INTO AUTEUR VALUES ('A1','Benali','Samir','Marocaine'), ('A2','Dupont','Marie','Française'),
 ('A3','Lopez','Carlos','Espagnole'), ('A4','Fadel','Ahmed','Marocaine'), ('A5','Youssfi','Youssef','Belge');
INSERT INTO LIVRE VALUES ('L1','Apprendre SQL',2020,'Elsevier'), ('L2','Bases de données',2015,'Gallimard'),
 ('L3','Algèbre relationnelle',2022,'Gallimard'), ('L4','Introduction à Python',2019,'Springer');
INSERT INTO REDIGE VALUES ('A1','L1','Auteur principal'), ('A1','L2','Co-auteur'), ('A2','L2','Auteur principal'),
 ('A3','L4','Auteur principal'), ('A1','L3','Auteur principal'), ('A4','L3','Co-auteur');
```

> [!attention] Dans l'énoncé, la ligne A5 est écrite avec des apostrophes typographiques (‘A5’, ‘belge’) et une minuscule : MySQL rejette ‘…’. On écrit 'Belge' avec des apostrophes droites.

**Q1–Q3 · sélections simples**

- Q1 : σ Nationalite='Marocaine' (AUTEUR)
- Q2 : π Titre (σ AnneeParution>2018 (LIVRE))
- Q3 : π ISBN, Titre (σ IdAuteur='A1' (LIVRE ⋈ REDIGE))

```sql
SELECT IdAuteur, Nom FROM AUTEUR WHERE Nationalite = 'Marocaine';
SELECT Titre FROM LIVRE WHERE AnneeParution > 2018;
SELECT L.ISBN, L.Titre FROM LIVRE L JOIN REDIGE R ON L.ISBN = R.ISBN WHERE R.IdAuteur = 'A1';
```

```sortie
IdAuteur | Nom
A1 | Benali
A4 | Fadel
Titre
Apprendre SQL
Algèbre relationnelle
Introduction à Python
ISBN | Titre
L1 | Apprendre SQL
L2 | Bases de données
L3 | Algèbre relationnelle
```

**Q4–Q6 · jointures à trois tables**

- Q4 : π Nom, Prenom, Titre ((AUTEUR ⋈ REDIGE) ⋈ LIVRE)
- Q5 : π Nom, Prenom (σ Editeur='Gallimard' (LIVRE) ⋈ (AUTEUR ⋈ REDIGE))
- Q6 : π Nom, Prenom, Titre (σ AnneeParution>2015 (LIVRE) ⋈ (AUTEUR ⋈ REDIGE))

```sql
SELECT DISTINCT A.Nom, A.Prenom FROM AUTEUR A
  JOIN REDIGE R ON A.IdAuteur = R.IdAuteur JOIN LIVRE L ON L.ISBN = R.ISBN
WHERE L.Editeur = 'Gallimard' ORDER BY A.Nom;
SELECT A.Nom, L.Titre, L.AnneeParution FROM AUTEUR A
  JOIN REDIGE R ON A.IdAuteur = R.IdAuteur JOIN LIVRE L ON L.ISBN = R.ISBN
WHERE L.AnneeParution > 2015 ORDER BY L.AnneeParution;
```

```sortie
Nom | Prenom
Benali | Samir
Dupont | Marie
Fadel | Ahmed
Nom | Titre | AnneeParution
Lopez | Introduction à Python | 2019
Benali | Apprendre SQL | 2020
Benali | Algèbre relationnelle | 2022
Fadel | Algèbre relationnelle | 2022
```

`DISTINCT` en Q5 : Benali a deux livres chez Gallimard, il ne doit apparaître qu'une fois (comme avec π).

**Q7 · jointure externe gauche**

AUTEUR ⟕ REDIGE (puis ⟕ LIVRE pour le titre).

```sql
SELECT A.Nom, L.Titre FROM AUTEUR A
  LEFT JOIN REDIGE R ON A.IdAuteur = R.IdAuteur LEFT JOIN LIVRE L ON L.ISBN = R.ISBN
ORDER BY A.IdAuteur, L.ISBN;
```

```sortie
Nom | Titre
Benali | Apprendre SQL
Benali | Bases de données
Benali | Algèbre relationnelle
Dupont | Bases de données
Lopez | Introduction à Python
Fadel | Algèbre relationnelle
Youssfi | NULL
```

**Q8–Q10 · regroupement, tri, filtre de groupe**

- Q8 : γ IdAuteur ; COMPTE(ISBN) → NbLivres (AUTEUR ⟕ REDIGE)
- Q9 : τ NbLivres DESC (Q8)
- Q10 : σ NbLivres>1 (Q8), puis ⋈ AUTEUR pour le nom

```sql
SELECT A.Nom, COUNT(R.ISBN) AS NbLivres
FROM AUTEUR A LEFT JOIN REDIGE R ON A.IdAuteur = R.IdAuteur
GROUP BY A.IdAuteur, A.Nom
ORDER BY NbLivres DESC, A.Nom;
SELECT A.Nom, COUNT(R.ISBN) AS NbLivres
FROM AUTEUR A JOIN REDIGE R ON A.IdAuteur = R.IdAuteur
GROUP BY A.IdAuteur, A.Nom HAVING COUNT(R.ISBN) > 1;
```

```sortie
Nom | NbLivres
Benali | 3
Dupont | 1
Fadel | 1
Lopez | 1
Youssfi | 0
Nom | NbLivres
Benali | 3
```

`COUNT(R.ISBN)` et non `COUNT(*)` : pour Youssfi, la ligne existe (avec NULL), `COUNT(*)` donnerait 1 au lieu de 0.

**Q11 · division**

π IdAuteur, ISBN (REDIGE) ÷ π ISBN (σ Editeur='Gallimard' (LIVRE))

```sql
SELECT A.Nom, A.Prenom FROM AUTEUR A
WHERE NOT EXISTS (
  SELECT ISBN FROM LIVRE WHERE Editeur = 'Gallimard'
  EXCEPT
  SELECT R.ISBN FROM REDIGE R WHERE R.IdAuteur = A.IdAuteur);
```

```sortie
Nom | Prenom
Benali | Samir
```

C'est la correction du prof : « il n'existe aucun livre Gallimard que l'auteur n'a pas rédigé ». La version `NOT EXISTS … NOT EXISTS` du chapitre 4 marche aussi sur les MySQL antérieurs à 8.0.31 (sans EXCEPT).

> [!attention] Dans la correction manuscrite du TD2, la version « avec nom et prénom » de Q11 joint AUTEUR au **diviseur** : π Nom, Prenom [π ISBN, IdAuteur (REDIGE) ÷ (π ISBN (σ …(LIVRE)) ⋈ AUTEUR)]. C'est incorrect (le diviseur doit rester π ISBN(…)). Écris plutôt : π Nom, Prenom ((π IdAuteur, ISBN (REDIGE) ÷ π ISBN (σ Editeur='Gallimard' (LIVRE))) ⋈ AUTEUR).

> [!attention] La correction du TD4 groupe par `A.IdAuteur` en affichant `A.Nom, A.Prenom`. MySQL l'accepte (IdAuteur est la clé primaire, donc Nom en dépend), mais grouper sur toutes les colonnes affichées est plus sûr.

## TD3 · LDD et LMD complet (BiblioDB)

La correction du TD3 est un scan peu lisible ; voici le script reconstitué. Version MySQL du prof pour les questions 1, 2, 7 et 10 :

```sql nontest
CREATE DATABASE IF NOT EXISTS BiblioDB;
USE BiblioDB;
ALTER TABLE Livre MODIFY genre VARCHAR(50);                       -- Q7
ALTER TABLE Auteur MODIFY nationalite VARCHAR(30) NOT NULL;       -- Q10
```

Le reste, exécuté sous SQLite :

```sql
-- On repart d'une base vide (SQLite ignore la casse : Auteur = AUTEUR)
DROP TABLE REDIGE; DROP TABLE LIVRE; DROP TABLE AUTEUR;
PRAGMA foreign_keys = ON;
CREATE TABLE Auteur (id_auteur INT PRIMARY KEY, nom VARCHAR(30) NOT NULL, prenom VARCHAR(30) NOT NULL, nationalite VARCHAR(30));
CREATE TABLE Livre (id_livre INT PRIMARY KEY, titre VARCHAR(30) NOT NULL,
  annee_parution INT CHECK (annee_parution >= 1900), genre VARCHAR(30));
CREATE TABLE Rediger (id_auteur INT, id_livre INT, PRIMARY KEY (id_auteur, id_livre),
  FOREIGN KEY (id_auteur) REFERENCES Auteur(id_auteur) ON DELETE CASCADE,
  FOREIGN KEY (id_livre) REFERENCES Livre(id_livre) ON DELETE CASCADE);
ALTER TABLE Auteur ADD COLUMN date_naissance DATE;
ALTER TABLE Livre DROP COLUMN genre;
CREATE UNIQUE INDEX unq_titre ON Livre (titre);
INSERT INTO Auteur VALUES (1,'Samir','Sami','Française','1954-11-07'), (2,'Youssef','Saad','Marocaine','1945-06-21'),
 (3,'Youness','Rami','Anglaise','1965-06-25'), (4,'Siham','Hanane','Anglaise','1963-06-25');
INSERT INTO Livre VALUES (101,'Introduction à Python',1992), (102,'Apprendre Java',1999), (103,'Maîtriser SQL',2001);
INSERT INTO Rediger VALUES (1,101), (1,103), (2,102), (3,101), (4,102), (4,103);
UPDATE Livre SET annee_parution = 1995 WHERE titre = 'Introduction à Python';
UPDATE Auteur SET prenom = 'Souad' WHERE id_auteur = 4;
DELETE FROM Rediger WHERE id_auteur = 2 AND id_livre = 102;
DELETE FROM Livre WHERE titre = 'Introduction à Python';
SELECT * FROM Livre;
SELECT * FROM Rediger;
```

```sortie
id_livre | titre | annee_parution
102 | Apprendre Java | 1999
103 | Maîtriser SQL | 2001
id_auteur | id_livre
1 | 103
4 | 102
4 | 103
```

> [!attention] Différences avec MySQL : (1) Q9 se fait en MySQL par `ALTER TABLE Livre ADD CONSTRAINT unq_titre UNIQUE (titre);` (SQLite n'ajoute pas de contrainte à une table existante, d'où l'index unique) ; (2) Q8 en MySQL : `ALTER TABLE Livre DROP genre;`. Q17 réussit grâce à `ON DELETE CASCADE` : les lignes (1,101) et (3,101) de Rediger disparaissent avec le livre.

## TP1 à TP4 · l'essentiel

| TP | Thème | Ce qu'il faut savoir refaire |
|---|---|---|
| TP1 | LDD avec MySQL Workbench | CREATE/USE, CHECK `niveau IN ('DEUG','Licence','Master')`, ALTER ADD/MODIFY/DROP, contrainte nommée `chk_naissance` |
| TP2 | LMD + SELECT | INSERT multiple, UPDATE/DELETE ciblés, GROUP BY + HAVING, LIMIT (chapitre 7) |
| TP3 | Jointures, sous-requêtes | LEFT JOIN + IS NULL, COUNT par cours, NOT IN, meilleure note par cours (chapitre 8) |
| TP4 | Utilisateurs, vues, index | CREATE USER, GRANT colonne, SHOW GRANTS, vue, EXPLAIN avant/après index (chapitre 9) |

## S'exercer

```exercice Questions de TP
? (TP1) Ajoute à Etudiant une contrainte nommée chk_naissance : date de naissance avant le 1er janvier 2010 (MySQL).
= ALTER TABLE Etudiant ADD CONSTRAINT chk_naissance CHECK (date_naissance < '2010-01-01');

? (TP3 Q10) Liste tous les cours avec leur nombre d'étudiants inscrits (y compris 0).
= SELECT C.nom_cours, COUNT(I.id_etudiant) AS nb FROM Cours C LEFT JOIN Inscription I ON C.id_cours = I.id_cours GROUP BY C.id_cours, C.nom_cours;

? (TP3 Q13) Noms des étudiants inscrits à au moins deux cours.
= SELECT E.nom FROM Etudiant E JOIN Inscription I ON E.id_etudiant = I.id_etudiant GROUP BY E.id_etudiant, E.nom HAVING COUNT(*) >= 2;

? Combien d'auteurs a renvoyé la requête Q10 (plus d'un livre) sur la base du TD4 ?
reponse: 1
= Seul Benali (3 livres). Fadel, Dupont et Lopez en ont un, Youssfi aucun.
```

## Flashcards

```cartes
Q5 du TD4 : pourquoi DISTINCT ? :: Un auteur avec deux livres Gallimard apparaîtrait deux fois.
Q8 : pourquoi COUNT(R.ISBN) ? :: COUNT(*) compterait 1 pour un auteur sans livre (ligne NULL du LEFT JOIN).
Division en SQL (version du prof) :: NOT EXISTS (livres visés EXCEPT livres de l'auteur).
Supprimer un livre encore référencé :: Possible seulement avec ON DELETE CASCADE (ou SET NULL) sur la clé étrangère.
Changer le type d'une colonne en MySQL :: ALTER TABLE t MODIFY col nouveau_type;
Anti-jointure :: LEFT JOIN puis WHERE colonne_de_droite IS NULL.
```

## QCM du chapitre

```qcm
? Sur la base du TD4, combien de livres a rédigés Benali (A1) ?
- 1
- 2
+ 3
= L1, L2 et L3.

? Quels auteurs ont rédigé tous les livres Gallimard (L2, L3) ?
+ Benali seulement
- Benali et Fadel
- Benali et Dupont
= Fadel n'a que L3, Dupont que L2.

? Pour Q7 (« tous les auteurs, même sans livre »), il faut :
- INNER JOIN
+ LEFT JOIN depuis AUTEUR
- RIGHT JOIN depuis AUTEUR
= AUTEUR est à gauche et doit être conservé.

? En Q8, Youssfi (aucun livre) avec COUNT(R.ISBN) obtient :
+ 0
- 1
- NULL
= COUNT(col) ignore le NULL produit par le LEFT JOIN.

? Q10 s'écrit avec :
- WHERE COUNT(ISBN) > 1
+ HAVING COUNT(ISBN) > 1
- ORDER BY COUNT(ISBN) > 1
= Filtre sur un groupe.

? Dans le TD3, la contrainte annee_parution ≥ 1900 s'écrit :
+ CHECK (annee_parution >= 1900)
- UNIQUE (annee_parution)
- DEFAULT 1900
= CHECK impose une condition.

? Q16 du TD3 « supprimez l'association entre Youssef Saad et son livre » vise la table :
- Auteur
- Livre
+ Rediger
= On supprime le lien, pas l'auteur ni le livre.

? Pourquoi « DELETE FROM Livre WHERE id_livre = 101 » réussit-il dans le TD3 corrigé ?
+ Les clés étrangères de Rediger sont en ON DELETE CASCADE
- Le livre n'est référencé par personne
- MySQL ignore les clés étrangères
= Les lignes liées de Rediger sont supprimées automatiquement.

? π ISBN, Titre (σ IdAuteur='A1' (LIVRE ⋈ REDIGE)) donne combien de lignes ?
- 1
- 2
+ 3
= L1, L2, L3.

? Dans la Q5 en algèbre, l'équivalent du DISTINCT SQL est assuré par :
+ la projection π, qui élimine les doublons
- la sélection σ
- la jointure ⋈
= π travaille sur des ensembles.
```

---
id: sql-jointures
titre: SQL · opérateurs ensemblistes, jointures et sous-requêtes
seance: Séance 10 · 28 avril 2026
importance: 5
---

## Avant de commencer

Il faut connaître les jointures de l'algèbre (chapitre 4) et le SELECT simple (chapitre 7).

```exercice Vérifie ton prérequis
? Quelle jointure de l'algèbre garde toutes les lignes de la relation de gauche, même sans correspondance ?
= La jointure externe gauche ⟕ (LEFT OUTER JOIN), qui complète par NULL.
```

## Comment aborder ce chapitre

> [!astuce] **Une question = un réflexe.** « avec leurs… » → JOIN ; « même ceux qui n'ont pas… » → LEFT JOIN ; « qui n'ont aucun… » → LEFT JOIN + IS NULL ou NOT IN / NOT EXISTS ; « le plus grand… » → sous-requête avec MAX.

> [!piege] Oublier la condition de jointure : `FROM ETUDIANT, FORMATION` sans WHERE fait un **produit cartésien** (25 lignes au lieu de 4).

À la fin, tu sais utiliser UNION / INTERSECT / EXCEPT, toutes les jointures SQL et les sous-requêtes (IN, EXISTS, ANY, ALL, dans le FROM).

## Idée 1 · Les données de la séance

```sql
CREATE TABLE FORMATION (ID_Formation INT PRIMARY KEY, Nom_Formation VARCHAR(100), Etablissement VARCHAR(100), Diplome VARCHAR(50));
CREATE TABLE ETUDIANT (CNE CHAR(10) PRIMARY KEY, Nom VARCHAR(50), Prenom VARCHAR(50), Ville VARCHAR(50),
  ID_Formation INT);
INSERT INTO FORMATION VALUES (1,'Ingénierie Informatique','ENSIAS - Rabat','Master'),
 (2,'Intelligence Artificielle','FST - Settat','Master'), (3,'Big Data & Cloud Computing','FP - Béni Mellal','Master'),
 (4,'Management des Entreprises','FSJES - Casablanca','Licence'), (6,'Cybersécurité','EMI - Rabat','Master');
INSERT INTO ETUDIANT VALUES ('2020456789','YOU','Youssef','Casablanca',1), ('2021123456','SAL','Salma','Rabat',2),
 ('2019987654','MEH','Mehdi','Marrakech',3), ('2020789123','FAT','Fatima','Béni Mellal',4),
 ('2019674321','OMA','Omar','Agadir',5);
CREATE TABLE NOTE (CNE CHAR(10), Module VARCHAR(30), Note DECIMAL(4,2));
INSERT INTO NOTE VALUES ('2020456789','SQL',15), ('2020456789','Java',9), ('2021123456','SQL',17),
 ('2019987654','SQL',12), ('2020789123','SQL',8), ('2020789123','Java',14);
```

## Idée 2 · UNION, INTERSECT, EXCEPT

Conditions : **même nombre de colonnes**, types compatibles ; les colonnes sont appariées **par position** (les noms ne comptent pas, le résultat prend ceux de la 1re requête).

```sql
SELECT Ville FROM ETUDIANT UNION SELECT 'Rabat' ORDER BY Ville;
SELECT CNE FROM NOTE WHERE Module = 'SQL' INTERSECT SELECT CNE FROM NOTE WHERE Module = 'Java';
SELECT CNE FROM ETUDIANT EXCEPT SELECT CNE FROM NOTE;
```

```sortie
Ville
Agadir
Béni Mellal
Casablanca
Marrakech
Rabat
CNE
2020456789
2020789123
CNE
2019674321
```

- `UNION` supprime les doublons, **`UNION ALL`** les garde (plus rapide).
- INTERSECT : étudiants qui ont SQL **et** Java. EXCEPT : étudiants **sans** note (Omar).

> [!attention] MySQL n'accepte INTERSECT et EXCEPT que depuis la version **8.0.31** (le cours montre aussi la forme `TABLE etudiants INTERSECT TABLE anciens_etudiants`). Sur une version plus ancienne, on écrit `WHERE CNE IN (…)` / `NOT IN (…)`.

## Idée 3 · Les jointures SQL

| SQL | Algèbre | Garde |
|---|---|---|
| `FROM A, B WHERE A.k = B.k` | équi-jointure (forme « ancienne ») | correspondances |
| `A INNER JOIN B ON A.k = B.k` | équi-jointure | correspondances |
| `A NATURAL JOIN B` | jointure naturelle | correspondances, colonne commune une fois |
| `A JOIN B USING (k)` | ≈ naturelle sur k seulement | correspondances |
| `A LEFT JOIN B ON …` | ⟕ | tout A |
| `A RIGHT JOIN B ON …` | ⟖ | tout B |
| `A CROSS JOIN B` | × | toutes les paires |

```sql
SELECT E.Prenom, F.Nom_Formation
FROM ETUDIANT AS E LEFT JOIN FORMATION AS F ON E.ID_Formation = F.ID_Formation;
SELECT F.Nom_Formation FROM FORMATION F LEFT JOIN ETUDIANT E USING (ID_Formation) WHERE E.CNE IS NULL;
```

```sortie
Prenom | Nom_Formation
Youssef | Ingénierie Informatique
Salma | Intelligence Artificielle
Mehdi | Big Data & Cloud Computing
Fatima | Management des Entreprises
Omar | NULL
Nom_Formation
Cybersécurité
```

La deuxième requête est le **motif « anti-jointure »** du TP3 Q7 : LEFT JOIN puis `IS NULL` pour trouver ce qui n'a **aucune** correspondance.

**FULL OUTER JOIN en MySQL** (non supporté) : on réunit une jointure gauche et une jointure droite.

```sql nontest
SELECT E.Prenom, F.Nom_Formation FROM ETUDIANT E LEFT JOIN FORMATION F ON E.ID_Formation = F.ID_Formation
UNION
SELECT E.Prenom, F.Nom_Formation FROM ETUDIANT E RIGHT JOIN FORMATION F ON E.ID_Formation = F.ID_Formation;
```

## Idée 4 · Les sous-requêtes

Une sous-requête est un SELECT entre parenthèses, utilisé dans WHERE, HAVING, FROM ou SELECT.

```sql
SELECT Prenom FROM ETUDIANT
WHERE CNE IN (SELECT CNE FROM NOTE WHERE Note >= 15);
SELECT Prenom FROM ETUDIANT E
WHERE EXISTS (SELECT 1 FROM NOTE N WHERE N.CNE = E.CNE AND N.Note < 10);
SELECT CNE, Note FROM NOTE WHERE Module = 'SQL'
  AND Note = (SELECT MAX(Note) FROM NOTE WHERE Module = 'SQL');
```

```sortie
Prenom
Youssef
Salma
Prenom
Youssef
Fatima
CNE | Note
2021123456 | 17
```

- **IN** : la valeur est dans la liste renvoyée.
- **EXISTS** : vrai si la sous-requête renvoie au moins une ligne. Elle est **corrélée** : elle utilise `E.CNE` de la requête externe et est réévaluée pour chaque étudiant.
- Comparaison avec `=`, `>`… : la sous-requête doit renvoyer **une seule valeur**.

```sql nontest
-- ANY / ALL : non supportés par SQLite, valides en MySQL
SELECT CNE FROM NOTE WHERE Note > ANY (SELECT Note FROM NOTE WHERE Module = 'Java');  -- > au moins une (> 9)
SELECT CNE FROM NOTE WHERE Note > ALL (SELECT Note FROM NOTE WHERE Module = 'Java');  -- > toutes (> 14)
```

> [!attention] SQLite ne connaît pas `ANY` / `ALL`. Équivalents exécutables : `> ANY (…)` ⇔ `> (SELECT MIN(…))` et `> ALL (…)` ⇔ `> (SELECT MAX(…))` (quand la sous-requête n'est pas vide).

```sql
SELECT CNE, Note FROM NOTE WHERE Note > (SELECT MAX(Note) FROM NOTE WHERE Module = 'Java');
SELECT Module, ROUND(AVG(Note), 2) AS moyenne
FROM (SELECT * FROM NOTE WHERE Note >= 10) AS reussites GROUP BY Module;
```

```sortie
CNE | Note
2020456789 | 15
2021123456 | 17
Module | moyenne
Java | 14.0
SQL | 14.67
```

Sous-requête dans le FROM : elle forme une table temporaire, qui **doit avoir un alias** en MySQL.

## S'exercer

```exercice Exercices types (TD4, TP3)
? (TD4 Q7) Lister tous les auteurs même s'ils n'ont rédigé aucun livre.
= SELECT A.Nom, A.Prenom, R.ISBN FROM AUTEUR A LEFT JOIN REDIGE R ON A.IdAuteur = R.IdAuteur; (Youssfi apparaît avec ISBN NULL).

? (TP3 Q12) Les étudiants qui n'ont pas suivi le cours « Réseaux Informatiques ».
= SELECT nom, prenom FROM Etudiant WHERE id_etudiant NOT IN (SELECT I.id_etudiant FROM Inscription I JOIN Cours C ON I.id_cours = C.id_cours WHERE C.nom_cours = 'Réseaux Informatiques');

? (TP3 Q15) Les étudiants ayant la meilleure note dans chaque cours.
= SELECT E.nom, I.id_cours, I.note FROM Inscription I JOIN Etudiant E ON E.id_etudiant = I.id_etudiant WHERE I.note = (SELECT MAX(I2.note) FROM Inscription I2 WHERE I2.id_cours = I.id_cours); (sous-requête corrélée par cours).
```

## Flashcards

```cartes
UNION vs UNION ALL :: UNION supprime les doublons ; UNION ALL les garde.
Conditions des opérateurs ensemblistes :: Même nombre de colonnes, types compatibles, appariement par position.
Équivalent de NATURAL JOIN :: JOIN … USING (col) (sur la colonne commune).
Trouver ce qui n'a aucune correspondance :: LEFT JOIN … WHERE droite.cle IS NULL (ou NOT IN / NOT EXISTS).
FULL OUTER JOIN en MySQL :: LEFT JOIN … UNION … RIGHT JOIN.
EXISTS :: Vrai si la sous-requête renvoie au moins une ligne.
> ALL (sous-requête) :: Supérieur à toutes les valeurs, donc au maximum.
Sous-requête corrélée :: Elle utilise une colonne de la requête externe et est réévaluée pour chaque ligne.
```

## QCM du chapitre

```qcm
? Quelle syntaxe est équivalente à NATURAL JOIN ?
- JOIN … ON table1.col = table2.col
- LEFT JOIN … ON table1.col = table2.col
- WHERE table1.col = table2.col
+ JOIN … USING (col)
= Examen 2025 : USING fusionne la colonne commune comme la jointure naturelle.

? Quelle jointure retourne uniquement les lignes avec des correspondances dans les deux tables ?
- LEFT JOIN
- FULL OUTER JOIN
+ INNER JOIN
- CROSS JOIN
= Examen 2025.

? `FROM ETUDIANT, FORMATION` sans condition produit :
+ un produit cartésien
- une jointure naturelle
- une erreur
= Toutes les paires de lignes.

? UNION exige :
+ le même nombre de colonnes et des types compatibles
- les mêmes noms de colonnes
- une clé primaire commune
= Les noms ne sont pas pris en compte.

? Pour lister les formations sans aucun étudiant :
- FORMATION INNER JOIN ETUDIANT
+ FORMATION LEFT JOIN ETUDIANT … WHERE ETUDIANT.CNE IS NULL
- FORMATION CROSS JOIN ETUDIANT
= Anti-jointure (TP3 Q7).

? `Note > ALL (SELECT Note FROM NOTE WHERE Module='Java')` avec Java = {9, 14} garde les notes :
- > 9
+ > 14
- = 14
= Il faut dépasser toutes les valeurs.

? EXISTS (sous-requête) est vrai quand :
+ la sous-requête renvoie au moins une ligne
- la sous-requête renvoie exactement une ligne
- la sous-requête renvoie NULL
= Le contenu des colonnes n'importe pas.

? MySQL supporte-t-il FULL OUTER JOIN ?
- Oui, depuis toujours
+ Non : on combine LEFT JOIN et RIGHT JOIN avec UNION
- Oui, avec le mot-clé FULL
= SQLite 3.39+ et PostgreSQL le supportent, pas MySQL.

? `WHERE Note = (SELECT Note FROM NOTE)` provoque une erreur si :
+ la sous-requête renvoie plusieurs lignes
- la sous-requête renvoie une seule ligne
- la table est indexée
= Avec =, la sous-requête doit être scalaire ; sinon on utilise IN.

? Une sous-requête dans le FROM, en MySQL :
- est interdite
+ doit recevoir un alias
- ne peut pas contenir de WHERE
= Every derived table must have its own alias.
```

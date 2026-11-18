---
id: revision-examen
titre: Fiche de révision et examen blanc
seance: Avant l'examen
importance: 3
---

## Avant de commencer

L'examen final 2024-2025 (session ordinaire, 1 h 30) était un **QCM de 30 questions** couvrant tout le cours : dépendances fonctionnelles et MCD (≈ 3 questions), normalisation (1), algèbre relationnelle (≈ 7), MySQL et LDD (≈ 10), jointures SQL (2), index, vues, utilisateurs (4), LMD (≈ 3).

```exercice Vérifie ton prérequis
? Sans regarder : écris le symbole et le rôle de σ, π, ρ, γ, τ, ÷.
= σ sélection (lignes) ; π projection (colonnes) ; ρ renommage ; γ regroupement + agrégats ; τ tri ; ÷ division (« associé à tous »).
```

## Comment aborder ce chapitre

> [!astuce] **Beaucoup de questions portent sur des détails MySQL** (port 3306, InnoDB, DROP INDEX pour un UNIQUE, SET, REPLACE, TIMESTAMP). Ce sont des points faciles si tu as relu le chapitre 5 et le chapitre 6.

> [!piege] Les options de l'examen se ressemblent (σ / π / ρ / τ avec la même condition ; ADD COLUMN / INSERT COLUMN). Lis **chaque mot-clé** avant de cocher.

À la fin, tu as révisé les tableaux clés et passé un examen blanc chronométré dans les conditions de l'annale.

## Idée 1 · Tableaux de survie

| Algèbre | SQL |
|---|---|
| σ condition (R) | `SELECT * FROM R WHERE condition` |
| π a, b (R) | `SELECT DISTINCT a, b FROM R` |
| ρ S (R) | `FROM R AS S` |
| R ∪ S / R ∩ S / R − S | `UNION` / `INTERSECT` / `EXCEPT` |
| R × S | `FROM R, S` ou `CROSS JOIN` |
| R ⋈ S | `NATURAL JOIN` ou `JOIN … USING (col)` |
| R ⋈θ S | `JOIN … ON θ` |
| R ⟕ S / ⟖ / ⟗ | `LEFT JOIN` / `RIGHT JOIN` / (MySQL) LEFT `UNION` RIGHT |
| R ÷ S | double `NOT EXISTS` |
| γ a ; COUNT(b) → n (R) | `SELECT a, COUNT(b) AS n FROM R GROUP BY a` |
| τ a DESC (R) | `ORDER BY a DESC` |

```grille Les familles SQL (examen : « quelle catégorie contient… »)
#cols: LDD | LMD | LID | LCD | TCL
CREATE | INSERT | SELECT | *GRANT | COMMIT
ALTER | UPDATE | · | *REVOKE | ROLLBACK
DROP, TRUNCATE | DELETE, REPLACE | · | · | ·
```

**MySQL en 8 réponses** : port **3306** · moteur **InnoDB** · index **B-Tree** · DATE **YYYY-MM-DD** · CHAR fixe / VARCHAR variable · `DROP INDEX` pour supprimer un UNIQUE · `SHOW GRANTS FOR 'u'@'h'` · `CREATE OR REPLACE VIEW`.

## Idée 2 · Les 10 pièges qui coûtent des points

```etapes Revois-les un par un
Cardinalités :: Elles se lisent du côté de l'entité concernée.
Clé étrangère au MLD :: Côté 1,1 ; N–N → nouvelle table.
2NF vs 3NF :: 2NF = pas de dépendance partielle ; 3NF = pas de dépendance transitive.
σ vs π :: σ filtre des lignes, π garde des colonnes (et supprime les doublons).
SELECT vs π :: SELECT garde les doublons : il faut DISTINCT.
Jointure interne :: Une ligne sans correspondance disparaît ; pour la garder, jointure externe.
WHERE vs HAVING :: Agrégat → HAVING.
NULL :: IS NULL, jamais = NULL ; COUNT(col) ignore les NULL.
UPDATE/DELETE sans WHERE :: Toute la table est touchée.
TIMESTAMP DEFAULT CURRENT_TIMESTAMP :: Insérer NULL ou rien donne la date/heure du serveur, pas une erreur.
```

## S'exercer

```exercice Problème de synthèse (style TD)
? Base : CLIENT(id_client, nom, ville) et COMMANDE(id_cmd, date_cmd, montant, id_client#). Écris en algèbre puis en SQL : les noms des clients de Béni Mellal ayant passé une commande de plus de 1000 DH.
= Algèbre : π nom (σ ville='Béni Mellal' ∧ montant>1000 (CLIENT ⋈ COMMANDE)). SQL : SELECT DISTINCT C.nom FROM CLIENT C JOIN COMMANDE M ON C.id_client = M.id_client WHERE C.ville = 'Béni Mellal' AND M.montant > 1000;

? Même base : le chiffre d'affaires total par ville, seulement pour les villes dépassant 5000 DH, du plus grand au plus petit.
= SELECT C.ville, SUM(M.montant) AS ca FROM CLIENT C JOIN COMMANDE M ON C.id_client = M.id_client GROUP BY C.ville HAVING SUM(M.montant) > 5000 ORDER BY ca DESC;

? Même base : les clients n'ayant jamais commandé (deux méthodes).
= 1) SELECT C.nom FROM CLIENT C LEFT JOIN COMMANDE M ON C.id_client = M.id_client WHERE M.id_cmd IS NULL; 2) SELECT nom FROM CLIENT WHERE id_client NOT IN (SELECT id_client FROM COMMANDE); En algèbre : π nom ((π id_client (CLIENT) − π id_client (COMMANDE)) ⋈ CLIENT).

? Donne le MLD de : CLIENT 0,N — passe — 1,1 COMMANDE et COMMANDE 1,N — contient (quantité) — 0,N PRODUIT.
= CLIENT(id_client, nom, ville) ; COMMANDE(id_cmd, date_cmd, id_client#) ; PRODUIT(id_produit, libelle, prix) ; CONTIENT(id_cmd#, id_produit#, quantite).
```

## Flashcards

```cartes
Port MySQL :: 3306.
Moteur MySQL par défaut :: InnoDB.
Index InnoDB :: B-Tree.
Supprimer un UNIQUE en MySQL :: ALTER TABLE t DROP INDEX nom;
SET('A','B','C') ← 'A,C,C,B' :: 'A,B,C'.
REPLACE INTO :: Supprime la ligne de même clé puis insère (ou insère simplement).
Équivalent SQL de la division :: Double NOT EXISTS.
Jointure qui ne garde que les correspondances :: INNER JOIN.
```

## QCM du chapitre

```qcm
? Examen blanc 1/20 · Une relation R(A, B, C, D) a pour clé (A, B) et on a A → C. R est :
- en 3NF
+ en 1NF mais pas en 2NF
- en BCNF
= C dépend d'une partie de la clé : dépendance partielle.

? 2/20 · Association Employé 0,1 — affecté — 0,N Projet, sans données. MLD le plus courant :
+ Employé(num_emp, …, code_projet#)
- Projet(code_projet, …, num_emp#)
- Obligatoirement Affectation(num_emp#, code_projet#)
= Clé étrangère côté 0,1 (règle 4) ; la relation associative est l'autre option.

? 3/20 · π nom (ÉTUDIANT) sur 3 étudiants dont deux s'appellent Ali renvoie :
- 3 lignes
+ 2 lignes
- 1 ligne
= La projection élimine les doublons.

? 4/20 · |R| = 4, |S| = 6. Le nombre maximal de lignes de R ⋈ S est :
- 10
+ 24
- 6
= Une jointure est un sous-ensemble de R × S.

? 5/20 · R − S = S − R est :
- toujours vrai
+ faux en général
- vrai si R et S ont le même schéma
= La différence n'est pas commutative.

? 6/20 · Quelle requête compte les étudiants par ville ?
- SELECT ville, COUNT(*) FROM etudiant;
+ SELECT ville, COUNT(*) FROM etudiant GROUP BY ville;
- SELECT COUNT(ville) FROM etudiant GROUP BY COUNT(*);
= Sans GROUP BY, un seul total.

? 7/20 · CREATE TABLE Log (id INT PRIMARY KEY AUTO_INCREMENT, horodatage TIMESTAMP DEFAULT CURRENT_TIMESTAMP); INSERT INTO Log (id) VALUES (NULL); SELECT horodatage FROM Log; renvoie :
- NULL
+ la date/heure du serveur au moment de l'insertion
- 0000-00-00 00:00:00
- une erreur
= Question 28 de l'examen 2025 : id NULL déclenche l'auto-incrément, horodatage prend sa valeur par défaut.

? 8/20 · `DELETE FROM Etudiant;` :
+ supprime toutes les lignes mais garde la table
- supprime la table
- ne fait rien sans WHERE
= DROP TABLE supprime la table.

? 9/20 · Pour vérifier qu'une valeur n'existe pas dans une autre table, on peut utiliser :
- IN
+ NOT EXISTS
- HAVING
= Ou NOT IN, ou LEFT JOIN … IS NULL.

? 10/20 · GRANT SELECT ON ecole.* TO 'ali'@'%'; donne à Ali :
+ la lecture de toutes les tables de ecole, depuis n'importe quel hôte
- tous les droits sur ecole
- la lecture d'une table nommée *
= % = tout hôte, ecole.* = toutes les tables de la base.

? 11/20 · Le niveau Merise indépendant de toute technologie est :
+ le MCD
- le MLD
- le MPD
= Niveau conceptuel.

? 12/20 · Quel type pour un prix exact en DH ?
- FLOAT
+ DECIMAL(10,2)
- VARCHAR(10)
= FLOAT est approché.

? 13/20 · `SELECT nom FROM etudiant WHERE nom LIKE '%a';` renvoie les noms :
- commençant par a
+ finissant par a
- contenant exactement un a
= % avant : n'importe quel début.

? 14/20 · Une vue créée avec une condition WHERE prix > (SELECT AVG(prix) …) :
+ se recalcule à chaque lecture
- garde la moyenne du jour de sa création
- est interdite (sous-requête)
= Exemple Products_Above_Average_Price de la séance 11.

? 15/20 · Quel opérateur SQL garde les doublons ?
- UNION
+ UNION ALL
- INTERSECT
= UNION supprime les doublons.

? 16/20 · Dans un MLD, `Cours(code_cours, intitulé, num_ens#)` : num_ens# est :
- la clé primaire de Cours
+ une clé étrangère vers Enseignant
- un attribut calculé
= # marque la clé étrangère.

? 17/20 · Une table est en BCNF si :
+ pour toute DF X → Y, X est une super-clé
- elle n'a pas de clé composée
- elle est en 2NF
= Définition de la séance 3.

? 18/20 · `SELECT * FROM A LEFT JOIN B ON A.k = B.k WHERE B.k IS NULL` renvoie :
+ les lignes de A sans correspondance dans B
- les lignes communes
- les lignes de B sans correspondance dans A
= Anti-jointure.

? 19/20 · Quelle instruction supprime une base MySQL si elle existe ?
- DELETE DATABASE IF EXISTS b;
+ DROP DATABASE IF EXISTS b;
- TRUNCATE DATABASE b;
= DATABASE ou SCHEMA sont synonymes.

? 20/20 · ENUM('Homme','Femme') autorise :
+ une seule valeur de la liste par ligne
- plusieurs valeurs de la liste
- n'importe quelle chaîne
= Plusieurs valeurs : c'est SET.
```

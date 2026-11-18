---
id: algebre-base
titre: Algèbre relationnelle (1) · sélection, projection, renommage, opérations ensemblistes
seance: Séance 4 · 30 mars 2026
importance: 5
---

## Avant de commencer

Il faut connaître les opérations sur les ensembles : union, intersection, différence, et le produit cartésien de deux ensembles.

```exercice Vérifie ton prérequis
? A = {1, 2, 3} et B = {2, 3, 4}. Calcule A ∪ B, A ∩ B, A − B et le nombre de couples de A × B.
= A ∪ B = {1, 2, 3, 4} ; A ∩ B = {2, 3} ; A − B = {1} ; A × B contient 3 × 3 = 9 couples.
```

## Comment aborder ce chapitre

> [!astuce] **Lignes ou colonnes ?** σ (sélection) coupe des **lignes**, π (projection) garde des **colonnes**. Avant d'écrire un symbole, demande-toi lequel des deux tu veux réduire.

> [!piege] Confondre σ et π à l'examen : « sélectionner les étudiants dont le nom est Hassan » s'écrit avec **σ** (filtre de lignes), même si le mot « sélectionner » fait penser à SELECT… qui, en SQL, correspond plutôt à π !

À la fin, tu sais écrire et évaluer à la main σ, π, ρ, ∪, ∩, − et ×, et les traduire en SQL.

## Idée 1 · Une relation, un schéma, une extension

L'algèbre relationnelle est un langage **formel** et **procédural** : elle dit *comment* obtenir le résultat. Ses opérateurs sont **fermés** : le résultat est encore une relation, on peut donc les enchaîner.

- **Schéma** (intension) : `ÉTUDIANT(num_etu, nom, prénom, code_formation)` (statique).
- **Extension** (instance) : les lignes à un instant donné (dynamique).
- **Tuple** = ligne ; **attribut** = colonne ; **domaine** = valeurs possibles d'un attribut.

On crée l'exemple du cours dans SQLite pour vérifier chaque opération :

```sql
CREATE TABLE ETUDIANT (num_etu INT PRIMARY KEY, nom TEXT, prenom TEXT, code_formation TEXT);
INSERT INTO ETUDIANT VALUES (101,'Ali','Karim','Python'), (102,'Hassan','Laila','JavaScript'), (103,'Saad','Nadia','Python');
CREATE TABLE ETUDIANTS_INFO (num_etu INT, nom TEXT, prenom TEXT);
CREATE TABLE ETUDIANTS_MATH (num_etu INT, nom TEXT, prenom TEXT);
INSERT INTO ETUDIANTS_INFO VALUES (101,'Ali','Karim'), (102,'Hassan','Laila'), (103,'Omar','Yassine');
INSERT INTO ETUDIANTS_MATH VALUES (201,'Nadia','Samira'), (102,'Hassan','Laila'), (202,'Karim','Anas');
```

## Idée 2 · Sélection σ : filtrer des lignes

```grille σ code_formation='Python' (ÉTUDIANT)
#cols: num_etu | nom | prénom | code_formation
*101 | *Ali | *Karim | *Python
~102 | ~Hassan | ~Laila | ~JavaScript
*103 | *Saad | *Nadia | *Python
```

Notation : **σ condition (R)**. Opérateurs : =, ≠, <, >, ≤, ≥, ∧ (ET), ∨ (OU), ¬ (NON).

```sql
SELECT * FROM ETUDIANT WHERE nom = 'Hassan' AND code_formation = 'JavaScript';
```

```sortie
num_etu | nom | prenom | code_formation
102 | Hassan | Laila | JavaScript
```

C'est σ nom='Hassan' ∧ code_formation='JavaScript' (ÉTUDIANT).

## Idée 3 · Projection π : garder des colonnes

**π attributs (R)** garde les colonnes demandées et **élimine les doublons** (le résultat est un ensemble).

```sql
SELECT DISTINCT nom FROM ETUDIANT WHERE code_formation = 'Python';
```

```sortie
nom
Ali
Saad
```

C'est π nom (σ code_formation='Python' (ÉTUDIANT)) : on lit de **l'intérieur vers l'extérieur**.

> [!prof] En SQL, `SELECT` **garde les doublons** par défaut. Pour obtenir exactement la projection, il faut `SELECT DISTINCT`.

## Idée 4 · Renommage ρ

- Relation : ρ APPRENANT (ÉTUDIANT).
- Attributs : ρ APPRENANT(id_apprenant, nom, prénom, id_formation) (ÉTUDIANT).
- Pour renommer **un seul** attribut, on recopie **toute** la liste : ρ ÉTUDIANT(num_etu, nom_etudiant, prénom, code_formation) (ÉTUDIANT).

En SQL, c'est l'alias `AS` (chapitre 7).

## Idée 5 · Union, intersection, différence

Condition commune : les deux relations sont **compatibles** (même nombre d'attributs, types correspondants, même ordre).

```grille INFO et MATH : orange = dans les deux
#cols: num_etu | INFO | MATH
101 | oui | ~non
*102 | *oui | *oui
103 | oui | ~non
201 | ~non | oui
202 | ~non | oui
```

```sql
SELECT * FROM ETUDIANTS_INFO UNION SELECT * FROM ETUDIANTS_MATH ORDER BY num_etu;
SELECT * FROM ETUDIANTS_INFO INTERSECT SELECT * FROM ETUDIANTS_MATH;
SELECT * FROM ETUDIANTS_INFO EXCEPT SELECT * FROM ETUDIANTS_MATH;
```

```sortie
num_etu | nom | prenom
101 | Ali | Karim
102 | Hassan | Laila
103 | Omar | Yassine
201 | Nadia | Samira
202 | Karim | Anas
num_etu | nom | prenom
102 | Hassan | Laila
num_etu | nom | prenom
101 | Ali | Karim
103 | Omar | Yassine
```

- R ∪ S : 5 tuples (102 n'apparaît qu'une fois).
- R ∩ S : seulement 102.
- R − S : 101 et 103. **Pas commutatif** : S − R donne 201 et 202.

> [!attention] Dans les diapos, la relation INFO change entre l'exemple de l'union (101, 102, 103) et ceux de l'intersection et de la différence (où 202 Karim Anas apparaît en plus dans INFO, d'où le résultat 102 et 202). Le tableau de l'intersection est aussi titré « Résultat de l'union » par erreur. Ici, on garde une seule version des données (celle de l'union).

> [!astuce] Projeter **avant** l'union (π(R) ∪ π(S)) donne le même résultat que projeter après, mais traite moins de données.

## Idée 6 · Produit cartésien ×

R × S associe **chaque** tuple de R à **chaque** tuple de S : |R × S| = |R| × |S| lignes et (m + n) attributs.

```sql
CREATE TABLE COURS (id_cours INT, nom_cours TEXT);
INSERT INTO COURS VALUES (101,'Mathématiques'), (102,'Informatique');
SELECT E.num_etu, E.nom, C.nom_cours FROM ETUDIANT E, COURS C WHERE E.num_etu < 103;
```

```sortie
num_etu | nom | nom_cours
101 | Ali | Mathématiques
101 | Ali | Informatique
102 | Hassan | Mathématiques
102 | Hassan | Informatique
```

2 étudiants × 2 cours = 4 lignes. Avec 1000 et 2000 tuples : 2 000 000 lignes ! D'où le conseil du prof : utiliser une **jointure** plutôt qu'un produit cartésien suivi d'une sélection.

```etapes Évaluer une expression imbriquée : π nom (σ code_formation='Python' (ÉTUDIANT))
Repérer la relation de départ :: ÉTUDIANT, 3 tuples.
Appliquer l'opérateur le plus intérieur :: σ garde 101 Ali et 103 Saad.
Appliquer l'opérateur suivant :: π nom garde la colonne nom : Ali, Saad.
Éliminer les doublons :: Aucun ici. Résultat : 2 tuples.
```

## S'exercer

```exercice Exercices types (TD2, examen)
? (TD2 Q1) Écris en algèbre relationnelle : « tous les auteurs marocains » avec AUTEUR(IdAuteur, Nom, Prenom, Nationalite).
= σ Nationalite='Marocaine' (AUTEUR). Résultat : A1 Benali et A4 Fadel.

? (TD2 Q2) « Les titres des livres publiés après 2018 » avec LIVRE(ISBN, Titre, AnneeParution, Editeur).
= π Titre (σ AnneeParution>2018 (LIVRE)) : Apprendre SQL (2020), Algèbre relationnelle (2022), Introduction à Python (2019).

? R contient 5 tuples, S en contient 3. Combien de tuples dans R × S ?
reponse: 15
= 5 × 3 = 15 (question de l'examen 2025).
```

## Flashcards

```cartes
σ (sigma) :: Sélection : garde les lignes qui vérifient une condition.
π (pi) :: Projection : garde des colonnes et élimine les doublons.
ρ (rho) :: Renommage d'une relation ou de ses attributs.
Condition pour ∪, ∩, − :: Relations compatibles : même nombre d'attributs, types correspondants, même ordre.
R − S est-il commutatif ? :: Non : R − S ≠ S − R.
Taille de R × S :: |R| × |S| tuples, avec m + n attributs.
Équivalent SQL exact de π :: SELECT DISTINCT (SELECT seul garde les doublons).
Schéma vs extension :: Schéma = structure (nom + attributs) ; extension = lignes à un instant donné.
```

## QCM du chapitre

```qcm
? Lequel de ces éléments représente une ligne dans une relation ?
- Un attribut
- Un domaine
+ Un tuple
- Un schéma
= Examen 2025.

? Pour sélectionner les étudiants nommés Hassan ET en JavaScript, on écrit :
- σ nom='Hassan' ∨ code_formation='JavaScript' (ÉTUDIANT)
- π nom='Hassan' ∧ code_formation='JavaScript' (ÉTUDIANT)
- ρ nom='Hassan' ∧ code_formation='JavaScript' (ÉTUDIANT)
+ σ nom='Hassan' ∧ code_formation='JavaScript' (ÉTUDIANT)
= Examen 2025 : filtre de lignes (σ) avec un ET (∧).

? R a 5 tuples, S en a 3. Combien de tuples dans R × S ?
- 8
- 2
- 5
+ 15
= Examen 2025 : produit des cardinalités.

? La projection π :
+ élimine les doublons
- garde toujours les doublons
- filtre les lignes
= C'est une opération ensembliste.

? Quel opérateur SQL correspond à la différence − ?
- UNION
- INTERSECT
+ EXCEPT
= MySQL 8.0.31+ l'accepte aussi ; avant, on utilisait NOT IN.

? R(A,B,C) × S(X,Y) a combien d'attributs ?
- 3
+ 5
- 6
= m + n = 3 + 2.

? L'algèbre relationnelle est un langage :
+ formel et procédural
- déclaratif et graphique
- de programmation objet
= Elle décrit les opérations à effectuer.

? Pour renommer un seul attribut avec ρ :
- on écrit seulement le nouveau nom
+ on recopie toute la liste des attributs
- c'est impossible
= Il n'existe pas de notation pour un seul attribut.

? INFO = {101, 102, 103}, MATH = {201, 102, 202}. INFO ∩ MATH contient :
+ 102
- 101, 103
- 102, 202
= Seul 102 est dans les deux.

? Opérateurs « fermés » signifie :
- ils ne marchent que sur une table
+ leur résultat est une relation, donc on peut les combiner
- ils ne renvoient jamais de doublons
= C'est ce qui permet les expressions imbriquées.
```

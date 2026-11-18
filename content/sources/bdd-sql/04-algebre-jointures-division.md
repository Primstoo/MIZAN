---
id: algebre-jointures
titre: Algèbre relationnelle (2) · jointures, division, agrégation et tri
seance: Séance 5 · 30 mars 2026
importance: 5
---

## Avant de commencer

Il faut maîtriser σ, π et le produit cartésien × (chapitre 3) : toutes les jointures en sont des combinaisons.

```exercice Vérifie ton prérequis
? ÉTUDIANT a 5 lignes, FORMATION en a 5. Combien de lignes dans ÉTUDIANT × FORMATION ?
reponse: 25
= 5 × 5 = 25. Une jointure va en garder seulement une partie.
```

## Comment aborder ce chapitre

> [!astuce] **Une jointure = × puis σ.** Retiens cette formule et tu peux retrouver n'importe quelle jointure interne : R ⋈θ S = σθ (R × S).

> [!piege] Croire qu'une jointure interne garde tout le monde. Une ligne **sans correspondance disparaît**. Pour la garder, il faut une jointure **externe** (gauche, droite ou complète).

À la fin, tu sais distinguer jointure naturelle, thêta, équi-jointure et jointures externes, écrire une division et un regroupement γ.

## Idée 1 · Les données du prof

```sql
CREATE TABLE FORMATION (ID_Formation INT PRIMARY KEY, Nom_Formation TEXT, Etablissement TEXT, Diplome TEXT);
CREATE TABLE ETUDIANT (CNE TEXT PRIMARY KEY, Nom TEXT, Prenom TEXT, Ville TEXT, ID_Formation INT);
INSERT INTO FORMATION VALUES
 (1,'Ingénierie Informatique','ENSIAS - Rabat','Master'),
 (2,'Intelligence Artificielle','FST - Settat','Master'),
 (3,'Big Data & Cloud Computing','FP - Béni Mellal','Master'),
 (4,'Management des Entreprises','FSJES - Casablanca','Licence'),
 (6,'Cybersécurité','EMI - Rabat','Master');
INSERT INTO ETUDIANT VALUES
 ('2020456789','YOU','Youssef','Casablanca',1),
 ('2021123456','SAL','Salma','Rabat',2),
 ('2019987654','MEH','Mehdi','Marrakech',3),
 ('2020789123','FAT','Fatima','Béni Mellal',4),
 ('2019674321','OMA','Omar','Agadir',5);
```

Omar a la formation 5 qui **n'existe pas** dans FORMATION ; la formation 6 (Cybersécurité) n'a **aucun** étudiant. Ces deux lignes « orphelines » vont révéler la différence entre les jointures.

## Idée 2 · Les jointures internes

| Jointure | Notation | Condition | Colonnes communes |
|---|---|---|---|
| Naturelle | R ⋈ S | égalité sur **tous** les attributs de même nom | **une seule fois** |
| Thêta | R ⋈θ S | condition quelconque (<, >, ≠, =…) | toutes gardées |
| Équi-jointure | R ⋈ R.A=S.B S | égalité seulement | **en double** |

```sql
SELECT E.Prenom, F.Nom_Formation FROM ETUDIANT E NATURAL JOIN FORMATION F;
```

```sortie
Prenom | Nom_Formation
Youssef | Ingénierie Informatique
Salma | Intelligence Artificielle
Mehdi | Big Data & Cloud Computing
Fatima | Management des Entreprises
```

Omar disparaît (pas de formation 5) et Cybersécurité aussi (pas d'étudiant).

Jointure thêta du cours : chaque étudiant avec chaque formation d'ID **strictement supérieur**, et Master seulement :

```sql
SELECT E.Prenom, E.ID_Formation AS E_ID, F.ID_Formation AS F_ID
FROM ETUDIANT E JOIN FORMATION F
  ON E.ID_Formation < F.ID_Formation AND F.Diplome = 'Master'
ORDER BY E_ID, F_ID;
```

```sortie
Prenom | E_ID | F_ID
Youssef | 1 | 2
Youssef | 1 | 3
Youssef | 1 | 6
Salma | 2 | 3
Salma | 2 | 6
Mehdi | 3 | 6
Fatima | 4 | 6
Omar | 5 | 6
```

> [!attention] Les diapos (formations 1 à 5, avec Génie Civil en 5) donnent 7 lignes pour cet exemple. Ici on utilise les données de la jointure externe (formation 6 à la place de 5) : le résultat change, la méthode est la même.

## Idée 3 · Les jointures externes

```html
<svg viewBox="0 0 600 130" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="Trois diagrammes : jointure gauche garde tout ÉTUDIANT, droite garde tout FORMATION, complète garde les deux">
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<g><circle cx="70" cy="55" r="38" fill="#D9824F" fill-opacity=".45" stroke="currentColor"/><circle cx="120" cy="55" r="38" fill="none" stroke="currentColor"/><text x="95" y="118">⟕ gauche</text></g>
<g><circle cx="270" cy="55" r="38" fill="none" stroke="currentColor"/><circle cx="320" cy="55" r="38" fill="#D9824F" fill-opacity=".45" stroke="currentColor"/><text x="295" y="118">⟖ droite</text></g>
<g><circle cx="470" cy="55" r="38" fill="#D9824F" fill-opacity=".45" stroke="currentColor"/><circle cx="520" cy="55" r="38" fill="#D9824F" fill-opacity=".45" stroke="currentColor"/><text x="495" y="118">⟗ complète</text></g>
<text x="70" y="60" font-size="11">ÉTU</text><text x="120" y="60" font-size="11">FORM</text>
</g></svg>
```

Les lignes sans correspondance sont gardées et complétées par **NULL**.

```sql
SELECT E.Prenom, F.ID_Formation, F.Nom_Formation
FROM ETUDIANT E FULL OUTER JOIN FORMATION F ON E.ID_Formation = F.ID_Formation;
```

```sortie
Prenom | ID_Formation | Nom_Formation
Youssef | 1 | Ingénierie Informatique
Salma | 2 | Intelligence Artificielle
Mehdi | 3 | Big Data & Cloud Computing
Fatima | 4 | Management des Entreprises
Omar | NULL | NULL
NULL | 6 | Cybersécurité
```

- **Gauche** (ÉTUDIANT ⟕ FORMATION) : les 5 étudiants, Omar avec NULL.
- **Droite** (⟖) : les 5 formations, Cybersécurité avec des NULL côté étudiant.
- **Complète** (⟗) : les deux orphelins.

> [!attention] SQLite gère RIGHT et FULL OUTER JOIN depuis la version 3.39. **MySQL ne connaît pas FULL OUTER JOIN** : on l'obtient par `LEFT JOIN … UNION … RIGHT JOIN` (chapitre 8).

> [!attention] Dans la diapo de la jointure complète, les noms passent en anglais (« Computer Engineering », « Bachelor »…). Ce sont les mêmes formations que dans les exemples précédents.

## Idée 4 · La division ÷ : « associé à TOUS »

R ÷ S donne les tuples de R associés à **tous** les tuples de S. Condition : le schéma de S est **strictement inclus** dans celui de R.

```grille Etudiant_Formation ÷ Formation_Examen(1, Examen 1), (1, Examen 2)
#cols: Prénom | ID | Examen
*Youssef | *1 | *Examen 1
*Youssef | *1 | *Examen 2
Salma | 2 | Examen 1
Mehdi | 3 | Examen 2
```

Seul Youssef a **les deux** examens de la formation 1.

> [!attention] La diapo n'affiche qu'une ligne dans Formation_Examen, (1, Examen 1), alors que le texte parle des « deux examens liés à la formation 1 ». On complète S avec (1, Examen 2), ce qui correspond à l'explication : seul Youssef est associé aux deux.

En SQL il n'y a pas d'opérateur division : on écrit une **double négation** (« il n'existe pas d'examen de S que l'étudiant n'a pas passé ») :

```sql
CREATE TABLE EF (CNE TEXT, Prenom TEXT, ID_Formation INT, Examen TEXT);
INSERT INTO EF VALUES ('2020456789','Youssef',1,'Examen 1'), ('2020456789','Youssef',1,'Examen 2'),
 ('2021123456','Salma',2,'Examen 1'), ('2019987654','Mehdi',3,'Examen 2');
CREATE TABLE FE (ID_Formation INT, Examen TEXT);
INSERT INTO FE VALUES (1,'Examen 1'), (1,'Examen 2');
SELECT DISTINCT a.CNE, a.Prenom FROM EF a
WHERE NOT EXISTS (
  SELECT * FROM FE s WHERE NOT EXISTS (
    SELECT * FROM EF b WHERE b.CNE = a.CNE AND b.ID_Formation = s.ID_Formation AND b.Examen = s.Examen));
```

```sortie
CNE | Prenom
2020456789 | Youssef
```

## Idée 5 · Agrégation γ et tri τ

**γ attributs_de_regroupement ; FONCTION(A) → nom (R)** : COMPTE (COUNT), SOMME (SUM), MOYENNE (AVG), MIN, MAX.

```sql
CREATE TABLE ETU (Matricule TEXT, Nom TEXT, ID_Formation TEXT, Age INT);
INSERT INTO ETU VALUES ('E001','Ali','F1',21), ('E002','Salma','F2',22), ('E003','Yassir','F1',20),
 ('E004','Fatima','F1',23), ('E005','Mehdi','F2',24);
SELECT ID_Formation, COUNT(Matricule) AS Nombre_Etudiants, ROUND(AVG(Age), 2) AS Age_Moyen
FROM ETU GROUP BY ID_Formation;
```

```sortie
ID_Formation | Nombre_Etudiants | Age_Moyen
F1 | 3 | 21.33
F2 | 2 | 23.0
```

C'est γ ID_Formation ; COMPTE(Matricule) → Nombre_Etudiants, MOYENNE(Age) → Age_Moyen (ETU).

> [!attention] Deux erreurs dans les diapos d'agrégation : (1) l'exemple 1 (F1 : 4 étudiants, F2 : 2) n'affiche que la ligne F1 ; il manque **F2 | 2** ; (2) l'exemple 4 compte COMPTE(CNE) alors que la relation n'a pas d'attribut CNE mais **Matricule**.

Le **tri τ** (tau) est une extension, pas un opérateur de l'algèbre classique (les relations sont des ensembles non ordonnés). Exemple : τ Age DESC (ETU), équivalent de `ORDER BY Age DESC`.

## S'exercer

```exercice Exercices types (TD2, examen)
? (TD2 Q4) Noms, prénoms des auteurs et titres des livres qu'ils ont rédigés (AUTEUR, LIVRE, REDIGE).
= π Nom, Prenom, Titre (AUTEUR ⋈ REDIGE ⋈ LIVRE). Les jointures naturelles se font sur IdAuteur puis ISBN.

? (TD2 Q8) Nombre de livres rédigés par chaque auteur.
= γ IdAuteur ; COMPTE(ISBN) → NbLivres (REDIGE). Pour avoir le nom : γ IdAuteur, Nom ; COMPTE(ISBN) → NbLivres (AUTEUR ⋈ REDIGE).

? (TD2 Q11) Auteurs ayant rédigé tous les livres publiés par Gallimard.
= π IdAuteur, ISBN (REDIGE) ÷ π ISBN (σ Editeur='Gallimard' (LIVRE)). Gallimard = {L2, L3} ; A1 a écrit L2 et L3 → résultat A1.
```

## Flashcards

```cartes
Jointure naturelle :: Égalité sur tous les attributs de même nom ; la colonne commune n'apparaît qu'une fois.
Jointure thêta :: R ⋈θ S = σθ (R × S), avec une condition quelconque.
Équi-jointure :: Jointure thêta avec seulement des égalités ; garde les colonnes en double.
Jointure externe gauche :: Garde toutes les lignes de gauche, NULL à droite si pas de correspondance.
Division R ÷ S :: Tuples de R associés à tous les tuples de S (schéma de S strictement inclus dans R).
Symbole du regroupement :: γ (gamma) : γ attributs ; FONCTION(A) → nom (R).
Symbole du tri :: τ (tau), extension non standard.
Division en SQL :: Double NOT EXISTS (il n'existe pas d'élément de S non associé).
```

## QCM du chapitre

```qcm
? Dans une jointure thêta, R ⋈θ S signifie :
+ R × S puis σθ (R × S)
- σθ(R) × S
- R ∪ S avec la condition θ
- πθ (R × S)
= Examen 2025.

? Pour la division R ÷ S, il faut :
- que R et S aient le même nombre d'attributs
+ que le schéma de S soit strictement inclus dans celui de R
- que R et S soient disjoints
- que S ait plus d'attributs que R
= Examen 2025.

? Notation correcte pour compter les étudiants par formation :
- σ ID_Formation ; COUNT(CNE) (Etudiant)
- π ID_Formation ; COUNT(CNE) (Etudiant)
+ γ ID_Formation ; COUNT(CNE) → Nombre_Etudiants (Etudiant)
- τ ID_Formation ; COUNT(CNE) (Etudiant)
= Examen 2025 : γ = regroupement.

? La jointure naturelle :
- combine deux relations sans condition
+ fusionne automatiquement les relations en utilisant toutes les colonnes communes
- sélectionne uniquement les lignes identiques
= Examen 2025.

? Quelle jointure retourne uniquement les lignes avec correspondance dans les deux tables ?
- LEFT JOIN
- FULL OUTER JOIN
+ INNER JOIN
- CROSS JOIN
= Examen 2025.

? Dans ÉTUDIANT ⟕ FORMATION, Omar (formation 5 inexistante) :
+ apparaît, avec NULL dans les colonnes de FORMATION
- disparaît
- provoque une erreur
= C'est le rôle de la jointure externe gauche.

? L'équi-jointure, par rapport à la jointure naturelle :
- supprime les colonnes communes
+ conserve les colonnes de jointure en double
- accepte la condition <
= Seule la naturelle fusionne les colonnes communes.

? Quelle question appelle une division ?
- Les auteurs ayant écrit au moins un livre
+ Les auteurs ayant écrit tous les livres de Gallimard
- Le nombre de livres par auteur
= Le mot « tous » signale la division.

? AVG(Age) pour F1 = {21, 20, 23} vaut :
+ 21.33
- 21
- 64
= 64 / 3 ≈ 21,33.

? Le tri τ en algèbre relationnelle :
- est une opération fondamentale
+ est une extension, car une relation est un ensemble non ordonné
- n'existe pas en SQL
= C'est le « bonus » de la séance 5.
```

---
id: bdd-merise-mcd
titre: Bases de données, SGBD et MCD Merise
seance: Séances 1 et 2 · 9 et 17 mars 2026
importance: 4
---

## Avant de commencer

Aucun prérequis technique : il faut juste savoir lire un tableau (lignes, colonnes) et une phrase de règle métier (« un étudiant s'inscrit à une seule formation »).

```exercice Vérifie ton prérequis
? Dans un tableau « Clients » avec les colonnes ID, Nom, Email, que représente une ligne ?
= Un client précis (un enregistrement). Les colonnes sont ses caractéristiques (attributs). C'est exactement le vocabulaire d'une table relationnelle.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « règles de gestion » avant de dessiner.** Un MCD n'est que la traduction graphique de phrases métier. Si les phrases sont claires, les cardinalités tombent toutes seules.

> [!piege] Lire les cardinalités du mauvais côté. En Merise, la cardinalité écrite **près d'une entité** dit combien de fois **une occurrence de cette entité** participe à l'association. « Étudiant 1,1 — Inscrit — 0,N Formation » : un étudiant a exactement une formation.

À la fin, tu sais définir BDD / SGBD / SGBDR, construire un dictionnaire des données, écrire des dépendances fonctionnelles et dessiner un MCD avec ses cardinalités.

## Idée 1 · BDD, SGBD, SGBDR : trois mots à ne pas mélanger

```flux De la donnée à l'utilisateur
Données (tables) -> SGBD (MySQL, Oracle…) -> Requêtes SQL -> Utilisateur / application
```

- **BDD** : ensemble **structuré** et **organisé** d'informations stockées électroniquement (le prof abrège « BDD »).
- **SGBD** : le **logiciel** qui crée, gère et manipule la base (intégrité, sécurité, accès concurrents, performances).
- **SGBDR** : SGBD fondé sur le **modèle relationnel** : tables (relations), lignes (enregistrements, tuples), colonnes (attributs), reliées par des **clés**.

Exemples cités par le prof : MySQL (racheté par Oracle ; alternative libre **MariaDB**), Oracle Database (grandes entreprises), PostgreSQL, SQL Server (Microsoft), **SQLite** (léger, sans serveur, un seul fichier : c'est lui qui exécute les exemples de ce module).

> [!prof] Les bases de données ont été créées pour corriger les défauts des fichiers : perte de données, accès difficile, **redondance et incohérence**, manque de sécurité.

## Idée 2 · Merise : trois niveaux, du papier au serveur

```etapes Les trois niveaux de Merise
Conceptuel (MCD) :: Entités, associations, cardinalités. Indépendant de toute technologie.
Logique (MLD) :: Relations avec clés primaires et clés étrangères, prêtes pour un SGBD relationnel.
Physique (MPD) :: Les scripts SQL réels (CREATE TABLE…) pour un SGBD précis, plus l'optimisation (index…).
```

Merise (années 1970, Hubert Tardieu, popularisée dans les années 1980) sépare **données** et **traitements**. Un **système d'information** (SI) a quatre fonctions : collecter, mémoriser, traiter, diffuser l'information. Un SI peut exister sans informatique (registres papier).

## Idée 3 · Règles de gestion et dictionnaire des données

Étapes pour construire un MCD : règles de gestion → dictionnaire des données → dépendances fonctionnelles → entités → associations → cardinalités.

Le **dictionnaire des données** liste chaque donnée avec : code mnémonique, désignation, type (**A** alphabétique, **N** numérique, **AN** alphanumérique, Date, Booléen), taille, remarques.

| Code | Désignation | Type | Taille |
|---|---|---|---|
| id_etudiant | Identifiant de l'étudiant | N | |
| nom_etudiant | Nom de l'étudiant | A | 30 |
| tel_etudiant | Téléphone | **AN** | 15 |
| date_naissance | Date de naissance | Date | 10 |

> [!retenir] Les données doivent être **élémentaires** : pas de donnée calculée (l'âge se calcule depuis la date de naissance), pas de donnée composée. Un numéro qui ne sert jamais à calculer (téléphone, CIN) est de type **AN**, pas N.

> [!attention] Une diapo écrit le format de date « AAAA-JJ-MM ». Le bon format (MySQL, et le reste du cours) est **AAAA-MM-JJ** : 10 caractères dans les deux cas.

## Idée 4 · Les dépendances fonctionnelles (DF)

P1 → P2 : une valeur de P1 détermine **une seule** valeur de P2. P1 est la **source**, P2 la **cible** (ou but).

Exemple du cours : `id_etudiant → nom, prénom, date_naissance` ; `id_etudiant, id_cours → date_inscription, statut, note`.

- **Élémentaire** : toute la source est nécessaire. Si P1 → P3, alors {P1, P2} → P3 n'est pas élémentaire.
- **Directe** : pas obtenue par transitivité. Si P1 → P2 et P2 → P3, alors P1 → P3 est transitive (non directe).

## Idée 5 · Entités, associations, cardinalités

```html
<svg viewBox="0 0 600 150" style="width:100%;max-width:600px;display:block;margin:10px auto" role="img" aria-label="MCD : l'entité Étudiant (1,1) est reliée par l'association Inscrit à l'entité Formation (0,N)">
<g font-family="sans-serif" font-size="13" fill="currentColor">
<rect x="20" y="30" width="150" height="95" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="20" y1="55" x2="170" y2="55" stroke="currentColor"/>
<text x="95" y="48" text-anchor="middle" font-weight="700">ÉTUDIANT</text>
<text x="30" y="75" text-decoration="underline">num_etu</text><text x="30" y="93">nom, prénom</text><text x="30" y="111">email</text>
<rect x="430" y="30" width="150" height="75" fill="none" stroke="currentColor" stroke-width="2"/>
<line x1="430" y1="55" x2="580" y2="55" stroke="currentColor"/>
<text x="505" y="48" text-anchor="middle" font-weight="700">FORMATION</text>
<text x="440" y="75" text-decoration="underline">code_formation</text><text x="440" y="93">intitulé</text>
<ellipse cx="300" cy="65" rx="60" ry="26" fill="none" stroke="#D9824F" stroke-width="2"/>
<text x="300" y="70" text-anchor="middle" fill="#D9824F" font-weight="700">Inscrit</text>
<line x1="170" y1="65" x2="240" y2="65" stroke="currentColor" stroke-width="2"/><line x1="360" y1="65" x2="430" y2="65" stroke="currentColor" stroke-width="2"/>
<text x="205" y="55" text-anchor="middle" fill="#D9824F" font-weight="700">1,1</text><text x="395" y="55" text-anchor="middle" fill="#D9824F" font-weight="700">0,N</text>
</g></svg>
```

- **Entité** : objet du monde réel, avec un **identifiant** unique (souligné) source des DF vers tous ses attributs.
- **Association** : lien sémantique, nommé par un verbe (Inscrit, Enseigne). Elle peut **porter des données** (date d'inscription, statut) ; elle est alors identifiée par la concaténation des identifiants des entités liées.
- **Cardinalité** (min, max) : 0,1 · 1,1 · 0,N · 1,N.

Lecture du schéma : un étudiant est inscrit dans **une et une seule** formation (1,1) ; une formation regroupe **zéro ou plusieurs** étudiants (0,N).

> [!retenir] Un MCD n'est valide que si **toute entité est reliée à au moins une association**.

> [!attention] Deux incohérences dans les diapos de la séance 2 :
> 1. « Association Enseigner entre Enseignant **et Enseignant** … (1,1) côté Matière » alors que la règle dit qu'une matière peut être enseignée par **un ou plusieurs** enseignants. Correction : Enseigner relie Enseignant et Matière, avec **1,N des deux côtés**.
> 2. Les règles disent « chaque cours appartient à une seule formation », mais le MCD final met (1,N – 1,N) entre Formation et Cours. Dans ce module on suit le **MCD final** (un cours peut être dans plusieurs formations), comme le MLD de la séance 3.

## S'exercer

```exercice Exercices types (TD1 et examen)
? (TD1, bibliothèque) Donne les cardinalités de « Auteur rédige Livre » sachant qu'un auteur rédige un ou plusieurs livres et qu'un livre peut être rédigé par un ou plusieurs auteurs.
= Auteur (1,N) — rédige — (1,N) Livre. Les deux côtés ont un maximum N : c'est une association « plusieurs à plusieurs », qui deviendra une table au MLD.

? (TD1) « Un exemplaire est directement associé à un livre ; un livre peut avoir plusieurs exemplaires. » Cardinalités de Livre — possède — Exemplaire ?
= Exemplaire (1,1) : un exemplaire correspond à exactement un livre. Livre (1,N) (ou 0,N si on accepte un livre sans exemplaire, choix à justifier).

? Dans Commande(num_cmd, client_id, produit_id, quantite), quelle DF détermine la quantité ? Est-elle élémentaire ?
= {num_cmd, produit_id} → quantite (une commande peut contenir plusieurs produits). Elle est élémentaire si ni num_cmd seul ni produit_id seul ne détermine la quantité.
```

## Flashcards

```cartes
SGBD :: Logiciel qui crée, gère et manipule une base de données (intégrité, sécurité, accès concurrents).
SGBDR :: SGBD fondé sur le modèle relationnel : tables, lignes, colonnes, clés.
Les trois niveaux de Merise :: Conceptuel (MCD), logique (MLD), physique (MPD).
Notation P1 → P2 :: P1 détermine de manière unique P2 (dépendance fonctionnelle ; P1 source, P2 cible).
DF élémentaire :: Toute la source est nécessaire pour déterminer la cible.
DF directe :: Elle n'est pas obtenue par transitivité.
Type d'un numéro de téléphone dans le dictionnaire :: AN (alphanumérique) : on ne calcule jamais dessus.
Condition de validité d'un MCD :: Toute entité doit être reliée à au moins une association.
```

## QCM du chapitre

```qcm
? Que signifie la notation P1 → P2 ?
- P2 détermine P1 de manière unique
+ P1 détermine P2 de manière unique
- P1 et P2 sont indépendants
- P1 et P2 sont équivalents
= Question tombée à l'examen 2025. La flèche va de la source (déterminant) vers la cible.

? Une dépendance fonctionnelle est élémentaire quand :
- elle ne contient qu'un seul attribut source
+ l'intégralité de la source est nécessaire pour déterminer le but
- elle est obtenue par transitivité
- elle contient plusieurs attributs buts
= Question d'examen 2025. Une source composée peut être élémentaire si aucune partie seule ne suffit.

? Pour qu'un MCD soit valide :
- chaque entité doit avoir au moins 5 attributs
+ toute entité doit être reliée à au moins une association
- chaque association relie exactement 2 entités
- toutes les cardinalités valent (1,1)
= Règle de la séance 2, reprise à l'examen 2025.

? Quel logiciel est un SGBD léger, sans serveur, stocké dans un seul fichier ?
- Oracle Database
- SQL Server
+ SQLite
- MySQL
= SQLite est embarqué (applis mobiles, logiciels de bureau).

? Quel type donner à un numéro de CIN dans le dictionnaire des données ?
- N
- A
+ AN
- Booléen
= Il contient lettres et chiffres et on ne calcule pas dessus.

? Pourquoi ne stocke-t-on pas l'âge d'un étudiant ?
- C'est une donnée confidentielle
+ C'est une donnée calculée à partir de la date de naissance
- MySQL ne connaît pas les entiers
= Les données du MCD doivent être élémentaires, non calculées.

? « Étudiant 1,1 — Inscrit — 0,N Formation » signifie :
+ un étudiant est inscrit dans exactement une formation
- une formation a exactement un étudiant
- un étudiant peut n'avoir aucune formation
= La cardinalité près d'Étudiant décrit la participation d'un étudiant.

? Si P1 → P2 et P2 → P3, alors P1 → P3 est :
- élémentaire
+ transitive (non directe)
- impossible
= C'est la définition d'une DF non directe.

? Le niveau qui contient les scripts CREATE TABLE est :
- le MCD
- le MLD
+ le MPD
= Le niveau physique dépend du SGBD choisi.

? Une association porteuse de données Inscrit(Étudiant, Cours) est identifiée par :
- la date d'inscription
+ le couple (id_cours, id_etudiant)
- l'identifiant du cours seul
= Concaténation des identifiants des entités reliées.
```

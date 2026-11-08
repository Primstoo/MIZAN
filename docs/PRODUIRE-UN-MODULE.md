# Produire un module de cours ToumaiLearn

Chaîne de production : **supports du prof (PDF, TP) → sources Markdown → page du module + QCM + suivi → en ligne**.

```
content/sources/<slug>/
├── module.json          titre, prof, semestre, ordre des chapitres
├── 01-xxx.md            un fichier par chapitre (≈ une séance)
└── ...
        │  npm run module -- <slug>        (scripts/construire-module.mjs)
        ▼
content/modules/<fichier>.html   page autonome (cours, QCM, tuteur), servie dans l'iframe
src/lib/modules-sources.json     catalogue : le module apparaît dans l'appli
src/lib/notions.json   [slug]    chapitres → maîtrise, page Progrès
src/lib/banque.json    [slug]    tous les QCM → examen blanc de la plateforme
src/lib/niveau.json    [slug]    8 QCM (un par chapitre important) → test de niveau
```

Aucune modification de `modules.ts`, `maitrise.ts` ou `parcours.ts` n'est nécessaire : un module des sources est pris en compte automatiquement.

## Les 6 étapes

1. **Lire les supports** : extraire le texte des PDF (`pdftotext -layout`), repérer le plan de chaque séance, les exemples et **les erreurs des diapos**.
2. **Écrire les sources** dans `content/sources/<slug>/` (format ci-dessous). Un chapitre par séance, plus un chapitre « TP corrigés » et un chapitre « Révision + examen blanc ».
3. **Vérifier le code** : `npm run verifier-module -- <slug>`. Chaque bloc ```python``` est exécuté, et sa sortie doit être **identique** au bloc ```sortie``` qui le suit. Rien ne part en ligne tant que ce n'est pas « TOUT EST BON ».
4. **Construire** : `npm run module -- <slug>`.
5. **Contrôler le rendu** : ouvrir `content/modules/<fichier>.html` dans un navigateur (ordinateur et téléphone), faire un QCM.
6. **Publier** : `npm run build` puis commit sur `main` (règle D10 : en français, au nom du développeur, sans mention de l'IA). Vercel déploie automatiquement.

## `module.json`

```json
{
  "titre": "Traitement et analyse des données",
  "prof": "Pr Y. Madani",
  "semestre": "S5",
  "etablissement": "FSABM",
  "fichier": "traitement-ad.html",
  "cle": "tad_scores",
  "resume": "Une phrase affichée sur la carte du module.",
  "conventions": "Consignes données au tuteur IA (notations du prof, contexte).",
  "intro": "Texte Markdown de la page « Avant de commencer » (facultatif).",
  "chapitres": ["01-fonctions.md", "02-numpy.md"]
}
```

Champs facultatifs :

| Champ | Rôle |
|---|---|
| `notions` | `[{"id", "t", "imp", "chapitre"}]` : suivi fin par notion (tableau de bord, page Progrès, test de niveau). Sans ce champ, une notion = un chapitre. |
| `progression` | `"essais"` (par défaut si `notions` : 3 essais et 80 % sur les 5 derniers), `"score10"` (score de l'évaluation de chaque chapitre), `"pc"` (pourcentage par chapitre, ancien Crypto) ou `"best"` (meilleur score par notion, ancien Probas). |
| `maths` | `true` : formules `$...$` et `$$...$$` rendues par MathJax (protégées du Markdown). |
| `cleEtat` | clé des essais et des flashcards si elle diffère de `cle` |
| `cartes` | réglage des boîtes de flashcards d'un ancien module : `{"champ", "intervalles", "echec", "depart"}` |
| `css` | fichier CSS propre au module (styles des schémas). |
| `annexes` | `[{"fichier", "titre"}]` : pages complémentaires accessibles depuis le menu (ex. anciens outils interactifs). |
| `tuteurId`, `clesSupplementaires` | reprise de l'historique du tuteur et d'autres données d'un ancien module. |

`cle` est facultatif (par défaut `<slug>_scores`) : c'est la clé où la progression est enregistrée. **Ne jamais la changer** une fois le module en ligne, sinon les élèves perdent leurs scores.

## Format d'un chapitre

```markdown
---
id: numpy-tableaux            (identifiant stable : ne plus le changer une fois publié)
titre: NumPy (1) · créer et indexer des tableaux
seance: Séance 2 · 5 octobre 2026
importance: 5                 (1 à 5 : priorité dans la mission du jour et le test de niveau)
---

Texte Markdown normal : titres ##, tableaux, **gras**, `code`...
```

### Blocs spéciaux

| Bloc | Sert à | Syntaxe |
|---|---|---|
| ```` ```python ```` | exemple exécuté par le vérificateur | code normal |
| ```` ```python nontest ```` | exemple **non** exécuté (erreur volontaire, `input()`, fichier absent) | |
| ```` ```sortie ```` | ce que le bloc python précédent affiche (vérifié) | texte exact |
| ```` ```grille Titre ```` | dessiner un tableau/matrice avec cases colorées | une ligne par rangée ; `*x` orange, `!x` bleu, `~x` grisé ; `#cols:` et `#rows:` pour les étiquettes |
| ```` ```flux Titre ```` | schéma en chaîne | `A -> B -> C` |
| ```` ```etapes Titre ```` | explication pas à pas (boutons suivant / précédent) | `Titre de l'étape :: contenu` (une ligne par étape) |
| ```` ```qcm ```` | QCM noté (chapitre maîtrisé à 8/10) | voir ci-dessous |
| ```` ```cartes ```` | flashcards ajoutées à la révision espacée (menu « Flashcards ») | `{notion} Question :: Réponse`, une par ligne (`\n` pour aller à la ligne) |
| ```` ```exercice Titre ```` | exercice avec indice et corrigé ; l'élève se note | `? {notion} Énoncé`, puis `indice: ...` (facultatif), puis `= corrigé` (peut continuer sur plusieurs lignes). Avec `reponse: 6` (ou `reponse: A | B`, ou `reponse: 0.038 ~0.003` pour une tolérance), la réponse est saisie et vérifiée automatiquement |
| ```` ```html ```` | HTML brut (schéma SVG, tableau spécial) | |
| ```` ```outil ```` | petit outil interactif : HTML + `<script>` exécuté à l'ouverture du chapitre | |
| `> [!piege]` | encadré rouge « Piège » | aussi `[!astuce]`, `[!retenir]`, `[!prof]`, `[!attention]` |

`{notion}` (dans les QCM, cartes et exercices) rattache l'élément à une notion déclarée dans `module.json`. Sans notion déclarée, l'élément compte pour le chapitre.

QCM :

```
? Question (Markdown en ligne accepté)
- mauvaise réponse
+ bonne réponse            (une seule « + »)
- mauvaise réponse
= Explication affichée après la réponse.
```

Viser **10 à 12 QCM par chapitre**, avec au moins 3 options : ils alimentent aussi l'examen blanc et le test de niveau de la plateforme.

## Règles de qualité

- **Fidélité** : tout vient des supports du prof. Ce qui est ajouté ou supposé est signalé (`[!attention]`).
- **Erreurs des diapos** : les signaler dans un encadré `[!attention]` ou `[!piege]`, avec la correction.
- **Illustrer chaque notion visuelle** (indexation, axes, masques, fusion, groupby) par une `grille`, un `flux` ou des `etapes`.
- **Versions** : préciser quand le comportement change selon la version (ex. `applymap` supprimé en Pandas 3).
- Exemples en contexte marocain quand le prof en utilise (DH, villes, FSABM).
- Les supports du prof ne sont **pas** publiés tels quels (droit d'auteur) : on publie notre propre rédaction.

## Migrer un ancien module

`scripts/migration/convertir-ancien-module.cjs <slug>` (un adaptateur par module, à lancer avec Playwright) lit l'ancien HTML (renommé `<nom>-outils.html`) et écrit ses sources : cours d'origine, notions, QCM, flashcards (même emplacement de sauvegarde grâce à `{notion@n}`), TD/TP. La progression des élèves est conservée (même clé, même format). L'ancien fichier reste accessible dans le menu pour les outils non encore portés.

## Modules existants

| slug | Sources | Remarque |
|---|---|---|
| `traitement-ad` | `content/sources/traitement-ad` | 8 chapitres, 83 QCM, Pr Madani, S5 |
| `reseaux-m351` | `content/sources/reseaux-m351` (migré) | 43 notions, 132 QCM, 152 flashcards, 126 exercices ; outils dans `reseaux-M351-outils.html` |
| `archi` | `content/sources/archi` (migré) | 26 notions, 62 QCM, 71 flashcards, 64 exercices ; outils dans `archi-ordinateurs-outils.html` |
| `crypto` | `content/sources/crypto` (migré) | 11 chapitres, 37 QCM, 54 réponses courtes vérifiées, 86 flashcards ; labos dans `crypto-farchane-outils.html` |
| `probas` | `content/sources/probas` (migré) | 21 notions + exercices-types + annales, formules MathJax, 32 QCM, 55 réponses numériques, 63 flashcards ; calculs générés et examen blanc dans `probas-S3-outils.html` |
| `uml` | `content/sources/uml` (migré) | 7 chapitres + exercices/TD/TP/méthode/examen, 55 diagrammes figés en SVG, 68 QCM, 43 flashcards, 16 questions de cours ; ancienne page dans `uml-outils.html` |

Tous les modules passent désormais par le générateur : `scripts/extraire-notions.cjs` (ancien système) a été supprimé.

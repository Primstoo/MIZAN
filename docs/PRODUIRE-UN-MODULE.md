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
| `> [!piege]` | encadré rouge « Piège » | aussi `[!astuce]`, `[!retenir]`, `[!prof]`, `[!attention]` |

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

## Modules existants

| slug | Sources | Remarque |
|---|---|---|
| `traitement-ad` | `content/sources/traitement-ad` | 8 chapitres, 83 QCM, Pr Madani, S5 |
| `reseaux-m351`, `crypto`, `archi`, `uml`, `probas` | HTML écrits à la main | catalogue dans `MANUELS` (`src/lib/modules.ts`), notions via `scripts/extraire-notions.cjs` |

# Journal des décisions techniques de MIZAN

Chaque choix : ce qu'on a pris, les alternatives, et pourquoi on les a écartées. Contexte commun à tous les choix : budget 0 DH au départ, un seul développeur étudiant (avec un job), pilote avec 5 à 10 étudiants, puis montée en charge possible.

---

## D1. Framework web : Next.js 14 (App Router, TypeScript)
**Alternatives :** React seul (Vite), SvelteKit, Nuxt (Vue), Django ou Laravel, Flutter Web.
**Pourquoi Next.js :**
- Front et back dans le même projet : les routes API (tuteur, quotas) vivent à côté des pages, sans serveur séparé à gérer.
- Rendu serveur : la page d'accueil est indexée par Google (important pour attirer des étudiants plus tard).
- Écosystème le plus large et le plus demandé dans les offres d'emploi (avantage CV).
- TypeScript détecte les erreurs avant la mise en ligne.
**Pourquoi pas les autres :**
- React + Vite : il faudrait un backend à part pour cacher les clés d'IA.
- SvelteKit / Nuxt : très bons, mais moins de ressources et moins demandés au Maroc.
- Django / Laravel : imposent un serveur permanent, donc un hébergement plus complexe et rarement gratuit.
- Flutter Web : lourd à charger sur un téléphone d'entrée de gamme, et mal référencé.
**Version 14 plutôt que 15 :** plus ancienne et stable, mieux documentée ; on pourra migrer plus tard.

## D2. Base de données + comptes : Supabase
**Alternatives :** Firebase (Google), PocketBase, Appwrite, MongoDB Atlas + auth maison, Postgres sur un VPS.
**Pourquoi Supabase :**
- Tout-en-un gratuit : base Postgres, authentification (Google, lien magique), règles de sécurité.
- Postgres = SQL standard (vu en cours) : compétence transférable, pas de verrouillage.
- Row Level Security : la base elle-même empêche un élève de lire les données d'un autre.
**Pourquoi pas les autres :**
- Firebase : base NoSQL propriétaire (Firestore), plus difficile à interroger pour des statistiques (« quels modules sont les plus utilisés ? »), et migration de sortie pénible.
- PocketBase / Postgres sur VPS : il faut louer et maintenir un serveur (sauvegardes, sécurité), donc du coût et du temps.
- Appwrite : comparable, mais communauté plus petite.
- Auth maison : risque de sécurité (stocker des mots de passe soi-même est une erreur classique).
**Limites connues :** l'offre gratuite met le projet en pause après environ une semaine sans activité (on le relance en un clic) et limite le nombre de projets. Acceptable pour le pilote.

## D3. Hébergement : Vercel
**Alternatives :** Netlify, Cloudflare Pages, Render, Railway, GitHub Pages.
**Pourquoi Vercel :** créé par les auteurs de Next.js, donc compatibilité totale ; déploiement automatique à chaque `git push` ; gratuit ; HTTPS automatique.
**Pourquoi pas les autres :**
- GitHub Pages : uniquement des pages statiques, donc pas de routes API (impossible de cacher la clé du tuteur).
- Netlify / Cloudflare Pages : possibles, mais certaines fonctions de Next.js y demandent des réglages en plus.
- Render / Railway : serveurs qui s'endorment ou crédits limités en gratuit.
**⚠️ Point de vigilance :** l'offre gratuite de Vercel (Hobby) est réservée à un usage **non commercial**. Pour le pilote gratuit, c'est conforme. Dès qu'on encaisse de l'argent : passer au plan payant (environ 20 $/mois) ou migrer vers Cloudflare Pages / Netlify. À revérifier au moment de monétiser.

## D4. Connexion : Google + lien magique par e-mail (pas de mot de passe)
**Alternatives :** e-mail + mot de passe, numéro de téléphone (SMS), sans compte du tout.
**Pourquoi :**
- Aucun mot de passe à retenir ni à protéger (moins de support, moins de risques de fuite).
- Presque tous les étudiants ont un compte Google sur leur téléphone : un clic.
- Le lien magique couvre ceux qui n'ont pas de Google.
**Pourquoi pas les autres :**
- Mot de passe : oublis fréquents, réinitialisations, sécurité à gérer.
- SMS : payant par message.
- Sans compte : la progression ne suivrait pas l'élève entre téléphone et PC, ce qui est l'objectif même de la version B.
**Limite :** l'envoi d'e-mails intégré de Supabase est plafonné à quelques messages par heure (et réservé à l'équipe du projet). Il faut un SMTP : Gmail en attendant, Resend une fois le domaine acheté.
**État au 31/10/2026 :** la connexion Google n'est pas encore configurée (réglage Google Cloud à faire) ; la connexion se fait par e-mail, avec lien ou code à 6 chiffres. Le code évite le piège du lien ouvert dans le navigateur intégré de Gmail.

## D5. Intégrer les modules tels quels dans des iframes
**Alternatives :** réécrire chaque module en composants React ; convertir le contenu en données (JSON) affichées par un moteur commun.
**Pourquoi l'iframe :**
- Les 6 modules existent déjà et fonctionnent. Les réécrire prendrait plusieurs semaines.
- L'iframe isole chaque module : un bug dans un module ne casse pas le reste du site.
- Un petit script « pont » leur donne accès au compte et au tuteur sans les réécrire.
**Pourquoi pas les autres (pour l'instant) :**
- Réécriture React : la solution propre à long terme, mais trop lente pour le pilote.
- Moteur JSON commun : c'est la cible pour générer des modules automatiquement (vision MIZAN), mais ça demande d'abord de stabiliser le format.
**Plan :** iframe maintenant ; convertir progressivement vers un format commun quand on saura quels types d'exercices plaisent le plus.

## D6. Stocker la progression en JSON (jsonb) par module
**Alternatives :** une table par type de donnée (scores, réponses, failles…).
**Pourquoi jsonb :** chaque module a sa propre structure de progression. Un champ JSON accepte toutes les structures sans modifier la base à chaque module.
**Inconvénient accepté :** statistiques fines un peu plus compliquées. On créera des tables dédiées quand on saura quoi mesurer.

## D7. Région des serveurs : Europe (projet créé en Irlande, eu-west-1)
**Alternatives :** États-Unis, Asie.
**Pourquoi :** Supabase ne propose pas de serveurs en Afrique. L'Europe de l'Ouest est la plus proche du Maroc, donc les pages répondent plus vite. L'Irlande ajoute quelques dizaines de millisecondes par rapport à Paris : négligeable, pas de raison de recréer le projet.

## D8. Tuteur : Gemini Flash, Groq en secours, appelés côté serveur
**Alternatives :** l'API Claude ou OpenAI (payantes) ; un modèle libre auto-hébergé ; appeler l'IA directement depuis le navigateur.
**Pourquoi :** offres gratuites suffisantes pour le pilote ; un deuxième fournisseur garantit que le tuteur répond même si un quota est épuisé.
**Pourquoi pas les autres :** API payantes sans revenus ; auto-hébergement = serveur avec carte graphique, hors budget ; appel depuis le navigateur = clé volable par n'importe qui.
**Côté serveur obligatoire :** la clé reste dans les variables d'environnement de Vercel, jamais dans le code ni dans le navigateur.
**Modèles (31/10/2026) :** Gemini 3.1 Flash-Lite d'abord (le plus rapide), puis l'alias « dernier Flash », puis Groq gpt-oss-120b et gpt-oss-20b. Réflexion interne désactivée, délai de 15 s par modèle, réponse envoyée en continu (mot à mot). Les modèles gratuits sont souvent retirés (gemini-2.5-flash fermé le 16/10/2026, llama-3.3-70b le 16/08/2026) : liste réglable par `GEMINI_MODEL` et `GROQ_MODEL` sans toucher au code.
**À revérifier :** les conditions des offres gratuites changent souvent, et certaines autorisent le fournisseur à utiliser les requêtes gratuites pour entraîner ses modèles. Ne jamais envoyer de données personnelles au tuteur.

## D9. Dépôt GitHub privé
**Alternative :** public (bon pour le CV).
**Pourquoi privé pour l'instant :** les modules contiennent des énoncés de TD et des extraits de cours des professeurs (droit d'auteur). Plus tard : séparer le code (public, vitrine CV) du contenu des cours (privé ou stocké dans Supabase).

## D10. Commits au nom du développeur, sans mention automatique de l'IA
Choix de présentation, assumé : le développeur pilote le projet (vision, cahier des charges, tests, décisions) et utilise l'IA comme outil. En entretien, il présente honnêtement cet usage (voir NOTES.md).

## D11. Un tuteur commun, en bouton flottant, pour tous les modules (`tutor/mizan-tutor.js`)
**Alternatives :** garder un tuteur différent par module ; un onglet « Tuteur » séparé (comme dans le module Réseaux d'origine).
**Pourquoi :**
- Un seul code à maintenir : une amélioration du tuteur profite à tous les modules.
- Le bouton est disponible sur chaque section, sans changer d'onglet ; l'extrait envoyé au tuteur est la section que l'élève lit (ou l'exercice de TD qu'il a ouvert).
- Reprend les fonctions du tuteur Réseaux : mémoire des difficultés (ligne MÉMO cachée), photo du brouillon, bouton Arrêter, relances rapides, historique consultable avec recherche.
**Économie :** modèle rapide par défaut avec réponses explicatives (150-250 mots) ; modèle supérieur seulement à la demande (case « Approfondi » ou bouton « Approfondir cette réponse »), avec plus de contexte.
**Pourquoi pas un onglet séparé :** il oblige à quitter le cours et à re-choisir manuellement l'extrait ; l'élève pose moins de questions.

## D12. Modules servis derrière la connexion (`content/modules` + `/app/modules/[file]`)
**Avant :** fichiers dans `public/modules`, donc lisibles par n'importe qui sans compte (fuite du contenu des profs).
**Maintenant :** fichiers hors de `public`, lus par une route serveur qui vérifie la session et injecte `mizan-bridge.js`.
**Alternative écartée :** stocker les modules dans Supabase Storage (plus de complexité pour 6 fichiers).

## D13. Progression : synchronisation du localStorage par la page parente
**Pourquoi :** les modules sauvegardent déjà dans le localStorage ; l'iframe est sur le même domaine, donc la page parente (`ModuleFrame`) lit et écrit ces mêmes clés. Aucun module à réécrire.
**Fonctionnement :** au chargement, la sauvegarde Supabase est posée si elle est plus récente, puis le module s'affiche ; envoi toutes les 20 s, à la mise en arrière-plan et à la fermeture. Clés listées dans `modules.ts` (`cles`).
**Alternative écartée :** réécrire chaque module pour appeler Supabase (6 modules à modifier et à maintenir).
**Limite :** dernier écrit gagne si deux appareils sont ouverts en même temps.

## D14. Pont `window.claude` (`public/mizan-bridge.js`)
Les modules utilisent l'interface des artifacts Claude. Hors de Claude, le pont fournit `sample` (appelle `/api/tutor`) et renvoie `null` pour `db`/`user`, ce qui active le repli localStorage déjà prévu dans les modules.

## D15. Bêta fermée sur invitation (codes de parrainage)
**Alternatives :** inscription libre ; liste d'e-mails autorisés tenue à la main.
**Pourquoi :** les quotas gratuits de l'IA sont limités, et le contenu des profs ne doit pas circuler hors du groupe test. Les codes (3 places par membre, 10 pour l'admin) font grandir le groupe par le bouche-à-oreille, et la page Suivi montre qui a invité qui.
**Pourquoi pas une liste d'e-mails :** chaque entrée passerait par l'admin, donc pas de croissance sans lui.
**Mise en place :** `members` et `invites` (schema.sql), vérification dans `/app` (layout), `/app/modules/[file]` et `/api/tutor`. Admins : variable `ADMIN_EMAILS`.

## D16. Page de suivi admin (`/app/admin`)
Membres, actifs sur 7 jours, questions au tuteur, usage par module. Ce sont les chiffres qui diront si une offre payante a du sens (seuil de décision du plan commercial).

## D17. Retour aux maquettes « Mizan Écrans » : parcours guidé + live
**Constat :** la plateforme était un simple conteneur de modules, loin des maquettes validées (date d'examen, mission du jour, live).
**Fait :** inscription guidée (prénom, modules, dates d'examen, temps par jour) ; page Aujourd'hui (mission du jour sur le module dont l'examen est le plus proche, compte à rebours, série de jours, semaine) ; Modules ; Live (réservation, paiement validé à la main par l'admin, lien visible 30 min avant pour les payés) ; Moi. Navigation en bas sur téléphone.
**Série :** un trigger Postgres inscrit le jour de révision à chaque synchronisation de progression (aucun changement dans les modules).
**Pas encore :** test de niveau, barres de maîtrise par chapitre, points faibles et examen blanc côté plateforme. Ils exigent que les modules exposent leurs scores dans un format commun (prochaine étape : un message standard module → plateforme). Bot Telegram plus tard.
**Paiement :** manuel (CashPlus, virement…) avec validation admin, comme prévu dans la maquette. Instructions dans la variable `LIVE_PAIEMENT_INFO`. Un paiement en ligne (CMI) demande une entreprise enregistrée.

## D18. Dates d'examen inconnues : estimation, puis date commune
**Problème :** la plupart des profs n'annoncent pas la date exacte en début de semestre.
**Solution :** case « Date pas encore annoncée » → estimation fin de semestre (impairs : mi-janvier, pairs : mi-juin), affichée « ≈ » et « estimée ». L'admin renseigne une date commune par module dès qu'elle est connue ; elle remplace l'estimation chez tous ceux qui n'avaient pas de date.
**Alternatives écartées :** date obligatoire (l'élève invente) ; pas de date (plus de mission du jour ni de compte à rebours).

## D19. Explications illustrées intégrées au cours (fin du module « Couches 1 à 3 »)
Les explications « en clair » des couches 1 à 3 ne sont pas un sujet à part : elles sont désormais en tête des sections 11, 12 et 13 du cours Réseaux (« Comprendre, en clair », puis « La fiche du cours »). L'onglet Comprendre et le module séparé « Réseaux : couches 1 à 3 » sont supprimés. Règle pour tous les modules : une notion = son explication illustrée + sa fiche, au même endroit.

## D20. Règle « explication + fiche au même endroit » appliquée à tous les modules
- Réseaux : sections 1 à 14 (calculateurs maillage, téléchargement, segmentation ; jeu des champs d'en-tête).
- Probas : bloc « Comprendre, en clair » en tête des 21 notions (analogie, schéma, piège, 3 questions).
- UML : en tête des 7 chapitres, un diagramme complet par type, fil rouge « bibliothèque de la fac ».
- Crypto : les leçons « Étape 1 · Comprendre » existaient déjà ; ajout de schémas (Alice/Bob/Oscar, César, Vigenère, LFSR, ECB/CBC, Feistel).
- Archi : déjà conforme (parcours visuel + fiche complète dans chaque leçon), inchangé.

## D21. Audit qualité du 31/10/2026
Relecture complète du code, test de chaque écran sur téléphone et ordinateur (copie locale avec base factice), contrôle des 5 modules (erreurs, débordements sur mobile). Corrections : police des boutons, textes trompeurs (« réservé 24 h », « onglet Comprendre »), redirection ouverte supprimée, validations côté serveur (live, dates, statuts), code d'invitation non consommé si déjà membre, pages d'erreur et 404 en français, icône et installation sur téléphone, tableaux admin lisibles sur mobile, débordements horizontaux des modules Réseaux, Crypto et UML.

## D22. Maîtrise et points faibles sans modifier les modules
**Problème :** chaque module range sa progression à sa façon (essais par notion, meilleur score, pourcentage par thème, note sur 10 par chapitre).
**Solution :** la plateforme lit la progression déjà synchronisée et la traduit par un petit adaptateur par module (`src/lib/maitrise.ts`) vers un format commun : maîtrisée / fragile / jamais testée. Le catalogue des notions est extrait automatiquement des modules (`scripts/extraire-notions.cjs` → `src/lib/notions.json`).
**Utilisé par :** page « Ma progression » (maîtrise par chapitre, points faibles), cartes des modules, mission du jour (elle commence par les notions ratées, puis les notions importantes jamais testées).
**Alternative écartée :** modifier les 5 modules pour qu'ils envoient leurs scores (plus de code à maintenir, risque de casser les modules).
**Limite :** si un module change sa façon de stocker la progression, il faut adapter l'adaptateur et relancer l'extraction.

## D23. Test de niveau (3 min) à l'inscription
8 questions par module, choisies automatiquement dans les banques de QCM des modules (une par notion, les plus importantes d'abord ; `src/lib/niveau.json`, généré par `scripts/extraire-notions.cjs`). Proposé juste après l'inscription, sur le module dont l'examen est le plus proche, et depuis « Ma progression » pour les autres. Une erreur classe la notion « à retravailler » : la mission du jour est donc personnalisée dès le premier jour. Une bonne réponse ne suffit pas à déclarer une notion maîtrisée (une seule question). Table `niveau`.

## D24. Envoi de documents par les élèves (« Partager mes cours »)
Les élèves envoient cours, TD et annales (PDF ou photos, 15 Mo max) dans un espace de stockage privé Supabase (dossier par élève, règles RLS). L'admin vérifie dans Suivi (lien temporaire d'une heure) et accepte ou refuse. Récompense : questions au tuteur en plus chaque jour (annale +10, TD +5, cours +5, plafond +30), calculée à partir des documents acceptés.
**Pourquoi cette récompense :** elle ne coûte presque rien (offres gratuites d'IA) et récompense l'usage, alors qu'un accès payant offert ferait perdre des ventes.
**Droit d'auteur :** les documents ne sont jamais publiés tels quels ; seul un contenu retravaillé l'est.

## D25. Bot Telegram (rappel du matin)
Chaque élève relie son compte depuis « Moi » (lien t.me/<bot>?start=<jeton> à usage unique). Chaque matin, une tâche planifiée Vercel (`vercel.json`, 7 h 30 UTC) envoie la mission du jour personnalisée, le compte à rebours, la série et le prochain live, avec un bouton qui ouvre directement le bon module. Commandes : /mission, /stop, /reprendre.
**Pourquoi Telegram :** déjà utilisé par les étudiants, gratuit, sans coût par message (contrairement aux SMS ou à WhatsApp Business).
**Sécurité :** le webhook vérifie l'en-tête secret de Telegram ; la tâche du matin exige CRON_SECRET.
**Limite :** sur le plan gratuit de Vercel, la tâche quotidienne peut partir n'importe quand dans l'heure prévue.

## D26. Examen blanc de la plateforme, note prévue et note réelle
- **Examen blanc** (`/app/blanc/[slug]`) : 15 QCM tirés au hasard dans la banque du module (une question par notion, les plus importantes d'abord), 20 minutes, sans correction pendant l'épreuve, note sur 20 et corrigé à la fin. Les notions ratées remontent dans « À retravailler ». Banque : `src/lib/banque.json` (311 QCM, extraits des modules).
- **Note prévue** : moyenne pondérée par l'importance des notions (maîtrisée = 1, ratée = son taux de réussite, jamais testée = 0,3), avec une fiabilité qui dépend de la part du programme testée.
- **Note réelle** : saisie par l'élève après l'examen ; Suivi affiche l'écart moyen prévu / réel, l'indicateur clé du pilote.
**Limite assumée :** un QCM ne mesure pas la rédaction ; la note est présentée comme un thermomètre, pas comme une prédiction exacte.

## D27. Offres Gratuit / Essentiel / Premium (06/11/2026)
**Quoi :** table `abonnements` (offre, date de fin, origine payée / invitation / récompense, bonus temporaire de parrainage), codes d'activation `TOUMAI-XXXX-XXXX` (table `codes_offre`, 5 essais ratés par heure), page « Mon offre » (`/app/offres`), section Offres dans Suivi (générer des codes, activer un élève par e-mail, abonnés en cours).
**Droits :** tuteur 5 / 20 / 100 questions par jour (`TUTOR_QUOTA_*`), mode Approfondi dès Essentiel, photo au tuteur et examen blanc en Premium.
**Invitations :** le code MZ- existant donne en plus 7 jours d'essai au niveau de l'invitant, seulement si son offre est payée et en cours (pas de chaîne d'essais). Quand l'invité paie, l'invitant gagne 7 jours au niveau supérieur ; son offre payée reste intacte (bonus stocké à part).
**Annale acceptée :** 7 jours offerts (prolonge l'offre payée en cours, sinon Premium), à la place des questions bonus.
**Paiement :** manuel (CashPlus, Orange Money, virement) puis code envoyé par WhatsApp. Pas de paiement en ligne : il faudrait une entreprise enregistrée (CMI) et Stripe n'est pas disponible au Maroc pour un particulier.
**Interrupteur :** tant que `OFFRES_ACTIVES` n'est pas à 1, rien ne change pour les élèves de la bêta (quota historique, tout ouvert). Les codes et activations fonctionnent déjà.
**Table séparée plutôt que `profiles` :** une ligne `profiles` créée au moment d'une invitation ferait sauter l'inscription guidée (la page Aujourd'hui considère qu'un profil existant = inscription faite).
**Pas encore :** bibliothèque commune visible selon l'offre (les documents envoyés ne sont pas encore transformés en fiches), mode visiteur sans compte (bêta fermée, D15), mode J-7, PDF hors ligne, annonces Miroir Darija.
**⚠️ Rappel D3 :** dès le premier paiement, l'offre gratuite de Vercel (usage non commercial) ne convient plus : passer au plan payant ou migrer vers Cloudflare.

## D28. Mode visiteur et ouverture à toutes les universités (07/11/2026)
**Quoi :** `/decouvrir` liste les modules et les ouvre sans compte (`/decouvrir/[module]`). Le fichier est servi sans le pont : pas de tuteur, pas de synchronisation, la progression reste dans le navigateur. Bouton « Essayer sans compte » sur l'accueil, pages ajoutées au sitemap.
**Pourquoi :** décision de Patrick, l'usage de base doit être possible sans inscription. Le compte (toujours sur invitation pendant la bêta) apporte la sauvegarde, la mission du jour et le tuteur. Cela remplace la règle « catalogue réservé aux membres » de la page d'accueil.
**Textes publics :** « FSABM » retiré de la description Google, de l'accueil et de la connexion : la plateforme vise toutes les universités du Maroc. Les modules restent ceux de la FSABM pour l'instant.

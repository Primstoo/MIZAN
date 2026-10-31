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
**Limite :** l'envoi d'e-mails intégré de Supabase est plafonné à quelques messages par heure. Suffisant pour 10 testeurs ; au-delà, brancher un service d'e-mail gratuit (Resend, Brevo).

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

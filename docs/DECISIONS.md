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
- Un petit script « pont » (jour 2) leur donne accès au compte et au tuteur sans les réécrire.
**Pourquoi pas les autres (pour l'instant) :**
- Réécriture React : la solution propre à long terme, mais trop lente pour le pilote.
- Moteur JSON commun : c'est la cible pour générer des modules automatiquement (vision MIZAN), mais ça demande d'abord de stabiliser le format.
**Plan :** iframe maintenant ; convertir progressivement vers un format commun quand on saura quels types d'exercices plaisent le plus.

## D6. Stocker la progression en JSON (jsonb) par module
**Alternatives :** une table par type de donnée (scores, réponses, failles…).
**Pourquoi jsonb :** chaque module a sa propre structure de progression. Un champ JSON accepte toutes les structures sans modifier la base à chaque module.
**Inconvénient accepté :** statistiques fines un peu plus compliquées. On créera des tables dédiées quand on saura quoi mesurer.

## D7. Région des serveurs : Europe (Paris ou Francfort)
**Alternatives :** États-Unis, Asie.
**Pourquoi :** Supabase ne propose pas de serveurs en Afrique. L'Europe de l'Ouest est la plus proche du Maroc, donc les pages répondent plus vite.

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

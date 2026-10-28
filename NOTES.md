# Mes notes techniques sur MIZAN

À compléter avec mes propres mots au fur et à mesure (préparation aux entretiens).

## Comment marche la connexion ?
- L'utilisateur clique « Continuer avec Google » ou reçoit un lien par e-mail (Supabase Auth).
- Au retour, `/auth/callback` échange le code contre une session stockée dans un cookie.
- `src/middleware.ts` vérifie la session à chaque visite de `/app` et renvoie vers `/login` si on n'est pas connecté.

## Pourquoi Supabase ?
- Postgres + authentification + règles de sécurité (RLS) gratuits pour démarrer.
- RLS : la base elle-même refuse qu'un élève lise les données d'un autre (`auth.uid() = user_id`).

## Pourquoi les modules sont dans des iframes ?
- Les modules existants sont des pages HTML complètes. Les afficher tels quels évite de tout réécrire ; un petit script « pont » leur donne accès au compte (jour 2).

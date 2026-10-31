# Mes notes techniques sur MIZAN

À compléter avec mes propres mots au fur et à mesure (préparation aux entretiens).

## Comment marche la connexion ?
- L'utilisateur entre son e-mail et reçoit un code à 6 chiffres et un lien (Supabase Auth, sans mot de passe).
- Le code est vérifié directement sur la page de connexion ; le lien passe par `/auth/hash`, qui pose la session dans un cookie.
- `src/middleware.ts` vérifie la session à chaque visite de `/app` et renvoie vers `/login` si on n'est pas connecté.

## Pourquoi Supabase ?
- Postgres + authentification + règles de sécurité (RLS) gratuits pour démarrer.
- RLS : la base elle-même refuse qu'un élève lise les données d'un autre (`auth.uid() = user_id`).

## Pourquoi les modules sont dans des iframes ?
- Les modules existants sont des pages HTML complètes. Les afficher tels quels évite de tout réécrire ; un petit script « pont » leur donne accès au compte.

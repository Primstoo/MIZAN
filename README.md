# MIZAN

Plateforme de révision pour les étudiants de la FSABM (Béni Mellal) : chaque module suit le cours du prof, avec leçons, exercices corrigés, évaluations et un tuteur IA.

## Stack
Next.js 14 (App Router, TypeScript) · Supabase (auth, Postgres, RLS) · Vercel.

## Démarrer en local
```bash
cp .env.example .env.local   # remplir les clés Supabase
npm install
npm run dev
```

## Structure
- `src/lib/modules.ts` : catalogue des modules
- `public/modules/` : modules (HTML autonomes)
- `src/app/app/` : espace connecté (tableau de bord, lecteur de module)
- `supabase/schema.sql` : tables et règles de sécurité

## Feuille de route
- [x] Jour 1 : squelette, connexion (Google + lien magique), schéma Supabase, catalogue
- [ ] Jour 2 : pont modules ↔ plateforme (progression synchronisée)
- [ ] Jour 3 : tuteur côté serveur (Gemini, Groq en secours), quotas
- [ ] Jour 4-5 : tableau de bord d'usage, invitations

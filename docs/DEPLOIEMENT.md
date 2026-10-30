# Mettre MIZAN en ligne

## À quoi sert chaque outil
| Outil | Rôle | Analogie | Coût |
|---|---|---|---|
| **GitHub** | Garde le code et son historique | Le classeur des plans | Gratuit |
| **Supabase** | Comptes, connexion par e-mail, base de données (progression, quotas, invitations) | Les archives et l'accueil | Gratuit (projet en pause après 7 j sans activité) |
| **Vercel** | Récupère le code sur GitHub, le construit et le met en ligne à chaque push | Le bâtiment ouvert au public | Gratuit (Hobby, non commercial) |
| **Gemini (Google AI Studio)** | Le cerveau du tuteur | Le prof particulier | Offre gratuite limitée |
| **Groq** | Tuteur de secours si Gemini ne répond pas | Le prof remplaçant | Offre gratuite limitée |

## Étapes
1. **Supabase** (projet MIZAN déjà créé) : SQL Editor → coller `supabase/schema.sql` → Run. Puis Project Settings → API : copier Project URL, clé `anon`, clé `service_role` (secrète).
2. **Clés IA** : aistudio.google.com → Get API key ; console.groq.com → API Keys.
3. **Vercel** : s'inscrire avec GitHub → Add New → Project → importer MIZAN → Environment Variables :
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `GROQ_API_KEY`, `ADMIN_EMAILS` → Deploy.
4. **Supabase → Authentication → URL Configuration** : Site URL = adresse Vercel ; Redirect URLs = adresse Vercel + `/**`.
5. Se connecter avec l'e-mail admin, créer les codes d'invitation dans la page d'accueil.

## Réglages optionnels (Vercel → Environment Variables)
`TUTOR_DAILY_QUOTA` (40), `INVITE_USES` (3), `INVITES_PER_MEMBER` (1), `GEMINI_MODEL`, `GROQ_MODEL`.
Après toute modification de variable : Deployments → … → Redeploy.

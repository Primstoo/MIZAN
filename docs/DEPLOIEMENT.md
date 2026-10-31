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

## E-mails de connexion (obligatoire avant d'inviter)
Le service d'e-mail intégré de Supabase n'envoie qu'à l'équipe du projet et quelques messages par heure.
- **En attendant le domaine : Gmail.** Compte Google → Sécurité → validation en 2 étapes → « Mots de passe des applications » → en créer un « MIZAN ». Puis Supabase → Authentication → Emails → SMTP Settings : hôte `smtp.gmail.com`, port `465`, utilisateur et expéditeur = l'adresse Gmail, mot de passe = le code de 16 lettres, nom d'expéditeur `MIZAN`. Authentication → Rate Limits : 30 e-mails par heure.
- **Avec le domaine : Resend** (même écran SMTP, hôte `smtp.resend.com`, port `465`, utilisateur `resend`, mot de passe = clé API `re_…`).
- **Modèles d'e-mail** (Authentication → Emails → Templates → « Magic Link » et « Confirm signup ») : ajouter le code `{{ .Token }}` en grand, en plus du lien `{{ .ConfirmationURL }}`.
- **Adresse du site** (Authentication → URL Configuration) : Site URL et Redirect URLs `https://<domaine>/**`.

## Variables Vercel
| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | connexion à Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | serveur uniquement (invitations, quotas, admin) |
| `GEMINI_API_KEY`, `GROQ_API_KEY` | tuteur |
| `ADMIN_EMAILS` | accès à la page Suivi |
| `LIVE_PAIEMENT_CIH`, `LIVE_PAIEMENT_CASHPLUS` | instructions de paiement des lives |
| facultatives | `TUTOR_DAILY_QUOTA`, `INVITE_USES`, `INVITES_PER_MEMBER`, `GEMINI_MODEL`, `GROQ_MODEL`, `TUTOR_TIMEOUT_MS` |

Après toute modification de variable : Vercel → Deployments → Redeploy.

## Usage commercial
La formule Vercel gratuite (Hobby) est réservée à un usage non commercial : passer au plan Pro dès que les lives payants démarrent.

## Bot Telegram (rappels du matin)
1. Dans Telegram, écrire à **@BotFather** → `/newbot` → nom « MIZAN » → identifiant terminé par `bot` (ex. `MizanRevisionBot`). Copier le jeton donné.
2. Dans Vercel → Environment Variables :
   - `TELEGRAM_BOT_TOKEN` : le jeton de BotFather
   - `TELEGRAM_BOT_USERNAME` : l'identifiant du bot, sans @
   - `TELEGRAM_WEBHOOK_SECRET` : une longue suite de lettres et chiffres au hasard
   - `CRON_SECRET` : une autre suite au hasard (Vercel l'utilise pour la tâche du matin)
3. Redeploy, puis dans MIZAN → Suivi → « Activer / réparer le bot ».
4. Tester : Moi → « Recevoir mes rappels sur Telegram » → Démarrer → taper /mission.

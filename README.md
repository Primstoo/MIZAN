# MIZAN

Plateforme de révision pour les étudiants de la FSABM (Béni Mellal). Chaque module suit le cours **du prof** : explications illustrées, fiche à retenir, exercices corrigés, évaluations, et un tuteur IA présent sur chaque page. L'appli calcule une mission du jour à partir de la date d'examen de l'élève, et propose des séances live payantes.

**En ligne :** https://mizan-five-iota.vercel.app (bêta privée, sur invitation)

## Fonctionnalités
- **Connexion sans mot de passe** : code à 6 chiffres ou lien par e-mail.
- **Bêta privée** : codes d'invitation (3 places par membre, 10 pour l'admin).
- **Inscription guidée** : prénom, modules, dates d'examen (ou estimation si non annoncée), temps disponible par jour.
- **Aujourd'hui** : mission du jour personnalisée (elle commence par tes points faibles), compte à rebours, série de jours, prochain live.
- **Ma progression** : maîtrise par module et par chapitre, notions à retravailler.
- **Modules** : 5 modules (Réseaux M351, Cryptographie, Architecture, UML, Probabilités S3), servis uniquement aux membres connectés, progression synchronisée entre appareils.
- **Tuteur IA** : Gemini puis Groq en secours, côté serveur, réponse en continu, quota quotidien par élève.
- **Live** : réservation, paiement par virement CIH ou CashPlus validé par l'admin, lien visio visible 30 min avant pour les élèves qui ont payé.
- **Suivi admin** : membres, activité, questions au tuteur, paiements à valider, dates d'examen communes, programmation des lives.

## Stack
Next.js 14 (App Router, TypeScript) · Supabase (auth, Postgres, RLS) · Vercel (région Dublin, proche de la base en Irlande).

## Structure
- `src/app/` : pages (accueil public, connexion, espace `/app`, API du tuteur)
- `src/lib/` : catalogue des modules, accès et invitations, parcours (examens, série, mission)
- `content/modules/` : les modules (pages HTML autonomes), non publics, servis par `/app/modules/[file]`
- `public/mizan-bridge.js` : pont entre un module et la plateforme (tuteur)
- `supabase/` : schéma et migrations (RLS sur toutes les tables)
- `docs/DECISIONS.md` : chaque choix, ses alternatives et pourquoi elles sont écartées
- `docs/DEPLOIEMENT.md` : mise en ligne pas à pas

## Démarrer en local
```bash
cp .env.example .env.local   # remplir les clés
npm install
npm run dev
```

## Feuille de route
- [x] Connexion, invitations, inscription guidée, Aujourd'hui, Live, Moi, Suivi admin
- [x] Modules protégés, progression synchronisée, tuteur serveur en continu
- [x] Explications illustrées intégrées au cours de chaque module
- [x] Scores des modules remontés vers la plateforme (mission personnalisée, maîtrise par chapitre, points faibles)
- [x] Test de niveau à l'inscription
- [x] Envoi de documents par les élèves (récompense : questions au tuteur en plus)
- [x] Bot Telegram (mission du matin, série, prochain live) · à activer avec le jeton du bot
- [x] Examen blanc chronométré, note prévue et comparaison avec la note réelle
- [ ] Nom de domaine + e-mails via Resend

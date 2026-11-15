# E-mails de connexion : modèles à coller dans Supabase

Supabase → Authentication → Emails → Templates. Coller le même contenu dans **Magic Link** et dans **Confirm signup**.
Le code `{{ .Token }}` fait 8 chiffres aujourd'hui (réglage « Email OTP Length ») ; l'appli accepte de 6 à 10 chiffres.

**Objet :** `{{ .Token }} est ton code ToumaiLearn`

```html
<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;color:#2b2118">
  <h2 style="margin:0 0 8px">ToumaiLearn</h2>
  <p>Voici ton code de connexion :</p>
  <p style="font-size:34px;font-weight:700;letter-spacing:6px;margin:16px 0">{{ .Token }}</p>
  <p>Tape-le dans la page de connexion. Il est valable une heure et ne sert qu'une fois.</p>
  <p style="color:#6b5f55;font-size:14px">Tu préfères un lien ? <a href="{{ .ConfirmationURL }}">Me connecter</a> (ouvre-le dans le navigateur où tu as demandé le code).</p>
  <p style="color:#6b5f55;font-size:13px">Tu n'as rien demandé ? Ignore cet e-mail, personne ne peut entrer sans ce code.</p>
</div>
```

Mettre le code dans l'objet aide beaucoup : l'élève le lit dans la notification sans ouvrir l'e-mail.

## Expéditeur
Gmail dépanne mais finit souvent en spam et plafonne les envois. Cible : Resend avec le domaine `toumailearn.app`
(Supabase → Authentication → SMTP Settings : hôte `smtp.resend.com`, port `465`, utilisateur `resend`, mot de passe = clé API,
expéditeur `connexion@toumailearn.app`), après avoir ajouté chez le gestionnaire du domaine les enregistrements SPF, DKIM et DMARC que Resend affiche.

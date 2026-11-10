# Miroir Darija → « Infos de la fac »

Le bot reste un programme séparé (sur le PC ou un petit serveur). Il continue d'envoyer ses traductions sur Telegram,
et il **envoie en plus les annonces utiles à ToumaiLearn**, par une simple requête web. Il n'a besoin ni de la base ni de la clé service.

```
Groupes WhatsApp ─► Miroir Darija ─► Telegram (comme aujourd'hui)
                         └─ POST https://toumailearn.app/api/infos ─► file « à valider » (Suivi → Infos de la fac)
                                                                        └─ Publier ─► page Infos + Telegram des élèves
```

## Mise en route (une fois)
1. Supabase → SQL Editor : coller `supabase/migration-2026-11-infos-fac.sql`.
2. Vercel → Settings → Environment Variables : `INFOS_SECRET` = une longue suite au hasard, puis redéployer.
3. Dans le `.env` du bot : `TOUMAI_URL=https://toumailearn.app` et `TOUMAI_SECRET=` la même valeur.

## Côté bot : quoi envoyer
Seulement ce qui concerne toute la promo : dates d'examen, rattrapages, séances déplacées ou annulées, emplois du temps, documents à récupérer.
Jamais le bavardage, jamais un message qui parle d'une personne.

```js
// À appeler après la traduction, quand le message est classé « annonce » (pas « bavardage »).
async function envoyerAToumai(info) {
  const r = await fetch(process.env.TOUMAI_URL + "/api/infos", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + process.env.TOUMAI_SECRET },
    body: JSON.stringify(info),
  });
  if (!r.ok && r.status !== 207) console.error("ToumaiLearn a refusé l'annonce :", r.status);
}

envoyerAToumai({
  etablissement: "FSABM",            // nom ou sigle, reconnu comme dans l'appli
  semestre: "S5",                    // facultatif : S1 … M4
  type: "examen",                    // annonce | examen | emploi_du_temps | document | autre
  texte_fr: "L'examen de Cryptographie est fixé au lundi 14 décembre à 9 h, amphi 3.",
  texte_original: "…",               // facultatif : le message d'origine, pour ta relecture
  date_evenement: "2026-12-14",      // facultatif
  groupe: "MI S5 2026",              // facultatif : sert seulement à repérer les doublons, jamais affiché
});
```

On peut envoyer un tableau (50 annonces au plus par requête). Réponse : `{ resultats: [{ ok, etat }] }`. Une annonce déjà reçue répond `ok: true, etat: "déjà reçue"`.

Pour classer « annonce ou bavardage », ajouter à la consigne de traduction du bot une ligne de sortie, par exemple :
`CLASSE: annonce|examen|emploi_du_temps|document|bavardage` et `DATE: AAAA-MM-JJ ou vide`. N'envoyer que si la classe n'est pas `bavardage`.

## Ce que fait ToumaiLearn
- Retire par sécurité numéros, e-mails, mentions @ et codes étudiants (`src/lib/infos.ts`), ignore les doublons.
- Met l'annonce **en attente** : rien n'est visible tant que tu ne l'as pas relue et publiée (Suivi → Infos de la fac). Tu peux corriger le texte, le type, le semestre et la date.
- À la publication : page **Infos** pour les élèves de l'établissement (texte complet en Essentiel et Premium, début seulement en gratuit), et message Telegram aux élèves qui ont relié leur compte.

## Points de vigilance
- WhatsApp peut bannir un numéro qui utilise une bibliothèque non officielle : garder le numéro secondaire pour le bot.
- Messages de groupes privés = données personnelles (loi 09-08, CNDP) : ne publier que des informations institutionnelles, reformulées, sans nom ni numéro. La relecture avant publication est là pour ça.
- Tant que le bot tourne sur ton PC, les infos s'arrêtent quand le PC est éteint.

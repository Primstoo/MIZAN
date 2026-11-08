---
id: qcours
titre: Questions de cours (rédaction)
seance: Travaux dirigés et pratiques
importance: 4
---

> [!astuce] Cherche d'abord seul, ouvre l'indice si tu bloques, puis compare avec le corrigé et note-toi honnêtement : ta réponse compte dans la maîtrise de la notion.

```exercice Questions de cours type examen
? {qcours} **Q1.** Définissez UML. Est-ce une méthode ?
= UML (Unified Modeling Language) est un langage de modélisation graphique et semi-formel qui permet de représenter et de communiquer les différents aspects d’un système. Ce n’est pas une méthode : il fournit la sémantique, la notation et les règles, mais pas de démarche. Il couvre toutes les étapes du développement.
? {qcours} **Q2.** Pourquoi modéliser avant de développer ?
= Pour mieux comprendre le système, maîtriser sa complexité et assurer sa cohérence, faciliter la communication et la répartition des tâches, assurer la qualité et la maintenabilité, et réduire coûts et délais.
? {qcours} **Q3.** Qu’est-ce qu’un modèle ?
= Une représentation abstraite de la réalité qui exclut les détails n’influençant pas le comportement de manière significative ; il se présente sous forme de diagramme (symboles + texte).
? {qcours} **Q4.** Différence MOA / MOE ?
= La MOA (maîtrise d’ouvrage) est le client, le métier : elle définit les besoins. La MOE (maîtrise d’œuvre) est le réalisateur : elle étudie la faisabilité, traduit techniquement, modélise et développe. Elles sont liées par un contrat.
? {qcours} **Q5.** Citez les diagrammes statiques et dynamiques étudiés.
= Statiques : classes, objets (et composants, déploiement). Dynamiques : cas d’utilisation, séquence, collaboration, activités (et états-transitions).
? {qcours} **Q6.** Agrégation et composition : différences ?
= Toutes deux modélisent un lien tout/partie, losange côté tout. Agrégation (vide) : la partie peut être partagée et survit au tout. Composition (plein) : la partie appartient à un seul composite, n’existe pas sans lui et est détruite avec lui ; multiplicité côté composite ≤ 1.
? {qcours} **Q7.** Classe abstraite et interface ?
= Aucune ne s’instancie. Une classe abstraite contient au moins une méthode abstraite et peut avoir des attributs et des méthodes concrètes. Une interface n’a pas d’attributs (sauf constantes) et toutes ses méthodes sont abstraites.
? {qcours} **Q8.** Qu’est-ce qu’une classe-association et quand l’utiliser ?
= Une classe rattachée par un pointillé à une association, utilisée quand l’association porte des propriétés qui n’appartiennent à aucune des classes reliées (ex. dateEmbauche et salaire entre Société et Personne).
? {qcours} **Q9.** Diagramme de classes / diagramme d’objets ?
= Le diagramme de classes modélise les règles (structure générale) ; le diagramme d’objets en est une instance à un instant donné : objets soulignés, attributs valorisés, liens sans multiplicités, pas de généralisation.
? {qcours} **Q10.** Acteur principal / secondaire ?
= Principal : directement concerné, il sollicite le système pour obtenir un résultat. Secondaire : sollicité pour fournir des informations complémentaires ; s’il ne fait que consommer des informations sans modifier l’état du système, il est secondaire.
? {qcours} **Q11.** «include» / «extend» ?
= include : comportement obligatoire, factorisation ou décomposition, flèche du cas de base vers le cas inclus. extend : comportement optionnel sous condition, à un point d’extension, flèche de l’extension vers le cas de base.
? {qcours} **Q12.** Séquence / collaboration ?
= Deux diagrammes d’interaction équivalents. La séquence met l’accent sur l’ordre temporel (axe vertical, lignes de vie). La collaboration met l’accent sur l’organisation spatiale des objets et leurs liens ; l’ordre est donné par la numérotation des messages.
? {qcours} **Q13.** Fusion / union dans un diagramme d’activités ?
= Fusion (losange) : rassemble des flots alternatifs, laisse passer un flot sans attendre. Union ou join (barre) : synchronise des flots concurrents, attend qu’ils soient tous arrivés.
? {qcours} **Q14.** Fin d’activité / fin de flot ?
= La fin d’activité arrête toute l’activité. La fin de flot termine uniquement le flot qui l’atteint, sans effet sur les autres flots actifs.
? {qcours} **Q15.** Qu’est-ce que le polymorphisme ? Exemple.
= La capacité d’une même opération à s’exécuter différemment selon la classe de l’objet. Exemple : calculerPaie() redéfinie dans EmployéHoraire, EmployéSalarié et Vacataire.
? {qcours} **Q16.** Comment construire un diagramme de classes à partir d’un texte ?
= 1) Noms → classes ; 2) verbes → associations ; 3) substantifs fins et adjectifs → attributs et valeurs ; 4) héritage pour factoriser ; 5) tester les chemins d’accès ; 6) itérer et raffiner (diapo 78).
```


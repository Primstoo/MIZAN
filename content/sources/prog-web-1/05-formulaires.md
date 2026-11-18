---
id: formulaires
titre: HTML5 (4) · formulaires
seance: Partie II · HTML5, formulaires
importance: 5
---

## Avant de commencer

Tu dois connaître la différence client / serveur (chapitre 1) et savoir écrire des attributs (chapitre 2). Un formulaire envoie des données du client vers le serveur.

```exercice Vérifie ton prérequis
? Dans une requête HTTP, où voyagent les données d'un formulaire envoyé en POST ?
= Dans le **corps** de la requête, après la ligne vide (chapitre 1).
```

## Comment aborder ce chapitre

> [!astuce] **Chaque champ = une question posée à l'utilisateur.** Pour chaque champ, demande-toi : quel type de réponse (texte, choix unique, choix multiple, date…) ? Le `type` de l'`input` en découle.

> [!piege] Oublier l'attribut **`name`**. Sans `name`, le champ s'affiche mais sa valeur **n'est pas envoyée** au serveur. Et `id` (pour le `label`) ne remplace pas `name`.

À la fin, tu sais écrire un formulaire complet : zones de texte, mot de passe, liste déroulante, boutons radio et cases à cocher, boutons d'envoi, regroupement en `fieldset`, transfert de fichier.

## Idée 1 · `<form>` : method et action

```flux Le voyage d'un formulaire
L'utilisateur remplit les champs -> clic sur submit -> le navigateur envoie name=valeur (GET ou POST) -> action="traitement.php" traite les données
```

```markup
<form method="post" action="traitement.php">
    ...champs...
</form>
```

| Attribut | Valeurs | Rôle |
|---|---|---|
| `method` | `get` | données ajoutées à l'URL (`?pseudo=midou`), quantité limitée |
| | `post` | données dans le corps de la requête : **la plus utilisée**, grandes quantités |
| `action` | une URL | la page (souvent **PHP**) qui traite les données |

> [!attention] Le cours dit que GET est « limité à 255 caractères ». C'est une limite historique de vieux navigateurs : aujourd'hui la limite dépend du navigateur et du serveur (plusieurs milliers de caractères). Retiens surtout : **GET = données visibles dans l'URL, POST = dans le corps**. Un mot de passe ne s'envoie jamais en GET.

## Idée 2 · Les champs de saisie

```markup
<form method="post" action="traitement.php">
    <p>
        <label for="pseudo">Votre pseudo :</label>
        <input type="text" name="pseudo" id="pseudo"
               placeholder="Ex : midou" size="30" maxlength="10">
        <br>
        <label for="pass">Votre mot de passe :</label>
        <input type="password" name="pass" id="pass">
    </p>
    <p>
        <label for="sugg">Vos suggestions :</label><br>
        <textarea name="sugg" id="sugg" rows="5" cols="40"></textarea>
    </p>
</form>
```

```html
<form style="border:1px solid currentColor;border-radius:8px;padding:8px 14px;margin:8px 0" onsubmit="return false">
<p><label for="d-pseudo">Votre pseudo :</label> <input type="text" id="d-pseudo" placeholder="Ex : midou" size="20" maxlength="10"><br>
<label for="d-pass">Votre mot de passe :</label> <input type="password" id="d-pass"></p>
<p><label for="d-sugg">Vos suggestions :</label><br><textarea id="d-sugg" rows="3" cols="30"></textarea></p>
</form>
```

```etapes Le lien label ↔ input
Le champ :: `<input id="pseudo" name="pseudo">` : `id` l'identifie dans la page, `name` le nomme pour le serveur.
Le label :: `<label for="pseudo">` : la valeur de `for` = l'`id` du champ.
L'effet :: Cliquer sur le texte du label place le curseur dans le champ.
```

| Attribut de `input` | Rôle |
|---|---|
| `name` | nom de la donnée envoyée |
| `id` | identifiant (pour `label for`) |
| `size` | largeur visible de la zone |
| `maxlength` | nombre maximal de caractères |
| `value` | valeur pré-remplie |
| `placeholder` | indication grisée, disparaît à la saisie |
| `required` | champ obligatoire (utilisé dans le corrigé du TD) |

Les types HTML5 du cours : `email`, `url`, `tel`, `number`, `range` (curseur), `color`, `date`, `search`.

> [!piege] `placeholder` n'est **pas** une valeur : s'il n'est pas remplacé, le champ est envoyé **vide**. Pour pré-remplir, c'est `value`.

> [!attention] Dans l'exemple `textarea` des diapos, le `label for="proposition"` ne correspond pas à l'`id="Suggestion"` du champ, et les guillemets de `rows="20"` sont typographiques (`“20"`). Corrige : `for` doit valoir exactement l'`id`, avec des guillemets droits.

## Idée 3 · Les choix : liste, radio, checkbox

```grille Quel élément pour quel choix ?
#cols: besoin élément
une option parmi beaucoup *select + option
une option parmi peu (exclusif) *input type="radio"
plusieurs options à la fois *input type="checkbox"
```

```markup
<label for="ville">Ville :</label>
<select name="ville" id="ville">
    <optgroup label="Béni Mellal-Khénifra">
        <option value="bm">Béni Mellal</option>
        <option value="kh">Khouribga</option>
    </optgroup>
    <optgroup label="Casablanca-Settat">
        <option value="casa" selected>Casablanca</option>
    </optgroup>
</select>

<p>Semestre :
    <input type="radio" name="sem" value="S3" id="s3"> <label for="s3">S3</label>
    <input type="radio" name="sem" value="S4" id="s4"> <label for="s4">S4</label>
</p>
<p>Modules :
    <input type="checkbox" name="html" id="html"> <label for="html">Le langage HTML</label>
    <input type="checkbox" name="js" id="js"> <label for="js">Le langage JavaScript</label>
</p>
```

```html
<form style="border:1px solid currentColor;border-radius:8px;padding:8px 14px;margin:8px 0" onsubmit="return false">
<label for="d-ville">Ville :</label> <select id="d-ville"><optgroup label="Béni Mellal-Khénifra"><option>Béni Mellal</option><option>Khouribga</option></optgroup><optgroup label="Casablanca-Settat"><option selected>Casablanca</option></optgroup></select>
<p>Semestre : <input type="radio" name="d-sem" id="d-s3"> <label for="d-s3">S3</label> <input type="radio" name="d-sem" id="d-s4"> <label for="d-s4">S4</label></p>
<p>Modules : <input type="checkbox" id="d-h"> <label for="d-h">HTML</label> <input type="checkbox" id="d-j"> <label for="d-j">JavaScript</label></p>
</form>
```

> [!retenir] Des boutons radio forment un groupe **parce qu'ils ont le même `name`**. Si chaque radio a un `name` différent, on peut tous les cocher : ce n'est plus un choix unique.

## Idée 4 · Boutons, fieldset et envoi de fichiers

```markup
<form method="post" action="inscription.php" enctype="multipart/form-data">
    <fieldset>
        <legend>Identité</legend>
        <label for="nom">Nom :</label> <input type="text" name="nom" id="nom" required>
    </fieldset>
    <fieldset>
        <legend>Documents</legend>
        <input type="file" name="cv">
    </fieldset>
    <input type="submit" value="Envoyer">
    <input type="reset" value="Annuler">
</form>
```

| `type` du bouton | Effet |
|---|---|
| `submit` | envoie le formulaire |
| `reset` | remet tous les champs à zéro |
| `image` | bouton d'envoi sous forme d'image |
| `button` | ne fait rien seul : géré en JavaScript |

- `<fieldset>` regroupe visuellement des champs (un cadre) ; `<legend>` lui donne un titre.
- `<input type="file">` permet d'envoyer un fichier au serveur. Le formulaire doit alors être en **POST** avec **`enctype="multipart/form-data"`**.

> [!attention] La diapo écrit `enctype="multipart/formdata"` (le tiret a disparu à l'extraction ou dans la diapo). La valeur exacte est **`multipart/form-data`**. Sans elle, le fichier n'est pas transmis.

## S'exercer

```exercice Écrire des formulaires
? Écris un groupe de boutons radio « Sexe » (Homme / Femme) où un seul choix est possible.
= ~~~
<input type="radio" name="sexe" value="H" id="h"> <label for="h">Homme</label>
<input type="radio" name="sexe" value="F" id="f"> <label for="f">Femme</label>
~~~
Le **même `name`** rend le choix exclusif.
? Un étudiant écrit `<input type="text" id="cne">` et le serveur ne reçoit rien. Pourquoi ?
= Il manque **`name="cne"`**. Seuls les champs avec un `name` sont envoyés.
? Écris le formulaire du TD, exercice 1, début : champ obligatoire « Num_CIN* » avec son label, dans un tableau, envoyé en POST.
= ~~~
<form method="post" action="">
    <table border="1">
        <tr>
            <td><label for="cin">Num_CIN*</label></td>
            <td><input type="text" name="cin" id="cin" required></td>
        </tr>
    </table>
</form>
~~~
Le corrigé complet est au chapitre « TD et TP corrigés ».
? Quels attributs doit avoir un `<form>` qui envoie une photo ?
= `method="post"` et `enctype="multipart/form-data"` (plus `action`), avec un `<input type="file" name="photo">`.
```

## Flashcards

```cartes
GET vs POST ? :: GET : données dans l'URL, limité, visible. POST : dans le corps de la requête, grandes quantités (le plus utilisé).
Rôle de action dans form ? :: L'adresse de la page (souvent PHP) qui traite les données.
Pourquoi name est indispensable ? :: Sans name, la valeur du champ n'est pas envoyée au serveur.
Relier un label à un champ ? :: label for="x" et input id="x".
placeholder vs value ? :: placeholder : indication grisée, non envoyée. value : vraie valeur pré-remplie.
radio vs checkbox ? :: radio : un seul choix dans un groupe (même name). checkbox : plusieurs choix.
fieldset et legend ? :: fieldset : cadre qui regroupe des champs ; legend : son titre.
Envoyer un fichier ? :: input type="file", form en post avec enctype="multipart/form-data".
Regrouper des options d'un select ? :: optgroup label="..."
```

## QCM du chapitre

```qcm
? Quelle méthode met les données dans l'URL ?
+ GET
- POST
- PUT
= Avec GET on voit `?nom=valeur` dans l'adresse.
? L'attribut `action` contient…
- le type d'envoi
+ l'adresse du programme qui traite les données
- le nom du formulaire
= Souvent une page PHP, comme `traitement.php`.
? Un champ sans `name`…
- est obligatoire
+ n'est pas envoyé au serveur
- est caché
= `name` est la clé de la donnée envoyée.
? `label for="pseudo"` se relie au champ qui a…
- `name="pseudo"`
+ `id="pseudo"`
- `value="pseudo"`
= `for` pointe vers l'`id`.
? Quel type masque les caractères saisis ?
- `text`
+ `password`
- `hidden`
= Les caractères s'affichent en points.
? Pour un texte de plusieurs lignes :
- `<input type="text" rows="5">`
+ `<textarea>`
- `<input type="multiline">`
= `textarea` avec `rows` et `cols`.
? Trois boutons radio permettent tous d'être cochés en même temps. Cause probable ?
- il manque `checked`
+ ils n'ont pas le même `name`
- il manque `value`
= Le groupe exclusif est défini par le `name` commun.
? Quel bouton remet le formulaire à zéro ?
- `submit`
+ `reset`
- `button`
= `button` ne fait rien sans JavaScript.
? `<legend>` s'utilise dans…
- `<select>`
+ `<fieldset>`
- `<table>`
= Elle donne un titre au cadre du fieldset.
? Pour envoyer un fichier, l'attribut `enctype` vaut…
- `text/plain`
- `multipart/formdata`
+ `multipart/form-data`
= Avec le tiret : la version des diapos est fautive.
```

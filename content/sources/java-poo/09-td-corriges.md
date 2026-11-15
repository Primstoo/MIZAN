---
id: td-corriges
titre: TD 2 et TD 3 corrigés, exécutés et commentés
seance: TD 2 (bases de Java) · TD 3 (classes et objets)
importance: 5
---

## Avant de commencer

Tu dois avoir vu les bases de Java (chapitre 4) pour le TD 2, et les classes, constructeurs et `this` (chapitres 6 et 7) pour le TD 3. Le TD 1 (questions de cours) est corrigé dans les chapitres 1, 2 et 3.

```exercice Vérifie ton prérequis
? Que vaut `3 / 2` en Java, et que vaut `3 / 2.0` ?
= `3 / 2` vaut **1** (division entière). `3 / 2.0` vaut **1.5**. Cette différence explique l'un des bugs du corrigé de l'exercice 3 ci-dessous.
```

## Comment aborder ce chapitre

> [!astuce] **Cherche d'abord, lis ensuite.** Pour chaque exercice : lis l'énoncé, écris ta solution sur papier, puis compare. Un corrigé lu sans avoir cherché s'oublie en deux jours.

> [!piege] Un corrigé qui **compile** n'est pas forcément un corrigé **juste**. Tous les programmes ci-dessous ont été exécutés : deux d'entre eux donnent un résultat qui ne correspond pas à l'énoncé. Ils sont signalés.

À la fin, tu sais refaire les six exercices du TD 2 et les deux classes du TD 3, et tu connais leurs pièges.

## Idée 1 · TD 2, exercices 1 et 2 : factorielle et facture

**Exercice 1 · Factorielle.** Le corrigé est donné au chapitre 4 (idée 5). Avec la saisie 5, il affiche `Factorielle de n =120`. Rappel : avec un `int`, le résultat est faux à partir de 13.

**Exercice 2, question 1 · Facture d'électricité.** Données : taxe de 10 % (constante), prix unitaire, ancien et nouvel index.

```java nontest
import java.util.Scanner;

public class Facture {
    public static void main(String[] args) {
        final double TAXE = 0.1;
        double prix;
        double AIndex, NIndex;

        Scanner sc = new Scanner(System.in);
        System.out.print("Prix unitaire : ");
        prix = sc.nextDouble();
        System.out.print("Nouvel index : ");
        NIndex = sc.nextDouble();
        System.out.print("Ancien index : ");
        AIndex = sc.nextDouble();

        double consomation = NIndex - AIndex;
        double prix_HT = consomation * prix;
        double TVA = prix_HT * TAXE;
        double prix_TTC = prix_HT + TVA;

        System.out.println("Le prix total est: " + prix_TTC + " dh");
    }
}
```

Avec prix = 0,6, nouvel index = 200, ancien index = 100 :

```sortie
Le prix total est: 66.0 dh
```

```etapes Le calcul, à la main
Consommation :: 200 − 100 = 100 kWh.
Prix hors taxe :: 100 × 0,6 = 60 DH.
Taxe :: 60 × 0,1 = 6 DH.
Total :: 60 + 6 = 66 DH. L'énoncé annonce « 66 dh » : le programme affiche `66.0` parce que le résultat est un `double`.
```

**Exercice 2, question 2 · Facture par tranches.** Énoncé : la première tranche, inférieure à 100 kWh, est facturée 0,6 DH l'unité ; la deuxième, entre 100 et 150 kWh, 0,9 DH ; au-delà, 1,1 DH.

Le corrigé fourni choisit **un seul prix** selon la consommation totale :

```java nontest
double consomation = NIndex - AIndex;
if (consomation < 100) {
    prix = 0.6;
}
else if (consomation < 150) {
    prix = 0.9;
}
else {
    prix = 1.1;
}
double prix_HT = consomation * prix;
```

> [!attention] **Ce corrigé applique le tarif de la tranche atteinte à TOUTE la consommation.** Or une facturation « par tranches » facture chaque kWh au prix de **sa** tranche : les 100 premiers à 0,6, les 50 suivants à 0,9, le reste à 1,1. Les deux lectures donnent des résultats très différents. Demande au prof laquelle il attend. Voici la version par tranches, écrite par ToumaiLearn et exécutée :

```java nontest
double prix_HT;
if (consomation <= 100)
    prix_HT = consomation * 0.6;
else if (consomation <= 150)
    prix_HT = 100 * 0.6 + (consomation - 100) * 0.9;
else
    prix_HT = 100 * 0.6 + 50 * 0.9 + (consomation - 150) * 1.1;
```

```grille Total TTC selon la version (résultats d'exécution, arrondis)
#cols: Consommation | Fourni | Tranches
80 kWh | 52.8 | 52.8
120 kWh | *118.8 | !85.8
200 kWh | *242.0 | !176.0
```

Avec le corrigé fourni, passer de 99 à 100 kWh fait bondir la facture : c'est le signe que le calcul n'est pas « par tranches ».

## Idée 2 · TD 2, exercice 3 : le calcul de l'impôt

**Énoncé, remis au propre.** Un contribuable n'a que son salaire annuel S à déclarer.

1. Nombre de parts : `nbEnfants/2 + 2` s'il est **marié**, `nbEnfants/2 + 1` sinon. S'il a **au moins trois enfants**, il a **une demi-part de plus**.
2. Revenu imposable : R = 0,72 × S.
3. Coefficient familial : QF = R / nbParts.
4. On cherche dans le tableau la **première ligne** où QF ≤ champ1. L'impôt vaut alors `champ2 × R − champ3 × nbParts`. Si aucune ligne ne convient, on prend la dernière : `0.65 × R − 49062 × nbParts`.

> [!attention] L'énoncé imprimé contient une phrase incohérente : « +1 s'il est **pas divorcé**, +2 s'il est marié ». Il faut lire « +1 s'il **n'est pas marié** ». C'est ce que fait le corrigé.

Le cœur du corrigé fourni :

```java nontest
if (Etat_Civil == 1)
    nbParts = (nbEnfants/2) + 2;
else
    nbParts = (nbEnfants/2) + 1;

if (nbEnfants >= 3)
    nbParts += 0.5 * nbParts;

double RevenuImposable = 0.72 * S;
double Coef_Familial = RevenuImposable / nbParts;

double[] champ1 = {12620.0,13190,15640,24740,31810,39970,48360,55790,92970,127860,151250,172040,195000,0};
double[] champ2 = {0,0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.50,0.55,0.60,0.65};
double[] champ3 = {0,631,1290.5,2072.5,3309.5,4900,6898.5,9316.5,12106,16754.5,23147.5,30710,39312,49062};

double Impot = 0.0;
boolean b = false;
for (int i = 0; i < champ1.length; i++) {
    if (Coef_Familial <= champ1[i]) {
        Impot = champ2[i]*RevenuImposable - champ3[i]*nbParts;
        b = true;
        break;
    }
}
if (b == false) {
    Impot = 0.65*RevenuImposable - 49062*nbParts;
}
```

> [!attention] **Deux bugs dans ce corrigé**, vérifiés par exécution :
>
> 1. **`nbEnfants/2` est une division entière** (les deux sont des `int`). Pour 3 enfants, on obtient 1 au lieu de 1,5. Il faut écrire `nbEnfants / 2.0`.
> 2. **`nbParts += 0.5 * nbParts`** ajoute la **moitié du nombre de parts**, pas « une demi-part ». Il faut écrire `nbParts += 0.5;`.

```etapes Marié, 3 enfants, salaire 200 000 : les deux calculs
Selon l'énoncé :: nbParts = 3/2 + 2 = 3,5, puis + 0,5 (trois enfants) = **4**.
Selon le corrigé fourni :: `3/2` vaut 1 (division entière), donc 1 + 2 = 3, puis `3 + 0.5 × 3` = **4,5**. Résultat différent.
Suite, avec nbParts = 4 :: R = 0,72 × 200 000 = 144 000. QF = 144 000 / 4 = 36 000.
Recherche de la ligne :: La première ligne où 36 000 ≤ champ1 est `39970  0.25  4900`.
Impôt :: 0,25 × 144 000 − 4 900 × 4 = 36 000 − 19 600 = **16 400**.
Avec le corrigé fourni :: nbParts = 4,5 donne QF = 32 000, même ligne, impôt = 36 000 − 22 050 = **13 950**. L'écart vient uniquement des deux bugs.
```

La version corrigée du calcul des parts (testée : elle donne bien 4,0 parts et 16 400 d'impôt) :

```java nontest
if (Etat_Civil == 1)
    nbParts = nbEnfants / 2.0 + 2;
else
    nbParts = nbEnfants / 2.0 + 1;

if (nbEnfants >= 3)
    nbParts += 0.5;
```

> [!retenir] La technique de l'exercice : **trois tableaux parallèles** (`champ1`, `champ2`, `champ3`) parcourus avec le même indice, un **`break`** dès que la ligne est trouvée, et un **booléen** pour savoir si on a trouvé.

## Idée 3 · TD 2, exercices 4 à 6 : les suites

**Exercice 4 · Suite de « Fibonacci »** avec U0 = 7, U1 = 4, Un = Un-1 + Un-2.

```java nontest
int a = 7, b = 4, c = 0, n;
Scanner sc = new Scanner(System.in);
System.out.println("Entrer une valeur de n>=2: ");
n = sc.nextInt();
if (n >= 2) {
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    System.out.println("Valeur Fibonacci U" + n + ": " + c);
}
else
    System.out.println("Impossible! Entrer une valeur de n>=2! ");
```

```grille Les premiers termes (vérifiés par exécution)
#cols: U0 | U1 | U2 | U3 | U4 | U5
7 | 4 | *11 | *15 | *26 | *41
```

```etapes Le glissement des trois variables, pour n = 3
Départ :: a = 7 (U0), b = 4 (U1).
Tour i = 2 :: c = a + b = 11 (U2). Puis on décale : a = 4, b = 11.
Tour i = 3 :: c = a + b = 15 (U3). Puis on décale : a = 11, b = 15.
Fin :: On affiche c : `Valeur Fibonacci U3: 15`.
```

> [!attention] Le programme refuse n = 0 et n = 1, alors que U0 = 7 et U1 = 4 sont connus. Une version complète afficherait 7 pour n = 0 et 4 pour n = 1.

**Exercice 5 · Suites Un et Vn.** Sur le support fourni, les formules des deux suites sont une **image qui n'a pas pu être lue**. D'après le corrigé, les suites calculées sont : U0 = 1, V0 = 0, puis U(n) = V(n−1) + 1 et V(n) = 2 × U(n).

```java nontest
int U = 1, V = 0, n;
n = sc.nextInt();
if (n >= 1)
    for (int i = 0; i <= n; i++) {
        System.out.println("U(" + i + ") = " + U);
        System.out.println("V(" + i + ") = " + V);
        U = V + 1;
        V = 2 * U;
    }
```

```grille Termes affichés pour n = 3 (vérifiés par exécution)
#cols: n | 0 | 1 | 2 | 3
U(n) | 1 | 1 | 3 | 7
V(n) | 0 | 2 | 6 | 14
```

> [!attention] Vérifie ces formules avec ton énoncé papier : elles sont **déduites du corrigé**, pas lues dans l'énoncé.

**Exercice 6 · Suite de Syracuse.** U0 = P. Si Un-1 est pair, Un = Un-1 / 2 ; sinon Un = 3 × Un-1 + 1. On cherche le plus petit n tel que Un = 1, et on affiche tous les termes.

```java nontest
int U, P;
P = sc.nextInt();
U = P;
int i = 0;
while (U != 1) {
    System.out.println("U(" + i + ") = " + U);
    if (U % 2 == 0)
        U = U / 2;
    else
        U = 3 * U + 1;
    i++;
}
System.out.println("U(" + i + ") = " + U);
```

```grille Syracuse pour P = 6 : on atteint 1 à n = 8 (vérifié)
#rows: U0→U4 | U5→U8
6 | 3 | 10 | 5 | 16
8 | 4 | 2 | *1 | ~
```

> [!retenir] Quand on **ne connaît pas à l'avance** le nombre de tours, on utilise `while` (Syracuse). Quand on le connaît, `for` (factorielle, Fibonacci). Le test de parité s'écrit `U % 2 == 0`.

## Idée 4 · TD 3, exercice 1 : la classe Complexe

Un complexe a une partie réelle et une partie imaginaire. La classe offre somme, soustraction, multiplication et division. Les getters et setters sont au chapitre 7.

```java nontest
public class Complexe {
    private double Img, Reel;
    // getReel, getImg, setReel, setImg : voir chapitre 7

    public Complexe Somme(Complexe W) {
        Complexe res = new Complexe();
        res.Reel = this.Reel + W.Reel;
        res.Img = this.Img + W.Img;
        return res;
    }

    public Complexe Sous(Complexe W) {
        Complexe res = new Complexe();
        res.Reel = this.Reel - W.Reel;
        res.Img = this.Img - W.Img;
        return res;
    }

    // (a + ib)(c + id) = (ac - bd) + i(ad + bc)
    public Complexe Multiplication(Complexe W) {
        Complexe res = new Complexe();
        res.Reel = this.Reel * W.Reel - this.Img * W.Img;
        res.Img = this.Reel * W.Img + this.Img * W.Reel;
        return res;
    }

    // (a + ib)/(c + id) = ((ac + bd) + i(bc - ad)) / (c*c + d*d)
    public Complexe Division(Complexe W) {
        Complexe res = new Complexe();
        double Mod = W.Reel * W.Reel + W.Img * W.Img;
        if (Mod != 0) {
            res.Reel = (this.Reel * W.Reel + this.Img * W.Img) / Mod;
            res.Img = (this.Img * W.Reel - this.Reel * W.Img) / Mod;
        }
        else
            System.out.println("Erreur: Division par 0!!! ");
        return res;
    }
}
```

Le programme de test, avec z1 = 3 + 2i et z2 = 1 − 4i :

```java nontest
Complexe z1 = new Complexe();
z1.setReel(3);
z1.setImg(2);
Complexe z2 = new Complexe();
z2.setReel(1);
z2.setImg(-4);

Complexe s = z1.Somme(z2);
System.out.println("Somme : " + s.getReel() + " + i(" + s.getImg() + ")");
// même affichage pour Sous, Multiplication et Division
```

```sortie
Somme : 4.0 + i(-2.0)
Soustraction : 2.0 + i(6.0)
Multiplication : 11.0 + i(-10.0)
Division : -0.29411764705882354 + i(0.8235294117647058)
```

```etapes Vérifier la multiplication à la main : (3 + 2i)(1 − 4i)
On identifie :: a = 3, b = 2, c = 1, d = −4.
Partie réelle : ac − bd :: 3 × 1 − 2 × (−4) = 3 + 8 = **11**.
Partie imaginaire : ad + bc :: 3 × (−4) + 2 × 1 = −12 + 2 = **−10**.
Résultat :: 11 − 10i, comme l'affiche le programme.
```

Les trois idées de cet exercice :

| Idée | Où la voir |
|---|---|
| Une méthode **reçoit un objet** et **renvoie un nouvel objet** | `public Complexe Somme(Complexe W)` |
| On crée le résultat avec `new`, on le remplit, on le renvoie | `Complexe res = new Complexe(); ... return res;` |
| `this` est l'objet de gauche, `W` celui de droite | `z1.Somme(z2)` : `this` = z1, `W` = z2 |

> [!prof] Le corrigé note en commentaire : « si on avait un constructeur, on pourrait écrire `return new Complexe(this.Reel + W.Reel, this.Img + W.Img);` ». Sache écrire les deux versions.

> [!attention] En cas de division par zéro, `Division` affiche un message **puis renvoie quand même** un complexe 0 + 0i. Le programme appelant ne peut pas savoir que le résultat est invalide. C'est une faiblesse de robustesse (chapitre 1), pas une erreur de calcul.

## Idée 5 · TD 3, exercice 2 : la classe Rationnel

```java nontest
public class Rationnel {
    private int num, denom;

    public Rationnel(int x, int y) {
        if (y != 0) {
            this.num = x;
            this.denom = y;
        } else {
            System.out.println("Erreur");
        }
    }

    public void Affiche() {
        System.out.println("(" + this.num + " / " + this.denom + ")");
    }

    public Rationnel Addition(Rationnel r) {
        Rationnel res = new Rationnel(0, 1);
        res.num = this.num * r.denom + this.denom * r.num;
        res.denom = this.denom * r.denom;
        return res;
    }

    public Rationnel Multiplication(Rationnel a) {
        Rationnel res = new Rationnel(0, 1);
        res.num = this.num * a.num;
        res.denom = this.denom * a.denom;
        return res;
    }

    // (a/b) / (c/d) = ad / bc
    public Rationnel Division(Rationnel d) {
        return new Rationnel(this.num * d.denom, this.denom * d.num);
    }
}
```

Test avec r1 = 1/2, r2 = 3/4, r3 = 5/6 :

```java nontest
System.out.print("r1 + r2 = ");
r1.Addition(r2).Affiche();
System.out.print("r2 * r3 = ");
r2.Multiplication(r3).Affiche();
System.out.print("r1 / r3 = ");
r1.Division(r3).Affiche();
```

```sortie
r1 + r2 = (10 / 8)
r2 * r3 = (15 / 24)
r1 / r3 = (6 / 10)
```

```etapes Vérifier l'addition à la main : 1/2 + 3/4
La formule :: a/b + c/d = (ad + bc) / (bd).
Numérateur :: 1 × 4 + 2 × 3 = 4 + 6 = **10**.
Dénominateur :: 2 × 4 = **8**.
Résultat :: 10/8, comme l'affiche le programme. La fraction n'est **pas simplifiée** (elle vaut 5/4).
```

Deux points à remarquer :

- `r1.Addition(r2).Affiche()` **enchaîne** deux appels : `Addition` renvoie un Rationnel, sur lequel on appelle aussitôt `Affiche`.
- `new Rationnel(0, 1)` crée un rationnel « neutre » que l'on remplit ensuite. Il faut des arguments, car la classe n'a **pas de constructeur sans paramètre**.

> [!attention] Trois limites du corrigé, vérifiées par exécution :
>
> 1. **Dénominateur nul** : `new Rationnel(1, 0)` affiche « Erreur », mais l'objet est créé quand même, avec `num = 0` et `denom = 0`. `Affiche()` donne `(0 / 0)`.
> 2. **Division par un rationnel nul** : le commentaire dit « c doit être non nul », mais rien ne le vérifie.
> 3. **Pas de simplification** : 10/8 reste 10/8.

## S'exercer

```exercice À refaire sans regarder
? Facture, question 1 : prix unitaire 0,8 DH, ancien index 150, nouvel index 250. Quel est le prix total ?
reponse: 88
= Consommation : 100 kWh. Hors taxe : 100 × 0,8 = 80. Taxe : 8. Total : 88 DH.

? Suite de l'exercice 4 (U0 = 7, U1 = 4). Que vaut U4 ?
reponse: 26
= U2 = 11, U3 = 15, U4 = 11 + 15 = 26.

? Syracuse avec P = 5 : quel est le plus petit n tel que Un = 1 ?
reponse: 5
indice: Écris les termes un par un.
= 5, 16, 8, 4, 2, 1 : U5 = 1, donc n = 5.

? Quel est le produit (1 + 2i)(3 + i) ? Donne la partie réelle.
reponse: 1
= ac − bd = 1 × 3 − 2 × 1 = 1. Partie imaginaire : ad + bc = 1 + 6 = 7. Résultat : 1 + 7i.

? Avec la classe Rationnel du TD, qu'affiche `new Rationnel(1, 3).Addition(new Rationnel(1, 6)).Affiche();` ?
= `(9 / 18)`. Numérateur : 1 × 6 + 3 × 1 = 9. Dénominateur : 3 × 6 = 18. La fraction n'est pas simplifiée.

? Dans l'exercice de l'impôt, pourquoi `nbEnfants/2` donne-t-il un résultat faux pour 3 enfants ?
= Parce que `nbEnfants` et `2` sont des entiers : la division est entière et donne 1 au lieu de 1,5. Il faut écrire `nbEnfants / 2.0`.

? Marié, 2 enfants, salaire annuel 200 000. Calcule l'impôt en suivant l'énoncé.
indice: nbParts = 2/2 + 2 = 3. Puis R, QF, et la bonne ligne du tableau.
= nbParts = 3. R = 144 000. QF = 48 000. Première ligne où QF ≤ champ1 : `48360  0.3  6898.5`. Impôt = 0,3 × 144 000 − 6 898,5 × 3 = 43 200 − 20 695,5 = **22 504,5**. (Vérifié par exécution.)
```

## Flashcards

```cartes
Calcul d'une facture TTC (TD 2) :: consommation = nouvel index − ancien index ; HT = consommation × prix ; TTC = HT + HT × taxe.
Bug du corrigé « facture par tranches » :: Il applique le prix de la tranche atteinte à toute la consommation, au lieu de facturer chaque tranche à son prix.
Les 2 bugs du corrigé de l'impôt :: nbEnfants/2 est une division entière ; nbParts += 0.5 * nbParts ajoute la moitié des parts au lieu d'une demi-part.
Technique des tableaux parallèles :: Plusieurs tableaux parcourus avec le même indice (champ1[i], champ2[i], champ3[i]).
Calculer une suite Un = Un-1 + Un-2 avec 3 variables :: c = a + b; a = b; b = c; à chaque tour.
Tester si U est pair :: U % 2 == 0
Syracuse : quelle boucle ? :: while (U != 1), car on ne connaît pas le nombre de tours à l'avance.
Produit de deux complexes (a + ib)(c + id) :: (ac − bd) + i(ad + bc)
Somme de deux rationnels a/b + c/d :: (ad + bc) / (bd)
Schéma d'une méthode qui renvoie un nouvel objet :: Complexe res = new Complexe(); remplir res ; return res;
Dans z1.Somme(z2), qui est this ? :: z1. Le paramètre W désigne z2.
Que fait r1.Addition(r2).Affiche() ? :: Addition renvoie un Rationnel, sur lequel on appelle aussitôt Affiche : appels enchaînés.
```

## QCM du chapitre

```qcm
? Facture : prix unitaire 0,6 DH, ancien index 100, nouvel index 200, taxe 10 %. Total à payer ?
- 60 DH
+ 66 DH
- 72 DH
= 100 kWh × 0,6 = 60 DH, plus 10 % = 66 DH.

? Dans le corrigé de l'impôt, que vaut `nbEnfants/2` pour 3 enfants (variables `int`) ?
+ 1
- 1.5
- 2
= Division entière. C'est le premier bug du corrigé.

? Que fait `nbParts += 0.5 * nbParts;` ?
- Ajoute une demi-part
+ Ajoute la moitié du nombre de parts actuel
- Divise le nombre de parts par deux
= L'énoncé demande une demi-part de plus : il fallait `nbParts += 0.5;`.

? Suite avec U0 = 7, U1 = 4, Un = Un-1 + Un-2. Que vaut U3 ?
- 11
+ 15
- 26
= U2 = 11, U3 = 4 + 11 = 15.

? Pourquoi la suite de Syracuse est-elle programmée avec un `while` ?
- Parce que `for` n'existe pas en Java
+ Parce qu'on ne connaît pas à l'avance le nombre de tours
- Parce que `while` est plus rapide
= On s'arrête quand U vaut 1, sans savoir quand cela arrivera.

? Syracuse pour P = 6 : pour quel n obtient-on Un = 1 ?
- 6
+ 8
- 10
= 6, 3, 10, 5, 16, 8, 4, 2, 1 : c'est U8.

? Dans `z1.Somme(z2)`, à l'intérieur de la méthode, `this` désigne :
+ z1
- z2
- le résultat
= Le paramètre W désigne z2.

? Que renvoie la méthode `Somme` de la classe Complexe ?
- Rien (void)
- Un double
+ Un nouvel objet Complexe
= Elle crée `res` avec `new`, le remplit et le renvoie.

? (3 + 2i)(1 − 4i) vaut :
- 3 − 8i
+ 11 − 10i
- −5 − 10i
= Réel : 3 × 1 − 2 × (−4) = 11. Imaginaire : 3 × (−4) + 2 × 1 = −10.

? Avec la classe Rationnel du TD, 1/2 + 3/4 s'affiche :
- (5 / 4)
+ (10 / 8)
- (4 / 6)
= (1 × 4 + 2 × 3) / (2 × 4). La classe ne simplifie pas les fractions.

? Avec la classe Rationnel du TD, que se passe-t-il pour `new Rationnel(1, 0)` ?
- Le programme s'arrête
+ « Erreur » est affiché, mais l'objet est créé avec 0 / 0
- L'objet vaut 1 / 1
= Le constructeur affiche le message sans empêcher la création de l'objet.

? Pourquoi écrit-on `new Rationnel(0, 1)` et pas `new Rationnel()` dans `Addition` ?
- Par habitude
+ Parce que la classe n'a pas de constructeur sans paramètre
- Parce que 0/1 est le résultat attendu
= Dès qu'un constructeur est écrit, le constructeur par défaut n'existe plus.
```

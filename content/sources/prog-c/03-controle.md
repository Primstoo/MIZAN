---
id: controle
titre: Tests et boucles (if, switch, while, do-while, for)
seance: Chapitre 3 · Les structures de contrôle
importance: 5
---

## Avant de commencer

Tu dois savoir évaluer une condition (chapitre 2) : en C elle vaut 0 (faux) ou autre chose (vrai).

```exercice Vérifie ton prérequis
? Avec note = 12, que vaut `note >= 10 && note <= 20` ?
reponse: 1
= Les deux comparaisons valent 1, et 1 && 1 = 1.
```

## Comment aborder ce chapitre

> [!astuce] Avant d'écrire une boucle, réponds à trois questions : où je commence ? quand je continue ? comment j'avance ? Ce sont les trois cases du `for`.

> [!piege] Le `;` collé derrière : `for (i = 0; i < 5; i++);` ou `if (x > 0);` ferme l'instruction tout de suite. Le bloc qui suit s'exécute une seule fois, sans condition.

À la fin, tu sais choisir entre `if`, `switch`, `while`, `do…while` et `for`, et tracer une boucle à la main.

## Idée 1 · Instruction simple, bloc

Un `;` termine une instruction. Des `{ }` regroupent plusieurs instructions en **un bloc**, qui compte comme une seule. Sans accolades, `if`/`while`/`for` ne contrôlent **qu'une** instruction.

## Idée 2 · Choisir : if, else if, else

```flux Note d'un module (TD 2, exercice II)
note >= 10 et <= 20 ? -> « module validé » -> sinon note >= 5 ? -> « rattrapage » -> sinon -> « non validé »
```

```c
#include <stdio.h>
void verdict(float note)
{
    if (note < 0 || note > 20)
        printf("%.1f : note invalide\n", note);
    else if (note >= 10)
        printf("%.1f : module valide\n", note);
    else if (note >= 5)
        printf("%.1f : rattrapage du module\n", note);
    else
        printf("%.1f : non valide\n", note);
}
int main(void)
{
    verdict(14); verdict(7.5); verdict(3); verdict(25);
    return 0;
}
```

```sortie
14.0 : module valide
7.5 : rattrapage du module
3.0 : non valide
25.0 : note invalide
```

> [!attention] Dans le cours, le schéma `if … else if … else` place mal les accolades (`{ instruction; else if …` puis `}}` à la fin). Chaque bloc doit être fermé **avant** le `else` : `if (c1) { … } else if (c2) { … } else { … }`.

## Idée 3 · switch : plusieurs valeurs constantes

```c
#include <stdio.h>
int main(void)
{
    int a, b;
    for (a = 1; a <= 5; a++) {
        switch (a) {
            case 1:
            case 2:
            case 3: b = 100; break;
            case 4: b = 200; break;
            default: b = 0; break;
        }
        printf("a=%d -> b=%d\n", a, b);
    }
    return 0;
}
```

```sortie
a=1 -> b=100
a=2 -> b=100
a=3 -> b=100
a=4 -> b=200
a=5 -> b=0
```

> [!piege] Sans `break`, l'exécution **continue dans le case suivant**. C'est voulu pour 1, 2, 3 ci-dessus, mais c'est souvent un oubli. `case` n'accepte que des constantes entières (ou caractères), pas d'intervalle.

## Idée 4 · Les trois boucles

```html
<svg viewBox="0 0 620 200" role="img" aria-label="while teste avant d'exécuter, do-while exécute avant de tester" style="max-width:620px;width:100%">
<g font-family="sans-serif" font-size="14" fill="currentColor" stroke="currentColor">
<text x="80" y="20" stroke="none" font-weight="bold">while</text>
<rect x="30" y="35" width="150" height="40" rx="6" fill="none" stroke="#D9824F"/>
<text x="55" y="60" stroke="none">condition ?</text>
<rect x="30" y="115" width="150" height="40" rx="6" fill="none"/>
<text x="75" y="140" stroke="none">corps</text>
<line x1="105" y1="75" x2="105" y2="115"/><text x="112" y="100" stroke="none">vrai</text>
<path d="M30 135 H10 V55 H30" fill="none"/>
<line x1="180" y1="55" x2="240" y2="55"/><text x="190" y="48" stroke="none">faux → sortie</text>
<text x="420" y="20" stroke="none" font-weight="bold">do … while</text>
<rect x="370" y="35" width="150" height="40" rx="6" fill="none"/>
<text x="415" y="60" stroke="none">corps</text>
<rect x="370" y="115" width="150" height="40" rx="6" fill="none" stroke="#D9824F"/>
<text x="395" y="140" stroke="none">condition ?</text>
<line x1="445" y1="75" x2="445" y2="115"/>
<path d="M370 135 H350 V55 H370" fill="none"/><text x="300" y="100" stroke="none">vrai</text>
<line x1="520" y1="135" x2="600" y2="135"/><text x="530" y="175" stroke="none">faux → sortie</text>
<text x="350" y="195" stroke="none">le corps s'exécute au moins une fois</text>
</g></svg>
```

`for (expr1; expr2; expr3) corps;` est la même chose que `expr1; while (expr2) { corps; expr3; }`. Chaque expression peut manquer, mais les `;` restent : `for (;;)` est une boucle infinie.

```c
#include <stdio.h>
int main(void)
{
    int n, i;
    float S = 0;
    n = 5;                       /* TD 2 ex. IV : somme des 1/i^2 */
    for (i = 1; i <= n; i++)
        S = S + 1.0 / (i * i);
    printf("S5 = %f\n", S);

    int k = 0;                   /* do-while : au moins un passage */
    do { k++; } while (k < 0);
    printf("k = %d\n", k);
    return 0;
}
```

```sortie
S5 = 1.463611
k = 1
```

> [!piege] Écrire `1 / (i * i)` donne **0** dès i = 2 (division entière). Il faut `1.0 / (i * i)` ou un cast.

## Idée 5 · break et continue

`break` quitte la boucle (ou le `switch`). `continue` passe directement au tour suivant (dans un `for`, `expr3` est quand même exécutée).

```c
#include <stdio.h>
int main(void)
{
    int i;
    for (i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;   /* saute les pairs */
        if (i > 7) break;           /* arrête après 7 */
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

```sortie
1 3 5 7 
```

> [!retenir] Nombre de tours connu → `for`. Condition testée avant → `while`. Saisie à contrôler (au moins une fois) → `do … while`.

## S'exercer

```exercice TD 2 · Exercice I (signe d'un produit)
? Écris le test qui affiche le signe de A*B **sans calculer** A*B.
= `if (A == 0 || B == 0) printf("produit nul");` puis `else if ((A > 0) == (B > 0)) printf("positif");` puis `else printf("negatif");`.
Même signe → positif, signes différents → négatif. Le cas nul se traite en premier.
```

```exercice TD 2 · Exercice V (saisie contrôlée)
? Écris la boucle qui redemande un nombre entre 10 et 20 en affichant « Plus petit ! » ou « Plus grand ! ».
= `do { printf("Nombre : "); scanf("%d", &N); if (N > 20) printf("Plus petit !\n"); else if (N < 10) printf("Plus grand !\n"); } while (N < 10 || N > 20);`
`do … while` car il faut lire au moins une fois.
```

```exercice Tracer un for
? Combien de fois s'exécute le corps de `for (i = 3; i < 10; i += 2)` ?
reponse: 4
= i prend 3, 5, 7, 9 : 4 tours.
```

## Flashcards

```cartes
Différence while / do-while ? :: do-while exécute le corps au moins une fois (test à la fin)
`for(e1; e2; e3) C;` en while ? :: `e1; while (e2) { C; e3; }`
Rôle de break dans un switch ? :: Sortir du switch ; sans lui, on enchaîne sur le case suivant
Boucle infinie avec for ? :: `for (;;)`
continue dans un for ? :: Saute la fin du corps, exécute e3 puis reteste e2
Danger de `if (x > 0);` ? :: Le `;` termine le if : le bloc suivant s'exécute toujours
Que peut suivre `case` ? :: Une constante entière ou caractère
```

## QCM du chapitre

```qcm
? Quelle boucle exécute son corps au moins une fois ?
- while
+ do … while
- for
= Le test est placé après le corps.

? `for (i = 0; i < 5; i++)` : combien de tours ?
- 4
+ 5
- 6
= i = 0, 1, 2, 3, 4.

? Dans un switch, si on oublie `break` :
- Erreur de compilation
+ On exécute aussi les cases suivants
- On sort du switch
= C'est le « fall-through ».

? Que vaut S après `float S=0; for(i=1;i<=3;i++) S += 1/(i*i);` ?
- 1.361
+ 1.0
- 0
= 1/(1)=1 puis 1/4 et 1/9 valent 0 en division entière.

? `continue` dans une boucle :
- Quitte la boucle
+ Passe au tour suivant
- Recommence la boucle depuis le début
= `break` quitte, `continue` saute au tour suivant.

? `for (;;)` est :
+ Une boucle infinie
- Une erreur de syntaxe
- Une boucle qui ne s'exécute pas
= Une condition absente est considérée comme vraie.

? Pour une saisie à vérifier (redemander tant qu'elle est fausse), on préfère :
- for
+ do … while
- switch
= Il faut lire au moins une fois avant de tester.

? `if (n > 0) a = 1; b = 2;` : b = 2 est exécuté…
- Seulement si n > 0
+ Toujours
- Jamais
= Sans accolades, le if ne contrôle qu'une instruction.

? `switch` peut tester :
- Un intervalle comme 10..20
+ Des valeurs constantes entières ou caractères
- Des chaînes de caractères
= `case` n'accepte que des constantes entières.

? Que contient l'expression 2 de `for(e1; e2; e3)` ?
- L'initialisation
+ La condition de continuation
- L'incrémentation
= e2 est testée avant chaque tour ; c'est une condition de répétition, pas d'arrêt.
```

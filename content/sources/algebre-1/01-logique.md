---
id: logique
titre: Éléments de logique
seance: Chapitre 1 · §1.1 du polycopié
importance: 5
---

## Avant de commencer

Il te faut une seule chose : savoir dire si une phrase mathématique simple est vraie ou fausse, comme « $2 < 4$ » ou « $\sqrt 2$ est rationnel ».

```exercice Vérifie ton prérequis
? La phrase « $x^2 = 4$ » est-elle une proposition (au sens du cours) ?
indice: Peut-on lui donner une valeur vraie ou fausse sans connaître x ?
= Non. Elle dépend de la variable $x$ : c'est un **prédicat**. Elle devient une proposition quand on fixe $x$ (vraie pour $x = 2$, fausse pour $x = 3$) ou quand on la quantifie : « $\exists x \in \mathbb R,\ x^2 = 4$ » est une proposition vraie.
```

## Comment aborder ce chapitre

> [!astuce] **Tout se ramène à des tables de vérité.** Quand tu doutes d'une règle (négation, implication), dresse la table : 4 lignes pour deux propositions, et le doute disparaît.

> [!piege] Croire que « $A \Rightarrow B$ » est faux quand $A$ est faux. C'est l'inverse : **si l'hypothèse est fausse, l'implication est vraie**. « La Terre est plate $\Rightarrow$ l'Homme est un poisson » est une implication vraie.

À la fin, tu sais nier n'importe quelle phrase avec quantificateurs et distinguer condition nécessaire et condition suffisante.

## Idée 1 · Trois connecteurs et leur table

Le cours définit, pour deux propositions $A$ et $B$ : la négation $\neg A$, la conjonction $A \wedge B$ (« et ») et la disjonction $A \vee B$ (« ou » **non exclusif**).

```grille Table de vérité (V = vrai, F = faux)
#cols: A B ¬A A∧B A∨B A⇒B A⇔B
#rows: 1 2 3 4
V V F *V *V *V *V
V F F F *V !F F
F V V F *V *V F
F F V F F *V *V
```

Lis la colonne $A \Rightarrow B$ : elle n'est fausse **qu'une seule fois**, quand $A$ est vrai et $B$ faux (« du vrai n'entraîne pas du faux »).

Règles à connaître (Résultat 1 du polycopié) : $\wedge$ et $\vee$ sont commutatifs et associatifs, et chacun est distributif sur l'autre :
$A \wedge (B \vee C) \equiv (A \wedge B) \vee (A \wedge C)$ et $A \vee (B \wedge C) \equiv (A \vee B) \wedge (A \vee C)$.

Lois de De Morgan : $\neg(A \wedge B) \equiv \neg A \vee \neg B$ et $\neg(A \vee B) \equiv \neg A \wedge \neg B$.

## Idée 2 · L'implication est un « ou » déguisé

Le prof **définit** $A \Rightarrow B$ comme la proposition $(\neg A) \vee B$. Tout le reste en découle.

```flux De la définition à la négation
A ⇒ B -> (¬A) ∨ B -> négation : A ∧ ¬B
```

- Négation : $\neg(A \Rightarrow B) \equiv A \wedge \neg B$. « Il pleut et je ne prends pas mon parapluie » contredit « s'il pleut, je prends mon parapluie ».
- Contraposée : $(A \Rightarrow B) \equiv (\neg B \Rightarrow \neg A)$, car les deux valent $\neg A \vee B$.
- Équivalence : $A \Leftrightarrow B$ signifie $(A \Rightarrow B)$ et $(B \Rightarrow A)$.

**Exemple chiffré.** $A$ : « $x = 2$ », $B$ : « $x^2 = 4$ ». $A \Rightarrow B$ est vraie pour tout réel $x$. Sa réciproque $B \Rightarrow A$ est fausse pour $x = -2$.

> [!prof] On n'emploie **jamais** les symboles $\Rightarrow$ et $\Leftrightarrow$ dans une rédaction : on écrit « donc », « si… alors », « or », « car ». Écrire « $2$ pair $\Rightarrow 3$ impair » n'affirme pas que 3 est impair ; écrire « donc 3 impair » l'affirme.

## Idée 3 · Condition nécessaire, condition suffisante

```html
<svg viewBox="0 0 420 170" style="width:100%;max-width:460px;display:block;margin:10px auto" role="img" aria-label="Le disque A est inclus dans le disque B : A est suffisant pour B, B est nécessaire pour A">
<ellipse cx="210" cy="85" rx="190" ry="75" fill="none" stroke="currentColor" stroke-width="2"/>
<ellipse cx="170" cy="90" rx="80" ry="42" fill="#D9824F" fill-opacity="0.25" stroke="#D9824F" stroke-width="2"/>
<g font-family="sans-serif" font-size="14" fill="currentColor">
<text x="150" y="95" font-weight="700">A</text>
<text x="320" y="60" font-weight="700">B</text>
<text x="40" y="160" font-size="12">A ⇒ B : A est suffisant pour B, B est nécessaire pour A</text></g>
</svg>
```

Quand $A \Rightarrow B$ :

- $A$ est une **condition suffisante** pour $B$ : il suffit que $A$ soit vraie pour que $B$ le soit ;
- $B$ est une **condition nécessaire** pour $A$ : pour que $A$ soit vraie, il faut que $B$ le soit.

**Exemple (exercice 6 du polycopié).** « Pour que $\ln(x + 2)$ soit défini, il faut que $x > -2$. » C'est même nécessaire et suffisant.

> [!attention] L'exercice 6 du polycopié liste des phrases volontairement fausses à **corriger** (« pour qu'un réel soit positif, il faut que $x > 0$ » est faux : $0$ est positif sans être $> 0$ ; la bonne phrase est « il suffit que $x > 0$ »). Ne les apprends pas telles quelles.

## Idée 4 · Quantificateurs et négation

$\forall x \in E,\ A(x)$ : « pour tout $x$ de $E$ » ; $\exists x \in E,\ A(x)$ : « il existe au moins un $x$ » ; $\exists !$ : « il existe un unique ».

```etapes Nier une phrase quantifiée
On échange les quantificateurs :: $\forall$ devient $\exists$ et $\exists$ devient $\forall$, sans changer leur place ni l'ensemble.
On nie la propriété finale :: $=$ devient $\neq$, $<$ devient $\ge$, $\le$ devient $>$.
On échange « et » et « ou » :: et $\neg(A \Rightarrow B)$ devient $A \wedge \neg B$.
Exemple :: La négation de $\forall x > 0,\ e^x > 1$ est $\exists x > 0,\ e^x \le 1$.
```

> [!piege] **On ne permute pas un $\forall$ et un $\exists$.** « $\forall y \in \mathbb R,\ \exists x \in \mathbb R,\ 2x = y$ » est vraie ($x = y/2$). « $\exists x \in \mathbb R,\ \forall y \in \mathbb R,\ 2x = y$ » est fausse (un seul $x$ ne peut pas donner tous les $y$). Deux $\forall$ (ou deux $\exists$) consécutifs, eux, s'échangent.

Résultat 5 du polycopié : « $\forall x,\ (P(x) \vee Q(x))$ » n'équivaut **pas** à « $(\forall x,\ P(x)) \vee (\forall x,\ Q(x))$ ». Contre-exemple : tout entier est pair ou impair, mais tous les entiers ne sont pas pairs, ni tous impairs.

## S'exercer

```exercice Exercices du polycopié
? Écris la négation de : $\forall x \in E,\ (|x| > 2 \Rightarrow x > 2)$. Puis dis si la phrase est vraie dans $E = \mathbb R$.
indice: ¬(A ⇒ B) ≡ A ∧ ¬B.
= Négation : $\exists x \in E,\ (|x| > 2 \text{ et } x \le 2)$. Dans $\mathbb R$, $x = -3$ convient ($|-3| = 3 > 2$ et $-3 \le 2$) : la négation est vraie, donc la phrase de départ est **fausse**.

? On donne : « J'ai une fille $\Rightarrow$ l'Homme est un poisson » et « l'Homme est un poisson $\Rightarrow$ j'ai quatre filles ». Ai-je une fille ? Ai-je quatre filles ?
indice: L'Homme n'est pas un poisson. Utilise la contraposée.
= « L'Homme est un poisson » est faux. Par contraposée de la première, « je n'ai pas de fille » : **non**, je n'ai pas de fille, donc **non** plus quatre. La seconde implication est vraie (hypothèse fausse) et n'apprend rien.

? Valeur logique de $P$ : $\exists x \in \mathbb R,\ \forall y \in \mathbb R,\ x^2 + 2xy = 1$.
indice: Essaie y = 0 puis y = 1 avec le même x.
= Fausse. Si un tel $x$ existe, $y = 0$ donne $x^2 = 1$, et $y = 1$ donne $x^2 + 2x = 1$, donc $2x = 0$, $x = 0$, ce qui contredit $x^2 = 1$.
```

## Flashcards

```cartes
Quand $A \Rightarrow B$ est-elle fausse ? :: Seulement quand $A$ est vraie et $B$ fausse.
Définition de $A \Rightarrow B$ dans le cours :: La proposition $(\neg A) \vee B$.
Négation de $A \Rightarrow B$ :: $A \wedge \neg B$.
Contraposée de $A \Rightarrow B$ :: $\neg B \Rightarrow \neg A$ (même valeur logique).
Si $A \Rightarrow B$, qui est nécessaire ? :: $B$ est une condition nécessaire pour $A$ ; $A$ est suffisante pour $B$.
Négation de $\forall x,\ P(x)$ :: $\exists x,\ \neg P(x)$.
Peut-on échanger $\forall x\ \exists y$ en $\exists y\ \forall x$ ? :: Non, le sens change (« tout homme a une mère » contre « une même femme est mère de tous »).
Lois de De Morgan :: $\neg(A\wedge B) \equiv \neg A \vee \neg B$ et $\neg(A \vee B) \equiv \neg A \wedge \neg B$.
```

## QCM du chapitre

```qcm
? Si $A$ est fausse, l'implication $A \Rightarrow B$ est :
- toujours fausse
+ toujours vraie
- vraie seulement si $B$ est vraie
= $A \Rightarrow B$ vaut $(\neg A) \vee B$ ; avec $\neg A$ vraie, le « ou » est vrai.

? La négation de $A \Rightarrow B$ est :
- $\neg A \Rightarrow \neg B$
+ $A \wedge \neg B$
- $\neg A \vee B$
= La seule ligne où l'implication est fausse : $A$ vraie et $B$ fausse.

? La contraposée de « si $n$ est pair, alors $n^2$ est pair » est :
- si $n^2$ est pair, alors $n$ est pair
+ si $n^2$ est impair, alors $n$ est impair
- si $n$ est impair, alors $n^2$ est impair
= Contraposée de $A \Rightarrow B$ : $\neg B \Rightarrow \neg A$. La première option est la réciproque.

? La négation de $\forall x > 0,\ e^x > 1$ est :
- $\forall x > 0,\ e^x \le 1$
+ $\exists x > 0,\ e^x \le 1$
- $\exists x \le 0,\ e^x \le 1$
= On change $\forall$ en $\exists$ sans toucher au domaine $x > 0$, et $>$ devient $\le$.

? « $\forall y \in \mathbb R,\ \exists x \in \mathbb R,\ 2x = y$ » est :
+ vraie
- fausse
- ni vraie ni fausse
= Pour chaque $y$, on prend $x = y/2$.

? « $\exists x \in \mathbb R,\ \forall y \in \mathbb R,\ 2x = y$ » est :
- vraie
+ fausse
- équivalente à la question précédente
= Un seul $x$ fixé donne une seule valeur $2x$ ; $y = 2x + 1$ est un contre-exemple. Permuter $\forall$ et $\exists$ change le sens.

? « Pour que $x \ge 1$, il suffit que $x > 2$ ». Ici $x > 2$ est :
+ une condition suffisante pour $x \ge 1$
- une condition nécessaire pour $x \ge 1$
- une condition nécessaire et suffisante
= $x > 2 \Rightarrow x \ge 1$, mais pas l'inverse ($x = 1$).

? $A \vee (B \wedge C)$ équivaut à :
- $(A \vee B) \vee C$
+ $(A \vee B) \wedge (A \vee C)$
- $(A \wedge B) \vee (A \wedge C)$
= $\vee$ est distributif sur $\wedge$ (Résultat 1 du cours).

? La négation de « tous les chats sont gris » est :
- tous les chats ne sont pas gris
+ il existe au moins un chat qui n'est pas gris
- aucun chat n'est gris
= $\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x)$ : un seul contre-exemple suffit.

? Le « ou » mathématique est :
+ inclusif : $A \vee B$ est vraie si au moins une des deux est vraie
- exclusif : une seule des deux doit être vraie
- vrai seulement si les deux sont vraies
= Le cours précise que « ou » n'est pas exclusif.
```

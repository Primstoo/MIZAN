---
id: applications
titre: Applications, injections, surjections, bijections
seance: Chapitre 2 · §2.1 et 2.2 du polycopié
importance: 5
---

## Avant de commencer

Il te faut savoir rédiger un « Soit $x \in E$ » et une implication (chapitre 2).

```exercice Vérifie ton prérequis
? $f(x) = 1/x$ définit-elle une application de $\mathbb R$ dans $\mathbb R$ ?
= Non : $0$ n'a pas d'image. Sa restriction à $\mathbb R^*$ est une application (exemple 4 du polycopié).
```

## Comment aborder ce chapitre

> [!astuce] **Pense « équation ».** Pour $y \in F$, combien de solutions a $f(x) = y$ ? Au plus une : injective. Au moins une : surjective. Exactement une : bijective.

> [!piege] Oublier que l'injectivité dépend des ensembles. $x \mapsto x^2$ n'est pas injective sur $\mathbb R$, mais l'est sur $[0 ; 1[$.

À la fin, tu sais prouver qu'une application est injective, surjective ou bijective et calculer images directes et réciproques.

## Idée 1 · Une application, des ensembles et un graphe

Une application $f : E \to F$ associe à **chaque** $x \in E$ **une seule** image $f(x) \in F$. Deux applications sont égales si elles ont même départ, même arrivée et même graphe.

> [!attention] Le polycopié écrit que $f : \mathbb R \to \mathbb R,\ x \mapsto x^2$ et $g : \mathbb R \to \mathbb R,\ x \mapsto x^2$ « ne sont pas égales » : l'ensemble d'arrivée de $g$ a été perdu. Lis $g : \mathbb R \to \mathbb R_+$. Même formule, arrivées différentes : applications différentes.

Composée : $(g \circ f)(x) = g(f(x))$. Elle est associative mais **pas commutative**. Ex. $f(x) = x + 1$ : $f^n(x) = x + n$.

## Idée 2 · Injective, surjective, bijective

```html
<svg viewBox="0 0 600 170" style="width:100%;max-width:620px;display:block;margin:10px auto" role="img" aria-label="Trois diagrammes sagittaux : injective, surjective, bijective">
<g fill="none" stroke="currentColor" stroke-width="2">
<ellipse cx="40" cy="85" rx="25" ry="60"/><ellipse cx="140" cy="85" rx="25" ry="70"/>
<ellipse cx="240" cy="85" rx="25" ry="70"/><ellipse cx="340" cy="85" rx="25" ry="50"/>
<ellipse cx="440" cy="85" rx="25" ry="60"/><ellipse cx="540" cy="85" rx="25" ry="60"/></g>
<g stroke="#D9824F" stroke-width="2">
<line x1="45" y1="50" x2="135" y2="35"/><line x1="45" y1="85" x2="135" y2="75"/><line x1="45" y1="120" x2="135" y2="115"/>
<line x1="245" y1="40" x2="335" y2="60"/><line x1="245" y1="75" x2="335" y2="60"/><line x1="245" y1="110" x2="335" y2="110"/><line x1="245" y1="140" x2="335" y2="110"/>
<line x1="445" y1="50" x2="535" y2="50"/><line x1="445" y1="85" x2="535" y2="85"/><line x1="445" y1="120" x2="535" y2="120"/></g>
<g fill="currentColor"><circle cx="135" cy="150" r="4"/></g>
<g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle">
<text x="90" y="166">injective</text><text x="290" y="166">surjective</text><text x="490" y="166">bijective</text></g>
</svg>
```

- **Injective** : $\forall x, x' \in E,\ f(x) = f(x') \Rightarrow x = x'$ (un point d'arrivée isolé est permis, pas deux flèches vers le même point).
- **Surjective** : $\forall y \in F,\ \exists x \in E,\ y = f(x)$, c'est-à-dire $f(E) = F$.
- **Bijective** : injective et surjective ; alors $f^{-1}$ existe, $f^{-1} \circ f = \mathrm{id}_E$, $f \circ f^{-1} = \mathrm{id}_F$, et $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.

```etapes Prouver que f(x) = (x+1)/(x−1) est injective sur R∖{1} (exemple 7)
On suppose f(x) = f(x') :: $\frac{x+1}{x-1} = \frac{x'+1}{x'-1}$.
On fait le produit en croix :: $(x+1)(x'-1) = (x'+1)(x-1)$, soit $xx' - x + x' - 1 = xx' - x' + x - 1$.
On simplifie :: $2x' = 2x$, donc $x = x'$.
Conclusion :: $f$ est injective. Elle n'est pas surjective sur $\mathbb R$ : $f(x) = 1$ n'a pas de solution.
```

Composition (théorèmes 7 et 8) : si $g \circ f$ est injective, alors $f$ est injective ; si $g \circ f$ est surjective, alors $g$ est surjective.

## Idée 3 · Images directes et réciproques

$f(A) = \{f(x) \mid x \in A\}$ (dans $F$) et $f^{-1}(B) = \{x \in E \mid f(x) \in B\}$ (dans $E$). La notation $f^{-1}(B)$ a un sens **même si $f$ n'est pas bijective**.

```grille Ce qui est toujours vrai (orange) et ce qui ne l'est qu'en inclusion (bleu)
#rows: 1 2 3 4
*f(A∪B)=f(A)∪f(B)
!f(A∩B)⊆f(A)∩f(B)
*f⁻¹(A∩B)=f⁻¹(A)∩f⁻¹(B)
!A⊆f⁻¹(f(A))
```

**Exemple.** Avec $f = \cos$ : $A = [-\pi ; 0]$, $B = [0 ; \pi]$ donnent $f(A) \cap f(B) = [-1 ; 1]$ mais $f(A \cap B) = f(\{0\}) = \{1\}$.

> [!attention] Le contre-exemple du polycopié (remarque 21) prend $A = [-\frac\pi2, -\frac{3\pi}2]$, intervalle mal écrit (bornes inversées). L'exemple ci-dessus le remplace.

## S'exercer

```exercice Exercices du polycopié
? Montre que si $g \circ f$ est injective, alors $f$ est injective.
indice: Pars de f(x) = f(x') et applique g.
= Soient $x, x'$ avec $f(x) = f(x')$. Alors $g(f(x)) = g(f(x'))$, donc $x = x'$ par injectivité de $g \circ f$.

? $f : E \to F$ et $g : F \to E$ vérifient $f \circ g = \mathrm{id}_F$ et $g \circ f = \mathrm{id}_E$. Montre que $f$ est bijective de réciproque $g$.
= $g \circ f = \mathrm{id}_E$ est injective, donc $f$ est injective. $f \circ g = \mathrm{id}_F$ est surjective, donc $f$ est surjective. Donc $f$ est bijective, et $f^{-1} = f^{-1} \circ (f \circ g) = g$.

? Avec $f = \sin$, que vaut $f([0 ; \pi[)$ ?
= $[0 ; 1]$ (exemple 12 du polycopié) : $\sin$ croît de 0 à 1 sur $[0 ; \frac\pi2]$ puis redescend sans atteindre 0.
```

## Flashcards

```cartes
Injective (définition pratique) :: $f(x) = f(x') \Rightarrow x = x'$.
Surjective :: Tout $y \in F$ a au moins un antécédent : $f(E) = F$.
Bijective :: Tout $y \in F$ a exactement un antécédent.
$(g\circ f)^{-1}$ :: $f^{-1} \circ g^{-1}$ (l'ordre s'inverse).
Si $g \circ f$ est injective… :: alors $f$ est injective (pas forcément $g$).
Si $g\circ f$ est surjective… :: alors $g$ est surjective (pas forcément $f$).
$f(A \cap B)$ et $f(A)\cap f(B)$ :: Seulement $f(A\cap B) \subseteq f(A) \cap f(B)$.
Involution :: $f \circ f = \mathrm{id}_E$ ; elle est bijective et $f^{-1} = f$ (ex. $x \mapsto 1/x$ sur $\mathbb R^*$).
```

## QCM du chapitre

```qcm
? $h : \mathbb R \to \mathbb R,\ x \mapsto x^2$ est :
- injective
- surjective
+ ni injective ni surjective
= $h(-1) = h(1)$ et $-1$ n'a pas d'antécédent.

? $\exp : \mathbb R \to ]0 ; +\infty[$ est :
- injective seulement
+ bijective
- surjective seulement
= Strictement croissante et d'image $]0;+\infty[$ ; sa réciproque est $\ln$.

? $f$ est surjective si et seulement si :
+ $f(E) = F$
- $f^{-1}(F) = E$
- $f(x) = f(x') \Rightarrow x = x'$
= $f^{-1}(F) = E$ est toujours vrai ; la dernière définit l'injectivité.

? Si $g \circ f$ est surjective, on peut conclure que :
- $f$ est surjective
+ $g$ est surjective
- $f$ et $g$ sont bijectives
= Théorème 8 du cours.

? $(g \circ f)^{-1}$ vaut, pour $f$ et $g$ bijectives :
- $g^{-1} \circ f^{-1}$
+ $f^{-1} \circ g^{-1}$
- $f \circ g$
= On défait d'abord $g$, puis $f$.

? La notation $f^{-1}(B)$ (image réciproque) a un sens :
- seulement si $f$ est bijective
+ pour toute application $f$
- seulement si $f$ est injective
= C'est l'ensemble $\{x \mid f(x) \in B\}$.

? Toujours vrai :
- $f(A \cap B) = f(A) \cap f(B)$
+ $f(A \cup B) = f(A) \cup f(B)$
- $f^{-1}(f(A)) = A$
= Pour l'intersection et $f^{-1}(f(A))$, on n'a qu'une inclusion en général.

? Une fonction strictement monotone sur un intervalle est :
+ injective
- surjective
- constante
= Deux points distincts ont des images distinctes.

? $f : \mathbb R^* \to \mathbb R^*,\ x \mapsto 1/x$ est :
- non injective
+ une involution
- non surjective
= $f \circ f = \mathrm{id}$, donc bijective et égale à sa réciproque.

? Deux applications sont égales si :
- elles ont la même formule
+ elles ont même départ, même arrivée et mêmes images
- elles ont le même ensemble image
= C'est la définition du cours (§2.1.5).
```

---
id: annales-fstbm-bcg
titre: Annales corrigées · deux contrôles FST Béni Mellal (BCG, S3)
seance: Contrôles de Statistique & Probabilité, filière BCG semestre 3, FST Béni Mellal (1 h 30)
importance: 4
payant: true
---

Deux contrôles de la FST Béni Mellal (filière BCG), construits sur le même modèle : questions de cours et dénombrement, statistique sur données groupées, densité de probabilité. Ils entraînent exactement aux mêmes réflexes que nos annales.

> [!attention] Les deux exercices 3 contiennent une erreur d'énoncé : la fonction proposée ne peut pas être une densité. Le corrigé l'explique ; sur ta copie, écris cette justification, c'est ce qui rapporte les points.

## Questions communes aux deux contrôles

```exercice Cours et dénombrement
? Montrer $\sigma^2 = \overline{x^2} - \bar x^2$.
= $\sigma^2 = \frac1N\sum n_i(x_i - \bar x)^2 = \frac1N\sum n_ix_i^2 - 2\bar x\cdot\frac1N\sum n_ix_i + \bar x^2 = \overline{x^2} - 2\bar x^2 + \bar x^2 = \overline{x^2} - \bar x^2$.

? Montrer $E(aX+b) = aE(X)+b$ et $V(aX+b) = a^2V(X)$.
= Linéarité de l'intégrale : $\int(ax+b)f(x)dx = a\int xf + b\int f = aE(X) + b$. Puis $V(aX+b) = E\big[(aX + b - aE(X) - b)^2\big] = a^2E\big[(X - E(X))^2\big] = a^2V(X)$.

? Anagrammes de « HIPPOPOTAME » (contrôle 1).
= 11 lettres, dont P répété 3 fois et O 2 fois : $\frac{11!}{3!\,2!} = 3\,326\,400$.
reponse: 3326400

? Anagrammes de « MONDIAL » et « EFFECTIVE » (contrôle 2).
= MONDIAL : 7 lettres distinctes, $7! = 5040$. EFFECTIVE : 9 lettres, E trois fois, F deux fois : $\frac{9!}{3!\,2!} = 30\,240$.
reponse: 30240
```

> [!piege] Les questions « arc-en-ciel de 7 couleurs avec 5 vertes, 4 jaunes, 2 rouges » et « bouquet de 4 fleurs avec 3 rouges, 4 jaunes, 2 roses » sont ambiguës (fleurs discernables ou non, ordre compté ou non). Écris ton hypothèse d'abord. Fleurs discernables, ordre sans importance : bouquet = $\binom{9}{4} = 126$.

## Statistique sur données groupées (âges de 100 infectés)

```etapes Méthode pour une série en classes d'amplitudes inégales
1. Calcule la densité de chaque classe : effectif ÷ amplitude. La classe modale est celle de plus forte densité (pas de plus fort effectif !).
2. Mode : Mo = borne inf + Δ1/(Δ1 + Δ2) × amplitude, avec Δ1, Δ2 les écarts de densité avec les classes voisines.
3. Quartiles et médiane : effectifs cumulés, puis interpolation linéaire dans la classe qui contient N/4, N/2, 3N/4.
4. Effectif d'un intervalle à cheval : on suppose la répartition uniforme dans chaque classe.
```

| Classe | Contrôle 1 : effectif | densité | Contrôle 2 : effectif | densité |
|---|---|---|---|---|
| [2, 10[ | 8 | 1 | 18 | 2,25 |
| [10, 30[ | 32 | 1,6 | 30 | 1,5 |
| [30, 50[ | 24 | 1,2 | 20 | 1 |
| [50, 90[ | 36 | 0,9 | 32 | 0,8 |

```exercice Exercice 2
? Population, caractère, nature.
= Population : les 100 personnes infectées au Maroc. Caractère : l'âge. Nature : quantitatif continu (regroupé en classes).

? Contrôle 1 : médiane.
= N/2 = 50. Cumulés : 8, 40, 64, 100. La médiane est dans [30, 50[ : $Me = 30 + \frac{50 - 40}{24}\times20 \approx 38{,}33$ ans. Q1 ≈ 20,6 ans ; Q3 ≈ 62,2 ans. Mode : classe [10, 30[ (densité 1,6), $Mo = 10 + \frac{0{,}6}{0{,}6 + 0{,}4}\times 20 = 22$ ans.
reponse: 38.33

? Contrôle 1 : nombre d'infectés entre 10 et 80 ans.
= $32 + 24 + 36\times\frac{80 - 50}{40} = 32 + 24 + 27 = 83$.
reponse: 83

? Contrôle 2 : moyenne et médiane.
= Moyenne avec les centres 6, 20, 40, 70 : $\bar x = \frac{18\cdot6 + 30\cdot20 + 20\cdot40 + 32\cdot70}{100} = 37{,}48$ ans. Médiane : cumulés 18, 48, 68, 100, donc $Me = 30 + \frac{50-48}{20}\times20 = 32$ ans. Q1 ≈ 14,7 ; Q3 = 58,75. Classe modale : [2, 10[ (densité 2,25), $Mo = 2 + \frac{2{,}25}{2{,}25 + 0{,}75}\times 8 = 8$ ans.
reponse: 37.48

? Contrôle 2 : nombre d'infectés entre 8 et 40 ans.
= $18\times\frac{2}{8} + 30 + 20\times\frac{10}{20} = 4{,}5 + 30 + 10 = 44{,}5$, soit environ 44 ou 45 personnes.
```

> [!piege] Au contrôle 2, la classe la plus nombreuse est [50, 90[ (32), mais la classe modale est [2, 10[ : c'est la densité qui compte quand les amplitudes diffèrent.

## Exercice 3 · densité de probabilité

```exercice Exercice 3
? Contrôle 1 : $f = a\cos x$ sur $[-\frac\pi2, 0[$, $e^{1+x} + x$ sur $[0, 1]$. Trouver a.
= Il faut $\int f = 1$ : $a\int_{-\pi/2}^0\cos x\,dx = a$ et $\int_0^1(e^{1+x}+x)dx = e^2 - e + \frac12 \approx 5{,}17$. Donc $a = 1 - 5{,}17 \approx -4{,}17 < 0$ : f serait négative sur $[-\frac\pi2, 0[$. **Aucune valeur de a ne fait de f une densité.** C'est la réponse à rédiger.

? Contrôle 2 : $f = \frac{a}{x^2}$ sur $[-1, 0[$, $e^x - 1$ sur $[0, 1]$. Trouver a.
= $\int_{-1}^0\frac{dx}{x^2}$ diverge (vers $+\infty$) : pour $a \ne 0$ l'intégrale totale est infinie, et pour $a = 0$ elle vaut $\int_0^1(e^x - 1)dx = e - 2 \approx 0{,}72 \ne 1$. **Aucune valeur de a ne convient.**
```

```etapes Méthode quand la densité est correcte
1. Positivité : f ≥ 0 partout (impose le signe de a).
2. Normalisation : ∫ f = 1 donne a.
3. Fonction de répartition : F(x) = ∫ de −∞ à x de f, morceau par morceau, en vérifiant la continuité aux bornes.
4. E(X) = ∫ x f(x) dx, puis V(X) = E(X²) − E(X)².
```

## QCM des contrôles

```qcm
? La classe modale d'une série à amplitudes inégales est celle qui a :
- le plus grand effectif
+ la plus grande densité
- la plus grande amplitude
= Densité = effectif / amplitude.

? $V(3X + 2)$ vaut :
- $3V(X) + 2$
+ $9V(X)$
- $3V(X)$
= La constante disparaît, le facteur passe au carré.

? Anagrammes de « ANNA » :
- 24
+ 6
- 12
= $\frac{4!}{2!\,2!}$.

? Une densité doit être :
+ positive et d'intégrale 1
- croissante
- inférieure à 1
= Une densité peut dépasser 1 ponctuellement.

? $\int_{-1}^0 \frac{dx}{x^2}$ :
- vaut 1
- vaut $-1$
+ diverge
= La primitive $-1/x$ explose en $0^-$.

? Médiane d'une série groupée : on interpole dans la classe qui contient :
+ N/2
- le plus grand effectif
- la moyenne
= Effectifs cumulés.

? Dans [50, 90[ avec 36 personnes, combien entre 50 et 80 ans ?
- 30
+ 27
- 36
= $36 \times 30/40$.

? $\overline{x^2} - \bar x^2$ est :
+ la variance
- l'écart-type
- toujours négatif
= Formule de König-Huygens.

? F, fonction de répartition d'une variable à densité, est :
- discontinue en chaque borne
+ continue et croissante, de 0 à 1
- égale à f
= F est une primitive de f.

? Si $\int f = 5{,}17$ sur une partie du domaine, alors :
- on divise par 5,17 et c'est fini
+ f ne peut pas être une densité si le reste est positif
- a vaut 5,17
= L'intégrale totale dépasserait déjà 1.
```

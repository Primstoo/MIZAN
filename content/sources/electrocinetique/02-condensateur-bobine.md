---
id: condensateur-bobine
titre: Le condensateur et la bobine
seance: Chapitre 3 · sections 3.2 et 3.3
importance: 5
---

## Avant de commencer

L'intensité est le débit de charge : $i = \dfrac{dq}{dt}$. Et la dérivée d'une fonction constante est nulle.

```exercice Vérifie ton prérequis
? Une grandeur $x(t)$ est constante dans le temps. Que vaut $\dfrac{dx}{dt}$ ?
reponse: 0
= $0$. C'est la clé du régime permanent : tout ce qui est écrit avec une dérivée disparaît quand les grandeurs sont constantes.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « comment ce composant réagit quand tout est constant ».** Le condensateur ne laisse plus passer de courant (interrupteur ouvert), la bobine n'a plus de tension (un fil). Avec ça, tu trouves le régime final d'un circuit sans résoudre d'équation.

> [!piege] Appliquer aux condensateurs les règles des résistances. Pour les condensateurs, c'est **inversé** : en parallèle les capacités s'ajoutent, en série ce sont les inverses.

À la fin, tu sais écrire la relation tension-courant du condensateur et de la bobine, donner leur comportement en régime permanent et leur énergie, et associer plusieurs composants.

## Idée 1 · Le condensateur : $i = C\,\dfrac{du}{dt}$

Idée : deux armatures séparées par un isolant (le diélectrique). Sous une tension $u$, l'armature qui reçoit le courant porte la charge $+q$, l'autre $-q$. La capacité $C$ (en farads) mesure l'aptitude à accumuler des charges.

$$q(t) = C\,u(t) \qquad\text{et}\qquad i(t) = \frac{dq}{dt} = C\,\frac{du(t)}{dt}$$

- **Régime permanent continu** : $u$ est constante, donc $i = 0$. Le condensateur se comporte comme un **interrupteur ouvert**.
- **Énergie emmagasinée** : $W_C = \tfrac12 C u^2 = \dfrac{q^2}{2C}$.
- **Récepteur ou générateur** : si l'énergie augmente ($p = u\,i > 0$) il se charge, donc il est récepteur ; si elle diminue ($p < 0$) il se décharge, donc il est générateur.

## Idée 2 · La bobine : $u = L\,\dfrac{di}{dt}$

Idée : un enroulement de spires. Quand le courant $i$ varie, il crée un champ magnétique variable, dont le flux fait apparaître une tension : c'est l'**auto-induction**.

$$u = L\,\frac{di}{dt}\ \text{(bobine idéale)} \qquad u = L\,\frac{di}{dt} + r\,i\ \text{(bobine réelle, résistance interne } r\text{)}$$

- **Loi de Lenz** : la f.é.m. d'auto-induction $e = -L\,\dfrac{di}{dt}$ s'oppose à la variation du courant. La bobine « freine » toute variation brutale.
- **Régime permanent continu** : $i$ est constant, donc $u = r\,i$. Une bobine idéale est un **fil** ; une bobine réelle est un conducteur ohmique de résistance $r$.
- **Énergie emmagasinée** : $W_L = \tfrac12 L i^2$. Une bobine réelle dissipe en plus de l'énergie par effet Joule dans $r$.

```html
<svg viewBox="0 0 560 150" role="img" aria-label="Régime permanent continu : le condensateur se comporte comme un interrupteur ouvert, la bobine comme un fil" style="max-width:100%;height:auto"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 60H80M80 40V80M96 40V80M96 60H150"/><path d="M330 60H400C404 40 412 40 416 60C420 40 428 40 432 60C436 40 444 40 448 60H520"/><path d="M180 60H215M215 60l22-18" stroke="#D9824F"/><path d="M470 62H520" stroke="#D9824F" stroke-width="3" opacity="0"/></g><g font-family="sans-serif" font-size="13" fill="currentColor" text-anchor="middle"><text x="88" y="110">Condensateur</text><text x="88" y="130" fill="#D9824F">régime permanent : interrupteur ouvert (i = 0)</text><text x="425" y="110">Bobine</text><text x="425" y="130" fill="#D9824F">régime permanent : fil (u = 0)</text></g></svg>
```


| | Condensateur ($C$) | Bobine ($L$) |
|---|---|---|
| Forme d'énergie | électrique (champ entre les armatures) | magnétique (champ créé par le courant) |
| Énergie stockée | $\tfrac12 C u^2$ | $\tfrac12 L i^2$ |
| Grandeur continue | la tension $u$ | le courant $i$ |
| Relation $u$-$i$ | $i = C\,\dfrac{du}{dt}$ | $u = L\,\dfrac{di}{dt}$ |
| Régime permanent continu | interrupteur ouvert ($i = 0$) | fil ($u = 0$) |

## Idée 3 · Associer des composants

Idée : les bobines (sans couplage magnétique) s'associent comme les résistances. Les condensateurs, **à l'inverse**.

| Association | Condensateurs | Bobines |
|---|---|---|
| Série | $\dfrac{1}{C_{eq}} = \dfrac1{C_1} + \dfrac1{C_2} + \dfrac1{C_3}$ (même charge $Q$) | $L_{eq} = L_1 + L_2$ |
| Parallèle | $C_{eq} = C_1 + C_2 + C_3$ (même tension) | $\dfrac1{L_{eq}} = \dfrac1{L_1} + \dfrac1{L_2}$ |

```etapes Calculer charges et tensions : $C_1 = 10\ \mu\text{F}$ en parallèle avec ($C_2 = 22\ \mu\text{F}$ en série avec $C_3 = 6{,}8\ \mu\text{F}$), sous $15\ \text{V}$
$C_1$ est seul sur le générateur :: $U_{C_1} = 15\ \text{V}$ et $Q_1 = C_1 U_{C_1} = 150\ \mu\text{C}$.
$C_2$ et $C_3$ sont en série :: Même charge $Q$, et leurs tensions s'ajoutent : $\dfrac{Q}{C_2} + \dfrac{Q}{C_3} = E$.
Calcule la charge commune :: $Q_2 = Q_3 = E\,\dfrac{C_2 C_3}{C_2 + C_3} \approx 77{,}9\ \mu\text{C}$.
Déduis les tensions :: $U_{C_2} = Q_2/C_2 \approx 3{,}54\ \text{V}$ et $U_{C_3} = Q_3/C_3 \approx 11{,}46\ \text{V}$. Leur somme vaut bien $15\ \text{V}$.
```

> [!retenir] Condensateurs : parallèle = somme, série = inverse des inverses. En série, même charge $Q$. En parallèle, même tension.

## S'exercer

```exercice Exemple du cours : condensateurs en série et en parallèle (circuit b)
? Un générateur de $12\ \text{V}$ alimente $C_1 = 100\ \text{nF}$ en série avec le groupe formé de $C_2 = 22\ \text{nF}$ et $C_3 = 68\ \text{nF}$ en parallèle, lui-même en série avec $C_4 = 33\ \text{nF}$. Calculer $C_{eq}$ en nF (arrondir au dixième).
indice: Commence par le parallèle : $C_{23} = C_2 + C_3$. Puis les trois condensateurs en série.
reponse: 19.5 ~0.1
= $C_{23} = 22 + 68 = 90\ \text{nF}$. En série : $\dfrac1{C_{eq}} = \dfrac1{100} + \dfrac1{90} + \dfrac1{33} \approx 0{,}0514\ \text{nF}^{-1}$, donc $C_{eq} \approx 19{,}45\ \text{nF}$.
? Quelle est la charge $Q$ des éléments en série, et la tension $U_{C_2}$ aux bornes du groupe parallèle ?
indice: $Q = E\,C_{eq}$ ; puis $U_{C_1} = Q/C_1$, $U_{C_4} = Q/C_4$ et la loi des mailles.
= $Q = E\,C_{eq} \approx 233{,}4\ \text{nC}$. $U_{C_1} = Q/C_1 \approx 2{,}33\ \text{V}$ et $U_{C_4} = Q/C_4 \approx 7{,}07\ \text{V}$. Loi des mailles : $U_{C_2} = U_{C_3} = 12 - 2{,}33 - 7{,}07 \approx 2{,}59\ \text{V}$. Charges : $Q_2 = C_2 U \approx 57{,}1\ \text{nC}$ et $Q_3 = C_3 U \approx 176{,}3\ \text{nC}$ ; on vérifie $Q_2 + Q_3 = Q$.
```

```exercice Énergie et régime permanent
? Un condensateur de $100\ \mu\text{F}$ est chargé sous $12\ \text{V}$. Quelle énergie stocke-t-il, en mJ ?
indice: $W_C = \tfrac12 C u^2$.
reponse: 7.2 ~0.05
= $W_C = \tfrac12 \times 100\times10^{-6} \times 12^2 = 7{,}2\ \text{mJ}$ (vérifié par calcul).
? Une bobine idéale de $0{,}5\ \text{H}$ est parcourue par un courant constant de $0{,}1\ \text{A}$. Quelle est la tension à ses bornes et l'énergie stockée, en mJ ?
indice: En régime permanent continu, $\dfrac{di}{dt} = 0$.
= $u = L\,\dfrac{di}{dt} = 0$ : la bobine idéale se comporte comme un fil. $W_L = \tfrac12 L i^2 = \tfrac12 \times 0{,}5 \times 0{,}1^2 = 2{,}5\ \text{mJ}$.
? Deux condensateurs de $10\ \mu\text{F}$ sont montés en série. Quelle est la capacité équivalente ? Et en parallèle ?
= En série : $\dfrac1{C_{eq}} = \dfrac1{10} + \dfrac1{10} = \dfrac15$, donc $C_{eq} = 5\ \mu\text{F}$. En parallèle : $C_{eq} = 10 + 10 = 20\ \mu\text{F}$.
```

## Flashcards

```cartes
Relation courant-tension d'un condensateur ? :: $i = C\,\dfrac{du}{dt}$ (et $q = C\,u$).
Relation tension-courant d'une bobine idéale ? :: $u = L\,\dfrac{di}{dt}$ ; pour une bobine réelle, $u = L\,\dfrac{di}{dt} + r\,i$.
Condensateur en régime permanent continu ? :: Interrupteur ouvert : $u$ constante donc $i = C\,du/dt = 0$.
Bobine en régime permanent continu ? :: Idéale : un fil ($u = 0$). Réelle : un conducteur ohmique de résistance $r$.
Énergie d'un condensateur, d'une bobine ? :: $W_C = \tfrac12 C u^2 = \dfrac{q^2}{2C}$ et $W_L = \tfrac12 L i^2$.
Condensateurs en série et en parallèle ? :: Série : $\dfrac1{C_{eq}} = \sum \dfrac1{C_k}$, même charge. Parallèle : $C_{eq} = \sum C_k$, même tension.
Bobines (sans couplage) en série et en parallèle ? :: Série : $L_{eq} = L_1 + L_2$. Parallèle : $\dfrac1{L_{eq}} = \dfrac1{L_1} + \dfrac1{L_2}$.
Que dit la loi de Lenz ? :: La f.é.m. d'auto-induction $e = -L\,di/dt$ s'oppose à la variation du courant qui lui donne naissance.
Quand un condensateur est-il récepteur ? :: Quand son énergie augmente ($p = u\,i > 0$) : il se charge. Il est générateur quand elle diminue.
```

## QCM du chapitre

```qcm
? La relation courant-tension d'un condensateur est…
- $u = C\,\dfrac{di}{dt}$
+ $i = C\,\dfrac{du}{dt}$
- $i = \dfrac{u}{C}$
- $u = C\,i$
= La charge $q = C u$ et $i = dq/dt$ donnent $i = C\,du/dt$.

? En régime permanent continu, un condensateur se comporte comme…
- un fil
+ un interrupteur ouvert
- un conducteur ohmique
- un générateur
= $u$ est constante, donc $i = C\,du/dt = 0$.

? En régime permanent continu, une bobine idéale se comporte comme…
+ un fil
- un interrupteur ouvert
- une résistance infinie
- un condensateur
= $i$ est constant, donc $u = L\,di/dt = 0$.

? L'énergie emmagasinée dans une bobine est…
- $\tfrac12 L i$
- $L i^2$
+ $\tfrac12 L i^2$
- $\tfrac12 L^2 i$
= $W_L = \tfrac12 L i^2$.

? Deux condensateurs de $10\ \mu\text{F}$ en série ont pour capacité équivalente…
- $20\ \mu\text{F}$
+ $5\ \mu\text{F}$
- $10\ \mu\text{F}$
- $1\ \mu\text{F}$
= $\dfrac1{C_{eq}} = \dfrac1{10} + \dfrac1{10} = \dfrac15$, donc $C_{eq} = 5\ \mu\text{F}$.

? Deux condensateurs de $10\ \mu\text{F}$ en parallèle ont pour capacité équivalente…
+ $20\ \mu\text{F}$
- $5\ \mu\text{F}$
- $10\ \mu\text{F}$
- $100\ \mu\text{F}$
= En parallèle, les capacités s'ajoutent.

? Deux condensateurs en série portent…
- la même tension
+ la même charge
- des courants différents en régime permanent
- des énergies égales
= En série, les armatures reliées échangent les mêmes charges : même $Q$.

? Une bobine réelle de résistance interne $r$, en régime permanent continu, se comporte comme…
- un fil sans résistance
- un interrupteur ouvert
+ un conducteur ohmique de résistance $r$
- un condensateur
= $u = L\,di/dt + r\,i = r\,i$ quand $i$ est constant.

? Quelle énergie stocke un condensateur de $100\ \mu\text{F}$ chargé sous $12\ \text{V}$ ?
- $1{,}2\ \text{mJ}$
- $14{,}4\ \text{mJ}$
+ $7{,}2\ \text{mJ}$
- $72\ \text{mJ}$
= $\tfrac12 \times 100\times10^{-6} \times 144 = 7{,}2\ \text{mJ}$.

? La loi de Lenz indique que la f.é.m. d'auto-induction…
- favorise la variation du courant
+ s'oppose à la variation du courant
- est toujours nulle
- ne dépend que de $R$
= $e = -L\,di/dt$ : le signe moins traduit l'opposition à la variation.
```

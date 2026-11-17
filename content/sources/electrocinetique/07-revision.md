---
id: revision
titre: Fiche de révision et examen blanc
seance: Chapitre 3 · synthèse 3.8 et exercices 3.9
importance: 5
---

## Comment aborder ce chapitre

> [!astuce] **Une grille en trois questions.** Devant un circuit : (1) qu'est-ce qui stocke de l'énergie, donc quelles grandeurs sont continues ? (2) premier ou second ordre ? (3) quelles sont la valeur initiale, la valeur finale et la constante de temps (ou $Q$) ? Avec ça, tu écris la réponse sans recalculer l'équation.

> [!piege] Mélanger les formes. Charge : $E\,(1 - e^{-t/\tau})$. Décharge : $E\,e^{-t/\tau}$. Fais toujours le test : à $t = 0$ la valeur est-elle bien la valeur initiale, et à l'infini la valeur finale ?

> [!attention] Le format du contrôle (durée, barème, documents autorisés) n'est pas connu : l'examen blanc ci-dessous mélange le type de questions du cours et des exercices du prof. Demande à ton professeur comment il note.

## Fiche de synthèse

| Circuit | Équation | Paramètres | Réponse à un échelon |
|---|---|---|---|
| RC | $\tau\,\dot u + u = E$ | $\tau = RC$ | $u = E\,(1 - e^{-t/\tau})$ |
| RL | $\tau\,\dot i + i = E/R$ | $\tau = L/R$ | $i = \dfrac{E}{R}\,(1 - e^{-t/\tau})$ |
| LC | $\ddot u + \omega_0^2\,u = \omega_0^2 E$ | $\omega_0 = 1/\sqrt{LC}$ | oscillations non amorties |
| RLC série | $\ddot u + \dfrac{\omega_0}{Q}\dot u + \omega_0^2\,u = \omega_0^2 E$ | $\omega_0$, $Q = \dfrac1R\sqrt{\dfrac LC}$ | selon $Q$ : 3 régimes |

> [!retenir] **À retenir du chapitre**
> - $u_C$ et $i_L$ sont continus ; $i_C$ et $u_L$ peuvent être discontinus.
> - En régime permanent continu : condensateur = interrupteur ouvert ; bobine = fil.
> - Premier ordre : $\tau$ se lit avec la tangente à l'origine ; 63 % de l'évolution à $t = \tau$, 99 % à $5\tau$.
> - Charge d'un condensateur : 50 % de l'énergie est dissipée, quelle que soit $R$.
> - RLC : $\lambda = R/2L$, $\omega_0 = 1/\sqrt{LC}$, $Q = L\omega_0/R$, $R_c = 2\sqrt{L/C}$ ; pseudo-périodique si $Q > \tfrac12$.

## Examen blanc

```exercice Examen blanc · Partie 1 : cours
? Pourquoi $u_C$ et $i_L$ sont-ils continus ? Donne un exemple de grandeur qui peut sauter.
= L'énergie stockée ($\tfrac12 C u_C^2$ et $\tfrac12 L i_L^2$) ne peut pas varier instantanément, sinon la puissance $dW/dt$ serait infinie. $i_C$ et $u_L$ peuvent sauter : dans un circuit RC à l'échelon, $i$ passe de $0$ à $E/R$ en $t = 0$.
? Établis l'équation différentielle de la charge d'un condensateur dans un circuit RC série et résous-la.
= Loi des mailles $E = R\,i + u$ avec $i = C\,u'$ : $\tau\,u' + u = E$, $\tau = RC$. Solution homogène $B\,e^{-t/\tau}$, particulière $E$, donc $u = B\,e^{-t/\tau} + E$. Avec $u(0) = 0$ : $B = -E$ et $u(t) = E\,(1 - e^{-t/\tau})$.
? Fais le bilan énergétique de la charge d'un condensateur à travers une résistance.
= Fournie $E\,Q = C E^2$ ; stockée $\tfrac12 C E^2$ ; dissipée dans $R$ : $\tfrac12 C E^2$. Rendement 50 %, quelle que soit $R$.
```

```exercice Examen blanc · Partie 2 : problème (RC puis RL)
? Un condensateur $C = 47\ \mu\text{F}$, déchargé, est chargé sous $E = 5\ \text{V}$ à travers $R = 2{,}2\ \text{k}\Omega$. Calcule $\tau$, en ms (arrondis à l'unité).
indice: $\tau = RC$.
reponse: 103 ~1
= $\tau = 2200 \times 47\times10^{-6} \approx 0{,}103\ \text{s} = 103\ \text{ms}$.
? Quelle est la tension aux bornes du condensateur à $t = \tau$, en V (deux décimales) ?
indice: $u(\tau) = E\,(1 - e^{-1})$.
reponse: 3.16 ~0.01
= $u(\tau) = 5 \times 0{,}632 \approx 3{,}16\ \text{V}$.
? Au bout de combien de temps la charge est-elle pratiquement terminée, en ms ?
reponse: 515 ~5
= $5\tau \approx 5 \times 103 \approx 515\ \text{ms}$ (à 99 %).
? Une bobine idéale $L = 20\ \text{mH}$ est en série avec $R = 40\ \Omega$ sous $E = 8\ \text{V}$. Calcule $\tau$ en ms et le courant final en mA.
indice: $\tau = L/R$ et $I = E/R$.
= $\tau = \dfrac{L}{R} = \dfrac{0{,}020}{40} = 0{,}5\ \text{ms}$ et $I = \dfrac{E}{R} = \dfrac{8}{40} = 0{,}2\ \text{A} = 200\ \text{mA}$.
```

```exercice Examen blanc · Partie 3 : RLC
? Un circuit RLC série a $L = 0{,}1\ \text{H}$, $C = 10\ \mu\text{F}$, $R = 20\ \Omega$. Calcule $\omega_0$ en rad/s.
indice: $LC = 10^{-6}$.
reponse: 1000
= $\omega_0 = 1/\sqrt{0{,}1 \times 10^{-5}} = 1000\ \text{rad/s}$ (vérifié).
? Calcule $\lambda$ en s⁻¹, puis $Q$.
indice: $\lambda = R/2L$ et $Q = \omega_0/(2\lambda)$.
= $\lambda = \dfrac{20}{2 \times 0{,}1} = 100\ \text{s}^{-1}$ et $Q = \dfrac{\omega_0}{2\lambda} = \dfrac{1000}{200} = 5$ (même résultat avec $L\omega_0/R = 0{,}1 \times 1000/20 = 5$).
? Quel est le régime ? Donne $R_c$.
= $R_c = 2\sqrt{L/C} = 2\sqrt{10^4} = 200\ \Omega$. $R = 20\ \Omega < R_c$ ($Q = 5 > \tfrac12$) : régime **pseudo-périodique**.
? Calcule la pseudo-pulsation $\Omega$ en rad/s (entier).
indice: $\Omega = \omega_0\sqrt{1 - 1/(4Q^2)}$.
reponse: 995 ~1
= $\Omega = \sqrt{1000^2 - 100^2} = \sqrt{990000} \approx 995\ \text{rad/s}$ (légèrement inférieure à $\omega_0$).
```

## Flashcards

```cartes
Les 3 questions devant un circuit ? :: Qui stocke de l'énergie (grandeurs continues) ? Premier ou second ordre ? Valeur initiale, valeur finale, $\tau$ ou $Q$ ?
Premier ordre : forme générale de la réponse ? :: $f(t) = f_\infty + (f_0 - f_\infty)\,e^{-t/\tau}$ (valeur finale, valeur initiale, constante de temps).
Constantes de temps RC et RL ? :: $\tau = RC$ et $\tau = L/R$.
Régime permanent continu : C et L ? :: Condensateur : interrupteur ouvert. Bobine idéale : fil.
À $\tau$, $2\tau$, $5\tau$ : % de l'évolution ? :: 63 %, 86,5 %, 99,3 %.
Rendement de la charge d'un condensateur ? :: 50 % : moitié stockée, moitié dissipée dans $R$, quelle que soit $R$.
Trois régimes du RLC série ? :: $Q > \tfrac12$ pseudo-périodique ; $Q = \tfrac12$ critique ; $Q < \tfrac12$ apériodique (avec $R$ comparée à $R_c = 2\sqrt{L/C}$).
```

## QCM du chapitre

```qcm
? Quelle forme décrit la **charge** d'un condensateur sous $E$ ?
- $E\,e^{-t/\tau}$
+ $E\,(1 - e^{-t/\tau})$
- $E\,\cos\omega_0 t$
- $E\,(1 + t/\tau)$
= Elle part de $0$ et tend vers $E$.

? Quelle forme décrit la **décharge** d'un condensateur chargé sous $E$ ?
+ $E\,e^{-t/\tau}$
- $E\,(1 - e^{-t/\tau})$
- $-E\,e^{-t/\tau}$ à $t = 0$
- $E\,\sin\omega_0 t$
= Elle part de $E$ et tend vers $0$.

? La constante de temps d'un circuit RL est…
- $RL$
+ $L/R$
- $R/L$
- $\sqrt{LC}$
= $\tau = L/R$.

? Pour $R = 2{,}2\ \text{k}\Omega$ et $C = 47\ \mu\text{F}$, $\tau$ vaut environ…
- $10\ \text{ms}$
+ $103\ \text{ms}$
- $1\ \text{s}$
- $4{,}7\ \text{ms}$
= $2200 \times 47\times10^{-6} \approx 0{,}103\ \text{s}$.

? En régime permanent continu, une bobine idéale est équivalente à…
+ un fil
- un interrupteur ouvert
- une source de courant
- un condensateur
= $u = L\,di/dt = 0$.

? Quelle est la différence essentielle entre l'énergie dissipée à la charge d'un RC et à l'établissement d'un RL ?
- aucune
+ RC : 50 % dissipés à la charge, quelle que soit $R$ ; RL : après le stockage, tout ce que le générateur fournit est dissipé dans $R$
- RC ne dissipe rien
- RL dissipe 50 %
= C'est le point du bilan énergétique du cours : pas de partage « moitié-moitié » pour la bobine.

? La pulsation propre du circuit LC est…
- $\sqrt{LC}$
+ $1/\sqrt{LC}$
- $LC$
- $R/L$
= $\omega_0 = 1/\sqrt{LC}$.

? Si $R > R_c$ dans un RLC série, le régime est…
+ apériodique
- critique
- pseudo-périodique
- non amorti
= $R > R_c$ équivaut à $Q < \tfrac12$.

? Quelle est la résistance critique pour $L = 10\ \text{mH}$ et $C = 1\ \mu\text{F}$ ?
- $20\ \Omega$
- $100\ \Omega$
+ $200\ \Omega$
- $2\ \text{k}\Omega$
= $2\sqrt{L/C} = 2\sqrt{10^4} = 200\ \Omega$.

? Pour $L = 0{,}1\ \text{H}$, $C = 10\ \mu\text{F}$ et $R = 20\ \Omega$, $Q$ vaut…
- $0{,}2$
- $2$
+ $5$
- $50$
= $Q = L\omega_0/R = 0{,}1 \times 1000 / 20 = 5$.

? Dans la réponse à un échelon, la tension finale du condensateur d'un RLC série est…
- $0$
+ $E$
- $2E$
- $E/Q$
= Le régime établi vaut $E$, indépendamment des conditions initiales.

? Lequel de ces couples est continu à une commutation ?
- $i_C$ et $u_L$
+ $u_C$ et $i_L$
- $u_R$ et $i_C$
- $u_L$ et $i_L$
= $u_C$ et $i_L$ sont continus ; $i_C$ et $u_L$ peuvent sauter.
```

---
id: regime-transitoire
titre: Régime transitoire, continuité et échelon
seance: Chapitre 3 · sections 3.1 et 3.4
importance: 4
---

## Avant de commencer

Dans une maille, la somme des tensions vaut zéro (loi des mailles). Pour un conducteur ohmique, $u = R\,i$.

```exercice Vérifie ton prérequis
? Une résistance de $100\ \Omega$ est parcourue par un courant de $20\ \text{mA}$. Quelle est la tension à ses bornes, en volts ?
indice: $u = R\,i$, avec $i$ en ampères.
reponse: 2
= $u = 100 \times 0{,}020 = 2\ \text{V}$. Si tu as trouvé $2000$, tu as oublié de convertir les milliampères en ampères.
```

## Comment aborder ce chapitre

> [!astuce] **Un circuit ne change pas d'état d'un coup : il glisse.** Après une commutation, quelque chose met du temps à se remplir ou à se vider : l'énergie stockée dans le condensateur et dans la bobine. Pose-toi toujours la question « qu'est-ce qui stocke de l'énergie ici ? ».

> [!piege] Croire que **tout** est continu. Seules deux grandeurs ne sautent jamais : la tension $u_C$ d'un condensateur et le courant $i_L$ d'une bobine. Le courant $i_C$ et la tension $u_L$, eux, peuvent sauter.

À la fin, tu sais définir le régime transitoire, dire quelles grandeurs sont continues et pourquoi, et reconnaître un échelon de tension.

> [!attention] **Source de ce module.** Il suit le chapitre 3 du cours de Physique 3, Électrocinétique, ENSA d'Al-Hoceima (régimes transitoires des circuits linéaires). Les chapitres 1 et 2 du cours, les TD et le format du contrôle ne nous ont pas été fournis. Ce que nous ajoutons au cours est signalé par un encadré « Attention ».

## Idée 1 · Le régime transitoire est le trajet entre deux équilibres

Idée : après une commutation (fermeture ou ouverture d'un interrupteur), le circuit passe de son **ancien équilibre** à un **nouveau régime permanent**. Le trajet s'appelle le régime transitoire.

```html
<svg viewBox="0 0 560 130" role="img" aria-label="Trois phases : ancien équilibre, régime transitoire, nouveau régime permanent, séparées par la commutation à t = 0 et t ≈ 5 tau" style="max-width:100%;height:auto"><defs><marker id="f" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="currentColor"/></marker></defs><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 80H540" marker-end="url(#f)"/><path d="M190 30V100" stroke="#D9824F" stroke-width="2.5"/><path d="M390 30V100" stroke="#D9824F" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M10 70H190C250 70 290 40 390 38H540" stroke="#D9824F" stroke-width="2.2"/></g><g font-family="sans-serif" font-size="12.5" fill="currentColor" text-anchor="middle"><text x="100" y="112">Ancien équilibre</text><text x="290" y="112">Régime transitoire</text><text x="465" y="112">Nouveau régime permanent</text><text x="190" y="22" fill="#D9824F">t = 0 : commutation</text><text x="390" y="22" fill="#D9824F">t ≈ 5τ</text></g></svg>
```


Analogie hydraulique : le robinet est fermé (débit nul), on l'ouvre brusquement, l'eau accélère et remplit le réseau (transitoire), puis le débit devient constant (permanent).

> [!retenir] Régime permanent : tout est stabilisé, tant que rien ne change dans le montage. Régime transitoire : courants et tensions évoluent d'une ancienne valeur d'équilibre vers la nouvelle. Pour une évolution exponentielle, on le considère terminé au bout de $5\tau$ (environ 99 % de l'évolution).

## Idée 2 · L'énergie ne saute pas, donc $u_C$ et $i_L$ non plus

Idée : un condensateur et une bobine **stockent** de l'énergie. Une énergie ne peut pas varier instantanément, sinon la puissance $p = \dfrac{dW}{dt}$ serait infinie, ce qu'aucun générateur ne peut fournir.

| | Condensateur | Bobine |
|---|---|---|
| Énergie stockée | $W_C = \tfrac12 C u_C^2$ | $W_L = \tfrac12 L i_L^2$ |
| Grandeur **continue** | la tension $u_C$ | le courant $i_L$ |
| Grandeur qui **peut sauter** | le courant $i_C$ | la tension $u_L$ |

```etapes Utiliser la continuité pour trouver les conditions initiales
Avant la commutation :: Regarde le régime permanent d'avant et calcule $u_C(0^-)$ ou $i_L(0^-)$.
Applique la continuité :: $u_C(0^+) = u_C(0^-)$ pour un condensateur, $i_L(0^+) = i_L(0^-)$ pour une bobine.
Déduis le reste :: Les autres grandeurs ($i_C$, $u_L$, $u_R$) se retrouvent ensuite avec la loi des mailles et la loi d'Ohm. Elles peuvent avoir un saut en $t = 0$.
```

> [!retenir] Conditions initiales d'un circuit : $u_C(0^+) = u_C(0^-)$ et $i_L(0^+) = i_L(0^-)$.

## Idée 3 · L'échelon de tension : une excitation simple

Idée : pour étudier un transitoire, on change la tension d'une valeur constante $E_1$ à une autre valeur constante $E_2$, en un temps considéré comme nul. Le cas courant est $E_1 = 0$ : on « allume » le générateur à $t = 0$.

```html
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center"><svg viewBox="0 0 270 160" role="img" aria-label="Échelon de tension montant à t = 0" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V126"/><path d="M44 111.3H260"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M89.2 108.3v6" stroke="currentColor" stroke-width="1"/><text x="89.2" y="142" text-anchor="middle">0</text><path d="M45 111.3h6" stroke="currentColor" stroke-width="1"/><text x="41" y="115.3" text-anchor="end">0</text><path d="M45 38.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="42.0" text-anchor="end">E</text><text x="254" y="154" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">e(t)</text></g><path d="M48.0 111.3 L48.9 111.3 L49.7 111.3 L50.6 111.3 L51.4 111.3 L52.3 111.3 L53.1 111.3 L54.0 111.3 L54.9 111.3 L55.7 111.3 L56.6 111.3 L57.4 111.3 L58.3 111.3 L59.2 111.3 L60.0 111.3 L60.9 111.3 L61.7 111.3 L62.6 111.3 L63.5 111.3 L64.3 111.3 L65.2 111.3 L66.0 111.3 L66.9 111.3 L67.7 111.3 L68.6 111.3 L69.5 111.3 L70.3 111.3 L71.2 111.3 L72.0 111.3 L72.9 111.3 L73.8 111.3 L74.6 111.3 L75.5 111.3 L76.3 111.3 L77.2 111.3 L78.0 111.3 L78.9 111.3 L79.8 111.3 L80.6 111.3 L81.5 111.3 L82.3 111.3 L83.2 111.3 L84.0 111.3 L84.9 111.3 L85.8 111.3 L86.6 111.3 L87.5 111.3 L88.3 111.3 L89.2 38.0 L90.1 38.0 L90.9 38.0 L91.8 38.0 L92.6 38.0 L93.5 38.0 L94.3 38.0 L95.2 38.0 L96.1 38.0 L96.9 38.0 L97.8 38.0 L98.6 38.0 L99.5 38.0 L100.4 38.0 L101.2 38.0 L102.1 38.0 L102.9 38.0 L103.8 38.0 L104.7 38.0 L105.5 38.0 L106.4 38.0 L107.2 38.0 L108.1 38.0 L108.9 38.0 L109.8 38.0 L110.7 38.0 L111.5 38.0 L112.4 38.0 L113.2 38.0 L114.1 38.0 L115.0 38.0 L115.8 38.0 L116.7 38.0 L117.5 38.0 L118.4 38.0 L119.2 38.0 L120.1 38.0 L121.0 38.0 L121.8 38.0 L122.7 38.0 L123.5 38.0 L124.4 38.0 L125.2 38.0 L126.1 38.0 L127.0 38.0 L127.8 38.0 L128.7 38.0 L129.5 38.0 L130.4 38.0 L131.3 38.0 L132.1 38.0 L133.0 38.0 L133.8 38.0 L134.7 38.0 L135.6 38.0 L136.4 38.0 L137.3 38.0 L138.1 38.0 L139.0 38.0 L139.8 38.0 L140.7 38.0 L141.6 38.0 L142.4 38.0 L143.3 38.0 L144.1 38.0 L145.0 38.0 L145.8 38.0 L146.7 38.0 L147.6 38.0 L148.4 38.0 L149.3 38.0 L150.1 38.0 L151.0 38.0 L151.9 38.0 L152.7 38.0 L153.6 38.0 L154.4 38.0 L155.3 38.0 L156.2 38.0 L157.0 38.0 L157.9 38.0 L158.7 38.0 L159.6 38.0 L160.4 38.0 L161.3 38.0 L162.2 38.0 L163.0 38.0 L163.9 38.0 L164.7 38.0 L165.6 38.0 L166.4 38.0 L167.3 38.0 L168.2 38.0 L169.0 38.0 L169.9 38.0 L170.7 38.0 L171.6 38.0 L172.5 38.0 L173.3 38.0 L174.2 38.0 L175.0 38.0 L175.9 38.0 L176.8 38.0 L177.6 38.0 L178.5 38.0 L179.3 38.0 L180.2 38.0 L181.0 38.0 L181.9 38.0 L182.8 38.0 L183.6 38.0 L184.5 38.0 L185.3 38.0 L186.2 38.0 L187.1 38.0 L187.9 38.0 L188.8 38.0 L189.6 38.0 L190.5 38.0 L191.3 38.0 L192.2 38.0 L193.1 38.0 L193.9 38.0 L194.8 38.0 L195.6 38.0 L196.5 38.0 L197.3 38.0 L198.2 38.0 L199.1 38.0 L199.9 38.0 L200.8 38.0 L201.6 38.0 L202.5 38.0 L203.4 38.0 L204.2 38.0 L205.1 38.0 L205.9 38.0 L206.8 38.0 L207.7 38.0 L208.5 38.0 L209.4 38.0 L210.2 38.0 L211.1 38.0 L211.9 38.0 L212.8 38.0 L213.7 38.0 L214.5 38.0 L215.4 38.0 L216.2 38.0 L217.1 38.0 L217.9 38.0 L218.8 38.0 L219.7 38.0 L220.5 38.0 L221.4 38.0 L222.2 38.0 L223.1 38.0 L224.0 38.0 L224.8 38.0 L225.7 38.0 L226.5 38.0 L227.4 38.0 L228.2 38.0 L229.1 38.0 L230.0 38.0 L230.8 38.0 L231.7 38.0 L232.5 38.0 L233.4 38.0 L234.3 38.0 L235.1 38.0 L236.0 38.0 L236.8 38.0 L237.7 38.0 L238.6 38.0 L239.4 38.0 L240.3 38.0 L241.1 38.0 L242.0 38.0 L242.8 38.0 L243.7 38.0 L244.6 38.0 L245.4 38.0 L246.3 38.0 L247.1 38.0 L248.0 38.0 L248.8 38.0 L249.7 38.0 L250.6 38.0 L251.4 38.0 L252.3 38.0 L253.1 38.0 L254.0 38.0" stroke="#D9824F" stroke-width="2.4" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"></g></svg><svg viewBox="0 0 270 160" role="img" aria-label="Échelon de tension descendant à t = 0" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V126"/><path d="M44 111.3H260"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M89.2 108.3v6" stroke="currentColor" stroke-width="1"/><text x="89.2" y="142" text-anchor="middle">0</text><path d="M45 111.3h6" stroke="currentColor" stroke-width="1"/><text x="41" y="115.3" text-anchor="end">0</text><path d="M45 38.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="42.0" text-anchor="end">E</text><text x="254" y="154" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">e(t)</text></g><path d="M48.0 38.0 L48.9 38.0 L49.7 38.0 L50.6 38.0 L51.4 38.0 L52.3 38.0 L53.1 38.0 L54.0 38.0 L54.9 38.0 L55.7 38.0 L56.6 38.0 L57.4 38.0 L58.3 38.0 L59.2 38.0 L60.0 38.0 L60.9 38.0 L61.7 38.0 L62.6 38.0 L63.5 38.0 L64.3 38.0 L65.2 38.0 L66.0 38.0 L66.9 38.0 L67.7 38.0 L68.6 38.0 L69.5 38.0 L70.3 38.0 L71.2 38.0 L72.0 38.0 L72.9 38.0 L73.8 38.0 L74.6 38.0 L75.5 38.0 L76.3 38.0 L77.2 38.0 L78.0 38.0 L78.9 38.0 L79.8 38.0 L80.6 38.0 L81.5 38.0 L82.3 38.0 L83.2 38.0 L84.0 38.0 L84.9 38.0 L85.8 38.0 L86.6 38.0 L87.5 38.0 L88.3 38.0 L89.2 111.3 L90.1 111.3 L90.9 111.3 L91.8 111.3 L92.6 111.3 L93.5 111.3 L94.3 111.3 L95.2 111.3 L96.1 111.3 L96.9 111.3 L97.8 111.3 L98.6 111.3 L99.5 111.3 L100.4 111.3 L101.2 111.3 L102.1 111.3 L102.9 111.3 L103.8 111.3 L104.7 111.3 L105.5 111.3 L106.4 111.3 L107.2 111.3 L108.1 111.3 L108.9 111.3 L109.8 111.3 L110.7 111.3 L111.5 111.3 L112.4 111.3 L113.2 111.3 L114.1 111.3 L115.0 111.3 L115.8 111.3 L116.7 111.3 L117.5 111.3 L118.4 111.3 L119.2 111.3 L120.1 111.3 L121.0 111.3 L121.8 111.3 L122.7 111.3 L123.5 111.3 L124.4 111.3 L125.2 111.3 L126.1 111.3 L127.0 111.3 L127.8 111.3 L128.7 111.3 L129.5 111.3 L130.4 111.3 L131.3 111.3 L132.1 111.3 L133.0 111.3 L133.8 111.3 L134.7 111.3 L135.6 111.3 L136.4 111.3 L137.3 111.3 L138.1 111.3 L139.0 111.3 L139.8 111.3 L140.7 111.3 L141.6 111.3 L142.4 111.3 L143.3 111.3 L144.1 111.3 L145.0 111.3 L145.8 111.3 L146.7 111.3 L147.6 111.3 L148.4 111.3 L149.3 111.3 L150.1 111.3 L151.0 111.3 L151.9 111.3 L152.7 111.3 L153.6 111.3 L154.4 111.3 L155.3 111.3 L156.2 111.3 L157.0 111.3 L157.9 111.3 L158.7 111.3 L159.6 111.3 L160.4 111.3 L161.3 111.3 L162.2 111.3 L163.0 111.3 L163.9 111.3 L164.7 111.3 L165.6 111.3 L166.4 111.3 L167.3 111.3 L168.2 111.3 L169.0 111.3 L169.9 111.3 L170.7 111.3 L171.6 111.3 L172.5 111.3 L173.3 111.3 L174.2 111.3 L175.0 111.3 L175.9 111.3 L176.8 111.3 L177.6 111.3 L178.5 111.3 L179.3 111.3 L180.2 111.3 L181.0 111.3 L181.9 111.3 L182.8 111.3 L183.6 111.3 L184.5 111.3 L185.3 111.3 L186.2 111.3 L187.1 111.3 L187.9 111.3 L188.8 111.3 L189.6 111.3 L190.5 111.3 L191.3 111.3 L192.2 111.3 L193.1 111.3 L193.9 111.3 L194.8 111.3 L195.6 111.3 L196.5 111.3 L197.3 111.3 L198.2 111.3 L199.1 111.3 L199.9 111.3 L200.8 111.3 L201.6 111.3 L202.5 111.3 L203.4 111.3 L204.2 111.3 L205.1 111.3 L205.9 111.3 L206.8 111.3 L207.7 111.3 L208.5 111.3 L209.4 111.3 L210.2 111.3 L211.1 111.3 L211.9 111.3 L212.8 111.3 L213.7 111.3 L214.5 111.3 L215.4 111.3 L216.2 111.3 L217.1 111.3 L217.9 111.3 L218.8 111.3 L219.7 111.3 L220.5 111.3 L221.4 111.3 L222.2 111.3 L223.1 111.3 L224.0 111.3 L224.8 111.3 L225.7 111.3 L226.5 111.3 L227.4 111.3 L228.2 111.3 L229.1 111.3 L230.0 111.3 L230.8 111.3 L231.7 111.3 L232.5 111.3 L233.4 111.3 L234.3 111.3 L235.1 111.3 L236.0 111.3 L236.8 111.3 L237.7 111.3 L238.6 111.3 L239.4 111.3 L240.3 111.3 L241.1 111.3 L242.0 111.3 L242.8 111.3 L243.7 111.3 L244.6 111.3 L245.4 111.3 L246.3 111.3 L247.1 111.3 L248.0 111.3 L248.8 111.3 L249.7 111.3 L250.6 111.3 L251.4 111.3 L252.3 111.3 L253.1 111.3 L254.0 111.3" stroke="#D9824F" stroke-width="2.4" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"></g></svg></div>
```


- On le produit avec un **interrupteur** (fermeture : $0 \to E$ ; ouverture : $E \to 0$) ou avec un **GBF en mode créneau**, qui répète l'échelon plusieurs fois par seconde et permet de voir la réponse à l'oscilloscope.
- Il provoque le régime transitoire et permet de mesurer la **constante de temps $\tau$**, le temps de réponse et la valeur finale.

> [!attention] **Ajout hors cours.** Le cours donne deux grandeurs pour décrire un transitoire : la constante de temps $\tau$ (systèmes du premier ordre, évolution en $e^{-t/\tau}$) et le facteur de qualité $Q$ (systèmes oscillants). On les retrouve aux chapitres suivants du module.

## S'exercer

```exercice Continuité : qui saute, qui ne saute pas
? Un condensateur initialement déchargé est relié à un générateur de tension $E$ à travers une résistance $R$, à $t = 0$. Donner $u_C(0^+)$ et dire si le courant $i$ est continu en $t = 0$.
indice: Quelle grandeur du condensateur est continue ? Applique-la, puis la loi des mailles.
= $u_C(0^+) = u_C(0^-) = 0$ par continuité de la tension du condensateur. La loi des mailles donne alors $E = R\,i(0^+) + 0$, donc $i(0^+) = E/R$ alors que $i(0^-) = 0$ : le courant **n'est pas continu**, il saute de $0$ à $E/R$.
? Une bobine idéale parcourue par un courant $I_0$ est mise en série avec une résistance $R$ à $t = 0$. Qu'est-ce qui est continu en $t = 0$ : $i_L$ ou $u_L$ ?
indice: Quelle énergie est stockée dans une bobine ?
= $i_L$ est continu, car $W_L = \tfrac12 L i_L^2$ ne peut pas varier instantanément. La tension $u_L = L\,\dfrac{di}{dt}$ peut présenter un saut.
? Pourquoi $u_C$ ne peut-elle pas être discontinue ?
= Si $u_C$ sautait, l'énergie $\tfrac12 C u_C^2$ sauterait aussi. La puissance $p = \dfrac{dW}{dt}$ serait alors infinie, ce qu'aucun générateur ne peut fournir.
```

## Flashcards

```cartes
Définition du régime transitoire ? :: Phase d'évolution pendant laquelle un circuit passe de son état initial à son régime permanent, après la fermeture ou l'ouverture d'un interrupteur.
Quelle tension est continue aux bornes d'un condensateur ? :: La tension $u_C$ : l'énergie $\tfrac12 C u_C^2$ ne peut pas varier instantanément.
Quelle grandeur est continue dans une bobine ? :: Le courant $i_L$ : l'énergie $\tfrac12 L i_L^2$ ne peut pas varier instantanément.
Quelles grandeurs peuvent sauter ? :: Le courant $i_C$ dans un condensateur et la tension $u_L$ aux bornes d'une bobine.
Pourquoi une énergie ne varie-t-elle pas instantanément ? :: Sinon la puissance $p = dW/dt$ serait infinie, ce qu'aucun générateur ne peut fournir.
Qu'est-ce qu'un échelon de tension ? :: Un changement brusque de la tension, d'une valeur constante $E_1$ à une autre $E_2$, en un temps considéré comme nul (souvent $E_1 = 0$).
Comment produit-on un échelon ? :: Avec un interrupteur (fermeture $0 \to E$, ouverture $E \to 0$) ou avec un GBF en mode créneau.
À partir de quand un transitoire est-il pratiquement terminé ? :: Au bout d'environ $5\tau$ : l'évolution est faite à 99 % (pour une exponentielle).
```

## QCM du chapitre

```qcm
? Le régime transitoire est…
- le régime stable atteint après longtemps
+ la phase pendant laquelle le circuit évolue entre son ancien équilibre et son nouveau régime permanent
- le régime obtenu avec un générateur alternatif
- le régime d'un circuit sans composants
= C'est la période d'évolution après une commutation, avant que les grandeurs se stabilisent.

? Quelle grandeur est toujours continue aux bornes d'un condensateur ?
- le courant $i_C$
+ la tension $u_C$
- la puissance reçue
- la charge de l'armature négative uniquement
= $W_C = \tfrac12 C u_C^2$ ne peut pas sauter : $u_C$ est continue.

? Quelle grandeur est toujours continue dans une bobine ?
- la tension $u_L$
+ le courant $i_L$
- la tension et le courant à la fois
- aucune
= $W_L = \tfrac12 L i_L^2$ ne peut pas sauter : $i_L$ est continu.

? Parmi ces grandeurs, laquelle peut subir une discontinuité ?
- $u_C$
- $i_L$
+ $u_L$
- l'énergie $W_C$
= $u_L = L\,\dfrac{di}{dt}$ peut sauter si $i_L$ change brutalement de pente. $u_C$, $i_L$ et les énergies sont continues.

? Pourquoi l'énergie stockée ne peut-elle pas varier instantanément ?
- parce que les composants sont parfaits
+ parce que la puissance $p = dW/dt$ serait alors infinie
- parce que la résistance est toujours non nulle
- parce que la tension est alternative
= Un générateur ne peut pas fournir une puissance infinie.

? Un échelon de tension est…
- une tension qui croît progressivement
+ un changement brusque de la tension d'une valeur constante à une autre, en un temps considéré comme nul
- une tension sinusoïdale
- une tension nulle
= C'est l'excitation de base pour provoquer un transitoire.

? Comment obtient-on expérimentalement des échelons répétés pour les voir à l'oscilloscope ?
- avec un voltmètre
+ avec un GBF en mode créneau
- avec un multimètre en mode ohmmètre
- avec un transformateur
= Le GBF en créneau répète l'échelon plusieurs fois par seconde.

? On considère qu'une évolution exponentielle est pratiquement terminée au bout de…
- $\tau/2$
- $\tau$
+ $5\tau$
- $50\tau$
= À $5\tau$, on a atteint environ 99 % de l'évolution.

? Un condensateur déchargé est relié à un générateur $E$ par une résistance $R$ à $t = 0$. Que vaut $i(0^+)$ ?
- $0$
+ $E/R$
- $E\,R$
- $E/(RC)$
= $u_C(0^+) = 0$, donc toute la tension est aux bornes de $R$ : $i(0^+) = E/R$.

? Une bobine $L$ est parcourue par $I_0$ juste avant une commutation. Que vaut $i_L(0^+)$ ?
- $0$
+ $I_0$
- $I_0/2$
- $L\,I_0$
= $i_L$ est continu : $i_L(0^+) = i_L(0^-) = I_0$.
```

---
id: circuit-lc
titre: Second ordre et circuit LC : oscillations libres
seance: Chapitre 3 · section 3.7.1 et 3.7.2
importance: 4
---

## Avant de commencer

Pour l'équation $a\,r^2 + b\,r + c = 0$, le discriminant est $\Delta = b^2 - 4ac$. S'il est négatif, les racines sont complexes.

```exercice Vérifie ton prérequis
? Combien de racines réelles a l'équation $r^2 + 4 = 0$ ?
reponse: 0
= Aucune : $r^2 = -4$ donne deux racines imaginaires pures $r = \pm 2j$. C'est exactement la situation du circuit LC.
```

## Comment aborder ce chapitre

> [!astuce] **Pense « balançoire sans frottement ».** Dans le circuit LC, l'énergie passe sans cesse du condensateur (électrique) à la bobine (magnétique) et revient, sans jamais se perdre. Il y a deux réservoirs, donc deux conditions initiales.

> [!piege] Utiliser une seule condition initiale. Une équation du **second ordre** en demande **deux** : la tension $u_C(0)$ et le courant $i(0)$ (donc la dérivée de $u_C$ en 0).

À la fin, tu sais résoudre l'équation homogène du second ordre selon le signe de $\Delta$, et décrire l'oscillation libre du circuit LC : $\omega_0$, $T_0$, quadrature, énergie.

## Idée 1 · Les équations du second ordre

Idée : les régimes transitoires des circuits linéaires sont régis par $a\,\dfrac{d^2 f}{dt^2} + b\,\dfrac{df}{dt} + c\,f = g(t)$ ($a$, $b$, $c$ réels positifs). La solution est $f = f_1 + f_2$ : $f_1$ est le **régime libre**, $f_2$ le **régime forcé**.

On obtient $f_1$ avec l'équation caractéristique $a\,r^2 + b\,r + c = 0$, de discriminant $\Delta = b^2 - 4ac$.

| Discriminant | Racines | Solution $f_1(t)$ | Régime |
|---|---|---|---|
| $\Delta > 0$ | deux réelles négatives $r_1$, $r_2$ | $A\,e^{r_1 t} + B\,e^{r_2 t}$ | apériodique |
| $\Delta = 0$ | une racine double $r$ | $(A + B\,t)\,e^{r t}$ | critique |
| $\Delta < 0$ | complexes $r = \alpha \pm j\omega$ | $e^{\alpha t}\,[A\cos\omega t + B\sin\omega t]$ | pseudo-périodique (sinusoïdal si $\alpha = 0$) |

Les constantes $A$ et $B$ se déterminent avec deux conditions initiales : la valeur de $f$ et celle de sa dérivée en $t = 0$.

## Idée 2 · Le circuit LC : un oscillateur sans perte

Idée : le condensateur chargé sous $E$ se décharge dans une bobine **idéale** (sans résistance). Pour $t < 0$ : $K$ en position 1, $u_C = E$. À $t = 0$ : $K$ bascule en position 2.

```etapes Établir l'équation du circuit LC
Loi des mailles :: En conventions récepteur : $u_C + u_L = 0$.
Exprime $u_L$ :: $i = C\,\dfrac{du_C}{dt}$ et $u_L = L\,\dfrac{di}{dt} = LC\,\dfrac{d^2 u_C}{dt^2}$.
Équation :: $LC\,\dfrac{d^2 u_C}{dt^2} + u_C = 0$.
Forme canonique :: $\dfrac{d^2 u_C}{dt^2} + \omega_0^2\,u_C = 0$ avec $\omega_0 = \dfrac{1}{\sqrt{LC}}$ et $T_0 = \dfrac{2\pi}{\omega_0} = 2\pi\sqrt{LC}$.
```

Ici $a = LC$, $b = 0$, $c = 1$ : $\Delta = -4LC < 0$ et les racines sont imaginaires pures, $r = \pm j\omega_0$. Donc $u_C = A\cos\omega_0 t + B\sin\omega_0 t$.

```etapes Les deux conditions initiales
Première condition :: $u_C(0) = E$ (continuité de la tension du condensateur), donc $A = E$.
Deuxième condition :: $i(0) = 0$ (continuité du courant dans la bobine), donc $\dfrac{du_C}{dt}(0) = 0$, donc $B = 0$.
Résultat :: $u_C(t) = E\cos\omega_0 t$ et $i(t) = C\,\dfrac{du_C}{dt} = -E\sqrt{\dfrac{C}{L}}\,\sin\omega_0 t$.
```

```html
<svg viewBox="0 0 560 240" role="img" aria-label="Oscillations libres du circuit LC : uC = E cos(w0 t) en orange et i proportionnel à moins sin(w0 t) en bleu, en quadrature" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V206"/><path d="M44 111.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M110.0 108.0v6" stroke="currentColor" stroke-width="1"/><text x="110.0" y="222" text-anchor="middle">T0/4</text><path d="M172.0 108.0v6" stroke="currentColor" stroke-width="1"/><text x="172.0" y="222" text-anchor="middle">T0/2</text><path d="M296.0 108.0v6" stroke="currentColor" stroke-width="1"/><text x="296.0" y="222" text-anchor="middle">T0</text><path d="M420.0 108.0v6" stroke="currentColor" stroke-width="1"/><text x="420.0" y="222" text-anchor="middle">3T0/2</text><path d="M544.0 108.0v6" stroke="currentColor" stroke-width="1"/><text x="544.0" y="222" text-anchor="middle">2T0</text><path d="M45 190.2h6" stroke="currentColor" stroke-width="1"/><text x="41" y="194.2" text-anchor="end">−E</text><path d="M45 111.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="115.0" text-anchor="end">0</text><path d="M45 31.8h6" stroke="currentColor" stroke-width="1"/><text x="41" y="35.8" text-anchor="end">E</text><text x="544" y="234" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">orange : uC · bleu : i (échelle libre)</text></g><path d="M48.0 31.8 L50.1 31.9 L52.1 32.3 L54.2 32.8 L56.3 33.6 L58.3 34.5 L60.4 35.7 L62.5 37.1 L64.5 38.7 L66.6 40.5 L68.7 42.4 L70.7 44.6 L72.8 47.0 L74.9 49.5 L76.9 52.2 L79.0 55.0 L81.1 58.0 L83.1 61.2 L85.2 64.5 L87.3 67.9 L89.3 71.4 L91.4 75.1 L93.5 78.8 L95.5 82.6 L97.6 86.5 L99.7 90.5 L101.7 94.5 L103.8 98.6 L105.9 102.7 L107.9 106.9 L110.0 111.0 L112.1 115.1 L114.1 119.3 L116.2 123.4 L118.3 127.5 L120.3 131.5 L122.4 135.5 L124.5 139.4 L126.5 143.2 L128.6 146.9 L130.7 150.6 L132.7 154.1 L134.8 157.5 L136.9 160.8 L138.9 164.0 L141.0 167.0 L143.1 169.8 L145.1 172.5 L147.2 175.0 L149.3 177.4 L151.3 179.6 L153.4 181.5 L155.5 183.3 L157.5 184.9 L159.6 186.3 L161.7 187.5 L163.7 188.4 L165.8 189.2 L167.9 189.7 L169.9 190.1 L172.0 190.2 L174.1 190.1 L176.1 189.7 L178.2 189.2 L180.3 188.4 L182.3 187.5 L184.4 186.3 L186.5 184.9 L188.5 183.3 L190.6 181.5 L192.7 179.6 L194.7 177.4 L196.8 175.0 L198.9 172.5 L200.9 169.8 L203.0 167.0 L205.1 164.0 L207.1 160.8 L209.2 157.5 L211.3 154.1 L213.3 150.6 L215.4 146.9 L217.5 143.2 L219.5 139.4 L221.6 135.5 L223.7 131.5 L225.7 127.5 L227.8 123.4 L229.9 119.3 L231.9 115.1 L234.0 111.0 L236.1 106.9 L238.1 102.7 L240.2 98.6 L242.3 94.5 L244.3 90.5 L246.4 86.5 L248.5 82.6 L250.5 78.8 L252.6 75.1 L254.7 71.4 L256.7 67.9 L258.8 64.5 L260.9 61.2 L262.9 58.0 L265.0 55.0 L267.1 52.2 L269.1 49.5 L271.2 47.0 L273.3 44.6 L275.3 42.4 L277.4 40.5 L279.5 38.7 L281.5 37.1 L283.6 35.7 L285.7 34.5 L287.7 33.6 L289.8 32.8 L291.9 32.3 L293.9 31.9 L296.0 31.8 L298.1 31.9 L300.1 32.3 L302.2 32.8 L304.3 33.6 L306.3 34.5 L308.4 35.7 L310.5 37.1 L312.5 38.7 L314.6 40.5 L316.7 42.4 L318.7 44.6 L320.8 47.0 L322.9 49.5 L324.9 52.2 L327.0 55.0 L329.1 58.0 L331.1 61.2 L333.2 64.5 L335.3 67.9 L337.3 71.4 L339.4 75.1 L341.5 78.8 L343.5 82.6 L345.6 86.5 L347.7 90.5 L349.7 94.5 L351.8 98.6 L353.9 102.7 L355.9 106.9 L358.0 111.0 L360.1 115.1 L362.1 119.3 L364.2 123.4 L366.3 127.5 L368.3 131.5 L370.4 135.5 L372.5 139.4 L374.5 143.2 L376.6 146.9 L378.7 150.6 L380.7 154.1 L382.8 157.5 L384.9 160.8 L386.9 164.0 L389.0 167.0 L391.1 169.8 L393.1 172.5 L395.2 175.0 L397.3 177.4 L399.3 179.6 L401.4 181.5 L403.5 183.3 L405.5 184.9 L407.6 186.3 L409.7 187.5 L411.7 188.4 L413.8 189.2 L415.9 189.7 L417.9 190.1 L420.0 190.2 L422.1 190.1 L424.1 189.7 L426.2 189.2 L428.3 188.4 L430.3 187.5 L432.4 186.3 L434.5 184.9 L436.5 183.3 L438.6 181.5 L440.7 179.6 L442.7 177.4 L444.8 175.0 L446.9 172.5 L448.9 169.8 L451.0 167.0 L453.1 164.0 L455.1 160.8 L457.2 157.5 L459.3 154.1 L461.3 150.6 L463.4 146.9 L465.5 143.2 L467.5 139.4 L469.6 135.5 L471.7 131.5 L473.7 127.5 L475.8 123.4 L477.9 119.3 L479.9 115.1 L482.0 111.0 L484.1 106.9 L486.1 102.7 L488.2 98.6 L490.3 94.5 L492.3 90.5 L494.4 86.5 L496.5 82.6 L498.5 78.8 L500.6 75.1 L502.7 71.4 L504.7 67.9 L506.8 64.5 L508.9 61.2 L510.9 58.0 L513.0 55.0 L515.1 52.2 L517.1 49.5 L519.2 47.0 L521.3 44.6 L523.3 42.4 L525.4 40.5 L527.5 38.7 L529.5 37.1 L531.6 35.7 L533.7 34.5 L535.7 33.6 L537.8 32.8 L539.9 32.3 L541.9 31.9 L544.0 31.8" stroke="#D9824F" stroke-width="2.6" fill="none"/><path d="M48.0 111.0 L50.1 115.1 L52.1 119.3 L54.2 123.4 L56.3 127.5 L58.3 131.5 L60.4 135.5 L62.5 139.4 L64.5 143.2 L66.6 146.9 L68.7 150.6 L70.7 154.1 L72.8 157.5 L74.9 160.8 L76.9 164.0 L79.0 167.0 L81.1 169.8 L83.1 172.5 L85.2 175.0 L87.3 177.4 L89.3 179.6 L91.4 181.5 L93.5 183.3 L95.5 184.9 L97.6 186.3 L99.7 187.5 L101.7 188.4 L103.8 189.2 L105.9 189.7 L107.9 190.1 L110.0 190.2 L112.1 190.1 L114.1 189.7 L116.2 189.2 L118.3 188.4 L120.3 187.5 L122.4 186.3 L124.5 184.9 L126.5 183.3 L128.6 181.5 L130.7 179.6 L132.7 177.4 L134.8 175.0 L136.9 172.5 L138.9 169.8 L141.0 167.0 L143.1 164.0 L145.1 160.8 L147.2 157.5 L149.3 154.1 L151.3 150.6 L153.4 146.9 L155.5 143.2 L157.5 139.4 L159.6 135.5 L161.7 131.5 L163.7 127.5 L165.8 123.4 L167.9 119.3 L169.9 115.1 L172.0 111.0 L174.1 106.9 L176.1 102.7 L178.2 98.6 L180.3 94.5 L182.3 90.5 L184.4 86.5 L186.5 82.6 L188.5 78.8 L190.6 75.1 L192.7 71.4 L194.7 67.9 L196.8 64.5 L198.9 61.2 L200.9 58.0 L203.0 55.0 L205.1 52.2 L207.1 49.5 L209.2 47.0 L211.3 44.6 L213.3 42.4 L215.4 40.5 L217.5 38.7 L219.5 37.1 L221.6 35.7 L223.7 34.5 L225.7 33.6 L227.8 32.8 L229.9 32.3 L231.9 31.9 L234.0 31.8 L236.1 31.9 L238.1 32.3 L240.2 32.8 L242.3 33.6 L244.3 34.5 L246.4 35.7 L248.5 37.1 L250.5 38.7 L252.6 40.5 L254.7 42.4 L256.7 44.6 L258.8 47.0 L260.9 49.5 L262.9 52.2 L265.0 55.0 L267.1 58.0 L269.1 61.2 L271.2 64.5 L273.3 67.9 L275.3 71.4 L277.4 75.1 L279.5 78.8 L281.5 82.6 L283.6 86.5 L285.7 90.5 L287.7 94.5 L289.8 98.6 L291.9 102.7 L293.9 106.9 L296.0 111.0 L298.1 115.1 L300.1 119.3 L302.2 123.4 L304.3 127.5 L306.3 131.5 L308.4 135.5 L310.5 139.4 L312.5 143.2 L314.6 146.9 L316.7 150.6 L318.7 154.1 L320.8 157.5 L322.9 160.8 L324.9 164.0 L327.0 167.0 L329.1 169.8 L331.1 172.5 L333.2 175.0 L335.3 177.4 L337.3 179.6 L339.4 181.5 L341.5 183.3 L343.5 184.9 L345.6 186.3 L347.7 187.5 L349.7 188.4 L351.8 189.2 L353.9 189.7 L355.9 190.1 L358.0 190.2 L360.1 190.1 L362.1 189.7 L364.2 189.2 L366.3 188.4 L368.3 187.5 L370.4 186.3 L372.5 184.9 L374.5 183.3 L376.6 181.5 L378.7 179.6 L380.7 177.4 L382.8 175.0 L384.9 172.5 L386.9 169.8 L389.0 167.0 L391.1 164.0 L393.1 160.8 L395.2 157.5 L397.3 154.1 L399.3 150.6 L401.4 146.9 L403.5 143.2 L405.5 139.4 L407.6 135.5 L409.7 131.5 L411.7 127.5 L413.8 123.4 L415.9 119.3 L417.9 115.1 L420.0 111.0 L422.1 106.9 L424.1 102.7 L426.2 98.6 L428.3 94.5 L430.3 90.5 L432.4 86.5 L434.5 82.6 L436.5 78.8 L438.6 75.1 L440.7 71.4 L442.7 67.9 L444.8 64.5 L446.9 61.2 L448.9 58.0 L451.0 55.0 L453.1 52.2 L455.1 49.5 L457.2 47.0 L459.3 44.6 L461.3 42.4 L463.4 40.5 L465.5 38.7 L467.5 37.1 L469.6 35.7 L471.7 34.5 L473.7 33.6 L475.8 32.8 L477.9 32.3 L479.9 31.9 L482.0 31.8 L484.1 31.9 L486.1 32.3 L488.2 32.8 L490.3 33.6 L492.3 34.5 L494.4 35.7 L496.5 37.1 L498.5 38.7 L500.6 40.5 L502.7 42.4 L504.7 44.6 L506.8 47.0 L508.9 49.5 L510.9 52.2 L513.0 55.0 L515.1 58.0 L517.1 61.2 L519.2 64.5 L521.3 67.9 L523.3 71.4 L525.4 75.1 L527.5 78.8 L529.5 82.6 L531.6 86.5 L533.7 90.5 L535.7 94.5 L537.8 98.6 L539.9 102.7 L541.9 106.9 L544.0 111.0" stroke="#6C8FB8" stroke-width="2.0" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"></g></svg>
```


- $u_C$ oscille entre $+E$ et $-E$ sans jamais s'atténuer : **oscillateur non amorti**.
- $i$ est en **quadrature** avec $u_C$ (décalage de $T_0/4$) : quand $u_C = 0$, $|i|$ est maximal, $I_m = E\sqrt{C/L}$.
- Pas de terme en $du/dt$ : pas de résistance, donc pas de perte. Pas de second membre : pas de générateur, c'est le régime libre.

> [!attention] En réalité, la résistance de la bobine amortit les oscillations : le régime devient pseudo-périodique (chapitre suivant).

## Idée 3 · L'énergie passe d'un composant à l'autre

Idée : $E_C = \tfrac12 C u_C^2 = \tfrac12 C E^2\cos^2\omega_0 t$ et $E_L = \tfrac12 L i^2 = \tfrac12 C E^2\sin^2\omega_0 t$. La somme est constante.

```html
<svg viewBox="0 0 560 200" role="img" aria-label="Échange d'énergie dans le circuit LC : EC en orange, EL en bleu, somme constante égale à W" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V166"/><path d="M44 166.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M172.0 163.0v6" stroke="currentColor" stroke-width="1"/><text x="172.0" y="182" text-anchor="middle">T0/2</text><path d="M296.0 163.0v6" stroke="currentColor" stroke-width="1"/><text x="296.0" y="182" text-anchor="middle">T0</text><path d="M420.0 163.0v6" stroke="currentColor" stroke-width="1"/><text x="420.0" y="182" text-anchor="middle">3T0/2</text><path d="M544.0 163.0v6" stroke="currentColor" stroke-width="1"/><text x="544.0" y="182" text-anchor="middle">2T0</text><path d="M45 166.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="170.0" text-anchor="end">0</text><path d="M45 103.5h6" stroke="currentColor" stroke-width="1"/><text x="41" y="107.5" text-anchor="end">W/2</text><path d="M45 41.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="45.0" text-anchor="end">W</text><text x="544" y="194" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">EC (orange), EL (bleu), W (noir)</text></g><path d="M48.0 41.0 L50.1 41.3 L52.1 42.4 L54.2 44.1 L56.3 46.4 L58.3 49.4 L60.4 52.9 L62.5 57.1 L64.5 61.7 L66.6 66.8 L68.7 72.2 L70.7 78.1 L72.8 84.2 L74.9 90.5 L76.9 97.0 L79.0 103.5 L81.1 110.0 L83.1 116.5 L85.2 122.8 L87.3 128.9 L89.3 134.7 L91.4 140.2 L93.5 145.3 L95.5 149.9 L97.6 154.1 L99.7 157.6 L101.7 160.6 L103.8 162.9 L105.9 164.6 L107.9 165.7 L110.0 166.0 L112.1 165.7 L114.1 164.6 L116.2 162.9 L118.3 160.6 L120.3 157.6 L122.4 154.1 L124.5 149.9 L126.5 145.3 L128.6 140.2 L130.7 134.8 L132.7 128.9 L134.8 122.8 L136.9 116.5 L138.9 110.0 L141.0 103.5 L143.1 97.0 L145.1 90.5 L147.2 84.2 L149.3 78.1 L151.3 72.2 L153.4 66.8 L155.5 61.7 L157.5 57.1 L159.6 52.9 L161.7 49.4 L163.7 46.4 L165.8 44.1 L167.9 42.4 L169.9 41.3 L172.0 41.0 L174.1 41.3 L176.1 42.4 L178.2 44.1 L180.3 46.4 L182.3 49.4 L184.4 52.9 L186.5 57.1 L188.5 61.7 L190.6 66.8 L192.7 72.2 L194.7 78.1 L196.8 84.2 L198.9 90.5 L200.9 97.0 L203.0 103.5 L205.1 110.0 L207.1 116.5 L209.2 122.8 L211.3 128.9 L213.3 134.7 L215.4 140.2 L217.5 145.3 L219.5 149.9 L221.6 154.1 L223.7 157.6 L225.7 160.6 L227.8 162.9 L229.9 164.6 L231.9 165.7 L234.0 166.0 L236.1 165.7 L238.1 164.6 L240.2 162.9 L242.3 160.6 L244.3 157.6 L246.4 154.1 L248.5 149.9 L250.5 145.3 L252.6 140.2 L254.7 134.7 L256.7 128.9 L258.8 122.8 L260.9 116.5 L262.9 110.0 L265.0 103.5 L267.1 97.0 L269.1 90.5 L271.2 84.2 L273.3 78.1 L275.3 72.3 L277.4 66.8 L279.5 61.7 L281.5 57.1 L283.6 52.9 L285.7 49.4 L287.7 46.4 L289.8 44.1 L291.9 42.4 L293.9 41.3 L296.0 41.0 L298.1 41.3 L300.1 42.4 L302.2 44.1 L304.3 46.4 L306.3 49.4 L308.4 52.9 L310.5 57.1 L312.5 61.7 L314.6 66.8 L316.7 72.2 L318.7 78.1 L320.8 84.2 L322.9 90.5 L324.9 97.0 L327.0 103.5 L329.1 110.0 L331.1 116.5 L333.2 122.8 L335.3 128.9 L337.3 134.8 L339.4 140.2 L341.5 145.3 L343.5 149.9 L345.6 154.1 L347.7 157.6 L349.7 160.6 L351.8 162.9 L353.9 164.6 L355.9 165.7 L358.0 166.0 L360.1 165.7 L362.1 164.6 L364.2 162.9 L366.3 160.6 L368.3 157.6 L370.4 154.1 L372.5 149.9 L374.5 145.3 L376.6 140.2 L378.7 134.8 L380.7 128.9 L382.8 122.8 L384.9 116.5 L386.9 110.0 L389.0 103.5 L391.1 97.0 L393.1 90.5 L395.2 84.2 L397.3 78.1 L399.3 72.2 L401.4 66.8 L403.5 61.7 L405.5 57.1 L407.6 52.9 L409.7 49.4 L411.7 46.4 L413.8 44.1 L415.9 42.4 L417.9 41.3 L420.0 41.0 L422.1 41.3 L424.1 42.4 L426.2 44.1 L428.3 46.4 L430.3 49.4 L432.4 52.9 L434.5 57.1 L436.5 61.7 L438.6 66.8 L440.7 72.2 L442.7 78.1 L444.8 84.2 L446.9 90.5 L448.9 97.0 L451.0 103.5 L453.1 110.0 L455.1 116.5 L457.2 122.8 L459.3 128.9 L461.3 134.8 L463.4 140.2 L465.5 145.3 L467.5 149.9 L469.6 154.1 L471.7 157.6 L473.7 160.6 L475.8 162.9 L477.9 164.6 L479.9 165.7 L482.0 166.0 L484.1 165.7 L486.1 164.6 L488.2 162.9 L490.3 160.6 L492.3 157.6 L494.4 154.1 L496.5 149.9 L498.5 145.3 L500.6 140.2 L502.7 134.8 L504.7 128.9 L506.8 122.8 L508.9 116.5 L510.9 110.0 L513.0 103.5 L515.1 97.0 L517.1 90.5 L519.2 84.2 L521.3 78.1 L523.3 72.2 L525.4 66.8 L527.5 61.7 L529.5 57.1 L531.6 52.9 L533.7 49.4 L535.7 46.4 L537.8 44.1 L539.9 42.4 L541.9 41.3 L544.0 41.0" stroke="#D9824F" stroke-width="2.4" fill="none"/><path d="M48.0 166.0 L50.1 165.7 L52.1 164.6 L54.2 162.9 L56.3 160.6 L58.3 157.6 L60.4 154.1 L62.5 149.9 L64.5 145.3 L66.6 140.2 L68.7 134.8 L70.7 128.9 L72.8 122.8 L74.9 116.5 L76.9 110.0 L79.0 103.5 L81.1 97.0 L83.1 90.5 L85.2 84.2 L87.3 78.1 L89.3 72.2 L91.4 66.8 L93.5 61.7 L95.5 57.1 L97.6 52.9 L99.7 49.4 L101.7 46.4 L103.8 44.1 L105.9 42.4 L107.9 41.3 L110.0 41.0 L112.1 41.3 L114.1 42.4 L116.2 44.1 L118.3 46.4 L120.3 49.4 L122.4 52.9 L124.5 57.1 L126.5 61.7 L128.6 66.8 L130.7 72.2 L132.7 78.1 L134.8 84.2 L136.9 90.5 L138.9 97.0 L141.0 103.5 L143.1 110.0 L145.1 116.5 L147.2 122.8 L149.3 128.9 L151.3 134.8 L153.4 140.2 L155.5 145.3 L157.5 149.9 L159.6 154.1 L161.7 157.6 L163.7 160.6 L165.8 162.9 L167.9 164.6 L169.9 165.7 L172.0 166.0 L174.1 165.7 L176.1 164.6 L178.2 162.9 L180.3 160.6 L182.3 157.6 L184.4 154.1 L186.5 149.9 L188.5 145.3 L190.6 140.2 L192.7 134.7 L194.7 128.9 L196.8 122.8 L198.9 116.5 L200.9 110.0 L203.0 103.5 L205.1 97.0 L207.1 90.5 L209.2 84.2 L211.3 78.1 L213.3 72.3 L215.4 66.8 L217.5 61.7 L219.5 57.1 L221.6 52.9 L223.7 49.4 L225.7 46.4 L227.8 44.1 L229.9 42.4 L231.9 41.3 L234.0 41.0 L236.1 41.3 L238.1 42.4 L240.2 44.1 L242.3 46.4 L244.3 49.4 L246.4 52.9 L248.5 57.1 L250.5 61.7 L252.6 66.8 L254.7 72.2 L256.7 78.1 L258.8 84.2 L260.9 90.5 L262.9 97.0 L265.0 103.5 L267.1 110.0 L269.1 116.5 L271.2 122.8 L273.3 128.9 L275.3 134.7 L277.4 140.2 L279.5 145.3 L281.5 149.9 L283.6 154.1 L285.7 157.6 L287.7 160.6 L289.8 162.9 L291.9 164.6 L293.9 165.7 L296.0 166.0 L298.1 165.7 L300.1 164.6 L302.2 162.9 L304.3 160.6 L306.3 157.6 L308.4 154.1 L310.5 149.9 L312.5 145.3 L314.6 140.2 L316.7 134.8 L318.7 128.9 L320.8 122.8 L322.9 116.5 L324.9 110.0 L327.0 103.5 L329.1 97.0 L331.1 90.5 L333.2 84.2 L335.3 78.1 L337.3 72.2 L339.4 66.8 L341.5 61.7 L343.5 57.1 L345.6 52.9 L347.7 49.4 L349.7 46.4 L351.8 44.1 L353.9 42.4 L355.9 41.3 L358.0 41.0 L360.1 41.3 L362.1 42.4 L364.2 44.1 L366.3 46.4 L368.3 49.4 L370.4 52.9 L372.5 57.1 L374.5 61.7 L376.6 66.8 L378.7 72.2 L380.7 78.1 L382.8 84.2 L384.9 90.5 L386.9 97.0 L389.0 103.5 L391.1 110.0 L393.1 116.5 L395.2 122.8 L397.3 128.9 L399.3 134.8 L401.4 140.2 L403.5 145.3 L405.5 149.9 L407.6 154.1 L409.7 157.6 L411.7 160.6 L413.8 162.9 L415.9 164.6 L417.9 165.7 L420.0 166.0 L422.1 165.7 L424.1 164.6 L426.2 162.9 L428.3 160.6 L430.3 157.6 L432.4 154.1 L434.5 149.9 L436.5 145.3 L438.6 140.2 L440.7 134.8 L442.7 128.9 L444.8 122.8 L446.9 116.5 L448.9 110.0 L451.0 103.5 L453.1 97.0 L455.1 90.5 L457.2 84.2 L459.3 78.1 L461.3 72.2 L463.4 66.8 L465.5 61.7 L467.5 57.1 L469.6 52.9 L471.7 49.4 L473.7 46.4 L475.8 44.1 L477.9 42.4 L479.9 41.3 L482.0 41.0 L484.1 41.3 L486.1 42.4 L488.2 44.1 L490.3 46.4 L492.3 49.4 L494.4 52.9 L496.5 57.1 L498.5 61.7 L500.6 66.8 L502.7 72.2 L504.7 78.1 L506.8 84.2 L508.9 90.5 L510.9 97.0 L513.0 103.5 L515.1 110.0 L517.1 116.5 L519.2 122.8 L521.3 128.9 L523.3 134.8 L525.4 140.2 L527.5 145.3 L529.5 149.9 L531.6 154.1 L533.7 157.6 L535.7 160.6 L537.8 162.9 L539.9 164.6 L541.9 165.7 L544.0 166.0" stroke="#6C8FB8" stroke-width="2.4" fill="none"/><path d="M48.0 41.0 L50.1 41.0 L52.1 41.0 L54.2 41.0 L56.3 41.0 L58.3 41.0 L60.4 41.0 L62.5 41.0 L64.5 41.0 L66.6 41.0 L68.7 41.0 L70.7 41.0 L72.8 41.0 L74.9 41.0 L76.9 41.0 L79.0 41.0 L81.1 41.0 L83.1 41.0 L85.2 41.0 L87.3 41.0 L89.3 41.0 L91.4 41.0 L93.5 41.0 L95.5 41.0 L97.6 41.0 L99.7 41.0 L101.7 41.0 L103.8 41.0 L105.9 41.0 L107.9 41.0 L110.0 41.0 L112.1 41.0 L114.1 41.0 L116.2 41.0 L118.3 41.0 L120.3 41.0 L122.4 41.0 L124.5 41.0 L126.5 41.0 L128.6 41.0 L130.7 41.0 L132.7 41.0 L134.8 41.0 L136.9 41.0 L138.9 41.0 L141.0 41.0 L143.1 41.0 L145.1 41.0 L147.2 41.0 L149.3 41.0 L151.3 41.0 L153.4 41.0 L155.5 41.0 L157.5 41.0 L159.6 41.0 L161.7 41.0 L163.7 41.0 L165.8 41.0 L167.9 41.0 L169.9 41.0 L172.0 41.0 L174.1 41.0 L176.1 41.0 L178.2 41.0 L180.3 41.0 L182.3 41.0 L184.4 41.0 L186.5 41.0 L188.5 41.0 L190.6 41.0 L192.7 41.0 L194.7 41.0 L196.8 41.0 L198.9 41.0 L200.9 41.0 L203.0 41.0 L205.1 41.0 L207.1 41.0 L209.2 41.0 L211.3 41.0 L213.3 41.0 L215.4 41.0 L217.5 41.0 L219.5 41.0 L221.6 41.0 L223.7 41.0 L225.7 41.0 L227.8 41.0 L229.9 41.0 L231.9 41.0 L234.0 41.0 L236.1 41.0 L238.1 41.0 L240.2 41.0 L242.3 41.0 L244.3 41.0 L246.4 41.0 L248.5 41.0 L250.5 41.0 L252.6 41.0 L254.7 41.0 L256.7 41.0 L258.8 41.0 L260.9 41.0 L262.9 41.0 L265.0 41.0 L267.1 41.0 L269.1 41.0 L271.2 41.0 L273.3 41.0 L275.3 41.0 L277.4 41.0 L279.5 41.0 L281.5 41.0 L283.6 41.0 L285.7 41.0 L287.7 41.0 L289.8 41.0 L291.9 41.0 L293.9 41.0 L296.0 41.0 L298.1 41.0 L300.1 41.0 L302.2 41.0 L304.3 41.0 L306.3 41.0 L308.4 41.0 L310.5 41.0 L312.5 41.0 L314.6 41.0 L316.7 41.0 L318.7 41.0 L320.8 41.0 L322.9 41.0 L324.9 41.0 L327.0 41.0 L329.1 41.0 L331.1 41.0 L333.2 41.0 L335.3 41.0 L337.3 41.0 L339.4 41.0 L341.5 41.0 L343.5 41.0 L345.6 41.0 L347.7 41.0 L349.7 41.0 L351.8 41.0 L353.9 41.0 L355.9 41.0 L358.0 41.0 L360.1 41.0 L362.1 41.0 L364.2 41.0 L366.3 41.0 L368.3 41.0 L370.4 41.0 L372.5 41.0 L374.5 41.0 L376.6 41.0 L378.7 41.0 L380.7 41.0 L382.8 41.0 L384.9 41.0 L386.9 41.0 L389.0 41.0 L391.1 41.0 L393.1 41.0 L395.2 41.0 L397.3 41.0 L399.3 41.0 L401.4 41.0 L403.5 41.0 L405.5 41.0 L407.6 41.0 L409.7 41.0 L411.7 41.0 L413.8 41.0 L415.9 41.0 L417.9 41.0 L420.0 41.0 L422.1 41.0 L424.1 41.0 L426.2 41.0 L428.3 41.0 L430.3 41.0 L432.4 41.0 L434.5 41.0 L436.5 41.0 L438.6 41.0 L440.7 41.0 L442.7 41.0 L444.8 41.0 L446.9 41.0 L448.9 41.0 L451.0 41.0 L453.1 41.0 L455.1 41.0 L457.2 41.0 L459.3 41.0 L461.3 41.0 L463.4 41.0 L465.5 41.0 L467.5 41.0 L469.6 41.0 L471.7 41.0 L473.7 41.0 L475.8 41.0 L477.9 41.0 L479.9 41.0 L482.0 41.0 L484.1 41.0 L486.1 41.0 L488.2 41.0 L490.3 41.0 L492.3 41.0 L494.4 41.0 L496.5 41.0 L498.5 41.0 L500.6 41.0 L502.7 41.0 L504.7 41.0 L506.8 41.0 L508.9 41.0 L510.9 41.0 L513.0 41.0 L515.1 41.0 L517.1 41.0 L519.2 41.0 L521.3 41.0 L523.3 41.0 L525.4 41.0 L527.5 41.0 L529.5 41.0 L531.6 41.0 L533.7 41.0 L535.7 41.0 L537.8 41.0 L539.9 41.0 L541.9 41.0 L544.0 41.0" stroke="currentColor" stroke-width="1.4" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"></g></svg>
```


$$W = E_C + E_L = \tfrac12 C E^2 = \tfrac12 L I_m^2 = \text{cste}$$

L'énergie passe du condensateur à la bobine en un quart de période, puis revient au quart suivant. L'égalité $\tfrac12 C E^2 = \tfrac12 L I_m^2$ redonne $I_m = E\sqrt{C/L}$.

> [!retenir] LC : $\omega_0 = \dfrac{1}{\sqrt{LC}}$, $T_0 = 2\pi\sqrt{LC}$, $u_C = E\cos\omega_0 t$, $i$ en quadrature, énergie totale constante.

## S'exercer

```exercice Application · circuit LC
? Un condensateur $C = 100\ \mu\text{F}$ chargé sous $E = 10\ \text{V}$ se décharge dans une bobine idéale $L = 10\ \text{mH}$. Calculer $\omega_0$, en rad/s.
indice: $\omega_0 = 1/\sqrt{LC}$ avec $LC = 10^{-2}\times 10^{-4}$.
reponse: 1000
= $LC = 10^{-6}\ \text{s}^2$, donc $\omega_0 = 1/\sqrt{10^{-6}} = 1000\ \text{rad/s}$ (calcul vérifié).
? Calculer la période $T_0$, en ms (une décimale).
indice: $T_0 = 2\pi/\omega_0$.
reponse: 6.3 ~0.1
= $T_0 = \dfrac{2\pi}{1000} \approx 6{,}28\ \text{ms}$.
? Calculer le courant maximal $I_m$, en A.
indice: $I_m = E\sqrt{C/L}$, ou égalité des énergies.
reponse: 1
= $I_m = E\sqrt{C/L} = 10\sqrt{\dfrac{10^{-4}}{10^{-2}}} = 10 \times 0{,}1 = 1\ \text{A}$. Contrôle par l'énergie : $\tfrac12 C E^2 = 5\ \text{mJ} = \tfrac12 L I_m^2 = \tfrac12 \times 10^{-2} \times 1$.
```

```exercice Interpréter les trois lignes
? Pourquoi l'équation du circuit LC n'a-t-elle ni terme en $du/dt$ ni second membre ?
= Pas de terme en $du/dt$ : il n'y a pas de résistance, donc pas de perte d'énergie. Pas de second membre : il n'y a pas de générateur dans la maille, c'est le régime libre. Il reste $LC\,u'' + u = 0$.
? À l'instant où $u_C = 0$, que valent l'énergie du condensateur et celle de la bobine ?
= $E_C = 0$ et toute l'énergie est dans la bobine : $E_L = \tfrac12 C E^2 = W$. Le courant est alors maximal ($|i| = I_m$).
```

## Flashcards

```cartes
Équation du circuit LC ? :: $LC\,\dfrac{d^2 u_C}{dt^2} + u_C = 0$, soit $u_C'' + \omega_0^2 u_C = 0$.
Pulsation propre et période propre du circuit LC ? :: $\omega_0 = \dfrac{1}{\sqrt{LC}}$ et $T_0 = \dfrac{2\pi}{\omega_0} = 2\pi\sqrt{LC}$.
Solution du circuit LC avec $u_C(0) = E$, $i(0) = 0$ ? :: $u_C = E\cos\omega_0 t$ et $i = -E\sqrt{C/L}\,\sin\omega_0 t$.
Pourquoi deux conditions initiales ? :: Équation du second ordre : continuité de $u_C$ (valeur) et de $i_L$ (donc la dérivée de $u_C$).
Relation entre $u_C$ et $i$ dans LC ? :: Quadrature : décalage de $T_0/4$. Quand $u_C = 0$, $|i|$ est maximal.
Courant maximal dans LC ? :: $I_m = E\sqrt{C/L}$, obtenu par $\tfrac12 C E^2 = \tfrac12 L I_m^2$.
Énergie totale du circuit LC ? :: $W = E_C + E_L = \tfrac12 C E^2$, constante (aucune perte).
Solutions de l'équation homogène du 2ᵉ ordre selon $\Delta$ ? :: $\Delta > 0$ apériodique ; $\Delta = 0$ critique $(A + Bt)e^{rt}$ ; $\Delta < 0$ pseudo-périodique $e^{\alpha t}(A\cos\omega t + B\sin\omega t)$.
```

## QCM du chapitre

```qcm
? Combien de conditions initiales faut-il pour une équation différentielle du second ordre ?
- une
+ deux
- trois
- aucune
= La valeur de la fonction et celle de sa dérivée en $t = 0$.

? Si $\Delta > 0$ pour l'équation caractéristique, le régime libre est…
+ apériodique
- critique
- pseudo-périodique
- sinusoïdal
= Deux racines réelles négatives : $A\,e^{r_1 t} + B\,e^{r_2 t}$.

? Si $\Delta = 0$, la solution libre s'écrit…
- $A\,e^{r_1 t} + B\,e^{r_2 t}$
+ $(A + B\,t)\,e^{r t}$
- $e^{\alpha t}[A\cos\omega t + B\sin\omega t]$
- $A\cos\omega t$
= Racine double : régime critique.

? L'équation du circuit LC (libre) est…
- $\dfrac{du}{dt} + u = 0$
+ $LC\,\dfrac{d^2 u_C}{dt^2} + u_C = 0$
- $RC\,\dfrac{du}{dt} + u = E$
- $L\,\dfrac{di}{dt} = 0$
= Loi des mailles $u_C + u_L = 0$ avec $u_L = LC\,u_C''$.

? La pulsation propre du circuit LC est…
- $\sqrt{LC}$
+ $\dfrac{1}{\sqrt{LC}}$
- $LC$
- $\dfrac{1}{LC}$
= $\omega_0 = 1/\sqrt{LC}$ (en rad/s).

? Pour $L = 10\ \text{mH}$ et $C = 100\ \mu\text{F}$, $\omega_0$ vaut…
- $100\ \text{rad/s}$
+ $1000\ \text{rad/s}$
- $10^6\ \text{rad/s}$
- $31{,}6\ \text{rad/s}$
= $LC = 10^{-6}$, donc $\omega_0 = 10^3\ \text{rad/s}$.

? Dans le circuit LC, le courant $i$ est…
- en phase avec $u_C$
+ en quadrature avec $u_C$
- en opposition de phase avec $u_C$
- constant
= $u_C = E\cos\omega_0 t$ et $i \propto -\sin\omega_0 t$ : décalage de $T_0/4$.

? Le courant maximal du circuit LC est…
- $E\sqrt{L/C}$
+ $E\sqrt{C/L}$
- $E/(LC)$
- $E/R$
= $\tfrac12 C E^2 = \tfrac12 L I_m^2$.

? Que devient l'énergie totale du circuit LC au cours du temps ?
- elle décroît exponentiellement
+ elle reste constante, égale à $\tfrac12 C E^2$
- elle double à chaque période
- elle s'annule au bout d'une demi-période
= Aucune résistance : aucune perte. $E_C + E_L = \tfrac12 C E^2$.

? Le circuit LC « réel » (bobine avec résistance) voit ses oscillations…
- rester constantes
+ s'amortir (régime pseudo-périodique)
- augmenter
- devenir apériodiques à coup sûr
= La résistance dissipe de l'énergie : l'amplitude décroît.
```

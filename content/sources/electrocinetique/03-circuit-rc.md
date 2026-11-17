---
id: circuit-rc
titre: Le circuit RC : charge et décharge
seance: Chapitre 3 · section 3.5
importance: 5
---

## Avant de commencer

La loi des mailles dit que la somme des tensions d'une maille vaut la tension du générateur. Et la fonction $e^{-t/\tau}$ vaut $1$ en $t = 0$ et tend vers $0$.

```exercice Vérifie ton prérequis
? Que vaut $e^{-t/\tau}$ pour $t = \tau$ ? (valeur décimale, deux chiffres après la virgule)
indice: $e^{-1}$.
reponse: 0.37 ~0.01
= $e^{-1} \approx 0{,}37$. Retiens ce nombre : il revient partout dans ce chapitre (63 % et 37 %).
```

## Comment aborder ce chapitre

> [!astuce] **Pense « τ » avant de penser « formule ».** Tout circuit du premier ordre fait la même chose : il rejoint sa valeur finale en suivant $e^{-t/\tau}$. À $t = \tau$ il a fait 63 % du chemin, à $5\tau$ il a presque fini. Si tu connais $\tau$ et les deux valeurs (initiale et finale), tu connais toute la courbe.

> [!piege] Écrire $u(t) = E\,e^{-t/\tau}$ pour la **charge**. La charge monte vers $E$ : $u = E\,(1 - e^{-t/\tau})$. La forme $E\,e^{-t/\tau}$ est celle de la **décharge**.

À la fin, tu sais établir l'équation du circuit RC, donner $u(t)$ et $i(t)$ à la charge et à la décharge, lire $\tau$ sur une courbe, et faire le bilan d'énergie.

## Idée 1 · L'équation du circuit RC

Idée : la loi des mailles relie $E$, la tension aux bornes de $R$ et celle du condensateur. Avec $i = C\,\dfrac{du}{dt}$, on obtient une équation différentielle du **premier ordre**.

```etapes Établir l'équation (charge sous $e(t) = E$ à $t = 0$)
Loi des mailles :: $E = R\,i(t) + u(t)$.
Relation du condensateur :: $i = C\,\dfrac{du}{dt}$.
Remplace $i$ :: $E = RC\,\dfrac{du}{dt} + u$.
Pose $\tau = RC$ :: $\tau\,\dfrac{du}{dt} + u = E$. C'est l'équation du circuit RC.
```

> [!retenir] Circuit RC : $\tau\,\dfrac{du}{dt} + u = E$ avec $\tau = RC$. Homogénéité : $\Omega \cdot \text{F} = \text{s}$.

## Idée 2 · La charge : $u(t) = E\,(1 - e^{-t/\tau})$

Idée : la solution générale est la somme d'une solution de l'équation **sans second membre** (régime libre) et d'une solution **particulière** (régime permanent).

```etapes Résoudre l'équation de la charge
Solution homogène :: $\tau\,u' + u = 0$ donne $u_h(t) = B\,e^{-t/\tau}$ (séparation des variables).
Solution particulière :: En régime permanent, $u$ est constante, donc $u' = 0$ et $u_p = E$.
Solution complète :: $u(t) = B\,e^{-t/\tau} + E$.
Condition initiale :: Par continuité de $u_C$, $u(0^+) = u(0^-) = 0$, donc $B = -E$.
Résultat :: $u(t) = E\,(1 - e^{-t/\tau})$ et $i(t) = C\,\dfrac{du}{dt} = \dfrac{E}{R}\,e^{-t/\tau}$.
```

```html
<svg viewBox="0 0 560 240" role="img" aria-label="Charge d'un condensateur : u(t)/E monte vers 1, i(t)/(E/R) descend vers 0, tangente à l'origine coupant l'asymptote en t = tau" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V206"/><path d="M44 206.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M143.4 203.0v6" stroke="currentColor" stroke-width="1"/><text x="143.4" y="222" text-anchor="middle">1τ</text><path d="M238.8 203.0v6" stroke="currentColor" stroke-width="1"/><text x="238.8" y="222" text-anchor="middle">2τ</text><path d="M334.2 203.0v6" stroke="currentColor" stroke-width="1"/><text x="334.2" y="222" text-anchor="middle">3τ</text><path d="M429.5 203.0v6" stroke="currentColor" stroke-width="1"/><text x="429.5" y="222" text-anchor="middle">4τ</text><path d="M524.9 203.0v6" stroke="currentColor" stroke-width="1"/><text x="524.9" y="222" text-anchor="middle">5τ</text><path d="M45 206.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="210.0" text-anchor="end">0</text><path d="M45 101.6h6" stroke="currentColor" stroke-width="1"/><text x="41" y="105.6" text-anchor="end">0,63</text><path d="M45 145.2h6" stroke="currentColor" stroke-width="1"/><text x="41" y="149.2" text-anchor="end">0,37</text><path d="M45 40.8h6" stroke="currentColor" stroke-width="1"/><text x="41" y="44.8" text-anchor="end">1</text><text x="544" y="234" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">orange : u/E · bleu : i/(E/R)</text></g><path d="M48 40.8H544" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 4" opacity=".55"/><path d="M48.0 206.0L143.4 40.8" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 3" fill="none"/><path d="M48.0 206.0 L50.1 202.5 L52.1 199.0 L54.2 195.6 L56.3 192.3 L58.3 189.0 L60.4 185.9 L62.5 182.7 L64.5 179.7 L66.6 176.7 L68.7 173.8 L70.7 171.0 L72.8 168.2 L74.9 165.4 L76.9 162.8 L79.0 160.2 L81.1 157.6 L83.1 155.1 L85.2 152.6 L87.3 150.2 L89.3 147.9 L91.4 145.6 L93.5 143.4 L95.5 141.2 L97.6 139.0 L99.7 136.9 L101.7 134.8 L103.8 132.8 L105.9 130.9 L107.9 128.9 L110.0 127.0 L112.1 125.2 L114.1 123.4 L116.2 121.6 L118.3 119.9 L120.3 118.2 L122.4 116.5 L124.5 114.9 L126.5 113.3 L128.6 111.8 L130.7 110.2 L132.7 108.7 L134.8 107.3 L136.9 105.9 L138.9 104.5 L141.0 103.1 L143.1 101.8 L145.1 100.5 L147.2 99.2 L149.3 97.9 L151.3 96.7 L153.4 95.5 L155.5 94.3 L157.5 93.2 L159.6 92.1 L161.7 91.0 L163.7 89.9 L165.8 88.8 L167.9 87.8 L169.9 86.8 L172.0 85.8 L174.1 84.8 L176.1 83.9 L178.2 83.0 L180.3 82.1 L182.3 81.2 L184.4 80.3 L186.5 79.5 L188.5 78.6 L190.6 77.8 L192.7 77.0 L194.7 76.3 L196.8 75.5 L198.9 74.8 L200.9 74.0 L203.0 73.3 L205.1 72.6 L207.1 71.9 L209.2 71.3 L211.3 70.6 L213.3 70.0 L215.4 69.3 L217.5 68.7 L219.5 68.1 L221.6 67.6 L223.7 67.0 L225.7 66.4 L227.8 65.9 L229.9 65.3 L231.9 64.8 L234.0 64.3 L236.1 63.8 L238.1 63.3 L240.2 62.8 L242.3 62.3 L244.3 61.9 L246.4 61.4 L248.5 61.0 L250.5 60.5 L252.6 60.1 L254.7 59.7 L256.7 59.3 L258.8 58.9 L260.9 58.5 L262.9 58.1 L265.0 57.8 L267.1 57.4 L269.1 57.0 L271.2 56.7 L273.3 56.4 L275.3 56.0 L277.4 55.7 L279.5 55.4 L281.5 55.1 L283.6 54.8 L285.7 54.5 L287.7 54.2 L289.8 53.9 L291.9 53.6 L293.9 53.3 L296.0 53.1 L298.1 52.8 L300.1 52.5 L302.2 52.3 L304.3 52.0 L306.3 51.8 L308.4 51.6 L310.5 51.3 L312.5 51.1 L314.6 50.9 L316.7 50.7 L318.7 50.5 L320.8 50.2 L322.9 50.0 L324.9 49.8 L327.0 49.6 L329.1 49.5 L331.1 49.3 L333.2 49.1 L335.3 48.9 L337.3 48.7 L339.4 48.6 L341.5 48.4 L343.5 48.2 L345.6 48.1 L347.7 47.9 L349.7 47.8 L351.8 47.6 L353.9 47.5 L355.9 47.3 L358.0 47.2 L360.1 47.1 L362.1 46.9 L364.2 46.8 L366.3 46.7 L368.3 46.5 L370.4 46.4 L372.5 46.3 L374.5 46.2 L376.6 46.1 L378.7 45.9 L380.7 45.8 L382.8 45.7 L384.9 45.6 L386.9 45.5 L389.0 45.4 L391.1 45.3 L393.1 45.2 L395.2 45.1 L397.3 45.0 L399.3 44.9 L401.4 44.8 L403.5 44.8 L405.5 44.7 L407.6 44.6 L409.7 44.5 L411.7 44.4 L413.8 44.4 L415.9 44.3 L417.9 44.2 L420.0 44.1 L422.1 44.1 L424.1 44.0 L426.2 43.9 L428.3 43.8 L430.3 43.8 L432.4 43.7 L434.5 43.7 L436.5 43.6 L438.6 43.5 L440.7 43.5 L442.7 43.4 L444.8 43.4 L446.9 43.3 L448.9 43.3 L451.0 43.2 L453.1 43.1 L455.1 43.1 L457.2 43.0 L459.3 43.0 L461.3 43.0 L463.4 42.9 L465.5 42.9 L467.5 42.8 L469.6 42.8 L471.7 42.7 L473.7 42.7 L475.8 42.6 L477.9 42.6 L479.9 42.6 L482.0 42.5 L484.1 42.5 L486.1 42.5 L488.2 42.4 L490.3 42.4 L492.3 42.3 L494.4 42.3 L496.5 42.3 L498.5 42.3 L500.6 42.2 L502.7 42.2 L504.7 42.2 L506.8 42.1 L508.9 42.1 L510.9 42.1 L513.0 42.0 L515.1 42.0 L517.1 42.0 L519.2 42.0 L521.3 41.9 L523.3 41.9 L525.4 41.9 L527.5 41.9 L529.5 41.8 L531.6 41.8 L533.7 41.8 L535.7 41.8 L537.8 41.8 L539.9 41.7 L541.9 41.7 L544.0 41.7" stroke="#D9824F" stroke-width="2.6" fill="none"/><path d="M48.0 40.8 L50.1 44.3 L52.1 47.8 L54.2 51.2 L56.3 54.5 L58.3 57.7 L60.4 60.9 L62.5 64.0 L64.5 67.1 L66.6 70.1 L68.7 73.0 L70.7 75.8 L72.8 78.6 L74.9 81.3 L76.9 84.0 L79.0 86.6 L81.1 89.2 L83.1 91.7 L85.2 94.1 L87.3 96.5 L89.3 98.9 L91.4 101.2 L93.5 103.4 L95.5 105.6 L97.6 107.8 L99.7 109.9 L101.7 111.9 L103.8 114.0 L105.9 115.9 L107.9 117.9 L110.0 119.7 L112.1 121.6 L114.1 123.4 L116.2 125.2 L118.3 126.9 L120.3 128.6 L122.4 130.3 L124.5 131.9 L126.5 133.5 L128.6 135.0 L130.7 136.6 L132.7 138.0 L134.8 139.5 L136.9 140.9 L138.9 142.3 L141.0 143.7 L143.1 145.0 L145.1 146.3 L147.2 147.6 L149.3 148.9 L151.3 150.1 L153.4 151.3 L155.5 152.5 L157.5 153.6 L159.6 154.7 L161.7 155.8 L163.7 156.9 L165.8 157.9 L167.9 159.0 L169.9 160.0 L172.0 161.0 L174.1 161.9 L176.1 162.9 L178.2 163.8 L180.3 164.7 L182.3 165.6 L184.4 166.5 L186.5 167.3 L188.5 168.1 L190.6 169.0 L192.7 169.7 L194.7 170.5 L196.8 171.3 L198.9 172.0 L200.9 172.8 L203.0 173.5 L205.1 174.2 L207.1 174.8 L209.2 175.5 L211.3 176.2 L213.3 176.8 L215.4 177.4 L217.5 178.0 L219.5 178.6 L221.6 179.2 L223.7 179.8 L225.7 180.4 L227.8 180.9 L229.9 181.5 L231.9 182.0 L234.0 182.5 L236.1 183.0 L238.1 183.5 L240.2 184.0 L242.3 184.4 L244.3 184.9 L246.4 185.4 L248.5 185.8 L250.5 186.2 L252.6 186.7 L254.7 187.1 L256.7 187.5 L258.8 187.9 L260.9 188.3 L262.9 188.6 L265.0 189.0 L267.1 189.4 L269.1 189.7 L271.2 190.1 L273.3 190.4 L275.3 190.8 L277.4 191.1 L279.5 191.4 L281.5 191.7 L283.6 192.0 L285.7 192.3 L287.7 192.6 L289.8 192.9 L291.9 193.2 L293.9 193.5 L296.0 193.7 L298.1 194.0 L300.1 194.2 L302.2 194.5 L304.3 194.7 L306.3 195.0 L308.4 195.2 L310.5 195.5 L312.5 195.7 L314.6 195.9 L316.7 196.1 L318.7 196.3 L320.8 196.5 L322.9 196.7 L324.9 196.9 L327.0 197.1 L329.1 197.3 L331.1 197.5 L333.2 197.7 L335.3 197.9 L337.3 198.0 L339.4 198.2 L341.5 198.4 L343.5 198.5 L345.6 198.7 L347.7 198.9 L349.7 199.0 L351.8 199.2 L353.9 199.3 L355.9 199.5 L358.0 199.6 L360.1 199.7 L362.1 199.9 L364.2 200.0 L366.3 200.1 L368.3 200.3 L370.4 200.4 L372.5 200.5 L374.5 200.6 L376.6 200.7 L378.7 200.8 L380.7 201.0 L382.8 201.1 L384.9 201.2 L386.9 201.3 L389.0 201.4 L391.1 201.5 L393.1 201.6 L395.2 201.7 L397.3 201.8 L399.3 201.8 L401.4 201.9 L403.5 202.0 L405.5 202.1 L407.6 202.2 L409.7 202.3 L411.7 202.4 L413.8 202.4 L415.9 202.5 L417.9 202.6 L420.0 202.7 L422.1 202.7 L424.1 202.8 L426.2 202.9 L428.3 202.9 L430.3 203.0 L432.4 203.1 L434.5 203.1 L436.5 203.2 L438.6 203.2 L440.7 203.3 L442.7 203.4 L444.8 203.4 L446.9 203.5 L448.9 203.5 L451.0 203.6 L453.1 203.6 L455.1 203.7 L457.2 203.7 L459.3 203.8 L461.3 203.8 L463.4 203.9 L465.5 203.9 L467.5 204.0 L469.6 204.0 L471.7 204.1 L473.7 204.1 L475.8 204.1 L477.9 204.2 L479.9 204.2 L482.0 204.3 L484.1 204.3 L486.1 204.3 L488.2 204.4 L490.3 204.4 L492.3 204.4 L494.4 204.5 L496.5 204.5 L498.5 204.5 L500.6 204.6 L502.7 204.6 L504.7 204.6 L506.8 204.7 L508.9 204.7 L510.9 204.7 L513.0 204.7 L515.1 204.8 L517.1 204.8 L519.2 204.8 L521.3 204.8 L523.3 204.9 L525.4 204.9 L527.5 204.9 L529.5 204.9 L531.6 205.0 L533.7 205.0 L535.7 205.0 L537.8 205.0 L539.9 205.0 L541.9 205.1 L544.0 205.1" stroke="#6C8FB8" stroke-width="2.0" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"><circle cx="143.4" cy="101.6" r="3.6" fill="#D9824F"/><text x="151.4" y="117.6" fill="#D9824F">u(τ) ≈ 0,63 E</text><text x="542" y="36.8" text-anchor="end" opacity=".85">u → E</text></g></svg>
```


- $u(t)$ est **continue** : $u(0^-) = u(0^+) = 0$.
- $\tau$ se lit graphiquement : la **tangente à l'origine** coupe l'asymptote $u = E$ en $t = \tau$, et $u(\tau) \approx 0{,}63\,E$.
- $i(t)$ est **discontinue** : $i(0^-) = 0$ mais $i(0^+) = E/R$ (le condensateur déchargé se comporte comme un fil). Ensuite $i \to 0$ : en régime permanent, interrupteur ouvert.

| $t$ | $\tau$ | $2\tau$ | $3\tau$ | $4\tau$ | $5\tau$ |
|---|---|---|---|---|---|
| $u/E$ | 0,632 | 0,865 | 0,950 | 0,982 | 0,993 |

> [!retenir] Plus $\tau$ est petit, plus la charge est rapide. À $5\tau$, $u \approx 0{,}99\,E$ : le régime permanent est atteint.

## Idée 3 · La décharge : $v(t) = E\,e^{-t/\tau}$

Idée : le condensateur chargé sous $E$ est débranché du générateur (on ouvre $K$) et se décharge dans $R$.

```etapes Établir et résoudre la décharge
Avant $t = 0$ :: Régime permanent : le condensateur est un interrupteur ouvert, $v = E$.
Équation :: Aux bornes de $R$ : $v = R\,i$ ; le courant sort par la borne +, donc $i = -C\,\dfrac{dv}{dt}$. D'où $\tau\,\dfrac{dv}{dt} + v = 0$.
Solution :: $v(t) = A\,e^{-t/\tau}$ avec $v(0) = E$, donc $A = E$.
Résultat :: $v(t) = E\,e^{-t/\tau}$ et $i(t) = \dfrac{E}{R}\,e^{-t/\tau}$.
```

```html
<svg viewBox="0 0 560 220" role="img" aria-label="Décharge d'un condensateur : v(t) décroît de E vers 0, tangente à l'origine coupant l'axe des temps en t = tau" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V186"/><path d="M44 186.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M143.4 183.0v6" stroke="currentColor" stroke-width="1"/><text x="143.4" y="202" text-anchor="middle">1τ</text><path d="M238.8 183.0v6" stroke="currentColor" stroke-width="1"/><text x="238.8" y="202" text-anchor="middle">2τ</text><path d="M334.2 183.0v6" stroke="currentColor" stroke-width="1"/><text x="334.2" y="202" text-anchor="middle">3τ</text><path d="M429.5 183.0v6" stroke="currentColor" stroke-width="1"/><text x="429.5" y="202" text-anchor="middle">4τ</text><path d="M524.9 183.0v6" stroke="currentColor" stroke-width="1"/><text x="524.9" y="202" text-anchor="middle">5τ</text><path d="M45 186.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="190.0" text-anchor="end">0</text><path d="M45 131.6h6" stroke="currentColor" stroke-width="1"/><text x="41" y="135.6" text-anchor="end">0,37 E</text><path d="M45 38.2h6" stroke="currentColor" stroke-width="1"/><text x="41" y="42.2" text-anchor="end">E</text><text x="544" y="214" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">v</text></g><path d="M48.0 38.2L143.4 186.0" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 3" fill="none"/><path d="M48.0 38.2 L50.1 41.3 L52.1 44.4 L54.2 47.5 L56.3 50.4 L58.3 53.4 L60.4 56.2 L62.5 59.0 L64.5 61.7 L66.6 64.4 L68.7 67.0 L70.7 69.5 L72.8 72.0 L74.9 74.5 L76.9 76.9 L79.0 79.2 L81.1 81.5 L83.1 83.7 L85.2 85.9 L87.3 88.1 L89.3 90.2 L91.4 92.2 L93.5 94.2 L95.5 96.2 L97.6 98.1 L99.7 100.0 L101.7 101.8 L103.8 103.6 L105.9 105.4 L107.9 107.1 L110.0 108.8 L112.1 110.5 L114.1 112.1 L116.2 113.7 L118.3 115.2 L120.3 116.8 L122.4 118.2 L124.5 119.7 L126.5 121.1 L128.6 122.5 L130.7 123.9 L132.7 125.2 L134.8 126.5 L136.9 127.8 L138.9 129.0 L141.0 130.2 L143.1 131.4 L145.1 132.6 L147.2 133.8 L149.3 134.9 L151.3 136.0 L153.4 137.0 L155.5 138.1 L157.5 139.1 L159.6 140.1 L161.7 141.1 L163.7 142.1 L165.8 143.0 L167.9 143.9 L169.9 144.8 L172.0 145.7 L174.1 146.6 L176.1 147.4 L178.2 148.2 L180.3 149.1 L182.3 149.8 L184.4 150.6 L186.5 151.4 L188.5 152.1 L190.6 152.9 L192.7 153.6 L194.7 154.3 L196.8 154.9 L198.9 155.6 L200.9 156.3 L203.0 156.9 L205.1 157.5 L207.1 158.1 L209.2 158.7 L211.3 159.3 L213.3 159.9 L215.4 160.4 L217.5 161.0 L219.5 161.5 L221.6 162.0 L223.7 162.6 L225.7 163.1 L227.8 163.6 L229.9 164.0 L231.9 164.5 L234.0 165.0 L236.1 165.4 L238.1 165.9 L240.2 166.3 L242.3 166.7 L244.3 167.1 L246.4 167.5 L248.5 167.9 L250.5 168.3 L252.6 168.7 L254.7 169.1 L256.7 169.4 L258.8 169.8 L260.9 170.1 L262.9 170.5 L265.0 170.8 L267.1 171.1 L269.1 171.4 L271.2 171.8 L273.3 172.1 L275.3 172.4 L277.4 172.7 L279.5 172.9 L281.5 173.2 L283.6 173.5 L285.7 173.8 L287.7 174.0 L289.8 174.3 L291.9 174.5 L293.9 174.8 L296.0 175.0 L298.1 175.3 L300.1 175.5 L302.2 175.7 L304.3 175.9 L306.3 176.1 L308.4 176.4 L310.5 176.6 L312.5 176.8 L314.6 177.0 L316.7 177.2 L318.7 177.3 L320.8 177.5 L322.9 177.7 L324.9 177.9 L327.0 178.1 L329.1 178.2 L331.1 178.4 L333.2 178.6 L335.3 178.7 L337.3 178.9 L339.4 179.0 L341.5 179.2 L343.5 179.3 L345.6 179.5 L347.7 179.6 L349.7 179.7 L351.8 179.9 L353.9 180.0 L355.9 180.1 L358.0 180.3 L360.1 180.4 L362.1 180.5 L364.2 180.6 L366.3 180.7 L368.3 180.9 L370.4 181.0 L372.5 181.1 L374.5 181.2 L376.6 181.3 L378.7 181.4 L380.7 181.5 L382.8 181.6 L384.9 181.7 L386.9 181.8 L389.0 181.9 L391.1 181.9 L393.1 182.0 L395.2 182.1 L397.3 182.2 L399.3 182.3 L401.4 182.4 L403.5 182.4 L405.5 182.5 L407.6 182.6 L409.7 182.7 L411.7 182.7 L413.8 182.8 L415.9 182.9 L417.9 182.9 L420.0 183.0 L422.1 183.1 L424.1 183.1 L426.2 183.2 L428.3 183.3 L430.3 183.3 L432.4 183.4 L434.5 183.4 L436.5 183.5 L438.6 183.5 L440.7 183.6 L442.7 183.6 L444.8 183.7 L446.9 183.7 L448.9 183.8 L451.0 183.8 L453.1 183.9 L455.1 183.9 L457.2 184.0 L459.3 184.0 L461.3 184.1 L463.4 184.1 L465.5 184.1 L467.5 184.2 L469.6 184.2 L471.7 184.3 L473.7 184.3 L475.8 184.3 L477.9 184.4 L479.9 184.4 L482.0 184.4 L484.1 184.5 L486.1 184.5 L488.2 184.5 L490.3 184.6 L492.3 184.6 L494.4 184.6 L496.5 184.7 L498.5 184.7 L500.6 184.7 L502.7 184.7 L504.7 184.8 L506.8 184.8 L508.9 184.8 L510.9 184.8 L513.0 184.9 L515.1 184.9 L517.1 184.9 L519.2 184.9 L521.3 185.0 L523.3 185.0 L525.4 185.0 L527.5 185.0 L529.5 185.1 L531.6 185.1 L533.7 185.1 L535.7 185.1 L537.8 185.1 L539.9 185.1 L541.9 185.2 L544.0 185.2" stroke="#D9824F" stroke-width="2.6" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"><circle cx="143.4" cy="131.6" r="3.6" fill="#D9824F"/><text x="151.4" y="123.6" fill="#D9824F">v(τ) ≈ 0,37 E</text></g></svg>
```


À $t = \tau$ : $v = 0{,}37\,E$ (le condensateur a perdu 63 % de sa tension). À $t = 5\tau$ : $v < 1\,\%$ de $E$, la décharge est pratiquement terminée.

> [!attention] **Précision ajoutée.** Dans la décharge, $i(t)$ s'écrit $\dfrac{E}{R}e^{-t/\tau}$ avec le sens du courant pris dans $R$ (le cours l'écrit sans signe). Si tu orientes $i$ dans le sens de la charge, on a $i = C\,\dfrac{dv}{dt} = -\dfrac{E}{R}e^{-t/\tau}$.

## Idée 4 · Bilan d'énergie : 50 % perdus

Idée : on multiplie la loi des mailles par $i\,dt = dq$ : $E\,i\,dt = R\,i^2\,dt + d\!\left(\dfrac{q^2}{2C}\right)$, c'est-à-dire énergie fournie = énergie dissipée dans $R$ + énergie stockée dans $C$.

| Énergie | Valeur |
|---|---|
| Fournie par le générateur | $W_{fournie} = E\,Q = C E^2$ |
| Stockée dans le condensateur | $W_{stockee} = \dfrac{Q^2}{2C} = \tfrac12 C E^2$ |
| Dissipée dans $R$ (effet Joule) | $W_J = \tfrac12 C E^2$ |

> [!retenir] À la charge, la moitié de l'énergie fournie est stockée et l'autre moitié dissipée par effet Joule, **quelle que soit la valeur de $R$**. À la décharge, toute l'énergie stockée $\tfrac12 C E^2$ est dissipée dans $R$.

## S'exercer

```exercice Exercice 3.1 du cours · Charge d'un condensateur
? Un condensateur de $100\ \mu\text{F}$, initialement déchargé, est chargé sous $E = 12\ \text{V}$ à travers $R = 10\ \text{k}\Omega$. Calculer la constante de temps $\tau$, en secondes.
indice: $\tau = RC$ avec $R = 10^4\ \Omega$ et $C = 10^{-4}\ \text{F}$.
reponse: 1
= $\tau = RC = 10^4 \times 10^{-4} = 1\ \text{s}$.
? Calculer le courant initial $i(0^+)$, en mA.
indice: Le condensateur déchargé se comporte comme un fil à $t = 0^+$.
reponse: 1.2
= $i(0^+) = \dfrac{E}{R} = \dfrac{12}{10^4} = 1{,}2\ \text{mA}$.
? Au bout de combien de temps la tension atteint-elle $9\ \text{V}$ ? (en secondes, deux décimales)
indice: Résous $9 = 12\,(1 - e^{-t/\tau})$.
reponse: 1.39 ~0.01
= $9 = 12\,(1 - e^{-t/\tau})$ donne $e^{-t/\tau} = \tfrac14$, donc $t = \tau\,\ln 4 \approx 1{,}39\ \text{s}$.
? Calculer l'énergie stockée en fin de charge et l'énergie dissipée dans $R$, en mJ.
indice: Utilise $W_C = \tfrac12 C E^2$, puis le bilan à 50 %.
= $W_C = \tfrac12 \times 10^{-4} \times 144 = 7{,}2\ \text{mJ}$. L'énergie dissipée dans $R$ est la même : $7{,}2\ \text{mJ}$ (le générateur a fourni $14{,}4\ \text{mJ}$).
```

```exercice Décharge et lecture de courbe
? Avec $R = 10\ \text{k}\Omega$ et $C = 100\ \mu\text{F}$, combien de temps faut-il pour que la décharge soit pratiquement terminée ?
indice: Calcule $\tau$ puis prends $5\tau$.
= $\tau = RC = 1\ \text{s}$ ; la décharge est pratiquement terminée au bout de $5\tau = 5\ \text{s}$ (exemple du cours).
? On mesure sur une charge sous $E = 10\ \text{V}$ que $u = 6{,}32\ \text{V}$ à $t = 10\ \text{ms}$. Que vaut $\tau$ ?
indice: Quel pourcentage de $E$ est atteint à $t = \tau$ ?
reponse: 10
= $6{,}32 / 10 = 0{,}632$ : c'est la valeur de $u/E$ en $t = \tau$. Donc $\tau = 10\ \text{ms}$ (exemple : $R = 2\ \text{k}\Omega$, $C = 5\ \mu\text{F}$).
```

## Flashcards

```cartes
Équation du circuit RC (charge) ? :: $\tau\,\dfrac{du}{dt} + u = E$ avec $\tau = RC$ : équation différentielle linéaire du premier ordre.
Charge d'un condensateur : $u(t)$ et $i(t)$ ? :: $u = E\,(1 - e^{-t/\tau})$ et $i = \dfrac{E}{R}\,e^{-t/\tau}$.
Décharge d'un condensateur : $v(t)$ ? :: $v = E\,e^{-t/\tau}$ avec $\tau = RC$.
Comment lire $\tau$ sur la courbe de charge ? :: La tangente à l'origine coupe l'asymptote $u = E$ en $t = \tau$ ; ou $u(\tau) \approx 0{,}63\,E$.
Valeurs de $u/E$ à $\tau, 2\tau, 3\tau, 4\tau, 5\tau$ ? :: 0,632 ; 0,865 ; 0,950 ; 0,982 ; 0,993.
Que vaut $i(0^+)$ à la charge, et pourquoi ? :: $E/R$ : $u_C$ est continue et vaut 0, donc toute la tension est aux bornes de $R$.
Bilan énergétique de la charge ? :: Fournie $C E^2$ ; stockée $\tfrac12 C E^2$ ; dissipée $\tfrac12 C E^2$ : 50 % de perte, quelle que soit $R$.
Combien de temps pour charger à 99 % ? :: Environ $5\tau$.
Homogénéité de $RC$ ? :: $\Omega \cdot \text{F} = \text{s}$ : $RC$ est bien un temps.
```

## QCM du chapitre

```qcm
? La constante de temps d'un circuit RC est…
- $R/C$
+ $RC$
- $1/(RC)$
- $C/R$
= $\tau = RC$ (en secondes : $\Omega \cdot \text{F} = \text{s}$).

? À la charge, la tension du condensateur vaut…
- $E\,e^{-t/\tau}$
+ $E\,(1 - e^{-t/\tau})$
- $E\,(1 + e^{-t/\tau})$
- $E\,t/\tau$
= Elle part de 0 (continuité) et tend vers $E$.

? À $t = \tau$ pendant la charge, $u$ vaut environ…
- $0{,}37\,E$
+ $0{,}63\,E$
- $0{,}99\,E$
- $E/2$
= $1 - e^{-1} \approx 0{,}632$.

? À $t = 5\tau$, la charge est pratiquement terminée : $u$ vaut environ…
- $0{,}63\,E$
- $0{,}86\,E$
+ $0{,}99\,E$
- $1{,}5\,E$
= $1 - e^{-5} \approx 0{,}993$.

? À la charge, à $t = 0^+$, le courant vaut…
- $0$
+ $E/R$
- $E\,C$
- $E/(RC)$
= $u(0^+) = 0$, donc $i(0^+) = E/R$.

? Pendant la décharge, à $t = \tau$ la tension a diminué de…
- 37 %
+ 63 %
- 99 %
- 50 %
= $v(\tau) = 0{,}37\,E$ : elle a perdu 63 %.

? Quelle est la constante de temps pour $R = 10\ \text{k}\Omega$ et $C = 100\ \mu\text{F}$ ?
- $0{,}1\ \text{s}$
+ $1\ \text{s}$
- $10\ \text{s}$
- $1\ \text{ms}$
= $10^4 \times 10^{-4} = 1\ \text{s}$.

? Lors de la charge, quelle part de l'énergie fournie est dissipée dans $R$ ?
- 0 %
+ 50 %
- 100 %
- elle dépend de $R$
= Moitié stockée, moitié dissipée, quelle que soit $R$.

? Comment lit-on $\tau$ graphiquement sur la courbe de charge ?
- c'est la valeur de $u$ en $t = 0$
+ la tangente à l'origine coupe l'asymptote $u = E$ en $t = \tau$
- c'est l'instant où $u = E$
- c'est le maximum de $i$
= La tangente à l'origine de $E(1 - e^{-t/\tau})$ a pour pente $E/\tau$ : elle atteint $E$ en $t = \tau$.

? En régime permanent continu, le condensateur est…
- un fil
+ un interrupteur ouvert
- une source de tension
- un conducteur ohmique
= $i = C\,du/dt = 0$.
```

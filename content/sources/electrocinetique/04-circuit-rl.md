---
id: circuit-rl
titre: Le circuit RL : établissement et rupture du courant
seance: Chapitre 3 · section 3.6
importance: 5
---

## Avant de commencer

Une bobine idéale a pour relation $u = L\,\dfrac{di}{dt}$, et son courant $i_L$ est continu. C'est le même jeu que le circuit RC, avec les rôles de la tension et du courant échangés.

```exercice Vérifie ton prérequis
? Dans une bobine, quelle grandeur est continue : la tension $u_L$ ou le courant $i_L$ ?
= Le **courant** $i_L$ (l'énergie $\tfrac12 L i_L^2$ ne saute pas). La tension $u_L$ peut sauter.
```

## Comment aborder ce chapitre

> [!astuce] **Le circuit RL est le jumeau du circuit RC.** Même équation du premier ordre, même méthode (homogène + particulière + condition initiale), même $5\tau$. Seuls changent : $\tau = L/R$, et c'est le **courant** qui monte progressivement, pas la tension.

> [!piege] Croire que la bobine est un fil dès l'instant $t = 0^+$. Elle ne l'est qu'en régime permanent. À $t = 0^+$, elle s'oppose au courant : elle se comporte comme un interrupteur ouvert ($i = 0$, $u = E$).

À la fin, tu sais donner $i(t)$ et $u(t)$ à l'établissement et à la rupture, expliquer la surtension à l'ouverture et faire le bilan d'énergie.

## Idée 1 · L'équation du circuit RL

Idée : une résistance en série avec une bobine idéale, sous un échelon $e(t)$.

```etapes Établir l'équation du circuit RL
Loi des mailles :: $e(t) = R\,i + u$ avec $u = L\,\dfrac{di}{dt}$.
Mets en forme :: $e(t) = R\,i + L\,\dfrac{di}{dt}$, puis divise par $R$ : $\dfrac{L}{R}\,\dfrac{di}{dt} + i = \dfrac{e}{R}$.
Pose $\tau = L/R$ :: $\tau\,\dfrac{di}{dt} + i = \dfrac{e}{R}$. Circuit du premier ordre, comme RC.
```

> [!retenir] Circuit RL : $\tau = \dfrac{L}{R}$. Homogénéité : $\text{H}/\Omega = \text{s}$.

## Idée 2 · L'établissement du courant

Idée : à $t = 0$ la tension passe de $0$ à $E$. Régime libre $B\,e^{-t/\tau}$, régime permanent $i = E/R$ (car $di/dt = 0$).

```etapes Résoudre l'établissement du courant
Solution générale :: $i(t) = B\,e^{-t/\tau} + \dfrac{E}{R}$.
Condition initiale :: $i(0) = 0$ (continuité du courant dans la bobine), donc $B = -\dfrac{E}{R}$.
Courant :: $i(t) = \dfrac{E}{R}\,\left(1 - e^{-t/\tau}\right)$.
Tension aux bornes de $L$ :: $u(t) = L\,\dfrac{di}{dt} = E\,e^{-t/\tau}$.
```

```html
<svg viewBox="0 0 560 230" role="img" aria-label="Établissement du courant dans un circuit RL : i(t) monte vers E/R, uL(t) descend de E vers 0" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V196"/><path d="M44 196.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M143.4 193.0v6" stroke="currentColor" stroke-width="1"/><text x="143.4" y="212" text-anchor="middle">1τ</text><path d="M238.8 193.0v6" stroke="currentColor" stroke-width="1"/><text x="238.8" y="212" text-anchor="middle">2τ</text><path d="M334.2 193.0v6" stroke="currentColor" stroke-width="1"/><text x="334.2" y="212" text-anchor="middle">3τ</text><path d="M429.5 193.0v6" stroke="currentColor" stroke-width="1"/><text x="429.5" y="212" text-anchor="middle">4τ</text><path d="M524.9 193.0v6" stroke="currentColor" stroke-width="1"/><text x="524.9" y="212" text-anchor="middle">5τ</text><path d="M45 196.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="200.0" text-anchor="end">0</text><path d="M45 97.1h6" stroke="currentColor" stroke-width="1"/><text x="41" y="101.1" text-anchor="end">0,63</text><path d="M45 39.5h6" stroke="currentColor" stroke-width="1"/><text x="41" y="43.5" text-anchor="end">1</text><text x="544" y="224" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">orange : i/(E/R) · bleu : u/E</text></g><path d="M48 39.5H544" stroke="currentColor" stroke-width="0.8" stroke-dasharray="4 4" opacity=".55"/><path d="M48.0 196.0 L50.1 192.6 L52.1 189.4 L54.2 186.1 L56.3 183.0 L58.3 179.9 L60.4 176.9 L62.5 174.0 L64.5 171.1 L66.6 168.3 L68.7 165.5 L70.7 162.8 L72.8 160.2 L74.9 157.6 L76.9 155.0 L79.0 152.6 L81.1 150.1 L83.1 147.8 L85.2 145.5 L87.3 143.2 L89.3 141.0 L91.4 138.8 L93.5 136.7 L95.5 134.6 L97.6 132.5 L99.7 130.5 L101.7 128.6 L103.8 126.7 L105.9 124.8 L107.9 123.0 L110.0 121.2 L112.1 119.4 L114.1 117.7 L116.2 116.0 L118.3 114.4 L120.3 112.8 L122.4 111.2 L124.5 109.7 L126.5 108.2 L128.6 106.7 L130.7 105.3 L132.7 103.9 L134.8 102.5 L136.9 101.1 L138.9 99.8 L141.0 98.5 L143.1 97.3 L145.1 96.0 L147.2 94.8 L149.3 93.6 L151.3 92.5 L153.4 91.3 L155.5 90.2 L157.5 89.1 L159.6 88.1 L161.7 87.0 L163.7 86.0 L165.8 85.0 L167.9 84.0 L169.9 83.1 L172.0 82.1 L174.1 81.2 L176.1 80.3 L178.2 79.5 L180.3 78.6 L182.3 77.8 L184.4 76.9 L186.5 76.1 L188.5 75.3 L190.6 74.6 L192.7 73.8 L194.7 73.1 L196.8 72.4 L198.9 71.7 L200.9 71.0 L203.0 70.3 L205.1 69.6 L207.1 69.0 L209.2 68.4 L211.3 67.7 L213.3 67.1 L215.4 66.5 L217.5 66.0 L219.5 65.4 L221.6 64.8 L223.7 64.3 L225.7 63.8 L227.8 63.2 L229.9 62.7 L231.9 62.2 L234.0 61.7 L236.1 61.3 L238.1 60.8 L240.2 60.3 L242.3 59.9 L244.3 59.5 L246.4 59.0 L248.5 58.6 L250.5 58.2 L252.6 57.8 L254.7 57.4 L256.7 57.0 L258.8 56.6 L260.9 56.3 L262.9 55.9 L265.0 55.6 L267.1 55.2 L269.1 54.9 L271.2 54.6 L273.3 54.2 L275.3 53.9 L277.4 53.6 L279.5 53.3 L281.5 53.0 L283.6 52.7 L285.7 52.4 L287.7 52.2 L289.8 51.9 L291.9 51.6 L293.9 51.4 L296.0 51.1 L298.1 50.9 L300.1 50.6 L302.2 50.4 L304.3 50.1 L306.3 49.9 L308.4 49.7 L310.5 49.5 L312.5 49.3 L314.6 49.0 L316.7 48.8 L318.7 48.6 L320.8 48.4 L322.9 48.2 L324.9 48.1 L327.0 47.9 L329.1 47.7 L331.1 47.5 L333.2 47.3 L335.3 47.2 L337.3 47.0 L339.4 46.9 L341.5 46.7 L343.5 46.5 L345.6 46.4 L347.7 46.2 L349.7 46.1 L351.8 46.0 L353.9 45.8 L355.9 45.7 L358.0 45.5 L360.1 45.4 L362.1 45.3 L364.2 45.2 L366.3 45.0 L368.3 44.9 L370.4 44.8 L372.5 44.7 L374.5 44.6 L376.6 44.5 L378.7 44.4 L380.7 44.3 L382.8 44.2 L384.9 44.1 L386.9 44.0 L389.0 43.9 L391.1 43.8 L393.1 43.7 L395.2 43.6 L397.3 43.5 L399.3 43.4 L401.4 43.3 L403.5 43.2 L405.5 43.2 L407.6 43.1 L409.7 43.0 L411.7 42.9 L413.8 42.9 L415.9 42.8 L417.9 42.7 L420.0 42.6 L422.1 42.6 L424.1 42.5 L426.2 42.4 L428.3 42.4 L430.3 42.3 L432.4 42.3 L434.5 42.2 L436.5 42.1 L438.6 42.1 L440.7 42.0 L442.7 42.0 L444.8 41.9 L446.9 41.9 L448.9 41.8 L451.0 41.8 L453.1 41.7 L455.1 41.7 L457.2 41.6 L459.3 41.6 L461.3 41.5 L463.4 41.5 L465.5 41.4 L467.5 41.4 L469.6 41.4 L471.7 41.3 L473.7 41.3 L475.8 41.2 L477.9 41.2 L479.9 41.2 L482.0 41.1 L484.1 41.1 L486.1 41.1 L488.2 41.0 L490.3 41.0 L492.3 41.0 L494.4 40.9 L496.5 40.9 L498.5 40.9 L500.6 40.8 L502.7 40.8 L504.7 40.8 L506.8 40.8 L508.9 40.7 L510.9 40.7 L513.0 40.7 L515.1 40.6 L517.1 40.6 L519.2 40.6 L521.3 40.6 L523.3 40.6 L525.4 40.5 L527.5 40.5 L529.5 40.5 L531.6 40.5 L533.7 40.4 L535.7 40.4 L537.8 40.4 L539.9 40.4 L541.9 40.4 L544.0 40.3" stroke="#D9824F" stroke-width="2.6" fill="none"/><path d="M48.0 39.5 L50.1 42.8 L52.1 46.1 L54.2 49.3 L56.3 52.5 L58.3 55.5 L60.4 58.6 L62.5 61.5 L64.5 64.4 L66.6 67.2 L68.7 70.0 L70.7 72.7 L72.8 75.3 L74.9 77.9 L76.9 80.4 L79.0 82.9 L81.1 85.3 L83.1 87.7 L85.2 90.0 L87.3 92.3 L89.3 94.5 L91.4 96.7 L93.5 98.8 L95.5 100.9 L97.6 102.9 L99.7 104.9 L101.7 106.9 L103.8 108.8 L105.9 110.7 L107.9 112.5 L110.0 114.3 L112.1 116.0 L114.1 117.8 L116.2 119.4 L118.3 121.1 L120.3 122.7 L122.4 124.2 L124.5 125.8 L126.5 127.3 L128.6 128.8 L130.7 130.2 L132.7 131.6 L134.8 133.0 L136.9 134.3 L138.9 135.7 L141.0 137.0 L143.1 138.2 L145.1 139.5 L147.2 140.7 L149.3 141.9 L151.3 143.0 L153.4 144.2 L155.5 145.3 L157.5 146.4 L159.6 147.4 L161.7 148.5 L163.7 149.5 L165.8 150.5 L167.9 151.5 L169.9 152.4 L172.0 153.3 L174.1 154.3 L176.1 155.2 L178.2 156.0 L180.3 156.9 L182.3 157.7 L184.4 158.5 L186.5 159.3 L188.5 160.1 L190.6 160.9 L192.7 161.7 L194.7 162.4 L196.8 163.1 L198.9 163.8 L200.9 164.5 L203.0 165.2 L205.1 165.8 L207.1 166.5 L209.2 167.1 L211.3 167.7 L213.3 168.3 L215.4 168.9 L217.5 169.5 L219.5 170.1 L221.6 170.6 L223.7 171.2 L225.7 171.7 L227.8 172.2 L229.9 172.7 L231.9 173.2 L234.0 173.7 L236.1 174.2 L238.1 174.7 L240.2 175.1 L242.3 175.6 L244.3 176.0 L246.4 176.4 L248.5 176.9 L250.5 177.3 L252.6 177.7 L254.7 178.1 L256.7 178.5 L258.8 178.8 L260.9 179.2 L262.9 179.6 L265.0 179.9 L267.1 180.3 L269.1 180.6 L271.2 180.9 L273.3 181.2 L275.3 181.6 L277.4 181.9 L279.5 182.2 L281.5 182.5 L283.6 182.8 L285.7 183.0 L287.7 183.3 L289.8 183.6 L291.9 183.9 L293.9 184.1 L296.0 184.4 L298.1 184.6 L300.1 184.9 L302.2 185.1 L304.3 185.3 L306.3 185.6 L308.4 185.8 L310.5 186.0 L312.5 186.2 L314.6 186.4 L316.7 186.6 L318.7 186.8 L320.8 187.0 L322.9 187.2 L324.9 187.4 L327.0 187.6 L329.1 187.8 L331.1 188.0 L333.2 188.1 L335.3 188.3 L337.3 188.5 L339.4 188.6 L341.5 188.8 L343.5 188.9 L345.6 189.1 L347.7 189.2 L349.7 189.4 L351.8 189.5 L353.9 189.7 L355.9 189.8 L358.0 189.9 L360.1 190.1 L362.1 190.2 L364.2 190.3 L366.3 190.4 L368.3 190.6 L370.4 190.7 L372.5 190.8 L374.5 190.9 L376.6 191.0 L378.7 191.1 L380.7 191.2 L382.8 191.3 L384.9 191.4 L386.9 191.5 L389.0 191.6 L391.1 191.7 L393.1 191.8 L395.2 191.9 L397.3 192.0 L399.3 192.1 L401.4 192.1 L403.5 192.2 L405.5 192.3 L407.6 192.4 L409.7 192.5 L411.7 192.5 L413.8 192.6 L415.9 192.7 L417.9 192.8 L420.0 192.8 L422.1 192.9 L424.1 193.0 L426.2 193.0 L428.3 193.1 L430.3 193.2 L432.4 193.2 L434.5 193.3 L436.5 193.3 L438.6 193.4 L440.7 193.4 L442.7 193.5 L444.8 193.6 L446.9 193.6 L448.9 193.7 L451.0 193.7 L453.1 193.8 L455.1 193.8 L457.2 193.9 L459.3 193.9 L461.3 193.9 L463.4 194.0 L465.5 194.0 L467.5 194.1 L469.6 194.1 L471.7 194.2 L473.7 194.2 L475.8 194.2 L477.9 194.3 L479.9 194.3 L482.0 194.3 L484.1 194.4 L486.1 194.4 L488.2 194.5 L490.3 194.5 L492.3 194.5 L494.4 194.5 L496.5 194.6 L498.5 194.6 L500.6 194.6 L502.7 194.7 L504.7 194.7 L506.8 194.7 L508.9 194.8 L510.9 194.8 L513.0 194.8 L515.1 194.8 L517.1 194.9 L519.2 194.9 L521.3 194.9 L523.3 194.9 L525.4 195.0 L527.5 195.0 L529.5 195.0 L531.6 195.0 L533.7 195.0 L535.7 195.1 L537.8 195.1 L539.9 195.1 L541.9 195.1 L544.0 195.1" stroke="#6C8FB8" stroke-width="2.0" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"><circle cx="143.4" cy="97.1" r="3.6" fill="#D9824F"/><text x="151.4" y="113.1" fill="#D9824F">i(τ) ≈ 0,63 E/R</text><text x="542" y="35.5" text-anchor="end" opacity=".85">i → E/R</text></g></svg>
```


- À $t = 0^+$ : $u = E$ et $i = 0$. La bobine s'oppose à la variation du courant : **interrupteur ouvert**.
- À $t = \tau$ : $i = 0{,}63\,E/R$. À $5\tau$ : régime permanent ($u = 0$, $i = E/R$), la bobine est un **fil**.
- $u$ est **discontinue** en $t = 0$ (saut de $0$ à $E$), alors que $i$ reste continu.

## Idée 3 · La rupture du courant

Idée : à $t = 0$ on remplace le générateur par un fil ($e = 0$) : le circuit reste fermé et la bobine débite dans $R$.

```etapes Résoudre la rupture du courant
Équation :: $\tau\,\dfrac{di}{dt} + i = 0$, de même forme que la décharge du condensateur.
Condition initiale :: $i(0) = \dfrac{E}{R}$ (continuité).
Résultat :: $i(t) = \dfrac{E}{R}\,e^{-t/\tau}$ et $u(t) = L\,\dfrac{di}{dt} = -E\,e^{-t/\tau}$.
```

```html
<svg viewBox="0 0 560 230" role="img" aria-label="Rupture du courant dans un circuit RL : i(t) décroît de E/R vers 0, uL saute à moins E puis remonte vers 0" style="max-width:100%;height:auto"><g stroke="currentColor" stroke-width="1.2" fill="none"><path d="M48 12V196"/><path d="M44 106.0H550"/></g><g font-family="sans-serif" font-size="11" fill="currentColor"><path d="M143.4 103.0v6" stroke="currentColor" stroke-width="1"/><text x="143.4" y="212" text-anchor="middle">1τ</text><path d="M238.8 103.0v6" stroke="currentColor" stroke-width="1"/><text x="238.8" y="212" text-anchor="middle">2τ</text><path d="M334.2 103.0v6" stroke="currentColor" stroke-width="1"/><text x="334.2" y="212" text-anchor="middle">3τ</text><path d="M429.5 103.0v6" stroke="currentColor" stroke-width="1"/><text x="429.5" y="212" text-anchor="middle">4τ</text><path d="M524.9 103.0v6" stroke="currentColor" stroke-width="1"/><text x="524.9" y="212" text-anchor="middle">5τ</text><path d="M45 184.3h6" stroke="currentColor" stroke-width="1"/><text x="41" y="188.3" text-anchor="end">−E</text><path d="M45 106.0h6" stroke="currentColor" stroke-width="1"/><text x="41" y="110.0" text-anchor="end">0</text><path d="M45 27.7h6" stroke="currentColor" stroke-width="1"/><text x="41" y="31.7" text-anchor="end">1</text><text x="544" y="224" text-anchor="end" font-style="italic">t</text><text x="54" y="22" font-style="italic">orange : i/(E/R) · bleu : u/E</text></g><path d="M48.0 27.7 L50.1 29.4 L52.1 31.1 L54.2 32.7 L56.3 34.2 L58.3 35.8 L60.4 37.3 L62.5 38.8 L64.5 40.2 L66.6 41.6 L68.7 43.0 L70.7 44.3 L72.8 45.7 L74.9 47.0 L76.9 48.2 L79.0 49.5 L81.1 50.7 L83.1 51.9 L85.2 53.0 L87.3 54.1 L89.3 55.3 L91.4 56.3 L93.5 57.4 L95.5 58.5 L97.6 59.5 L99.7 60.5 L101.7 61.4 L103.8 62.4 L105.9 63.3 L107.9 64.2 L110.0 65.1 L112.1 66.0 L114.1 66.9 L116.2 67.7 L118.3 68.5 L120.3 69.3 L122.4 70.1 L124.5 70.9 L126.5 71.6 L128.6 72.4 L130.7 73.1 L132.7 73.8 L134.8 74.5 L136.9 75.2 L138.9 75.8 L141.0 76.5 L143.1 77.1 L145.1 77.7 L147.2 78.3 L149.3 78.9 L151.3 79.5 L153.4 80.1 L155.5 80.6 L157.5 81.2 L159.6 81.7 L161.7 82.2 L163.7 82.7 L165.8 83.2 L167.9 83.7 L169.9 84.2 L172.0 84.7 L174.1 85.1 L176.1 85.6 L178.2 86.0 L180.3 86.4 L182.3 86.9 L184.4 87.3 L186.5 87.7 L188.5 88.1 L190.6 88.5 L192.7 88.8 L194.7 89.2 L196.8 89.6 L198.9 89.9 L200.9 90.3 L203.0 90.6 L205.1 90.9 L207.1 91.2 L209.2 91.6 L211.3 91.9 L213.3 92.2 L215.4 92.5 L217.5 92.8 L219.5 93.0 L221.6 93.3 L223.7 93.6 L225.7 93.9 L227.8 94.1 L229.9 94.4 L231.9 94.6 L234.0 94.9 L236.1 95.1 L238.1 95.3 L240.2 95.6 L242.3 95.8 L244.3 96.0 L246.4 96.2 L248.5 96.4 L250.5 96.6 L252.6 96.8 L254.7 97.0 L256.7 97.2 L258.8 97.4 L260.9 97.6 L262.9 97.8 L265.0 98.0 L267.1 98.1 L269.1 98.3 L271.2 98.5 L273.3 98.6 L275.3 98.8 L277.4 98.9 L279.5 99.1 L281.5 99.2 L283.6 99.4 L285.7 99.5 L287.7 99.7 L289.8 99.8 L291.9 99.9 L293.9 100.1 L296.0 100.2 L298.1 100.3 L300.1 100.4 L302.2 100.6 L304.3 100.7 L306.3 100.8 L308.4 100.9 L310.5 101.0 L312.5 101.1 L314.6 101.2 L316.7 101.3 L318.7 101.4 L320.8 101.5 L322.9 101.6 L324.9 101.7 L327.0 101.8 L329.1 101.9 L331.1 102.0 L333.2 102.1 L335.3 102.1 L337.3 102.2 L339.4 102.3 L341.5 102.4 L343.5 102.5 L345.6 102.5 L347.7 102.6 L349.7 102.7 L351.8 102.8 L353.9 102.8 L355.9 102.9 L358.0 103.0 L360.1 103.0 L362.1 103.1 L364.2 103.2 L366.3 103.2 L368.3 103.3 L370.4 103.3 L372.5 103.4 L374.5 103.4 L376.6 103.5 L378.7 103.6 L380.7 103.6 L382.8 103.7 L384.9 103.7 L386.9 103.8 L389.0 103.8 L391.1 103.9 L393.1 103.9 L395.2 103.9 L397.3 104.0 L399.3 104.0 L401.4 104.1 L403.5 104.1 L405.5 104.2 L407.6 104.2 L409.7 104.2 L411.7 104.3 L413.8 104.3 L415.9 104.3 L417.9 104.4 L420.0 104.4 L422.1 104.4 L424.1 104.5 L426.2 104.5 L428.3 104.5 L430.3 104.6 L432.4 104.6 L434.5 104.6 L436.5 104.7 L438.6 104.7 L440.7 104.7 L442.7 104.8 L444.8 104.8 L446.9 104.8 L448.9 104.8 L451.0 104.9 L453.1 104.9 L455.1 104.9 L457.2 104.9 L459.3 105.0 L461.3 105.0 L463.4 105.0 L465.5 105.0 L467.5 105.0 L469.6 105.1 L471.7 105.1 L473.7 105.1 L475.8 105.1 L477.9 105.1 L479.9 105.2 L482.0 105.2 L484.1 105.2 L486.1 105.2 L488.2 105.2 L490.3 105.2 L492.3 105.3 L494.4 105.3 L496.5 105.3 L498.5 105.3 L500.6 105.3 L502.7 105.3 L504.7 105.3 L506.8 105.4 L508.9 105.4 L510.9 105.4 L513.0 105.4 L515.1 105.4 L517.1 105.4 L519.2 105.4 L521.3 105.5 L523.3 105.5 L525.4 105.5 L527.5 105.5 L529.5 105.5 L531.6 105.5 L533.7 105.5 L535.7 105.5 L537.8 105.5 L539.9 105.5 L541.9 105.6 L544.0 105.6" stroke="#D9824F" stroke-width="2.6" fill="none"/><path d="M48.0 184.3 L50.1 182.6 L52.1 180.9 L54.2 179.3 L56.3 177.8 L58.3 176.2 L60.4 174.7 L62.5 173.2 L64.5 171.8 L66.6 170.4 L68.7 169.0 L70.7 167.7 L72.8 166.3 L74.9 165.0 L76.9 163.8 L79.0 162.5 L81.1 161.3 L83.1 160.1 L85.2 159.0 L87.3 157.9 L89.3 156.7 L91.4 155.7 L93.5 154.6 L95.5 153.5 L97.6 152.5 L99.7 151.5 L101.7 150.6 L103.8 149.6 L105.9 148.7 L107.9 147.8 L110.0 146.9 L112.1 146.0 L114.1 145.1 L116.2 144.3 L118.3 143.5 L120.3 142.7 L122.4 141.9 L124.5 141.1 L126.5 140.4 L128.6 139.6 L130.7 138.9 L132.7 138.2 L134.8 137.5 L136.9 136.8 L138.9 136.2 L141.0 135.5 L143.1 134.9 L145.1 134.3 L147.2 133.7 L149.3 133.1 L151.3 132.5 L153.4 131.9 L155.5 131.4 L157.5 130.8 L159.6 130.3 L161.7 129.8 L163.7 129.3 L165.8 128.8 L167.9 128.3 L169.9 127.8 L172.0 127.3 L174.1 126.9 L176.1 126.4 L178.2 126.0 L180.3 125.6 L182.3 125.1 L184.4 124.7 L186.5 124.3 L188.5 123.9 L190.6 123.5 L192.7 123.2 L194.7 122.8 L196.8 122.4 L198.9 122.1 L200.9 121.7 L203.0 121.4 L205.1 121.1 L207.1 120.8 L209.2 120.4 L211.3 120.1 L213.3 119.8 L215.4 119.5 L217.5 119.2 L219.5 119.0 L221.6 118.7 L223.7 118.4 L225.7 118.1 L227.8 117.9 L229.9 117.6 L231.9 117.4 L234.0 117.1 L236.1 116.9 L238.1 116.7 L240.2 116.4 L242.3 116.2 L244.3 116.0 L246.4 115.8 L248.5 115.6 L250.5 115.4 L252.6 115.2 L254.7 115.0 L256.7 114.8 L258.8 114.6 L260.9 114.4 L262.9 114.2 L265.0 114.0 L267.1 113.9 L269.1 113.7 L271.2 113.5 L273.3 113.4 L275.3 113.2 L277.4 113.1 L279.5 112.9 L281.5 112.8 L283.6 112.6 L285.7 112.5 L287.7 112.3 L289.8 112.2 L291.9 112.1 L293.9 111.9 L296.0 111.8 L298.1 111.7 L300.1 111.6 L302.2 111.4 L304.3 111.3 L306.3 111.2 L308.4 111.1 L310.5 111.0 L312.5 110.9 L314.6 110.8 L316.7 110.7 L318.7 110.6 L320.8 110.5 L322.9 110.4 L324.9 110.3 L327.0 110.2 L329.1 110.1 L331.1 110.0 L333.2 109.9 L335.3 109.9 L337.3 109.8 L339.4 109.7 L341.5 109.6 L343.5 109.5 L345.6 109.5 L347.7 109.4 L349.7 109.3 L351.8 109.2 L353.9 109.2 L355.9 109.1 L358.0 109.0 L360.1 109.0 L362.1 108.9 L364.2 108.8 L366.3 108.8 L368.3 108.7 L370.4 108.7 L372.5 108.6 L374.5 108.6 L376.6 108.5 L378.7 108.4 L380.7 108.4 L382.8 108.3 L384.9 108.3 L386.9 108.2 L389.0 108.2 L391.1 108.1 L393.1 108.1 L395.2 108.1 L397.3 108.0 L399.3 108.0 L401.4 107.9 L403.5 107.9 L405.5 107.8 L407.6 107.8 L409.7 107.8 L411.7 107.7 L413.8 107.7 L415.9 107.7 L417.9 107.6 L420.0 107.6 L422.1 107.6 L424.1 107.5 L426.2 107.5 L428.3 107.5 L430.3 107.4 L432.4 107.4 L434.5 107.4 L436.5 107.3 L438.6 107.3 L440.7 107.3 L442.7 107.2 L444.8 107.2 L446.9 107.2 L448.9 107.2 L451.0 107.1 L453.1 107.1 L455.1 107.1 L457.2 107.1 L459.3 107.0 L461.3 107.0 L463.4 107.0 L465.5 107.0 L467.5 107.0 L469.6 106.9 L471.7 106.9 L473.7 106.9 L475.8 106.9 L477.9 106.9 L479.9 106.8 L482.0 106.8 L484.1 106.8 L486.1 106.8 L488.2 106.8 L490.3 106.8 L492.3 106.7 L494.4 106.7 L496.5 106.7 L498.5 106.7 L500.6 106.7 L502.7 106.7 L504.7 106.7 L506.8 106.6 L508.9 106.6 L510.9 106.6 L513.0 106.6 L515.1 106.6 L517.1 106.6 L519.2 106.6 L521.3 106.5 L523.3 106.5 L525.4 106.5 L527.5 106.5 L529.5 106.5 L531.6 106.5 L533.7 106.5 L535.7 106.5 L537.8 106.5 L539.9 106.5 L541.9 106.4 L544.0 106.4" stroke="#6C8FB8" stroke-width="2.0" fill="none"/><g font-family="sans-serif" font-size="11.5" fill="currentColor"><circle cx="48.0" cy="184.3" r="3.6" fill="#D9824F"/><text x="56.0" y="178.3" fill="#D9824F">u(0+) = −E</text></g></svg>
```


La tension change de signe : la bobine se comporte comme un **générateur** qui entretient le courant dans $R$, jusqu'à restituer toute son énergie (environ $5\tau$).

> [!attention] **Surtension à l'ouverture.** Si l'on ouvrait brutalement le circuit, $i$ devrait tomber à $0$ instantanément : $u = L\,\dfrac{di}{dt}$ deviendrait énorme et provoquerait une étincelle (arc électrique) aux bornes de l'interrupteur. C'est pourquoi on place une **diode de roue libre** en parallèle sur les bobines (relais, moteurs) commandées par des interrupteurs électroniques.

## Idée 4 · Bilan d'énergie : pas de partage 50/50

Idée : on multiplie la loi des mailles par $i\,dt$ : $e\,i\,dt = R\,i^2\,dt + d\!\left(\tfrac12 L i^2\right)$.

- **Établissement** : la bobine stocke $W = \tfrac12 L \left(\dfrac{E}{R}\right)^2$. Ensuite, le générateur continue de fournir la puissance $E^2/R$, entièrement dissipée dans $R$ : il n'y a pas de partage « moitié-moitié » comme pour le condensateur.
- **Rupture** : la bobine restitue $W$, entièrement dissipée par effet Joule dans $R$ : $\displaystyle\int_0^\infty R\,i^2\,dt = \tfrac12 L \left(\dfrac{E}{R}\right)^2$.

> [!retenir] RC : $u_C$ continue, $\tau = RC$, interrupteur ouvert en régime permanent. RL : $i_L$ continu, $\tau = L/R$, fil en régime permanent.

## S'exercer

```exercice Exercice 3.2 du cours · Établissement du courant dans une bobine
? Une bobine idéale $L = 0{,}5\ \text{H}$ est placée en série avec $R = 100\ \Omega$ et alimentée sous $E = 10\ \text{V}$ à $t = 0$. Calculer la constante de temps $\tau$, en ms.
indice: $\tau = L/R$.
reponse: 5
= $\tau = \dfrac{L}{R} = \dfrac{0{,}5}{100} = 5\ \text{ms}$.
? Calculer le courant en régime permanent, en A.
indice: En régime permanent, la bobine est un fil.
reponse: 0.1
= $I = \dfrac{E}{R} = \dfrac{10}{100} = 0{,}1\ \text{A}$.
? Calculer l'énergie stockée dans la bobine en régime permanent, en mJ.
indice: $W = \tfrac12 L I^2$.
reponse: 2.5
= $W = \tfrac12 L I^2 = \tfrac12 \times 0{,}5 \times 0{,}1^2 = 2{,}5\ \text{mJ}$.
? Calculer $i$ et $u_L$ à $t = \tau$.
indice: $i(\tau) = I\,(1 - e^{-1})$ et $u_L = E\,e^{-1}$.
= $i(\tau) = 0{,}63 \times 0{,}1 \approx 63\ \text{mA}$ et $u_L(\tau) = E\,e^{-1} \approx 3{,}7\ \text{V}$.
```

```exercice Rupture du courant
? Le circuit de l'exercice précédent est mis en régime permanent, puis le générateur est remplacé par un fil à $t = 0$. Que valent $i(0^+)$ et $u_L(0^+)$ ?
indice: Le courant dans la bobine est continu. La tension dans $R$ est $R\,i$.
= $i(0^+) = i(0^-) = 0{,}1\ \text{A}$ (continuité). La bobine débite dans $R$ : $u_L(0^+) = -R\,i(0^+) = -10\ \text{V} = -E$. Elle se comporte comme un générateur.
? Pourquoi place-t-on une diode de roue libre en parallèle sur un relais commandé par un transistor ?
= À l'ouverture, le courant de la bobine ne peut pas s'annuler instantanément : sans diode, $u = L\,di/dt$ devient énorme (surtension, étincelle). La diode offre au courant un chemin pour décroître en $5\tau$.
```

## Flashcards

```cartes
Constante de temps d'un circuit RL ? :: $\tau = L/R$ (homogénéité : $\text{H}/\Omega = \text{s}$).
Établissement du courant dans RL : $i(t)$ et $u(t)$ ? :: $i = \dfrac{E}{R}\,(1 - e^{-t/\tau})$ et $u = L\,di/dt = E\,e^{-t/\tau}$.
Rupture du courant dans RL ? :: $i = \dfrac{E}{R}\,e^{-t/\tau}$ et $u = -E\,e^{-t/\tau}$ : la bobine se comporte comme un générateur.
Que valent $u$ et $i$ à $0^+$ à l'établissement ? :: $u = E$ et $i = 0$ : la bobine se comporte comme un interrupteur ouvert.
Que valent $u$ et $i$ en régime permanent (RL) ? :: $u = 0$ et $i = E/R$ : la bobine se comporte comme un fil.
Qu'est-ce qui est continu en $t = 0$ dans RL ? :: Le courant $i$. La tension $u_L$ saute de $0$ à $E$.
Pourquoi une diode de roue libre ? :: Pour éviter la surtension $L\,di/dt$ (étincelle) à l'ouverture d'un circuit inductif.
Bilan d'énergie RL à l'établissement ? :: La bobine stocke $\tfrac12 L (E/R)^2$ ; le générateur fournit ensuite $E^2/R$, dissipée dans $R$ : pas de partage 50/50.
```

## QCM du chapitre

```qcm
? La constante de temps d'un circuit RL est…
- $RL$
+ $L/R$
- $R/L$
- $1/(LR)$
= $\tau = L/R$ (en secondes : $\text{H}/\Omega = \text{s}$).

? À l'établissement du courant, $i(t)$ vaut…
- $\dfrac{E}{R}\,e^{-t/\tau}$
+ $\dfrac{E}{R}\,(1 - e^{-t/\tau})$
- $E\,(1 - e^{-t/\tau})$
- $\dfrac{E}{R}\,(1 + e^{-t/\tau})$
= Le courant part de 0 (continuité) et tend vers $E/R$.

? À $t = 0^+$, lors de l'établissement, la tension aux bornes de la bobine est…
- $0$
+ $E$
- $E/2$
- $-E$
= $i(0^+) = 0$, donc $R\,i = 0$ et toute la tension $E$ est aux bornes de $L$.

? En régime permanent, la bobine idéale d'un circuit RL est…
+ un fil ($u = 0$)
- un interrupteur ouvert
- un générateur
- une résistance infinie
= $di/dt = 0$ donc $u = 0$ et $i = E/R$.

? Dans un circuit RL, quelle grandeur subit une discontinuité à l'établissement ?
- le courant $i$
+ la tension $u_L$ aux bornes de la bobine
- l'énergie $W_L$
- aucune
= $i$ est continu, $u_L$ saute de $0$ à $E$.

? À la rupture du courant (générateur remplacé par un fil), la tension aux bornes de $L$ à $0^+$ vaut…
- $E$
- $0$
+ $-E$
- $E/2$
= La bobine débite dans $R$ avec $i = E/R$ : $u = -R\,i = -E$.

? Pour $L = 0{,}5\ \text{H}$ et $R = 100\ \Omega$, la constante de temps est…
- $50\ \text{s}$
- $0{,}5\ \text{ms}$
+ $5\ \text{ms}$
- $200\ \text{ms}$
= $0{,}5/100 = 0{,}005\ \text{s}$.

? À quoi sert une diode de roue libre ?
- à augmenter le courant
+ à éviter la surtension à l'ouverture d'un circuit inductif
- à charger la bobine
- à remplacer la résistance
= Elle donne un chemin au courant de la bobine, qui ne peut pas s'annuler instantanément.

? Dans un circuit RL, à l'établissement, qui dissipe l'énergie fournie après que la bobine a stocké $\tfrac12 L I^2$ ?
- la bobine
+ la résistance $R$ (puissance $E^2/R$)
- le générateur
- personne
= En régime permanent, tout ce que fournit le générateur est dissipé par effet Joule dans $R$.

? À $t = \tau$ lors de l'établissement, $i$ vaut environ…
- $0{,}37\,E/R$
+ $0{,}63\,E/R$
- $0{,}99\,E/R$
- $E/R$
= $1 - e^{-1} \approx 0{,}63$.
```

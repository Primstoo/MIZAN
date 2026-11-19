---
id: rolle-accroissements-finis
titre: Théorème de Rolle et accroissements finis
seance: Chapitre 4 · Fonctions dérivables
importance: 5
---

## Avant de commencer

Il faut le résultat « extremum intérieur implique $f'(c) = 0$ » et le fait qu'une fonction continue sur un segment atteint ses bornes.

```exercice Vérifie ton prérequis
? $f$ continue sur $[0, 1]$ : atteint-elle un maximum ?
= Oui : continue sur un segment, elle est bornée et atteint ses bornes. C'est le point de départ de la preuve de Rolle.
```

## Comment aborder ce chapitre

> [!astuce] **Une idée géométrique : quelque part, la tangente est parallèle à la corde.** Rolle est le cas où la corde est horizontale ; les accroissements finis, le cas général.

> [!piege] Oublier une hypothèse. Il faut **continue sur $[a, b]$** (fermé) **et dérivable sur $]a, b[$** (ouvert). $|x|$ sur $[-1, 1]$ : $f(-1) = f(1)$, mais $f'$ ne s'annule jamais, car $f$ n'est pas dérivable en 0.

À la fin, tu sais appliquer Rolle, le TAF et l'inégalité des accroissements finis pour encadrer, majorer et compter des racines.

## Idée 1 · Le théorème de Rolle

```html
<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:10px auto" role="img" aria-label="Une courbe qui part et revient à la même hauteur a un sommet où la tangente est horizontale">
<line x1="20" y1="150" x2="330" y2="150" stroke="currentColor" stroke-width="2"/>
<path d="M50 120 C90 30 150 30 190 80 S270 140 300 120" fill="none" stroke="currentColor" stroke-width="2.5"/>
<line x1="60" y1="120" x2="290" y2="120" stroke="currentColor" stroke-dasharray="5 4"/>
<line x1="70" y1="52" x2="170" y2="52" stroke="#D9824F" stroke-width="2.5"/>
<circle cx="120" cy="52" r="4.5" fill="#D9824F"/>
<g font-family="sans-serif" font-size="13" font-weight="700"><text x="30" y="115" fill="currentColor">f(a)</text><text x="296" y="112" fill="currentColor">f(b)</text><text x="100" y="42" fill="#D9824F">f'(c) = 0</text></g>
</svg>
```

Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$ et $f(a) = f(b)$, alors il existe $c \in ]a, b[$ tel que $f'(c) = 0$.

Pourquoi : $f$ atteint un max et un min sur $[a, b]$. Si les deux sont aux bornes, $f$ est constante et $f' = 0$. Sinon l'un est intérieur, et la dérivée s'y annule.

**Usage : compter des racines.** Si $f'$ ne s'annule pas sur un intervalle, $f$ y a au plus une racine (sinon Rolle entre les deux donnerait $f'(c) = 0$).

## Idée 2 · Le théorème des accroissements finis (TAF)

Si $f$ est continue sur $[a, b]$ et dérivable sur $]a, b[$, il existe $c \in ]a, b[$ tel que

$$f(b) - f(a) = f'(c)(b - a).$$

On l'obtient en appliquant Rolle à $g(x) = f(x) - \dfrac{f(b) - f(a)}{b - a}(x - a)$, qui vérifie $g(a) = g(b)$.

**Conséquences.** Sur un intervalle : $f' \ge 0$ implique $f$ croissante ; $f' = 0$ implique $f$ constante.

## Idée 3 · L'inégalité des accroissements finis (IAF)

Si de plus $|f'(x)| \le k$ sur $]a, b[$, alors $|f(b) - f(a)| \le k|b - a|$. Une dérivée bornée par $k$ rend $f$ $k$-lipschitzienne.

```etapes Encadrer une expression avec le TAF
Reconnaître f(b) - f(a) :: Exemple : $\ln(x + 1) - \ln x$ avec $f = \ln$, $a = x$, $b = x + 1$.
Appliquer le TAF :: Il existe $c \in ]a, b[$ avec $f(b) - f(a) = f'(c)(b - a)$.
Encadrer f'(c) :: Avec $a < c < b$ et la monotonie de $f'$.
Conclure :: Remplacer dans l'égalité.
```

**Exemple.** Pour $x > 0$ : $\ln(x + 1) - \ln x = \tfrac1c$ avec $x < c < x + 1$, donc $\dfrac{1}{x+1} < \ln(x+1) - \ln x < \dfrac1x$.

**Exemple (type cours).** Pour $x > 0$ : $\sqrt[3]{x + 1} - \sqrt[3]x = \dfrac{1}{3c^{2/3}}$ avec $c > x$, donc $0 < \sqrt[3]{x+1} - \sqrt[3]x < \dfrac{1}{3x^{2/3}}$.

## S'exercer

```exercice Rolle et TAF
? Montre que pour $0 < a < b$ : $\dfrac{b - a}{b} < \ln\dfrac ba < \dfrac{b - a}{a}$.
= TAF à $\ln$ sur $[a, b]$ : $\ln b - \ln a = \tfrac{b - a}{c}$ avec $a < c < b$. Comme $\tfrac1b < \tfrac1c < \tfrac1a$, on obtient l'encadrement.

? Montre que $x^3 + x + 1 = 0$ a exactement une solution réelle.
= $f(x) = x^3 + x + 1$ : $f(-1) = -1$, $f(0) = 1$, TVI : au moins une. $f'(x) = 3x^2 + 1 > 0$ : par Rolle, pas deux racines. Exactement une.

? Montre que $|\sin x - \sin y| \le |x - y|$.
= IAF avec $|\sin'| = |\cos| \le 1$.

? Montre que pour $x > 0$, $\arctan x > \dfrac{x}{1 + x^2}$.
= TAF sur $[0, x]$ : $\arctan x = \tfrac{x}{1 + c^2}$ avec $0 < c < x$. Comme $c^2 < x^2$, $\tfrac{x}{1 + c^2} > \tfrac{x}{1 + x^2}$.
```

## Flashcards

```cartes
Théorème de Rolle :: Continue sur $[a,b]$, dérivable sur $]a,b[$, $f(a) = f(b)$ : il existe $c \in ]a,b[$ avec $f'(c) = 0$.
TAF :: $f(b) - f(a) = f'(c)(b - a)$ pour un $c \in ]a,b[$.
IAF :: $|f'| \le k$ donne $|f(b) - f(a)| \le k|b - a|$.
Fonction auxiliaire du TAF :: $g(x) = f(x) - \frac{f(b) - f(a)}{b-a}(x - a)$, puis Rolle.
$f' > 0$ sur un intervalle :: $f$ strictement croissante (conséquence du TAF).
Compter les racines avec Rolle :: Si $f'$ ne s'annule pas, $f$ a au plus une racine.
Contre-exemple aux hypothèses de Rolle :: $|x|$ sur $[-1, 1]$ : pas dérivable en 0.
Encadrement de $\ln(x+1) - \ln x$ :: Entre $\frac{1}{x+1}$ et $\frac1x$.
```

## QCM du chapitre

```qcm
? Rolle demande que $f$ soit dérivable sur :
- $[a, b]$
+ $]a, b[$
- $\mathbb R$
= Les bornes peuvent être des points non dérivables.

? $|x|$ sur $[-1, 1]$ :
- vérifie Rolle avec $c = 0$
+ ne vérifie pas les hypothèses de Rolle
- a une dérivée nulle quelque part
= Non dérivable en 0.

? Le TAF donne :
+ $f(b) - f(a) = f'(c)(b - a)$
- $f'(c) = 0$
- $f(b) = f(a)$
= Pente de la corde.

? Si $|f'| \le 2$ sur $\mathbb R$, alors $|f(5) - f(1)|$ est au plus :
- 2
+ 8
- 4
= IAF : $2 \times 4$.

? $\ln(x+1) - \ln x$ pour $x > 0$ est majoré par :
+ $\frac1x$
- $\frac1{x+1}$
- $x$
= TAF avec $c > x$.

? $f' = 0$ sur un intervalle implique :
+ $f$ constante
- $f$ nulle
- rien
= Conséquence du TAF.

? $f' > 0$ sur $\mathbb R$ : combien de racines au plus pour $f$ ?
- deux
+ une
- aucune
= Rolle.

? Dans la preuve du TAF, on applique Rolle à :
- $f$
+ $f$ moins la droite qui passe par les extrémités
- $f'$
= Ainsi $g(a) = g(b)$.

? $f' \ge 0$ sur un intervalle implique :
+ $f$ croissante
- $f$ positive
- $f$ convexe
= Conséquence du TAF.

? $|\sin x - \sin y| \le$ :
+ $|x - y|$
- $|x + y|$
- $2|x - y|^2$
= IAF avec $|\cos| \le 1$.
```

---
id: momentsc
titre: Espérance et variance (cas continu)
seance: C · Variables aléatoires continues
importance: 5
---

```html
<p class="small muted">Source : 4 examens sur 11 (densité $\frac2a(1-\frac xa)$), 5 à 8 pts</p>
$$E(X)=\int_{-\infty}^{+\infty}x f(x)\,dx\qquad E(g(X))=\int g(x)f(x)\,dx\qquad V(X)=E(X^2)-E(X)^2$$
<h3>L'exercice phare : $f(x)=\frac2a\left(1-\frac xa\right)$ sur $[0,a]$</h3>
<h4>1) Fonction de répartition</h4>
<ul><li>Si $x<0$ : $F(x)=0$.</li>
<li>Si $0\le x\le a$ : $F(x)=\int_0^x\frac2a\left(1-\frac ta\right)dt=\frac2a\left[t-\frac{t^2}{2a}\right]_0^x=\frac{2x}a-\frac{x^2}{a^2}=\frac{2x}{a}\left(1-\frac{x}{2a}\right)$.</li>
<li>Si $x>a$ : $F(x)=1$ (vérification : $F(a)=2-1=1$).</li></ul>
<h4>2) Espérance et variance</h4>
$$E(X)=\int_0^a \frac2a\left(x-\frac{x^2}a\right)dx=\frac2a\left(\frac{a^2}2-\frac{a^2}3\right)=\frac a3$$
$$E(X^2)=\int_0^a\frac2a\left(x^2-\frac{x^3}a\right)dx=\frac2a\left(\frac{a^3}3-\frac{a^3}4\right)=\frac{a^2}6,\qquad V(X)=\frac{a^2}6-\frac{a^2}9=\frac{a^2}{18}.$$
<p>La question 3 (le maximum $M_n$) est traitée dans la notion « Min et max ».</p>
<div class="box trap"><b>Piège de calcul.</b> Développe d'abord $x\cdot\frac2a(1-\frac xa)=\frac2a(x-\frac{x^2}a)$, puis intègre terme à terme. Vérifie toujours que $F(a)=1$ : si ce n'est pas le cas, l'erreur est dans l'intégrale.</div>
```

## Flashcards

```cartes
{momentsc@22} $f=\frac2a(1-\frac xa)$ : $F(x)$ sur $[0,a]$ :: $\frac{2x}a-\frac{x^2}{a^2}$
{momentsc@23} $f=\frac2a(1-\frac xa)$ : $E(X)$ et $V(X)$ :: $\frac a3$ et $\frac{a^2}{18}$
```

## Réponses courtes

```exercice
? {momentsc} $f(x)=\frac2a(1-\frac xa)$ avec $a=3$. Calcule $E(X)$.
reponse: 1 ~0.001
= $a/3=1$.
? {momentsc} Même densité, $a=3$. Calcule $V(X)$.
reponse: 0.5 ~0.001
= $a^2/18=9/18$.
? {momentsc} Même densité, $a=2$. Calcule $F(1)$.
reponse: 0.75 ~0.001
= $\frac{2}{2}-\frac{1}{4}=0{,}75$.
```

## QCM du chapitre

```qcm
? {momentsc} $V(X)$ se calcule par :
+ $E(X^2)-E(X)^2$
- $E(X)^2-E(X^2)$
- $\int x^2f-\int xf$
= Formule de König.
```

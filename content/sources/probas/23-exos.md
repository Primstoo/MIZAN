---
id: exos
titre: Exercices-types d'examen (corrigés et barèmes)
seance: Travaux dirigés et pratiques
importance: 4
---

> [!astuce] Cherche d'abord seul, ouvre l'indice si tu bloques, puis compare avec le corrigé et note-toi honnêtement : ta réponse compte dans la maîtrise de la notion.

```exercice Loi Gamma (et passage au Khi-deux) · 10 à 12 pts
? {gamma} **gamma-1.** <p>Une v.a $X$ suit la loi gamma de paramètres $p>0$ et $\theta>0$ si c'est une v.a positive dont la densité est $f(x)=\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}$, $x\ge0$, avec $\Gamma(p)=\int_0^{+\infty}e^{-x}x^{p-1}dx$.</p>1) a) Montrer que $\Gamma(p)=(p-1)!$ &nbsp; b) Calculer (ou montrer) $E(X)=\frac p\theta$ et $V(X)=\frac p{\theta^2}$.
= <p><b>a)</b> Pour $p>1$, intégration par parties ($u=x^{p-1}$, $v'=e^{-x}$) : $\Gamma(p)=\left[-e^{-x}x^{p-1}\right]_0^{+\infty}+(p-1)\int_0^{+\infty}e^{-x}x^{p-2}dx=0+(p-1)\Gamma(p-1)$. Comme $\Gamma(1)=\int_0^{+\infty}e^{-x}dx=1$, par récurrence $\Gamma(p)=(p-1)!$ pour $p\in\mathbb N^*$.</p><br><p><b>b)</b> Avec $y=\theta x$ : $E(X)=\frac{\theta^p}{\Gamma(p)}\int_0^{+\infty}e^{-\theta x}x^{p}dx=\frac{1}{\theta\Gamma(p)}\int_0^{+\infty}e^{-y}y^{p}dy=\frac{\Gamma(p+1)}{\theta\Gamma(p)}=\frac p\theta$. De même $E(X^2)=\frac{\Gamma(p+2)}{\theta^2\Gamma(p)}=\frac{p(p+1)}{\theta^2}$, donc $V(X)=\frac{p(p+1)}{\theta^2}-\frac{p^2}{\theta^2}=\frac p{\theta^2}$.</p><p><b>Barème (points attendus)</b></p><ul><li>IPP écrite avec u et v'</li><li>Crochet justifié nul (en 0 et en +∞)</li><li>Γ(p)=(p−1)Γ(p−1) puis Γ(1)=1 et récurrence</li><li>Changement de variable y=θx pour E(X)</li><li>Γ(p+1)=pΓ(p) utilisé, E(X)=p/θ</li><li>E(X²)=p(p+1)/θ² puis V(X)=p/θ²</li></ul>
? {gamma} **gamma-2.** 2) Étudier (donner) la loi de la v.a $Y=\theta X$.
= <p>$G(y)=P(Y\le y)=P\left(X\le\frac y\theta\right)=F\left(\frac y\theta\right)$ car $\theta>0$. En dérivant : $g(y)=\frac1\theta f\left(\frac y\theta\right)=\frac1\theta\cdot\frac{\theta^p}{\Gamma(p)}e^{-y}\left(\frac y\theta\right)^{p-1}=\frac{1}{\Gamma(p)}e^{-y}y^{p-1}$ pour $y\ge0$, et $g(y)=0$ pour $y<0$. On reconnaît $Y\sim\gamma(p,1)$.</p><p><b>Barème (points attendus)</b></p><ul><li>G(y)=P(θX≤y)=F(y/θ) écrit</li><li>Dérivation g(y)=(1/θ)f(y/θ)</li><li>Simplification des puissances de θ</li><li>Conclusion Y ~ γ(p,1)</li></ul>
? {gamma} **gamma-3.** 3) a) Donner $E(Y)$ et $V(Y)$. &nbsp; b) Montrer comment passer de la loi $\gamma(p,1)$ à la loi $\gamma(p,\theta)$.
= <p><b>a)</b> $E(Y)=\theta E(X)=p$ et $V(Y)=\theta^2V(X)=p$ (ou formules de 1-b avec $\theta=1$).</p><br><p><b>b)</b> Si $Y\sim\gamma(p,1)$, on pose $X=\frac Y\theta$. $F_X(x)=P(Y\le\theta x)=F_Y(\theta x)$, donc $f_X(x)=\theta f_Y(\theta x)=\theta\frac{e^{-\theta x}(\theta x)^{p-1}}{\Gamma(p)}=\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}$ : $\frac Y\theta\sim\gamma(p,\theta)$.</p><p><b>Barème (points attendus)</b></p><ul><li>E(Y)=p et V(Y)=p</li><li>Pose X=Y/θ et écrit F\_X(x)=F\_Y(θx)</li><li>Densité obtenue et loi γ(p,θ) reconnue</li></ul>
? {gamma} **gamma-4.** 4) $X_1,\dots,X_n$ indépendantes de même loi exponentielle de paramètre $\theta$. Donner la loi de $\theta S_n$ où $S_n=\sum_{i=1}^nX_i$.
= <p>$\mathcal E(\theta)=\gamma(1,\theta)$. La somme de v.a Gamma <b>indépendantes</b> de même paramètre $\theta$ est Gamma (convolution) : $S_n\sim\gamma(n,\theta)$. D'après la question 2 appliquée à $S_n$, $\theta S_n\sim\gamma(n,1)$.</p><p><b>Barème (points attendus)</b></p><ul><li>Expo(θ)=γ(1,θ)</li><li>Convolution citée avec l'hypothèse d'indépendance</li><li>S\_n ~ γ(n,θ)</li><li>θS\_n ~ γ(n,1)</li></ul>
? {gamma} **gamma-5.** 5) La loi du Khi-deux à $n$ degrés de liberté est $\chi^2_n=\gamma(\frac n2,\frac12)$. Calculer $E(\chi^2_n)$ et $V(\chi^2_n)$. &nbsp; 6) Montrer comment passer de $\gamma(p,1)$ à $\chi^2_{2p}$.
= <p><b>5)</b> $E=\frac{n/2}{1/2}=n$, $V=\frac{n/2}{(1/2)^2}=2n$.</p><br><p><b>6)</b> Si $Y\sim\gamma(p,1)$, $X=2Y$ : $G(x)=P(2Y\le x)=F_Y(\frac x2)$, $g(x)=\frac12f_Y(\frac x2)=\frac{(1/2)^p}{\Gamma(p)}e^{-x/2}x^{p-1}$, densité de $\gamma(p,\frac12)=\chi^2_{2p}$.</p><p><b>Barème (points attendus)</b></p><ul><li>E(χ²\_n)=n</li><li>V(χ²\_n)=2n</li><li>X=2Y et G(x)=F\_Y(x/2)</li><li>Densité réécrite avec (1/2)^p et loi χ²\_2p reconnue</li></ul>
```

```exercice Normale : aX+b, centrer-réduire, Khi-deux · 10 à 12 pts
? {normale} **normale-1.** <p>La densité de $\mathcal N(m,\sigma)$ est $f(x)=\frac1{\sigma\sqrt{2\pi}}\exp\left[-\frac{(x-m)^2}{2\sigma^2}\right]$. Soient $X\sim\mathcal N(m,\sigma)$ et $(a,b)\in\mathbb R_+^*\times\mathbb R$.</p>1) a) Montrer que $Y=aX+b\sim\mathcal N(am+b,\,a\sigma)$.
= <p>$G(y)=P(aX+b\le y)=P\left(X\le\frac{y-b}a\right)=F\left(\frac{y-b}a\right)$ car $a>0$. Donc $g(y)=\frac1af\left(\frac{y-b}a\right)=\frac1{a\sigma\sqrt{2\pi}}\exp\left[-\frac{(\frac{y-b}a-m)^2}{2\sigma^2}\right]$. Or $\left(\frac{y-b}a-m\right)^2=\frac{(y-(am+b))^2}{a^2}$, donc $g(y)=\frac1{(a\sigma)\sqrt{2\pi}}\exp\left[-\frac{(y-(am+b))^2}{2(a\sigma)^2}\right]$ : densité de $\mathcal N(am+b,a\sigma)$.</p><p><b>Barème (points attendus)</b></p><ul><li>G(y)=P(Y≤y) puis isolement de X avec a>0</li><li>g(y)=(1/a)f((y−b)/a)</li><li>Mise au même dénominateur (y−(am+b))²/a²</li><li>Conclusion N(am+b, aσ)</li></ul>
? {normale} **normale-2.** b) En déduire que $Z=\frac{X-m}\sigma\sim\mathcal N(0,1)$. &nbsp; c) Montrer que si $Z\sim\mathcal N(0,1)$ alors $\sigma Z+m\sim\mathcal N(m,\sigma)$.
= <p><b>b)</b> $Z=aX+b$ avec $a=\frac1\sigma>0$ et $b=-\frac m\sigma$. D'après a), $Z\sim\mathcal N\left(\frac m\sigma-\frac m\sigma,\frac\sigma\sigma\right)=\mathcal N(0,1)$.</p><br><p><b>c)</b> On applique a) à $Z\sim\mathcal N(0,1)$ avec $a=\sigma>0$, $b=m$ : $\sigma Z+m\sim\mathcal N(\sigma\cdot0+m,\sigma\cdot1)=\mathcal N(m,\sigma)$.</p><p><b>Barème (points attendus)</b></p><ul><li>Identifie a=1/σ et b=−m/σ</li><li>Calcule les paramètres 0 et 1</li><li>Pour c) : a=σ, b=m appliqués à N(0,1)</li></ul>
? {normale} **normale-3.** 2) Sachant que $\gamma(p,\theta)$ a pour densité $\frac{\theta^p}{\Gamma(p)}e^{-\theta x}x^{p-1}$ ($x>0$), montrer que si $X\sim\mathcal N(m,\sigma)$ alors $\left(\frac{X-m}\sigma\right)^2\sim\chi^2_1$. (Ind. $\chi^2_1=\gamma(\frac12,\frac12)$ et $\Gamma(\frac12)=\sqrt\pi$.)
= <p>$U=\frac{X-m}\sigma\sim\mathcal N(0,1)$, densité $\varphi$, répartition $\Phi$. On pose $Y=U^2\ge0$. Pour $y\le0$, $G(y)=0$. Pour $y>0$ : $G(y)=P(-\sqrt y\le U\le\sqrt y)=\Phi(\sqrt y)-\Phi(-\sqrt y)$. En dérivant : $g(y)=\frac1{2\sqrt y}\left[\varphi(\sqrt y)+\varphi(-\sqrt y)\right]=\frac{\varphi(\sqrt y)}{\sqrt y}=\frac{e^{-y/2}}{\sqrt{2\pi}\sqrt y}$ ($\varphi$ paire). Puis $\frac1{\sqrt{2\pi}}y^{-1/2}=\frac{(1/2)^{1/2}}{\sqrt\pi}y^{\frac12-1}=\frac{(1/2)^{1/2}}{\Gamma(1/2)}y^{\frac12-1}$, donc $g(y)=\frac{(1/2)^{1/2}}{\Gamma(1/2)}e^{-y/2}y^{\frac12-1}$ : densité de $\gamma(\frac12,\frac12)=\chi^2_1$.</p><p><b>Barème (points attendus)</b></p><ul><li>U=(X−m)/σ ~ N(0,1) rappelé</li><li>Cas y≤0 traité</li><li>G(y)=Φ(√y)−Φ(−√y)</li><li>Dérivée avec le facteur 1/(2√y) et parité de φ</li><li>Réécriture avec Γ(1/2)=√π</li><li>Conclusion γ(1/2,1/2)=χ²\_1</li></ul>
? {normale} **normale-4.** 3) Soient $X_1,\dots,X_n$ indépendantes de même loi $\mathcal N(0,1)$. Donner la loi de $X_1^2+\dots+X_n^2$ (puis avec un carré de plus).
= <p>Chaque $X_i^2\sim\chi^2_1=\gamma(\frac12,\frac12)$ (question 2 avec $m=0$, $\sigma=1$), et les $X_i^2$ sont indépendantes. La somme de Gamma indépendantes de même $\theta=\frac12$ est $\gamma(\frac n2,\frac12)=\chi^2_n$. Avec $n+1$ carrés indépendants : $\chi^2_{n+1}$.</p><p><b>Barème (points attendus)</b></p><ul><li>X\_i² ~ χ²\_1 justifié</li><li>Indépendance mentionnée</li><li>Convolution ⇒ γ(n/2,1/2)=χ²\_n</li></ul>
```

```exercice Trois pièces : loi du couple (X, Y) · 4 à 8 pts
? {couple} **pieces-1.** <p>On lance successivement trois pièces de monnaie. $X$ et $Y$ désignent respectivement le nombre de faces apparues sur les deux premières pièces et le nombre de piles sur les deux dernières.</p>1) Déterminer (dans un tableau) la loi du couple $(X,Y)$, puis les lois marginales de $X$ et $Y$.
= <p>8 résultats équiprobables (1/8). FFF→(2,0), FFP→(2,1), FPF→(1,1), FPP→(1,2), PFF→(1,0), PFP→(1,1), PPF→(0,1), PPP→(0,2).</p><br><table class="t"><tr><th>X\Y</th><th>0</th><th>1</th><th>2</th><th>P(X=i)</th></tr><tr><th>0</th><td>0</td><td>1/8</td><td>1/8</td><td>1/4</td></tr><tr><th>1</th><td>1/8</td><td>2/8</td><td>1/8</td><td>1/2</td></tr><tr><th>2</th><td>1/8</td><td>1/8</td><td>0</td><td>1/4</td></tr><tr><th>P(Y=j)</th><td>1/4</td><td>1/2</td><td>1/4</td><td>1</td></tr></table><p><b>Barème (points attendus)</b></p><ul><li>Liste des 8 résultats avec (X,Y)</li><li>Tableau correct (la pièce du milieu est commune)</li><li>Marginales de X et de Y</li><li>Total = 1 vérifié</li></ul>
? {couple} **pieces-2.** 2) Les v.a $X$ et $Y$ sont-elles indépendantes ?
= <p>$P(X=0,Y=0)=0\neq P(X=0)P(Y=0)=\frac1{16}$ : $X$ et $Y$ ne sont pas indépendantes.</p><p><b>Barème (points attendus)</b></p><ul><li>Contre-exemple précis avec les deux nombres</li><li>Conclusion « non indépendantes »</li></ul>
? {couple} **pieces-3.** 3) Calculer $\text{Cov}(X,Y)$.
= <p>$E(X)=E(Y)=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14=1$. $E(XY)=1\cdot1\cdot\frac28+1\cdot2\cdot\frac18+2\cdot1\cdot\frac18=\frac34$. $\text{Cov}(X,Y)=E(XY)-E(X)E(Y)=\frac34-1=-\frac14$.</p><p><b>Barème (points attendus)</b></p><ul><li>E(X)=E(Y)=1</li><li>E(XY)=3/4 (seules les cases ij≠0 comptent)</li><li>Cov=−1/4</li></ul>
? {couple} **pieces-4.** 4) Déterminer la loi du couple $(\min\{X,Y\},\max\{X,Y\})$.
= <p>On transforme chaque case non nulle : (0,1)→(0,1) ; (0,2)→(0,2) ; (1,0)→(0,1) ; (1,1)→(1,1) ; (1,2)→(1,2) ; (2,0)→(0,2) ; (2,1)→(1,2).</p><br><table class="t"><tr><th>min\max</th><th>1</th><th>2</th></tr><tr><th>0</th><td>1/8+1/8=1/4</td><td>1/8+1/8=1/4</td></tr><tr><th>1</th><td>2/8=1/4</td><td>1/8+1/8=1/4</td></tr></table><p>Toutes les autres combinaisons ont probabilité 0 (en particulier (0,0) et (2,2)).</p><p><b>Barème (points attendus)</b></p><ul><li>Correspondance case par case</li><li>Regroupement des probabilités</li><li>Tableau final qui somme à 1</li></ul>
```

```exercice Densité 2/a(1 − x/a) : F, E, V et maximum · 5 à 8 pts
? {momentsc} **densite2a-1.** <p>Soit $X$ de densité $f(x)=\frac2a\left(1-\frac xa\right)$ si $0\le x\le a$, $0$ sinon, où $a>0$.</p>1) Déterminer la fonction de répartition de $X$.
= <p>Si $x<0$ : $F(x)=0$. Si $0\le x\le a$ : $F(x)=\int_0^x\frac2a(1-\frac ta)dt=\frac2a\left[t-\frac{t^2}{2a}\right]_0^x=\frac{2x}a-\frac{x^2}{a^2}$. Si $x>a$ : $F(x)=1$ (cohérent : $F(a)=2-1=1$).</p><p><b>Barème (points attendus)</b></p><ul><li>Les trois zones écrites</li><li>Intégrale correcte sur \[0,x\]</li><li>F(x)=2x/a − x²/a²</li><li>Vérification F(a)=1</li></ul>
? {momentsc} **densite2a-2.** 2) Calculer $E(X)$ et $V(X)$.
= <p>$E(X)=\int_0^a\frac2a(x-\frac{x^2}a)dx=\frac2a\left(\frac{a^2}2-\frac{a^2}3\right)=\frac a3$. $E(X^2)=\int_0^a\frac2a(x^2-\frac{x^3}a)dx=\frac2a\left(\frac{a^3}3-\frac{a^3}4\right)=\frac{a^2}6$. $V(X)=\frac{a^2}6-\frac{a^2}9=\frac{a^2}{18}$.</p><p><b>Barème (points attendus)</b></p><ul><li>E(X)=a/3</li><li>E(X²)=a²/6</li><li>V(X)=a²/18</li></ul>
? {momentsc} **densite2a-3.** 3) $X_1,\dots,X_n$ indépendantes de même loi que $X$. Déterminer la fonction de répartition puis la densité de $M_n=\max\{X_1,\dots,X_n\}$.
= <p>$G(x)=P(M_n\le x)=P\left(\bigcap_i\{X_i\le x\}\right)=\prod_iP(X_i\le x)=F(x)^n$ par indépendance. Donc $G(x)=0$ si $x<0$, $G(x)=\left(\frac{2x}a-\frac{x^2}{a^2}\right)^n$ si $0\le x\le a$, $G(x)=1$ si $x>a$. Densité : $g(x)=nf(x)F(x)^{n-1}=n\frac2a\left(1-\frac xa\right)\left(\frac{2x}a-\frac{x^2}{a^2}\right)^{n-1}$ sur $[0,a]$, 0 sinon.</p><p><b>Barème (points attendus)</b></p><ul><li>{M\_n≤x} = intersection des {X\_i≤x}</li><li>Indépendance ⇒ produit ⇒ F(x)^n</li><li>Les trois zones pour G</li><li>g = n f F^(n−1) explicitée</li></ul>
```

```exercice Loi (1−p)², 2p(1−p), p² et Y = −3X + 1 · 4 pts
? {vad} **discretp-1.** <p>$P(X=0)=(1-p)^2$, $P(X=1)=2p(1-p)$, $P(X=2)=p^2$, avec $0\le p\le1$.</p>1) Vérifier que $X$ suit bien une loi de probabilité.
= <p>Pour $0\le p\le1$, les trois nombres sont $\ge0$ (produits de nombres positifs). Leur somme : $(1-p)^2+2p(1-p)+p^2=\big((1-p)+p\big)^2=1$. Donc chacun est aussi $\le1$ et c'est une loi de probabilité.</p><p><b>Barème (points attendus)</b></p><ul><li>Positivité justifiée</li><li>Somme = 1 (identité remarquable)</li></ul>
? {vad} **discretp-2.** 2) On pose $Y=-3X+1$. Quelles sont l'espérance et la variance de $Y$ ?
= <p>$E(X)=2p(1-p)+2p^2=2p$ ; $E(X^2)=2p(1-p)+4p^2=2p+2p^2$ ; $V(X)=2p+2p^2-4p^2=2p(1-p)$. Donc $E(Y)=-3E(X)+1=1-6p$ et $V(Y)=9V(X)=18p(1-p)$.</p><p><b>Barème (points attendus)</b></p><ul><li>E(X)=2p</li><li>V(X)=2p(1−p) via E(X²)</li><li>E(aX+b)=aE(X)+b ⇒ 1−6p</li><li>V(aX+b)=a²V(X) ⇒ 18p(1−p)</li></ul>
```

```exercice Covariance nulle et indépendance (Bernoulli, Z et Z²) · 5 à 8 pts
? {covnulle} **bernoulli-1.** <p>I) Soient $X$, $Y$ deux v.a continues. II) $X$ et $Y$ suivent des lois de Bernoulli de paramètres $p_1$, $p_2$ avec la loi jointe : $P(0,0)=p$, $P(0,1)=1-p-p_1$, $P(1,0)=1-p-p_2$, $P(1,1)=p_1+p_2+p-1$ (où $0\le p<1$).</p>I-1) a) Donner la CNS pour que $X$ et $Y$ (continues) soient indépendantes. b) Montrer que si elles sont indépendantes, $\text{Cov}(X,Y)=0$.
= <p><b>a)</b> $X$ et $Y$ indépendantes $\iff f(x,y)=f_X(x)f_Y(y)$ pour tout $(x,y)$ (équivalent : $F(x,y)=F_X(x)F_Y(y)$).</p><p><b>b)</b> $E(XY)=\iint xyf_X(x)f_Y(y)dxdy=\int xf_X(x)dx\cdot\int yf_Y(y)dy=E(X)E(Y)$, donc $\text{Cov}(X,Y)=E(XY)-E(X)E(Y)=0$.</p><p><b>Barème (points attendus)</b></p><ul><li>CNS avec les densités</li><li>Séparation de l'intégrale double</li><li>Cov=0</li></ul>
? {covnulle} **bernoulli-2.** I-2) $Z\sim\mathcal N(0,1)$ et $T=Z^2$. a) Calculer $E(Z^3)$ puis $\text{Cov}(Z,T)$. b) Que peut-on conclure ?
= <p>$E(Z^3)=\int_{\mathbb R}\frac{x^3}{\sqrt{2\pi}}e^{-x^2/2}dx=0$ (intégrande impaire, intégrale convergente). $\text{Cov}(Z,T)=E(Z^3)-E(Z)E(Z^2)=0-0\cdot1=0$. <b>Conclusion</b> : $T=Z^2$ dépend de $Z$, pourtant la covariance est nulle. Une covariance nulle n'implique pas l'indépendance.</p><p><b>Barème (points attendus)</b></p><ul><li>E(Z³)=0 par imparité</li><li>Cov(Z,T)=0</li><li>Conclusion : la réciproque est fausse</li></ul>
? {covnulle} **bernoulli-3.** II-1) Calculer $E(XY)$ puis $\text{Cov}(X,Y)$. II-2) CNS d'indépendance. II-3) Montrer que si $\text{Cov}(X,Y)=0$ alors $X$ et $Y$ sont indépendantes.
= <p><b>1)</b> $XY\in\{0,1\}$ et $XY=1\iff X=Y=1$ : $E(XY)=p_1+p_2+p-1$. Marges : $P(X=1)=1-p-p_2+p_1+p_2+p-1=p_1$, $P(Y=1)=p_2$. $\text{Cov}=p_1+p_2+p-1-p_1p_2$.</p><br><p><b>2)</b> $P(X=i,Y=j)=P(X=i)P(Y=j)$ pour $i,j\in\{0,1\}$.</p><br><p><b>3)</b> Cov = 0 donne $P(1,1)=p_1p_2$. Alors $P(1,0)=p_1-p_1p_2=p_1(1-p_2)$, $P(0,1)=p_2-p_1p_2=(1-p_1)p_2$, $P(0,0)=1-p_1-p_2+p_1p_2=(1-p_1)(1-p_2)$. Les 4 cases vérifient la CNS : indépendantes.</p><p><b>Barème (points attendus)</b></p><ul><li>E(XY)=P(X=1,Y=1)</li><li>Marges p1 et p2 vérifiées</li><li>Cov=p1+p2+p−1−p1p2</li><li>CNS sur les 4 cases</li><li>Les 3 autres cases déduites de P(1,1)=p1p2</li></ul>
```

```exercice Cartes tirées avec remise : loi géométrique · 5 pts
? {geometrique} **cartes-1.** <p>Dans une boîte, il y a $n$ cartes numérotées de 1 à $n$. On effectue des tirages successifs avec remise, jusqu'à obtenir la carte $n$. Soit $X$ le nombre de tirages effectués.</p>1) Quelle est la loi de $X$ ? Donner $P(X=k)$ pour $k\in\mathbb N^*$.
= <p>Chaque tirage (avec remise, donc indépendant) est une épreuve de Bernoulli de succès « tirer la carte $n$ », $p=\frac1n$. $X$ = rang du premier succès : $X\sim\mathcal G(\frac1n)$, $P(X=k)=\frac1n\left(1-\frac1n\right)^{k-1}=\frac{(n-1)^{k-1}}{n^k}$.</p><p><b>Barème (points attendus)</b></p><ul><li>Épreuves indépendantes de probabilité 1/n</li><li>Loi géométrique nommée</li><li>Formule de P(X=k)</li></ul>
? {geometrique} **cartes-2.** 2) Probabilité que le nombre de cartes tirées soit $\le50$. Application : $n=100$.
= <p>$P(X\le50)=1-P(X>50)$ et $P(X>50)=\sum_{k\ge51}p(1-p)^{k-1}=p(1-p)^{50}\frac1{1-(1-p)}=(1-p)^{50}$. Donc $P(X\le50)=1-\left(1-\frac1n\right)^{50}$. Pour $n=100$ : $1-0{,}99^{50}\approx0{,}395$.</p><p><b>Barème (points attendus)</b></p><ul><li>Passage au complémentaire</li><li>Somme géométrique calculée</li><li>Valeur numérique ≈ 0,395</li></ul>
```

```exercice Uniforme sur \[0,1\] : P(x₁ ≤ X ≤ x₂) · 4 à 5 pts
? {densite} **unif01-1.** <p>Une v.a $X$ suit la loi uniforme sur $[0,1]$. Exprimer $P(x_1\le X\le x_2)$ en fonction des réels $x_1<x_2$.</p>Discussion complète.
= <p>$f=1$ sur $[0,1]$, $0$ ailleurs, et $P(x_1\le X\le x_2)=\int_{x_1}^{x_2}f(t)dt$ = longueur de $[x_1,x_2]\cap[0,1]$ :</p><ul><li>$x_2<0$ ou $x_1>1$ : 0</li><li>$x_1<0\le x_2\le1$ : $x_2$</li><li>$0\le x_1<x_2\le1$ : $x_2-x_1$</li><li>$0\le x_1\le1<x_2$ : $1-x_1$</li><li>$x_1<0$ et $x_2>1$ : 1</li></ul><p><b>Barème (points attendus)</b></p><ul><li>Densité écrite</li><li>Cas hors du support (0)</li><li>Cas à cheval à gauche (x₂)</li><li>Cas intérieur (x₂−x₁)</li><li>Cas à cheval à droite (1−x₁)</li><li>Cas englobant (1)</li></ul>
```

```exercice Fonction génératrice des moments · 8 pts
? {mgf} **mgf-1.** <p>On appelle fonction génératrice des moments de $X$ la fonction $M_X(t)=E(e^{tX})$. La déterminer lorsque $X$ suit une loi a) uniforme sur $[a,b]$ ; b) exponentielle de paramètre $\theta$ ; c) normale centrée réduite.</p>a), b), c)
= <p><b>a)</b> $M_X(t)=\frac1{b-a}\int_a^be^{tx}dx$ : vaut 1 si $t=0$, et $\frac{e^{tb}-e^{ta}}{t(b-a)}$ si $t\neq0$.</p><br><p><b>b)</b> $M_X(t)=\theta\int_0^{+\infty}e^{(t-\theta)x}dx=\frac\theta{\theta-t}$ si $t<\theta$ ; $+\infty$ si $t\ge\theta$.</p><br><p><b>c)</b> $tx-\frac{x^2}2=-\frac{(x-t)^2}2+\frac{t^2}2$, donc $M_X(t)=e^{t^2/2}\int\frac1{\sqrt{2\pi}}e^{-(x-t)^2/2}dx=e^{t^2/2}$ (changement $s=x-t$, intégrale d'une densité = 1).</p><p><b>Barème (points attendus)</b></p><ul><li>Uniforme : cas t=0 séparé</li><li>Uniforme : formule pour t≠0</li><li>Expo : condition t<θ</li><li>Expo : θ/(θ−t)</li><li>Normale : complétion du carré</li><li>Normale : e^(t²/2)</li></ul>
```

```exercice Deux Poisson : loi conditionnelle et régression · 8 pts
? {poisson} **poissoncond-1.** <p>$X$ et $Y$ indépendantes de lois de Poisson de paramètres $\lambda$ et $\mu$, $S=X+Y$.</p>a) Loi conditionnelle de $X$ lorsque $S=s$. b) Fonction de régression de $X$ sur $S$ et valeur de $E[E(X\mid S)]$.
= <p><b>a)</b> $S\sim\mathcal P(\lambda+\mu)$. Pour $0\le x\le s$ : $P(X=x\mid S=s)=\frac{P(X=x)P(Y=s-x)}{P(S=s)}=\frac{e^{-\lambda}\frac{\lambda^x}{x!}e^{-\mu}\frac{\mu^{s-x}}{(s-x)!}}{e^{-(\lambda+\mu)}\frac{(\lambda+\mu)^s}{s!}}=C_s^x\left(\frac\lambda{\lambda+\mu}\right)^x\left(\frac\mu{\lambda+\mu}\right)^{s-x}$. Donc $X\mid(S=s)\sim\mathcal B(s,\frac\lambda{\lambda+\mu})$.</p><br><p><b>b)</b> $E(X\mid S=s)=\frac{s\lambda}{\lambda+\mu}$ (régression linéaire en $s$), donc $E[E(X\mid S)]=\frac{\lambda}{\lambda+\mu}E(S)=\lambda$.</p><p><b>Barème (points attendus)</b></p><ul><li>S ~ P(λ+μ) par indépendance</li><li>Définition de la proba conditionnelle</li><li>Simplification vers C\_s^x</li><li>Loi binomiale reconnue</li><li>E(X|S)=Sλ/(λ+μ)</li><li>E\[E(X|S)\]=λ</li></ul>
```

```exercice Représentants d'étudiants : loi hypergéométrique · 8 pts
? {autresdiscretes} **hypergeo-1.** <p>On choisit au hasard $n$ étudiants parmi $N$ ($n\le N$), dont $N_1$ garçons. $X$ = nombre de garçons choisis.</p>1) Loi de $X$. 2) Domaine $m\le x\le M$. 3) Probabilité de choisir $k$ garçons. II) Différences : binomiale / binomiale négative ; géométrique / binomiale négative ; binomiale / hypergéométrique.
= <p><b>1)</b> Choix sans remise : $X\sim\mathcal H(N,n,N_1)$. <b>2)</b> $m=\max\{0,n-(N-N_1)\}$, $M=\min\{n,N_1\}$. <b>3)</b> $P(X=k)=\frac{C_{N_1}^kC_{N-N_1}^{n-k}}{C_N^n}$.</p><br><p><b>II</b> a) Binomiale : nombre d'épreuves fixé, nombre de succès aléatoire ; binomiale négative : nombre de succès fixé, nombre d'épreuves aléatoire. b) Géométrique = binomiale négative avec 1 seul succès attendu. c) Binomiale : tirages avec remise (indépendants, $p$ constant) ; hypergéométrique : sans remise (dépendants).</p><p><b>Barème (points attendus)</b></p><ul><li>Loi H(N,n,N₁) nommée</li><li>m et M justifiés</li><li>Formule de P(X=k)</li><li>Trois différences correctes</li></ul>
```

```exercice Preuves : E(X+Y) et E(XY) · 4 pts
? {linearite} **linearite-1.** <p>1) $X$, $Y$ discrètes : montrer $E(X+Y)=E(X)+E(Y)$. 2) $X$, $Y$ discrètes indépendantes : montrer $E(XY)=E(X)E(Y)$.</p>1) et 2)
= <p>Voir la notion « Preuves » : on écrit les sommes doubles avec $p_{ij}$, on sépare, on reconnaît les marges ; pour 2) on utilise $p_{ij}=p_{i\bullet}p_{\bullet j}$.</p><br>$$E(X+Y)=\sum_{i,j}(x_i+y_j)p_{ij}=\sum_ix_ip_{i\bullet}+\sum_jy_jp_{\bullet j}\qquad E(XY)=\sum_{i,j}x_iy_jp_{i\bullet}p_{\bullet j}=E(X)E(Y)$$<p><b>Barème (points attendus)</b></p><ul><li>Définition avec la loi du couple</li><li>Séparation des sommes et marges</li><li>Indépendance utilisée au bon endroit</li></ul>
```

```exercice Min et max de n variables (cas général et U\[0,1\]) · 8 pts
? {minmax} **minmaxgen-1.** <p>$X_1,\dots,X_n$ indépendantes de densité $f$ et répartition $F$ ; $m_n=\min X_i$, $M_n=\max X_i$.</p>1) Répartitions et densités de $m_n$, $M_n$. 2) Cas $\mathcal U[0,1]$ : $E(m_n)$, $E(M_n)$. 3) $m_n$ et $1-M_n$ ont même loi ; en déduire $E(m_n)=1-E(M_n)$.
= <p><b>1)</b> $F_{M}=F^n$, $f_M=nfF^{n-1}$ ; $F_m=1-(1-F)^n$, $f_m=nf(1-F)^{n-1}$ (indépendance).</p><br><p><b>2)</b> $F(x)=x$ sur $[0,1]$ : $E(M_n)=\int_0^1nx^ndx=\frac n{n+1}$ ; $E(m_n)=\int_0^1xn(1-x)^{n-1}dx=\frac1{n+1}$ (par parties ou avec $u=1-x$).</p><br><p><b>3)</b> $P(1-M_n\le x)=P(M_n\ge1-x)=1-(1-x)^n=F_{m_n}(x)$ : même loi, donc même espérance, $E(m_n)=1-E(M_n)$.</p><p><b>Barème (points attendus)</b></p><ul><li>Max : intersection + produit</li><li>Min : passage par P(m>x)</li><li>Densités par dérivation</li><li>E(M\_n)=n/(n+1)</li><li>E(m\_n)=1/(n+1)</li><li>Même loi justifiée</li></ul>
```

```exercice Couple continu f(x,y) = xy/2 sur un triangle · 6 pts
? {couplec} **couplexy-1.** <p>$f(x,y)=\frac{xy}2$ si $0\le x\le2$ et $0\le y\le x$, $0$ sinon.</p>1) $F$ pour $0\le y\le x\le2$. 2) Lois marginales, indépendance. 3) Loi de $Y$ sachant $X=x$.
= <p><b>1)</b> $F(x,y)=\int_0^y\int_v^x\frac{uv}2du\,dv=\frac{x^2y^2}8-\frac{y^4}{16}$. <b>2)</b> $f_X(x)=\frac{x^3}4$, $f_Y(y)=\frac{y(4-y^2)}4$ sur $[0,2]$ ; $f\neq f_Xf_Y$ (support triangulaire) : non indépendantes. <b>3)</b> $f_{Y\mid X=x}(y)=\frac{2y}{x^2}$ pour $0\le y\le x$.</p><p><b>Barème (points attendus)</b></p><ul><li>Bornes d'intégration correctes (v≤u≤x)</li><li>F(x,y) juste</li><li>Deux marginales justes</li><li>Non-indépendance justifiée</li><li>Densité conditionnelle</li></ul>
```

```exercice Taux de hasard g = f / (1 − F) · 7 pts
? {uniexpo} **hasard-1.** <p>$F$, $f$ : répartition et densité d'une v.a positive ; $g(x)=\frac{f(x)}{1-F(x)}$.</p>1) Montrer $F(x)=1-e^{-G(x)}$ où $G(x)=\int_0^xg$. 2) $g$ pour $\mathcal E(\lambda)$, puis pour $f(x)=\alpha\lambda x^{\alpha-1}e^{-\lambda x^\alpha}$.
= <p><b>1)</b> $g=-(\ln(1-F))'$ ; avec $F(0)=0$ : $G(x)=-\ln(1-F(x))$, donc $F=1-e^{-G}$. <b>2)</b> Exponentielle : $g=\lambda$. Weibull : $F=1-e^{-\lambda x^\alpha}$, donc $g(x)=\alpha\lambda x^{\alpha-1}$.</p><p><b>Barème (points attendus)</b></p><ul><li>Reconnaître la dérivée de −ln(1−F)</li><li>F(0)=0 utilisé</li><li>g=λ pour l'expo</li><li>F puis g pour Weibull</li></ul>
```

```exercice Normale : retrouver m et σ avec la table · 5 pts
? {normale} **normtable-1.** <p>$X$ normale avec $P(X<2)=0{,}0668$ et $P(X\ge12)=0{,}1587$. Calculer $a$ tel que $P\big([X-E(X)]^2<a\big)=0{,}95$.</p>Calcul complet.
= <p>$\Phi(\frac{2-m}\sigma)=0{,}0668$ ⇒ $\frac{2-m}\sigma=-1{,}5$ ; $\Phi(\frac{12-m}\sigma)=0{,}8413$ ⇒ $\frac{12-m}\sigma=1$. D'où $\sigma=4$, $m=8$. $P((X-8)^2<a)=P(|U|<\frac{\sqrt a}4)=2\Phi(\frac{\sqrt a}4)-1=0{,}95$ ⇒ $\frac{\sqrt a}4=1{,}96$ ⇒ $a=61{,}47$.</p><p><b>Barème (points attendus)</b></p><ul><li>Lecture inverse de la table (−1,5 et 1)</li><li>Système résolu : σ=4, m=8</li><li>Passage à |U|<√a/4</li><li>2Φ−1=0,95 ⇒ 1,96</li><li>a ≈ 61,47</li></ul>
```

```exercice Tableau 3×4 aux cases « produit » (TD, 7 pts) · 7 pts
? {couple} **tableau34-1.** <table class="t"><tr><th>X\Y</th><th>1</th><th>2</th><th>3</th><th>4</th></tr><tr><th>1</th><td>0,08</td><td>0,04</td><td>0,16</td><td>0,12</td></tr><tr><th>2</th><td>0,04</td><td>0,02</td><td>0,08</td><td>0,06</td></tr><tr><th>3</th><td>0,08</td><td>0,04</td><td>0,16</td><td>0,12</td></tr></table>1) Marginales, indépendance. 2) $\text{Cov}(X,Y)$. 3) Loi de $(\min,\max)$.
= <p><b>1)</b> $P(X=1,2,3)=0{,}4;\ 0{,}2;\ 0{,}4$ ; $P(Y=1..4)=0{,}2;\ 0{,}1;\ 0{,}4;\ 0{,}3$. Chacune des 12 cases est le produit de ses marges : indépendantes. <b>2)</b> Donc $\text{Cov}=0$.</p><br><p><b>3)</b> (1,1) 0,08 ; (1,2) 0,08 ; (1,3) 0,24 ; (1,4) 0,12 ; (2,2) 0,02 ; (2,3) 0,12 ; (2,4) 0,06 ; (3,3) 0,16 ; (3,4) 0,12 (total 1).</p><p><b>Barème (points attendus)</b></p><ul><li>Marginales justes</li><li>Vérification de toutes les cases</li><li>Cov=0 justifiée par l'indépendance</li><li>Table (min,max) complète</li></ul>
```


---
id: examen-blanc-zouina
titre: Examen blanc corrigé · format Pr Zouina
seance: Examen blanc · 1 h 30, sans documents ni calculatrice
importance: 5
payant: true
---

> [!attention] Aucun sujet d'examen du Pr Zouina n'est disponible. Ce sujet est **construit sur le modèle de ses TD 2025-2026** (mêmes types d'exercices, même progression : représentation → Boole → 8086 → assembleur), avec des valeurs nouvelles. Tous les calculs du corrigé ont été vérifiés par programme. Barème indicatif sur 20.

> [!astuce] Fais-le en 1 h 30 chrono, sur papier, avant d'ouvrir les corrigés. Note-toi exercice par exercice.

## Exercice 1 · Conversions (3 pts)

```exercice Exercice 1 · Conversions entre bases
? {n3} **1.** Convertir en décimal : (11011011)₂, (3A7)₁₆, (614)₈.
indice: Forme polynomiale.
= 128 + 64 + 16 + 8 + 2 + 1 = **219** · 3×256 + 10×16 + 7 = **935** · 6×64 + 1×8 + 4 = **396**.
? {n3} **2.** Convertir en binaire : (1987)₁₀, (37)₈, (B6)₁₆.
= 1987 = 1024+512+256+128+64+2+1 = **(11111000011)₂** · 3 → 011, 7 → 111 : **(11111)₂** · B → 1011, 6 → 0110 : **(10110110)₂**.
```

## Exercice 2 · Complément à 2 (4 pts)

```exercice Exercice 2 · Entiers signés sur 8 bits
? {n6} **1.** Coder −37 et −100 en Ca2 sur 8 bits.
= 37 = 00100101 → Ca1 11011010 → **11011011** · 100 = 01100100 → Ca1 10011011 → **10011100**.
? {n7} **2.** Calculer 100 − 37 en transformant en addition. Vérifier en décimal.
= 01100100 + 11011011 = (1)00111111 ; retenue ignorée → **00111111 = 63** ✓.
? {n7} **3.** Calculer −75 − 60 sur 8 bits. Le résultat est-il valide ? Donner CF et OF.
indice: −75 = 10110101 ; −60 = 11000100.
= 10110101 + 11000100 = (1)01111001 = +121 → **faux** : −135 < −128, **débordement**. CF = 1, **OF = 1** (deux négatifs donnent un positif).
? {n6} **4.** Plus grand positif représentable = +31 en Ca2 : n ? valeur minimale ?
reponse: 6
= 2ⁿ⁻¹ − 1 = 31 ⇒ **n = 6** ; minimum **−32**.
```

## Exercice 3 · Nombres réels (3 pts)

```exercice Exercice 3 · Format simplifié et IEEE 754
? {n8} **1.** Format 8 bits (1 | 3 exposant biais 3 | 4 mantisse) de +5,5.
= 5,5 = 101,1 = 1,011 × 2² ; E = 5 = 101 ; M = 0110 → **0 101 0110**.
? {n8} **2.** IEEE 754 simple précision de +9,75 puis −0,625 (en hexa).
= 9,75 = 1001,11 = 1,00111 × 2³ ; E = 130 = 10000010 ; M = 00111000… → **411C0000h** · 0,625 = 0,101 = 1,01 × 2⁻¹ ; E = 126 = 01111110 ; S = 1 → **BF200000h**.
? {n8} **3.** Valeur décimale de C1340000h.
indice: 1 | 10000010 | 0110100…
= S = 1, E = 130 − 127 = 3, 1,01101 × 2³ = 1011,01 = **−11,25**.
```

## Exercice 4 · Algèbre de Boole (4 pts)

```exercice Exercice 4 · Parité, simplification, Karnaugh, NAND
? {n18} **1.** Bit de parité impaire de 1100101. Le message 11010110 (parité paire) est-il correct ?
= 1100101 a quatre 1 → bit impair = **1** · 11010110 : cinq 1, total impair → **erreur**.
? {n12} **2.** Simplifier G = A + A'B + AB'.
= A + A'B = A + B ; A + AB' = A → G = **A + B**.
? {n11} **3.** F(A,B,C) = Σm(0, 1, 5, 7) : forme POS canonique, puis simplification par Karnaugh.
= POS : ΠM(2,3,4,6) = (A+B'+C)(A+B'+C')(A'+B+C)(A'+B'+C) · Karnaugh : m0–m1 → **A'B'** ; m5–m7 → **AC** · F = **A'B' + AC**.
? {n10} **4.** Réaliser F = A'B' + AC uniquement avec des NAND.
= A' = NAND(A,A), B' = NAND(B,B) ; F = **NAND( NAND(A',B'), NAND(A,C) )** → 5 portes NAND.
```

## Exercice 5 · Processeur 8086 et mémoire (3 pts)

```exercice Exercice 5 · Hexa, CO/RI, adresses
? {n5} **1.** AX = 7F3Ch, BX = 90E5h. Calculer AX + BX et BX − AX ; le résultat tient-il sur 16 bits ?
= 7F3C + 90E5 = **11021h** : 17 bits, **ne tient pas** (sur 16 bits : 1021h, CF = 1) · 90E5 − 7F3C = **11A9h** : tient.
? {n21} **2.** RAM de 64 mots, 37 instructions. Taille du CO, taille minimale du RI (code op + 3 adresses), taille réelle si la RAM fait 256 octets.
= CO = log₂ 64 = **6 bits** · code op : 32 < 37 ≤ 64 → 6 bits ; RI = 6 + 3 × 6 = **24 bits** · mot = 256 / 64 = 4 octets → **RI = 32 bits**.
? {n20} **3.** Adresses physiques de 1A2B:3C4D et F000:FFF0.
= 1A2B0 + 3C4D = **1DEFDh** · F0000 + FFF0 = **FFFF0h** (adresse de démarrage du 8086).
```

## Exercice 6 · Assembleur (3 pts)

```exercice Exercice 6 · Trace et programme
? {n26} **1.** MOV AX,3 ; MOV CX,4 ; L: ADD AX,CX ; LOOP L. Valeur finale de AX et CX ?
reponse: 13
= AX = 3 + 4 + 3 + 2 + 1 = **13 = 000Dh**, CX = 0.
? {n25} **2.** AL = 45h. Donner AL après chacune (séparément) : AND AL,0Fh ; OR AL,80h ; SHL AL,2 ; SHR AL,1.
= **05h** · **C5h** · 45h = 01000101 → 00010100 = **14h** · 00100010 = **22h**.
? {n26} **3.** Écrire un programme qui lit l'octet N en 0200h et range 1 en 0201h si N est pair, 0 sinon.
indice: TEST AL,1 puis JZ.
= 

        MOV AL, [0200h]
        TEST AL, 1
        JZ PAIR
        MOV BYTE PTR [0201h], 0
        JMP FIN
    PAIR:
        MOV BYTE PTR [0201h], 1
    FIN:
```

## QCM de révision

```qcm
? {n6} Plage de valeurs en Ca2 sur 6 bits :
- [−31 ; 31]
+ [−32 ; 31]
- [0 ; 63]
= [−2⁵ ; 2⁵ − 1].
? {n7} −75 − 60 sur 8 bits donne :
- −135, correct
+ un débordement (OF = 1)
- 0
= −135 < −128 : le résultat lu (+121) est faux.
? {n8} 9,75 en IEEE 754 :
+ 411C0000h
- 41180000h
- C11C0000h
= 1,00111 × 2³, E = 130.
? {n20} Adresse physique de F000:FFF0 :
- F0FF0h
+ FFFF0h
- 1EFF0h
= F0000h + FFF0h = FFFF0h.
? {n25} AL = 45h ; SHL AL,2 :
- 8Ah
+ 14h
- 11h
= 01000101 décalé de 2 : 00010100 (les bits sortis sont perdus).
? {n21} RAM de 64 mots : taille du CO ?
- 5 bits
+ 6 bits
- 64 bits
= 2⁶ = 64.
? {n13} Σm(0,1,5,7) se simplifie en :
- A'C + AB'
+ A'B' + AC
- B' + C
= Deux paires : m0–m1 et m5–m7.
? {n18} Parité paire, message 11010110 :
- correct
+ erroné
- ambigu
= Cinq 1 : total impair.
? {n26} MOV AX,3 ; MOV CX,4 ; L: ADD AX,CX ; LOOP L → AX =
- 10
+ 13
- 7
= 3 + 4 + 3 + 2 + 1.
? {n5} 7F3Ch + 90E5h sur 16 bits :
- 11021h sans retenue
+ 1021h avec CF = 1
- 0FFFFh
= Le 17ᵉ bit part dans CF.
```

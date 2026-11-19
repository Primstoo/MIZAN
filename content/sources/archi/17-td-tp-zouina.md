---
id: td-tp-zouina
titre: TD et TP corrigés · Pr Zouina (2025-2026)
seance: TD 1 à 4 et TP 1 à 3 · MIP S3 2025-2026
importance: 5
---

> [!astuce] Ce chapitre suit les TD et TP distribués par le Pr Mouad Zouina en 2025-2026. Les corrigés reprennent la méthode de la correction qui circule, et **chaque calcul (conversion, Ca2, IEEE 754, hexa, adresses) a été revérifié par programme**.

> [!attention] La correction manuscrite contient quelques erreurs. Elles sont signalées à l'endroit où elles apparaissent, avec la bonne réponse : −19 mal codé (TD 1 ex. 4), binaire de −12,725 faux (TD 1 ex. 5), MOV sans source et mots au lieu d'octets (TD 4 ex. 2), boucle DEC CX + LOOP mal comptée (TD 4 ex. 3).

## Vérifier tes conversions toi-même

Tu peux contrôler tes réponses avec quelques lignes de Python : c'est ce qui a servi à vérifier ce chapitre.

```python
import struct
ca2 = lambda x, n=8: format(x & (2**n - 1), "0%db" % n)
print(int("110101", 2), int("235", 8), 0x7F)
print(ca2(-18), ca2(-45, 7), ca2(58 - 19))
print(struct.pack(">f", 16.55).hex().upper(), struct.pack(">f", -12.725).hex().upper())
print(hex(0x3500 * 16 + 0xAB00))
```

```sortie
53 157 127
11101110 1010011 00100111
41846666 C14B999A
0x3fb00
```

## TD 1 · Représentation de l'information

```exercice TD 1 · Exercice 1 · Conversions entre bases
? {n3} **1.** Convertir en décimal : a) (110101)₂ b) (10101110)₂ c) (7F)₁₆ d) (235)₈.
indice: Forme polynomiale : chaque chiffre × base^rang, rang 0 à droite.
= a) 32 + 16 + 4 + 1 = **53** · b) 128 + 32 + 8 + 4 + 2 = **174** · c) 7×16 + 15 = **127** · d) 2×64 + 3×8 + 5 = **157**.
? {n3} **2.** Convertir en binaire : a) (45)₈ b) (250)₁₀ c) (1721)₁₀ d) (2D)₁₆.
indice: Octal → 3 bits par chiffre ; hexa → 4 bits ; décimal → divisions successives par 2, restes lus de bas en haut.
= a) 4 → 100, 5 → 101 : **(100101)₂** · b) **(11111010)₂** (128+64+32+16+8+2 = 250) · c) **(11010111001)₂** (1024+512+128+32+16+8+1 = 1721) · d) 2 → 0010, D → 1101 : **(101101)₂** = 45.
? {n3} **3.** Pourquoi la base 16 est-elle souvent utilisée pour représenter des nombres binaires ?
= Un chiffre hexa = exactement 4 bits (un quartet) : la conversion se fait par paquets, sans calcul. C'est 4 fois plus court (32 bits = 8 chiffres), un octet = 2 chiffres hexa, d'où son usage pour les adresses, les dumps mémoire et les registres (ex. masque 0xFF = 8 bits à 1).
```

```exercice TD 1 · Exercice 2 · Entiers signés sur 8 bits
? {n6} **1.** Représentation binaire (Ca2, 8 bits) de +18, −18, +64, −64.
indice: Négatif : code |x|, inverse tous les bits (Ca1), ajoute 1.
= +18 = **00010010** · −18 : Ca1 = 11101101, +1 → **11101110** · +64 = **01000000** · −64 : Ca1 = 10111111, +1 → **11000000**.
? {n7} **2.** Vérifier que +18 + (−18) donne 0.
= 00010010 + 11101110 = **1** 00000000 sur 9 bits ; la retenue sortante est ignorée sur 8 bits → 00000000 = 0.
? {n6} **3.** Valeurs maximale et minimale sur 8 bits en Ca2 ?
indice: Sur n bits : [−2ⁿ⁻¹ ; 2ⁿ⁻¹ − 1].
= Min = −128 = **10000000** · Max = +127 = **01111111**.
? {n6} **4.** Pourquoi existe-t-il un nombre négatif sans équivalent positif ?
= 2⁸ = 256 codes : 0 en prend un, il en reste 255 pour 127 positifs et 128 négatifs. −128 (10000000) n'a pas d'opposé : son Ca2 redonne 10000000. Ajouter 1 à 127 donne −128 (dépassement, arithmétique modulo 2⁸).
```

```exercice TD 1 · Exercice 3 · Taille du codage
? {n6} **1a.** Le plus grand positif représentable en Ca2 vaut +63. Déduire n.
indice: Max = 2ⁿ⁻¹ − 1.
reponse: 7
= 2ⁿ⁻¹ − 1 = 63 ⇒ 2ⁿ⁻¹ = 64 = 2⁶ ⇒ n − 1 = 6 ⇒ **n = 7 bits**.
? {n6} **1b.** Valeur minimale possible dans ce système ?
reponse: -64
= −2⁶ = **−64**. Intervalle [−64 ; 63], 2⁷ = 128 codes.
? {n6} **2a.** Ca2 sur 7 bits de +45, −45, −64.
= +45 = **0101101** · −45 : Ca1 = 1010010, +1 → **1010011** · −64 = **1000000** (le minimum).
? {n7} **2b.** Vérifier que +45 + (−45) = 0 (addition binaire).
= 0101101 + 1010011 = **1** 0000000 ; la retenue (8ᵉ bit) est ignorée → 0000000 = 0.
? {n7} **2c.** Que se passe-t-il si on essaie de représenter −64 sur 7 bits ?
= Rien d'anormal : −64 est **exactement la borne minimale** (1000000). En revanche −65 ou +64 sont impossibles sur 7 bits : dépassement (overflow).
```

```exercice TD 1 · Exercice 4 · Opérations en Ca2 sur 8 bits
? {n7} **1.** Calculer en binaire et en décimal : a) 37+12 b) 45+20 c) −64+25 d) 55+50.
= a) 00100101 + 00001100 = **00110001** = 49 · b) 00101101 + 00010100 = **01000001** = 65 · c) 11000000 + 00011001 = **11011001** = −39 · d) 00110111 + 00110010 = **01101001** = 105 (pas de dépassement : 105 ≤ 127).
? {n7} **2.** Transformer en addition puis calculer : a) 58−19 b) 30−15 c) 45−20 d) −100−(−28).
indice: a − b = a + Ca2(b). Une retenue sortante est ignorée.
= a) 00111010 + **11101101** = (1)00100111 = **39** · b) 00011110 + 11110001 = (1)00001111 = **15** · c) 00101101 + 11101100 = (1)00011001 = **25** · d) −100 + 28 : 10011100 + 00011100 = **10111000** = −72.

> [!attention] Dans la correction manuscrite, −19 est écrit 00101101 (c'est +45). Le bon code est **11101101** (19 = 00010011 → Ca1 11101100 → +1). Le résultat final 00100111 = 39 y est quand même juste. Les cas b et c n'y figurent pas : ils sont corrigés ici.
? {n7} **3.** Multiplier (8 bits signés) : a) +13 × (+6) b) +7 × (−5).
= a) 1101 × 0110 par décalages-additions : **01001110** = 78 · b) 7 × 5 = 35 = 00100011, résultat négatif → Ca2 : **11011101** = −35.
? {n7} **4.** Diviser (8 bits) : a) +84 ÷ (+7) b) +84 ÷ (−7) c) −90 ÷ (−15). Quotient, reste, validité.
= a) 01010100 ÷ 00000111 : quotient **00001100** = 12, reste 0 · b) quotient −12 = **11110100**, reste 0 · c) quotient **00000110** = 6, reste 0. Tous les résultats sont dans [−128 ; 127] : pas de débordement.
```

```exercice TD 1 · Exercice 5 · Nombres réels
? {n8} **1.** Format simplifié 8 bits (1 signe | 3 exposant, biais 3 | 4 mantisse) : a) +6,5 b) −2,25.
indice: Biais = 2³⁻¹ − 1 = 3. Le 1 avant la virgule n'est pas stocké.
= a) 6,5 = 110,1 = 1,101 × 2² ; E = 2 + 3 = 5 = 101 ; M = 1010 → **0 101 1010** · b) 2,25 = 10,01 = 1,001 × 2¹ ; E = 1 + 3 = 4 = 100 ; M = 0010 → **1 100 0010**.
? {n8} **2a.** IEEE 754 simple précision de +16,55.
indice: 0,55 × 2 répété : 1, 0, 0, 0, 1, 1, 0, 0, 1, 1… (période 0011).
= 16,55 = 10000,100011001100110011… = 1,0000100011001100110011… × 2⁴ · S = 0 · E = 4 + 127 = 131 = 10000011 · M = 00001000110011001100110 → **0 10000011 00001000110011001100110 = 41846666h**.
? {n8} **2b.** IEEE 754 simple précision de −12,725.
indice: 0,725 → 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1…
= 12,725 = 1100,10111001100110011… = 1,10010111001100110011… × 2³ · S = 1 · E = 3 + 127 = 130 = 10000010 · M = 10010111001100110011001 (troncature) → **1 10000010 10010111001100110011001 = C14B9999h** (C14B999Ah si on arrondit au plus proche, ce que fait la machine).

> [!attention] La correction manuscrite donne 0,725 ≈ 0,10111000010100… : c'est faux dès le 8ᵉ bit. Refais : 0,725×2 = 1,45 → 1 ; 0,45×2 = 0,9 → 0 ; 1,8 → 1 ; 1,6 → 1 ; 1,2 → 1 ; 0,4 → 0 ; 0,8 → 0 ; 1,6 → 1 ; 1,2 → 1… Signe et exposant (1 | 10000010) y sont justes.
```

## TD 2 · Algèbre de Boole

```exercice TD 2 · Exercice 1 · Bit de parité
? {n18} **1.** Bit de parité paire et impaire du mot 1011001.
= Quatre 1 (nombre pair). Parité paire : bit **0** → 10110010 · parité impaire : bit **1** → 10110011.
? {n18} **2.** Le message 10010111 (7 bits + bit de parité paire) contient-il une erreur ?
= Données 1001011, bit reçu 1. Nombre total de 1 : **5, impair**, alors que la parité paire impose un total pair → **erreur détectée**.
```

```exercice TD 2 · Exercice 2 · Simplification algébrique
? {n12} Simplifier : F1 = A(A + B) ; F2 = A + A'B ; F3 = (A + B)(A + B') ; F4 = A'B + AB' ; F5 = (A + B + C)(A + B').
indice: Absorption A + AB = A ; A + A'B = A + B ; distributivité.
= F1 = A·A + A·B = A + AB = **A** (absorption) · F2 = (A + A')(A + B) = **A + B** · F3 = A + A·B' + A·B + B·B' = A + A(B + B') = **A** · F4 ne se réduit pas : c'est **A ⊕ B** (forme produit : (A' + B')(A + B)) · F5 = A + A·B' + A·B + B·B' + A·C + B'·C = **A + B'C**.
```

```exercice TD 2 · Exercice 3 · F(A,B,C) = AB + A'C
? {n11} **1-2.** Table de vérité, formes SOP et POS canoniques.
= F = 1 pour ABC = 001, 011, 110, 111 · **SOP** : F = Σm(1,3,6,7) = A'B'C + A'BC + ABC' + ABC · **POS** : F = ΠM(0,2,4,5) = (A+B+C)(A+B'+C)(A'+B+C)(A'+B+C').
? {n13} **3.** Simplifier avec Karnaugh.
= Deux regroupements de 2 : A = 0, C = 1 → **A'C** ; A = 1, B = 1 → **AB**. F = AB + A'C (déjà minimale).
? {n10} **4-5.** Schéma en ET/OU/NON, puis en NAND seulement.
indice: Double négation + De Morgan : AB + A'C = NAND(NAND(A,B), NAND(A',C)).
= ET/OU/NON : un ET(A,B), un NON(A), un ET(A',C), un OU final · NAND : A' = NAND(A,A) ; F = **NAND( NAND(A,B), NAND(NAND(A,A), C) )** → 4 portes NAND.
```

```exercice TD 2 · Exercice 4 · Du circuit aux formes canoniques
? {n11} Circuit : ET(A,B) → X ; NON(C) → Y ; F = OU(X, Y). Table, SOP, POS, interprétation.
= F = **AB + C'**. F = 1 pour 000, 010, 100, 110, 111 · SOP : Σm(0,2,4,6,7) = A'B'C' + A'BC' + AB'C' + ABC' + ABC · POS : ΠM(1,3,5) = (A+B+C')(A+B'+C')(A'+B+C') · Interprétation : F vaut 1 dès que C est à 0, ou quand A et B sont tous deux à 1.

> [!attention] L'énoncé se contredit : la légende écrit « X = A OR B » et « F = X AND Y », mais le dessin montre une porte ET puis une porte OU. La correction (et ce corrigé) suivent le **dessin**.
```

## TD 3 · Processeur 8086 et mémoire

```exercice TD 3 · Exercice 1 · Calculs hexadécimaux
? {n5} AX = 3A2Bh, BX = 00F4h, CX = 1C0Ah, DX = 0A00h. Calculer AX+BX, CX−BX, DX+CX, (AX+BX)−CX ; le résultat tient-il sur 16 bits ?
indice: Colonne par colonne : B + 4 = 15 = F ; 2 + F = 17 = 1 retenue 1…
= AX + BX = **3B1Fh** · CX − BX = **1B16h** · DX + CX = **260Ah** · (AX+BX) − CX = 3B1F − 1C0A = **1F15h**. Tous ≤ FFFFh : ils tiennent sur 16 bits.
```

```exercice TD 3 · Exercice 2 · CO et RI
? {n21} RAM de 128 mots, 20 instructions. 1) taille du CO 2) taille minimale du RI 3) taille réelle du RI si la RAM fait 512 octets.
indice: CO = log₂(nombre de mots). RI = code op + 3 adresses (format du corrigé).
= 1) 2⁷ = 128 → **CO = 7 bits** · 2) code op : 2⁴ = 16 < 20 ≤ 32 = 2⁵ → 5 bits ; RI = 5 + 3 × 7 = **26 bits** · 3) mot = 512 / 128 = 4 octets → **RI = 32 bits**.
```

```exercice TD 3 · Exercices 3 et 4 · Adresses physiques
? {n20} **3.** Adresse logique ? Formule ? Calculer : 3500:AB00, 0022:FFFF, 2000:0350.
indice: Multiplier par 16 en hexa = ajouter un 0 à droite.
= Adresse logique = couple **segment:offset** utilisé par le programme. Adresse physique = **segment × 16 + offset** (20 bits) · 35000 + AB00 = **3FB00h** · 00220 + FFFF = **1021Fh** · 20000 + 0350 = **20350h**.
? {n20} **4.** Après RESET : CS = 1111h, SS = 2526h, DS = 3333h, IP = 1232h, DI = 0020h, SP = 1100h. Adresses physiques pour CS, DS, SS.
= CS:IP → 11110 + 1232 = **12342h** · SS:SP → 25260 + 1100 = **26360h** · DS:DI → 33330 + 0020 = **33350h**.
```

```exercice TD 3 · Exercices 5 et 6 · Adressage et variables
? {n23} **5.** Mode d'adressage : MOV AL,12h ; MOV AX,BX ; MOV BL,[1300h] ; MOV [SI],11h ; MOV AX,[BX+DI+7].
= Immédiat · registre · direct · indirect par registre (index) · basé indexé avec déplacement.

> [!attention] Ajouté hors correction : MOV [SI],11h est ambigu (octet ou mot ?). L'assembleur exige MOV BYTE PTR [SI],11h.
? {n23} **6.** B0–B6 (1, 8, 17, 32h, FFh, 1b, 1010b) ; D0–D6 mots ; tableaux TabB et TabD de 7 éléments ; 152 octets valant 8 ; 150 mots valant BAC3h.
= 

    B0 DB 1
    B1 DB 8
    B2 DB 17
    B3 DB 32h
    B4 DB 0FFh
    B5 DB 1b
    B6 DB 1010b
    D0 DW 1234h        ; D1 à D6 : valeurs au choix, ex. 0001h, 00FFh, 0ABCh, 0100h, 7FFFh, 8000h
    TabB DB 1, 8, 17, 32h, 0FFh, 1b, 1010b
    TabD DW 1234h, 0001h, 00FFh, 0ABCh, 0100h, 7FFFh, 8000h
    T1 DB 152 DUP(8)
    T2 DW 150 DUP(0BAC3h)

> [!attention] La correction écrit « DW 150 DUP BAC3h » : il faut les parenthèses et un 0 devant une constante hexa commençant par une lettre, sinon l'assembleur la prend pour un nom de variable.
```

## TD 4 · Programmation assembleur

```exercice TD 4 · Exercice 1 · Structures de contrôle
? {n26} Traduire : for (CX = 0 ; CX < BX ; CX++) BX = BX + CX (avec BX = 10) ; while (BX > 0) BX = BX − 1 ; switch (BX) cas 1, 2, 3, défaut.
indice: CMP + saut conditionnel inverse de la condition (sortie) + JMP vers le début.
= 

    ; for
        MOV BX, 10
        MOV CX, 0
    DEBUT_FOR:
        CMP CX, BX
        JGE FIN_FOR        ; sortie si CX >= BX
        ADD BX, CX
        INC CX
        JMP DEBUT_FOR
    FIN_FOR:
    ; while
        MOV BX, 10
    DEBUT_WHILE:
        CMP BX, 0
        JLE FIN_WHILE      ; sortie si BX <= 0
        DEC BX
        JMP DEBUT_WHILE
    FIN_WHILE:
    ; switch
        CMP BX, 1
        JE CASE_1
        CMP BX, 2
        JE CASE_2
        CMP BX, 3
        JE CASE_3
        MOV AX, 0          ; default
        JMP FIN_SWITCH
    CASE_1: MOV AX, 1
        JMP FIN_SWITCH     ; = break
    CASE_2: MOV AX, 5
        JMP FIN_SWITCH
    CASE_3: MOV AX, 10
    FIN_SWITCH:

> [!piege] Dans le for, BX grandit à chaque tour (10, 10, 11, 13, 16…) : la boucle tourne plus que 10 fois. Elle s'arrête quand CX rattrape BX.
```

```exercice TD 4 · Exercice 2 · Rangement selon le signe
? {n26} N1 (1100h) + N2 (1101h), nombres signés. Ranger le résultat en 1103h s'il est positif, 1102h s'il est négatif, 1104h s'il est nul.
indice: ADD positionne ZF et SF : teste JZ d'abord, puis JS.
= 

        MOV AL, [1100h]
        ADD AL, [1101h]
        JZ  NUL
        JS  NEGATIF
        MOV [1103h], AL    ; positif
        JMP FIN
    NEGATIF:
        MOV [1102h], AL
        JMP FIN
    NUL:
        MOV [1104h], AL
    FIN:

> [!attention] La correction utilise AX : MOV AX,[1100h] lit le mot formé par 1100h **et 1101h**, ce qui mélange N1 et N2. N1 et N2 étant à des adresses consécutives, ce sont des octets : il faut AL. Elle écrit aussi « MOV [1104H] » sans source : c'est MOV [1104h],AL.
```

```exercice TD 4 · Exercice 3 · Trace d'une boucle
? {n26} MOV CX,D ; MOV BX,0100h ; MOV AX,10 ; Boucle: ADD AX,[BX] ; ADD BX,2 ; DEC CX ; LOOP Boucle. Mémoire : mots 0, 1, …, 9 aux adresses 100h, 102h, …, 112h. Valeurs finales de AX et BX pour D = 6 et D = 9.
indice: LOOP fait déjà CX ← CX − 1 puis saute si CX ≠ 0. Compte combien de fois CX baisse par tour.
= **Réponse attendue par la correction** (un seul décrément par tour) : D = 6 → AX = 10 + (0+1+2+3+4+5) = **25 (0019h)**, BX = **010Ch** · D = 9 → AX = 10 + 36 = **46 (002Eh)**, BX = **0112h**.

**Ce que fait vraiment le code** (DEC CX + LOOP = −2 par tour) : D = 6 → CX 6 → 4 → 2 → 0 : 3 tours, AX = 10 + 0 + 1 + 2 = **13**, BX = **0106h** · D = 9 (impair) → CX passe par 1, puis DEC donne 0 et LOOP donne FFFFh ≠ 0 : **boucle infinie**.

> [!attention] La correction ignore le DEC CX. Si le sujet tombe, écris les deux lectures ou signale que DEC CX fait doublon avec LOOP. Vérifié par simulation.
```

```exercice TD 4 · Exercice 4 · Saisie et affichage (INT 21h)
? {n26} Afficher « Saisir un caractère: », lire un caractère, afficher « Le caractère saisi est: » suivi du caractère.
indice: AH = 09h affiche une chaîne terminée par $ (DX = adresse) ; AH = 01h lit un caractère dans AL ; AH = 02h affiche DL.
= 

    org 100h
        MOV AH, 09h
        LEA DX, message
        INT 21h
        MOV AH, 01h        ; caractère lu -> AL
        INT 21h
        MOV BL, AL         ; on le met à l'abri
        MOV AH, 09h
        LEA DX, resultat
        INT 21h
        MOV AH, 02h
        MOV DL, BL
        INT 21h
        RET
    message  DB 'Saisir un caractere: $'
    resultat DB 0Dh, 0Ah, 'Le caractere saisi est: $'

0Dh, 0Ah = retour à la ligne. Sans le $, la fonction 09h affiche la mémoire jusqu'au prochain $ rencontré.
```

```exercice TD 4 · Exercice 5 · Somme de 0 à 11
? {n26} Méthode 1 : MOV, CMP, JNE, ADD, DEC/INC. Méthode 2 : LOOP.
reponse: 66
= 

    ; Méthode 1 (sans LOOP)
        MOV AX, 0          ; somme
        MOV BX, 11         ; N
    B1: ADD AX, BX
        DEC BX
        CMP BX, -1
        JNE B1             ; AX = 66 = 42h
    ; Méthode 2 (LOOP)
        MOV AX, 0
        MOV CX, 12         ; 12 tours : 11, 10, ..., 0
        MOV BX, 11
    B2: ADD AX, BX
        DEC BX
        LOOP B2            ; AX = 66

Somme = 11 × 12 / 2 = **66**. (Avec LOOP, CX = 11 suffit aussi : l'ajout de 0 ne change rien.)
```

## TP 1 · Registres et mémoire (emu8086)

```exercice TP 1 · Exercices 1 à 4
? {n22} **Ex. 1.** MOV AL,2Ah puis MOV AH,09h : contenu de AL, AH, AX.
= AL = 2Ah, AH = 09h → **AX = 092Ah**. En pas à pas, seul l'octet modifié change ; IP avance de 2 à chaque instruction (MOV r8,imm8 tient sur 2 octets).
? {n18} **Ex. 2.** MOV AX,0F3h puis MOV [150],AX : tableau octet faible / octet fort.
indice: Little-endian : l'octet de poids faible à l'adresse la plus basse.
= AX = 00F3h. Octet faible **F3h = 243**, à l'adresse DS × 16 + offset ; octet fort **00h = 0** (caractère NUL), à l'adresse suivante. F3h n'est pas un caractère ASCII standard (dans la table étendue de l'émulateur : « ≤ »).

> [!attention] Ajouté hors supports : dans emu8086, un nombre sans suffixe est **décimal**. [150] désigne donc l'offset 150 = 0096h, pas 0150h. Pour l'offset 0150h, écris [150h].
? {n24} **Ex. 3A.** MOV AX,30 ; MOV BX,AX ; MOV CX,55 ; MOV DX,CX ; HLT.
= AX = BX = **001Eh** (30) · CX = DX = **0037h** (55). MOV copie : la source garde sa valeur.
? {n18} **Ex. 3B.** MOV AX,5678h ; MOV [2500h],AX ; MOV BX,[2500h]. Puis avec 3500h.
= BX = **5678h**. En mémoire : [2500h] = 78h, [2501h] = 56h → **little-endian**. Avec 3500h : même résultat, seule la case utilisée change.
? {n23} **Ex. 4.** MOV CX,DX ; MOV DL,[1200h] ; MOV [1200h],CH ; MOV CH,5Ah ; MOV [1200h],5Ah.
= Registre · direct · direct (destination mémoire) · immédiat · immédiat vers mémoire directe (écrire MOV BYTE PTR [1200h],5Ah).
```

## TP 2 · Arithmétique et drapeaux

```exercice TP 2 · Exercices 1 à 5
? {n24} **Ex. 1.** A, B octets ; C, D mots : A ← A + B ; C ← C + D.
= MOV AL,A ; ADD AL,B ; MOV A,AL · MOV AX,C ; ADD AX,D ; MOV C,AX (pas de ADD mémoire-mémoire).
? {n22} **Ex. 2.** AL = 64h × BL = 2, puis AL = 64h × CL = 3 (MUL) : registres et drapeaux.
indice: Après MUL r8, CF = OF = 1 si AH ≠ 0.
= 100 × 2 = 200 → **AX = 00C8h**, CF = OF = 0 · 100 × 3 = 300 → **AX = 012Ch**, CF = OF = 1 (le résultat déborde de AL).
? {n22} **Ex. 3.** A = 10110000, B = 10111100 (signés, 8 bits) : A + B et A − B, drapeaux SF, CF, ZF, OF.
indice: A = −80, B = −68.
= A + B = (1)01101100 → **6Ch**, CF = 1, ZF = 0, SF = 0, **OF = 1** (−148 hors de [−128 ; 127]) · A − B = **F4h** = −12, CF = 1 (emprunt car B0h < BCh), ZF = 0, SF = 1, OF = 0.
? {n25} **Ex. 4.** Diviser par 8 l'octet de 0140h (résultat en 0141h) ; a × 2ᵖ avec a en 0140h, p en 0142h, résultat en 0144h.
= MOV AL,[0140h] ; MOV CL,3 ; SHR AL,CL ; MOV [0141h],AL · MOV AX,[0140h] ; MOV CL,[0142h] ; SHL AX,CL ; MOV [0144h],AX.
? {n24} **Ex. 5.** r = x × y (mots) ; x ÷ y (x mot, y octet).
= MOV AX,x ; MUL y ; MOV r,AX (DX reçoit la partie haute) · MOV AX,x ; DIV y → AL = quotient, AH = reste.
```

## TP 3 · Pile, branchements, boucles, interruptions

```exercice TP 3 · Exercices 1 à 4
? {n26} **Ex. 1.** MOV AX,1234h ; MOV BX,5678h ; PUSH AX ; PUSH BX ; POP AX ; POP BX : objectif, SP, équivalent avec MOV/ADD/SUB.
= Échange AX et BX (LIFO) : **AX = 5678h, BX = 1234h**. SP : S → S−2 → S−4 → S−2 → S. PUSH AX ⇔ SUB SP,2 ; MOV BP,SP ; MOV [BP],AX · POP AX ⇔ MOV BP,SP ; MOV AX,[BP] ; ADD SP,2.
? {n25} **Ex. 2.** TEST AX,0001h ; JZ EstPair ; MOV BX,FFFFh … EstPair: MOV BX,0000h. BX pour AX = 5, puis AX = 4 ? Rôle de TEST et ZF ?
= AX = 5 (impair) → **BX = FFFFh** · AX = 4 (pair) → **BX = 0000h**. TEST fait un ET logique sans modifier AX ; seul le bit 0 reste ; s'il vaut 0, ZF = 1 et JZ saute.
? {n26} **Ex. 3.** CX = 5, AX = 0, SommeLoop: ADD AX,CX ; LOOP SommeLoop ; MOV [0100h],AX. Valeur finale ? Remplacer LOOP.
reponse: 15
= 5 + 4 + 3 + 2 + 1 = **15 = 000Fh**. Sans LOOP : DEC CX ; JNZ SommeLoop.
? {n26} **Ex. 4.** Afficher 'A' (fonction 02h), puis « BONJOUR » (fonction 09h).
= MOV AH,02h ; MOV DL,'A' ; INT 21h · MOV AH,09h ; LEA DX,msg ; INT 21h ; MOV AH,4Ch ; INT 21h avec msg DB 'BONJOUR$' (le $ n'est pas affiché).

> [!attention] La structure suggérée mélange org 100h (programme .COM, où DS est déjà bon) et MOV AX,@data (programme .EXE). Dans emu8086, garde l'un ou l'autre : pour un .COM, supprime les deux lignes @data.
```

## Flashcards

```cartes
{n6} Plage du Ca2 sur n bits :: [−2ⁿ⁻¹ ; 2ⁿ⁻¹ − 1], ex. [−128 ; 127] sur 8 bits
{n6} n tel que le max Ca2 vaut 63 ? :: 2ⁿ⁻¹ − 1 = 63 → n = 7
{n8} Format simplifié 8 bits du TD 1 :: 1 signe | 3 exposant (biais 3) | 4 mantisse
{n8} 16,55 en IEEE 754 :: 41846666h (S=0, E=131, M=000010001100…)
{n18} Bit de parité paire :: Choisi pour que le nombre total de 1 soit pair
{n20} 3500:AB00 en adresse physique :: 35000h + AB00h = 3FB00h
{n21} RAM 128 mots, 20 instructions : RI min ? :: 5 + 3 × 7 = 26 bits
{n26} Piège de DEC CX avant LOOP :: CX baisse de 2 par tour (LOOP décrémente déjà)
{n18} MOV [2500h],AX avec AX = 5678h :: [2500h] = 78h, [2501h] = 56h (little-endian)
{n25} Rôle de TEST AX,1 :: ET logique sans stocker ; ZF = 1 si le nombre est pair
```

## QCM du chapitre

```qcm
? {n6} Le plus grand positif en Ca2 vaut +63. Combien de bits ?
- 6
+ 7
- 8
= 2ⁿ⁻¹ − 1 = 63 ⇒ n = 7.
? {n6} −18 en Ca2 sur 8 bits :
- 10010010
+ 11101110
- 11101101
= 18 = 00010010 → Ca1 11101101 → +1 = 11101110 (11101101 est le Ca1).
? {n7} 58 − 19 en Ca2 : quel code pour −19 ?
- 00101101
- 10010011
+ 11101101
= 19 = 00010011, Ca1 11101100, +1 → 11101101.
? {n8} En IEEE 754, l'exposant stocké de 16,55 est :
- 4
- 127
+ 131
= 16,55 = 1,… × 2⁴ ; 4 + 127 = 131 = 10000011.
? {n8} −2,25 au format 1|3|4 (biais 3) :
+ 1 100 0010
- 1 011 0010
- 0 100 0010
= 2,25 = 1,001 × 2¹ ; E = 1 + 3 = 4 = 100 ; M = 0010 ; signe 1.
? {n18} Le message 10010111 (parité paire) :
- est correct
+ contient une erreur
- ne peut pas être vérifié
= Cinq 1 : total impair, la parité paire est violée.
? {n12} (A + B + C)(A + B') se simplifie en :
- A + B
+ A + B'C
- A·B'
= Développe : A + A·B' + A·B + A·C + B'·C = A + B'C.
? {n5} 3A2Bh + 00F4h =
- 3B2Fh
+ 3B1Fh
- 3A1Fh
= B + 4 = F ; 2 + F = 17 = 1 retenue 1 ; A + 0 + 1 = B ; 3.
? {n20} SS = 2526h, SP = 1100h : adresse physique ?
- 3626h
- 25260h
+ 26360h
= 25260h + 1100h = 26360h.
? {n26} MOV CX,6 ; Boucle: … DEC CX ; LOOP Boucle : combien de tours ?
- 6
+ 3
- 5
= Chaque tour retire 2 à CX : 6 → 4 → 2 → 0.
? {n22} Après MOV AL,64h ; MOV CL,3 ; MUL CL :
- AX = 00C8h, CF = 0
+ AX = 012Ch, CF = 1
- AX = 002Ch, CF = 1
= 100 × 3 = 300 = 12Ch ; AH ≠ 0 donc CF = OF = 1.
```

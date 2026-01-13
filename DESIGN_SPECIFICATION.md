# 🎨 Chokladpengar - Design Specification

## Översikt
Detta dokument beskriver designprinciperna och interaktionerna för Chokladpengar-appen.

---

## 🎨 Färgpalett

### Primära Färger
- **Chokladbrun** (#6B4423) - Primär färg, knappar
- **Ljusbrun** (#8B5A3C) - Hover-states
- **Mörkbrun** (#4A2C1A) - Text, kontrast

### Sekundära Färger
- **Guld** (#D4AF37) - Chokladpengar, highlights
- **Ljusguld** (#F4CF57) - Accenter

### Bakgrunder
- **Varm ljus** (#F5F0E8) - Huvudbakgrund
- **Vit** (#FFFFFF) - Kort, modaler
- **Ljus choklad** (#E8DCC8) - Sekundär bakgrund

### Status Färger
- **Grön** (#4CAF50) - Godkänd, framgång
- **Röd** (#F44336) - Fel, nekad
- **Orange** (#FF9800) - Varning
- **Blå** (#2196F3) - Info

---

## 📱 Komponenter

### 1. Chokladmynt
**Visuell Design:**
- Emoji: 🍫
- Storlekar: Small (14px), Medium (18px), Large (24px)
- Alltid med antal synligt
- Guld-färg för belopp

**Animation:**
- Scale-up vid ökande saldo (1.0 → 1.2 → 1.0)
- Rotation vid överföring (0° → 360°)
- Rörelse från källa till destination

### 2. Uppgiftskort
**Visuell Design:**
- Rundade hörn (12px)
- Vit bakgrund med border
- Checkbox (☐/✔) till vänster
- Titel (16px, bold)
- Beskrivning (14px, light)
- Chokladmynt till höger

**States:**
- **Pending**: Checkbox tom, vit bakgrund
- **Completed**: Checkbox fylld, gul tint, "Väntar på godkännande"
- **Approved**: Grön border, grön bakgrund (ljus)
- **Rejected**: Röd border

**Animation:**
- Bounce-effekt vid markering (scale 1.0 → 1.05 → 1.0)
- Slide in från höger vid godkännande

### 3. Belöningskort
**Visuell Design:**
- Stor ikon (32px emoji) i cirkel
- Titel (16px, bold)
- Beskrivning (14px)
- Pris med chokladmynt

**States:**
- **Affordable**: Normal, klickbar
- **Too expensive**: 60% opacity, "Inte råd" text

**Kategorier:**
- Aktivitet (🎮): Ljusblå tint
- Privilegium (⭐): Ljusgul tint
- Sak (🎁): Ljuslila tint

### 4. Fondkort
**Visuell Design:**
- Vertikal border (4px) med risknivå-färg
- Fondikon (36px emoji)
- Riskindikatorer: 1-3 chokladbitar
- Graf glider fram vid selection

**Risk-färger:**
- Låg: Brun (#8B4513)
- Medel: Karamell (#D2691E)
- Hög: Guld (#FFD700)

**Animation:**
- LayoutAnimation.easeInEaseOut vid expansion
- Graf slide-in från botten

### 5. Fabrikskort
**Visuell Design:**
- Stor fabriksillustration (80px emoji)
- Progressbar med guld-fyllning
- Lista över byggsteg
- Färgade delar: Komplett
- Gråade delar: Ej färdiga

**Byggsteg States:**
- **Komplett**: ✔ ikon, grön text, grön bakgrund
- **Nuvarande**: 🔨 ikon, fetare border, "Bygg detta steg" knapp
- **Låst**: ☐ ikon, grå text

**Animation:**
- Mynt flyger från saldo till byggdel
- Byggdel poppar fram i färg (scale 0.8 → 1.1 → 1.0)
- Progressbar fylls smidigt med easing

---

## 🎭 Interaktioner

### Barnets Hemskärm

#### Uppgift markeras som klar:
1. Användaren trycker på uppgiftskort
2. Checkbox fylls med choklad-animation
3. Kort ändrar till gul tint
4. Status text: "Väntar på godkännande"
5. Notis skickas till förälder

#### Uppgift godkänns av förälder:
1. Förälder trycker "Godkänn"
2. Mynt-animation från uppgift → saldo
3. Saldo counter räknas upp med easing
4. Saldo-området bouncar (scale 1.0 → 1.2 → 1.0)
5. Notis till barn: "Uppgift godkänd! 🎉"

### Investeringsvy

#### Välja fond:
1. Tryck på fondkort
2. LayoutAnimation.easeInEaseOut
3. Kort expanderar
4. Graf glider in från botten (translate Y: 50 → 0)
5. Inputfält aktiveras med focus

#### Investera:
1. Ange belopp
2. Tryck "Investera"
3. Mynt flyger från saldo → fondkort
4. Saldo minskar med counter-animation
5. Fondvärde ökar med counter-animation
6. Graf uppdateras med ny punkt

#### Veckovis uppdatering:
1. Vecka passerar
2. Fondens värde beräknas
3. Ändring visas med uppåt/nedåtpil (▲/▼)
4. Färg: Grön för vinst, röd för förlust
5. Graf uppdateras med ny punkt
6. Notis: "Din investering uppdaterad"

### Chokladfabriken

#### Bygga steg:
1. Tryck på "Bygg detta steg"
2. Bekräftelsedialog visas
3. Vid "Bygg":
   - Mynt flyger från saldo → fabriksdel
   - Saldo minskar med counter-animation
   - Byggdel poppar fram i färg
   - Progressbar fylls (smooth ease-out)
   - Ljud/vibration (optional)

#### Fabrik klar:
1. Sista steg byggs
2. Hela fabriken animeras (pulse-effekt)
3. Konfetti-animation (optional)
4. Modal: "Grattis! Din fabrik är klar!"
5. Produktion aktiveras

#### Veckovis produktion:
1. Vecka passerar
2. Ett mynt "rullar ut" ur fabriken
3. Mynt flyger till saldo
4. Saldo ökar med 1
5. Notis: "Din fabrik producerade 1 🍫"

### Föräldervy

#### Godkänna uppgift:
1. Förälder ser pending tasks
2. Trycker "Godkänn"
3. Alert: "Godkänt!"
4. Uppgift försvinner från lista (fade out)
5. Barnet får notis + chokladpengar

#### Neka uppgift:
1. Förälder trycker "Neka"
2. Bekräftelsedialog
3. Vid "Neka":
   - Uppgift får röd border
   - Status: "Nekad"
   - Barn får notis

#### Skapa uppgift:
1. Fyll i formulär
2. Välj barn (highlight selected)
3. Tryck "Spara uppgift"
4. Success-animation
5. Barn får omedelbar notis
6. Uppgift dyker upp i barnets lista

---

## ✨ Animationer

### Timing
- **Snabb**: 200ms - Hover, focus
- **Normal**: 400ms - Transitions, modals
- **Långsam**: 800ms - Komplexa animationer

### Easing
- **Ease-out**: För entrance-animationer
- **Ease-in**: För exit-animationer
- **Spring**: För bounce-effekter
- **Linear**: För progressbars

### Exempel

```typescript
// Counter animation
Animated.timing(value, {
  toValue: newValue,
  duration: 800,
  easing: Easing.out(Easing.cubic),
  useNativeDriver: true,
})

// Bounce
Animated.sequence([
  Animated.timing(scale, { toValue: 1.2, duration: 200 }),
  Animated.timing(scale, { toValue: 1.0, duration: 200 }),
])

// Coin flight
Animated.parallel([
  Animated.timing(position, { toValue: destination, duration: 800 }),
  Animated.timing(scale, { toValue: 0.5, duration: 800 }),
  Animated.timing(rotation, { toValue: 360, duration: 800 }),
])
```

---

## 📐 Layout Principer

### Spacing
- **XS**: 4px - Tight spacing
- **S**: 8px - Related items
- **M**: 16px - Default spacing
- **L**: 24px - Section spacing
- **XL**: 32px - Major sections

### Border Radius
- **Small**: 8px - Buttons, inputs
- **Medium**: 12px - Cards
- **Large**: 16px - Feature cards
- **XL**: 20px - Hero elements

### Shadows
- **Small**: `shadowOpacity: 0.1, shadowRadius: 4`
- **Medium**: `shadowOpacity: 0.15, shadowRadius: 6`
- **Large**: `shadowOpacity: 0.3, shadowRadius: 12`

---

## 🔤 Typografi

### Font Sizes
- **Display**: 48px - Hero numbers (saldo)
- **H1**: 24px - Screen titles
- **H2**: 20px - Section titles
- **H3**: 18px - Card titles
- **Body**: 16px - Main text
- **Small**: 14px - Secondary text
- **XS**: 12px - Labels, hints

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Labels
- **Semibold**: 600 - Headings
- **Bold**: 700 - Important text

---

## 📱 Responsiveness

### Breakpoints
- Mobil: < 768px
- Tablet: 768px - 1024px (future)

### Touch Targets
- Minimum: 44x44px
- Optimal: 48x48px

---

## ♿ Accessibility

### Kontrast
- Text: Minst 4.5:1
- Large text: Minst 3:1
- UI components: Minst 3:1

### Screen Readers
- Alt-text för ikoner
- Tydliga labels
- State-changes announced

---

Denna design-specifikation säkerställer en konsekvent och engagerande användarupplevelse genom hela Chokladpengar-appen!


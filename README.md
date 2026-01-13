# 🍫 Chokladpengar

En motivationsapp för familjer där barn kan tjäna, spendera och investera chokladpengar!

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Private-red.svg)]()

## 🎯 Översikt

Chokladpengar är en familjeapp som lär barn om pengar, ansvar och sparande genom ett roligt chokladtema. Appen har två användartyper: **Förälder** och **Barn**, där föräldrar kan skapa uppgifter och belöningar, medan barn tjänar och förvaltar sina chokladpengar.

### ✨ Huvudfunktioner

#### För Barn 👶
- **Uppgiftssystem**: Se och slutför uppgifter för att tjäna chokladpengar
- **Chokladkassan**: Köp belöningar med dina chokladpengar
- **Chokladfonder**: Investera i 3 olika fonder med olika risknivåer
  - Mjölkchokladfonden (låg risk)
  - Nougatmixen (mellanrisk)
  - Guldchokladgruvan (hög risk)
- **Chokladfabriken**: Bygg din egen fabrik (6 steg) som genererar passiv inkomst

#### För Föräldrar 👨‍👩‍👧
- **Uppgiftshantering**: Skapa och godkänn uppgifter
- **Belöningsbutik**: Skapa belöningar i olika kategorier
- **Översikt**: Se barnets framsteg, saldo och investeringar
- **Detaljvyer**: Djup insikt i varje barns aktiviteter

### 🎨 Unik Design

- **Inga Emojis**: Alla ikoner är byggda från grunden med React Native
- **Chokladigt Tema**: Varma bruna toner och guldaccenter
- **Animationer**: Mjuka transitions och feedback
- **18+ Custom Ikoner**: Se [ICONS_DOCUMENTATION.md](ICONS_DOCUMENTATION.md)

## 📱 Skärmdumpar

_(Lägg till skärmdumpar här när appen är byggd)_

## 🚀 Kom igång

### Förutsättningar

- **Node.js** v18 eller senare
- **npm** eller **yarn**
- **React Native CLI**
- **Xcode** (för iOS, endast Mac)
- **Android Studio** (för Android)

### Installation

```bash
# 1. Klona repositoryt
git clone https://github.com/ajajerome/chokladpengar.git
cd chokladpengar

# 2. Installera dependencies
npm install

# 3. För iOS (endast Mac)
cd ios && pod install && cd ..

# 4. Starta Metro bundler
npm start
```

### Kör Appen

```bash
# iOS
npm run ios

# Android
npm run android

# Specifik iOS device
npm run ios -- --simulator="iPhone 15 Pro"

# Specifik Android device
npm run android -- --deviceId=<device-id>
```

Se [INSTALLATION.md](INSTALLATION.md) för detaljerad installationsguide och felsökning.

## 📂 Projektstruktur

```
chokladpengar/
├── src/
│   ├── components/          # Återanvändbara UI-komponenter
│   │   ├── icons/           # 18 custom chokladiga ikoner
│   │   ├── AnimatedCoin.tsx
│   │   ├── Button.tsx
│   │   ├── ChocolateCoin.tsx
│   │   ├── FundCard.tsx
│   │   ├── RewardCard.tsx
│   │   └── TaskCard.tsx
│   ├── screens/             # Alla skärmar
│   │   ├── auth/            # LoginScreen
│   │   ├── child/           # 4 barnvyer
│   │   └── parent/          # 5 föräldervy
│   ├── navigation/          # Navigation setup
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript typer
│   ├── theme/               # Färger och styling
│   ├── constants/           # App-konstanter
│   ├── utils/               # Helper-funktioner
│   └── App.tsx              # Root component
├── android/                 # Android-specifik kod
├── ios/                     # iOS-specifik kod
├── docs/                    # Dokumentation
└── [config files]
```

## 🎨 Design & Teman

### Färgpalett

```typescript
// Primära Chokladfärger
primary: '#6B4423'           // Mörk choklad
secondary: '#D4AF37'         // Guld
background: '#F5F0E8'        // Varm ljus

// Risknivåer (Fonder)
fundLow: '#8B4513'           // Mjölkchoklad
fundMedium: '#D2691E'        // Karamell
fundHigh: '#FFD700'          // Guld
```

Se [DESIGN_SPECIFICATION.md](DESIGN_SPECIFICATION.md) för fullständig designguide.

## 🏗️ Teknisk Stack

- **React Native 0.73** - Cross-platform framework
- **TypeScript 5.3** - Type safety
- **Zustand 4.4** - State management
- **React Navigation 6** - Navigation
- **AsyncStorage** - Persistent lagring
- **React Native Chart Kit** - Investeringsgrafer
- **React Native SVG** - Vector graphics
- **date-fns** - Datumhantering

## 🔧 Huvudfunktionalitet

### State Management

Appen använder **Zustand** för global state med persistent lagring via AsyncStorage.

```typescript
// Exempel: Använd store
const { getBalance, createInvestment } = useStore();
const balance = getBalance(userId);
```

### Investeringssystem

Tre fonder med olika risknivåer och realtidsuppdateringar:

```typescript
// Veckovis avkastning
- Mjölkchokladfonden: 0-2%
- Nougatmixen: -3% till +5%
- Guldchokladgruvan: -10% till +15%
```

### Chokladfabriken

6 byggsteg med progressiv kostnad:
1. Grund (100 🍫)
2. Maskiner (150 🍫)
3. Formstation (150 🍫)
4. Pralinlinje (200 🍫)
5. Skylt (50 🍫)
6. Grand Opening (100 🍫)

**Total kostnad**: 750 chokladpengar
**Produktion**: 1 chokladpeng per vecka (passiv inkomst)

## 📚 Dokumentation

- [INSTALLATION.md](INSTALLATION.md) - Detaljerad installationsguide
- [DESIGN_SPECIFICATION.md](DESIGN_SPECIFICATION.md) - Design och UX-principer
- [ICONS_DOCUMENTATION.md](ICONS_DOCUMENTATION.md) - Fullständig ikonguide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Bidragsguide för utvecklare

## 🧪 Testning

```bash
# Kör linter
npm run lint

# Kör tester (när implementerade)
npm test

# Type check
npx tsc --noEmit
```

## 🔒 Säkerhet & Integritet

- ✓ All data lagras lokalt på enheten
- ✓ Ingen extern kommunikation eller tracking
- ✓ Ingen reklam
- ✓ Inga sociala funktioner
- ✓ Familjedata förblir privat

## 🎯 Roadmap

### v1.0 (Nuvarande) ✅
- [x] Grundläggande användarhantering
- [x] Uppgiftssystem med godkännande
- [x] Belöningsbutik
- [x] 3 investeringsfonder
- [x] Chokladfabrik
- [x] Persistent lagring
- [x] 18 custom ikoner
- [x] Animationer

### v1.1 (Planerad)
- [ ] Push notifications
- [ ] Recurring tasks automation
- [ ] Fabriksuppgraderingar
- [ ] Statistik och grafer
- [ ] Export av data
- [ ] Mörkt läge

### v2.0 (Framtid)
- [ ] Flera barn per familj
- [ ] Custom avatarer
- [ ] Achievements/badges
- [ ] Sparmål
- [ ] Familjekalender

## 🤝 Bidra

Vi välkomnar bidrag! Se [CONTRIBUTING.md](CONTRIBUTING.md) för guidelines.

### Snabbstart för bidrag:

```bash
# 1. Forka repositoryt
# 2. Skapa en feature branch
git checkout -b feature/min-nya-funktion

# 3. Gör dina ändringar
# 4. Commit med tydligt meddelande
git commit -m "feat: Lägg till ny funktion"

# 5. Pusha till din fork
git push origin feature/min-nya-funktion

# 6. Skapa en Pull Request
```

## 📄 Licens

Detta projekt är privat och inte licensierat för offentlig användning.

## 👨‍💻 Författare

- **Jerome Aja** - [ajajerome](https://github.com/ajajerome)

## 🙏 Erkännanden

- React Native community
- Alla som bidragit med feedback

## 📞 Support

För frågor eller problem:
- Skapa ett [GitHub Issue](https://github.com/ajajerome/chokladpengar/issues)
- Kontakta via GitHub

---

**Gjord med ❤️ och choklad 🍫**

**Version**: 1.0.0  
**Senast uppdaterad**: 2026-01-13

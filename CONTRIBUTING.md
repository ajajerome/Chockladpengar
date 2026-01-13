# Bidra till Chokladpengar

Tack för ditt intresse att bidra till Chokladpengar! 🍫

## Utvecklingsmiljö

### Förutsättningar
- Node.js 18+
- React Native utvecklingsmiljö (se INSTALLATION.md)
- Git

### Setup
```bash
# Klona repositoryt
git clone https://github.com/ajajerome/chokladpengar.git
cd chokladpengar

# Installera dependencies
npm install

# För iOS
cd ios && pod install && cd ..

# Starta utvecklingsservern
npm start
```

## Projektstruktur

```
chokladpengar/
├── src/
│   ├── components/      # Återanvändbara UI-komponenter
│   │   └── icons/       # Chokladiga ikoner
│   ├── screens/         # Skärmar (auth, child, parent)
│   ├── navigation/      # Navigation setup
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript definitioner
│   ├── theme/           # Färger och styling
│   └── constants/       # App-konstanter
├── android/             # Android-specifik kod
├── ios/                 # iOS-specifik kod
└── docs/                # Dokumentation
```

## Designprinciper

### Ikonografi
- Alla ikoner är byggda från grunden (inga emojis)
- Chokladiga färgtoner
- Rundade hörn (8-12px)
- Fyllda silhuetter med subtil skuggning
- Se DESIGN_SPECIFICATION.md för detaljer

### Färgpalett
- **Primär**: Chokladbrun (#6B4423)
- **Sekundär**: Guld (#D4AF37)
- **Bakgrund**: Varm ljus (#F5F0E8)
- Se `src/theme/colors.ts` för fullständig palett

### Animationer
- Använd React Native Animated API
- Timing: Snabb (200ms), Normal (400ms), Långsam (800ms)
- Easing: ease-out för entrance, ease-in för exit

## Kodstil

### TypeScript
- Använd TypeScript för all ny kod
- Definiera interfaces i `src/types/`
- Undvik `any` - använd specifika typer

### Komponenter
- En komponent per fil
- Använd functional components med hooks
- Props interface ska definieras lokalt

### State Management
- Använd Zustand för global state
- Lokal state med `useState` för UI-state
- Se `src/store/useStore.ts` för exempel

### Namngivning
- Komponenter: PascalCase (t.ex. `TaskCard.tsx`)
- Funktioner: camelCase (t.ex. `handleTaskPress`)
- Konstanter: UPPER_SNAKE_CASE (t.ex. `FACTORY_STAGES`)

## Testa din kod

```bash
# Kör linter
npm run lint

# Kör tester
npm test

# Testa på iOS
npm run ios

# Testa på Android
npm run android
```

## Commit-meddelanden

Använd tydliga commit-meddelanden:

```
feat: Lägg till animerad chokladfabrik
fix: Rätta balanseräkning vid investering
docs: Uppdatera installationsguide
style: Förbättra chokladmynt-ikon
refactor: Förenkla task approval logic
```

## Pull Requests

1. Skapa en ny branch från `main`
2. Gör dina ändringar
3. Testa noggrant på både iOS och Android
4. Skapa en Pull Request med tydlig beskrivning
5. Vänta på code review

### PR Checklist
- [ ] Koden följer projektets kodstil
- [ ] Alla nya funktioner har tester
- [ ] Dokumentation uppdaterad
- [ ] Testat på både iOS och Android
- [ ] Inga linter-errors
- [ ] Commit-meddelanden är tydliga

## Rapportera Buggar

Använd GitHub Issues för att rapportera buggar:

1. Beskriv problemet tydligt
2. Inkludera steg för att återskapa
3. Ange vilken plattform (iOS/Android)
4. Inkludera skärmdumpar om möjligt
5. Ange React Native version

## Föreslå Nya Funktioner

Vi välkomnar nya idéer! Skapa ett GitHub Issue med:

1. Tydlig beskrivning av funktionen
2. Användningsfall
3. Mockups/wireframes om möjligt
4. Förväntad användarupplevelse

## Community

- Var respektfull och inkluderande
- Hjälp andra utvecklare
- Dela dina erfarenheter

## Licens

Genom att bidra till Chokladpengar godkänner du att ditt bidrag licensieras under samma licens som projektet.

---

Tack för att du hjälper till att göra Chokladpengar bättre! 🍫✨


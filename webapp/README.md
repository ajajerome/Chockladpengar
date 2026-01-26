# Chokladpengar - PWA

En modern, progressiv webbapp för familjer att hantera uppgifter, belöningar och lära barn om pengar genom ett roligt choklad-tema.

## 🚀 Snabbstart

### 1. Installera beroenden

```bash
cd webapp
npm install
```

### 2. Konfigurera Firebase (Valfritt för lokal testning)

För att testa lokalt **utan** Firebase:
- Appen använder localStorage automatiskt
- Fungerar offline
- Data sparas lokalt i webbläsaren

För att aktivera **multi-device sync** med Firebase:
1. Följ instruktionerna i `FIREBASE_SETUP.md`
2. Skapa `.env.local` från `.env.example`
3. Lägg in dina Firebase credentials

### 3. Kör utvecklingsserver

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### 4. Testa på mobil

**På samma nätverk:**
1. Kör `npm run dev`
2. Hitta din dators IP (t.ex. 192.168.1.100)
3. Öppna `http://192.168.1.100:3000` på mobilen
4. På iOS Safari: Tryck "Dela" → "Lägg till på hemskärmen"
5. På Android Chrome: Tryck menyn → "Installera app"

## 📱 Installera som app

### iOS (Safari)
1. Öppna appen i Safari
2. Tryck på "Dela"-knappen (fyrkant med pil uppåt)
3. Scrolla ner och tryck "Lägg till på hemskärmen"
4. Tryck "Lägg till"

### Android (Chrome)
1. Öppna appen i Chrome
2. Tryck på menyn (tre prickar)
3. Tryck "Installera app" eller "Lägg till på hemskärmen"
4. Tryck "Installera"

## 🎯 Funktioner

- ✅ **Uppgifter** - Föräldrar skapar, barn slutför, föräldrar godkänner
- ✅ **Belöningar** - Barn kan köpa belöningar med chokladpengar
- ✅ **Chokladfonder** - Investera och se avkastning (uppdateras ons & lör)
- ✅ **Chokladfabriken** - Bygg fabrik för passiv inkomst
- ✅ **Multi-familj** - Flera familjer kan använda samma installation
- ✅ **Offline-first** - Fungerar utan internet (localStorage)
- ✅ **Firebase sync** - (Valfritt) Synka mellan enheter

## 🏗️ Byggprocess

### Bygg för produktion

```bash
npm run build
npm start
```

### Deploy till Vercel

```bash
# Installera Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Följ instruktionerna. Första gången får du länka till ditt Vercel-konto.

**Lägg till environment variables i Vercel:**
1. Gå till Vercel Dashboard → ditt projekt
2. Settings → Environment Variables
3. Lägg till alla `NEXT_PUBLIC_FIREBASE_*` variabler från `.env.local`

## 📁 Projektstruktur

```
webapp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home/redirect
│   │   ├── login/             # Login screen
│   │   ├── create-family/     # Create family
│   │   ├── add-child/         # Add child
│   │   ├── child/             # Child screens
│   │   │   ├── page.tsx       # Child home
│   │   │   ├── rewards/       # Reward shop
│   │   │   ├── investments/   # Investment funds
│   │   │   └── factory/       # Factory building
│   │   └── parent/            # Parent screens
│   │       ├── page.tsx       # Parent home
│   │       ├── create-task/   # Create task
│   │       └── create-reward/ # Create reward
│   ├── components/            # Reusable components
│   │   ├── Button.tsx
│   │   ├── TaskCard.tsx
│   │   ├── RewardCard.tsx
│   │   ├── FundCard.tsx
│   │   └── ChocolateCoin.tsx
│   ├── store/                 # Zustand state management
│   │   └── useStore.ts
│   ├── types/                 # TypeScript types
│   ├── constants/             # Constants (funds, factory)
│   └── lib/                   # Firebase config
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons
├── .env.example               # Environment variables template
├── FIREBASE_SETUP.md          # Firebase setup guide
└── README.md                  # This file
```

## 🔧 Teknologi

- **Next.js 15** - React framework med App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Firebase** - Realtime Database (optional)
- **PWA** - Progressive Web App (installable)

## 🎨 Design

- **Choklad-tema** - Varma bruna, beige, karamell och guldtoner
- **Gradient bakgrund** - Mjuk gradient från ljus till mörkare beige
- **Moderna kort** - Rundade hörn, skuggor, hover-effekter
- **Responsiv** - Fungerar på alla skärmstorlekar

## 💰 Monetisering (Framtida)

Appen är förberedd för Stripe-integration:
- Freemium-modell: Gratis för 1 barn, premium för fler
- Premium: 49 kr/månad eller 490 kr/år
- Ingen App Store-provision (30% sparas!)

## 📊 Automatisk fondupdatering

Fonder uppdateras automatiskt varje **onsdag** och **lördag** kl 08:00 via Firebase Cloud Functions.

För att aktivera:
1. Följ `FIREBASE_SETUP.md`
2. Deploy Cloud Function
3. Barnen får push-notis när fonderna uppdaterats

## 🐛 Felsökning

### Appen laddar inte
- Kontrollera att `npm run dev` körs
- Rensa webbläsarcache (Ctrl+Shift+R / Cmd+Shift+R)

### Firebase fungerar inte
- Kontrollera att `.env.local` finns och har rätt värden
- Kolla att Realtime Database är aktiverad i Firebase Console
- Verifiera att security rules är korrekt konfigurerade

### PWA installeras inte
- PWA kräver HTTPS (fungerar på localhost utan)
- På produktion: Se till att manifest.json finns
- På iOS: Endast Safari stöder "Lägg till på hemskärmen"

## 📝 Licens

Privat projekt - Alla rättigheter förbehållna.

## 🤝 Kontakt

För frågor eller support, kontakta projektägaren.







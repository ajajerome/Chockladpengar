# Chokladpengar - Webbapp

En rolig och pedagogisk app för att lära barn om ekonomi genom uppgifter, belöningar och investeringar.

## 🚀 Snabbstart

### Lokal utveckling

```bash
# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## 🔥 Firebase Setup (Valfritt)

Appen fungerar i två lägen:

1. **Local Mode** (Standard) - Data sparas i localStorage
2. **Firebase Mode** - Data synkas i realtid mellan enheter

### För att aktivera Firebase Mode:

1. Skapa ett Firebase-projekt på [console.firebase.google.com](https://console.firebase.google.com)

2. Aktivera **Realtime Database**:
   - Gå till Build > Realtime Database
   - Skapa databas (börja i test mode)

3. Hämta Firebase config:
   - Gå till Project Settings > General
   - Scrolla ner till "Your apps"
   - Välj Web app (eller skapa en ny)
   - Kopiera Firebase SDK config

4. Skapa `.env.local`:
```bash
cp .env.template .env.local
```

5. Fyll i dina Firebase-värden i `.env.local`

6. Starta om utvecklingsservern

## 📱 Funktioner

### För Föräldrar:
- ✅ Skapa uppgifter för barn
- 🎁 Skapa belöningar
- 👨‍👩‍👧‍👦 Hantera flera barn
- ✓ Godkänn/avvisa avslutade uppgifter
- 📊 Översikt över familjens aktivitet

### För Barn:
- 🍫 Tjäna chokladpengar genom uppgifter
- 🎁 Köpa belöningar
- 📈 Investera (kommer snart)
- 🏭 Chokladfabrik med passiv inkomst (kommer snart)

## 🏗️ Teknisk Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Firebase** - Real-time database (optional)

## 📁 Projektstruktur

```
webapp/
├── src/
│   ├── app/                 # Next.js pages (App Router)
│   │   ├── page.tsx        # Startsida
│   │   ├── login/          # Inloggning
│   │   ├── create-family/  # Skapa familj
│   │   ├── parent/         # Förälder screens
│   │   └── child/          # Barn screens
│   ├── components/         # Återanvändbara komponenter
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Firebase & localStorage services
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript types
│   └── lib/                # Firebase config
├── public/                 # Statiska filer
└── .env.template          # Environment variables template
```

## 🚀 Deployment

### Vercel (Rekommenderat)

1. Pusha kod till GitHub

2. Gå till [vercel.com](https://vercel.com)

3. Importera ditt repo

4. Konfigurera:
   - **Root Directory:** `webapp`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`

5. Lägg till Environment Variables (om du använder Firebase):
   - Gå till Settings > Environment Variables
   - Lägg till alla variabler från `.env.local`

6. Deploy!

### Annan hosting

```bash
# Bygg production
npm run build

# Starta production server
npm start
```

## 🔧 Utveckling

### Köra i Local Mode (utan Firebase)

Appen fungerar direkt utan Firebase. All data sparas i localStorage.

### Testa på mobil (samma nätverk)

1. Hitta din dators IP-adress:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

2. Öppna på mobilen:
```
http://[DIN_IP]:3000
```

### Lägg till på hemskärmen

På iOS/Android:
1. Öppna appen i webbläsaren
2. Tryck på "Dela" / "Meny"
3. Välj "Lägg till på hemskärmen"
4. Nu kan du öppna appen som en native app!

## 🤝 Bidra

Pull requests är välkomna! För större ändringar, öppna en issue först.

## 📄 Licens

MIT

## 🍫 Tack!

Byggt med ❤️ för att göra ekonomisk utbildning rolig för barn!

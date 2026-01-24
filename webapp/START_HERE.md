# Chokladpengar Webapp - Installationsguide

## 🎉 Redo att testa!

Jag har skapat en komplett Next.js PWA för Chokladpengar! Här är vad som är klart:

### ✅ Vad som är implementerat:

1. **Next.js 15 projekt** med TypeScript och Tailwind CSS
2. **Alla screens:**
   - Login & Family Creation
   - Child screens (Home, Rewards, Investments, Factory)
   - Parent screens (Home, Create Task, Create Reward)
3. **Komponenter:**
   - Button, TaskCard, RewardCard, FundCard, ChocolateCoin
4. **State Management:** Zustand med localStorage persistence
5. **PWA-ready:** Manifest och installbar
6. **Firebase-ready:** Konfiguration för Realtime Database
7. **Deployment-ready:** Vercel guide och setup

### 🚀 Kom igång:

```bash
# 1. Gå till webapp-mappen
cd webapp

# 2. Installera dependencies
npm install

# 3. Starta utvecklingsserver
npm run dev
```

Öppna http://localhost:3000 i din webbläsare!

### 📱 Testa på mobil (samma nätverk):

```bash
# 1. Hitta din dators IP-adress
# Windows: ipconfig (leta efter IPv4 Address)
# Mac/Linux: ifconfig eller ip addr

# 2. Öppna på mobilen
http://[DIN_IP]:3000

# Exempel: http://192.168.1.100:3000
```

### 🔥 Firebase (Valfritt - för multi-device sync):

Om du vill synka mellan enheter:
1. Följ `webapp/FIREBASE_SETUP.md`
2. Skapa `.env.local` från `.env.template`

**Men för att testa lokalt behöver du INTE Firebase!**
Appen fungerar perfekt med localStorage.

### ☁️ Deploy till Vercel:

När du är redo att göra appen tillgänglig online:

```bash
# Installera Vercel CLI
npm i -g vercel

# Deploy
cd webapp
vercel
```

Följ `webapp/DEPLOYMENT.md` för detaljerad guide!

### 📋 Nästa steg:

1. **Testa lokalt:** Kör `npm run dev` och testa i webbläsaren
2. **Testa på mobil:** Öppna på din iPhone/Android och "Lägg till på hemskärmen"
3. **Testa med familjen:** Skapa familj, lägg till barn, skapa uppgifter
4. **Deploy:** När allt funkar, deploya till Vercel (gratis!)

---

## 📁 Projektstruktur:

```
webapp/
├── src/
│   ├── app/              # All pages
│   ├── components/       # Reusable components
│   ├── store/           # Zustand state
│   ├── constants/       # Funds, Factory
│   └── lib/             # Firebase config
├── public/
│   ├── manifest.json    # PWA manifest
│   └── icons/           # App icons (lägg till egna)
├── README.md            # Full dokumentation
├── FIREBASE_SETUP.md    # Firebase guide
├── DEPLOYMENT.md        # Vercel deployment guide
└── .env.template        # Environment variables template
```

---

## 🎨 Features:

- ✅ Choklad-tema med gradients
- ✅ Responsiv design (mobil + desktop)
- ✅ PWA (installbar som app)
- ✅ Offline-first (localStorage)
- ✅ Firebase-ready (multi-device sync)
- ✅ Vibration "ca-ching" vid godkänd uppgift
- ✅ Alla funktioner från React Native-versionen

---

**Lycka till med testningen! 🍫**

Fråga mig om du stöter på problem!


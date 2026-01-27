# 🍫 Chokladpengar - Snabbstart

## 🚀 Kom igång på 2 minuter!

### 1. Installera dependencies

```bash
cd webapp
npm install
```

### 2. Starta appen

```bash
npm run dev
```

### 3. Öppna i webbläsaren

Gå till: **http://localhost:3000**

---

## 🎮 Testa appen

### Som Förälder:

1. Klicka på **"Skapa familj"**
2. Fyll i:
   - Familjens namn (t.ex. "Familjen Andersson")
   - Ditt namn (t.ex. "Anna")
3. Du får en **familje kod** (t.ex. ABC123) - spara den!
4. Nu kan du:
   - Lägga till barn
   - Skapa uppgifter
   - Skapa belöningar
   - Godkänna avslutade uppgifter

### Som Barn:

1. Be dina föräldrar om **familje koden**
2. Klicka på **"Logga in"**
3. Fyll i:
   - Familje koden
   - Ditt namn
   - Välj "Barn"
4. Nu kan du:
   - Se dina uppgifter
   - Markera uppgifter som klara
   - Köpa belöningar
   - Se ditt saldo

---

## 📱 Testa på mobil

1. Hitta din dators IP-adress:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. På mobilen, öppna:
   ```
   http://[DIN_IP]:3000
   ```
   Exempel: `http://192.168.1.100:3000`

3. **Lägg till på hemskärmen:**
   - iOS: Tryck på "Dela" → "Lägg till på hemskärmen"
   - Android: Tryck på Meny → "Lägg till på startskärmen"

---

## 🔥 Aktivera Firebase (Valfritt)

**Standard:** Appen använder localStorage (offline-first)

**Med Firebase:** Data synkas mellan alla enheter i realtid!

### Setup:

1. Skapa Firebase-projekt på [console.firebase.google.com](https://console.firebase.google.com)

2. Aktivera **Realtime Database**

3. Kopiera Firebase config

4. Skapa `.env.local`:
   ```bash
   cp env.example .env.local
   ```

5. Fyll i dina Firebase-värden i `.env.local`

6. Starta om servern:
   ```bash
   npm run dev
   ```

---

## 🚀 Deploy till Vercel

### Snabbaste sättet:

1. Pusha till GitHub:
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push
   ```

2. Gå till [vercel.com](https://vercel.com) och logga in

3. Klicka **"New Project"**

4. Välj ditt repo

5. **VIKTIGT:** Sätt **Root Directory** till `webapp`

6. Klicka **"Deploy"**

7. Klart! 🎉

**Detaljerad guide:** Se `DEPLOYMENT.md`

---

## 🎯 Funktioner

### ✅ Färdigt:
- [x] Skapa familj med delbar kod
- [x] Lägga till barn
- [x] Skapa uppgifter (engångs/dagliga/veckovisa)
- [x] Skapa belöningar
- [x] Barn kan markera uppgifter som klara
- [x] Föräldrar kan godkänna/neka uppgifter
- [x] Köpa belöningar
- [x] Real-time sync med Firebase
- [x] Offline-first med localStorage
- [x] PWA (installbar app)
- [x] Responsiv design

### 🚧 Kommer snart:
- [ ] Investeringar/fonder
- [ ] Chokladfabrik (passiv inkomst)
- [ ] Statistik och grafer
- [ ] Notifikationer

---

## 📁 Projektstruktur

```
webapp/
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   ├── components/       # UI komponenter
│   ├── hooks/            # Custom hooks (useAuth, useTasks, etc.)
│   ├── services/         # Firebase & localStorage
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript types
│   └── lib/              # Firebase config
├── public/               # Statiska filer
└── env.example          # Environment variables template
```

---

## 🐛 Problem?

### Vit sida / inget visas
- Kontrollera att du kör `npm run dev` i `webapp`-mappen
- Öppna DevTools Console och kolla errors

### Firebase synkar inte
- Kontrollera att `.env.local` är korrekt ifylld
- Verifiera Database Rules i Firebase Console

### Bygg-fel
```bash
# Testa build lokalt
npm run build
```

---

## 💡 Tips

1. **Offline-first:** Appen fungerar utan internet!
2. **Installera:** Lägg till på hemskärmen för bästa upplevelse
3. **Multi-device:** Använd Firebase för att synka mellan enheter
4. **Familjekod:** Dela koden med familjemedlemmar

---

## 📚 Mer information

- **README.md** - Fullständig dokumentation
- **DEPLOYMENT.md** - Deploy guide
- **env.example** - Environment variables

---

**Lycka till! 🍫**

Ha kul att lära barnen om ekonomi!


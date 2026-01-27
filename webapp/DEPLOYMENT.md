# Deployment Guide - Chokladpengar

Denna guide hjälper dig att deploya Chokladpengar till Vercel.

## 🚀 Snabb deployment med Vercel

### Steg 1: Förberedelser

1. Pusha din kod till GitHub (om inte redan gjort)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. Om du vill använda Firebase, se till att du har:
   - Skapat ett Firebase-projekt
   - Aktiverat Realtime Database
   - Kopierat Firebase config-värden

### Steg 2: Deploya till Vercel

#### Via Vercel Dashboard (Rekommenderat)

1. Gå till [vercel.com](https://vercel.com) och logga in

2. Klicka på "Add New Project"

3. Importera ditt GitHub repo

4. **VIKTIGT** - Konfigurera project settings:
   ```
   Framework Preset: Next.js
   Root Directory: webapp
   Build Command: npm run build
   Install Command: npm install
   Output Directory: .next
   ```

5. Om du använder Firebase, lägg till Environment Variables:
   - Klicka på "Environment Variables"
   - Lägg till följande variabler:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_DATABASE_URL
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     ```
   - Kopiera värdena från din `.env.local`

6. Klicka på "Deploy"

7. Vänta medan Vercel bygger och deployer (tar ~2 min)

8. 🎉 Klart! Du får en URL typ: `https://chokladpengar-xxx.vercel.app`

#### Via Vercel CLI

```bash
# Installera Vercel CLI (första gången)
npm install -g vercel

# Gå till webapp-mappen
cd webapp

# Deploy
vercel

# Följ prompten:
# - Set up and deploy? Y
# - Which scope? [välj ditt konto]
# - Link to existing project? N
# - Project name? chokladpengar (eller vad du vill)
# - Directory? ./
# - Override settings? N

# För production deployment:
vercel --prod
```

## 🔥 Firebase Setup för Production

1. **Database Rules** - Uppdatera Firebase Realtime Database Rules:

```json
{
  "rules": {
    "families": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$familyId": {
        ".validate": "newData.hasChildren(['id', 'name', 'code', 'ownerId', 'createdAt'])"
      }
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$userId": {
        ".validate": "newData.hasChildren(['id', 'name', 'role', 'familyId', 'createdAt'])"
      }
    },
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "rewards": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "transactions": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

**OBS:** För enkel användning utan authentication, använd:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
⚠️ Detta är INTE säkert för production! Använd bara för testing.

2. **Authentication** (Framtida förbättring):
   - Aktivera Email/Password authentication i Firebase
   - Eller använd Anonymous authentication för enkel start

## 🔄 Uppdatera deployment

### Automatisk deployment

Varje gång du pushar till GitHub main-branchen kommer Vercel automatiskt att:
1. Upptäcka ändringarna
2. Bygga om appen
3. Deploya den nya versionen

```bash
git add .
git commit -m "Update features"
git push
```

### Manuell deployment

```bash
cd webapp
vercel --prod
```

## 🌍 Custom Domain (Valfritt)

1. Gå till ditt projekt på Vercel Dashboard

2. Settings > Domains

3. Lägg till din egen domän (t.ex. `chokladpengar.se`)

4. Följ Vercels instruktioner för att uppdatera DNS-records

## 📱 PWA (Progressive Web App)

Din app är redan PWA-redo! Användare kan:

1. Öppna appen i webbläsaren
2. Välja "Lägg till på hemskärmen"
3. Använda den som en native app

Ikonen och namn kommer från `public/manifest.json`.

## 🐛 Troubleshooting

### "White screen" eller "500 error"

1. Kontrollera att `vercel.json` har rätt `rootDirectory: "webapp"`

2. Kolla build logs i Vercel Dashboard

3. Verifiera att alla environment variables är korrekt satta

### Firebase inte synkar

1. Kontrollera att alla Firebase env variables är satta i Vercel

2. Verifiera Database Rules i Firebase Console

3. Öppna browser console och kolla efter errors

### Build errors

```bash
# Testa build lokalt först
cd webapp
npm run build
```

Om det fungerar lokalt men inte på Vercel:
1. Dubbelkolla `next.config.ts`
2. Verifiera att alla dependencies är i `package.json`
3. Kontrollera Node version (Vercel använder senaste LTS)

## 📊 Monitorering

### Vercel Analytics

Aktivera i Vercel Dashboard > Analytics för att se:
- Sidvisningar
- Prestanda
- Web Vitals

### Firebase Console

Övervaka i Firebase Console:
- Database användning
- Real-time connections
- Storage

## 💰 Kostnad

- **Vercel Free Tier:**
  - 100 GB bandwidth
  - Unlimited requests
  - Perfekt för små projekt

- **Firebase Free Tier (Spark Plan):**
  - 1 GB storage
  - 10 GB/månad nedladdning
  - Tillräckligt för många familjer

## 🎉 Klart!

Din app är nu live! Dela länken med din familj:
```
https://din-app.vercel.app
```

Användare kan:
1. Gå till länken
2. Skapa familj eller logga in
3. Lägga till på hemskärmen för bästa upplevelse!

---

**Lycka till! 🍫**

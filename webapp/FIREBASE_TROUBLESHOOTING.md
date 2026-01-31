# Firebase Felsökning 🔥

## Vanliga Firebase-fel och lösningar

### 1. "Firebase database not initialized"

**Problem:** Firebase-databasen är inte initierad.

**Lösningar:**
1. Kontrollera att `.env.local` finns i `webapp/`-mappen
2. Kontrollera att alla `NEXT_PUBLIC_FIREBASE_*` variabler är satta:
   ```bash
   Get-Content .env.local | Select-String "FIREBASE"
   ```
3. Starta om dev-servern:
   ```bash
   npm run dev
   ```

### 2. "Permission denied" i Firebase Console

**Problem:** Firebase Realtime Database har för strikta säkerhetsregler.

**Lösning:**
1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Välj ditt projekt
3. Gå till "Realtime Database" → "Rules"
4. Använd dessa regler för utveckling:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

⚠️ **OBS:** Detta är ENDAST för utveckling! Använd säkrare regler i produktion.

### 3. "Family not found" när du försöker logga in

**Problem:** Familjen finns inte i databasen.

**Lösningar:**
1. Kontrollera att du skapat en familj först (via "Skapa familj")
2. Kontrollera att familjekoden är korrekt (6 tecken, stora bokstäver och siffror)
3. Öppna Firebase Console och kolla under "Realtime Database" → "Data" → "families"

### 4. Vercel deployment fungerar inte

**Problem:** Firebase-variabler är inte satta i Vercel.

**Lösning:**
1. Gå till [Vercel Dashboard](https://vercel.com/)
2. Välj ditt projekt
3. Gå till "Settings" → "Environment Variables"
4. Lägg till alla `NEXT_PUBLIC_FIREBASE_*` variabler:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Redeploya projektet

### 5. Data synkas inte mellan enheter

**Problem:** Firebase Realtime Database fungerar inte korrekt.

**Lösningar:**
1. Kontrollera att `databaseURL` i `.env.local` är korrekt
2. Kontrollera att du använder rätt region (t.ex. `europe-west1`)
3. Öppna webbläsarens konsol (F12) och leta efter Firebase-fel
4. Kontrollera att du är ansluten till internet

### 6. "Index not defined" varningar

**Problem:** Firebase behöver index för vissa queries.

**Lösning:**
1. Gå till Firebase Console
2. Gå till "Realtime Database" → "Rules"
3. Lägg till index enligt `FIREBASE_SETUP.md`

### 7. Hur kollar jag Firebase-status i appen?

**Lösning:**
- Öppna appen i webbläsaren
- Titta i nedre högra hörnet:
  - ✅ Grön = Firebase ansluten
  - ❌ Röd = Firebase-fel (klicka för detaljer)

### 8. Hur testar jag Firebase lokalt?

**Steg:**
1. Öppna terminalen i `webapp/`-mappen
2. Kör:
   ```bash
   npm run dev
   ```
3. Öppna http://localhost:3000
4. Öppna webbläsarens konsol (F12)
5. Leta efter:
   - `🔥 Initierar Firebase...`
   - `✅ Firebase initierat!`

Om du ser `❌` istället, läs felmeddelandet och följ instruktionerna ovan.

### 9. Hur rensar jag Firebase-data?

**Lösning:**
1. Gå till Firebase Console
2. Gå till "Realtime Database" → "Data"
3. Högerklicka på noden du vill ta bort (t.ex. "families")
4. Välj "Delete"

⚠️ **OBS:** Detta går inte att ångra!

### 10. Hur skapar jag en ny Firebase-databas?

**Steg:**
1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Klicka "Add project" eller välj befintligt projekt
3. Gå till "Build" → "Realtime Database"
4. Klicka "Create Database"
5. Välj location: **Europe (europe-west1)**
6. Välj "Start in test mode"
7. Kopiera database URL (t.ex. `https://xxx.europe-west1.firebasedatabase.app`)
8. Uppdatera `NEXT_PUBLIC_FIREBASE_DATABASE_URL` i `.env.local`

## Behöver du mer hjälp?

- Läs [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) för grundläggande setup
- Kolla Firebase Console för felmeddelanden
- Öppna webbläsarens konsol (F12) för detaljerade fel






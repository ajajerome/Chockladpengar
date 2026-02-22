# Fondpriser-system

## Problem som fixats

**Problem**: Fondpriser uppdaterades inte mellan sessioner. När användare loggade in igen såg de samma priser som när de startade.

**Orsak**: 
- Priserna sparades i localStorage (lokalt i webbläsaren)
- På Vercel/olika enheter hade varje användare sina egna priser
- Priserna uppdaterades bara när investment-sidan var öppen

## Lösning: Firebase-synkade fondpriser

Fondpriserna är nu lagrade i Firebase Realtime Database och synkas automatiskt mellan alla användare.

### Så fungerar det:

#### 1. **Initiering (första gången)**
När första användaren öppnar appen:
- Systemet kollar om fondpriser finns i Firebase
- Om inte, skapas default-priser i Firebase:
  ```javascript
  fund_1: { basePrice: 10, currentPrice: 10, volatility: 0.02, trend: 0.3 }
  fund_2: { basePrice: 15, currentPrice: 15, volatility: 0.05, trend: 0 }
  fund_3: { basePrice: 20, currentPrice: 20, volatility: 0.1, trend: -0.2 }
  ```

#### 2. **Prisuppdateringar (automatiskt)**
- Priser uppdateras var **60:e sekund** (1 minut)
- Uppdateringar sker endast om minst 1 minut har gått sedan senaste uppdatering
- När priser uppdateras:
  1. Beräkna nytt pris baserat på volatilitet och trend
  2. Spara till Firebase
  3. Alla användare får automatiskt det nya priset via real-time listener

#### 3. **Real-time synkning**
- Alla användare lyssnar på fondpriser i Firebase
- När priser ändras uppdateras de automatiskt för alla
- Funkar även om användaren inte har investment-sidan öppen

#### 4. **Prisberäkning**
Priser beräknas med:
- **Random component**: Slumpmässig förändring baserat på volatilitet
- **Mean reversion**: Priset tenderar att gå tillbaka mot basepriset
- **Trend**: Positiv trend = mer troligt att priset går upp

```javascript
// Exempel: fund_1 (Mjölkchokladfonden)
volatility: 0.02  // Kan ändras ±2% per uppdatering
trend: 0.3        // Positiv trend, mer troligt att gå upp
basePrice: 10     // Priset tenderar att återgå till 10
```

### Fördelar:

✅ **Samma priser för alla** - Alla i familjen ser samma fondpriser
✅ **Priser sparas mellan sessioner** - Logga ut/in, priserna finns kvar
✅ **Uppdateras automatiskt** - Även när appen inte är öppen
✅ **Realistisk prisutveckling** - Priser går upp och ner över tid

### Teknisk implementation:

1. **Firebase Service** (`firebase.service.ts`)
   - `getFundPrices()` - Hämta aktuella priser
   - `updateFundPrices()` - Spara nya priser
   - `initializeFundPrices()` - Sätt upp default-priser
   - `listenToFundPrices()` - Real-time listener

2. **Fund Prices Utility** (`fundPrices.ts`)
   - `initializePrices()` - Ladda priser från Firebase
   - `updateAllPrices()` - Beräkna och spara nya priser
   - `simulatePriceChange()` - Prisberäkningsalgoritm

3. **Firebase Sync Hook** (`useFirebaseSync.ts`)
   - Lyssnar på fondpriser och uppdaterar automatiskt

### Tidslinjer:

- **Uppdateringsfrekvens**: 60 sekunder (1 minut)
- **Min tid mellan uppdateringar**: 1 minut
- **Prishistorik**: Max 100 datapunkter sparas i minnet

### Testing:

För att testa att det fungerar:

1. Öppna appen på två olika enheter/webbläsare
2. Logga in på båda
3. Öppna Investments-sidan på en enhet
4. Vänta 1 minut
5. Priserna ska uppdateras på BÅDA enheterna samtidigt

### Firebase Database-struktur:

```json
{
  "fundPrices": {
    "fund_1": {
      "basePrice": 10,
      "currentPrice": 10.15,
      "volatility": 0.02,
      "trend": 0.3,
      "lastUpdate": "2026-02-21T23:15:00.000Z"
    },
    "fund_2": { ... },
    "fund_3": { ... }
  }
}
```

### Fallback-hantering:

Om Firebase inte är tillgängligt:
1. Försök läsa från localStorage
2. Om det misslyckas, använd default-värden
3. Uppdateringar sparas endast lokalt

Detta säkerställer att appen fungerar även utan Firebase-anslutning.

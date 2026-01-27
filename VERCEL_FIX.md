# 🔧 FIX: "Deployment not found ID arn1" på mobil

## Problemet
Vercel vet inte att Next.js-appen ligger i `webapp`-mappen, så den deployer inte korrekt.

## Lösning (gör detta NU):

### 1. Gå till Vercel Dashboard
https://vercel.com/dashboard

### 2. Välj ditt Chokladpengar-projekt

### 3. Gå till Settings > General

### 4. Scrolla ner till "Build & Development Settings"

### 5. Ändra följande (VIKTIGT):

```
Framework Preset: Next.js
Root Directory: webapp          ← MÅSTE vara "webapp"!
Build Command: npm run build    (lämna default)
Output Directory: .next         (lämna default)
Install Command: npm install    (lämna default)
```

### 6. Klicka "Save"

### 7. Gå till Deployments-tabben

### 8. Klicka på den senaste deploymenten

### 9. Klicka på "..." (tre prickar) > "Redeploy"

### 10. Välj "Use existing Build Cache: NO" och klicka "Redeploy"

---

## Efter redeployment (vänta 2-3 min):

### På mobilen:

1. **Ta bort gammal PWA från hemskärmen** (om du har den)
2. **Öppna webbläsaren** (Safari/Chrome)
3. **Rensa ALL cache:**
   - iPhone: Settings > Safari > Clear History and Website Data
   - Android: Settings > Apps > Chrome > Storage > Clear data (INTE bara cache)
4. **Starta om telefonen** (allvarligt talat, gör det!)
5. **Öppna produktions-URL:en** från Vercel Dashboard > Domains

## Hitta rätt URL:

Gå till: https://vercel.com/dashboard > ditt projekt > Domains

Kopiera den URL som är markerad som **"Production"**

Det ska vara typ: `chokladpengar.vercel.app`

**INTE** någon med:
- `git-xxx`
- `arn1` 
- `preview`
- andra random bokstäver

## Om det FORTFARANDE inte fungerar:

Ta en screenshot av:
1. Vercel Dashboard > Settings > General > Build & Development Settings
2. Vercel Dashboard > Deployments > senaste deployment > Build Logs

Och visa mig dem!

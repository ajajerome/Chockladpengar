# 🍫 Chokladpengar - Lanseringsplan

**Uppdaterad:** 2026-01-28  
**Status:** Under utveckling  
**GitHub:** https://github.com/ajajerome/Chockladpengar

---

## ✅ VAD ÄR KLART (Implementerat i denna commit)

### 🔐 Säkerhet & Autentisering
- ✅ **PIN-baserad inloggning för föräldrar** - Barn kan inte längre logga in som föräldrar
- ✅ **Säker familjekod-hantering** - Familjekod används bara vid första inbjudan
- ✅ **Rollbaserad åtkomstkontroll** - Separata vyer och behörigheter för barn/föräldrar

### 💰 Ekonomiska Inställningar
- ✅ **Chokladpeng-värde** - Föräldrar kan sätta 1 chokladpeng = X kr
- ✅ **Realtidsvärdering** - Visar verkligt kronvärde på alla belöningar och uppgifter
- ✅ **Anpassade fabriker** - Föräldrar kan skapa egna fabriker med anpassade priser
- ✅ **Ekonomisk översikt** - Konvertering visas på alla ställen där pengar hanteras

### 🎨 Design & UX
- ✅ **Chokladtema** - Komplett färgpalett (mörk choklad, mjölkchoklad, nougat, guld)
- ✅ **Emoji-fri design** - Alla emojis ersatta med SVG-ikoner
- ✅ **Luftig och lekfull UI** - Moderna kort, gradienter och animationer
- ✅ **Konsekvent formspråk** - Rundade hörn, mjuka skuggor, chokladfärger

### 🎁 Belöningar & Uppgifter
- ✅ **"Butiken" istället för "Belöningar"** - Omdöpt enligt feedback
- ✅ **Köphistorik för föräldrar** - Se vad barnen har köpt
- ✅ **Radera belöningar och uppgifter** - Föräldrar kan ta bort felaktiga saker
- ✅ **Ljudeffekter** - "Cash register" ljud när barn får betalt

### 🏗️ Teknisk Grund
- ✅ **Firebase integration** - Realtidssynk mellan enheter
- ✅ **TypeScript-typning** - Utökad med nya interfaces (FamilySettings, FactoryEvent)
- ✅ **State management** - Zustand store uppdaterad
- ✅ **Factory Events System** - Grund för veckovisa händelser
- ✅ **Funds System** - Grund för fonder (Mjölkchoklad, Nougat Mix, Guldchokladgruvan)

---

## 🚧 VAD SOM ÅTERSTÅR INNAN LANSERING

### 1. 📊 Fondfunktionalitet (Högt prioritet)
**Status:** Typning klar, funktionalitet saknas

**Behöver implementeras:**
- [ ] Köp/sälj fonder med chokladpengar
- [ ] Prissimulering med historik (daglig/veckovis uppdatering)
- [ ] Visning av upp/ner-pilar och procent-förändring
- [ ] Graf över fondutveckling (likt stock-appar)
- [ ] Portföljöversikt på barnets startsida
- [ ] Automatisk beräkning av avkastning baserat på fondtyp (low/medium/high risk)

**Tekniska krav:**
- Cron-jobb eller Cloud Function för daglig prisuppdatering
- Firebase Realtime Database struktur för fondpriser
- Chart-bibliotek (t.ex. `react-native-chart-kit` eller `recharts` för webappen)

**Estimerad tid:** 8-12 timmar

---

### 2. 🏭 Fabriksfunktionalitet (Högt prioritet)
**Status:** Grund lagd, produktion och händelser saknas

**Behöver implementeras:**
- [ ] Köp fabriker (med verkliga priser från ekonomiska inställningar)
- [ ] Passiv inkomst-system (produktion per timme)
- [ ] Veckovisa slumpmässiga händelser:
  - "Fabriken behöver mer kakao - betala 20 CP"
  - "En maskin gick sönder - reparera för 30 CP"
  - "Bonusproduktion - du fick 50 extra CP!"
  - "Veckovis underhåll - 10 CP"
- [ ] Notifikationer för fabrikshändelser
- [ ] Uppgradering av fabriker (högre produktion)
- [ ] Statistik över total produktion

**Tekniska krav:**
- Scheduler för veckovisa händelser (Cloud Functions eller cron)
- Push-notifikationer (React Native Notifications / Firebase Cloud Messaging)
- Beräkning av passiv inkomst sedan senaste inloggning

**Estimerad tid:** 10-15 timmar

---

### 3. 📱 Notifikationer (Medium prioritet)
**Status:** Inte påbörjat

**Behöver implementeras:**
- [ ] Push-notifikationer för barn:
  - Ny uppgift tilldelad
  - Uppgift godkänd → betalning mottagen
  - Fabrikshändelse inträffade
  - Fondpris förändrades mycket
- [ ] Push-notifikationer för föräldrar:
  - Barn slutförde uppgift → väntar på godkännande
  - Barn köpte belöning
  - Barn köpte fabrik

**Tekniska krav:**
- Firebase Cloud Messaging (FCM) för webappen
- React Native Push Notifications för mobilappen
- Backend-logik för att skicka notifikationer vid specifika events

**Estimerad tid:** 6-8 timmar

---

### 4. 🧪 Testning (Högt prioritet)
**Status:** Ingen systematisk testning än

**Behöver testas:**
- [ ] Alla flöden för barn (registrering → uppgifter → köpa belöningar → investera → fabriker)
- [ ] Alla flöden för föräldrar (skapa familj → lägga till barn → skapa uppgifter → godkänna → ekonomiska inställningar)
- [ ] Multi-user-testning (flera barn och föräldrar samtidigt)
- [ ] Cross-device-testning (mobil + desktop)
- [ ] Offline-läge och synkronisering
- [ ] Edge cases:
  - Vad händer om barn försöker köpa något utan tillräckligt med pengar?
  - Vad händer om förälder raderar en uppgift som ett barn redan påbörjat?
  - Vad händer om nätverksanslutning försvinner mitt under en transaktion?

**Tekniska krav:**
- Automatiserade tester (Jest, React Testing Library)
- E2E-tester (Playwright eller Cypress för webappen)
- Manuell testning med riktig familj

**Estimerad tid:** 8-10 timmar

---

### 5. 📱 Mobilapp (Android/iOS) (Medium prioritet)
**Status:** React Native-kod finns i `/src`, men inte testad

**Behöver göras:**
- [ ] Testa Android-appen på riktiga enheter
- [ ] Testa iOS-appen på riktiga enheter
- [ ] Optimera prestanda för mobil
- [ ] Lägg till mobil-specifika features (haptik, native navigering)
- [ ] Google Play Store-material:
  - Screenshots (minst 2 för telefon, 2 för tablet)
  - App-ikon (512x512px)
  - Feature graphic (1024x500px)
  - Beskrivning på svenska
  - Privacy policy
- [ ] Apple App Store-material:
  - Screenshots för olika iPhone-storlekar
  - App-ikon (1024x1024px)
  - Beskrivning på svenska
  - Privacy policy

**Tekniska krav:**
- Google Play Developer Account ($25 engångsavgift)
- Apple Developer Account ($99/år)
- Code signing certificates
- Beta-testning via TestFlight (iOS) och Google Play Beta (Android)

**Estimerad tid:** 15-20 timmar + väntetid på godkännande

---

### 6. 📄 Legal & Dokumentation (Obligatoriskt)
**Status:** Inte påbörjat

**Behöver skapas:**
- [ ] **Privacy Policy (Integritetspolicy)** - Enligt GDPR
  - Vilka data samlas in (namn, ålder, familjemedlemskap, transaktioner)
  - Hur data lagras (Firebase, kryptering)
  - Hur data delas (ej delat med tredje part)
  - Rätt att radera data
  - Föräldrarnas ansvar som administratörer
- [ ] **Terms of Service (Användarvillkor)**
  - Vad appen får/inte får användas till
  - Ansvarsbegränsning
  - Abonnemangsvillkor (vid betalning)
- [ ] **Cookie Policy** - För webappen
- [ ] **Användarguide/FAQ**
  - Hur man kommer igång
  - Hur man lägger till barn
  - Hur ekonomiska inställningar fungerar
  - Hur fonder och fabriker fungerar

**Tekniska krav:**
- Hosting för policy-sidor (kan vara samma Vercel-deployment)
- Länkar till policies i appen (footer)
- Godkännande av policies vid registrering

**Verktyg:**
- [Termly](https://termly.io) - Gratis policy-generator
- [Iubenda](https://www.iubenda.com) - Professionell lösning (betalt)

**Estimerad tid:** 4-6 timmar

---

## 💳 BETALLÖSNINGAR FÖR LANSERING

För att kunna ta betalt för appen finns flera alternativ:

### Alternativ 1: **Freemium + In-App Purchase** (Rekommenderat för start)
**Modell:**
- Gratis att börja använda
- Begränsningar i gratis version:
  - Max 2 barn per familj
  - Max 10 aktiva uppgifter
  - Max 10 belöningar i butiken
  - Inga fabriker eller fonder
- **Premium-upgrade** unlåser allt:
  - Obegränsat antal barn
  - Obegränsat antal uppgifter och belöningar
  - Fonder och fabriker aktiverade
  - Prioriterad support

**Pris:**
- 49-99 kr/månad eller 499-999 kr/år
- Eller engångsköp: 299-499 kr (lifetime access)

**Teknisk implementation:**
- **För webappen:** [Stripe Checkout](https://stripe.com/se/payments/checkout)
- **För mobilappar:** [In-App Purchase (IAP)](https://developer.apple.com/in-app-purchase/) (Apple/Google tar 15-30% provision)
- **Stripe Customer Portal** för att hantera prenumerationer

**Steg för att implementera:**
1. Skapa Stripe-konto (https://stripe.com)
2. Sätt upp prenumerationsplan i Stripe Dashboard
3. Integrera Stripe Checkout i webappen
4. Implementera IAP för iOS/Android
5. Spara prenumerationsstatus i Firebase (`family.subscription: 'free' | 'premium'`)
6. Lägg till gating-logik som kontrollerar subscription innan funktioner används

**Estimerad tid:** 10-12 timmar

---

### Alternativ 2: **Abonnemang via Swish/Bankgiro** (Enklare, mer manuellt)
**Modell:**
- Samma freemium-modell som ovan
- Betalning sker via Swish eller bankgiro
- Manuell aktivering av premium (förälder skickar screenshot → du aktiverar)

**Pris:**
- 49-79 kr/månad eller 499-799 kr/år

**Teknisk implementation:**
- Enkel betalningssida med Swish-nummer och bankgiro
- Admin-panel där du kan aktivera premium för specifika familjer
- Påminnelser för att förnya abonnemang (mail eller in-app)

**Steg för att implementera:**
1. Skapa admin-panel (Firebase Admin SDK)
2. Lägg till "Uppgradera till Premium"-sida med betalningsinstruktioner
3. Implementera gating-logik
4. Skapa system för att skicka påminnelser

**Estimerad tid:** 4-6 timmar (enklare men mer manuellt arbete)

---

### Alternativ 3: **Patreon/Ko-fi** (Minsta utvecklingsarbete)
**Modell:**
- Appen är gratis att använda
- Frivillig donation via Patreon eller Ko-fi
- Supporters får "tack" i appen och tidig tillgång till nya features

**Pris:**
- Frivilligt, förslag: 29-49 kr/månad

**Teknisk implementation:**
- Länka till Patreon/Ko-fi från appen
- Ingen teknisk integration behövs

**Estimerad tid:** 1-2 timmar

---

### Rekommenderad strategi: **Hybrid-approach**

**Fas 1 (Lansering - Månad 1-3):**
- Släpp appen **helt gratis** utan begränsningar
- Samla feedback och användare
- Fixa buggar och förbättra UX
- Mål: 50-100 familjer

**Fas 2 (Tillväxt - Månad 4-6):**
- Implementera **Stripe-baserat abonnemang**
- Befintliga användare får "grandfathered" gratis access i 6 månader
- Nya användare får 30 dagars gratis provperiod
- Pris: 59 kr/månad eller 499 kr/år

**Fas 3 (Skalning - Månad 7+):**
- Lansera mobilappar på App Store och Google Play med IAP
- Marknadsföring via sociala medier, föräldragrupper, bloggar
- Potentiellt samarbete med skolor eller familjerådgivare

---

## 🛠️ TEKNISKA KRAV FÖR LANSERING

### Hosting & Infrastructure
- ✅ **Vercel** - För webappen (gratis upp till viss trafik)
- ✅ **Firebase** - Realtime Database + Authentication (gratis upp till 50k reads/dag)
- ⚠️ **Firebase Spark Plan → Blaze Plan** - Behövs för Cloud Functions (betala per användning)
  - Estimerad kostnad: 50-200 kr/månad vid 100 aktiva familjer

### Domain & Email
- [ ] Eget domännamn (ex: `chokladpengar.se`) - ~100 kr/år via [Loopia](https://www.loopia.se) eller [one.com](https://www.one.com)
- [ ] Professionell email (ex: `support@chokladpengar.se`) - Ingår ofta med domän

### Monitoring & Analytics
- [ ] **Google Analytics** eller **Plausible Analytics** - Spåra användning
- [ ] **Sentry** - Error tracking (gratis för små projekt)
- [ ] **Firebase Performance Monitoring** - Prestanda

### Support
- [ ] Support-email eller kontaktformulär
- [ ] FAQ-sida
- [ ] Feedback-system i appen

---

## 📊 ESTIMERAD TOTAL TID TILL LANSERING

| Kategori | Uppskattad tid |
|----------|----------------|
| Fondfunktionalitet | 8-12 timmar |
| Fabriksfunktionalitet | 10-15 timmar |
| Notifikationer | 6-8 timmar |
| Testning | 8-10 timmar |
| Legal & Dokumentation | 4-6 timmar |
| Betallösning (Stripe) | 10-12 timmar |
| Mobilapp-polering | 15-20 timmar |
| Marketing-material | 4-6 timmar |
| **TOTALT** | **65-89 timmar** |

**Med dedikerad utveckling:** 2-3 veckor full-time  
**Med deltid (10h/vecka):** 7-9 veckor

---

## 💰 ESTIMERADE KOSTNADER FÖR LANSERING

| Kostnad | Pris (SEK/år) | Nödvändighet |
|---------|--------------|--------------|
| Domännamn | 100-200 kr | Rekommenderat |
| Firebase Blaze Plan | 600-2400 kr | Obligatoriskt för Cloud Functions |
| Apple Developer Account | 1100 kr | Om iOS-app |
| Google Play Developer Account | 270 kr (engångsavgift) | Om Android-app |
| Stripe-avgifter | 1.4% + 1.80 kr/transaktion | Vid betalning |
| Legal review (frivilligt) | 5000-15000 kr | Valfritt |
| **Minimum (utan mobilappar)** | **700-2600 kr** | |
| **Med mobilappar** | **2070-3800 kr + löpande** | |

---

## 🎯 LANSERINGS-CHECKLISTA

### Pre-Launch (Före lansering)
- [ ] Implementera fondfunktionalitet
- [ ] Implementera fabriksfunktionalitet
- [ ] Lägg till notifikationer
- [ ] Skriv Privacy Policy och Terms of Service
- [ ] Skapa FAQ/Användarguide
- [ ] Köp domännamn
- [ ] Sätt upp professionell email
- [ ] Implementera betallösning (Stripe eller manuell)
- [ ] Genomför full testning med minst 3 familjer
- [ ] Sätt upp error tracking (Sentry)
- [ ] Sätt upp analytics (Google Analytics)

### Launch Day (Lanseringsdag)
- [ ] Annonsera i sociala medier
- [ ] Dela i föräldragrupper på Facebook
- [ ] Skicka till svenska tech-bloggar (Breakit, Ny Teknik)
- [ ] Posta på Reddit (r/sweden, r/foralder)
- [ ] Skapa Product Hunt-lansering

### Post-Launch (Efter lansering)
- [ ] Samla feedback från tidiga användare
- [ ] Fixa kritiska buggar inom 24h
- [ ] Uppdatera baserat på feedback
- [ ] Börja jobba på mobilappar (om ej redan klart)
- [ ] Planera för nästa features

---

## 📧 KONTAKT & SUPPORT

**GitHub:** https://github.com/ajajerome/Chockladpengar  
**Live App:** https://chockladpengar.vercel.app

**Utvecklare:** Aja Jerome  
**Skapad:** 2026-01-28

---

## 🎉 SLUTSATS

**Du har redan gjort enorma framsteg!** 🚀

Den största delen av grundarbetet är klart:
- ✅ Säkerhet och autentisering
- ✅ Design och UX
- ✅ Ekonomiska inställningar
- ✅ Grundläggande funktionalitet

**Vad som återstår är främst:**
1. Slutföra fond- och fabriksfunktionalitet (~20-30h)
2. Polera och testa (~10-15h)
3. Legal och betalning (~15-20h)

Med **45-65 timmars arbete till** kan du ha en fullt fungerande, lanserklar app med betallösning! 🍫

**Rekommenderad nästa steg:**
1. Slutför fondfunktionalitet först (mest efterfrågat)
2. Lägg till fabriksfunktionalitet
3. Beta-testa med 5-10 familjer
4. Implementera Stripe-betalning
5. Lansera! 🎊








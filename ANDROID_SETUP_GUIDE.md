# 📱 Android Setup Guide - Chokladpengar

## Snabbguide för att testa appen på Android

### Förutsättningar
- Windows PC
- 8 GB RAM minimum
- 10 GB ledigt diskutrymme

---

## 📥 Steg 1: Installera Android Studio

### Ladda Ner
1. Gå till: https://developer.android.com/studio
2. Klicka "Download Android Studio"
3. Acceptera villkoren
4. Spara filen (ca 1 GB)

### Installera
1. Kör den nedladdade .exe-filen
2. Välj "Next" genom installationsguiden
3. Välj "Standard" installation
4. Välj installation location (standard är OK)
5. Klicka "Install"
6. När klar, klicka "Finish" och starta Android Studio

### Första Start
Android Studio kommer att:
- Ladda ner Android SDK (tar 10-20 minuter)
- Ladda ner Android Emulator
- Ladda ner Build Tools
- Installera Platform Tools

**Var tålmodig - detta är en engångsprocess!**

---

## 🔧 Steg 2: Konfigurera Environment Variables

Detta behövs för att React Native ska hitta Android SDK.

### Windows:
1. Tryck `Windows + R`
2. Skriv: `sysdm.cpl` och tryck Enter
3. Gå till fliken "Advanced" → "Environment Variables"
4. Under "System variables", klicka "New"
5. Skapa variabel:
   - Namn: `ANDROID_HOME`
   - Värde: `C:\Users\DittAnvändarnamn\AppData\Local\Android\Sdk`
   - *(Byt "DittAnvändarnamn" till ditt Windows-användarnamn)*

6. Hitta "Path" under "System variables", klicka "Edit"
7. Klicka "New" och lägg till dessa tre rader:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   ```
8. Klicka OK på allt
9. **VIKTIGT: Starta om alla terminaler/PowerShell-fönster**

### Verifiera Installation
Öppna ny PowerShell och kör:
```bash
adb --version
```

Om du ser en version = Allt fungerar! ✅

---

## 📱 Steg 3: Skapa Android Virtual Device (AVD)

### I Android Studio:
1. På välkomstskärmen, klicka de tre prickarna (⋮) "More Actions"
2. Välj "Virtual Device Manager" (eller "AVD Manager")
3. Klicka "+ Create Virtual Device"
4. Välj en telefon:
   - **Phone** → **Pixel 5** (rekommenderat)
   - Klicka "Next"
5. Välj System Image:
   - Välj **"Tiramisu"** (API Level 33) eller nyare
   - Om inte nedladdad, klicka "Download" bredvid den
   - Vänta på nedladdningen (5-10 min)
   - Klicka "Next"
6. AVD Name: `Chokladpengar_Test` (eller vad du vill)
7. Inställningar (kan lämnas som standard):
   - Startup orientation: Portrait
   - Emulated Performance: Hardware - GLES 2.0
8. Klicka "Finish"

---

## 🚀 Steg 4: Starta Emulatorn

### I Android Studio:
1. Virtual Device Manager
2. Hitta din skapade enhet
3. Tryck på ▶️ (Play-knappen)
4. Vänta 1-2 minuter tills Android startat
5. Du ser Android-hemskärmen = Klar!

**Tips:** Låt emulatorn fortsätta köra när du utvecklar!

---

## 🎮 Steg 5: Kör Chokladpengar-appen

### Terminal 1: Metro Bundler (om inte redan igång)
```bash
cd C:\Users\jerom\Documents\Chokladpengar
npm start
```

### Terminal 2: Bygg och Kör Android-appen
Öppna NY PowerShell:
```bash
cd C:\Users\jerom\Documents\Chokladpengar
npm run android
```

**ELLER** i Metro-terminalen, tryck bara: `a`

### Vad händer nu:
1. Gradle bygger appen (2-5 min första gången)
2. Installerar APK på emulatorn
3. Startar appen automatiskt
4. 🎉 Chokladpengar öppnas i emulatorn!

---

## 🎯 Använda Emulatorn

### Styrning:
- **Vänsterklick** = Touch/Tap
- **Dra med musen** = Swipe
- **Scroll-hjul** = Scrolla
- **Högerklick + drag** = Zoom/Pan

### Knappar (höger sida av emulatorn):
- ⚡ Power (on/off)
- 🔊 Volume up/down
- 🔄 Rotate screen
- ⬅️ Back button
- 🏠 Home button
- ▢ Recent apps

### Tangentbordsgenvägar:
- **Ctrl + M** = Developer Menu
- **R + R** (dubbel R i Metro) = Reload app
- **Ctrl + K** = Toggle keyboard

---

## 🔥 Hot Reload

När du ändrar kod i appen:

### Automatisk Reload (Fast Refresh):
- Spara filen
- Appen uppdateras automatiskt inom 1-2 sekunder

### Manuell Reload:
```
Metod 1: I Metro-terminalen, tryck 'r'
Metod 2: I emulatorn, tryck Ctrl+M → välj "Reload"
Metod 3: Dubbel R (R+R) i terminalen
```

---

## 🐛 Felsökning

### Problem 1: "adb command not found"
**Lösning:**
- Verifiera att ANDROID_HOME är satt korrekt
- Starta om terminalen
- Kör: `echo %ANDROID_HOME%` (ska visa SDK-sökvägen)

### Problem 2: "No connected devices"
**Lösning:**
```bash
# Kolla anslutna enheter:
adb devices

# Om tom, starta emulatorn igen via Android Studio
```

### Problem 3: Build-fel
**Lösning:**
```bash
# Rensa build cache:
cd android
gradlew clean
cd ..
npm run android
```

### Problem 4: Metro-fel
**Lösning:**
```bash
# Stoppa Metro (Ctrl+C)
# Rensa cache och starta om:
npm start -- --reset-cache
```

### Problem 5: Emulator är långsam
**Lösning:**
- Stäng andra tunga program
- I Virtual Device Manager → Edit enhet → Graphics: Hardware - GLES 2.0
- Öka RAM för emulatorn (Actions → Edit → Advanced → RAM: 2048 MB)

### Problem 6: "SDK location not found"
**Lösning:**
Skapa `android/local.properties`:
```
sdk.dir=C:\\Users\\jerom\\AppData\\Local\\Android\\Sdk
```
*(Använd dubbla backslashes \\)*

---

## ✅ Checklist: Är du redo?

- [ ] Android Studio installerat
- [ ] SDK components nedladdade
- [ ] ANDROID_HOME environment variable satt
- [ ] PATH uppdaterad med platform-tools
- [ ] `adb --version` fungerar
- [ ] Virtual Device skapad
- [ ] Emulator startar utan problem
- [ ] Metro bundler körs (`npm start`)
- [ ] `npm run android` fungerar
- [ ] Appen öppnas i emulatorn

---

## 🎉 Nästa Steg

När appen körs i emulatorn:

1. **Skapa familj**
   - Tryck "Skapa ny familj"
   - Fyll i namn
   
2. **Lägg till barn**
   - Lägg till testbarn
   
3. **Skapa uppgifter**
   - Logga in som förälder
   - Skapa några testuppgifter
   
4. **Testa barnvy**
   - Logga ut
   - Logga in som barn
   - Slutför uppgifter
   
5. **Testa godkännande**
   - Logga in som förälder igen
   - Godkänn uppgifter
   
6. **Testa belöningar**
   - Skapa belöningar
   - Låt barnet köpa

---

## 📱 Testa på Riktig Telefon (Senare)

När emulatorn fungerar, kan du testa på riktig Android-telefon:

1. Aktivera Developer Mode:
   - Inställningar → Om telefon
   - Tryck 7 gånger på "Byggnummer"
   
2. Aktivera USB Debugging:
   - Inställningar → Utvecklaralternativ
   - Slå på "USB-felsökning"
   
3. Anslut med USB-kabel

4. Godkänn USB debugging på telefonen

5. Kör: `npm run android`

Appen installeras på din riktiga telefon! 🎉

---

## 🆘 Behöver Hjälp?

Om något inte fungerar:
1. Läs felmeddelandet noga
2. Googla felmeddelandet
3. Kontrollera att alla steg följts
4. Starta om datorn (ibland hjälper det!)
5. Fråga i React Native Discord/Forum

---

## 📚 Användbara Kommandon

```bash
# Visa anslutna enheter
adb devices

# Starta Metro bundler
npm start

# Bygg och kör Android
npm run android

# Rensa Metro cache
npm start -- --reset-cache

# Rensa Android build
cd android && gradlew clean && cd ..

# Avinstallera app från emulator
adb uninstall com.chokladpengar

# Visa loggar
npx react-native log-android

# Öppna Developer Menu
adb shell input keyevent 82
```

---

**Lycka till med testningen! 🍫📱**


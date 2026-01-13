# 🍫 Chokladpengar - Installationsguide

## Steg-för-steg installation

### 1. Förutsättningar

Innan du börjar, se till att du har följande installerat:

#### För alla plattformar:
- **Node.js** (version 18 eller senare)
  - Ladda ner från: https://nodejs.org/
  - Verifiera: `node --version`

- **npm** eller **yarn**
  - Kommer med Node.js
  - Verifiera: `npm --version`

#### För iOS-utveckling (endast Mac):
- **Xcode** (senaste versionen från App Store)
- **CocoaPods**
  ```bash
  sudo gem install cocoapods
  ```

#### För Android-utveckling:
- **Android Studio**
  - Ladda ner från: https://developer.android.com/studio
  - Installera Android SDK (API level 31 eller senare)
  - Konfigurera ANDROID_HOME miljövariabel

- **JDK** (Java Development Kit 11 eller senare)

### 2. Installera projektet

```bash
# Gå till projektmappen
cd chokladpengar

# Installera alla npm-paket
npm install
```

### 3. Plattformsspecifik setup

#### För iOS:

```bash
# Gå till ios-mappen och installera pods
cd ios
pod install
cd ..
```

#### För Android:

Ingen ytterligare setup behövs. Android Studio kommer att ladda ner nödvändiga komponenter automatiskt.

### 4. Starta appen

#### Starta Metro Bundler:
```bash
npm start
```

#### I en ny terminal, starta appen:

För iOS (endast Mac):
```bash
npm run ios
```

För Android:
```bash
npm run android
```

## Felsökning

### Problem: "command not found: react-native"

**Lösning:**
```bash
npm install -g react-native-cli
```

### Problem: "Unable to boot simulator" (iOS)

**Lösning:**
1. Öppna Xcode
2. Gå till Xcode > Preferences > Locations
3. Se till att Command Line Tools är valt
4. Öppna Simulator-appen separat

### Problem: Metro bundler port konflikt

**Lösning:**
```bash
# Döda processen på port 8081
npx react-native start --reset-cache
```

### Problem: Android build misslyckas

**Lösning:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Problem: iOS build misslyckas

**Lösning:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

## Rensa cache

Om du stöter på konstiga problem, prova att rensa alla cacher:

```bash
# Rensa npm cache
npm cache clean --force

# Rensa Metro bundler cache
npm start -- --reset-cache

# För iOS, rensa build
cd ios
rm -rf build
pod cache clean --all
cd ..

# För Android, rensa build
cd android
./gradlew clean
cd ..
```

## Körning på fysisk enhet

### iOS:
1. Anslut din iPhone via USB
2. Öppna `ios/Chokladpengar.xcworkspace` i Xcode
3. Välj din enhet i device dropdown
4. Tryck på Run-knappen

### Android:
1. Aktivera Developer Mode på din Android-enhet
2. Aktivera USB Debugging
3. Anslut via USB
4. Verifiera med: `adb devices`
5. Kör: `npm run android`

## Produktionsbygge

### iOS:
```bash
# Öppna Xcode
open ios/Chokladpengar.xcworkspace

# Välj Generic iOS Device
# Product > Archive
# Följ instruktionerna för App Store submission
```

### Android:
```bash
cd android
./gradlew assembleRelease

# APK finns i: android/app/build/outputs/apk/release/
```

## Ytterligare resurser

- React Native dokumentation: https://reactnative.dev/docs/getting-started
- Troubleshooting guide: https://reactnative.dev/docs/troubleshooting
- React Navigation: https://reactnavigation.org/

## Support

Om du fortsätter ha problem:
1. Kontrollera att alla förutsättningar är korrekt installerade
2. Se till att du använder rätt versioner
3. Läs felmeddelanden noggrant
4. Sök efter felmeddelandet online (ofta finns lösningar på Stack Overflow)

---

Lycka till med utvecklingen! 🍫


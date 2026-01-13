# Changelog

Alla noterbara ändringar i detta projekt dokumenteras i denna fil.

Formatet baseras på [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
och detta projekt följer [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-13

### 🎉 Initial Release

#### Tillagt
- **Användarhantering**
  - Inloggning för förälder och barn
  - Familjebaserad struktur
  - Profilsystem

- **Uppgiftssystem**
  - Skapa uppgifter med poäng och deadline
  - Markera uppgifter som klara
  - Godkännande/nekande av uppgifter
  - Återkommande uppgifter support

- **Chokladpengar (Valuta)**
  - Custom chokladmynt-komponent
  - Realtidssaldo
  - Transaktionshistorik
  - Animationer vid överföring

- **Belöningsbutik (Chokladkassan)**
  - Skapa belöningar i 3 kategorier (Aktivitet, Privilegium, Sak)
  - Köpfunktion för barn
  - Köphistorik
  - "Inte råd"-indikator

- **Investeringssystem (Chokladfonder)**
  - 3 fonder med olika risknivåer:
    - Mjölkchokladfonden (Låg risk)
    - Nougatmixen (Mellanrisk)
    - Guldchokladgruvan (Hög risk)
  - Veckovis avkastningsberäkning
  - Grafer med historisk utveckling
  - Ta ut pengar-funktion

- **Chokladfabriken**
  - 6 byggsteg:
    1. Grund
    2. Maskiner
    3. Formstation
    4. Pralinlinje
    5. Skylt
    6. Grand Opening
  - Progressbar
  - Veckovis produktion (1 chokladpeng)
  - Automatisk inkomst

- **Notifikationssystem**
  - Notiser vid ny uppgift
  - Notiser vid godkännande
  - Notiser vid fabriksproduktion
  - Notiser vid investeringsuppdatering

- **18 Custom Ikoner**
  - ChocolateCoinIcon
  - TreasureChestIcon
  - BarChartIcon
  - FactoryIcon
  - CheckboxIcon (med states)
  - GiftIcon
  - ProfileIcon
  - ApproveIcon
  - RejectIcon
  - EditIcon
  - PlusIcon
  - SettingsIcon
  - ClockIcon
  - DashboardIcon
  - LockIcon
  - ArrowIcon
  - NotificationIcon
  - HomeIcon

- **UI/UX**
  - Chokladigt färgtema
  - Rundade hörn och mjuka former
  - Animationer och transitions
  - Responsiv design
  - Touch-friendly interface

- **Navigation**
  - Bottom tabs för barn (4 tabs)
  - Bottom tabs för förälder (1 tab)
  - Stack navigation för detaljvyer
  - Ikoner i tabs (inga emojis)

- **State Management**
  - Zustand för global state
  - AsyncStorage för persistence
  - Automatic save/load

- **Skärmar**
  - **Auth**: LoginScreen
  - **Child (4)**:
    - ChildHomeScreen
    - RewardShopScreen
    - InvestmentsScreen
    - FactoryScreen
  - **Parent (5)**:
    - ParentHomeScreen
    - CreateTaskScreen
    - CreateRewardScreen
    - ManageTasksScreen
    - ChildDetailsScreen

- **Dokumentation**
  - README.md - Projektöversikt
  - INSTALLATION.md - Installationsguide
  - DESIGN_SPECIFICATION.md - Designprinciper
  - ICONS_DOCUMENTATION.md - Ikonguide
  - CONTRIBUTING.md - Bidragsguide
  - CHANGELOG.md - Versionshistorik

#### Teknisk Stack
- React Native 0.73.2
- TypeScript 5.3.3
- Zustand 4.4.7
- React Navigation 6.1.9
- AsyncStorage 1.21.0
- React Native Chart Kit 6.12.0
- date-fns 2.30.0

#### Design
- Inga emojis - alla ikoner byggda från grunden
- Chokladiga färgtoner (#6B4423, #D4AF37, etc)
- Rundade hörn (8-12px)
- Fyllda silhuetter
- Subtila skuggor och glans
- Konsistent spacing och typography

---

## [Kommande versioner]

### [1.1.0] - Planerad

#### Planerat
- [ ] Push notifications implementation
- [ ] Automatiska återkommande uppgifter
- [ ] Fabriksuppgraderingar
- [ ] Detaljerad statistik
- [ ] Data export-funktion
- [ ] Mörkt läge

### [1.2.0] - Framtid

#### Under utvärdering
- [ ] Stöd för flera barn per familj
- [ ] Custom avatarer för profiler
- [ ] Achievement system
- [ ] Sparmål-funktion
- [ ] Familjekalender
- [ ] Widget för iOS/Android

---

**Format**: [version] - datum

**Kategorier**:
- `Tillagt` - Nya funktioner
- `Ändrat` - Förändringar i befintlig funktionalitet
- `Deprecated` - Snart borttagen funktionalitet
- `Borttaget` - Borttagen funktionalitet
- `Fixat` - Buggfixar
- `Säkerhet` - Säkerhetsuppdateringar


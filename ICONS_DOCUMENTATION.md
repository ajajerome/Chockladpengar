# 🍫 Chokladpengar - Ikonografi Dokumentation

## Översikt

Alla ikoner i Chokladpengar är byggda från grunden med React Native komponenter. Inga emojis eller externa ikonbibliotek används. Varje ikon följer en strikt designprincip för att skapa en sammanhängande, chokladig känsla.

## Designprinciper

### Visuella Principer
- **Rundade hörn**: 8-12px känsla (använder borderRadius)
- **Fyllda silhuetter**: Inga outlines
- **Chokladiga toner**: Primära färger från palett
- **Subtil 3D-effekt**: Skuggor och glans
- **Konsistens**: Samma stil genom hela appen

### Teknisk Implementation
- Byggda med `<View>` komponenter
- Använder absolut positionering för lagring
- Skalbar `size` prop (default 24px)
- Dynamiska färger via props
- Shadow effects med `shadowColor`, `shadowOffset`, etc.

## Ikonbibliotek

### Navigation Ikoner

#### HomeIcon
- **Beskrivning**: Ett hus med tak och dörr
- **Användning**: Navigation home/hem
- **Storlek**: 24px (default)
- **Props**: `size`, `color`
- **Fil**: `src/components/icons/HomeIcon.tsx`

```typescript
<HomeIcon size={24} color={colors.primary} />
```

#### TreasureChestIcon
- **Beskrivning**: Skattkista med lock och chokladmynt
- **Användning**: Belöningsbutik (Chokladkassan)
- **Storlek**: 32px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/TreasureChestIcon.tsx`

```typescript
<TreasureChestIcon size={32} />
```

#### BarChartIcon
- **Beskrivning**: Tre staplar i chokladtoner
- **Användning**: Investeringar/Fonder
- **Storlek**: 32px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/BarChartIcon.tsx`

```typescript
<BarChartIcon size={32} />
```

#### FactoryIcon
- **Beskrivning**: Fabrik med skorsten och chokladdroppar
- **Användning**: Chokladfabriken
- **Storlek**: 32px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/FactoryIcon.tsx`

```typescript
<FactoryIcon size={32} />
```

### Interaktions Ikoner

#### ChocolateCoinIcon
- **Beskrivning**: Runt chokladmynt med glans
- **Användning**: Valuta visning
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/ChocolateCoinIcon.tsx`

```typescript
<ChocolateCoinIcon size={24} />
```

#### CheckboxIcon
- **Beskrivning**: Checkbox med olika states
- **Användning**: Uppgifter
- **Storlek**: 24px (default)
- **Props**: `size`, `checked`, `status`
- **States**: pending, approved, rejected
- **Fil**: `src/components/icons/CheckboxIcon.tsx`

```typescript
<CheckboxIcon size={24} checked={true} status="approved" />
```

#### ApproveIcon
- **Beskrivning**: Grön check i chokladform
- **Användning**: Godkänn-knappar
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/ApproveIcon.tsx`

```typescript
<ApproveIcon size={24} />
```

#### RejectIcon
- **Beskrivning**: Rött kryss i chokladform
- **Användning**: Neka-knappar
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/RejectIcon.tsx`

```typescript
<RejectIcon size={24} />
```

### Funktionella Ikoner

#### GiftIcon
- **Beskrivning**: Present med chokladband
- **Användning**: Belöningar
- **Storlek**: 32px (default)
- **Props**: `size`, `withPlus`
- **Fil**: `src/components/icons/GiftIcon.tsx`

```typescript
<GiftIcon size={32} withPlus={true} />
```

#### ProfileIcon
- **Beskrivning**: Silhuett i chokladton
- **Användning**: Användarprofiler
- **Storlek**: 32px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/ProfileIcon.tsx`

```typescript
<ProfileIcon size={32} />
```

#### PlusIcon
- **Beskrivning**: Plus-symbol
- **Användning**: Skapa nya items
- **Storlek**: 24px (default)
- **Props**: `size`, `color`
- **Fil**: `src/components/icons/PlusIcon.tsx`

```typescript
<PlusIcon size={24} color={colors.secondary} />
```

#### EditIcon
- **Beskrivning**: Penna i chokladguld
- **Användning**: Redigera-knappar
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/EditIcon.tsx`

```typescript
<EditIcon size={24} />
```

### Status & Utility Ikoner

#### LockIcon
- **Beskrivning**: Hänglås med nyckel hål
- **Användning**: Låsta funktioner
- **Storlek**: 24px (default)
- **Props**: `size`, `locked`
- **Fil**: `src/components/icons/LockIcon.tsx`

```typescript
<LockIcon size={24} locked={true} />
```

#### ArrowIcon
- **Beskrivning**: Pil med riktning
- **Användning**: Navigation, dropdowns
- **Storlek**: 24px (default)
- **Props**: `size`, `direction`, `color`
- **Direction**: up, down, left, right
- **Fil**: `src/components/icons/ArrowIcon.tsx`

```typescript
<ArrowIcon size={24} direction="right" color={colors.primary} />
```

#### NotificationIcon
- **Beskrivning**: Klocka med badge
- **Användning**: Notifikationer
- **Storlek**: 24px (default)
- **Props**: `size`, `hasNotification`
- **Fil**: `src/components/icons/NotificationIcon.tsx`

```typescript
<NotificationIcon size={24} hasNotification={true} />
```

#### ClockIcon
- **Beskrivning**: Klocka med visare
- **Användning**: Tid/väntan
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/ClockIcon.tsx`

```typescript
<ClockIcon size={24} />
```

#### SettingsIcon
- **Beskrivning**: Kugghjul
- **Användning**: Inställningar
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/SettingsIcon.tsx`

```typescript
<SettingsIcon size={24} />
```

#### DashboardIcon
- **Beskrivning**: Fyra rutor
- **Användning**: Dashboard/översikt
- **Storlek**: 24px (default)
- **Props**: `size`
- **Fil**: `src/components/icons/DashboardIcon.tsx`

```typescript
<DashboardIcon size={24} />
```

## Färgschema

### Primära Chokladfärger
```typescript
{
  primary: '#6B4423',        // Mörk choklad
  primaryLight: '#8B5A3C',   // Mjölkchoklad
  primaryDark: '#4A2C1A',    // Mycket mörk choklad
  secondary: '#D4AF37',      // Guld
  secondaryLight: '#F4CF57', // Ljusguld
  chocolate: '#8B4513',      // Chokladbrun
  chocolateLight: '#A0522D', // Ljus choklad
  factory: '#795548',        // Fabriksbrun
}
```

### Risknivå Färger (Fonder)
```typescript
{
  fundLow: '#8B4513',        // Mjölkchoklad
  fundMedium: '#D2691E',     // Karamell
  fundHigh: '#FFD700',       // Guld
}
```

### Status Färger
```typescript
{
  success: '#4CAF50',        // Grön
  error: '#F44336',          // Röd
  warning: '#FF9800',        // Orange
  info: '#2196F3',           // Blå
}
```

## Användningsexempel

### I Navigation Tabs
```typescript
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarIcon: ({ color, focused }) => (
      <HomeIcon size={24} color={color} />
    ),
  }}
/>
```

### I Listor
```typescript
<View style={styles.listItem}>
  <TreasureChestIcon size={32} />
  <Text>Chokladkassan</Text>
</View>
```

### Med Status
```typescript
<CheckboxIcon 
  size={24} 
  checked={task.completed} 
  status={task.status} 
/>
```

### Dynamisk Färg
```typescript
<ArrowIcon 
  size={20} 
  direction="right" 
  color={isActive ? colors.primary : colors.textMuted} 
/>
```

## Best Practices

### Storlekar
- **Navigation tabs**: 24px
- **Listor**: 32px
- **Stora knappar**: 40-48px
- **Hero sections**: 64-80px

### Färger
- Använd `color` prop för dynamiska färger
- Håll dig till paletten för konsistens
- Använd opacity för disabled states

### Performance
- Ikoner är optimerade med minimal nesting
- Använd `memo()` för listor med många ikoner
- Undvik inline style-objekt

### Accessibility
- Inkludera `accessibilityLabel` vid användning
- Ge tillräcklig kontrast
- Minimum touch target: 44x44px

## Lägg Till Ny Ikon

### Template
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface MyIconProps {
  size?: number;
}

export const MyIcon: React.FC<MyIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Din ikon-design här */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Lägg till fler styles
});
```

### Checklist
- [ ] Följer chokladiga designprinciper
- [ ] Skalbar med `size` prop
- [ ] Rundade hörn (borderRadius)
- [ ] Skuggor för 3D-effekt
- [ ] Exporterad i `icons/index.ts`
- [ ] Dokumenterad här
- [ ] Testad i olika storlekar

---

**Senast uppdaterad**: 2026-01-13
**Version**: 1.0.0
**Totalt antal ikoner**: 18


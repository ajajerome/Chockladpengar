# Firebase Realtime Database - Index Setup

## Problem
Firebase Realtime Database kräver att vi definierar indexar för att kunna göra effektiva queries med `orderByChild()`.

## Fel du ser
```
Index not defined, add ".indexOn": "childId", for path "/investments", to the rules
```

## Lösning: Lägg till indexar i Firebase Console

### Steg 1: Öppna Firebase Console
1. Gå till https://console.firebase.google.com
2. Välj ditt projekt "Chokladpengar"
3. Gå till **Realtime Database** i vänstermenyn
4. Klicka på fliken **Rules**

### Steg 2: Uppdatera reglerna med indexar

Ersätt dina nuvarande regler med denna version som inkluderar alla nödvändiga indexar:

```json
{
  "rules": {
    "families": {
      ".read": true,
      ".write": true,
      ".indexOn": ["code"]
    },
    "users": {
      ".read": true,
      ".write": true,
      ".indexOn": ["familyId"]
    },
    "tasks": {
      ".read": true,
      ".write": true,
      ".indexOn": ["familyId", "assignedTo"]
    },
    "rewards": {
      ".read": true,
      ".write": true,
      ".indexOn": ["familyId"]
    },
    "transactions": {
      ".read": true,
      ".write": true,
      ".indexOn": ["userId"]
    },
    "investments": {
      ".read": true,
      ".write": true,
      ".indexOn": ["childId"]
    },
    "ownedFactories": {
      ".read": true,
      ".write": true,
      ".indexOn": ["childId"]
    },
    "purchasedRewards": {
      ".read": true,
      ".write": true,
      ".indexOn": ["childId"]
    }
  }
}
```

### Steg 3: Publicera
1. Klicka på **Publish** längst upp till höger
2. Vänta några sekunder för att ändringarna ska träda i kraft

### Steg 4: Testa
1. Ladda om din Vercel-app
2. Logga in igen
3. Felet ska nu vara borta och all data ska laddas korrekt! ✅

## Vad gör indexarna?

Indexar låter Firebase snabbt hitta data baserat på specifika fält:

- **families** → `code`: Hitta familj via familjekod
- **users** → `familyId`: Hitta alla användare i en familj
- **tasks** → `familyId`: Hitta alla uppgifter för en familj
- **rewards** → `familyId`: Hitta alla belöningar för en familj
- **transactions** → `userId`: Hitta alla transaktioner för en användare
- **investments** → `childId`: Hitta alla investeringar för ett barn
- **ownedFactories** → `childId`: Hitta alla fabriker för ett barn
- **purchasedRewards** → `childId`: Hitta alla köpta belöningar för ett barn

## Viktigt!
**OBS**: Dessa regler är öppna (`.read: true`, `.write: true`) och är **endast för utveckling**. 
Innan du lanserar appen publikt, bör du skärpa säkerheten så att användare bara kan läsa/skriva sin egen familjs data.

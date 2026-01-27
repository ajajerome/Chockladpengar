# 🔥 Firebase Index Fix

## Problemet

Felmeddelande: **"index not defined add indexOn code for path /families to the rules"**

Detta händer när du försöker logga in med familjekod. Firebase behöver ett index för att söka effektivt på `code`-fältet.

## ✅ Lösning

### Metod 1: Via Firebase Console (Rekommenderat)

1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Välj ditt projekt
3. Klicka på **Realtime Database** i vänster menyn
4. Gå till **Rules**-tabben
5. Ersätt hela innehållet med:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "families": {
      ".indexOn": ["code"]
    },
    "users": {
      ".indexOn": ["familyId"]
    },
    "tasks": {
      ".indexOn": ["familyId"]
    },
    "rewards": {
      ".indexOn": ["familyId"]
    },
    "transactions": {
      ".indexOn": ["userId"]
    }
  }
}
```

6. Klicka **"Publish"**
7. Vänta 10-30 sekunder för att reglerna ska uppdateras
8. **Testa igen!** Logga in med familjekoden

---

### Metod 2: Via Firebase CLI

Om du har Firebase CLI installerat:

```bash
# I webapp-mappen
firebase deploy --only database
```

Detta deployer `firebase-database.rules.json` automatiskt.

---

## ⚠️ Viktigt om Säkerhet

Nuvarande rules (`".read": true, ".write": true`) är **OSÄKRA** för produktion!

Detta är OK för:
- ✅ Testning
- ✅ Utveckling
- ✅ Familjeapp med betrodd användare

För produktion bör du använda:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "families": {
      ".indexOn": ["code"],
      "$familyId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "users": {
      ".indexOn": ["familyId"],
      "$userId": {
        ".read": "auth != null",
        ".write": "auth != null || auth.uid == $userId"
      }
    },
    "tasks": {
      ".indexOn": ["familyId"],
      "$taskId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "rewards": {
      ".indexOn": ["familyId"],
      "$rewardId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "transactions": {
      ".indexOn": ["userId"],
      "$transactionId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

Men detta kräver att du implementerar Firebase Authentication först.

---

## 🧪 Verifiera att det fungerar

1. Skapa en familj på datorn
2. Kopiera familjekoden
3. På mobilen: Logga in med koden
4. Ingen "index not defined"-fel! ✅

---

## 💡 Varför behövs index?

Firebase Realtime Database kräver index för queries som söker på specifika fält (som `code`). 

Utan index:
- ❌ Firebase måste scanna ALLA familjer (långsamt)
- ❌ Query misslyckas med fel

Med index:
- ✅ Firebase kan snabbt hitta familj med rätt kod
- ✅ Sökning fungerar perfekt

---

## 🆘 Om det fortfarande inte fungerar

1. Kontrollera att rules är publicerade i Firebase Console
2. Vänta 30 sekunder (cache kan ta tid)
3. Rensa browser cache
4. Försök igen

Om det FORTFARANDE inte fungerar:
- Kontrollera att Firebase URL är korrekt i `.env.local`
- Kolla Firebase Console → Database → Data för att se om data sparas

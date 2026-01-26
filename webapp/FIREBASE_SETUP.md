# Firebase Configuration

## Setup Firebase

1. Gå till [Firebase Console](https://console.firebase.google.com/)
2. Skapa ett nytt projekt eller använd befintligt
3. Aktivera **Realtime Database**:
   - Gå till "Build" → "Realtime Database"
   - Klicka "Create Database"
   - Välj location (Europe)
   - Starta i **test mode** (vi fixar säkerhet senare)

4. Hämta Firebase config:
   - Gå till Project Settings (kugghjulet)
   - Under "Your apps", välj "Web" (</> ikon)
   - Kopiera `firebaseConfig` objektet

5. Skapa `.env.local` i `webapp/` mappen:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Realtime Database Security Rules

Gå till Realtime Database → Rules och ersätt med:

```json
{
  "rules": {
    "families": {
      "$familyId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "users": {
      "$userId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "tasks": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["familyId", "assignedTo", "status"]
    },
    "rewards": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["familyId"]
    },
    "investments": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["userId"]
    },
    "factories": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["userId"]
    },
    "transactions": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["userId"]
    },
    "notifications": {
      ".read": "auth != null",
      ".write": "auth != null",
      ".indexOn": ["userId", "isRead"]
    }
  }
}
```

## Cloud Functions (För automatisk uppdatering av fonder)

1. Installera Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Logga in:
```bash
firebase login
```

3. Initiera Functions:
```bash
cd webapp
firebase init functions
```

4. Skapa function för veckovis uppdatering (onsdagar & lördagar kl 08:00)





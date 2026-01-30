import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';

// Rensa värden som Vercel eller andra verktyg lagt citattecken/komma på
function cleanEnv(val: string | undefined): string | undefined {
  if (val == null || val === '') return undefined;
  return val.replace(/^["']|["'],?\s*$/g, '').trim() || undefined;
}

// Helper to check if Firebase is configured (must match isFirebaseConfigured below)
function hasValidFirebaseConfig() {
  return !!(
    cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) &&
    cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL) &&
    cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
  );
}

// Initialize Firebase lazily – endast när env-variabler finns (undviker krasch på t.ex. Vercel utan vars)
let app: FirebaseApp | undefined;
let database: Database | undefined;
let auth: Auth | undefined;
let initError: string | undefined;

function initializeFirebase() {
  if (typeof window === 'undefined') return;
  if (!hasValidFirebaseConfig()) {
    initError = 'Firebase är inte konfigurerat. Kontrollera att alla NEXT_PUBLIC_FIREBASE_* variabler är satta i .env.local';
    console.error(initError);
    return;
  }
  if (app) return;

  try {
    const firebaseConfig = {
      apiKey: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      authDomain: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
      databaseURL: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL),
      projectId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
      storageBucket: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
      messagingSenderId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      appId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    };

    console.log('🔥 Initierar Firebase...', {
      projectId: firebaseConfig.projectId,
      databaseURL: firebaseConfig.databaseURL,
    });

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps()[0] as FirebaseApp);
    database = getDatabase(app);
    auth = getAuth(app);
    
    console.log('✅ Firebase initierat!');
  } catch (error) {
    initError = `Firebase-initiering misslyckades: ${error instanceof Error ? error.message : 'Okänt fel'}`;
    console.error('❌', initError, error);
  }
}

// Initiera endast i webbläsare och när config finns
if (typeof window !== 'undefined') {
  initializeFirebase();
}

export { app, database, auth, initError };

// Helper to check if Firebase is configured (används t.ex. för att välja Firebase vs lokal mode)
export const isFirebaseConfigured = () => hasValidFirebaseConfig();

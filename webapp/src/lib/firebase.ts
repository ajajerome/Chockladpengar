import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';

// Helper to check if Firebase is configured (must match isFirebaseConfigured below)
function hasValidFirebaseConfig() {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

// Initialize Firebase lazily – endast när env-variabler finns (undviker krasch på t.ex. Vercel utan vars)
let app: FirebaseApp | undefined;
let database: Database | undefined;
let auth: Auth | undefined;

function initializeFirebase() {
  if (typeof window === 'undefined') return;
  if (!hasValidFirebaseConfig()) return;
  if (app) return;

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  app = getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps()[0] as FirebaseApp);
  database = getDatabase(app);
  auth = getAuth(app);
}

// Initiera endast i webbläsare och när config finns
if (typeof window !== 'undefined') {
  initializeFirebase();
}

export { app, database, auth };

// Helper to check if Firebase is configured (används t.ex. för att välja Firebase vs lokal mode)
export const isFirebaseConfigured = () => hasValidFirebaseConfig();

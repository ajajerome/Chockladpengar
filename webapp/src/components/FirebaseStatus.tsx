'use client';

import { useEffect, useState } from 'react';
import { isFirebaseConfigured, initError } from '@/lib/firebase';

export function FirebaseStatus() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vänta lite så Firebase hinner initieras
    const timer = setTimeout(() => {
      if (initError) {
        setStatus('error');
        setError(initError);
      } else if (isFirebaseConfigured()) {
        setStatus('ok');
      } else {
        setStatus('error');
        setError('Firebase är inte konfigurerat. Kontrollera .env.local');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (status === 'checking') {
    return null; // Visa inget medan vi kollar
  }

  if (status === 'ok') {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
        ✅ Firebase ansluten
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md z-50">
      <div className="font-bold mb-2">❌ Firebase-fel</div>
      <div className="text-sm">{error}</div>
      <div className="mt-3 text-xs opacity-80">
        Kontrollera att alla NEXT_PUBLIC_FIREBASE_* variabler är satta i .env.local
      </div>
    </div>
  );
}


'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useFirebaseSync } from '@/hooks/useFirebaseSync';

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useStore((state) => state.initialize);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initialize();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    
    init();
  }, [initialize]);

  useFirebaseSync();

  // Show nothing during initialization to prevent flickering
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}


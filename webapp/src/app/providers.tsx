'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useFirebaseSync } from '@/hooks/useFirebaseSync';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const initialize = useStore((state) => state.initialize);
  
  useEffect(() => {
    setIsClient(true);
    initialize();
  }, []);
  
  // Enable Firebase sync only on client
  if (isClient) {
    useFirebaseSync();
  }
  
  return <>{children}</>;
}


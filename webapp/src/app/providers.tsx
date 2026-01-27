'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useFirebaseSync } from '@/hooks/useFirebaseSync';

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useFirebaseSync();

  return <>{children}</>;
}


'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

interface FactoryItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  production: number;
  icon: string;
}

const FACTORY_ITEMS: FactoryItem[] = [
  {
    id: 'factory_1',
    name: 'Liten Maskin',
    description: 'Producerar 1 chokladpengar/timme',
    cost: 50,
    production: 1,
    icon: '⚙️',
  },
  {
    id: 'factory_2',
    name: 'Medelstor Fabrik',
    description: 'Producerar 5 chokladpengar/timme',
    cost: 200,
    production: 5,
    icon: '🏭',
  },
  {
    id: 'factory_3',
    name: 'Stor Chokladfabrik',
    description: 'Producerar 15 chokladpengar/timme',
    cost: 500,
    production: 15,
    icon: '🏗️',
  },
  {
    id: 'factory_4',
    name: 'Mega Produktionslinje',
    description: 'Producerar 50 chokladpengar/timme',
    cost: 1000,
    production: 50,
    icon: '🚀',
  },
];

export default function FactoryPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white mb-4"
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-bold mb-4">🏭 Chokladfabrik</h1>
          
          <BalanceDisplay balance={child.balance} label="Ditt saldo" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Vad är fabriken?</h3>
              <p className="text-sm text-blue-800">
                Köp maskiner som producerar chokladpengar automatiskt! Ju dyrare maskin, desto mer tjänar du per timme. Det kallas passiv inkomst! 🎉
              </p>
            </div>
          </div>
        </div>
        
        {/* Coming Soon */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kommer snart!</h2>
          <p className="text-gray-600 mb-6">
            Fabriksfunktionen är under utveckling. Snart kan du börja tjäna passiv inkomst!
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="font-bold text-gray-800 text-left mb-3">Kommande maskiner:</h3>
            {FACTORY_ITEMS.map((item) => {
              const canAfford = child.balance >= item.cost;
              
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-4 ${
                    canAfford
                      ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <span>🍫</span>
                          <span>{item.cost}</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          canAfford ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {canAfford ? '✓ Har råd' : 'Spara mer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

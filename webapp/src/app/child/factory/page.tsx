'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { FactoryIcon, ChocolateCoinIcon, ArrowRightIcon } from '@/components/icons';
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
    icon: 'factory',
  },
  {
    id: 'factory_2',
    name: 'Medelstor Fabrik',
    description: 'Producerar 5 chokladpengar/timme',
    cost: 200,
    production: 5,
    icon: 'factory',
  },
  {
    id: 'factory_3',
    name: 'Stor Chokladfabrik',
    description: 'Producerar 15 chokladpengar/timme',
    cost: 500,
    production: 15,
    icon: 'factory',
  },
  {
    id: 'factory_4',
    name: 'Mega Produktionslinje',
    description: 'Producerar 50 chokladpengar/timme',
    cost: 1000,
    production: 50,
    icon: 'factory',
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
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="p-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white mb-4 flex items-center gap-2"
          >
            <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
              <ArrowRightIcon size={20} />
            </span>
            <span>Tillbaka</span>
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <FactoryIcon size={40} color="#FFF" />
            <h1 className="text-3xl font-bold text-white">Chokladfabrik</h1>
          </div>
          
          <BalanceDisplay balance={child.balance} label="Ditt saldo" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <div className="rounded-3xl p-5 shadow-md" style={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' }}>
              <FactoryIcon size={24} color="#FFF" />
            </div>
            <div>
              <h3 className="font-bold mb-1" style={{ color: '#1565C0' }}>Vad är fabriken?</h3>
              <p className="text-sm" style={{ color: '#1976D2' }}>
                Köp maskiner som producerar chokladpengar automatiskt! Ju dyrare maskin, desto mer tjänar du per timme. Det kallas passiv inkomst!
              </p>
            </div>
          </div>
        </div>
        
        {/* Coming Soon */}
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="mb-4">
            <FactoryIcon size={80} color="#FF8C42" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#8B5A3C' }}>Kommer snart!</h2>
          <p className="mb-6" style={{ color: '#A67C52' }}>
            Fabriksfunktionen är under utveckling. Snart kan du börja tjäna passiv inkomst!
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="font-bold text-left mb-3" style={{ color: '#8B5A3C' }}>Kommande maskiner:</h3>
            {FACTORY_ITEMS.map((item) => {
              const canAfford = child.balance >= item.cost;
              
              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-4 shadow-md"
                  style={{
                    background: canAfford
                      ? 'linear-gradient(135deg, #FFE5D9 0%, #FFD4C3 100%)'
                      : 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
                    border: `2px solid ${canAfford ? '#FF8C42' : '#BDBDBD'}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)' }}>
                      <FactoryIcon size={24} color="#FFF" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg" style={{ color: '#8B5A3C' }}>{item.name}</h3>
                      <p className="text-sm mt-1" style={{ color: '#A67C52' }}>{item.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 font-bold" style={{ color: '#FF8C42' }}>
                          <ChocolateCoinIcon size={20} />
                          <span>{item.cost}</span>
                        </div>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            background: canAfford ? '#C8E6C9' : '#E0E0E0',
                            color: canAfford ? '#2E7D32' : '#757575',
                          }}
                        >
                          {canAfford ? 'Har råd' : 'Spara mer'}
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

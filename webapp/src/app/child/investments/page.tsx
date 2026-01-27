'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { FundCard } from '@/components/FundCard';
import type { Child, Fund } from '@/types';

// Demo funds
const DEMO_FUNDS: Fund[] = [
  {
    id: 'fund_1',
    name: 'Säker Choklad',
    description: 'Låg risk, stabil tillväxt',
    riskLevel: 'low',
    currentPrice: 10,
    priceHistory: [],
    icon: '🛡️',
  },
  {
    id: 'fund_2',
    name: 'Balanserad Mix',
    description: 'Medel risk, bra balans',
    riskLevel: 'medium',
    currentPrice: 15,
    priceHistory: [],
    icon: '⚖️',
  },
  {
    id: 'fund_3',
    name: 'Hög Avkastning',
    description: 'Hög risk, stor potential',
    riskLevel: 'high',
    currentPrice: 20,
    priceHistory: [],
    icon: '🎲',
  },
];

export default function InvestmentsPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white mb-4"
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-bold mb-4">📈 Investeringar</h1>
          
          <BalanceDisplay balance={child.balance} label="Tillgängligt att investera" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info */}
        <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Vad är investeringar?</h3>
              <p className="text-sm text-blue-800">
                Istället för att bara spara, kan du investera dina chokladpengar! Dina pengar kan växa över tid, men det finns också risk att förlora. Ju högre risk, desto större möjlighet till vinst!
              </p>
            </div>
          </div>
        </div>
        
        {/* Coming Soon Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kommer snart!</h2>
          <p className="text-gray-600 mb-6">
            Investeringsfunktionen är under utveckling. Snart kan du börja växa dina chokladpengar!
          </p>
          
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="font-bold text-gray-800 text-left">Kommande fonder:</h3>
            {DEMO_FUNDS.map((fund) => (
              <FundCard key={fund.id} fund={fund} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

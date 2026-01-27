'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useRewards } from '@/hooks/useRewards';
import { Button } from '@/components/Button';
import { RewardCard } from '@/components/RewardCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import type { Child } from '@/types';

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

export default function RewardsPage() {
  const router = useRouter();
  const { currentUser } = useStore();
  const { rewards, purchaseReward, isLoading } = useRewards();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  
  if (!currentUser || currentUser.role !== 'child') {
    router.push('/');
    return null;
  }
  
  const child = currentUser as Child;
  
  const handlePurchase = async (rewardId: string, cost: number) => {
    if (child.balance < cost) {
      alert('Du har inte tillräckligt med chokladpengar! 😢');
      return;
    }
    
    if (!confirm('Är du säker på att du vill köpa denna belöning?')) {
      return;
    }
    
    setPurchasingId(rewardId);
    
    try {
      await purchaseReward(rewardId);
      alert('Grattis! Du har köpt belöningen! 🎉\n\nFråga dina föräldrar när du kan få din belöning!');
      
      // Trigger confetti/vibration
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    } catch (err) {
      alert('Kunde inte köpa belöningen. Försök igen!');
    } finally {
      setPurchasingId(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white mb-4"
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-bold mb-4">🎁 Belöningar</h1>
          
          <BalanceDisplay balance={child.balance} label="Ditt saldo" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {rewards.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Inga belöningar ännu</h2>
            <p className="text-gray-600 mb-4">
              Fråga dina föräldrar om de kan lägga till belöningar!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((reward) => {
              const canAfford = child.balance >= reward.cost;
              const isPurchasing = purchasingId === reward.id;
              
              return (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  canAfford={canAfford}
                  loading={isPurchasing}
                  onPurchase={() => handlePurchase(reward.id, reward.cost)}
                />
              );
            })}
          </div>
        )}
        
        {rewards.length > 0 && (
          <div className="mt-6 bg-amber-50 rounded-xl border-2 border-amber-200 p-4 text-center">
            <p className="text-sm text-amber-800">
              💡 <strong>Tips:</strong> Spara dina chokladpengar för att köpa större belöningar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

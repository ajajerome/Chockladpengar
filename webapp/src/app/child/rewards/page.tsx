'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useRewards } from '@/hooks/useRewards';
import { Button } from '@/components/Button';
import { RewardCard } from '@/components/RewardCard';
import { BalanceDisplay } from '@/components/BalanceDisplay';
import { GiftIcon } from '@/components/icons';
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
      alert('Du har inte tillräckligt med chokladpengar!');
      return;
    }
    
    if (!confirm('Är du säker på att du vill köpa detta?')) {
      return;
    }
    
    setPurchasingId(rewardId);
    
    try {
      await purchaseReward(rewardId);
      alert('Grattis! Du har köpt belöningen!\n\nFråga dina föräldrar när du kan få den!');
      
      // Trigger vibration
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
    <div className="min-h-screen bg-gradient-to-br from-cream via-nougat-light to-white-chocolate pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-chocolate-medium to-caramel text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="text-white/80 hover:text-white mb-4 font-medium"
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-bold mb-4">Butiken</h1>
          <p className="text-white/90 text-sm mb-4">Handla belöningar med dina chokladpengar</p>
          
          <BalanceDisplay balance={child.balance} label="Ditt saldo" />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {rewards.length === 0 ? (
          <div className="card-glass text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-chocolate-light to-nougat-light flex items-center justify-center">
              <GiftIcon size={48} color="#6B4423" />
            </div>
            <h2 className="text-xl font-bold text-chocolate-dark mb-2">Butiken är tom</h2>
            <p className="text-chocolate-milk mb-4">
              Fråga dina föräldrar om de kan lägga till saker i butiken!
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
          <div className="mt-6 bg-nougat-light/50 rounded-2xl border-2 border-nougat-gold/30 p-4">
            <p className="text-sm text-chocolate-medium">
              <strong>Tips:</strong> Spara dina chokladpengar för att köpa större belöningar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

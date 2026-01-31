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
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 50%, #FFE4E4 100%)'
      }}>
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-4 font-medium bg-white/90 hover:bg-white px-4 py-2 rounded-2xl shadow-md transition-all"
            style={{ color: '#8B5A3C' }}
          >
            ← Tillbaka
          </button>
          
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Butiken</h1>
          <p className="text-sm mb-4" style={{ color: '#6B4423' }}>Handla belöningar med dina chokladpengar</p>
          
          <div className="bg-white rounded-3xl p-4 shadow-lg">
            <p className="text-sm font-medium mb-1" style={{ color: '#8B5A3C' }}>Ditt saldo</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold" style={{ color: '#FFD700' }}>{child.balance}</span>
              <span className="text-lg" style={{ color: '#A67C52' }}>chokladpengar</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {rewards.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-md text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF9999 0%, #FFB4A2 100%)' }}>
              <GiftIcon size={48} />
            </div>
            <h2 className="text-xl font-extrabold mb-2" style={{ color: '#8B5A3C' }}>Butiken är tom</h2>
            <p className="mb-4" style={{ color: '#A67C52' }}>
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
          <div className="mt-6 bg-white rounded-3xl shadow-md p-4 border-l-4" style={{ borderColor: '#FFE55C' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FFE55C 0%, #FFD700 100%)' }}>
                <GiftIcon size={20} />
              </div>
              <p className="text-sm" style={{ color: '#A67C52' }}>
                <strong style={{ color: '#8B5A3C' }}>Choki-tips:</strong> Spara dina chokladpengar för att köpa större belöningar!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

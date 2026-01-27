import React from 'react';
import type { Reward } from '@/types';
import { ChocolateCoin } from './ChocolateCoin';
import { Button } from './Button';

interface RewardCardProps {
  reward: Reward;
  onPurchase?: () => void;
  canAfford?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export function RewardCard({
  reward,
  onPurchase,
  canAfford = true,
  disabled = false,
  loading = false,
}: RewardCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="text-5xl">{reward.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{reward.title}</h3>
          {reward.description && (
            <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-purple-200">
        <ChocolateCoin amount={reward.cost} size="md" />
        
        {onPurchase && (
          <Button
            onClick={onPurchase}
            variant={canAfford ? 'primary' : 'secondary'}
            size="sm"
            disabled={!canAfford || disabled}
            loading={loading}
          >
            {canAfford ? 'Köp 🎁' : 'Inte råd'}
          </Button>
        )}
      </div>
    </div>
  );
}

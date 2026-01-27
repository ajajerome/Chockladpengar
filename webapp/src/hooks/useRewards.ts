'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { FirebaseService } from '@/services/firebase.service';
import type { Reward, Child } from '@/types';

export function useRewards() {
  const { mode, currentUser, family, rewards } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const availableRewards = useMemo(() => {
    return rewards.filter(r => r.status === 'available');
  }, [rewards]);
  
  const affordableRewards = useMemo(() => {
    if (!currentUser || currentUser.role !== 'child') return [];
    
    return availableRewards.filter(r => r.cost <= (currentUser as Child).balance);
  }, [availableRewards, currentUser]);
  
  const createReward = async (
    title: string,
    description: string,
    cost: number,
    icon: string = '🎁'
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!currentUser || !family) {
        throw new Error('User or family not found');
      }
      
      if (mode === 'firebase') {
        const reward = await FirebaseService.createReward({
          title,
          description,
          cost,
          icon,
          createdBy: currentUser.id,
          familyId: family.id,
        });
        
        return reward;
      } else {
        // Local mode
        const reward: Reward = {
          id: `reward_${Date.now()}`,
          title,
          description,
          cost,
          icon,
          createdBy: currentUser.id,
          familyId: family.id,
          status: 'available',
          createdAt: new Date().toISOString(),
        };
        
        useStore.getState().addReward(reward);
        return reward;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create reward';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const purchaseReward = async (rewardId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await useStore.getState().purchaseReward(rewardId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to purchase reward';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    rewards: availableRewards,
    affordableRewards,
    allRewards: rewards,
    isLoading,
    error,
    createReward,
    purchaseReward,
  };
}


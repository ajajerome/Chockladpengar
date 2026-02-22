'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { FirebaseService } from '@/services/firebase.service';
import { isFirebaseConfigured } from '@/lib/firebase';

/**
 * Hook to sync Firebase data with Zustand store in real-time
 * Only active when mode is 'firebase'. All hooks called unconditionally for rules-of-hooks.
 */
export function useFirebaseSync() {
  const { mode, currentUser, family } = useStore();

  // Listen to current user updates
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !currentUser || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToUser(currentUser.id, (user) => {
        if (user) {
          // Use queueMicrotask to avoid updating during render
          queueMicrotask(() => {
            useStore.getState().login(user);
          });
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to user:', error);
    }
  }, [mode, currentUser]);

  // Listen to family updates
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFamily(family.id, (updatedFamily) => {
        if (updatedFamily) {
          queueMicrotask(() => {
            useStore.getState().setFamily(updatedFamily);
          });
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to family:', error);
    }
  }, [mode, family]);

  // Listen to family members
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFamilyMembers(family.id, (members) => {
        queueMicrotask(() => {
          useStore.getState().setFamilyMembers(members);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to family members:', error);
    }
  }, [mode, family]);

  // Listen to tasks
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    console.log('🔔 Setting up tasks listener for family:', family.id);
    try {
      const unsubscribe = FirebaseService.listenToFamilyTasks(family.id, (tasks) => {
        console.log('📋 Tasks updated:', tasks.length, 'tasks');
        queueMicrotask(() => {
          useStore.getState().setTasks(tasks);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to tasks:', error);
    }
  }, [mode, family]);

  // Listen to rewards
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    console.log('🔔 Setting up rewards listener for family:', family.id);
    try {
      const unsubscribe = FirebaseService.listenToFamilyRewards(family.id, (rewards) => {
        console.log('🎁 Rewards updated:', rewards.length, 'rewards');
        queueMicrotask(() => {
          useStore.getState().setRewards(rewards);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to rewards:', error);
    }
  }, [mode, family]);

  // Listen to transactions
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !currentUser || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToUserTransactions(currentUser.id, (transactions) => {
        queueMicrotask(() => {
          useStore.getState().setTransactions(transactions);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to transactions:', error);
    }
  }, [mode, currentUser]);

  // Listen to purchased rewards (for parents to see what children bought)
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFamilyPurchasedRewards(family.id, (purchases) => {
        queueMicrotask(() => {
          useStore.getState().setPurchasedRewards(purchases);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to purchased rewards:', error);
    }
  }, [mode, family]);

  // Listen to investments (for child)
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !currentUser || currentUser.role !== 'child' || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToChildInvestments(currentUser.id, (investments) => {
        queueMicrotask(() => {
          useStore.getState().setInvestments(investments);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to investments:', error);
    }
  }, [mode, currentUser]);

  // Listen to factories (for child)
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !currentUser || currentUser.role !== 'child' || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToChildFactories(currentUser.id, (factories) => {
        queueMicrotask(() => {
          useStore.getState().setOwnedFactories(factories);
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to factories:', error);
    }
  }, [mode, currentUser]);

  // Listen to fund prices (global for all users)
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFundPrices((prices) => {
        queueMicrotask(() => {
          // Uppdatera FUND_BASE_PRICES
          const { FUND_BASE_PRICES } = require('@/utils/fundPrices');
          Object.keys(prices).forEach(fundId => {
            if (FUND_BASE_PRICES[fundId]) {
              FUND_BASE_PRICES[fundId] = prices[fundId];
            }
          });
          console.log('📊 Fondpriser uppdaterade från Firebase');
        });
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to fund prices:', error);
    }
  }, [mode]);
}


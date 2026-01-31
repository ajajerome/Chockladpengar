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
        if (user) useStore.getState().login(user);
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
        if (updatedFamily) useStore.getState().setFamily(updatedFamily);
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
        useStore.getState().setFamilyMembers(members);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to family members:', error);
    }
  }, [mode, family]);

  // Listen to tasks
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFamilyTasks(family.id, (tasks) => {
        useStore.getState().setTasks(tasks);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to tasks:', error);
    }
  }, [mode, family]);

  // Listen to rewards
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'firebase' || !family || !isFirebaseConfigured()) return;

    try {
      const unsubscribe = FirebaseService.listenToFamilyRewards(family.id, (rewards) => {
        useStore.getState().setRewards(rewards);
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
        useStore.getState().setTransactions(transactions);
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
        useStore.getState().setPurchasedRewards(purchases);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Error listening to purchased rewards:', error);
    }
  }, [mode, family]);
}


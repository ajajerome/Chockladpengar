'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { FirebaseService } from '@/services/firebase.service';

/**
 * Hook to sync Firebase data with Zustand store in real-time
 * Only active when mode is 'firebase'
 */
export function useFirebaseSync() {
  // Skip on server
  if (typeof window === 'undefined') {
    return;
  }
  
  const { mode, currentUser, family } = useStore();
  
  // Listen to current user updates
  useEffect(() => {
    if (mode !== 'firebase' || !currentUser) return;
    
    const unsubscribe = FirebaseService.listenToUser(currentUser.id, (user) => {
      if (user) {
        useStore.getState().login(user);
      }
    });
    
    return unsubscribe;
  }, [mode, currentUser?.id]);
  
  // Listen to family updates
  useEffect(() => {
    if (mode !== 'firebase' || !family) return;
    
    const unsubscribe = FirebaseService.listenToFamily(family.id, (updatedFamily) => {
      if (updatedFamily) {
        useStore.getState().setFamily(updatedFamily);
      }
    });
    
    return unsubscribe;
  }, [mode, family?.id]);
  
  // Listen to family members
  useEffect(() => {
    if (mode !== 'firebase' || !family) return;
    
    const unsubscribe = FirebaseService.listenToFamilyMembers(family.id, (members) => {
      useStore.getState().setFamilyMembers(members);
    });
    
    return unsubscribe;
  }, [mode, family?.id]);
  
  // Listen to tasks
  useEffect(() => {
    if (mode !== 'firebase' || !family) return;
    
    const unsubscribe = FirebaseService.listenToFamilyTasks(family.id, (tasks) => {
      useStore.getState().setTasks(tasks);
    });
    
    return unsubscribe;
  }, [mode, family?.id]);
  
  // Listen to rewards
  useEffect(() => {
    if (mode !== 'firebase' || !family) return;
    
    const unsubscribe = FirebaseService.listenToFamilyRewards(family.id, (rewards) => {
      useStore.getState().setRewards(rewards);
    });
    
    return unsubscribe;
  }, [mode, family?.id]);
  
  // Listen to transactions
  useEffect(() => {
    if (mode !== 'firebase' || !currentUser) return;
    
    const unsubscribe = FirebaseService.listenToUserTransactions(currentUser.id, (transactions) => {
      useStore.getState().setTransactions(transactions);
    });
    
    return unsubscribe;
  }, [mode, currentUser?.id]);
}


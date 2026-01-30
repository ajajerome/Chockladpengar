'use client';

import { create } from 'zustand';
import type {
  User,
  Child,
  Parent,
  Family,
  Task,
  Reward,
  PurchasedReward,
  Investment,
  OwnedFactory,
  Transaction,
  Fund,
  AppState,
} from '@/types';
import { FirebaseService } from '@/services/firebase.service';
import { LocalStorageService } from '@/services/localStorage.service';
import { isFirebaseConfigured } from '@/lib/firebase';

interface StoreState extends AppState {
  // Mode
  mode: 'local' | 'firebase';
  
  // Actions - Authentication
  login: (user: User) => void;
  logout: () => void;
  
  // Actions - Family
  setFamily: (family: Family) => void;
  setFamilyMembers: (members: User[]) => void;
  addParent: (familyId: string, name: string, pin: string) => Promise<void>;
  deleteChild: (childId: string) => Promise<void>;
  families: Family[];
  loadFamilyForJoin: (familyId: string) => Promise<void>;
  updateFamilySettings: (settings: Partial<import('@/types').FamilySettings>) => Promise<void>;
  
  // Actions - Tasks
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  submitTaskForReview: (taskId: string) => Promise<void>;
  approveTask: (taskId: string) => Promise<void>;
  rejectTask: (taskId: string) => Promise<void>;
  
  // Actions - Rewards
  setRewards: (rewards: Reward[]) => void;
  addReward: (reward: Reward) => void;
  deleteReward: (rewardId: string) => void;
  purchaseReward: (rewardId: string) => Promise<void>;
  setPurchasedRewards: (purchases: PurchasedReward[]) => void;
  
  // Actions - Transactions
  setTransactions: (transactions: Transaction[]) => void;
  
  // Actions - Investments
  setInvestments: (investments: Investment[]) => void;
  buyFundShares: (fundId: string, shares: number, price: number) => Promise<void>;
  sellFundShares: (investmentId: string, shares: number, currentPrice: number) => Promise<void>;
  
  // Actions - Factory
  setOwnedFactories: (factories: OwnedFactory[]) => void;
  buyFactory: (factoryItemId: string) => Promise<void>;
  collectFactoryProduction: (factoryId: string) => Promise<void>;
  payFactoryMaintenance: (factoryId: string, cost: number) => Promise<void>;
  
  // Actions - UI
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Initialization
  initialize: () => Promise<void>;
  switchMode: (mode: 'local' | 'firebase') => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial State
  currentUser: null,
  isAuthenticated: false,
  family: null,
  familyMembers: [],
  families: [],
  tasks: [],
  rewards: [],
  purchasedRewards: [],
  investments: [],
  funds: [],
  ownedFactories: [],
  transactions: [],
  isLoading: false,
  error: null,
  mode: 'local',
  
  // ============= INITIALIZATION =============
  
  initialize: async () => {
    // Skip on server
    if (typeof window === 'undefined') {
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // Check if Firebase is configured
      const hasFirebase = isFirebaseConfigured();
      const savedMode = LocalStorageService.getMode();
      const mode = hasFirebase && savedMode === 'firebase' ? 'firebase' : 'local';
      
      if (mode === 'local') {
        // Load from localStorage
        const user = LocalStorageService.getUser();
        const family = LocalStorageService.getFamily();
        const tasks = LocalStorageService.getTasks();
        const rewards = LocalStorageService.getRewards();
        const transactions = LocalStorageService.getTransactions();
        
        set({
          currentUser: user,
          isAuthenticated: !!user,
          family,
          tasks,
          rewards,
          transactions,
          mode: 'local',
        });
      } else {
        // Firebase mode will be handled by real-time listeners
        set({ mode: 'firebase' });
      }
    } catch (error) {
      console.error('Failed to initialize:', error);
      set({ error: 'Failed to initialize app' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  switchMode: async (mode: 'local' | 'firebase') => {
    LocalStorageService.setMode(mode);
    set({ mode });
    await get().initialize();
  },
  
  // ============= AUTHENTICATION =============
  
  login: (user: User) => {
    set({ currentUser: user, isAuthenticated: true });
    
    if (get().mode === 'local') {
      LocalStorageService.saveUser(user);
    }
  },
  
  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false,
      family: null,
      familyMembers: [],
      tasks: [],
      rewards: [],
      transactions: [],
    });
    
    if (get().mode === 'local') {
      LocalStorageService.clearAll();
    }
  },
  
  // ============= FAMILY =============
  
  setFamily: (family: Family) => {
    set({ family });
    
    if (get().mode === 'local') {
      LocalStorageService.saveFamily(family);
    }
  },
  
  setFamilyMembers: (members: User[]) => {
    set({ familyMembers: members });
  },
  
  addParent: async (familyId: string, name: string, pin: string) => {
    const { mode } = get();
    if (mode === 'firebase') {
      const parent = await FirebaseService.createParent({ name, familyId, pin });
      const members = [...get().familyMembers, parent];
      set({ familyMembers: members });
    } else {
      const parent: Parent = {
        id: `parent_${Date.now()}`,
        name,
        role: 'parent',
        familyId,
        children: [],
        pin,
        createdAt: new Date().toISOString(),
      };
      const members = [...get().familyMembers, parent];
      set({ familyMembers: members });
    }
  },
  
  deleteChild: async (childId: string) => {
    const { mode } = get();
    if (mode === 'firebase') {
      await FirebaseService.deleteChild(childId);
    }
    // Ta bort från local state
    const members = get().familyMembers.filter(m => m.id !== childId);
    set({ familyMembers: members });
  },
  
  loadFamilyForJoin: async (familyId: string) => {
    if (isFirebaseConfigured()) {
      try {
        const family = await FirebaseService.getFamily(familyId);
        set({ families: family ? [family] : [] });
      } catch {
        set({ families: [] });
      }
    } else {
      set({ families: [] });
    }
  },
  
  updateFamilySettings: async (settings: Partial<import('@/types').FamilySettings>) => {
    const { family, mode } = get();
    if (!family) {
      throw new Error('No family found');
    }
    
    const updatedSettings = {
      ...family.settings,
      ...settings,
    };
    
    const updatedFamily = {
      ...family,
      settings: updatedSettings,
    };
    
    if (mode === 'firebase') {
      await FirebaseService.updateFamily(family.id, { settings: updatedSettings });
    }
    
    set({ family: updatedFamily });
    
    if (mode === 'local') {
      LocalStorageService.saveFamily(updatedFamily);
    }
  },
  
  // ============= TASKS =============
  
  setTasks: (tasks: Task[]) => {
    set({ tasks });
    
    if (get().mode === 'local') {
      LocalStorageService.saveTasks(tasks);
    }
  },
  
  addTask: (task: Task) => {
    const tasks = [...get().tasks, task];
    get().setTasks(tasks);
  },
  
  updateTask: (taskId: string, updates: Partial<Task>) => {
    const tasks = get().tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    get().setTasks(tasks);
  },
  
  deleteTask: (taskId: string) => {
    const tasks = get().tasks.filter(task => task.id !== taskId);
    get().setTasks(tasks);
  },
  
  submitTaskForReview: async (taskId: string) => {
    const { mode } = get();
    
    if (mode === 'firebase') {
      await FirebaseService.updateTask(taskId, {
        status: 'in_review',
        completedAt: new Date().toISOString(),
      });
    } else {
      get().updateTask(taskId, {
        status: 'in_review',
        completedAt: new Date().toISOString(),
      });
    }
  },
  
  approveTask: async (taskId: string) => {
    const { mode, currentUser, tasks } = get();
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;
    
    if (mode === 'firebase') {
      await FirebaseService.approveTask(taskId, task.assignedTo);
    } else {
      // Local mode
      const childId = task.assignedTo;
      const child = get().familyMembers.find(m => m.id === childId) as Child;
      
      if (child) {
        // Update child balance
        const updatedChild: Child = {
          ...child,
          balance: (child.balance || 0) + task.reward,
        };
        
        const members = get().familyMembers.map(m =>
          m.id === childId ? updatedChild : m
        );
        
        set({ familyMembers: members });
        
        // Update current user if it's the child
        if (currentUser?.id === childId) {
          set({ currentUser: updatedChild });
          LocalStorageService.saveUser(updatedChild);
        }
        
        // Add transaction
        const transaction: Transaction = {
          id: `txn_${Date.now()}`,
          userId: childId,
          type: 'task_reward',
          amount: task.reward,
          description: `Belöning för: ${task.title}`,
          timestamp: new Date().toISOString(),
          relatedId: taskId,
        };
        
        const transactions = [transaction, ...get().transactions];
        get().setTransactions(transactions);
      }
      
      // Handle task based on frequency
      if (task.frequency === 'once') {
        get().deleteTask(taskId);
      } else {
        get().updateTask(taskId, {
          status: 'pending',
          reviewedAt: new Date().toISOString(),
        });
      }
    }
  },
  
  rejectTask: async (taskId: string) => {
    const { mode } = get();
    
    if (mode === 'firebase') {
      await FirebaseService.rejectTask(taskId);
    } else {
      get().updateTask(taskId, {
        status: 'rejected',
        reviewedAt: new Date().toISOString(),
      });
      
      // Reset to pending after a short delay
      setTimeout(() => {
        get().updateTask(taskId, { status: 'pending' });
      }, 1000);
    }
  },
  
  // ============= REWARDS =============
  
  setRewards: (rewards: Reward[]) => {
    set({ rewards });
    
    if (get().mode === 'local') {
      LocalStorageService.saveRewards(rewards);
    }
  },
  
  addReward: (reward: Reward) => {
    const rewards = [...get().rewards, reward];
    get().setRewards(rewards);
  },
  
  deleteReward: (rewardId: string) => {
    const { mode } = get();
    if (mode === 'firebase') {
      FirebaseService.deleteReward(rewardId);
    }
    const rewards = get().rewards.filter(r => r.id !== rewardId);
    get().setRewards(rewards);
  },
  
  purchaseReward: async (rewardId: string) => {
    const { mode, currentUser, rewards } = get();
    const reward = rewards.find(r => r.id === rewardId);
    
    if (!reward || !currentUser || currentUser.role !== 'child') {
      throw new Error('Invalid reward or user');
    }
    
    const child = currentUser as Child;
    
    if (child.balance < reward.cost) {
      throw new Error('Insufficient balance');
    }
    
    if (mode === 'firebase') {
      await FirebaseService.purchaseReward(rewardId, child.id);
    } else {
      // Local mode
      const updatedChild: Child = {
        ...child,
        balance: child.balance - reward.cost,
      };
      
      set({ currentUser: updatedChild });
      LocalStorageService.saveUser(updatedChild);
      
      // Update in family members
      const members = get().familyMembers.map(m =>
        m.id === child.id ? updatedChild : m
      );
      set({ familyMembers: members });
      
      // Add transaction
      const transaction: Transaction = {
        id: `txn_${Date.now()}`,
        userId: child.id,
        type: 'purchase',
        amount: -reward.cost,
        description: `Köpte: ${reward.title}`,
        timestamp: new Date().toISOString(),
        relatedId: rewardId,
      };
      
      const transactions = [transaction, ...get().transactions];
      get().setTransactions(transactions);
    }
  },
  
  // ============= PURCHASED REWARDS =============
  
  setPurchasedRewards: (purchasedRewards: PurchasedReward[]) => {
    set({ purchasedRewards });
  },
  
  // ============= INVESTMENTS =============
  
  setInvestments: (investments: Investment[]) => {
    set({ investments });
  },
  
  buyFundShares: async (fundId: string, shares: number, price: number) => {
    const { currentUser, mode } = get();
    if (!currentUser || currentUser.role !== 'child') {
      throw new Error('Only children can buy funds');
    }
    
    const child = currentUser as Child;
    const totalCost = shares * price;
    
    if (child.balance < totalCost) {
      throw new Error('Insufficient balance');
    }
    
    // Skapa investering
    const investment: Investment = {
      id: `inv_${Date.now()}`,
      childId: child.id,
      fundId,
      shares,
      purchasePrice: price,
      purchasedAt: new Date().toISOString(),
    };
    
    // Uppdatera balans
    const updatedChild: Child = {
      ...child,
      balance: child.balance - totalCost,
    };
    
    set({ 
      currentUser: updatedChild,
      investments: [...get().investments, investment],
    });
    
    if (mode === 'local') {
      LocalStorageService.saveUser(updatedChild);
    }
    
    // Lägg till transaktion
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: child.id,
      type: 'investment',
      amount: -totalCost,
      description: `Köpte ${shares} andelar i fond`,
      timestamp: new Date().toISOString(),
      relatedId: investment.id,
    };
    
    const transactions = [transaction, ...get().transactions];
    get().setTransactions(transactions);
  },
  
  sellFundShares: async (investmentId: string, shares: number, currentPrice: number) => {
    const { currentUser, investments, mode } = get();
    if (!currentUser || currentUser.role !== 'child') {
      throw new Error('Only children can sell funds');
    }
    
    const investment = investments.find(i => i.id === investmentId);
    if (!investment) {
      throw new Error('Investment not found');
    }
    
    if (investment.shares < shares) {
      throw new Error('Not enough shares');
    }
    
    const child = currentUser as Child;
    const sellValue = shares * currentPrice;
    
    // Uppdatera eller ta bort investering
    let updatedInvestments;
    if (investment.shares === shares) {
      updatedInvestments = investments.filter(i => i.id !== investmentId);
    } else {
      updatedInvestments = investments.map(i =>
        i.id === investmentId ? { ...i, shares: i.shares - shares } : i
      );
    }
    
    // Uppdatera balans
    const updatedChild: Child = {
      ...child,
      balance: child.balance + sellValue,
    };
    
    set({
      currentUser: updatedChild,
      investments: updatedInvestments,
    });
    
    if (mode === 'local') {
      LocalStorageService.saveUser(updatedChild);
    }
    
    // Lägg till transaktion
    const profit = sellValue - (shares * investment.purchasePrice);
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: child.id,
      type: 'investment',
      amount: sellValue,
      description: `Sålde ${shares} andelar (${profit >= 0 ? '+' : ''}${Math.round(profit)} vinst)`,
      timestamp: new Date().toISOString(),
      relatedId: investmentId,
    };
    
    const transactions = [transaction, ...get().transactions];
    get().setTransactions(transactions);
  },
  
  // ============= FACTORY =============
  
  setOwnedFactories: (ownedFactories: OwnedFactory[]) => {
    set({ ownedFactories });
  },
  
  buyFactory: async (factoryItemId: string) => {
    const { currentUser, mode } = get();
    if (!currentUser || currentUser.role !== 'child') {
      throw new Error('Only children can buy factories');
    }
    
    // Import här för att undvika circular dependency
    const { FACTORY_ITEMS } = await import('@/constants/factory');
    const factoryItem = FACTORY_ITEMS.find(f => f.id === factoryItemId);
    
    if (!factoryItem) {
      throw new Error('Factory not found');
    }
    
    const child = currentUser as Child;
    
    if (child.balance < factoryItem.cost) {
      throw new Error('Insufficient balance');
    }
    
    const now = new Date().toISOString();
    const ownedFactory: OwnedFactory = {
      id: `owned_${Date.now()}`,
      childId: child.id,
      factoryItemId,
      purchasedAt: now,
      level: 1,
      lastMaintenance: now,
      needsMaintenance: false,
      isProducing: true,
    };
    
    // Uppdatera balans
    const updatedChild: Child = {
      ...child,
      balance: child.balance - factoryItem.cost,
    };
    
    set({
      currentUser: updatedChild,
      ownedFactories: [...get().ownedFactories, ownedFactory],
    });
    
    if (mode === 'local') {
      LocalStorageService.saveUser(updatedChild);
    }
    
    // Lägg till transaktion
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: child.id,
      type: 'factory',
      amount: -factoryItem.cost,
      description: `Köpte ${factoryItem.name}`,
      timestamp: new Date().toISOString(),
      relatedId: ownedFactory.id,
    };
    
    const transactions = [transaction, ...get().transactions];
    get().setTransactions(transactions);
  },
  
  collectFactoryProduction: async (factoryId: string) => {
    const { currentUser, ownedFactories, mode } = get();
    if (!currentUser || currentUser.role !== 'child') return;
    
    const factory = ownedFactories.find(f => f.id === factoryId);
    if (!factory || !factory.isProducing) return;
    
    const { FACTORY_ITEMS, calculateProduction } = await import('@/constants/factory');
    const factoryItem = FACTORY_ITEMS.find(f => f.id === factory.factoryItemId);
    
    if (!factoryItem) return;
    
    const production = calculateProduction(factoryItem.productionRate, factory.purchasedAt);
    
    if (production === 0) return;
    
    const child = currentUser as Child;
    const updatedChild: Child = {
      ...child,
      balance: child.balance + production,
    };
    
    // Uppdatera fabrik - sätt ny purchasedAt för att nollställa produktion
    const updatedFactories = ownedFactories.map(f =>
      f.id === factoryId ? { ...f, purchasedAt: new Date().toISOString() } : f
    );
    
    set({
      currentUser: updatedChild,
      ownedFactories: updatedFactories,
    });
    
    if (mode === 'local') {
      LocalStorageService.saveUser(updatedChild);
    }
    
    // Lägg till transaktion
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: child.id,
      type: 'factory',
      amount: production,
      description: `Samlade in från ${factoryItem.name}`,
      timestamp: new Date().toISOString(),
      relatedId: factoryId,
    };
    
    const transactions = [transaction, ...get().transactions];
    get().setTransactions(transactions);
  },
  
  payFactoryMaintenance: async (factoryId: string, cost: number) => {
    const { currentUser, ownedFactories, mode } = get();
    if (!currentUser || currentUser.role !== 'child') return;
    
    const child = currentUser as Child;
    
    if (child.balance < cost) {
      throw new Error('Insufficient balance');
    }
    
    const updatedChild: Child = {
      ...child,
      balance: child.balance - cost,
    };
    
    const updatedFactories = ownedFactories.map(f =>
      f.id === factoryId ? { 
        ...f, 
        lastMaintenance: new Date().toISOString(),
        needsMaintenance: false,
        isProducing: true,
      } : f
    );
    
    set({
      currentUser: updatedChild,
      ownedFactories: updatedFactories,
    });
    
    if (mode === 'local') {
      LocalStorageService.saveUser(updatedChild);
    }
    
    // Lägg till transaktion
    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: child.id,
      type: 'factory',
      amount: -cost,
      description: 'Fabriksunderhåll',
      timestamp: new Date().toISOString(),
      relatedId: factoryId,
    };
    
    const transactions = [transaction, ...get().transactions];
    get().setTransactions(transactions);
  },
  
  // ============= TRANSACTIONS =============
  
  setTransactions: (transactions: Transaction[]) => {
    set({ transactions });
    
    if (get().mode === 'local') {
      LocalStorageService.saveTransactions(transactions);
    }
  },
  
  // ============= INVESTMENTS =============
  
  addInvestment: (investment: Investment) => {
    const investments = [...get().investments, investment];
    set({ investments });
  },
  
  removeInvestment: (investmentId: string) => {
    const investments = get().investments.filter(inv => inv.id !== investmentId);
    set({ investments });
  },
  
  updateUserBalance: (userId: string, amount: number) => {
    const { currentUser, mode } = get();
    if (!currentUser || currentUser.id !== userId) return;
    
    if (currentUser.role === 'child') {
      const updatedChild: Child = {
        ...currentUser as Child,
        balance: (currentUser as Child).balance + amount,
      };
      
      set({ currentUser: updatedChild });
      
      if (mode === 'local') {
        LocalStorageService.saveUser(updatedChild);
      }
    }
  },
  
  // ============= UI =============
  
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
  
  setError: (error: string | null) => {
    set({ error });
  },
}));

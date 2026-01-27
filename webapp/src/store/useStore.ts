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
  families: Family[];
  loadFamilyForJoin: (familyId: string) => Promise<void>;
  
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
  purchaseReward: (rewardId: string) => Promise<void>;
  
  // Actions - Transactions
  setTransactions: (transactions: Transaction[]) => void;
  
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
  
  addParent: async (familyId: string, name: string, _pin: string) => {
    const { mode } = get();
    if (mode === 'firebase') {
      const parent = await FirebaseService.createParent({ name, familyId });
      const members = [...get().familyMembers, parent];
      set({ familyMembers: members });
    } else {
      const parent: Parent = {
        id: `parent_${Date.now()}`,
        name,
        role: 'parent',
        familyId,
        children: [],
        createdAt: new Date().toISOString(),
      };
      const members = [...get().familyMembers, parent];
      set({ familyMembers: members });
    }
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
  
  // ============= TRANSACTIONS =============
  
  setTransactions: (transactions: Transaction[]) => {
    set({ transactions });
    
    if (get().mode === 'local') {
      LocalStorageService.saveTransactions(transactions);
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

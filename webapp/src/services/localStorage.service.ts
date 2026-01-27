import type { User, Family, Task, Reward, Transaction } from '@/types';

const STORAGE_KEYS = {
  USER: 'chokladpengar_user',
  FAMILY: 'chokladpengar_family',
  TASKS: 'chokladpengar_tasks',
  REWARDS: 'chokladpengar_rewards',
  TRANSACTIONS: 'chokladpengar_transactions',
  MODE: 'chokladpengar_mode', // 'local' or 'firebase'
} as const;

export class LocalStorageService {
  // Mode management
  static setMode(mode: 'local' | 'firebase') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MODE, mode);
    }
  }
  
  static getMode(): 'local' | 'firebase' {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(STORAGE_KEYS.MODE) as 'local' | 'firebase') || 'local';
    }
    return 'local';
  }
  
  // User
  static saveUser(user: User | null) {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
  }
  
  static getUser(): User | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
  
  // Family
  static saveFamily(family: Family | null) {
    if (typeof window !== 'undefined') {
      if (family) {
        localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(family));
      } else {
        localStorage.removeItem(STORAGE_KEYS.FAMILY);
      }
    }
  }
  
  static getFamily(): Family | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.FAMILY);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
  
  // Tasks
  static saveTasks(tasks: Task[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    }
  }
  
  static getTasks(): Task[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
  
  // Rewards
  static saveRewards(rewards: Reward[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
    }
  }
  
  static getRewards(): Reward[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.REWARDS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
  
  // Transactions
  static saveTransactions(transactions: Transaction[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    }
  }
  
  static getTransactions(): Transaction[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }
  
  // Clear all
  static clearAll() {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  }
}


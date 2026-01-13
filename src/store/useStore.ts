import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppState,
  User,
  Task,
  Reward,
  Investment,
  Factory,
  Balance,
  Notification,
  Purchase,
  FundType,
  BuildingStage,
  TransactionHistory,
} from '../types';
import { FACTORY_STAGES, WEEKLY_PRODUCTION } from '../constants/funds';

const STORAGE_KEY = '@chokladpengar_store';

interface StoreActions {
  // Auth actions
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  
  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  completeTask: (id: string, childId: string) => void;
  approveTask: (id: string) => void;
  rejectTask: (id: string) => void;
  
  // Reward actions
  addReward: (reward: Reward) => void;
  updateReward: (id: string, updates: Partial<Reward>) => void;
  purchaseReward: (rewardId: string, childId: string) => void;
  
  // Balance actions
  getBalance: (childId: string) => number;
  addTransaction: (childId: string, transaction: Omit<TransactionHistory, 'id'>) => void;
  
  // Investment actions
  createInvestment: (childId: string, fundId: FundType, amount: number) => void;
  updateInvestmentValues: () => void;
  withdrawInvestment: (investmentId: string) => void;
  
  // Factory actions
  getFactory: (childId: string) => Factory | undefined;
  buildFactoryStage: (childId: string, stage: BuildingStage) => void;
  processFactoryProduction: () => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: (userId: string) => void;
  
  // Persistence
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
}

type Store = AppState & StoreActions;

export const useStore = create<Store>((set, get) => ({
  // Initial state
  currentUser: null,
  users: [],
  tasks: [],
  rewards: [],
  purchases: [],
  investments: [],
  factories: [],
  balances: [],
  notifications: [],

  // Auth actions
  setCurrentUser: (user) => {
    set({ currentUser: user });
    get().saveData();
  },

  addUser: (user) => {
    set((state) => {
      const users = [...state.users, user];
      // Initialize balance for child users
      const balances = user.role === 'child' 
        ? [...state.balances, { childId: user.id, amount: 0, history: [] }]
        : state.balances;
      // Initialize factory for child users
      const factories = user.role === 'child'
        ? [...state.factories, {
            childId: user.id,
            currentStage: null,
            completedStages: [],
            isComplete: false,
            weeklyProduction: WEEKLY_PRODUCTION,
            totalProduced: 0,
          }]
        : state.factories;
      return { users, balances, factories };
    });
    get().saveData();
  },

  // Task actions
  addTask: (task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
    // Notify child
    get().addNotification({
      userId: task.assignedTo,
      type: 'new_task',
      title: 'Ny uppgift!',
      message: `${task.title} - ${task.points} 🍫`,
      read: false,
      relatedId: task.id,
    });
    get().saveData();
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
    get().saveData();
  },

  completeTask: (id, childId) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    get().updateTask(id, {
      status: 'completed',
      completedAt: new Date(),
    });

    // Notify parent
    const parent = get().users.find((u) => u.role === 'parent' && u.familyId === task.createdBy);
    if (parent) {
      get().addNotification({
        userId: parent.id,
        type: 'new_task',
        title: 'Uppgift klar för granskning',
        message: `${task.title} väntar på godkännande`,
        read: false,
        relatedId: id,
      });
    }
  },

  approveTask: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    get().updateTask(id, { status: 'approved' });

    // Add chocolate money
    get().addTransaction(task.assignedTo, {
      type: 'earn',
      amount: task.points,
      description: `Uppgift: ${task.title}`,
      date: new Date(),
      relatedId: id,
    });

    // Notify child
    get().addNotification({
      userId: task.assignedTo,
      type: 'task_approved',
      title: 'Uppgift godkänd! 🎉',
      message: `Du tjänade ${task.points} 🍫`,
      read: false,
      relatedId: id,
    });

    get().saveData();
  },

  rejectTask: (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    get().updateTask(id, { status: 'rejected' });

    // Notify child
    get().addNotification({
      userId: task.assignedTo,
      type: 'task_rejected',
      title: 'Uppgift nekad',
      message: `${task.title} behöver göras om`,
      read: false,
      relatedId: id,
    });

    get().saveData();
  },

  // Reward actions
  addReward: (reward) => {
    set((state) => ({ rewards: [...state.rewards, reward] }));
    get().saveData();
  },

  updateReward: (id, updates) => {
    set((state) => ({
      rewards: state.rewards.map((reward) =>
        reward.id === id ? { ...reward, ...updates } : reward
      ),
    }));
    get().saveData();
  },

  purchaseReward: (rewardId, childId) => {
    const reward = get().rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    const balance = get().getBalance(childId);
    if (balance < reward.cost) return;

    // Deduct chocolate money
    get().addTransaction(childId, {
      type: 'spend',
      amount: -reward.cost,
      description: `Belöning: ${reward.title}`,
      date: new Date(),
      relatedId: rewardId,
    });

    // Add purchase
    const purchase: Purchase = {
      id: Date.now().toString(),
      rewardId,
      childId,
      cost: reward.cost,
      purchasedAt: new Date(),
      status: 'pending',
    };
    set((state) => ({ purchases: [...state.purchases, purchase] }));

    // Notify child and parent
    get().addNotification({
      userId: childId,
      type: 'reward_purchased',
      title: 'Belöning köpt! 🎁',
      message: `Du köpte ${reward.title}`,
      read: false,
      relatedId: rewardId,
    });

    const child = get().users.find((u) => u.id === childId);
    const parent = get().users.find((u) => u.role === 'parent' && u.familyId === child?.familyId);
    if (parent) {
      get().addNotification({
        userId: parent.id,
        type: 'reward_purchased',
        title: 'Belöning köpt',
        message: `${child?.name} köpte ${reward.title}`,
        read: false,
        relatedId: rewardId,
      });
    }

    get().saveData();
  },

  // Balance actions
  getBalance: (childId) => {
    const balance = get().balances.find((b) => b.childId === childId);
    return balance?.amount || 0;
  },

  addTransaction: (childId, transaction) => {
    set((state) => ({
      balances: state.balances.map((balance) =>
        balance.childId === childId
          ? {
              ...balance,
              amount: balance.amount + transaction.amount,
              history: [
                ...balance.history,
                { ...transaction, id: Date.now().toString() },
              ],
            }
          : balance
      ),
    }));
    get().saveData();
  },

  // Investment actions
  createInvestment: (childId, fundId, amount) => {
    const balance = get().getBalance(childId);
    if (balance < amount) return;

    // Deduct from balance
    get().addTransaction(childId, {
      type: 'invest',
      amount: -amount,
      description: `Investering i fond`,
      date: new Date(),
    });

    // Create investment
    const investment: Investment = {
      id: Date.now().toString(),
      childId,
      fundId,
      amount,
      currentValue: amount,
      investedAt: new Date(),
      history: [{
        date: new Date(),
        value: amount,
        change: 0,
        changePercent: 0,
      }],
    };

    set((state) => ({ investments: [...state.investments, investment] }));
    get().saveData();
  },

  updateInvestmentValues: () => {
    set((state) => ({
      investments: state.investments.map((investment) => {
        // Calculate return based on fund risk level
        let changePercent = 0;
        switch (investment.fundId) {
          case 'milk': // Low risk: 0-2%
            changePercent = Math.random() * 2;
            break;
          case 'nougat': // Medium risk: -3% to 5%
            changePercent = (Math.random() * 8) - 3;
            break;
          case 'gold': // High risk: -10% to 15%
            changePercent = (Math.random() * 25) - 10;
            break;
        }

        const change = investment.currentValue * (changePercent / 100);
        const newValue = Math.max(0, investment.currentValue + change);

        return {
          ...investment,
          currentValue: newValue,
          history: [
            ...investment.history,
            {
              date: new Date(),
              value: newValue,
              change,
              changePercent,
            },
          ],
        };
      }),
    }));

    // Notify users about investment updates
    get().investments.forEach((investment) => {
      get().addNotification({
        userId: investment.childId,
        type: 'investment_updated',
        title: 'Investering uppdaterad',
        message: 'Din fond har uppdaterats denna vecka',
        read: false,
        relatedId: investment.id,
      });
    });

    get().saveData();
  },

  withdrawInvestment: (investmentId) => {
    const investment = get().investments.find((i) => i.id === investmentId);
    if (!investment) return;

    // Add to balance
    get().addTransaction(investment.childId, {
      type: 'withdraw',
      amount: investment.currentValue,
      description: 'Uttag från fond',
      date: new Date(),
      relatedId: investmentId,
    });

    // Remove investment
    set((state) => ({
      investments: state.investments.filter((i) => i.id !== investmentId),
    }));

    get().saveData();
  },

  // Factory actions
  getFactory: (childId) => {
    return get().factories.find((f) => f.childId === childId);
  },

  buildFactoryStage: (childId, stage) => {
    const stageInfo = FACTORY_STAGES.find((s) => s.id === stage);
    if (!stageInfo) return;

    const balance = get().getBalance(childId);
    if (balance < stageInfo.cost) return;

    // Deduct cost
    get().addTransaction(childId, {
      type: 'spend',
      amount: -stageInfo.cost,
      description: `Fabrikssteg: ${stageInfo.name}`,
      date: new Date(),
    });

    // Update factory
    set((state) => ({
      factories: state.factories.map((factory) =>
        factory.childId === childId
          ? {
              ...factory,
              currentStage: stage,
              completedStages: [...factory.completedStages, stage],
              isComplete: stage === 'grandOpening',
            }
          : factory
      ),
    }));

    // Check if next stage is available
    const nextStage = FACTORY_STAGES.find((s) => s.order === stageInfo.order + 1);
    if (nextStage) {
      get().addNotification({
        userId: childId,
        type: 'new_stage_available',
        title: 'Nytt fabrikssteg tillgängligt!',
        message: `Du kan nu bygga: ${nextStage.name}`,
        read: false,
      });
    } else {
      // Factory complete!
      get().addNotification({
        userId: childId,
        type: 'factory_production',
        title: 'Grattis! 🏭🎉',
        message: 'Din fabrik är klar och börjar producera chokladpengar!',
        read: false,
      });
    }

    get().saveData();
  },

  processFactoryProduction: () => {
    const now = new Date();

    set((state) => ({
      factories: state.factories.map((factory) => {
        if (!factory.isComplete) return factory;

        const lastProduction = factory.lastProductionDate
          ? new Date(factory.lastProductionDate)
          : new Date(0);

        const daysSinceProduction = Math.floor(
          (now.getTime() - lastProduction.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceProduction >= 7) {
          // Produce chocolate money
          get().addTransaction(factory.childId, {
            type: 'factory_production',
            amount: factory.weeklyProduction,
            description: 'Fabriksproduktion',
            date: now,
          });

          // Notify child
          get().addNotification({
            userId: factory.childId,
            type: 'factory_production',
            title: 'Fabriksproduktion! 🏭',
            message: `Din fabrik producerade ${factory.weeklyProduction} 🍫`,
            read: false,
          });

          return {
            ...factory,
            lastProductionDate: now,
            totalProduced: factory.totalProduced + factory.weeklyProduction,
          };
        }

        return factory;
      }),
    }));

    get().saveData();
  },

  // Notification actions
  addNotification: (notification) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
          createdAt: new Date(),
        },
      ],
    }));
    get().saveData();
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
    }));
    get().saveData();
  },

  clearNotifications: (userId) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.userId !== userId),
    }));
    get().saveData();
  },

  // Persistence
  loadData: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsedData = JSON.parse(data);
        set(parsedData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  },

  saveData: async () => {
    try {
      const state = get();
      const dataToSave = {
        currentUser: state.currentUser,
        users: state.users,
        tasks: state.tasks,
        rewards: state.rewards,
        purchases: state.purchases,
        investments: state.investments,
        factories: state.factories,
        balances: state.balances,
        notifications: state.notifications,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  },
}));



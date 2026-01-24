import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  User,
  Family,
  Task,
  Reward,
  Investment,
  Factory,
  Transaction,
  Notification,
  Balance,
} from '../types';
import { FUNDS } from '../constants/funds';

interface AppState {
  // Auth
  currentUser: User | null;
  users: User[];
  families: Family[];

  // Data
  tasks: Task[];
  rewards: Reward[];
  investments: Investment[];
  factories: Factory[];
  balances: Balance[];
  transactions: Transaction[];
  notifications: Notification[];

  // Auth Actions
  login: (userId: string, pin?: string) => boolean;
  logout: () => void;
  createFamily: (familyName: string, parentName: string, pin: string) => string;
  addChild: (familyId: string, name: string, pin: string) => string;
  addParent: (familyId: string, name: string, pin: string) => string;

  // Task Actions
  createTask: (
    title: string,
    description: string,
    points: number,
    assignedTo: string,
    deadline?: string,
    recurring?: Task['recurring'],
  ) => void;
  completeTask: (taskId: string) => void;
  approveTask: (taskId: string) => void;
  rejectTask: (taskId: string) => void;

  // Reward Actions
  createReward: (
    title: string,
    description: string,
    cost: number,
    category: string,
  ) => void;
  purchaseReward: (rewardId: string) => boolean;

  // Investment Actions
  invest: (fundType: 'milk' | 'nougat' | 'gold', amount: number) => boolean;
  withdrawInvestment: (investmentId: string) => void;
  updateInvestments: () => void;

  // Factory Actions
  buildFactoryStep: () => boolean;
  collectFactoryIncome: () => void;

  // Balance Actions
  getBalance: (userId: string) => number;
  addTransaction: (
    userId: string,
    type: Transaction['type'],
    amount: number,
    description: string,
    relatedId?: string,
  ) => void;

  // Notification Actions
  addNotification: (
    userId: string,
    title: string,
    message: string,
    type: Notification['type'],
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const createNotification = (
  userId: string,
  title: string,
  message: string,
  type: Notification['type']
): Notification => ({
  id: Date.now().toString(),
  userId,
  title,
  message,
  type,
  isRead: false,
  timestamp: new Date().toISOString(),
});

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentUser: null,
      users: [],
      families: [],
      tasks: [],
      rewards: [],
      investments: [],
      factories: [],
      balances: [],
      transactions: [],
      notifications: [],

      // Auth Actions
      login: (userId: string, pin?: string) => {
        const user = get().users.find((u) => u.id === userId);
        if (!user) return false;
        if (user.pin && pin && user.pin !== pin) return false;

        set({ currentUser: user });
        return true;
      },

      logout: () => {
        set({ currentUser: null });
      },

      createFamily: (familyName: string, parentName: string, pin: string) => {
        const familyId = Date.now().toString();
        const parentId = `parent-${Date.now()}`;

        const newFamily: Family = {
          id: familyId,
          name: familyName,
          parentIds: [parentId],
          childIds: [],
          createdAt: new Date().toISOString(),
        };

        const newParent: User = {
          id: parentId,
          name: parentName,
          role: 'parent',
          familyId,
          pin,
        };

        set((state) => ({
          families: [...state.families, newFamily],
          users: [...state.users, newParent],
        }));

        return familyId;
      },

      addChild: (familyId: string, name: string, pin: string) => {
        const childId = `child-${Date.now()}`;

        const newChild: User = {
          id: childId,
          name,
          role: 'child',
          familyId,
          pin,
        };

        const newBalance: Balance = {
          userId: childId,
          amount: 0,
        };

        const newFactory: Factory = {
          id: `factory-${childId}`,
          userId: childId,
          currentStep: 0,
          totalSteps: 6,
          isComplete: false,
          weeklyIncome: 0,
          totalInvested: 0,
        };

        set((state) => ({
          users: [...state.users, newChild],
          balances: [...state.balances, newBalance],
          factories: [...state.factories, newFactory],
          families: state.families.map((f) =>
            f.id === familyId ? { ...f, childIds: [...f.childIds, childId] } : f
          ),
        }));

        return childId;
      },

      addParent: (familyId: string, name: string, pin: string) => {
        const parentId = `parent-${Date.now()}`;

        const newParent: User = {
          id: parentId,
          name,
          role: 'parent',
          familyId,
          pin,
        };

        set((state) => ({
          users: [...state.users, newParent],
          families: state.families.map((f) =>
            f.id === familyId ? { ...f, parentIds: [...f.parentIds, parentId] } : f
          ),
        }));

        return parentId;
      },

      // Task Actions
      createTask: (title, description, points, assignedTo, deadline, recurring) => {
        const user = get().currentUser;
        if (!user || user.role !== 'parent') return;

        const newTask: Task = {
          id: Date.now().toString(),
          title,
          description,
          points,
          status: 'pending',
          createdBy: user.id,
          assignedTo,
          familyId: user.familyId,
          deadline,
          recurring,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));

        get().addNotification(
          assignedTo,
          'Ny uppgift!',
          `Du har fått en ny uppgift: ${title}`,
          'task'
        );
      },

      completeTask: (taskId) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (!task) return;

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
              : t
          ),
        }));

        // Notify parent
        const family = get().families.find((f) => f.id === task.familyId);
        if (family) {
          family.parentIds.forEach((parentId) => {
            get().addNotification(
              parentId,
              'Uppgift klar!',
              `${get().users.find((u) => u.id === task.assignedTo)?.name} har slutfört: ${
                task.title
              }`,
              'task'
            );
          });
        }
      },

      approveTask: (taskId) => {
        const task = get().tasks.find((t) => t.id === taskId);
        if (!task) return;

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'approved' } : t
          ),
        }));

        get().addTransaction(
          task.assignedTo,
          'earn',
          task.points,
          `Godkänd uppgift: ${task.title}`,
          taskId
        );

        get().addNotification(
          task.assignedTo,
          'Uppgift godkänd! 🎉',
          `Du fick ${task.points} chokladpengar för: ${task.title}`,
          'task'
        );

        // Play "ca-ching" sound (vibration in web)
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([50, 50, 50]);
        }
      },

      rejectTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: 'rejected' } : t
          ),
        }));

        const task = get().tasks.find((t) => t.id === taskId);
        if (task) {
          get().addNotification(
            task.assignedTo,
            'Uppgift ej godkänd',
            `Din uppgift "${task.title}" behöver göras om`,
            'task'
          );
        }
      },

      // Reward Actions
      createReward: (title, description, cost, category) => {
        const user = get().currentUser;
        if (!user || user.role !== 'parent') return;

        const newReward: Reward = {
          id: Date.now().toString(),
          title,
          description,
          cost,
          category,
          familyId: user.familyId,
          createdBy: user.id,
        };

        set((state) => ({
          rewards: [...state.rewards, newReward],
        }));
      },

      purchaseReward: (rewardId) => {
        const user = get().currentUser;
        const reward = get().rewards.find((r) => r.id === rewardId);
        if (!user || !reward) return false;

        const balance = get().getBalance(user.id);
        if (balance < reward.cost) return false;

        get().addTransaction(
          user.id,
          'spend',
          -reward.cost,
          `Köpte: ${reward.title}`,
          rewardId
        );

        get().addNotification(
          user.id,
          'Belöning köpt!',
          `Du köpte: ${reward.title}`,
          'reward'
        );

        // Notify parents
        const family = get().families.find((f) => f.id === user.familyId);
        if (family) {
          family.parentIds.forEach((parentId) => {
            get().addNotification(
              parentId,
              'Belöning köpt',
              `${user.name} köpte: ${reward.title}`,
              'reward'
            );
          });
        }

        return true;
      },

      // Investment Actions
      invest: (fundType, amount) => {
        const user = get().currentUser;
        if (!user || user.role !== 'child') return false;

        const balance = get().getBalance(user.id);
        if (balance < amount || amount < 10) return false;

        const newInvestment: Investment = {
          id: Date.now().toString(),
          userId: user.id,
          fundType,
          amount,
          startDate: new Date().toISOString(),
          currentValue: amount,
          totalReturn: 0,
        };

        set((state) => ({
          investments: [...state.investments, newInvestment],
        }));

        get().addTransaction(
          user.id,
          'invest',
          -amount,
          `Investerade i ${FUNDS[fundType].name}`,
          newInvestment.id
        );

        get().addNotification(
          user.id,
          'Investering gjord!',
          `Du investerade ${amount} chokladpengar i ${FUNDS[fundType].name}`,
          'investment'
        );

        return true;
      },

      withdrawInvestment: (investmentId) => {
        const investment = get().investments.find((i) => i.id === investmentId);
        if (!investment) return;

        get().addTransaction(
          investment.userId,
          'withdraw',
          investment.currentValue,
          `Uttag från ${FUNDS[investment.fundType].name}`,
          investmentId
        );

        set((state) => ({
          investments: state.investments.filter((i) => i.id !== investmentId),
        }));

        get().addNotification(
          investment.userId,
          'Uttag genomfört',
          `Du tog ut ${Math.round(investment.currentValue)} chokladpengar`,
          'investment'
        );
      },

      updateInvestments: () => {
        set((state) => ({
          investments: state.investments.map((inv) => {
            const fund = FUNDS[inv.fundType];
            const returnRate =
              Math.random() * (fund.maxReturn - fund.minReturn) + fund.minReturn;
            const weeklyReturn = inv.currentValue * returnRate;
            const newValue = Math.max(0, inv.currentValue + weeklyReturn);

            return {
              ...inv,
              currentValue: newValue,
              totalReturn: inv.totalReturn + weeklyReturn,
            };
          }),
        }));
      },

      // Factory Actions
      buildFactoryStep: () => {
        const user = get().currentUser;
        if (!user || user.role !== 'child') return false;

        const factory = get().factories.find((f) => f.userId === user.id);
        if (!factory || factory.isComplete) return false;

        const stepCosts = [50, 100, 150, 200, 250, 300];
        const cost = stepCosts[factory.currentStep];

        const balance = get().getBalance(user.id);
        if (balance < cost) return false;

        const newStep = factory.currentStep + 1;
        const isComplete = newStep >= factory.totalSteps;

        set((state) => ({
          factories: state.factories.map((f) =>
            f.userId === user.id
              ? {
                  ...f,
                  currentStep: newStep,
                  isComplete,
                  weeklyIncome: isComplete ? 1 : 0,
                  totalInvested: f.totalInvested + cost,
                }
              : f
          ),
        }));

        get().addTransaction(
          user.id,
          'spend',
          -cost,
          `Byggde steg ${newStep} i chokladfabriken`
        );

        if (isComplete) {
          get().addNotification(
            user.id,
            'Chokladfabriken klar! 🏭',
            'Din fabrik producerar nu 1 chokladpeng per vecka!',
            'factory'
          );
        } else {
          get().addNotification(
            user.id,
            'Fabrikssteg byggt!',
            `Steg ${newStep}/${factory.totalSteps} klart!`,
            'factory'
          );
        }

        return true;
      },

      collectFactoryIncome: () => {
        const user = get().currentUser;
        if (!user || user.role !== 'child') return;

        const factory = get().factories.find((f) => f.userId === user.id);
        if (!factory || !factory.isComplete) return;

        get().addTransaction(
          user.id,
          'passive',
          factory.weeklyIncome,
          'Veckovinst från chokladfabriken'
        );

        get().addNotification(
          user.id,
          'Fabriksvinst!',
          `Du fick ${factory.weeklyIncome} chokladpengar från din fabrik`,
          'factory'
        );
      },

      // Balance Actions
      getBalance: (userId) => {
        const transactions = get().transactions.filter((t) => t.userId === userId);
        return transactions.reduce((sum, t) => sum + t.amount, 0);
      },

      addTransaction: (userId, type, amount, description, relatedId) => {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          userId,
          type,
          amount,
          description,
          timestamp: new Date().toISOString(),
          relatedId,
        };

        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },

      // Notification Actions
      addNotification: (userId, title, message, type) => {
        const notification = createNotification(userId, title, message, type);
        set((state) => ({
          notifications: [...state.notifications, notification],
        }));
      },

      markNotificationAsRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
        }));
      },
    }),
    {
      name: 'chokladpengar-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


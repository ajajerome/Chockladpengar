import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  onValue,
  off,
  query,
  orderByChild,
  equalTo,
  DataSnapshot,
} from 'firebase/database';
import { database } from '@/lib/firebase';

// Guard for server-side rendering
function getDatabase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase is only available on the client side');
  }
  if (!database) {
    throw new Error('Firebase database not initialized');
  }
  return database;
}
import type {
  Family,
  User,
  Child,
  Parent,
  Task,
  Reward,
  PurchasedReward,
  Investment,
  OwnedFactory,
  Transaction,
  Fund,
} from '@/types';

export class FirebaseService {
  // ============= FAMILIES =============
  
  static async createFamily(familyData: Omit<Family, 'id' | 'createdAt'>): Promise<Family> {
    const db = getDatabase();
    const familiesRef = ref(db, 'families');
    const newFamilyRef = push(familiesRef);
    
    const family: Family = {
      ...familyData,
      id: newFamilyRef.key!,
      createdAt: new Date().toISOString(),
    };
    
    await set(newFamilyRef, family);
    return family;
  }
  
  static async getFamily(familyId: string): Promise<Family | null> {
    const db = getDatabase();
    const familyRef = ref(db, `families/${familyId}`);
    const snapshot = await get(familyRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static async getFamilyByCode(code: string): Promise<Family | null> {
    const db = getDatabase();
    const familiesRef = ref(db, 'families');
    const familyQuery = query(familiesRef, orderByChild('code'), equalTo(code));
    const snapshot = await get(familyQuery);
    
    if (snapshot.exists()) {
      const families = snapshot.val();
      const familyId = Object.keys(families)[0];
      return { ...families[familyId], id: familyId };
    }
    return null;
  }
  
  static async updateFamily(familyId: string, updates: Partial<Family>) {
    const db = getDatabase();
    await update(ref(db, `families/${familyId}`), updates);
  }
  
  static listenToFamily(familyId: string, callback: (family: Family | null) => void) {
    const familyRef = ref(database, `families/${familyId}`);
    onValue(familyRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    // Return unsubscribe function
    return () => off(familyRef);
  }
  
  // ============= USERS =============
  
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    
    const user: User = {
      ...userData,
      id: newUserRef.key!,
      createdAt: new Date().toISOString(),
    };
    
    await set(newUserRef, user);
    return user;
  }
  
  static async createChild(
    childData: Omit<Child, 'id' | 'createdAt' | 'role' | 'balance'>
  ): Promise<Child> {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    
    const child: Child = {
      ...childData,
      id: newUserRef.key!,
      role: 'child',
      balance: 0,
      createdAt: new Date().toISOString(),
    };
    
    await set(newUserRef, child);
    
    // Update parent's children array
    await this.addChildToParent(childData.parentId, child.id);
    
    return child;
  }
  
  static async createParent(
    parentData: Omit<Parent, 'id' | 'createdAt' | 'role' | 'children'>
  ): Promise<Parent> {
    const usersRef = ref(database, 'users');
    const newUserRef = push(usersRef);
    
    const parent: Parent = {
      ...parentData,
      id: newUserRef.key!,
      role: 'parent',
      children: [],
      createdAt: new Date().toISOString(),
    };
    
    await set(newUserRef, parent);
    return parent;
  }
  
  private static async addChildToParent(parentId: string, childId: string) {
    const parent = await this.getUser(parentId) as Parent;
    if (parent && parent.role === 'parent') {
      const children = parent.children || [];
      await update(ref(database, `users/${parentId}`), {
        children: [...children, childId],
      });
    }
  }
  
  static async getUser(userId: string): Promise<User | null> {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static async getFamilyMembers(familyId: string): Promise<User[]> {
    const usersRef = ref(database, 'users');
    const usersQuery = query(usersRef, orderByChild('familyId'), equalTo(familyId));
    const snapshot = await get(usersQuery);
    
    if (snapshot.exists()) {
      const users = snapshot.val();
      return Object.keys(users).map(id => ({ ...users[id], id }));
    }
    return [];
  }
  
  static async updateUserBalance(userId: string, amount: number) {
    const user = await this.getUser(userId);
    if (user && user.role === 'child') {
      const child = user as Child;
      await update(ref(database, `users/${userId}`), {
        balance: (child.balance || 0) + amount,
      });
    }
  }
  
  static listenToUser(userId: string, callback: (user: User | null) => void) {
    const userRef = ref(database, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    return () => off(userRef);
  }
  
  static listenToFamilyMembers(familyId: string, callback: (users: User[]) => void) {
    const usersRef = ref(database, 'users');
    const usersQuery = query(usersRef, orderByChild('familyId'), equalTo(familyId));
    
    onValue(usersQuery, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        callback(Object.keys(users).map(id => ({ ...users[id], id })));
      } else {
        callback([]);
      }
    });
    
    return () => off(usersQuery);
  }
  
  // ============= TASKS =============
  
  static async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'status'>): Promise<Task> {
    const tasksRef = ref(database, 'tasks');
    const newTaskRef = push(tasksRef);
    
    const task: Task = {
      ...taskData,
      id: newTaskRef.key!,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    await set(newTaskRef, task);
    return task;
  }
  
  static async updateTask(taskId: string, updates: Partial<Task>) {
    await update(ref(database, `tasks/${taskId}`), updates);
  }
  
  static async deleteTask(taskId: string) {
    await remove(ref(database, `tasks/${taskId}`));
  }
  
  static async getFamilyTasks(familyId: string): Promise<Task[]> {
    const tasksRef = ref(database, 'tasks');
    const tasksQuery = query(tasksRef, orderByChild('familyId'), equalTo(familyId));
    const snapshot = await get(tasksQuery);
    
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      return Object.keys(tasks).map(id => ({ ...tasks[id], id }));
    }
    return [];
  }
  
  static async approveTask(taskId: string, childId: string) {
    const task = await this.getTask(taskId);
    if (task && task.status === 'in_review') {
      await this.updateTask(taskId, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
      });
      
      // Add reward to child's balance
      await this.updateUserBalance(childId, task.reward);
      
      // Create transaction
      await this.createTransaction({
        userId: childId,
        type: 'task_reward',
        amount: task.reward,
        description: `Belöning för: ${task.title}`,
        relatedId: taskId,
      });
      
      // If frequency is once, we can delete or mark as complete
      if (task.frequency === 'once') {
        await this.deleteTask(taskId);
      } else {
        // Reset to pending for recurring tasks
        await this.updateTask(taskId, { status: 'pending' });
      }
    }
  }
  
  static async rejectTask(taskId: string) {
    await this.updateTask(taskId, {
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
    });
    
    // Reset to pending after rejection
    setTimeout(async () => {
      await this.updateTask(taskId, { status: 'pending' });
    }, 1000);
  }
  
  static async getTask(taskId: string): Promise<Task | null> {
    const taskRef = ref(database, `tasks/${taskId}`);
    const snapshot = await get(taskRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static listenToFamilyTasks(familyId: string, callback: (tasks: Task[]) => void) {
    const tasksRef = ref(database, 'tasks');
    const tasksQuery = query(tasksRef, orderByChild('familyId'), equalTo(familyId));
    
    onValue(tasksQuery, (snapshot) => {
      if (snapshot.exists()) {
        const tasks = snapshot.val();
        callback(Object.keys(tasks).map(id => ({ ...tasks[id], id })));
      } else {
        callback([]);
      }
    });
    
    return () => off(tasksQuery);
  }
  
  // ============= REWARDS =============
  
  static async createReward(rewardData: Omit<Reward, 'id' | 'createdAt' | 'status'>): Promise<Reward> {
    const rewardsRef = ref(database, 'rewards');
    const newRewardRef = push(rewardsRef);
    
    const reward: Reward = {
      ...rewardData,
      id: newRewardRef.key!,
      status: 'available',
      createdAt: new Date().toISOString(),
    };
    
    await set(newRewardRef, reward);
    return reward;
  }
  
  static async getFamilyRewards(familyId: string): Promise<Reward[]> {
    const rewardsRef = ref(database, 'rewards');
    const rewardsQuery = query(rewardsRef, orderByChild('familyId'), equalTo(familyId));
    const snapshot = await get(rewardsQuery);
    
    if (snapshot.exists()) {
      const rewards = snapshot.val();
      return Object.keys(rewards).map(id => ({ ...rewards[id], id }));
    }
    return [];
  }
  
  static async purchaseReward(rewardId: string, childId: string) {
    const reward = await this.getReward(rewardId);
    const child = await this.getUser(childId) as Child;
    
    if (!reward || !child || child.role !== 'child') {
      throw new Error('Invalid reward or child');
    }
    
    if (child.balance < reward.cost) {
      throw new Error('Insufficient balance');
    }
    
    // Deduct cost from balance
    await this.updateUserBalance(childId, -reward.cost);
    
    // Create purchased reward
    const purchasedRewardsRef = ref(database, 'purchasedRewards');
    const newPurchaseRef = push(purchasedRewardsRef);
    
    const purchase: PurchasedReward = {
      id: newPurchaseRef.key!,
      rewardId,
      childId,
      purchasedAt: new Date().toISOString(),
      status: 'purchased',
    };
    
    await set(newPurchaseRef, purchase);
    
    // Create transaction
    await this.createTransaction({
      userId: childId,
      type: 'purchase',
      amount: -reward.cost,
      description: `Köpte: ${reward.title}`,
      relatedId: rewardId,
    });
  }
  
  static async getReward(rewardId: string): Promise<Reward | null> {
    const rewardRef = ref(database, `rewards/${rewardId}`);
    const snapshot = await get(rewardRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static listenToFamilyRewards(familyId: string, callback: (rewards: Reward[]) => void) {
    const rewardsRef = ref(database, 'rewards');
    const rewardsQuery = query(rewardsRef, orderByChild('familyId'), equalTo(familyId));
    
    onValue(rewardsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const rewards = snapshot.val();
        callback(Object.keys(rewards).map(id => ({ ...rewards[id], id })));
      } else {
        callback([]);
      }
    });
    
    return () => off(rewardsQuery);
  }
  
  // ============= TRANSACTIONS =============
  
  static async createTransaction(
    transactionData: Omit<Transaction, 'id' | 'timestamp'>
  ): Promise<Transaction> {
    const transactionsRef = ref(database, 'transactions');
    const newTransactionRef = push(transactionsRef);
    
    const transaction: Transaction = {
      ...transactionData,
      id: newTransactionRef.key!,
      timestamp: new Date().toISOString(),
    };
    
    await set(newTransactionRef, transaction);
    return transaction;
  }
  
  static async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactionsRef = ref(database, 'transactions');
    const transactionsQuery = query(transactionsRef, orderByChild('userId'), equalTo(userId));
    const snapshot = await get(transactionsQuery);
    
    if (snapshot.exists()) {
      const transactions = snapshot.val();
      return Object.keys(transactions)
        .map(id => ({ ...transactions[id], id }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return [];
  }
  
  static listenToUserTransactions(userId: string, callback: (transactions: Transaction[]) => void) {
    const transactionsRef = ref(database, 'transactions');
    const transactionsQuery = query(transactionsRef, orderByChild('userId'), equalTo(userId));
    
    onValue(transactionsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const transactions = snapshot.val();
        const sortedTransactions = Object.keys(transactions)
          .map(id => ({ ...transactions[id], id }))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        callback(sortedTransactions);
      } else {
        callback([]);
      }
    });
    
    return () => off(transactionsQuery);
  }
}


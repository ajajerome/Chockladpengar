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
import { database, initError } from '@/lib/firebase';

// Guard for server-side rendering
function getDatabase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase är endast tillgängligt på klientsidan');
  }
  if (!database) {
    const errorMsg = initError || 'Firebase-databasen är inte initierad. Kör appen i local mode istället.';
    console.warn('⚠️ Firebase-varning:', errorMsg);
    throw new Error(errorMsg);
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
      const familyIds = Object.keys(families);
      
      if (familyIds.length === 0) {
        return null;
      }
      
      const familyId = familyIds[0];
      return { ...families[familyId], id: familyId };
    }
    return null;
  }
  
  static async updateFamily(familyId: string, updates: Partial<Family>) {
    const db = getDatabase();
    await update(ref(db, `families/${familyId}`), updates);
  }
  
  static listenToFamily(familyId: string, callback: (family: Family | null) => void) {
    const db = getDatabase();
    const familyRef = ref(db, `families/${familyId}`);
    onValue(familyRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    // Return unsubscribe function
    return () => off(familyRef);
  }
  
  // ============= USERS =============
  
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const usersRef = ref(getDatabase(), 'users');
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
    const usersRef = ref(getDatabase(), 'users');
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
    const usersRef = ref(getDatabase(), 'users');
    const newUserRef = push(usersRef);
    
    const parent: Parent = {
      ...parentData,
      id: newUserRef.key!,
      role: 'parent',
      children: [],
      pin: parentData.pin,
      createdAt: new Date().toISOString(),
    };
    
    await set(newUserRef, parent);
    return parent;
  }
  
  private static async addChildToParent(parentId: string, childId: string) {
    const parent = await this.getUser(parentId) as Parent;
    if (parent && parent.role === 'parent') {
      const children = parent.children || [];
      await update(ref(getDatabase(), `users/${parentId}`), {
        children: [...children, childId],
      });
    }
  }
  
  static async deleteChild(childId: string) {
    try {
      const db = getDatabase();
      const child = await this.getUser(childId) as Child;
      
      if (!child || child.role !== 'child') {
        throw new Error('Användare är inte ett barn');
      }
      
      // Ta bort barnet från förälderns children-array
      const parent = await this.getUser(child.parentId) as Parent;
      if (parent && parent.role === 'parent') {
        const children = (parent.children || []).filter(id => id !== childId);
        await update(ref(db, `users/${child.parentId}`), { children });
      }
      
      // Ta bort barnets uppgifter
      const tasks = await this.getFamilyTasks(child.familyId);
      for (const task of tasks) {
        if (task.assignedTo === childId) {
          await remove(ref(db, `tasks/${task.id}`));
        }
      }
      
      // Ta bort barnets transaktioner
      const transactionsRef = ref(db, 'transactions');
      const transactionsQuery = query(transactionsRef, orderByChild('userId'), equalTo(childId));
      const transactionsSnapshot = await get(transactionsQuery);
      if (transactionsSnapshot.exists()) {
        const transactions = transactionsSnapshot.val();
        for (const txId of Object.keys(transactions)) {
          await remove(ref(db, `transactions/${txId}`));
        }
      }
      
      // Ta bort barnets investeringar
      const investmentsRef = ref(db, 'investments');
      const investmentsQuery = query(investmentsRef, orderByChild('childId'), equalTo(childId));
      const investmentsSnapshot = await get(investmentsQuery);
      if (investmentsSnapshot.exists()) {
        const investments = investmentsSnapshot.val();
        for (const invId of Object.keys(investments)) {
          await remove(ref(db, `investments/${invId}`));
        }
      }
      
      // Ta bort barnets fabriker
      const factoriesRef = ref(db, 'ownedFactories');
      const factoriesQuery = query(factoriesRef, orderByChild('childId'), equalTo(childId));
      const factoriesSnapshot = await get(factoriesQuery);
      if (factoriesSnapshot.exists()) {
        const factories = factoriesSnapshot.val();
        for (const factId of Object.keys(factories)) {
          await remove(ref(db, `ownedFactories/${factId}`));
        }
      }
      
      // Ta bort barnets köpta belöningar
      const purchasedRef = ref(db, 'purchasedRewards');
      const purchasedQuery = query(purchasedRef, orderByChild('childId'), equalTo(childId));
      const purchasedSnapshot = await get(purchasedQuery);
      if (purchasedSnapshot.exists()) {
        const purchased = purchasedSnapshot.val();
        for (const prId of Object.keys(purchased)) {
          await remove(ref(db, `purchasedRewards/${prId}`));
        }
      }
      
      // Till sist, ta bort själva barnet
      await remove(ref(db, `users/${childId}`));
    } catch (error) {
      console.error('Error deleting child:', error);
      throw error;
    }
  }
  
  static async getUser(userId: string): Promise<User | null> {
    const userRef = ref(getDatabase(), `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static async getFamilyMembers(familyId: string): Promise<User[]> {
    const usersRef = ref(getDatabase(), 'users');
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
      await update(ref(getDatabase(), `users/${userId}`), {
        balance: (child.balance || 0) + amount,
      });
    }
  }
  
  static listenToUser(userId: string, callback: (user: User | null) => void) {
    const userRef = ref(getDatabase(), `users/${userId}`);
    onValue(userRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
    
    return () => off(userRef);
  }
  
  static listenToFamilyMembers(familyId: string, callback: (users: User[]) => void) {
    const usersRef = ref(getDatabase(), 'users');
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
    const tasksRef = ref(getDatabase(), 'tasks');
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
    await update(ref(getDatabase(), `tasks/${taskId}`), updates);
  }
  
  static async deleteTask(taskId: string) {
    await remove(ref(getDatabase(), `tasks/${taskId}`));
  }
  
  static async getFamilyTasks(familyId: string): Promise<Task[]> {
    const tasksRef = ref(getDatabase(), 'tasks');
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
    const taskRef = ref(getDatabase(), `tasks/${taskId}`);
    const snapshot = await get(taskRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static listenToFamilyTasks(familyId: string, callback: (tasks: Task[]) => void) {
    const tasksRef = ref(getDatabase(), 'tasks');
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
    const rewardsRef = ref(getDatabase(), 'rewards');
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
    const rewardsRef = ref(getDatabase(), 'rewards');
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
    const purchasedRewardsRef = ref(getDatabase(), 'purchasedRewards');
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
    const rewardRef = ref(getDatabase(), `rewards/${rewardId}`);
    const snapshot = await get(rewardRef);
    return snapshot.exists() ? snapshot.val() : null;
  }
  
  static listenToFamilyRewards(familyId: string, callback: (rewards: Reward[]) => void) {
    const rewardsRef = ref(getDatabase(), 'rewards');
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
  
  static async deleteReward(rewardId: string) {
    await remove(ref(getDatabase(), `rewards/${rewardId}`));
  }
  
  // ============= PURCHASED REWARDS =============
  
  static async getFamilyPurchasedRewards(familyId: string): Promise<PurchasedReward[]> {
    // Get all family members first
    const members = await this.getFamilyMembers(familyId);
    const childIds = members.filter(m => m.role === 'child').map(m => m.id);
    
    const purchasedRewardsRef = ref(getDatabase(), 'purchasedRewards');
    const snapshot = await get(purchasedRewardsRef);
    
    if (snapshot.exists()) {
      const allPurchases = snapshot.val();
      const familyPurchases = Object.keys(allPurchases)
        .map(id => ({ ...allPurchases[id], id }))
        .filter((purchase: PurchasedReward) => childIds.includes(purchase.childId))
        .sort((a: PurchasedReward, b: PurchasedReward) => 
          new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime()
        );
      return familyPurchases;
    }
    return [];
  }
  
  static listenToFamilyPurchasedRewards(familyId: string, callback: (purchases: PurchasedReward[]) => void) {
    const purchasedRewardsRef = ref(getDatabase(), 'purchasedRewards');
    
    onValue(purchasedRewardsRef, async (snapshot) => {
      if (snapshot.exists()) {
        // Get family members to filter purchases
        const members = await this.getFamilyMembers(familyId);
        const childIds = members.filter(m => m.role === 'child').map(m => m.id);
        
        const allPurchases = snapshot.val();
        const familyPurchases = Object.keys(allPurchases)
          .map(id => ({ ...allPurchases[id], id }))
          .filter((purchase: PurchasedReward) => childIds.includes(purchase.childId))
          .sort((a: PurchasedReward, b: PurchasedReward) => 
            new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime()
          );
        callback(familyPurchases);
      } else {
        callback([]);
      }
    });
    
    return () => off(purchasedRewardsRef);
  }
  
  // ============= TRANSACTIONS =============
  
  static async createTransaction(
    transactionData: Omit<Transaction, 'id' | 'timestamp'>
  ): Promise<Transaction> {
    const transactionsRef = ref(getDatabase(), 'transactions');
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
    const transactionsRef = ref(getDatabase(), 'transactions');
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
    const transactionsRef = ref(getDatabase(), 'transactions');
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
  
  // ============= INVESTMENTS =============
  
  static async createInvestment(investmentData: Omit<Investment, 'id'>): Promise<Investment> {
    const investmentsRef = ref(getDatabase(), 'investments');
    const newInvestmentRef = push(investmentsRef);
    
    const investment: Investment = {
      ...investmentData,
      id: newInvestmentRef.key!,
    };
    
    await set(newInvestmentRef, investment);
    return investment;
  }
  
  static async getChildInvestments(childId: string): Promise<Investment[]> {
    const investmentsRef = ref(getDatabase(), 'investments');
    const investmentsQuery = query(investmentsRef, orderByChild('childId'), equalTo(childId));
    const snapshot = await get(investmentsQuery);
    
    if (snapshot.exists()) {
      const investments = snapshot.val();
      return Object.keys(investments).map(id => ({ ...investments[id], id }));
    }
    return [];
  }
  
  static async updateInvestment(investmentId: string, updates: Partial<Investment>) {
    await update(ref(getDatabase(), `investments/${investmentId}`), updates);
  }
  
  static async deleteInvestment(investmentId: string) {
    await remove(ref(getDatabase(), `investments/${investmentId}`));
  }
  
  static listenToChildInvestments(childId: string, callback: (investments: Investment[]) => void) {
    const investmentsRef = ref(getDatabase(), 'investments');
    const investmentsQuery = query(investmentsRef, orderByChild('childId'), equalTo(childId));
    
    onValue(investmentsQuery, (snapshot) => {
      if (snapshot.exists()) {
        const investments = snapshot.val();
        callback(Object.keys(investments).map(id => ({ ...investments[id], id })));
      } else {
        callback([]);
      }
    });
    
    return () => off(investmentsQuery);
  }
  
  // ============= OWNED FACTORIES =============
  
  static async createOwnedFactory(factoryData: Omit<OwnedFactory, 'id'>): Promise<OwnedFactory> {
    const factoriesRef = ref(getDatabase(), 'ownedFactories');
    const newFactoryRef = push(factoriesRef);
    
    const factory: OwnedFactory = {
      ...factoryData,
      id: newFactoryRef.key!,
    };
    
    await set(newFactoryRef, factory);
    return factory;
  }
  
  static async getChildFactories(childId: string): Promise<OwnedFactory[]> {
    const factoriesRef = ref(getDatabase(), 'ownedFactories');
    const factoriesQuery = query(factoriesRef, orderByChild('childId'), equalTo(childId));
    const snapshot = await get(factoriesQuery);
    
    if (snapshot.exists()) {
      const factories = snapshot.val();
      return Object.keys(factories).map(id => ({ ...factories[id], id }));
    }
    return [];
  }
  
  static async updateOwnedFactory(factoryId: string, updates: Partial<OwnedFactory>) {
    await update(ref(getDatabase(), `ownedFactories/${factoryId}`), updates);
  }
  
  static async deleteOwnedFactory(factoryId: string) {
    await remove(ref(getDatabase(), `ownedFactories/${factoryId}`));
  }
  
  static listenToChildFactories(childId: string, callback: (factories: OwnedFactory[]) => void) {
    const factoriesRef = ref(getDatabase(), 'ownedFactories');
    const factoriesQuery = query(factoriesRef, orderByChild('childId'), equalTo(childId));
    
    onValue(factoriesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const factories = snapshot.val();
        callback(Object.keys(factories).map(id => ({ ...factories[id], id })));
      } else {
        callback([]);
      }
    });
    
    return () => off(factoriesQuery);
  }

  // ============= FUND PRICES =============

  static async getFundPrices(): Promise<Record<string, any>> {
    const db = getDatabase();
    const pricesRef = ref(db, 'fundPrices');
    const snapshot = await get(pricesRef);
    return snapshot.exists() ? snapshot.val() : {};
  }

  static async updateFundPrices(prices: Record<string, any>) {
    const db = getDatabase();
    await set(ref(db, 'fundPrices'), prices);
  }

  static async initializeFundPrices(defaultPrices: Record<string, any>) {
    const db = getDatabase();
    const pricesRef = ref(db, 'fundPrices');
    const snapshot = await get(pricesRef);
    
    // Om inga priser finns, sätt default
    if (!snapshot.exists()) {
      await set(pricesRef, defaultPrices);
      console.log('💾 Initierade fondpriser i Firebase');
    }
  }

  static listenToFundPrices(callback: (prices: Record<string, any>) => void) {
    const db = getDatabase();
    const pricesRef = ref(db, 'fundPrices');
    
    onValue(pricesRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : {});
    });
    
    return () => off(pricesRef);
  }
}


// Core Types
export type UserRole = 'parent' | 'child';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  familyId: string;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  ownerId: string; // parent who created the family
}

export interface Child extends User {
  role: 'child';
  balance: number;
  parentId: string;
}

export interface Parent extends User {
  role: 'parent';
  children: string[]; // array of child IDs
}

// Tasks
export type TaskStatus = 'pending' | 'in_review' | 'approved' | 'rejected';
export type TaskFrequency = 'once' | 'daily' | 'weekly';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  frequency: TaskFrequency;
  assignedTo: string; // child ID
  createdBy: string; // parent ID
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  reviewedAt?: string;
  familyId: string;
}

// Rewards
export type RewardStatus = 'available' | 'purchased' | 'delivered';

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  createdBy: string; // parent ID
  familyId: string;
  status: RewardStatus;
  createdAt: string;
}

export interface PurchasedReward {
  id: string;
  rewardId: string;
  childId: string;
  purchasedAt: string;
  status: RewardStatus;
}

// Investments
export interface Investment {
  id: string;
  childId: string;
  fundId: string;
  amount: number;
  purchasePrice: number;
  purchasedAt: string;
}

export interface Fund {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  currentPrice: number;
  priceHistory: PricePoint[];
  icon: string;
}

export interface PricePoint {
  timestamp: string;
  price: number;
}

// Factory
export interface FactoryItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  productionRate: number; // coins per hour
  icon: string;
  level: number;
}

export interface OwnedFactory {
  id: string;
  childId: string;
  factoryItemId: string;
  purchasedAt: string;
  level: number;
}

// Transactions
export type TransactionType = 'task_reward' | 'purchase' | 'investment' | 'factory' | 'dividend';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  timestamp: string;
  relatedId?: string; // ID of related task, reward, etc.
}

// Firebase Database Structure
export interface FirebaseDatabase {
  families: Record<string, Family>;
  users: Record<string, User | Parent | Child>;
  tasks: Record<string, Task>;
  rewards: Record<string, Reward>;
  purchasedRewards: Record<string, PurchasedReward>;
  investments: Record<string, Investment>;
  factories: Record<string, OwnedFactory>;
  transactions: Record<string, Transaction>;
  funds: Record<string, Fund>;
}

// App State
export interface AppState {
  // Current user
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Family data
  family: Family | null;
  familyMembers: User[];
  
  // Tasks
  tasks: Task[];
  
  // Rewards
  rewards: Reward[];
  purchasedRewards: PurchasedReward[];
  
  // Investments
  investments: Investment[];
  funds: Fund[];
  
  // Factory
  ownedFactories: OwnedFactory[];
  
  // Transactions
  transactions: Transaction[];
  
  // UI State
  isLoading: boolean;
  error: string | null;
}

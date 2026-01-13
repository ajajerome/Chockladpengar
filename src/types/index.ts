// User types
export type UserRole = 'parent' | 'child';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  familyId: string;
  profileImage?: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  deadline?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
  status: 'pending' | 'completed' | 'approved' | 'rejected';
  createdBy: string;
  assignedTo: string;
  createdAt: Date;
  completedAt?: Date;
}

// Reward types
export interface Reward {
  id: string;
  title: string;
  cost: number;
  category: 'activity' | 'privilege' | 'thing';
  description?: string;
  image?: string;
  available: boolean;
}

// Purchase types
export interface Purchase {
  id: string;
  rewardId: string;
  childId: string;
  cost: number;
  purchasedAt: Date;
  status: 'pending' | 'fulfilled';
}

// Investment types
export type FundType = 'milk' | 'nougat' | 'gold';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Fund {
  id: FundType;
  name: string;
  description: string;
  riskLevel: RiskLevel;
  icon: string;
}

export interface Investment {
  id: string;
  childId: string;
  fundId: FundType;
  amount: number;
  currentValue: number;
  investedAt: Date;
  history: InvestmentHistory[];
}

export interface InvestmentHistory {
  date: Date;
  value: number;
  change: number;
  changePercent: number;
}

// Factory types
export type BuildingStage = 
  | 'foundation'
  | 'machine1'
  | 'formStation'
  | 'pralineLine'
  | 'sign'
  | 'grandOpening';

export interface FactoryStageInfo {
  id: BuildingStage;
  name: string;
  cost: number;
  order: number;
  description: string;
}

export interface Factory {
  childId: string;
  currentStage: BuildingStage | null;
  completedStages: BuildingStage[];
  isComplete: boolean;
  weeklyProduction: number;
  lastProductionDate?: Date;
  totalProduced: number;
}

// Balance types
export interface Balance {
  childId: string;
  amount: number;
  history: TransactionHistory[];
}

export interface TransactionHistory {
  id: string;
  type: 'earn' | 'spend' | 'invest' | 'withdraw' | 'factory_production';
  amount: number;
  description: string;
  date: Date;
  relatedId?: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'new_task' | 'task_approved' | 'task_rejected' | 'reward_purchased' | 
        'investment_updated' | 'factory_production' | 'new_stage_available';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

// App state types
export interface AppState {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  rewards: Reward[];
  purchases: Purchase[];
  investments: Investment[];
  factories: Factory[];
  balances: Balance[];
  notifications: Notification[];
}



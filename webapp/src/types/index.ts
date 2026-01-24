export interface User {
  id: string;
  name: string;
  role: 'parent' | 'child';
  familyId: string;
  pin?: string;
  avatar?: string;
}

export interface Family {
  id: string;
  name: string;
  parentIds: string[];
  childIds: string[];
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  status: 'pending' | 'completed' | 'approved' | 'rejected';
  createdBy: string;
  assignedTo: string;
  familyId: string;
  deadline?: string;
  recurring?: 'daily' | 'weekly' | 'monthly';
  createdAt: string;
  completedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  familyId: string;
  createdBy: string;
  imageUrl?: string;
}

export interface Investment {
  id: string;
  userId: string;
  fundType: 'milk' | 'nougat' | 'gold';
  amount: number;
  startDate: string;
  currentValue: number;
  totalReturn: number;
}

export interface Factory {
  id: string;
  userId: string;
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  weeklyIncome: number;
  totalInvested: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend' | 'invest' | 'withdraw' | 'passive';
  amount: number;
  description: string;
  timestamp: string;
  relatedId?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'task' | 'reward' | 'investment' | 'factory' | 'general';
  isRead: boolean;
  timestamp: string;
}

export interface Balance {
  userId: string;
  amount: number;
}


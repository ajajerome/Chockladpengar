import type { FactoryItem } from '@/types';

export const FACTORY_ITEMS: FactoryItem[] = [
  {
    id: 'factory_small',
    name: 'Liten Chokladmaskin',
    description: 'Producerar 2 chokladpengar per timme',
    cost: 100,
    productionRate: 2,
    maintenanceCost: 10,
    icon: '⚙️',
    level: 1,
  },
  {
    id: 'factory_medium',
    name: 'Medelstor Fabrik',
    description: 'Producerar 8 chokladpengar per timme',
    cost: 400,
    productionRate: 8,
    maintenanceCost: 35,
    icon: '🏭',
    level: 2,
  },
  {
    id: 'factory_large',
    name: 'Stor Chokladfabrik',
    description: 'Producerar 20 chokladpengar per timme',
    cost: 1000,
    productionRate: 20,
    maintenanceCost: 80,
    icon: '🏗️',
    level: 3,
  },
  {
    id: 'factory_mega',
    name: 'Mega Chokladimperium',
    description: 'Producerar 50 chokladpengar per timme',
    cost: 2500,
    productionRate: 50,
    maintenanceCost: 180,
    icon: '🏰',
    level: 4,
  },
];

export const MAINTENANCE_INTERVAL_DAYS = 7; // Underhåll varje vecka

export function calculateProduction(
  productionRate: number,
  purchasedAt: string
): number {
  const now = new Date();
  const purchased = new Date(purchasedAt);
  const hoursPassed = (now.getTime() - purchased.getTime()) / (1000 * 60 * 60);
  return Math.floor(hoursPassed * productionRate);
}

export function needsMaintenance(lastMaintenance: string): boolean {
  const now = new Date();
  const lastDate = new Date(lastMaintenance);
  const daysPassed = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysPassed >= MAINTENANCE_INTERVAL_DAYS;
}

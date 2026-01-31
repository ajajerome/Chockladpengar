import type { FactoryItem } from '@/types';

export const FACTORY_ITEMS: FactoryItem[] = [
  {
    id: 'factory_small',
    name: 'Liten Chokladmaskin',
    description: 'Producerar 10 chokladpengar per vecka',
    cost: 50,
    productionRate: 10, // per vecka
    maintenanceCost: 5,
    icon: '⚙️',
    level: 1,
  },
  {
    id: 'factory_medium',
    name: 'Medelstor Fabrik',
    description: 'Producerar 15 chokladpengar per vecka',
    cost: 100,
    productionRate: 15, // per vecka
    maintenanceCost: 8,
    icon: '🏭',
    level: 2,
  },
  {
    id: 'factory_large',
    name: 'Stor Chokladfabrik',
    description: 'Producerar 20 chokladpengar per vecka',
    cost: 200,
    productionRate: 20, // per vecka
    maintenanceCost: 12,
    icon: '🏗️',
    level: 3,
  },
  {
    id: 'factory_mega',
    name: 'Mega Chokladimperium',
    description: 'Producerar 30 chokladpengar per vecka',
    cost: 400,
    productionRate: 30, // per vecka
    maintenanceCost: 20,
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
  const weeksPassed = (now.getTime() - purchased.getTime()) / (1000 * 60 * 60 * 24 * 7);
  return Math.floor(weeksPassed * productionRate);
}

export function needsMaintenance(lastMaintenance: string): boolean {
  const now = new Date();
  const lastDate = new Date(lastMaintenance);
  const daysPassed = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysPassed >= MAINTENANCE_INTERVAL_DAYS;
}

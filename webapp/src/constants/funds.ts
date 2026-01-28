import type { Fund } from '@/types';

export const FUNDS: Record<string, Omit<Fund, 'id' | 'currentPrice' | 'priceHistory'> & { 
  minReturn: number; 
  maxReturn: number;
  basePrice: number;
}> = {
  milk: {
    name: 'Mjölkchokladfonden',
    description: 'Låg risk, stabil avkastning. Perfekt för att lära sig spara!',
    riskLevel: 'low',
    minReturn: -0.02,
    maxReturn: 0.05,
    color: '#8B6F47',
    icon: '🥛',
    basePrice: 10,
  },
  nougat: {
    name: 'Nougat Mix',
    description: 'Medelhög risk, balanserad avkastning. Bra mix av säkerhet och tillväxt.',
    riskLevel: 'medium',
    minReturn: -0.05,
    maxReturn: 0.12,
    color: '#C68642',
    icon: '🍯',
    basePrice: 15,
  },
  gold: {
    name: 'Guldchokladgruvan',
    description: 'Hög risk, högre potential. För den modiga investeraren!',
    riskLevel: 'high',
    minReturn: -0.15,
    maxReturn: 0.25,
    color: '#D4AF37',
    icon: '✨',
    basePrice: 20,
  },
};

export type FundType = keyof typeof FUNDS;

// Simulera prisutveckling
export function simulatePriceChange(fundType: FundType, currentPrice: number): number {
  const fund = FUNDS[fundType];
  const change = fund.minReturn + Math.random() * (fund.maxReturn - fund.minReturn);
  return Math.max(1, currentPrice * (1 + change)); // Aldrig under 1 chokladpengar
}

export function getPriceChangePercent(oldPrice: number, newPrice: number): number {
  return ((newPrice - oldPrice) / oldPrice) * 100;
}








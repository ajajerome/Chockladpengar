export const FUNDS = {
  milk: {
    name: 'Mjölkchokladfonden',
    description: 'Låg risk, stabil avkastning',
    risk: 'low' as const,
    minReturn: 0.02,
    maxReturn: 0.05,
    color: '#8B6F47',
  },
  nougat: {
    name: 'Nougat Mix',
    description: 'Medelhög risk, balanserad avkastning',
    risk: 'medium' as const,
    minReturn: 0.00,
    maxReturn: 0.10,
    color: '#C68642',
  },
  gold: {
    name: 'Guldchokladgruvan',
    description: 'Hög risk, högre potential',
    risk: 'high' as const,
    minReturn: -0.10,
    maxReturn: 0.20,
    color: '#D4AF37',
  },
};

export type FundType = keyof typeof FUNDS;





import React from 'react';
import { ChocolateCoin } from './ChocolateCoin';

interface BalanceDisplayProps {
  balance: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BalanceDisplay({ balance, label = 'Saldo', size = 'lg' }: BalanceDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6 shadow-lg">
      <p className="text-sm font-medium text-amber-800 mb-2">{label}</p>
      <ChocolateCoin amount={balance} size={size} />
    </div>
  );
}


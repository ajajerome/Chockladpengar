import React from 'react';
import { ChocolateCoinIcon } from './icons';

interface BalanceDisplayProps {
  balance: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BalanceDisplay({ balance, label = 'Saldo', size = 'lg' }: BalanceDisplayProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 48,
  };
  
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  return (
    <div className="bg-white rounded-3xl border-2 p-6 shadow-lg" style={{ borderColor: '#FFE55C' }}>
      <p className="text-sm font-medium mb-2" style={{ color: '#8B5A3C' }}>{label}</p>
      <div className="flex items-center gap-2">
        <ChocolateCoinIcon size={iconSizes[size]} />
        <span className={`font-extrabold ${textSizes[size]}`} style={{ color: '#FFD700' }}>{balance}</span>
      </div>
    </div>
  );
}

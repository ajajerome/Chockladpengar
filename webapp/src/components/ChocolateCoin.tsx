import React from 'react';
import { ChocolateCoinIcon } from './icons';

interface ChocolateCoinProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showSign?: boolean;
  animate?: boolean;
}

export function ChocolateCoin({ amount, size = 'md', showSign = false, animate = false }: ChocolateCoinProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };
  
  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 40,
  };
  
  const isNegative = amount < 0;
  const displayAmount = Math.abs(amount);
  const sign = showSign ? (isNegative ? '-' : '+') : '';
  
  const colorClass = isNegative ? 'text-red-600' : '';
  const animateClass = animate ? 'animate-bounce' : '';
  
  return (
    <div className={`inline-flex items-center gap-2 font-bold ${sizeClasses[size]}`}>
      <ChocolateCoinIcon size={iconSizes[size]} className={animateClass} />
      <span className={colorClass} style={{ color: isNegative ? '#FF6B6B' : '#FFD700' }}>
        {sign}{displayAmount}
      </span>
    </div>
  );
}

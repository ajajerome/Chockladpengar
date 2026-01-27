import React from 'react';

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
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };
  
  const isNegative = amount < 0;
  const displayAmount = Math.abs(amount);
  const sign = showSign ? (isNegative ? '-' : '+') : '';
  
  const colorClass = isNegative ? 'text-red-600' : 'text-amber-600';
  const animateClass = animate ? 'animate-bounce' : '';
  
  return (
    <div className={`inline-flex items-center gap-1 font-bold ${colorClass} ${sizeClasses[size]}`}>
      <span className={`${iconSizes[size]} ${animateClass}`}>🍫</span>
      <span>{sign}{displayAmount}</span>
    </div>
  );
}

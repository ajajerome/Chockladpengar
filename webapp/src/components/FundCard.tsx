import React from 'react';
import type { Fund } from '@/types';
import { ChocolateCoin } from './ChocolateCoin';

interface FundCardProps {
  fund: Fund;
  onClick?: () => void;
}

export function FundCard({ fund, onClick }: FundCardProps) {
  const riskColors = {
    low: 'bg-green-50 border-green-200',
    medium: 'bg-yellow-50 border-yellow-200',
    high: 'bg-red-50 border-red-200',
  };
  
  const riskLabels = {
    low: 'Låg risk 🛡️',
    medium: 'Medel risk ⚖️',
    high: 'Hög risk 🎲',
  };
  
  return (
    <div
      className={`rounded-2xl border-2 p-4 shadow-md cursor-pointer hover:shadow-lg transition-all ${riskColors[fund.riskLevel]}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="text-4xl">{fund.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{fund.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{fund.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t">
        <span className="text-xs font-medium text-gray-600">{riskLabels[fund.riskLevel]}</span>
        <ChocolateCoin amount={fund.currentPrice} size="sm" />
      </div>
    </div>
  );
}

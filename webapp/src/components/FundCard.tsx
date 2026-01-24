import { FundType, FUNDS } from '@/constants/funds';

interface FundCardProps {
  fundType: FundType;
  isSelected?: boolean;
  onClick?: () => void;
}

export function FundCard({ fundType, isSelected, onClick }: FundCardProps) {
  const fund = FUNDS[fundType];

  const getRiskColor = () => {
    switch (fund.risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = () => {
    switch (fund.risk) {
      case 'low':
        return 'Låg risk';
      case 'medium':
        return 'Medel risk';
      case 'high':
        return 'Hög risk';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transition-all mb-4 ${
        isSelected ? 'ring-4 ring-accent shadow-xl' : 'hover:shadow-lg'
      }`}
      style={{ borderLeftColor: fund.color, borderLeftWidth: '4px' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-primary">{fund.name}</h3>
          <p className="text-sm text-secondary">{fund.description}</p>
        </div>
        {isSelected && <span className="text-2xl">✓</span>}
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor()}`}>
          {getRiskText()}
        </span>
        <div className="text-right">
          <p className="text-xs text-gray-500">Avkastning/vecka</p>
          <p className="font-bold text-primary">
            {(fund.minReturn * 100).toFixed(1)}% - {(fund.maxReturn * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}


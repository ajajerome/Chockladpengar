import React from 'react'
import { FUNDS, FundType } from '@/constants/funds'
import { BarChartIcon } from './icons'

interface FundCardProps {
  fundType: FundType
  onClick: () => void
  isSelected: boolean
}

export const FundCard: React.FC<FundCardProps> = ({
  fundType,
  onClick,
  isSelected,
}) => {
  const fund = FUNDS[fundType]

  const getRiskColor = () => {
    switch (fund.risk) {
      case 'low':
        return 'text-risk-low bg-risk-low/10'
      case 'medium':
        return 'text-risk-medium bg-risk-medium/10'
      case 'high':
        return 'text-risk-high bg-risk-high/10'
      default:
        return 'text-gray-500 bg-gray-100'
    }
  }

  const getRiskText = () => {
    switch (fund.risk) {
      case 'low':
        return 'Låg risk'
      case 'medium':
        return 'Medel risk'
      case 'high':
        return 'Hög risk'
      default:
        return ''
    }
  }

  return (
    <div
      className={`card cursor-pointer transition-all duration-300 border-l-4 ${
        isSelected
          ? 'ring-4 ring-accent ring-offset-2 scale-[1.02] shadow-xl'
          : 'hover:scale-[1.01] hover:shadow-lg'
      }`}
      style={{ borderLeftColor: fund.color }}
      onClick={onClick}
    >
      {/* Header with Icon */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold font-display text-text-primary mb-1">
            {fund.name}
          </h3>
          <p className="text-sm text-text-secondary">{fund.description}</p>
        </div>
        <div 
          className="icon-circle flex-shrink-0 ml-3"
          style={{ 
            background: `linear-gradient(135deg, ${fund.color}40 0%, ${fund.color}20 100%)` 
          }}
        >
          <BarChartIcon size={24} color={fund.color} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs mt-4 pt-4 border-t border-gray-100">
        <span className={`badge ${getRiskColor()}`}>
          {getRiskText()}
        </span>
        <span className="text-text-muted font-medium">
          {fund.minReturn * 100}% - {fund.maxReturn * 100}% / vecka
        </span>
      </div>

      {isSelected && (
        <div className="mt-3 pt-3 border-t border-accent/20">
          <div className="flex items-center gap-2 text-accent-dark text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Vald</span>
          </div>
        </div>
      )}
    </div>
  )
}

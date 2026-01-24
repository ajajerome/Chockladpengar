import React from 'react'
import { Reward } from '@/types'
import { GiftIcon, ChocolateCoinIcon } from './icons'

interface RewardCardProps {
  reward: Reward
  onClick?: () => void
  canAfford?: boolean
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onClick,
  canAfford = true,
}) => {
  return (
    <div
      className={`card ${
        canAfford
          ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl border-l-4 border-l-accent'
          : 'opacity-60 cursor-not-allowed border-l-4 border-l-gray-300'
      }`}
      onClick={canAfford ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`icon-circle flex-shrink-0 ${canAfford ? 'icon-circle-orange' : 'bg-gray-200'}`}>
          <GiftIcon size={28} color={canAfford ? '#D4AF37' : '#9CA3AF'} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold font-display mb-1 ${
            canAfford ? 'text-text-primary' : 'text-text-muted'
          }`}>
            {reward.title}
          </h3>
          <p className="text-sm text-text-secondary mb-2 line-clamp-2">
            {reward.description}
          </p>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
            {reward.category}
          </span>
        </div>

        {/* Price */}
        <div className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-full ${
          canAfford ? 'bg-accent-light/20' : 'bg-gray-100'
        }`}>
          <ChocolateCoinIcon size={20} color={canAfford ? '#D4AF37' : '#9CA3AF'} />
          <span className={`font-bold ${canAfford ? 'text-accent-dark' : 'text-text-muted'}`}>
            {reward.cost}
          </span>
        </div>
      </div>
    </div>
  )
}

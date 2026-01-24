import { ChocolateCoinIcon } from './icons'

interface ChocolateCoinProps {
  amount: number
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
  className?: string
}

export function ChocolateCoin({ 
  amount, 
  size = 'medium', 
  showLabel = true,
  className = ''
}: ChocolateCoinProps) {
  const iconSizes = {
    small: 20,
    medium: 32,
    large: 48,
  }

  const textSizes = {
    small: 'text-base',
    medium: 'text-2xl',
    large: 'text-4xl',
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ChocolateCoinIcon size={iconSizes[size]} color="#D4AF37" />
      <div>
        <p className={`font-bold font-display text-accent-dark ${textSizes[size]}`}>
          {Math.round(amount)}
        </p>
        {showLabel && <p className="text-xs text-secondary">chokladpengar</p>}
      </div>
    </div>
  )
}

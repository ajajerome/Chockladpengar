interface ChocolateCoinProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function ChocolateCoin({ amount, size = 'medium', showLabel = true }: ChocolateCoinProps) {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl',
  };

  const textSizes = {
    small: 'text-base',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={sizeClasses[size]}>🍫</span>
      <div>
        <p className={`font-bold text-accent ${textSizes[size]}`}>{amount}</p>
        {showLabel && <p className="text-xs text-secondary">chokladpengar</p>}
      </div>
    </div>
  );
}


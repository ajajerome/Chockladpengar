import { Reward } from '@/types';

interface RewardCardProps {
  reward: Reward;
  canAfford: boolean;
  onPurchase?: () => void;
}

export function RewardCard({ reward, canAfford, onPurchase }: RewardCardProps) {
  return (
    <div
      className={`card mb-4 transition-all ${
        canAfford ? 'hover:shadow-xl cursor-pointer' : 'opacity-60'
      }`}
      onClick={canAfford && onPurchase ? onPurchase : undefined}
    >
      <div className="flex items-start gap-4">
        <div className={`text-5xl ${canAfford ? '' : 'grayscale'}`}>🎁</div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-1">{reward.title}</h3>
          <p className="text-secondary text-sm mb-2">{reward.description}</p>
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
            {reward.category}
          </span>
        </div>

        <div className={`flex flex-col items-end ${canAfford ? '' : 'opacity-50'}`}>
          <div className="flex items-center gap-1 bg-accent/10 px-3 py-2 rounded-full">
            <span className="text-2xl">🍫</span>
            <span className="font-bold text-accent text-lg">{reward.cost}</span>
          </div>
          {!canAfford && (
            <span className="text-xs text-red-500 mt-1">För dyrt</span>
          )}
        </div>
      </div>
    </div>
  );
}


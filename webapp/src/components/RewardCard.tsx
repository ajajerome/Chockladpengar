import React from 'react';
import type { Reward } from '@/types';
import { ChocolateCoinIcon } from './icons';
import { ScreenTimeIcon, PopcornIcon, TeddyBearIcon, SoccerBallIcon, IceCreamIcon, CandyIcon } from './icons/RewardIcons';

interface RewardCardProps {
  reward: Reward;
  onPurchase?: () => void;
  canAfford?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

// Mappning mellan emoji/namn och rätt ikon
function getRewardIcon(reward: Reward): React.ReactNode {
  const iconMap: { [key: string]: React.FC<{ size?: number }> } = {
    '⭐': ScreenTimeIcon,
    '🎮': ScreenTimeIcon,
    '📺': ScreenTimeIcon,
    '🍿': PopcornIcon,
    '🎬': PopcornIcon,
    '🧸': TeddyBearIcon,
    '🎁': TeddyBearIcon,
    '⚽': SoccerBallIcon,
    '🏀': SoccerBallIcon,
    '🍦': IceCreamIcon,
    '🍨': IceCreamIcon,
    '🍬': CandyIcon,
    '🍭': CandyIcon,
  };
  
  // Kolla emoji först
  const IconComponent = iconMap[reward.icon];
  if (IconComponent) {
    return <IconComponent size={48} />;
  }
  
  // Kolla efter nyckelord i titeln
  const title = reward.title.toLowerCase();
  if (title.includes('skärmtid') || title.includes('tv') || title.includes('spel')) {
    return <ScreenTimeIcon size={48} />;
  }
  if (title.includes('fredagsmys') || title.includes('film') || title.includes('popcorn')) {
    return <PopcornIcon size={48} />;
  }
  if (title.includes('leksak') || title.includes('nalle') || title.includes('gosedjur')) {
    return <TeddyBearIcon size={48} />;
  }
  if (title.includes('fotboll') || title.includes('boll')) {
    return <SoccerBallIcon size={48} />;
  }
  if (title.includes('glass')) {
    return <IceCreamIcon size={48} />;
  }
  if (title.includes('godis') || title.includes('snask')) {
    return <CandyIcon size={48} />;
  }
  
  // Fallback till emoji
  return <div className="text-5xl">{reward.icon}</div>;
}

export function RewardCard({
  reward,
  onPurchase,
  canAfford = true,
  disabled = false,
  loading = false,
}: RewardCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-5 border-2" style={{ borderColor: '#FFB4A2' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0">
          {getRewardIcon(reward)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-lg" style={{ color: '#8B5A3C' }}>{reward.title}</h3>
          {reward.description && (
            <p className="text-sm mt-1" style={{ color: '#A67C52' }}>{reward.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: '#F5E6D3' }}>
        <div className="flex items-center gap-2">
          <ChocolateCoinIcon size={28} />
          <span className="text-2xl font-extrabold" style={{ color: '#FFD700' }}>{reward.cost}</span>
        </div>
        
        {onPurchase && (
          <button
            onClick={onPurchase}
            disabled={!canAfford || disabled || loading}
            className="px-6 py-2 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: canAfford 
                ? 'linear-gradient(135deg, #B4E7CE 0%, #4CAF50 100%)' 
                : 'linear-gradient(135deg, #F5E6D3 0%, #D1C0A8 100%)',
              color: canAfford ? '#FFFFFF' : '#8B5A3C'
            }}
          >
            {loading ? '...' : canAfford ? 'Köp 🎁' : 'Inte råd'}
          </button>
        )}
      </div>
    </div>
  );
}

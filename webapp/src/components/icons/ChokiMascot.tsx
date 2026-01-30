import React from 'react';

type ChokiMood = 'happy' | 'excited' | 'neutral' | 'sad' | 'broke';

interface ChokiMascotProps {
  size?: number;
  withCoins?: boolean;
  withWave?: boolean;
  className?: string;
  mood?: ChokiMood;
  balance?: number; // Auto-detect mood from balance
}

export const ChokiMascot: React.FC<ChokiMascotProps> = ({
  size = 120,
  withCoins = true,
  withWave = false,
  className = '',
  mood,
  balance,
}) => {
  // Auto-detect mood from balance
  const getMood = (): ChokiMood => {
    if (mood) return mood;
    if (balance === undefined) return 'happy';
    
    if (balance === 0) return 'broke';
    if (balance < 30) return 'sad';
    if (balance < 100) return 'neutral';
    if (balance < 200) return 'happy';
    return 'excited';
  };
  
  const currentMood = getMood();
  
  // Different eye expressions
  const renderEyes = () => {
    switch (currentMood) {
      case 'excited':
        return (
          <g>
            <circle cx="50" cy="58" r="3" fill="white" />
            <circle cx="70" cy="58" r="3" fill="white" />
            <circle cx="48" cy="58" r="5" fill="#3D2817" />
            <circle cx="68" cy="58" r="5" fill="#3D2817" />
            <circle cx="49" cy="56" r="2" fill="white" />
            <circle cx="69" cy="56" r="2" fill="white" />
          </g>
        );
      case 'happy':
        return (
          <g>
            <ellipse cx="50" cy="60" rx="6" ry="8" fill="white" />
            <ellipse cx="70" cy="60" rx="6" ry="8" fill="white" />
            <circle cx="51" cy="61" r="4" fill="#3D2817" />
            <circle cx="71" cy="61" r="4" fill="#3D2817" />
            <circle cx="52" cy="59" r="2" fill="white" />
            <circle cx="72" cy="59" r="2" fill="white" />
          </g>
        );
      case 'neutral':
        return (
          <g>
            <ellipse cx="50" cy="62" rx="5" ry="6" fill="white" />
            <ellipse cx="70" cy="62" rx="5" ry="6" fill="white" />
            <circle cx="50" cy="63" r="3" fill="#3D2817" />
            <circle cx="70" cy="63" r="3" fill="#3D2817" />
            <circle cx="51" cy="61" r="1.5" fill="white" />
            <circle cx="71" cy="61" r="1.5" fill="white" />
          </g>
        );
      case 'sad':
        return (
          <g>
            <ellipse cx="50" cy="63" rx="4" ry="5" fill="white" />
            <ellipse cx="70" cy="63" rx="4" ry="5" fill="white" />
            <circle cx="50" cy="64" r="2.5" fill="#3D2817" />
            <circle cx="70" cy="64" r="2.5" fill="#3D2817" />
            <circle cx="51" cy="63" r="1" fill="white" />
            <circle cx="71" cy="63" r="1" fill="white" />
          </g>
        );
      case 'broke':
        return (
          <g>
            <line x1="45" y1="60" x2="53" y2="64" stroke="#3D2817" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="64" x2="53" y2="60" stroke="#3D2817" strokeWidth="2" strokeLinecap="round" />
            <line x1="67" y1="60" x2="75" y2="64" stroke="#3D2817" strokeWidth="2" strokeLinecap="round" />
            <line x1="67" y1="64" x2="75" y2="60" stroke="#3D2817" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      default:
        return null;
    }
  };
  
  // Different mouth expressions
  const renderMouth = () => {
    switch (currentMood) {
      case 'excited':
        return (
          <>
            <ellipse cx="60" cy="75" rx="10" ry="8" fill="#6B4423" />
            <ellipse cx="60" cy="73" rx="8" ry="6" fill="#FFB4A2" />
            <path d="M 50 70 Q 60 78 70 70" stroke="#6B4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 'happy':
        return (
          <path d="M 45 72 Q 60 80 75 72" stroke="#6B4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        );
      case 'neutral':
        return (
          <line x1="48" y1="75" x2="72" y2="75" stroke="#6B4423" strokeWidth="2" strokeLinecap="round" />
        );
      case 'sad':
        return (
          <path d="M 45 77 Q 60 72 75 77" stroke="#6B4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        );
      case 'broke':
        return (
          <path d="M 45 78 Q 60 70 75 78" stroke="#6B4423" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        );
      default:
        return null;
    }
  };
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sparkles */}
        {withCoins && (
          <>
            <circle cx="20" cy="25" r="2" fill="#FFD700" opacity="0.5" />
            <circle cx="100" cy="30" r="2.5" fill="#FFD700" opacity="0.5" />
            <circle cx="15" cy="50" r="1.5" fill="#FFE55C" opacity="0.5" />
          </>
        )}
        
        {/* Coin stack (left) */}
        {withCoins && (
          <g transform="translate(15, 60)">
            <ellipse cx="12" cy="22" rx="10" ry="3" fill="#D4AF37" />
            <ellipse cx="12" cy="18" rx="10" ry="3" fill="#FFD700" />
            <ellipse cx="12" cy="14" rx="10" ry="3" fill="#FFE55C" />
            <ellipse cx="12" cy="10" rx="10" ry="3" fill="#FFD700" />
            <text x="12" y="13" fontSize="8" fill="#8B5A3C" textAnchor="middle" fontWeight="bold">C</text>
          </g>
        )}
        
        {/* Main Choki body */}
        <circle cx="60" cy="65" r="35" fill="#8B5A3C" />
        
        {/* Cheeks */}
        <circle cx="45" cy="68" r="6" fill="#FFB4A2" opacity="0.7" />
        <circle cx="75" cy="68" r="6" fill="#FFB4A2" opacity="0.7" />
        
        {/* Eyes - Dynamic based on mood */}
        {renderEyes()}
        
        {/* Mouth - Dynamic based on mood */}
        {renderMouth()}
        
        {/* Arms */}
        <g>
          {/* Left arm */}
          <ellipse cx="30" cy="70" rx="8" ry="15" fill="#A67C52" transform="rotate(-25 30 70)" />
          {/* Right arm */}
          <ellipse 
            cx="90" 
            cy="70" 
            rx="8" 
            ry="15" 
            fill="#A67C52" 
            transform="rotate(25 90 70)"
          />
        </g>
        
        {/* Legs */}
        <g>
          <ellipse cx="50" cy="95" rx="10" ry="8" fill="#A67C52" />
          <ellipse cx="70" cy="95" rx="10" ry="8" fill="#A67C52" />
        </g>
        
        {/* Coin in hand (right) */}
        {withCoins && (
          <g transform="translate(88, 55)">
            <circle cx="8" cy="8" r="8" fill="#FFD700" />
            <circle cx="8" cy="8" r="6" fill="#FFE55C" />
            <text x="8" y="10" fontSize="6" fill="#8B5A3C" textAnchor="middle" fontWeight="bold">C</text>
          </g>
        )}
      </svg>
    </div>
  );
};


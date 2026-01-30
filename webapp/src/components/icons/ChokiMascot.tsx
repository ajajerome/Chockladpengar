import React from 'react';

interface ChokiMascotProps {
  size?: number;
  withCoins?: boolean;
  withWave?: boolean;
  className?: string;
}

export const ChokiMascot: React.FC<ChokiMascotProps> = ({
  size = 120,
  withCoins = true,
  withWave = false,
  className = '',
}) => {
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
            <circle cx="20" cy="25" r="2" fill="#FFD700" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="30" r="2.5" fill="#FFD700" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="15" cy="50" r="1.5" fill="#FFE55C" opacity="0.6">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
            </circle>
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
        
        {/* Eyes */}
        <g>
          <ellipse cx="50" cy="60" rx="6" ry="8" fill="white" />
          <ellipse cx="70" cy="60" rx="6" ry="8" fill="white" />
          <circle cx="51" cy="61" r="4" fill="#3D2817" />
          <circle cx="71" cy="61" r="4" fill="#3D2817" />
          <circle cx="52" cy="59" r="2" fill="white" />
          <circle cx="72" cy="59" r="2" fill="white" />
        </g>
        
        {/* Smile */}
        <path
          d="M 45 72 Q 60 80 75 72"
          stroke="#6B4423"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        
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
            transform={withWave ? "rotate(25 90 70)" : "rotate(25 90 70)"}
          >
            {withWave && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="25 90 70; 45 90 70; 25 90 70"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
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


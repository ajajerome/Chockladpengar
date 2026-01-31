import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Mjölkchokladfonden - Låg risk (mjölkflaska/chokladkaka)
export const MilkChocolateFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chokladkaka med mjölk-tema */}
    <rect x="8" y="14" width="32" height="26" rx="3" fill="#8B6F47" />
    <rect x="10" y="16" width="28" height="22" rx="2" fill="#A67C52" />
    
    {/* Rutor på chokladkakan */}
    <line x1="24" y1="16" x2="24" y2="38" stroke="#8B5A3C" strokeWidth="1.5" />
    <line x1="10" y1="27" x2="38" y2="27" stroke="#8B5A3C" strokeWidth="1.5" />
    
    {/* Mjölkdroppe/glans */}
    <ellipse cx="17" cy="22" rx="3" ry="4" fill="white" opacity="0.4" />
    <circle cx="16" cy="21" r="1.5" fill="white" opacity="0.6" />
    
    {/* Topp-del (förpackning) */}
    <path d="M 14 14 L 14 10 C 14 8 16 8 18 8 L 30 8 C 32 8 34 8 34 10 L 34 14" fill="#D4AF37" />
    <rect x="22" y="8" width="4" height="3" fill="#FFE55C" />
  </svg>
);

// Nougat Mix - Medel risk (mixad choklad med nöt-tema)
export const NougatMixFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Huvudcirkel - nöt/nougat */}
    <circle cx="24" cy="24" r="16" fill="#C68642" />
    <circle cx="24" cy="24" r="14" fill="#D4A574" />
    
    {/* Nöt-mönster */}
    <circle cx="24" cy="24" r="10" fill="#C68642" />
    
    {/* Nöt-detaljer */}
    <ellipse cx="24" cy="24" rx="8" ry="10" fill="#A67C52" />
    <ellipse cx="24" cy="24" rx="6" ry="8" fill="#C68642" />
    <path d="M 24 16 Q 20 24 24 32" stroke="#8B5A3C" strokeWidth="1.5" fill="none" />
    <path d="M 24 16 Q 28 24 24 32" stroke="#8B5A3C" strokeWidth="1.5" fill="none" />
    
    {/* Glans */}
    <circle cx="20" cy="18" r="2" fill="white" opacity="0.3" />
    
    {/* Små choklad-bits runt om */}
    <circle cx="14" cy="14" r="2.5" fill="#8B5A3C" />
    <circle cx="34" cy="14" r="2" fill="#A67C52" />
    <circle cx="34" cy="34" r="2.5" fill="#8B5A3C" />
    <circle cx="14" cy="34" r="2" fill="#A67C52" />
  </svg>
);

// Guldchokladgruvan - Hög risk (guld/diamant-tema)
export const GoldMineFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Diamant/ädelsten form */}
    <path 
      d="M 24 8 L 34 18 L 24 40 L 14 18 Z" 
      fill="#FFD700"
    />
    <path 
      d="M 24 8 L 34 18 L 24 40 L 14 18 Z" 
      fill="url(#goldGradient)"
    />
    
    {/* Facetter */}
    <path d="M 24 8 L 24 40" stroke="#D4AF37" strokeWidth="1.5" />
    <path d="M 14 18 L 34 18" stroke="#D4AF37" strokeWidth="1.5" />
    <path d="M 14 18 L 24 40" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
    <path d="M 34 18 L 24 40" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
    <path d="M 19 13 L 24 18" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
    <path d="M 29 13 L 24 18" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
    
    {/* Topp-facett */}
    <polygon points="24,8 19,13 29,13" fill="#FFE55C" />
    
    {/* Glans/reflektion */}
    <circle cx="20" cy="15" r="2" fill="white" opacity="0.6" />
    <circle cx="26" cy="20" r="1.5" fill="white" opacity="0.4" />
    
    {/* Sparkles runt om */}
    <path d="M 8 12 L 10 12 M 9 11 L 9 13" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 38 16 L 40 16 M 39 15 L 39 17" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 36 36 L 38 36 M 37 35 L 37 37" stroke="#FFE55C" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 10 32 L 12 32 M 11 31 L 11 33" stroke="#FFE55C" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Gradient definition */}
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE55C" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
      </linearGradient>
    </defs>
  </svg>
);

// Export all icons
export const FundIcons = {
  MilkChocolateFund: MilkChocolateFundIcon,
  NougatMix: NougatMixFundIcon,
  GoldMine: GoldMineFundIcon,
};

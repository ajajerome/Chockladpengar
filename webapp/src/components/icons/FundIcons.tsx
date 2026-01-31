import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Mjölkchokladfonden - Låg risk (chokladkaka)
export const MilkChocolateFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chokladkaka */}
    <rect x="12" y="20" width="40" height="32" rx="4" fill="#8B6F47" />
    <rect x="14" y="22" width="36" height="28" rx="3" fill="#A67C52" />
    
    {/* Rutor på chokladkakan */}
    <line x1="32" y1="22" x2="32" y2="50" stroke="#8B5A3C" strokeWidth="2" />
    <line x1="14" y1="36" x2="50" y2="36" stroke="#8B5A3C" strokeWidth="2" />
    
    {/* Glans */}
    <ellipse cx="22" cy="28" rx="4" ry="5" fill="white" opacity="0.4" />
    
    {/* Förpacknings-topp */}
    <rect x="18" y="14" width="28" height="8" rx="2" fill="#FFD700" />
    <rect x="28" y="12" width="8" height="4" rx="1" fill="#FFE55C" />
  </svg>
);

// Nougat Mix - Medel risk (nöt)
export const NougatMixFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Yttre cirkel */}
    <circle cx="32" cy="32" r="20" fill="#C68642" />
    <circle cx="32" cy="32" r="18" fill="#D4A574" />
    
    {/* Nöt-form */}
    <ellipse cx="32" cy="32" rx="14" ry="16" fill="#C68642" />
    <ellipse cx="32" cy="32" rx="10" ry="13" fill="#A67C52" />
    
    {/* Nöt-linjer */}
    <path d="M 32 19 Q 28 32 32 45" stroke="#8B5A3C" strokeWidth="2" fill="none" />
    <path d="M 32 19 Q 36 32 32 45" stroke="#8B5A3C" strokeWidth="2" fill="none" />
    
    {/* Glans */}
    <circle cx="26" cy="24" r="3" fill="white" opacity="0.4" />
    
    {/* Choklad-bits */}
    <circle cx="16" cy="16" r="3" fill="#8B5A3C" />
    <circle cx="48" cy="18" r="2.5" fill="#A67C52" />
    <circle cx="48" cy="46" r="3" fill="#8B5A3C" />
    <circle cx="16" cy="46" r="2.5" fill="#A67C52" />
  </svg>
);

// Guldchokladgruvan - Hög risk (diamant)
export const GoldMineFundIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE55C" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#FFD700" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    
    {/* Diamant-form */}
    <path d="M 32 12 L 46 26 L 32 52 L 18 26 Z" fill="url(#goldGradient)" />
    <path d="M 32 12 L 46 26 L 32 52 L 18 26 Z" fill="#FFD700" opacity="0.3" />
    
    {/* Facetter */}
    <path d="M 32 12 L 32 52" stroke="#D4AF37" strokeWidth="2" />
    <path d="M 18 26 L 46 26" stroke="#D4AF37" strokeWidth="2" />
    <path d="M 18 26 L 32 52" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
    <path d="M 46 26 L 32 52" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
    <path d="M 24 19 L 32 26" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
    <path d="M 40 19 L 32 26" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
    
    {/* Topp */}
    <polygon points="32,12 24,19 40,19" fill="#FFE55C" />
    
    {/* Glans */}
    <circle cx="26" cy="20" r="3" fill="white" opacity="0.7" />
    <circle cx="36" cy="28" r="2" fill="white" opacity="0.5" />
    
    {/* Sparkles */}
    <g opacity="0.8">
      <path d="M 10 18 L 12 18 M 11 17 L 11 19" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      <path d="M 52 22 L 54 22 M 53 21 L 53 23" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 48 L 52 48 M 51 47 L 51 49" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" />
      <path d="M 14 44 L 16 44 M 15 43 L 15 45" stroke="#FFE55C" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// Export all icons
export const FundIcons = {
  MilkChocolateFund: MilkChocolateFundIcon,
  NougatMix: NougatMixFundIcon,
  GoldMine: GoldMineFundIcon,
};

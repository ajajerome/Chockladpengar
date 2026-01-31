import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Säng-ikon
export const BedIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="8" y="20" width="32" height="16" rx="2" fill="#FF9999" />
    <rect x="8" y="16" width="8" height="6" rx="2" fill="#FFB4A2" />
    <rect x="6" y="36" width="3" height="8" rx="1" fill="#8B5A3C" />
    <rect x="39" y="36" width="3" height="8" rx="1" fill="#8B5A3C" />
    <rect x="10" y="22" width="28" height="2" fill="#FFE4E4" />
  </svg>
);

// Tandborste-ikon
export const ToothbrushIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="18" y="8" width="12" height="24" rx="2" fill="#A8D8FF" />
    <ellipse cx="24" cy="38" rx="4" ry="6" fill="#B4E7CE" />
    <rect x="20" y="10" width="2" height="8" rx="1" fill="#E5CCFF" />
    <rect x="24" y="10" width="2" height="8" rx="1" fill="#E5CCFF" />
    <rect x="28" y="10" width="2" height="8" rx="1" fill="#E5CCFF" />
  </svg>
);

// Bok-ikon
export const BookIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="10" y="8" width="28" height="32" rx="2" fill="#B4E7CE" />
    <rect x="12" y="10" width="24" height="28" rx="1" fill="#FFE55C" />
    <path d="M24 10 L24 38" stroke="#8B5A3C" strokeWidth="2" />
    <rect x="16" y="16" width="7" height="2" rx="1" fill="#8B5A3C" opacity="0.3" />
    <rect x="16" y="20" width="10" height="2" rx="1" fill="#8B5A3C" opacity="0.3" />
    <rect x="16" y="24" width="8" height="2" rx="1" fill="#8B5A3C" opacity="0.3" />
  </svg>
);

// Disk-ikon
export const DishIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse cx="24" cy="26" rx="14" ry="3" fill="#D4AF37" />
    <ellipse cx="24" cy="24" rx="14" ry="12" fill="#A8D8FF" />
    <ellipse cx="24" cy="24" rx="10" ry="8" fill="#E0F2FE" />
    <circle cx="24" cy="24" r="4" fill="#FFE55C" />
    <path d="M18 12 L18 8 Q18 6 20 6 L28 6 Q30 6 30 8 L30 12" stroke="#8B5A3C" strokeWidth="2" fill="none" />
  </svg>
);

// Hjälp till duka-ikon
export const TableSettingIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="10" y="20" width="28" height="16" rx="2" fill="#A8D8FF" />
    <circle cx="18" cy="28" r="4" fill="#FFE55C" />
    <rect x="26" y="24" width="2" height="8" rx="1" fill="#8B5A3C" />
    <path d="M30 24 L34 24 Q36 24 36 26 L36 30 Q36 32 34 32 L30 32" fill="#FFB4A2" />
  </svg>
);

// Städa-ikon
export const CleanIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="20" y="8" width="3" height="20" rx="1" fill="#8B5A3C" />
    <path d="M12 28 L30 28 L28 40 L14 40 Z" fill="#FFE55C" />
    <rect x="13" y="30" width="14" height="2" rx="1" fill="#FFD700" />
    <rect x="13" y="34" width="14" height="2" rx="1" fill="#FFD700" />
    <circle cx="34" cy="16" r="6" fill="#A8D8FF" opacity="0.6">
      <animate attributeName="cy" values="16;12;16" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);







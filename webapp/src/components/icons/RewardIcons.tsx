import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// Skärmtid-ikon (stjärna för "screen time")
export const ScreenTimeIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M24 6 L28 18 L41 18 L31 26 L35 38 L24 30 L13 38 L17 26 L7 18 L20 18 Z"
      fill="#FFE55C"
      stroke="#FFD700"
      strokeWidth="2"
    />
    <circle cx="24" cy="22" r="6" fill="#FF9999" opacity="0.6" />
  </svg>
);

// Popcorn-ikon (fredagsmys)
export const PopcornIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M16 18 L14 40 L34 40 L32 18 Z" fill="#FF6B6B" stroke="#D94545" strokeWidth="2" />
    <path d="M14 18 L16 22 L32 22 L34 18 Z" fill="#FFFFFF" opacity="0.3" />
    <circle cx="18" cy="14" r="4" fill="#FFE55C" />
    <circle cx="24" cy="12" r="4" fill="#FFFBF0" />
    <circle cx="30" cy="14" r="4" fill="#FFE55C" />
    <circle cx="21" cy="16" r="3" fill="#FFFBF0" />
    <circle cx="27" cy="16" r="3" fill="#FFE55C" />
  </svg>
);

// Nallebjörn-ikon
export const TeddyBearIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="26" r="12" fill="#FFB4A2" />
    <circle cx="16" cy="18" r="6" fill="#FFB4A2" />
    <circle cx="32" cy="18" r="6" fill="#FFB4A2" />
    <circle cx="21" cy="24" r="2" fill="#3D2817" />
    <circle cx="27" cy="24" r="2" fill="#3D2817" />
    <ellipse cx="24" cy="28" rx="3" ry="2" fill="#FF9999" />
    <path d="M21 30 Q24 32 27 30" stroke="#3D2817" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="14" r="3" fill="#FF6B6B" />
  </svg>
);

// Fotboll-ikon (liten leksak)
export const SoccerBallIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="16" fill="#FFFFFF" stroke="#3D2817" strokeWidth="2" />
    <path d="M24 10 L28 18 L36 18 L30 24 L32 32 L24 28 L16 32 L18 24 L12 18 L20 18 Z" fill="#3D2817" />
    <path d="M24 10 L28 18 L36 18" fill="#FFFFFF" />
    <path d="M30 24 L32 32 L24 28" fill="#FFFFFF" />
    <path d="M24 28 L16 32 L18 24" fill="#FFFFFF" />
  </svg>
);

// Glass-ikon
export const IceCreamIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M18 22 L24 40 L30 22 Z" fill="#FFB4A2" />
    <circle cx="20" cy="20" r="6" fill="#FF9999" />
    <circle cx="28" cy="20" r="6" fill="#FFE55C" />
    <circle cx="24" cy="16" r="6" fill="#E5CCFF" />
    <circle cx="24" cy="16" r="2" fill="#FF6B6B" />
  </svg>
);

// Godis-ikon
export const CandyIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="16" y="20" width="16" height="12" rx="2" fill="#FF9999" />
    <rect x="18" y="22" width="12" height="8" rx="1" fill="#FFB4A2" />
    <path d="M16 24 L12 24 Q10 24 10 26 L10 26 Q10 28 12 28 L16 28" fill="#FF6B6B" />
    <path d="M32 24 L36 24 Q38 24 38 26 L38 26 Q38 28 36 28 L32 28" fill="#FF6B6B" />
    <circle cx="20" cy="26" r="1.5" fill="#FFFFFF" opacity="0.6" />
    <circle cx="24" cy="26" r="1.5" fill="#FFFFFF" opacity="0.6" />
    <circle cx="28" cy="26" r="1.5" fill="#FFFFFF" opacity="0.6" />
  </svg>
);


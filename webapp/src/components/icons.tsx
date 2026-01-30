import React from 'react'

interface IconProps {
  size?: number
  color?: string
  className?: string
}

export const ChocolateCoinIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFD700',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <circle cx="12" cy="12" r="8" fill="#FFE55C" />
    <text x="12" y="15" fontSize="10" fill="#8B5A3C" textAnchor="middle" fontWeight="bold">C</text>
    <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
  </svg>
)

export const TreasureChestIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="10" width="16" height="10" rx="2" fill={color} />
    <rect x="5" y="11" width="14" height="8" rx="1" fill="#A67C52" />
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V10H4V6Z" fill="#6B4423" />
    <circle cx="12" cy="15" r="2" fill="#FFD700" />
    <rect x="11" y="15" width="2" height="3" rx="0.5" fill="#D4AF37" />
    <rect x="7" y="7" width="2" height="2" rx="0.5" fill="#FFD700" />
    <rect x="15" y="7" width="2" height="2" rx="0.5" fill="#FFD700" />
  </svg>
)

export const BarChartIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#4CAF50',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="12" width="4" height="8" rx="2" fill="#A8D8FF" />
    <rect x="10" y="8" width="4" height="12" rx="2" fill="#B4E7CE" />
    <rect x="16" y="4" width="4" height="16" rx="2" fill="#E5CCFF" />
    <circle cx="6" cy="11" r="2" fill="#64B5F6" />
    <circle cx="12" cy="7" r="2" fill={color} />
    <circle cx="18" cy="3" r="2" fill="#BA68C8" />
  </svg>
)

export const FactoryIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="12" width="18" height="9" rx="2" fill={color} />
    <rect x="5" y="14" width="14" height="6" fill="#A67C52" rx="1" />
    <rect x="7" y="16" width="2" height="4" rx="0.5" fill="#FFE55C" />
    <rect x="11" y="16" width="2" height="4" rx="0.5" fill="#FFE55C" />
    <rect x="15" y="16" width="2" height="4" rx="0.5" fill="#FFE55C" />
    <rect x="6" y="8" width="4" height="4" rx="1" fill="#6B4423" />
    <rect x="10" y="5" width="4" height="7" rx="1" fill="#6B4423" />
    <rect x="14" y="2" width="4" height="10" rx="1" fill="#6B4423" />
    <circle cx="16" cy="4" r="1.5" fill="#FFB4A2">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
)

export const GiftIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FF9999',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="4" y="10" width="16" height="10" rx="2" fill={color} />
    <rect x="6" y="12" width="12" height="6" fill="#FFB4A2" rx="1" />
    <rect x="11" y="10" width="2" height="10" fill="#FF6B6B" />
    <rect x="4" y="7" width="16" height="3" rx="1" fill="#FFE55C" />
    <path
      d="M12 7C12 5.5 10.5 4 9 4C7.5 4 6 5.5 6 7H12Z"
      fill="#4CAF50"
    />
    <path
      d="M12 7C12 5.5 13.5 4 15 4C16.5 4 18 5.5 18 7H12Z"
      fill="#4CAF50"
    />
    <circle cx="12" cy="8" r="1.5" fill="#FF6B6B" />
  </svg>
)

export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 3L20 10L20 20C20 20.5 19.5 21 19 21H5C4.5 21 4 20.5 4 20L4 10Z" fill={color} />
    <path d="M12 3L20 10L4 10Z" fill="#6B4423" />
    <rect x="9" y="14" width="6" height="7" rx="1" fill="#FFE55C" />
    <rect x="7" y="11" width="3" height="3" rx="0.5" fill="#A8D8FF" />
    <rect x="14" y="11" width="3" height="3" rx="0.5" fill="#A8D8FF" />
    <circle cx="11" cy="17" r="0.5" fill="#8B5A3C" />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#4CAF50',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.2" />
    <path
      d="M7 12L10 15L17 8"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#A8D8FF',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <circle cx="12" cy="12" r="8" fill="#E0F2FE" />
    <circle cx="12" cy="12" r="2" fill="#64B5F6" />
    <path d="M12 7V12L15 14" stroke="#64B5F6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="5" r="1" fill="#64B5F6" />
    <circle cx="12" cy="19" r="1" fill="#64B5F6" />
    <circle cx="19" cy="12" r="1" fill="#64B5F6" />
    <circle cx="5" cy="12" r="1" fill="#64B5F6" />
  </svg>
)

export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#4CAF50',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M12 7V17M7 12H17"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill="#E5CCFF" />
    <circle cx="12" cy="12" r="8" fill="#F3E5F5" />
    <circle cx="12" cy="12" r="4" fill={color} />
    <rect x="11" y="4" width="2" height="4" rx="1" fill={color} />
    <rect x="11" y="16" width="2" height="4" rx="1" fill={color} />
    <rect x="4" y="11" width="4" height="2" rx="1" fill={color} />
    <rect x="16" y="11" width="4" height="2" rx="1" fill={color} />
    <rect x="7" y="7" width="2" height="2" rx="1" fill={color} transform="rotate(-45 8 8)" />
    <rect x="15" y="15" width="2" height="2" rx="1" fill={color} transform="rotate(-45 16 16)" />
  </svg>
)

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.1" />
    <path
      d="M10 8L14 12L10 16"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const KeyIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFD700',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="7" cy="7" r="5" fill={color} />
    <circle cx="7" cy="7" r="2" fill="#D4AF37" />
    <rect x="10" y="9" width="11" height="3" rx="1.5" fill={color} transform="rotate(45 10 9)" />
    <rect x="17" y="17" width="3" height="2" rx="1" fill="#D4AF37" />
    <rect x="18" y="19" width="2" height="3" rx="1" fill="#D4AF37" />
  </svg>
)

export const EnvelopeIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFE55C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="6" width="18" height="13" rx="2" fill={color} />
    <rect x="4" y="7" width="16" height="11" rx="1" fill="#FFFBF0" />
    <path d="M3 8L12 14L21 8" fill="#FFD700" />
    <path d="M3 8L12 14L21 8" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const UsersIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFB4A2',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="9" cy="7" r="4" fill={color} />
    <path d="M2 22C2 17 5 14 9 14C13 14 16 17 16 22" fill="#A8D8FF" />
    <circle cx="17" cy="9" r="3" fill="#FFE55C" />
    <path d="M17 15C20 15 22 17 22 20L22 22" fill="#B4E7CE" />
  </svg>
)

export const ChildIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#FFB4A2',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="8" r="5" fill={color} />
    <path d="M5 22C5 17 8 14 12 14C16 14 19 17 19 22" fill="#A8D8FF" />
    <circle cx="10" cy="7" r="1" fill="#3D2817" />
    <circle cx="14" cy="7" r="1" fill="#3D2817" />
    <path d="M10 9.5C10 9.5 11 10 12 10C13 10 14 9.5 14 9.5" stroke="#3D2817" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const ParentIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#8B5A3C',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="7" r="5" fill={color} />
    <path d="M5 22C5 17 8 13 12 13C16 13 19 17 19 22" fill="#FFE55C" />
    <circle cx="10" cy="6" r="1" fill="#FFFFFF" />
    <circle cx="14" cy="6" r="1" fill="#FFFFFF" />
    <path d="M10 9C10 9 11 9.5 12 9.5C13 9.5 14 9 14 9" stroke="#6B4423" strokeWidth="1" strokeLinecap="round" />
    <path d="M8 5C8 4 7 3 6 4" stroke="#6B4423" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 5C16 4 17 3 18 4" stroke="#6B4423" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#4CAF50',
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill={color} />
    <circle cx="12" cy="12" r="8" fill="#B4E7CE" />
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)








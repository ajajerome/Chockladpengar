import React from 'react'

interface IconProps {
  size?: number
  color?: string
  className?: string
}

export const ChocolateCoinIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path
      d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z"
      fill={color}
    />
    <path
      d="M10 10C10 9.44772 10.4477 9 11 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H11C10.4477 11 10 10.5523 10 10Z"
      fill="white"
    />
    <path
      d="M10 14C10 13.4477 10.4477 13 11 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H11C10.4477 15 10 14.5523 10 14Z"
      fill="white"
    />
  </svg>
)

export const TreasureChestIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <rect x="4" y="10" width="16" height="10" rx="1" stroke={color} strokeWidth="2" fill="none" />
    <rect x="4" y="10" width="16" height="4" fill={color} opacity="0.3" />
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V10H4V6Z" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="2" fill={color} />
    <rect x="11" y="12" width="2" height="4" fill={color} />
  </svg>
)

export const BarChartIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <rect x="4" y="12" width="4" height="8" rx="1" fill={color} />
    <rect x="10" y="8" width="4" height="12" rx="1" fill={color} opacity="0.7" />
    <rect x="16" y="4" width="4" height="16" rx="1" fill={color} opacity="0.4" />
  </svg>
)

export const FactoryIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <rect x="3" y="12" width="18" height="9" rx="1" stroke={color} strokeWidth="2" fill="none" />
    <rect x="3" y="14" width="18" height="7" fill={color} opacity="0.2" />
    <rect x="7" y="17" width="2" height="4" fill={color} />
    <rect x="11" y="17" width="2" height="4" fill={color} />
    <rect x="15" y="17" width="2" height="4" fill={color} />
    <path d="M6 12L6 8L10 8L10 6L14 6L14 3L18 3L18 12" stroke={color} strokeWidth="2" />
    <circle cx="16" cy="5" r="1" fill={color} />
  </svg>
)

export const GiftIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <rect x="4" y="10" width="16" height="10" rx="1" stroke={color} strokeWidth="2" fill="none" />
    <rect x="4" y="12" width="16" height="8" fill={color} opacity="0.2" />
    <path d="M12 10V20" stroke={color} strokeWidth="2" />
    <rect x="4" y="7" width="16" height="3" rx="0.5" fill={color} opacity="0.5" />
    <path
      d="M12 7C12 5.34315 10.6569 4 9 4C7.34315 4 6 5.34315 6 7H12Z"
      fill={color}
    />
    <path
      d="M12 7C12 5.34315 13.3431 4 15 4C16.6569 4 18 5.34315 18 7H12Z"
      fill={color}
    />
  </svg>
)

export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <path
      d="M5 13L9 17L19 7"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <path
      d="M12 5V19M5 12H19"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
)

export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <path
      d="M12 2L13.09 5.26L16.5 4.82L16.04 8.23L19 9.69L17.5 12.5L19 15.31L16.04 16.77L16.5 20.18L13.09 19.74L12 23L10.91 19.74L7.5 20.18L7.96 16.77L5 15.31L6.5 12.5L5 9.69L7.96 8.23L7.5 4.82L10.91 5.26L12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <path
      d="M9 5L16 12L9 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const KeyIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="7" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M10 10L19 19M19 19H16M19 19V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const EnvelopeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <path d="M3 7L12 13L21 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const UsersIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M3 21C3 17.134 6.134 14 10 14H12C14 14 16 15 17 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="9" r="3" stroke={color} strokeWidth="2" fill="none" />
    <path d="M17 15C19.5 15 21 16.5 21 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const ChildIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="7" r="2" fill={color} opacity="0.3" />
  </svg>
)

export const ParentIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="6" r="4" stroke={color} strokeWidth="2" fill="none" />
    <path d="M6 20C6 16.134 8.686 13 12 13C15.314 13 18 16.134 18 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 8L6 10M16 8L18 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
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
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <path d="M8 12L11 15L16 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)








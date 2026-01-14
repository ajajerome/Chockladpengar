import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface ArrowIconProps {
  size?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  size = 24,
  color = colors.text,
  direction = 'right',
}) => {
  const getRotation = () => {
    switch (direction) {
      case 'up':
        return 'rotate(-90 12 12)';
      case 'down':
        return 'rotate(90 12 12)';
      case 'left':
        return 'rotate(180 12 12)';
      default:
        return '';
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12 L19 12 M14 7 L19 12 L14 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={getRotation()}
      />
    </Svg>
  );
};



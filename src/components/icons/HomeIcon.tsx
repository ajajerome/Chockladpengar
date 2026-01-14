import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface HomeIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export const HomeIcon: React.FC<HomeIconProps> = ({
  size = 24,
  color = colors.text,
  filled = false,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9 L12 2 L21 9 L21 20 C21 21 20 22 19 22 L5 22 C4 22 3 21 3 20 L3 9 Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22 L9 13 L15 13 L15 22"
        fill={filled ? colors.background : 'none'}
        stroke={color}
        strokeWidth="2"
      />
    </Svg>
  );
};



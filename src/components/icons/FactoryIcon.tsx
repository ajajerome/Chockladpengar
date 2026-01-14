import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface FactoryIconProps {
  size?: number;
  color?: string;
}

export const FactoryIcon: React.FC<FactoryIconProps> = ({
  size = 24,
  color = colors.primary,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="12" width="18" height="9" rx="1" fill={color} />
      <Rect x="7" y="8" width="4" height="5" rx="1" fill={color} opacity="0.8" />
      <Rect x="13" y="5" width="4" height="8" rx="1" fill={color} opacity="0.9" />
      <Path
        d="M8 15 L8 18 M12 15 L12 18 M16 15 L16 18"
        stroke={colors.textWhite}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M5 5 Q6 3, 7 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </Svg>
  );
};



import React from 'react';
import Svg, {Rect, Path, Circle} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface TreasureChestIconProps {
  size?: number;
  color?: string;
}

export const TreasureChestIcon: React.FC<TreasureChestIconProps> = ({
  size = 24,
  color = colors.caramel,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="10" width="16" height="10" rx="1" fill={color} />
      <Path
        d="M4 10 L4 6 C4 5 5 4 6 4 L18 4 C19 4 20 5 20 6 L20 10"
        fill={color}
        opacity="0.8"
      />
      <Circle cx="12" cy="14" r="2" fill={colors.accent} />
      <Rect x="11" y="13" width="2" height="4" fill={colors.accent} />
      <Path
        d="M7 10 L7 20 M17 10 L17 20"
        stroke={colors.primaryDark}
        strokeWidth="1.5"
      />
    </Svg>
  );
};



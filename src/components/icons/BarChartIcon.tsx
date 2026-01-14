import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface BarChartIconProps {
  size?: number;
  color?: string;
}

export const BarChartIcon: React.FC<BarChartIconProps> = ({
  size = 24,
  color = colors.accent,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="14" width="4" height="7" rx="2" fill={color} opacity="0.6" />
      <Rect x="10" y="9" width="4" height="12" rx="2" fill={color} opacity="0.8" />
      <Rect x="16" y="3" width="4" height="18" rx="2" fill={color} />
    </Svg>
  );
};



import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface DashboardIconProps {
  size?: number;
  color?: string;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({
  size = 24,
  color = colors.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="8" height="8" rx="2" fill={color} />
      <Rect x="13" y="3" width="8" height="8" rx="2" fill={color} opacity="0.7" />
      <Rect x="3" y="13" width="8" height="8" rx="2" fill={color} opacity="0.7" />
      <Rect x="13" y="13" width="8" height="8" rx="2" fill={color} opacity="0.5" />
    </Svg>
  );
};



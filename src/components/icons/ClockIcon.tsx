import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface ClockIconProps {
  size?: number;
  color?: string;
}

export const ClockIcon: React.FC<ClockIconProps> = ({
  size = 24,
  color = colors.textMuted,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <Path
        d="M12 7 L12 12 L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};



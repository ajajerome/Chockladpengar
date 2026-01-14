import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface SettingsIconProps {
  size?: number;
  color?: string;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({
  size = 24,
  color = colors.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" fill={color} />
      <Path
        d="M12 3 L12 5 M12 19 L12 21 M3 12 L5 12 M19 12 L21 12 M5.64 5.64 L7.05 7.05 M16.95 16.95 L18.36 18.36 M5.64 18.36 L7.05 16.95 M16.95 7.05 L18.36 5.64"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};



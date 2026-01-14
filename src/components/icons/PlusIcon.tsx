import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface PlusIconProps {
  size?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({
  size = 24,
  color = colors.accent,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path
        d="M12 7 L12 17 M7 12 L17 12"
        stroke={colors.textWhite}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};



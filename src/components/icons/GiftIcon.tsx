import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface GiftIconProps {
  size?: number;
  color?: string;
}

export const GiftIcon: React.FC<GiftIconProps> = ({
  size = 24,
  color = colors.accent,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="10" width="16" height="12" rx="2" fill={color} />
      <Rect x="4" y="7" width="16" height="4" rx="1" fill={color} opacity="0.8" />
      <Path
        d="M12 7 L12 22"
        stroke={colors.textWhite}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M8 7 C8 5 9 3 11 3 C12 3 12 4 12 5 M16 7 C16 5 15 3 13 3 C12 3 12 4 12 5"
        stroke={colors.textWhite}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};



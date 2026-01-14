import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface LockIconProps {
  size?: number;
  color?: string;
}

export const LockIcon: React.FC<LockIconProps> = ({
  size = 24,
  color = colors.textMuted,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="11" width="14" height="10" rx="2" fill={color} />
      <Path
        d="M8 11 L8 7 C8 5 9.5 3 12 3 C14.5 3 16 5 16 7 L16 11"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <Rect x="11" y="14" width="2" height="4" rx="1" fill={colors.textWhite} />
    </Svg>
  );
};



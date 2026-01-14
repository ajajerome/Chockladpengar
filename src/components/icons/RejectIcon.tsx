import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface RejectIconProps {
  size?: number;
  color?: string;
}

export const RejectIcon: React.FC<RejectIconProps> = ({
  size = 24,
  color = colors.error,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path
        d="M8 8 L16 16 M16 8 L8 16"
        stroke={colors.textWhite}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};



import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface ApproveIconProps {
  size?: number;
  color?: string;
}

export const ApproveIcon: React.FC<ApproveIconProps> = ({
  size = 24,
  color = colors.success,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Path
        d="M7 12 L10 15 L17 8"
        stroke={colors.textWhite}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};



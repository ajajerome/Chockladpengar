import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface ProfileIconProps {
  size?: number;
  color?: string;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 24,
  color = colors.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" fill={color} />
      <Path
        d="M4 20 C4 16 7 14 12 14 C17 14 20 16 20 20 L20 22 L4 22 L4 20 Z"
        fill={color}
      />
    </Svg>
  );
};



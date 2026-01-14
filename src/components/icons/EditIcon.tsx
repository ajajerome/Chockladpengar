import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface EditIconProps {
  size?: number;
  color?: string;
}

export const EditIcon: React.FC<EditIconProps> = ({
  size = 24,
  color = colors.text,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17 L3 21 L7 21 L18 10 L14 6 L3 17 Z"
        fill={color}
      />
      <Path
        d="M19 9 L15 5 L17 3 C17.5 2.5 18.5 2.5 19 3 L21 5 C21.5 5.5 21.5 6.5 21 7 L19 9 Z"
        fill={color}
        opacity="0.8"
      />
    </Svg>
  );
};



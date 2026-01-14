import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface CheckboxIconProps {
  size?: number;
  color?: string;
  checked?: boolean;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  size = 24,
  color = colors.success,
  checked = false,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {checked ? (
        <>
          <Rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            fill={color}
          />
          <Path
            d="M7 12 L10 15 L17 8"
            stroke={colors.textWhite}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <Rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          fill="none"
          stroke={colors.border}
          strokeWidth="2"
        />
      )}
    </Svg>
  );
};



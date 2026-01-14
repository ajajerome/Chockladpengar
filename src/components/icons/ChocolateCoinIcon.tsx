import React from 'react';
import Svg, {Circle, Path, Defs, RadialGradient, Stop} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface ChocolateCoinIconProps {
  size?: number;
  color?: string;
}

export const ChocolateCoinIcon: React.FC<ChocolateCoinIconProps> = ({
  size = 24,
  color = colors.coin,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <RadialGradient id="coinGradient" cx="0.3" cy="0.3">
          <Stop offset="0%" stopColor={colors.coinShine} stopOpacity="1" />
          <Stop offset="100%" stopColor={color} stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Circle cx="12" cy="12" r="10" fill="url(#coinGradient)" />
      <Circle cx="12" cy="12" r="7" fill="none" stroke={colors.coinShadow} strokeWidth="1" />
      <Path
        d="M12 8 L12 16 M8 12 L16 12"
        stroke={colors.coinShadow}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};



import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {colors} from '../../theme/colors';

interface NotificationIconProps {
  size?: number;
  color?: string;
  hasNotification?: boolean;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  size = 24,
  color = colors.text,
  hasNotification = false,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8 C18 6.4087 17.3679 4.88258 16.2426 3.75736 C15.1174 2.63214 13.5913 2 12 2 C10.4087 2 8.88258 2.63214 7.75736 3.75736 C6.63214 4.88258 6 6.4087 6 8 C6 15 3 17 3 17 L21 17 C21 17 18 15 18 8 Z"
        fill={color}
      />
      <Path
        d="M13.73 21 C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295 C12.6946 21.9044 12.3504 21.9965 12 21.9965 C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295 C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hasNotification && (
        <Circle cx="18" cy="6" r="4" fill={colors.error} />
      )}
    </Svg>
  );
};



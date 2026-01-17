import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/colors';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
  variant?: 'default' | 'warm' | 'cream' | 'caramel';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  colors: customColors,
  variant = 'default',
}) => {
  const gradientColors = {
    default: [
      colors.backgroundLight,
      colors.background,
      colors.backgroundDark,
    ],
    warm: [
      colors.gradientStart,
      colors.gradientMid,
      colors.gradientEnd,
    ],
    cream: [
      colors.cardCream,
      colors.background,
      colors.cardCaramel,
    ],
    caramel: [
      colors.caramelLight,
      colors.gradientEnd,
      colors.background,
    ],
  };

  return (
    <LinearGradient
      colors={customColors || gradientColors[variant]}
      start={{x: 0, y: 0}}
      end={{x: 0.8, y: 1}}
      style={[styles.gradient, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface PlusIconProps {
  size?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ size = 24, color = colors.secondary }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size * 0.25 }]}>
      {/* Horizontal line */}
      <View style={[styles.lineH, { 
        width: size * 0.6, 
        height: size * 0.15,
        backgroundColor: color,
        borderRadius: size * 0.075
      }]} />
      {/* Vertical line */}
      <View style={[styles.lineV, { 
        width: size * 0.15, 
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: size * 0.075
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  lineH: {
    position: 'absolute',
  },
  lineV: {
    position: 'absolute',
  },
});


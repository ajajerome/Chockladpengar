import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ArrowIconProps {
  size?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  size = 24, 
  direction = 'right',
  color = colors.primary 
}) => {
  const getRotation = () => {
    switch (direction) {
      case 'up': return '-90deg';
      case 'down': return '90deg';
      case 'left': return '180deg';
      case 'right': return '0deg';
      default: return '0deg';
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size, transform: [{ rotate: getRotation() }] }]}>
      {/* Arrow shaft */}
      <View style={[styles.shaft, { 
        width: size * 0.5, 
        height: size * 0.12,
        borderRadius: size * 0.06,
        backgroundColor: color
      }]} />
      {/* Arrow head top */}
      <View style={[styles.headTop, { 
        width: size * 0.35, 
        height: size * 0.12,
        borderRadius: size * 0.06,
        backgroundColor: color,
        right: size * 0.05,
        top: size * 0.3,
        transform: [{ rotate: '45deg' }]
      }]} />
      {/* Arrow head bottom */}
      <View style={[styles.headBottom, { 
        width: size * 0.35, 
        height: size * 0.12,
        borderRadius: size * 0.06,
        backgroundColor: color,
        right: size * 0.05,
        bottom: size * 0.3,
        transform: [{ rotate: '-45deg' }]
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shaft: {
    position: 'absolute',
  },
  headTop: {
    position: 'absolute',
  },
  headBottom: {
    position: 'absolute',
  },
});


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface FactoryIconProps {
  size?: number;
}

export const FactoryIcon: React.FC<FactoryIconProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Factory building */}
      <View style={[styles.building, { 
        width: size * 0.7, 
        height: size * 0.6,
        borderRadius: size * 0.06
      }]} />
      {/* Chimney */}
      <View style={[styles.chimney, { 
        width: size * 0.18, 
        height: size * 0.4,
        borderRadius: size * 0.04,
        top: 0,
        right: size * 0.15
      }]} />
      {/* Chocolate drops */}
      <View style={[styles.drop, styles.drop1, { 
        width: size * 0.1, 
        height: size * 0.12,
        borderRadius: size * 0.05,
        top: size * 0.35,
        right: size * 0.19
      }]} />
      <View style={[styles.drop, styles.drop2, { 
        width: size * 0.08, 
        height: size * 0.1,
        borderRadius: size * 0.04,
        top: size * 0.25,
        right: size * 0.16
      }]} />
      {/* Door */}
      <View style={[styles.door, { 
        width: size * 0.25, 
        height: size * 0.35,
        borderRadius: size * 0.04,
        bottom: 0,
        left: size * 0.1
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
  building: {
    backgroundColor: colors.factory,
    position: 'absolute',
    bottom: 0,
    borderWidth: 2,
    borderColor: '#5D4037',
  },
  chimney: {
    backgroundColor: '#6D4C41',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#5D4037',
  },
  drop: {
    backgroundColor: '#8B5A2B',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#6B4423',
  },
  drop1: {
    opacity: 0.9,
  },
  drop2: {
    opacity: 0.7,
  },
  door: {
    backgroundColor: '#4A2E1A',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#3E2723',
  },
});


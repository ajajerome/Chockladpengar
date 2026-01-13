import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ClockIconProps {
  size?: number;
}

export const ClockIcon: React.FC<ClockIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {/* Hour hand */}
      <View style={[styles.hourHand, { 
        width: 2.5, 
        height: size * 0.3,
        borderRadius: 2,
        top: size * 0.2,
        left: size * 0.5 - 1.25
      }]} />
      {/* Minute hand */}
      <View style={[styles.minuteHand, { 
        width: 2, 
        height: size * 0.35,
        borderRadius: 2,
        top: size * 0.15,
        left: size * 0.5 - 1
      }]} />
      {/* Center dot */}
      <View style={[styles.center, { 
        width: size * 0.12, 
        height: size * 0.12,
        borderRadius: size * 0.06
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B5A2B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2.5,
    borderColor: '#6B4423',
  },
  hourHand: {
    backgroundColor: '#4A2E1A',
    position: 'absolute',
  },
  minuteHand: {
    backgroundColor: '#4A2E1A',
    position: 'absolute',
  },
  center: {
    backgroundColor: '#4A2E1A',
    position: 'absolute',
  },
});


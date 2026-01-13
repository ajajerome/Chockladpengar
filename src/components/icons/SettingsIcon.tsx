import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SettingsIconProps {
  size?: number;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Gear center */}
      <View style={[styles.center, { 
        width: size * 0.4, 
        height: size * 0.4,
        borderRadius: size * 0.2
      }]} />
      {/* Gear teeth */}
      <View style={[styles.tooth, { 
        width: size * 0.25, 
        height: size * 0.15,
        borderRadius: size * 0.04,
        top: 0,
        left: size * 0.375
      }]} />
      <View style={[styles.tooth, { 
        width: size * 0.15, 
        height: size * 0.25,
        borderRadius: size * 0.04,
        top: size * 0.375,
        right: 0
      }]} />
      <View style={[styles.tooth, { 
        width: size * 0.25, 
        height: size * 0.15,
        borderRadius: size * 0.04,
        bottom: 0,
        left: size * 0.375
      }]} />
      <View style={[styles.tooth, { 
        width: size * 0.15, 
        height: size * 0.25,
        borderRadius: size * 0.04,
        top: size * 0.375,
        left: 0
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
  center: {
    backgroundColor: '#4A2E1A',
    borderWidth: 2,
    borderColor: '#3E2723',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  tooth: {
    backgroundColor: '#6B4423',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#4A2E1A',
  },
});


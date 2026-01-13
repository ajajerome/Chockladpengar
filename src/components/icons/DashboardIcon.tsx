import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DashboardIconProps {
  size?: number;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({ size = 24 }) => {
  const boxSize = size * 0.4;
  const gap = size * 0.1;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Four squares */}
      <View style={[styles.box, { 
        width: boxSize, 
        height: boxSize,
        borderRadius: boxSize * 0.2,
        top: 0,
        left: 0
      }]} />
      <View style={[styles.box, { 
        width: boxSize, 
        height: boxSize,
        borderRadius: boxSize * 0.2,
        top: 0,
        right: 0
      }]} />
      <View style={[styles.box, { 
        width: boxSize, 
        height: boxSize,
        borderRadius: boxSize * 0.2,
        bottom: 0,
        left: 0
      }]} />
      <View style={[styles.box, { 
        width: boxSize, 
        height: boxSize,
        borderRadius: boxSize * 0.2,
        bottom: 0,
        right: 0
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#8B5A2B',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#6B4423',
  },
});


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface HomeIconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ size = 24, color = colors.primary }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* House body */}
      <View style={[styles.body, { 
        width: size * 0.65, 
        height: size * 0.5,
        borderRadius: size * 0.06,
        backgroundColor: color,
        bottom: 0
      }]} />
      {/* Roof */}
      <View style={[styles.roof, { 
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.45,
        borderRightWidth: size * 0.45,
        borderBottomWidth: size * 0.35,
        borderBottomColor: color,
        top: 0
      }]} />
      {/* Door */}
      <View style={[styles.door, { 
        width: size * 0.22, 
        height: size * 0.3,
        borderRadius: size * 0.04,
        bottom: 0
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
  body: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  roof: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  door: {
    backgroundColor: colors.primaryDark,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#2C1810',
  },
});


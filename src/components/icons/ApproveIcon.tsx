import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ApproveIconProps {
  size?: number;
}

export const ApproveIcon: React.FC<ApproveIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size * 0.25 }]}>
      {/* Checkmark */}
      <View style={[styles.checkShort, { 
        width: size * 0.3, 
        height: 3,
        left: size * 0.15,
        top: size * 0.48
      }]} />
      <View style={[styles.checkLong, { 
        width: size * 0.5, 
        height: 3,
        right: size * 0.15,
        top: size * 0.35
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#45A049',
  },
  checkShort: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
  checkLong: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
});


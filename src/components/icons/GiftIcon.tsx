import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface GiftIconProps {
  size?: number;
  withPlus?: boolean;
}

export const GiftIcon: React.FC<GiftIconProps> = ({ size = 32, withPlus = false }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Gift box */}
      <View style={[styles.box, { 
        width: size * 0.75, 
        height: size * 0.6,
        borderRadius: size * 0.08,
        bottom: 0
      }]} />
      {/* Ribbon horizontal */}
      <View style={[styles.ribbonH, { 
        width: size * 0.75, 
        height: size * 0.15,
        borderRadius: size * 0.04,
        bottom: size * 0.225
      }]} />
      {/* Ribbon vertical */}
      <View style={[styles.ribbonV, { 
        width: size * 0.15, 
        height: size * 0.6,
        borderRadius: size * 0.04,
        bottom: 0
      }]} />
      {/* Bow */}
      <View style={[styles.bow, { 
        width: size * 0.3, 
        height: size * 0.25,
        borderRadius: size * 0.15,
        top: size * 0.05
      }]} />
      
      {withPlus && (
        <View style={styles.plusContainer}>
          <View style={[styles.plusH, { width: size * 0.25, height: 2 }]} />
          <View style={[styles.plusV, { width: 2, height: size * 0.25 }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#8B5A2B',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#6B4423',
  },
  ribbonH: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#B8941F',
  },
  ribbonV: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#B8941F',
  },
  bow: {
    backgroundColor: colors.secondaryLight,
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  plusContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusH: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    borderRadius: 1,
  },
  plusV: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    borderRadius: 1,
  },
});


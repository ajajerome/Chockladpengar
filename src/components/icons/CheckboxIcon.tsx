import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface CheckboxIconProps {
  size?: number;
  checked?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({ 
  size = 24, 
  checked = false,
  status = 'pending'
}) => {
  const getBackgroundColor = () => {
    if (status === 'approved') return colors.success;
    if (status === 'rejected') return colors.error;
    if (checked) return colors.warning;
    return 'transparent';
  };

  const getBorderColor = () => {
    if (status === 'approved') return colors.success;
    if (status === 'rejected') return colors.error;
    if (checked) return colors.warning;
    return colors.primary;
  };

  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size, 
        borderRadius: size * 0.25,
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor()
      }
    ]}>
      {(checked || status === 'approved') && (
        <View style={styles.checkmarkContainer}>
          {/* Checkmark */}
          <View style={[styles.checkShort, { 
            width: size * 0.25, 
            height: 2.5,
            left: size * 0.15,
            top: size * 0.45
          }]} />
          <View style={[styles.checkLong, { 
            width: size * 0.45, 
            height: 2.5,
            right: size * 0.18,
            top: size * 0.35
          }]} />
        </View>
      )}
      {status === 'rejected' && (
        <View style={styles.crossContainer}>
          {/* Cross */}
          <View style={[styles.crossLine, { 
            width: size * 0.5, 
            height: 2.5,
            transform: [{ rotate: '45deg' }]
          }]} />
          <View style={[styles.crossLine, { 
            width: size * 0.5, 
            height: 2.5,
            transform: [{ rotate: '-45deg' }]
          }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkmarkContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  crossContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossLine: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    borderRadius: 2,
  },
});


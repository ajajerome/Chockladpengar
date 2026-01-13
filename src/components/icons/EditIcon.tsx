import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface EditIconProps {
  size?: number;
}

export const EditIcon: React.FC<EditIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Pencil body */}
      <View style={[styles.body, { 
        width: size * 0.2, 
        height: size * 0.7,
        borderRadius: size * 0.04,
        transform: [{ rotate: '135deg' }],
        top: size * 0.05,
        left: size * 0.25
      }]} />
      {/* Pencil tip */}
      <View style={[styles.tip, { 
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.1,
        borderRightWidth: size * 0.1,
        borderBottomWidth: size * 0.18,
        transform: [{ rotate: '135deg' }],
        top: size * 0.58,
        left: size * 0.25
      }]} />
      {/* Eraser */}
      <View style={[styles.eraser, { 
        width: size * 0.2, 
        height: size * 0.15,
        borderRadius: size * 0.03,
        transform: [{ rotate: '135deg' }],
        top: -size * 0.02,
        left: size * 0.25
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
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#B8941F',
  },
  tip: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6B4423',
  },
  eraser: {
    backgroundColor: '#E8B878',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#D4A857',
  },
});


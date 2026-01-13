import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ChocolateCoinIconProps {
  size?: number;
}

export const ChocolateCoinIcon: React.FC<ChocolateCoinIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <View style={[styles.gloss, { width: size * 0.6, height: size * 0.6, borderRadius: size / 3 }]} />
      <View style={[styles.center, { width: size * 0.4, height: size * 0.4, borderRadius: size / 4 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#B8941F',
  },
  gloss: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  center: {
    backgroundColor: colors.secondaryLight,
  },
});


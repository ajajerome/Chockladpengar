import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface TreasureChestIconProps {
  size?: number;
}

export const TreasureChestIcon: React.FC<TreasureChestIconProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Chest body */}
      <View style={[styles.chest, { 
        width: size * 0.85, 
        height: size * 0.6,
        borderRadius: size * 0.08 
      }]} />
      {/* Lid */}
      <View style={[styles.lid, { 
        width: size * 0.85, 
        height: size * 0.25,
        borderRadius: size * 0.08,
        top: size * 0.1
      }]} />
      {/* Lock */}
      <View style={[styles.lock, { 
        width: size * 0.2, 
        height: size * 0.25,
        borderRadius: size * 0.04,
        top: size * 0.2
      }]} />
      {/* Coins on top */}
      <View style={[styles.coin, { 
        width: size * 0.15, 
        height: size * 0.15,
        borderRadius: size * 0.075,
        top: size * 0.05,
        left: size * 0.15
      }]} />
      <View style={[styles.coin, { 
        width: size * 0.15, 
        height: size * 0.15,
        borderRadius: size * 0.075,
        top: size * 0.02,
        right: size * 0.15
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
  chest: {
    backgroundColor: '#8B5A2B',
    position: 'absolute',
    bottom: 0,
    borderWidth: 2,
    borderColor: '#6B4423',
  },
  lid: {
    backgroundColor: '#A0643C',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#6B4423',
  },
  lock: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#B8941F',
  },
  coin: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#B8941F',
  },
});


import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {ChocolateCoinIcon} from './icons/ChocolateCoinIcon';

interface ChocolateCoinProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const ChocolateCoin: React.FC<ChocolateCoinProps> = ({
  amount,
  size = 'medium',
  showLabel = true,
}) => {
  const iconSize = size === 'small' ? 16 : size === 'medium' ? 24 : 32;
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 18 : 24;

  return (
    <View style={styles.container}>
      <ChocolateCoinIcon size={iconSize} />
      <Text style={[styles.amount, {fontSize}]}>{amount}</Text>
      {showLabel && <Text style={styles.label}>chokladpengar</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amount: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
});



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface ChocolateCoinProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

export const ChocolateCoin: React.FC<ChocolateCoinProps> = ({
  amount,
  size = 'medium',
  showIcon = true,
}) => {
  const sizeStyles = {
    small: { fontSize: 12, iconSize: 16, coinSize: 16 },
    medium: { fontSize: 16, iconSize: 20, coinSize: 20 },
    large: { fontSize: 20, iconSize: 24, coinSize: 24 },
  };

  const { fontSize, coinSize } = sizeStyles[size];

  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={[styles.coinIcon, { width: coinSize, height: coinSize }]}>
          <View style={styles.coinInner} />
        </View>
      )}
      <Text style={[styles.amount, { fontSize }]}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  coinIcon: {
    borderRadius: 100,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.chocolate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinInner: {
    width: '50%',
    height: '50%',
    borderRadius: 100,
    backgroundColor: colors.secondaryLight,
  },
  amount: {
    color: colors.chocolate,
    fontWeight: 'bold',
  },
});

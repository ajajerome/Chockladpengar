import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Reward} from '../types';
import {colors} from '../theme/colors';
import {ChocolateCoinIcon} from './icons/ChocolateCoinIcon';
import {GiftIcon} from './icons/GiftIcon';

interface RewardCardProps {
  reward: Reward;
  onPress?: () => void;
  canAfford?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  onPress,
  canAfford = true,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, !canAfford && styles.cardDisabled]}
      onPress={onPress}
      disabled={!onPress || !canAfford}
      activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <GiftIcon size={48} color={canAfford ? colors.accent : colors.textMuted} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, !canAfford && styles.titleDisabled]}>
          {reward.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {reward.description}
        </Text>
        <Text style={styles.category}>{reward.category}</Text>
      </View>

      <View style={[styles.priceContainer, !canAfford && styles.priceDisabled]}>
        <ChocolateCoinIcon size={20} />
        <Text style={styles.price}>{reward.cost}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  titleDisabled: {
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  priceDisabled: {
    backgroundColor: colors.border,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
});



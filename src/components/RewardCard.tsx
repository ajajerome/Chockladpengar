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
      activeOpacity={0.8}>
      <View style={[
        styles.iconContainer,
        {backgroundColor: canAfford ? colors.cardGold : colors.border}
      ]}>
        <GiftIcon size={32} color={canAfford ? colors.accent : colors.textMuted} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, !canAfford && styles.titleDisabled]}>
          {reward.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {reward.description}
        </Text>
        <View style={styles.categoryTag}>
          <Text style={styles.category}>{reward.category}</Text>
        </View>
      </View>

      <View style={[
        styles.priceContainer,
        {backgroundColor: canAfford ? colors.accent : colors.border}
      ]}>
        <ChocolateCoinIcon size={16} />
        <Text style={[styles.price, !canAfford && styles.priceDisabled]}>
          {reward.cost}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  titleDisabled: {
    color: colors.textMuted,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    lineHeight: 20,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cardCaramel,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  category: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  priceDisabled: {
    color: colors.textWhite,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Reward } from '../types';
import { colors } from '../theme/colors';
import { ChocolateCoin } from './ChocolateCoin';

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
  const getCategoryColor = () => {
    switch (reward.category) {
      case 'activity':
        return '#E3F2FD';
      case 'privilege':
        return '#FFF3E0';
      case 'thing':
        return '#F3E5F5';
      default:
        return colors.background;
    }
  };

  const getCategoryLabel = () => {
    switch (reward.category) {
      case 'activity':
        return 'Aktivitet';
      case 'privilege':
        return 'Privilegium';
      case 'thing':
        return 'Sak';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !canAfford && styles.disabled,
        !reward.available && styles.unavailable,
      ]}
      onPress={onPress}
      disabled={!onPress || !canAfford || !reward.available}
    >
      <View style={[styles.iconContainer, { backgroundColor: getCategoryColor() }]}>
        <Text style={styles.categoryLabel}>{getCategoryLabel()}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{reward.title}</Text>
        {reward.description && (
          <Text style={styles.description} numberOfLines={2}>
            {reward.description}
          </Text>
        )}
        <View style={styles.footer}>
          <ChocolateCoin amount={reward.cost} size="medium" />
          {!canAfford && (
            <Text style={styles.cantAfford}>Inte råd</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disabled: {
    opacity: 0.6,
  },
  unavailable: {
    backgroundColor: colors.backgroundDark,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cantAfford: {
    fontSize: 12,
    color: colors.error,
    fontStyle: 'italic',
  },
});

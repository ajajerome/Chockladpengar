import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { RewardCard } from '../../components/RewardCard';

export const RewardShopScreen: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const rewards = useStore((state) => state.rewards);
  const balance = useStore((state) =>
    currentUser ? state.getBalance(currentUser.id) : 0
  );
  const purchaseReward = useStore((state) => state.purchaseReward);

  const availableRewards = rewards.filter((r) => r.available);

  const handlePurchase = (rewardId: string, rewardTitle: string, cost: number) => {
    if (!currentUser) return;

    if (balance < cost) {
      Alert.alert(
        'Inte tillräckligt med chokladpengar',
        `Du behöver ${cost - balance} chokladpengar till.`
      );
      return;
    }

    Alert.alert(
      'Köp belöning',
      `Vill du köpa "${rewardTitle}" för ${cost} 🍫?`,
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Köp',
          onPress: () => {
            purchaseReward(rewardId, currentUser.id);
            Alert.alert('Grattis! 🎉', 'Belöningen är din!');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍬 Chokladkassan</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Ditt saldo:</Text>
          <ChocolateCoin amount={balance} size="large" />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {availableRewards.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Inga belöningar tillgängliga just nu 🎁
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Fråga dina föräldrar om att lägga till några!
              </Text>
            </View>
          ) : (
            availableRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canAfford={balance >= reward.cost}
                onPress={() => handlePurchase(reward.id, reward.title, reward.cost)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textMuted,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});


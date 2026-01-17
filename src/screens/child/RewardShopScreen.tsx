import React from 'react';
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
import { GradientBackground } from '../../components/GradientBackground';

export const RewardShopScreen: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const rewards = useStore((state) => state.rewards);
  const balance = useStore((state) =>
    currentUser ? state.getBalance(currentUser.id) : 0
  );
  const purchaseReward = useStore((state) => state.purchaseReward);

  // Filter rewards for current user's family
  const availableRewards = rewards.filter((r) => r.familyId === currentUser?.familyId);

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
            const success = purchaseReward(rewardId);
            if (success) {
              Alert.alert('Grattis! 🎉', 'Belöningen är din!');
            }
          },
        },
      ]
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chokladkassan</Text>
        <Text style={styles.subtitle}>Välj din belöning</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Ditt saldo</Text>
          <ChocolateCoin amount={balance} size="large" />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {availableRewards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎁</Text>
            <Text style={styles.emptyText}>
              Inga belöningar tillgängliga
            </Text>
            <Text style={styles.emptySubtext}>
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
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: colors.textMuted,
    marginBottom: 24,
    fontWeight: '500',
  },
  balanceCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 12,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  emptyState: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 48,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 16,
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { RewardCard } from '../../components/RewardCard';
import { TreasureChestIcon } from '../../components/icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const RewardShopScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, rewards, getBalance, purchaseReward } = useStore();
  const balance = currentUser ? getBalance(currentUser.id) : 0;

  const handlePurchase = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward || !currentUser) return;

    if (balance < reward.cost) {
      Alert.alert('Inte råd', 'Du har inte tillräckligt med chokladpengar.');
      return;
    }

    Alert.alert(
      'Köp belöning',
      `Vill du köpa "${reward.title}" för ${reward.cost} chokladpengar?`,
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Köp',
          onPress: () => {
            purchaseReward(rewardId, currentUser.id);
            Alert.alert('Grattis!', `Du köpte ${reward.title}!`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TreasureChestIcon size={32} />
          <Text style={styles.title}>Chokladkassan</Text>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Ditt saldo:</Text>
          <ChocolateCoin amount={balance} size="medium" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {rewards.length === 0 ? (
            <View style={styles.emptyState}>
              <TreasureChestIcon size={64} />
              <Text style={styles.emptyText}>
                Inga belöningar tillgängliga än
              </Text>
              <Text style={styles.emptySubtext}>
                Be din förälder lägga till belöningar!
              </Text>
            </View>
          ) : (
            rewards
              .filter((reward) => reward.available)
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  onPress={() => handlePurchase(reward.id)}
                  canAfford={balance >= reward.cost}
                />
              ))
          )}
        </View>
        <View style={{ height: 32 }} />
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
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  emptyState: {
    backgroundColor: colors.backgroundLight,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

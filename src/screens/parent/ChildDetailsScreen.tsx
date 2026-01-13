import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { TaskCard } from '../../components/TaskCard';
import { ProfileIcon, FactoryIcon, BarChartIcon } from '../../components/icons';
import { RouteProp } from '@react-navigation/native';

type ChildDetailsScreenRouteProp = RouteProp<{ params: { childId: string } }, 'params'>;

interface Props {
  route: ChildDetailsScreenRouteProp;
}

export const ChildDetailsScreen: React.FC<Props> = ({ route }) => {
  const { childId } = route.params;
  const { users, tasks, getBalance, investments, getFactory, purchases, rewards } = useStore();

  const child = users.find((u) => u.id === childId);
  const balance = getBalance(childId);
  const childTasks = tasks.filter((t) => t.assignedTo === childId);
  const childInvestments = investments.filter((i) => i.childId === childId);
  const factory = getFactory(childId);
  const childPurchases = purchases.filter((p) => p.childId === childId);

  if (!child) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Barn hittades inte</Text>
      </SafeAreaView>
    );
  }

  const totalInvested = childInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const factoryProgress = factory ? (factory.completedStages.length / 6) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <ProfileIcon size={80} />
          <Text style={styles.childName}>{child.name}</Text>
          <View style={styles.balanceContainer}>
            <ChocolateCoin amount={balance} size="large" />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Översikt</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <BarChartIcon size={32} />
              <Text style={styles.statLabel}>Investeringar</Text>
              <ChocolateCoin amount={Math.floor(totalInvested)} size="medium" />
            </View>
            <View style={styles.statCard}>
              <FactoryIcon size={32} />
              <Text style={styles.statLabel}>Fabrik</Text>
              <Text style={styles.statValue}>{Math.floor(factoryProgress)}%</Text>
            </View>
          </View>
        </View>

        {/* Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uppgifter</Text>
          <View style={styles.statsRow}>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatLabel}>Pågående</Text>
              <Text style={styles.miniStatValue}>
                {childTasks.filter((t) => t.status === 'pending').length}
              </Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatLabel}>Väntar</Text>
              <Text style={styles.miniStatValue}>
                {childTasks.filter((t) => t.status === 'completed').length}
              </Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatLabel}>Godkända</Text>
              <Text style={styles.miniStatValue}>
                {childTasks.filter((t) => t.status === 'approved').length}
              </Text>
            </View>
          </View>

          {childTasks.length > 0 ? (
            <View style={styles.taskList}>
              <Text style={styles.subTitle}>Senaste uppgifter</Text>
              {childTasks.slice(0, 5).map((task) => (
                <TaskCard key={task.id} task={task} showStatus />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Inga uppgifter än</Text>
            </View>
          )}
        </View>

        {/* Purchases */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Köp</Text>
          <View style={styles.purchasesList}>
            {childPurchases.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Inga köp än</Text>
              </View>
            ) : (
              childPurchases.slice(0, 5).map((purchase) => {
                const reward = rewards.find((r) => r.id === purchase.rewardId);
                return (
                  <View key={purchase.id} style={styles.purchaseCard}>
                    <View style={styles.purchaseInfo}>
                      <Text style={styles.purchaseTitle}>{reward?.title}</Text>
                      <Text style={styles.purchaseDate}>
                        {new Date(purchase.purchasedAt).toLocaleDateString('sv-SE')}
                      </Text>
                    </View>
                    <ChocolateCoin amount={purchase.cost} size="small" />
                  </View>
                );
              })
            )}
          </View>
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.primary,
    padding: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  childName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.backgroundLight,
    marginTop: 16,
    marginBottom: 16,
  },
  balanceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  miniStat: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  miniStatLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  taskList: {
    gap: 8,
  },
  purchasesList: {
    gap: 8,
  },
  purchaseCard: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  purchaseDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyState: {
    backgroundColor: colors.backgroundLight,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 32,
  },
});


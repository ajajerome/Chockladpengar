import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { TaskCard } from '../../components/TaskCard';
import { GradientBackground } from '../../components/GradientBackground';

interface ChildHomeScreenProps {
  navigation: any;
}

export const ChildHomeScreen: React.FC<ChildHomeScreenProps> = ({ navigation }) => {
  const currentUser = useStore((state) => state.currentUser);
  const tasks = useStore((state) => state.tasks);
  const balance = useStore((state) =>
    currentUser ? state.getBalance(currentUser.id) : 0
  );
  const completeTask = useStore((state) => state.completeTask);

  const myTasks = tasks.filter(
    (task) =>
      task.assignedTo === currentUser?.id &&
      (task.status === 'pending' || task.status === 'rejected')
  );

  const handleCompleteTask = (taskId: string) => {
    if (currentUser) {
      completeTask(taskId, currentUser.id);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with balance */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hej {currentUser?.name}!</Text>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Dina Chokladpengar</Text>
            <ChocolateCoin amount={balance} size="large" />
          </View>
        </View>

        {/* Today's tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dagens uppgifter</Text>
          {myTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>🎉</Text>
              <Text style={styles.emptyStateText}>
                Inga uppgifter just nu!
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Njut av din lediga tid
              </Text>
            </View>
          ) : (
            myTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onPress={() => handleCompleteTask(task.id)}
                showStatus
              />
            ))
          )}
        </View>

        {/* Action buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vad vill du göra?</Text>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardCaramel }]}
            onPress={() => navigation.navigate('RewardShop')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, {backgroundColor: colors.caramelLight}]}>
              <Text style={styles.actionIcon}>🍬</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladkassan</Text>
              <Text style={styles.actionDescription}>
                Köp belöningar med dina chokladpengar
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardGold }]}
            onPress={() => navigation.navigate('Investments')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, {backgroundColor: colors.gradientGold}]}>
              <Text style={styles.actionIcon}>📈</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfonder</Text>
              <Text style={styles.actionDescription}>
                Investera och öka dina chokladpengar
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.cardBrown }]}
            onPress={() => navigation.navigate('Factory')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, {backgroundColor: colors.cardMocha}]}>
              <Text style={styles.actionIcon}>🏭</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfabriken</Text>
              <Text style={styles.actionDescription}>
                Bygg din fabrik och få passiv inkomst
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  balanceCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 12,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  emptyState: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 48,
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  emptyStateEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  chevron: {
    fontSize: 28,
    color: colors.textMuted,
    marginLeft: 8,
    fontWeight: '300',
  },
  bottomSpacing: {
    height: 16,
  },
});

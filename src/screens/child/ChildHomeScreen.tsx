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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with balance */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hej {currentUser?.name}! 👋</Text>
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
              <Text style={styles.emptyStateText}>
                🎉 Inga uppgifter just nu!
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
            style={[styles.actionCard, { backgroundColor: '#FFE5E5' }]}
            onPress={() => navigation.navigate('RewardShop')}
          >
            <Text style={styles.actionIcon}>🍬</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladkassan</Text>
              <Text style={styles.actionDescription}>
                Köp belöningar med dina chokladpengar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#E5F5FF' }]}
            onPress={() => navigation.navigate('Investments')}
          >
            <Text style={styles.actionIcon}>📈</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfonder</Text>
              <Text style={styles.actionDescription}>
                Investera och öka dina chokladpengar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#F5E5FF' }]}
            onPress={() => navigation.navigate('Factory')}
          >
            <Text style={styles.actionIcon}>🏭</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfabriken</Text>
              <Text style={styles.actionDescription}>
                Bygg din fabrik och få passiv inkomst
              </Text>
            </View>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 8,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
});


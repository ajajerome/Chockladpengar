import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { TaskCard } from '../../components/TaskCard';
import { Button } from '../../components/Button';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { ProfileIcon, ApproveIcon, RejectIcon, PlusIcon, DashboardIcon } from '../../components/icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export const ParentHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { 
    currentUser, 
    tasks, 
    users, 
    rewards,
    approveTask, 
    rejectTask, 
    getBalance,
    investments,
    getFactory 
  } = useStore();

  const children = users.filter(
    (u) => u.role === 'child' && u.familyId === currentUser?.familyId
  );

  const pendingTasks = tasks.filter((task) => task.status === 'completed');
  const allTasks = tasks.filter((task) => task.status !== 'rejected');

  const handleApprove = (taskId: string) => {
    approveTask(taskId);
    Alert.alert('Godkänt!', 'Barnet har fått sina chokladpengar!');
  };

  const handleReject = (taskId: string) => {
    Alert.alert(
      'Neka uppgift',
      'Är du säker på att du vill neka denna uppgift?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Neka',
          style: 'destructive',
          onPress: () => {
            rejectTask(taskId);
            Alert.alert('Nekad', 'Uppgiften har nekats');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <DashboardIcon size={28} />
          <Text style={styles.headerTitle}>Föräldervy</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Children Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Barn</Text>
          {children.map((child) => {
            const balance = getBalance(child.id);
            const childInvestments = investments.filter(i => i.childId === child.id);
            const totalInvested = childInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
            const factory = getFactory(child.id);
            const factoryProgress = factory ? (factory.completedStages.length / 6) * 100 : 0;

            return (
              <TouchableOpacity
                key={child.id}
                style={styles.childCard}
                onPress={() => navigation.navigate('ChildDetails', { childId: child.id })}
              >
                <View style={styles.childHeader}>
                  <ProfileIcon size={50} />
                  <View style={styles.childInfo}>
                    <Text style={styles.childName}>{child.name}</Text>
                  </View>
                </View>

                <View style={styles.childStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Saldo</Text>
                    <ChocolateCoin amount={balance} size="medium" />
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Investeringar</Text>
                    <ChocolateCoin amount={Math.floor(totalInvested)} size="medium" />
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Fabrik</Text>
                    <Text style={styles.statValue}>{Math.floor(factoryProgress)}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {children.length === 0 && (
            <View style={styles.emptyState}>
              <ProfileIcon size={48} />
              <Text style={styles.emptyText}>Inga barn tillagda än</Text>
              <Text style={styles.emptySubtext}>Skapa ett barnkonto för att komma igång</Text>
            </View>
          )}
        </View>

        {/* Pending Approvals */}
        {pendingTasks.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Väntar på godkännande</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pendingTasks.length}</Text>
              </View>
            </View>
            {pendingTasks.map((task) => (
              <View key={task.id} style={styles.taskContainer}>
                <TaskCard task={task} showStatus />
                <View style={styles.taskActions}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApprove(task.id)}
                  >
                    <ApproveIcon size={20} />
                    <Text style={styles.approveText}>Godkänn</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(task.id)}
                  >
                    <RejectIcon size={20} />
                    <Text style={styles.rejectText}>Neka</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* All Tasks Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uppgifter</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Totalt aktiva:</Text>
              <Text style={styles.summaryValue}>{allTasks.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Godkända:</Text>
              <Text style={styles.summaryValue}>
                {tasks.filter(t => t.status === 'approved').length}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('ManageTasks')}
          >
            <Text style={styles.viewAllText}>Se alla uppgifter</Text>
          </TouchableOpacity>
        </View>

        {/* Rewards Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Belöningar</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tillgängliga:</Text>
              <Text style={styles.summaryValue}>
                {rewards.filter(r => r.available).length}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skapa nytt</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('CreateTask')}
          >
            <View style={styles.actionIconCircle}>
              <PlusIcon size={28} color={colors.backgroundLight} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Skapa uppgift</Text>
              <Text style={styles.actionDescription}>Lägg till ny uppgift för barnet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('CreateReward')}
          >
            <View style={styles.actionIconCircle}>
              <PlusIcon size={28} color={colors.backgroundLight} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Skapa belöning</Text>
              <Text style={styles.actionDescription}>Lägg till ny belöning</Text>
            </View>
          </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: colors.error,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    marginBottom: 16,
  },
  badgeText: {
    color: colors.backgroundLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  childCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  childInfo: {
    flex: 1,
    marginLeft: 12,
  },
  childName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  childStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  emptyState: {
    backgroundColor: colors.backgroundLight,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
  },
  taskContainer: {
    marginBottom: 16,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  approveText: {
    color: colors.backgroundLight,
    fontSize: 14,
    fontWeight: '600',
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  rejectText: {
    color: colors.backgroundLight,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  viewAllButton: {
    backgroundColor: colors.backgroundLight,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  actionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
});

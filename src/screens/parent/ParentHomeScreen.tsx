import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {TaskCard} from '../../components/TaskCard';
import {Button} from '../../components/Button';
import {PlusIcon, ProfileIcon, ApproveIcon, RejectIcon} from '../../components/icons';

export const ParentHomeScreen = ({navigation}: any) => {
  const currentUser = useStore(state => state.currentUser);
  const family = useStore(state =>
    state.families.find(f => f.id === currentUser?.familyId)
  );
  const children = useStore(state =>
    state.users.filter(u => family?.childIds.includes(u.id))
  );
  const tasks = useStore(state =>
    state.tasks.filter(t => t.familyId === currentUser?.familyId)
  );
  const pendingTasks = tasks.filter(t => t.status === 'completed');
  const approveTask = useStore(state => state.approveTask);
  const rejectTask = useStore(state => state.rejectTask);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Föräldravy</Text>
        <Text style={styles.subtitle}>Familj: {family?.name}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Barn</Text>
        </View>
        {children.map(child => {
          const balance = useStore.getState().getBalance(child.id);
          return (
            <TouchableOpacity key={child.id} style={styles.childCard}>
              <View style={styles.childInfo}>
                <ProfileIcon size={40} color={colors.accent} />
                <View style={styles.childDetails}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childBalance}>{balance} chokladpengar</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Uppgifter att godkänna</Text>
        </View>
        {pendingTasks.length === 0 ? (
          <Text style={styles.emptyText}>Inga uppgifter att godkänna</Text>
        ) : (
          pendingTasks.map(task => (
            <View key={task.id}>
              <TaskCard task={task} />
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rejectButton]}
                  onPress={() => rejectTask(task.id)}>
                  <RejectIcon size={20} />
                  <Text style={styles.buttonText}>Neka</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.approveButton]}
                  onPress={() => approveTask(task.id)}>
                  <ApproveIcon size={20} />
                  <Text style={styles.buttonText}>Godkänn</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hantera</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Skapa uppgift"
            onPress={() => navigation.navigate('CreateTask')}
            variant="primary"
          />
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Skapa belöning"
            onPress={() => navigation.navigate('CreateReward')}
            variant="secondary"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textWhite,
    marginTop: 4,
    opacity: 0.8,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  childCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  childBalance: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: -8,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  rejectButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.textWhite,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonRow: {
    marginVertical: 8,
  },
});


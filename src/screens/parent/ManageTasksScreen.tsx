import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { TaskCard } from '../../components/TaskCard';
import { DashboardIcon } from '../../components/icons';

export const ManageTasksScreen: React.FC = () => {
  const { tasks } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'approved'>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return task.status !== 'rejected';
    return task.status === filter;
  });

  const getFilterCount = (filterType: string) => {
    if (filterType === 'all') return tasks.filter(t => t.status !== 'rejected').length;
    return tasks.filter((t) => t.status === filterType).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <DashboardIcon size={28} />
          <Text style={styles.title}>Hantera Uppgifter</Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              Alla ({getFilterCount('all')})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Pågående ({getFilterCount('pending')})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Väntar ({getFilterCount('completed')})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'approved' && styles.filterButtonActive]}
            onPress={() => setFilter('approved')}
          >
            <Text style={[styles.filterText, filter === 'approved' && styles.filterTextActive]}>
              Godkända ({getFilterCount('approved')})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {filteredTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <DashboardIcon size={48} />
              <Text style={styles.emptyText}>Inga uppgifter här</Text>
            </View>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} showStatus />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  filterScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.backgroundLight,
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
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
  },
});


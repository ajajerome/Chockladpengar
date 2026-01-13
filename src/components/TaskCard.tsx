import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { colors } from '../theme/colors';
import { ChocolateCoin } from './ChocolateCoin';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  showStatus?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  showStatus = false,
}) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'pending':
        return (
          <View style={styles.checkbox}>
            <View style={styles.checkboxInner} />
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.checkbox, styles.checkboxPending]}>
            <Text style={styles.checkboxText}>...</Text>
          </View>
        );
      case 'approved':
        return (
          <View style={[styles.checkbox, styles.checkboxApproved]}>
            <Text style={styles.checkboxText}>✓</Text>
          </View>
        );
      case 'rejected':
        return (
          <View style={[styles.checkbox, styles.checkboxRejected]}>
            <Text style={styles.checkboxText}>✗</Text>
          </View>
        );
      default:
        return (
          <View style={styles.checkbox}>
            <View style={styles.checkboxInner} />
          </View>
        );
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'pending':
        return 'Pågående';
      case 'completed':
        return 'Väntar på godkännande';
      case 'approved':
        return 'Godkänd';
      case 'rejected':
        return 'Nekad';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        task.status === 'approved' && styles.approved,
        task.status === 'rejected' && styles.rejected,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {getStatusIcon()}
          <Text style={styles.title}>{task.title}</Text>
        </View>
        <ChocolateCoin amount={task.points} size="medium" />
      </View>

      {task.description && (
        <Text style={styles.description}>{task.description}</Text>
      )}

      <View style={styles.footer}>
        {showStatus && (
          <Text style={styles.status}>{getStatusText()}</Text>
        )}
        {task.deadline && (
          <Text style={styles.deadline}>
            Deadline: {format(new Date(task.deadline), 'dd MMM')}
          </Text>
        )}
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
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  approved: {
    borderColor: colors.success,
    backgroundColor: '#F1F8F4',
  },
  rejected: {
    borderColor: colors.error,
    backgroundColor: '#FFF4F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  checkboxPending: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  checkboxApproved: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkboxRejected: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  checkboxText: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
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
  status: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  deadline: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

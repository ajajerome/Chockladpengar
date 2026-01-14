import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Task} from '../types';
import {colors} from '../theme/colors';
import {ChocolateCoinIcon} from './icons/ChocolateCoinIcon';
import {CheckboxIcon} from './icons/CheckboxIcon';
import {ClockIcon} from './icons/ClockIcon';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  showActions?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  showActions = false,
}) => {
  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return colors.info;
      case 'approved':
        return colors.success;
      case 'rejected':
        return colors.error;
      default:
        return colors.textMuted;
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'pending':
        return 'Att göra';
      case 'completed':
        return 'Inväntar godkännande';
      case 'approved':
        return 'Godkänd';
      case 'rejected':
        return 'Ej godkänd';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, {borderLeftColor: getStatusColor()}]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {task.status === 'approved' && (
            <CheckboxIcon size={20} color={colors.success} checked={true} />
          )}
          <Text style={styles.title}>{task.title}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <ChocolateCoinIcon size={16} />
          <Text style={styles.points}>{task.points}</Text>
        </View>
      </View>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.footer}>
        <View style={[styles.statusBadge, {backgroundColor: getStatusColor()}]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>

        {task.deadline && (
          <View style={styles.deadlineContainer}>
            <ClockIcon size={14} color={colors.textMuted} />
            <Text style={styles.deadline}>
              {new Date(task.deadline).toLocaleDateString('sv-SE')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.accent,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: colors.textWhite,
    fontWeight: '600',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadline: {
    fontSize: 12,
    color: colors.textMuted,
  },
});



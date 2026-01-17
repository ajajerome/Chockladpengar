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
        return colors.warning;
      case 'approved':
        return colors.success;
      case 'rejected':
        return colors.error;
      default:
        return colors.info;
    }
  };

  const getStatusBackground = () => {
    switch (task.status) {
      case 'completed':
        return colors.cardGold;
      case 'approved':
        return colors.cardCream;
      case 'rejected':
        return colors.cardCaramel;
      default:
        return colors.cardBrown;
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
      style={[styles.card, {backgroundColor: getStatusBackground()}]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {task.status === 'approved' && (
            <View style={styles.checkContainer}>
              <CheckboxIcon size={20} color={colors.success} checked={true} />
            </View>
          )}
          <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
        </View>
        <View style={[styles.pointsContainer, {backgroundColor: getStatusColor()}]}>
          <ChocolateCoinIcon size={14} />
          <Text style={styles.points}>{task.points}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>{task.description}</Text>

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
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadowCard,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  checkContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    letterSpacing: -0.3,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  points: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textWhite,
  },
  description: {
    fontSize: 15,
    color: colors.textLight,
    marginBottom: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 13,
    color: colors.textWhite,
    fontWeight: '600',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadline: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
});

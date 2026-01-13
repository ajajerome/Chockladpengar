import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { TaskCard } from '../../components/TaskCard';
import { NavigationProp } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  navigation: NavigationProp<any>;
}

export const ChildHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { currentUser, tasks, getBalance, completeTask } = useStore();
  const balance = currentUser ? getBalance(currentUser.id) : 0;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const myTasks = tasks.filter(
    (task) =>
      task.assignedTo === currentUser?.id &&
      (task.status === 'pending' || task.status === 'completed')
  );

  const handleTaskPress = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status === 'pending' && currentUser) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      completeTask(taskId, currentUser.id);
    }
  };

  const animateBalance = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animateBalance();
  }, [balance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Balance Header */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceContent}>
            <View style={styles.coinLarge}>
              <View style={styles.coinLargeInner} />
            </View>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Chokladpengar</Text>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Text style={styles.balanceAmount}>{balance}</Text>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dagens uppgifter</Text>
          {myTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Inga uppgifter just nu</Text>
              <Text style={styles.emptySubtext}>Du är klar för idag!</Text>
            </View>
          ) : (
            myTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onPress={() => handleTaskPress(task.id)}
                showStatus
              />
            ))
          )}
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vad vill du göra?</Text>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#FFF4E6' }]}
            onPress={() => navigation.navigate('RewardShop')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIconText}>BELÖN</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladkassan</Text>
              <Text style={styles.actionDescription}>Köp belöningar</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#E8F5E9' }]}
            onPress={() => navigation.navigate('Investments')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIconText}>FOND</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfonder</Text>
              <Text style={styles.actionDescription}>Investera dina pengar</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#FFF3E0' }]}
            onPress={() => navigation.navigate('Factory')}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIconText}>FAB</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chokladfabriken</Text>
              <Text style={styles.actionDescription}>Bygg din fabrik</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
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
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    margin: 16,
    marginTop: 8,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    borderWidth: 4,
    borderColor: colors.chocolate,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  coinLargeInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondaryLight,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    opacity: 0.9,
  },
  balanceAmount: {
    color: colors.secondary,
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  section: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  actionIconText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  actionArrow: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

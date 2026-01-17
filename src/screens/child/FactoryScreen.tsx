import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, SafeAreaView} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {ChocolateCoin} from '../../components/ChocolateCoin';
import {CheckboxIcon, LockIcon, FactoryIcon} from '../../components/icons';
import {GradientBackground} from '../../components/GradientBackground';

const FACTORY_STEPS = [
  {name: 'Grundmur', cost: 50},
  {name: 'Maskiner', cost: 100},
  {name: 'Formstationen', cost: 150},
  {name: 'Pralinlinjen', cost: 200},
  {name: 'Skylten', cost: 250},
  {name: 'Invigning', cost: 300},
];

export const FactoryScreen = () => {
  const currentUser = useStore(state => state.currentUser);
  const factory = useStore(state =>
    state.factories.find(f => f.userId === currentUser?.id)
  );
  const balance = useStore(state => state.getBalance(currentUser?.id || ''));
  const buildFactoryStep = useStore(state => state.buildFactoryStep);

  const handleBuildStep = () => {
    if (!factory) return;

    const currentStepCost = FACTORY_STEPS[factory.currentStep].cost;

    if (balance < currentStepCost) {
      Alert.alert(
        'Inte tillräckligt med pengar',
        `Du behöver ${currentStepCost} chokladpengar för nästa steg`
      );
      return;
    }

    Alert.alert(
      'Bygg nästa steg?',
      `Detta kostar ${currentStepCost} chokladpengar`,
      [
        {text: 'Avbryt', style: 'cancel'},
        {
          text: 'Bygg',
          onPress: () => {
            if (buildFactoryStep()) {
              if (factory.currentStep + 1 >= FACTORY_STEPS.length) {
                Alert.alert(
                  'Grattis! 🎉',
                  'Din chokladfabrik är klar! Du får nu 1 chokladpeng per vecka!'
                );
              }
            }
          },
        },
      ]
    );
  };

  if (!factory) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Ingen fabrik hittades</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Min Chokladfabrik</Text>
            <Text style={styles.subtitle}>
              Steg {factory.currentStep} av {FACTORY_STEPS.length}
            </Text>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Ditt saldo</Text>
              <ChocolateCoin amount={balance} size="large" />
            </View>
          </View>

          <View style={styles.factoryIcon}>
            <FactoryIcon size={120} color={factory.isComplete ? colors.accent : colors.textMuted} />
          </View>

          {factory.isComplete && (
            <View style={styles.completeCard}>
              <Text style={styles.completeTitle}>Fabrik klar! 🎉</Text>
              <Text style={styles.completeText}>
                Din fabrik producerar {factory.weeklyIncome} chokladpeng/vecka
              </Text>
            </View>
          )}

          <View style={styles.stepsContainer}>
            <Text style={styles.sectionTitle}>Byggsteg</Text>
            {FACTORY_STEPS.map((step, index) => {
              const isComplete = index < factory.currentStep;
              const isCurrent = index === factory.currentStep;
              const isLocked = index > factory.currentStep;

              return (
                <View
                  key={index}
                  style={[
                    styles.stepCard,
                    isCurrent && styles.stepCardCurrent,
                    isComplete && styles.stepCardComplete,
                  ]}>
                  <View style={styles.stepIcon}>
                    {isComplete ? (
                      <CheckboxIcon size={24} checked={true} color={colors.success} />
                    ) : isLocked ? (
                      <LockIcon size={24} color={colors.textMuted} />
                    ) : (
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor: colors.accent,
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.stepContent}>
                    <Text
                      style={[
                        styles.stepName,
                        isComplete && styles.stepNameComplete,
                        isLocked && styles.stepNameLocked,
                      ]}>
                      {step.name}
                    </Text>
                    <Text style={styles.stepCost}>{step.cost} chokladpengar</Text>
                  </View>

                  {isCurrent && !factory.isComplete && (
                    <Button
                      title="Bygg"
                      onPress={handleBuildStep}
                      variant="primary"
                      size="small"
                      disabled={balance < step.cost}
                    />
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.sectionTitle}>Statistik</Text>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Totalt investerat:</Text>
              <Text style={styles.statValue}>{factory.totalInvested} chokladpengar</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Veckovinst:</Text>
              <Text style={styles.statValue}>{factory.weeklyIncome} chokladpengar</Text>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 17,
    color: colors.textMuted,
    fontWeight: '500',
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: colors.textMuted,
    marginBottom: 24,
    fontWeight: '500',
  },
  balanceCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 12,
    fontWeight: '500',
  },
  factoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  completeCard: {
    backgroundColor: colors.success,
    marginHorizontal: 24,
    marginVertical: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  completeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textWhite,
    marginBottom: 8,
  },
  completeText: {
    fontSize: 16,
    color: colors.textWhite,
    fontWeight: '500',
  },
  stepsContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    marginTop: 8,
  },
  stepCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  stepCardCurrent: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  stepCardComplete: {
    opacity: 0.7,
  },
  stepIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  stepNameComplete: {
    color: colors.textMuted,
  },
  stepNameLocked: {
    color: colors.textMuted,
  },
  stepCost: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  statsCard: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 15,
    color: colors.textMuted,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  bottomSpacing: {
    height: 16,
  },
});


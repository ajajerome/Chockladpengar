import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {Button} from '../../components/Button';
import {ChocolateCoin} from '../../components/ChocolateCoin';
import {CheckboxIcon, LockIcon, FactoryIcon} from '../../components/icons';

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
      <View style={styles.container}>
        <Text>Ingen fabrik hittades</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Min Chokladfabrik</Text>
          <Text style={styles.subtitle}>
            Steg {factory.currentStep} av {FACTORY_STEPS.length}
          </Text>
        </View>
        <ChocolateCoin amount={balance} size="medium" showLabel={false} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  factoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  completeCard: {
    backgroundColor: colors.success,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 8,
  },
  completeText: {
    fontSize: 16,
    color: colors.textWhite,
  },
  stepsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepCardCurrent: {
    borderWidth: 2,
    borderColor: colors.accent,
  },
  stepCardComplete: {
    backgroundColor: colors.backgroundDark,
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
    fontSize: 16,
    fontWeight: '600',
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
    color: colors.textLight,
    marginTop: 2,
  },
  statsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});


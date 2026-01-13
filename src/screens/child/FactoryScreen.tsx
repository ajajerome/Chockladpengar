import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { Button } from '../../components/Button';
import { FactoryIcon, CheckboxIcon, LockIcon } from '../../components/icons';
import { FACTORY_STAGES } from '../../constants/funds';

export const FactoryScreen: React.FC = () => {
  const { currentUser, getFactory, getBalance, buildFactoryStage } = useStore();
  const factory = currentUser ? getFactory(currentUser.id) : undefined;
  const balance = currentUser ? getBalance(currentUser.id) : 0;

  if (!factory) return null;

  const progress =
    (factory.completedStages.length / FACTORY_STAGES.length) * 100;

  const nextStage = FACTORY_STAGES.find(
    (stage) => !factory.completedStages.includes(stage.id)
  );

  const handleBuildStage = () => {
    if (!nextStage || !currentUser) return;

    if (balance < nextStage.cost) {
      Alert.alert('Inte råd', 'Du har inte tillräckligt med chokladpengar');
      return;
    }

    Alert.alert(
      'Bygg fabrikssteg',
      `Vill du bygga "${nextStage.name}" för ${nextStage.cost} chokladpengar?`,
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Bygg',
          onPress: () => {
            buildFactoryStage(currentUser.id, nextStage.id);
            if (nextStage.id === 'grandOpening') {
              Alert.alert(
                'Grattis!',
                'Din fabrik är klar! Den börjar nu producera 1 chokladpeng per vecka!'
              );
            } else {
              Alert.alert('Byggt!', `${nextStage.name} är nu klart!`);
            }
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
          <FactoryIcon size={32} />
          <Text style={styles.headerTitle}>Din Chokladfabrik</Text>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo:</Text>
          <ChocolateCoin amount={balance} size="medium" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.factoryIllustration}>
            <FactoryIcon size={80} />
            {factory.isComplete && (
              <Text style={styles.completeLabel}>KLAR</Text>
            )}
          </View>
          
          <View style={styles.progressInfo}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Framsteg</Text>
              <Text style={styles.progressPercent}>{Math.floor(progress)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
          </View>

          {factory.isComplete && (
            <View style={styles.productionBanner}>
              <View style={styles.productionIcon}>
                <ChocolateCoin amount={factory.weeklyProduction} size="medium" />
              </View>
              <View style={styles.productionInfo}>
                <Text style={styles.productionTitle}>Aktiv produktion</Text>
                <Text style={styles.productionText}>
                  Producerar {factory.weeklyProduction} chokladpengar / vecka
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Building Stages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fabriksdelar</Text>

          {FACTORY_STAGES.map((stage) => {
            const isCompleted = factory.completedStages.includes(stage.id);
            const isCurrent = nextStage?.id === stage.id;
            const canAfford = balance >= stage.cost;

            return (
              <View
                key={stage.id}
                style={[
                  styles.stageCard,
                  isCompleted && styles.stageCompleted,
                  isCurrent && styles.stageCurrent,
                ]}
              >
                <View style={styles.stageContent}>
                  <View style={styles.stageIconContainer}>
                    {isCompleted ? (
                      <CheckboxIcon size={32} checked={true} status="approved" />
                    ) : isCurrent ? (
                      <View style={styles.buildingIcon}>
                        <Text style={styles.buildingText}>?</Text>
                      </View>
                    ) : (
                      <LockIcon size={32} />
                    )}
                  </View>
                  
                  <View style={styles.stageInfo}>
                    <Text style={[
                      styles.stageName,
                      isCompleted && styles.stageNameCompleted
                    ]}>
                      {stage.name} {isCompleted && '(klar)'}
                    </Text>
                    <Text style={styles.stageDescription}>
                      {stage.description}
                    </Text>
                    {!isCompleted && (
                      <View style={styles.stageCostContainer}>
                        <Text style={styles.costLabel}>Kostnad: </Text>
                        <ChocolateCoin amount={stage.cost} size="small" />
                        {isCurrent && !canAfford && (
                          <Text style={styles.cantAfford}> (inte råd)</Text>
                        )}
                      </View>
                    )}
                  </View>
                </View>

                {isCurrent && (
                  <View style={styles.buildButtonContainer}>
                    <Button
                      title="Bygg detta steg"
                      onPress={handleBuildStage}
                      variant="primary"
                      fullWidth
                      disabled={!canAfford}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Completion Message */}
        {factory.isComplete && (
          <View style={styles.completeCard}>
            <FactoryIcon size={64} />
            <Text style={styles.completeTitle}>Fabriken är klar!</Text>
            <Text style={styles.completeText}>
              Din fabrik producerar nu automatiskt chokladpengar varje vecka.
              Pengarna läggs till ditt saldo automatiskt!
            </Text>
            {factory.totalProduced > 0 && (
              <View style={styles.productionStats}>
                <Text style={styles.statsTitle}>Totalt producerat:</Text>
                <ChocolateCoin amount={factory.totalProduced} size="large" />
              </View>
            )}
          </View>
        )}

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
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  scrollView: {
    flex: 1,
  },
  progressCard: {
    backgroundColor: colors.factory,
    margin: 16,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  factoryIllustration: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  completeLabel: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: colors.success,
    color: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressInfo: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercent: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  productionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  productionIcon: {
    marginRight: 12,
  },
  productionInfo: {
    flex: 1,
  },
  productionTitle: {
    color: colors.backgroundLight,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productionText: {
    color: colors.backgroundLight,
    fontSize: 14,
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  stageCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  stageCompleted: {
    backgroundColor: '#F1F8F4',
    borderColor: colors.success,
  },
  stageCurrent: {
    borderColor: colors.primary,
    borderWidth: 3,
    backgroundColor: '#FFFBF5',
  },
  stageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stageIconContainer: {
    marginRight: 12,
  },
  buildingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E68900',
  },
  buildingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.backgroundLight,
  },
  stageInfo: {
    flex: 1,
  },
  stageName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  stageNameCompleted: {
    color: colors.success,
  },
  stageDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  stageCostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  cantAfford: {
    fontSize: 12,
    color: colors.error,
    fontStyle: 'italic',
  },
  buildButtonContainer: {
    marginTop: 12,
  },
  completeCard: {
    margin: 16,
    padding: 24,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  completeText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  productionStats: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    width: '100%',
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 8,
  },
});

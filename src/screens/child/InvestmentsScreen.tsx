import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';
import { ChocolateCoin } from '../../components/ChocolateCoin';
import { Button } from '../../components/Button';
import { FundCard } from '../../components/FundCard';
import { FUNDS } from '../../constants/funds';
import { FundType } from '../../types';

export const InvestmentsScreen: React.FC = () => {
  const { currentUser, getBalance, investments, createInvestment, withdrawInvestment } = useStore();
  const balance = currentUser ? getBalance(currentUser.id) : 0;
  const [selectedFund, setSelectedFund] = useState<FundType | null>(null);
  const [amount, setAmount] = useState('');

  const myInvestments = investments.filter((inv) => inv.childId === currentUser?.id);

  const handleInvest = () => {
    if (!selectedFund || !currentUser) return;

    const investAmount = parseInt(amount);
    if (isNaN(investAmount) || investAmount <= 0) {
      Alert.alert('Fel', 'Ange ett giltigt belopp');
      return;
    }

    if (investAmount > balance) {
      Alert.alert('Inte råd', 'Du har inte tillräckligt med chokladpengar');
      return;
    }

    createInvestment(currentUser.id, selectedFund, investAmount);
    Alert.alert('Grattis!', `Du investerade ${investAmount} chokladpengar`);
    setAmount('');
    setSelectedFund(null);
  };

  const handleWithdraw = (investmentId: string) => {
    const investment = investments.find((i) => i.id === investmentId);
    if (!investment) return;

    Alert.alert(
      'Ta ut pengar',
      `Vill du ta ut ${Math.floor(investment.currentValue)} chokladpengar?`,
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Ta ut',
          onPress: () => {
            withdrawInvestment(investmentId);
            Alert.alert('Klart!', 'Pengarna är tillbaka på ditt konto');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Investera dina chokladpengar</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo:</Text>
          <ChocolateCoin amount={balance} size="large" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* My Investments */}
        {myInvestments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mina investeringar</Text>
            {myInvestments.map((investment) => {
              const fund = FUNDS.find((f) => f.id === investment.fundId);
              const change = investment.currentValue - investment.amount;
              const changePercent = (change / investment.amount) * 100;

              return (
                <View key={investment.id} style={styles.investmentCard}>
                  <View style={styles.investmentHeader}>
                    <View style={[styles.fundIconSmall, { backgroundColor: fund?.riskLevel === 'low' ? colors.fundLow : fund?.riskLevel === 'medium' ? colors.fundMedium : colors.fundHigh }]}>
                      <Text style={styles.fundLetter}>{fund?.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.investmentInfo}>
                      <Text style={styles.fundName}>{fund?.name}</Text>
                      <View style={styles.investmentValues}>
                        <ChocolateCoin amount={Math.floor(investment.currentValue)} />
                        <Text
                          style={[
                            styles.change,
                            change >= 0 ? styles.positive : styles.negative,
                          ]}
                        >
                          {change >= 0 ? '▲' : '▼'} {Math.floor(Math.abs(change))} ({Math.abs(changePercent).toFixed(1)}%)
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Button
                    title="Ta ut pengar"
                    onPress={() => handleWithdraw(investment.id)}
                    variant="outline"
                    size="small"
                  />
                </View>
              );
            })}
          </View>
        )}

        {/* Select Fund */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Välj fond</Text>
          <Text style={styles.sectionDescription}>
            Tryck på en fond för att se utveckling och investera
          </Text>

          {FUNDS.map((fund) => (
            <FundCard
              key={fund.id}
              fund={fund}
              isSelected={selectedFund === fund.id}
              onSelect={() => setSelectedFund(fund.id === selectedFund ? null : fund.id)}
            />
          ))}

          {selectedFund && (
            <View style={styles.investForm}>
              <Text style={styles.formTitle}>Hur mycket vill du investera?</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Ange antal"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                  placeholderTextColor={colors.textMuted}
                />
                <View style={styles.inputCoin}>
                  <View style={styles.inputCoinInner} />
                </View>
              </View>
              <Button
                title="Investera nu"
                onPress={handleInvest}
                variant="primary"
                size="large"
                fullWidth
              />
            </View>
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
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
  investmentCard: {
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
  investmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  investmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fundIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.backgroundLight,
  },
  fundName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  investmentValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  change: {
    fontSize: 14,
    fontWeight: '700',
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
  investForm: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  inputCoin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.chocolate,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  inputCoinInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondaryLight,
  },
});

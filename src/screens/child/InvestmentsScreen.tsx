import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {FUNDS, FundType} from '../../constants/funds';
import {Button} from '../../components/Button';
import {FundCard} from '../../components/FundCard';
import {ChocolateCoin} from '../../components/ChocolateCoin';
import {GradientBackground} from '../../components/GradientBackground';

export const InvestmentsScreen = () => {
  const currentUser = useStore(state => state.currentUser);
  const investments = useStore(state =>
    state.investments.filter(i => i.userId === currentUser?.id)
  );
  const balance = useStore(state => state.getBalance(currentUser?.id || ''));
  const invest = useStore(state => state.invest);
  const withdrawInvestment = useStore(state => state.withdrawInvestment);

  const [selectedFund, setSelectedFund] = useState<FundType | null>(null);
  const [amount, setAmount] = useState('');

  const handleInvest = () => {
    if (!selectedFund) {
      Alert.alert('Välj en fond', 'Du måste välja en fond att investera i');
      return;
    }

    const investAmount = parseInt(amount, 10);
    if (isNaN(investAmount) || investAmount < 10) {
      Alert.alert('Ogiltigt belopp', 'Minsta investering är 10 chokladpengar');
      return;
    }

    if (invest(selectedFund, investAmount)) {
      Alert.alert('Investering lyckades!', `Du investerade ${investAmount} chokladpengar`);
      setAmount('');
      setSelectedFund(null);
    } else {
      Alert.alert('Investering misslyckades', 'Du har inte tillräckligt med chokladpengar');
    }
  };

  const handleWithdraw = (investmentId: string) => {
    Alert.alert(
      'Ta ut investering?',
      'Vill du ta ut denna investering?',
      [
        {text: 'Avbryt', style: 'cancel'},
        {
          text: 'Ta ut',
          onPress: () => withdrawInvestment(investmentId),
        },
      ]
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Chokladfonder</Text>
          <Text style={styles.subtitle}>Investera dina chokladpengar</Text>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Tillgängligt saldo</Text>
            <ChocolateCoin amount={balance} size="large" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Välj fond</Text>
          {(Object.keys(FUNDS) as FundType[]).map(fundType => (
            <FundCard
              key={fundType}
              fundType={fundType}
              onPress={() => setSelectedFund(fundType)}
            />
          ))}
        </View>

        {selectedFund && (
          <View style={styles.investSection}>
            <Text style={styles.sectionTitle}>
              Investera i {FUNDS[selectedFund].name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Belopp (min 10)"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Button
              title="Investera"
              onPress={handleInvest}
              variant="primary"
            />
          </View>
        )}

        {investments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mina investeringar</Text>
            {investments.map(inv => (
              <View key={inv.id} style={styles.investmentCard}>
                <View style={{flex: 1}}>
                  <Text style={styles.fundName}>
                    {FUNDS[inv.fundType].name}
                  </Text>
                  <Text style={styles.investmentDetail}>
                    Investerat: {inv.amount} chokladpengar
                  </Text>
                  <Text style={styles.investmentDetail}>
                    Nuvarande värde: {Math.round(inv.currentValue)} chokladpengar
                  </Text>
                  <Text
                    style={[
                      styles.investmentDetail,
                      {color: inv.totalReturn >= 0 ? colors.success : colors.error},
                    ]}>
                    Avkastning: {inv.totalReturn >= 0 ? '+' : ''}
                    {Math.round(inv.totalReturn)} ({((inv.totalReturn / inv.amount) * 100).toFixed(1)}%)
                  </Text>
                </View>
                <Button
                  title="Ta ut"
                  onPress={() => handleWithdraw(inv.id)}
                  variant="secondary"
                  size="small"
                />
              </View>
            ))}
          </View>
        )}
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
  section: {
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
  investSection: {
    marginHorizontal: 24,
    marginVertical: 16,
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: colors.text,
    fontWeight: '500',
  },
  investmentCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.shadowCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  fundName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  investmentDetail: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 16,
  },
});


import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useStore} from '../../store/useStore';
import {colors} from '../../theme/colors';
import {FUNDS, FundType} from '../../constants/funds';
import {Button} from '../../components/Button';
import {FundCard} from '../../components/FundCard';
import {ChocolateCoin} from '../../components/ChocolateCoin';

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chokladfonder</Text>
        <ChocolateCoin amount={balance} size="medium" showLabel={false} />
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
              <View>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  investSection: {
    padding: 16,
    backgroundColor: colors.backgroundLight,
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: colors.text,
  },
  investmentCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fundName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  investmentDetail: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
});


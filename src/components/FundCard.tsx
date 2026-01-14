import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import {FUNDS, FundType} from '../constants/funds';
import {BarChartIcon} from './icons/BarChartIcon';

interface FundCardProps {
  fundType: FundType;
  onPress: () => void;
}

export const FundCard: React.FC<FundCardProps> = ({fundType, onPress}) => {
  const fund = FUNDS[fundType];

  const getRiskColor = () => {
    switch (fund.risk) {
      case 'low':
        return colors.riskLow;
      case 'medium':
        return colors.riskMedium;
      case 'high':
        return colors.riskHigh;
    }
  };

  const getRiskText = () => {
    switch (fund.risk) {
      case 'low':
        return 'Låg risk';
      case 'medium':
        return 'Medelhög risk';
      case 'high':
        return 'Hög risk';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, {borderTopColor: fund.color}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <BarChartIcon size={32} color={fund.color} />
        <Text style={styles.name}>{fund.name}</Text>
      </View>

      <Text style={styles.description}>{fund.description}</Text>

      <View style={styles.footer}>
        <View style={[styles.riskBadge, {backgroundColor: getRiskColor()}]}>
          <Text style={styles.riskText}>{getRiskText()}</Text>
        </View>
        <Text style={styles.returnRange}>
          {(fund.minReturn * 100).toFixed(0)}% - {(fund.maxReturn * 100).toFixed(0)}%
        </Text>
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
    borderTopWidth: 4,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
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
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 12,
    color: colors.textWhite,
    fontWeight: '600',
  },
  returnRange: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});



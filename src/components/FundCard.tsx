import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Fund } from '../types';
import { colors } from '../theme/colors';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FundCardProps {
  fund: Fund;
  isSelected: boolean;
  onSelect: () => void;
  historicalData?: number[];
}

export const FundCard: React.FC<FundCardProps> = ({
  fund,
  isSelected,
  onSelect,
  historicalData = [0, 2, -1, 3, 1, 4, 2],
}) => {
  const getRiskColor = () => {
    switch (fund.riskLevel) {
      case 'low':
        return colors.fundLow;
      case 'medium':
        return colors.fundMedium;
      case 'high':
        return colors.fundHigh;
      default:
        return colors.primary;
    }
  };

  const getRiskIndicator = () => {
    switch (fund.riskLevel) {
      case 'low':
        return '●';
      case 'medium':
        return '●●';
      case 'high':
        return '●●●';
      default:
        return '●';
    }
  };

  const getRiskLabel = () => {
    switch (fund.riskLevel) {
      case 'low':
        return 'Låg risk';
      case 'medium':
        return 'Medel risk';
      case 'high':
        return 'Hög risk';
      default:
        return '';
    }
  };

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onSelect();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        { borderLeftColor: getRiskColor(), borderLeftWidth: 4 },
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.fundIcon, { backgroundColor: getRiskColor() }]}>
          <Text style={styles.fundLetter}>{fund.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{fund.name}</Text>
          <View style={styles.riskContainer}>
            <Text style={[styles.riskIndicator, { color: getRiskColor() }]}>
              {getRiskIndicator()}
            </Text>
            <Text style={styles.riskLabel}>{getRiskLabel()}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{fund.description}</Text>

      {isSelected && (
        <Animated.View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Utveckling senaste veckan</Text>
          <LineChart
            data={{
              labels: ['M', 'T', 'O', 'T', 'F', 'L', 'S'],
              datasets: [
                {
                  data: historicalData,
                },
              ],
            }}
            width={300}
            height={150}
            chartConfig={{
              backgroundColor: colors.backgroundLight,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.backgroundLight,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(107, 68, 35, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(92, 74, 58, ${opacity})`,
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: getRiskColor(),
              },
            }}
            bezier
            style={styles.chart}
          />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF8F0',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fundIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fundLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.backgroundLight,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riskIndicator: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  riskLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  chartContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface BarChartIconProps {
  size?: number;
}

export const BarChartIcon: React.FC<BarChartIconProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Three bars representing investment growth */}
      <View style={[styles.bar, styles.bar1, { 
        width: size * 0.22, 
        height: size * 0.4,
        borderRadius: size * 0.06
      }]} />
      <View style={[styles.bar, styles.bar2, { 
        width: size * 0.22, 
        height: size * 0.65,
        borderRadius: size * 0.06
      }]} />
      <View style={[styles.bar, styles.bar3, { 
        width: size * 0.22, 
        height: size * 0.85,
        borderRadius: size * 0.06
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  bar: {
    borderWidth: 1.5,
    borderColor: '#6B4423',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  bar1: {
    backgroundColor: '#8B5A2B',
  },
  bar2: {
    backgroundColor: '#A0643C',
  },
  bar3: {
    backgroundColor: colors.secondary,
  },
});


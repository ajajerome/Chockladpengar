import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface RejectIconProps {
  size?: number;
}

export const RejectIcon: React.FC<RejectIconProps> = ({ size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size * 0.25 }]}>
      {/* Cross */}
      <View style={[styles.crossLine, { 
        width: size * 0.55, 
        height: 3,
        transform: [{ rotate: '45deg' }]
      }]} />
      <View style={[styles.crossLine, { 
        width: size * 0.55, 
        height: 3,
        transform: [{ rotate: '-45deg' }]
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#D32F2F',
  },
  crossLine: {
    backgroundColor: colors.backgroundLight,
    position: 'absolute',
    borderRadius: 2,
  },
});


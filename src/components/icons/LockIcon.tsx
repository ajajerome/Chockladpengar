import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface LockIconProps {
  size?: number;
  locked?: boolean;
}

export const LockIcon: React.FC<LockIconProps> = ({ size = 24, locked = true }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Lock body */}
      <View style={[styles.body, { 
        width: size * 0.6, 
        height: size * 0.5,
        borderRadius: size * 0.08,
        bottom: 0
      }]} />
      {/* Lock shackle */}
      {locked && (
        <View style={[styles.shackle, { 
          width: size * 0.4, 
          height: size * 0.35,
          borderRadius: size * 0.2,
          top: size * 0.1,
          borderWidth: size * 0.08
        }]} />
      )}
      {/* Keyhole */}
      <View style={[styles.keyhole, { 
        width: size * 0.12, 
        height: size * 0.12,
        borderRadius: size * 0.06,
        bottom: size * 0.25
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#4A2E1A',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#3E2723',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  shackle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: '#4A2E1A',
  },
  keyhole: {
    backgroundColor: '#2C1810',
    position: 'absolute',
  },
});


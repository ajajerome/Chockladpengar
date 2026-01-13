import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ProfileIconProps {
  size?: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {/* Head */}
      <View style={[styles.head, { 
        width: size * 0.35, 
        height: size * 0.35,
        borderRadius: size * 0.175,
        top: size * 0.15
      }]} />
      {/* Body */}
      <View style={[styles.body, { 
        width: size * 0.6, 
        height: size * 0.4,
        borderRadius: size * 0.3,
        bottom: size * 0.05
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B5A2B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#6B4423',
  },
  head: {
    backgroundColor: '#A0643C',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#8B5A2B',
  },
  body: {
    backgroundColor: '#A0643C',
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: '#8B5A2B',
  },
});


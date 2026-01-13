import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface NotificationIconProps {
  size?: number;
  hasNotification?: boolean;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ 
  size = 24,
  hasNotification = false 
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Bell body */}
      <View style={[styles.bell, { 
        width: size * 0.6, 
        height: size * 0.5,
        borderRadius: size * 0.3,
        top: size * 0.15
      }]} />
      {/* Bell top */}
      <View style={[styles.top, { 
        width: size * 0.2, 
        height: size * 0.15,
        borderRadius: size * 0.1,
        top: size * 0.05
      }]} />
      {/* Bell bottom edge */}
      <View style={[styles.bottom, { 
        width: size * 0.7, 
        height: size * 0.1,
        borderRadius: size * 0.05,
        top: size * 0.6
      }]} />
      {/* Clapper */}
      <View style={[styles.clapper, { 
        width: size * 0.1, 
        height: size * 0.12,
        borderRadius: size * 0.05,
        top: size * 0.68
      }]} />
      
      {hasNotification && (
        <View style={[styles.badge, { 
          width: size * 0.3, 
          height: size * 0.3,
          borderRadius: size * 0.15,
          top: 0,
          right: 0
        }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#B8941F',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  top: {
    backgroundColor: '#B8941F',
    position: 'absolute',
  },
  bottom: {
    backgroundColor: colors.secondaryLight,
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  clapper: {
    backgroundColor: '#8B5A2B',
    position: 'absolute',
  },
  badge: {
    backgroundColor: colors.error,
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.backgroundLight,
  },
});


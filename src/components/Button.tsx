import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.backgroundLight}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  smallSize: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumSize: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeSize: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: colors.backgroundLight,
  },
  secondaryText: {
    color: colors.text,
  },
  outlineText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.backgroundLight,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});


